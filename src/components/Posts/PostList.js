//child of HomeList, list of all posts, user can delete only their own post
import React from "react";
import { Link } from "react-router-dom";
import {
  Anchor,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Text,
} from "grommet";
import { Edit } from "grommet-icons";
import TimeAgo from "timeago-react";

export const PostList = ({ arrOfPosts }) => {
  return (
    <>
      <Heading level="1">All Posts</Heading>
      <Button
        primary
        icon={<Edit />}
        as={Link}
        to={{ pathname: `posts/create` }}
        label="Create Post"
        margin="small"
      />
      {arrOfPosts !== []
        ? arrOfPosts
            .map((p) => {
              return (
                <Box key={`post${p.id}`} width="medium">
                  <Card
                    className="container__cardContent"
                    background="light-1"
                    margin="small"
                    pad="xsmall"
                    width="medium"
                  >
                    <Anchor
                      color="brand"
                      as={Link}
                      to={{ pathname: `/posts/${p.id}` }}
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
                    <CardFooter round="xsmall" pad="xsmall" gap="none">By: {p.user.user.first_name}</CardFooter>
                    {p.category == null ? (
                      ""
                    ) : (
                      <Text pad="xsmall" size="xsmall" color="xweak">
                        {p.category.label}
                      </Text>
                    )}
                  </Card>
                </Box>
              );
            })
            .reverse()
        : null}
    </>
  );
};
