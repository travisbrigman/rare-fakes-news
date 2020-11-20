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
                return <Box key={`post${p.id}`} width="medium">
                <Card className="container__cardContent" background="light-1" margin="small" pad="xsmall">    
                        <Anchor as={Link} to={{pathname:`/posts/${p.id}`}}>
                        <CardHeader>{p.title}</CardHeader>
                        </Anchor>
                        <CardFooter>{p.user.user.first_name}</CardFooter>
                        {p.category==null? "" :<Text>{p.category.label}</Text>}
                    </Card>
                    </Box>
             }).reverse() : null
        }
        </>
    )
}