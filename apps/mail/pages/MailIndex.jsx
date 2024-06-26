import { mailService } from "../services/mail.service.js"
import { MailList } from '../cmps/MailList.jsx'

const { useEffect, useState } = React

export function MailIndex() {
    const [mails, setMails] = useState(null)

    useEffect(() => {
        loadMails()
    }, [])

    function loadMails() {
        mailService.query()
            .then(mails => {
                setMails(mails)
            })
            .catch(err => {
                console.log('err:', err)
            })
    }

    function onRemoveMail(mailId) {
        mailService.remove(mailId).then(() => {
            setMails(prevMails => prevMails.filter(mail => mail.id !== mailId))
        }).catch(err => {
            console.log('Failed to remove mail:', err)
        })
    }

    if (!mails) return <div>Loading...</div>
    return (
        <section className="mail-index">
            <MailList
                mails={mails}
                onRemoveMail={onRemoveMail}
            />
        </section>
    )
}
