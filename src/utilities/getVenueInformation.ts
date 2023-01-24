import type VenueInformation from "../types/VenueInformation";

const venues: { [key: string]: VenueInformation } = {
  binance: {
    name: "Binance",
  },
  felix: {
    name: "Felix",
  },
  cryptocom: {
    name: "Crypto.com",
  },
  bitrue: {
    name: "Bitrue",
  },
};

const getVenueInformation = (venue: string): VenueInformation => {
  return venues[venue] || { name: venue };
};

export default getVenueInformation;

/*

{
    "binance": {
        "USDT": 98055.63063417,
        "BUSD": 82768.6168948,
        "BIFI": 154.9413044
    },
    "felix": {
        "BIFI": 87.87950109,
        "FTM": 21852.19008471,
        "USDT": 7272.5246663
    },
    "cryptocom": {
        "LTC": 0.95966592,
        "BIFI": 80.9602725,
        "USDT": 0.00290985,
        "USD": 8250.4185
    },
    "bitrue": {
        "USDT": 41375.86,
        "BIFI": 29.418
    }
}


*/
