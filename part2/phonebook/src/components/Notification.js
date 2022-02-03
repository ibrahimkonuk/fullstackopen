import React from "react"

const Notification = ({ message: { text, type } }) => {
    if (text === null) {
        return null
    }

    if (type === 'success') {
        return (
            <div className='text-success' >
                {text}
            </div >
        )
    } else if (type === 'error') {
        return (
            <div className='text-error' >
                {text}
            </div >
        )
    } else if (type === 'warning') {
        return (
            <div className='text-warning' >
                {text}
            </div >
        )
    } else {
        return null
    }

}

export default Notification