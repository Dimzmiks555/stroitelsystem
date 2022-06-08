import { Box, Button, Card, Chip, IconButton } from "@mui/material"
import { useEffect, useState } from "react"
import AddPayment from "./AddPayment"
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import DeletePayment from "./DeletePayment";

export default function PaymentList({payments}) {


    const [ isAdding, setIsAdding ] = useState(false)


    const [openDelete, setOpenDelete] = useState(false);

    const handleClickOpenDeletePayment = () => {
        setOpenDelete(true);
    };
  
    const handleCloseDeletePayment = () => {
        setOpenDelete(false);
    };


    return (
        <Box sx={{mt: 3}}>
            {
                payments?.map(payment => (
                    <Card key={payment?.id} sx={{p:3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2}}>
                        <Box>
                            {payment?.description}
                        </Box>
                        <Box>
                            {payment?.summ}
                            <IconButton sx={{ml:2}}>
                                <EditIcon ></EditIcon>
                            </IconButton>
                            <IconButton sx={{ml:2}} onClick={handleClickOpenDeletePayment}>
                                <ClearIcon color="error"></ClearIcon>
                            </IconButton>
                            <DeletePayment payment_id={payment?.id} handleClose={handleCloseDeletePayment} handleOpen={handleClickOpenDeletePayment} open={openDelete}></DeletePayment>
                        </Box>
                    </Card>
                ) )
            }
              
        </Box>
    )
}