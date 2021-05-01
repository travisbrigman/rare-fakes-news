//form to create a new tag
import React, { useContext, useEffect, useState } from "react";
import { TagContext } from "./TagProvider";
import { Button, Box, Heading, Layer, Text, TextInput } from "grommet";

export const TagForm = (props) => {
  // Use the required context providers for data
  const { createTag, updateTag, getTagById } = useContext(TagContext);
  const editMode = props.match.params.hasOwnProperty("tagId");

  //state variable and functions that change state of the state variable
  const [open, setOpen] = useState();
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(undefined);

  //toggles the CSS class name depending on if the modal is open or not
  const showHideClassName = open ? "modal display-block" : "modal display-none";

  const [tagObj, setTagObj] = useState({});

  const handleControlledInputChange = (event) => {
    /*
            When changing a state object or array, always create a new one
            and change state instead of modifying current one
    */
    const newTag = Object.assign({}, tagObj); // Create copy
    newTag[event.target.name] = event.target.value; // Modify copy
    setTagObj(newTag); // Set copy as new state
  };

  useEffect(() => {
    if (editMode) {
      getTagById(props.match.params.tagId).then((tag) => {
        setTagObj({
          label: tag.label
        });
      });
    }
  }, [props.match.params.tagId]);

  return (
    <Box align="center" alignContent="center">
      <Heading level="2">Tag form</Heading>
      <Box>
        <Text htmlFor="label">Enter tag name: </Text>
        <Box margin="small">
        <TextInput
          type="text"
          name="label"
          required
          autoFocus
          placeholder="ex: sports, politics, etc"
          value={tagObj.label}
          onChange={handleControlledInputChange}
        />
        </Box>

        {editMode ? (
          <Button primary margin="small" label="EDIT" onClick={onOpen} />
        ) : (
          ""
        )}
      </Box>

      {open && (
        <Layer
          onEsc={onClose}
          onClickOutside={onClose}
          responsive={true}
          position="center"
        >
          <Box width="medium" size="small" margin="small">
            <Heading level="3">Confirm</Heading>
            <Text>Are you sure you want to make these changes?</Text>
            <Box size="small" direction="row-responsive">
              <Button
                primary
                label="Edit"
                onClick={() => {
                  updateTag({
                    id: props.match.params.tagId,
                    label: tagObj.label,
                  }).then(() => {
                    props.history.push(`/tags`);
                  });
                }}
                margin="small"
              />
              <Button
                secondary
                margin="small"
                label="Cancel"
                onClick={onClose}
              />
            </Box>
          </Box>
        </Layer>
      )}
      {editMode ? (
        ""
      ) : (
        <Button
          primary
          label="Create New Tag"
          type="submit"
          onClick={(evt) => {
            evt.preventDefault();
            createTag({
              label: tagObj.label,
            }).then(() => props.history.push("/tags"));
          }}
        />
      )}
    </Box>
  );
};
