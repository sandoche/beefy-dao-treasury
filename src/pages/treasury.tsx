import Head from "next/head";
import { Inter } from "@next/font/google";
import sharedStrings from "@/locales/en/shared";
import Navbar from "@/components/shared/Navbar";
import Container from "@/components/shared/Container";
import treasuryStrings from "@/locales/en/treasury";
import Venue from "@/components/treasury/Venue";
import type BeefyBalancesResponse from "@/types/BeefyBalancesResponse";

const inter = Inter({ subsets: ["latin"] });

export default function Treasury() {
  const temporaryBalanceState: BeefyBalancesResponse = {
    binance: {
      USDT: 98055.63063417,
      BUSD: 82768.6168948,
      BIFI: 154.9413044,
    },
    felix: {
      BIFI: 87.87950109,
      FTM: 21852.19008471,
      USDT: 7272.5246663,
    },
    cryptocom: {
      LTC: 0.95966592,
      BIFI: 80.9602725,
      USDT: 0.00290985,
      USD: 8250.4185,
    },
    bitrue: {
      USDT: 41375.86,
      BIFI: 29.418,
    },
  };

  const temporaryExchangeRates = {
    USDT: 1,
    BUSD: 1.0001,
    BIFI: 2,
    FTM: 0.3,
    LTC: 0.1,
    USD: 1,
  };

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
            {Object.keys(temporaryBalanceState).map((venueId) => (
              <Venue
                key={venueId}
                venueId={venueId}
                venuePortfolio={temporaryBalanceState[venueId]}
              />
            ))}
          </>
        </Container>
      </section>
    </>
  );
}
