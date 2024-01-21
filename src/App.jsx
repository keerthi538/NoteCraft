// App.js
import { useState } from "react";
import "./App.css"; // Import your styles
import NoteList from "./Notelist";
import NoteEditor from "./NoteEditor";

function App() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  const addNewNote = () => {
    const newNote = {
      id: new Date().getTime(),
      title: generateRandomTitle(),
      content: "-",
      lastUpdated: new Date().toLocaleString(),
    };
    setNotes([...notes, newNote]);
    setSelectedNote(newNote);
  };

  const selectNote = (note) => {
    console.log("select", note);
    setSelectedNote(note);
  };

  const saveNote = (updatedNote) => {
    console.log(updatedNote);

    setNotes((prev) =>
      prev.map((note) => {
        if (note.id === updatedNote.id) {
          setSelectedNote(updatedNote);
          return updatedNote;
        } else {
          return note;
        }
      })
    );
  };

  const generateRandomTitle = () => {
    const adjectives = [
      "Funny",
      "Clever",
      "Silly",
      "Whimsical",
      "Quirky",
      "Amusing",
    ];
    const nouns = ["Note", "Jotting", "Memo", "Reminder", "Message", "Thought"];
    const randomAdjective =
      adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    return `${randomAdjective} ${randomNoun}`;
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <NoteList
          notes={notes}
          selectNote={selectNote}
          addNewNote={addNewNote}
        />
      </div>
      <div className="main-content">
        {selectedNote ? (
          <NoteEditor selectedNote={selectedNote} saveNote={saveNote} />
        ) : (
          <div className="empty-note">
            Select a note to view or add a new one!
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
