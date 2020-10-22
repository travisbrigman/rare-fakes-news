import React, { useState } from "react"

export const UserContext = React.createContext()

export const UserProvider = (props) => {
    const [users, setUsers] = useState([])

    const getUsers = () => {
        return fetch("http://localhost:8000/users")
            .then(response => response.json())
            .then(setUsers)
    }

    return (
        <UserContext.Provider value={{
            users, getUsers, setUsers
        }}>
            {props.children}
        </UserContext.Provider>
    )
}