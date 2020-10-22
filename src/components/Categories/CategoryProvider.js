import React, { useState } from "react";

export const CategoryContext = React.createContext();

export const CategoryProvider = (props) => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({});

  const getCategories = () => {
    return fetch("http://localhost:8088/categories")
      .then((res) => res.json())
      .then(setCategories);
  };

  const createCategory = (category) => {
      console.log(category)
    return fetch("http://localhost:8088/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    })
      .then((res) => res.json())
      .then((newCategory) => {
        getCategories();
        return newCategory.id;
      });
  };

  return (
    <CategoryContext.Provider
      value={{
        category,
        setCategory,
        categories,
        getCategories,
        setCategories,
        createCategory,
      }}
    >
      {props.children}
    </CategoryContext.Provider>
  );
};
