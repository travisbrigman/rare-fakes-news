//renders list of tags in tag management, maps over tags in DB and displays each individual tag component
import React, { useContext, useEffect, useState } from "react";
import { TagContext } from "./TagProvider";
import { UserContext } from "../Profiles/UserProvider";
import { DeleteTag } from "../utils/DeleteTag";
import { Button, Box, Heading, List, Text } from "grommet";
import { Edit, Add } from "grommet-icons";
import { Link } from "react-router-dom";

export const TagList = ({ props }) => {
  const { getTags, tags } = useContext(TagContext);
  const { getCurrentUser } = useContext(UserContext);
  const [currentUser, setCurrentUser] = useState({ user: {} });

  // Initialization effect hook -> Go get tag data
  useEffect(() => {
    getTags();
  }, []);

  useEffect(() => {
    getCurrentUser().then(setCurrentUser);
  }, []);

  return (
    <Box className="tag_container">
      <Heading level="1" className="heading">
        Tag
      </Heading>
      <Box direction="row-responsive" margin="small">
        <Box background="background-contrast" elevation="large">
        <List data={tags}>
          {(datum) => (
            <Box direction="row-responsive" gap="medium" align="center" >
              <Text weight="bold">#</Text>
              <Text weight="bold">{datum.label}</Text>
            </Box>
          )}
        </List>
        </Box>
        <Box>
          {tags.map((tag) => {
            return (
              <>
                {currentUser.user.is_staff ? (
                  <Box direction="row">
                    <DeleteTag tagId={tag.id} />
                    <Box className="new_tag_btn_container">
                      <Link to={`/tags/edit/${tag.id}`}>
                        <Button icon={<Edit />} className="new_tag_btn" />
                      </Link>
                    </Box>
                  </Box>
                ) : (
                  <></>
                )}
              </>
            );
          })}
        </Box>
      </Box>

      <Link className="tagform__link" to="/tags/create">
        <Button primary icon={<Add />} margin="medium" label="Tag" />
      </Link>
    </Box>
  );
};
