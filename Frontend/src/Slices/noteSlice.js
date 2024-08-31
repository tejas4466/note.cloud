import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const initialState = {
  notes: JSON.parse(localStorage.getItem("notes")) || [],
};

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    addNote: (state, action) => {
      const { title, content } = action.payload;
      const note = {
        id: nanoid(),
        title: title,
        content: content,
      };
      state.notes.push(note);
      localStorage.setItem("notes", JSON.stringify(state.notes));
    },

    deleteNote: (state, action) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
      localStorage.setItem("notes", JSON.stringify(state.notes));
    },

    updateNote: (state, action) => {
      const { id, title, content } = action.payload;
      const noteIndex = state.notes.findIndex((note) => note.id === id);
      if (noteIndex !== -1 && title) {
        state.notes[noteIndex].title = title;
      }
      if (noteIndex !== -1 && content) {
        state.notes[noteIndex].content = content;
      }
      localStorage.setItem("notes", JSON.stringify(state.notes));
    },
  },
});

export const { addNote, deleteNote, updateNote } = noteSlice.actions;
export default noteSlice.reducer;
