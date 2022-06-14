import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
// next
import NextLink from 'next/link';
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
  Box,
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
import { UserListHead, UserListToolbar, UserMoreMenu } from '../../../sections/@dashboard/objects/list';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Название', alignRight: false },
  { id: 'createdAt', label: 'Дата добавления', alignRight: false },
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

  

  const [userList, setList] = useState([]);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (checked) => {
    if (checked) {
      const newSelecteds = userList.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  useEffect(()=> {

    fetch(`${process.env.NEXT_PUBLIC_HOST}/objects`)
    .then(res => res.json())
    .then(json => {
      console.log(json)
      setList(json)
    })


  }, [])

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
    const deleteUser = userList.filter((user) => user.id !== userId);
    setSelected([]);
    setUserList(deleteUser);
  };

  const handleDeleteMultiUser = (selected) => {
    const deleteUsers = userList.filter((user) => !selected.includes(user.name));
    setSelected([]);
    setUserList(deleteUsers);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userList.length) : 0;

  const filteredUsers = applySortFilter(userList, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && Boolean(filterName);

  return (
    <Page title="Объекты">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Объекты"
          links={[
            // { name: 'Dashboard', href: PATH_DASHBOARD.root },
            // { name: 'User', href: PATH_DASHBOARD.user.root },
            { name: '' },
          ]}
          action={
            <NextLink href={PATH_DASHBOARD.objects.new} passHref>
              <Button variant="contained" startIcon={<Iconify icon={'eva:plus-fill'} />}>
                Добавить
              </Button>
            </NextLink>
          }
        />

        <Card sx={{bgcolor: "#f6f6ff"}}>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            onDeleteUsers={() => handleDeleteMultiUser(selected)}
          />

          <Scrollbar>
            <Box sx={{display: 'flex', flexWrap: 'wrap', p: 3, gap: '20px'}}>
              {filteredUsers.map((row) => {
                const { id, name, role, status, company, avatarUrl, createdAt } = row;
                const isItemSelected = selected.indexOf(name) !== -1;

                return (
                  <Card sx={{width: '18%', p: 2}}>
                      <Avatar alt={name} src={avatarUrl} sx={{ mr: 2, mb: 2, bgcolor: '#49f', color: 'white' }}>
                        <Iconify icon={'ic:outline-cottage'} />
                      </Avatar>
                      <NextLink href={`/dashboard/objects/${id}`}>
                          <a style={{
                            textDecoration: 'none', 
                            color: '#49d', 
                            fontWeight: 'bold'
                          }}>{name}</a>
                      </NextLink>
                  </Card>
                  // <TableRow
                  //   hover
                  //   key={id}
                  //   tabIndex={-1}
                  //   role="checkbox"
                  //   selected={isItemSelected}
                  //   aria-checked={isItemSelected}
                  // >
                  //   <TableCell padding="checkbox">
                  //     <Checkbox checked={isItemSelected} onClick={() => handleClick(name)} />
                  //   </TableCell>
                  //   <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                  //     <Avatar alt={name} src={avatarUrl} sx={{ mr: 2 }}>
                  //       <Iconify icon={'ic:outline-cottage'} />
                  //     </Avatar>
                  //     <NextLink href={`/dashboard/objects/${id}`}>
                  //         {name}
                  //     </NextLink>
                  //   </TableCell>
                  //   <TableCell align="left">
                  //     <Label
                  //       variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                  //       color={(status === 'banned' && 'error') || 'success'}
                  //     >
                  //       {new Date(createdAt).toLocaleDateString()}
                  //     </Label>
                  //   </TableCell>

                  // </TableRow>
                );
              })}
            </Box>
            
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
