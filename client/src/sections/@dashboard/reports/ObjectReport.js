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
  Autocomplete,
  TextField,
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
import { UserListHead, UserListToolbar, UserMoreMenu } from './list';
import { id } from 'date-fns/locale';


const TABLE_HEAD = [
    { id: 'number', label: '№', alignRight: false },
    { id: 'Date', label: 'Дата / Наименование', alignRight: false },
    { id: 'name', label: 'Кол-во', alignRight: false },
    { id: 'company', label: 'Ед. изм.', alignRight: false },
    { id: 'role', label: 'Цена', alignRight: false },
    { id: 'isVerified', label: 'Сумма', alignRight: false },
    { id: 'role', label: 'Описание', alignRight: false },
];


export const ObjectReport = () => {

    const theme = useTheme();
    const router = useRouter();

    const { themeStretch } = useSettings();

    const [list, setList] = useState([]);
    const [data, setData] = useState([]);
    const [objectId, setObjectId] = useState(1);
    const [objects, setObjects] = useState([]);
  
    const [page, setPage] = useState(0);
  
    const [order, setOrder] = useState('desc');
  
    const [selected, setSelected] = useState([]);
  
    const [orderBy, setOrderBy] = useState('Date');
  
    const [filterName, setFilterName] = useState('');
  
    const [rowsPerPage, setRowsPerPage] = useState(1000);
  
  
  
    useEffect(()=> {
  
      fetch(`${process.env.NEXT_PUBLIC_HOST}/expense?object_id=${objectId}`)
      .then(res => res.json())
      .then(json => {
        console.log(json)
        setList(json?.expenses)
        setData(json)
      })

      fetch(`${process.env.NEXT_PUBLIC_HOST}/objects`)
      .then((res) => res.json())
      .then((json) => {
        let list = json.map((item) => {
          return { label: item.name, value: item.id };
        });

        setObjects(list);
      });
  
  
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
  
  
  
    const handlePrint = () => {
      window.focus()
      window.print()
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
      setObjectId(newValue.value)
    }



    return (
        <Container maxWidth={themeStretch ? false : 'lg'} >
            <HeaderBreadcrumbs
            sx={{displayPrint: 'none'}}
            heading={`Отчет по объекту от ${new Date().toLocaleDateString()} г. ` }
            links={[
                // { name: 'Dashboard', href: PATH_DASHBOARD.root },
                // { name: 'User', href: PATH_DASHBOARD.user.root },
                { name: '' },
            ]}
            action={
                [
                <Button onClick={handlePrint} sx={{mr: 6, color: 'white'}} color="warning" variant="contained" startIcon={<Iconify icon={'fluent:print-48-filled'} />}>
                    Распечатать
                </Button>
                ]
            }
            />
            <Card >
              <Box sx={{display: 'flex'}}>
                <Card sx={{color: 'white', m: 2, p:2, width: '25%', background: 'linear-gradient(90deg, #65f, #a7d)'}}>
                  <h3>Объект</h3>
                  <Autocomplete
                    freeSolo
                    size="small"
                    sx={{width: 320, mt: 1}}
                    onChange={handleChangeObject}
                    options={objects}
                    renderInput={(params) => <TextField sx={{background: 'white', borderRadius: 1}} placeholder='Выберите' {...params} />}
                  />
                </Card>
                <Card sx={{color: 'white', m: 2, p:2, width: '25%', background: 'linear-gradient(90deg, #f65, #d7a)'}}>
                  <h3>Общий расход</h3>
                  <h3 style={{fontSize: 42}}>{data?.end_balance} ₽</h3>
                </Card>
                <Card sx={{color: 'white', m: 2, p:2, width: '25%', background: 'linear-gradient(90deg, #fa6, #c93)'}}>
                  <h3>Общий доход</h3>
                  <Autocomplete
                    freeSolo
                    size="small"
                    sx={{width: 320, mt: 1}}
                    onChange={handleChangeObject}
                    options={objects}
                    renderInput={(params) => <TextField sx={{background: 'white', borderRadius: 1}} placeholder='Выберите' {...params} />}
                  />
                </Card>
                <Card sx={{color: 'white', m: 2, p:2, width: '25%', background: 'linear-gradient(90deg, #3d5, #7da)'}}>
                  <h3>Чистая прибыль</h3>
                  <Autocomplete
                    freeSolo
                    size="small"
                    sx={{width: 320, mt: 1}}
                    onChange={handleChangeObject}
                    options={objects}
                    renderInput={(params) => <TextField sx={{background: 'white', borderRadius: 1}} placeholder='Выберите' {...params} />}
                  />
                </Card>
                
              </Box>
              <Box sx={{display: 'flex'}}>
                
                
              </Box>

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
                    <TableRow
                        hover
                        sx={{borderTop: '2px solid #dfdfdf'}}
                        tabIndex={-1}
                    >
                        
                        <TableCell padding="checkbox">
                          
                        </TableCell>
                        <TableCell  sx={{fontWeight: 'bold', fontSize: 11, p: 0, textAlign: 'center'}} >
                        
                        </TableCell>
                        <TableCell   sx={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', fontSize: 11 }}>
                            Начальное сальдо c {new Date(data?.object?.initial_balance_date)?.toLocaleDateString()}
                        </TableCell>
                        <TableCell  sx={{fontWeight: 'bold', fontSize: 11}} colSpan={3}>
                        </TableCell>
                        <TableCell sx={{fontWeight: 'bold', fontSize: 11}} align="left">
                          {data?.start_balance}
                        </TableCell>
                        <TableCell sx={{fontWeight: 'bold', fontSize: 11, maxWidth: 240}} ></TableCell>
                    </TableRow>
                    {list.map((row, index) => {
                        const { id, name, role, summ, company, Date: date, isVerified } = row;
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
                                <NextLink href={`/dashboard/note/${id}/edit`}>
                                    <a> {row?.type == 'checkout' ? 'Реализация' : row?.type == 'note' ? 'Запись' : null } № {id} от {new Date(date).toLocaleDateString()}  </a>
                                </NextLink>
                                    {row?.isUpdatedAfterCheck && <Chip sx={{p: 0,ml: 2, color: 'white', fontSize: 12}} color="warning" label="Изменено"></Chip>}
                                </TableCell>
                                <TableCell  sx={{fontWeight: 'bold', fontSize: 11}} colSpan={3}>
                                {row?.object?.name}
                                </TableCell>
                                <TableCell sx={{fontWeight: 'bold', fontSize: 11}} align="left">
                                    {row?.type == 'note' ? +summ : +row?.summ_after_discount} ₽
                                </TableCell>
                                <TableCell sx={{fontWeight: 'bold', fontSize: 11, maxWidth: 240}} >{row?.description} ({row?.person?.surname} {row?.person?.name})</TableCell>
                            </TableRow>
                                {row?.products?.map((product) => (
                                <TableRow key={product.id}>
                                    
                                  <TableCell padding="checkbox">
                                    
                                  </TableCell>
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
                    <TableRow
                        hover
                        sx={{borderTop: '2px solid #dfdfdf'}}
                        tabIndex={-1}
                    >
                        
                        <TableCell padding="checkbox">
                          
                        </TableCell>
                        <TableCell  sx={{fontWeight: 'bold', fontSize: 11, p: 0, textAlign: 'center'}} >
                        
                        </TableCell>
                        <TableCell   sx={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', fontSize: 11 }}>
                            Конечное сальдо
                        </TableCell>
                        <TableCell  sx={{fontWeight: 'bold', fontSize: 11}} colSpan={3}>
                        </TableCell>
                        <TableCell sx={{fontWeight: 'bold', fontSize: 11}} align="left">
                          {data?.end_balance}
                        </TableCell>
                        <TableCell sx={{fontWeight: 'bold', fontSize: 11, maxWidth: 240}} ></TableCell>
                    </TableRow>
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

