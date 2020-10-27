import React, { useContext, useEffect, useRef, useState } from "react"
import { UserContext } from "./UserProvider"
import defaultImg from "./Images/default.png"
import { SubscriptionContext } from "../Subscriptions/SubscriptionProvider"


export const UserDetail = (props) => {
    const { user, getUserById } = useContext(UserContext)
    const { subscription, setSubscription, 
            subscriptions, getSubscriptions, 
            unSubscribe, createSubscription, 
                    subscribeAgain } = useContext(SubscriptionContext)
    const [subStatus, setSubStatus] = useState(false)

    useEffect(() => {
        if (props.match.params.hasOwnProperty("userId")) {
            getUserById(parseInt(props.match.params.userId))
            getSubscriptions()
        } else {
            getUserById(parseInt(localStorage.getItem("rare_user_id")))
        }
    }, [])

    useEffect(() => {
        const myID = parseInt(localStorage.getItem("rare_user_id"))
        const authorID = parseInt(props.match.params.userId)
        const found = subscriptions.find(s => {
            return s.user_id === myID && s.subscribe_id === authorID
        })
        console.log(found, "found or nah")
        if (found !== undefined && subscription.end === null) {
            setSubStatus(true)
            setSubscription(found)
        } else if(found !== undefined && subscription.end !== null) {
            setSubStatus(false)
            setSubscription(found)
        } else {
            setSubStatus(false)
            setSubscription({found: false})
        }
    }, [subscriptions])

    const changeSubStatus = (subscription) => {
        const myID = parseInt(localStorage.getItem("rare_user_id"))
        const authorID = parseInt(props.match.params.userId)
        if(subscription.hasOwnProperty("id") && subscription.end === null) {

            unSubscribe(subscription.id)
            .then(() => {
                props.history.push('/home')
                window.alert("You are now UNsubscribed!")
            })
        } else if (subscription.hasOwnProperty("id") && subscription.end !== null) {
            subscribeAgain(subscription.id)
            .then(() => {
                props.history.push('/home')
                window.alert("You are now subscribed!")
            })
        } else {
            createSubscription({
                user_id: myID,
                subscribe_id: authorID,
                begin: Date.now(),
                end: null
            })
            .then(() => {
                props.history.push('/home')
                window.alert("You are now subscribed!")
            })
        }
    }

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
                    subStatus ?
                        <button onClick={() => {
                            changeSubStatus(subscription)
                        }} >unsubscribe!</button> :
                        <button onClick={() => {
                            changeSubStatus(subscription)
                        }}>subscribe</button>
                    : ""
                }
            </div>
        </>
    )
}



