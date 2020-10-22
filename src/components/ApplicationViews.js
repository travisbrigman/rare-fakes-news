import React from "react";
import { Route } from "react-router-dom";
import { CategoryForm } from "./Categories/CategoryForm";
import { CategoryProvider } from "./Categories/CategoryProvider";
import { CategoryList } from "./Categories/CategoryList"
import { HomeList } from "./Profiles/HomeList";

export const ApplicationViews = () => {
  return (
    <>
      {/* <main
        style={{
          margin: "5rem 2rem",
          lineHeight: "1.75rem",
        }}
      ></main> */}
      <Route exact path="/home">
        <HomeList />
      </Route>
      <CategoryProvider>
        <Route
          exact
          path="/newCategory"
          render={(props) => <CategoryForm {...props} />}
        />
        <Route
          exact
          path="/categories"
          render={(props) => <CategoryList {...props} />}
        />
      </CategoryProvider>
    </>
  );
};
