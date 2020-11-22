//child of HomeList, list of all posts, user can delete only their own post
import React from "react"
import {Link} from "react-router-dom"
import { Anchor, Box, Button, Card, CardFooter, CardHeader, Heading, Text } from "grommet"
import { Edit } from "grommet-icons"
import TimeAgo from 'timeago-react'; 


export const PostList = ({arrOfPosts}) => {

    return (
        <>
        <Heading level="2">Posts</Heading>
        <Button primary icon={<Edit />} as={Link} to={{pathname:`posts/create`}} label="Create Post" margin="small"/>
        {
            arrOfPosts !== [] ? arrOfPosts.map(p => {
                return <Card key={`post${p.id}`} className="container__card" width="medium">
                    <Box className="container__cardContent" margin="xsmall">    
                        <Anchor as={Link} to={{pathname:`/posts/${p.id}`}}>
                        <Text size="large">{p.title}</Text>
                        </Anchor>
                        <Text color="text-xweak" size="small">
                        <TimeAgo datetime={p.publication_date}/>
                        </Text>
                        <Text weight="bold" color="text-weak">{p.user.user.first_name}</Text>
                        {p.category==null? "" :<Text color="text-xweak" size="small">{p.category.label}</Text>}
                    </Box>
                </Card>
            }).reverse() : null
        }
        </>
    )
}