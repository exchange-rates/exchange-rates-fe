import config from '../config';

export async function getCurrencies() {
  const res = await fetch(`${config.exchangeRatesAPI}/currencies`);

  if (res.ok) {
    return res.json();
  }

  throw new Error('Something went wrong');
}

export async function getFXRate() {
  const res = await fetch(`${config.exchangeRatesAPI}/rate`);

  if (res.ok) {
    return res.json();
  }

  throw new Error('Something went wrong');
}

export async function getFXRateByDate(date) {
  const res = await fetch(`${config.exchangeRatesAPI}/rate/date/${date}`);

  if (res.ok) {
    return res.json();
  }

  throw new Error('Something went wrong');
}
