// @mui
import { DataGrid } from '@mui/x-data-grid';
import { Autocomplete, Box, IconButton, Rating, TextField } from '@mui/material';
// _mock_
import { _dataGrid } from '../../../_mock';
// components
import Iconify from '../../../components/Iconify';
import { useCallback, useEffect, useState } from 'react';

// ----------------------------------------------------------------------




function RatingEditInputCell(props) {


  const [list, setList] = useState([])

  useEffect(()=> {

    fetch(`${process.env.NEXT_PUBLIC_HOST}/nomenklatura`)
    .then(res => res.json())
    .then(json => {
      console.log(json)
      let list = json.map((item) => {
        return { label: item.name, value: item.id, edizm: item?.edizm };
      });

      setList(list)
    })


  }, [])



  const { id, value, api, field } = props;

  const handleChange = async (event, newValue) => {
    api.setEditCellValue({ id, field, value: newValue?.label }, event);
    api.setEditCellValue({ id, field: 'edizm', value: newValue?.edizm }, event);
    // Check if the event is not from the keyboard
    // https://github.com/facebook/react/issues/7407
    if (event.nativeEvent.clientX !== 0 && event.nativeEvent.clientY !== 0) {
      // Wait for the validation to run
      const isValid = await api.commitCellChange({ id, field });
      const isValidED = await api.commitCellChange({ id, field: 'edizm' });
      if (isValid) {
        api.setCellMode(id, field, 'view');
        api.setCellMode(id, 'edizm', 'view');
      }
    }
  };

  const handleRef = (element) => {
    if (element) {
      element.querySelector(`input`).focus();
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'stretch', background: '#fff'}}>
      <Autocomplete
        options={list}
        ref={handleRef}
        name="rating"
        value={value}
        onChange={handleChange}
        renderInput={(params) => <TextField {...params} size="small" variant="standard" sx={{width: '418px', p: '12px'}} />}
      />
    </Box>
  );
}

function SummEditInputCell(props) {

  const { id, value, api, field } = props;

  const handleChange = async (event) => {


    let amount = +api.getCellValue(id, 'amount')

    console.log(event.target.value)

    api.setEditCellValue({ id, field, value: event.target.value }, event);
    api.setEditCellValue({ id, field: 'price', value: +event.target.value / amount }, event);
    // Check if the event is not from the keyboard
    // https://github.com/facebook/react/issues/7407
    if (event.nativeEvent.clientX !== 0 && event.nativeEvent.clientY !== 0) {
      // Wait for the validation to run
      const isValid = await api.commitCellChange({ id, field }) && await api.commitCellChange({ id, field: 'price' });
      if (isValid) {
        api.setCellMode(id, 'price', 'view');
      }
      
    }
  };

  const handleRef = (element) => {
    if (element) {
      element.querySelector(`input`).focus();
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'stretch', background: '#fff'}}>
      <TextField name="summ" onChange={handleChange} ref={handleRef} value={value} size="small" variant="standard" sx={{width: '120px', p: '12px'}} />
    </Box>
  );
}

function renderRatingEditInputCell(params) {
  return <RatingEditInputCell {...params} />;
}
function renderSummEditInputCell(params) {
  return <SummEditInputCell {...params} />;
}

const columns = [
  {
    field: 'id',
    headerName: '№',
    width: 120,
  },
  {
    field: 'firstName',
    headerName: 'Наименование',
    width: 420,
    editable: true,
    renderEditCell: renderRatingEditInputCell,
  },
  {
    field: 'amount',
    headerName: 'Количество',
    width: 160,
    editable: true,
  },
  {
    field: 'edizm',
    headerName: 'Ед. изм.',
    type: 'string',
    width: 120,
    editable: true,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'price',
    headerName: 'Цена',
    type: 'number',
    width: 120,
    editable: true,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'total',
    headerName: 'Сумма',
    type: 'number',
    width: 120,
    editable: true,
    align: 'center',
    headerAlign: 'center',
    renderEditCell: renderSummEditInputCell,
  },
  {
    field: 'fullName',
    headerName: 'Объект',
    editable: true,
    description: 'This column has a value getter and is not sortable.',
    flex: 1,
  },
  // {
  //   field: 'action',
  //   headerName: ' ',
  //   width: 80,
  //   align: 'right',
  //   sortable: false,
  //   disableColumnMenu: true,
  //   renderCell: () => (
  //     <IconButton>
  //       <Iconify icon={'eva:more-vertical-fill'} sx={{ width: 20, height: 20 }} />
  //     </IconButton>
  //   ),
  // },
];


function renderRating(params) {
  return <Rating readOnly value={params.value} />;
}

export default function DataGridBasic({rows}) {

  

  return <DataGrid 
    columns={columns} 
    rows={rows} 
    checkboxSelection 
    disableSelectionOnClick 
    getCellClassName={(params) => {
      return 'open';
    }}
  />;
}
