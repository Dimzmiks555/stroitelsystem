import { Box } from "@mui/material"
import { observer } from "mobx-react"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";

const ToReportBlock = observer(({open, handleClose, currentProduct}) => {


    const { push, query, reload } = useRouter();
    
    const { enqueueSnackbar } = useSnackbar();


    const handleToReport = (e) => {
        let data = {
            isChecked: false
        }
    
        
        if (currentProduct?.isChecked) { data.isUpdatedAfterCheck = true }
    
    
        fetch(`${process.env.NEXT_PUBLIC_HOST}/checkouts/${query?.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then((res) => res.json)
        .then((json) => {
            console.log(json);
        });
        enqueueSnackbar('Статус изменен!');
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            {"Добавить в отчет?"}
            </DialogTitle>
            <DialogContent >
            </DialogContent>
            <DialogActions>
                <Button  size="large" variant="contained" color="success" onClick={handleToReport} sx={{color: 'white'}}>Добавить</Button>
                <Button  size="large" onClick={handleClose}>Закрыть</Button>
            </DialogActions>
        </Dialog>
    )

} )


export default ToReportBlock