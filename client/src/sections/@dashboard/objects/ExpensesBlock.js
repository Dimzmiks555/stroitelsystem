
import { Card, Chip, Grid, Stack, TextField, Typography, Autocomplete, InputAdornment, Table, TableHead, TableBody, TableRow, TableCell, TableFooter } from '@mui/material';
import { useEffect, useState } from 'react';
import Link from 'next/link'

export default function ExpensesBlock({expenses}) {


    function getRoute(name) {

        if (name.search('Реализация') !== -1) {
            return 'checkouts'
        } else if (name.search('Запись') !== -1) {
            return 'note'
        }


    }

    return (
        <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
                <h2>Расходы</h2>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Документ
                            </TableCell>
                            <TableCell>
                                Сумма
                            </TableCell>
                            <TableCell>
                                Дата
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {expenses?.map(expense => (
                        <TableRow>
                            <TableCell>
                                <Link href={`/dashboard/${getRoute(expense.name)}/${expense.id}/edit`}>
                                {expense?.name}
                                </Link>
                            </TableCell>
                            <TableCell>
                                {expense?.summ} руб.
                            </TableCell>
                            <TableCell>
                                {new Date(expense?.Date)?.toLocaleDateString()} 
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                    <TableHead >
                        <TableCell sx={{textAlign: 'right'}}>
                            Итого
                        </TableCell>
                        <TableCell>
                            {expenses?.reduce((prev, now) => +prev + +now?.summ, 0)} руб.
                        </TableCell>
                        <TableCell>
                            
                        </TableCell>
                    </TableHead>
                </Table>
            </Stack>
        </Card>
    )
}