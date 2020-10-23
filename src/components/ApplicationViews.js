import React from "react"
import { Route } from "react-router-dom"
import { HomeList } from "./Profiles/HomeList"
import {PostProvider} from "./Posts/PostProvider"
import {PostForm} from "./Posts/PostForm"
import { CategoryProvider } from "./Categories/CategoryProvider"
import { TagPostProvider } from "./Tags/TagPostProvider"
import { TagProvider } from "./Tags/TagProvider"
import { TagForm } from "./Tags/TagForm"
import { TagList } from "./Tags/TagList"

export const ApplicationViews = (props) => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
        </main>
        <PostProvider>
            <CategoryProvider>
                <TagPostProvider>
            <Route exact path="/home" render={
                props => <HomeList {...props} />} />
            <Route exact path="/posts/create" render={
                props => <PostForm {...props} />} />
                </TagPostProvider>
            </CategoryProvider>
        </PostProvider>
        <TagProvider>
            <Route exact path="/tags/create" render={(props) => {
                return <TagForm {...props}/>
            }} />
            <Route exact path="/tags" render={(props) => {
                return <TagList {...props} />
            }} />
            
        </TagProvider>
    </>
}
