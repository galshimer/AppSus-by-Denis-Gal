const { Link } = ReactRouterDOM

export function MailPreview({ mail, onRemoveMail, onToggleStarred }) {
    const { subject, body, from, createdAt, isRead, isStarred } = mail

    function handleDeleteMail(ev) {
        ev.stopPropagation()
        onRemoveMail(mail.id)
    }

    function handleStarClick(ev) {
        ev.stopPropagation()
        onToggleStarred(mail)  
    }

    const date = new Date(createdAt)
    const formattedDate = new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit' }).format(date)

    return (
        <article className={`mail-preview ${isRead ? 'read' : ''} ${isStarred ? 'starred' : ''}`}>
            <span
                className={`material-symbols-outlined btn ${isStarred ? 'starred' : 'unstarred'}`}
                onClick={handleStarClick}>
                star
            </span>
            <p className="mail-from">{from}</p>
            <div className="divider"></div>
            <div className="mail-info">
                <span className="mail-subject">{subject}</span>
                <span className="mail-body">- {body}</span>
            </div>
            <div className="mail-actions">
                <span className="material-symbols-outlined remove-btn" onClick={handleDeleteMail}>
                    delete
                </span>
            </div>
            <p className="mail-date">{formattedDate}</p>
        </article>
    )
}
