import { BarPlot } from '@mui/x-charts/BarChart';
import { LinePlot } from '@mui/x-charts/LineChart';
import { ChartContainer } from '@mui/x-charts/ChartContainer';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';

export default function CombiningChart({ dataSet }) {
  const series = [
    {
      type: 'bar',
      stack: '',
      yAxisKey: 'cost',
      data: dataSet[2],
      label: 'Total Price',
    },
    {
      type: 'bar',
      stack: '',
      yAxisKey: 'cost',
      data: dataSet[3],
      label: 'Annual Failure Cost',
    },
    {
      type: 'line',
      yAxisKey: 'year',
      color: 'green',
      data: dataSet[4],
    },
  ];

  return (
    <ChartContainer
      series={series}
      width={1000}
      height={600}
      xAxis={[
        {
          id: 'product',
          data: dataSet[1],
          scaleType: 'band',
        },
      ]}
      yAxis={[
        {
          id: 'cost',
          scaleType: 'linear',
        },
        {
          id: 'year',
          scaleType: 'chart',
        },
      ]}
    >
      <BarPlot />
      <LinePlot />
      <ChartsXAxis position="bottom" axisId="product" />
      <ChartsYAxis label="USD" position="left" axisId="cost" />
      <ChartsYAxis label="Years" position="right" axisId="year" />
    </ChartContainer>
  );
}
