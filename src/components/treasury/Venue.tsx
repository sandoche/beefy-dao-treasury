import Image from 'next/image';

import LoadingPlaceholder from '@/components/shared/LoadingPlaceholder';
import VenueToken from '@/components/treasury/VenueToken';
import type ComputedPortfolio from '@/types/ComputedPortfolio';
import getVenueInformation from '@/utilities/getVenueInformation';

interface Props {
  venueId: string;
  venuePortfolio: ComputedPortfolio['venues'][string];
  total: number;
  isExchangeRateLoading: boolean;
}

export default function Venue({
  venueId,
  venuePortfolio,
  total,
  isExchangeRateLoading,
}: Props) {
  const { name, icon } = getVenueInformation(venueId);

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-md mb-4 border border-darkborder rounded-sm">
      <div className="bg-card px-4 py-5 sm:px-6 border-1">
        <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
          <div className="ml-4 mt-2 flex items-center">
            <div className="w-8 h-8 bg-brand rounded-full flex justify-center items-center mr-2">
              {' '}
              {icon ? (
                <Image
                  src={`/icons/${icon}`}
                  width={50}
                  height={50}
                  alt={`${name} icon`}
                />
              ) : (
                <span className="font-bold text-reverse">{name.charAt(0)}</span>
              )}
            </div>
            <h2 className="text-lg font-medium leading-6 text-gray-900">
              {name}
            </h2>
          </div>
          <div className="ml-4 mt-2 flex-shrink-0">
            {isExchangeRateLoading ? (
              <LoadingPlaceholder width="100px" />
            ) : (
              <span className="relative inline-flex items-center rounded-md px-4 py-2 md:text-lg font-medium bg-borders">
                {total.toLocaleString()} USD
              </span>
            )}
          </div>
        </div>
      </div>
      <div>
        {Object.keys(venuePortfolio.tokens).map((tickerId) => (
          <VenueToken
            key={tickerId}
            tickerId={tickerId}
            tokenBalance={venuePortfolio.tokens[tickerId]}
            isExchangeRateLoading={isExchangeRateLoading}
          />
        ))}
      </div>
    </div>
  );
}
