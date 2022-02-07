import PropTypes from 'prop-types';
// @mui
import { Box, Card, Button, Typography, Stack, Paper } from '@mui/material';
// components
import Iconify from '../../../../components/Iconify';

// ----------------------------------------------------------------------

AccountBillingAddressBook.propTypes = {
  addressBook: PropTypes.array,
};

export default function AccountBillingAddressBook({ addressBook }) {
  return (
    <Card sx={{ p: 3 }}>
      <Stack spacing={3} alignItems="flex-start">
        <Typography variant="overline" sx={{ color: 'text.secondary' }}>
          Информация
        </Typography>

        {addressBook.map((address) => (
          <Paper
            key={address.id}
            sx={{
              p: 3,
              width: 1,
              bgcolor: 'background.neutral',
            }}
          >
            <Typography variant="subtitle1" gutterBottom>
              {address.name}
            </Typography>

            <Typography variant="body2" gutterBottom>
              <Typography variant="body2" component="span" sx={{ color: 'text.secondary' }}>
                Адрес: &nbsp;
              </Typography>
              {`${address.street}, ${address.city}, ${address.state}, ${address.country} ${address.zipCode}`}
            </Typography>

            <Typography variant="body2" gutterBottom>
              <Typography variant="body2" component="span" sx={{ color: 'text.secondary' }}>
                Телефон: &nbsp;
              </Typography>
              {address.phone}
            </Typography>

            <Box sx={{ mt: 1 }}>
              <Button
                color="error"
                size="small"
                startIcon={<Iconify icon={'eva:trash-2-outline'} />}
                onClick={() => {}}
                sx={{ mr: 1 }}
              >
                Удалить
              </Button>
              <Button size="small" startIcon={<Iconify icon={'eva:edit-fill'} />} onClick={() => {}}>
                Изменить
              </Button>
            </Box>
          </Paper>
        ))}

        <Button size="small" startIcon={<Iconify icon={'eva:plus-fill'} />}>
          Добавить новый адрес
        </Button>
      </Stack>
    </Card>
  );
}
