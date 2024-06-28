// note service
import { storageService } from "../../../services/async-storage.service.js"

const NOTE_KEY = 'noteDB'
_createNotes()

export const noteService = {
    query,
    get,
    remove,
    save,
    getFilterFromSearchParams
}

function query(filterBy = {}) {
    return storageService.query(NOTE_KEY)
        .then(notes => {

            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                notes = notes.filter(note => regExp.test(note.info.txt || '') || regExp.test(note.info.title || ''))
            }

            return notes
        })
}

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
        .then(note => _setNextPrevNoteId(note))
}

function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        return storageService.post(NOTE_KEY, note)
    }
}

function getEmptyNote() {
    return {
        id: '',
        type: 'NoteTxt',
        isPinned: false,
        style: {
            backgroundColor: '#ffffff'
        },
        info: {
            txt: ''
        }
    };
}

function _createNotes() {
    let notes = storageService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = [
            {
                id: 'n101',
                createdAt: 1112222,
                type: 'NoteTxt',
                isPinned: false,
                style: {
                    backgroundColor: '#d3bfdb'
                },
                info: {
                    txt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
                }
            },
            {
                id: 'n102',
                createdAt: 1112224,
                type: 'NoteTodos',
                isPinned: true,
                style:
                {
                    backgroundColor:
                        '#e2f6d3'
                },
                info: {
                    title: 'Get my stuff together',
                    todos: [
                        { txt: 'Diving license', doneAt: null },
                        { txt: 'Diving watch', doneAt: 187111111 },
                        { txt: 'Camera', doneAt: null },
                        { txt: 'Watch', doneAt: null },
                        { txt: 'Flippers', doneAt: null }

                    ]
                }
            },
            {
                id: 'n103',
                createdAt: 1112223,
                type: 'NoteImg',
                isPinned: false,
                style:
                {
                    backgroundColor: '#d3bfdb'
                },
                info: {
                    url: 'https://i.pinimg.com/736x/22/bd/56/22bd566c4bbe272956db066ca7522d8e.jpg',
                    title: 'Asian virginsbower'
                }
            },
            {
                id: 'n104',
                createdAt: 1112224,
                type: 'NoteTodos',
                isPinned: true,
                style:
                {
                    backgroundColor:
                        '#fff8b8'
                },
                info: {
                    title: 'Get my stuff together',
                    todos: [
                        { txt: 'Diving license', doneAt: null },
                        { txt: 'Diving watch', doneAt: 187111111 },
                        { txt: 'Camera', doneAt: null }

                    ]
                }
            },
            {
                id: 'n105',
                createdAt: 1112222,
                type: 'NoteTxt',
                isPinned: false,
                style: {
                    backgroundColor: '#d3bfdb'
                },
                info: {
                    txt: 'Etiam a velit fringilla'
                }
            },
            {
                id: 'n106',
                createdAt: 1112222,
                type: 'NoteTxt',
                isPinned: false,
                style: {
                    backgroundColor: '#e9e3d4'
                },
                info: {
                    txt: 'Proin at ipsum dignissim, gravida lacus at, suscipit metus. Curabitur eu felis magna. Donec facilisis, mauris in luctus efficitur, quam nisl blandit turpis, at euismod diam leo non enim.'
                }
            },
            {
                id: 'n107',
                createdAt: 1112223,
                type: 'NoteImg',
                isPinned: false,
                style:
                {
                    backgroundColor:
                        '#d4e4ed'
                },
                info: {
                    url: 'https://t4.ftcdn.net/jpg/06/25/06/19/360_F_625061934_exx8DIaKNJj0VSFBRDcNZeuwiDpN17PI.jpg',
                    title: 'Camellia'
                }
            },
            {
                id: 'n108',
                createdAt: 1112223,
                type: 'NoteImg',
                isPinned: false,
                style:
                {
                    backgroundColor:
                        '#fff8b8'
                },
                info: {
                    url: 'https://www.stemsmarket.com/pick-up/wp-content/uploads/sites/2/2018/06/gerb_enjoy_xl.jpg',
                    title: 'Barberton daisy'
                }
            },
        ]
        storageService.saveToStorage(NOTE_KEY, notes)
    }
}

function _setNextPrevNoteId(note) {
    return storageService.query(NOTE_KEY).then((notes) => {
        const noteIdx = notes.findIndex((currNote) => currNote.id === note.id)
        const nextNote = notes[noteIdx + 1] ? notes[noteIdx + 1] : notes[0]
        const prevNote = notes[noteIdx - 1] ? notes[noteIdx - 1] : notes[notes.length - 1]
        note.nextNoteId = nextNote.id
        note.prevNoteId = prevNote.id
        return note
    })
}

function getFilterFromSearchParams(searchParams) {
    // return Object.fromEntries(searchParams)
    const txt = searchParams.get('txt') || ''
    return {
        txt
    }
}

function _createNote() {
    let notes = storageService.loadFromStorage(NOTE_KEY) || []
    const newNote = getEmptyNote()
    notes.push(newNote)
    storageService.saveToStorage(NOTE_KEY, notes)
}