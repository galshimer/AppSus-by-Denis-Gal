const { useState, useEffect, useRef } = React
import { utilService } from '../services/util.service.js'

export function MailFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const onSetFilterDebounce = useRef(utilService.debounce(onSetFilter, 700))

    useEffect(() => {
        onSetFilterDebounce.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    const { txt } = filterByToEdit

    return (
        <section className="mail-filter">
            <h2>Filter Emails</h2>
            <form onSubmit={onSubmitFilter}>
                <label htmlFor="txt">Search</label>
                <input
                    value={txt}
                    onChange={handleChange}
                    name="txt"
                    type="text"
                    id="txt"
                    placeholder="Search by subject or content"
                />
                <button>Submit</button>
            </form>
        </section>
    )
}
