import { MailPreview } from './MailPreview.jsx'
const { useState, useEffect, Fragment } = React
const { Link } = ReactRouterDOM

export function MailList({ mails, onRemoveMail, onToggleStarred }) {
    return (
        <section className="mail-list">
            {mails.map(mail => (
                <MailPreview
                    key={mail.id}
                    mail={mail}
                    onRemoveMail={onRemoveMail}
                    onToggleStarred={onToggleStarred}  
                />
            ))}
        </section>
    )
}
