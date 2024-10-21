const { Sequelize } = require('sequelize');
require('dotenv').config();
const env = (key, def) => process.env[key] || def;
const DB_URL = env('DATABASE_URL', './database.db');

let sequelize;
if (DB_URL === './database.db' || !DB_URL.startsWith('postgres://')) {
 sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.db',
  logging: false,
 });
} else {
 sequelize = new Sequelize(DB_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  ssl: true,
  dialectOptions: {
   ssl: { require: true, rejectUnauthorized: false },
  },
  logging: false,
 });
}

module.exports = {
 LOGS: process.env.LOGS || true,
 SESSION_ID: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0tJL2U5WWdRNk5Ybm0yM0RSQ2xYOEtxcW4vS012eFBQYmpZek5MbTgxcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRXdUUEFKOWZhZWZ4alk0OTNzWnlaME5wTmRKbTBjVThVeDF4MGxpaFBCcz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIyTm82Sm9zRGtVQTEwaldUMFp0ZW9oME41MUMwdk94dVdCalRuWisyZEVNPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ2V01mcXlOWGQwMWJVM0Z4RWJDSzloVncvZTZrWlBSM2QxMmNlSThYSnlvPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldCeFN5cmpBcE9JNUFTRFRxNWRJenRWYXZjd1N5eVlHc2lPVXpqU0l5WDA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjdhdU5sYTlBMlVpWVVKT1gwWENqekprRWp4cGV3YUoxM3RsRHVnQVFRd2c9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0ZzUnhDQkR6d3doNXIvRGhuQ09ZRUFRZk5LR0VVZ0ZxZ1YvSHdjYmoyRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiN1IvV0NpQnlkT2NKUFpwMkU2bE4zMVlXME0xdEVYT2d4Qy9oOUR4bzdBaz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlzTGRaVXRPSEtJdXRabjRXbXpZMUJNNFkvam9PWkZ6aXhkNnp6aDI2N0I2Q2hVcXNZUHRET21raHlDdDRweWhqMm5sUVdmb1N6Y01XcGQ0TXM0S2dRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6OTMsImFkdlNlY3JldEtleSI6Im5DYWZZWXFOU3A5Qm1YTTFmejQvTElodmpyQmpIYXJpc0cyRVdkYXdLUXM9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IkM1Yk9qdmdGU25hLUlaX1lKQWRvQmciLCJwaG9uZUlkIjoiOWVlMTFhZTctYmU3MS00NDAwLTgwNjctMDZlYzA1ZTUzYmRmIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImxQeDg1Y1J5TU4zRnlrbTlXelN6YmtLeFQ3ND0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJEalBuc0dxSjd2VUlXRldRTStRZ0VjemErbmc9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiRUVLSkdHSlMiLCJtZSI6eyJpZCI6IjkxODk0NTk5OTY1NToyOUBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJTVUJITyJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTXplcC9FRUVPNkwyTGdHR0FjZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoickwxSVM0Qm05QkxLYXJwc0tDdnB4bW1oUHNDbmU1QlV4Q1g5SXhvSzltcz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiUlV0ZjVpellRTnhIeUpscEJGZmdSSm9QSkJpRlFFU2tlSGhyTHg2SXNyTnhXcEx0b29TbHZYdTR0K1RUVHNrWkhWRDZYdW9xZ3dIZExuVnhUbzJjQ0E9PSIsImRldmljZVNpZ25hdHVyZSI6IlJhYUVlODRQdXVVcG1yb3ZRVU1raWdseVprUzQvTWRTYzVTciszQ0Z5VVJLK2IxdytIUUp3WVg3bDNHVTd4aVdtdk1hN09WRW5MVGF1Ri91RG1KN2pBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTE4OTQ1OTk5NjU1OjI5QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmF5OVNFdUFadlFTeW1xNmJDZ3I2Y1pwb1Q3QXAzdVFWTVFsL1NNYUN2WnIifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3Mjk0OTY1NjIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQ1llIn0=',
 PREFIX: process.env.HANDLER || '.',
 ANTI_CALL: process.env.ANTI_CALL || 'false', // 'true' | 'false' | 'block'
 STICKER_PACK: process.env.STICKER_PACK || 'ᴇxᴄᴇʟ;xᴄᴇʟsᴀᴍᴀ',
 WARN_COUNT: 3,
 SUDO: process.env.SUDO || '2347045035241',
 AUTO_READ_MESSAGE: process.env.AUTO_READ || false,
 AUTO_STATUS_READ: process.env.AUTO_STATUS_READ || true,
 PRESENCE_UPDATE: process.env.PRESENCE_UPDATE || 'recording', // 'available' | 'unavailable' | 'composing'  |'recording' | 'paused'
 WORK_TYPE: process.env.WORK_TYPE || 'private',
 DATABASE_URL: DB_URL,
 DATABASE: sequelize,
};
