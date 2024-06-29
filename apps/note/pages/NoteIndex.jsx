const { Link, useSearchParams } = ReactRouterDOM

import { NoteFilter } from "../cmps/NoteFilter.jsx"
import { NoteList } from "../cmps/NoteList.jsx"
import { noteService } from "../services/note.service.js"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

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
        noteService.remove(noteId)
            .then(() => {
                setNotes(notes => notes.filter(note => note.id !== noteId))
                showSuccessMsg(`note (${noteId}) removed successfully!`)
            })
            .catch(err => {
                console.log('Problems removing note:', err)
                showErrorMsg(`Having problems removing note!`)
            })
    }

    function onChangeBgColor(noteId, color, setColorNoteId) {
        const noteToUpdate = notes.find(note => note.id === noteId)
        if (!noteToUpdate) return

        const updatedNote = {
            ...noteToUpdate,
            style: {
                ...noteToUpdate.style,
                backgroundColor: color,
            },
        }

        noteService.save(updatedNote)
            .then(savedNote => {
                const updatedNotes = notes.map(note =>
                    note.id === savedNote.id ? savedNote : note
                )
                setNotes(updatedNotes)
                setColorNoteId(null)
            })
            .catch(error => {
                console.error('Error saving note:', error)
            })
    }

    function onSetFilter(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    if (!notes) return <div>Loading...</div>

    return (
        <section className="note-index">
            <NoteFilter filterBy={filterBy} onSetFilter={onSetFilter} />
            <NoteList
                notes={notes}
                onChangeBgColor={onChangeBgColor}
                onRemoveNote={onRemoveNote}
            />
            <Outlet />
        </section>
    )
}

