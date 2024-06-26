import { mailService } from "../apps/mail/services/mail.service.js"

const { useEffect, useState } = React

export function MailIndex() {

    const [mails, setMails] = useState(null)

    useEffect(() => {
        loadMails()
    }, [])
    
    function loadMails() {
        carService.query()
            .then(mails => {
                setMails(mails)
            })
            .catch(err => {
                console.log('err:', err)
            })
    }

    if (!cars) return <div>Loading...</div>
    return (
        <section className="mail-index">
            {/* <button><Link to="/car/edit">Add Car</Link></button> */}
            {/* <CarFilter filterBy={filterBy} onSetFilter={onSetFilter} /> */}
            <MailList
                cars={cars}
                // onRemoveCar={onRemoveCar}
            />
        </section>
    )
}