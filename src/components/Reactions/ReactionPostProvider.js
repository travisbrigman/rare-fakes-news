import React, { useState } from "react"

export const ReactionPostContext = React.createContext()

export const ReactionPostProvider = (props) => {
    const [ReactionPosts, setReactionPosts] = useState([])
    const [ReactionPost, setReactionPost] = useState({})

    const getReactionPosts = () => {
        return fetch("http://localhost:8088/reactionPosts")
            .then(res => res.json())
            .then(setReactionPosts)
    }

    const createReactionPost = ReactionPost => {
        return fetch("http://localhost:8088/reactionPosts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ReactionPost)
        })
            .then(res => res.json())
            .then(getReactionPosts)
           
    }


    return (
        <ReactionPostContext.Provider value={{
            ReactionPost, setReactionPost, ReactionPosts, getReactionPosts,
            setReactionPosts, createReactionPost
        }}>
            {props.children}
        </ReactionPostContext.Provider>
    )
}