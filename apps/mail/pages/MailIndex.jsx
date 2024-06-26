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

    if (!mails) return <div>Loading...</div>
    return (
        <section className="mail-index">
            {/* <button><Link to="/car/edit">Add Car</Link></button> */}
            {/* <CarFilter filterBy={filterBy} onSetFilter={onSetFilter} /> */}
            <MailList
                mails={mails}
            // onRemoveCar={onRemoveCar}
            />
        </section>
    )
}