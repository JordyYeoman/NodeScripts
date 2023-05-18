import {
  authenticate,
  listEventTypes,
  listEvents,
  listMarketBook,
  listMarketCatalogue,
  listMarketTypes,
  listRunnerBook,
} from "betfair-api-ts";
import fs from "fs";

export const loginBetfair = async () => {
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
    return;

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
      //   eventTypeIds: ["32337073"],
    },
  };

  // TODO
  // Get marketid for markets
  // Get selectionId - what is it??

  const o = await listEventTypes(params);
  console.log("o", o[1]);

  // This gets all events for the markets matched by competition id (afl & nba atm)

  //   let x = await listEvents(params);
  //   console.log("listEvents: ", x);

  // let y = await listMarketBook({
  //   marketIds: ["1.214006168"],
  // });
  //   console.log("Y: ", y);

  //   let z = await listMarketTypes(params);
  //   console.log("z: ", z);

  // Get all markets available for sporting event
  let k = await listMarketCatalogue({
    filter: {
      eventIds: ["32337073"],
      //   eventTypeIds: ["7522"],
    },
    maxResults: 1000,
  });
  console.log("k", k);

  const marketIdsDetails = new Map<string, string>();

  const marketIdsForEvent = k.map((l) => {
    marketIdsDetails.set(l.marketId, l.marketName);
    return l.marketId;
  });

  // Get details of specific market (odds, amount bet etc)
  let c = await listMarketBook({
    marketIds: marketIdsForEvent,
  });

  console.log("c", c[10].keyLineDescription);

  // Using the keyline description we can find the basis of where the handicap odds will be set around.
  // We then need to:

  // Find the keyline inside the large dataset 'runners' which is a list of all odds for the market type
  // Take 1-2 elements above and below the keyline description handicap levels
  // EG +10.5, -10.5, then we also want +9.5/-9.5 & +11.5, -11.5 with their odds values

  // This way we can get an average between the two if no value is set for 10.5
};

// export declare type MarketFilter = {
//     bspOnly?: boolean;
//     competitionIds?: string[];
//     eventIds?: string[];
//     eventTypeIds?: string[];
//     exchangeIds?: string[];
//     inPlayOnly?: boolean;
//     marketBettingTypes?: MarketBettingType[];
//     marketCountries?: string[];
//     marketIds?: string[];
//     marketStartTime?: TimeRange;
//     marketTypeCodes?: string[];
//     raceTypes?: string[];
//     textQuery?: string;
//     turnInPlayEnabled?: boolean;
//     venues?: string[];
//     withOrders?: OrderStatus[];
// };
