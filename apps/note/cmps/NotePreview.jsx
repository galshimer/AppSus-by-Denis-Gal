
export function NotePreview({ note }) {

    const { title, text } = note

    return (
        <article className="note-preview">
            <h2>Title: {title}</h2>
            <h4>Text: {text}</h4>
        </article>
    )
}