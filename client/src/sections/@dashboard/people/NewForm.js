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
// import parse from 'html-react-parser'
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
  const { push, query } = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const NewProductSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    // images: Yup.array().min(1, 'Images is required'),
    // price: Yup.number().moreThan(0, 'Price should not be $0.00'),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentProduct?.name || '',
      surname: currentProduct?.surname || '',
      lastname: currentProduct?.lastname || '',
      phone: currentProduct?.phone || '',
      description: currentProduct?.description || '',
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


  // useEffect(() => {
  //     console.log(reg_info)


  //     let { address = {}, inn, kpp, name, ogrn, okato, opf, management, okpo, oktmo, fio } = reg_info?.data


  //     setValue('name', name?.short_with_opf)
  //     setValue('inn', inn)
  //     setValue('address', address?.unrestricted_value)
  //     setValue('ogrn', ogrn)
  //     setValue('opf', opf?.short)
  //     setValue('manager', management?.name)
  //     setValue('okato', okato)
  //     setValue('okpo', okpo)
  //     setValue('oktmo', oktmo)

  //     if (opf?.short !== '????') {
  //       setValue('kpp', kpp)
  //       setValue('manager', management?.name)
  //     } else {
  //       setValue('kpp', '')
  //       setValue('manager', `${fio?.surname} ${fio?.name} ${fio?.patronymic}`)
  //     }
     
  //     console.log(values)

  // }, [reg_info]);

  const onSubmit = async () => {
    try {
      if (isEdit) {
        fetch(`${process.env.NEXT_PUBLIC_HOST}/people/${query.name}`, {
          method: 'PATCH',
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
      } else {
        fetch(`${process.env.NEXT_PUBLIC_HOST}/people`, {
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
      }
      reset();
      enqueueSnackbar(!isEdit ? '?????????????? ??????????????????!' : 'Update success!');
      console.log(values)
      // push(PATH_DASHBOARD.people.list);
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
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <RHFTextField name="surname" label="??????????????" sx={{width: '100%', display: 'block'}} />
              <RHFTextField name="name" label="??????" sx={{width: '100%', display: 'block'}} />
              <RHFTextField name="lastname" label="????????????????" sx={{width: '100%'}} />
              <RHFTextField name="phone" label="?????????? ????????????????" sx={{width: '100%'}} />


              {/* <div>
                <LabelStyle>??????????????????????</LabelStyle>
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
            
            <div>
              <LabelStyle>????????????????</LabelStyle>
              <RHFEditor simple name="description" />
            </div>
            {/* <Card sx={{ p: 3 }}>
              <RHFSwitch name="inStock" label="?? ??????????????" />

              <Stack spacing={3} mt={2}>
                <RHFTextField name="code" label="?????? ????????????" />
                <RHFTextField name="sku" label="??????????????" />

                <div>
                  <LabelStyle>??????</LabelStyle>
                  <RHFRadioGroup
                    name="gender"
                    options={GENDER_OPTION}
                    sx={{
                      '& .MuiFormControlLabel-root': { mr: 4 },
                    }}
                  />
                </div>

                <RHFSelect name="category" label="??????????????????">
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
                      renderInput={(params) => <TextField label="????????" {...params} />}
                    />
                  )}
                />
              </Stack>
            </Card>

            <Card sx={{ p: 3 }}>
              <Stack spacing={3} mb={2}>
                <RHFTextField
                  name="price"
                  label="???????????????????? ????????"
                  placeholder="0.00"
                  value={getValues('price') === 0 ? '' : getValues('price')}
                  onChange={(event) => setValue('price', Number(event.target.value))}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">???</InputAdornment>,
                    type: 'number',
                  }}
                />

                <RHFTextField
                  name="priceSale"
                  label="?????????????????? ????????"
                  placeholder="0.00"
                  value={getValues('priceSale') === 0 ? '' : getValues('priceSale')}
                  onChange={(event) => setValue('price', Number(event.target.value))}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">???</InputAdornment>,
                    type: 'number',
                  }}
                />
              </Stack>

              <RHFSwitch name="taxes" label="???????? ???????????????? ??????" />
            </Card> */}

            <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
              {!isEdit ? '??????????????????' : '????????????????'}
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
