import config from '../config';

export async function getCurrencies() {
  const res = await fetch(`${config.exchangeRatesAPI}/currencies`)

  if (res.ok) {
    return await res.json();
  }
}

export async function getFXRate() {
  const res = await fetch(`${config.exchangeRatesAPI}/rate`)

  if (res.ok) {
    return await res.json();
  }
}

export async function getFXRateByDate(date) {
  const res = await fetch(`${config.exchangeRatesAPI}/rate/date/${date}`)

  if (res.ok) {
    return await res.json();
  }
}