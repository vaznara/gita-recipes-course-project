const setEnv = () => {
  const fs = require('fs');
  const writeFile = fs.writeFile;

  const path = 'src/environments';

  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
    console.log('Environments Folder created');
  }

  const targetPath = 'src/environments/environment.ts';

  require('dotenv').config();
  // `environment.ts` file structure
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

  writeFile(targetPath, envConfigFile, (err) => {
    if (err) {
      console.error(err);
      throw err;
    } else {
      console.log(`Angular environment.ts file generated correctly at ${targetPath} \n`);
    }
  });
};

setEnv();
