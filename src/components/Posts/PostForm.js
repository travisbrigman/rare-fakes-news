import React, { useEffect, useContext } from "react"
import {PostContext} from "./PostProvider"
import {CategoryContext} from "../Categories/CategoryProvider"
import { TagContext } from "../Tags/TagProvider"
import { TagPostContext } from "../Tags/TagPostProvider"


export const PostForm = () => {
    const {post, setPost, addPost} = useContext(PostContext)
    const { categories, getCategories} = useContext(CategoryContext)
    const {tag, tags, getTags, createTag} = useContext(TagContext)
    const {TagPosts, TagPost, setTagPost, getTagPosts, createTagPost} = useContext(TagPostContext)

    useEffect(() => {
        getCategories()
        getTags()
        getTagPosts()
    },[])

    const handleControlledInputChange = (browserEvent) => {
        const newPost = Object.assign({}, post)          
        newPost[browserEvent.target.name] = browserEvent.target.value 
        setPost(newPost)                                 
    }

    const handleTPControlledInputChange = (browserEvent) => {
        const newTagPost = Object.assign({}, TagPost)          
        newTagPost[browserEvent.target.name] = browserEvent.target.value 
        setTagPost(newTagPost)                                 
    }

    console.log(TagPost, "TP")
    console.log(post)

    const constructPost = () => {
        debugger
        addPost({
            title: post.title,
            content: post.content,
            category_id: post.category_id,
            date: Date.now(),
            user_id: parseInt(localStorage.getItem("rare_user_id")),
            approved: 1
        })
        .then((postId) => {
            const submittedTagsList = TagPost.split(",")
            //? will I eventually need a Promise.all ?
            const test = submittedTagsList.map(t => {
            console.log(t)
            const findTagObject = tags.find(tagObj => tagObj.tag === t.tag)
                        //tags that already exist to make a relationship obj
                        if(findTagObject !== undefined){
                                    createTagPost({
                                        tag_id: findTagObject.id,
                                        post_id: postId
                                            })
                        } else {
                            //create tags then save relationship objects
                                createTag({
                                    tag: t.tag
                                    })
                                    .then(new_tag => {
                                    createTagPost({
                                        tag_id: new_tag.id,
                                        post_id: postId
                                        })
                                    })

                        }
                }
            )
        })
    }

return (
    <>
    <h2>hey</h2>
    <form>
        <fieldset>
            <div className="form-group">
                <label>Title:</label>
                <input type="text" name="title" className="form-control" 
                        placeholder="Post Title" value={post.title}
                        onChange={handleControlledInputChange}></input>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label>Content:</label>
                <textarea type="text" name="content" className="form-control" 
                        placeholder="write your thoughts and feelings" value={post.content}
                        onChange={handleControlledInputChange}></textarea>
            </div>
        </fieldset>
        <fieldset>
                <div className="form-group">
                    <label htmlFor="status">Category: </label>
                    <select name="category_id" value={post.category_id} className="form-control" onChange={handleControlledInputChange} >
                        <option value="0">select a category</option>
                        {
                            categories.map(c =>{
                                return <option key={c.id} value={c.id}>{c.type}</option>
                            })
                        }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="status">Tags: </label>
                    <input name="tag" value={tag.tag} className="form-control" 
                            onChange={handleTPControlledInputChange} >
                    </input>
                </div>
            </fieldset>

        <button onClick={(evt) => {
                constructPost()
                //? .then(postId => {
                //     debugger
                //     constructTagPost(postId)})
                //? .then(props.history.push('/home'))
            }}>add post</button>
        </form>
    </>
)

}