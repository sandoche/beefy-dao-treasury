import type ComputedPortfolio from "@/types/ComputedPortfolio";
import type CoinInformationIndex from "@/types/CoinInformationIndex";

export default interface BeefyContextInterface {
  computedPortfolio: ComputedPortfolio;
  isExchangeRateLoading: boolean;
  coinInformationIndex: CoinInformationIndex;
  isPortfolioBalanceLoading: boolean;
}
