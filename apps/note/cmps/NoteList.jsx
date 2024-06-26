
import { NotePreview } from "./NotePreview.jsx"

export function NoteList({ notes, onRemoveNote }) {
    return (
        <div className="note-list">
            {notes.map(note => (
                <li class="note" key={note.id} >
                <NotePreview note={note} />
                 <section>
                      <button className="close" onClick={() => onRemoveNote(note.id)}><i className="fa-regular fa-trash-can"></i></button>
                </section>
                </li>
            ))}
        </div>
    )
}
