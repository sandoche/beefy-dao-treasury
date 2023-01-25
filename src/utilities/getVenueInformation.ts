import type VenueInformation from '@/types/VenueInformation';

const venues: { [key: string]: VenueInformation } = {
  binance: {
    name: 'Binance',
  },
  felix: {
    name: 'Felix',
  },
  cryptocom: {
    name: 'Crypto.com',
  },
  bitrue: {
    name: 'Bitrue',
  },
};

const getVenueInformation = (venue: string): VenueInformation => {
  return venues[venue] || { name: venue };
};

export default getVenueInformation;
