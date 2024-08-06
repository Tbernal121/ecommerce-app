import { Logger } from '@nestjs/common';
import { spawn } from 'child_process';

const migrationName: string = process.argv[2];
if (!migrationName) {
  Logger.error('Migration name is required as a command-line argument.');
  process.exit(1);
}
const command: string = `npm run typeorm -- migration:generate -d "./src/database/data-source.ts" "./src/database/migrations/${migrationName}"`;

const [cmd, ...args] = command.split(' ');

const child = spawn(cmd, args, {
  stdio: 'inherit',
  shell: true,
});

child.on('close', (code) => {
  if (code !== 0) {
    Logger.error(`Migration generation failed with exit code ${code}`);
  } else {
    Logger.log('Migration generated successfully!');
  }
});
