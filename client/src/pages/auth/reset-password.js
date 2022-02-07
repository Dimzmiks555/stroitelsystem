import { useState } from 'react';
// next
import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, Container, Typography } from '@mui/material';
// routes
import { PATH_AUTH } from '../../routes/paths';
// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
// sections
import { ResetPasswordForm } from '../../sections/auth/reset-password';
// assets
import { SentIcon } from '../../assets';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

ResetPassword.getLayout = function getLayout(page) {
  return <Layout variant="logoOnly">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <Page title="Reset Password" sx={{ height: 1 }}>
      <RootStyle>
        <Container>
          <Box sx={{ maxWidth: 480, mx: 'auto' }}>
            {!sent ? (
              <>
                <Typography variant="h3" paragraph>
                  Забыли пароль?
                </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 5 }}>
                  Мы отправим вам СМС с кодом восстановления.
                </Typography>

                <ResetPasswordForm onSent={() => setSent(true)} onGetEmail={(value) => setEmail(value)} />

                <NextLink href={PATH_AUTH.login} passHref>
                  <Button fullWidth size="large" sx={{ mt: 1 }}>
                    Назад
                  </Button>
                </NextLink>
              </>
            ) : (
              <Box sx={{ textAlign: 'center' }}>
                <SentIcon sx={{ mb: 5, mx: 'auto', height: 160 }} />

                <Typography variant="h3" gutterBottom>
                  Запрос успешно отправлен
                </Typography>
                <Typography>
                  Мы отправили вам новый пароль на&nbsp;
                  <strong>{email}</strong>
                  <br />
                  Пожалуйста проверьте.
                </Typography>

                <NextLink href={PATH_AUTH.login} passHref>
                  <Button size="large" variant="contained" sx={{ mt: 5 }}>
                    Назад
                  </Button>
                </NextLink>
              </Box>
            )}
          </Box>
        </Container>
      </RootStyle>
    </Page>
  );
}
