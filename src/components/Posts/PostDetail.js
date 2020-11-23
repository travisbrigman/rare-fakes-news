/* displays details of a post, lets user add reactions (maximum one of each) to post, 
lets user edit post if they are the author, or see author's profile if it was written by another user */
import React, { useContext, useEffect, useState, useRef } from "react";
import { PostContext } from "./PostProvider";
import { DeleteItemContext } from "../utils/DeleteItem"
import { ReactionList } from "../Reactions/ReactionList";
import { Link } from "react-router-dom";
import { DeleteTagItem } from "../utils/DeleteTagItem";
import { Button, Box, Heading, Image, Text, Menu } from "grommet"
import { Edit, More, Trash} from "grommet-icons"
import { TagPostContext } from "../Tags/TagPostProvider";
import { TagContext } from "../Tags/TagProvider";
import { DeleteItem } from "../utils/DeleteItem";

export const PostDetails = (props) => {
  const { getPostById, post, setPost, getTagsByPost, postTags} = useContext(PostContext);
  const { tag, tags, getTags } = useContext(TagContext)
  const { TagPosts } = useContext(TagPostContext);

  //state variable and variables needed to make tag management work
  const [selectedTagPostId, setSelectedTagPostId] = useState(0);
  const [filteredTags, setFilteredTags] = useState([])
  const [stateTagIDArr, setTagIDArr] = useState([])

  //other variables defined through useRef and the URL
  const tagPostId = useRef(null);
  const postId = parseInt(props.match.params.postId);

  //gets a post by the post ID and gets the tags associated with that post
  useEffect(() => {
    getTags()
    getPostById(postId).then(setPost);
    getTagsByPost(postId);
  }, [TagPosts]);

  useEffect(() => {
    //filters tags that haven't been selected yet to be options for adding
    const tagIDs = tags.map(t => t.id)
    const postTagIDs = postTags.map(pt => pt.id)
    const diffIDs = tagIDs.filter(t => !postTagIDs.includes(t))
    const filteredTagObjs = diffIDs.map(id => {
      return tags.find(t => t.id === id)
    })
    setFilteredTags(filteredTagObjs)
  }, [postTags])


  //state variable and functions to show/hide the tag management feature
  const [open, setOpen] = useState();
  
  //takes what is selected in the tag management dropdown and sets the state variable with that value
  const handleChange = (e) => {
    setSelectedTagPostId(parseInt(e.target.value));
  };
  
  const handleAddTags = (browserEvent) => {
    const stateCopyID = stateTagIDArr.slice()
    let newTagItem = parseInt(browserEvent.target.value)
    stateCopyID.push(newTagItem)
    //IDs of tags to be added get stored in this variable
    setTagIDArr(stateCopyID)

  }
      const deletePost = () => {
        console.log("deletePost");
        return <DeleteItem postId={post.id}/>
      }

  return (
    <>
      {/* Post Detail JSX */}
      <Box className="container__card">
        <Box className="container__cardContent">  
          <Heading level="3" className="post__title">{post.title}</Heading>
          {post.created_by_current_user ? 
          (
            <Box width="xsmall">
          <Menu
              icon={<More />}
              hoverIndicator
              items={[ 
                {
                icon: <Box><Edit/></Box>,
                onClick: () => props.history.push(`/posts/edit/${post.id}`),
                },
                {
                  icon: <Box><Trash/></Box>,
                  onClick: () => deletePost()
                } 
              ]}
            />
            </Box>
          ) : null
            }

          {post.category==null? "" :<Text>{post.category.label}</Text>}


          {/* if current user wrote the post, show an edit button */}
          {post.created_by_current_user 
          ? (
            <Box direction="row-responsive" className="container__cardContentTop">              
                <Button icon={<Edit />} onClick={() => props.history.push(`/posts/edit/${post.id}`)}/>
               

                {post.created_by_current_user ? <DeleteItem postId= {post.id}/> : <></>}
              </Box>
          )
          : (``)
        }

          
          <Image className="post__image" src={post.image_url} style={{width: `500px`}} alt="article"></Image>
          <ReactionList {...props} />{/*Renders ReactionList*/}
          <Text className="post__content">{post.content}</Text>
          <Text key={post.id} className="post_date">
            Published: {new Date(post.publication_date).toLocaleDateString("en-US")}
          </Text>

          {/* If current user did not write the post, show the author name with a link to their profile*/}
          <Box>
            {post.created_by_current_user 
            ? (
              <Box className="container__cardContentBottom">
                <Text className="post_author">
                  By: {post.user.user.first_name} (you)
                </Text>
              </Box>
            ) 
            : (
            <Box className="container__cardContentBottom">
                <Text className="post_author">
                  {"By: "} 
                  <Link to={{ pathname: `/profiles/${post.user.id}` }}>
                      {post.user.user.first_name}
                  </Link>
                </Text>
                
            </Box>
            )
            }
          </Box>
        </Box>

        <Box className="container__cardContentRight">          
          <Box>
            {postTags.map((postTag) => {
              return  postTag.tag.label ? <Text className="displayedTag"># {postTag.tag.label}</Text>  : null              
            })}
          </Box>
        </Box>

      </Box>
    </>
  );
};
