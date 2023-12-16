import axios from 'axios';
class Address {
  constructor() {
    var provinceData = [];
    var districtData = [];
    var wardData = [];
  }
  getProvinceData() {
    axios
      .get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/province`, {
        headers: { token: '1b869b93-97de-11ee-a59f-a260851ba65c' },
      })
      .then(function (response) {
        this.provinceData = response.data.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

export default Address;
