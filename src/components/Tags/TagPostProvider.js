import React, { useState } from "react"

export const TagPostContext = React.createContext()

export const TagPostProvider = (props) => {
    const [TagPosts, setTagPosts] = useState([])
    const [TagPost, setTagPost] = useState({})

    const getTagPosts = () => {
        return fetch("http://localhost:8088/tagPosts")
            .then(res => res.json())
            .then(setTagPosts)
    }
    
    const getTagPostsByTag = (tagId) => {
        return fetch(`http://localhost:8088/tagPosts?tag_id=${tagId}`)
            .then(res => res.json())
            .then(setTagPosts)
    }
    
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
                            TagPost, setTagPost, TagPosts, getTagPosts, getTagPostsByTag, 
                            setTagPosts, createTagPost    
                        }}>
            {props.children}
        </TagPostContext.Provider>
    )
}