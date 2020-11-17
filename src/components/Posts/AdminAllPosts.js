// import React, { useContext, useEffect } from "react"
import  React, {useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import { PostContext } from "./PostProvider";
import { UserContext } from "../Profiles/UserProvider";
import { DataGrid } from "@material-ui/data-grid";

export const AdminAllPosts = () => {

    const {approvePost, posts, getPosts} = useContext(PostContext)
    console.log(posts);

    useEffect(() => {
        getPosts()
     },[])

     /*0:
approved: true
category: {id: 3, label: "Self Help"}
category_id: 3
content: "content is here"
created_by_current_user: true
id: 1
image_url: "A website!"
publication_date: "2020-11-10"
title: "Test post"
user:
bio: ""
id: 1
user:
first_name: "Steve" */

  const columns = [
    { field: {posts.category.label}, headerName: "Category", width: 70 },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 90,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.getValue("firstName") || ""} ${
          params.getValue("lastName") || ""
        }`,
    },
  ];

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];

  return (
    <>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          checkboxSelection
        />
      </div>
    </>
  );
};
