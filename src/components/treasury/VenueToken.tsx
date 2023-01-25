import Image from 'next/image';
import { useContext } from 'react';

import LoadingPlaceholder from '@/components/shared/LoadingPlaceholder';
import BeefyContext from '@/context/BeefyContext';
import type ComputedPortfolio from '@/types/ComputedPortfolio';
import getTickerInformation from '@/utilities/getTickerInformation';

interface Props {
  tickerId: string;
  tokenBalance: ComputedPortfolio['venues'][string]['tokens'][string];
  isExchangeRateLoading: boolean;
}

export default function VenueToken({
  tickerId,
  tokenBalance,
  isExchangeRateLoading,
}: Props) {
  const { coinInformationIndex } = useContext(BeefyContext);
  const { name } = getTickerInformation(tickerId, coinInformationIndex);

  const getIcon = () => {
    try {
      const icon = require(`@/assets/coins/${tickerId.toLowerCase()}.svg`);
      return icon;
    } catch (error) {
      return null;
    }
  };

  const Icon = getIcon();

  return (
    <div className="border-t bg-card px-4 py-5 sm:px-6 border-1 border-borders flex justify-between items-center">
      <h3 className="text-lg">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-borders rounded-full flex justify-center items-center mr-2">
            {Icon ? (
              <Image
                src={Icon}
                height={50}
                width={50}
                alt={`Icon ${tickerId}`}
              />
            ) : (
              <span className="font-bold text-brand">{name.charAt(0)}</span>
            )}
          </div>
          <h2 className="text-lg font-medium leading-6 text-gray-900">
            {name}
          </h2>
        </div>
      </h3>
      <div className="text-right">
        <p>
          {tokenBalance.amount.toLocaleString()} {tickerId}
        </p>
        {isExchangeRateLoading ? (
          <LoadingPlaceholder />
        ) : (
          <p className="text-sm text-lighttext">
            ≈ {tokenBalance.valueInUsd.toLocaleString()} USD
          </p>
        )}
      </div>
    </div>
  );
}
