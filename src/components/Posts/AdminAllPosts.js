// import React, { useContext, useEffect } from "react"
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PostContext } from "./PostProvider";
import { UserContext } from "../Profiles/UserProvider";

export const AdminAllPosts = () => {
  const { approvePost, posts, getPosts } = useContext(PostContext);
  console.log(posts);

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      {posts !== []
        ? posts.map((post) => {
            return (
              <>
                <div>
                  {post.title} | {post.publication_date} | {post.category.label}{" "}
                  | {post.user.user.first_name}
                </div>
                <div>{ !post.approved && <button onClick={() => {approvePost(post.id)}}>APPROVE</button>}</div>
              </>
            );
          })
        : null}
    </>
  );
};
