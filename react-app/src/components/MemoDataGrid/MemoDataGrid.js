import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const MemoDataGrid = React.memo(props => {
  return <DataGrid {...props} />
});

export default MemoDataGrid;
