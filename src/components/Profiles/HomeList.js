import React from "react"
import {PostList} from "../Posts/PostList"



export const HomeList = (props) => (
    <>
    <h1>Dashboard</h1>
    <PostList {...props} />
    </>
)