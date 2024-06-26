
// const { Link, useSearchParams } = ReactRouterDOM

import { NoteList } from "../cmps/NoteList.jsx"
import { noteService } from "../services/note.service.js"
// import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

const { useEffect, useState } = React

export function NoteIndex() {
    const [notes, setNotes] = useState(null)


    useEffect(() => {
        loadNotes()
    }, [])

    function loadNotes() {
        noteService.query()
            .then(notes => {
                setNotes(notes)
            })
            .catch(err => {
                console.log('err:', err)
            })
    }

    function onRemoveNote(noteId) {
        noteService.remove(noteId)
            .then(() => {
                setNotes(notes =>
                    notes.filter(note => note.id !== noteId)
                )
                showSuccessMsg(`note (${noteId}) removed successfully!`)
            })
            .catch(err => {
                console.log('Problems removing note:', err)
                showErrorMsg(`Having problems removing car!`)
            })
    }

    // function onSetFilter(filterBy) {
    //     setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    //     // setFilterBy({ ...filterBy })
    // }

    if (!notes) return <div>Loading...</div>

    return (
        <section className="note-index">
            <NoteList 
            notes={notes}
            onRemoveNote={onRemoveNote} />
        </section>
    )
}
