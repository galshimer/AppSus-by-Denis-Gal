// // const { useNavigate, useParams } = ReactRouterDOM
// // const { useState, useEffect } = React
// // import { noteService } from "../services/note.service.js"

// // export function NoteEdit() {

// //     const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())
// //     const navigate = useNavigate()
// //     const { noteId } = useParams()

// //     useEffect(() => {
// //         if (noteId) loadNote()
// //     }, [noteId])

// //     function loadNote() {
// //         noteService.get(noteId)
// //             .then(setNoteToEdit)
// //             .catch(err => console.log('err:', err))
// //     }

// //     function onSaveNote(ev) {
// //         ev.preventDefault()
// //         noteService.save(noteToEdit)
// //             .then(() => {
// //                 navigate('/note')
// //                 showSuccessMsg(`Note saved successfully!`)
// //             })
// //             .catch(err => console.log('err:', err))
// //     }

// //     // function handleChange({ target }) {
// //     //     let info = target.info
// //     //     const txt = info.txt

// //     //     switch (info.txt) {
// //     //         case 'number':
// //     //         case 'range':
// //     //             value = +value
// //     //             break;

// //     //         case 'checkbox':
// //     //             value = target.checked
// //     //             break

// //     //         default:
// //     //             break;
// //     //     }

// //     //     setNoteToEdit(prevNote => ({ ...prevNote, [txt]: info }))
// //     // }

    
// //     return (
// //         <section className="note-edit">
// //             <h1>{noteId ? 'Edit' : 'Add'}  Note</h1>
// //             <form onSubmit={onSaveNote}>
// //                 <label htmlFor="txt">Text</label>
// //                 <input onChange={handleChange} value={noteToEdit.info.txt} type="text" name="txt" id="txt" />
// //                 <button>Save</button>
// //             </form>

// //         </section>
// //     )
// // }

// import { useState } from 'react';

// export function NoteEditor({ note, onSaveNote }) {
//     const [noteToEdit, setNoteToEdit] = useState({ ...note });

//     function handleChange({ target }) {
//         const field = target.name;
//         let value = target.value;

//         switch (target.type) {
//             case 'number':
//             case 'range':
//                 value = +value;
//                 break;
//             case 'checkbox':
//                 value = target.checked;
//                 break;
//             default:
//                 break;
//         }

//         setNoteToEdit((prevNote) => ({ ...prevNote, [field]: value }));
//     }

//     function onSubmit(ev) {
//         ev.preventDefault();
//         onSaveNote(noteToEdit);
//     }

//     return (
//         <form onSubmit={onSubmit}>
//             <label htmlFor="txt">Text</label>
//             <input value={noteToEdit.info.txt || ''} onChange={handleChange} name="txt" type="text" id="txt" />
//             {/* Add other fields as necessary */}
//             <button>Save</button>
//         </form>
//     );
// }


