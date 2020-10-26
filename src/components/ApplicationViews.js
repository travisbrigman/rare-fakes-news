import React from "react"
import { Route } from "react-router-dom"
import { HomeList } from "./Profiles/HomeList"
import { PostProvider } from "./Posts/PostProvider"
import { PostForm } from "./Posts/PostForm"
import { TagPostProvider } from "./Tags/TagPostProvider"
import { TagProvider } from "./Tags/TagProvider"
import { TagForm } from "./Tags/TagForm"
import { TagList } from "./Tags/TagList"
import { UserProvider } from "./Profiles/UserProvider"
import { UserDetail } from "./Profiles/UserDetail"
import { CategoryProvider } from "./Categories/CategoryProvider";
import { CategoryForm } from "./Categories/CategoryForm";
import { CategoryList } from "./Categories/CategoryList";
import { ReactionProvider } from "./Reactions/ReactionProvider";
import {ReactionList} from "./Reactions/ReactionList";
import {PostDetails} from "./Posts/PostDetail";

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
                <Route path="/posts/:postId(\d+)" render={
                            props => <PostDetails {...props} />
                        } />
          </TagProvider>
        </TagPostProvider>
      </CategoryProvider>
      <ReactionProvider>
        <Route exact path = "/home">
        <ReactionList />
        </Route>
        
      </ReactionProvider>
   
    </PostProvider>
    {/*********************************** */}
    <UserProvider>
      <Route exact path="/profile" render={ 
          props => <UserDetail {...props}/>} />
    </UserProvider>
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
      {/* I think the Route below is unnecessary? -eh */}
      <Route exact path="/newCategory" render={
        (props) => <CategoryForm {...props} />} />
      <Route
        exact path="/categories" render={
          (props) => <CategoryList {...props} />} />
      <Route exact path="/categories/create" render={
        (props) => <CategoryForm {...props} />} />
    </CategoryProvider>
  </>
  );
};
