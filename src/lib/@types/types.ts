// types.ts
import { Socket } from 'socket.io-client';
import {
  Consumer,
  DtlsParameters,
  IceCandidate,
  IceParameters,
  RtpCapabilities,
} from 'mediasoup-client/lib/types';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { CustomComponent } from '../components/display-components/control-buttons-component/control-buttons-component.component';
import { CustomButton } from '../components/menu-components/custom-buttons/custom-buttons.component';
import { ComponentType } from '@angular/cdk/portal';

// //consumers/socket-receive-methods
export * from '../consumers/socket-receive-methods/join-consume-room.service';
export * from '../consumers/socket-receive-methods/producer-closed.service';
export * from '../consumers/socket-receive-methods/new-pipe-producer.service';

// Consumers
export * from '../consumers/add-videos-grid.service';
export * from '../consumers/auto-adjust.service';
export * from '../consumers/calculate-rows-and-columns.service';
export * from '../consumers/change-vids.service';
export * from '../consumers/check-grid.service';
export * from '../consumers/check-permission.service';
export * from '../consumers/check-screen-share.service';
export * from '../consumers/close-and-resize.service';
export * from '../consumers/compare-active-names.service';
export * from '../consumers/compare-screen-states.service';
export * from '../consumers/connect-ips.service';
export * from '../consumers/connect-local-ips.service';
export * from '../consumers/connect-recv-transport.service';
export * from '../consumers/connect-send-transport.service';
export * from '../consumers/connect-send-transport-audio.service';
export * from '../consumers/connect-send-transport-screen.service';
export * from '../consumers/connect-send-transport-video.service';
export * from '../consumers/consumer-resume.service';
export * from '../consumers/control-media.service';
export * from '../consumers/create-send-transport.service';
export * from '../consumers/disconnect-send-transport-audio.service';
export * from '../consumers/disconnect-send-transport-video.service';
export * from '../consumers/disconnect-send-transport-screen.service';
export * from '../consumers/disp-streams.service';
export * from '../consumers/generate-page-content.service';
export * from '../consumers/get-estimate.service';
export * from '../consumers/get-piped-producers-alt.service';
export * from '../consumers/get-producers-piped.service';
export * from '../consumers/get-videos.service';
export * from '../consumers/mix-streams.service';
export * from '../consumers/on-screen-changes.service';
export * from '../consumers/prepopulate-user-media.service';
export * from '../consumers/process-consumer-transports.service';
export * from '../consumers/process-consumer-transports-audio.service';
export * from '../consumers/readjust.service';
export * from '../consumers/receive-all-piped-transports.service';
export * from '../consumers/reorder-streams.service';
export * from '../consumers/re-port.service';
export * from '../consumers/request-screen-share.service';
export * from '../consumers/resume-pause-audio-streams.service';
export * from '../consumers/resume-pause-streams.service';
export * from '../consumers/resume-send-transport-audio.service';
export * from '../consumers/re-update-inter.service';
export * from '../consumers/signal-new-consumer-transport.service';
export * from '../consumers/start-share-screen.service';
export * from '../consumers/stop-share-screen.service';
export * from '../consumers/stream-success-audio.service';
export * from '../consumers/stream-success-audio-switch.service';
export * from '../consumers/stream-success-screen.service';
export * from '../consumers/stream-success-video.service';
export * from '../consumers/switch-user-audio.service';
export * from '../consumers/switch-user-video.service';
export * from '../consumers/switch-user-video-alt.service';
export * from '../consumers/trigger.service';
export * from '../consumers/update-mini-cards-grid.service';
export * from '../consumers/update-participant-audio-decibels.service';

// Utils
export * from '../methods/utils/producer/a-params.service';
export * from '../methods/utils/producer/h-params.service';
export * from '../methods/utils/producer/screen-params.service';
export * from '../methods/utils/producer/v-params.service';
export * from '../methods/background-methods/launch-background.service';
export * from '../methods/breakout-room-methods/launch-breakout-rooms.service';
export * from '../methods/breakout-room-methods/breakout-room-updated.service';
export * from '../methods/co-host-methods/launch-co-host.service';
export * from '../methods/co-host-methods/modify-co-host-settings.service';
export * from '../methods/display-settings-methods/launch-display-settings.service';
export * from '../methods/display-settings-methods/modify-display-settings.service';
export * from '../methods/exit-methods/launch-confirm-exit.service';
export * from '../methods/exit-methods/confirm-exit.service';
export * from '../methods/media-settings-methods/launch-media-settings.service';
export * from '../methods/menu-methods/launch-menu-modal.service';
export * from '../methods/message-methods/launch-messages.service';
export * from '../methods/message-methods/send-message.service';
export * from '../methods/participants-methods/launch-participants.service';
export * from '../methods/participants-methods/message-participants.service';
export * from '../methods/participants-methods/mute-participants.service';
export * from '../methods/participants-methods/remove-participants.service';
export * from '../methods/polls-methods/handle-create-poll.service';
export * from '../methods/polls-methods/handle-end-poll.service';
export * from '../methods/polls-methods/handle-vote-poll.service';
export * from '../methods/polls-methods/launch-poll.service';
export * from '../methods/polls-methods/poll-updated.service';
export * from '../methods/recording-methods/check-pause-state.service';
export * from '../methods/recording-methods/check-resume-state.service';
export * from '../methods/recording-methods/confirm-recording.service';
export * from '../methods/recording-methods/launch-recording.service';
export * from '../methods/recording-methods/record-pause-timer.service';
export * from '../methods/recording-methods/record-resume-timer.service';
export * from '../methods/recording-methods/record-start-timer.service';
export * from '../methods/recording-methods/record-update-timer.service';
export * from '../methods/recording-methods/start-recording.service';
export * from '../methods/recording-methods/stop-recording.service';
export * from '../methods/recording-methods/update-recording.service';
export * from '../methods/requests-methods/launch-requests.service';
export * from '../methods/requests-methods/respond-to-requests.service';
export * from '../methods/settings-methods/launch-settings.service';
export * from '../methods/settings-methods/modify-settings.service';
export * from '../methods/stream-methods/click-audio.service';
export * from '../methods/stream-methods/click-chat.service';
export * from '../methods/stream-methods/click-screen-share.service';
export * from '../methods/stream-methods/click-video.service';
export * from '../methods/stream-methods/switch-audio.service';
export * from '../methods/stream-methods/switch-video.service';
export * from '../methods/stream-methods/switch-video-alt.service';

export * from '../methods/utils/join-room-on-media-sfu.service';
export * from '../methods/utils/meeting-timer/start-meeting-progress-timer.service';
export * from '../methods/utils/mini-audio-player/mini-audio-player.component';
export * from '../methods/utils/format-number.service';
export * from '../methods/utils/generate-random-messages.service';
export * from '../methods/utils/generate-random-participants.service';
export * from '../methods/utils/generate-random-polls.service';
export * from '../methods/utils/generate-random-request-list.service';
export * from '../methods/utils/generate-random-waiting-room-list.service';
export * from '../methods/utils/get-modal-position.util';
export * from '../methods/utils/get-overlay-position.util';
export * from '../methods/utils/sleep.util';
export * from '../methods/utils/validate-alphanumeric.service';

// Waiting Methods
export * from '../methods/waiting-methods/launch-waiting.service';
export * from '../methods/waiting-methods/respond-to-waiting.service';

// Whiteboard Methods
export * from '../methods/whiteboard-methods/launch-configure-whiteboard.service';
export * from '../methods/whiteboard-methods/capture-canvas-stream.service';

// Producer Client Emits
export * from '../producer-client/producer-client-emits/create-device-client.service';
export * from '../producer-client/producer-client-emits/join-room-client.service';
export * from '../producer-client/producer-client-emits/update-room-parameters-client.service';

// Producers Emits
export * from '../producers/producer-emits/join-con-room.service';
export * from '../producers/producer-emits/join-room.service';
export * from '../producers/producer-emits/join-local-room.service';

// Socket Receive Methods
export * from '../producers/socket-receive-methods/all-members.service';
export * from '../producers/socket-receive-methods/all-members-rest.service';
export * from '../producers/socket-receive-methods/all-waiting-room-members.service';
export * from '../producers/socket-receive-methods/ban-participant.service';
export * from '../producers/socket-receive-methods/control-media-host.service';
export * from '../producers/socket-receive-methods/disconnect.service';
export * from '../producers/socket-receive-methods/disconnect-user-self.service';
export * from '../producers/socket-receive-methods/get-domains.service';
export * from '../producers/socket-receive-methods/host-request-response.service';
export * from '../producers/socket-receive-methods/meeting-ended.service';
export * from '../producers/socket-receive-methods/meeting-still-there.service';
export * from '../producers/socket-receive-methods/meeting-time-remaining.service';
export * from '../producers/socket-receive-methods/participant-requested.service';
export * from '../producers/socket-receive-methods/person-joined.service';
export * from '../producers/socket-receive-methods/producer-media-closed.service';
export * from '../producers/socket-receive-methods/producer-media-paused.service';
export * from '../producers/socket-receive-methods/producer-media-resumed.service';
export * from '../producers/socket-receive-methods/re-initiate-recording.service';
export * from '../producers/socket-receive-methods/receive-message.service';
export * from '../producers/socket-receive-methods/recording-notice.service';
export * from '../producers/socket-receive-methods/room-record-params.service';
export * from '../producers/socket-receive-methods/screen-producer-id.service';
export * from '../producers/socket-receive-methods/start-records.service';
export * from '../producers/socket-receive-methods/stopped-recording.service';
export * from '../producers/socket-receive-methods/time-left-recording.service';
export * from '../producers/socket-receive-methods/update-consuming-domains.service';
export * from '../producers/socket-receive-methods/update-media-settings.service';
export * from '../producers/socket-receive-methods/updated-co-host.service';
export * from '../producers/socket-receive-methods/user-waiting.service';

// Sockets
export * from '../sockets/socket-manager.service';

// Components
export * from '../components/background-components/background-modal/background-modal.component';
export * from '../components/breakout-components/breakout-rooms-modal.component';
export * from '../components/co-host-components/co-host-modal/co-host-modal.component';
export * from '../components/display-components/alert-component/alert.component.component';
export * from '../components/display-components/audio-card/audio-card.component';
export * from '../components/display-components/audio-grid/audio-grid.component';
export * from '../components/display-components/card-video-display/card-video-display.component';
export * from '../components/display-components/control-buttons-component/control-buttons-component.component';
export * from '../components/display-components/control-buttons-alt-component/control-buttons-alt-component.component';
export * from '../components/display-components/control-buttons-component-touch/control-buttons-component-touch.component';
export * from '../components/display-components/flexible-grid/flexible-grid.component';
export * from '../components/display-components/flexible-video/flexible-video.component';
export * from '../components/display-components/loading-modal/loading-modal.component';
export * from '../components/display-components/main-aspect-component/main-aspect-component.component';
export * from '../components/display-components/main-container-component/main-container-component.component';
export * from '../components/display-components/main-grid-component/main-grid-component.component';
export * from '../components/display-components/main-screen-component/main-screen-component.component';
export * from '../components/display-components/meeting-progress-timer/meeting-progress-timer.component';
export * from '../components/display-components/mini-audio/mini-audio.component';
export * from '../components/display-components/mini-card/mini-card.component';
export * from '../components/display-components/mini-card-audio/mini-card-audio.component';
export * from '../components/display-components/other-grid-component/other-grid-component.component';
export * from '../components/display-components/pagination/pagination.component';
export * from '../components/display-components/sub-aspect-component/sub-aspect-component.component';
export * from '../components/display-components/video-card/video-card.component';
export * from '../components/display-settings-components/display-settings-modal.component';
export * from '../components/event-settings-components/event-settings-modal/event-settings-modal.component';
export * from '../components/exit-components/confirm-exit-modal/confirm-exit-modal.component';
export * from '../components/media-settings-components/media-settings-modal/media-settings-modal.component';
export * from '../components/menu-components/menu-modal/menu-modal.component';
export * from '../components/message-components/messages-modal/messages-modal.component';
export * from '../components/misc-components/confirm-here-modal/confirm-here-modal.component';
export * from '../components/misc-components/pre-join-page/pre-join-page.component';
export * from '../components/misc-components/share-event-modal/share-event-modal.component';
export * from '../components/misc-components/welcome-page/welcome-page.component';
export * from '../components/participants-components/participants-modal/participants-modal.component';
export * from '../components/polls-components/poll-modal/poll-modal.component';
export * from '../components/recording-components/recording-modal/recording-modal.component';
export * from '../components/requests-components/requests-modal/requests-modal.component';
export * from '../components/screenboard-components/screenboard/screenboard.component';
export * from '../components/screenboard-components/screenboard-modal/screenboard-modal.component';
export * from '../components/waiting-components/waiting-room-modal.component';
export * from '../components/whiteboard-components/configure-whiteboard-modal/configure-whiteboard-modal.component';
export * from '../components/whiteboard-components/whiteboard/whiteboard.component';
export * from '../components/menu-components/custom-buttons/custom-buttons.component';

export * from '../methods/utils/join-room-on-media-sfu.service';


export interface Participant {
  id?: string;
  audioID: string;
  videoID: string;
  ScreenID?: string;
  ScreenOn?: boolean;
  islevel?: string;
  isAdmin?: boolean;
  isHost?: boolean; // Community Edition support
  name: string;
  muted?: boolean;
  isBanned?: boolean;
  isSuspended?: boolean;
  useBoard?: boolean;
  breakRoom?: number | null;
  [key: string]: any;
}

export interface Stream {
  producerId: string;
  muted?: boolean;
  stream?: MediaStream;
  socket_?: Socket;
  name?: string;
  [key: string]: any;
}

export interface Request {
  id: string;
  icon: string;
  name?: string;
  username?: string;
  [key: string]: any;
}

export interface RequestResponse {
  id: string;
  icon?: string;
  name?: string;
  username?: string;
  action?: string;
  type?: string;
  [key: string]: any;
}

export interface Transport {
  producerId: string;
  consumer: Consumer;
  socket_: Socket;
  serverConsumerTransportId: string;
  [key: string]: any;
}

export interface ScreenState {
  mainScreenPerson?: string;
  mainScreenProducerId?: string;
  mainScreenFilled: boolean;
  adminOnMainScreen: boolean;
}

export interface GridSizes {
  gridWidth?: number;
  gridHeight?: number;
  altGridWidth?: number;
  altGridHeight?: number;
}

export interface ComponentSizes {
  mainWidth: number;
  mainHeight: number;
  otherWidth: number;
  otherHeight: number;
}

export interface AudioDecibels {
  name: string;
  averageLoudness: number;
}

export type ShowAlert = (options: {
  message: string;
  type: 'success' | 'danger';
  duration?: number;
}) => void;

export interface CoHostResponsibility {
  name: string;
  value: boolean;
  dedicated: boolean;
}

export interface VidCons {
  width: number | { ideal?: number; max?: number; min?: number };
  height: number | { ideal?: number; max?: number; min?: number };
}

export type Settings = [string, string, string, string];

export interface Message {
  sender: string;
  receivers: string[];
  message: string;
  timestamp: string;
  group: boolean;
}

export type MainSpecs = {
  mediaOptions: string;
  audioOptions: string;
  videoOptions: string;
  videoType: string;
  videoOptimized: boolean;
  recordingDisplayType: 'video' | 'media' | 'all';
  addHLS: boolean;
};

export type DispSpecs = {
  nameTags: boolean;
  backgroundColor: string;
  nameTagsColor: string;
  orientationVideo: string;
};

export type TextSpecs = {
  addText: boolean;
  customText?: string;
  customTextPosition?: string;
  customTextColor?: string;
};

export interface UserRecordingParams {
  mainSpecs: MainSpecs;
  dispSpecs: DispSpecs;
  textSpecs?: TextSpecs;
}

export type AltDomains = {
  [key: string]: string;
};

export type RequestPermissionAudioType = () => Promise<string>;
export type RequestPermissionCameraType = () => Promise<string>;

export type ControlsPosition = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
export type InfoPosition = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

export interface Poll {
  id: string;
  question: string;
  type: string;
  options: string[];
  votes: number[];
  status: string;
  voters?: Record<string, number>;
  [key: string]: any;
}

export interface WaitingRoomParticipant {
  name: string;
  id: string;
}

export interface ModalPositionStyle {
  justifyContent: string;
  alignItems: string;
}

export interface OverlayPositionStyle {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
}

export type EventType = 'conference' | 'webinar' | 'chat' | 'broadcast' | 'none';

export interface PollUpdatedData {
  polls?: Poll[];
  poll: Poll;
  status: string;
}

export interface BreakoutParticipant {
  name: string;
  breakRoom?: number | null;
}

export interface BreakoutRoomUpdatedData {
  forHost?: boolean;
  newRoom?: number;
  members?: Participant[];
  breakoutRooms?: BreakoutParticipant[][];
  status?: string;
}

export interface ConsumeSocket {
  [ip: string]: Socket;
}

export interface WhiteboardUser {
  name: string;
  useBoard: boolean;
}

export interface ShapePayload {
  type: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  thickness: number;
  lineType: string;
  [key: string]: any;
}

export interface Shapes {
  action: string;
  payload: ShapePayload;
}
export interface WhiteboardData {
  shapes: Shapes[];
  redoStack: Shapes[];
  undoStack: Shapes[];
  useImageBackground: boolean;
}

export type SeedData = {
  member?: string;
  host?: string;
  eventType?: EventType;
  participants?: Participant[];
  messages?: Message[];
  polls?: Poll[];
  breakoutRooms?: BreakoutParticipant[][];
  requests?: Request[];
  waitingList?: WaitingRoomParticipant[];
  whiteboardUsers?: WhiteboardUser[];
};

export interface MeetingRoomParams {
  itemPageLimit: number; // Limit for items per page
  mediaType: 'audio' | 'video'; // Type of media, could be audio or video
  addCoHost: boolean; // Whether co-hosts can be added
  targetOrientation: 'landscape' | 'neutral' | 'portrait'; // Target orientation, landscape, neutral, or portrait
  targetOrientationHost: 'landscape' | 'neutral' | 'portrait'; // Host's target orientation, landscape, neutral, or portrait
  targetResolution: 'qhd' | 'fhd' | 'hd' | 'sd' | 'QnHD'; // Target resolution for participants
  targetResolutionHost: 'qhd' | 'fhd' | 'hd' | 'sd' | 'QnHD'; // Target resolution for host  type: 'chat' | 'conference' | 'webinar' | 'broadcast'; // Room type: chat, conference, webinar, or broadcast
  type: EventType; // Room type: chat, conference, webinar, or broadcast
  audioSetting: 'allow' | 'approval' | 'disallow'; // Audio setting: allow, approval, or disallow
  videoSetting: 'allow' | 'approval' | 'disallow'; // Video setting: allow, approval, or disallow
  screenshareSetting: 'allow' | 'approval' | 'disallow'; // Screenshare setting: allow, approval, or disallow
  chatSetting: 'allow' | 'disallow'; // Chat setting: allow or disallow
}

export interface RecordingParams {
  recordingAudioPausesLimit: number; // Limit on audio recording pauses
  recordingAudioSupport: boolean; // Whether audio recording is supported
  recordingAudioPeopleLimit: number; // Maximum number of people for audio recording
  recordingAudioParticipantsTimeLimit: number; // Time limit for audio participants in recording

  recordingVideoPausesLimit: number; // Limit on video recording pauses
  recordingVideoSupport: boolean; // Whether video recording is supported
  recordingVideoPeopleLimit: number; // Maximum number of people for video recording
  recordingVideoParticipantsTimeLimit: number; // Time limit for video participants in recording

  recordingAllParticipantsSupport: boolean; // Whether recording all participants is supported
  recordingVideoParticipantsSupport: boolean; // Whether video recording for participants is supported
  recordingAllParticipantsFullRoomSupport: boolean; // Support for recording the entire room for all participants
  recordingVideoParticipantsFullRoomSupport: boolean; // Support for recording the full room for video participants

  recordingPreferredOrientation: 'landscape' | 'portrait'; // Preferred recording orientation
  recordingSupportForOtherOrientation: boolean; // Support for orientations other than the preferred one
  recordingMultiFormatsSupport: boolean; // Support for multiple recording formats
  recordingHLSSupport: boolean; // Whether HLS recording is supported

  recordingAudioPausesCount?: number; // Number of audio recording pauses
  recordingVideoPausesCount?: number; // Number of video recording pauses
}

export interface CreateRoomOptions {
  action: 'create' | 'join'; // Either 'create' or 'join' based on the requirement
  meetingID: string; // The meeting ID, initially an empty string
  duration: number; // Duration of the meeting in minutes
  capacity: number; // Max number of participants allowed
  userName: string; // Username of the room host
  scheduledDate: number; // Unix timestamp (in milliseconds) for the scheduled date
  secureCode: string; // Secure code for the room host
  eventType: 'conference' | 'webinar' | 'chat' | 'broadcast'; // Type of event
  recordOnly: boolean; // Whether the room is for recording only
  eventStatus: 'active' | 'inactive'; // Status of the event
  startIndex: number; // Start index for pagination or data fetch
  pageSize: number; // Number of items per page
  safeRoom: boolean; // Whether the room is a safe room
  autoStartSafeRoom: boolean; // Automatically start the safe room feature
  safeRoomAction: 'warn' | 'kick' | 'ban'; // Action for the safe room
  dataBuffer: boolean; // Whether to return data buffer
  bufferType: 'images' | 'audio' | 'all'; // Type of buffer data
  directionSIP: 'inbound' | 'outbound' | 'both'; // Direction of SIP
  preferPCMA: boolean; // Whether to prefer PCMA codec for SIP
}

export interface CreateMediaSFURoomOptions {
  action: 'create'; // 'create' action
  duration: number; // Duration of the meeting in minutes
  capacity: number; // Max number of participants allowed
  userName: string; // Username of the room host
  scheduledDate?: number; // Unix timestamp (in milliseconds) for the scheduled date
  secureCode?: string; // Secure code for the room host
  eventType?: 'conference' | 'webinar' | 'chat' | 'broadcast'; // Type of event
  meetingRoomParams?: MeetingRoomParams; // Object containing parameters related to the meeting room
  recordingParams?: RecordingParams; // Object containing parameters related to recording
  recordOnly?: boolean; // Whether the room is for media production only (egress)
  safeRoom?: boolean; // Whether the room is a safe room
  autoStartSafeRoom?: boolean; // Automatically start the safe room feature
  safeRoomAction?: 'warn' | 'kick' | 'ban'; // Action for the safe room
  dataBuffer?: boolean; // Whether to return data buffer
  bufferType?: 'images' | 'audio' | 'all'; // Type of buffer data
  directionSIP?: 'inbound' | 'outbound' | 'both'; // Direction of SIP
  preferPCMA?: boolean; // Whether to prefer PCMA codec for SIP
}
export interface JoinMediaSFURoomOptions {
  action: 'join'; // 'join' action
  meetingID: string; // The meeting ID
  userName: string; // Username of the room host
}

export interface ResponseJoinLocalRoom {
  rtpCapabilities?: RtpCapabilities | null; // Object containing the RTP capabilities
  isHost: boolean; // Indicates whether the user joining the room is the host.
  eventStarted: boolean; // Indicates whether the event has started.
  isBanned: boolean; // Indicates whether the user is banned from the room.
  hostNotJoined: boolean; // Indicates whether the host has not joined the room.
  eventRoomParams: MeetingRoomParams; // Object containing parameters related to the meeting room.
  recordingParams: RecordingParams; // Object containing parameters related to recording.
  secureCode: string; // Secure code (host password) associated with the host of the room.
  mediasfuURL: string; // Media SFU URL
  apiKey: string; // API key
  apiUserName: string; // API username
  allowRecord: boolean; // Indicates whether recording is allowed.
}

export interface ResponseJoinRoom {
  rtpCapabilities?: RtpCapabilities | null; // Object containing the RTP capabilities
  success: boolean; // Indicates whether the operation (joining the room) was successful.
  roomRecvIPs: string[]; // Array of strings containing information about the domains that must be connected to in order to receive media.
  meetingRoomParams: MeetingRoomParams; // Object containing parameters related to the meeting room.
  recordingParams: RecordingParams; // Object containing parameters related to recording.
  secureCode: string; // Secure code (host password) associated with the host of the room.
  recordOnly: boolean; // Indicates whether the room is for recording only.
  isHost: boolean; // Indicates whether the user joining the room is the host.
  safeRoom: boolean; // Indicates whether the room is a safe room.
  autoStartSafeRoom: boolean; // Indicates whether the safe room will automatically start.
  safeRoomStarted: boolean; // Indicates whether the safe room has started.
  safeRoomEnded: boolean; // Indicates whether the safe room has ended.
  reason?: string; // Reason for the success or failure of the operation.
  banned?: boolean; // Indicates whether the user is banned from the room.
  suspended?: boolean; // Indicates whether the user is suspended from the room.
  noAdmin?: boolean; // Indicates whether the room has no host in it.
}

export interface AllMembersData {
  members: Participant[]; // Array of objects containing information about all the members in the room.
  requests: Request[]; // Array of objects containing information about the requests.
  coHost?: string; // The co-host information.
  coHostResponsibilities: CoHostResponsibility[]; // Array of objects containing information about the co-host responsibilities.
}

export interface AllMembersRestData {
  members: Participant[]; // Array of objects containing information about all the members in the room.
  settings: Settings; // Array of strings containing information about the settings.
  coHost?: string; // The co-host information.
  coHostResponsibilities: CoHostResponsibility[]; // Array of objects containing information about the co-host responsibilities.
}

export interface UserWaitingData {
  name: string; // Name of the user waiting to join the room.
}

export interface AllWaitingRoomMembersData {
  waitingParticipants?: WaitingRoomParticipant[]; // Array of objects containing information about the participants waiting to join the room.
  waitingParticipantss?: WaitingRoomParticipant[];
}

export interface BanData {
  name: string; // Name of the user to ban.
}

export interface UpdatedCoHostData {
  coHost: string; // The co-host information.
  coHostResponsibilities: CoHostResponsibility[]; // Array of objects containing information about the co-host responsibilities.
}

export interface ParticipantRequestedData {
  userRequest: Request; // Object containing information about the user request.
}

export interface ScreenProducerIdData {
  producerId: string; // The producer ID of the screen.
}

export interface UpdateMediaSettingsData {
  settings: Settings; // Array of strings containing information about the settings.
}

export interface ProducerMediaPausedData {
  producerId: string; // The producer ID of the media that was paused.
  kind: 'audio';
  name: string; // The name of the media that was paused.
}

export interface ProducerMediaResumedData {
  kind: 'audio';
  name: string; // The name of the media that was resumed.
}

export interface ProducerMediaClosedData {
  producerId: string; // The producer ID of the media that was stopped.
  kind: 'audio' | 'video' | 'screenshare';
  name: string; // The name of the media that was stopped.
}

export interface ControlMediaHostData {
  type: 'all' | 'audio' | 'video' | 'screenshare'; // The type of media to control.
}

export interface ReceiveMessageData {
  message: Message; // Object containing information about the message.
}

export interface MeetingTimeRemainingData {
  timeRemaining: number; // The time remaining for the meeting.
}

export interface MeetingStillThereData {
  timeRemaining: number; // The time remaining for the meeting.
}

export interface UpdateConsumingDomainsData {
  domains: string[]; // Array of strings containing information about the domains to consume media from.
  alt_domains: AltDomains; // Object containing information about the alternative domains to consume media from.
}

export interface RecordingNoticeData {
  state: string; // The state of the recording.
  userRecordingParam: UserRecordingParams; // Object containing information about the user recording parameters.
  pauseCount: number; // The number of times the recording was paused.
  timeDone: number; // The time the recording was paused.
}

export interface TimeLeftRecordingData {
  timeLeft: number; // The time left for recording.
}

export interface StoppedRecordingData {
  state: string; // The state of the recording.
  reason?: string; // The reason for stopping the recording.
}

export interface HostRequestResponseData {
  requestResponse: RequestResponse; // Object containing information about the request response.
}

export interface SafeRoomNoticeData {
  state: string; // The state of the safe room.
}

export interface UnSafeData {
  time: number; // The time the room was unsafe.
  evidence: ImageData; // The evidence for the room being unsafe.
}

export interface UnsafeAlertData {
  name: string; // The name of the user who triggered the unsafe alert.
}

export interface DataBufferNotice {
  state: string; // The state of the data buffer.
}

export interface AudioData {
  audioBuffer: AudioBuffer; // The audio buffer.
}

export interface ImageData {
  jpegBuffer: ImageData; // The JPEG buffer.
}

export interface WhiteboardUpdatedData {
  status: 'started' | 'ended'; // The status of the whiteboard.
  whiteboardUsers: WhiteboardUser[]; // Array of objects containing information about the whiteboard users.
  members: Participant[]; // Array of objects containing information about the members.
  whiteboardData: WhiteboardData; // Object containing information about the whiteboard data.
}

export interface WhiteboardActionData {
  action: string; // The action to be performed on the whiteboard.
  payload: ShapePayload; // Object containing information about the shape payload.
}

export interface CustomMediaComponent {
  component: ComponentType<any>; // The custom media component.
  inputs: any;
}

export interface GenericButton {
  name?: string;
  icon?: IconDefinition;
  alternateIcon?: IconDefinition;
  onPress?: () => void;
  color?: string;
  backgroundColor?: {
    default?: string;
  };
}

export interface MainButtonAlt extends GenericButton {
  active?: boolean | (() => boolean);
  customComponent?: HTMLElement | CustomComponent | (() => HTMLElement | CustomComponent);
  iconComponent?: HTMLElement | CustomComponent | (() => HTMLElement | CustomComponent);
  alternateIconComponent?: HTMLElement | CustomComponent | (() => HTMLElement | CustomComponent);
  disabled?: boolean | (() => boolean);
  show?: boolean | (() => boolean);
  activeColor?: string | (() => string);
  inActiveColor?: string | (() => string);
}

export type MainCustomButton = Pick<
  CustomButton,
  Exclude<keyof CustomButton, 'customComponent'>
> & {
  customComponent?: HTMLElement | CustomComponent | (() => HTMLElement | CustomComponent);
};

export type { CustomComponent } from '../components/menu-components/custom-buttons/custom-buttons.component';

export type CreateWebRTCTransportResponse = {
  id: string;
  dtlsParameters: DtlsParameters;
  iceCandidates: IceCandidate[];
  iceParameters: IceParameters;
  error?: string;
};

// Custom Component Types
export * from './custom-component.types';
