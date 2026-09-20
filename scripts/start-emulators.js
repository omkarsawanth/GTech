import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

// Ensure Java 21 is prioritized if installed on Windows
const java21Candidate = 'C:\\Program Files\\Java\\jdk-21.0.12.1';
if (fs.existsSync(java21Candidate)) {
  process.env.JAVA_HOME = java21Candidate;
  process.env.PATH = `${path.join(java21Candidate, 'bin')}${path.delimiter}${process.env.PATH}`;
}

const firebaseCliPath = path.resolve(
  process.env.APPDATA || '',
  'npm/node_modules/firebase-tools/lib/bin/firebase.js'
);

const args = ['emulators:start', '--only', 'auth,firestore', '--project', 'demo-kalpa-test'];

console.log('[Kalpa Emulators] Starting Firebase Auth & Firestore Emulators...');
console.log(`[Kalpa Emulators] Project: demo-kalpa-test | Auth: 9099 | Firestore: 8080`);

const emulatorProc = spawn(process.execPath, [firebaseCliPath, ...args], {
  stdio: 'inherit',
  env: {
    ...process.env,
    FIREBASE_PROJECT_ID: 'demo-kalpa-test',
  },
});

emulatorProc.on('exit', (code) => {
  process.exit(code || 0);
});

process.on('SIGINT', () => {
  emulatorProc.kill('SIGINT');
});
process.on('SIGTERM', () => {
  emulatorProc.kill('SIGTERM');
});
