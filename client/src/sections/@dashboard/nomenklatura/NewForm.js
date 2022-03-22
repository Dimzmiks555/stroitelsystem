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
import { Card, Chip, Grid, Stack, TextField, Typography, Autocomplete, InputAdornment, Box } from '@mui/material';
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

  const { push, query, pathname } = useRouter();

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
      edizm: currentUser?.edizm || '',
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
        fetch(`http://localhost:5000/nomenklatura`, {
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
        fetch(`http://localhost:5000/nomenklatura/${query?.id}`, {
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
      if (pathname.search('note') !== -1) {
        console.log(pathname)
        enqueueSnackbar('Номенклатура добавлена!');
      } else {
        push(PATH_DASHBOARD.nomenklatura.list);
      }
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
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <RHFTextField name="name" label="Название" />
              <RHFTextField name="edizm" label="Единица измерения" />

              <div>
                <LabelStyle>Описание</LabelStyle>
                <RHFEditor simple name="description" />
              </div>

              
              <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
                {!isEdit ? 'Сохранить' : 'Изменить'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack spacing={3}>
            



          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
