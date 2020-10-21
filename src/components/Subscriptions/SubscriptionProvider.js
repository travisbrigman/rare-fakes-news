import React, { useState } from "react"

export const SubscriptionContext = React.createContext()

export const SubscriptionProvider = (props) => {
    const [subscriptions, setSubscriptions] = useState([])
    const [subscription, setSubscription] = useState({})

    //not sure we need the get because of JOINing the tables on the backend
    const getSubscriptions = () => {
        return fetch("http://localhost:8088/subscriptions")
            .then(res => res.json())
            .then(setSubscriptions)
    }

    
    // const createSubscription = subscription => {
    //         return fetch("http://localhost:8088/subscriptions", {
    //                 method: "POST",
    //                 headers: {
    //                         "Content-Type": "application/json"
    //                     },
    //                     body: JSON.stringify(Subscription)
    //                 })
    //                    .then(res => res.json())
    //                     .then(newSubscription => {
    //                             getsubscriptions()
    //                            return newSubscription.id })      
    //                 }
    
    //UNSUBSCRIBE is a stretch goal
    // const deleteSubscription = (SubscriptionId) => {
    //     return fetch(`http://localhost:8088/subscriptions/${SubscriptionId}`, {
    //         method: "DELETE"
    //     })
    //         .then(getsubscriptions)
    // }
                    
                    return (
                        <SubscriptionContext.Provider value={{
                            subscription, setSubscription, subscriptions, getSubscriptions, setSubscriptions,
                             
                        }}>
            {props.children}
        </SubscriptionContext.Provider>
    )
}


//? I don't think we need this one
// const getSubscriptionById = (id) => {
//     return fetch(`http://localhost:8088/subscriptions/${id}`)
//         .then(res => res.json())
// }

