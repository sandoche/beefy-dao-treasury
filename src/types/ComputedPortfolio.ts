type ComputedPortfolio = {
  total: number;
  tokenIds: Set<string>;
  venues: {
    [venueId: string]: {
      total: number;
      tokens: {
        [tickerId: string]: {
          amount: number;
          valueInUsd: number;
        };
      };
    };
  };
};

export default ComputedPortfolio;
