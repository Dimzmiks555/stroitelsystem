import PropTypes from 'prop-types';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Toolbar, Tooltip, IconButton, Typography, InputAdornment } from '@mui/material';
// components
import Iconify from '../../../../components/Iconify';
import InputStyle from '../../../../components/InputStyle';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

// ----------------------------------------------------------------------

UserListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  onDeleteUsers: PropTypes.func,
};

export default function UserListToolbar({ numSelected, filterName, onFilterName, filterName2, onDeleteUsers }) {
  const theme = useTheme();

  const isLight = theme.palette.mode === 'light';

  return (
    <RootStyle
      sx={{
        ...(numSelected > 0 && {
          color: isLight ? 'primary.main' : 'text.primary',
          bgcolor: isLight ? 'primary.lighter' : 'primary.dark',
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} выбрано
        </Typography>
      ) : (
        <>
        <InputStyle
          stretchStart={240}
          name="id"
          value={filterName}
          onChange={(event) => onFilterName(event.target.value, event.target.name)}
          placeholder="Найти по ID..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon={'eva:search-fill'} sx={{ color: 'text.disabled', width: 20, height: 20 }} />
              </InputAdornment>
            ),
          }}
        />
        <InputStyle
          stretchStart={240}
          name="basis"
          value={filterName}
          onChange={(event) => onFilterName(event.target.value, event.target.name)}
          placeholder="Основание..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon={'eva:search-fill'} sx={{ color: 'text.disabled', width: 20, height: 20 }} />
              </InputAdornment>
            ),
          }}
        />
        <InputStyle
          stretchStart={240}
          name="summ"
          value={filterName}
          onChange={(event) => onFilterName(event.target.value, event.target.name)}
          placeholder="Сумма..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon={'eva:search-fill'} sx={{ color: 'text.disabled', width: 20, height: 20 }} />
              </InputAdornment>
            ),
          }}
        />
        </>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Удалить">
          <IconButton onClick={onDeleteUsers}>
            <Iconify icon={'eva:trash-2-outline'} />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Фильтр">
          <IconButton>
            <Iconify icon={'ic:round-filter-list'} />
          </IconButton>
        </Tooltip>
      )}
    </RootStyle>
  );
}
