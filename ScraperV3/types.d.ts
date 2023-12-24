export type MarketDetailsMap = {
  marketName: string;
};

export type EventDetails = {
  id?: string;
  name?: string;
  countryCode?: string;
  timezone?: string;
  openDate?: string;
};

export type MarketCatalogue = {
  marketId: string;
  marketName: string;
  totalMatched?: number;
  event?: EventDetails;
};
