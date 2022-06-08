import { Box, Button, Chip } from "@mui/material"
import { useEffect, useState } from "react"
import AddPayment from "./AddPayment"
import PaymentList from "./PaymentList"

export default function PaymentBlock({dealSumm, dealId, type, contragents}) {

    const [ payments, setPayments ] = useState([])
    const [ status, setStatus ] = useState('none')
    const [ isAdding, setIsAdding ] = useState(false)
    
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_HOST}/payment?deal_id=${dealId}&type=${type}`)
        .then(res => res.json())
        .then(json => {
            // router.reload()
            console.log(json);

            let payments_summ = json?.rows?.reduce((prev, now) => prev + +now?.summ, 0)
            console.log(payments_summ, dealSumm)
            if (payments_summ == 0) {
                setStatus('none')
            } else if (payments_summ >= +dealSumm) {
                setStatus('full')
            } else if (payments_summ < +dealSumm) {
                setStatus('part')
            } 

            setPayments(json?.rows)
        });
    }, [dealSumm])


    return (
        <Box >
            <h3>Оплаты <Button onClick={e => {setIsAdding(!isAdding)}} sx={{ ml: 3}} variant="outlined">Добавить</Button>{
                status == 'full' ? 
                (<Chip sx={{color: "#fff" , ml: 3}}  color={"success"} label="Полная оплата"></Chip>):
                status == 'part' ? 
                (<Chip sx={{color: "#fff" , ml: 3}}  color={"error"} label="Частичная оплата"></Chip>)
                :
                (<Chip sx={{color: "#333" , ml: 3}}  color={"default"} label="Нет оплаты"></Chip>)
            } </h3>
            {isAdding && (
                <AddPayment contragents={contragents} type={type} ></AddPayment>
            )}
            <PaymentList payments={payments}></PaymentList>
        </Box>
    )
}