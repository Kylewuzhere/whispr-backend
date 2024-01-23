require('dotenv').config;

const config = {
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  driver: process.env.DB_DRIVER,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    trustServerCertificate:
      process.env.NODE_ENV === 'development' ? true : false, // change to true for local dev / self-signed certs
    trustedConnection: process.env.NODE_ENV === 'development' ? true : false,
  },
};

module.exports = config;
