import PropTypes from 'prop-types';
import DataGridBasic from './DataGridBasic';
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
import { LoadingButton } from '@mui/lab';
import { Card, Chip, Grid, Stack, TextField, Typography, Autocomplete, InputAdornment, Box } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
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


import isWeekend from 'date-fns/isWeekend';
// @mui
import { Masonry, DatePicker, StaticDatePicker, MobileDatePicker, DesktopDatePicker } from '@mui/lab';

// ----------------------------------------------------------------------

const GENDER_OPTION = ['Мужской', 'Женский', 'Дети'];

const CATEGORY_OPTION = [
  { group: 'Clothing', classify: ['Shirts', 'T-shirts', 'Jeans', 'Leather'] },
  { group: 'Tailored', classify: ['Suits', 'Blazers', 'Trousers', 'Waistcoats'] },
  { group: 'Accessories', classify: ['Shoes', 'Backpacks and bags', 'Bracelets', 'Face masks'] },
];

const TAGS_OPTION = [
  'Toy Story 3',
  'Logan',
  'Full Metal Jacket',
  'Dangal',
  'The Sting',
  '2001: A Space Odyssey',
  "Singin' in the Rain",
  'Toy Story',
  'Bicycle Thieves',
  'The Kid',
  'Inglourious Basterds',
  'Snatch',
  '3 Idiots',
];

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

export default function ProductNewForm({ isEdit, currentProduct }) {
  const { push } = useRouter();
  
  const [valueDate, setValueDate] = useState(new Date());

  const { enqueueSnackbar } = useSnackbar();

  const NewProductSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    images: Yup.array().min(1, 'Images is required'),
    price: Yup.number().moreThan(0, 'Price should not be $0.00'),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentProduct?.name || '',
      description: currentProduct?.description || '',
      images: currentProduct?.images || [],
      code: currentProduct?.code || '',
      sku: currentProduct?.sku || '',
      price: currentProduct?.price || 0,
      priceSale: currentProduct?.priceSale || 0,
      tags: currentProduct?.tags || [TAGS_OPTION[0]],
      inStock: true,
      taxes: true,
      gender: currentProduct?.gender || GENDER_OPTION[2],
      category: currentProduct?.category || CATEGORY_OPTION[0].classify[1],
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
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      push(PATH_DASHBOARD.eCommerce.list);
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
              <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                <StaticDatePicker
                  orientation="landscape"
                  openTo="day"
                  value={valueDate}
                  shouldDisableDate={isWeekend}
                  onChange={(newValue) => {
                    setValueDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} sx={{mb:4}} />}
                />
                
                <div>
                  <LabelStyle>Описание</LabelStyle>
                  <TextField
                    multiline
                    fullWidth
                    rows={5}
                    sx={{display: 'block'}}
                    
                  />
                  
                  <RHFTextField name="foundation" label="Основание" sx={{my:2}} />

                  
                  <RHFTextField
                    name="priceSale"
                    label="Общая сумма"
                    placeholder="Не назначена"
                    value={getValues('priceSale') === 0 ? '' : getValues('priceSale')}
                    onChange={(event) => setValue('price', Number(event.target.value))}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">₽</InputAdornment>,
                      type: 'number',
                    }}
                  />
                </div>
                <div>
                  

                
                <Stack spacing={3}>

                  <Card sx={{ p: 3 }}>
                    <Stack spacing={3} mb={2}>
                    <Controller
                    name="tags"
                    control={control}
                    render={({ field }) => (
                          <Autocomplete
                            {...field}
                            freeSolo
                            sx={{my:4}}
                            onChange={(event, newValue) => field.onChange(newValue)}
                            options={TAGS_OPTION.map((option) => option)}
                            renderTags={(value, getTagProps) =>
                              value.map((option, index) => (
                                <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                              ))
                            }
                            renderInput={(params) => <TextField label="Организация" {...params} sx={{width: '400px'}} />}
                          />
                        )}
                      />

                    <Controller
                        name="tags"
                        control={control}
                        render={({ field }) => (
                          <Autocomplete
                            {...field}
                            freeSolo
                            sx={{mb:2}}
                            onChange={(event, newValue) => field.onChange(newValue)}
                            options={TAGS_OPTION.map((option) => option)}
                            renderTags={(value, getTagProps) =>
                              value.map((option, index) => (
                                <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                              ))
                            }
                            renderInput={(params) => <TextField label="Контрагент" {...params} />}
                          />
                        )}
                      />
                      
                      <Controller
                      name="tags"
                      control={control}
                      render={({ field }) => (
                        <Autocomplete
                          {...field}
                          freeSolo
                          sx={{mb:2}}
                          onChange={(event, newValue) => field.onChange(newValue)}
                          options={TAGS_OPTION.map((option) => option)}
                          renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                              <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                            ))
                          }
                          renderInput={(params) => <TextField label="Объект" {...params} />}
                        />
                      )}
                    />

                    </Stack>

                    <RHFSwitch name="taxes" label="Запись относится только к одному объекту" />
                  </Card>

                  <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
                    {!isEdit ? 'Сохранить' : 'Изменить'}
                  </LoadingButton>
                </Stack>
                </div>
              </Box>

              <Box sx={{height: 1000}}>
                <DataGridBasic></DataGridBasic>
              </Box>
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
          </Card>
        </Grid>

        
          
      </Grid>
    </FormProvider>
  );
}
