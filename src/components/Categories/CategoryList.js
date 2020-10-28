import React, { useEffect, useContext } from "react";

import { CategoryContext } from "./CategoryProvider";

export const CategoryList = (props) => {
  const {
    categories,
    category,
    getCategories,
    createCategory,
    setCategory,
  } = useContext(CategoryContext);

  //gets the categories from the database
  useEffect(() => {
    getCategories();
  }, []);

  //this function is called on the click of the '+category' button
  // it takes us to a new route where a category creation form is rendered
  const toCreateCreateCategory = () => {
    props.history.push("/categories/create");
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <h3>Categories</h3>
      <div className="categoryList">
        {categories.map((categoryObject) => {
          return <div key={categoryObject.id}>{categoryObject.type}</div>;
        })}
      </div>
      <button onClick={toCreateCreateCategory}>+ Category</button>
    </div>
  );
};
