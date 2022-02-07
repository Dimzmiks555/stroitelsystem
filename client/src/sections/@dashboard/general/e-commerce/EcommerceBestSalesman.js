// @mui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Card,
  Table,
  Avatar,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  CardHeader,
  Typography,
  TableContainer,
} from '@mui/material';
// utils
import { fCurrency } from '../../../../utils/formatNumber';
// _mock_
import { _ecommerceBestSalesman } from '../../../../_mock';
// components
import Label from '../../../../components/Label';
import Image from '../../../../components/Image';
import Scrollbar from '../../../../components/Scrollbar';

// ----------------------------------------------------------------------

export default function EcommerceBestSalesman() {
  const theme = useTheme();

  return (
    <Card>
      <CardHeader title="Лучший продавец" sx={{ mb: 3 }} />
      <Scrollbar>
        <TableContainer sx={{ minWidth: 720 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Продавец</TableCell>
                <TableCell>Товар</TableCell>
                <TableCell>Страна</TableCell>
                <TableCell>Итого</TableCell>
                <TableCell align="right">Оценка</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {_ecommerceBestSalesman.map((row) => (
                <TableRow key={row.name}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar alt={row.name} src={row.avatar} />
                      <Box sx={{ ml: 2 }}>
                        <Typography variant="subtitle2"> {row.name}</Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          {row.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>
                    <Image src={row.flag} alt="country flag" sx={{ maxWidth: 28 }} />
                  </TableCell>
                  <TableCell>{fCurrency(row.total)}</TableCell>
                  <TableCell align="right">
                    <Label
                      variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                      color={
                        (row.rank === 'Топ 1' && 'primary') ||
                        (row.rank === 'Топ 2' && 'info') ||
                        (row.rank === 'Топ 3' && 'success') ||
                        (row.rank === 'Топ 4' && 'warning') ||
                        'error'
                      }
                    >
                      {row.rank}
                    </Label>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>
    </Card>
  );
}
