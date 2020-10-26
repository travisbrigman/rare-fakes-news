import React, { useState } from "react"

export const ReactionContext = React.createContext()

export const ReactionProvider = (props) => {
    const [reactions, setReactions] = useState([])
    const [reaction, setReaction] = useState({})

    const getReactions = () => {
        return fetch("http://localhost:8088/reactions")
            .then(res => res.json())
            .then(setReactions)
    }

    const getReactionByPost = (post) => {
    return fetch(`http://localhost:8088/reactions?post_id=${post.id}`)
        .then(res => res.json())
}
        
    const createReaction = reaction => {
            return fetch("http://localhost:8088/reactions", {
                    method: "POST",
                    headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(reaction)
                    })
                       .then(res => res.json())
                        .then(newReaction => {
                                getReactions()
                               return newReaction.id })      
                    }
                          
                    return (
                        <ReactionContext.Provider value={{
                            reaction, setReaction, reactions, 
                            getReactions, setReactions, 
                            getReactionByPost    
                        }}>
            {props.children}
        </ReactionContext.Provider>
    )
}
