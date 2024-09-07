import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";

const initialState = {
  notes: [],
  status: "idle",
  error: null,
};

// Async thunks for CRUD operations
export const fetchNotes = createAsyncThunk("notes/fetchNotes", async () => {
  const response = await axiosInstance.get("/api/notes");
  return response.data;
});

export const addNote = createAsyncThunk("notes/addNote", async (newNote) => {
  const response = await axiosInstance.post("/api/notes", newNote);
  return response.data;
});

export const deleteNote = createAsyncThunk(
  "notes/deleteNote",
  async (noteId) => {
    await axiosInstance.delete(`/api/notes/${noteId}`);
    return noteId;
  }
);

export const updateNote = createAsyncThunk(
  "notes/updateNote",
  async (updatedNote) => {
    const { id, title, content } = updatedNote;
    const response = await axiosInstance.put(`/api/notes/${id}`, {
      title,
      content,
    });
    return response.data;
  }
);

// Slice
export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.notes = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNote.fulfilled, (state, action) => {
        state.notes.push(action.payload);
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.notes = state.notes.filter((note) => note.id !== action.payload);
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        const { id, title, content } = action.payload;
        const existingNote = state.notes.find((note) => note.id === id);
        if (existingNote) {
          existingNote.title = title;
          existingNote.content = content;
        }
      });
  },
});

export default noteSlice.reducer;
