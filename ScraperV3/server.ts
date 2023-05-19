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
import { doShitWithRes } from "./utils";
require("dotenv").config();

const server = fastify({ logger: false });

const d = [
  {
    marketName: "Match Odds",
    marketId: "1.214006168",
    isMarketDataDelayed: true,
    status: "OPEN",
    betDelay: 0,
    bspReconciled: false,
    complete: true,
    inplay: false,
    numberOfWinners: 1,
    numberOfRunners: 2,
    numberOfActiveRunners: 2,
    lastMatchTime: "2023-05-19T00:00:08.143Z",
    totalMatched: 13143.67,
    totalAvailable: 10183.15,
    crossMatching: true,
    runnersVoidable: false,
    version: 5247561220,
    runners: [
      {
        selectionId: 39992,
        handicap: 0,
        status: "ACTIVE",
        lastPriceTraded: 2.32,
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 2.32, size: 280.44 },
            { price: 2.3, size: 42.81 },
            { price: 2.22, size: 228.66 },
          ],
          availableToLay: [
            { price: 2.36, size: 101.11 },
            { price: 2.38, size: 474.86 },
            { price: 2.4, size: 351.76 },
          ],
          tradedVolume: [],
        },
      },
      {
        selectionId: 39988,
        handicap: 0,
        status: "ACTIVE",
        lastPriceTraded: 1.72,
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 1.73, size: 329.09 },
            { price: 1.72, size: 954.81 },
            { price: 1.7, size: 600.83 },
          ],
          availableToLay: [
            { price: 1.75, size: 30 },
            { price: 1.76, size: 389.25 },
            { price: 1.82, size: 285.51 },
          ],
          tradedVolume: [],
        },
      },
    ],
  },
  {
    marketName: "First Scoring Play",
    marketId: "1.214006169",
    isMarketDataDelayed: true,
    status: "OPEN",
    betDelay: 0,
    bspReconciled: false,
    complete: true,
    inplay: false,
    numberOfWinners: 1,
    numberOfRunners: 4,
    numberOfActiveRunners: 4,
    totalMatched: 0,
    totalAvailable: 625.66,
    crossMatching: true,
    runnersVoidable: false,
    version: 5247561222,
    runners: [
      {
        selectionId: 762250,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 3.6, size: 78.49 },
            { price: 1.07, size: 26.02 },
          ],
          availableToLay: [
            { price: 8, size: 34.78 },
            { price: 15, size: 3 },
          ],
          tradedVolume: [],
        },
      },
      {
        selectionId: 762251,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 3.75, size: 74.2 },
            { price: 1.15, size: 24.89 },
            { price: 1.07, size: 11.68 },
          ],
          availableToLay: [
            { price: 8.6, size: 32.86 },
            { price: 15, size: 1 },
          ],
          tradedVolume: [],
        },
      },
      {
        selectionId: 740103,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 3.05, size: 99.54 },
            { price: 1.07, size: 37.55 },
          ],
          availableToLay: [
            { price: 5.7, size: 48.82 },
            { price: 15, size: 2 },
          ],
          tradedVolume: [],
        },
      },
      {
        selectionId: 740104,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 3.6, size: 78.49 },
            { price: 1.15, size: 24.89 },
            { price: 1.07, size: 11.68 },
          ],
          availableToLay: [
            { price: 8, size: 34.78 },
            { price: 15, size: 1 },
          ],
          tradedVolume: [],
        },
      },
    ],
  },
  {
    marketName: "First Goalscorer",
    marketId: "1.214006170",
    isMarketDataDelayed: true,
    status: "OPEN",
    betDelay: 0,
    bspReconciled: false,
    complete: true,
    inplay: false,
    numberOfWinners: 1,
    numberOfRunners: 16,
    numberOfActiveRunners: 16,
    totalMatched: 0,
    totalAvailable: 15.31,
    crossMatching: false,
    runnersVoidable: true,
    version: 5250275809,
    runners: [
      {
        selectionId: 25207396,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [{ price: 14, size: 15.32 }],
          availableToLay: [],
          tradedVolume: [],
        },
      },
    ],
  },
  {
    marketName: "First Quarter Result",
    marketId: "1.214006171",
    isMarketDataDelayed: true,
    status: "OPEN",
    betDelay: 0,
    bspReconciled: false,
    complete: true,
    inplay: false,
    numberOfWinners: 1,
    numberOfRunners: 2,
    numberOfActiveRunners: 2,
    totalMatched: 0,
    totalAvailable: 908.98,
    crossMatching: true,
    runnersVoidable: false,
    version: 5247561226,
    runners: [
      {
        selectionId: 39992,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [{ price: 2, size: 204.08 }],
          availableToLay: [{ price: 2.34, size: 214.38 }],
          tradedVolume: [],
        },
      },
      {
        selectionId: 39988,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [{ price: 1.75, size: 286.45 }],
          availableToLay: [{ price: 2, size: 204.08 }],
          tradedVolume: [],
        },
      },
    ],
  },
  {
    marketName: "Half Time Result",
    marketId: "1.214006172",
    isMarketDataDelayed: true,
    status: "OPEN",
    betDelay: 0,
    bspReconciled: false,
    complete: true,
    inplay: false,
    numberOfWinners: 1,
    numberOfRunners: 2,
    numberOfActiveRunners: 2,
    totalMatched: 0,
    totalAvailable: 904.92,
    crossMatching: true,
    runnersVoidable: false,
    version: 5247561228,
    runners: [
      {
        selectionId: 2013687,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [{ price: 2.08, size: 188.95 }],
          availableToLay: [{ price: 2.42, size: 212.21 }],
          tradedVolume: [],
        },
      },
      {
        selectionId: 2013667,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [{ price: 1.71, size: 300.14 }],
          availableToLay: [{ price: 1.93, size: 203.63 }],
          tradedVolume: [],
        },
      },
    ],
  },
  {
    marketName: "Half Time/Full Time",
    marketId: "1.214006173",
    isMarketDataDelayed: true,
    status: "OPEN",
    betDelay: 0,
    bspReconciled: false,
    complete: true,
    inplay: false,
    numberOfWinners: 1,
    numberOfRunners: 5,
    numberOfActiveRunners: 5,
    totalMatched: 0,
    totalAvailable: 513.94,
    crossMatching: true,
    runnersVoidable: false,
    version: 5247561230,
    runners: [
      {
        selectionId: 419396,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [{ price: 2.9, size: 107.41 }],
          availableToLay: [{ price: 5.2, size: 44.38 }],
          tradedVolume: [],
        },
      },
      {
        selectionId: 426986,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [{ price: 6.6, size: 36.43 }],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 426987,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [{ price: 8.6, size: 26.84 }],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 419398,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [{ price: 2.02, size: 200.07 }],
          availableToLay: [{ price: 2.9, size: 79.59 }],
          tradedVolume: [],
        },
      },
      {
        selectionId: 413426,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [{ price: 24, size: 18.73 }],
          availableToLay: [],
          tradedVolume: [],
        },
      },
    ],
  },
  {
    marketName: "Total Game Score",
    marketId: "1.214006174",
    isMarketDataDelayed: true,
    status: "OPEN",
    betDelay: 0,
    bspReconciled: false,
    complete: true,
    inplay: false,
    numberOfWinners: 1,
    numberOfRunners: 9,
    numberOfActiveRunners: 9,
    totalMatched: 0,
    totalAvailable: 0,
    crossMatching: true,
    runnersVoidable: false,
    version: 5247561232,
    runners: [],
  },
  {
    marketName: "Tri Bet",
    marketId: "1.214006175",
    isMarketDataDelayed: true,
    status: "OPEN",
    betDelay: 0,
    bspReconciled: false,
    complete: true,
    inplay: false,
    numberOfWinners: 1,
    numberOfRunners: 3,
    numberOfActiveRunners: 3,
    totalMatched: 0,
    totalAvailable: 0,
    crossMatching: true,
    runnersVoidable: false,
    version: 5247561234,
    runners: [],
  },
  {
    marketName: "Winning Margin 24.5",
    marketId: "1.214006176",
    isMarketDataDelayed: true,
    status: "OPEN",
    betDelay: 0,
    bspReconciled: false,
    complete: true,
    inplay: false,
    numberOfWinners: 1,
    numberOfRunners: 5,
    numberOfActiveRunners: 5,
    totalMatched: 0,
    totalAvailable: 0,
    crossMatching: true,
    runnersVoidable: false,
    version: 5247561236,
    runners: [],
  },
  {
    marketName: "Winning Margin 39.5",
    marketId: "1.214006177",
    isMarketDataDelayed: true,
    status: "OPEN",
    betDelay: 0,
    bspReconciled: false,
    complete: true,
    inplay: false,
    numberOfWinners: 1,
    numberOfRunners: 5,
    numberOfActiveRunners: 5,
    totalMatched: 0,
    totalAvailable: 85,
    crossMatching: true,
    runnersVoidable: false,
    version: 5247561238,
    runners: [
      {
        selectionId: 875065,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [{ price: 2.44, size: 45 }],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 875081,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [{ price: 2, size: 40 }],
          availableToLay: [],
          tradedVolume: [],
        },
      },
    ],
  },
  {
    marketName: "Winning Margin Spread",
    marketId: "1.214006178",
    isMarketDataDelayed: true,
    status: "OPEN",
    betDelay: 0,
    bspReconciled: false,
    complete: true,
    inplay: false,
    numberOfWinners: 1,
    numberOfRunners: 9,
    numberOfActiveRunners: 9,
    totalMatched: 0,
    totalAvailable: 299.79,
    crossMatching: true,
    runnersVoidable: false,
    version: 5247561240,
    runners: [
      {
        selectionId: 9354504,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [{ price: 1.27, size: 36.22 }],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 9354505,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [{ price: 1.27, size: 36.22 }],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 9354506,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [{ price: 1.27, size: 36.22 }],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 9354507,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [{ price: 1.27, size: 36.22 }],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 9354524,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [{ price: 1.27, size: 36.22 }],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 9354525,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [],
          availableToLay: [{ price: 4.6, size: 10 }],
          tradedVolume: [],
        },
      },
      {
        selectionId: 9354526,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [{ price: 1.27, size: 36.22 }],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 9354527,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [{ price: 1.27, size: 36.22 }],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 39993,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [{ price: 1.27, size: 36.22 }],
          availableToLay: [],
          tradedVolume: [],
        },
      },
    ],
  },
  {
    marketName: "Most Disposals - Group A",
    marketId: "1.214006179",
    isMarketDataDelayed: true,
    status: "OPEN",
    betDelay: 0,
    bspReconciled: false,
    complete: true,
    inplay: false,
    numberOfWinners: 1,
    numberOfRunners: 8,
    numberOfActiveRunners: 8,
    totalMatched: 0,
    totalAvailable: 0,
    crossMatching: false,
    runnersVoidable: false,
    version: 5250275810,
    runners: [],
  },
  {
    marketName: "Handicap",
    marketId: "1.214006180",
    isMarketDataDelayed: true,
    status: "OPEN",
    betDelay: 0,
    bspReconciled: false,
    complete: true,
    inplay: false,
    numberOfWinners: 0,
    numberOfRunners: 400,
    numberOfActiveRunners: 400,
    lastMatchTime: "2023-05-19T00:00:10.864Z",
    totalMatched: 24283.74,
    totalAvailable: 9377.52,
    crossMatching: true,
    runnersVoidable: false,
    version: 5247561244,
    runners: [
      {
        selectionId: 39992,
        handicap: 4.5,
        status: "ACTIVE",
        lastPriceTraded: 2.2,
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 2.08, size: 154.9 },
            { price: 2.06, size: 113.81 },
          ],
          availableToLay: [{ price: 2.22, size: 830.35 }],
          tradedVolume: [],
        },
      },
      {
        selectionId: 39988,
        handicap: -4.5,
        status: "ACTIVE",
        lastPriceTraded: 1.84,
        totalMatched: 0,
        ex: {
          availableToBack: [{ price: 1.82, size: 1012.85 }],
          availableToLay: [
            { price: 1.93, size: 166.94 },
            { price: 1.95, size: 120.23 },
          ],
          tradedVolume: [],
        },
      },
      {
        selectionId: 39988,
        handicap: -6.5,
        status: "ACTIVE",
        lastPriceTraded: 1.85,
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 1.8, size: 113.81 },
            { price: 1.79, size: 156.38 },
          ],
          availableToLay: [{ price: 2.06, size: 109.39 }],
          tradedVolume: [],
        },
      },
      {
        selectionId: 39992,
        handicap: 7.5,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 1.88, size: 113.81 },
            { price: 1.87, size: 88.21 },
          ],
          availableToLay: [
            { price: 2.14, size: 99.98 },
            { price: 2.16, size: 76.37 },
          ],
          tradedVolume: [],
        },
      },
      {
        selectionId: 39988,
        handicap: -7.5,
        status: "ACTIVE",
        lastPriceTraded: 1.9,
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 1.88, size: 113.81 },
            { price: 1.87, size: 88.21 },
          ],
          availableToLay: [
            { price: 2.14, size: 99.98 },
            { price: 2.16, size: 76.37 },
          ],
          tradedVolume: [],
        },
      },
      {
        selectionId: 39992,
        handicap: 9.5,
        status: "ACTIVE",
        lastPriceTraded: 2,
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 1.83, size: 60 },
            { price: 1.81, size: 62 },
          ],
          availableToLay: [
            { price: 1.97, size: 1035.53 },
            { price: 2.22, size: 49.82 },
            { price: 2.24, size: 50.1 },
          ],
          tradedVolume: [],
        },
      },
      {
        selectionId: 39988,
        handicap: -9.5,
        status: "ACTIVE",
        lastPriceTraded: 2,
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 2.04, size: 1000 },
            { price: 1.83, size: 60 },
            { price: 1.81, size: 62 },
          ],
          availableToLay: [
            { price: 2.22, size: 49.82 },
            { price: 2.24, size: 50.1 },
          ],
          tradedVolume: [],
        },
      },
      {
        selectionId: 39992,
        handicap: 10.5,
        status: "ACTIVE",
        lastPriceTraded: 1.83,
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 1.69, size: 268.37 },
            { price: 1.68, size: 113.81 },
          ],
          availableToLay: [
            { price: 1.91, size: 1227.66 },
            { price: 1.92, size: 45 },
          ],
          tradedVolume: [],
        },
      },
      {
        selectionId: 39988,
        handicap: -10.5,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 2.1, size: 1000 },
            { price: 2.08, size: 159.24 },
          ],
          availableToLay: [
            { price: 2.46, size: 184.37 },
            { price: 2.48, size: 77.1 },
          ],
          tradedVolume: [],
        },
      },
      {
        selectionId: 39988,
        handicap: -11.5,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [{ price: 2.18, size: 113.81 }],
          availableToLay: [
            { price: 2.6, size: 97.76 },
            { price: 2.64, size: 75.65 },
          ],
          tradedVolume: [],
        },
      },
    ],
    keyLineDescription: {
      keyLine: [
        { selectionId: 39992, handicap: 7.5 },
        { selectionId: 39988, handicap: -7.5 },
      ],
    },
  },
  {
    marketName: "Total Points",
    marketId: "1.214006381",
    isMarketDataDelayed: true,
    status: "OPEN",
    betDelay: 0,
    bspReconciled: false,
    complete: true,
    inplay: false,
    numberOfWinners: 0,
    numberOfRunners: 482,
    numberOfActiveRunners: 482,
    lastMatchTime: "2023-05-19T00:01:33.866Z",
    totalMatched: 200,
    totalAvailable: 1733.51,
    crossMatching: true,
    runnersVoidable: false,
    version: 5247561646,
    runners: [
      {
        selectionId: 8435233,
        handicap: 160.5,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [{ price: 1.01, size: 100 }],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 8435232,
        handicap: 160.5,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [{ price: 1.01, size: 100 }],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 8435233,
        handicap: 172.5,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 1.9, size: 166.27 },
            { price: 1.89, size: 112 },
            { price: 1.84, size: 119 },
          ],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 8435232,
        handicap: 172.5,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 1.88, size: 128.94 },
            { price: 1.83, size: 120 },
            { price: 1.78, size: 154 },
          ],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 8435233,
        handicap: 173.5,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [{ price: 1.87, size: 88.21 }],
          availableToLay: [{ price: 2.16, size: 89.67 }],
          tradedVolume: [],
        },
      },
      {
        selectionId: 8435232,
        handicap: 173.5,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [{ price: 1.87, size: 103.06 }],
          availableToLay: [{ price: 2.16, size: 76.37 }],
          tradedVolume: [],
        },
      },
    ],
    keyLineDescription: {
      keyLine: [
        { selectionId: 8435232, handicap: 173.5 },
        { selectionId: 8435233, handicap: 173.5 },
      ],
    },
  },
  {
    marketName: "Most Disposals - Group B",
    marketId: "1.214006627",
    isMarketDataDelayed: true,
    status: "OPEN",
    betDelay: 0,
    bspReconciled: false,
    complete: true,
    inplay: false,
    numberOfWinners: 1,
    numberOfRunners: 8,
    numberOfActiveRunners: 8,
    totalMatched: 0,
    totalAvailable: 0,
    crossMatching: false,
    runnersVoidable: false,
    version: 5250275804,
    runners: [],
  },
  {
    marketName: "20 Disposals or More",
    marketId: "1.214006633",
    isMarketDataDelayed: true,
    status: "OPEN",
    betDelay: 0,
    bspReconciled: false,
    complete: false,
    inplay: false,
    numberOfWinners: 0,
    numberOfRunners: 21,
    numberOfActiveRunners: 21,
    totalMatched: 0,
    totalAvailable: 5866.44,
    crossMatching: false,
    runnersVoidable: false,
    version: 5250275802,
    runners: [
      {
        selectionId: 16630853,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 1.1, size: 719.03 },
            { price: 1.06, size: 1100.12 },
          ],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 13076897,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 1.26, size: 268 },
            { price: 1.22, size: 314.32 },
          ],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 7196959,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 1.26, size: 257.24 },
            { price: 1.22, size: 300.03 },
          ],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 27123771,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 1.42, size: 160.56 },
            { price: 1.38, size: 178.4 },
          ],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 5621060,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 1.52, size: 131.01 },
            { price: 1.46, size: 143.5 },
          ],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 12440324,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 1.52, size: 128.39 },
            { price: 1.48, size: 140.44 },
          ],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 39057247,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 1.58, size: 155.61 },
            { price: 1.52, size: 169.25 },
          ],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 23199474,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 1.72, size: 123.99 },
            { price: 1.66, size: 133.34 },
          ],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 37484994,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 2.22, size: 73.05 },
            { price: 2.08, size: 81.49 },
          ],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 5821057,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 2.26, size: 70.57 },
            { price: 2.12, size: 78.58 },
          ],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 23199473,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 2.32, size: 67.14 },
            { price: 2.18, size: 74.59 },
          ],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 6146431,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 2.4, size: 80.15 },
            { price: 2.26, size: 88.81 },
          ],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 8072096,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 2.66, size: 67.28 },
            { price: 2.5, size: 74.01 },
          ],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 23184806,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 2.76, size: 63.22 },
            { price: 2.6, size: 69.39 },
          ],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 27123031,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 2.82, size: 61.37 },
            { price: 2.66, size: 67.28 },
          ],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 13226966,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 3.6, size: 43.11 },
            { price: 3.3, size: 49.34 },
          ],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 7279075,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 3.9, size: 38.95 },
            { price: 3.5, size: 44.4 },
          ],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 13336671,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 4.4, size: 32.65 },
            { price: 4, size: 37 },
          ],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 14746476,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 4.8, size: 29.76 },
            { price: 4.3, size: 33.64 },
          ],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 43947673,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 4.9, size: 28.91 },
            { price: 4.4, size: 32.65 },
          ],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 27957647,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 5.3, size: 26.27 },
            { price: 4.8, size: 29.6 },
          ],
          availableToLay: [],
          tradedVolume: [],
        },
      },
    ],
  },
  {
    marketName: "25 Disposals or More",
    marketId: "1.214006634",
    isMarketDataDelayed: true,
    status: "OPEN",
    betDelay: 0,
    bspReconciled: false,
    complete: false,
    inplay: false,
    numberOfWinners: 0,
    numberOfRunners: 10,
    numberOfActiveRunners: 10,
    totalMatched: 0,
    totalAvailable: 1834.81,
    crossMatching: false,
    runnersVoidable: false,
    version: 5250275800,
    runners: [
      {
        selectionId: 27123032,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 1.32, size: 214.24 },
            { price: 1.28, size: 244.47 },
          ],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 16630853,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 1.38, size: 178.45 },
            { price: 1.34, size: 200.02 },
          ],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 13076897,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 2.04, size: 85.02 },
            { price: 1.92, size: 95.66 },
          ],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 7196959,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 2.08, size: 81.67 },
            { price: 1.96, size: 91.68 },
          ],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 27123771,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 2.34, size: 83.34 },
            { price: 2.2, size: 92.51 },
          ],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 12440324,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 2.66, size: 67.28 },
            { price: 2.5, size: 74.01 },
          ],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 5621060,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 3.4, size: 47.14 },
            { price: 3.1, size: 54.16 },
          ],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 39057247,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 3.6, size: 43.11 },
            { price: 3.3, size: 49.34 },
          ],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 23199474,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 4.2, size: 34.91 },
            { price: 3.8, size: 39.64 },
          ],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 37484994,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 5.1, size: 27.34 },
            { price: 4.6, size: 30.83 },
          ],
          availableToLay: [],
          tradedVolume: [],
        },
      },
    ],
  },
  {
    marketName: "30 Disposals or More",
    marketId: "1.214006635",
    isMarketDataDelayed: true,
    status: "OPEN",
    betDelay: 0,
    bspReconciled: false,
    complete: false,
    inplay: false,
    numberOfWinners: 0,
    numberOfRunners: 6,
    numberOfActiveRunners: 6,
    totalMatched: 0,
    totalAvailable: 576.64,
    crossMatching: false,
    runnersVoidable: false,
    version: 5250275806,
    runners: [
      {
        selectionId: 27123032,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 2.12, size: 79.33 },
            { price: 2, size: 88.9 },
          ],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 16630853,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 2.22, size: 73.05 },
            { price: 2.08, size: 81.49 },
          ],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 7196959,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 4.4, size: 32.65 },
            { price: 4, size: 37 },
          ],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 13076897,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 4.4, size: 32.65 },
            { price: 4, size: 37 },
          ],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 27123771,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 4.8, size: 29.76 },
            { price: 4.3, size: 33.64 },
          ],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 12440324,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 5.7, size: 24.08 },
            { price: 5.1, size: 27.07 },
          ],
          availableToLay: [],
          tradedVolume: [],
        },
      },
    ],
  },
  {
    marketName: "Total Points Line",
    marketId: "1.214006636",
    isMarketDataDelayed: true,
    status: "OPEN",
    betDelay: 0,
    bspReconciled: false,
    complete: true,
    inplay: false,
    numberOfWinners: 0,
    numberOfRunners: 1,
    numberOfActiveRunners: 1,
    totalMatched: 0,
    totalAvailable: 136.55,
    crossMatching: false,
    runnersVoidable: false,
    version: 5247562156,
    runners: [
      {
        selectionId: 40875,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [{ price: 48, size: 136.56 }],
          availableToLay: [],
          tradedVolume: [],
        },
      },
    ],
  },
  {
    marketName: "15 Disposals or More",
    marketId: "1.214006637",
    isMarketDataDelayed: true,
    status: "OPEN",
    betDelay: 0,
    bspReconciled: false,
    complete: false,
    inplay: false,
    numberOfWinners: 0,
    numberOfRunners: 35,
    numberOfActiveRunners: 35,
    totalMatched: 0,
    totalAvailable: 13802.12,
    crossMatching: false,
    runnersVoidable: false,
    version: 5250275798,
    runners: [
      {
        selectionId: 5621060,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 1.1, size: 719.03 },
            { price: 1.06, size: 1100.12 },
          ],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 39057247,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 1.12, size: 646.5 },
            { price: 1.08, size: 942.96 },
          ],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 27123771,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 1.12, size: 587.25 },
            { price: 1.08, size: 825.09 },
          ],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 23199474,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 1.14, size: 496.29 },
            { price: 1.1, size: 660.07 },
          ],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 12440324,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 1.16, size: 460.62 },
            { price: 1.12, size: 600.06 },
          ],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 23199473,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 1.26, size: 257.24 },
            { price: 1.22, size: 300.03 },
          ],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 6146431,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 1.28, size: 238.13 },
            { price: 1.24, size: 275.03 },
          ],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 23184806,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 1.32, size: 207.31 },
            { price: 1.28, size: 235.74 },
          ],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 37484994,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 1.34, size: 194.71 },
            { price: 1.3, size: 220.02 },
          ],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 8072096,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 1.36, size: 183.56 },
            { price: 1.32, size: 206.27 },
          ],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 5821057,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 1.38, size: 178.45 },
            { price: 1.34, size: 200.02 },
          ],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 7279075,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 1.58, size: 152.82 },
            { price: 1.54, size: 166.06 },
          ],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 27123031,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 1.62, size: 145.04 },
            { price: 1.56, size: 157.16 },
          ],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 13336671,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 1.66, size: 133.69 },
            { price: 1.62, size: 144.28 },
          ],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 13226966,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 1.66, size: 133.69 },
            { price: 1.62, size: 144.28 },
          ],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 27957647,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 1.72, size: 123.99 },
            { price: 1.66, size: 133.34 },
          ],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 14746476,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 1.74, size: 120.49 },
            { price: 1.68, size: 129.42 },
          ],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 43947673,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 1.76, size: 118.82 },
            { price: 1.7, size: 127.55 },
          ],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 41859360,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 1.98, size: 91.58 },
            { price: 1.86, size: 103.54 },
          ],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 13049516,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 2.06, size: 84.16 },
            { price: 1.94, size: 94.63 },
          ],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 10646048,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 2.22, size: 73.05 },
            { price: 2.08, size: 81.49 },
          ],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 8818704,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 2.28, size: 68.81 },
            { price: 2.16, size: 76.53 },
          ],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 19651142,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 2.32, size: 67.14 },
            { price: 2.18, size: 74.59 },
          ],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 25207396,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 2.44, size: 77.2 },
            { price: 2.3, size: 85.39 },
          ],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 2379345,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 2.44, size: 77.2 },
            { price: 2.3, size: 85.39 },
          ],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 28037126,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 2.66, size: 67.28 },
            { price: 2.5, size: 74.01 },
          ],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 23736959,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 2.72, size: 65.19 },
            { price: 2.56, size: 71.62 },
          ],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 17654140,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 2.82, size: 61.37 },
            { price: 2.66, size: 67.28 },
          ],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 13381134,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 3.4, size: 47.14 },
            { price: 3.1, size: 54.16 },
          ],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 39942863,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 3.5, size: 46.06 },
            { price: 3.1, size: 52.87 },
          ],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 11828449,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 3.6, size: 44.05 },
            { price: 3.2, size: 50.46 },
          ],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 3955520,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 3.6, size: 44.05 },
            { price: 3.2, size: 50.46 },
          ],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 17796622,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 4.2, size: 34.91 },
            { price: 3.8, size: 39.64 },
          ],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 18834071,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 4.3, size: 33.74 },
            { price: 3.9, size: 38.28 },
          ],
          availableToLay: [],
          tradedVolume: [],
        },
      },
      {
        selectionId: 10156306,
        handicap: 0,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 5.4, size: 25.28 },
            { price: 4.9, size: 28.46 },
          ],
          availableToLay: [],
          tradedVolume: [],
        },
      },
    ],
  },
];

// Testing
const sport = "basketball_nba";
// Temporary caching while we get system working
let cachedRes: undefined | (Map<string, object> | undefined)[];

server.get("/", async (request, reply) => {
  return "SERVER HEALTHY";
});

const apiKey = process.env.ODDS_API_KEY;
const regions = "au";
const oddsFormat = "decimal";
const dateFormat = "iso";
const markets = "h2h,spreads";

server.get("/nba/data", async (request, reply) => {
  console.log("SENDING it");
  try {
    // if (!cachedRes) {
    // console.log("Hitting endpoint");
    // const response = await axios.get(
    //   "https://api.the-odds-api.com/v4/sports/basketball_nba/odds",
    //   {
    //     params: {
    //       apiKey,
    //       regions,
    //       markets,
    //       oddsFormat,
    //       dateFormat,
    //     },
    //   }
    // );
    // cachedRes = response.data;
    // handleData(response.data);
    // handleData(d);
    // return reply.status(200).send(response.data);

    // if (!cachedRes) {
    cachedRes = await loginBetfair();
    // } else {
    // doShitWithRes(d);
    // }

    return reply.status(200).send(JSON.stringify(d));
  } catch (error: any) {
    console.log("Error status", error.response.status);
    reply.status(error.response.status).send(error.response.data);
  }
});

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});

const handleData = (data: OddsApi[]) => {
  const betfairDataMap: Map<string, Bookmaker> = new Map();

  // Extract betfair data for comparison - needed to find +EV
  data?.map((x) => {
    let newData = {
      id: x?.id,
      betfair: {} as Bookmaker,
    };

    newData.betfair =
      x?.bookmakers.find((z) => z?.key === "betfair") ?? ({} as Bookmaker);
    betfairDataMap.set(newData.id, newData.betfair);
  });

  // Search for +EV bet
  const positiveExpectedValueLegs: any = [];

  // Compare to find +EV bets
  data.map((event: OddsApi) => {
    const betfairOdds = betfairDataMap.get(event.id);

    event.bookmakers.map((bookie) => {
      const { key, title, last_update } = bookie;
      if (bookie.key !== "betfair") {
        bookie.markets.map((oddsApi) => {
          if (oddsApi.key === "h2h") {
            positiveExpectedValueLegs.push(
              ...getH2HPositiveExpectedValues(
                oddsApi,
                betfairOdds,
                event,
                bookie.key
              )
            );
          }
          // if (oddsApi.key === "spreads") {
          //   positiveExpectedValueLegs.push(
          //     ...getSpreadsPositiveExpectedValues(oddsApi, betfairOdds, event)
          //   );
          // }
          // TODO: Add 'spreads' seperate logic here
        });
      }
    });
  });
  console.log("positiveExpectedValueLegs", positiveExpectedValueLegs);
};

const getExpectedValue = (bookieOdds: number, fairOdds: number) => {
  // Stake amount = $10 for testing
  const stake = 10;
  const winProbability = 1 / fairOdds;
  const winOutcome = (bookieOdds * stake - stake) * winProbability;
  const loseProbability = 1 - winProbability;
  const loseOutcome = loseProbability * stake;

  return winOutcome - loseOutcome;
};

const prettyConsole = (title: string, x: string | number) => {
  console.log(
    "================================================================"
  );
  console.log(title, ": ", x);
  console.log(
    "================================================================"
  );
};

const getH2HPositiveExpectedValues = (
  oddsApi: OddsApiH2HMarket,
  betfairOdds: Bookmaker | undefined,
  event: OddsApi,
  bookieKey: string
): any[] => {
  let oddsApiPositiveEVH2HOutcomes = oddsApi.outcomes.map(
    (outcome: H2HMarketOdds, index: number) => {
      let betMarket = betfairOdds?.markets?.[0];
      let layMarket = betfairOdds?.markets?.[1];

      let fairOdds =
        ((betMarket?.outcomes?.[index]?.price ?? 0) +
          (layMarket?.outcomes?.[index]?.price ?? 0)) /
        2;

      // defensive code?
      if (!fairOdds) return;

      const odds = outcome.price;
      // Team 1 first in map iteration, then team 2
      const ev = getExpectedValue(odds, fairOdds);

      if (ev > 0) {
        return {
          eventName: event.sport_title,
          homeTeam: event.home_team,
          awayTeam: event.away_team,
          expectedValue: ev,
          betOn: outcome.name,
          bookie: bookieKey,
          odds,
          fairOdds: fairOdds,
        };
      }
    }
  );
  // Add filter here to remove any falsy values (such as undefined)
  return oddsApiPositiveEVH2HOutcomes.filter(Boolean);
};

// TODO
// Add bet spreads +/- the closest spread for other +EV bets
