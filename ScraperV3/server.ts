import axios from "axios";
import fastify from "fastify";
import {
  NBAOddsApi,
  OddsApiH2HMarket,
  OddsApiSpreadsMarket,
} from "./types/OddsApi";
import { Bookmaker } from "./types/OddsApi";
require("dotenv").config();

const server = fastify({ logger: false });

const d = [
  {
    id: "631b8e0b4684aa6a3970160f84e6244b",
    sport_key: "basketball_nba",
    sport_title: "NBA",
    commence_time: "2023-05-17T00:30:00Z",
    home_team: "Denver Nuggets",
    away_team: "Los Angeles Lakers",
    bookmakers: [
      {
        key: "topsport",
        title: "TopSport",
        last_update: "2023-05-15T10:19:19Z",
        markets: [
          {
            key: "h2h",
            last_update: "2023-05-15T10:19:19Z",
            outcomes: [
              { name: "Denver Nuggets", price: 1.46 },
              { name: "Los Angeles Lakers", price: 2.81 },
            ],
          },
          {
            key: "spreads",
            last_update: "2023-05-15T10:19:19Z",
            outcomes: [
              { name: "Denver Nuggets", price: 1.9, point: -5.5 },
              { name: "Los Angeles Lakers", price: 1.94, point: 5.5 },
            ],
          },
        ],
      },
      {
        key: "unibet",
        title: "Unibet",
        last_update: "2023-05-15T10:18:07Z",
        markets: [
          {
            key: "h2h",
            last_update: "2023-05-15T10:18:07Z",
            outcomes: [
              { name: "Denver Nuggets", price: 1.48 },
              { name: "Los Angeles Lakers", price: 2.75 },
            ],
          },
          {
            key: "spreads",
            last_update: "2023-05-15T10:18:07Z",
            outcomes: [
              { name: "Denver Nuggets", price: 1.91, point: -5.5 },
              { name: "Los Angeles Lakers", price: 1.91, point: 5.5 },
            ],
          },
        ],
      },
      {
        key: "tab",
        title: "TAB",
        last_update: "2023-05-15T10:18:48Z",
        markets: [
          {
            key: "h2h",
            last_update: "2023-05-15T10:18:48Z",
            outcomes: [
              { name: "Denver Nuggets", price: 1.46 },
              { name: "Los Angeles Lakers", price: 2.8 },
            ],
          },
          {
            key: "spreads",
            last_update: "2023-05-15T10:18:48Z",
            outcomes: [
              { name: "Denver Nuggets", price: 1.9, point: -5.5 },
              { name: "Los Angeles Lakers", price: 1.9, point: 5.5 },
            ],
          },
        ],
      },
      {
        key: "sportsbet",
        title: "SportsBet",
        last_update: "2023-05-15T10:18:22Z",
        markets: [
          {
            key: "h2h",
            last_update: "2023-05-15T10:18:22Z",
            outcomes: [
              { name: "Denver Nuggets", price: 1.44 },
              { name: "Los Angeles Lakers", price: 2.8 },
            ],
          },
          {
            key: "spreads",
            last_update: "2023-05-15T10:18:22Z",
            outcomes: [
              { name: "Denver Nuggets", price: 1.9, point: -5.5 },
              { name: "Los Angeles Lakers", price: 1.9, point: 5.5 },
            ],
          },
        ],
      },
      {
        key: "pointsbetau",
        title: "PointsBet (AU)",
        last_update: "2023-05-15T10:18:57Z",
        markets: [
          {
            key: "h2h",
            last_update: "2023-05-15T10:18:57Z",
            outcomes: [
              { name: "Denver Nuggets", price: 1.48 },
              { name: "Los Angeles Lakers", price: 2.55 },
            ],
          },
          {
            key: "spreads",
            last_update: "2023-05-15T10:18:57Z",
            outcomes: [
              { name: "Denver Nuggets", price: 1.9, point: -5.5 },
              { name: "Los Angeles Lakers", price: 1.9, point: 5.5 },
            ],
          },
        ],
      },
      {
        key: "bluebet",
        title: "BlueBet",
        last_update: "2023-05-15T10:19:08Z",
        markets: [
          {
            key: "h2h",
            last_update: "2023-05-15T10:19:08Z",
            outcomes: [
              { name: "Denver Nuggets", price: 1.48 },
              { name: "Los Angeles Lakers", price: 2.67 },
            ],
          },
        ],
      },
      {
        key: "betfair",
        title: "Betfair",
        last_update: "2023-05-15T10:18:34Z",
        markets: [
          {
            key: "h2h",
            last_update: "2023-05-15T10:18:34Z",
            outcomes: [
              { name: "Denver Nuggets", price: 1.5 },
              { name: "Los Angeles Lakers", price: 2.96 },
            ],
          },
          {
            key: "h2h_lay",
            last_update: "2023-05-15T10:18:34Z",
            outcomes: [
              { name: "Denver Nuggets", price: 1.51 },
              { name: "Los Angeles Lakers", price: 3 },
            ],
          },
        ],
      },
      {
        key: "neds",
        title: "Neds",
        last_update: "2023-05-15T10:18:16Z",
        markets: [
          {
            key: "h2h",
            last_update: "2023-05-15T10:18:16Z",
            outcomes: [
              { name: "Denver Nuggets", price: 1.46 },
              { name: "Los Angeles Lakers", price: 2.75 },
            ],
          },
        ],
      },
      {
        key: "ladbrokes",
        title: "Ladbrokes",
        last_update: "2023-05-15T10:18:53Z",
        markets: [
          {
            key: "h2h",
            last_update: "2023-05-15T10:18:53Z",
            outcomes: [
              { name: "Denver Nuggets", price: 1.46 },
              { name: "Los Angeles Lakers", price: 2.75 },
            ],
          },
        ],
      },
      {
        key: "betr_au",
        title: "Betr",
        last_update: "2023-05-15T10:19:30Z",
        markets: [
          {
            key: "h2h",
            last_update: "2023-05-15T10:19:30Z",
            outcomes: [
              { name: "Denver Nuggets", price: 1.45 },
              { name: "Los Angeles Lakers", price: 2.7 },
            ],
          },
          {
            key: "spreads",
            last_update: "2023-05-15T10:19:30Z",
            outcomes: [
              { name: "Denver Nuggets", price: 1.75, point: -4.5 },
              { name: "Los Angeles Lakers", price: 2.05, point: 4.5 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "c416e8cf41fbdb4848e9a71809b58ef8",
    sport_key: "basketball_nba",
    sport_title: "NBA",
    commence_time: "2023-05-18T00:30:00Z",
    home_team: "Boston Celtics",
    away_team: "Miami Heat",
    bookmakers: [
      {
        key: "tab",
        title: "TAB",
        last_update: "2023-05-15T10:18:48Z",
        markets: [
          {
            key: "h2h",
            last_update: "2023-05-15T10:18:48Z",
            outcomes: [
              { name: "Boston Celtics", price: 1.3 },
              { name: "Miami Heat", price: 3.7 },
            ],
          },
          {
            key: "spreads",
            last_update: "2023-05-15T10:18:48Z",
            outcomes: [
              { name: "Boston Celtics", price: 1.9, point: -7.5 },
              { name: "Miami Heat", price: 1.9, point: 7.5 },
            ],
          },
        ],
      },
      {
        key: "sportsbet",
        title: "SportsBet",
        last_update: "2023-05-15T10:18:22Z",
        markets: [
          {
            key: "h2h",
            last_update: "2023-05-15T10:18:22Z",
            outcomes: [
              { name: "Boston Celtics", price: 1.3 },
              { name: "Miami Heat", price: 3.57 },
            ],
          },
          {
            key: "spreads",
            last_update: "2023-05-15T10:18:22Z",
            outcomes: [
              { name: "Boston Celtics", price: 1.9, point: -7.5 },
              { name: "Miami Heat", price: 1.9, point: 7.5 },
            ],
          },
        ],
      },
      {
        key: "topsport",
        title: "TopSport",
        last_update: "2023-05-15T10:19:19Z",
        markets: [
          {
            key: "h2h",
            last_update: "2023-05-15T10:19:19Z",
            outcomes: [
              { name: "Boston Celtics", price: 1.29 },
              { name: "Miami Heat", price: 3.65 },
            ],
          },
          {
            key: "spreads",
            last_update: "2023-05-15T10:19:19Z",
            outcomes: [
              { name: "Boston Celtics", price: 1.97, point: -8 },
              { name: "Miami Heat", price: 1.85, point: 8 },
            ],
          },
        ],
      },
      {
        key: "pointsbetau",
        title: "PointsBet (AU)",
        last_update: "2023-05-15T10:18:57Z",
        markets: [
          {
            key: "h2h",
            last_update: "2023-05-15T10:18:57Z",
            outcomes: [
              { name: "Boston Celtics", price: 1.29 },
              { name: "Miami Heat", price: 3.8 },
            ],
          },
          {
            key: "spreads",
            last_update: "2023-05-15T10:18:57Z",
            outcomes: [
              { name: "Boston Celtics", price: 1.9, point: -7.5 },
              { name: "Miami Heat", price: 1.9, point: 7.5 },
            ],
          },
        ],
      },
      {
        key: "ladbrokes",
        title: "Ladbrokes",
        last_update: "2023-05-15T10:18:53Z",
        markets: [
          {
            key: "h2h",
            last_update: "2023-05-15T10:18:53Z",
            outcomes: [
              { name: "Boston Celtics", price: 1.3 },
              { name: "Miami Heat", price: 3.6 },
            ],
          },
        ],
      },
      {
        key: "neds",
        title: "Neds",
        last_update: "2023-05-15T10:18:16Z",
        markets: [
          {
            key: "h2h",
            last_update: "2023-05-15T10:18:16Z",
            outcomes: [
              { name: "Boston Celtics", price: 1.3 },
              { name: "Miami Heat", price: 3.6 },
            ],
          },
        ],
      },
      {
        key: "bluebet",
        title: "BlueBet",
        last_update: "2023-05-15T10:19:08Z",
        markets: [
          {
            key: "h2h",
            last_update: "2023-05-15T10:19:08Z",
            outcomes: [
              { name: "Boston Celtics", price: 1.29 },
              { name: "Miami Heat", price: 3.64 },
            ],
          },
        ],
      },
      {
        key: "betr_au",
        title: "Betr",
        last_update: "2023-05-15T10:19:30Z",
        markets: [
          {
            key: "h2h",
            last_update: "2023-05-15T10:19:30Z",
            outcomes: [
              { name: "Boston Celtics", price: 1.29 },
              { name: "Miami Heat", price: 3.5 },
            ],
          },
          {
            key: "spreads",
            last_update: "2023-05-15T10:19:30Z",
            outcomes: [
              { name: "Boston Celtics", price: 1.77, point: -6.5 },
              { name: "Miami Heat", price: 2.02, point: 6.5 },
            ],
          },
        ],
      },
      {
        key: "unibet",
        title: "Unibet",
        last_update: "2023-05-15T10:18:07Z",
        markets: [
          {
            key: "h2h",
            last_update: "2023-05-15T10:18:07Z",
            outcomes: [
              { name: "Boston Celtics", price: 1.33 },
              { name: "Miami Heat", price: 3.5 },
            ],
          },
          {
            key: "spreads",
            last_update: "2023-05-15T10:18:07Z",
            outcomes: [
              { name: "Boston Celtics", price: 1.91, point: -8 },
              { name: "Miami Heat", price: 1.91, point: 8 },
            ],
          },
        ],
      },
      {
        key: "betfair",
        title: "Betfair",
        last_update: "2023-05-15T10:18:34Z",
        markets: [
          {
            key: "h2h",
            last_update: "2023-05-15T10:18:34Z",
            outcomes: [
              { name: "Boston Celtics", price: 1.34 },
              { name: "Miami Heat", price: 3.6 },
            ],
          },
          {
            key: "h2h_lay",
            last_update: "2023-05-15T10:18:34Z",
            outcomes: [
              { name: "Boston Celtics", price: 1.37 },
              { name: "Miami Heat", price: 3.9 },
            ],
          },
        ],
      },
    ],
  },
];

// Testing
const sport = "basketball_nba";
// Temporary caching while we get system working
let cachedRes: null | {} = null;

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
    //   if (!cachedRes) {
    //     console.log("Hitting endpoint");
    //     const response = await axios.get(
    //       "https://api.the-odds-api.com/v4/sports/basketball_nba/odds",
    //       {
    //         params: {
    //           apiKey,
    //           regions,
    //           markets,
    //           oddsFormat,
    //           dateFormat,
    //         },
    //       }
    //     );
    //     cachedRes = response.data;
    // handleData(response.data);
    handleData(d);
    return reply.status(200).send(d);
    // }
    // return reply.status(200).send(cachedRes);
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

const handleData = (data: NBAOddsApi[]) => {
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

  // Compare to find +EV bets

  data.map((event: NBAOddsApi) => {
    const betfairOdds = betfairDataMap.get(event.id);
    //
    let betMarket = betfairOdds?.markets?.[0];
    let layMarket = betfairOdds?.markets?.[1];

    let fairOddsTeamOne =
      ((betMarket?.outcomes?.[0]?.price ?? 0) +
        (layMarket?.outcomes?.[0]?.price ?? 0)) /
      2;

    let fairOddsTeamTwo =
      ((betMarket?.outcomes?.[1]?.price ?? 0) +
        (layMarket?.outcomes?.[1]?.price ?? 0)) /
      2;

    // defensive code?
    if (!fairOddsTeamOne || !fairOddsTeamTwo) return;

    // Search for +EV bet
    // 1. Check if odds at each bookmaker are above market value
    event.bookmakers.map((bookie) => {
      if (bookie.key !== "betfair") {
        bookie.markets.map((huh) => {
          const team1Odds = huh.outcomes[0].price;
          const team2Odds = huh.outcomes[1].price;

          const ev = getExpectedValue(team1Odds, fairOddsTeamOne);
          const ev2 = getExpectedValue(team2Odds, fairOddsTeamTwo);
          console.log(ev, ev2);
        });
      }
    });

    // Find Betfair odds
  });
};

const getExpectedValue = (bookieOdds: number, fairOdds: number) => {
  // Stake amount = $10 for testing
  const stake = 10;
  const winOutcome = bookieOdds * stake - stake;
  const winProbability = 1 / fairOdds;
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
