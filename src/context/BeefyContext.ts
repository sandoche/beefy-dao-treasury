import { createContext } from "react";
import type BeefyContextInterface from "./BeefyContextInterface";

const BeefyContext = createContext<BeefyContextInterface>({
  computedPortfolio: {
    total: 0,
    tokenIds: new Set(),
    venues: {},
  },
  isExchangeRateLoading: false,
  coinInformationIndex: {},
  isPortfolioBalanceLoading: false,
});

export default BeefyContext;
