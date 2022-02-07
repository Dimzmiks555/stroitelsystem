// @mui
import { styled } from '@mui/material/styles';
import { Switch, Divider, Typography, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Label from '../../components/Label';
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(5),
  backgroundColor: theme.palette.background.neutral,
  borderRadius: Number(theme.shape.borderRadius) * 2,
}));

// ----------------------------------------------------------------------

export default function PaymentSummary() {
  return (
    <RootStyle>
      <Typography variant="subtitle1" sx={{ mb: 5 }}>
        Итого
      </Typography>

      <Stack spacing={2.5}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="subtitle2" component="p" sx={{ color: 'text.secondary' }}>
            Подписка
          </Typography>
          <Label color="error" variant="filled">
            PREMIUM
          </Label>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Typography component="p" variant="subtitle2" sx={{ color: 'text.secondary' }}>
            Автоплатеж
          </Typography>
          <Switch defaultChecked />
        </Stack>

        <Stack direction="row" justifyContent="flex-end">
          <Typography sx={{ color: 'text.secondary' }}>₽</Typography>
          <Typography variant="h2" sx={{ mx: 1 }}>
            9.99
          </Typography>
          <Typography
            component="span"
            variant="body2"
            sx={{ mb: 1, alignSelf: 'flex-end', color: 'text.secondary' }}
          >
            /мес
          </Typography>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" component="p">
            Итого к оплате
          </Typography>
          <Typography variant="h6" component="p">
          ₽ 9.99*
          </Typography>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed', mb: 1 }} />
      </Stack>

      <Typography variant="caption" sx={{ color: 'text.secondary', mt: 1 }}>
        * Включая НДС
      </Typography>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" sx={{ mt: 5, mb: 3 }}>
        Обновить мой план
      </LoadingButton>

      <Stack alignItems="center" spacing={1}>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Iconify icon={'eva:shield-fill'} sx={{ width: 20, height: 20, color: 'primary.main' }} />
          <Typography variant="subtitle2">Безопасная оплата</Typography>
        </Stack>
        <Typography variant="caption" sx={{ color: 'text.secondary', textAlign: 'center' }}>
          Это безопасная 128-бит SSL зашифрованная оплата
        </Typography>
      </Stack>
    </RootStyle>
  );
}
