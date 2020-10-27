import React, { useContext, useEffect, useState } from "react"
import { ReactionPostContext } from "../Reactions/ReactionPostProvider"
import { PostContext } from "../Posts/PostProvider"


export const Reaction = (props) => {
    const { posts, getPosts } = useContext(PostContext)
    const { createReactionPost, getReactionPosts, ReactionPosts } = useContext(ReactionPostContext)

    const [reactionCount, setReactionCount] = useState([])
    const [filteredRP, setFilteredRP] = useState([])
    const postId = parseInt(props.match.params.postId)



    useEffect(() => {
        getReactionPosts()
        getPosts()

    }, [])

    useEffect(() => {
        const reactionsForThisPost = ReactionPosts.filter(rp => {
            return rp.post_id === postId

        })
        setFilteredRP(reactionsForThisPost)
    }, [ReactionPosts])

    useEffect(() => {
        const matchingReactionCount = filteredRP.filter(rp => {

            return rp.reaction_id === props.reaction.id

        }) || []
        setReactionCount(matchingReactionCount)
    }, [filteredRP])


    const constructOneTimeReactionPostObj = () => {
        const checkForExistingReaction = filteredRP.find(rp => {
            if (rp.user_id === parseInt(localStorage.getItem("rare_user_id"))) {
                return rp.reaction_id === props.reaction.id
            }

        })

        if (checkForExistingReaction === undefined) {
            createReactionPost({
                reaction_id: props.reaction.id,
                post_id: postId,
                user_id: parseInt(localStorage.getItem("rare_user_id")),
            })
        }
        else {
            window.alert("You've already selected this reaction!")
            //patch goes here
        }
    }

    return (
        <section className="reaction">
            <button title={props.reaction.reaction_description} onClick={() => {
                constructOneTimeReactionPostObj()


            }}>{props.reaction.reaction}</button>
            <div>{reactionCount.length}</div>

        </section>
    )

}


