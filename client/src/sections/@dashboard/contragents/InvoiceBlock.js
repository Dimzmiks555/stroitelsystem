import Stack from "@mui/material/Stack"
import Table from "@mui/material/Table"
import TableRow from "@mui/material/TableRow"
import TableCell from "@mui/material/TableCell"
import TableBody from "@mui/material/TableBody"
import TableHead from "@mui/material/TableHead"
import { useEffect, useState } from "react"
import {useRouter} from 'next/router'
import NextLink from 'next/link'


export default function InvoiceBlock() {

    const [ expences, setExpences] = useState([])

    const router = useRouter()

    useEffect(()=> {

        fetch(`http://localhost:5000/notes?seller_id=${router.query.name}`)
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
                    <>
                    <TableRow
                    hover
                    sx={{borderTop: '2px solid #dfdfdf'}}
                    
                    key={row.id}
                    tabIndex={-1}
                    role="checkbox"
                  >
                    
                    <TableCell  sx={{fontWeight: 'bold', fontSize: 12}} >
                      {index + 1}
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
                    <TableRow key={product.id}>
                      
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
                ))}
                </TableBody>
            </Table>

        </Stack>
    )
}