//handles all Post data- getPosts, getPostsById, getPostsByUser, getPostByTag, getTagsByPost, getPostByCat, addPost, updatePost, deletePost
import React, { useState } from "react"

export const PostContext = React.createContext()

export const PostProvider = (props) => {
    const [posts, setPosts] = useState([{user:{user:{first_name: ""}}, category:{label:""}}])  
    const [post, setPost] = useState({user:{user:{}}})
    const [postTags, setPostTags] = useState([{tag:{}}])

    const getPosts = () => {
        return fetch("http://localhost:8000/posts" , {
            headers: {
              Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
              "Content-Type": "application/json",
            }
          })
            .then(res => res.json())
            .then(setPosts)
    }

    const getPostById = (id) => {
        return fetch(`http://localhost:8000/posts/${id}` , {
            headers: {
              Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
              "Content-Type": "application/json",
            }
          })
            .then(res => res.json())
    }

    const getPostByUser = (user) => {
        return fetch(`http://localhost:8000/posts?user_id=${user}` , {
            headers: {
              Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
              "Content-Type": "application/json",   
            } ,
            body: JSON.stringify(user)
          })
            .then(res => res.json())
            .then(setPosts)
    }

    const getPostByTag = (tagId) => {
        return fetch(`http://localhost:8000/posts?tag_id=${tagId}` , {
            headers: {
              Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
              "Content-Type": "application/json",   
            }
          })
            .then(res => res.json())
            .then(setPosts)
    }

    const getTagsByPost = (postId) => {
        return fetch(`http://localhost:8000/posttags?post_id=${postId}` , {
            headers: {
              Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
              "Content-Type": "application/json",   
            }
          })
            .then(res => res.json())
            .then(setPostTags)
    }

    const getPostByCat = (categoryId) => {
        return fetch(`http://localhost:8000/posts?category_id=${categoryId}` , {
            headers: {
              Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
              "Content-Type": "application/json",   
            }
          })
            .then(res => res.json())
            .then(setPosts)
    }

    const addPost = post => {
        return fetch("http://localhost:8000/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
              },
            body: JSON.stringify(post)
        })
           .then(res => res.json())     
    }

    const updatePost = post => {
        return fetch(`http://localhost:8000/posts/${post.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            },
            body: JSON.stringify(post)
        })
            .then(getPosts)
    }

    const deletePost = (postId) => {
        return fetch(`http://localhost:8000/posts/${postId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`,
            },
        body: JSON.stringify(postId)
        })
            .then(getPosts)
    }

    return (
        <PostContext.Provider value={{
            post, setPost, posts, addPost, getPosts, setPosts,
            getPostById, updatePost, getPostByTag, getPostByCat, getPostByUser,
            deletePost, postTags, getTagsByPost
            
        }}>
            {props.children}
        </PostContext.Provider>
    )
}