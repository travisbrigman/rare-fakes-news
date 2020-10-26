import React, { useContext, useEffect, useState } from "react";
import { PostList } from "../Posts/PostList";
import { PostContext } from "../Posts/PostProvider";
import { CategoryContext } from "../Categories/CategoryProvider";
import { TagContext } from "../Tags/TagProvider";

export const HomeList = (props) => {
  const {
    categories,
    getCategories,
  } = useContext(CategoryContext);

  const { getPosts, posts, setPosts, getPostByCat } = useContext(PostContext);
  const { tags, getTags } = useContext(TagContext)
  const [categorySelected, setCategorySelected] = useState(0);

  useEffect(() => {
    getPosts().then(getCategories()).then(getTags);
  }, []);

  useEffect(() => {
    setPosts(posts);
  }, [posts]);

  
  const filterAllPosts = (catId) => {
    getPostByCat(catId)
    //setPosts(filteredPostsByCategory)
    setCategorySelected(catId) 
    console.log(posts)
  };

  // const deleteButton = () => {}

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
              onClick={()=>{filterAllPosts(category.id)}}
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

      <div>
        <h3>Filter by Tag</h3>
        {tags.map((tag) => {
          return (
            <div>
              <input
              type="radio"
              value={tag.id}
              name="categories"
              // checked={tagSelected === tag.id}
              // onClick={()=>{filterAllPostsByTag(tag.id)}}
            />{" "}
            #{tag.tag}
            </div>
          )
        })}

      </div>


      <h1>Dashboard</h1>
      <PostList {...props} />
    </>
  );
  
};
