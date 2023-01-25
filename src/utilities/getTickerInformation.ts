import type CoinInformationIndex from '@/types/CoinInformationIndex';

const getTickerInformation = (
  ticker: string,
  index: CoinInformationIndex,
): CoinInformationIndex[string] => {
  return index[ticker] || { name: ticker };
};

export default getTickerInformation;
