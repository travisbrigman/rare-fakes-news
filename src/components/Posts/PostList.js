import React, { useContext, useEffect } from "react"
import { PostContext } from "./PostProvider"



export const PostList = (props) => {
    const {posts, getPosts} = useContext(PostContext)

    useEffect(() => {
        getPosts()
    },[])


    return (
        <>
        <h2>Posts</h2>
        {
            posts.map(p => {
                return <div>
                    <p>{p.title}</p>
                    <p>{p.user.display_name}</p>
                    <p>{p.category.type}</p>
                </div>
            })
        }
        </>
    )
}