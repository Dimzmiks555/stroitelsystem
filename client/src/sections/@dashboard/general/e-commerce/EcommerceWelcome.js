// @mui
import { styled } from '@mui/material/styles';
import { Typography, Button, Card, CardContent } from '@mui/material';
//
import { MotivationIllustration } from '../../../../assets';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  backgroundColor: theme.palette.primary.lighter,
  [theme.breakpoints.up('md')]: {
    height: '100%',
    display: 'flex',
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
}));

// ----------------------------------------------------------------------

export default function EcommerceWelcome() {
  return (
    <RootStyle>
      <CardContent
        sx={{
          color: 'grey.800',
          p: { md: 0 },
          pl: { md: 5 }
        }}
      >
        <Typography gutterBottom variant="h4">
          Поздравляем,
          <br /> Афанасьев Николай!
        </Typography>

        <Typography variant="body2" sx={{ pb: { xs: 3, xl: 5 }, maxWidth: 480, mx: 'auto' }}>
          Бестселлер месяца - Вы совершили более 57.6%  продаж сегодня.
        </Typography>

        <Button variant="contained">Перейти</Button>
      </CardContent>

      <MotivationIllustration
        sx={{
          p: 3,
          width: 360,
          margin: { xs: 'auto', md: 'inherit' }
        }}
      />
    </RootStyle>
  );
}
