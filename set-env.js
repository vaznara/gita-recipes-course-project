const fs = require('fs');
const path = require('path');

// Define the path to the environment file
const targetPath = path.join(__dirname, 'src/environments/environment.prod.ts');

// Define the environment variables and fallback values if not defined
const envConfigFile = `
export const environment = {
  production: true,
  firebase: {
    projectId: "${process.env['PROJECT_ID']}",
    appId: "${process.env['APP_ID']}",
    storageBucket: "${process.env['STORAGE_BUCKET']}",
    apiKey: "${process.env['API_KEY']}",
    authDomain: "${process.env['AUTH_DOMAIN']}",
    messagingSenderId: "${process.env['MESSAGING_SENDER_ID']}"
  },
  dbPath: "${process.env['REST_API_PATH']}",
  maxFileSize: "${process.env['MAX_FILE_SIZE']}"
};
`;

// Write the content to the environment file
fs.writeFile(targetPath, envConfigFile, (err) => {
  if (err) {
    console.error('Error writing environment file', err);
  } else {
    console.log(`Environment file generated at ${targetPath}`);
  }
});
