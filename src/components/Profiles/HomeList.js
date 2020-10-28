import React, { useContext, useEffect, useState } from "react"
import { PostList } from "../Posts/PostList"
import { PostContext } from "../Posts/PostProvider"
import { CategoryContext } from "../Categories/CategoryProvider"
import { TagContext } from "../Tags/TagProvider"
import { UserContext } from "../Profiles/UserProvider"

export const HomeList = (props) => {
  const {
    categories,
    getCategories,
  } = useContext(CategoryContext)

  const { getPosts, posts, setPosts, getPostByCat, getPostByUser, getPostByTag } = useContext(PostContext)
  const { tags, getTags } = useContext(TagContext)
  const [categorySelected, setCategorySelected] = useState(0)
  const [tagSelected, setTagSelected] = useState(0)

  const { users, getUsers } = useContext(UserContext)
  const [userSelected, setUserSelected] = useState(0)

  useEffect(() => {
    getPosts().then(getCategories())
    getTags()
    getUsers()
  }, [])

  useEffect(() => {
    setPosts(posts)
  }, [posts])


  const filterAllPostsByCat = (catId) => {
    getPostByCat(catId)
    setCategorySelected(catId)
  }
  
   
  const filterAllPostsByTag = (tagId) => {
    getPostByTag(tagId)
    setTagSelected(tagId)   //displays radio button as "selected"
  }

  
  const filterAllPostsByUser = (userId) => {
    getPostByUser(userId)
    setUserSelected(userId)
  }

const clearFilterButton = () => {
  return (
    <button
      onClick={() => {
        getPosts().then(setPosts(posts))
        setCategorySelected("")
        setTagSelected("")
        setUserSelected("")
      }}
    >
      Clear Filter
    </button>
  )}


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
          )
        })}

        <div>{clearFilterButton()}</div>
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
              onClick={() => { filterAllPostsByTag(tag.id) }}
            />{" "}
            #{tag.tag}
            </div>
          )
        })}
      
        <div>{clearFilterButton()}</div>
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
          )
        })}
      
        <div>{clearFilterButton()}</div>
      </div>


      <h1>Dashboard</h1>
      <PostList {...props} />
    </>
  )
  
}
