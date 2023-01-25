import type BeefyBalancesResponse from '@/types/BeefyBalancesResponse';

const API_URL = 'https://d3g53vzuolz6cb.cloudfront.net/balances';

const getBalances = async (): Promise<BeefyBalancesResponse> => {
  const response = await fetch(API_URL);
  return response.json();
};

export { getBalances };
