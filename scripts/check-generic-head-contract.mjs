import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const read = (path) => readFileSync(resolve(path), 'utf8');
const generic = read('src/lib/components/mediasfu-components/mediasfu-generic.component.ts');
const head = read('src/lib/modern/mediasfu-components/modern-mediasfu-generic-head.component.ts');
const publicApi = read('src/public-api.ts');

const requireText = (source, text, message) => {
  if (!source.includes(text)) throw new Error(message);
};

requireText(generic, '<ng-template #standardUiTemplate>', 'generic must declare its exact UI template');
requireText(generic, '*ngIf="!renderUIExternally"', 'generic must suppress only its local outlet');
requireText(generic, '*ngIf="hasStandardUI && !customMainComponent"', 'external rendering must retain the complete standard tree');
requireText(generic, '*ngIf="hasStandardUI && !customMainComponent"', 'external rendering must retain the complete standard tree');
requireText(generic, 'renderModernMediasfuUITemplate: this.standardUiTemplate', 'generic must publish the declared template');
requireText(head, 'this.parameters?.getCurrentParams?.() ?? this.parameters', 'head must use the pure current reader');
if (head.includes('getUpdatedAllParams')) throw new Error('head must never invoke the publishing getter');
if (/import\s+.*MediasfuGeneric/.test(head)) throw new Error('head must not instantiate another room engine');
requireText(publicApi, 'modern-mediasfu-generic-head.component', 'head must be publicly exported');

console.log('Angular ModernMediasfuGenericHead contract passed');
