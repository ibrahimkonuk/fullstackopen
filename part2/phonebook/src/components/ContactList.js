import React from "react"
import Person from "./Person"

const ContactList = ({ persons, setPersons }) => {
    return persons.map(person =>
        <Person
            key={person.phone}
            person={person}
            setPersons={setPersons}
            persons={persons}
        />)
}

export default ContactList