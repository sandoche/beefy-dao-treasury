import type CoinInformationIndex from "@/types/CoinInformationIndex";

const getTokenIdFromTicker = (ticker: string, index: CoinInformationIndex) => {
  return index[ticker]?.id || null;
};

export default getTokenIdFromTicker;
