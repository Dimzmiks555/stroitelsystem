
import { Card, Chip, Grid, Stack, TextField, Typography, Autocomplete, InputAdornment, Table, TableHead, TableBody, TableRow, TableCell, TableFooter } from '@mui/material';
import { useEffect, useState } from 'react';
import Link from 'next/link'
import { Controller } from 'react-hook-form';

export default function BoundItem({item, methods}) {


    const {
        reset,
        watch,
        control,
        setValue,
        getValues,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    function getRoute(name) {

        if (name.search('Реализация') !== -1) {
            return 'checkouts'
        } else if (name.search('Запись') !== -1) {
            return 'note'
        }


    }

    const [list, setList] = useState([])

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_HOST}/${item}s`)
          .then((res) => res.json())
          .then((json) => {
            let list = json.map((item) => {
              return { label: item.name, value: item.id };
            });
    
            setList(list);
          });
    
    
      }, []);

    return (
        <Card sx={{ p: 3 }}>
            <Controller
            name={`${item}_id`}
            control={control}
            render={({ field }) => (
                <Autocomplete
                    {...field}
                    size="small"
                    freeSolo
                    onChange={(event, newValue) => field.onChange(newValue)}
                    options={list}
                    renderInput={(params) => <TextField label="Покупатель" {...params} sx={{width: '320px', mb: 4}} />}
                />
                )}
            />
        </Card>
    )
}