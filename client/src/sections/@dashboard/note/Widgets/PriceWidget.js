import { Box, Card, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import Iconify from 'src/components/Iconify';

export const PriceWidget = () => {

    const [list, setList] = useState([])

    
    useEffect(()=> {

        fetch(`${process.env.NEXT_PUBLIC_HOST}/price`)
        .then(res => res.json())
        .then(json => {
            console.log(json)
            setList(json)
        })


    }, [])


    return (
        <Draggable handle="strong">
            <Card sx={{
                    position: 'absolute',
                    zIndex: 20,
                    width: 700,
                    background: '#efe',
                    top: '200px', 
                    left: '40%'
                }}>
                <strong>
                <Box sx={{background: '#3a8', pl: 2, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#fff'}}>
                    <h3>Цены</h3>
                    <IconButton ><Iconify sx={{width: 35, height: 35, color: '#fff'}} icon={'eva:close-square-outline'} /></IconButton>
                </Box>
                </strong>
                <Box sx={{p: 1, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'}}>
                    {list.map(price => (
                        <Box sx={{background: '#fff', p: 1, borderRadius: 1, mb: 1, display: 'flex', justifyContent: 'space-between', width: '48%'}}>
                            <p>{price?.name}</p>
                            <p>{price?.price} за {price?.unit}</p>
                        </Box>
                    ))}
                </Box>
            </Card>
        </Draggable>
    )
}
