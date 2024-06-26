const { useParams, Link } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"

const { useEffect, useState } = React

export function MailDetails() {

    const [mail, setMail] = useState(null)

    const { mailId } = useParams()

    useEffect(() => {
        loadMail()
    }, [mailId])


    function loadMail() {
        mailService.get(mailId)
            .then(mail => setMail(mail))
    }

    if (!mail) return <div>Loading...</div>
    return (
        <section className="mail-details">
            <h1>Subject: {mail.subject}</h1>
            <h1>{mail.createdAt}</h1>
            <p>{mail.body}</p>
            <button ><Link to="/mail">Back</Link></button>
            <section>
                <button ><Link to={`/mail/${mail.prevMailId}`}>Prev Mail</Link></button>
                <button ><Link to={`/mail/${mail.nextMailId}`}>Next Mail</Link></button>
            </section>
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