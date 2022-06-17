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
import { LoadingButton, LocalizationProvider, StaticDatePicker } from '@mui/lab';
import { Card, Chip, Grid, Stack, TextField, Typography, Autocomplete, InputAdornment, Box } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';

import ruLocale from 'date-fns/locale/ru';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

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
import { DocIllustration, OrderCompleteIllustration, PlanFreeIcon, PlanPremiumIcon, SentIcon } from 'src/assets';

// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

ProductNewForm.propTypes = {
  isEdit: PropTypes.bool,
  currentProduct: PropTypes.object,
};

export default function ProductNewForm({ isEdit, currentUser }) {
  const [contragents, setContragents] = useState([]);

  const { push, query, reload } = useRouter();

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

  const [isUploading, setIsUploading] = useState(false);

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
    fetch(`${process.env.NEXT_PUBLIC_HOST}/contragents`)
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
        fetch(`${process.env.NEXT_PUBLIC_HOST}/orders`, {
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
        fetch(`${process.env.NEXT_PUBLIC_HOST}/orders/${query?.id}`, {
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

  const onSubmitFile = () => {

    console.log(values?.images)
    
    setIsUploading(true)

    values?.images?.forEach(doc => {

      let formdata = new FormData()

      formdata.append('file', doc)
      formdata.append('order_id', query.id)

      fetch(`${process.env.NEXT_PUBLIC_HOST}/document`, {
        method: 'POST',
        body: formdata
      })
      .then(res => res.json())
      .then(json => {
        console.log(json)
        setIsUploading(false)
        reload()
      })

    })
    

  }

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
      console.log(acceptedFiles)
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
                  options={contragents}
                  sx={{ mr: 2, width: '50%' }}
                  renderInput={(params) => <TextField {...params} label="Покупатель" />}
                  isOptionEqualToValue={(option, value) => option.value === value}
                />
                <Autocomplete
                  name="seller_id"
                  onChange={(e, val) => {
                    setValue('seller_id', val?.value);
                  }}
                  sx={{ width: '50%' }}
                  options={contragents}
                  renderInput={(params) => <TextField {...params} label="Продавец" />}
                  isOptionEqualToValue={(option, value) => option.value === value}
                />
              </Box>

              <div>
                <LabelStyle>Описание</LabelStyle>
                <RHFEditor simple name="description" />
              </div>

              {isEdit && (
                <div>
                <LabelStyle>Входящие документы</LabelStyle>

                <Box sx={{display: 'flex'}}>
                {
                    currentUser?.files?.map(file => (
                        <Box sx={{my: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', mr: 2, maxWidth: '23%'}}>
                          <a href={`${process.env.NEXT_PUBLIC_HOST}/public/${file.name}`} target="_blank">
                          <Box sx={{
                            width: 100,
                            height: 100,
                            p: 2,
                            border: '1px solid #bbb', 
                            cursor: 'pointer',
                            borderRadius: 3,
                            mb: 1,
                            ":hover": {
                              background: '#ddf'
                            }
                          }}>
                            <PlanPremiumIcon/>
                          </Box>
                          </a>
                            
                          <p style={{wordBreak: 'break-word', fontSize: 14, textAlign: 'center'}}>{file?.name}</p>
                        </Box>
                    ))
                  }
                </Box>

                <RHFUploadMultiFile
                  name="images"
                  showPreview
                  maxSize={3145728}
                  onDrop={handleDrop}
                  onRemove={handleRemove}
                  isLoading={isUploading}
                  onRemoveAll={handleRemoveAll}
                  onSubmitFile={onSubmitFile}
                />
              </div>
              )}
            </Stack>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack spacing={3}>
            <LabelStyle>Статус</LabelStyle>



            <div>
              <RHFRadioGroup
                name="status"
                options={['Создан', 'Ожидает оплаты', 'В пути', 'Завершен', 'Отменен']}
                sx={{
                  '& .MuiFormControlLabel-root': { mr: 4 },
                }}
              />
            </div>

            <RHFTextField type="number" name="summ" label="Сумма" />
            <LabelStyle>Способ оплаты</LabelStyle>

            <div>
              <RHFRadioGroup
                name="payment_method"
                options={['Безнал', 'Наличные']}
                sx={{
                  '& .MuiFormControlLabel-root': { mr: 4 },
                }}
              />
            </div>

            <LabelStyle>Доставка</LabelStyle>
            <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
              <StaticDatePicker
                orientation="landscape"
                openTo="day"
                name="date"
                value={values.date}
                // shouldDisableDate={isWeekend}
                label="Ориентировочная дата"
                onChange={(newValue) => {
                  setValue('date', newValue);
                }}
                renderInput={(params) => <TextField {...params} sx={{ mb: 4 }} />}
              />
            </LocalizationProvider>
            {/* <Card sx={{ p: 3 }}>
              <RHFSwitch name="inStock" label="В продаже" />

              <Stack spacing={3} mt={2}>
                <RHFTextField name="code" label="Код товара" />
                <RHFTextField name="sku" label="Артикул" />

                <div>
                  <LabelStyle>Пол</LabelStyle>
                  <RHFRadioGroup
                    name="gender"
                    options={GENDER_OPTION}
                    sx={{
                      '& .MuiFormControlLabel-root': { mr: 4 },
                    }}
                  />
                </div>

                <RHFSelect name="category" label="Категория">
                  {CATEGORY_OPTION.map((category) => (
                    <optgroup key={category.group} label={category.group}>
                      {category.classify.map((classify) => (
                        <option key={classify} value={classify}>
                          {classify}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </RHFSelect>

                <Controller
                  name="tags"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      multiple
                      freeSolo
                      onChange={(event, newValue) => field.onChange(newValue)}
                      options={TAGS_OPTION.map((option) => option)}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                        ))
                      }
                      renderInput={(params) => <TextField label="Тэги" {...params} />}
                    />
                  )}
                />
              </Stack>
            </Card>

            <Card sx={{ p: 3 }}>
              <Stack spacing={3} mb={2}>
                <RHFTextField
                  name="price"
                  label="Закупочная цена"
                  placeholder="0.00"
                  value={getValues('price') === 0 ? '' : getValues('price')}
                  onChange={(event) => setValue('price', Number(event.target.value))}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">₽</InputAdornment>,
                    type: 'number',
                  }}
                />

                <RHFTextField
                  name="priceSale"
                  label="Розничная цена"
                  placeholder="0.00"
                  value={getValues('priceSale') === 0 ? '' : getValues('priceSale')}
                  onChange={(event) => setValue('price', Number(event.target.value))}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">₽</InputAdornment>,
                    type: 'number',
                  }}
                />
              </Stack>

              <RHFSwitch name="taxes" label="Цена включает НДС" />
            </Card> */}

            <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
              {!isEdit ? 'Сохранить' : 'Изменить'}
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
