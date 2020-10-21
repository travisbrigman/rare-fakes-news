import React, { useState } from "react"

export const PostContext = React.createContext()

export const PostProvider = (props) => {
    const [posts, setPosts] = useState([])
    const [post, setPost] = useState({})

    const getPosts = () => {
        return fetch("http://localhost:8088/posts")
            .then(res => res.json())
            .then(setPosts)
    }

    const getPostById = (id) => {
        return fetch(`http://localhost:8088/posts/${id}`)
            .then(res => res.json())
    }

    // ? CHECK FETCH CALL FOR THESE SPECIAL ONES
    const getPostByUser = () => {
        return fetch("http://localhost:8088/posts")
            .then(res => res.json())
            .then(setPosts)
    }

    const getPostByTag = () => {
        return fetch("http://localhost:8088/posts")
            .then(res => res.json())
            .then(setPosts)
    }

    const getPostByCat = () => {
        return fetch("http://localhost:8088/posts")
            .then(res => res.json())
            .then(setPosts)
    }

    const getPostBySub = () => {
        return fetch("http://localhost:8088/posts")
            .then(res => res.json())
            .then(setPosts)
    }
    //? ^^^^^^^^^ THESE SPECIAL ONES

    // const addPost = post => {
    //     return fetch("http://localhost:8088/posts", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(Post)
    //     })
    //        .then(res => res.json())
    //         .then(newPost => {
    //             getPosts()
    //            return newPost.id })      
    // }

    // const updatePost = post => {
    //     return fetch(`http://localhost:8088/Posts/${post.id}`, {
    //         method: "PUT",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(post)
    //     })
    //         .then(getPosts)
    // }

    // const deletePost = (postId) => {
    //     return fetch(`http://localhost:8088/Posts/${postId}`, {
    //         method: "DELETE"
    //     })
    //         .then(getPosts)
    // }

    return (
        <PostContext.Provider value={{
            Posts, addPost, getPosts, getPostById,
            searchTerms, setTerms, releasePost, updatePost,
            getPostBySub, getPostByTag, getPostByCat, getPostByUser
            
        }}>
            {props.children}
        </PostContext.Provider>
    )
}