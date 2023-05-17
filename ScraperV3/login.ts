import { authenticate, listEventTypes } from "betfair-api-ts";
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

  console.log(
    "FOOKIN SEND IT: ",
    BETFAIR_USERNAME,
    BETFAIR_PASSWORD,
    BETFAIR_APP_KEY,
    BETFAIR_CERT,
    BETFAIR_CERT_KEY,
    BETFAIR_CHALLENGE
  );

  let x = await authenticate({
    username: BETFAIR_USERNAME,
    password: BETFAIR_PASSWORD,
    appKey: BETFAIR_APP_KEY,
    certificate: BETFAIR_CERT, // Self Signed Certificate
    certificateKey: BETFAIR_CERT_KEY, // Self Signed Certificate Key
    certificatePassword: BETFAIR_CHALLENGE, // Optional passphrase for Certificate Key
  });

  //   listEventTypes();

  console.log("x", x);
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
