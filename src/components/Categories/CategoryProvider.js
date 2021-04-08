//module to handle all category data manipulation- getting categories, and creating categories
import React, { useState } from "react";
export const CategoryContext = React.createContext();
export const CategoryProvider = (props) => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({});

  const getCategories = () => {
    return fetch("http://127.0.0.1:8080/categories", {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("rare_user_id")}`
      }
    })
      .then((res) => res.json())
      .then(setCategories);
  };

  const createCategory = (category) => {
    return fetch("http://127.0.0.1:8080/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("rare_user_id")}`
      },
      body: JSON.stringify(category),
    })
      .then((res) => res.json())
      .then(getCategories);
  };

  const deleteCategory = (categoryId) => {
    return fetch(`http://127.0.0.1:8080/categories/${categoryId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("rare_user_id")}`,
        },
    body: JSON.stringify(categoryId)
    })
        .then(getCategories)
  }

  const editCategory = category => {
    return fetch(`http://127.0.0.1:8080/categories/${category.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("rare_user_id")}`
        },
        body: JSON.stringify(category)
    })
        .then(getCategories)
}

const getCategoryById = (id) => {
  return fetch(`http://127.0.0.1:8080/categories/${id}` , {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("rare_user_id")}`,
        "Content-Type": "application/json",
      }
    })
      .then(res => res.json())
}

  return (
    <CategoryContext.Provider
      value={{
        category,
        setCategory,
        categories,
        getCategories,
        setCategories,
        createCategory,
        deleteCategory,
        editCategory,
        getCategoryById
      }}
    >
      {props.children}
    </CategoryContext.Provider>
  );
};
