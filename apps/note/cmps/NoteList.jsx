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
                        <section className="btn-note hidden">
                            <i onClick={() => onRemoveNote(note.id)} className="btn fa-regular fa-trash-can"></i>
                            <button><Link to={`/note/${note.id}`}>Edit</Link></button>
                            <i className=" btn fa-solid fa-palette"></i>
                            <i className="btn fa-regular fa-image"></i>
                        </section>
                    </div>
                ))}
            </div>
        </div>
    )
}
