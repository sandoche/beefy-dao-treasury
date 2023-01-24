type ComputedPortfolio = {
  total: number;
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
