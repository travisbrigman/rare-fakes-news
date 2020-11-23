//shows user their own posts in MyPosts view, allows them to delete a post
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PostContext } from "./PostProvider";
import { UserContext } from "../Profiles/UserProvider"
import { Anchor, Box, Button, Card, CardBody, CardFooter, CardHeader, Heading, Text } from "grommet"


export const UsersPosts = () => {
  const { getPostByUser } = useContext(PostContext);
  const { getCurrentUser } = useContext(UserContext)

  const [usersPosts, setUsersPosts] = useState([]);
 
  useEffect(() => {
    getCurrentUser()
    //returns res.json() that is immediately passed to the next .then()
    //res.json() is the current user object
      .then((user) => getPostByUser(user.id))
      .then(setUsersPosts)
  }, [])

  return (
    <>
      <Heading level="2">My Posts</Heading>
      {usersPosts.map((p) => {
        return (
          <Box key={p.id} width="medium" >
            <Card  className="container__cardContent" margin="small" pad="xsmall" background="light-1">
              <CardHeader>
                <Anchor as={Link} to={{ pathname: `posts/${p.id}` }}>
                  <CardHeader>{p.title}</CardHeader>
                </Anchor>
              </CardHeader>
              <CardBody>
              {p.category==null? "" :<Text>{p.category.label}</Text>}
              </CardBody>
              <CardFooter>{p.user.user.first_name}</CardFooter>
            </Card>
          </Box>
        )
      }).reverse()}
    </>
  )
}
