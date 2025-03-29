import express from 'express';
import { google } from 'googleapis';
import { JWT } from 'google-auth-library';
import dotenv from 'dotenv';
import cors from 'cors';

type MetricData = {
  date: String;
  codeReviews: String;
  subjectiveTeamContribution: String;
  totalMergeRequests: String;
  learnings: String;
  timeSpentCoding: String;
  discussionThreadsContributedTo: String;
  courseTimeSpent: String;
  programmingLanguage: String;
  linkToLearningResource: String;
}

// Fake cache
let fakeCache: MetricData[] | undefined

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Create JWT client using service account
const createJwtClient = () => {
  return new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });
};

// Endpoint to get entire spreadsheet data
app.get('/api/metrics/all', async (req, res) => {
  // check fake 'cache' if value exists already
  if (fakeCache && fakeCache?.length > 0) {
    console.log("Cache hit");
    res.json(fakeCache);
    return
  }

  try {
    const spreadsheetId: string = process.env.METRICS_SPREADSHEET_ID ?? '';
    const { sheet } = req.query;

    const data = await getEntireSheetData(
      spreadsheetId,
      sheet ? String(sheet) : undefined
    );
    
    const x = data['Entain Improvement'].slice(1, -1);
    
    // Convert to Metrics Data
    const metricsData: MetricData[] = x.map((row: any[]) => {

      // Skip empty rows (verify a few cells if fine)
      if (row?.[1] == "" && row?.[2] == "" && row?.[3] == "") {
        return null;
      }

      return {
        date: row?.[0] ?? "",
        codeReviews: row?.[1] ?? "",
        subjectiveTeamContribution: row?.[2] ?? "",
        totalMergeRequests: row?.[3] ?? "",
        learnings: row?.[4] ?? "",
        timeSpentCoding: row?.[5] ?? "",
        discussionThreadsContributedTo: row?.[6] ?? "",
        courseTimeSpent: row?.[7] ?? "",
        programmingLanguage: row?.[8] ?? "",
        linkToLearningResource: row?.[9] ?? "",
      };
    })
    .filter((row) => row !== null);

    // Cache result
    fakeCache = metricsData;

    res.json(metricsData);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch sheet data',
      details: (error as Error).message,
    });
  }
});

// Get data from entire sheet
async function getEntireSheetData(spreadsheetId: string, sheetName?: string) {
  try {
    const jwtClient = createJwtClient();
    const sheets = google.sheets({ version: 'v4', auth: jwtClient });

    // First, get the spreadsheet metadata to find all sheets
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId,
    });

    const sheetsList = spreadsheet.data.sheets;
    const results: Record<string, any[]> = {};

    // If a specific sheet name is provided, only get that sheet
    if (sheetName) {
      const sheet = sheetsList?.find((s) => {
        return s.properties?.title === sheetName;
      });
      if (!sheet) {
        throw new Error(`Sheet "${sheetName}" not found`);
      }

      const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: sheetName,
      });

      results[sheetName] = response.data.values || [];
    }
    // Otherwise, get data from all sheets
    else {
      for (const sheet of sheetsList || []) {
        const sheetTitle = sheet.properties?.title;
        if (sheetTitle) {
          const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: sheetTitle,
          });

          results[sheetTitle] = response.data.values || [];
        }
      }
    }

    return results;
  } catch (error) {
    console.error('Error fetching sheet data:', error);
    throw error;
  }
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
