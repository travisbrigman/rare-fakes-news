//list of posts that renders on /home and lets user filter by category, tag, and user
import React, { useContext, useEffect, useState } from "react";
import { PostList } from "../Posts/PostList";
import { PostContext } from "../Posts/PostProvider";
import { CategoryContext } from "../Categories/CategoryProvider";
import { TagContext } from "../Tags/TagProvider";
import { UserContext } from "../Profiles/UserProvider";
import { Box, Button, Heading, RadioButton } from "grommet";

export const HomeList = (props) => {
  const { categories, getCategories } = useContext(CategoryContext);
  const {
    getPosts,
    posts,
    setPosts,
    getPostByCat,
    getPostByUser,
    getPostByTag,
  } = useContext(PostContext);
  const { tags, getTags } = useContext(TagContext);
  const { users, getUsers } = useContext(UserContext);

  //state variable that tracks what category is selected in the radio buttons
  const [categorySelected, setCategorySelected] = useState(0);
  const [tagSelected, setTagSelected] = useState(0);

  const [userSelected, setUserSelected] = useState(0);

  //useEffects to fetch posts, categories, users
  useEffect(() => {
    getPosts().then(getCategories());
    getTags();
    getUsers();
  }, []);

  useEffect(() => {
    setPosts(posts);
  }, [posts]);

  //triggered when a user clicks the various category radio buttons
  //fires off a database call that fetches posts by the category id associated with them
  //changes the state of the categorySelected state variable
  const filterAllPostsByCat = (catId) => {
    getPostByCat(catId);
    setCategorySelected(catId);
  };

  const filterAllPostsByTag = (tagId) => {
    getPostByTag(tagId);
    setTagSelected(tagId); //displays radio button as "selected"
  };

  //fetches posts by user id, changes state variable of userSelected
  const filterAllPostsByUser = (userId) => {
    getPostByUser(userId);
    setUserSelected(userId);
  };

  //resets the state variables tracking the radio buttons
  const clearFilterButton = () => {
    return (
      <Button
        label="Clear Filter"
        onClick={() => {
          getPosts().then(setPosts(posts));
          setCategorySelected("");
          setTagSelected("");
          setUserSelected("");
        }}
      />
    );
  };

  return (
    <>
      <Box className="threeFilterContainer" direction="row-responsive">
        <Box className="container--filters" direction="column">
          <Heading level="4">Filter by Category</Heading>
          {categories.map((category) => {
            return (
              <RadioButton
                key={category.id}
                label={category.label}
                name="categories"
                value={category.id}
                checked={categorySelected === category.id}
                onChange={() => {
                  filterAllPostsByCat(category.id);
                }}
              />
            );
          })}
          <Box margin="small">{clearFilterButton()}</Box>
        </Box>

        <Box className="container--filters" direction="column">
          <Heading level="4">Filter by Tag</Heading>
          {tags.map((tag) => {
            return (
              <RadioButton
                key={tag.id}
                label={tag.label}
                name="tags"
                value={tag.id}
                checked={tagSelected === tag.id}
                onChange={() => {
                  filterAllPostsByTag(tag.id);
                }}
              />
            );
          })}
          <Box margin="small">{clearFilterButton()}</Box>
        </Box>

        <Box className="container--filters" direction="column">
          <Heading level="4">Filter by User</Heading>
          {users.map((user) => {
            return (
              <RadioButton
                key={user.id}
                label={user.user.username}
                name="users"
                value={user.id}
                checked={userSelected === user.id}
                onChange={() => {
                  filterAllPostsByUser(user.id);
                }}
              />
            );
          })}
          <Box margin="small">{clearFilterButton()}</Box>
        </Box>
      </Box>

      <h1 style={{ margin: "2rem 0rem 2rem 0rem" }}>Dashboard</h1>
      <PostList {...props} />
    </>
  );
};
