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
import { LoadingButton } from '@mui/lab';
import { Card, Chip, Grid, Stack, TextField, Typography, Autocomplete, InputAdornment } from '@mui/material';
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



import { PartySuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';
import { endOfWeekWithOptions } from 'date-fns/fp';

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

  const { enqueueSnackbar } = useSnackbar();

  const NewProductSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    images: Yup.array().min(1, 'Images is required'),
    price: Yup.number().moreThan(0, 'Price should not be $0.00'),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentProduct?.name || '',
      inn: currentProduct?.inn || '',
      kpp: currentProduct?.kpp || '',
      address: currentProduct?.address || '',
      manager: currentProduct?.address || '',
      ogrn: currentProduct?.address || '',
      okato: currentProduct?.address || '',
      oktmo: currentProduct?.address || '',
      okpo: currentProduct?.address || '',
      opf: currentProduct?.address || '',
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

  const [reg_info, setRegInfo] = useState({data: {}});



  useEffect(() => {
    if (isEdit && currentProduct) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentProduct]);


  useEffect(() => {
      console.log(reg_info)


      let { address = {}, inn, kpp, name, ogrn, okato, opf, management, okpo, oktmo, fio } = reg_info?.data


      setValue('name', name?.short_with_opf)
      setValue('inn', inn)
      setValue('address', address?.unrestricted_value)
      setValue('ogrn', ogrn)
      setValue('opf', opf?.short)
      setValue('manager', management?.name)
      setValue('okato', okato)
      setValue('okpo', okpo)
      setValue('oktmo', oktmo)

      if (opf?.short !== 'ИП') {
        setValue('kpp', kpp)
        setValue('manager', management?.name)
      } else {
        setValue('kpp', '')
        setValue('manager', `${fio?.surname} ${fio?.name} ${fio?.patronymic}`)
      }
     
      console.log(values)

  }, [reg_info]);

  const onSubmit = async () => {
    try {
      fetch(`http://localhost:5000/contragents`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(values)
      })
      .then(res => res.json)
      .then(json => {
        console.log(json)
      })
      reset();
      enqueueSnackbar(!isEdit ? 'Успешно сохранено!' : 'Update success!');
      push(PATH_DASHBOARD.contragents.list);
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
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3} sx={{display: 'flex', flexWrap: 'wrap', width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
              <RHFTextField name="name" label="Название" sx={{width: '47%', display: 'block'}} />
              <RHFTextField name="opf" label="ОПФ" sx={{width: '47%', display: 'block'}} />
              <RHFTextField name="address" label="Адрес" sx={{width: '47%'}} />
              <RHFTextField name="inn" label="ИНН" sx={{width: '47%'}} />
              <RHFTextField name="kpp" label="КПП" sx={{width: '47%'}} />
              <RHFTextField name="ogrn" label="ОГРН" sx={{width: '47%'}} />
              <RHFTextField name="okato" label="ОКАТО" sx={{width: '47%'}} />
              <RHFTextField name="okpo" label="ОКПО" sx={{width: '47%'}} />
              <RHFTextField name="oktmo" label="ОКТМО" sx={{width: '47%'}} />
              <RHFTextField name="phone" label="Номер телефона" sx={{width: '47%'}} />
              <RHFTextField name="manager" label="Управляющий" sx={{width: '47%'}} />


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

        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            
            <LabelStyle>Автозаполнение</LabelStyle>
            <PartySuggestions token="cccd906b9f52be8f1ee449484885f4327766041c" value={reg_info} onChange={setRegInfo} />
            
            <div>
              <LabelStyle>Описание</LabelStyle>
              <RHFEditor simple name="description" />
            </div>
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
