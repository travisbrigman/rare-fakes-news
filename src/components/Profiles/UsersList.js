import React, { useContext, useEffect } from "react"
import {Link} from "react-router-dom"
import { UserContext } from "./UserProvider"
import "./UsersList.css"


export const UsersList = () => {
    const { users, getUsers, user, getCurrentUser, setUser } = useContext(UserContext)

    useEffect(() => {
        getUsers()
        getCurrentUser()
            .then(setUser)
    }, [])

    console.log(user.user.is_staff)

    return (
        <>
            <h1>All Users</h1>
            {
                user.user.is_staff ?
                    <div>
                        {
                            users.map(u => {
                                return <div className="userContainer">
                                    {
                                        u.id === user.id ?
                                            <p>{u.user.first_name} {u.user.last_name}</p> :
                                            <Link to={{ pathname: `/profiles/${u.id}` }}>
                                                <p>{u.user.first_name} {u.user.last_name}</p>
                                            </Link>
                                    }
                                    <p>Active: </p>
                                    <p>Author or Admin:</p>
                                </div>
                            })
                        }
                    </div> :
                    <div>
                        {
                            users.map(u => {
                                return <div className="userContainer">
                                    {
                                        u.id === user.id ?
                                            <p>{u.user.first_name} {u.user.last_name}</p> :
                                            <Link to={{ pathname: `/profiles/${u.id}` }}>
                                                <p>{u.user.first_name} {u.user.last_name}</p>
                                            </Link>
                                    }
                                </div>
                            })
                        }
                    </div>
            }
        </>
    )
}