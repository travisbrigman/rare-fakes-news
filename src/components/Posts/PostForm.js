//form that allows users to create and edit a post
import React, { useEffect, useContext, useState } from "react"
import { PostContext } from "./PostProvider"
import { CategoryContext } from "../Categories/CategoryProvider"
import { TagContext } from "../Tags/TagProvider"
import { TagPostContext } from "../Tags/TagPostProvider"


export const PostForm = (props) => {
    const { addPost, updatePost, getPostById, postTags, getTagsByPost } = useContext(PostContext)
    const { categories, getCategories } = useContext(CategoryContext)
    const { tag, tags, getTags } = useContext(TagContext)
    const { createTagPost } = useContext(TagPostContext)

    const [postObj, setPostObj] = useState({}) //defines and sets the state of the postObj in this module
    const [stateTagIDArr, setTagIDArr] = useState([])
    const [stateTagObjArr, setTagObjArr] = useState([])

    const editMode = props.match.url.split("/")[2] === "edit" //checks url to see if editMode

    useEffect(() => {
        getCategories()
        getTags()
        // setState(postTags)
        if (editMode) {
            const postId = parseInt(props.match.params.postId)
            getTagsByPost(postId)
            getPostById(postId)
                .then(setPostObj)
        }
    }, [])

    
    
    // useEffect(() => {
        //     const stateCopyObj = stateTagObjArr.slice() //make a copy of the TagObjArr
        //     const tagItems = stateTagIDArr.map(t => {
            //         return tags.find(tag => tag.id === t) //map through tagIDArr and return the tag object whose ID === t
            //     })
            //     stateCopyObj.push(tagItems)
            //     setTagObjArr(stateCopyObj) //set the state of the TagObjArr to what was pushed into stateCopyObj array
            // }, [stateTagIDArr])
            
            const handleControlledInputChange = (browserEvent) => {
                const newPost = Object.assign({}, postObj)
                newPost[browserEvent.target.name] = browserEvent.target.value
                setPostObj(newPost)
            }
            
            const handleTagsSelected = (browserEvent) => {
                const stateCopyID = stateTagIDArr.slice() //make a copy of the state var array of TagIDs
                let newTagItem = parseInt(browserEvent.target.value) //grab the ID of the tag from the select
                stateCopyID.push(newTagItem) //push into copy
                setTagIDArr(stateCopyID)
            }
            
    const tagSelectedArray = []
    const [state, setState] = useState([])
    function handleChange(event) {
        const value = event.target.checked
        const tagObj = {[event.target.name]: value}
        // if tagObj === 
        
        tagSelectedArray.push(tagObj)

        console.log("tagSelectedArray>>",tagSelectedArray)
        console.log("state>>",state)

        // setState({
        // ...state,
        // [event.target.name]: value
        // })
        // console.log(state)
    }


    const constructPost = (evt) => {
        evt.preventDefault()

        if (editMode) {
            updatePost({
                id: postObj.id,
                title: postObj.title,
                content: postObj.content,
                category_id: parseInt(postObj.category_id),
                publication_date: postObj.publication_date,
                image_url: postObj.image_url
            })
                .then(() => {
                    props.history.push(`/posts/${postObj.id}`)
                })
        } else {
            const jsonDate = ((new Date(Date.now())).toJSON()).slice(0,10)
            addPost({
                title: postObj.title,
                content: postObj.content,
                category_id: parseInt(postObj.category_id),
                publication_date: jsonDate,
                image_url: postObj.image_url
            }).then((postObj) => {
                const tagPostPromises = [] //empty array of possible TagPosts

                stateTagIDArr.map(t => {
                    tagPostPromises.push(
                        createTagPost({
                            tag_id: t,
                            post_id: postObj.id
                        })
                    ) //push any newly created tags to promises array
                })
                Promise.all(tagPostPromises)
                    .then(() => {
                        props.history.push(`/posts/${postObj.id}`)
                    })
            })
        }
    }

    return (
        <>
            {editMode
            ? <h2>Edit Post</h2>
            : <h2>New Post</h2>
            }
            
            
            <form>
                <fieldset>
                    <div className="form-group">
                        <input type="text" name="title" className="form-control"
                            placeholder="Title" value={postObj.title}
                            onChange={handleControlledInputChange}
                        >
                        </input>
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <input type="text" name="image_url" className="form-control"
                            placeholder="Image URL" value={postObj.image_url}
                            onChange={handleControlledInputChange}
                            defaultValue=""
                        >
                        </input>
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <textarea type="text" name="content" className="form-control"
                            placeholder="Article content" value={postObj.content}
                            onChange={handleControlledInputChange}
                        >
                        </textarea>
                    </div>
                </fieldset>
                
                <fieldset>
                    <div className="form-group">
                        <select name="category_id" className="form-control"
                            value={postObj.category_id} 
                            onChange={handleControlledInputChange} 
                        >
                            <option value="0">Category Select</option>
                            {
                                categories.map(c => {
                                    return <option key={c.id} value={c.id}>{c.label}</option>
                                })
                            }
                        </select>
                    </div>
                </fieldset>

                {/* <fieldset>
                    <div className="form-group">
                        <label htmlFor="status">Tags: </label>
                        <select name="id" value={tag.id} className="form-control"
                            onChange={handleTags} 
                        >
                            <option value="0">add some tags...</option>
                            {
                                tags.map(t => {
                                    return <option key={t.id} value={t.id}>{t.label}</option>
                                })
                            }
                        </select>
                    </div>
                </fieldset> */}

                {/* <div>
                    {stateTagIDArr.length === 0 ? "" :
                        stateTagIDArr.map(t => {
                            const tagObj = tags.find(tag => tag.id === t)
                            return <div key={tagObj.id}>{tagObj.label}
                                <button onClick={(evt) => {
                                    evt.preventDefault()
                                    const arrCopyID = stateTagIDArr.slice()
                                    const index = arrCopyID.indexOf(tagObj.id)
                                    arrCopyID.splice(index, 1)
                                    setTagIDArr(arrCopyID)
                                }}>x</button>
                            </div>
                        })
                    }
                </div> */}

                {tags.map((t) => (
                    <div>                        
                        <input
                        type="checkbox"
                        name={t.id}
                        value={t.id}
                        checked={state[t.id]}
                        onChange={handleChange}
                        />
                        <label>
                        {t.label}
                        </label>
                    </div>
                ))}

                
                {/* {editMode                     
                    ?
                        <div className="container--checkboxes">
                            {tags.map(t => {
                                    return (   
                                        <article className="checkboxGroup">
                                            <div key={tag.id}>
                                                <input
                                                type="checkbox"
                                                value={t.label}
                                                name={t.label}
                                                // checked={postTags.tag_id === t.id}
                                                checked={postTags[t.id]}
                                                onChange={handleTagsSelected} 
                                                >
                                                </input>
                                                <label style={{color: "red"}}>                                            
                                                    {" #"}{t.label}
                                                </label>
                                            </div>                                            
                                        </article>                                     
                                    )
                                })
                            }
                        </div>
                    :
                        <div className="container--checkboxes">
                            {tags.map(t => {
                                    return (   
                                        <article className="checkboxGroup">
                                            <div key={tag.id}>
                                                <input
                                                type="checkbox"
                                                value={t.id}
                                                name={t.label}
                                                onChange={handleTagsSelected} 
                                                >
                                                </input>
                                                <label>                                            
                                                    {" #"}{t.label}
                                                </label>
                                            </div>                                            
                                        </article>                                     
                                    )
                                })
                            }
                        </div>
                } */}



                {editMode
                    ? 
                        <button onClick={(evt) => {
                            constructPost(evt)
                        }}>Save</button>    
                    :
                        <>
                            <button onClick={(evt) => {
                                constructPost(evt)}}
                            >
                                Publish
                            </button>
                        </>
                }

            </form>
        </>
    )

}