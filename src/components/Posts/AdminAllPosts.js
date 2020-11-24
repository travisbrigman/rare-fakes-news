// import React, { useContext, useEffect } from "react"
import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "./PostProvider";
import { Grommet, Box, DataTable, CheckBox, Button } from 'grommet';
import { Compliance } from "grommet-icons"

import { columns } from './Columns';
import { TagPostContext } from "../Tags/TagPostProvider";

const controlledColumns = columns.map(col => ({ ...col }));

export const AdminAllPosts = () => {
  const { approvePost, posts, getPosts } = useContext(PostContext);
  const {TagPosts, getTagPosts} = useContext(TagPostContext)


    const [checked, setChecked] = useState([]);
  
    const onCheck = (event, value) => {
      if (event.target.checked) {
        setChecked([...checked, value]);
      } else {
        setChecked(checked.filter(item => item !== value));
      }
    };
  
    const onCheckAll = event =>
      setChecked(event.target.checked ? posts.map(datum => datum.id) : []);

  useEffect(() => {
    getPosts();
    getTagPosts();
  }, []);

  const approvedChecked = () => {
    checked.forEach(checkedPostId => {
      approvePost(checkedPostId)
    })
    setChecked([])
  }


  return (
    <>
      <Box align="center" elevation="large">
        
        <DataTable
          background="background-contrast"
          columns={[
            {
              property: 'checkbox',
              render: datum => (
                <CheckBox
                  key={datum.id}
                  checked={checked.indexOf(datum.id) !== -1}
                  onChange={e => onCheck(e, datum.id)}
                />
              ),
              header: (
                <CheckBox
                  checked={checked.length === posts.length}
                  indeterminate={
                    checked.length > 0 && checked.length < posts.length
                  }
                  onChange={onCheckAll}
                />
              ),
              sortable: false,
            },
            ...controlledColumns,
          ].map(col => ({ ...col }))}
          data={posts}
          sortable
          size="medium"
        />
      </Box>
    <Button primary label="Approve"icon={<Compliance/>} onClick={() => {approvedChecked()}} margin="small" />
    </>
  );
};
