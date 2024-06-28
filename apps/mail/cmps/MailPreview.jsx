const { Link } = ReactRouterDOM


// id: utilService.makeId(),
//         createdAt: 1551133930500,
//         subject: 'Miss you!',
//         body: 'Would love to catch up sometimes',
//         isRead: false,
//         sentAt: 1551133930594,
//         removedAt: null,
//         from: 'momo@momo.com',
//         to: 'user@appsus.com

export function MailPreview({ mail, onRemoveMail }) {
    const { subject, body, from, createdAt } = mail;
    return (
        <article className="mail-preview" > 
            <p className="mail-from">{from}</p>
            <div className="mail-info">
                <span className="mail-subject">{subject}</span>
                <span className="mail-body">{body}</span>
            </div>
            <div className="mail-actions">
                {/* <button className="remove-btn" onClick={() => onRemoveMail(mail.id)}>Remove</button> */}
                <span className="material-symbols-outlined remove-btn" onClick={() => onRemoveMail(mail.id)}>
                    delete
                </span>
                {/* <button className="details-btn"><Link to={`/mail/${mail.id}`}>Details</Link></button> */}
            </div>
            <p className="mail-date">{createdAt}</p>
        </article>
    );
}