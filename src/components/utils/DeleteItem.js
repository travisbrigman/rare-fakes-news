import React, { useState, useContext } from "react";
import { PostContext } from "../Posts/PostProvider";
import { UserContext } from "../Profiles/UserProvider";
import "./DeleteItem.css"

export const DeleteItem = () => {
  const { getPosts, posts, setPosts, deletePost } = useContext(PostContext);

  const { loggedInUser } = useContext(UserContext);
  
  const [open, setOpen] = useState();
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(undefined);

  const showHideClassName = open ? "modal display-block" : "modal display-none";

  const deleteThisPost = () => {
    deletePost();
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
              <button onClick={deleteThisPost}> <strong>Delete</strong></button>
              <button onClick={onClose}> Cancel </button>
                
                  
                  
                
              
            </div>
          </div>
        </div>
      )}
    </>
  );
};
