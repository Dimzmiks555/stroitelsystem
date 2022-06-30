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
  { id: 'type', label: 'Тип', alignRight: false },
  { id: 'payment_method', label: 'Способ оплаты', alignRight: false },
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

    fetch(`${process.env.NEXT_PUBLIC_HOST}/payment`)
    .then(res => res.json())
    .then(json => {
      console.log(json)
      setList(json?.rows)
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



  return (
    <Page title="Платежи">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Платежи"
          links={[
            // { name: 'Dashboard', href: PATH_DASHBOARD.root },
            // { name: 'User', href: PATH_DASHBOARD.user.root },
            { name: '' },
          ]}
          action={
            <NextLink href={PATH_DASHBOARD.payments.new} passHref>
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
                  {list?.map((row) => {
                    const { id, name, role, summ, company, date, isVerified } = row;
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
                            {(row?.contragent_id || row?.object_id || row?.deal_id) ? (
                              <Avatar sx={{mr: 2, background: '#edf'}}>
                                <Iconify icon="mdi:attachment-check" sx={{color: '#00d'}}></Iconify>
                              </Avatar>
                            ) : (
                              <Avatar sx={{mr: 2, background: '#fed'}}>
                                <Iconify icon="mdi:attachment-remove" sx={{color: '#d00'}}></Iconify>
                              </Avatar>
                            )}
                            {row?.type == 'start' ? (
                              <Avatar sx={{mr: 2, background: '#faa'}}>
                                <Iconify icon="ant-design:arrow-up-outlined" sx={{color: '#d00'}}></Iconify>
                              </Avatar>
                            ) : (
                              <Avatar sx={{mr: 2, background: '#aea'}}>
                                <Iconify icon="ant-design:arrow-down-outlined" sx={{color: '#0a4'}}></Iconify>
                              </Avatar>
                            )}
                          <NextLink href={`/dashboard/payments/${id}/edit`}>
                              <a><Chip sx={{cursor: 'pointer'}} variant='outlined' color="primary" label={`Платеж № ${id}`}></Chip></a>
                          </NextLink>
                        </TableCell>
                        <TableCell align="left">{row?.type == 'end' ? 'Входящий' : 'Исходящий'}</TableCell>
                        <TableCell align="left">{row?.payment_method}</TableCell>
                        <TableCell align="left">

                          {row?.object_id && (
                            
                            <NextLink href={`/dashboard/objects/${row?.object_id}`}>
                              <a style={{display: 'block'}}>Объект № {row?.object_id}</a>
                            </NextLink>
                          )}

                          {row?.deal_id && (
                            <NextLink href={`/dashboard/deals/${row?.deal_id}/edit`}>
                            <a style={{display: 'block'}}>Сделка № {row?.deal_id}</a>
                            </NextLink>
                          )}

                          {row?.contragent_id && (
                            <NextLink href={`/dashboard/contragents/${row?.contragent_id}/`}>
                            <a style={{display: 'block'}}>Контрагент № {row?.contragent_id}</a>
                            </NextLink>
                          )}
                        
                        </TableCell>
                        <TableCell align="left">
                            {summ} руб.
                        </TableCell>

                        <TableCell >
                          {new Date(row?.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell sx={{width: '25%'}}>
                          {row?.description}
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
