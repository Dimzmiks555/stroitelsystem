import PropTypes from 'prop-types';
import DataGridBasic from './DataGridBasic';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useMemo, useState } from 'react';
// next
import { useRouter } from 'next/router';
import NextLink from 'next/link';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
// @mui
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import { Card, Chip, Grid, Stack, TextField, Typography, Autocomplete, InputAdornment, Box, Switch, FormControlLabel, Table, TableRow, TableCell, TableHead, TableBody, Avatar, Alert, AlertTitle } from '@mui/material';
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


 const NewForm = observer(({ isEdit, currentProduct }) => {

  const [contragents, setContragents] = useState([]);
  
  const [objects, setObjects] = useState([]);
  
  const [objectModel, setObjectModel] = useState();

  const { push, query, reload } = useRouter();
  
  const [open, setOpen] = useState(false);
  
  const [valueDate, setValueDate] = useState(new Date());

  const { enqueueSnackbar } = useSnackbar();

  const NewProductSchema = Yup.object().shape({
  });

  const defaultValues = useMemo(
    () => ({
      description: currentProduct?.description || '',
      summ: currentProduct?.summ || 0,
      basis: currentProduct?.basis || ' ',
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
    fetch(`${process.env.NEXT_PUBLIC_HOST}/contragents`)
      .then((res) => res.json())
      .then((json) => {
        let list = json.map((item) => {
          return { label: item.name, value: item.id };
        });

        setContragents(list);
      });

    fetch(`${process.env.NEXT_PUBLIC_HOST}/objects`)
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
      setValueDate(new Date(currentProduct?.Date))
      TableStore.setRows(currentProduct?.products)
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
      TableStore.reset()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentProduct]);

  const onSubmit = async () => {
    try {

      let data = {}
        
      if (!isEdit) {

        data = {
          ...values, 
          seller_id: values.seller?.value,
          summ: +values.summ,
          buyer_id: values.buyer?.value,
          object_id: objectModel?.value,
          Date: valueDate,
          rows: TableStore.rows
        }

        fetch(`${process.env.NEXT_PUBLIC_HOST}/notes`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(data),
        })
        .then((res) => res.json)
        .then((json) => {
          console.log(json);
        });
      } else {
        data = {
          ...values, 
          summ: +values.summ,
          Date: valueDate,
          rows: TableStore.rows,
          isChecked: false
        }

        
        if (currentProduct?.isChecked) { data.isUpdatedAfterCheck = true }

        if (values.seller?.value) { data.seller_id = values.seller?.value }
        if (values.buyer?.value) { data.buyer_id = values.buyer?.value }
        if (objectModel?.value) { data.object_id = objectModel?.value }

        console.log(data)
        fetch(`${process.env.NEXT_PUBLIC_HOST}/notes/${query?.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(data),
        })
        .then((res) => res.json)
        .then((json) => {
          console.log(json);
        });
      }
      reset();
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
     
      if (!isEdit) {
         push(PATH_DASHBOARD.note.list);
      } else {
        reload()
      }

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
    <>
    <NewNomenklatura open={open} handleClose={handleClose}></NewNomenklatura>
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
                    mask='__/__/____'
                    inputFormat="dd/MM/yyyy"
                    renderInput={(params) => <TextField  {...params} sx={{mb:4}} />}
                  />
                  
                  <Controller
                    name="buyer"
                    control={control}
                    render={({ field }) => (
                          <Autocomplete
                            {...field}
                            freeSolo
                            onChange={(event, newValue) => field.onChange(newValue)}
                            options={contragents}
                            renderTags={(value, getTagProps) =>
                              value.map((option, index) => (
                                <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                              ))
                            }
                            renderInput={(params) => <TextField label="Покупатель" {...params} sx={{width: '320px', mb: 4}} />}
                          />
                        )}
                      />
                  {isEdit && (
                    
                  <Card sx={{p: 2}}>
                    <Table >
                      <TableRow>
                        <TableCell>Объект</TableCell>
                        <TableCell>{currentProduct?.object?.name}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Продавец</TableCell>
                        <TableCell>{currentProduct?.seller?.name}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Покупатель</TableCell>
                        <TableCell>{currentProduct?.buyer?.name}</TableCell>
                      </TableRow>
                    </Table>
                    
                  </Card>
                  )}

                </Box>

                <Stack spacing={3}>

                    <Stack spacing={3} my={4}>
                    

                    <Controller
                        name="seller"
                        control={control}
                        render={({ field }) => (
                          <Autocomplete
                            {...field}
                            freeSolo
                            sx={{mb:1}}
                            onChange={(event, newValue) => field.onChange(newValue)}
                            options={contragents}
                            renderTags={(value, getTagProps) =>
                              value.map((option, index) => (
                                <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                              ))
                            }
                            renderInput={(params) => <TextField label="Продавец" sx={{width: '400px'}}  {...params} />}
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

                    {isEdit && (
                      <Alert severity="warning">
                        <AlertTitle>ВНИМАНИЕ</AlertTitle>
                          При обновлении запись снова попадает в отчет!<br/>
                          Если вы просто просматриваете запись,<br/> нажмите кнопку <Chip variant="" color="primary" label="Закрыть"></Chip>
                      </Alert>
                    )}

                    </Stack>
                    {/* <FormControlLabel
                      control={
                        <Switch name="taxes" onChange={handleAloneObject} />
                      }
                      label="Запись относится к нескольким объектам"
                    /> */}
                    

                  </Stack>
                
                <div>
                  <LabelStyle>Описание</LabelStyle>
                  <RHFTextField
                    multiline
                    name="description"
                    fullWidth
                    rows={5}
                    sx={{display: 'block'}}
                    
                  />
                  
                  <RHFTextField name="basis" label="Основание" sx={{my:2}} />

                  
                  <RHFTextField
                    name="summ"
                    label="Общая сумма"
                    placeholder="0"
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">₽</InputAdornment>,
                      type: 'number',
                    }}
                  />

                  <Box sx={{display: 'flex', alignItems: 'center', mt:2 }}>
                    
                    {isEdit &&  (
                      <NextLink href="/dashboard/note/list">
                        <LoadingButton variant="contained" size="large" sx={{mr:2 }} >
                          {isEdit &&  'Закрыть'}
                        </LoadingButton>
                      </NextLink>
                    )}
                    
                    <LoadingButton type="submit" variant="contained" color={isEdit ? "warning" : "primary"} size="large" sx={{mr:2 }} loading={isSubmitting}>
                      {!isEdit ? 'Сохранить' : 'Обновить'}
                    </LoadingButton>
                    {isEdit && (
                      <Avatar sx={{ bgcolor: currentProduct?.isChecked ? '#0a0' : '#d00' , mr: 2}}> </Avatar>
                    )}
                    {currentProduct?.createdAt && `Оформлено ${new Date(currentProduct?.createdAt)?.toLocaleDateString()}`}
                  </Box>
                </div>
                
                <div>
                  

                
                
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
                <CreateTable openModal={open} rows={TableStore.rows} objects={objects} isEdit={isEdit}>

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
    </>
  );
})

export default NewForm