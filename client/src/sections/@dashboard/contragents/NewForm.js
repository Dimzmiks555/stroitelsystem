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



import { PartySuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';
import { endOfWeekWithOptions } from 'date-fns/fp';
import InvoiceBlock from './InvoiceBlock';
import { BankAccountsList } from './BankAccountsList';

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
      manager: currentProduct?.manager || '',
      ogrn: currentProduct?.ogrn || '',
      okato: currentProduct?.okato || '',
      oktmo: currentProduct?.oktmo || '',
      okpo: currentProduct?.okpo || '',
      opf: currentProduct?.opf || '',
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
      fetch(`${process.env.NEXT_PUBLIC_HOST}/contragents`, {
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
      <Grid container spacing={3} >
        <Grid item xs={12} md={8} sx={{displayPrint: 'none'}}>
          <Card sx={{ p: 3, display: 'flex', flexDirection: 'row' }}>
            <Stack sx={{display: 'flex', flexWrap: 'wrap', width: '47%', mr: 4, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'start'}}>
              <RHFTextField sx={{width: '100%', mb: 2}} size="small" name="name" label="Название"  />
              <RHFTextField sx={{width: '100%', mb: 2}} size="small" name="opf" label="ОПФ"  />
              <RHFTextField sx={{width: '100%', mb: 2}} size="small" name="address" label="Адрес"  />
              <RHFTextField sx={{width: '100%', mb: 2}} size="small" name="inn" label="ИНН"  />
              <RHFTextField sx={{width: '100%', mb: 2}} size="small" name="kpp" label="КПП"  />
              <RHFTextField sx={{width: '100%', mb: 2}} size="small" name="ogrn" label="ОГРН"  />
              <RHFTextField sx={{width: '100%', mb: 2}} size="small" name="okato" label="ОКАТО"  />
              <RHFTextField sx={{width: '100%', mb: 2}} size="small" name="okpo" label="ОКПО"  />
              <RHFTextField sx={{width: '100%', mb: 2}} size="small" name="oktmo" label="ОКТМО"  />
              <RHFTextField sx={{width: '100%', mb: 2}} size="small" name="phone" label="Номер телефона"  />
              <RHFTextField sx={{width: '100%', mb: 2}} size="small" name="manager" label="Управляющий"  />
            </Stack>
            <Box>
                <h2>Счета</h2>
                <BankAccountsList></BankAccountsList>
            </Box>
          </Card>
          
        </Grid>

        <Grid item xs={12} md={4} sx={{displayPrint: 'none'}}>
          <Stack spacing={3}>
            
            <LabelStyle>Автозаполнение</LabelStyle>
            <PartySuggestions token="cccd906b9f52be8f1ee449484885f4327766041c" value={reg_info} onChange={setRegInfo} />
            
            <div>
              <LabelStyle>Описание</LabelStyle>
              <RHFEditor simple name="description" />
            </div>

            <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
              {!isEdit ? 'Сохранить' : 'Изменить'}
            </LoadingButton>
          </Stack>
        </Grid>

        <Grid md={12} xs={12}>
            {
              isEdit && (
                
              <Card sx={{ p: 3, mt: 3 }}>
                <InvoiceBlock></InvoiceBlock>
              </Card>
              )
            }
        </Grid>
      </Grid>
    </FormProvider>
  );
}
