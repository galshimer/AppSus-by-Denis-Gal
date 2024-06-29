const { useState, useEffect } = React
const { useNavigate } = ReactRouter

export function MailFolderList({
  onSetFilter,
  filterBy,
  unreadCount,
}) {
  // Ensure filterBy has a default folder value
  const defaultFilterBy = { folder: 'inbox', ...filterBy }
  const [filterByToEdit, setFilterByToEdit] = useState(defaultFilterBy)

  const navigate = useNavigate()

  useEffect(() => {
    if (filterByToEdit && filterByToEdit.folder) {
      onSetFilter(filterByToEdit)
    }
  }, [filterByToEdit])

  function handleFolderChange(folder) {
    setFilterByToEdit({ folder })
    navigate('/mail')
  }

  const folder = filterByToEdit?.folder

  return (
    <section>
      <div className="folder-container flex column">
        <button
          className={`btn-folder btn-inbox ${folder === 'inbox' ? 'active' : ''}`}
          onClick={() => handleFolderChange('inbox')}
        >
          Inbox
          <span className="unread-count">{unreadCount}</span>
        </button>

        {/* Uncomment other folder buttons if needed */}
        {/* 
        <button
          className={`btn-folder btn-starred ${folder === 'starred' ? 'active' : ''}`}
          onClick={() => handleFolderChange('starred')}
        >
          Starred
        </button>

        <button
          className={`btn-folder btn-sent ${folder === 'sent' ? 'active' : ''}`}
          onClick={() => handleFolderChange('sent')}
        >
          Sent
        </button>

        <button
          className={`btn-folder btn-trash ${folder === 'trash' ? 'active' : ''}`}
          onClick={() => handleFolderChange('trash')}
        >
          Trash
        </button>

        <button
          className={`btn-folder btn-draft ${folder === 'draft' ? 'active' : ''}`}
          onClick={() => handleFolderChange('draft')}
        >
          Draft
        </button> 
        */}
      </div>
    </section>
  )
}
