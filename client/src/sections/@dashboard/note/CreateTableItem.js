import { Autocomplete, Avatar, Box, Button, TextField } from "@mui/material"
import { observer } from "mobx-react"
import { useEffect, useState } from "react"
import TableStore from "./TableStore"

const CreateTableItem = observer(({item, objects, index}) => {

    const [list, setList] = useState([])
    
    const [value, setValue] = useState([])
    
    const [object, setObject] = useState([])
    
    const [edizm, setEdizm] = useState([])
    
    const [price, setPrice] = useState([])
    
    const [summ, setSumm] = useState([])
    
    const [amount, setAmount] = useState([])

    useEffect(()=> {

        fetch('http://localhost:5000/nomenklatura')
        .then(res => res.json())
        .then(json => {
        console.log(json)
        let list = json.map((item) => {
            return { label: item.name, value: item.id, edizm: item?.edizm };
        });

        setList(list)
        })

        


    }, [])

    function handleChange(e, newValue) {
        setValue(newValue)
        setEdizm(newValue?.edizm)
        if (newValue?.value) {
            TableStore.setValue(index, 'nomenklatura_id', newValue.value)
        } else {
            TableStore.setValue(index, 'nomenklatura_id', null)
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
        setAmount(e.target.value)
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
        TableStore.setValue(index, 'price', +e.target.value / +amount)
        setPrice(+e.target.value / +amount)
    }
    function PriceBlur(e) {
        TableStore.setValue(index, 'summ', +e.target.value * +amount)
        setSumm(+e.target.value * +amount)
    }

    return (
        <Box sx={{my:2, display: 'flex', alignItems: 'center'}}>
            <Avatar sx={{mr: 2}}>
                {item?.id}
            </Avatar>
            <Autocomplete
                options={list}
                name="rating"
                value={value}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} label='Наименование' sx={{width: 640}} />}
            />
            <TextField value={edizm} label='Ед. изм' onChange={handleChangeEdizm} sx={{width: '120px', mx: 2}} />
            <TextField value={amount} label='Кол-во' onChange={handleChangeAmount} sx={{width: '120px'}} />
            <TextField value={price} label='Цена' onBlur={PriceBlur}  onChange={handleChangePrice} sx={{width: '160px', mx: 2}} />
            <TextField value={summ} label='Сумма' onBlur={SummBlur} onChange={handleChangeSumm} sx={{width: '160px'}} />
            <Button sx={{ml: 2}} color="error" size="large" variant="contained">Удалить</Button>
        </Box>
    )

})


export default CreateTableItem