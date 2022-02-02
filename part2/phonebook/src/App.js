import React, { useEffect, useState } from 'react'
import axios from 'axios'

import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'


const App = () => {

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const [persons, setPersons] = useState([])
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