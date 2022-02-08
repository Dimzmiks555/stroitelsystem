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
import ProductNewForm from '../../../../sections/@dashboard/objects/ProductNewForm';

// ----------------------------------------------------------------------

EcommerceProductCreate.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function EcommerceProductCreate() {
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
        <ProductNewForm />
      </Container>
    </Page>
  );
}
