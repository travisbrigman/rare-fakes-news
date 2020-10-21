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

    
    
    // const createReaction = reaction => {
        //     return fetch("http://localhost:8088/reactions", {
            //         method: "POST",
            //         headers: {
                //             "Content-Type": "application/json"
                //         },
                //         body: JSON.stringify(Reaction)
                //     })
                //        .then(res => res.json())
                //         .then(newReaction => {
                    //             getReactions()
                    //            return newReaction.id })      
                    // }
                    
                    
                    return (
                        <ReactionContext.Provider value={{
                            reaction, setReaction, reactions, getReactions, setReactions,
                            getReactionByPost
                             
                        }}>
            {props.children}
        </ReactionContext.Provider>
    )
}


//? I don't think we need this one
// const getReactionById = (id) => {
//     return fetch(`http://localhost:8088/Reactions/${id}`)
//         .then(res => res.json())
// }

//TODO FOR WHEN/IF WE HAVE ADMIN SHTUFF
// const updateReaction = Reaction => {
//     return fetch(`http://localhost:8088/Reactions/${Reaction.id}`, {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(Reaction)
//     })
//         .then(getReactions)
// }

// const deleteReaction = (ReactionId) => {
//     return fetch(`http://localhost:8088/Reactions/${ReactionId}`, {
//         method: "DELETE"
//     })
//         .then(getReactions)
// }