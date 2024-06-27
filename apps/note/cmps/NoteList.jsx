const { Link } = ReactRouterDOM

import { NotePreview } from "./NotePreview.jsx"

export function NoteList({ notes, onRemoveNote }) {

    return (

        <div className="main">
            {/* <h1> hi</h1> */}
            <div className="note-list" >

                {notes.map(note => (
                    <div className="single-note" style={note.style} key={note.id} >
                        <NotePreview note={note} />
                        <section  className="btn-note">
                            <i onClick={() => onRemoveNote(note.id)} className="fa-regular fa-trash-can"></i>
                            <button><Link to={`/note/${note.id}`}>Edit</Link></button>
                            <i class="fa-solid fa-palette"></i>
                        </section>
                    </div>
                ))}
            </div>
        </div>
    )
}
