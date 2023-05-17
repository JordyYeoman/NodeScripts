import { authenticate } from "betfair-api-ts";
import fs from "fs";

export const loginBetfair = async () => {
  const key = "";
  const cert = "";
  if (!key || !cert) return;

  await authenticate({
    username: process.env.BETFAIR_USERNAME ?? "",
    password: process.env.BETFAIR_PASSWORD ?? "",
    appKey: process.env.BETFAIR_APP_KEY ?? "",
    certificate: cert, // Self Signed Certificate
    certificateKey: key, // Self Signed Certificate Key
    certificatePassword: process.env.BETFAIR_FILE_KEY, // Optional passphrase for Certificate Key
  });
};
