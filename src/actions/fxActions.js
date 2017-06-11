import {
  getCurrencies as getCurrenciesService,
  getFXRate,
  getFXRateByDate as getFXRateByDateService
} from '../services/exchangeRatesService';
import { GET_CURRENCIES, GET_CURRENT_RATE, UPDATE_DATE } from '../reducers/fxReducer';

export function getCurrencies() {
  return async (dispatch) => {
    const currencies = await getCurrenciesService();

    dispatch({ type: GET_CURRENCIES, currencies });
  }
}

export function getCurrentFXRate() {
  return async (dispatch) => {
    const currentRates = await getFXRate();

    dispatch({ type: GET_CURRENT_RATE, currentRates });
  }
}

export function getFXRateByDate(date) {
  return async (dispatch) => {
    dispatch({ type: UPDATE_DATE, date });

    const currentRates = await getFXRateByDateService(date);

    dispatch({ type: GET_CURRENT_RATE, currentRates });
  }
}