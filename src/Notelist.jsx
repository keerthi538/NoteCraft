// NoteList.js
import PropTypes from "prop-types";

function NoteList({ notes, selectNote, addNewNote }) {
  return (
    <div>
      <div className="add-note-tab" onClick={addNewNote}>
        + Add Note
      </div>
      <ul>
        {notes.map((note) => (
          <li key={note.id} onClick={() => selectNote(note)}>
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
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      lastUpdated: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectNote: PropTypes.func.isRequired,
  addNewNote: PropTypes.func.isRequired,
};

export default NoteList;
