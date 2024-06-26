
export function MailPreview({ mail }) {

    const { subject, body, from } = mail
    return (
        <article className="car-preview">
            <span>Subject!!!!: {subject}</span>
            <h4>Body: {body}</h4>

            
            <h5>From: {from}</h5>
            {/* <img src={`../assets/img/${car.vendor}.png`} alt="" /> */}
        </article>
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