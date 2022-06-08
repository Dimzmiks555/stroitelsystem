import { Box, Card } from "@mui/material"
import { BankAccountCreate } from "./BankAccountCreate"

export const BankAccountsList = () => {
  return (
    <Box sx={{mt: 2}}>
        <Card sx={{p:2}}>
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Box>
                    <h4>Расчетный счет</h4>
                    <p>40802810513000023327</p>
                </Box>
                <Box sx={{pt:1, mr: 2}}>
                    <img height={'40px'} src="/banks/sber.png"></img>
                </Box>
            </Box>
            <Box>
                <h4>Наименование банка</h4>
                <p>ЦЕНТРАЛЬНО-ЧЕРНОЗЕМНЫЙ БАНК ПАО СБЕРБАНК Г. Воронеж</p>
            </Box>
            <Box>
                <h4>БИК</h4>
                <p>042007681</p>
            </Box>
            <Box>
                <h4>Корреспондентский счет</h4>
                <p>30101810600000000681</p>
            </Box>
        </Card>
        <BankAccountCreate></BankAccountCreate>
    </Box>
  )
}
