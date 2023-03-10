import { useState, useEffect } from 'react';
import DayPriceChart from '../components/DayPriceChart';
import { useGetPricesByDateQuery } from '../features/prices/pricesAPI';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import ContainerLoader from '../components/ContainerLoader';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { currentUser } from '../utils/userConfig';
import { getPricesByDate, getCurrentHour } from '../utils/chartFunctions';
import Message from '../components/Message';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

const PriceChartContainer = () => {
  const today = dayjs().format('DD.MM.YYYY');
  const tomorrow = dayjs().add(1, 'day').format('DD.MM.YYYY');
  const [activeDate, setActiveDate] = useState<string>(today);
  const [showTax, setShowTax] = useState<boolean>(false);
  const [currentHour, setCurrentHour] = useState<string>(
    getCurrentHour(currentUser.timeZone),
  );

  // get prices for active date and next day
  const {
    data: pricesByDate,
    isLoading,
    isError,
  } = useGetPricesByDateQuery({
    startDate: activeDate === tomorrow ? today : activeDate,
    endDate: dayjs(activeDate, 'DD.MM.YYYY').add(1, 'day').format('DD.MM.YYYY'),
  });

  // update current hour
  useEffect(() => {
    const interval = setInterval(() => {
      if (dayjs().minute().toString() === '0') {
        setCurrentHour(getCurrentHour(currentUser.timeZone));
      }
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // handle date change
  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: number,
  ) => {
    if (newAlignment === 1) {
      setActiveDate(
        dayjs(activeDate, 'DD.MM.YYYY').add(1, 'day').format('DD.MM.YYYY'),
      );
    }
    if (newAlignment === -1) {
      setActiveDate(
        dayjs(activeDate, 'DD.MM.YYYY').subtract(1, 'day').format('DD.MM.YYYY'),
      );
    }
    if (newAlignment === 0) {
      setActiveDate(today);
    }
  };

  // disable tomorrow button if there is no data for tomorrow
  const disableTomorrow = () => {
    const tomorrowData = getPricesByDate(pricesByDate, tomorrow);
    if (
      (tomorrowData.length <= 1 && activeDate === today) ||
      activeDate === tomorrow
    ) {
      return true;
    }
    return false;
  };

  // render chart or loader
  const renderChart = () => {
    if (
      getPricesByDate(
        pricesByDate,
        dayjs(activeDate, 'DD.MM.YYYY').format('DD.MM.YYYY'),
      ).length <= 23
    ) {
      return <ContainerLoader amount={4} />;
    } else {
      return (
        <DayPriceChart
          data={getPricesByDate(pricesByDate, activeDate)}
          showTax={showTax}
          currentHour={currentHour}
          today={activeDate === today}
        />
      );
    }
  };

  if (isLoading) {
    return <ContainerLoader />;
  }

  if (isError || !pricesByDate) {
    return <Message />;
  }

  return (
    <>
      <Grid container data-testid="price-chart-container">
        <Grid
          item
          xs={4}
          md={4}
          sx={{
            paddingTop: 0.9,
          }}
        >
          <Typography sx={{ fontSize: 14 }}>Date: {activeDate}</Typography>
        </Grid>
        <Grid item xs={6} md={3}>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={showTax}
                  id="toggle-tax"
                  onChange={() => setShowTax(!showTax)}
                />
              }
              label={<Typography sx={{ fontSize: 14 }}>Show tax</Typography>}
            />
          </FormGroup>
        </Grid>
        <Grid item xs={6} md={5}>
          <ButtonGroup
            sx={{
              float: 'right',
            }}
            variant="outlined"
          >
            <Button
              onClick={(e) => handleAlignment(e, -1)}
              id="toggle-reduce-day"
            >
              - 1
            </Button>
            <Button onClick={(e) => handleAlignment(e, 0)} id="toggle-today">
              Today
            </Button>

            <Button
              disabled={disableTomorrow()}
              onClick={(e) => handleAlignment(e, 1)}
              id="toggle-add-day"
            >
              + 1
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
      {renderChart()}
    </>
  );
};

export default PriceChartContainer;
