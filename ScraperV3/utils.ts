export const doShitWithRes = (data: any[]): any[] => {
  //   if (data?.length) return;
  console.log("================================");
  console.log("Using cached data:");
  console.log("================================");

  let y = data.map((x) => {
    const { keyLineDescription, marketName, runners } = x;
    // Only handle handicap markets (line markets) atm
    if (marketName === "Handicap") {
      // Get Bet & Lay prices for each selection
      // Get the fair price for each handicap pricepoint

      // Match the selection to team
      // How?? selectionId correlates to the team
      const team1 = [];
      const team2 = [];

      runners.map((runners: any) => {
        console.log("================================");
        console.log("Runners", runners);

        console.log("================================");
      });

      return {
        [marketName]: x,
      };
    }
  });

  y = y.filter((x: unknown) => Boolean(x));

  console.log("y", y[0]);

  return y;
};
