import type ComputedPortfolio from "@/types/ComputedPortfolio";
import getTickerInformation from "@/utilities/getTickerInformation";
import config from "@/config";
import LoadingPlaceholder from "@/components/shared/LoadingPlaceholder";

interface Props {
  tickerId: string;
  tokenBalance: ComputedPortfolio["venues"][string]["tokens"][string];
  isExchangeRateLoading: boolean;
}

export default function VenueToken({
  tickerId,
  tokenBalance,
  isExchangeRateLoading,
}: Props) {
  return (
    <div className="border-t bg-card px-4 py-5 sm:px-6 border-1 border-borders flex justify-between items-center">
      <h3 className="text-lg">{getTickerInformation(tickerId).name}</h3>
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
