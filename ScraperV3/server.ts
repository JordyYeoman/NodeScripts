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
import { getValidH2HMarkets } from "./OddsApi/H2H/h2hUtil";

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
    const positiveH2H = getValidH2HMarkets(res);

    // Get Betfair Data for sport market
    // EG - AFL / NBA
    // const betfairData = await loginBetfair();

    // let z = ingestData(d);
    // let p = compareEvents(oddsApi, z);

    return reply.status(200).send({
      message: "VALID",
      payload: JSON.stringify(positiveH2H),
    });
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
