import { Box, IconButton, InputAdornment, Stack, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material'
import React from 'react'
import Iconify from 'src/components/Iconify'
import { CheckoutRow } from './CheckoutRow'
import { useRouter } from 'next/router'

export const CheckoutTable = ({checkout, setCheckout, setNewSumm}) => {

    const [percent, setPercent] = React.useState(0)
    const router = useRouter()

    const handlePercent = (e) => {

        setPercent(e.target.value)

        let coefficient = e.target.value / 100

        let newCheckout = checkout

        newCheckout.summ_after_discount = +newCheckout.summ - ( coefficient * +newCheckout.summ ) 

        newCheckout.products = newCheckout.products.map(item => {
            return {
                ...item, 
                price_after_discount: +item.price - ( coefficient * +item.price ) ,
                summ_after_discount: +item.summ - ( coefficient * +item.summ ) 
            }
        })

        console.log(newCheckout.summ_after_discount)
        setNewSumm(newCheckout.summ_after_discount)
        setCheckout(newCheckout)

    }

    const onSubmit = async () => {
        try {
            
            fetch(`${process.env.NEXT_PUBLIC_HOST}/checkouts/${router?.query?.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    summ_after_discount: checkout?.summ_after_discount
                }),
            })
            .then((res) => res.json)
            .then((json) => {
                console.log(json);

                Promise.all(checkout?.products.map(note => {
                    return fetch(`${process.env.NEXT_PUBLIC_HOST}/checkouts-products/${note.id}`, {
                      method: 'PATCH',
                      headers: {
                        'Content-type': 'application/json',
                        'Accept': 'application/json'
                      },
                      body: JSON.stringify({
                        summ_after_discount: note?.summ_after_discount,
                        price_after_discount: note?.price_after_discount,
                      })
              
                    })
                  }))
                  .then(json => {
                    router.reload()
                    console.log(json)
                  })



            });
        
            // enqueueSnackbar(!isEdit ? 'Успешно создано!' : 'Успешно сохранено!');
        } catch (error) {
            console.error(error);
        }
    };


  return (
    
    <Stack spacing={3}>
    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
        <h2>Позиции</h2>
        <Box sx={{display: 'flex', alignItems: 'center'}}>
            <p>Применить скидку</p>
            <TextField  
                type="number" 
                value={percent}
                onChange={handlePercent}
                sx={{width:120, mx: 4}} 
                InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <Iconify sx={{width: 30, height: 25}} icon={'la:percent'}></Iconify>
                    </InputAdornment>
                ),
            }}/>
            
            <IconButton onClick={onSubmit} color="success" edge="start">
                <Iconify sx={{color: '#0d0'}} icon={'akar-icons:check'}></Iconify>
            </IconButton>
        </Box>
    </Box>
    <Table>
      <TableHead>
        <TableCell>
          Наименование
        </TableCell>
        <TableCell>
          Цена
        </TableCell>
        <TableCell>
          Цена со скидкой
        </TableCell>
        <TableCell>
          Кол-во
        </TableCell>
        <TableCell>
          Сумма
        </TableCell>
        <TableCell>
          Сумма со скидкой
        </TableCell>
        <TableCell>
          
        </TableCell>
      </TableHead>
      <TableBody>
        {checkout?.products?.map(item => (
            <CheckoutRow item={item}></CheckoutRow>
        ))}
      </TableBody>
    </Table>
  </Stack>
  )
}
