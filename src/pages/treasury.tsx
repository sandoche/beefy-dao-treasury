import Navbar from '@/components/shared/Navbar';
import Container from '@/components/shared/Container';
import Venue from '@/components/treasury/Venue';

import Spinner from '@/components/shared/Spinner';
import LoadingPlaceholder from '@/components/shared/LoadingPlaceholder';
import type CoinInformationIndex from '@/types/CoinInformationIndex';

import BeefyDataProvider from '@/context/BeefyDataProvider';
import type { GetStaticProps } from 'next';
import createIndexOfCoinsInformation from '@/utilities/createIndexOfCoinsInformation';
import usePortfolioBalance from '@/hooks/usePortfolioBalance';

type Props = {
  coinInformationIndex: CoinInformationIndex;
};

export default function Treasury({ coinInformationIndex }: Props) {
  const {
    isExchangeRateLoading,
    computedPortfolio,
    isPortfolioBalanceLoading,
  } = usePortfolioBalance(coinInformationIndex);

  return (
    <BeefyDataProvider coinInformationIndex={coinInformationIndex}>
      <>
        <Navbar>
          {isExchangeRateLoading ? (
            <LoadingPlaceholder height="20px" width="150px" />
          ) : (
            <>
              <div className="text-right items-center rounded-md border border-transparent bg-brand px-4 py-2 text-reverse">
                <p className="md:text-xl">
                  <strong>{computedPortfolio.total.toLocaleString()}</strong>{' '}
                  USD
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
                />
              ))}
            </div>
          </Container>
        </section>
      </>
    </BeefyDataProvider>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  console.log('getStaticProps called');

  const coinInformationIndex = createIndexOfCoinsInformation();

  return {
    props: {
      coinInformationIndex,
    },
  };
};
