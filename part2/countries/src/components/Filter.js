import React from "react";
import Country from './Country'
import CountryDetail from "./CountryDetail";

const Filter = ({
    data: { queryText, countries, setQueryText }
}) => {
    if (queryText) {
        let allCountries = countries.filter(c => c.name.common.toLowerCase()
            .includes(queryText.trim().toLowerCase()))

        if (allCountries.length > 10) {
            return <p>Too many matches, specify another filter.</p>
        } else if (allCountries.length < 10 && allCountries.length > 1) {
            return allCountries.map(c =>
                <Country key={c.name.official} country={c} setQueryText={setQueryText} />
            )
        } else if (allCountries.length === 1) {
            return (
                allCountries.map(c =>
                    <CountryDetail key={c.name.official} country={c} />
                )
            )
        } else {
            return <p>No match!</p>
        }
    } else {
        return ''
    }
}

export default Filter