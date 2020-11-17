//renders list of tags in tag management, maps over tags in DB and displays each individual tag component
import React, { useContext, useEffect, useState } from "react"
import { TagContext } from "./TagProvider"
import { UserContext } from "../Profiles/UserProvider"
import { DeleteTag } from "../utils/DeleteTag";
import Tag from "./Tag"
import { Link } from "react-router-dom"


export const TagList = ({ props }) => {
    const { getTags, tags, deleteTag } = useContext(TagContext)
    const { getCurrentUser } = useContext(UserContext)
    const [currentUser, setCurrentUser] = useState({ user: {} })


    // Initialization effect hook -> Go get tag data
    useEffect(() => {
        getTags()
    }, [])

    useEffect(() => {
        getCurrentUser()
            .then(res => {
                setCurrentUser(res)
                const user = res
                return user
            })
    }, [])


    return (
        <div className="tag_container">
            <h1 className="heading">Tags</h1>
            <div className="tags_container">
                {
                    tags.map(tag => {
                        return (<>
                            <div>{tag.label}</div>
                            {currentUser.user.is_staff ? <><DeleteTag tagId={tag.id} /> <div className="new_tag_btn_container"> <Link to={`/tags/edit/${tag.id}`}>
                                <button onClick={() => localStorage.setItem("currentLabel", tag.label)} className="new_tag_btn">Edit Tag</button>
                            </Link></div></> : <></>}

                        </>)
                    })

                }
            </div>
            <Link className="tagform__link" to="/tags/create">Create a new tag</Link>
        </div>

    )
}