const { useParams, Link } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"

const { useEffect, useState } = React

export function MailDetails({ onRemoveMail }) {

    const [mail, setMail] = useState(null)

    const { mailId } = useParams()

    const [isMailRemoved, setIsMailRemoved] = useState(false)

    useEffect(() => {
        loadMail()
    }, [mailId])


    function loadMail() {
        mailService.get(mailId)
            .then(mail => setMail(mail))
    }

    function onRemoveMail(mailId) {
        mailService.remove(mailId)
            .then(() => {
                console.log(`Mail with ID ${mailId} removed successfully!`);
                setIsMailRemoved(true); // Set a flag indicating removal
            })
            .catch(err => {
                console.error('Failed to remove mail:', err);
            });
    }


    if (!mail) return <div>Loading...</div>
    const formattedDate = new Date(mail.createdAt).toLocaleString()

    return (
        <section className="mail-details">
            <div className="mail-header">
                <h1>{mail.subject}</h1>
                <span className="mail-date">{formattedDate}</span>
            </div>
            <div className="mail-body">
                <p>{mail.body}</p>
            </div>
            <div className="mail-actions">
                <button className="back-btn">
                    <Link to="/mail">Back</Link>
                </button>
                <button className="nav-btn">
                    <Link to={`/mail/${mail.prevMailId}`}>Prev Mail</Link>
                </button>
                <button className="nav-btn">
                    <Link to={`/mail/${mail.nextMailId}`}>Next Mail</Link>
                </button>
                <button className="remove-btn" onClick={() => onRemoveMail(mail.id)}>
                    Remove
                </button>
            </div>
            {isMailRemoved && (
                <div>
                    Email removed successfully! You can navigate back to the inbox.
                </div>
            )}
        </section>
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