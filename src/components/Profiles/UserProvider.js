//module to handle all user data- getUsers, getUserById, getUserByEmail
import React, { useState } from "react"
export const UserContext = React.createContext();

export const UserProvider = (props) => {
    const [users, setUsers] = useState([])
    const [user, setUser] = useState({})

    const loggedInUser = localStorage.getItem("ru_user_id");
    
  const getUsers = () => {
    return fetch("http://localhost:8000/users" , {
        headers: {
          Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
          "Content-Type": "application/json",
        }
      })
      .then((response) => response.json())
      .then(setUsers);
  };

    const getUserById = (id) => {
        return fetch(`http://localhost:8000/users/${id}`)
            .then(response => response.json())
            .then(setUser)
    }

    const getUserByEmail = (email) => {
        return fetch(`http://localhost:8000/users?email=${email}`)
            .then(response => response.json())
            .then(setUsers)
    }
    
    return (
        <UserContext.Provider value={{
            users, getUsers, setUsers, getUserByEmail,
            user, setUser, getUserById, loggedInUser
        }}>
            {props.children}
        </UserContext.Provider>
    )
}
