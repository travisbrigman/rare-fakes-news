//displays user information and allows user to subscribe and unsubscribe
import React, { useContext, useEffect, useState } from "react"
import { UserContext } from "./UserProvider"
import defaultImg from "./Images/default.png"
import { SubscriptionContext } from "../Subscriptions/SubscriptionProvider"



export const UserDetail = (props) => {
    const { user, getUserById, getUsers, getCurrentUser, setUser } = useContext(UserContext)
  
    const { subscription, setSubscription, 
            subscriptions, getSubscriptions, 
            unSubscribe, createSubscription, 
                    subscribeAgain } = useContext(SubscriptionContext)
    const [subStatus, setSubStatus] = useState(false) //subscription state set to false
  

    useEffect(() => {
      
        if (props.match.params.hasOwnProperty("userId")) {
            getUserById(parseInt(props.match.params.userId))
            // getSubscriptions()
            .then(setUser)
            
        } else {
           getCurrentUser()
           .then(setUser)
        }
       
    }, [])



    useEffect(() => {
        const myID = parseInt(user.id)
        const authorID = parseInt(props.match.params.userId)
        const found = subscriptions.find(s => {
            return s.user_id === myID && s.subscribe_id === authorID //check to see if subscription exists
        })
        if (found !== undefined && subscription.end === null) { 
            setSubStatus(true)
            setSubscription(found)
        } else if(found !== undefined && subscription.end !== null) { //subscription exists but has an end date
            setSubStatus(false)
            setSubscription(found)
        } else {
            setSubStatus(false)
            setSubscription({found: false})
        }
    }, [subscriptions])

    const changeSubStatus = (subscription) => {
        const myID = parseInt(user.id)
        const authorID = parseInt(props.match.params.userId)
        if(subscription.hasOwnProperty("id") && subscription.end === null) { //if end === null, user is still subscribed and can unsubscribe

            unSubscribe(subscription.id)
            .then(() => {
                props.history.push('/home')
                window.alert("You are now UNsubscribed!")
            })
        } else if (subscription.hasOwnProperty("id") && subscription.end !== null) { //if end !== null, user has unsubscribed (but subscription still techincally exists) and can subscribeAgain
            subscribeAgain(subscription.id)
            .then(() => {
                props.history.push('/home')
                window.alert("You are now subscribed!")
            })
        } else {
            createSubscription({ //user can create a subscription
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
            <section>
                {props.match.params.hasOwnProperty("userId") ?
                    <h1>{user.user.username}'s Profile</h1> :
                    <h1 style={{margin: "2rem 0rem 2rem 0rem"}}>My Profile</h1>}
                <div>{user.user.first_name} {user.user.last_name}</div>
                
                {user.user.profile_image_url === "" || user.user.profile_image_url === undefined
                    ? <img src={defaultImg} style={{ width: `115px` }}></img>
                    : <img src={user.user.profile_image_url} style={{ width: `115px` }}></img>
                }
                <div>{user.user.profile_image_url}</div>
                <div>Display Name: {user.user.username}</div>
                <div>email: {user.user.email}</div>
                <div>Creation Date: {new Date(user.user.date_joined).toLocaleDateString('en-US')}</div>
            </section>
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



