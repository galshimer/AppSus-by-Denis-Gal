const { useParams, Link } = ReactRouterDOM
const { useEffect, useState } = React
import { mailService } from "../services/mail.service.js"

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
                console.log(`Mail with ID ${mailId} removed successfully!`)
                setIsMailRemoved(true)
            })
            .catch(err => {
                console.error('Failed to remove mail:', err)
            })
    }

    if (!mail) return <div>Loading...</div>
    const formattedDate = new Date(mail.createdAt).toLocaleString()

    return (
        <section className="mail-index">
            <section className="mail-details">
                <div className="mail-header">
                    <h1>{mail.subject}</h1>
                    <span className="mail-date">{formattedDate}</span>
                </div>
                <div className="mail-body">
                    <p>{mail.body}</p>
                </div>
                <div className="mail-btns">
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
        </section>
    )
}
