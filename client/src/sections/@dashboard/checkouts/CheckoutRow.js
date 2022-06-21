import React, { useState, useEffect } from 'react'
import { IconButton, Stack, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material'
import Iconify from 'src/components/Iconify'
import useFetch from 'src/hooks/useFetch'
import { useRouter } from 'next/router'

export const CheckoutRow = ({item}) => {

    const [price, setPrice] = useState(item?.price_after_discount)
    const [summ, setSumm] = useState(item?.summ_after_discount)

    useEffect(() => {
        
        setPrice(item?.price_after_discount)
        setSumm(item?.summ_after_discount)

    }, [item])

    const handleSubmit = (e) => {
        e.preventDefault()

        fetch(`${process.env.NEXT_PUBLIC_HOST}/checkouts-products/${item.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify({price, summ})
        })
        .then(res => res.json())
        .then(json => {
            console.log(json)
        })



    }

    return (
        <TableRow>
            <TableCell>
                {item?.name}
            </TableCell>
            <TableCell>
                {item?.price}
            </TableCell>
            <TableCell>
                <TextField type="number" onChange={e => {setPrice(e.target.value)}} value={price} sx={{width:120}}></TextField>
            </TableCell>
            <TableCell>
                {item?.amount}
            </TableCell>
            <TableCell>
                {item?.summ}
            </TableCell>
            <TableCell>
                <TextField type="number" onChange={e => {setSumm(e.target.value)}} value={summ} sx={{width:120}}></TextField>
            </TableCell>
            <TableCell>
                <IconButton onClick={handleSubmit} color="success" edge="start">
                    <Iconify sx={{color: '#0d0'}} icon={'akar-icons:check'}></Iconify>
                </IconButton>
            </TableCell>
        </TableRow>
    )
}
