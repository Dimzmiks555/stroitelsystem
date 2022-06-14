import { Box, TextField } from "@mui/material"
import { observer } from "mobx-react"
import CreateTableItem from "./CreateTableItem.js"

const CreateTable = observer(({rows, objects, isEdit, openModal}) => {


    return (
        <Box sx={{mt: 4, minHeight: 620}}>
            {rows?.map((item, index) => (
                <CreateTableItem key={index} item={item} objects={objects} index={index} openModal={openModal} isEdit={isEdit}>

                </CreateTableItem>
            ))}
            <Box sx={{my:2, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', width: '100%'}}>
                <Box sx={{my:2, display: 'flex', alignItems: 'center'}}>
                    <Box sx={{mr: 2}}>Итого</Box>
                    <TextField type="number" value={rows?.reduce((prev, now) => {return prev + +now.summ}, 0)?.toFixed(2)} sx={{mr: 20}}></TextField>
                </Box>
            </Box>
        </Box>
    )

} )


export default CreateTable