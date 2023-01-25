import coinInformations from "@/data/coingeckocoins.json";
import type CoinInformationIndex from "@/types/CoinInformationIndex";

const createIndexOfCoinsInformation = (): CoinInformationIndex => {
  const indexOfCoinInformation: CoinInformationIndex = {};

  for (const coin of coinInformations) {
    indexOfCoinInformation[coin.symbol.toUpperCase()] = {
      id: coin.id,
      name: coin.name,
    };
  }

  return indexOfCoinInformation;
};

export default createIndexOfCoinsInformation;
