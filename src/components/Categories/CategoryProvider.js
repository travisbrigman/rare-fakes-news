//module to handle all category data manipulation- getting categories, and creating categories
import React, { useState } from "react";
export const CategoryContext = React.createContext();
export const CategoryProvider = (props) => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({});

  const getCategories = () => {
    return fetch("http://localhost:8000/categories", {
      headers: {
        "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
      }
    })
      .then((res) => res.json())
      .then(setCategories);
  };

  const createCategory = (category) => {
    return fetch("http://localhost:8000/categories", {
      method: "POST",
      headers: {
        "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
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
