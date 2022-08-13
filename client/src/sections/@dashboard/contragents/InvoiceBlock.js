import Stack from "@mui/material/Stack"
import Table from "@mui/material/Table"
import TableRow from "@mui/material/TableRow"
import TableCell from "@mui/material/TableCell"
import TableBody from "@mui/material/TableBody"
import TableHead from "@mui/material/TableHead"
import { useEffect, useState } from "react"
import {useRouter} from 'next/router'
import NextLink from 'next/link'
import { Box, Checkbox } from "@mui/material"
import InvoiceRow from "./InvoiceRow"


export default function InvoiceBlock() {

    const [ expences, setExpences] = useState([])
    const [ total, setTotal] = useState(0)
    const [ selected, setSelected] = useState([])

    const router = useRouter()

    useEffect(()=> {

        fetch(`${process.env.NEXT_PUBLIC_HOST}/notes?seller_id=${router.query.name}`)
        .then(res => res.json())
        .then(json => {

          fetch(`${process.env.NEXT_PUBLIC_HOST}/avanse?contragent_id=${router.query.name}`)
            .then(res => res.json())
            .then(new_json => {

                let allData = [...new_json, ...json]

                allData.sort(function(a, b) {
                    return b.Date.localeCompare(a.Date);
                })

                setExpences(allData)
            })

        })
        
    
    
    }, [])

    useEffect(()=> {

        let total_notes = expences.filter(item => selected.includes(item.id))


        let total = total_notes.reduce((prev, now) => prev + +now?.summ , 0)

        setTotal(total)
    
    }, [selected])



    return (
        <Stack spacing={3} sx={{display: 'flex', flexWrap: 'wrap', width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Box sx={{
                position: 'fixed',
                top: 10,
                left: 'calc(50% - 100px)',
                width: 200,
                maxHeight: 100,
                py: 3,
                background: '#fff',
                 textAlign: 'center',
                 boxShadow: '0 7px 10px #ccc',
                 borderRadius: 2
            }}>
                Итого <b>{total}</b> руб.
            </Box>
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
                    <InvoiceRow selected={selected} setSelected={setSelected} key={row.id} row={row} index={index}></InvoiceRow>
                ))}
                {/* {avanses?.map((row, index) => (
                    <InvoiceRow key={row.id} row={row} index={index}></InvoiceRow>
                ))} */}
                </TableBody>
            </Table>

        </Stack>
    )
}