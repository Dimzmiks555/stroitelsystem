// next
import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, Link, Container, Typography } from '@mui/material';
// routes
import { PATH_AUTH } from '../../routes/paths';
// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
// sections
import { VerifyCodeForm } from '../../sections/auth/verify-code';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  height: '100%',
  alignItems: 'center',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

VerifyCode.getLayout = function getLayout(page) {
  return <Layout variant="logoOnly">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function VerifyCode() {
  return (
    <Page title="Verify" sx={{ height: 1 }}>
      <RootStyle>
        <Container>
          <Box sx={{ maxWidth: 480, mx: 'auto' }}>
            <NextLink href={PATH_AUTH.login} passHref>
              <Button
                size="small"
                startIcon={<Iconify icon={'eva:arrow-ios-back-fill'} width={20} height={20} />}
                sx={{ mb: 3 }}
              >
                Назад
              </Button>
            </NextLink>

            <Typography variant="h3" paragraph>
              Пожалуйста, проверьте вашу почту или СМС!
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Мы отправили Вам 6-значный код подтверждения на acb@domain, пожалуйста, введите код в поле ниже.
            </Typography>

            <Box sx={{ mt: 5, mb: 3 }}>
              <VerifyCodeForm />
            </Box>

            <Typography variant="body2" align="center">
              Не пришел код? &nbsp;
              <Link variant="subtitle2" underline="none" onClick={() => {}} sx={{cursor: 'pointer'}}>
                Отправить повторно
              </Link>
            </Typography>
          </Box>
        </Container>
      </RootStyle>
    </Page>
  );
}
