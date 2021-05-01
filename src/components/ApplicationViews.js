//renders each imported component depending on the URl path 
import React from "react";
import { Route } from "react-router-dom";
import { HomeList } from "./Profiles/HomeList";
import { PostProvider } from "./Posts/PostProvider";
import { PostForm } from "./Posts/PostForm";
import { TagPostProvider } from "./Tags/TagPostProvider";
import { TagProvider } from "./Tags/TagProvider";
import { TagForm } from "./Tags/TagForm";
import { TagList } from "./Tags/TagList";
import { UserProvider } from "./Profiles/UserProvider";
import { UserDetail } from "./Profiles/UserDetail";
import { CategoryProvider } from "./Categories/CategoryProvider";
import { CategoryForm } from "./Categories/CategoryForm";
import { CategoryList } from "./Categories/CategoryList";
import { UsersPosts } from "./Posts/UsersPosts";
import { ReactionProvider } from "./Reactions/ReactionProvider";
import { PostDetails } from "./Posts/PostDetail";
import { ReactionPostProvider } from "./Reactions/ReactionPostProvider";
import { SubscriptionProvider } from "./Subscriptions/SubscriptionProvider"
import { AdminAllPosts } from "./Posts/AdminAllPosts";
import { UsersList } from "./Profiles/UsersList";
import { UsersTable } from "./Profiles/UsersTable";
import { DeleteItem } from "./utils/DeleteItem";

export const ApplicationViews = (props) => {
  return (
    <>
      <main
        style={{
          margin: "5rem 2rem",
          lineHeight: "1.75rem",
        }}
      >
        {/****** HOME ***** POST FORM & DETAILS ******* MY POSTS ******* */}
        <ReactionPostProvider>
          <ReactionProvider>
            <UserProvider>
              <PostProvider>
                <CategoryProvider>
                  <TagPostProvider>
                    <TagProvider>
                      <SubscriptionProvider>
                        <Route exact path="/home"
                          render={(props) => <HomeList {...props} />}
                        />
                        <Route exact path="/posts/create"
                          render={(props) => <PostForm {...props} />}
                        />
                        <Route exact path="/posts/edit/:postId([0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12})"
                          render={(props) => <PostForm {...props} />}
                        />
                        <Route exact path="/myposts"
                          render={(props) => <UsersPosts {...props} />}
                        />
                        <Route path="/posts/:postId([0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12})"
                          render={(props) => <PostDetails {...props} />}
                        />
                        <Route path="/profiles/:userId"
                          render={props => <UserDetail {...props} />}
                        />
                        <Route path="/admin/posts"
                        render={props => <AdminAllPosts {...props} />}
                      />
                      </SubscriptionProvider>
                    </TagProvider>
                  </TagPostProvider>
                </CategoryProvider>
              </PostProvider>
            </UserProvider>
          </ReactionProvider>
        </ReactionPostProvider>

        {/************TAG MANAGEMENT****************** */}
        <TagProvider>
          <UserProvider>

            <Route exact path="/tags/create" render={(props) => {
              return <TagForm {...props} />
            }}
            />
            <Route exact path="/tags/edit/:tagId"
              render={(props) => <TagForm {...props} />}
            />
            <Route exact path="/tags" render={(props) => {
              return <TagList {...props} />
            }}
            />
          </UserProvider>
        </TagProvider>

        {/**************** MY PROFILE ******************* */}
        <UserProvider>
          <SubscriptionProvider>
            <Route exact path="/profile" render={
              props => <UserDetail {...props} />} />
              <Route exact path="/users"><UsersList /></Route>
          </SubscriptionProvider>
        </UserProvider>

      {/************** CATEGORY MANAGEMENT ************* */}
      <UserProvider>
        <CategoryProvider>
          <Route exact path="/categories" render={
            (props) => <CategoryList {...props} />} />
          <Route exact path="/categories/create" render={
            (props) => <CategoryForm {...props} />} />
          <Route exact path="/editcategory/:categoryId" render={
            (props) => <CategoryForm {...props} />} />
        </CategoryProvider>
      </UserProvider>
      </main>
    </>

  );
};
