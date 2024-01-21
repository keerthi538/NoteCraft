import PropTypes from "prop-types";

function NoteList({ notes, selectNote, addNewNote, selectedNote }) {
  return (
    <div className="note-list">
      <div className="add-note-wrapper">
        <div className="add-note-tab" onClick={addNewNote}>
          + Add Note
        </div>
      </div>
      <ul>
        {notes?.map((note) => (
          <li
            className={`${selectedNote?.id === note.id ? "selected-note" : ""}`}
            key={note.id}
            onClick={() => selectNote(note)}
          >
            {note.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

NoteList.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      lastUpdated: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectNote: PropTypes.func.isRequired,
  addNewNote: PropTypes.func.isRequired,
  selectedNote: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    lastUpdated: PropTypes.string.isRequired,
  }),
};

export default NoteList;
