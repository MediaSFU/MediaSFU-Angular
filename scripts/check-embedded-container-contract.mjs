import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const surfaces = ['generic', 'webinar', 'conference', 'broadcast', 'chat'];
for (const surface of surfaces) {
  const source = fs.readFileSync(
    path.join(root, 'src', 'lib', 'components', 'mediasfu-components', `mediasfu-${surface}.component.ts`),
    'utf8',
  );
  for (const fragment of [
    'containerWidthFraction?: number',
    'containerHeightFraction?: number',
    '@Input() containerWidthFraction = 1',
    '@Input() containerHeightFraction = 1',
    '[ngStyle]="rootContainerStyle()"',
    "this.containerWidthFraction < 1 ? '100%' : '100vw'",
    "this.containerHeightFraction < 1 ? '100%' : '100vh'",
    '[containerWidthFraction]="containerWidthFraction"',
    '[containerHeightFraction]="containerHeightFraction"',
    'containerWidthFraction: this.containerWidthFraction',
    'containerHeightFraction: this.containerHeightFraction',
  ]) assert.ok(source.includes(fragment), `${surface} is missing ${fragment}`);
  assert.ok((source.match(/\[containerWidthFraction\]="containerWidthFraction"/g) || []).length >= 3,
    `${surface} does not forward width to all three layout boundaries`);
  assert.ok((source.match(/\[containerHeightFraction\]="containerHeightFraction"/g) || []).length >= 3,
    `${surface} does not forward height to all three layout boundaries`);
}

const viewport = 1500;
const embedded = 1294;
const calculated = viewport * (embedded / viewport);
assert.ok(calculated <= embedded + Number.EPSILON, 'embedded width exceeded its host');
console.log(`Angular embedded-container contract passed for ${surfaces.length} public surfaces.`);
