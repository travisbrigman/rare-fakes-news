//module to handle all manipulation of Reaction data- getReactions
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


    return (
        <ReactionContext.Provider value={{
            reaction, setReaction, reactions,
            getReactions, setReactions

        }}>
            {props.children}
        </ReactionContext.Provider>
    )
}
