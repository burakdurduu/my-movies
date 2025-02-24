// import pg from "pg";
// import dotenv from "dotenv";

// dotenv.config();

// const { Pool } = pg;
// const db = new Pool({
//   connectionString: process.env.DB_URL,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });
// db.connect();

// db.on("error", (err) => {
//   console.log("Error connection to PosgreSQL: ", err);
//   process.exit(1);
// });

// export const query = (text, params) => db.query(text, params);

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;