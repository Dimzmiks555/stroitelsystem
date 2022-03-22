import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useMemo, useState } from 'react';
// next
import { useRouter } from 'next/router';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
// @mui
import { styled } from '@mui/material/styles';
import { LoadingButton, StaticDatePicker } from '@mui/lab';
import { Card, Chip, Grid, Stack, TextField, Typography, Autocomplete, InputAdornment, Box, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';

import isWeekend from 'date-fns/isWeekend';
// components
import {
  FormProvider,
  RHFSwitch,
  RHFSelect,
  RHFEditor,
  RHFTextField,
  RHFRadioGroup,
  RHFUploadMultiFile,
} from '../../../components/hook-form';

import { PartySuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';
import Index from 'src/pages/dashboard/note';

// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

NewForm.propTypes = {
  isEdit: PropTypes.bool,
  currentProduct: PropTypes.object,
};

export default function NewForm({ isEdit, currentUser }) {
  const [realisationsList, setRealisations] = useState([]);
  const [filteredList, setFiltered] = useState([]);
  const [objectsList, setObjects] = useState([]);
  const [selected, setSelected] = useState({});

  const { push, query } = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const NewProductSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    // description: Yup.string().required('Description is required'),
    // images: Yup.array().min(1, 'Images is required'),
    price: Yup.number().moreThan(0, 'Price should not be $0.00'),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentUser?.name || '',
      description: currentUser?.description || '',
      images: currentUser?.images || [],
      buyer_id: currentUser?.buyer_id || '',
      seller_id: currentUser?.seller_id || '',
      status: currentUser?.status || 'Создан',
      summ: currentUser?.summ || '0',
      date: currentUser?.date || '',
      payment_method: currentUser?.payment_method || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewProductSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const [search, setSearch] = useState();

  useEffect(() => {
    if (isEdit && currentUser) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentUser]);

  useEffect(() => {
    fetch('http://localhost:5000/realisations')
      .then((res) => res.json())
      .then((json) => {
        setFiltered(json)
        setRealisations(json);
      });
    fetch('http://localhost:5000/objects')
    .then((res) => res.json())
    .then((json) => {
      
      let list = json.map((item) => {
        return { label: item.name, value: item.id };
      });

      setObjects(list);
    });
  }, []);

  const onSubmit = async () => {
    console.log(values);
    try {
      console.log(values);
      
      if (!isEdit) {
        fetch(`http://localhost:5000/orders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(values),
        })
          .then((res) => res.json)
          .then((json) => {
            console.log(json);
          });
      } else {
        fetch(`http://localhost:5000/orders/${query?.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(values),
        })
          .then((res) => res.json)
          .then((json) => {
            console.log(json);
          });
      }

      reset();
      enqueueSnackbar(!isEdit ? 'Успешно создано!' : 'Успешно сохранено!');
      push(PATH_DASHBOARD.orders.list);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      setValue(
        'images',
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    [setValue]
  );

  const handleSearch = (e) => {
    setSearch(e.target.value)
    setFiltered(realisationsList.filter(item => item['Number'].search(e.target.value) !== -1))
  };

  const handleSelect = (e, value, index) => {
    setSelected({value, index});
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
            <Autocomplete
                freeSolo
                sx={{mb:2}}
                // onChange={handleChangeObject}
                options={objectsList}
                // value={objectModel}
                renderInput={(params) => <TextField label="Объект" {...params} />}
              />
              {isEdit && (
                <>
                  <p>Покупатель: {currentUser?.buyer?.name}</p>
                  <p>Продавец: {currentUser?.seller?.name}</p>
                </>
              )}
              <Box sx={{ display: 'flex' }}>
                <Autocomplete
                  name="buyer_id"
                  onChange={(e, val) => {
                    setValue('buyer_id', val?.value);
                  }}
                  options={objectsList}
                  sx={{ mr: 2, width: '50%' }}
                  renderInput={(params) => <TextField {...params} label="Ответственный" />}
                  isOptionEqualToValue={(option, value) => option.value === value}
                />
                {/* <Autocomplete
                  name="seller_id"
                  onChange={(e, val) => {
                    setValue('seller_id', val?.value);
                  }}
                  sx={{ width: '50%' }}
                  options={realisationsList}
                  renderInput={(params) => <TextField {...params} label="Продавец" />}
                  isOptionEqualToValue={(option, value) => option.value === value}
                /> */}
              </Box>

              <div>
                <LabelStyle>Описание</LabelStyle>
                <RHFEditor simple name="description" />
              </div>

              {/* <div>
                <LabelStyle>Входящие документы</LabelStyle>
                <RHFUploadMultiFile
                  name="images"
                  showPreview
                  accept="image/*"
                  maxSize={3145728}
                  onDrop={handleDrop}
                  onRemove={handleRemove}
                  onRemoveAll={handleRemoveAll}
                />
              </div> */}

              <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
                {!isEdit ? 'Сохранить' : 'Изменить'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack spacing={3}>
            <LabelStyle>Реализации</LabelStyle>

            <RHFTextField name="name" value={search} onChange={handleSearch} label="Поиск" />
            <List disablePadding>
            {filteredList?.map((item, index) => (
                <ListItem>
                  <ListItemButton selected={selected?.index === index} onClick={e => {handleSelect(e, item['Ref_key'], index)}}>
                    <ListItemText primary={item?.['Number']} sx={{userSelect: 'text'}} />
                  </ListItemButton>
                </ListItem>
            ))}
            
          </List>

            
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
