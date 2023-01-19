import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Header from './Header';

export interface IndicatorCardProps {
  title: string;
  value: number;
  percentage?: number;
}

function IndicatorCard({ title, value, percentage }: IndicatorCardProps) {
  return (
    <Card sx={{ minHeight: 120 }}>
      <CardContent>
        <Header text={title} />
        <Typography variant="h5" component="div">
          {value} c/kWh
        </Typography>
        {percentage && (
          <Typography color={percentage >= 0 ? 'green' : 'red'}>
            {percentage}%
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default IndicatorCard;
