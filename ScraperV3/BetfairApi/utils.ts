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
import { EventDetails, MarketCatalogue, MarketDetailsMap } from "../types";
import { BetfairEventList } from "../types/Betfair";
import {
  EventResult,
  MarketBook,
} from "betfair-api-ts/lib/types/bettingAPI/betting";
import { competitionTypeIds } from "../constants/betfairConstants";

export const getBetfairDataForCompetitionId = async (
  compIds: typeof competitionTypeIds
) => {
  const listOfEventIds = await getEventsForCompetitionId(compIds);

  // Return early if there are no event ids.
  if (!(listOfEventIds?.length > 0)) return;

  // Get all markets available for event using the event ID
  // Param will be an array of event ids to get the relevant markets for each ID.
  //
  // This is a list of all markets available to bet / lay
  // EG: [
  // {
  //   marketId: '1.216968425',
  //   marketName: 'Handicap',
  //   totalMatched: 0,
  //   event: {
  //     id: '32548881',
  //     name: 'Milwaukee Bucks @ New York Knicks',
  //     countryCode: 'GB',
  //     timezone: 'GMT',
  //     openDate: '2023-12-25T17:10:00.000Z'
  //   }
  // },
  // {
  //   marketId: '1.216968697',
  //   marketName: 'Total Points Line',
  //   totalMatched: 0,
  //   event: {
  //     id: '32548881',
  //     name: 'Milwaukee Bucks @ New York Knicks',
  //     countryCode: 'GB',
  //     timezone: 'GMT',
  //     openDate: '2023-12-25T17:10:00.000Z'
  //   }
  // },
  const marketCatalogueForEventIds = await listMarketCatalogue({
    filter: {
      eventIds: listOfEventIds,
    },
    maxResults: 1000,
    marketProjection: ["EVENT"],
  });

  const marketDetailsMap = new Map<string, MarketCatalogue>();

  // Need to construct market objects so we can correctly fetch the books for each market.
  const marketIdsForEvent = marketCatalogueForEventIds.map((l) => {
    marketDetailsMap.set(l.marketId, {
      marketName: l.marketName,
      marketId: l.marketId,
      totalMatched: l.totalMatched,
      event: l.event,
    });
    return l.marketId;
  });

  // To prevent api error - TOO_MUCH_DATA error from betfair,
  // We only want to send a request that includes a max of 25-30 markets
  //
  // Get details of specific market (odds, amount bet etc)
  const marketBookList = await getMarketBookList(marketIdsForEvent);

  // Match up marketNames to marketBooks
  const updatedDeets = marketBookList.map((t) => {
    return t.map((z: any) => {
      let mName = marketDetailsMap.get(z.marketId)?.marketName;
      let eventName = marketDetailsMap.get(z.marketId)?.event?.name;

      if (!mName || !eventName) return;

      // Strip out any odds that don't contain any bet/lay positions.
      // If there are currently no positions from the market, we won't be able to get a 'fair value'
      z.runners = z.runners?.filter((f: any) =>
        Boolean(f?.ex?.availableToBack?.length || f?.ex?.availableToLay?.length)
      );

      return { marketName: mName, ...z, eventName };
    });
  });

  return updatedDeets;
};

/*
 * Fetch all market books for all events
 *
 */
const getMarketBookList = async (
  marketIdsForEvent: string[]
): Promise<MarketBook[][]> => {
  const splitElements = getMaxMarketsForEventIds(marketIdsForEvent);
  const promises: Promise<any>[] = [];

  splitElements.map((listOfMarketIds: string[]) => {
    // Due to map not waiting for network req to resolve, we need to create an array of promises
    // wait for all promises to resolve then return the array.
    const promise = listMarketBook({
      marketIds: listOfMarketIds,
      priceProjection: {
        priceData: ["EX_BEST_OFFERS"],
      },
      matchProjection: "NO_ROLLUP",
    });
    promises.push(promise);
  });

  const results = (await Promise.all(promises)) as MarketBook[][];

  return results;
};

/*
 * Returns an array of arrays split into x lengths.
 * Ideally, we want to seperate the marketIds into groups of ~25
 */
const getMaxMarketsForEventIds = (
  arr: any[],
  maxArrLength: number = 25
): any[] => {
  try {
    const finalArr = [];

    // Push Max amount into each array, then the final array with the remainder
    let iterator = 0;
    let localArr = [];
    for (let i = 0; i < arr.length; i++) {
      if (iterator < maxArrLength) {
        localArr.push(arr[i]);
      }
      iterator++;
      if (iterator >= maxArrLength || i === arr.length - 1) {
        finalArr.push(localArr);
        localArr = [];
        iterator = 0;
      }
    }

    return finalArr;
  } catch (e) {
    console.warn("Error seperating event ids into groups, [ERROR]: ", e);
    return [];
  }
};

const getEventsForCompetitionId = async (
  compIds: typeof competitionTypeIds
) => {
  // This gets all events for the markets matched by competition id (See constants file)
  const eventsRes: EventResult[] = await listEvents({
    filter: {
      competitionIds: compIds,
    },
  });

  const listOfEventIds: string[] = eventsRes.reduce(
    (acc: any, event: EventResult) => acc.concat(event.event?.id),
    []
  );

  return listOfEventIds;
};
