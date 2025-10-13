import { Socket } from 'socket.io-client';
import { types } from 'mediasoup-client';
type Consumer = types.Consumer;
type DtlsParameters = types.DtlsParameters;
type IceCandidate = types.IceCandidate;
type IceParameters = types.IceParameters;
type RtpCapabilities = types.RtpCapabilities;
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { CustomComponent } from '../components/display-components/control-buttons-component/control-buttons-component.component';
import { CustomButton } from '../components/menu-components/custom-buttons/custom-buttons.component';
import { ComponentType } from '@angular/cdk/portal';
export * from '../consumers/socket-receive-methods/join-consume-room.service';
export * from '../consumers/socket-receive-methods/producer-closed.service';
export * from '../consumers/socket-receive-methods/new-pipe-producer.service';
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
export * from '../methods/waiting-methods/launch-waiting.service';
export * from '../methods/waiting-methods/respond-to-waiting.service';
export * from '../methods/whiteboard-methods/launch-configure-whiteboard.service';
export * from '../methods/whiteboard-methods/capture-canvas-stream.service';
export * from '../producer-client/producer-client-emits/create-device-client.service';
export * from '../producer-client/producer-client-emits/join-room-client.service';
export * from '../producer-client/producer-client-emits/update-room-parameters-client.service';
export * from '../producers/producer-emits/join-con-room.service';
export * from '../producers/producer-emits/join-room.service';
export * from '../producers/producer-emits/join-local-room.service';
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
export * from '../sockets/socket-manager.service';
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
    isHost?: boolean;
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
    width: number | {
        ideal?: number;
        max?: number;
        min?: number;
    };
    height: number | {
        ideal?: number;
        max?: number;
        min?: number;
    };
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
    itemPageLimit: number;
    mediaType: 'audio' | 'video';
    addCoHost: boolean;
    targetOrientation: 'landscape' | 'neutral' | 'portrait';
    targetOrientationHost: 'landscape' | 'neutral' | 'portrait';
    targetResolution: 'qhd' | 'fhd' | 'hd' | 'sd' | 'QnHD';
    targetResolutionHost: 'qhd' | 'fhd' | 'hd' | 'sd' | 'QnHD';
    type: EventType;
    audioSetting: 'allow' | 'approval' | 'disallow';
    videoSetting: 'allow' | 'approval' | 'disallow';
    screenshareSetting: 'allow' | 'approval' | 'disallow';
    chatSetting: 'allow' | 'disallow';
}
export interface RecordingParams {
    recordingAudioPausesLimit: number;
    recordingAudioSupport: boolean;
    recordingAudioPeopleLimit: number;
    recordingAudioParticipantsTimeLimit: number;
    recordingVideoPausesLimit: number;
    recordingVideoSupport: boolean;
    recordingVideoPeopleLimit: number;
    recordingVideoParticipantsTimeLimit: number;
    recordingAllParticipantsSupport: boolean;
    recordingVideoParticipantsSupport: boolean;
    recordingAllParticipantsFullRoomSupport: boolean;
    recordingVideoParticipantsFullRoomSupport: boolean;
    recordingPreferredOrientation: 'landscape' | 'portrait';
    recordingSupportForOtherOrientation: boolean;
    recordingMultiFormatsSupport: boolean;
    recordingHLSSupport: boolean;
    recordingAudioPausesCount?: number;
    recordingVideoPausesCount?: number;
}
export interface CreateRoomOptions {
    action: 'create' | 'join';
    meetingID: string;
    duration: number;
    capacity: number;
    userName: string;
    scheduledDate: number;
    secureCode: string;
    eventType: 'conference' | 'webinar' | 'chat' | 'broadcast';
    recordOnly: boolean;
    eventStatus: 'active' | 'inactive';
    startIndex: number;
    pageSize: number;
    safeRoom: boolean;
    autoStartSafeRoom: boolean;
    safeRoomAction: 'warn' | 'kick' | 'ban';
    dataBuffer: boolean;
    bufferType: 'images' | 'audio' | 'all';
    directionSIP: 'inbound' | 'outbound' | 'both';
    preferPCMA: boolean;
}
export interface CreateMediaSFURoomOptions {
    action: 'create';
    duration: number;
    capacity: number;
    userName: string;
    scheduledDate?: number;
    secureCode?: string;
    eventType?: 'conference' | 'webinar' | 'chat' | 'broadcast';
    meetingRoomParams?: MeetingRoomParams;
    recordingParams?: RecordingParams;
    recordOnly?: boolean;
    safeRoom?: boolean;
    autoStartSafeRoom?: boolean;
    safeRoomAction?: 'warn' | 'kick' | 'ban';
    dataBuffer?: boolean;
    bufferType?: 'images' | 'audio' | 'all';
    directionSIP?: 'inbound' | 'outbound' | 'both';
    preferPCMA?: boolean;
}
export interface JoinMediaSFURoomOptions {
    action: 'join';
    meetingID: string;
    userName: string;
}
export interface ResponseJoinLocalRoom {
    rtpCapabilities?: RtpCapabilities | null;
    isHost: boolean;
    eventStarted: boolean;
    isBanned: boolean;
    hostNotJoined: boolean;
    eventRoomParams: MeetingRoomParams;
    recordingParams: RecordingParams;
    secureCode: string;
    mediasfuURL: string;
    apiKey: string;
    apiUserName: string;
    allowRecord: boolean;
}
export interface ResponseJoinRoom {
    rtpCapabilities?: RtpCapabilities | null;
    success: boolean;
    roomRecvIPs: string[];
    meetingRoomParams: MeetingRoomParams;
    recordingParams: RecordingParams;
    secureCode: string;
    recordOnly: boolean;
    isHost: boolean;
    safeRoom: boolean;
    autoStartSafeRoom: boolean;
    safeRoomStarted: boolean;
    safeRoomEnded: boolean;
    reason?: string;
    banned?: boolean;
    suspended?: boolean;
    noAdmin?: boolean;
}
export interface AllMembersData {
    members: Participant[];
    requests: Request[];
    coHost?: string;
    coHostResponsibilities: CoHostResponsibility[];
}
export interface AllMembersRestData {
    members: Participant[];
    settings: Settings;
    coHost?: string;
    coHostResponsibilities: CoHostResponsibility[];
}
export interface UserWaitingData {
    name: string;
}
export interface AllWaitingRoomMembersData {
    waitingParticipants?: WaitingRoomParticipant[];
    waitingParticipantss?: WaitingRoomParticipant[];
}
export interface BanData {
    name: string;
}
export interface UpdatedCoHostData {
    coHost: string;
    coHostResponsibilities: CoHostResponsibility[];
}
export interface ParticipantRequestedData {
    userRequest: Request;
}
export interface ScreenProducerIdData {
    producerId: string;
}
export interface UpdateMediaSettingsData {
    settings: Settings;
}
export interface ProducerMediaPausedData {
    producerId: string;
    kind: 'audio';
    name: string;
}
export interface ProducerMediaResumedData {
    kind: 'audio';
    name: string;
}
export interface ProducerMediaClosedData {
    producerId: string;
    kind: 'audio' | 'video' | 'screenshare';
    name: string;
}
export interface ControlMediaHostData {
    type: 'all' | 'audio' | 'video' | 'screenshare';
}
export interface ReceiveMessageData {
    message: Message;
}
export interface MeetingTimeRemainingData {
    timeRemaining: number;
}
export interface MeetingStillThereData {
    timeRemaining: number;
}
export interface UpdateConsumingDomainsData {
    domains: string[];
    alt_domains: AltDomains;
}
export interface RecordingNoticeData {
    state: string;
    userRecordingParam: UserRecordingParams;
    pauseCount: number;
    timeDone: number;
}
export interface TimeLeftRecordingData {
    timeLeft: number;
}
export interface StoppedRecordingData {
    state: string;
    reason?: string;
}
export interface HostRequestResponseData {
    requestResponse: RequestResponse;
}
export interface SafeRoomNoticeData {
    state: string;
}
export interface UnSafeData {
    time: number;
    evidence: ImageData;
}
export interface UnsafeAlertData {
    name: string;
}
export interface DataBufferNotice {
    state: string;
}
export interface AudioData {
    audioBuffer: AudioBuffer;
}
export interface ImageData {
    jpegBuffer: ImageData;
}
export interface WhiteboardUpdatedData {
    status: 'started' | 'ended';
    whiteboardUsers: WhiteboardUser[];
    members: Participant[];
    whiteboardData: WhiteboardData;
}
export interface WhiteboardActionData {
    action: string;
    payload: ShapePayload;
}
export interface CustomMediaComponent {
    component: ComponentType<any>;
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
export type MainCustomButton = Pick<CustomButton, Exclude<keyof CustomButton, 'customComponent'>> & {
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
export * from './custom-component.types';
