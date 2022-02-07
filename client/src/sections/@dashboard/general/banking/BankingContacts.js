// @mui
import {
  Box,
  Card,
  Stack,
  Button,
  Avatar,
  Tooltip,
  Typography,
  CardHeader,
  IconButton,
} from '@mui/material';
// _mock_
import { _bankingContacts } from '../../../../_mock';
// components
import Iconify from '../../../../components/Iconify';

// ----------------------------------------------------------------------

export default function BankingContacts() {
  return (
    <Card>
      <CardHeader
        title="Контакты"
        subheader="У вас 122 контакта"
        action={
          <Tooltip title="Добавить контакт">
            <IconButton color="primary" size="large">
              <Iconify icon={'eva:plus-fill'} width={20} height={20} />
            </IconButton>
          </Tooltip>
        }
      />

      <Stack spacing={3} sx={{ p: 3 }}>
        {_bankingContacts.map((contact) => (
          <Stack direction="row" alignItems="center" key={contact.id}>
            <Avatar src={contact.avatar} sx={{ width: 48, height: 48 }} />
            <Box sx={{ flexGrow: 1, ml: 2, minWidth: 100 }}>
              <Typography variant="subtitle2" sx={{ mb: 0.5 }} noWrap>
                {contact.name}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                {contact.email}
              </Typography>
            </Box>

            <Tooltip title="Быстрый перевод">
              <IconButton size="small">
                <Iconify icon={'eva:flash-fill'} width={22} height={22} />
              </IconButton>
            </Tooltip>
          </Stack>
        ))}

        <Button variant="outlined" size="large" color="inherit">
          Показать все
        </Button>
      </Stack>
    </Card>
  );
}
