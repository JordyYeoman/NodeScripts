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
import { doShitWithRes } from "./utils";
require("dotenv").config();

const server = fastify({ logger: false });

const d = [
  {
    marketName: "Match Odds",
    marketId: "1.214006168",
    isMarketDataDelayed: true,
    status: "OPEN",
    betDelay: 0,
    bspReconciled: false,
    complete: true,
    inplay: false,
    numberOfWinners: 1,
    numberOfRunners: 2,
    numberOfActiveRunners: 2,
    lastMatchTime: "2023-05-18T04:03:26.342Z",
    totalMatched: 5611.56,
    totalAvailable: 7422.19,
    crossMatching: true,
    runnersVoidable: false,
    version: 5247561220,
    runners: [
      {
        selectionId: 39992,
        handicap: 0,
        status: "ACTIVE",
        lastPriceTraded: 2.56,
        totalMatched: 0,
      },
      {
        selectionId: 39988,
        handicap: 0,
        status: "ACTIVE",
        lastPriceTraded: 1.64,
        totalMatched: 0,
      },
    ],
  },
  {
    marketName: "First Scoring Play",
    marketId: "1.214006169",
    isMarketDataDelayed: true,
    status: "OPEN",
    betDelay: 0,
    bspReconciled: false,
    complete: true,
    inplay: false,
    numberOfWinners: 1,
    numberOfRunners: 4,
    numberOfActiveRunners: 4,
    totalMatched: 0,
    totalAvailable: 143.67,
    crossMatching: true,
    runnersVoidable: false,
    version: 5247561222,
    runners: [
      { selectionId: 762250, handicap: 0, status: "ACTIVE", totalMatched: 0 },
      { selectionId: 762251, handicap: 0, status: "ACTIVE", totalMatched: 0 },
      { selectionId: 740103, handicap: 0, status: "ACTIVE", totalMatched: 0 },
      { selectionId: 740104, handicap: 0, status: "ACTIVE", totalMatched: 0 },
    ],
  },
  {
    marketName: "First Quarter Result",
    marketId: "1.214006171",
    isMarketDataDelayed: true,
    status: "OPEN",
    betDelay: 0,
    bspReconciled: false,
    complete: true,
    inplay: false,
    numberOfWinners: 1,
    numberOfRunners: 2,
    numberOfActiveRunners: 2,
    totalMatched: 0,
    totalAvailable: 0,
    crossMatching: true,
    runnersVoidable: false,
    version: 5247561226,
    runners: [
      { selectionId: 39992, handicap: 0, status: "ACTIVE" },
      { selectionId: 39988, handicap: 0, status: "ACTIVE" },
    ],
  },
  {
    marketName: "Half Time Result",
    marketId: "1.214006172",
    isMarketDataDelayed: true,
    status: "OPEN",
    betDelay: 0,
    bspReconciled: false,
    complete: true,
    inplay: false,
    numberOfWinners: 1,
    numberOfRunners: 2,
    numberOfActiveRunners: 2,
    totalMatched: 0,
    totalAvailable: 0,
    crossMatching: true,
    runnersVoidable: false,
    version: 5247561228,
    runners: [
      { selectionId: 2013687, handicap: 0, status: "ACTIVE" },
      { selectionId: 2013667, handicap: 0, status: "ACTIVE" },
    ],
  },
  {
    marketName: "Half Time/Full Time",
    marketId: "1.214006173",
    isMarketDataDelayed: true,
    status: "OPEN",
    betDelay: 0,
    bspReconciled: false,
    complete: true,
    inplay: false,
    numberOfWinners: 1,
    numberOfRunners: 5,
    numberOfActiveRunners: 5,
    totalMatched: 0,
    totalAvailable: 0,
    crossMatching: false,
    runnersVoidable: false,
    version: 5247561230,
    runners: [
      { selectionId: 419396, handicap: 0, status: "ACTIVE" },
      { selectionId: 426986, handicap: 0, status: "ACTIVE" },
      { selectionId: 426987, handicap: 0, status: "ACTIVE" },
      { selectionId: 419398, handicap: 0, status: "ACTIVE" },
      { selectionId: 413426, handicap: 0, status: "ACTIVE" },
    ],
  },
  {
    marketName: "Total Game Score",
    marketId: "1.214006174",
    isMarketDataDelayed: true,
    status: "OPEN",
    betDelay: 0,
    bspReconciled: false,
    complete: true,
    inplay: false,
    numberOfWinners: 1,
    numberOfRunners: 9,
    numberOfActiveRunners: 9,
    totalMatched: 0,
    totalAvailable: 0,
    crossMatching: true,
    runnersVoidable: false,
    version: 5247561232,
    runners: [
      { selectionId: 4207181, handicap: 0, status: "ACTIVE" },
      { selectionId: 4207182, handicap: 0, status: "ACTIVE" },
      { selectionId: 4207183, handicap: 0, status: "ACTIVE" },
      { selectionId: 4207184, handicap: 0, status: "ACTIVE" },
      { selectionId: 4207185, handicap: 0, status: "ACTIVE" },
      { selectionId: 4207186, handicap: 0, status: "ACTIVE" },
      { selectionId: 4207187, handicap: 0, status: "ACTIVE" },
      { selectionId: 4207188, handicap: 0, status: "ACTIVE" },
      { selectionId: 4207189, handicap: 0, status: "ACTIVE" },
    ],
  },
  {
    marketName: "Tri Bet",
    marketId: "1.214006175",
    isMarketDataDelayed: true,
    status: "OPEN",
    betDelay: 0,
    bspReconciled: false,
    complete: true,
    inplay: false,
    numberOfWinners: 1,
    numberOfRunners: 3,
    numberOfActiveRunners: 3,
    totalMatched: 0,
    totalAvailable: 0,
    crossMatching: true,
    runnersVoidable: false,
    version: 5247561234,
    runners: [
      { selectionId: 3929179, handicap: 0, status: "ACTIVE" },
      { selectionId: 3924097, handicap: 0, status: "ACTIVE" },
      { selectionId: 3925609, handicap: 0, status: "ACTIVE" },
    ],
  },
  {
    marketName: "Winning Margin 24.5",
    marketId: "1.214006176",
    isMarketDataDelayed: true,
    status: "OPEN",
    betDelay: 0,
    bspReconciled: false,
    complete: true,
    inplay: false,
    numberOfWinners: 1,
    numberOfRunners: 5,
    numberOfActiveRunners: 5,
    totalMatched: 0,
    totalAvailable: 0,
    crossMatching: true,
    runnersVoidable: false,
    version: 5247561236,
    runners: [
      { selectionId: 7369478, handicap: 0, status: "ACTIVE" },
      { selectionId: 7369477, handicap: 0, status: "ACTIVE" },
      { selectionId: 7369479, handicap: 0, status: "ACTIVE" },
      { selectionId: 7369476, handicap: 0, status: "ACTIVE" },
      { selectionId: 39993, handicap: 0, status: "ACTIVE" },
    ],
  },
  {
    marketName: "Winning Margin 39.5",
    marketId: "1.214006177",
    isMarketDataDelayed: true,
    status: "OPEN",
    betDelay: 0,
    bspReconciled: false,
    complete: true,
    inplay: false,
    numberOfWinners: 1,
    numberOfRunners: 5,
    numberOfActiveRunners: 5,
    totalMatched: 0,
    totalAvailable: 84.98,
    crossMatching: true,
    runnersVoidable: false,
    version: 5247561238,
    runners: [
      { selectionId: 875065, handicap: 0, status: "ACTIVE", totalMatched: 0 },
      { selectionId: 875066, handicap: 0, status: "ACTIVE" },
      { selectionId: 875081, handicap: 0, status: "ACTIVE", totalMatched: 0 },
      { selectionId: 875082, handicap: 0, status: "ACTIVE" },
      { selectionId: 39993, handicap: 0, status: "ACTIVE" },
    ],
  },
  {
    marketName: "Winning Margin Spread",
    marketId: "1.214006178",
    isMarketDataDelayed: true,
    status: "OPEN",
    betDelay: 0,
    bspReconciled: false,
    complete: true,
    inplay: false,
    numberOfWinners: 1,
    numberOfRunners: 9,
    numberOfActiveRunners: 9,
    totalMatched: 0,
    totalAvailable: 0,
    crossMatching: true,
    runnersVoidable: false,
    version: 5247561240,
    runners: [
      { selectionId: 9354504, handicap: 0, status: "ACTIVE" },
      { selectionId: 9354505, handicap: 0, status: "ACTIVE" },
      { selectionId: 9354506, handicap: 0, status: "ACTIVE" },
      { selectionId: 9354507, handicap: 0, status: "ACTIVE" },
      { selectionId: 9354524, handicap: 0, status: "ACTIVE" },
      { selectionId: 9354525, handicap: 0, status: "ACTIVE" },
      { selectionId: 9354526, handicap: 0, status: "ACTIVE" },
      { selectionId: 9354527, handicap: 0, status: "ACTIVE" },
      { selectionId: 39993, handicap: 0, status: "ACTIVE" },
    ],
  },
  {
    marketName: "Handicap",
    marketId: "1.214006180",
    isMarketDataDelayed: true,
    status: "OPEN",
    betDelay: 0,
    bspReconciled: false,
    complete: true,
    inplay: false,
    numberOfWinners: 0,
    numberOfRunners: 400,
    numberOfActiveRunners: 400,
    lastMatchTime: "2023-05-18T03:00:47.084Z",
    totalMatched: 23490.93,
    totalAvailable: 8810.98,
    crossMatching: true,
    runnersVoidable: false,
    version: 5247561244,
    runners: [
      {
        selectionId: 39992,
        handicap: 4.5,
        status: "ACTIVE",
        lastPriceTraded: 2.22,
        totalMatched: 0,
      },
      {
        selectionId: 39988,
        handicap: -4.5,
        status: "ACTIVE",
        lastPriceTraded: 1.81,
        totalMatched: 0,
      },
      {
        selectionId: 39992,
        handicap: 5.5,
        status: "ACTIVE",
        lastPriceTraded: 2.16,
        totalMatched: 0,
      },
      {
        selectionId: 39988,
        handicap: -5.5,
        status: "ACTIVE",
        lastPriceTraded: 1.84,
        totalMatched: 0,
      },
      {
        selectionId: 39988,
        handicap: -6.5,
        status: "ACTIVE",
        lastPriceTraded: 1.85,
        totalMatched: 0,
      },
      {
        selectionId: 39988,
        handicap: -7.5,
        status: "ACTIVE",
        lastPriceTraded: 1.9,
        totalMatched: 0,
      },
      {
        selectionId: 39992,
        handicap: 9.5,
        status: "ACTIVE",
        lastPriceTraded: 2,
        totalMatched: 0,
      },
      {
        selectionId: 39988,
        handicap: -9.5,
        status: "ACTIVE",
        lastPriceTraded: 2,
        totalMatched: 0,
      },
      {
        selectionId: 39992,
        handicap: 10.5,
        status: "ACTIVE",
        lastPriceTraded: 1.85,
        totalMatched: 0,
      },
      {
        selectionId: 39988,
        handicap: -13.5,
        status: "ACTIVE",
        lastPriceTraded: 2.16,
        totalMatched: 0,
      },
    ],
    keyLineDescription: {
      keyLine: [
        { selectionId: 39992, handicap: 10.5 },
        { selectionId: 39988, handicap: -10.5 },
      ],
    },
  },
  {
    marketName: "Total Points",
    marketId: "1.214006381",
    isMarketDataDelayed: true,
    status: "OPEN",
    betDelay: 0,
    bspReconciled: false,
    complete: true,
    inplay: false,
    numberOfWinners: 0,
    numberOfRunners: 482,
    numberOfActiveRunners: 482,
    lastMatchTime: "2023-05-18T04:00:14.132Z",
    totalMatched: 200,
    totalAvailable: 1742.43,
    crossMatching: true,
    runnersVoidable: false,
    version: 5247561646,
    runners: [
      {
        selectionId: 8435233,
        handicap: 170.5,
        status: "ACTIVE",
        lastPriceTraded: 2,
        totalMatched: 0,
      },
      {
        selectionId: 8435232,
        handicap: 170.5,
        status: "ACTIVE",
        lastPriceTraded: 2,
        totalMatched: 0,
      },
    ],
    keyLineDescription: {
      keyLine: [
        { selectionId: 8435232, handicap: 172.5 },
        { selectionId: 8435233, handicap: 172.5 },
      ],
    },
  },
  {
    marketName: "Total Points Line",
    marketId: "1.214006636",
    isMarketDataDelayed: true,
    status: "OPEN",
    betDelay: 0,
    bspReconciled: false,
    complete: true,
    inplay: false,
    numberOfWinners: 0,
    numberOfRunners: 1,
    numberOfActiveRunners: 1,
    totalMatched: 0,
    totalAvailable: 136.91,
    crossMatching: false,
    runnersVoidable: false,
    version: 5247562156,
    runners: [
      { selectionId: 40875, handicap: 0, status: "ACTIVE", totalMatched: 0 },
    ],
  },
];

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
    //   "https://api.the-odds-api.com/v4/sports/basketball_nba/odds",
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
    // cachedRes = response.data;
    // handleData(response.data);
    // handleData(d);
    // return reply.status(200).send(response.data);

    if (!cachedRes) {
      cachedRes = await loginBetfair();
    } else {
      doShitWithRes(cachedRes);
    }

    return reply.status(200).send(JSON.stringify(cachedRes));
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

const prettyConsole = (title: string, x: string | number) => {
  console.log(
    "================================================================"
  );
  console.log(title, ": ", x);
  console.log(
    "================================================================"
  );
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
