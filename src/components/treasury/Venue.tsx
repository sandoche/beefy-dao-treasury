import type ComputedPortfolio from "@/types/ComputedPortfolio";
import VenueToken from "@/components/treasury/VenueToken";
import getVenueInformation from "@/utilities/getVenueInformation";
import config from "@/config";

interface Props {
  venueId: string;
  venuePortfolio: ComputedPortfolio["venues"][string];
  total: number;
}

export default function Venue({ venueId, venuePortfolio, total }: Props) {
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-md mb-4">
      <div className="bg-card px-4 py-5 sm:px-6 border-1">
        <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
          <div className="ml-4 mt-2">
            <h2 className="text-lg font-medium leading-6 text-gray-900">
              {getVenueInformation(venueId).name}
            </h2>
          </div>
          <div className="ml-4 mt-2 flex-shrink-0">
            <span className="relative inline-flex items-center rounded-md px-4 py-2 md:text-lg font-medium bg-borders">
              {total.toFixed(config.decimals)} USD
            </span>
          </div>
        </div>
      </div>
      <div>
        {Object.keys(venuePortfolio.tokens).map((tickerId) => (
          <VenueToken
            key={tickerId}
            tickerId={tickerId}
            tokenBalance={venuePortfolio.tokens[tickerId]}
          />
        ))}
      </div>
    </div>
  );
}
