import { mailService } from "../services/mail.service.js"
import { MailList } from '../cmps/MailList.jsx'
import { MailFilter } from '../cmps/MailFilter.jsx'

const { useEffect, useState } = React

export function MailIndex() {
    const [emails, setEmails] = useState([])
    const [filterBy, setFilterBy] = useState({ txt: '' })
    const [filteredEmails, setFilteredEmails] = useState([])

    useEffect(() => {
        mailService.query().then(fetchedEmails => {
            setEmails(fetchedEmails)
            setFilteredEmails(fetchedEmails)
        })
    }, [])

    useEffect(() => {
        filterEmails()
    }, [filterBy, emails])

    const handleSetFilter = (newFilter) => {
        setFilterBy(newFilter)
    }

    const filterEmails = () => {
        const { txt } = filterBy
        if (!txt) {
            setFilteredEmails(emails)
            return
        }
        const regExp = new RegExp(txt, 'i')
        const filtered = emails.filter(mail =>
            regExp.test(mail.subject) || regExp.test(mail.body)
        )
        setFilteredEmails(filtered)
    }

    return (
        <section>
            <MailFilter filterBy={filterBy} onSetFilter={handleSetFilter} />
            <MailList mails={filteredEmails} onRemoveMail={(id) => setEmails(emails.filter(mail => mail.id !== id))} />
        </section>
    )
}
