import merge from 'lodash/merge';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Card, CardHeader } from '@mui/material';
// components
import ReactApexChart, { BaseOptionChart } from '../../../../components/chart';

// ----------------------------------------------------------------------

const CHART_HEIGHT = 392;
const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(2),
  '& .apexcharts-canvas svg': {
    height: CHART_HEIGHT,
  },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible',
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

// ----------------------------------------------------------------------

const CHART_DATA = [
  { name: 'Серия 1', data: [80, 50, 30, 40, 100, 20] },
  { name: 'Серия 2', data: [20, 30, 40, 80, 20, 80] },
  { name: 'Серия 3', data: [44, 76, 78, 13, 43, 10] },
];

export default function AnalyticsCurrentSubject() {
  const theme = useTheme();

  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: 2 },
    fill: { opacity: 0.48 },
    legend: { floating: true, horizontalAlign: 'center' },
    xaxis: {
      categories: ['Английский язык', 'История', 'Физика', 'География', 'Китайский язык', 'Математика'],
      labels: {
        style: {
          colors: [
            theme.palette.text.secondary,
            theme.palette.text.secondary,
            theme.palette.text.secondary,
            theme.palette.text.secondary,
            theme.palette.text.secondary,
            theme.palette.text.secondary,
          ],
        },
      },
    },
  });

  return (
    <Card>
      <CardHeader title="Текущий предмет" />
      <ChartWrapperStyle dir="ltr">
        <ReactApexChart type="radar" series={CHART_DATA} options={chartOptions} height={340} />
      </ChartWrapperStyle>
    </Card>
  );
}
