import { useEffect, useState } from "react";
import PropTypes from "prop-types";

function NoteEditor({ selectedNote, saveNote }) {
  const [editMode, setEditMode] = useState(false);
  const [noteTitle, setNoteTitle] = useState(selectedNote?.title || "");
  const [noteContent, setNoteContent] = useState(selectedNote?.content || "");

  const handleNoteChange = (e) => {
    setNoteContent(e.target.value);
  };
  const handleTitleChange = (e) => {
    setNoteTitle(e.target.value);
  };

  const handleSave = () => {
    saveNote({
      ...selectedNote,
      title: noteTitle,
      content: noteContent,
      lastUpdated: new Date().toLocaleString(),
    });
    setEditMode(false);
  };

  const handleTextAreaKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent the default behavior of Enter key in a textarea
      setNoteContent((prevContent) => prevContent + "\n- "); // Add a hyphen and newline
    }
  };

  const handleTitleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent the default behavior of Enter key in a textarea
      handleSave();
    }
  };

  useEffect(() => {
    setNoteContent(selectedNote?.content || "");
    setNoteTitle(selectedNote?.title || "");
  }, [selectedNote]);

  const unsavedChanges = selectedNote?.content !== noteContent;

  return (
    <div>
      {!editMode ? (
        <div className="note-title">
          <h2>{noteTitle}</h2>
          <span className="link" onClick={() => setEditMode(true)}>
            Edit
          </span>
        </div>
      ) : (
        <div className="note-title-edit">
          <input
            type="text"
            value={noteTitle}
            onChange={handleTitleChange}
            onKeyDown={handleTitleKeyDown}
            placeholder="Enter note title"
            className="title-input"
          />
          <span className="link" onClick={handleSave}>
            Save
          </span>
        </div>
      )}
      <p>Last Updated: {selectedNote.lastUpdated}</p>
      <textarea
        value={noteContent}
        onChange={handleNoteChange}
        onKeyDown={handleTextAreaKeyDown}
        placeholder="Start typing your note..."
        rows={10}
        cols={40}
      />
      <br></br>
      <button disabled={!unsavedChanges} onClick={handleSave}>
        Save
      </button>
    </div>
  );
}

NoteEditor.propTypes = {
  selectedNote: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    lastUpdated: PropTypes.string.isRequired,
  }),
  saveNote: PropTypes.func.isRequired,
};

export default NoteEditor;
