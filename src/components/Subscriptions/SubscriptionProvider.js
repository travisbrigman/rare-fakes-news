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
                        body: JSON.stringify(subscription)
                    })
                       .then(res => res.json())
                       .then(getSubscriptions)
                    }

    const unSubscribe = (subscriptionId) => {
            const subscription = {
                end: Date.now()
            }
            return fetch(`http://localhost:8088/subscriptions/${subscriptionId}`, {
                method: "PATCH",
                headers: {
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
                            unSubscribe
                        }}>
            {props.children}
        </SubscriptionContext.Provider>
    )
}
