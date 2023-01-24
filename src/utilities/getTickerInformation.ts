import type TokenInformation from "@/types/TokenInformation";

const tickers: { [key: string]: TokenInformation } = {
  USDT: {
    name: "Tether",
  },
  BUSD: {
    name: "Binance USD",
  },
};

const getTickerInformation = (ticker: string): TokenInformation => {
  return tickers[ticker] || { name: ticker };
};

export default getTickerInformation;
