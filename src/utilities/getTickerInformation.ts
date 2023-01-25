import type TokenInformation from "@/types/CoinInformation";

const tickers: { [key: string]: TokenInformation } = {
  USDT: {
    name: "Tether",
  },
  BUSD: {
    name: "Binance USD",
  },
  USDC: {
    name: "USD Coin",
  },
  BIFI: {
    name: "Beefy Finance",
  },
  FTM: {
    name: "Fantom",
  },
  LTC: {
    name: "Litecoin",
  },
};

const getTickerInformation = (ticker: string): TokenInformation => {
  return tickers[ticker] || { name: ticker };
};

export default getTickerInformation;
