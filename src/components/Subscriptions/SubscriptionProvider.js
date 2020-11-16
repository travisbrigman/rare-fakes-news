//module to handle all subscription data, getSubscriptions, createSubscriptions, unSubscribe, subscribeAgain
import React, { useState } from "react"

export const SubscriptionContext = React.createContext()

export const SubscriptionProvider = (props) => {
    const [subscriptions, setSubscriptions] = useState([])
    const [subscription, setSubscription] = useState({})

    const getSubscriptionsByAuthor = (id) => {
        return fetch(`http://localhost:8000/subscriptions?author_id=${id}`, {
            headers: {
                Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
                "Content-Type": "application/json",
              }
            })
            .then(res => res.json())
            .then(setSubscriptions)
    }

    const createSubscription = subscription => {
        return fetch("http://localhost:8000/subscriptions", {
            method: "POST",
            headers: {
                Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(subscription)
        })
            .then(res => res.json())
            .then(getSubscriptions)
    }

    const unsubscribe = (subscriptionId) => {
        return fetch(`http://localhost:8000/subscriptions/${subscriptionId}/unsubscribe`, {
            method: "PUT",
            headers: {
                Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(subscription)
        })
            .then(getSubscriptions)
    }



    return (
        <SubscriptionContext.Provider value={{
            subscription, setSubscription, subscriptions,
            getSubscriptions, setSubscriptions, createSubscription,
            unsubscribe
        }}>
            {props.children}
        </SubscriptionContext.Provider>
    )
}
