import React from "react";

const CountryDetail = ({ country }) => {
    return (
        <div>
            <h1>{country.name.official}</h1>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <img src={country.flags.png} alt='Flag' />
        </div>
    )
}

export default CountryDetail

