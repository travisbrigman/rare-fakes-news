//child component of PostDetails, renders list of reactions by mapping through all found in the DB
import React, { useContext, useEffect } from "react"
import { ReactionContext } from "./ReactionProvider"
import { Reaction } from "./Reaction"
import { reactionIcons } from "./ReactionIcons"
import "./Reaction.css"
import { Box } from "grommet"


export const ReactionList = (props) => {
    const { getReactions, reactions } = useContext(ReactionContext)

    // Initialization effect hook -> Go get tag data
    useEffect(() => {
        getReactions()
    }, [])

    return (
        <Box margin="small"  className="reactionContainer">
            <Box gap="small" direction="row-responsive" className="reactions">
                { //map through the reactions and pass the reaction obj and props down to the child component
                    reactionIcons.map(reaction => <Reaction key={reaction.id} {...props} reaction={reaction} />)
                }
            </Box>
        </Box>
    )
}