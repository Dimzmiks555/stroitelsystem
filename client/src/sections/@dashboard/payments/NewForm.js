import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useMemo, useState } from 'react';
// next
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
// @mui
import { styled } from '@mui/material/styles';
import { DatePicker, LoadingButton } from '@mui/lab';
import { Card, Chip, Grid, Stack, TextField, Typography, Autocomplete, InputAdornment, Box, Avatar, ToggleButtonGroup, ToggleButton } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';

import { useRouter } from 'next/router';
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


import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';
import ExpensesBlock from './BoundItem';
import InvoiceBlock from './invoice/InvoiceBlock';
import Iconify from 'src/components/Iconify';
import BoundItem from './BoundItem';


// ----------------------------------------------------------------------



// ----------------------------------------------------------------------

NewForm.propTypes = {
  isEdit: PropTypes.bool,
  currentProduct: PropTypes.object,
};

export default function NewForm({ isEdit, currentProduct, expenses }) {
  const { push } = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const NewProductSchema = Yup.object().shape({
  });

  const defaultValues = useMemo(
    () => ({
      name: currentProduct?.name || '',
      description: currentProduct?.description || '',
      sku: currentProduct?.sku || '',
      price: currentProduct?.price || 0,
      priceSale: currentProduct?.priceSale || 0,
      summ: currentProduct?.summ || 0,
      type: currentProduct?.type || 0,
      initial_balance_date: currentProduct?.initial_balance_date || null,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentProduct]
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

  const { query } = useRouter();

  
  const [address, setAddress] = useState();

  const [alignment, setAlignment] = useState(() => []);

  const handleChange = (event,newAlignment) => {
    setAlignment(newAlignment);
  };

  const values = watch();

  useEffect(() => {
    if (isEdit && currentProduct) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentProduct]);

  const onSubmit = async () => {
    console.log(values);
    try {
      console.log(values);
      
      if (!isEdit) {
        fetch(`${process.env.NEXT_PUBLIC_HOST}/payment`, {
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
        fetch(`${process.env.NEXT_PUBLIC_HOST}/payment/${query?.id}`, {
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
      // push(PATH_DASHBOARD.objects.list);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              {/* <RHFTextField name="name" label="Название" /> */}

              <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
                <Avatar sx={{mr: 2, background: '#def'}}>
                {values?.type == 'start' ? (
                  <Iconify icon="ant-design:arrow-up-outlined" sx={{color: '#d00'}}></Iconify>
                ) : (
                  <Iconify icon="ant-design:arrow-down-outlined" sx={{color: '#0d0'}}></Iconify>
                )}
                </Avatar>
                <p style={{fontSize: 24}}>{values?.type == 'end' ? 'Входящий': 'Исходящий'}</p>
              </Box>
              <RHFTextField name="description" multiline rows={2} label="Описание" />
              <RHFTextField type="number" name="summ" label="Сумма" />
              <Controller
                name="initial_balance_date"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    value={values?.initial_balance_date}
                    orientation="landscape"
                    disableOpenPicker
                    openTo="day"
                    label="Дата начального сальдо"
                    mask='__/__/____'
                    inputFormat="dd/MM/yyyy"
                    renderInput={(params) => <TextField size="small"  {...params} sx={{mb:4}} />}
                  />
                )}
              />
              
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    freeSolo
                    onChange={(event, newValue) => setValue('type', newValue?.value)}
                    options={[
                      {label: 'Входящий', value: 'end'},
                      {label: 'Исходящий', value: 'start'},
                    ]}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                      ))
                    } 
                    renderInput={(params) => <TextField label="Тип" {...params} size="small" sx={{mb: 0}} />}
                  />
                )}
              />

              <Controller
                name="payment_method"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    freeSolo
                    onChange={(event, newValue) => setValue('payment_method', newValue?.value)}
                    options={[
                      {label: 'Наличные', value: 'Наличные'},
                      {label: 'Безнал', value: 'Безнал'},
                      {label: 'Карта', value: 'Карта'},
                    ]}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                      ))
                    } 
                    renderInput={(params) => <TextField label="Способ оплаты"{...params} size="small" sx={{mb: 2}} />}
                  />
                )}
              />

              {/* <div>
                <LabelStyle>Изображения</LabelStyle>
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
            </Stack>
            
            <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
              {!isEdit ? 'Сохранить' : 'Изменить'}
            </LoadingButton>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack spacing={3}>
            <p style={{fontSize: 24}}>Привязан к</p>
            <ToggleButtonGroup
              color="primary"
              value={alignment}
              onChange={handleChange}
            >
              <ToggleButton value="deal">Сделке</ToggleButton>
              <ToggleButton value="object">Объекту</ToggleButton>
              <ToggleButton value="contragent">Контрагенту</ToggleButton>
            </ToggleButtonGroup>
            {
              alignment?.map(item => (
                <BoundItem item={item} methods={methods}></BoundItem>
              ))
            }
          </Stack>
        </Grid>
      </Grid>
      
    </FormProvider>
  );
}
