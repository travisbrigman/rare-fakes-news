import React, { useEffect, useContext } from "react";

import { CategoryContext } from "./CategoryProvider";

export const CategoryForm = (props) => {
  const { categories, category, getCategories, createCategory, setCategory } = useContext(
    CategoryContext
  );

  function handleChange(evt) {
    setCategory({ type: evt.target.value });
  }

  useEffect(() => {
    getCategories();
  }, []);

  const constructNewCategory = () => {
      createCategory(category)
      .then(() => props.history.push("/categories"));
  };

  return (
    <form className="categoryForm">
      <label>
        <div className="label">Category</div>
        <input
          type="text"
          name="category"
          value={category.category}
          onChange={handleChange}
        />
      </label>
      <button
        type="submit"
        onClick={(evt) => {
          evt.preventDefault();
          constructNewCategory();
        }}
        className="btn btn-primary"
      >
        Save Update
      </button>
    </form>
  );
};
