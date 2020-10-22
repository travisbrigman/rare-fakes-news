import React, { useState } from "react"

export const SubscriptionContext = React.createContext()

export const SubscriptionProvider = (props) => {
    const [subscriptions, setSubscriptions] = useState([])
    const [subscription, setSubscription] = useState({})

    const getSubscriptions = () => {
        return fetch("http://localhost:8088/subscriptions")
            .then(res => res.json())
            .then(setSubscriptions)
    }
 
    const createSubscription = subscription => {
            return fetch("http://localhost:8088/subscriptions", {
                    method: "POST",
                    headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(Subscription)
                    })
                       .then(res => res.json())
                        .then(newSubscription => {
                                getsubscriptions()
                               return newSubscription.id })      
                    }

    const deleteSubscription = (subscriptionId) => {
        return fetch(`http://localhost:8088/subscriptions/${subscriptionId}`, {
            method: "DELETE"
        })
            .then(getsubscriptions)
    }
                    
                    return (
                        <SubscriptionContext.Provider value={{
                            subscription, setSubscription, subscriptions, 
                            getSubscriptions, setSubscriptions, 
                        }}>
            {props.children}
        </SubscriptionContext.Provider>
    )
}
