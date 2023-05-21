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
import { compareEvents, ingestData } from "./utils";
require("dotenv").config();
// Test data
import { d, oddsApi } from "./sampleData";

const server = fastify({ logger: false });

// Testing
const sport = "basketball_nba";
// Temporary caching while we get system working
let cachedRes: undefined | (Map<string, object> | undefined)[];

server.get("/", async (request, reply) => {
  return "SERVER HEALTHY";
});

const apiKey = process.env.ODDS_API_KEY;
const regions = "au";
const oddsFormat = "decimal";
const dateFormat = "iso";
const markets = "h2h,spreads";

server.get("/nba/data", async (request, reply) => {
  console.log("SENDING it");
  try {
    // if (!cachedRes) {
    // console.log("Hitting endpoint");
    // const response = await axios.get(
    //   "https://api.the-odds-api.com/v4/sports/aussierules_afl/odds",
    //   {
    //     params: {
    //       apiKey,
    //       regions,
    //       markets,
    //       oddsFormat,
    //       dateFormat,
    //     },
    //   }
    // );
    // console.log("response: ", response.data[2].bookmakers[1].markets[0]);
    // cachedRes = response.data;
    // handleData(response.data);
    // handleData(d);
    // return reply.status(200).send(response.data);

    // if (!cachedRes) {
    // cachedRes = await loginBetfair();
    // } else {
    // let z = ingestData(d);
    // }

    let p = compareEvents(oddsApi, d);

    return reply.status(200).send(JSON.stringify(d));
  } catch (error: any) {
    console.log("Error status", error.response.status);
    reply.status(error.response.status).send(error.response.data);
  }
});

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});

const handleData = (data: OddsApi[]) => {
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
          // if (oddsApi.key === "spreads") {
          //   positiveExpectedValueLegs.push(
          //     ...getSpreadsPositiveExpectedValues(oddsApi, betfairOdds, event)
          //   );
          // }
          // TODO: Add 'spreads' seperate logic here
        });
      }
    });
  });
  console.log("positiveExpectedValueLegs", positiveExpectedValueLegs);
};

const getExpectedValue = (bookieOdds: number, fairOdds: number) => {
  // Stake amount = $10 for testing
  const stake = 10;
  const winProbability = 1 / fairOdds;
  const winOutcome = (bookieOdds * stake - stake) * winProbability;
  const loseProbability = 1 - winProbability;
  const loseOutcome = loseProbability * stake;

  return winOutcome - loseOutcome;
};

const getH2HPositiveExpectedValues = (
  oddsApi: OddsApiH2HMarket,
  betfairOdds: Bookmaker | undefined,
  event: OddsApi,
  bookieKey: string
): any[] => {
  let oddsApiPositiveEVH2HOutcomes = oddsApi.outcomes.map(
    (outcome: H2HMarketOdds, index: number) => {
      let betMarket = betfairOdds?.markets?.[0];
      let layMarket = betfairOdds?.markets?.[1];

      let fairOdds =
        ((betMarket?.outcomes?.[index]?.price ?? 0) +
          (layMarket?.outcomes?.[index]?.price ?? 0)) /
        2;

      // defensive code?
      if (!fairOdds) return;

      const odds = outcome.price;
      // Team 1 first in map iteration, then team 2
      const ev = getExpectedValue(odds, fairOdds);

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
  // Add filter here to remove any falsy values (such as undefined)
  return oddsApiPositiveEVH2HOutcomes.filter(Boolean);
};

// TODO
// Add bet spreads +/- the closest spread for other +EV bets
