//handles all Post data- getPosts, getPostsById, getPostsByUser, getPostByTag, getTagsByPost, getPostByCat, addPost, updatePost, deletePost
import React, { useState } from "react";

export const PostContext = React.createContext();

export const PostProvider = (props) => {
  const [posts, setPosts] = useState([
    {
      category: { id: "", label: "" },
      author: {
        username: "",
        profileImageUrl: "",
        id: "",
        bio: "",
        passwordHash: "",
      },
      content: "",
      publicationDate: "",
      id: "",
      title: "",
      approved: true,
      imageUrl: "",
    },
  ]);

  const [post, setPost] = useState({
    category: { id: "", label: "" },
    author: {
      username: "",
      profileImageUrl: "",
      id: "",
      bio: "",
      passwordHash: "",
    },
    content: "",
    publicationDate: "",
    id: "",
    title: "",
    approved: true,
    imageUrl: "",
  });
  const [postTags, setPostTags] = useState(  [
    {
      post: {
        author: { id: "" },
        content:
          "",
        publicationDate: "",
        category: { id: "" },
        id: "",
        title: "",
        approved: true,
        imageUrl: "",
      },
      tag: { label: "", id: "" },
      id: "",
    },
  ]
  );



  const getPosts = () => {
    return fetch("http://127.0.0.1:8080/posts", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("rare_user_id")}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(setPosts);
  };

  const getPostById = (id) => {
    return fetch(`http://127.0.0.1:8080/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("rare_user_id")}`,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  };

  const getPostByUser = (userId) => {
    return fetch(`http://127.0.0.1:8080/posts?user_id=${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("rare_user_id")}`,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  };

  const getPostByTag = (tagId) => {
    return fetch(`http://127.0.0.1:8080/posts?tag_id=${tagId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("rare_user_id")}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(setPostTags);
  };

  const getTagsByPost = (postId) => {
    return fetch(`http://127.0.0.1:8080/postTags?post_id=${postId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("rare_user_id")}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(setPostTags);
  };

  const getPostByCat = (categoryId) => {
    return fetch(`http://127.0.0.1:8080/posts?category_id=${categoryId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("rare_user_id")}`,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    //.then(setPosts)
  };

  const addPost = (post) => {
    return fetch("http://127.0.0.1:8080/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("rare_user_id")}`,
      },
      body: JSON.stringify(post),
    }).then((res) => res.json());
  };

  const updatePost = (post) => {
    return fetch(`http://127.0.0.1:8080/posts/${post.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("rare_user_id")}`,
      },
      body: JSON.stringify(post),
    }).then(getPosts);
  };

  const deletePost = (postId) => {
    return fetch(`http://127.0.0.1:8080/posts/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("rare_user_id")}`,
      },
      body: JSON.stringify(postId),
    }).then(getPosts);
  };
  const approvePost = (postId) => {
    return fetch(`http://localhost:8000/posts/${postId}/approve`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("rare_user_id")}`,
      },
    }).then(getPosts);
  };

  return (
    <PostContext.Provider
      value={{
        post,
        setPost,
        posts,
        addPost,
        approvePost,
        getPosts,
        setPosts,
        getPostById,
        updatePost,
        getPostByTag,
        getPostByCat,
        getPostByUser,
        deletePost,
        postTags,
        getTagsByPost,
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};
