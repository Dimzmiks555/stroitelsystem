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
import { Card, Chip, Grid, Stack, TextField, Typography, Autocomplete, InputAdornment, Box, Switch, FormControlLabel } from '@mui/material';
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

import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import CreateTable from './CreateTable';
import TableStore from './TableStore';
import { observer } from 'mobx-react';
import NewNomenklatura from './NewNomenklatura';

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


 const ProductNewForm = observer(({ isEdit, currentProduct }) => {

  const [contragents, setContragents] = useState([]);
  
  const [objects, setObjects] = useState([]);
  
  const [objectModel, setObjectModel] = useState();

  const { push } = useRouter();
  
  const [open, setOpen] = useState(false);
  
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
    fetch('http://localhost:5000/contragents')
      .then((res) => res.json())
      .then((json) => {
        let list = json.map((item) => {
          return { label: item.name, value: item.id };
        });

        setContragents(list);
      });

    fetch('http://localhost:5000/objects')
    .then((res) => res.json())
    .then((json) => {
      let list = json.map((item) => {
        return { label: item.name, value: item.id };
      });

      setObjects(list);
    });

  }, []);

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


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddPosition = (e) => {

    TableStore.addPosition()
    
  }


  const handleChangeObject = (e, newValue) => {
    setObjectModel(newValue)
  }



  
    

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Box sx={{display: 'flex', flexDirection: 'column', m: 4}}>
                  <DatePicker
                    orientation="landscape"
                    disableOpenPicker
                    openTo="day"
                    label="Дата"
                    value={valueDate}
                    onChange={(newValue) => {
                      setValueDate(newValue);
                    }}
                    renderInput={(params) => <TextField  {...params} sx={{mb:4}} />}
                  />
                  <NewNomenklatura open={open} handleClose={handleClose}></NewNomenklatura>
                </Box>

                
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
                    name="buyer"
                    control={control}
                    render={({ field }) => (
                          <Autocomplete
                            {...field}
                            freeSolo
                            sx={{my:4}}
                            onChange={(event, newValue) => field.onChange(newValue)}
                            options={contragents}
                            renderTags={(value, getTagProps) =>
                              value.map((option, index) => (
                                <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                              ))
                            }
                            renderInput={(params) => <TextField label="Покупатель" {...params} sx={{width: '400px'}} />}
                          />
                        )}
                      />

                    <Controller
                        name="seller"
                        control={control}
                        render={({ field }) => (
                          <Autocomplete
                            {...field}
                            freeSolo
                            sx={{mb:2}}
                            onChange={(event, newValue) => field.onChange(newValue)}
                            options={contragents}
                            renderTags={(value, getTagProps) =>
                              value.map((option, index) => (
                                <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                              ))
                            }
                            renderInput={(params) => <TextField label="Продавец" {...params} />}
                          />
                        )}
                      />
                      
                      <Autocomplete
                        freeSolo
                        sx={{mb:2}}
                        onChange={handleChangeObject}
                        options={objects}
                        value={objectModel}
                        renderInput={(params) => <TextField label="Объект" {...params} />}
                      />

                    </Stack>
                    {/* <FormControlLabel
                      control={
                        <Switch name="taxes" onChange={handleAloneObject} />
                      }
                      label="Запись относится к нескольким объектам"
                    /> */}
                    
                  </Card>

                  <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
                    {!isEdit ? 'Сохранить' : 'Изменить'}
                  </LoadingButton>
                </Stack>
                </div>
              </Box>

              <Box>
                {/* <DataGridBasic rows={rows}></DataGridBasic> */}

                <ButtonGroup sx={{mt:2}}>
                    <Button onClick={handleClickOpen}>
                        Новая номенклатура
                    </Button>
                    <Button onClick={handleAddPosition}>
                        Добавить позицию
                    </Button>
                  </ButtonGroup>
                <CreateTable  rows={TableStore.rows} objects={objects}>

                </CreateTable>

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
})

export default ProductNewForm