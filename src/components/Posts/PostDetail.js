import React, { useContext, useEffect, useState } from "react"
import { PostContext } from "./PostProvider"
import { DateTime } from "luxon"


export const PostDetails = (props) => {
    const { getPosts, getPostById, post, setPost } = useContext(PostContext)


    // const dateTimeObj = DateTime.fromMillis(post.date) || {}
    // console.log(dateTimeObj)
    // console.log(typeof post.date)

    const dt = DateTime

    useEffect(() => {
        const postId = parseInt(props.match.params.postId)
        getPostById(postId)
            .then(setPost)


    }, [])

    return (
        <section className="post">
            <h3 className="post__title">{post.title}</h3>
            <div className="post__content">{post.content}</div>
            {post ? <div className="post_date">Published on: {dt.fromMillis(post.date).toLocaleString()}</div> : ""}


            {/* <div className="post_date">Published on: {dt.fromMillis(post.date).toLocaleString({DATETIME_FULL: Object}) || {}}</div> */}

            <div className="post_author">Author: {post.user.display_name}</div>

            {/* <button onClick={() => releaseAnimal(animal.id).then(() => props.history.push("/animals"))} >Release Animal</button>

            <button onClick={() => {
                props.history.push(`/animals/edit/${animal.id}`)
            }}>Edit</button> */}
        </section>
    )
}