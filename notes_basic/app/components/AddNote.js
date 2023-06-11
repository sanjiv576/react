import React, { useContext } from 'react'
import notesContext from './NotesContext'

export default function AddNote() {

  const {handleAdd, setDesc, desc} = useContext(notesContext);
  return (
    <div>
        <form onSubmit={handleAdd}>
        <input type="text" placeholder='add note...' value={desc} onChange={() => setDesc(event.target.value)} />
        <button>add</button>
      </form>
    </div>
  )
}
