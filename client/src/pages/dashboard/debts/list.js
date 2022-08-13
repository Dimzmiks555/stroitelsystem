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
  FormControl,
  TextField,
  Stack,
  Autocomplete,
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
import { UserListHead, UserListToolbar, UserMoreMenu } from '../../../sections/@dashboard/user/list';
import { Controller, useForm } from 'react-hook-form';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'date', label: 'Дата', alignRight: false },
  { id: 'name', label: 'Имя', alignRight: false },
  { id: 'contract', label: 'Договор', alignRight: false },
  { id: 'company', label: 'Компания', alignRight: false },
  { id: 'start_summ', label: 'Закупка', alignRight: false },
  { id: 'end_summ', label: 'Продажа', alignRight: false },
  { id: 'minus_ten', label: '-10%', alignRight: false },
  { id: 'incoming', label: 'Доход', alignRight: false },
  // { id: 'status', label: 'Статус', alignRight: false },
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
  const [contragents, setContragents] = useState([]);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('desc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('date');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(100);


  const { register, handleSubmit, watch, formState: { errors }, control } = useForm();

  useEffect(()=> {

    fetch(`${process.env.NEXT_PUBLIC_HOST}/debt`)
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


  }, [])

  const onSubmit = (data) => {
    console.log(data)

    data.debtor_id = data.debtor_id?.value
    data.creditor_id = data.creditor_id?.value


    fetch(`${process.env.NEXT_PUBLIC_HOST}/debt`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then((res) => res.json)
    .then((json) => {
      console.log(json);
    });

  }


  return (
    <Page title="Долги">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Долги"
          links={[
            // { name: 'Dashboard', href: PATH_DASHBOARD.root },
            // { name: 'User', href: PATH_DASHBOARD.user.root },
            { name: '' },
          ]}
          // action={
          //   <NextLink href={PATH_DASHBOARD.deals.new} passHref>
          //     <Button variant="contained" startIcon={<Iconify icon={'eva:plus-fill'} />}>
          //       Создать
          //     </Button>
          //   </NextLink>
          // }
        />

        <Card sx={{p:3}}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={3} direction='row'>
                <FormControl>
                  <label>Сумма</label>
                  <TextField type="number" {...register("summ")}></TextField>
                </FormControl>
                <FormControl>
                  <label>Кто должен</label>
                  {/* <TextField type="number" {...register("debtor_id")}></TextField> */}
                  <Controller
                    name="debtor_id"
                    control={control}
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        // size="small"
                        freeSolo
                        sx={{mb:1}}
                        onChange={(event, newValue) => field.onChange(newValue)}
                        options={contragents}
                        renderInput={(params) => <TextField sx={{width: '400px'}}  {...params} />}
                      />
                    )}
                  />
                </FormControl>
                <FormControl>
                  <label>Кому должны</label>
                  <Controller
                    name="creditor_id"
                    control={control}
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        // size="small"
                        freeSolo
                        sx={{mb:1}}
                        onChange={(event, newValue) => field.onChange(newValue)}
                        options={contragents}
                        renderInput={(params) => <TextField sx={{width: '400px'}}  {...params} />}
                      />
                    )}
                  />
                </FormControl>
                <Button type="submit" variant='contained'>Создать</Button>
              </Stack>
            </form>
            <Box>
              {list?.map(debt => (
                <Box>
                  У {debt?.debtor?.name} задолженность перед {debt?.creditor?.name} на сумму  {debt?.summ} рублей
                </Box>
              ))}
            </Box>
        </Card>
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------
