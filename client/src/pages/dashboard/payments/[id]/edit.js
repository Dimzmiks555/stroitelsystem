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
import NewForm from '../../../../sections/@dashboard/payments/NewForm';
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
  const [bounds, setBounds] = useState([])

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_HOST}/payment/${query.id}`)
    .then(res => res.json())
    .then(json => {
      console.log(json)
      setCurrent(json)

      if (json?.deal_id) {
        setBounds((prev) => {
          return [...prev, 'deal']
        })
      }

      if (json?.object_id) {
        setBounds((prev) => {
          return [...prev, 'object']
        })
      }

      if (json?.contragent_id) {
        setBounds((prev) => {
          return [...prev, 'contragent']
        })
      }


    })
  }, [])

  return (
    <Page title={`Платеж № ${query?.id}`}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={`Платеж № ${query?.id}`}
          links={[
            // { name: 'Dashboard', href: PATH_DASHBOARD.root },
            // {
            //   name: 'E-Commerce',
            //   href: PATH_DASHBOARD.eCommerce.root,
            // },
            { name: '' },
          ]}
        />
        <NewForm isEdit currentProduct={current} bounds={bounds}/>
      </Container>
      
    </Page>
  );
}
