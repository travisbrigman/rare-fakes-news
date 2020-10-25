import React from "react"
import { Route } from "react-router-dom"
import { HomeList } from "./Profiles/HomeList"
import { PostProvider } from "./Posts/PostProvider"
import { PostForm } from "./Posts/PostForm"
import { TagPostProvider } from "./Tags/TagPostProvider"
import { TagProvider } from "./Tags/TagProvider"
import { TagForm } from "./Tags/TagForm"
import { TagList } from "./Tags/TagList"
import { CategoryProvider } from "./Categories/CategoryProvider";
import { CategoryForm } from "./Categories/CategoryForm";
import { CategoryList } from "./Categories/CategoryList";
import { UsersPosts } from "./Posts/UsersPosts"

export const ApplicationViews = (props) => {
  return (<>
    <main style={{
      margin: "5rem 2rem",
      lineHeight: "1.75rem"
    }}>
    </main>
    <PostProvider>
      <CategoryProvider>
        <TagPostProvider>
          <TagProvider>
            <Route exact path="/home" render={
              props => <HomeList {...props} />} />
            <Route exact path="/posts/create" render={
              props => <PostForm {...props} />} />
            <Route exact path="/myposts" render={
              (props) => <UsersPosts {...props} />} />
          </TagProvider>
        </TagPostProvider>
      </CategoryProvider>
    </PostProvider>
    {/*********************************** */}
    <TagProvider>
      <Route exact path="/tags/create" render={(props) => {
        return <TagForm {...props} />
      }} />
      <Route exact path="/tags" render={(props) => {
        return <TagList {...props} />
      }} />
    </TagProvider>
    {/*********************************** */}
    <CategoryProvider>
      <Route
        exact path="/categories" render={
          (props) => <CategoryList {...props} />} />
      <Route exact path="/categories/create" render={
        (props) => <CategoryForm {...props} />} />
    </CategoryProvider>
  </>
  );
};
