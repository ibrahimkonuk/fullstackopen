import React from "react";

const Country = ({ country, setQueryText }) => {
    return (
        <div key={country.capital}>
            <p style={{ 'display': 'inline' }}>{country.name.common} </p>
            <button onClick={() => setQueryText(country.name.common)}>show</button>
        </div>
    )
}

export default Country

