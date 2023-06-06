'use client'

import axios from "axios";
import { useEffect, useState } from "react";
// import for icons
import { AiFillDelete , AiFillEdit} from "react-icons/ai";

const baseUrl = 'http://localhost:4000/notes';

// parameters come from parent i.e Page
export default function Notes() {



    // store notes object from parent to the notes
    // const { notes } = props;

    // state for data entry from input 
    const [desc, setDesc] = useState('');

    // change props as state for sending data from child to parent
    const [notes, setNotes] = useState([]);

    // to handle the state for showing either edit or save button
    const [isEdit, setIsEdit] = useState(false);

    // state to store which note is going to be edited
    const [targetNote, setTargetNote] = useState();

    // state for showing either important or  all button
    const [showAll, setShowAll] = useState(true);

    // another Hook to render the component --> called by React
    useEffect(() => {

        // fetch the data from the server 
        axios.get(baseUrl)
            .then(response => {
                // console.log(response);
                // console.log(response.data);

                // send data
                setNotes(response.data);

            })

        // NOte: , [] ===> is used to render only once, to see effect remove , [] and Go to browser ==> Inspect ==> Network 

    }, []);

    // storing either all or important notes  ==> same logic used for searching particular note
    const filteredNotes = showAll ? notes
        :
        // only store imporant notes
        notes.filter(note => note.important === true);

    // event is changed value from the user
    const handleChange = (event) => {

        // console.log(event.target.value);
        setDesc(event.target.value);
    };

    // 
    const handleAdd = (event) => {
        // stop default behaviour of form and button
        event.preventDefault();

        // object of note to store desc
        // NOte: while working with API , we make object here
        const newNote = {

            // removed id, becuase server creates it
            // id: notes.length + 1,

            // user input value desc is already in desc beacuse of descState
            desc: desc,
            // if random comes lesser than 0.5 then, it is true otherwise false
            important: Math.random() < 0.5
        }

        // console.log(newNote);

        // now pushing data to the server
        axios.post(baseUrl, newNote)
            .then(response => {
                console.log(response.data);
                // push the newNote to the notes of parent to the local
                setNotes(notes.concat(response.data));
            })
        setDesc('')

        window.my_modal_3.close()

    };

    const handleEdit = (noteId) => {
        window.my_modal_3.showModal()
        // alert(noteId);

        // console.log(notes.find(note => note.id === noteId));
        const targetNote = notes.find(note => note.id === noteId);
        // set in the input form
        setDesc(targetNote.desc);
        // change the state
        setIsEdit(true);
        // set the state which note is going to be edited
        setTargetNote(targetNote);

    }

    // Note: Save button is inside the form so we need event to prevent from the default button behaviour 
    //i.e rendering the page which means resetting the state

    const handleSave = (event) => {

        // prevent from the resetting the state
        event.preventDefault();



        // update to the server
        axios.put(`${baseUrl}/${targetNote.id}`,
            // update those things to be updated
            { ...targetNote, desc: desc })
            .then(response => {
                console.log(response);

                // after success, also change in local
                // edit/update the note
                const updatedNotes = notes.map(note => note.id === targetNote.id ?
                    { ...targetNote, desc: desc }
                    : note);
                setNotes(updatedNotes);

            })


        // reset the state of button and desc input
        setIsEdit(false);
        setDesc('');

        // close the modal 
        window.my_modal_3.close();


    }

    // for toggling 
    const handleImportant = () => {
        setShowAll(!showAll)

        // const importantNotes = notes.filter(note => note.important === true);
        // // console.log(importantNotes);
        // setNotes(importantNotes);
    }


    const handleDelete = (noteId) => {

        if (window.confirm(`Are you sure to delete note with id ${noteId}`)) {
            // alert(noteId);
            const newDeletedNotes = notes.filter(note => note.id !== noteId);
            // console.log(newDeletedNotes);

            // sending data to the server
            axios.delete(`${baseUrl}/${noteId}`)
                .then(response => {
                    console.log(response);

                    // after only success
                    setNotes(newDeletedNotes);

                })
        }
    }
    return (
        <>
            <h1>Welcome to Notes</h1>
            <button className="btn btn-primary" onClick={handleImportant}>show {showAll ? 'important' : 'all'}</button>

            {/* <button onClick={handleImportant}> show {showAll ? 'important' : 'all'}</button> */}
            {/* You can open the modal using ID.showModal() method */}
            <button className="btn btn-secondary center" onClick={() => window.my_modal_3.showModal()}>Add task</button>
            <dialog id="my_modal_3" className="modal">
                <form method="dialog" className="modal-box">
                    <button htmlFor="my-modal-3" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    <input
                        placeholder="Enter your note"
                        className="input input-bordered input-warning w-full max-w-xs"
                        type="text"
                        value={desc}
                        onChange={handleChange}
                    />

                    {
                        isEdit ?
                            // <button onClick={handleSave}>Save</button>
                            <button className="btn btn-primary" onClick={handleSave}>Save</button>


                            :
                            // <button onClick={handleAdd}>Add</button>
                            <button className="btn btn-primary" onClick={handleAdd}>Add</button>


                    }
                </form>
            </dialog>


            {/* using daisy table */}
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>

                            <th>Description</th>

                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {/* <tr className="bg-base-200"> */}
                        {
                            filteredNotes.map(note =>
                                <tr key={note.id} className="bg-base-200">
                                    {/* send id as a parameter in handleDelete */}
                                    <td>{note.desc}{'    '}</td>
                                    <td>
                                        <button className="btn btn-outline btn-primary" onClick={() => handleDelete(note.id)}>
                                        <AiFillDelete/ > Delete
                                        </button>
                                        <button className="btn btn-outline btn-secondary" onClick={() => handleEdit(note.id)}>
                                            <AiFillEdit/> Edit
                                            
                                        </button>
                                        {/* <button onClick={(id) => handleDelete(note.id)}>delete</button >
                                        <button onClick={(id) => handleEdit(note.id)}>edit</button > */}
                                    </td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
            <br></br>


            {/* <form>
                <input

                    type="text"
                    value={desc}
                    onChange={handleChange}
                />

                {
                    isEdit ?
                        <button onClick={handleSave}>Save</button>

                        :
                        <button onClick={handleAdd}>Add</button>

                }
            </form> */}

        </>
    );
}