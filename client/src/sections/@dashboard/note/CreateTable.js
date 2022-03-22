import { Box } from "@mui/material"
import { observer } from "mobx-react"
import CreateTableItem from "./CreateTableItem"

const CreateTable = observer(({rows, objects}) => {


    return (
        <Box sx={{mt: 4, minHeight: 620}}>
            {rows?.map((item, index) => (
                <CreateTableItem item={item} objects={objects} index={index} >

                </CreateTableItem>
            ))}
        </Box>
    )

} )


export default CreateTable