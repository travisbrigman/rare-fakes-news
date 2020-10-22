import React from "react"
import { Route } from "react-router-dom"
import { TagProvider } from "./Tags/TagProvider"
import { TagForm } from "./Tags/TagForm"
import { TagList } from "./Tags/TagList"
import {HomeList} from "./Profiles/HomeList"
import { UserProvider } from "./Profiles/UserProvider"
import { UserDetail } from "./Profiles/UserDetail"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
        </main>

        <TagProvider>
            <Route exact path="/tags/create" render={(props) => {
                return <TagForm {...props}/>
            }} />
            <Route exact path="/tags" render={(props) => {
                return <TagList {...props} />
            }} />
            
        </TagProvider>
        <Route exact path="/home">
            <HomeList />
        </Route>

        <UserProvider>
            <Route path="/profile" render={
                props => <UserDetail {...props} />}/>
        </UserProvider>
    </>
}
