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
import { EventDetails, MarketCatalogue, MarketDetails } from "../types";
import { BetfairEventList } from "../types/Betfair";
import { EventResult } from "betfair-api-ts/lib/types/bettingAPI/betting";

export const getData = async () => {
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

  // This gets all events for the markets matched by competition id (afl & nba atm)
  let eventsRes: EventResult[] = await listEvents(params);
  const listOfEventIds = eventsRes.reduce(
    (acc: any, event: EventResult) => acc.concat(event.event?.id),
    []
  );

  if (!(listOfEventIds?.length > 0)) return;

  // Get all markets available for sporting event
  let k = await listMarketCatalogue({
    filter: {
      eventIds: listOfEventIds,
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

  // To prevent api error - TOO_MUCH_DATA error from betfair,
  // We only want to send a request that includes a max of 30 markets
  //
  // Get details of specific market (odds, amount bet etc)
  const marketBookList = await getMarketBookList(marketIdsForEvent);

  // Match up marketNames to marketBooks
  let updatedDeets = marketBookList.map((t) => {
    let mName = marketDetails.get(t.marketId)?.marketName;
    let eventName = marketDetails.get(t.marketId)?.event?.name;

    if (!mName || !eventName) return;

    // Strip out any odds that don't contain any bet/lay positions.
    // If there are currently no positions from the market, we won't be able to get a 'fair value'
    t.runners = t.runners?.filter((f: any) =>
      Boolean(f?.ex?.availableToBack?.length || f?.ex?.availableToLay?.length)
    );

    return { marketName: mName, ...t, eventName };
  });

  console.log("update market", updatedDeets);
  return updatedDeets;
};

const getMarketBookList = async (
  marketIdsForEvent: string[]
): Promise<any[]> => {
  const splitElements = getSeperatedEventIds(marketIdsForEvent);
  const results: any[] = [];

  let marketBookList = await listMarketBook({
    marketIds: [""],
    priceProjection: {
      priceData: ["EX_BEST_OFFERS"],
    },
    matchProjection: "NO_ROLLUP",
  });

  splitElements.map((e: any) => {
    return e;
  });

  return marketBookList;
};

/*
 * Returns an array of arrays split into x lengths.
 * Ideally, we want to seperate the marketIds into groups of ~30
 */
const getSeperatedEventIds = (arr: any[], arrLength: number = 30): any[] => {
  try {
    // How to split array into smaller chunks?
    // 1. Figure out how many arrays will be created
    const numArrays = Math.ceil(arr.length / arrLength);
    console.log("numArrays: ", numArrays);

    return [];
  } catch (e) {
    console.warn("Error seperating event ids: ", e);
    return [];
  }
};
