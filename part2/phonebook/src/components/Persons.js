import React from "react"

const Persons = ({ persons }) => {
    return persons.map(p => <p key={p.id}>{p.name} {p.phone}</p>)
}

export default Persons