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
import { LoadingButton } from '@mui/lab';
import { Card, Chip, Grid, Stack, TextField, Typography, Autocomplete, InputAdornment, Box } from '@mui/material';
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
import ExpensesBlock from './ExpensesBlock';
import InvoiceBlock from './invoice/InvoiceBlock';


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
    name: Yup.string().required('Name is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentProduct?.name || '',
      description: currentProduct?.description || '',
      sku: currentProduct?.sku || '',
      price: currentProduct?.price || 0,
      priceSale: currentProduct?.priceSale || 0,
      initial_balance: currentProduct?.initial_balance || 0,
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
        fetch(`${process.env.NEXT_PUBLIC_HOST}/objects`, {
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
        fetch(`${process.env.NEXT_PUBLIC_HOST}/objects/${query?.id}`, {
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
      push(PATH_DASHBOARD.objects.list);
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
              <RHFTextField name="name" label="Название" />

              <RHFTextField name="description" multiline rows={2} label="Описание" />
              <RHFTextField type="number" name="initial_balance" label="Начальное сальдо" />

              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    freeSolo
                    onChange={(event, newValue) => setValue('type', newValue?.value)}
                    options={[
                      {label: 'Дом', value: 'Дом'},
                      {label: 'Организация', value: 'Организация'},
                      {label: 'Сторонний объект', value: 'Сторонний объект'}
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
                name="status"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    freeSolo
                    onChange={(event, newValue) => setValue('status', newValue?.value)}
                    options={[
                      {label: 'В работе', value: 'В работе'},
                      {label: 'Завершен', value: 'Завершен'},
                    ]}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                      ))
                    } 
                    renderInput={(params) => <TextField label="Статус"{...params} size="small" sx={{mb: 2}} />}
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
              {/* <ExpensesBlock expenses={expenses}></ExpensesBlock> */}
          </Stack>
        </Grid>
      </Grid>
      
      <Box sx={{py: 3}}>
        <InvoiceBlock/>
      </Box>
    </FormProvider>
  );
}
