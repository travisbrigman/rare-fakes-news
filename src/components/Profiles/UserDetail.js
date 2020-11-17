//displays user information and allows user to subscribe and unsubscribe
import React, { useContext, useEffect, useState } from "react"
import { UserContext } from "./UserProvider"
import defaultImg from "./Images/default.png"
import { SubscriptionContext } from "../Subscriptions/SubscriptionProvider"



export const UserDetail = (props) => {
    const { user, getUserById, getUsers, getCurrentUser, setUser } = useContext(UserContext)
  
    const { subscription, getMostRecentSubscriptionByAuthor, 
            unsubscribe, createSubscription } = useContext(SubscriptionContext)


    const [subStatus, setSubStatus] = useState(false) //subscription state set to false
  

    useEffect(() => {
      
        if (props.match.params.hasOwnProperty("userId")) {
            getMostRecentSubscriptionByAuthor(parseInt(props.match.params.userId))
            getUserById(parseInt(props.match.params.userId))
            .then(setUser)
            } else {
                getCurrentUser()
                .then(setUser)
            }
        }, [])
        
        useEffect(() => {
            if (subscription.ended_on !== null) { 
                setSubStatus(false)
            } else {
                setSubStatus(true)
            }
    },[subscription])

    const changeSubStatus = (subscription) => {
        const authorID = parseInt(props.match.params.userId)
        if(subscription.ended_on === null) { //if end === null, user is still subscribed and can unsubscribe
            console.log("I am going to UNSUBSCRIBE")
            unsubscribe(authorID)
            .then(() => {
                window.alert("You are now UNsubscribed!")
                props.history.push('/home')
            })
        } else {
            console.log("I am going to SUBSCRIBE")
            createSubscription({ //user can create a subscription
                author_id: authorID
            })
            .then(() => {
                window.alert("You are now subscribed!")
                props.history.push('/home')
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



