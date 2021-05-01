//module to handle all user data- getUsers, getUserById, getUserByEmail
import React, { useState } from "react"
export const UserContext = React.createContext();

export const UserProvider = (props) => {
    const [users, setUsers] = useState([{user:{}}])
    const [user, setUser] = useState({user:{}})
    const [currentUser, setCurrentUser] = useState({user:{}})

    const getUsers = () => {
        return fetch("http://127.0.0.1:8080/users" , {
            headers: {
            Authorization: `Bearer ${localStorage.getItem("rare_user_id")}`,
            "Content-Type": "application/json",
            }
        })
        .then((response) => response.json())
        .then(setUsers);
    };

    const getUserById = (id) => {
        return fetch(`http://127.0.0.1:8080/users/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("rare_user_id")}`,
                "Content-Type": "application/json",
            }
        })
            .then(response => response.json()) 
    }

    const getCurrentUser = () => {
        return fetch(`http://127.0.0.1:8080/currentuser`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("rare_user_id")}`,
                "Content-Type": "application/json",
            }
        })
            .then(response => response.json())
            // .then(setCurrentUser)     
    }

    
    return (
        <UserContext.Provider value={{
            users, getUsers, setUsers, user, setUser, 
            getUserById, getCurrentUser, setCurrentUser, currentUser
        }}>
            {props.children}
        </UserContext.Provider>
    )
}
