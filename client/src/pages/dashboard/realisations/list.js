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
import { RealisationsListHead, RealisationsListToolbar, RealisationsMoreMenu } from '../../../sections/@dashboard/realisations/list';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'Number', label: 'Номер', alignRight: false },
  { id: 'seller', label: 'Продавец', alignRight: false },
  { id: 'buyer', label: 'Покупатель', alignRight: false },
  { id: 'summ', label: 'Сумма', alignRight: false },
  { id: 'sklad', label: 'Склад', alignRight: false },
  { id: 'createdAt', label: 'Дата создания', alignRight: false },
];

// ----------------------------------------------------------------------

UserList.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function UserList() {
  const theme = useTheme();

  const { themeStretch } = useSettings();

  const [realisationsList, setList] = useState([]);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('desc');

  const [selected, setSelected] = useState([]);
  
  const [tab, setTab] = useState(0);

  const [orderBy, setOrderBy] = useState('createdAt');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(25);

  useEffect(()=> {

    fetch('http://localhost:5000/realisations')
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
      const newSelecteds = realisationsList.map((n) => n.name);
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
    const deleteUser = realisationsList.filter((user) => user.id !== userId);
    setSelected([]);
    setList(deleteUser);
  };

  const handleDeleteMultiUser = (selected) => {
    const deleteUsers = realisationsList.filter((user) => !selected.includes(user.name));
    setSelected([]);
    setList(deleteUsers);
  };


  const handleTab = (event, newValue) => {
    setTab(newValue);
  };


  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - realisationsList.length) : 0;

  const filteredUsers = applySortFilter(realisationsList, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && Boolean(filterName);

  

  return (
    <Page title="Реализации">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Реализации"
          links={[
            // { name: 'Dashboard', href: PATH_DASHBOARD.root },
            // { name: 'User', href: PATH_DASHBOARD.user.root },
            { name: '' },
          ]}
        />

        <Card>
          <RealisationsListToolbar
            numSelected={selected.length}
            filterName={filterName}
            value={tab}
            handleChange={handleTab}
            onFilterName={handleFilterByName}
            onDeleteUsers={() => handleDeleteMultiUser(selected)}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <RealisationsListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={realisationsList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {realisationsList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, Number, role, status, company, Date: createdAt, Ref_Key } = row;
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
                        <TableCell padding="checkbox">
                          <Checkbox checked={isItemSelected} onClick={() => handleClick(name)} />
                        </TableCell>
                        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                          <NextLink href={`/dashboard/realisations/${Ref_Key}/edit`}>
                            {Number}
                          </NextLink>
                        </TableCell>
                        <TableCell align="left">{row['Ответственный']?.['Description']}</TableCell>
                        <TableCell align="left">{row['Контрагент']?.['Description']}</TableCell>
                        <TableCell align="left">{row['СуммаДокумента'] } руб.</TableCell>
                        <TableCell align="left">{row['Склад']?.['Description']}</TableCell>
                        <TableCell align="left">{new Date(createdAt).toLocaleDateString()}</TableCell>
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
            count={realisationsList.length}
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
