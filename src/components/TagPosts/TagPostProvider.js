import React, { useState } from "react"

export const TagPostContext = React.createContext()

export const TagPostProvider = (props) => {
    const [tagPosts, setTagPosts] = useState([])
    const [tagPost, setTagPost] = useState({})

    const getTagPosts = () => {
        return fetch("http://localhost:8088/tagPosts")
            .then(res => res.json())
            .then(setTagPosts)
    }
    
    // const getTagPostByTag = (tagId) => {
    //     return fetch(`http://localhost:8088/tagPosts?tag_id=${tagId}`)
    //         .then(res => res.json())
    //         .then(setTagPosts)
    // }
    
    const createTagPost = TagPost => {
            return fetch("http://localhost:8088/tagPosts", {
                    method: "POST",
                    headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(TagPost)
                    })
                       .then(res => res.json())
                        .then(newTagPost => {
                            getTagPosts()
                            return newTagPost.id })      
                    }
                    
                    
    return (
        <TagPostContext.Provider value={{
            tagPost, setTagPost, tagPosts, getTagPosts, 
            setTagPosts, createTagPost    
        }}>
            {props.children}
        </TagPostContext.Provider>
    )
}