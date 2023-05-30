'use client'

import { useState } from "react";

export default function PhoneBook(props) {

    const [phoneNumber, setPhoneNumber] = useState(0);
    const [name, setName] = useState('');
    const [search, setSearch] = useState('');

    let recentDeleteId;

    // for sending data from parent to child and vice-versa
    const [contacts, setContacts] = useState(props.contacts);

    const handleAdd = (event) => {
        event.preventDefault();

        const newContact = {
            id: contacts.length + 1,
            name: name,
            phone: phoneNumber
        };
        // console.log(newContact);

        setContacts(contacts.concat(newContact));

    };

    const handleDelete = (contactId) => {
        // alert(contactId);
        // event.preventDefault();
        if (window.confirm(`Are you sure want to delete name ${name}`)) {
            const newContacts = contacts.filter(contact => contact.id !== contactId);

            // update new contacts
            setContacts(newContacts);
        }
    }

    const handleUpdate = (event) => {

        event.preventDefault();

        const newContnacts = contacts.map(contact => {
            if (contact.id === recentDeleteId) {
                contact.name = name,
                    contact.phoneNumber = phoneNumber
                return contact;
            }
            // return contact;
        });

        setContacts(contacts.concat(newContnacts));


    }

    const handleEdit = (contactId) => {

        // alert(contactId)
        const targetContact = contacts.filter(contact => contact.id === contactId);
        // console.log(targetContact);

        setName(targetContact[0].name);
        setPhoneNumber(targetContact[0].phone);

        recentDeleteId = targetContact[0].id;

        // const newContact = {
        //     name: name,
        //     phoneNumber: phoneNumber
        // }
        // delete old data

        // const newContnacts = contacts.map(contact => {
        //     if (contact.id === contactId) {
        //         contact.name = name,
        //             contact.phoneNumber = phoneNumber
        //     }
        //     return contact;
        // });

        // setContacts(contacts.concat(newContnacts));


    }

    const handleSearchChange = (event) => {
        // console.log(setSearch(event.target.value));
        setSearch(event.target.value);
    }

    const handleNameChange = (event) => setName(event.target.value);
    const handlePhoneNumChange = (event) => setPhoneNumber(event.target.value);


    const handleSearch = (event) => {
        event.preventDefault();
        alert(search);
    }
    return (
        <>
            <h1>Phonebook App</h1>

            <form>

                <input type="text" value={search} onChange={handleSearchChange} placeholder="Search.." />
                <button onClick={handleSearch}>Search</button>

                <p>Name</p>

                <input
                    type="text"
                    onChange={handleNameChange}
                    value={name}

                />
                <p>Phone number</p>

                <input
                    type="number"
                    onChange={handlePhoneNumChange}

                    value={phoneNumber}
                />
                <br />
                <br />
                <button onClick={handleAdd}>Add</button>
            </form>
            <br />
            <br />

            <h3>List of Contacts</h3>
            <br />
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
                        contacts.map(singleContact =>
                            <tr key={singleContact.id}>
                                <td>{singleContact.name}</td>
                                <td>{singleContact.phone}</td>
                                <td><button onClick={(id) => handleEdit(singleContact.id)}>edit</button></td>
                                <td><button onClick={(id) => handleDelete(singleContact.id)}>delete</button></td>
                            </tr>)
                    }
                </tbody>
            </table>
        </>
    );
}