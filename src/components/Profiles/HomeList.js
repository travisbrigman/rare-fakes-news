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
  const [tagSelected, setTagSelected] = useState(0);

  useEffect(() => {
    getPosts().then(getCategories()).then(getTags);
  }, []);

  useEffect(() => {
    setPosts(posts);
  }, [posts]);

  
  const filterAllPostsByCat = (catId) => {
    getPostByCat(catId)
    //setPosts(filteredPostsByCategory)
    setCategorySelected(catId) 
    console.log(posts)
  };

  const filterAllPostsByTag = (tagId) => {
    // getPostByTag(tagId)
    setTagSelected(tagId)
  }

  const clearFilterButton = () => {
    return (
      <button
        onClick={() => {
          getPosts().then(setPosts(posts));
          setCategorySelected("");
          setTagSelected("");
        }}
      >
        Clear Filter
      </button>
    )
  }

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
              onClick={()=>{filterAllPostsByCat(category.id)}}
            />{" "}
            {category.type}
          </div>
        );
      })}


      <div>
        {clearFilterButton()}
      </div>

      
      <div>
        <h3>Filter by Tag</h3>
        {tags.map((tag) => {
          return (
            <div>
              <input
              type="radio"
              value={tag.id}
              name="tags"
              checked={tagSelected === tag.id}
              onClick={()=>{filterAllPostsByTag(tag.id)}}
            />{" "}
            #{tag.tag}
            </div>
          )
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
