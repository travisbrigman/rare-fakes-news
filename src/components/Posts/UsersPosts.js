//shows user their own posts in MyPosts view, allows them to delete a post
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PostContext } from "./PostProvider";
import { UserContext } from "../Profiles/UserProvider"
import { Anchor, Box, Button, Card, CardBody, CardFooter, CardHeader, Heading, Text } from "grommet"
import TimeAgo from "timeago-react"


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
      <Heading level="1">My Posts</Heading>
      {usersPosts.map((p) => {
        return (
          <Box key={p.id} width="medium" >
            <Card  className="container__cardContent" margin="small" pad="xsmall" background="light-1">
                <Anchor 
                  color="brand" 
                  as={Link} 
                  to={{ pathname: `posts/${p.id}` }}
                >
                  <CardHeader>
                    <Text weight="bold">{p.title}</Text>
                  </CardHeader>
                </Anchor>
                <CardBody>
                      <Text size="xsmall" color="xweak">
                        <TimeAgo datetime={p.publication_date} />
                      </Text>
                      <Text size="small" truncate={true}>
                        {p.content}
                      </Text>
                    </CardBody>
              <CardBody>
                {/* <CardFooter>{p.user.user.first_name}</CardFooter> */}
                {p.category==null
                ? "" 
                :<Text pad="xsmall" size="xsmall" color="xweak">{p.category.label}</Text>}
              </CardBody>
            </Card>
          </Box>
        )
      }).reverse()}
    </>
  )
}
