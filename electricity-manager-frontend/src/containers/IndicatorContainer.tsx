import Grid from '@mui/material/Grid';
import { useGetIndicatorsQuery } from '../features/prices/pricesAPI';
import IndicatorCard from '../components/IndicatorCard';
import ContainerLoader from '../components/ContainerLoader';
import Paper from '@mui/material/Paper';

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper = ({ children }: WrapperProps) => (
  <Paper sx={{ padding: 2 }}>
    Indicators
    {children}
  </Paper>
);

function IndicatorContainer() {
  const { data, isLoading, isError } = useGetIndicatorsQuery();

  if (isLoading) {
    return (
      <Wrapper>
        <ContainerLoader amount={1} />
      </Wrapper>
    );
  }

  if (isError || !data) {
    return (
      <Wrapper>
        <div>Something went Wrong</div>
      </Wrapper>
    );
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={6} md={3} lg={3}>
        <IndicatorCard
          title={'Average price today'}
          value={data.averagePriceToday}
          percentage={data.priceDifferencePercentage}
        />
      </Grid>
      <Grid item xs={6} md={3} lg={3}>
        <IndicatorCard title={'Current price'} value={data.currentPrice} />
      </Grid>
      <Grid item xs={6} md={3} lg={3}>
        <IndicatorCard
          title={'Highest price today'}
          value={data.todayHighestPrice}
        />
      </Grid>
      <Grid item xs={6} md={3} lg={3}>
        <IndicatorCard
          title={'Lowest price today'}
          value={data.todayLowestPrice}
        />
      </Grid>
    </Grid>
  );
}

export default IndicatorContainer;
