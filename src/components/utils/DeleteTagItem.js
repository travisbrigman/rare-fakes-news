import React, { useState, useContext } from "react";
import { PostContext } from "../Posts/PostProvider";
import { TagPostContext } from "../Tags/TagPostProvider";
import "./DeleteItem.css";

export const DeleteTagItem = (props) => {
  const { deleteTagPost } = useContext(TagPostContext);
  const { setPostTags } = useContext(PostContext);

  const [open, setOpen] = useState();
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(undefined);

  const showHideClassName = open ? "modal display-block" : "modal display-none";

  const deleteThisTag = () => {
    console.log(props);
    deleteTagPost(props.tagPostId, props.postId ).then(setPostTags);
    onClose();
  };


  //TODO- make tags react to change
  //TODO- make tag management (dropdown and delete) appear when clicking on tag managment button
  //TODO- add tag management button
  return (
    <>
      <button onClick={onOpen}>DELETE</button>
      {open && (
        <div className={showHideClassName}>
          <div className="modal-main">
            <h3>Confirm</h3>
            <p>Are you sure you want to delete?</p>
            <div>
              <button onClick={deleteThisTag}>
                {" "}
                <strong>Delete</strong>
              </button>
              <button onClick={onClose}> Cancel </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
