import React, { useEffect, useState } from 'react'

export default function Notes() {
  const [notes, setNotes] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      // convert data into json
      .then(res => res.json())
      .then(convertedData => setNotes(convertedData))
      .catch(err => setError('error fetchind data'))

  }, [])
  return (
    <div>
      <h1>List of Notes</h1>

      {
        error
          ? <h1>{error}</h1>
          : <ul>
            {
              notes.map(note => (
                <li key={note.id}>{note.title}</li>
              ))
            }
          </ul>

      }
    </div>
  )
}
