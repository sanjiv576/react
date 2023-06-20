


import React, { useEffect, useState } from 'react'


// custom hook declaration
const useNotes = () => {

    const [notes, setNotes] = useState([]);

    // traditional approach
    useEffect(
        // call back function , k garne vanera define garcha
        () => {
            fetch('http://localhost:4000/notes')
                // convert into json because we are using fetch which does not have json in return
                .then(res => res.json())
                .then(data => setNotes(data))
        },
        // secon parameter
        []
    )
    return notes
}


export default function Notes() {

    //    custom hooks
    const notes = useNotes();

    return (
        <div>
            {/* fetching data from API instead of using useEffect */}
            <h1>List of Notes</h1>

            {
                notes.map(note => <li key={note.id}>{note.desc}</li>)
            }
        </div>
    )
}
