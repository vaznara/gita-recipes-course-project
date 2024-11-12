import * as dotenv from 'dotenv';
dotenv.config();

export const environment = {
  production: true,
  firebase: {
    projectId: process.env["PROJECT_ID"] || '',
    appId: process.env["APP_ID"] || '',
    storageBucket: process.env["STORAGE_BUCKET"] || '',
    apiKey: process.env["API_KEY"] || '',
    authDomain: process.env["AUTH_DOMAIN"] || '',
    messagingSenderId: process.env["MESSAGING_SENDER_ID"] || ''
  },
  dbPath: process.env["REST_API_PATH"] || '',
  maxFileSize: process.env["MAX_FILE_SIZE"] || ''
}
