// SDK parity (Oct 2026): screen-share audio prompt/player/listener, join-ack capability, connection-rejected messages.
// Run: node tests/sdkParity.test.cjs   (needs mediasfu-shared >= 1.3.0 in node_modules)
//
// Classes are compiled with TypeScript and run against a minimal @angular/core stand-in (decorators are no-ops), so
// the logic runs in plain Node without a browser. Templates are checked as source; the library build compiles them.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const shared = require('mediasfu-shared');

const root = path.resolve(__dirname, '..');
const lib = (relative) => path.join(root, 'src/lib', relative);

// ---------------------------------------------------------------------------------------------------------------
// @angular/core stand-in.
const decorator = () => () => undefined;
class EventEmitter {
  constructor() { this.handlers = []; }
  emit(value) { this.handlers.slice().forEach((fn) => fn(value)); }
  subscribe(fn) { this.handlers.push(fn); return { unsubscribe: () => { this.handlers = this.handlers.filter((h) => h !== fn); } }; }
}
const created = [];
const angularCore = {
  Component: decorator, Injectable: decorator, Input: decorator, Output: decorator, ViewChild: decorator,
  HostListener: decorator, Inject: decorator, Optional: decorator,
  EventEmitter,
  Injector: { create: ({ providers, parent }) => ({ providers, parent, get: (token) => providers.find((p) => p.provide === token)?.useValue }) },
  ApplicationRef: class {}, EnvironmentInjector: class {}, ElementRef: class {},
  inject: () => ({}),
  createComponent: (Component, { hostElement }) => {
    const instance = new Component();
    const ref = {
      instance, hostElement, hostView: { id: created.length }, inputs: {}, destroyed: false, checked: 0,
      setInput(key, value) { ref.inputs[key] = value; instance[key] = value; },
      changeDetectorRef: { detectChanges() { ref.checked += 1; } },
      destroy() { ref.destroyed = true; },
    };
    created.push(ref);
    return ref;
  },
};

// Minimal document for the prompt service and the player.
const docListeners = new Map();
const makeElement = (tag) => ({
  tag, attributes: {}, parent: null, children: [],
  setAttribute(key, value) { this.attributes[key] = value; },
  remove() { if (this.parent) this.parent.children.splice(this.parent.children.indexOf(this), 1); this.parent = null; },
});
const fakeDocument = {
  body: Object.assign(makeElement('body'), { appendChild(child) { child.parent = this; this.children.push(child); } }),
  head: Object.assign(makeElement('head'), { appendChild(child) { child.parent = this; this.children.push(child); } }),
  createElement: makeElement,
  getElementById: () => null,
  addEventListener: (type, fn) => { if (!docListeners.has(type)) docListeners.set(type, new Set()); docListeners.get(type).add(fn); },
  removeEventListener: (type, fn) => docListeners.get(type)?.delete(fn),
};
class FakeMediaStream {
  constructor(tracks = []) { this.tracks = tracks; }
  getTracks() { return this.tracks; }
}

// ---------------------------------------------------------------------------------------------------------------
const mocks = new Map([
  ['@angular/core', angularCore],
  ['@angular/common', { CommonModule: class CommonModule {} }],
]);
const stubs = new Map();
const cache = new Map();
function load(file) {
  file = path.resolve(file);
  if (stubs.has(file)) return stubs.get(file);
  if (cache.has(file)) return cache.get(file);
  const exports = {};
  cache.set(file, exports);
  const compiled = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true,
      experimentalDecorators: true, useDefineForClassFields: false,
    },
  }).outputText;
  vm.runInNewContext(compiled, {
    exports, console, setTimeout, clearTimeout, setInterval, clearInterval, Promise, Map, Set, WeakMap, Object, Error,
    Math, Number, String, Array, JSON, Date, Reflect,
    document: fakeDocument, window: { matchMedia: () => ({ matches: false }) }, MediaStream: FakeMediaStream,
    require: (name) => {
      if (mocks.has(name)) return mocks.get(name);
      if (name.startsWith('.')) {
        const base = path.resolve(path.dirname(file), name);
        return load(fs.existsSync(base + '.ts') ? base + '.ts' : path.join(base, 'index.ts'));
      }
      return require(name);
    },
  }, { filename: file });
  return exports;
}
const stub = (relative, exportName) => {
  const value = { [exportName]: class { static stubName = exportName; } };
  stubs.set(path.resolve(lib(relative)), value);
  return value[exportName];
};

const flush = () => new Promise((resolve) => setTimeout(resolve, 0));
const tests = [];
const test = (name, fn) => tests.push([name, fn]);

const MiniAudioStub = stub('components/display-components/mini-audio/mini-audio.component.ts', 'MiniAudio');
const MiniAudioPlayerStub = stub('methods/utils/mini-audio-player/mini-audio-player.component.ts', 'MiniAudioPlayer');

const promptFile = lib('components/misc-components/screen-audio-prompt/screen-audio-prompt.component.ts');
const { ScreenAudioPromptComponent } = load(promptFile);
const { ScreenAudioPromptService } = load(lib('components/misc-components/screen-audio-prompt/screen-audio-prompt.service.ts'));

test('prompt component: copy, choices, Esc and backdrop', () => {
  const source = fs.readFileSync(promptFile, 'utf8');
  for (const copy of ['Share audio too?', 'Screen + audio', 'Screen only', "'Cancel'", 'data-choice="audio"', 'data-choice="video"', 'data-choice="cancel"', 'role="dialog"', 'aria-modal="true"']) {
    assert.ok(source.includes(copy), `template/defaults include ${copy}`);
  }
  assert.match(source, /primaryButton\?\.nativeElement\.focus\(\)/, 'Screen + audio gets focus');

  const answers = [];
  let prompt = new ScreenAudioPromptComponent(null);
  prompt.choice.subscribe((value) => answers.push(value));
  prompt.choose('audio');
  prompt.choose('video'); // a second answer is ignored
  assert.deepEqual(answers, ['audio']);

  prompt = new ScreenAudioPromptComponent(null);
  prompt.choice.subscribe((value) => answers.push(value));
  prompt.onKeydown({ key: 'Enter' });
  prompt.onKeydown({ key: 'Escape' });
  assert.deepEqual(answers, ['audio', null]);

  prompt = new ScreenAudioPromptComponent(null);
  prompt.choice.subscribe((value) => answers.push(value));
  const scrim = {};
  prompt.onBackdropClick({ target: {}, currentTarget: scrim }); // inside the panel: ignored
  prompt.onBackdropClick({ target: scrim, currentTarget: scrim });
  assert.deepEqual(answers, ['audio', null, null]);

  prompt = new ScreenAudioPromptComponent({ title: 'Include sound?', isDarkMode: true, footnote: undefined });
  assert.equal(prompt.title, 'Include sound?');
  assert.ok(prompt.footnote.length > 0, 'undefined options keep the defaults');
  assert.equal(prompt.colors().accent, '#2dd4bf');
  prompt.isDarkMode = false;
  assert.equal(prompt.colors().accent, '#0d9488');
});

test('prompt: neutral surface with a teal accent, no purple', () => {
  const source = fs.readFileSync(promptFile, 'utf8');
  for (const purple of [/#(?:6366f1|7c3aed|8b5cf6|a855f7|9333ea|6d28d9|4f46e5|c084fc)/i, /purple|violet|indigo/i]) {
    assert.doesNotMatch(source, purple);
  }
});

test('ScreenAudioPromptService.ask mounts the prompt, resolves the answer and cleans up', async () => {
  const attached = [];
  const detached = [];
  const service = new ScreenAudioPromptService(
    { attachView: (view) => attached.push(view), detachView: (view) => detached.push(view) },
    {},
  );
  const pending = service.ask({ isDarkMode: true, title: undefined });
  const ref = created[created.length - 1];
  assert.equal(ref.instance instanceof ScreenAudioPromptComponent, true);
  assert.equal(ref.hostElement.attributes['data-screen-audio-prompt-root'], 'true');
  assert.equal(ref.hostElement.parent, fakeDocument.body);
  assert.deepEqual(Object.keys(ref.inputs), ['isDarkMode'], 'undefined options are not set');
  assert.equal(attached.length, 1);
  assert.ok(ref.checked >= 1, 'rendered immediately');
  ref.instance.choose('video');
  assert.equal(await pending, 'video');
  await flush();
  assert.equal(ref.destroyed, true);
  assert.equal(ref.hostElement.parent, null);
  assert.equal(detached.length, 1);

  // A custom prompt without a `choice` output cannot answer: share the screen without audio.
  class Silent {}
  assert.equal(await service.ask({ promptComponent: Silent }), 'video');
});

test('startShareScreen: prompt choices and modes drive the capture request', async () => {
  const { StartShareScreen } = load(lib('consumers/start-share-screen.service.ts'));
  const service = new StartShareScreen();
  const run = async ({ mode = 'ask', supports = true, enabled = true, capable = true, answer } = {}) => {
    const requests = [];
    let prompted = 0;
    let sharedState;
    await service.startShareScreen({
      parameters: {
        shared: false, onWeb: true, showAlert() {},
        updateShared: (value) => { sharedState = value; },
        supportsScreenAudio: supports, screenAudioEnabled: enabled, screenAudioMode: mode, displayAudioCapable: capable,
        screenAudioPrompt: async () => { prompted += 1; return answer; },
        mediaDevices: { getDisplayMedia: async (options) => { requests.push(options); return new FakeMediaStream(); } },
        streamSuccessScreen: async () => {},
      },
    });
    return { requests, prompted, sharedState };
  };
  let r = await run({ answer: 'audio' });
  assert.equal(r.prompted, 1);
  assert.ok(r.requests[0].audio, 'audio requested');
  r = await run({ answer: 'video' });
  assert.equal(r.requests[0].audio, false);
  r = await run({ answer: null });
  assert.equal(r.requests.length, 0, 'cancel captures nothing');
  assert.equal(r.sharedState, false);
  r = await run({ mode: 'always' });
  assert.equal(r.prompted, 0);
  assert.ok(r.requests[0].audio);
  r = await run({ mode: 'never' });
  assert.equal(r.prompted, 0);
  assert.equal(r.requests[0].audio, false);
  r = await run({ supports: false });
  assert.equal(r.prompted, 0, 'no capability: no prompt');
  assert.equal(r.requests[0].audio, false);
  r = await run({ capable: false });
  assert.equal(r.prompted, 0, 'unsupported browser: no prompt');
  assert.equal(r.requests[0].audio, false);
});

test('all five room components carry the screen-audio state, updaters, inputs and prompt', () => {
  for (const name of ['generic', 'conference', 'webinar', 'broadcast', 'chat']) {
    const source = fs.readFileSync(lib(`components/mediasfu-components/mediasfu-${name}.component.ts`), 'utf8');
    for (const needle of [
      'supportsScreenAudio = new BehaviorSubject<boolean>(false)',
      'screenAudioEnabled = new BehaviorSubject<boolean>(true)',
      "screenAudioMode = new BehaviorSubject<ScreenAudioMode>('ask')",
      'screenAudioProducer = new BehaviorSubject<Producer | null>(null)',
      'supportsScreenAudio: this.supportsScreenAudio.value',
      'screenAudioEnabled: this.screenAudioEnabled.value',
      'screenAudioMode: this.screenAudioMode.value',
      'screenAudioProducer: this.screenAudioProducer.value',
      'updateScreenAudioProducer: this.updateScreenAudioProducer.bind(this)',
      'updateSupportsScreenAudio: this.updateSupportsScreenAudio.bind(this)',
      'updateScreenAudioEnabled: this.updateScreenAudioEnabled.bind(this)',
      'updateScreenAudioMode: this.updateScreenAudioMode.bind(this)',
      "@Input('screenAudioMode')",
      "@Input('screenAudioEnabled')",
      '@Input() screenAudioPrompt?',
      'this.screenAudioPromptService.ask(',
    ]) {
      assert.ok(source.includes(needle), `${name}: missing ${needle}`);
    }
  }
});

const { ConsumerResume } = load(lib('consumers/consumer-resume.service.ts'));
const { ScreenAudioPlayer } = load(lib('methods/utils/screen-audio-player/screen-audio-player.component.ts'));

const resumeHarness = (participants) => {
  const calls = { audStreamNames: 0, prepopulate: 0, decibels: 0 };
  const state = { audioOnlyStreams: [], allAudioStreams: [], audStreamNames: [] };
  const params = {
    participants, member: 'listener', eventType: 'conference', meetingDisplayType: 'media', shared: false,
    shareScreenStarted: false, whiteboardStarted: false, whiteboardEnded: false, mainScreenFilled: true,
    hostLabel: 'Host', nStream: null, allVideoStreams: [], streamNames: [], updateMainWindow: false, first_round: false,
    lock_screen: false, oldAllStreams: [], gotAllVids: false, defer_receive: false, firstAll: false,
    remoteScreenStream: [], mainHeightWidth: 0,
    get audioOnlyStreams() { return state.audioOnlyStreams; },
    get allAudioStreams() { return state.allAudioStreams; },
    get audStreamNames() { return state.audStreamNames; },
    updateAudioOnlyStreams: (v) => { state.audioOnlyStreams = v; },
    updateAllAudioStreams: (v) => { state.allAudioStreams = v; },
    updateAudStreamNames: (v) => { calls.audStreamNames += 1; state.audStreamNames = v; },
    updateParticipantAudioDecibels: () => { calls.decibels += 1; },
    prepopulateUserMedia: async () => { calls.prepopulate += 1; },
    reorderStreams: async () => {},
    updateUpdateMainWindow() {}, updateAllVideoStreams() {}, updateStreamNames() {}, updateNStream() {},
    updateMainHeightWidth() {}, updateLock_screen() {}, updateFirstAll() {}, updateRemoteScreenStream() {},
    updateOldAllStreams() {}, updateShareScreenStarted() {}, updateGotAllVids() {}, updateScreenId() {},
    updateDefer_receive() {},
  };
  params.getUpdatedAllParams = () => params;
  return { params, state, calls };
};
const resume = (params, producerId, appData = {}) =>
  new ConsumerResume().consumerResume({
    track: { kind: 'audio' }, kind: 'audio', remoteProducerId: producerId,
    params: { id: 'c-' + producerId, producerId, kind: 'audio', rtpParameters: {} },
    parameters: params, nsock: {}, consumer: { appData, rtpReceiver: null },
  });

test('consumer-resume: tagged screen audio gets a ScreenAudioPlayer and no speaker state', async () => {
  const participants = [{ name: 'Alice', audioID: 'mic-a', videoID: '', ScreenID: 'scr-a', ScreenOn: true, islevel: '2' }];
  const { params, state, calls } = resumeHarness(participants);
  await resume(params, 'sa-1', { mediaTag: 'screen-audio' });
  assert.equal(state.audioOnlyStreams.length, 1);
  const entry = state.audioOnlyStreams[0];
  assert.equal(entry.component, ScreenAudioPlayer);
  assert.equal(entry.inputs.remoteProducerId, 'sa-1');
  assert.equal(entry.inputs.ownerName, 'Alice', 'owner falls back to the participant sharing the screen');
  assert.equal(entry.inputs.MiniAudioComponent, MiniAudioStub);
  assert.equal(state.allAudioStreams.map((s) => s.producerId).join(','), 'sa-1');
  assert.equal(calls.audStreamNames, 0);
  assert.equal(calls.prepopulate, 0);
  assert.equal(calls.decibels, 0);

  await resume(params, 'sa-1', { mediaTag: 'screen-audio' });
  assert.equal(state.audioOnlyStreams.length, 1, 're-consuming replaces the player');
  assert.equal(state.allAudioStreams.length, 1);
});

test('consumer-resume: ScreenAudioID identifies screen audio; a microphone still gets MiniAudioPlayer', async () => {
  const participants = [
    { name: 'Bob', audioID: 'mic-b', videoID: '', ScreenAudioID: 'sa-2', ScreenID: 'scr-b', ScreenOn: true, islevel: '1' },
  ];
  const { params, state, calls } = resumeHarness(participants);
  await resume(params, 'sa-2');
  assert.equal(state.audioOnlyStreams[0].component, ScreenAudioPlayer);
  assert.equal(state.audioOnlyStreams[0].inputs.ownerName, 'Bob');
  assert.equal(calls.audStreamNames, 0);
  await resume(params, 'mic-b');
  assert.equal(state.audioOnlyStreams.length, 2);
  assert.equal(state.audioOnlyStreams[1].component, MiniAudioPlayerStub);
  assert.equal(calls.audStreamNames, 1, 'the microphone is a speaker as before');
});

test('ScreenAudioPlayer: plays tagged audio, shows while sound plays, mutes locally', async () => {
  let level = 0;
  const consumer = { rtpReceiver: { getStats: async () => new Map([['a', { type: 'inbound-rtp', kind: 'audio', audioLevel: level }]]) } };
  const stream = new FakeMediaStream([{ kind: 'audio' }]);
  const injector = {};
  const player = new ScreenAudioPlayer(injector, stream, 'sa-3', consumer, 'Carol', undefined, MiniAudioStub, undefined, undefined);
  const audio = { srcObject: null, muted: false, volume: 1, plays: 0, play() { this.plays += 1; return Promise.resolve(); } };
  player.audioElement = { nativeElement: audio };
  player.ngAfterViewInit();
  await flush();
  assert.equal(audio.srcObject, stream);
  assert.ok(audio.plays >= 1);
  assert.equal(player.cardInputs().name, 'Carol · Screen audio');
  assert.equal(player.cardInputs().visible, false, 'hidden while silent');
  const silentInjector = player.cardInjector();
  assert.equal(player.cardInjector(), silentInjector, 'injector reused while nothing changes');

  level = 0.3;
  await new Promise((resolve) => setTimeout(resolve, 1100));
  assert.equal(player.cardInputs().visible, true, 'visible while sound plays');
  assert.equal(player.cardInputs().showWaveform, true);
  assert.notEqual(player.cardInjector(), silentInjector, 'card re-rendered when it becomes visible');
  assert.equal(player.cardInjector().get('name'), 'Carol · Screen audio');

  player.toggleMuted();
  assert.equal(audio.muted, true, 'mute is local to this listener');
  assert.equal(player.cardInputs().name, 'Carol · Screen audio (muted)');
  assert.equal(player.cardInputs().showWaveform, false);
  level = 0;
  await new Promise((resolve) => setTimeout(resolve, 1100));
  assert.equal(player.cardInputs().visible, true, 'stays visible while muted');
  player.ngOnDestroy();
  assert.equal(audio.srcObject, null);

  const template = fs.readFileSync(lib('methods/utils/screen-audio-player/screen-audio-player.component.ts'), 'utf8');
  assert.match(template, /data-screen-audio="true"/);
  assert.match(template, /\(click\)="toggleMuted\(\)"/);
});

test('UpdateRoomParametersClient records supportsScreenAudio from the join ack', () => {
  const { UpdateRoomParametersClient } = load(lib('producer-client/producer-client-emits/update-room-parameters-client.service.ts'));
  const service = new UpdateRoomParametersClient();
  const run = (supportsScreenAudio) => {
    let recorded;
    const base = {
      rtpCapabilities: {}, roomRecvIPs: [], meetingRoomParams: null, itemPageLimit: 4, audioOnlyRoom: false,
      addForBasic: false, screenPageLimit: 4, shareScreenStarted: false, shared: false, targetOrientation: 'landscape',
      vidCons: { width: 640, height: 360 }, recordingVideoSupport: false, frameRate: 10, adminPasscode: '',
      eventType: 'conference', youAreCoHost: false, autoWave: true, forceFullDisplay: true, chatSetting: 'allow',
      meetingDisplayType: 'media', audioSetting: 'allow', videoSetting: 'allow', screenshareSetting: 'allow',
      hParams: shared.hParams, vParams: shared.vParams, screenParams: shared.screenParams, aParams: shared.aParams,
      islevel: '1', showAlert() {},
      data: {
        rtpCapabilities: {}, roomRecvIPs: [], secureCode: '', success: true, recordOnly: false, isHost: false,
        safeRoom: false, autoStartSafeRoom: false, safeRoomStarted: false, safeRoomEnded: false,
        recordingParams: {}, meetingRoomParams: { type: 'conference', itemPageLimit: 4, mediaType: 'video' },
        ...(supportsScreenAudio === undefined ? {} : { supportsScreenAudio }),
      },
      updateSupportsScreenAudio: (value) => { recorded = value; },
    };
    const parameters = new Proxy(base, {
      get: (target, key) => (key in target ? target[key] : typeof key === 'string' && key.startsWith('update') ? () => {} : undefined),
    });
    const log = console.log;
    console.log = () => {};
    try {
      service.updateRoomParametersClient({ parameters });
    } finally {
      console.log = log;
    }
    return recorded;
  };
  assert.equal(run(true), true);
  assert.equal(run(false), false);
  assert.equal(run(undefined), false, 'older servers: video-only screen share');
});

test('welcome page shows the reason-specific sentence and does not count network-only failures', async () => {
  mocks.set('@angular/forms', { FormBuilder: class {}, FormGroup: class {}, Validators: { required: null, pattern: () => null, maxLength: () => null }, ReactiveFormsModule: class {} });
  mocks.set('ngx-cookie-service', { CookieService: class {} });
  mocks.set('@zxing/ngx-scanner', { ZXingScannerModule: class {} });
  mocks.set('@fortawesome/angular-fontawesome', { FontAwesomeModule: class {} });
  mocks.set('@fortawesome/free-solid-svg-icons', { faQrcode: {} });
  for (const primitive of ['modern-button', 'modern-entry-shell', 'modern-field', 'modern-surface']) {
    stubs.set(path.resolve(lib(`modern/primitives/${primitive}.component.ts`)), {});
  }
  const { WelcomePage } = load(lib('components/misc-components/welcome-page/welcome-page.component.ts'));
  const cookies = new Map();
  const cookieService = { get: (key) => cookies.get(key) || '', set: (key, value) => cookies.set(key, value) };
  const attempt = async (error) => {
    const alerts = [];
    const page = new WelcomePage({ group: () => ({}) }, cookieService, {
      showAlert: (alert) => alerts.push(alert), updateIsLoadingModalVisible() {},
      connectSocket: async () => { throw error; },
    });
    await page.checkLimitsAndMakeRequest('room1', 't'.repeat(64), 'https://media.mediasfu.com/room1', 'Ann');
    return alerts;
  };
  let alerts = await attempt(new shared.MediaSocketConnectError({ phase: 'rejected', reason: 'invalid-credentials', stage: 'api-check-rejected', elapsedMs: 92 }));
  assert.equal(alerts[0].message, 'The room did not accept these credentials. Check the room ID and your access, or rejoin the room.');
  assert.equal(cookies.get('unsuccessfulAttempts'), '1', 'a refusal counts');
  alerts = await attempt(new shared.MediaSocketConnectError({ phase: 'before-open', elapsedMs: 300, online: false }));
  assert.equal(alerts[0].message, 'You appear to be offline. Check your internet connection and try again.');
  assert.equal(cookies.get('unsuccessfulAttempts'), '1', 'a network-only failure does not count');
  alerts = await attempt(new Error('boom'));
  assert.equal(alerts[0].message, 'Unable to connect. Check your credentials and try again.');

  const preJoin = fs.readFileSync(lib('components/misc-components/pre-join-page/pre-join-page.component.ts'), 'utf8');
  assert.match(preJoin, /describeMediaSocketError\(error,/);
});

test('package exports the screen-audio and connection-error API', () => {
  const api = fs.readFileSync(path.join(root, 'src/public-api.ts'), 'utf8');
  for (const name of [
    'connectSendTransportScreenAudio', 'disconnectSendTransportScreenAudio', 'toggleScreenAudio', 'setScreenAudioVolume',
    'isScreenAudioProducer', 'canCaptureDisplayAudio', 'MediaSocketConnectError', 'describeMediaSocketError',
    'isRetryableMediaSocketError',
  ]) {
    assert.ok(api.includes(name), `public-api exports ${name}`);
    assert.ok(shared[name], `mediasfu-shared provides ${name}`);
  }
  assert.match(api, /screen-audio-prompt\.component/);
  assert.match(api, /screen-audio-prompt\.service/);
  assert.match(api, /screen-audio-player\.component/);
});

(async () => {
  let failed = 0;
  for (const [name, fn] of tests) {
    try {
      await fn();
      console.log('ok -', name);
    } catch (error) {
      failed += 1;
      console.error('FAIL -', name, '\n', error);
    }
  }
  console.log((tests.length - failed) + '/' + tests.length + ' passed');
  process.exit(failed ? 1 : 0);
})();
