
const express = require("express");
const { protect } = require("../middlewares/auth");
const { addNotes, getNotes, updateNote, deleteNote } = require("../controllers/notesController");

const router = express.Router();

router.get("/", protect, getNotes);
router.post("/", protect, addNotes);
router.patch("/:id", protect, updateNote);
router.delete("/:id", protect, deleteNote);

module.exports = router;
