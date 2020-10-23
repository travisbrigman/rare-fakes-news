import React, { useEffect, useContext, useState, useRef } from "react"
import {PostContext} from "./PostProvider"
import {CategoryContext} from "../Categories/CategoryProvider"
import { TagContext } from "../Tags/TagProvider"
import { TagPostContext } from "../Tags/TagPostProvider"


export const PostForm = (props) => {
    const {post, setPost, addPost} = useContext(PostContext)
    const { categories, getCategories} = useContext(CategoryContext)
    const {tag, tags, getTags} = useContext(TagContext)
    const {getTagPosts, createTagPost} = useContext(TagPostContext)
    const [stateTagIDArr] = useState([])
    const [stateTagObjArr, setTagObjArr] = useState([])

    const tagSelect = useRef()

    useEffect(() => {
        getCategories()
        getTags()
        getTagPosts()
    },[])

    const doneAddingTags = () => {
        const currentTags = stateTagIDArr.map(t => {
           return tags.find(tag => tag.id === t)
       })
       setTagObjArr(currentTags)
    }   
 

    const handleControlledInputChange = (browserEvent) => {
        const newPost = Object.assign({}, post)          
        newPost[browserEvent.target.name] = browserEvent.target.value 
        setPost(newPost)                                 
    }

    const constructPost = (evt) => {
        evt.preventDefault()
        addPost({
            title: post.title,
            content: post.content,
            category_id: post.category_id,
            date: Date.now(),
            user_id: parseInt(localStorage.getItem("rare_user_id")),
            approved: 1
        }).then((post) => {
            const tagPostPromises = []

            stateTagIDArr.map(t => {
                tagPostPromises.push(
                createTagPost({
                    tag_id: t,
                    post_id: post.id
                })
                )
            })
            Promise.all(tagPostPromises)
            .then(() => {
                props.history.push(`/home`)
            })
            
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
                    <select name="id" value={tag.id} className="form-control" 
                            ref={tagSelect} >
                                <option value="0">add some tags...</option>
                                {
                                    tags.map(t => {
                                        return <option value={t.id}>{t.tag}</option>
                                    })
                                }
                    </select>
                    <button onClick={(evt)=> {
                        evt.preventDefault()
                        stateTagIDArr.push(parseInt(tagSelect.current.value))
                        console.log(stateTagIDArr, "in onClick")
                        }}>add tag</button>
                    <button onClick={(evt) => {
                        evt.preventDefault()
                        doneAddingTags()
                    }}>done adding tags</button>
                </div>
            </fieldset>
            <div>
                { stateTagObjArr.map(t => {
                return <p>{t.tag}</p>
                })
                }
            </div>

        <button onClick={(evt) => {
                constructPost(evt)
            }}>add post</button>
        </form>
    </>
)

}