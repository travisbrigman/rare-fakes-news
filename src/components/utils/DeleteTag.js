//delete button component with confirmation modal
import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { TagContext } from "../Tags/TagProvider"
import { Box, Button, Heading, Layer, Text } from "grommet"
import { Trash } from "grommet-icons"

export const DeleteTag = ({ tagId }) => {
  const { deleteTag } = useContext(TagContext);
  const history = useHistory()

  //state variable and functions that change state of the state variable
  const [open, setOpen] = useState();
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(undefined);


  //function that is called when the delete button is clicked. 
  //This function deletes an entry in the Post table.
  //Lastly the function calls the close function which resets our modal state.
  const deleteThisTag = () => {
    deleteTag(tagId)
    .then(() => {
        onClose()
      history.push("/tags")
    })
  };

  return (
    <>
      <Button icon={<Trash />} onClick={onOpen} />
      {open && (
        <Layer 
        onEsc={onClose}
        onClickOutside={onClose}
        responsive={true}
        position="center"
        >
          <Box width="medium" size="small" margin="small">
            <Heading size="3">
              Confirm
            </Heading>
            <Text>Are you sure you want to delete?</Text>
            <Box size="small" direction="row-responsive">
              <Button primary margin="small" label="Delete" onClick={deleteThisTag}/>
              <Button secondary margin="small" label="Cancel" onClick={onClose} />
            </Box>
          </Box>
        </Layer>
      )}
    </>
  );
};