// @mui
import { Typography, TextField, Stack } from '@mui/material';

// ----------------------------------------------------------------------

export default function PaymentBillingAddress() {
  return (
    <div>
      <Typography variant="subtitle1">Адрес плательщика</Typography>

      <Stack spacing={3} mt={5}>
        <TextField fullWidth label="Имя" />
        <TextField fullWidth label="Телефон" />
        <TextField fullWidth label="Электронная почта" />
        <TextField fullWidth label="Адрес" />
      </Stack>
    </div>
  );
}
