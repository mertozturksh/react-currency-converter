export const convertReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_DATA_SUCCESS':
      return { ...state, loading: false, currencies: action.payload };
    case 'FETCH_CONVERT_SUCCESS':
      return { ...state, loading: false, rate: action.payload };
    case 'FETCH_FAILURE':
      return { ...state, loading: false, error: action.error };


    case 'SET_FROM_CURRENCY':
      return { ...state, fromCurrency: action.currency };
    case 'SET_TO_CURRENCY':
      return { ...state, toCurrency: action.currency };
    case 'SET_AMOUNT':
      return { ...state, amount: action.amount };
    case 'SWAP':
      return { ...state, fromCurrency: state.toCurrency, toCurrency: state.fromCurrency };
    default:
      return state;
  }
};