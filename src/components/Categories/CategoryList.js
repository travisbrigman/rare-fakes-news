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

  useEffect(() => {
    getCategories();
  }, []);

  const toCreateCreateCategory = () => {
    props.history.push("/categories/create");
    console.log("💥")
  };

  return (
    <div style={{ marginTop: "2rem"}}>
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
