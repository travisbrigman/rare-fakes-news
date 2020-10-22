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
            <div>{activeUserObj.avatar}</div>
            <div>User ID: {activeUserObj.id}</div>
            <div>Display Name: {activeUserObj.display_name}</div>
            <div>email: {activeUserObj.email}</div>
        </>
    )
}