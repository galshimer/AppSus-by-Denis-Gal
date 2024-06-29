import { mailService } from "../services/mail.service.js"
import { MailList } from '../cmps/MailList.jsx'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { MailFolderList } from '../cmps/MailFolderList.jsx'

const { useEffect, useState } = React

export function MailIndex() {
    const [mails, setMails] = useState([])
    const [filterBy, setFilterBy] = useState({ txt: '' })
    const [filteredMails, setFilteredMails] = useState([])

    useEffect(() => {
        mailService.query()
            .then(fetchedMails => {
                setMails(fetchedMails)
                setFilteredMails(fetchedMails)
            })
    }, [])

    useEffect(() => {
        filterEmails()
    }, [filterBy, mails])

    const handleSetFilter = (newFilter) => {
        setFilterBy(newFilter)
    }

    const filterEmails = () => {
        const { txt } = filterBy
        if (!txt) {
            setFilteredMails(mails)
            return
        }
        const regExp = new RegExp(txt, 'i')
        const filtered = mails.filter(mail =>
            regExp.test(mail.subject) || regExp.test(mail.body)
        )
        setFilteredMails(filtered)
    }

    function onToggleStarred(mail) {
        mail.isStarred = !mail.isStarred
        mailService
            .save(mail)
            .then(updatedMail => {
                setMails(prevMails =>
                    prevMails.map(mail =>
                        mail.id === updatedMail.id ? updatedMail : mail
                    )
                )
            })
            .catch(err => console.error('Failed to star the mail:', err))
    }

    return (
        <section className="mail-index">
            <div className="list-filter-container">
                <MailFolderList
                    // onSetFilter={onSetFilter}
                    // filterBy={{ folder }}
                    // unreadCount={unreadCount}
                    
                />
                <MailFilter
                    filterBy={filterBy}
                    onSetFilter={handleSetFilter} />
                <MailList
                    mails={filteredMails}
                    onRemoveMail={(id) => setMails(mails.filter(mail => mail.id !== id))}
                    onToggleStarred={onToggleStarred} />
            </div>
        </section>
    )
}
