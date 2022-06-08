import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from "react";

export const BankAccountCreate = () => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const [bank, setBank] = useState('');

  const handleChangeBank = (event) => {
    setBank(event.target.value);
  };
    
  
    return (
      <div>
        <Button sx={{mt: 2}} variant="outlined" onClick={handleClickOpen}>
          Добавить счет
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Новый счёт"}
          </DialogTitle>
          <DialogContent >
              <Box sx={{pt:2, display: 'flex', flexWrap: 'wrap'}}>
                <Box sx={{ minWidth: 120, width: '100%', mb: 2 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Банк</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={bank}
                        label="Банк"
                        onChange={handleChangeBank}
                        >
                        <MenuItem value={"СБЕРБАНК"}>СБЕРБАНК</MenuItem>
                        <MenuItem value={"ВТБ"}>ВТБ</MenuItem>
                        <MenuItem value={"ТИНЬКОФФ"}>ТИНЬКОФФ</MenuItem>
                        <MenuItem value={"ГАЗПРОМБАНК"}>ГАЗПРОМБАНК</MenuItem>
                        <MenuItem value={"АЛЬФАБАНК"}>АЛЬФАБАНК</MenuItem>
                        <MenuItem value={"РОССЕЛЬХОЗ"}>РОССЕЛЬХОЗ</MenuItem>
                        <MenuItem value={"МИНБАНК"}>МИНБАНК</MenuItem>
                        <MenuItem value={"ОТКРЫТИЕ"}>ОТКРЫТИЕ</MenuItem>
                        <MenuItem value={"СОВКОМБАНК"}>СОВКОМБАНК</MenuItem>
                        <MenuItem value={"РАЙФФАЙЗЕНБАНК"}>РАЙФФАЙЗЕНБАНК</MenuItem>
                        <MenuItem value={"ПОЧТАБАНК"}>ПОЧТАБАНК</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <TextField sx={{width: '100%', mb: 2}} label="Расчетный счет"/>
                <TextField sx={{width: '100%', mb: 2}} label="Наименование банка"/>
                <TextField sx={{width: '100%', mb: 2}} label="БИК"/>
                <TextField sx={{width: '100%'}} label="Корреспондентский счет"/>
              </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Закрыть</Button>
            <Button onClick={handleClose} variant="contained" autoFocus>
                Создать
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}
