
import { Card, Chip, Grid, Stack, TextField, Typography, Autocomplete, InputAdornment, Table, TableHead, TableBody, TableRow, TableCell, TableFooter, Box, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import Link from 'next/link'
import { Controller } from 'react-hook-form';
import Iconify from 'src/components/Iconify';

export default function BoundItem({item, methods, currentItem}) {


    const BOUNDS = {
        'deal': {
            'name': 'Сделка',
            'url': 'deals',
        },
        'object': {
            'name': 'Объект',
            'url': 'objects',
        },
        'contragent': {
            'name': 'Контрагент',
            'url': 'contragents',
        },
    }

    const {
        reset,
        watch,
        control,
        setValue,
        getValues,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    function getLabel(current) {

        if (item == 'deal') {
            return 'Сделка № Т-' + current?.deal_number 
        } else {
            return current?.name
        }


    }

    const [list, setList] = useState([])

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_HOST}/${BOUNDS[item]?.url}`)
          .then((res) => res.json())
          .then((json) => {
            let list = json.map((item) => {
              return { label: getLabel(item), value: item.id };
            });
    
            setList(list);
          });
    
    
      }, []);

    return (
        <Card sx={{ p: 3 }}>
            <Box sx={{mb: 2}}>
            {BOUNDS[item]?.name} № {currentItem?.id}: {currentItem?.name}
            </Box>
            <Box sx={{display: 'flex'}}>
                <Controller
                name={`${item}_id`}
                control={control}
                render={({ field }) => (
                    <Autocomplete
                        {...field}
                        // size="small"
                        freeSolo
                        onChange={(event, newValue) => {
                            setValue(`${item}_id`, newValue?.value)
                        }}
                        options={list}
                        renderInput={(params) => <TextField label={BOUNDS[item]?.name} {...params} sx={{width: '320px', mr: 2}} />}
                    />
                    )}
                />
                <IconButton sx={{width: 56}} color="error">
                    <Iconify icon="fa6-solid:link-slash" ></Iconify>
                </IconButton>
            </Box>
        </Card>
    )
}