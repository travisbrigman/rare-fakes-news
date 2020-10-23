import React, {useContext, useEffect, useRef, useState} from "react"
import { UserContext } from "./UserProvider" 
 


export const UserDetail = () => {
    const {users, getUsers} = useContext(UserContext)
    const activeUserId = parseInt(localStorage.getItem("rare_user_id"))
    const activeUserObj = users.find(u => u.id === activeUserId) || {}
    
    useEffect(() => {
        getUsers()
    }, [])
    

    return (
        <div>
            <h1>My Profile</h1>
            <div>User Full Name:</div>
            <img 
                src={
                    activeUserObj.avatar === undefined
                    ? "{/default.png}}"
                    : `${activeUserObj.avatar}`
                } 
                style={{width: `200px`}}
                alt="user avatar">                
            </img>
            <div>{activeUserObj.avatar}</div>
            <div>Display Name: {activeUserObj.display_name}</div>
            <div>email: {activeUserObj.email}</div>
            <div>Creation Date: {new Date(activeUserObj.creation).toLocaleDateString('en-US')}</div>
            <div>Profile Type: </div>
        </div>
    )

    


}
