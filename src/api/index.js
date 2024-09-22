import axios from "axios";

const baseUrl = "https://api.frankfurter.app";

export const fetchCurrencies = () => axios.get(baseUrl + '/currencies');

export const fetchRate = (from, to, amount) => axios.get(baseUrl + '/latest', {
  params: {
    from: from,
    to: to,
    amount: amount
  }
});