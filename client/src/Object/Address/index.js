import axios from 'axios';

export default class Address {
  constructor() {
    this.provinceData = [];
    this.districtData = [];
    this.wardData = [];
    this.province_id = '';
    this.district_id = '';
    this.ward_id = '';
    axios
      .get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/province`, {
        headers: { token: '1b869b93-97de-11ee-a59f-a260851ba65c' },
      })
      .then(function (response) {
        this.provinceData = response.data.data.map((row) => row.ProvinceName);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
