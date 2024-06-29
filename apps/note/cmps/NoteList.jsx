
const { Link } = ReactRouterDOM
const { useEffect, useState } = React

import { NotePreview } from "./NotePreview.jsx";
import { ColorPalette } from "./ColorPalette.jsx";

export function NoteList({ notes, onRemoveNote, onChangeBgColor, onTogglePin }) {
    const [colorNoteId, setColorNoteId] = useState(null)
    const [notesState, setNotesState] = useState([])

    useEffect(() => {
        setNotesState(notes)
    }, [notes])

    const pinnedNotes = notes.filter(note => note.isPinned)
    const unpinnedNotes = notes.filter(note => !note.isPinned)

    return (
        <div className="main">
            <div className="note-list">
                {[...pinnedNotes, ...unpinnedNotes].map(note => (
                    <div className="single-note" style={note.style} key={note.id}>
                        <Link replace to={`/note/${note.id}`}>
                            <NotePreview note={note} />
                        </Link>
                        <section className="btn-note hidden">
                            <i onClick={() => onRemoveNote(note.id)} className="btn fa-regular fa-trash-can"></i>
                            <button><Link to={`/note/${note.id}`}>Edit</Link></button>
                            <i onClick={() => setColorNoteId(note.id)} className="btn fa-solid fa-palette"></i>
                            <i className="btn fa-regular fa-image"></i>
                            <span
                                className="material-symbols-outlined pin-icon"
                                onClick={() => onTogglePin(note.id)}
                            >
                                {note.isPinned ? 'keep' : 'unpin'}
                            </span>
                        </section>
                        {colorNoteId === note.id && (
                            <ColorPalette onChangeBgColor={(color) => onChangeBgColor(note.id, color, setColorNoteId)} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
