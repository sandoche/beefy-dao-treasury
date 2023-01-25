import type VenueInformation from '@/types/VenueInformation';

const venues: { [key: string]: VenueInformation } = {
  binance: {
    name: 'Binance',
    icon: 'binance.svg',
  },
  felix: {
    name: 'Felix',
  },
  cryptocom: {
    name: 'Crypto.com',
    icon: 'crypto.png',
  },
  bitrue: {
    name: 'Bitrue',
    icon: 'bitrue.png',
  },
};

const getVenueInformation = (venue: string): VenueInformation => {
  return venues[venue] || { name: venue };
};

export default getVenueInformation;
