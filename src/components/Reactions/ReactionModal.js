//delete button component with confirmation modal
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { PostContext } from "../Posts/PostProvider";
import { Box, Button, Heading, Layer, Text } from "grommet"


export const ReactionModal = ({ open, onClose}) => {
  const history = useHistory()


  return (
    <>
      {open && (
        <Layer onEsc={onClose} onClickOutside={onClose} responsive={true} position="center">
          <Box  margin="xsmall">
            <Heading margin="xsmall" level="3">
              Sorry
            </Heading>
            <Text margin="xsmall">You've already selected this reaction!</Text>
            <Box direction="row-responsive">
              <Button primary margin="small" label="OK" onClick={onClose} />
            </Box>
          </Box>
        </Layer>
      )}
    </>
  );
};