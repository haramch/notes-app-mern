import React, { useState, useEffect } from "react";
import Header from "../../../Components/Header";
import NoteCard from "../../../Components/NoteCard";
import AddEditNotes from "../../../Components/AddEditNotes";
import { MdAdd } from "react-icons/md";
import Modal from "react-modal";
import axios from "axios";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [modalState, setModalState] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const token = localStorage.getItem("token");
  const fetchNotes = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_HOST}/api/notes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        const sorted = res.data.notes.sort((a, b) => b.isPinned - a.isPinned);
        setNotes(sorted);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching notes:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);   
  const handleSaveNote = (note, type) => {
    if (type === "edit") {
      setNotes((prev) => prev.map((n) => (n._id === note._id ? note : n)));
    } else {
      setNotes((prev) => [...prev, note]);
    }
    setModalState({ isShown: false, type: "add", data: null });
  };
  const handleDeleteNote = (id) => {
    setNotes((prev) => prev.filter((n) => n._id !== id));
  };
  const handleUpdateNote = (updatedNote) => {
    setNotes((prev) =>
      prev.map((n) => (n._id === updatedNote._id ? updatedNote : n))
    );
  };

  const filteredNotes = notes.filter((note) => {
  const query = searchQuery.toLowerCase();

  const inTitle = note.title?.toLowerCase().includes(query);
  const inContent = note.content?.toLowerCase().includes(query);
  const inTags = note.tags?.some((tag) =>
    tag.toLowerCase().includes(query)
  );

  return inTitle || inContent || inTags;
});


  return (
    <div>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="container mx-auto mt-20">
        
        {loading ? (
          <p>Loading notes...</p>
        ) : notes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredNotes.map((note) => (
             <NoteCard
               key={note._id}
               note={note}
               onEdit={(note) =>
                 setModalState({ isShown: true, type: "edit", data: note })
               }
               onDeleteNote={handleDeleteNote}
               onUpdateNote={handleUpdateNote}
             />
           ))}

          </div>
        ) : (
          <p>No notes available</p>
        )}
      </div>
      <button
        className="w-16 h-16 bg-blue-500 flex items-center justify-center rounded hover:bg-blue-700 absolute right-10 bottom-10"
        onClick={() =>
          setModalState({ isShown: true, type: "add", data: null })
        }
      >
        <MdAdd className="text-[32px] text-white" />
      </button>
      <Modal
        isOpen={modalState.isShown}
        onRequestClose={() =>
          setModalState({ isShown: false, type: "add", data: null })
        }
        style={{ overlay: { backgroundColor: "rgba(0,0,0,0.2)" } }}
        contentLabel="Add/Edit Note"
        className="w-[40%] bg-white max-h-3/5 p-5 mt-40 mx-auto"
      >
        <AddEditNotes
          type={modalState.type}
          noteData={modalState.data}
          onclose={() =>
            setModalState({ isShown: false, type: "add", data: null })
          }
          onSave={handleSaveNote}
        />
      </Modal>
    </div>
  );
}
