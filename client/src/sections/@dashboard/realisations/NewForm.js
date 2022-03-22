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
import { Card, Chip, Grid, Stack, TextField, Typography, Autocomplete, InputAdornment, Box, Table, TableRow, TableCell, TableHead, TableBody } from '@mui/material';
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
  const [contragents, setContragents] = useState([]);

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

  const [address, setAddress] = useState();

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
    fetch('http://localhost:5000/contragents')
      .then((res) => res.json())
      .then((json) => {
        let list = json.map((item) => {
          return { label: item.name, value: item.id };
        });

        setContragents(list);
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

  const handleRemoveAll = () => {
    setValue('images', []);
  };

  const handleRemove = (file) => {
    const filteredItems = values.images?.filter((_file) => _file !== file);
    setValue('images', filteredItems);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <p>Покупатель: {currentUser?.['Контрагент']?.['Description']}</p>
              <p>Продавец: {currentUser?.['Ответственный']?.['Description']}</p>
              <p>Склад: {currentUser?.['Склад']?.['Description']}</p>
              <p>Сумма: {currentUser?.['СуммаДокумента']} руб.</p>
              <p>Дата: {new Date(currentUser?.['Date']).toLocaleDateString()}</p>
            </Stack>
          </Card>
          <Card sx={{ p: 3, mt: 4 }}>
            <Stack spacing={3}>
                <Table>
                    <TableHead >
                        <TableCell>№</TableCell>
                        <TableCell>Артикул</TableCell>
                        <TableCell>Наименование</TableCell>
                        <TableCell>Цена</TableCell>
                        <TableCell>Кол-во</TableCell>
                        <TableCell>Сумма</TableCell>
                    </TableHead>
                    <TableBody>
                      {currentUser?.['Товары']?.map(item => (
                        <TableRow >
                            <TableCell>{item?.['LineNumber']}</TableCell>
                            <TableCell>{item?.['Номенклатура']?.['Артикул']}</TableCell>
                            <TableCell>{item?.['Номенклатура']?.['НаименованиеПолное']}</TableCell>
                            <TableCell>{item?.['Цена']} руб.</TableCell>
                            <TableCell>{item?.['Количество']}</TableCell>
                            <TableCell>{item?.['Сумма']} руб.</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                </Table>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
