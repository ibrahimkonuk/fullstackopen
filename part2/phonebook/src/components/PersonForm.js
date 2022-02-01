import React from "react";

const PersonForm = ({
    data: { addPerson, newName, newPhone, nameChange, phoneChange },
}) => {
    return (
        <form onSubmit={addPerson}>
            <div>
                Name: <input type="text" value={newName} onChange={nameChange} required />
            </div>
            <div>
                Number: <input type="tel" value={newPhone} onChange={phoneChange} required />
            </div>
            <div>
                <button type="submit">Add</button>
            </div>
        </form>
    )
}

export default PersonForm