import React from "react"
import { Route } from "react-router-dom"
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
        <Route exact path="/home">
            <HomeList />
        </Route>

        <UserProvider>
            <Route path="/profile" render={
                props => <UserDetail {...props} />}/>
        </UserProvider>
    </>
}
