import React, { useContext, useEffect, useState } from "react"
import { PostList } from "../Posts/PostList"
import { PostContext } from "../Posts/PostProvider"
import { CategoryContext } from "../Categories/CategoryProvider"
import { TagContext } from "../Tags/TagProvider"
import { TagPostContext } from "../TagPosts/TagPostProvider"
import { UserContext } from "../Profiles/UserProvider"

export const HomeList = (props) => {
  const {
    categories,
    getCategories,
  } = useContext(CategoryContext)

  const { getPosts, posts, setPosts, getPostByCat, getPostByUser, getPostById } = useContext(PostContext)
  const { tags, getTags } = useContext(TagContext)
  const { tagPosts, getTagPosts, getTagPostByTag } = useContext(TagPostContext)
  const [categorySelected, setCategorySelected] = useState(0)
  const [tagSelected, setTagSelected] = useState(0)

  const { users, getUsers } = useContext(UserContext)
  const [userSelected, setUserSelected] = useState(0)

  useEffect(() => {
    getPosts().then(getCategories())
    getTags()
    getTagPosts()
    getUsers()
  }, [])

  useEffect(() => {
    setPosts(posts)
  }, [posts])


  const filterAllPostsByCat = (catId) => {
    getPostByCat(catId)
    setCategorySelected(catId)
  }
  
   
  const filterTagPostsByTag = (tagId) => {
    getTagPostByTag(tagId)  //filters All TagPosts by TagId, then setTagPosts
    setTagSelected(tagId)   //displays radio button as "selected"
  }
  
  useEffect(() => {
    const selectedPostIds = tagPosts.map(tp => tp.post_id)
    const filteredPosts = posts.filter(p => p.id === 14) || {}

    // const filteredPostsArray = tagPosts.map(tp => {
    //   const postObj = posts.find(p => p.id === tp.post_id)
    // })

    let filteredPostsArray = []
    for (tp of tagPosts) { 
      posts.filter(p => p.id === tp.post_id)
      filteredPostsArray.push() 
    }

    

    setPosts(filteredPosts)

    console.log("all posts>>",posts)
    console.log("tagPosts>>",tagPosts)
    console.log("selectedPostIds>",selectedPostIds)
    console.log("filteredPosts>",filteredPosts)
    
}, [tagPosts])

  
  const filterAllPostsByUser = (userId) => {
    getPostByUser(userId)
    setUserSelected(userId)
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
          )
        })}
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
              onClick={() => { filterTagPostsByTag(tag.id) }}
            />{" "}
            #{tag.tag}
            </div>
          )
        })}
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


        <br></br>


        <div>
          <button
            onClick={() => {
              getPosts().then(setPosts(posts))
              setCategorySelected("")
              setTagSelected("")
              setUserSelected("")
            }}
          >
            Clear Filters
          </button>
        </div>
      </div>


      <h1>Dashboard</h1>
      <PostList {...props} />
    </>
  )
  
}
