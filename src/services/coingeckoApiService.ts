import type CoingeckoConversionRatesResponse from "@/types/CoingeckoConversionRatesResponse";

const API_URL = "https://api.coingecko.com/api/v3";

const getConversionRates = async (
  coinIds: Set<string>
): Promise<CoingeckoConversionRatesResponse> => {
  const stringifiedCoinIds = Array.from(coinIds).join(",");

  const response = await fetch(
    `${API_URL}/simple/price?ids=${stringifiedCoinIds}&vs_currencies=usd`
  );
  return response.json();
};

export { getConversionRates };
