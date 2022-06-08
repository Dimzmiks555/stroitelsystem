import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/router";

export default function AddPayment({type, contragents}) {


    const router = useRouter()

    const [description, setDescription] = useState('')
    const [summ, setSumm] = useState(null)
    const [contragentId, setContragentId] = useState(null)


    const handleSubmit = (e) => {

        let submitData = {
            description, 
            summ, 
            deal_id: router.query.id ,
            type
        }

        fetch(`http://localhost:5000/payment`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(submitData),
        })
        .then((res) => res.json)
        .then((json) => {
            router.reload()
            console.log(json);
        });


    }


    return (
        <Box sx={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', width: 400, mt: 2}}>
            <TextField onChange={e => {setDescription(e.target.value)}} sx={{width: '100%', mb:2}} label="Наименование"></TextField>
         
            <Autocomplete
                freeSolo
                onChange={(event, newValue) => setContragentId(newValue?.value)}
                options={contragents}
                renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                    <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                ))
                }
                renderInput={(params) => <TextField  label="Продавец" {...params} sx={{mb:2, width: 400}} />}
            />
            <TextField onChange={e => {setSumm(e.target.value)}} type="number" sx={{width: 200}} label="Сумма"></TextField>
            <Button  variant="contained" onClick={handleSubmit}>Сохранить</Button>
        </Box>
    )
}