import merge from 'lodash/merge';
import { useState } from 'react';
// @mui
import { Card, CardHeader, Box, TextField } from '@mui/material';
// components
import ReactApexChart, { BaseOptionChart } from '../../../../components/chart';

// ----------------------------------------------------------------------

const CHART_DATA = [
  {
    year: 2019,
    data: [
      { name: 'Приход', data: [10, 41, 35, 151, 49, 62, 69, 91, 48,10,20,30] },
      { name: 'Расход', data: [10, 34, 13, 56, 77, 88, 99, 77, 45,20,0,40] },
    ],
  },
  {
    year: 2020,
    data: [
      { name: 'Приход', data: [148, 91, 69, 62, 49, 51, 35, 41, 10,43,65,20] },
      { name: 'Расход', data: [45, 77, 99, 88, 77, 56, 13, 34, 10,29,54,38] },
    ],
  },
];

export default function EcommerceYearlySales() {
  const [seriesData, setSeriesData] = useState(2019);

  const handleChangeSeriesData = (event) => {
    setSeriesData(Number(event.target.value));
  };

  const chartOptions = merge(BaseOptionChart(), {
    legend: { position: 'top', horizontalAlign: 'right' },
    xaxis: {
      categories: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', "Окт",'Ноя','Дек'],
    },
  });

  return (
    <Card>
      <CardHeader
        title="Ранние продажи"
        subheader="(+43%) чем в прошлом году"
        action={
          <TextField
            select
            fullWidth
            value={seriesData}
            SelectProps={{ native: true }}
            onChange={handleChangeSeriesData}
            sx={{
              '& fieldset': { border: '0 !important' },
              '& select': { pl: 1, py: 0.5, pr: '24px !important', typography: 'subtitle2' },
              '& .MuiOutlinedInput-root': { borderRadius: 0.75, bgcolor: 'background.neutral' },
              '& .MuiNativeSelect-icon': { top: 4, right: 0, width: 20, height: 20 },
            }}
          >
            {CHART_DATA.map((option) => (
              <option key={option.year} value={option.year}>
                {option.year}
              </option>
            ))}
          </TextField>
        }
      />

      {CHART_DATA.map((item) => (
        <Box key={item.year} sx={{ mt: 3, mx: 3 }} dir="ltr">
          {item.year === seriesData && (
            <ReactApexChart type="area" series={item.data} options={chartOptions} height={364} />
          )}
        </Box>
      ))}
    </Card>
  );
}
