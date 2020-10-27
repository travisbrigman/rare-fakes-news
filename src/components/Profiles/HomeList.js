import React, { useContext, useEffect, useState } from "react";
import { PostList } from "../Posts/PostList";
import { PostContext } from "../Posts/PostProvider";
import { CategoryContext } from "../Categories/CategoryProvider";
import { TagContext } from "../Tags/TagProvider";
import { TagPostContext } from "../TagPosts/TagPostProvider";

export const HomeList = (props) => {
  const {
    categories,
    getCategories,
  } = useContext(CategoryContext);

  const { getPosts, posts, setPosts, getPostByCat } = useContext(PostContext);
  const { tags, getTags } = useContext(TagContext);
  const { tagPosts, setTagPosts, getTagPosts, getTagPostByTag } = useContext(TagPostContext);
  const [categorySelected, setCategorySelected] = useState(0);
  const [tagSelected, setTagSelected] = useState(0);

  useEffect(() => {
    getPosts().then(getCategories()).then(getTags()).then(getTagPosts());
  }, []);

  useEffect(() => {
    setPosts(posts);
  }, [posts]);

  useEffect(() => {
    console.log(tagPosts, "tagPosts>>")
  }, [tagPosts]);

  const filterAllPostsByCat = (catId) => {
    getPostByCat(catId)
    setCategorySelected(catId) 
  };
  

  // when a tag filter is selected, invokes function to filter All Posts
  useEffect(() => {
    filterAllPostsByTag(tagSelected)
  }, [tagSelected]);
  
  // when user selects a Tag to filter by,...
  const filterAllPostsByTag = (tagId) => {
    getTagPostByTag(tagId)
    .then(console.log(tagId,"tagId"))
    .then(console.log(tagPosts,"tagPosts>>"))
    
    // setTagSelected(tagId)
    // getPostByTag(tagId)
  }

  // refactored "Clear Filter" button as a function to be used to reset Category AND Tag filters
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
                onClick={()=>{filterAllPostsByCat(category.id)}}
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
