// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import NewForm from '../../../sections/@dashboard/checkouts/NewForm';

// ----------------------------------------------------------------------

UserCreate.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function UserCreate() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Новое списание">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Новое списание"
          links={[
            // { name: 'Dashboard', href: PATH_DASHBOARD.root },
            // { name: 'User', href: PATH_DASHBOARD.user.list },
            { name: '' },
          ]}
        />
        <NewForm />
      </Container>
    </Page>
  );
}
