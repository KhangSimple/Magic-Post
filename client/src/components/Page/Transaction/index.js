import DashboardLayout from 'src/layouts/dashboard';
import navConfig from './config-navigation';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import AppAllStatistics from './Statistics/components/AllStatistics';
import AppWidgetSummary from './Statistics/components/WidgetSummary';
import AppConversionRates from './Statistics/components/ConversionRates';

const Statistics = () => {
  return (
    <DashboardLayout navConfig={navConfig}>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          THỐNG KÊ ĐIỂM GIAO DỊCH THÁI NGUYÊN
        </Typography>

        <Grid container spacing={3}>
          <Grid xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Chờ nhập kho"
              total={1223}
              color="success"
              icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
            />
          </Grid>

          <Grid xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Đơn hàng đi"
              total={1352831}
              color="info"
              icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
            />
          </Grid>

          <Grid xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Đơn hàng đến"
              total={1723315}
              color="warning"
              icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
            />
          </Grid>

          <Grid xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Bug Reports"
              total={234}
              color="error"
              icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
            />
          </Grid>

          <Grid xs={12} md={6} lg={4}>
            <AppAllStatistics
              title="Current Visits"
              chart={{
                series: [
                  { label: 'America', value: 4344 },
                  { label: 'Asia', value: 5435 },
                  { label: 'Europe', value: 1443 },
                  { label: 'Africa', value: 4443 },
                ],
              }}
            />
          </Grid>

          <Grid xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Conversion Rates"
              subheader="(+43%) than last year"
              chart={{
                series: [
                  { label: 'Italy', value: 400 },
                  { label: 'Japan', value: 430 },
                  { label: 'China', value: 448 },
                  { label: 'Canada', value: 470 },
                  { label: 'France', value: 540 },
                  { label: 'Germany', value: 580 },
                  { label: 'South Korea', value: 690 },
                  { label: 'Netherlands', value: 1100 },
                  { label: 'United States', value: 1200 },
                  { label: 'United Kingdom', value: 1380 },
                ],
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </DashboardLayout>
  );
};
export default Statistics;
