'use client'
import { useState } from "react";


// component for button
const Button = (props) => {
    const { handleClick, text } = props;
    return (
        <button onClick={handleClick}>{text}</button>
    )
};

// component for input
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

// separate component for Retrieve and Update and Delete operations of the contacts details
const ContactDetails = (props) => {

    const { contacts, name, phoneNumber, search, deleteClick, editClick } = props;


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


export default function Phonebook(props) {
    // const [contacts, setContacts] = useState(props.contacts);

    const [phonebook, setPhonebook] = useState(
        {
            contacts: props.contacts,
            name: '',

            phoneNumber: 0,
            search: ''
        }
    );

    const handleSearchChange = (event) => {
        setPhonebook(
            {
                ...phonebook,
                // only updating serch
                search: event.target.value
            }
        );

        console.log(phonebook.search);
    };


    const handleNameChange = (event) => {
        setPhonebook({
            ...phonebook,
            name: event.target.value
        });
        console.log(phonebook.name);
    }

    const handlePhoneNumChange = (event) => {
        setPhonebook({
            ...phonebook,
            phoneNumber: event.target.value
        });
        console.log(phonebook.phoneNumber);
    }

    const handleEdit = (contactId) => {
        alert(contactId);
    };

    const handleDelete = (contactId) => {
        alert(contactId);

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


            {/*  for adding contact */}

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
            </form>

            <br />

            {/*  for displaying contact details */}
            < ContactDetails

                contacts={phonebook.contacts}
                name={phonebook.name}
                phoneNumber={phonebook.phoneNUmber}
                search={phonebook.search}
                deleteClick={handleDelete}
                editClick={handleEdit}

            />


        </>
    )
}

