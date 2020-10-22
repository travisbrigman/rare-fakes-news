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

  return <h1>HELLO</h1>;
};
