import DashboardLayout from 'src/layouts/dashboard';
import navConfig from './config-navigation';
import { faker } from '@faker-js/faker';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import AppAllStatistics from './Statistics/components/AllStatistics';
// import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from './Statistics/components/WidgetSummary';
// import AppTrafficBySite from '../app-traffic-by-site';
// import AppCurrentSubject from '../app-current-subject';
import AppConversionRates from './Statistics/components/ConversionRates';
import axios from 'axios';
import { useEffect, useState } from 'react';
const Statistics = () => {
  const [decodedData, setDecodedData] = useState({});
  const [sendedParcelCount, setSendedParcelCount] = useState(0);
  const [arrivalParcelCount, setArrivalParcelCount] = useState(0);
  const [waitParcelcount, setWaitParcelcount] = useState(0);
  const [bugParcelcount, setBugParcelcount] = useState(0);
  useEffect(() => {
    console.log('Use Effect main index');
    axios
      .get(`http://localhost:1510/verify-token`, {
        params: {
          token: localStorage.getItem('token'),
        },
      })
      .then(function (response) {
        let data = response.data.decodeData;
        setDecodedData(response.data.decodeData);
        localStorage.setItem('employee_info', JSON.stringify(data.info));
        localStorage.setItem('role', data.role);
        localStorage.setItem('zip_code', data.coll_info.zip_code);
        localStorage.setItem('name', data.coll_info.name);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    console.log('Use Effect main index');
    axios
      .get(`http://localhost:1510/collectionStatistic`, {
        headers: {
          token: localStorage.getItem('token'),
        },
        params: {
          startDate: '2023-11-29',
          endDate: '2023-12-29',
        },
      })
      .then(function (response) {
        let data = response.data;
        setArrivalParcelCount(data.arrivalParcelCount);
        setSendedParcelCount(data.sendedParcelCount);
        setWaitParcelcount(data.waitParcelcount);
        setBugParcelcount(data.bugParcelcount);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <DashboardLayout navConfig={navConfig}>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          THỐNG KÊ ĐIỂM TẬP KẾT THÁI NGUYÊN
        </Typography>

        <Grid container spacing={3}>
          <Grid xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Chờ nhập kho"
              total={waitParcelcount.toString()}
              color="success"
              icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
            />
          </Grid>

          <Grid xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Đơn hàng đi"
              total={sendedParcelCount.toString()}
              color="info"
              icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
            />
          </Grid>

          <Grid xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Đơn hàng đến"
              total={arrivalParcelCount.toString()}
              color="warning"
              icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
            />
          </Grid>

          <Grid xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Bug Reports"
              total={bugParcelcount.toString()}
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
