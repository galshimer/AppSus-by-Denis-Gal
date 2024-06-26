const { Link } = ReactRouterDOM

export function MailPreview({ mail, onRemoveMail }) {

    const { subject, body, from } = mail
    return (
        <article className="mail-preview">
            <span>{from} {subject} {body}
                <button onClick={() => onRemoveMail(mail.id)}>Remove</button>
                <button><Link to={`/mail/${mail.id}`}>Details</Link></button>
                <button><Link to={`/mail/edit/${mail.id}`}>Edit</Link></button>
            </span>
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