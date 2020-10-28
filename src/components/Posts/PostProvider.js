import React, { useState } from "react"

export const PostContext = React.createContext()

export const PostProvider = (props) => {
    const [posts, setPosts] = useState([])  
    const [post, setPost] = useState({user:{}})
    const [postTags, setPostTags] = useState([{tagPost:{}}])

    const getPosts = () => {
        return fetch("http://localhost:8088/posts")
            .then(res => res.json())
            .then(setPosts)
    }

    const getPostById = (id) => {
        return fetch(`http://localhost:8088/posts/${id}`)
            .then(res => res.json())
    }

    const getPostByUser = (userId) => {
        return fetch(`http://localhost:8088/posts?user_id=${userId}`)
            .then(res => res.json())
            .then(setPosts)
    }

    const getPostByTag = (tagId) => {
        return fetch(`http://localhost:8088/posts?tag_id=${tagId}`)
            .then(res => res.json())
            .then(setPosts)
    }

    const getTagsByPost = (postId) => {
        return fetch(`http://localhost:8088/tags?post_id=${postId}`)
            .then(res => res.json())
            .then(setPostTags)
    }

    const getPostByCat = (categoryId) => {
        return fetch(`http://localhost:8088/posts?category_id=${categoryId}`)
            .then(res => res.json())
            .then(setPosts)
    }

    const getPostBySub = () => {
        return fetch("http://localhost:8088/posts")
            .then(res => res.json())
            .then(setPosts)
    }

    const addPost = post => {
        return fetch("http://localhost:8088/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(post)
        })
           .then(res => res.json())     
    }

    const updatePost = post => {
        return fetch(`http://localhost:8088/Posts/${post.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(post)
        })
            .then(getPosts)
    }

    const deletePost = (postId) => {
        return fetch(`http://localhost:8088/Posts/${postId}`, {
            method: "DELETE"
        })
            .then(getPosts)
    }

    return (
        <PostContext.Provider value={{
            post, setPost, posts, addPost, getPosts, setPosts,
            getPostById, updatePost,
            getPostBySub, getPostByTag, getPostByCat, getPostByUser,
            deletePost, postTags, getTagsByPost
            
        }}>
            {props.children}
        </PostContext.Provider>
    )
}