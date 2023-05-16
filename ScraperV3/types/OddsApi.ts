export type H2HMarketOdds = {
  name: string;
  price: number;
};

export type SpreadsMarketOdds = {
  name: string;
  price: number;
  point: number;
};

export type OddsApiH2HMarket = {
  key: string;
  last_update: string;
  outcomes: H2HMarketOdds[];
};

export type OddsApiSpreadsMarket = {
  key: string;
  last_update: string;
  outcomes: SpreadsMarketOdds[];
};

export type Bookmaker = {
  key: string;
  title: string;
  last_update: string;
  markets: (OddsApiH2HMarket | OddsApiSpreadsMarket)[];
};

export type OddsApi = {
  id: string;
  sport_key: string;
  sport_title: string;
  commence_time: string;
  home_team: string;
  away_team: string;
  bookmakers: Bookmaker[];
};
