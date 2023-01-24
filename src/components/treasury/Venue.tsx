import type BeefyBalancesResponse from "@/types/BeefyBalancesResponse";

interface Props {
  venueId: string;
  venuePortfolio: BeefyBalancesResponse[string];
}

export default function Venue({ venueId, venuePortfolio }: Props) {
  return (
    <div>
      <h2>{venueId}</h2>
    </div>
  );
}
