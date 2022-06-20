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
    const [ avanses, setAvanses] = useState([])

    const router = useRouter()

    useEffect(()=> {

        fetch(`${process.env.NEXT_PUBLIC_HOST}/notes?object_id=${router.query.id}`)
        .then(res => res.json())
        .then(notesList => {

            fetch(`${process.env.NEXT_PUBLIC_HOST}/avanse?object_id=${router.query.id}`)
            .then(res => res.json())
            .then(avansesList => {
                fetch(`${process.env.NEXT_PUBLIC_HOST}/checkouts?object_id=${router.query.id}`)
                .then(res => res.json())
                .then(checkoutsList => {

                    let allData = []
                    
                    if (notesList.length > 0) {
                        notesList = notesList.map(item => {return {...item, expense_type: 'note'}})
                        allData.push(...notesList)
                    }
                    if (avansesList.length > 0) {
                        avansesList = avansesList.map(item => { return {...item, expense_type: 'avanse'}})
                        allData.push(...avansesList)
                    }
                    if (checkoutsList.length > 0) {
                        checkoutsList = checkoutsList.map(item => {return {...item, expense_type: 'checkout'}})
                        allData.push(...checkoutsList)
                    }
                    
                    console.log(allData)

                    allData.sort(function(a, b) {
                        return b.Date.localeCompare(a.Date);
                    })
                    setExpences(allData)
                })
            })

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
                {/* {avanses?.map((row, index) => (
                    <InvoiceRow key={row.id} row={row} index={index}></InvoiceRow>
                ))} */}
                </TableBody>
            </Table>

        </Stack>
    )
}