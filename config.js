const { Sequelize } = require('sequelize');
const fs = require('fs');
const dotenv = require('dotenv');

// Load environment variables from config.env if it exists
if (fs.existsSync('config.env')) dotenv.config({ path: './config.env', override: true });

// Helper Functions
const toBool = (x) => typeof x === 'string' && x.toLowerCase() === 'true';

// Global API Configurations
global.apikey = { 'https://api.adithyan.xyz': process.env.API_KEY || 'free' };
global.apiUrl = process.env.API_URL || 'https://hermit-api.koyeb.app/';

// Database Configuration
const DATABASE_URL = process.env.DATABASE_URL || './database.db';
process.env.NODE_OPTIONS = '--max_old_space_size=4096';

// Bot Settings
module.exports = {
  VERSION: 'v5.0.0',  // Updated for 2025
  SESSION_ID: process.env.SESSION_ID || '',
  MODE: (process.env.MODE || 'private').toLowerCase(),
  HANDLERS: (process.env.PREFIX || '^[.,!]').trim(),
  SEND_READ: toBool(process.env.READ_COMMAND),
  READ_MSG: toBool(process.env.READ_MSG),
  MSG_LOG: toBool(process.env.LOG_MSG),
  BLOCKCHAT: process.env.BLOCK_CHAT || false,
  LANG: (process.env.LANGUAGE || 'EN').toUpperCase(),
  ALWAYS_ONLINE: toBool(process.env.ALWAYS_ONLINE),
  BOT_NAME: process.env.BOT_NAME || 'ʜᴇʀᴍɪᴛ',
  AUTOMUTE_MSG: process.env.AUTOMUTE_MSG || '_Group automuted!_',
  AUTOUNMUTE_MSG: process.env.AUTOUNMUTE_MSG || '_Group autounmuted!_',
  ANTILINK_MSG: process.env.ANTILINK_MSG || '_Link Not Allowed!_',
  BOT_INFO: process.env.BOT_INFO || 'ʜᴇʀᴍɪᴛ;Adithyan;972528277755;https://i.imgur.com/6oRG106.jpeg',
  AUDIO_DATA: process.env.AUDIO_DATA || 'ʜᴇʀᴍɪᴛ;Adithyan;https://i.imgur.com/fj2WE83.jpeg',
  STICKER_DATA: process.env.STICKER_DATA || 'ʜᴇʀᴍɪᴛ;Adithyan',
  ERROR_MESSAGE: toBool(process.env.ERROR_MESSAGE),
  SONG_THUMBNAIL: toBool(process.env.SONG_THUMBNAIL),
  WARN: process.env.WARN || '4',
  REJECT_CALL: toBool(process.env.REJECT_CALL),
  KOYEB_API_KEY: process.env.KOYEB_API_KEY || false,
  KOYEB_APP_NAME: process.env.KOYEB_APP_NAME || '',
  RENDER_API: process.env.RENDER_API || false,
  RENDER_NAME: process.env.RENDER_NAME || '',
  TERMUX_VPS: toBool(process.env.TERMUX || process.env.VPS),
  AUTO_STATUS_VIEW: toBool(process.env.AUTO_STATUS_VIEW),
  APIKEY: process.env.APIKEY || 'free',
  AUTH_FILE: process.env.AUTH_FILE || false,
  START_MSG: toBool(process.env.START_MSG || 'true'),
  DATABASE_URL: DATABASE_URL,

  // Database Configuration (SQLite or PostgreSQL)
  DATABASE: DATABASE_URL === './database.db'
    ? new Sequelize({
        dialect: 'sqlite',
        storage: DATABASE_URL,
        logging: false,
      })
    : new Sequelize(DATABASE_URL, {
        dialect: 'postgres',
        ssl: true,
        protocol: 'postgres',
        dialectOptions: {
          ssl: { require: true, rejectUnauthorized: false },
        },
        logging: false,
      }),

  RBG_API_KEY: process.env.REMOVE_BG_API_KEY || false,
  BRAIN_ID: process.env.BRAIN_ID || 'bid=168613&key=EfbnX54Iy9PFIFp3',
  SUDO: process.env.SUDO || '0,0',
  DEBUG: toBool(process.env.DEBUG),
};
