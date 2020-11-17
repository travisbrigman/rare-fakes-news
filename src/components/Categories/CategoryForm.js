//Form to let user create a new category
import React, { useEffect, useContext, useState } from "react";
import { CategoryContext } from "./CategoryProvider";


export const CategoryForm = (props) => {
  const { category, getCategories, createCategory, setCategory, editCategory, getCategoryById } = useContext(CategoryContext)

  const editMode = props.match.url.split("/")[1] === "editcategory" //checks url to see if editMode

  const [ currentCategory, setCurrentCategory ] = useState({})

  //gets the categories from the database
  useEffect(() => {
    getCategories()
 
   
  }, [])

  useEffect(() => {
    if (editMode) {
      getCategoryById(parseInt(props.match.params.categoryId))
        .then(category => {
          setCurrentCategory({
            label: category.label
          })
        })
  }
  }, [props.match.params.categoryId])

  //function that is called when a change happens in the form. It sets the state variable that is imported via context.
  //whatever the value that goes in the input (the evt) is being written as single property object with a key of 'type'
  //and the value of the form input
  const handleChange = (event) => {
    const newCategoryState = Object.assign({}, currentCategory)
    newCategoryState[event.target.name] = event.target.value
    setCurrentCategory(newCategoryState)
  }

  //function that is called on click of the submit button
  //create category writes a new category object to the database.
  //the category it writes is derived from the state variable that is imported from context
  //lastly, once the category is created, we are redirected to the categories page
  const constructNewCategory = () => {
 
    if (editMode) {
      editCategory({
        id: props.match.params.categoryId,
        label: currentCategory.label
      })
      .then(() => {
        props.history.push("/categories")
      })
    } else {
      createCategory({
        label: currentCategory.label
      })
      .then(() => props.history.push("/categories"));
    }
    }
    

  return (
    <form className="categoryForm">
      <label htmlFor="label">
        <div className="label">Category</div>
        <input
          type="text"
          name="label"
          value={currentCategory.label}
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
        
       {editMode? "Save Update" : "Create New Category"} 
      </button>
    </form>
  );
};
