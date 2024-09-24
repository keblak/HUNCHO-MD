const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic01hYUZSR0JUWVQySG9ZTmVFN2Y4QThIQkROMEZtcm1FOFgrb1FKZHZWOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTXhKWEw4V2RXcmVzNWtZWDAvSVVTbFBVNU02QVAvMjRTOC9SZVAycW5UQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHRFBEK1VWczZ6QmRIRFRCMGZVckhidG11aXFUZjdSZDc1eGo2OHBJZ204PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI1V3hQeHZqYVQ3TUpQdFJrMXNnaEdBY2swL2k0QlBzYmQ1MWdDRTkrZ0M0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVHbFhRbFZvMXMzcUhYM1hXWXhjWWVrbHRNcXliK0hTUlVvQzJEUzZta3M9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IllEVlp4NndOUmNtRmJYczg4R3Nqa1RGWSszaGFEYjJoQlprd1BSWlMzbmc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0ZlWDdoY1pxWWE4WDdYRmNydUNteDdxTFBQSStUc3hJT0lmSzEzQldWUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT3g1TUYzVGxrWFFkZkpBV0JyM1d0OGJsYUdNUm82SDJRUUYxQ0gvU1RtQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjNhM3gySmVCT2owYWp4R1ZnejVrakJiTHFrUTN5T1NpcTBzU2RJZXVZdXdia05xRGdkeXk0RFY5RUFDdEVVK0lra0ZYM3JWUU9neXFKNHBWQ1NjUWpBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjM0LCJhZHZTZWNyZXRLZXkiOiJVaDljYjZad1EvNm9tUnVPRDNna2l2SVlOMUpwSHpSbVU1SmNOVU5vY20wPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJVRUVzdElmUlQ2dUp4aklfS05QTlJnIiwicGhvbmVJZCI6ImQzMTIyMTMyLTI4ZDYtNGM2My04MTMyLTBlOWU5YjE1ZDIxMSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0RUtKcW1SV0ZiSzVCYVR5ZlVVcDZTUkgyWEU9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK3ZMZnh2ZFlqdC8rbkZQeTdWZCtoSk5xTllFPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjROVEhaN1ZaIiwibWUiOnsiaWQiOiIyNTQ3NjkzNzM5MzA6MkBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDUHJxeTU4Q0VLaWN6TGNHR0FzZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiaEEzWHFWN0ZueVNRdjJ6SVJtNnl6K2UxQkMyUW1MSUlZT1dKMTAycnZoYz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiZE9LSm8vb045ODRIY3Bsays2T05TbUtNWTBvREFwYzdSZUdpYndFUHlqKy9EUjk2QkExTWZndGlpcERTV1RvL3lkbVNKdjFYc0s3MXVsV29FN0pOQ2c9PSIsImRldmljZVNpZ25hdHVyZSI6IkRGZHovMGpXc0RNdEg1dk5BRVdBQWhTZWRSelRCRzduUVdTRkxVcXJIdWpOZ0RITUsrQ1pRMHRTUE53Y1Fwa0VCbEZ3UHFUaUZlZy9FTGpJeGRXR2l3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU0NzY5MzczOTMwOjJAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWVFOMTZsZXhaOGtrTDlzeUVadXNzL250UVF0a0ppeUNHRGxpZGROcTc0WCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyNzIwNDkxOCwibXlBcHBTdGF0ZUtleUlkIjoiQUY4QUFLQmUifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "⚓༒☠ℬℒᎯᏦℰ☠༒⚓",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "254769373930",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'HUNCHO MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e18441d126f37be8efbfa.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "no",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
