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
import { UsersPosts } from "./Posts/UsersPosts"
import { ReactionProvider } from "./Reactions/ReactionProvider";
import { ReactionList } from "./Reactions/ReactionList";
import { PostDetails } from "./Posts/PostDetail";
import { SubscriptionProvider } from "./Subscriptions/SubscriptionProvider"

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
            <UserProvider>
              <SubscriptionProvider>
                <Route exact path="/home" render={
                  props => <HomeList {...props} />} />
                <Route exact path="/posts/create" render={
                  props => <PostForm {...props} />} />
                <Route exact path="/myposts" render={
                  (props) => <UsersPosts {...props} />} />
                <Route path="/posts/:postId(\d+)" render={
                  props => <PostDetails {...props} />
                } />
                <Route path="/profiles/:userId(\d+)" render={
                  props => <UserDetail {...props} />
                } />
              </SubscriptionProvider>
            </UserProvider>
          </TagProvider>
        </TagPostProvider>
      </CategoryProvider>
      <ReactionProvider>
        <Route exact path="/home">
          <ReactionList />
        </Route>
      </ReactionProvider>
    </PostProvider>
    {/*********************************** */}
    <UserProvider>
      <SubscriptionProvider>
        <Route exact path="/profile" render={
          props => <UserDetail {...props} />} />
      </SubscriptionProvider>
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
      <Route
        exact path="/categories" render={
          (props) => <CategoryList {...props} />} />
      <Route exact path="/categories/create" render={
        (props) => <CategoryForm {...props} />} />
    </CategoryProvider>
  </>
  );
};
