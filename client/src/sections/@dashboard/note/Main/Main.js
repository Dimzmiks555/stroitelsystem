import { DatePicker } from "@mui/lab";
import { LoadingButton } from '@mui/lab';
import { Card, Chip, Grid, Stack, TextField, Typography, Autocomplete, InputAdornment, Box, Switch, FormControlLabel, Table, TableRow, TableCell, TableHead, TableBody, Avatar, Alert, AlertTitle, Button } from '@mui/material';
import { useState } from "react";
import NextLink from 'next/link';
import { Controller } from "react-hook-form";
import { RHFTextField } from "src/components/hook-form";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import ToReportBlock from "./ToReportBlock";


export const Main = ({ setObjectModel, setValueDate, contragents, isEdit, currentProduct, methods, objects, valueDate, objectModel, peopleList}) => {
  


  const {
    reset,
    watch,
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  
  const router = useRouter()

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  

  const handleChangeObject = (e, newValue) => {
    setObjectModel(newValue)
  }

  const handleDeleteNote = () => {

    fetch(`${process.env.NEXT_PUBLIC_HOST}/notes/${router.query.id}`, {
      method: 'DELETE'
    })
    .then((res) => res.json)
    .then((json) => {
      console.log(json);
      

        let data = {
            isChecked: false
        }

        
        if (currentProduct?.isChecked) { data.isUpdatedAfterCheck = true }


        fetch(`${process.env.NEXT_PUBLIC_HOST}/notes/${router.query?.id}`, {
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

    });
  }

  
  
  
  
  return (
    
    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
    <Box sx={{display: 'flex', flexDirection: 'column', m: 2}}>
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
        renderInput={(params) => <TextField size="small"  {...params} sx={{mb:2}} />}
      />
      
      <Controller
        name="buyer"
        control={control}
        render={({ field }) => (
              <Autocomplete
                {...field}
                size="small"
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
        
      <Box sx={{p: 2}}>
          <Box sx={{mb:1}}>
            <b>Объект</b>
            <p>{currentProduct?.object?.name}</p>
          </Box>
          <Box sx={{mb:1}}>
            <b>Продавец</b>
            <p>{currentProduct?.seller?.name}</p>
          </Box>
          <Box sx={{mb:1}}>
            <b>Покупатель</b>
            <p>{currentProduct?.buyer?.name}</p>
          </Box>
          <Box>
            <b>Ответственное лицо</b>
            <p>{currentProduct?.person?.surname} {currentProduct?.person?.name} {currentProduct?.person?.lastname} </p>
          </Box>
        
      </Box>
      )}

    </Box>

    <Stack spacing={3}>

        <Stack spacing={1} my={2}>
        

        <Controller
            name="seller"
            control={control}
            render={({ field }) => (
              <Autocomplete
                {...field}
                size="small"
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
            size="small"
            sx={{mb:2}}
            onChange={handleChangeObject}
            options={objects}
            value={objectModel}
            renderInput={(params) => <TextField label="Объект" {...params} />}
          />
          <Controller
            name="person_id"
            control={control}
            render={({ field }) => (
              <Autocomplete
                {...field}
                freeSolo
                onChange={(event, newValue) => setValue('person_id', newValue?.value)}
                options={peopleList}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                  ))
                } 
                renderInput={(params) => <TextField label="Ответственное лицо" {...params} size="small" sx={{mb: 0}} />}
              />
            )}
          />


        </Stack>
        {/* <FormControlLabel
          control={
            <Switch name="taxes" onChange={handleAloneObject} />
          }
          label="Запись относится к нескольким объектам"
        /> */}
        

      </Stack>
    
    <div>
      <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
        <FormControlLabel control={<Switch />} label="Возврат" />

        {currentProduct?.deletedAt ? (
            <Button disabled onClick={handleDeleteNote} variant="contained" color="error">Удалено</Button>
        ) : (
            <Button onClick={handleDeleteNote} variant="contained" color="error">Удалить</Button>
        )}

        
      </Box>
      <RHFTextField
        multiline
        size="small"
        label="Описание"
        name="description"
        fullWidth
        rows={3}
        sx={{display: 'block', mt: 2}}
        
      />
      
      <RHFTextField size="small" name="basis" label="Основание" sx={{my:2}} />

      
      <RHFTextField
        name="summ"
        label="Общая сумма"
        size="small"
        placeholder="0"
        InputLabelProps={{ shrink: true }}
        InputProps={{
          startAdornment: <InputAdornment position="start">₽</InputAdornment>,
          type: 'number',
        }}
      />

      <Box sx={{display: 'flex', alignItems: 'center', mt:2 }}>
        
        <ToReportBlock currentProduct={currentProduct} open={open} handleClose={handleClose}></ToReportBlock>
        {isEdit &&  (
            <LoadingButton onClick={handleClickOpen} variant="contained" color='success' size="large" sx={{mr:2, color: 'white' }} >
              {isEdit &&  'В отчет'}
            </LoadingButton>
        )}
        
        <LoadingButton type="submit" variant="contained" size="large" sx={{mr:2 }} loading={isSubmitting}>
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

  )
}
