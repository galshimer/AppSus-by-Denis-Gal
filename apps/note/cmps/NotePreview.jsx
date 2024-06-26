
export function NotePreview({ note }) {

    const { type, info } = note

    let content
    if (type === 'NoteTxt') {
        content = <p>{info.txt}</p>
    } else if (type === 'NoteImg') {
        content = (
            <div>
                <img src={info.url} alt={info.title} />
                <h4>{info.title}</h4>
            </div>
        )
    } else if (type === 'NoteTodos') {
        content = (
            <div className="note todo">
                <h4>{info.title}</h4>
                <ul>
                    {info.todos.map((todo, idx) => (
                        <li key={idx}>
                            {todo.txt} {todo.doneAt ? '(Done)' : '(Pending)'}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
    return (
        <article className="note-preview" >
            {content}
        </article>
    )
}