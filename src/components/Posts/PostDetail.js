import React, { useContext, useEffect, useState } from "react"
import { PostContext } from "./PostProvider"




export const PostDetails = (props) => {
    const { getPosts, getPostById, post, setPost, getTagsByPost, postTags, setPostTags } = useContext(PostContext)

   

    useEffect(() => {
        const postId = parseInt(props.match.params.postId)
        getPostById(postId)
        .then(setPost)
        getTagsByPost(postId)
        .then(setPostTags)
    }, [])

    console.log(post)

    return (
        <section className="post">
            <h3 className="post__title">{post.title}</h3>
            <div className="post__content">{post.content}</div>
            <div className="post_date">Published on: {new Date(post.date).toLocaleDateString('en-US')}</div>

            <div className="post_author">Author: {post.user.display_name}</div>
            {postTags.map(postTag => {
              return  <div>{postTag.tag}</div>
            })
            }

        
        </section>
    )
}