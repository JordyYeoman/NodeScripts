import { Database } from "bun:sqlite";

// Run sql lite db
const db = new Database("test.db");
// Run in memory db
const inMemoryDB = new Database(":memory:");

// Query
const query = db.query("SELECT * FROM tbl1;");
let x = query.get(); // => { message: "Hello world" }

// Transactions
const insertData = db.prepare(
  "INSERT INTO tbl1 (one, two, three) VALUES ($one, $two, $three)"
); // prepare a transaction in db cache
const insertDataPayload = db.transaction((d) => {
  for (const data of d) insertData.run(data);
}); // this is all preparation for db insertion

insertDataPayload([
  { $one: "Keanu", $two: 10, $three: 4122 },
  { $one: "Salem", $two: 102, $three: 1122 },
  { $one: "Crookshanks", $two: 109, $three: 1512 },
]);

console.log(`Inserted payload: ${insertDataPayload} payload into tbl1`);

// Disconnect from DB
db.close();
