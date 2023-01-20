import { Icon } from '@iconify/react'
import { AppBar, Box, Button, Dialog, FormControl, IconButton, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow, Toolbar, Typography } from '@mui/material'
import React, { useState } from 'react'
import TableStore from '../Table/TableStore'

const Import = ({isOpened, handleClose, data}) => {


    const [columns, setColumns] = useState([
        {   colName: 'name',
            name: 'Наименование',
            dataIndex: null,
            type: 'string'
        },
        {   colName: 'amount',
            name: 'Кол-во',
            dataIndex: null,
            type: 'number'
        },
        {   colName: 'edizm',
            name: 'Ед. изм',
            dataIndex: null,
            type: 'string'
        },
        {   colName: 'price',
            name: 'Цена',
            dataIndex: null,
            type: 'number'
        },
        {   colName: 'summ',
            name: 'Сумма',
            dataIndex: null,
            type: 'number'
        },
    ])


    const importData = () => {
        TableStore.setRows([])

        data.forEach((row, index) => {
            TableStore.addPosition()

            columns.forEach(col => {
                if (col.dataIndex !== null) {
                    if (col.type == 'number') {
                        row[col.dataIndex] = +(row[col.dataIndex]?.trim()?.replace(',', '.')?.replace(' ', '')?.replace(' ', ''))
                    }
                    TableStore.setValue(index, col.colName, row[col.dataIndex])
                }
            })
        })


        handleClose()

    }

    const handleSelect = (e) => {

        let value = e.target.value

        setColumns((prev) => ([...prev].map(object => {
            if (object.name == value.name) {
                return {
                    ...object, 
                    dataIndex: value.value
                }
            } else {
                return object
            }
        })))

        console.log(columns)
    }

  return (
    <Dialog
        fullScreen
        open={isOpened}
        onClose={handleClose}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <Icon icon="material-symbols:close"></Icon>
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Импорт табличных данных из буфера обмена
            </Typography>
            <Button autoFocus color="inherit" onClick={importData}>
              Импортировать
            </Button>
          </Toolbar>
        </AppBar>
        <Box sx={{p: 6}}>
            <Table>
                <TableHead>
                    <TableRow>
                        {data?.[0]?.map((cell, index) => (
                            <TableCell>
                                <FormControl fullWidth>
                                    <InputLabel id="label">Колонка</InputLabel>
                                    <Select labelId="label" id="select" fullWidth label="Колонка" onChange={handleSelect} renderValue={(value) => value.name}>
                                        {columns?.map(col => (
                                            <MenuItem value={{name: col?.name, value: index}}>{col?.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.map(row => (
                        <TableRow>
                            {row?.map(cell => (
                                <TableCell>
                                    {cell}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
      </Dialog>
  )
}

export default Import