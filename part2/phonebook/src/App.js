import React, { useEffect, useState } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import ContactList from './components/ContactList'
import Notification from './components/Notification'
import contactService from './services/contacts'
import './index.css'

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
  const [notification, setNotification] = useState({})

  const setAlert = (text, type) => {
    setNotification({ text, type })
    setTimeout(() => {
      setNotification({ message: '', type: '' })
    }, 3000);
  }
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
          setAlert('Contact successfuly updated.', 'success')
          setPersons(persons.map(p => p.id === response.id ? response : p))
          setNewName('')
          setNewPhone('')
        })
        .catch(error => {
          setAlert(`${updated.name} has already been removed.`, 'error')
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
          setAlert('New contact created.', 'success')
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
      <Notification message={notification} />
      <h2>Phonebook</h2>

      <span>Filter shown with </span>
      <input value={newSearch} onChange={searchChange} />
      <Filter newSearch={newSearch} persons={persons} />

      <h2>Add a new person</h2>
      <PersonForm data={formData} />

      <h2>Contacts</h2>
      <ContactList
        persons={persons}
        setPersons={setPersons}
        setAlert={setAlert} />
    </div>
  )
}

export default App