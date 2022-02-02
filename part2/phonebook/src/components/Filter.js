import React from 'react'

const Filter = ({ newSearch, persons }) => {
    if (newSearch) {
        return (
            <div>
                {persons.filter(p => p.name.toLowerCase()
                    .includes(newSearch.trim().toLowerCase()))
                    .map(p => <p key={p.id}>{p.name} {p.phone}</p>)}
            </div>
        )
    }
    return ''
}

export default Filter