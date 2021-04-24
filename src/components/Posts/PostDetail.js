/* displays details of a post, lets user add reactions (maximum one of each) to post, 
lets user edit post if they are the author, or see author's profile if it was written by another user */
import React, { useContext, useEffect, useState, useRef } from "react";
import { PostContext } from "./PostProvider";
import { DeleteItemContext } from "../utils/DeleteItem";
import { ReactionList } from "../Reactions/ReactionList";
import { Link } from "react-router-dom";
import { Button, Box, Heading, Image, Text, Menu, Anchor } from "grommet";
import { Edit, More, Trash } from "grommet-icons";
import { TagPostContext } from "../Tags/TagPostProvider";
import { TagContext } from "../Tags/TagProvider";
import { DeleteItem } from "../utils/DeleteItem";

export const PostDetails = (props) => {
  const { getPostById, post, setPost, getTagsByPost, postTags } = useContext(
    PostContext
  );
  console.log(postTags);
  const { tag, tags, getTags } = useContext(TagContext);
  const { TagPosts } = useContext(TagPostContext);

  //state variable and functions that change state of the state variable
  const [open, setOpen] = useState();
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(undefined);

  //state variable and variables needed to make tag management work
  const [selectedTagPostId, setSelectedTagPostId] = useState(0);
  const [filteredTags, setFilteredTags] = useState([]);
  const [stateTagIDArr, setTagIDArr] = useState([]);

  //other variables defined through useRef and the URL
  const tagPostId = useRef(null);
  const postId = props.match.params.postId

  //gets a post by the post ID and gets the tags associated with that post
  useEffect(() => {
    getTags();
    getPostById(postId).then(setPost);
    getTagsByPost(postId);
  }, [TagPosts]);

  useEffect(() => {
    //filters tags that haven't been selected yet to be options for adding
    const tagIDs = tags.map((t) => t.id);
    const postTagIDs = postTags.map((pt) => pt.id);
    const diffIDs = tagIDs.filter((t) => !postTagIDs.includes(t));
    const filteredTagObjs = diffIDs.map((id) => {
      return tags.find((t) => t.id === id);
    });
    setFilteredTags(filteredTagObjs);
  }, [postTags]);

  //state variable and functions to show/hide the tag management feature
  // const [open, setOpen] = useState();

  //takes what is selected in the tag management dropdown and sets the state variable with that value
  const handleChange = (e) => {
    setSelectedTagPostId(e.target.value);
  };

  const handleAddTags = (browserEvent) => {
    const stateCopyID = stateTagIDArr.slice();
    let newTagItem = parseInt(browserEvent.target.value);
    stateCopyID.push(newTagItem);
    //IDs of tags to be added get stored in this variable
    setTagIDArr(stateCopyID);
  };
  

  return (
    <>
    <DeleteItem open={open} onClose={onClose} postId={post.id}/>
      {/* Post Detail JSX */}
      <Box className="container__card">
        <Box className="container__cardContent">
          <Box direction="row-responsive">
            <Heading level="2" className="post__title">
              {post.title}
            </Heading>
            {post.createdByCurrentUser ? (
              <Box width="xsmall">
                <Menu
                  icon={<More />}
                  hoverIndicator
                  alignSelf="center"
                  size="small"
                  items={[
                    {
                      icon: (
                        <Box>
                          <Edit />
                        </Box>
                      ),
                      onClick: () =>
                        props.history.push(`/posts/edit/${post.id}`),
                    },
                    {
                      icon: (
                        <Box>
                          <Trash />
                        </Box>
                      ),
                      onClick: () => onOpen(),
                    },
                  ]}
                />
              </Box>
            ) : null}
          </Box>

          {post.category == null ? "" : <Text >{post.category.label}</Text>}

          <Box size="small" height="small" animation="fadeIn" >
            <Image
              className="post__image"
              src={post.imageUrl}
              fit="cover"
              fill
              alt="article"
            ></Image>
          </Box>
          <ReactionList {...props} />
          {/*Renders ReactionList*/}
          <Box direction="row">
            <Box direction="row" alignContent="center">
              <Text
                size="small"
                color="xweak"
                margin="small"
                className="post_date"
              >
                Published:{" "}
                {new Date(post.publicationDate).toLocaleDateString("en-US")}
              </Text>

              {/* If current user did not write the post, show the author name with a link to their profile*/}
              {post.createdByCurrentUser ? (
                <Text
                  size="small"
                  color="weak"
                  margin="small"
                  className="post_author"
                >
                  By: {post.author.username} (you)
                </Text>
              ) : ( 
                <Text
                  size="small"
                  color="text-weak"
                  margin="small"
                  className="post_author"
                >
                  {"By: "}
                  <Anchor color="text-weak" as={Link} label={post.author.username} to={{ pathname: `/profiles/${post.author.id}` }}/>
                  <Link to={{ pathname: `/profiles/${post.author.id}` }}>
                    {post.author.username}
                  </Link>
                </Text>
              )} 
            </Box>

            <Box direction="row"  gap="small">
              {postTags.map((postTag) => {
                return postTag.tag.label ? (
                  <Text size="small" color="brand" margin="small" className="displayedTag">
                    # {postTag.tag.label}
                  </Text>
                ) : null;
              })}
            </Box>
          </Box>
        </Box>

        <Text className="post__content">{post.content}</Text>
      </Box>
    </>
  );
};
