import React, { useContext, useEffect, useState } from "react"
import { PostContext } from "./PostProvider"
import {Link} from "react-router-dom"
import { DeleteTagItem } from "../utils/DeleteTagItem";



export const PostDetails = (props) => {
    const { getPosts, getPostById, post, setPost, getTagsByPost, postTags, setPostTags } = useContext(PostContext)

   

    useEffect(() => {
        const postId = parseInt(props.match.params.postId)
        getPostById(postId)
        .then(setPost)
        getTagsByPost(postId)
        .then(setPostTags)
    }, [])

const handleChange = (e) => {
    console.log(postTags, e.target.value);
    const foundTag = postTags.find(tag => tag.id === parseInt(e.target.value))

}

    return (
        <section className="post">
            <h3 className="post__title">{post.title}</h3>
            <div className="post__content">{post.content}</div>
            <div className="post_date">Published on: {new Date(post.date).toLocaleDateString('en-US')}</div>

           <div>
                {post.user.id === parseInt(localStorage.getItem("rare_user_id")) ?
                <div className="post_author">Author: {post.user.display_name} (you!)</div>
                : <Link to={{pathname:`/profiles/${post.user.id}`}}>
                 <div className="post_author">Author: {post.user.display_name}</div>
                 </Link>}
            </div>        
            <div>
                    {postTags.map(postTag => {
                      return  <div>{postTag.tag}</div>
                    })
                    }
            </div>
            <select name="locationId" className="form-control"
                        proptype="int"
                        value={postTags.id}
                        onChange={handleChange} >

                        <option value="0">Select a Tag</option>
                        {postTags.map(tag => (
                            <option key={tag.id} value={tag.id}>
                                {tag.tag}
                            </option>
                        ))}
                    </select>

                    <DeleteTagItem tagPostId= {foundTag.tagPost.id}/>
        </section>
    )
}

