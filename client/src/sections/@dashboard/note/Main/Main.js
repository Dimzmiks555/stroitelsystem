import { DatePicker } from "@mui/lab";
import { LoadingButton } from '@mui/lab';
import { Card, Chip, Grid, Stack, TextField, Typography, Autocomplete, InputAdornment, Box, Switch, FormControlLabel, Table, TableRow, TableCell, TableHead, TableBody, Avatar, Alert, AlertTitle } from '@mui/material';
import { useState } from "react";
import NextLink from 'next/link';
import { Controller } from "react-hook-form";
import { RHFTextField } from "src/components/hook-form";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import ToReportBlock from "./ToReportBlock";


export const Main = ({ setObjectModel, setValueDate, contragents, isEdit, currentProduct, methods, objects, valueDate, objectModel}) => {
  


  const {
    reset,
    watch,
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  


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

  
  
  
  
  return (
    
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


        </Stack>
        {/* <FormControlLabel
          control={
            <Switch name="taxes" onChange={handleAloneObject} />
          }
          label="Запись относится к нескольким объектам"
        /> */}
        

      </Stack>
    
    <div>
      <h2>Описание</h2>
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
