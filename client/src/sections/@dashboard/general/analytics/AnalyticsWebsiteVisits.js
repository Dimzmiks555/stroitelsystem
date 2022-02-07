import merge from 'lodash/merge';
// @mui
import { Card, CardHeader, Box } from '@mui/material';
// components
import ReactApexChart, { BaseOptionChart } from '../../../../components/chart';

// ----------------------------------------------------------------------

const CHART_DATA = [
  {
    name: 'Команда A',
    type: 'column',
    data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30,20],
  },
  {
    name: 'Команда B',
    type: 'area',
    data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43,100],
  },
  {
    name: 'Команда C',
    type: 'line',
    data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39,45],
  },
];

export default function AnalyticsWebsiteVisits() {
  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [0, 2, 3] },
    plotOptions: { bar: { columnWidth: '14%' } },
    fill: { type: ['solid', 'gradient', 'solid'] },
    labels: [
      '1/01/2003',
      '1/02/2003',
      '1/03/2003',
      '1/04/2003',
      '1/05/2003',
      '1/06/2003',
      '1/07/2003',
      '1/08/2003',
      '1/09/2003',
      '1/10/2003',
      '1/11/2003',
      '1/12/2003',
    ],
    // xaxis: { type: 'datetime' },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)} посетителей`;
          }
          return y;
        },
      },
    },
  });

  return (
    <Card>
      <CardHeader title="Посетители" subheader="(+43%) за прошлый год" />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={CHART_DATA} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
