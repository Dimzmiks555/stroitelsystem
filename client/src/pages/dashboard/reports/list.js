
import { useRouter } from 'next/router';
// @mui
// _mock_
import { _userList } from '../../../_mock';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import { NotesReport } from 'src/sections/@dashboard/reports/NotesReport';
import { RealisationsReport } from 'src/sections/@dashboard/reports/RealisationsReport';
import { useState } from 'react';
import { Box, Card, Tab, Tabs } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

UserList.getLayout = function getLayout(page) {
  return <Layout >{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function UserList() {
  const router = useRouter();

  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };




  return (
    <Page title="Отчеты">
      <TabContext value={value}>
        <Box sx={{ width: '100%', bgcolor: 'background.paper', displayPrint: 'none' }}>
          <Card sx={{mb:4, mx:4}}>
            <TabList onChange={handleChange} centered>
              <Tab label="Записи" value="1"/>
              <Tab label="Реализации" value="2"/>
              <Tab label="Покупки" value="3"/>
              <Tab label="Контрагенты" value="4"/>
              <Tab label="Объекты" value="5"/>
              <Tab label="Итоги" value="6"/>
            </TabList>
          </Card>
        </Box>
        <TabPanel value="1">
          <NotesReport></NotesReport>
        </TabPanel>
        <TabPanel value="2">
          <RealisationsReport></RealisationsReport>
        </TabPanel>
      </TabContext>
    </Page>
  );
}

// ----------------------------------------------------------------------
