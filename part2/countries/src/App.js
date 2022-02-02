import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'

const App = () => {

  const [countries, setCountries] = useState([])
  const [queryText, setQueryText] = useState('')

  useEffect(() => {
    axios
      .get('http://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  const setQText = (event) => setQueryText(event.target.value)
  const filterData = {
    queryText,
    countries,
    setQueryText,
  }

  return (
    <div className="App">
      <p>Find countries</p>
      <input value={queryText} onChange={setQText} />
      <Filter data={filterData} />
    </div>
  );
}

export default App;
