import React from "react"
import Person from "./Person"

const ContactList = ({ persons, setPersons, setAlert }) => {
    return persons.map(person =>
        <Person
            key={person.phone}
            person={person}
            setPersons={setPersons}
            persons={persons}
            setAlert={setAlert}
        />)
}

export default ContactList