import React, { useContext, useEffect, useRef, useState } from "react"
import { UserContext } from "./UserProvider"
import defaultImg from "./Images/default.png"


export const UserDetail = (props) => {
    const { user, getUserById } = useContext(UserContext)

    useEffect(() => {
        if (props.match.params.hasOwnProperty("userId")) {
            getUserById(parseInt(props.match.params.userId))
        } else {
            getUserById(parseInt(localStorage.getItem("rare_user_id")))
        }
    }, [])

    return (
        <>
            <div>
                {props.match.params.hasOwnProperty("userId") ?
                    <h1>{user.display_name}'s Profile</h1> :
                    <h1>My Profile</h1>}
                <div>Full Name: {user.first_name} {user.last_name}</div>
                {user.avatar === "" || user.avatar === undefined
                    ? <img src={defaultImg} style={{ width: `150px` }}></img>
                    : <img src={user.avatar} style={{ width: `150px` }}></img>
                }
                <div>{user.avatar}</div>
                <div>Display Name: {user.display_name}</div>
                <div>email: {user.email}</div>
                <div>Creation Date: {new Date(user.creation).toLocaleDateString('en-US')}</div>
            </div>
            <div>
                {props.match.params.hasOwnProperty("userId") ?
                    <button >subscribe!</button> :
                    ""}
            </div>
        </>
    )
}


//onClick={}
