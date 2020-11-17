import React, { useContext } from "react"
import { UserContext } from "./UserProvider"


export const UsersList = () => {
    const {users, getUsers} = useContext(UserContext)


    return (
        <>
        <h1>All Users</h1>
        {
            users.
        }
        </>
    )
}