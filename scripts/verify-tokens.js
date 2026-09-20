import fs from 'fs';
import path from 'path';

const distAssets = path.resolve('dist', 'assets');
const cssFiles = fs.readdirSync(distAssets).filter(f => f.endsWith('.css'));
if (cssFiles.length === 0) {
  console.error('No CSS files found in dist/assets!');
  process.exit(1);
}

const cssPath = path.join(distAssets, cssFiles[0]);
console.log('Reading generated CSS file:', cssPath);
const cssContent = fs.readFileSync(cssPath, 'utf8');

const checks = [
  'gorange',
  'solar-coral',
  'solar-amber',
  'font-display',
  'animate-float',
  'dark-950',
  '#FF5500',
  '#FF3366',
  '#FF8A00',
  '#07080D',
  '#8B5CF6',
];

console.log('\n--- TOKEN VERIFICATION RESULTS ---');
let allPassed = true;
for (const token of checks) {
  const present = cssContent.toLowerCase().includes(token.toLowerCase());
  console.log(`Token [${token}]: ${present ? '✔ GENERATED' : '✖ MISSING'}`);
  if (!present) allPassed = false;
}

if (allPassed) {
  console.log('\n✨ ALL TAILWIND V4 TOKENS VERIFIED GENERATED IN COMPILED CSS! ✨\n');
} else {
  console.error('\n❌ SOME TOKENS WERE NOT FOUND IN COMPILED CSS!\n');
  process.exit(1);
}
