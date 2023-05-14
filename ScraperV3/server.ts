import puppeteer from "puppeteer";

const scrapeMeDaddy = async () => {
  let browser;

  try {
    browser = await puppeteer.launch({
      headless: false,
    });
    const url = "https://scrapeme.live/shop/";

    // Open a new page / tab in the browser.
    const page = await browser.newPage();

    // Tell the tab to navigate to the JavaScript topic page.
    await page.goto(url, { waitUntil: "domcontentloaded" });

    await page.waitForSelector(".product", { visible: true });

    const elements = await page.$$eval(".product", (product) =>
      product.map((product) => ({
        productLink: product?.querySelector("img[src]")?.getAttribute("src"),
        productTitle: product?.querySelector("h2")?.innerText,
        price: product?.querySelector(".price .amount")?.textContent,
      }))
    );
    console.log(elements);
  } catch (e) {
    console.log("Error occurred: ", e);
  } finally {
    // Turn off the browser to clean up after ourselves.
    await browser?.close();
  }
};

scrapeMeDaddy();
