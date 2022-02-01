import React, { useState } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Pepe Sylvia', phone: '33-27-5323523', id: 1 },
    { name: 'Ada Lovelace', phone: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phone: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newSearch, setNewSearch] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    let duplicate = persons.some(p => p.name.toLowerCase() === newName.trim().toLowerCase())
    if (duplicate) {
      alert(`${newName} is already added to phonebook.`)
      setNewName('')
      setNewPhone('')
    } else {
      const newPerson = {
        id: persons.length + 1,
        name: newName.trim(),
        phone: newPhone.trim()
      }
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewPhone('')
    }

  }
  const nameChange = (event) => {
    setNewName(event.target.value)
  }
  const phoneChange = (event) => {
    setNewPhone(event.target.value)
  }
  const searchChange = (event) => {
    setNewSearch(event.target.value)
  }

  const formData = {
    addPerson,
    newName,
    newPhone,
    newSearch,
    nameChange,
    phoneChange,
    searchChange,
  }
  const filterData = {
    newSearch,
    persons
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <span>Filter shown with </span>
      <input value={newSearch} onChange={searchChange} />
      <Filter data={filterData} />

      <h2>Add a new person</h2>
      <PersonForm data={formData} />

      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  )
}

export default App