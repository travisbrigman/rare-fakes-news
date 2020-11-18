export const columns = [
    {
        property: 'user.user.first_name',
        header: 'First Name',
    },
    {
        property: 'user.user.last_name',
        header: 'Last Name',
    },
    {
        property: 'user.user.username',
        header: 'Username',
    },
    {
        property: 'user.user.is_active',
        header: 'In/Active',
        render: datum => datum.approved ? "✅" : "❎"
    },
    {
        property: 'user.user.is_staff',
        header: 'Admin or Author',
        render: datum => datum.approved ? "Approved" : "Not Approved"
    }
  ];