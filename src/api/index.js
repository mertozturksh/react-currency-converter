import axios from "axios";

const baseUrl = "https://api.frankfurter.app";

export const fetchCurrencies = async () => axios.get(baseUrl + '/currencies');

export const fetchRate = async (from, to, amount) => axios.get(baseUrl + '/latest', {
  params: {
    from: from,
    to: to,
    amount: amount
  }
});