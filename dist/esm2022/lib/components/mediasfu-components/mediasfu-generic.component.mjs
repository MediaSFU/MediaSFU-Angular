import { Component, HostListener, Injector, Input, } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { faPlayCircle, faPauseCircle, faStopCircle, faDotCircle, faRecordVinyl, faCog, faUsers, faClock, faUserPlus, faTools, faDesktop, faPoll, faUserFriends, faChalkboardTeacher, faMicrophone, faMicrophoneSlash, faVideo, faVideoSlash, faShareAlt, faSync, faPhone, faBars, faComments, faChartBar, } from '@fortawesome/free-solid-svg-icons';
import { initialValuesState } from '../../methods/utils/initial-values.util';
import { MainAspectComponent } from '../display-components/main-aspect-component/main-aspect-component.component';
import { LoadingModal } from '../display-components/loading-modal/loading-modal.component';
import { ControlButtonsComponent } from '../display-components/control-buttons-component/control-buttons-component.component';
import { ControlButtonsAltComponent } from '../display-components/control-buttons-alt-component/control-buttons-alt-component.component';
import { ControlButtonsComponentTouch } from '../display-components/control-buttons-component-touch/control-buttons-component-touch.component';
import { OtherGridComponent } from '../display-components/other-grid-component/other-grid-component.component';
import { MainScreenComponent } from '../display-components/main-screen-component/main-screen-component.component';
import { MainGridComponent } from '../display-components/main-grid-component/main-grid-component.component';
import { SubAspectComponent } from '../display-components/sub-aspect-component/sub-aspect-component.component';
import { MainContainerComponent } from '../display-components/main-container-component/main-container-component.component';
import { AlertComponent } from '../display-components/alert-component/alert.component.component';
import { MenuModal } from '../menu-components/menu-modal/menu-modal.component';
import { RecordingModal } from '../recording-components/recording-modal/recording-modal.component';
import { RequestsModal } from '../requests-components/requests-modal/requests-modal.component';
import { WaitingRoomModal } from '../waiting-components/waiting-room-modal.component';
import { DisplaySettingsModal } from '../display-settings-components/display-settings-modal.component';
import { EventSettingsModal } from '../event-settings-components/event-settings-modal/event-settings-modal.component';
import { CoHostModal } from '../co-host-components/co-host-modal/co-host-modal.component';
import { ParticipantsModal } from '../participants-components/participants-modal/participants-modal.component';
import { MessagesModal } from '../message-components/messages-modal/messages-modal.component';
import { MediaSettingsModal } from '../media-settings-components/media-settings-modal/media-settings-modal.component';
import { ConfirmExitModal } from '../exit-components/confirm-exit-modal/confirm-exit-modal.component';
import { ConfirmHereModal } from '../misc-components/confirm-here-modal/confirm-here-modal.component';
import { ShareEventModal } from '../misc-components/share-event-modal/share-event-modal.component';
import { WelcomePage, } from '../misc-components/welcome-page/welcome-page.component';
import { PollModal } from '../polls-components/poll-modal/poll-modal.component';
import { BackgroundModal } from '../background-components/background-modal/background-modal.component';
import { BreakoutRoomsModal } from '../breakout-components/breakout-rooms-modal.component';
import { ConfigureWhiteboardModal } from '../whiteboard-components/configure-whiteboard-modal/configure-whiteboard-modal.component';
import { Whiteboard } from '../whiteboard-components/whiteboard/whiteboard.component';
import { Screenboard } from '../screenboard-components/screenboard/screenboard.component';
import { ScreenboardModal } from '../screenboard-components/screenboard-modal/screenboard-modal.component';
// pagination and display of media (samples)
import { Pagination } from '../display-components/pagination/pagination.component';
import { FlexibleGrid } from '../display-components/flexible-grid/flexible-grid.component';
import { FlexibleVideo } from '../display-components/flexible-video/flexible-video.component';
import { AudioGrid } from '../display-components/audio-grid/audio-grid.component';
import { MenuWidget } from '../display-components/control-widgets/menu-widget.component';
import { MessageWidget } from '../display-components/control-widgets/message-widget.component';
import { MenuRecordWidget } from '../display-components/control-widgets/menu-record-widget.component';
import { RecordTimerWidget } from '../display-components/control-widgets/record-timer-widget.component';
import { MenuParticipantsWidget } from '../display-components/control-widgets/menu-participants-widget.component';
import { ScreenShareWidget } from '../display-components/control-widgets/screenshare-widget.component';
import { sleep } from '../../methods/utils/sleep.util';
import * as i0 from "@angular/core";
import * as i1 from "../../consumers/update-mini-cards-grid.service";
import * as i2 from "../../consumers/mix-streams.service";
import * as i3 from "../../consumers/disp-streams.service";
import * as i4 from "../../consumers/stop-share-screen.service";
import * as i5 from "../../consumers/check-screen-share.service";
import * as i6 from "../../consumers/start-share-screen.service";
import * as i7 from "../../consumers/request-screen-share.service";
import * as i8 from "../../consumers/reorder-streams.service";
import * as i9 from "../../consumers/prepopulate-user-media.service";
import * as i10 from "../../consumers/get-videos.service";
import * as i11 from "../../consumers/re-port.service";
import * as i12 from "../../consumers/trigger.service";
import * as i13 from "../../consumers/consumer-resume.service";
import * as i14 from "../../consumers/connect-send-transport.service";
import * as i15 from "../../consumers/connect-send-transport-audio.service";
import * as i16 from "../../consumers/connect-send-transport-video.service";
import * as i17 from "../../consumers/connect-send-transport-screen.service";
import * as i18 from "../../consumers/process-consumer-transports.service";
import * as i19 from "../../consumers/resume-pause-streams.service";
import * as i20 from "../../consumers/readjust.service";
import * as i21 from "../../consumers/check-grid.service";
import * as i22 from "../../consumers/get-estimate.service";
import * as i23 from "../../consumers/calculate-rows-and-columns.service";
import * as i24 from "../../consumers/add-videos-grid.service";
import * as i25 from "../../consumers/on-screen-changes.service";
import * as i26 from "../../consumers/change-vids.service";
import * as i27 from "../../consumers/compare-active-names.service";
import * as i28 from "../../consumers/compare-screen-states.service";
import * as i29 from "../../consumers/create-send-transport.service";
import * as i30 from "../../consumers/resume-send-transport-audio.service";
import * as i31 from "../../consumers/receive-all-piped-transports.service";
import * as i32 from "../../consumers/disconnect-send-transport-video.service";
import * as i33 from "../../consumers/disconnect-send-transport-audio.service";
import * as i34 from "../../consumers/disconnect-send-transport-screen.service";
import * as i35 from "../../consumers/get-piped-producers-alt.service";
import * as i36 from "../../consumers/signal-new-consumer-transport.service";
import * as i37 from "../../consumers/connect-recv-transport.service";
import * as i38 from "../../consumers/re-update-inter.service";
import * as i39 from "../../consumers/update-participant-audio-decibels.service";
import * as i40 from "../../consumers/close-and-resize.service";
import * as i41 from "../../consumers/auto-adjust.service";
import * as i42 from "../../consumers/switch-user-video-alt.service";
import * as i43 from "../../consumers/switch-user-video.service";
import * as i44 from "../../consumers/switch-user-audio.service";
import * as i45 from "../../producers/socket-receive-methods/get-domains.service";
import * as i46 from "../../methods/utils/format-number.service";
import * as i47 from "../../consumers/connect-ips.service";
import * as i48 from "../../producer-client/producer-client-emits/create-device-client.service";
import * as i49 from "../../methods/polls-methods/handle-create-poll.service";
import * as i50 from "../../methods/polls-methods/handle-end-poll.service";
import * as i51 from "../../methods/polls-methods/handle-vote-poll.service";
import * as i52 from "../../methods/whiteboard-methods/capture-canvas-stream.service";
import * as i53 from "../../consumers/resume-pause-audio-streams.service";
import * as i54 from "../../consumers/process-consumer-transports-audio.service";
import * as i55 from "../../methods/menu-methods/launch-menu-modal.service";
import * as i56 from "../../methods/recording-methods/launch-recording.service";
import * as i57 from "../../methods/recording-methods/start-recording.service";
import * as i58 from "../../methods/recording-methods/confirm-recording.service";
import * as i59 from "../../methods/waiting-methods/launch-waiting.service";
import * as i60 from "../../methods/co-host-methods/launch-co-host.service";
import * as i61 from "../../methods/media-settings-methods/launch-media-settings.service";
import * as i62 from "../../methods/display-settings-methods/launch-display-settings.service";
import * as i63 from "../../methods/settings-methods/launch-settings.service";
import * as i64 from "../../methods/requests-methods/launch-requests.service";
import * as i65 from "../../methods/participants-methods/launch-participants.service";
import * as i66 from "../../methods/message-methods/launch-messages.service";
import * as i67 from "../../methods/exit-methods/launch-confirm-exit.service";
import * as i68 from "../../methods/polls-methods/launch-poll.service";
import * as i69 from "../../methods/breakout-room-methods/launch-breakout-rooms.service";
import * as i70 from "../../methods/whiteboard-methods/launch-configure-whiteboard.service";
import * as i71 from "../../methods/utils/meeting-timer/start-meeting-progress-timer.service";
import * as i72 from "../../methods/recording-methods/update-recording.service";
import * as i73 from "../../methods/recording-methods/stop-recording.service";
import * as i74 from "../../producers/socket-receive-methods/user-waiting.service";
import * as i75 from "../../producers/socket-receive-methods/person-joined.service";
import * as i76 from "../../producers/socket-receive-methods/all-waiting-room-members.service";
import * as i77 from "../../producers/socket-receive-methods/room-record-params.service";
import * as i78 from "../../producers/socket-receive-methods/ban-participant.service";
import * as i79 from "../../producers/socket-receive-methods/updated-co-host.service";
import * as i80 from "../../producers/socket-receive-methods/participant-requested.service";
import * as i81 from "../../producers/socket-receive-methods/screen-producer-id.service";
import * as i82 from "../../producers/socket-receive-methods/update-media-settings.service";
import * as i83 from "../../producers/socket-receive-methods/producer-media-paused.service";
import * as i84 from "../../producers/socket-receive-methods/producer-media-resumed.service";
import * as i85 from "../../producers/socket-receive-methods/producer-media-closed.service";
import * as i86 from "../../producers/socket-receive-methods/control-media-host.service";
import * as i87 from "../../producers/socket-receive-methods/meeting-ended.service";
import * as i88 from "../../producers/socket-receive-methods/disconnect-user-self.service";
import * as i89 from "../../producers/socket-receive-methods/receive-message.service";
import * as i90 from "../../producers/socket-receive-methods/meeting-time-remaining.service";
import * as i91 from "../../producers/socket-receive-methods/meeting-still-there.service";
import * as i92 from "../../producers/socket-receive-methods/start-records.service";
import * as i93 from "../../producers/socket-receive-methods/re-initiate-recording.service";
import * as i94 from "../../producers/socket-receive-methods/recording-notice.service";
import * as i95 from "../../producers/socket-receive-methods/time-left-recording.service";
import * as i96 from "../../producers/socket-receive-methods/stopped-recording.service";
import * as i97 from "../../producers/socket-receive-methods/host-request-response.service";
import * as i98 from "../../producers/socket-receive-methods/all-members.service";
import * as i99 from "../../producers/socket-receive-methods/all-members-rest.service";
import * as i100 from "../../producers/socket-receive-methods/disconnect.service";
import * as i101 from "../../methods/polls-methods/poll-updated.service";
import * as i102 from "../../methods/breakout-room-methods/breakout-room-updated.service";
import * as i103 from "../../sockets/socket-manager.service";
import * as i104 from "../../producer-client/producer-client-emits/join-room-client.service";
import * as i105 from "../../producer-client/producer-client-emits/update-room-parameters-client.service";
import * as i106 from "../../methods/stream-methods/click-video.service";
import * as i107 from "../../methods/stream-methods/click-audio.service";
import * as i108 from "../../methods/stream-methods/click-screen-share.service";
import * as i109 from "../../methods/stream-methods/switch-video-alt.service";
import * as i110 from "../../consumers/stream-success-video.service";
import * as i111 from "../../consumers/stream-success-audio.service";
import * as i112 from "../../consumers/stream-success-screen.service";
import * as i113 from "../../consumers/stream-success-audio-switch.service";
import * as i114 from "../../consumers/check-permission.service";
import * as i115 from "../../producers/socket-receive-methods/update-consuming-domains.service";
import * as i116 from "../../consumers/receive-room-messages.service";
import * as i117 from "@angular/common";
/**
 * MediasfuGeneric component provides a customizable interface with a full suite of modal windows and flexible layout options for interactive media applications.
 *
 * @component
 * @selector app-mediasfu-generic
 * @standalone true
 * @imports [RouterOutlet, CommonModule, BreakoutRoomsModal, BackgroundModal, CoHostModal, AlertComponent, AudioGrid, ControlButtonsAltComponent, ControlButtonsComponentTouch, ControlButtonsComponent, FlexibleGrid, FlexibleVideo, LoadingModal, Pagination, SubAspectComponent, DisplaySettingsModal, EventSettingsModal, ConfirmExitModal, MediaSettingsModal, MenuModal, MessagesModal, ConfirmHereModal, ShareEventModal, WelcomePage, ParticipantsModal, PollModal, RecordingModal, RequestsModal, MainAspectComponent, MainContainerComponent, MainGridComponent, MainScreenComponent, OtherGridComponent, Screenboard, ScreenboardModal, Whiteboard, ConfigureWhiteboardModal, WaitingRoomModal, MenuWidget, MessageWidget, MenuRecordWidget, RecordTimerWidget, MenuParticipantsWidget, ScreenShareWidget]
 *
 * @template
 * The template structure:
 * - Conditional rendering of a PrejoinPage or WelcomePage for introductory or pre-session screens.
 * - Main content area with nested components for grid layouts, flexible video, and audio grids.
 * - Modals for user interactions, including participant management, event settings, breakout rooms, whiteboarding, and media settings.
 *
 * @input {any} PrejoinPage - Component for the prejoin page, defaults to `WelcomePage`.
 * @input {{ apiUserName: string; apiKey: string }} credentials - API credentials for secure access.
 * @input {boolean} useLocalUIMode - Flag to toggle local UI settings.
 * @input {SeedData} seedData - Seed data for initializing the component with specific configurations.
 * @input {boolean} useSeed - Enable/disable use of seed data.
 * @input {string} imgSrc - URL for branding images or logos.
 *
 * @property {string} title - The title of the component, defaults to "MediaSFU-Generic".
 *
 * @styles
 * Component-specific styles, including full-screen settings and customizable colors for backgrounds.
 *
 * @providers [CookieService] - Provides cookies service for session handling.
 *
 * @constructor
 * @class MediasfuGeneric
 * @implements OnInit, OnDestroy
 *
 * @method ngOnInit - Initializes the component and its configurations.
 * @method ngOnDestroy - Performs cleanup, removing event listeners and intervals as needed.
 *
 * @example
 * ```html
 * <app-mediasfu-generic
 *   [PrejoinPage]="CustomPrejoinComponent"
 *   [credentials]="{ apiUserName: 'username', apiKey: 'apikey' }"
 *   [useLocalUIMode]="true"
 *   [seedData]="seedDataObject"
 *   [useSeed]="true"
 *   imgSrc="https://example.com/logo.png">
 * </app-mediasfu-generic>
 * ```
 */
export class MediasfuGeneric {
    cdr;
    injector;
    updateMiniCardsGrid;
    mixStreams;
    dispStreams;
    stopShareScreen;
    checkScreenShare;
    startShareScreen;
    requestScreenShare;
    reorderStreams;
    prepopulateUserMedia;
    getVideos;
    rePort;
    trigger;
    consumerResume;
    connectSendTransport;
    connectSendTransportAudio;
    connectSendTransportVideo;
    connectSendTransportScreen;
    processConsumerTransports;
    resumePauseStreams;
    readjust;
    checkGrid;
    getEstimate;
    calculateRowsAndColumns;
    addVideosGrid;
    onScreenChanges;
    changeVids;
    compareActiveNames;
    compareScreenStates;
    createSendTransport;
    resumeSendTransportAudio;
    receiveAllPipedTransports;
    disconnectSendTransportVideo;
    disconnectSendTransportAudio;
    disconnectSendTransportScreen;
    getPipedProducersAlt;
    signalNewConsumerTransport;
    connectRecvTransport;
    reUpdateInter;
    updateParticipantAudioDecibels;
    closeAndResize;
    autoAdjust;
    switchUserVideoAlt;
    switchUserVideo;
    switchUserAudio;
    getDomains;
    formatNumber;
    connectIps;
    createDeviceClient;
    handleCreatePoll;
    handleEndPoll;
    handleVotePoll;
    captureCanvasStream;
    resumePauseAudioStreams;
    processConsumerTransportsAudio;
    launchMenuModal;
    launchRecording;
    startRecording;
    confirmRecording;
    launchWaiting;
    launchCoHost;
    launchMediaSettings;
    launchDisplaySettings;
    launchSettings;
    launchRequests;
    launchParticipants;
    launchMessages;
    launchConfirmExit;
    launchPoll;
    launchBreakoutRooms;
    launchConfigureWhiteboard;
    startMeetingProgressTimer;
    updateRecording;
    stopRecording;
    userWaiting;
    personJoined;
    allWaitingRoomMembers;
    roomRecordParams;
    banParticipant;
    updatedCoHost;
    participantRequested;
    screenProducerId;
    updateMediaSettings;
    producerMediaPaused;
    producerMediaResumed;
    producerMediaClosed;
    controlMediaHost;
    meetingEnded;
    disconnectUserSelf;
    receiveMessage;
    meetingTimeRemaining;
    meetingStillThere;
    startRecords;
    reInitiateRecording;
    recordingNotice;
    timeLeftRecording;
    stoppedRecording;
    hostRequestResponse;
    allMembers;
    allMembersRest;
    disconnect;
    pollUpdated;
    breakoutRoomUpdated;
    socketManager;
    joinRoomClient;
    updateRoomParametersClient;
    clickVideo;
    clickAudio;
    clickScreenShare;
    switchVideoAlt;
    streamSuccessVideo;
    streamSuccessAudio;
    streamSuccessScreen;
    streamSuccessAudioSwitch;
    checkPermission;
    updateConsumingDomains;
    receiveRoomMessages;
    PrejoinPage = WelcomePage;
    credentials = { apiUserName: '', apiKey: '' };
    useLocalUIMode = false;
    seedData;
    useSeed = false;
    imgSrc = 'https://mediasfu.com/images/logo192.png';
    title = 'MediaSFU-Generic';
    mainHeightWidthSubscription;
    validatedSubscription;
    islevelSubscription;
    coHostSubscription;
    buttonSubscriptions = [];
    ScreenboardSubscription;
    recordingSubscription;
    constructor(cdr, injector, updateMiniCardsGrid, mixStreams, dispStreams, stopShareScreen, checkScreenShare, startShareScreen, requestScreenShare, reorderStreams, prepopulateUserMedia, getVideos, rePort, trigger, consumerResume, connectSendTransport, connectSendTransportAudio, connectSendTransportVideo, connectSendTransportScreen, processConsumerTransports, resumePauseStreams, readjust, checkGrid, getEstimate, calculateRowsAndColumns, addVideosGrid, onScreenChanges, changeVids, compareActiveNames, compareScreenStates, createSendTransport, resumeSendTransportAudio, receiveAllPipedTransports, disconnectSendTransportVideo, disconnectSendTransportAudio, disconnectSendTransportScreen, getPipedProducersAlt, signalNewConsumerTransport, connectRecvTransport, reUpdateInter, updateParticipantAudioDecibels, closeAndResize, autoAdjust, switchUserVideoAlt, switchUserVideo, switchUserAudio, getDomains, formatNumber, connectIps, createDeviceClient, handleCreatePoll, handleEndPoll, handleVotePoll, captureCanvasStream, resumePauseAudioStreams, processConsumerTransportsAudio, launchMenuModal, launchRecording, startRecording, confirmRecording, launchWaiting, launchCoHost, launchMediaSettings, launchDisplaySettings, launchSettings, launchRequests, launchParticipants, launchMessages, launchConfirmExit, launchPoll, launchBreakoutRooms, launchConfigureWhiteboard, startMeetingProgressTimer, updateRecording, stopRecording, userWaiting, personJoined, allWaitingRoomMembers, roomRecordParams, banParticipant, updatedCoHost, participantRequested, screenProducerId, updateMediaSettings, producerMediaPaused, producerMediaResumed, producerMediaClosed, controlMediaHost, meetingEnded, disconnectUserSelf, receiveMessage, meetingTimeRemaining, meetingStillThere, startRecords, reInitiateRecording, recordingNotice, timeLeftRecording, stoppedRecording, hostRequestResponse, allMembers, allMembersRest, disconnect, pollUpdated, breakoutRoomUpdated, socketManager, joinRoomClient, updateRoomParametersClient, clickVideo, clickAudio, clickScreenShare, switchVideoAlt, streamSuccessVideo, streamSuccessAudio, streamSuccessScreen, streamSuccessAudioSwitch, checkPermission, updateConsumingDomains, receiveRoomMessages) {
        this.cdr = cdr;
        this.injector = injector;
        this.updateMiniCardsGrid = updateMiniCardsGrid;
        this.mixStreams = mixStreams;
        this.dispStreams = dispStreams;
        this.stopShareScreen = stopShareScreen;
        this.checkScreenShare = checkScreenShare;
        this.startShareScreen = startShareScreen;
        this.requestScreenShare = requestScreenShare;
        this.reorderStreams = reorderStreams;
        this.prepopulateUserMedia = prepopulateUserMedia;
        this.getVideos = getVideos;
        this.rePort = rePort;
        this.trigger = trigger;
        this.consumerResume = consumerResume;
        this.connectSendTransport = connectSendTransport;
        this.connectSendTransportAudio = connectSendTransportAudio;
        this.connectSendTransportVideo = connectSendTransportVideo;
        this.connectSendTransportScreen = connectSendTransportScreen;
        this.processConsumerTransports = processConsumerTransports;
        this.resumePauseStreams = resumePauseStreams;
        this.readjust = readjust;
        this.checkGrid = checkGrid;
        this.getEstimate = getEstimate;
        this.calculateRowsAndColumns = calculateRowsAndColumns;
        this.addVideosGrid = addVideosGrid;
        this.onScreenChanges = onScreenChanges;
        this.changeVids = changeVids;
        this.compareActiveNames = compareActiveNames;
        this.compareScreenStates = compareScreenStates;
        this.createSendTransport = createSendTransport;
        this.resumeSendTransportAudio = resumeSendTransportAudio;
        this.receiveAllPipedTransports = receiveAllPipedTransports;
        this.disconnectSendTransportVideo = disconnectSendTransportVideo;
        this.disconnectSendTransportAudio = disconnectSendTransportAudio;
        this.disconnectSendTransportScreen = disconnectSendTransportScreen;
        this.getPipedProducersAlt = getPipedProducersAlt;
        this.signalNewConsumerTransport = signalNewConsumerTransport;
        this.connectRecvTransport = connectRecvTransport;
        this.reUpdateInter = reUpdateInter;
        this.updateParticipantAudioDecibels = updateParticipantAudioDecibels;
        this.closeAndResize = closeAndResize;
        this.autoAdjust = autoAdjust;
        this.switchUserVideoAlt = switchUserVideoAlt;
        this.switchUserVideo = switchUserVideo;
        this.switchUserAudio = switchUserAudio;
        this.getDomains = getDomains;
        this.formatNumber = formatNumber;
        this.connectIps = connectIps;
        this.createDeviceClient = createDeviceClient;
        this.handleCreatePoll = handleCreatePoll;
        this.handleEndPoll = handleEndPoll;
        this.handleVotePoll = handleVotePoll;
        this.captureCanvasStream = captureCanvasStream;
        this.resumePauseAudioStreams = resumePauseAudioStreams;
        this.processConsumerTransportsAudio = processConsumerTransportsAudio;
        this.launchMenuModal = launchMenuModal;
        this.launchRecording = launchRecording;
        this.startRecording = startRecording;
        this.confirmRecording = confirmRecording;
        this.launchWaiting = launchWaiting;
        this.launchCoHost = launchCoHost;
        this.launchMediaSettings = launchMediaSettings;
        this.launchDisplaySettings = launchDisplaySettings;
        this.launchSettings = launchSettings;
        this.launchRequests = launchRequests;
        this.launchParticipants = launchParticipants;
        this.launchMessages = launchMessages;
        this.launchConfirmExit = launchConfirmExit;
        this.launchPoll = launchPoll;
        this.launchBreakoutRooms = launchBreakoutRooms;
        this.launchConfigureWhiteboard = launchConfigureWhiteboard;
        this.startMeetingProgressTimer = startMeetingProgressTimer;
        this.updateRecording = updateRecording;
        this.stopRecording = stopRecording;
        this.userWaiting = userWaiting;
        this.personJoined = personJoined;
        this.allWaitingRoomMembers = allWaitingRoomMembers;
        this.roomRecordParams = roomRecordParams;
        this.banParticipant = banParticipant;
        this.updatedCoHost = updatedCoHost;
        this.participantRequested = participantRequested;
        this.screenProducerId = screenProducerId;
        this.updateMediaSettings = updateMediaSettings;
        this.producerMediaPaused = producerMediaPaused;
        this.producerMediaResumed = producerMediaResumed;
        this.producerMediaClosed = producerMediaClosed;
        this.controlMediaHost = controlMediaHost;
        this.meetingEnded = meetingEnded;
        this.disconnectUserSelf = disconnectUserSelf;
        this.receiveMessage = receiveMessage;
        this.meetingTimeRemaining = meetingTimeRemaining;
        this.meetingStillThere = meetingStillThere;
        this.startRecords = startRecords;
        this.reInitiateRecording = reInitiateRecording;
        this.recordingNotice = recordingNotice;
        this.timeLeftRecording = timeLeftRecording;
        this.stoppedRecording = stoppedRecording;
        this.hostRequestResponse = hostRequestResponse;
        this.allMembers = allMembers;
        this.allMembersRest = allMembersRest;
        this.disconnect = disconnect;
        this.pollUpdated = pollUpdated;
        this.breakoutRoomUpdated = breakoutRoomUpdated;
        this.socketManager = socketManager;
        this.joinRoomClient = joinRoomClient;
        this.updateRoomParametersClient = updateRoomParametersClient;
        this.clickVideo = clickVideo;
        this.clickAudio = clickAudio;
        this.clickScreenShare = clickScreenShare;
        this.switchVideoAlt = switchVideoAlt;
        this.streamSuccessVideo = streamSuccessVideo;
        this.streamSuccessAudio = streamSuccessAudio;
        this.streamSuccessScreen = streamSuccessScreen;
        this.streamSuccessAudioSwitch = streamSuccessAudioSwitch;
        this.checkPermission = checkPermission;
        this.updateConsumingDomains = updateConsumingDomains;
        this.receiveRoomMessages = receiveRoomMessages;
    }
    createInjector(inputs) {
        const inj = Injector.create({
            providers: Object.keys(inputs).map((key) => ({ provide: key, useValue: inputs[key] })),
            parent: this.injector,
        });
        return inj;
    }
    // Initial values
    mediaSFUFunctions = () => {
        return {
            updateMiniCardsGrid: this.updateMiniCardsGrid?.updateMiniCardsGrid ||
                (() => {
                    console.log('none');
                }),
            mixStreams: this.mixStreams?.mixStreams ||
                (() => {
                    console.log('none');
                }),
            dispStreams: this.dispStreams?.dispStreams ||
                (() => {
                    console.log('none');
                }),
            stopShareScreen: this.stopShareScreen?.stopShareScreen ||
                (() => {
                    console.log('none');
                }),
            checkScreenShare: this.checkScreenShare?.checkScreenShare ||
                (() => {
                    console.log('none');
                }),
            startShareScreen: this.startShareScreen?.startShareScreen ||
                (() => {
                    console.log('none');
                }),
            requestScreenShare: this.requestScreenShare?.requestScreenShare ||
                (() => {
                    console.log('none');
                }),
            reorderStreams: this.reorderStreams?.reorderStreams ||
                (() => {
                    console.log('none');
                }),
            prepopulateUserMedia: this.prepopulateUserMedia?.prepopulateUserMedia ||
                (() => {
                    console.log('none');
                }),
            getVideos: this.getVideos?.getVideos ||
                (() => {
                    console.log('none');
                }),
            rePort: this.rePort?.rePort ||
                (() => {
                    console.log('none');
                }),
            trigger: this.trigger?.trigger ||
                (() => {
                    console.log('none');
                }),
            consumerResume: this.consumerResume?.consumerResume ||
                (() => {
                    console.log('none');
                }),
            connectSendTransport: this.connectSendTransport?.connectSendTransport ||
                (() => {
                    console.log('none');
                }),
            connectSendTransportAudio: this.connectSendTransportAudio?.connectSendTransportAudio ||
                (() => {
                    console.log('none');
                }),
            connectSendTransportVideo: this.connectSendTransportVideo?.connectSendTransportVideo ||
                (() => {
                    console.log('none');
                }),
            connectSendTransportScreen: this.connectSendTransportScreen?.connectSendTransportScreen ||
                (() => {
                    console.log('none');
                }),
            processConsumerTransports: this.processConsumerTransports?.processConsumerTransports ||
                (() => {
                    console.log('none');
                }),
            resumePauseStreams: this.resumePauseStreams?.resumePauseStreams ||
                (() => {
                    console.log('none');
                }),
            readjust: this.readjust?.readjust ||
                (() => {
                    console.log('none');
                }),
            checkGrid: this.checkGrid?.checkGrid ||
                (() => {
                    console.log('none');
                }),
            getEstimate: this.getEstimate?.getEstimate ||
                (() => {
                    console.log('none');
                }),
            calculateRowsAndColumns: this.calculateRowsAndColumns?.calculateRowsAndColumns ||
                (() => {
                    console.log('none');
                }),
            addVideosGrid: this.addVideosGrid?.addVideosGrid ||
                (() => {
                    console.log('none');
                }),
            onScreenChanges: this.onScreenChanges?.onScreenChanges ||
                (() => {
                    console.log('none');
                }),
            sleep: sleep ||
                (() => {
                    console.log('none');
                }),
            changeVids: this.changeVids?.changeVids ||
                (() => {
                    console.log('none');
                }),
            compareActiveNames: this.compareActiveNames?.compareActiveNames ||
                (() => {
                    console.log('none');
                }),
            compareScreenStates: this.compareScreenStates?.compareScreenStates ||
                (() => {
                    console.log('none');
                }),
            createSendTransport: this.createSendTransport?.createSendTransport ||
                (() => {
                    console.log('none');
                }),
            resumeSendTransportAudio: this.resumeSendTransportAudio?.resumeSendTransportAudio ||
                (() => {
                    console.log('none');
                }),
            receiveAllPipedTransports: this.receiveAllPipedTransports?.receiveAllPipedTransports ||
                (() => {
                    console.log('none');
                }),
            disconnectSendTransportVideo: this.disconnectSendTransportVideo?.disconnectSendTransportVideo ||
                (() => {
                    console.log('none');
                }),
            disconnectSendTransportAudio: this.disconnectSendTransportAudio?.disconnectSendTransportAudio ||
                (() => {
                    console.log('none');
                }),
            disconnectSendTransportScreen: this.disconnectSendTransportScreen?.disconnectSendTransportScreen ||
                (() => {
                    console.log('none');
                }),
            getPipedProducersAlt: this.getPipedProducersAlt?.getPipedProducersAlt ||
                (() => {
                    console.log('none');
                }),
            signalNewConsumerTransport: this.signalNewConsumerTransport?.signalNewConsumerTransport ||
                (() => {
                    console.log('none');
                }),
            connectRecvTransport: this.connectRecvTransport?.connectRecvTransport ||
                (() => {
                    console.log('none');
                }),
            reUpdateInter: this.reUpdateInter?.reUpdateInter ||
                (() => {
                    console.log('none');
                }),
            updateParticipantAudioDecibels: this.updateParticipantAudioDecibels?.updateParticipantAudioDecibels ||
                (() => {
                    console.log('none');
                }),
            closeAndResize: this.closeAndResize?.closeAndResize ||
                (() => {
                    console.log('none');
                }),
            autoAdjust: this.autoAdjust?.autoAdjust ||
                (() => {
                    console.log('none');
                }),
            switchUserVideoAlt: this.switchUserVideoAlt?.switchUserVideoAlt ||
                (() => {
                    console.log('none');
                }),
            switchUserVideo: this.switchUserVideo?.switchUserVideo ||
                (() => {
                    console.log('none');
                }),
            switchUserAudio: this.switchUserAudio?.switchUserAudio ||
                (() => {
                    console.log('none');
                }),
            getDomains: this.getDomains?.getDomains ||
                (() => {
                    console.log('none');
                }),
            formatNumber: this.formatNumber?.formatNumber ||
                (() => {
                    console.log('none');
                }),
            connectIps: this.connectIps?.connectIps ||
                (() => {
                    console.log('none');
                }),
            createDeviceClient: this.createDeviceClient?.createDeviceClient ||
                (() => {
                    console.log('none');
                }),
            handleCreatePoll: this.handleCreatePoll?.handleCreatePoll ||
                (() => {
                    console.log('none');
                }),
            handleEndPoll: this.handleEndPoll?.handleEndPoll ||
                (() => {
                    console.log('none');
                }),
            handleVotePoll: this.handleVotePoll?.handleVotePoll ||
                (() => {
                    console.log('none');
                }),
            captureCanvasStream: this.captureCanvasStream?.captureCanvasStream ||
                (() => {
                    console.log('none');
                }),
            resumePauseAudioStreams: this.resumePauseAudioStreams?.resumePauseAudioStreams ||
                (() => {
                    console.log('none');
                }),
            processConsumerTransportsAudio: this.processConsumerTransportsAudio?.processConsumerTransportsAudio ||
                (() => {
                    console.log('none');
                }),
            checkPermission: this.checkPermission?.checkPermission ||
                (() => {
                    console.log('none');
                }),
            streamSuccessVideo: this.streamSuccessVideo?.streamSuccessVideo ||
                (() => {
                    console.log('none');
                }),
            streamSuccessAudio: this.streamSuccessAudio?.streamSuccessAudio ||
                (() => {
                    console.log('none');
                }),
            streamSuccessScreen: this.streamSuccessScreen?.streamSuccessScreen ||
                (() => {
                    console.log('none');
                }),
            streamSuccessAudioSwitch: this.streamSuccessAudioSwitch?.streamSuccessAudioSwitch ||
                (() => {
                    console.log('none');
                }),
            clickVideo: this.clickVideo?.clickVideo ||
                (() => {
                    console.log('none');
                }),
            clickAudio: this.clickAudio?.clickAudio ||
                (() => {
                    console.log('none');
                }),
            clickScreenShare: this.clickScreenShare?.clickScreenShare ||
                (() => {
                    console.log('none');
                }),
            switchVideoAlt: this.switchVideoAlt?.switchVideoAlt ||
                (() => {
                    console.log('none');
                }),
            requestPermissionCamera: this.requestPermissionCamera ||
                (() => {
                    console.log('none');
                }),
            requestPermissionAudio: this.requestPermissionAudio ||
                (() => {
                    console.log('none');
                }),
        };
    };
    validated = new BehaviorSubject(false);
    localUIMode = new BehaviorSubject(false);
    socket = new BehaviorSubject({});
    roomData = new BehaviorSubject(null);
    device = new BehaviorSubject(null);
    apiKey = new BehaviorSubject('021193742c935c4434d25d7592362575fcb6d6590b6c38334a2f3e06c83af758');
    apiUserName = new BehaviorSubject('abcdefgh');
    apiToken = new BehaviorSubject('');
    link = new BehaviorSubject('');
    roomName = new BehaviorSubject('');
    member = new BehaviorSubject('');
    adminPasscode = new BehaviorSubject('');
    islevel = new BehaviorSubject('1');
    coHost = new BehaviorSubject('No coHost');
    coHostResponsibility = new BehaviorSubject([
        { name: 'participants', value: false, dedicated: false },
        { name: 'media', value: false, dedicated: false },
        { name: 'waiting', value: false, dedicated: false },
        { name: 'chat', value: false, dedicated: false },
    ]);
    youAreCoHost = new BehaviorSubject(false);
    youAreHost = new BehaviorSubject(false);
    confirmedToRecord = new BehaviorSubject(false);
    meetingDisplayType = new BehaviorSubject('media');
    meetingVideoOptimized = new BehaviorSubject(false);
    eventType = new BehaviorSubject('webinar');
    participants = new BehaviorSubject([]);
    filteredParticipants = new BehaviorSubject([]);
    participantsCounter = new BehaviorSubject(0);
    participantsFilter = new BehaviorSubject('');
    consume_sockets = new BehaviorSubject([]);
    rtpCapabilities = new BehaviorSubject(null);
    roomRecvIPs = new BehaviorSubject([]);
    meetingRoomParams = new BehaviorSubject(null);
    itemPageLimit = new BehaviorSubject(4);
    audioOnlyRoom = new BehaviorSubject(false);
    addForBasic = new BehaviorSubject(false);
    screenPageLimit = new BehaviorSubject(4);
    shareScreenStarted = new BehaviorSubject(false);
    shared = new BehaviorSubject(false);
    targetOrientation = new BehaviorSubject('landscape');
    targetResolution = new BehaviorSubject('sd');
    targetResolutionHost = new BehaviorSubject('sd');
    vidCons = new BehaviorSubject({ width: 640, height: 360 });
    frameRate = new BehaviorSubject(10);
    hParams = new BehaviorSubject({});
    vParams = new BehaviorSubject({});
    screenParams = new BehaviorSubject({});
    aParams = new BehaviorSubject({});
    recordingAudioPausesLimit = new BehaviorSubject(0);
    recordingAudioPausesCount = new BehaviorSubject(0);
    recordingAudioSupport = new BehaviorSubject(false);
    recordingAudioPeopleLimit = new BehaviorSubject(0);
    recordingAudioParticipantsTimeLimit = new BehaviorSubject(0);
    recordingVideoPausesCount = new BehaviorSubject(0);
    recordingVideoPausesLimit = new BehaviorSubject(0);
    recordingVideoSupport = new BehaviorSubject(false);
    recordingVideoPeopleLimit = new BehaviorSubject(0);
    recordingVideoParticipantsTimeLimit = new BehaviorSubject(0);
    recordingAllParticipantsSupport = new BehaviorSubject(false);
    recordingVideoParticipantsSupport = new BehaviorSubject(false);
    recordingAllParticipantsFullRoomSupport = new BehaviorSubject(false);
    recordingVideoParticipantsFullRoomSupport = new BehaviorSubject(false);
    recordingPreferredOrientation = new BehaviorSubject('landscape');
    recordingSupportForOtherOrientation = new BehaviorSubject(false);
    recordingMultiFormatsSupport = new BehaviorSubject(false);
    userRecordingParams = new BehaviorSubject({
        mainSpecs: {
            mediaOptions: 'video', // 'audio', 'video'
            audioOptions: 'all', // 'all', 'onScreen', 'host'
            videoOptions: 'all', // 'all', 'mainScreen'
            videoType: 'fullDisplay', // 'all', 'bestDisplay', 'fullDisplay'
            videoOptimized: false, // true, false
            recordingDisplayType: 'media', // 'media', 'video', 'all'
            addHLS: false, // true, false
        },
        dispSpecs: {
            nameTags: true, // true, false
            backgroundColor: '#000000', // '#000000', '#ffffff'
            nameTagsColor: '#ffffff', // '#000000', '#ffffff'
            orientationVideo: 'portrait', // 'landscape', 'portrait', 'all'
        },
    });
    canRecord = new BehaviorSubject(false);
    startReport = new BehaviorSubject(false);
    endReport = new BehaviorSubject(false);
    recordTimerInterval = new BehaviorSubject(null);
    recordStartTime = new BehaviorSubject(0);
    recordElapsedTime = new BehaviorSubject(0);
    isTimerRunning = new BehaviorSubject(false);
    canPauseResume = new BehaviorSubject(false);
    recordChangeSeconds = new BehaviorSubject(15000);
    pauseLimit = new BehaviorSubject(0);
    pauseRecordCount = new BehaviorSubject(0);
    canLaunchRecord = new BehaviorSubject(true);
    stopLaunchRecord = new BehaviorSubject(false);
    participantsAll = new BehaviorSubject([]);
    firstAll = new BehaviorSubject(false);
    updateMainWindow = new BehaviorSubject(false);
    first_round = new BehaviorSubject(false);
    landScaped = new BehaviorSubject(false);
    lock_screen = new BehaviorSubject(false);
    screenId = new BehaviorSubject('');
    allVideoStreams = new BehaviorSubject([]);
    newLimitedStreams = new BehaviorSubject([]);
    newLimitedStreamsIDs = new BehaviorSubject([]);
    activeSounds = new BehaviorSubject([]);
    screenShareIDStream = new BehaviorSubject('');
    screenShareNameStream = new BehaviorSubject('');
    adminIDStream = new BehaviorSubject('');
    adminNameStream = new BehaviorSubject('');
    youYouStream = new BehaviorSubject([]);
    youYouStreamIDs = new BehaviorSubject([]);
    localStream = new BehaviorSubject(null);
    recordStarted = new BehaviorSubject(false);
    recordResumed = new BehaviorSubject(false);
    recordPaused = new BehaviorSubject(false);
    recordStopped = new BehaviorSubject(false);
    adminRestrictSetting = new BehaviorSubject(false);
    videoRequestState = new BehaviorSubject(null);
    videoRequestTime = new BehaviorSubject(0);
    videoAction = new BehaviorSubject(false);
    localStreamVideo = new BehaviorSubject(null);
    userDefaultVideoInputDevice = new BehaviorSubject('');
    currentFacingMode = new BehaviorSubject('user');
    prevFacingMode = new BehaviorSubject('user');
    defVideoID = new BehaviorSubject('');
    allowed = new BehaviorSubject(false);
    dispActiveNames = new BehaviorSubject([]);
    p_dispActiveNames = new BehaviorSubject([]);
    activeNames = new BehaviorSubject([]);
    prevActiveNames = new BehaviorSubject([]);
    p_activeNames = new BehaviorSubject([]);
    membersReceived = new BehaviorSubject(false);
    deferScreenReceived = new BehaviorSubject(false);
    hostFirstSwitch = new BehaviorSubject(false);
    micAction = new BehaviorSubject(false);
    screenAction = new BehaviorSubject(false);
    chatAction = new BehaviorSubject(false);
    audioRequestState = new BehaviorSubject(null);
    screenRequestState = new BehaviorSubject(null);
    chatRequestState = new BehaviorSubject(null);
    audioRequestTime = new BehaviorSubject(0);
    screenRequestTime = new BehaviorSubject(0);
    chatRequestTime = new BehaviorSubject(0);
    updateRequestIntervalSeconds = new BehaviorSubject(240);
    oldSoundIds = new BehaviorSubject([]);
    hostLabel = new BehaviorSubject('Host');
    mainScreenFilled = new BehaviorSubject(false);
    localStreamScreen = new BehaviorSubject(null);
    screenAlreadyOn = new BehaviorSubject(false);
    chatAlreadyOn = new BehaviorSubject(false);
    redirectURL = new BehaviorSubject('');
    oldAllStreams = new BehaviorSubject([]);
    adminVidID = new BehaviorSubject('');
    streamNames = new BehaviorSubject([]);
    non_alVideoStreams = new BehaviorSubject([]);
    sortAudioLoudness = new BehaviorSubject(false);
    audioDecibels = new BehaviorSubject([]);
    mixed_alVideoStreams = new BehaviorSubject([]);
    non_alVideoStreams_muted = new BehaviorSubject([]);
    paginatedStreams = new BehaviorSubject([]);
    localStreamAudio = new BehaviorSubject(null);
    defAudioID = new BehaviorSubject('');
    userDefaultAudioInputDevice = new BehaviorSubject('');
    userDefaultAudioOutputDevice = new BehaviorSubject('');
    prevAudioInputDevice = new BehaviorSubject('');
    prevVideoInputDevice = new BehaviorSubject('');
    audioPaused = new BehaviorSubject(false);
    mainScreenPerson = new BehaviorSubject('');
    adminOnMainScreen = new BehaviorSubject(false);
    screenStates = new BehaviorSubject([
        {
            mainScreenPerson: '',
            mainScreenProducerId: '',
            mainScreenFilled: false,
            adminOnMainScreen: false,
        },
    ]);
    prevScreenStates = new BehaviorSubject([
        {
            mainScreenPerson: '',
            mainScreenProducerId: '',
            mainScreenFilled: false,
            adminOnMainScreen: false,
        },
    ]);
    updateDateState = new BehaviorSubject(null);
    lastUpdate = new BehaviorSubject(null);
    nForReadjustRecord = new BehaviorSubject(0);
    fixedPageLimit = new BehaviorSubject(4);
    removeAltGrid = new BehaviorSubject(false);
    nForReadjust = new BehaviorSubject(0);
    reorderInterval = new BehaviorSubject(30000);
    fastReorderInterval = new BehaviorSubject(10000);
    lastReorderTime = new BehaviorSubject(0);
    audStreamNames = new BehaviorSubject([]);
    currentUserPage = new BehaviorSubject(0);
    mainHeightWidth = new BehaviorSubject(this.eventType.value == 'webinar' ? 67 : this.eventType.value == 'broadcast' ? 100 : 0);
    prevMainHeightWidth = new BehaviorSubject(this.mainHeightWidth.value);
    prevDoPaginate = new BehaviorSubject(false);
    doPaginate = new BehaviorSubject(false);
    shareEnded = new BehaviorSubject(false);
    lStreams = new BehaviorSubject([]);
    chatRefStreams = new BehaviorSubject([]);
    controlHeight = new BehaviorSubject(this.eventType.value === 'webinar' || this.eventType.value === 'conference' ? 0 : 0.06);
    isWideScreen = new BehaviorSubject(false);
    isMediumScreen = new BehaviorSubject(false);
    isSmallScreen = new BehaviorSubject(false);
    addGrid = new BehaviorSubject(false);
    addAltGrid = new BehaviorSubject(false);
    gridRows = new BehaviorSubject(0);
    gridCols = new BehaviorSubject(0);
    altGridRows = new BehaviorSubject(0);
    altGridCols = new BehaviorSubject(0);
    numberPages = new BehaviorSubject(0);
    currentStreams = new BehaviorSubject([]);
    showMiniView = new BehaviorSubject(false);
    nStream = new BehaviorSubject(null);
    defer_receive = new BehaviorSubject(false);
    allAudioStreams = new BehaviorSubject([]);
    remoteScreenStream = new BehaviorSubject([]);
    screenProducer = new BehaviorSubject(null);
    gotAllVids = new BehaviorSubject(false);
    paginationHeightWidth = new BehaviorSubject(40);
    paginationDirection = new BehaviorSubject('horizontal');
    gridSizes = new BehaviorSubject({
        gridWidth: 0,
        gridHeight: 0,
        altGridWidth: 0,
        altGridHeight: 0,
    });
    screenForceFullDisplay = new BehaviorSubject(false);
    mainGridStream = new BehaviorSubject([]);
    otherGridStreams = new BehaviorSubject([]);
    audioOnlyStreams = new BehaviorSubject([]);
    videoInputs = new BehaviorSubject([]);
    audioInputs = new BehaviorSubject([]);
    meetingProgressTime = new BehaviorSubject('00:00:00');
    meetingElapsedTime = new BehaviorSubject(0);
    ref_participants = new BehaviorSubject([]);
    updateValidated = (value) => {
        this.validated.next(value);
    };
    updateSocket = (value) => {
        this.socket.next(value);
    };
    updateDevice = (value) => {
        this.device.next(value);
    };
    updateRoomData = (value) => {
        this.roomData.next(value);
    };
    updateApiKey = (value) => {
        this.apiKey.next(value);
    };
    updateApiUserName = (value) => {
        this.apiUserName.next(value);
    };
    updateApiToken = (value) => {
        this.apiToken.next(value);
    };
    updateLink = (value) => {
        this.link.next(value);
    };
    updateRoomName = (value) => {
        this.roomName.next(value);
    };
    updateMember = (value) => {
        this.member.next(value);
    };
    updateAdminPasscode = (value) => {
        this.adminPasscode.next(value);
    };
    updateIslevel = (value) => {
        this.islevel.next(value);
    };
    updateCoHost = (value) => {
        this.coHost.next(value);
    };
    updateCoHostResponsibility = (value) => {
        this.coHostResponsibility.next(value);
    };
    updateYouAreCoHost = (value) => {
        this.youAreCoHost.next(value);
    };
    updateYouAreHost = (value) => {
        this.youAreHost.next(value);
    };
    updateConfirmedToRecord = (value) => {
        this.confirmedToRecord.next(value);
    };
    updateMeetingDisplayType = (value) => {
        this.meetingDisplayType.next(value);
    };
    updateMeetingVideoOptimized = (value) => {
        this.meetingVideoOptimized.next(value);
    };
    updateEventType = (value) => {
        this.eventType.next(value);
        if (value != 'none') {
            try {
                setTimeout(() => {
                    this.handleResize();
                }, 2000);
            }
            catch {
                /* handle error */
            }
        }
    };
    updateParticipants = (value) => {
        this.participants.next(value);
        this.participantsCounter.next(value.length);
        this.filteredParticipants.next(this.participants.value);
    };
    updateFilteredParticipants = (value) => {
        this.filteredParticipants.next(value);
    };
    updateParticipantsCounter = (value) => {
        this.participantsCounter.next(value);
    };
    updateParticipantsFilter = (value) => {
        this.participantsFilter.next(value);
    };
    updateConsume_sockets = (value) => {
        this.consume_sockets.next(value);
    };
    updateRtpCapabilities = (value) => {
        this.rtpCapabilities.next(value);
    };
    updateRoomRecvIPs = (value) => {
        this.roomRecvIPs.next(value);
    };
    updateMeetingRoomParams = (value) => {
        this.meetingRoomParams.next(value);
    };
    updateItemPageLimit = (value) => {
        this.itemPageLimit.next(value);
    };
    updateAudioOnlyRoom = (value) => {
        this.audioOnlyRoom.next(value);
    };
    updateAddForBasic = (value) => {
        this.addForBasic.next(value);
    };
    updateScreenPageLimit = (value) => {
        this.screenPageLimit.next(value);
    };
    updateShareScreenStarted = (value) => {
        this.shareScreenStarted.next(value);
    };
    updateShared = (value) => {
        this.shared.next(value);
        this.screenShareActive.next(value);
        if (value) {
            setTimeout(async () => {
                window.dispatchEvent(new Event('resize'));
            }, 2000);
        }
    };
    updateTargetOrientation = (value) => {
        this.targetOrientation.next(value);
    };
    updateTargetResolution = (value) => {
        this.targetResolution.next(value);
    };
    updateTargetResolutionHost = (value) => {
        this.targetResolutionHost.next(value);
    };
    updateVidCons = (value) => {
        this.vidCons.next(value);
    };
    updateFrameRate = (value) => {
        this.frameRate.next(value);
    };
    updateHParams = (value) => {
        this.hParams.next(value);
    };
    updateVParams = (value) => {
        this.vParams.next(value);
    };
    updateScreenParams = (value) => {
        this.screenParams.next(value);
    };
    updateAParams = (value) => {
        this.aParams.next(value);
    };
    updateRecordingAudioPausesLimit = (value) => {
        this.recordingAudioPausesLimit.next(value);
    };
    updateRecordingAudioPausesCount = (value) => {
        this.recordingAudioPausesCount.next(value);
    };
    updateRecordingAudioSupport = (value) => {
        this.recordingAudioSupport.next(value);
    };
    updateRecordingAudioPeopleLimit = (value) => {
        this.recordingAudioPeopleLimit.next(value);
    };
    updateRecordingAudioParticipantsTimeLimit = (value) => {
        this.recordingAudioParticipantsTimeLimit.next(value);
    };
    updateRecordingVideoPausesCount = (value) => {
        this.recordingVideoPausesCount.next(value);
    };
    updateRecordingVideoPausesLimit = (value) => {
        this.recordingVideoPausesLimit.next(value);
    };
    updateRecordingVideoSupport = (value) => {
        this.recordingVideoSupport.next(value);
    };
    updateRecordingVideoPeopleLimit = (value) => {
        this.recordingVideoPeopleLimit.next(value);
    };
    updateRecordingVideoParticipantsTimeLimit = (value) => {
        this.recordingVideoParticipantsTimeLimit.next(value);
    };
    updateRecordingAllParticipantsSupport = (value) => {
        this.recordingAllParticipantsSupport.next(value);
    };
    updateRecordingVideoParticipantsSupport = (value) => {
        this.recordingVideoParticipantsSupport.next(value);
    };
    updateRecordingAllParticipantsFullRoomSupport = (value) => {
        this.recordingAllParticipantsFullRoomSupport.next(value);
    };
    updateRecordingVideoParticipantsFullRoomSupport = (value) => {
        this.recordingVideoParticipantsFullRoomSupport.next(value);
    };
    updateRecordingPreferredOrientation = (value) => {
        this.recordingPreferredOrientation.next(value);
    };
    updateRecordingSupportForOtherOrientation = (value) => {
        this.recordingSupportForOtherOrientation.next(value);
    };
    updateRecordingMultiFormatsSupport = (value) => {
        this.recordingMultiFormatsSupport.next(value);
    };
    updateUserRecordingParams = (value) => {
        this.userRecordingParams.next(value);
    };
    updateCanRecord = (value) => {
        this.canRecord.next(value);
    };
    updateStartReport = (value) => {
        this.startReport.next(value);
    };
    updateEndReport = (value) => {
        this.endReport.next(value);
    };
    updateRecordTimerInterval = (value) => {
        this.recordTimerInterval.next(value);
    };
    updateRecordStartTime = (value) => {
        this.recordStartTime.next(value);
    };
    updateRecordElapsedTime = (value) => {
        this.recordElapsedTime.next(value);
    };
    updateIsTimerRunning = (value) => {
        this.isTimerRunning.next(value);
    };
    updateCanPauseResume = (value) => {
        this.canPauseResume.next(value);
    };
    updateRecordChangeSeconds = (value) => {
        this.recordChangeSeconds.next(value);
    };
    updatePauseLimit = (value) => {
        this.pauseLimit.next(value);
    };
    updatePauseRecordCount = (value) => {
        this.pauseRecordCount.next(value);
    };
    updateCanLaunchRecord = (value) => {
        this.canLaunchRecord.next(value);
    };
    updateStopLaunchRecord = (value) => {
        this.stopLaunchRecord.next(value);
    };
    updateParticipantsAll = (value) => {
        this.participantsAll.next(value);
    };
    updateFirstAll = (value) => {
        this.firstAll.next(value);
    };
    updateUpdateMainWindow = (value) => {
        this.updateMainWindow.next(value);
    };
    updateFirst_round = (value) => {
        this.first_round.next(value);
    };
    updateLandScaped = (value) => {
        this.landScaped.next(value);
    };
    updateLock_screen = (value) => {
        this.lock_screen.next(value);
    };
    updateScreenId = (value) => {
        this.screenId.next(value);
    };
    updateAllVideoStreams = (value) => {
        this.allVideoStreams.next(value);
    };
    updateNewLimitedStreams = (value) => {
        this.newLimitedStreams.next(value);
    };
    updateNewLimitedStreamsIDs = (value) => {
        this.newLimitedStreamsIDs.next(value);
    };
    updateActiveSounds = (value) => {
        this.activeSounds.next(value);
    };
    updateScreenShareIDStream = (value) => {
        this.screenShareIDStream.next(value);
    };
    updateScreenShareNameStream = (value) => {
        this.screenShareNameStream.next(value);
    };
    updateAdminIDStream = (value) => {
        this.adminIDStream.next(value);
    };
    updateAdminNameStream = (value) => {
        this.adminNameStream.next(value);
    };
    updateYouYouStream = (value) => {
        this.youYouStream.next(value);
    };
    updateYouYouStreamIDs = (value) => {
        this.youYouStreamIDs.next(value);
    };
    updateLocalStream = (value) => {
        this.localStream.next(value);
    };
    updateRecordStarted = (value) => {
        this.recordStarted.next(value);
    };
    updateRecordResumed = (value) => {
        this.recordResumed.next(value);
    };
    updateRecordPaused = (value) => {
        this.recordPaused.next(value);
    };
    updateRecordStopped = (value) => {
        this.recordStopped.next(value);
    };
    updateAdminRestrictSetting = (value) => {
        this.adminRestrictSetting.next(value);
    };
    updateVideoRequestState = (value) => {
        this.videoRequestState.next(value);
    };
    updateVideoRequestTime = (value) => {
        this.videoRequestTime.next(value);
    };
    updateVideoAction = (value) => {
        this.videoAction.next(value);
    };
    updateLocalStreamVideo = (value) => {
        this.localStreamVideo.next(value);
    };
    updateUserDefaultVideoInputDevice = (value) => {
        this.userDefaultVideoInputDevice.next(value);
    };
    updateCurrentFacingMode = (value) => {
        this.currentFacingMode.next(value);
    };
    updatePrevFacingMode = (value) => {
        this.prevFacingMode.next(value);
    };
    updateDefVideoID = (value) => {
        this.defVideoID.next(value);
    };
    updateAllowed = (value) => {
        this.allowed.next(value);
    };
    updateDispActiveNames = (value) => {
        this.dispActiveNames.next(value);
    };
    updateP_dispActiveNames = (value) => {
        this.p_dispActiveNames.next(value);
    };
    updateActiveNames = (value) => {
        this.activeNames.next(value);
    };
    updatePrevActiveNames = (value) => {
        this.prevActiveNames.next(value);
    };
    updateP_activeNames = (value) => {
        this.p_activeNames.next(value);
    };
    updateMembersReceived = (value) => {
        this.membersReceived.next(value);
    };
    updateDeferScreenReceived = (value) => {
        this.deferScreenReceived.next(value);
    };
    updateHostFirstSwitch = (value) => {
        this.hostFirstSwitch.next(value);
    };
    updateMicAction = (value) => {
        this.micAction.next(value);
    };
    updateScreenAction = (value) => {
        this.screenAction.next(value);
    };
    updateChatAction = (value) => {
        this.chatAction.next(value);
    };
    updateAudioRequestState = (value) => {
        this.audioRequestState.next(value);
    };
    updateScreenRequestState = (value) => {
        this.screenRequestState.next(value);
    };
    updateChatRequestState = (value) => {
        this.chatRequestState.next(value);
    };
    updateAudioRequestTime = (value) => {
        this.audioRequestTime.next(value);
    };
    updateScreenRequestTime = (value) => {
        this.screenRequestTime.next(value);
    };
    updateChatRequestTime = (value) => {
        this.chatRequestTime.next(value);
    };
    updateOldSoundIds = (value) => {
        this.oldSoundIds.next(value);
    };
    updateHostLabel = (value) => {
        this.hostLabel.next(value);
    };
    updateMainScreenFilled = (value) => {
        this.mainScreenFilled.next(value);
    };
    updateLocalStreamScreen = (value) => {
        this.localStreamScreen.next(value);
    };
    updateScreenAlreadyOn = (value) => {
        this.screenAlreadyOn.next(value);
    };
    updateChatAlreadyOn = (value) => {
        this.chatAlreadyOn.next(value);
    };
    updateRedirectURL = (value) => {
        this.redirectURL.next(value);
    };
    updateOldAllStreams = (value) => {
        this.oldAllStreams.next(value);
    };
    updateAdminVidID = (value) => {
        this.adminVidID.next(value);
    };
    updateStreamNames = (value) => {
        this.streamNames.next(value);
    };
    updateNon_alVideoStreams = (value) => {
        this.non_alVideoStreams.next(value);
    };
    updateSortAudioLoudness = (value) => {
        this.sortAudioLoudness.next(value);
    };
    updateAudioDecibels = (value) => {
        this.audioDecibels.next(value);
    };
    updateMixed_alVideoStreams = (value) => {
        this.mixed_alVideoStreams.next(value);
    };
    updateNon_alVideoStreams_muted = (value) => {
        this.non_alVideoStreams_muted.next(value);
    };
    updatePaginatedStreams = (value) => {
        this.paginatedStreams.next(value);
    };
    updateLocalStreamAudio = (value) => {
        this.localStreamAudio.next(value);
    };
    updateDefAudioID = (value) => {
        this.defAudioID.next(value);
    };
    updateUserDefaultAudioInputDevice = (value) => {
        this.userDefaultAudioInputDevice.next(value);
    };
    updateUserDefaultAudioOutputDevice = (value) => {
        this.userDefaultAudioOutputDevice.next(value);
    };
    updatePrevAudioInputDevice = (value) => {
        this.prevAudioInputDevice.next(value);
    };
    updatePrevVideoInputDevice = (value) => {
        this.prevVideoInputDevice.next(value);
    };
    updateAudioPaused = (value) => {
        this.audioPaused.next(value);
    };
    updateMainScreenPerson = (value) => {
        this.mainScreenPerson.next(value);
    };
    updateAdminOnMainScreen = (value) => {
        this.adminOnMainScreen.next(value);
    };
    updateScreenStates = (value) => {
        this.screenStates.next(value);
    };
    updatePrevScreenStates = (value) => {
        this.prevScreenStates.next(value);
    };
    updateUpdateDateState = (value) => {
        this.updateDateState.next(value);
    };
    updateLastUpdate = (value) => {
        this.lastUpdate.next(value);
    };
    updateNForReadjustRecord = (value) => {
        this.nForReadjustRecord.next(value);
    };
    updateFixedPageLimit = (value) => {
        this.fixedPageLimit.next(value);
    };
    updateRemoveAltGrid = (value) => {
        this.removeAltGrid.next(value);
    };
    updateNForReadjust = (value) => {
        this.nForReadjust.next(value);
    };
    updateLastReorderTime = (value) => {
        this.lastReorderTime.next(value);
    };
    updateAudStreamNames = (value) => {
        this.audStreamNames.next(value);
    };
    updateCurrentUserPage = (value) => {
        this.currentUserPage.next(value);
    };
    updateMainHeightWidth = (value) => {
        this.mainHeightWidth.next(value);
    };
    updatePrevMainHeightWidth = (value) => {
        this.prevMainHeightWidth.next(value);
    };
    updatePrevDoPaginate = (value) => {
        this.prevDoPaginate.next(value);
    };
    updateDoPaginate = (value) => {
        this.doPaginate.next(value);
    };
    updateShareEnded = (value) => {
        this.shareEnded.next(value);
    };
    updateLStreams = (value) => {
        this.lStreams.next(value);
    };
    updateChatRefStreams = (value) => {
        this.chatRefStreams.next(value);
    };
    updateControlHeight = (value) => {
        this.controlHeight.next(value);
    };
    updateIsWideScreen = (value) => {
        this.isWideScreen.next(value);
    };
    updateIsMediumScreen = (value) => {
        this.isMediumScreen.next(value);
    };
    updateIsSmallScreen = (value) => {
        this.isSmallScreen.next(value);
    };
    updateAddGrid = (value) => {
        this.addGrid.next(value);
    };
    updateAddAltGrid = (value) => {
        this.addAltGrid.next(value);
    };
    updateGridRows = (value) => {
        this.gridRows.next(value);
    };
    updateGridCols = (value) => {
        this.gridCols.next(value);
    };
    updateAltGridRows = (value) => {
        this.altGridRows.next(value);
    };
    updateAltGridCols = (value) => {
        this.altGridCols.next(value);
    };
    updateNumberPages = (value) => {
        this.numberPages.next(value);
    };
    updateCurrentStreams = (value) => {
        this.currentStreams.next(value);
    };
    updateShowMiniView = (value) => {
        this.showMiniView.next(value);
    };
    updateNStream = (value) => {
        this.nStream.next(value);
    };
    updateDefer_receive = (value) => {
        this.defer_receive.next(value);
    };
    updateAllAudioStreams = (value) => {
        this.allAudioStreams.next(value);
    };
    updateRemoteScreenStream = (value) => {
        this.remoteScreenStream.next(value);
    };
    updateScreenProducer = (value) => {
        this.screenProducer.next(value);
    };
    updateGotAllVids = (value) => {
        this.gotAllVids.next(value);
    };
    updatePaginationHeightWidth = (value) => {
        this.paginationHeightWidth.next(value);
    };
    updatePaginationDirection = (value) => {
        this.paginationDirection.next(value);
    };
    updateGridSizes = (value) => {
        this.gridSizes.next(value);
    };
    updateScreenForceFullDisplay = (value) => {
        this.screenForceFullDisplay.next(value);
    };
    updateMainGridStream = (value) => {
        this.mainGridStream.next(value);
    };
    updateOtherGridStreams = (value) => {
        this.otherGridStreams.next(value);
    };
    updateAudioOnlyStreams = (value) => {
        this.audioOnlyStreams.next(value);
    };
    updateVideoInputs = (value) => {
        this.videoInputs.next(value);
    };
    updateAudioInputs = (value) => {
        this.audioInputs.next(value);
    };
    updateMeetingProgressTime = (value) => {
        this.meetingProgressTime.next(value);
    };
    updateMeetingElapsedTime = (value) => {
        this.meetingElapsedTime.next(value);
    };
    updateRef_participants = (value) => {
        this.ref_participants.next(value);
    };
    // Messages
    messages = new BehaviorSubject([]);
    startDirectMessage = new BehaviorSubject(false);
    directMessageDetails = new BehaviorSubject(null);
    showMessagesBadge = new BehaviorSubject(false);
    // Event Settings
    audioSetting = new BehaviorSubject('allow');
    videoSetting = new BehaviorSubject('allow');
    screenshareSetting = new BehaviorSubject('allow');
    chatSetting = new BehaviorSubject('allow');
    // Display Settings
    displayOption = new BehaviorSubject('media');
    autoWave = new BehaviorSubject(true);
    forceFullDisplay = new BehaviorSubject(true);
    prevForceFullDisplay = new BehaviorSubject(false);
    prevMeetingDisplayType = new BehaviorSubject('video');
    // Waiting Room
    waitingRoomFilter = new BehaviorSubject('');
    waitingRoomList = new BehaviorSubject(this.useSeed && this.seedData?.waitingList ? this.seedData.waitingList : []);
    waitingRoomCounter = new BehaviorSubject(0);
    filteredWaitingRoomList = new BehaviorSubject(this.useSeed && this.seedData?.waitingList ? this.seedData.waitingList : []);
    // Requests
    requestFilter = new BehaviorSubject('');
    requestList = new BehaviorSubject(this.useSeed && this.seedData?.requests ? this.seedData.requests : []);
    requestCounter = new BehaviorSubject(0);
    filteredRequestList = new BehaviorSubject(this.useSeed && this.seedData?.requests ? this.seedData.requests : []);
    // Total Requests and Waiting Room
    totalReqWait = new BehaviorSubject(0);
    // Alerts
    alertVisible = new BehaviorSubject(false);
    alertMessage = new BehaviorSubject('');
    alertType = new BehaviorSubject('success');
    alertDuration = new BehaviorSubject(3000);
    // Progress Timer
    progressTimerVisible = new BehaviorSubject(true);
    progressTimerValue = new BehaviorSubject(0);
    // Menu Modals
    isMenuModalVisible = new BehaviorSubject(false);
    isRecordingModalVisible = new BehaviorSubject(false);
    isSettingsModalVisible = new BehaviorSubject(false);
    isRequestsModalVisible = new BehaviorSubject(false);
    isWaitingModalVisible = new BehaviorSubject(false);
    isCoHostModalVisible = new BehaviorSubject(false);
    isMediaSettingsModalVisible = new BehaviorSubject(false);
    isDisplaySettingsModalVisible = new BehaviorSubject(false);
    // Other Modals
    isParticipantsModalVisible = new BehaviorSubject(false);
    isMessagesModalVisible = new BehaviorSubject(false);
    isConfirmExitModalVisible = new BehaviorSubject(false);
    isConfirmHereModalVisible = new BehaviorSubject(false);
    isShareEventModalVisible = new BehaviorSubject(false);
    isLoadingModalVisible = new BehaviorSubject(false);
    // Recording Options
    recordingMediaOptions = new BehaviorSubject('video');
    recordingAudioOptions = new BehaviorSubject('all');
    recordingVideoOptions = new BehaviorSubject('all');
    recordingVideoType = new BehaviorSubject('fullDisplay');
    recordingVideoOptimized = new BehaviorSubject(false);
    recordingDisplayType = new BehaviorSubject('video');
    recordingAddHLS = new BehaviorSubject(true);
    recordingNameTags = new BehaviorSubject(true);
    recordingBackgroundColor = new BehaviorSubject('#83c0e9');
    recordingNameTagsColor = new BehaviorSubject('#ffffff');
    recordingAddText = new BehaviorSubject(false);
    recordingCustomText = new BehaviorSubject('Add Text');
    recordingCustomTextPosition = new BehaviorSubject('top');
    recordingCustomTextColor = new BehaviorSubject('#ffffff');
    recordingOrientationVideo = new BehaviorSubject('landscape');
    clearedToResume = new BehaviorSubject(true);
    clearedToRecord = new BehaviorSubject(true);
    recordState = new BehaviorSubject('green');
    showRecordButtons = new BehaviorSubject(false);
    recordingProgressTime = new BehaviorSubject('00:00:00');
    audioSwitching = new BehaviorSubject(false);
    videoSwitching = new BehaviorSubject(false);
    // Media States
    videoAlreadyOn = new BehaviorSubject(false);
    audioAlreadyOn = new BehaviorSubject(false);
    componentSizes = new BehaviorSubject({
        mainHeight: 0,
        otherHeight: 0,
        mainWidth: 0,
        otherWidth: 0,
    });
    // Permissions
    hasCameraPermission = new BehaviorSubject(false);
    hasAudioPermission = new BehaviorSubject(false);
    // Transports
    transportCreated = new BehaviorSubject(false);
    transportCreatedVideo = new BehaviorSubject(false);
    transportCreatedAudio = new BehaviorSubject(false);
    transportCreatedScreen = new BehaviorSubject(false);
    producerTransport = new BehaviorSubject(null);
    videoProducer = new BehaviorSubject(null);
    params = new BehaviorSubject({});
    videoParams = new BehaviorSubject({});
    audioParams = new BehaviorSubject({});
    audioProducer = new BehaviorSubject(null);
    consumerTransports = new BehaviorSubject([]);
    consumingTransports = new BehaviorSubject([]);
    // Polls
    polls = new BehaviorSubject(this.useSeed && this.seedData?.polls ? this.seedData.polls : []);
    poll = new BehaviorSubject(null);
    isPollModalVisible = new BehaviorSubject(false);
    // Background
    customImage = new BehaviorSubject('');
    selectedImage = new BehaviorSubject('');
    segmentVideo = new BehaviorSubject(null);
    selfieSegmentation = new BehaviorSubject(null);
    pauseSegmentation = new BehaviorSubject(false);
    processedStream = new BehaviorSubject(null);
    keepBackground = new BehaviorSubject(false);
    backgroundHasChanged = new BehaviorSubject(false);
    virtualStream = new BehaviorSubject(null);
    mainCanvas = new BehaviorSubject(null);
    prevKeepBackground = new BehaviorSubject(false);
    appliedBackground = new BehaviorSubject(false);
    isBackgroundModalVisible = new BehaviorSubject(false);
    autoClickBackground = new BehaviorSubject(false);
    // Breakout Rooms
    breakoutRooms = new BehaviorSubject(this.useSeed && this.seedData?.breakoutRooms ? this.seedData.breakoutRooms : []);
    currentRoomIndex = new BehaviorSubject(0);
    canStartBreakout = new BehaviorSubject(false);
    breakOutRoomStarted = new BehaviorSubject(false);
    breakOutRoomEnded = new BehaviorSubject(false);
    hostNewRoom = new BehaviorSubject(-1);
    limitedBreakRoom = new BehaviorSubject([]);
    mainRoomsLength = new BehaviorSubject(0);
    memberRoom = new BehaviorSubject(-1);
    isBreakoutRoomsModalVisible = new BehaviorSubject(false);
    // Whiteboard
    whiteboardUsers = new BehaviorSubject(this.useSeed && this.seedData?.whiteboardUsers ? this.seedData.whiteboardUsers : []);
    currentWhiteboardIndex = new BehaviorSubject(0);
    canStartWhiteboard = new BehaviorSubject(false);
    whiteboardStarted = new BehaviorSubject(false);
    whiteboardEnded = new BehaviorSubject(false);
    whiteboardLimit = new BehaviorSubject(4);
    isWhiteboardModalVisible = new BehaviorSubject(false);
    isConfigureWhiteboardModalVisible = new BehaviorSubject(false);
    shapes = new BehaviorSubject([]);
    useImageBackground = new BehaviorSubject(true);
    redoStack = new BehaviorSubject([]);
    undoStack = new BehaviorSubject([]);
    canvasStream = new BehaviorSubject(null);
    canvasWhiteboard = new BehaviorSubject(null);
    // Screenboard
    canvasScreenboard = new BehaviorSubject(null);
    processedScreenStream = new BehaviorSubject(null);
    annotateScreenStream = new BehaviorSubject(false);
    mainScreenCanvas = new BehaviorSubject(null);
    isScreenboardModalVisible = new BehaviorSubject(false);
    //state variables for the control buttons
    micActive = new BehaviorSubject(this.audioAlreadyOn.value ? this.audioAlreadyOn.value : false);
    videoActive = new BehaviorSubject(this.videoAlreadyOn.value ? this.videoAlreadyOn.value : false);
    screenShareActive = new BehaviorSubject(false);
    endCallActive = new BehaviorSubject(false);
    participantsActive = new BehaviorSubject(false);
    menuActive = new BehaviorSubject(false);
    commentsActive = new BehaviorSubject(false);
    // Update functions
    updateMessages = (value) => {
        this.messages.next(value);
    };
    updateStartDirectMessage = (value) => {
        this.startDirectMessage.next(value);
    };
    updateDirectMessageDetails = (value) => {
        this.directMessageDetails.next(value);
    };
    updateShowMessagesBadge = (value) => {
        this.showMessagesBadge.next(value);
    };
    updateAudioSetting = (value) => {
        this.audioSetting.next(value);
    };
    updateVideoSetting = (value) => {
        this.videoSetting.next(value);
    };
    updateScreenshareSetting = (value) => {
        this.screenshareSetting.next(value);
    };
    updateChatSetting = (value) => {
        this.chatSetting.next(value);
    };
    updateDisplayOption = (value) => {
        this.displayOption.next(value);
    };
    updateAutoWave = (value) => {
        this.autoWave.next(value);
    };
    updateForceFullDisplay = (value) => {
        this.forceFullDisplay.next(value);
    };
    updatePrevForceFullDisplay = (value) => {
        this.prevForceFullDisplay.next(value);
    };
    updatePrevMeetingDisplayType = (value) => {
        this.prevMeetingDisplayType.next(value);
    };
    updateWaitingRoomCounter = (value) => {
        this.waitingRoomCounter.next(value);
    };
    updateWaitingRoomFilter = (value) => {
        this.waitingRoomFilter.next(value);
    };
    updateWaitingRoomList = (value) => {
        this.waitingRoomList.next(value);
        this.filteredWaitingRoomList.next(value);
        this.waitingRoomCounter.next(value.length);
    };
    onWaitingRoomFilterChange = (value) => {
        if (value !== '' && value.length > 0) {
            const filteredWaitingRoom = this.waitingRoomList
                .getValue()
                .filter((waitingRoom) => {
                return waitingRoom.name.toLowerCase().includes(value.toLowerCase());
            });
            this.filteredWaitingRoomList.next(filteredWaitingRoom);
            this.waitingRoomCounter.next(filteredWaitingRoom.length);
        }
        else {
            this.filteredWaitingRoomList.next(this.waitingRoomList.getValue());
            this.waitingRoomCounter.next(this.waitingRoomList.getValue().length);
        }
    };
    onWaitingRoomClose = () => {
        this.updateIsWaitingModalVisible(false);
    };
    updateRequestCounter = (value) => {
        this.requestCounter.next(value);
    };
    updateRequestFilter = (value) => {
        this.requestFilter.next(value);
    };
    updateRequestList = (value) => {
        this.requestList.next(value);
        this.filteredRequestList.next(value);
        this.requestCounter.next(value.length);
    };
    onRequestFilterChange = (value) => {
        if (value !== '' && value.length > 0) {
            const filteredRequest = this.requestList.getValue().filter((request) => {
                return request?.name?.toLowerCase().includes(value.toLowerCase());
            });
            this.filteredRequestList.next(filteredRequest);
            this.requestCounter.next(filteredRequest.length);
        }
        else {
            this.filteredRequestList.next(this.requestList.getValue());
            this.requestCounter.next(this.requestList.getValue().length);
        }
    };
    onRequestClose = () => {
        this.updateIsRequestsModalVisible(false);
    };
    updateTotalReqWait = (value) => {
        this.totalReqWait.next(value);
    };
    updateAlertVisible = (value) => {
        this.alertVisible.next(value);
    };
    updateAlertMessage = (value) => {
        this.alertMessage.next(value);
    };
    updateAlertType = (value) => {
        this.alertType.next(value);
    };
    updateAlertDuration = (value) => {
        this.alertDuration.next(value);
    };
    updateProgressTimerVisible = (value) => {
        this.progressTimerVisible.next(value);
    };
    updateProgressTimerValue = (value) => {
        this.progressTimerValue.next(value);
    };
    updateIsMenuModalVisible = (value) => {
        this.isMenuModalVisible.next(value);
    };
    updateIsRecordingModalVisible = (value) => {
        this.isRecordingModalVisible.next(value);
        if (value) {
            this.updateConfirmedToRecord(false);
        }
        else {
            if (this.clearedToRecord.getValue() &&
                this.clearedToResume.getValue() &&
                this.recordStarted.getValue()) {
                this.updateShowRecordButtons(true);
            }
        }
    };
    updateIsSettingsModalVisible = (value) => {
        this.isSettingsModalVisible.next(value);
    };
    updateIsRequestsModalVisible = (value) => {
        this.isRequestsModalVisible.next(value);
    };
    updateIsWaitingModalVisible = (value) => {
        this.isWaitingModalVisible.next(value);
    };
    updateIsCoHostModalVisible = (value) => {
        this.isCoHostModalVisible.next(value);
    };
    updateIsMediaSettingsModalVisible = (value) => {
        this.isMediaSettingsModalVisible.next(value);
    };
    updateIsDisplaySettingsModalVisible = (value) => {
        this.isDisplaySettingsModalVisible.next(value);
    };
    updateIsParticipantsModalVisible = (value) => {
        this.isParticipantsModalVisible.next(value);
    };
    updateIsMessagesModalVisible = (value) => {
        this.isMessagesModalVisible.next(value);
        if (!value) {
            this.updateShowMessagesBadge(false);
        }
    };
    updateIsConfirmExitModalVisible = (value) => {
        this.isConfirmExitModalVisible.next(value);
    };
    updateIsConfirmHereModalVisible = (value) => {
        this.isConfirmHereModalVisible.next(value);
    };
    updateIsLoadingModalVisible = (value) => {
        this.isLoadingModalVisible.next(value);
    };
    updateIsShareEventModalVisible = (value) => {
        this.isShareEventModalVisible.next(value);
    };
    updateRecordingMediaOptions = (value) => {
        this.recordingMediaOptions.next(value);
        this.clearedToRecord.next(false);
    };
    updateRecordingAudioOptions = (value) => {
        this.recordingAudioOptions.next(value);
        this.clearedToRecord.next(false);
    };
    updateRecordingVideoOptions = (value) => {
        this.recordingVideoOptions.next(value);
        this.clearedToRecord.next(false);
    };
    updateRecordingVideoType = (value) => {
        this.recordingVideoType.next(value);
        this.clearedToRecord.next(false);
    };
    updateRecordingVideoOptimized = (value) => {
        this.recordingVideoOptimized.next(value);
        this.clearedToRecord.next(false);
    };
    updateRecordingDisplayType = (value) => {
        this.recordingDisplayType.next(value);
        this.clearedToRecord.next(false);
    };
    updateRecordingAddHLS = (value) => {
        this.recordingAddHLS.next(value);
        this.clearedToRecord.next(false);
    };
    updateRecordingAddText = (value) => {
        this.recordingAddText.next(value);
        this.clearedToRecord.next(false);
    };
    updateRecordingCustomText = (value) => {
        this.recordingCustomText.next(value);
        this.clearedToRecord.next(false);
    };
    updateRecordingCustomTextPosition = (value) => {
        this.recordingCustomTextPosition.next(value);
        this.clearedToRecord.next(false);
    };
    updateRecordingCustomTextColor = (value) => {
        this.recordingCustomTextColor.next(value);
        this.clearedToRecord.next(false);
    };
    updateRecordingNameTags = (value) => {
        this.recordingNameTags.next(value);
        this.clearedToRecord.next(false);
    };
    updateRecordingBackgroundColor = (value) => {
        this.recordingBackgroundColor.next(value);
        this.clearedToRecord.next(false);
    };
    updateRecordingNameTagsColor = (value) => {
        this.recordingNameTagsColor.next(value);
        this.clearedToRecord.next(false);
    };
    updateRecordingOrientationVideo = (value) => {
        this.recordingOrientationVideo.next(value);
        this.clearedToRecord.next(false);
    };
    updateClearedToResume = (value) => {
        this.clearedToResume.next(value);
    };
    updateClearedToRecord = (value) => {
        this.clearedToRecord.next(value);
    };
    updateRecordState = (value) => {
        if (this.recordStarted.value && !this.recordStopped.value) {
            if (!this.recordPaused.value) {
                this.recordState.next('red');
            }
            else {
                this.recordState.next('yellow');
            }
        }
        else {
            this.recordState.next(value);
        }
        this.recordState.next(value);
    };
    updateShowRecordButtons = (value) => {
        this.showRecordButtons.next(value);
    };
    updateRecordingProgressTime = (value) => {
        this.recordingProgressTime.next(value);
        this.updateRecordTimerWidget();
    };
    updateAudioSwitching = (value) => {
        this.audioSwitching.next(value);
    };
    updateVideoSwitching = (value) => {
        this.videoSwitching.next(value);
    };
    updateVideoAlreadyOn = (value) => {
        this.videoAlreadyOn.next(value);
        this.videoActive.next(value);
    };
    updateAudioAlreadyOn = (value) => {
        this.audioAlreadyOn.next(value);
        this.micActive.next(value);
    };
    updateComponentSizes = (sizes) => {
        this.componentSizes.next(sizes);
    };
    updateHasCameraPermission = (value) => {
        this.hasCameraPermission.next(value);
    };
    updateHasAudioPermission = (value) => {
        this.hasAudioPermission.next(value);
    };
    requestPermissionCamera() {
        // Implement the request permission logic here
        return Promise.resolve('granted');
    }
    requestPermissionAudio() {
        // Implement the request permission logic here
        return Promise.resolve('granted');
    }
    updateTransportCreated = (value) => {
        this.transportCreated.next(value);
    };
    updateTransportCreatedVideo = (value) => {
        this.transportCreatedVideo.next(value);
    };
    updateTransportCreatedAudio = (value) => {
        this.transportCreatedAudio.next(value);
    };
    updateTransportCreatedScreen = (value) => {
        this.transportCreatedScreen.next(value);
    };
    updateProducerTransport = (value) => {
        this.producerTransport.next(value);
    };
    updateVideoProducer = (value) => {
        this.videoProducer.next(value);
    };
    updateParams = (value) => {
        this.params.next(value);
    };
    updateVideoParams = (value) => {
        this.videoParams.next(value);
    };
    updateAudioParams = (value) => {
        this.audioParams.next(value);
    };
    updateAudioProducer = (value) => {
        this.audioProducer.next(value);
    };
    updateConsumerTransports = (value) => {
        this.consumerTransports.next(value);
    };
    updateConsumingTransports = (value) => {
        this.consumingTransports.next(value);
    };
    updatePolls = (value) => {
        this.polls.next(value);
    };
    updatePoll = (value) => {
        this.poll.next(value);
    };
    updateIsPollModalVisible = (value) => {
        this.isPollModalVisible.next(value);
    };
    updateCustomImage = (value) => {
        this.customImage.next(value);
    };
    updateSelectedImage = (value) => {
        this.selectedImage.next(value);
    };
    updateSegmentVideo = (value) => {
        this.segmentVideo.next(value);
    };
    updateSelfieSegmentation = (value) => {
        this.selfieSegmentation.next(value);
    };
    updatePauseSegmentation = (value) => {
        this.pauseSegmentation.next(value);
    };
    updateProcessedStream = (value) => {
        this.processedStream.next(value);
    };
    updateKeepBackground = (value) => {
        this.keepBackground.next(value);
    };
    updateBackgroundHasChanged = (value) => {
        this.backgroundHasChanged.next(value);
    };
    updateVirtualStream = (value) => {
        this.virtualStream.next(value);
    };
    updateMainCanvas = (value) => {
        this.mainCanvas.next(value);
    };
    updatePrevKeepBackground = (value) => {
        this.prevKeepBackground.next(value);
    };
    updateAppliedBackground = (value) => {
        this.appliedBackground.next(value);
    };
    updateIsBackgroundModalVisible = (value) => {
        this.isBackgroundModalVisible.next(value);
    };
    updateAutoClickBackground = (value) => {
        this.autoClickBackground.next(value);
    };
    updateBreakoutRooms = (value) => {
        this.breakoutRooms.next(value);
    };
    updateCurrentRoomIndex = (value) => {
        this.currentRoomIndex.next(value);
    };
    updateCanStartBreakout = (value) => {
        this.canStartBreakout.next(value);
    };
    updateBreakOutRoomStarted = (value) => {
        this.breakOutRoomStarted.next(value);
    };
    updateBreakOutRoomEnded = (value) => {
        this.breakOutRoomEnded.next(value);
    };
    updateHostNewRoom = (value) => {
        this.hostNewRoom.next(value);
    };
    updateLimitedBreakRoom = (value) => {
        this.limitedBreakRoom.next(value);
    };
    updateMainRoomsLength = (value) => {
        this.mainRoomsLength.next(value);
    };
    updateMemberRoom = (value) => {
        this.memberRoom.next(value);
    };
    updateIsBreakoutRoomsModalVisible = (value) => {
        this.isBreakoutRoomsModalVisible.next(value);
    };
    updateWhiteboardUsers = (value) => {
        this.whiteboardUsers.next(value);
    };
    updateCurrentWhiteboardIndex = (value) => {
        this.currentWhiteboardIndex.next(value);
    };
    updateCanStartWhiteboard = (value) => {
        this.canStartWhiteboard.next(value);
    };
    updateWhiteboardStarted = (value) => {
        this.whiteboardStarted.next(value);
    };
    updateWhiteboardEnded = (value) => {
        this.whiteboardEnded.next(value);
    };
    updateWhiteboardLimit = (value) => {
        this.whiteboardLimit.next(value);
    };
    updateIsWhiteboardModalVisible = (value) => {
        this.isWhiteboardModalVisible.next(value);
    };
    updateIsConfigureWhiteboardModalVisible = (value) => {
        this.isConfigureWhiteboardModalVisible.next(value);
    };
    updateShapes = (value) => {
        this.shapes.next(value);
    };
    updateUseImageBackground = (value) => {
        this.useImageBackground.next(value);
    };
    updateRedoStack = (value) => {
        this.redoStack.next(value);
    };
    updateUndoStack = (value) => {
        this.undoStack.next(value);
    };
    updateCanvasStream = (value) => {
        this.canvasStream.next(value);
    };
    updateCanvasWhiteboard = (value) => {
        this.canvasWhiteboard.next(value);
    };
    updateCanvasScreenboard = (value) => {
        this.canvasScreenboard.next(value);
    };
    updateProcessedScreenStream = (value) => {
        this.processedScreenStream.next(value);
    };
    updateAnnotateScreenStream = (value) => {
        this.annotateScreenStream.next(value);
    };
    updateMainScreenCanvas = (value) => {
        this.mainScreenCanvas.next(value);
    };
    updateIsScreenboardModalVisible = (value) => {
        this.isScreenboardModalVisible.next(value);
    };
    checkOrientation = () => {
        const isPortrait = window.matchMedia('(orientation: portrait)').matches;
        return isPortrait ? 'portrait' : 'landscape';
    };
    showAlert = ({ message, type, duration = 3000, }) => {
        this.updateAlertMessage(message);
        this.updateAlertType(type);
        this.updateAlertDuration(duration);
        this.updateAlertVisible(true);
    };
    getAllParams() {
        return {
            localUIMode: this.localUIMode.value, // Local UI mode
            // Room Details
            roomName: this.roomName.value,
            member: this.member.value,
            adminPasscode: this.adminPasscode.value,
            youAreCoHost: this.youAreCoHost.value,
            youAreHost: this.youAreHost.value,
            islevel: this.islevel.value,
            confirmedToRecord: this.confirmedToRecord.value,
            meetingDisplayType: this.meetingDisplayType.value,
            meetingVideoOptimized: this.meetingVideoOptimized.value,
            eventType: this.eventType.value,
            participants: this.participants.value,
            filteredParticipants: this.filteredParticipants.value,
            participantsCounter: this.participantsCounter.value,
            participantsFilter: this.participantsFilter.value,
            // More room details - media
            consume_sockets: this.consume_sockets.value,
            rtpCapabilities: this.rtpCapabilities.value,
            roomRecvIPs: this.roomRecvIPs.value,
            meetingRoomParams: this.meetingRoomParams.value,
            itemPageLimit: this.itemPageLimit.value,
            audioOnlyRoom: this.audioOnlyRoom.value,
            addForBasic: this.addForBasic.value,
            screenPageLimit: this.screenPageLimit.value,
            shareScreenStarted: this.shareScreenStarted.value,
            shared: this.shared.value,
            targetOrientation: this.targetOrientation.value,
            targetResolution: this.targetResolution.value,
            targetResolutionHost: this.targetResolutionHost.value,
            vidCons: this.vidCons.value,
            frameRate: this.frameRate.value,
            hParams: this.hParams.value,
            vParams: this.vParams.value,
            screenParams: this.screenParams.value,
            aParams: this.aParams.value,
            // More room details - recording
            recordingAudioPausesLimit: this.recordingAudioPausesLimit.value,
            recordingAudioPausesCount: this.recordingAudioPausesCount.value,
            recordingAudioSupport: this.recordingAudioSupport.value,
            recordingAudioPeopleLimit: this.recordingAudioPeopleLimit.value,
            recordingAudioParticipantsTimeLimit: this.recordingAudioParticipantsTimeLimit.value,
            recordingVideoPausesCount: this.recordingVideoPausesCount.value,
            recordingVideoPausesLimit: this.recordingVideoPausesLimit.value,
            recordingVideoSupport: this.recordingVideoSupport.value,
            recordingVideoPeopleLimit: this.recordingVideoPeopleLimit.value,
            recordingVideoParticipantsTimeLimit: this.recordingVideoParticipantsTimeLimit.value,
            recordingAllParticipantsSupport: this.recordingAllParticipantsSupport.value,
            recordingVideoParticipantsSupport: this.recordingVideoParticipantsSupport.value,
            recordingAllParticipantsFullRoomSupport: this.recordingAllParticipantsFullRoomSupport.value,
            recordingVideoParticipantsFullRoomSupport: this.recordingVideoParticipantsFullRoomSupport.value,
            recordingPreferredOrientation: this.recordingPreferredOrientation.value,
            recordingSupportForOtherOrientation: this.recordingSupportForOtherOrientation.value,
            recordingMultiFormatsSupport: this.recordingMultiFormatsSupport.value,
            userRecordingParams: this.userRecordingParams.value,
            canRecord: this.canRecord.value,
            startReport: this.startReport.value,
            endReport: this.endReport.value,
            recordStartTime: this.recordStartTime.value,
            recordElapsedTime: this.recordElapsedTime.value,
            isTimerRunning: this.isTimerRunning.value,
            canPauseResume: this.canPauseResume.value,
            recordChangeSeconds: this.recordChangeSeconds.value,
            pauseLimit: this.pauseLimit.value,
            pauseRecordCount: this.pauseRecordCount.value,
            canLaunchRecord: this.canLaunchRecord.value,
            stopLaunchRecord: this.stopLaunchRecord.value,
            participantsAll: this.participantsAll.value,
            firstAll: this.firstAll.value,
            updateMainWindow: this.updateMainWindow.value,
            first_round: this.first_round.value,
            landScaped: this.landScaped.value,
            lock_screen: this.lock_screen.value,
            screenId: this.screenId.value,
            allVideoStreams: this.allVideoStreams.value,
            newLimitedStreams: this.newLimitedStreams.value,
            newLimitedStreamsIDs: this.newLimitedStreamsIDs.value,
            activeSounds: this.activeSounds.value,
            screenShareIDStream: this.screenShareIDStream.value,
            screenShareNameStream: this.screenShareNameStream.value,
            adminIDStream: this.adminIDStream.value,
            adminNameStream: this.adminNameStream.value,
            youYouStream: this.youYouStream.value,
            youYouStreamIDs: this.youYouStreamIDs.value,
            localStream: this.localStream.value,
            recordStarted: this.recordStarted.value,
            recordResumed: this.recordResumed.value,
            recordPaused: this.recordPaused.value,
            recordStopped: this.recordStopped.value,
            adminRestrictSetting: this.adminRestrictSetting.value,
            videoRequestState: this.videoRequestState.value,
            videoRequestTime: this.videoRequestTime.value,
            videoAction: this.videoAction.value,
            localStreamVideo: this.localStreamVideo.value,
            userDefaultVideoInputDevice: this.userDefaultVideoInputDevice.value,
            currentFacingMode: this.currentFacingMode.value,
            prevFacingMode: this.prevFacingMode.value,
            defVideoID: this.defVideoID.value,
            allowed: this.allowed.value,
            dispActiveNames: this.dispActiveNames.value,
            p_dispActiveNames: this.p_dispActiveNames.value,
            activeNames: this.activeNames.value,
            prevActiveNames: this.prevActiveNames.value,
            p_activeNames: this.p_activeNames.value,
            membersReceived: this.membersReceived.value,
            deferScreenReceived: this.deferScreenReceived.value,
            hostFirstSwitch: this.hostFirstSwitch.value,
            micAction: this.micAction.value,
            screenAction: this.screenAction.value,
            chatAction: this.chatAction.value,
            audioRequestState: this.audioRequestState.value,
            screenRequestState: this.screenRequestState.value,
            chatRequestState: this.chatRequestState.value,
            audioRequestTime: this.audioRequestTime.value,
            screenRequestTime: this.screenRequestTime.value,
            chatRequestTime: this.chatRequestTime.value,
            updateRequestIntervalSeconds: this.updateRequestIntervalSeconds.value,
            oldSoundIds: this.oldSoundIds.value,
            hostLabel: this.hostLabel.value,
            mainScreenFilled: this.mainScreenFilled.value,
            localStreamScreen: this.localStreamScreen.value,
            screenAlreadyOn: this.screenAlreadyOn.value,
            chatAlreadyOn: this.chatAlreadyOn.value,
            redirectURL: this.redirectURL.value,
            oldAllStreams: this.oldAllStreams.value,
            adminVidID: this.adminVidID.value,
            streamNames: this.streamNames.value,
            non_alVideoStreams: this.non_alVideoStreams.value,
            sortAudioLoudness: this.sortAudioLoudness.value,
            audioDecibels: this.audioDecibels.value,
            mixed_alVideoStreams: this.mixed_alVideoStreams.value,
            non_alVideoStreams_muted: this.non_alVideoStreams_muted.value,
            paginatedStreams: this.paginatedStreams.value,
            localStreamAudio: this.localStreamAudio.value,
            defAudioID: this.defAudioID.value,
            userDefaultAudioInputDevice: this.userDefaultAudioInputDevice.value,
            userDefaultAudioOutputDevice: this.userDefaultAudioOutputDevice.value,
            prevAudioInputDevice: this.prevAudioInputDevice.value,
            prevVideoInputDevice: this.prevVideoInputDevice.value,
            audioPaused: this.audioPaused.value,
            mainScreenPerson: this.mainScreenPerson.value,
            adminOnMainScreen: this.adminOnMainScreen.value,
            screenStates: this.screenStates.value,
            prevScreenStates: this.prevScreenStates.value,
            updateDateState: this.updateDateState.value,
            lastUpdate: this.lastUpdate.value,
            nForReadjustRecord: this.nForReadjustRecord.value,
            fixedPageLimit: this.fixedPageLimit.value,
            removeAltGrid: this.removeAltGrid.value,
            nForReadjust: this.nForReadjust.value,
            lastReorderTime: this.lastReorderTime.value,
            reorderInterval: this.reorderInterval.value,
            fastReorderInterval: this.fastReorderInterval.value,
            audStreamNames: this.audStreamNames.value,
            currentUserPage: this.currentUserPage.value,
            mainHeightWidth: this.mainHeightWidth.value,
            prevMainHeightWidth: this.prevMainHeightWidth.value,
            prevDoPaginate: this.prevDoPaginate.value,
            doPaginate: this.doPaginate.value,
            shareEnded: this.shareEnded.value,
            lStreams: this.lStreams.value,
            chatRefStreams: this.chatRefStreams.value,
            controlHeight: this.controlHeight.value,
            isWideScreen: this.isWideScreen.value,
            isMediumScreen: this.isMediumScreen.value,
            isSmallScreen: this.isSmallScreen.value,
            addGrid: this.addGrid.value,
            addAltGrid: this.addAltGrid.value,
            gridRows: this.gridRows.value,
            gridCols: this.gridCols.value,
            altGridRows: this.altGridRows.value,
            altGridCols: this.altGridCols.value,
            numberPages: this.numberPages.value,
            currentStreams: this.currentStreams.value,
            showMiniView: this.showMiniView.value,
            nStream: this.nStream.value,
            defer_receive: this.defer_receive.value,
            allAudioStreams: this.allAudioStreams.value,
            screenProducer: this.screenProducer.value,
            remoteScreenStream: this.remoteScreenStream.value,
            gotAllVids: this.gotAllVids.value,
            paginationHeightWidth: this.paginationHeightWidth.value,
            paginationDirection: this.paginationDirection.value,
            gridSizes: this.gridSizes.value,
            screenForceFullDisplay: this.screenForceFullDisplay.value,
            mainGridStream: this.mainGridStream.value,
            otherGridStreams: this.otherGridStreams.value,
            audioOnlyStreams: this.audioOnlyStreams.value,
            videoInputs: this.videoInputs.value,
            audioInputs: this.audioInputs.value,
            meetingProgressTime: this.meetingProgressTime.value,
            meetingElapsedTime: this.meetingElapsedTime.value,
            ref_participants: this.ref_participants.value,
            messages: this.messages.value,
            startDirectMessage: this.startDirectMessage.value,
            directMessageDetails: this.directMessageDetails.value,
            coHost: this.coHost.value,
            coHostResponsibility: this.coHostResponsibility.value,
            // Event settings
            audioSetting: this.audioSetting.value,
            videoSetting: this.videoSetting.value,
            screenshareSetting: this.screenshareSetting.value,
            chatSetting: this.chatSetting.value,
            // Display settings
            autoWave: this.autoWave.value,
            forceFullDisplay: this.forceFullDisplay.value,
            prevForceFullDisplay: this.prevForceFullDisplay.value,
            prevMeetingDisplayType: this.prevMeetingDisplayType.value,
            // Waiting room
            waitingRoomFilter: this.waitingRoomFilter.value,
            waitingRoomList: this.waitingRoomList.value,
            waitingRoomCounter: this.waitingRoomCounter.value,
            filteredWaitingRoomList: this.filteredWaitingRoomList.value,
            // Requests
            requestFilter: this.requestFilter.value,
            requestList: this.requestList.value,
            requestCounter: this.requestCounter.value,
            filteredRequestList: this.filteredRequestList.value,
            // Total requests and waiting room
            totalReqWait: this.totalReqWait.value,
            // Alerts
            alertVisible: this.alertVisible.value,
            alertMessage: this.alertMessage.value,
            alertType: this.alertType.value,
            alertDuration: this.alertDuration.value,
            // Progress Timer
            progressTimerVisible: this.progressTimerVisible.value,
            progressTimerValue: this.progressTimerValue.value,
            // Menu modals
            isMenuModalVisible: this.isMenuModalVisible.value,
            isRecordingModalVisible: this.isRecordingModalVisible.value,
            isSettingsModalVisible: this.isSettingsModalVisible.value,
            isRequestsModalVisible: this.isRequestsModalVisible.value,
            isWaitingModalVisible: this.isWaitingModalVisible.value,
            isCoHostModalVisible: this.isCoHostModalVisible.value,
            isMediaSettingsModalVisible: this.isMediaSettingsModalVisible.value,
            isDisplaySettingsModalVisible: this.isDisplaySettingsModalVisible.value,
            // Other Modals
            isParticipantsModalVisible: this.isParticipantsModalVisible.value,
            isMessagesModalVisible: this.isMessagesModalVisible.value,
            isConfirmExitModalVisible: this.isConfirmExitModalVisible.value,
            isConfirmHereModalVisible: this.isConfirmHereModalVisible.value,
            isLoadingModalVisible: this.isLoadingModalVisible.value,
            // Recording Options
            recordingMediaOptions: this.recordingMediaOptions.value,
            recordingAudioOptions: this.recordingAudioOptions.value,
            recordingVideoOptions: this.recordingVideoOptions.value,
            recordingVideoType: this.recordingVideoType.value,
            recordingVideoOptimized: this.recordingVideoOptimized.value,
            recordingDisplayType: this.recordingDisplayType.value,
            recordingAddHLS: this.recordingAddHLS.value,
            recordingAddText: this.recordingAddText.value,
            recordingCustomText: this.recordingCustomText.value,
            recordingCustomTextPosition: this.recordingCustomTextPosition.value,
            recordingCustomTextColor: this.recordingCustomTextColor.value,
            recordingNameTags: this.recordingNameTags.value,
            recordingBackgroundColor: this.recordingBackgroundColor.value,
            recordingNameTagsColor: this.recordingNameTagsColor.value,
            recordingOrientationVideo: this.recordingOrientationVideo.value,
            clearedToResume: this.clearedToResume.value,
            clearedToRecord: this.clearedToRecord.value,
            recordState: this.recordState.value,
            showRecordButtons: this.showRecordButtons.value,
            recordingProgressTime: this.recordingProgressTime.value,
            audioSwitching: this.audioSwitching.value,
            videoSwitching: this.videoSwitching.value,
            // Media states
            videoAlreadyOn: this.videoAlreadyOn.value,
            audioAlreadyOn: this.audioAlreadyOn.value,
            componentSizes: this.componentSizes.value,
            // Permissions
            hasCameraPermission: this.hasCameraPermission.value,
            hasAudioPermission: this.hasAudioPermission.value,
            // Transports
            transportCreated: this.transportCreated.value,
            transportCreatedVideo: this.transportCreatedVideo.value,
            transportCreatedAudio: this.transportCreatedAudio.value,
            transportCreatedScreen: this.transportCreatedScreen.value,
            producerTransport: this.producerTransport.value,
            videoProducer: this.videoProducer.value,
            params: this.params.value,
            videoParams: this.videoParams.value,
            audioParams: this.audioParams.value,
            audioProducer: this.audioProducer.value,
            consumerTransports: this.consumerTransports.value,
            consumingTransports: this.consumingTransports.value,
            // Polls
            polls: this.polls.value,
            poll: this.poll.value,
            isPollModalVisible: this.isPollModalVisible.value,
            // Background
            customImage: this.customImage.value,
            selectedImage: this.selectedImage.value,
            segmentVideo: this.segmentVideo.value,
            selfieSegmentation: this.selfieSegmentation.value,
            pauseSegmentation: this.pauseSegmentation.value,
            processedStream: this.processedStream.value,
            keepBackground: this.keepBackground.value,
            backgroundHasChanged: this.backgroundHasChanged.value,
            virtualStream: this.virtualStream.value,
            mainCanvas: this.mainCanvas.value,
            prevKeepBackground: this.prevKeepBackground.value,
            appliedBackground: this.appliedBackground.value,
            isBackgroundModalVisible: this.isBackgroundModalVisible.value,
            autoClickBackground: this.autoClickBackground.value,
            // Breakout rooms
            breakoutRooms: this.breakoutRooms.value,
            currentRoomIndex: this.currentRoomIndex.value,
            canStartBreakout: this.canStartBreakout.value,
            breakOutRoomStarted: this.breakOutRoomStarted.value,
            breakOutRoomEnded: this.breakOutRoomEnded.value,
            hostNewRoom: this.hostNewRoom.value,
            limitedBreakRoom: this.limitedBreakRoom.value,
            mainRoomsLength: this.mainRoomsLength.value,
            memberRoom: this.memberRoom.value,
            isBreakoutRoomsModalVisible: this.isBreakoutRoomsModalVisible.value,
            // Whiteboard
            whiteboardUsers: this.whiteboardUsers.value,
            currentWhiteboardIndex: this.currentWhiteboardIndex.value,
            canStartWhiteboard: this.canStartWhiteboard.value,
            whiteboardStarted: this.whiteboardStarted.value,
            whiteboardEnded: this.whiteboardEnded.value,
            whiteboardLimit: this.whiteboardLimit.value,
            isWhiteboardModalVisible: this.isWhiteboardModalVisible.value,
            isConfigureWhiteboardModalVisible: this.isConfigureWhiteboardModalVisible.value,
            shapes: this.shapes.value,
            useImageBackground: this.useImageBackground.value,
            redoStack: this.redoStack.value,
            undoStack: this.undoStack.value,
            canvasStream: this.canvasStream.value,
            canvasWhiteboard: this.canvasWhiteboard.value,
            // Screenboard
            canvasScreenboard: this.canvasScreenboard.value,
            processedScreenStream: this.processedScreenStream.value,
            annotateScreenStream: this.annotateScreenStream.value,
            mainScreenCanvas: this.mainScreenCanvas.value,
            isScreenboardModalVisible: this.isScreenboardModalVisible.value,
            validated: this.validated.value,
            device: this.device.value,
            socket: this.socket.value,
            checkMediaPermission: false,
            onWeb: true,
            // Update functions
            updateRoomName: this.updateRoomName.bind(this),
            updateMember: this.updateMember.bind(this),
            updateAdminPasscode: this.updateAdminPasscode.bind(this),
            updateYouAreCoHost: this.updateYouAreCoHost.bind(this),
            updateYouAreHost: this.updateYouAreHost.bind(this),
            updateIslevel: this.updateIslevel.bind(this),
            updateCoHost: this.updateCoHost.bind(this),
            updateCoHostResponsibility: this.updateCoHostResponsibility.bind(this),
            updateConfirmedToRecord: this.updateConfirmedToRecord.bind(this),
            updateMeetingDisplayType: this.updateMeetingDisplayType.bind(this),
            updateMeetingVideoOptimized: this.updateMeetingVideoOptimized.bind(this),
            updateEventType: this.updateEventType.bind(this),
            updateParticipants: this.updateParticipants.bind(this),
            updateParticipantsCounter: this.updateParticipantsCounter.bind(this),
            updateParticipantsFilter: this.updateParticipantsFilter.bind(this),
            // More update functions for media details
            updateConsume_sockets: this.updateConsume_sockets.bind(this),
            updateRtpCapabilities: this.updateRtpCapabilities.bind(this),
            updateRoomRecvIPs: this.updateRoomRecvIPs.bind(this),
            updateMeetingRoomParams: this.updateMeetingRoomParams.bind(this),
            updateItemPageLimit: this.updateItemPageLimit.bind(this),
            updateAudioOnlyRoom: this.updateAudioOnlyRoom.bind(this),
            updateAddForBasic: this.updateAddForBasic.bind(this),
            updateScreenPageLimit: this.updateScreenPageLimit.bind(this),
            updateShareScreenStarted: this.updateShareScreenStarted.bind(this),
            updateShared: this.updateShared.bind(this),
            updateTargetOrientation: this.updateTargetOrientation.bind(this),
            updateTargetResolution: this.updateTargetResolution.bind(this),
            updateTargetResolutionHost: this.updateTargetResolutionHost.bind(this),
            updateVidCons: this.updateVidCons.bind(this),
            updateFrameRate: this.updateFrameRate.bind(this),
            updateHParams: this.updateHParams.bind(this),
            updateVParams: this.updateVParams.bind(this),
            updateScreenParams: this.updateScreenParams.bind(this),
            updateAParams: this.updateAParams.bind(this),
            // More update functions for recording details
            updateRecordingAudioPausesLimit: this.updateRecordingAudioPausesLimit.bind(this),
            updateRecordingAudioPausesCount: this.updateRecordingAudioPausesCount.bind(this),
            updateRecordingAudioSupport: this.updateRecordingAudioSupport.bind(this),
            updateRecordingAudioPeopleLimit: this.updateRecordingAudioPeopleLimit.bind(this),
            updateRecordingAudioParticipantsTimeLimit: this.updateRecordingAudioParticipantsTimeLimit.bind(this),
            updateRecordingVideoPausesCount: this.updateRecordingVideoPausesCount.bind(this),
            updateRecordingVideoPausesLimit: this.updateRecordingVideoPausesLimit.bind(this),
            updateRecordingVideoSupport: this.updateRecordingVideoSupport.bind(this),
            updateRecordingVideoPeopleLimit: this.updateRecordingVideoPeopleLimit.bind(this),
            updateRecordingVideoParticipantsTimeLimit: this.updateRecordingVideoParticipantsTimeLimit.bind(this),
            updateRecordingAllParticipantsSupport: this.updateRecordingAllParticipantsSupport.bind(this),
            updateRecordingVideoParticipantsSupport: this.updateRecordingVideoParticipantsSupport.bind(this),
            updateRecordingAllParticipantsFullRoomSupport: this.updateRecordingAllParticipantsFullRoomSupport.bind(this),
            updateRecordingVideoParticipantsFullRoomSupport: this.updateRecordingVideoParticipantsFullRoomSupport.bind(this),
            updateRecordingPreferredOrientation: this.updateRecordingPreferredOrientation.bind(this),
            updateRecordingSupportForOtherOrientation: this.updateRecordingSupportForOtherOrientation.bind(this),
            updateRecordingMultiFormatsSupport: this.updateRecordingMultiFormatsSupport.bind(this),
            updateUserRecordingParams: this.updateUserRecordingParams.bind(this),
            updateCanRecord: this.updateCanRecord.bind(this),
            updateStartReport: this.updateStartReport.bind(this),
            updateEndReport: this.updateEndReport.bind(this),
            updateRecordTimerInterval: this.updateRecordTimerInterval.bind(this),
            updateRecordStartTime: this.updateRecordStartTime.bind(this),
            updateRecordElapsedTime: this.updateRecordElapsedTime.bind(this),
            updateIsTimerRunning: this.updateIsTimerRunning.bind(this),
            updateCanPauseResume: this.updateCanPauseResume.bind(this),
            updateRecordChangeSeconds: this.updateRecordChangeSeconds.bind(this),
            updatePauseLimit: this.updatePauseLimit.bind(this),
            updatePauseRecordCount: this.updatePauseRecordCount.bind(this),
            updateCanLaunchRecord: this.updateCanLaunchRecord.bind(this),
            updateStopLaunchRecord: this.updateStopLaunchRecord.bind(this),
            updateParticipantsAll: this.updateParticipantsAll.bind(this),
            updateFirstAll: this.updateFirstAll.bind(this),
            updateUpdateMainWindow: this.updateUpdateMainWindow.bind(this),
            updateFirst_round: this.updateFirst_round.bind(this),
            updateLandScaped: this.updateLandScaped.bind(this),
            updateLock_screen: this.updateLock_screen.bind(this),
            updateScreenId: this.updateScreenId.bind(this),
            updateAllVideoStreams: this.updateAllVideoStreams.bind(this),
            updateNewLimitedStreams: this.updateNewLimitedStreams.bind(this),
            updateNewLimitedStreamsIDs: this.updateNewLimitedStreamsIDs.bind(this),
            updateActiveSounds: this.updateActiveSounds.bind(this),
            updateScreenShareIDStream: this.updateScreenShareIDStream.bind(this),
            updateScreenShareNameStream: this.updateScreenShareNameStream.bind(this),
            updateAdminIDStream: this.updateAdminIDStream.bind(this),
            updateAdminNameStream: this.updateAdminNameStream.bind(this),
            updateYouYouStream: this.updateYouYouStream.bind(this),
            updateYouYouStreamIDs: this.updateYouYouStreamIDs.bind(this),
            updateLocalStream: this.updateLocalStream.bind(this),
            updateRecordStarted: this.updateRecordStarted.bind(this),
            updateRecordResumed: this.updateRecordResumed.bind(this),
            updateRecordPaused: this.updateRecordPaused.bind(this),
            updateRecordStopped: this.updateRecordStopped.bind(this),
            updateAdminRestrictSetting: this.updateAdminRestrictSetting.bind(this),
            updateVideoRequestState: this.updateVideoRequestState.bind(this),
            updateVideoRequestTime: this.updateVideoRequestTime.bind(this),
            updateVideoAction: this.updateVideoAction.bind(this),
            updateLocalStreamVideo: this.updateLocalStreamVideo.bind(this),
            updateUserDefaultVideoInputDevice: this.updateUserDefaultVideoInputDevice.bind(this),
            updateCurrentFacingMode: this.updateCurrentFacingMode.bind(this),
            updatePrevFacingMode: this.updatePrevFacingMode.bind(this),
            updateDefVideoID: this.updateDefVideoID.bind(this),
            updateAllowed: this.updateAllowed.bind(this),
            updateDispActiveNames: this.updateDispActiveNames.bind(this),
            updateP_dispActiveNames: this.updateP_dispActiveNames.bind(this),
            updateActiveNames: this.updateActiveNames.bind(this),
            updatePrevActiveNames: this.updatePrevActiveNames.bind(this),
            updateP_activeNames: this.updateP_activeNames.bind(this),
            updateMembersReceived: this.updateMembersReceived.bind(this),
            updateDeferScreenReceived: this.updateDeferScreenReceived.bind(this),
            updateHostFirstSwitch: this.updateHostFirstSwitch.bind(this),
            updateMicAction: this.updateMicAction.bind(this),
            updateScreenAction: this.updateScreenAction.bind(this),
            updateChatAction: this.updateChatAction.bind(this),
            updateAudioRequestState: this.updateAudioRequestState.bind(this),
            updateScreenRequestState: this.updateScreenRequestState.bind(this),
            updateChatRequestState: this.updateChatRequestState.bind(this),
            updateAudioRequestTime: this.updateAudioRequestTime.bind(this),
            updateScreenRequestTime: this.updateScreenRequestTime.bind(this),
            updateChatRequestTime: this.updateChatRequestTime.bind(this),
            updateOldSoundIds: this.updateOldSoundIds.bind(this),
            updateHostLabel: this.updateHostLabel.bind(this),
            updateMainScreenFilled: this.updateMainScreenFilled.bind(this),
            updateLocalStreamScreen: this.updateLocalStreamScreen.bind(this),
            updateScreenAlreadyOn: this.updateScreenAlreadyOn.bind(this),
            updateChatAlreadyOn: this.updateChatAlreadyOn.bind(this),
            updateRedirectURL: this.updateRedirectURL.bind(this),
            updateOldAllStreams: this.updateOldAllStreams.bind(this),
            updateAdminVidID: this.updateAdminVidID.bind(this),
            updateStreamNames: this.updateStreamNames.bind(this),
            updateNon_alVideoStreams: this.updateNon_alVideoStreams.bind(this),
            updateSortAudioLoudness: this.updateSortAudioLoudness.bind(this),
            updateAudioDecibels: this.updateAudioDecibels.bind(this),
            updateMixed_alVideoStreams: this.updateMixed_alVideoStreams.bind(this),
            updateNon_alVideoStreams_muted: this.updateNon_alVideoStreams_muted.bind(this),
            updatePaginatedStreams: this.updatePaginatedStreams.bind(this),
            updateLocalStreamAudio: this.updateLocalStreamAudio.bind(this),
            updateDefAudioID: this.updateDefAudioID.bind(this),
            updateUserDefaultAudioInputDevice: this.updateUserDefaultAudioInputDevice.bind(this),
            updateUserDefaultAudioOutputDevice: this.updateUserDefaultAudioOutputDevice.bind(this),
            updatePrevAudioInputDevice: this.updatePrevAudioInputDevice.bind(this),
            updatePrevVideoInputDevice: this.updatePrevVideoInputDevice.bind(this),
            updateAudioPaused: this.updateAudioPaused.bind(this),
            updateMainScreenPerson: this.updateMainScreenPerson.bind(this),
            updateAdminOnMainScreen: this.updateAdminOnMainScreen.bind(this),
            updateScreenStates: this.updateScreenStates.bind(this),
            updatePrevScreenStates: this.updatePrevScreenStates.bind(this),
            updateUpdateDateState: this.updateUpdateDateState.bind(this),
            updateLastUpdate: this.updateLastUpdate.bind(this),
            updateNForReadjustRecord: this.updateNForReadjustRecord.bind(this),
            updateFixedPageLimit: this.updateFixedPageLimit.bind(this),
            updateRemoveAltGrid: this.updateRemoveAltGrid.bind(this),
            updateNForReadjust: this.updateNForReadjust.bind(this),
            updateLastReorderTime: this.updateLastReorderTime.bind(this),
            updateAudStreamNames: this.updateAudStreamNames.bind(this),
            updateCurrentUserPage: this.updateCurrentUserPage.bind(this),
            updateMainHeightWidth: this.updateMainHeightWidth.bind(this),
            updatePrevMainHeightWidth: this.updatePrevMainHeightWidth.bind(this),
            updatePrevDoPaginate: this.updatePrevDoPaginate.bind(this),
            updateDoPaginate: this.updateDoPaginate.bind(this),
            updateShareEnded: this.updateShareEnded.bind(this),
            updateLStreams: this.updateLStreams.bind(this),
            updateChatRefStreams: this.updateChatRefStreams.bind(this),
            updateControlHeight: this.updateControlHeight.bind(this),
            updateIsWideScreen: this.updateIsWideScreen.bind(this),
            updateIsMediumScreen: this.updateIsMediumScreen.bind(this),
            updateIsSmallScreen: this.updateIsSmallScreen.bind(this),
            updateAddGrid: this.updateAddGrid.bind(this),
            updateAddAltGrid: this.updateAddAltGrid.bind(this),
            updateGridRows: this.updateGridRows.bind(this),
            updateGridCols: this.updateGridCols.bind(this),
            updateAltGridRows: this.updateAltGridRows.bind(this),
            updateAltGridCols: this.updateAltGridCols.bind(this),
            updateNumberPages: this.updateNumberPages.bind(this),
            updateCurrentStreams: this.updateCurrentStreams.bind(this),
            updateShowMiniView: this.updateShowMiniView.bind(this),
            updateNStream: this.updateNStream.bind(this),
            updateDefer_receive: this.updateDefer_receive.bind(this),
            updateAllAudioStreams: this.updateAllAudioStreams.bind(this),
            updateRemoteScreenStream: this.updateRemoteScreenStream.bind(this),
            updateScreenProducer: this.updateScreenProducer.bind(this),
            updateGotAllVids: this.updateGotAllVids.bind(this),
            updatePaginationHeightWidth: this.updatePaginationHeightWidth.bind(this),
            updatePaginationDirection: this.updatePaginationDirection.bind(this),
            updateGridSizes: this.updateGridSizes.bind(this),
            updateScreenForceFullDisplay: this.updateScreenForceFullDisplay.bind(this),
            updateMainGridStream: this.updateMainGridStream.bind(this),
            updateOtherGridStreams: this.updateOtherGridStreams.bind(this),
            updateAudioOnlyStreams: this.updateAudioOnlyStreams.bind(this),
            updateVideoInputs: this.updateVideoInputs.bind(this),
            updateAudioInputs: this.updateAudioInputs.bind(this),
            updateMeetingProgressTime: this.updateMeetingProgressTime.bind(this),
            updateMeetingElapsedTime: this.updateMeetingElapsedTime.bind(this),
            updateRef_participants: this.updateRef_participants.bind(this),
            updateMessages: this.updateMessages.bind(this),
            updateStartDirectMessage: this.updateStartDirectMessage.bind(this),
            updateDirectMessageDetails: this.updateDirectMessageDetails.bind(this),
            updateShowMessagesBadge: this.updateShowMessagesBadge.bind(this),
            // Event settings
            updateAudioSetting: this.updateAudioSetting.bind(this),
            updateVideoSetting: this.updateVideoSetting.bind(this),
            updateScreenshareSetting: this.updateScreenshareSetting.bind(this),
            updateChatSetting: this.updateChatSetting.bind(this),
            // Display settings
            updateAutoWave: this.updateAutoWave.bind(this),
            updateForceFullDisplay: this.updateForceFullDisplay.bind(this),
            updatePrevForceFullDisplay: this.updatePrevForceFullDisplay.bind(this),
            updatePrevMeetingDisplayType: this.updatePrevMeetingDisplayType.bind(this),
            // Waiting room
            updateWaitingRoomFilter: this.updateWaitingRoomFilter.bind(this),
            updateWaitingRoomList: this.updateWaitingRoomList.bind(this),
            updateWaitingRoomCounter: this.updateWaitingRoomCounter.bind(this),
            // Requests
            updateRequestFilter: this.updateRequestFilter.bind(this),
            updateRequestList: this.updateRequestList.bind(this),
            updateRequestCounter: this.updateRequestCounter.bind(this),
            // Total requests and waiting room
            updateTotalReqWait: this.updateTotalReqWait.bind(this),
            // Menu modals
            updateIsMenuModalVisible: this.updateIsMenuModalVisible.bind(this),
            updateIsRecordingModalVisible: this.updateIsRecordingModalVisible.bind(this),
            updateIsSettingsModalVisible: this.updateIsSettingsModalVisible.bind(this),
            updateIsRequestsModalVisible: this.updateIsRequestsModalVisible.bind(this),
            updateIsWaitingModalVisible: this.updateIsWaitingModalVisible.bind(this),
            updateIsCoHostModalVisible: this.updateIsCoHostModalVisible.bind(this),
            updateIsMediaSettingsModalVisible: this.updateIsMediaSettingsModalVisible.bind(this),
            updateIsDisplaySettingsModalVisible: this.updateIsDisplaySettingsModalVisible.bind(this),
            // Other modals
            updateIsParticipantsModalVisible: this.updateIsParticipantsModalVisible.bind(this),
            updateIsMessagesModalVisible: this.updateIsMessagesModalVisible.bind(this),
            updateIsConfirmExitModalVisible: this.updateIsConfirmExitModalVisible.bind(this),
            updateIsConfirmHereModalVisible: this.updateIsConfirmHereModalVisible.bind(this),
            updateIsLoadingModalVisible: this.updateIsLoadingModalVisible.bind(this),
            // Recording Options
            updateRecordingMediaOptions: this.updateRecordingMediaOptions.bind(this),
            updateRecordingAudioOptions: this.updateRecordingAudioOptions.bind(this),
            updateRecordingVideoOptions: this.updateRecordingVideoOptions.bind(this),
            updateRecordingVideoType: this.updateRecordingVideoType.bind(this),
            updateRecordingVideoOptimized: this.updateRecordingVideoOptimized.bind(this),
            updateRecordingDisplayType: this.updateRecordingDisplayType.bind(this),
            updateRecordingAddHLS: this.updateRecordingAddHLS.bind(this),
            updateRecordingAddText: this.updateRecordingAddText.bind(this),
            updateRecordingCustomText: this.updateRecordingCustomText.bind(this),
            updateRecordingCustomTextPosition: this.updateRecordingCustomTextPosition.bind(this),
            updateRecordingCustomTextColor: this.updateRecordingCustomTextColor.bind(this),
            updateRecordingNameTags: this.updateRecordingNameTags.bind(this),
            updateRecordingBackgroundColor: this.updateRecordingBackgroundColor.bind(this),
            updateRecordingNameTagsColor: this.updateRecordingNameTagsColor.bind(this),
            updateRecordingOrientationVideo: this.updateRecordingOrientationVideo.bind(this),
            updateClearedToResume: this.updateClearedToResume.bind(this),
            updateClearedToRecord: this.updateClearedToRecord.bind(this),
            updateRecordState: this.updateRecordState.bind(this),
            updateShowRecordButtons: this.updateShowRecordButtons.bind(this),
            updateRecordingProgressTime: this.updateRecordingProgressTime.bind(this),
            updateAudioSwitching: this.updateAudioSwitching.bind(this),
            updateVideoSwitching: this.updateVideoSwitching.bind(this),
            // Media states
            updateVideoAlreadyOn: this.updateVideoAlreadyOn.bind(this),
            updateAudioAlreadyOn: this.updateAudioAlreadyOn.bind(this),
            updateComponentSizes: this.updateComponentSizes.bind(this),
            // Permissions
            updateHasCameraPermission: this.updateHasCameraPermission.bind(this),
            updateHasAudioPermission: this.updateHasAudioPermission.bind(this),
            // Transports
            updateTransportCreated: this.updateTransportCreated.bind(this),
            updateTransportCreatedVideo: this.updateTransportCreatedVideo.bind(this),
            updateTransportCreatedAudio: this.updateTransportCreatedAudio.bind(this),
            updateTransportCreatedScreen: this.updateTransportCreatedScreen.bind(this),
            updateProducerTransport: this.updateProducerTransport.bind(this),
            updateVideoProducer: this.updateVideoProducer.bind(this),
            updateParams: this.updateParams.bind(this),
            updateVideoParams: this.updateVideoParams.bind(this),
            updateAudioParams: this.updateAudioParams.bind(this),
            updateAudioProducer: this.updateAudioProducer.bind(this),
            updateConsumerTransports: this.updateConsumerTransports.bind(this),
            updateConsumingTransports: this.updateConsumingTransports.bind(this),
            // Polls
            updatePolls: this.updatePolls.bind(this),
            updatePoll: this.updatePoll.bind(this),
            updateIsPollModalVisible: this.updateIsPollModalVisible.bind(this),
            // Background
            updateCustomImage: this.updateCustomImage.bind(this),
            updateSelectedImage: this.updateSelectedImage.bind(this),
            updateSegmentVideo: this.updateSegmentVideo.bind(this),
            updateSelfieSegmentation: this.updateSelfieSegmentation.bind(this),
            updatePauseSegmentation: this.updatePauseSegmentation.bind(this),
            updateProcessedStream: this.updateProcessedStream.bind(this),
            updateKeepBackground: this.updateKeepBackground.bind(this),
            updateBackgroundHasChanged: this.updateBackgroundHasChanged.bind(this),
            updateVirtualStream: this.updateVirtualStream.bind(this),
            updateMainCanvas: this.updateMainCanvas.bind(this),
            updatePrevKeepBackground: this.updatePrevKeepBackground.bind(this),
            updateAppliedBackground: this.updateAppliedBackground.bind(this),
            updateIsBackgroundModalVisible: this.updateIsBackgroundModalVisible.bind(this),
            updateAutoClickBackground: this.updateAutoClickBackground.bind(this),
            // Breakout rooms
            updateBreakoutRooms: this.updateBreakoutRooms.bind(this),
            updateCurrentRoomIndex: this.updateCurrentRoomIndex.bind(this),
            updateCanStartBreakout: this.updateCanStartBreakout.bind(this),
            updateBreakOutRoomStarted: this.updateBreakOutRoomStarted.bind(this),
            updateBreakOutRoomEnded: this.updateBreakOutRoomEnded.bind(this),
            updateHostNewRoom: this.updateHostNewRoom.bind(this),
            updateLimitedBreakRoom: this.updateLimitedBreakRoom.bind(this),
            updateMainRoomsLength: this.updateMainRoomsLength.bind(this),
            updateMemberRoom: this.updateMemberRoom.bind(this),
            updateIsBreakoutRoomsModalVisible: this.updateIsBreakoutRoomsModalVisible.bind(this),
            // Whiteboard
            updateWhiteboardUsers: this.updateWhiteboardUsers.bind(this),
            updateCurrentWhiteboardIndex: this.updateCurrentWhiteboardIndex.bind(this),
            updateCanStartWhiteboard: this.updateCanStartWhiteboard.bind(this),
            updateWhiteboardStarted: this.updateWhiteboardStarted.bind(this),
            updateWhiteboardEnded: this.updateWhiteboardEnded.bind(this),
            updateWhiteboardLimit: this.updateWhiteboardLimit.bind(this),
            updateIsWhiteboardModalVisible: this.updateIsWhiteboardModalVisible.bind(this),
            updateIsConfigureWhiteboardModalVisible: this.updateIsConfigureWhiteboardModalVisible.bind(this),
            updateShapes: this.updateShapes.bind(this),
            updateUseImageBackground: this.updateUseImageBackground.bind(this),
            updateRedoStack: this.updateRedoStack.bind(this),
            updateUndoStack: this.updateUndoStack.bind(this),
            updateCanvasStream: this.updateCanvasStream.bind(this),
            updateCanvasWhiteboard: this.updateCanvasWhiteboard.bind(this),
            // Screenboard
            updateCanvasScreenboard: this.updateCanvasScreenboard.bind(this),
            updateProcessedScreenStream: this.updateProcessedScreenStream.bind(this),
            updateAnnotateScreenStream: this.updateAnnotateScreenStream.bind(this),
            updateMainScreenCanvas: this.updateMainScreenCanvas.bind(this),
            updateIsScreenboardModalVisible: this.updateIsScreenboardModalVisible.bind(this),
            // Other functions
            checkOrientation: this.checkOrientation.bind(this),
            updateDevice: this.updateDevice.bind(this),
            updateSocket: this.updateSocket.bind(this),
            updateValidated: this.updateValidated.bind(this),
            showAlert: this.showAlert.bind(this),
            getUpdatedAllParams: () => {
                return {
                    ...this.getAllParams(),
                    ...this.mediaSFUFunctions(),
                };
            },
        };
    }
    mediaSFUParameters = {
        ...this.getAllParams(),
        ...this.mediaSFUFunctions(),
    };
    getUpdatedAllParams = () => {
        return {
            ...this.getAllParams(),
            ...this.mediaSFUFunctions(),
        };
    };
    updateButtonState(buttonType, value) {
        this.controlButtons = this.controlButtons.map((button) => {
            if (buttonType === 'micActive' && button.icon === this.faMicrophoneSlash) {
                return { ...button, active: value };
            }
            if (buttonType === 'videoActive' && button.icon === this.faVideoSlash) {
                return { ...button, active: value };
            }
            if (buttonType === 'screenShareActive' && button.icon === this.faDesktop) {
                if (button.alternateIconComponent) {
                    const updatedInjector = this.createInjector({
                        disabled: !value,
                    });
                    return {
                        ...button,
                        active: true,
                        alternateIconComponent: { ...this.screenShareWidget, injector: updatedInjector },
                    }; //always default to true for active
                }
                else {
                    return { ...button, active: true }; //always default to true for active
                }
            }
            if (buttonType === 'endCallActive' && button.icon === this.faPhone) {
                return { ...button, active: value };
            }
            if (buttonType === 'participantsActive' && button.icon === this.faUsers) {
                return { ...button, active: value };
            }
            if (buttonType === 'showMessagesBadge' &&
                button.customName &&
                button.customName === 'Messages') {
                const updatedInjector = this.createInjector({
                    icon: this.faComments,
                    badgeValue: value ? '*' : '',
                    iconColor: 'black',
                    showBadge: value,
                });
                return { ...button, customComponent: { ...this.messageWidget, injector: updatedInjector } };
            }
            if (buttonType === 'showMenuBadge' && button.customName && button.customName === 'Menu') {
                const updatedInjector = this.createInjector({
                    icon: this.faBars,
                    badgeValue: this.totalReqWait.value,
                    iconColor: 'black',
                    showBadge: true,
                });
                return { ...button, customComponent: { ...this.menuWidget, injector: updatedInjector } };
            }
            return button;
        });
        this.cdr.detectChanges();
    }
    PrejoinPageComponent = {
        component: this.PrejoinPage,
        injector: null,
    };
    updatePrejoinPageComponent = () => {
        const PrejoinComp = {
            component: this.PrejoinPage,
            injector: this.createInjector({
                parameters: {
                    showAlert: this.showAlert ||
                        (() => {
                            console.log('showAlert not defined');
                        }),
                    updateIsLoadingModalVisible: this.updateIsLoadingModalVisible,
                    connectSocket: this.socketManager.connectSocket,
                    updateSocket: this.updateSocket,
                    updateValidated: this.updateValidated,
                    updateApiUserName: this.updateApiUserName,
                    updateApiToken: this.updateApiToken,
                    updateLink: this.updateLink,
                    updateRoomName: this.updateRoomName,
                    updateMember: this.updateMember,
                },
                credentials: this.credentials,
            }),
        };
        this.PrejoinPageComponent = { ...PrejoinComp };
        this.cdr.detectChanges();
    };
    ngOnInit() {
        if (this.PrejoinPage) {
            this.updatePrejoinPageComponent();
        }
        this.setupResizeListener();
        if (this.validated) {
            this.connectAndAddSocketMethods();
        }
        this.mainHeightWidthSubscription = this.mainHeightWidth.subscribe(() => {
            this.updateMainVideoSize();
        });
        this.recordingSubscription = combineLatest([
            this.recordPaused,
            this.recordStarted,
            this.recordStopped,
            this.recordResumed,
            this.recordingProgressTime,
            this.showRecordButtons,
            this.islevel,
        ]).subscribe(([recordPaused, recordStarted, recordStopped, recordResumed, recordingProgressTime, showRecordButtons, islevel,]) => {
            if (recordPaused ||
                recordStarted ||
                recordStopped ||
                recordResumed ||
                recordingProgressTime ||
                showRecordButtons ||
                islevel) {
                this.updateRecordButtons();
            }
        });
        this.ScreenboardSubscription = combineLatest([
            this.shared,
            this.componentSizes,
            this.annotateScreenStream,
        ]).subscribe(([shared, componentSizes]) => {
            this.ScreenboardWidget = {
                component: Screenboard,
                inputs: {
                    customWidth: componentSizes.mainWidth,
                    customHeight: componentSizes.mainHeight,
                    parameters: this.mediaSFUParameters,
                    showAspect: shared,
                },
            };
        });
        this.validatedSubscription = this.validated.subscribe((validated) => {
            if (validated) {
                this.handleValidated();
            }
        });
        this.islevelSubscription = this.islevel.subscribe((islevel) => {
            if (islevel) {
                this.updateCustomMenuButtons();
                this.updateControlBroadcastButtons();
                this.updateControlChatButtons();
            }
        });
        this.coHostSubscription = combineLatest([this.coHost, this.coHostResponsibility]).subscribe(([coHost, coHostResponsibility]) => {
            if (coHost || coHostResponsibility) {
                this.updateCustomMenuButtons();
                this.updateControlBroadcastButtons();
                this.updateControlChatButtons();
            }
        });
        // Subscribe to changes in BehaviorSubject and update the buttons accordingly
        this.buttonSubscriptions.push(this.micActive.subscribe((value) => {
            this.updateButtonState('micActive', value);
            this.updateControlBroadcastButtons();
            this.updateControlChatButtons();
        }));
        this.buttonSubscriptions.push(this.videoActive.subscribe((value) => {
            this.updateButtonState('videoActive', value);
            this.updateControlBroadcastButtons();
            this.updateControlChatButtons();
        }));
        this.buttonSubscriptions.push(this.screenShareActive.subscribe((value) => {
            this.updateButtonState('screenShareActive', value);
        }));
        this.buttonSubscriptions.push(this.showMessagesBadge.subscribe((value) => {
            this.updateButtonState('showMessagesBadge', value);
        }));
        this.buttonSubscriptions.push(this.totalReqWait.subscribe(() => {
            this.updateButtonState('showMenuBadge', true);
        }));
        this.buttonSubscriptions.push(this.participantsCounter.subscribe((value) => {
            this.updateMenuParticipantsWidget(value);
        }));
        this.mediaSFUParameters = {
            ...this.getAllParams(),
            ...this.mediaSFUFunctions(),
        };
    }
    ngOnDestroy() {
        window.removeEventListener('resize', this.handleResize);
        window.removeEventListener('orientationchange', this.handleResize);
        if (this.mainHeightWidthSubscription) {
            this.mainHeightWidthSubscription.unsubscribe();
        }
        if (this.validatedSubscription) {
            this.validatedSubscription.unsubscribe();
        }
        if (this.islevelSubscription) {
            this.islevelSubscription.unsubscribe();
        }
        if (this.coHostSubscription) {
            this.coHostSubscription.unsubscribe();
        }
        if (this.ScreenboardSubscription) {
            this.ScreenboardSubscription.unsubscribe();
        }
        if (this.recordingSubscription) {
            this.recordingSubscription.unsubscribe();
        }
    }
    updateMainVideoSize = async () => {
        if (!this.lock_screen.value && !this.shared.value) {
            this.prepopulateUserMedia.prepopulateUserMedia({
                name: this.hostLabel.value,
                parameters: { ...this.getAllParams(), ...this.mediaSFUFunctions() },
            });
        }
        else {
            if (!this.first_round.value) {
                this.prepopulateUserMedia.prepopulateUserMedia({
                    name: this.hostLabel.value,
                    parameters: { ...this.getAllParams(), ...this.mediaSFUFunctions() },
                });
            }
        }
    };
    async connectAndAddSocketMethods() {
        this.mediaSFUParameters = {
            ...this.getAllParams(),
            ...this.mediaSFUFunctions(),
        };
        const socket_ = await this.connect_Socket(this.apiUserName.value, '', this.apiToken.value);
        if (socket_) {
            this.updateSocket(socket_);
        }
    }
    async handleValidated() {
        this.updateAllVideoStreams([
            { producerId: 'youyou', stream: undefined, id: 'youyou', name: 'youyou' },
        ]);
        this.updateStreamNames([{ id: 'youyou', name: 'youyou', producerId: '' }]);
        if (this.validated.value) {
            try {
                if (!this.localUIMode.value) {
                    await this.connectAndAddSocketMethods();
                    this.updateIsLoadingModalVisible(true);
                }
                else {
                    this.updateIsLoadingModalVisible(false);
                }
            }
            catch (error) {
                console.log('error connectAndaAddSocketMethods', error);
            }
            this.startMeetingProgressTimer.startMeetingProgressTimer({
                startTime: Date.now() / 1000,
                parameters: { ...this.getAllParams(), ...this.mediaSFUFunctions() },
            });
        }
    }
    async handleResize() {
        let fraction = 0;
        if (window.innerHeight < window.innerWidth &&
            (this.eventType.value == 'webinar' || this.eventType.value == 'conference')) {
            const currentHeight = window.innerHeight;
            fraction = Number((40 / currentHeight).toFixed(3));
            if (fraction != this.controlHeight.value) {
                this.updateControlHeight(Number(fraction));
            }
        }
        else {
            // Set default control button height for portrait mode or other event types
            const currentHeight = window.innerHeight;
            fraction = Number((40 / currentHeight).toFixed(3));
            fraction = Number(fraction);
            if (fraction != this.controlHeight.value) {
                this.updateControlHeight(Number(fraction));
            }
        }
        const dimensions = this.computeDimensionsMethod({
            containerWidthFraction: 1,
            containerHeightFraction: 1,
            mainSize: this.mainHeightWidth.value,
            doStack: true,
            defaultFraction: this.eventType.value == 'webinar' || this.eventType.value == 'conference'
                ? 1 - fraction
                : 1,
        });
        this.updateComponentSizes(dimensions);
        const orientation = this.checkOrientation();
        if (orientation == 'portrait') {
            if (!this.isWideScreen.value) {
                if (this.shareScreenStarted.value || this.shared.value) {
                    this.updateScreenForceFullDisplay(true);
                }
            }
        }
        // Updates the main grid view
        await this.prepopulateUserMedia.prepopulateUserMedia({
            name: this.hostLabel.value,
            parameters: { ...this.getAllParams(), ...this.mediaSFUFunctions() },
        });
        // Updates the mini grid view
        await this.onScreenChanges.onScreenChanges({
            changed: true,
            parameters: { ...this.getAllParams(), ...this.mediaSFUFunctions() },
        });
    }
    async disconnectAllSockets(consume_sockets) {
        for (const socket of consume_sockets) {
            try {
                const ip = Object.keys(socket)[0];
                await socket[ip].disconnect();
            }
            catch (error) {
                console.log(`Error disconnecting socket with IP: ${Object.keys(socket)[0]}`, error);
            }
        }
    }
    async closeAndReset() {
        //close and clean up all sockets, modals,... and reset all states to initial values
        this.updateIsMessagesModalVisible(false);
        this.updateIsParticipantsModalVisible(false);
        this.updateIsWaitingModalVisible(false);
        this.updateIsRequestsModalVisible(false);
        this.updateIsCoHostModalVisible(false);
        this.updateIsSettingsModalVisible(false);
        this.updateIsDisplaySettingsModalVisible(false);
        this.updateIsMediaSettingsModalVisible(false);
        this.updateIsMenuModalVisible(false);
        this.updateIsShareEventModalVisible(false);
        this.updateIsConfirmExitModalVisible(false);
        await this.disconnectAllSockets(this.consume_sockets.value);
        await this.updateStatesToInitialValues();
        this.updateMeetingProgressTime('00:00:00');
        this.updateMeetingElapsedTime(0);
        this.updateRecordingProgressTime('00:00:00');
        this.updateRecordElapsedTime(0);
        this.updateShowRecordButtons(false);
        this.updateIsConfigureWhiteboardModalVisible(false);
        this.updateIsWhiteboardModalVisible(false);
        this.updateIsMenuModalVisible(false);
        this.updateIsRecordingModalVisible(false);
        this.updateIsPollModalVisible(false);
        this.updateIsBreakoutRoomsModalVisible(false);
        this.updateIsBackgroundModalVisible(false);
        this.updateIsLoadingModalVisible(false);
        this.updateIsConfirmHereModalVisible(false);
        await sleep({ ms: 500 });
        this.updateValidated(false);
        //if on web, reload the page
        window.location.reload();
    }
    computeDimensionsMethod = ({ containerWidthFraction = 1, containerHeightFraction = 1, mainSize, doStack = true, defaultFraction, }) => {
        const parentWidth = window.innerWidth * containerWidthFraction;
        const parentHeight = window.innerHeight * containerHeightFraction * defaultFraction;
        let isWideScreen = parentWidth >= 768;
        if (!isWideScreen && parentWidth > 1.5 * parentHeight) {
            isWideScreen = true;
        }
        this.updateIsWideScreen(isWideScreen);
        const dimensions = this.calculateDimensions({
            parentWidth,
            parentHeight,
            isWideScreen,
            mainSize,
            doStack,
        });
        return dimensions;
    };
    calculateDimensions({ parentWidth, parentHeight, isWideScreen, mainSize, doStack, }) {
        if (doStack) {
            return isWideScreen
                ? {
                    mainHeight: Math.floor(parentHeight),
                    otherHeight: Math.floor(parentHeight),
                    mainWidth: Math.floor((mainSize / 100) * parentWidth),
                    otherWidth: Math.floor(((100 - mainSize) / 100) * parentWidth),
                }
                : {
                    mainHeight: Math.floor((mainSize / 100) * parentHeight),
                    otherHeight: Math.floor(((100 - mainSize) / 100) * parentHeight),
                    mainWidth: Math.floor(parentWidth),
                    otherWidth: Math.floor(parentWidth),
                };
        }
        else {
            return {
                mainHeight: Math.floor(parentHeight),
                otherHeight: Math.floor(parentHeight),
                mainWidth: Math.floor(parentWidth),
                otherWidth: Math.floor(parentWidth),
            };
        }
    }
    handleOrientationChange() {
        window.addEventListener('resize', this.handleResize.bind(this));
        window.addEventListener('orientationchange', this.handleResize.bind(this));
    }
    setupResizeListener() {
        this.handleResize();
    }
    orientation = window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
    async joinRoom(data) {
        const { socket, roomName, islevel, member, sec, apiUserName } = data;
        try {
            const response = await this.joinRoomClient.joinRoomClient({
                socket,
                roomName,
                islevel,
                member,
                sec,
                apiUserName,
            });
            return response;
        }
        catch (error) {
            console.log('Error joining room:', error);
            throw new Error('Failed to join the room. Please check your connection and try again.');
        }
    }
    async join_Room({ socket, roomName, islevel, member, sec, apiUserName, }) {
        const data = await this.joinRoom({
            socket: socket,
            roomName: roomName,
            islevel: islevel,
            member: member,
            sec: sec,
            apiUserName: apiUserName,
        });
        if (data && data.success) {
            this.roomData.next(data);
            try {
                this.updateRoomParametersClient.updateRoomParametersClient({
                    parameters: {
                        ...this.getAllParams(),
                        ...this.mediaSFUFunctions(),
                        data: data,
                    },
                });
                if (data.isHost) {
                    this.updateIslevel('2');
                }
                else {
                    this.updateIslevel('1');
                }
                if (data.secureCode) {
                    this.updateAdminPasscode(data.secureCode);
                }
                if (data.rtpCapabilities) {
                    const device_ = await this.createDeviceClient.createDeviceClient({
                        rtpCapabilities: data.rtpCapabilities,
                    });
                    if (device_) {
                        this.device.next(device_);
                    }
                }
            }
            catch {
                /* handle error */
            }
        }
        else {
            this.updateValidated(false);
            try {
                if (this.showAlert && data?.reason) {
                    this.showAlert({ message: data?.reason, type: 'danger', duration: 3000 });
                }
            }
            catch {
                /* handle error */
            }
        }
    }
    onParticipantsFilterChange = (value) => {
        if (value && value.length > 0) {
            this.filteredParticipants.next(this.participants.value.filter((participant) => participant.name.toLowerCase().includes(value.toLowerCase())));
            this.participantsCounter.next(this.filteredParticipants.value.length);
        }
        else {
            this.filteredParticipants.next(this.participants.value);
            this.participantsCounter.next(this.participants.value.length);
        }
    };
    updateStatesToInitialValues = async () => {
        const initialValues = initialValuesState;
        const updateFunctions = this.getAllParams();
        for (const key in initialValues) {
            if (Object.prototype.hasOwnProperty.call(initialValues, key)) {
                const updateFunctionName = `update${key.charAt(0).toUpperCase() + key.slice(1)}`;
                const updateFunction = updateFunctions[updateFunctionName];
                if (typeof updateFunction === 'function') {
                    try {
                        updateFunction(initialValues[key]);
                    }
                    catch {
                        /* handle error */
                    }
                }
            }
        }
    };
    faRecordVinyl = faRecordVinyl;
    faPlayCircle = faPlayCircle;
    faPauseCircle = faPauseCircle;
    faStopCircle = faStopCircle;
    faDotCircle = faDotCircle;
    faCog = faCog;
    faUsers = faUsers;
    faClock = faClock;
    faUserPlus = faUserPlus;
    faTools = faTools;
    faDesktop = faDesktop;
    faPoll = faPoll;
    faUserFriends = faUserFriends;
    faChalkboardTeacher = faChalkboardTeacher;
    faMicrophone = faMicrophone;
    faMicrophoneSlash = faMicrophoneSlash;
    faVideo = faVideo;
    faVideoSlash = faVideoSlash;
    faSync = faSync;
    faPhone = faPhone;
    faShareAlt = faShareAlt;
    faBars = faBars;
    faComments = faComments;
    faChartBar = faChartBar;
    onCloseMenuModal = () => {
        this.updateIsMenuModalVisible(false);
    };
    onEventSettingsClose = () => {
        this.updateIsSettingsModalVisible(false);
    };
    onCoHostClose = () => {
        this.updateIsCoHostModalVisible(false);
    };
    onMediaSettingsClose = () => {
        this.updateIsMediaSettingsModalVisible(false);
    };
    onDisplaySettingsClose = () => {
        this.updateIsDisplaySettingsModalVisible(false);
    };
    onPollClose = () => {
        this.updateIsPollModalVisible(false);
    };
    onBreakoutRoomsClose = () => {
        this.updateIsBreakoutRoomsModalVisible(false);
    };
    onConfigureWhiteboardClose = () => {
        this.updateIsConfigureWhiteboardModalVisible(false);
    };
    onMessagesClose = () => {
        this.updateIsMessagesModalVisible(false);
    };
    onRecordingClose = () => {
        this.updateIsRecordingModalVisible(false);
    };
    onParticipantsClose = () => {
        this.updateIsParticipantsModalVisible(false);
    };
    onBackgroundClose = () => {
        this.updateIsBackgroundModalVisible(false);
    };
    onConfirmExitClose = () => {
        this.updateIsConfirmExitModalVisible(false);
    };
    onConfirmHereClose = () => {
        this.updateIsConfirmHereModalVisible(false);
    };
    onScreenboardClose = () => {
        this.updateIsScreenboardModalVisible(false);
    };
    onShareEventClose = () => {
        this.updateIsShareEventModalVisible(false);
    };
    onAlertHide = () => {
        this.updateAlertVisible(false);
    };
    ScreenboardWidget = {
        component: Screenboard,
        inputs: {
            customWidth: this.componentSizes.value.mainWidth,
            customHeight: this.componentSizes.value.mainHeight,
            parameters: this.mediaSFUParameters,
            showAspect: this.shared.value,
        },
    };
    recordTimerWidget = {
        component: RecordTimerWidget,
        injector: this.createInjector({ recordingProgressTime: this.recordingProgressTime.value }),
    };
    updateRecordTimerWidget = (recordingProgressTime = this.recordingProgressTime.value) => {
        const recordTimerWidget = {
            component: RecordTimerWidget,
            injector: this.createInjector({ recordingProgressTime: recordingProgressTime }),
        };
        this.recordTimerWidget = { ...recordTimerWidget };
        this.cdr.markForCheck();
        return recordTimerWidget;
    };
    recordButton = [
        {
            icon: this.faRecordVinyl,
            text: 'Record',
            onPress: () => {
                this.launchRecording.launchRecording({
                    updateIsRecordingModalVisible: this.updateIsRecordingModalVisible.bind(this),
                    isRecordingModalVisible: this.isRecordingModalVisible.value,
                    showAlert: this.showAlert.bind(this),
                    stopLaunchRecord: this.stopLaunchRecord.value,
                    canLaunchRecord: this.canLaunchRecord.value,
                    recordingAudioSupport: this.recordingAudioSupport.value,
                    recordingVideoSupport: this.recordingVideoSupport.value,
                    updateCanRecord: this.updateCanRecord.bind(this),
                    updateClearedToRecord: this.updateClearedToRecord.bind(this),
                    recordStarted: this.recordStarted.value,
                    recordPaused: this.recordPaused.value,
                    localUIMode: this.localUIMode.value,
                });
            },
            activeColor: 'black',
            inActiveColor: 'black',
            show: true,
        },
    ];
    recordButtons = [];
    recordButtonsArray = [
        {
            icon: this.faPlayCircle,
            active: () => !this.recordPaused.value,
            onPress: () => this.updateRecording.updateRecording({
                parameters: { ...this.getAllParams(), ...this.mediaSFUFunctions() },
            }),
            activeColor: 'black',
            inActiveColor: 'black',
            alternateIcon: this.faPauseCircle,
            show: () => true,
        },
        {
            icon: this.faStopCircle,
            active: () => false,
            onPress: () => this.stopRecording.stopRecording({
                parameters: { ...this.getAllParams(), ...this.mediaSFUFunctions() },
            }),
            activeColor: 'green',
            inActiveColor: 'black',
            show: () => true,
        },
        {
            customComponent: () => this.updateRecordTimerWidget(),
            show: () => true,
            active: () => false,
        },
        {
            icon: this.faDotCircle,
            active: () => false,
            onPress: () => console.log('Status pressed'),
            activeColor: 'black',
            inActiveColor: () => (this.recordPaused.value ? 'yellow' : 'red'),
            show: () => true,
        },
        {
            icon: this.faCog,
            active: () => false,
            onPress: () => this.launchRecording.launchRecording({
                updateIsRecordingModalVisible: this.updateIsRecordingModalVisible.bind(this),
                isRecordingModalVisible: this.isRecordingModalVisible.value,
                showAlert: this.showAlert.bind(this),
                stopLaunchRecord: this.stopLaunchRecord.value,
                canLaunchRecord: this.canLaunchRecord.value,
                recordingAudioSupport: this.recordingAudioSupport.value,
                recordingVideoSupport: this.recordingVideoSupport.value,
                updateCanRecord: this.updateCanRecord.bind(this),
                updateClearedToRecord: this.updateClearedToRecord.bind(this),
                recordStarted: this.recordStarted.value,
                recordPaused: this.recordPaused.value,
                localUIMode: this.localUIMode.value,
            }),
            activeColor: 'green',
            inActiveColor: 'black',
            show: () => true,
        },
    ];
    async updateRecordButtons() {
        const recordButtons = this.recordButtonsArray.map((button) => {
            return {
                ...button,
                active: typeof button.active === 'function' ? button.active() : button.active,
                show: typeof button.show === 'function' ? button.show() : button.show,
                customComponent: button.customComponent
                    ? typeof button.customComponent === 'function'
                        ? button.customComponent()
                        : button.customComponent
                    : undefined,
                activeColor: typeof button.inActiveColor === 'function'
                    ? button.inActiveColor()
                    : button.inActiveColor,
                inActiveColor: typeof button.inActiveColor === 'function'
                    ? button.inActiveColor()
                    : button.inActiveColor,
            };
        });
        this.recordButtons = [...recordButtons];
        await this.updateMenuRecordWidget(recordButtons);
        this.updateCustomMenuButtons();
        this.updateControlBroadcastButtons();
        this.cdr.markForCheck();
    }
    // Create instances of the custom widgets
    menuWidget = {
        component: MenuWidget,
        injector: this.createInjector({
            icon: this.faBars,
            badgeValue: this.totalReqWait.value,
            iconColor: 'black',
            showBadge: true,
        }),
    };
    messageWidget = {
        component: MessageWidget,
        injector: this.createInjector({
            icon: this.faComments,
            showBadge: this.showMessagesBadge.value,
            badgeValue: 1,
            iconColor: 'black',
        }),
    };
    menuRecordWidget = {
        component: MenuRecordWidget,
        injector: this.createInjector({
            buttons: this.recordButtons,
            showAspect: true,
            direction: 'horizontal',
        }),
    };
    updateMenuRecordWidget = (recordButtons = this.recordButtons) => {
        const menuRecordWidget = {
            component: MenuRecordWidget,
            injector: this.createInjector({
                buttons: recordButtons,
                showAspect: true,
                direction: 'horizontal',
            }),
        };
        this.menuRecordWidget = { ...menuRecordWidget };
        this.cdr.markForCheck();
        return menuRecordWidget;
    };
    menuParticipantsWidget = {
        component: MenuParticipantsWidget,
        injector: this.createInjector({
            icon: this.faChartBar,
            participantsCounter: this.participantsCounter.value,
            iconColor: 'black',
        }),
    };
    updateMenuParticipantsWidget = (count = this.participantsCounter.value) => {
        const menuParticipantsWidget = {
            component: MenuParticipantsWidget,
            injector: this.createInjector({
                icon: this.faChartBar,
                participantsCounter: count,
                iconColor: 'black',
            }),
        };
        this.menuParticipantsWidget = { ...menuParticipantsWidget };
        this.cdr.markForCheck();
        return menuParticipantsWidget;
    };
    customMenuButtonsArray = [
        {
            icon: this.faRecordVinyl,
            text: 'Record',
            action: () => this.launchRecording.launchRecording({
                updateIsRecordingModalVisible: this.updateIsRecordingModalVisible.bind(this),
                isRecordingModalVisible: this.isRecordingModalVisible.value,
                showAlert: this.showAlert.bind(this),
                stopLaunchRecord: this.stopLaunchRecord.value,
                canLaunchRecord: this.canLaunchRecord.value,
                recordingAudioSupport: this.recordingAudioSupport.value,
                recordingVideoSupport: this.recordingVideoSupport.value,
                updateCanRecord: this.updateCanRecord.bind(this),
                updateClearedToRecord: this.updateClearedToRecord.bind(this),
                recordStarted: this.recordStarted.value,
                recordPaused: this.recordPaused.value,
                localUIMode: this.localUIMode.value,
            }),
            show: () => !this.showRecordButtons.value && this.islevel.value == '2',
        },
        {
            customComponent: () => this.updateMenuRecordWidget(),
            show: () => this.showRecordButtons.value && this.islevel.value == '2',
            action: () => console.log('record buttons pressed'),
        },
        {
            icon: this.faCog,
            text: 'Event Settings',
            action: () => this.launchSettings.launchSettings({
                updateIsSettingsModalVisible: this.updateIsSettingsModalVisible.bind(this),
                isSettingsModalVisible: this.isSettingsModalVisible.value,
            }),
            show: () => this.islevel.value == '2',
        },
        {
            icon: this.faUsers,
            text: 'Requests',
            action: () => this.launchRequests.launchRequests({
                updateIsRequestsModalVisible: this.updateIsRequestsModalVisible.bind(this),
                isRequestsModalVisible: this.isRequestsModalVisible.value,
            }),
            show: () => this.islevel.value == '2' ||
                ((this.coHostResponsibility.value &&
                    this.coHost.value &&
                    this.coHost.value === this.member.value &&
                    !!this.coHostResponsibility?.value?.find((item) => item.name === 'media')?.value) ??
                    false) ||
                false,
        },
        {
            icon: this.faClock,
            text: 'Waiting',
            action: () => this.launchWaiting.launchWaiting({
                updateIsWaitingModalVisible: this.updateIsWaitingModalVisible.bind(this),
                isWaitingModalVisible: this.isWaitingModalVisible.value,
            }),
            show: () => this.islevel.value == '2' ||
                (this.coHostResponsibility.value &&
                    this.coHost.value &&
                    this.coHost.value === this.member.value &&
                    this.coHostResponsibility?.value?.find((item) => item.name === 'waiting')?.value ===
                        true) ||
                false,
        },
        {
            icon: this.faUserPlus,
            text: 'Co-host',
            action: () => this.launchCoHost.launchCoHost({
                updateIsCoHostModalVisible: this.updateIsCoHostModalVisible.bind(this),
                isCoHostModalVisible: this.isCoHostModalVisible.value,
            }),
            show: () => this.islevel.value == '2',
        },
        {
            icon: this.faTools,
            text: 'Set Media',
            action: () => this.launchMediaSettings.launchMediaSettings({
                updateIsMediaSettingsModalVisible: this.updateIsMediaSettingsModalVisible.bind(this),
                isMediaSettingsModalVisible: this.isMediaSettingsModalVisible.value,
                audioInputs: this.audioInputs.value,
                videoInputs: this.videoInputs.value,
                updateAudioInputs: this.updateAudioInputs.bind(this),
                updateVideoInputs: this.updateVideoInputs.bind(this),
            }),
            show: () => true,
        },
        {
            icon: this.faDesktop,
            text: 'Display',
            action: () => this.launchDisplaySettings.launchDisplaySettings({
                updateIsDisplaySettingsModalVisible: this.updateIsDisplaySettingsModalVisible.bind(this),
                isDisplaySettingsModalVisible: this.isDisplaySettingsModalVisible.value,
            }),
            show: () => true,
        },
        {
            icon: this.faPoll,
            text: 'Poll',
            action: () => this.launchPoll.launchPoll({
                updateIsPollModalVisible: this.updateIsPollModalVisible.bind(this),
                isPollModalVisible: this.isPollModalVisible.value,
            }),
            show: () => true,
        },
        {
            icon: this.faUserFriends,
            text: 'Breakout Rooms',
            action: () => this.launchBreakoutRooms.launchBreakoutRooms({
                updateIsBreakoutRoomsModalVisible: this.updateIsBreakoutRoomsModalVisible.bind(this),
                isBreakoutRoomsModalVisible: this.isBreakoutRoomsModalVisible.value,
            }),
            show: () => this.islevel.value == '2',
        },
        {
            icon: this.faChalkboardTeacher,
            text: 'Whiteboard',
            action: () => this.launchConfigureWhiteboard.launchConfigureWhiteboard({
                updateIsConfigureWhiteboardModalVisible: this.updateIsConfigureWhiteboardModalVisible.bind(this),
                isConfigureWhiteboardModalVisible: this.isConfigureWhiteboardModalVisible.value,
            }),
            show: () => this.islevel.value == '2',
        },
    ];
    customMenuButtons = [];
    updateCustomMenuButtons() {
        this.customMenuButtons = this.customMenuButtonsArray.map((button) => {
            return {
                ...button,
                show: typeof button.show === 'function' ? button.show() : button.show,
                customComponent: button.customComponent
                    ? typeof button.customComponent === 'function'
                        ? button.customComponent()
                        : button.customComponent
                    : undefined,
            };
        });
    }
    controlBroadcastButtons = [];
    updateControlBroadcastButtons() {
        this.controlBroadcastButtons = this.controlBroadcastButtonsArray.map((button) => {
            return {
                ...button,
                show: typeof button.show === 'function' ? button.show() : button.show,
                active: typeof button.active === 'function' ? button.active() : button.active,
                customComponent: button.customComponent
                    ? typeof button.customComponent === 'function'
                        ? button.customComponent()
                        : button.customComponent
                    : undefined,
            };
        });
    }
    controlBroadcastButtonsArray = [
        {
            icon: this.faUsers,
            active: true,
            alternateIcon: this.faUsers,
            onPress: () => this.launchParticipants.launchParticipants({
                updateIsParticipantsModalVisible: this.updateIsParticipantsModalVisible.bind(this),
                isParticipantsModalVisible: this.isParticipantsModalVisible.value,
            }),
            activeColor: 'black',
            inActiveColor: 'black',
            show: () => this.islevel.value == '2',
        },
        {
            icon: this.faShareAlt,
            active: true,
            alternateIcon: this.faShareAlt,
            onPress: () => this.updateIsShareEventModalVisible(!this.isShareEventModalVisible.value),
            activeColor: 'black',
            inActiveColor: 'black',
            show: () => true,
        },
        {
            customComponent: this.messageWidget,
            onPress: () => this.launchMessages.launchMessages({
                updateIsMessagesModalVisible: this.updateIsMessagesModalVisible.bind(this),
                isMessagesModalVisible: this.isMessagesModalVisible.value,
            }),
            show: () => true,
        },
        {
            icon: this.faSync,
            active: true,
            alternateIcon: this.faSync,
            onPress: () => this.switchVideoAlt.switchVideoAlt({
                parameters: {
                    ...this.getAllParams(),
                    ...this.mediaSFUFunctions(),
                },
            }),
            activeColor: 'black',
            inActiveColor: 'black',
            show: () => this.islevel.value == '2',
        },
        {
            icon: this.faVideoSlash,
            alternateIcon: this.faVideo,
            active: () => this.videoActive.value,
            onPress: () => this.clickVideo.clickVideo({
                parameters: {
                    ...this.getAllParams(),
                    ...this.mediaSFUFunctions(),
                },
            }),
            show: () => this.islevel.value == '2',
            activeColor: 'green',
            inActiveColor: 'red',
        },
        {
            icon: this.faMicrophoneSlash,
            alternateIcon: this.faMicrophone,
            active: () => this.micActive.value,
            onPress: () => this.clickAudio.clickAudio({
                parameters: {
                    ...this.getAllParams(),
                    ...this.mediaSFUFunctions(),
                },
            }),
            activeColor: 'green',
            inActiveColor: 'red',
            show: () => this.islevel.value == '2',
        },
        {
            customComponent: () => this.menuParticipantsWidget,
            show: () => this.islevel.value == '2',
        },
        {
            icon: this.faPhone,
            active: this.endCallActive.value,
            onPress: () => this.launchConfirmExit.launchConfirmExit({
                updateIsConfirmExitModalVisible: this.updateIsConfirmExitModalVisible.bind(this),
                isConfirmExitModalVisible: this.isConfirmExitModalVisible.value,
            }),
            activeColor: 'green',
            inActiveColor: 'red',
            show: () => true,
        },
        {
            icon: this.faPhone,
            active: this.endCallActive.value,
            onPress: () => console.log('End Call pressed'),
            activeColor: 'transparent',
            inActiveColor: 'transparent',
            backgroundColor: { default: 'transparent' },
            show: () => false,
        },
    ];
    controlChatButtons = [];
    controlChatButtonsArray = [
        {
            icon: this.faShareAlt,
            active: true,
            alternateIcon: this.faShareAlt,
            onPress: () => this.updateIsShareEventModalVisible(!this.isShareEventModalVisible.value),
            activeColor: 'black',
            inActiveColor: 'black',
            show: true,
        },
        {
            customComponent: this.messageWidget,
            onPress: () => this.launchMessages.launchMessages({
                updateIsMessagesModalVisible: this.updateIsMessagesModalVisible.bind(this),
                isMessagesModalVisible: this.isMessagesModalVisible.value,
            }),
            show: true,
        },
        {
            icon: this.faSync,
            active: true,
            alternateIcon: this.faSync,
            onPress: () => this.switchVideoAlt.switchVideoAlt({
                parameters: {
                    ...this.getAllParams(),
                    ...this.mediaSFUFunctions(),
                },
            }),
            activeColor: 'black',
            inActiveColor: 'black',
            show: true,
        },
        {
            icon: this.faVideoSlash,
            alternateIcon: this.faVideo,
            active: () => this.videoActive.value,
            onPress: () => this.clickVideo.clickVideo({
                parameters: {
                    ...this.getAllParams(),
                    ...this.mediaSFUFunctions(),
                },
            }),
            activeColor: 'green',
            inActiveColor: 'red',
            show: true,
        },
        {
            icon: this.faMicrophoneSlash,
            alternateIcon: this.faMicrophone,
            active: () => this.micActive.value,
            onPress: () => this.clickAudio.clickAudio({
                parameters: {
                    ...this.getAllParams(),
                    ...this.mediaSFUFunctions(),
                },
            }),
            activeColor: 'green',
            inActiveColor: 'red',
            show: true,
        },
        {
            icon: this.faPhone,
            active: this.endCallActive.value,
            onPress: () => this.launchConfirmExit.launchConfirmExit({
                updateIsConfirmExitModalVisible: this.updateIsConfirmExitModalVisible.bind(this),
                isConfirmExitModalVisible: this.isConfirmExitModalVisible.value,
            }),
            activeColor: 'green',
            inActiveColor: 'red',
            show: true,
        },
    ];
    updateControlChatButtons() {
        this.controlChatButtons = this.controlChatButtonsArray.map((button) => {
            return {
                ...button,
                show: typeof button.show === 'function' ? button.show() : button.show,
                active: typeof button.active === 'function' ? button.active() : button.active,
            };
        });
    }
    screenShareWidget = {
        component: ScreenShareWidget,
        injector: this.createInjector({ disabled: !this.screenShareActive.value }),
    };
    controlButtons = [
        {
            icon: this.faMicrophoneSlash,
            alternateIcon: this.faMicrophone,
            active: this.micActive.value,
            onPress: () => this.clickAudio.clickAudio({
                parameters: {
                    ...this.getAllParams(),
                    ...this.mediaSFUFunctions(),
                },
            }),
            activeColor: 'green',
            inActiveColor: 'red',
            disabled: this.audioSwitching.value,
            show: true,
        },
        {
            icon: this.faVideoSlash,
            alternateIcon: this.faVideo,
            active: this.videoActive.value,
            onPress: () => this.clickVideo.clickVideo({
                parameters: {
                    ...this.getAllParams(),
                    ...this.mediaSFUFunctions(),
                    MediaStream,
                    MediaStreamTrack,
                    mediaDevices: MediaDevices,
                    device: this.device.value,
                    socket: this.socket.value,
                    showAlert: this.showAlert.bind(this),
                    checkPermission: this.checkPermission.checkPermission,
                    streamSuccessVideo: this.streamSuccessVideo.streamSuccessVideo,
                    hasCameraPermission: this.hasCameraPermission.value,
                    requestPermissionCamera: this.requestPermissionCamera.bind(this),
                    checkMediaPermission: 'web' !== 'web',
                },
            }),
            activeColor: 'green',
            inActiveColor: 'red',
            disabled: this.videoSwitching.value,
            show: true,
        },
        {
            //inverted active for inactive state
            icon: faDesktop,
            alternateIconComponent: this.screenShareWidget,
            active: true,
            onPress: () => this.clickScreenShare.clickScreenShare({
                parameters: {
                    ...this.getAllParams(),
                    ...this.mediaSFUFunctions(),
                },
            }),
            activeColor: 'green',
            inActiveColor: 'red',
            disabled: false,
            show: true,
        },
        {
            icon: this.faPhone,
            active: this.endCallActive.value,
            onPress: () => this.launchConfirmExit.launchConfirmExit({
                updateIsConfirmExitModalVisible: this.updateIsConfirmExitModalVisible.bind(this),
                isConfirmExitModalVisible: this.isConfirmExitModalVisible.value,
            }),
            activeColor: 'green',
            inActiveColor: 'red',
            disabled: false,
            show: true,
        },
        {
            icon: this.faUsers,
            active: this.participantsActive.value,
            onPress: () => this.launchParticipants.launchParticipants({
                updateIsParticipantsModalVisible: this.updateIsParticipantsModalVisible.bind(this),
                isParticipantsModalVisible: this.isParticipantsModalVisible.value,
            }),
            activeColor: 'black',
            inActiveColor: 'black',
            disabled: false,
            show: true,
        },
        {
            customComponent: this.menuWidget,
            customName: 'Menu',
            onPress: () => this.launchMenuModal.launchMenuModal({
                updateIsMenuModalVisible: this.updateIsMenuModalVisible.bind(this),
                isMenuModalVisible: this.isMenuModalVisible.value,
            }),
            show: true,
        },
        {
            customComponent: this.messageWidget,
            customName: 'Messages',
            onPress: () => this.launchMessages.launchMessages({
                updateIsMessagesModalVisible: this.updateIsMessagesModalVisible.bind(this),
                isMessagesModalVisible: this.isMessagesModalVisible.value,
            }),
            show: true,
        },
    ];
    async connect_Socket(apiUserName, apiKey, apiToken) {
        if (this.socket.value && this.socket.value.id) {
            this.socket.value.on('disconnect', async () => {
                await this.disconnect.disconnect({
                    showAlert: this.showAlert.bind(this),
                    redirectURL: this.redirectURL.value,
                    onWeb: true,
                    updateValidated: this.updateValidated.bind(this),
                });
                if (this.videoAlreadyOn.value) {
                    await this.clickVideo.clickVideo({
                        parameters: { ...this.getAllParams(), ...this.mediaSFUFunctions() },
                    });
                }
                if (this.audioAlreadyOn.value) {
                    await this.clickAudio.clickAudio({
                        parameters: { ...this.getAllParams(), ...this.mediaSFUFunctions() },
                    });
                }
                await this.closeAndReset();
            });
            this.socket.value.on('allMembers', async (membersData) => {
                if (membersData) {
                    await this.allMembers.allMembers({
                        apiUserName: apiUserName,
                        apiKey: '', //not recommended - use apiToken instead. Use for testing/development only
                        apiToken: apiToken,
                        members: membersData.members,
                        requestss: membersData.requests ? membersData.requests : this.requestList.value,
                        coHoste: membersData.coHost ? membersData.coHost : this.coHost.value,
                        coHostRes: membersData.coHostResponsibilities
                            ? membersData.coHostResponsibilities
                            : this.coHostResponsibility.value,
                        parameters: { ...this.getAllParams(), ...this.mediaSFUFunctions() },
                        consume_sockets: this.consume_sockets.value,
                    });
                }
            });
            this.socket.value.on('allMembersRest', async (membersData) => {
                if (membersData) {
                    await this.allMembersRest.allMembersRest({
                        apiUserName: apiUserName,
                        apiKey: '', // not recommended - use apiToken instead. Use for testing/development only
                        members: membersData.members,
                        apiToken: apiToken,
                        settings: membersData.settings,
                        coHoste: membersData.coHost ? membersData.coHost : this.coHost.value,
                        coHostRes: membersData.coHostResponsibilities
                            ? membersData.coHostResponsibilities
                            : this.coHostResponsibility.value,
                        parameters: { ...this.getAllParams(), ...this.mediaSFUFunctions() },
                        consume_sockets: this.consume_sockets.value,
                    });
                }
            });
            this.socket.value.on('userWaiting', async ({ name }) => {
                await this.userWaiting.userWaiting({
                    name,
                    showAlert: this.showAlert.bind(this),
                    totalReqWait: this.totalReqWait.value,
                    updateTotalReqWait: this.updateTotalReqWait.bind(this),
                });
            });
            this.socket.value.on('personJoined', async ({ name }) => {
                this.personJoined.personJoined({
                    name,
                    showAlert: this.showAlert.bind(this),
                });
            });
            this.socket.value.on('allWaitingRoomMembers', async (waiting_data) => {
                await this.allWaitingRoomMembers.allWaitingRoomMembers({
                    waitingParticipants: waiting_data.waitingParticipants
                        ? waiting_data.waitingParticipants
                        : waiting_data.waitingParticipantss
                            ? waiting_data.waitingParticipantss
                            : this.waitingRoomList.value,
                    updateTotalReqWait: this.updateTotalReqWait.bind(this),
                    updateWaitingRoomList: this.updateWaitingRoomList.bind(this),
                });
            });
            this.socket.value.on('roomRecordParams', async ({ recordParams }) => {
                this.roomRecordParams.roomRecordParams({
                    recordParams,
                    parameters: { ...this.getAllParams(), ...this.mediaSFUFunctions() },
                });
            });
            this.socket.value.on('ban', async ({ name }) => {
                await this.banParticipant.banParticipant({
                    name,
                    parameters: { ...this.getAllParams(), ...this.mediaSFUFunctions() },
                });
            });
            this.socket.value.on('updatedCoHost', async (cohost_data) => {
                await this.updatedCoHost.updatedCoHost({
                    coHost: cohost_data.coHost ? cohost_data.coHost : this.coHost.value,
                    coHostResponsibility: cohost_data.coHostResponsibilities
                        ? cohost_data.coHostResponsibilities
                        : this.coHostResponsibility.value,
                    youAreCoHost: this.youAreCoHost.value,
                    updateCoHost: this.updateCoHost.bind(this),
                    updateCoHostResponsibility: this.updateCoHostResponsibility.bind(this),
                    updateYouAreCoHost: this.updateYouAreCoHost.bind(this),
                    showAlert: this.showAlert.bind(this),
                    eventType: this.eventType.value,
                    islevel: this.islevel.value,
                    member: this.member.value,
                });
            });
            this.socket.value.on('participantRequested', async ({ userRequest }) => {
                await this.participantRequested.participantRequested({
                    userRequest,
                    requestList: this.requestList.value,
                    waitingRoomList: this.waitingRoomList.value,
                    updateTotalReqWait: this.updateTotalReqWait.bind(this),
                    updateRequestList: this.updateRequestList.bind(this),
                });
            });
            this.socket.value.on('screenProducerId', async ({ producerId }) => {
                this.screenProducerId.screenProducerId({
                    producerId,
                    screenId: this.screenId.value,
                    membersReceived: this.membersReceived.value,
                    shareScreenStarted: this.shareScreenStarted.value,
                    deferScreenReceived: this.deferScreenReceived.value,
                    participants: this.participants.value,
                    updateScreenId: this.updateScreenId.bind(this),
                    updateShareScreenStarted: this.updateShareScreenStarted.bind(this),
                    updateDeferScreenReceived: this.updateDeferScreenReceived.bind(this),
                });
            });
            //settings, updateAudioSetting, updateVideoSetting, updateScreenshareSetting, updateChatSetting
            this.socket.value.on('updateMediaSettings', async ({ settings }) => {
                this.updateMediaSettings.updateMediaSettings({
                    settings,
                    updateAudioSetting: this.updateAudioSetting.bind(this),
                    updateVideoSetting: this.updateVideoSetting.bind(this),
                    updateScreenshareSetting: this.updateScreenshareSetting.bind(this),
                    updateChatSetting: this.updateChatSetting.bind(this),
                });
            });
            this.socket.value.on('producer-media-paused', async ({ producerId, kind, name, }) => {
                await this.producerMediaPaused.producerMediaPaused({
                    producerId,
                    kind,
                    name,
                    parameters: { ...this.getAllParams(), ...this.mediaSFUFunctions() },
                });
            });
            this.socket.value.on('producer-media-resumed', async ({ kind, name }) => {
                await this.producerMediaResumed.producerMediaResumed({
                    kind,
                    name,
                    parameters: { ...this.getAllParams(), ...this.mediaSFUFunctions() },
                });
            });
            this.socket.value.on('producer-media-closed', async ({ producerId, kind, }) => {
                if (producerId && kind) {
                    await this.producerMediaClosed.producerMediaClosed({
                        producerId,
                        kind,
                        parameters: { ...this.getAllParams(), ...this.mediaSFUFunctions() },
                    });
                }
            });
            this.socket.value.on('controlMediaHost', async ({ type }) => {
                await this.controlMediaHost.controlMediaHost({
                    type,
                    parameters: { ...this.getAllParams(), ...this.mediaSFUFunctions() },
                });
            });
            this.socket.value.on('meetingEnded', async () => {
                await this.meetingEnded.meetingEnded({
                    showAlert: this.showAlert.bind(this),
                    redirectURL: this.redirectURL.value,
                    onWeb: true,
                    eventType: this.eventType.value,
                    updateValidated: this.updateValidated.bind(this),
                });
                if (this.videoAlreadyOn.value) {
                    await this.clickVideo.clickVideo({
                        parameters: {
                            ...this.getAllParams(),
                            ...this.mediaSFUFunctions(),
                        },
                    });
                }
                if (this.audioAlreadyOn.value) {
                    await this.clickAudio.clickAudio({
                        parameters: {
                            ...this.getAllParams(),
                            ...this.mediaSFUFunctions(),
                        },
                    });
                }
                await this.closeAndReset();
            });
            this.socket.value.on('disconnectUserSelf', async () => {
                await this.disconnectUserSelf.disconnectUserSelf({
                    socket: this.socket.value,
                    member: this.member.value,
                    roomName: this.roomName.value,
                });
            });
            this.socket.value.on('receiveMessage', async ({ message }) => {
                await this.receiveMessage.receiveMessage({
                    message,
                    messages: this.messages.value,
                    participantsAll: this.participantsAll.value,
                    member: this.member.value,
                    eventType: this.eventType.value,
                    islevel: this.islevel.value,
                    coHost: this.coHost.value,
                    updateMessages: this.updateMessages.bind(this),
                    updateShowMessagesBadge: this.updateShowMessagesBadge.bind(this),
                });
            });
            this.socket.value.on('meetingTimeRemaining', async ({ timeRemaining }) => {
                await this.meetingTimeRemaining.meetingTimeRemaining({
                    timeRemaining,
                    showAlert: this.showAlert.bind(this),
                    eventType: this.eventType.value,
                });
            });
            this.socket.value.on('meetingStillThere', async () => {
                this.meetingStillThere.meetingStillThere({
                    updateIsConfirmHereModalVisible: this.updateIsConfirmHereModalVisible.bind(this),
                });
            });
            this.socket.value.on('startRecords', async () => {
                await this.startRecords.startRecords({
                    roomName: this.roomName.value,
                    member: this.member.value,
                    socket: this.socket.value,
                });
            });
            this.socket.value.on('reInitiateRecording', async () => {
                await this.reInitiateRecording.reInitiateRecording({
                    roomName: this.roomName.value,
                    member: this.member.value,
                    socket: this.socket.value,
                    adminRestrictSetting: this.adminRestrictSetting.value,
                });
            });
            this.socket.value.on('updateConsumingDomains', async ({ domains, alt_domains }) => {
                await this.updateConsumingDomains.updateConsumingDomains({
                    domains,
                    alt_domains,
                    apiUserName,
                    apiKey,
                    apiToken,
                    parameters: {
                        ...this.getAllParams(),
                        ...this.mediaSFUFunctions(),
                    },
                });
            });
            this.socket.value.on('RecordingNotice', async ({ state, userRecordingParam, pauseCount, timeDone }) => {
                await this.recordingNotice.RecordingNotice({
                    state,
                    userRecordingParam,
                    pauseCount,
                    timeDone,
                    parameters: { ...this.getAllParams(), ...this.mediaSFUFunctions() },
                });
            });
            this.socket.value.on('timeLeftRecording', async ({ timeLeft }) => {
                this.timeLeftRecording.timeLeftRecording({
                    timeLeft,
                    showAlert: this.showAlert.bind(this),
                });
            });
            this.socket.value.on('stoppedRecording', async ({ state, reason }) => {
                await this.stoppedRecording.stoppedRecording({
                    state,
                    reason,
                    showAlert: this.showAlert.bind(this),
                });
            });
            this.socket.value.on('hostRequestResponse', ({ requestResponse }) => {
                this.hostRequestResponse.hostRequestResponse({
                    requestResponse,
                    showAlert: this.showAlert.bind(this),
                    requestList: this.requestList.value,
                    updateRequestList: this.updateRequestList.bind(this),
                    updateMicAction: this.updateMicAction.bind(this),
                    updateVideoAction: this.updateVideoAction.bind(this),
                    updateScreenAction: this.updateScreenAction.bind(this),
                    updateChatAction: this.updateChatAction.bind(this),
                    updateAudioRequestState: this.updateAudioRequestState.bind(this),
                    updateVideoRequestState: this.updateVideoRequestState.bind(this),
                    updateScreenRequestState: this.updateScreenRequestState.bind(this),
                    updateChatRequestState: this.updateChatRequestState.bind(this),
                    updateAudioRequestTime: this.updateAudioRequestTime.bind(this),
                    updateVideoRequestTime: this.updateVideoRequestTime.bind(this),
                    updateScreenRequestTime: this.updateScreenRequestTime.bind(this),
                    updateChatRequestTime: this.updateChatRequestTime.bind(this),
                    updateRequestIntervalSeconds: this.updateRequestIntervalSeconds.value,
                });
            });
            this.socket.value.on('pollUpdated', async (data) => {
                try {
                    await this.pollUpdated.pollUpdated({
                        data,
                        polls: this.polls.value,
                        poll: this.poll.value ? this.poll.value : {},
                        member: this.member.value,
                        islevel: this.islevel.value,
                        showAlert: this.showAlert.bind(this),
                        updatePolls: this.updatePolls.bind(this),
                        updatePoll: this.updatePoll.bind(this),
                        updateIsPollModalVisible: this.updateIsPollModalVisible.bind(this),
                    });
                }
                catch {
                    /* handle error */
                }
            });
            this.socket.value.on('breakoutRoomUpdated', async (data) => {
                try {
                    await this.breakoutRoomUpdated.breakoutRoomUpdated({
                        data,
                        parameters: { ...this.getAllParams(), ...this.mediaSFUFunctions() },
                    });
                }
                catch {
                    /* handle error */
                }
            });
            await this.join_Room({
                socket: this.socket.value,
                roomName: this.roomName.value,
                islevel: this.islevel.value,
                member: this.member.value,
                sec: this.apiToken.value,
                apiUserName: this.apiUserName.value,
            });
            await this.receiveRoomMessages.receiveRoomMessages({
                socket: this.socket.value,
                roomName: this.roomName.value,
                updateMessages: this.updateMessages.bind(this),
            });
            this.prepopulateUserMedia.prepopulateUserMedia({
                name: this.hostLabel.value,
                parameters: { ...this.getAllParams(), ...this.mediaSFUFunctions() },
            });
            return this.socket.value;
        }
        else {
            return null;
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: MediasfuGeneric, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.Injector }, { token: i1.UpdateMiniCardsGrid }, { token: i2.MixStreams }, { token: i3.DispStreams }, { token: i4.StopShareScreen }, { token: i5.CheckScreenShare }, { token: i6.StartShareScreen }, { token: i7.RequestScreenShare }, { token: i8.ReorderStreams }, { token: i9.PrepopulateUserMedia }, { token: i10.GetVideos }, { token: i11.RePort }, { token: i12.Trigger }, { token: i13.ConsumerResume }, { token: i14.ConnectSendTransport }, { token: i15.ConnectSendTransportAudio }, { token: i16.ConnectSendTransportVideo }, { token: i17.ConnectSendTransportScreen }, { token: i18.ProcessConsumerTransports }, { token: i19.ResumePauseStreams }, { token: i20.Readjust }, { token: i21.CheckGrid }, { token: i22.GetEstimate }, { token: i23.CalculateRowsAndColumns }, { token: i24.AddVideosGrid }, { token: i25.OnScreenChanges }, { token: i26.ChangeVids }, { token: i27.CompareActiveNames }, { token: i28.CompareScreenStates }, { token: i29.CreateSendTransport }, { token: i30.ResumeSendTransportAudio }, { token: i31.ReceiveAllPipedTransports }, { token: i32.DisconnectSendTransportVideo }, { token: i33.DisconnectSendTransportAudio }, { token: i34.DisconnectSendTransportScreen }, { token: i35.GetPipedProducersAlt }, { token: i36.SignalNewConsumerTransport }, { token: i37.ConnectRecvTransport }, { token: i38.ReUpdateInter }, { token: i39.UpdateParticipantAudioDecibels }, { token: i40.CloseAndResize }, { token: i41.AutoAdjust }, { token: i42.SwitchUserVideoAlt }, { token: i43.SwitchUserVideo }, { token: i44.SwitchUserAudio }, { token: i45.GetDomains }, { token: i46.FormatNumber }, { token: i47.ConnectIps }, { token: i48.CreateDeviceClient }, { token: i49.HandleCreatePoll }, { token: i50.HandleEndPoll }, { token: i51.HandleVotePoll }, { token: i52.CaptureCanvasStream }, { token: i53.ResumePauseAudioStreams }, { token: i54.ProcessConsumerTransportsAudio }, { token: i55.LaunchMenuModal }, { token: i56.LaunchRecording }, { token: i57.StartRecording }, { token: i58.ConfirmRecording }, { token: i59.LaunchWaiting }, { token: i60.launchCoHost }, { token: i61.LaunchMediaSettings }, { token: i62.LaunchDisplaySettings }, { token: i63.LaunchSettings }, { token: i64.LaunchRequests }, { token: i65.LaunchParticipants }, { token: i66.LaunchMessages }, { token: i67.LaunchConfirmExit }, { token: i68.LaunchPoll }, { token: i69.LaunchBreakoutRooms }, { token: i70.LaunchConfigureWhiteboard }, { token: i71.StartMeetingProgressTimer }, { token: i72.UpdateRecording }, { token: i73.StopRecording }, { token: i74.UserWaiting }, { token: i75.PersonJoined }, { token: i76.AllWaitingRoomMembers }, { token: i77.RoomRecordParams }, { token: i78.BanParticipant }, { token: i79.UpdatedCoHost }, { token: i80.ParticipantRequested }, { token: i81.ScreenProducerId }, { token: i82.UpdateMediaSettings }, { token: i83.ProducerMediaPaused }, { token: i84.ProducerMediaResumed }, { token: i85.ProducerMediaClosed }, { token: i86.ControlMediaHost }, { token: i87.MeetingEnded }, { token: i88.DisconnectUserSelf }, { token: i89.ReceiveMessage }, { token: i90.MeetingTimeRemaining }, { token: i91.MeetingStillThere }, { token: i92.StartRecords }, { token: i93.ReInitiateRecording }, { token: i94.RecordingNotice }, { token: i95.TimeLeftRecording }, { token: i96.StoppedRecording }, { token: i97.HostRequestResponse }, { token: i98.AllMembers }, { token: i99.AllMembersRest }, { token: i100.Disconnect }, { token: i101.PollUpdated }, { token: i102.BreakoutRoomUpdated }, { token: i103.SocketManager }, { token: i104.JoinRoomClient }, { token: i105.UpdateRoomParametersClient }, { token: i106.ClickVideo }, { token: i107.ClickAudio }, { token: i108.ClickScreenShare }, { token: i109.SwitchVideoAlt }, { token: i110.StreamSuccessVideo }, { token: i111.StreamSuccessAudio }, { token: i112.StreamSuccessScreen }, { token: i113.StreamSuccessAudioSwitch }, { token: i114.CheckPermission }, { token: i115.UpdateConsumingDomains }, { token: i116.ReceiveRoomMessages }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.8", type: MediasfuGeneric, isStandalone: true, selector: "app-mediasfu-generic", inputs: { PrejoinPage: "PrejoinPage", credentials: "credentials", useLocalUIMode: "useLocalUIMode", seedData: "seedData", useSeed: "useSeed", imgSrc: "imgSrc" }, host: { listeners: { "window:resize": "handleResize()", "window:orientationchange": "handleResize()" } }, providers: [CookieService], ngImport: i0, template: `
    <div
      class="MediaSFU"
      [ngStyle]="{
        height: '100vh',
        width: '100vw',
        maxWidth: '100vw',
        maxHeight: '100vh',
        overflow: 'hidden'
      }"
    >
      <ng-container *ngIf="!validated.value; else mainContent">
        <ng-container
          *ngComponentOutlet="
            PrejoinPageComponent.component;
            injector: PrejoinPageComponent.injector
          "
        >
        </ng-container>
      </ng-container>

      <ng-template #mainContent>
        <app-main-container-component>
          <app-main-aspect-component
            [backgroundColor]="'rgba(217, 227, 234, 0.99)'"
            [defaultFraction]="1 - controlHeight.value"
            [showControls]="eventType.value === 'webinar' || eventType.value === 'conference'"
            [updateIsWideScreen]="updateIsWideScreen"
            [updateIsMediumScreen]="updateIsMediumScreen"
            [updateIsSmallScreen]="updateIsSmallScreen"
          >
            <app-main-screen-component
              [doStack]="true"
              [mainSize]="mainHeightWidth.value"
              [defaultFraction]="1 - controlHeight.value"
              [showControls]="eventType.value === 'webinar' || eventType.value === 'conference'"
              [updateComponentSizes]="updateComponentSizes"
            >
              <app-main-grid-component
                [height]="componentSizes.value.mainHeight"
                [width]="componentSizes.value.mainWidth"
                [backgroundColor]="'rgba(217, 227, 234, 0.99)'"
                [mainSize]="mainHeightWidth.value"
                [showAspect]="mainHeightWidth.value > 0"
                [timeBackgroundColor]="recordState.value"
                [meetingProgressTime]="meetingProgressTime.value"
              >
                <app-flexible-video
                  [customWidth]="componentSizes.value.mainWidth"
                  [customHeight]="componentSizes.value.mainHeight"
                  [rows]="1"
                  [columns]="1"
                  [componentsToRender]="mainGridStream.value"
                  [showAspect]="
                    mainGridStream.value.length > 0 &&
                    !(whiteboardStarted.value && !whiteboardEnded.value)
                  "
                  [localStreamScreen]="localStreamScreen.value!"
                  [annotateScreenStream]="annotateScreenStream.value"
                  [Screenboard]="shared.value ? ScreenboardWidget : undefined"
                >
                </app-flexible-video>
                <app-whiteboard
                  [customWidth]="componentSizes.value.mainWidth"
                  [customHeight]="componentSizes.value.mainHeight"
                  [parameters]="mediaSFUParameters"
                  [showAspect]="whiteboardStarted.value && !whiteboardEnded.value"
                ></app-whiteboard>
                <app-control-buttons-component-touch
                  [buttons]="controlBroadcastButtons"
                  [position]="'right'"
                  [location]="'bottom'"
                  [direction]="'vertical'"
                  [showAspect]="eventType.value === 'broadcast'"
                ></app-control-buttons-component-touch>
                <app-control-buttons-component-touch
                  [buttons]="recordButton"
                  [direction]="'horizontal'"
                  [showAspect]="
                    eventType.value === 'broadcast' &&
                    !showRecordButtons.value &&
                    islevel.value === '2'
                  "
                  [location]="'bottom'"
                  [position]="'middle'"
                ></app-control-buttons-component-touch>
                <app-control-buttons-component-touch
                  [buttons]="recordButtons"
                  [direction]="'horizontal'"
                  [showAspect]="
                    eventType.value === 'broadcast' &&
                    showRecordButtons.value &&
                    islevel.value === '2'
                  "
                  [location]="'bottom'"
                  [position]="'middle'"
                ></app-control-buttons-component-touch>
              </app-main-grid-component>

              <app-other-grid-component
                [height]="componentSizes.value.otherHeight"
                [width]="componentSizes.value.otherWidth"
                [backgroundColor]="'rgba(217, 227, 234, 0.99)'"
                [showAspect]="mainHeightWidth.value !== 100"
                [timeBackgroundColor]="recordState.value"
                [showTimer]="mainHeightWidth.value === 0"
                [meetingProgressTime]="meetingProgressTime.value"
              >
                <div
                  *ngIf="doPaginate.value"
                  [ngStyle]="{
                    width:
                      paginationDirection.value == 'horizontal'
                        ? componentSizes.value.otherWidth
                        : paginationHeightWidth.value,
                    height:
                      paginationDirection.value == 'horizontal'
                        ? paginationHeightWidth.value
                        : componentSizes.value.otherHeight,
                    display: doPaginate.value ? 'flex' : 'none',
                    'flex-direction': paginationDirection.value == 'horizontal' ? 'row' : 'column',
                    'justify-content': 'center',
                    'align-items': 'center',
                    padding: '0',
                    margin: '0'
                  }"
                >
                  <app-pagination
                    [totalPages]="numberPages.value"
                    [currentUserPage]="currentUserPage.value"
                    [showAspect]="doPaginate.value"
                    [paginationHeight]="paginationHeightWidth.value"
                    [direction]="paginationDirection.value"
                    [parameters]="mediaSFUParameters"
                  ></app-pagination>
                </div>

                <app-audio-grid [componentsToRender]="audioOnlyStreams.value"></app-audio-grid>
                <app-control-buttons-component-touch
                  [buttons]="controlChatButtons"
                  [position]="'right'"
                  [location]="'bottom'"
                  [direction]="'vertical'"
                  [showAspect]="eventType.value === 'chat'"
                ></app-control-buttons-component-touch>
                <app-flexible-grid
                  [customWidth]="gridSizes.value.gridWidth!"
                  [customHeight]="gridSizes.value.gridHeight!"
                  [rows]="gridRows.value"
                  [columns]="gridCols.value"
                  [componentsToRender]="otherGridStreams.value[0]"
                  [backgroundColor]="'rgba(217, 227, 234, 0.99)'"
                ></app-flexible-grid>
                <app-flexible-grid
                  [customWidth]="gridSizes.value.altGridWidth!"
                  [customHeight]="gridSizes.value.altGridHeight!"
                  [rows]="altGridRows.value"
                  [columns]="altGridCols.value"
                  [componentsToRender]="otherGridStreams.value[1]"
                  [backgroundColor]="'rgba(217, 227, 234, 0.99)'"
                ></app-flexible-grid>
              </app-other-grid-component>
            </app-main-screen-component>
          </app-main-aspect-component>

          <app-sub-aspect-component
            [backgroundColor]="'rgba(217, 227, 234, 0.99)'"
            [showControls]="eventType.value === 'webinar' || eventType.value === 'conference'"
            [defaultFractionSub]="controlHeight.value"
          >
            <app-control-buttons-component
              [buttons]="controlButtons"
              [buttonColor]="'black'"
              [buttonBackgroundColor]="{
                default: 'transparent',
                pressed: 'transparent'
              }"
              [alignment]="'space-between'"
              [vertical]="false"
              [buttonsContainerStyle]="{
                marginTop: '0',
                marginBottom: '0',
                backgroundColor: 'transparent'
              }"
            ></app-control-buttons-component>
          </app-sub-aspect-component>
        </app-main-container-component>
      </ng-template>

      <app-menu-modal
        [backgroundColor]="'rgba(181, 233, 229, 0.97)'"
        [isVisible]="isMenuModalVisible.value"
        [onClose]="onCloseMenuModal"
        [customButtons]="customMenuButtons"
        [roomName]="roomName.value"
        [adminPasscode]="adminPasscode.value"
        [islevel]="islevel.value"
      ></app-menu-modal>

      <app-event-settings-modal
        [backgroundColor]="'rgba(217, 227, 234, 0.99)'"
        [isEventSettingsModalVisible]="isSettingsModalVisible.value"
        [onEventSettingsClose]="onEventSettingsClose"
        [audioSetting]="audioSetting.value"
        [videoSetting]="videoSetting.value"
        [screenshareSetting]="screenshareSetting.value"
        [chatSetting]="chatSetting.value"
        [updateAudioSetting]="updateAudioSetting"
        [updateVideoSetting]="updateVideoSetting"
        [updateScreenshareSetting]="updateScreenshareSetting"
        [updateChatSetting]="updateChatSetting"
        [updateIsSettingsModalVisible]="updateIsSettingsModalVisible"
        [roomName]="roomName.value"
        [socket]="socket.value"
        [showAlert]="showAlert"
      ></app-event-settings-modal>

      <app-requests-modal
        [backgroundColor]="'rgba(217, 227, 234, 0.99)'"
        [isRequestsModalVisible]="isRequestsModalVisible.value"
        [onRequestClose]="onRequestClose"
        [requestCounter]="requestCounter.value"
        [onRequestFilterChange]="onRequestFilterChange"
        [updateRequestList]="updateRequestList"
        [requestList]="filteredRequestList.value"
        [roomName]="roomName.value"
        [socket]="socket.value"
        [parameters]="mediaSFUParameters"
      ></app-requests-modal>

      <app-waiting-room-modal
        [backgroundColor]="'rgba(217, 227, 234, 0.99)'"
        [isWaitingModalVisible]="isWaitingModalVisible.value"
        [onWaitingRoomClose]="onWaitingRoomClose"
        [waitingRoomCounter]="waitingRoomCounter.value"
        [onWaitingRoomFilterChange]="onWaitingRoomFilterChange"
        [waitingRoomList]="filteredWaitingRoomList.value"
        [updateWaitingList]="updateWaitingRoomList"
        [roomName]="roomName.value"
        [socket]="socket.value"
        [parameters]="{
                      filteredWaitingRoomList: waitingRoomList.value,
                      getUpdatedAllParams: getUpdatedAllParams,
                    }"
      ></app-waiting-room-modal>

      <app-co-host-modal
        [backgroundColor]="'rgba(217, 227, 234, 0.99)'"
        [isCoHostModalVisible]="isCoHostModalVisible.value"
        [onCoHostClose]="onCoHostClose"
        [coHostResponsibility]="coHostResponsibility.value"
        [participants]="participants.value"
        [currentCohost]="coHost.value"
        [roomName]="roomName.value"
        [showAlert]="showAlert"
        [updateCoHostResponsibility]="updateCoHostResponsibility"
        [updateCoHost]="updateCoHost"
        [updateIsCoHostModalVisible]="updateIsCoHostModalVisible"
        [socket]="socket.value"
      ></app-co-host-modal>

      <app-media-settings-modal
        [backgroundColor]="'rgba(181, 233, 229, 0.97)'"
        [isMediaSettingsModalVisible]="isMediaSettingsModalVisible.value"
        [onMediaSettingsClose]="onMediaSettingsClose"
        [parameters]="mediaSFUParameters"
      ></app-media-settings-modal>

      <app-participants-modal
        [backgroundColor]="'rgba(217, 227, 234, 0.99)'"
        [isParticipantsModalVisible]="isParticipantsModalVisible.value"
        [onParticipantsClose]="onParticipantsClose"
        [participantsCounter]="participantsCounter.value"
        [onParticipantsFilterChange]="onParticipantsFilterChange"
        [parameters]="{
              updateParticipants: updateParticipants,
              filteredParticipants: filteredParticipants.value,
              updateIsParticipantsModalVisible: updateIsParticipantsModalVisible,
              updateDirectMessageDetails: updateDirectMessageDetails,
              updateStartDirectMessage: updateStartDirectMessage,
              updateIsMessagesModalVisible: updateIsMessagesModalVisible,
              showAlert: showAlert,
              participants: filteredParticipants.value,
              roomName: roomName.value,
              islevel: islevel.value,
              member: member.value,
              coHostResponsibility: coHostResponsibility.value,
              coHost: coHost.value,
              eventType: eventType.value,
              startDirectMessage: startDirectMessage.value,
              directMessageDetails: directMessageDetails.value,
              socket: socket.value,
              getUpdatedAllParams: getUpdatedAllParams,
            }"
      ></app-participants-modal>

      <app-display-settings-modal
        [backgroundColor]="'rgba(217, 227, 234, 0.99)'"
        [isDisplaySettingsModalVisible]="isDisplaySettingsModalVisible.value"
        [onDisplaySettingsClose]="onDisplaySettingsClose"
        [parameters]="mediaSFUParameters"
      ></app-display-settings-modal>

      <app-recording-modal
        [backgroundColor]="'rgba(217, 227, 234, 0.99)'"
        [isRecordingModalVisible]="isRecordingModalVisible.value"
        [onClose]="onRecordingClose"
        [startRecording]="startRecording.startRecording"
        [confirmRecording]="confirmRecording.confirmRecording"
        [parameters]="mediaSFUParameters"
      ></app-recording-modal>

      <app-messages-modal
        [backgroundColor]="
          eventType.value === 'webinar' || eventType.value === 'conference'
            ? '#f5f5f5'
            : 'rgba(255, 255, 255, 0.25)'
        "
        [isMessagesModalVisible]="isMessagesModalVisible.value"
        [onMessagesClose]="onMessagesClose"
        [messages]="messages.value"
        [eventType]="eventType.value"
        [member]="member.value"
        [islevel]="islevel.value"
        [coHostResponsibility]="coHostResponsibility.value"
        [coHost]="coHost.value"
        [startDirectMessage]="startDirectMessage.value"
        [directMessageDetails]="directMessageDetails.value"
        [updateStartDirectMessage]="updateStartDirectMessage"
        [updateDirectMessageDetails]="updateDirectMessageDetails"
        [showAlert]="showAlert"
        [roomName]="roomName.value"
        [socket]="socket.value"
        [chatSetting]="chatSetting.value"
      ></app-messages-modal>

      <app-confirm-exit-modal
        [backgroundColor]="'rgba(181, 233, 229, 0.97)'"
        [isConfirmExitModalVisible]="isConfirmExitModalVisible.value"
        [onConfirmExitClose]="onConfirmExitClose"
        [position]="'topRight'"
        [member]="member.value"
        [roomName]="roomName.value"
        [socket]="socket.value"
        [islevel]="islevel.value"
      ></app-confirm-exit-modal>

      <app-confirm-here-modal
        [backgroundColor]="'rgba(181, 233, 229, 0.97)'"
        [isConfirmHereModalVisible]="isConfirmHereModalVisible.value"
        [onConfirmHereClose]="onConfirmHereClose"
        [member]="member.value"
        [roomName]="roomName.value"
        [socket]="socket.value"
      ></app-confirm-here-modal>

      <app-share-event-modal
        [isShareEventModalVisible]="isShareEventModalVisible.value"
        [onShareEventClose]="onShareEventClose"
        [roomName]="roomName.value"
        [islevel]="islevel.value"
        [adminPasscode]="adminPasscode.value"
        [eventType]="eventType.value"
      ></app-share-event-modal>

      <app-poll-modal
        [isPollModalVisible]="isPollModalVisible.value"
        [onClose]="onPollClose"
        [member]="member.value"
        [islevel]="islevel.value"
        [polls]="polls.value"
        [poll]="poll.value"
        [socket]="socket.value"
        [roomName]="roomName.value"
        [showAlert]="showAlert"
        [updateIsPollModalVisible]="updateIsPollModalVisible"
        [handleCreatePoll]="handleCreatePoll.handleCreatePoll"
        [handleEndPoll]="handleEndPoll.handleEndPoll"
        [handleVotePoll]="handleVotePoll.handleVotePoll"
      ></app-poll-modal>

      <app-background-modal
        [backgroundColor]="'rgba(217, 227, 234, 0.99)'"
        [isVisible]="isBackgroundModalVisible.value"
        [onClose]="onBackgroundClose"
        [parameters]="mediaSFUParameters"
      ></app-background-modal>

      <app-breakout-rooms-modal
        [backgroundColor]="'rgba(217, 227, 234, 0.99)'"
        [isVisible]="isBreakoutRoomsModalVisible.value"
        [onBreakoutRoomsClose]="onBreakoutRoomsClose"
        [parameters]="mediaSFUParameters"
      ></app-breakout-rooms-modal>

      <app-configure-whiteboard-modal
        [backgroundColor]="'rgba(217, 227, 234, 0.99)'"
        [isVisible]="isConfigureWhiteboardModalVisible.value"
        [onConfigureWhiteboardClose]="onConfigureWhiteboardClose"
        [parameters]="mediaSFUParameters"
      ></app-configure-whiteboard-modal>

      <app-screenboard-modal
        [backgroundColor]="'rgba(217, 227, 234, 0.99)'"
        [isVisible]="isScreenboardModalVisible.value"
        [onClose]="onScreenboardClose"
        [parameters]="mediaSFUParameters"
      ></app-screenboard-modal>

      <app-alert-component
        [visible]="alertVisible.value"
        [message]="alertMessage.value"
        [type]="alertType.value"
        [duration]="alertDuration.value"
        [onHide]="onAlertHide"
        textColor="#ffffff"
      ></app-alert-component>

      <app-loading-modal
        [isVisible]="isLoadingModalVisible.value"
        [backgroundColor]="'rgba(217, 227, 234, 0.99)'"
        displayColor="black"
      ></app-loading-modal>
    </div>
  `, isInline: true, styles: [""], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i117.NgComponentOutlet, selector: "[ngComponentOutlet]", inputs: ["ngComponentOutlet", "ngComponentOutletInputs", "ngComponentOutletInjector", "ngComponentOutletContent", "ngComponentOutletNgModule", "ngComponentOutletNgModuleFactory"] }, { kind: "directive", type: i117.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i117.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: BreakoutRoomsModal, selector: "app-breakout-rooms-modal", inputs: ["isVisible", "parameters", "position", "backgroundColor", "onBreakoutRoomsClose"] }, { kind: "component", type: BackgroundModal, selector: "app-background-modal", inputs: ["isVisible", "parameters", "position", "backgroundColor", "onClose"] }, { kind: "component", type: CoHostModal, selector: "app-co-host-modal", inputs: ["isCoHostModalVisible", "currentCohost", "participants", "coHostResponsibility", "position", "backgroundColor", "roomName", "showAlert", "updateCoHostResponsibility", "updateCoHost", "updateIsCoHostModalVisible", "socket", "onCoHostClose", "onModifyCoHost"] }, { kind: "component", type: AlertComponent, selector: "app-alert-component", inputs: ["visible", "message", "type", "duration", "textColor", "onHide"] }, { kind: "component", type: AudioGrid, selector: "app-audio-grid", inputs: ["componentsToRender"] }, { kind: "component", type: ControlButtonsComponentTouch, selector: "app-control-buttons-component-touch", inputs: ["buttons", "position", "location", "direction", "buttonsContainerStyle", "showAspect"] }, { kind: "component", type: ControlButtonsComponent, selector: "app-control-buttons-component", inputs: ["buttons", "buttonColor", "buttonBackgroundColor", "alignment", "vertical", "buttonsContainerStyle"] }, { kind: "component", type: FlexibleGrid, selector: "app-flexible-grid", inputs: ["customWidth", "customHeight", "rows", "columns", "componentsToRender", "backgroundColor"] }, { kind: "component", type: FlexibleVideo, selector: "app-flexible-video", inputs: ["customWidth", "customHeight", "rows", "columns", "componentsToRender", "showAspect", "backgroundColor", "Screenboard", "annotateScreenStream", "localStreamScreen"] }, { kind: "component", type: LoadingModal, selector: "app-loading-modal", inputs: ["isVisible", "backgroundColor", "displayColor"] }, { kind: "component", type: Pagination, selector: "app-pagination", inputs: ["totalPages", "currentUserPage", "handlePageChange", "position", "location", "direction", "buttonsContainerStyle", "activePageStyle", "inactivePageStyle", "backgroundColor", "paginationHeight", "showAspect", "parameters"] }, { kind: "component", type: SubAspectComponent, selector: "app-sub-aspect-component", inputs: ["backgroundColor", "showControls", "containerWidthFraction", "containerHeightFraction", "defaultFractionSub"] }, { kind: "component", type: DisplaySettingsModal, selector: "app-display-settings-modal", inputs: ["isDisplaySettingsModalVisible", "onDisplaySettingsClose", "onModifyDisplaySettings", "parameters", "position", "backgroundColor"] }, { kind: "component", type: EventSettingsModal, selector: "app-event-settings-modal", inputs: ["isEventSettingsModalVisible", "onEventSettingsClose", "onModifyEventSettings", "position", "backgroundColor", "audioSetting", "videoSetting", "screenshareSetting", "chatSetting", "updateAudioSetting", "updateVideoSetting", "updateScreenshareSetting", "updateChatSetting", "updateIsSettingsModalVisible", "roomName", "socket", "showAlert"] }, { kind: "component", type: ConfirmExitModal, selector: "app-confirm-exit-modal", inputs: ["isConfirmExitModalVisible", "onConfirmExitClose", "position", "backgroundColor", "exitEventOnConfirm", "member", "ban", "roomName", "socket", "islevel"] }, { kind: "component", type: MediaSettingsModal, selector: "app-media-settings-modal", inputs: ["isMediaSettingsModalVisible", "onMediaSettingsClose", "switchCameraOnPress", "switchVideoOnPress", "switchAudioOnPress", "parameters", "position", "backgroundColor"] }, { kind: "component", type: MenuModal, selector: "app-menu-modal", inputs: ["backgroundColor", "isVisible", "customButtons", "shareButtons", "position", "roomName", "adminPasscode", "islevel", "eventType", "onClose"] }, { kind: "component", type: MessagesModal, selector: "app-messages-modal", inputs: ["isMessagesModalVisible", "onMessagesClose", "onSendMessagePress", "messages", "position", "backgroundColor", "activeTabBackgroundColor", "eventType", "member", "islevel", "coHostResponsibility", "coHost", "startDirectMessage", "directMessageDetails", "updateStartDirectMessage", "updateDirectMessageDetails", "showAlert", "roomName", "socket", "chatSetting"] }, { kind: "component", type: ConfirmHereModal, selector: "app-confirm-here-modal", inputs: ["isConfirmHereModalVisible", "position", "backgroundColor", "displayColor", "onConfirmHereClose", "countdownDuration", "socket", "roomName", "member"] }, { kind: "component", type: ShareEventModal, selector: "app-share-event-modal", inputs: ["backgroundColor", "isShareEventModalVisible", "onShareEventClose", "roomName", "adminPasscode", "islevel", "position", "shareButtons", "eventType"] }, { kind: "component", type: ParticipantsModal, selector: "app-participants-modal", inputs: ["isParticipantsModalVisible", "onParticipantsClose", "onParticipantsFilterChange", "participantsCounter", "onMuteParticipants", "onMessageParticipants", "onRemoveParticipants", "parameters", "position", "backgroundColor"] }, { kind: "component", type: PollModal, selector: "app-poll-modal", inputs: ["isPollModalVisible", "onClose", "position", "backgroundColor", "member", "islevel", "polls", "poll", "socket", "roomName", "showAlert", "updateIsPollModalVisible", "handleCreatePoll", "handleEndPoll", "handleVotePoll"] }, { kind: "component", type: RecordingModal, selector: "app-recording-modal", inputs: ["isRecordingModalVisible", "onClose", "backgroundColor", "position", "confirmRecording", "startRecording", "parameters"] }, { kind: "component", type: RequestsModal, selector: "app-requests-modal", inputs: ["isRequestsModalVisible", "requestCounter", "requestList", "roomName", "socket", "backgroundColor", "position", "parameters", "onRequestClose", "onRequestFilterChange", "onRequestItemPress", "updateRequestList"] }, { kind: "component", type: MainAspectComponent, selector: "app-main-aspect-component", inputs: ["backgroundColor", "showControls", "containerWidthFraction", "containerHeightFraction", "defaultFraction", "updateIsWideScreen", "updateIsMediumScreen", "updateIsSmallScreen"] }, { kind: "component", type: MainContainerComponent, selector: "app-main-container-component", inputs: ["backgroundColor", "containerWidthFraction", "containerHeightFraction", "marginLeft", "marginRight", "marginTop", "marginBottom", "padding"] }, { kind: "component", type: MainGridComponent, selector: "app-main-grid-component", inputs: ["backgroundColor", "mainSize", "height", "width", "showAspect", "timeBackgroundColor", "showTimer", "meetingProgressTime"] }, { kind: "component", type: MainScreenComponent, selector: "app-main-screen-component", inputs: ["mainSize", "doStack", "containerWidthFraction", "containerHeightFraction", "defaultFraction", "showControls", "updateComponentSizes"] }, { kind: "component", type: OtherGridComponent, selector: "app-other-grid-component", inputs: ["backgroundColor", "width", "height", "showAspect", "timeBackgroundColor", "showTimer", "meetingProgressTime"] }, { kind: "component", type: ScreenboardModal, selector: "app-screenboard-modal", inputs: ["parameters", "isVisible", "onClose", "position", "backgroundColor"] }, { kind: "component", type: Whiteboard, selector: "app-whiteboard", inputs: ["customWidth", "customHeight", "parameters", "showAspect"] }, { kind: "component", type: ConfigureWhiteboardModal, selector: "app-configure-whiteboard-modal", inputs: ["isVisible", "parameters", "backgroundColor", "position", "onConfigureWhiteboardClose"] }, { kind: "component", type: WaitingRoomModal, selector: "app-waiting-room-modal", inputs: ["isWaitingModalVisible", "waitingRoomCounter", "waitingRoomList", "roomName", "socket", "position", "backgroundColor", "parameters", "onWaitingRoomClose", "onWaitingRoomFilterChange", "updateWaitingList", "onWaitingRoomItemPress"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: MediasfuGeneric, decorators: [{
            type: Component,
            args: [{ selector: 'app-mediasfu-generic', standalone: true, imports: [
                        RouterOutlet,
                        CommonModule,
                        BreakoutRoomsModal,
                        BackgroundModal,
                        CoHostModal,
                        AlertComponent,
                        AudioGrid,
                        ControlButtonsAltComponent,
                        ControlButtonsComponentTouch,
                        ControlButtonsComponent,
                        FlexibleGrid,
                        FlexibleVideo,
                        LoadingModal,
                        Pagination,
                        SubAspectComponent,
                        DisplaySettingsModal,
                        EventSettingsModal,
                        ConfirmExitModal,
                        MediaSettingsModal,
                        MenuModal,
                        MessagesModal,
                        ConfirmHereModal,
                        ShareEventModal,
                        WelcomePage,
                        ParticipantsModal,
                        PollModal,
                        RecordingModal,
                        RequestsModal,
                        MainAspectComponent,
                        MainContainerComponent,
                        MainGridComponent,
                        MainScreenComponent,
                        OtherGridComponent,
                        Screenboard,
                        ScreenboardModal,
                        Whiteboard,
                        ConfigureWhiteboardModal,
                        WaitingRoomModal,
                        MenuWidget,
                        MessageWidget,
                        MenuRecordWidget,
                        RecordTimerWidget,
                        MenuParticipantsWidget,
                        ScreenShareWidget,
                    ], template: `
    <div
      class="MediaSFU"
      [ngStyle]="{
        height: '100vh',
        width: '100vw',
        maxWidth: '100vw',
        maxHeight: '100vh',
        overflow: 'hidden'
      }"
    >
      <ng-container *ngIf="!validated.value; else mainContent">
        <ng-container
          *ngComponentOutlet="
            PrejoinPageComponent.component;
            injector: PrejoinPageComponent.injector
          "
        >
        </ng-container>
      </ng-container>

      <ng-template #mainContent>
        <app-main-container-component>
          <app-main-aspect-component
            [backgroundColor]="'rgba(217, 227, 234, 0.99)'"
            [defaultFraction]="1 - controlHeight.value"
            [showControls]="eventType.value === 'webinar' || eventType.value === 'conference'"
            [updateIsWideScreen]="updateIsWideScreen"
            [updateIsMediumScreen]="updateIsMediumScreen"
            [updateIsSmallScreen]="updateIsSmallScreen"
          >
            <app-main-screen-component
              [doStack]="true"
              [mainSize]="mainHeightWidth.value"
              [defaultFraction]="1 - controlHeight.value"
              [showControls]="eventType.value === 'webinar' || eventType.value === 'conference'"
              [updateComponentSizes]="updateComponentSizes"
            >
              <app-main-grid-component
                [height]="componentSizes.value.mainHeight"
                [width]="componentSizes.value.mainWidth"
                [backgroundColor]="'rgba(217, 227, 234, 0.99)'"
                [mainSize]="mainHeightWidth.value"
                [showAspect]="mainHeightWidth.value > 0"
                [timeBackgroundColor]="recordState.value"
                [meetingProgressTime]="meetingProgressTime.value"
              >
                <app-flexible-video
                  [customWidth]="componentSizes.value.mainWidth"
                  [customHeight]="componentSizes.value.mainHeight"
                  [rows]="1"
                  [columns]="1"
                  [componentsToRender]="mainGridStream.value"
                  [showAspect]="
                    mainGridStream.value.length > 0 &&
                    !(whiteboardStarted.value && !whiteboardEnded.value)
                  "
                  [localStreamScreen]="localStreamScreen.value!"
                  [annotateScreenStream]="annotateScreenStream.value"
                  [Screenboard]="shared.value ? ScreenboardWidget : undefined"
                >
                </app-flexible-video>
                <app-whiteboard
                  [customWidth]="componentSizes.value.mainWidth"
                  [customHeight]="componentSizes.value.mainHeight"
                  [parameters]="mediaSFUParameters"
                  [showAspect]="whiteboardStarted.value && !whiteboardEnded.value"
                ></app-whiteboard>
                <app-control-buttons-component-touch
                  [buttons]="controlBroadcastButtons"
                  [position]="'right'"
                  [location]="'bottom'"
                  [direction]="'vertical'"
                  [showAspect]="eventType.value === 'broadcast'"
                ></app-control-buttons-component-touch>
                <app-control-buttons-component-touch
                  [buttons]="recordButton"
                  [direction]="'horizontal'"
                  [showAspect]="
                    eventType.value === 'broadcast' &&
                    !showRecordButtons.value &&
                    islevel.value === '2'
                  "
                  [location]="'bottom'"
                  [position]="'middle'"
                ></app-control-buttons-component-touch>
                <app-control-buttons-component-touch
                  [buttons]="recordButtons"
                  [direction]="'horizontal'"
                  [showAspect]="
                    eventType.value === 'broadcast' &&
                    showRecordButtons.value &&
                    islevel.value === '2'
                  "
                  [location]="'bottom'"
                  [position]="'middle'"
                ></app-control-buttons-component-touch>
              </app-main-grid-component>

              <app-other-grid-component
                [height]="componentSizes.value.otherHeight"
                [width]="componentSizes.value.otherWidth"
                [backgroundColor]="'rgba(217, 227, 234, 0.99)'"
                [showAspect]="mainHeightWidth.value !== 100"
                [timeBackgroundColor]="recordState.value"
                [showTimer]="mainHeightWidth.value === 0"
                [meetingProgressTime]="meetingProgressTime.value"
              >
                <div
                  *ngIf="doPaginate.value"
                  [ngStyle]="{
                    width:
                      paginationDirection.value == 'horizontal'
                        ? componentSizes.value.otherWidth
                        : paginationHeightWidth.value,
                    height:
                      paginationDirection.value == 'horizontal'
                        ? paginationHeightWidth.value
                        : componentSizes.value.otherHeight,
                    display: doPaginate.value ? 'flex' : 'none',
                    'flex-direction': paginationDirection.value == 'horizontal' ? 'row' : 'column',
                    'justify-content': 'center',
                    'align-items': 'center',
                    padding: '0',
                    margin: '0'
                  }"
                >
                  <app-pagination
                    [totalPages]="numberPages.value"
                    [currentUserPage]="currentUserPage.value"
                    [showAspect]="doPaginate.value"
                    [paginationHeight]="paginationHeightWidth.value"
                    [direction]="paginationDirection.value"
                    [parameters]="mediaSFUParameters"
                  ></app-pagination>
                </div>

                <app-audio-grid [componentsToRender]="audioOnlyStreams.value"></app-audio-grid>
                <app-control-buttons-component-touch
                  [buttons]="controlChatButtons"
                  [position]="'right'"
                  [location]="'bottom'"
                  [direction]="'vertical'"
                  [showAspect]="eventType.value === 'chat'"
                ></app-control-buttons-component-touch>
                <app-flexible-grid
                  [customWidth]="gridSizes.value.gridWidth!"
                  [customHeight]="gridSizes.value.gridHeight!"
                  [rows]="gridRows.value"
                  [columns]="gridCols.value"
                  [componentsToRender]="otherGridStreams.value[0]"
                  [backgroundColor]="'rgba(217, 227, 234, 0.99)'"
                ></app-flexible-grid>
                <app-flexible-grid
                  [customWidth]="gridSizes.value.altGridWidth!"
                  [customHeight]="gridSizes.value.altGridHeight!"
                  [rows]="altGridRows.value"
                  [columns]="altGridCols.value"
                  [componentsToRender]="otherGridStreams.value[1]"
                  [backgroundColor]="'rgba(217, 227, 234, 0.99)'"
                ></app-flexible-grid>
              </app-other-grid-component>
            </app-main-screen-component>
          </app-main-aspect-component>

          <app-sub-aspect-component
            [backgroundColor]="'rgba(217, 227, 234, 0.99)'"
            [showControls]="eventType.value === 'webinar' || eventType.value === 'conference'"
            [defaultFractionSub]="controlHeight.value"
          >
            <app-control-buttons-component
              [buttons]="controlButtons"
              [buttonColor]="'black'"
              [buttonBackgroundColor]="{
                default: 'transparent',
                pressed: 'transparent'
              }"
              [alignment]="'space-between'"
              [vertical]="false"
              [buttonsContainerStyle]="{
                marginTop: '0',
                marginBottom: '0',
                backgroundColor: 'transparent'
              }"
            ></app-control-buttons-component>
          </app-sub-aspect-component>
        </app-main-container-component>
      </ng-template>

      <app-menu-modal
        [backgroundColor]="'rgba(181, 233, 229, 0.97)'"
        [isVisible]="isMenuModalVisible.value"
        [onClose]="onCloseMenuModal"
        [customButtons]="customMenuButtons"
        [roomName]="roomName.value"
        [adminPasscode]="adminPasscode.value"
        [islevel]="islevel.value"
      ></app-menu-modal>

      <app-event-settings-modal
        [backgroundColor]="'rgba(217, 227, 234, 0.99)'"
        [isEventSettingsModalVisible]="isSettingsModalVisible.value"
        [onEventSettingsClose]="onEventSettingsClose"
        [audioSetting]="audioSetting.value"
        [videoSetting]="videoSetting.value"
        [screenshareSetting]="screenshareSetting.value"
        [chatSetting]="chatSetting.value"
        [updateAudioSetting]="updateAudioSetting"
        [updateVideoSetting]="updateVideoSetting"
        [updateScreenshareSetting]="updateScreenshareSetting"
        [updateChatSetting]="updateChatSetting"
        [updateIsSettingsModalVisible]="updateIsSettingsModalVisible"
        [roomName]="roomName.value"
        [socket]="socket.value"
        [showAlert]="showAlert"
      ></app-event-settings-modal>

      <app-requests-modal
        [backgroundColor]="'rgba(217, 227, 234, 0.99)'"
        [isRequestsModalVisible]="isRequestsModalVisible.value"
        [onRequestClose]="onRequestClose"
        [requestCounter]="requestCounter.value"
        [onRequestFilterChange]="onRequestFilterChange"
        [updateRequestList]="updateRequestList"
        [requestList]="filteredRequestList.value"
        [roomName]="roomName.value"
        [socket]="socket.value"
        [parameters]="mediaSFUParameters"
      ></app-requests-modal>

      <app-waiting-room-modal
        [backgroundColor]="'rgba(217, 227, 234, 0.99)'"
        [isWaitingModalVisible]="isWaitingModalVisible.value"
        [onWaitingRoomClose]="onWaitingRoomClose"
        [waitingRoomCounter]="waitingRoomCounter.value"
        [onWaitingRoomFilterChange]="onWaitingRoomFilterChange"
        [waitingRoomList]="filteredWaitingRoomList.value"
        [updateWaitingList]="updateWaitingRoomList"
        [roomName]="roomName.value"
        [socket]="socket.value"
        [parameters]="{
                      filteredWaitingRoomList: waitingRoomList.value,
                      getUpdatedAllParams: getUpdatedAllParams,
                    }"
      ></app-waiting-room-modal>

      <app-co-host-modal
        [backgroundColor]="'rgba(217, 227, 234, 0.99)'"
        [isCoHostModalVisible]="isCoHostModalVisible.value"
        [onCoHostClose]="onCoHostClose"
        [coHostResponsibility]="coHostResponsibility.value"
        [participants]="participants.value"
        [currentCohost]="coHost.value"
        [roomName]="roomName.value"
        [showAlert]="showAlert"
        [updateCoHostResponsibility]="updateCoHostResponsibility"
        [updateCoHost]="updateCoHost"
        [updateIsCoHostModalVisible]="updateIsCoHostModalVisible"
        [socket]="socket.value"
      ></app-co-host-modal>

      <app-media-settings-modal
        [backgroundColor]="'rgba(181, 233, 229, 0.97)'"
        [isMediaSettingsModalVisible]="isMediaSettingsModalVisible.value"
        [onMediaSettingsClose]="onMediaSettingsClose"
        [parameters]="mediaSFUParameters"
      ></app-media-settings-modal>

      <app-participants-modal
        [backgroundColor]="'rgba(217, 227, 234, 0.99)'"
        [isParticipantsModalVisible]="isParticipantsModalVisible.value"
        [onParticipantsClose]="onParticipantsClose"
        [participantsCounter]="participantsCounter.value"
        [onParticipantsFilterChange]="onParticipantsFilterChange"
        [parameters]="{
              updateParticipants: updateParticipants,
              filteredParticipants: filteredParticipants.value,
              updateIsParticipantsModalVisible: updateIsParticipantsModalVisible,
              updateDirectMessageDetails: updateDirectMessageDetails,
              updateStartDirectMessage: updateStartDirectMessage,
              updateIsMessagesModalVisible: updateIsMessagesModalVisible,
              showAlert: showAlert,
              participants: filteredParticipants.value,
              roomName: roomName.value,
              islevel: islevel.value,
              member: member.value,
              coHostResponsibility: coHostResponsibility.value,
              coHost: coHost.value,
              eventType: eventType.value,
              startDirectMessage: startDirectMessage.value,
              directMessageDetails: directMessageDetails.value,
              socket: socket.value,
              getUpdatedAllParams: getUpdatedAllParams,
            }"
      ></app-participants-modal>

      <app-display-settings-modal
        [backgroundColor]="'rgba(217, 227, 234, 0.99)'"
        [isDisplaySettingsModalVisible]="isDisplaySettingsModalVisible.value"
        [onDisplaySettingsClose]="onDisplaySettingsClose"
        [parameters]="mediaSFUParameters"
      ></app-display-settings-modal>

      <app-recording-modal
        [backgroundColor]="'rgba(217, 227, 234, 0.99)'"
        [isRecordingModalVisible]="isRecordingModalVisible.value"
        [onClose]="onRecordingClose"
        [startRecording]="startRecording.startRecording"
        [confirmRecording]="confirmRecording.confirmRecording"
        [parameters]="mediaSFUParameters"
      ></app-recording-modal>

      <app-messages-modal
        [backgroundColor]="
          eventType.value === 'webinar' || eventType.value === 'conference'
            ? '#f5f5f5'
            : 'rgba(255, 255, 255, 0.25)'
        "
        [isMessagesModalVisible]="isMessagesModalVisible.value"
        [onMessagesClose]="onMessagesClose"
        [messages]="messages.value"
        [eventType]="eventType.value"
        [member]="member.value"
        [islevel]="islevel.value"
        [coHostResponsibility]="coHostResponsibility.value"
        [coHost]="coHost.value"
        [startDirectMessage]="startDirectMessage.value"
        [directMessageDetails]="directMessageDetails.value"
        [updateStartDirectMessage]="updateStartDirectMessage"
        [updateDirectMessageDetails]="updateDirectMessageDetails"
        [showAlert]="showAlert"
        [roomName]="roomName.value"
        [socket]="socket.value"
        [chatSetting]="chatSetting.value"
      ></app-messages-modal>

      <app-confirm-exit-modal
        [backgroundColor]="'rgba(181, 233, 229, 0.97)'"
        [isConfirmExitModalVisible]="isConfirmExitModalVisible.value"
        [onConfirmExitClose]="onConfirmExitClose"
        [position]="'topRight'"
        [member]="member.value"
        [roomName]="roomName.value"
        [socket]="socket.value"
        [islevel]="islevel.value"
      ></app-confirm-exit-modal>

      <app-confirm-here-modal
        [backgroundColor]="'rgba(181, 233, 229, 0.97)'"
        [isConfirmHereModalVisible]="isConfirmHereModalVisible.value"
        [onConfirmHereClose]="onConfirmHereClose"
        [member]="member.value"
        [roomName]="roomName.value"
        [socket]="socket.value"
      ></app-confirm-here-modal>

      <app-share-event-modal
        [isShareEventModalVisible]="isShareEventModalVisible.value"
        [onShareEventClose]="onShareEventClose"
        [roomName]="roomName.value"
        [islevel]="islevel.value"
        [adminPasscode]="adminPasscode.value"
        [eventType]="eventType.value"
      ></app-share-event-modal>

      <app-poll-modal
        [isPollModalVisible]="isPollModalVisible.value"
        [onClose]="onPollClose"
        [member]="member.value"
        [islevel]="islevel.value"
        [polls]="polls.value"
        [poll]="poll.value"
        [socket]="socket.value"
        [roomName]="roomName.value"
        [showAlert]="showAlert"
        [updateIsPollModalVisible]="updateIsPollModalVisible"
        [handleCreatePoll]="handleCreatePoll.handleCreatePoll"
        [handleEndPoll]="handleEndPoll.handleEndPoll"
        [handleVotePoll]="handleVotePoll.handleVotePoll"
      ></app-poll-modal>

      <app-background-modal
        [backgroundColor]="'rgba(217, 227, 234, 0.99)'"
        [isVisible]="isBackgroundModalVisible.value"
        [onClose]="onBackgroundClose"
        [parameters]="mediaSFUParameters"
      ></app-background-modal>

      <app-breakout-rooms-modal
        [backgroundColor]="'rgba(217, 227, 234, 0.99)'"
        [isVisible]="isBreakoutRoomsModalVisible.value"
        [onBreakoutRoomsClose]="onBreakoutRoomsClose"
        [parameters]="mediaSFUParameters"
      ></app-breakout-rooms-modal>

      <app-configure-whiteboard-modal
        [backgroundColor]="'rgba(217, 227, 234, 0.99)'"
        [isVisible]="isConfigureWhiteboardModalVisible.value"
        [onConfigureWhiteboardClose]="onConfigureWhiteboardClose"
        [parameters]="mediaSFUParameters"
      ></app-configure-whiteboard-modal>

      <app-screenboard-modal
        [backgroundColor]="'rgba(217, 227, 234, 0.99)'"
        [isVisible]="isScreenboardModalVisible.value"
        [onClose]="onScreenboardClose"
        [parameters]="mediaSFUParameters"
      ></app-screenboard-modal>

      <app-alert-component
        [visible]="alertVisible.value"
        [message]="alertMessage.value"
        [type]="alertType.value"
        [duration]="alertDuration.value"
        [onHide]="onAlertHide"
        textColor="#ffffff"
      ></app-alert-component>

      <app-loading-modal
        [isVisible]="isLoadingModalVisible.value"
        [backgroundColor]="'rgba(217, 227, 234, 0.99)'"
        displayColor="black"
      ></app-loading-modal>
    </div>
  `, providers: [CookieService] }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef }, { type: i0.Injector }, { type: i1.UpdateMiniCardsGrid }, { type: i2.MixStreams }, { type: i3.DispStreams }, { type: i4.StopShareScreen }, { type: i5.CheckScreenShare }, { type: i6.StartShareScreen }, { type: i7.RequestScreenShare }, { type: i8.ReorderStreams }, { type: i9.PrepopulateUserMedia }, { type: i10.GetVideos }, { type: i11.RePort }, { type: i12.Trigger }, { type: i13.ConsumerResume }, { type: i14.ConnectSendTransport }, { type: i15.ConnectSendTransportAudio }, { type: i16.ConnectSendTransportVideo }, { type: i17.ConnectSendTransportScreen }, { type: i18.ProcessConsumerTransports }, { type: i19.ResumePauseStreams }, { type: i20.Readjust }, { type: i21.CheckGrid }, { type: i22.GetEstimate }, { type: i23.CalculateRowsAndColumns }, { type: i24.AddVideosGrid }, { type: i25.OnScreenChanges }, { type: i26.ChangeVids }, { type: i27.CompareActiveNames }, { type: i28.CompareScreenStates }, { type: i29.CreateSendTransport }, { type: i30.ResumeSendTransportAudio }, { type: i31.ReceiveAllPipedTransports }, { type: i32.DisconnectSendTransportVideo }, { type: i33.DisconnectSendTransportAudio }, { type: i34.DisconnectSendTransportScreen }, { type: i35.GetPipedProducersAlt }, { type: i36.SignalNewConsumerTransport }, { type: i37.ConnectRecvTransport }, { type: i38.ReUpdateInter }, { type: i39.UpdateParticipantAudioDecibels }, { type: i40.CloseAndResize }, { type: i41.AutoAdjust }, { type: i42.SwitchUserVideoAlt }, { type: i43.SwitchUserVideo }, { type: i44.SwitchUserAudio }, { type: i45.GetDomains }, { type: i46.FormatNumber }, { type: i47.ConnectIps }, { type: i48.CreateDeviceClient }, { type: i49.HandleCreatePoll }, { type: i50.HandleEndPoll }, { type: i51.HandleVotePoll }, { type: i52.CaptureCanvasStream }, { type: i53.ResumePauseAudioStreams }, { type: i54.ProcessConsumerTransportsAudio }, { type: i55.LaunchMenuModal }, { type: i56.LaunchRecording }, { type: i57.StartRecording }, { type: i58.ConfirmRecording }, { type: i59.LaunchWaiting }, { type: i60.launchCoHost }, { type: i61.LaunchMediaSettings }, { type: i62.LaunchDisplaySettings }, { type: i63.LaunchSettings }, { type: i64.LaunchRequests }, { type: i65.LaunchParticipants }, { type: i66.LaunchMessages }, { type: i67.LaunchConfirmExit }, { type: i68.LaunchPoll }, { type: i69.LaunchBreakoutRooms }, { type: i70.LaunchConfigureWhiteboard }, { type: i71.StartMeetingProgressTimer }, { type: i72.UpdateRecording }, { type: i73.StopRecording }, { type: i74.UserWaiting }, { type: i75.PersonJoined }, { type: i76.AllWaitingRoomMembers }, { type: i77.RoomRecordParams }, { type: i78.BanParticipant }, { type: i79.UpdatedCoHost }, { type: i80.ParticipantRequested }, { type: i81.ScreenProducerId }, { type: i82.UpdateMediaSettings }, { type: i83.ProducerMediaPaused }, { type: i84.ProducerMediaResumed }, { type: i85.ProducerMediaClosed }, { type: i86.ControlMediaHost }, { type: i87.MeetingEnded }, { type: i88.DisconnectUserSelf }, { type: i89.ReceiveMessage }, { type: i90.MeetingTimeRemaining }, { type: i91.MeetingStillThere }, { type: i92.StartRecords }, { type: i93.ReInitiateRecording }, { type: i94.RecordingNotice }, { type: i95.TimeLeftRecording }, { type: i96.StoppedRecording }, { type: i97.HostRequestResponse }, { type: i98.AllMembers }, { type: i99.AllMembersRest }, { type: i100.Disconnect }, { type: i101.PollUpdated }, { type: i102.BreakoutRoomUpdated }, { type: i103.SocketManager }, { type: i104.JoinRoomClient }, { type: i105.UpdateRoomParametersClient }, { type: i106.ClickVideo }, { type: i107.ClickAudio }, { type: i108.ClickScreenShare }, { type: i109.SwitchVideoAlt }, { type: i110.StreamSuccessVideo }, { type: i111.StreamSuccessAudio }, { type: i112.StreamSuccessScreen }, { type: i113.StreamSuccessAudioSwitch }, { type: i114.CheckPermission }, { type: i115.UpdateConsumingDomains }, { type: i116.ReceiveRoomMessages }], propDecorators: { PrejoinPage: [{
                type: Input
            }], credentials: [{
                type: Input
            }], useLocalUIMode: [{
                type: Input
            }], seedData: [{
                type: Input
            }], useSeed: [{
                type: Input
            }], imgSrc: [{
                type: Input
            }], handleResize: [{
                type: HostListener,
                args: ['window:resize']
            }, {
                type: HostListener,
                args: ['window:orientationchange']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWFzZnUtZ2VuZXJpYy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29tcG9uZW50cy9tZWRpYXNmdS1jb21wb25lbnRzL21lZGlhc2Z1LWdlbmVyaWMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLFFBQVEsRUFFUixLQUFLLEdBR04sTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbkQsT0FBTyxFQUFFLGVBQWUsRUFBZ0IsYUFBYSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXBFLE9BQU8sRUFDTCxZQUFZLEVBQ1osYUFBYSxFQUNiLFlBQVksRUFDWixXQUFXLEVBQ1gsYUFBYSxFQUNiLEtBQUssRUFDTCxPQUFPLEVBQ1AsT0FBTyxFQUNQLFVBQVUsRUFDVixPQUFPLEVBQ1AsU0FBUyxFQUNULE1BQU0sRUFDTixhQUFhLEVBQ2IsbUJBQW1CLEVBQ25CLFlBQVksRUFDWixpQkFBaUIsRUFDakIsT0FBTyxFQUNQLFlBQVksRUFDWixVQUFVLEVBQ1YsTUFBTSxFQUNOLE9BQU8sRUFDUCxNQUFNLEVBQ04sVUFBVSxFQUNWLFVBQVUsR0FDWCxNQUFNLG1DQUFtQyxDQUFDO0FBRTNDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBRTdFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDZFQUE2RSxDQUFDO0FBQ2xILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw2REFBNkQsQ0FBQztBQUMzRixPQUFPLEVBQUUsdUJB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Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3RnZEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBOENHO0FBc2VILE1BQU0sT0FBTyxlQUFlO0lBb0JoQjtJQUNBO0lBQ0Q7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBRUE7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQXhJVCxXQUFXLEdBQVEsV0FBVyxDQUFDO0lBQ3RCLFdBQVcsR0FBNEMsRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUN2RixjQUFjLEdBQUcs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QXlCLEdBQUcsSUFBSSxlQUFlLENBQVMsQ0FBQyxDQUFDLENBQUM7SUFDM0QscUJBQXFCLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFDNUQseUJBQXlCLEdBQUcsSUFBSSxlQUFlLENBQVMsQ0FBQyxDQUFDLENBQUM7SUFDM0QsbUNBQW1DLEdBQUcsSUFBSSxlQUFlLENBQVMsQ0FBQyxDQUFDLENBQUM7SUFDckUseUJBQXlCLEdBQUcsSUFBSSxlQUFlLENBQVMsQ0FBQyxDQUFDLENBQUM7SUFDM0QseUJBQXlCLEdBQUcsSUFBSSxlQUFlLENBQVMsQ0FBQyxDQUFDLENBQUM7SUFDM0QscUJBQXFCLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFDNUQseUJBQXlCLEdBQUcsSUFBSSxlQUFlLENBQVMsQ0FBQyxDQUFDLENBQUM7SUFDM0QsbUNBQW1DLEdBQUcsSUFBSSxlQUFlLENBQVMsQ0FBQyxDQUFDLENBQUM7SUFDckUsK0JBQStCLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFDdEUsaUNBQWlDLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFDeEUsdUNBQXVDLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFDOUUseUNBQXlDLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFDaEYsNkJBQTZCLEdBQUcsSUFBSSxlQUFlLENBQVMsV0FBVyxDQUFDLENBQUM7SUFDekUsbUNBQW1DLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFDMUUsNEJBQTRCLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFFbkUsbUJBQW1CLEdBQUcsSUFBSSxlQUFlLENBQXNCO1FBQzdELFNBQVMsRUFBRTtZQUNULFlBQVksRUFBRSxPQUFPLEVBQUUsbUJBQW1CO1lBQzFDLFlBQVksRUFBRSxLQUFLLEVBQUUsNEJBQTRCO1lBQ2pELFlBQVksRUFBRSxLQUFLLEVBQUUs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QixVQUFVO3dCQUNWLGFBQWE7d0JBQ2IsZ0JBQWdCO3dCQUNoQixpQkFBaUI7d0JBQ2pCLHNCQUFzQjt3QkFDdEIsaUJBQWlCO3FCQUNsQixZQUNTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd2FULGFBUVUsQ0FBQyxhQUFhLENBQUM7ODBIQUkxQixXQUFXO3NCQURWLEtBQUs7Z0JBRUcsV0FBVztzQkFBbkIsS0FBSztnQkFDRyxjQUFjO3NCQUF0QixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csT0FBTztzQkFBZixLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkE4MEdBLFlBQVk7c0JBRmpCLFlBQVk7dUJBQUMsZUFBZTs7c0JBQzVCLFlBQVk7dUJBQUMsMEJBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBIb3N0TGlzdGVuZXIsXG4gIEluamVjdG9yLFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlck91dGxldCB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQ29va2llU2VydmljZSB9IGZyb20gJ25neC1jb29raWUtc2VydmljZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIFN1YnNjcmlwdGlvbiwgY29tYmluZUxhdGVzdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgU29ja2V0IH0gZnJvbSAnc29ja2V0LmlvLWNsaWVudCc7XG5pbXBvcnQge1xuICBmYVBsYXlDaXJjbGUsXG4gIGZhUGF1c2VDaXJjbGUsXG4gIGZhU3RvcENpcmNsZSxcbiAgZmFEb3RDaXJjbGUsXG4gIGZhUmVjb3JkVmlueWwsXG4gIGZhQ29nLFxuICBmYVVzZXJzLFxuICBmYUNsb2NrLFxuICBmYVVzZXJQbHVzLFxuICBmYVRvb2xzLFxuICBmYURlc2t0b3AsXG4gIGZhUG9sbCxcbiAgZmFVc2VyRnJpZW5kcyxcbiAgZmFDaGFsa2JvYXJkVGVhY2hlcixcbiAgZmFNaWNyb3Bob25lLFxuICBmYU1pY3JvcGhvbmVTbGFzaCxcbiAgZmFWaWRlbyxcbiAgZmFWaWRlb1NsYXNoLFxuICBmYVNoYXJlQWx0LFxuICBmYVN5bmMsXG4gIGZhUGhvbmUsXG4gIGZhQmFycyxcbiAgZmFDb21tZW50cyxcbiAgZmFDaGFydEJhcixcbn0gZnJvbSAnQGZvcnRhd2Vzb21lL2ZyZWUtc29saWQtc3ZnLWljb25zJztcblxuaW1wb3J0IHsgaW5pdGlhbFZhbHVlc1N0YXRlIH0gZnJvbSAnLi4vLi4vbWV0aG9kcy91dGlscy9pbml0aWFsLXZhbHVlcy51dGlsJztcblxuaW1wb3J0IHsgTWFpbkFzcGVjdENvbXBvbmVudCB9IGZyb20gJy4uL2Rpc3BsYXktY29tcG9uZW50cy9tYWluLWFzcGVjdC1jb21wb25lbnQvbWFpbi1hc3BlY3QtY29tcG9uZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBMb2FkaW5nTW9kYWwgfSBmcm9tICcuLi9kaXNwbGF5LWNvbXBvbmVudHMvbG9hZGluZy1tb2RhbC9sb2FkaW5nLW1vZGFsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb250cm9sQnV0dG9uc0NvbXBvbmVudCB9IGZyb20gJy4uL2Rpc3BsYXktY29tcG9uZW50cy9jb250cm9sLWJ1dHRvbnMtY29tcG9uZW50L2NvbnRyb2wtYnV0dG9ucy1jb21wb25lbnQuY29tcG9uZW50JztcbmltcG9ydCB7IENvbnRyb2xCdXR0b25zQWx0Q29tcG9uZW50IH0gZnJvbSAnLi4vZGlzcGxheS1jb21wb25lbnRzL2NvbnRyb2wtYnV0dG9ucy1hbHQtY29tcG9uZW50L2NvbnRyb2wtYnV0dG9ucy1hbHQtY29tcG9uZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb250cm9sQnV0dG9uc0NvbXBvbmVudFRvdWNoIH0gZnJvbSAnLi4vZGlzcGxheS1jb21wb25lbnRzL2NvbnRyb2wtYnV0dG9ucy1jb21wb25lbnQtdG91Y2gvY29udHJvbC1idXR0b25zLWNvbXBvbmVudC10b3VjaC5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3RoZXJHcmlkQ29tcG9uZW50IH0gZnJvbSAnLi4vZGlzcGxheS1jb21wb25lbnRzL290aGVyLWdyaWQtY29tcG9uZW50L290aGVyLWdyaWQtY29tcG9uZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYWluU2NyZWVuQ29tcG9uZW50IH0gZnJvbSAnLi4vZGlzcGxheS1jb21wb25lbnRzL21haW4tc2NyZWVuLWNvbXBvbmVudC9tYWluLXNjcmVlbi1jb21wb25lbnQuY29tcG9uZW50JztcbmltcG9ydCB7IE1haW5HcmlkQ29tcG9uZW50IH0gZnJvbSAnLi4vZGlzcGxheS1jb21wb25lbnRzL21haW4tZ3JpZC1jb21wb25lbnQvbWFpbi1ncmlkLWNvbXBvbmVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgU3ViQXNwZWN0Q29tcG9uZW50IH0gZnJvbSAnLi4vZGlzcGxheS1jb21wb25lbnRzL3N1Yi1hc3BlY3QtY29tcG9uZW50L3N1Yi1hc3BlY3QtY29tcG9uZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYWluQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi4vZGlzcGxheS1jb21wb25lbnRzL21haW4tY29udGFpbmVyLWNvbXBvbmVudC9tYWluLWNvbnRhaW5lci1jb21wb25lbnQuY29tcG9uZW50JztcbmltcG9ydCB7IEFsZXJ0Q29tcG9uZW50IH0gZnJvbSAnLi4vZGlzcGxheS1jb21wb25lbnRzL2FsZXJ0LWNvbXBvbmVudC9hbGVydC5jb21wb25lbnQuY29tcG9uZW50JztcbmltcG9ydCB7IE1lbnVNb2RhbCB9IGZyb20gJy4uL21lbnUtY29tcG9uZW50cy9tZW51LW1vZGFsL21lbnUtbW9kYWwuY29tcG9uZW50JztcbmltcG9ydCB7IFJlY29yZGluZ01vZGFsIH0gZnJvbSAnLi4vcmVjb3JkaW5nLWNvbXBvbmVudHMvcmVjb3JkaW5nLW1vZGFsL3JlY29yZGluZy1tb2RhbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgUmVxdWVzdHNNb2RhbCB9IGZyb20gJy4uL3JlcXVlc3RzLWNvbXBvbmVudHMvcmVxdWVzdHMtbW9kYWwvcmVxdWVzdHMtbW9kYWwuY29tcG9uZW50JztcbmltcG9ydCB7IFdhaXRpbmdSb29tTW9kYWwgfSBmcm9tICcuLi93YWl0aW5nLWNvbXBvbmVudHMvd2FpdGluZy1yb29tLW1vZGFsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEaXNwbGF5U2V0dGluZ3NNb2RhbCB9IGZyb20gJy4uL2Rpc3BsYXktc2V0dGluZ3MtY29tcG9uZW50cy9kaXNwbGF5LXNldHRpbmdzLW1vZGFsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBFdmVudFNldHRpbmdzTW9kYWwgfSBmcm9tICcuLi9ldmVudC1zZXR0aW5ncy1jb21wb25lbnRzL2V2ZW50LXNldHRpbmdzLW1vZGFsL2V2ZW50LXNldHRpbmdzLW1vZGFsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb0hvc3RNb2RhbCB9IGZyb20gJy4uL2NvLWhvc3QtY29tcG9uZW50cy9jby1ob3N0LW1vZGFsL2NvLWhvc3QtbW9kYWwuY29tcG9uZW50JztcbmltcG9ydCB7IFBhcnRpY2lwYW50c01vZGFsIH0gZnJvbSAnLi4vcGFydGljaXBhbnRzLWNvbXBvbmVudHMvcGFydGljaXBhbnRzLW1vZGFsL3BhcnRpY2lwYW50cy1tb2RhbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWVzc2FnZXNNb2RhbCB9IGZyb20gJy4uL21lc3NhZ2UtY29tcG9uZW50cy9tZXNzYWdlcy1tb2RhbC9tZXNzYWdlcy1tb2RhbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWVkaWFTZXR0aW5nc01vZGFsIH0gZnJvbSAnLi4vbWVkaWEtc2V0dGluZ3MtY29tcG9uZW50cy9tZWRpYS1zZXR0aW5ncy1tb2RhbC9tZWRpYS1zZXR0aW5ncy1tb2RhbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29uZmlybUV4aXRNb2RhbCB9IGZyb20gJy4uL2V4aXQtY29tcG9uZW50cy9jb25maXJtLWV4aXQtbW9kYWwvY29uZmlybS1leGl0LW1vZGFsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb25maXJtSGVyZU1vZGFsIH0gZnJvbSAnLi4vbWlzYy1jb21wb25lbnRzL2NvbmZpcm0taGVyZS1tb2RhbC9jb25maXJtLWhlcmUtbW9kYWwuY29tcG9uZW50JztcbmltcG9ydCB7IFNoYXJlRXZlbnRNb2RhbCB9IGZyb20gJy4uL21pc2MtY29tcG9uZW50cy9zaGFyZS1ldmVudC1tb2RhbC9zaGFyZS1ldmVudC1tb2RhbC5jb21wb25lbnQnO1xuaW1wb3J0IHtcbiAgV2VsY29tZVBhZ2UsXG4gIFdlbGNvbWVQYWdlT3B0aW9ucyxcbn0gZnJvbSAnLi4vbWlzYy1jb21wb25lbnRzL3dlbGNvbWUtcGFnZS93ZWxjb21lLXBhZ2UuY29tcG9uZW50JztcblxuaW1wb3J0IHsgUG9sbE1vZGFsIH0gZnJvbSAnLi4vcG9sbHMtY29tcG9uZW50cy9wb2xsLW1vZGFsL3BvbGwtbW9kYWwuY29tcG9uZW50JztcbmltcG9ydCB7IEJhY2tncm91bmRNb2RhbCB9IGZyb20gJy4uL2JhY2tncm91bmQtY29tcG9uZW50cy9iYWNrZ3JvdW5kLW1vZGFsL2JhY2tncm91bmQtbW9kYWwuY29tcG9uZW50JztcbmltcG9ydCB7IEJyZWFrb3V0Um9vbXNNb2RhbCB9IGZyb20gJy4uL2JyZWFrb3V0LWNvbXBvbmVudHMvYnJlYWtvdXQtcm9vbXMtbW9kYWwuY29tcG9uZW50JztcbmltcG9ydCB7IENvbmZpZ3VyZVdoaXRlYm9hcmRNb2RhbCB9IGZyb20gJy4uL3doaXRlYm9hcmQtY29tcG9uZW50cy9jb25maWd1cmUtd2hpdGVib2FyZC1tb2RhbC9jb25maWd1cmUtd2hpdGVib2FyZC1tb2RhbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgV2hpdGVib2FyZCB9IGZyb20gJy4uL3doaXRlYm9hcmQtY29tcG9uZW50cy93aGl0ZWJvYXJkL3doaXRlYm9hcmQuY29tcG9uZW50JztcbmltcG9ydCB7IFNjcmVlbmJvYXJkIH0gZnJvbSAnLi4vc2NyZWVuYm9hcmQtY29tcG9uZW50cy9zY3JlZW5ib2FyZC9zY3JlZW5ib2FyZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2NyZWVuYm9hcmRNb2RhbCB9IGZyb20gJy4uL3NjcmVlbmJvYXJkLWNvbXBvbmVudHMvc2NyZWVuYm9hcmQtbW9kYWwvc2NyZWVuYm9hcmQtbW9kYWwuY29tcG9uZW50Jztcbi8vIHBhZ2luYXRpb24gYW5kIGRpc3BsYXkgb2YgbWVkaWEgKHNhbXBsZXMpXG5pbXBvcnQgeyBQYWdpbmF0aW9uIH0gZnJvbSAnLi4vZGlzcGxheS1jb21wb25lbnRzL3BhZ2luYXRpb24vcGFnaW5hdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmxleGlibGVHcmlkIH0gZnJvbSAnLi4vZGlzcGxheS1jb21wb25lbnRzL2ZsZXhpYmxlLWdyaWQvZmxleGlibGUtZ3JpZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmxleGlibGVWaWRlbyB9IGZyb20gJy4uL2Rpc3BsYXktY29tcG9uZW50cy9mbGV4aWJsZS12aWRlby9mbGV4aWJsZS12aWRlby5jb21wb25lbnQnO1xuaW1wb3J0IHsgQXVkaW9HcmlkIH0gZnJvbSAnLi4vZGlzcGxheS1jb21wb25lbnRzL2F1ZGlvLWdyaWQvYXVkaW8tZ3JpZC5jb21wb25lbnQnO1xuXG5pbXBvcnQgeyBNZW51V2lkZ2V0IH0gZnJvbSAnLi4vZGlzcGxheS1jb21wb25lbnRzL2NvbnRyb2wtd2lkZ2V0cy9tZW51LXdpZGdldC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWVzc2FnZVdpZGdldCB9IGZyb20gJy4uL2Rpc3BsYXktY29tcG9uZW50cy9jb250cm9sLXdpZGdldHMvbWVzc2FnZS13aWRnZXQuY29tcG9uZW50JztcbmltcG9ydCB7IE1lbnVSZWNvcmRXaWRnZXQgfSBmcm9tICcuLi9kaXNwbGF5LWNvbXBvbmVudHMvY29udHJvbC13aWRnZXRzL21lbnUtcmVjb3JkLXdpZGdldC5jb21wb25lbnQnO1xuaW1wb3J0IHsgUmVjb3JkVGltZXJXaWRnZXQgfSBmcm9tICcuLi9kaXNwbGF5LWNvbXBvbmVudHMvY29udHJvbC13aWRnZXRzL3JlY29yZC10aW1lci13aWRnZXQuY29tcG9uZW50JztcbmltcG9ydCB7IE1lbnVQYXJ0aWNpcGFudHNXaWRnZXQgfSBmcm9tICcuLi9kaXNwbGF5LWNvbXBvbmVudHMvY29udHJvbC13aWRnZXRzL21lbnUtcGFydGljaXBhbnRzLXdpZGdldC5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2NyZWVuU2hhcmVXaWRnZXQgfSBmcm9tICcuLi9kaXNwbGF5LWNvbXBvbmVudHMvY29udHJvbC13aWRnZXRzL3NjcmVlbnNoYXJlLXdpZGdldC5jb21wb25lbnQnO1xuXG5pbXBvcnQge1xuICBCdXR0b25Ub3VjaCxcbiAgUmVzcG9uc2VKb2luUm9vbSxcbiAgQ29Ib3N0UmVzcG9uc2liaWxpdHksXG4gIEV2ZW50VHlwZSxcbiAgUGFydGljaXBhbnQsXG4gIENvbnN1bWVTb2NrZXQsXG4gIE1lZXRpbmdSb29tUGFyYW1zLFxuICBWaWRDb25zLFxuICBIUGFyYW1zVHlwZSxcbiAgVlBhcmFtc1R5cGUsXG4gIFNjcmVlblBhcmFtc1R5cGUsXG4gIEFQYXJhbXNUeXBlLFxuICBVc2VyUmVjb3JkaW5nUGFyYW1zLFxuICBTdHJlYW0sXG4gIEF1ZGlvRGVjaWJlbHMsXG4gIFNjcmVlblN0YXRlLFxuICBHcmlkU2l6ZXMsXG4gIEN1c3RvbU1lZGlhQ29tcG9uZW50LFxuICBNZXNzYWdlLFxuICBXYWl0aW5nUm9vbVBhcnRpY2lwYW50LFxuICBDb21wb25lbnRTaXplcyxcbiAgVHJhbnNwb3J0IGFzIFRyYW5zcG9ydFR5cGUsXG4gIFNoYXBlLFxuICBQb2xsLFxuICBCcmVha291dFBhcnRpY2lwYW50LFxuICBXaGl0ZWJvYXJkVXNlcixcbiAgUmVxdWVzdCxcbiAgQWxsTWVtYmVyc0RhdGEsXG4gIEFsbE1lbWJlcnNSZXN0RGF0YSxcbiAgQnJlYWtvdXRSb29tVXBkYXRlZERhdGEsXG4gIEFsbFdhaXRpbmdSb29tTWVtYmVyc0RhdGEsXG4gIE1haW5CdXR0b25BbHQsXG4gIE1haW5DdXN0b21CdXR0b24sXG4gIFJlY29yZFBhcmFtcyxcbiAgU2VlZERhdGEsXG4gIFVwZGF0ZWRDb0hvc3REYXRhLFxuICBTZXR0aW5ncyxcbiAgVXBkYXRlQ29uc3VtaW5nRG9tYWluc0RhdGEsXG4gIFJlY29yZGluZ05vdGljZURhdGEsXG4gIEhvc3RSZXF1ZXN0UmVzcG9uc2VEYXRhLFxuICBQb2xsVXBkYXRlZERhdGEsXG4gIFByZUpvaW5QYWdlT3B0aW9ucyxcbn0gZnJvbSAnLi4vLi4vQHR5cGVzL3R5cGVzJztcblxuLy9pbXBvcnQgbWV0aG9kcyBmb3IgY29udHJvbCAoc2FtcGxlcylcbi8vIEltcG9ydCBtZXRob2RzIGZvciBjb250cm9sIChzYW1wbGVzKVxuaW1wb3J0IHsgTGF1bmNoTWVudU1vZGFsIH0gZnJvbSAnLi4vLi4vbWV0aG9kcy9tZW51LW1ldGhvZHMvbGF1bmNoLW1lbnUtbW9kYWwuc2VydmljZSc7XG5pbXBvcnQgeyBMYXVuY2hSZWNvcmRpbmcgfSBmcm9tICcuLi8uLi9tZXRob2RzL3JlY29yZGluZy1tZXRob2RzL2xhdW5jaC1yZWNvcmRpbmcuc2VydmljZSc7XG5pbXBvcnQgeyBTdGFydFJlY29yZGluZyB9IGZyb20gJy4uLy4uL21ldGhvZHMvcmVjb3JkaW5nLW1ldGhvZHMvc3RhcnQtcmVjb3JkaW5nLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29uZmlybVJlY29yZGluZyB9IGZyb20gJy4uLy4uL21ldGhvZHMvcmVjb3JkaW5nLW1ldGhvZHMvY29uZmlybS1yZWNvcmRpbmcuc2VydmljZSc7XG5pbXBvcnQgeyBMYXVuY2hXYWl0aW5nIH0gZnJvbSAnLi4vLi4vbWV0aG9kcy93YWl0aW5nLW1ldGhvZHMvbGF1bmNoLXdhaXRpbmcuc2VydmljZSc7XG5pbXBvcnQgeyBsYXVuY2hDb0hvc3QgfSBmcm9tICcuLi8uLi9tZXRob2RzL2NvLWhvc3QtbWV0aG9kcy9sYXVuY2gtY28taG9zdC5zZXJ2aWNlJztcbmltcG9ydCB7IExhdW5jaE1lZGlhU2V0dGluZ3MgfSBmcm9tICcuLi8uLi9tZXRob2RzL21lZGlhLXNldHRpbmdzLW1ldGhvZHMvbGF1bmNoLW1lZGlhLXNldHRpbmdzLnNlcnZpY2UnO1xuaW1wb3J0IHsgTGF1bmNoRGlzcGxheVNldHRpbmdzIH0gZnJvbSAnLi4vLi4vbWV0aG9kcy9kaXNwbGF5LXNldHRpbmdzLW1ldGhvZHMvbGF1bmNoLWRpc3BsYXktc2V0dGluZ3Muc2VydmljZSc7XG5pbXBvcnQgeyBMYXVuY2hTZXR0aW5ncyB9IGZyb20gJy4uLy4uL21ldGhvZHMvc2V0dGluZ3MtbWV0aG9kcy9sYXVuY2gtc2V0dGluZ3Muc2VydmljZSc7XG5pbXBvcnQgeyBMYXVuY2hSZXF1ZXN0cyB9IGZyb20gJy4uLy4uL21ldGhvZHMvcmVxdWVzdHMtbWV0aG9kcy9sYXVuY2gtcmVxdWVzdHMuc2VydmljZSc7XG5pbXBvcnQgeyBMYXVuY2hQYXJ0aWNpcGFudHMgfSBmcm9tICcuLi8uLi9tZXRob2RzL3BhcnRpY2lwYW50cy1tZXRob2RzL2xhdW5jaC1wYXJ0aWNpcGFudHMuc2VydmljZSc7XG5pbXBvcnQgeyBMYXVuY2hNZXNzYWdlcyB9IGZyb20gJy4uLy4uL21ldGhvZHMvbWVzc2FnZS1tZXRob2RzL2xhdW5jaC1tZXNzYWdlcy5zZXJ2aWNlJztcbmltcG9ydCB7IExhdW5jaENvbmZpcm1FeGl0IH0gZnJvbSAnLi4vLi4vbWV0aG9kcy9leGl0LW1ldGhvZHMvbGF1bmNoLWNvbmZpcm0tZXhpdC5zZXJ2aWNlJztcblxuaW1wb3J0IHsgTGF1bmNoUG9sbCB9IGZyb20gJy4uLy4uL21ldGhvZHMvcG9sbHMtbWV0aG9kcy9sYXVuY2gtcG9sbC5zZXJ2aWNlJztcbmltcG9ydCB7IExhdW5jaEJyZWFrb3V0Um9vbXMgfSBmcm9tICcuLi8uLi9tZXRob2RzL2JyZWFrb3V0LXJvb20tbWV0aG9kcy9sYXVuY2gtYnJlYWtvdXQtcm9vbXMuc2VydmljZSc7XG5pbXBvcnQgeyBMYXVuY2hDb25maWd1cmVXaGl0ZWJvYXJkIH0gZnJvbSAnLi4vLi4vbWV0aG9kcy93aGl0ZWJvYXJkLW1ldGhvZHMvbGF1bmNoLWNvbmZpZ3VyZS13aGl0ZWJvYXJkLnNlcnZpY2UnO1xuXG4vLyBtZWRpYXNmdSBmdW5jdGlvbnMgLS0gZXhhbXBsZXNcbmltcG9ydCB7IFNvY2tldE1hbmFnZXIgfSBmcm9tICcuLi8uLi9zb2NrZXRzL3NvY2tldC1tYW5hZ2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgSm9pblJvb21DbGllbnQgfSBmcm9tICcuLi8uLi9wcm9kdWNlci1jbGllbnQvcHJvZHVjZXItY2xpZW50LWVtaXRzL2pvaW4tcm9vbS1jbGllbnQuc2VydmljZSc7XG5pbXBvcnQgeyBVcGRhdGVSb29tUGFyYW1ldGVyc0NsaWVudCB9IGZyb20gJy4uLy4uL3Byb2R1Y2VyLWNsaWVudC9wcm9kdWNlci1jbGllbnQtZW1pdHMvdXBkYXRlLXJvb20tcGFyYW1ldGVycy1jbGllbnQuc2VydmljZSc7XG5pbXBvcnQgeyBDcmVhdGVEZXZpY2VDbGllbnQgfSBmcm9tICcuLi8uLi9wcm9kdWNlci1jbGllbnQvcHJvZHVjZXItY2xpZW50LWVtaXRzL2NyZWF0ZS1kZXZpY2UtY2xpZW50LnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBTd2l0Y2hWaWRlb0FsdCB9IGZyb20gJy4uLy4uL21ldGhvZHMvc3RyZWFtLW1ldGhvZHMvc3dpdGNoLXZpZGVvLWFsdC5zZXJ2aWNlJztcbmltcG9ydCB7IENsaWNrVmlkZW8gfSBmcm9tICcuLi8uLi9tZXRob2RzL3N0cmVhbS1tZXRob2RzL2NsaWNrLXZpZGVvLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2xpY2tBdWRpbyB9IGZyb20gJy4uLy4uL21ldGhvZHMvc3RyZWFtLW1ldGhvZHMvY2xpY2stYXVkaW8uc2VydmljZSc7XG5pbXBvcnQgeyBDbGlja1NjcmVlblNoYXJlIH0gZnJvbSAnLi4vLi4vbWV0aG9kcy9zdHJlYW0tbWV0aG9kcy9jbGljay1zY3JlZW4tc2hhcmUuc2VydmljZSc7XG5pbXBvcnQgeyBTdHJlYW1TdWNjZXNzVmlkZW8gfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvc3RyZWFtLXN1Y2Nlc3MtdmlkZW8uc2VydmljZSc7XG5pbXBvcnQgeyBTdHJlYW1TdWNjZXNzQXVkaW8gfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvc3RyZWFtLXN1Y2Nlc3MtYXVkaW8uc2VydmljZSc7XG5pbXBvcnQgeyBTdHJlYW1TdWNjZXNzU2NyZWVuIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL3N0cmVhbS1zdWNjZXNzLXNjcmVlbi5zZXJ2aWNlJztcbmltcG9ydCB7IFN0cmVhbVN1Y2Nlc3NBdWRpb1N3aXRjaCB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9zdHJlYW0tc3VjY2Vzcy1hdWRpby1zd2l0Y2guc2VydmljZSc7XG5pbXBvcnQgeyBDaGVja1Blcm1pc3Npb24gfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvY2hlY2stcGVybWlzc2lvbi5zZXJ2aWNlJztcblxuLy8gbWVkaWFzZnUgZnVuY3Rpb25zXG5pbXBvcnQgeyBVcGRhdGVNaW5pQ2FyZHNHcmlkIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL3VwZGF0ZS1taW5pLWNhcmRzLWdyaWQuc2VydmljZSc7XG5pbXBvcnQgeyBNaXhTdHJlYW1zIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL21peC1zdHJlYW1zLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGlzcFN0cmVhbXMgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvZGlzcC1zdHJlYW1zLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3RvcFNoYXJlU2NyZWVuIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL3N0b3Atc2hhcmUtc2NyZWVuLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2hlY2tTY3JlZW5TaGFyZSB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9jaGVjay1zY3JlZW4tc2hhcmUuc2VydmljZSc7XG5pbXBvcnQgeyBTdGFydFNoYXJlU2NyZWVuIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL3N0YXJ0LXNoYXJlLXNjcmVlbi5zZXJ2aWNlJztcbmltcG9ydCB7IFJlcXVlc3RTY3JlZW5TaGFyZSB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9yZXF1ZXN0LXNjcmVlbi1zaGFyZS5zZXJ2aWNlJztcbmltcG9ydCB7IFJlb3JkZXJTdHJlYW1zIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL3Jlb3JkZXItc3RyZWFtcy5zZXJ2aWNlJztcbmltcG9ydCB7IFByZXBvcHVsYXRlVXNlck1lZGlhIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL3ByZXBvcHVsYXRlLXVzZXItbWVkaWEuc2VydmljZSc7XG5pbXBvcnQgeyBHZXRWaWRlb3MgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvZ2V0LXZpZGVvcy5zZXJ2aWNlJztcbmltcG9ydCB7IFJlUG9ydCB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9yZS1wb3J0LnNlcnZpY2UnO1xuaW1wb3J0IHsgVHJpZ2dlciB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy90cmlnZ2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29uc3VtZXJSZXN1bWUgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvY29uc3VtZXItcmVzdW1lLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29ubmVjdFNlbmRUcmFuc3BvcnRBdWRpbyB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9jb25uZWN0LXNlbmQtdHJhbnNwb3J0LWF1ZGlvLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlbyB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9jb25uZWN0LXNlbmQtdHJhbnNwb3J0LXZpZGVvLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW4gfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvY29ubmVjdC1zZW5kLXRyYW5zcG9ydC1zY3JlZW4uc2VydmljZSc7XG5pbXBvcnQgeyBQcm9jZXNzQ29uc3VtZXJUcmFuc3BvcnRzIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL3Byb2Nlc3MtY29uc3VtZXItdHJhbnNwb3J0cy5zZXJ2aWNlJztcbmltcG9ydCB7IFJlc3VtZVBhdXNlU3RyZWFtcyB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9yZXN1bWUtcGF1c2Utc3RyZWFtcy5zZXJ2aWNlJztcbmltcG9ydCB7IFJlYWRqdXN0IH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL3JlYWRqdXN0LnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2hlY2tHcmlkIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL2NoZWNrLWdyaWQuc2VydmljZSc7XG5pbXBvcnQgeyBHZXRFc3RpbWF0ZSB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9nZXQtZXN0aW1hdGUuc2VydmljZSc7XG5pbXBvcnQgeyBDYWxjdWxhdGVSb3dzQW5kQ29sdW1ucyB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9jYWxjdWxhdGUtcm93cy1hbmQtY29sdW1ucy5zZXJ2aWNlJztcbmltcG9ydCB7IEFkZFZpZGVvc0dyaWQgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvYWRkLXZpZGVvcy1ncmlkLnNlcnZpY2UnO1xuaW1wb3J0IHsgT25TY3JlZW5DaGFuZ2VzIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL29uLXNjcmVlbi1jaGFuZ2VzLnNlcnZpY2UnO1xuaW1wb3J0IHsgc2xlZXAgfSBmcm9tICcuLi8uLi9tZXRob2RzL3V0aWxzL3NsZWVwLnV0aWwnO1xuaW1wb3J0IHsgQ2hhbmdlVmlkcyB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9jaGFuZ2Utdmlkcy5zZXJ2aWNlJztcbmltcG9ydCB7IENvbXBhcmVBY3RpdmVOYW1lcyB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9jb21wYXJlLWFjdGl2ZS1uYW1lcy5zZXJ2aWNlJztcbmltcG9ydCB7IENvbXBhcmVTY3JlZW5TdGF0ZXMgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvY29tcGFyZS1zY3JlZW4tc3RhdGVzLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ3JlYXRlU2VuZFRyYW5zcG9ydCB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9jcmVhdGUtc2VuZC10cmFuc3BvcnQuc2VydmljZSc7XG5pbXBvcnQgeyBSZXN1bWVTZW5kVHJhbnNwb3J0QXVkaW8gfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvcmVzdW1lLXNlbmQtdHJhbnNwb3J0LWF1ZGlvLnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVjZWl2ZUFsbFBpcGVkVHJhbnNwb3J0cyB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9yZWNlaXZlLWFsbC1waXBlZC10cmFuc3BvcnRzLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGlzY29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlbyB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9kaXNjb25uZWN0LXNlbmQtdHJhbnNwb3J0LXZpZGVvLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGlzY29ubmVjdFNlbmRUcmFuc3BvcnRBdWRpbyB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9kaXNjb25uZWN0LXNlbmQtdHJhbnNwb3J0LWF1ZGlvLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGlzY29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW4gfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvZGlzY29ubmVjdC1zZW5kLXRyYW5zcG9ydC1zY3JlZW4uc2VydmljZSc7XG5pbXBvcnQgeyBDb25uZWN0U2VuZFRyYW5zcG9ydCB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9jb25uZWN0LXNlbmQtdHJhbnNwb3J0LnNlcnZpY2UnO1xuaW1wb3J0IHsgR2V0UGlwZWRQcm9kdWNlcnNBbHQgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvZ2V0LXBpcGVkLXByb2R1Y2Vycy1hbHQuc2VydmljZSc7XG5pbXBvcnQgeyBTaWduYWxOZXdDb25zdW1lclRyYW5zcG9ydCB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9zaWduYWwtbmV3LWNvbnN1bWVyLXRyYW5zcG9ydC5zZXJ2aWNlJztcbmltcG9ydCB7IENvbm5lY3RSZWN2VHJhbnNwb3J0IH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL2Nvbm5lY3QtcmVjdi10cmFuc3BvcnQuc2VydmljZSc7XG5pbXBvcnQgeyBSZVVwZGF0ZUludGVyIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL3JlLXVwZGF0ZS1pbnRlci5zZXJ2aWNlJztcbmltcG9ydCB7IFVwZGF0ZVBhcnRpY2lwYW50QXVkaW9EZWNpYmVscyB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy91cGRhdGUtcGFydGljaXBhbnQtYXVkaW8tZGVjaWJlbHMuc2VydmljZSc7XG5pbXBvcnQgeyBDbG9zZUFuZFJlc2l6ZSB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9jbG9zZS1hbmQtcmVzaXplLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXV0b0FkanVzdCB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9hdXRvLWFkanVzdC5zZXJ2aWNlJztcbmltcG9ydCB7IFN3aXRjaFVzZXJWaWRlb0FsdCB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9zd2l0Y2gtdXNlci12aWRlby1hbHQuc2VydmljZSc7XG5pbXBvcnQgeyBTd2l0Y2hVc2VyVmlkZW8gfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvc3dpdGNoLXVzZXItdmlkZW8uc2VydmljZSc7XG5pbXBvcnQgeyBTd2l0Y2hVc2VyQXVkaW8gfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvc3dpdGNoLXVzZXItYXVkaW8uc2VydmljZSc7XG5pbXBvcnQgeyBSZWNlaXZlUm9vbU1lc3NhZ2VzIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL3JlY2VpdmUtcm9vbS1tZXNzYWdlcy5zZXJ2aWNlJztcbmltcG9ydCB7IEZvcm1hdE51bWJlciB9IGZyb20gJy4uLy4uL21ldGhvZHMvdXRpbHMvZm9ybWF0LW51bWJlci5zZXJ2aWNlJztcbmltcG9ydCB7IENvbm5lY3RJcHMgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvY29ubmVjdC1pcHMuc2VydmljZSc7XG5cbmltcG9ydCB7IFBvbGxVcGRhdGVkIH0gZnJvbSAnLi4vLi4vbWV0aG9kcy9wb2xscy1tZXRob2RzL3BvbGwtdXBkYXRlZC5zZXJ2aWNlJztcbmltcG9ydCB7IEhhbmRsZUNyZWF0ZVBvbGwgfSBmcm9tICcuLi8uLi9tZXRob2RzL3BvbGxzLW1ldGhvZHMvaGFuZGxlLWNyZWF0ZS1wb2xsLnNlcnZpY2UnO1xuaW1wb3J0IHsgSGFuZGxlVm90ZVBvbGwgfSBmcm9tICcuLi8uLi9tZXRob2RzL3BvbGxzLW1ldGhvZHMvaGFuZGxlLXZvdGUtcG9sbC5zZXJ2aWNlJztcbmltcG9ydCB7IEhhbmRsZUVuZFBvbGwgfSBmcm9tICcuLi8uLi9tZXRob2RzL3BvbGxzLW1ldGhvZHMvaGFuZGxlLWVuZC1wb2xsLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBCcmVha291dFJvb21VcGRhdGVkIH0gZnJvbSAnLi4vLi4vbWV0aG9kcy9icmVha291dC1yb29tLW1ldGhvZHMvYnJlYWtvdXQtcm9vbS11cGRhdGVkLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBTdGFydE1lZXRpbmdQcm9ncmVzc1RpbWVyIH0gZnJvbSAnLi4vLi4vbWV0aG9kcy91dGlscy9tZWV0aW5nLXRpbWVyL3N0YXJ0LW1lZXRpbmctcHJvZ3Jlc3MtdGltZXIuc2VydmljZSc7XG5pbXBvcnQgeyBVcGRhdGVSZWNvcmRpbmcgfSBmcm9tICcuLi8uLi9tZXRob2RzL3JlY29yZGluZy1tZXRob2RzL3VwZGF0ZS1yZWNvcmRpbmcuc2VydmljZSc7XG5pbXBvcnQgeyBTdG9wUmVjb3JkaW5nIH0gZnJvbSAnLi4vLi4vbWV0aG9kcy9yZWNvcmRpbmctbWV0aG9kcy9zdG9wLXJlY29yZGluZy5zZXJ2aWNlJztcblxuaW1wb3J0IHsgVXNlcldhaXRpbmcgfSBmcm9tICcuLi8uLi9wcm9kdWNlcnMvc29ja2V0LXJlY2VpdmUtbWV0aG9kcy91c2VyLXdhaXRpbmcuc2VydmljZSc7XG5pbXBvcnQgeyBQZXJzb25Kb2luZWQgfSBmcm9tICcuLi8uLi9wcm9kdWNlcnMvc29ja2V0LXJlY2VpdmUtbWV0aG9kcy9wZXJzb24tam9pbmVkLnNlcnZpY2UnO1xuaW1wb3J0IHsgQWxsV2FpdGluZ1Jvb21NZW1iZXJzIH0gZnJvbSAnLi4vLi4vcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvYWxsLXdhaXRpbmctcm9vbS1tZW1iZXJzLnNlcnZpY2UnO1xuaW1wb3J0IHsgUm9vbVJlY29yZFBhcmFtcyB9IGZyb20gJy4uLy4uL3Byb2R1Y2Vycy9zb2NrZXQtcmVjZWl2ZS1tZXRob2RzL3Jvb20tcmVjb3JkLXBhcmFtcy5zZXJ2aWNlJztcbmltcG9ydCB7IEJhblBhcnRpY2lwYW50IH0gZnJvbSAnLi4vLi4vcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvYmFuLXBhcnRpY2lwYW50LnNlcnZpY2UnO1xuaW1wb3J0IHsgVXBkYXRlZENvSG9zdCB9IGZyb20gJy4uLy4uL3Byb2R1Y2Vycy9zb2NrZXQtcmVjZWl2ZS1tZXRob2RzL3VwZGF0ZWQtY28taG9zdC5zZXJ2aWNlJztcbmltcG9ydCB7IFBhcnRpY2lwYW50UmVxdWVzdGVkIH0gZnJvbSAnLi4vLi4vcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvcGFydGljaXBhbnQtcmVxdWVzdGVkLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2NyZWVuUHJvZHVjZXJJZCB9IGZyb20gJy4uLy4uL3Byb2R1Y2Vycy9zb2NrZXQtcmVjZWl2ZS1tZXRob2RzL3NjcmVlbi1wcm9kdWNlci1pZC5zZXJ2aWNlJztcbmltcG9ydCB7IFVwZGF0ZU1lZGlhU2V0dGluZ3MgfSBmcm9tICcuLi8uLi9wcm9kdWNlcnMvc29ja2V0LXJlY2VpdmUtbWV0aG9kcy91cGRhdGUtbWVkaWEtc2V0dGluZ3Muc2VydmljZSc7XG5pbXBvcnQgeyBQcm9kdWNlck1lZGlhUGF1c2VkIH0gZnJvbSAnLi4vLi4vcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvcHJvZHVjZXItbWVkaWEtcGF1c2VkLnNlcnZpY2UnO1xuaW1wb3J0IHsgUHJvZHVjZXJNZWRpYVJlc3VtZWQgfSBmcm9tICcuLi8uLi9wcm9kdWNlcnMvc29ja2V0LXJlY2VpdmUtbWV0aG9kcy9wcm9kdWNlci1tZWRpYS1yZXN1bWVkLnNlcnZpY2UnO1xuaW1wb3J0IHsgUHJvZHVjZXJNZWRpYUNsb3NlZCB9IGZyb20gJy4uLy4uL3Byb2R1Y2Vycy9zb2NrZXQtcmVjZWl2ZS1tZXRob2RzL3Byb2R1Y2VyLW1lZGlhLWNsb3NlZC5zZXJ2aWNlJztcbmltcG9ydCB7IENvbnRyb2xNZWRpYUhvc3QgfSBmcm9tICcuLi8uLi9wcm9kdWNlcnMvc29ja2V0LXJlY2VpdmUtbWV0aG9kcy9jb250cm9sLW1lZGlhLWhvc3Quc2VydmljZSc7XG5pbXBvcnQgeyBNZWV0aW5nRW5kZWQgfSBmcm9tICcuLi8uLi9wcm9kdWNlcnMvc29ja2V0LXJlY2VpdmUtbWV0aG9kcy9tZWV0aW5nLWVuZGVkLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGlzY29ubmVjdFVzZXJTZWxmIH0gZnJvbSAnLi4vLi4vcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvZGlzY29ubmVjdC11c2VyLXNlbGYuc2VydmljZSc7XG5pbXBvcnQgeyBSZWNlaXZlTWVzc2FnZSB9IGZyb20gJy4uLy4uL3Byb2R1Y2Vycy9zb2NrZXQtcmVjZWl2ZS1tZXRob2RzL3JlY2VpdmUtbWVzc2FnZS5zZXJ2aWNlJztcbmltcG9ydCB7IE1lZXRpbmdUaW1lUmVtYWluaW5nIH0gZnJvbSAnLi4vLi4vcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvbWVldGluZy10aW1lLXJlbWFpbmluZy5zZXJ2aWNlJztcbmltcG9ydCB7IE1lZXRpbmdTdGlsbFRoZXJlIH0gZnJvbSAnLi4vLi4vcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvbWVldGluZy1zdGlsbC10aGVyZS5zZXJ2aWNlJztcbmltcG9ydCB7IFN0YXJ0UmVjb3JkcyB9IGZyb20gJy4uLy4uL3Byb2R1Y2Vycy9zb2NrZXQtcmVjZWl2ZS1tZXRob2RzL3N0YXJ0LXJlY29yZHMuc2VydmljZSc7XG5pbXBvcnQgeyBSZUluaXRpYXRlUmVjb3JkaW5nIH0gZnJvbSAnLi4vLi4vcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvcmUtaW5pdGlhdGUtcmVjb3JkaW5nLnNlcnZpY2UnO1xuaW1wb3J0IHsgR2V0RG9tYWlucyB9IGZyb20gJy4uLy4uL3Byb2R1Y2Vycy9zb2NrZXQtcmVjZWl2ZS1tZXRob2RzL2dldC1kb21haW5zLnNlcnZpY2UnO1xuaW1wb3J0IHsgVXBkYXRlQ29uc3VtaW5nRG9tYWlucyB9IGZyb20gJy4uLy4uL3Byb2R1Y2Vycy9zb2NrZXQtcmVjZWl2ZS1tZXRob2RzL3VwZGF0ZS1jb25zdW1pbmctZG9tYWlucy5zZXJ2aWNlJztcbmltcG9ydCB7IFJlY29yZGluZ05vdGljZSB9IGZyb20gJy4uLy4uL3Byb2R1Y2Vycy9zb2NrZXQtcmVjZWl2ZS1tZXRob2RzL3JlY29yZGluZy1ub3RpY2Uuc2VydmljZSc7XG5pbXBvcnQgeyBUaW1lTGVmdFJlY29yZGluZyB9IGZyb20gJy4uLy4uL3Byb2R1Y2Vycy9zb2NrZXQtcmVjZWl2ZS1tZXRob2RzL3RpbWUtbGVmdC1yZWNvcmRpbmcuc2VydmljZSc7XG5pbXBvcnQgeyBTdG9wcGVkUmVjb3JkaW5nIH0gZnJvbSAnLi4vLi4vcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvc3RvcHBlZC1yZWNvcmRpbmcuc2VydmljZSc7XG5pbXBvcnQgeyBIb3N0UmVxdWVzdFJlc3BvbnNlIH0gZnJvbSAnLi4vLi4vcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvaG9zdC1yZXF1ZXN0LXJlc3BvbnNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgQWxsTWVtYmVycyB9IGZyb20gJy4uLy4uL3Byb2R1Y2Vycy9zb2NrZXQtcmVjZWl2ZS1tZXRob2RzL2FsbC1tZW1iZXJzLnNlcnZpY2UnO1xuaW1wb3J0IHsgQWxsTWVtYmVyc1Jlc3QgfSBmcm9tICcuLi8uLi9wcm9kdWNlcnMvc29ja2V0LXJlY2VpdmUtbWV0aG9kcy9hbGwtbWVtYmVycy1yZXN0LnNlcnZpY2UnO1xuaW1wb3J0IHsgRGlzY29ubmVjdCB9IGZyb20gJy4uLy4uL3Byb2R1Y2Vycy9zb2NrZXQtcmVjZWl2ZS1tZXRob2RzL2Rpc2Nvbm5lY3Quc2VydmljZSc7XG5cbmltcG9ydCB7IENhcHR1cmVDYW52YXNTdHJlYW0gfSBmcm9tICcuLi8uLi9tZXRob2RzL3doaXRlYm9hcmQtbWV0aG9kcy9jYXB0dXJlLWNhbnZhcy1zdHJlYW0uc2VydmljZSc7XG5pbXBvcnQgeyBSZXN1bWVQYXVzZUF1ZGlvU3RyZWFtcyB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9yZXN1bWUtcGF1c2UtYXVkaW8tc3RyZWFtcy5zZXJ2aWNlJztcbmltcG9ydCB7IFByb2Nlc3NDb25zdW1lclRyYW5zcG9ydHNBdWRpbyB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9wcm9jZXNzLWNvbnN1bWVyLXRyYW5zcG9ydHMtYXVkaW8uc2VydmljZSc7XG5cbmltcG9ydCB7XG4gIERldmljZSxcbiAgUHJvZHVjZXIsXG4gIFByb2R1Y2VyT3B0aW9ucyxcbiAgUnRwQ2FwYWJpbGl0aWVzLFxuICBUcmFuc3BvcnQsXG59IGZyb20gJ21lZGlhc291cC1jbGllbnQvbGliL3R5cGVzJztcbmltcG9ydCB7IFNlbGZpZVNlZ21lbnRhdGlvbiB9IGZyb20gJ0BtZWRpYXBpcGUvc2VsZmllX3NlZ21lbnRhdGlvbic7XG5cbmV4cG9ydCB0eXBlIE1lZGlhc2Z1R2VuZXJpY09wdGlvbnMgPSB7XG4gIFByZWpvaW5QYWdlPzogKG9wdGlvbnM6IFByZUpvaW5QYWdlT3B0aW9ucyB8IFdlbGNvbWVQYWdlT3B0aW9ucykgPT4gSFRNTEVsZW1lbnQ7XG4gIGNyZWRlbnRpYWxzPzogeyBhcGlVc2VyTmFtZTogc3RyaW5nOyBhcGlLZXk6IHN0cmluZyB9O1xuICB1c2VMb2NhbFVJTW9kZT86IGJvb2xlYW47XG4gIHNlZWREYXRhPzogU2VlZERhdGE7XG4gIHVzZVNlZWQ/OiBib29sZWFuO1xuICBpbWdTcmM/OiBzdHJpbmc7XG59O1xuXG4vKipcbiAqIE1lZGlhc2Z1R2VuZXJpYyBjb21wb25lbnQgcHJvdmlkZXMgYSBjdXN0b21pemFibGUgaW50ZXJmYWNlIHdpdGggYSBmdWxsIHN1aXRlIG9mIG1vZGFsIHdpbmRvd3MgYW5kIGZsZXhpYmxlIGxheW91dCBvcHRpb25zIGZvciBpbnRlcmFjdGl2ZSBtZWRpYSBhcHBsaWNhdGlvbnMuXG4gKlxuICogQGNvbXBvbmVudFxuICogQHNlbGVjdG9yIGFwcC1tZWRpYXNmdS1nZW5lcmljXG4gKiBAc3RhbmRhbG9uZSB0cnVlXG4gKiBAaW1wb3J0cyBbUm91dGVyT3V0bGV0LCBDb21tb25Nb2R1bGUsIEJyZWFrb3V0Um9vbXNNb2RhbCwgQmFja2dyb3VuZE1vZGFsLCBDb0hvc3RNb2RhbCwgQWxlcnRDb21wb25lbnQsIEF1ZGlvR3JpZCwgQ29udHJvbEJ1dHRvbnNBbHRDb21wb25lbnQsIENvbnRyb2xCdXR0b25zQ29tcG9uZW50VG91Y2gsIENvbnRyb2xCdXR0b25zQ29tcG9uZW50LCBGbGV4aWJsZUdyaWQsIEZsZXhpYmxlVmlkZW8sIExvYWRpbmdNb2RhbCwgUGFnaW5hdGlvbiwgU3ViQXNwZWN0Q29tcG9uZW50LCBEaXNwbGF5U2V0dGluZ3NNb2RhbCwgRXZlbnRTZXR0aW5nc01vZGFsLCBDb25maXJtRXhpdE1vZGFsLCBNZWRpYVNldHRpbmdzTW9kYWwsIE1lbnVNb2RhbCwgTWVzc2FnZXNNb2RhbCwgQ29uZmlybUhlcmVNb2RhbCwgU2hhcmVFdmVudE1vZGFsLCBXZWxjb21lUGFnZSwgUGFydGljaXBhbnRzTW9kYWwsIFBvbGxNb2RhbCwgUmVjb3JkaW5nTW9kYWwsIFJlcXVlc3RzTW9kYWwsIE1haW5Bc3BlY3RDb21wb25lbnQsIE1haW5Db250YWluZXJDb21wb25lbnQsIE1haW5HcmlkQ29tcG9uZW50LCBNYWluU2NyZWVuQ29tcG9uZW50LCBPdGhlckdyaWRDb21wb25lbnQsIFNjcmVlbmJvYXJkLCBTY3JlZW5ib2FyZE1vZGFsLCBXaGl0ZWJvYXJkLCBDb25maWd1cmVXaGl0ZWJvYXJkTW9kYWwsIFdhaXRpbmdSb29tTW9kYWwsIE1lbnVXaWRnZXQsIE1lc3NhZ2VXaWRnZXQsIE1lbnVSZWNvcmRXaWRnZXQsIFJlY29yZFRpbWVyV2lkZ2V0LCBNZW51UGFydGljaXBhbnRzV2lkZ2V0LCBTY3JlZW5TaGFyZVdpZGdldF1cbiAqXG4gKiBAdGVtcGxhdGVcbiAqIFRoZSB0ZW1wbGF0ZSBzdHJ1Y3R1cmU6XG4gKiAtIENvbmRpdGlvbmFsIHJlbmRlcmluZyBvZiBhIFByZWpvaW5QYWdlIG9yIFdlbGNvbWVQYWdlIGZvciBpbnRyb2R1Y3Rvcnkgb3IgcHJlLXNlc3Npb24gc2NyZWVucy5cbiAqIC0gTWFpbiBjb250ZW50IGFyZWEgd2l0aCBuZXN0ZWQgY29tcG9uZW50cyBmb3IgZ3JpZCBsYXlvdXRzLCBmbGV4aWJsZSB2aWRlbywgYW5kIGF1ZGlvIGdyaWRzLlxuICogLSBNb2RhbHMgZm9yIHVzZXIgaW50ZXJhY3Rpb25zLCBpbmNsdWRpbmcgcGFydGljaXBhbnQgbWFuYWdlbWVudCwgZXZlbnQgc2V0dGluZ3MsIGJyZWFrb3V0IHJvb21zLCB3aGl0ZWJvYXJkaW5nLCBhbmQgbWVkaWEgc2V0dGluZ3MuXG4gKlxuICogQGlucHV0IHthbnl9IFByZWpvaW5QYWdlIC0gQ29tcG9uZW50IGZvciB0aGUgcHJlam9pbiBwYWdlLCBkZWZhdWx0cyB0byBgV2VsY29tZVBhZ2VgLlxuICogQGlucHV0IHt7IGFwaVVzZXJOYW1lOiBzdHJpbmc7IGFwaUtleTogc3RyaW5nIH19IGNyZWRlbnRpYWxzIC0gQVBJIGNyZWRlbnRpYWxzIGZvciBzZWN1cmUgYWNjZXNzLlxuICogQGlucHV0IHtib29sZWFufSB1c2VMb2NhbFVJTW9kZSAtIEZsYWcgdG8gdG9nZ2xlIGxvY2FsIFVJIHNldHRpbmdzLlxuICogQGlucHV0IHtTZWVkRGF0YX0gc2VlZERhdGEgLSBTZWVkIGRhdGEgZm9yIGluaXRpYWxpemluZyB0aGUgY29tcG9uZW50IHdpdGggc3BlY2lmaWMgY29uZmlndXJhdGlvbnMuXG4gKiBAaW5wdXQge2Jvb2xlYW59IHVzZVNlZWQgLSBFbmFibGUvZGlzYWJsZSB1c2Ugb2Ygc2VlZCBkYXRhLlxuICogQGlucHV0IHtzdHJpbmd9IGltZ1NyYyAtIFVSTCBmb3IgYnJhbmRpbmcgaW1hZ2VzIG9yIGxvZ29zLlxuICpcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSB0aXRsZSAtIFRoZSB0aXRsZSBvZiB0aGUgY29tcG9uZW50LCBkZWZhdWx0cyB0byBcIk1lZGlhU0ZVLUdlbmVyaWNcIi5cbiAqXG4gKiBAc3R5bGVzXG4gKiBDb21wb25lbnQtc3BlY2lmaWMgc3R5bGVzLCBpbmNsdWRpbmcgZnVsbC1zY3JlZW4gc2V0dGluZ3MgYW5kIGN1c3RvbWl6YWJsZSBjb2xvcnMgZm9yIGJhY2tncm91bmRzLlxuICpcbiAqIEBwcm92aWRlcnMgW0Nvb2tpZVNlcnZpY2VdIC0gUHJvdmlkZXMgY29va2llcyBzZXJ2aWNlIGZvciBzZXNzaW9uIGhhbmRsaW5nLlxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICogQGNsYXNzIE1lZGlhc2Z1R2VuZXJpY1xuICogQGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3lcbiAqXG4gKiBAbWV0aG9kIG5nT25Jbml0IC0gSW5pdGlhbGl6ZXMgdGhlIGNvbXBvbmVudCBhbmQgaXRzIGNvbmZpZ3VyYXRpb25zLlxuICogQG1ldGhvZCBuZ09uRGVzdHJveSAtIFBlcmZvcm1zIGNsZWFudXAsIHJlbW92aW5nIGV2ZW50IGxpc3RlbmVycyBhbmQgaW50ZXJ2YWxzIGFzIG5lZWRlZC5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgaHRtbFxuICogPGFwcC1tZWRpYXNmdS1nZW5lcmljXG4gKiAgIFtQcmVqb2luUGFnZV09XCJDdXN0b21QcmVqb2luQ29tcG9uZW50XCJcbiAqICAgW2NyZWRlbnRpYWxzXT1cInsgYXBpVXNlck5hbWU6ICd1c2VybmFtZScsIGFwaUtleTogJ2FwaWtleScgfVwiXG4gKiAgIFt1c2VMb2NhbFVJTW9kZV09XCJ0cnVlXCJcbiAqICAgW3NlZWREYXRhXT1cInNlZWREYXRhT2JqZWN0XCJcbiAqICAgW3VzZVNlZWRdPVwidHJ1ZVwiXG4gKiAgIGltZ1NyYz1cImh0dHBzOi8vZXhhbXBsZS5jb20vbG9nby5wbmdcIj5cbiAqIDwvYXBwLW1lZGlhc2Z1LWdlbmVyaWM+XG4gKiBgYGBcbiAqL1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1tZWRpYXNmdS1nZW5lcmljJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW1xuICAgIFJvdXRlck91dGxldCxcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgQnJlYWtvdXRSb29tc01vZGFsLFxuICAgIEJhY2tncm91bmRNb2RhbCxcbiAgICBDb0hvc3RNb2RhbCxcbiAgICBBbGVydENvbXBvbmVudCxcbiAgICBBdWRpb0dyaWQsXG4gICAgQ29udHJvbEJ1dHRvbnNBbHRDb21wb25lbnQsXG4gICAgQ29udHJvbEJ1dHRvbnNDb21wb25lbnRUb3VjaCxcbiAgICBDb250cm9sQnV0dG9uc0NvbXBvbmVudCxcbiAgICBGbGV4aWJsZUdyaWQsXG4gICAgRmxleGlibGVWaWRlbyxcbiAgICBMb2FkaW5nTW9kYWwsXG4gICAgUGFnaW5hdGlvbixcbiAgICBTdWJBc3BlY3RDb21wb25lbnQsXG4gICAgRGlzcGxheVNldHRpbmdzTW9kYWwsXG4gICAgRXZlbnRTZXR0aW5nc01vZGFsLFxuICAgIENvbmZpcm1FeGl0TW9kYWwsXG4gICAgTWVkaWFTZXR0aW5nc01vZGFsLFxuICAgIE1lbnVNb2RhbCxcbiAgICBNZXNzYWdlc01vZGFsLFxuICAgIENvbmZpcm1IZXJlTW9kYWwsXG4gICAgU2hhcmVFdmVudE1vZGFsLFxuICAgIFdlbGNvbWVQYWdlLFxuICAgIFBhcnRpY2lwYW50c01vZGFsLFxuICAgIFBvbGxNb2RhbCxcbiAgICBSZWNvcmRpbmdNb2RhbCxcbiAgICBSZXF1ZXN0c01vZGFsLFxuICAgIE1haW5Bc3BlY3RDb21wb25lbnQsXG4gICAgTWFpbkNvbnRhaW5lckNvbXBvbmVudCxcbiAgICBNYWluR3JpZENvbXBvbmVudCxcbiAgICBNYWluU2NyZWVuQ29tcG9uZW50LFxuICAgIE90aGVyR3JpZENvbXBvbmVudCxcbiAgICBTY3JlZW5ib2FyZCxcbiAgICBTY3JlZW5ib2FyZE1vZGFsLFxuICAgIFdoaXRlYm9hcmQsXG4gICAgQ29uZmlndXJlV2hpdGVib2FyZE1vZGFsLFxuICAgIFdhaXRpbmdSb29tTW9kYWwsXG4gICAgTWVudVdpZGdldCxcbiAgICBNZXNzYWdlV2lkZ2V0LFxuICAgIE1lbnVSZWNvcmRXaWRnZXQsXG4gICAgUmVjb3JkVGltZXJXaWRnZXQsXG4gICAgTWVudVBhcnRpY2lwYW50c1dpZGdldCxcbiAgICBTY3JlZW5TaGFyZVdpZGdldCxcbiAgXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2XG4gICAgICBjbGFzcz1cIk1lZGlhU0ZVXCJcbiAgICAgIFtuZ1N0eWxlXT1cIntcbiAgICAgICAgaGVpZ2h0OiAnMTAwdmgnLFxuICAgICAgICB3aWR0aDogJzEwMHZ3JyxcbiAgICAgICAgbWF4V2lkdGg6ICcxMDB2dycsXG4gICAgICAgIG1heEhlaWdodDogJzEwMHZoJyxcbiAgICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nXG4gICAgICB9XCJcbiAgICA+XG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIXZhbGlkYXRlZC52YWx1ZTsgZWxzZSBtYWluQ29udGVudFwiPlxuICAgICAgICA8bmctY29udGFpbmVyXG4gICAgICAgICAgKm5nQ29tcG9uZW50T3V0bGV0PVwiXG4gICAgICAgICAgICBQcmVqb2luUGFnZUNvbXBvbmVudC5jb21wb25lbnQ7XG4gICAgICAgICAgICBpbmplY3RvcjogUHJlam9pblBhZ2VDb21wb25lbnQuaW5qZWN0b3JcbiAgICAgICAgICBcIlxuICAgICAgICA+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICAgIDxuZy10ZW1wbGF0ZSAjbWFpbkNvbnRlbnQ+XG4gICAgICAgIDxhcHAtbWFpbi1jb250YWluZXItY29tcG9uZW50PlxuICAgICAgICAgIDxhcHAtbWFpbi1hc3BlY3QtY29tcG9uZW50XG4gICAgICAgICAgICBbYmFja2dyb3VuZENvbG9yXT1cIidyZ2JhKDIxNywgMjI3LCAyMzQsIDAuOTkpJ1wiXG4gICAgICAgICAgICBbZGVmYXVsdEZyYWN0aW9uXT1cIjEgLSBjb250cm9sSGVpZ2h0LnZhbHVlXCJcbiAgICAgICAgICAgIFtzaG93Q29udHJvbHNdPVwiZXZlbnRUeXBlLnZhbHVlID09PSAnd2ViaW5hcicgfHwgZXZlbnRUeXBlLnZhbHVlID09PSAnY29uZmVyZW5jZSdcIlxuICAgICAgICAgICAgW3VwZGF0ZUlzV2lkZVNjcmVlbl09XCJ1cGRhdGVJc1dpZGVTY3JlZW5cIlxuICAgICAgICAgICAgW3VwZGF0ZUlzTWVkaXVtU2NyZWVuXT1cInVwZGF0ZUlzTWVkaXVtU2NyZWVuXCJcbiAgICAgICAgICAgIFt1cGRhdGVJc1NtYWxsU2NyZWVuXT1cInVwZGF0ZUlzU21hbGxTY3JlZW5cIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxhcHAtbWFpbi1zY3JlZW4tY29tcG9uZW50XG4gICAgICAgICAgICAgIFtkb1N0YWNrXT1cInRydWVcIlxuICAgICAgICAgICAgICBbbWFpblNpemVdPVwibWFpbkhlaWdodFdpZHRoLnZhbHVlXCJcbiAgICAgICAgICAgICAgW2RlZmF1bHRGcmFjdGlvbl09XCIxIC0gY29udHJvbEhlaWdodC52YWx1ZVwiXG4gICAgICAgICAgICAgIFtzaG93Q29udHJvbHNdPVwiZXZlbnRUeXBlLnZhbHVlID09PSAnd2ViaW5hcicgfHwgZXZlbnRUeXBlLnZhbHVlID09PSAnY29uZmVyZW5jZSdcIlxuICAgICAgICAgICAgICBbdXBkYXRlQ29tcG9uZW50U2l6ZXNdPVwidXBkYXRlQ29tcG9uZW50U2l6ZXNcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8YXBwLW1haW4tZ3JpZC1jb21wb25lbnRcbiAgICAgICAgICAgICAgICBbaGVpZ2h0XT1cImNvbXBvbmVudFNpemVzLnZhbHVlLm1haW5IZWlnaHRcIlxuICAgICAgICAgICAgICAgIFt3aWR0aF09XCJjb21wb25lbnRTaXplcy52YWx1ZS5tYWluV2lkdGhcIlxuICAgICAgICAgICAgICAgIFtiYWNrZ3JvdW5kQ29sb3JdPVwiJ3JnYmEoMjE3LCAyMjcsIDIzNCwgMC45OSknXCJcbiAgICAgICAgICAgICAgICBbbWFpblNpemVdPVwibWFpbkhlaWdodFdpZHRoLnZhbHVlXCJcbiAgICAgICAgICAgICAgICBbc2hvd0FzcGVjdF09XCJtYWluSGVpZ2h0V2lkdGgudmFsdWUgPiAwXCJcbiAgICAgICAgICAgICAgICBbdGltZUJhY2tncm91bmRDb2xvcl09XCJyZWNvcmRTdGF0ZS52YWx1ZVwiXG4gICAgICAgICAgICAgICAgW21lZXRpbmdQcm9ncmVzc1RpbWVdPVwibWVldGluZ1Byb2dyZXNzVGltZS52YWx1ZVwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8YXBwLWZsZXhpYmxlLXZpZGVvXG4gICAgICAgICAgICAgICAgICBbY3VzdG9tV2lkdGhdPVwiY29tcG9uZW50U2l6ZXMudmFsdWUubWFpbldpZHRoXCJcbiAgICAgICAgICAgICAgICAgIFtjdXN0b21IZWlnaHRdPVwiY29tcG9uZW50U2l6ZXMudmFsdWUubWFpbkhlaWdodFwiXG4gICAgICAgICAgICAgICAgICBbcm93c109XCIxXCJcbiAgICAgICAgICAgICAgICAgIFtjb2x1bW5zXT1cIjFcIlxuICAgICAgICAgICAgICAgICAgW2NvbXBvbmVudHNUb1JlbmRlcl09XCJtYWluR3JpZFN0cmVhbS52YWx1ZVwiXG4gICAgICAgICAgICAgICAgICBbc2hvd0FzcGVjdF09XCJcbiAgICAgICAgICAgICAgICAgICAgbWFpbkdyaWRTdHJlYW0udmFsdWUubGVuZ3RoID4gMCAmJlxuICAgICAgICAgICAgICAgICAgICAhKHdoaXRlYm9hcmRTdGFydGVkLnZhbHVlICYmICF3aGl0ZWJvYXJkRW5kZWQudmFsdWUpXG4gICAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgW2xvY2FsU3RyZWFtU2NyZWVuXT1cImxvY2FsU3RyZWFtU2NyZWVuLnZhbHVlIVwiXG4gICAgICAgICAgICAgICAgICBbYW5ub3RhdGVTY3JlZW5TdHJlYW1dPVwiYW5ub3RhdGVTY3JlZW5TdHJlYW0udmFsdWVcIlxuICAgICAgICAgICAgICAgICAgW1NjcmVlbmJvYXJkXT1cInNoYXJlZC52YWx1ZSA/IFNjcmVlbmJvYXJkV2lkZ2V0IDogdW5kZWZpbmVkXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPC9hcHAtZmxleGlibGUtdmlkZW8+XG4gICAgICAgICAgICAgICAgPGFwcC13aGl0ZWJvYXJkXG4gICAgICAgICAgICAgICAgICBbY3VzdG9tV2lkdGhdPVwiY29tcG9uZW50U2l6ZXMudmFsdWUubWFpbldpZHRoXCJcbiAgICAgICAgICAgICAgICAgIFtjdXN0b21IZWlnaHRdPVwiY29tcG9uZW50U2l6ZXMudmFsdWUubWFpbkhlaWdodFwiXG4gICAgICAgICAgICAgICAgICBbcGFyYW1ldGVyc109XCJtZWRpYVNGVVBhcmFtZXRlcnNcIlxuICAgICAgICAgICAgICAgICAgW3Nob3dBc3BlY3RdPVwid2hpdGVib2FyZFN0YXJ0ZWQudmFsdWUgJiYgIXdoaXRlYm9hcmRFbmRlZC52YWx1ZVwiXG4gICAgICAgICAgICAgICAgPjwvYXBwLXdoaXRlYm9hcmQ+XG4gICAgICAgICAgICAgICAgPGFwcC1jb250cm9sLWJ1dHRvbnMtY29tcG9uZW50LXRvdWNoXG4gICAgICAgICAgICAgICAgICBbYnV0dG9uc109XCJjb250cm9sQnJvYWRjYXN0QnV0dG9uc1wiXG4gICAgICAgICAgICAgICAgICBbcG9zaXRpb25dPVwiJ3JpZ2h0J1wiXG4gICAgICAgICAgICAgICAgICBbbG9jYXRpb25dPVwiJ2JvdHRvbSdcIlxuICAgICAgICAgICAgICAgICAgW2RpcmVjdGlvbl09XCIndmVydGljYWwnXCJcbiAgICAgICAgICAgICAgICAgIFtzaG93QXNwZWN0XT1cImV2ZW50VHlwZS52YWx1ZSA9PT0gJ2Jyb2FkY2FzdCdcIlxuICAgICAgICAgICAgICAgID48L2FwcC1jb250cm9sLWJ1dHRvbnMtY29tcG9uZW50LXRvdWNoPlxuICAgICAgICAgICAgICAgIDxhcHAtY29udHJvbC1idXR0b25zLWNvbXBvbmVudC10b3VjaFxuICAgICAgICAgICAgICAgICAgW2J1dHRvbnNdPVwicmVjb3JkQnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIFtkaXJlY3Rpb25dPVwiJ2hvcml6b250YWwnXCJcbiAgICAgICAgICAgICAgICAgIFtzaG93QXNwZWN0XT1cIlxuICAgICAgICAgICAgICAgICAgICBldmVudFR5cGUudmFsdWUgPT09ICdicm9hZGNhc3QnICYmXG4gICAgICAgICAgICAgICAgICAgICFzaG93UmVjb3JkQnV0dG9ucy52YWx1ZSAmJlxuICAgICAgICAgICAgICAgICAgICBpc2xldmVsLnZhbHVlID09PSAnMidcbiAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICBbbG9jYXRpb25dPVwiJ2JvdHRvbSdcIlxuICAgICAgICAgICAgICAgICAgW3Bvc2l0aW9uXT1cIidtaWRkbGUnXCJcbiAgICAgICAgICAgICAgICA+PC9hcHAtY29udHJvbC1idXR0b25zLWNvbXBvbmVudC10b3VjaD5cbiAgICAgICAgICAgICAgICA8YXBwLWNvbnRyb2wtYnV0dG9ucy1jb21wb25lbnQtdG91Y2hcbiAgICAgICAgICAgICAgICAgIFtidXR0b25zXT1cInJlY29yZEJ1dHRvbnNcIlxuICAgICAgICAgICAgICAgICAgW2RpcmVjdGlvbl09XCInaG9yaXpvbnRhbCdcIlxuICAgICAgICAgICAgICAgICAgW3Nob3dBc3BlY3RdPVwiXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50VHlwZS52YWx1ZSA9PT0gJ2Jyb2FkY2FzdCcgJiZcbiAgICAgICAgICAgICAgICAgICAgc2hvd1JlY29yZEJ1dHRvbnMudmFsdWUgJiZcbiAgICAgICAgICAgICAgICAgICAgaXNsZXZlbC52YWx1ZSA9PT0gJzInXG4gICAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgW2xvY2F0aW9uXT1cIidib3R0b20nXCJcbiAgICAgICAgICAgICAgICAgIFtwb3NpdGlvbl09XCInbWlkZGxlJ1wiXG4gICAgICAgICAgICAgICAgPjwvYXBwLWNvbnRyb2wtYnV0dG9ucy1jb21wb25lbnQtdG91Y2g+XG4gICAgICAgICAgICAgIDwvYXBwLW1haW4tZ3JpZC1jb21wb25lbnQ+XG5cbiAgICAgICAgICAgICAgPGFwcC1vdGhlci1ncmlkLWNvbXBvbmVudFxuICAgICAgICAgICAgICAgIFtoZWlnaHRdPVwiY29tcG9uZW50U2l6ZXMudmFsdWUub3RoZXJIZWlnaHRcIlxuICAgICAgICAgICAgICAgIFt3aWR0aF09XCJjb21wb25lbnRTaXplcy52YWx1ZS5vdGhlcldpZHRoXCJcbiAgICAgICAgICAgICAgICBbYmFja2dyb3VuZENvbG9yXT1cIidyZ2JhKDIxNywgMjI3LCAyMzQsIDAuOTkpJ1wiXG4gICAgICAgICAgICAgICAgW3Nob3dBc3BlY3RdPVwibWFpbkhlaWdodFdpZHRoLnZhbHVlICE9PSAxMDBcIlxuICAgICAgICAgICAgICAgIFt0aW1lQmFja2dyb3VuZENvbG9yXT1cInJlY29yZFN0YXRlLnZhbHVlXCJcbiAgICAgICAgICAgICAgICBbc2hvd1RpbWVyXT1cIm1haW5IZWlnaHRXaWR0aC52YWx1ZSA9PT0gMFwiXG4gICAgICAgICAgICAgICAgW21lZXRpbmdQcm9ncmVzc1RpbWVdPVwibWVldGluZ1Byb2dyZXNzVGltZS52YWx1ZVwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAqbmdJZj1cImRvUGFnaW5hdGUudmFsdWVcIlxuICAgICAgICAgICAgICAgICAgW25nU3R5bGVdPVwie1xuICAgICAgICAgICAgICAgICAgICB3aWR0aDpcbiAgICAgICAgICAgICAgICAgICAgICBwYWdpbmF0aW9uRGlyZWN0aW9uLnZhbHVlID09ICdob3Jpem9udGFsJ1xuICAgICAgICAgICAgICAgICAgICAgICAgPyBjb21wb25lbnRTaXplcy52YWx1ZS5vdGhlcldpZHRoXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHBhZ2luYXRpb25IZWlnaHRXaWR0aC52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OlxuICAgICAgICAgICAgICAgICAgICAgIHBhZ2luYXRpb25EaXJlY3Rpb24udmFsdWUgPT0gJ2hvcml6b250YWwnXG4gICAgICAgICAgICAgICAgICAgICAgICA/IHBhZ2luYXRpb25IZWlnaHRXaWR0aC52YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgOiBjb21wb25lbnRTaXplcy52YWx1ZS5vdGhlckhlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogZG9QYWdpbmF0ZS52YWx1ZSA/ICdmbGV4JyA6ICdub25lJyxcbiAgICAgICAgICAgICAgICAgICAgJ2ZsZXgtZGlyZWN0aW9uJzogcGFnaW5hdGlvbkRpcmVjdGlvbi52YWx1ZSA9PSAnaG9yaXpvbnRhbCcgPyAncm93JyA6ICdjb2x1bW4nLFxuICAgICAgICAgICAgICAgICAgICAnanVzdGlmeS1jb250ZW50JzogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgICdhbGlnbi1pdGVtcyc6ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAnMCcsXG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbjogJzAnXG4gICAgICAgICAgICAgICAgICB9XCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8YXBwLXBhZ2luYXRpb25cbiAgICAgICAgICAgICAgICAgICAgW3RvdGFsUGFnZXNdPVwibnVtYmVyUGFnZXMudmFsdWVcIlxuICAgICAgICAgICAgICAgICAgICBbY3VycmVudFVzZXJQYWdlXT1cImN1cnJlbnRVc2VyUGFnZS52YWx1ZVwiXG4gICAgICAgICAgICAgICAgICAgIFtzaG93QXNwZWN0XT1cImRvUGFnaW5hdGUudmFsdWVcIlxuICAgICAgICAgICAgICAgICAgICBbcGFnaW5hdGlvbkhlaWdodF09XCJwYWdpbmF0aW9uSGVpZ2h0V2lkdGgudmFsdWVcIlxuICAgICAgICAgICAgICAgICAgICBbZGlyZWN0aW9uXT1cInBhZ2luYXRpb25EaXJlY3Rpb24udmFsdWVcIlxuICAgICAgICAgICAgICAgICAgICBbcGFyYW1ldGVyc109XCJtZWRpYVNGVVBhcmFtZXRlcnNcIlxuICAgICAgICAgICAgICAgICAgPjwvYXBwLXBhZ2luYXRpb24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8YXBwLWF1ZGlvLWdyaWQgW2NvbXBvbmVudHNUb1JlbmRlcl09XCJhdWRpb09ubHlTdHJlYW1zLnZhbHVlXCI+PC9hcHAtYXVkaW8tZ3JpZD5cbiAgICAgICAgICAgICAgICA8YXBwLWNvbnRyb2wtYnV0dG9ucy1jb21wb25lbnQtdG91Y2hcbiAgICAgICAgICAgICAgICAgIFtidXR0b25zXT1cImNvbnRyb2xDaGF0QnV0dG9uc1wiXG4gICAgICAgICAgICAgICAgICBbcG9zaXRpb25dPVwiJ3JpZ2h0J1wiXG4gICAgICAgICAgICAgICAgICBbbG9jYXRpb25dPVwiJ2JvdHRvbSdcIlxuICAgICAgICAgICAgICAgICAgW2RpcmVjdGlvbl09XCIndmVydGljYWwnXCJcbiAgICAgICAgICAgICAgICAgIFtzaG93QXNwZWN0XT1cImV2ZW50VHlwZS52YWx1ZSA9PT0gJ2NoYXQnXCJcbiAgICAgICAgICAgICAgICA+PC9hcHAtY29udHJvbC1idXR0b25zLWNvbXBvbmVudC10b3VjaD5cbiAgICAgICAgICAgICAgICA8YXBwLWZsZXhpYmxlLWdyaWRcbiAgICAgICAgICAgICAgICAgIFtjdXN0b21XaWR0aF09XCJncmlkU2l6ZXMudmFsdWUuZ3JpZFdpZHRoIVwiXG4gICAgICAgICAgICAgICAgICBbY3VzdG9tSGVpZ2h0XT1cImdyaWRTaXplcy52YWx1ZS5ncmlkSGVpZ2h0IVwiXG4gICAgICAgICAgICAgICAgICBbcm93c109XCJncmlkUm93cy52YWx1ZVwiXG4gICAgICAgICAgICAgICAgICBbY29sdW1uc109XCJncmlkQ29scy52YWx1ZVwiXG4gICAgICAgICAgICAgICAgICBbY29tcG9uZW50c1RvUmVuZGVyXT1cIm90aGVyR3JpZFN0cmVhbXMudmFsdWVbMF1cIlxuICAgICAgICAgICAgICAgICAgW2JhY2tncm91bmRDb2xvcl09XCIncmdiYSgyMTcsIDIyNywgMjM0LCAwLjk5KSdcIlxuICAgICAgICAgICAgICAgID48L2FwcC1mbGV4aWJsZS1ncmlkPlxuICAgICAgICAgICAgICAgIDxhcHAtZmxleGlibGUtZ3JpZFxuICAgICAgICAgICAgICAgICAgW2N1c3RvbVdpZHRoXT1cImdyaWRTaXplcy52YWx1ZS5hbHRHcmlkV2lkdGghXCJcbiAgICAgICAgICAgICAgICAgIFtjdXN0b21IZWlnaHRdPVwiZ3JpZFNpemVzLnZhbHVlLmFsdEdyaWRIZWlnaHQhXCJcbiAgICAgICAgICAgICAgICAgIFtyb3dzXT1cImFsdEdyaWRSb3dzLnZhbHVlXCJcbiAgICAgICAgICAgICAgICAgIFtjb2x1bW5zXT1cImFsdEdyaWRDb2xzLnZhbHVlXCJcbiAgICAgICAgICAgICAgICAgIFtjb21wb25lbnRzVG9SZW5kZXJdPVwib3RoZXJHcmlkU3RyZWFtcy52YWx1ZVsxXVwiXG4gICAgICAgICAgICAgICAgICBbYmFja2dyb3VuZENvbG9yXT1cIidyZ2JhKDIxNywgMjI3LCAyMzQsIDAuOTkpJ1wiXG4gICAgICAgICAgICAgICAgPjwvYXBwLWZsZXhpYmxlLWdyaWQ+XG4gICAgICAgICAgICAgIDwvYXBwLW90aGVyLWdyaWQtY29tcG9uZW50PlxuICAgICAgICAgICAgPC9hcHAtbWFpbi1zY3JlZW4tY29tcG9uZW50PlxuICAgICAgICAgIDwvYXBwLW1haW4tYXNwZWN0LWNvbXBvbmVudD5cblxuICAgICAgICAgIDxhcHAtc3ViLWFzcGVjdC1jb21wb25lbnRcbiAgICAgICAgICAgIFtiYWNrZ3JvdW5kQ29sb3JdPVwiJ3JnYmEoMjE3LCAyMjcsIDIzNCwgMC45OSknXCJcbiAgICAgICAgICAgIFtzaG93Q29udHJvbHNdPVwiZXZlbnRUeXBlLnZhbHVlID09PSAnd2ViaW5hcicgfHwgZXZlbnRUeXBlLnZhbHVlID09PSAnY29uZmVyZW5jZSdcIlxuICAgICAgICAgICAgW2RlZmF1bHRGcmFjdGlvblN1Yl09XCJjb250cm9sSGVpZ2h0LnZhbHVlXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8YXBwLWNvbnRyb2wtYnV0dG9ucy1jb21wb25lbnRcbiAgICAgICAgICAgICAgW2J1dHRvbnNdPVwiY29udHJvbEJ1dHRvbnNcIlxuICAgICAgICAgICAgICBbYnV0dG9uQ29sb3JdPVwiJ2JsYWNrJ1wiXG4gICAgICAgICAgICAgIFtidXR0b25CYWNrZ3JvdW5kQ29sb3JdPVwie1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6ICd0cmFuc3BhcmVudCcsXG4gICAgICAgICAgICAgICAgcHJlc3NlZDogJ3RyYW5zcGFyZW50J1xuICAgICAgICAgICAgICB9XCJcbiAgICAgICAgICAgICAgW2FsaWdubWVudF09XCInc3BhY2UtYmV0d2VlbidcIlxuICAgICAgICAgICAgICBbdmVydGljYWxdPVwiZmFsc2VcIlxuICAgICAgICAgICAgICBbYnV0dG9uc0NvbnRhaW5lclN0eWxlXT1cIntcbiAgICAgICAgICAgICAgICBtYXJnaW5Ub3A6ICcwJyxcbiAgICAgICAgICAgICAgICBtYXJnaW5Cb3R0b206ICcwJyxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd0cmFuc3BhcmVudCdcbiAgICAgICAgICAgICAgfVwiXG4gICAgICAgICAgICA+PC9hcHAtY29udHJvbC1idXR0b25zLWNvbXBvbmVudD5cbiAgICAgICAgICA8L2FwcC1zdWItYXNwZWN0LWNvbXBvbmVudD5cbiAgICAgICAgPC9hcHAtbWFpbi1jb250YWluZXItY29tcG9uZW50PlxuICAgICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgICAgPGFwcC1tZW51LW1vZGFsXG4gICAgICAgIFtiYWNrZ3JvdW5kQ29sb3JdPVwiJ3JnYmEoMTgxLCAyMzMsIDIyOSwgMC45NyknXCJcbiAgICAgICAgW2lzVmlzaWJsZV09XCJpc01lbnVNb2RhbFZpc2libGUudmFsdWVcIlxuICAgICAgICBbb25DbG9zZV09XCJvbkNsb3NlTWVudU1vZGFsXCJcbiAgICAgICAgW2N1c3RvbUJ1dHRvbnNdPVwiY3VzdG9tTWVudUJ1dHRvbnNcIlxuICAgICAgICBbcm9vbU5hbWVdPVwicm9vbU5hbWUudmFsdWVcIlxuICAgICAgICBbYWRtaW5QYXNzY29kZV09XCJhZG1pblBhc3Njb2RlLnZhbHVlXCJcbiAgICAgICAgW2lzbGV2ZWxdPVwiaXNsZXZlbC52YWx1ZVwiXG4gICAgICA+PC9hcHAtbWVudS1tb2RhbD5cblxuICAgICAgPGFwcC1ldmVudC1zZXR0aW5ncy1tb2RhbFxuICAgICAgICBbYmFja2dyb3VuZENvbG9yXT1cIidyZ2JhKDIxNywgMjI3LCAyMzQsIDAuOTkpJ1wiXG4gICAgICAgIFtpc0V2ZW50U2V0dGluZ3NNb2RhbFZpc2libGVdPVwiaXNTZXR0aW5nc01vZGFsVmlzaWJsZS52YWx1ZVwiXG4gICAgICAgIFtvbkV2ZW50U2V0dGluZ3NDbG9zZV09XCJvbkV2ZW50U2V0dGluZ3NDbG9zZVwiXG4gICAgICAgIFthdWRpb1NldHRpbmddPVwiYXVkaW9TZXR0aW5nLnZhbHVlXCJcbiAgICAgICAgW3ZpZGVvU2V0dGluZ109XCJ2aWRlb1NldHRpbmcudmFsdWVcIlxuICAgICAgICBbc2NyZWVuc2hhcmVTZXR0aW5nXT1cInNjcmVlbnNoYXJlU2V0dGluZy52YWx1ZVwiXG4gICAgICAgIFtjaGF0U2V0dGluZ109XCJjaGF0U2V0dGluZy52YWx1ZVwiXG4gICAgICAgIFt1cGRhdGVBdWRpb1NldHRpbmddPVwidXBkYXRlQXVkaW9TZXR0aW5nXCJcbiAgICAgICAgW3VwZGF0ZVZpZGVvU2V0dGluZ109XCJ1cGRhdGVWaWRlb1NldHRpbmdcIlxuICAgICAgICBbdXBkYXRlU2NyZWVuc2hhcmVTZXR0aW5nXT1cInVwZGF0ZVNjcmVlbnNoYXJlU2V0dGluZ1wiXG4gICAgICAgIFt1cGRhdGVDaGF0U2V0dGluZ109XCJ1cGRhdGVDaGF0U2V0dGluZ1wiXG4gICAgICAgIFt1cGRhdGVJc1NldHRpbmdzTW9kYWxWaXNpYmxlXT1cInVwZGF0ZUlzU2V0dGluZ3NNb2RhbFZpc2libGVcIlxuICAgICAgICBbcm9vbU5hbWVdPVwicm9vbU5hbWUudmFsdWVcIlxuICAgICAgICBbc29ja2V0XT1cInNvY2tldC52YWx1ZVwiXG4gICAgICAgIFtzaG93QWxlcnRdPVwic2hvd0FsZXJ0XCJcbiAgICAgID48L2FwcC1ldmVudC1zZXR0aW5ncy1tb2RhbD5cblxuICAgICAgPGFwcC1yZXF1ZXN0cy1tb2RhbFxuICAgICAgICBbYmFja2dyb3VuZENvbG9yXT1cIidyZ2JhKDIxNywgMjI3LCAyMzQsIDAuOTkpJ1wiXG4gICAgICAgIFtpc1JlcXVlc3RzTW9kYWxWaXNpYmxlXT1cImlzUmVxdWVzdHNNb2RhbFZpc2libGUudmFsdWVcIlxuICAgICAgICBbb25SZXF1ZXN0Q2xvc2VdPVwib25SZXF1ZXN0Q2xvc2VcIlxuICAgICAgICBbcmVxdWVzdENvdW50ZXJdPVwicmVxdWVzdENvdW50ZXIudmFsdWVcIlxuICAgICAgICBbb25SZXF1ZXN0RmlsdGVyQ2hhbmdlXT1cIm9uUmVxdWVzdEZpbHRlckNoYW5nZVwiXG4gICAgICAgIFt1cGRhdGVSZXF1ZXN0TGlzdF09XCJ1cGRhdGVSZXF1ZXN0TGlzdFwiXG4gICAgICAgIFtyZXF1ZXN0TGlzdF09XCJmaWx0ZXJlZFJlcXVlc3RMaXN0LnZhbHVlXCJcbiAgICAgICAgW3Jvb21OYW1lXT1cInJvb21OYW1lLnZhbHVlXCJcbiAgICAgICAgW3NvY2tldF09XCJzb2NrZXQudmFsdWVcIlxuICAgICAgICBbcGFyYW1ldGVyc109XCJtZWRpYVNGVVBhcmFtZXRlcnNcIlxuICAgICAgPjwvYXBwLXJlcXVlc3RzLW1vZGFsPlxuXG4gICAgICA8YXBwLXdhaXRpbmctcm9vbS1tb2RhbFxuICAgICAgICBbYmFja2dyb3VuZENvbG9yXT1cIidyZ2JhKDIxNywgMjI3LCAyMzQsIDAuOTkpJ1wiXG4gICAgICAgIFtpc1dhaXRpbmdNb2RhbFZpc2libGVdPVwiaXNXYWl0aW5nTW9kYWxWaXNpYmxlLnZhbHVlXCJcbiAgICAgICAgW29uV2FpdGluZ1Jvb21DbG9zZV09XCJvbldhaXRpbmdSb29tQ2xvc2VcIlxuICAgICAgICBbd2FpdGluZ1Jvb21Db3VudGVyXT1cIndhaXRpbmdSb29tQ291bnRlci52YWx1ZVwiXG4gICAgICAgIFtvbldhaXRpbmdSb29tRmlsdGVyQ2hhbmdlXT1cIm9uV2FpdGluZ1Jvb21GaWx0ZXJDaGFuZ2VcIlxuICAgICAgICBbd2FpdGluZ1Jvb21MaXN0XT1cImZpbHRlcmVkV2FpdGluZ1Jvb21MaXN0LnZhbHVlXCJcbiAgICAgICAgW3VwZGF0ZVdhaXRpbmdMaXN0XT1cInVwZGF0ZVdhaXRpbmdSb29tTGlzdFwiXG4gICAgICAgIFtyb29tTmFtZV09XCJyb29tTmFtZS52YWx1ZVwiXG4gICAgICAgIFtzb2NrZXRdPVwic29ja2V0LnZhbHVlXCJcbiAgICAgICAgW3BhcmFtZXRlcnNdPVwie1xuICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcmVkV2FpdGluZ1Jvb21MaXN0OiB3YWl0aW5nUm9vbUxpc3QudmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgZ2V0VXBkYXRlZEFsbFBhcmFtczogZ2V0VXBkYXRlZEFsbFBhcmFtcyxcbiAgICAgICAgICAgICAgICAgICAgfVwiXG4gICAgICA+PC9hcHAtd2FpdGluZy1yb29tLW1vZGFsPlxuXG4gICAgICA8YXBwLWNvLWhvc3QtbW9kYWxcbiAgICAgICAgW2JhY2tncm91bmRDb2xvcl09XCIncmdiYSgyMTcsIDIyNywgMjM0LCAwLjk5KSdcIlxuICAgICAgICBbaXNDb0hvc3RNb2RhbFZpc2libGVdPVwiaXNDb0hvc3RNb2RhbFZpc2libGUudmFsdWVcIlxuICAgICAgICBbb25Db0hvc3RDbG9zZV09XCJvbkNvSG9zdENsb3NlXCJcbiAgICAgICAgW2NvSG9zdFJlc3BvbnNpYmlsaXR5XT1cImNvSG9zdFJlc3BvbnNpYmlsaXR5LnZhbHVlXCJcbiAgICAgICAgW3BhcnRpY2lwYW50c109XCJwYXJ0aWNpcGFudHMudmFsdWVcIlxuICAgICAgICBbY3VycmVudENvaG9zdF09XCJjb0hvc3QudmFsdWVcIlxuICAgICAgICBbcm9vbU5hbWVdPVwicm9vbU5hbWUudmFsdWVcIlxuICAgICAgICBbc2hvd0FsZXJ0XT1cInNob3dBbGVydFwiXG4gICAgICAgIFt1cGRhdGVDb0hvc3RSZXNwb25zaWJpbGl0eV09XCJ1cGRhdGVDb0hvc3RSZXNwb25zaWJpbGl0eVwiXG4gICAgICAgIFt1cGRhdGVDb0hvc3RdPVwidXBkYXRlQ29Ib3N0XCJcbiAgICAgICAgW3VwZGF0ZUlzQ29Ib3N0TW9kYWxWaXNpYmxlXT1cInVwZGF0ZUlzQ29Ib3N0TW9kYWxWaXNpYmxlXCJcbiAgICAgICAgW3NvY2tldF09XCJzb2NrZXQudmFsdWVcIlxuICAgICAgPjwvYXBwLWNvLWhvc3QtbW9kYWw+XG5cbiAgICAgIDxhcHAtbWVkaWEtc2V0dGluZ3MtbW9kYWxcbiAgICAgICAgW2JhY2tncm91bmRDb2xvcl09XCIncmdiYSgxODEsIDIzMywgMjI5LCAwLjk3KSdcIlxuICAgICAgICBbaXNNZWRpYVNldHRpbmdzTW9kYWxWaXNpYmxlXT1cImlzTWVkaWFTZXR0aW5nc01vZGFsVmlzaWJsZS52YWx1ZVwiXG4gICAgICAgIFtvbk1lZGlhU2V0dGluZ3NDbG9zZV09XCJvbk1lZGlhU2V0dGluZ3NDbG9zZVwiXG4gICAgICAgIFtwYXJhbWV0ZXJzXT1cIm1lZGlhU0ZVUGFyYW1ldGVyc1wiXG4gICAgICA+PC9hcHAtbWVkaWEtc2V0dGluZ3MtbW9kYWw+XG5cbiAgICAgIDxhcHAtcGFydGljaXBhbnRzLW1vZGFsXG4gICAgICAgIFtiYWNrZ3JvdW5kQ29sb3JdPVwiJ3JnYmEoMjE3LCAyMjcsIDIzNCwgMC45OSknXCJcbiAgICAgICAgW2lzUGFydGljaXBhbnRzTW9kYWxWaXNpYmxlXT1cImlzUGFydGljaXBhbnRzTW9kYWxWaXNpYmxlLnZhbHVlXCJcbiAgICAgICAgW29uUGFydGljaXBhbnRzQ2xvc2VdPVwib25QYXJ0aWNpcGFudHNDbG9zZVwiXG4gICAgICAgIFtwYXJ0aWNpcGFudHNDb3VudGVyXT1cInBhcnRpY2lwYW50c0NvdW50ZXIudmFsdWVcIlxuICAgICAgICBbb25QYXJ0aWNpcGFudHNGaWx0ZXJDaGFuZ2VdPVwib25QYXJ0aWNpcGFudHNGaWx0ZXJDaGFuZ2VcIlxuICAgICAgICBbcGFyYW1ldGVyc109XCJ7XG4gICAgICAgICAgICAgIHVwZGF0ZVBhcnRpY2lwYW50czogdXBkYXRlUGFydGljaXBhbnRzLFxuICAgICAgICAgICAgICBmaWx0ZXJlZFBhcnRpY2lwYW50czogZmlsdGVyZWRQYXJ0aWNpcGFudHMudmFsdWUsXG4gICAgICAgICAgICAgIHVwZGF0ZUlzUGFydGljaXBhbnRzTW9kYWxWaXNpYmxlOiB1cGRhdGVJc1BhcnRpY2lwYW50c01vZGFsVmlzaWJsZSxcbiAgICAgICAgICAgICAgdXBkYXRlRGlyZWN0TWVzc2FnZURldGFpbHM6IHVwZGF0ZURpcmVjdE1lc3NhZ2VEZXRhaWxzLFxuICAgICAgICAgICAgICB1cGRhdGVTdGFydERpcmVjdE1lc3NhZ2U6IHVwZGF0ZVN0YXJ0RGlyZWN0TWVzc2FnZSxcbiAgICAgICAgICAgICAgdXBkYXRlSXNNZXNzYWdlc01vZGFsVmlzaWJsZTogdXBkYXRlSXNNZXNzYWdlc01vZGFsVmlzaWJsZSxcbiAgICAgICAgICAgICAgc2hvd0FsZXJ0OiBzaG93QWxlcnQsXG4gICAgICAgICAgICAgIHBhcnRpY2lwYW50czogZmlsdGVyZWRQYXJ0aWNpcGFudHMudmFsdWUsXG4gICAgICAgICAgICAgIHJvb21OYW1lOiByb29tTmFtZS52YWx1ZSxcbiAgICAgICAgICAgICAgaXNsZXZlbDogaXNsZXZlbC52YWx1ZSxcbiAgICAgICAgICAgICAgbWVtYmVyOiBtZW1iZXIudmFsdWUsXG4gICAgICAgICAgICAgIGNvSG9zdFJlc3BvbnNpYmlsaXR5OiBjb0hvc3RSZXNwb25zaWJpbGl0eS52YWx1ZSxcbiAgICAgICAgICAgICAgY29Ib3N0OiBjb0hvc3QudmFsdWUsXG4gICAgICAgICAgICAgIGV2ZW50VHlwZTogZXZlbnRUeXBlLnZhbHVlLFxuICAgICAgICAgICAgICBzdGFydERpcmVjdE1lc3NhZ2U6IHN0YXJ0RGlyZWN0TWVzc2FnZS52YWx1ZSxcbiAgICAgICAgICAgICAgZGlyZWN0TWVzc2FnZURldGFpbHM6IGRpcmVjdE1lc3NhZ2VEZXRhaWxzLnZhbHVlLFxuICAgICAgICAgICAgICBzb2NrZXQ6IHNvY2tldC52YWx1ZSxcbiAgICAgICAgICAgICAgZ2V0VXBkYXRlZEFsbFBhcmFtczogZ2V0VXBkYXRlZEFsbFBhcmFtcyxcbiAgICAgICAgICAgIH1cIlxuICAgICAgPjwvYXBwLXBhcnRpY2lwYW50cy1tb2RhbD5cblxuICAgICAgPGFwcC1kaXNwbGF5LXNldHRpbmdzLW1vZGFsXG4gICAgICAgIFtiYWNrZ3JvdW5kQ29sb3JdPVwiJ3JnYmEoMjE3LCAyMjcsIDIzNCwgMC45OSknXCJcbiAgICAgICAgW2lzRGlzcGxheVNldHRpbmdzTW9kYWxWaXNpYmxlXT1cImlzRGlzcGxheVNldHRpbmdzTW9kYWxWaXNpYmxlLnZhbHVlXCJcbiAgICAgICAgW29uRGlzcGxheVNldHRpbmdzQ2xvc2VdPVwib25EaXNwbGF5U2V0dGluZ3NDbG9zZVwiXG4gICAgICAgIFtwYXJhbWV0ZXJzXT1cIm1lZGlhU0ZVUGFyYW1ldGVyc1wiXG4gICAgICA+PC9hcHAtZGlzcGxheS1zZXR0aW5ncy1tb2RhbD5cblxuICAgICAgPGFwcC1yZWNvcmRpbmctbW9kYWxcbiAgICAgICAgW2JhY2tncm91bmRDb2xvcl09XCIncmdiYSgyMTcsIDIyNywgMjM0LCAwLjk5KSdcIlxuICAgICAgICBbaXNSZWNvcmRpbmdNb2RhbFZpc2libGVdPVwiaXNSZWNvcmRpbmdNb2RhbFZpc2libGUudmFsdWVcIlxuICAgICAgICBbb25DbG9zZV09XCJvblJlY29yZGluZ0Nsb3NlXCJcbiAgICAgICAgW3N0YXJ0UmVjb3JkaW5nXT1cInN0YXJ0UmVjb3JkaW5nLnN0YXJ0UmVjb3JkaW5nXCJcbiAgICAgICAgW2NvbmZpcm1SZWNvcmRpbmddPVwiY29uZmlybVJlY29yZGluZy5jb25maXJtUmVjb3JkaW5nXCJcbiAgICAgICAgW3BhcmFtZXRlcnNdPVwibWVkaWFTRlVQYXJhbWV0ZXJzXCJcbiAgICAgID48L2FwcC1yZWNvcmRpbmctbW9kYWw+XG5cbiAgICAgIDxhcHAtbWVzc2FnZXMtbW9kYWxcbiAgICAgICAgW2JhY2tncm91bmRDb2xvcl09XCJcbiAgICAgICAgICBldmVudFR5cGUudmFsdWUgPT09ICd3ZWJpbmFyJyB8fCBldmVudFR5cGUudmFsdWUgPT09ICdjb25mZXJlbmNlJ1xuICAgICAgICAgICAgPyAnI2Y1ZjVmNSdcbiAgICAgICAgICAgIDogJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMC4yNSknXG4gICAgICAgIFwiXG4gICAgICAgIFtpc01lc3NhZ2VzTW9kYWxWaXNpYmxlXT1cImlzTWVzc2FnZXNNb2RhbFZpc2libGUudmFsdWVcIlxuICAgICAgICBbb25NZXNzYWdlc0Nsb3NlXT1cIm9uTWVzc2FnZXNDbG9zZVwiXG4gICAgICAgIFttZXNzYWdlc109XCJtZXNzYWdlcy52YWx1ZVwiXG4gICAgICAgIFtldmVudFR5cGVdPVwiZXZlbnRUeXBlLnZhbHVlXCJcbiAgICAgICAgW21lbWJlcl09XCJtZW1iZXIudmFsdWVcIlxuICAgICAgICBbaXNsZXZlbF09XCJpc2xldmVsLnZhbHVlXCJcbiAgICAgICAgW2NvSG9zdFJlc3BvbnNpYmlsaXR5XT1cImNvSG9zdFJlc3BvbnNpYmlsaXR5LnZhbHVlXCJcbiAgICAgICAgW2NvSG9zdF09XCJjb0hvc3QudmFsdWVcIlxuICAgICAgICBbc3RhcnREaXJlY3RNZXNzYWdlXT1cInN0YXJ0RGlyZWN0TWVzc2FnZS52YWx1ZVwiXG4gICAgICAgIFtkaXJlY3RNZXNzYWdlRGV0YWlsc109XCJkaXJlY3RNZXNzYWdlRGV0YWlscy52YWx1ZVwiXG4gICAgICAgIFt1cGRhdGVTdGFydERpcmVjdE1lc3NhZ2VdPVwidXBkYXRlU3RhcnREaXJlY3RNZXNzYWdlXCJcbiAgICAgICAgW3VwZGF0ZURpcmVjdE1lc3NhZ2VEZXRhaWxzXT1cInVwZGF0ZURpcmVjdE1lc3NhZ2VEZXRhaWxzXCJcbiAgICAgICAgW3Nob3dBbGVydF09XCJzaG93QWxlcnRcIlxuICAgICAgICBbcm9vbU5hbWVdPVwicm9vbU5hbWUudmFsdWVcIlxuICAgICAgICBbc29ja2V0XT1cInNvY2tldC52YWx1ZVwiXG4gICAgICAgIFtjaGF0U2V0dGluZ109XCJjaGF0U2V0dGluZy52YWx1ZVwiXG4gICAgICA+PC9hcHAtbWVzc2FnZXMtbW9kYWw+XG5cbiAgICAgIDxhcHAtY29uZmlybS1leGl0LW1vZGFsXG4gICAgICAgIFtiYWNrZ3JvdW5kQ29sb3JdPVwiJ3JnYmEoMTgxLCAyMzMsIDIyOSwgMC45NyknXCJcbiAgICAgICAgW2lzQ29uZmlybUV4aXRNb2RhbFZpc2libGVdPVwiaXNDb25maXJtRXhpdE1vZGFsVmlzaWJsZS52YWx1ZVwiXG4gICAgICAgIFtvbkNvbmZpcm1FeGl0Q2xvc2VdPVwib25Db25maXJtRXhpdENsb3NlXCJcbiAgICAgICAgW3Bvc2l0aW9uXT1cIid0b3BSaWdodCdcIlxuICAgICAgICBbbWVtYmVyXT1cIm1lbWJlci52YWx1ZVwiXG4gICAgICAgIFtyb29tTmFtZV09XCJyb29tTmFtZS52YWx1ZVwiXG4gICAgICAgIFtzb2NrZXRdPVwic29ja2V0LnZhbHVlXCJcbiAgICAgICAgW2lzbGV2ZWxdPVwiaXNsZXZlbC52YWx1ZVwiXG4gICAgICA+PC9hcHAtY29uZmlybS1leGl0LW1vZGFsPlxuXG4gICAgICA8YXBwLWNvbmZpcm0taGVyZS1tb2RhbFxuICAgICAgICBbYmFja2dyb3VuZENvbG9yXT1cIidyZ2JhKDE4MSwgMjMzLCAyMjksIDAuOTcpJ1wiXG4gICAgICAgIFtpc0NvbmZpcm1IZXJlTW9kYWxWaXNpYmxlXT1cImlzQ29uZmlybUhlcmVNb2RhbFZpc2libGUudmFsdWVcIlxuICAgICAgICBbb25Db25maXJtSGVyZUNsb3NlXT1cIm9uQ29uZmlybUhlcmVDbG9zZVwiXG4gICAgICAgIFttZW1iZXJdPVwibWVtYmVyLnZhbHVlXCJcbiAgICAgICAgW3Jvb21OYW1lXT1cInJvb21OYW1lLnZhbHVlXCJcbiAgICAgICAgW3NvY2tldF09XCJzb2NrZXQudmFsdWVcIlxuICAgICAgPjwvYXBwLWNvbmZpcm0taGVyZS1tb2RhbD5cblxuICAgICAgPGFwcC1zaGFyZS1ldmVudC1tb2RhbFxuICAgICAgICBbaXNTaGFyZUV2ZW50TW9kYWxWaXNpYmxlXT1cImlzU2hhcmVFdmVudE1vZGFsVmlzaWJsZS52YWx1ZVwiXG4gICAgICAgIFtvblNoYXJlRXZlbnRDbG9zZV09XCJvblNoYXJlRXZlbnRDbG9zZVwiXG4gICAgICAgIFtyb29tTmFtZV09XCJyb29tTmFtZS52YWx1ZVwiXG4gICAgICAgIFtpc2xldmVsXT1cImlzbGV2ZWwudmFsdWVcIlxuICAgICAgICBbYWRtaW5QYXNzY29kZV09XCJhZG1pblBhc3Njb2RlLnZhbHVlXCJcbiAgICAgICAgW2V2ZW50VHlwZV09XCJldmVudFR5cGUudmFsdWVcIlxuICAgICAgPjwvYXBwLXNoYXJlLWV2ZW50LW1vZGFsPlxuXG4gICAgICA8YXBwLXBvbGwtbW9kYWxcbiAgICAgICAgW2lzUG9sbE1vZGFsVmlzaWJsZV09XCJpc1BvbGxNb2RhbFZpc2libGUudmFsdWVcIlxuICAgICAgICBbb25DbG9zZV09XCJvblBvbGxDbG9zZVwiXG4gICAgICAgIFttZW1iZXJdPVwibWVtYmVyLnZhbHVlXCJcbiAgICAgICAgW2lzbGV2ZWxdPVwiaXNsZXZlbC52YWx1ZVwiXG4gICAgICAgIFtwb2xsc109XCJwb2xscy52YWx1ZVwiXG4gICAgICAgIFtwb2xsXT1cInBvbGwudmFsdWVcIlxuICAgICAgICBbc29ja2V0XT1cInNvY2tldC52YWx1ZVwiXG4gICAgICAgIFtyb29tTmFtZV09XCJyb29tTmFtZS52YWx1ZVwiXG4gICAgICAgIFtzaG93QWxlcnRdPVwic2hvd0FsZXJ0XCJcbiAgICAgICAgW3VwZGF0ZUlzUG9sbE1vZGFsVmlzaWJsZV09XCJ1cGRhdGVJc1BvbGxNb2RhbFZpc2libGVcIlxuICAgICAgICBbaGFuZGxlQ3JlYXRlUG9sbF09XCJoYW5kbGVDcmVhdGVQb2xsLmhhbmRsZUNyZWF0ZVBvbGxcIlxuICAgICAgICBbaGFuZGxlRW5kUG9sbF09XCJoYW5kbGVFbmRQb2xsLmhhbmRsZUVuZFBvbGxcIlxuICAgICAgICBbaGFuZGxlVm90ZVBvbGxdPVwiaGFuZGxlVm90ZVBvbGwuaGFuZGxlVm90ZVBvbGxcIlxuICAgICAgPjwvYXBwLXBvbGwtbW9kYWw+XG5cbiAgICAgIDxhcHAtYmFja2dyb3VuZC1tb2RhbFxuICAgICAgICBbYmFja2dyb3VuZENvbG9yXT1cIidyZ2JhKDIxNywgMjI3LCAyMzQsIDAuOTkpJ1wiXG4gICAgICAgIFtpc1Zpc2libGVdPVwiaXNCYWNrZ3JvdW5kTW9kYWxWaXNpYmxlLnZhbHVlXCJcbiAgICAgICAgW29uQ2xvc2VdPVwib25CYWNrZ3JvdW5kQ2xvc2VcIlxuICAgICAgICBbcGFyYW1ldGVyc109XCJtZWRpYVNGVVBhcmFtZXRlcnNcIlxuICAgICAgPjwvYXBwLWJhY2tncm91bmQtbW9kYWw+XG5cbiAgICAgIDxhcHAtYnJlYWtvdXQtcm9vbXMtbW9kYWxcbiAgICAgICAgW2JhY2tncm91bmRDb2xvcl09XCIncmdiYSgyMTcsIDIyNywgMjM0LCAwLjk5KSdcIlxuICAgICAgICBbaXNWaXNpYmxlXT1cImlzQnJlYWtvdXRSb29tc01vZGFsVmlzaWJsZS52YWx1ZVwiXG4gICAgICAgIFtvbkJyZWFrb3V0Um9vbXNDbG9zZV09XCJvbkJyZWFrb3V0Um9vbXNDbG9zZVwiXG4gICAgICAgIFtwYXJhbWV0ZXJzXT1cIm1lZGlhU0ZVUGFyYW1ldGVyc1wiXG4gICAgICA+PC9hcHAtYnJlYWtvdXQtcm9vbXMtbW9kYWw+XG5cbiAgICAgIDxhcHAtY29uZmlndXJlLXdoaXRlYm9hcmQtbW9kYWxcbiAgICAgICAgW2JhY2tncm91bmRDb2xvcl09XCIncmdiYSgyMTcsIDIyNywgMjM0LCAwLjk5KSdcIlxuICAgICAgICBbaXNWaXNpYmxlXT1cImlzQ29uZmlndXJlV2hpdGVib2FyZE1vZGFsVmlzaWJsZS52YWx1ZVwiXG4gICAgICAgIFtvbkNvbmZpZ3VyZVdoaXRlYm9hcmRDbG9zZV09XCJvbkNvbmZpZ3VyZVdoaXRlYm9hcmRDbG9zZVwiXG4gICAgICAgIFtwYXJhbWV0ZXJzXT1cIm1lZGlhU0ZVUGFyYW1ldGVyc1wiXG4gICAgICA+PC9hcHAtY29uZmlndXJlLXdoaXRlYm9hcmQtbW9kYWw+XG5cbiAgICAgIDxhcHAtc2NyZWVuYm9hcmQtbW9kYWxcbiAgICAgICAgW2JhY2tncm91bmRDb2xvcl09XCIncmdiYSgyMTcsIDIyNywgMjM0LCAwLjk5KSdcIlxuICAgICAgICBbaXNWaXNpYmxlXT1cImlzU2NyZWVuYm9hcmRNb2RhbFZpc2libGUudmFsdWVcIlxuICAgICAgICBbb25DbG9zZV09XCJvblNjcmVlbmJvYXJkQ2xvc2VcIlxuICAgICAgICBbcGFyYW1ldGVyc109XCJtZWRpYVNGVVBhcmFtZXRlcnNcIlxuICAgICAgPjwvYXBwLXNjcmVlbmJvYXJkLW1vZGFsPlxuXG4gICAgICA8YXBwLWFsZXJ0LWNvbXBvbmVudFxuICAgICAgICBbdmlzaWJsZV09XCJhbGVydFZpc2libGUudmFsdWVcIlxuICAgICAgICBbbWVzc2FnZV09XCJhbGVydE1lc3NhZ2UudmFsdWVcIlxuICAgICAgICBbdHlwZV09XCJhbGVydFR5cGUudmFsdWVcIlxuICAgICAgICBbZHVyYXRpb25dPVwiYWxlcnREdXJhdGlvbi52YWx1ZVwiXG4gICAgICAgIFtvbkhpZGVdPVwib25BbGVydEhpZGVcIlxuICAgICAgICB0ZXh0Q29sb3I9XCIjZmZmZmZmXCJcbiAgICAgID48L2FwcC1hbGVydC1jb21wb25lbnQ+XG5cbiAgICAgIDxhcHAtbG9hZGluZy1tb2RhbFxuICAgICAgICBbaXNWaXNpYmxlXT1cImlzTG9hZGluZ01vZGFsVmlzaWJsZS52YWx1ZVwiXG4gICAgICAgIFtiYWNrZ3JvdW5kQ29sb3JdPVwiJ3JnYmEoMjE3LCAyMjcsIDIzNCwgMC45OSknXCJcbiAgICAgICAgZGlzcGxheUNvbG9yPVwiYmxhY2tcIlxuICAgICAgPjwvYXBwLWxvYWRpbmctbW9kYWw+XG4gICAgPC9kaXY+XG4gIGAsXG4gIHN0eWxlczogW1xuICAgIGBcbiAgICAgIC5NZWRpYVNGVSB7XG4gICAgICAgIC8qIEFkZCBhbnkgY29tcG9uZW50LXNwZWNpZmljIHN0eWxlcyBoZXJlICovXG4gICAgICB9XG4gICAgYCxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbQ29va2llU2VydmljZV0sXG59KVxuZXhwb3J0IGNsYXNzIE1lZGlhc2Z1R2VuZXJpYyBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgQElucHV0KClcbiAgUHJlam9pblBhZ2U6IGFueSA9IFdlbGNvbWVQYWdlO1xuICBASW5wdXQoKSBjcmVkZW50aWFsczogeyBhcGlVc2VyTmFtZTogc3RyaW5nOyBhcGlLZXk6IHN0cmluZyB9ID0geyBhcGlVc2VyTmFtZTogJycsIGFwaUtleTogJycgfTtcbiAgQElucHV0KCkgdXNlTG9jYWxVSU1vZGUgPSBmYWxzZTtcbiAgQElucHV0KCkgc2VlZERhdGE/OiBTZWVkRGF0YTtcbiAgQElucHV0KCkgdXNlU2VlZCA9IGZhbHNlO1xuICBASW5wdXQoKSBpbWdTcmMgPSAnaHR0cHM6Ly9tZWRpYXNmdS5jb20vaW1hZ2VzL2xvZ28xOTIucG5nJztcblxuICB0aXRsZSA9ICdNZWRpYVNGVS1HZW5lcmljJztcblxuICBwcml2YXRlIG1haW5IZWlnaHRXaWR0aFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uIHwgdW5kZWZpbmVkO1xuICBwcml2YXRlIHZhbGlkYXRlZFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uIHwgdW5kZWZpbmVkO1xuICBwcml2YXRlIGlzbGV2ZWxTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiB8IHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSBjb0hvc3RTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiB8IHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSBidXR0b25TdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuICBwcml2YXRlIFNjcmVlbmJvYXJkU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gfCB1bmRlZmluZWQ7XG4gIHByaXZhdGUgcmVjb3JkaW5nU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gfCB1bmRlZmluZWQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgIHB1YmxpYyB1cGRhdGVNaW5pQ2FyZHNHcmlkOiBVcGRhdGVNaW5pQ2FyZHNHcmlkLFxuICAgIHB1YmxpYyBtaXhTdHJlYW1zOiBNaXhTdHJlYW1zLFxuICAgIHB1YmxpYyBkaXNwU3RyZWFtczogRGlzcFN0cmVhbXMsXG4gICAgcHVibGljIHN0b3BTaGFyZVNjcmVlbjogU3RvcFNoYXJlU2NyZWVuLFxuICAgIHB1YmxpYyBjaGVja1NjcmVlblNoYXJlOiBDaGVja1NjcmVlblNoYXJlLFxuICAgIHB1YmxpYyBzdGFydFNoYXJlU2NyZWVuOiBTdGFydFNoYXJlU2NyZWVuLFxuICAgIHB1YmxpYyByZXF1ZXN0U2NyZWVuU2hhcmU6IFJlcXVlc3RTY3JlZW5TaGFyZSxcbiAgICBwdWJsaWMgcmVvcmRlclN0cmVhbXM6IFJlb3JkZXJTdHJlYW1zLFxuICAgIHB1YmxpYyBwcmVwb3B1bGF0ZVVzZXJNZWRpYTogUHJlcG9wdWxhdGVVc2VyTWVkaWEsXG4gICAgcHVibGljIGdldFZpZGVvczogR2V0VmlkZW9zLFxuICAgIHB1YmxpYyByZVBvcnQ6IFJlUG9ydCxcbiAgICBwdWJsaWMgdHJpZ2dlcjogVHJpZ2dlcixcbiAgICBwdWJsaWMgY29uc3VtZXJSZXN1bWU6IENvbnN1bWVyUmVzdW1lLFxuICAgIHB1YmxpYyBjb25uZWN0U2VuZFRyYW5zcG9ydDogQ29ubmVjdFNlbmRUcmFuc3BvcnQsXG4gICAgcHVibGljIGNvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW86IENvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW8sXG4gICAgcHVibGljIGNvbm5lY3RTZW5kVHJhbnNwb3J0VmlkZW86IENvbm5lY3RTZW5kVHJhbnNwb3J0VmlkZW8sXG4gICAgcHVibGljIGNvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuOiBDb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlbixcbiAgICBwdWJsaWMgcHJvY2Vzc0NvbnN1bWVyVHJhbnNwb3J0czogUHJvY2Vzc0NvbnN1bWVyVHJhbnNwb3J0cyxcbiAgICBwdWJsaWMgcmVzdW1lUGF1c2VTdHJlYW1zOiBSZXN1bWVQYXVzZVN0cmVhbXMsXG4gICAgcHVibGljIHJlYWRqdXN0OiBSZWFkanVzdCxcbiAgICBwdWJsaWMgY2hlY2tHcmlkOiBDaGVja0dyaWQsXG4gICAgcHVibGljIGdldEVzdGltYXRlOiBHZXRFc3RpbWF0ZSxcbiAgICBwdWJsaWMgY2FsY3VsYXRlUm93c0FuZENvbHVtbnM6IENhbGN1bGF0ZVJvd3NBbmRDb2x1bW5zLFxuICAgIHB1YmxpYyBhZGRWaWRlb3NHcmlkOiBBZGRWaWRlb3NHcmlkLFxuICAgIHB1YmxpYyBvblNjcmVlbkNoYW5nZXM6IE9uU2NyZWVuQ2hhbmdlcyxcbiAgICBwdWJsaWMgY2hhbmdlVmlkczogQ2hhbmdlVmlkcyxcbiAgICBwdWJsaWMgY29tcGFyZUFjdGl2ZU5hbWVzOiBDb21wYXJlQWN0aXZlTmFtZXMsXG4gICAgcHVibGljIGNvbXBhcmVTY3JlZW5TdGF0ZXM6IENvbXBhcmVTY3JlZW5TdGF0ZXMsXG4gICAgcHVibGljIGNyZWF0ZVNlbmRUcmFuc3BvcnQ6IENyZWF0ZVNlbmRUcmFuc3BvcnQsXG4gICAgcHVibGljIHJlc3VtZVNlbmRUcmFuc3BvcnRBdWRpbzogUmVzdW1lU2VuZFRyYW5zcG9ydEF1ZGlvLFxuICAgIHB1YmxpYyByZWNlaXZlQWxsUGlwZWRUcmFuc3BvcnRzOiBSZWNlaXZlQWxsUGlwZWRUcmFuc3BvcnRzLFxuICAgIHB1YmxpYyBkaXNjb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvOiBEaXNjb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvLFxuICAgIHB1YmxpYyBkaXNjb25uZWN0U2VuZFRyYW5zcG9ydEF1ZGlvOiBEaXNjb25uZWN0U2VuZFRyYW5zcG9ydEF1ZGlvLFxuICAgIHB1YmxpYyBkaXNjb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlbjogRGlzY29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW4sXG4gICAgcHVibGljIGdldFBpcGVkUHJvZHVjZXJzQWx0OiBHZXRQaXBlZFByb2R1Y2Vyc0FsdCxcbiAgICBwdWJsaWMgc2lnbmFsTmV3Q29uc3VtZXJUcmFuc3BvcnQ6IFNpZ25hbE5ld0NvbnN1bWVyVHJhbnNwb3J0LFxuICAgIHB1YmxpYyBjb25uZWN0UmVjdlRyYW5zcG9ydDogQ29ubmVjdFJlY3ZUcmFuc3BvcnQsXG4gICAgcHVibGljIHJlVXBkYXRlSW50ZXI6IFJlVXBkYXRlSW50ZXIsXG4gICAgcHVibGljIHVwZGF0ZVBhcnRpY2lwYW50QXVkaW9EZWNpYmVsczogVXBkYXRlUGFydGljaXBhbnRBdWRpb0RlY2liZWxzLFxuICAgIHB1YmxpYyBjbG9zZUFuZFJlc2l6ZTogQ2xvc2VBbmRSZXNpemUsXG4gICAgcHVibGljIGF1dG9BZGp1c3Q6IEF1dG9BZGp1c3QsXG4gICAgcHVibGljIHN3aXRjaFVzZXJWaWRlb0FsdDogU3dpdGNoVXNlclZpZGVvQWx0LFxuICAgIHB1YmxpYyBzd2l0Y2hVc2VyVmlkZW86IFN3aXRjaFVzZXJWaWRlbyxcbiAgICBwdWJsaWMgc3dpdGNoVXNlckF1ZGlvOiBTd2l0Y2hVc2VyQXVkaW8sXG4gICAgcHVibGljIGdldERvbWFpbnM6IEdldERvbWFpbnMsXG4gICAgcHVibGljIGZvcm1hdE51bWJlcjogRm9ybWF0TnVtYmVyLFxuICAgIHB1YmxpYyBjb25uZWN0SXBzOiBDb25uZWN0SXBzLFxuICAgIHB1YmxpYyBjcmVhdGVEZXZpY2VDbGllbnQ6IENyZWF0ZURldmljZUNsaWVudCxcbiAgICBwdWJsaWMgaGFuZGxlQ3JlYXRlUG9sbDogSGFuZGxlQ3JlYXRlUG9sbCxcbiAgICBwdWJsaWMgaGFuZGxlRW5kUG9sbDogSGFuZGxlRW5kUG9sbCxcbiAgICBwdWJsaWMgaGFuZGxlVm90ZVBvbGw6IEhhbmRsZVZvdGVQb2xsLFxuICAgIHB1YmxpYyBjYXB0dXJlQ2FudmFzU3RyZWFtOiBDYXB0dXJlQ2FudmFzU3RyZWFtLFxuICAgIHB1YmxpYyByZXN1bWVQYXVzZUF1ZGlvU3RyZWFtczogUmVzdW1lUGF1c2VBdWRpb1N0cmVhbXMsXG4gICAgcHVibGljIHByb2Nlc3NDb25zdW1lclRyYW5zcG9ydHNBdWRpbzogUHJvY2Vzc0NvbnN1bWVyVHJhbnNwb3J0c0F1ZGlvLFxuXG4gICAgcHVibGljIGxhdW5jaE1lbnVNb2RhbDogTGF1bmNoTWVudU1vZGFsLFxuICAgIHB1YmxpYyBsYXVuY2hSZWNvcmRpbmc6IExhdW5jaFJlY29yZGluZyxcbiAgICBwdWJsaWMgc3RhcnRSZWNvcmRpbmc6IFN0YXJ0UmVjb3JkaW5nLFxuICAgIHB1YmxpYyBjb25maXJtUmVjb3JkaW5nOiBDb25maXJtUmVjb3JkaW5nLFxuICAgIHB1YmxpYyBsYXVuY2hXYWl0aW5nOiBMYXVuY2hXYWl0aW5nLFxuICAgIHB1YmxpYyBsYXVuY2hDb0hvc3Q6IGxhdW5jaENvSG9zdCxcbiAgICBwdWJsaWMgbGF1bmNoTWVkaWFTZXR0aW5nczogTGF1bmNoTWVkaWFTZXR0aW5ncyxcbiAgICBwdWJsaWMgbGF1bmNoRGlzcGxheVNldHRpbmdzOiBMYXVuY2hEaXNwbGF5U2V0dGluZ3MsXG4gICAgcHVibGljIGxhdW5jaFNldHRpbmdzOiBMYXVuY2hTZXR0aW5ncyxcbiAgICBwdWJsaWMgbGF1bmNoUmVxdWVzdHM6IExhdW5jaFJlcXVlc3RzLFxuICAgIHB1YmxpYyBsYXVuY2hQYXJ0aWNpcGFudHM6IExhdW5jaFBhcnRpY2lwYW50cyxcbiAgICBwdWJsaWMgbGF1bmNoTWVzc2FnZXM6IExhdW5jaE1lc3NhZ2VzLFxuICAgIHB1YmxpYyBsYXVuY2hDb25maXJtRXhpdDogTGF1bmNoQ29uZmlybUV4aXQsXG4gICAgcHVibGljIGxhdW5jaFBvbGw6IExhdW5jaFBvbGwsXG4gICAgcHVibGljIGxhdW5jaEJyZWFrb3V0Um9vbXM6IExhdW5jaEJyZWFrb3V0Um9vbXMsXG4gICAgcHVibGljIGxhdW5jaENvbmZpZ3VyZVdoaXRlYm9hcmQ6IExhdW5jaENvbmZpZ3VyZVdoaXRlYm9hcmQsXG4gICAgcHVibGljIHN0YXJ0TWVldGluZ1Byb2dyZXNzVGltZXI6IFN0YXJ0TWVldGluZ1Byb2dyZXNzVGltZXIsXG4gICAgcHVibGljIHVwZGF0ZVJlY29yZGluZzogVXBkYXRlUmVjb3JkaW5nLFxuICAgIHB1YmxpYyBzdG9wUmVjb3JkaW5nOiBTdG9wUmVjb3JkaW5nLFxuICAgIHB1YmxpYyB1c2VyV2FpdGluZzogVXNlcldhaXRpbmcsXG4gICAgcHVibGljIHBlcnNvbkpvaW5lZDogUGVyc29uSm9pbmVkLFxuICAgIHB1YmxpYyBhbGxXYWl0aW5nUm9vbU1lbWJlcnM6IEFsbFdhaXRpbmdSb29tTWVtYmVycyxcbiAgICBwdWJsaWMgcm9vbVJlY29yZFBhcmFtczogUm9vbVJlY29yZFBhcmFtcyxcbiAgICBwdWJsaWMgYmFuUGFydGljaXBhbnQ6IEJhblBhcnRpY2lwYW50LFxuICAgIHB1YmxpYyB1cGRhdGVkQ29Ib3N0OiBVcGRhdGVkQ29Ib3N0LFxuICAgIHB1YmxpYyBwYXJ0aWNpcGFudFJlcXVlc3RlZDogUGFydGljaXBhbnRSZXF1ZXN0ZWQsXG4gICAgcHVibGljIHNjcmVlblByb2R1Y2VySWQ6IFNjcmVlblByb2R1Y2VySWQsXG4gICAgcHVibGljIHVwZGF0ZU1lZGlhU2V0dGluZ3M6IFVwZGF0ZU1lZGlhU2V0dGluZ3MsXG4gICAgcHVibGljIHByb2R1Y2VyTWVkaWFQYXVzZWQ6IFByb2R1Y2VyTWVkaWFQYXVzZWQsXG4gICAgcHVibGljIHByb2R1Y2VyTWVkaWFSZXN1bWVkOiBQcm9kdWNlck1lZGlhUmVzdW1lZCxcbiAgICBwdWJsaWMgcHJvZHVjZXJNZWRpYUNsb3NlZDogUHJvZHVjZXJNZWRpYUNsb3NlZCxcbiAgICBwdWJsaWMgY29udHJvbE1lZGlhSG9zdDogQ29udHJvbE1lZGlhSG9zdCxcbiAgICBwdWJsaWMgbWVldGluZ0VuZGVkOiBNZWV0aW5nRW5kZWQsXG4gICAgcHVibGljIGRpc2Nvbm5lY3RVc2VyU2VsZjogRGlzY29ubmVjdFVzZXJTZWxmLFxuICAgIHB1YmxpYyByZWNlaXZlTWVzc2FnZTogUmVjZWl2ZU1lc3NhZ2UsXG4gICAgcHVibGljIG1lZXRpbmdUaW1lUmVtYWluaW5nOiBNZWV0aW5nVGltZVJlbWFpbmluZyxcbiAgICBwdWJsaWMgbWVldGluZ1N0aWxsVGhlcmU6IE1lZXRpbmdTdGlsbFRoZXJlLFxuICAgIHB1YmxpYyBzdGFydFJlY29yZHM6IFN0YXJ0UmVjb3JkcyxcbiAgICBwdWJsaWMgcmVJbml0aWF0ZVJlY29yZGluZzogUmVJbml0aWF0ZVJlY29yZGluZyxcbiAgICBwdWJsaWMgcmVjb3JkaW5nTm90aWNlOiBSZWNvcmRpbmdOb3RpY2UsXG4gICAgcHVibGljIHRpbWVMZWZ0UmVjb3JkaW5nOiBUaW1lTGVmdFJlY29yZGluZyxcbiAgICBwdWJsaWMgc3RvcHBlZFJlY29yZGluZzogU3RvcHBlZFJlY29yZGluZyxcbiAgICBwdWJsaWMgaG9zdFJlcXVlc3RSZXNwb25zZTogSG9zdFJlcXVlc3RSZXNwb25zZSxcbiAgICBwdWJsaWMgYWxsTWVtYmVyczogQWxsTWVtYmVycyxcbiAgICBwdWJsaWMgYWxsTWVtYmVyc1Jlc3Q6IEFsbE1lbWJlcnNSZXN0LFxuICAgIHB1YmxpYyBkaXNjb25uZWN0OiBEaXNjb25uZWN0LFxuICAgIHB1YmxpYyBwb2xsVXBkYXRlZDogUG9sbFVwZGF0ZWQsXG4gICAgcHVibGljIGJyZWFrb3V0Um9vbVVwZGF0ZWQ6IEJyZWFrb3V0Um9vbVVwZGF0ZWQsXG4gICAgcHVibGljIHNvY2tldE1hbmFnZXI6IFNvY2tldE1hbmFnZXIsXG4gICAgcHVibGljIGpvaW5Sb29tQ2xpZW50OiBKb2luUm9vbUNsaWVudCxcbiAgICBwdWJsaWMgdXBkYXRlUm9vbVBhcmFtZXRlcnNDbGllbnQ6IFVwZGF0ZVJvb21QYXJhbWV0ZXJzQ2xpZW50LFxuICAgIHB1YmxpYyBjbGlja1ZpZGVvOiBDbGlja1ZpZGVvLFxuICAgIHB1YmxpYyBjbGlja0F1ZGlvOiBDbGlja0F1ZGlvLFxuICAgIHB1YmxpYyBjbGlja1NjcmVlblNoYXJlOiBDbGlja1NjcmVlblNoYXJlLFxuICAgIHB1YmxpYyBzd2l0Y2hWaWRlb0FsdDogU3dpdGNoVmlkZW9BbHQsXG4gICAgcHVibGljIHN0cmVhbVN1Y2Nlc3NWaWRlbzogU3RyZWFtU3VjY2Vzc1ZpZGVvLFxuICAgIHB1YmxpYyBzdHJlYW1TdWNjZXNzQXVkaW86IFN0cmVhbVN1Y2Nlc3NBdWRpbyxcbiAgICBwdWJsaWMgc3RyZWFtU3VjY2Vzc1NjcmVlbjogU3RyZWFtU3VjY2Vzc1NjcmVlbixcbiAgICBwdWJsaWMgc3RyZWFtU3VjY2Vzc0F1ZGlvU3dpdGNoOiBTdHJlYW1TdWNjZXNzQXVkaW9Td2l0Y2gsXG4gICAgcHVibGljIGNoZWNrUGVybWlzc2lvbjogQ2hlY2tQZXJtaXNzaW9uLFxuICAgIHB1YmxpYyB1cGRhdGVDb25zdW1pbmdEb21haW5zOiBVcGRhdGVDb25zdW1pbmdEb21haW5zLFxuICAgIHB1YmxpYyByZWNlaXZlUm9vbU1lc3NhZ2VzOiBSZWNlaXZlUm9vbU1lc3NhZ2VzLFxuICApIHt9XG5cbiAgY3JlYXRlSW5qZWN0b3IoaW5wdXRzOiBhbnkpIHtcbiAgICBjb25zdCBpbmogPSBJbmplY3Rvci5jcmVhdGUoe1xuICAgICAgcHJvdmlkZXJzOiBPYmplY3Qua2V5cyhpbnB1dHMpLm1hcCgoa2V5KSA9PiAoeyBwcm92aWRlOiBrZXksIHVzZVZhbHVlOiBpbnB1dHNba2V5XSB9KSksXG4gICAgICBwYXJlbnQ6IHRoaXMuaW5qZWN0b3IsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gaW5qO1xuICB9XG5cbiAgLy8gSW5pdGlhbCB2YWx1ZXNcbiAgbWVkaWFTRlVGdW5jdGlvbnMgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZU1pbmlDYXJkc0dyaWQ6XG4gICAgICAgIHRoaXMudXBkYXRlTWluaUNhcmRzR3JpZD8udXBkYXRlTWluaUNhcmRzR3JpZCB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgbWl4U3RyZWFtczpcbiAgICAgICAgdGhpcy5taXhTdHJlYW1zPy5taXhTdHJlYW1zIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBkaXNwU3RyZWFtczpcbiAgICAgICAgdGhpcy5kaXNwU3RyZWFtcz8uZGlzcFN0cmVhbXMgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIHN0b3BTaGFyZVNjcmVlbjpcbiAgICAgICAgdGhpcy5zdG9wU2hhcmVTY3JlZW4/LnN0b3BTaGFyZVNjcmVlbiB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgY2hlY2tTY3JlZW5TaGFyZTpcbiAgICAgICAgdGhpcy5jaGVja1NjcmVlblNoYXJlPy5jaGVja1NjcmVlblNoYXJlIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBzdGFydFNoYXJlU2NyZWVuOlxuICAgICAgICB0aGlzLnN0YXJ0U2hhcmVTY3JlZW4/LnN0YXJ0U2hhcmVTY3JlZW4gfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIHJlcXVlc3RTY3JlZW5TaGFyZTpcbiAgICAgICAgdGhpcy5yZXF1ZXN0U2NyZWVuU2hhcmU/LnJlcXVlc3RTY3JlZW5TaGFyZSB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgcmVvcmRlclN0cmVhbXM6XG4gICAgICAgIHRoaXMucmVvcmRlclN0cmVhbXM/LnJlb3JkZXJTdHJlYW1zIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBwcmVwb3B1bGF0ZVVzZXJNZWRpYTpcbiAgICAgICAgdGhpcy5wcmVwb3B1bGF0ZVVzZXJNZWRpYT8ucHJlcG9wdWxhdGVVc2VyTWVkaWEgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGdldFZpZGVvczpcbiAgICAgICAgdGhpcy5nZXRWaWRlb3M/LmdldFZpZGVvcyB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgcmVQb3J0OlxuICAgICAgICB0aGlzLnJlUG9ydD8ucmVQb3J0IHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICB0cmlnZ2VyOlxuICAgICAgICB0aGlzLnRyaWdnZXI/LnRyaWdnZXIgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGNvbnN1bWVyUmVzdW1lOlxuICAgICAgICB0aGlzLmNvbnN1bWVyUmVzdW1lPy5jb25zdW1lclJlc3VtZSB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgY29ubmVjdFNlbmRUcmFuc3BvcnQ6XG4gICAgICAgIHRoaXMuY29ubmVjdFNlbmRUcmFuc3BvcnQ/LmNvbm5lY3RTZW5kVHJhbnNwb3J0IHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBjb25uZWN0U2VuZFRyYW5zcG9ydEF1ZGlvOlxuICAgICAgICB0aGlzLmNvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW8/LmNvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW8gfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGNvbm5lY3RTZW5kVHJhbnNwb3J0VmlkZW86XG4gICAgICAgIHRoaXMuY29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlbz8uY29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlbyB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgY29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW46XG4gICAgICAgIHRoaXMuY29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW4/LmNvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBwcm9jZXNzQ29uc3VtZXJUcmFuc3BvcnRzOlxuICAgICAgICB0aGlzLnByb2Nlc3NDb25zdW1lclRyYW5zcG9ydHM/LnByb2Nlc3NDb25zdW1lclRyYW5zcG9ydHMgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIHJlc3VtZVBhdXNlU3RyZWFtczpcbiAgICAgICAgdGhpcy5yZXN1bWVQYXVzZVN0cmVhbXM/LnJlc3VtZVBhdXNlU3RyZWFtcyB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgcmVhZGp1c3Q6XG4gICAgICAgIHRoaXMucmVhZGp1c3Q/LnJlYWRqdXN0IHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBjaGVja0dyaWQ6XG4gICAgICAgIHRoaXMuY2hlY2tHcmlkPy5jaGVja0dyaWQgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGdldEVzdGltYXRlOlxuICAgICAgICB0aGlzLmdldEVzdGltYXRlPy5nZXRFc3RpbWF0ZSB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgY2FsY3VsYXRlUm93c0FuZENvbHVtbnM6XG4gICAgICAgIHRoaXMuY2FsY3VsYXRlUm93c0FuZENvbHVtbnM/LmNhbGN1bGF0ZVJvd3NBbmRDb2x1bW5zIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBhZGRWaWRlb3NHcmlkOlxuICAgICAgICB0aGlzLmFkZFZpZGVvc0dyaWQ/LmFkZFZpZGVvc0dyaWQgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIG9uU2NyZWVuQ2hhbmdlczpcbiAgICAgICAgdGhpcy5vblNjcmVlbkNoYW5nZXM/Lm9uU2NyZWVuQ2hhbmdlcyB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgc2xlZXA6XG4gICAgICAgIHNsZWVwIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBjaGFuZ2VWaWRzOlxuICAgICAgICB0aGlzLmNoYW5nZVZpZHM/LmNoYW5nZVZpZHMgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGNvbXBhcmVBY3RpdmVOYW1lczpcbiAgICAgICAgdGhpcy5jb21wYXJlQWN0aXZlTmFtZXM/LmNvbXBhcmVBY3RpdmVOYW1lcyB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgY29tcGFyZVNjcmVlblN0YXRlczpcbiAgICAgICAgdGhpcy5jb21wYXJlU2NyZWVuU3RhdGVzPy5jb21wYXJlU2NyZWVuU3RhdGVzIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBjcmVhdGVTZW5kVHJhbnNwb3J0OlxuICAgICAgICB0aGlzLmNyZWF0ZVNlbmRUcmFuc3BvcnQ/LmNyZWF0ZVNlbmRUcmFuc3BvcnQgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIHJlc3VtZVNlbmRUcmFuc3BvcnRBdWRpbzpcbiAgICAgICAgdGhpcy5yZXN1bWVTZW5kVHJhbnNwb3J0QXVkaW8/LnJlc3VtZVNlbmRUcmFuc3BvcnRBdWRpbyB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgcmVjZWl2ZUFsbFBpcGVkVHJhbnNwb3J0czpcbiAgICAgICAgdGhpcy5yZWNlaXZlQWxsUGlwZWRUcmFuc3BvcnRzPy5yZWNlaXZlQWxsUGlwZWRUcmFuc3BvcnRzIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBkaXNjb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvOlxuICAgICAgICB0aGlzLmRpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0VmlkZW8/LmRpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0VmlkZW8gfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGRpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW86XG4gICAgICAgIHRoaXMuZGlzY29ubmVjdFNlbmRUcmFuc3BvcnRBdWRpbz8uZGlzY29ubmVjdFNlbmRUcmFuc3BvcnRBdWRpbyB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgZGlzY29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW46XG4gICAgICAgIHRoaXMuZGlzY29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW4/LmRpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBnZXRQaXBlZFByb2R1Y2Vyc0FsdDpcbiAgICAgICAgdGhpcy5nZXRQaXBlZFByb2R1Y2Vyc0FsdD8uZ2V0UGlwZWRQcm9kdWNlcnNBbHQgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIHNpZ25hbE5ld0NvbnN1bWVyVHJhbnNwb3J0OlxuICAgICAgICB0aGlzLnNpZ25hbE5ld0NvbnN1bWVyVHJhbnNwb3J0Py5zaWduYWxOZXdDb25zdW1lclRyYW5zcG9ydCB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgY29ubmVjdFJlY3ZUcmFuc3BvcnQ6XG4gICAgICAgIHRoaXMuY29ubmVjdFJlY3ZUcmFuc3BvcnQ/LmNvbm5lY3RSZWN2VHJhbnNwb3J0IHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICByZVVwZGF0ZUludGVyOlxuICAgICAgICB0aGlzLnJlVXBkYXRlSW50ZXI/LnJlVXBkYXRlSW50ZXIgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIHVwZGF0ZVBhcnRpY2lwYW50QXVkaW9EZWNpYmVsczpcbiAgICAgICAgdGhpcy51cGRhdGVQYXJ0aWNpcGFudEF1ZGlvRGVjaWJlbHM/LnVwZGF0ZVBhcnRpY2lwYW50QXVkaW9EZWNpYmVscyB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgY2xvc2VBbmRSZXNpemU6XG4gICAgICAgIHRoaXMuY2xvc2VBbmRSZXNpemU/LmNsb3NlQW5kUmVzaXplIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBhdXRvQWRqdXN0OlxuICAgICAgICB0aGlzLmF1dG9BZGp1c3Q/LmF1dG9BZGp1c3QgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIHN3aXRjaFVzZXJWaWRlb0FsdDpcbiAgICAgICAgdGhpcy5zd2l0Y2hVc2VyVmlkZW9BbHQ/LnN3aXRjaFVzZXJWaWRlb0FsdCB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgc3dpdGNoVXNlclZpZGVvOlxuICAgICAgICB0aGlzLnN3aXRjaFVzZXJWaWRlbz8uc3dpdGNoVXNlclZpZGVvIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBzd2l0Y2hVc2VyQXVkaW86XG4gICAgICAgIHRoaXMuc3dpdGNoVXNlckF1ZGlvPy5zd2l0Y2hVc2VyQXVkaW8gfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGdldERvbWFpbnM6XG4gICAgICAgIHRoaXMuZ2V0RG9tYWlucz8uZ2V0RG9tYWlucyB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgZm9ybWF0TnVtYmVyOlxuICAgICAgICB0aGlzLmZvcm1hdE51bWJlcj8uZm9ybWF0TnVtYmVyIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBjb25uZWN0SXBzOlxuICAgICAgICB0aGlzLmNvbm5lY3RJcHM/LmNvbm5lY3RJcHMgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGNyZWF0ZURldmljZUNsaWVudDpcbiAgICAgICAgdGhpcy5jcmVhdGVEZXZpY2VDbGllbnQ/LmNyZWF0ZURldmljZUNsaWVudCB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgaGFuZGxlQ3JlYXRlUG9sbDpcbiAgICAgICAgdGhpcy5oYW5kbGVDcmVhdGVQb2xsPy5oYW5kbGVDcmVhdGVQb2xsIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBoYW5kbGVFbmRQb2xsOlxuICAgICAgICB0aGlzLmhhbmRsZUVuZFBvbGw/LmhhbmRsZUVuZFBvbGwgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGhhbmRsZVZvdGVQb2xsOlxuICAgICAgICB0aGlzLmhhbmRsZVZvdGVQb2xsPy5oYW5kbGVWb3RlUG9sbCB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgY2FwdHVyZUNhbnZhc1N0cmVhbTpcbiAgICAgICAgdGhpcy5jYXB0dXJlQ2FudmFzU3RyZWFtPy5jYXB0dXJlQ2FudmFzU3RyZWFtIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICByZXN1bWVQYXVzZUF1ZGlvU3RyZWFtczpcbiAgICAgICAgdGhpcy5yZXN1bWVQYXVzZUF1ZGlvU3RyZWFtcz8ucmVzdW1lUGF1c2VBdWRpb1N0cmVhbXMgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIHByb2Nlc3NDb25zdW1lclRyYW5zcG9ydHNBdWRpbzpcbiAgICAgICAgdGhpcy5wcm9jZXNzQ29uc3VtZXJUcmFuc3BvcnRzQXVkaW8/LnByb2Nlc3NDb25zdW1lclRyYW5zcG9ydHNBdWRpbyB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgY2hlY2tQZXJtaXNzaW9uOlxuICAgICAgICB0aGlzLmNoZWNrUGVybWlzc2lvbj8uY2hlY2tQZXJtaXNzaW9uIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBzdHJlYW1TdWNjZXNzVmlkZW86XG4gICAgICAgIHRoaXMuc3RyZWFtU3VjY2Vzc1ZpZGVvPy5zdHJlYW1TdWNjZXNzVmlkZW8gfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIHN0cmVhbVN1Y2Nlc3NBdWRpbzpcbiAgICAgICAgdGhpcy5zdHJlYW1TdWNjZXNzQXVkaW8/LnN0cmVhbVN1Y2Nlc3NBdWRpbyB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgc3RyZWFtU3VjY2Vzc1NjcmVlbjpcbiAgICAgICAgdGhpcy5zdHJlYW1TdWNjZXNzU2NyZWVuPy5zdHJlYW1TdWNjZXNzU2NyZWVuIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBzdHJlYW1TdWNjZXNzQXVkaW9Td2l0Y2g6XG4gICAgICAgIHRoaXMuc3RyZWFtU3VjY2Vzc0F1ZGlvU3dpdGNoPy5zdHJlYW1TdWNjZXNzQXVkaW9Td2l0Y2ggfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGNsaWNrVmlkZW86XG4gICAgICAgIHRoaXMuY2xpY2tWaWRlbz8uY2xpY2tWaWRlbyB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgY2xpY2tBdWRpbzpcbiAgICAgICAgdGhpcy5jbGlja0F1ZGlvPy5jbGlja0F1ZGlvIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBjbGlja1NjcmVlblNoYXJlOlxuICAgICAgICB0aGlzLmNsaWNrU2NyZWVuU2hhcmU/LmNsaWNrU2NyZWVuU2hhcmUgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIHN3aXRjaFZpZGVvQWx0OlxuICAgICAgICB0aGlzLnN3aXRjaFZpZGVvQWx0Py5zd2l0Y2hWaWRlb0FsdCB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgcmVxdWVzdFBlcm1pc3Npb25DYW1lcmE6XG4gICAgICAgIHRoaXMucmVxdWVzdFBlcm1pc3Npb25DYW1lcmEgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIHJlcXVlc3RQZXJtaXNzaW9uQXVkaW86XG4gICAgICAgIHRoaXMucmVxdWVzdFBlcm1pc3Npb25BdWRpbyB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgIH07XG4gIH07XG5cbiAgdmFsaWRhdGVkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGxvY2FsVUlNb2RlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHNvY2tldCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8U29ja2V0Pih7fSBhcyBTb2NrZXQpO1xuICByb29tRGF0YSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UmVzcG9uc2VKb2luUm9vbSB8IG51bGw+KG51bGwpO1xuICBkZXZpY2UgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PERldmljZSB8IG51bGw+KG51bGwpO1xuICBhcGlLZXkgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oXG4gICAgJzAyMTE5Mzc0MmM5MzVjNDQzNGQyNWQ3NTkyMzYyNTc1ZmNiNmQ2NTkwYjZjMzgzMzRhMmYzZTA2YzgzYWY3NTgnLFxuICApO1xuICBhcGlVc2VyTmFtZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignYWJjZGVmZ2gnKTtcbiAgYXBpVG9rZW4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICBsaW5rID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcblxuICByb29tTmFtZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gIG1lbWJlciA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gIGFkbWluUGFzc2NvZGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICBpc2xldmVsID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcxJyk7XG4gIGNvSG9zdCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignTm8gY29Ib3N0Jyk7XG4gIGNvSG9zdFJlc3BvbnNpYmlsaXR5ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxDb0hvc3RSZXNwb25zaWJpbGl0eVtdPihbXG4gICAgeyBuYW1lOiAncGFydGljaXBhbnRzJywgdmFsdWU6IGZhbHNlLCBkZWRpY2F0ZWQ6IGZhbHNlIH0sXG4gICAgeyBuYW1lOiAnbWVkaWEnLCB2YWx1ZTogZmFsc2UsIGRlZGljYXRlZDogZmFsc2UgfSxcbiAgICB7IG5hbWU6ICd3YWl0aW5nJywgdmFsdWU6IGZhbHNlLCBkZWRpY2F0ZWQ6IGZhbHNlIH0sXG4gICAgeyBuYW1lOiAnY2hhdCcsIHZhbHVlOiBmYWxzZSwgZGVkaWNhdGVkOiBmYWxzZSB9LFxuICBdKTtcbiAgeW91QXJlQ29Ib3N0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHlvdUFyZUhvc3QgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgY29uZmlybWVkVG9SZWNvcmQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgbWVldGluZ0Rpc3BsYXlUeXBlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCdtZWRpYScpO1xuICBtZWV0aW5nVmlkZW9PcHRpbWl6ZWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgZXZlbnRUeXBlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxFdmVudFR5cGU+KCd3ZWJpbmFyJyk7XG4gIHBhcnRpY2lwYW50cyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UGFydGljaXBhbnRbXT4oW10pO1xuICBmaWx0ZXJlZFBhcnRpY2lwYW50cyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UGFydGljaXBhbnRbXT4oW10pO1xuICBwYXJ0aWNpcGFudHNDb3VudGVyID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICBwYXJ0aWNpcGFudHNGaWx0ZXIgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuXG4gIGNvbnN1bWVfc29ja2V0cyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Q29uc3VtZVNvY2tldFtdPihbXSk7XG4gIHJ0cENhcGFiaWxpdGllcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UnRwQ2FwYWJpbGl0aWVzIHwgbnVsbD4obnVsbCk7XG4gIHJvb21SZWN2SVBzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmdbXT4oW10pO1xuICBtZWV0aW5nUm9vbVBhcmFtcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8TWVldGluZ1Jvb21QYXJhbXMgfCBudWxsPihudWxsKTtcbiAgaXRlbVBhZ2VMaW1pdCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPig0KTtcbiAgYXVkaW9Pbmx5Um9vbSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBhZGRGb3JCYXNpYyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBzY3JlZW5QYWdlTGltaXQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oNCk7XG4gIHNoYXJlU2NyZWVuU3RhcnRlZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBzaGFyZWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgdGFyZ2V0T3JpZW50YXRpb24gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJ2xhbmRzY2FwZScpO1xuICB0YXJnZXRSZXNvbHV0aW9uID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCdzZCcpO1xuICB0YXJnZXRSZXNvbHV0aW9uSG9zdCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignc2QnKTtcbiAgdmlkQ29ucyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8VmlkQ29ucz4oeyB3aWR0aDogNjQwLCBoZWlnaHQ6IDM2MCB9KTtcbiAgZnJhbWVSYXRlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDEwKTtcbiAgaFBhcmFtcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8SFBhcmFtc1R5cGU+KHt9IGFzIEhQYXJhbXNUeXBlKTtcbiAgdlBhcmFtcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8VlBhcmFtc1R5cGU+KHt9IGFzIFZQYXJhbXNUeXBlKTtcbiAgc2NyZWVuUGFyYW1zID0gbmV3IEJlaGF2aW9yU3ViamVjdDxTY3JlZW5QYXJhbXNUeXBlPih7fSBhcyBTY3JlZW5QYXJhbXNUeXBlKTtcbiAgYVBhcmFtcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8QVBhcmFtc1R5cGU+KHt9IGFzIEFQYXJhbXNUeXBlKTtcblxuICByZWNvcmRpbmdBdWRpb1BhdXNlc0xpbWl0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICByZWNvcmRpbmdBdWRpb1BhdXNlc0NvdW50ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICByZWNvcmRpbmdBdWRpb1N1cHBvcnQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgcmVjb3JkaW5nQXVkaW9QZW9wbGVMaW1pdCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgcmVjb3JkaW5nQXVkaW9QYXJ0aWNpcGFudHNUaW1lTGltaXQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG4gIHJlY29yZGluZ1ZpZGVvUGF1c2VzQ291bnQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG4gIHJlY29yZGluZ1ZpZGVvUGF1c2VzTGltaXQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG4gIHJlY29yZGluZ1ZpZGVvU3VwcG9ydCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICByZWNvcmRpbmdWaWRlb1Blb3BsZUxpbWl0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICByZWNvcmRpbmdWaWRlb1BhcnRpY2lwYW50c1RpbWVMaW1pdCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgcmVjb3JkaW5nQWxsUGFydGljaXBhbnRzU3VwcG9ydCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICByZWNvcmRpbmdWaWRlb1BhcnRpY2lwYW50c1N1cHBvcnQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgcmVjb3JkaW5nQWxsUGFydGljaXBhbnRzRnVsbFJvb21TdXBwb3J0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHJlY29yZGluZ1ZpZGVvUGFydGljaXBhbnRzRnVsbFJvb21TdXBwb3J0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHJlY29yZGluZ1ByZWZlcnJlZE9yaWVudGF0aW9uID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCdsYW5kc2NhcGUnKTtcbiAgcmVjb3JkaW5nU3VwcG9ydEZvck90aGVyT3JpZW50YXRpb24gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgcmVjb3JkaW5nTXVsdGlGb3JtYXRzU3VwcG9ydCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIHVzZXJSZWNvcmRpbmdQYXJhbXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFVzZXJSZWNvcmRpbmdQYXJhbXM+KHtcbiAgICBtYWluU3BlY3M6IHtcbiAgICAgIG1lZGlhT3B0aW9uczogJ3ZpZGVvJywgLy8gJ2F1ZGlvJywgJ3ZpZGVvJ1xuICAgICAgYXVkaW9PcHRpb25zOiAnYWxsJywgLy8gJ2FsbCcsICdvblNjcmVlbicsICdob3N0J1xuICAgICAgdmlkZW9PcHRpb25zOiAnYWxsJywgLy8gJ2FsbCcsICdtYWluU2NyZWVuJ1xuICAgICAgdmlkZW9UeXBlOiAnZnVsbERpc3BsYXknLCAvLyAnYWxsJywgJ2Jlc3REaXNwbGF5JywgJ2Z1bGxEaXNwbGF5J1xuICAgICAgdmlkZW9PcHRpbWl6ZWQ6IGZhbHNlLCAvLyB0cnVlLCBmYWxzZVxuICAgICAgcmVjb3JkaW5nRGlzcGxheVR5cGU6ICdtZWRpYScsIC8vICdtZWRpYScsICd2aWRlbycsICdhbGwnXG4gICAgICBhZGRITFM6IGZhbHNlLCAvLyB0cnVlLCBmYWxzZVxuICAgIH0sXG4gICAgZGlzcFNwZWNzOiB7XG4gICAgICBuYW1lVGFnczogdHJ1ZSwgLy8gdHJ1ZSwgZmFsc2VcbiAgICAgIGJhY2tncm91bmRDb2xvcjogJyMwMDAwMDAnLCAvLyAnIzAwMDAwMCcsICcjZmZmZmZmJ1xuICAgICAgbmFtZVRhZ3NDb2xvcjogJyNmZmZmZmYnLCAvLyAnIzAwMDAwMCcsICcjZmZmZmZmJ1xuICAgICAgb3JpZW50YXRpb25WaWRlbzogJ3BvcnRyYWl0JywgLy8gJ2xhbmRzY2FwZScsICdwb3J0cmFpdCcsICdhbGwnXG4gICAgfSxcbiAgfSk7XG5cbiAgY2FuUmVjb3JkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHN0YXJ0UmVwb3J0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGVuZFJlcG9ydCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICByZWNvcmRUaW1lckludGVydmFsID0gbmV3IEJlaGF2aW9yU3ViamVjdDxOb2RlSlMuVGltZW91dCB8IG51bGw+KG51bGwpO1xuICByZWNvcmRTdGFydFRpbWUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG4gIHJlY29yZEVsYXBzZWRUaW1lID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICBpc1RpbWVyUnVubmluZyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBjYW5QYXVzZVJlc3VtZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICByZWNvcmRDaGFuZ2VTZWNvbmRzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDE1MDAwKTtcbiAgcGF1c2VMaW1pdCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgcGF1c2VSZWNvcmRDb3VudCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgY2FuTGF1bmNoUmVjb3JkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPih0cnVlKTtcbiAgc3RvcExhdW5jaFJlY29yZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIHBhcnRpY2lwYW50c0FsbCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UGFydGljaXBhbnRbXT4oW10pO1xuXG4gIGZpcnN0QWxsID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHVwZGF0ZU1haW5XaW5kb3cgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgZmlyc3Rfcm91bmQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgbGFuZFNjYXBlZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBsb2NrX3NjcmVlbiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBzY3JlZW5JZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gIGFsbFZpZGVvU3RyZWFtcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8KFBhcnRpY2lwYW50IHwgU3RyZWFtKVtdPihbXSk7XG4gIG5ld0xpbWl0ZWRTdHJlYW1zID0gbmV3IEJlaGF2aW9yU3ViamVjdDwoUGFydGljaXBhbnQgfCBTdHJlYW0pW10+KFtdKTtcbiAgbmV3TGltaXRlZFN0cmVhbXNJRHMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZ1tdPihbXSk7XG4gIGFjdGl2ZVNvdW5kcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nW10+KFtdKTtcbiAgc2NyZWVuU2hhcmVJRFN0cmVhbSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gIHNjcmVlblNoYXJlTmFtZVN0cmVhbSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gIGFkbWluSURTdHJlYW0gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICBhZG1pbk5hbWVTdHJlYW0gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICB5b3VZb3VTdHJlYW0gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PChQYXJ0aWNpcGFudCB8IFN0cmVhbSlbXT4oW10pO1xuICB5b3VZb3VTdHJlYW1JRHMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZ1tdPihbXSk7XG4gIGxvY2FsU3RyZWFtID0gbmV3IEJlaGF2aW9yU3ViamVjdDxNZWRpYVN0cmVhbSB8IG51bGw+KG51bGwpO1xuICByZWNvcmRTdGFydGVkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHJlY29yZFJlc3VtZWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgcmVjb3JkUGF1c2VkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHJlY29yZFN0b3BwZWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgYWRtaW5SZXN0cmljdFNldHRpbmcgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgdmlkZW9SZXF1ZXN0U3RhdGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZyB8IG51bGw+KG51bGwpO1xuICB2aWRlb1JlcXVlc3RUaW1lID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICB2aWRlb0FjdGlvbiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBsb2NhbFN0cmVhbVZpZGVvID0gbmV3IEJlaGF2aW9yU3ViamVjdDxNZWRpYVN0cmVhbSB8IG51bGw+KG51bGwpO1xuICB1c2VyRGVmYXVsdFZpZGVvSW5wdXREZXZpY2UgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICBjdXJyZW50RmFjaW5nTW9kZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPigndXNlcicpO1xuICBwcmV2RmFjaW5nTW9kZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPigndXNlcicpO1xuICBkZWZWaWRlb0lEID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcbiAgYWxsb3dlZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBkaXNwQWN0aXZlTmFtZXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZ1tdPihbXSk7XG4gIHBfZGlzcEFjdGl2ZU5hbWVzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmdbXT4oW10pO1xuICBhY3RpdmVOYW1lcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nW10+KFtdKTtcbiAgcHJldkFjdGl2ZU5hbWVzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmdbXT4oW10pO1xuICBwX2FjdGl2ZU5hbWVzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmdbXT4oW10pO1xuICBtZW1iZXJzUmVjZWl2ZWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgZGVmZXJTY3JlZW5SZWNlaXZlZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBob3N0Rmlyc3RTd2l0Y2ggPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgbWljQWN0aW9uID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHNjcmVlbkFjdGlvbiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBjaGF0QWN0aW9uID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGF1ZGlvUmVxdWVzdFN0YXRlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmcgfCBudWxsPihudWxsKTtcbiAgc2NyZWVuUmVxdWVzdFN0YXRlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmcgfCBudWxsPihudWxsKTtcbiAgY2hhdFJlcXVlc3RTdGF0ZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG4gIGF1ZGlvUmVxdWVzdFRpbWUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG4gIHNjcmVlblJlcXVlc3RUaW1lID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICBjaGF0UmVxdWVzdFRpbWUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG4gIHVwZGF0ZVJlcXVlc3RJbnRlcnZhbFNlY29uZHMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMjQwKTtcbiAgb2xkU291bmRJZHMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZ1tdPihbXSk7XG4gIGhvc3RMYWJlbCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignSG9zdCcpO1xuICBtYWluU2NyZWVuRmlsbGVkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGxvY2FsU3RyZWFtU2NyZWVuID0gbmV3IEJlaGF2aW9yU3ViamVjdDxNZWRpYVN0cmVhbSB8IG51bGw+KG51bGwpO1xuICBzY3JlZW5BbHJlYWR5T24gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgY2hhdEFscmVhZHlPbiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICByZWRpcmVjdFVSTCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gIG9sZEFsbFN0cmVhbXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PChQYXJ0aWNpcGFudCB8IFN0cmVhbSlbXT4oW10pO1xuICBhZG1pblZpZElEID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcbiAgc3RyZWFtTmFtZXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFN0cmVhbVtdPihbXSk7XG4gIG5vbl9hbFZpZGVvU3RyZWFtcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UGFydGljaXBhbnRbXT4oW10pO1xuICBzb3J0QXVkaW9Mb3VkbmVzcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBhdWRpb0RlY2liZWxzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxBdWRpb0RlY2liZWxzW10+KFtdKTtcbiAgbWl4ZWRfYWxWaWRlb1N0cmVhbXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PChQYXJ0aWNpcGFudCB8IFN0cmVhbSlbXT4oW10pO1xuICBub25fYWxWaWRlb1N0cmVhbXNfbXV0ZWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFBhcnRpY2lwYW50W10+KFtdKTtcbiAgcGFnaW5hdGVkU3RyZWFtcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8KFBhcnRpY2lwYW50IHwgU3RyZWFtKVtdW10+KFtdKTtcbiAgbG9jYWxTdHJlYW1BdWRpbyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8TWVkaWFTdHJlYW0gfCBudWxsPihudWxsKTtcbiAgZGVmQXVkaW9JRCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gIHVzZXJEZWZhdWx0QXVkaW9JbnB1dERldmljZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gIHVzZXJEZWZhdWx0QXVkaW9PdXRwdXREZXZpY2UgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICBwcmV2QXVkaW9JbnB1dERldmljZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gIHByZXZWaWRlb0lucHV0RGV2aWNlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcbiAgYXVkaW9QYXVzZWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgbWFpblNjcmVlblBlcnNvbiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gIGFkbWluT25NYWluU2NyZWVuID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHNjcmVlblN0YXRlcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8U2NyZWVuU3RhdGVbXT4oW1xuICAgIHtcbiAgICAgIG1haW5TY3JlZW5QZXJzb246ICcnLFxuICAgICAgbWFpblNjcmVlblByb2R1Y2VySWQ6ICcnLFxuICAgICAgbWFpblNjcmVlbkZpbGxlZDogZmFsc2UsXG4gICAgICBhZG1pbk9uTWFpblNjcmVlbjogZmFsc2UsXG4gICAgfSxcbiAgXSk7XG4gIHByZXZTY3JlZW5TdGF0ZXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFNjcmVlblN0YXRlW10+KFtcbiAgICB7XG4gICAgICBtYWluU2NyZWVuUGVyc29uOiAnJyxcbiAgICAgIG1haW5TY3JlZW5Qcm9kdWNlcklkOiAnJyxcbiAgICAgIG1haW5TY3JlZW5GaWxsZWQ6IGZhbHNlLFxuICAgICAgYWRtaW5Pbk1haW5TY3JlZW46IGZhbHNlLFxuICAgIH0sXG4gIF0pO1xuICB1cGRhdGVEYXRlU3RhdGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlciB8IG51bGw+KG51bGwpO1xuICBsYXN0VXBkYXRlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXIgfCBudWxsPihudWxsKTtcbiAgbkZvclJlYWRqdXN0UmVjb3JkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICBmaXhlZFBhZ2VMaW1pdCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPig0KTtcbiAgcmVtb3ZlQWx0R3JpZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBuRm9yUmVhZGp1c3QgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG4gIHJlb3JkZXJJbnRlcnZhbCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigzMDAwMCk7XG4gIGZhc3RSZW9yZGVySW50ZXJ2YWwgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMTAwMDApO1xuICBsYXN0UmVvcmRlclRpbWUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG4gIGF1ZFN0cmVhbU5hbWVzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxTdHJlYW1bXT4oW10pO1xuICBjdXJyZW50VXNlclBhZ2UgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG4gIG1haW5IZWlnaHRXaWR0aCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPihcbiAgICB0aGlzLmV2ZW50VHlwZS52YWx1ZSA9PSAnd2ViaW5hcicgPyA2NyA6IHRoaXMuZXZlbnRUeXBlLnZhbHVlID09ICdicm9hZGNhc3QnID8gMTAwIDogMCxcbiAgKTtcbiAgcHJldk1haW5IZWlnaHRXaWR0aCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPih0aGlzLm1haW5IZWlnaHRXaWR0aC52YWx1ZSk7XG4gIHByZXZEb1BhZ2luYXRlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGRvUGFnaW5hdGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgc2hhcmVFbmRlZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBsU3RyZWFtcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8KFBhcnRpY2lwYW50IHwgU3RyZWFtKVtdPihbXSk7XG4gIGNoYXRSZWZTdHJlYW1zID0gbmV3IEJlaGF2aW9yU3ViamVjdDwoUGFydGljaXBhbnQgfCBTdHJlYW0pW10+KFtdKTtcbiAgY29udHJvbEhlaWdodCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPihcbiAgICB0aGlzLmV2ZW50VHlwZS52YWx1ZSA9PT0gJ3dlYmluYXInIHx8IHRoaXMuZXZlbnRUeXBlLnZhbHVlID09PSAnY29uZmVyZW5jZScgPyAwIDogMC4wNixcbiAgKTtcbiAgaXNXaWRlU2NyZWVuID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGlzTWVkaXVtU2NyZWVuID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGlzU21hbGxTY3JlZW4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgYWRkR3JpZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBhZGRBbHRHcmlkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGdyaWRSb3dzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICBncmlkQ29scyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgYWx0R3JpZFJvd3MgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG4gIGFsdEdyaWRDb2xzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICBudW1iZXJQYWdlcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgY3VycmVudFN0cmVhbXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PChQYXJ0aWNpcGFudCB8IFN0cmVhbSlbXT4oW10pO1xuICBzaG93TWluaVZpZXcgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgblN0cmVhbSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8TWVkaWFTdHJlYW0gfCBudWxsPihudWxsKTtcbiAgZGVmZXJfcmVjZWl2ZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBhbGxBdWRpb1N0cmVhbXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PChQYXJ0aWNpcGFudCB8IFN0cmVhbSlbXT4oW10pO1xuICByZW1vdGVTY3JlZW5TdHJlYW0gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFN0cmVhbVtdPihbXSk7XG4gIHNjcmVlblByb2R1Y2VyID0gbmV3IEJlaGF2aW9yU3ViamVjdDxQcm9kdWNlciB8IG51bGw+KG51bGwpO1xuICBnb3RBbGxWaWRzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHBhZ2luYXRpb25IZWlnaHRXaWR0aCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPig0MCk7XG4gIHBhZ2luYXRpb25EaXJlY3Rpb24gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PCdob3Jpem9udGFsJyB8ICd2ZXJ0aWNhbCc+KCdob3Jpem9udGFsJyk7XG4gIGdyaWRTaXplcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8R3JpZFNpemVzPih7XG4gICAgZ3JpZFdpZHRoOiAwLFxuICAgIGdyaWRIZWlnaHQ6IDAsXG4gICAgYWx0R3JpZFdpZHRoOiAwLFxuICAgIGFsdEdyaWRIZWlnaHQ6IDAsXG4gIH0pO1xuICBzY3JlZW5Gb3JjZUZ1bGxEaXNwbGF5ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIG1haW5HcmlkU3RyZWFtID0gbmV3IEJlaGF2aW9yU3ViamVjdDxDdXN0b21NZWRpYUNvbXBvbmVudFtdPihbXSk7XG4gIG90aGVyR3JpZFN0cmVhbXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEN1c3RvbU1lZGlhQ29tcG9uZW50W11bXT4oW10pO1xuICBhdWRpb09ubHlTdHJlYW1zID0gbmV3IEJlaGF2aW9yU3ViamVjdDxDdXN0b21NZWRpYUNvbXBvbmVudFtdPihbXSk7XG4gIHZpZGVvSW5wdXRzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxNZWRpYURldmljZUluZm9bXT4oW10pO1xuICBhdWRpb0lucHV0cyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8TWVkaWFEZXZpY2VJbmZvW10+KFtdKTtcbiAgbWVldGluZ1Byb2dyZXNzVGltZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignMDA6MDA6MDAnKTtcbiAgbWVldGluZ0VsYXBzZWRUaW1lID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICByZWZfcGFydGljaXBhbnRzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxQYXJ0aWNpcGFudFtdPihbXSk7XG5cbiAgdXBkYXRlVmFsaWRhdGVkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy52YWxpZGF0ZWQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlU29ja2V0ID0gKHZhbHVlOiBTb2NrZXQpID0+IHtcbiAgICB0aGlzLnNvY2tldC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVEZXZpY2UgPSAodmFsdWU6IERldmljZSB8IG51bGwpID0+IHtcbiAgICB0aGlzLmRldmljZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSb29tRGF0YSA9ICh2YWx1ZTogUmVzcG9uc2VKb2luUm9vbSB8IG51bGwpID0+IHtcbiAgICB0aGlzLnJvb21EYXRhLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUFwaUtleSA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5hcGlLZXkubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQXBpVXNlck5hbWUgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMuYXBpVXNlck5hbWUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQXBpVG9rZW4gPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMuYXBpVG9rZW4ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTGluayA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5saW5rLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJvb21OYW1lID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLnJvb21OYW1lLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZU1lbWJlciA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5tZW1iZXIubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQWRtaW5QYXNzY29kZSA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5hZG1pblBhc3Njb2RlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUlzbGV2ZWwgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMuaXNsZXZlbC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVDb0hvc3QgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMuY29Ib3N0Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUNvSG9zdFJlc3BvbnNpYmlsaXR5ID0gKHZhbHVlOiBDb0hvc3RSZXNwb25zaWJpbGl0eVtdKSA9PiB7XG4gICAgdGhpcy5jb0hvc3RSZXNwb25zaWJpbGl0eS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVZb3VBcmVDb0hvc3QgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnlvdUFyZUNvSG9zdC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVZb3VBcmVIb3N0ID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy55b3VBcmVIb3N0Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUNvbmZpcm1lZFRvUmVjb3JkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5jb25maXJtZWRUb1JlY29yZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVNZWV0aW5nRGlzcGxheVR5cGUgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMubWVldGluZ0Rpc3BsYXlUeXBlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZU1lZXRpbmdWaWRlb09wdGltaXplZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMubWVldGluZ1ZpZGVvT3B0aW1pemVkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUV2ZW50VHlwZSA9ICh2YWx1ZTogRXZlbnRUeXBlKSA9PiB7XG4gICAgdGhpcy5ldmVudFR5cGUubmV4dCh2YWx1ZSk7XG4gICAgaWYgKHZhbHVlICE9ICdub25lJykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5oYW5kbGVSZXNpemUoKTtcbiAgICAgICAgfSwgMjAwMCk7XG4gICAgICB9IGNhdGNoIHtcbiAgICAgICAgLyogaGFuZGxlIGVycm9yICovXG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHVwZGF0ZVBhcnRpY2lwYW50cyA9ICh2YWx1ZTogUGFydGljaXBhbnRbXSkgPT4ge1xuICAgIHRoaXMucGFydGljaXBhbnRzLm5leHQodmFsdWUpO1xuICAgIHRoaXMucGFydGljaXBhbnRzQ291bnRlci5uZXh0KHZhbHVlLmxlbmd0aCk7XG4gICAgdGhpcy5maWx0ZXJlZFBhcnRpY2lwYW50cy5uZXh0KHRoaXMucGFydGljaXBhbnRzLnZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVGaWx0ZXJlZFBhcnRpY2lwYW50cyA9ICh2YWx1ZTogUGFydGljaXBhbnRbXSkgPT4ge1xuICAgIHRoaXMuZmlsdGVyZWRQYXJ0aWNpcGFudHMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUGFydGljaXBhbnRzQ291bnRlciA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5wYXJ0aWNpcGFudHNDb3VudGVyLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVBhcnRpY2lwYW50c0ZpbHRlciA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5wYXJ0aWNpcGFudHNGaWx0ZXIubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQ29uc3VtZV9zb2NrZXRzID0gKHZhbHVlOiBDb25zdW1lU29ja2V0W10pID0+IHtcbiAgICB0aGlzLmNvbnN1bWVfc29ja2V0cy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSdHBDYXBhYmlsaXRpZXMgPSAodmFsdWU6IFJ0cENhcGFiaWxpdGllcyB8IG51bGwpID0+IHtcbiAgICB0aGlzLnJ0cENhcGFiaWxpdGllcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSb29tUmVjdklQcyA9ICh2YWx1ZTogc3RyaW5nW10pID0+IHtcbiAgICB0aGlzLnJvb21SZWN2SVBzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZU1lZXRpbmdSb29tUGFyYW1zID0gKHZhbHVlOiBNZWV0aW5nUm9vbVBhcmFtcyB8IG51bGwpID0+IHtcbiAgICB0aGlzLm1lZXRpbmdSb29tUGFyYW1zLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUl0ZW1QYWdlTGltaXQgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMuaXRlbVBhZ2VMaW1pdC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBdWRpb09ubHlSb29tID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5hdWRpb09ubHlSb29tLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUFkZEZvckJhc2ljID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5hZGRGb3JCYXNpYy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVTY3JlZW5QYWdlTGltaXQgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMuc2NyZWVuUGFnZUxpbWl0Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVNoYXJlU2NyZWVuU3RhcnRlZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuc2hhcmVTY3JlZW5TdGFydGVkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVNoYXJlZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuc2hhcmVkLm5leHQodmFsdWUpO1xuICAgIHRoaXMuc2NyZWVuU2hhcmVBY3RpdmUubmV4dCh2YWx1ZSk7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICBzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcbiAgICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdyZXNpemUnKSk7XG4gICAgICB9LCAyMDAwKTtcbiAgICB9XG4gIH07XG5cbiAgdXBkYXRlVGFyZ2V0T3JpZW50YXRpb24gPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMudGFyZ2V0T3JpZW50YXRpb24ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlVGFyZ2V0UmVzb2x1dGlvbiA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy50YXJnZXRSZXNvbHV0aW9uLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVRhcmdldFJlc29sdXRpb25Ib3N0ID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLnRhcmdldFJlc29sdXRpb25Ib3N0Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVZpZENvbnMgPSAodmFsdWU6IFZpZENvbnMpID0+IHtcbiAgICB0aGlzLnZpZENvbnMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlRnJhbWVSYXRlID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLmZyYW1lUmF0ZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVIUGFyYW1zID0gKHZhbHVlOiBIUGFyYW1zVHlwZSkgPT4ge1xuICAgIHRoaXMuaFBhcmFtcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVWUGFyYW1zID0gKHZhbHVlOiBWUGFyYW1zVHlwZSkgPT4ge1xuICAgIHRoaXMudlBhcmFtcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVTY3JlZW5QYXJhbXMgPSAodmFsdWU6IFNjcmVlblBhcmFtc1R5cGUpID0+IHtcbiAgICB0aGlzLnNjcmVlblBhcmFtcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBUGFyYW1zID0gKHZhbHVlOiBBUGFyYW1zVHlwZSkgPT4ge1xuICAgIHRoaXMuYVBhcmFtcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRpbmdBdWRpb1BhdXNlc0xpbWl0ID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ0F1ZGlvUGF1c2VzTGltaXQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nQXVkaW9QYXVzZXNDb3VudCA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdBdWRpb1BhdXNlc0NvdW50Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ0F1ZGlvU3VwcG9ydCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMucmVjb3JkaW5nQXVkaW9TdXBwb3J0Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ0F1ZGlvUGVvcGxlTGltaXQgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMucmVjb3JkaW5nQXVkaW9QZW9wbGVMaW1pdC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRpbmdBdWRpb1BhcnRpY2lwYW50c1RpbWVMaW1pdCA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdBdWRpb1BhcnRpY2lwYW50c1RpbWVMaW1pdC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRpbmdWaWRlb1BhdXNlc0NvdW50ID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ1ZpZGVvUGF1c2VzQ291bnQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nVmlkZW9QYXVzZXNMaW1pdCA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdWaWRlb1BhdXNlc0xpbWl0Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ1ZpZGVvU3VwcG9ydCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMucmVjb3JkaW5nVmlkZW9TdXBwb3J0Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ1ZpZGVvUGVvcGxlTGltaXQgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMucmVjb3JkaW5nVmlkZW9QZW9wbGVMaW1pdC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRpbmdWaWRlb1BhcnRpY2lwYW50c1RpbWVMaW1pdCA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdWaWRlb1BhcnRpY2lwYW50c1RpbWVMaW1pdC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRpbmdBbGxQYXJ0aWNpcGFudHNTdXBwb3J0ID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdBbGxQYXJ0aWNpcGFudHNTdXBwb3J0Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ1ZpZGVvUGFydGljaXBhbnRzU3VwcG9ydCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMucmVjb3JkaW5nVmlkZW9QYXJ0aWNpcGFudHNTdXBwb3J0Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ0FsbFBhcnRpY2lwYW50c0Z1bGxSb29tU3VwcG9ydCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMucmVjb3JkaW5nQWxsUGFydGljaXBhbnRzRnVsbFJvb21TdXBwb3J0Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ1ZpZGVvUGFydGljaXBhbnRzRnVsbFJvb21TdXBwb3J0ID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdWaWRlb1BhcnRpY2lwYW50c0Z1bGxSb29tU3VwcG9ydC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRpbmdQcmVmZXJyZWRPcmllbnRhdGlvbiA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdQcmVmZXJyZWRPcmllbnRhdGlvbi5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRpbmdTdXBwb3J0Rm9yT3RoZXJPcmllbnRhdGlvbiA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMucmVjb3JkaW5nU3VwcG9ydEZvck90aGVyT3JpZW50YXRpb24ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nTXVsdGlGb3JtYXRzU3VwcG9ydCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMucmVjb3JkaW5nTXVsdGlGb3JtYXRzU3VwcG9ydC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVVc2VyUmVjb3JkaW5nUGFyYW1zID0gKHZhbHVlOiBVc2VyUmVjb3JkaW5nUGFyYW1zKSA9PiB7XG4gICAgdGhpcy51c2VyUmVjb3JkaW5nUGFyYW1zLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUNhblJlY29yZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuY2FuUmVjb3JkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVN0YXJ0UmVwb3J0ID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5zdGFydFJlcG9ydC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVFbmRSZXBvcnQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmVuZFJlcG9ydC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRUaW1lckludGVydmFsID0gKHZhbHVlOiBOb2RlSlMuVGltZW91dCB8IG51bGwpID0+IHtcbiAgICB0aGlzLnJlY29yZFRpbWVySW50ZXJ2YWwubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkU3RhcnRUaW1lID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLnJlY29yZFN0YXJ0VGltZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRFbGFwc2VkVGltZSA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRFbGFwc2VkVGltZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVJc1RpbWVyUnVubmluZyA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuaXNUaW1lclJ1bm5pbmcubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQ2FuUGF1c2VSZXN1bWUgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmNhblBhdXNlUmVzdW1lLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZENoYW5nZVNlY29uZHMgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMucmVjb3JkQ2hhbmdlU2Vjb25kcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVQYXVzZUxpbWl0ID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLnBhdXNlTGltaXQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUGF1c2VSZWNvcmRDb3VudCA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5wYXVzZVJlY29yZENvdW50Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUNhbkxhdW5jaFJlY29yZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuY2FuTGF1bmNoUmVjb3JkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVN0b3BMYXVuY2hSZWNvcmQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnN0b3BMYXVuY2hSZWNvcmQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUGFydGljaXBhbnRzQWxsID0gKHZhbHVlOiBQYXJ0aWNpcGFudFtdKSA9PiB7XG4gICAgdGhpcy5wYXJ0aWNpcGFudHNBbGwubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlRmlyc3RBbGwgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmZpcnN0QWxsLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVVwZGF0ZU1haW5XaW5kb3cgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnVwZGF0ZU1haW5XaW5kb3cubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlRmlyc3Rfcm91bmQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmZpcnN0X3JvdW5kLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUxhbmRTY2FwZWQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmxhbmRTY2FwZWQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTG9ja19zY3JlZW4gPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmxvY2tfc2NyZWVuLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVNjcmVlbklkID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLnNjcmVlbklkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUFsbFZpZGVvU3RyZWFtcyA9ICh2YWx1ZTogKFBhcnRpY2lwYW50IHwgU3RyZWFtKVtdKSA9PiB7XG4gICAgdGhpcy5hbGxWaWRlb1N0cmVhbXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTmV3TGltaXRlZFN0cmVhbXMgPSAodmFsdWU6IChQYXJ0aWNpcGFudCB8IFN0cmVhbSlbXSkgPT4ge1xuICAgIHRoaXMubmV3TGltaXRlZFN0cmVhbXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTmV3TGltaXRlZFN0cmVhbXNJRHMgPSAodmFsdWU6IHN0cmluZ1tdKSA9PiB7XG4gICAgdGhpcy5uZXdMaW1pdGVkU3RyZWFtc0lEcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBY3RpdmVTb3VuZHMgPSAodmFsdWU6IHN0cmluZ1tdKSA9PiB7XG4gICAgdGhpcy5hY3RpdmVTb3VuZHMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlU2NyZWVuU2hhcmVJRFN0cmVhbSA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5zY3JlZW5TaGFyZUlEU3RyZWFtLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVNjcmVlblNoYXJlTmFtZVN0cmVhbSA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5zY3JlZW5TaGFyZU5hbWVTdHJlYW0ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQWRtaW5JRFN0cmVhbSA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5hZG1pbklEU3RyZWFtLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUFkbWluTmFtZVN0cmVhbSA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5hZG1pbk5hbWVTdHJlYW0ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlWW91WW91U3RyZWFtID0gKHZhbHVlOiAoUGFydGljaXBhbnQgfCBTdHJlYW0pW10pID0+IHtcbiAgICB0aGlzLnlvdVlvdVN0cmVhbS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVZb3VZb3VTdHJlYW1JRHMgPSAodmFsdWU6IHN0cmluZ1tdKSA9PiB7XG4gICAgdGhpcy55b3VZb3VTdHJlYW1JRHMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTG9jYWxTdHJlYW0gPSAodmFsdWU6IE1lZGlhU3RyZWFtIHwgbnVsbCkgPT4ge1xuICAgIHRoaXMubG9jYWxTdHJlYW0ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkU3RhcnRlZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMucmVjb3JkU3RhcnRlZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRSZXN1bWVkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRSZXN1bWVkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZFBhdXNlZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMucmVjb3JkUGF1c2VkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZFN0b3BwZWQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnJlY29yZFN0b3BwZWQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQWRtaW5SZXN0cmljdFNldHRpbmcgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmFkbWluUmVzdHJpY3RTZXR0aW5nLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVZpZGVvUmVxdWVzdFN0YXRlID0gKHZhbHVlOiBzdHJpbmcgfCBudWxsKSA9PiB7XG4gICAgdGhpcy52aWRlb1JlcXVlc3RTdGF0ZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVWaWRlb1JlcXVlc3RUaW1lID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLnZpZGVvUmVxdWVzdFRpbWUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlVmlkZW9BY3Rpb24gPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnZpZGVvQWN0aW9uLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUxvY2FsU3RyZWFtVmlkZW8gPSAodmFsdWU6IE1lZGlhU3RyZWFtIHwgbnVsbCkgPT4ge1xuICAgIHRoaXMubG9jYWxTdHJlYW1WaWRlby5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVVc2VyRGVmYXVsdFZpZGVvSW5wdXREZXZpY2UgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMudXNlckRlZmF1bHRWaWRlb0lucHV0RGV2aWNlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUN1cnJlbnRGYWNpbmdNb2RlID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLmN1cnJlbnRGYWNpbmdNb2RlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVByZXZGYWNpbmdNb2RlID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLnByZXZGYWNpbmdNb2RlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZURlZlZpZGVvSUQgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMuZGVmVmlkZW9JRC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBbGxvd2VkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5hbGxvd2VkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZURpc3BBY3RpdmVOYW1lcyA9ICh2YWx1ZTogc3RyaW5nW10pID0+IHtcbiAgICB0aGlzLmRpc3BBY3RpdmVOYW1lcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVQX2Rpc3BBY3RpdmVOYW1lcyA9ICh2YWx1ZTogc3RyaW5nW10pID0+IHtcbiAgICB0aGlzLnBfZGlzcEFjdGl2ZU5hbWVzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUFjdGl2ZU5hbWVzID0gKHZhbHVlOiBzdHJpbmdbXSkgPT4ge1xuICAgIHRoaXMuYWN0aXZlTmFtZXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUHJldkFjdGl2ZU5hbWVzID0gKHZhbHVlOiBzdHJpbmdbXSkgPT4ge1xuICAgIHRoaXMucHJldkFjdGl2ZU5hbWVzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVBfYWN0aXZlTmFtZXMgPSAodmFsdWU6IHN0cmluZ1tdKSA9PiB7XG4gICAgdGhpcy5wX2FjdGl2ZU5hbWVzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZU1lbWJlcnNSZWNlaXZlZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMubWVtYmVyc1JlY2VpdmVkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZURlZmVyU2NyZWVuUmVjZWl2ZWQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmRlZmVyU2NyZWVuUmVjZWl2ZWQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlSG9zdEZpcnN0U3dpdGNoID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5ob3N0Rmlyc3RTd2l0Y2gubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTWljQWN0aW9uID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5taWNBY3Rpb24ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlU2NyZWVuQWN0aW9uID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5zY3JlZW5BY3Rpb24ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQ2hhdEFjdGlvbiA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuY2hhdEFjdGlvbi5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBdWRpb1JlcXVlc3RTdGF0ZSA9ICh2YWx1ZTogc3RyaW5nIHwgbnVsbCkgPT4ge1xuICAgIHRoaXMuYXVkaW9SZXF1ZXN0U3RhdGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlU2NyZWVuUmVxdWVzdFN0YXRlID0gKHZhbHVlOiBzdHJpbmcgfCBudWxsKSA9PiB7XG4gICAgdGhpcy5zY3JlZW5SZXF1ZXN0U3RhdGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQ2hhdFJlcXVlc3RTdGF0ZSA9ICh2YWx1ZTogc3RyaW5nIHwgbnVsbCkgPT4ge1xuICAgIHRoaXMuY2hhdFJlcXVlc3RTdGF0ZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBdWRpb1JlcXVlc3RUaW1lID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLmF1ZGlvUmVxdWVzdFRpbWUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlU2NyZWVuUmVxdWVzdFRpbWUgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMuc2NyZWVuUmVxdWVzdFRpbWUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQ2hhdFJlcXVlc3RUaW1lID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLmNoYXRSZXF1ZXN0VGltZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVPbGRTb3VuZElkcyA9ICh2YWx1ZTogc3RyaW5nW10pID0+IHtcbiAgICB0aGlzLm9sZFNvdW5kSWRzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUhvc3RMYWJlbCA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5ob3N0TGFiZWwubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTWFpblNjcmVlbkZpbGxlZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMubWFpblNjcmVlbkZpbGxlZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVMb2NhbFN0cmVhbVNjcmVlbiA9ICh2YWx1ZTogTWVkaWFTdHJlYW0gfCBudWxsKSA9PiB7XG4gICAgdGhpcy5sb2NhbFN0cmVhbVNjcmVlbi5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVTY3JlZW5BbHJlYWR5T24gPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnNjcmVlbkFscmVhZHlPbi5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVDaGF0QWxyZWFkeU9uID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5jaGF0QWxyZWFkeU9uLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlZGlyZWN0VVJMID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLnJlZGlyZWN0VVJMLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZU9sZEFsbFN0cmVhbXMgPSAodmFsdWU6IChQYXJ0aWNpcGFudCB8IFN0cmVhbSlbXSkgPT4ge1xuICAgIHRoaXMub2xkQWxsU3RyZWFtcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBZG1pblZpZElEID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLmFkbWluVmlkSUQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlU3RyZWFtTmFtZXMgPSAodmFsdWU6IFN0cmVhbVtdKSA9PiB7XG4gICAgdGhpcy5zdHJlYW1OYW1lcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVOb25fYWxWaWRlb1N0cmVhbXMgPSAodmFsdWU6IFBhcnRpY2lwYW50W10pID0+IHtcbiAgICB0aGlzLm5vbl9hbFZpZGVvU3RyZWFtcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVTb3J0QXVkaW9Mb3VkbmVzcyA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuc29ydEF1ZGlvTG91ZG5lc3MubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQXVkaW9EZWNpYmVscyA9ICh2YWx1ZTogQXVkaW9EZWNpYmVsc1tdKSA9PiB7XG4gICAgdGhpcy5hdWRpb0RlY2liZWxzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZU1peGVkX2FsVmlkZW9TdHJlYW1zID0gKHZhbHVlOiAoUGFydGljaXBhbnQgfCBTdHJlYW0pW10pID0+IHtcbiAgICB0aGlzLm1peGVkX2FsVmlkZW9TdHJlYW1zLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZU5vbl9hbFZpZGVvU3RyZWFtc19tdXRlZCA9ICh2YWx1ZTogUGFydGljaXBhbnRbXSkgPT4ge1xuICAgIHRoaXMubm9uX2FsVmlkZW9TdHJlYW1zX211dGVkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVBhZ2luYXRlZFN0cmVhbXMgPSAodmFsdWU6IChQYXJ0aWNpcGFudCB8IFN0cmVhbSlbXVtdKSA9PiB7XG4gICAgdGhpcy5wYWdpbmF0ZWRTdHJlYW1zLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUxvY2FsU3RyZWFtQXVkaW8gPSAodmFsdWU6IE1lZGlhU3RyZWFtIHwgbnVsbCkgPT4ge1xuICAgIHRoaXMubG9jYWxTdHJlYW1BdWRpby5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVEZWZBdWRpb0lEID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLmRlZkF1ZGlvSUQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlVXNlckRlZmF1bHRBdWRpb0lucHV0RGV2aWNlID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLnVzZXJEZWZhdWx0QXVkaW9JbnB1dERldmljZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVVc2VyRGVmYXVsdEF1ZGlvT3V0cHV0RGV2aWNlID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLnVzZXJEZWZhdWx0QXVkaW9PdXRwdXREZXZpY2UubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUHJldkF1ZGlvSW5wdXREZXZpY2UgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMucHJldkF1ZGlvSW5wdXREZXZpY2UubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUHJldlZpZGVvSW5wdXREZXZpY2UgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMucHJldlZpZGVvSW5wdXREZXZpY2UubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQXVkaW9QYXVzZWQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmF1ZGlvUGF1c2VkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZU1haW5TY3JlZW5QZXJzb24gPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMubWFpblNjcmVlblBlcnNvbi5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBZG1pbk9uTWFpblNjcmVlbiA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuYWRtaW5Pbk1haW5TY3JlZW4ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlU2NyZWVuU3RhdGVzID0gKHZhbHVlOiBTY3JlZW5TdGF0ZVtdKSA9PiB7XG4gICAgdGhpcy5zY3JlZW5TdGF0ZXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUHJldlNjcmVlblN0YXRlcyA9ICh2YWx1ZTogU2NyZWVuU3RhdGVbXSkgPT4ge1xuICAgIHRoaXMucHJldlNjcmVlblN0YXRlcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVVcGRhdGVEYXRlU3RhdGUgPSAodmFsdWU6IG51bWJlciB8IG51bGwpID0+IHtcbiAgICB0aGlzLnVwZGF0ZURhdGVTdGF0ZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVMYXN0VXBkYXRlID0gKHZhbHVlOiBudW1iZXIgfCBudWxsKSA9PiB7XG4gICAgdGhpcy5sYXN0VXBkYXRlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZU5Gb3JSZWFkanVzdFJlY29yZCA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5uRm9yUmVhZGp1c3RSZWNvcmQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlRml4ZWRQYWdlTGltaXQgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMuZml4ZWRQYWdlTGltaXQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVtb3ZlQWx0R3JpZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMucmVtb3ZlQWx0R3JpZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVORm9yUmVhZGp1c3QgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMubkZvclJlYWRqdXN0Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUxhc3RSZW9yZGVyVGltZSA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5sYXN0UmVvcmRlclRpbWUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQXVkU3RyZWFtTmFtZXMgPSAodmFsdWU6IFN0cmVhbVtdKSA9PiB7XG4gICAgdGhpcy5hdWRTdHJlYW1OYW1lcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVDdXJyZW50VXNlclBhZ2UgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMuY3VycmVudFVzZXJQYWdlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZU1haW5IZWlnaHRXaWR0aCA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5tYWluSGVpZ2h0V2lkdGgubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUHJldk1haW5IZWlnaHRXaWR0aCA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5wcmV2TWFpbkhlaWdodFdpZHRoLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVByZXZEb1BhZ2luYXRlID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5wcmV2RG9QYWdpbmF0ZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVEb1BhZ2luYXRlID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5kb1BhZ2luYXRlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVNoYXJlRW5kZWQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnNoYXJlRW5kZWQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTFN0cmVhbXMgPSAodmFsdWU6IChQYXJ0aWNpcGFudCB8IFN0cmVhbSlbXSkgPT4ge1xuICAgIHRoaXMubFN0cmVhbXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQ2hhdFJlZlN0cmVhbXMgPSAodmFsdWU6IChQYXJ0aWNpcGFudCB8IFN0cmVhbSlbXSkgPT4ge1xuICAgIHRoaXMuY2hhdFJlZlN0cmVhbXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQ29udHJvbEhlaWdodCA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5jb250cm9sSGVpZ2h0Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUlzV2lkZVNjcmVlbiA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuaXNXaWRlU2NyZWVuLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUlzTWVkaXVtU2NyZWVuID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5pc01lZGl1bVNjcmVlbi5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVJc1NtYWxsU2NyZWVuID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5pc1NtYWxsU2NyZWVuLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUFkZEdyaWQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmFkZEdyaWQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQWRkQWx0R3JpZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuYWRkQWx0R3JpZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVHcmlkUm93cyA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5ncmlkUm93cy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVHcmlkQ29scyA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5ncmlkQ29scy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBbHRHcmlkUm93cyA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5hbHRHcmlkUm93cy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBbHRHcmlkQ29scyA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5hbHRHcmlkQ29scy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVOdW1iZXJQYWdlcyA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5udW1iZXJQYWdlcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVDdXJyZW50U3RyZWFtcyA9ICh2YWx1ZTogKFBhcnRpY2lwYW50IHwgU3RyZWFtKVtdKSA9PiB7XG4gICAgdGhpcy5jdXJyZW50U3RyZWFtcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVTaG93TWluaVZpZXcgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnNob3dNaW5pVmlldy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVOU3RyZWFtID0gKHZhbHVlOiBNZWRpYVN0cmVhbSB8IG51bGwpID0+IHtcbiAgICB0aGlzLm5TdHJlYW0ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlRGVmZXJfcmVjZWl2ZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuZGVmZXJfcmVjZWl2ZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBbGxBdWRpb1N0cmVhbXMgPSAodmFsdWU6IChQYXJ0aWNpcGFudCB8IFN0cmVhbSlbXSkgPT4ge1xuICAgIHRoaXMuYWxsQXVkaW9TdHJlYW1zLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlbW90ZVNjcmVlblN0cmVhbSA9ICh2YWx1ZTogU3RyZWFtW10pID0+IHtcbiAgICB0aGlzLnJlbW90ZVNjcmVlblN0cmVhbS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVTY3JlZW5Qcm9kdWNlciA9ICh2YWx1ZTogUHJvZHVjZXIgfCBudWxsKSA9PiB7XG4gICAgdGhpcy5zY3JlZW5Qcm9kdWNlci5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVHb3RBbGxWaWRzID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5nb3RBbGxWaWRzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVBhZ2luYXRpb25IZWlnaHRXaWR0aCA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5wYWdpbmF0aW9uSGVpZ2h0V2lkdGgubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUGFnaW5hdGlvbkRpcmVjdGlvbiA9ICh2YWx1ZTogJ2hvcml6b250YWwnIHwgJ3ZlcnRpY2FsJykgPT4ge1xuICAgIHRoaXMucGFnaW5hdGlvbkRpcmVjdGlvbi5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVHcmlkU2l6ZXMgPSAodmFsdWU6IEdyaWRTaXplcykgPT4ge1xuICAgIHRoaXMuZ3JpZFNpemVzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVNjcmVlbkZvcmNlRnVsbERpc3BsYXkgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnNjcmVlbkZvcmNlRnVsbERpc3BsYXkubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTWFpbkdyaWRTdHJlYW0gPSAodmFsdWU6IEN1c3RvbU1lZGlhQ29tcG9uZW50W10pID0+IHtcbiAgICB0aGlzLm1haW5HcmlkU3RyZWFtLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZU90aGVyR3JpZFN0cmVhbXMgPSAodmFsdWU6IEN1c3RvbU1lZGlhQ29tcG9uZW50W11bXSkgPT4ge1xuICAgIHRoaXMub3RoZXJHcmlkU3RyZWFtcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBdWRpb09ubHlTdHJlYW1zID0gKHZhbHVlOiBDdXN0b21NZWRpYUNvbXBvbmVudFtdKSA9PiB7XG4gICAgdGhpcy5hdWRpb09ubHlTdHJlYW1zLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVZpZGVvSW5wdXRzID0gKHZhbHVlOiBNZWRpYURldmljZUluZm9bXSkgPT4ge1xuICAgIHRoaXMudmlkZW9JbnB1dHMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQXVkaW9JbnB1dHMgPSAodmFsdWU6IE1lZGlhRGV2aWNlSW5mb1tdKSA9PiB7XG4gICAgdGhpcy5hdWRpb0lucHV0cy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVNZWV0aW5nUHJvZ3Jlc3NUaW1lID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLm1lZXRpbmdQcm9ncmVzc1RpbWUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTWVldGluZ0VsYXBzZWRUaW1lID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLm1lZXRpbmdFbGFwc2VkVGltZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZWZfcGFydGljaXBhbnRzID0gKHZhbHVlOiBQYXJ0aWNpcGFudFtdKSA9PiB7XG4gICAgdGhpcy5yZWZfcGFydGljaXBhbnRzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIC8vIE1lc3NhZ2VzXG4gIG1lc3NhZ2VzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxNZXNzYWdlW10+KFtdKTtcbiAgc3RhcnREaXJlY3RNZXNzYWdlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGRpcmVjdE1lc3NhZ2VEZXRhaWxzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxQYXJ0aWNpcGFudCB8IG51bGw+KG51bGwpO1xuICBzaG93TWVzc2FnZXNCYWRnZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIC8vIEV2ZW50IFNldHRpbmdzXG4gIGF1ZGlvU2V0dGluZyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignYWxsb3cnKTtcbiAgdmlkZW9TZXR0aW5nID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCdhbGxvdycpO1xuICBzY3JlZW5zaGFyZVNldHRpbmcgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJ2FsbG93Jyk7XG4gIGNoYXRTZXR0aW5nID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCdhbGxvdycpO1xuXG4gIC8vIERpc3BsYXkgU2V0dGluZ3NcbiAgZGlzcGxheU9wdGlvbiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignbWVkaWEnKTtcbiAgYXV0b1dhdmUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KHRydWUpO1xuICBmb3JjZUZ1bGxEaXNwbGF5ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPih0cnVlKTtcbiAgcHJldkZvcmNlRnVsbERpc3BsYXkgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgcHJldk1lZXRpbmdEaXNwbGF5VHlwZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPigndmlkZW8nKTtcblxuICAvLyBXYWl0aW5nIFJvb21cbiAgd2FpdGluZ1Jvb21GaWx0ZXIgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICB3YWl0aW5nUm9vbUxpc3QgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFdhaXRpbmdSb29tUGFydGljaXBhbnRbXT4oXG4gICAgdGhpcy51c2VTZWVkICYmIHRoaXMuc2VlZERhdGE/LndhaXRpbmdMaXN0ID8gdGhpcy5zZWVkRGF0YS53YWl0aW5nTGlzdCA6IFtdLFxuICApO1xuICB3YWl0aW5nUm9vbUNvdW50ZXIgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG4gIGZpbHRlcmVkV2FpdGluZ1Jvb21MaXN0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxXYWl0aW5nUm9vbVBhcnRpY2lwYW50W10+KFxuICAgIHRoaXMudXNlU2VlZCAmJiB0aGlzLnNlZWREYXRhPy53YWl0aW5nTGlzdCA/IHRoaXMuc2VlZERhdGEud2FpdGluZ0xpc3QgOiBbXSxcbiAgKTtcblxuICAvLyBSZXF1ZXN0c1xuICByZXF1ZXN0RmlsdGVyID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcbiAgcmVxdWVzdExpc3QgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFJlcXVlc3RbXT4oXG4gICAgdGhpcy51c2VTZWVkICYmIHRoaXMuc2VlZERhdGE/LnJlcXVlc3RzID8gdGhpcy5zZWVkRGF0YS5yZXF1ZXN0cyA6IFtdLFxuICApO1xuICByZXF1ZXN0Q291bnRlciA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgZmlsdGVyZWRSZXF1ZXN0TGlzdCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UmVxdWVzdFtdPihcbiAgICB0aGlzLnVzZVNlZWQgJiYgdGhpcy5zZWVkRGF0YT8ucmVxdWVzdHMgPyB0aGlzLnNlZWREYXRhLnJlcXVlc3RzIDogW10sXG4gICk7XG5cbiAgLy8gVG90YWwgUmVxdWVzdHMgYW5kIFdhaXRpbmcgUm9vbVxuICB0b3RhbFJlcVdhaXQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG5cbiAgLy8gQWxlcnRzXG4gIGFsZXJ0VmlzaWJsZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBhbGVydE1lc3NhZ2UgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICBhbGVydFR5cGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PCdzdWNjZXNzJyB8ICdkYW5nZXInPignc3VjY2VzcycpO1xuICBhbGVydER1cmF0aW9uID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDMwMDApO1xuXG4gIC8vIFByb2dyZXNzIFRpbWVyXG4gIHByb2dyZXNzVGltZXJWaXNpYmxlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPih0cnVlKTtcbiAgcHJvZ3Jlc3NUaW1lclZhbHVlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuXG4gIC8vIE1lbnUgTW9kYWxzXG4gIGlzTWVudU1vZGFsVmlzaWJsZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBpc1JlY29yZGluZ01vZGFsVmlzaWJsZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBpc1NldHRpbmdzTW9kYWxWaXNpYmxlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGlzUmVxdWVzdHNNb2RhbFZpc2libGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgaXNXYWl0aW5nTW9kYWxWaXNpYmxlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGlzQ29Ib3N0TW9kYWxWaXNpYmxlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGlzTWVkaWFTZXR0aW5nc01vZGFsVmlzaWJsZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBpc0Rpc3BsYXlTZXR0aW5nc01vZGFsVmlzaWJsZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIC8vIE90aGVyIE1vZGFsc1xuICBpc1BhcnRpY2lwYW50c01vZGFsVmlzaWJsZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBpc01lc3NhZ2VzTW9kYWxWaXNpYmxlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGlzQ29uZmlybUV4aXRNb2RhbFZpc2libGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgaXNDb25maXJtSGVyZU1vZGFsVmlzaWJsZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBpc1NoYXJlRXZlbnRNb2RhbFZpc2libGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgaXNMb2FkaW5nTW9kYWxWaXNpYmxlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG5cbiAgLy8gUmVjb3JkaW5nIE9wdGlvbnNcbiAgcmVjb3JkaW5nTWVkaWFPcHRpb25zID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCd2aWRlbycpO1xuICByZWNvcmRpbmdBdWRpb09wdGlvbnMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJ2FsbCcpO1xuICByZWNvcmRpbmdWaWRlb09wdGlvbnMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJ2FsbCcpO1xuICByZWNvcmRpbmdWaWRlb1R5cGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJ2Z1bGxEaXNwbGF5Jyk7XG4gIHJlY29yZGluZ1ZpZGVvT3B0aW1pemVkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHJlY29yZGluZ0Rpc3BsYXlUeXBlID0gbmV3IEJlaGF2aW9yU3ViamVjdDwndmlkZW8nIHwgJ21lZGlhJyB8ICdhbGwnPigndmlkZW8nKTtcbiAgcmVjb3JkaW5nQWRkSExTID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPih0cnVlKTtcbiAgcmVjb3JkaW5nTmFtZVRhZ3MgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KHRydWUpO1xuICByZWNvcmRpbmdCYWNrZ3JvdW5kQ29sb3IgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJyM4M2MwZTknKTtcbiAgcmVjb3JkaW5nTmFtZVRhZ3NDb2xvciA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignI2ZmZmZmZicpO1xuICByZWNvcmRpbmdBZGRUZXh0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHJlY29yZGluZ0N1c3RvbVRleHQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJ0FkZCBUZXh0Jyk7XG4gIHJlY29yZGluZ0N1c3RvbVRleHRQb3NpdGlvbiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPigndG9wJyk7XG4gIHJlY29yZGluZ0N1c3RvbVRleHRDb2xvciA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignI2ZmZmZmZicpO1xuICByZWNvcmRpbmdPcmllbnRhdGlvblZpZGVvID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCdsYW5kc2NhcGUnKTtcbiAgY2xlYXJlZFRvUmVzdW1lID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPih0cnVlKTtcbiAgY2xlYXJlZFRvUmVjb3JkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPih0cnVlKTtcbiAgcmVjb3JkU3RhdGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJ2dyZWVuJyk7XG4gIHNob3dSZWNvcmRCdXR0b25zID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHJlY29yZGluZ1Byb2dyZXNzVGltZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignMDA6MDA6MDAnKTtcbiAgYXVkaW9Td2l0Y2hpbmcgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgdmlkZW9Td2l0Y2hpbmcgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcblxuICAvLyBNZWRpYSBTdGF0ZXNcbiAgdmlkZW9BbHJlYWR5T24gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgYXVkaW9BbHJlYWR5T24gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcblxuICBjb21wb25lbnRTaXplcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Q29tcG9uZW50U2l6ZXM+KHtcbiAgICBtYWluSGVpZ2h0OiAwLFxuICAgIG90aGVySGVpZ2h0OiAwLFxuICAgIG1haW5XaWR0aDogMCxcbiAgICBvdGhlcldpZHRoOiAwLFxuICB9KTtcblxuICAvLyBQZXJtaXNzaW9uc1xuICBoYXNDYW1lcmFQZXJtaXNzaW9uID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGhhc0F1ZGlvUGVybWlzc2lvbiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIC8vIFRyYW5zcG9ydHNcbiAgdHJhbnNwb3J0Q3JlYXRlZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICB0cmFuc3BvcnRDcmVhdGVkVmlkZW8gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgdHJhbnNwb3J0Q3JlYXRlZEF1ZGlvID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHRyYW5zcG9ydENyZWF0ZWRTY3JlZW4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgcHJvZHVjZXJUcmFuc3BvcnQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFRyYW5zcG9ydCB8IG51bGw+KG51bGwpO1xuICB2aWRlb1Byb2R1Y2VyID0gbmV3IEJlaGF2aW9yU3ViamVjdDxQcm9kdWNlciB8IG51bGw+KG51bGwpO1xuICBwYXJhbXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFByb2R1Y2VyT3B0aW9ucz4oe30gYXMgUHJvZHVjZXJPcHRpb25zKTtcbiAgdmlkZW9QYXJhbXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFByb2R1Y2VyT3B0aW9ucz4oe30gYXMgUHJvZHVjZXJPcHRpb25zKTtcbiAgYXVkaW9QYXJhbXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFByb2R1Y2VyT3B0aW9ucz4oe30gYXMgUHJvZHVjZXJPcHRpb25zKTtcbiAgYXVkaW9Qcm9kdWNlciA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UHJvZHVjZXIgfCBudWxsPihudWxsKTtcbiAgY29uc3VtZXJUcmFuc3BvcnRzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxUcmFuc3BvcnRUeXBlW10+KFtdKTtcbiAgY29uc3VtaW5nVHJhbnNwb3J0cyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nW10+KFtdKTtcblxuICAvLyBQb2xsc1xuICBwb2xscyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UG9sbFtdPihcbiAgICB0aGlzLnVzZVNlZWQgJiYgdGhpcy5zZWVkRGF0YT8ucG9sbHMgPyB0aGlzLnNlZWREYXRhLnBvbGxzIDogW10sXG4gICk7XG4gIHBvbGwgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFBvbGwgfCBudWxsPihudWxsKTtcbiAgaXNQb2xsTW9kYWxWaXNpYmxlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG5cbiAgLy8gQmFja2dyb3VuZFxuICBjdXN0b21JbWFnZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gIHNlbGVjdGVkSW1hZ2UgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICBzZWdtZW50VmlkZW8gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE1lZGlhU3RyZWFtIHwgbnVsbD4obnVsbCk7XG4gIHNlbGZpZVNlZ21lbnRhdGlvbiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8U2VsZmllU2VnbWVudGF0aW9uIHwgbnVsbD4obnVsbCk7XG4gIHBhdXNlU2VnbWVudGF0aW9uID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHByb2Nlc3NlZFN0cmVhbSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8TWVkaWFTdHJlYW0gfCBudWxsPihudWxsKTtcbiAga2VlcEJhY2tncm91bmQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgYmFja2dyb3VuZEhhc0NoYW5nZWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgdmlydHVhbFN0cmVhbSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8TWVkaWFTdHJlYW0gfCBudWxsPihudWxsKTtcbiAgbWFpbkNhbnZhcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8SFRNTENhbnZhc0VsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgcHJldktlZXBCYWNrZ3JvdW5kID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGFwcGxpZWRCYWNrZ3JvdW5kID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGlzQmFja2dyb3VuZE1vZGFsVmlzaWJsZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBhdXRvQ2xpY2tCYWNrZ3JvdW5kID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG5cbiAgLy8gQnJlYWtvdXQgUm9vbXNcbiAgYnJlYWtvdXRSb29tcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8QnJlYWtvdXRQYXJ0aWNpcGFudFtdW10+KFxuICAgIHRoaXMudXNlU2VlZCAmJiB0aGlzLnNlZWREYXRhPy5icmVha291dFJvb21zID8gdGhpcy5zZWVkRGF0YS5icmVha291dFJvb21zIDogW10sXG4gICk7XG4gIGN1cnJlbnRSb29tSW5kZXggPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG4gIGNhblN0YXJ0QnJlYWtvdXQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgYnJlYWtPdXRSb29tU3RhcnRlZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBicmVha091dFJvb21FbmRlZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBob3N0TmV3Um9vbSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigtMSk7XG4gIGxpbWl0ZWRCcmVha1Jvb20gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEJyZWFrb3V0UGFydGljaXBhbnRbXT4oW10pO1xuICBtYWluUm9vbXNMZW5ndGggPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG4gIG1lbWJlclJvb20gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oLTEpO1xuICBpc0JyZWFrb3V0Um9vbXNNb2RhbFZpc2libGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcblxuICAvLyBXaGl0ZWJvYXJkXG4gIHdoaXRlYm9hcmRVc2VycyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8V2hpdGVib2FyZFVzZXJbXT4oXG4gICAgdGhpcy51c2VTZWVkICYmIHRoaXMuc2VlZERhdGE/LndoaXRlYm9hcmRVc2VycyA/IHRoaXMuc2VlZERhdGEud2hpdGVib2FyZFVzZXJzIDogW10sXG4gICk7XG4gIGN1cnJlbnRXaGl0ZWJvYXJkSW5kZXggPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG4gIGNhblN0YXJ0V2hpdGVib2FyZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICB3aGl0ZWJvYXJkU3RhcnRlZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICB3aGl0ZWJvYXJkRW5kZWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgd2hpdGVib2FyZExpbWl0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDQpO1xuICBpc1doaXRlYm9hcmRNb2RhbFZpc2libGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgaXNDb25maWd1cmVXaGl0ZWJvYXJkTW9kYWxWaXNpYmxlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHNoYXBlcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8U2hhcGVbXT4oW10pO1xuICB1c2VJbWFnZUJhY2tncm91bmQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KHRydWUpO1xuICByZWRvU3RhY2sgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFNoYXBlW10+KFtdKTtcbiAgdW5kb1N0YWNrID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmdbXT4oW10pO1xuICBjYW52YXNTdHJlYW0gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE1lZGlhU3RyZWFtIHwgbnVsbD4obnVsbCk7XG4gIGNhbnZhc1doaXRlYm9hcmQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEhUTUxDYW52YXNFbGVtZW50IHwgbnVsbD4obnVsbCk7XG5cbiAgLy8gU2NyZWVuYm9hcmRcbiAgY2FudmFzU2NyZWVuYm9hcmQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEhUTUxDYW52YXNFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIHByb2Nlc3NlZFNjcmVlblN0cmVhbSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8TWVkaWFTdHJlYW0gfCBudWxsPihudWxsKTtcbiAgYW5ub3RhdGVTY3JlZW5TdHJlYW0gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgbWFpblNjcmVlbkNhbnZhcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8SFRNTENhbnZhc0VsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgaXNTY3JlZW5ib2FyZE1vZGFsVmlzaWJsZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIC8vc3RhdGUgdmFyaWFibGVzIGZvciB0aGUgY29udHJvbCBidXR0b25zXG4gIG1pY0FjdGl2ZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oXG4gICAgdGhpcy5hdWRpb0FscmVhZHlPbi52YWx1ZSA/IHRoaXMuYXVkaW9BbHJlYWR5T24udmFsdWUgOiBmYWxzZSxcbiAgKTtcbiAgdmlkZW9BY3RpdmUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KFxuICAgIHRoaXMudmlkZW9BbHJlYWR5T24udmFsdWUgPyB0aGlzLnZpZGVvQWxyZWFkeU9uLnZhbHVlIDogZmFsc2UsXG4gICk7XG4gIHNjcmVlblNoYXJlQWN0aXZlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGVuZENhbGxBY3RpdmUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgcGFydGljaXBhbnRzQWN0aXZlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIG1lbnVBY3RpdmUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgY29tbWVudHNBY3RpdmUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcblxuICAvLyBVcGRhdGUgZnVuY3Rpb25zXG4gIHVwZGF0ZU1lc3NhZ2VzID0gKHZhbHVlOiBNZXNzYWdlW10pID0+IHtcbiAgICB0aGlzLm1lc3NhZ2VzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVN0YXJ0RGlyZWN0TWVzc2FnZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuc3RhcnREaXJlY3RNZXNzYWdlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZURpcmVjdE1lc3NhZ2VEZXRhaWxzID0gKHZhbHVlOiBQYXJ0aWNpcGFudCB8IG51bGwpID0+IHtcbiAgICB0aGlzLmRpcmVjdE1lc3NhZ2VEZXRhaWxzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVNob3dNZXNzYWdlc0JhZGdlID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5zaG93TWVzc2FnZXNCYWRnZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBdWRpb1NldHRpbmcgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMuYXVkaW9TZXR0aW5nLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVZpZGVvU2V0dGluZyA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy52aWRlb1NldHRpbmcubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlU2NyZWVuc2hhcmVTZXR0aW5nID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLnNjcmVlbnNoYXJlU2V0dGluZy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVDaGF0U2V0dGluZyA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5jaGF0U2V0dGluZy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVEaXNwbGF5T3B0aW9uID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLmRpc3BsYXlPcHRpb24ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQXV0b1dhdmUgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmF1dG9XYXZlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUZvcmNlRnVsbERpc3BsYXkgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmZvcmNlRnVsbERpc3BsYXkubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUHJldkZvcmNlRnVsbERpc3BsYXkgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnByZXZGb3JjZUZ1bGxEaXNwbGF5Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVByZXZNZWV0aW5nRGlzcGxheVR5cGUgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMucHJldk1lZXRpbmdEaXNwbGF5VHlwZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVXYWl0aW5nUm9vbUNvdW50ZXIgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMud2FpdGluZ1Jvb21Db3VudGVyLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVdhaXRpbmdSb29tRmlsdGVyID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLndhaXRpbmdSb29tRmlsdGVyLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVdhaXRpbmdSb29tTGlzdCA9ICh2YWx1ZTogV2FpdGluZ1Jvb21QYXJ0aWNpcGFudFtdKSA9PiB7XG4gICAgdGhpcy53YWl0aW5nUm9vbUxpc3QubmV4dCh2YWx1ZSk7XG4gICAgdGhpcy5maWx0ZXJlZFdhaXRpbmdSb29tTGlzdC5uZXh0KHZhbHVlKTtcbiAgICB0aGlzLndhaXRpbmdSb29tQ291bnRlci5uZXh0KHZhbHVlLmxlbmd0aCk7XG4gIH07XG5cbiAgb25XYWl0aW5nUm9vbUZpbHRlckNoYW5nZSA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgaWYgKHZhbHVlICE9PSAnJyAmJiB2YWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBmaWx0ZXJlZFdhaXRpbmdSb29tID0gdGhpcy53YWl0aW5nUm9vbUxpc3RcbiAgICAgICAgLmdldFZhbHVlKClcbiAgICAgICAgLmZpbHRlcigod2FpdGluZ1Jvb206IFdhaXRpbmdSb29tUGFydGljaXBhbnQpID0+IHtcbiAgICAgICAgICByZXR1cm4gd2FpdGluZ1Jvb20ubmFtZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHZhbHVlLnRvTG93ZXJDYXNlKCkpO1xuICAgICAgICB9KTtcbiAgICAgIHRoaXMuZmlsdGVyZWRXYWl0aW5nUm9vbUxpc3QubmV4dChmaWx0ZXJlZFdhaXRpbmdSb29tKTtcbiAgICAgIHRoaXMud2FpdGluZ1Jvb21Db3VudGVyLm5leHQoZmlsdGVyZWRXYWl0aW5nUm9vbS5sZW5ndGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmZpbHRlcmVkV2FpdGluZ1Jvb21MaXN0Lm5leHQodGhpcy53YWl0aW5nUm9vbUxpc3QuZ2V0VmFsdWUoKSk7XG4gICAgICB0aGlzLndhaXRpbmdSb29tQ291bnRlci5uZXh0KHRoaXMud2FpdGluZ1Jvb21MaXN0LmdldFZhbHVlKCkubGVuZ3RoKTtcbiAgICB9XG4gIH07XG5cbiAgb25XYWl0aW5nUm9vbUNsb3NlID0gKCkgPT4ge1xuICAgIHRoaXMudXBkYXRlSXNXYWl0aW5nTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgfTtcblxuICB1cGRhdGVSZXF1ZXN0Q291bnRlciA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5yZXF1ZXN0Q291bnRlci5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZXF1ZXN0RmlsdGVyID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLnJlcXVlc3RGaWx0ZXIubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVxdWVzdExpc3QgPSAodmFsdWU6IFJlcXVlc3RbXSkgPT4ge1xuICAgIHRoaXMucmVxdWVzdExpc3QubmV4dCh2YWx1ZSk7XG4gICAgdGhpcy5maWx0ZXJlZFJlcXVlc3RMaXN0Lm5leHQodmFsdWUpO1xuICAgIHRoaXMucmVxdWVzdENvdW50ZXIubmV4dCh2YWx1ZS5sZW5ndGgpO1xuICB9O1xuXG4gIG9uUmVxdWVzdEZpbHRlckNoYW5nZSA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgaWYgKHZhbHVlICE9PSAnJyAmJiB2YWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBmaWx0ZXJlZFJlcXVlc3QgPSB0aGlzLnJlcXVlc3RMaXN0LmdldFZhbHVlKCkuZmlsdGVyKChyZXF1ZXN0OiBSZXF1ZXN0KSA9PiB7XG4gICAgICAgIHJldHVybiByZXF1ZXN0Py5uYW1lPy50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHZhbHVlLnRvTG93ZXJDYXNlKCkpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLmZpbHRlcmVkUmVxdWVzdExpc3QubmV4dChmaWx0ZXJlZFJlcXVlc3QpO1xuICAgICAgdGhpcy5yZXF1ZXN0Q291bnRlci5uZXh0KGZpbHRlcmVkUmVxdWVzdC5sZW5ndGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmZpbHRlcmVkUmVxdWVzdExpc3QubmV4dCh0aGlzLnJlcXVlc3RMaXN0LmdldFZhbHVlKCkpO1xuICAgICAgdGhpcy5yZXF1ZXN0Q291bnRlci5uZXh0KHRoaXMucmVxdWVzdExpc3QuZ2V0VmFsdWUoKS5sZW5ndGgpO1xuICAgIH1cbiAgfTtcblxuICBvblJlcXVlc3RDbG9zZSA9ICgpID0+IHtcbiAgICB0aGlzLnVwZGF0ZUlzUmVxdWVzdHNNb2RhbFZpc2libGUoZmFsc2UpO1xuICB9O1xuXG4gIHVwZGF0ZVRvdGFsUmVxV2FpdCA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy50b3RhbFJlcVdhaXQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQWxlcnRWaXNpYmxlID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5hbGVydFZpc2libGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQWxlcnRNZXNzYWdlID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLmFsZXJ0TWVzc2FnZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBbGVydFR5cGUgPSAodmFsdWU6ICdzdWNjZXNzJyB8ICdkYW5nZXInKSA9PiB7XG4gICAgdGhpcy5hbGVydFR5cGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQWxlcnREdXJhdGlvbiA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5hbGVydER1cmF0aW9uLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVByb2dyZXNzVGltZXJWaXNpYmxlID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5wcm9ncmVzc1RpbWVyVmlzaWJsZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVQcm9ncmVzc1RpbWVyVmFsdWUgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMucHJvZ3Jlc3NUaW1lclZhbHVlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUlzTWVudU1vZGFsVmlzaWJsZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuaXNNZW51TW9kYWxWaXNpYmxlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUlzUmVjb3JkaW5nTW9kYWxWaXNpYmxlID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5pc1JlY29yZGluZ01vZGFsVmlzaWJsZS5uZXh0KHZhbHVlKTtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMudXBkYXRlQ29uZmlybWVkVG9SZWNvcmQoZmFsc2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMuY2xlYXJlZFRvUmVjb3JkLmdldFZhbHVlKCkgJiZcbiAgICAgICAgdGhpcy5jbGVhcmVkVG9SZXN1bWUuZ2V0VmFsdWUoKSAmJlxuICAgICAgICB0aGlzLnJlY29yZFN0YXJ0ZWQuZ2V0VmFsdWUoKVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMudXBkYXRlU2hvd1JlY29yZEJ1dHRvbnModHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHVwZGF0ZUlzU2V0dGluZ3NNb2RhbFZpc2libGUgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmlzU2V0dGluZ3NNb2RhbFZpc2libGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlSXNSZXF1ZXN0c01vZGFsVmlzaWJsZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuaXNSZXF1ZXN0c01vZGFsVmlzaWJsZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVJc1dhaXRpbmdNb2RhbFZpc2libGUgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmlzV2FpdGluZ01vZGFsVmlzaWJsZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVJc0NvSG9zdE1vZGFsVmlzaWJsZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuaXNDb0hvc3RNb2RhbFZpc2libGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlSXNNZWRpYVNldHRpbmdzTW9kYWxWaXNpYmxlID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5pc01lZGlhU2V0dGluZ3NNb2RhbFZpc2libGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlSXNEaXNwbGF5U2V0dGluZ3NNb2RhbFZpc2libGUgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmlzRGlzcGxheVNldHRpbmdzTW9kYWxWaXNpYmxlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUlzUGFydGljaXBhbnRzTW9kYWxWaXNpYmxlID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5pc1BhcnRpY2lwYW50c01vZGFsVmlzaWJsZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVJc01lc3NhZ2VzTW9kYWxWaXNpYmxlID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5pc01lc3NhZ2VzTW9kYWxWaXNpYmxlLm5leHQodmFsdWUpO1xuICAgIGlmICghdmFsdWUpIHtcbiAgICAgIHRoaXMudXBkYXRlU2hvd01lc3NhZ2VzQmFkZ2UoZmFsc2UpO1xuICAgIH1cbiAgfTtcblxuICB1cGRhdGVJc0NvbmZpcm1FeGl0TW9kYWxWaXNpYmxlID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5pc0NvbmZpcm1FeGl0TW9kYWxWaXNpYmxlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUlzQ29uZmlybUhlcmVNb2RhbFZpc2libGUgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmlzQ29uZmlybUhlcmVNb2RhbFZpc2libGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlSXNMb2FkaW5nTW9kYWxWaXNpYmxlID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5pc0xvYWRpbmdNb2RhbFZpc2libGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlSXNTaGFyZUV2ZW50TW9kYWxWaXNpYmxlID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5pc1NoYXJlRXZlbnRNb2RhbFZpc2libGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nTWVkaWFPcHRpb25zID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ01lZGlhT3B0aW9ucy5uZXh0KHZhbHVlKTtcbiAgICB0aGlzLmNsZWFyZWRUb1JlY29yZC5uZXh0KGZhbHNlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRpbmdBdWRpb09wdGlvbnMgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMucmVjb3JkaW5nQXVkaW9PcHRpb25zLm5leHQodmFsdWUpO1xuICAgIHRoaXMuY2xlYXJlZFRvUmVjb3JkLm5leHQoZmFsc2UpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ1ZpZGVvT3B0aW9ucyA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdWaWRlb09wdGlvbnMubmV4dCh2YWx1ZSk7XG4gICAgdGhpcy5jbGVhcmVkVG9SZWNvcmQubmV4dChmYWxzZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nVmlkZW9UeXBlID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ1ZpZGVvVHlwZS5uZXh0KHZhbHVlKTtcbiAgICB0aGlzLmNsZWFyZWRUb1JlY29yZC5uZXh0KGZhbHNlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRpbmdWaWRlb09wdGltaXplZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMucmVjb3JkaW5nVmlkZW9PcHRpbWl6ZWQubmV4dCh2YWx1ZSk7XG4gICAgdGhpcy5jbGVhcmVkVG9SZWNvcmQubmV4dChmYWxzZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nRGlzcGxheVR5cGUgPSAodmFsdWU6ICd2aWRlbycgfCAnbWVkaWEnIHwgJ2FsbCcpID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ0Rpc3BsYXlUeXBlLm5leHQodmFsdWUpO1xuICAgIHRoaXMuY2xlYXJlZFRvUmVjb3JkLm5leHQoZmFsc2UpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ0FkZEhMUyA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMucmVjb3JkaW5nQWRkSExTLm5leHQodmFsdWUpO1xuICAgIHRoaXMuY2xlYXJlZFRvUmVjb3JkLm5leHQoZmFsc2UpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ0FkZFRleHQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ0FkZFRleHQubmV4dCh2YWx1ZSk7XG4gICAgdGhpcy5jbGVhcmVkVG9SZWNvcmQubmV4dChmYWxzZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nQ3VzdG9tVGV4dCA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdDdXN0b21UZXh0Lm5leHQodmFsdWUpO1xuICAgIHRoaXMuY2xlYXJlZFRvUmVjb3JkLm5leHQoZmFsc2UpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ0N1c3RvbVRleHRQb3NpdGlvbiA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdDdXN0b21UZXh0UG9zaXRpb24ubmV4dCh2YWx1ZSk7XG4gICAgdGhpcy5jbGVhcmVkVG9SZWNvcmQubmV4dChmYWxzZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nQ3VzdG9tVGV4dENvbG9yID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ0N1c3RvbVRleHRDb2xvci5uZXh0KHZhbHVlKTtcbiAgICB0aGlzLmNsZWFyZWRUb1JlY29yZC5uZXh0KGZhbHNlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRpbmdOYW1lVGFncyA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMucmVjb3JkaW5nTmFtZVRhZ3MubmV4dCh2YWx1ZSk7XG4gICAgdGhpcy5jbGVhcmVkVG9SZWNvcmQubmV4dChmYWxzZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nQmFja2dyb3VuZENvbG9yID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ0JhY2tncm91bmRDb2xvci5uZXh0KHZhbHVlKTtcbiAgICB0aGlzLmNsZWFyZWRUb1JlY29yZC5uZXh0KGZhbHNlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRpbmdOYW1lVGFnc0NvbG9yID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ05hbWVUYWdzQ29sb3IubmV4dCh2YWx1ZSk7XG4gICAgdGhpcy5jbGVhcmVkVG9SZWNvcmQubmV4dChmYWxzZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nT3JpZW50YXRpb25WaWRlbyA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdPcmllbnRhdGlvblZpZGVvLm5leHQodmFsdWUpO1xuICAgIHRoaXMuY2xlYXJlZFRvUmVjb3JkLm5leHQoZmFsc2UpO1xuICB9O1xuXG4gIHVwZGF0ZUNsZWFyZWRUb1Jlc3VtZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuY2xlYXJlZFRvUmVzdW1lLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUNsZWFyZWRUb1JlY29yZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuY2xlYXJlZFRvUmVjb3JkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZFN0YXRlID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICBpZiAodGhpcy5yZWNvcmRTdGFydGVkLnZhbHVlICYmICF0aGlzLnJlY29yZFN0b3BwZWQudmFsdWUpIHtcbiAgICAgIGlmICghdGhpcy5yZWNvcmRQYXVzZWQudmFsdWUpIHtcbiAgICAgICAgdGhpcy5yZWNvcmRTdGF0ZS5uZXh0KCdyZWQnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucmVjb3JkU3RhdGUubmV4dCgneWVsbG93Jyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVjb3JkU3RhdGUubmV4dCh2YWx1ZSk7XG4gICAgfVxuICAgIHRoaXMucmVjb3JkU3RhdGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlU2hvd1JlY29yZEJ1dHRvbnMgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnNob3dSZWNvcmRCdXR0b25zLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ1Byb2dyZXNzVGltZSA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdQcm9ncmVzc1RpbWUubmV4dCh2YWx1ZSk7XG4gICAgdGhpcy51cGRhdGVSZWNvcmRUaW1lcldpZGdldCgpO1xuICB9O1xuXG4gIHVwZGF0ZUF1ZGlvU3dpdGNoaW5nID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5hdWRpb1N3aXRjaGluZy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVWaWRlb1N3aXRjaGluZyA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMudmlkZW9Td2l0Y2hpbmcubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlVmlkZW9BbHJlYWR5T24gPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnZpZGVvQWxyZWFkeU9uLm5leHQodmFsdWUpO1xuICAgIHRoaXMudmlkZW9BY3RpdmUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQXVkaW9BbHJlYWR5T24gPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmF1ZGlvQWxyZWFkeU9uLm5leHQodmFsdWUpO1xuICAgIHRoaXMubWljQWN0aXZlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUNvbXBvbmVudFNpemVzID0gKHNpemVzOiBDb21wb25lbnRTaXplcykgPT4ge1xuICAgIHRoaXMuY29tcG9uZW50U2l6ZXMubmV4dChzaXplcyk7XG4gIH07XG5cbiAgdXBkYXRlSGFzQ2FtZXJhUGVybWlzc2lvbiA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuaGFzQ2FtZXJhUGVybWlzc2lvbi5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVIYXNBdWRpb1Blcm1pc3Npb24gPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmhhc0F1ZGlvUGVybWlzc2lvbi5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICByZXF1ZXN0UGVybWlzc2lvbkNhbWVyYSgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIC8vIEltcGxlbWVudCB0aGUgcmVxdWVzdCBwZXJtaXNzaW9uIGxvZ2ljIGhlcmVcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCdncmFudGVkJyk7XG4gIH1cblxuICByZXF1ZXN0UGVybWlzc2lvbkF1ZGlvKCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgLy8gSW1wbGVtZW50IHRoZSByZXF1ZXN0IHBlcm1pc3Npb24gbG9naWMgaGVyZVxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoJ2dyYW50ZWQnKTtcbiAgfVxuXG4gIHVwZGF0ZVRyYW5zcG9ydENyZWF0ZWQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnRyYW5zcG9ydENyZWF0ZWQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlVHJhbnNwb3J0Q3JlYXRlZFZpZGVvID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy50cmFuc3BvcnRDcmVhdGVkVmlkZW8ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlVHJhbnNwb3J0Q3JlYXRlZEF1ZGlvID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy50cmFuc3BvcnRDcmVhdGVkQXVkaW8ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlVHJhbnNwb3J0Q3JlYXRlZFNjcmVlbiA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMudHJhbnNwb3J0Q3JlYXRlZFNjcmVlbi5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVQcm9kdWNlclRyYW5zcG9ydCA9ICh2YWx1ZTogVHJhbnNwb3J0IHwgbnVsbCkgPT4ge1xuICAgIHRoaXMucHJvZHVjZXJUcmFuc3BvcnQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlVmlkZW9Qcm9kdWNlciA9ICh2YWx1ZTogUHJvZHVjZXIgfCBudWxsKSA9PiB7XG4gICAgdGhpcy52aWRlb1Byb2R1Y2VyLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVBhcmFtcyA9ICh2YWx1ZTogUHJvZHVjZXJPcHRpb25zKSA9PiB7XG4gICAgdGhpcy5wYXJhbXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlVmlkZW9QYXJhbXMgPSAodmFsdWU6IFByb2R1Y2VyT3B0aW9ucykgPT4ge1xuICAgIHRoaXMudmlkZW9QYXJhbXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQXVkaW9QYXJhbXMgPSAodmFsdWU6IFByb2R1Y2VyT3B0aW9ucykgPT4ge1xuICAgIHRoaXMuYXVkaW9QYXJhbXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQXVkaW9Qcm9kdWNlciA9ICh2YWx1ZTogUHJvZHVjZXIgfCBudWxsKSA9PiB7XG4gICAgdGhpcy5hdWRpb1Byb2R1Y2VyLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUNvbnN1bWVyVHJhbnNwb3J0cyA9ICh2YWx1ZTogVHJhbnNwb3J0VHlwZVtdKSA9PiB7XG4gICAgdGhpcy5jb25zdW1lclRyYW5zcG9ydHMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQ29uc3VtaW5nVHJhbnNwb3J0cyA9ICh2YWx1ZTogc3RyaW5nW10pID0+IHtcbiAgICB0aGlzLmNvbnN1bWluZ1RyYW5zcG9ydHMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUG9sbHMgPSAodmFsdWU6IFBvbGxbXSkgPT4ge1xuICAgIHRoaXMucG9sbHMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUG9sbCA9ICh2YWx1ZTogUG9sbCB8IG51bGwpID0+IHtcbiAgICB0aGlzLnBvbGwubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlSXNQb2xsTW9kYWxWaXNpYmxlID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5pc1BvbGxNb2RhbFZpc2libGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQ3VzdG9tSW1hZ2UgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMuY3VzdG9tSW1hZ2UubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlU2VsZWN0ZWRJbWFnZSA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5zZWxlY3RlZEltYWdlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVNlZ21lbnRWaWRlbyA9ICh2YWx1ZTogTWVkaWFTdHJlYW0gfCBudWxsKSA9PiB7XG4gICAgdGhpcy5zZWdtZW50VmlkZW8ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlU2VsZmllU2VnbWVudGF0aW9uID0gKHZhbHVlOiBTZWxmaWVTZWdtZW50YXRpb24gfCBudWxsKSA9PiB7XG4gICAgdGhpcy5zZWxmaWVTZWdtZW50YXRpb24ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUGF1c2VTZWdtZW50YXRpb24gPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnBhdXNlU2VnbWVudGF0aW9uLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVByb2Nlc3NlZFN0cmVhbSA9ICh2YWx1ZTogTWVkaWFTdHJlYW0gfCBudWxsKSA9PiB7XG4gICAgdGhpcy5wcm9jZXNzZWRTdHJlYW0ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlS2VlcEJhY2tncm91bmQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmtlZXBCYWNrZ3JvdW5kLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUJhY2tncm91bmRIYXNDaGFuZ2VkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5iYWNrZ3JvdW5kSGFzQ2hhbmdlZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVWaXJ0dWFsU3RyZWFtID0gKHZhbHVlOiBNZWRpYVN0cmVhbSB8IG51bGwpID0+IHtcbiAgICB0aGlzLnZpcnR1YWxTdHJlYW0ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTWFpbkNhbnZhcyA9ICh2YWx1ZTogSFRNTENhbnZhc0VsZW1lbnQgfCBudWxsKSA9PiB7XG4gICAgdGhpcy5tYWluQ2FudmFzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVByZXZLZWVwQmFja2dyb3VuZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMucHJldktlZXBCYWNrZ3JvdW5kLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUFwcGxpZWRCYWNrZ3JvdW5kID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5hcHBsaWVkQmFja2dyb3VuZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVJc0JhY2tncm91bmRNb2RhbFZpc2libGUgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmlzQmFja2dyb3VuZE1vZGFsVmlzaWJsZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBdXRvQ2xpY2tCYWNrZ3JvdW5kID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5hdXRvQ2xpY2tCYWNrZ3JvdW5kLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUJyZWFrb3V0Um9vbXMgPSAodmFsdWU6IEJyZWFrb3V0UGFydGljaXBhbnRbXVtdKSA9PiB7XG4gICAgdGhpcy5icmVha291dFJvb21zLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUN1cnJlbnRSb29tSW5kZXggPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMuY3VycmVudFJvb21JbmRleC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVDYW5TdGFydEJyZWFrb3V0ID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5jYW5TdGFydEJyZWFrb3V0Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUJyZWFrT3V0Um9vbVN0YXJ0ZWQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmJyZWFrT3V0Um9vbVN0YXJ0ZWQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQnJlYWtPdXRSb29tRW5kZWQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmJyZWFrT3V0Um9vbUVuZGVkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUhvc3ROZXdSb29tID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLmhvc3ROZXdSb29tLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUxpbWl0ZWRCcmVha1Jvb20gPSAodmFsdWU6IEJyZWFrb3V0UGFydGljaXBhbnRbXSkgPT4ge1xuICAgIHRoaXMubGltaXRlZEJyZWFrUm9vbS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVNYWluUm9vbXNMZW5ndGggPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMubWFpblJvb21zTGVuZ3RoLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZU1lbWJlclJvb20gPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMubWVtYmVyUm9vbS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVJc0JyZWFrb3V0Um9vbXNNb2RhbFZpc2libGUgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmlzQnJlYWtvdXRSb29tc01vZGFsVmlzaWJsZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVXaGl0ZWJvYXJkVXNlcnMgPSAodmFsdWU6IFdoaXRlYm9hcmRVc2VyW10pID0+IHtcbiAgICB0aGlzLndoaXRlYm9hcmRVc2Vycy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVDdXJyZW50V2hpdGVib2FyZEluZGV4ID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLmN1cnJlbnRXaGl0ZWJvYXJkSW5kZXgubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQ2FuU3RhcnRXaGl0ZWJvYXJkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5jYW5TdGFydFdoaXRlYm9hcmQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlV2hpdGVib2FyZFN0YXJ0ZWQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLndoaXRlYm9hcmRTdGFydGVkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVdoaXRlYm9hcmRFbmRlZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMud2hpdGVib2FyZEVuZGVkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVdoaXRlYm9hcmRMaW1pdCA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy53aGl0ZWJvYXJkTGltaXQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlSXNXaGl0ZWJvYXJkTW9kYWxWaXNpYmxlID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5pc1doaXRlYm9hcmRNb2RhbFZpc2libGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlSXNDb25maWd1cmVXaGl0ZWJvYXJkTW9kYWxWaXNpYmxlID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5pc0NvbmZpZ3VyZVdoaXRlYm9hcmRNb2RhbFZpc2libGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlU2hhcGVzID0gKHZhbHVlOiBTaGFwZVtdKSA9PiB7XG4gICAgdGhpcy5zaGFwZXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlVXNlSW1hZ2VCYWNrZ3JvdW5kID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy51c2VJbWFnZUJhY2tncm91bmQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVkb1N0YWNrID0gKHZhbHVlOiBTaGFwZVtdKSA9PiB7XG4gICAgdGhpcy5yZWRvU3RhY2submV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlVW5kb1N0YWNrID0gKHZhbHVlOiBzdHJpbmdbXSkgPT4ge1xuICAgIHRoaXMudW5kb1N0YWNrLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUNhbnZhc1N0cmVhbSA9ICh2YWx1ZTogTWVkaWFTdHJlYW0gfCBudWxsKSA9PiB7XG4gICAgdGhpcy5jYW52YXNTdHJlYW0ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQ2FudmFzV2hpdGVib2FyZCA9ICh2YWx1ZTogSFRNTENhbnZhc0VsZW1lbnQgfCBudWxsKSA9PiB7XG4gICAgdGhpcy5jYW52YXNXaGl0ZWJvYXJkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUNhbnZhc1NjcmVlbmJvYXJkID0gKHZhbHVlOiBIVE1MQ2FudmFzRWxlbWVudCB8IG51bGwpID0+IHtcbiAgICB0aGlzLmNhbnZhc1NjcmVlbmJvYXJkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVByb2Nlc3NlZFNjcmVlblN0cmVhbSA9ICh2YWx1ZTogTWVkaWFTdHJlYW0gfCBudWxsKSA9PiB7XG4gICAgdGhpcy5wcm9jZXNzZWRTY3JlZW5TdHJlYW0ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQW5ub3RhdGVTY3JlZW5TdHJlYW0gPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmFubm90YXRlU2NyZWVuU3RyZWFtLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZU1haW5TY3JlZW5DYW52YXMgPSAodmFsdWU6IEhUTUxDYW52YXNFbGVtZW50IHwgbnVsbCkgPT4ge1xuICAgIHRoaXMubWFpblNjcmVlbkNhbnZhcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVJc1NjcmVlbmJvYXJkTW9kYWxWaXNpYmxlID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5pc1NjcmVlbmJvYXJkTW9kYWxWaXNpYmxlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIGNoZWNrT3JpZW50YXRpb24gPSAoKSA9PiB7XG4gICAgY29uc3QgaXNQb3J0cmFpdCA9IHdpbmRvdy5tYXRjaE1lZGlhKCcob3JpZW50YXRpb246IHBvcnRyYWl0KScpLm1hdGNoZXM7XG4gICAgcmV0dXJuIGlzUG9ydHJhaXQgPyAncG9ydHJhaXQnIDogJ2xhbmRzY2FwZSc7XG4gIH07XG5cbiAgc2hvd0FsZXJ0ID0gKHtcbiAgICBtZXNzYWdlLFxuICAgIHR5cGUsXG4gICAgZHVyYXRpb24gPSAzMDAwLFxuICB9OiB7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xuICAgIHR5cGU6ICdzdWNjZXNzJyB8ICdkYW5nZXInO1xuICAgIGR1cmF0aW9uPzogbnVtYmVyO1xuICB9KSA9PiB7XG4gICAgdGhpcy51cGRhdGVBbGVydE1lc3NhZ2UobWVzc2FnZSk7XG4gICAgdGhpcy51cGRhdGVBbGVydFR5cGUodHlwZSk7XG4gICAgdGhpcy51cGRhdGVBbGVydER1cmF0aW9uKGR1cmF0aW9uKTtcbiAgICB0aGlzLnVwZGF0ZUFsZXJ0VmlzaWJsZSh0cnVlKTtcbiAgfTtcblxuICBnZXRBbGxQYXJhbXMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGxvY2FsVUlNb2RlOiB0aGlzLmxvY2FsVUlNb2RlLnZhbHVlLCAvLyBMb2NhbCBVSSBtb2RlXG5cbiAgICAgIC8vIFJvb20gRGV0YWlsc1xuICAgICAgcm9vbU5hbWU6IHRoaXMucm9vbU5hbWUudmFsdWUsXG4gICAgICBtZW1iZXI6IHRoaXMubWVtYmVyLnZhbHVlLFxuICAgICAgYWRtaW5QYXNzY29kZTogdGhpcy5hZG1pblBhc3Njb2RlLnZhbHVlLFxuICAgICAgeW91QXJlQ29Ib3N0OiB0aGlzLnlvdUFyZUNvSG9zdC52YWx1ZSxcbiAgICAgIHlvdUFyZUhvc3Q6IHRoaXMueW91QXJlSG9zdC52YWx1ZSxcbiAgICAgIGlzbGV2ZWw6IHRoaXMuaXNsZXZlbC52YWx1ZSxcbiAgICAgIGNvbmZpcm1lZFRvUmVjb3JkOiB0aGlzLmNvbmZpcm1lZFRvUmVjb3JkLnZhbHVlLFxuICAgICAgbWVldGluZ0Rpc3BsYXlUeXBlOiB0aGlzLm1lZXRpbmdEaXNwbGF5VHlwZS52YWx1ZSxcbiAgICAgIG1lZXRpbmdWaWRlb09wdGltaXplZDogdGhpcy5tZWV0aW5nVmlkZW9PcHRpbWl6ZWQudmFsdWUsXG4gICAgICBldmVudFR5cGU6IHRoaXMuZXZlbnRUeXBlLnZhbHVlLFxuICAgICAgcGFydGljaXBhbnRzOiB0aGlzLnBhcnRpY2lwYW50cy52YWx1ZSxcbiAgICAgIGZpbHRlcmVkUGFydGljaXBhbnRzOiB0aGlzLmZpbHRlcmVkUGFydGljaXBhbnRzLnZhbHVlLFxuICAgICAgcGFydGljaXBhbnRzQ291bnRlcjogdGhpcy5wYXJ0aWNpcGFudHNDb3VudGVyLnZhbHVlLFxuICAgICAgcGFydGljaXBhbnRzRmlsdGVyOiB0aGlzLnBhcnRpY2lwYW50c0ZpbHRlci52YWx1ZSxcblxuICAgICAgLy8gTW9yZSByb29tIGRldGFpbHMgLSBtZWRpYVxuICAgICAgY29uc3VtZV9zb2NrZXRzOiB0aGlzLmNvbnN1bWVfc29ja2V0cy52YWx1ZSxcbiAgICAgIHJ0cENhcGFiaWxpdGllczogdGhpcy5ydHBDYXBhYmlsaXRpZXMudmFsdWUsXG4gICAgICByb29tUmVjdklQczogdGhpcy5yb29tUmVjdklQcy52YWx1ZSxcbiAgICAgIG1lZXRpbmdSb29tUGFyYW1zOiB0aGlzLm1lZXRpbmdSb29tUGFyYW1zLnZhbHVlLFxuICAgICAgaXRlbVBhZ2VMaW1pdDogdGhpcy5pdGVtUGFnZUxpbWl0LnZhbHVlLFxuICAgICAgYXVkaW9Pbmx5Um9vbTogdGhpcy5hdWRpb09ubHlSb29tLnZhbHVlLFxuICAgICAgYWRkRm9yQmFzaWM6IHRoaXMuYWRkRm9yQmFzaWMudmFsdWUsXG4gICAgICBzY3JlZW5QYWdlTGltaXQ6IHRoaXMuc2NyZWVuUGFnZUxpbWl0LnZhbHVlLFxuICAgICAgc2hhcmVTY3JlZW5TdGFydGVkOiB0aGlzLnNoYXJlU2NyZWVuU3RhcnRlZC52YWx1ZSxcbiAgICAgIHNoYXJlZDogdGhpcy5zaGFyZWQudmFsdWUsXG4gICAgICB0YXJnZXRPcmllbnRhdGlvbjogdGhpcy50YXJnZXRPcmllbnRhdGlvbi52YWx1ZSxcbiAgICAgIHRhcmdldFJlc29sdXRpb246IHRoaXMudGFyZ2V0UmVzb2x1dGlvbi52YWx1ZSxcbiAgICAgIHRhcmdldFJlc29sdXRpb25Ib3N0OiB0aGlzLnRhcmdldFJlc29sdXRpb25Ib3N0LnZhbHVlLFxuICAgICAgdmlkQ29uczogdGhpcy52aWRDb25zLnZhbHVlLFxuICAgICAgZnJhbWVSYXRlOiB0aGlzLmZyYW1lUmF0ZS52YWx1ZSxcbiAgICAgIGhQYXJhbXM6IHRoaXMuaFBhcmFtcy52YWx1ZSxcbiAgICAgIHZQYXJhbXM6IHRoaXMudlBhcmFtcy52YWx1ZSxcbiAgICAgIHNjcmVlblBhcmFtczogdGhpcy5zY3JlZW5QYXJhbXMudmFsdWUsXG4gICAgICBhUGFyYW1zOiB0aGlzLmFQYXJhbXMudmFsdWUsXG5cbiAgICAgIC8vIE1vcmUgcm9vbSBkZXRhaWxzIC0gcmVjb3JkaW5nXG4gICAgICByZWNvcmRpbmdBdWRpb1BhdXNlc0xpbWl0OiB0aGlzLnJlY29yZGluZ0F1ZGlvUGF1c2VzTGltaXQudmFsdWUsXG4gICAgICByZWNvcmRpbmdBdWRpb1BhdXNlc0NvdW50OiB0aGlzLnJlY29yZGluZ0F1ZGlvUGF1c2VzQ291bnQudmFsdWUsXG4gICAgICByZWNvcmRpbmdBdWRpb1N1cHBvcnQ6IHRoaXMucmVjb3JkaW5nQXVkaW9TdXBwb3J0LnZhbHVlLFxuICAgICAgcmVjb3JkaW5nQXVkaW9QZW9wbGVMaW1pdDogdGhpcy5yZWNvcmRpbmdBdWRpb1Blb3BsZUxpbWl0LnZhbHVlLFxuICAgICAgcmVjb3JkaW5nQXVkaW9QYXJ0aWNpcGFudHNUaW1lTGltaXQ6IHRoaXMucmVjb3JkaW5nQXVkaW9QYXJ0aWNpcGFudHNUaW1lTGltaXQudmFsdWUsXG4gICAgICByZWNvcmRpbmdWaWRlb1BhdXNlc0NvdW50OiB0aGlzLnJlY29yZGluZ1ZpZGVvUGF1c2VzQ291bnQudmFsdWUsXG4gICAgICByZWNvcmRpbmdWaWRlb1BhdXNlc0xpbWl0OiB0aGlzLnJlY29yZGluZ1ZpZGVvUGF1c2VzTGltaXQudmFsdWUsXG4gICAgICByZWNvcmRpbmdWaWRlb1N1cHBvcnQ6IHRoaXMucmVjb3JkaW5nVmlkZW9TdXBwb3J0LnZhbHVlLFxuICAgICAgcmVjb3JkaW5nVmlkZW9QZW9wbGVMaW1pdDogdGhpcy5yZWNvcmRpbmdWaWRlb1Blb3BsZUxpbWl0LnZhbHVlLFxuICAgICAgcmVjb3JkaW5nVmlkZW9QYXJ0aWNpcGFudHNUaW1lTGltaXQ6IHRoaXMucmVjb3JkaW5nVmlkZW9QYXJ0aWNpcGFudHNUaW1lTGltaXQudmFsdWUsXG4gICAgICByZWNvcmRpbmdBbGxQYXJ0aWNpcGFudHNTdXBwb3J0OiB0aGlzLnJlY29yZGluZ0FsbFBhcnRpY2lwYW50c1N1cHBvcnQudmFsdWUsXG4gICAgICByZWNvcmRpbmdWaWRlb1BhcnRpY2lwYW50c1N1cHBvcnQ6IHRoaXMucmVjb3JkaW5nVmlkZW9QYXJ0aWNpcGFudHNTdXBwb3J0LnZhbHVlLFxuICAgICAgcmVjb3JkaW5nQWxsUGFydGljaXBhbnRzRnVsbFJvb21TdXBwb3J0OiB0aGlzLnJlY29yZGluZ0FsbFBhcnRpY2lwYW50c0Z1bGxSb29tU3VwcG9ydC52YWx1ZSxcbiAgICAgIHJlY29yZGluZ1ZpZGVvUGFydGljaXBhbnRzRnVsbFJvb21TdXBwb3J0OlxuICAgICAgICB0aGlzLnJlY29yZGluZ1ZpZGVvUGFydGljaXBhbnRzRnVsbFJvb21TdXBwb3J0LnZhbHVlLFxuICAgICAgcmVjb3JkaW5nUHJlZmVycmVkT3JpZW50YXRpb246IHRoaXMucmVjb3JkaW5nUHJlZmVycmVkT3JpZW50YXRpb24udmFsdWUsXG4gICAgICByZWNvcmRpbmdTdXBwb3J0Rm9yT3RoZXJPcmllbnRhdGlvbjogdGhpcy5yZWNvcmRpbmdTdXBwb3J0Rm9yT3RoZXJPcmllbnRhdGlvbi52YWx1ZSxcbiAgICAgIHJlY29yZGluZ011bHRpRm9ybWF0c1N1cHBvcnQ6IHRoaXMucmVjb3JkaW5nTXVsdGlGb3JtYXRzU3VwcG9ydC52YWx1ZSxcblxuICAgICAgdXNlclJlY29yZGluZ1BhcmFtczogdGhpcy51c2VyUmVjb3JkaW5nUGFyYW1zLnZhbHVlLFxuICAgICAgY2FuUmVjb3JkOiB0aGlzLmNhblJlY29yZC52YWx1ZSxcbiAgICAgIHN0YXJ0UmVwb3J0OiB0aGlzLnN0YXJ0UmVwb3J0LnZhbHVlLFxuICAgICAgZW5kUmVwb3J0OiB0aGlzLmVuZFJlcG9ydC52YWx1ZSxcbiAgICAgIHJlY29yZFN0YXJ0VGltZTogdGhpcy5yZWNvcmRTdGFydFRpbWUudmFsdWUsXG4gICAgICByZWNvcmRFbGFwc2VkVGltZTogdGhpcy5yZWNvcmRFbGFwc2VkVGltZS52YWx1ZSxcbiAgICAgIGlzVGltZXJSdW5uaW5nOiB0aGlzLmlzVGltZXJSdW5uaW5nLnZhbHVlLFxuICAgICAgY2FuUGF1c2VSZXN1bWU6IHRoaXMuY2FuUGF1c2VSZXN1bWUudmFsdWUsXG4gICAgICByZWNvcmRDaGFuZ2VTZWNvbmRzOiB0aGlzLnJlY29yZENoYW5nZVNlY29uZHMudmFsdWUsXG4gICAgICBwYXVzZUxpbWl0OiB0aGlzLnBhdXNlTGltaXQudmFsdWUsXG4gICAgICBwYXVzZVJlY29yZENvdW50OiB0aGlzLnBhdXNlUmVjb3JkQ291bnQudmFsdWUsXG4gICAgICBjYW5MYXVuY2hSZWNvcmQ6IHRoaXMuY2FuTGF1bmNoUmVjb3JkLnZhbHVlLFxuICAgICAgc3RvcExhdW5jaFJlY29yZDogdGhpcy5zdG9wTGF1bmNoUmVjb3JkLnZhbHVlLFxuXG4gICAgICBwYXJ0aWNpcGFudHNBbGw6IHRoaXMucGFydGljaXBhbnRzQWxsLnZhbHVlLFxuXG4gICAgICBmaXJzdEFsbDogdGhpcy5maXJzdEFsbC52YWx1ZSxcbiAgICAgIHVwZGF0ZU1haW5XaW5kb3c6IHRoaXMudXBkYXRlTWFpbldpbmRvdy52YWx1ZSxcbiAgICAgIGZpcnN0X3JvdW5kOiB0aGlzLmZpcnN0X3JvdW5kLnZhbHVlLFxuICAgICAgbGFuZFNjYXBlZDogdGhpcy5sYW5kU2NhcGVkLnZhbHVlLFxuICAgICAgbG9ja19zY3JlZW46IHRoaXMubG9ja19zY3JlZW4udmFsdWUsXG4gICAgICBzY3JlZW5JZDogdGhpcy5zY3JlZW5JZC52YWx1ZSxcbiAgICAgIGFsbFZpZGVvU3RyZWFtczogdGhpcy5hbGxWaWRlb1N0cmVhbXMudmFsdWUsXG4gICAgICBuZXdMaW1pdGVkU3RyZWFtczogdGhpcy5uZXdMaW1pdGVkU3RyZWFtcy52YWx1ZSxcbiAgICAgIG5ld0xpbWl0ZWRTdHJlYW1zSURzOiB0aGlzLm5ld0xpbWl0ZWRTdHJlYW1zSURzLnZhbHVlLFxuICAgICAgYWN0aXZlU291bmRzOiB0aGlzLmFjdGl2ZVNvdW5kcy52YWx1ZSxcbiAgICAgIHNjcmVlblNoYXJlSURTdHJlYW06IHRoaXMuc2NyZWVuU2hhcmVJRFN0cmVhbS52YWx1ZSxcbiAgICAgIHNjcmVlblNoYXJlTmFtZVN0cmVhbTogdGhpcy5zY3JlZW5TaGFyZU5hbWVTdHJlYW0udmFsdWUsXG4gICAgICBhZG1pbklEU3RyZWFtOiB0aGlzLmFkbWluSURTdHJlYW0udmFsdWUsXG4gICAgICBhZG1pbk5hbWVTdHJlYW06IHRoaXMuYWRtaW5OYW1lU3RyZWFtLnZhbHVlLFxuICAgICAgeW91WW91U3RyZWFtOiB0aGlzLnlvdVlvdVN0cmVhbS52YWx1ZSxcbiAgICAgIHlvdVlvdVN0cmVhbUlEczogdGhpcy55b3VZb3VTdHJlYW1JRHMudmFsdWUsXG4gICAgICBsb2NhbFN0cmVhbTogdGhpcy5sb2NhbFN0cmVhbS52YWx1ZSxcbiAgICAgIHJlY29yZFN0YXJ0ZWQ6IHRoaXMucmVjb3JkU3RhcnRlZC52YWx1ZSxcbiAgICAgIHJlY29yZFJlc3VtZWQ6IHRoaXMucmVjb3JkUmVzdW1lZC52YWx1ZSxcbiAgICAgIHJlY29yZFBhdXNlZDogdGhpcy5yZWNvcmRQYXVzZWQudmFsdWUsXG4gICAgICByZWNvcmRTdG9wcGVkOiB0aGlzLnJlY29yZFN0b3BwZWQudmFsdWUsXG4gICAgICBhZG1pblJlc3RyaWN0U2V0dGluZzogdGhpcy5hZG1pblJlc3RyaWN0U2V0dGluZy52YWx1ZSxcbiAgICAgIHZpZGVvUmVxdWVzdFN0YXRlOiB0aGlzLnZpZGVvUmVxdWVzdFN0YXRlLnZhbHVlLFxuICAgICAgdmlkZW9SZXF1ZXN0VGltZTogdGhpcy52aWRlb1JlcXVlc3RUaW1lLnZhbHVlLFxuICAgICAgdmlkZW9BY3Rpb246IHRoaXMudmlkZW9BY3Rpb24udmFsdWUsXG4gICAgICBsb2NhbFN0cmVhbVZpZGVvOiB0aGlzLmxvY2FsU3RyZWFtVmlkZW8udmFsdWUsXG4gICAgICB1c2VyRGVmYXVsdFZpZGVvSW5wdXREZXZpY2U6IHRoaXMudXNlckRlZmF1bHRWaWRlb0lucHV0RGV2aWNlLnZhbHVlLFxuICAgICAgY3VycmVudEZhY2luZ01vZGU6IHRoaXMuY3VycmVudEZhY2luZ01vZGUudmFsdWUsXG4gICAgICBwcmV2RmFjaW5nTW9kZTogdGhpcy5wcmV2RmFjaW5nTW9kZS52YWx1ZSxcbiAgICAgIGRlZlZpZGVvSUQ6IHRoaXMuZGVmVmlkZW9JRC52YWx1ZSxcbiAgICAgIGFsbG93ZWQ6IHRoaXMuYWxsb3dlZC52YWx1ZSxcbiAgICAgIGRpc3BBY3RpdmVOYW1lczogdGhpcy5kaXNwQWN0aXZlTmFtZXMudmFsdWUsXG4gICAgICBwX2Rpc3BBY3RpdmVOYW1lczogdGhpcy5wX2Rpc3BBY3RpdmVOYW1lcy52YWx1ZSxcbiAgICAgIGFjdGl2ZU5hbWVzOiB0aGlzLmFjdGl2ZU5hbWVzLnZhbHVlLFxuICAgICAgcHJldkFjdGl2ZU5hbWVzOiB0aGlzLnByZXZBY3RpdmVOYW1lcy52YWx1ZSxcbiAgICAgIHBfYWN0aXZlTmFtZXM6IHRoaXMucF9hY3RpdmVOYW1lcy52YWx1ZSxcbiAgICAgIG1lbWJlcnNSZWNlaXZlZDogdGhpcy5tZW1iZXJzUmVjZWl2ZWQudmFsdWUsXG4gICAgICBkZWZlclNjcmVlblJlY2VpdmVkOiB0aGlzLmRlZmVyU2NyZWVuUmVjZWl2ZWQudmFsdWUsXG4gICAgICBob3N0Rmlyc3RTd2l0Y2g6IHRoaXMuaG9zdEZpcnN0U3dpdGNoLnZhbHVlLFxuICAgICAgbWljQWN0aW9uOiB0aGlzLm1pY0FjdGlvbi52YWx1ZSxcbiAgICAgIHNjcmVlbkFjdGlvbjogdGhpcy5zY3JlZW5BY3Rpb24udmFsdWUsXG4gICAgICBjaGF0QWN0aW9uOiB0aGlzLmNoYXRBY3Rpb24udmFsdWUsXG4gICAgICBhdWRpb1JlcXVlc3RTdGF0ZTogdGhpcy5hdWRpb1JlcXVlc3RTdGF0ZS52YWx1ZSxcbiAgICAgIHNjcmVlblJlcXVlc3RTdGF0ZTogdGhpcy5zY3JlZW5SZXF1ZXN0U3RhdGUudmFsdWUsXG4gICAgICBjaGF0UmVxdWVzdFN0YXRlOiB0aGlzLmNoYXRSZXF1ZXN0U3RhdGUudmFsdWUsXG4gICAgICBhdWRpb1JlcXVlc3RUaW1lOiB0aGlzLmF1ZGlvUmVxdWVzdFRpbWUudmFsdWUsXG4gICAgICBzY3JlZW5SZXF1ZXN0VGltZTogdGhpcy5zY3JlZW5SZXF1ZXN0VGltZS52YWx1ZSxcbiAgICAgIGNoYXRSZXF1ZXN0VGltZTogdGhpcy5jaGF0UmVxdWVzdFRpbWUudmFsdWUsXG4gICAgICB1cGRhdGVSZXF1ZXN0SW50ZXJ2YWxTZWNvbmRzOiB0aGlzLnVwZGF0ZVJlcXVlc3RJbnRlcnZhbFNlY29uZHMudmFsdWUsXG4gICAgICBvbGRTb3VuZElkczogdGhpcy5vbGRTb3VuZElkcy52YWx1ZSxcbiAgICAgIGhvc3RMYWJlbDogdGhpcy5ob3N0TGFiZWwudmFsdWUsXG4gICAgICBtYWluU2NyZWVuRmlsbGVkOiB0aGlzLm1haW5TY3JlZW5GaWxsZWQudmFsdWUsXG4gICAgICBsb2NhbFN0cmVhbVNjcmVlbjogdGhpcy5sb2NhbFN0cmVhbVNjcmVlbi52YWx1ZSxcbiAgICAgIHNjcmVlbkFscmVhZHlPbjogdGhpcy5zY3JlZW5BbHJlYWR5T24udmFsdWUsXG4gICAgICBjaGF0QWxyZWFkeU9uOiB0aGlzLmNoYXRBbHJlYWR5T24udmFsdWUsXG4gICAgICByZWRpcmVjdFVSTDogdGhpcy5yZWRpcmVjdFVSTC52YWx1ZSxcbiAgICAgIG9sZEFsbFN0cmVhbXM6IHRoaXMub2xkQWxsU3RyZWFtcy52YWx1ZSxcbiAgICAgIGFkbWluVmlkSUQ6IHRoaXMuYWRtaW5WaWRJRC52YWx1ZSxcbiAgICAgIHN0cmVhbU5hbWVzOiB0aGlzLnN0cmVhbU5hbWVzLnZhbHVlLFxuICAgICAgbm9uX2FsVmlkZW9TdHJlYW1zOiB0aGlzLm5vbl9hbFZpZGVvU3RyZWFtcy52YWx1ZSxcbiAgICAgIHNvcnRBdWRpb0xvdWRuZXNzOiB0aGlzLnNvcnRBdWRpb0xvdWRuZXNzLnZhbHVlLFxuICAgICAgYXVkaW9EZWNpYmVsczogdGhpcy5hdWRpb0RlY2liZWxzLnZhbHVlLFxuICAgICAgbWl4ZWRfYWxWaWRlb1N0cmVhbXM6IHRoaXMubWl4ZWRfYWxWaWRlb1N0cmVhbXMudmFsdWUsXG4gICAgICBub25fYWxWaWRlb1N0cmVhbXNfbXV0ZWQ6IHRoaXMubm9uX2FsVmlkZW9TdHJlYW1zX211dGVkLnZhbHVlLFxuICAgICAgcGFnaW5hdGVkU3RyZWFtczogdGhpcy5wYWdpbmF0ZWRTdHJlYW1zLnZhbHVlLFxuICAgICAgbG9jYWxTdHJlYW1BdWRpbzogdGhpcy5sb2NhbFN0cmVhbUF1ZGlvLnZhbHVlLFxuICAgICAgZGVmQXVkaW9JRDogdGhpcy5kZWZBdWRpb0lELnZhbHVlLFxuICAgICAgdXNlckRlZmF1bHRBdWRpb0lucHV0RGV2aWNlOiB0aGlzLnVzZXJEZWZhdWx0QXVkaW9JbnB1dERldmljZS52YWx1ZSxcbiAgICAgIHVzZXJEZWZhdWx0QXVkaW9PdXRwdXREZXZpY2U6IHRoaXMudXNlckRlZmF1bHRBdWRpb091dHB1dERldmljZS52YWx1ZSxcbiAgICAgIHByZXZBdWRpb0lucHV0RGV2aWNlOiB0aGlzLnByZXZBdWRpb0lucHV0RGV2aWNlLnZhbHVlLFxuICAgICAgcHJldlZpZGVvSW5wdXREZXZpY2U6IHRoaXMucHJldlZpZGVvSW5wdXREZXZpY2UudmFsdWUsXG4gICAgICBhdWRpb1BhdXNlZDogdGhpcy5hdWRpb1BhdXNlZC52YWx1ZSxcbiAgICAgIG1haW5TY3JlZW5QZXJzb246IHRoaXMubWFpblNjcmVlblBlcnNvbi52YWx1ZSxcbiAgICAgIGFkbWluT25NYWluU2NyZWVuOiB0aGlzLmFkbWluT25NYWluU2NyZWVuLnZhbHVlLFxuICAgICAgc2NyZWVuU3RhdGVzOiB0aGlzLnNjcmVlblN0YXRlcy52YWx1ZSxcbiAgICAgIHByZXZTY3JlZW5TdGF0ZXM6IHRoaXMucHJldlNjcmVlblN0YXRlcy52YWx1ZSxcbiAgICAgIHVwZGF0ZURhdGVTdGF0ZTogdGhpcy51cGRhdGVEYXRlU3RhdGUudmFsdWUsXG4gICAgICBsYXN0VXBkYXRlOiB0aGlzLmxhc3RVcGRhdGUudmFsdWUsXG4gICAgICBuRm9yUmVhZGp1c3RSZWNvcmQ6IHRoaXMubkZvclJlYWRqdXN0UmVjb3JkLnZhbHVlLFxuICAgICAgZml4ZWRQYWdlTGltaXQ6IHRoaXMuZml4ZWRQYWdlTGltaXQudmFsdWUsXG4gICAgICByZW1vdmVBbHRHcmlkOiB0aGlzLnJlbW92ZUFsdEdyaWQudmFsdWUsXG4gICAgICBuRm9yUmVhZGp1c3Q6IHRoaXMubkZvclJlYWRqdXN0LnZhbHVlLFxuICAgICAgbGFzdFJlb3JkZXJUaW1lOiB0aGlzLmxhc3RSZW9yZGVyVGltZS52YWx1ZSxcbiAgICAgIHJlb3JkZXJJbnRlcnZhbDogdGhpcy5yZW9yZGVySW50ZXJ2YWwudmFsdWUsXG4gICAgICBmYXN0UmVvcmRlckludGVydmFsOiB0aGlzLmZhc3RSZW9yZGVySW50ZXJ2YWwudmFsdWUsXG4gICAgICBhdWRTdHJlYW1OYW1lczogdGhpcy5hdWRTdHJlYW1OYW1lcy52YWx1ZSxcbiAgICAgIGN1cnJlbnRVc2VyUGFnZTogdGhpcy5jdXJyZW50VXNlclBhZ2UudmFsdWUsXG4gICAgICBtYWluSGVpZ2h0V2lkdGg6IHRoaXMubWFpbkhlaWdodFdpZHRoLnZhbHVlLFxuICAgICAgcHJldk1haW5IZWlnaHRXaWR0aDogdGhpcy5wcmV2TWFpbkhlaWdodFdpZHRoLnZhbHVlLFxuICAgICAgcHJldkRvUGFnaW5hdGU6IHRoaXMucHJldkRvUGFnaW5hdGUudmFsdWUsXG4gICAgICBkb1BhZ2luYXRlOiB0aGlzLmRvUGFnaW5hdGUudmFsdWUsXG4gICAgICBzaGFyZUVuZGVkOiB0aGlzLnNoYXJlRW5kZWQudmFsdWUsXG4gICAgICBsU3RyZWFtczogdGhpcy5sU3RyZWFtcy52YWx1ZSxcbiAgICAgIGNoYXRSZWZTdHJlYW1zOiB0aGlzLmNoYXRSZWZTdHJlYW1zLnZhbHVlLFxuICAgICAgY29udHJvbEhlaWdodDogdGhpcy5jb250cm9sSGVpZ2h0LnZhbHVlLFxuICAgICAgaXNXaWRlU2NyZWVuOiB0aGlzLmlzV2lkZVNjcmVlbi52YWx1ZSxcbiAgICAgIGlzTWVkaXVtU2NyZWVuOiB0aGlzLmlzTWVkaXVtU2NyZWVuLnZhbHVlLFxuICAgICAgaXNTbWFsbFNjcmVlbjogdGhpcy5pc1NtYWxsU2NyZWVuLnZhbHVlLFxuICAgICAgYWRkR3JpZDogdGhpcy5hZGRHcmlkLnZhbHVlLFxuICAgICAgYWRkQWx0R3JpZDogdGhpcy5hZGRBbHRHcmlkLnZhbHVlLFxuICAgICAgZ3JpZFJvd3M6IHRoaXMuZ3JpZFJvd3MudmFsdWUsXG4gICAgICBncmlkQ29sczogdGhpcy5ncmlkQ29scy52YWx1ZSxcbiAgICAgIGFsdEdyaWRSb3dzOiB0aGlzLmFsdEdyaWRSb3dzLnZhbHVlLFxuICAgICAgYWx0R3JpZENvbHM6IHRoaXMuYWx0R3JpZENvbHMudmFsdWUsXG4gICAgICBudW1iZXJQYWdlczogdGhpcy5udW1iZXJQYWdlcy52YWx1ZSxcbiAgICAgIGN1cnJlbnRTdHJlYW1zOiB0aGlzLmN1cnJlbnRTdHJlYW1zLnZhbHVlLFxuICAgICAgc2hvd01pbmlWaWV3OiB0aGlzLnNob3dNaW5pVmlldy52YWx1ZSxcbiAgICAgIG5TdHJlYW06IHRoaXMublN0cmVhbS52YWx1ZSxcbiAgICAgIGRlZmVyX3JlY2VpdmU6IHRoaXMuZGVmZXJfcmVjZWl2ZS52YWx1ZSxcbiAgICAgIGFsbEF1ZGlvU3RyZWFtczogdGhpcy5hbGxBdWRpb1N0cmVhbXMudmFsdWUsXG4gICAgICBzY3JlZW5Qcm9kdWNlcjogdGhpcy5zY3JlZW5Qcm9kdWNlci52YWx1ZSxcbiAgICAgIHJlbW90ZVNjcmVlblN0cmVhbTogdGhpcy5yZW1vdGVTY3JlZW5TdHJlYW0udmFsdWUsXG4gICAgICBnb3RBbGxWaWRzOiB0aGlzLmdvdEFsbFZpZHMudmFsdWUsXG4gICAgICBwYWdpbmF0aW9uSGVpZ2h0V2lkdGg6IHRoaXMucGFnaW5hdGlvbkhlaWdodFdpZHRoLnZhbHVlLFxuICAgICAgcGFnaW5hdGlvbkRpcmVjdGlvbjogdGhpcy5wYWdpbmF0aW9uRGlyZWN0aW9uLnZhbHVlLFxuICAgICAgZ3JpZFNpemVzOiB0aGlzLmdyaWRTaXplcy52YWx1ZSxcbiAgICAgIHNjcmVlbkZvcmNlRnVsbERpc3BsYXk6IHRoaXMuc2NyZWVuRm9yY2VGdWxsRGlzcGxheS52YWx1ZSxcbiAgICAgIG1haW5HcmlkU3RyZWFtOiB0aGlzLm1haW5HcmlkU3RyZWFtLnZhbHVlLFxuICAgICAgb3RoZXJHcmlkU3RyZWFtczogdGhpcy5vdGhlckdyaWRTdHJlYW1zLnZhbHVlLFxuICAgICAgYXVkaW9Pbmx5U3RyZWFtczogdGhpcy5hdWRpb09ubHlTdHJlYW1zLnZhbHVlLFxuICAgICAgdmlkZW9JbnB1dHM6IHRoaXMudmlkZW9JbnB1dHMudmFsdWUsXG4gICAgICBhdWRpb0lucHV0czogdGhpcy5hdWRpb0lucHV0cy52YWx1ZSxcbiAgICAgIG1lZXRpbmdQcm9ncmVzc1RpbWU6IHRoaXMubWVldGluZ1Byb2dyZXNzVGltZS52YWx1ZSxcbiAgICAgIG1lZXRpbmdFbGFwc2VkVGltZTogdGhpcy5tZWV0aW5nRWxhcHNlZFRpbWUudmFsdWUsXG5cbiAgICAgIHJlZl9wYXJ0aWNpcGFudHM6IHRoaXMucmVmX3BhcnRpY2lwYW50cy52YWx1ZSxcblxuICAgICAgbWVzc2FnZXM6IHRoaXMubWVzc2FnZXMudmFsdWUsXG4gICAgICBzdGFydERpcmVjdE1lc3NhZ2U6IHRoaXMuc3RhcnREaXJlY3RNZXNzYWdlLnZhbHVlLFxuICAgICAgZGlyZWN0TWVzc2FnZURldGFpbHM6IHRoaXMuZGlyZWN0TWVzc2FnZURldGFpbHMudmFsdWUsXG4gICAgICBjb0hvc3Q6IHRoaXMuY29Ib3N0LnZhbHVlLFxuICAgICAgY29Ib3N0UmVzcG9uc2liaWxpdHk6IHRoaXMuY29Ib3N0UmVzcG9uc2liaWxpdHkudmFsdWUsXG5cbiAgICAgIC8vIEV2ZW50IHNldHRpbmdzXG4gICAgICBhdWRpb1NldHRpbmc6IHRoaXMuYXVkaW9TZXR0aW5nLnZhbHVlLFxuICAgICAgdmlkZW9TZXR0aW5nOiB0aGlzLnZpZGVvU2V0dGluZy52YWx1ZSxcbiAgICAgIHNjcmVlbnNoYXJlU2V0dGluZzogdGhpcy5zY3JlZW5zaGFyZVNldHRpbmcudmFsdWUsXG4gICAgICBjaGF0U2V0dGluZzogdGhpcy5jaGF0U2V0dGluZy52YWx1ZSxcblxuICAgICAgLy8gRGlzcGxheSBzZXR0aW5nc1xuICAgICAgYXV0b1dhdmU6IHRoaXMuYXV0b1dhdmUudmFsdWUsXG4gICAgICBmb3JjZUZ1bGxEaXNwbGF5OiB0aGlzLmZvcmNlRnVsbERpc3BsYXkudmFsdWUsXG4gICAgICBwcmV2Rm9yY2VGdWxsRGlzcGxheTogdGhpcy5wcmV2Rm9yY2VGdWxsRGlzcGxheS52YWx1ZSxcbiAgICAgIHByZXZNZWV0aW5nRGlzcGxheVR5cGU6IHRoaXMucHJldk1lZXRpbmdEaXNwbGF5VHlwZS52YWx1ZSxcblxuICAgICAgLy8gV2FpdGluZyByb29tXG4gICAgICB3YWl0aW5nUm9vbUZpbHRlcjogdGhpcy53YWl0aW5nUm9vbUZpbHRlci52YWx1ZSxcbiAgICAgIHdhaXRpbmdSb29tTGlzdDogdGhpcy53YWl0aW5nUm9vbUxpc3QudmFsdWUsXG4gICAgICB3YWl0aW5nUm9vbUNvdW50ZXI6IHRoaXMud2FpdGluZ1Jvb21Db3VudGVyLnZhbHVlLFxuICAgICAgZmlsdGVyZWRXYWl0aW5nUm9vbUxpc3Q6IHRoaXMuZmlsdGVyZWRXYWl0aW5nUm9vbUxpc3QudmFsdWUsXG5cbiAgICAgIC8vIFJlcXVlc3RzXG4gICAgICByZXF1ZXN0RmlsdGVyOiB0aGlzLnJlcXVlc3RGaWx0ZXIudmFsdWUsXG4gICAgICByZXF1ZXN0TGlzdDogdGhpcy5yZXF1ZXN0TGlzdC52YWx1ZSxcbiAgICAgIHJlcXVlc3RDb3VudGVyOiB0aGlzLnJlcXVlc3RDb3VudGVyLnZhbHVlLFxuICAgICAgZmlsdGVyZWRSZXF1ZXN0TGlzdDogdGhpcy5maWx0ZXJlZFJlcXVlc3RMaXN0LnZhbHVlLFxuXG4gICAgICAvLyBUb3RhbCByZXF1ZXN0cyBhbmQgd2FpdGluZyByb29tXG4gICAgICB0b3RhbFJlcVdhaXQ6IHRoaXMudG90YWxSZXFXYWl0LnZhbHVlLFxuXG4gICAgICAvLyBBbGVydHNcbiAgICAgIGFsZXJ0VmlzaWJsZTogdGhpcy5hbGVydFZpc2libGUudmFsdWUsXG4gICAgICBhbGVydE1lc3NhZ2U6IHRoaXMuYWxlcnRNZXNzYWdlLnZhbHVlLFxuICAgICAgYWxlcnRUeXBlOiB0aGlzLmFsZXJ0VHlwZS52YWx1ZSxcbiAgICAgIGFsZXJ0RHVyYXRpb246IHRoaXMuYWxlcnREdXJhdGlvbi52YWx1ZSxcblxuICAgICAgLy8gUHJvZ3Jlc3MgVGltZXJcbiAgICAgIHByb2dyZXNzVGltZXJWaXNpYmxlOiB0aGlzLnByb2dyZXNzVGltZXJWaXNpYmxlLnZhbHVlLFxuICAgICAgcHJvZ3Jlc3NUaW1lclZhbHVlOiB0aGlzLnByb2dyZXNzVGltZXJWYWx1ZS52YWx1ZSxcblxuICAgICAgLy8gTWVudSBtb2RhbHNcbiAgICAgIGlzTWVudU1vZGFsVmlzaWJsZTogdGhpcy5pc01lbnVNb2RhbFZpc2libGUudmFsdWUsXG4gICAgICBpc1JlY29yZGluZ01vZGFsVmlzaWJsZTogdGhpcy5pc1JlY29yZGluZ01vZGFsVmlzaWJsZS52YWx1ZSxcbiAgICAgIGlzU2V0dGluZ3NNb2RhbFZpc2libGU6IHRoaXMuaXNTZXR0aW5nc01vZGFsVmlzaWJsZS52YWx1ZSxcbiAgICAgIGlzUmVxdWVzdHNNb2RhbFZpc2libGU6IHRoaXMuaXNSZXF1ZXN0c01vZGFsVmlzaWJsZS52YWx1ZSxcbiAgICAgIGlzV2FpdGluZ01vZGFsVmlzaWJsZTogdGhpcy5pc1dhaXRpbmdNb2RhbFZpc2libGUudmFsdWUsXG4gICAgICBpc0NvSG9zdE1vZGFsVmlzaWJsZTogdGhpcy5pc0NvSG9zdE1vZGFsVmlzaWJsZS52YWx1ZSxcbiAgICAgIGlzTWVkaWFTZXR0aW5nc01vZGFsVmlzaWJsZTogdGhpcy5pc01lZGlhU2V0dGluZ3NNb2RhbFZpc2libGUudmFsdWUsXG4gICAgICBpc0Rpc3BsYXlTZXR0aW5nc01vZGFsVmlzaWJsZTogdGhpcy5pc0Rpc3BsYXlTZXR0aW5nc01vZGFsVmlzaWJsZS52YWx1ZSxcblxuICAgICAgLy8gT3RoZXIgTW9kYWxzXG4gICAgICBpc1BhcnRpY2lwYW50c01vZGFsVmlzaWJsZTogdGhpcy5pc1BhcnRpY2lwYW50c01vZGFsVmlzaWJsZS52YWx1ZSxcbiAgICAgIGlzTWVzc2FnZXNNb2RhbFZpc2libGU6IHRoaXMuaXNNZXNzYWdlc01vZGFsVmlzaWJsZS52YWx1ZSxcbiAgICAgIGlzQ29uZmlybUV4aXRNb2RhbFZpc2libGU6IHRoaXMuaXNDb25maXJtRXhpdE1vZGFsVmlzaWJsZS52YWx1ZSxcbiAgICAgIGlzQ29uZmlybUhlcmVNb2RhbFZpc2libGU6IHRoaXMuaXNDb25maXJtSGVyZU1vZGFsVmlzaWJsZS52YWx1ZSxcbiAgICAgIGlzTG9hZGluZ01vZGFsVmlzaWJsZTogdGhpcy5pc0xvYWRpbmdNb2RhbFZpc2libGUudmFsdWUsXG5cbiAgICAgIC8vIFJlY29yZGluZyBPcHRpb25zXG4gICAgICByZWNvcmRpbmdNZWRpYU9wdGlvbnM6IHRoaXMucmVjb3JkaW5nTWVkaWFPcHRpb25zLnZhbHVlLFxuICAgICAgcmVjb3JkaW5nQXVkaW9PcHRpb25zOiB0aGlzLnJlY29yZGluZ0F1ZGlvT3B0aW9ucy52YWx1ZSxcbiAgICAgIHJlY29yZGluZ1ZpZGVvT3B0aW9uczogdGhpcy5yZWNvcmRpbmdWaWRlb09wdGlvbnMudmFsdWUsXG4gICAgICByZWNvcmRpbmdWaWRlb1R5cGU6IHRoaXMucmVjb3JkaW5nVmlkZW9UeXBlLnZhbHVlLFxuICAgICAgcmVjb3JkaW5nVmlkZW9PcHRpbWl6ZWQ6IHRoaXMucmVjb3JkaW5nVmlkZW9PcHRpbWl6ZWQudmFsdWUsXG4gICAgICByZWNvcmRpbmdEaXNwbGF5VHlwZTogdGhpcy5yZWNvcmRpbmdEaXNwbGF5VHlwZS52YWx1ZSxcbiAgICAgIHJlY29yZGluZ0FkZEhMUzogdGhpcy5yZWNvcmRpbmdBZGRITFMudmFsdWUsXG4gICAgICByZWNvcmRpbmdBZGRUZXh0OiB0aGlzLnJlY29yZGluZ0FkZFRleHQudmFsdWUsXG4gICAgICByZWNvcmRpbmdDdXN0b21UZXh0OiB0aGlzLnJlY29yZGluZ0N1c3RvbVRleHQudmFsdWUsXG4gICAgICByZWNvcmRpbmdDdXN0b21UZXh0UG9zaXRpb246IHRoaXMucmVjb3JkaW5nQ3VzdG9tVGV4dFBvc2l0aW9uLnZhbHVlLFxuICAgICAgcmVjb3JkaW5nQ3VzdG9tVGV4dENvbG9yOiB0aGlzLnJlY29yZGluZ0N1c3RvbVRleHRDb2xvci52YWx1ZSxcbiAgICAgIHJlY29yZGluZ05hbWVUYWdzOiB0aGlzLnJlY29yZGluZ05hbWVUYWdzLnZhbHVlLFxuICAgICAgcmVjb3JkaW5nQmFja2dyb3VuZENvbG9yOiB0aGlzLnJlY29yZGluZ0JhY2tncm91bmRDb2xvci52YWx1ZSxcbiAgICAgIHJlY29yZGluZ05hbWVUYWdzQ29sb3I6IHRoaXMucmVjb3JkaW5nTmFtZVRhZ3NDb2xvci52YWx1ZSxcbiAgICAgIHJlY29yZGluZ09yaWVudGF0aW9uVmlkZW86IHRoaXMucmVjb3JkaW5nT3JpZW50YXRpb25WaWRlby52YWx1ZSxcbiAgICAgIGNsZWFyZWRUb1Jlc3VtZTogdGhpcy5jbGVhcmVkVG9SZXN1bWUudmFsdWUsXG4gICAgICBjbGVhcmVkVG9SZWNvcmQ6IHRoaXMuY2xlYXJlZFRvUmVjb3JkLnZhbHVlLFxuICAgICAgcmVjb3JkU3RhdGU6IHRoaXMucmVjb3JkU3RhdGUudmFsdWUsXG4gICAgICBzaG93UmVjb3JkQnV0dG9uczogdGhpcy5zaG93UmVjb3JkQnV0dG9ucy52YWx1ZSxcbiAgICAgIHJlY29yZGluZ1Byb2dyZXNzVGltZTogdGhpcy5yZWNvcmRpbmdQcm9ncmVzc1RpbWUudmFsdWUsXG4gICAgICBhdWRpb1N3aXRjaGluZzogdGhpcy5hdWRpb1N3aXRjaGluZy52YWx1ZSxcbiAgICAgIHZpZGVvU3dpdGNoaW5nOiB0aGlzLnZpZGVvU3dpdGNoaW5nLnZhbHVlLFxuXG4gICAgICAvLyBNZWRpYSBzdGF0ZXNcbiAgICAgIHZpZGVvQWxyZWFkeU9uOiB0aGlzLnZpZGVvQWxyZWFkeU9uLnZhbHVlLFxuICAgICAgYXVkaW9BbHJlYWR5T246IHRoaXMuYXVkaW9BbHJlYWR5T24udmFsdWUsXG4gICAgICBjb21wb25lbnRTaXplczogdGhpcy5jb21wb25lbnRTaXplcy52YWx1ZSxcblxuICAgICAgLy8gUGVybWlzc2lvbnNcbiAgICAgIGhhc0NhbWVyYVBlcm1pc3Npb246IHRoaXMuaGFzQ2FtZXJhUGVybWlzc2lvbi52YWx1ZSxcbiAgICAgIGhhc0F1ZGlvUGVybWlzc2lvbjogdGhpcy5oYXNBdWRpb1Blcm1pc3Npb24udmFsdWUsXG5cbiAgICAgIC8vIFRyYW5zcG9ydHNcbiAgICAgIHRyYW5zcG9ydENyZWF0ZWQ6IHRoaXMudHJhbnNwb3J0Q3JlYXRlZC52YWx1ZSxcbiAgICAgIHRyYW5zcG9ydENyZWF0ZWRWaWRlbzogdGhpcy50cmFuc3BvcnRDcmVhdGVkVmlkZW8udmFsdWUsXG4gICAgICB0cmFuc3BvcnRDcmVhdGVkQXVkaW86IHRoaXMudHJhbnNwb3J0Q3JlYXRlZEF1ZGlvLnZhbHVlLFxuICAgICAgdHJhbnNwb3J0Q3JlYXRlZFNjcmVlbjogdGhpcy50cmFuc3BvcnRDcmVhdGVkU2NyZWVuLnZhbHVlLFxuICAgICAgcHJvZHVjZXJUcmFuc3BvcnQ6IHRoaXMucHJvZHVjZXJUcmFuc3BvcnQudmFsdWUsXG4gICAgICB2aWRlb1Byb2R1Y2VyOiB0aGlzLnZpZGVvUHJvZHVjZXIudmFsdWUsXG4gICAgICBwYXJhbXM6IHRoaXMucGFyYW1zLnZhbHVlLFxuICAgICAgdmlkZW9QYXJhbXM6IHRoaXMudmlkZW9QYXJhbXMudmFsdWUsXG4gICAgICBhdWRpb1BhcmFtczogdGhpcy5hdWRpb1BhcmFtcy52YWx1ZSxcbiAgICAgIGF1ZGlvUHJvZHVjZXI6IHRoaXMuYXVkaW9Qcm9kdWNlci52YWx1ZSxcbiAgICAgIGNvbnN1bWVyVHJhbnNwb3J0czogdGhpcy5jb25zdW1lclRyYW5zcG9ydHMudmFsdWUsXG4gICAgICBjb25zdW1pbmdUcmFuc3BvcnRzOiB0aGlzLmNvbnN1bWluZ1RyYW5zcG9ydHMudmFsdWUsXG5cbiAgICAgIC8vIFBvbGxzXG4gICAgICBwb2xsczogdGhpcy5wb2xscy52YWx1ZSxcbiAgICAgIHBvbGw6IHRoaXMucG9sbC52YWx1ZSxcbiAgICAgIGlzUG9sbE1vZGFsVmlzaWJsZTogdGhpcy5pc1BvbGxNb2RhbFZpc2libGUudmFsdWUsXG5cbiAgICAgIC8vIEJhY2tncm91bmRcbiAgICAgIGN1c3RvbUltYWdlOiB0aGlzLmN1c3RvbUltYWdlLnZhbHVlLFxuICAgICAgc2VsZWN0ZWRJbWFnZTogdGhpcy5zZWxlY3RlZEltYWdlLnZhbHVlLFxuICAgICAgc2VnbWVudFZpZGVvOiB0aGlzLnNlZ21lbnRWaWRlby52YWx1ZSxcbiAgICAgIHNlbGZpZVNlZ21lbnRhdGlvbjogdGhpcy5zZWxmaWVTZWdtZW50YXRpb24udmFsdWUsXG4gICAgICBwYXVzZVNlZ21lbnRhdGlvbjogdGhpcy5wYXVzZVNlZ21lbnRhdGlvbi52YWx1ZSxcbiAgICAgIHByb2Nlc3NlZFN0cmVhbTogdGhpcy5wcm9jZXNzZWRTdHJlYW0udmFsdWUsXG4gICAgICBrZWVwQmFja2dyb3VuZDogdGhpcy5rZWVwQmFja2dyb3VuZC52YWx1ZSxcbiAgICAgIGJhY2tncm91bmRIYXNDaGFuZ2VkOiB0aGlzLmJhY2tncm91bmRIYXNDaGFuZ2VkLnZhbHVlLFxuICAgICAgdmlydHVhbFN0cmVhbTogdGhpcy52aXJ0dWFsU3RyZWFtLnZhbHVlLFxuICAgICAgbWFpbkNhbnZhczogdGhpcy5tYWluQ2FudmFzLnZhbHVlLFxuICAgICAgcHJldktlZXBCYWNrZ3JvdW5kOiB0aGlzLnByZXZLZWVwQmFja2dyb3VuZC52YWx1ZSxcbiAgICAgIGFwcGxpZWRCYWNrZ3JvdW5kOiB0aGlzLmFwcGxpZWRCYWNrZ3JvdW5kLnZhbHVlLFxuICAgICAgaXNCYWNrZ3JvdW5kTW9kYWxWaXNpYmxlOiB0aGlzLmlzQmFja2dyb3VuZE1vZGFsVmlzaWJsZS52YWx1ZSxcbiAgICAgIGF1dG9DbGlja0JhY2tncm91bmQ6IHRoaXMuYXV0b0NsaWNrQmFja2dyb3VuZC52YWx1ZSxcblxuICAgICAgLy8gQnJlYWtvdXQgcm9vbXNcbiAgICAgIGJyZWFrb3V0Um9vbXM6IHRoaXMuYnJlYWtvdXRSb29tcy52YWx1ZSxcbiAgICAgIGN1cnJlbnRSb29tSW5kZXg6IHRoaXMuY3VycmVudFJvb21JbmRleC52YWx1ZSxcbiAgICAgIGNhblN0YXJ0QnJlYWtvdXQ6IHRoaXMuY2FuU3RhcnRCcmVha291dC52YWx1ZSxcbiAgICAgIGJyZWFrT3V0Um9vbVN0YXJ0ZWQ6IHRoaXMuYnJlYWtPdXRSb29tU3RhcnRlZC52YWx1ZSxcbiAgICAgIGJyZWFrT3V0Um9vbUVuZGVkOiB0aGlzLmJyZWFrT3V0Um9vbUVuZGVkLnZhbHVlLFxuICAgICAgaG9zdE5ld1Jvb206IHRoaXMuaG9zdE5ld1Jvb20udmFsdWUsXG4gICAgICBsaW1pdGVkQnJlYWtSb29tOiB0aGlzLmxpbWl0ZWRCcmVha1Jvb20udmFsdWUsXG4gICAgICBtYWluUm9vbXNMZW5ndGg6IHRoaXMubWFpblJvb21zTGVuZ3RoLnZhbHVlLFxuICAgICAgbWVtYmVyUm9vbTogdGhpcy5tZW1iZXJSb29tLnZhbHVlLFxuICAgICAgaXNCcmVha291dFJvb21zTW9kYWxWaXNpYmxlOiB0aGlzLmlzQnJlYWtvdXRSb29tc01vZGFsVmlzaWJsZS52YWx1ZSxcblxuICAgICAgLy8gV2hpdGVib2FyZFxuICAgICAgd2hpdGVib2FyZFVzZXJzOiB0aGlzLndoaXRlYm9hcmRVc2Vycy52YWx1ZSxcbiAgICAgIGN1cnJlbnRXaGl0ZWJvYXJkSW5kZXg6IHRoaXMuY3VycmVudFdoaXRlYm9hcmRJbmRleC52YWx1ZSxcbiAgICAgIGNhblN0YXJ0V2hpdGVib2FyZDogdGhpcy5jYW5TdGFydFdoaXRlYm9hcmQudmFsdWUsXG4gICAgICB3aGl0ZWJvYXJkU3RhcnRlZDogdGhpcy53aGl0ZWJvYXJkU3RhcnRlZC52YWx1ZSxcbiAgICAgIHdoaXRlYm9hcmRFbmRlZDogdGhpcy53aGl0ZWJvYXJkRW5kZWQudmFsdWUsXG4gICAgICB3aGl0ZWJvYXJkTGltaXQ6IHRoaXMud2hpdGVib2FyZExpbWl0LnZhbHVlLFxuICAgICAgaXNXaGl0ZWJvYXJkTW9kYWxWaXNpYmxlOiB0aGlzLmlzV2hpdGVib2FyZE1vZGFsVmlzaWJsZS52YWx1ZSxcbiAgICAgIGlzQ29uZmlndXJlV2hpdGVib2FyZE1vZGFsVmlzaWJsZTogdGhpcy5pc0NvbmZpZ3VyZVdoaXRlYm9hcmRNb2RhbFZpc2libGUudmFsdWUsXG4gICAgICBzaGFwZXM6IHRoaXMuc2hhcGVzLnZhbHVlLFxuICAgICAgdXNlSW1hZ2VCYWNrZ3JvdW5kOiB0aGlzLnVzZUltYWdlQmFja2dyb3VuZC52YWx1ZSxcbiAgICAgIHJlZG9TdGFjazogdGhpcy5yZWRvU3RhY2sudmFsdWUsXG4gICAgICB1bmRvU3RhY2s6IHRoaXMudW5kb1N0YWNrLnZhbHVlLFxuICAgICAgY2FudmFzU3RyZWFtOiB0aGlzLmNhbnZhc1N0cmVhbS52YWx1ZSxcbiAgICAgIGNhbnZhc1doaXRlYm9hcmQ6IHRoaXMuY2FudmFzV2hpdGVib2FyZC52YWx1ZSxcblxuICAgICAgLy8gU2NyZWVuYm9hcmRcbiAgICAgIGNhbnZhc1NjcmVlbmJvYXJkOiB0aGlzLmNhbnZhc1NjcmVlbmJvYXJkLnZhbHVlLFxuICAgICAgcHJvY2Vzc2VkU2NyZWVuU3RyZWFtOiB0aGlzLnByb2Nlc3NlZFNjcmVlblN0cmVhbS52YWx1ZSxcbiAgICAgIGFubm90YXRlU2NyZWVuU3RyZWFtOiB0aGlzLmFubm90YXRlU2NyZWVuU3RyZWFtLnZhbHVlLFxuICAgICAgbWFpblNjcmVlbkNhbnZhczogdGhpcy5tYWluU2NyZWVuQ2FudmFzLnZhbHVlLFxuICAgICAgaXNTY3JlZW5ib2FyZE1vZGFsVmlzaWJsZTogdGhpcy5pc1NjcmVlbmJvYXJkTW9kYWxWaXNpYmxlLnZhbHVlLFxuXG4gICAgICB2YWxpZGF0ZWQ6IHRoaXMudmFsaWRhdGVkLnZhbHVlLFxuICAgICAgZGV2aWNlOiB0aGlzLmRldmljZS52YWx1ZSxcbiAgICAgIHNvY2tldDogdGhpcy5zb2NrZXQudmFsdWUsXG4gICAgICBjaGVja01lZGlhUGVybWlzc2lvbjogZmFsc2UsXG4gICAgICBvbldlYjogdHJ1ZSxcblxuICAgICAgLy8gVXBkYXRlIGZ1bmN0aW9uc1xuICAgICAgdXBkYXRlUm9vbU5hbWU6IHRoaXMudXBkYXRlUm9vbU5hbWUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZU1lbWJlcjogdGhpcy51cGRhdGVNZW1iZXIuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUFkbWluUGFzc2NvZGU6IHRoaXMudXBkYXRlQWRtaW5QYXNzY29kZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlWW91QXJlQ29Ib3N0OiB0aGlzLnVwZGF0ZVlvdUFyZUNvSG9zdC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlWW91QXJlSG9zdDogdGhpcy51cGRhdGVZb3VBcmVIb3N0LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVJc2xldmVsOiB0aGlzLnVwZGF0ZUlzbGV2ZWwuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUNvSG9zdDogdGhpcy51cGRhdGVDb0hvc3QuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUNvSG9zdFJlc3BvbnNpYmlsaXR5OiB0aGlzLnVwZGF0ZUNvSG9zdFJlc3BvbnNpYmlsaXR5LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVDb25maXJtZWRUb1JlY29yZDogdGhpcy51cGRhdGVDb25maXJtZWRUb1JlY29yZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTWVldGluZ0Rpc3BsYXlUeXBlOiB0aGlzLnVwZGF0ZU1lZXRpbmdEaXNwbGF5VHlwZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTWVldGluZ1ZpZGVvT3B0aW1pemVkOiB0aGlzLnVwZGF0ZU1lZXRpbmdWaWRlb09wdGltaXplZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlRXZlbnRUeXBlOiB0aGlzLnVwZGF0ZUV2ZW50VHlwZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUGFydGljaXBhbnRzOiB0aGlzLnVwZGF0ZVBhcnRpY2lwYW50cy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUGFydGljaXBhbnRzQ291bnRlcjogdGhpcy51cGRhdGVQYXJ0aWNpcGFudHNDb3VudGVyLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVQYXJ0aWNpcGFudHNGaWx0ZXI6IHRoaXMudXBkYXRlUGFydGljaXBhbnRzRmlsdGVyLmJpbmQodGhpcyksXG5cbiAgICAgIC8vIE1vcmUgdXBkYXRlIGZ1bmN0aW9ucyBmb3IgbWVkaWEgZGV0YWlsc1xuICAgICAgdXBkYXRlQ29uc3VtZV9zb2NrZXRzOiB0aGlzLnVwZGF0ZUNvbnN1bWVfc29ja2V0cy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUnRwQ2FwYWJpbGl0aWVzOiB0aGlzLnVwZGF0ZVJ0cENhcGFiaWxpdGllcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUm9vbVJlY3ZJUHM6IHRoaXMudXBkYXRlUm9vbVJlY3ZJUHMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZU1lZXRpbmdSb29tUGFyYW1zOiB0aGlzLnVwZGF0ZU1lZXRpbmdSb29tUGFyYW1zLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVJdGVtUGFnZUxpbWl0OiB0aGlzLnVwZGF0ZUl0ZW1QYWdlTGltaXQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUF1ZGlvT25seVJvb206IHRoaXMudXBkYXRlQXVkaW9Pbmx5Um9vbS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQWRkRm9yQmFzaWM6IHRoaXMudXBkYXRlQWRkRm9yQmFzaWMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVNjcmVlblBhZ2VMaW1pdDogdGhpcy51cGRhdGVTY3JlZW5QYWdlTGltaXQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVNoYXJlU2NyZWVuU3RhcnRlZDogdGhpcy51cGRhdGVTaGFyZVNjcmVlblN0YXJ0ZWQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVNoYXJlZDogdGhpcy51cGRhdGVTaGFyZWQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVRhcmdldE9yaWVudGF0aW9uOiB0aGlzLnVwZGF0ZVRhcmdldE9yaWVudGF0aW9uLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVUYXJnZXRSZXNvbHV0aW9uOiB0aGlzLnVwZGF0ZVRhcmdldFJlc29sdXRpb24uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVRhcmdldFJlc29sdXRpb25Ib3N0OiB0aGlzLnVwZGF0ZVRhcmdldFJlc29sdXRpb25Ib3N0LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVWaWRDb25zOiB0aGlzLnVwZGF0ZVZpZENvbnMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUZyYW1lUmF0ZTogdGhpcy51cGRhdGVGcmFtZVJhdGUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUhQYXJhbXM6IHRoaXMudXBkYXRlSFBhcmFtcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlVlBhcmFtczogdGhpcy51cGRhdGVWUGFyYW1zLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVTY3JlZW5QYXJhbXM6IHRoaXMudXBkYXRlU2NyZWVuUGFyYW1zLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVBUGFyYW1zOiB0aGlzLnVwZGF0ZUFQYXJhbXMuYmluZCh0aGlzKSxcblxuICAgICAgLy8gTW9yZSB1cGRhdGUgZnVuY3Rpb25zIGZvciByZWNvcmRpbmcgZGV0YWlsc1xuICAgICAgdXBkYXRlUmVjb3JkaW5nQXVkaW9QYXVzZXNMaW1pdDogdGhpcy51cGRhdGVSZWNvcmRpbmdBdWRpb1BhdXNlc0xpbWl0LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRpbmdBdWRpb1BhdXNlc0NvdW50OiB0aGlzLnVwZGF0ZVJlY29yZGluZ0F1ZGlvUGF1c2VzQ291bnQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ0F1ZGlvU3VwcG9ydDogdGhpcy51cGRhdGVSZWNvcmRpbmdBdWRpb1N1cHBvcnQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ0F1ZGlvUGVvcGxlTGltaXQ6IHRoaXMudXBkYXRlUmVjb3JkaW5nQXVkaW9QZW9wbGVMaW1pdC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nQXVkaW9QYXJ0aWNpcGFudHNUaW1lTGltaXQ6XG4gICAgICAgIHRoaXMudXBkYXRlUmVjb3JkaW5nQXVkaW9QYXJ0aWNpcGFudHNUaW1lTGltaXQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ1ZpZGVvUGF1c2VzQ291bnQ6IHRoaXMudXBkYXRlUmVjb3JkaW5nVmlkZW9QYXVzZXNDb3VudC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nVmlkZW9QYXVzZXNMaW1pdDogdGhpcy51cGRhdGVSZWNvcmRpbmdWaWRlb1BhdXNlc0xpbWl0LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRpbmdWaWRlb1N1cHBvcnQ6IHRoaXMudXBkYXRlUmVjb3JkaW5nVmlkZW9TdXBwb3J0LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRpbmdWaWRlb1Blb3BsZUxpbWl0OiB0aGlzLnVwZGF0ZVJlY29yZGluZ1ZpZGVvUGVvcGxlTGltaXQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ1ZpZGVvUGFydGljaXBhbnRzVGltZUxpbWl0OlxuICAgICAgICB0aGlzLnVwZGF0ZVJlY29yZGluZ1ZpZGVvUGFydGljaXBhbnRzVGltZUxpbWl0LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRpbmdBbGxQYXJ0aWNpcGFudHNTdXBwb3J0OiB0aGlzLnVwZGF0ZVJlY29yZGluZ0FsbFBhcnRpY2lwYW50c1N1cHBvcnQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ1ZpZGVvUGFydGljaXBhbnRzU3VwcG9ydDpcbiAgICAgICAgdGhpcy51cGRhdGVSZWNvcmRpbmdWaWRlb1BhcnRpY2lwYW50c1N1cHBvcnQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ0FsbFBhcnRpY2lwYW50c0Z1bGxSb29tU3VwcG9ydDpcbiAgICAgICAgdGhpcy51cGRhdGVSZWNvcmRpbmdBbGxQYXJ0aWNpcGFudHNGdWxsUm9vbVN1cHBvcnQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ1ZpZGVvUGFydGljaXBhbnRzRnVsbFJvb21TdXBwb3J0OlxuICAgICAgICB0aGlzLnVwZGF0ZVJlY29yZGluZ1ZpZGVvUGFydGljaXBhbnRzRnVsbFJvb21TdXBwb3J0LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRpbmdQcmVmZXJyZWRPcmllbnRhdGlvbjogdGhpcy51cGRhdGVSZWNvcmRpbmdQcmVmZXJyZWRPcmllbnRhdGlvbi5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nU3VwcG9ydEZvck90aGVyT3JpZW50YXRpb246XG4gICAgICAgIHRoaXMudXBkYXRlUmVjb3JkaW5nU3VwcG9ydEZvck90aGVyT3JpZW50YXRpb24uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ011bHRpRm9ybWF0c1N1cHBvcnQ6IHRoaXMudXBkYXRlUmVjb3JkaW5nTXVsdGlGb3JtYXRzU3VwcG9ydC5iaW5kKHRoaXMpLFxuXG4gICAgICB1cGRhdGVVc2VyUmVjb3JkaW5nUGFyYW1zOiB0aGlzLnVwZGF0ZVVzZXJSZWNvcmRpbmdQYXJhbXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUNhblJlY29yZDogdGhpcy51cGRhdGVDYW5SZWNvcmQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVN0YXJ0UmVwb3J0OiB0aGlzLnVwZGF0ZVN0YXJ0UmVwb3J0LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVFbmRSZXBvcnQ6IHRoaXMudXBkYXRlRW5kUmVwb3J0LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRUaW1lckludGVydmFsOiB0aGlzLnVwZGF0ZVJlY29yZFRpbWVySW50ZXJ2YWwuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZFN0YXJ0VGltZTogdGhpcy51cGRhdGVSZWNvcmRTdGFydFRpbWUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZEVsYXBzZWRUaW1lOiB0aGlzLnVwZGF0ZVJlY29yZEVsYXBzZWRUaW1lLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVJc1RpbWVyUnVubmluZzogdGhpcy51cGRhdGVJc1RpbWVyUnVubmluZy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQ2FuUGF1c2VSZXN1bWU6IHRoaXMudXBkYXRlQ2FuUGF1c2VSZXN1bWUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZENoYW5nZVNlY29uZHM6IHRoaXMudXBkYXRlUmVjb3JkQ2hhbmdlU2Vjb25kcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUGF1c2VMaW1pdDogdGhpcy51cGRhdGVQYXVzZUxpbWl0LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVQYXVzZVJlY29yZENvdW50OiB0aGlzLnVwZGF0ZVBhdXNlUmVjb3JkQ291bnQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUNhbkxhdW5jaFJlY29yZDogdGhpcy51cGRhdGVDYW5MYXVuY2hSZWNvcmQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVN0b3BMYXVuY2hSZWNvcmQ6IHRoaXMudXBkYXRlU3RvcExhdW5jaFJlY29yZC5iaW5kKHRoaXMpLFxuXG4gICAgICB1cGRhdGVQYXJ0aWNpcGFudHNBbGw6IHRoaXMudXBkYXRlUGFydGljaXBhbnRzQWxsLmJpbmQodGhpcyksXG5cbiAgICAgIHVwZGF0ZUZpcnN0QWxsOiB0aGlzLnVwZGF0ZUZpcnN0QWxsLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVVcGRhdGVNYWluV2luZG93OiB0aGlzLnVwZGF0ZVVwZGF0ZU1haW5XaW5kb3cuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUZpcnN0X3JvdW5kOiB0aGlzLnVwZGF0ZUZpcnN0X3JvdW5kLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVMYW5kU2NhcGVkOiB0aGlzLnVwZGF0ZUxhbmRTY2FwZWQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUxvY2tfc2NyZWVuOiB0aGlzLnVwZGF0ZUxvY2tfc2NyZWVuLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVTY3JlZW5JZDogdGhpcy51cGRhdGVTY3JlZW5JZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQWxsVmlkZW9TdHJlYW1zOiB0aGlzLnVwZGF0ZUFsbFZpZGVvU3RyZWFtcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTmV3TGltaXRlZFN0cmVhbXM6IHRoaXMudXBkYXRlTmV3TGltaXRlZFN0cmVhbXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZU5ld0xpbWl0ZWRTdHJlYW1zSURzOiB0aGlzLnVwZGF0ZU5ld0xpbWl0ZWRTdHJlYW1zSURzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVBY3RpdmVTb3VuZHM6IHRoaXMudXBkYXRlQWN0aXZlU291bmRzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVTY3JlZW5TaGFyZUlEU3RyZWFtOiB0aGlzLnVwZGF0ZVNjcmVlblNoYXJlSURTdHJlYW0uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVNjcmVlblNoYXJlTmFtZVN0cmVhbTogdGhpcy51cGRhdGVTY3JlZW5TaGFyZU5hbWVTdHJlYW0uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUFkbWluSURTdHJlYW06IHRoaXMudXBkYXRlQWRtaW5JRFN0cmVhbS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQWRtaW5OYW1lU3RyZWFtOiB0aGlzLnVwZGF0ZUFkbWluTmFtZVN0cmVhbS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlWW91WW91U3RyZWFtOiB0aGlzLnVwZGF0ZVlvdVlvdVN0cmVhbS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlWW91WW91U3RyZWFtSURzOiB0aGlzLnVwZGF0ZVlvdVlvdVN0cmVhbUlEcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTG9jYWxTdHJlYW06IHRoaXMudXBkYXRlTG9jYWxTdHJlYW0uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZFN0YXJ0ZWQ6IHRoaXMudXBkYXRlUmVjb3JkU3RhcnRlZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkUmVzdW1lZDogdGhpcy51cGRhdGVSZWNvcmRSZXN1bWVkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRQYXVzZWQ6IHRoaXMudXBkYXRlUmVjb3JkUGF1c2VkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRTdG9wcGVkOiB0aGlzLnVwZGF0ZVJlY29yZFN0b3BwZWQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUFkbWluUmVzdHJpY3RTZXR0aW5nOiB0aGlzLnVwZGF0ZUFkbWluUmVzdHJpY3RTZXR0aW5nLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVWaWRlb1JlcXVlc3RTdGF0ZTogdGhpcy51cGRhdGVWaWRlb1JlcXVlc3RTdGF0ZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlVmlkZW9SZXF1ZXN0VGltZTogdGhpcy51cGRhdGVWaWRlb1JlcXVlc3RUaW1lLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVWaWRlb0FjdGlvbjogdGhpcy51cGRhdGVWaWRlb0FjdGlvbi5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTG9jYWxTdHJlYW1WaWRlbzogdGhpcy51cGRhdGVMb2NhbFN0cmVhbVZpZGVvLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVVc2VyRGVmYXVsdFZpZGVvSW5wdXREZXZpY2U6IHRoaXMudXBkYXRlVXNlckRlZmF1bHRWaWRlb0lucHV0RGV2aWNlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVDdXJyZW50RmFjaW5nTW9kZTogdGhpcy51cGRhdGVDdXJyZW50RmFjaW5nTW9kZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUHJldkZhY2luZ01vZGU6IHRoaXMudXBkYXRlUHJldkZhY2luZ01vZGUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZURlZlZpZGVvSUQ6IHRoaXMudXBkYXRlRGVmVmlkZW9JRC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQWxsb3dlZDogdGhpcy51cGRhdGVBbGxvd2VkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVEaXNwQWN0aXZlTmFtZXM6IHRoaXMudXBkYXRlRGlzcEFjdGl2ZU5hbWVzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVQX2Rpc3BBY3RpdmVOYW1lczogdGhpcy51cGRhdGVQX2Rpc3BBY3RpdmVOYW1lcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQWN0aXZlTmFtZXM6IHRoaXMudXBkYXRlQWN0aXZlTmFtZXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVByZXZBY3RpdmVOYW1lczogdGhpcy51cGRhdGVQcmV2QWN0aXZlTmFtZXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVBfYWN0aXZlTmFtZXM6IHRoaXMudXBkYXRlUF9hY3RpdmVOYW1lcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTWVtYmVyc1JlY2VpdmVkOiB0aGlzLnVwZGF0ZU1lbWJlcnNSZWNlaXZlZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlRGVmZXJTY3JlZW5SZWNlaXZlZDogdGhpcy51cGRhdGVEZWZlclNjcmVlblJlY2VpdmVkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVIb3N0Rmlyc3RTd2l0Y2g6IHRoaXMudXBkYXRlSG9zdEZpcnN0U3dpdGNoLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVNaWNBY3Rpb246IHRoaXMudXBkYXRlTWljQWN0aW9uLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVTY3JlZW5BY3Rpb246IHRoaXMudXBkYXRlU2NyZWVuQWN0aW9uLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVDaGF0QWN0aW9uOiB0aGlzLnVwZGF0ZUNoYXRBY3Rpb24uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUF1ZGlvUmVxdWVzdFN0YXRlOiB0aGlzLnVwZGF0ZUF1ZGlvUmVxdWVzdFN0YXRlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVTY3JlZW5SZXF1ZXN0U3RhdGU6IHRoaXMudXBkYXRlU2NyZWVuUmVxdWVzdFN0YXRlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVDaGF0UmVxdWVzdFN0YXRlOiB0aGlzLnVwZGF0ZUNoYXRSZXF1ZXN0U3RhdGUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUF1ZGlvUmVxdWVzdFRpbWU6IHRoaXMudXBkYXRlQXVkaW9SZXF1ZXN0VGltZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlU2NyZWVuUmVxdWVzdFRpbWU6IHRoaXMudXBkYXRlU2NyZWVuUmVxdWVzdFRpbWUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUNoYXRSZXF1ZXN0VGltZTogdGhpcy51cGRhdGVDaGF0UmVxdWVzdFRpbWUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZU9sZFNvdW5kSWRzOiB0aGlzLnVwZGF0ZU9sZFNvdW5kSWRzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVIb3N0TGFiZWw6IHRoaXMudXBkYXRlSG9zdExhYmVsLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVNYWluU2NyZWVuRmlsbGVkOiB0aGlzLnVwZGF0ZU1haW5TY3JlZW5GaWxsZWQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUxvY2FsU3RyZWFtU2NyZWVuOiB0aGlzLnVwZGF0ZUxvY2FsU3RyZWFtU2NyZWVuLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVTY3JlZW5BbHJlYWR5T246IHRoaXMudXBkYXRlU2NyZWVuQWxyZWFkeU9uLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVDaGF0QWxyZWFkeU9uOiB0aGlzLnVwZGF0ZUNoYXRBbHJlYWR5T24uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlZGlyZWN0VVJMOiB0aGlzLnVwZGF0ZVJlZGlyZWN0VVJMLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVPbGRBbGxTdHJlYW1zOiB0aGlzLnVwZGF0ZU9sZEFsbFN0cmVhbXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUFkbWluVmlkSUQ6IHRoaXMudXBkYXRlQWRtaW5WaWRJRC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlU3RyZWFtTmFtZXM6IHRoaXMudXBkYXRlU3RyZWFtTmFtZXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZU5vbl9hbFZpZGVvU3RyZWFtczogdGhpcy51cGRhdGVOb25fYWxWaWRlb1N0cmVhbXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVNvcnRBdWRpb0xvdWRuZXNzOiB0aGlzLnVwZGF0ZVNvcnRBdWRpb0xvdWRuZXNzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVBdWRpb0RlY2liZWxzOiB0aGlzLnVwZGF0ZUF1ZGlvRGVjaWJlbHMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZU1peGVkX2FsVmlkZW9TdHJlYW1zOiB0aGlzLnVwZGF0ZU1peGVkX2FsVmlkZW9TdHJlYW1zLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVOb25fYWxWaWRlb1N0cmVhbXNfbXV0ZWQ6IHRoaXMudXBkYXRlTm9uX2FsVmlkZW9TdHJlYW1zX211dGVkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVQYWdpbmF0ZWRTdHJlYW1zOiB0aGlzLnVwZGF0ZVBhZ2luYXRlZFN0cmVhbXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUxvY2FsU3RyZWFtQXVkaW86IHRoaXMudXBkYXRlTG9jYWxTdHJlYW1BdWRpby5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlRGVmQXVkaW9JRDogdGhpcy51cGRhdGVEZWZBdWRpb0lELmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVVc2VyRGVmYXVsdEF1ZGlvSW5wdXREZXZpY2U6IHRoaXMudXBkYXRlVXNlckRlZmF1bHRBdWRpb0lucHV0RGV2aWNlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVVc2VyRGVmYXVsdEF1ZGlvT3V0cHV0RGV2aWNlOiB0aGlzLnVwZGF0ZVVzZXJEZWZhdWx0QXVkaW9PdXRwdXREZXZpY2UuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVByZXZBdWRpb0lucHV0RGV2aWNlOiB0aGlzLnVwZGF0ZVByZXZBdWRpb0lucHV0RGV2aWNlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVQcmV2VmlkZW9JbnB1dERldmljZTogdGhpcy51cGRhdGVQcmV2VmlkZW9JbnB1dERldmljZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQXVkaW9QYXVzZWQ6IHRoaXMudXBkYXRlQXVkaW9QYXVzZWQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZU1haW5TY3JlZW5QZXJzb246IHRoaXMudXBkYXRlTWFpblNjcmVlblBlcnNvbi5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQWRtaW5Pbk1haW5TY3JlZW46IHRoaXMudXBkYXRlQWRtaW5Pbk1haW5TY3JlZW4uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVNjcmVlblN0YXRlczogdGhpcy51cGRhdGVTY3JlZW5TdGF0ZXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVByZXZTY3JlZW5TdGF0ZXM6IHRoaXMudXBkYXRlUHJldlNjcmVlblN0YXRlcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlVXBkYXRlRGF0ZVN0YXRlOiB0aGlzLnVwZGF0ZVVwZGF0ZURhdGVTdGF0ZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTGFzdFVwZGF0ZTogdGhpcy51cGRhdGVMYXN0VXBkYXRlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVORm9yUmVhZGp1c3RSZWNvcmQ6IHRoaXMudXBkYXRlTkZvclJlYWRqdXN0UmVjb3JkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVGaXhlZFBhZ2VMaW1pdDogdGhpcy51cGRhdGVGaXhlZFBhZ2VMaW1pdC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVtb3ZlQWx0R3JpZDogdGhpcy51cGRhdGVSZW1vdmVBbHRHcmlkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVORm9yUmVhZGp1c3Q6IHRoaXMudXBkYXRlTkZvclJlYWRqdXN0LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVMYXN0UmVvcmRlclRpbWU6IHRoaXMudXBkYXRlTGFzdFJlb3JkZXJUaW1lLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVBdWRTdHJlYW1OYW1lczogdGhpcy51cGRhdGVBdWRTdHJlYW1OYW1lcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQ3VycmVudFVzZXJQYWdlOiB0aGlzLnVwZGF0ZUN1cnJlbnRVc2VyUGFnZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTWFpbkhlaWdodFdpZHRoOiB0aGlzLnVwZGF0ZU1haW5IZWlnaHRXaWR0aC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUHJldk1haW5IZWlnaHRXaWR0aDogdGhpcy51cGRhdGVQcmV2TWFpbkhlaWdodFdpZHRoLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVQcmV2RG9QYWdpbmF0ZTogdGhpcy51cGRhdGVQcmV2RG9QYWdpbmF0ZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlRG9QYWdpbmF0ZTogdGhpcy51cGRhdGVEb1BhZ2luYXRlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVTaGFyZUVuZGVkOiB0aGlzLnVwZGF0ZVNoYXJlRW5kZWQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUxTdHJlYW1zOiB0aGlzLnVwZGF0ZUxTdHJlYW1zLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVDaGF0UmVmU3RyZWFtczogdGhpcy51cGRhdGVDaGF0UmVmU3RyZWFtcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQ29udHJvbEhlaWdodDogdGhpcy51cGRhdGVDb250cm9sSGVpZ2h0LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVJc1dpZGVTY3JlZW46IHRoaXMudXBkYXRlSXNXaWRlU2NyZWVuLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVJc01lZGl1bVNjcmVlbjogdGhpcy51cGRhdGVJc01lZGl1bVNjcmVlbi5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlSXNTbWFsbFNjcmVlbjogdGhpcy51cGRhdGVJc1NtYWxsU2NyZWVuLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVBZGRHcmlkOiB0aGlzLnVwZGF0ZUFkZEdyaWQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUFkZEFsdEdyaWQ6IHRoaXMudXBkYXRlQWRkQWx0R3JpZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlR3JpZFJvd3M6IHRoaXMudXBkYXRlR3JpZFJvd3MuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUdyaWRDb2xzOiB0aGlzLnVwZGF0ZUdyaWRDb2xzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVBbHRHcmlkUm93czogdGhpcy51cGRhdGVBbHRHcmlkUm93cy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQWx0R3JpZENvbHM6IHRoaXMudXBkYXRlQWx0R3JpZENvbHMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZU51bWJlclBhZ2VzOiB0aGlzLnVwZGF0ZU51bWJlclBhZ2VzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVDdXJyZW50U3RyZWFtczogdGhpcy51cGRhdGVDdXJyZW50U3RyZWFtcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlU2hvd01pbmlWaWV3OiB0aGlzLnVwZGF0ZVNob3dNaW5pVmlldy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTlN0cmVhbTogdGhpcy51cGRhdGVOU3RyZWFtLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVEZWZlcl9yZWNlaXZlOiB0aGlzLnVwZGF0ZURlZmVyX3JlY2VpdmUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUFsbEF1ZGlvU3RyZWFtczogdGhpcy51cGRhdGVBbGxBdWRpb1N0cmVhbXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlbW90ZVNjcmVlblN0cmVhbTogdGhpcy51cGRhdGVSZW1vdGVTY3JlZW5TdHJlYW0uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVNjcmVlblByb2R1Y2VyOiB0aGlzLnVwZGF0ZVNjcmVlblByb2R1Y2VyLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVHb3RBbGxWaWRzOiB0aGlzLnVwZGF0ZUdvdEFsbFZpZHMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVBhZ2luYXRpb25IZWlnaHRXaWR0aDogdGhpcy51cGRhdGVQYWdpbmF0aW9uSGVpZ2h0V2lkdGguYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVBhZ2luYXRpb25EaXJlY3Rpb246IHRoaXMudXBkYXRlUGFnaW5hdGlvbkRpcmVjdGlvbi5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlR3JpZFNpemVzOiB0aGlzLnVwZGF0ZUdyaWRTaXplcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlU2NyZWVuRm9yY2VGdWxsRGlzcGxheTogdGhpcy51cGRhdGVTY3JlZW5Gb3JjZUZ1bGxEaXNwbGF5LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVNYWluR3JpZFN0cmVhbTogdGhpcy51cGRhdGVNYWluR3JpZFN0cmVhbS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlT3RoZXJHcmlkU3RyZWFtczogdGhpcy51cGRhdGVPdGhlckdyaWRTdHJlYW1zLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVBdWRpb09ubHlTdHJlYW1zOiB0aGlzLnVwZGF0ZUF1ZGlvT25seVN0cmVhbXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVZpZGVvSW5wdXRzOiB0aGlzLnVwZGF0ZVZpZGVvSW5wdXRzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVBdWRpb0lucHV0czogdGhpcy51cGRhdGVBdWRpb0lucHV0cy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTWVldGluZ1Byb2dyZXNzVGltZTogdGhpcy51cGRhdGVNZWV0aW5nUHJvZ3Jlc3NUaW1lLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVNZWV0aW5nRWxhcHNlZFRpbWU6IHRoaXMudXBkYXRlTWVldGluZ0VsYXBzZWRUaW1lLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWZfcGFydGljaXBhbnRzOiB0aGlzLnVwZGF0ZVJlZl9wYXJ0aWNpcGFudHMuYmluZCh0aGlzKSxcblxuICAgICAgdXBkYXRlTWVzc2FnZXM6IHRoaXMudXBkYXRlTWVzc2FnZXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVN0YXJ0RGlyZWN0TWVzc2FnZTogdGhpcy51cGRhdGVTdGFydERpcmVjdE1lc3NhZ2UuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZURpcmVjdE1lc3NhZ2VEZXRhaWxzOiB0aGlzLnVwZGF0ZURpcmVjdE1lc3NhZ2VEZXRhaWxzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVTaG93TWVzc2FnZXNCYWRnZTogdGhpcy51cGRhdGVTaG93TWVzc2FnZXNCYWRnZS5iaW5kKHRoaXMpLFxuXG4gICAgICAvLyBFdmVudCBzZXR0aW5nc1xuICAgICAgdXBkYXRlQXVkaW9TZXR0aW5nOiB0aGlzLnVwZGF0ZUF1ZGlvU2V0dGluZy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlVmlkZW9TZXR0aW5nOiB0aGlzLnVwZGF0ZVZpZGVvU2V0dGluZy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlU2NyZWVuc2hhcmVTZXR0aW5nOiB0aGlzLnVwZGF0ZVNjcmVlbnNoYXJlU2V0dGluZy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQ2hhdFNldHRpbmc6IHRoaXMudXBkYXRlQ2hhdFNldHRpbmcuYmluZCh0aGlzKSxcblxuICAgICAgLy8gRGlzcGxheSBzZXR0aW5nc1xuICAgICAgdXBkYXRlQXV0b1dhdmU6IHRoaXMudXBkYXRlQXV0b1dhdmUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUZvcmNlRnVsbERpc3BsYXk6IHRoaXMudXBkYXRlRm9yY2VGdWxsRGlzcGxheS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUHJldkZvcmNlRnVsbERpc3BsYXk6IHRoaXMudXBkYXRlUHJldkZvcmNlRnVsbERpc3BsYXkuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVByZXZNZWV0aW5nRGlzcGxheVR5cGU6IHRoaXMudXBkYXRlUHJldk1lZXRpbmdEaXNwbGF5VHlwZS5iaW5kKHRoaXMpLFxuXG4gICAgICAvLyBXYWl0aW5nIHJvb21cbiAgICAgIHVwZGF0ZVdhaXRpbmdSb29tRmlsdGVyOiB0aGlzLnVwZGF0ZVdhaXRpbmdSb29tRmlsdGVyLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVXYWl0aW5nUm9vbUxpc3Q6IHRoaXMudXBkYXRlV2FpdGluZ1Jvb21MaXN0LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVXYWl0aW5nUm9vbUNvdW50ZXI6IHRoaXMudXBkYXRlV2FpdGluZ1Jvb21Db3VudGVyLmJpbmQodGhpcyksXG5cbiAgICAgIC8vIFJlcXVlc3RzXG4gICAgICB1cGRhdGVSZXF1ZXN0RmlsdGVyOiB0aGlzLnVwZGF0ZVJlcXVlc3RGaWx0ZXIuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlcXVlc3RMaXN0OiB0aGlzLnVwZGF0ZVJlcXVlc3RMaXN0LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZXF1ZXN0Q291bnRlcjogdGhpcy51cGRhdGVSZXF1ZXN0Q291bnRlci5iaW5kKHRoaXMpLFxuXG4gICAgICAvLyBUb3RhbCByZXF1ZXN0cyBhbmQgd2FpdGluZyByb29tXG4gICAgICB1cGRhdGVUb3RhbFJlcVdhaXQ6IHRoaXMudXBkYXRlVG90YWxSZXFXYWl0LmJpbmQodGhpcyksXG5cbiAgICAgIC8vIE1lbnUgbW9kYWxzXG4gICAgICB1cGRhdGVJc01lbnVNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNNZW51TW9kYWxWaXNpYmxlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVJc1JlY29yZGluZ01vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc1JlY29yZGluZ01vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlSXNTZXR0aW5nc01vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc1NldHRpbmdzTW9kYWxWaXNpYmxlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVJc1JlcXVlc3RzTW9kYWxWaXNpYmxlOiB0aGlzLnVwZGF0ZUlzUmVxdWVzdHNNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUlzV2FpdGluZ01vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc1dhaXRpbmdNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUlzQ29Ib3N0TW9kYWxWaXNpYmxlOiB0aGlzLnVwZGF0ZUlzQ29Ib3N0TW9kYWxWaXNpYmxlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVJc01lZGlhU2V0dGluZ3NNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNNZWRpYVNldHRpbmdzTW9kYWxWaXNpYmxlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVJc0Rpc3BsYXlTZXR0aW5nc01vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc0Rpc3BsYXlTZXR0aW5nc01vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuXG4gICAgICAvLyBPdGhlciBtb2RhbHNcbiAgICAgIHVwZGF0ZUlzUGFydGljaXBhbnRzTW9kYWxWaXNpYmxlOiB0aGlzLnVwZGF0ZUlzUGFydGljaXBhbnRzTW9kYWxWaXNpYmxlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVJc01lc3NhZ2VzTW9kYWxWaXNpYmxlOiB0aGlzLnVwZGF0ZUlzTWVzc2FnZXNNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUlzQ29uZmlybUV4aXRNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNDb25maXJtRXhpdE1vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlSXNDb25maXJtSGVyZU1vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc0NvbmZpcm1IZXJlTW9kYWxWaXNpYmxlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVJc0xvYWRpbmdNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNMb2FkaW5nTW9kYWxWaXNpYmxlLmJpbmQodGhpcyksXG5cbiAgICAgIC8vIFJlY29yZGluZyBPcHRpb25zXG4gICAgICB1cGRhdGVSZWNvcmRpbmdNZWRpYU9wdGlvbnM6IHRoaXMudXBkYXRlUmVjb3JkaW5nTWVkaWFPcHRpb25zLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRpbmdBdWRpb09wdGlvbnM6IHRoaXMudXBkYXRlUmVjb3JkaW5nQXVkaW9PcHRpb25zLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRpbmdWaWRlb09wdGlvbnM6IHRoaXMudXBkYXRlUmVjb3JkaW5nVmlkZW9PcHRpb25zLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRpbmdWaWRlb1R5cGU6IHRoaXMudXBkYXRlUmVjb3JkaW5nVmlkZW9UeXBlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRpbmdWaWRlb09wdGltaXplZDogdGhpcy51cGRhdGVSZWNvcmRpbmdWaWRlb09wdGltaXplZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nRGlzcGxheVR5cGU6IHRoaXMudXBkYXRlUmVjb3JkaW5nRGlzcGxheVR5cGUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ0FkZEhMUzogdGhpcy51cGRhdGVSZWNvcmRpbmdBZGRITFMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ0FkZFRleHQ6IHRoaXMudXBkYXRlUmVjb3JkaW5nQWRkVGV4dC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nQ3VzdG9tVGV4dDogdGhpcy51cGRhdGVSZWNvcmRpbmdDdXN0b21UZXh0LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRpbmdDdXN0b21UZXh0UG9zaXRpb246IHRoaXMudXBkYXRlUmVjb3JkaW5nQ3VzdG9tVGV4dFBvc2l0aW9uLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRpbmdDdXN0b21UZXh0Q29sb3I6IHRoaXMudXBkYXRlUmVjb3JkaW5nQ3VzdG9tVGV4dENvbG9yLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRpbmdOYW1lVGFnczogdGhpcy51cGRhdGVSZWNvcmRpbmdOYW1lVGFncy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nQmFja2dyb3VuZENvbG9yOiB0aGlzLnVwZGF0ZVJlY29yZGluZ0JhY2tncm91bmRDb2xvci5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nTmFtZVRhZ3NDb2xvcjogdGhpcy51cGRhdGVSZWNvcmRpbmdOYW1lVGFnc0NvbG9yLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRpbmdPcmllbnRhdGlvblZpZGVvOiB0aGlzLnVwZGF0ZVJlY29yZGluZ09yaWVudGF0aW9uVmlkZW8uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUNsZWFyZWRUb1Jlc3VtZTogdGhpcy51cGRhdGVDbGVhcmVkVG9SZXN1bWUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUNsZWFyZWRUb1JlY29yZDogdGhpcy51cGRhdGVDbGVhcmVkVG9SZWNvcmQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZFN0YXRlOiB0aGlzLnVwZGF0ZVJlY29yZFN0YXRlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVTaG93UmVjb3JkQnV0dG9uczogdGhpcy51cGRhdGVTaG93UmVjb3JkQnV0dG9ucy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nUHJvZ3Jlc3NUaW1lOiB0aGlzLnVwZGF0ZVJlY29yZGluZ1Byb2dyZXNzVGltZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQXVkaW9Td2l0Y2hpbmc6IHRoaXMudXBkYXRlQXVkaW9Td2l0Y2hpbmcuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVZpZGVvU3dpdGNoaW5nOiB0aGlzLnVwZGF0ZVZpZGVvU3dpdGNoaW5nLmJpbmQodGhpcyksXG5cbiAgICAgIC8vIE1lZGlhIHN0YXRlc1xuICAgICAgdXBkYXRlVmlkZW9BbHJlYWR5T246IHRoaXMudXBkYXRlVmlkZW9BbHJlYWR5T24uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUF1ZGlvQWxyZWFkeU9uOiB0aGlzLnVwZGF0ZUF1ZGlvQWxyZWFkeU9uLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVDb21wb25lbnRTaXplczogdGhpcy51cGRhdGVDb21wb25lbnRTaXplcy5iaW5kKHRoaXMpLFxuXG4gICAgICAvLyBQZXJtaXNzaW9uc1xuICAgICAgdXBkYXRlSGFzQ2FtZXJhUGVybWlzc2lvbjogdGhpcy51cGRhdGVIYXNDYW1lcmFQZXJtaXNzaW9uLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVIYXNBdWRpb1Blcm1pc3Npb246IHRoaXMudXBkYXRlSGFzQXVkaW9QZXJtaXNzaW9uLmJpbmQodGhpcyksXG5cbiAgICAgIC8vIFRyYW5zcG9ydHNcbiAgICAgIHVwZGF0ZVRyYW5zcG9ydENyZWF0ZWQ6IHRoaXMudXBkYXRlVHJhbnNwb3J0Q3JlYXRlZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlVHJhbnNwb3J0Q3JlYXRlZFZpZGVvOiB0aGlzLnVwZGF0ZVRyYW5zcG9ydENyZWF0ZWRWaWRlby5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlVHJhbnNwb3J0Q3JlYXRlZEF1ZGlvOiB0aGlzLnVwZGF0ZVRyYW5zcG9ydENyZWF0ZWRBdWRpby5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlVHJhbnNwb3J0Q3JlYXRlZFNjcmVlbjogdGhpcy51cGRhdGVUcmFuc3BvcnRDcmVhdGVkU2NyZWVuLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVQcm9kdWNlclRyYW5zcG9ydDogdGhpcy51cGRhdGVQcm9kdWNlclRyYW5zcG9ydC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlVmlkZW9Qcm9kdWNlcjogdGhpcy51cGRhdGVWaWRlb1Byb2R1Y2VyLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVQYXJhbXM6IHRoaXMudXBkYXRlUGFyYW1zLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVWaWRlb1BhcmFtczogdGhpcy51cGRhdGVWaWRlb1BhcmFtcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQXVkaW9QYXJhbXM6IHRoaXMudXBkYXRlQXVkaW9QYXJhbXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUF1ZGlvUHJvZHVjZXI6IHRoaXMudXBkYXRlQXVkaW9Qcm9kdWNlci5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQ29uc3VtZXJUcmFuc3BvcnRzOiB0aGlzLnVwZGF0ZUNvbnN1bWVyVHJhbnNwb3J0cy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQ29uc3VtaW5nVHJhbnNwb3J0czogdGhpcy51cGRhdGVDb25zdW1pbmdUcmFuc3BvcnRzLmJpbmQodGhpcyksXG5cbiAgICAgIC8vIFBvbGxzXG4gICAgICB1cGRhdGVQb2xsczogdGhpcy51cGRhdGVQb2xscy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUG9sbDogdGhpcy51cGRhdGVQb2xsLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVJc1BvbGxNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNQb2xsTW9kYWxWaXNpYmxlLmJpbmQodGhpcyksXG5cbiAgICAgIC8vIEJhY2tncm91bmRcbiAgICAgIHVwZGF0ZUN1c3RvbUltYWdlOiB0aGlzLnVwZGF0ZUN1c3RvbUltYWdlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVTZWxlY3RlZEltYWdlOiB0aGlzLnVwZGF0ZVNlbGVjdGVkSW1hZ2UuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVNlZ21lbnRWaWRlbzogdGhpcy51cGRhdGVTZWdtZW50VmlkZW8uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVNlbGZpZVNlZ21lbnRhdGlvbjogdGhpcy51cGRhdGVTZWxmaWVTZWdtZW50YXRpb24uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVBhdXNlU2VnbWVudGF0aW9uOiB0aGlzLnVwZGF0ZVBhdXNlU2VnbWVudGF0aW9uLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVQcm9jZXNzZWRTdHJlYW06IHRoaXMudXBkYXRlUHJvY2Vzc2VkU3RyZWFtLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVLZWVwQmFja2dyb3VuZDogdGhpcy51cGRhdGVLZWVwQmFja2dyb3VuZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQmFja2dyb3VuZEhhc0NoYW5nZWQ6IHRoaXMudXBkYXRlQmFja2dyb3VuZEhhc0NoYW5nZWQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVZpcnR1YWxTdHJlYW06IHRoaXMudXBkYXRlVmlydHVhbFN0cmVhbS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTWFpbkNhbnZhczogdGhpcy51cGRhdGVNYWluQ2FudmFzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVQcmV2S2VlcEJhY2tncm91bmQ6IHRoaXMudXBkYXRlUHJldktlZXBCYWNrZ3JvdW5kLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVBcHBsaWVkQmFja2dyb3VuZDogdGhpcy51cGRhdGVBcHBsaWVkQmFja2dyb3VuZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlSXNCYWNrZ3JvdW5kTW9kYWxWaXNpYmxlOiB0aGlzLnVwZGF0ZUlzQmFja2dyb3VuZE1vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQXV0b0NsaWNrQmFja2dyb3VuZDogdGhpcy51cGRhdGVBdXRvQ2xpY2tCYWNrZ3JvdW5kLmJpbmQodGhpcyksXG5cbiAgICAgIC8vIEJyZWFrb3V0IHJvb21zXG4gICAgICB1cGRhdGVCcmVha291dFJvb21zOiB0aGlzLnVwZGF0ZUJyZWFrb3V0Um9vbXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUN1cnJlbnRSb29tSW5kZXg6IHRoaXMudXBkYXRlQ3VycmVudFJvb21JbmRleC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQ2FuU3RhcnRCcmVha291dDogdGhpcy51cGRhdGVDYW5TdGFydEJyZWFrb3V0LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVCcmVha091dFJvb21TdGFydGVkOiB0aGlzLnVwZGF0ZUJyZWFrT3V0Um9vbVN0YXJ0ZWQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUJyZWFrT3V0Um9vbUVuZGVkOiB0aGlzLnVwZGF0ZUJyZWFrT3V0Um9vbUVuZGVkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVIb3N0TmV3Um9vbTogdGhpcy51cGRhdGVIb3N0TmV3Um9vbS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTGltaXRlZEJyZWFrUm9vbTogdGhpcy51cGRhdGVMaW1pdGVkQnJlYWtSb29tLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVNYWluUm9vbXNMZW5ndGg6IHRoaXMudXBkYXRlTWFpblJvb21zTGVuZ3RoLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVNZW1iZXJSb29tOiB0aGlzLnVwZGF0ZU1lbWJlclJvb20uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUlzQnJlYWtvdXRSb29tc01vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc0JyZWFrb3V0Um9vbXNNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcblxuICAgICAgLy8gV2hpdGVib2FyZFxuICAgICAgdXBkYXRlV2hpdGVib2FyZFVzZXJzOiB0aGlzLnVwZGF0ZVdoaXRlYm9hcmRVc2Vycy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQ3VycmVudFdoaXRlYm9hcmRJbmRleDogdGhpcy51cGRhdGVDdXJyZW50V2hpdGVib2FyZEluZGV4LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVDYW5TdGFydFdoaXRlYm9hcmQ6IHRoaXMudXBkYXRlQ2FuU3RhcnRXaGl0ZWJvYXJkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVXaGl0ZWJvYXJkU3RhcnRlZDogdGhpcy51cGRhdGVXaGl0ZWJvYXJkU3RhcnRlZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlV2hpdGVib2FyZEVuZGVkOiB0aGlzLnVwZGF0ZVdoaXRlYm9hcmRFbmRlZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlV2hpdGVib2FyZExpbWl0OiB0aGlzLnVwZGF0ZVdoaXRlYm9hcmRMaW1pdC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlSXNXaGl0ZWJvYXJkTW9kYWxWaXNpYmxlOiB0aGlzLnVwZGF0ZUlzV2hpdGVib2FyZE1vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlSXNDb25maWd1cmVXaGl0ZWJvYXJkTW9kYWxWaXNpYmxlOlxuICAgICAgICB0aGlzLnVwZGF0ZUlzQ29uZmlndXJlV2hpdGVib2FyZE1vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlU2hhcGVzOiB0aGlzLnVwZGF0ZVNoYXBlcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlVXNlSW1hZ2VCYWNrZ3JvdW5kOiB0aGlzLnVwZGF0ZVVzZUltYWdlQmFja2dyb3VuZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVkb1N0YWNrOiB0aGlzLnVwZGF0ZVJlZG9TdGFjay5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlVW5kb1N0YWNrOiB0aGlzLnVwZGF0ZVVuZG9TdGFjay5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQ2FudmFzU3RyZWFtOiB0aGlzLnVwZGF0ZUNhbnZhc1N0cmVhbS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQ2FudmFzV2hpdGVib2FyZDogdGhpcy51cGRhdGVDYW52YXNXaGl0ZWJvYXJkLmJpbmQodGhpcyksXG5cbiAgICAgIC8vIFNjcmVlbmJvYXJkXG4gICAgICB1cGRhdGVDYW52YXNTY3JlZW5ib2FyZDogdGhpcy51cGRhdGVDYW52YXNTY3JlZW5ib2FyZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUHJvY2Vzc2VkU2NyZWVuU3RyZWFtOiB0aGlzLnVwZGF0ZVByb2Nlc3NlZFNjcmVlblN0cmVhbS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQW5ub3RhdGVTY3JlZW5TdHJlYW06IHRoaXMudXBkYXRlQW5ub3RhdGVTY3JlZW5TdHJlYW0uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZU1haW5TY3JlZW5DYW52YXM6IHRoaXMudXBkYXRlTWFpblNjcmVlbkNhbnZhcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlSXNTY3JlZW5ib2FyZE1vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc1NjcmVlbmJvYXJkTW9kYWxWaXNpYmxlLmJpbmQodGhpcyksXG5cbiAgICAgIC8vIE90aGVyIGZ1bmN0aW9uc1xuICAgICAgY2hlY2tPcmllbnRhdGlvbjogdGhpcy5jaGVja09yaWVudGF0aW9uLmJpbmQodGhpcyksXG5cbiAgICAgIHVwZGF0ZURldmljZTogdGhpcy51cGRhdGVEZXZpY2UuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVNvY2tldDogdGhpcy51cGRhdGVTb2NrZXQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVZhbGlkYXRlZDogdGhpcy51cGRhdGVWYWxpZGF0ZWQuYmluZCh0aGlzKSxcblxuICAgICAgc2hvd0FsZXJ0OiB0aGlzLnNob3dBbGVydC5iaW5kKHRoaXMpLFxuICAgICAgZ2V0VXBkYXRlZEFsbFBhcmFtczogKCkgPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLnRoaXMuZ2V0QWxsUGFyYW1zKCksXG4gICAgICAgICAgLi4udGhpcy5tZWRpYVNGVUZ1bmN0aW9ucygpLFxuICAgICAgICB9O1xuICAgICAgfSxcbiAgICB9O1xuICB9XG5cbiAgbWVkaWFTRlVQYXJhbWV0ZXJzID0ge1xuICAgIC4uLnRoaXMuZ2V0QWxsUGFyYW1zKCksXG4gICAgLi4udGhpcy5tZWRpYVNGVUZ1bmN0aW9ucygpLFxuICB9O1xuXG4gIGdldFVwZGF0ZWRBbGxQYXJhbXMgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnRoaXMuZ2V0QWxsUGFyYW1zKCksXG4gICAgICAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCksXG4gICAgfTtcbiAgfTtcblxuICB1cGRhdGVCdXR0b25TdGF0ZShidXR0b25UeXBlOiBzdHJpbmcsIHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5jb250cm9sQnV0dG9ucyA9IHRoaXMuY29udHJvbEJ1dHRvbnMubWFwKChidXR0b24pID0+IHtcbiAgICAgIGlmIChidXR0b25UeXBlID09PSAnbWljQWN0aXZlJyAmJiBidXR0b24uaWNvbiA9PT0gdGhpcy5mYU1pY3JvcGhvbmVTbGFzaCkge1xuICAgICAgICByZXR1cm4geyAuLi5idXR0b24sIGFjdGl2ZTogdmFsdWUgfTtcbiAgICAgIH1cbiAgICAgIGlmIChidXR0b25UeXBlID09PSAndmlkZW9BY3RpdmUnICYmIGJ1dHRvbi5pY29uID09PSB0aGlzLmZhVmlkZW9TbGFzaCkge1xuICAgICAgICByZXR1cm4geyAuLi5idXR0b24sIGFjdGl2ZTogdmFsdWUgfTtcbiAgICAgIH1cbiAgICAgIGlmIChidXR0b25UeXBlID09PSAnc2NyZWVuU2hhcmVBY3RpdmUnICYmIGJ1dHRvbi5pY29uID09PSB0aGlzLmZhRGVza3RvcCkge1xuICAgICAgICBpZiAoYnV0dG9uLmFsdGVybmF0ZUljb25Db21wb25lbnQpIHtcbiAgICAgICAgICBjb25zdCB1cGRhdGVkSW5qZWN0b3IgPSB0aGlzLmNyZWF0ZUluamVjdG9yKHtcbiAgICAgICAgICAgIGRpc2FibGVkOiAhdmFsdWUsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLmJ1dHRvbixcbiAgICAgICAgICAgIGFjdGl2ZTogdHJ1ZSxcbiAgICAgICAgICAgIGFsdGVybmF0ZUljb25Db21wb25lbnQ6IHsgLi4udGhpcy5zY3JlZW5TaGFyZVdpZGdldCwgaW5qZWN0b3I6IHVwZGF0ZWRJbmplY3RvciB9LFxuICAgICAgICAgIH07IC8vYWx3YXlzIGRlZmF1bHQgdG8gdHJ1ZSBmb3IgYWN0aXZlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHsgLi4uYnV0dG9uLCBhY3RpdmU6IHRydWUgfTsgLy9hbHdheXMgZGVmYXVsdCB0byB0cnVlIGZvciBhY3RpdmVcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGJ1dHRvblR5cGUgPT09ICdlbmRDYWxsQWN0aXZlJyAmJiBidXR0b24uaWNvbiA9PT0gdGhpcy5mYVBob25lKSB7XG4gICAgICAgIHJldHVybiB7IC4uLmJ1dHRvbiwgYWN0aXZlOiB2YWx1ZSB9O1xuICAgICAgfVxuICAgICAgaWYgKGJ1dHRvblR5cGUgPT09ICdwYXJ0aWNpcGFudHNBY3RpdmUnICYmIGJ1dHRvbi5pY29uID09PSB0aGlzLmZhVXNlcnMpIHtcbiAgICAgICAgcmV0dXJuIHsgLi4uYnV0dG9uLCBhY3RpdmU6IHZhbHVlIH07XG4gICAgICB9XG4gICAgICBpZiAoXG4gICAgICAgIGJ1dHRvblR5cGUgPT09ICdzaG93TWVzc2FnZXNCYWRnZScgJiZcbiAgICAgICAgYnV0dG9uLmN1c3RvbU5hbWUgJiZcbiAgICAgICAgYnV0dG9uLmN1c3RvbU5hbWUgPT09ICdNZXNzYWdlcydcbiAgICAgICkge1xuICAgICAgICBjb25zdCB1cGRhdGVkSW5qZWN0b3IgPSB0aGlzLmNyZWF0ZUluamVjdG9yKHtcbiAgICAgICAgICBpY29uOiB0aGlzLmZhQ29tbWVudHMsXG4gICAgICAgICAgYmFkZ2VWYWx1ZTogdmFsdWUgPyAnKicgOiAnJyxcbiAgICAgICAgICBpY29uQ29sb3I6ICdibGFjaycsXG4gICAgICAgICAgc2hvd0JhZGdlOiB2YWx1ZSxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB7IC4uLmJ1dHRvbiwgY3VzdG9tQ29tcG9uZW50OiB7IC4uLnRoaXMubWVzc2FnZVdpZGdldCwgaW5qZWN0b3I6IHVwZGF0ZWRJbmplY3RvciB9IH07XG4gICAgICB9XG4gICAgICBpZiAoYnV0dG9uVHlwZSA9PT0gJ3Nob3dNZW51QmFkZ2UnICYmIGJ1dHRvbi5jdXN0b21OYW1lICYmIGJ1dHRvbi5jdXN0b21OYW1lID09PSAnTWVudScpIHtcbiAgICAgICAgY29uc3QgdXBkYXRlZEluamVjdG9yID0gdGhpcy5jcmVhdGVJbmplY3Rvcih7XG4gICAgICAgICAgaWNvbjogdGhpcy5mYUJhcnMsXG4gICAgICAgICAgYmFkZ2VWYWx1ZTogdGhpcy50b3RhbFJlcVdhaXQudmFsdWUsXG4gICAgICAgICAgaWNvbkNvbG9yOiAnYmxhY2snLFxuICAgICAgICAgIHNob3dCYWRnZTogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB7IC4uLmJ1dHRvbiwgY3VzdG9tQ29tcG9uZW50OiB7IC4uLnRoaXMubWVudVdpZGdldCwgaW5qZWN0b3I6IHVwZGF0ZWRJbmplY3RvciB9IH07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBidXR0b247XG4gICAgfSk7XG5cbiAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBQcmVqb2luUGFnZUNvbXBvbmVudDogYW55ID0ge1xuICAgIGNvbXBvbmVudDogdGhpcy5QcmVqb2luUGFnZSxcbiAgICBpbmplY3RvcjogbnVsbCxcbiAgfTtcblxuICB1cGRhdGVQcmVqb2luUGFnZUNvbXBvbmVudCA9ICgpID0+IHtcbiAgICBjb25zdCBQcmVqb2luQ29tcCA9IHtcbiAgICAgIGNvbXBvbmVudDogdGhpcy5QcmVqb2luUGFnZSxcbiAgICAgIGluamVjdG9yOiB0aGlzLmNyZWF0ZUluamVjdG9yKHtcbiAgICAgICAgcGFyYW1ldGVyczoge1xuICAgICAgICAgIHNob3dBbGVydDpcbiAgICAgICAgICAgIHRoaXMuc2hvd0FsZXJ0IHx8XG4gICAgICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc2hvd0FsZXJ0IG5vdCBkZWZpbmVkJyk7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICB1cGRhdGVJc0xvYWRpbmdNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNMb2FkaW5nTW9kYWxWaXNpYmxlLFxuICAgICAgICAgIGNvbm5lY3RTb2NrZXQ6IHRoaXMuc29ja2V0TWFuYWdlci5jb25uZWN0U29ja2V0LFxuICAgICAgICAgIHVwZGF0ZVNvY2tldDogdGhpcy51cGRhdGVTb2NrZXQsXG4gICAgICAgICAgdXBkYXRlVmFsaWRhdGVkOiB0aGlzLnVwZGF0ZVZhbGlkYXRlZCxcbiAgICAgICAgICB1cGRhdGVBcGlVc2VyTmFtZTogdGhpcy51cGRhdGVBcGlVc2VyTmFtZSxcbiAgICAgICAgICB1cGRhdGVBcGlUb2tlbjogdGhpcy51cGRhdGVBcGlUb2tlbixcbiAgICAgICAgICB1cGRhdGVMaW5rOiB0aGlzLnVwZGF0ZUxpbmssXG4gICAgICAgICAgdXBkYXRlUm9vbU5hbWU6IHRoaXMudXBkYXRlUm9vbU5hbWUsXG4gICAgICAgICAgdXBkYXRlTWVtYmVyOiB0aGlzLnVwZGF0ZU1lbWJlcixcbiAgICAgICAgfSxcbiAgICAgICAgY3JlZGVudGlhbHM6IHRoaXMuY3JlZGVudGlhbHMsXG4gICAgICB9KSxcbiAgICB9O1xuXG4gICAgdGhpcy5QcmVqb2luUGFnZUNvbXBvbmVudCA9IHsgLi4uUHJlam9pbkNvbXAgfTtcblxuICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgfTtcblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5QcmVqb2luUGFnZSkge1xuICAgICAgdGhpcy51cGRhdGVQcmVqb2luUGFnZUNvbXBvbmVudCgpO1xuICAgIH1cblxuICAgIHRoaXMuc2V0dXBSZXNpemVMaXN0ZW5lcigpO1xuICAgIGlmICh0aGlzLnZhbGlkYXRlZCkge1xuICAgICAgdGhpcy5jb25uZWN0QW5kQWRkU29ja2V0TWV0aG9kcygpO1xuICAgIH1cblxuICAgIHRoaXMubWFpbkhlaWdodFdpZHRoU3Vic2NyaXB0aW9uID0gdGhpcy5tYWluSGVpZ2h0V2lkdGguc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMudXBkYXRlTWFpblZpZGVvU2l6ZSgpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5yZWNvcmRpbmdTdWJzY3JpcHRpb24gPSBjb21iaW5lTGF0ZXN0KFtcbiAgICAgIHRoaXMucmVjb3JkUGF1c2VkLFxuICAgICAgdGhpcy5yZWNvcmRTdGFydGVkLFxuICAgICAgdGhpcy5yZWNvcmRTdG9wcGVkLFxuICAgICAgdGhpcy5yZWNvcmRSZXN1bWVkLFxuICAgICAgdGhpcy5yZWNvcmRpbmdQcm9ncmVzc1RpbWUsXG4gICAgICB0aGlzLnNob3dSZWNvcmRCdXR0b25zLFxuICAgICAgdGhpcy5pc2xldmVsLFxuICAgIF0pLnN1YnNjcmliZShcbiAgICAgIChbXG4gICAgICAgIHJlY29yZFBhdXNlZCxcbiAgICAgICAgcmVjb3JkU3RhcnRlZCxcbiAgICAgICAgcmVjb3JkU3RvcHBlZCxcbiAgICAgICAgcmVjb3JkUmVzdW1lZCxcbiAgICAgICAgcmVjb3JkaW5nUHJvZ3Jlc3NUaW1lLFxuICAgICAgICBzaG93UmVjb3JkQnV0dG9ucyxcbiAgICAgICAgaXNsZXZlbCxcbiAgICAgIF0pID0+IHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHJlY29yZFBhdXNlZCB8fFxuICAgICAgICAgIHJlY29yZFN0YXJ0ZWQgfHxcbiAgICAgICAgICByZWNvcmRTdG9wcGVkIHx8XG4gICAgICAgICAgcmVjb3JkUmVzdW1lZCB8fFxuICAgICAgICAgIHJlY29yZGluZ1Byb2dyZXNzVGltZSB8fFxuICAgICAgICAgIHNob3dSZWNvcmRCdXR0b25zIHx8XG4gICAgICAgICAgaXNsZXZlbFxuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLnVwZGF0ZVJlY29yZEJ1dHRvbnMoKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICApO1xuXG4gICAgdGhpcy5TY3JlZW5ib2FyZFN1YnNjcmlwdGlvbiA9IGNvbWJpbmVMYXRlc3QoW1xuICAgICAgdGhpcy5zaGFyZWQsXG4gICAgICB0aGlzLmNvbXBvbmVudFNpemVzLFxuICAgICAgdGhpcy5hbm5vdGF0ZVNjcmVlblN0cmVhbSxcbiAgICBdKS5zdWJzY3JpYmUoKFtzaGFyZWQsIGNvbXBvbmVudFNpemVzXSkgPT4ge1xuICAgICAgdGhpcy5TY3JlZW5ib2FyZFdpZGdldCA9IHtcbiAgICAgICAgY29tcG9uZW50OiBTY3JlZW5ib2FyZCxcbiAgICAgICAgaW5wdXRzOiB7XG4gICAgICAgICAgY3VzdG9tV2lkdGg6IGNvbXBvbmVudFNpemVzLm1haW5XaWR0aCxcbiAgICAgICAgICBjdXN0b21IZWlnaHQ6IGNvbXBvbmVudFNpemVzLm1haW5IZWlnaHQsXG4gICAgICAgICAgcGFyYW1ldGVyczogdGhpcy5tZWRpYVNGVVBhcmFtZXRlcnMsXG4gICAgICAgICAgc2hvd0FzcGVjdDogc2hhcmVkLFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICB9KTtcbiAgICB0aGlzLnZhbGlkYXRlZFN1YnNjcmlwdGlvbiA9IHRoaXMudmFsaWRhdGVkLnN1YnNjcmliZSgodmFsaWRhdGVkKSA9PiB7XG4gICAgICBpZiAodmFsaWRhdGVkKSB7XG4gICAgICAgIHRoaXMuaGFuZGxlVmFsaWRhdGVkKCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5pc2xldmVsU3Vic2NyaXB0aW9uID0gdGhpcy5pc2xldmVsLnN1YnNjcmliZSgoaXNsZXZlbCkgPT4ge1xuICAgICAgaWYgKGlzbGV2ZWwpIHtcbiAgICAgICAgdGhpcy51cGRhdGVDdXN0b21NZW51QnV0dG9ucygpO1xuICAgICAgICB0aGlzLnVwZGF0ZUNvbnRyb2xCcm9hZGNhc3RCdXR0b25zKCk7XG4gICAgICAgIHRoaXMudXBkYXRlQ29udHJvbENoYXRCdXR0b25zKCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5jb0hvc3RTdWJzY3JpcHRpb24gPSBjb21iaW5lTGF0ZXN0KFt0aGlzLmNvSG9zdCwgdGhpcy5jb0hvc3RSZXNwb25zaWJpbGl0eV0pLnN1YnNjcmliZShcbiAgICAgIChbY29Ib3N0LCBjb0hvc3RSZXNwb25zaWJpbGl0eV0pID0+IHtcbiAgICAgICAgaWYgKGNvSG9zdCB8fCBjb0hvc3RSZXNwb25zaWJpbGl0eSkge1xuICAgICAgICAgIHRoaXMudXBkYXRlQ3VzdG9tTWVudUJ1dHRvbnMoKTtcbiAgICAgICAgICB0aGlzLnVwZGF0ZUNvbnRyb2xCcm9hZGNhc3RCdXR0b25zKCk7XG4gICAgICAgICAgdGhpcy51cGRhdGVDb250cm9sQ2hhdEJ1dHRvbnMoKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICApO1xuXG4gICAgLy8gU3Vic2NyaWJlIHRvIGNoYW5nZXMgaW4gQmVoYXZpb3JTdWJqZWN0IGFuZCB1cGRhdGUgdGhlIGJ1dHRvbnMgYWNjb3JkaW5nbHlcbiAgICB0aGlzLmJ1dHRvblN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMubWljQWN0aXZlLnN1YnNjcmliZSgodmFsdWUpID0+IHtcbiAgICAgICAgdGhpcy51cGRhdGVCdXR0b25TdGF0ZSgnbWljQWN0aXZlJywgdmFsdWUpO1xuICAgICAgICB0aGlzLnVwZGF0ZUNvbnRyb2xCcm9hZGNhc3RCdXR0b25zKCk7XG4gICAgICAgIHRoaXMudXBkYXRlQ29udHJvbENoYXRCdXR0b25zKCk7XG4gICAgICB9KSxcbiAgICApO1xuXG4gICAgdGhpcy5idXR0b25TdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLnZpZGVvQWN0aXZlLnN1YnNjcmliZSgodmFsdWUpID0+IHtcbiAgICAgICAgdGhpcy51cGRhdGVCdXR0b25TdGF0ZSgndmlkZW9BY3RpdmUnLCB2YWx1ZSk7XG4gICAgICAgIHRoaXMudXBkYXRlQ29udHJvbEJyb2FkY2FzdEJ1dHRvbnMoKTtcbiAgICAgICAgdGhpcy51cGRhdGVDb250cm9sQ2hhdEJ1dHRvbnMoKTtcbiAgICAgIH0pLFxuICAgICk7XG5cbiAgICB0aGlzLmJ1dHRvblN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMuc2NyZWVuU2hhcmVBY3RpdmUuc3Vic2NyaWJlKCh2YWx1ZSkgPT4ge1xuICAgICAgICB0aGlzLnVwZGF0ZUJ1dHRvblN0YXRlKCdzY3JlZW5TaGFyZUFjdGl2ZScsIHZhbHVlKTtcbiAgICAgIH0pLFxuICAgICk7XG5cbiAgICB0aGlzLmJ1dHRvblN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMuc2hvd01lc3NhZ2VzQmFkZ2Uuc3Vic2NyaWJlKCh2YWx1ZSkgPT4ge1xuICAgICAgICB0aGlzLnVwZGF0ZUJ1dHRvblN0YXRlKCdzaG93TWVzc2FnZXNCYWRnZScsIHZhbHVlKTtcbiAgICAgIH0pLFxuICAgICk7XG5cbiAgICB0aGlzLmJ1dHRvblN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMudG90YWxSZXFXYWl0LnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMudXBkYXRlQnV0dG9uU3RhdGUoJ3Nob3dNZW51QmFkZ2UnLCB0cnVlKTtcbiAgICAgIH0pLFxuICAgICk7XG5cbiAgICB0aGlzLmJ1dHRvblN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMucGFydGljaXBhbnRzQ291bnRlci5zdWJzY3JpYmUoKHZhbHVlKSA9PiB7XG4gICAgICAgIHRoaXMudXBkYXRlTWVudVBhcnRpY2lwYW50c1dpZGdldCh2YWx1ZSk7XG4gICAgICB9KSxcbiAgICApO1xuXG4gICAgdGhpcy5tZWRpYVNGVVBhcmFtZXRlcnMgPSB7XG4gICAgICAuLi50aGlzLmdldEFsbFBhcmFtcygpLFxuICAgICAgLi4udGhpcy5tZWRpYVNGVUZ1bmN0aW9ucygpLFxuICAgIH07XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5oYW5kbGVSZXNpemUpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdvcmllbnRhdGlvbmNoYW5nZScsIHRoaXMuaGFuZGxlUmVzaXplKTtcbiAgICBpZiAodGhpcy5tYWluSGVpZ2h0V2lkdGhTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMubWFpbkhlaWdodFdpZHRoU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnZhbGlkYXRlZFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy52YWxpZGF0ZWRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuaXNsZXZlbFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5pc2xldmVsU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLmNvSG9zdFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5jb0hvc3RTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuU2NyZWVuYm9hcmRTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuU2NyZWVuYm9hcmRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucmVjb3JkaW5nU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnJlY29yZGluZ1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZU1haW5WaWRlb1NpemUgPSBhc3luYyAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLmxvY2tfc2NyZWVuLnZhbHVlICYmICF0aGlzLnNoYXJlZC52YWx1ZSkge1xuICAgICAgdGhpcy5wcmVwb3B1bGF0ZVVzZXJNZWRpYS5wcmVwb3B1bGF0ZVVzZXJNZWRpYSh7XG4gICAgICAgIG5hbWU6IHRoaXMuaG9zdExhYmVsLnZhbHVlLFxuICAgICAgICBwYXJhbWV0ZXJzOiB7IC4uLnRoaXMuZ2V0QWxsUGFyYW1zKCksIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSB9LFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghdGhpcy5maXJzdF9yb3VuZC52YWx1ZSkge1xuICAgICAgICB0aGlzLnByZXBvcHVsYXRlVXNlck1lZGlhLnByZXBvcHVsYXRlVXNlck1lZGlhKHtcbiAgICAgICAgICBuYW1lOiB0aGlzLmhvc3RMYWJlbC52YWx1ZSxcbiAgICAgICAgICBwYXJhbWV0ZXJzOiB7IC4uLnRoaXMuZ2V0QWxsUGFyYW1zKCksIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSB9LFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgYXN5bmMgY29ubmVjdEFuZEFkZFNvY2tldE1ldGhvZHMoKSB7XG4gICAgdGhpcy5tZWRpYVNGVVBhcmFtZXRlcnMgPSB7XG4gICAgICAuLi50aGlzLmdldEFsbFBhcmFtcygpLFxuICAgICAgLi4udGhpcy5tZWRpYVNGVUZ1bmN0aW9ucygpLFxuICAgIH07XG4gICAgY29uc3Qgc29ja2V0XyA9IGF3YWl0IHRoaXMuY29ubmVjdF9Tb2NrZXQodGhpcy5hcGlVc2VyTmFtZS52YWx1ZSwgJycsIHRoaXMuYXBpVG9rZW4udmFsdWUpO1xuICAgIGlmIChzb2NrZXRfKSB7XG4gICAgICB0aGlzLnVwZGF0ZVNvY2tldChzb2NrZXRfKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBoYW5kbGVWYWxpZGF0ZWQoKSB7XG4gICAgdGhpcy51cGRhdGVBbGxWaWRlb1N0cmVhbXMoW1xuICAgICAgeyBwcm9kdWNlcklkOiAneW91eW91Jywgc3RyZWFtOiB1bmRlZmluZWQsIGlkOiAneW91eW91JywgbmFtZTogJ3lvdXlvdScgfSxcbiAgICBdKTtcblxuICAgIHRoaXMudXBkYXRlU3RyZWFtTmFtZXMoW3sgaWQ6ICd5b3V5b3UnLCBuYW1lOiAneW91eW91JywgcHJvZHVjZXJJZDogJycgfV0pO1xuXG4gICAgaWYgKHRoaXMudmFsaWRhdGVkLnZhbHVlKSB7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICghdGhpcy5sb2NhbFVJTW9kZS52YWx1ZSkge1xuICAgICAgICAgIGF3YWl0IHRoaXMuY29ubmVjdEFuZEFkZFNvY2tldE1ldGhvZHMoKTtcbiAgICAgICAgICB0aGlzLnVwZGF0ZUlzTG9hZGluZ01vZGFsVmlzaWJsZSh0cnVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnVwZGF0ZUlzTG9hZGluZ01vZGFsVmlzaWJsZShmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdlcnJvciBjb25uZWN0QW5kYUFkZFNvY2tldE1ldGhvZHMnLCBlcnJvcik7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc3RhcnRNZWV0aW5nUHJvZ3Jlc3NUaW1lci5zdGFydE1lZXRpbmdQcm9ncmVzc1RpbWVyKHtcbiAgICAgICAgc3RhcnRUaW1lOiBEYXRlLm5vdygpIC8gMTAwMCxcbiAgICAgICAgcGFyYW1ldGVyczogeyAuLi50aGlzLmdldEFsbFBhcmFtcygpLCAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCkgfSxcbiAgICAgIH0pO1xuXG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScpXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpvcmllbnRhdGlvbmNoYW5nZScpXG4gIGFzeW5jIGhhbmRsZVJlc2l6ZSgpIHtcbiAgICBsZXQgZnJhY3Rpb24gPSAwO1xuXG4gICAgaWYgKFxuICAgICAgd2luZG93LmlubmVySGVpZ2h0IDwgd2luZG93LmlubmVyV2lkdGggJiZcbiAgICAgICh0aGlzLmV2ZW50VHlwZS52YWx1ZSA9PSAnd2ViaW5hcicgfHwgdGhpcy5ldmVudFR5cGUudmFsdWUgPT0gJ2NvbmZlcmVuY2UnKVxuICAgICkge1xuICAgICAgY29uc3QgY3VycmVudEhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgIGZyYWN0aW9uID0gTnVtYmVyKCg0MCAvIGN1cnJlbnRIZWlnaHQpLnRvRml4ZWQoMykpO1xuICAgICAgaWYgKGZyYWN0aW9uICE9IHRoaXMuY29udHJvbEhlaWdodC52YWx1ZSkge1xuICAgICAgICB0aGlzLnVwZGF0ZUNvbnRyb2xIZWlnaHQoTnVtYmVyKGZyYWN0aW9uKSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFNldCBkZWZhdWx0IGNvbnRyb2wgYnV0dG9uIGhlaWdodCBmb3IgcG9ydHJhaXQgbW9kZSBvciBvdGhlciBldmVudCB0eXBlc1xuICAgICAgY29uc3QgY3VycmVudEhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgIGZyYWN0aW9uID0gTnVtYmVyKCg0MCAvIGN1cnJlbnRIZWlnaHQpLnRvRml4ZWQoMykpO1xuICAgICAgZnJhY3Rpb24gPSBOdW1iZXIoZnJhY3Rpb24pO1xuICAgICAgaWYgKGZyYWN0aW9uICE9IHRoaXMuY29udHJvbEhlaWdodC52YWx1ZSkge1xuICAgICAgICB0aGlzLnVwZGF0ZUNvbnRyb2xIZWlnaHQoTnVtYmVyKGZyYWN0aW9uKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgZGltZW5zaW9ucyA9IHRoaXMuY29tcHV0ZURpbWVuc2lvbnNNZXRob2Qoe1xuICAgICAgY29udGFpbmVyV2lkdGhGcmFjdGlvbjogMSxcbiAgICAgIGNvbnRhaW5lckhlaWdodEZyYWN0aW9uOiAxLFxuICAgICAgbWFpblNpemU6IHRoaXMubWFpbkhlaWdodFdpZHRoLnZhbHVlLFxuICAgICAgZG9TdGFjazogdHJ1ZSxcbiAgICAgIGRlZmF1bHRGcmFjdGlvbjpcbiAgICAgICAgdGhpcy5ldmVudFR5cGUudmFsdWUgPT0gJ3dlYmluYXInIHx8IHRoaXMuZXZlbnRUeXBlLnZhbHVlID09ICdjb25mZXJlbmNlJ1xuICAgICAgICAgID8gMSAtIGZyYWN0aW9uXG4gICAgICAgICAgOiAxLFxuICAgIH0pO1xuXG4gICAgdGhpcy51cGRhdGVDb21wb25lbnRTaXplcyhkaW1lbnNpb25zKTtcblxuICAgIGNvbnN0IG9yaWVudGF0aW9uID0gdGhpcy5jaGVja09yaWVudGF0aW9uKCk7XG4gICAgaWYgKG9yaWVudGF0aW9uID09ICdwb3J0cmFpdCcpIHtcbiAgICAgIGlmICghdGhpcy5pc1dpZGVTY3JlZW4udmFsdWUpIHtcbiAgICAgICAgaWYgKHRoaXMuc2hhcmVTY3JlZW5TdGFydGVkLnZhbHVlIHx8IHRoaXMuc2hhcmVkLnZhbHVlKSB7XG4gICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5Gb3JjZUZ1bGxEaXNwbGF5KHRydWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gVXBkYXRlcyB0aGUgbWFpbiBncmlkIHZpZXdcbiAgICBhd2FpdCB0aGlzLnByZXBvcHVsYXRlVXNlck1lZGlhLnByZXBvcHVsYXRlVXNlck1lZGlhKHtcbiAgICAgIG5hbWU6IHRoaXMuaG9zdExhYmVsLnZhbHVlLFxuICAgICAgcGFyYW1ldGVyczogeyAuLi50aGlzLmdldEFsbFBhcmFtcygpLCAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCkgfSxcbiAgICB9KTtcbiAgICAvLyBVcGRhdGVzIHRoZSBtaW5pIGdyaWQgdmlld1xuICAgIGF3YWl0IHRoaXMub25TY3JlZW5DaGFuZ2VzLm9uU2NyZWVuQ2hhbmdlcyh7XG4gICAgICBjaGFuZ2VkOiB0cnVlLFxuICAgICAgcGFyYW1ldGVyczogeyAuLi50aGlzLmdldEFsbFBhcmFtcygpLCAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCkgfSxcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIGRpc2Nvbm5lY3RBbGxTb2NrZXRzKGNvbnN1bWVfc29ja2V0czogQ29uc3VtZVNvY2tldFtdKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgZm9yIChjb25zdCBzb2NrZXQgb2YgY29uc3VtZV9zb2NrZXRzKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBpcCA9IE9iamVjdC5rZXlzKHNvY2tldClbMF07XG4gICAgICAgIGF3YWl0IHNvY2tldFtpcF0uZGlzY29ubmVjdCgpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5sb2coYEVycm9yIGRpc2Nvbm5lY3Rpbmcgc29ja2V0IHdpdGggSVA6ICR7T2JqZWN0LmtleXMoc29ja2V0KVswXX1gLCBlcnJvcik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgY2xvc2VBbmRSZXNldCgpIHtcbiAgICAvL2Nsb3NlIGFuZCBjbGVhbiB1cCBhbGwgc29ja2V0cywgbW9kYWxzLC4uLiBhbmQgcmVzZXQgYWxsIHN0YXRlcyB0byBpbml0aWFsIHZhbHVlc1xuXG4gICAgdGhpcy51cGRhdGVJc01lc3NhZ2VzTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgICB0aGlzLnVwZGF0ZUlzUGFydGljaXBhbnRzTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgICB0aGlzLnVwZGF0ZUlzV2FpdGluZ01vZGFsVmlzaWJsZShmYWxzZSk7XG4gICAgdGhpcy51cGRhdGVJc1JlcXVlc3RzTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgICB0aGlzLnVwZGF0ZUlzQ29Ib3N0TW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgICB0aGlzLnVwZGF0ZUlzU2V0dGluZ3NNb2RhbFZpc2libGUoZmFsc2UpO1xuICAgIHRoaXMudXBkYXRlSXNEaXNwbGF5U2V0dGluZ3NNb2RhbFZpc2libGUoZmFsc2UpO1xuICAgIHRoaXMudXBkYXRlSXNNZWRpYVNldHRpbmdzTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgICB0aGlzLnVwZGF0ZUlzTWVudU1vZGFsVmlzaWJsZShmYWxzZSk7XG4gICAgdGhpcy51cGRhdGVJc1NoYXJlRXZlbnRNb2RhbFZpc2libGUoZmFsc2UpO1xuICAgIHRoaXMudXBkYXRlSXNDb25maXJtRXhpdE1vZGFsVmlzaWJsZShmYWxzZSk7XG4gICAgYXdhaXQgdGhpcy5kaXNjb25uZWN0QWxsU29ja2V0cyh0aGlzLmNvbnN1bWVfc29ja2V0cy52YWx1ZSk7XG4gICAgYXdhaXQgdGhpcy51cGRhdGVTdGF0ZXNUb0luaXRpYWxWYWx1ZXMoKTtcbiAgICB0aGlzLnVwZGF0ZU1lZXRpbmdQcm9ncmVzc1RpbWUoJzAwOjAwOjAwJyk7XG4gICAgdGhpcy51cGRhdGVNZWV0aW5nRWxhcHNlZFRpbWUoMCk7XG4gICAgdGhpcy51cGRhdGVSZWNvcmRpbmdQcm9ncmVzc1RpbWUoJzAwOjAwOjAwJyk7XG4gICAgdGhpcy51cGRhdGVSZWNvcmRFbGFwc2VkVGltZSgwKTtcbiAgICB0aGlzLnVwZGF0ZVNob3dSZWNvcmRCdXR0b25zKGZhbHNlKTtcblxuICAgIHRoaXMudXBkYXRlSXNDb25maWd1cmVXaGl0ZWJvYXJkTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgICB0aGlzLnVwZGF0ZUlzV2hpdGVib2FyZE1vZGFsVmlzaWJsZShmYWxzZSk7XG4gICAgdGhpcy51cGRhdGVJc01lbnVNb2RhbFZpc2libGUoZmFsc2UpO1xuICAgIHRoaXMudXBkYXRlSXNSZWNvcmRpbmdNb2RhbFZpc2libGUoZmFsc2UpO1xuICAgIHRoaXMudXBkYXRlSXNQb2xsTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgICB0aGlzLnVwZGF0ZUlzQnJlYWtvdXRSb29tc01vZGFsVmlzaWJsZShmYWxzZSk7XG4gICAgdGhpcy51cGRhdGVJc0JhY2tncm91bmRNb2RhbFZpc2libGUoZmFsc2UpO1xuICAgIHRoaXMudXBkYXRlSXNMb2FkaW5nTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgICB0aGlzLnVwZGF0ZUlzQ29uZmlybUhlcmVNb2RhbFZpc2libGUoZmFsc2UpO1xuXG4gICAgYXdhaXQgc2xlZXAoeyBtczogNTAwIH0pO1xuICAgIHRoaXMudXBkYXRlVmFsaWRhdGVkKGZhbHNlKTtcbiAgICAvL2lmIG9uIHdlYiwgcmVsb2FkIHRoZSBwYWdlXG4gICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICB9XG5cbiAgY29tcHV0ZURpbWVuc2lvbnNNZXRob2QgPSAoe1xuICAgIGNvbnRhaW5lcldpZHRoRnJhY3Rpb24gPSAxLFxuICAgIGNvbnRhaW5lckhlaWdodEZyYWN0aW9uID0gMSxcbiAgICBtYWluU2l6ZSxcbiAgICBkb1N0YWNrID0gdHJ1ZSxcbiAgICBkZWZhdWx0RnJhY3Rpb24sXG4gIH06IHtcbiAgICBjb250YWluZXJXaWR0aEZyYWN0aW9uPzogbnVtYmVyO1xuICAgIGNvbnRhaW5lckhlaWdodEZyYWN0aW9uPzogbnVtYmVyO1xuICAgIG1haW5TaXplOiBudW1iZXI7XG4gICAgZG9TdGFjaz86IGJvb2xlYW47XG4gICAgZGVmYXVsdEZyYWN0aW9uOiBudW1iZXI7XG4gIH0pOiBDb21wb25lbnRTaXplcyA9PiB7XG4gICAgY29uc3QgcGFyZW50V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCAqIGNvbnRhaW5lcldpZHRoRnJhY3Rpb247XG4gICAgY29uc3QgcGFyZW50SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0ICogY29udGFpbmVySGVpZ2h0RnJhY3Rpb24gKiBkZWZhdWx0RnJhY3Rpb247XG4gICAgbGV0IGlzV2lkZVNjcmVlbiA9IHBhcmVudFdpZHRoID49IDc2ODtcblxuICAgIGlmICghaXNXaWRlU2NyZWVuICYmIHBhcmVudFdpZHRoID4gMS41ICogcGFyZW50SGVpZ2h0KSB7XG4gICAgICBpc1dpZGVTY3JlZW4gPSB0cnVlO1xuICAgIH1cblxuICAgIHRoaXMudXBkYXRlSXNXaWRlU2NyZWVuKGlzV2lkZVNjcmVlbik7XG5cbiAgICBjb25zdCBkaW1lbnNpb25zID0gdGhpcy5jYWxjdWxhdGVEaW1lbnNpb25zKHtcbiAgICAgIHBhcmVudFdpZHRoLFxuICAgICAgcGFyZW50SGVpZ2h0LFxuICAgICAgaXNXaWRlU2NyZWVuLFxuICAgICAgbWFpblNpemUsXG4gICAgICBkb1N0YWNrLFxuICAgIH0pO1xuICAgIHJldHVybiBkaW1lbnNpb25zO1xuICB9O1xuXG4gIGNhbGN1bGF0ZURpbWVuc2lvbnMoe1xuICAgIHBhcmVudFdpZHRoLFxuICAgIHBhcmVudEhlaWdodCxcbiAgICBpc1dpZGVTY3JlZW4sXG4gICAgbWFpblNpemUsXG4gICAgZG9TdGFjayxcbiAgfToge1xuICAgIHBhcmVudFdpZHRoOiBudW1iZXI7XG4gICAgcGFyZW50SGVpZ2h0OiBudW1iZXI7XG4gICAgaXNXaWRlU2NyZWVuOiBib29sZWFuO1xuICAgIG1haW5TaXplOiBudW1iZXI7XG4gICAgZG9TdGFjazogYm9vbGVhbjtcbiAgfSk6IENvbXBvbmVudFNpemVzIHtcbiAgICBpZiAoZG9TdGFjaykge1xuICAgICAgcmV0dXJuIGlzV2lkZVNjcmVlblxuICAgICAgICA/IHtcbiAgICAgICAgICAgIG1haW5IZWlnaHQ6IE1hdGguZmxvb3IocGFyZW50SGVpZ2h0KSxcbiAgICAgICAgICAgIG90aGVySGVpZ2h0OiBNYXRoLmZsb29yKHBhcmVudEhlaWdodCksXG4gICAgICAgICAgICBtYWluV2lkdGg6IE1hdGguZmxvb3IoKG1haW5TaXplIC8gMTAwKSAqIHBhcmVudFdpZHRoKSxcbiAgICAgICAgICAgIG90aGVyV2lkdGg6IE1hdGguZmxvb3IoKCgxMDAgLSBtYWluU2l6ZSkgLyAxMDApICogcGFyZW50V2lkdGgpLFxuICAgICAgICAgIH1cbiAgICAgICAgOiB7XG4gICAgICAgICAgICBtYWluSGVpZ2h0OiBNYXRoLmZsb29yKChtYWluU2l6ZSAvIDEwMCkgKiBwYXJlbnRIZWlnaHQpLFxuICAgICAgICAgICAgb3RoZXJIZWlnaHQ6IE1hdGguZmxvb3IoKCgxMDAgLSBtYWluU2l6ZSkgLyAxMDApICogcGFyZW50SGVpZ2h0KSxcbiAgICAgICAgICAgIG1haW5XaWR0aDogTWF0aC5mbG9vcihwYXJlbnRXaWR0aCksXG4gICAgICAgICAgICBvdGhlcldpZHRoOiBNYXRoLmZsb29yKHBhcmVudFdpZHRoKSxcbiAgICAgICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBtYWluSGVpZ2h0OiBNYXRoLmZsb29yKHBhcmVudEhlaWdodCksXG4gICAgICAgIG90aGVySGVpZ2h0OiBNYXRoLmZsb29yKHBhcmVudEhlaWdodCksXG4gICAgICAgIG1haW5XaWR0aDogTWF0aC5mbG9vcihwYXJlbnRXaWR0aCksXG4gICAgICAgIG90aGVyV2lkdGg6IE1hdGguZmxvb3IocGFyZW50V2lkdGgpLFxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVPcmllbnRhdGlvbkNoYW5nZSgpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5oYW5kbGVSZXNpemUuYmluZCh0aGlzKSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ29yaWVudGF0aW9uY2hhbmdlJywgdGhpcy5oYW5kbGVSZXNpemUuYmluZCh0aGlzKSk7XG4gIH1cblxuICBzZXR1cFJlc2l6ZUxpc3RlbmVyKCkge1xuICAgIHRoaXMuaGFuZGxlUmVzaXplKCk7XG4gIH1cblxuICBvcmllbnRhdGlvbiA9IHdpbmRvdy5pbm5lckhlaWdodCA+IHdpbmRvdy5pbm5lcldpZHRoID8gJ3BvcnRyYWl0JyA6ICdsYW5kc2NhcGUnO1xuXG4gIGFzeW5jIGpvaW5Sb29tKGRhdGE6IHtcbiAgICBzb2NrZXQ6IFNvY2tldDtcbiAgICByb29tTmFtZTogc3RyaW5nO1xuICAgIGlzbGV2ZWw6IHN0cmluZztcbiAgICBtZW1iZXI6IHN0cmluZztcbiAgICBzZWM6IHN0cmluZztcbiAgICBhcGlVc2VyTmFtZTogc3RyaW5nO1xuICB9KTogUHJvbWlzZTxSZXNwb25zZUpvaW5Sb29tIHwgbnVsbD4ge1xuICAgIGNvbnN0IHsgc29ja2V0LCByb29tTmFtZSwgaXNsZXZlbCwgbWVtYmVyLCBzZWMsIGFwaVVzZXJOYW1lIH0gPSBkYXRhO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlOiBSZXNwb25zZUpvaW5Sb29tIHwgbnVsbCA9IGF3YWl0IHRoaXMuam9pblJvb21DbGllbnQuam9pblJvb21DbGllbnQoe1xuICAgICAgICBzb2NrZXQsXG4gICAgICAgIHJvb21OYW1lLFxuICAgICAgICBpc2xldmVsLFxuICAgICAgICBtZW1iZXIsXG4gICAgICAgIHNlYyxcbiAgICAgICAgYXBpVXNlck5hbWUsXG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZygnRXJyb3Igam9pbmluZyByb29tOicsIGVycm9yKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIGpvaW4gdGhlIHJvb20uIFBsZWFzZSBjaGVjayB5b3VyIGNvbm5lY3Rpb24gYW5kIHRyeSBhZ2Fpbi4nKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBqb2luX1Jvb20oe1xuICAgIHNvY2tldCxcbiAgICByb29tTmFtZSxcbiAgICBpc2xldmVsLFxuICAgIG1lbWJlcixcbiAgICBzZWMsXG4gICAgYXBpVXNlck5hbWUsXG4gIH06IHtcbiAgICBzb2NrZXQ6IFNvY2tldDtcbiAgICByb29tTmFtZTogc3RyaW5nO1xuICAgIGlzbGV2ZWw6IHN0cmluZztcbiAgICBtZW1iZXI6IHN0cmluZztcbiAgICBzZWM6IHN0cmluZztcbiAgICBhcGlVc2VyTmFtZTogc3RyaW5nO1xuICB9KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgZGF0YTogUmVzcG9uc2VKb2luUm9vbSB8IG51bGwgPSBhd2FpdCB0aGlzLmpvaW5Sb29tKHtcbiAgICAgIHNvY2tldDogc29ja2V0LFxuICAgICAgcm9vbU5hbWU6IHJvb21OYW1lLFxuICAgICAgaXNsZXZlbDogaXNsZXZlbCxcbiAgICAgIG1lbWJlcjogbWVtYmVyLFxuICAgICAgc2VjOiBzZWMsXG4gICAgICBhcGlVc2VyTmFtZTogYXBpVXNlck5hbWUsXG4gICAgfSk7XG5cbiAgICBpZiAoZGF0YSAmJiBkYXRhLnN1Y2Nlc3MpIHtcbiAgICAgIHRoaXMucm9vbURhdGEubmV4dChkYXRhKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy51cGRhdGVSb29tUGFyYW1ldGVyc0NsaWVudC51cGRhdGVSb29tUGFyYW1ldGVyc0NsaWVudCh7XG4gICAgICAgICAgcGFyYW1ldGVyczoge1xuICAgICAgICAgICAgLi4udGhpcy5nZXRBbGxQYXJhbXMoKSxcbiAgICAgICAgICAgIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSxcbiAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGRhdGEuaXNIb3N0KSB7XG4gICAgICAgICAgdGhpcy51cGRhdGVJc2xldmVsKCcyJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy51cGRhdGVJc2xldmVsKCcxJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGF0YS5zZWN1cmVDb2RlKSB7XG4gICAgICAgICAgdGhpcy51cGRhdGVBZG1pblBhc3Njb2RlKGRhdGEuc2VjdXJlQ29kZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGF0YS5ydHBDYXBhYmlsaXRpZXMpIHtcbiAgICAgICAgICBjb25zdCBkZXZpY2VfID0gYXdhaXQgdGhpcy5jcmVhdGVEZXZpY2VDbGllbnQuY3JlYXRlRGV2aWNlQ2xpZW50KHtcbiAgICAgICAgICAgIHJ0cENhcGFiaWxpdGllczogZGF0YS5ydHBDYXBhYmlsaXRpZXMsXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpZiAoZGV2aWNlXykge1xuICAgICAgICAgICAgdGhpcy5kZXZpY2UubmV4dChkZXZpY2VfKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2gge1xuICAgICAgICAvKiBoYW5kbGUgZXJyb3IgKi9cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy51cGRhdGVWYWxpZGF0ZWQoZmFsc2UpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKHRoaXMuc2hvd0FsZXJ0ICYmIGRhdGE/LnJlYXNvbikge1xuICAgICAgICAgIHRoaXMuc2hvd0FsZXJ0KHsgbWVzc2FnZTogZGF0YT8ucmVhc29uLCB0eXBlOiAnZGFuZ2VyJywgZHVyYXRpb246IDMwMDAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2gge1xuICAgICAgICAvKiBoYW5kbGUgZXJyb3IgKi9cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvblBhcnRpY2lwYW50c0ZpbHRlckNoYW5nZSA9ICh2YWx1ZTogc3RyaW5nKTogdm9pZCA9PiB7XG4gICAgaWYgKHZhbHVlICYmIHZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuZmlsdGVyZWRQYXJ0aWNpcGFudHMubmV4dChcbiAgICAgICAgdGhpcy5wYXJ0aWNpcGFudHMudmFsdWUuZmlsdGVyKChwYXJ0aWNpcGFudCkgPT5cbiAgICAgICAgICBwYXJ0aWNpcGFudC5uYW1lLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXModmFsdWUudG9Mb3dlckNhc2UoKSksXG4gICAgICAgICksXG4gICAgICApO1xuICAgICAgdGhpcy5wYXJ0aWNpcGFudHNDb3VudGVyLm5leHQodGhpcy5maWx0ZXJlZFBhcnRpY2lwYW50cy52YWx1ZS5sZW5ndGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmZpbHRlcmVkUGFydGljaXBhbnRzLm5leHQodGhpcy5wYXJ0aWNpcGFudHMudmFsdWUpO1xuICAgICAgdGhpcy5wYXJ0aWNpcGFudHNDb3VudGVyLm5leHQodGhpcy5wYXJ0aWNpcGFudHMudmFsdWUubGVuZ3RoKTtcbiAgICB9XG4gIH07XG5cbiAgdXBkYXRlU3RhdGVzVG9Jbml0aWFsVmFsdWVzID0gYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IGluaXRpYWxWYWx1ZXMgPSBpbml0aWFsVmFsdWVzU3RhdGUgYXMgeyBba2V5OiBzdHJpbmddOiBhbnkgfTtcbiAgICBjb25zdCB1cGRhdGVGdW5jdGlvbnMgPSB0aGlzLmdldEFsbFBhcmFtcygpIGFzIHVua25vd24gYXMge1xuICAgICAgW2tleTogc3RyaW5nXTogKHZhbHVlOiBhbnkpID0+IHZvaWQ7XG4gICAgfTtcblxuICAgIGZvciAoY29uc3Qga2V5IGluIGluaXRpYWxWYWx1ZXMpIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaW5pdGlhbFZhbHVlcywga2V5KSkge1xuICAgICAgICBjb25zdCB1cGRhdGVGdW5jdGlvbk5hbWUgPSBgdXBkYXRlJHtrZXkuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBrZXkuc2xpY2UoMSl9YDtcbiAgICAgICAgY29uc3QgdXBkYXRlRnVuY3Rpb24gPSB1cGRhdGVGdW5jdGlvbnNbdXBkYXRlRnVuY3Rpb25OYW1lXTtcblxuICAgICAgICBpZiAodHlwZW9mIHVwZGF0ZUZ1bmN0aW9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHVwZGF0ZUZ1bmN0aW9uKGluaXRpYWxWYWx1ZXNba2V5XSk7XG4gICAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgICAvKiBoYW5kbGUgZXJyb3IgKi9cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgZmFSZWNvcmRWaW55bCA9IGZhUmVjb3JkVmlueWw7XG4gIGZhUGxheUNpcmNsZSA9IGZhUGxheUNpcmNsZTtcbiAgZmFQYXVzZUNpcmNsZSA9IGZhUGF1c2VDaXJjbGU7XG4gIGZhU3RvcENpcmNsZSA9IGZhU3RvcENpcmNsZTtcbiAgZmFEb3RDaXJjbGUgPSBmYURvdENpcmNsZTtcbiAgZmFDb2cgPSBmYUNvZztcbiAgZmFVc2VycyA9IGZhVXNlcnM7XG4gIGZhQ2xvY2sgPSBmYUNsb2NrO1xuICBmYVVzZXJQbHVzID0gZmFVc2VyUGx1cztcbiAgZmFUb29scyA9IGZhVG9vbHM7XG4gIGZhRGVza3RvcCA9IGZhRGVza3RvcDtcbiAgZmFQb2xsID0gZmFQb2xsO1xuICBmYVVzZXJGcmllbmRzID0gZmFVc2VyRnJpZW5kcztcbiAgZmFDaGFsa2JvYXJkVGVhY2hlciA9IGZhQ2hhbGtib2FyZFRlYWNoZXI7XG4gIGZhTWljcm9waG9uZSA9IGZhTWljcm9waG9uZTtcbiAgZmFNaWNyb3Bob25lU2xhc2ggPSBmYU1pY3JvcGhvbmVTbGFzaDtcbiAgZmFWaWRlbyA9IGZhVmlkZW87XG4gIGZhVmlkZW9TbGFzaCA9IGZhVmlkZW9TbGFzaDtcbiAgZmFTeW5jID0gZmFTeW5jO1xuICBmYVBob25lID0gZmFQaG9uZTtcbiAgZmFTaGFyZUFsdCA9IGZhU2hhcmVBbHQ7XG4gIGZhQmFycyA9IGZhQmFycztcbiAgZmFDb21tZW50cyA9IGZhQ29tbWVudHM7XG4gIGZhQ2hhcnRCYXIgPSBmYUNoYXJ0QmFyO1xuXG4gIG9uQ2xvc2VNZW51TW9kYWwgPSAoKSA9PiB7XG4gICAgdGhpcy51cGRhdGVJc01lbnVNb2RhbFZpc2libGUoZmFsc2UpO1xuICB9O1xuXG4gIG9uRXZlbnRTZXR0aW5nc0Nsb3NlID0gKCkgPT4ge1xuICAgIHRoaXMudXBkYXRlSXNTZXR0aW5nc01vZGFsVmlzaWJsZShmYWxzZSk7XG4gIH07XG5cbiAgb25Db0hvc3RDbG9zZSA9ICgpID0+IHtcbiAgICB0aGlzLnVwZGF0ZUlzQ29Ib3N0TW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgfTtcblxuICBvbk1lZGlhU2V0dGluZ3NDbG9zZSA9ICgpID0+IHtcbiAgICB0aGlzLnVwZGF0ZUlzTWVkaWFTZXR0aW5nc01vZGFsVmlzaWJsZShmYWxzZSk7XG4gIH07XG5cbiAgb25EaXNwbGF5U2V0dGluZ3NDbG9zZSA9ICgpID0+IHtcbiAgICB0aGlzLnVwZGF0ZUlzRGlzcGxheVNldHRpbmdzTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgfTtcblxuICBvblBvbGxDbG9zZSA9ICgpID0+IHtcbiAgICB0aGlzLnVwZGF0ZUlzUG9sbE1vZGFsVmlzaWJsZShmYWxzZSk7XG4gIH07XG5cbiAgb25CcmVha291dFJvb21zQ2xvc2UgPSAoKSA9PiB7XG4gICAgdGhpcy51cGRhdGVJc0JyZWFrb3V0Um9vbXNNb2RhbFZpc2libGUoZmFsc2UpO1xuICB9O1xuXG4gIG9uQ29uZmlndXJlV2hpdGVib2FyZENsb3NlID0gKCkgPT4ge1xuICAgIHRoaXMudXBkYXRlSXNDb25maWd1cmVXaGl0ZWJvYXJkTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgfTtcblxuICBvbk1lc3NhZ2VzQ2xvc2UgPSAoKSA9PiB7XG4gICAgdGhpcy51cGRhdGVJc01lc3NhZ2VzTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgfTtcblxuICBvblJlY29yZGluZ0Nsb3NlID0gKCkgPT4ge1xuICAgIHRoaXMudXBkYXRlSXNSZWNvcmRpbmdNb2RhbFZpc2libGUoZmFsc2UpO1xuICB9O1xuXG4gIG9uUGFydGljaXBhbnRzQ2xvc2UgPSAoKSA9PiB7XG4gICAgdGhpcy51cGRhdGVJc1BhcnRpY2lwYW50c01vZGFsVmlzaWJsZShmYWxzZSk7XG4gIH07XG5cbiAgb25CYWNrZ3JvdW5kQ2xvc2UgPSAoKSA9PiB7XG4gICAgdGhpcy51cGRhdGVJc0JhY2tncm91bmRNb2RhbFZpc2libGUoZmFsc2UpO1xuICB9O1xuXG4gIG9uQ29uZmlybUV4aXRDbG9zZSA9ICgpID0+IHtcbiAgICB0aGlzLnVwZGF0ZUlzQ29uZmlybUV4aXRNb2RhbFZpc2libGUoZmFsc2UpO1xuICB9O1xuXG4gIG9uQ29uZmlybUhlcmVDbG9zZSA9ICgpID0+IHtcbiAgICB0aGlzLnVwZGF0ZUlzQ29uZmlybUhlcmVNb2RhbFZpc2libGUoZmFsc2UpO1xuICB9O1xuXG4gIG9uU2NyZWVuYm9hcmRDbG9zZSA9ICgpID0+IHtcbiAgICB0aGlzLnVwZGF0ZUlzU2NyZWVuYm9hcmRNb2RhbFZpc2libGUoZmFsc2UpO1xuICB9O1xuXG4gIG9uU2hhcmVFdmVudENsb3NlID0gKCkgPT4ge1xuICAgIHRoaXMudXBkYXRlSXNTaGFyZUV2ZW50TW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgfTtcblxuICBvbkFsZXJ0SGlkZSA9ICgpID0+IHtcbiAgICB0aGlzLnVwZGF0ZUFsZXJ0VmlzaWJsZShmYWxzZSk7XG4gIH07XG5cbiAgU2NyZWVuYm9hcmRXaWRnZXQgPSB7XG4gICAgY29tcG9uZW50OiBTY3JlZW5ib2FyZCxcbiAgICBpbnB1dHM6IHtcbiAgICAgIGN1c3RvbVdpZHRoOiB0aGlzLmNvbXBvbmVudFNpemVzLnZhbHVlLm1haW5XaWR0aCxcbiAgICAgIGN1c3RvbUhlaWdodDogdGhpcy5jb21wb25lbnRTaXplcy52YWx1ZS5tYWluSGVpZ2h0LFxuICAgICAgcGFyYW1ldGVyczogdGhpcy5tZWRpYVNGVVBhcmFtZXRlcnMsXG4gICAgICBzaG93QXNwZWN0OiB0aGlzLnNoYXJlZC52YWx1ZSxcbiAgICB9LFxuICB9O1xuXG4gIHJlY29yZFRpbWVyV2lkZ2V0ID0ge1xuICAgIGNvbXBvbmVudDogUmVjb3JkVGltZXJXaWRnZXQsXG4gICAgaW5qZWN0b3I6IHRoaXMuY3JlYXRlSW5qZWN0b3IoeyByZWNvcmRpbmdQcm9ncmVzc1RpbWU6IHRoaXMucmVjb3JkaW5nUHJvZ3Jlc3NUaW1lLnZhbHVlIH0pLFxuICB9O1xuXG4gIHVwZGF0ZVJlY29yZFRpbWVyV2lkZ2V0ID0gKFxuICAgIHJlY29yZGluZ1Byb2dyZXNzVGltZTogc3RyaW5nID0gdGhpcy5yZWNvcmRpbmdQcm9ncmVzc1RpbWUudmFsdWUsXG4gICk6IHsgY29tcG9uZW50OiBhbnk7IGluamVjdG9yOiBJbmplY3RvciB9ID0+IHtcbiAgICBjb25zdCByZWNvcmRUaW1lcldpZGdldCA9IHtcbiAgICAgIGNvbXBvbmVudDogUmVjb3JkVGltZXJXaWRnZXQsXG4gICAgICBpbmplY3RvcjogdGhpcy5jcmVhdGVJbmplY3Rvcih7IHJlY29yZGluZ1Byb2dyZXNzVGltZTogcmVjb3JkaW5nUHJvZ3Jlc3NUaW1lIH0pLFxuICAgIH07XG5cbiAgICB0aGlzLnJlY29yZFRpbWVyV2lkZ2V0ID0geyAuLi5yZWNvcmRUaW1lcldpZGdldCB9O1xuXG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG5cbiAgICByZXR1cm4gcmVjb3JkVGltZXJXaWRnZXQ7XG4gIH07XG5cbiAgcmVjb3JkQnV0dG9uID0gW1xuICAgIHtcbiAgICAgIGljb246IHRoaXMuZmFSZWNvcmRWaW55bCxcbiAgICAgIHRleHQ6ICdSZWNvcmQnLFxuICAgICAgb25QcmVzczogKCkgPT4ge1xuICAgICAgICB0aGlzLmxhdW5jaFJlY29yZGluZy5sYXVuY2hSZWNvcmRpbmcoe1xuICAgICAgICAgIHVwZGF0ZUlzUmVjb3JkaW5nTW9kYWxWaXNpYmxlOiB0aGlzLnVwZGF0ZUlzUmVjb3JkaW5nTW9kYWxWaXNpYmxlLmJpbmQodGhpcyksXG4gICAgICAgICAgaXNSZWNvcmRpbmdNb2RhbFZpc2libGU6IHRoaXMuaXNSZWNvcmRpbmdNb2RhbFZpc2libGUudmFsdWUsXG4gICAgICAgICAgc2hvd0FsZXJ0OiB0aGlzLnNob3dBbGVydC5iaW5kKHRoaXMpLFxuICAgICAgICAgIHN0b3BMYXVuY2hSZWNvcmQ6IHRoaXMuc3RvcExhdW5jaFJlY29yZC52YWx1ZSxcbiAgICAgICAgICBjYW5MYXVuY2hSZWNvcmQ6IHRoaXMuY2FuTGF1bmNoUmVjb3JkLnZhbHVlLFxuICAgICAgICAgIHJlY29yZGluZ0F1ZGlvU3VwcG9ydDogdGhpcy5yZWNvcmRpbmdBdWRpb1N1cHBvcnQudmFsdWUsXG4gICAgICAgICAgcmVjb3JkaW5nVmlkZW9TdXBwb3J0OiB0aGlzLnJlY29yZGluZ1ZpZGVvU3VwcG9ydC52YWx1ZSxcbiAgICAgICAgICB1cGRhdGVDYW5SZWNvcmQ6IHRoaXMudXBkYXRlQ2FuUmVjb3JkLmJpbmQodGhpcyksXG4gICAgICAgICAgdXBkYXRlQ2xlYXJlZFRvUmVjb3JkOiB0aGlzLnVwZGF0ZUNsZWFyZWRUb1JlY29yZC5iaW5kKHRoaXMpLFxuICAgICAgICAgIHJlY29yZFN0YXJ0ZWQ6IHRoaXMucmVjb3JkU3RhcnRlZC52YWx1ZSxcbiAgICAgICAgICByZWNvcmRQYXVzZWQ6IHRoaXMucmVjb3JkUGF1c2VkLnZhbHVlLFxuICAgICAgICAgIGxvY2FsVUlNb2RlOiB0aGlzLmxvY2FsVUlNb2RlLnZhbHVlLFxuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBhY3RpdmVDb2xvcjogJ2JsYWNrJyxcbiAgICAgIGluQWN0aXZlQ29sb3I6ICdibGFjaycsXG4gICAgICBzaG93OiB0cnVlLFxuICAgIH0sXG4gIF07XG5cbiAgcmVjb3JkQnV0dG9uczogTWFpbkJ1dHRvbkFsdFtdID0gW107XG5cbiAgcmVjb3JkQnV0dG9uc0FycmF5OiBNYWluQnV0dG9uQWx0W10gPSBbXG4gICAge1xuICAgICAgaWNvbjogdGhpcy5mYVBsYXlDaXJjbGUsXG4gICAgICBhY3RpdmU6ICgpID0+ICF0aGlzLnJlY29yZFBhdXNlZC52YWx1ZSxcbiAgICAgIG9uUHJlc3M6ICgpID0+XG4gICAgICAgIHRoaXMudXBkYXRlUmVjb3JkaW5nLnVwZGF0ZVJlY29yZGluZyh7XG4gICAgICAgICAgcGFyYW1ldGVyczogeyAuLi50aGlzLmdldEFsbFBhcmFtcygpLCAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCkgfSxcbiAgICAgICAgfSksXG4gICAgICBhY3RpdmVDb2xvcjogJ2JsYWNrJyxcbiAgICAgIGluQWN0aXZlQ29sb3I6ICdibGFjaycsXG4gICAgICBhbHRlcm5hdGVJY29uOiB0aGlzLmZhUGF1c2VDaXJjbGUsXG4gICAgICBzaG93OiAoKSA9PiB0cnVlLFxuICAgIH0sXG4gICAge1xuICAgICAgaWNvbjogdGhpcy5mYVN0b3BDaXJjbGUsXG4gICAgICBhY3RpdmU6ICgpID0+IGZhbHNlLFxuICAgICAgb25QcmVzczogKCkgPT5cbiAgICAgICAgdGhpcy5zdG9wUmVjb3JkaW5nLnN0b3BSZWNvcmRpbmcoe1xuICAgICAgICAgIHBhcmFtZXRlcnM6IHsgLi4udGhpcy5nZXRBbGxQYXJhbXMoKSwgLi4udGhpcy5tZWRpYVNGVUZ1bmN0aW9ucygpIH0sXG4gICAgICAgIH0pLFxuICAgICAgYWN0aXZlQ29sb3I6ICdncmVlbicsXG4gICAgICBpbkFjdGl2ZUNvbG9yOiAnYmxhY2snLFxuICAgICAgc2hvdzogKCkgPT4gdHJ1ZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGN1c3RvbUNvbXBvbmVudDogKCkgPT4gdGhpcy51cGRhdGVSZWNvcmRUaW1lcldpZGdldCgpLFxuICAgICAgc2hvdzogKCkgPT4gdHJ1ZSxcbiAgICAgIGFjdGl2ZTogKCkgPT4gZmFsc2UsXG4gICAgfSxcbiAgICB7XG4gICAgICBpY29uOiB0aGlzLmZhRG90Q2lyY2xlLFxuICAgICAgYWN0aXZlOiAoKSA9PiBmYWxzZSxcbiAgICAgIG9uUHJlc3M6ICgpID0+IGNvbnNvbGUubG9nKCdTdGF0dXMgcHJlc3NlZCcpLFxuICAgICAgYWN0aXZlQ29sb3I6ICdibGFjaycsXG4gICAgICBpbkFjdGl2ZUNvbG9yOiAoKSA9PiAodGhpcy5yZWNvcmRQYXVzZWQudmFsdWUgPyAneWVsbG93JyA6ICdyZWQnKSxcbiAgICAgIHNob3c6ICgpID0+IHRydWUsXG4gICAgfSxcbiAgICB7XG4gICAgICBpY29uOiB0aGlzLmZhQ29nLFxuICAgICAgYWN0aXZlOiAoKSA9PiBmYWxzZSxcbiAgICAgIG9uUHJlc3M6ICgpID0+XG4gICAgICAgIHRoaXMubGF1bmNoUmVjb3JkaW5nLmxhdW5jaFJlY29yZGluZyh7XG4gICAgICAgICAgdXBkYXRlSXNSZWNvcmRpbmdNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNSZWNvcmRpbmdNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcbiAgICAgICAgICBpc1JlY29yZGluZ01vZGFsVmlzaWJsZTogdGhpcy5pc1JlY29yZGluZ01vZGFsVmlzaWJsZS52YWx1ZSxcbiAgICAgICAgICBzaG93QWxlcnQ6IHRoaXMuc2hvd0FsZXJ0LmJpbmQodGhpcyksXG4gICAgICAgICAgc3RvcExhdW5jaFJlY29yZDogdGhpcy5zdG9wTGF1bmNoUmVjb3JkLnZhbHVlLFxuICAgICAgICAgIGNhbkxhdW5jaFJlY29yZDogdGhpcy5jYW5MYXVuY2hSZWNvcmQudmFsdWUsXG4gICAgICAgICAgcmVjb3JkaW5nQXVkaW9TdXBwb3J0OiB0aGlzLnJlY29yZGluZ0F1ZGlvU3VwcG9ydC52YWx1ZSxcbiAgICAgICAgICByZWNvcmRpbmdWaWRlb1N1cHBvcnQ6IHRoaXMucmVjb3JkaW5nVmlkZW9TdXBwb3J0LnZhbHVlLFxuICAgICAgICAgIHVwZGF0ZUNhblJlY29yZDogdGhpcy51cGRhdGVDYW5SZWNvcmQuYmluZCh0aGlzKSxcbiAgICAgICAgICB1cGRhdGVDbGVhcmVkVG9SZWNvcmQ6IHRoaXMudXBkYXRlQ2xlYXJlZFRvUmVjb3JkLmJpbmQodGhpcyksXG4gICAgICAgICAgcmVjb3JkU3RhcnRlZDogdGhpcy5yZWNvcmRTdGFydGVkLnZhbHVlLFxuICAgICAgICAgIHJlY29yZFBhdXNlZDogdGhpcy5yZWNvcmRQYXVzZWQudmFsdWUsXG4gICAgICAgICAgbG9jYWxVSU1vZGU6IHRoaXMubG9jYWxVSU1vZGUudmFsdWUsXG4gICAgICAgIH0pLFxuICAgICAgYWN0aXZlQ29sb3I6ICdncmVlbicsXG4gICAgICBpbkFjdGl2ZUNvbG9yOiAnYmxhY2snLFxuICAgICAgc2hvdzogKCkgPT4gdHJ1ZSxcbiAgICB9LFxuICBdO1xuXG4gIGFzeW5jIHVwZGF0ZVJlY29yZEJ1dHRvbnMoKSB7XG4gICAgY29uc3QgcmVjb3JkQnV0dG9ucyA9IHRoaXMucmVjb3JkQnV0dG9uc0FycmF5Lm1hcCgoYnV0dG9uKSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5idXR0b24sXG4gICAgICAgIGFjdGl2ZTogdHlwZW9mIGJ1dHRvbi5hY3RpdmUgPT09ICdmdW5jdGlvbicgPyBidXR0b24uYWN0aXZlKCkgOiBidXR0b24uYWN0aXZlLFxuICAgICAgICBzaG93OiB0eXBlb2YgYnV0dG9uLnNob3cgPT09ICdmdW5jdGlvbicgPyBidXR0b24uc2hvdygpIDogYnV0dG9uLnNob3csXG4gICAgICAgIGN1c3RvbUNvbXBvbmVudDogYnV0dG9uLmN1c3RvbUNvbXBvbmVudFxuICAgICAgICAgID8gdHlwZW9mIGJ1dHRvbi5jdXN0b21Db21wb25lbnQgPT09ICdmdW5jdGlvbidcbiAgICAgICAgICAgID8gYnV0dG9uLmN1c3RvbUNvbXBvbmVudCgpXG4gICAgICAgICAgICA6IGJ1dHRvbi5jdXN0b21Db21wb25lbnRcbiAgICAgICAgICA6IHVuZGVmaW5lZCxcbiAgICAgICAgYWN0aXZlQ29sb3I6XG4gICAgICAgICAgdHlwZW9mIGJ1dHRvbi5pbkFjdGl2ZUNvbG9yID09PSAnZnVuY3Rpb24nXG4gICAgICAgICAgICA/IGJ1dHRvbi5pbkFjdGl2ZUNvbG9yKClcbiAgICAgICAgICAgIDogYnV0dG9uLmluQWN0aXZlQ29sb3IsXG4gICAgICAgIGluQWN0aXZlQ29sb3I6XG4gICAgICAgICAgdHlwZW9mIGJ1dHRvbi5pbkFjdGl2ZUNvbG9yID09PSAnZnVuY3Rpb24nXG4gICAgICAgICAgICA/IGJ1dHRvbi5pbkFjdGl2ZUNvbG9yKClcbiAgICAgICAgICAgIDogYnV0dG9uLmluQWN0aXZlQ29sb3IsXG4gICAgICB9O1xuICAgIH0pO1xuICAgIHRoaXMucmVjb3JkQnV0dG9ucyA9IFsuLi5yZWNvcmRCdXR0b25zXTtcbiAgICBhd2FpdCB0aGlzLnVwZGF0ZU1lbnVSZWNvcmRXaWRnZXQocmVjb3JkQnV0dG9ucyk7XG4gICAgdGhpcy51cGRhdGVDdXN0b21NZW51QnV0dG9ucygpO1xuICAgIHRoaXMudXBkYXRlQ29udHJvbEJyb2FkY2FzdEJ1dHRvbnMoKTtcblxuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLy8gQ3JlYXRlIGluc3RhbmNlcyBvZiB0aGUgY3VzdG9tIHdpZGdldHNcbiAgbWVudVdpZGdldCA9IHtcbiAgICBjb21wb25lbnQ6IE1lbnVXaWRnZXQsXG4gICAgaW5qZWN0b3I6IHRoaXMuY3JlYXRlSW5qZWN0b3Ioe1xuICAgICAgaWNvbjogdGhpcy5mYUJhcnMsXG4gICAgICBiYWRnZVZhbHVlOiB0aGlzLnRvdGFsUmVxV2FpdC52YWx1ZSxcbiAgICAgIGljb25Db2xvcjogJ2JsYWNrJyxcbiAgICAgIHNob3dCYWRnZTogdHJ1ZSxcbiAgICB9KSxcbiAgfTtcblxuICBtZXNzYWdlV2lkZ2V0ID0ge1xuICAgIGNvbXBvbmVudDogTWVzc2FnZVdpZGdldCxcbiAgICBpbmplY3RvcjogdGhpcy5jcmVhdGVJbmplY3Rvcih7XG4gICAgICBpY29uOiB0aGlzLmZhQ29tbWVudHMsXG4gICAgICBzaG93QmFkZ2U6IHRoaXMuc2hvd01lc3NhZ2VzQmFkZ2UudmFsdWUsXG4gICAgICBiYWRnZVZhbHVlOiAxLFxuICAgICAgaWNvbkNvbG9yOiAnYmxhY2snLFxuICAgIH0pLFxuICB9O1xuXG4gIG1lbnVSZWNvcmRXaWRnZXQgPSB7XG4gICAgY29tcG9uZW50OiBNZW51UmVjb3JkV2lkZ2V0LFxuICAgIGluamVjdG9yOiB0aGlzLmNyZWF0ZUluamVjdG9yKHtcbiAgICAgIGJ1dHRvbnM6IHRoaXMucmVjb3JkQnV0dG9ucyxcbiAgICAgIHNob3dBc3BlY3Q6IHRydWUsXG4gICAgICBkaXJlY3Rpb246ICdob3Jpem9udGFsJyxcbiAgICB9KSxcbiAgfTtcblxuICB1cGRhdGVNZW51UmVjb3JkV2lkZ2V0ID0gKHJlY29yZEJ1dHRvbnM6IE1haW5CdXR0b25BbHRbXSA9IHRoaXMucmVjb3JkQnV0dG9ucyk6IGFueSA9PiB7XG4gICAgY29uc3QgbWVudVJlY29yZFdpZGdldCA9IHtcbiAgICAgIGNvbXBvbmVudDogTWVudVJlY29yZFdpZGdldCxcbiAgICAgIGluamVjdG9yOiB0aGlzLmNyZWF0ZUluamVjdG9yKHtcbiAgICAgICAgYnV0dG9uczogcmVjb3JkQnV0dG9ucyxcbiAgICAgICAgc2hvd0FzcGVjdDogdHJ1ZSxcbiAgICAgICAgZGlyZWN0aW9uOiAnaG9yaXpvbnRhbCcsXG4gICAgICB9KSxcbiAgICB9O1xuXG4gICAgdGhpcy5tZW51UmVjb3JkV2lkZ2V0ID0geyAuLi5tZW51UmVjb3JkV2lkZ2V0IH07XG5cbiAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcblxuICAgIHJldHVybiBtZW51UmVjb3JkV2lkZ2V0O1xuICB9O1xuXG4gIG1lbnVQYXJ0aWNpcGFudHNXaWRnZXQgPSB7XG4gICAgY29tcG9uZW50OiBNZW51UGFydGljaXBhbnRzV2lkZ2V0LFxuICAgIGluamVjdG9yOiB0aGlzLmNyZWF0ZUluamVjdG9yKHtcbiAgICAgIGljb246IHRoaXMuZmFDaGFydEJhcixcbiAgICAgIHBhcnRpY2lwYW50c0NvdW50ZXI6IHRoaXMucGFydGljaXBhbnRzQ291bnRlci52YWx1ZSxcbiAgICAgIGljb25Db2xvcjogJ2JsYWNrJyxcbiAgICB9KSxcbiAgfTtcblxuICB1cGRhdGVNZW51UGFydGljaXBhbnRzV2lkZ2V0ID0gKGNvdW50OiBudW1iZXIgPSB0aGlzLnBhcnRpY2lwYW50c0NvdW50ZXIudmFsdWUpOiBhbnkgPT4ge1xuICAgIGNvbnN0IG1lbnVQYXJ0aWNpcGFudHNXaWRnZXQgPSB7XG4gICAgICBjb21wb25lbnQ6IE1lbnVQYXJ0aWNpcGFudHNXaWRnZXQsXG4gICAgICBpbmplY3RvcjogdGhpcy5jcmVhdGVJbmplY3Rvcih7XG4gICAgICAgIGljb246IHRoaXMuZmFDaGFydEJhcixcbiAgICAgICAgcGFydGljaXBhbnRzQ291bnRlcjogY291bnQsXG4gICAgICAgIGljb25Db2xvcjogJ2JsYWNrJyxcbiAgICAgIH0pLFxuICAgIH07XG5cbiAgICB0aGlzLm1lbnVQYXJ0aWNpcGFudHNXaWRnZXQgPSB7IC4uLm1lbnVQYXJ0aWNpcGFudHNXaWRnZXQgfTtcblxuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuXG4gICAgcmV0dXJuIG1lbnVQYXJ0aWNpcGFudHNXaWRnZXQ7XG4gIH07XG5cbiAgY3VzdG9tTWVudUJ1dHRvbnNBcnJheTogTWFpbkN1c3RvbUJ1dHRvbltdID0gW1xuICAgIHtcbiAgICAgIGljb246IHRoaXMuZmFSZWNvcmRWaW55bCxcbiAgICAgIHRleHQ6ICdSZWNvcmQnLFxuICAgICAgYWN0aW9uOiAoKSA9PlxuICAgICAgICB0aGlzLmxhdW5jaFJlY29yZGluZy5sYXVuY2hSZWNvcmRpbmcoe1xuICAgICAgICAgIHVwZGF0ZUlzUmVjb3JkaW5nTW9kYWxWaXNpYmxlOiB0aGlzLnVwZGF0ZUlzUmVjb3JkaW5nTW9kYWxWaXNpYmxlLmJpbmQodGhpcyksXG4gICAgICAgICAgaXNSZWNvcmRpbmdNb2RhbFZpc2libGU6IHRoaXMuaXNSZWNvcmRpbmdNb2RhbFZpc2libGUudmFsdWUsXG4gICAgICAgICAgc2hvd0FsZXJ0OiB0aGlzLnNob3dBbGVydC5iaW5kKHRoaXMpLFxuICAgICAgICAgIHN0b3BMYXVuY2hSZWNvcmQ6IHRoaXMuc3RvcExhdW5jaFJlY29yZC52YWx1ZSxcbiAgICAgICAgICBjYW5MYXVuY2hSZWNvcmQ6IHRoaXMuY2FuTGF1bmNoUmVjb3JkLnZhbHVlLFxuICAgICAgICAgIHJlY29yZGluZ0F1ZGlvU3VwcG9ydDogdGhpcy5yZWNvcmRpbmdBdWRpb1N1cHBvcnQudmFsdWUsXG4gICAgICAgICAgcmVjb3JkaW5nVmlkZW9TdXBwb3J0OiB0aGlzLnJlY29yZGluZ1ZpZGVvU3VwcG9ydC52YWx1ZSxcbiAgICAgICAgICB1cGRhdGVDYW5SZWNvcmQ6IHRoaXMudXBkYXRlQ2FuUmVjb3JkLmJpbmQodGhpcyksXG4gICAgICAgICAgdXBkYXRlQ2xlYXJlZFRvUmVjb3JkOiB0aGlzLnVwZGF0ZUNsZWFyZWRUb1JlY29yZC5iaW5kKHRoaXMpLFxuICAgICAgICAgIHJlY29yZFN0YXJ0ZWQ6IHRoaXMucmVjb3JkU3RhcnRlZC52YWx1ZSxcbiAgICAgICAgICByZWNvcmRQYXVzZWQ6IHRoaXMucmVjb3JkUGF1c2VkLnZhbHVlLFxuICAgICAgICAgIGxvY2FsVUlNb2RlOiB0aGlzLmxvY2FsVUlNb2RlLnZhbHVlLFxuICAgICAgICB9KSxcbiAgICAgIHNob3c6ICgpID0+ICF0aGlzLnNob3dSZWNvcmRCdXR0b25zLnZhbHVlICYmIHRoaXMuaXNsZXZlbC52YWx1ZSA9PSAnMicsXG4gICAgfSxcbiAgICB7XG4gICAgICBjdXN0b21Db21wb25lbnQ6ICgpID0+IHRoaXMudXBkYXRlTWVudVJlY29yZFdpZGdldCgpLFxuICAgICAgc2hvdzogKCkgPT4gdGhpcy5zaG93UmVjb3JkQnV0dG9ucy52YWx1ZSAmJiB0aGlzLmlzbGV2ZWwudmFsdWUgPT0gJzInLFxuICAgICAgYWN0aW9uOiAoKSA9PiBjb25zb2xlLmxvZygncmVjb3JkIGJ1dHRvbnMgcHJlc3NlZCcpLFxuICAgIH0sXG4gICAge1xuICAgICAgaWNvbjogdGhpcy5mYUNvZyxcbiAgICAgIHRleHQ6ICdFdmVudCBTZXR0aW5ncycsXG4gICAgICBhY3Rpb246ICgpID0+XG4gICAgICAgIHRoaXMubGF1bmNoU2V0dGluZ3MubGF1bmNoU2V0dGluZ3Moe1xuICAgICAgICAgIHVwZGF0ZUlzU2V0dGluZ3NNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNTZXR0aW5nc01vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuICAgICAgICAgIGlzU2V0dGluZ3NNb2RhbFZpc2libGU6IHRoaXMuaXNTZXR0aW5nc01vZGFsVmlzaWJsZS52YWx1ZSxcbiAgICAgICAgfSksXG4gICAgICBzaG93OiAoKSA9PiB0aGlzLmlzbGV2ZWwudmFsdWUgPT0gJzInLFxuICAgIH0sXG4gICAge1xuICAgICAgaWNvbjogdGhpcy5mYVVzZXJzLFxuICAgICAgdGV4dDogJ1JlcXVlc3RzJyxcbiAgICAgIGFjdGlvbjogKCkgPT5cbiAgICAgICAgdGhpcy5sYXVuY2hSZXF1ZXN0cy5sYXVuY2hSZXF1ZXN0cyh7XG4gICAgICAgICAgdXBkYXRlSXNSZXF1ZXN0c01vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc1JlcXVlc3RzTW9kYWxWaXNpYmxlLmJpbmQodGhpcyksXG4gICAgICAgICAgaXNSZXF1ZXN0c01vZGFsVmlzaWJsZTogdGhpcy5pc1JlcXVlc3RzTW9kYWxWaXNpYmxlLnZhbHVlLFxuICAgICAgICB9KSxcbiAgICAgIHNob3c6ICgpID0+XG4gICAgICAgIHRoaXMuaXNsZXZlbC52YWx1ZSA9PSAnMicgfHxcbiAgICAgICAgKCh0aGlzLmNvSG9zdFJlc3BvbnNpYmlsaXR5LnZhbHVlICYmXG4gICAgICAgICAgdGhpcy5jb0hvc3QudmFsdWUgJiZcbiAgICAgICAgICB0aGlzLmNvSG9zdC52YWx1ZSA9PT0gdGhpcy5tZW1iZXIudmFsdWUgJiZcbiAgICAgICAgICAhIXRoaXMuY29Ib3N0UmVzcG9uc2liaWxpdHk/LnZhbHVlPy5maW5kKChpdGVtKSA9PiBpdGVtLm5hbWUgPT09ICdtZWRpYScpPy52YWx1ZSkgPz9cbiAgICAgICAgICBmYWxzZSkgfHxcbiAgICAgICAgZmFsc2UsXG4gICAgfSxcbiAgICB7XG4gICAgICBpY29uOiB0aGlzLmZhQ2xvY2ssXG4gICAgICB0ZXh0OiAnV2FpdGluZycsXG4gICAgICBhY3Rpb246ICgpID0+XG4gICAgICAgIHRoaXMubGF1bmNoV2FpdGluZy5sYXVuY2hXYWl0aW5nKHtcbiAgICAgICAgICB1cGRhdGVJc1dhaXRpbmdNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNXYWl0aW5nTW9kYWxWaXNpYmxlLmJpbmQodGhpcyksXG4gICAgICAgICAgaXNXYWl0aW5nTW9kYWxWaXNpYmxlOiB0aGlzLmlzV2FpdGluZ01vZGFsVmlzaWJsZS52YWx1ZSxcbiAgICAgICAgfSksXG4gICAgICBzaG93OiAoKSA9PlxuICAgICAgICB0aGlzLmlzbGV2ZWwudmFsdWUgPT0gJzInIHx8XG4gICAgICAgICh0aGlzLmNvSG9zdFJlc3BvbnNpYmlsaXR5LnZhbHVlICYmXG4gICAgICAgICAgdGhpcy5jb0hvc3QudmFsdWUgJiZcbiAgICAgICAgICB0aGlzLmNvSG9zdC52YWx1ZSA9PT0gdGhpcy5tZW1iZXIudmFsdWUgJiZcbiAgICAgICAgICB0aGlzLmNvSG9zdFJlc3BvbnNpYmlsaXR5Py52YWx1ZT8uZmluZCgoaXRlbSkgPT4gaXRlbS5uYW1lID09PSAnd2FpdGluZycpPy52YWx1ZSA9PT1cbiAgICAgICAgICAgIHRydWUpIHx8XG4gICAgICAgIGZhbHNlLFxuICAgIH0sXG4gICAge1xuICAgICAgaWNvbjogdGhpcy5mYVVzZXJQbHVzLFxuICAgICAgdGV4dDogJ0NvLWhvc3QnLFxuICAgICAgYWN0aW9uOiAoKSA9PlxuICAgICAgICB0aGlzLmxhdW5jaENvSG9zdC5sYXVuY2hDb0hvc3Qoe1xuICAgICAgICAgIHVwZGF0ZUlzQ29Ib3N0TW9kYWxWaXNpYmxlOiB0aGlzLnVwZGF0ZUlzQ29Ib3N0TW9kYWxWaXNpYmxlLmJpbmQodGhpcyksXG4gICAgICAgICAgaXNDb0hvc3RNb2RhbFZpc2libGU6IHRoaXMuaXNDb0hvc3RNb2RhbFZpc2libGUudmFsdWUsXG4gICAgICAgIH0pLFxuICAgICAgc2hvdzogKCkgPT4gdGhpcy5pc2xldmVsLnZhbHVlID09ICcyJyxcbiAgICB9LFxuICAgIHtcbiAgICAgIGljb246IHRoaXMuZmFUb29scyxcbiAgICAgIHRleHQ6ICdTZXQgTWVkaWEnLFxuICAgICAgYWN0aW9uOiAoKSA9PlxuICAgICAgICB0aGlzLmxhdW5jaE1lZGlhU2V0dGluZ3MubGF1bmNoTWVkaWFTZXR0aW5ncyh7XG4gICAgICAgICAgdXBkYXRlSXNNZWRpYVNldHRpbmdzTW9kYWxWaXNpYmxlOiB0aGlzLnVwZGF0ZUlzTWVkaWFTZXR0aW5nc01vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuICAgICAgICAgIGlzTWVkaWFTZXR0aW5nc01vZGFsVmlzaWJsZTogdGhpcy5pc01lZGlhU2V0dGluZ3NNb2RhbFZpc2libGUudmFsdWUsXG4gICAgICAgICAgYXVkaW9JbnB1dHM6IHRoaXMuYXVkaW9JbnB1dHMudmFsdWUsXG4gICAgICAgICAgdmlkZW9JbnB1dHM6IHRoaXMudmlkZW9JbnB1dHMudmFsdWUsXG4gICAgICAgICAgdXBkYXRlQXVkaW9JbnB1dHM6IHRoaXMudXBkYXRlQXVkaW9JbnB1dHMuYmluZCh0aGlzKSxcbiAgICAgICAgICB1cGRhdGVWaWRlb0lucHV0czogdGhpcy51cGRhdGVWaWRlb0lucHV0cy5iaW5kKHRoaXMpLFxuICAgICAgICB9KSxcbiAgICAgIHNob3c6ICgpID0+IHRydWUsXG4gICAgfSxcbiAgICB7XG4gICAgICBpY29uOiB0aGlzLmZhRGVza3RvcCxcbiAgICAgIHRleHQ6ICdEaXNwbGF5JyxcbiAgICAgIGFjdGlvbjogKCkgPT5cbiAgICAgICAgdGhpcy5sYXVuY2hEaXNwbGF5U2V0dGluZ3MubGF1bmNoRGlzcGxheVNldHRpbmdzKHtcbiAgICAgICAgICB1cGRhdGVJc0Rpc3BsYXlTZXR0aW5nc01vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc0Rpc3BsYXlTZXR0aW5nc01vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuICAgICAgICAgIGlzRGlzcGxheVNldHRpbmdzTW9kYWxWaXNpYmxlOiB0aGlzLmlzRGlzcGxheVNldHRpbmdzTW9kYWxWaXNpYmxlLnZhbHVlLFxuICAgICAgICB9KSxcbiAgICAgIHNob3c6ICgpID0+IHRydWUsXG4gICAgfSxcbiAgICB7XG4gICAgICBpY29uOiB0aGlzLmZhUG9sbCxcbiAgICAgIHRleHQ6ICdQb2xsJyxcbiAgICAgIGFjdGlvbjogKCkgPT5cbiAgICAgICAgdGhpcy5sYXVuY2hQb2xsLmxhdW5jaFBvbGwoe1xuICAgICAgICAgIHVwZGF0ZUlzUG9sbE1vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc1BvbGxNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcbiAgICAgICAgICBpc1BvbGxNb2RhbFZpc2libGU6IHRoaXMuaXNQb2xsTW9kYWxWaXNpYmxlLnZhbHVlLFxuICAgICAgICB9KSxcbiAgICAgIHNob3c6ICgpID0+IHRydWUsXG4gICAgfSxcbiAgICB7XG4gICAgICBpY29uOiB0aGlzLmZhVXNlckZyaWVuZHMsXG4gICAgICB0ZXh0OiAnQnJlYWtvdXQgUm9vbXMnLFxuICAgICAgYWN0aW9uOiAoKSA9PlxuICAgICAgICB0aGlzLmxhdW5jaEJyZWFrb3V0Um9vbXMubGF1bmNoQnJlYWtvdXRSb29tcyh7XG4gICAgICAgICAgdXBkYXRlSXNCcmVha291dFJvb21zTW9kYWxWaXNpYmxlOiB0aGlzLnVwZGF0ZUlzQnJlYWtvdXRSb29tc01vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuICAgICAgICAgIGlzQnJlYWtvdXRSb29tc01vZGFsVmlzaWJsZTogdGhpcy5pc0JyZWFrb3V0Um9vbXNNb2RhbFZpc2libGUudmFsdWUsXG4gICAgICAgIH0pLFxuICAgICAgc2hvdzogKCkgPT4gdGhpcy5pc2xldmVsLnZhbHVlID09ICcyJyxcbiAgICB9LFxuICAgIHtcbiAgICAgIGljb246IHRoaXMuZmFDaGFsa2JvYXJkVGVhY2hlcixcbiAgICAgIHRleHQ6ICdXaGl0ZWJvYXJkJyxcbiAgICAgIGFjdGlvbjogKCkgPT5cbiAgICAgICAgdGhpcy5sYXVuY2hDb25maWd1cmVXaGl0ZWJvYXJkLmxhdW5jaENvbmZpZ3VyZVdoaXRlYm9hcmQoe1xuICAgICAgICAgIHVwZGF0ZUlzQ29uZmlndXJlV2hpdGVib2FyZE1vZGFsVmlzaWJsZTpcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSXNDb25maWd1cmVXaGl0ZWJvYXJkTW9kYWxWaXNpYmxlLmJpbmQodGhpcyksXG4gICAgICAgICAgaXNDb25maWd1cmVXaGl0ZWJvYXJkTW9kYWxWaXNpYmxlOiB0aGlzLmlzQ29uZmlndXJlV2hpdGVib2FyZE1vZGFsVmlzaWJsZS52YWx1ZSxcbiAgICAgICAgfSksXG4gICAgICBzaG93OiAoKSA9PiB0aGlzLmlzbGV2ZWwudmFsdWUgPT0gJzInLFxuICAgIH0sXG4gIF07XG5cbiAgY3VzdG9tTWVudUJ1dHRvbnM6IE1haW5DdXN0b21CdXR0b25bXSA9IFtdO1xuXG4gIHVwZGF0ZUN1c3RvbU1lbnVCdXR0b25zKCkge1xuICAgIHRoaXMuY3VzdG9tTWVudUJ1dHRvbnMgPSB0aGlzLmN1c3RvbU1lbnVCdXR0b25zQXJyYXkubWFwKChidXR0b24pID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLmJ1dHRvbixcbiAgICAgICAgc2hvdzogdHlwZW9mIGJ1dHRvbi5zaG93ID09PSAnZnVuY3Rpb24nID8gYnV0dG9uLnNob3coKSA6IGJ1dHRvbi5zaG93LFxuICAgICAgICBjdXN0b21Db21wb25lbnQ6IGJ1dHRvbi5jdXN0b21Db21wb25lbnRcbiAgICAgICAgICA/IHR5cGVvZiBidXR0b24uY3VzdG9tQ29tcG9uZW50ID09PSAnZnVuY3Rpb24nXG4gICAgICAgICAgICA/IGJ1dHRvbi5jdXN0b21Db21wb25lbnQoKVxuICAgICAgICAgICAgOiBidXR0b24uY3VzdG9tQ29tcG9uZW50XG4gICAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgY29udHJvbEJyb2FkY2FzdEJ1dHRvbnM6IEJ1dHRvblRvdWNoW10gPSBbXTtcblxuICB1cGRhdGVDb250cm9sQnJvYWRjYXN0QnV0dG9ucygpIHtcbiAgICB0aGlzLmNvbnRyb2xCcm9hZGNhc3RCdXR0b25zID0gdGhpcy5jb250cm9sQnJvYWRjYXN0QnV0dG9uc0FycmF5Lm1hcCgoYnV0dG9uKSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5idXR0b24sXG4gICAgICAgIHNob3c6IHR5cGVvZiBidXR0b24uc2hvdyA9PT0gJ2Z1bmN0aW9uJyA/IGJ1dHRvbi5zaG93KCkgOiBidXR0b24uc2hvdyxcbiAgICAgICAgYWN0aXZlOiB0eXBlb2YgYnV0dG9uLmFjdGl2ZSA9PT0gJ2Z1bmN0aW9uJyA/IGJ1dHRvbi5hY3RpdmUoKSA6IGJ1dHRvbi5hY3RpdmUsXG4gICAgICAgIGN1c3RvbUNvbXBvbmVudDogYnV0dG9uLmN1c3RvbUNvbXBvbmVudFxuICAgICAgICAgID8gdHlwZW9mIGJ1dHRvbi5jdXN0b21Db21wb25lbnQgPT09ICdmdW5jdGlvbidcbiAgICAgICAgICAgID8gYnV0dG9uLmN1c3RvbUNvbXBvbmVudCgpXG4gICAgICAgICAgICA6IGJ1dHRvbi5jdXN0b21Db21wb25lbnRcbiAgICAgICAgICA6IHVuZGVmaW5lZCxcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBjb250cm9sQnJvYWRjYXN0QnV0dG9uc0FycmF5OiBCdXR0b25Ub3VjaFtdID0gW1xuICAgIHtcbiAgICAgIGljb246IHRoaXMuZmFVc2VycyxcbiAgICAgIGFjdGl2ZTogdHJ1ZSxcbiAgICAgIGFsdGVybmF0ZUljb246IHRoaXMuZmFVc2VycyxcbiAgICAgIG9uUHJlc3M6ICgpID0+XG4gICAgICAgIHRoaXMubGF1bmNoUGFydGljaXBhbnRzLmxhdW5jaFBhcnRpY2lwYW50cyh7XG4gICAgICAgICAgdXBkYXRlSXNQYXJ0aWNpcGFudHNNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNQYXJ0aWNpcGFudHNNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcbiAgICAgICAgICBpc1BhcnRpY2lwYW50c01vZGFsVmlzaWJsZTogdGhpcy5pc1BhcnRpY2lwYW50c01vZGFsVmlzaWJsZS52YWx1ZSxcbiAgICAgICAgfSksXG4gICAgICBhY3RpdmVDb2xvcjogJ2JsYWNrJyxcbiAgICAgIGluQWN0aXZlQ29sb3I6ICdibGFjaycsXG4gICAgICBzaG93OiAoKSA9PiB0aGlzLmlzbGV2ZWwudmFsdWUgPT0gJzInLFxuICAgIH0sXG4gICAge1xuICAgICAgaWNvbjogdGhpcy5mYVNoYXJlQWx0LFxuICAgICAgYWN0aXZlOiB0cnVlLFxuICAgICAgYWx0ZXJuYXRlSWNvbjogdGhpcy5mYVNoYXJlQWx0LFxuICAgICAgb25QcmVzczogKCkgPT4gdGhpcy51cGRhdGVJc1NoYXJlRXZlbnRNb2RhbFZpc2libGUoIXRoaXMuaXNTaGFyZUV2ZW50TW9kYWxWaXNpYmxlLnZhbHVlKSxcbiAgICAgIGFjdGl2ZUNvbG9yOiAnYmxhY2snLFxuICAgICAgaW5BY3RpdmVDb2xvcjogJ2JsYWNrJyxcbiAgICAgIHNob3c6ICgpID0+IHRydWUsXG4gICAgfSxcbiAgICB7XG4gICAgICBjdXN0b21Db21wb25lbnQ6IHRoaXMubWVzc2FnZVdpZGdldCxcbiAgICAgIG9uUHJlc3M6ICgpID0+XG4gICAgICAgIHRoaXMubGF1bmNoTWVzc2FnZXMubGF1bmNoTWVzc2FnZXMoe1xuICAgICAgICAgIHVwZGF0ZUlzTWVzc2FnZXNNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNNZXNzYWdlc01vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuICAgICAgICAgIGlzTWVzc2FnZXNNb2RhbFZpc2libGU6IHRoaXMuaXNNZXNzYWdlc01vZGFsVmlzaWJsZS52YWx1ZSxcbiAgICAgICAgfSksXG4gICAgICBzaG93OiAoKSA9PiB0cnVlLFxuICAgIH0sXG4gICAge1xuICAgICAgaWNvbjogdGhpcy5mYVN5bmMsXG4gICAgICBhY3RpdmU6IHRydWUsXG4gICAgICBhbHRlcm5hdGVJY29uOiB0aGlzLmZhU3luYyxcbiAgICAgIG9uUHJlc3M6ICgpID0+XG4gICAgICAgIHRoaXMuc3dpdGNoVmlkZW9BbHQuc3dpdGNoVmlkZW9BbHQoe1xuICAgICAgICAgIHBhcmFtZXRlcnM6IHtcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0QWxsUGFyYW1zKCksXG4gICAgICAgICAgICAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCksXG4gICAgICAgICAgfSxcbiAgICAgICAgfSksXG4gICAgICBhY3RpdmVDb2xvcjogJ2JsYWNrJyxcbiAgICAgIGluQWN0aXZlQ29sb3I6ICdibGFjaycsXG4gICAgICBzaG93OiAoKSA9PiB0aGlzLmlzbGV2ZWwudmFsdWUgPT0gJzInLFxuICAgIH0sXG4gICAge1xuICAgICAgaWNvbjogdGhpcy5mYVZpZGVvU2xhc2gsXG4gICAgICBhbHRlcm5hdGVJY29uOiB0aGlzLmZhVmlkZW8sXG4gICAgICBhY3RpdmU6ICgpID0+IHRoaXMudmlkZW9BY3RpdmUudmFsdWUsXG4gICAgICBvblByZXNzOiAoKSA9PlxuICAgICAgICB0aGlzLmNsaWNrVmlkZW8uY2xpY2tWaWRlbyh7XG4gICAgICAgICAgcGFyYW1ldGVyczoge1xuICAgICAgICAgICAgLi4udGhpcy5nZXRBbGxQYXJhbXMoKSxcbiAgICAgICAgICAgIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KSxcbiAgICAgIHNob3c6ICgpID0+IHRoaXMuaXNsZXZlbC52YWx1ZSA9PSAnMicsXG4gICAgICBhY3RpdmVDb2xvcjogJ2dyZWVuJyxcbiAgICAgIGluQWN0aXZlQ29sb3I6ICdyZWQnLFxuICAgIH0sXG4gICAge1xuICAgICAgaWNvbjogdGhpcy5mYU1pY3JvcGhvbmVTbGFzaCxcbiAgICAgIGFsdGVybmF0ZUljb246IHRoaXMuZmFNaWNyb3Bob25lLFxuICAgICAgYWN0aXZlOiAoKSA9PiB0aGlzLm1pY0FjdGl2ZS52YWx1ZSxcbiAgICAgIG9uUHJlc3M6ICgpID0+XG4gICAgICAgIHRoaXMuY2xpY2tBdWRpby5jbGlja0F1ZGlvKHtcbiAgICAgICAgICBwYXJhbWV0ZXJzOiB7XG4gICAgICAgICAgICAuLi50aGlzLmdldEFsbFBhcmFtcygpLFxuICAgICAgICAgICAgLi4udGhpcy5tZWRpYVNGVUZ1bmN0aW9ucygpLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pLFxuICAgICAgYWN0aXZlQ29sb3I6ICdncmVlbicsXG4gICAgICBpbkFjdGl2ZUNvbG9yOiAncmVkJyxcbiAgICAgIHNob3c6ICgpID0+IHRoaXMuaXNsZXZlbC52YWx1ZSA9PSAnMicsXG4gICAgfSxcbiAgICB7XG4gICAgICBjdXN0b21Db21wb25lbnQ6ICgpID0+IHRoaXMubWVudVBhcnRpY2lwYW50c1dpZGdldCxcbiAgICAgIHNob3c6ICgpID0+IHRoaXMuaXNsZXZlbC52YWx1ZSA9PSAnMicsXG4gICAgfSxcbiAgICB7XG4gICAgICBpY29uOiB0aGlzLmZhUGhvbmUsXG4gICAgICBhY3RpdmU6IHRoaXMuZW5kQ2FsbEFjdGl2ZS52YWx1ZSxcbiAgICAgIG9uUHJlc3M6ICgpID0+XG4gICAgICAgIHRoaXMubGF1bmNoQ29uZmlybUV4aXQubGF1bmNoQ29uZmlybUV4aXQoe1xuICAgICAgICAgIHVwZGF0ZUlzQ29uZmlybUV4aXRNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNDb25maXJtRXhpdE1vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuICAgICAgICAgIGlzQ29uZmlybUV4aXRNb2RhbFZpc2libGU6IHRoaXMuaXNDb25maXJtRXhpdE1vZGFsVmlzaWJsZS52YWx1ZSxcbiAgICAgICAgfSksXG4gICAgICBhY3RpdmVDb2xvcjogJ2dyZWVuJyxcbiAgICAgIGluQWN0aXZlQ29sb3I6ICdyZWQnLFxuICAgICAgc2hvdzogKCkgPT4gdHJ1ZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGljb246IHRoaXMuZmFQaG9uZSxcbiAgICAgIGFjdGl2ZTogdGhpcy5lbmRDYWxsQWN0aXZlLnZhbHVlLFxuICAgICAgb25QcmVzczogKCkgPT4gY29uc29sZS5sb2coJ0VuZCBDYWxsIHByZXNzZWQnKSxcbiAgICAgIGFjdGl2ZUNvbG9yOiAndHJhbnNwYXJlbnQnLFxuICAgICAgaW5BY3RpdmVDb2xvcjogJ3RyYW5zcGFyZW50JyxcbiAgICAgIGJhY2tncm91bmRDb2xvcjogeyBkZWZhdWx0OiAndHJhbnNwYXJlbnQnIH0sXG4gICAgICBzaG93OiAoKSA9PiBmYWxzZSxcbiAgICB9LFxuICBdO1xuXG4gIGNvbnRyb2xDaGF0QnV0dG9uczogQnV0dG9uVG91Y2hbXSA9IFtdO1xuXG4gIGNvbnRyb2xDaGF0QnV0dG9uc0FycmF5OiBCdXR0b25Ub3VjaFtdID0gW1xuICAgIHtcbiAgICAgIGljb246IHRoaXMuZmFTaGFyZUFsdCxcbiAgICAgIGFjdGl2ZTogdHJ1ZSxcbiAgICAgIGFsdGVybmF0ZUljb246IHRoaXMuZmFTaGFyZUFsdCxcbiAgICAgIG9uUHJlc3M6ICgpID0+IHRoaXMudXBkYXRlSXNTaGFyZUV2ZW50TW9kYWxWaXNpYmxlKCF0aGlzLmlzU2hhcmVFdmVudE1vZGFsVmlzaWJsZS52YWx1ZSksXG4gICAgICBhY3RpdmVDb2xvcjogJ2JsYWNrJyxcbiAgICAgIGluQWN0aXZlQ29sb3I6ICdibGFjaycsXG4gICAgICBzaG93OiB0cnVlLFxuICAgIH0sXG4gICAge1xuICAgICAgY3VzdG9tQ29tcG9uZW50OiB0aGlzLm1lc3NhZ2VXaWRnZXQsXG4gICAgICBvblByZXNzOiAoKSA9PlxuICAgICAgICB0aGlzLmxhdW5jaE1lc3NhZ2VzLmxhdW5jaE1lc3NhZ2VzKHtcbiAgICAgICAgICB1cGRhdGVJc01lc3NhZ2VzTW9kYWxWaXNpYmxlOiB0aGlzLnVwZGF0ZUlzTWVzc2FnZXNNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcbiAgICAgICAgICBpc01lc3NhZ2VzTW9kYWxWaXNpYmxlOiB0aGlzLmlzTWVzc2FnZXNNb2RhbFZpc2libGUudmFsdWUsXG4gICAgICAgIH0pLFxuICAgICAgc2hvdzogdHJ1ZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGljb246IHRoaXMuZmFTeW5jLFxuICAgICAgYWN0aXZlOiB0cnVlLFxuICAgICAgYWx0ZXJuYXRlSWNvbjogdGhpcy5mYVN5bmMsXG4gICAgICBvblByZXNzOiAoKSA9PlxuICAgICAgICB0aGlzLnN3aXRjaFZpZGVvQWx0LnN3aXRjaFZpZGVvQWx0KHtcbiAgICAgICAgICBwYXJhbWV0ZXJzOiB7XG4gICAgICAgICAgICAuLi50aGlzLmdldEFsbFBhcmFtcygpLFxuICAgICAgICAgICAgLi4udGhpcy5tZWRpYVNGVUZ1bmN0aW9ucygpLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pLFxuICAgICAgYWN0aXZlQ29sb3I6ICdibGFjaycsXG4gICAgICBpbkFjdGl2ZUNvbG9yOiAnYmxhY2snLFxuICAgICAgc2hvdzogdHJ1ZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGljb246IHRoaXMuZmFWaWRlb1NsYXNoLFxuICAgICAgYWx0ZXJuYXRlSWNvbjogdGhpcy5mYVZpZGVvLFxuICAgICAgYWN0aXZlOiAoKSA9PiB0aGlzLnZpZGVvQWN0aXZlLnZhbHVlLFxuICAgICAgb25QcmVzczogKCkgPT5cbiAgICAgICAgdGhpcy5jbGlja1ZpZGVvLmNsaWNrVmlkZW8oe1xuICAgICAgICAgIHBhcmFtZXRlcnM6IHtcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0QWxsUGFyYW1zKCksXG4gICAgICAgICAgICAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCksXG4gICAgICAgICAgfSxcbiAgICAgICAgfSksXG4gICAgICBhY3RpdmVDb2xvcjogJ2dyZWVuJyxcbiAgICAgIGluQWN0aXZlQ29sb3I6ICdyZWQnLFxuICAgICAgc2hvdzogdHJ1ZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGljb246IHRoaXMuZmFNaWNyb3Bob25lU2xhc2gsXG4gICAgICBhbHRlcm5hdGVJY29uOiB0aGlzLmZhTWljcm9waG9uZSxcbiAgICAgIGFjdGl2ZTogKCkgPT4gdGhpcy5taWNBY3RpdmUudmFsdWUsXG4gICAgICBvblByZXNzOiAoKSA9PlxuICAgICAgICB0aGlzLmNsaWNrQXVkaW8uY2xpY2tBdWRpbyh7XG4gICAgICAgICAgcGFyYW1ldGVyczoge1xuICAgICAgICAgICAgLi4udGhpcy5nZXRBbGxQYXJhbXMoKSxcbiAgICAgICAgICAgIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KSxcbiAgICAgIGFjdGl2ZUNvbG9yOiAnZ3JlZW4nLFxuICAgICAgaW5BY3RpdmVDb2xvcjogJ3JlZCcsXG4gICAgICBzaG93OiB0cnVlLFxuICAgIH0sXG4gICAge1xuICAgICAgaWNvbjogdGhpcy5mYVBob25lLFxuICAgICAgYWN0aXZlOiB0aGlzLmVuZENhbGxBY3RpdmUudmFsdWUsXG4gICAgICBvblByZXNzOiAoKSA9PlxuICAgICAgICB0aGlzLmxhdW5jaENvbmZpcm1FeGl0LmxhdW5jaENvbmZpcm1FeGl0KHtcbiAgICAgICAgICB1cGRhdGVJc0NvbmZpcm1FeGl0TW9kYWxWaXNpYmxlOiB0aGlzLnVwZGF0ZUlzQ29uZmlybUV4aXRNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcbiAgICAgICAgICBpc0NvbmZpcm1FeGl0TW9kYWxWaXNpYmxlOiB0aGlzLmlzQ29uZmlybUV4aXRNb2RhbFZpc2libGUudmFsdWUsXG4gICAgICAgIH0pLFxuICAgICAgYWN0aXZlQ29sb3I6ICdncmVlbicsXG4gICAgICBpbkFjdGl2ZUNvbG9yOiAncmVkJyxcbiAgICAgIHNob3c6IHRydWUsXG4gICAgfSxcbiAgXTtcblxuICB1cGRhdGVDb250cm9sQ2hhdEJ1dHRvbnMoKSB7XG4gICAgdGhpcy5jb250cm9sQ2hhdEJ1dHRvbnMgPSB0aGlzLmNvbnRyb2xDaGF0QnV0dG9uc0FycmF5Lm1hcCgoYnV0dG9uKSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5idXR0b24sXG4gICAgICAgIHNob3c6IHR5cGVvZiBidXR0b24uc2hvdyA9PT0gJ2Z1bmN0aW9uJyA/IGJ1dHRvbi5zaG93KCkgOiBidXR0b24uc2hvdyxcbiAgICAgICAgYWN0aXZlOiB0eXBlb2YgYnV0dG9uLmFjdGl2ZSA9PT0gJ2Z1bmN0aW9uJyA/IGJ1dHRvbi5hY3RpdmUoKSA6IGJ1dHRvbi5hY3RpdmUsXG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgc2NyZWVuU2hhcmVXaWRnZXQgPSB7XG4gICAgY29tcG9uZW50OiBTY3JlZW5TaGFyZVdpZGdldCxcbiAgICBpbmplY3RvcjogdGhpcy5jcmVhdGVJbmplY3Rvcih7IGRpc2FibGVkOiAhdGhpcy5zY3JlZW5TaGFyZUFjdGl2ZS52YWx1ZSB9KSxcbiAgfTtcblxuICBjb250cm9sQnV0dG9ucyA9IFtcbiAgICB7XG4gICAgICBpY29uOiB0aGlzLmZhTWljcm9waG9uZVNsYXNoLFxuICAgICAgYWx0ZXJuYXRlSWNvbjogdGhpcy5mYU1pY3JvcGhvbmUsXG4gICAgICBhY3RpdmU6IHRoaXMubWljQWN0aXZlLnZhbHVlLFxuICAgICAgb25QcmVzczogKCkgPT5cbiAgICAgICAgdGhpcy5jbGlja0F1ZGlvLmNsaWNrQXVkaW8oe1xuICAgICAgICAgIHBhcmFtZXRlcnM6IHtcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0QWxsUGFyYW1zKCksXG4gICAgICAgICAgICAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCksXG4gICAgICAgICAgfSxcbiAgICAgICAgfSksXG4gICAgICBhY3RpdmVDb2xvcjogJ2dyZWVuJyxcbiAgICAgIGluQWN0aXZlQ29sb3I6ICdyZWQnLFxuICAgICAgZGlzYWJsZWQ6IHRoaXMuYXVkaW9Td2l0Y2hpbmcudmFsdWUsXG4gICAgICBzaG93OiB0cnVlLFxuICAgIH0sXG4gICAge1xuICAgICAgaWNvbjogdGhpcy5mYVZpZGVvU2xhc2gsXG4gICAgICBhbHRlcm5hdGVJY29uOiB0aGlzLmZhVmlkZW8sXG4gICAgICBhY3RpdmU6IHRoaXMudmlkZW9BY3RpdmUudmFsdWUsXG4gICAgICBvblByZXNzOiAoKSA9PlxuICAgICAgICB0aGlzLmNsaWNrVmlkZW8uY2xpY2tWaWRlbyh7XG4gICAgICAgICAgcGFyYW1ldGVyczoge1xuICAgICAgICAgICAgLi4udGhpcy5nZXRBbGxQYXJhbXMoKSxcbiAgICAgICAgICAgIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSxcbiAgICAgICAgICAgIE1lZGlhU3RyZWFtLFxuICAgICAgICAgICAgTWVkaWFTdHJlYW1UcmFjayxcbiAgICAgICAgICAgIG1lZGlhRGV2aWNlczogTWVkaWFEZXZpY2VzLFxuICAgICAgICAgICAgZGV2aWNlOiB0aGlzLmRldmljZS52YWx1ZSxcbiAgICAgICAgICAgIHNvY2tldDogdGhpcy5zb2NrZXQudmFsdWUsXG4gICAgICAgICAgICBzaG93QWxlcnQ6IHRoaXMuc2hvd0FsZXJ0LmJpbmQodGhpcyksXG4gICAgICAgICAgICBjaGVja1Blcm1pc3Npb246IHRoaXMuY2hlY2tQZXJtaXNzaW9uLmNoZWNrUGVybWlzc2lvbixcbiAgICAgICAgICAgIHN0cmVhbVN1Y2Nlc3NWaWRlbzogdGhpcy5zdHJlYW1TdWNjZXNzVmlkZW8uc3RyZWFtU3VjY2Vzc1ZpZGVvLFxuICAgICAgICAgICAgaGFzQ2FtZXJhUGVybWlzc2lvbjogdGhpcy5oYXNDYW1lcmFQZXJtaXNzaW9uLnZhbHVlLFxuICAgICAgICAgICAgcmVxdWVzdFBlcm1pc3Npb25DYW1lcmE6IHRoaXMucmVxdWVzdFBlcm1pc3Npb25DYW1lcmEuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIGNoZWNrTWVkaWFQZXJtaXNzaW9uOiAnd2ViJyAhPT0gJ3dlYicsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSksXG4gICAgICBhY3RpdmVDb2xvcjogJ2dyZWVuJyxcbiAgICAgIGluQWN0aXZlQ29sb3I6ICdyZWQnLFxuICAgICAgZGlzYWJsZWQ6IHRoaXMudmlkZW9Td2l0Y2hpbmcudmFsdWUsXG4gICAgICBzaG93OiB0cnVlLFxuICAgIH0sXG4gICAge1xuICAgICAgLy9pbnZlcnRlZCBhY3RpdmUgZm9yIGluYWN0aXZlIHN0YXRlXG4gICAgICBpY29uOiBmYURlc2t0b3AsXG4gICAgICBhbHRlcm5hdGVJY29uQ29tcG9uZW50OiB0aGlzLnNjcmVlblNoYXJlV2lkZ2V0LFxuICAgICAgYWN0aXZlOiB0cnVlLFxuICAgICAgb25QcmVzczogKCkgPT5cbiAgICAgICAgdGhpcy5jbGlja1NjcmVlblNoYXJlLmNsaWNrU2NyZWVuU2hhcmUoe1xuICAgICAgICAgIHBhcmFtZXRlcnM6IHtcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0QWxsUGFyYW1zKCksXG4gICAgICAgICAgICAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCksXG4gICAgICAgICAgfSxcbiAgICAgICAgfSksXG4gICAgICBhY3RpdmVDb2xvcjogJ2dyZWVuJyxcbiAgICAgIGluQWN0aXZlQ29sb3I6ICdyZWQnLFxuICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxuICAgICAgc2hvdzogdHJ1ZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGljb246IHRoaXMuZmFQaG9uZSxcbiAgICAgIGFjdGl2ZTogdGhpcy5lbmRDYWxsQWN0aXZlLnZhbHVlLFxuICAgICAgb25QcmVzczogKCkgPT5cbiAgICAgICAgdGhpcy5sYXVuY2hDb25maXJtRXhpdC5sYXVuY2hDb25maXJtRXhpdCh7XG4gICAgICAgICAgdXBkYXRlSXNDb25maXJtRXhpdE1vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc0NvbmZpcm1FeGl0TW9kYWxWaXNpYmxlLmJpbmQodGhpcyksXG4gICAgICAgICAgaXNDb25maXJtRXhpdE1vZGFsVmlzaWJsZTogdGhpcy5pc0NvbmZpcm1FeGl0TW9kYWxWaXNpYmxlLnZhbHVlLFxuICAgICAgICB9KSxcbiAgICAgIGFjdGl2ZUNvbG9yOiAnZ3JlZW4nLFxuICAgICAgaW5BY3RpdmVDb2xvcjogJ3JlZCcsXG4gICAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgICBzaG93OiB0cnVlLFxuICAgIH0sXG4gICAge1xuICAgICAgaWNvbjogdGhpcy5mYVVzZXJzLFxuICAgICAgYWN0aXZlOiB0aGlzLnBhcnRpY2lwYW50c0FjdGl2ZS52YWx1ZSxcbiAgICAgIG9uUHJlc3M6ICgpID0+XG4gICAgICAgIHRoaXMubGF1bmNoUGFydGljaXBhbnRzLmxhdW5jaFBhcnRpY2lwYW50cyh7XG4gICAgICAgICAgdXBkYXRlSXNQYXJ0aWNpcGFudHNNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNQYXJ0aWNpcGFudHNNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcbiAgICAgICAgICBpc1BhcnRpY2lwYW50c01vZGFsVmlzaWJsZTogdGhpcy5pc1BhcnRpY2lwYW50c01vZGFsVmlzaWJsZS52YWx1ZSxcbiAgICAgICAgfSksXG4gICAgICBhY3RpdmVDb2xvcjogJ2JsYWNrJyxcbiAgICAgIGluQWN0aXZlQ29sb3I6ICdibGFjaycsXG4gICAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgICBzaG93OiB0cnVlLFxuICAgIH0sXG4gICAge1xuICAgICAgY3VzdG9tQ29tcG9uZW50OiB0aGlzLm1lbnVXaWRnZXQsXG4gICAgICBjdXN0b21OYW1lOiAnTWVudScsXG4gICAgICBvblByZXNzOiAoKSA9PlxuICAgICAgICB0aGlzLmxhdW5jaE1lbnVNb2RhbC5sYXVuY2hNZW51TW9kYWwoe1xuICAgICAgICAgIHVwZGF0ZUlzTWVudU1vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc01lbnVNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcbiAgICAgICAgICBpc01lbnVNb2RhbFZpc2libGU6IHRoaXMuaXNNZW51TW9kYWxWaXNpYmxlLnZhbHVlLFxuICAgICAgICB9KSxcbiAgICAgIHNob3c6IHRydWUsXG4gICAgfSxcbiAgICB7XG4gICAgICBjdXN0b21Db21wb25lbnQ6IHRoaXMubWVzc2FnZVdpZGdldCxcbiAgICAgIGN1c3RvbU5hbWU6ICdNZXNzYWdlcycsXG4gICAgICBvblByZXNzOiAoKSA9PlxuICAgICAgICB0aGlzLmxhdW5jaE1lc3NhZ2VzLmxhdW5jaE1lc3NhZ2VzKHtcbiAgICAgICAgICB1cGRhdGVJc01lc3NhZ2VzTW9kYWxWaXNpYmxlOiB0aGlzLnVwZGF0ZUlzTWVzc2FnZXNNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcbiAgICAgICAgICBpc01lc3NhZ2VzTW9kYWxWaXNpYmxlOiB0aGlzLmlzTWVzc2FnZXNNb2RhbFZpc2libGUudmFsdWUsXG4gICAgICAgIH0pLFxuICAgICAgc2hvdzogdHJ1ZSxcbiAgICB9LFxuICBdO1xuXG4gIGFzeW5jIGNvbm5lY3RfU29ja2V0KFxuICAgIGFwaVVzZXJOYW1lOiBzdHJpbmcsXG4gICAgYXBpS2V5OiBzdHJpbmcsXG4gICAgYXBpVG9rZW46IHN0cmluZyxcbiAgKTogUHJvbWlzZTxTb2NrZXQgfCBudWxsPiB7XG4gICAgaWYgKHRoaXMuc29ja2V0LnZhbHVlICYmIHRoaXMuc29ja2V0LnZhbHVlLmlkKSB7XG4gICAgICB0aGlzLnNvY2tldC52YWx1ZS5vbignZGlzY29ubmVjdCcsIGFzeW5jICgpID0+IHtcbiAgICAgICAgYXdhaXQgdGhpcy5kaXNjb25uZWN0LmRpc2Nvbm5lY3Qoe1xuICAgICAgICAgIHNob3dBbGVydDogdGhpcy5zaG93QWxlcnQuYmluZCh0aGlzKSxcbiAgICAgICAgICByZWRpcmVjdFVSTDogdGhpcy5yZWRpcmVjdFVSTC52YWx1ZSxcbiAgICAgICAgICBvbldlYjogdHJ1ZSxcbiAgICAgICAgICB1cGRhdGVWYWxpZGF0ZWQ6IHRoaXMudXBkYXRlVmFsaWRhdGVkLmJpbmQodGhpcyksXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAodGhpcy52aWRlb0FscmVhZHlPbi52YWx1ZSkge1xuICAgICAgICAgIGF3YWl0IHRoaXMuY2xpY2tWaWRlby5jbGlja1ZpZGVvKHtcbiAgICAgICAgICAgIHBhcmFtZXRlcnM6IHsgLi4udGhpcy5nZXRBbGxQYXJhbXMoKSwgLi4udGhpcy5tZWRpYVNGVUZ1bmN0aW9ucygpIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuYXVkaW9BbHJlYWR5T24udmFsdWUpIHtcbiAgICAgICAgICBhd2FpdCB0aGlzLmNsaWNrQXVkaW8uY2xpY2tBdWRpbyh7XG4gICAgICAgICAgICBwYXJhbWV0ZXJzOiB7IC4uLnRoaXMuZ2V0QWxsUGFyYW1zKCksIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgYXdhaXQgdGhpcy5jbG9zZUFuZFJlc2V0KCk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5zb2NrZXQudmFsdWUub24oJ2FsbE1lbWJlcnMnLCBhc3luYyAobWVtYmVyc0RhdGE6IEFsbE1lbWJlcnNEYXRhKSA9PiB7XG4gICAgICAgIGlmIChtZW1iZXJzRGF0YSkge1xuICAgICAgICAgIGF3YWl0IHRoaXMuYWxsTWVtYmVycy5hbGxNZW1iZXJzKHtcbiAgICAgICAgICAgIGFwaVVzZXJOYW1lOiBhcGlVc2VyTmFtZSxcbiAgICAgICAgICAgIGFwaUtleTogJycsIC8vbm90IHJlY29tbWVuZGVkIC0gdXNlIGFwaVRva2VuIGluc3RlYWQuIFVzZSBmb3IgdGVzdGluZy9kZXZlbG9wbWVudCBvbmx5XG4gICAgICAgICAgICBhcGlUb2tlbjogYXBpVG9rZW4sXG4gICAgICAgICAgICBtZW1iZXJzOiBtZW1iZXJzRGF0YS5tZW1iZXJzLFxuICAgICAgICAgICAgcmVxdWVzdHNzOiBtZW1iZXJzRGF0YS5yZXF1ZXN0cyA/IG1lbWJlcnNEYXRhLnJlcXVlc3RzIDogdGhpcy5yZXF1ZXN0TGlzdC52YWx1ZSxcbiAgICAgICAgICAgIGNvSG9zdGU6IG1lbWJlcnNEYXRhLmNvSG9zdCA/IG1lbWJlcnNEYXRhLmNvSG9zdCA6IHRoaXMuY29Ib3N0LnZhbHVlLFxuICAgICAgICAgICAgY29Ib3N0UmVzOiBtZW1iZXJzRGF0YS5jb0hvc3RSZXNwb25zaWJpbGl0aWVzXG4gICAgICAgICAgICAgID8gbWVtYmVyc0RhdGEuY29Ib3N0UmVzcG9uc2liaWxpdGllc1xuICAgICAgICAgICAgICA6IHRoaXMuY29Ib3N0UmVzcG9uc2liaWxpdHkudmFsdWUsXG4gICAgICAgICAgICBwYXJhbWV0ZXJzOiB7IC4uLnRoaXMuZ2V0QWxsUGFyYW1zKCksIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSB9LFxuICAgICAgICAgICAgY29uc3VtZV9zb2NrZXRzOiB0aGlzLmNvbnN1bWVfc29ja2V0cy52YWx1ZSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuc29ja2V0LnZhbHVlLm9uKCdhbGxNZW1iZXJzUmVzdCcsIGFzeW5jIChtZW1iZXJzRGF0YTogQWxsTWVtYmVyc1Jlc3REYXRhKSA9PiB7XG4gICAgICAgIGlmIChtZW1iZXJzRGF0YSkge1xuICAgICAgICAgIGF3YWl0IHRoaXMuYWxsTWVtYmVyc1Jlc3QuYWxsTWVtYmVyc1Jlc3Qoe1xuICAgICAgICAgICAgYXBpVXNlck5hbWU6IGFwaVVzZXJOYW1lLFxuICAgICAgICAgICAgYXBpS2V5OiAnJywgLy8gbm90IHJlY29tbWVuZGVkIC0gdXNlIGFwaVRva2VuIGluc3RlYWQuIFVzZSBmb3IgdGVzdGluZy9kZXZlbG9wbWVudCBvbmx5XG4gICAgICAgICAgICBtZW1iZXJzOiBtZW1iZXJzRGF0YS5tZW1iZXJzLFxuICAgICAgICAgICAgYXBpVG9rZW46IGFwaVRva2VuLFxuICAgICAgICAgICAgc2V0dGluZ3M6IG1lbWJlcnNEYXRhLnNldHRpbmdzLFxuICAgICAgICAgICAgY29Ib3N0ZTogbWVtYmVyc0RhdGEuY29Ib3N0ID8gbWVtYmVyc0RhdGEuY29Ib3N0IDogdGhpcy5jb0hvc3QudmFsdWUsXG4gICAgICAgICAgICBjb0hvc3RSZXM6IG1lbWJlcnNEYXRhLmNvSG9zdFJlc3BvbnNpYmlsaXRpZXNcbiAgICAgICAgICAgICAgPyBtZW1iZXJzRGF0YS5jb0hvc3RSZXNwb25zaWJpbGl0aWVzXG4gICAgICAgICAgICAgIDogdGhpcy5jb0hvc3RSZXNwb25zaWJpbGl0eS52YWx1ZSxcbiAgICAgICAgICAgIHBhcmFtZXRlcnM6IHsgLi4udGhpcy5nZXRBbGxQYXJhbXMoKSwgLi4udGhpcy5tZWRpYVNGVUZ1bmN0aW9ucygpIH0sXG4gICAgICAgICAgICBjb25zdW1lX3NvY2tldHM6IHRoaXMuY29uc3VtZV9zb2NrZXRzLnZhbHVlLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5zb2NrZXQudmFsdWUub24oJ3VzZXJXYWl0aW5nJywgYXN5bmMgKHsgbmFtZSB9OiB7IG5hbWU6IHN0cmluZyB9KSA9PiB7XG4gICAgICAgIGF3YWl0IHRoaXMudXNlcldhaXRpbmcudXNlcldhaXRpbmcoe1xuICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgc2hvd0FsZXJ0OiB0aGlzLnNob3dBbGVydC5iaW5kKHRoaXMpLFxuICAgICAgICAgIHRvdGFsUmVxV2FpdDogdGhpcy50b3RhbFJlcVdhaXQudmFsdWUsXG4gICAgICAgICAgdXBkYXRlVG90YWxSZXFXYWl0OiB0aGlzLnVwZGF0ZVRvdGFsUmVxV2FpdC5iaW5kKHRoaXMpLFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnNvY2tldC52YWx1ZS5vbigncGVyc29uSm9pbmVkJywgYXN5bmMgKHsgbmFtZSB9OiB7IG5hbWU6IHN0cmluZyB9KSA9PiB7XG4gICAgICAgIHRoaXMucGVyc29uSm9pbmVkLnBlcnNvbkpvaW5lZCh7XG4gICAgICAgICAgbmFtZSxcbiAgICAgICAgICBzaG93QWxlcnQ6IHRoaXMuc2hvd0FsZXJ0LmJpbmQodGhpcyksXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuc29ja2V0LnZhbHVlLm9uKFxuICAgICAgICAnYWxsV2FpdGluZ1Jvb21NZW1iZXJzJyxcbiAgICAgICAgYXN5bmMgKHdhaXRpbmdfZGF0YTogQWxsV2FpdGluZ1Jvb21NZW1iZXJzRGF0YSkgPT4ge1xuICAgICAgICAgIGF3YWl0IHRoaXMuYWxsV2FpdGluZ1Jvb21NZW1iZXJzLmFsbFdhaXRpbmdSb29tTWVtYmVycyh7XG4gICAgICAgICAgICB3YWl0aW5nUGFydGljaXBhbnRzOiB3YWl0aW5nX2RhdGEud2FpdGluZ1BhcnRpY2lwYW50c1xuICAgICAgICAgICAgICA/IHdhaXRpbmdfZGF0YS53YWl0aW5nUGFydGljaXBhbnRzXG4gICAgICAgICAgICAgIDogd2FpdGluZ19kYXRhLndhaXRpbmdQYXJ0aWNpcGFudHNzXG4gICAgICAgICAgICAgID8gd2FpdGluZ19kYXRhLndhaXRpbmdQYXJ0aWNpcGFudHNzXG4gICAgICAgICAgICAgIDogdGhpcy53YWl0aW5nUm9vbUxpc3QudmFsdWUsXG4gICAgICAgICAgICB1cGRhdGVUb3RhbFJlcVdhaXQ6IHRoaXMudXBkYXRlVG90YWxSZXFXYWl0LmJpbmQodGhpcyksXG4gICAgICAgICAgICB1cGRhdGVXYWl0aW5nUm9vbUxpc3Q6IHRoaXMudXBkYXRlV2FpdGluZ1Jvb21MaXN0LmJpbmQodGhpcyksXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICApO1xuXG4gICAgICB0aGlzLnNvY2tldC52YWx1ZS5vbihcbiAgICAgICAgJ3Jvb21SZWNvcmRQYXJhbXMnLFxuICAgICAgICBhc3luYyAoeyByZWNvcmRQYXJhbXMgfTogeyByZWNvcmRQYXJhbXM6IFJlY29yZFBhcmFtcyB9KSA9PiB7XG4gICAgICAgICAgdGhpcy5yb29tUmVjb3JkUGFyYW1zLnJvb21SZWNvcmRQYXJhbXMoe1xuICAgICAgICAgICAgcmVjb3JkUGFyYW1zLFxuICAgICAgICAgICAgcGFyYW1ldGVyczogeyAuLi50aGlzLmdldEFsbFBhcmFtcygpLCAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCkgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICk7XG5cbiAgICAgIHRoaXMuc29ja2V0LnZhbHVlLm9uKCdiYW4nLCBhc3luYyAoeyBuYW1lIH06IHsgbmFtZTogc3RyaW5nIH0pID0+IHtcbiAgICAgICAgYXdhaXQgdGhpcy5iYW5QYXJ0aWNpcGFudC5iYW5QYXJ0aWNpcGFudCh7XG4gICAgICAgICAgbmFtZSxcbiAgICAgICAgICBwYXJhbWV0ZXJzOiB7IC4uLnRoaXMuZ2V0QWxsUGFyYW1zKCksIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSB9LFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnNvY2tldC52YWx1ZS5vbigndXBkYXRlZENvSG9zdCcsIGFzeW5jIChjb2hvc3RfZGF0YTogVXBkYXRlZENvSG9zdERhdGEpID0+IHtcbiAgICAgICAgYXdhaXQgdGhpcy51cGRhdGVkQ29Ib3N0LnVwZGF0ZWRDb0hvc3Qoe1xuICAgICAgICAgIGNvSG9zdDogY29ob3N0X2RhdGEuY29Ib3N0ID8gY29ob3N0X2RhdGEuY29Ib3N0IDogdGhpcy5jb0hvc3QudmFsdWUsXG4gICAgICAgICAgY29Ib3N0UmVzcG9uc2liaWxpdHk6IGNvaG9zdF9kYXRhLmNvSG9zdFJlc3BvbnNpYmlsaXRpZXNcbiAgICAgICAgICAgID8gY29ob3N0X2RhdGEuY29Ib3N0UmVzcG9uc2liaWxpdGllc1xuICAgICAgICAgICAgOiB0aGlzLmNvSG9zdFJlc3BvbnNpYmlsaXR5LnZhbHVlLFxuICAgICAgICAgIHlvdUFyZUNvSG9zdDogdGhpcy55b3VBcmVDb0hvc3QudmFsdWUsXG4gICAgICAgICAgdXBkYXRlQ29Ib3N0OiB0aGlzLnVwZGF0ZUNvSG9zdC5iaW5kKHRoaXMpLFxuICAgICAgICAgIHVwZGF0ZUNvSG9zdFJlc3BvbnNpYmlsaXR5OiB0aGlzLnVwZGF0ZUNvSG9zdFJlc3BvbnNpYmlsaXR5LmJpbmQodGhpcyksXG4gICAgICAgICAgdXBkYXRlWW91QXJlQ29Ib3N0OiB0aGlzLnVwZGF0ZVlvdUFyZUNvSG9zdC5iaW5kKHRoaXMpLFxuICAgICAgICAgIHNob3dBbGVydDogdGhpcy5zaG93QWxlcnQuYmluZCh0aGlzKSxcbiAgICAgICAgICBldmVudFR5cGU6IHRoaXMuZXZlbnRUeXBlLnZhbHVlLFxuICAgICAgICAgIGlzbGV2ZWw6IHRoaXMuaXNsZXZlbC52YWx1ZSxcbiAgICAgICAgICBtZW1iZXI6IHRoaXMubWVtYmVyLnZhbHVlLFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnNvY2tldC52YWx1ZS5vbihcbiAgICAgICAgJ3BhcnRpY2lwYW50UmVxdWVzdGVkJyxcbiAgICAgICAgYXN5bmMgKHsgdXNlclJlcXVlc3QgfTogeyB1c2VyUmVxdWVzdDogUmVxdWVzdCB9KSA9PiB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5wYXJ0aWNpcGFudFJlcXVlc3RlZC5wYXJ0aWNpcGFudFJlcXVlc3RlZCh7XG4gICAgICAgICAgICB1c2VyUmVxdWVzdCxcbiAgICAgICAgICAgIHJlcXVlc3RMaXN0OiB0aGlzLnJlcXVlc3RMaXN0LnZhbHVlLFxuICAgICAgICAgICAgd2FpdGluZ1Jvb21MaXN0OiB0aGlzLndhaXRpbmdSb29tTGlzdC52YWx1ZSxcbiAgICAgICAgICAgIHVwZGF0ZVRvdGFsUmVxV2FpdDogdGhpcy51cGRhdGVUb3RhbFJlcVdhaXQuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIHVwZGF0ZVJlcXVlc3RMaXN0OiB0aGlzLnVwZGF0ZVJlcXVlc3RMaXN0LmJpbmQodGhpcyksXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICApO1xuXG4gICAgICB0aGlzLnNvY2tldC52YWx1ZS5vbignc2NyZWVuUHJvZHVjZXJJZCcsIGFzeW5jICh7IHByb2R1Y2VySWQgfTogeyBwcm9kdWNlcklkOiBzdHJpbmcgfSkgPT4ge1xuICAgICAgICB0aGlzLnNjcmVlblByb2R1Y2VySWQuc2NyZWVuUHJvZHVjZXJJZCh7XG4gICAgICAgICAgcHJvZHVjZXJJZCxcbiAgICAgICAgICBzY3JlZW5JZDogdGhpcy5zY3JlZW5JZC52YWx1ZSxcbiAgICAgICAgICBtZW1iZXJzUmVjZWl2ZWQ6IHRoaXMubWVtYmVyc1JlY2VpdmVkLnZhbHVlLFxuICAgICAgICAgIHNoYXJlU2NyZWVuU3RhcnRlZDogdGhpcy5zaGFyZVNjcmVlblN0YXJ0ZWQudmFsdWUsXG4gICAgICAgICAgZGVmZXJTY3JlZW5SZWNlaXZlZDogdGhpcy5kZWZlclNjcmVlblJlY2VpdmVkLnZhbHVlLFxuICAgICAgICAgIHBhcnRpY2lwYW50czogdGhpcy5wYXJ0aWNpcGFudHMudmFsdWUsXG4gICAgICAgICAgdXBkYXRlU2NyZWVuSWQ6IHRoaXMudXBkYXRlU2NyZWVuSWQuYmluZCh0aGlzKSxcbiAgICAgICAgICB1cGRhdGVTaGFyZVNjcmVlblN0YXJ0ZWQ6IHRoaXMudXBkYXRlU2hhcmVTY3JlZW5TdGFydGVkLmJpbmQodGhpcyksXG4gICAgICAgICAgdXBkYXRlRGVmZXJTY3JlZW5SZWNlaXZlZDogdGhpcy51cGRhdGVEZWZlclNjcmVlblJlY2VpdmVkLmJpbmQodGhpcyksXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICAvL3NldHRpbmdzLCB1cGRhdGVBdWRpb1NldHRpbmcsIHVwZGF0ZVZpZGVvU2V0dGluZywgdXBkYXRlU2NyZWVuc2hhcmVTZXR0aW5nLCB1cGRhdGVDaGF0U2V0dGluZ1xuICAgICAgdGhpcy5zb2NrZXQudmFsdWUub24oJ3VwZGF0ZU1lZGlhU2V0dGluZ3MnLCBhc3luYyAoeyBzZXR0aW5ncyB9OiB7IHNldHRpbmdzOiBTZXR0aW5ncyB9KSA9PiB7XG4gICAgICAgIHRoaXMudXBkYXRlTWVkaWFTZXR0aW5ncy51cGRhdGVNZWRpYVNldHRpbmdzKHtcbiAgICAgICAgICBzZXR0aW5ncyxcbiAgICAgICAgICB1cGRhdGVBdWRpb1NldHRpbmc6IHRoaXMudXBkYXRlQXVkaW9TZXR0aW5nLmJpbmQodGhpcyksXG4gICAgICAgICAgdXBkYXRlVmlkZW9TZXR0aW5nOiB0aGlzLnVwZGF0ZVZpZGVvU2V0dGluZy5iaW5kKHRoaXMpLFxuICAgICAgICAgIHVwZGF0ZVNjcmVlbnNoYXJlU2V0dGluZzogdGhpcy51cGRhdGVTY3JlZW5zaGFyZVNldHRpbmcuYmluZCh0aGlzKSxcbiAgICAgICAgICB1cGRhdGVDaGF0U2V0dGluZzogdGhpcy51cGRhdGVDaGF0U2V0dGluZy5iaW5kKHRoaXMpLFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnNvY2tldC52YWx1ZS5vbihcbiAgICAgICAgJ3Byb2R1Y2VyLW1lZGlhLXBhdXNlZCcsXG4gICAgICAgIGFzeW5jICh7XG4gICAgICAgICAgcHJvZHVjZXJJZCxcbiAgICAgICAgICBraW5kLFxuICAgICAgICAgIG5hbWUsXG4gICAgICAgIH06IHtcbiAgICAgICAgICBwcm9kdWNlcklkOiBzdHJpbmc7XG4gICAgICAgICAga2luZDogJ3ZpZGVvJyB8ICdhdWRpbycgfCAnc2NyZWVuc2hhcmUnIHwgJ3NjcmVlbic7XG4gICAgICAgICAgbmFtZTogc3RyaW5nO1xuICAgICAgICB9KSA9PiB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5wcm9kdWNlck1lZGlhUGF1c2VkLnByb2R1Y2VyTWVkaWFQYXVzZWQoe1xuICAgICAgICAgICAgcHJvZHVjZXJJZCxcbiAgICAgICAgICAgIGtpbmQsXG4gICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgcGFyYW1ldGVyczogeyAuLi50aGlzLmdldEFsbFBhcmFtcygpLCAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCkgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICk7XG5cbiAgICAgIHRoaXMuc29ja2V0LnZhbHVlLm9uKFxuICAgICAgICAncHJvZHVjZXItbWVkaWEtcmVzdW1lZCcsXG4gICAgICAgIGFzeW5jICh7IGtpbmQsIG5hbWUgfTogeyBraW5kOiAnYXVkaW8nOyBuYW1lOiBzdHJpbmcgfSkgPT4ge1xuICAgICAgICAgIGF3YWl0IHRoaXMucHJvZHVjZXJNZWRpYVJlc3VtZWQucHJvZHVjZXJNZWRpYVJlc3VtZWQoe1xuICAgICAgICAgICAga2luZCxcbiAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICBwYXJhbWV0ZXJzOiB7IC4uLnRoaXMuZ2V0QWxsUGFyYW1zKCksIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgKTtcblxuICAgICAgdGhpcy5zb2NrZXQudmFsdWUub24oXG4gICAgICAgICdwcm9kdWNlci1tZWRpYS1jbG9zZWQnLFxuICAgICAgICBhc3luYyAoe1xuICAgICAgICAgIHByb2R1Y2VySWQsXG4gICAgICAgICAga2luZCxcbiAgICAgICAgfToge1xuICAgICAgICAgIHByb2R1Y2VySWQ6IHN0cmluZztcbiAgICAgICAgICBraW5kOiAndmlkZW8nIHwgJ2F1ZGlvJyB8ICdzY3JlZW5zaGFyZScgfCAnc2NyZWVuJztcbiAgICAgICAgfSkgPT4ge1xuICAgICAgICAgIGlmIChwcm9kdWNlcklkICYmIGtpbmQpIHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucHJvZHVjZXJNZWRpYUNsb3NlZC5wcm9kdWNlck1lZGlhQ2xvc2VkKHtcbiAgICAgICAgICAgICAgcHJvZHVjZXJJZCxcbiAgICAgICAgICAgICAga2luZCxcbiAgICAgICAgICAgICAgcGFyYW1ldGVyczogeyAuLi50aGlzLmdldEFsbFBhcmFtcygpLCAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCkgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICk7XG5cbiAgICAgIHRoaXMuc29ja2V0LnZhbHVlLm9uKFxuICAgICAgICAnY29udHJvbE1lZGlhSG9zdCcsXG4gICAgICAgIGFzeW5jICh7IHR5cGUgfTogeyB0eXBlOiAndmlkZW8nIHwgJ2F1ZGlvJyB8ICdzY3JlZW5zaGFyZScgfCAnY2hhdCcgfCAnYWxsJyB9KSA9PiB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5jb250cm9sTWVkaWFIb3N0LmNvbnRyb2xNZWRpYUhvc3Qoe1xuICAgICAgICAgICAgdHlwZSxcbiAgICAgICAgICAgIHBhcmFtZXRlcnM6IHsgLi4udGhpcy5nZXRBbGxQYXJhbXMoKSwgLi4udGhpcy5tZWRpYVNGVUZ1bmN0aW9ucygpIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICApO1xuXG4gICAgICB0aGlzLnNvY2tldC52YWx1ZS5vbignbWVldGluZ0VuZGVkJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBhd2FpdCB0aGlzLm1lZXRpbmdFbmRlZC5tZWV0aW5nRW5kZWQoe1xuICAgICAgICAgIHNob3dBbGVydDogdGhpcy5zaG93QWxlcnQuYmluZCh0aGlzKSxcbiAgICAgICAgICByZWRpcmVjdFVSTDogdGhpcy5yZWRpcmVjdFVSTC52YWx1ZSxcbiAgICAgICAgICBvbldlYjogdHJ1ZSxcbiAgICAgICAgICBldmVudFR5cGU6IHRoaXMuZXZlbnRUeXBlLnZhbHVlLFxuICAgICAgICAgIHVwZGF0ZVZhbGlkYXRlZDogdGhpcy51cGRhdGVWYWxpZGF0ZWQuYmluZCh0aGlzKSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHRoaXMudmlkZW9BbHJlYWR5T24udmFsdWUpIHtcbiAgICAgICAgICBhd2FpdCB0aGlzLmNsaWNrVmlkZW8uY2xpY2tWaWRlbyh7XG4gICAgICAgICAgICBwYXJhbWV0ZXJzOiB7XG4gICAgICAgICAgICAgIC4uLnRoaXMuZ2V0QWxsUGFyYW1zKCksXG4gICAgICAgICAgICAgIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuYXVkaW9BbHJlYWR5T24udmFsdWUpIHtcbiAgICAgICAgICBhd2FpdCB0aGlzLmNsaWNrQXVkaW8uY2xpY2tBdWRpbyh7XG4gICAgICAgICAgICBwYXJhbWV0ZXJzOiB7XG4gICAgICAgICAgICAgIC4uLnRoaXMuZ2V0QWxsUGFyYW1zKCksXG4gICAgICAgICAgICAgIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBhd2FpdCB0aGlzLmNsb3NlQW5kUmVzZXQoKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnNvY2tldC52YWx1ZS5vbignZGlzY29ubmVjdFVzZXJTZWxmJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBhd2FpdCB0aGlzLmRpc2Nvbm5lY3RVc2VyU2VsZi5kaXNjb25uZWN0VXNlclNlbGYoe1xuICAgICAgICAgIHNvY2tldDogdGhpcy5zb2NrZXQudmFsdWUsXG4gICAgICAgICAgbWVtYmVyOiB0aGlzLm1lbWJlci52YWx1ZSxcbiAgICAgICAgICByb29tTmFtZTogdGhpcy5yb29tTmFtZS52YWx1ZSxcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5zb2NrZXQudmFsdWUub24oJ3JlY2VpdmVNZXNzYWdlJywgYXN5bmMgKHsgbWVzc2FnZSB9OiB7IG1lc3NhZ2U6IE1lc3NhZ2UgfSkgPT4ge1xuICAgICAgICBhd2FpdCB0aGlzLnJlY2VpdmVNZXNzYWdlLnJlY2VpdmVNZXNzYWdlKHtcbiAgICAgICAgICBtZXNzYWdlLFxuICAgICAgICAgIG1lc3NhZ2VzOiB0aGlzLm1lc3NhZ2VzLnZhbHVlLFxuICAgICAgICAgIHBhcnRpY2lwYW50c0FsbDogdGhpcy5wYXJ0aWNpcGFudHNBbGwudmFsdWUsXG4gICAgICAgICAgbWVtYmVyOiB0aGlzLm1lbWJlci52YWx1ZSxcbiAgICAgICAgICBldmVudFR5cGU6IHRoaXMuZXZlbnRUeXBlLnZhbHVlLFxuICAgICAgICAgIGlzbGV2ZWw6IHRoaXMuaXNsZXZlbC52YWx1ZSxcbiAgICAgICAgICBjb0hvc3Q6IHRoaXMuY29Ib3N0LnZhbHVlLFxuICAgICAgICAgIHVwZGF0ZU1lc3NhZ2VzOiB0aGlzLnVwZGF0ZU1lc3NhZ2VzLmJpbmQodGhpcyksXG4gICAgICAgICAgdXBkYXRlU2hvd01lc3NhZ2VzQmFkZ2U6IHRoaXMudXBkYXRlU2hvd01lc3NhZ2VzQmFkZ2UuYmluZCh0aGlzKSxcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5zb2NrZXQudmFsdWUub24oXG4gICAgICAgICdtZWV0aW5nVGltZVJlbWFpbmluZycsXG4gICAgICAgIGFzeW5jICh7IHRpbWVSZW1haW5pbmcgfTogeyB0aW1lUmVtYWluaW5nOiBudW1iZXIgfSkgPT4ge1xuICAgICAgICAgIGF3YWl0IHRoaXMubWVldGluZ1RpbWVSZW1haW5pbmcubWVldGluZ1RpbWVSZW1haW5pbmcoe1xuICAgICAgICAgICAgdGltZVJlbWFpbmluZyxcbiAgICAgICAgICAgIHNob3dBbGVydDogdGhpcy5zaG93QWxlcnQuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIGV2ZW50VHlwZTogdGhpcy5ldmVudFR5cGUudmFsdWUsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICApO1xuXG4gICAgICB0aGlzLnNvY2tldC52YWx1ZS5vbignbWVldGluZ1N0aWxsVGhlcmUnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIHRoaXMubWVldGluZ1N0aWxsVGhlcmUubWVldGluZ1N0aWxsVGhlcmUoe1xuICAgICAgICAgIHVwZGF0ZUlzQ29uZmlybUhlcmVNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNDb25maXJtSGVyZU1vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnNvY2tldC52YWx1ZS5vbignc3RhcnRSZWNvcmRzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBhd2FpdCB0aGlzLnN0YXJ0UmVjb3Jkcy5zdGFydFJlY29yZHMoe1xuICAgICAgICAgIHJvb21OYW1lOiB0aGlzLnJvb21OYW1lLnZhbHVlLFxuICAgICAgICAgIG1lbWJlcjogdGhpcy5tZW1iZXIudmFsdWUsXG4gICAgICAgICAgc29ja2V0OiB0aGlzLnNvY2tldC52YWx1ZSxcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5zb2NrZXQudmFsdWUub24oJ3JlSW5pdGlhdGVSZWNvcmRpbmcnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGF3YWl0IHRoaXMucmVJbml0aWF0ZVJlY29yZGluZy5yZUluaXRpYXRlUmVjb3JkaW5nKHtcbiAgICAgICAgICByb29tTmFtZTogdGhpcy5yb29tTmFtZS52YWx1ZSxcbiAgICAgICAgICBtZW1iZXI6IHRoaXMubWVtYmVyLnZhbHVlLFxuICAgICAgICAgIHNvY2tldDogdGhpcy5zb2NrZXQudmFsdWUsXG4gICAgICAgICAgYWRtaW5SZXN0cmljdFNldHRpbmc6IHRoaXMuYWRtaW5SZXN0cmljdFNldHRpbmcudmFsdWUsXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuc29ja2V0LnZhbHVlLm9uKFxuICAgICAgICAndXBkYXRlQ29uc3VtaW5nRG9tYWlucycsXG4gICAgICAgIGFzeW5jICh7IGRvbWFpbnMsIGFsdF9kb21haW5zIH06IFVwZGF0ZUNvbnN1bWluZ0RvbWFpbnNEYXRhKSA9PiB7XG4gICAgICAgICAgYXdhaXQgdGhpcy51cGRhdGVDb25zdW1pbmdEb21haW5zLnVwZGF0ZUNvbnN1bWluZ0RvbWFpbnMoe1xuICAgICAgICAgICAgZG9tYWlucyxcbiAgICAgICAgICAgIGFsdF9kb21haW5zLFxuICAgICAgICAgICAgYXBpVXNlck5hbWUsXG4gICAgICAgICAgICBhcGlLZXksXG4gICAgICAgICAgICBhcGlUb2tlbixcbiAgICAgICAgICAgIHBhcmFtZXRlcnM6IHtcbiAgICAgICAgICAgICAgLi4udGhpcy5nZXRBbGxQYXJhbXMoKSxcbiAgICAgICAgICAgICAgLi4udGhpcy5tZWRpYVNGVUZ1bmN0aW9ucygpLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICk7XG5cbiAgICAgIHRoaXMuc29ja2V0LnZhbHVlLm9uKFxuICAgICAgICAnUmVjb3JkaW5nTm90aWNlJyxcbiAgICAgICAgYXN5bmMgKHsgc3RhdGUsIHVzZXJSZWNvcmRpbmdQYXJhbSwgcGF1c2VDb3VudCwgdGltZURvbmUgfTogUmVjb3JkaW5nTm90aWNlRGF0YSkgPT4ge1xuICAgICAgICAgIGF3YWl0IHRoaXMucmVjb3JkaW5nTm90aWNlLlJlY29yZGluZ05vdGljZSh7XG4gICAgICAgICAgICBzdGF0ZSxcbiAgICAgICAgICAgIHVzZXJSZWNvcmRpbmdQYXJhbSxcbiAgICAgICAgICAgIHBhdXNlQ291bnQsXG4gICAgICAgICAgICB0aW1lRG9uZSxcbiAgICAgICAgICAgIHBhcmFtZXRlcnM6IHsgLi4udGhpcy5nZXRBbGxQYXJhbXMoKSwgLi4udGhpcy5tZWRpYVNGVUZ1bmN0aW9ucygpIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICApO1xuXG4gICAgICB0aGlzLnNvY2tldC52YWx1ZS5vbigndGltZUxlZnRSZWNvcmRpbmcnLCBhc3luYyAoeyB0aW1lTGVmdCB9OiB7IHRpbWVMZWZ0OiBudW1iZXIgfSkgPT4ge1xuICAgICAgICB0aGlzLnRpbWVMZWZ0UmVjb3JkaW5nLnRpbWVMZWZ0UmVjb3JkaW5nKHtcbiAgICAgICAgICB0aW1lTGVmdCxcbiAgICAgICAgICBzaG93QWxlcnQ6IHRoaXMuc2hvd0FsZXJ0LmJpbmQodGhpcyksXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuc29ja2V0LnZhbHVlLm9uKFxuICAgICAgICAnc3RvcHBlZFJlY29yZGluZycsXG4gICAgICAgIGFzeW5jICh7IHN0YXRlLCByZWFzb24gfTogeyBzdGF0ZTogc3RyaW5nOyByZWFzb246IHN0cmluZyB9KSA9PiB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5zdG9wcGVkUmVjb3JkaW5nLnN0b3BwZWRSZWNvcmRpbmcoe1xuICAgICAgICAgICAgc3RhdGUsXG4gICAgICAgICAgICByZWFzb24sXG4gICAgICAgICAgICBzaG93QWxlcnQ6IHRoaXMuc2hvd0FsZXJ0LmJpbmQodGhpcyksXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICApO1xuICAgICAgdGhpcy5zb2NrZXQudmFsdWUub24oXG4gICAgICAgICdob3N0UmVxdWVzdFJlc3BvbnNlJyxcbiAgICAgICAgKHsgcmVxdWVzdFJlc3BvbnNlIH06IEhvc3RSZXF1ZXN0UmVzcG9uc2VEYXRhKSA9PiB7XG4gICAgICAgICAgdGhpcy5ob3N0UmVxdWVzdFJlc3BvbnNlLmhvc3RSZXF1ZXN0UmVzcG9uc2Uoe1xuICAgICAgICAgICAgcmVxdWVzdFJlc3BvbnNlLFxuICAgICAgICAgICAgc2hvd0FsZXJ0OiB0aGlzLnNob3dBbGVydC5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgcmVxdWVzdExpc3Q6IHRoaXMucmVxdWVzdExpc3QudmFsdWUsXG4gICAgICAgICAgICB1cGRhdGVSZXF1ZXN0TGlzdDogdGhpcy51cGRhdGVSZXF1ZXN0TGlzdC5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgdXBkYXRlTWljQWN0aW9uOiB0aGlzLnVwZGF0ZU1pY0FjdGlvbi5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgdXBkYXRlVmlkZW9BY3Rpb246IHRoaXMudXBkYXRlVmlkZW9BY3Rpb24uYmluZCh0aGlzKSxcbiAgICAgICAgICAgIHVwZGF0ZVNjcmVlbkFjdGlvbjogdGhpcy51cGRhdGVTY3JlZW5BY3Rpb24uYmluZCh0aGlzKSxcbiAgICAgICAgICAgIHVwZGF0ZUNoYXRBY3Rpb246IHRoaXMudXBkYXRlQ2hhdEFjdGlvbi5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgdXBkYXRlQXVkaW9SZXF1ZXN0U3RhdGU6IHRoaXMudXBkYXRlQXVkaW9SZXF1ZXN0U3RhdGUuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIHVwZGF0ZVZpZGVvUmVxdWVzdFN0YXRlOiB0aGlzLnVwZGF0ZVZpZGVvUmVxdWVzdFN0YXRlLmJpbmQodGhpcyksXG4gICAgICAgICAgICB1cGRhdGVTY3JlZW5SZXF1ZXN0U3RhdGU6IHRoaXMudXBkYXRlU2NyZWVuUmVxdWVzdFN0YXRlLmJpbmQodGhpcyksXG4gICAgICAgICAgICB1cGRhdGVDaGF0UmVxdWVzdFN0YXRlOiB0aGlzLnVwZGF0ZUNoYXRSZXF1ZXN0U3RhdGUuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIHVwZGF0ZUF1ZGlvUmVxdWVzdFRpbWU6IHRoaXMudXBkYXRlQXVkaW9SZXF1ZXN0VGltZS5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgdXBkYXRlVmlkZW9SZXF1ZXN0VGltZTogdGhpcy51cGRhdGVWaWRlb1JlcXVlc3RUaW1lLmJpbmQodGhpcyksXG4gICAgICAgICAgICB1cGRhdGVTY3JlZW5SZXF1ZXN0VGltZTogdGhpcy51cGRhdGVTY3JlZW5SZXF1ZXN0VGltZS5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgdXBkYXRlQ2hhdFJlcXVlc3RUaW1lOiB0aGlzLnVwZGF0ZUNoYXRSZXF1ZXN0VGltZS5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgdXBkYXRlUmVxdWVzdEludGVydmFsU2Vjb25kczogdGhpcy51cGRhdGVSZXF1ZXN0SW50ZXJ2YWxTZWNvbmRzLnZhbHVlLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgKTtcbiAgICAgIHRoaXMuc29ja2V0LnZhbHVlLm9uKCdwb2xsVXBkYXRlZCcsIGFzeW5jIChkYXRhOiBQb2xsVXBkYXRlZERhdGEpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBhd2FpdCB0aGlzLnBvbGxVcGRhdGVkLnBvbGxVcGRhdGVkKHtcbiAgICAgICAgICAgIGRhdGEsXG4gICAgICAgICAgICBwb2xsczogdGhpcy5wb2xscy52YWx1ZSxcbiAgICAgICAgICAgIHBvbGw6IHRoaXMucG9sbC52YWx1ZSA/IHRoaXMucG9sbC52YWx1ZSA6ICh7fSBhcyBQb2xsKSxcbiAgICAgICAgICAgIG1lbWJlcjogdGhpcy5tZW1iZXIudmFsdWUsXG4gICAgICAgICAgICBpc2xldmVsOiB0aGlzLmlzbGV2ZWwudmFsdWUsXG4gICAgICAgICAgICBzaG93QWxlcnQ6IHRoaXMuc2hvd0FsZXJ0LmJpbmQodGhpcyksXG4gICAgICAgICAgICB1cGRhdGVQb2xsczogdGhpcy51cGRhdGVQb2xscy5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgdXBkYXRlUG9sbDogdGhpcy51cGRhdGVQb2xsLmJpbmQodGhpcyksXG4gICAgICAgICAgICB1cGRhdGVJc1BvbGxNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNQb2xsTW9kYWxWaXNpYmxlLmJpbmQodGhpcyksXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgIC8qIGhhbmRsZSBlcnJvciAqL1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5zb2NrZXQudmFsdWUub24oJ2JyZWFrb3V0Um9vbVVwZGF0ZWQnLCBhc3luYyAoZGF0YTogQnJlYWtvdXRSb29tVXBkYXRlZERhdGEpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBhd2FpdCB0aGlzLmJyZWFrb3V0Um9vbVVwZGF0ZWQuYnJlYWtvdXRSb29tVXBkYXRlZCh7XG4gICAgICAgICAgICBkYXRhLFxuICAgICAgICAgICAgcGFyYW1ldGVyczogeyAuLi50aGlzLmdldEFsbFBhcmFtcygpLCAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCkgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgLyogaGFuZGxlIGVycm9yICovXG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBhd2FpdCB0aGlzLmpvaW5fUm9vbSh7XG4gICAgICAgIHNvY2tldDogdGhpcy5zb2NrZXQudmFsdWUsXG4gICAgICAgIHJvb21OYW1lOiB0aGlzLnJvb21OYW1lLnZhbHVlLFxuICAgICAgICBpc2xldmVsOiB0aGlzLmlzbGV2ZWwudmFsdWUsXG4gICAgICAgIG1lbWJlcjogdGhpcy5tZW1iZXIudmFsdWUsXG4gICAgICAgIHNlYzogdGhpcy5hcGlUb2tlbi52YWx1ZSxcbiAgICAgICAgYXBpVXNlck5hbWU6IHRoaXMuYXBpVXNlck5hbWUudmFsdWUsXG4gICAgICB9KTtcbiAgICAgIGF3YWl0IHRoaXMucmVjZWl2ZVJvb21NZXNzYWdlcy5yZWNlaXZlUm9vbU1lc3NhZ2VzKHtcbiAgICAgICAgc29ja2V0OiB0aGlzLnNvY2tldC52YWx1ZSxcbiAgICAgICAgcm9vbU5hbWU6IHRoaXMucm9vbU5hbWUudmFsdWUsXG4gICAgICAgIHVwZGF0ZU1lc3NhZ2VzOiB0aGlzLnVwZGF0ZU1lc3NhZ2VzLmJpbmQodGhpcyksXG4gICAgICB9KTtcbiAgICAgIHRoaXMucHJlcG9wdWxhdGVVc2VyTWVkaWEucHJlcG9wdWxhdGVVc2VyTWVkaWEoe1xuICAgICAgICBuYW1lOiB0aGlzLmhvc3RMYWJlbC52YWx1ZSxcbiAgICAgICAgcGFyYW1ldGVyczogeyAuLi50aGlzLmdldEFsbFBhcmFtcygpLCAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCkgfSxcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gdGhpcy5zb2NrZXQudmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxufVxuIl19