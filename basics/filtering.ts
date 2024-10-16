// @ts-ignore
import fs from 'fs';

// Read the JSON file
const readJsonFile = (filename: string) => {
  try {
    const data = fs.readFileSync(filename, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error(`Error reading file from disk: ${err}`);
  }
};

// Write JSON to a file
const writeJsonFile = (filename: string, data: any[]) => {
  try {
    fs.writeFileSync(filename, JSON.stringify(data, null, 2), 'utf8');
    console.log('Data written to file');
  } catch (err) {
    console.error(`Error writing file: ${err}`);
  }
};

// Main function
const main = () => {
  const data = readJsonFile('test-users.json') as { id: string }[];
  
  if (data) {
    const seen = new Set();
    const filteredData = data?.filter(el => {
      const duplicate = seen.has(el.id);
      seen.add(el.id);
      return !duplicate;
    });
    
    // Write the filtered data to a new JSON file
    writeJsonFile('output.json', filteredData);
  }
};

main();