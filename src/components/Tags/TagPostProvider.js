import React, { useState } from "react"

export const TagPostContext = React.createContext()

export const TagPostProvider = (props) => {
    const [TagPosts, setTagPosts] = useState([])
    const [TagPost, setTagPosts] = useState({})

    const getTagPosts = () => {
        return fetch("http://localhost:8088/tagPosts")
            .then(res => res.json())
            .then(setTags)
    }    
    
    const createTagPost = TagPost => {
            return fetch("http://localhost:8088/tagPosts", {
                    method: "POST",
                    headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(tag)
                    })
                       .then(res => res.json())
                        .then(newTag => {
                                getTags()
                               return newTag.id })      
                    }
                    
                    
                    return (
                        <TagContext.Provider value={{
                            TagPost, setTagPost, TagPosts, getTagPosts, 
                            setTagPosts, createTagPost    
                        }}>
            {props.children}
        </TagContext.Provider>
    )
}