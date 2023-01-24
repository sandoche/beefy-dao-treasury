import type ComputedPortfolio from "@/types/ComputedPortfolio";
import getTickerInformation from "@/utilities/getTickerInformation";
import config from "@/config";

interface Props {
  tickerId: string;
  tokenBalance: ComputedPortfolio["venues"][string]["tokens"][string];
}

export default function VenueToken({ tickerId, tokenBalance }: Props) {
  return (
    <div className="border-t bg-card px-4 py-5 sm:px-6 border-1 border-borders flex justify-between items-center">
      <h3 className="text-lg">{getTickerInformation(tickerId).name}</h3>
      <div className="text-right">
        <p>
          {tokenBalance.amount.toFixed(config.decimals)} {tickerId}
        </p>
        <p className="text-sm text-lighttext">
          ≈ {tokenBalance.valueInUsd.toFixed(config.decimals)} USD
        </p>
      </div>
    </div>
  );
}
