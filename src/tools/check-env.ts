import * as fs from 'fs';
import * as path from 'path';
import * as glob from 'glob';

function logInfo(message: string) {
  console.log(`INFO: ${message}`);
}

function logError(message: string) {
  console.error(`ERROR: ${message}`);
}

function getExampleEnvFilePath(): string {
  const providedPath = process.argv[2];
  const defaultPath = path.resolve('.env.example');
  const envPath = providedPath ? path.resolve(providedPath) : defaultPath;

  if (!fs.existsSync(envPath)) {
    logError(`.env.example file not found at path: ${envPath}`);
    process.exit(1);
  }

  logInfo(`Using .env.example file at path: ${envPath}`);
  return envPath;
}

function getEnvVariablesFromCode(): string[] {
  logInfo('Scanning for environment variables in the codebase...');
  const files = glob.sync('src/**/*.ts');
  const envVariables = new Set<string>();

  files.forEach((file) => {
    const content = fs.readFileSync(file, 'utf8');
    const matches = content.match(/process\.env\.(\w+)/g);
    if (matches) {
      matches.forEach((match) => {
        const varName = match.split('.')[2];
        envVariables.add(varName);
      });
    }
  });

  logInfo(
    `Found ${envVariables.size} unique environment variables in the codebase.`,
  );
  return Array.from(envVariables);
}

function getEnvVariablesFromExample(exampleFilePath: string): string[] {
  logInfo('Reading environment variables from .env.example...');
  const exampleFileContent = fs.readFileSync(exampleFilePath, 'utf8');

  return exampleFileContent
    .split('\n')
    .map((line) => line.split('=')[0].trim())
    .filter((name) => name && !name.startsWith('#'));
}

function findMissingVariables(): void {
  const exampleFilePath = getExampleEnvFilePath();
  const codeEnvVariables = getEnvVariablesFromCode();
  const exampleEnvVariables = getEnvVariablesFromExample(exampleFilePath);

  const missingVariables = codeEnvVariables.filter(
    (variable) => !exampleEnvVariables.includes(variable),
  );

  if (missingVariables.length === 0) {
    logInfo('✅ All environment variables are listed in .env.example!');
    process.exit(0);
  } else {
    logError('❌ The following variables are missing in .env.example:');
    missingVariables.forEach((variable) => console.error(`  - ${variable}`));
    process.exit(1);
  }
}

findMissingVariables();
