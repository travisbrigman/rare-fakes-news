//form to create a new tag
import React, { useContext, useEffect, useState } from "react"
import { TagContext } from "./TagProvider"



export const TagForm = (props) => {
    // Use the required context providers for data
    const { tags, getTags, createTag, tag, setTag, updateTag, getTagById } = useContext(TagContext)
    const editMode = props.match.url.split("/")[2]

    const [tagObj, setTagObj] = useState({})

    const handleControlledInputChange = (event) => {
        /*
            When changing a state object or array, always create a new one
            and change state instead of modifying current one
        */
        const newTag = Object.assign({}, tagObj)          // Create copy
        newTag[event.target.name] = event.target.value    // Modify copy
        setTagObj(newTag)                                 // Set copy as new state
    }

    // Get tags from API when component initializes
    useEffect(() => {
        getTags()
    }, [])

    useEffect(() => {
        getTags()
        if (editMode) {
            getTagById(parseInt(props.match.params.tagId))
                .then(setTagObj)
        }
    }, [])


    const constructNewTag = () => {

        if (editMode) {
            updateTag( {
                id: tagObj.id,
                label: tagObj.label
            })
                .then(() => {
                    props.history.push(`/posts/${tagObj.id}`)
                })
            } else {

        
        // POST
        createTag({
            label: tag.tag
        })
            .then(() => props.history.push("/tags")) //takes user to tag list page
    }
}




    return (
        <form className="tagForm">
            <h2 className="tagForm__title">Tag form</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="tag">Enter tag name: </label>
                    <input type="text" name="tag" required autoFocus className="form-control"
                        placeholder="ex: sports, politics, etc"
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    constructNewTag()
                }}
                className="btn btn-primary">
                Create Tag
            </button>
        </form>
    )
            }