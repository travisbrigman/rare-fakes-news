import React, { useState, useContext, useEffect } from "react"
import { TagContext } from "./TagProvider"
import Tag from "./Tag"


export const TagList = ({ props }) => {
    const { getTags, tags} = useContext(TagContext)

    //do I need a useState hook??

    // Initialization effect hook -> Go get tag data
    useEffect(() => {
        getTags()
    }, [])

    return (
        <div style={{ marginTop: "2rem"}}>
            <div className="tags">
                {
                    tags.map(tag => <Tag key={tag.id} tag={tag} />)
                }
            </div>
        </div>
    )
}