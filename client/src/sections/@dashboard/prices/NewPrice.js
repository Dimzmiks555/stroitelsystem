import { Button, Stack, TextField } from "@mui/material"
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";


export const NewPrice = () => {

    const router = useRouter()

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        
        fetch(`${process.env.NEXT_PUBLIC_HOST}/price`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'accept': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(json => {
            console.log(json)
            router.reload()
        })



    };



  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <Stack p={3} spacing={3} direction="row">
            <TextField label="Наименование" {...register("name")}/>
            <TextField type="number" label="Цена" {...register("price")}/>
            <TextField label="Ед. из" {...register("unit")}/>
            <Button type="submit" variant="contained">Создать</Button>
        </Stack>
    </form>
  )
}
