import {
  authenticate,
  listCurrentOrders,
  listEventTypes,
  listEvents,
  listMarketBook,
  listMarketCatalogue,
  listMarketTypes,
  listRunnerBook,
} from "betfair-api-ts";
import fs from "fs";
import { EventDetails, MarketCatalogue, MarketDetails } from "./types";

// TODO: Migrate typing
export const loginBetfair = async (): Promise<any> => {
  const {
    BETFAIR_USERNAME,
    BETFAIR_PASSWORD,
    BETFAIR_APP_KEY,
    BETFAIR_CERT,
    BETFAIR_CERT_KEY,
    BETFAIR_CHALLENGE,
  } = process.env;

  if (
    !BETFAIR_USERNAME ||
    !BETFAIR_PASSWORD ||
    !BETFAIR_APP_KEY ||
    !BETFAIR_CERT ||
    !BETFAIR_CERT_KEY ||
    !BETFAIR_CHALLENGE
  )
    return [];

  await authenticate({
    username: BETFAIR_USERNAME,
    password: BETFAIR_PASSWORD,
    appKey: BETFAIR_APP_KEY,
    certificate: BETFAIR_CERT, // Self Signed Certificate
    certificateKey: BETFAIR_CERT_KEY, // Self Signed Certificate Key
    certificatePassword: BETFAIR_CHALLENGE, // Optional passphrase for Certificate Key
  });

  const competitionIds = new Map<string, string>([
    ["afl", "11897406"],
    ["nba", "10547864"],
  ]);

  const competitionTypeIds = [
    competitionIds.get("nba") ?? "",
    competitionIds.get("afl") ?? "",
  ];

  const params = {
    filter: {
      competitionIds: competitionTypeIds,
    },
  };

  // DO NOT REMOVE - this will be used once 1 market processing is complete
  // This gets all events for the markets matched by competition id (afl & nba atm)
  // let x = await listEvents(params);
  // console.log("listOfEvents", x);

  // Get all markets available for sporting event
  let k = await listMarketCatalogue({
    filter: {
      // replace with array of markets to use
      eventIds: ["32355795"],
    },
    maxResults: 1000,
    marketProjection: ["EVENT"],
  });

  const marketDetails = new Map<string, MarketCatalogue>();

  const marketIdsForEvent = k.map((l) => {
    marketDetails.set(l.marketId, {
      marketName: l.marketName,
      marketId: l.marketId,
      totalMatched: l.totalMatched,
      event: l.event,
    });
    return l.marketId;
  });

  // Get details of specific market (odds, amount bet etc)
  let c = await listMarketBook({
    marketIds: marketIdsForEvent,
    priceProjection: {
      priceData: ["EX_BEST_OFFERS"],
    },
    matchProjection: "NO_ROLLUP",
  });

  // Match up marketNames to marketBooks
  let updatedDeets = c.map((t) => {
    let mName = marketDetails.get(t.marketId)?.marketName;
    let eventName = marketDetails.get(t.marketId)?.event?.name;

    if (!mName || !eventName) return;

    // Strip out any odds that don't contain any bet/lay positions.
    // If there are currently no positions from the market, we won't be able to get a 'fair value'
    t.runners = t.runners?.filter((f) =>
      Boolean(f?.ex?.availableToBack?.length || f?.ex?.availableToLay?.length)
    );

    return { marketName: mName, ...t, eventName };
  });

  return updatedDeets;
};
