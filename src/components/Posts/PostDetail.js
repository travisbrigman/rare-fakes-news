import React, { useContext, useEffect, useState, useRef } from "react";
import { PostContext } from "./PostProvider";
import { ReactionList } from "../Reactions/ReactionList";

import { Link } from "react-router-dom";
import { DeleteTagItem } from "../utils/DeleteTagItem";

export const PostDetails = (props) => {
  const {
    getPostById,
    post,
    setPost,
    getTagsByPost,
    postTags,
    setPostTags,
  } = useContext(PostContext);

  const [selectedTagPostId, setSelectedTagPostId] = useState(0);
  const tagPostId = useRef(null);
  const postId = parseInt(props.match.params.postId);

  useEffect(() => {
    getPostById(postId).then(setPost);
    getTagsByPost(postId).then(setPostTags);
  }, []);

  const handleChange = (e) => {
    console.log(postTags, e.target.value);
    setSelectedTagPostId(parseInt(e.target.value));
  };

  return (
    <>
      <section className="post">
        <h3 className="post__title">{post.title}</h3>
        <div className="post__content">{post.content}</div>
        <div className="post_date">
          Published on: {new Date(post.date).toLocaleDateString("en-US")}
        </div>

        <div>
          {post.user.id === parseInt(localStorage.getItem("rare_user_id")) ? (
            <div className="post_author">
              Author: {post.user.display_name} (you!)
            </div>
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
        <select
          name="tagManagement"
          className="form-control"
          ref={tagPostId}
          onChange={handleChange}
        >
          <option value="0">Select a Tag</option>
          {postTags.map((tag) => (
            <option key={tag.id} value={tag.tagPost.id}>
              {tag.tag}
            </option>
          ))}
        </select>

        <DeleteTagItem tagPostId={selectedTagPostId} postId={postId} />
      </section>
      <ReactionList {...props} />
    </>
  );
};
