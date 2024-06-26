
const { useState, useEffect } = React

export function NoteFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    const filters = [
        { display: 'All', filter: '' },
        { display: 'Text', filter: 'NoteTxt' },
        { display: 'Image', filter: 'NoteImg' },
        { display: 'Todo', filter: 'NoteTodos' }
    ]

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function onFilterClick(filterType) {
        setFilterByToEdit((prevFilter) => ({
            ...prevFilter,
            type: filterType,
        }))
    }

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.type === 'number' ? +ev.target.value : ev.target.value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    return (
        <div className="note-filter">
            <span className="search-icon material-symbols-outlined">search</span>
            <input
                type="text"
                placeholder="Search"
                className="note-search-input"
                onChange={handleChange}
                value={filterByToEdit.txt || ''}
                name="txt"
            />
            <div className="filter-icon">
                <span className="material-symbols-outlined">filter_alt</span>
                <div className="note-filter-type">
                    {filters.map((filterItem) => {
                        return (
                            <p className={filterByToEdit.type === filterItem.filter ? 'active' : ''}
                                key={filterItem.display}
                                onClick={() => onFilterClick(filterItem.filter)}>
                                {filterItem.display}
                            </p>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

