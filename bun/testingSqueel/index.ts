import { Database } from "bun:sqlite";

// Run sql lite db
const db = new Database("test.db");
// Run in memory db
const inMemoryDB = new Database(":memory:");

// Query
const query = db.query("SELECT * FROM tbl1;");
let x = query.get(); // => { message: "Hello world" }

console.log(x);

// Disconnect from DB
db.close();
