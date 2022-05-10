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
import { DatePicker, LoadingButton } from '@mui/lab';
import { Card, Chip, Grid, Stack, TextField, Typography, Autocomplete, InputAdornment, Box } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
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
import EndData from './EndData';

// ----------------------------------------------------------------------


// ----------------------------------------------------------------------

NewForm.propTypes = {
  isEdit: PropTypes.bool,
  currentProduct: PropTypes.object,
};

export default function NewForm({ isEdit, currentProduct }) {
  const { push, query } = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  
  const [contragents, setContragents] = useState([]);
  
  const [contracts, setContracts] = useState([]);

  const NewProductSchema = Yup.object().shape({
    // name: Yup.string().required('Name is required'),
    // description: Yup.string().required('Description is required'),
    // images: Yup.array().min(1, 'Images is required'),
    // price: Yup.number().moreThan(0, 'Price should not be $0.00'),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentProduct?.name || '',
      description: currentProduct?.description || '',
      images: currentProduct?.images || [],
      deal_number: currentProduct?.deal_number || '',
      date: currentProduct?.date || '',
      tender_date: currentProduct?.tender_date || '',
      start_date: currentProduct?.start_date || '',
      end_date: currentProduct?.end_date || '',
      warranty: currentProduct?.warranty || '',
      start_summ: currentProduct?.start_summ || 0,
      end_summ: currentProduct?.end_summ || 0,
      // priceSale: currentProduct?.priceSale || 0,
      // tags: currentProduct?.tags || [TAGS_OPTION[0]],
      // inStock: true,
      // taxes: true,
      // gender: currentProduct?.gender || GENDER_OPTION[2],
      // category: currentProduct?.category || CATEGORY_OPTION[0].classify[1],
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

  useEffect(() => {
    fetch('http://localhost:5000/contragents')
      .then((res) => res.json())
      .then((json) => {
        let list = json.map((item) => {
          return { label: item.name, value: item.id };
        });

        setContragents(list);
      });

    fetch('http://localhost:5000/contracts')
    .then((res) => res.json())
    .then((json) => {
      let list = json.map((item) => {
        return { 
          label: 'Договор № ' + item.contract_number + ' от ' + new Date(item.date)?.toLocaleDateString() + ' c ' + item?.buyer?.name + ' (' + item?.description + ')', 
          value: item.id,
          seller_id: item?.seller_id,
          buyer_id: item?.buyer_id,
        };
      });

      setContracts(list);
    });

  }, []);

  const onSubmit = async () => {
    try {
      console.log(values);
      
      if (!isEdit) {
        fetch(`http://localhost:5000/deals`, {
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
        fetch(`http://localhost:5000/deals/${query?.id}`, {
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

  const handleContract = (newValue) => {
    setValue('seller_id', newValue?.seller_id);
    setValue('buyer_id', newValue?.buyer_id);
    setValue('contract_id', newValue?.value);
  };

  const [expanded, setExpanded] = useState(!isEdit);

  function handleAccordion() {
    setExpanded(!expanded)
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
          <Card sx={{ p: 3, display: 'flex'}}>
            <Stack spacing={3}>
              
              <Box sx={{display: 'flex', alignItems: 'center'}}>
                <p style={{width: 40, fontSize: 20}}>Т -</p>
                <RHFTextField sx={{width: 70, mr: 2}} size="small" name="deal_number" label="№" />
                <p style={{width: 40, fontSize: 20}}>от</p>
                <DatePicker
                    orientation="landscape"
                    disableOpenPicker
                    openTo="day"
                    label="Дата"
                    value={values?.date}
                    onChange={(newValue) => {
                      setValue('date', newValue);
                    }}
                    mask='__/__/____'
                    inputFormat="dd/MM/yyyy"
                    renderInput={(params) => <TextField size="small" sx={{width: 120}}  {...params} />}
                  />
                <LoadingButton sx={{maxWidth: 180, ml: 4}} type="submit" variant="contained" size="large" loading={isSubmitting}>
                  {!isEdit ? 'Сохранить' : 'Изменить'}
                </LoadingButton>
              </Box>

              <RHFTextField size="small" multiline rows={2} name="name" label="Наименование сделки" />
              {
                isEdit && (
                  <Box sx={{ width: 380}}>
                    <p style={{fontWeight: 'bold', fontSize: 14, color: '#88d'}}>{currentProduct?.seller?.name}</p>
                    <p>Договор № {currentProduct?.contract?.contract_number} от {new Date(currentProduct?.contract?.date).toLocaleDateString()} с {currentProduct?.buyer?.name} </p>
                    <p style={{fontSize: 14, color: '#aaa'}}>{currentProduct?.contract?.description}</p>
                  </Box>
                )
              }
              <Card>
              <Accordion  expanded={expanded} onChange={handleAccordion}>
                <AccordionSummary sx={{px:2}} aria-controls="panel1d-content" id="panel1d-header" expandIcon={<p style={{fontSize: 32}}>+</p>}>
                  <Typography>Изменить договор и стороны</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                  <Controller
                    name="contract"
                    control={control}
                    render={({ field }) => (
                        <Autocomplete
                          {...field}
                          freeSolo
                          onChange={(event, newValue) => handleContract(newValue)}
                          options={contracts}
                          renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                              <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                            ))
                          } 
                          renderInput={(params) => <TextField label="Договор" multiline rows={3} {...params} size="small" sx={{mb: 0, width: 400}} />}
                        />
                      )}
                    />
                </Box>

                {
                  !values?.contract_id && (
                    <Box>
                      <Controller
                        name="seller"
                        control={control}
                        render={({ field }) => (
                            <Autocomplete
                              {...field}
                              freeSolo
                              onChange={(event, newValue) => setValue('seller_id', newValue?.value)}
                              options={contragents}
                              renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                  <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                                ))
                              }
                              renderInput={(params) => <TextField  label="Продавец" {...params} size="small" sx={{my: 2}} />}
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
                            onChange={(event, newValue) => setValue('buyer_id', newValue?.value)}
                            options={contragents}
                            renderTags={(value, getTagProps) =>
                              value.map((option, index) => (
                                <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                              ))
                            }
                            renderInput={(params) => <TextField label="Покупатель" {...params} size="small" />}
                          />
                        )}
                      />
                    </Box>
                  )
                }
                </AccordionDetails>
              </Accordion>
              </Card>
              

              <div>
                <RHFTextField size="small" multiline rows={3} fullWidth name="description" label="Описание сделки" />
              </div>

              <h3>Тендерные опции</h3>
              <RHFTextField sx={{width: 170}} name="specification_number" size="small" label="№ спецификации" />

              <Box sx={{display: 'flex'}}>
                <DatePicker
                  orientation="landscape"
                  disableOpenPicker
                  openTo="day"
                  label="Дата спецификации"
                  value={values?.specification_date}
                  onChange={(newValue) => {
                    setValue('specification_date', newValue);
                  }}
                  mask='__/__/____'
                  inputFormat="dd/MM/yyyy"
                  renderInput={(params) => <TextField  sx={{width: 150, mr: 2}}  size="small" {...params} />}
                />
                
                <DatePicker
                  orientation="landscape"
                  disableOpenPicker
                  openTo="day"
                  label="Дата проведения тендера"
                  value={values?.tender_date}
                  onChange={(newValue) => {
                    setValue('tender_date', newValue);
                  }}
                  mask='__/__/____'
                  inputFormat="dd/MM/yyyy"
                  renderInput={(params) => <TextField size="small" sx={{width: 180}}  {...params} />}
                />
              </Box>
              
              <h3>Прочее</h3>
              <Box sx={{display: 'flex', alignItems: 'center'}}>
                
              <RHFTextField sx={{width: 160, mr: 2}} name="warranty" size="small" label="Гарантия" />
                <p style={{width: 60, fontSize: 20}}>мес.</p>
              </Box>
              <Box>
                <DatePicker
                  orientation="landscape"
                  disableOpenPicker
                  openTo="day"
                  label="Начало работ"
                  value={values?.start_date}
                  onChange={(newValue) => {
                    setValue('start_date', newValue);
                  }}
                  mask='__/__/____'
                  inputFormat="dd/MM/yyyy"
                  renderInput={(params) => <TextField  size="small" sx={{mr: 2}} {...params} />}
                />
                <DatePicker
                  orientation="landscape"
                  disableOpenPicker
                  openTo="day"
                  label="Конец работ"
                  value={values?.end_date}
                  onChange={(newValue) => {
                    setValue('end_date', newValue);
                  }}
                  mask='__/__/____'
                  inputFormat="dd/MM/yyyy"
                  renderInput={(params) => <TextField size="small"  {...params} />}
                />
              </Box>
              

              
              
            </Stack>
            <Stack spacing={3} sx={{ml: 8}}>
            



              <Box>
                <h2>Входящие данные</h2>
                
                <RHFTextField sx={{my: 2}} name="start_summ" size="small" type="number" label="Закупочная сумма" />  
                <div>
                  <RHFUploadMultiFile
                    name="images"
                    showPreview
                    accept="image/*"
                    maxSize={3145728}
                    onDrop={handleDrop}
                    onRemove={handleRemove}
                    onRemoveAll={handleRemoveAll}
                  />
                </div>
              </Box>
              
              <h3>Оплата</h3>


              <EndData values={values} currentUser={currentProduct} setValue={setValue}></EndData>


            
            </Stack>
          </Card>
      </Grid>
    </FormProvider>
  );
}
