import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
// next
import NextLink from 'next/link';

import TreeView from '@mui/lab/TreeView';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Card,
  Table,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// _mock_
import { _userList } from '../../../_mock';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import SearchNotFound from '../../../components/SearchNotFound';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import { UserListHead as OrderListHead, UserListToolbar as OrderListToolbar, UserMoreMenu as OrderMoreMenu } from '../../../sections/@dashboard/nomenklatura/list';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Название', alignRight: false },
  { id: 'seller', label: 'Продавец', alignRight: false },
  { id: 'buyer', label: 'Покупатель', alignRight: false },
  { id: 'summ', label: 'Сумма', alignRight: false },
  { id: 'isVerified', label: 'Дата доставки', alignRight: false },
  { id: 'status', label: 'Статус', alignRight: false },
  { id: 'createdAt', label: 'Дата создания', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

UserList.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function UserList() {
  const theme = useTheme();

  const { themeStretch } = useSettings();

  const [orderList, setList] = useState([]);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('desc');

  const [selected, setSelected] = useState([]);
  
  const [tab, setTab] = useState(0);

  const [orderBy, setOrderBy] = useState('createdAt');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(25);

  useEffect(()=> {
    console.log(process.env.NEXT_PUBLIC_HOST)
    fetch(`${process.env.NEXT_PUBLIC_HOST}/contracts`)
    .then(res => res.json())
    .then(json => {
      console.log(json)
      setList(json)
    })


  }, [])

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (checked) => {
    if (checked) {
      const newSelecteds = orderList.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (filterName) => {
    setFilterName(filterName);
    setPage(0);
  };

  const handleDeleteUser = (userId) => {
    const deleteUser = orderList.filter((user) => user.id !== userId);
    setSelected([]);
    setList(deleteUser);
  };

  const handleDeleteMultiUser = (selected) => {
    const deleteUsers = orderList.filter((user) => !selected.includes(user.name));
    setSelected([]);
    setList(deleteUsers);
  };


  const handleTab = (event, newValue) => {
    setTab(newValue);
  };


  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - orderList.length) : 0;

  const filteredUsers = applySortFilter(orderList, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && Boolean(filterName);

  

  return (
    <Page title="Договоры">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Договоры"
          links={[
            // { name: 'Dashboard', href: PATH_DASHBOARD.root },
            // { name: 'User', href: PATH_DASHBOARD.user.root },
            { name: '' },
          ]}
          action={
            <NextLink href={PATH_DASHBOARD.contracts.new} passHref>
              <Button variant="contained" startIcon={<Iconify icon={'eva:plus-fill'} />}>
                Создать
              </Button>
            </NextLink>
          }
        />

        <Card>
          <OrderListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            value={tab}
            handleChange={handleTab}
            onDeleteUsers={() => handleDeleteMultiUser(selected)}
          />

          <Scrollbar>



          <List>
            {orderList?.map((item) => (
              <NextLink href={`/dashboard/contracts/${item.id}/edit`}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary={'Договор № ' + item?.contract_number} sx={{userSelect: 'text'}} />
                  </ListItemButton>
                </ListItem>
              </NextLink>
            ))}
            
          </List>
  
          </Scrollbar>

        </Card>
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return array.filter((_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}
