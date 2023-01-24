import Head from "next/head";
import { Inter } from "@next/font/google";
import sharedStrings from "@/locales/en/shared";
import Navbar from "@/components/shared/Navbar";
import Container from "@/components/shared/Container";
import treasuryStrings from "@/locales/en/treasury";
import Venue from "@/components/treasury/Venue";
import type BeefyBalancesResponse from "@/types/BeefyBalancesResponse";
import type ComputedPortfolio from "@/types/ComputedPortfolio";
import { useQuery } from "react-query";
import { getBalances } from "@/services/beefyApiService";
import { getConversionRates } from "@/services/coingeckoApiService";
import config from "@/config";
import getTokenIdFromTicker from "@/utilities/getTokenIdFromTicker";
import type CoingeckoConversionRatesResponse from "@/types/CoingeckoConversionRatesResponse";

const inter = Inter({ subsets: ["latin"] });

export default function Treasury() {
  const { data: balanceState } = useQuery("portfolioBalance", getBalances, {
    refetchInterval: config.pollingIntervalInMs,
  });

  const { data: exchangeRates } = useQuery(
    "exchangeRates",
    () => getConversionRates(computedPortfolio.tokenIds),
    {
      refetchInterval: config.pollingIntervalInMs,
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
        const tokenId = getTokenIdFromTicker(tickerId);
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

  return (
    <>
      <Head>
        <title>{sharedStrings.title}</title>
        <meta name="description" content={sharedStrings.title} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <section>
        <Container>
          <>
            <p>{computedPortfolio.total} USD</p>
            {Object.keys(computedPortfolio.venues).map((venueId) => (
              <Venue
                key={venueId}
                venueId={venueId}
                venuePortfolio={computedPortfolio.venues[venueId]}
                total={computedPortfolio.venues[venueId].total}
              />
            ))}
          </>
        </Container>
      </section>
    </>
  );
}