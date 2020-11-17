//shows user their own posts in MyPosts view, allows them to delete a post
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PostContext } from "./PostProvider";
import { UserContext } from "../Profiles/UserProvider"


export const UsersPosts = () => {
  const { getPostByUser } = useContext(PostContext);
  const { getCurrentUser } = useContext(UserContext)

  const [usersPosts, setUsersPosts] = useState([]);
 
  useEffect(() => {
    getCurrentUser()
    //returns res.json() that is immediately passed to the next .then()
    //res.json() is the current user object
      .then((user) => getPostByUser(user.id))
      .then(setUsersPosts)
  }, [])

  return (
    <>
      <h2>My Posts</h2>
      {usersPosts.map((p) => {
        return (
          <div key={p.id} className="container__card">
            <p>
              <Link to={{ pathname: `posts/${p.id}` }}>
                <strong>{p.title}</strong>
              </Link>
            </p>
            <p>{p.user.user.first_name}</p>
            <p>{p.category.label}</p>
          </div>
        );
      }).reverse()}
    </>
  );
};
