import React, { useState } from "react"

export const TagContext = React.createContext()

export const TagProvider = (props) => {
    const [tags, setTags] = useState([])
    const [tag, setTag] = useState({})

    const getTags = () => {
        return fetch("http://localhost:8088/tags")
            .then(res => res.json())
            .then(setTags)
    }    
    
    const createTag = tag => {
            return fetch("http://localhost:8088/tags", {
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
                            tag, setTag, tags, getTags, 
                            setTags, createTag    
                        }}>
            {props.children}
        </TagContext.Provider>
    )
}