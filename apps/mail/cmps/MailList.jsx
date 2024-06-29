import { MailPreview } from './MailPreview.jsx'
const { useState, useEffect, Fragment } = React
// const { useNavigate } = ReactRouterDOM
const { Link } = ReactRouterDOM

export function MailList({ mails, onRemoveMail, onToggleStarred }) {
    // const navigate = useNavigate()
    // function onMoveToMail(mailId) {
    //     navigate(`/mail/${mailId}`)
    // }

    // onClick={() => onMoveToMail(mail.id)}

    function isStarredClass(mail) {
        if (mail.isStarred) return 'starred'
        return 'unstarred'
    }
    
    return (
        <ul className="mail-list">
            {mails.map(mail => (
                <li key={mail.id} >

                    <span 
                    className={`material-symbols-outlined btn ${isStarredClass(mail)}`}
                    onClick={() => onToggleStarred(mail)}>
                        star
                    </span>

                    <Link to={`/mail/${mail.id}`}>
                        <MailPreview
                            mail={mail}
                            onRemoveMail={onRemoveMail}
                        />
                    </Link>
                </li>

            ))
            }
        </ul >

    );
}