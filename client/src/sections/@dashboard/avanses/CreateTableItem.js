import { Autocomplete, Avatar, Box, Button, TextField } from "@mui/material"
import { observer } from "mobx-react"
import { useEffect, useState } from "react"
import TableStore from "./TableStore"

const CreateTableItem = observer(({item, openModal, index, isEdit}) => {

    const [list, setList] = useState([])
    
    const [value, setValue] = useState([])
    
    const [object, setObject] = useState([])
    
    const [edizm, setEdizm] = useState([])
    
    const [price, setPrice] = useState(0)
    
    const [summ, setSumm] = useState(0)
    
    const [amount, setAmount] = useState([])

    useEffect(()=> {

        fetch(`${process.env.NEXT_PUBLIC_HOST}/nomenklatura`)
        .then(res => res.json())
        .then(json => {
        console.log(json)
        let list = json.map((item) => {
            return { label: item.name, value: item.id, edizm: item?.edizm };
        });

        setList(list)
        })

        


    }, [openModal])

    function handleChange(e, newValue) {
        setValue(newValue)
        setEdizm(newValue?.edizm)
        if (newValue?.value) {
            TableStore.setValue(index, 'name', newValue.label)
        } else {
            TableStore.setValue(index, 'name', null)
        }
        if (newValue?.edizm) {
            TableStore.setValue(index, 'edizm', newValue.edizm)
        } else {
            TableStore.setValue(index, 'edizm', null)
        }
    }
    function handleChangeEdizm(e) {
        setEdizm(e.target.value)
        TableStore.setValue(index, 'edizm', e.target.value)
    }
    function handleChangeAmount(e) {
        setAmount(+e.target.value)
        TableStore.setValue(index, 'amount', +e.target.value)
    }
    function handleChangePrice(e) {
        setPrice(+e.target.value)
        TableStore.setValue(index, 'price', +e.target.value)
        // setPrice(+e.target.value * +amount)
    }
    function handleChangeSumm(e) {
        TableStore.setValue(index, 'summ', +e.target.value)
        setSumm(+e.target.value)
    }
    function SummBlur(e) {
        TableStore.setValue(index, 'price', +e.target.value / +TableStore.rows?.[index]?.amount)
        setPrice(+e.target.value / +TableStore.rows?.[index]?.amount)
    }
    function PriceBlur(e) {
        console.log(e.target.value)
        TableStore.setValue(index, 'summ', +e.target.value * +TableStore.rows?.[index]?.amount)
        setSumm(+e.target.value * +TableStore.rows?.[index]?.amount)
    }

    function handleDelete(e) {

        fetch(`${process.env.NEXT_PUBLIC_HOST}/note-products/${item?.id}`, {
            method: 'DELETE',
            headers: {
                Accept: 'applications/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(json => {
            console.log(json)
            TableStore.delete(index)
        })

    }

    return (
        <Box sx={{my:2, display: 'flex', alignItems: 'center'}}>
            {!isEdit ? (
                <>
                <Avatar sx={{mr: 2}}>
                    {item?.id}
                </Avatar>
                <Autocomplete
                    options={list}
                    name="rating"
                    value={TableStore?.rows?.[index]?.name}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} label='Наименование' sx={{width: 640}} />}
                />
                <TextField type="number" value={TableStore?.rows?.[index]?.amount} label='Кол-во' onChange={handleChangeAmount} sx={{width: '120px', ml: 2}} />
                <TextField value={TableStore?.rows?.[index]?.edizm} label='Ед. изм' onChange={handleChangeEdizm} sx={{width: '120px', mx: 2}} />
                <TextField type="number" value={price} label='Цена' onBlur={PriceBlur}  onChange={handleChangePrice} sx={{width: '160px', mx: 2}} />
                <TextField type="number" value={summ} label='Сумма' onBlur={SummBlur} onChange={handleChangeSumm} sx={{width: '160px'}} />
                {/* <Button sx={{ml: 2}} color="error" size="large" variant="contained"  onClick={handleDelete}>Удалить</Button> */}
                </>
            ) : (
                <>
                <Avatar sx={{mr: 2}}>
                    {index + 1}
                </Avatar>
                <TextField value={TableStore?.rows?.[index]?.name} label='Наименование' onChange={e => {handleChange(e, {label: e.target.value, edizm: TableStore?.rows?.[index]?.edizm, value: true})}} sx={{width: 600, mx: 2}} />
                <TextField type="number" value={TableStore?.rows?.[index]?.amount} label='Кол-во' onChange={handleChangeAmount} sx={{width: '120px', ml: 2}} />
                <TextField value={TableStore?.rows?.[index]?.edizm} label='Ед. изм' onChange={handleChangeEdizm} sx={{width: '120px', mx: 2}} />
                <TextField type="number" value={TableStore?.rows?.[index]?.price} label='Цена' onBlur={PriceBlur}  onChange={handleChangePrice} sx={{width: '160px', mx: 2}} />
                <TextField type="number" value={TableStore?.rows?.[index]?.summ} label='Сумма' onBlur={SummBlur} onChange={handleChangeSumm} sx={{width: '160px'}} />
                <Button sx={{ml: 2}} color="error" size="large" variant="contained" onClick={handleDelete}>Удалить</Button>
                </>
            )}
        </Box>
    )

})


export default CreateTableItem