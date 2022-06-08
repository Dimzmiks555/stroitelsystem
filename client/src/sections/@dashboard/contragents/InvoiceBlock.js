import Stack from "@mui/material/Stack"
import Table from "@mui/material/Table"
import TableRow from "@mui/material/TableRow"
import TableCell from "@mui/material/TableCell"
import TableBody from "@mui/material/TableBody"
import TableHead from "@mui/material/TableHead"
import { useEffect, useState } from "react"
import {useRouter} from 'next/router'
import NextLink from 'next/link'
import { Checkbox } from "@mui/material"
import InvoiceRow from "./InvoiceRow"


export default function InvoiceBlock() {

    const [ expences, setExpences] = useState([])

    const router = useRouter()

    useEffect(()=> {

        fetch(`${process.env.NEXT_PUBLIC_HOST}/notes?seller_id=${router.query.name}`)
        .then(res => res.json())
        .then(json => {
          console.log(json)

          json.sort(function(a, b) {
            return b.Date.localeCompare(a.Date);
          })

          setExpences(json)
        })
    
    
    }, [])



    return (
        <Stack spacing={3} sx={{display: 'flex', flexWrap: 'wrap', width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>

            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>
                        </TableCell>
                        <TableCell>
                            Наименование
                        </TableCell>
                        <TableCell>
                            Кол-во
                        </TableCell>
                        <TableCell>
                            Ед. изм.
                        </TableCell>
                        <TableCell>
                            Цена
                        </TableCell>
                        <TableCell>
                            Сумма
                        </TableCell>
                        <TableCell>
                            Комментарий
                        </TableCell>
                    </TableRow>
                    
                </TableHead>
                <TableBody>
                {expences?.map((row, index) => (
                    <InvoiceRow key={row.id} row={row} index={index}></InvoiceRow>
                ))}
                </TableBody>
            </Table>

        </Stack>
    )
}