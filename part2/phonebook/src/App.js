import React, { useEffect, useState } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import ContactList from './components/ContactList'
import contactService from './services/contacts'

const App = () => {

  useEffect(() => {
    contactService
      .getAll()
      .then(response => {
        setPersons(response)
        setNewName('')
        setNewPhone('')
      })
  }, [])

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newSearch, setNewSearch] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const duplicate = persons
      .find(p => p.name.toLowerCase() === newName.toLowerCase().trim())

    if (duplicate) {

      alert(`${duplicate.name} is already added to phonebook. Do you want to update the phone number?`)

      const updated = { ...duplicate, phone: newPhone }

      contactService
        .updateContact(updated)
        .then(response => {
          setPersons(persons.map(p => p.id === response.id ? response : p))
          setNewName('')
          setNewPhone('')
        })
    } else {

      const newPerson = {
        id: persons.length + 1,
        name: newName.trim(),
        phone: newPhone.trim()
      }
      contactService
        .createContact(newPerson)
        .then(response => {
          setPersons(persons.concat(response))
          setNewName('')
          setNewPhone('')
        })
    }
  }

  const nameChange = (event) => setNewName(event.target.value)
  const phoneChange = (event) => setNewPhone(event.target.value)
  const searchChange = (event) => setNewSearch(event.target.value)

  const formData = {
    addPerson,
    newName,
    newPhone,
    newSearch,
    nameChange,
    phoneChange,
    searchChange,
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <span>Filter shown with </span>
      <input value={newSearch} onChange={searchChange} />
      <Filter newSearch={newSearch} persons={persons} />

      <h2>Add a new person</h2>
      <PersonForm data={formData} />

      <h2>Contacts</h2>
      <ContactList persons={persons} setPersons={setPersons} />
    </div>
  )
}

export default App