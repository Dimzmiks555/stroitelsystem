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
  TableHead,
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
import { UserListHead, UserListToolbar, UserMoreMenu } from '../../../sections/@dashboard/user/list';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'number', label: '№', alignRight: false },
  { id: 'Date', label: 'Дата / Наименование', alignRight: false },
  { id: 'name', label: 'Кол-во', alignRight: false },
  { id: 'company', label: 'Ед. изм.', alignRight: false },
  { id: 'role', label: 'Цена', alignRight: false },
  { id: 'isVerified', label: 'Сумма', alignRight: false },
  { id: 'role', label: 'Описание', alignRight: false },
];

// ----------------------------------------------------------------------

UserList.getLayout = function getLayout(page) {
  return <Layout >{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function UserList() {
  const theme = useTheme();

  const { themeStretch } = useSettings();

  const [list, setList] = useState([]);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('desc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('Date');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(100);

  useEffect(()=> {

    fetch('http://localhost:5000/notes')
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

  const handleFilterByName = (filterName) => {
    setFilterName(filterName);
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

  const filteredUsers = applySortFilter(list, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && Boolean(filterName);

  const handlePrint = () => {
    window.focus()
    window.print()
  }

  return (
    <Page title="Отчеты">
      <Container maxWidth={themeStretch ? false : 'lg'} >
        <HeaderBreadcrumbs
          sx={{displayPrint: 'none'}}
          heading={`Отчет от ${new Date().toLocaleDateString()}` }
          links={[
            // { name: 'Dashboard', href: PATH_DASHBOARD.root },
            // { name: 'User', href: PATH_DASHBOARD.user.root },
            { name: '' },
          ]}
          action={
            [
              <Button onClick={handlePrint} sx={{mr: 6}} color="warning" variant="contained" startIcon={<Iconify icon={'fluent:print-48-filled'} />}>
                Распечатать
              </Button>
              ,
              <NextLink href={PATH_DASHBOARD.note.new} passHref>
                <Button variant="contained" startIcon={<Iconify icon={'eva:plus-fill'} />}>
                  Создать
                </Button>
              </NextLink>
            ]
          }
        />

        <Card >
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            sx={{displayPrint: 'none'}}
            onFilterName={handleFilterByName}
            onDeleteUsers={() => handleDeleteMultiUser(selected)}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, fontSize: 6 }}>
              <Table size='small' >
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  sx={{displayPrint: 'none'}}
                  headLabel={TABLE_HEAD}
                  rowCount={list.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody colSpan={6} >
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                    const { id, name, role, summ, company, Date: date, isVerified } = row;
                    const isItemSelected = selected.indexOf(name) !== -1;

                    return (
                      <>
                          <TableRow
                            hover
                            sx={{borderTop: '2px solid #dfdfdf'}}
                            
                            key={id}
                            tabIndex={-1}
                            role="checkbox"
                            selected={isItemSelected}
                            aria-checked={isItemSelected}
                          >
                            <TableCell  sx={{fontWeight: 'bold', fontSize: 11, p: 0, textAlign: 'center'}} >
                              {index + 1}
                            </TableCell>
                            <TableCell   sx={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', fontSize: 11 }}>
                              <NextLink href={`/dashboard/note/${id}/edit`}>
                                <a> Запись № {id} от {new Date(date).toLocaleDateString()}  </a>
                              </NextLink>
                            </TableCell>
                            <TableCell  sx={{fontWeight: 'bold', fontSize: 11}} colSpan={3}>
                              {row?.object?.name}
                            </TableCell>
                            <TableCell sx={{fontWeight: 'bold', fontSize: 11}} align="left">
                                {+summ} ₽
                            </TableCell>
                            <TableCell sx={{fontWeight: 'bold', fontSize: 11, maxWidth: 240}} >{row?.description}</TableCell>
                          </TableRow>
                            {row.products.map((product) => (
                              <TableRow key={product.id}>
                                
                                <TableCell  sx={{fontWeight: 'bold', fontSize: 11, p: 0}} >
                                </TableCell>
                                <TableCell sx={{fontSize: 11}}>{product.name}</TableCell>
                                <TableCell sx={{fontSize: 11}} align="right">{+product.amount}</TableCell>
                                <TableCell sx={{fontSize: 11}}>{product.edizm}</TableCell>
                                <TableCell sx={{fontSize: 11}}>{+product.price} ₽</TableCell>
                                <TableCell sx={{fontSize: 11}}>{+product.summ} ₽</TableCell>
                                <TableCell sx={{fontSize: 11}}>{row?.seller?.name}</TableCell>
                              </TableRow>
                            ))}
                      </>
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
            sx={{
              displayPrint: 'none', 
                '@print': {
                  width: '99%',
                  m:0,
                  p:0,
                  height: '99%'
                }
            }}
            rowsPerPageOptions={[10, 25, 50, 100]}
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
