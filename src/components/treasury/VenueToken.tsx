import type BeefyBalancesResponse from "@/types/BeefyBalancesResponse";

interface Props {
  tickerId: string;
  tokenBalance: BeefyBalancesResponse[string][string];
}

export default function VenueToken({ tickerId, tokenBalance }: Props) {
  return (
    <div>
      <h3>{tickerId}</h3>
      <p>{tokenBalance}</p>
    </div>
  );
}
