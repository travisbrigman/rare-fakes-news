import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserProvider";
import "./UsersList.css";
import { UsersTable } from "./UsersTable";
import { Anchor, Box, Heading, List, Text } from "grommet";

export const UsersList = () => {
  const { users, getUsers, user, getCurrentUser, setUser } = useContext(
    UserContext
  );


  useEffect(() => {
    getUsers();
    getCurrentUser().then(setUser);
  }, []);
  return (
    <>
      <Heading level="1">All Users</Heading>
      {
        
          <>
          <div>
            <UsersTable users={users} />
          </div>
          <Box background="background-contrast" elevation="large">
            {/*
            <List
              data={users}
              primaryKey={(item) =>
                item.id !== user.id ? (
                  <Anchor
                    color="text"
                    as={Link}
                    to={{ pathname: `/profiles/${item.id}` }}
                  >
                    {item.user.username}
                  </Anchor>
                ) : (
                  <Anchor color="text" as={Link} to={{ pathname: "/profile" }}>
                    {item.user.username}
                  </Anchor>
                )
              }
            />
*/}
          </Box>
        </>
      }
    </>
  );
};
