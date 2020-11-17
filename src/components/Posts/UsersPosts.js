//shows user their own posts in MyPosts view, allows them to delete a post
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PostContext } from "./PostProvider";
import { UserContext } from "../Profiles/UserProvider"

<<<<<<< HEAD
export const UsersPosts = (props) => {
  const { posts, getPostByUser } = useContext(PostContext);
  const { loggedInUser } = useContext(UserContext);
  console.log(posts)
=======

export const UsersPosts = () => {
  const { getPostByUser} = useContext(PostContext);
  const { getCurrentUser, currentUser, setCurrentUser } = useContext(UserContext)
>>>>>>> 12a67c1a7a09d52838bdc9807dbdca4021cf144d

  const [usersPosts, setUsersPosts] = useState([]);
 

  useEffect(() => {
    getCurrentUser()
      .then(res => {
        setCurrentUser(res)
        const user = res
        return user
      })
      .then((user) => 
        getPostByUser(user.id))

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
