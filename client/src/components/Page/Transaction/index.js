import DashboardLayout from 'src/layouts/dashboard';
import navConfig from './config-navigation';
import { Cookies } from 'react-cookie';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import AppAllStatistics from './Statistics/components/AllStatistics';
import AppWidgetSummary from './Statistics/components/WidgetSummary';
import AppConversionRates from './Statistics/components/ConversionRates';
import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const TransactionContext = createContext();

export const ZIP_CODE = 1915;
export function dateFormat(date) {
  if (date) {
    const d = new Date(date);
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var hours = d.getHours();
    var minutes = d.getMinutes();
    var second = d.getSeconds();
    hours = hours > 9 ? hours : '0' + hours.toString();
    minutes = minutes > 9 ? minutes : '0' + minutes.toString();
    second = second > 9 ? second : '0' + second.toString();
    return day + '/' + month + '/' + year + ' ' + hours + ':' + minutes + ':' + second;
  }
}

const Statistics = () => {
  const [decodedData, setDecodedData] = useState({});
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
        localStorage.setItem('employee_id', data.id);
        localStorage.setItem('role', data.role);
        localStorage.setItem('zip_code', data.trans_info.zip_code);
        localStorage.setItem('name', data.trans_info.name);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <TransactionContext.Provider value={decodedData}>
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
    </TransactionContext.Provider>
  );
};
export default Statistics;
