import type ComputedPortfolio from "@/types/ComputedPortfolio";
import VenueToken from "@/components/treasury/VenueToken";

interface Props {
  venueId: string;
  venuePortfolio: ComputedPortfolio["venues"][string];
  total: number;
}

export default function Venue({ venueId, venuePortfolio, total }: Props) {
  return (
    <div>
      <h2>
        {venueId} / {total} USD
      </h2>
      {Object.keys(venuePortfolio.tokens).map((tickerId) => (
        <VenueToken
          key={tickerId}
          tickerId={tickerId}
          tokenBalance={venuePortfolio.tokens[tickerId]}
        />
      ))}
    </div>
  );
}
