import { useEffect, useReducer } from "react";
import Dropdown from "./Dropdown";
import { HiArrowsRightLeft } from "react-icons/hi2";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { fetchCurrencies, fetchRate } from "../api";
import { convertReducer } from "../reducers/convertReducer";
import Input from "./Input";

const initialState = {
  currencies: [],
  fromCurrency: "USD",
  toCurrency: "TRY",
  amount: 1,
  rate: null,

  loading: false,
  error: null,
};
const CurrencyConverter = () => {

  const [state, dispatch] = useReducer(convertReducer, initialState);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    handleConvert();
  }, [state.fromCurrency, state.toCurrency]);

  const fetchData = async () => {
    dispatch({ type: 'FETCH_START' });
    try {
      const data = await fetchCurrencies();
      dispatch({ type: 'FETCH_DATA_SUCCESS', payload: Object.keys(data.data) });
    } catch (error) {
      dispatch({ type: 'FETCH_FAILURE', error: error.message });
    }
  };

  const handleConvert = async () => {
    dispatch({ type: 'FETCH_START' });

    await new Promise((resolve) => setTimeout(resolve, 750));
    try {
      const data = await fetchRate(state.fromCurrency, state.toCurrency, state.amount);
      dispatch({ type: 'FETCH_CONVERT_SUCCESS', payload: data.data.rates[state.toCurrency] + ' ' + state.toCurrency });
    } catch (error) {
      dispatch({ type: 'FETCH_FAILURE', error: error.message });
    }
  };

  const handleSwapCurrencies = () => {
    dispatch({ type: 'SWAP' });
  };

  const handleChangeCurrency = (type, currency) => {
    dispatch({ type: type, currency: currency });
  };



  return (
    <div className="max-w-xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md">
      <h2 className="mb-5 text-2xl font-semibold text-gray-700">
        Currency Converter
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
        <Dropdown
          title="From:"
          currencies={state.currencies}
          currency={state.fromCurrency}
          setCurrency={(value) => handleChangeCurrency('SET_FROM_CURRENCY', value)}
        />

        <div className="flex justify-center -mb-5 sm:mb-0">
          <button
            onClick={handleSwapCurrencies}
            className="p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300"
          >
            <HiArrowsRightLeft className="text-xl text-gray-700" />
          </button>
        </div>

        <Dropdown
          title="To:"
          currencies={state.currencies}
          currency={state.toCurrency}
          setCurrency={(value) => handleChangeCurrency('SET_TO_CURRENCY', value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end mt-5 mb-2">

        <Input title={'Amount'} type={'number'} value={state.amount} onChange={(e) => dispatch({ type: 'SET_AMOUNT', amount: e.target.value })} />

        <div className="flex justify-center -mb-5 sm:mb-0">
          <button
            onClick={handleConvert}
            disabled={state.loading}
            className={`px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
              ${state.loading ? "animate-pulse cursor-not-allowed" : ""}`}
          >
            {state.loading ? (
              <AiOutlineLoading3Quarters className="animate-spin h-5 w-5" />
            ) : (
              "Convert"
            )}
          </button>
        </div>

        <Input title={'Converted'} value={state.rate} disabled loading={state.loading} />

      </div>
    </div>
  );
};

export default CurrencyConverter;