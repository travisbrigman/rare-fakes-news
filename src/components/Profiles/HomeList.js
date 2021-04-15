//list of posts that renders on /home and lets user filter by category, tag, and user
import React, { useContext, useEffect, useState } from "react";
import { PostList } from "../Posts/PostList";
import { PostContext } from "../Posts/PostProvider";
import { CategoryContext } from "../Categories/CategoryProvider";
import { TagContext } from "../Tags/TagProvider";
import { UserContext } from "../Profiles/UserProvider";
import { TagPostContext } from "../Tags/TagPostProvider";
import { Box, Button, Heading, RadioButton } from "grommet";

export const HomeList = (props) => {
  const { categories, getCategories } = useContext(CategoryContext);
  const { getPosts, posts, setPosts, getPostByCat, getPostByUser } = useContext(
    PostContext
  );
  const { tags, getTags } = useContext(TagContext);
  const { users, getUsers } = useContext(UserContext);
  const { TagPosts, getPostTagsByTags, getTagPosts, setTagPosts } = useContext(
    TagPostContext
  );

  const [arrOfPosts, setArrOfPosts] = useState([]);

  //state variable that tracks what category is selected in the radio buttons
  const [categorySelected, setCategorySelected] = useState(0);
  const [tagSelected, setTagSelected] = useState(0);
  const [userSelected, setUserSelected] = useState(0);

  //useEffects to fetch posts, categories, users
  useEffect(() => {
    getPosts()
      .then(getCategories)
      .then(getTags)
      .then(getUsers)
      .then(getTagPosts);
  }, []);

  useEffect(() => {
    setArrOfPosts(posts);
  }, [posts]);

  useEffect(() => {
    if (tagSelected !== 0) {
      const newPostArray = TagPosts.map((TagPost) => {
        return TagPost.post;
      });
      setArrOfPosts(newPostArray);
    }
  }, [TagPosts]);

  //triggered when a user clicks the various category radio buttons
  //fires off a database call that fetches posts by the category id associated with them
  //changes the state of the categorySelected state variable
  const filterAllPostsByCat = (catId) => {
    setCategorySelected(catId);
    getPostByCat(catId).then(setArrOfPosts);
  };

  const filterAllPostsByTag = (tagId) => {
    setTagSelected(tagId); //displays radio button as "selected"
    getPostTagsByTags(tagId).then((res) => {
      return setTagPosts(res);
    });
  };

  //fetches posts by user id, changes state variable of userSelected
  const filterAllPostsByUser = (userId) => {
    setUserSelected(userId);
    getPostByUser(userId).then(setArrOfPosts);
  };

  //resets the state variables tracking the radio buttons
  const clearFilterButton = () => {
    return (
      <Button
        label="Clear Filter"
        onClick={() => {
          setCategorySelected("");
          setTagSelected("");
          setUserSelected("");
          getPosts().then(setPosts(posts));
        }}
      />
    );
  };

  return (
    <Box direction="row-responsive" gap="medium">
      <Box className="threeFilterContainer" direction="column" justify="start">
      <Box width="small" margin="small">
          {clearFilterButton()}
        </Box>
        <Box
          background="background-contrast"
          direction="column"
          margin="small"
          pad="xsmall"
          elevation="small"
        >
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
        </Box>

        <Box
          background="background-contrast"
          direction="column"
          margin="small"
          pad="xsmall"
          elevation="small"
        >
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
        </Box>

        <Box
          background="background-contrast"
          direction="column"
          margin="small"
          pad="xsmall"
          elevation="small"
        >
          <Heading level="4">Filter by User</Heading>
          {users.map((user) => {
            return (
              <RadioButton
                key={user.id}
                label={user.username}
                name="users"
                value={user.id}
                checked={userSelected === user.id}
                onChange={() => {
                  filterAllPostsByUser(user.id);
                }}
              />
            );
          })}
        </Box>

      </Box>
      <Box>
        <PostList arrOfPosts={arrOfPosts} />
      </Box>
    </Box>
  );
};
