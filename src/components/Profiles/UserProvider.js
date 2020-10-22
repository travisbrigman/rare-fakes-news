import React, { useState } from "react"

export const UserContext = React.createContext()

export const UserProvider = (props) => {
    const [users, setUsers] = useState([])
    const [activeUser, setActiveUser] = useState([])

    const getUsers = () => {
        return fetch("http://localhost:8000/users")
            .then(response => response.json())
            .then(setUsers)
    }

    const getUserByEmail = (email) => {
        return fetch(`http://localhost:8088/users?email=${email}`)
            .then(response => response.json())
            .then(setUsers)
    }

    const getUserById = (userId) => {
        return fetch(`http://localhost:8088/users?id=${userId}`)
            .then(response => response.json())
            .then(setActiveUser)
    }

    return (
        <UserContext.Provider value={{
            users, getUsers, setUsers, getUserByEmail, activeUser, setActiveUser
        }}>
            {props.children}
        </UserContext.Provider>
    )
}