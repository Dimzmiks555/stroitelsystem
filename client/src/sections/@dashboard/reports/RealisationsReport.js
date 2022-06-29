import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
// next
import NextLink from 'next/link';
import { useRouter } from 'next/router';
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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// sections
import { UserListHead, UserListToolbar, UserMoreMenu } from '../../../sections/@dashboard/reports/list';


const TABLE_HEAD = [
    { id: 'number', label: '№', alignRight: false },
    { id: 'Date', label: 'Дата / Наименование', alignRight: false },
    { id: 'name', label: 'Кол-во', alignRight: false },
    { id: 'company', label: 'Ед. изм.', alignRight: false },
    { id: 'role', label: 'Цена', alignRight: false },
    { id: 'isVerified', label: 'Сумма', alignRight: false },
    { id: 'role', label: 'Описание', alignRight: false },
];


export const RealisationsReport = () => {

    const theme = useTheme();
    const router = useRouter();

    const { themeStretch } = useSettings();

    const [list, setList] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [objectId, setObjectId] = useState(1);
    const [objects, setObjects] = useState([]);
  
    const [page, setPage] = useState(0);
  
    const [order, setOrder] = useState('desc');
  
    const [selected, setSelected] = useState([]);
  
    const [orderBy, setOrderBy] = useState('Date');
  
    const [filterName, setFilterName] = useState('');
  
    const [rowsPerPage, setRowsPerPage] = useState(100);
  
    const [open, setOpen] = useState(false);
  
      const handleOpen = () => {
          setOpen(true);
      };
    
      const handleClose = () => {
          setOpen(false);
      };
  
    useEffect(()=> {
  
      fetch(`${process.env.NEXT_PUBLIC_HOST}/checkouts?isChecked=0`)
      .then(res => res.json())
      .then(jsonData => {
        setList(jsonData)
        setFiltered(jsonData)

        fetch(`${process.env.NEXT_PUBLIC_HOST}/objects`)
        .then((res) => res.json())
        .then((json) => {

          let filteredList = json.filter(object => {

            let trueArray = false

            jsonData.forEach(note => {
              if (object.id == note?.object_id) {
                trueArray = true
              }
            })

            return trueArray

          })

          let list = filteredList.map((item) => {
            return { label: item.name, value: item.id };
          });

          setObjects(list);
        });

      })
  
  
    }, [])

    useEffect(()=> {
      console.log(objectId)
      if (objectId != 0) {
        setFiltered(list.filter(item => item?.object_id == objectId))
      } else {
        setFiltered(list)
      }
  
    }, [objectId])
  
    const handleRequestSort = (property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };
  
    
  
    const handleSelectAllClick = (checked) => {
      if (checked) {
        const newSelecteds = list.map((n) => n.id);
        setSelected(newSelecteds);
        return;
      }
      setSelected([]);
    };
  
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    const handleFilterByName = (filterName) => {
      setFilterName(filterName);
      setPage(0);
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
  
    
    const handleSetReport = () => {
  
      Promise.all(selected.map(id => {
        return fetch(`${process.env.NEXT_PUBLIC_HOST}/checkouts/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            isChecked: true
          })
  
        })
      }))
      .then(json => {
        router.reload()
        console.log(json)
      })
  
  
  
    }
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

      
      const handleChangeObject = (e, newValue) => {
      
        if (newValue) {
          setObjectId(newValue.value)
        } else {
          setObjectId(0)
        }
  
      }


    return (
        <Container maxWidth={themeStretch ? false : 'lg'} >
            <HeaderBreadcrumbs
            sx={{displayPrint: 'none'}}
            heading={`Отчет по реализациям от ${new Date().toLocaleDateString()} г. ` }
            links={[
                // { name: 'Dashboard', href: PATH_DASHBOARD.root },
                // { name: 'User', href: PATH_DASHBOARD.user.root },
                { name: '' },
            ]}
            action={
                [
                <Button onClick={handleOpen} disabled={selected.length == 0} sx={{mr: 6, color: 'white'}} color="success" variant="contained" startIcon={<Iconify icon={'akar-icons:double-check'} />}>
                    Сдать отчет
                </Button>
                ,
                <Button onClick={handlePrint} sx={{mr: 6, color: 'white'}} color="warning" variant="contained" startIcon={<Iconify icon={'fluent:print-48-filled'} />}>
                    Распечатать
                </Button>
                ]
            }
            />
            <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">
                {"Подтвердить сдачу отчета?"}
            </DialogTitle>
            <DialogContent>
                {/* <DialogContentText id="alert-dialog-description">
                Let Google help apps determine location. This means sending anonymous
                location data to Google, even when no apps are running.
                </DialogContentText> */}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Отменить</Button>
                <Button onClick={handleSetReport} sx={{color: 'white'}} color="success" variant="contained" autoFocus>
                Сдать
                </Button>
            </DialogActions>
            </Dialog>
            <Card >
            <UserListToolbar
                numSelected={selected.length}
                filterName={filterName}
                handleChangeObject={handleChangeObject}
                objects={objects}
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
                    {filtered.map((row, index) => {
                        const { id, name, role, summ_after_discount, company, Date: date, isVerified } = row;
                        const isItemSelected = selected.indexOf(id) !== -1;

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
                                <TableCell padding="checkbox">
                                    <Checkbox checked={isItemSelected} onClick={() => handleClick(id)} />
                                </TableCell>
                                <TableCell  sx={{fontWeight: 'bold', fontSize: 11, p: 0, textAlign: 'center'}} >
                                    <Chip color={row?.isChecked ? 'success' : 'error'} label={index + 1}></Chip> 
                                </TableCell>
                                <TableCell   sx={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', fontSize: 11 }}>
                                <NextLink href={`/dashboard/checkouts/${id}/edit`}>
                                    <a> Реализация № {row?.Number} от {new Date(date).toLocaleDateString()}  </a>
                                </NextLink>
                                    {row?.isUpdatedAfterCheck && <Chip sx={{p: 0,ml: 2, color: 'white', fontSize: 12}} color="warning" label="Изменено"></Chip>}
                                </TableCell>
                                <TableCell  sx={{fontWeight: 'bold', fontSize: 11}} colSpan={3}>
                                {row?.object?.name}
                                </TableCell>
                                <TableCell sx={{fontWeight: 'bold', fontSize: 11}} align="left">
                                    {+summ_after_discount} ₽
                                </TableCell>
                                <TableCell sx={{fontWeight: 'bold', fontSize: 11, maxWidth: 240}} >{row?.description} ({row?.person?.surname} {row?.person?.name})</TableCell>
                            </TableRow>
                                {row.products.map((product) => (
                                <TableRow key={product.id}>
                                    
                                    <TableCell padding="checkbox"></TableCell>
                                    <TableCell  sx={{fontWeight: 'bold', fontSize: 11, p: 0}} >
                                    </TableCell>
                                    <TableCell sx={{fontSize: 11}}>{product.name}</TableCell>
                                    <TableCell sx={{fontSize: 11}} align="right">{+product.amount}</TableCell>
                                    <TableCell sx={{fontSize: 11}}>{product.edizm}</TableCell>
                                    <TableCell sx={{fontSize: 11}}>{+product.price_after_discount} ₽</TableCell>
                                    <TableCell sx={{fontSize: 11}}>{+product.summ_after_discount} ₽</TableCell>
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
                rowsPerPageOptions={[10, 25, 50, 100, 200]}
                component="div"
                count={list.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(e, page) => setPage(page)}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            </Card>
        </Container>
    )
}



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
  