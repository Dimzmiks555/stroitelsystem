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
import ProductNewForm from '../../../../sections/@dashboard/people/NewForm';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
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
    fetch(`${process.env.NEXT_PUBLIC_HOST}/people/${query.name}`)
    .then(res => res.json())
    .then(json => {
      console.log(json)
      setCurrent(json)
    })
  }, [])

  return (
    <Page title="Карточка человека">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Карточка человека"
          links={[
            // { name: 'Dashboard', href: PATH_DASHBOARD.root },
            // {
            //   name: 'E-Commerce',
            //   href: PATH_DASHBOARD.eCommerce.root,
            // },
            { name: '' },
          ]}
        />
        <ProductNewForm isEdit currentProduct={current}/>
      </Container>
    </Page>
  );
}
