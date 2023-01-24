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
  List,
  TableHead,
  Tabs,
  Tab,
  TextField,
  Box,
  Autocomplete,
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
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { DatePicker } from '@mui/lab';
// sections


UserList.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

const sortDict = {
  0: 'summ',
  1: 'amount',
  2: 'count'
}

// ----------------------------------------------------------------------

export default function UserList() {

  const { themeStretch } = useSettings();
  const [list, setList] = useState([])
  const [sellerId, setSellerId] = useState(null)
  const [contragents, setContragents] = useState([])
  const [filter, setFilter] = useState(0);
  const [search, setSearch] = useState('');
  const [startDate, setStartDate] = useState(new Date(0));
  const [endDate, setEndDate] = useState(new Date());


  useEffect(()=> {
    fetch(`${process.env.NEXT_PUBLIC_HOST}/note-products/stats?order=${sortDict[filter]}&search=${search}&startDate=${startDate}&endDate=${endDate}&seller_id=${sellerId}`)
    .then(res => res.json())
    .then(json => {
      console.log(json)
      setList(json)
    })
    fetch(`${process.env.NEXT_PUBLIC_HOST}/contragents`)
    .then((res) => res.json())
    .then((json) => {
      let list = json.map((item) => {
        return { label: item.name, value: item.id };
      });

      setContragents(list);
    });

  }, [filter, search, startDate, endDate, sellerId])

  const handleChange = (event, newValue) => {
    setFilter(newValue);
  };

  const handleSeller = (e, option) => {
    setSellerId(+option?.value || null)
  }

  return (
    <Page title="Аналитика по товарам">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Аналитика по товарам"
          links={[
            // { name: 'Dashboard', href: PATH_DASHBOARD.root },
            // { name: 'User', href: PATH_DASHBOARD.user.root },
            { name: '' },
          ]}
        />
        <TextField 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
        placeholder='Поиск по наименованию...' 
        size="small" 
        sx={{mb:2, minWidth: 300}}
        ></TextField>
        
        <Autocomplete
          size="small"
          freeSolo
          onChange={handleSeller}
          options={contragents}
          renderInput={(params) => <TextField label="Поставщик" {...params} sx={{width: '320px', mb: 4}} />}
        />
        <Box>
          <DatePicker
            orientation="landscape"
            openTo="day"
            label="Дата начальная"
            value={startDate}
            onChange={(newValue) => {
              setStartDate(newValue);
            }}
            mask='__/__/____'
            inputFormat="dd/MM/yyyy"
            renderInput={(params) => <TextField size="small"  {...params} sx={{mb:2, mr:3}} />}
          />
          <DatePicker
            orientation="landscape"
            openTo="day"
            label="Дата конечная"
            value={endDate}
            onChange={(newValue) => {
              setEndDate(newValue);
            }}
            mask='__/__/____'
            inputFormat="dd/MM/yyyy"
            renderInput={(params) => <TextField size="small"  {...params} sx={{mb:2}} />}
          />
        </Box>
        <h3>Сортировать по</h3>
        <Tabs value={filter} onChange={handleChange} sx={{mb: 2, mt:1}} >
          <Tab label="Сумме" />
          <Tab label="Количеству" />
          <Tab label="Вхождениям" />
        </Tabs>

        <Card>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Наименование</TableCell>
                  <TableCell>Количество </TableCell>
                  <TableCell>Ед. изм.</TableCell>
                  <TableCell>Сумма</TableCell>
                  <TableCell>Вхождений</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {list?.map(item => (
                  <TableRow>
                    <TableCell>{item?.name}</TableCell>
                    <TableCell sx={{textAlign: 'right'}}>{(+item?.total_amount)?.toFixed(2)}</TableCell>
                    <TableCell>{item?.edizm}</TableCell>
                    <TableCell sx={{textAlign: 'right'}}>{(Math.round(+item?.total_summ))?.toLocaleString(undefined, {minimumFractionDigits: 2 })}₽</TableCell>
                    <TableCell>{item?.total_count} вхожд.</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
        </Card>
      </Container>
    </Page>
  );
}
