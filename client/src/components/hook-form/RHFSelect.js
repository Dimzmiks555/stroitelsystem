import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { Autocomplete, TextField } from '@mui/material';

// ----------------------------------------------------------------------

RHFSelect.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
};

export default function RHFSelect({ name, children, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      onChange={([event, data]) => {
        return data;
      }}
      render={({ field}) => (
        <Autocomplete
          getOptionLabel={option => option.label}
          {...field}
          fullWidth
          {...other}
        >
          {children}
        </Autocomplete>
      )}
    />
  );
}
