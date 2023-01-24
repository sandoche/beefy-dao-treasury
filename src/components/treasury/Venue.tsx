import type BeefyBalancesResponse from "@/types/BeefyBalancesResponse";
import VenueToken from "@/components/treasury/VenueToken";

interface Props {
  venueId: string;
  venuePortfolio: BeefyBalancesResponse[string];
}

export default function Venue({ venueId, venuePortfolio }: Props) {
  return (
    <div>
      <h2>{venueId}</h2>
      {Object.keys(venuePortfolio).map((tickerId) => (
        <VenueToken
          key={tickerId}
          tickerId={tickerId}
          tokenBalance={venuePortfolio[tickerId]}
        />
      ))}
    </div>
  );
}
