import { Button, Stack, TextField } from "@mui/material"
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";


export const NewPrice = ({isEdit, priceModel}) => {

    const router = useRouter()

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            name: priceModel?.name,
            price: priceModel?.price,
            unit: priceModel?.unit,
        }
    });
    const onSubmit = data => {
        
        if (isEdit) {
            fetch(`${process.env.NEXT_PUBLIC_HOST}/price/${priceModel?.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json',
                    'accept': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(json => {
                console.log(json)
                // router.reload()
            })
        } else {
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
        }
        



    };



  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <Stack p={2} spacing={3} direction="row">
            <TextField label="Наименование" {...register("name")}/>
            <TextField type="number" label="Цена" {...register("price")}/>
            <TextField label="Ед. из" {...register("unit")}/>
            {!isEdit ?
                <Button type="submit" variant="contained">Создать</Button>
                :
                <Button type="submit" variant="contained" >Изменить</Button>
            }
        </Stack>
    </form>
  )
}
