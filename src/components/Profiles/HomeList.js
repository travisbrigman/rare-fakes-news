//list of posts that renders on /home and lets user filter by category, tag, and user
import React, { useContext, useEffect, useState } from "react";
import { PostList } from "../Posts/PostList";
import { PostContext } from "../Posts/PostProvider";
import { CategoryContext } from "../Categories/CategoryProvider";
import { UserContext } from "../Profiles/UserProvider"

export const HomeList = (props) => {
  const {
    categories,
    getCategories,
  } = useContext(CategoryContext);

  const { getPosts, posts, setPosts, getPostByCat, getPostByUser } = useContext(PostContext);
  
  //state variable that tracks what category is selected in the radio buttons
  const [categorySelected, setCategorySelected] = useState(0);

  const { users, getUsers } = useContext(UserContext)
  const [userSelected, setUserSelected] = useState(0);

  //useEffects to fetch posts, categories, users
  useEffect(() => {
    getPosts().then(getCategories());
    getUsers()
  }, []);

  useEffect(() => {
    setPosts(posts);
  }, [posts]);

//triggered when a user clicks the various category radio buttons
//fires off a database call that fetches posts by the category id associated with them
//changes the state of the categorySelected state variable
  const filterAllPostsByCat = (catId) => {
    getPostByCat(catId)
    setCategorySelected(catId)
  };

  //fetches posts by user id, changes state variable of userSelected
  const filterAllPostsByUser = (userId) => {
    getPostByUser(userId)
    setUserSelected(userId)
  }

  //resets the state variables tracking the radio buttons
  const clearFilterButton = () => {
    return (
      <button
        onClick={() => {
          getPosts().then(setPosts(posts));
          setCategorySelected("");
          setUserSelected("")
        }}
      >
        Clear Filter
      </button>
    )
  }


  return (
    <>
      <div className="container--filter">
        <h3>Filter by Category</h3>
        {categories.map((category) => {
          return (
            <div key={category.id}>
              <input
                type="radio"
                value={category.id}
                name="categories"
                checked={categorySelected === category.id}
                onClick={() => { filterAllPostsByCat(category.id) }}
              />{" "}
              {category.type}
            </div>
          );
        })}

        <div>
          {clearFilterButton()}
        </div>
      </div>

      <div className="container--filter">
        <h3>Filter by User</h3>
        {users.map((user) => {
          return (
            <div key={user.id}>
              <input
                type="radio"
                value={user.id}
                name="users"
                checked={userSelected === user.id}
                onClick={() => { filterAllPostsByUser(user.id) }}
              />{" "}
              {user.display_name}
            </div>
          );
        })}

        <div>
          {clearFilterButton()}
        </div>
      </div>


      <h1>Dashboard</h1>
      <PostList {...props} />
    </>
  );
};
