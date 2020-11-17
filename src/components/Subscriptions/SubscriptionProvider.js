//module to handle all subscription data, getSubscriptions, createSubscriptions, unSubscribe, subscribeAgain
import React, { useState } from "react"

export const SubscriptionContext = React.createContext()

export const SubscriptionProvider = (props) => {
    const [subscription, setSubscription] = useState({})

    const getMostRecentSubscriptionByAuthor = (id) => {
        return fetch(`http://localhost:8000/subscriptions?author_id=${id}`, {
            headers: {
                Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
                "Content-Type": "application/json",
              }
            })
            .then(res => res.json())
            .then(setSubscription)
    }

    const createSubscription = subscriptionObj => {
        return fetch("http://localhost:8000/subscriptions", {
            method: "POST",
            headers: {
                Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(subscriptionObj)
        })
            .then(res => res.json())
    }

    const unsubscribe = (authorId) => {
        return fetch(`http://localhost:8000/subscriptions/${authorId}/unsubscribe`, {
            method: "PUT",
            headers: {
                Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
                "Content-Type": "application/json"
        }})
    }



    return (
        <SubscriptionContext.Provider value={{
            subscription, getMostRecentSubscriptionByAuthor, setSubscription, createSubscription,
            unsubscribe
        }}>
            {props.children}
        </SubscriptionContext.Provider>
    )
}
