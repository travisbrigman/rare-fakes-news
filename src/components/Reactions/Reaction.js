import React, { useContext, useEffect, useState } from "react"
import { ReactionContext } from "../Reactions/ReactionProvider"
import { ReactionPostContext } from "../Reactions/ReactionPostProvider"
import { PostContext } from "../Posts/PostProvider"


export const Reaction = (props) => {
    const { posts, getPosts } = useContext(PostContext)
    const { reaction, getReactions } = useContext(ReactionContext)
    const { createReactionPost, getReactionPosts, ReactionPosts } = useContext(ReactionPostContext)

    const [reactionCount, setReactionCount] = useState()

    const postId = parseInt(props.match.params.postId)

    useEffect(() => {
        getReactions()
        getReactionPosts()
        getPosts()
    }, [])

    useEffect(() => {
        const matchingReactionCount = ReactionPosts.filter(rp => rp.reaction_id === reaction.id) || []
        setReactionCount(matchingReactionCount)

    }, [reactionCount])



    return (
        <section className="reaction">
            <button title={reaction.reaction_description} onClick={() => {
                createReactionPost({
                    reaction_id: reaction.reaction_id,
                    post_id: postId,
                    user_id: parseInt(localStorage.getItem("rare_user_id")),
                })
            }}>{reaction.reaction}</button>
            <div>{reactionCount.length}</div>

        </section>
    )

}


