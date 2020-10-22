import React from "react"
import { Route } from "react-router-dom"
import { HomeList } from "./Profiles/HomeList"
import {PostProvider} from "./Posts/PostProvider"

export const ApplicationViews = (props) => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
        </main>
        <PostProvider>
            <Route exact path="/home" render={
                props => <HomeList {...props} />} />

        </PostProvider>
    </>
}
