import React, { useContext } from 'react'
import notesContext from './NotesContext'

export default function NotesFilter() {
  const { setFilter, filter } = useContext(notesContext);
  return (
    <div>
      <input type="text" value={filter} placeholder='Search by ...' onChange={(e) => setFilter(e.target.value)} />

    </div>
  )
}
