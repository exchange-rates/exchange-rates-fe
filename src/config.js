function getGlobalConfigs() {
  if (typeof window !== 'undefined' && window.__client_configs__) { // eslint-disable-line
    return window.__client_configs__; // eslint-disable-line
  }
  return false;
}

export function getServerConfigs() {
  const config = {
    port: process.env.PORT || 8080,
    exchangeRatesAPI: process.env.EXCHANGE_RATE_API || 'http://localhost:7000/exchange-rates',
  };

  return config;
}

export default getGlobalConfigs() || getServerConfigs();
