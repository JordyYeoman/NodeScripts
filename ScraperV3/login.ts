import {
  authenticate,
  listEventTypes,
  listEvents,
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
    },
  };

  // TODO
  // Get marketid for markets
  // Get selectionId - what is it??

  // This gets all events for the markets matched by competition id (afl & nba atm)
  let x = await listEvents(params);
  let y = await listRunnerBook({
    marketId: "11897406",
    selectionId: "",
  });
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
