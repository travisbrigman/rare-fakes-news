import React, { useEffect, useContext, useState, useRef } from "react"
import {PostContext} from "./PostProvider"
import {CategoryContext} from "../Categories/CategoryProvider"
import { TagContext } from "../Tags/TagProvider"
import { TagPostContext } from "../Tags/TagPostProvider"


export const PostForm = (props) => {
    const {post, setPost, addPost} = useContext(PostContext)
    const { categories, getCategories} = useContext(CategoryContext)
    const {tag, tags, getTags} = useContext(TagContext)
    const {createTagPost} = useContext(TagPostContext)
    const [stateTagIDArr, setTagIDArr] = useState([])
    const [stateTagObjArr, setTagObjArr] = useState([])

    useEffect(() => {
        getCategories()
        getTags()
    },[]) 

    useEffect(() => {
        const stateCopyObj = stateTagObjArr.slice()
        const tagItems = stateTagIDArr.map(t => {
            return tags.find(tag => tag.id === t)
        })
        stateCopyObj.push(tagItems)
        setTagObjArr(stateCopyObj)
    },[stateTagIDArr])

    const handleControlledInputChange = (browserEvent) => {
        const newPost = Object.assign({}, post)          
        newPost[browserEvent.target.name] = browserEvent.target.value 
        setPost(newPost)                                 
    }

    const handleTags = (browserEvent) => {  
        const stateCopyID = stateTagIDArr.slice()
        let newTagItem = parseInt(browserEvent.target.value)
         stateCopyID.push(newTagItem)
        setTagIDArr(stateCopyID)    
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
                            onChange={handleTags} >
                                <option value="0">add some tags...</option>
                                {
                                    tags.map(t => {
                                        return <option value={t.id}>{t.tag}</option>
                                    })
                                }
                    </select>
                </div>
            </fieldset>
            <div>
                { stateTagIDArr.length === 0 ? "" : 
                stateTagIDArr.map(t => {
                    const tagObj = tags.find(tag => tag.id === t)
                return <div>{tagObj.tag}
                <button onClick={(evt) =>{
                    evt.preventDefault()
                    const arrCopyID = stateTagIDArr.slice()
                    const index = arrCopyID.indexOf(tagObj.id)
                    arrCopyID.splice(index, 1)
                    setTagIDArr(arrCopyID)  
                }}>x</button>
                </div>
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