import React, { useContext } from 'react'
import notesContext from './NotesContext'

export default function NoteList() {
    const { notes, filter } = useContext(notesContext)
    return (
        <div>
            <ul>
                {
                    notes.filter(note => note.desc.toLowerCase().includes(filter.toLowerCase()))
                        .map(note => (
                            <li key={note.id}>{note.desc}</li>
                        ))
                }
            </ul>
        </div>
    )
}