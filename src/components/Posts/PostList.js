//child of HomeList, list of all posts, user can delete only their own post
import React, { useContext, useEffect } from "react"
import {Link} from "react-router-dom"
import { PostContext } from "./PostProvider"
import { UserContext } from "../Profiles/UserProvider"
import { DeleteItem } from "../utils/DeleteItem";



export const PostList = (props) => {
    const {posts, getPosts} = useContext(PostContext)
    const { loggedInUser, user, users, getUsers } = useContext(UserContext);

    useEffect(() => {
       getPosts()
    },[])

    // console.log(loggedInUser)
    // console.log(users, "u")
    console.log(posts[0])

    return (
        <>
        <h2>Posts</h2>
        <Link to={{pathname:`posts/create`}}>
        create post
        </Link>
        {
            posts !== [] ? posts.map(p => {
                return <div key={p.id} className="container__card">
                    <Link to={{pathname:`/posts/${p.id}`}}>
                    <p>{p.title}</p>
                    </Link>
                    <p>{p.user.user.first_name}</p>
                    <p>{p.category.label}</p>
                    {p.user_id === loggedInUser ? <DeleteItem postId= {p.id}/> : <></>}
                </div>
            }) : null
        }
        </>
    )
}