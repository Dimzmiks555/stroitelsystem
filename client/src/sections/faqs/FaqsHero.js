import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Container, Stack, InputAdornment } from '@mui/material';
// components
import Iconify from '../../components/Iconify';
import InputStyle from '../../components/InputStyle';
import { MotionContainer, TextAnimate, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  backgroundSize: 'cover',
  backgroundImage:
    'url(https://minimal-assets-api.vercel.app/assets/overlay.svg), url(https://minimal-assets-api.vercel.app/assets/images/faqs/hero.jpg)',
  padding: theme.spacing(10, 0),
  [theme.breakpoints.up('md')]: {
    height: 560,
    padding: 0,
  },
}));

const ContentStyle = styled(Stack)(({ theme }) => ({
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
    position: 'absolute',
    bottom: theme.spacing(10),
  },
}));

// ----------------------------------------------------------------------

export default function FaqsHero() {
  return (
    <RootStyle>
      <Container component={MotionContainer} sx={{ position: 'relative', height: '100%' }}>
        <ContentStyle spacing={5}>
          <div>
            <TextAnimate text="Как" sx={{ color: 'primary.main' }} variants={varFade().inRight} />
            <br />
            <Box sx={{ display: 'inline-flex', color: 'common.white' }}>
              <TextAnimate text="мы" sx={{ mr: 2 }} />
              <TextAnimate text="можем" sx={{ mr: 2 }} />
              <TextAnimate text="помочь" sx={{ mr: 2 }} />
              <TextAnimate text="Вам?" />
            </Box>
          </div>

          <m.div variants={varFade().inUp}>
            <InputStyle
              stretchStart={280}
              placeholder="Найти помощь"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify
                      icon={'eva:search-fill'}
                      sx={{ color: 'text.disabled', width: 20, height: 20 }}
                    />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: 'common.white',
                },
              }}
            />
          </m.div>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
