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
import { PageNotFoundIllustration } from '../assets';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  height: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

// ----------------------------------------------------------------------

Page404.getLayout = function getLayout(page) {
  return <Layout variant="logoOnly">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function Page404() {
  return (
    <Page title="404 Страница не найдена" sx={{ height: 1 }}>
      <RootStyle>
        <Container component={MotionContainer}>
          <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
            <m.div variants={varBounce().in}>
              <Typography variant="h3" paragraph>
                Страница не найдена!
              </Typography>
            </m.div>
            <Typography sx={{ color: 'text.secondary' }}>
              Извините, мы не смогли найти страницу, которую вы искали. Возможно, вы ввели неверный URL? 
            </Typography>
            <m.div variants={varBounce().in}>
              <PageNotFoundIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
            </m.div>
            <NextLink href="/">
              <Button size="large" variant="contained">
                Главная
              </Button>
            </NextLink>
          </Box>
        </Container>
      </RootStyle>
    </Page>
  );
}
