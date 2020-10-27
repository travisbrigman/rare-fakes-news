import React, { useState } from "react";

export const TagPostContext = React.createContext();

export const TagPostProvider = (props) => {
  const [TagPosts, setTagPosts] = useState([]);
  const [TagPost, setTagPost] = useState({});

  const getTagPosts = () => {
    return fetch("http://localhost:8088/tagPosts")
      .then((res) => res.json())
      .then(setTagPosts);
  };

  const createTagPost = (TagPost) => {
    return fetch("http://localhost:8088/tagPosts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(TagPost),
    })
      .then((res) => res.json())
      .then((newTagPost) => {
        getTagPosts();
        return newTagPost.id;
      });
  };

  const deleteTagPost = (tagPostId) => {
    return fetch(`http://localhost:8088/tagPosts/${tagPostId}`, {
        method: "DELETE"
    })
    .then(getTagPosts)
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
        deleteTagPost
      }}
    >
      {props.children}
    </TagPostContext.Provider>
  );
};
