//handles all tag data- getTags, createTag
import React, { useState } from "react";

export const TagContext = React.createContext();

export const TagProvider = (props) => {
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState({});
  
  const getTags = () => {
    return fetch("http://127.0.0.1:8080/tags", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("rare_user_id")}`,
      },
    })
      .then((res) => res.json())
      .then(setTags);
  };

  const createTag = (tag) => {
    return fetch("http://127.0.0.1:8080/tags", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("rare_user_id")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tag),
    })
      .then((res) => res.json())
  };

  
  const deleteTag = (tagId) => {
    return fetch(`http://127.0.0.1:8080/tags/${tagId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("rare_user_id")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tagId),
    })
    .then(getTags)
}

const getTagById = (id) => {
  return fetch(`http://127.0.0.1:8080/tags/${id}` , {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("rare_user_id")}`,
        "Content-Type": "application/json",
      }
    })
      .then(res => res.json())
}

const updateTag = tag => {
  return fetch(`http://127.0.0.1:8080/tags/${tag.id}`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("rare_user_id")}`
      },
      body: JSON.stringify(tag)
  })
      .then(getTags)
}



  return (
    <TagContext.Provider
      value={{
        tag,
        setTag,
        tags,
        getTags,
        setTags,
        createTag,
        deleteTag,
        getTagById,
        updateTag
      }}
    >
      {props.children}
    </TagContext.Provider>
  );
};
