import type ComputedPortfolio from "@/types/ComputedPortfolio";

interface Props {
  tickerId: string;
  tokenBalance: ComputedPortfolio["venues"][string]["tokens"][string];
}

export default function VenueToken({ tickerId, tokenBalance }: Props) {
  return (
    <div>
      <h3>{tickerId}</h3>
      <p>{tokenBalance.amount}</p>
      <p>{tokenBalance.valueInUsd}</p>
    </div>
  );
}
