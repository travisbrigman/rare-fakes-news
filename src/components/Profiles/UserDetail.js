import React, {useContext, useEffect, useState} from "react"
import { UserContext } from "./UserProvider"


export const UserDetail = () => {
    const {users, getUsers} = useContext(UserContext)

    const activeUserId = parseInt(localStorage.getItem("rare_user_id"))
    const activeUserObj = users.find(u => u.id === activeUserId) || {}
    console.log(activeUserId)
    console.log(activeUserObj)

    // const [activeUser, setActiveUser] = useState([])
    
    useEffect(() => {
        getUsers()
    })
    
    // useEffect(() => {
    //     const activeUserObj = users.find (u => u.id === activeUserId) || {}
    //     console.log(activeUserObj)
    //     setActiveUser(activeUserObj)
    // }, [users])


    return (
        <>
            <h1>My Profile</h1>
            <div>User Full Name:</div>
            <div>{activeUserObj.avatar}</div>
            <div>Display Name: {activeUserObj.display_name}</div>
            <div>email: {activeUserObj.email}</div>
            <div>Creation Date: {new Date(activeUserObj.creation).toLocaleDateString('en-US')}</div>
            <div>Profile Type: </div>

        </>
    )
}