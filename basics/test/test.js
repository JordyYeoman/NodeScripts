const axios = require("axios");
const cheerio = require("cheerio");

async function getOddsFromLadbrokes() {
  try {
    const response = await axios.get(
      "https://www.ladbrokes.com.au/sports/basketball/usa/nba"
    );
    const $ = cheerio.load(response.data);
    console.log("$", $);
    // Use the appropriate selectors to find the odds for the game
    const odds = $(".team-name")
      .filter((i, el) => $(el).text().includes("Detroit Pistons"))
      .siblings(".price")
      .text();
    return odds;
  } catch (error) {
    console.error(error);
  }
}

async function getOddsFromSportsbet() {
  try {
    const response = await axios.get(
      "https://www.sportsbet.com.au/betting/basketball-us/"
    );
    const $ = cheerio.load(response.data);
    // Use the appropriate selectors to find the odds for the game
    const odds = $(".team-name")
      .filter((i, el) => $(el).text().includes("Detroit Pistons"))
      .siblings(".price")
      .text();
    return odds;
  } catch (error) {
    console.error(error);
  }
}

async function compareOdds() {
  try {
    const oddsFromLadbrokes = await getOddsFromLadbrokes();
    const oddsFromSportsbet = await getOddsFromSportsbet();

    if (oddsFromLadbrokes === oddsFromSportsbet) {
      console.log(
        `The odds for Detroit Pistons vs Chicago Bulls are the same on Ladbrokes and Sportsbet: ${oddsFromLadbrokes}`
      );
    } else {
      console.log(
        `The odds for Detroit Pistons vs Chicago Bulls are different on Ladbrokes and Sportsbet: ${oddsFromLadbrokes} vs ${oddsFromSportsbet}`
      );
    }
  } catch (error) {
    console.error(error);
  }
}

compareOdds();
