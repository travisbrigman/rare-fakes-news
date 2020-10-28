import React, { useContext, useEffect, useState, useRef } from "react";
import { PostContext } from "./PostProvider";
import { ReactionList } from "../Reactions/ReactionList";
import { Link } from "react-router-dom";
import { DeleteTagItem } from "../utils/DeleteTagItem";
import { TagPostContext } from "../Tags/TagPostProvider";
import { TagContext } from "../Tags/TagProvider";

export const PostDetails = (props) => {
  const { getPostById, post, setPost, getTagsByPost, postTags } = useContext(PostContext);
  const {tag, tags, getTags} = useContext(TagContext)
  const { TagPosts, createTagPost } = useContext(TagPostContext);

  //state variable and variables needed to make tag management work
  const [selectedTagPostId, setSelectedTagPostId] = useState(0);
  const tagPostId = useRef(null);
  const postId = parseInt(props.match.params.postId);

  //gets a post by the post ID and gets the tags associated with that post
  useEffect(() => {
    getTags()
    getPostById(postId).then(setPost);
    getTagsByPost(postId);
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
      <section className="post">
        <h3 className="post__title">{post.title}</h3>
        <div className="post__content">{post.content}</div>
        <div className="post_date">
          Published on: {new Date(post.date).toLocaleDateString("en-US")}
        </div>

        <div>
          {post.user_id === parseInt(localStorage.getItem("rare_user_id")) ? (
            <>
              <div className="post_author">
                Author: {post.user.display_name} (you!)
              </div>
              <button
                onClick={() => props.history.push(`/posts/edit/${post.id}`)}
              >
                edit
              </button>
              <button onClick={onOpen}>Manage Post Tags</button>
            </>
          ) : (
            <Link to={{ pathname: `/profiles/${post.user.id}` }}>
              <div className="post_author">
                Author: {post.user.display_name}
              </div>
            </Link>
          )}
        </div>
        <div>
          {postTags.map((postTag) => {
            return <div>{postTag.tag}</div>;
          })}
        </div>
        {/* Tag Management JSX */}
       
        {open && (
          <>
            <select
              name="tagManagement"
              className="form-control"
              ref={tagPostId}
              onChange={handleChange}
            >
              <option value="0">Select a Tag To Delete</option>
              {postTags.map((tag) => (
                <option key={tag.id} value={tag.tagPost.id}>
                  {tag.tag}
                </option>
              ))}
            </select>
            <button onClick={onClose}>Cancel</button>
            <DeleteTagItem tagPostId={selectedTagPostId} postId={postId} />
            <select
              name="tagManagement"
              className="form-control"
              value={tag.id}
              onChange={handleAddTags}
            >
              <option value="0">Select a Tag To Add</option>
              {filteredTags.map(t => (
                <option key={t.id} value={t.id}>
                  {t.tag}
                </option>
              ))}
            </select>
            <div>
                { stateTagIDArr.length === 0 ? "" : 
                stateTagIDArr.map(t => {
                    const tagObj = tags.find(tag => tag.id === t)
                return <div key={tagObj.id}>{tagObj.tag}
                <button onClick={(evt) =>{
                    evt.preventDefault()
                    const arrCopyID = stateTagIDArr.slice()
                    const index = arrCopyID.indexOf(tagObj.id)
                    arrCopyID.splice(index, 1)
                    setTagIDArr(arrCopyID)  
                }}>x</button>
                </div>
                })
                }
            </div>
            <button onClick={onClose}>Cancel</button>
            <button onClick={(evt) => {
                evt.preventDefault()
                stateTagIDArr.map(t => {
                    createTagPost({
                       tag_id: t,
                       post_id: post.id
                   })
               })
               onClose()
            }}>ADD</button>
          </>
        )}
      </section>
      <ReactionList {...props} />
    </>
  );
};
