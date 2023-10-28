/* module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "123",
    DB: "energymdb",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
}; */

const Pool = require("pg").Pool;
require('dotenv').config();

const DB_CONFIG = {
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.PG_DATABASE,
  port: process.env.PG_PORT

}

//const devConfig =  `postgresql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`
//const dbConfig = require("../config/db.config.js");

const proConfig =  process.env.DATABASE_URL;

// const pool = new Pool({
//   connectionString: process.env.NODE === "production" ? proConfig : devConfig
// });

// module.exports = pool;
module.exports = {DB_CONFIG}