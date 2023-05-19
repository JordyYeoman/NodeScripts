export const doShitWithRes = (data: any[]): any[] => {
  //   if (data?.length) return;
  console.log("================================");
  console.log("Using cached data:");
  console.log("================================");

  let y = data.map((x) => {
    const { keyLineDescription, marketName, eventName, runners } = x;
    // Only handle handicap markets (line markets) atm
    if (marketName === "Handicap") {
      // Get Bet & Lay prices for each selection
      // Get the fair price for each handicap pricepoint

      // Match the selection to team
      // How?? selectionId correlates to the team
      const team1 = eventName?.split(" ")[0];
      const team2 = eventName?.split(" ")[2];

      console.log("team1", team1);
      console.log("team2", team2);

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

      console.log("teamMap: ", teamMap);

      // runners.map((runners: any) => {
      //   console.log("================================");
      //   console.log("Runners", runners);
      //   console.log("================================");
      // });

      return {
        [marketName]: x,
      };
    }
  });

  y = y.filter((x: unknown) => Boolean(x));

  // console.log("y", y[0]);

  return y;
};
