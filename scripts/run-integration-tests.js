import { spawn, execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

// 1. Ensure Java 21 runtime is available and configured
const java21Candidate = 'C:\\Program Files\\Java\\jdk-21.0.12.1';
if (fs.existsSync(java21Candidate)) {
  process.env.JAVA_HOME = java21Candidate;
  process.env.PATH = `${path.join(java21Candidate, 'bin')}${path.delimiter}${process.env.PATH}`;
}

const firebaseCliPath = path.resolve(
  process.env.APPDATA || '',
  'npm/node_modules/firebase-tools/lib/bin/firebase.js'
);

// Safety assertion to guarantee we never touch real projects
process.env.NODE_ENV = 'test';
process.env.FIREBASE_PROJECT_ID = 'demo-kalpa-test';
process.env.FIRESTORE_EMULATOR_HOST = '127.0.0.1:8080';
process.env.FIREBASE_AUTH_EMULATOR_HOST = '127.0.0.1:9099';
process.env.PORT = '5001';

console.log('\n=============================================================');
console.log('  KALPA INTEGRATION TEST SUITE RUNNER');
console.log('  Target: Local Firebase Emulators (Auth: 9099, Firestore: 8080)');
console.log('  Project ID: demo-kalpa-test (ISOLATED - ZERO CLOUD IMPACT)');
console.log('=============================================================\n');

async function waitForPort(name, url, timeoutMs = 60000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.status < 500) {
        console.log(`       ✔ ${name} verified responding at ${url}`);
        return true;
      }
    } catch {
      // Not ready yet
    }
    await new Promise((r) => setTimeout(r, 600));
  }
  throw new Error(`Timeout waiting for ${name} at ${url}`);
}

function killProcessTree(pid) {
  if (!pid) return;
  try {
    if (process.platform === 'win32') {
      execSync(`taskkill /F /T /PID ${pid}`, { stdio: 'ignore' });
    } else {
      process.kill(-pid, 'SIGKILL');
    }
  } catch {
    // Process might already have exited
  }
}

async function run() {
  console.log('[1/3] Spawning Firebase Auth & Firestore Emulators...');

  const emulatorCmd = process.platform === 'win32' ? 'firebase.cmd' : 'firebase';
  const emulatorProc = spawn(
    emulatorCmd,
    ['emulators:start', '--only', 'auth,firestore', '--project', 'demo-kalpa-test'],
    {
      stdio: ['ignore', 'pipe', 'pipe'],
      shell: process.platform === 'win32',
      env: {
        ...process.env,
        CI: 'true',
        FIREBASE_PROJECT_ID: 'demo-kalpa-test',
      },
    }
  );

  let emulatorOutput = '';
  emulatorProc.stdout.on('data', (d) => {
    emulatorOutput += d.toString();
    const str = d.toString().trim();
    if (str) {
      console.log('       [emulator]', str.replace(/\n/g, '\n       [emulator] '));
    }
  });
  emulatorProc.stderr.on('data', (d) => {
    emulatorOutput += d.toString();
    const str = d.toString().trim();
    if (str) console.error('       [emulator err]', str.replace(/\n/g, '\n       [emulator err] '));
  });

  emulatorProc.on('exit', (code) => {
    if (code !== 0 && code !== null) {
      console.error('[Emulator Crash Output]:\n', emulatorOutput);
    }
  });

  try {
    console.log('[2/3] Waiting for Auth (9099) and Firestore (8080) to be ready (up to 60s)...');
    await Promise.all([
      waitForPort('Firebase Auth Emulator', 'http://127.0.0.1:9099/'),
      waitForPort('Firebase Firestore Emulator', 'http://127.0.0.1:8080/'),
    ]);
    console.log('       ✔ Firebase Auth Emulator active on 127.0.0.1:9099');
    console.log('       ✔ Firebase Firestore Emulator active on 127.0.0.1:8080\n');

    console.log('[3/3] Running Vitest Integration Test Suites...\n');

    const vitestMjs = path.resolve('node_modules', 'vitest', 'vitest.mjs');

    const testExitCode = await new Promise((resolve) => {
      const testProc = spawn(
        process.execPath,
        [vitestMjs, 'run', '--reporter=verbose'],
        {
          stdio: 'inherit',
          env: {
            ...process.env,
            NODE_ENV: 'test',
            FIREBASE_PROJECT_ID: 'demo-kalpa-test',
            FIRESTORE_EMULATOR_HOST: '127.0.0.1:8080',
            FIREBASE_AUTH_EMULATOR_HOST: '127.0.0.1:9099',
            PORT: '5001',
          },
        }
      );

      testProc.on('exit', (code) => resolve(code || 0));
    });

    console.log('\n[Teardown] Gracefully shutting down emulators...');
    killProcessTree(emulatorProc.pid);

    if (testExitCode === 0) {
      console.log('\n✨ ALL INTEGRATION & SECURITY RULES TESTS PASSED SUCCESSFULLY! ✨\n');
    } else {
      console.error(`\n❌ Integration tests failed with exit code: ${testExitCode}\n`);
    }

    process.exit(testExitCode);
  } catch (err) {
    console.error('\n❌ Test run failed:', err.message);
    if (emulatorOutput) {
      console.error('\n[Emulator Logs]:\n', emulatorOutput);
    }
    killProcessTree(emulatorProc.pid);
    process.exit(1);
  }
}

run();
