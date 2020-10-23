import React from "react"
import { Route } from "react-router-dom"
import { HomeList } from "./Profiles/HomeList"
import {PostProvider} from "./Posts/PostProvider"
import {PostForm} from "./Posts/PostForm"
import { CategoryProvider } from "./Categories/CategoryProvider"
import { TagPostContext } from "./Tags/TagPostProvider"

export const ApplicationViews = (props) => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
        </main>
        <PostProvider>
            <CategoryProvider>
                <TagPostContext>
            <Route exact path="/home" render={
                props => <HomeList {...props} />} />
            <Route exact path="/posts/create" render={
                props => <PostForm {...props} />} />
                </TagPostContext>
            </CategoryProvider>
        </PostProvider>
    </>
}
