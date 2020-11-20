//delete button component with confirmation modal
import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { TagContext } from "../Tags/TagProvider"
import { Button } from "grommet"
import { Trash } from "grommet-icons"
import "./DeleteItem.css"

export const DeleteTag = ({ tagId }) => {
  const { deleteTag } = useContext(TagContext);
  const history = useHistory()

  //state variable and functions that change state of the state variable
  const [open, setOpen] = useState();
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(undefined);

  //toggles the CSS class name depending on if the modal is open or not
  const showHideClassName = open ? "modal display-block" : "modal display-none";

  //function that is called when the delete button is clicked. 
  //This function deletes an entry in the Post table.
  //Lastly the function calls the close function which resets our modal state.
  const deleteThisTag = () => {
    deleteTag(tagId)
    .then(() => {
        onClose()
      history.push("/tags")
    })
  };

  return (
    <>
      <Button icon={<Trash />} onClick={onOpen} />
      {open && (
        <div className={showHideClassName}>
          <div className="modal-main">
            <h3>
              Confirm
            </h3>
            <p>Are you sure you want to delete?</p>
            <div>
              <Button primary margin="small" label="Delete" onClick={deleteThisTag}/>
              <Button secondary margin="small" label="Cancel" onClick={onClose} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};