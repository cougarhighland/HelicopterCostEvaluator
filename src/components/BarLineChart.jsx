import { BarChart } from '@mui/x-charts/BarChart';
import formatData from '../utils';
import { axisClasses } from '@mui/x-charts';
import { LineChart } from '@mui/x-charts';

const chartSetting = {
  yAxis: [
    {
      label: 'USD',
    },
  ],
  width: 1000,
  height: 400,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-10px, 0)',
    },
  },
};

const lineSetting = {
  yAxis: [
    {
      label: 'year(s)',
    },
  ],
  width: 1000,
  height: 400,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-10px, 0)',
    },
  },
};

export default function BarLineChart({ dataset }) {
  const rows = formatData(dataset);
  return (
    <div>
      <BarChart
        dataset={rows}
        xAxis={[{ scaleType: 'band', dataKey: 'col1' }]}
        series={[
          { dataKey: 'col2', label: 'Total Price' },
          { dataKey: 'col3', label: 'Annual Failure Cost' },
        ]}
        {...chartSetting}
      />
      <LineChart
        dataset={rows}
        xAxis={[{ scaleType: 'band', dataKey: 'col1' }]}
        series={[{ dataKey: 'col4', label: 'MTBF' }]}
        {...lineSetting}
      />
    </div>
  );
}
