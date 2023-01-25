import coinInformations from "@/data/coingeckocoins.json";
import type CoinInformation from "@/types/CoinInformation";

const createIndexOfCoinsInformation = (): CoinInformation => {
  const indexOfCoinInformation: CoinInformation = {};

  for (const coin of coinInformations) {
    indexOfCoinInformation[coin.symbol.toUpperCase()] = {
      id: coin.id,
      name: coin.name,
    };
  }

  return indexOfCoinInformation;
};

export default createIndexOfCoinsInformation;
