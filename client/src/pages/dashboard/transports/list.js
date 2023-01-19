import { useRouter } from 'next/router';
// @mui
// _mock_
import { _userList } from '../../../_mock';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  TextField,
} from '@mui/material';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

UserList.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function UserList() {
  const [name, setName] = useState('');
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_HOST}/transport`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setList(json);
      });
  }, []);

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    fetch(`${process.env.NEXT_PUBLIC_HOST}/transport`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name,
      }),
    });
  };

  return (
    <Page title="Отчеты">
      <Box sx={{ width: '100%', bgcolor: 'background.paper', displayPrint: 'none', mx: 4 }}>
        <h1 style={{ marginBottom: 20 }}>Транспорт</h1>
        <Card sx={{ p: 4, display: 'flex', mb: 2 }}>
          <TextField value={name} onChange={handleChange} placeholder="Наименование..." sx={{ mr: 3 }} />
          <Button sx={{ px: 4 }} variant="contained" onClick={handleSubmit}>
            Создать
          </Button>
        </Card>
        <Card sx={{ p: 4 }}>
          <Table>
            <TableHead></TableHead>
            <TableBody>
              {list?.map((item) => (
                <TableRow>
                  <TableCell>{item?.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </Box>
    </Page>
  );
}

// ----------------------------------------------------------------------
