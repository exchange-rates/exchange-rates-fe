import calcFXRate from '../utils/calcFXRate';

export const GET_CURRENCIES = '@FX_REDUCER/GET_CURRENCIES';
export const UPDATE_FIRST_CURRENCY = '@FX_REDUCER/UPDATE_FIRST_CURRENCY';
export const UPDATE_SECOND_CURRENCY = '@FX_REDUCER/UPDATE_SECOND_CURRENCY';
export const GET_CURRENT_RATE = '@FX_REDUCER/GET_CURRENT_RATE';
export const REVERSE_CURRENCY = '@FX_REDUCER/REVERSE_CURRENCY';
export const UPDATE_DATE = '@FX_REDUCER/UPDATE_DATE';

const initialState = {
  currencies: {},
  firstCurrency: '',
  secondCurrency: '',
  currentRates: '',
  date: '',
};

export default function fxReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CURRENCIES: {
      return { ...state, currencies: action.currencies };
    }
    case UPDATE_FIRST_CURRENCY: {
      if (state.secondCurrency === action.value) {
        return { ...state, firstCurrency: action.value, secondCurrency: '' };
      }

      const rate = calcFXRate(action.value, state.secondCurrency, state.currentRates);
      return { ...state, firstCurrency: action.value, rate };
    }
    case UPDATE_SECOND_CURRENCY: {
      const rate = calcFXRate(state.firstCurrency, action.value, state.currentRates);
      return { ...state, secondCurrency: action.value, rate };
    }
    case GET_CURRENT_RATE: {
      const rate = calcFXRate(state.firstCurrency, state.secondCurrency, action.currentRates);
      return { ...state, currentRates: action.currentRates, rate };
    }
    case REVERSE_CURRENCY: {
      const rate = calcFXRate(state.secondCurrency, state.firstCurrency, state.currentRates);
      return {
        ...state,
        firstCurrency: state.secondCurrency,
        secondCurrency: state.firstCurrency,
        rate,
      };
    }
    case UPDATE_DATE: {
      return { ...state, date: action.date };
    }
    default: return state;
  }
}
