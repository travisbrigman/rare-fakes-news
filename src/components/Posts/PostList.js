import React, { useContext, useEffect } from "react"
import {Link} from "react-router-dom"
import { PostContext } from "./PostProvider"



export const PostList = (props) => {
    const {posts, getPosts} = useContext(PostContext)

    useEffect(() => {
        getPosts()
    },[])


    return (
        <>
        <h2>Posts</h2>
        <Link to={{pathname:`posts/create`}}>
        create post
        </Link>
        {
            posts.map(p => {
                return <div>
                    <Link to={{pathname:`/posts/${p.id}`}}>
                    <p>{p.title}</p>
                    </Link>
                    <p>{p.user.display_name}</p>
                    <p>{p.category.type}</p>
                </div>
            })
        }
        </>
    )
}