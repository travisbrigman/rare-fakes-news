//module to handle all subscription data, getSubscriptions, createSubscriptions, unSubscribe, subscribeAgain
import React from "react"

export const SubscriptionContext = React.createContext()

export const SubscriptionProvider = (props) => {

    //function used in UserDetail.js
    //If author_id = current user, will return an ARRAY of objects of people that follow you
    //if author_id !== current user, will return an OBJECT that will tell the app whether or not you follow the author
    const getSubscriptionByAuthor = (id) => {
        return fetch(`http://127.0.0.1:8080/subscriptions?author_id=${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("rare_user_id")}`,
                "Content-Type": "application/json",
            }
            })
            .then(res => res.json())
    }

    const createSubscription = subscriptionObj => {
        return fetch("http://127.0.0.1:8080/subscriptions", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("rare_user_id")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(subscriptionObj)
        })
            .then(res => res.json())
    }

    const unsubscribe = (authorId) => {
        return fetch(`http://127.0.0.1:8080/subscriptions/${authorId}/unsubscribe`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("rare_user_id")}`,
                "Content-Type": "application/json"
        }})
    }

    return (
        <SubscriptionContext.Provider value={{
            getSubscriptionByAuthor, createSubscription,
            unsubscribe
        }}>
            {props.children}
        </SubscriptionContext.Provider>
    )
}
