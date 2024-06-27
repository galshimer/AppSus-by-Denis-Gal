const { Link } = ReactRouterDOM

export function MailPreview({ mail, onRemoveMail }) {
    const { subject, body, from } = mail
    return (
        <article className="mail-preview">
            <div className="mail-info">
                <span className="mail-from">{from}</span>
                <span className="mail-subject">{subject}</span>
                <span className="mail-body">{body}</span>
            </div>
            <div className="mail-actions">
                <button className="remove-btn" onClick={() => onRemoveMail(mail.id)}>Remove</button>
                <button className="details-btn"><Link to={`/mail/${mail.id}`}>Details</Link></button>
            </div>
        </article>
    )
}

// id: utilService.makeId(),
//         createdAt: 1551133930500,
//         subject: 'Miss you!',
//         body: 'Would love to catch up sometimes',
//         isRead: false,
//         sentAt: 1551133930594,
//         removedAt: null,
//         from: 'momo@momo.com',
//         to: 'user@appsus.com