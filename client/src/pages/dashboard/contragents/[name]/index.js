// @mui
import { Button, Container } from '@mui/material';
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
import ProductNewForm from '../../../../sections/@dashboard/contragents/NewForm';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import Iconify from 'src/components/Iconify';

// ----------------------------------------------------------------------

EcommerceProductCreate.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function EcommerceProductCreate() {
  const { themeStretch } = useSettings();

  const [currentOrder, setCurrentOrder] = useState()

  const { query } = useRouter();

  const { name } = query;

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_HOST}/contragents/${name}`)
    .then(res => res.json())
    .then(json => {
      console.log(json)
      setCurrentOrder(json)
    })
  }, [])

  const handlePrint = () => {
    window.focus()
    window.print()
  }

  return (
    <Page title={currentOrder?.name}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={currentOrder?.name}
          action={
            <Button onClick={handlePrint} sx={{mr: 6, displayPrint: 'none'}} color="warning" variant="contained" startIcon={<Iconify icon={'fluent:print-48-filled'} />}>
                Распечатать
              </Button>}
          links={[
            // { name: 'Dashboard', href: PATH_DASHBOARD.root },
            // {
            //   name: 'E-Commerce',
            //   href: PATH_DASHBOARD.eCommerce.root,
            // },
            { name: '' },
          ]}
        />
        <ProductNewForm isEdit currentProduct={currentOrder}/>
      </Container>
    </Page>
  );
}
