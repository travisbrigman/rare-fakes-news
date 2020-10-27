import React, { useState, useContext } from "react";
import { TagPostContext } from "../Tags/TagPostProvider";
import "./DeleteItem.css"

export const DeleteTagItem = ( props ) => {
  const { deleteTagPost } = useContext(TagPostContext);

  
  const [open, setOpen] = useState();
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(undefined);

  const showHideClassName = open ? "modal display-block" : "modal display-none";

  const deleteThisTag = () => {
      console.log(props);
    deleteTagPost(props.tagPostId)
    onClose();
  };

  return (
    <>
      <button onClick={onOpen}>DELETE</button>
      {open && (
        <div className={showHideClassName}>
          <div className="modal-main">
            <h3>
              Confirm
            </h3>
            <p>Are you sure you want to delete?</p>
            <div>
              <button onClick={deleteThisTag}> <strong>Delete</strong></button>
              <button onClick={onClose}> Cancel </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
