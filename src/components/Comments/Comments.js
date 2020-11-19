//child of HomeList, list of all posts, user can delete only their own post
import React, { useContext, useEffect } from "react"
import {Link} from "react-router-dom"
import { PostContext } from "../Posts/PostProvider"
import { CommentContext } from "./CommentProvider"



export const CommentList = (props) => {
    
    const {comments, getComments} = useContext(CommentContext)
    const {post} = useContext(PostContext)

    const postId = parseInt(props.match.params.postId)
    
    console.log(comments)
    useEffect(() => {
       getComments(postId)

    },[])

    return (
        <>
        <h2>Comments</h2>
        <Link to={{pathname:`posts/comments/${post.id}/create`}}>
        create comment
        </Link>
        {
            comments !== [] ? comments.map(c => {
                return <div key={c.id} className="container__card">
                    <p>{c.subject}</p>
                    <p>{c.content}</p>
                    <p>{c.created_on}</p>
                </div>
            }).reverse() : null
        }
        </>
    )
}
