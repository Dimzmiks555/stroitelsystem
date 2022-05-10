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
import { DatePicker, LoadingButton, StaticDatePicker } from '@mui/lab';
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
import { PlanPremiumIcon } from 'src/assets';

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
    contract_number: Yup.string().required('Name is required'),
    // description: Yup.string().required('Description is required'),
    // images: Yup.array().min(1, 'Images is required'),
    // price: Yup.number().moreThan(0, 'Price should not be $0.00'),
  });

  const defaultValues = useMemo(
    () => ({
      contract_number: currentUser?.contract_number || '',
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

    setValue('buyer_id', values?.buyer?.value)
    setValue('seller_id', values?.seller?.value)
    try {
      console.log(values);
      
      if (!isEdit) {
        fetch(`http://localhost:5000/contracts`, {
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
        fetch(`http://localhost:5000/contracts/${query?.id}`, {
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
      // if (pathname.search('note') !== -1) {
      //   console.log(pathname)
      //   enqueueSnackbar('Номенклатура добавлена!');
      // } else {
      //   push(PATH_DASHBOARD.nomenklatura.list);
      // }
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

  
  const onSubmitFile = () => {

    console.log(values?.images)
    
    // setIsUploading(true)

    values?.images?.forEach(doc => {

      let formdata = new FormData()

      formdata.append('file', doc)
      formdata.append('contract_id', query.id)

      fetch(`http://localhost:5000/document`, {
        method: 'POST',
        body: formdata
      })
      .then(res => res.json())
      .then(json => {
        console.log(json)
        // setIsUploading(false)
        reload()
      })

    })
    

  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <Box sx={{display: 'flex', alignItems: 'center'}}>
                <p style={{width: 120, fontSize: 20}}>Договор №</p>
                <RHFTextField sx={{width: 160, mr: 2}} size="small" name="contract_number" label="Номер договора" />
                <p style={{width: 40, fontSize: 20}}>от</p>
                <DatePicker
                    orientation="landscape"
                    disableOpenPicker
                    openTo="day"
                    label="Дата"
                    // value={valueDate}
                    // onChange={(newValue) => {
                    //   setValueDate(newValue);
                    // }}
                    value={values.date}
                    // shouldDisableDate={isWeekend}
                    onChange={(newValue) => {
                      setValue('date', newValue);
                    }}
                    mask='__/__/____'
                    inputFormat="dd/MM/yyyy"
                    renderInput={(params) => <TextField size="small"  {...params} />}
                  />
              </Box>

              {
                isEdit && (
                  <Box sx={{p: 2, fontSize: 18}}>
                    <p>Продавец: {currentUser?.seller?.name}</p>
                    <p>Покупатель: {currentUser?.buyer?.name}</p>
                  </Box>
                )
              }


              <Box sx={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
                <Controller
                  name="seller"
                  control={control}
                  render={({ field }) => (
                      <Autocomplete
                        {...field}
                        freeSolo
                        onChange={(e, val) => {
                          setValue('seller_id', val?.value);
                        }}
                        options={contragents}
                        renderTags={(value, getTagProps) =>
                          value.map((option, index) => (
                            <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                          ))
                        }
                        renderInput={(params) => <TextField label="Продавец" {...params} sx={{mb: 0, width: '340px'}} />}
                      />
                    )}
                  />
                  <Controller
                    name="buyer"
                    control={control}
                    render={({ field }) => (
                        <Autocomplete
                          {...field}
                          freeSolo
                          onChange={(e, val) => {
                            setValue('buyer_id', val?.value);
                          }}
                          options={contragents}
                          renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                              <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                            ))
                          }
                          renderInput={(params) => <TextField label="Покупатель" {...params} sx={{mb: 0, width: '340px'}} />}
                        />
                      )}
                    />
                </Box>
              

              <div>
                <LabelStyle>Описание</LabelStyle>
                <RHFTextField rows={5} name="description" />
              </div>

              
              <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
                {!isEdit ? 'Сохранить' : 'Изменить'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack spacing={3}>
            

            <Card sx={{ p: 3 }}>
            {isEdit && (
                <div>
                <LabelStyle>Входящие документы</LabelStyle>

                <Box sx={{display: 'flex'}}>
                {
                    currentUser?.files?.map(file => (
                        <Box sx={{my: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', mr: 2, maxWidth: '23%'}}>
                          <a href={`http://localhost:5000/public/${file.name}`} target="_blank">
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
                  // maxSize={3145728}
                  onDrop={handleDrop}
                  onRemove={handleRemove}
                  isLoading={false}
                  onRemoveAll={handleRemoveAll}
                  onSubmitFile={onSubmitFile}
                />
              </div>
              )}
            </Card>


          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
