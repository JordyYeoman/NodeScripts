import puppeteer from 'puppeteer';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Load environment variables from .env file
dotenv.config();

// Helper function to create a delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const arrayToHoldAllImages: { highlight: string, url: string }[] = [];

async function runPuppeteerScript() {
  const waitFor5Bra = async () => {
    // Wait for 5 seconds before performing any actions
    console.log('Waiting for 5 seconds...');
    await delay(5000);
    console.log('Delay complete. Proceeding with actions 1.');
  }

  // Launch the browser
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Set environment variables in the page context
  await page.evaluateOnNewDocument((env) => {
    for (const key in env) {
      (window as any)[key] = env[key];
    }
  }, process.env);

  // Set the window size
  await page.setViewport({
    width: 1280,
    height: 800
  });

  // // Navigate to the demo URL
  await page.goto('https://www.instagram.com', { waitUntil: 'networkidle2' });

  await waitFor5Bra();

  // Login
  const log = await page.waitForSelector('input[name="username"]');
  const pass = await page.waitForSelector('input[name="password"]');
  const loginButton = await page.waitForSelector('#loginForm > div > div:nth-child(3) > button');

  // Type into login fields
  await log?.type('redacted');
  await pass?.type('redacted');


  // Click button
  await loginButton?.click();

  // Navigate to profile page
  console.log('Waiting for 3 seconds...');
  await delay(3000);
  console.log('Delay complete. Proceeding with actions 2.');

  const profileButton = await page.waitForSelector('a[href="/redacted/?next=%2F"]');
  await profileButton?.click();

  await waitFor5Bra();

  // Click on first story
  const firstStoryButton = await page.waitForSelector('div > div > div > div > div > div > div > div:nth-child(2) > div > div > section > main > div > header > section > div > div > div > div > div > ul > li:nth-child(3) > div > div > div > div > div > img');
  await firstStoryButton?.click();

  await waitFor5Bra();

  // Base vars
  let nextButton;
  let data = { url: '', highlight: '' };
  let count = 0;

  // =========== Should be repeated for all stories ===========

  // await delay(500000);

  while (count <= 89) {
    console.log('[DEBUG] trying to extract image source, COUNT: ', count);
    // Press pause button on autoplay
    const pauseButton = await page.$('svg[aria-label="Pause"]');
    await pauseButton?.click();

    // await delay(200);

    let selector;
    let highlight;

    if (count <= 4) {
      highlight = 'Christmas_Mini';
      selector = 'div > div > div > div > div > div > div > div > div > section > div > div > div:nth-child(1) > div > div > div > div:nth-child(2) > div > div > div > div > img';
    } else if (count <= 47) {
      highlight = 'Client_Wardrobe';
      selector = "div > div > div > div > div > div > div > div > div > section > div > div > div:nth-child(2) > div > div > div > div:nth-child(2) > div > div > div > div > img";
    } else if (count <= 82) {
      highlight = 'Mini_Wardrobe';
      selector = "div > div > div > div > div > div > div > div > div > section > div > div > div:nth-child(3) > div > div > div > div:nth-child(2) > div > div > div > div > img";
    } else if (count <= 89) {
      highlight = 'Knitstagram';
      selector = "div > div > div > div > div > div > div > div > div > section > div > div > div:nth-child(4) > div > div > div > div:nth-child(2) > div > div > div > div > img";
    } else {
      highlight = 'Studio';
      selector = "div > div > div > div > div > div > div > div > div > section > div > div > div:nth-child(5) > div > div > div > div:nth-child(2) > div > div > div > div > img";
    }

    console.log(`[DEBUG] Searching ${highlight}!`);
    let z = await page.waitForSelector(selector);
    // Extract source
    let d = await z?.evaluate((img) => (img as HTMLImageElement).src);
    data = { highlight: highlight, url: d ?? '' };

    // Push to our list of images
    arrayToHoldAllImages.push(data);

    // Find next button
    nextButton = await page.$('svg[aria-label="Next"]');
    await delay(100);
    await nextButton?.click();

    console.log('[DEBUG] images!: ', arrayToHoldAllImages);

    count++;
  }

  console.log('Waiting for 2 seconds...');
  console.log('Delay complete. Proceeding with actions 2.');

  function saveArrayToJson(array: { highlight: string, url: string }[], filename: string): void {
    const jsonContent = JSON.stringify(array, null, 2);
    const filePath = path.join(__dirname, filename);

    fs.writeFile(filePath, jsonContent, 'utf8', (err: any) => {
      if (err) {
        console.error('An error occurred while writing JSON Object to File:', err);
      } else {
        console.log(`JSON file has been saved to ${filePath}`);
      }
    });
  }

  // Usage
  saveArrayToJson(arrayToHoldAllImages, 'image_data.json');


  console.log('Waiting for 5 seconds...');
  await delay(500000);
  console.log('Delay complete. Proceeding with actions 2.');

  // Close the browser
  await browser.close();
}

runPuppeteerScript().catch(console.error);