import { types } from 'mediasoup-client';
type Producer = types.Producer;
type ProducerOptions = types.ProducerOptions;
type RtpCapabilities = types.RtpCapabilities;
type Transport = types.Transport;
type Device = types.Device;
import {
  AParamsType,
  CoHostResponsibility,
  EventType,
  HParamsType,
  Participant,
  Poll,
  ScreenParamsType,
  Stream,
  VidCons,
  VParamsType,
  ConsumeSocket,
  MeetingRoomParams,
  UserRecordingParams,
  ScreenState,
  AudioDecibels,
  CustomMediaComponent,
  GridSizes,
  Message,
  WaitingRoomParticipant,
  Request,
  BreakoutParticipant,
  WhiteboardUser,
  Shape,
  ResponseJoinRoom,
  ComponentSizes,
  Transport as TransportType,
} from '../../@types/types';
import { Socket } from 'socket.io-client';
import { SelfieSegmentation } from '@mediapipe/selfie_segmentation';

export interface InitialValuesStateType {
  roomName: string;
  member: string;
  adminPasscode: string;
  islevel: string;
  coHost: string;
  coHostResponsibility: CoHostResponsibility[];
  youAreCoHost: boolean;
  youAreHost: boolean;
  confirmedToRecord: boolean;
  meetingDisplayType: string;
  meetingVideoOptimized: boolean;
  eventType: EventType;
  participants: Participant[];
  filteredParticipants: Participant[];
  participantsCounter: number;
  participantsFilter: string;

  validated: boolean;
  localUIMode: boolean;
  socket: Socket;
  localSocket?: Socket;
  roomData: ResponseJoinRoom | null;
  device: Device | null;
  apiKey: string;
  apiUserName: string;
  apiToken: string;
  link: string;

  consume_sockets: ConsumeSocket[];
  rtpCapabilities: RtpCapabilities | null;
  roomRecvIPs: string[];
  meetingRoomParams: MeetingRoomParams | null;
  itemPageLimit: number;
  audioOnlyRoom: boolean;
  addForBasic: boolean;
  screenPageLimit: number;
  shareScreenStarted: boolean;
  shared: boolean;
  targetOrientation: string;
  targetResolution: string;
  targetResolutionHost: string;
  vidCons: VidCons;
  frameRate: number;
  hParams: HParamsType;
  vParams: VParamsType;
  screenParams: ScreenParamsType;
  aParams: AParamsType;

  // Recording Fields
  recordingAudioPausesLimit: number;
  recordingAudioPausesCount: number;
  recordingAudioSupport: boolean;
  recordingAudioPeopleLimit: number;
  recordingAudioParticipantsTimeLimit: number;
  recordingVideoPausesCount: number;
  recordingVideoPausesLimit: number;
  recordingVideoSupport: boolean;
  recordingVideoPeopleLimit: number;
  recordingVideoParticipantsTimeLimit: number;
  recordingAllParticipantsSupport: boolean;
  recordingVideoParticipantsSupport: boolean;
  recordingAllParticipantsFullRoomSupport: boolean;
  recordingVideoParticipantsFullRoomSupport: boolean;
  recordingPreferredOrientation: string;
  recordingSupportForOtherOrientation: boolean;
  recordingMultiFormatsSupport: boolean;

  userRecordingParams: UserRecordingParams;

  canRecord: boolean;
  startReport: boolean;
  endReport: boolean;
  recordTimerInterval: NodeJS.Timeout | null;
  recordStartTime: number;
  recordElapsedTime: number;
  isTimerRunning: boolean;
  canPauseResume: boolean;
  recordChangeSeconds: number;
  pauseLimit: number;
  pauseRecordCount: number;
  canLaunchRecord: boolean;
  stopLaunchRecord: boolean;

  // Room properties
  participantsAll: Participant[];
  firstAll: boolean;
  updateMainWindow: boolean;
  first_round: boolean;
  landScaped: boolean;
  lock_screen: boolean;
  screenId: string;
  allVideoStreams: (Participant | Stream)[];
  newLimitedStreams: (Participant | Stream)[];
  newLimitedStreamsIDs: string[];
  activeSounds: string[];
  screenShareIDStream: string;
  screenShareNameStream: string;
  adminIDStream: string;
  adminNameStream: string;
  youYouStream: (Participant | Stream)[];
  youYouStreamIDs: string[];
  localStream: MediaStream | null;
  recordStarted: boolean;
  recordResumed: boolean;
  recordPaused: boolean;
  recordStopped: boolean;
  adminRestrictSetting: boolean;
  videoRequestState: string | null;
  videoRequestTime: number;
  videoAction: boolean;
  localStreamVideo: MediaStream | null;
  userDefaultVideoInputDevice: string;
  currentFacingMode: string;
  prevFacingMode: string;
  defVideoID: string;
  allowed: boolean;
  dispActiveNames: string[];
  activeNames: string[];
  prevActiveNames: string[];
  p_activeNames: string[];
  p_dispActiveNames: string[];
  membersReceived: boolean;
  deferScreenReceived: boolean;
  hostFirstSwitch: boolean;
  micAction: boolean;
  screenAction: boolean;
  chatAction: boolean;
  audioRequestState: string | null;
  screenRequestState: string | null;
  chatRequestState: string | null;
  audioRequestTime: number;
  screenRequestTime: number;
  chatRequestTime: number;
  updateRequestIntervalSeconds: number;
  oldSoundIds: string[];
  hostLabel: string;
  mainScreenFilled: boolean;
  localStreamScreen: MediaStream | null;
  screenAlreadyOn: boolean;
  chatAlreadyOn: boolean;
  redirectURL: string;
  oldAllStreams: (Participant | Stream)[];
  adminVidID: string;
  streamNames: Stream[];
  non_alVideoStreams: Participant[];
  sortAudioLoudness: boolean;
  audioDecibels: AudioDecibels[];
  mixed_alVideoStreams: (Participant | Stream)[];
  non_alVideoStreams_muted: Participant[];
  paginatedStreams: (Participant | Stream)[][];
  localStreamAudio: MediaStream | null;
  defAudioID: string;
  userDefaultAudioInputDevice: string;
  userDefaultAudioOutputDevice: string;
  prevAudioInputDevice: string;
  prevVideoInputDevice: string;
  audioPaused: boolean;
  mainScreenPerson: string;
  adminOnMainScreen: boolean;
  screenStates: ScreenState[];
  prevScreenStates: ScreenState[];
  updateDateState: number | null;
  lastUpdate: number | null;
  nForReadjustRecord: number;
  fixedPageLimit: number;
  removeAltGrid: boolean;
  nForReadjust: number;
  reorderInterval: number;
  fastReorderInterval: number;
  lastReorderTime: number;
  audStreamNames: Stream[];
  currentUserPage: number;
  mainHeightWidth: number;
  prevMainHeightWidth: number;
  prevDoPaginate: boolean;
  doPaginate: boolean;
  shareEnded: boolean;
  lStreams: (Participant | Stream)[];
  chatRefStreams: (Participant | Stream)[];
  controlHeight: number;
  isWideScreen: boolean;
  isMediumScreen: boolean;
  isSmallScreen: boolean;
  addGrid: boolean;
  addAltGrid: boolean;
  gridRows: number;
  gridCols: number;
  altGridRows: number;
  altGridCols: number;
  numberPages: number;
  currentStreams: (Participant | Stream)[];
  showMiniView: boolean;
  nStream: MediaStream | null;
  defer_receive: boolean;
  allAudioStreams: (Participant | Stream)[];
  remoteScreenStream: Stream[];
  screenProducer: Producer | null;
  localScreenProducer: Producer | null;
  gotAllVids: boolean;
  paginationHeightWidth: number;
  paginationDirection: string;
  gridSizes: GridSizes;
  screenForceFullDisplay: boolean;
  mainGridStream: CustomMediaComponent[];
  otherGridStreams: CustomMediaComponent[][];
  audioOnlyStreams: CustomMediaComponent[];
  videoInputs: MediaDeviceInfo[];
  audioInputs: MediaDeviceInfo[];
  meetingProgressTime: string;
  meetingElapsedTime: number;
  ref_participants: Participant[];

  // New fields related to messaging, events, modals, and other UI states
  messages: Message[];
  startDirectMessage: boolean;
  directMessageDetails: Participant | null;
  showMessagesBadge: boolean;
  audioSetting: string;
  videoSetting: string;
  screenshareSetting: string;
  chatSetting: string;
  displayOption: string;
  autoWave: boolean;
  forceFullDisplay: boolean;
  prevForceFullDisplay: boolean;
  prevMeetingDisplayType: string;
  waitingRoomFilter: string;
  waitingRoomList: WaitingRoomParticipant[];
  waitingRoomCounter: number;
  filteredWaitingRoomList: WaitingRoomParticipant[];
  requestFilter: string;
  requestList: Request[];
  requestCounter: number;
  filteredRequestList: Request[];
  totalReqWait: number;
  alertVisible: boolean;
  alertMessage: string;
  alertType: 'success' | 'danger';
  alertDuration: number;
  progressTimerVisible: boolean;
  progressTimerValue: number;
  isMenuModalVisible: boolean;
  isRecordingModalVisible: boolean;
  isSettingsModalVisible: boolean;
  isRequestsModalVisible: boolean;
  isWaitingModalVisible: boolean;
  isCoHostModalVisible: boolean;
  isMediaSettingsModalVisible: boolean;
  isDisplaySettingsModalVisible: boolean;
  isParticipantsModalVisible: boolean;
  isMessagesModalVisible: boolean;
  isConfirmExitModalVisible: boolean;
  isConfirmHereModalVisible: boolean;
  isShareEventModalVisible: boolean;
  isLoadingModalVisible: boolean;

  recordingMediaOptions: string;
  recordingAudioOptions: string;
  recordingVideoOptions: string;
  recordingVideoType: string;
  recordingVideoOptimized: boolean;
  recordingDisplayType: 'video' | 'media' | 'all';
  recordingAddHLS: boolean;
  recordingNameTags: boolean;
  recordingBackgroundColor: string;
  recordingNameTagsColor: string;
  recordingAddText: boolean;
  recordingCustomText: string;
  recordingCustomTextPosition: string;
  recordingCustomTextColor: string;
  recordingOrientationVideo: string;
  clearedToResume: boolean;
  clearedToRecord: boolean;
  recordState: string;
  showRecordButtons: boolean;
  recordingProgressTime: string;
  audioSwitching: boolean;
  videoSwitching: boolean;
  videoAlreadyOn: boolean;
  audioAlreadyOn: boolean;
  componentSizes: ComponentSizes;
  hasCameraPermission: boolean;
  hasAudioPermission: boolean;
  transportCreated: boolean;
  localTransportCreated: boolean;
  transportCreatedVideo: boolean;
  transportCreatedAudio: boolean;
  transportCreatedScreen: boolean;
  producerTransport: Transport | null;
  localProducerTransport: Transport | null;
  videoProducer: Producer | null;
  localVideoProducer: Producer | null;
  params: ProducerOptions;
  videoParams: ProducerOptions;
  audioParams: ProducerOptions;
  audioProducer: Producer | null;
  localAudioProducer: Producer | null;
  consumerTransports: TransportType[];
  consumingTransports: string[];

  // Polls
  polls: Poll[];
  poll: Poll | null;
  isPollModalVisible: boolean;

  // Background
  customImage: string;
  selectedImage: string;
  segmentVideo: MediaStream | null;
  selfieSegmentation: SelfieSegmentation | null;
  pauseSegmentation: boolean;
  processedStream: MediaStream | null;
  keepBackground: boolean;
  backgroundHasChanged: boolean;
  virtualStream: MediaStream | null;
  mainCanvas: HTMLCanvasElement | null;
  prevKeepBackground: boolean;
  appliedBackground: boolean;
  isBackgroundModalVisible: boolean;
  autoClickBackground: boolean;

  // Breakout Rooms
  breakoutRooms: BreakoutParticipant[][];
  currentRoomIndex: number;
  canStartBreakout: boolean;
  breakOutRoomStarted: boolean;
  breakOutRoomEnded: boolean;
  hostNewRoom: number;
  limitedBreakRoom: BreakoutParticipant[];
  mainRoomsLength: number;
  memberRoom: number;
  isBreakoutRoomsModalVisible: boolean;

  // Whiteboard
  whiteboardUsers: WhiteboardUser[];
  currentWhiteboardIndex: number;
  canStartWhiteboard: boolean;
  whiteboardStarted: boolean;
  whiteboardEnded: boolean;
  whiteboardLimit: number;
  isWhiteboardModalVisible: boolean;
  isConfigureWhiteboardModalVisible: boolean;
  shapes: Shape[];
  useImageBackground: boolean;
  redoStack: Shape[];
  undoStack: string[];
  canvasStream: MediaStream | null;
  canvasWhiteboard: HTMLCanvasElement | null;

  // Screenboard
  canvasScreenboard: HTMLCanvasElement | null;
  processedScreenStream: MediaStream | null;
  annotateScreenStream: boolean;
  mainScreenCanvas: HTMLCanvasElement | null;
  isScreenboardModalVisible: boolean;

  // Control Buttons
  micActive: boolean;
  videoActive: boolean;
  screenShareActive: boolean;
  endCallActive: boolean;
  participantsActive: boolean;
  menuActive: boolean;
  commentsActive: boolean;
}

export const initialValuesState: InitialValuesStateType = {
  // The following are the initial values

  roomName: '',
  member: '',
  adminPasscode: '',
  islevel: '1',
  coHost: 'No coHost',
  coHostResponsibility: [
    { name: 'participants', value: false, dedicated: false },
    { name: 'media', value: false, dedicated: false },
    { name: 'waiting', value: false, dedicated: false },
    { name: 'chat', value: false, dedicated: false },
  ],
  youAreCoHost: false,
  youAreHost: false,
  confirmedToRecord: false,
  meetingDisplayType: 'media',
  meetingVideoOptimized: false,
  eventType: 'webinar',
  participants: [],
  filteredParticipants: [],
  participantsCounter: 0,
  participantsFilter: '',

  validated: false,
  localUIMode: false,
  socket: {} as Socket,
  localSocket: undefined,
  roomData: null,
  device: null,
  apiKey: '',
  apiUserName: '',
  apiToken: '',
  link: '',

  consume_sockets: [],
  rtpCapabilities: null,
  roomRecvIPs: [],
  meetingRoomParams: null,
  itemPageLimit: 4,
  audioOnlyRoom: false,
  addForBasic: false,
  screenPageLimit: 4,
  shareScreenStarted: false,
  shared: false,
  targetOrientation: 'landscape',
  targetResolution: 'sd',
  targetResolutionHost: 'sd',
  vidCons: { width: 640, height: 360 },
  frameRate: 10,
  hParams: {} as HParamsType,
  vParams: {} as VParamsType,
  screenParams: {} as ScreenParamsType,
  aParams: {} as AParamsType,

  // Initial Values for New Recording Fields
  recordingAudioPausesLimit: 0,
  recordingAudioPausesCount: 0,
  recordingAudioSupport: false,
  recordingAudioPeopleLimit: 0,
  recordingAudioParticipantsTimeLimit: 0,
  recordingVideoPausesCount: 0,
  recordingVideoPausesLimit: 0,
  recordingVideoSupport: false,
  recordingVideoPeopleLimit: 0,
  recordingVideoParticipantsTimeLimit: 0,
  recordingAllParticipantsSupport: false,
  recordingVideoParticipantsSupport: false,
  recordingAllParticipantsFullRoomSupport: false,
  recordingVideoParticipantsFullRoomSupport: false,
  recordingPreferredOrientation: 'landscape',
  recordingSupportForOtherOrientation: false,
  recordingMultiFormatsSupport: false,

  userRecordingParams: {
    mainSpecs: {
      mediaOptions: 'video',
      audioOptions: 'all',
      videoOptions: 'all',
      videoType: 'fullDisplay',
      videoOptimized: false,
      recordingDisplayType: 'media',
      addHLS: false,
    },
    dispSpecs: {
      nameTags: true,
      backgroundColor: '#000000',
      nameTagsColor: '#ffffff',
      orientationVideo: 'portrait',
    },
  },

  canRecord: false,
  startReport: false,
  endReport: false,
  recordTimerInterval: null,
  recordStartTime: 0,
  recordElapsedTime: 0,
  isTimerRunning: false,
  canPauseResume: false,
  recordChangeSeconds: 15000,
  pauseLimit: 0,
  pauseRecordCount: 0,
  canLaunchRecord: true,
  stopLaunchRecord: false,

  // Room properties
  participantsAll: [],
  firstAll: false,
  updateMainWindow: false,
  first_round: false,
  landScaped: false,
  lock_screen: false,
  screenId: '',
  allVideoStreams: [],
  newLimitedStreams: [],
  newLimitedStreamsIDs: [],
  activeSounds: [],
  screenShareIDStream: '',
  screenShareNameStream: '',
  adminIDStream: '',
  adminNameStream: '',
  youYouStream: [],
  youYouStreamIDs: [],
  localStream: null,
  recordStarted: false,
  recordResumed: false,
  recordPaused: false,
  recordStopped: false,
  adminRestrictSetting: false,
  videoRequestState: null,
  videoRequestTime: 0,
  videoAction: false,
  localStreamVideo: null,
  userDefaultVideoInputDevice: '',
  currentFacingMode: 'user',
  prevFacingMode: 'user',
  defVideoID: '',
  allowed: false,
  dispActiveNames: [],
  activeNames: [],
  prevActiveNames: [],
  p_activeNames: [],
  p_dispActiveNames: [],
  membersReceived: false,
  deferScreenReceived: false,
  hostFirstSwitch: false,
  micAction: false,
  screenAction: false,
  chatAction: false,
  audioRequestState: null,
  screenRequestState: null,
  chatRequestState: null,
  audioRequestTime: 0,
  screenRequestTime: 0,
  chatRequestTime: 0,
  updateRequestIntervalSeconds: 240,
  oldSoundIds: [],
  hostLabel: 'Host',
  mainScreenFilled: false,
  localStreamScreen: null,
  screenAlreadyOn: false,
  chatAlreadyOn: false,
  redirectURL: '',
  oldAllStreams: [],
  adminVidID: '',
  streamNames: [],
  non_alVideoStreams: [],
  sortAudioLoudness: false,
  audioDecibels: [],
  mixed_alVideoStreams: [],
  non_alVideoStreams_muted: [],
  paginatedStreams: [],
  localStreamAudio: null,
  defAudioID: '',
  userDefaultAudioInputDevice: '',
  userDefaultAudioOutputDevice: '',
  prevAudioInputDevice: '',
  prevVideoInputDevice: '',
  audioPaused: false,
  mainScreenPerson: '',
  adminOnMainScreen: false,
  screenStates: [{
    mainScreenPerson: "",
    mainScreenProducerId: "",
    mainScreenFilled: false,
    adminOnMainScreen: false,
  }],
  prevScreenStates: [{
    mainScreenPerson: "",
    mainScreenProducerId: "",
    mainScreenFilled: false,
    adminOnMainScreen: false,
  }],
  updateDateState: null,
  lastUpdate: null,
  nForReadjustRecord: 0,
  fixedPageLimit: 4,
  removeAltGrid: false,
  nForReadjust: 0,
  reorderInterval: 30000,
  fastReorderInterval: 10000,
  lastReorderTime: 0,
  audStreamNames: [],
  currentUserPage: 0,
  mainHeightWidth: 0,
  prevMainHeightWidth: 0,
  prevDoPaginate: false,
  doPaginate: false,
  shareEnded: false,
  lStreams: [],
  chatRefStreams: [],
  controlHeight: 0,
  isWideScreen: false,
  isMediumScreen: false,
  isSmallScreen: false,
  addGrid: false,
  addAltGrid: false,
  gridRows: 0,
  gridCols: 0,
  altGridRows: 0,
  altGridCols: 0,
  numberPages: 0,
  currentStreams: [],
  showMiniView: false,
  nStream: null,
  defer_receive: false,
  allAudioStreams: [],
  remoteScreenStream: [],
  screenProducer: null,
  localScreenProducer: null,
  gotAllVids: false,
  paginationHeightWidth: 40,
  paginationDirection: 'horizontal',
  gridSizes: { gridWidth: 0, gridHeight: 0, altGridWidth: 0, altGridHeight: 0 },
  screenForceFullDisplay: false,
  mainGridStream: [],
  otherGridStreams: [[], []],
  audioOnlyStreams: [],
  videoInputs: [],
  audioInputs: [],
  meetingProgressTime: '00:00:00',
  meetingElapsedTime: 0,
  ref_participants: [],

  // Messaging, event, modals, and other UI states
  messages: [],
  startDirectMessage: false,
  directMessageDetails: null,
  showMessagesBadge: false,
  audioSetting: 'allow',
  videoSetting: 'allow',
  screenshareSetting: 'allow',
  chatSetting: 'allow',
  displayOption: 'media',
  autoWave: true,
  forceFullDisplay: true,
  prevForceFullDisplay: false,
  prevMeetingDisplayType: 'video',
  waitingRoomFilter: '',
  waitingRoomList: [],
  waitingRoomCounter: 0,
  filteredWaitingRoomList: [],
  requestFilter: '',
  requestList: [],
  requestCounter: 0,
  filteredRequestList: [],
  totalReqWait: 0,
  alertVisible: false,
  alertMessage: '',
  alertType: 'success',
  alertDuration: 3000,
  progressTimerVisible: true,
  progressTimerValue: 0,
  isMenuModalVisible: false,
  isRecordingModalVisible: false,
  isSettingsModalVisible: false,
  isRequestsModalVisible: false,
  isWaitingModalVisible: false,
  isCoHostModalVisible: false,
  isMediaSettingsModalVisible: false,
  isDisplaySettingsModalVisible: false,
  isParticipantsModalVisible: false,
  isMessagesModalVisible: false,
  isConfirmExitModalVisible: false,
  isConfirmHereModalVisible: false,
  isShareEventModalVisible: false,
  isLoadingModalVisible: false,

  recordingMediaOptions: 'video',
  recordingAudioOptions: 'all',
  recordingVideoOptions: 'all',
  recordingVideoType: 'fullDisplay',
  recordingVideoOptimized: false,
  recordingDisplayType: 'video',
  recordingAddHLS: true,
  recordingNameTags: true,
  recordingBackgroundColor: '#83c0e9',
  recordingNameTagsColor: '#ffffff',
  recordingAddText: false,
  recordingCustomText: 'Add Text',
  recordingCustomTextPosition: 'top',
  recordingCustomTextColor: '#ffffff',
  recordingOrientationVideo: 'landscape',
  clearedToResume: true,
  clearedToRecord: true,
  recordState: 'green',
  showRecordButtons: false,
  recordingProgressTime: '00:00:00',
  audioSwitching: false,
  videoSwitching: false,
  videoAlreadyOn: false,
  audioAlreadyOn: false,
  componentSizes: { mainHeight: 0, otherHeight: 0, mainWidth: 0, otherWidth: 0 },
  hasCameraPermission: false,
  hasAudioPermission: false,
  transportCreated: false,
  localTransportCreated: false,
  transportCreatedVideo: false,
  transportCreatedAudio: false,
  transportCreatedScreen: false,
  producerTransport: null,
  localProducerTransport: null,
  videoProducer: null,
  localVideoProducer: null,
  params: {} as ProducerOptions,
  videoParams: {} as ProducerOptions,
  audioParams: {} as ProducerOptions,
  audioProducer: null,
  localAudioProducer: null,
  consumerTransports: [],
  consumingTransports: [],

  // Polls
  polls: [],
  poll: null,
  isPollModalVisible: false,

  // Background
  customImage: '',
  selectedImage: '',
  segmentVideo: null,
  selfieSegmentation: null,
  pauseSegmentation: false,
  processedStream: null,
  keepBackground: false,
  backgroundHasChanged: false,
  virtualStream: null,
  mainCanvas: null,
  prevKeepBackground: false,
  appliedBackground: false,
  isBackgroundModalVisible: false,
  autoClickBackground: false,

  // Breakout Rooms
  breakoutRooms: [],
  currentRoomIndex: 0,
  canStartBreakout: false,
  breakOutRoomStarted: false,
  breakOutRoomEnded: false,
  hostNewRoom: -1,
  limitedBreakRoom: [],
  mainRoomsLength: 0,
  memberRoom: -1,
  isBreakoutRoomsModalVisible: false,

  // Whiteboard
  whiteboardUsers: [],
  currentWhiteboardIndex: 0,
  canStartWhiteboard: false,
  whiteboardStarted: false,
  whiteboardEnded: false,
  whiteboardLimit: 4,
  isWhiteboardModalVisible: false,
  isConfigureWhiteboardModalVisible: false,
  shapes: [],
  useImageBackground: true,
  redoStack: [],
  undoStack: [],
  canvasStream: null,
  canvasWhiteboard: null,

  // Screenboard
  canvasScreenboard: null,
  processedScreenStream: null,
  annotateScreenStream: false,
  mainScreenCanvas: null,
  isScreenboardModalVisible: false,

  // Control Buttons
  micActive: false,
  videoActive: false,
  screenShareActive: false,
  endCallActive: false,
  participantsActive: false,
  menuActive: false,
  commentsActive: false,
};
