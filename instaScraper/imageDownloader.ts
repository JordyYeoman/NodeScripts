import axios from 'axios';
import fs from 'fs';
import path from 'path';

async function downloadImage(url: string, filename: string): Promise<void> {
  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream'
  });

  return new Promise((resolve, reject) => {
    response.data
      .pipe(fs.createWriteStream(filename))
      .on('finish', () => resolve())
      .on('error', (e: any) => reject(e));
  });
}

async function downloadAllImages(images: { highlight: string, url: string }[]): Promise<void> {
  const downloadFolder = path.join(__dirname, 'downloaded_images');

  // Create the download folder if it doesn't exist
  if (!fs.existsSync(downloadFolder)) {
    fs.mkdirSync(downloadFolder);
  }

  for (let i = 0; i < images.length; i++) {
    const url = images[i];
    const filename = path.join(downloadFolder, `${url.highlight}_${i + 1}.jpg`);

    try {
      await downloadImage(url.url, filename);
      console.log(`Downloaded: ${filename}`);
    } catch (error) {
      console.error(`Error downloading ${url}: ${error}`);
    }
  }

  console.log('All downloads completed!');
}

// Example usage
const imageUrls = [{ url: '', highlight: '' }];

downloadAllImages(imageUrls).catch(console.error);