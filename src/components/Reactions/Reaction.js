import React, { useContext, useEffect, useState } from "react"
import { ReactionContext } from "../Reactions/ReactionProvider"
import { ReactionPostContext } from "../Reactions/ReactionPostProvider"
import { PostContext } from "../Posts/PostProvider"


export const Reaction = (props) => {
    const { posts, getPosts } = useContext(PostContext)
    const { reaction, getReactions } = useContext(ReactionContext)
    const { createReactionPost, getReactionPosts, ReactionPosts } = useContext(ReactionPostContext)

    const [reactionCount, setReactionCount] = useState([])
 
    const postId = parseInt(props.match.params.postId)

    useEffect(() => {
      
        getReactionPosts()
        getPosts()
      
    }, [])

    useEffect(() => {
        const matchingReactionCount = ReactionPosts.filter(rp => {
           
            return rp.reaction_id === props.reaction.id
        }) || []
        setReactionCount(matchingReactionCount)

    }, [ReactionPosts])



    return (
        <section className="reaction">
            <button title={props.reaction.reaction_description} onClick={() => {
               
                createReactionPost({
                    reaction_id: props.reaction.id,
                    post_id: postId,
                    user_id: parseInt(localStorage.getItem("rare_user_id")),
                })

            }}>{props.reaction.reaction}</button>
            <div>{reactionCount.length}</div>

        </section>
    )

}


