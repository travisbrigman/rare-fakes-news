import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PostContext } from "./PostProvider";
import { UserContext } from "../Profiles/UserProvider"

export const UsersPosts = (props) => {
  const { getPosts, posts, setPosts } = useContext(PostContext);
  const { loggedInUser } = useContext(UserContext);
  
  const [usersPosts, setUsersPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  

  useEffect(() => {
    const filteredPostsByUser = posts.filter(
      (post) => post.user_id === loggedInUser
    );
    setUsersPosts(filteredPostsByUser);
  }, [posts, loggedInUser]);

  return (
    <>
      <h2>My Posts</h2>
      {usersPosts.map((p) => {
        return (
          <div key={p.id}>
            <p>
              <strong>{p.title}</strong>
            </p>
            <p>{p.user.display_name}</p>
            <p>{p.category.type}</p>
          </div>
        );
      }).reverse()}
    </>
  );
};
