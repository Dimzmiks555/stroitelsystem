import merge from 'lodash/merge';
import { useState } from 'react';
// @mui
import { Card, CardHeader, Box, TextField } from '@mui/material';
// components
import ReactApexChart, { BaseOptionChart } from '../../../../components/chart';

// ----------------------------------------------------------------------

const CHART_DATA = [
  {
    year: 'Неделя',
    data: [
      { name: 'Заехало', data: [10, 41, 35, 151, 49, 62, 69, 91, 48, 48, 48, 48] },
      { name: 'Уехало', data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 48, 48, 48] },
    ],
  },
  {
    year: 'Месяц',
    data: [
      { name: 'Заехало', data: [148, 91, 69, 62, 49, 51, 35, 41, 10, 48, 48, 48] },
      { name: 'Уехало', data: [45, 77, 99, 88, 77, 56, 13, 34, 10, 10, 10, 10] },
    ],
  },
  {
    year: 'Год',
    data: [
      { name: 'Заехало', data: [76, 42, 29, 41, 27, 138, 117, 86, 63, 63, 63, 63] },
      { name: 'Уехало', data: [80, 55, 34, 114, 80, 130, 15, 28, 55, 28, 28, 28] },
    ],
  },
];

export default function BookingReservationStats() {
  const [seriesData, setSeriesData] = useState('Год');

  const handleChangeSeriesData = (event) => {
    setSeriesData(event.target.value);
  };

  const chartOptions = merge(BaseOptionChart(), {
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
    },
    tooltip: {
      y: {
        formatter: (val) => `$${val}`,
      },
    },
  });

  return (
    <Card>
      <CardHeader
        title="Статистика бронирования"
        subheader="(+43% приехало | +12% уехало) за этот год"
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
            <ReactApexChart type="bar" series={item.data} options={chartOptions} height={364} />
          )}
        </Box>
      ))}
    </Card>
  );
}
