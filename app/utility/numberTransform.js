const numberWithComma = (number) => {
  number = parseFloat(number).toFixed(2);
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export default {
  numberWithComma,
};
