import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const manifestPath = fileURLToPath(new URL('../dist/package.json', import.meta.url));
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));

// ng-packagr copies the source package's files list. That list is relative to
// the repository root, not the publishable dist directory; keeping it would
// exclude the generated FESM bundle and declarations from npm's tarball.
delete manifest.files;
for (const field of ['module', 'es2022', 'fesm2022', 'typings', 'types', 'main']) {
  if (typeof manifest[field] === 'string' && manifest[field].startsWith('dist/')) {
    manifest[field] = manifest[field].slice('dist/'.length);
  }
}

writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
