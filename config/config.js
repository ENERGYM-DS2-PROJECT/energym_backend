require('dotenv').config();
const { DB_HOST, DB_USERNAME, DB_PASSWORD } = process.env;
module.exports = {
  "development": {
    "username": DB_USERNAME, 
    "password": DB_PASSWORD, 
    "database": "energymdb", 
    "host": DB_HOST,
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "localhost",
    "dialect": "postgres"
  },
  "production": {
    "username": "ihkdysdwgqlwki",
    "password": "48fa146fe1b1b95f1104cd432bcce6ce9d12cadf9c66d1516386022db6b6930a",
    "database": "d64ai0bil7bkqr",
    "host": "ec2-44-206-137-96.compute-1.amazonaws.com",
    "dialect": "postgres",
    "dialectOptions": {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      }
    }
  }
}