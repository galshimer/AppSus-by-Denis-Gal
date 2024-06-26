export function MailFilter({ filterBy, onSetFilter }) {
    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'checkbox' ? target.checked : target.value
        onSetFilter({ [field]: value })
    }

    function handleLabelChange({ target }) {
        const value = target.value
        const labels = filterBy.labels.includes(value)
            ? filterBy.labels.filter(label => label !== value)
            : [...filterBy.labels, value]
        onSetFilter({ labels })
    }

    return (
        <div className="mail-filter">
            <input
                type="text"
                name="txt"
                placeholder="Search emails"
                value={filterBy.txt}
                onChange={handleChange}
            />
            <div className="folder-filter">
                <button name="status" value="inbox" onClick={handleChange}>Inbox</button>
                <button name="status" value="sent" onClick={handleChange}>Sent</button>
                <button name="status" value="drafts" onClick={handleChange}>Drafts</button>
                <button name="status" value="trash" onClick={handleChange}>Trash</button>
            </div>
            <div className="extra-filters">
                <label>
                    <input
                        type="checkbox"
                        name="isRead"
                        checked={filterBy.isRead || false}
                        onChange={handleChange}
                    />
                    Read
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="isStared"
                        checked={filterBy.isStared || false}
                        onChange={handleChange}
                    />
                    Starred
                </label>
                <div className="label-filter">
                    <label>
                        <input
                            type="checkbox"
                            value="important"
                            checked={filterBy.labels.includes('important')}
                            onChange={handleLabelChange}
                        />
                        Important
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="romantic"
                            checked={filterBy.labels.includes('romantic')}
                            onChange={handleLabelChange}
                        />
                        Romantic
                    </label>
                </div>
            </div>
        </div>
    )
}
