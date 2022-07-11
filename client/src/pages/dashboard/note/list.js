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
  Badge,
  Chip,
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
import { UserListHead, UserListToolbar, UserMoreMenu } from '../../../sections/@dashboard/note/list';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Название', alignRight: false },
  { id: 'company', label: 'Объект', alignRight: false },
  { id: 'role', label: 'Продавец', alignRight: false },
  { id: 'role', label: 'Покупатель', alignRight: false },
  { id: 'isVerified', label: 'Сумма', alignRight: false },
  { id: 'status', label: 'Дата', alignRight: false },
  { id: 'basis', label: 'Основание', alignRight: false },
];

// ----------------------------------------------------------------------

UserList.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function UserList() {
  const theme = useTheme();

  const { themeStretch } = useSettings();

  const [list, setList] = useState([]);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');
  const [attrName, setAttrName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(()=> {

    fetch(`${process.env.NEXT_PUBLIC_HOST}/notes`)
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
      const newSelecteds = list.map((n) => n.name);
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

  const handleFilterByName = (filterName, attrName) => {
    setFilterName(filterName);
    setAttrName(attrName);
    setPage(0);
  };

  const handleDeleteUser = (userId) => {
    const deleteUser = list.filter((user) => user.id !== userId);
    setSelected([]);
    setList(deleteUser);
  };

  const handleDeleteMultiUser = (selected) => {
    const deleteUsers = list.filter((user) => !selected.includes(user.name));
    setSelected([]);
    setList(deleteUsers);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - list.length) : 0;

  const filteredUsers = applySortFilter(list, getComparator(order, orderBy), filterName, attrName);

  const isNotFound = !filteredUsers.length && Boolean(filterName);

  return (
    <Page title="Учёт">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Учёт"
          links={[
            // { name: 'Dashboard', href: PATH_DASHBOARD.root },
            // { name: 'User', href: PATH_DASHBOARD.user.root },
            { name: '' },
          ]}
          action={
            <NextLink href={PATH_DASHBOARD.note.new} passHref>
              <Button variant="contained" startIcon={<Iconify icon={'eva:plus-fill'} />}>
                Создать
              </Button>
            </NextLink>
          }
        />

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            onDeleteUsers={() => handleDeleteMultiUser(selected)}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={list.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, name, role, summ, company, Date: date, isVerified } = row;
                    const isItemSelected = selected.indexOf(name) !== -1;

                    return (
                      <TableRow
                        hover
                        key={id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                          <Badge  variant="dot" color={row?.isChecked ? 'success' : 'error'} anchorOrigin={{vertical: 'top',horizontal: 'right',}} >
                            <NextLink href={`/dashboard/note/${id}/edit`}>
                                <a>Запись № {id}</a>
                            </NextLink>
                          </Badge>
                        </TableCell>
                        <TableCell align="left">{row?.object?.name}</TableCell>
                        <TableCell align="left">{row?.seller?.name}</TableCell>
                        <TableCell align="left">{row?.buyer?.name}</TableCell>
                        <TableCell align="left">
                            {summ} руб.
                        </TableCell>

                        <TableCell >
                          {new Date(date).toLocaleDateString()}
                        </TableCell>
                        <TableCell >
                          {row?.basis}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={list.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, page) => setPage(page)}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
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

function applySortFilter(array, comparator, query, attr) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
      return array.filter((_user) => {

        
      if(typeof _user[attr] == 'string') {

        return _user[attr]?.toString()?.search(query) != -1;

      } else {

        return  _user[attr] == query;

      }

      });
  }
  return stabilizedThis.map((el) => el[0]);
}
