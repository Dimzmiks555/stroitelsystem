import { m } from 'framer-motion';
// next
import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, Typography, Container } from '@mui/material';
// layouts
import Layout from '../layouts';
// components
import Page from '../components/Page';
import { MotionContainer, varBounce } from '../components/animate';
// assets
import { SeverErrorIllustration } from '../assets';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  height: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

// ----------------------------------------------------------------------

Page500.getLayout = function getLayout(page) {
  return <Layout variant="logoOnly">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function Page500() {
  return (
    <Page title="500 Внутренняя ошибка сервера" sx={{ height: 1 }}>
      <RootStyle>
        <Container component={MotionContainer}>
          <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
            <m.div variants={varBounce().in}>
              <Typography variant="h2" paragraph>
                500
              </Typography>
              <Typography variant="h3" paragraph>
                Внутренняя ошибка сервера
              </Typography>
            </m.div>
            <Typography sx={{ color: 'text.secondary' }}>Произошла ошибка, повторите попытку позже.</Typography>
            <m.div variants={varBounce().in}>
              <SeverErrorIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
            </m.div>
            <NextLink href="/">
              <Button size="large" variant="contained">
                На главную
              </Button>
            </NextLink>
          </Box>
        </Container>
      </RootStyle>
    </Page>
  );
}
