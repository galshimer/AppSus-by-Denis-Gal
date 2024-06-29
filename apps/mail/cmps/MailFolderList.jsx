const { useState, useEffect } = React
const { useNavigate } = ReactRouter

// export function MailFolderList() {
//   return (
//     <h1>HELLO</h1>
//   )
// }


export function MailFolderList({ onSetFilter, filterBy, unreadCount }) {
  const defaultFilterBy = { folder: 'inbox', ...filterBy }
  const [filterByToEdit, setFilterByToEdit] = useState(defaultFilterBy)
  const navigate = useNavigate()

  useEffect(() => {
    if (filterByToEdit.folder !== filterBy.folder) {
      onSetFilter(filterByToEdit)
    }
  }, [filterByToEdit, filterBy, onSetFilter])

  function handleFolderChange(folder) {
    setFilterByToEdit({ folder })
    console.log(filterByToEdit)
    navigate('/mail')
  }

  const folder = filterByToEdit.folder

  return (
    <section>
      <div className="compose-container">
        <button className="btn-compose">
          <span className="material-symbols-outlined">
            edit
          </span>
          <span>Compose</span>
        </button>
      </div>
      <div className="folder-container flex column">
        <button
          className={`btn-folder btn-inbox ${folder === 'inbox' ? 'active' : ''}`}
          onClick={() => handleFolderChange('inbox')}
        >
          <span className="material-symbols-outlined">
            inbox
          </span>
          Inbox
          <span className="unread-count"></span>
        </button>
        <button
          className={`btn-folder btn-starred ${folder === 'starred' ? 'active' : ''}`}
          onClick={() => handleFolderChange('starred')}
        >
          <span
            className="material-symbols-outlined btn" >
            star
          </span>
          Starred
        </button>
        <button
          className={`btn-folder btn-sent ${folder === 'sent' ? 'active' : ''}`}
          onClick={() => handleFolderChange('sent')}
        >
          <span className="material-symbols-outlined">
            send
          </span>
          Sent
        </button>
        <button
          className={`btn-folder btn-trash ${folder === 'trash' ? 'active' : ''}`}
          onClick={() => handleFolderChange('trash')}
        >
          <span className="material-symbols-outlined remove-btn" >
            delete
          </span>
          Trash
        </button>

        <button
          className={`btn-folder btn-draft ${folder === 'draft' ? 'active' : ''}`}
          onClick={() => handleFolderChange('draft')}
        >
          <span className="material-symbols-outlined">
            draft
          </span>
          Draft
        </button>
      </div>
    </section>
  )
}

