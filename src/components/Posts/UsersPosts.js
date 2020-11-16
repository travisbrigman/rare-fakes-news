//shows user their own posts in MyPosts view, allows them to delete a post
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PostContext } from "./PostProvider";
import { UserContext } from "../Profiles/UserProvider"
import { DeleteItem } from "../utils/DeleteItem";

export const UsersPosts = (props) => {
  const { posts, getPostByUser } = useContext(PostContext);
  const { getCurrentUser } = useContext(UserContext)

  const [usersPosts, setUsersPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState({})

  // useEffect(() => {
  //    getPosts()
  // }, [])

  useEffect(() => {
    getCurrentUser()
      .then(setCurrentUser)
      .then(() => {
        getPostByUser(1)
      })
      .then(setUsersPosts)

  }, []);

  console.log(currentUser.id)
  console.log(usersPosts)

  // useEffect(() => {

  //   const filteredPostsByUser = posts.filter(
  //     (post) => post.created_by_current_user == true 

  //   );
  //   setUsersPosts(filteredPostsByUser);
  // }, [posts]);

  return (
    <>
      <h2>My Posts</h2>
      {/* {usersPosts.map((p) => {
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
      }).reverse()} */}
    </>
  );
};
