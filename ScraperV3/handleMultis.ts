const leg1Odds = 2.75;
const leg1FairOdds = 2.4;

const leg2Odds = 3.1;
const leg2FairOdds = 3.05;

const leg3Odds = 2.8;
const leg3FairOdds = 2.6;

const d = [leg1Odds, leg2Odds, leg3Odds];
const z = [leg1FairOdds, leg2FairOdds, leg3FairOdds];

export const getExpectedValue = (
  bookieOdds: number[],
  fairOdds: number[],
  stake: number = 10
) => {
  let totalFairOdds = fairOdds.reduce((a, c) => a * c, 1);

  // const winProbability = 1 / totalFairOdds;
  // const winOutcome = (totalBookieOdds * stake - stake) * winProbability;
  // const loseProbability = 1 - winProbability;
  // const loseOutcome = loseProbability * stake;

  // return winOutcome - loseOutcome;
  return totalFairOdds;
};

let l = getExpectedValue(d, z);
console.log(l);
