import { AFLTeam } from "./enums/AFL";
import { OddsApi } from "./types/OddsApi";

export const ingestData = (data: any[]): any[] => {
  console.log("================================");
  console.log("Using cached data:");
  console.log("================================");

  return data
    .map((x) => {
      const { marketName, eventName, runners } = x;
      // Only handle handicap markets (line markets) atm
      if (marketName === "Handicap") {
        return handleHandicap(eventName, runners, marketName);
      }
    })
    .filter((x: unknown) => Boolean(x));
};

const handleHandicap = (
  eventName: string,
  runners: any[],
  marketName: string
) => {
  // Get Bet & Lay prices for each selection
  // Get the fair price for each handicap pricepoint

  // Match the selection to team
  const team1 = eventName?.split(" ")[0];
  const team2 = eventName?.split(" ")[2];

  const team1Market: any[] = [];
  const team2Market: any[] = [];

  if (!team1 || !team2) return;

  const teamMap = new Map<string, number>();
  teamMap.set(team1, 0);
  teamMap.set(team2, 0);

  // Nasty way to find teams, but, get it working, then improve
  // Lower number should represent team 1, higher number should represent team 2
  for (let i = 0; i < runners.length; i++) {
    // If both teams have a selection id > 0, break;
    if ((teamMap.get(team1) ?? 1 > 0) && (teamMap.get(team2) ?? 1 > 0)) break;
    if (
      runners[i]?.selectionId > (teamMap.get(team1) ?? 0) ||
      runners[i]?.selectionId < (teamMap.get(team2) ?? 0)
    ) {
      teamMap.set(team1, runners[i]?.selectionId);
    } else {
      teamMap.set(team2, runners[i]?.selectionId);
    }
  }

  runners.map((runner: any) => {
    // Get fair price and add to runner object
    const fairPrice = (
      (runner.ex.availableToBack[0].price + runner.ex.availableToLay[0].price) /
      2
    ).toFixed(3);
    if (runner.selectionId === teamMap.get(team1)) {
      team1Market.push({ ...runner, fairPrice, teamName: team1 });
    } else {
      team2Market.push({ ...runner, fairPrice, teamName: team2 });
    }
  });

  return {
    [marketName.toLowerCase()]: {
      team1: team1Market,
      team2: team2Market,
    },
  };
};

export const compareEvents = (oddsApi: any, eventData: any) => {
  // Testing
  const teamToMatch = AFLTeam.FREMANTlE.toLowerCase();

  // Seperate into seperate markets
  let foundTeamOdds: any = [];

  oddsApi?.map((x: any) => {
    // Loop over each bookmaker
    return x?.bookmakers?.map((bookmaker: any) => {
      const bookieName = bookmaker.title;
      return bookmaker?.markets.map((market: any) => {
        if (market?.key === "spreads") {
          try {
            return market?.outcomes?.find((u: any) => {
              const { name } = u;
              console.log("name: ", name);
              if (name.toLowerCase().includes(teamToMatch)) {
                foundTeamOdds.push({
                  outcome: u,
                  market: market?.key,
                  bookie: bookieName,
                });
              }
            });
          } catch (e) {
            console.log("error", e);
          }
        }
      });
    });
  });

  console.log("foundTeamOdds", foundTeamOdds);
  // Now loop over 'd' data

  const x = eventData.map((e: any) => {
    const { handicap } = e;

    if (handicap) {
      // Find matching team - 'teamToMatch'
      const { team1, team2 } = handicap;
      if (!team1 || !team2) return;

      const isTeamOneMatch = team1.some(
        (j: any) => j.teamName.toLowerCase() === teamToMatch
      );
      const isTeamTwoMatch = team2.some(
        (j: any) => j.teamName.toLowerCase() === teamToMatch
      );

      // Oncew we find a matching team, compare all market odds to find any
      // positive EV bets
      if (isTeamOneMatch) {
        console.log("team1Bra!!");
      } else if (isTeamTwoMatch) {
        console.log("Tis be team 2 homie!");
        const fairPrice = parseFloat(team2[0]?.fairPrice);
        const positiveEVBets: any = [];

        // Loop over matching team odds
        if (foundTeamOdds.length) {
          foundTeamOdds?.map((team: any) => {
            const positive = getExpectedValue(team?.outcome?.price, fairPrice);
            if (positive > 0)
              positiveEVBets.push({
                expectedValue: positive,
                bookie: team,
                fairPrice,
              });
          });
        }
        return positiveEVBets;
      }
    }
  });
};

export const getExpectedValue = (bookieOdds: number, fairOdds: number) => {
  // Stake amount = $10 for testing
  const stake = 10;
  const winProbability = 1 / fairOdds;
  const winOutcome = (bookieOdds * stake - stake) * winProbability;
  const loseProbability = 1 - winProbability;
  const loseOutcome = loseProbability * stake;

  return winOutcome - loseOutcome;
};
