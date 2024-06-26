import { MailPreview } from "./MailPreview.jsx"

export function MailList({mails}) {
    return (
        <ul className="mail-list">
            {mails.map(mail =>
                <li key={mail.id}>
                    <MailPreview mail={mail} />
                    <section>
                        {/* <button onClick={() => onRemoveCar(car.id)}>Remove</button> */}
                        {/* <button><Link to={`/car/${car.id}`}>Details</Link></button> */}
                        {/* <button><Link to={`/car/edit/${car.id}`}>Edit</Link></button> */}
                    </section>
                </li>
            )}
        </ul>
    )
}
