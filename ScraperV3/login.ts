import { authenticate } from "betfair-api-ts";
import fs from "fs";

export const loginBetfair = async () => {
  const key = "";
  const cert = "";
  if (!key || !cert) return;

  let x = await authenticate({
    username: process.env.BETFAIR_USERNAME ?? "",
    password: process.env.BETFAIR_PASSWORD ?? "",
    appKey: process.env.BETFAIR_APP_KEY ?? "",
    certificate: cert, // Self Signed Certificate
    certificateKey: process.env.BETFAIR_CERT_KEY ?? "", // Self Signed Certificate Key
    certificatePassword: process.env.BETFAIR_CHALLENGE, // Optional passphrase for Certificate Key
  });

  console.log("x", x);
};
