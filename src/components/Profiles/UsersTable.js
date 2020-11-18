import React, { useContext, useEffect, useState } from "react";
import { Grommet, Box, DataTable, CheckBox } from 'grommet';
import { columns } from './Columns';
import { UserContext } from "./UserProvider";


export const AdminAllPosts = () => {
    const { users, getUsers, user, getCurrentUser, setUser } = useContext(UserContext)
    const controlledColumns = columns.map(col => ({ ...col }));



   // const [checked, setChecked] = useState([]);
  
    // const onCheck = (event, value) => {
    //   if (event.target.checked) {
    //     setChecked([...checked, value]);
    //   } else {
    //     setChecked(checked.filter(item => item !== value));
    //   }
    // };
  
    // const onCheckAll = event =>
    //   setChecked(event.target.checked ? posts.map(datum => datum.name) : []);

  useEffect(() => {
    getUsers()

  }, []);

//   const approvedChecked = () => {
//     checked.forEach(checkedPostId => {
//       approvePost(checkedPostId)
//     })
//     setChecked([])
//   }


  return (
    <>
    <Grommet >
      <Box align="center" pad="medium">
        <DataTable
          columns={[
            // {
            //   property: 'checkbox',
            //   render: datum => (
            //     <CheckBox
            //       key={datum.id}
            //       checked={checked.indexOf(datum.id) !== -1}
            //       onChange={e => onCheck(e, datum.id)}
            //     />
            //   ),
            //   header: (
            //     <CheckBox
            //       checked={checked.length === posts.length}
            //       indeterminate={
            //         checked.length > 0 && checked.length < posts.length
            //       }
            //       onChange={onCheckAll}
            //     />
            //   ),
            //   sortable: false,
            // },
            ...controlledColumns,
          ].map(col => ({ ...col }))}
          data={users}
          sortable
          size="medium"
        />
      </Box>
    </Grommet>
    <button onClick={() => {approvedChecked()}}>APPROVE</button>
    </>
  );
};