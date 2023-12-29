import DashboardLayout from 'src/layouts/dashboard';
import navConfig from './config-navigation';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import AppAllStatistics from './Statistics/components/AllStatistics';
import AppWidgetSummary from './Statistics/components/WidgetSummary';
import AppConversionRates from './Statistics/components/ConversionRates';
import SelectSmall from '~/components/Page/Leader/components/SelectSmall';
import Button from '@mui/material/Button';
import Iconify from '~/components/iconify';
import Stack from '@mui/material/Stack';
import React, { useEffect, useState } from 'react';
import Input from 'src/components/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faHouse, faRoad } from '@fortawesome/free-solid-svg-icons';
import { faCompass } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';
import DatePickerRange from './components/DatePickerRange';

const Statistics = () => {
  const [startDate, setStartDate] = useState(
    (() => {
      const now = new Date();
      const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      return oneWeekAgo.toISOString().substring(0, 10);
    })(),
  );
  const [successParcel, setSuccessParcel] = useState('0');
  const [sendedParcel, setSendedParcel] = useState('0');
  const [returnParcel, setReturnParcel] = useState('0');
  const [allStatistics, setAllStatistics] = useState([]);
  const [endDate, setEndDate] = useState(new Date().toISOString().substring(0, 10));
  const [tinh, setTinh] = useState('');
  const [huyen, setHuyen] = useState('');

  const [provinceData, setProvinceData] = useState([]);
  const [districtData, setDistrictData] = useState([]);

  const [category, setCategory] = useState('all');
  // Get ProvinceData from API
  useEffect(() => {
    axios
      .get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/province`, {
        headers: { token: '1b869b93-97de-11ee-a59f-a260851ba65c' },
      })
      .then(function (response) {
        setProvinceData((prev) => [...response.data.data]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    if (tinh !== '') {
      setHuyen('');
      axios
        .get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/district`, {
          headers: { token: '7dbb1c13-7e11-11ee-96dc-de6f804954c9' },
          params: {
            province_id: +tinh,
          },
        })
        .then(function (response) {
          setDistrictData((prev) => [...response.data.data]);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [tinh]);

  useEffect(() => {
    console.log('Use Effect main index');
    if (category == 'all') {
      axios
        .get(`http://localhost:1510/allStatistic`, {
          headers: {
            token: localStorage.getItem('token'),
          },
          params: {
            startDate: startDate,
            endDate: endDate,
          },
        })
        .then(function (response) {
          let data = response.data;
          console.log(response.data);
          setSuccessParcel(data.successParcelCount);
          setReturnParcel(data.returnParcelCount);
          setSendedParcel(data.sendedParcelCount);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    if (category == 'collection') {
      console.log(tinh);
      if (tinh != '') {
        axios
          .get(`http://localhost:1510/allCollectionStatistic`, {
            headers: {
              token: localStorage.getItem('token'),
            },
            params: {
              startDate: startDate,
              endDate: endDate,
              tinh: tinh,
            },
          })
          .then(function (response) {
            let data = response.data;
            console.log(response.data);
            setSuccessParcel(data.successParcelCount);
            setReturnParcel(data.returnParcelCount);
            setSendedParcel(data.sendedParcelCount);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
    if (category == 'transaction') {
      if (tinh != '' && huyen != '') {
        axios
          .get(`http://localhost:1510/allTransactionStatistic`, {
            headers: {
              token: localStorage.getItem('token'),
            },
            params: {
              startDate: startDate,
              endDate: endDate,
              huyen: huyen,
            },
          })
          .then(function (response) {
            let data = response.data;
            console.log(response.data);
            setSuccessParcel(data.successParcelCount);
            setReturnParcel(data.returnParcelCount);
            setSendedParcel(data.sendedParcelCount);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  }, [startDate, endDate, category, tinh, huyen]);

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:1510/allStatisticScheme`, {
  //       headers: {
  //         token: localStorage.getItem('token'),
  //       },
  //       params: {
  //         startDate: startDate,
  //         endDate: endDate,
  //       },
  //     })
  //     .then(function (response) {
  //       setAllStatistics(response.data.rows);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }, [startDate, endDate]);
  // }
  return (
    <DashboardLayout navConfig={navConfig}>
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4">THỐNG KÊ ĐIỂM GIAO DỊCH</Typography>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Grid
            container
            spacing={3}
            sx={{
              width: '100%',
            }}
          >
            <Grid item xs={12} sm={4} md={4}>
              <SelectSmall
                data={[
                  {
                    value: 'all',
                    name: 'Cả nước',
                  },
                  {
                    value: 'transaction',
                    name: 'Điểm giao dịch',
                  },
                  {
                    value: 'collection',
                    name: 'Điểm tập kết',
                  },
                ]}
                defaultValue={'all'}
                label={'Loại'}
                category={category}
                setCategory={setCategory}
              ></SelectSmall>
            </Grid>
            {category !== 'all' && (
              <Grid
                item
                xs={12}
                sm={8}
                md={8}
                sx={{
                  justifyContent: 'end',
                }}
                container
              >
                <Grid item xs={12} sm={6} md={6}>
                  <Input
                    value={tinh}
                    leftIcon={<FontAwesomeIcon icon={faBuilding} />}
                    rightIcon={<FontAwesomeIcon icon={faCompass} />}
                    placeHolder="Tỉnh/TP"
                    errorText="Tỉnh/TP là bắt buộc!"
                    classes="register-input"
                    onChange={(value) => setTinh(value)}
                    data={provinceData}
                    select={true}
                    optionLabel="ProvinceName"
                    optionValue="ProvinceID"
                    required
                  />
                </Grid>
                {category === 'transaction' && (
                  <Grid item xs={12} sm={6} md={6}>
                    <Input
                      value={huyen}
                      leftIcon={<FontAwesomeIcon icon={faRoad} />}
                      rightIcon={<FontAwesomeIcon icon={faCompass} />}
                      placeHolder="Quận/Huyện"
                      errorText="Quận/Huyện là bắt buộc!"
                      classes="register-input"
                      onChange={(value) => setHuyen(value)}
                      data={districtData}
                      select={true}
                      optionLabel="DistrictName"
                      optionValue="DistrictID"
                      required
                    />
                  </Grid>
                )}
              </Grid>
            )}
          </Grid>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <DatePickerRange
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          ></DatePickerRange>
        </Stack>

        <Grid container spacing={3}>
          <Grid xs={12} sm={6} md={4}>
            <AppWidgetSummary
              title="Đang gửi"
              total={sendedParcel != 0 ? sendedParcel : '0'}
              color="success"
              icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
            />
          </Grid>

          <Grid xs={12} sm={6} md={4}>
            <AppWidgetSummary
              title="Gửi thành công"
              total={successParcel != 0 ? successParcel : '0'}
              color="info"
              icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
            />
          </Grid>

          <Grid xs={12} sm={6} md={4}>
            <AppWidgetSummary
              title="Đơn hoàn trả"
              total={returnParcel != 0 ? returnParcel : '0'}
              color="error"
              icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
            />
          </Grid>

          <Grid xs={12} md={6} lg={4}>
            <AppAllStatistics
              title="Current Visits"
              chart={{
                series: [
                  { label: 'Send', value: sendedParcel },
                  { label: 'Success', value: successParcel },
                  { label: 'Fail', value: returnParcel },
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
                  { label: 'Send', value: sendedParcel },
                  { label: 'Success', value: successParcel },
                  { label: 'Fail', value: returnParcel },
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
