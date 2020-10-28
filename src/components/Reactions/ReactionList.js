//child component of PostDetails, renders list of reactions by mapping through all found in the DB
import React, { useContext, useEffect } from "react"
import { ReactionContext } from "./ReactionProvider"
import { Reaction } from "./Reaction"
import "./Reaction.css"


export const ReactionList = (props) => {
    const { getReactions, reactions } = useContext(ReactionContext)


    // Initialization effect hook -> Go get tag data
    useEffect(() => {
        getReactions()

    }, [])

    return (
        <div style={{ margin: "1rem" }} className="reactionContainer">
            <h3>Reactions:</h3>
            <div className="reactions">
                {
                    reactions.map(reaction => <Reaction key={reaction.id} {...props} reaction={reaction} />)
                }
            </div>

        </div>
    )
}