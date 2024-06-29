
const { useState, useEffect } = React
const { useSearchParams, Outlet } = ReactRouterDOM

import { NoteFilter } from "../cmps/NoteFilter.jsx";
import { NoteList } from "../cmps/NoteList.jsx";
import { noteService } from "../services/note.service.js";

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
            })
            .catch(err => {
                console.log('Problems removing note:', err)
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

    function onDuplicateNote(note) {
        const newNote = { ...note, id: null }
        noteService.save(newNote)
            .then(savedNote => {
                setNotes(prevNotes => [savedNote, ...prevNotes])
            })
            .catch(err => {
                console.log('Error duplicating note:', err)
            })
    }

        function onUploadImage(noteId, file) {
        const reader = new FileReader()
        reader.onload = (e) => {
            const imageUrl = e.target.result
            const noteToUpdate = notes.find(note => note.id === noteId)
            if (!noteToUpdate) return

            const updatedNote = {
                ...noteToUpdate,
                type: 'NoteImg',
                info: {
                    ...noteToUpdate.info,
                    url: imageUrl,
                },
            }

            noteService.save(updatedNote)
                .then(savedNote => {
                    const updatedNotes = notes.map(note =>
                        note.id === savedNote.id ? savedNote : note
                    )
                    setNotes(updatedNotes)
                })
                .catch(err => {
                    console.log('Error uploading image:', err)
                })
        }
        reader.readAsDataURL(file)
    }

    if (!notes) return <div>Loading...</div>

    return (
        <section className="note-index">
            <NoteFilter filterBy={filterBy} onSetFilter={onSetFilter} />
            <NoteList
                notes={notes}
                onChangeBgColor={onChangeBgColor}
                onRemoveNote={onRemoveNote}
                onTogglePin={noteId => {
                    const noteToUpdate = notes.find(note => note.id === noteId)
                    if (!noteToUpdate) return

                    const updatedNote = {
                        ...noteToUpdate,
                        isPinned: !noteToUpdate.isPinned,
                    }

                    noteService.save(updatedNote)
                        .then(savedNote => {
                            const updatedNotes = notes.map(note =>
                                note.id === savedNote.id ? savedNote : note
                            )
                            setNotes(updatedNotes)
                        })
                        .catch(error => {
                            console.error('Error saving note:', error)
                        })

                }}
                onDuplicateNote={onDuplicateNote}
                onUploadImage={onUploadImage}
            />
            <Outlet />
        </section>
    )
}
