// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';
// layouts
import Layout from '../../../../layouts';
// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
// sections
import NewForm from '../../../../sections/@dashboard/note/NewForm';
import { useEffect, useState } from 'react';
import {useRouter} from 'next/router'

// ----------------------------------------------------------------------

EcommerceProductCreate.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function EcommerceProductCreate() {
  const { themeStretch } = useSettings();

  const { query } = useRouter()
  
  const [current, setCurrent] = useState({})

  useEffect(() => {
    fetch(`http://localhost:5000/notes/${query.id}`)
    .then(res => res.json())
    .then(json => {
      console.log(json)
      setCurrent(json)
    })
  }, [])

  return (
    <Page title="Новая запись">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Новая запись"
          links={[
            // { name: 'Dashboard', href: PATH_DASHBOARD.root },
            // {
            //   name: 'E-Commerce',
            //   href: PATH_DASHBOARD.eCommerce.root,
            // },
            { name: '' },
          ]}
        />
        <NewForm isEdit currentProduct={current}/>
      </Container>
    </Page>
  );
}
