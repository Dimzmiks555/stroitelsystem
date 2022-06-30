import Stack from "@mui/material/Stack"
import Table from "@mui/material/Table"
import TableRow from "@mui/material/TableRow"
import TableCell from "@mui/material/TableCell"
import TableBody from "@mui/material/TableBody"
import TableHead from "@mui/material/TableHead"
import { useEffect, useState } from "react"
import {useRouter} from 'next/router'
import NextLink from 'next/link'
import { Box, Checkbox, TextField } from "@mui/material"
import InvoiceRow from "./InvoiceRow"
import { DatePicker } from "@mui/lab"


export default function InvoiceBlock({object}) {

    const [ expences, setExpences] = useState([])
    const [ avanses, setAvanses] = useState([])
    
    const [ startDate, setStartDate] = useState(0)
    const [ endDate, setEndDate] = useState(new Date())

    const router = useRouter()

    useEffect(() => {
        console.log(object)
        setStartDate(object?.initial_balance_date)
    }, [object])

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
            <Box>
                <h2>Сводка</h2>
                <Stack spacing={3} direction="row" mt="30px">
                    <DatePicker
                        orientation="landscape"
                        openTo="day"
                        value={startDate}
                        label="От"
                        mask='__/__/____'
                        inputFormat="dd/MM/yyyy"
                        renderInput={(params) => <TextField size="small"  {...params} sx={{mb:4}} />}
                    />
                    <DatePicker
                        orientation="landscape"
                        openTo="day"
                        value={endDate}
                        label="До"
                        mask='__/__/____'
                        inputFormat="dd/MM/yyyy"
                        renderInput={(params) => <TextField size="small"  {...params} sx={{mb:4}} />}
                    />
                </Stack>
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