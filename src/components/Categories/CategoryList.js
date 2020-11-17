//list of categories the user has created
import React, { useEffect, useContext, useState } from "react";
import { CategoryContext } from "./CategoryProvider";
import { UserContext } from "../Profiles/UserProvider"
import { DeleteCategory } from "../utils/DeleteCategory"

export const CategoryList = (props) => {
  const {categories, getCategories} = useContext(CategoryContext)
  const { getCurrentUser } = useContext(UserContext)
  const [ currentUser, setCurrentUser ] = useState({user:{}})
  
  //gets the categories from the database
  useEffect(() => {
    getCategories()
    getCurrentUser()
      .then(setCurrentUser)
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
        { //map through categories to display them
          categories.map(categoryObject => {
            return <>
                    <div key={categoryObject.id}>{categoryObject.label}</div> 
                    { //if and only if the current user is an admin, show the DELETE button
                      currentUser.user.is_staff ?             
                      <DeleteCategory categoryId={categoryObject.id} /> : ""
                    }
                  </>
            })
        }
      </div>
      <button onClick={toCreateCreateCategory}>+ Category</button>
    </div>
  );
};
