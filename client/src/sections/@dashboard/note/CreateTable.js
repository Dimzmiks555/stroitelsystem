import { Box } from "@mui/material"
import { observer } from "mobx-react"
import CreateTableItem from "./CreateTableItem"

const CreateTable = observer(({rows, objects, isEdit, openModal}) => {


    return (
        <Box sx={{mt: 4, minHeight: 620}}>
            {rows?.map((item, index) => (
                <CreateTableItem key={index} item={item} objects={objects} index={index} openModal={openModal} isEdit={isEdit}>

                </CreateTableItem>
            ))}
        </Box>
    )

} )


export default CreateTable