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

  const { getPosts, posts, setPosts, getPostsByCat } = useContext(PostContext);
  const [categorySelected, setCategorySelected] = useState(0);

  useEffect(() => {
    getPosts().then(getCategories());
  }, []);

  useEffect(() => {
    setPosts(posts);
  }, [posts]);

  const filterAllPosts = (catId) => {
    const filteredPostsByCategory = getPostsByCat(catId)
    setPosts(filteredPostsByCategory);
    setCategorySelected(catId);  
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
              onClick={filterAllPosts(category.id)}
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
