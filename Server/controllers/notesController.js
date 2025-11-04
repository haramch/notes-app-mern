const notesModel = require("../models/notes");

const addNotes = async (req, res) => {
  try {
    const { title, content, tag } = req.body;
    if (!title || !content) {
      return res.status(400).json({ success: false, message: "Title and content are required" });
    }

    const note = new notesModel({ title, content, tag, userId: req.user.id });
    await note.save();
    res.status(201).json({ success: true, note });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error creating note" });
  }
};

const getNotes = async (req, res) => {
  try {
    const notes = await notesModel.find({ userId: req.user.id }).sort({ isPinned: -1, createdAt: -1 });
    res.status(200).json({ success: true, notes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching notes" });
  }
};

const updateNote = async (req, res) => {
  try {
    const note = await notesModel.findOne({ _id: req.params.id, userId: req.user.id });
    if (!note) return res.status(404).json({ success: false, message: "Note not found" });

    const { title, content, tag, isPinned } = req.body;

    if (title !== undefined) note.title = title;
    if (content !== undefined) note.content = content;
    if (tag !== undefined) note.tag = tag;
    if (isPinned !== undefined) note.isPinned = isPinned;

    await note.save();
    res.status(200).json({ success: true, note });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to update note" });
  }
};

// Delete Note
const deleteNote = async (req, res) => {
  try {
    const note = await notesModel.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!note) return res.status(404).json({ success: false, message: "Note not found" });

    res.status(200).json({ success: true, message: "Note deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to delete note" });
  }
};

module.exports = { addNotes, getNotes, updateNote, deleteNote };
