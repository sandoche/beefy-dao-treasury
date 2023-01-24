import Head from "next/head";
import { Inter } from "@next/font/google";
import sharedStrings from "@/locales/en/shared";
import Navbar from "@/components/shared/Navbar";
import Container from "@/components/shared/Container";
import treasuryStrings from "@/locales/en/treasury";
import Venue from "@/components/treasury/Venue";
import type BeefyBalancesResponse from "@/types/BeefyBalancesResponse";
import type ComputedPortfolio from "@/types/ComputedPortfolio";
import {
  useQuery,
  // useMutation,
  useQueryClient,
  // QueryClient,
  // QueryClientProvider,
} from "react-query";
import { getBalances } from "@/services/beefyApiService";

const inter = Inter({ subsets: ["latin"] });

export default function Treasury() {
  const queryClient = useQueryClient();
  const { data: balanceState } = useQuery("portfolioBalance", getBalances);

  const temporaryExchangeRates = {
    USDT: 1,
    BUSD: 1.0001,
    BIFI: 2,
    FTM: 0.3,
    LTC: 0.1,
    USD: 1,
  };

  const computePortfolioToGetBalances = (
    balanceState: BeefyBalancesResponse | undefined,
    temporaryExchangeRates: any
  ): ComputedPortfolio => {
    const portfolio: ComputedPortfolio = { total: 0, venues: {} };

    for (const venueId in balanceState) {
      const venuePortfolio = balanceState[venueId];
      portfolio.venues[venueId] = { total: 0, tokens: {} };

      for (const tickerId in venuePortfolio) {
        const tokenBalance = venuePortfolio[tickerId];
        const tokenExchangeRate = temporaryExchangeRates[tickerId];

        const valueInUsd = tokenBalance * tokenExchangeRate;

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
    temporaryExchangeRates
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
