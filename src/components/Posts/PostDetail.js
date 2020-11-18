//displays details of a post, lets use add reactions (maximum one of each) to post, lets user edit post if they are the author, or see author's profile if it was written by another user
import React, { useContext, useEffect, useState, useRef } from "react";
import { PostContext } from "./PostProvider";
import { ReactionList } from "../Reactions/ReactionList";
import { Link, useHistory } from "react-router-dom";
import { DeleteTagItem } from "../utils/DeleteTagItem";
import { TagPostContext } from "../Tags/TagPostProvider";
import { TagContext } from "../Tags/TagProvider";
import { UserContext } from "../Profiles/UserProvider"
import { DeleteItem } from "../utils/DeleteItem";

export const PostDetails = (props) => {
  const { getPostById, post, setPost, getTagsByPost, postTags, deletePost, posts, getPostByUser } = useContext(PostContext);
  const { tag, tags, getTags } = useContext(TagContext)
  const { TagPosts, createTagPost } = useContext(TagPostContext);
  const { getCurrentUser } = useContext(UserContext);
  

  //state variable and variables needed to make tag management work
  const [ selectedTagPostId, setSelectedTagPostId ] = useState(0);
  const [ user, setCurrentUser ] = useState({});
  const tagPostId = useRef(null);
  const postId = parseInt(props.match.params.postId);

  //gets a post by the post ID and gets the tags associated with that post
  useEffect(() => {
    getTags()
    getPostById(postId).then(setPost);
    getTagsByPost(postId);
    getCurrentUser().then(setCurrentUser)
  }, [TagPosts]);


  //takes what is selected in the tag management dropdown and sets the state variable with that value
  const handleChange = (e) => {
    setSelectedTagPostId(parseInt(e.target.value));
  };


  //filters tags that haven't been selected yet to be options for adding

  const [filteredTags, setFilteredTags] = useState([])
  useEffect(() => {
    const tagIDs = tags.map(t => t.id)
    const postTagIDs = postTags.map(pt => pt.id)
    const diffIDs = tagIDs.filter(t => !postTagIDs.includes(t))
    const filteredTagObjs = diffIDs.map(id => {
        return tags.find(t => t.id === id)
        })
    setFilteredTags(filteredTagObjs)
  },[postTags])

  //state variable and functions to show/hide the tag management feature
  const [open, setOpen] = useState();
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(undefined);

  //IDs of tags to be added get stored in this variable
  const [stateTagIDArr, setTagIDArr] = useState([])

  const handleAddTags = (browserEvent) => {  
    const stateCopyID = stateTagIDArr.slice()
    let newTagItem = parseInt(browserEvent.target.value)
     stateCopyID.push(newTagItem)
    setTagIDArr(stateCopyID)    
}



  return (
    <>
      {/* Post Detail JSX */}
      <section className="container__card">
        <section className="container__cardContent">  
          <section className="container__cardContentLeft"></section>        
          <h3 className="post__title">{post.title}</h3>

          {post.created_by_current_user 
          ? (
              <section className="container__cardContentTop">              
                <button onClick={() => props.history.push(`/posts/edit/${post.id}`)}>
                  EDIT
                </button>

                {post.user.id === user.id ? <DeleteItem postId= {post.id}/> : <></>}
              </section>
          )
          : (``)
          }
          
          <img className="post__image" src={post.image_url} style={{width: `500px`}} alt="article"></img>
          <div className="post__content">{post.content}</div>
          <div key={post.id} className="post_date">
            Published: {new Date(post.publication_date).toLocaleDateString("en-US")}
          </div>

          <div>
            {post.created_by_current_user 
            ? (
              <section className="container__cardContentBottom">
                <div className="post_author">
                  By: {post.user.user.first_name} (you)
                </div>
              </section>
            ) 
            : (
            <section className="container__cardContentBottom">
                <div className="post_author">
                  {"By: "} 
                  <Link to={{ pathname: `/profiles/${post.user.id}` }}>
                      {post.user.user.first_name}
                  </Link>
                </div>
                
            </section>
            )
            }
          </div>
        </section>

        <section className="container__cardContentRight">          
          <div>
            {postTags.map((postTag) => {
              return  postTag.tag.label ? <div className="displayedTag"># {postTag.tag.label}</div>  : null              
            })}
          </div>
        </section>

      </section>
      <ReactionList {...props} />{/*Renders ReactionList*/}
    </>
  );
};
