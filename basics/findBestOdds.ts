// Method to find the best odds

// Goal is to find an outcome where both bets equate to 0 or as close to 0 as possible
// Bet placement on either bookie should be a round number of 2.5 / 5 / 7.5 / 10

// Bookmaker 1
// Odds for A - 2.56 
// Odds for B - 1.51

// Bookmaker 2
// Odds for A - 2.60
// Odds for B - 1.52

// Bookmaker 3 
// Odds for A - 2.52
// Odds for B - 1.52

const getResultForBet = (odds: number, stake: number) => {
    return odds * stake - stake;
}

// We need to use between 10 - 15 dollars of bets
const minStake = 10;
const maxStake = 20;
const bookieAOddsTeamA = 2.56;
const bookieOddsTeamB = 1.52;

const loopThroughOutcomes = (minStake: number, maxStake: number) => {
    const stepSize = 0.01;
    let countToFindBestOutcome = 0;
    let testStake = minStake;
    let bestStakeForBookieA = minStake;
    let bestStakeForBookieB = minStake;
    let bookieAReturns = 0;
    let bookieBReturns = 0;
    // Test
    let bestResA = 10;
    let bestResB = 10;

    // Loop over left side of argument (A) to find best stake
    while(testStake < maxStake) {
        let a = getResultForBet(bookieAOddsTeamA, testStake);

        // Loop over right side and find closest to 0 & assign that value
        for(let k = minStake; k < maxStake; k+= stepSize) {
            const bookieAWins = a;
            const bookieBWins = getResultForBet(bookieOddsTeamB, k);
            
            // Solve if A bookie wins
            // Bookie A winnings - stake of Bookie B
            const resA = bookieAWins - k;

            // Solve if B bookie wins
            // Bookie B winnings - stake of Bookie A
            const resB = bookieBWins - testStake;

            // Remove any negatives 
            if(resA > 0 && resB > -2) {
                // Find where both are as close to 0 as possible
                if(resA < bestResA && resB < bestResB) {
                    // Assign new best res's
                    bestResA = resA;
                    bestResB = resB;
                    // Assign new best stakes
                    bestStakeForBookieA = testStake;
                    bestStakeForBookieB = k;
                    // Incremenet counter 
                    countToFindBestOutcome++;
                    // Assign bookie est. returns for bet validation
                    bookieAReturns = a + testStake;
                    bookieBReturns = bookieBWins + k;
                }
            }
        }

        // Add 0.01 to testStake
        testStake += stepSize;
    }

    console.log('Best resA: ', bestResA);
    console.log('Best resB: ', bestResB);
    console.log('bestStakeForBookieA', bestStakeForBookieA)
    console.log('bestStakeForBookieB', bestStakeForBookieB)
    console.log('bookieAReturns ', bookieAReturns);
    console.log('bookieBReturns ', bookieBReturns);
}

loopThroughOutcomes(minStake, maxStake);