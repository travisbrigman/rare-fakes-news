import React, { useContext, useEffect, useState } from "react"
import { PostContext } from "./PostProvider"
import { DateTime } from "luxon"


export const PostDetails = (props) => {
    const { getPosts, getPostById, post, setPost } = useContext(PostContext)

    
    

    useEffect(() => {
        const postId = parseInt(props.match.params.postId)
        getPostById(postId)
            .then(setPost)
        
        
    }, [])

    return (
        <section className="post">
            <h3 className="post__title">{post.title}</h3>
            <div className="post__content">{post.content}</div>
            <div className="post_date">Published on: {post.date}</div>
            <div className="post_date">Published on:{DateTime.local(post.date).toLocaleString(DateTime.DATE_FULL)} </div>
            <div className="post_date">Published on:{DateTime.fromSeconds(post.date).toLocaleString(DateTime.DATE_FULL)} </div>
            {/* <div className="post_date">Published on: {DateTime.fromMillis(post.date).toLocaleString({DATETIME_FULL: Object})}</div> */}
            {/* <div className="post_date">Published on: {DateTime.fromSQL(post.date)}</div> */}
            <div className="post_author">Author: {post.user.display_name}</div>

            {/* <button onClick={() => releaseAnimal(animal.id).then(() => props.history.push("/animals"))} >Release Animal</button>

            <button onClick={() => {
                props.history.push(`/animals/edit/${animal.id}`)
            }}>Edit</button> */}
        </section>
    )
}