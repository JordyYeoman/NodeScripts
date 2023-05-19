export const doShitWithRes = (data: any[]): any[] => {
  //   if (data?.length) return;
  console.log("================================");
  console.log("Using cached data:");
  console.log("================================");

  let y: any = data.map((x) => {
    const { keyLineDescription, marketName, eventName, runners } = x;
    // Only handle handicap markets (line markets) atm
    if (marketName === "Handicap") {
      // Get Bet & Lay prices for each selection
      // Get the fair price for each handicap pricepoint

      // Match the selection to team
      // How?? selectionId correlates to the team
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
        if ((teamMap.get(team1) ?? 1 > 0) && (teamMap.get(team2) ?? 1 > 0))
          break;
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
        const fairPrice =
          (runner.ex.availableToBack[0].price +
            runner.ex.availableToLay[0].price) /
          2;
        if (runner.selectionId === teamMap.get(team1)) {
          team1Market.push({ ...runner, fairPrice });
        } else {
          team2Market.push({ ...runner, fairPrice });
        }
      });

      return {
        [marketName.toLowerCase()]: {
          team1: team1Market,
          team2: team2Market,
        },
      };
    }
  });

  y = y.filter((x: unknown) => Boolean(x));

  return y;
};
