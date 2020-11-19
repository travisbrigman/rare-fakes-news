//list of posts that renders on /home and lets user filter by category, tag, and user
import React, { useContext, useEffect, useState } from "react";
import { PostList } from "../Posts/PostList";
import { PostContext } from "../Posts/PostProvider";
import { CategoryContext } from "../Categories/CategoryProvider";
import { TagContext } from "../Tags/TagProvider"
import { UserContext } from "../Profiles/UserProvider"
import { TagPostContext } from "../Tags/TagPostProvider";

export const HomeList = (props) => {
  const {categories, getCategories} = useContext(CategoryContext)
  const { getPosts, posts, setPosts, getPostByCat, getPostByUser } = useContext(PostContext)
  const { tags, getTags } = useContext(TagContext)
  const { users, getUsers } = useContext(UserContext)
  const {TagPosts, getPostTagsByTags, getTagPosts, setTagPosts} = useContext(TagPostContext)

  const [arrOfPosts, setArrOfPosts] = useState([])

  //state variable that tracks what category is selected in the radio buttons
  const [categorySelected, setCategorySelected] = useState(0)
  const [tagSelected, setTagSelected] = useState(0)
  const [userSelected, setUserSelected] = useState(0)


  //useEffects to fetch posts, categories, users
  useEffect(() => {
    getPosts()
    .then(getCategories)
    .then(getTags)
    .then(getUsers)
    .then(getTagPosts)
  }, [])

  useEffect(() => {
    setArrOfPosts(posts)
  },[posts])
  
  useEffect(() => {
    if( tagSelected !== 0) {
      const newPostArray = TagPosts.map(TagPost => {
         return TagPost.post
      })
      setArrOfPosts(newPostArray)
    }
  }, [TagPosts])

//triggered when a user clicks the various category radio buttons
//fires off a database call that fetches posts by the category id associated with them
//changes the state of the categorySelected state variable
  const filterAllPostsByCat = (catId) => {
    setCategorySelected(catId)
    getPostByCat(catId)
    .then(setArrOfPosts)
  }
   
  const filterAllPostsByTag = (tagId) => {
    setTagSelected(tagId)   //displays radio button as "selected"
    getPostTagsByTags(tagId)
    .then((res) => {
      return setTagPosts(res)
    })      
  }

  //fetches posts by user id, changes state variable of userSelected
  const filterAllPostsByUser = (userId) => {
    setUserSelected(userId)
    getPostByUser(userId)
    .then(setArrOfPosts)
  }

  //resets the state variables tracking the radio buttons
  const clearFilterButton = () => {
    return (
      <button
        onClick={() => {
          setCategorySelected("")
          setTagSelected("")
          setUserSelected("")
          getPosts().then(setPosts(posts))
        }}
      >
        Clear Filter
      </button>
    )}

  return (
    <>
    <section className="threeFilterContainer" 
    style={{display: "flex", 
    }}>
      <div className="container--filters">
        <h3>Filter by Category</h3>
        {categories.map((category) => {
          return (
            <div key={category.id}>
              <input type="radio" value={category.id} name="categories"
                checked={categorySelected === category.id}
                onClick={() => { filterAllPostsByCat(category.id) }}
              />{" "}
              {category.label}
            </div>
          )
        })}
        <div>{clearFilterButton()}</div>
      </div>

      
      <div className="container--filters">
        <h3>Filter by Tag</h3>
        {tags.map((tag) => {
          return (
            <div key={`tag${tag.id}`}>
              <input
              type="radio"
              value={tag.id}
              name="tags"
              checked={tagSelected === tag.id}
              onClick={() => { filterAllPostsByTag(tag.id) }}
            />{" "}
            #{tag.label}
            </div>
          )
        })}
        <div>{clearFilterButton()}</div>
      </div>


      <div className="container--filters">
        <h3>Filter by User</h3>
        {users.map((user) => {
          return (
            <div key={`user${user.id}`}>
              <input
                type="radio"
                value={user.id}
                name="user"
                checked={userSelected === user.id}
                onClick={() => {
                  filterAllPostsByUser(user.id) }}
              />{" "}
              {user.user.username}
            </div>
          )
        })}
        <div>{clearFilterButton()}</div>
      </div>
      </section>

      <h1 style={{margin: "2rem 0rem 2rem 0rem"}}>Dashboard</h1>
      <PostList arrOfPosts={arrOfPosts} />
    </>
  )
  
}
