import React, { useState } from "react";
import { MdOutlinePushPin, MdCreate, MdDelete, MdEdit } from "react-icons/md";
import axios from "axios";

export default function NoteCard({ note, onEdit, onDeleteNote, onUpdateNote }) {
  const [showFullContent, setShowFullContent] = useState(false);
  const [editingTags, setEditingTags] = useState(false);
  const [tags, setTags] = useState(note.tag || []);
  const token = localStorage.getItem("token");
  const handlePinToggle = async () => {
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_HOST}/api/notes/${note._id}`,
        { isPinned: !note.isPinned },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) onUpdateNote(res.data.note);
    } catch (error) {
      console.error("Pin error:", error);
    }
  };
  const handleDelete = async () => {
    try {
      const res = await axios.delete(`${import.meta.env.VITE_HOST}/api/notes/${note._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) onDeleteNote(note._id);
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete note");
    }
  };
  const saveTags = async () => {
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_HOST}/api/notes/${note._id}`,
        { tag: tags },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        onUpdateNote(res.data.note);
        setEditingTags(false);
      }
    } catch (error) {
      console.error("Tag update error:", error);
    }
  };

  return (
    <div
      className={`border rounded p-4 bg-white hover:shadow-xl transition-all duration-300 ease-linear space-y-4 ${
        note.isPinned ? "border-blue-400" : "border-gray-300"
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-lg font-bold">{note.title}</h6>
          <span className="text-gray-700 font-medium">
            {note.createdAt ? new Date(note.createdAt).toLocaleDateString() : ""}
          </span>
        </div>
        <MdOutlinePushPin
          onClick={handlePinToggle}
          className={`cursor-pointer hover:text-blue-400 text-xl ${
            note.isPinned ? "text-blue-400" : "text-gray-500"
          }`}
        />
      </div>
      <p
        className="text-gray-700 cursor-pointer"
        onClick={() => setShowFullContent((prev) => !prev)}
      >
        {showFullContent ? note.content : note.content?.slice(0, 60) + (note.content?.length > 60 ? "..." : "")}
      </p>
      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          {editingTags ? (
            <>
              <input
                type="text"
                value={tags.join(", ")}
                onChange={(e) => setTags(e.target.value.split(",").map((t) => t.trim()))}
                className="border p-1 rounded text-sm"
              />
              <button
                onClick={saveTags}
                className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setEditingTags(false);
                  setTags(note.tag || []);
                }}
                className="bg-gray-300 px-2 py-1 rounded text-sm"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <span className="text-gray-700 font-medium ">{tags.join(", ")}</span>
              <MdEdit
                onClick={() => setEditingTags(true)}
                className="cursor-pointer text-gray-500 hover:text-blue-400"
              />
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          <MdCreate
            onClick={() => onEdit(note)}
            className="cursor-pointer hover:text-blue-400 text-xl text-gray-700"
          />
          <MdDelete
            onClick={handleDelete}
            className="cursor-pointer hover:text-red-400 text-xl text-gray-700"
          />
        </div>
      </div>
    </div>
  );
}
