import { useEffect, useState } from "react";
import axios from "axios";
import NoteList from "./components/Notelist";
import NoteEditor from "./components/NoteEditor";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    axios
      .get("http://localhost:3001/notes", { signal: signal })
      .then((response) => {
        setNotes(response.data);
        if (response.data.length > 0) {
          setSelectedNote(response.data[0]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    return () => {
      abortController.abort();
    };
  }, []);

  const addNewNote = async () => {
    const newNote = {
      id: new Date().getTime().toString(),
      title: generateRandomTitle(),
      content: "",
      lastUpdated:
        new Date().toLocaleDateString() +
        ", " +
        new Date().toLocaleTimeString(),
    };

    try {
      const response = await axios.post("http://localhost:3001/notes", newNote);
      console.log("api response", response);

      setNotes([...notes, newNote]);
      setSelectedNote(newNote);
    } catch (error) {
      console.log(error);
    }
  };

  const selectNote = (note) => {
    setSelectedNote(note);
  };

  const saveNote = async (updatedNote) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/notes/${selectedNote.id}`,
        updatedNote
      );
      console.log("api response", response);

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
    } catch (error) {
      console.log(error);
    }
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

  useEffect(() => {
    const handleDelete = async (id) => {
      try {
        const response = await axios.delete(
          `http://localhost:3001/notes/${id}`
        );
        console.log("api response", response);

        setNotes((prev) => prev.filter((note) => note.id !== id));
        setSelectedNote(notes.find((note) => note.id !== id) || null);
      } catch (error) {
        console.log(error);
      }
    };

    // Attach the keydown event listener to the document
    const handleKeyDown = (event) => {
      // Check if the pressed key is the Delete key
      if (event.key === "Delete") {
        // Call the delete action with the selectedNote ID
        handleDelete(selectedNote?.id);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener when the component is unmounted
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedNote, notes]);

  return (
    <div className="app-container">
      <div className="sidebar">
        <NoteList
          notes={notes}
          selectNote={selectNote}
          addNewNote={addNewNote}
          selectedNote={selectedNote}
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
