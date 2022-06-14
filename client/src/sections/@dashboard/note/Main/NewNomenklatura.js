import { Box } from "@mui/material"
import { observer } from "mobx-react"
import CreateTableItem from "../Table/CreateTableItem"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import NewForm from "../../nomenklatura/NewForm";

const NewNomenklatura = observer(({open, handleClose}) => {


    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth={'lg'}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            {"Новая номенклатура"}
            </DialogTitle>
            <DialogContent sx={{mt: 2}}>
                <NewForm></NewForm>
                <Box sx={{mt: 2}}>
                    <Button fullWidth size="large" onClick={handleClose}>Закрыть</Button>
                </Box>
            </DialogContent>
            
        </Dialog>
    )

} )


export default NewNomenklatura