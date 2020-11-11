//Form to let user create a new category
import React, { useEffect, useContext } from "react";
import { CategoryContext } from "./CategoryProvider";

export const CategoryForm = (props) => {
  const { category, getCategories, createCategory, setCategory } = useContext(
    CategoryContext
  );

  //function that is called when a change happens in the form. It sets the state variable that is imported via context.
  //whatever the value that goes in the input (the evt) is being written as single property object with a key of 'type'
  //and the value of the form input
  function handleChange(evt) {
    setCategory({ label: evt.target.value });
  }

  //gets the categories from the database
  useEffect(() => {
    getCategories();
  }, []);

  //function that is called on click of the submit button
  //create category writes a new category object to the database.
  //the category it writes is derived from the state variable that is imported from context
  //lastly, once the category is created, we are redirected to the categories page
  const constructNewCategory = () => {
    createCategory(category).then(() => props.history.push("/categories"));
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
