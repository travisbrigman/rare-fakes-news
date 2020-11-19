//child of HomeList, list of all posts, user can delete only their own post
import React from "react"
import {Link} from "react-router-dom"
import { Anchor, Box, Button, Card, CardFooter, CardHeader, Heading, Text } from "grommet"
import { Edit } from "grommet-icons"



export const PostList = ({arrOfPosts}) => {

    return (
        <>
        <Heading level="2">Posts</Heading>
        <Button primary icon={<Edit />} as={Link} to={{pathname:`posts/create`}} label="Create Post"/>
        {
            arrOfPosts !== [] ? arrOfPosts.map(p => {
                return <div key={`post${p.id}`} className="container__card">
                    <div className="container__cardContent">    
                        <Link to={{pathname:`/posts/${p.id}`}}>
                        <p>{p.title}</p>
                        </Link>
                        <p>{p.user.user.first_name}</p>
                        {p.category==null? "" :<p>{p.category.label}</p>}
                    </div>
                </div>
            }).reverse() : null
        }
        </>
    )
}