import Note from "../models/note.model";

// Get all notes
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single note by ID
export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note || note.user.toString() !== req.user.id) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new note
export const createNote = async (req, res) => {
  try {
    const newNote = new Note({
      user: req.user.id,
      title: req.body.title,
      content: req.body.content,
    });
    const savedNote = await newNote.save();
    res.json(savedNote);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update an existing note
export const updateNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note || note.user.toString() !== req.user.id) {
      return res.status(404).json({ message: "Note not found" });
    }

    note.title = req.body.title;
    note.content = req.body.content;

    const updatedNote = await note.save();
    res.json(updatedNote);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a note
export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note || note.user.toString() !== req.user.id) {
      return res.status(404).json({ message: "Note not found" });
    }

    await note.remove();
    res.json({ message: "Note removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
