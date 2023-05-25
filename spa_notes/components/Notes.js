'use client'

import { useState } from "react";


// parameters come from parent i.e Page
export default function Notes(props) {

    // store notes object from parent to the notes
    // const { notes } = props;

    // state for data entry from input 
    const [desc, setDesc] = useState('');

    // change props as state for sending data from child to parent
    const [notes, setNotes] = useState(props.notes);

    // event is changed value from the user
    const handleChange = (event) => {

        console.log(event.target.value);
        setDesc(event.target.value);
    };

    // 
    const handleAdd = (event) => {
        // stop default behaviour of form and button
        event.preventDefault();

        // object of note to store desc
        // NOte: while working with API , we make object here
        const newNote = {
            id: notes.length + 1,
            // user input value desc is already in desc beacuse of descState
            desc: desc,
            // if random comes lesser than 0.5 then, it is true otherwise false
            important: Math.random() < 0.5
        }

        console.log(newNote);

        // push the newNote to the notes of parent
        setNotes(notes.concat(newNote));
    };

    const handleDelete = (noteId) => {
        // alert(noteId);
        const newDeletedNotes = notes.filter(note => note.id !== noteId);
        // console.log(newDeletedNotes);
        setNotes(newDeletedNotes);
    }
    return (
        <>
            <h1>Welcome to Notes</h1>

            <ul>
                {
                    notes.map(note =>
                        <li key={note.id}>{note.desc}{'    '}
                            {/* send id as a parameter in handleDelete */}
                            <button onClick={(id) => handleDelete(note.id)}>delete</button >
                        </li>
                    )
                }
            </ul >

            <form>
                <input

                    type="text"
                    value={desc}
                    onChange={handleChange}
                />
                <button onClick={handleAdd}>Add</button>
            </form>
        </>
    );
}