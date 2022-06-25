import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import Iconify from 'src/components/Iconify';
import { PriceWidget } from './PriceWidget';
import { useState } from 'react';


export const WidgetController = () => {


    const [active, setActive] = useState('none')

    const actions = [
        { icon: <Iconify sx={{width: 20, height: 20}} icon={'akar-icons:calculator'} />, name: 'Калькулятор', action: 'calc' },
        { icon: <Iconify sx={{width: 20, height: 20}} icon={'majesticons:rubel-circle-line'} />, name: 'Цены', action: 'price'},
    ];


    return (
        <Box >
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<SpeedDialIcon />}
            >
                
                {actions.map((action) => (
                <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={e => {setActive(action.action)}}
                />
                ))}
            </SpeedDial>
            {
                active == 'price' && 
                <PriceWidget></PriceWidget>
            }
        </Box>
    )
}
