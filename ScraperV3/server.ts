import axios from "axios";
import fastify from "fastify";
import {
  H2HMarketOdds,
  OddsApi,
  OddsApiH2HMarket,
  OddsApiSpreadsMarket,
} from "./types/OddsApi";
import { Bookmaker } from "./types/OddsApi";
import { loginBetfair } from "./login";
import { compareEvents, getExpectedValue, ingestData } from "./utils";
require("dotenv").config();

// Test data
import { d, oddsApi } from "./sampleData";
import { params } from "./setup/config";
import { getSportData } from "./OddsApi/api";
import { OddsApiSportKey } from "./enums/OddsApi";

const server = fastify({ logger: false });

// Temporary caching while we get system working
let cachedRes: undefined | (Map<string, object> | undefined)[];

server.get("/", async (request, reply) => {
  return "SERVER HEALTHY";
});

server.get("/afl/data", async (request, reply) => {
  try {
    // Fetch all sport specific data from Odds API
    // This will return each bookmakers odds for H2H & Spreads markets
    const res = await getSportData(OddsApiSportKey.AFL);

    // Find any +EV bets for H2H markets
    getValidH2HMarkets(res);
    // getValidH2HMarkets(d);

    // Get Betfair Data for sport market
    // EG - AFL / NBA
    const betfairData = await loginBetfair();

    // let z = ingestData(d);
    // let p = compareEvents(oddsApi, z);

    return reply.status(200).send(JSON.stringify(d));
  } catch (error: any) {
    console.log("Error status", error.response);
    reply.send(error.response);
  }
});

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});

const getValidH2HMarkets = (data: OddsApi[]) => {
  const betfairDataMap: Map<string, Bookmaker> = new Map();

  // Extract betfair data for comparison - needed to find +EV
  data?.map((x) => {
    let newData = {
      id: x?.id,
      betfair: {} as Bookmaker,
    };

    newData.betfair =
      x?.bookmakers.find((z) => z?.key === "betfair") ?? ({} as Bookmaker);
    betfairDataMap.set(newData.id, newData.betfair);
  });

  // Search for +EV bet
  const positiveExpectedValueLegs: any = [];

  // Compare to find +EV bets
  data.map((event: OddsApi) => {
    const betfairOdds = betfairDataMap.get(event.id);

    event.bookmakers.map((bookie) => {
      const { key, title, last_update } = bookie;
      if (bookie.key !== "betfair") {
        bookie.markets.map((oddsApi) => {
          if (oddsApi.key === "h2h") {
            positiveExpectedValueLegs.push(
              ...getH2HPositiveExpectedValues(
                oddsApi,
                betfairOdds,
                event,
                bookie.key
              )
            );
          }
        });
      }
    });
  });
  console.log("positiveExpectedValueLegs", positiveExpectedValueLegs);
};

const getH2HPositiveExpectedValues = (
  oddsApi: OddsApiH2HMarket,
  betfairOdds: Bookmaker | undefined,
  event: OddsApi,
  bookieKey: string
): any[] => {
  let oddsApiPositiveEVH2HOutcomes = oddsApi?.outcomes?.map(
    (outcome: H2HMarketOdds, index: number) => {
      let betMarket = betfairOdds?.markets?.[0];
      let layMarket = betfairOdds?.markets?.[1];

      // Get fair odds between back & lay markets
      let fairOdds =
        ((betMarket?.outcomes?.[index]?.price ?? 0) +
          (layMarket?.outcomes?.[index]?.price ?? 0)) /
        2;

      if (!fairOdds) return;

      const odds = outcome?.price;

      const ev = getExpectedValue(odds, fairOdds);
      console.log("ev", ev);
      if (ev > 0) {
        return {
          eventName: event.sport_title,
          homeTeam: event.home_team,
          awayTeam: event.away_team,
          expectedValue: ev,
          betOn: outcome.name,
          bookie: bookieKey,
          odds,
          fairOdds: fairOdds,
        };
      }
    }
  );

  console.log("oddsApiPositiveEVH2HOutcomes", oddsApiPositiveEVH2HOutcomes);
  // Add filter here to remove any falsy values
  return oddsApiPositiveEVH2HOutcomes.filter(Boolean);
};
