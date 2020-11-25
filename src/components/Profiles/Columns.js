import React from 'react'
import { Checkmark, Close } from "grommet-icons";

export const columns = [
    {
        property: 'user.first_name',
        header: 'First Name',
    },
    {
        property: 'user.last_name',
        header: 'Last Name',
    },
    {
        property: 'user.username',
        header: 'Username',
    },
    {
        property: 'user.is_active',
        header: 'In/Active',
        render: datum => datum.user.is_active ? <Checkmark color="brand"/> : <Close />
    },
    {
        property: 'user.is_staff',
        header: 'Admin or Author',
        render: datum => datum.user.is_staff ? "Admin" : "Author"
    }
  ];