//delete button component with confirmation modal
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { PostContext } from "../Posts/PostProvider";
import { Box, Button, Heading, Layer, Text } from "grommet"


export const SubscriptionModal = ({ open, onClose , subStatus}) => {
  const history = useHistory()


  return (
    <>
      {open && (
        <Layer onEsc={onClose} onClickOutside={onClose} responsive={true} position="center">
          <Box  margin="xsmall">
            <Heading margin="xsmall" level="3">
              {subStatus ? "Subscription Started": "Subscription Ended"}
            </Heading>
            <Text margin="xsmall">Subscription Status Changed</Text>
            <Box direction="row-responsive">
              <Button primary margin="small" label="OK" onClick={() => {history.push('/home')}} />
            </Box>
          </Box>
        </Layer>
      )}
    </>
  );
};