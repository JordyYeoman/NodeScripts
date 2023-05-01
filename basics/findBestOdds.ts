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


// Try loop through all outcomes and find the absolute best outcome using decimal places
// 1. Create standard method to get outcome

const getResultForBet = (odds: number, stake: number) => {
    return (odds * stake) - stake;
}

// We need to use between 10 - 15 dollars of bets
const minStake = 10;
const maxStake = 15;
const bookieAOddsTeamA = 2.56;
const bookieOddsTeamB = 1.52;

const loopThroughOutcomes = (minStake: number, maxStake: number) => {
    let initialStake = minStake;
    let bestRes = 10;
    let bestStakeForBookieA = minStake;
    let bestStakeForBookieB = minStake;

    // Loop 
    while(initialStake < maxStake) {
        let a = getResultForBet(bookieAOddsTeamA, initialStake);
        let b = getResultForBet(bookieOddsTeamB, minStake);

        // Check if better place than the previous bet
        let outcome1 = a - initialStake;
        let outcome2 = b - minStake;

        // Find who is closest to 0 with only x changing
        const res = outcome1 + outcome2;
        if(res < bestRes) {
            bestStakeForBookieA = initialStake;
            bestStakeForBookieB = minStake;
        }

        // Add 0.1 to initialStake
        initialStake += 0.01;
    }

    console.log('Best res: ', bestRes);
    console.log('bestStakeForBookieA', bestStakeForBookieA)
    console.log('bestStakeForBookieB', bestStakeForBookieB)
}

loopThroughOutcomes(minStake, maxStake);