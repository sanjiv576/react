'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import AddNote from './AddNote';
import NoteList from './NoteList';
import notesContext from './NotesContext';
import NotesFilter from './NotesFilter';

export default function NoteApp() {

  const [notes, setNotes] = useState([]);
  const [desc, setDesc] = useState('');
  const [filter, setFilter] = useState('');

  // useEffect --> to track
  useEffect(() => {
    axios.get('http://localhost:3000/notes.json')
      .then(res => {
        console.log(res.data.notes);
        setNotes(res.data.notes);

      })
  }, []);

  const handleAdd = (event) => {

    event.preventDefault();
    const newNote = {
      id: notes.length + 1,
      desc: desc,
      important: Math.random() < 0.5
    }
    setNotes(notes.concat(newNote));
    setDesc('');

  }

  const handleChange = (event) => {
    setFilter(event.target.value);

    const searchingText = event.target.value;
    const filteredNotes = notes.filter(note => note.desc.includes(searchingText));
    setNotes(filteredNotes);
  };
  return (
    <div>
      {/* wrap with notesContext i.e context API  to use Provider*/}
      <notesContext.Provider value={{ notes, handleAdd, desc, setDesc, filter, setFilter }}>

<NotesFilter />

        {/* without using context API */}
        {/* < NoteList notes={notes} /> */}

        {/* using context */}
        < NoteList />


        <br />
        {/* using props to pass values */}
        {/* < AddNote desc={desc} setDesc={setDesc} handleAdd={handleAdd} /> */}

        {/* using context to send data */}
        <AddNote />
      </notesContext.Provider>
    </div>
  )
}
