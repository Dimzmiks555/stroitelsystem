import { useState } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useRouter } from "next/router";

export default function DeletePayment({handleOpen, handleClose, open, payment_id}) {
  
    const router = useRouter()

    const handleDelete = () => {

        fetch(`http://localhost:5000/payment/${payment_id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }
        })
        .then((res) => res.json)
        .then((json) => {
            router.reload()
            console.log(json);
        });
    }
  
    return (
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Подтвердить удаление?"}
          </DialogTitle>
          <DialogContent>
            {/* <DialogContentText id="alert-dialog-description">
              Let Google help apps determine location. This means sending anonymous
              location data to Google, even when no apps are running.
            </DialogContentText> */}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Отменить</Button>
            <Button onClick={handleDelete} color="error" autoFocus>
              Удалить
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }