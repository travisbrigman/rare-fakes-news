//list of categories the user has created
import React, { useEffect, useContext, useState } from "react";
import { CategoryContext } from "./CategoryProvider";
import { UserContext } from "../Profiles/UserProvider";
import { Button, Box, Heading, List } from "grommet";
import { Edit, Add } from "grommet-icons";
import { DeleteCategory } from "../utils/DeleteCategory";
import { Link } from "react-router-dom";

export const CategoryList = (props) => {
  const { categories, getCategories } = useContext(CategoryContext);
  const { getCurrentUser } = useContext(UserContext);
  const [currentUser, setCurrentUser] = useState({ user: {} });

  //gets the categories from the database
  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getCurrentUser().then(setCurrentUser);
  }, []);

  //this function is called on the click of the '+category' button
  // it takes us to a new route where a category creation form is rendered
  const toCreateCreateCategory = () => {
    props.history.push("/categories/create");
  };

  return (
    <Box>
      <Heading level="1">Categories</Heading>

      <Box className="categoryList" direction="row">
        <Box background="background-contrast" elevation="small">
        <List data={categories} primaryKey="label" />
        </Box>
        <Box>
          {categories.map((categoryObject) => {
            return (
              
                <Box direction="row" align="center">
                  {
                    //only shows edit and delete if the user is an admin
                    // currentUser.user.is_staff ? (
                      <>
                        <DeleteCategory categoryId={categoryObject.id} />
                        <div className="new_category_btn_container">
                          <Link to={`/editcategory/${categoryObject.id}`}>
                            <Button
                              icon={<Edit />}
                              className="new_category_btn"
                            />
                          </Link>
                        </div>
                      </>
                    // ) : (
                    //   ""
                    // )
                  }
                </Box>
              
            );
          })}
        </Box>
      </Box>

      <Box width="small">
        <Button
          primary
          icon={<Add />}
          onClick={toCreateCreateCategory}
          label="Category"
          margin="medium"
        />
      </Box>
    </Box>
  );
};
