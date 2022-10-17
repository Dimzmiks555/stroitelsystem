import PropTypes from 'prop-types';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Toolbar, Tooltip, IconButton, Typography, InputAdornment, Box, Tab, Tabs, Autocomplete, TextField } from '@mui/material';
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

export default function UserListToolbar({ selected, items, numSelected, filterName, onFilterName, onDeleteUsers, handleChangeObject, objects }) {
  const theme = useTheme();

  const isLight = theme.palette.mode === 'light';

  let summ = items?.filter(item => selected.includes(item?.id))?.reduce((prev, now) => prev + +now?.summ, 0)

  console.log(items)

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
        <>
        <Typography component="div" variant="subtitle1">
          {numSelected} выбрано
        </Typography>
        <Typography component="div" variant="subtitle1">
          Сумма {(summ)?.toFixed(2)} 
        </Typography>
        </>
      ) : (
        <>
        {/* <InputStyle
          stretchStart={240}
          value={filterName}
          onChange={(event) => onFilterName(event.target.value)}
          placeholder="Найти..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon={'eva:search-fill'} sx={{ color: 'text.disabled', width: 20, height: 20 }} />
              </InputAdornment>
            ),
          }}
        /> */}
        <Autocomplete
          freeSolo
          sx={{width: 320}}
          onChange={handleChangeObject}
          options={objects}
          renderInput={(params) => <TextField sx={{background: 'white', borderRadius: 1}} placeholder='Объект...' {...params} />}
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
