// @mui
import { DataGrid } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
// _mock_
import { _dataGrid } from '../../../_mock';
// components
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

const columns = [
  {
    field: 'id',
    headerName: '№',
    width: 120,
  },
  {
    field: 'firstName',
    headerName: 'Наименование',
    width: 160,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Количество',
    width: 160,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Ед. изм.',
    type: 'number',
    width: 120,
    editable: true,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'price',
    headerName: 'Цена',
    type: 'number',
    width: 120,
    editable: true,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'total',
    headerName: 'Сумма',
    type: 'number',
    width: 120,
    editable: true,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'fullName',
    headerName: 'Объект',
    description: 'This column has a value getter and is not sortable.',
    flex: 1,
    valueGetter: (params) => `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  // {
  //   field: 'action',
  //   headerName: ' ',
  //   width: 80,
  //   align: 'right',
  //   sortable: false,
  //   disableColumnMenu: true,
  //   renderCell: () => (
  //     <IconButton>
  //       <Iconify icon={'eva:more-vertical-fill'} sx={{ width: 20, height: 20 }} />
  //     </IconButton>
  //   ),
  // },
];

const rows = [
  {
    id: '_mock.id(index)',
    name: '_mock.name.fullName(index)',
    email: '_mock.email(index)',
    lastLogin: '_mock.time(index)',
    performance: '_mock.number.percent(index)',
    rating: '_mock.number.rating(index)',
    status: 'randomInArray(',
    isAdmin: false,
    lastName: '_mock.name.lastName(index)',
    firstName: '_mock.name.firstName(index)',
    age: 2,
  }
]

export default function DataGridBasic() {
  return <DataGrid columns={columns} rows={_dataGrid} checkboxSelection disableSelectionOnClick />;
}
