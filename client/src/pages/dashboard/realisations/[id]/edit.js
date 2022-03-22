import { paramCase, capitalCase } from 'change-case';
// next
import { useRouter } from 'next/router';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';
// _mock_
import { _userList } from '../../../../_mock';
// layouts
import Layout from '../../../../layouts';
// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
// sections
import NewForm from '../../../../sections/@dashboard/realisations/NewForm';
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

UserEdit.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function UserEdit() {
  const { themeStretch } = useSettings();

  const [currentOrder, setCurrentOrder] = useState()

  const { query } = useRouter();

  const { id } = query;

  useEffect(() => {
    fetch(`http://localhost:5000/realisations/${id}`)
    .then(res => res.json())
    .then(json => {
      console.log(json)
      setCurrentOrder(json)
    })
  }, [])

  return (
    <Page title={`Реализация № ${currentOrder?.['Number']}`}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={`Реализация № ${currentOrder?.['Number']}`}
          links={[
            { name: '', href: PATH_DASHBOARD.root },
            // { name: 'User', href: PATH_DASHBOARD.user.list },
            // { name: capitalCase(name) },
          ]}
        />

        <NewForm currentUser={currentOrder} />
      </Container>
    </Page>
  );
}
