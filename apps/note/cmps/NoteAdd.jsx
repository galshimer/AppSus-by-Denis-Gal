

// const { useNavigate, useParams, useSearchParams } = ReactRouterDOM
// const { useState, useEffect, useRef } = React

// import { eventBusService } from '../../../services/event-bus.service.js'
// import { noteService } from "../services/note.service.js"

// export function AddNote({ onSaveNewNote }) {
//     const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())


//     function onSaveNote(ev) {
//         ev.preventDefault()
//         console.log(noteToEdit)
//         noteService.save(noteToEdit)
//             .then((note) => {
//                 console.log('Note saved successfully:', note)
//                 onSaveNewNote(note)
//                 // setNoteToEdit(noteService.getEmptyNote())
//             })
//             .catch(err => console.log('err:', err))
//     }

//     function handleChange({ target }) {
//         const field = target.name
//         let value = target.value
//         console.log(field);
//         console.log(value);
//         switch (target.type) {
//             case 'number':
//             case 'range':
//                 value = +value
//                 break;

//             case 'checkbox':
//                 value = target.checked
//                 break

//             default:
//                 break;
//         }

//         setNoteToEdit(prevNote => ({
//             ...prevNote,
//             info: {
//                 ...prevNote.info,
//                 [field]: value
//             }
//         }))
//     }

//     const { info } = noteToEdit
// }
// return (
//     <section className="add-note-section" >
//         <div className="add-note-container">
//             <Accordion title="Take a note"> /}
//             <form onSubmit={onSaveNote}>
//                 <label htmlFor="byText"></label>
//                 <input
//                     type="text"
//                     id="byText"
//                     name="txt"
//                     className="input add-note-input"
//                     placeholder="Take a note"
//                     onChange={handleChange} value={info.txt || ''}
//                 />

//                 <div className="submit-icones">
//                     <button className="button-reset " type="submit"><span className="material-symbols-outlined">add</span></button>
//                     <span className="material-symbols-outlined"> text_fields </span>
//                     <span className="material-symbols-outlined"> image  </span>
//                     <span className="material-symbols-outlined"> youtube_activity </span>
//                     <span className="material-symbols-outlined">list_alt </span>
//                 </div>
//             </form>
//             {/ </Accordion>
//         </div>
//     </section>
// )