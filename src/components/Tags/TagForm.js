//form to create a new tag
import React, { useContext, useEffect, useState } from "react"
import { TagContext } from "./TagProvider"
import { Button, Box } from "grommet"
import "../utils/DeleteItem.css"



export const TagForm = (props) => {
    // Use the required context providers for data
    const { createTag, updateTag, getTagById } = useContext(TagContext)
    const editMode = props.match.params.hasOwnProperty("tagId")

    //state variable and functions that change state of the state variable
    const [open, setOpen] = useState();
    const onOpen = () => setOpen(true);
    const onClose = () => setOpen(undefined);

    //toggles the CSS class name depending on if the modal is open or not
    const showHideClassName = open ? "modal display-block" : "modal display-none";

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

    useEffect(() => {
        if (editMode) {
            getTagById(parseInt(props.match.params.tagId))
                .then(tag => {
                    setTagObj({
                        label: tag.label
                    })
                })
        }
    }, [props.match.params.tagId])

    return (
        <fieldset className="tagForm">
            <h2 className="tagForm__title">Tag form</h2>
            <div className="form-group">

                <label htmlFor="label">Enter tag name: </label>
                <input type="text" name="label" required autoFocus className="form-control"
                    placeholder="ex: sports, politics, etc"
                    value={tagObj.label}
                    onChange={handleControlledInputChange}
                />

            </div>
            {editMode ? <Button primary margin="small" label="EDIT" onClick={onOpen}/> : "" }

            {open && (
                <div className={showHideClassName}>
                    <div className="modal-main">
                        <h3>
                            Confirm
            </h3>
                        <p>Are you sure you want to make these changes?</p>
                        <div>
                            <Button primary label="Edit" onClick={() => {
                                updateTag({
                                    id: parseInt(props.match.params.tagId),
                                    label: tagObj.label
                                })
                                    .then(() => {
                                        props.history.push(`/tags`)
                                    })
                            }}/>
                            <Button secondary margin="small" label="Cancel" onClick={onClose}/>
                        </div>
                    </div>
                </div>
            )}
            {editMode ? "" : <Button primary label="Create New Tag" type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    createTag({
                        label: tagObj.label
                    })
                        .then(() => props.history.push("/tags"))
                }}

                />
               }
        </fieldset>
    )
}