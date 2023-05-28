import { authenticate } from "betfair-api-ts";

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
};
