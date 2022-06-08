// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
import { useRouter } from 'next/router';
// hooks
import useSettings from '../../../../hooks/useSettings';
// layouts
import Layout from '../../../../layouts';
// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
// sections
import NewForm from '../../../../sections/@dashboard/objects/NewForm';
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

EcommerceProductCreate.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function EcommerceProductCreate() {


  const { query } = useRouter();

  const { id } = query;
  
  const [currentObject, setCurrentObject] = useState({
    checkouts: [],
    notes: [],
  })
  const [expenses, setExpenses] = useState([])

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_HOST}/objects/${id}`)
    .then(res => res.json())
    .then(json => {

      json = {...json, 
        checkouts: json?.checkouts?.map(item => {return {...item, name: 'Реализация № ' + item?.['Number']}}),
        notes: json?.notes?.map(item => {return {...item, name: 'Запись № ' + item?.id}}),
      }

      setCurrentObject(json)

      setExpenses((prevState) => ([...prevState, ...json?.checkouts, ...json?.notes]))
      console.log(expenses)
      console.log(json)
    })
    
  }, [])

  const { themeStretch } = useSettings();

  return (
    <Page title="Добавить объект">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Добавить объект"
          links={[
            // { name: 'Dashboard', href: PATH_DASHBOARD.root },
            // {
            //   name: 'E-Commerce',
            //   href: PATH_DASHBOARD.eCommerce.root,
            // },
            { name: '' },
          ]}
        />
        <NewForm isEdit currentProduct={currentObject} expenses={expenses}/>
      </Container>
    </Page>
  );
}
