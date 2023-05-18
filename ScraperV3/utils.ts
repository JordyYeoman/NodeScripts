export const doShitWithRes = (data: any[]): any[] => {
  //   if (data?.length) return;
  console.log("================================");
  console.log("Using cached data:");
  console.log("================================");

  data.map((x) => {
    const { keyLineDescription, marketName, runners } = x;
    // Only handle handicap markets (line markets) atm.
    if (marketName === "Handicap") {
      // Extract keyline handicap as a baseline to find market average
      let keylineTeam1 = keyLineDescription?.keyLine[0];
      let keylineTeam2 = keyLineDescription?.keyLine[1];

      if (!keylineTeam1 || !keylineTeam2) return;

      // Loop over runners and find values surrounding the handicap market
      let x = runners.map((runner: any) => {
        // Get which team/outcome runner relates to,
        if (keylineTeam1.selectionId === runner.selectionId) {
          if (
            keylineTeam1.handicap + 1 >= runner.handicap &&
            keylineTeam1.handicap - 1 <= runner.handicap
          ) {
            console.log("runner1 match: ", runner);
          }
        }

        if (keylineTeam2.selectionId === runner.selectionId) {
          if (
            keylineTeam2.handicap + 1 >= runner.handicap &&
            keylineTeam2.handicap - 1 <= runner.handicap
          ) {
            console.log("runner2 match: ", runner);
          }
        }
      });
    }
  });

  return [];
};
