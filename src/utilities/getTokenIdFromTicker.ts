import type CoinInformation from "@/types/CoinInformation";

const getTokenIdFromTicker = (ticker: string, index: CoinInformation) => {
  return index[ticker]?.id || null;
};

export default getTokenIdFromTicker;
