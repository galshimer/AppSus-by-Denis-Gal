
const { Link, useSearchParams } = ReactRouterDOM

import { NoteFilter } from "../cmps/NoteFilter.jsx"
import { NoteList } from "../cmps/NoteList.jsx"
import { noteService } from "../services/note.service.js"
// import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

const { useEffect, useState } = React
const { Outlet } = ReactRouterDOM

export function NoteIndex() {

    const [searchParams, setSearchParams] = useSearchParams()
    const [notes, setNotes] = useState(null)
    const [filterBy, setFilterBy] = useState(noteService.getFilterFromSearchParams(searchParams))


    useEffect(() => {
        loadNotes()
        setSearchParams(filterBy)
    }, [filterBy])

    function loadNotes() {
        noteService.query(filterBy)
            .then(notes => {
                setNotes(notes)
            })
            .catch(err => {
                console.log('err:', err)
            })
    }

    function onRemoveNote(noteId) {
        if(confirm('are you sure?')){
            noteService.remove(noteId)
            .then(() => {
                setNotes(notes =>
                    notes.filter(note => note.id !== noteId)
                )
                showSuccessMsg(`note (${noteId}) removed successfully!`)
            })
            .catch(err => {
                console.log('Problems removing note:', err)
                showErrorMsg(`Having problems removing note!`)
            })
        }
    }

    function onSetFilter(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
        // setFilterBy({ ...filterBy })
    }

    if (!notes) return <div>Loading...</div>

    return (
        <section className="note-index">
            {/* <h1> search</h1> */}
            <NoteFilter filterBy={filterBy} onSetFilter={onSetFilter} />
            <NoteList
                notes={notes}
                onRemoveNote={onRemoveNote} />
                <Outlet/>
        </section>
    )
}
