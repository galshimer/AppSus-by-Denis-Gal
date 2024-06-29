const { useState, useEffect } = React
import { MailFolderList } from '../cmps/MailFolderList.jsx'
import { MailCompose } from '../cmps/MailCompose.jsx'
import { MailList } from '../cmps/MailList.jsx'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { mailService } from '../services/mail.service.js'

export function MailIndex() {
    const [mails, setMails] = useState([])
    const [filterBy, setFilterBy] = useState({ txt: '', folder: 'inbox' })
    const [unreadCount, setUnreadCount] = useState(0)

    useEffect(() => {
        loadMails()
    }, [filterBy])

    function loadMails() {
        mailService.query(filterBy)
            .then(fetchedMails => {
                setMails(fetchedMails)
                setUnreadCount(fetchedMails.filter(mail => !mail.isRead).length)
                console.log(fetchedMails)
            })
            .catch(err => console.error('Error loading mails:', err))
    }
    
    function handleSetFilter(newFilter) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...newFilter }))
    }

    function onToggleStarred(mail) {
        mail.isStarred = !mail.isStarred
        mailService.save(mail)
            .then(updatedMail => {
                setMails(prevMails =>
                    prevMails.map(m => m.id === updatedMail.id ? updatedMail : m)
                )
            })
            .catch(err => console.error('Failed to star the mail:', err))
    }

    return (
        <section className="mail-index">
            <MailFolderList
                onSetFilter={handleSetFilter}
                filterBy={filterBy}
                unreadCount={unreadCount}
            />
            <div className="list-filter-container">
                <MailFilter
                    filterBy={filterBy}
                    onSetFilter={handleSetFilter}
                    />
                <MailList
                    mails={mails}
                    onRemoveMail={id => setMails(mails.filter(mail => mail.id !== id))}
                    onToggleStarred={onToggleStarred}
                />
            </div>
        </section>
    )
}
