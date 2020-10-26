import React, { useContext, useEffect, useState } from "react";
import { PostList } from "../Posts/PostList";
import { PostContext } from "../Posts/PostProvider";
import { CategoryContext } from "../Categories/CategoryProvider";
import { DeleteItem } from "../utils/DeleteItem";


export const HomeList = (props) => {
  const {
    categories,
    getCategories,
  } = useContext(CategoryContext);

  const { getPosts, posts, setPosts } = useContext(PostContext);
  const [categorySelected, setCategorySelected] = useState(0);

  useEffect(() => {
    getPosts().then(getCategories());
  }, []);

  useEffect(() => {
    setPosts(posts);
  }, [posts]);

  const filterAllPosts = (event) => {
    const filteredPostsByCategory = posts.filter(
      (post) => post.category_id === parseInt(event.target.value)
    );
    setPosts(filteredPostsByCategory);
    setCategorySelected(parseInt(event.target.value));  
  };

  return (
    <>
      {categories.map((category) => {
        return (
          <div key={category.id}>
            <input
              type="radio"
              value={category.id}
              name="categories"
              checked={categorySelected === category.id}
              onClick={filterAllPosts}
            />{" "}
            {category.type}
          </div>
        );
      })}

      <div>
        <button
          onClick={() => {
            getPosts().then(setPosts(posts));
            setCategorySelected("");
          }}
        >
          Clear Filter
        </button>
      </div>
      <h1>Dashboard</h1>
      <PostList {...props} />
    </>
  );
};
