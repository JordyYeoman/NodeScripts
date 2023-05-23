import axios from "axios";
import { OddsApiSportKey } from "../enums/OddsApi";
import { params } from "../setup/config";
import { OddsApi } from "../types/OddsApi";

export const getSportData = async (
  sport: OddsApiSportKey
): Promise<OddsApi[]> => {
  const response = await axios.get(
    `https://api.the-odds-api.com/v4/sports/${sport}/odds`,
    {
      params,
    }
  );

  if (!response?.data) throw new Error("Unable to fetch OddsApi data");

  return response?.data;
};
