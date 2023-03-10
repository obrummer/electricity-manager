import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { Price } from '../types';
import { useTheme } from '@mui/material/styles';

interface DayPriceChartProps {
  data: Price[];
  showTax: boolean;
  currentHour: string;
  today?: boolean;
}
function DayPriceChart({
  data,
  showTax,
  today,
  currentHour,
}: DayPriceChartProps) {
  const theme = useTheme();
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 30,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis label={{ value: 'c/kWh', position: 'top' }} />
          <Tooltip />
          {today && (
            <ReferenceLine id="reference-line" x={currentHour} stroke="black" />
          )}
          <Line
            type="monotone"
            dataKey="price"
            stroke={theme.palette.secondary.dark}
            dot={false}
            id="price-line"
          />
          {showTax && (
            <Line
              type="monotone"
              dataKey="priceWithTax"
              stroke={theme.palette.primary.dark}
              dot={false}
              id="price-with-tax-line"
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DayPriceChart;
