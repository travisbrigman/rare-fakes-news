import React, {useContext, useEffect, useRef, useState} from "react"
import { UserContext } from "./UserProvider" 
import defaultImg from "./Images/default.png"


export const UserDetail = (props) => {
    const { users, getUsers } = useContext(UserContext)
    const activeUserId = parseInt(localStorage.getItem("rare_user_id"))
    const activeUserObj = users.find(u => u.id === activeUserId) || {}

    console.log(props)
    useEffect(() => {
        getUsers()
    }, [])
    
    return (
        <>
        {props.match.params.hasOwnProperty("userId") ? <h1>USER ID</h1> : <h2>NOPE</h2>}
        
        <div>
            <h1>My Profile</h1>
            <div>Full Name: {activeUserObj.first_name} {activeUserObj.last_name}</div>

            {activeUserObj.avatar === "" || activeUserObj.avatar === undefined
            ? <img src={defaultImg} style={{width: `150px`}}></img>
            : <img src={activeUserObj.avatar} style={{width: `150px`}}></img>
            }

            <div>{activeUserObj.avatar}</div>
            <div>Display Name: {activeUserObj.display_name}</div>
            <div>email: {activeUserObj.email}</div>
            <div>Creation Date: {new Date(activeUserObj.creation).toLocaleDateString('en-US')}</div>
        </div>
        </>
    )
}
