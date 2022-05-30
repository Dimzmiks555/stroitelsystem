import { Checkbox, TableCell, TableRow } from "@mui/material";
import { useState } from "react";
import NextLink from 'next/link'

export default function InvoiceRow({row, index}) {
    const [checked, setChecked] = useState(false);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };


        return (
        <>
        <TableRow
        hover
        sx={{borderTop: '2px solid #dfdfdf', background: checked && '#6f8'}}
        
        key={row.id}
        tabIndex={-1}
        role="checkbox"
        >
        
        <TableCell  sx={{fontWeight: 'bold', fontSize: 12}} >
            <Checkbox checked={checked} onChange={handleChange}></Checkbox> {index + 1}
        </TableCell>
        <TableCell   sx={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', fontSize: 12 }}>
            <NextLink href={`/dashboard/note/${row.id}/edit`}>
            <a>Запись № {row?.id} от {new Date(row.Date).toLocaleDateString()}  </a>
            </NextLink>
        </TableCell>
        <TableCell  sx={{fontWeight: 'bold', fontSize: 12}} colSpan={3}>
            {row?.object?.name}
        </TableCell>
        <TableCell sx={{fontWeight: 'bold', fontSize: 12}} align="left">
            {row?.summ} руб.
        </TableCell>
        <TableCell sx={{fontWeight: 'bold', fontSize: 12, maxWidth: 240}} >{row?.description}</TableCell>
        </TableRow>
        
        {row?.products.map((product) => (
        <TableRow key={product.id} sx={{ background: checked && '#6f8'}}>
            
            <TableCell  sx={{fontWeight: 'bold', fontSize: 12}} >
            </TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell align="right">{product.amount}</TableCell>
            <TableCell >{product.edizm}</TableCell>
            <TableCell >{product.price} руб.</TableCell>
            <TableCell >{product.summ} руб.</TableCell>
            <TableCell sx={{fontWeight: 'bold', fontSize: 12}}>{row?.seller?.name}</TableCell>
        </TableRow>
        ))}
        </>
    )

    }
