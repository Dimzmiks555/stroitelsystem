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
import { Card, Chip, Grid, Stack, TextField, Typography, Autocomplete, InputAdornment, Box, List, ListItem, ListItemButton, ListItemText, TableHead, TableBody, Table, TableRow, TableCell } from '@mui/material';
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
  const [objectModel, setObject] = useState();
  const [peopleList, setPeople] = useState([]);
  const [selected, setSelected] = useState({});
  const [checkout, setCheckout] = useState({});

  const { push, query } = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const NewProductSchema = Yup.object().shape({
    // name: Yup.string().required('Name is required'),
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
    fetch(`${process.env.NEXT_PUBLIC_HOST}/realisations`)
      .then((res) => res.json())
      .then((json) => {
        setFiltered(json)
        setRealisations(json);
      });
    fetch(`${process.env.NEXT_PUBLIC_HOST}/objects`)
    .then((res) => res.json())
    .then((json) => {
      
      let list = json.map((item) => {
        return { label: item.name, value: item.id };
      });

      setObjects(list);
    });

    fetch(`${process.env.NEXT_PUBLIC_HOST}/people`)
    .then((res) => res.json())
    .then((json) => {
      
      let list = json.map((item) => {
        return { label: `${item.surname} ${item.name} ${item.lastname}`, value: item.id };
      });

      setPeople(list);
    });

    if (isEdit) {
      fetch(`${process.env.NEXT_PUBLIC_HOST}/checkouts/${query.id}`)
      .then((res) => res.json())
      .then((json) => {
        setCheckout(json)
      });
    }

  }, []);

  const onSubmit = async () => {
    console.log(values);


    let data = {
      description: values?.description,
      person_id: values?.person_id,
      Number: selected.item?.['Number'],
      Ref_Key: selected.item?.['Ref_Key'],
      object_id: objectModel?.value,
      Date: selected.item?.['Date'],
      summ: selected.item?.['СуммаДокумента'],
      buyer: selected.item?.['Контрагент']?.['Description'],
      seller: selected.item?.['Ответственный']?.['Description'],
      sklad: selected.item?.['Склад']?.['Description'],
    }

    console.log(data)

    try {
      console.log(values);
      
      if (!isEdit) {
        fetch(`${process.env.NEXT_PUBLIC_HOST}/checkouts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(data),
        })
          .then((res) => res.json)
          .then((json) => {
            console.log(json);
          });
      } else {
        fetch(`${process.env.NEXT_PUBLIC_HOST}/checkouts/${query?.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(data),
        })
          .then((res) => res.json)
          .then((json) => {
            console.log(json);
          });
      }

      reset();
      enqueueSnackbar(!isEdit ? 'Успешно создано!' : 'Успешно сохранено!');
      push(PATH_DASHBOARD.checkouts.list);
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

  const handleSelect = (e, item, index) => {
    setSelected({item, index});
  };

  const handleChangeObject = (e, newValue) => {
    setObject(newValue);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              {
                isEdit ? (
                  <>
                   <p>Объект: {checkout?.object?.name}</p>
                   <p>Ответственное лицо: {checkout?.person?.surname} {checkout?.person?.name} {checkout?.person?.lastname} </p>
                   <p>Покупатель в 1С: {checkout?.buyer}</p>
                   <p>Продавец: {checkout?.seller}</p>
                   <p>Склад: {checkout?.sklad}</p>
                   <p>Сумма: {checkout?.summ} руб.</p>
                   <p>Дата: {new Date(checkout?.['Date']).toLocaleDateString()}</p>
                  </>
                ) : (
                  <Autocomplete
                    freeSolo
                    sx={{mb:2}}
                    onChange={handleChangeObject}
                    options={objectsList}
                    value={objectModel}
                    renderInput={(params) => <TextField label="Объект" {...params} />}
                  />
                )
              }
              <Controller
                name="person_id"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    freeSolo
                    onChange={(event, newValue) => setValue('person_id', newValue?.value)}
                    options={peopleList}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                      ))
                    } 
                    renderInput={(params) => <TextField label="Ответственное лицо" {...params} size="small" sx={{mb: 0}} />}
                  />
                )}
              />
              <div>
                <RHFTextField multiline rows={2}  name="description" label="Описание"/>
              </div>

              <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
                {!isEdit ? 'Сохранить' : 'Изменить'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
            {isEdit ? (
            <Stack spacing={3}>
              <LabelStyle>Позиции</LabelStyle>
              <Table>
                <TableHead>
                  <TableCell>
                    Наименование
                  </TableCell>
                  <TableCell>
                    Цена
                  </TableCell>
                  <TableCell>
                    Кол-во
                  </TableCell>
                  <TableCell>
                    Сумма
                  </TableCell>
                </TableHead>
                <TableBody>
                  {checkout?.products?.map(item => (
                    <TableRow>
                      <TableCell>
                        {item?.name}
                      </TableCell>
                      <TableCell>
                        {item?.price} руб.
                      </TableCell>
                      <TableCell>
                        {item?.amount}
                      </TableCell>
                      <TableCell>
                        {item?.summ} руб.
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
            </Stack>
            ) : (
            <Stack spacing={3}>
              <LabelStyle>Реализации</LabelStyle>

              <RHFTextField name="name" value={search} onChange={handleSearch} label="Поиск" />
              <List disablePadding>
              {filteredList?.map((item, index) => (
                  <ListItem>
                    <ListItemButton selected={selected?.index === index} onClick={e => {handleSelect(e, item, index)}}>
                      <ListItemText primary={item?.['Number']} sx={{userSelect: 'text'}} />
                    </ListItemButton>
                  </ListItem>
              ))}
              </List>
            </Stack>
            )}

            
        </Grid>
      </Grid>
    </FormProvider>
  );
}
