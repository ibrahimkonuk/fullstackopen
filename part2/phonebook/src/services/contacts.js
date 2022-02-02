import axios from "axios";
const baseUrl = 'http://localhost:3001/contacts'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createContact = async newPerson => {
    const response = await axios.post(baseUrl, newPerson)
    return response.data
}

const deleteContact = async id => {
    const response = await axios.delete(`${baseUrl}/${id}`)
    return response.data
}

const updateContact = async person => {
    const response = await axios.put(`${baseUrl}/${person.id}`, person)
    return response.data
}

export default {
    getAll,
    createContact,
    deleteContact,
    updateContact,
}