//handles all tag data- getTags, createTag
import React, { useState } from "react";

export const TagContext = React.createContext();

export const TagProvider = (props) => {
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState({});
  
  const getTags = () => {
    return fetch("https://rare-vapor-server.herokuapp.com/tags", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("rare_user_id")}`,
      },
    })
      .then((res) => res.json())
      .then(setTags);
  };

  const createTag = (tag) => {
    return fetch("https://rare-vapor-server.herokuapp.com/tags", {
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
    return fetch(`https://rare-vapor-server.herokuapp.com/tags/${tagId}`, {
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
  return fetch(`https://rare-vapor-server.herokuapp.com/tags/${id}` , {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("rare_user_id")}`,
        "Content-Type": "application/json",
      }
    })
      .then(res => res.json())
}

const updateTag = tag => {
  return fetch(`https://rare-vapor-server.herokuapp.com/tags/${tag.id}`, {
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
