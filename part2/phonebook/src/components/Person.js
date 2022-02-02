import React from "react";
import contacts from "../services/contacts";

const Person = ({ person, persons, setPersons }) => {

    const deleteContact = () => {
        if (window.confirm(`Delete ${person.name}?`)) {
            contacts
                .deleteContact(person.id)
                .then(response => {
                    let updatedList = persons.filter(p => p.id !== person.id)
                    setPersons(updatedList)
                })
        }
    }

    return (
        <div>
            <p key={person.id} style={{ 'display': 'inline' }}>{person.name} {person.phone} </p>
            <button onClick={deleteContact}> Delete</button>
        </div>
    )
}

export default Person