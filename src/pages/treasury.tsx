import Navbar from "@/components/shared/Navbar";
import Container from "@/components/shared/Container";
import Venue from "@/components/treasury/Venue";
import type BeefyBalancesResponse from "@/types/BeefyBalancesResponse";
import type ComputedPortfolio from "@/types/ComputedPortfolio";
import { useQuery } from "react-query";
import { getBalances } from "@/services/beefyApiService";
import { getConversionRates } from "@/services/coingeckoApiService";
import config from "@/config";
import getTokenIdFromTicker from "@/utilities/getTokenIdFromTicker";
import type CoingeckoConversionRatesResponse from "@/types/CoingeckoConversionRatesResponse";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import treasuryStrings from "@/locales/en/treasury";
import Spinner from "@/components/shared/Spinner";
import LoadingPlaceholder from "@/components/shared/LoadingPlaceholder";
import type { GetStaticProps } from "next";
import createIndexOfCoinsInformation from "@/utilities/createIndexOfCoinsInformation";
import type CoinInformationIndex from "@/types/CoinInformationIndex";

type Props = {
  coinInformationIndex: CoinInformationIndex;
};

export default function Treasury({ coinInformationIndex }: Props) {
  const MySwal = withReactContent(Swal);
  const [numberOfApiCallsMade, setNumberOfApiCallsMade] = useState<number>(0);

  const { data: balanceState, isLoading: isPortfolioBalanceLoading } = useQuery(
    "portfolioBalance",
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
          icon: "error",
          title: <p>{treasuryStrings.beefyError}</p>,
        });
      },
    }
  );

  const {
    data: exchangeRates,
    refetch,
    isLoading: isExchangeRateLoading,
  } = useQuery(
    "exchangeRates",
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
          icon: "error",
          title: <p>{treasuryStrings.coingeckoError}</p>,
        });
      },
    }
  );

  const computePortfolioToGetBalances = (
    balanceState: BeefyBalancesResponse | undefined,
    exchangeRates: CoingeckoConversionRatesResponse | undefined
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
    exchangeRates
  );

  useEffect(() => {
    if (numberOfApiCallsMade >= 2) {
      refetch();
    }
  }, [numberOfApiCallsMade, refetch]);

  return (
    <>
      <Navbar>
        {isExchangeRateLoading ? (
          <LoadingPlaceholder height="20px" width="150px" />
        ) : (
          <>
            <div className="text-right items-center rounded-md border border-transparent bg-brand px-4 py-2 text-reverse">
              <p className="md:text-xl">
                <strong>{computedPortfolio.total.toLocaleString()}</strong> USD
              </p>
            </div>
          </>
        )}
      </Navbar>
      {isPortfolioBalanceLoading && (
        <div className="grid h-full place-items-center">
          <Spinner />
        </div>
      )}
      <section>
        <Container>
          <div className="columns-1 lg:columns-2">
            {Object.keys(computedPortfolio.venues).map((venueId) => (
              <Venue
                key={venueId}
                venueId={venueId}
                venuePortfolio={computedPortfolio.venues[venueId]}
                total={computedPortfolio.venues[venueId].total}
                isExchangeRateLoading={isExchangeRateLoading}
                coinInformationIndex={coinInformationIndex}
              />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const coinInformationIndex = createIndexOfCoinsInformation();

  return {
    props: {
      coinInformationIndex,
    },
  };
};
