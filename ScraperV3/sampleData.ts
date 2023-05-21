export const d = [
  {
    marketName: "Match Odds",
    marketId: "1.214414482",
    isMarketDataDelayed: true,
    status: "OPEN",
    betDelay: 0,
    bspReconciled: false,
    complete: true,
    inplay: false,
    numberOfWinners: 1,
    numberOfRunners: 2,
    numberOfActiveRunners: 2,
    lastMatchTime: "2023-05-21T09:08:11.981Z",
    totalMatched: 1358.5,
    totalAvailable: 3339.56,
    crossMatching: true,
    runnersVoidable: false,
    version: 5251180153,
    runners: [
      {
        selectionId: 298609,
        handicap: 0,
        status: "ACTIVE",
        lastPriceTraded: 1.35,
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 1.29, size: 34.11 },
            { price: 1.27, size: 463.19 },
            { price: 1.21, size: 428.57 },
          ],
          availableToLay: [
            { price: 1.35, size: 72.34 },
            { price: 1.4, size: 50 },
            { price: 1.5, size: 123.59 },
          ],
          tradedVolume: [],
        },
      },
      {
        selectionId: 39992,
        handicap: 0,
        status: "ACTIVE",
        lastPriceTraded: 3.9,
        totalMatched: 0,
        ex: {
          availableToBack: [
            { price: 3.9, size: 25.04 },
            { price: 3.5, size: 20 },
            { price: 3, size: 61.8 },
          ],
          availableToLay: [
            { price: 4.8, size: 132.55 },
            { price: 5.8, size: 89.41 },
            { price: 6.4, size: 108.63 },
          ],
          tradedVolume: [],
        },
      },
    ],
    eventName: "Melbourne v Fremantle",
  },
  {
    marketName: "Handicap",
    marketId: "1.214414494",
    isMarketDataDelayed: true,
    status: "OPEN",
    betDelay: 0,
    bspReconciled: false,
    complete: true,
    inplay: false,
    numberOfWinners: 0,
    numberOfRunners: 400,
    numberOfActiveRunners: 400,
    lastMatchTime: "2023-05-21T02:51:49.121Z",
    totalMatched: 143.99,
    totalAvailable: 267.33,
    crossMatching: true,
    runnersVoidable: false,
    version: 5251180155,
    runners: [
      {
        selectionId: 298609,
        handicap: -20.5,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [{ price: 1.86, size: 72.13 }],
          availableToLay: [{ price: 2.18, size: 61.54 }],
          tradedVolume: [],
        },
      },
      {
        selectionId: 39992,
        handicap: 20.5,
        status: "ACTIVE",
        totalMatched: 0,
        ex: {
          availableToBack: [{ price: 1.86, size: 72.13 }],
          availableToLay: [{ price: 2.18, size: 61.54 }],
          tradedVolume: [],
        },
      },
    ],
    keyLineDescription: {
      keyLine: [
        { selectionId: 298609, handicap: -20.5 },
        { selectionId: 39992, handicap: 20.5 },
      ],
    },
    eventName: "Melbourne v Fremantle",
  },
];

export const oddsApi = [
  {
    id: "0f1f9d6080c9d8a40668a86ebb10824b",
    sport_key: "aussierules_afl",
    sport_title: "AFL",
    commence_time: "2023-05-21T06:40:26Z",
    home_team: "Greater Western Sydney Giants",
    away_team: "St Kilda Saints",
    bookmakers: [
      {
        key: "betfair",
        title: "Betfair",
        last_update: "2023-05-21T09:11:54Z",
        markets: [
          {
            key: "h2h",
            last_update: "2023-05-21T09:11:54Z",
            outcomes: [
              { name: "Greater Western Sydney Giants", price: 2.22 },
              { name: "St Kilda Saints", price: 1.25 },
            ],
          },
          {
            key: "h2h_lay",
            last_update: "2023-05-21T09:11:54Z",
            outcomes: [
              { name: "Greater Western Sydney Giants", price: 5 },
              { name: "St Kilda Saints", price: 1.67 },
            ],
          },
        ],
      },
      {
        key: "tab",
        title: "TAB",
        last_update: "2023-05-21T09:11:50Z",
        markets: [
          {
            key: "h2h",
            last_update: "2023-05-21T09:11:50Z",
            outcomes: [
              { name: "Greater Western Sydney Giants", price: 6 },
              { name: "St Kilda Saints", price: 1.1 },
            ],
          },
        ],
      },
      {
        key: "pointsbetau",
        title: "PointsBet (AU)",
        last_update: "2023-05-21T09:11:50Z",
        markets: [
          {
            key: "h2h",
            last_update: "2023-05-21T09:11:50Z",
            outcomes: [
              { name: "Greater Western Sydney Giants", price: 9.5 },
              { name: "St Kilda Saints", price: 1.06 },
            ],
          },
        ],
      },
      {
        key: "unibet",
        title: "Unibet",
        last_update: "2023-05-21T09:11:48Z",
        markets: [
          {
            key: "h2h",
            last_update: "2023-05-21T09:11:48Z",
            outcomes: [
              { name: "Greater Western Sydney Giants", price: 6 },
              { name: "St Kilda Saints", price: 1.13 },
            ],
          },
          {
            key: "spreads",
            last_update: "2023-05-21T09:11:48Z",
            outcomes: [
              {
                name: "Greater Western Sydney Giants",
                price: 1.82,
                point: 10.5,
              },
              { name: "St Kilda Saints", price: 1.94, point: -10.5 },
            ],
          },
        ],
      },
      {
        key: "betr_au",
        title: "Betr",
        last_update: "2023-05-21T09:11:42Z",
        markets: [
          {
            key: "h2h",
            last_update: "2023-05-21T09:11:42Z",
            outcomes: [
              { name: "Greater Western Sydney Giants", price: 10 },
              { name: "St Kilda Saints", price: 1.05 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "fe469f0ae22e04efe482a23af5c6f549",
    sport_key: "aussierules_afl",
    sport_title: "AFL",
    commence_time: "2023-05-27T04:10:00Z",
    home_team: "Melbourne Demons",
    away_team: "Fremantle Dockers",
    bookmakers: [
      {
        key: "unibet",
        title: "Unibet",
        last_update: "2023-05-21T09:11:48Z",
        markets: [
          {
            key: "h2h",
            last_update: "2023-05-21T09:11:48Z",
            outcomes: [
              { name: "Fremantle Dockers", price: 3.8 },
              { name: "Melbourne Demons", price: 1.25 },
            ],
          },
          {
            key: "spreads",
            last_update: "2023-05-21T09:11:48Z",
            outcomes: [
              { name: "Fremantle Dockers", price: 1.9, point: 24.5 },
              { name: "Melbourne Demons", price: 1.9, point: -24.5 },
            ],
          },
        ],
      },
      {
        key: "ladbrokes",
        title: "Ladbrokes",
        last_update: "2023-05-21T09:11:50Z",
        markets: [
          {
            key: "h2h",
            last_update: "2023-05-21T09:11:50Z",
            outcomes: [
              { name: "Fremantle Dockers", price: 3.8 },
              { name: "Melbourne Demons", price: 1.26 },
            ],
          },
        ],
      },
      {
        key: "bluebet",
        title: "BlueBet",
        last_update: "2023-05-21T09:11:52Z",
        markets: [
          {
            key: "h2h",
            last_update: "2023-05-21T09:11:52Z",
            outcomes: [
              { name: "Fremantle Dockers", price: 3.8 },
              { name: "Melbourne Demons", price: 1.24 },
            ],
          },
        ],
      },
      {
        key: "pointsbetau",
        title: "PointsBet (AU)",
        last_update: "2023-05-21T09:11:50Z",
        markets: [
          {
            key: "h2h",
            last_update: "2023-05-21T09:11:50Z",
            outcomes: [
              { name: "Fremantle Dockers", price: 3.5 },
              { name: "Melbourne Demons", price: 1.3 },
            ],
          },
        ],
      },
      {
        key: "tab",
        title: "TAB",
        last_update: "2023-05-21T09:11:50Z",
        markets: [
          {
            key: "h2h",
            last_update: "2023-05-21T09:11:50Z",
            outcomes: [
              { name: "Fremantle Dockers", price: 3.75 },
              { name: "Melbourne Demons", price: 1.27 },
            ],
          },
          {
            key: "spreads",
            last_update: "2023-05-21T09:11:50Z",
            outcomes: [
              { name: "Fremantle Dockers", price: 1.9, point: 22.5 },
              { name: "Melbourne Demons", price: 1.9, point: -22.5 },
            ],
          },
        ],
      },
      {
        key: "neds",
        title: "Neds",
        last_update: "2023-05-21T09:12:00Z",
        markets: [
          {
            key: "h2h",
            last_update: "2023-05-21T09:12:00Z",
            outcomes: [
              { name: "Fremantle Dockers", price: 3.8 },
              { name: "Melbourne Demons", price: 1.26 },
            ],
          },
        ],
      },
      {
        key: "betfair",
        title: "Betfair",
        last_update: "2023-05-21T09:11:54Z",
        markets: [
          {
            key: "h2h",
            last_update: "2023-05-21T09:11:54Z",
            outcomes: [
              { name: "Fremantle Dockers", price: 3.5 },
              { name: "Melbourne Demons", price: 1.27 },
            ],
          },
          {
            key: "h2h_lay",
            last_update: "2023-05-21T09:11:54Z",
            outcomes: [
              { name: "Fremantle Dockers", price: 4.8 },
              { name: "Melbourne Demons", price: 1.35 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "573e0704c24928ed9741e5ca8dee5a0d",
    sport_key: "aussierules_afl",
    sport_title: "AFL",
    commence_time: "2023-05-27T09:25:00Z",
    home_team: "Gold Coast Suns",
    away_team: "Western Bulldogs",
    bookmakers: [
      {
        key: "unibet",
        title: "Unibet",
        last_update: "2023-05-21T09:11:48Z",
        markets: [
          {
            key: "h2h",
            last_update: "2023-05-21T09:11:48Z",
            outcomes: [
              { name: "Gold Coast Suns", price: 2.3 },
              { name: "Western Bulldogs", price: 1.62 },
            ],
          },
          {
            key: "spreads",
            last_update: "2023-05-21T09:11:48Z",
            outcomes: [
              { name: "Gold Coast Suns", price: 1.9, point: 7.5 },
              { name: "Western Bulldogs", price: 1.9, point: -7.5 },
            ],
          },
        ],
      },
      {
        key: "betfair",
        title: "Betfair",
        last_update: "2023-05-21T09:11:54Z",
        markets: [
          {
            key: "h2h",
            last_update: "2023-05-21T09:11:54Z",
            outcomes: [
              { name: "Gold Coast Suns", price: 2.36 },
              { name: "Western Bulldogs", price: 1.69 },
            ],
          },
          {
            key: "h2h_lay",
            last_update: "2023-05-21T09:11:54Z",
            outcomes: [
              { name: "Gold Coast Suns", price: 2.64 },
              { name: "Western Bulldogs", price: 1.72 },
            ],
          },
        ],
      },
      {
        key: "tab",
        title: "TAB",
        last_update: "2023-05-21T09:11:50Z",
        markets: [
          {
            key: "h2h",
            last_update: "2023-05-21T09:11:50Z",
            outcomes: [
              { name: "Gold Coast Suns", price: 2.25 },
              { name: "Western Bulldogs", price: 1.65 },
            ],
          },
          {
            key: "spreads",
            last_update: "2023-05-21T09:11:50Z",
            outcomes: [
              { name: "Gold Coast Suns", price: 1.95, point: 6.5 },
              { name: "Western Bulldogs", price: 1.85, point: -6.5 },
            ],
          },
        ],
      },
      {
        key: "ladbrokes",
        title: "Ladbrokes",
        last_update: "2023-05-21T09:11:50Z",
        markets: [
          {
            key: "h2h",
            last_update: "2023-05-21T09:11:50Z",
            outcomes: [
              { name: "Gold Coast Suns", price: 2.2 },
              { name: "Western Bulldogs", price: 1.68 },
            ],
          },
        ],
      },
      {
        key: "bluebet",
        title: "BlueBet",
        last_update: "2023-05-21T09:11:52Z",
        markets: [
          {
            key: "h2h",
            last_update: "2023-05-21T09:11:52Z",
            outcomes: [
              { name: "Gold Coast Suns", price: 2.25 },
              { name: "Western Bulldogs", price: 1.65 },
            ],
          },
        ],
      },
      {
        key: "pointsbetau",
        title: "PointsBet (AU)",
        last_update: "2023-05-21T09:11:50Z",
        markets: [
          {
            key: "h2h",
            last_update: "2023-05-21T09:11:50Z",
            outcomes: [
              { name: "Gold Coast Suns", price: 2.3 },
              { name: "Western Bulldogs", price: 1.62 },
            ],
          },
        ],
      },
      {
        key: "neds",
        title: "Neds",
        last_update: "2023-05-21T09:12:00Z",
        markets: [
          {
            key: "h2h",
            last_update: "2023-05-21T09:12:00Z",
            outcomes: [
              { name: "Gold Coast Suns", price: 2.2 },
              { name: "Western Bulldogs", price: 1.68 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "28c2b814ca72327061bf474c61fec359",
    sport_key: "aussierules_afl",
    sport_title: "AFL",
    commence_time: "2023-05-28T03:10:00Z",
    home_team: "Richmond Tigers",
    away_team: "Port Adelaide Power",
    bookmakers: [
      {
        key: "unibet",
        title: "Unibet",
        last_update: "2023-05-21T09:11:48Z",
        markets: [
          {
            key: "h2h",
            last_update: "2023-05-21T09:11:48Z",
            outcomes: [
              { name: "Port Adelaide Power", price: 1.79 },
              { name: "Richmond Tigers", price: 2.02 },
            ],
          },
          {
            key: "spreads",
            last_update: "2023-05-21T09:11:48Z",
            outcomes: [
              { name: "Port Adelaide Power", price: 1.9, point: -2.5 },
              { name: "Richmond Tigers", price: 1.9, point: 2.5 },
            ],
          },
        ],
      },
      {
        key: "ladbrokes",
        title: "Ladbrokes",
        last_update: "2023-05-21T09:11:50Z",
        markets: [
          {
            key: "h2h",
            last_update: "2023-05-21T09:11:50Z",
            outcomes: [
              { name: "Port Adelaide Power", price: 1.75 },
              { name: "Richmond Tigers", price: 2.05 },
            ],
          },
        ],
      },
      {
        key: "tab",
        title: "TAB",
        last_update: "2023-05-21T09:11:50Z",
        markets: [
          {
            key: "h2h",
            last_update: "2023-05-21T09:11:50Z",
            outcomes: [
              { name: "Port Adelaide Power", price: 1.77 },
              { name: "Richmond Tigers", price: 2.05 },
            ],
          },
          {
            key: "spreads",
            last_update: "2023-05-21T09:11:50Z",
            outcomes: [
              { name: "Port Adelaide Power", price: 1.9, point: -2.5 },
              { name: "Richmond Tigers", price: 1.9, point: 2.5 },
            ],
          },
        ],
      },
      {
        key: "bluebet",
        title: "BlueBet",
        last_update: "2023-05-21T09:11:52Z",
        markets: [
          {
            key: "h2h",
            last_update: "2023-05-21T09:11:52Z",
            outcomes: [
              { name: "Port Adelaide Power", price: 1.8 },
              { name: "Richmond Tigers", price: 2 },
            ],
          },
        ],
      },
      {
        key: "pointsbetau",
        title: "PointsBet (AU)",
        last_update: "2023-05-21T09:11:50Z",
        markets: [
          {
            key: "h2h",
            last_update: "2023-05-21T09:11:50Z",
            outcomes: [
              { name: "Port Adelaide Power", price: 1.77 },
              { name: "Richmond Tigers", price: 2.05 },
            ],
          },
        ],
      },
      {
        key: "neds",
        title: "Neds",
        last_update: "2023-05-21T09:12:00Z",
        markets: [
          {
            key: "h2h",
            last_update: "2023-05-21T09:12:00Z",
            outcomes: [
              { name: "Port Adelaide Power", price: 1.75 },
              { name: "Richmond Tigers", price: 2.05 },
            ],
          },
        ],
      },
      {
        key: "betfair",
        title: "Betfair",
        last_update: "2023-05-21T09:11:54Z",
        markets: [
          {
            key: "h2h",
            last_update: "2023-05-21T09:11:54Z",
            outcomes: [
              { name: "Port Adelaide Power", price: 1.94 },
              { name: "Richmond Tigers", price: 1.97 },
            ],
          },
          {
            key: "h2h_lay",
            last_update: "2023-05-21T09:11:54Z",
            outcomes: [
              { name: "Port Adelaide Power", price: 2.04 },
              { name: "Richmond Tigers", price: 2.08 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "e55d4ebc711c3e1fab2d2d4b615861e7",
    sport_key: "aussierules_afl",
    sport_title: "AFL",
    commence_time: "2023-05-28T06:40:00Z",
    home_team: "Adelaide Crows",
    away_team: "Brisbane Lions",
    bookmakers: [
      {
        key: "unibet",
        title: "Unibet",
        last_update: "2023-05-21T09:11:48Z",
        markets: [
          {
            key: "h2h",
            last_update: "2023-05-21T09:11:48Z",
            outcomes: [
              { name: "Adelaide Crows", price: 2 },
              { name: "Brisbane Lions", price: 1.81 },
            ],
          },
          {
            key: "spreads",
            last_update: "2023-05-21T09:11:48Z",
            outcomes: [
              { name: "Adelaide Crows", price: 1.9, point: 2.5 },
              { name: "Brisbane Lions", price: 1.9, point: -2.5 },
            ],
          },
        ],
      },
      {
        key: "betfair",
        title: "Betfair",
        last_update: "2023-05-21T09:11:54Z",
        markets: [
          {
            key: "h2h",
            last_update: "2023-05-21T09:11:54Z",
            outcomes: [
              { name: "Adelaide Crows", price: 2.1 },
              { name: "Brisbane Lions", price: 1.79 },
            ],
          },
          {
            key: "h2h_lay",
            last_update: "2023-05-21T09:11:54Z",
            outcomes: [
              { name: "Adelaide Crows", price: 2.28 },
              { name: "Brisbane Lions", price: 1.9 },
            ],
          },
        ],
      },
      {
        key: "ladbrokes",
        title: "Ladbrokes",
        last_update: "2023-05-21T09:11:50Z",
        markets: [
          {
            key: "h2h",
            last_update: "2023-05-21T09:11:50Z",
            outcomes: [
              { name: "Adelaide Crows", price: 1.98 },
              { name: "Brisbane Lions", price: 1.85 },
            ],
          },
        ],
      },
      {
        key: "tab",
        title: "TAB",
        last_update: "2023-05-21T09:11:50Z",
        markets: [
          {
            key: "h2h",
            last_update: "2023-05-21T09:11:50Z",
            outcomes: [
              { name: "Adelaide Crows", price: 2.1 },
              { name: "Brisbane Lions", price: 1.7 },
            ],
          },
          {
            key: "spreads",
            last_update: "2023-05-21T09:11:50Z",
            outcomes: [
              { name: "Adelaide Crows", price: 1.9, point: 4.5 },
              { name: "Brisbane Lions", price: 1.9, point: -4.5 },
            ],
          },
        ],
      },
      {
        key: "bluebet",
        title: "BlueBet",
        last_update: "2023-05-21T09:11:52Z",
        markets: [
          {
            key: "h2h",
            last_update: "2023-05-21T09:11:52Z",
            outcomes: [
              { name: "Adelaide Crows", price: 2 },
              { name: "Brisbane Lions", price: 1.8 },
            ],
          },
        ],
      },
      {
        key: "pointsbetau",
        title: "PointsBet (AU)",
        last_update: "2023-05-21T09:11:50Z",
        markets: [
          {
            key: "h2h",
            last_update: "2023-05-21T09:11:50Z",
            outcomes: [
              { name: "Adelaide Crows", price: 2.05 },
              { name: "Brisbane Lions", price: 1.77 },
            ],
          },
        ],
      },
      {
        key: "neds",
        title: "Neds",
        last_update: "2023-05-21T09:12:00Z",
        markets: [
          {
            key: "h2h",
            last_update: "2023-05-21T09:12:00Z",
            outcomes: [
              { name: "Adelaide Crows", price: 1.98 },
              { name: "Brisbane Lions", price: 1.85 },
            ],
          },
        ],
      },
    ],
  },
];
