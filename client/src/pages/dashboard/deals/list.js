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
  { id: 'date', label: 'Дата', alignRight: false },
  { id: 'name', label: 'Имя', alignRight: false },
  { id: 'contract', label: 'Договор', alignRight: false },
  { id: 'company', label: 'Компания', alignRight: false },
  { id: 'start_summ', label: 'Закупка', alignRight: false },
  { id: 'end_summ', label: 'Продажа', alignRight: false },
  { id: 'status', label: 'Статус', alignRight: false },
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

  const [order, setOrder] = useState('desc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('date');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(()=> {

    fetch(`${process.env.NEXT_PUBLIC_HOST}/deals`)
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

  return (
    <Page title="Сделки">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Сделки"
          links={[
            // { name: 'Dashboard', href: PATH_DASHBOARD.root },
            // { name: 'User', href: PATH_DASHBOARD.user.root },
            { name: '' },
          ]}
          action={
            <NextLink href={PATH_DASHBOARD.deals.new} passHref>
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
                    const { id, name, role, company, avatarUrl, isVerified } = row;
                    const isItemSelected = selected.indexOf(name) !== -1;

                    const start_payments = row?.payments?.filter(item => item?.type == 'start')
                    let start_status = 'none'
                    let start_payments_summ = start_payments?.reduce((prev,now) => prev + +now?.summ, 0)
                    // console.log(start_payments_summ, +row?.start_summ)
                    if (start_payments_summ == 0) {
                      start_status = "none"
                    } else if (start_payments_summ >= +row?.start_summ) {
                      start_status = "full"
                    } else if (start_payments_summ < +row?.start_summ) {
                      start_status = "part"
                    }

                    const end_payments = row?.payments?.filter(item => item?.type == 'end')
                    let end_status = 'none'
                    let end_payments_summ = end_payments?.reduce((prev,now) => prev + +now?.summ, 0)
                    // console.log(start_payments_summ, +row?.end_summ)
                    if (end_payments_summ == 0) {
                      end_status = "none"
                    } else if (end_payments_summ >= +row?.end_summ) {
                      end_status = "full"
                    } else if (end_payments_summ < +row?.end_summ) {
                      end_status = "part"
                    }



                    return (
                      <TableRow
                        hover
                        key={id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell >
                            {new Date(row?.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell >
                          <NextLink href={`/dashboard/deals/${id}/edit`}>
                          <a >
                            Сделка № Т-{row?.deal_number} 
                          </a>
                          </NextLink>
                          <p>{row?.name}</p>
                        </TableCell>
                        <TableCell align="left">
                          
                          <p style={{fontWeight: 'bold', fontSize: 14, color: '#88d'}}>{row?.seller?.name}</p>
                          Договор № {row?.contract?.contract_number} от {new Date(row?.contract?.date).toLocaleDateString()}
                          
                          {/* <p>{row?.contract?.description}</p> */}
                        </TableCell>
                        <TableCell align="left" >{row?.buyer?.name}</TableCell>
                        <TableCell align="left" sx={{
                          fontWeight: 'bold',
                          backgroundColor: start_status == 'full' ? '#5d5': start_status == 'part' ? '#d55': 'none',
                          color: start_status == 'full' ? '#fff': start_status == 'part' ? '#fff': '#333'
                        }} >{row?.start_summ}</TableCell>
                        
                        <TableCell align="left" sx={{
                          fontWeight: 'bold',
                          backgroundColor: end_status == 'full' ? '#5d5': end_status == 'part' ? '#d55': 'none',
                          color: end_status == 'full' ? '#fff': end_status == 'part' ? '#fff': '#333'
                        }} >{row?.end_summ}</TableCell>
                        <TableCell align="left">
                          <Chip color={
                            row?.status == 'В РАБОТЕ' ? 'primary':
                            row?.status == 'ОЖИДАЕТ ВЫСТАВЛЕНИЯ' ? 'warning':
                            row?.status == 'ВЫСТАВЛЕН' ? 'success': 'default'
                          } label={row?.status}></Chip>
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
            rowsPerPageOptions={[10, 25]}
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
    return array.filter((_user) => {
      console.log(_user)
      return _user.deal_number == query
    });
  }
  return stabilizedThis.map((el) => el[0]);
}
