const provinces = require('./refprovince.json');
const cities = require('./refcity.json');
const brgys = require('./refbrgy.json');

const isInArray = (item, arr) => {
  const index = arr.find((i) => i.id === item.id);

  return index > -1;
};

const getProvinces = () => {
  const provinceList = [];
  provinces.RECORDS.forEach((province) => {
    if (isInArray(province, provinceList)) return;
    provinceList.push({
      id: province.id,
      value: province.id,
      code: province.provCode,
      name: province.provDesc,
      label: province.provDesc,
    });
  });
  return provinceList.sort(sorter);
};

const getCities = () => {
  const cityList = [];
  const temp = cities.RECORDS;
  if (temp.length < 0) return cityList;
  temp.forEach((city) => {
    cityList.push({
      id: city.id,
      value: city.id,
      code: city.citymunCode,
      name: city.citymunDesc,
      label: city.citymunDesc,
      parent: city.provCode,
    });
  });
  return cityList.sort(sorter);
};

const getBrgys = () => {
  const brgyList = [];
  const temp = brgys.RECORDS;
  if (temp.length < 0) return brgyList;
  temp.forEach((brgy) => {
    brgyList.push({
      id: brgy.id,
      value: brgy.id,
      code: brgy.brgyCode,
      name: brgy.brgyDesc,
      label: brgy.brgyDesc,
      parent: brgy.citymunCode,
    });
  });
  return brgyList.sort(sorter);
};

const getProvince = (provCode) => {
  return provinces.RECORDS.find((province) => province.provCode === provCode);
};

const getCity = (cityCode) => {
  return cities.RECORDS.find((city) => city.citymunCode === cityCode);
};

const getBrgy = (brgyCode) => {
  return brgys.RECORDS.find((brgy) => brgy.brgyCode === brgyCode);
};

const sorter = (a, b) => {
  const x = a.name.toLowerCase();
  const y = b.name.toLowerCase();
  return x < y ? -1 : x > y ? 1 : 0;
};

const getAllAddress = () => {
  const prov = getProvinces();
  const cities = getCities();
  const brgys = getBrgys();

  return {
    provinces: prov,
    cities: cities,
    brgys: brgys,
  };
};

export default {
  getProvinces,
  getProvince,
  getCities,
  getCity,
  getBrgys,
  getBrgy,
  getAllAddress,
};
