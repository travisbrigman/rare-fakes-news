//handles all TagPost object data- getTagPosts, createTagPost, deleteTagPost
import React, { useContext, useState } from "react";
import {PostContext} from "../Posts/PostProvider"

export const TagPostContext = React.createContext();


export const TagPostProvider = (props) => {
  const [TagPosts, setTagPosts] = useState([]);
  const [TagPost, setTagPost] = useState({}); 
  
  const {getTagsByPost} = useContext(PostContext)

  const getTagPosts = () => {
    return fetch("http://127.0.0.1:8080/postTags", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("rare_user_id")}`
      }
    })
      .then((res) => res.json())
      .then(setTagPosts);
  };

  const getPostTagsByTags = (tagId) => {
    return fetch(`http://127.0.0.1:8080/postTags?tag_id=${tagId}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("rare_user_id")}`
      }
    })
      .then((res) => res.json())
      //.then(setTagPosts)
  };

  const createTagPost = (TagPost) => {
    return fetch("http://127.0.0.1:8080/postTags", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("rare_user_id")}`
      },
      body: JSON.stringify(TagPost),
    })
      .then((res) => res.json())
  };

  const deleteTagPost = (tagPostId, postId) => {
    return fetch(`http://127.0.0.1:8080/postTags/${tagPostId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("rare_user_id")}`
        }
    })
    .then(getTagPosts)
    .then(getTagsByPost(postId))
}




  return (
    <TagPostContext.Provider
      value={{
        TagPost,
        setTagPost,
        TagPosts,
        getTagPosts,
        setTagPosts,
        createTagPost,
        deleteTagPost,
        getPostTagsByTags
      }}
    >
      {props.children}
    </TagPostContext.Provider>
  );
};
