
export const columns = [
    {
      property: 'title',
      header: 'Title',
    },
    {
      property: 'publication_date',
      header: 'Date',
    },
    {
      property: 'user.user.first_name',
      header: 'author',
    },
    {
      property: 'category.label',
      header: 'Category'
    },
    {
      property: 'approved',
      header: 'Approved',
      render: datum => datum.approved ? "Approved" : "Not Approved"
    },
  ];
