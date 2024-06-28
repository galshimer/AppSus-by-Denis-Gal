import { MailPreview } from './MailPreview.jsx'
const { useNavigate } = ReactRouterDOM

export function MailList({ mails, onRemoveMail }) {
    const navigate = useNavigate()
    function onMoveToMail(mailId) {
        navigate(`/mail/${mailId}`)
    }

    return (
        <ul className="mail-list">
            {mails.map(mail => (

                <li key={mail.id} onClick={() => onMoveToMail(mail.id)}>
                    <MailPreview
                        mail={mail}
                        onRemoveMail={onRemoveMail}
                    />
                </li>

            ))
            }
        </ul >

    );
}