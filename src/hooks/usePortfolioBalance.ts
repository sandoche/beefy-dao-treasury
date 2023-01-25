import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import config from '@/config';
import treasuryStrings from '@/locales/en/treasury';
import { getBalances } from '@/services/beefyApiService';
import { getConversionRates } from '@/services/coingeckoApiService';
import type BeefyBalancesResponse from '@/types/BeefyBalancesResponse';
import type CoingeckoConversionRatesResponse from '@/types/CoingeckoConversionRatesResponse';
import type CoinInformationIndex from '@/types/CoinInformationIndex';
import type ComputedPortfolio from '@/types/ComputedPortfolio';
import getTokenIdFromTicker from '@/utilities/getTokenIdFromTicker';

const usePortfolioBalance = (coinInformationIndex: CoinInformationIndex) => {
  const MySwal = withReactContent(Swal);
  const [numberOfApiCallsMade, setNumberOfApiCallsMade] = useState<number>(0);

  const { data: balanceState, isLoading: isPortfolioBalanceLoading } = useQuery(
    'portfolioBalance',
    getBalances,
    {
      refetchInterval: config.pollingIntervalInMs,
      onSuccess: () => {
        if (numberOfApiCallsMade < 2) {
          setNumberOfApiCallsMade(numberOfApiCallsMade + 1);
        }
      },
      onError: () => {
        MySwal.fire({
          icon: 'error',
          title: treasuryStrings.beefyError,
        });
      },
    },
  );

  const {
    data: exchangeRates,
    refetch,
    isLoading: isExchangeRateLoading,
  } = useQuery(
    'exchangeRates',
    () => getConversionRates(computedPortfolio.tokenIds),
    {
      refetchInterval: config.pollingIntervalInMs,
      onSuccess: () => {
        if (numberOfApiCallsMade < 2) {
          setNumberOfApiCallsMade(numberOfApiCallsMade + 1);
        }
      },
      onError: () => {
        MySwal.fire({
          icon: 'error',
          title: treasuryStrings.coingeckoError,
        });
      },
    },
  );

  const computePortfolioToGetBalances = (
    balanceState: BeefyBalancesResponse | undefined,
    exchangeRates: CoingeckoConversionRatesResponse | undefined,
  ): ComputedPortfolio => {
    const portfolio: ComputedPortfolio = {
      total: 0,
      venues: {},
      tokenIds: new Set(),
    };

    for (const venueId in balanceState) {
      const venuePortfolio = balanceState[venueId];
      portfolio.venues[venueId] = { total: 0, tokens: {} };

      for (const tickerId in venuePortfolio) {
        const tokenBalance = venuePortfolio[tickerId];
        const tokenId = getTokenIdFromTicker(tickerId, coinInformationIndex);
        const tokenExchangeRate =
          tokenId && exchangeRates && exchangeRates[tokenId]
            ? exchangeRates[tokenId].usd
            : 0;

        const valueInUsd = tokenBalance * tokenExchangeRate;

        if (tokenId) {
          portfolio.tokenIds.add(tokenId);
        }

        portfolio.venues[venueId].tokens[tickerId] = {
          amount: tokenBalance,
          valueInUsd,
        };

        portfolio.venues[venueId].total =
          (portfolio.venues[venueId].total ?? 0) + valueInUsd;
        portfolio.total = portfolio.total + valueInUsd;
      }
    }
    return portfolio;
  };

  const computedPortfolio = computePortfolioToGetBalances(
    balanceState,
    exchangeRates,
  );

  useEffect(() => {
    if (numberOfApiCallsMade >= 2) {
      refetch();
    }
  }, [numberOfApiCallsMade, refetch]);

  return {
    isExchangeRateLoading,
    computedPortfolio,
    isPortfolioBalanceLoading,
  };
};

export default usePortfolioBalance;
