import type ComputedPortfolio from "@/types/ComputedPortfolio";

interface Props {
  tickerId: string;
  tokenBalance: ComputedPortfolio["venues"][string]["tokens"][string];
}

export default function VenueToken({ tickerId, tokenBalance }: Props) {
  return (
    <div className="border-t bg-card px-4 py-5 sm:px-6 border-1 border-borders">
      <h3>{tickerId}</h3>
      <p>{tokenBalance.amount}</p>
      <p>{tokenBalance.valueInUsd}</p>
    </div>
  );
}
