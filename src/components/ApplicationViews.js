import React from "react";
import { Route } from "react-router-dom";
import { CategoryForm } from "./Categories/CategoryForm";
import { CategoryProvider } from "./Categories/CategoryProvider";
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
          path="/categories"
          render={(props) => <CategoryForm {...props} />}
        />
      </CategoryProvider>
    </>
  );
};
