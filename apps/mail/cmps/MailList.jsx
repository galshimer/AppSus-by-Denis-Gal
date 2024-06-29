import { MailPreview } from './MailPreview.jsx'
const { useState, useEffect, Fragment } = React
// const { useNavigate } = ReactRouterDOM
const { Link } = ReactRouterDOM

// export function MailList({ mails, onRemoveMail, onToggleStarred }) {
//     // const navigate = useNavigate()
//     // function onMoveToMail(mailId) {
//     //     navigate(`/mail/${mailId}`)
//     // }

//     // onClick={() => onMoveToMail(mail.id)}

    
    
//     return (
//         <ul className="mail-list">
//             {mails.map(mail => (
//                 <li key={mail.id} >

                    

//                     <Link to={`/mail/${mail.id}`}>
//                         <MailPreview
//                             mail={mail}
//                             onRemoveMail={onRemoveMail}
//                         />
//                     </Link>
//                 </li>

//             ))
//             }
//         </ul >

//     )
// }

// import { MailPreview } from './MailPreview.jsx'

export function MailList({ mails, onRemoveMail, onToggleStarred }) {
    return (
        <section className="mail-list">
            {mails.map(mail => (
                <MailPreview
                    key={mail.id}
                    mail={mail}
                    onRemoveMail={onRemoveMail}
                    onToggleStarred={onToggleStarred}  // Ensure this is passed correctly
                />
            ))}
        </section>
    )
}
