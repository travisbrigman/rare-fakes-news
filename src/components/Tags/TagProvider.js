//handles all tag data- getTags, createTag
import React, { useState } from "react";

export const TagContext = React.createContext();

export const TagProvider = (props) => {
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState({});
  const getTags = () => {
    return fetch("http://localhost:8000/tags", {
      headers: {
        Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
      },
    })
      .then((res) => res.json())
      .then(setTags);
  };

  const createTag = (tag) => {
    return fetch("http://localhost:8000/tags", {
      method: "POST",
      headers: {
        Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tag),
    })
      .then((res) => res.json())
  };

  return (
    <TagContext.Provider
      value={{
        tag,
        setTag,
        tags,
        getTags,
        setTags,
        createTag,
      }}
    >
      {props.children}
    </TagContext.Provider>
  );
};
