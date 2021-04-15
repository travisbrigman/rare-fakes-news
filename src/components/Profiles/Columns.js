import React from 'react'
import { Checkmark, Close } from "grommet-icons";

export const columns = [
    {
        property: 'id',
        header: 'ID Number',
    },
    {
        property: 'bio',
        header: 'Bio',
    },
    {
        property: 'username',
        header: 'Username',
    },
    {
        property: 'isActive',
        header: 'In/Active',
        render: datum => datum.isActive ? <Checkmark color="brand"/> : <Close />
    },
    {
        property: 'isStaff',
        header: 'Admin or Author',
        render: datum => datum.isStaff ? "Admin" : "Author"
    }
  ];