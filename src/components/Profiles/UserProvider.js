import React, { useState } from "react"
 

export const UserContext = React.createContext()

export const UserProvider = (props) => {
    const [users, setUsers] = useState([])
    const [user, setUser] = useState({})

    const getUsers = () => {
        return fetch("http://localhost:8088/users")
            .then(response => response.json())
            .then(setUsers)
    }

    const getUserById = (id) => {
        return fetch(`http://localhost:8088/users/${id}`)
            .then(response => response.json())
            .then(setUser)
    }

    const getUserByEmail = (email) => {
        return fetch(`http://localhost:8088/users?email=${email}`)
            .then(response => response.json())
            .then(setUsers)
    }
    
    return (
        <UserContext.Provider value={{
            users, getUsers, setUsers, getUserByEmail,
            user, setUser, getUserById
        }}>
            {props.children}
        </UserContext.Provider>
    )
}