import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Copyright from './Copyright';
import SwitchContainer from '../containers/SwitchContainer';
import PriceChartContainer from '../containers/PriceChartContainer';
import IndicatorContainer from '../containers/IndicatorContainer';

function Dashboard() {
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="absolute">
        <Toolbar>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Electricity Manager
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <IndicatorContainer />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Electricity price
                </Typography>
                <PriceChartContainer />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Switches
                </Typography>
                <SwitchContainer />
              </Paper>
            </Grid>
          </Grid>
          <Copyright />
        </Container>
      </Box>
    </Box>
  );
}

export default Dashboard;
