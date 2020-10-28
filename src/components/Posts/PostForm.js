import React, { useEffect, useContext, useState, useRef } from "react"
import {PostContext} from "./PostProvider"
import {CategoryContext} from "../Categories/CategoryProvider"
import { TagContext } from "../Tags/TagProvider"
import { TagPostContext } from "../Tags/TagPostProvider"


export const PostForm = (props) => {
    const {post, setPost, addPost, updatePost, getPostById} = useContext(PostContext)
    const { categories, getCategories} = useContext(CategoryContext)
    const {tag, tags, getTags} = useContext(TagContext)
    const {createTagPost} = useContext(TagPostContext)

    const [postObj, setPostObj] = useState({})
    const [stateTagIDArr, setTagIDArr] = useState([])
    const [stateTagObjArr, setTagObjArr] = useState([])

    const editMode = props.match.url.split("/")[2] === "edit"

    useEffect(() => {
        getCategories()
        getTags()
        if(editMode){
            getPostById(parseInt(props.match.params.postId))
            .then(setPostObj)

        }
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
        const newPost = Object.assign({}, postObj)          
        newPost[browserEvent.target.name] = browserEvent.target.value 
        setPostObj(newPost)                                 
    }

    const handleTags = (browserEvent) => {  
        const stateCopyID = stateTagIDArr.slice()
        let newTagItem = parseInt(browserEvent.target.value)
         stateCopyID.push(newTagItem)
        setTagIDArr(stateCopyID)    
    }

    const constructPost = (evt) => {
        evt.preventDefault()

        if(editMode) {
            updatePost({
                id: postObj.id,
                title: postObj.title,
                content: postObj.content,
                category_id: postObj.category_id,
                date: postObj.date,
                user_id: parseInt(localStorage.getItem("rare_user_id")),
                approved: 1
            })
            .then(() => {
                props.history.push(`/home`)
            })
        } else {
            addPost({
                title: postObj.title,
                content: postObj.content,
                category_id: postObj.category_id,
                date: Date.now(),
                user_id: parseInt(localStorage.getItem("rare_user_id")),
                approved: 1
            }).then((postObj) => {
                const tagPostPromises = []
    
                stateTagIDArr.map(t => {
                    tagPostPromises.push(
                    createTagPost({
                        tag_id: t,
                        post_id: postObj.id
                    })
                    )
                })
                Promise.all(tagPostPromises)
                .then(() => {
                    props.history.push(`/home`)
                })
            })
        }
            
    }       
    
return (
    <>
    <h2>Tell the World How You Really Feel</h2>
    <form>
        <fieldset>
            <div className="form-group">
                <label>Title:</label>
                <input type="text" name="title" className="form-control" 
                        placeholder="Post Title" value={postObj.title} 
                        onChange={handleControlledInputChange}></input>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label>Content:</label>
                <textarea type="text" name="content" className="form-control" 
                        placeholder="write your thoughts and feelings" value={postObj.content}
                        onChange={handleControlledInputChange}></textarea>
            </div>
        </fieldset>
        <fieldset>
                <div className="form-group">
                    <label htmlFor="status">Category: </label>
                    <select name="category_id" value={postObj.category_id} className="form-control" onChange={handleControlledInputChange} >
                        <option value="0">select a category</option>
                        {
                            categories.map(c =>{
                                return <option key={c.id} value={c.id}>{c.type}</option>
                            })
                        }
                    </select>
                </div>
            </fieldset>
            {editMode ? <button onClick={(evt) => {
                    constructPost(evt)
                }}>update post</button> :
            <>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="status">Tags: </label>
                    <select name="id" value={tag.id} className="form-control" 
                            onChange={handleTags} >
                                <option value="0">add some tags...</option>
                                {
                                    tags.map(t => {
                                        return <option key={t.id} value={t.id}>{t.tag}</option>
                                    })
                                }
                    </select>
                </div>
            </fieldset>
            <div>
                { stateTagIDArr.length === 0 ? "" : 
                stateTagIDArr.map(t => {
                    const tagObj = tags.find(tag => tag.id === t)
                return <div key={tagObj.id}>{tagObj.tag}
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
            </>
             }
            
        </form>
    </>
)

}