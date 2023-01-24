const tickerToId: { [key: string]: string } = {
  BTC: "bitcoin",
  USDC: "usd-coin",
  BUSD: "binance-usd",
  BIFI: "beefy-finance",
  USDT: "tether",
  FTM: "fantom",
  LTC: "litecoin",
  USD: "usd",
};

const getTokenIdFromTicker = (ticker: string) => {
  return tickerToId[ticker] || null;
};

export default getTokenIdFromTicker;
