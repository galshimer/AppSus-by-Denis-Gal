const { Link } = ReactRouterDOM

import { NotePreview } from "./NotePreview.jsx"

export function NoteList({ notes, onRemoveNote }) {
    return (
        <div className="note-list">
            {notes.map(note => (
                <li key={note.id} >
                <NotePreview note={note} />
                 <section>
                      <button onClick={() => onRemoveNote(note.id)}><i className="fa-regular fa-trash-can"></i></button>
                      <button><Link to={`/note/edit/${note.id}`}>Edit</Link></button>
                </section>
                </li>
            ))}
        </div>
    )
}
