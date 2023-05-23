const apiKey = process.env.ODDS_API_KEY;
const regions = "au";
const oddsFormat = "decimal";
const dateFormat = "iso";
const markets = "h2h,spreads";

export const params = {
  apiKey,
  regions,
  markets,
  oddsFormat,
  dateFormat,
};
