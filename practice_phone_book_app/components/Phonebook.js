'use client'
import axios from "axios";
import { useEffect, useState } from "react";

const baseUrl = 'http://localhost:4000/contacts';

// Step: 4 component for button
const Button = (props) => {
    const { handleClick, text } = props;
    return (
        <button onClick={handleClick}>{text}</button>
    )
};

// Step 3:  component for input
const Input = (props) => {
    const { handleChange, text, type, value } = props;
    return (
        <>
            {text} : {'   '}
            <input
                value={value}
                type={type}
                onChange={handleChange}
            />
            {'  '}
            {/* <br /> */}

        </>
    )
};


// Step 2:  separate component for Retrieve and Update and Delete operations of the contacts details
const ContactDetails = (props) => {

    const { contacts, deleteClick, editClick } = props;


    return (
        <>
            <table>

                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone number</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        contacts.map(contact =>
                            <tr key={contact.id}>
                                <td>{contact.name}</td>
                                <td>{contact.phone}</td>
                                <td>
                                    <Button handleClick={(id) => editClick(contact.id)} text='Edit' />
                                    <Button handleClick={(id) => deleteClick(contact.id)} text='Delete' />
                                </td>
                            </tr>)
                    }
                </tbody>
            </table>
        </>
    )
};


// Step 1: 
export default function Phonebook() {
    // const [contacts, setContacts] = useState(props.contacts);

    const [phonebook, setPhonebook] = useState(
        {
            contacts: [],
            name: '',

            phoneNumber: 0,
            search: '',

            isEdit: false,
            targetContact: null

        }
    );

    useEffect(() => {

        axios.get(baseUrl)
            .then(response => {
                // console.log(response);
                setPhonebook({
                    ...phonebook,
                    contacts: response.data
                });
            })
    }, []);

    const handleSearchChange = (event) => {

        const searchingText = event.target.value;
        // console.log(searchingText);
        // console.log(typeof(searchingText));

        const orginalConacts = phonebook.contacts;
        const filteredContacts = phonebook.contacts.filter(contact => contact.name.includes(searchingText));


        // update UI as well
        setPhonebook({
            ...phonebook,
            search: searchingText,
            contacts: filteredContacts
        });




        // if(searchingText === ''){
        //     setPhonebook({
        //         ...phonebook,
        //         contacts: orginalConacts
        //     })
        // }

    };


    const handleNameChange = (event) => {
        setPhonebook({
            ...phonebook,
            name: event.target.value
        });
        // console.log(phonebook.name);
    }

    const handlePhoneNumChange = (event) => {
        setPhonebook({
            ...phonebook,
            phoneNumber: event.target.value
        });
        // console.log(phonebook.phoneNumber);
    }

    const handleEdit = (contactId) => {

        const targetContact = phonebook.contacts.filter(contact => contact.id === contactId);

        setPhonebook({
            ...phonebook,
            // show name and phone number data in the input
            name: targetContact[0].name,
            phoneNumber: targetContact[0].phone,

            // change Add to Save in button
            isEdit: true,

            // set the state which contact is going to be edited
            targetContact: targetContact
        });

    };

    const handleSave = (event) => {
        // prevent from the resetting the state
        event.preventDefault();

        console.log(phonebook.targetContact[0].id);
        const targetContactId = phonebook.targetContact[0].id;
        console.log(targetContactId);

        setPhonebook({
            ...phonebook,
            name: phonebook.name,
            phoneNumber: phonebook.phoneNumber
        });

        // console.log(phonebook.name);
        // console.log(phonebook.phoneNumber);

        axios.put(`${baseUrl}/${targetContactId}`,
            // NOte: key must be the same as in the db
            { ...targetContactId, name: phonebook.name, phone: phonebook.phoneNumber }
        )
            .then(response => {
                const updatedConttacts = phonebook.contacts.map(contact => contact.id === phonebook.targetContact[0].id ?
                    { ...phonebook, name: phonebook.name, phone: phonebook.phoneNumber }
                    : contact);

                // console.log(updatedConttacts);

                setPhonebook({
                    ...phonebook,
                    contacts: updatedConttacts,
                    name: '',
                    phoneNumber: 0,
                    isEdit: false
                });
            })

    }

    const handleDelete = (contactId) => {
        // alert(contactId);

        if (window.confirm('Are you sure want to delete ? ')) {
            const newContacts = phonebook.contacts.filter(contact => contact.id !== contactId);

            axios.delete(`${baseUrl}/${contactId}`)
                .then(response => {
                    // inwert new contacts after deleting and update UI as well
                    setPhonebook({
                        ...phonebook,
                        contacts: newContacts
                    });
                })

        }

    };

    let handleAdd = (event) => {
        event.preventDefault();
        console.log(`Lenght of array: ${phonebook.contacts.length}`);
        const newId = phonebook.contacts.length + 1;
        const newContact = {
            id: newId,
            name: phonebook.name,
            phone: phonebook.phoneNumber
        };
        // console.log(newContact);

        axios.post(baseUrl, newContact)
            .then(response => {

                console.log(response);
                // add new contact in the contacts

                setPhonebook({
                    ...phonebook,
                    contacts: phonebook.contacts.concat(response.data),
                    name: '',
                    phoneNumber: 0
                });
            })
    };

    return (
        <>
            <h1>Phonebook App</h1>

            <form>
                <input
                    type="text"
                    value={phonebook.search}
                    onChange={handleSearchChange}
                    placeholder="Search by name..."
                ></input>
            </form>


            {/* Step 3:   for adding contact */}

            <h3>Add Contact</h3>

            <form>

                {/* for taking name from user */}
                <Input
                    handleChange={handleNameChange}
                    value={phonebook.name}
                    type='text'
                    text='Name'
                />


                {/* for taking phone number from user */}
                <Input
                    handleChange={handlePhoneNumChange}
                    value={phonebook.phoneNumber}
                    type='number'
                    text='Phone'
                />

                {/* button */}

                {
                    phonebook.isEdit
                        ?
                        <Button handleClick={handleSave} text='Save' />
                        :
                        <Button handleClick={handleAdd} text='Add' />
                }
            </form>

            <br />

            {/* Step 2:  for displaying contact details */}
            < ContactDetails
                contacts={phonebook.contacts}
                deleteClick={handleDelete}
                editClick={handleEdit}

            />


        </>
    )
}

