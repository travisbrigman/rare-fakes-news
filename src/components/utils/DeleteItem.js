//delete button component with confirmation modal
import React, { useState, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { PostContext } from "../Posts/PostProvider";
import { Box, Button, Heading, Layer, Text } from "grommet"
import { Trash } from "grommet-icons"


export const DeleteItem = ({ onOpen, postId }) => {
  console.log("deleteItemComponent");
  const { deletePost } = useContext(PostContext);
  const history = useHistory()
  //state variable and functions that change state of the state variable
  const [open, setOpen] = useState();
  // const onOpen = () => setOpen(true);
  const onClose = () => setOpen(undefined);

  //function that is called when the delete button is clicked. 
  //This function deletes an entry in the Post table.
  //Lastly the function calls the close function which resets our modal state.
  const deleteThisPost = () => {
    deletePost(postId)
    .then(() => {
      history.push("/home")
    })
  };

  return (
    <>
      {/* <Button icon={<Trash />} onClick={onOpen} /> */}
      {open && (
        <Layer onEsc={onClose} onClickOutside={onClose} responsive={true} position="center">
          <Box  margin="xsmall">
            <Heading margin="xsmall" level="3">
              Confirm
            </Heading>
            <Text margin="xsmall">Are you sure you want to delete?</Text>
            <Box direction="row-responsive">
              <Button primary margin="small" label="Delete" onClick={deleteThisPost} />
              <Button secondary margin="small" label="Cancel" onClick={onClose} />
            </Box>
          </Box>
        </Layer>
      )}
    </>
  );
};
