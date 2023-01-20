import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useMemo, useState } from 'react';
// next
import { useRouter } from 'next/router';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
// @mui
import { Card, Chip, Grid, Stack, TextField, Typography, Autocomplete, InputAdornment, Box, Switch, FormControlLabel, Table, TableRow, TableCell, TableHead, TableBody, Avatar, Alert, AlertTitle, SpeedDial, SpeedDialIcon } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { FormProvider } from '../../../components/hook-form';


import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import CreateTable from './Table/CreateTable';
import TableStore from './Table/TableStore';
import { observer } from 'mobx-react';
import NewNomenklatura from './Main/NewNomenklatura';
import { Main } from './Main/Main';
import { PriceWidget } from './Widgets/PriceWidget';
import { WidgetController } from './Widgets/WidgetController';
import Import from './Import/Import';

// ----------------------------------------------------------------------



// ----------------------------------------------------------------------


 const NewForm = observer(({ isEdit, currentProduct }) => {

  const [contragents, setContragents] = useState([]);
  
  const [objects, setObjects] = useState([]);
  const [peopleList, setPeople] = useState([]);

  const [isOpenedImportModal, setIsOpenedImportModal] = useState(false);
  const [parsedData, setParsedData] = useState([]);

  
  const [objectModel, setObjectModel] = useState();

  const { push, query, reload } = useRouter();
  
  const [valueDate, setValueDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  
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

  const { enqueueSnackbar } = useSnackbar();


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
    fetch(`${process.env.NEXT_PUBLIC_HOST}/people`)
    .then((res) => res.json())
    .then((json) => {
      
      let list = json.map((item) => {
        return { label: `${item.surname} ${item.name} ${item.lastname}`, value: item.id };
      });

      setPeople(list);
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

  


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddPosition = (e) => {

    TableStore.addPosition()
    
  }

  const handleInsertFromClipboard = (e) => {
    console.log('ok')
    navigator.clipboard.readText().then((value) => {

      let clipboardData = value.trim()

      let parsedData = clipboardData.split('\r\n')

      parsedData = parsedData.map(row => row.split('\t'))

      setParsedData(parsedData)


    })
    setIsOpenedImportModal(true)
  }





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
        }

        

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

  const handleCloseImportModal = () => {
    setIsOpenedImportModal(false);
  };
    

  return (
    <>
    <Import isOpened={isOpenedImportModal} handleClose={handleCloseImportModal} data={parsedData}></Import>
    <WidgetController></WidgetController>
    <NewNomenklatura open={open} handleClose={handleClose}></NewNomenklatura>
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>

              <Main 
              valueDate={valueDate} 
              objects={objects} 
              methods={methods}  
              isEdit={isEdit} 
              currentProduct={currentProduct}
              objectModel={objectModel}
              contragents={contragents}
              setValueDate={setValueDate}
              setObjectModel={setObjectModel}
              peopleList={peopleList}
              />

              <Box>
                <ButtonGroup sx={{mt:2}}>
                  <Button onClick={handleClickOpen}>
                      Новая номенклатура
                  </Button>
                  <Button onClick={handleAddPosition}>
                      Добавить позицию
                  </Button>
                  <Button onClick={handleInsertFromClipboard}>
                      Импорт таблицы
                  </Button>
                </ButtonGroup>
                <CreateTable openModal={open} rows={TableStore.rows} objects={objects} isEdit={isEdit}/>
              </Box>
            </Stack>
          </Card>
        </Grid>
      </Grid>
      
    </FormProvider>
    </>
  );
})

export default NewForm