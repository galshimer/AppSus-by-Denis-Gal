
const { Link } = ReactRouterDOM
const { useEffect, useState } = React

import { NotePreview } from "./NotePreview.jsx";
import { ColorPalette } from "./ColorPalette.jsx";

export function NoteList({ notes, onRemoveNote, onChangeBgColor, onTogglePin, onDuplicateNote }) {
    const [colorNoteId, setColorNoteId] = useState(null)
    const [notesState, setNotesState] = useState([])

    useEffect(() => {
        setNotesState(notes)
    }, [notes])

    const pinnedNotes = notes.filter(note => note.isPinned)
    const unpinnedNotes = notes.filter(note => !note.isPinned)

    function handleShareClick(note) {
        const subject = `Sharing Note: ${note.title}`
        const body = encodeURIComponent(note.content)

        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=&subject=${subject}&body=${body}`

        window.open(gmailUrl, '_blank')
    }

    return (
        <div className="main">
            <div className="note-list">
                {[...pinnedNotes, ...unpinnedNotes].map(note => (
                    <div className="single-note" style={note.style} key={note.id}>
                        <Link replace to={`/note/${note.id}`}>
                            <NotePreview note={note} />
                        </Link>
                        <section className="btn-note hidden">
                            <i onClick={() => onRemoveNote(note.id)}
                                className="btn fa-regular fa-trash-can"></i>
                            {/* <button><Link to={`/note/${note.id}`}>Edit</Link></button> */}
                            <i onClick={() => setColorNoteId(note.id)}
                                className="btn fa-solid fa-palette"></i>
                            <i className="btn fa-regular fa-image"></i>
                            <i onClick={() => handleShareClick(note.id)}
                                className="btn fa-regular fa-share-from-square"
                            ></i>
                            <span
                                className="material-symbols-outlined pin-icon"
                                onClick={() => onTogglePin(note.id)}
                            >
                                {note.isPinned ? 'unpin' : 'keep'}
                            </span>
                            <i onClick={() => onDuplicateNote(note)}
                                className="btn fa-regular fa-copy"></i>
                        </section>
                        {colorNoteId === note.id && (
                            <ColorPalette onChangeBgColor={(color) => onChangeBgColor(note.id, color, setColorNoteId)} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
