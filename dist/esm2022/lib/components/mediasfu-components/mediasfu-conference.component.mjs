import { Component, HostListener, Injector, Input, } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { faPlayCircle, faPauseCircle, faStopCircle, faDotCircle, faRecordVinyl, faCog, faUsers, faClock, faUserPlus, faTools, faDesktop, faPoll, faUserFriends, faChalkboardTeacher, faMicrophone, faMicrophoneSlash, faVideo, faVideoSlash, faPhone, faBars, faComments, faChartBar, } from '@fortawesome/free-solid-svg-icons';
import { initialValuesState } from '../../methods/utils/initial-values.util';
import { MainAspectComponent } from '../display-components/main-aspect-component/main-aspect-component.component';
import { LoadingModal } from '../display-components/loading-modal/loading-modal.component';
import { ControlButtonsComponent } from '../display-components/control-buttons-component/control-buttons-component.component';
import { ControlButtonsAltComponent } from '../display-components/control-buttons-alt-component/control-buttons-alt-component.component';
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
import * as i109 from "../../consumers/stream-success-video.service";
import * as i110 from "../../consumers/stream-success-audio.service";
import * as i111 from "../../consumers/stream-success-screen.service";
import * as i112 from "../../consumers/stream-success-audio-switch.service";
import * as i113 from "../../consumers/check-permission.service";
import * as i114 from "../../producers/socket-receive-methods/update-consuming-domains.service";
import * as i115 from "../../consumers/receive-room-messages.service";
import * as i116 from "@angular/common";
/**
 * MediasfuConference component creates an interactive conference interface, supporting breakout rooms, chat, video and audio management, and custom controls.
 *
 * @component
 * @selector app-mediasfu-conference
 * @standalone true
 * @imports [RouterOutlet, CommonModule, BreakoutRoomsModal, BackgroundModal, CoHostModal, AlertComponent, AudioGrid, ControlButtonsAltComponent, ControlButtonsComponent, FlexibleGrid, FlexibleVideo, LoadingModal, Pagination, SubAspectComponent, DisplaySettingsModal, EventSettingsModal, ConfirmExitModal, MediaSettingsModal, MenuModal, MessagesModal, ConfirmHereModal, ShareEventModal, WelcomePage, ParticipantsModal, PollModal, RecordingModal, RequestsModal, MainAspectComponent, MainContainerComponent, MainGridComponent, MainScreenComponent, OtherGridComponent, Screenboard, ScreenboardModal, Whiteboard, ConfigureWhiteboardModal, WaitingRoomModal, MenuWidget, MessageWidget, MenuRecordWidget, RecordTimerWidget, MenuParticipantsWidget, ScreenShareWidget]
 *
 * @template
 * The template includes:
 * - Conditional rendering for PrejoinPage or WelcomePage component.
 * - A main content area with modular components for grid layouts, video streaming, and sub-aspect controls.
 * - Modals for participants, settings, recording, breakout rooms, and more, to enhance interactivity and customization in conference settings.
 *
 * @input {any} PrejoinPage - Component for the prejoin page (defaults to WelcomePage).
 * @input {{ apiUserName: string; apiKey: string }} credentials - API credentials for MediaSFU.
 * @input {boolean} useLocalUIMode - Toggles local UI mode.
 * @input {SeedData} seedData - Optional seed data for initializing components.
 * @input {boolean} useSeed - Enables use of seed data.
 * @input {string} imgSrc - Image source for branding or logos.
 *
 * @property {string} title - The title of the component, defaults to "MediaSFU-Conference".
 *
 * @styles
 * Customizable styles for component layout, overflow, and specific modal appearances.
 *
 * @providers [CookieService] - Service for managing cookies within the component.
 *
 * @constructor
 * @class MediasfuConference
 * @implements OnInit, OnDestroy
 *
 * @method ngOnInit - Initializes configurations and input parameters.
 * @method ngOnDestroy - Handles cleanup of event listeners or intervals.
 *
 * @example
 * ```html
 * <app-mediasfu-conference
 *   [PrejoinPage]="CustomPrejoinComponent"
 *   [credentials]="{ apiUserName: 'username', apiKey: 'apikey' }"
 *   [useLocalUIMode]="true"
 *   [seedData]="seedDataObject"
 *   [useSeed]="true"
 *   imgSrc="https://example.com/logo.png">
 * </app-mediasfu-conference>
 * ```
 */
export class MediasfuConference {
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
    title = 'MediaSFU-Conference';
    mainHeightWidthSubscription;
    validatedSubscription;
    islevelSubscription;
    coHostSubscription;
    buttonSubscriptions = [];
    ScreenboardSubscription;
    recordingSubscription;
    constructor(cdr, injector, updateMiniCardsGrid, mixStreams, dispStreams, stopShareScreen, checkScreenShare, startShareScreen, requestScreenShare, reorderStreams, prepopulateUserMedia, getVideos, rePort, trigger, consumerResume, connectSendTransport, connectSendTransportAudio, connectSendTransportVideo, connectSendTransportScreen, processConsumerTransports, resumePauseStreams, readjust, checkGrid, getEstimate, calculateRowsAndColumns, addVideosGrid, onScreenChanges, changeVids, compareActiveNames, compareScreenStates, createSendTransport, resumeSendTransportAudio, receiveAllPipedTransports, disconnectSendTransportVideo, disconnectSendTransportAudio, disconnectSendTransportScreen, getPipedProducersAlt, signalNewConsumerTransport, connectRecvTransport, reUpdateInter, updateParticipantAudioDecibels, closeAndResize, autoAdjust, switchUserVideoAlt, switchUserVideo, switchUserAudio, getDomains, formatNumber, connectIps, createDeviceClient, handleCreatePoll, handleEndPoll, handleVotePoll, captureCanvasStream, resumePauseAudioStreams, processConsumerTransportsAudio, launchMenuModal, launchRecording, startRecording, confirmRecording, launchWaiting, launchCoHost, launchMediaSettings, launchDisplaySettings, launchSettings, launchRequests, launchParticipants, launchMessages, launchConfirmExit, launchPoll, launchBreakoutRooms, launchConfigureWhiteboard, startMeetingProgressTimer, updateRecording, stopRecording, userWaiting, personJoined, allWaitingRoomMembers, roomRecordParams, banParticipant, updatedCoHost, participantRequested, screenProducerId, updateMediaSettings, producerMediaPaused, producerMediaResumed, producerMediaClosed, controlMediaHost, meetingEnded, disconnectUserSelf, receiveMessage, meetingTimeRemaining, meetingStillThere, startRecords, reInitiateRecording, recordingNotice, timeLeftRecording, stoppedRecording, hostRequestResponse, allMembers, allMembersRest, disconnect, pollUpdated, breakoutRoomUpdated, socketManager, joinRoomClient, updateRoomParametersClient, clickVideo, clickAudio, clickScreenShare, streamSuccessVideo, streamSuccessAudio, streamSuccessScreen, streamSuccessAudioSwitch, checkPermission, updateConsumingDomains, receiveRoomMessages) {
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
    eventType = new BehaviorSubject('conference');
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
            }
        });
        this.coHostSubscription = combineLatest([this.coHost, this.coHostResponsibility]).subscribe(([coHost, coHostResponsibility]) => {
            if (coHost || coHostResponsibility) {
                this.updateCustomMenuButtons();
            }
        });
        // Subscribe to changes in BehaviorSubject and update the buttons accordingly
        this.buttonSubscriptions.push(this.micActive.subscribe((value) => {
            this.updateButtonState('micActive', value);
        }));
        this.buttonSubscriptions.push(this.videoActive.subscribe((value) => {
            this.updateButtonState('videoActive', value);
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
    faPhone = faPhone;
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: MediasfuConference, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.Injector }, { token: i1.UpdateMiniCardsGrid }, { token: i2.MixStreams }, { token: i3.DispStreams }, { token: i4.StopShareScreen }, { token: i5.CheckScreenShare }, { token: i6.StartShareScreen }, { token: i7.RequestScreenShare }, { token: i8.ReorderStreams }, { token: i9.PrepopulateUserMedia }, { token: i10.GetVideos }, { token: i11.RePort }, { token: i12.Trigger }, { token: i13.ConsumerResume }, { token: i14.ConnectSendTransport }, { token: i15.ConnectSendTransportAudio }, { token: i16.ConnectSendTransportVideo }, { token: i17.ConnectSendTransportScreen }, { token: i18.ProcessConsumerTransports }, { token: i19.ResumePauseStreams }, { token: i20.Readjust }, { token: i21.CheckGrid }, { token: i22.GetEstimate }, { token: i23.CalculateRowsAndColumns }, { token: i24.AddVideosGrid }, { token: i25.OnScreenChanges }, { token: i26.ChangeVids }, { token: i27.CompareActiveNames }, { token: i28.CompareScreenStates }, { token: i29.CreateSendTransport }, { token: i30.ResumeSendTransportAudio }, { token: i31.ReceiveAllPipedTransports }, { token: i32.DisconnectSendTransportVideo }, { token: i33.DisconnectSendTransportAudio }, { token: i34.DisconnectSendTransportScreen }, { token: i35.GetPipedProducersAlt }, { token: i36.SignalNewConsumerTransport }, { token: i37.ConnectRecvTransport }, { token: i38.ReUpdateInter }, { token: i39.UpdateParticipantAudioDecibels }, { token: i40.CloseAndResize }, { token: i41.AutoAdjust }, { token: i42.SwitchUserVideoAlt }, { token: i43.SwitchUserVideo }, { token: i44.SwitchUserAudio }, { token: i45.GetDomains }, { token: i46.FormatNumber }, { token: i47.ConnectIps }, { token: i48.CreateDeviceClient }, { token: i49.HandleCreatePoll }, { token: i50.HandleEndPoll }, { token: i51.HandleVotePoll }, { token: i52.CaptureCanvasStream }, { token: i53.ResumePauseAudioStreams }, { token: i54.ProcessConsumerTransportsAudio }, { token: i55.LaunchMenuModal }, { token: i56.LaunchRecording }, { token: i57.StartRecording }, { token: i58.ConfirmRecording }, { token: i59.LaunchWaiting }, { token: i60.launchCoHost }, { token: i61.LaunchMediaSettings }, { token: i62.LaunchDisplaySettings }, { token: i63.LaunchSettings }, { token: i64.LaunchRequests }, { token: i65.LaunchParticipants }, { token: i66.LaunchMessages }, { token: i67.LaunchConfirmExit }, { token: i68.LaunchPoll }, { token: i69.LaunchBreakoutRooms }, { token: i70.LaunchConfigureWhiteboard }, { token: i71.StartMeetingProgressTimer }, { token: i72.UpdateRecording }, { token: i73.StopRecording }, { token: i74.UserWaiting }, { token: i75.PersonJoined }, { token: i76.AllWaitingRoomMembers }, { token: i77.RoomRecordParams }, { token: i78.BanParticipant }, { token: i79.UpdatedCoHost }, { token: i80.ParticipantRequested }, { token: i81.ScreenProducerId }, { token: i82.UpdateMediaSettings }, { token: i83.ProducerMediaPaused }, { token: i84.ProducerMediaResumed }, { token: i85.ProducerMediaClosed }, { token: i86.ControlMediaHost }, { token: i87.MeetingEnded }, { token: i88.DisconnectUserSelf }, { token: i89.ReceiveMessage }, { token: i90.MeetingTimeRemaining }, { token: i91.MeetingStillThere }, { token: i92.StartRecords }, { token: i93.ReInitiateRecording }, { token: i94.RecordingNotice }, { token: i95.TimeLeftRecording }, { token: i96.StoppedRecording }, { token: i97.HostRequestResponse }, { token: i98.AllMembers }, { token: i99.AllMembersRest }, { token: i100.Disconnect }, { token: i101.PollUpdated }, { token: i102.BreakoutRoomUpdated }, { token: i103.SocketManager }, { token: i104.JoinRoomClient }, { token: i105.UpdateRoomParametersClient }, { token: i106.ClickVideo }, { token: i107.ClickAudio }, { token: i108.ClickScreenShare }, { token: i109.StreamSuccessVideo }, { token: i110.StreamSuccessAudio }, { token: i111.StreamSuccessScreen }, { token: i112.StreamSuccessAudioSwitch }, { token: i113.CheckPermission }, { token: i114.UpdateConsumingDomains }, { token: i115.ReceiveRoomMessages }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.8", type: MediasfuConference, isStandalone: true, selector: "app-mediasfu-conference", inputs: { PrejoinPage: "PrejoinPage", credentials: "credentials", useLocalUIMode: "useLocalUIMode", seedData: "seedData", useSeed: "useSeed", imgSrc: "imgSrc" }, host: { listeners: { "window:resize": "handleResize()", "window:orientationchange": "handleResize()" } }, providers: [CookieService], ngImport: i0, template: `
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
  `, isInline: true, styles: [""], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i116.NgComponentOutlet, selector: "[ngComponentOutlet]", inputs: ["ngComponentOutlet", "ngComponentOutletInputs", "ngComponentOutletInjector", "ngComponentOutletContent", "ngComponentOutletNgModule", "ngComponentOutletNgModuleFactory"] }, { kind: "directive", type: i116.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i116.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: BreakoutRoomsModal, selector: "app-breakout-rooms-modal", inputs: ["isVisible", "parameters", "position", "backgroundColor", "onBreakoutRoomsClose"] }, { kind: "component", type: BackgroundModal, selector: "app-background-modal", inputs: ["isVisible", "parameters", "position", "backgroundColor", "onClose"] }, { kind: "component", type: CoHostModal, selector: "app-co-host-modal", inputs: ["isCoHostModalVisible", "currentCohost", "participants", "coHostResponsibility", "position", "backgroundColor", "roomName", "showAlert", "updateCoHostResponsibility", "updateCoHost", "updateIsCoHostModalVisible", "socket", "onCoHostClose", "onModifyCoHost"] }, { kind: "component", type: AlertComponent, selector: "app-alert-component", inputs: ["visible", "message", "type", "duration", "textColor", "onHide"] }, { kind: "component", type: AudioGrid, selector: "app-audio-grid", inputs: ["componentsToRender"] }, { kind: "component", type: ControlButtonsComponent, selector: "app-control-buttons-component", inputs: ["buttons", "buttonColor", "buttonBackgroundColor", "alignment", "vertical", "buttonsContainerStyle"] }, { kind: "component", type: FlexibleGrid, selector: "app-flexible-grid", inputs: ["customWidth", "customHeight", "rows", "columns", "componentsToRender", "backgroundColor"] }, { kind: "component", type: FlexibleVideo, selector: "app-flexible-video", inputs: ["customWidth", "customHeight", "rows", "columns", "componentsToRender", "showAspect", "backgroundColor", "Screenboard", "annotateScreenStream", "localStreamScreen"] }, { kind: "component", type: LoadingModal, selector: "app-loading-modal", inputs: ["isVisible", "backgroundColor", "displayColor"] }, { kind: "component", type: Pagination, selector: "app-pagination", inputs: ["totalPages", "currentUserPage", "handlePageChange", "position", "location", "direction", "buttonsContainerStyle", "activePageStyle", "inactivePageStyle", "backgroundColor", "paginationHeight", "showAspect", "parameters"] }, { kind: "component", type: SubAspectComponent, selector: "app-sub-aspect-component", inputs: ["backgroundColor", "showControls", "containerWidthFraction", "containerHeightFraction", "defaultFractionSub"] }, { kind: "component", type: DisplaySettingsModal, selector: "app-display-settings-modal", inputs: ["isDisplaySettingsModalVisible", "onDisplaySettingsClose", "onModifyDisplaySettings", "parameters", "position", "backgroundColor"] }, { kind: "component", type: EventSettingsModal, selector: "app-event-settings-modal", inputs: ["isEventSettingsModalVisible", "onEventSettingsClose", "onModifyEventSettings", "position", "backgroundColor", "audioSetting", "videoSetting", "screenshareSetting", "chatSetting", "updateAudioSetting", "updateVideoSetting", "updateScreenshareSetting", "updateChatSetting", "updateIsSettingsModalVisible", "roomName", "socket", "showAlert"] }, { kind: "component", type: ConfirmExitModal, selector: "app-confirm-exit-modal", inputs: ["isConfirmExitModalVisible", "onConfirmExitClose", "position", "backgroundColor", "exitEventOnConfirm", "member", "ban", "roomName", "socket", "islevel"] }, { kind: "component", type: MediaSettingsModal, selector: "app-media-settings-modal", inputs: ["isMediaSettingsModalVisible", "onMediaSettingsClose", "switchCameraOnPress", "switchVideoOnPress", "switchAudioOnPress", "parameters", "position", "backgroundColor"] }, { kind: "component", type: MenuModal, selector: "app-menu-modal", inputs: ["backgroundColor", "isVisible", "customButtons", "shareButtons", "position", "roomName", "adminPasscode", "islevel", "eventType", "onClose"] }, { kind: "component", type: MessagesModal, selector: "app-messages-modal", inputs: ["isMessagesModalVisible", "onMessagesClose", "onSendMessagePress", "messages", "position", "backgroundColor", "activeTabBackgroundColor", "eventType", "member", "islevel", "coHostResponsibility", "coHost", "startDirectMessage", "directMessageDetails", "updateStartDirectMessage", "updateDirectMessageDetails", "showAlert", "roomName", "socket", "chatSetting"] }, { kind: "component", type: ConfirmHereModal, selector: "app-confirm-here-modal", inputs: ["isConfirmHereModalVisible", "position", "backgroundColor", "displayColor", "onConfirmHereClose", "countdownDuration", "socket", "roomName", "member"] }, { kind: "component", type: ShareEventModal, selector: "app-share-event-modal", inputs: ["backgroundColor", "isShareEventModalVisible", "onShareEventClose", "roomName", "adminPasscode", "islevel", "position", "shareButtons", "eventType"] }, { kind: "component", type: ParticipantsModal, selector: "app-participants-modal", inputs: ["isParticipantsModalVisible", "onParticipantsClose", "onParticipantsFilterChange", "participantsCounter", "onMuteParticipants", "onMessageParticipants", "onRemoveParticipants", "parameters", "position", "backgroundColor"] }, { kind: "component", type: PollModal, selector: "app-poll-modal", inputs: ["isPollModalVisible", "onClose", "position", "backgroundColor", "member", "islevel", "polls", "poll", "socket", "roomName", "showAlert", "updateIsPollModalVisible", "handleCreatePoll", "handleEndPoll", "handleVotePoll"] }, { kind: "component", type: RecordingModal, selector: "app-recording-modal", inputs: ["isRecordingModalVisible", "onClose", "backgroundColor", "position", "confirmRecording", "startRecording", "parameters"] }, { kind: "component", type: RequestsModal, selector: "app-requests-modal", inputs: ["isRequestsModalVisible", "requestCounter", "requestList", "roomName", "socket", "backgroundColor", "position", "parameters", "onRequestClose", "onRequestFilterChange", "onRequestItemPress", "updateRequestList"] }, { kind: "component", type: MainAspectComponent, selector: "app-main-aspect-component", inputs: ["backgroundColor", "showControls", "containerWidthFraction", "containerHeightFraction", "defaultFraction", "updateIsWideScreen", "updateIsMediumScreen", "updateIsSmallScreen"] }, { kind: "component", type: MainContainerComponent, selector: "app-main-container-component", inputs: ["backgroundColor", "containerWidthFraction", "containerHeightFraction", "marginLeft", "marginRight", "marginTop", "marginBottom", "padding"] }, { kind: "component", type: MainGridComponent, selector: "app-main-grid-component", inputs: ["backgroundColor", "mainSize", "height", "width", "showAspect", "timeBackgroundColor", "showTimer", "meetingProgressTime"] }, { kind: "component", type: MainScreenComponent, selector: "app-main-screen-component", inputs: ["mainSize", "doStack", "containerWidthFraction", "containerHeightFraction", "defaultFraction", "showControls", "updateComponentSizes"] }, { kind: "component", type: OtherGridComponent, selector: "app-other-grid-component", inputs: ["backgroundColor", "width", "height", "showAspect", "timeBackgroundColor", "showTimer", "meetingProgressTime"] }, { kind: "component", type: ScreenboardModal, selector: "app-screenboard-modal", inputs: ["parameters", "isVisible", "onClose", "position", "backgroundColor"] }, { kind: "component", type: Whiteboard, selector: "app-whiteboard", inputs: ["customWidth", "customHeight", "parameters", "showAspect"] }, { kind: "component", type: ConfigureWhiteboardModal, selector: "app-configure-whiteboard-modal", inputs: ["isVisible", "parameters", "backgroundColor", "position", "onConfigureWhiteboardClose"] }, { kind: "component", type: WaitingRoomModal, selector: "app-waiting-room-modal", inputs: ["isWaitingModalVisible", "waitingRoomCounter", "waitingRoomList", "roomName", "socket", "position", "backgroundColor", "parameters", "onWaitingRoomClose", "onWaitingRoomFilterChange", "updateWaitingList", "onWaitingRoomItemPress"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: MediasfuConference, decorators: [{
            type: Component,
            args: [{ selector: 'app-mediasfu-conference', standalone: true, imports: [
                        RouterOutlet,
                        CommonModule,
                        BreakoutRoomsModal,
                        BackgroundModal,
                        CoHostModal,
                        AlertComponent,
                        AudioGrid,
                        ControlButtonsAltComponent,
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
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef }, { type: i0.Injector }, { type: i1.UpdateMiniCardsGrid }, { type: i2.MixStreams }, { type: i3.DispStreams }, { type: i4.StopShareScreen }, { type: i5.CheckScreenShare }, { type: i6.StartShareScreen }, { type: i7.RequestScreenShare }, { type: i8.ReorderStreams }, { type: i9.PrepopulateUserMedia }, { type: i10.GetVideos }, { type: i11.RePort }, { type: i12.Trigger }, { type: i13.ConsumerResume }, { type: i14.ConnectSendTransport }, { type: i15.ConnectSendTransportAudio }, { type: i16.ConnectSendTransportVideo }, { type: i17.ConnectSendTransportScreen }, { type: i18.ProcessConsumerTransports }, { type: i19.ResumePauseStreams }, { type: i20.Readjust }, { type: i21.CheckGrid }, { type: i22.GetEstimate }, { type: i23.CalculateRowsAndColumns }, { type: i24.AddVideosGrid }, { type: i25.OnScreenChanges }, { type: i26.ChangeVids }, { type: i27.CompareActiveNames }, { type: i28.CompareScreenStates }, { type: i29.CreateSendTransport }, { type: i30.ResumeSendTransportAudio }, { type: i31.ReceiveAllPipedTransports }, { type: i32.DisconnectSendTransportVideo }, { type: i33.DisconnectSendTransportAudio }, { type: i34.DisconnectSendTransportScreen }, { type: i35.GetPipedProducersAlt }, { type: i36.SignalNewConsumerTransport }, { type: i37.ConnectRecvTransport }, { type: i38.ReUpdateInter }, { type: i39.UpdateParticipantAudioDecibels }, { type: i40.CloseAndResize }, { type: i41.AutoAdjust }, { type: i42.SwitchUserVideoAlt }, { type: i43.SwitchUserVideo }, { type: i44.SwitchUserAudio }, { type: i45.GetDomains }, { type: i46.FormatNumber }, { type: i47.ConnectIps }, { type: i48.CreateDeviceClient }, { type: i49.HandleCreatePoll }, { type: i50.HandleEndPoll }, { type: i51.HandleVotePoll }, { type: i52.CaptureCanvasStream }, { type: i53.ResumePauseAudioStreams }, { type: i54.ProcessConsumerTransportsAudio }, { type: i55.LaunchMenuModal }, { type: i56.LaunchRecording }, { type: i57.StartRecording }, { type: i58.ConfirmRecording }, { type: i59.LaunchWaiting }, { type: i60.launchCoHost }, { type: i61.LaunchMediaSettings }, { type: i62.LaunchDisplaySettings }, { type: i63.LaunchSettings }, { type: i64.LaunchRequests }, { type: i65.LaunchParticipants }, { type: i66.LaunchMessages }, { type: i67.LaunchConfirmExit }, { type: i68.LaunchPoll }, { type: i69.LaunchBreakoutRooms }, { type: i70.LaunchConfigureWhiteboard }, { type: i71.StartMeetingProgressTimer }, { type: i72.UpdateRecording }, { type: i73.StopRecording }, { type: i74.UserWaiting }, { type: i75.PersonJoined }, { type: i76.AllWaitingRoomMembers }, { type: i77.RoomRecordParams }, { type: i78.BanParticipant }, { type: i79.UpdatedCoHost }, { type: i80.ParticipantRequested }, { type: i81.ScreenProducerId }, { type: i82.UpdateMediaSettings }, { type: i83.ProducerMediaPaused }, { type: i84.ProducerMediaResumed }, { type: i85.ProducerMediaClosed }, { type: i86.ControlMediaHost }, { type: i87.MeetingEnded }, { type: i88.DisconnectUserSelf }, { type: i89.ReceiveMessage }, { type: i90.MeetingTimeRemaining }, { type: i91.MeetingStillThere }, { type: i92.StartRecords }, { type: i93.ReInitiateRecording }, { type: i94.RecordingNotice }, { type: i95.TimeLeftRecording }, { type: i96.StoppedRecording }, { type: i97.HostRequestResponse }, { type: i98.AllMembers }, { type: i99.AllMembersRest }, { type: i100.Disconnect }, { type: i101.PollUpdated }, { type: i102.BreakoutRoomUpdated }, { type: i103.SocketManager }, { type: i104.JoinRoomClient }, { type: i105.UpdateRoomParametersClient }, { type: i106.ClickVideo }, { type: i107.ClickAudio }, { type: i108.ClickScreenShare }, { type: i109.StreamSuccessVideo }, { type: i110.StreamSuccessAudio }, { type: i111.StreamSuccessScreen }, { type: i112.StreamSuccessAudioSwitch }, { type: i113.CheckPermission }, { type: i114.UpdateConsumingDomains }, { type: i115.ReceiveRoomMessages }], propDecorators: { PrejoinPage: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWFzZnUtY29uZmVyZW5jZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29tcG9uZW50cy9tZWRpYXNmdS1jb21wb25lbnRzL21lZGlhc2Z1LWNvbmZlcmVuY2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLFFBQVEsRUFFUixLQUFLLEdBR04sTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbkQsT0FBTyxFQUFFLGVBQWUsRUFBZ0IsYUFBYSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXBFLE9BQU8sRUFDTCxZQUFZLEVBQ1osYUFBYSxFQUNiLFlBQVksRUFDWixXQUFXLEVBQ1gsYUFBYSxFQUNiLEtBQUssRUFDTCxPQUFPLEVBQ1AsT0FBTyxFQUNQLFVBQVUsRUFDVixPQUFPLEVBQ1AsU0FBUyxFQUNULE1BQU0sRUFDTixhQUFhLEVBQ2IsbUJBQW1CLEVBQ25CLFlBQVksRUFDWixpQkFBaUIsRUFDakIsT0FBTyxFQUNQLFlBQVksRUFDWixPQUFPLEVBQ1AsTUFBTSxFQUNOLFVBQVUsRUFDVixVQUFVLEdBQ1gsTUFBTSxtQ0FBbUMsQ0FBQztBQUUzQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUU3RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw2RUFBNkUsQ0FBQztBQUNsSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNkRBQTZELENBQUM7QUFDM0YsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0scUZBQXFGLENBQUM7QUFDOUgsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sNkZBQTZGLENBQUM7QUFDekksT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sMkVBQTJFLENBQUM7QUFDL0csT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sNkVBQTZFLENBQUM7QUFDbEgsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0seUVBQXlFLENBQUM7QUFDNUcsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sMkVBQTJFLENBQUM7QUFDL0csT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sbUZBQW1GLENBQUM7QUFDM0gsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGlFQUFpRSxDQUFDO0FBQ2pHLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUMvRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUVBQW1FLENBQUM7QUFDbkcsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGdFQUFnRSxDQUFDO0FBQy9GLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9EQUFvRCxDQUFDO0FBQ3RGLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGlFQUFpRSxDQUFDO0FBQ3ZHLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGtGQUFrRixDQUFDO0FBQ3RILE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw2REFBNkQsQ0FBQztBQUMxRixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw0RUFBNEUsQ0FBQztBQUMvRyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sK0RBQStELENBQUM7QUFDOUYsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sa0ZBQWtGLENBQUM7QUFDdEgsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sb0VBQW9FLENBQUM7QUFDdEcsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sb0VBQW9FLENBQUM7QUFDdEcsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGtFQUFrRSxDQUFDO0FBQ25HLE9BQU8sRUFDTCxXQUFXLEdBRVosTUFBTSx3REFBd0QsQ0FBQztBQUVoRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scURBQXFELENBQUM7QUFDaEYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNFQUFzRSxDQUFDO0FBQ3ZHLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHVEQUF1RCxDQUFDO0FBQzNGLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDBGQUEwRixDQUFDO0FBQ3BJLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwwREFBMEQsQ0FBQztBQUN0RixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNkRBQTZELENBQUM7QUFDMUYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0seUVBQXlFLENBQUM7QUFDM0csNENBQTRDO0FBQzVDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx1REFBdUQsQ0FBQztBQUNuRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNkRBQTZELENBQUM7QUFDM0YsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLCtEQUErRCxDQUFDO0FBQzlGLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx1REFBdUQsQ0FBQztBQUVsRixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sNkRBQTZELENBQUM7QUFDekYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGdFQUFnRSxDQUFDO0FBQy9GLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9FQUFvRSxDQUFDO0FBQ3RHLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHFFQUFxRSxDQUFDO0FBQ3hHLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDBFQUEwRSxDQUFDO0FBQ2xILE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG9FQUFvRSxDQUFDO0FBMEd2RyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3RnZEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBOENHO0FBa2NILE1BQU0sT0FBTyxrQkFBa0I7SUFvQm5CO0lBQ0E7SUFDRDtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFFQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQXZJVCxXQUFXLEdBQVEsV0FBVyxDQUFDO0lBQ3RCLFdBQVcsR0FBNEMsRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUN2RixjQUFjLEdBQUcsS0FBSyxDQUFDO0lBQ3ZCLFFBQVEsQ0FBWTtJQUNwQixPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ2hCLE1BQU0sR0FBRyx5Q0FBeUMsQ0FBQztJQUU1RCxLQUFLLEdBQUcscUJBQXFCLENBQUM7SUFFdEIsMkJBQTJCLENBQTJCO0lBQ3RELHFCQUFxQixDQUEyQjtJQUNoRCxtQkFBbUIsQ0FBMkI7SUFDOUMsa0JBQWtCLENBQTJCO0lBQzdDLG1CQUFtQixHQUFtQixFQUFFLENBQUM7SUFDekMsdUJBQXVCLENBQTJCO0lBQ2xELHFCQUFxQixDQUEyQjtJQUV4RCxZQUNVLEdBQXNCLEVBQ3RCLFFBQWtCLEVBQ25CLG1CQUF3QyxFQUN4QyxVQUFzQixFQUN0QixXQUF3QixFQUN4QixlQUFnQyxFQUNoQyxnQkFBa0MsRUFDbEMsZ0JBQWtDLEVBQ2xDLGtCQUFzQyxFQUN0QyxjQUE4QixFQUM5QixvQkFBMEMsRUFDMUMsU0FBb0IsRUFDcEIsTUFBYyxFQUNkLE9BQWdCLEVBQ2hCLGNBQThCLEVBQzlCLG9CQUEwQyxFQUMxQyx5QkFBb0QsRUFDcEQseUJBQW9ELEVBQ3BELDBCQUFzRCxFQUN0RCx5QkFBb0QsRUFDcEQsa0JBQXNDLEVBQ3RDLFFBQWtCLEVBQ2xCLFNBQW9CLEVBQ3BCLFdBQXdCLEVBQ3hCLHVCQUFnRCxFQUNoRCxhQUE0QixFQUM1QixlQUFnQyxFQUNoQyxVQUFzQixFQUN0QixrQkFBc0MsRUFDdEMsbUJBQXdDLEVBQ3hDLG1CQUF3QyxFQUN4Qyx3QkFBa0QsRUFDbEQseUJBQW9ELEVBQ3BELDRCQUEwRCxFQUMxRCw0QkFBMEQsRUFDMUQsNkJBQTRELEVBQzVELG9CQUEwQyxFQUMxQywwQkFBc0QsRUFDdEQsb0JBQTBDLEVBQzFDLGFBQTRCLEVBQzVCLDhCQUE4RCxFQUM5RCxjQUE4QixFQUM5QixVQUFzQixFQUN0QixrQkFBc0MsRUFDdEMsZUFBZ0MsRUFDaEMsZUFBZ0MsRUFDaEMsVUFBc0IsRUFDdEIsWUFBMEIsRUFDMUIsVUFBc0IsRUFDdEIsa0JBQXNDLEVBQ3RDLGdCQUFrQyxFQUNsQyxhQUE0QixFQUM1QixjQUE4QixFQUM5QixtQkFBd0MsRUFDeEMsdUJBQWdELEVBQ2hELDhCQUE4RCxFQUU5RCxlQUFnQyxFQUNoQyxlQUFnQyxFQUNoQyxjQUE4QixFQUM5QixnQkFBa0MsRUFDbEMsYUFBNEIsRUFDNUIsWUFBMEIsRUFDMUIsbUJBQXdDLEVBQ3hDLHFCQUE0QyxFQUM1QyxjQUE4QixFQUM5QixjQUE4QixFQUM5QixrQkFBc0MsRUFDdEMsY0FBOEIsRUFDOUIsaUJBQW9DLEVBQ3BDLFVBQXNCLEVBQ3RCLG1CQUF3QyxFQUN4Qyx5QkFBb0QsRUFDcEQseUJBQW9ELEVBQ3BELGVBQWdDLEVBQ2hDLGFBQTRCLEVBQzVCLFdBQXdCLEVBQ3hCLFlBQTBCLEVBQzFCLHFCQUE0QyxFQUM1QyxnQkFBa0MsRUFDbEMsY0FBOEIsRUFDOUIsYUFBNEIsRUFDNUIsb0JBQTBDLEVBQzFDLGdCQUFrQyxFQUNsQyxtQkFBd0MsRUFDeEMsbUJBQXdDLEVBQ3hDLG9CQUEwQyxFQUMxQyxtQkFBd0MsRUFDeEMsZ0JBQWtDLEVBQ2xDLFlBQTBCLEVBQzFCLGtCQUFzQyxFQUN0QyxjQUE4QixFQUM5QixvQkFBMEMsRUFDMUMsaUJBQW9DLEVBQ3BDLFlBQTBCLEVBQzFCLG1CQUF3QyxFQUN4QyxlQUFnQyxFQUNoQyxpQkFBb0MsRUFDcEMsZ0JBQWtDLEVBQ2xDLG1CQUF3QyxFQUN4QyxVQUFzQixFQUN0QixjQUE4QixFQUM5QixVQUFzQixFQUN0QixXQUF3QixFQUN4QixtQkFBd0MsRUFDeEMsYUFBNEIsRUFDNUIsY0FBOEIsRUFDOUIsMEJBQXNELEVBQ3RELFVBQXNCLEVBQ3RCLFVBQXNCLEVBQ3RCLGdCQUFrQyxFQUNsQyxrQkFBc0MsRUFDdEMsa0JBQXNDLEVBQ3RDLG1CQUF3QyxFQUN4Qyx3QkFBa0QsRUFDbEQsZUFBZ0MsRUFDaEMsc0JBQThDLEVBQzlDLG1CQUF3QztRQXJIdkMsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFDdEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNuQix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ3RDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5Qix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBQzFDLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLFlBQU8sR0FBUCxPQUFPLENBQVM7UUFDaEIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFDMUMsOEJBQXlCLEdBQXpCLHlCQUF5QixDQUEyQjtRQUNwRCw4QkFBeUIsR0FBekIseUJBQXlCLENBQTJCO1FBQ3BELCtCQUEwQixHQUExQiwwQkFBMEIsQ0FBNEI7UUFDdEQsOEJBQXlCLEdBQXpCLHlCQUF5QixDQUEyQjtRQUNwRCx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ3RDLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNwQixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4Qiw0QkFBdUIsR0FBdkIsdUJBQXVCLENBQXlCO1FBQ2hELGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4Qyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7UUFDbEQsOEJBQXlCLEdBQXpCLHlCQUF5QixDQUEyQjtRQUNwRCxpQ0FBNEIsR0FBNUIsNEJBQTRCLENBQThCO1FBQzFELGlDQUE0QixHQUE1Qiw0QkFBNEIsQ0FBOEI7UUFDMUQsa0NBQTZCLEdBQTdCLDZCQUE2QixDQUErQjtRQUM1RCx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBQzFDLCtCQUEwQixHQUExQiwwQkFBMEIsQ0FBNEI7UUFDdEQseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUMxQyxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixtQ0FBOEIsR0FBOUIsOEJBQThCLENBQWdDO1FBQzlELG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUN0QyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5Qix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLDRCQUF1QixHQUF2Qix1QkFBdUIsQ0FBeUI7UUFDaEQsbUNBQThCLEdBQTlCLDhCQUE4QixDQUFnQztRQUU5RCxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDeEMsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUF1QjtRQUM1QyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0Qix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLDhCQUF5QixHQUF6Qix5QkFBeUIsQ0FBMkI7UUFDcEQsOEJBQXlCLEdBQXpCLHlCQUF5QixDQUEyQjtRQUNwRCxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUF1QjtRQUM1QyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1Qix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBQzFDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4Qyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFDMUMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4QyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFDMUMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4QyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDeEMsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLCtCQUEwQixHQUExQiwwQkFBMEIsQ0FBNEI7UUFDdEQsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUN0Qyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ3RDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDeEMsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQUNsRCxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUF3QjtRQUM5Qyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO0lBQzlDLENBQUM7SUFFSixjQUFjLENBQUMsTUFBVztRQUN4QixNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDO1lBQzFCLFNBQVMsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDdEYsTUFBTSxFQUFFLElBQUksQ0FBQyxRQUFRO1NBQ3RCLENBQUMsQ0FBQztRQUVILE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUVELGlCQUFpQjtJQUNqQixpQkFBaUIsR0FBRyxHQUFHLEVBQUU7UUFDdkIsT0FBTztZQUNMLG1CQUFtQixFQUNqQixJQUFJLENBQUMsbUJBQW1CLEVBQUUsbUJBQW1CO2dCQUM3QyxDQUFDLEdBQUcsRUFBRTtvQkFDSixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN0QixDQUFDLENBQUM7WUFDSixVQUFVLEVBQ1IsSUFBSSxDQUFDLFVBQVUsRUFBRSxVQUFVO2dCQUMzQixDQUFDLEdBQUcsRUFBRTtvQkFDSixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN0QixDQUFDLENBQUM7WUFDSixXQUFXLEVBQ1QsSUFBSSxDQUFDLFdBQVcsRUFBRSxXQUFXO2dCQUM3QixDQUFDLEdBQUcsRUFBRTtvQkFDSixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN0QixDQUFDLENBQUM7WUFDSixlQUFlLEVBQ2IsSUFBSSxDQUFDLGVBQWUsRUFBRSxlQUFlO2dCQUNyQyxDQUFDLEdBQUcsRUFBRTtvQkFDSixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN0QixDQUFDLENBQUM7WUFDSixnQkFBZ0IsRUFDZCxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsZ0JBQWdCO2dCQUN2QyxDQUFDLEdBQUcsRUFBRTtvQkFDSixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN0QixDQUFDLENBQUM7WUFDSixnQkFBZ0IsRUFDZCxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsZ0JBQWdCO2dCQUN2QyxDQUFDLEdBQUcsRUFBRTtvQkFDSixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN0QixDQUFDLENBQUM7WUFDSixrQkFBa0IsRUFDaEIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLGtCQUFrQjtnQkFDM0MsQ0FBQyxHQUFHLEVBQUU7b0JBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDdEIsQ0FBQyxDQUFDO1lBQ0osY0FBYyxFQUNaLElBQUksQ0FBQyxjQUFjLEVBQUUsY0FBYztnQkFDbkMsQ0FBQyxHQUFHLEVBQUU7b0JBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDdEIsQ0FBQyxDQUFDO1lBQ0osb0JBQW9CLEVBQ2xCLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxvQkFBb0I7Z0JBQy9DLENBQUMsR0FBRyxFQUFFO29CQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3RCLENBQUMsQ0FBQztZQUNKLFNBQVMsRUFDUCxJQUFJLENBQUMsU0FBUyxFQUFFLFNBQVM7Z0JBQ3pCLENBQUMsR0FBRyxFQUFFO29CQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3RCLENBQUMsQ0FBQztZQUNKLE1BQU0sRUFDSixJQUFJLENBQUMsTUFBTSxFQUFFLE1BQU07Z0JBQ25CLENBQUMsR0FBRyxFQUFFO29CQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3RCLENBQUMsQ0FBQztZQUNKLE9BQU8sRUFDTCxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU87Z0JBQ3JCLENBQUMsR0FBRyxFQUFFO29CQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3RCLENBQUMsQ0FBQztZQUNKLGNBQWMsRUFDWixJQUFJLENBQUMsY0FBYyxFQUFFLGNBQWM7Z0JBQ25DLENBQUMsR0FBRyxFQUFFO29CQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3RCLENBQUMsQ0FBQztZQUNKLG9CQUFvQixFQUNsQixJQUFJLENBQUMsb0JBQW9CLEVBQUUsb0JBQW9CO2dCQUMvQyxDQUFDLEdBQUcsRUFBRTtvQkFDSixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN0QixDQUFDLENBQUM7WUFDSix5QkFBeUIsRUFDdkIsSUFBSSxDQUFDLHlCQUF5QixFQUFFLHlCQUF5QjtnQkFDekQsQ0FBQyxHQUFHLEVBQUU7b0JBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDdEIsQ0FBQyxDQUFDO1lBQ0oseUJBQXlCLEVBQ3ZCLElBQUksQ0FBQyx5QkFBeUIsRUFBRSx5QkFBeUI7Z0JBQ3pELENBQUMsR0FBRyxFQUFFO29CQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3RCLENBQUMsQ0FBQztZQUNKLDBCQUEwQixFQUN4QixJQUFJLENBQUMsMEJBQTBCLEVBQUUsMEJBQTBCO2dCQUMzRCxDQUFDLEdBQUcsRUFBRTtvQkFDSixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN0QixDQUFDLENBQUM7WUFDSix5QkFBeUIsRUFDdkIsSUFBSSxDQUFDLHlCQUF5QixFQUFFLHlCQUF5QjtnQkFDekQsQ0FBQyxHQUFHLEVBQUU7b0JBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDdEIsQ0FBQyxDQUFDO1lBQ0osa0JBQWtCLEVBQ2hCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxrQkFBa0I7Z0JBQzNDLENBQUMsR0FBRyxFQUFFO29CQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3RCLENBQUMsQ0FBQztZQUNKLFFBQVEsRUFDTixJQUFJLENBQUMsUUFBUSxFQUFFLFFBQVE7Z0JBQ3ZCLENBQUMsR0FBRyxFQUFFO29CQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3RCLENBQUMsQ0FBQztZQUNKLFNBQVMsRUFDUCxJQUFJLENBQUMsU0FBUyxFQUFFLFNBQVM7Z0JBQ3pCLENBQUMsR0FBRyxFQUFFO29CQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3RCLENBQUMsQ0FBQztZQUNKLFdBQVcsRUFDVCxJQUFJLENBQUMsV0FBVyxFQUFFLFdBQVc7Z0JBQzdCLENBQUMsR0FBRyxFQUFFO29CQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3RCLENBQUMsQ0FBQztZQUNKLHVCQUF1QixFQUNyQixJQUFJLENBQUMsdUJBQXVCLEVBQUUsdUJBQXVCO2dCQUNyRCxDQUFDLEdBQUcsRUFBRTtvQkFDSixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN0QixDQUFDLENBQUM7WUFDSixhQUFhLEVBQ1gsSUFBSSxDQUFDLGFBQWEsRUFBRSxhQUFhO2dCQUNqQyxDQUFDLEdBQUcsRUFBRTtvQkFDSixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN0QixDQUFDLENBQUM7WUFDSixlQUFlLEVBQ2IsSUFBSSxDQUFDLGVBQWUsRUFBRSxlQUFlO2dCQUNyQyxDQUFDLEdBQUcsRUFBRTtvQkFDSixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN0QixDQUFDLENBQUM7WUFDSixLQUFLLEVBQ0gsS0FBSztnQkFDTCxDQUFDLEdBQUcsRUFBRTtvQkFDSixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN0QixDQUFDLENBQUM7WUFDSixVQUFVLEVBQ1IsSUFBSSxDQUFDLFVBQVUsRUFBRSxVQUFVO2dCQUMzQixDQUFDLEdBQUcsRUFBRTtvQkFDSixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN0QixDQUFDLENBQUM7WUFDSixrQkFBa0IsRUFDaEIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLGtCQUFrQjtnQkFDM0MsQ0FBQyxHQUFHLEVBQUU7b0JBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDdEIsQ0FBQyxDQUFDO1lBQ0osbUJBQW1CLEVBQ2pCLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxtQkFBbUI7Z0JBQzdDLENBQUMsR0FBRyxFQUFFO29CQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3RCLENBQUMsQ0FBQztZQUNKLG1CQUFtQixFQUNqQixJQUFJLENBQUMsbUJBQW1CLEVBQUUsbUJBQW1CO2dCQUM3QyxDQUFDLEdBQUcsRUFBRTtvQkFDSixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN0QixDQUFDLENBQUM7WUFDSix3QkFBd0IsRUFDdEIsSUFBSSxDQUFDLHdCQUF3QixFQUFFLHdCQUF3QjtnQkFDdkQsQ0FBQyxHQUFHLEVBQUU7b0JBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDdEIsQ0FBQyxDQUFDO1lBQ0oseUJBQXlCLEVBQ3ZCLElBQUksQ0FBQyx5QkFBeUIsRUFBRSx5QkFBeUI7Z0JBQ3pELENBQUMsR0FBRyxFQUFFO29CQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3RCLENBQUMsQ0FBQztZQUNKLDRCQUE0QixFQUMxQixJQUFJLENBQUMsNEJBQTRCLEVBQUUsNEJBQTRCO2dCQUMvRCxDQUFDLEdBQUcsRUFBRTtvQkFDSixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN0QixDQUFDLENBQUM7WUFDSiw0QkFBNEIsRUFDMUIsSUFBSSxDQUFDLDRCQUE0QixFQUFFLDRCQUE0QjtnQkFDL0QsQ0FBQyxHQUFHLEVBQUU7b0JBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDdEIsQ0FBQyxDQUFDO1lBQ0osNkJBQTZCLEVBQzNCLElBQUksQ0FBQyw2QkFBNkIsRUFBRSw2QkFBNkI7Z0JBQ2pFLENBQUMsR0FBRyxFQUFFO29CQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3RCLENBQUMsQ0FBQztZQUNKLG9CQUFvQixFQUNsQixJQUFJLENBQUMsb0JBQW9CLEVBQUUsb0JBQW9CO2dCQUMvQyxDQUFDLEdBQUcsRUFBRTtvQkFDSixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN0QixDQUFDLENBQUM7WUFDSiwwQkFBMEIsRUFDeEIsSUFBSSxDQUFDLDBCQUEwQixFQUFFLDBCQUEwQjtnQkFDM0QsQ0FBQyxHQUFHLEVBQUU7b0JBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDdEIsQ0FBQyxDQUFDO1lBQ0osb0JBQW9CLEVBQ2xCLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxvQkFBb0I7Z0JBQy9DLENBQUMsR0FBRyxFQUFFO29CQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3RCLENBQUMsQ0FBQztZQUNKLGFBQWEsRUFDWCxJQUFJLENBQUMsYUFBYSxFQUFFLGFBQWE7Z0JBQ2pDLENBQUMsR0FBRyxFQUFFO29CQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3RCLENBQUMsQ0FBQztZQUNKLDhCQUE4QixFQUM1QixJQUFJLENBQUMsOEJBQThCLEVBQUUsOEJBQThCO2dCQUNuRSxDQUFDLEdBQUcsRUFBRTtvQkFDSixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN0QixDQUFDLENBQUM7WUFDSixjQUFjLEVBQ1osSUFBSSxDQUFDLGNBQWMsRUFBRSxjQUFjO2dCQUNuQyxDQUFDLEdBQUcsRUFBRTtvQkFDSixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN0QixDQUFDLENBQUM7WUFDSixVQUFVLEVBQ1IsSUFBSSxDQUFDLFVBQVUsRUFBRSxVQUFVO2dCQUMzQixDQUFDLEdBQUcsRUFBRTtvQkFDSixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN0QixDQUFDLENBQUM7WUFDSixrQkFBa0IsRUFDaEIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLGtCQUFrQjtnQkFDM0MsQ0FBQyxHQUFHLEVBQUU7b0JBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDdEIsQ0FBQyxDQUFDO1lBQ0osZUFBZSxFQUNiLElBQUksQ0FBQyxlQUFlLEVBQUUsZUFBZTtnQkFDckMsQ0FBQyxHQUFHLEVBQUU7b0JBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDdEIsQ0FBQyxDQUFDO1lBQ0osZUFBZSxFQUNiLElBQUksQ0FBQyxlQUFlLEVBQUUsZUFBZTtnQkFDckMsQ0FBQyxHQUFHLEVBQUU7b0JBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDdEIsQ0FBQyxDQUFDO1lBQ0osVUFBVSxFQUNSLElBQUksQ0FBQyxVQUFVLEVBQUUsVUFBVTtnQkFDM0IsQ0FBQyxHQUFHLEVBQUU7b0JBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDdEIsQ0FBQyxDQUFDO1lBQ0osWUFBWSxFQUNWLElBQUksQ0FBQyxZQUFZLEVBQUUsWUFBWTtnQkFDL0IsQ0FBQyxHQUFHLEVBQUU7b0JBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDdEIsQ0FBQyxDQUFDO1lBQ0osVUFBVSxFQUNSLElBQUksQ0FBQyxVQUFVLEVBQUUsVUFBVTtnQkFDM0IsQ0FBQyxHQUFHLEVBQUU7b0JBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDdEIsQ0FBQyxDQUFDO1lBQ0osa0JBQWtCLEVBQ2hCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxrQkFBa0I7Z0JBQzNDLENBQUMsR0FBRyxFQUFFO29CQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3RCLENBQUMsQ0FBQztZQUNKLGdCQUFnQixFQUNkLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxnQkFBZ0I7Z0JBQ3ZDLENBQUMsR0FBRyxFQUFFO29CQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3RCLENBQUMsQ0FBQztZQUNKLGFBQWEsRUFDWCxJQUFJLENBQUMsYUFBYSxFQUFFLGFBQWE7Z0JBQ2pDLENBQUMsR0FBRyxFQUFFO29CQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3RCLENBQUMsQ0FBQztZQUNKLGNBQWMsRUFDWixJQUFJLENBQUMsY0FBYyxFQUFFLGNBQWM7Z0JBQ25DLENBQUMsR0FBRyxFQUFFO29CQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3RCLENBQUMsQ0FBQztZQUNKLG1CQUFtQixFQUNqQixJQUFJLENBQUMsbUJBQW1CLEVBQUUsbUJBQW1CO2dCQUM3QyxDQUFDLEdBQUcsRUFBRTtvQkFDSixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN0QixDQUFDLENBQUM7WUFDSix1QkFBdUIsRUFDckIsSUFBSSxDQUFDLHVCQUF1QixFQUFFLHVCQUF1QjtnQkFDckQsQ0FBQyxHQUFHLEVBQUU7b0JBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDdEIsQ0FBQyxDQUFDO1lBQ0osOEJBQThCLEVBQzVCLElBQUksQ0FBQyw4QkFBOEIsRUFBRSw4QkFBOEI7Z0JBQ25FLENBQUMsR0FBRyxFQUFFO29CQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3RCLENBQUMsQ0FBQztZQUNKLGVBQWUsRUFDYixJQUFJLENBQUMsZUFBZSxFQUFFLGVBQWU7Z0JBQ3JDLENBQUMsR0FBRyxFQUFFO29CQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3RCLENBQUMsQ0FBQztZQUNKLGtCQUFrQixFQUNoQixJQUFJLENBQUMsa0JBQWtCLEVBQUUsa0JBQWtCO2dCQUMzQyxDQUFDLEdBQUcsRUFBRTtvQkFDSixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN0QixDQUFDLENBQUM7WUFDSixrQkFBa0IsRUFDaEIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLGtCQUFrQjtnQkFDM0MsQ0FBQyxHQUFHLEVBQUU7b0JBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDdEIsQ0FBQyxDQUFDO1lBQ0osbUJBQW1CLEVBQ2pCLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxtQkFBbUI7Z0JBQzdDLENBQUMsR0FBRyxFQUFFO29CQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3RCLENBQUMsQ0FBQztZQUNKLHdCQUF3QixFQUN0QixJQUFJLENBQUMsd0JBQXdCLEVBQUUsd0JBQXdCO2dCQUN2RCxDQUFDLEdBQUcsRUFBRTtvQkFDSixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN0QixDQUFDLENBQUM7WUFDSixVQUFVLEVBQ1IsSUFBSSxDQUFDLFVBQVUsRUFBRSxVQUFVO2dCQUMzQixDQUFDLEdBQUcsRUFBRTtvQkFDSixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN0QixDQUFDLENBQUM7WUFDSixVQUFVLEVBQ1IsSUFBSSxDQUFDLFVBQVUsRUFBRSxVQUFVO2dCQUMzQixDQUFDLEdBQUcsRUFBRTtvQkFDSixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN0QixDQUFDLENBQUM7WUFDSixnQkFBZ0IsRUFDZCxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsZ0JBQWdCO2dCQUN2QyxDQUFDLEdBQUcsRUFBRTtvQkFDSixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN0QixDQUFDLENBQUM7WUFDSix1QkFBdUIsRUFDckIsSUFBSSxDQUFDLHVCQUF1QjtnQkFDNUIsQ0FBQyxHQUFHLEVBQUU7b0JBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDdEIsQ0FBQyxDQUFDO1lBQ0osc0JBQXNCLEVBQ3BCLElBQUksQ0FBQyxzQkFBc0I7Z0JBQzNCLENBQUMsR0FBRyxFQUFFO29CQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3RCLENBQUMsQ0FBQztTQUNMLENBQUM7SUFDSixDQUFDLENBQUM7SUFFRixTQUFTLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFDaEQsV0FBVyxHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQ2xELE1BQU0sR0FBRyxJQUFJLGVBQWUsQ0FBUyxFQUFZLENBQUMsQ0FBQztJQUNuRCxRQUFRLEdBQUcsSUFBSSxlQUFlLENBQTBCLElBQUksQ0FBQyxDQUFDO0lBQzlELE1BQU0sR0FBRyxJQUFJLGVBQWUsQ0FBZ0IsSUFBSSxDQUFDLENBQUM7SUFDbEQsTUFBTSxHQUFHLElBQUksZUFBZSxDQUMxQixrRUFBa0UsQ0FDbkUsQ0FBQztJQUNGLFdBQVcsR0FBRyxJQUFJLGVBQWUsQ0FBUyxVQUFVLENBQUMsQ0FBQztJQUN0RCxRQUFRLEdBQUcsSUFBSSxlQUFlLENBQVMsRUFBRSxDQUFDLENBQUM7SUFDM0MsSUFBSSxHQUFHLElBQUksZUFBZSxDQUFTLEVBQUUsQ0FBQyxDQUFDO0lBRXZDLFFBQVEsR0FBRyxJQUFJLGVBQWUsQ0FBUyxFQUFFLENBQUMsQ0FBQztJQUMzQyxNQUFNLEdBQUcsSUFBSSxlQUFlLENBQVMsRUFBRSxDQUFDLENBQUM7SUFDekMsYUFBYSxHQUFHLElBQUksZUFBZSxDQUFTLEVBQUUsQ0FBQyxDQUFDO0lBQ2hELE9BQU8sR0FBRyxJQUFJLGVBQWUsQ0FBUyxHQUFHLENBQUMsQ0FBQztJQUMzQyxNQUFNLEdBQUcsSUFBSSxlQUFlLENBQVMsV0FBVyxDQUFDLENBQUM7SUFDbEQsb0JBQW9CLEdBQUcsSUFBSSxlQUFlLENBQXlCO1FBQ2pFLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUU7UUFDeEQsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRTtRQUNqRCxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFO1FBQ25ELEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUU7S0FDakQsQ0FBQyxDQUFDO0lBQ0gsWUFBWSxHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQ25ELFVBQVUsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUNqRCxpQkFBaUIsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUN4RCxrQkFBa0IsR0FBRyxJQUFJLGVBQWUsQ0FBUyxPQUFPLENBQUMsQ0FBQztJQUMxRCxxQkFBcUIsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUM1RCxTQUFTLEdBQUcsSUFBSSxlQUFlLENBQVksWUFBWSxDQUFDLENBQUM7SUFDekQsWUFBWSxHQUFHLElBQUksZUFBZSxDQUFnQixFQUFFLENBQUMsQ0FBQztJQUN0RCxvQkFBb0IsR0FBRyxJQUFJLGVBQWUsQ0FBZ0IsRUFBRSxDQUFDLENBQUM7SUFDOUQsbUJBQW1CLEdBQUcsSUFBSSxlQUFlLENBQVMsQ0FBQyxDQUFDLENBQUM7SUFDckQsa0JBQWtCLEdBQUcsSUFBSSxlQUFlLENBQVMsRUFBRSxDQUFDLENBQUM7SUFFckQsZUFBZSxHQUFHLElBQUksZUFBZSxDQUFrQixFQUFFLENBQUMsQ0FBQztJQUMzRCxlQUFlLEdBQUcsSUFBSSxlQUFlLENBQXlCLElBQUksQ0FBQyxDQUFDO0lBQ3BFLFdBQVcsR0FBRyxJQUFJLGVBQWUsQ0FBVyxFQUFFLENBQUMsQ0FBQztJQUNoRCxpQkFBaUIsR0FBRyxJQUFJLGVBQWUsQ0FBMkIsSUFBSSxDQUFDLENBQUM7SUFDeEUsYUFBYSxHQUFHLElBQUksZUFBZSxDQUFTLENBQUMsQ0FBQyxDQUFDO0lBQy9DLGFBQWEsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUNwRCxXQUFXLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFDbEQsZUFBZSxHQUFHLElBQUksZUFBZSxDQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ2pELGtCQUFrQixHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQ3pELE1BQU0sR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUM3QyxpQkFBaUIsR0FBRyxJQUFJLGVBQWUsQ0FBUyxXQUFXLENBQUMsQ0FBQztJQUM3RCxnQkFBZ0IsR0FBRyxJQUFJLGVBQWUsQ0FBUyxJQUFJLENBQUMsQ0FBQztJQUNyRCxvQkFBb0IsR0FBRyxJQUFJLGVBQWUsQ0FBUyxJQUFJLENBQUMsQ0FBQztJQUN6RCxPQUFPLEdBQUcsSUFBSSxlQUFlLENBQVUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQ3BFLFNBQVMsR0FBRyxJQUFJLGVBQWUsQ0FBUyxFQUFFLENBQUMsQ0FBQztJQUM1QyxPQUFPLEdBQUcsSUFBSSxlQUFlLENBQWMsRUFBaUIsQ0FBQyxDQUFDO0lBQzlELE9BQU8sR0FBRyxJQUFJLGVBQWUsQ0FBYyxFQUFpQixDQUFDLENBQUM7SUFDOUQsWUFBWSxHQUFHLElBQUksZUFBZSxDQUFtQixFQUFzQixDQUFDLENBQUM7SUFDN0UsT0FBTyxHQUFHLElBQUksZUFBZSxDQUFjLEVBQWlCLENBQUMsQ0FBQztJQUU5RCx5QkFBeUIsR0FBRyxJQUFJLGVBQWUsQ0FBUyxDQUFDLENBQUMsQ0FBQztJQUMzRCx5QkFBeUIsR0FBRyxJQUFJLGVBQWUsQ0FBUyxDQUFDLENBQUMsQ0FBQztJQUMzRCxxQkFBcUIsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUM1RCx5QkFBeUIsR0FBRyxJQUFJLGVBQWUsQ0FBUyxDQUFDLENBQUMsQ0FBQztJQUMzRCxtQ0FBbUMsR0FBRyxJQUFJLGVBQWUsQ0FBUyxDQUFDLENBQUMsQ0FBQztJQUNyRSx5QkFBeUIsR0FBRyxJQUFJLGVBQWUsQ0FBUyxDQUFDLENBQUMsQ0FBQztJQUMzRCx5QkFBeUIsR0FBRyxJQUFJLGVBQWUsQ0FBUyxDQUFDLENBQUMsQ0FBQztJQUMzRCxxQkFBcUIsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUM1RCx5QkFBeUIsR0FBRyxJQUFJLGVBQWUsQ0FBUyxDQUFDLENBQUMsQ0FBQztJQUMzRCxtQ0FBbUMsR0FBRyxJQUFJLGVBQWUsQ0FBUyxDQUFDLENBQUMsQ0FBQztJQUNyRSwrQkFBK0IsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUN0RSxpQ0FBaUMsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUN4RSx1Q0FBdUMsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUM5RSx5Q0FBeUMsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUNoRiw2QkFBNkIsR0FBRyxJQUFJLGVBQWUsQ0FBUyxXQUFXLENBQUMsQ0FBQztJQUN6RSxtQ0FBbUMsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUMxRSw0QkFBNEIsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUVuRSxtQkFBbUIsR0FBRyxJQUFJLGVBQWUsQ0FBc0I7UUFDN0QsU0FBUyxFQUFFO1lBQ1QsWUFBWSxFQUFFLE9BQU8sRUFBRSxtQkFBbUI7WUFDMUMsWUFBWSxFQUFFLEtBQUssRUFBRSw0QkFBNEI7WUFDakQsWUFBWSxFQUFFLEtBQUssRUFBRSxzQkFBc0I7WUFDM0MsU0FBUyxFQUFFLGFBQWEsRUFBRSxzQ0FBc0M7WUFDaEUsY0FBYyxFQUFFLEtBQUssRUFBRSxjQUFjO1lBQ3JDLG9CQUFvQixFQUFFLE9BQU8sRUFBRSwwQkFBMEI7WUFDekQsTUFBTSxFQUFFLEtBQUssRUFBRSxjQUFjO1NBQzlCO1FBQ0QsU0FBUyxFQUFFO1lBQ1QsUUFBUSxFQUFFLElBQUksRUFBRSxjQUFjO1lBQzlCLGVBQWUsRUFBRSxTQUFTLEVBQUUsdUJBQXVCO1lBQ25ELGFBQWEsRUFBRSxTQUFTLEVBQUUsdUJBQXVCO1lBQ2pELGdCQUFnQixFQUFFLFVBQVUsRUFBRSxpQ0FBaUM7U0FDaEU7S0FDRixDQUFDLENBQUM7SUFFSCxTQUFTLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFDaEQsV0FBVyxHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQ2xELFNBQVMsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUNoRCxtQkFBbUIsR0FBRyxJQUFJLGVBQWUsQ0FBd0IsSUFBSSxDQUFDLENBQUM7SUFDdkUsZUFBZSxHQUFHLElBQUksZUFBZSxDQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ2pELGlCQUFpQixHQUFHLElBQUksZUFBZSxDQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ25ELGNBQWMsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUNyRCxjQUFjLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFDckQsbUJBQW1CLEdBQUcsSUFBSSxlQUFlLENBQVMsS0FBSyxDQUFDLENBQUM7SUFDekQsVUFBVSxHQUFHLElBQUksZUFBZSxDQUFTLENBQUMsQ0FBQyxDQUFDO0lBQzVDLGdCQUFnQixHQUFHLElBQUksZUFBZSxDQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ2xELGVBQWUsR0FBRyxJQUFJLGVBQWUsQ0FBVSxJQUFJLENBQUMsQ0FBQztJQUNyRCxnQkFBZ0IsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUV2RCxlQUFlLEdBQUcsSUFBSSxlQUFlLENBQWdCLEVBQUUsQ0FBQyxDQUFDO0lBRXpELFFBQVEsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUMvQyxnQkFBZ0IsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUN2RCxXQUFXLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFDbEQsVUFBVSxHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQ2pELFdBQVcsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUNsRCxRQUFRLEdBQUcsSUFBSSxlQUFlLENBQVMsRUFBRSxDQUFDLENBQUM7SUFDM0MsZUFBZSxHQUFHLElBQUksZUFBZSxDQUEyQixFQUFFLENBQUMsQ0FBQztJQUNwRSxpQkFBaUIsR0FBRyxJQUFJLGVBQWUsQ0FBMkIsRUFBRSxDQUFDLENBQUM7SUFDdEUsb0JBQW9CLEdBQUcsSUFBSSxlQUFlLENBQVcsRUFBRSxDQUFDLENBQUM7SUFDekQsWUFBWSxHQUFHLElBQUksZUFBZSxDQUFXLEVBQUUsQ0FBQyxDQUFDO0lBQ2pELG1CQUFtQixHQUFHLElBQUksZUFBZSxDQUFTLEVBQUUsQ0FBQyxDQUFDO0lBQ3RELHFCQUFxQixHQUFHLElBQUksZUFBZSxDQUFTLEVBQUUsQ0FBQyxDQUFDO0lBQ3hELGFBQWEsR0FBRyxJQUFJLGVBQWUsQ0FBUyxFQUFFLENBQUMsQ0FBQztJQUNoRCxlQUFlLEdBQUcsSUFBSSxlQUFlLENBQVMsRUFBRSxDQUFDLENBQUM7SUFDbEQsWUFBWSxHQUFHLElBQUksZUFBZSxDQUEyQixFQUFFLENBQUMsQ0FBQztJQUNqRSxlQUFlLEdBQUcsSUFBSSxlQUFlLENBQVcsRUFBRSxDQUFDLENBQUM7SUFDcEQsV0FBVyxHQUFHLElBQUksZUFBZSxDQUFxQixJQUFJLENBQUMsQ0FBQztJQUM1RCxhQUFhLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFDcEQsYUFBYSxHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQ3BELFlBQVksR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUNuRCxhQUFhLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFDcEQsb0JBQW9CLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFDM0QsaUJBQWlCLEdBQUcsSUFBSSxlQUFlLENBQWdCLElBQUksQ0FBQyxDQUFDO0lBQzdELGdCQUFnQixHQUFHLElBQUksZUFBZSxDQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ2xELFdBQVcsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUNsRCxnQkFBZ0IsR0FBRyxJQUFJLGVBQWUsQ0FBcUIsSUFBSSxDQUFDLENBQUM7SUFDakUsMkJBQTJCLEdBQUcsSUFBSSxlQUFlLENBQVMsRUFBRSxDQUFDLENBQUM7SUFDOUQsaUJBQWlCLEdBQUcsSUFBSSxlQUFlLENBQVMsTUFBTSxDQUFDLENBQUM7SUFDeEQsY0FBYyxHQUFHLElBQUksZUFBZSxDQUFTLE1BQU0sQ0FBQyxDQUFDO0lBQ3JELFVBQVUsR0FBRyxJQUFJLGVBQWUsQ0FBUyxFQUFFLENBQUMsQ0FBQztJQUM3QyxPQUFPLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFDOUMsZUFBZSxHQUFHLElBQUksZUFBZSxDQUFXLEVBQUUsQ0FBQyxDQUFDO0lBQ3BELGlCQUFpQixHQUFHLElBQUksZUFBZSxDQUFXLEVBQUUsQ0FBQyxDQUFDO0lBQ3RELFdBQVcsR0FBRyxJQUFJLGVBQWUsQ0FBVyxFQUFFLENBQUMsQ0FBQztJQUNoRCxlQUFlLEdBQUcsSUFBSSxlQUFlLENBQVcsRUFBRSxDQUFDLENBQUM7SUFDcEQsYUFBYSxHQUFHLElBQUksZUFBZSxDQUFXLEVBQUUsQ0FBQyxDQUFDO0lBQ2xELGVBQWUsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUN0RCxtQkFBbUIsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUMxRCxlQUFlLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFDdEQsU0FBUyxHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQ2hELFlBQVksR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUNuRCxVQUFVLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFDakQsaUJBQWlCLEdBQUcsSUFBSSxlQUFlLENBQWdCLElBQUksQ0FBQyxDQUFDO0lBQzdELGtCQUFrQixHQUFHLElBQUksZUFBZSxDQUFnQixJQUFJLENBQUMsQ0FBQztJQUM5RCxnQkFBZ0IsR0FBRyxJQUFJLGVBQWUsQ0FBZ0IsSUFBSSxDQUFDLENBQUM7SUFDNUQsZ0JBQWdCLEdBQUcsSUFBSSxlQUFlLENBQVMsQ0FBQyxDQUFDLENBQUM7SUFDbEQsaUJBQWlCLEdBQUcsSUFBSSxlQUFlLENBQVMsQ0FBQyxDQUFDLENBQUM7SUFDbkQsZUFBZSxHQUFHLElBQUksZUFBZSxDQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ2pELDRCQUE0QixHQUFHLElBQUksZUFBZSxDQUFTLEdBQUcsQ0FBQyxDQUFDO0lBQ2hFLFdBQVcsR0FBRyxJQUFJLGVBQWUsQ0FBVyxFQUFFLENBQUMsQ0FBQztJQUNoRCxTQUFTLEdBQUcsSUFBSSxlQUFlLENBQVMsTUFBTSxDQUFDLENBQUM7SUFDaEQsZ0JBQWdCLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFDdkQsaUJBQWlCLEdBQUcsSUFBSSxlQUFlLENBQXFCLElBQUksQ0FBQyxDQUFDO0lBQ2xFLGVBQWUsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUN0RCxhQUFhLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFDcEQsV0FBVyxHQUFHLElBQUksZUFBZSxDQUFTLEVBQUUsQ0FBQyxDQUFDO0lBQzlDLGFBQWEsR0FBRyxJQUFJLGVBQWUsQ0FBMkIsRUFBRSxDQUFDLENBQUM7SUFDbEUsVUFBVSxHQUFHLElBQUksZUFBZSxDQUFTLEVBQUUsQ0FBQyxDQUFDO0lBQzdDLFdBQVcsR0FBRyxJQUFJLGVBQWUsQ0FBVyxFQUFFLENBQUMsQ0FBQztJQUNoRCxrQkFBa0IsR0FBRyxJQUFJLGVBQWUsQ0FBZ0IsRUFBRSxDQUFDLENBQUM7SUFDNUQsaUJBQWlCLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFDeEQsYUFBYSxHQUFHLElBQUksZUFBZSxDQUFrQixFQUFFLENBQUMsQ0FBQztJQUN6RCxvQkFBb0IsR0FBRyxJQUFJLGVBQWUsQ0FBMkIsRUFBRSxDQUFDLENBQUM7SUFDekUsd0JBQXdCLEdBQUcsSUFBSSxlQUFlLENBQWdCLEVBQUUsQ0FBQyxDQUFDO0lBQ2xFLGdCQUFnQixHQUFHLElBQUksZUFBZSxDQUE2QixFQUFFLENBQUMsQ0FBQztJQUN2RSxnQkFBZ0IsR0FBRyxJQUFJLGVBQWUsQ0FBcUIsSUFBSSxDQUFDLENBQUM7SUFDakUsVUFBVSxHQUFHLElBQUksZUFBZSxDQUFTLEVBQUUsQ0FBQyxDQUFDO0lBQzdDLDJCQUEyQixHQUFHLElBQUksZUFBZSxDQUFTLEVBQUUsQ0FBQyxDQUFDO0lBQzlELDRCQUE0QixHQUFHLElBQUksZUFBZSxDQUFTLEVBQUUsQ0FBQyxDQUFDO0lBQy9ELG9CQUFvQixHQUFHLElBQUksZUFBZSxDQUFTLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZELG9CQUFvQixHQUFHLElBQUksZUFBZSxDQUFTLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZELFdBQVcsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUNsRCxnQkFBZ0IsR0FBRyxJQUFJLGVBQWUsQ0FBUyxFQUFFLENBQUMsQ0FBQztJQUNuRCxpQkFBaUIsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUN4RCxZQUFZLEdBQUcsSUFBSSxlQUFlLENBQWdCO1FBQ2hEO1lBQ0UsZ0JBQWdCLEVBQUUsRUFBRTtZQUNwQixvQkFBb0IsRUFBRSxFQUFFO1lBQ3hCLGdCQUFnQixFQUFFLEtBQUs7WUFDdkIsaUJBQWlCLEVBQUUsS0FBSztTQUN6QjtLQUNGLENBQUMsQ0FBQztJQUNILGdCQUFnQixHQUFHLElBQUksZUFBZSxDQUFnQjtRQUNwRDtZQUNFLGdCQUFnQixFQUFFLEVBQUU7WUFDcEIsb0JBQW9CLEVBQUUsRUFBRTtZQUN4QixnQkFBZ0IsRUFBRSxLQUFLO1lBQ3ZCLGlCQUFpQixFQUFFLEtBQUs7U0FDekI7S0FDRixDQUFDLENBQUM7SUFDSCxlQUFlLEdBQUcsSUFBSSxlQUFlLENBQWdCLElBQUksQ0FBQyxDQUFDO0lBQzNELFVBQVUsR0FBRyxJQUFJLGVBQWUsQ0FBZ0IsSUFBSSxDQUFDLENBQUM7SUFDdEQsa0JBQWtCLEdBQUcsSUFBSSxlQUFlLENBQVMsQ0FBQyxDQUFDLENBQUM7SUFDcEQsY0FBYyxHQUFHLElBQUksZUFBZSxDQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ2hELGFBQWEsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUNwRCxZQUFZLEdBQUcsSUFBSSxlQUFlLENBQVMsQ0FBQyxDQUFDLENBQUM7SUFDOUMsZUFBZSxHQUFHLElBQUksZUFBZSxDQUFTLEtBQUssQ0FBQyxDQUFDO0lBQ3JELG1CQUFtQixHQUFHLElBQUksZUFBZSxDQUFTLEtBQUssQ0FBQyxDQUFDO0lBQ3pELGVBQWUsR0FBRyxJQUFJLGVBQWUsQ0FBUyxDQUFDLENBQUMsQ0FBQztJQUNqRCxjQUFjLEdBQUcsSUFBSSxlQUFlLENBQVcsRUFBRSxDQUFDLENBQUM7SUFDbkQsZUFBZSxHQUFHLElBQUksZUFBZSxDQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ2pELGVBQWUsR0FBRyxJQUFJLGVBQWUsQ0FDbkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQ3ZGLENBQUM7SUFDRixtQkFBbUIsR0FBRyxJQUFJLGVBQWUsQ0FBUyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlFLGNBQWMsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUNyRCxVQUFVLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFDakQsVUFBVSxHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQ2pELFFBQVEsR0FBRyxJQUFJLGVBQWUsQ0FBMkIsRUFBRSxDQUFDLENBQUM7SUFDN0QsY0FBYyxHQUFHLElBQUksZUFBZSxDQUEyQixFQUFFLENBQUMsQ0FBQztJQUNuRSxhQUFhLEdBQUcsSUFBSSxlQUFlLENBQ2pDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxLQUFLLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssS0FBSyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUN2RixDQUFDO0lBQ0YsWUFBWSxHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQ25ELGNBQWMsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUNyRCxhQUFhLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFDcEQsT0FBTyxHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQzlDLFVBQVUsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUNqRCxRQUFRLEdBQUcsSUFBSSxlQUFlLENBQVMsQ0FBQyxDQUFDLENBQUM7SUFDMUMsUUFBUSxHQUFHLElBQUksZUFBZSxDQUFTLENBQUMsQ0FBQyxDQUFDO0lBQzFDLFdBQVcsR0FBRyxJQUFJLGVBQWUsQ0FBUyxDQUFDLENBQUMsQ0FBQztJQUM3QyxXQUFXLEdBQUcsSUFBSSxlQUFlLENBQVMsQ0FBQyxDQUFDLENBQUM7SUFDN0MsV0FBVyxHQUFHLElBQUksZUFBZSxDQUFTLENBQUMsQ0FBQyxDQUFDO0lBQzdDLGNBQWMsR0FBRyxJQUFJLGVBQWUsQ0FBMkIsRUFBRSxDQUFDLENBQUM7SUFDbkUsWUFBWSxHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQ25ELE9BQU8sR0FBRyxJQUFJLGVBQWUsQ0FBcUIsSUFBSSxDQUFDLENBQUM7SUFDeEQsYUFBYSxHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQ3BELGVBQWUsR0FBRyxJQUFJLGVBQWUsQ0FBMkIsRUFBRSxDQUFDLENBQUM7SUFDcEUsa0JBQWtCLEdBQUcsSUFBSSxlQUFlLENBQVcsRUFBRSxDQUFDLENBQUM7SUFDdkQsY0FBYyxHQUFHLElBQUksZUFBZSxDQUFrQixJQUFJLENBQUMsQ0FBQztJQUM1RCxVQUFVLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFDakQscUJBQXFCLEdBQUcsSUFBSSxlQUFlLENBQVMsRUFBRSxDQUFDLENBQUM7SUFDeEQsbUJBQW1CLEdBQUcsSUFBSSxlQUFlLENBQTRCLFlBQVksQ0FBQyxDQUFDO0lBQ25GLFNBQVMsR0FBRyxJQUFJLGVBQWUsQ0FBWTtRQUN6QyxTQUFTLEVBQUUsQ0FBQztRQUNaLFVBQVUsRUFBRSxDQUFDO1FBQ2IsWUFBWSxFQUFFLENBQUM7UUFDZixhQUFhLEVBQUUsQ0FBQztLQUNqQixDQUFDLENBQUM7SUFDSCxzQkFBc0IsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUM3RCxjQUFjLEdBQUcsSUFBSSxlQUFlLENBQXlCLEVBQUUsQ0FBQyxDQUFDO0lBQ2pFLGdCQUFnQixHQUFHLElBQUksZUFBZSxDQUEyQixFQUFFLENBQUMsQ0FBQztJQUNyRSxnQkFBZ0IsR0FBRyxJQUFJLGVBQWUsQ0FBeUIsRUFBRSxDQUFDLENBQUM7SUFDbkUsV0FBVyxHQUFHLElBQUksZUFBZSxDQUFvQixFQUFFLENBQUMsQ0FBQztJQUN6RCxXQUFXLEdBQUcsSUFBSSxlQUFlLENBQW9CLEVBQUUsQ0FBQyxDQUFDO0lBQ3pELG1CQUFtQixHQUFHLElBQUksZUFBZSxDQUFTLFVBQVUsQ0FBQyxDQUFDO0lBQzlELGtCQUFrQixHQUFHLElBQUksZUFBZSxDQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ3BELGdCQUFnQixHQUFHLElBQUksZUFBZSxDQUFnQixFQUFFLENBQUMsQ0FBQztJQUUxRCxlQUFlLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUNuQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QixDQUFDLENBQUM7SUFFRixZQUFZLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtRQUMvQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMxQixDQUFDLENBQUM7SUFFRixZQUFZLEdBQUcsQ0FBQyxLQUFvQixFQUFFLEVBQUU7UUFDdEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUIsQ0FBQyxDQUFDO0lBRUYsY0FBYyxHQUFHLENBQUMsS0FBOEIsRUFBRSxFQUFFO1FBQ2xELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVCLENBQUMsQ0FBQztJQUVGLFlBQVksR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQy9CLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFCLENBQUMsQ0FBQztJQUVGLGlCQUFpQixHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7UUFDcEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0IsQ0FBQyxDQUFDO0lBRUYsY0FBYyxHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7UUFDakMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUIsQ0FBQyxDQUFDO0lBRUYsVUFBVSxHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7UUFDN0IsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDeEIsQ0FBQyxDQUFDO0lBRUYsY0FBYyxHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7UUFDakMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUIsQ0FBQyxDQUFDO0lBRUYsWUFBWSxHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7UUFDL0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUIsQ0FBQyxDQUFDO0lBRUYsbUJBQW1CLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtRQUN0QyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQyxDQUFDLENBQUM7SUFFRixhQUFhLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtRQUNoQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzQixDQUFDLENBQUM7SUFFRixZQUFZLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtRQUMvQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMxQixDQUFDLENBQUM7SUFFRiwwQkFBMEIsR0FBRyxDQUFDLEtBQTZCLEVBQUUsRUFBRTtRQUM3RCxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3hDLENBQUMsQ0FBQztJQUVGLGtCQUFrQixHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDdEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEMsQ0FBQyxDQUFDO0lBRUYsZ0JBQWdCLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUNwQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QixDQUFDLENBQUM7SUFFRix1QkFBdUIsR0FBRyxDQUFDLEtBQWMsRUFBRSxFQUFFO1FBQzNDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckMsQ0FBQyxDQUFDO0lBRUYsd0JBQXdCLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtRQUMzQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3RDLENBQUMsQ0FBQztJQUVGLDJCQUEyQixHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDL0MsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN6QyxDQUFDLENBQUM7SUFFRixlQUFlLEdBQUcsQ0FBQyxLQUFnQixFQUFFLEVBQUU7UUFDckMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0IsSUFBSSxLQUFLLElBQUksTUFBTSxFQUFFLENBQUM7WUFDcEIsSUFBSSxDQUFDO2dCQUNILFVBQVUsQ0FBQyxHQUFHLEVBQUU7b0JBQ2QsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO2dCQUN0QixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDWCxDQUFDO1lBQUMsTUFBTSxDQUFDO2dCQUNQLGtCQUFrQjtZQUNwQixDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUMsQ0FBQztJQUVGLGtCQUFrQixHQUFHLENBQUMsS0FBb0IsRUFBRSxFQUFFO1FBQzVDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMxRCxDQUFDLENBQUM7SUFFRiwwQkFBMEIsR0FBRyxDQUFDLEtBQW9CLEVBQUUsRUFBRTtRQUNwRCxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3hDLENBQUMsQ0FBQztJQUVGLHlCQUF5QixHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7UUFDNUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2QyxDQUFDLENBQUM7SUFFRix3QkFBd0IsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQzNDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEMsQ0FBQyxDQUFDO0lBRUYscUJBQXFCLEdBQUcsQ0FBQyxLQUFzQixFQUFFLEVBQUU7UUFDakQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkMsQ0FBQyxDQUFDO0lBRUYscUJBQXFCLEdBQUcsQ0FBQyxLQUE2QixFQUFFLEVBQUU7UUFDeEQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkMsQ0FBQyxDQUFDO0lBRUYsaUJBQWlCLEdBQUcsQ0FBQyxLQUFlLEVBQUUsRUFBRTtRQUN0QyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQixDQUFDLENBQUM7SUFFRix1QkFBdUIsR0FBRyxDQUFDLEtBQStCLEVBQUUsRUFBRTtRQUM1RCxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JDLENBQUMsQ0FBQztJQUVGLG1CQUFtQixHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7UUFDdEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakMsQ0FBQyxDQUFDO0lBRUYsbUJBQW1CLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUN2QyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQyxDQUFDLENBQUM7SUFFRixpQkFBaUIsR0FBRyxDQUFDLEtBQWMsRUFBRSxFQUFFO1FBQ3JDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9CLENBQUMsQ0FBQztJQUVGLHFCQUFxQixHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7UUFDeEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkMsQ0FBQyxDQUFDO0lBRUYsd0JBQXdCLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUM1QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3RDLENBQUMsQ0FBQztJQUVGLFlBQVksR0FBRyxDQUFDLEtBQWMsRUFBRSxFQUFFO1FBQ2hDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkMsSUFBSSxLQUFLLEVBQUUsQ0FBQztZQUNWLFVBQVUsQ0FBQyxLQUFLLElBQUksRUFBRTtnQkFDcEIsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzVDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNYLENBQUM7SUFDSCxDQUFDLENBQUM7SUFFRix1QkFBdUIsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQzFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckMsQ0FBQyxDQUFDO0lBRUYsc0JBQXNCLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtRQUN6QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BDLENBQUMsQ0FBQztJQUVGLDBCQUEwQixHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7UUFDN0MsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN4QyxDQUFDLENBQUM7SUFFRixhQUFhLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUNqQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzQixDQUFDLENBQUM7SUFFRixlQUFlLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtRQUNsQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QixDQUFDLENBQUM7SUFFRixhQUFhLEdBQUcsQ0FBQyxLQUFrQixFQUFFLEVBQUU7UUFDckMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0IsQ0FBQyxDQUFDO0lBRUYsYUFBYSxHQUFHLENBQUMsS0FBa0IsRUFBRSxFQUFFO1FBQ3JDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNCLENBQUMsQ0FBQztJQUVGLGtCQUFrQixHQUFHLENBQUMsS0FBdUIsRUFBRSxFQUFFO1FBQy9DLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hDLENBQUMsQ0FBQztJQUVGLGFBQWEsR0FBRyxDQUFDLEtBQWtCLEVBQUUsRUFBRTtRQUNyQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzQixDQUFDLENBQUM7SUFFRiwrQkFBK0IsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQ2xELElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0MsQ0FBQyxDQUFDO0lBRUYsK0JBQStCLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtRQUNsRCxJQUFJLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdDLENBQUMsQ0FBQztJQUVGLDJCQUEyQixHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDL0MsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN6QyxDQUFDLENBQUM7SUFFRiwrQkFBK0IsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQ2xELElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0MsQ0FBQyxDQUFDO0lBRUYseUNBQXlDLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtRQUM1RCxJQUFJLENBQUMsbUNBQW1DLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZELENBQUMsQ0FBQztJQUVGLCtCQUErQixHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7UUFDbEQsSUFBSSxDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QyxDQUFDLENBQUM7SUFFRiwrQkFBK0IsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQ2xELElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0MsQ0FBQyxDQUFDO0lBRUYsMkJBQTJCLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUMvQyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3pDLENBQUMsQ0FBQztJQUVGLCtCQUErQixHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7UUFDbEQsSUFBSSxDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QyxDQUFDLENBQUM7SUFFRix5Q0FBeUMsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQzVELElBQUksQ0FBQyxtQ0FBbUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkQsQ0FBQyxDQUFDO0lBRUYscUNBQXFDLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUN6RCxJQUFJLENBQUMsK0JBQStCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25ELENBQUMsQ0FBQztJQUVGLHVDQUF1QyxHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDM0QsSUFBSSxDQUFDLGlDQUFpQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyRCxDQUFDLENBQUM7SUFFRiw2Q0FBNkMsR0FBRyxDQUFDLEtBQWMsRUFBRSxFQUFFO1FBQ2pFLElBQUksQ0FBQyx1Q0FBdUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0QsQ0FBQyxDQUFDO0lBRUYsK0NBQStDLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUNuRSxJQUFJLENBQUMseUNBQXlDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdELENBQUMsQ0FBQztJQUVGLG1DQUFtQyxHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7UUFDdEQsSUFBSSxDQUFDLDZCQUE2QixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqRCxDQUFDLENBQUM7SUFFRix5Q0FBeUMsR0FBRyxDQUFDLEtBQWMsRUFBRSxFQUFFO1FBQzdELElBQUksQ0FBQyxtQ0FBbUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkQsQ0FBQyxDQUFDO0lBRUYsa0NBQWtDLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUN0RCxJQUFJLENBQUMsNEJBQTRCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hELENBQUMsQ0FBQztJQUVGLHlCQUF5QixHQUFHLENBQUMsS0FBMEIsRUFBRSxFQUFFO1FBQ3pELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkMsQ0FBQyxDQUFDO0lBRUYsZUFBZSxHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDbkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0IsQ0FBQyxDQUFDO0lBRUYsaUJBQWlCLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUNyQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQixDQUFDLENBQUM7SUFFRixlQUFlLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUNuQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QixDQUFDLENBQUM7SUFFRix5QkFBeUIsR0FBRyxDQUFDLEtBQTRCLEVBQUUsRUFBRTtRQUMzRCxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZDLENBQUMsQ0FBQztJQUVGLHFCQUFxQixHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7UUFDeEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkMsQ0FBQyxDQUFDO0lBRUYsdUJBQXVCLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtRQUMxQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JDLENBQUMsQ0FBQztJQUVGLG9CQUFvQixHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDeEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbEMsQ0FBQyxDQUFDO0lBRUYsb0JBQW9CLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUN4QyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNsQyxDQUFDLENBQUM7SUFFRix5QkFBeUIsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQzVDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkMsQ0FBQyxDQUFDO0lBRUYsZ0JBQWdCLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtRQUNuQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QixDQUFDLENBQUM7SUFFRixzQkFBc0IsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQ3pDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEMsQ0FBQyxDQUFDO0lBRUYscUJBQXFCLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUN6QyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuQyxDQUFDLENBQUM7SUFFRixzQkFBc0IsR0FBRyxDQUFDLEtBQWMsRUFBRSxFQUFFO1FBQzFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEMsQ0FBQyxDQUFDO0lBRUYscUJBQXFCLEdBQUcsQ0FBQyxLQUFvQixFQUFFLEVBQUU7UUFDL0MsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkMsQ0FBQyxDQUFDO0lBRUYsY0FBYyxHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDbEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUIsQ0FBQyxDQUFDO0lBRUYsc0JBQXNCLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUMxQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BDLENBQUMsQ0FBQztJQUVGLGlCQUFpQixHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDckMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0IsQ0FBQyxDQUFDO0lBRUYsZ0JBQWdCLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUNwQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QixDQUFDLENBQUM7SUFFRixpQkFBaUIsR0FBRyxDQUFDLEtBQWMsRUFBRSxFQUFFO1FBQ3JDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9CLENBQUMsQ0FBQztJQUVGLGNBQWMsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQ2pDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVCLENBQUMsQ0FBQztJQUVGLHFCQUFxQixHQUFHLENBQUMsS0FBK0IsRUFBRSxFQUFFO1FBQzFELElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25DLENBQUMsQ0FBQztJQUVGLHVCQUF1QixHQUFHLENBQUMsS0FBK0IsRUFBRSxFQUFFO1FBQzVELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckMsQ0FBQyxDQUFDO0lBRUYsMEJBQTBCLEdBQUcsQ0FBQyxLQUFlLEVBQUUsRUFBRTtRQUMvQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3hDLENBQUMsQ0FBQztJQUVGLGtCQUFrQixHQUFHLENBQUMsS0FBZSxFQUFFLEVBQUU7UUFDdkMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEMsQ0FBQyxDQUFDO0lBRUYseUJBQXlCLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtRQUM1QyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZDLENBQUMsQ0FBQztJQUVGLDJCQUEyQixHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7UUFDOUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN6QyxDQUFDLENBQUM7SUFFRixtQkFBbUIsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQ3RDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pDLENBQUMsQ0FBQztJQUVGLHFCQUFxQixHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7UUFDeEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkMsQ0FBQyxDQUFDO0lBRUYsa0JBQWtCLEdBQUcsQ0FBQyxLQUErQixFQUFFLEVBQUU7UUFDdkQsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEMsQ0FBQyxDQUFDO0lBRUYscUJBQXFCLEdBQUcsQ0FBQyxLQUFlLEVBQUUsRUFBRTtRQUMxQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuQyxDQUFDLENBQUM7SUFFRixpQkFBaUIsR0FBRyxDQUFDLEtBQXlCLEVBQUUsRUFBRTtRQUNoRCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQixDQUFDLENBQUM7SUFFRixtQkFBbUIsR0FBRyxDQUFDLEtBQWMsRUFBRSxFQUFFO1FBQ3ZDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pDLENBQUMsQ0FBQztJQUVGLG1CQUFtQixHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDdkMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakMsQ0FBQyxDQUFDO0lBRUYsa0JBQWtCLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUN0QyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoQyxDQUFDLENBQUM7SUFFRixtQkFBbUIsR0FBRyxDQUFDLEtBQWMsRUFBRSxFQUFFO1FBQ3ZDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pDLENBQUMsQ0FBQztJQUVGLDBCQUEwQixHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDOUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN4QyxDQUFDLENBQUM7SUFFRix1QkFBdUIsR0FBRyxDQUFDLEtBQW9CLEVBQUUsRUFBRTtRQUNqRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JDLENBQUMsQ0FBQztJQUVGLHNCQUFzQixHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7UUFDekMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNwQyxDQUFDLENBQUM7SUFFRixpQkFBaUIsR0FBRyxDQUFDLEtBQWMsRUFBRSxFQUFFO1FBQ3JDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9CLENBQUMsQ0FBQztJQUVGLHNCQUFzQixHQUFHLENBQUMsS0FBeUIsRUFBRSxFQUFFO1FBQ3JELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEMsQ0FBQyxDQUFDO0lBRUYsaUNBQWlDLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtRQUNwRCxJQUFJLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9DLENBQUMsQ0FBQztJQUVGLHVCQUF1QixHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7UUFDMUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyQyxDQUFDLENBQUM7SUFFRixvQkFBb0IsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQ3ZDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xDLENBQUMsQ0FBQztJQUVGLGdCQUFnQixHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7UUFDbkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUIsQ0FBQyxDQUFDO0lBRUYsYUFBYSxHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDakMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0IsQ0FBQyxDQUFDO0lBRUYscUJBQXFCLEdBQUcsQ0FBQyxLQUFlLEVBQUUsRUFBRTtRQUMxQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuQyxDQUFDLENBQUM7SUFFRix1QkFBdUIsR0FBRyxDQUFDLEtBQWUsRUFBRSxFQUFFO1FBQzVDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckMsQ0FBQyxDQUFDO0lBRUYsaUJBQWlCLEdBQUcsQ0FBQyxLQUFlLEVBQUUsRUFBRTtRQUN0QyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQixDQUFDLENBQUM7SUFFRixxQkFBcUIsR0FBRyxDQUFDLEtBQWUsRUFBRSxFQUFFO1FBQzFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25DLENBQUMsQ0FBQztJQUVGLG1CQUFtQixHQUFHLENBQUMsS0FBZSxFQUFFLEVBQUU7UUFDeEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakMsQ0FBQyxDQUFDO0lBRUYscUJBQXFCLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUN6QyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuQyxDQUFDLENBQUM7SUFFRix5QkFBeUIsR0FBRyxDQUFDLEtBQWMsRUFBRSxFQUFFO1FBQzdDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkMsQ0FBQyxDQUFDO0lBRUYscUJBQXFCLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUN6QyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuQyxDQUFDLENBQUM7SUFFRixlQUFlLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUNuQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QixDQUFDLENBQUM7SUFFRixrQkFBa0IsR0FBRyxDQUFDLEtBQWMsRUFBRSxFQUFFO1FBQ3RDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hDLENBQUMsQ0FBQztJQUVGLGdCQUFnQixHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDcEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUIsQ0FBQyxDQUFDO0lBRUYsdUJBQXVCLEdBQUcsQ0FBQyxLQUFvQixFQUFFLEVBQUU7UUFDakQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyQyxDQUFDLENBQUM7SUFFRix3QkFBd0IsR0FBRyxDQUFDLEtBQW9CLEVBQUUsRUFBRTtRQUNsRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3RDLENBQUMsQ0FBQztJQUVGLHNCQUFzQixHQUFHLENBQUMsS0FBb0IsRUFBRSxFQUFFO1FBQ2hELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEMsQ0FBQyxDQUFDO0lBRUYsc0JBQXNCLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtRQUN6QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BDLENBQUMsQ0FBQztJQUVGLHVCQUF1QixHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7UUFDMUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyQyxDQUFDLENBQUM7SUFFRixxQkFBcUIsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQ3hDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25DLENBQUMsQ0FBQztJQUVGLGlCQUFpQixHQUFHLENBQUMsS0FBZSxFQUFFLEVBQUU7UUFDdEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0IsQ0FBQyxDQUFDO0lBRUYsZUFBZSxHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7UUFDbEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0IsQ0FBQyxDQUFDO0lBRUYsc0JBQXNCLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUMxQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BDLENBQUMsQ0FBQztJQUVGLHVCQUF1QixHQUFHLENBQUMsS0FBeUIsRUFBRSxFQUFFO1FBQ3RELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckMsQ0FBQyxDQUFDO0lBRUYscUJBQXFCLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUN6QyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuQyxDQUFDLENBQUM7SUFFRixtQkFBbUIsR0FBRyxDQUFDLEtBQWMsRUFBRSxFQUFFO1FBQ3ZDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pDLENBQUMsQ0FBQztJQUVGLGlCQUFpQixHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7UUFDcEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0IsQ0FBQyxDQUFDO0lBRUYsbUJBQW1CLEdBQUcsQ0FBQyxLQUErQixFQUFFLEVBQUU7UUFDeEQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakMsQ0FBQyxDQUFDO0lBRUYsZ0JBQWdCLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtRQUNuQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QixDQUFDLENBQUM7SUFFRixpQkFBaUIsR0FBRyxDQUFDLEtBQWUsRUFBRSxFQUFFO1FBQ3RDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9CLENBQUMsQ0FBQztJQUVGLHdCQUF3QixHQUFHLENBQUMsS0FBb0IsRUFBRSxFQUFFO1FBQ2xELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEMsQ0FBQyxDQUFDO0lBRUYsdUJBQXVCLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUMzQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JDLENBQUMsQ0FBQztJQUVGLG1CQUFtQixHQUFHLENBQUMsS0FBc0IsRUFBRSxFQUFFO1FBQy9DLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pDLENBQUMsQ0FBQztJQUVGLDBCQUEwQixHQUFHLENBQUMsS0FBK0IsRUFBRSxFQUFFO1FBQy9ELElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDeEMsQ0FBQyxDQUFDO0lBRUYsOEJBQThCLEdBQUcsQ0FBQyxLQUFvQixFQUFFLEVBQUU7UUFDeEQsSUFBSSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QyxDQUFDLENBQUM7SUFFRixzQkFBc0IsR0FBRyxDQUFDLEtBQWlDLEVBQUUsRUFBRTtRQUM3RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BDLENBQUMsQ0FBQztJQUVGLHNCQUFzQixHQUFHLENBQUMsS0FBeUIsRUFBRSxFQUFFO1FBQ3JELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEMsQ0FBQyxDQUFDO0lBRUYsZ0JBQWdCLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtRQUNuQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QixDQUFDLENBQUM7SUFFRixpQ0FBaUMsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQ3BELElBQUksQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0MsQ0FBQyxDQUFDO0lBRUYsa0NBQWtDLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtRQUNyRCxJQUFJLENBQUMsNEJBQTRCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hELENBQUMsQ0FBQztJQUVGLDBCQUEwQixHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7UUFDN0MsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN4QyxDQUFDLENBQUM7SUFFRiwwQkFBMEIsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQzdDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDeEMsQ0FBQyxDQUFDO0lBRUYsaUJBQWlCLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUNyQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQixDQUFDLENBQUM7SUFFRixzQkFBc0IsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQ3pDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEMsQ0FBQyxDQUFDO0lBRUYsdUJBQXVCLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUMzQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JDLENBQUMsQ0FBQztJQUVGLGtCQUFrQixHQUFHLENBQUMsS0FBb0IsRUFBRSxFQUFFO1FBQzVDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hDLENBQUMsQ0FBQztJQUVGLHNCQUFzQixHQUFHLENBQUMsS0FBb0IsRUFBRSxFQUFFO1FBQ2hELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEMsQ0FBQyxDQUFDO0lBRUYscUJBQXFCLEdBQUcsQ0FBQyxLQUFvQixFQUFFLEVBQUU7UUFDL0MsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkMsQ0FBQyxDQUFDO0lBRUYsZ0JBQWdCLEdBQUcsQ0FBQyxLQUFvQixFQUFFLEVBQUU7UUFDMUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUIsQ0FBQyxDQUFDO0lBRUYsd0JBQXdCLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtRQUMzQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3RDLENBQUMsQ0FBQztJQUVGLG9CQUFvQixHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7UUFDdkMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbEMsQ0FBQyxDQUFDO0lBRUYsbUJBQW1CLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUN2QyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQyxDQUFDLENBQUM7SUFFRixrQkFBa0IsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQ3JDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hDLENBQUMsQ0FBQztJQUVGLHFCQUFxQixHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7UUFDeEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkMsQ0FBQyxDQUFDO0lBRUYsb0JBQW9CLEdBQUcsQ0FBQyxLQUFlLEVBQUUsRUFBRTtRQUN6QyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNsQyxDQUFDLENBQUM7SUFFRixxQkFBcUIsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQ3hDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25DLENBQUMsQ0FBQztJQUVGLHFCQUFxQixHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7UUFDeEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkMsQ0FBQyxDQUFDO0lBRUYseUJBQXlCLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtRQUM1QyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZDLENBQUMsQ0FBQztJQUVGLG9CQUFvQixHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDeEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbEMsQ0FBQyxDQUFDO0lBRUYsZ0JBQWdCLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUNwQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QixDQUFDLENBQUM7SUFFRixnQkFBZ0IsR0FBRyxDQUFDLEtBQWMsRUFBRSxFQUFFO1FBQ3BDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlCLENBQUMsQ0FBQztJQUVGLGNBQWMsR0FBRyxDQUFDLEtBQStCLEVBQUUsRUFBRTtRQUNuRCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QixDQUFDLENBQUM7SUFFRixvQkFBb0IsR0FBRyxDQUFDLEtBQStCLEVBQUUsRUFBRTtRQUN6RCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNsQyxDQUFDLENBQUM7SUFFRixtQkFBbUIsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQ3RDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pDLENBQUMsQ0FBQztJQUVGLGtCQUFrQixHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDdEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEMsQ0FBQyxDQUFDO0lBRUYsb0JBQW9CLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUN4QyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNsQyxDQUFDLENBQUM7SUFFRixtQkFBbUIsR0FBRyxDQUFDLEtBQWMsRUFBRSxFQUFFO1FBQ3ZDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pDLENBQUMsQ0FBQztJQUVGLGFBQWEsR0FBRyxDQUFDLEtBQWMsRUFBRSxFQUFFO1FBQ2pDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNCLENBQUMsQ0FBQztJQUVGLGdCQUFnQixHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDcEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUIsQ0FBQyxDQUFDO0lBRUYsY0FBYyxHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7UUFDakMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUIsQ0FBQyxDQUFDO0lBRUYsY0FBYyxHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7UUFDakMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUIsQ0FBQyxDQUFDO0lBRUYsaUJBQWlCLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtRQUNwQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQixDQUFDLENBQUM7SUFFRixpQkFBaUIsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQ3BDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9CLENBQUMsQ0FBQztJQUVGLGlCQUFpQixHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7UUFDcEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0IsQ0FBQyxDQUFDO0lBRUYsb0JBQW9CLEdBQUcsQ0FBQyxLQUErQixFQUFFLEVBQUU7UUFDekQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbEMsQ0FBQyxDQUFDO0lBRUYsa0JBQWtCLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUN0QyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoQyxDQUFDLENBQUM7SUFFRixhQUFhLEdBQUcsQ0FBQyxLQUF5QixFQUFFLEVBQUU7UUFDNUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0IsQ0FBQyxDQUFDO0lBRUYsbUJBQW1CLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUN2QyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQyxDQUFDLENBQUM7SUFFRixxQkFBcUIsR0FBRyxDQUFDLEtBQStCLEVBQUUsRUFBRTtRQUMxRCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuQyxDQUFDLENBQUM7SUFFRix3QkFBd0IsR0FBRyxDQUFDLEtBQWUsRUFBRSxFQUFFO1FBQzdDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEMsQ0FBQyxDQUFDO0lBRUYsb0JBQW9CLEdBQUcsQ0FBQyxLQUFzQixFQUFFLEVBQUU7UUFDaEQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbEMsQ0FBQyxDQUFDO0lBRUYsZ0JBQWdCLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUNwQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QixDQUFDLENBQUM7SUFFRiwyQkFBMkIsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQzlDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDekMsQ0FBQyxDQUFDO0lBRUYseUJBQXlCLEdBQUcsQ0FBQyxLQUFnQyxFQUFFLEVBQUU7UUFDL0QsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2QyxDQUFDLENBQUM7SUFFRixlQUFlLEdBQUcsQ0FBQyxLQUFnQixFQUFFLEVBQUU7UUFDckMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0IsQ0FBQyxDQUFDO0lBRUYsNEJBQTRCLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUNoRCxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFDLENBQUMsQ0FBQztJQUVGLG9CQUFvQixHQUFHLENBQUMsS0FBNkIsRUFBRSxFQUFFO1FBQ3ZELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xDLENBQUMsQ0FBQztJQUVGLHNCQUFzQixHQUFHLENBQUMsS0FBK0IsRUFBRSxFQUFFO1FBQzNELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEMsQ0FBQyxDQUFDO0lBRUYsc0JBQXNCLEdBQUcsQ0FBQyxLQUE2QixFQUFFLEVBQUU7UUFDekQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNwQyxDQUFDLENBQUM7SUFFRixpQkFBaUIsR0FBRyxDQUFDLEtBQXdCLEVBQUUsRUFBRTtRQUMvQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQixDQUFDLENBQUM7SUFFRixpQkFBaUIsR0FBRyxDQUFDLEtBQXdCLEVBQUUsRUFBRTtRQUMvQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQixDQUFDLENBQUM7SUFFRix5QkFBeUIsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQzVDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkMsQ0FBQyxDQUFDO0lBRUYsd0JBQXdCLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtRQUMzQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3RDLENBQUMsQ0FBQztJQUVGLHNCQUFzQixHQUFHLENBQUMsS0FBb0IsRUFBRSxFQUFFO1FBQ2hELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEMsQ0FBQyxDQUFDO0lBRUYsV0FBVztJQUNYLFFBQVEsR0FBRyxJQUFJLGVBQWUsQ0FBWSxFQUFFLENBQUMsQ0FBQztJQUM5QyxrQkFBa0IsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUN6RCxvQkFBb0IsR0FBRyxJQUFJLGVBQWUsQ0FBcUIsSUFBSSxDQUFDLENBQUM7SUFDckUsaUJBQWlCLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFFeEQsaUJBQWlCO0lBQ2pCLFlBQVksR0FBRyxJQUFJLGVBQWUsQ0FBUyxPQUFPLENBQUMsQ0FBQztJQUNwRCxZQUFZLEdBQUcsSUFBSSxlQUFlLENBQVMsT0FBTyxDQUFDLENBQUM7SUFDcEQsa0JBQWtCLEdBQUcsSUFBSSxlQUFlLENBQVMsT0FBTyxDQUFDLENBQUM7SUFDMUQsV0FBVyxHQUFHLElBQUksZUFBZSxDQUFTLE9BQU8sQ0FBQyxDQUFDO0lBRW5ELG1CQUFtQjtJQUNuQixhQUFhLEdBQUcsSUFBSSxlQUFlLENBQVMsT0FBTyxDQUFDLENBQUM7SUFDckQsUUFBUSxHQUFHLElBQUksZUFBZSxDQUFVLElBQUksQ0FBQyxDQUFDO0lBQzlDLGdCQUFnQixHQUFHLElBQUksZUFBZSxDQUFVLElBQUksQ0FBQyxDQUFDO0lBQ3RELG9CQUFvQixHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQzNELHNCQUFzQixHQUFHLElBQUksZUFBZSxDQUFTLE9BQU8sQ0FBQyxDQUFDO0lBRTlELGVBQWU7SUFDZixpQkFBaUIsR0FBRyxJQUFJLGVBQWUsQ0FBUyxFQUFFLENBQUMsQ0FBQztJQUNwRCxlQUFlLEdBQUcsSUFBSSxlQUFlLENBQ25DLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQzVFLENBQUM7SUFDRixrQkFBa0IsR0FBRyxJQUFJLGVBQWUsQ0FBUyxDQUFDLENBQUMsQ0FBQztJQUNwRCx1QkFBdUIsR0FBRyxJQUFJLGVBQWUsQ0FDM0MsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FDNUUsQ0FBQztJQUVGLFdBQVc7SUFDWCxhQUFhLEdBQUcsSUFBSSxlQUFlLENBQVMsRUFBRSxDQUFDLENBQUM7SUFDaEQsV0FBVyxHQUFHLElBQUksZUFBZSxDQUMvQixJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUN0RSxDQUFDO0lBQ0YsY0FBYyxHQUFHLElBQUksZUFBZSxDQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ2hELG1CQUFtQixHQUFHLElBQUksZUFBZSxDQUN2QyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUN0RSxDQUFDO0lBRUYsa0NBQWtDO0lBQ2xDLFlBQVksR0FBRyxJQUFJLGVBQWUsQ0FBUyxDQUFDLENBQUMsQ0FBQztJQUU5QyxTQUFTO0lBQ1QsWUFBWSxHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQ25ELFlBQVksR0FBRyxJQUFJLGVBQWUsQ0FBUyxFQUFFLENBQUMsQ0FBQztJQUMvQyxTQUFTLEdBQUcsSUFBSSxlQUFlLENBQXVCLFNBQVMsQ0FBQyxDQUFDO0lBQ2pFLGFBQWEsR0FBRyxJQUFJLGVBQWUsQ0FBUyxJQUFJLENBQUMsQ0FBQztJQUVsRCxpQkFBaUI7SUFDakIsb0JBQW9CLEdBQUcsSUFBSSxlQUFlLENBQVUsSUFBSSxDQUFDLENBQUM7SUFDMUQsa0JBQWtCLEdBQUcsSUFBSSxlQUFlLENBQVMsQ0FBQyxDQUFDLENBQUM7SUFFcEQsY0FBYztJQUNkLGtCQUFrQixHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQ3pELHVCQUF1QixHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQzlELHNCQUFzQixHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQzdELHNCQUFzQixHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQzdELHFCQUFxQixHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQzVELG9CQUFvQixHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQzNELDJCQUEyQixHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQ2xFLDZCQUE2QixHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBRXBFLGVBQWU7SUFDZiwwQkFBMEIsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUNqRSxzQkFBc0IsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUM3RCx5QkFBeUIsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUNoRSx5QkFBeUIsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUNoRSx3QkFBd0IsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUMvRCxxQkFBcUIsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUU1RCxvQkFBb0I7SUFDcEIscUJBQXFCLEdBQUcsSUFBSSxlQUFlLENBQVMsT0FBTyxDQUFDLENBQUM7SUFDN0QscUJBQXFCLEdBQUcsSUFBSSxlQUFlLENBQVMsS0FBSyxDQUFDLENBQUM7SUFDM0QscUJBQXFCLEdBQUcsSUFBSSxlQUFlLENBQVMsS0FBSyxDQUFDLENBQUM7SUFDM0Qsa0JBQWtCLEdBQUcsSUFBSSxlQUFlLENBQVMsYUFBYSxDQUFDLENBQUM7SUFDaEUsdUJBQXVCLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFDOUQsb0JBQW9CLEdBQUcsSUFBSSxlQUFlLENBQTRCLE9BQU8sQ0FBQyxDQUFDO0lBQy9FLGVBQWUsR0FBRyxJQUFJLGVBQWUsQ0FBVSxJQUFJLENBQUMsQ0FBQztJQUNyRCxpQkFBaUIsR0FBRyxJQUFJLGVBQWUsQ0FBVSxJQUFJLENBQUMsQ0FBQztJQUN2RCx3QkFBd0IsR0FBRyxJQUFJLGVBQWUsQ0FBUyxTQUFTLENBQUMsQ0FBQztJQUNsRSxzQkFBc0IsR0FBRyxJQUFJLGVBQWUsQ0FBUyxTQUFTLENBQUMsQ0FBQztJQUNoRSxnQkFBZ0IsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUN2RCxtQkFBbUIsR0FBRyxJQUFJLGVBQWUsQ0FBUyxVQUFVLENBQUMsQ0FBQztJQUM5RCwyQkFBMkIsR0FBRyxJQUFJLGVBQWUsQ0FBUyxLQUFLLENBQUMsQ0FBQztJQUNqRSx3QkFBd0IsR0FBRyxJQUFJLGVBQWUsQ0FBUyxTQUFTLENBQUMsQ0FBQztJQUNsRSx5QkFBeUIsR0FBRyxJQUFJLGVBQWUsQ0FBUyxXQUFXLENBQUMsQ0FBQztJQUNyRSxlQUFlLEdBQUcsSUFBSSxlQUFlLENBQVUsSUFBSSxDQUFDLENBQUM7SUFDckQsZUFBZSxHQUFHLElBQUksZUFBZSxDQUFVLElBQUksQ0FBQyxDQUFDO0lBQ3JELFdBQVcsR0FBRyxJQUFJLGVBQWUsQ0FBUyxPQUFPLENBQUMsQ0FBQztJQUNuRCxpQkFBaUIsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUN4RCxxQkFBcUIsR0FBRyxJQUFJLGVBQWUsQ0FBUyxVQUFVLENBQUMsQ0FBQztJQUNoRSxjQUFjLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFDckQsY0FBYyxHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBRXJELGVBQWU7SUFDZixjQUFjLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFDckQsY0FBYyxHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBRXJELGNBQWMsR0FBRyxJQUFJLGVBQWUsQ0FBaUI7UUFDbkQsVUFBVSxFQUFFLENBQUM7UUFDYixXQUFXLEVBQUUsQ0FBQztRQUNkLFNBQVMsRUFBRSxDQUFDO1FBQ1osVUFBVSxFQUFFLENBQUM7S0FDZCxDQUFDLENBQUM7SUFFSCxjQUFjO0lBQ2QsbUJBQW1CLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFDMUQsa0JBQWtCLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFFekQsYUFBYTtJQUNiLGdCQUFnQixHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQ3ZELHFCQUFxQixHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQzVELHFCQUFxQixHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQzVELHNCQUFzQixHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQzdELGlCQUFpQixHQUFHLElBQUksZUFBZSxDQUFtQixJQUFJLENBQUMsQ0FBQztJQUNoRSxhQUFhLEdBQUcsSUFBSSxlQUFlLENBQWtCLElBQUksQ0FBQyxDQUFDO0lBQzNELE1BQU0sR0FBRyxJQUFJLGVBQWUsQ0FBa0IsRUFBcUIsQ0FBQyxDQUFDO0lBQ3JFLFdBQVcsR0FBRyxJQUFJLGVBQWUsQ0FBa0IsRUFBcUIsQ0FBQyxDQUFDO0lBQzFFLFdBQVcsR0FBRyxJQUFJLGVBQWUsQ0FBa0IsRUFBcUIsQ0FBQyxDQUFDO0lBQzFFLGFBQWEsR0FBRyxJQUFJLGVBQWUsQ0FBa0IsSUFBSSxDQUFDLENBQUM7SUFDM0Qsa0JBQWtCLEdBQUcsSUFBSSxlQUFlLENBQWtCLEVBQUUsQ0FBQyxDQUFDO0lBQzlELG1CQUFtQixHQUFHLElBQUksZUFBZSxDQUFXLEVBQUUsQ0FBQyxDQUFDO0lBRXhELFFBQVE7SUFDUixLQUFLLEdBQUcsSUFBSSxlQUFlLENBQ3pCLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQ2hFLENBQUM7SUFDRixJQUFJLEdBQUcsSUFBSSxlQUFlLENBQWMsSUFBSSxDQUFDLENBQUM7SUFDOUMsa0JBQWtCLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFFekQsYUFBYTtJQUNiLFdBQVcsR0FBRyxJQUFJLGVBQWUsQ0FBUyxFQUFFLENBQUMsQ0FBQztJQUM5QyxhQUFhLEdBQUcsSUFBSSxlQUFlLENBQVMsRUFBRSxDQUFDLENBQUM7SUFDaEQsWUFBWSxHQUFHLElBQUksZUFBZSxDQUFxQixJQUFJLENBQUMsQ0FBQztJQUM3RCxrQkFBa0IsR0FBRyxJQUFJLGVBQWUsQ0FBNEIsSUFBSSxDQUFDLENBQUM7SUFDMUUsaUJBQWlCLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFDeEQsZUFBZSxHQUFHLElBQUksZUFBZSxDQUFxQixJQUFJLENBQUMsQ0FBQztJQUNoRSxjQUFjLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFDckQsb0JBQW9CLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFDM0QsYUFBYSxHQUFHLElBQUksZUFBZSxDQUFxQixJQUFJLENBQUMsQ0FBQztJQUM5RCxVQUFVLEdBQUcsSUFBSSxlQUFlLENBQTJCLElBQUksQ0FBQyxDQUFDO0lBQ2pFLGtCQUFrQixHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQ3pELGlCQUFpQixHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQ3hELHdCQUF3QixHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQy9ELG1CQUFtQixHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBRTFELGlCQUFpQjtJQUNqQixhQUFhLEdBQUcsSUFBSSxlQUFlLENBQ2pDLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQ2hGLENBQUM7SUFDRixnQkFBZ0IsR0FBRyxJQUFJLGVBQWUsQ0FBUyxDQUFDLENBQUMsQ0FBQztJQUNsRCxnQkFBZ0IsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUN2RCxtQkFBbUIsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUMxRCxpQkFBaUIsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUN4RCxXQUFXLEdBQUcsSUFBSSxlQUFlLENBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5QyxnQkFBZ0IsR0FBRyxJQUFJLGVBQWUsQ0FBd0IsRUFBRSxDQUFDLENBQUM7SUFDbEUsZUFBZSxHQUFHLElBQUksZUFBZSxDQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ2pELFVBQVUsR0FBRyxJQUFJLGVBQWUsQ0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdDLDJCQUEyQixHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBRWxFLGFBQWE7SUFDYixlQUFlLEdBQUcsSUFBSSxlQUFlLENBQ25DLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxlQUFlLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQ3BGLENBQUM7SUFDRixzQkFBc0IsR0FBRyxJQUFJLGVBQWUsQ0FBUyxDQUFDLENBQUMsQ0FBQztJQUN4RCxrQkFBa0IsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUN6RCxpQkFBaUIsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUN4RCxlQUFlLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFDdEQsZUFBZSxHQUFHLElBQUksZUFBZSxDQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ2pELHdCQUF3QixHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQy9ELGlDQUFpQyxHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQ3hFLE1BQU0sR0FBRyxJQUFJLGVBQWUsQ0FBVSxFQUFFLENBQUMsQ0FBQztJQUMxQyxrQkFBa0IsR0FBRyxJQUFJLGVBQWUsQ0FBVSxJQUFJLENBQUMsQ0FBQztJQUN4RCxTQUFTLEdBQUcsSUFBSSxlQUFlLENBQVUsRUFBRSxDQUFDLENBQUM7SUFDN0MsU0FBUyxHQUFHLElBQUksZUFBZSxDQUFXLEVBQUUsQ0FBQyxDQUFDO0lBQzlDLFlBQVksR0FBRyxJQUFJLGVBQWUsQ0FBcUIsSUFBSSxDQUFDLENBQUM7SUFDN0QsZ0JBQWdCLEdBQUcsSUFBSSxlQUFlLENBQTJCLElBQUksQ0FBQyxDQUFDO0lBRXZFLGNBQWM7SUFDZCxpQkFBaUIsR0FBRyxJQUFJLGVBQWUsQ0FBMkIsSUFBSSxDQUFDLENBQUM7SUFDeEUscUJBQXFCLEdBQUcsSUFBSSxlQUFlLENBQXFCLElBQUksQ0FBQyxDQUFDO0lBQ3RFLG9CQUFvQixHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQzNELGdCQUFnQixHQUFHLElBQUksZUFBZSxDQUEyQixJQUFJLENBQUMsQ0FBQztJQUN2RSx5QkFBeUIsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUVoRSx5Q0FBeUM7SUFDekMsU0FBUyxHQUFHLElBQUksZUFBZSxDQUM3QixJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FDOUQsQ0FBQztJQUNGLFdBQVcsR0FBRyxJQUFJLGVBQWUsQ0FDL0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQzlELENBQUM7SUFDRixpQkFBaUIsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUN4RCxhQUFhLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFDcEQsa0JBQWtCLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFDekQsVUFBVSxHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQ2pELGNBQWMsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUVyRCxtQkFBbUI7SUFDbkIsY0FBYyxHQUFHLENBQUMsS0FBZ0IsRUFBRSxFQUFFO1FBQ3BDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVCLENBQUMsQ0FBQztJQUVGLHdCQUF3QixHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDNUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN0QyxDQUFDLENBQUM7SUFFRiwwQkFBMEIsR0FBRyxDQUFDLEtBQXlCLEVBQUUsRUFBRTtRQUN6RCxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3hDLENBQUMsQ0FBQztJQUVGLHVCQUF1QixHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDM0MsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyQyxDQUFDLENBQUM7SUFFRixrQkFBa0IsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQ3JDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hDLENBQUMsQ0FBQztJQUVGLGtCQUFrQixHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7UUFDckMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEMsQ0FBQyxDQUFDO0lBRUYsd0JBQXdCLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtRQUMzQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3RDLENBQUMsQ0FBQztJQUVGLGlCQUFpQixHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7UUFDcEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0IsQ0FBQyxDQUFDO0lBRUYsbUJBQW1CLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtRQUN0QyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQyxDQUFDLENBQUM7SUFFRixjQUFjLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUNsQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QixDQUFDLENBQUM7SUFFRixzQkFBc0IsR0FBRyxDQUFDLEtBQWMsRUFBRSxFQUFFO1FBQzFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEMsQ0FBQyxDQUFDO0lBRUYsMEJBQTBCLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUM5QyxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3hDLENBQUMsQ0FBQztJQUVGLDRCQUE0QixHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7UUFDL0MsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMxQyxDQUFDLENBQUM7SUFFRix3QkFBd0IsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQzNDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEMsQ0FBQyxDQUFDO0lBRUYsdUJBQXVCLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtRQUMxQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JDLENBQUMsQ0FBQztJQUVGLHFCQUFxQixHQUFHLENBQUMsS0FBK0IsRUFBRSxFQUFFO1FBQzFELElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDN0MsQ0FBQyxDQUFDO0lBRUYseUJBQXlCLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtRQUM1QyxJQUFJLEtBQUssS0FBSyxFQUFFLElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUNyQyxNQUFNLG1CQUFtQixHQUFHLElBQUksQ0FBQyxlQUFlO2lCQUM3QyxRQUFRLEVBQUU7aUJBQ1YsTUFBTSxDQUFDLENBQUMsV0FBbUMsRUFBRSxFQUFFO2dCQUM5QyxPQUFPLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1lBQ3RFLENBQUMsQ0FBQyxDQUFDO1lBQ0wsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBQ3ZELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0QsQ0FBQzthQUFNLENBQUM7WUFDTixJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztZQUNuRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkUsQ0FBQztJQUNILENBQUMsQ0FBQztJQUVGLGtCQUFrQixHQUFHLEdBQUcsRUFBRTtRQUN4QixJQUFJLENBQUMsMkJBQTJCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUMsQ0FBQyxDQUFDO0lBRUYsb0JBQW9CLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtRQUN2QyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNsQyxDQUFDLENBQUM7SUFFRixtQkFBbUIsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQ3RDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pDLENBQUMsQ0FBQztJQUVGLGlCQUFpQixHQUFHLENBQUMsS0FBZ0IsRUFBRSxFQUFFO1FBQ3ZDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3pDLENBQUMsQ0FBQztJQUVGLHFCQUFxQixHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7UUFDeEMsSUFBSSxLQUFLLEtBQUssRUFBRSxJQUFJLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDckMsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFnQixFQUFFLEVBQUU7Z0JBQzlFLE9BQU8sT0FBTyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7WUFDcEUsQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQy9DLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNuRCxDQUFDO2FBQU0sQ0FBQztZQUNOLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1lBQzNELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDL0QsQ0FBQztJQUNILENBQUMsQ0FBQztJQUVGLGNBQWMsR0FBRyxHQUFHLEVBQUU7UUFDcEIsSUFBSSxDQUFDLDRCQUE0QixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNDLENBQUMsQ0FBQztJQUVGLGtCQUFrQixHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7UUFDckMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEMsQ0FBQyxDQUFDO0lBRUYsa0JBQWtCLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUN0QyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoQyxDQUFDLENBQUM7SUFFRixrQkFBa0IsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQ3JDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hDLENBQUMsQ0FBQztJQUVGLGVBQWUsR0FBRyxDQUFDLEtBQTJCLEVBQUUsRUFBRTtRQUNoRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QixDQUFDLENBQUM7SUFFRixtQkFBbUIsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQ3RDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pDLENBQUMsQ0FBQztJQUVGLDBCQUEwQixHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDOUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN4QyxDQUFDLENBQUM7SUFFRix3QkFBd0IsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQzNDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEMsQ0FBQyxDQUFDO0lBRUYsd0JBQXdCLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUM1QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3RDLENBQUMsQ0FBQztJQUVGLDZCQUE2QixHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDakQsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6QyxJQUFJLEtBQUssRUFBRSxDQUFDO1lBQ1YsSUFBSSxDQUFDLHVCQUF1QixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3RDLENBQUM7YUFBTSxDQUFDO1lBQ04sSUFDRSxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRTtnQkFDL0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUU7Z0JBQy9CLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLEVBQzdCLENBQUM7Z0JBQ0QsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3JDLENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQyxDQUFDO0lBRUYsNEJBQTRCLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUNoRCxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFDLENBQUMsQ0FBQztJQUVGLDRCQUE0QixHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDaEQsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMxQyxDQUFDLENBQUM7SUFFRiwyQkFBMkIsR0FBRyxDQUFDLEtBQWMsRUFBRSxFQUFFO1FBQy9DLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDekMsQ0FBQyxDQUFDO0lBRUYsMEJBQTBCLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUM5QyxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3hDLENBQUMsQ0FBQztJQUVGLGlDQUFpQyxHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDckQsSUFBSSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQyxDQUFDLENBQUM7SUFFRixtQ0FBbUMsR0FBRyxDQUFDLEtBQWMsRUFBRSxFQUFFO1FBQ3ZELElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakQsQ0FBQyxDQUFDO0lBRUYsZ0NBQWdDLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUNwRCxJQUFJLENBQUMsMEJBQTBCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlDLENBQUMsQ0FBQztJQUVGLDRCQUE0QixHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDaEQsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDWCxJQUFJLENBQUMsdUJBQXVCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdEMsQ0FBQztJQUNILENBQUMsQ0FBQztJQUVGLCtCQUErQixHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDbkQsSUFBSSxDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QyxDQUFDLENBQUM7SUFFRiwrQkFBK0IsR0FBRyxDQUFDLEtBQWMsRUFBRSxFQUFFO1FBQ25ELElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0MsQ0FBQyxDQUFDO0lBRUYsMkJBQTJCLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUMvQyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3pDLENBQUMsQ0FBQztJQUVGLDhCQUE4QixHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDbEQsSUFBSSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QyxDQUFDLENBQUM7SUFFRiwyQkFBMkIsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQzlDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkMsQ0FBQyxDQUFDO0lBRUYsMkJBQTJCLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtRQUM5QyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25DLENBQUMsQ0FBQztJQUVGLDJCQUEyQixHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7UUFDOUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuQyxDQUFDLENBQUM7SUFFRix3QkFBd0IsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQzNDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkMsQ0FBQyxDQUFDO0lBRUYsNkJBQTZCLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUNqRCxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25DLENBQUMsQ0FBQztJQUVGLDBCQUEwQixHQUFHLENBQUMsS0FBZ0MsRUFBRSxFQUFFO1FBQ2hFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkMsQ0FBQyxDQUFDO0lBRUYscUJBQXFCLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUN6QyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuQyxDQUFDLENBQUM7SUFFRixzQkFBc0IsR0FBRyxDQUFDLEtBQWMsRUFBRSxFQUFFO1FBQzFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkMsQ0FBQyxDQUFDO0lBRUYseUJBQXlCLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtRQUM1QyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25DLENBQUMsQ0FBQztJQUVGLGlDQUFpQyxHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7UUFDcEQsSUFBSSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuQyxDQUFDLENBQUM7SUFFRiw4QkFBOEIsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQ2pELElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkMsQ0FBQyxDQUFDO0lBRUYsdUJBQXVCLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUMzQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25DLENBQUMsQ0FBQztJQUVGLDhCQUE4QixHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7UUFDakQsSUFBSSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuQyxDQUFDLENBQUM7SUFFRiw0QkFBNEIsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQy9DLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkMsQ0FBQyxDQUFDO0lBRUYsK0JBQStCLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtRQUNsRCxJQUFJLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25DLENBQUMsQ0FBQztJQUVGLHFCQUFxQixHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDekMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkMsQ0FBQyxDQUFDO0lBRUYscUJBQXFCLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUN6QyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuQyxDQUFDLENBQUM7SUFFRixpQkFBaUIsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQ3BDLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQzFELElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUM3QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMvQixDQUFDO2lCQUFNLENBQUM7Z0JBQ04sSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDbEMsQ0FBQztRQUNILENBQUM7YUFBTSxDQUFDO1lBQ04sSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDL0IsQ0FBQztRQUNELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9CLENBQUMsQ0FBQztJQUVGLHVCQUF1QixHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDM0MsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyQyxDQUFDLENBQUM7SUFFRiwyQkFBMkIsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQzlDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7SUFDakMsQ0FBQyxDQUFDO0lBRUYsb0JBQW9CLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUN4QyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNsQyxDQUFDLENBQUM7SUFFRixvQkFBb0IsR0FBRyxDQUFDLEtBQWMsRUFBRSxFQUFFO1FBQ3hDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xDLENBQUMsQ0FBQztJQUVGLG9CQUFvQixHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDeEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0IsQ0FBQyxDQUFDO0lBRUYsb0JBQW9CLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUN4QyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QixDQUFDLENBQUM7SUFFRixvQkFBb0IsR0FBRyxDQUFDLEtBQXFCLEVBQUUsRUFBRTtRQUMvQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNsQyxDQUFDLENBQUM7SUFFRix5QkFBeUIsR0FBRyxDQUFDLEtBQWMsRUFBRSxFQUFFO1FBQzdDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkMsQ0FBQyxDQUFDO0lBRUYsd0JBQXdCLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUM1QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3RDLENBQUMsQ0FBQztJQUVGLHVCQUF1QjtRQUNyQiw4Q0FBOEM7UUFDOUMsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRCxzQkFBc0I7UUFDcEIsOENBQThDO1FBQzlDLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQsc0JBQXNCLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUMxQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BDLENBQUMsQ0FBQztJQUVGLDJCQUEyQixHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDL0MsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN6QyxDQUFDLENBQUM7SUFFRiwyQkFBMkIsR0FBRyxDQUFDLEtBQWMsRUFBRSxFQUFFO1FBQy9DLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDekMsQ0FBQyxDQUFDO0lBRUYsNEJBQTRCLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUNoRCxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFDLENBQUMsQ0FBQztJQUVGLHVCQUF1QixHQUFHLENBQUMsS0FBdUIsRUFBRSxFQUFFO1FBQ3BELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckMsQ0FBQyxDQUFDO0lBRUYsbUJBQW1CLEdBQUcsQ0FBQyxLQUFzQixFQUFFLEVBQUU7UUFDL0MsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakMsQ0FBQyxDQUFDO0lBRUYsWUFBWSxHQUFHLENBQUMsS0FBc0IsRUFBRSxFQUFFO1FBQ3hDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFCLENBQUMsQ0FBQztJQUVGLGlCQUFpQixHQUFHLENBQUMsS0FBc0IsRUFBRSxFQUFFO1FBQzdDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9CLENBQUMsQ0FBQztJQUVGLGlCQUFpQixHQUFHLENBQUMsS0FBc0IsRUFBRSxFQUFFO1FBQzdDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9CLENBQUMsQ0FBQztJQUVGLG1CQUFtQixHQUFHLENBQUMsS0FBc0IsRUFBRSxFQUFFO1FBQy9DLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pDLENBQUMsQ0FBQztJQUVGLHdCQUF3QixHQUFHLENBQUMsS0FBc0IsRUFBRSxFQUFFO1FBQ3BELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEMsQ0FBQyxDQUFDO0lBRUYseUJBQXlCLEdBQUcsQ0FBQyxLQUFlLEVBQUUsRUFBRTtRQUM5QyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZDLENBQUMsQ0FBQztJQUVGLFdBQVcsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQzlCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3pCLENBQUMsQ0FBQztJQUVGLFVBQVUsR0FBRyxDQUFDLEtBQWtCLEVBQUUsRUFBRTtRQUNsQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN4QixDQUFDLENBQUM7SUFFRix3QkFBd0IsR0FBRyxDQUFDLEtBQWMsRUFBRSxFQUFFO1FBQzVDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEMsQ0FBQyxDQUFDO0lBRUYsaUJBQWlCLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtRQUNwQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQixDQUFDLENBQUM7SUFFRixtQkFBbUIsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQ3RDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pDLENBQUMsQ0FBQztJQUVGLGtCQUFrQixHQUFHLENBQUMsS0FBeUIsRUFBRSxFQUFFO1FBQ2pELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hDLENBQUMsQ0FBQztJQUVGLHdCQUF3QixHQUFHLENBQUMsS0FBZ0MsRUFBRSxFQUFFO1FBQzlELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEMsQ0FBQyxDQUFDO0lBRUYsdUJBQXVCLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUMzQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JDLENBQUMsQ0FBQztJQUVGLHFCQUFxQixHQUFHLENBQUMsS0FBeUIsRUFBRSxFQUFFO1FBQ3BELElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25DLENBQUMsQ0FBQztJQUVGLG9CQUFvQixHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDeEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbEMsQ0FBQyxDQUFDO0lBRUYsMEJBQTBCLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUM5QyxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3hDLENBQUMsQ0FBQztJQUVGLG1CQUFtQixHQUFHLENBQUMsS0FBeUIsRUFBRSxFQUFFO1FBQ2xELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pDLENBQUMsQ0FBQztJQUVGLGdCQUFnQixHQUFHLENBQUMsS0FBK0IsRUFBRSxFQUFFO1FBQ3JELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlCLENBQUMsQ0FBQztJQUVGLHdCQUF3QixHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDNUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN0QyxDQUFDLENBQUM7SUFFRix1QkFBdUIsR0FBRyxDQUFDLEtBQWMsRUFBRSxFQUFFO1FBQzNDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckMsQ0FBQyxDQUFDO0lBRUYsOEJBQThCLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUNsRCxJQUFJLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVDLENBQUMsQ0FBQztJQUVGLHlCQUF5QixHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDN0MsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2QyxDQUFDLENBQUM7SUFFRixtQkFBbUIsR0FBRyxDQUFDLEtBQThCLEVBQUUsRUFBRTtRQUN2RCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQyxDQUFDLENBQUM7SUFFRixzQkFBc0IsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQ3pDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEMsQ0FBQyxDQUFDO0lBRUYsc0JBQXNCLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUMxQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BDLENBQUMsQ0FBQztJQUVGLHlCQUF5QixHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDN0MsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2QyxDQUFDLENBQUM7SUFFRix1QkFBdUIsR0FBRyxDQUFDLEtBQWMsRUFBRSxFQUFFO1FBQzNDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckMsQ0FBQyxDQUFDO0lBRUYsaUJBQWlCLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtRQUNwQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQixDQUFDLENBQUM7SUFFRixzQkFBc0IsR0FBRyxDQUFDLEtBQTRCLEVBQUUsRUFBRTtRQUN4RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BDLENBQUMsQ0FBQztJQUVGLHFCQUFxQixHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7UUFDeEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkMsQ0FBQyxDQUFDO0lBRUYsZ0JBQWdCLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtRQUNuQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QixDQUFDLENBQUM7SUFFRixpQ0FBaUMsR0FBRyxDQUFDLEtBQWMsRUFBRSxFQUFFO1FBQ3JELElBQUksQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0MsQ0FBQyxDQUFDO0lBRUYscUJBQXFCLEdBQUcsQ0FBQyxLQUF1QixFQUFFLEVBQUU7UUFDbEQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkMsQ0FBQyxDQUFDO0lBRUYsNEJBQTRCLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtRQUMvQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFDLENBQUMsQ0FBQztJQUVGLHdCQUF3QixHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDNUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN0QyxDQUFDLENBQUM7SUFFRix1QkFBdUIsR0FBRyxDQUFDLEtBQWMsRUFBRSxFQUFFO1FBQzNDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckMsQ0FBQyxDQUFDO0lBRUYscUJBQXFCLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUN6QyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuQyxDQUFDLENBQUM7SUFFRixxQkFBcUIsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQ3hDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25DLENBQUMsQ0FBQztJQUVGLDhCQUE4QixHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDbEQsSUFBSSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QyxDQUFDLENBQUM7SUFFRix1Q0FBdUMsR0FBRyxDQUFDLEtBQWMsRUFBRSxFQUFFO1FBQzNELElBQUksQ0FBQyxpQ0FBaUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckQsQ0FBQyxDQUFDO0lBRUYsWUFBWSxHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDaEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUIsQ0FBQyxDQUFDO0lBRUYsd0JBQXdCLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUM1QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3RDLENBQUMsQ0FBQztJQUVGLGVBQWUsR0FBRyxDQUFDLEtBQWMsRUFBRSxFQUFFO1FBQ25DLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdCLENBQUMsQ0FBQztJQUVGLGVBQWUsR0FBRyxDQUFDLEtBQWUsRUFBRSxFQUFFO1FBQ3BDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdCLENBQUMsQ0FBQztJQUVGLGtCQUFrQixHQUFHLENBQUMsS0FBeUIsRUFBRSxFQUFFO1FBQ2pELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hDLENBQUMsQ0FBQztJQUVGLHNCQUFzQixHQUFHLENBQUMsS0FBK0IsRUFBRSxFQUFFO1FBQzNELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEMsQ0FBQyxDQUFDO0lBRUYsdUJBQXVCLEdBQUcsQ0FBQyxLQUErQixFQUFFLEVBQUU7UUFDNUQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyQyxDQUFDLENBQUM7SUFFRiwyQkFBMkIsR0FBRyxDQUFDLEtBQXlCLEVBQUUsRUFBRTtRQUMxRCxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3pDLENBQUMsQ0FBQztJQUVGLDBCQUEwQixHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDOUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN4QyxDQUFDLENBQUM7SUFFRixzQkFBc0IsR0FBRyxDQUFDLEtBQStCLEVBQUUsRUFBRTtRQUMzRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BDLENBQUMsQ0FBQztJQUVGLCtCQUErQixHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDbkQsSUFBSSxDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QyxDQUFDLENBQUM7SUFFRixnQkFBZ0IsR0FBRyxHQUFHLEVBQUU7UUFDdEIsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQztRQUN4RSxPQUFPLFVBQVUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUM7SUFDL0MsQ0FBQyxDQUFDO0lBRUYsU0FBUyxHQUFHLENBQUMsRUFDWCxPQUFPLEVBQ1AsSUFBSSxFQUNKLFFBQVEsR0FBRyxJQUFJLEdBS2hCLEVBQUUsRUFBRTtRQUNILElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEMsQ0FBQyxDQUFDO0lBRUYsWUFBWTtRQUNWLE9BQU87WUFDTCxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsZ0JBQWdCO1lBRXJELGVBQWU7WUFDZixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLO1lBQzdCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUs7WUFDekIsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSztZQUN2QyxZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLO1lBQ3JDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUs7WUFDakMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSztZQUMzQixpQkFBaUIsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSztZQUMvQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSztZQUNqRCxxQkFBcUIsRUFBRSxJQUFJLENBQUMscUJBQXFCLENBQUMsS0FBSztZQUN2RCxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLO1lBQy9CLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUs7WUFDckMsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEtBQUs7WUFDckQsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUs7WUFDbkQsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUs7WUFFakQsNEJBQTRCO1lBQzVCLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUs7WUFDM0MsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSztZQUMzQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLO1lBQ25DLGlCQUFpQixFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLO1lBQy9DLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUs7WUFDdkMsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSztZQUN2QyxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLO1lBQ25DLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUs7WUFDM0Msa0JBQWtCLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUs7WUFDakQsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSztZQUN6QixpQkFBaUIsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSztZQUMvQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSztZQUM3QyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSztZQUNyRCxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLO1lBQzNCLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUs7WUFDL0IsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSztZQUMzQixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLO1lBQzNCLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUs7WUFDckMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSztZQUUzQixnQ0FBZ0M7WUFDaEMseUJBQXlCLEVBQUUsSUFBSSxDQUFDLHlCQUF5QixDQUFDLEtBQUs7WUFDL0QseUJBQXlCLEVBQUUsSUFBSSxDQUFDLHlCQUF5QixDQUFDLEtBQUs7WUFDL0QscUJBQXFCLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUs7WUFDdkQseUJBQXlCLEVBQUUsSUFBSSxDQUFDLHlCQUF5QixDQUFDLEtBQUs7WUFDL0QsbUNBQW1DLEVBQUUsSUFBSSxDQUFDLG1DQUFtQyxDQUFDLEtBQUs7WUFDbkYseUJBQXlCLEVBQUUsSUFBSSxDQUFDLHlCQUF5QixDQUFDLEtBQUs7WUFDL0QseUJBQXlCLEVBQUUsSUFBSSxDQUFDLHlCQUF5QixDQUFDLEtBQUs7WUFDL0QscUJBQXFCLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUs7WUFDdkQseUJBQXlCLEVBQUUsSUFBSSxDQUFDLHlCQUF5QixDQUFDLEtBQUs7WUFDL0QsbUNBQW1DLEVBQUUsSUFBSSxDQUFDLG1DQUFtQyxDQUFDLEtBQUs7WUFDbkYsK0JBQStCLEVBQUUsSUFBSSxDQUFDLCtCQUErQixDQUFDLEtBQUs7WUFDM0UsaUNBQWlDLEVBQUUsSUFBSSxDQUFDLGlDQUFpQyxDQUFDLEtBQUs7WUFDL0UsdUNBQXVDLEVBQUUsSUFBSSxDQUFDLHVDQUF1QyxDQUFDLEtBQUs7WUFDM0YseUNBQXlDLEVBQ3ZDLElBQUksQ0FBQyx5Q0FBeUMsQ0FBQyxLQUFLO1lBQ3RELDZCQUE2QixFQUFFLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxLQUFLO1lBQ3ZFLG1DQUFtQyxFQUFFLElBQUksQ0FBQyxtQ0FBbUMsQ0FBQyxLQUFLO1lBQ25GLDRCQUE0QixFQUFFLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxLQUFLO1lBRXJFLG1CQUFtQixFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLO1lBQ25ELFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUs7WUFDL0IsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSztZQUNuQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLO1lBQy9CLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUs7WUFDM0MsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUs7WUFDL0MsY0FBYyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSztZQUN6QyxjQUFjLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLO1lBQ3pDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLO1lBQ25ELFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUs7WUFDakMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUs7WUFDN0MsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSztZQUMzQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSztZQUU3QyxlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLO1lBRTNDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUs7WUFDN0IsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUs7WUFDN0MsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSztZQUNuQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLO1lBQ2pDLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUs7WUFDbkMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSztZQUM3QixlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLO1lBQzNDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLO1lBQy9DLG9CQUFvQixFQUFFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLO1lBQ3JELFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUs7WUFDckMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUs7WUFDbkQscUJBQXFCLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUs7WUFDdkQsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSztZQUN2QyxlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLO1lBQzNDLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUs7WUFDckMsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSztZQUMzQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLO1lBQ25DLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUs7WUFDdkMsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSztZQUN2QyxZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLO1lBQ3JDLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUs7WUFDdkMsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEtBQUs7WUFDckQsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUs7WUFDL0MsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUs7WUFDN0MsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSztZQUNuQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSztZQUM3QywyQkFBMkIsRUFBRSxJQUFJLENBQUMsMkJBQTJCLENBQUMsS0FBSztZQUNuRSxpQkFBaUIsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSztZQUMvQyxjQUFjLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLO1lBQ3pDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUs7WUFDakMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSztZQUMzQixlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLO1lBQzNDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLO1lBQy9DLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUs7WUFDbkMsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSztZQUMzQyxhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLO1lBQ3ZDLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUs7WUFDM0MsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUs7WUFDbkQsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSztZQUMzQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLO1lBQy9CLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUs7WUFDckMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSztZQUNqQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSztZQUMvQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSztZQUNqRCxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSztZQUM3QyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSztZQUM3QyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSztZQUMvQyxlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLO1lBQzNDLDRCQUE0QixFQUFFLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxLQUFLO1lBQ3JFLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUs7WUFDbkMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSztZQUMvQixnQkFBZ0IsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSztZQUM3QyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSztZQUMvQyxlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLO1lBQzNDLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUs7WUFDdkMsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSztZQUNuQyxhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLO1lBQ3ZDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUs7WUFDakMsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSztZQUNuQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSztZQUNqRCxpQkFBaUIsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSztZQUMvQyxhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLO1lBQ3ZDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLO1lBQ3JELHdCQUF3QixFQUFFLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxLQUFLO1lBQzdELGdCQUFnQixFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLO1lBQzdDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLO1lBQzdDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUs7WUFDakMsMkJBQTJCLEVBQUUsSUFBSSxDQUFDLDJCQUEyQixDQUFDLEtBQUs7WUFDbkUsNEJBQTRCLEVBQUUsSUFBSSxDQUFDLDRCQUE0QixDQUFDLEtBQUs7WUFDckUsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEtBQUs7WUFDckQsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEtBQUs7WUFDckQsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSztZQUNuQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSztZQUM3QyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSztZQUMvQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLO1lBQ3JDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLO1lBQzdDLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUs7WUFDM0MsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSztZQUNqQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSztZQUNqRCxjQUFjLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLO1lBQ3pDLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUs7WUFDdkMsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSztZQUNyQyxlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLO1lBQzNDLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUs7WUFDM0MsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUs7WUFDbkQsY0FBYyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSztZQUN6QyxlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLO1lBQzNDLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUs7WUFDM0MsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUs7WUFDbkQsY0FBYyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSztZQUN6QyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLO1lBQ2pDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUs7WUFDakMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSztZQUM3QixjQUFjLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLO1lBQ3pDLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUs7WUFDdkMsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSztZQUNyQyxjQUFjLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLO1lBQ3pDLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUs7WUFDdkMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSztZQUMzQixVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLO1lBQ2pDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUs7WUFDN0IsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSztZQUM3QixXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLO1lBQ25DLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUs7WUFDbkMsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSztZQUNuQyxjQUFjLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLO1lBQ3pDLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUs7WUFDckMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSztZQUMzQixhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLO1lBQ3ZDLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUs7WUFDM0MsY0FBYyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSztZQUN6QyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSztZQUNqRCxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLO1lBQ2pDLHFCQUFxQixFQUFFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLO1lBQ3ZELG1CQUFtQixFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLO1lBQ25ELFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUs7WUFDL0Isc0JBQXNCLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEtBQUs7WUFDekQsY0FBYyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSztZQUN6QyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSztZQUM3QyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSztZQUM3QyxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLO1lBQ25DLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUs7WUFDbkMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUs7WUFDbkQsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUs7WUFFakQsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUs7WUFFN0MsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSztZQUM3QixrQkFBa0IsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSztZQUNqRCxvQkFBb0IsRUFBRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSztZQUNyRCxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLO1lBQ3pCLG9CQUFvQixFQUFFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLO1lBRXJELGlCQUFpQjtZQUNqQixZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLO1lBQ3JDLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUs7WUFDckMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUs7WUFDakQsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSztZQUVuQyxtQkFBbUI7WUFDbkIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSztZQUM3QixnQkFBZ0IsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSztZQUM3QyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSztZQUNyRCxzQkFBc0IsRUFBRSxJQUFJLENBQUMsc0JBQXNCLENBQUMsS0FBSztZQUV6RCxlQUFlO1lBQ2YsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUs7WUFDL0MsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSztZQUMzQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSztZQUNqRCx1QkFBdUIsRUFBRSxJQUFJLENBQUMsdUJBQXVCLENBQUMsS0FBSztZQUUzRCxXQUFXO1lBQ1gsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSztZQUN2QyxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLO1lBQ25DLGNBQWMsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUs7WUFDekMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUs7WUFFbkQsa0NBQWtDO1lBQ2xDLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUs7WUFFckMsU0FBUztZQUNULFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUs7WUFDckMsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSztZQUNyQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLO1lBQy9CLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUs7WUFFdkMsaUJBQWlCO1lBQ2pCLG9CQUFvQixFQUFFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLO1lBQ3JELGtCQUFrQixFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLO1lBRWpELGNBQWM7WUFDZCxrQkFBa0IsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSztZQUNqRCx1QkFBdUIsRUFBRSxJQUFJLENBQUMsdUJBQXVCLENBQUMsS0FBSztZQUMzRCxzQkFBc0IsRUFBRSxJQUFJLENBQUMsc0JBQXNCLENBQUMsS0FBSztZQUN6RCxzQkFBc0IsRUFBRSxJQUFJLENBQUMsc0JBQXNCLENBQUMsS0FBSztZQUN6RCxxQkFBcUIsRUFBRSxJQUFJLENBQUMscUJBQXFCLENBQUMsS0FBSztZQUN2RCxvQkFBb0IsRUFBRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSztZQUNyRCwyQkFBMkIsRUFBRSxJQUFJLENBQUMsMkJBQTJCLENBQUMsS0FBSztZQUNuRSw2QkFBNkIsRUFBRSxJQUFJLENBQUMsNkJBQTZCLENBQUMsS0FBSztZQUV2RSxlQUFlO1lBQ2YsMEJBQTBCLEVBQUUsSUFBSSxDQUFDLDBCQUEwQixDQUFDLEtBQUs7WUFDakUsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEtBQUs7WUFDekQseUJBQXlCLEVBQUUsSUFBSSxDQUFDLHlCQUF5QixDQUFDLEtBQUs7WUFDL0QseUJBQXlCLEVBQUUsSUFBSSxDQUFDLHlCQUF5QixDQUFDLEtBQUs7WUFDL0QscUJBQXFCLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUs7WUFFdkQsb0JBQW9CO1lBQ3BCLHFCQUFxQixFQUFFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLO1lBQ3ZELHFCQUFxQixFQUFFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLO1lBQ3ZELHFCQUFxQixFQUFFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLO1lBQ3ZELGtCQUFrQixFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLO1lBQ2pELHVCQUF1QixFQUFFLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxLQUFLO1lBQzNELG9CQUFvQixFQUFFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLO1lBQ3JELGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUs7WUFDM0MsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUs7WUFDN0MsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUs7WUFDbkQsMkJBQTJCLEVBQUUsSUFBSSxDQUFDLDJCQUEyQixDQUFDLEtBQUs7WUFDbkUsd0JBQXdCLEVBQUUsSUFBSSxDQUFDLHdCQUF3QixDQUFDLEtBQUs7WUFDN0QsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUs7WUFDL0Msd0JBQXdCLEVBQUUsSUFBSSxDQUFDLHdCQUF3QixDQUFDLEtBQUs7WUFDN0Qsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEtBQUs7WUFDekQseUJBQXlCLEVBQUUsSUFBSSxDQUFDLHlCQUF5QixDQUFDLEtBQUs7WUFDL0QsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSztZQUMzQyxlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLO1lBQzNDLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUs7WUFDbkMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUs7WUFDL0MscUJBQXFCLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUs7WUFDdkQsY0FBYyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSztZQUN6QyxjQUFjLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLO1lBRXpDLGVBQWU7WUFDZixjQUFjLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLO1lBQ3pDLGNBQWMsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUs7WUFDekMsY0FBYyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSztZQUV6QyxjQUFjO1lBQ2QsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUs7WUFDbkQsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUs7WUFFakQsYUFBYTtZQUNiLGdCQUFnQixFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLO1lBQzdDLHFCQUFxQixFQUFFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLO1lBQ3ZELHFCQUFxQixFQUFFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLO1lBQ3ZELHNCQUFzQixFQUFFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLO1lBQ3pELGlCQUFpQixFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLO1lBQy9DLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUs7WUFDdkMsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSztZQUN6QixXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLO1lBQ25DLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUs7WUFDbkMsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSztZQUN2QyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSztZQUNqRCxtQkFBbUIsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSztZQUVuRCxRQUFRO1lBQ1IsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSztZQUN2QixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLO1lBQ3JCLGtCQUFrQixFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLO1lBRWpELGFBQWE7WUFDYixXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLO1lBQ25DLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUs7WUFDdkMsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSztZQUNyQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSztZQUNqRCxpQkFBaUIsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSztZQUMvQyxlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLO1lBQzNDLGNBQWMsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUs7WUFDekMsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEtBQUs7WUFDckQsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSztZQUN2QyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLO1lBQ2pDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLO1lBQ2pELGlCQUFpQixFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLO1lBQy9DLHdCQUF3QixFQUFFLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxLQUFLO1lBQzdELG1CQUFtQixFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLO1lBRW5ELGlCQUFpQjtZQUNqQixhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLO1lBQ3ZDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLO1lBQzdDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLO1lBQzdDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLO1lBQ25ELGlCQUFpQixFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLO1lBQy9DLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUs7WUFDbkMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUs7WUFDN0MsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSztZQUMzQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLO1lBQ2pDLDJCQUEyQixFQUFFLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxLQUFLO1lBRW5FLGFBQWE7WUFDYixlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLO1lBQzNDLHNCQUFzQixFQUFFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLO1lBQ3pELGtCQUFrQixFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLO1lBQ2pELGlCQUFpQixFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLO1lBQy9DLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUs7WUFDM0MsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSztZQUMzQyx3QkFBd0IsRUFBRSxJQUFJLENBQUMsd0JBQXdCLENBQUMsS0FBSztZQUM3RCxpQ0FBaUMsRUFBRSxJQUFJLENBQUMsaUNBQWlDLENBQUMsS0FBSztZQUMvRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLO1lBQ3pCLGtCQUFrQixFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLO1lBQ2pELFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUs7WUFDL0IsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSztZQUMvQixZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLO1lBQ3JDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLO1lBRTdDLGNBQWM7WUFDZCxpQkFBaUIsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSztZQUMvQyxxQkFBcUIsRUFBRSxJQUFJLENBQUMscUJBQXFCLENBQUMsS0FBSztZQUN2RCxvQkFBb0IsRUFBRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSztZQUNyRCxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSztZQUM3Qyx5QkFBeUIsRUFBRSxJQUFJLENBQUMseUJBQXlCLENBQUMsS0FBSztZQUUvRCxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLO1lBQy9CLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUs7WUFDekIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSztZQUN6QixvQkFBb0IsRUFBRSxLQUFLO1lBQzNCLEtBQUssRUFBRSxJQUFJO1lBRVgsbUJBQW1CO1lBQ25CLGNBQWMsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDOUMsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUMxQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUN4RCxrQkFBa0IsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUN0RCxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNsRCxhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQzVDLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDMUMsMEJBQTBCLEVBQUUsSUFBSSxDQUFDLDBCQUEwQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDdEUsdUJBQXVCLEVBQUUsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDaEUsd0JBQXdCLEVBQUUsSUFBSSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDbEUsMkJBQTJCLEVBQUUsSUFBSSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDeEUsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNoRCxrQkFBa0IsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUN0RCx5QkFBeUIsRUFBRSxJQUFJLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNwRSx3QkFBd0IsRUFBRSxJQUFJLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUVsRSwwQ0FBMEM7WUFDMUMscUJBQXFCLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDNUQscUJBQXFCLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDNUQsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDcEQsdUJBQXVCLEVBQUUsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDaEUsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDeEQsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDeEQsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDcEQscUJBQXFCLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDNUQsd0JBQXdCLEVBQUUsSUFBSSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDbEUsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUMxQyx1QkFBdUIsRUFBRSxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNoRSxzQkFBc0IsRUFBRSxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUM5RCwwQkFBMEIsRUFBRSxJQUFJLENBQUMsMEJBQTBCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUN0RSxhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQzVDLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDaEQsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUM1QyxhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQzVDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ3RELGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFFNUMsOENBQThDO1lBQzlDLCtCQUErQixFQUFFLElBQUksQ0FBQywrQkFBK0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ2hGLCtCQUErQixFQUFFLElBQUksQ0FBQywrQkFBK0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ2hGLDJCQUEyQixFQUFFLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ3hFLCtCQUErQixFQUFFLElBQUksQ0FBQywrQkFBK0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ2hGLHlDQUF5QyxFQUN2QyxJQUFJLENBQUMseUNBQXlDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUMzRCwrQkFBK0IsRUFBRSxJQUFJLENBQUMsK0JBQStCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNoRiwrQkFBK0IsRUFBRSxJQUFJLENBQUMsK0JBQStCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNoRiwyQkFBMkIsRUFBRSxJQUFJLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUN4RSwrQkFBK0IsRUFBRSxJQUFJLENBQUMsK0JBQStCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNoRix5Q0FBeUMsRUFDdkMsSUFBSSxDQUFDLHlDQUF5QyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDM0QscUNBQXFDLEVBQUUsSUFBSSxDQUFDLHFDQUFxQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDNUYsdUNBQXVDLEVBQ3JDLElBQUksQ0FBQyx1Q0FBdUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ3pELDZDQUE2QyxFQUMzQyxJQUFJLENBQUMsNkNBQTZDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUMvRCwrQ0FBK0MsRUFDN0MsSUFBSSxDQUFDLCtDQUErQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDakUsbUNBQW1DLEVBQUUsSUFBSSxDQUFDLG1DQUFtQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDeEYseUNBQXlDLEVBQ3ZDLElBQUksQ0FBQyx5Q0FBeUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQzNELGtDQUFrQyxFQUFFLElBQUksQ0FBQyxrQ0FBa0MsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBRXRGLHlCQUF5QixFQUFFLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ3BFLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDaEQsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDcEQsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNoRCx5QkFBeUIsRUFBRSxJQUFJLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNwRSxxQkFBcUIsRUFBRSxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUM1RCx1QkFBdUIsRUFBRSxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNoRSxvQkFBb0IsRUFBRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUMxRCxvQkFBb0IsRUFBRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUMxRCx5QkFBeUIsRUFBRSxJQUFJLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNwRSxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNsRCxzQkFBc0IsRUFBRSxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUM5RCxxQkFBcUIsRUFBRSxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUM1RCxzQkFBc0IsRUFBRSxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUU5RCxxQkFBcUIsRUFBRSxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUU1RCxjQUFjLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQzlDLHNCQUFzQixFQUFFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQzlELGlCQUFpQixFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ3BELGdCQUFnQixFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ2xELGlCQUFpQixFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ3BELGNBQWMsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDOUMscUJBQXFCLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDNUQsdUJBQXVCLEVBQUUsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDaEUsMEJBQTBCLEVBQUUsSUFBSSxDQUFDLDBCQUEwQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDdEUsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDdEQseUJBQXlCLEVBQUUsSUFBSSxDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDcEUsMkJBQTJCLEVBQUUsSUFBSSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDeEUsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDeEQscUJBQXFCLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDNUQsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDdEQscUJBQXFCLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDNUQsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDcEQsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDeEQsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDeEQsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDdEQsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDeEQsMEJBQTBCLEVBQUUsSUFBSSxDQUFDLDBCQUEwQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDdEUsdUJBQXVCLEVBQUUsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDaEUsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDOUQsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDcEQsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDOUQsaUNBQWlDLEVBQUUsSUFBSSxDQUFDLGlDQUFpQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDcEYsdUJBQXVCLEVBQUUsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDaEUsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDMUQsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDbEQsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUM1QyxxQkFBcUIsRUFBRSxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUM1RCx1QkFBdUIsRUFBRSxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNoRSxpQkFBaUIsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNwRCxxQkFBcUIsRUFBRSxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUM1RCxtQkFBbUIsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUN4RCxxQkFBcUIsRUFBRSxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUM1RCx5QkFBeUIsRUFBRSxJQUFJLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNwRSxxQkFBcUIsRUFBRSxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUM1RCxlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ2hELGtCQUFrQixFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ3RELGdCQUFnQixFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ2xELHVCQUF1QixFQUFFLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ2hFLHdCQUF3QixFQUFFLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ2xFLHNCQUFzQixFQUFFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQzlELHNCQUFzQixFQUFFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQzlELHVCQUF1QixFQUFFLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ2hFLHFCQUFxQixFQUFFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQzVELGlCQUFpQixFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ3BELGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDaEQsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDOUQsdUJBQXVCLEVBQUUsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDaEUscUJBQXFCLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDNUQsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDeEQsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDcEQsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDeEQsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDbEQsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDcEQsd0JBQXdCLEVBQUUsSUFBSSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDbEUsdUJBQXVCLEVBQUUsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDaEUsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDeEQsMEJBQTBCLEVBQUUsSUFBSSxDQUFDLDBCQUEwQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDdEUsOEJBQThCLEVBQUUsSUFBSSxDQUFDLDhCQUE4QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDOUUsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDOUQsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDOUQsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDbEQsaUNBQWlDLEVBQUUsSUFBSSxDQUFDLGlDQUFpQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDcEYsa0NBQWtDLEVBQUUsSUFBSSxDQUFDLGtDQUFrQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDdEYsMEJBQTBCLEVBQUUsSUFBSSxDQUFDLDBCQUEwQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDdEUsMEJBQTBCLEVBQUUsSUFBSSxDQUFDLDBCQUEwQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDdEUsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDcEQsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDOUQsdUJBQXVCLEVBQUUsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDaEUsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDdEQsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDOUQscUJBQXFCLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDNUQsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDbEQsd0JBQXdCLEVBQUUsSUFBSSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDbEUsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDMUQsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDeEQsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDdEQscUJBQXFCLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDNUQsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDMUQscUJBQXFCLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDNUQscUJBQXFCLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDNUQseUJBQXlCLEVBQUUsSUFBSSxDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDcEUsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDMUQsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDbEQsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDbEQsY0FBYyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUM5QyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUMxRCxtQkFBbUIsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUN4RCxrQkFBa0IsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUN0RCxvQkFBb0IsRUFBRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUMxRCxtQkFBbUIsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUN4RCxhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQzVDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ2xELGNBQWMsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDOUMsY0FBYyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUM5QyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNwRCxpQkFBaUIsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNwRCxpQkFBaUIsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNwRCxvQkFBb0IsRUFBRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUMxRCxrQkFBa0IsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUN0RCxhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQzVDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ3hELHFCQUFxQixFQUFFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQzVELHdCQUF3QixFQUFFLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ2xFLG9CQUFvQixFQUFFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQzFELGdCQUFnQixFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ2xELDJCQUEyQixFQUFFLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ3hFLHlCQUF5QixFQUFFLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ3BFLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDaEQsNEJBQTRCLEVBQUUsSUFBSSxDQUFDLDRCQUE0QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDMUUsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDMUQsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDOUQsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDOUQsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDcEQsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDcEQseUJBQXlCLEVBQUUsSUFBSSxDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDcEUsd0JBQXdCLEVBQUUsSUFBSSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDbEUsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFFOUQsY0FBYyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUM5Qyx3QkFBd0IsRUFBRSxJQUFJLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNsRSwwQkFBMEIsRUFBRSxJQUFJLENBQUMsMEJBQTBCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUN0RSx1QkFBdUIsRUFBRSxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUVoRSxpQkFBaUI7WUFDakIsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDdEQsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDdEQsd0JBQXdCLEVBQUUsSUFBSSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDbEUsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFFcEQsbUJBQW1CO1lBQ25CLGNBQWMsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDOUMsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDOUQsMEJBQTBCLEVBQUUsSUFBSSxDQUFDLDBCQUEwQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDdEUsNEJBQTRCLEVBQUUsSUFBSSxDQUFDLDRCQUE0QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFFMUUsZUFBZTtZQUNmLHVCQUF1QixFQUFFLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ2hFLHFCQUFxQixFQUFFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQzVELHdCQUF3QixFQUFFLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBRWxFLFdBQVc7WUFDWCxtQkFBbUIsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUN4RCxpQkFBaUIsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNwRCxvQkFBb0IsRUFBRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUUxRCxrQ0FBa0M7WUFDbEMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFFdEQsY0FBYztZQUNkLHdCQUF3QixFQUFFLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ2xFLDZCQUE2QixFQUFFLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQzVFLDRCQUE0QixFQUFFLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQzFFLDRCQUE0QixFQUFFLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQzFFLDJCQUEyQixFQUFFLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ3hFLDBCQUEwQixFQUFFLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ3RFLGlDQUFpQyxFQUFFLElBQUksQ0FBQyxpQ0FBaUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ3BGLG1DQUFtQyxFQUFFLElBQUksQ0FBQyxtQ0FBbUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBRXhGLGVBQWU7WUFDZixnQ0FBZ0MsRUFBRSxJQUFJLENBQUMsZ0NBQWdDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNsRiw0QkFBNEIsRUFBRSxJQUFJLENBQUMsNEJBQTRCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUMxRSwrQkFBK0IsRUFBRSxJQUFJLENBQUMsK0JBQStCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNoRiwrQkFBK0IsRUFBRSxJQUFJLENBQUMsK0JBQStCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNoRiwyQkFBMkIsRUFBRSxJQUFJLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUV4RSxvQkFBb0I7WUFDcEIsMkJBQTJCLEVBQUUsSUFBSSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDeEUsMkJBQTJCLEVBQUUsSUFBSSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDeEUsMkJBQTJCLEVBQUUsSUFBSSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDeEUsd0JBQXdCLEVBQUUsSUFBSSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDbEUsNkJBQTZCLEVBQUUsSUFBSSxDQUFDLDZCQUE2QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDNUUsMEJBQTBCLEVBQUUsSUFBSSxDQUFDLDBCQUEwQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDdEUscUJBQXFCLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDNUQsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDOUQseUJBQXlCLEVBQUUsSUFBSSxDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDcEUsaUNBQWlDLEVBQUUsSUFBSSxDQUFDLGlDQUFpQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDcEYsOEJBQThCLEVBQUUsSUFBSSxDQUFDLDhCQUE4QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDOUUsdUJBQXVCLEVBQUUsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDaEUsOEJBQThCLEVBQUUsSUFBSSxDQUFDLDhCQUE4QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDOUUsNEJBQTRCLEVBQUUsSUFBSSxDQUFDLDRCQUE0QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDMUUsK0JBQStCLEVBQUUsSUFBSSxDQUFDLCtCQUErQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDaEYscUJBQXFCLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDNUQscUJBQXFCLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDNUQsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDcEQsdUJBQXVCLEVBQUUsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDaEUsMkJBQTJCLEVBQUUsSUFBSSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDeEUsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDMUQsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFFMUQsZUFBZTtZQUNmLG9CQUFvQixFQUFFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQzFELG9CQUFvQixFQUFFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQzFELG9CQUFvQixFQUFFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBRTFELGNBQWM7WUFDZCx5QkFBeUIsRUFBRSxJQUFJLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNwRSx3QkFBd0IsRUFBRSxJQUFJLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUVsRSxhQUFhO1lBQ2Isc0JBQXNCLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDOUQsMkJBQTJCLEVBQUUsSUFBSSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDeEUsMkJBQTJCLEVBQUUsSUFBSSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDeEUsNEJBQTRCLEVBQUUsSUFBSSxDQUFDLDRCQUE0QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDMUUsdUJBQXVCLEVBQUUsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDaEUsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDeEQsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUMxQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNwRCxpQkFBaUIsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNwRCxtQkFBbUIsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUN4RCx3QkFBd0IsRUFBRSxJQUFJLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNsRSx5QkFBeUIsRUFBRSxJQUFJLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUVwRSxRQUFRO1lBQ1IsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUN4QyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ3RDLHdCQUF3QixFQUFFLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBRWxFLGFBQWE7WUFDYixpQkFBaUIsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNwRCxtQkFBbUIsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUN4RCxrQkFBa0IsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUN0RCx3QkFBd0IsRUFBRSxJQUFJLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNsRSx1QkFBdUIsRUFBRSxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNoRSxxQkFBcUIsRUFBRSxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUM1RCxvQkFBb0IsRUFBRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUMxRCwwQkFBMEIsRUFBRSxJQUFJLENBQUMsMEJBQTBCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUN0RSxtQkFBbUIsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUN4RCxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNsRCx3QkFBd0IsRUFBRSxJQUFJLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNsRSx1QkFBdUIsRUFBRSxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNoRSw4QkFBOEIsRUFBRSxJQUFJLENBQUMsOEJBQThCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUM5RSx5QkFBeUIsRUFBRSxJQUFJLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUVwRSxpQkFBaUI7WUFDakIsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDeEQsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDOUQsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDOUQseUJBQXlCLEVBQUUsSUFBSSxDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDcEUsdUJBQXVCLEVBQUUsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDaEUsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDcEQsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDOUQscUJBQXFCLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDNUQsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDbEQsaUNBQWlDLEVBQUUsSUFBSSxDQUFDLGlDQUFpQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFFcEYsYUFBYTtZQUNiLHFCQUFxQixFQUFFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQzVELDRCQUE0QixFQUFFLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQzFFLHdCQUF3QixFQUFFLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ2xFLHVCQUF1QixFQUFFLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ2hFLHFCQUFxQixFQUFFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQzVELHFCQUFxQixFQUFFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQzVELDhCQUE4QixFQUFFLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQzlFLHVDQUF1QyxFQUNyQyxJQUFJLENBQUMsdUNBQXVDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUN6RCxZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQzFDLHdCQUF3QixFQUFFLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ2xFLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDaEQsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNoRCxrQkFBa0IsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUN0RCxzQkFBc0IsRUFBRSxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUU5RCxjQUFjO1lBQ2QsdUJBQXVCLEVBQUUsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDaEUsMkJBQTJCLEVBQUUsSUFBSSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDeEUsMEJBQTBCLEVBQUUsSUFBSSxDQUFDLDBCQUEwQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDdEUsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDOUQsK0JBQStCLEVBQUUsSUFBSSxDQUFDLCtCQUErQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFFaEYsa0JBQWtCO1lBQ2xCLGdCQUFnQixFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBRWxELFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDMUMsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUMxQyxlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBRWhELFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDcEMsbUJBQW1CLEVBQUUsR0FBRyxFQUFFO2dCQUN4QixPQUFPO29CQUNMLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRTtvQkFDdEIsR0FBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUU7aUJBQzVCLENBQUM7WUFDSixDQUFDO1NBQ0YsQ0FBQztJQUNKLENBQUM7SUFFRCxrQkFBa0IsR0FBRztRQUNuQixHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUU7UUFDdEIsR0FBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUU7S0FDNUIsQ0FBQztJQUVGLG1CQUFtQixHQUFHLEdBQUcsRUFBRTtRQUN6QixPQUFPO1lBQ0wsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3RCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFO1NBQzVCLENBQUM7SUFDSixDQUFDLENBQUM7SUFFRixpQkFBaUIsQ0FBQyxVQUFrQixFQUFFLEtBQWM7UUFDbEQsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQ3ZELElBQUksVUFBVSxLQUFLLFdBQVcsSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2dCQUN6RSxPQUFPLEVBQUUsR0FBRyxNQUFNLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDO1lBQ3RDLENBQUM7WUFDRCxJQUFJLFVBQVUsS0FBSyxhQUFhLElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7Z0JBQ3RFLE9BQU8sRUFBRSxHQUFHLE1BQU0sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUM7WUFDdEMsQ0FBQztZQUNELElBQUksVUFBVSxLQUFLLG1CQUFtQixJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUN6RSxJQUFJLE1BQU0sQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO29CQUNsQyxNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO3dCQUMxQyxRQUFRLEVBQUUsQ0FBQyxLQUFLO3FCQUNqQixDQUFDLENBQUM7b0JBQ0gsT0FBTzt3QkFDTCxHQUFHLE1BQU07d0JBQ1QsTUFBTSxFQUFFLElBQUk7d0JBQ1osc0JBQXNCLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxRQUFRLEVBQUUsZUFBZSxFQUFFO3FCQUNqRixDQUFDLENBQUMsbUNBQW1DO2dCQUN4QyxDQUFDO3FCQUFNLENBQUM7b0JBQ04sT0FBTyxFQUFFLEdBQUcsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLG1DQUFtQztnQkFDekUsQ0FBQztZQUNILENBQUM7WUFDRCxJQUFJLFVBQVUsS0FBSyxlQUFlLElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ25FLE9BQU8sRUFBRSxHQUFHLE1BQU0sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUM7WUFDdEMsQ0FBQztZQUNELElBQUksVUFBVSxLQUFLLG9CQUFvQixJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUN4RSxPQUFPLEVBQUUsR0FBRyxNQUFNLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDO1lBQ3RDLENBQUM7WUFDRCxJQUNFLFVBQVUsS0FBSyxtQkFBbUI7Z0JBQ2xDLE1BQU0sQ0FBQyxVQUFVO2dCQUNqQixNQUFNLENBQUMsVUFBVSxLQUFLLFVBQVUsRUFDaEMsQ0FBQztnQkFDRCxNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO29CQUMxQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVU7b0JBQ3JCLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtvQkFDNUIsU0FBUyxFQUFFLE9BQU87b0JBQ2xCLFNBQVMsRUFBRSxLQUFLO2lCQUNqQixDQUFDLENBQUM7Z0JBQ0gsT0FBTyxFQUFFLEdBQUcsTUFBTSxFQUFFLGVBQWUsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUUsZUFBZSxFQUFFLEVBQUUsQ0FBQztZQUM5RixDQUFDO1lBQ0QsSUFBSSxVQUFVLEtBQUssZUFBZSxJQUFJLE1BQU0sQ0FBQyxVQUFVLElBQUksTUFBTSxDQUFDLFVBQVUsS0FBSyxNQUFNLEVBQUUsQ0FBQztnQkFDeEYsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztvQkFDMUMsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNO29CQUNqQixVQUFVLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLO29CQUNuQyxTQUFTLEVBQUUsT0FBTztvQkFDbEIsU0FBUyxFQUFFLElBQUk7aUJBQ2hCLENBQUMsQ0FBQztnQkFDSCxPQUFPLEVBQUUsR0FBRyxNQUFNLEVBQUUsZUFBZSxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUUsRUFBRSxDQUFDO1lBQzNGLENBQUM7WUFFRCxPQUFPLE1BQU0sQ0FBQztRQUNoQixDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELG9CQUFvQixHQUFRO1FBQzFCLFNBQVMsRUFBRSxJQUFJLENBQUMsV0FBVztRQUMzQixRQUFRLEVBQUUsSUFBSTtLQUNmLENBQUM7SUFFRiwwQkFBMEIsR0FBRyxHQUFHLEVBQUU7UUFDaEMsTUFBTSxXQUFXLEdBQUc7WUFDbEIsU0FBUyxFQUFFLElBQUksQ0FBQyxXQUFXO1lBQzNCLFFBQVEsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDO2dCQUM1QixVQUFVLEVBQUU7b0JBQ1YsU0FBUyxFQUNQLElBQUksQ0FBQyxTQUFTO3dCQUNkLENBQUMsR0FBRyxFQUFFOzRCQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQzt3QkFDdkMsQ0FBQyxDQUFDO29CQUNKLDJCQUEyQixFQUFFLElBQUksQ0FBQywyQkFBMkI7b0JBQzdELGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWE7b0JBQy9DLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWTtvQkFDL0IsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlO29CQUNyQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsaUJBQWlCO29CQUN6QyxjQUFjLEVBQUUsSUFBSSxDQUFDLGNBQWM7b0JBQ25DLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVTtvQkFDM0IsY0FBYyxFQUFFLElBQUksQ0FBQyxjQUFjO29CQUNuQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVk7aUJBQ2hDO2dCQUNELFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVzthQUM5QixDQUFDO1NBQ0gsQ0FBQztRQUVGLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxFQUFFLEdBQUcsV0FBVyxFQUFFLENBQUM7UUFFL0MsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMzQixDQUFDLENBQUM7SUFFRixRQUFRO1FBQ04sSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDckIsSUFBSSxDQUFDLDBCQUEwQixFQUFFLENBQUM7UUFDcEMsQ0FBQztRQUVELElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQzNCLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ25CLElBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFDO1FBQ3BDLENBQUM7UUFFRCxJQUFJLENBQUMsMkJBQTJCLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ3JFLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQzdCLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLHFCQUFxQixHQUFHLGFBQWEsQ0FBQztZQUN6QyxJQUFJLENBQUMsWUFBWTtZQUNqQixJQUFJLENBQUMsYUFBYTtZQUNsQixJQUFJLENBQUMsYUFBYTtZQUNsQixJQUFJLENBQUMsYUFBYTtZQUNsQixJQUFJLENBQUMscUJBQXFCO1lBQzFCLElBQUksQ0FBQyxpQkFBaUI7WUFDdEIsSUFBSSxDQUFDLE9BQU87U0FDYixDQUFDLENBQUMsU0FBUyxDQUNWLENBQUMsQ0FDQyxZQUFZLEVBQ1osYUFBYSxFQUNiLGFBQWEsRUFDYixhQUFhLEVBQ2IscUJBQXFCLEVBQ3JCLGlCQUFpQixFQUNqQixPQUFPLEVBQ1IsRUFBRSxFQUFFO1lBQ0gsSUFDRSxZQUFZO2dCQUNaLGFBQWE7Z0JBQ2IsYUFBYTtnQkFDYixhQUFhO2dCQUNiLHFCQUFxQjtnQkFDckIsaUJBQWlCO2dCQUNqQixPQUFPLEVBQ1AsQ0FBQztnQkFDRCxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztZQUM3QixDQUFDO1FBQ0gsQ0FBQyxDQUNGLENBQUM7UUFFRixJQUFJLENBQUMsdUJBQXVCLEdBQUcsYUFBYSxDQUFDO1lBQzNDLElBQUksQ0FBQyxNQUFNO1lBQ1gsSUFBSSxDQUFDLGNBQWM7WUFDbkIsSUFBSSxDQUFDLG9CQUFvQjtTQUMxQixDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsY0FBYyxDQUFDLEVBQUUsRUFBRTtZQUN4QyxJQUFJLENBQUMsaUJBQWlCLEdBQUc7Z0JBQ3ZCLFNBQVMsRUFBRSxXQUFXO2dCQUN0QixNQUFNLEVBQUU7b0JBQ04sV0FBVyxFQUFFLGNBQWMsQ0FBQyxTQUFTO29CQUNyQyxZQUFZLEVBQUUsY0FBYyxDQUFDLFVBQVU7b0JBQ3ZDLFVBQVUsRUFBRSxJQUFJLENBQUMsa0JBQWtCO29CQUNuQyxVQUFVLEVBQUUsTUFBTTtpQkFDbkI7YUFDRixDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUNsRSxJQUFJLFNBQVMsRUFBRSxDQUFDO2dCQUNkLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUN6QixDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUM1RCxJQUFJLE9BQU8sRUFBRSxDQUFDO2dCQUNaLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1lBQ2pDLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxrQkFBa0IsR0FBRyxhQUFhLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUN6RixDQUFDLENBQUMsTUFBTSxFQUFFLG9CQUFvQixDQUFDLEVBQUUsRUFBRTtZQUNqQyxJQUFJLE1BQU0sSUFBSSxvQkFBb0IsRUFBRSxDQUFDO2dCQUNuQyxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztZQUNqQyxDQUFDO1FBQ0gsQ0FBQyxDQUNGLENBQUM7UUFFRiw2RUFBNkU7UUFDN0UsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FDM0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNqQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzdDLENBQUMsQ0FBQyxDQUNILENBQUM7UUFFRixJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUMzQixJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ25DLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDL0MsQ0FBQyxDQUFDLENBQ0gsQ0FBQztRQUVGLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQzNCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUN6QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsbUJBQW1CLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDckQsQ0FBQyxDQUFDLENBQ0gsQ0FBQztRQUVGLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQzNCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUN6QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsbUJBQW1CLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDckQsQ0FBQyxDQUFDLENBQ0gsQ0FBQztRQUVGLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQzNCLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUMvQixJQUFJLENBQUMsaUJBQWlCLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2hELENBQUMsQ0FBQyxDQUNILENBQUM7UUFFRixJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUMzQixJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDM0MsSUFBSSxDQUFDLDRCQUE0QixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNDLENBQUMsQ0FBQyxDQUNILENBQUM7UUFFRixJQUFJLENBQUMsa0JBQWtCLEdBQUc7WUFDeEIsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3RCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFO1NBQzVCLENBQUM7SUFDSixDQUFDO0lBRUQsV0FBVztRQUNULE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3hELE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDbkUsSUFBSSxJQUFJLENBQUMsMkJBQTJCLEVBQUUsQ0FBQztZQUNyQyxJQUFJLENBQUMsMkJBQTJCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDakQsQ0FBQztRQUNELElBQUksSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7WUFDL0IsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzNDLENBQUM7UUFDRCxJQUFJLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1lBQzdCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN6QyxDQUFDO1FBQ0QsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztZQUM1QixJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDeEMsQ0FBQztRQUNELElBQUksSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7WUFDakMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzdDLENBQUM7UUFDRCxJQUFJLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1lBQy9CLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMzQyxDQUFDO0lBQ0gsQ0FBQztJQUVELG1CQUFtQixHQUFHLEtBQUssSUFBSSxFQUFFO1FBQy9CLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDbEQsSUFBSSxDQUFDLG9CQUFvQixDQUFDLG9CQUFvQixDQUFDO2dCQUM3QyxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLO2dCQUMxQixVQUFVLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxFQUFFO2FBQ3BFLENBQUMsQ0FBQztRQUNMLENBQUM7YUFBTSxDQUFDO1lBQ04sSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQzVCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxvQkFBb0IsQ0FBQztvQkFDN0MsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSztvQkFDMUIsVUFBVSxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsRUFBRTtpQkFDcEUsQ0FBQyxDQUFDO1lBQ0wsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDLENBQUM7SUFFRixLQUFLLENBQUMsMEJBQTBCO1FBQzlCLElBQUksQ0FBQyxrQkFBa0IsR0FBRztZQUN4QixHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDdEIsR0FBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUU7U0FDNUIsQ0FBQztRQUNGLE1BQU0sT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzRixJQUFJLE9BQU8sRUFBRSxDQUFDO1lBQ1osSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3QixDQUFDO0lBQ0gsQ0FBQztJQUVELEtBQUssQ0FBQyxlQUFlO1FBQ25CLElBQUksQ0FBQyxxQkFBcUIsQ0FBQztZQUN6QixFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7U0FDMUUsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUUzRSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7WUFFekIsSUFBSSxDQUFDO2dCQUNILElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUM1QixNQUFNLElBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFDO29CQUN4QyxJQUFJLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3pDLENBQUM7cUJBQU0sQ0FBQztvQkFDTixJQUFJLENBQUMsMkJBQTJCLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzFDLENBQUM7WUFDSCxDQUFDO1lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztnQkFDZixPQUFPLENBQUMsR0FBRyxDQUFDLG1DQUFtQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzFELENBQUM7WUFFRCxJQUFJLENBQUMseUJBQXlCLENBQUMseUJBQXlCLENBQUM7Z0JBQ3ZELFNBQVMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSTtnQkFDNUIsVUFBVSxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsRUFBRTthQUNwRSxDQUFDLENBQUM7UUFFTCxDQUFDO0lBQ0gsQ0FBQztJQUlELEtBQUssQ0FBQyxZQUFZO1FBQ2hCLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQztRQUVqQixJQUNFLE1BQU0sQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLFVBQVU7WUFDdEMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssSUFBSSxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLElBQUksWUFBWSxDQUFDLEVBQzNFLENBQUM7WUFDRCxNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDO1lBQ3pDLFFBQVEsR0FBRyxNQUFNLENBQUMsQ0FBQyxFQUFFLEdBQUcsYUFBYSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkQsSUFBSSxRQUFRLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDekMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzdDLENBQUM7UUFDSCxDQUFDO2FBQU0sQ0FBQztZQUNOLDJFQUEyRTtZQUMzRSxNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDO1lBQ3pDLFFBQVEsR0FBRyxNQUFNLENBQUMsQ0FBQyxFQUFFLEdBQUcsYUFBYSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkQsUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM1QixJQUFJLFFBQVEsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUN6QyxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDN0MsQ0FBQztRQUNILENBQUM7UUFFRCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQUM7WUFDOUMsc0JBQXNCLEVBQUUsQ0FBQztZQUN6Qix1QkFBdUIsRUFBRSxDQUFDO1lBQzFCLFFBQVEsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUs7WUFDcEMsT0FBTyxFQUFFLElBQUk7WUFDYixlQUFlLEVBQ2IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLElBQUksU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxJQUFJLFlBQVk7Z0JBQ3ZFLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUTtnQkFDZCxDQUFDLENBQUMsQ0FBQztTQUNSLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUV0QyxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUM1QyxJQUFJLFdBQVcsSUFBSSxVQUFVLEVBQUUsQ0FBQztZQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDN0IsSUFBSSxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBQ3ZELElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDMUMsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO1FBRUQsNkJBQTZCO1FBQzdCLE1BQU0sSUFBSSxDQUFDLG9CQUFvQixDQUFDLG9CQUFvQixDQUFDO1lBQ25ELElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUs7WUFDMUIsVUFBVSxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsRUFBRTtTQUNwRSxDQUFDLENBQUM7UUFDSCw2QkFBNkI7UUFDN0IsTUFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FBQztZQUN6QyxPQUFPLEVBQUUsSUFBSTtZQUNiLFVBQVUsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFLEVBQUU7U0FDcEUsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxlQUFnQztRQUN6RCxLQUFLLE1BQU0sTUFBTSxJQUFJLGVBQWUsRUFBRSxDQUFDO1lBQ3JDLElBQUksQ0FBQztnQkFDSCxNQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNsQyxNQUFNLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNoQyxDQUFDO1lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztnQkFDZixPQUFPLENBQUMsR0FBRyxDQUFDLHVDQUF1QyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDdEYsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0lBRUQsS0FBSyxDQUFDLGFBQWE7UUFDakIsbUZBQW1GO1FBRW5GLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsZ0NBQWdDLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLDJCQUEyQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsMEJBQTBCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLDRCQUE0QixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxtQ0FBbUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsaUNBQWlDLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsK0JBQStCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUMsTUFBTSxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1RCxNQUFNLElBQUksQ0FBQywyQkFBMkIsRUFBRSxDQUFDO1FBQ3pDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLDJCQUEyQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFcEMsSUFBSSxDQUFDLHVDQUF1QyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLDZCQUE2QixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsaUNBQWlDLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLDhCQUE4QixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsK0JBQStCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFNUMsTUFBTSxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzVCLDRCQUE0QjtRQUM1QixNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCx1QkFBdUIsR0FBRyxDQUFDLEVBQ3pCLHNCQUFzQixHQUFHLENBQUMsRUFDMUIsdUJBQXVCLEdBQUcsQ0FBQyxFQUMzQixRQUFRLEVBQ1IsT0FBTyxHQUFHLElBQUksRUFDZCxlQUFlLEdBT2hCLEVBQWtCLEVBQUU7UUFDbkIsTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLFVBQVUsR0FBRyxzQkFBc0IsQ0FBQztRQUMvRCxNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsV0FBVyxHQUFHLHVCQUF1QixHQUFHLGVBQWUsQ0FBQztRQUNwRixJQUFJLFlBQVksR0FBRyxXQUFXLElBQUksR0FBRyxDQUFDO1FBRXRDLElBQUksQ0FBQyxZQUFZLElBQUksV0FBVyxHQUFHLEdBQUcsR0FBRyxZQUFZLEVBQUUsQ0FBQztZQUN0RCxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLENBQUM7UUFFRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFdEMsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDO1lBQzFDLFdBQVc7WUFDWCxZQUFZO1lBQ1osWUFBWTtZQUNaLFFBQVE7WUFDUixPQUFPO1NBQ1IsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxVQUFVLENBQUM7SUFDcEIsQ0FBQyxDQUFDO0lBRUYsbUJBQW1CLENBQUMsRUFDbEIsV0FBVyxFQUNYLFlBQVksRUFDWixZQUFZLEVBQ1osUUFBUSxFQUNSLE9BQU8sR0FPUjtRQUNDLElBQUksT0FBTyxFQUFFLENBQUM7WUFDWixPQUFPLFlBQVk7Z0JBQ2pCLENBQUMsQ0FBQztvQkFDRSxVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUM7b0JBQ3BDLFdBQVcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQztvQkFDckMsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLEdBQUcsV0FBVyxDQUFDO29CQUNyRCxVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLFdBQVcsQ0FBQztpQkFDL0Q7Z0JBQ0gsQ0FBQyxDQUFDO29CQUNFLFVBQVUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxHQUFHLFlBQVksQ0FBQztvQkFDdkQsV0FBVyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxZQUFZLENBQUM7b0JBQ2hFLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQztvQkFDbEMsVUFBVSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDO2lCQUNwQyxDQUFDO1FBQ1IsQ0FBQzthQUFNLENBQUM7WUFDTixPQUFPO2dCQUNMLFVBQVUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQztnQkFDcEMsV0FBVyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDO2dCQUNyQyxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUM7Z0JBQ2xDLFVBQVUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQzthQUNwQyxDQUFDO1FBQ0osQ0FBQztJQUNILENBQUM7SUFFRCx1QkFBdUI7UUFDckIsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2hFLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzdFLENBQUM7SUFFRCxtQkFBbUI7UUFDakIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxXQUFXLEdBQUcsTUFBTSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQztJQUVoRixLQUFLLENBQUMsUUFBUSxDQUFDLElBT2Q7UUFDQyxNQUFNLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxXQUFXLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFFckUsSUFBSSxDQUFDO1lBQ0gsTUFBTSxRQUFRLEdBQTRCLE1BQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUM7Z0JBQ2pGLE1BQU07Z0JBQ04sUUFBUTtnQkFDUixPQUFPO2dCQUNQLE1BQU07Z0JBQ04sR0FBRztnQkFDSCxXQUFXO2FBQ1osQ0FBQyxDQUFDO1lBRUgsT0FBTyxRQUFRLENBQUM7UUFDbEIsQ0FBQztRQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7WUFDZixPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzFDLE1BQU0sSUFBSSxLQUFLLENBQUMsc0VBQXNFLENBQUMsQ0FBQztRQUMxRixDQUFDO0lBQ0gsQ0FBQztJQUVELEtBQUssQ0FBQyxTQUFTLENBQUMsRUFDZCxNQUFNLEVBQ04sUUFBUSxFQUNSLE9BQU8sRUFDUCxNQUFNLEVBQ04sR0FBRyxFQUNILFdBQVcsR0FRWjtRQUNDLE1BQU0sSUFBSSxHQUE0QixNQUFNLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDeEQsTUFBTSxFQUFFLE1BQU07WUFDZCxRQUFRLEVBQUUsUUFBUTtZQUNsQixPQUFPLEVBQUUsT0FBTztZQUNoQixNQUFNLEVBQUUsTUFBTTtZQUNkLEdBQUcsRUFBRSxHQUFHO1lBQ1IsV0FBVyxFQUFFLFdBQVc7U0FDekIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRXpCLElBQUksQ0FBQztnQkFDSCxJQUFJLENBQUMsMEJBQTBCLENBQUMsMEJBQTBCLENBQUM7b0JBQ3pELFVBQVUsRUFBRTt3QkFDVixHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUU7d0JBQ3RCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFO3dCQUMzQixJQUFJLEVBQUUsSUFBSTtxQkFDWDtpQkFDRixDQUFDLENBQUM7Z0JBRUgsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzFCLENBQUM7cUJBQU0sQ0FBQztvQkFDTixJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUMxQixDQUFDO2dCQUVELElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO29CQUNwQixJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUM1QyxDQUFDO2dCQUVELElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO29CQUN6QixNQUFNLE9BQU8sR0FBRyxNQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxrQkFBa0IsQ0FBQzt3QkFDL0QsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlO3FCQUN0QyxDQUFDLENBQUM7b0JBRUgsSUFBSSxPQUFPLEVBQUUsQ0FBQzt3QkFDWixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDNUIsQ0FBQztnQkFDSCxDQUFDO1lBQ0gsQ0FBQztZQUFDLE1BQU0sQ0FBQztnQkFDUCxrQkFBa0I7WUFDcEIsQ0FBQztRQUNILENBQUM7YUFBTSxDQUFDO1lBQ04sSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUM7Z0JBQ0gsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQztvQkFDbkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7Z0JBQzVFLENBQUM7WUFDSCxDQUFDO1lBQUMsTUFBTSxDQUFDO2dCQUNQLGtCQUFrQjtZQUNwQixDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7SUFFRCwwQkFBMEIsR0FBRyxDQUFDLEtBQWEsRUFBUSxFQUFFO1FBQ25ELElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDOUIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FDNUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FDN0MsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQzdELENBQ0YsQ0FBQztZQUNGLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN4RSxDQUFDO2FBQU0sQ0FBQztZQUNOLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN4RCxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hFLENBQUM7SUFDSCxDQUFDLENBQUM7SUFFRiwyQkFBMkIsR0FBRyxLQUFLLElBQUksRUFBRTtRQUN2QyxNQUFNLGFBQWEsR0FBRyxrQkFBNEMsQ0FBQztRQUNuRSxNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUV4QyxDQUFDO1FBRUYsS0FBSyxNQUFNLEdBQUcsSUFBSSxhQUFhLEVBQUUsQ0FBQztZQUNoQyxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQztnQkFDN0QsTUFBTSxrQkFBa0IsR0FBRyxTQUFTLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO2dCQUNqRixNQUFNLGNBQWMsR0FBRyxlQUFlLENBQUMsa0JBQWtCLENBQUMsQ0FBQztnQkFFM0QsSUFBSSxPQUFPLGNBQWMsS0FBSyxVQUFVLEVBQUUsQ0FBQztvQkFDekMsSUFBSSxDQUFDO3dCQUNILGNBQWMsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDckMsQ0FBQztvQkFBQyxNQUFNLENBQUM7d0JBQ1Asa0JBQWtCO29CQUNwQixDQUFDO2dCQUNILENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUMsQ0FBQztJQUVGLGFBQWEsR0FBRyxhQUFhLENBQUM7SUFDOUIsWUFBWSxHQUFHLFlBQVksQ0FBQztJQUM1QixhQUFhLEdBQUcsYUFBYSxDQUFDO0lBQzlCLFlBQVksR0FBRyxZQUFZLENBQUM7SUFDNUIsV0FBVyxHQUFHLFdBQVcsQ0FBQztJQUMxQixLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ2QsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUNsQixPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQ2xCLFVBQVUsR0FBRyxVQUFVLENBQUM7SUFDeEIsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUNsQixTQUFTLEdBQUcsU0FBUyxDQUFDO0lBQ3RCLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDaEIsYUFBYSxHQUFHLGFBQWEsQ0FBQztJQUM5QixtQkFBbUIsR0FBRyxtQkFBbUIsQ0FBQztJQUMxQyxZQUFZLEdBQUcsWUFBWSxDQUFDO0lBQzVCLGlCQUFpQixHQUFHLGlCQUFpQixDQUFDO0lBQ3RDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDbEIsWUFBWSxHQUFHLFlBQVksQ0FBQztJQUM1QixPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQ2xCLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDaEIsVUFBVSxHQUFHLFVBQVUsQ0FBQztJQUN4QixVQUFVLEdBQUcsVUFBVSxDQUFDO0lBRXhCLGdCQUFnQixHQUFHLEdBQUcsRUFBRTtRQUN0QixJQUFJLENBQUMsd0JBQXdCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkMsQ0FBQyxDQUFDO0lBRUYsb0JBQW9CLEdBQUcsR0FBRyxFQUFFO1FBQzFCLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzQyxDQUFDLENBQUM7SUFFRixhQUFhLEdBQUcsR0FBRyxFQUFFO1FBQ25CLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN6QyxDQUFDLENBQUM7SUFFRixvQkFBb0IsR0FBRyxHQUFHLEVBQUU7UUFDMUIsSUFBSSxDQUFDLGlDQUFpQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hELENBQUMsQ0FBQztJQUVGLHNCQUFzQixHQUFHLEdBQUcsRUFBRTtRQUM1QixJQUFJLENBQUMsbUNBQW1DLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbEQsQ0FBQyxDQUFDO0lBRUYsV0FBVyxHQUFHLEdBQUcsRUFBRTtRQUNqQixJQUFJLENBQUMsd0JBQXdCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkMsQ0FBQyxDQUFDO0lBRUYsb0JBQW9CLEdBQUcsR0FBRyxFQUFFO1FBQzFCLElBQUksQ0FBQyxpQ0FBaUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoRCxDQUFDLENBQUM7SUFFRiwwQkFBMEIsR0FBRyxHQUFHLEVBQUU7UUFDaEMsSUFBSSxDQUFDLHVDQUF1QyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3RELENBQUMsQ0FBQztJQUVGLGVBQWUsR0FBRyxHQUFHLEVBQUU7UUFDckIsSUFBSSxDQUFDLDRCQUE0QixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNDLENBQUMsQ0FBQztJQUVGLGdCQUFnQixHQUFHLEdBQUcsRUFBRTtRQUN0QixJQUFJLENBQUMsNkJBQTZCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUMsQ0FBQyxDQUFDO0lBRUYsbUJBQW1CLEdBQUcsR0FBRyxFQUFFO1FBQ3pCLElBQUksQ0FBQyxnQ0FBZ0MsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQyxDQUFDLENBQUM7SUFFRixpQkFBaUIsR0FBRyxHQUFHLEVBQUU7UUFDdkIsSUFBSSxDQUFDLDhCQUE4QixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdDLENBQUMsQ0FBQztJQUVGLGtCQUFrQixHQUFHLEdBQUcsRUFBRTtRQUN4QixJQUFJLENBQUMsK0JBQStCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUMsQ0FBQyxDQUFDO0lBRUYsa0JBQWtCLEdBQUcsR0FBRyxFQUFFO1FBQ3hCLElBQUksQ0FBQywrQkFBK0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QyxDQUFDLENBQUM7SUFFRixrQkFBa0IsR0FBRyxHQUFHLEVBQUU7UUFDeEIsSUFBSSxDQUFDLCtCQUErQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlDLENBQUMsQ0FBQztJQUVGLGlCQUFpQixHQUFHLEdBQUcsRUFBRTtRQUN2QixJQUFJLENBQUMsOEJBQThCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0MsQ0FBQyxDQUFDO0lBRUYsV0FBVyxHQUFHLEdBQUcsRUFBRTtRQUNqQixJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakMsQ0FBQyxDQUFDO0lBRUYsaUJBQWlCLEdBQUc7UUFDbEIsU0FBUyxFQUFFLFdBQVc7UUFDdEIsTUFBTSxFQUFFO1lBQ04sV0FBVyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLFNBQVM7WUFDaEQsWUFBWSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLFVBQVU7WUFDbEQsVUFBVSxFQUFFLElBQUksQ0FBQyxrQkFBa0I7WUFDbkMsVUFBVSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSztTQUM5QjtLQUNGLENBQUM7SUFFRixpQkFBaUIsR0FBRztRQUNsQixTQUFTLEVBQUUsaUJBQWlCO1FBQzVCLFFBQVEsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUscUJBQXFCLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUssRUFBRSxDQUFDO0tBQzNGLENBQUM7SUFFRix1QkFBdUIsR0FBRyxDQUN4Qix3QkFBZ0MsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUssRUFDeEIsRUFBRTtRQUMxQyxNQUFNLGlCQUFpQixHQUFHO1lBQ3hCLFNBQVMsRUFBRSxpQkFBaUI7WUFDNUIsUUFBUSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxxQkFBcUIsRUFBRSxxQkFBcUIsRUFBRSxDQUFDO1NBQ2hGLENBQUM7UUFFRixJQUFJLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxHQUFHLGlCQUFpQixFQUFFLENBQUM7UUFFbEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUV4QixPQUFPLGlCQUFpQixDQUFDO0lBQzNCLENBQUMsQ0FBQztJQUVGLGFBQWEsR0FBb0IsRUFBRSxDQUFDO0lBRXBDLGtCQUFrQixHQUFvQjtRQUNwQztZQUNFLElBQUksRUFBRSxJQUFJLENBQUMsWUFBWTtZQUN2QixNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUs7WUFDdEMsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUNaLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxDQUFDO2dCQUNuQyxVQUFVLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxFQUFFO2FBQ3BFLENBQUM7WUFDSixXQUFXLEVBQUUsT0FBTztZQUNwQixhQUFhLEVBQUUsT0FBTztZQUN0QixhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWE7WUFDakMsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUk7U0FDakI7UUFDRDtZQUNFLElBQUksRUFBRSxJQUFJLENBQUMsWUFBWTtZQUN2QixNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsS0FBSztZQUNuQixPQUFPLEVBQUUsR0FBRyxFQUFFLENBQ1osSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUM7Z0JBQy9CLFVBQVUsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFLEVBQUU7YUFDcEUsQ0FBQztZQUNKLFdBQVcsRUFBRSxPQUFPO1lBQ3BCLGFBQWEsRUFBRSxPQUFPO1lBQ3RCLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJO1NBQ2pCO1FBQ0Q7WUFDRSxlQUFlLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLHVCQUF1QixFQUFFO1lBQ3JELElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJO1lBQ2hCLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxLQUFLO1NBQ3BCO1FBQ0Q7WUFDRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVc7WUFDdEIsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLEtBQUs7WUFDbkIsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUM7WUFDNUMsV0FBVyxFQUFFLE9BQU87WUFDcEIsYUFBYSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQ2pFLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJO1NBQ2pCO1FBQ0Q7WUFDRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDaEIsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLEtBQUs7WUFDbkIsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUNaLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxDQUFDO2dCQUNuQyw2QkFBNkIsRUFBRSxJQUFJLENBQUMsNkJBQTZCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDNUUsdUJBQXVCLEVBQUUsSUFBSSxDQUFDLHVCQUF1QixDQUFDLEtBQUs7Z0JBQzNELFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQ3BDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLO2dCQUM3QyxlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLO2dCQUMzQyxxQkFBcUIsRUFBRSxJQUFJLENBQUMscUJBQXFCLENBQUMsS0FBSztnQkFDdkQscUJBQXFCLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUs7Z0JBQ3ZELGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQ2hELHFCQUFxQixFQUFFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUM1RCxhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLO2dCQUN2QyxZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLO2dCQUNyQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLO2FBQ3BDLENBQUM7WUFDSixXQUFXLEVBQUUsT0FBTztZQUNwQixhQUFhLEVBQUUsT0FBTztZQUN0QixJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSTtTQUNqQjtLQUNGLENBQUM7SUFFRixLQUFLLENBQUMsbUJBQW1CO1FBQ3ZCLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUMzRCxPQUFPO2dCQUNMLEdBQUcsTUFBTTtnQkFDVCxNQUFNLEVBQUUsT0FBTyxNQUFNLENBQUMsTUFBTSxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTTtnQkFDN0UsSUFBSSxFQUFFLE9BQU8sTUFBTSxDQUFDLElBQUksS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUk7Z0JBQ3JFLGVBQWUsRUFBRSxNQUFNLENBQUMsZUFBZTtvQkFDckMsQ0FBQyxDQUFDLE9BQU8sTUFBTSxDQUFDLGVBQWUsS0FBSyxVQUFVO3dCQUM1QyxDQUFDLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRTt3QkFDMUIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxlQUFlO29CQUMxQixDQUFDLENBQUMsU0FBUztnQkFDYixXQUFXLEVBQ1QsT0FBTyxNQUFNLENBQUMsYUFBYSxLQUFLLFVBQVU7b0JBQ3hDLENBQUMsQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFO29CQUN4QixDQUFDLENBQUMsTUFBTSxDQUFDLGFBQWE7Z0JBQzFCLGFBQWEsRUFDWCxPQUFPLE1BQU0sQ0FBQyxhQUFhLEtBQUssVUFBVTtvQkFDeEMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUU7b0JBQ3hCLENBQUMsQ0FBQyxNQUFNLENBQUMsYUFBYTthQUMzQixDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsR0FBRyxhQUFhLENBQUMsQ0FBQztRQUN4QyxNQUFNLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztRQUUvQixJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCx5Q0FBeUM7SUFDekMsVUFBVSxHQUFHO1FBQ1gsU0FBUyxFQUFFLFVBQVU7UUFDckIsUUFBUSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUM7WUFDNUIsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ2pCLFVBQVUsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUs7WUFDbkMsU0FBUyxFQUFFLE9BQU87WUFDbEIsU0FBUyxFQUFFLElBQUk7U0FDaEIsQ0FBQztLQUNILENBQUM7SUFFRixhQUFhLEdBQUc7UUFDZCxTQUFTLEVBQUUsYUFBYTtRQUN4QixRQUFRLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQztZQUM1QixJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVU7WUFDckIsU0FBUyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLO1lBQ3ZDLFVBQVUsRUFBRSxDQUFDO1lBQ2IsU0FBUyxFQUFFLE9BQU87U0FDbkIsQ0FBQztLQUNILENBQUM7SUFFRixnQkFBZ0IsR0FBRztRQUNqQixTQUFTLEVBQUUsZ0JBQWdCO1FBQzNCLFFBQVEsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDO1lBQzVCLE9BQU8sRUFBRSxJQUFJLENBQUMsYUFBYTtZQUMzQixVQUFVLEVBQUUsSUFBSTtZQUNoQixTQUFTLEVBQUUsWUFBWTtTQUN4QixDQUFDO0tBQ0gsQ0FBQztJQUVGLHNCQUFzQixHQUFHLENBQUMsZ0JBQWlDLElBQUksQ0FBQyxhQUFhLEVBQU8sRUFBRTtRQUNwRixNQUFNLGdCQUFnQixHQUFHO1lBQ3ZCLFNBQVMsRUFBRSxnQkFBZ0I7WUFDM0IsUUFBUSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUM7Z0JBQzVCLE9BQU8sRUFBRSxhQUFhO2dCQUN0QixVQUFVLEVBQUUsSUFBSTtnQkFDaEIsU0FBUyxFQUFFLFlBQVk7YUFDeEIsQ0FBQztTQUNILENBQUM7UUFFRixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxHQUFHLGdCQUFnQixFQUFFLENBQUM7UUFFaEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUV4QixPQUFPLGdCQUFnQixDQUFDO0lBQzFCLENBQUMsQ0FBQztJQUVGLHNCQUFzQixHQUFHO1FBQ3ZCLFNBQVMsRUFBRSxzQkFBc0I7UUFDakMsUUFBUSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUM7WUFDNUIsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVO1lBQ3JCLG1CQUFtQixFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLO1lBQ25ELFNBQVMsRUFBRSxPQUFPO1NBQ25CLENBQUM7S0FDSCxDQUFDO0lBRUYsNEJBQTRCLEdBQUcsQ0FBQyxRQUFnQixJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxFQUFPLEVBQUU7UUFDckYsTUFBTSxzQkFBc0IsR0FBRztZQUM3QixTQUFTLEVBQUUsc0JBQXNCO1lBQ2pDLFFBQVEsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDO2dCQUM1QixJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVU7Z0JBQ3JCLG1CQUFtQixFQUFFLEtBQUs7Z0JBQzFCLFNBQVMsRUFBRSxPQUFPO2FBQ25CLENBQUM7U0FDSCxDQUFDO1FBRUYsSUFBSSxDQUFDLHNCQUFzQixHQUFHLEVBQUUsR0FBRyxzQkFBc0IsRUFBRSxDQUFDO1FBRTVELElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFeEIsT0FBTyxzQkFBc0IsQ0FBQztJQUNoQyxDQUFDLENBQUM7SUFFRixzQkFBc0IsR0FBdUI7UUFDM0M7WUFDRSxJQUFJLEVBQUUsSUFBSSxDQUFDLGFBQWE7WUFDeEIsSUFBSSxFQUFFLFFBQVE7WUFDZCxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQ1gsSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlLENBQUM7Z0JBQ25DLDZCQUE2QixFQUFFLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUM1RSx1QkFBdUIsRUFBRSxJQUFJLENBQUMsdUJBQXVCLENBQUMsS0FBSztnQkFDM0QsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDcEMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUs7Z0JBQzdDLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUs7Z0JBQzNDLHFCQUFxQixFQUFFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLO2dCQUN2RCxxQkFBcUIsRUFBRSxJQUFJLENBQUMscUJBQXFCLENBQUMsS0FBSztnQkFDdkQsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDaEQscUJBQXFCLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQzVELGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUs7Z0JBQ3ZDLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUs7Z0JBQ3JDLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUs7YUFDcEMsQ0FBQztZQUNKLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksR0FBRztTQUN2RTtRQUNEO1lBQ0UsZUFBZSxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsRUFBRTtZQUNwRCxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxHQUFHO1lBQ3JFLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDO1NBQ3BEO1FBQ0Q7WUFDRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDaEIsSUFBSSxFQUFFLGdCQUFnQjtZQUN0QixNQUFNLEVBQUUsR0FBRyxFQUFFLENBQ1gsSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUM7Z0JBQ2pDLDRCQUE0QixFQUFFLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUMxRSxzQkFBc0IsRUFBRSxJQUFJLENBQUMsc0JBQXNCLENBQUMsS0FBSzthQUMxRCxDQUFDO1lBQ0osSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFJLEdBQUc7U0FDdEM7UUFDRDtZQUNFLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTztZQUNsQixJQUFJLEVBQUUsVUFBVTtZQUNoQixNQUFNLEVBQUUsR0FBRyxFQUFFLENBQ1gsSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUM7Z0JBQ2pDLDRCQUE0QixFQUFFLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUMxRSxzQkFBc0IsRUFBRSxJQUFJLENBQUMsc0JBQXNCLENBQUMsS0FBSzthQUMxRCxDQUFDO1lBQ0osSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUNULElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFJLEdBQUc7Z0JBQ3pCLENBQUMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSztvQkFDL0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLO29CQUNqQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUs7b0JBQ3ZDLENBQUMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxPQUFPLENBQUMsRUFBRSxLQUFLLENBQUM7b0JBQ2pGLEtBQUssQ0FBQztnQkFDUixLQUFLO1NBQ1I7UUFDRDtZQUNFLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTztZQUNsQixJQUFJLEVBQUUsU0FBUztZQUNmLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FDWCxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQztnQkFDL0IsMkJBQTJCLEVBQUUsSUFBSSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQ3hFLHFCQUFxQixFQUFFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLO2FBQ3hELENBQUM7WUFDSixJQUFJLEVBQUUsR0FBRyxFQUFFLENBQ1QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksR0FBRztnQkFDekIsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSztvQkFDOUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLO29CQUNqQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUs7b0JBQ3ZDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVMsQ0FBQyxFQUFFLEtBQUs7d0JBQzlFLElBQUksQ0FBQztnQkFDVCxLQUFLO1NBQ1I7UUFDRDtZQUNFLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVTtZQUNyQixJQUFJLEVBQUUsU0FBUztZQUNmLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FDWCxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQztnQkFDN0IsMEJBQTBCLEVBQUUsSUFBSSxDQUFDLDBCQUEwQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQ3RFLG9CQUFvQixFQUFFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLO2FBQ3RELENBQUM7WUFDSixJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksR0FBRztTQUN0QztRQUNEO1lBQ0UsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ2xCLElBQUksRUFBRSxXQUFXO1lBQ2pCLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FDWCxJQUFJLENBQUMsbUJBQW1CLENBQUMsbUJBQW1CLENBQUM7Z0JBQzNDLGlDQUFpQyxFQUFFLElBQUksQ0FBQyxpQ0FBaUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUNwRiwyQkFBMkIsRUFBRSxJQUFJLENBQUMsMkJBQTJCLENBQUMsS0FBSztnQkFDbkUsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSztnQkFDbkMsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSztnQkFDbkMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQ3BELGlCQUFpQixFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQ3JELENBQUM7WUFDSixJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSTtTQUNqQjtRQUNEO1lBQ0UsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTO1lBQ3BCLElBQUksRUFBRSxTQUFTO1lBQ2YsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUNYLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxxQkFBcUIsQ0FBQztnQkFDL0MsbUNBQW1DLEVBQUUsSUFBSSxDQUFDLG1DQUFtQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQ3hGLDZCQUE2QixFQUFFLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxLQUFLO2FBQ3hFLENBQUM7WUFDSixJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSTtTQUNqQjtRQUNEO1lBQ0UsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ2pCLElBQUksRUFBRSxNQUFNO1lBQ1osTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUNYLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDO2dCQUN6Qix3QkFBd0IsRUFBRSxJQUFJLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDbEUsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUs7YUFDbEQsQ0FBQztZQUNKLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJO1NBQ2pCO1FBQ0Q7WUFDRSxJQUFJLEVBQUUsSUFBSSxDQUFDLGFBQWE7WUFDeEIsSUFBSSxFQUFFLGdCQUFnQjtZQUN0QixNQUFNLEVBQUUsR0FBRyxFQUFFLENBQ1gsSUFBSSxDQUFDLG1CQUFtQixDQUFDLG1CQUFtQixDQUFDO2dCQUMzQyxpQ0FBaUMsRUFBRSxJQUFJLENBQUMsaUNBQWlDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDcEYsMkJBQTJCLEVBQUUsSUFBSSxDQUFDLDJCQUEyQixDQUFDLEtBQUs7YUFDcEUsQ0FBQztZQUNKLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxHQUFHO1NBQ3RDO1FBQ0Q7WUFDRSxJQUFJLEVBQUUsSUFBSSxDQUFDLG1CQUFtQjtZQUM5QixJQUFJLEVBQUUsWUFBWTtZQUNsQixNQUFNLEVBQUUsR0FBRyxFQUFFLENBQ1gsSUFBSSxDQUFDLHlCQUF5QixDQUFDLHlCQUF5QixDQUFDO2dCQUN2RCx1Q0FBdUMsRUFDckMsSUFBSSxDQUFDLHVDQUF1QyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQ3pELGlDQUFpQyxFQUFFLElBQUksQ0FBQyxpQ0FBaUMsQ0FBQyxLQUFLO2FBQ2hGLENBQUM7WUFDSixJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksR0FBRztTQUN0QztLQUNGLENBQUM7SUFFRixpQkFBaUIsR0FBdUIsRUFBRSxDQUFDO0lBRTNDLHVCQUF1QjtRQUNyQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQ2xFLE9BQU87Z0JBQ0wsR0FBRyxNQUFNO2dCQUNULElBQUksRUFBRSxPQUFPLE1BQU0sQ0FBQyxJQUFJLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJO2dCQUNyRSxlQUFlLEVBQUUsTUFBTSxDQUFDLGVBQWU7b0JBQ3JDLENBQUMsQ0FBQyxPQUFPLE1BQU0sQ0FBQyxlQUFlLEtBQUssVUFBVTt3QkFDNUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUU7d0JBQzFCLENBQUMsQ0FBQyxNQUFNLENBQUMsZUFBZTtvQkFDMUIsQ0FBQyxDQUFDLFNBQVM7YUFDZCxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsaUJBQWlCLEdBQUc7UUFDbEIsU0FBUyxFQUFFLGlCQUFpQjtRQUM1QixRQUFRLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsQ0FBQztLQUMzRSxDQUFDO0lBRUYsY0FBYyxHQUFHO1FBQ2Y7WUFDRSxJQUFJLEVBQUUsSUFBSSxDQUFDLGlCQUFpQjtZQUM1QixhQUFhLEVBQUUsSUFBSSxDQUFDLFlBQVk7WUFDaEMsTUFBTSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSztZQUM1QixPQUFPLEVBQUUsR0FBRyxFQUFFLENBQ1osSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUM7Z0JBQ3pCLFVBQVUsRUFBRTtvQkFDVixHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUU7b0JBQ3RCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFO2lCQUM1QjthQUNGLENBQUM7WUFDSixXQUFXLEVBQUUsT0FBTztZQUNwQixhQUFhLEVBQUUsS0FBSztZQUNwQixRQUFRLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLO1lBQ25DLElBQUksRUFBRSxJQUFJO1NBQ1g7UUFDRDtZQUNFLElBQUksRUFBRSxJQUFJLENBQUMsWUFBWTtZQUN2QixhQUFhLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDM0IsTUFBTSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSztZQUM5QixPQUFPLEVBQUUsR0FBRyxFQUFFLENBQ1osSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUM7Z0JBQ3pCLFVBQVUsRUFBRTtvQkFDVixHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUU7b0JBQ3RCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFO29CQUMzQixXQUFXO29CQUNYLGdCQUFnQjtvQkFDaEIsWUFBWSxFQUFFLFlBQVk7b0JBQzFCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUs7b0JBQ3pCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUs7b0JBQ3pCLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7b0JBQ3BDLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWU7b0JBQ3JELGtCQUFrQixFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxrQkFBa0I7b0JBQzlELG1CQUFtQixFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLO29CQUNuRCx1QkFBdUIsRUFBRSxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztvQkFDaEUsb0JBQW9CLEVBQUUsS0FBSyxLQUFLLEtBQUs7aUJBQ3RDO2FBQ0YsQ0FBQztZQUNKLFdBQVcsRUFBRSxPQUFPO1lBQ3BCLGFBQWEsRUFBRSxLQUFLO1lBQ3BCLFFBQVEsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUs7WUFDbkMsSUFBSSxFQUFFLElBQUk7U0FDWDtRQUNEO1lBQ0Usb0NBQW9DO1lBQ3BDLElBQUksRUFBRSxTQUFTO1lBQ2Ysc0JBQXNCLEVBQUUsSUFBSSxDQUFDLGlCQUFpQjtZQUM5QyxNQUFNLEVBQUUsSUFBSTtZQUNaLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FDWixJQUFJLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUM7Z0JBQ3JDLFVBQVUsRUFBRTtvQkFDVixHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUU7b0JBQ3RCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFO2lCQUM1QjthQUNGLENBQUM7WUFDSixXQUFXLEVBQUUsT0FBTztZQUNwQixhQUFhLEVBQUUsS0FBSztZQUNwQixRQUFRLEVBQUUsS0FBSztZQUNmLElBQUksRUFBRSxJQUFJO1NBQ1g7UUFDRDtZQUNFLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTztZQUNsQixNQUFNLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLO1lBQ2hDLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FDWixJQUFJLENBQUMsaUJBQWlCLENBQUMsaUJBQWlCLENBQUM7Z0JBQ3ZDLCtCQUErQixFQUFFLElBQUksQ0FBQywrQkFBK0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUNoRix5QkFBeUIsRUFBRSxJQUFJLENBQUMseUJBQXlCLENBQUMsS0FBSzthQUNoRSxDQUFDO1lBQ0osV0FBVyxFQUFFLE9BQU87WUFDcEIsYUFBYSxFQUFFLEtBQUs7WUFDcEIsUUFBUSxFQUFFLEtBQUs7WUFDZixJQUFJLEVBQUUsSUFBSTtTQUNYO1FBQ0Q7WUFDRSxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDbEIsTUFBTSxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLO1lBQ3JDLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FDWixJQUFJLENBQUMsa0JBQWtCLENBQUMsa0JBQWtCLENBQUM7Z0JBQ3pDLGdDQUFnQyxFQUFFLElBQUksQ0FBQyxnQ0FBZ0MsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUNsRiwwQkFBMEIsRUFBRSxJQUFJLENBQUMsMEJBQTBCLENBQUMsS0FBSzthQUNsRSxDQUFDO1lBQ0osV0FBVyxFQUFFLE9BQU87WUFDcEIsYUFBYSxFQUFFLE9BQU87WUFDdEIsUUFBUSxFQUFFLEtBQUs7WUFDZixJQUFJLEVBQUUsSUFBSTtTQUNYO1FBQ0Q7WUFDRSxlQUFlLEVBQUUsSUFBSSxDQUFDLFVBQVU7WUFDaEMsVUFBVSxFQUFFLE1BQU07WUFDbEIsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUNaLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxDQUFDO2dCQUNuQyx3QkFBd0IsRUFBRSxJQUFJLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDbEUsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUs7YUFDbEQsQ0FBQztZQUNKLElBQUksRUFBRSxJQUFJO1NBQ1g7UUFDRDtZQUNFLGVBQWUsRUFBRSxJQUFJLENBQUMsYUFBYTtZQUNuQyxVQUFVLEVBQUUsVUFBVTtZQUN0QixPQUFPLEVBQUUsR0FBRyxFQUFFLENBQ1osSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUM7Z0JBQ2pDLDRCQUE0QixFQUFFLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUMxRSxzQkFBc0IsRUFBRSxJQUFJLENBQUMsc0JBQXNCLENBQUMsS0FBSzthQUMxRCxDQUFDO1lBQ0osSUFBSSxFQUFFLElBQUk7U0FDWDtLQUNGLENBQUM7SUFFRixLQUFLLENBQUMsY0FBYyxDQUNsQixXQUFtQixFQUNuQixNQUFjLEVBQ2QsUUFBZ0I7UUFFaEIsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUM5QyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO2dCQUM1QyxNQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDO29CQUMvQixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO29CQUNwQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLO29CQUNuQyxLQUFLLEVBQUUsSUFBSTtvQkFDWCxlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2lCQUNqRCxDQUFDLENBQUM7Z0JBQ0gsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUM5QixNQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDO3dCQUMvQixVQUFVLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxFQUFFO3FCQUNwRSxDQUFDLENBQUM7Z0JBQ0wsQ0FBQztnQkFDRCxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBQzlCLE1BQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUM7d0JBQy9CLFVBQVUsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFLEVBQUU7cUJBQ3BFLENBQUMsQ0FBQztnQkFDTCxDQUFDO2dCQUVELE1BQU0sSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQzdCLENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLEVBQUUsV0FBMkIsRUFBRSxFQUFFO2dCQUN2RSxJQUFJLFdBQVcsRUFBRSxDQUFDO29CQUNoQixNQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDO3dCQUMvQixXQUFXLEVBQUUsV0FBVzt3QkFDeEIsTUFBTSxFQUFFLEVBQUUsRUFBRSwwRUFBMEU7d0JBQ3RGLFFBQVEsRUFBRSxRQUFRO3dCQUNsQixPQUFPLEVBQUUsV0FBVyxDQUFDLE9BQU87d0JBQzVCLFNBQVMsRUFBRSxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUs7d0JBQy9FLE9BQU8sRUFBRSxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUs7d0JBQ3BFLFNBQVMsRUFBRSxXQUFXLENBQUMsc0JBQXNCOzRCQUMzQyxDQUFDLENBQUMsV0FBVyxDQUFDLHNCQUFzQjs0QkFDcEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLO3dCQUNuQyxVQUFVLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxFQUFFO3dCQUNuRSxlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLO3FCQUM1QyxDQUFDLENBQUM7Z0JBQ0wsQ0FBQztZQUNILENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLGdCQUFnQixFQUFFLEtBQUssRUFBRSxXQUErQixFQUFFLEVBQUU7Z0JBQy9FLElBQUksV0FBVyxFQUFFLENBQUM7b0JBQ2hCLE1BQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUM7d0JBQ3ZDLFdBQVcsRUFBRSxXQUFXO3dCQUN4QixNQUFNLEVBQUUsRUFBRSxFQUFFLDJFQUEyRTt3QkFDdkYsT0FBTyxFQUFFLFdBQVcsQ0FBQyxPQUFPO3dCQUM1QixRQUFRLEVBQUUsUUFBUTt3QkFDbEIsUUFBUSxFQUFFLFdBQVcsQ0FBQyxRQUFRO3dCQUM5QixPQUFPLEVBQUUsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLO3dCQUNwRSxTQUFTLEVBQUUsV0FBVyxDQUFDLHNCQUFzQjs0QkFDM0MsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxzQkFBc0I7NEJBQ3BDLENBQUMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSzt3QkFDbkMsVUFBVSxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsRUFBRTt3QkFDbkUsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSztxQkFDNUMsQ0FBQyxDQUFDO2dCQUNMLENBQUM7WUFDSCxDQUFDLENBQUMsQ0FBQztZQUVILElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFvQixFQUFFLEVBQUU7Z0JBQ3ZFLE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUM7b0JBQ2pDLElBQUk7b0JBQ0osU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztvQkFDcEMsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSztvQkFDckMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7aUJBQ3ZELENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLGNBQWMsRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQW9CLEVBQUUsRUFBRTtnQkFDeEUsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUM7b0JBQzdCLElBQUk7b0JBQ0osU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztpQkFDckMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQ2xCLHVCQUF1QixFQUN2QixLQUFLLEVBQUUsWUFBdUMsRUFBRSxFQUFFO2dCQUNoRCxNQUFNLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxxQkFBcUIsQ0FBQztvQkFDckQsbUJBQW1CLEVBQUUsWUFBWSxDQUFDLG1CQUFtQjt3QkFDbkQsQ0FBQyxDQUFDLFlBQVksQ0FBQyxtQkFBbUI7d0JBQ2xDLENBQUMsQ0FBQyxZQUFZLENBQUMsb0JBQW9COzRCQUNuQyxDQUFDLENBQUMsWUFBWSxDQUFDLG9CQUFvQjs0QkFDbkMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSztvQkFDOUIsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7b0JBQ3RELHFCQUFxQixFQUFFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2lCQUM3RCxDQUFDLENBQUM7WUFDTCxDQUFDLENBQ0YsQ0FBQztZQUVGLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FDbEIsa0JBQWtCLEVBQ2xCLEtBQUssRUFBRSxFQUFFLFlBQVksRUFBa0MsRUFBRSxFQUFFO2dCQUN6RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUM7b0JBQ3JDLFlBQVk7b0JBQ1osVUFBVSxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsRUFBRTtpQkFDcEUsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUNGLENBQUM7WUFFRixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFLElBQUksRUFBb0IsRUFBRSxFQUFFO2dCQUMvRCxNQUFNLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDO29CQUN2QyxJQUFJO29CQUNKLFVBQVUsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFLEVBQUU7aUJBQ3BFLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLGVBQWUsRUFBRSxLQUFLLEVBQUUsV0FBOEIsRUFBRSxFQUFFO2dCQUM3RSxNQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDO29CQUNyQyxNQUFNLEVBQUUsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLO29CQUNuRSxvQkFBb0IsRUFBRSxXQUFXLENBQUMsc0JBQXNCO3dCQUN0RCxDQUFDLENBQUMsV0FBVyxDQUFDLHNCQUFzQjt3QkFDcEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLO29CQUNuQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLO29CQUNyQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO29CQUMxQywwQkFBMEIsRUFBRSxJQUFJLENBQUMsMEJBQTBCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztvQkFDdEUsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7b0JBQ3RELFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7b0JBQ3BDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUs7b0JBQy9CLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUs7b0JBQzNCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUs7aUJBQzFCLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUNsQixzQkFBc0IsRUFDdEIsS0FBSyxFQUFFLEVBQUUsV0FBVyxFQUE0QixFQUFFLEVBQUU7Z0JBQ2xELE1BQU0sSUFBSSxDQUFDLG9CQUFvQixDQUFDLG9CQUFvQixDQUFDO29CQUNuRCxXQUFXO29CQUNYLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUs7b0JBQ25DLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUs7b0JBQzNDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO29CQUN0RCxpQkFBaUIsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztpQkFDckQsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUNGLENBQUM7WUFFRixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsa0JBQWtCLEVBQUUsS0FBSyxFQUFFLEVBQUUsVUFBVSxFQUEwQixFQUFFLEVBQUU7Z0JBQ3hGLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQztvQkFDckMsVUFBVTtvQkFDVixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLO29CQUM3QixlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLO29CQUMzQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSztvQkFDakQsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUs7b0JBQ25ELFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUs7b0JBQ3JDLGNBQWMsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7b0JBQzlDLHdCQUF3QixFQUFFLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO29CQUNsRSx5QkFBeUIsRUFBRSxJQUFJLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztpQkFDckUsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFDSCwrRkFBK0Y7WUFDL0YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLHFCQUFxQixFQUFFLEtBQUssRUFBRSxFQUFFLFFBQVEsRUFBMEIsRUFBRSxFQUFFO2dCQUN6RixJQUFJLENBQUMsbUJBQW1CLENBQUMsbUJBQW1CLENBQUM7b0JBQzNDLFFBQVE7b0JBQ1Isa0JBQWtCLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7b0JBQ3RELGtCQUFrQixFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO29CQUN0RCx3QkFBd0IsRUFBRSxJQUFJLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztvQkFDbEUsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7aUJBQ3JELENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUNsQix1QkFBdUIsRUFDdkIsS0FBSyxFQUFFLEVBQ0wsVUFBVSxFQUNWLElBQUksRUFDSixJQUFJLEdBS0wsRUFBRSxFQUFFO2dCQUNILE1BQU0sSUFBSSxDQUFDLG1CQUFtQixDQUFDLG1CQUFtQixDQUFDO29CQUNqRCxVQUFVO29CQUNWLElBQUk7b0JBQ0osSUFBSTtvQkFDSixVQUFVLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxFQUFFO2lCQUNwRSxDQUFDLENBQUM7WUFDTCxDQUFDLENBQ0YsQ0FBQztZQUVGLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FDbEIsd0JBQXdCLEVBQ3hCLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQW1DLEVBQUUsRUFBRTtnQkFDeEQsTUFBTSxJQUFJLENBQUMsb0JBQW9CLENBQUMsb0JBQW9CLENBQUM7b0JBQ25ELElBQUk7b0JBQ0osSUFBSTtvQkFDSixVQUFVLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxFQUFFO2lCQUNwRSxDQUFDLENBQUM7WUFDTCxDQUFDLENBQ0YsQ0FBQztZQUVGLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FDbEIsdUJBQXVCLEVBQ3ZCLEtBQUssRUFBRSxFQUNMLFVBQVUsRUFDVixJQUFJLEdBSUwsRUFBRSxFQUFFO2dCQUNILElBQUksVUFBVSxJQUFJLElBQUksRUFBRSxDQUFDO29CQUN2QixNQUFNLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxtQkFBbUIsQ0FBQzt3QkFDakQsVUFBVTt3QkFDVixJQUFJO3dCQUNKLFVBQVUsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFLEVBQUU7cUJBQ3BFLENBQUMsQ0FBQztnQkFDTCxDQUFDO1lBQ0gsQ0FBQyxDQUNGLENBQUM7WUFFRixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQ2xCLGtCQUFrQixFQUNsQixLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQWdFLEVBQUUsRUFBRTtnQkFDL0UsTUFBTSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUM7b0JBQzNDLElBQUk7b0JBQ0osVUFBVSxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsRUFBRTtpQkFDcEUsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUNGLENBQUM7WUFFRixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsY0FBYyxFQUFFLEtBQUssSUFBSSxFQUFFO2dCQUM5QyxNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDO29CQUNuQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO29CQUNwQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLO29CQUNuQyxLQUFLLEVBQUUsSUFBSTtvQkFDWCxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLO29CQUMvQixlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2lCQUNqRCxDQUFDLENBQUM7Z0JBRUgsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUM5QixNQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDO3dCQUMvQixVQUFVLEVBQUU7NEJBQ1YsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFOzRCQUN0QixHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRTt5QkFDNUI7cUJBQ0YsQ0FBQyxDQUFDO2dCQUNMLENBQUM7Z0JBQ0QsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUM5QixNQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDO3dCQUMvQixVQUFVLEVBQUU7NEJBQ1YsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFOzRCQUN0QixHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRTt5QkFDNUI7cUJBQ0YsQ0FBQyxDQUFDO2dCQUNMLENBQUM7Z0JBRUQsTUFBTSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDN0IsQ0FBQyxDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsb0JBQW9CLEVBQUUsS0FBSyxJQUFJLEVBQUU7Z0JBQ3BELE1BQU0sSUFBSSxDQUFDLGtCQUFrQixDQUFDLGtCQUFrQixDQUFDO29CQUMvQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLO29CQUN6QixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLO29CQUN6QixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLO2lCQUM5QixDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUVILElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxLQUFLLEVBQUUsRUFBRSxPQUFPLEVBQXdCLEVBQUUsRUFBRTtnQkFDakYsTUFBTSxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQztvQkFDdkMsT0FBTztvQkFDUCxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLO29CQUM3QixlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLO29CQUMzQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLO29CQUN6QixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLO29CQUMvQixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLO29CQUMzQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLO29CQUN6QixjQUFjLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO29CQUM5Qyx1QkFBdUIsRUFBRSxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztpQkFDakUsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQ2xCLHNCQUFzQixFQUN0QixLQUFLLEVBQUUsRUFBRSxhQUFhLEVBQTZCLEVBQUUsRUFBRTtnQkFDckQsTUFBTSxJQUFJLENBQUMsb0JBQW9CLENBQUMsb0JBQW9CLENBQUM7b0JBQ25ELGFBQWE7b0JBQ2IsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztvQkFDcEMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSztpQkFDaEMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUNGLENBQUM7WUFFRixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsbUJBQW1CLEVBQUUsS0FBSyxJQUFJLEVBQUU7Z0JBQ25ELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxpQkFBaUIsQ0FBQztvQkFDdkMsK0JBQStCLEVBQUUsSUFBSSxDQUFDLCtCQUErQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7aUJBQ2pGLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLGNBQWMsRUFBRSxLQUFLLElBQUksRUFBRTtnQkFDOUMsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQztvQkFDbkMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSztvQkFDN0IsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSztvQkFDekIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSztpQkFDMUIsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMscUJBQXFCLEVBQUUsS0FBSyxJQUFJLEVBQUU7Z0JBQ3JELE1BQU0sSUFBSSxDQUFDLG1CQUFtQixDQUFDLG1CQUFtQixDQUFDO29CQUNqRCxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLO29CQUM3QixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLO29CQUN6QixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLO29CQUN6QixvQkFBb0IsRUFBRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSztpQkFDdEQsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQ2xCLHdCQUF3QixFQUN4QixLQUFLLEVBQUUsRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUE4QixFQUFFLEVBQUU7Z0JBQzdELE1BQU0sSUFBSSxDQUFDLHNCQUFzQixDQUFDLHNCQUFzQixDQUFDO29CQUN2RCxPQUFPO29CQUNQLFdBQVc7b0JBQ1gsV0FBVztvQkFDWCxNQUFNO29CQUNOLFFBQVE7b0JBQ1IsVUFBVSxFQUFFO3dCQUNWLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRTt3QkFDdEIsR0FBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUU7cUJBQzVCO2lCQUNGLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FDRixDQUFDO1lBRUYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUNsQixpQkFBaUIsRUFDakIsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLGtCQUFrQixFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQXVCLEVBQUUsRUFBRTtnQkFDakYsTUFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FBQztvQkFDekMsS0FBSztvQkFDTCxrQkFBa0I7b0JBQ2xCLFVBQVU7b0JBQ1YsUUFBUTtvQkFDUixVQUFVLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxFQUFFO2lCQUNwRSxDQUFDLENBQUM7WUFDTCxDQUFDLENBQ0YsQ0FBQztZQUVGLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxLQUFLLEVBQUUsRUFBRSxRQUFRLEVBQXdCLEVBQUUsRUFBRTtnQkFDckYsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGlCQUFpQixDQUFDO29CQUN2QyxRQUFRO29CQUNSLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7aUJBQ3JDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUNsQixrQkFBa0IsRUFDbEIsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBcUMsRUFBRSxFQUFFO2dCQUM3RCxNQUFNLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQztvQkFDM0MsS0FBSztvQkFDTCxNQUFNO29CQUNOLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7aUJBQ3JDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FDRixDQUFDO1lBQ0YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUNsQixxQkFBcUIsRUFDckIsQ0FBQyxFQUFFLGVBQWUsRUFBMkIsRUFBRSxFQUFFO2dCQUMvQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsbUJBQW1CLENBQUM7b0JBQzNDLGVBQWU7b0JBQ2YsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztvQkFDcEMsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSztvQkFDbkMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7b0JBQ3BELGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7b0JBQ2hELGlCQUFpQixFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO29CQUNwRCxrQkFBa0IsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztvQkFDdEQsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7b0JBQ2xELHVCQUF1QixFQUFFLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO29CQUNoRSx1QkFBdUIsRUFBRSxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztvQkFDaEUsd0JBQXdCLEVBQUUsSUFBSSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7b0JBQ2xFLHNCQUFzQixFQUFFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO29CQUM5RCxzQkFBc0IsRUFBRSxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztvQkFDOUQsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7b0JBQzlELHVCQUF1QixFQUFFLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO29CQUNoRSxxQkFBcUIsRUFBRSxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztvQkFDNUQsNEJBQTRCLEVBQUUsSUFBSSxDQUFDLDRCQUE0QixDQUFDLEtBQUs7aUJBQ3RFLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FDRixDQUFDO1lBQ0YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxLQUFLLEVBQUUsSUFBcUIsRUFBRSxFQUFFO2dCQUNsRSxJQUFJLENBQUM7b0JBQ0gsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQzt3QkFDakMsSUFBSTt3QkFDSixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLO3dCQUN2QixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBRSxFQUFXO3dCQUN0RCxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLO3dCQUN6QixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLO3dCQUMzQixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO3dCQUNwQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO3dCQUN4QyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO3dCQUN0Qyx3QkFBd0IsRUFBRSxJQUFJLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztxQkFDbkUsQ0FBQyxDQUFDO2dCQUNMLENBQUM7Z0JBQUMsTUFBTSxDQUFDO29CQUNQLGtCQUFrQjtnQkFDcEIsQ0FBQztZQUNILENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLHFCQUFxQixFQUFFLEtBQUssRUFBRSxJQUE2QixFQUFFLEVBQUU7Z0JBQ2xGLElBQUksQ0FBQztvQkFDSCxNQUFNLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxtQkFBbUIsQ0FBQzt3QkFDakQsSUFBSTt3QkFDSixVQUFVLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxFQUFFO3FCQUNwRSxDQUFDLENBQUM7Z0JBQ0wsQ0FBQztnQkFBQyxNQUFNLENBQUM7b0JBQ1Asa0JBQWtCO2dCQUNwQixDQUFDO1lBQ0gsQ0FBQyxDQUFDLENBQUM7WUFFSCxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUM7Z0JBQ25CLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUs7Z0JBQ3pCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUs7Z0JBQzdCLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUs7Z0JBQzNCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUs7Z0JBQ3pCLEdBQUcsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUs7Z0JBQ3hCLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUs7YUFDcEMsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxJQUFJLENBQUMsbUJBQW1CLENBQUMsbUJBQW1CLENBQUM7Z0JBQ2pELE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUs7Z0JBQ3pCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUs7Z0JBQzdCLGNBQWMsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7YUFDL0MsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLG9CQUFvQixDQUFDLG9CQUFvQixDQUFDO2dCQUM3QyxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLO2dCQUMxQixVQUFVLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxFQUFFO2FBQ3BFLENBQUMsQ0FBQztZQUVILE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDM0IsQ0FBQzthQUFNLENBQUM7WUFDTixPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7SUFDSCxDQUFDO3VHQTlsSlUsa0JBQWtCOzJGQUFsQixrQkFBa0Isa1ZBRmxCLENBQUMsYUFBYSxDQUFDLDBCQTdZaEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcVlULHlFQWhiQyxZQUFZLHNlQUNaLGtCQUFrQixpS0FDbEIsZUFBZSxnSkFDZixXQUFXLDBVQUNYLGNBQWMsMklBQ2QsU0FBUywyRkFFVCx1QkFBdUIseUxBQ3ZCLFlBQVksbUtBQ1osYUFBYSw4T0FDYixZQUFZLHdIQUNaLFVBQVUsbVNBQ1Ysa0JBQWtCLDZMQUNsQixvQkFBb0Isb05BQ3BCLGtCQUFrQixtYUFDbEIsZ0JBQWdCLHVPQUNoQixrQkFBa0Isc1BBQ2xCLFNBQVMsa05BQ1QsYUFBYSxpYkFDYixnQkFBZ0Isb09BQ2hCLGVBQWUsaU9BRWYsaUJBQWlCLDJTQUNqQixTQUFTLGlTQUNULGNBQWMsbU1BQ2QsYUFBYSw2UkFDYixtQkFBbUIsZ1FBQ25CLHNCQUFzQixnT0FDdEIsaUJBQWlCLHlNQUNqQixtQkFBbUIsdU5BQ25CLGtCQUFrQiw4TEFFbEIsZ0JBQWdCLGlKQUNoQixVQUFVLGdJQUNWLHdCQUF3Qiw2S0FDeEIsZ0JBQWdCOzsyRkF1WlAsa0JBQWtCO2tCQS9iOUIsU0FBUzsrQkFDRSx5QkFBeUIsY0FDdkIsSUFBSSxXQUNQO3dCQUNQLFlBQVk7d0JBQ1osWUFBWTt3QkFDWixrQkFBa0I7d0JBQ2xCLGVBQWU7d0JBQ2YsV0FBVzt3QkFDWCxjQUFjO3dCQUNkLFNBQVM7d0JBQ1QsMEJBQTBCO3dCQUMxQix1QkFBdUI7d0JBQ3ZCLFlBQVk7d0JBQ1osYUFBYTt3QkFDYixZQUFZO3dCQUNaLFVBQVU7d0JBQ1Ysa0JBQWtCO3dCQUNsQixvQkFBb0I7d0JBQ3BCLGtCQUFrQjt3QkFDbEIsZ0JBQWdCO3dCQUNoQixrQkFBa0I7d0JBQ2xCLFNBQVM7d0JBQ1QsYUFBYTt3QkFDYixnQkFBZ0I7d0JBQ2hCLGVBQWU7d0JBQ2YsV0FBVzt3QkFDWCxpQkFBaUI7d0JBQ2pCLFNBQVM7d0JBQ1QsY0FBYzt3QkFDZCxhQUFhO3dCQUNiLG1CQUFtQjt3QkFDbkIsc0JBQXNCO3dCQUN0QixpQkFBaUI7d0JBQ2pCLG1CQUFtQjt3QkFDbkIsa0JBQWtCO3dCQUNsQixXQUFXO3dCQUNYLGdCQUFnQjt3QkFDaEIsVUFBVTt3QkFDVix3QkFBd0I7d0JBQ3hCLGdCQUFnQjt3QkFDaEIsVUFBVTt3QkFDVixhQUFhO3dCQUNiLGdCQUFnQjt3QkFDaEIsaUJBQWlCO3dCQUNqQixzQkFBc0I7d0JBQ3RCLGlCQUFpQjtxQkFDbEIsWUFDUzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxWVQsYUFRVSxDQUFDLGFBQWEsQ0FBQzsreUhBSTFCLFdBQVc7c0JBRFYsS0FBSztnQkFFRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLGNBQWM7c0JBQXRCLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQWcwR0EsWUFBWTtzQkFGakIsWUFBWTt1QkFBQyxlQUFlOztzQkFDNUIsWUFBWTt1QkFBQywwQkFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5qZWN0b3IsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyT3V0bGV0IH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBDb29raWVTZXJ2aWNlIH0gZnJvbSAnbmd4LWNvb2tpZS1zZXJ2aWNlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgU3Vic2NyaXB0aW9uLCBjb21iaW5lTGF0ZXN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBTb2NrZXQgfSBmcm9tICdzb2NrZXQuaW8tY2xpZW50JztcbmltcG9ydCB7XG4gIGZhUGxheUNpcmNsZSxcbiAgZmFQYXVzZUNpcmNsZSxcbiAgZmFTdG9wQ2lyY2xlLFxuICBmYURvdENpcmNsZSxcbiAgZmFSZWNvcmRWaW55bCxcbiAgZmFDb2csXG4gIGZhVXNlcnMsXG4gIGZhQ2xvY2ssXG4gIGZhVXNlclBsdXMsXG4gIGZhVG9vbHMsXG4gIGZhRGVza3RvcCxcbiAgZmFQb2xsLFxuICBmYVVzZXJGcmllbmRzLFxuICBmYUNoYWxrYm9hcmRUZWFjaGVyLFxuICBmYU1pY3JvcGhvbmUsXG4gIGZhTWljcm9waG9uZVNsYXNoLFxuICBmYVZpZGVvLFxuICBmYVZpZGVvU2xhc2gsXG4gIGZhUGhvbmUsXG4gIGZhQmFycyxcbiAgZmFDb21tZW50cyxcbiAgZmFDaGFydEJhcixcbn0gZnJvbSAnQGZvcnRhd2Vzb21lL2ZyZWUtc29saWQtc3ZnLWljb25zJztcblxuaW1wb3J0IHsgaW5pdGlhbFZhbHVlc1N0YXRlIH0gZnJvbSAnLi4vLi4vbWV0aG9kcy91dGlscy9pbml0aWFsLXZhbHVlcy51dGlsJztcblxuaW1wb3J0IHsgTWFpbkFzcGVjdENvbXBvbmVudCB9IGZyb20gJy4uL2Rpc3BsYXktY29tcG9uZW50cy9tYWluLWFzcGVjdC1jb21wb25lbnQvbWFpbi1hc3BlY3QtY29tcG9uZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBMb2FkaW5nTW9kYWwgfSBmcm9tICcuLi9kaXNwbGF5LWNvbXBvbmVudHMvbG9hZGluZy1tb2RhbC9sb2FkaW5nLW1vZGFsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb250cm9sQnV0dG9uc0NvbXBvbmVudCB9IGZyb20gJy4uL2Rpc3BsYXktY29tcG9uZW50cy9jb250cm9sLWJ1dHRvbnMtY29tcG9uZW50L2NvbnRyb2wtYnV0dG9ucy1jb21wb25lbnQuY29tcG9uZW50JztcbmltcG9ydCB7IENvbnRyb2xCdXR0b25zQWx0Q29tcG9uZW50IH0gZnJvbSAnLi4vZGlzcGxheS1jb21wb25lbnRzL2NvbnRyb2wtYnV0dG9ucy1hbHQtY29tcG9uZW50L2NvbnRyb2wtYnV0dG9ucy1hbHQtY29tcG9uZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBPdGhlckdyaWRDb21wb25lbnQgfSBmcm9tICcuLi9kaXNwbGF5LWNvbXBvbmVudHMvb3RoZXItZ3JpZC1jb21wb25lbnQvb3RoZXItZ3JpZC1jb21wb25lbnQuY29tcG9uZW50JztcbmltcG9ydCB7IE1haW5TY3JlZW5Db21wb25lbnQgfSBmcm9tICcuLi9kaXNwbGF5LWNvbXBvbmVudHMvbWFpbi1zY3JlZW4tY29tcG9uZW50L21haW4tc2NyZWVuLWNvbXBvbmVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWFpbkdyaWRDb21wb25lbnQgfSBmcm9tICcuLi9kaXNwbGF5LWNvbXBvbmVudHMvbWFpbi1ncmlkLWNvbXBvbmVudC9tYWluLWdyaWQtY29tcG9uZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTdWJBc3BlY3RDb21wb25lbnQgfSBmcm9tICcuLi9kaXNwbGF5LWNvbXBvbmVudHMvc3ViLWFzcGVjdC1jb21wb25lbnQvc3ViLWFzcGVjdC1jb21wb25lbnQuY29tcG9uZW50JztcbmltcG9ydCB7IE1haW5Db250YWluZXJDb21wb25lbnQgfSBmcm9tICcuLi9kaXNwbGF5LWNvbXBvbmVudHMvbWFpbi1jb250YWluZXItY29tcG9uZW50L21haW4tY29udGFpbmVyLWNvbXBvbmVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQWxlcnRDb21wb25lbnQgfSBmcm9tICcuLi9kaXNwbGF5LWNvbXBvbmVudHMvYWxlcnQtY29tcG9uZW50L2FsZXJ0LmNvbXBvbmVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWVudU1vZGFsIH0gZnJvbSAnLi4vbWVudS1jb21wb25lbnRzL21lbnUtbW9kYWwvbWVudS1tb2RhbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgUmVjb3JkaW5nTW9kYWwgfSBmcm9tICcuLi9yZWNvcmRpbmctY29tcG9uZW50cy9yZWNvcmRpbmctbW9kYWwvcmVjb3JkaW5nLW1vZGFsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSZXF1ZXN0c01vZGFsIH0gZnJvbSAnLi4vcmVxdWVzdHMtY29tcG9uZW50cy9yZXF1ZXN0cy1tb2RhbC9yZXF1ZXN0cy1tb2RhbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgV2FpdGluZ1Jvb21Nb2RhbCB9IGZyb20gJy4uL3dhaXRpbmctY29tcG9uZW50cy93YWl0aW5nLXJvb20tbW9kYWwuY29tcG9uZW50JztcbmltcG9ydCB7IERpc3BsYXlTZXR0aW5nc01vZGFsIH0gZnJvbSAnLi4vZGlzcGxheS1zZXR0aW5ncy1jb21wb25lbnRzL2Rpc3BsYXktc2V0dGluZ3MtbW9kYWwuY29tcG9uZW50JztcbmltcG9ydCB7IEV2ZW50U2V0dGluZ3NNb2RhbCB9IGZyb20gJy4uL2V2ZW50LXNldHRpbmdzLWNvbXBvbmVudHMvZXZlbnQtc2V0dGluZ3MtbW9kYWwvZXZlbnQtc2V0dGluZ3MtbW9kYWwuY29tcG9uZW50JztcbmltcG9ydCB7IENvSG9zdE1vZGFsIH0gZnJvbSAnLi4vY28taG9zdC1jb21wb25lbnRzL2NvLWhvc3QtbW9kYWwvY28taG9zdC1tb2RhbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGFydGljaXBhbnRzTW9kYWwgfSBmcm9tICcuLi9wYXJ0aWNpcGFudHMtY29tcG9uZW50cy9wYXJ0aWNpcGFudHMtbW9kYWwvcGFydGljaXBhbnRzLW1vZGFsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNZXNzYWdlc01vZGFsIH0gZnJvbSAnLi4vbWVzc2FnZS1jb21wb25lbnRzL21lc3NhZ2VzLW1vZGFsL21lc3NhZ2VzLW1vZGFsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNZWRpYVNldHRpbmdzTW9kYWwgfSBmcm9tICcuLi9tZWRpYS1zZXR0aW5ncy1jb21wb25lbnRzL21lZGlhLXNldHRpbmdzLW1vZGFsL21lZGlhLXNldHRpbmdzLW1vZGFsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb25maXJtRXhpdE1vZGFsIH0gZnJvbSAnLi4vZXhpdC1jb21wb25lbnRzL2NvbmZpcm0tZXhpdC1tb2RhbC9jb25maXJtLWV4aXQtbW9kYWwuY29tcG9uZW50JztcbmltcG9ydCB7IENvbmZpcm1IZXJlTW9kYWwgfSBmcm9tICcuLi9taXNjLWNvbXBvbmVudHMvY29uZmlybS1oZXJlLW1vZGFsL2NvbmZpcm0taGVyZS1tb2RhbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2hhcmVFdmVudE1vZGFsIH0gZnJvbSAnLi4vbWlzYy1jb21wb25lbnRzL3NoYXJlLWV2ZW50LW1vZGFsL3NoYXJlLWV2ZW50LW1vZGFsLmNvbXBvbmVudCc7XG5pbXBvcnQge1xuICBXZWxjb21lUGFnZSxcbiAgV2VsY29tZVBhZ2VPcHRpb25zLFxufSBmcm9tICcuLi9taXNjLWNvbXBvbmVudHMvd2VsY29tZS1wYWdlL3dlbGNvbWUtcGFnZS5jb21wb25lbnQnO1xuXG5pbXBvcnQgeyBQb2xsTW9kYWwgfSBmcm9tICcuLi9wb2xscy1jb21wb25lbnRzL3BvbGwtbW9kYWwvcG9sbC1tb2RhbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQmFja2dyb3VuZE1vZGFsIH0gZnJvbSAnLi4vYmFja2dyb3VuZC1jb21wb25lbnRzL2JhY2tncm91bmQtbW9kYWwvYmFja2dyb3VuZC1tb2RhbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQnJlYWtvdXRSb29tc01vZGFsIH0gZnJvbSAnLi4vYnJlYWtvdXQtY29tcG9uZW50cy9icmVha291dC1yb29tcy1tb2RhbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29uZmlndXJlV2hpdGVib2FyZE1vZGFsIH0gZnJvbSAnLi4vd2hpdGVib2FyZC1jb21wb25lbnRzL2NvbmZpZ3VyZS13aGl0ZWJvYXJkLW1vZGFsL2NvbmZpZ3VyZS13aGl0ZWJvYXJkLW1vZGFsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBXaGl0ZWJvYXJkIH0gZnJvbSAnLi4vd2hpdGVib2FyZC1jb21wb25lbnRzL3doaXRlYm9hcmQvd2hpdGVib2FyZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2NyZWVuYm9hcmQgfSBmcm9tICcuLi9zY3JlZW5ib2FyZC1jb21wb25lbnRzL3NjcmVlbmJvYXJkL3NjcmVlbmJvYXJkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTY3JlZW5ib2FyZE1vZGFsIH0gZnJvbSAnLi4vc2NyZWVuYm9hcmQtY29tcG9uZW50cy9zY3JlZW5ib2FyZC1tb2RhbC9zY3JlZW5ib2FyZC1tb2RhbC5jb21wb25lbnQnO1xuLy8gcGFnaW5hdGlvbiBhbmQgZGlzcGxheSBvZiBtZWRpYSAoc2FtcGxlcylcbmltcG9ydCB7IFBhZ2luYXRpb24gfSBmcm9tICcuLi9kaXNwbGF5LWNvbXBvbmVudHMvcGFnaW5hdGlvbi9wYWdpbmF0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGbGV4aWJsZUdyaWQgfSBmcm9tICcuLi9kaXNwbGF5LWNvbXBvbmVudHMvZmxleGlibGUtZ3JpZC9mbGV4aWJsZS1ncmlkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGbGV4aWJsZVZpZGVvIH0gZnJvbSAnLi4vZGlzcGxheS1jb21wb25lbnRzL2ZsZXhpYmxlLXZpZGVvL2ZsZXhpYmxlLXZpZGVvLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBdWRpb0dyaWQgfSBmcm9tICcuLi9kaXNwbGF5LWNvbXBvbmVudHMvYXVkaW8tZ3JpZC9hdWRpby1ncmlkLmNvbXBvbmVudCc7XG5cbmltcG9ydCB7IE1lbnVXaWRnZXQgfSBmcm9tICcuLi9kaXNwbGF5LWNvbXBvbmVudHMvY29udHJvbC13aWRnZXRzL21lbnUtd2lkZ2V0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNZXNzYWdlV2lkZ2V0IH0gZnJvbSAnLi4vZGlzcGxheS1jb21wb25lbnRzL2NvbnRyb2wtd2lkZ2V0cy9tZXNzYWdlLXdpZGdldC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWVudVJlY29yZFdpZGdldCB9IGZyb20gJy4uL2Rpc3BsYXktY29tcG9uZW50cy9jb250cm9sLXdpZGdldHMvbWVudS1yZWNvcmQtd2lkZ2V0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSZWNvcmRUaW1lcldpZGdldCB9IGZyb20gJy4uL2Rpc3BsYXktY29tcG9uZW50cy9jb250cm9sLXdpZGdldHMvcmVjb3JkLXRpbWVyLXdpZGdldC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWVudVBhcnRpY2lwYW50c1dpZGdldCB9IGZyb20gJy4uL2Rpc3BsYXktY29tcG9uZW50cy9jb250cm9sLXdpZGdldHMvbWVudS1wYXJ0aWNpcGFudHMtd2lkZ2V0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTY3JlZW5TaGFyZVdpZGdldCB9IGZyb20gJy4uL2Rpc3BsYXktY29tcG9uZW50cy9jb250cm9sLXdpZGdldHMvc2NyZWVuc2hhcmUtd2lkZ2V0LmNvbXBvbmVudCc7XG5cbmltcG9ydCB7XG4gIFJlc3BvbnNlSm9pblJvb20sXG4gIENvSG9zdFJlc3BvbnNpYmlsaXR5LFxuICBFdmVudFR5cGUsXG4gIFBhcnRpY2lwYW50LFxuICBDb25zdW1lU29ja2V0LFxuICBNZWV0aW5nUm9vbVBhcmFtcyxcbiAgVmlkQ29ucyxcbiAgSFBhcmFtc1R5cGUsXG4gIFZQYXJhbXNUeXBlLFxuICBTY3JlZW5QYXJhbXNUeXBlLFxuICBBUGFyYW1zVHlwZSxcbiAgVXNlclJlY29yZGluZ1BhcmFtcyxcbiAgU3RyZWFtLFxuICBBdWRpb0RlY2liZWxzLFxuICBTY3JlZW5TdGF0ZSxcbiAgR3JpZFNpemVzLFxuICBDdXN0b21NZWRpYUNvbXBvbmVudCxcbiAgTWVzc2FnZSxcbiAgV2FpdGluZ1Jvb21QYXJ0aWNpcGFudCxcbiAgQ29tcG9uZW50U2l6ZXMsXG4gIFRyYW5zcG9ydCBhcyBUcmFuc3BvcnRUeXBlLFxuICBTaGFwZSxcbiAgUG9sbCxcbiAgQnJlYWtvdXRQYXJ0aWNpcGFudCxcbiAgV2hpdGVib2FyZFVzZXIsXG4gIFJlcXVlc3QsXG4gIEFsbE1lbWJlcnNEYXRhLFxuICBBbGxNZW1iZXJzUmVzdERhdGEsXG4gIEJyZWFrb3V0Um9vbVVwZGF0ZWREYXRhLFxuICBBbGxXYWl0aW5nUm9vbU1lbWJlcnNEYXRhLFxuICBNYWluQnV0dG9uQWx0LFxuICBNYWluQ3VzdG9tQnV0dG9uLFxuICBSZWNvcmRQYXJhbXMsXG4gIFNlZWREYXRhLFxuICBVcGRhdGVkQ29Ib3N0RGF0YSxcbiAgU2V0dGluZ3MsXG4gIFVwZGF0ZUNvbnN1bWluZ0RvbWFpbnNEYXRhLFxuICBSZWNvcmRpbmdOb3RpY2VEYXRhLFxuICBIb3N0UmVxdWVzdFJlc3BvbnNlRGF0YSxcbiAgUG9sbFVwZGF0ZWREYXRhLFxuICBQcmVKb2luUGFnZU9wdGlvbnMsXG59IGZyb20gJy4uLy4uL0B0eXBlcy90eXBlcyc7XG5cbi8vaW1wb3J0IG1ldGhvZHMgZm9yIGNvbnRyb2wgKHNhbXBsZXMpXG4vLyBJbXBvcnQgbWV0aG9kcyBmb3IgY29udHJvbCAoc2FtcGxlcylcbmltcG9ydCB7IExhdW5jaE1lbnVNb2RhbCB9IGZyb20gJy4uLy4uL21ldGhvZHMvbWVudS1tZXRob2RzL2xhdW5jaC1tZW51LW1vZGFsLnNlcnZpY2UnO1xuaW1wb3J0IHsgTGF1bmNoUmVjb3JkaW5nIH0gZnJvbSAnLi4vLi4vbWV0aG9kcy9yZWNvcmRpbmctbWV0aG9kcy9sYXVuY2gtcmVjb3JkaW5nLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3RhcnRSZWNvcmRpbmcgfSBmcm9tICcuLi8uLi9tZXRob2RzL3JlY29yZGluZy1tZXRob2RzL3N0YXJ0LXJlY29yZGluZy5zZXJ2aWNlJztcbmltcG9ydCB7IENvbmZpcm1SZWNvcmRpbmcgfSBmcm9tICcuLi8uLi9tZXRob2RzL3JlY29yZGluZy1tZXRob2RzL2NvbmZpcm0tcmVjb3JkaW5nLnNlcnZpY2UnO1xuaW1wb3J0IHsgTGF1bmNoV2FpdGluZyB9IGZyb20gJy4uLy4uL21ldGhvZHMvd2FpdGluZy1tZXRob2RzL2xhdW5jaC13YWl0aW5nLnNlcnZpY2UnO1xuaW1wb3J0IHsgbGF1bmNoQ29Ib3N0IH0gZnJvbSAnLi4vLi4vbWV0aG9kcy9jby1ob3N0LW1ldGhvZHMvbGF1bmNoLWNvLWhvc3Quc2VydmljZSc7XG5pbXBvcnQgeyBMYXVuY2hNZWRpYVNldHRpbmdzIH0gZnJvbSAnLi4vLi4vbWV0aG9kcy9tZWRpYS1zZXR0aW5ncy1tZXRob2RzL2xhdW5jaC1tZWRpYS1zZXR0aW5ncy5zZXJ2aWNlJztcbmltcG9ydCB7IExhdW5jaERpc3BsYXlTZXR0aW5ncyB9IGZyb20gJy4uLy4uL21ldGhvZHMvZGlzcGxheS1zZXR0aW5ncy1tZXRob2RzL2xhdW5jaC1kaXNwbGF5LXNldHRpbmdzLnNlcnZpY2UnO1xuaW1wb3J0IHsgTGF1bmNoU2V0dGluZ3MgfSBmcm9tICcuLi8uLi9tZXRob2RzL3NldHRpbmdzLW1ldGhvZHMvbGF1bmNoLXNldHRpbmdzLnNlcnZpY2UnO1xuaW1wb3J0IHsgTGF1bmNoUmVxdWVzdHMgfSBmcm9tICcuLi8uLi9tZXRob2RzL3JlcXVlc3RzLW1ldGhvZHMvbGF1bmNoLXJlcXVlc3RzLnNlcnZpY2UnO1xuaW1wb3J0IHsgTGF1bmNoUGFydGljaXBhbnRzIH0gZnJvbSAnLi4vLi4vbWV0aG9kcy9wYXJ0aWNpcGFudHMtbWV0aG9kcy9sYXVuY2gtcGFydGljaXBhbnRzLnNlcnZpY2UnO1xuaW1wb3J0IHsgTGF1bmNoTWVzc2FnZXMgfSBmcm9tICcuLi8uLi9tZXRob2RzL21lc3NhZ2UtbWV0aG9kcy9sYXVuY2gtbWVzc2FnZXMuc2VydmljZSc7XG5pbXBvcnQgeyBMYXVuY2hDb25maXJtRXhpdCB9IGZyb20gJy4uLy4uL21ldGhvZHMvZXhpdC1tZXRob2RzL2xhdW5jaC1jb25maXJtLWV4aXQuc2VydmljZSc7XG5cbmltcG9ydCB7IExhdW5jaFBvbGwgfSBmcm9tICcuLi8uLi9tZXRob2RzL3BvbGxzLW1ldGhvZHMvbGF1bmNoLXBvbGwuc2VydmljZSc7XG5pbXBvcnQgeyBMYXVuY2hCcmVha291dFJvb21zIH0gZnJvbSAnLi4vLi4vbWV0aG9kcy9icmVha291dC1yb29tLW1ldGhvZHMvbGF1bmNoLWJyZWFrb3V0LXJvb21zLnNlcnZpY2UnO1xuaW1wb3J0IHsgTGF1bmNoQ29uZmlndXJlV2hpdGVib2FyZCB9IGZyb20gJy4uLy4uL21ldGhvZHMvd2hpdGVib2FyZC1tZXRob2RzL2xhdW5jaC1jb25maWd1cmUtd2hpdGVib2FyZC5zZXJ2aWNlJztcblxuLy8gbWVkaWFzZnUgZnVuY3Rpb25zIC0tIGV4YW1wbGVzXG5pbXBvcnQgeyBTb2NrZXRNYW5hZ2VyIH0gZnJvbSAnLi4vLi4vc29ja2V0cy9zb2NrZXQtbWFuYWdlci5zZXJ2aWNlJztcbmltcG9ydCB7IEpvaW5Sb29tQ2xpZW50IH0gZnJvbSAnLi4vLi4vcHJvZHVjZXItY2xpZW50L3Byb2R1Y2VyLWNsaWVudC1lbWl0cy9qb2luLXJvb20tY2xpZW50LnNlcnZpY2UnO1xuaW1wb3J0IHsgVXBkYXRlUm9vbVBhcmFtZXRlcnNDbGllbnQgfSBmcm9tICcuLi8uLi9wcm9kdWNlci1jbGllbnQvcHJvZHVjZXItY2xpZW50LWVtaXRzL3VwZGF0ZS1yb29tLXBhcmFtZXRlcnMtY2xpZW50LnNlcnZpY2UnO1xuaW1wb3J0IHsgQ3JlYXRlRGV2aWNlQ2xpZW50IH0gZnJvbSAnLi4vLi4vcHJvZHVjZXItY2xpZW50L3Byb2R1Y2VyLWNsaWVudC1lbWl0cy9jcmVhdGUtZGV2aWNlLWNsaWVudC5zZXJ2aWNlJztcblxuaW1wb3J0IHsgQ2xpY2tWaWRlbyB9IGZyb20gJy4uLy4uL21ldGhvZHMvc3RyZWFtLW1ldGhvZHMvY2xpY2stdmlkZW8uc2VydmljZSc7XG5pbXBvcnQgeyBDbGlja0F1ZGlvIH0gZnJvbSAnLi4vLi4vbWV0aG9kcy9zdHJlYW0tbWV0aG9kcy9jbGljay1hdWRpby5zZXJ2aWNlJztcbmltcG9ydCB7IENsaWNrU2NyZWVuU2hhcmUgfSBmcm9tICcuLi8uLi9tZXRob2RzL3N0cmVhbS1tZXRob2RzL2NsaWNrLXNjcmVlbi1zaGFyZS5zZXJ2aWNlJztcbmltcG9ydCB7IFN0cmVhbVN1Y2Nlc3NWaWRlbyB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9zdHJlYW0tc3VjY2Vzcy12aWRlby5zZXJ2aWNlJztcbmltcG9ydCB7IFN0cmVhbVN1Y2Nlc3NBdWRpbyB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9zdHJlYW0tc3VjY2Vzcy1hdWRpby5zZXJ2aWNlJztcbmltcG9ydCB7IFN0cmVhbVN1Y2Nlc3NTY3JlZW4gfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvc3RyZWFtLXN1Y2Nlc3Mtc2NyZWVuLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3RyZWFtU3VjY2Vzc0F1ZGlvU3dpdGNoIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL3N0cmVhbS1zdWNjZXNzLWF1ZGlvLXN3aXRjaC5zZXJ2aWNlJztcbmltcG9ydCB7IENoZWNrUGVybWlzc2lvbiB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9jaGVjay1wZXJtaXNzaW9uLnNlcnZpY2UnO1xuXG4vLyBtZWRpYXNmdSBmdW5jdGlvbnNcbmltcG9ydCB7IFVwZGF0ZU1pbmlDYXJkc0dyaWQgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvdXBkYXRlLW1pbmktY2FyZHMtZ3JpZC5zZXJ2aWNlJztcbmltcG9ydCB7IE1peFN0cmVhbXMgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvbWl4LXN0cmVhbXMuc2VydmljZSc7XG5pbXBvcnQgeyBEaXNwU3RyZWFtcyB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9kaXNwLXN0cmVhbXMuc2VydmljZSc7XG5pbXBvcnQgeyBTdG9wU2hhcmVTY3JlZW4gfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvc3RvcC1zaGFyZS1zY3JlZW4uc2VydmljZSc7XG5pbXBvcnQgeyBDaGVja1NjcmVlblNoYXJlIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL2NoZWNrLXNjcmVlbi1zaGFyZS5zZXJ2aWNlJztcbmltcG9ydCB7IFN0YXJ0U2hhcmVTY3JlZW4gfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvc3RhcnQtc2hhcmUtc2NyZWVuLnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVxdWVzdFNjcmVlblNoYXJlIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL3JlcXVlc3Qtc2NyZWVuLXNoYXJlLnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVvcmRlclN0cmVhbXMgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvcmVvcmRlci1zdHJlYW1zLnNlcnZpY2UnO1xuaW1wb3J0IHsgUHJlcG9wdWxhdGVVc2VyTWVkaWEgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvcHJlcG9wdWxhdGUtdXNlci1tZWRpYS5zZXJ2aWNlJztcbmltcG9ydCB7IEdldFZpZGVvcyB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9nZXQtdmlkZW9zLnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVQb3J0IH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL3JlLXBvcnQuc2VydmljZSc7XG5pbXBvcnQgeyBUcmlnZ2VyIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL3RyaWdnZXIuc2VydmljZSc7XG5pbXBvcnQgeyBDb25zdW1lclJlc3VtZSB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9jb25zdW1lci1yZXN1bWUuc2VydmljZSc7XG5pbXBvcnQgeyBDb25uZWN0U2VuZFRyYW5zcG9ydEF1ZGlvIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL2Nvbm5lY3Qtc2VuZC10cmFuc3BvcnQtYXVkaW8uc2VydmljZSc7XG5pbXBvcnQgeyBDb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL2Nvbm5lY3Qtc2VuZC10cmFuc3BvcnQtdmlkZW8uc2VydmljZSc7XG5pbXBvcnQgeyBDb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlbiB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9jb25uZWN0LXNlbmQtdHJhbnNwb3J0LXNjcmVlbi5zZXJ2aWNlJztcbmltcG9ydCB7IFByb2Nlc3NDb25zdW1lclRyYW5zcG9ydHMgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvcHJvY2Vzcy1jb25zdW1lci10cmFuc3BvcnRzLnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVzdW1lUGF1c2VTdHJlYW1zIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL3Jlc3VtZS1wYXVzZS1zdHJlYW1zLnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVhZGp1c3QgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvcmVhZGp1c3Quc2VydmljZSc7XG5pbXBvcnQgeyBDaGVja0dyaWQgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvY2hlY2stZ3JpZC5zZXJ2aWNlJztcbmltcG9ydCB7IEdldEVzdGltYXRlIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL2dldC1lc3RpbWF0ZS5zZXJ2aWNlJztcbmltcG9ydCB7IENhbGN1bGF0ZVJvd3NBbmRDb2x1bW5zIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL2NhbGN1bGF0ZS1yb3dzLWFuZC1jb2x1bW5zLnNlcnZpY2UnO1xuaW1wb3J0IHsgQWRkVmlkZW9zR3JpZCB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9hZGQtdmlkZW9zLWdyaWQuc2VydmljZSc7XG5pbXBvcnQgeyBPblNjcmVlbkNoYW5nZXMgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvb24tc2NyZWVuLWNoYW5nZXMuc2VydmljZSc7XG5pbXBvcnQgeyBzbGVlcCB9IGZyb20gJy4uLy4uL21ldGhvZHMvdXRpbHMvc2xlZXAudXRpbCc7XG5pbXBvcnQgeyBDaGFuZ2VWaWRzIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL2NoYW5nZS12aWRzLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29tcGFyZUFjdGl2ZU5hbWVzIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL2NvbXBhcmUtYWN0aXZlLW5hbWVzLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29tcGFyZVNjcmVlblN0YXRlcyB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9jb21wYXJlLXNjcmVlbi1zdGF0ZXMuc2VydmljZSc7XG5pbXBvcnQgeyBDcmVhdGVTZW5kVHJhbnNwb3J0IH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL2NyZWF0ZS1zZW5kLXRyYW5zcG9ydC5zZXJ2aWNlJztcbmltcG9ydCB7IFJlc3VtZVNlbmRUcmFuc3BvcnRBdWRpbyB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9yZXN1bWUtc2VuZC10cmFuc3BvcnQtYXVkaW8uc2VydmljZSc7XG5pbXBvcnQgeyBSZWNlaXZlQWxsUGlwZWRUcmFuc3BvcnRzIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL3JlY2VpdmUtYWxsLXBpcGVkLXRyYW5zcG9ydHMuc2VydmljZSc7XG5pbXBvcnQgeyBEaXNjb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL2Rpc2Nvbm5lY3Qtc2VuZC10cmFuc3BvcnQtdmlkZW8uc2VydmljZSc7XG5pbXBvcnQgeyBEaXNjb25uZWN0U2VuZFRyYW5zcG9ydEF1ZGlvIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL2Rpc2Nvbm5lY3Qtc2VuZC10cmFuc3BvcnQtYXVkaW8uc2VydmljZSc7XG5pbXBvcnQgeyBEaXNjb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlbiB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9kaXNjb25uZWN0LXNlbmQtdHJhbnNwb3J0LXNjcmVlbi5zZXJ2aWNlJztcbmltcG9ydCB7IENvbm5lY3RTZW5kVHJhbnNwb3J0IH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL2Nvbm5lY3Qtc2VuZC10cmFuc3BvcnQuc2VydmljZSc7XG5pbXBvcnQgeyBHZXRQaXBlZFByb2R1Y2Vyc0FsdCB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9nZXQtcGlwZWQtcHJvZHVjZXJzLWFsdC5zZXJ2aWNlJztcbmltcG9ydCB7IFNpZ25hbE5ld0NvbnN1bWVyVHJhbnNwb3J0IH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL3NpZ25hbC1uZXctY29uc3VtZXItdHJhbnNwb3J0LnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29ubmVjdFJlY3ZUcmFuc3BvcnQgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvY29ubmVjdC1yZWN2LXRyYW5zcG9ydC5zZXJ2aWNlJztcbmltcG9ydCB7IFJlVXBkYXRlSW50ZXIgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvcmUtdXBkYXRlLWludGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgVXBkYXRlUGFydGljaXBhbnRBdWRpb0RlY2liZWxzIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL3VwZGF0ZS1wYXJ0aWNpcGFudC1hdWRpby1kZWNpYmVscy5zZXJ2aWNlJztcbmltcG9ydCB7IENsb3NlQW5kUmVzaXplIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL2Nsb3NlLWFuZC1yZXNpemUuc2VydmljZSc7XG5pbXBvcnQgeyBBdXRvQWRqdXN0IH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL2F1dG8tYWRqdXN0LnNlcnZpY2UnO1xuaW1wb3J0IHsgU3dpdGNoVXNlclZpZGVvQWx0IH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL3N3aXRjaC11c2VyLXZpZGVvLWFsdC5zZXJ2aWNlJztcbmltcG9ydCB7IFN3aXRjaFVzZXJWaWRlbyB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9zd2l0Y2gtdXNlci12aWRlby5zZXJ2aWNlJztcbmltcG9ydCB7IFN3aXRjaFVzZXJBdWRpbyB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9zd2l0Y2gtdXNlci1hdWRpby5zZXJ2aWNlJztcbmltcG9ydCB7IFJlY2VpdmVSb29tTWVzc2FnZXMgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvcmVjZWl2ZS1yb29tLW1lc3NhZ2VzLnNlcnZpY2UnO1xuaW1wb3J0IHsgRm9ybWF0TnVtYmVyIH0gZnJvbSAnLi4vLi4vbWV0aG9kcy91dGlscy9mb3JtYXQtbnVtYmVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29ubmVjdElwcyB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9jb25uZWN0LWlwcy5zZXJ2aWNlJztcblxuaW1wb3J0IHsgUG9sbFVwZGF0ZWQgfSBmcm9tICcuLi8uLi9tZXRob2RzL3BvbGxzLW1ldGhvZHMvcG9sbC11cGRhdGVkLnNlcnZpY2UnO1xuaW1wb3J0IHsgSGFuZGxlQ3JlYXRlUG9sbCB9IGZyb20gJy4uLy4uL21ldGhvZHMvcG9sbHMtbWV0aG9kcy9oYW5kbGUtY3JlYXRlLXBvbGwuc2VydmljZSc7XG5pbXBvcnQgeyBIYW5kbGVWb3RlUG9sbCB9IGZyb20gJy4uLy4uL21ldGhvZHMvcG9sbHMtbWV0aG9kcy9oYW5kbGUtdm90ZS1wb2xsLnNlcnZpY2UnO1xuaW1wb3J0IHsgSGFuZGxlRW5kUG9sbCB9IGZyb20gJy4uLy4uL21ldGhvZHMvcG9sbHMtbWV0aG9kcy9oYW5kbGUtZW5kLXBvbGwuc2VydmljZSc7XG5cbmltcG9ydCB7IEJyZWFrb3V0Um9vbVVwZGF0ZWQgfSBmcm9tICcuLi8uLi9tZXRob2RzL2JyZWFrb3V0LXJvb20tbWV0aG9kcy9icmVha291dC1yb29tLXVwZGF0ZWQuc2VydmljZSc7XG5cbmltcG9ydCB7IFN0YXJ0TWVldGluZ1Byb2dyZXNzVGltZXIgfSBmcm9tICcuLi8uLi9tZXRob2RzL3V0aWxzL21lZXRpbmctdGltZXIvc3RhcnQtbWVldGluZy1wcm9ncmVzcy10aW1lci5zZXJ2aWNlJztcbmltcG9ydCB7IFVwZGF0ZVJlY29yZGluZyB9IGZyb20gJy4uLy4uL21ldGhvZHMvcmVjb3JkaW5nLW1ldGhvZHMvdXBkYXRlLXJlY29yZGluZy5zZXJ2aWNlJztcbmltcG9ydCB7IFN0b3BSZWNvcmRpbmcgfSBmcm9tICcuLi8uLi9tZXRob2RzL3JlY29yZGluZy1tZXRob2RzL3N0b3AtcmVjb3JkaW5nLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBVc2VyV2FpdGluZyB9IGZyb20gJy4uLy4uL3Byb2R1Y2Vycy9zb2NrZXQtcmVjZWl2ZS1tZXRob2RzL3VzZXItd2FpdGluZy5zZXJ2aWNlJztcbmltcG9ydCB7IFBlcnNvbkpvaW5lZCB9IGZyb20gJy4uLy4uL3Byb2R1Y2Vycy9zb2NrZXQtcmVjZWl2ZS1tZXRob2RzL3BlcnNvbi1qb2luZWQuc2VydmljZSc7XG5pbXBvcnQgeyBBbGxXYWl0aW5nUm9vbU1lbWJlcnMgfSBmcm9tICcuLi8uLi9wcm9kdWNlcnMvc29ja2V0LXJlY2VpdmUtbWV0aG9kcy9hbGwtd2FpdGluZy1yb29tLW1lbWJlcnMuc2VydmljZSc7XG5pbXBvcnQgeyBSb29tUmVjb3JkUGFyYW1zIH0gZnJvbSAnLi4vLi4vcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvcm9vbS1yZWNvcmQtcGFyYW1zLnNlcnZpY2UnO1xuaW1wb3J0IHsgQmFuUGFydGljaXBhbnQgfSBmcm9tICcuLi8uLi9wcm9kdWNlcnMvc29ja2V0LXJlY2VpdmUtbWV0aG9kcy9iYW4tcGFydGljaXBhbnQuc2VydmljZSc7XG5pbXBvcnQgeyBVcGRhdGVkQ29Ib3N0IH0gZnJvbSAnLi4vLi4vcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvdXBkYXRlZC1jby1ob3N0LnNlcnZpY2UnO1xuaW1wb3J0IHsgUGFydGljaXBhbnRSZXF1ZXN0ZWQgfSBmcm9tICcuLi8uLi9wcm9kdWNlcnMvc29ja2V0LXJlY2VpdmUtbWV0aG9kcy9wYXJ0aWNpcGFudC1yZXF1ZXN0ZWQuc2VydmljZSc7XG5pbXBvcnQgeyBTY3JlZW5Qcm9kdWNlcklkIH0gZnJvbSAnLi4vLi4vcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvc2NyZWVuLXByb2R1Y2VyLWlkLnNlcnZpY2UnO1xuaW1wb3J0IHsgVXBkYXRlTWVkaWFTZXR0aW5ncyB9IGZyb20gJy4uLy4uL3Byb2R1Y2Vycy9zb2NrZXQtcmVjZWl2ZS1tZXRob2RzL3VwZGF0ZS1tZWRpYS1zZXR0aW5ncy5zZXJ2aWNlJztcbmltcG9ydCB7IFByb2R1Y2VyTWVkaWFQYXVzZWQgfSBmcm9tICcuLi8uLi9wcm9kdWNlcnMvc29ja2V0LXJlY2VpdmUtbWV0aG9kcy9wcm9kdWNlci1tZWRpYS1wYXVzZWQuc2VydmljZSc7XG5pbXBvcnQgeyBQcm9kdWNlck1lZGlhUmVzdW1lZCB9IGZyb20gJy4uLy4uL3Byb2R1Y2Vycy9zb2NrZXQtcmVjZWl2ZS1tZXRob2RzL3Byb2R1Y2VyLW1lZGlhLXJlc3VtZWQuc2VydmljZSc7XG5pbXBvcnQgeyBQcm9kdWNlck1lZGlhQ2xvc2VkIH0gZnJvbSAnLi4vLi4vcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvcHJvZHVjZXItbWVkaWEtY2xvc2VkLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29udHJvbE1lZGlhSG9zdCB9IGZyb20gJy4uLy4uL3Byb2R1Y2Vycy9zb2NrZXQtcmVjZWl2ZS1tZXRob2RzL2NvbnRyb2wtbWVkaWEtaG9zdC5zZXJ2aWNlJztcbmltcG9ydCB7IE1lZXRpbmdFbmRlZCB9IGZyb20gJy4uLy4uL3Byb2R1Y2Vycy9zb2NrZXQtcmVjZWl2ZS1tZXRob2RzL21lZXRpbmctZW5kZWQuc2VydmljZSc7XG5pbXBvcnQgeyBEaXNjb25uZWN0VXNlclNlbGYgfSBmcm9tICcuLi8uLi9wcm9kdWNlcnMvc29ja2V0LXJlY2VpdmUtbWV0aG9kcy9kaXNjb25uZWN0LXVzZXItc2VsZi5zZXJ2aWNlJztcbmltcG9ydCB7IFJlY2VpdmVNZXNzYWdlIH0gZnJvbSAnLi4vLi4vcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvcmVjZWl2ZS1tZXNzYWdlLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWVldGluZ1RpbWVSZW1haW5pbmcgfSBmcm9tICcuLi8uLi9wcm9kdWNlcnMvc29ja2V0LXJlY2VpdmUtbWV0aG9kcy9tZWV0aW5nLXRpbWUtcmVtYWluaW5nLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWVldGluZ1N0aWxsVGhlcmUgfSBmcm9tICcuLi8uLi9wcm9kdWNlcnMvc29ja2V0LXJlY2VpdmUtbWV0aG9kcy9tZWV0aW5nLXN0aWxsLXRoZXJlLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3RhcnRSZWNvcmRzIH0gZnJvbSAnLi4vLi4vcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvc3RhcnQtcmVjb3Jkcy5zZXJ2aWNlJztcbmltcG9ydCB7IFJlSW5pdGlhdGVSZWNvcmRpbmcgfSBmcm9tICcuLi8uLi9wcm9kdWNlcnMvc29ja2V0LXJlY2VpdmUtbWV0aG9kcy9yZS1pbml0aWF0ZS1yZWNvcmRpbmcuc2VydmljZSc7XG5pbXBvcnQgeyBHZXREb21haW5zIH0gZnJvbSAnLi4vLi4vcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvZ2V0LWRvbWFpbnMuc2VydmljZSc7XG5pbXBvcnQgeyBVcGRhdGVDb25zdW1pbmdEb21haW5zIH0gZnJvbSAnLi4vLi4vcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvdXBkYXRlLWNvbnN1bWluZy1kb21haW5zLnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVjb3JkaW5nTm90aWNlIH0gZnJvbSAnLi4vLi4vcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvcmVjb3JkaW5nLW5vdGljZS5zZXJ2aWNlJztcbmltcG9ydCB7IFRpbWVMZWZ0UmVjb3JkaW5nIH0gZnJvbSAnLi4vLi4vcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvdGltZS1sZWZ0LXJlY29yZGluZy5zZXJ2aWNlJztcbmltcG9ydCB7IFN0b3BwZWRSZWNvcmRpbmcgfSBmcm9tICcuLi8uLi9wcm9kdWNlcnMvc29ja2V0LXJlY2VpdmUtbWV0aG9kcy9zdG9wcGVkLXJlY29yZGluZy5zZXJ2aWNlJztcbmltcG9ydCB7IEhvc3RSZXF1ZXN0UmVzcG9uc2UgfSBmcm9tICcuLi8uLi9wcm9kdWNlcnMvc29ja2V0LXJlY2VpdmUtbWV0aG9kcy9ob3N0LXJlcXVlc3QtcmVzcG9uc2Uuc2VydmljZSc7XG5pbXBvcnQgeyBBbGxNZW1iZXJzIH0gZnJvbSAnLi4vLi4vcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvYWxsLW1lbWJlcnMuc2VydmljZSc7XG5pbXBvcnQgeyBBbGxNZW1iZXJzUmVzdCB9IGZyb20gJy4uLy4uL3Byb2R1Y2Vycy9zb2NrZXQtcmVjZWl2ZS1tZXRob2RzL2FsbC1tZW1iZXJzLXJlc3Quc2VydmljZSc7XG5pbXBvcnQgeyBEaXNjb25uZWN0IH0gZnJvbSAnLi4vLi4vcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvZGlzY29ubmVjdC5zZXJ2aWNlJztcblxuaW1wb3J0IHsgQ2FwdHVyZUNhbnZhc1N0cmVhbSB9IGZyb20gJy4uLy4uL21ldGhvZHMvd2hpdGVib2FyZC1tZXRob2RzL2NhcHR1cmUtY2FudmFzLXN0cmVhbS5zZXJ2aWNlJztcbmltcG9ydCB7IFJlc3VtZVBhdXNlQXVkaW9TdHJlYW1zIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL3Jlc3VtZS1wYXVzZS1hdWRpby1zdHJlYW1zLnNlcnZpY2UnO1xuaW1wb3J0IHsgUHJvY2Vzc0NvbnN1bWVyVHJhbnNwb3J0c0F1ZGlvIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL3Byb2Nlc3MtY29uc3VtZXItdHJhbnNwb3J0cy1hdWRpby5zZXJ2aWNlJztcblxuaW1wb3J0IHtcbiAgRGV2aWNlLFxuICBQcm9kdWNlcixcbiAgUHJvZHVjZXJPcHRpb25zLFxuICBSdHBDYXBhYmlsaXRpZXMsXG4gIFRyYW5zcG9ydCxcbn0gZnJvbSAnbWVkaWFzb3VwLWNsaWVudC9saWIvdHlwZXMnO1xuaW1wb3J0IHsgU2VsZmllU2VnbWVudGF0aW9uIH0gZnJvbSAnQG1lZGlhcGlwZS9zZWxmaWVfc2VnbWVudGF0aW9uJztcblxuZXhwb3J0IHR5cGUgTWVkaWFzZnVDb25mZXJlbmNlT3B0aW9ucyA9IHtcbiAgUHJlam9pblBhZ2U/OiAob3B0aW9uczogUHJlSm9pblBhZ2VPcHRpb25zIHwgV2VsY29tZVBhZ2VPcHRpb25zKSA9PiBIVE1MRWxlbWVudDtcbiAgY3JlZGVudGlhbHM/OiB7IGFwaVVzZXJOYW1lOiBzdHJpbmc7IGFwaUtleTogc3RyaW5nIH07XG4gIHVzZUxvY2FsVUlNb2RlPzogYm9vbGVhbjtcbiAgc2VlZERhdGE/OiBTZWVkRGF0YTtcbiAgdXNlU2VlZD86IGJvb2xlYW47XG4gIGltZ1NyYz86IHN0cmluZztcbn07XG5cbi8qKlxuICogTWVkaWFzZnVDb25mZXJlbmNlIGNvbXBvbmVudCBjcmVhdGVzIGFuIGludGVyYWN0aXZlIGNvbmZlcmVuY2UgaW50ZXJmYWNlLCBzdXBwb3J0aW5nIGJyZWFrb3V0IHJvb21zLCBjaGF0LCB2aWRlbyBhbmQgYXVkaW8gbWFuYWdlbWVudCwgYW5kIGN1c3RvbSBjb250cm9scy5cbiAqXG4gKiBAY29tcG9uZW50XG4gKiBAc2VsZWN0b3IgYXBwLW1lZGlhc2Z1LWNvbmZlcmVuY2VcbiAqIEBzdGFuZGFsb25lIHRydWVcbiAqIEBpbXBvcnRzIFtSb3V0ZXJPdXRsZXQsIENvbW1vbk1vZHVsZSwgQnJlYWtvdXRSb29tc01vZGFsLCBCYWNrZ3JvdW5kTW9kYWwsIENvSG9zdE1vZGFsLCBBbGVydENvbXBvbmVudCwgQXVkaW9HcmlkLCBDb250cm9sQnV0dG9uc0FsdENvbXBvbmVudCwgQ29udHJvbEJ1dHRvbnNDb21wb25lbnQsIEZsZXhpYmxlR3JpZCwgRmxleGlibGVWaWRlbywgTG9hZGluZ01vZGFsLCBQYWdpbmF0aW9uLCBTdWJBc3BlY3RDb21wb25lbnQsIERpc3BsYXlTZXR0aW5nc01vZGFsLCBFdmVudFNldHRpbmdzTW9kYWwsIENvbmZpcm1FeGl0TW9kYWwsIE1lZGlhU2V0dGluZ3NNb2RhbCwgTWVudU1vZGFsLCBNZXNzYWdlc01vZGFsLCBDb25maXJtSGVyZU1vZGFsLCBTaGFyZUV2ZW50TW9kYWwsIFdlbGNvbWVQYWdlLCBQYXJ0aWNpcGFudHNNb2RhbCwgUG9sbE1vZGFsLCBSZWNvcmRpbmdNb2RhbCwgUmVxdWVzdHNNb2RhbCwgTWFpbkFzcGVjdENvbXBvbmVudCwgTWFpbkNvbnRhaW5lckNvbXBvbmVudCwgTWFpbkdyaWRDb21wb25lbnQsIE1haW5TY3JlZW5Db21wb25lbnQsIE90aGVyR3JpZENvbXBvbmVudCwgU2NyZWVuYm9hcmQsIFNjcmVlbmJvYXJkTW9kYWwsIFdoaXRlYm9hcmQsIENvbmZpZ3VyZVdoaXRlYm9hcmRNb2RhbCwgV2FpdGluZ1Jvb21Nb2RhbCwgTWVudVdpZGdldCwgTWVzc2FnZVdpZGdldCwgTWVudVJlY29yZFdpZGdldCwgUmVjb3JkVGltZXJXaWRnZXQsIE1lbnVQYXJ0aWNpcGFudHNXaWRnZXQsIFNjcmVlblNoYXJlV2lkZ2V0XVxuICpcbiAqIEB0ZW1wbGF0ZVxuICogVGhlIHRlbXBsYXRlIGluY2x1ZGVzOlxuICogLSBDb25kaXRpb25hbCByZW5kZXJpbmcgZm9yIFByZWpvaW5QYWdlIG9yIFdlbGNvbWVQYWdlIGNvbXBvbmVudC5cbiAqIC0gQSBtYWluIGNvbnRlbnQgYXJlYSB3aXRoIG1vZHVsYXIgY29tcG9uZW50cyBmb3IgZ3JpZCBsYXlvdXRzLCB2aWRlbyBzdHJlYW1pbmcsIGFuZCBzdWItYXNwZWN0IGNvbnRyb2xzLlxuICogLSBNb2RhbHMgZm9yIHBhcnRpY2lwYW50cywgc2V0dGluZ3MsIHJlY29yZGluZywgYnJlYWtvdXQgcm9vbXMsIGFuZCBtb3JlLCB0byBlbmhhbmNlIGludGVyYWN0aXZpdHkgYW5kIGN1c3RvbWl6YXRpb24gaW4gY29uZmVyZW5jZSBzZXR0aW5ncy5cbiAqXG4gKiBAaW5wdXQge2FueX0gUHJlam9pblBhZ2UgLSBDb21wb25lbnQgZm9yIHRoZSBwcmVqb2luIHBhZ2UgKGRlZmF1bHRzIHRvIFdlbGNvbWVQYWdlKS5cbiAqIEBpbnB1dCB7eyBhcGlVc2VyTmFtZTogc3RyaW5nOyBhcGlLZXk6IHN0cmluZyB9fSBjcmVkZW50aWFscyAtIEFQSSBjcmVkZW50aWFscyBmb3IgTWVkaWFTRlUuXG4gKiBAaW5wdXQge2Jvb2xlYW59IHVzZUxvY2FsVUlNb2RlIC0gVG9nZ2xlcyBsb2NhbCBVSSBtb2RlLlxuICogQGlucHV0IHtTZWVkRGF0YX0gc2VlZERhdGEgLSBPcHRpb25hbCBzZWVkIGRhdGEgZm9yIGluaXRpYWxpemluZyBjb21wb25lbnRzLlxuICogQGlucHV0IHtib29sZWFufSB1c2VTZWVkIC0gRW5hYmxlcyB1c2Ugb2Ygc2VlZCBkYXRhLlxuICogQGlucHV0IHtzdHJpbmd9IGltZ1NyYyAtIEltYWdlIHNvdXJjZSBmb3IgYnJhbmRpbmcgb3IgbG9nb3MuXG4gKlxuICogQHByb3BlcnR5IHtzdHJpbmd9IHRpdGxlIC0gVGhlIHRpdGxlIG9mIHRoZSBjb21wb25lbnQsIGRlZmF1bHRzIHRvIFwiTWVkaWFTRlUtQ29uZmVyZW5jZVwiLlxuICpcbiAqIEBzdHlsZXNcbiAqIEN1c3RvbWl6YWJsZSBzdHlsZXMgZm9yIGNvbXBvbmVudCBsYXlvdXQsIG92ZXJmbG93LCBhbmQgc3BlY2lmaWMgbW9kYWwgYXBwZWFyYW5jZXMuXG4gKlxuICogQHByb3ZpZGVycyBbQ29va2llU2VydmljZV0gLSBTZXJ2aWNlIGZvciBtYW5hZ2luZyBjb29raWVzIHdpdGhpbiB0aGUgY29tcG9uZW50LlxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICogQGNsYXNzIE1lZGlhc2Z1Q29uZmVyZW5jZVxuICogQGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3lcbiAqXG4gKiBAbWV0aG9kIG5nT25Jbml0IC0gSW5pdGlhbGl6ZXMgY29uZmlndXJhdGlvbnMgYW5kIGlucHV0IHBhcmFtZXRlcnMuXG4gKiBAbWV0aG9kIG5nT25EZXN0cm95IC0gSGFuZGxlcyBjbGVhbnVwIG9mIGV2ZW50IGxpc3RlbmVycyBvciBpbnRlcnZhbHMuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYGh0bWxcbiAqIDxhcHAtbWVkaWFzZnUtY29uZmVyZW5jZVxuICogICBbUHJlam9pblBhZ2VdPVwiQ3VzdG9tUHJlam9pbkNvbXBvbmVudFwiXG4gKiAgIFtjcmVkZW50aWFsc109XCJ7IGFwaVVzZXJOYW1lOiAndXNlcm5hbWUnLCBhcGlLZXk6ICdhcGlrZXknIH1cIlxuICogICBbdXNlTG9jYWxVSU1vZGVdPVwidHJ1ZVwiXG4gKiAgIFtzZWVkRGF0YV09XCJzZWVkRGF0YU9iamVjdFwiXG4gKiAgIFt1c2VTZWVkXT1cInRydWVcIlxuICogICBpbWdTcmM9XCJodHRwczovL2V4YW1wbGUuY29tL2xvZ28ucG5nXCI+XG4gKiA8L2FwcC1tZWRpYXNmdS1jb25mZXJlbmNlPlxuICogYGBgXG4gKi9cblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtbWVkaWFzZnUtY29uZmVyZW5jZScsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtcbiAgICBSb3V0ZXJPdXRsZXQsXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEJyZWFrb3V0Um9vbXNNb2RhbCxcbiAgICBCYWNrZ3JvdW5kTW9kYWwsXG4gICAgQ29Ib3N0TW9kYWwsXG4gICAgQWxlcnRDb21wb25lbnQsXG4gICAgQXVkaW9HcmlkLFxuICAgIENvbnRyb2xCdXR0b25zQWx0Q29tcG9uZW50LFxuICAgIENvbnRyb2xCdXR0b25zQ29tcG9uZW50LFxuICAgIEZsZXhpYmxlR3JpZCxcbiAgICBGbGV4aWJsZVZpZGVvLFxuICAgIExvYWRpbmdNb2RhbCxcbiAgICBQYWdpbmF0aW9uLFxuICAgIFN1YkFzcGVjdENvbXBvbmVudCxcbiAgICBEaXNwbGF5U2V0dGluZ3NNb2RhbCxcbiAgICBFdmVudFNldHRpbmdzTW9kYWwsXG4gICAgQ29uZmlybUV4aXRNb2RhbCxcbiAgICBNZWRpYVNldHRpbmdzTW9kYWwsXG4gICAgTWVudU1vZGFsLFxuICAgIE1lc3NhZ2VzTW9kYWwsXG4gICAgQ29uZmlybUhlcmVNb2RhbCxcbiAgICBTaGFyZUV2ZW50TW9kYWwsXG4gICAgV2VsY29tZVBhZ2UsXG4gICAgUGFydGljaXBhbnRzTW9kYWwsXG4gICAgUG9sbE1vZGFsLFxuICAgIFJlY29yZGluZ01vZGFsLFxuICAgIFJlcXVlc3RzTW9kYWwsXG4gICAgTWFpbkFzcGVjdENvbXBvbmVudCxcbiAgICBNYWluQ29udGFpbmVyQ29tcG9uZW50LFxuICAgIE1haW5HcmlkQ29tcG9uZW50LFxuICAgIE1haW5TY3JlZW5Db21wb25lbnQsXG4gICAgT3RoZXJHcmlkQ29tcG9uZW50LFxuICAgIFNjcmVlbmJvYXJkLFxuICAgIFNjcmVlbmJvYXJkTW9kYWwsXG4gICAgV2hpdGVib2FyZCxcbiAgICBDb25maWd1cmVXaGl0ZWJvYXJkTW9kYWwsXG4gICAgV2FpdGluZ1Jvb21Nb2RhbCxcbiAgICBNZW51V2lkZ2V0LFxuICAgIE1lc3NhZ2VXaWRnZXQsXG4gICAgTWVudVJlY29yZFdpZGdldCxcbiAgICBSZWNvcmRUaW1lcldpZGdldCxcbiAgICBNZW51UGFydGljaXBhbnRzV2lkZ2V0LFxuICAgIFNjcmVlblNoYXJlV2lkZ2V0LFxuICBdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXZcbiAgICAgIGNsYXNzPVwiTWVkaWFTRlVcIlxuICAgICAgW25nU3R5bGVdPVwie1xuICAgICAgICBoZWlnaHQ6ICcxMDB2aCcsXG4gICAgICAgIHdpZHRoOiAnMTAwdncnLFxuICAgICAgICBtYXhXaWR0aDogJzEwMHZ3JyxcbiAgICAgICAgbWF4SGVpZ2h0OiAnMTAwdmgnLFxuICAgICAgICBvdmVyZmxvdzogJ2hpZGRlbidcbiAgICAgIH1cIlxuICAgID5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhdmFsaWRhdGVkLnZhbHVlOyBlbHNlIG1haW5Db250ZW50XCI+XG4gICAgICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgICAqbmdDb21wb25lbnRPdXRsZXQ9XCJcbiAgICAgICAgICAgIFByZWpvaW5QYWdlQ29tcG9uZW50LmNvbXBvbmVudDtcbiAgICAgICAgICAgIGluamVjdG9yOiBQcmVqb2luUGFnZUNvbXBvbmVudC5pbmplY3RvclxuICAgICAgICAgIFwiXG4gICAgICAgID5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgPG5nLXRlbXBsYXRlICNtYWluQ29udGVudD5cbiAgICAgICAgPGFwcC1tYWluLWNvbnRhaW5lci1jb21wb25lbnQ+XG4gICAgICAgICAgPGFwcC1tYWluLWFzcGVjdC1jb21wb25lbnRcbiAgICAgICAgICAgIFtiYWNrZ3JvdW5kQ29sb3JdPVwiJ3JnYmEoMjE3LCAyMjcsIDIzNCwgMC45OSknXCJcbiAgICAgICAgICAgIFtkZWZhdWx0RnJhY3Rpb25dPVwiMSAtIGNvbnRyb2xIZWlnaHQudmFsdWVcIlxuICAgICAgICAgICAgW3Nob3dDb250cm9sc109XCJldmVudFR5cGUudmFsdWUgPT09ICd3ZWJpbmFyJyB8fCBldmVudFR5cGUudmFsdWUgPT09ICdjb25mZXJlbmNlJ1wiXG4gICAgICAgICAgICBbdXBkYXRlSXNXaWRlU2NyZWVuXT1cInVwZGF0ZUlzV2lkZVNjcmVlblwiXG4gICAgICAgICAgICBbdXBkYXRlSXNNZWRpdW1TY3JlZW5dPVwidXBkYXRlSXNNZWRpdW1TY3JlZW5cIlxuICAgICAgICAgICAgW3VwZGF0ZUlzU21hbGxTY3JlZW5dPVwidXBkYXRlSXNTbWFsbFNjcmVlblwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGFwcC1tYWluLXNjcmVlbi1jb21wb25lbnRcbiAgICAgICAgICAgICAgW2RvU3RhY2tdPVwidHJ1ZVwiXG4gICAgICAgICAgICAgIFttYWluU2l6ZV09XCJtYWluSGVpZ2h0V2lkdGgudmFsdWVcIlxuICAgICAgICAgICAgICBbZGVmYXVsdEZyYWN0aW9uXT1cIjEgLSBjb250cm9sSGVpZ2h0LnZhbHVlXCJcbiAgICAgICAgICAgICAgW3Nob3dDb250cm9sc109XCJldmVudFR5cGUudmFsdWUgPT09ICd3ZWJpbmFyJyB8fCBldmVudFR5cGUudmFsdWUgPT09ICdjb25mZXJlbmNlJ1wiXG4gICAgICAgICAgICAgIFt1cGRhdGVDb21wb25lbnRTaXplc109XCJ1cGRhdGVDb21wb25lbnRTaXplc1wiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxhcHAtbWFpbi1ncmlkLWNvbXBvbmVudFxuICAgICAgICAgICAgICAgIFtoZWlnaHRdPVwiY29tcG9uZW50U2l6ZXMudmFsdWUubWFpbkhlaWdodFwiXG4gICAgICAgICAgICAgICAgW3dpZHRoXT1cImNvbXBvbmVudFNpemVzLnZhbHVlLm1haW5XaWR0aFwiXG4gICAgICAgICAgICAgICAgW2JhY2tncm91bmRDb2xvcl09XCIncmdiYSgyMTcsIDIyNywgMjM0LCAwLjk5KSdcIlxuICAgICAgICAgICAgICAgIFttYWluU2l6ZV09XCJtYWluSGVpZ2h0V2lkdGgudmFsdWVcIlxuICAgICAgICAgICAgICAgIFtzaG93QXNwZWN0XT1cIm1haW5IZWlnaHRXaWR0aC52YWx1ZSA+IDBcIlxuICAgICAgICAgICAgICAgIFt0aW1lQmFja2dyb3VuZENvbG9yXT1cInJlY29yZFN0YXRlLnZhbHVlXCJcbiAgICAgICAgICAgICAgICBbbWVldGluZ1Byb2dyZXNzVGltZV09XCJtZWV0aW5nUHJvZ3Jlc3NUaW1lLnZhbHVlXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxhcHAtZmxleGlibGUtdmlkZW9cbiAgICAgICAgICAgICAgICAgIFtjdXN0b21XaWR0aF09XCJjb21wb25lbnRTaXplcy52YWx1ZS5tYWluV2lkdGhcIlxuICAgICAgICAgICAgICAgICAgW2N1c3RvbUhlaWdodF09XCJjb21wb25lbnRTaXplcy52YWx1ZS5tYWluSGVpZ2h0XCJcbiAgICAgICAgICAgICAgICAgIFtyb3dzXT1cIjFcIlxuICAgICAgICAgICAgICAgICAgW2NvbHVtbnNdPVwiMVwiXG4gICAgICAgICAgICAgICAgICBbY29tcG9uZW50c1RvUmVuZGVyXT1cIm1haW5HcmlkU3RyZWFtLnZhbHVlXCJcbiAgICAgICAgICAgICAgICAgIFtzaG93QXNwZWN0XT1cIlxuICAgICAgICAgICAgICAgICAgICBtYWluR3JpZFN0cmVhbS52YWx1ZS5sZW5ndGggPiAwICYmXG4gICAgICAgICAgICAgICAgICAgICEod2hpdGVib2FyZFN0YXJ0ZWQudmFsdWUgJiYgIXdoaXRlYm9hcmRFbmRlZC52YWx1ZSlcbiAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICBbbG9jYWxTdHJlYW1TY3JlZW5dPVwibG9jYWxTdHJlYW1TY3JlZW4udmFsdWUhXCJcbiAgICAgICAgICAgICAgICAgIFthbm5vdGF0ZVNjcmVlblN0cmVhbV09XCJhbm5vdGF0ZVNjcmVlblN0cmVhbS52YWx1ZVwiXG4gICAgICAgICAgICAgICAgICBbU2NyZWVuYm9hcmRdPVwic2hhcmVkLnZhbHVlID8gU2NyZWVuYm9hcmRXaWRnZXQgOiB1bmRlZmluZWRcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8L2FwcC1mbGV4aWJsZS12aWRlbz5cbiAgICAgICAgICAgICAgICA8YXBwLXdoaXRlYm9hcmRcbiAgICAgICAgICAgICAgICAgIFtjdXN0b21XaWR0aF09XCJjb21wb25lbnRTaXplcy52YWx1ZS5tYWluV2lkdGhcIlxuICAgICAgICAgICAgICAgICAgW2N1c3RvbUhlaWdodF09XCJjb21wb25lbnRTaXplcy52YWx1ZS5tYWluSGVpZ2h0XCJcbiAgICAgICAgICAgICAgICAgIFtwYXJhbWV0ZXJzXT1cIm1lZGlhU0ZVUGFyYW1ldGVyc1wiXG4gICAgICAgICAgICAgICAgICBbc2hvd0FzcGVjdF09XCJ3aGl0ZWJvYXJkU3RhcnRlZC52YWx1ZSAmJiAhd2hpdGVib2FyZEVuZGVkLnZhbHVlXCJcbiAgICAgICAgICAgICAgICA+PC9hcHAtd2hpdGVib2FyZD5cbiAgICAgICAgICAgICAgPC9hcHAtbWFpbi1ncmlkLWNvbXBvbmVudD5cblxuICAgICAgICAgICAgICA8YXBwLW90aGVyLWdyaWQtY29tcG9uZW50XG4gICAgICAgICAgICAgICAgW2hlaWdodF09XCJjb21wb25lbnRTaXplcy52YWx1ZS5vdGhlckhlaWdodFwiXG4gICAgICAgICAgICAgICAgW3dpZHRoXT1cImNvbXBvbmVudFNpemVzLnZhbHVlLm90aGVyV2lkdGhcIlxuICAgICAgICAgICAgICAgIFtiYWNrZ3JvdW5kQ29sb3JdPVwiJ3JnYmEoMjE3LCAyMjcsIDIzNCwgMC45OSknXCJcbiAgICAgICAgICAgICAgICBbc2hvd0FzcGVjdF09XCJtYWluSGVpZ2h0V2lkdGgudmFsdWUgIT09IDEwMFwiXG4gICAgICAgICAgICAgICAgW3RpbWVCYWNrZ3JvdW5kQ29sb3JdPVwicmVjb3JkU3RhdGUudmFsdWVcIlxuICAgICAgICAgICAgICAgIFtzaG93VGltZXJdPVwibWFpbkhlaWdodFdpZHRoLnZhbHVlID09PSAwXCJcbiAgICAgICAgICAgICAgICBbbWVldGluZ1Byb2dyZXNzVGltZV09XCJtZWV0aW5nUHJvZ3Jlc3NUaW1lLnZhbHVlXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICpuZ0lmPVwiZG9QYWdpbmF0ZS52YWx1ZVwiXG4gICAgICAgICAgICAgICAgICBbbmdTdHlsZV09XCJ7XG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOlxuICAgICAgICAgICAgICAgICAgICAgIHBhZ2luYXRpb25EaXJlY3Rpb24udmFsdWUgPT0gJ2hvcml6b250YWwnXG4gICAgICAgICAgICAgICAgICAgICAgICA/IGNvbXBvbmVudFNpemVzLnZhbHVlLm90aGVyV2lkdGhcbiAgICAgICAgICAgICAgICAgICAgICAgIDogcGFnaW5hdGlvbkhlaWdodFdpZHRoLnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6XG4gICAgICAgICAgICAgICAgICAgICAgcGFnaW5hdGlvbkRpcmVjdGlvbi52YWx1ZSA9PSAnaG9yaXpvbnRhbCdcbiAgICAgICAgICAgICAgICAgICAgICAgID8gcGFnaW5hdGlvbkhlaWdodFdpZHRoLnZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICA6IGNvbXBvbmVudFNpemVzLnZhbHVlLm90aGVySGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBkb1BhZ2luYXRlLnZhbHVlID8gJ2ZsZXgnIDogJ25vbmUnLFxuICAgICAgICAgICAgICAgICAgICAnZmxleC1kaXJlY3Rpb24nOiBwYWdpbmF0aW9uRGlyZWN0aW9uLnZhbHVlID09ICdob3Jpem9udGFsJyA/ICdyb3cnIDogJ2NvbHVtbicsXG4gICAgICAgICAgICAgICAgICAgICdqdXN0aWZ5LWNvbnRlbnQnOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgJ2FsaWduLWl0ZW1zJzogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6ICcwJyxcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luOiAnMCdcbiAgICAgICAgICAgICAgICAgIH1cIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxhcHAtcGFnaW5hdGlvblxuICAgICAgICAgICAgICAgICAgICBbdG90YWxQYWdlc109XCJudW1iZXJQYWdlcy52YWx1ZVwiXG4gICAgICAgICAgICAgICAgICAgIFtjdXJyZW50VXNlclBhZ2VdPVwiY3VycmVudFVzZXJQYWdlLnZhbHVlXCJcbiAgICAgICAgICAgICAgICAgICAgW3Nob3dBc3BlY3RdPVwiZG9QYWdpbmF0ZS52YWx1ZVwiXG4gICAgICAgICAgICAgICAgICAgIFtwYWdpbmF0aW9uSGVpZ2h0XT1cInBhZ2luYXRpb25IZWlnaHRXaWR0aC52YWx1ZVwiXG4gICAgICAgICAgICAgICAgICAgIFtkaXJlY3Rpb25dPVwicGFnaW5hdGlvbkRpcmVjdGlvbi52YWx1ZVwiXG4gICAgICAgICAgICAgICAgICAgIFtwYXJhbWV0ZXJzXT1cIm1lZGlhU0ZVUGFyYW1ldGVyc1wiXG4gICAgICAgICAgICAgICAgICA+PC9hcHAtcGFnaW5hdGlvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxhcHAtYXVkaW8tZ3JpZCBbY29tcG9uZW50c1RvUmVuZGVyXT1cImF1ZGlvT25seVN0cmVhbXMudmFsdWVcIj48L2FwcC1hdWRpby1ncmlkPlxuXG4gICAgICAgICAgICAgICAgPGFwcC1mbGV4aWJsZS1ncmlkXG4gICAgICAgICAgICAgICAgICBbY3VzdG9tV2lkdGhdPVwiZ3JpZFNpemVzLnZhbHVlLmdyaWRXaWR0aCFcIlxuICAgICAgICAgICAgICAgICAgW2N1c3RvbUhlaWdodF09XCJncmlkU2l6ZXMudmFsdWUuZ3JpZEhlaWdodCFcIlxuICAgICAgICAgICAgICAgICAgW3Jvd3NdPVwiZ3JpZFJvd3MudmFsdWVcIlxuICAgICAgICAgICAgICAgICAgW2NvbHVtbnNdPVwiZ3JpZENvbHMudmFsdWVcIlxuICAgICAgICAgICAgICAgICAgW2NvbXBvbmVudHNUb1JlbmRlcl09XCJvdGhlckdyaWRTdHJlYW1zLnZhbHVlWzBdXCJcbiAgICAgICAgICAgICAgICAgIFtiYWNrZ3JvdW5kQ29sb3JdPVwiJ3JnYmEoMjE3LCAyMjcsIDIzNCwgMC45OSknXCJcbiAgICAgICAgICAgICAgICA+PC9hcHAtZmxleGlibGUtZ3JpZD5cbiAgICAgICAgICAgICAgICA8YXBwLWZsZXhpYmxlLWdyaWRcbiAgICAgICAgICAgICAgICAgIFtjdXN0b21XaWR0aF09XCJncmlkU2l6ZXMudmFsdWUuYWx0R3JpZFdpZHRoIVwiXG4gICAgICAgICAgICAgICAgICBbY3VzdG9tSGVpZ2h0XT1cImdyaWRTaXplcy52YWx1ZS5hbHRHcmlkSGVpZ2h0IVwiXG4gICAgICAgICAgICAgICAgICBbcm93c109XCJhbHRHcmlkUm93cy52YWx1ZVwiXG4gICAgICAgICAgICAgICAgICBbY29sdW1uc109XCJhbHRHcmlkQ29scy52YWx1ZVwiXG4gICAgICAgICAgICAgICAgICBbY29tcG9uZW50c1RvUmVuZGVyXT1cIm90aGVyR3JpZFN0cmVhbXMudmFsdWVbMV1cIlxuICAgICAgICAgICAgICAgICAgW2JhY2tncm91bmRDb2xvcl09XCIncmdiYSgyMTcsIDIyNywgMjM0LCAwLjk5KSdcIlxuICAgICAgICAgICAgICAgID48L2FwcC1mbGV4aWJsZS1ncmlkPlxuICAgICAgICAgICAgICA8L2FwcC1vdGhlci1ncmlkLWNvbXBvbmVudD5cbiAgICAgICAgICAgIDwvYXBwLW1haW4tc2NyZWVuLWNvbXBvbmVudD5cbiAgICAgICAgICA8L2FwcC1tYWluLWFzcGVjdC1jb21wb25lbnQ+XG5cbiAgICAgICAgICA8YXBwLXN1Yi1hc3BlY3QtY29tcG9uZW50XG4gICAgICAgICAgICBbYmFja2dyb3VuZENvbG9yXT1cIidyZ2JhKDIxNywgMjI3LCAyMzQsIDAuOTkpJ1wiXG4gICAgICAgICAgICBbc2hvd0NvbnRyb2xzXT1cImV2ZW50VHlwZS52YWx1ZSA9PT0gJ3dlYmluYXInIHx8IGV2ZW50VHlwZS52YWx1ZSA9PT0gJ2NvbmZlcmVuY2UnXCJcbiAgICAgICAgICAgIFtkZWZhdWx0RnJhY3Rpb25TdWJdPVwiY29udHJvbEhlaWdodC52YWx1ZVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGFwcC1jb250cm9sLWJ1dHRvbnMtY29tcG9uZW50XG4gICAgICAgICAgICAgIFtidXR0b25zXT1cImNvbnRyb2xCdXR0b25zXCJcbiAgICAgICAgICAgICAgW2J1dHRvbkNvbG9yXT1cIidibGFjaydcIlxuICAgICAgICAgICAgICBbYnV0dG9uQmFja2dyb3VuZENvbG9yXT1cIntcbiAgICAgICAgICAgICAgICBkZWZhdWx0OiAndHJhbnNwYXJlbnQnLFxuICAgICAgICAgICAgICAgIHByZXNzZWQ6ICd0cmFuc3BhcmVudCdcbiAgICAgICAgICAgICAgfVwiXG4gICAgICAgICAgICAgIFthbGlnbm1lbnRdPVwiJ3NwYWNlLWJldHdlZW4nXCJcbiAgICAgICAgICAgICAgW3ZlcnRpY2FsXT1cImZhbHNlXCJcbiAgICAgICAgICAgICAgW2J1dHRvbnNDb250YWluZXJTdHlsZV09XCJ7XG4gICAgICAgICAgICAgICAgbWFyZ2luVG9wOiAnMCcsXG4gICAgICAgICAgICAgICAgbWFyZ2luQm90dG9tOiAnMCcsXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAndHJhbnNwYXJlbnQnXG4gICAgICAgICAgICAgIH1cIlxuICAgICAgICAgICAgPjwvYXBwLWNvbnRyb2wtYnV0dG9ucy1jb21wb25lbnQ+XG4gICAgICAgICAgPC9hcHAtc3ViLWFzcGVjdC1jb21wb25lbnQ+XG4gICAgICAgIDwvYXBwLW1haW4tY29udGFpbmVyLWNvbXBvbmVudD5cbiAgICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICAgIDxhcHAtbWVudS1tb2RhbFxuICAgICAgICBbYmFja2dyb3VuZENvbG9yXT1cIidyZ2JhKDE4MSwgMjMzLCAyMjksIDAuOTcpJ1wiXG4gICAgICAgIFtpc1Zpc2libGVdPVwiaXNNZW51TW9kYWxWaXNpYmxlLnZhbHVlXCJcbiAgICAgICAgW29uQ2xvc2VdPVwib25DbG9zZU1lbnVNb2RhbFwiXG4gICAgICAgIFtjdXN0b21CdXR0b25zXT1cImN1c3RvbU1lbnVCdXR0b25zXCJcbiAgICAgICAgW3Jvb21OYW1lXT1cInJvb21OYW1lLnZhbHVlXCJcbiAgICAgICAgW2FkbWluUGFzc2NvZGVdPVwiYWRtaW5QYXNzY29kZS52YWx1ZVwiXG4gICAgICAgIFtpc2xldmVsXT1cImlzbGV2ZWwudmFsdWVcIlxuICAgICAgPjwvYXBwLW1lbnUtbW9kYWw+XG5cbiAgICAgIDxhcHAtZXZlbnQtc2V0dGluZ3MtbW9kYWxcbiAgICAgICAgW2JhY2tncm91bmRDb2xvcl09XCIncmdiYSgyMTcsIDIyNywgMjM0LCAwLjk5KSdcIlxuICAgICAgICBbaXNFdmVudFNldHRpbmdzTW9kYWxWaXNpYmxlXT1cImlzU2V0dGluZ3NNb2RhbFZpc2libGUudmFsdWVcIlxuICAgICAgICBbb25FdmVudFNldHRpbmdzQ2xvc2VdPVwib25FdmVudFNldHRpbmdzQ2xvc2VcIlxuICAgICAgICBbYXVkaW9TZXR0aW5nXT1cImF1ZGlvU2V0dGluZy52YWx1ZVwiXG4gICAgICAgIFt2aWRlb1NldHRpbmddPVwidmlkZW9TZXR0aW5nLnZhbHVlXCJcbiAgICAgICAgW3NjcmVlbnNoYXJlU2V0dGluZ109XCJzY3JlZW5zaGFyZVNldHRpbmcudmFsdWVcIlxuICAgICAgICBbY2hhdFNldHRpbmddPVwiY2hhdFNldHRpbmcudmFsdWVcIlxuICAgICAgICBbdXBkYXRlQXVkaW9TZXR0aW5nXT1cInVwZGF0ZUF1ZGlvU2V0dGluZ1wiXG4gICAgICAgIFt1cGRhdGVWaWRlb1NldHRpbmddPVwidXBkYXRlVmlkZW9TZXR0aW5nXCJcbiAgICAgICAgW3VwZGF0ZVNjcmVlbnNoYXJlU2V0dGluZ109XCJ1cGRhdGVTY3JlZW5zaGFyZVNldHRpbmdcIlxuICAgICAgICBbdXBkYXRlQ2hhdFNldHRpbmddPVwidXBkYXRlQ2hhdFNldHRpbmdcIlxuICAgICAgICBbdXBkYXRlSXNTZXR0aW5nc01vZGFsVmlzaWJsZV09XCJ1cGRhdGVJc1NldHRpbmdzTW9kYWxWaXNpYmxlXCJcbiAgICAgICAgW3Jvb21OYW1lXT1cInJvb21OYW1lLnZhbHVlXCJcbiAgICAgICAgW3NvY2tldF09XCJzb2NrZXQudmFsdWVcIlxuICAgICAgICBbc2hvd0FsZXJ0XT1cInNob3dBbGVydFwiXG4gICAgICA+PC9hcHAtZXZlbnQtc2V0dGluZ3MtbW9kYWw+XG5cbiAgICAgIDxhcHAtcmVxdWVzdHMtbW9kYWxcbiAgICAgICAgW2JhY2tncm91bmRDb2xvcl09XCIncmdiYSgyMTcsIDIyNywgMjM0LCAwLjk5KSdcIlxuICAgICAgICBbaXNSZXF1ZXN0c01vZGFsVmlzaWJsZV09XCJpc1JlcXVlc3RzTW9kYWxWaXNpYmxlLnZhbHVlXCJcbiAgICAgICAgW29uUmVxdWVzdENsb3NlXT1cIm9uUmVxdWVzdENsb3NlXCJcbiAgICAgICAgW3JlcXVlc3RDb3VudGVyXT1cInJlcXVlc3RDb3VudGVyLnZhbHVlXCJcbiAgICAgICAgW29uUmVxdWVzdEZpbHRlckNoYW5nZV09XCJvblJlcXVlc3RGaWx0ZXJDaGFuZ2VcIlxuICAgICAgICBbdXBkYXRlUmVxdWVzdExpc3RdPVwidXBkYXRlUmVxdWVzdExpc3RcIlxuICAgICAgICBbcmVxdWVzdExpc3RdPVwiZmlsdGVyZWRSZXF1ZXN0TGlzdC52YWx1ZVwiXG4gICAgICAgIFtyb29tTmFtZV09XCJyb29tTmFtZS52YWx1ZVwiXG4gICAgICAgIFtzb2NrZXRdPVwic29ja2V0LnZhbHVlXCJcbiAgICAgICAgW3BhcmFtZXRlcnNdPVwibWVkaWFTRlVQYXJhbWV0ZXJzXCJcbiAgICAgID48L2FwcC1yZXF1ZXN0cy1tb2RhbD5cblxuICAgICAgPGFwcC13YWl0aW5nLXJvb20tbW9kYWxcbiAgICAgICAgW2JhY2tncm91bmRDb2xvcl09XCIncmdiYSgyMTcsIDIyNywgMjM0LCAwLjk5KSdcIlxuICAgICAgICBbaXNXYWl0aW5nTW9kYWxWaXNpYmxlXT1cImlzV2FpdGluZ01vZGFsVmlzaWJsZS52YWx1ZVwiXG4gICAgICAgIFtvbldhaXRpbmdSb29tQ2xvc2VdPVwib25XYWl0aW5nUm9vbUNsb3NlXCJcbiAgICAgICAgW3dhaXRpbmdSb29tQ291bnRlcl09XCJ3YWl0aW5nUm9vbUNvdW50ZXIudmFsdWVcIlxuICAgICAgICBbb25XYWl0aW5nUm9vbUZpbHRlckNoYW5nZV09XCJvbldhaXRpbmdSb29tRmlsdGVyQ2hhbmdlXCJcbiAgICAgICAgW3dhaXRpbmdSb29tTGlzdF09XCJmaWx0ZXJlZFdhaXRpbmdSb29tTGlzdC52YWx1ZVwiXG4gICAgICAgIFt1cGRhdGVXYWl0aW5nTGlzdF09XCJ1cGRhdGVXYWl0aW5nUm9vbUxpc3RcIlxuICAgICAgICBbcm9vbU5hbWVdPVwicm9vbU5hbWUudmFsdWVcIlxuICAgICAgICBbc29ja2V0XT1cInNvY2tldC52YWx1ZVwiXG4gICAgICAgIFtwYXJhbWV0ZXJzXT1cIntcbiAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJlZFdhaXRpbmdSb29tTGlzdDogd2FpdGluZ1Jvb21MaXN0LnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgIGdldFVwZGF0ZWRBbGxQYXJhbXM6IGdldFVwZGF0ZWRBbGxQYXJhbXMsXG4gICAgICAgICAgICAgICAgICAgIH1cIlxuICAgICAgPjwvYXBwLXdhaXRpbmctcm9vbS1tb2RhbD5cblxuICAgICAgPGFwcC1jby1ob3N0LW1vZGFsXG4gICAgICAgIFtiYWNrZ3JvdW5kQ29sb3JdPVwiJ3JnYmEoMjE3LCAyMjcsIDIzNCwgMC45OSknXCJcbiAgICAgICAgW2lzQ29Ib3N0TW9kYWxWaXNpYmxlXT1cImlzQ29Ib3N0TW9kYWxWaXNpYmxlLnZhbHVlXCJcbiAgICAgICAgW29uQ29Ib3N0Q2xvc2VdPVwib25Db0hvc3RDbG9zZVwiXG4gICAgICAgIFtjb0hvc3RSZXNwb25zaWJpbGl0eV09XCJjb0hvc3RSZXNwb25zaWJpbGl0eS52YWx1ZVwiXG4gICAgICAgIFtwYXJ0aWNpcGFudHNdPVwicGFydGljaXBhbnRzLnZhbHVlXCJcbiAgICAgICAgW2N1cnJlbnRDb2hvc3RdPVwiY29Ib3N0LnZhbHVlXCJcbiAgICAgICAgW3Jvb21OYW1lXT1cInJvb21OYW1lLnZhbHVlXCJcbiAgICAgICAgW3Nob3dBbGVydF09XCJzaG93QWxlcnRcIlxuICAgICAgICBbdXBkYXRlQ29Ib3N0UmVzcG9uc2liaWxpdHldPVwidXBkYXRlQ29Ib3N0UmVzcG9uc2liaWxpdHlcIlxuICAgICAgICBbdXBkYXRlQ29Ib3N0XT1cInVwZGF0ZUNvSG9zdFwiXG4gICAgICAgIFt1cGRhdGVJc0NvSG9zdE1vZGFsVmlzaWJsZV09XCJ1cGRhdGVJc0NvSG9zdE1vZGFsVmlzaWJsZVwiXG4gICAgICAgIFtzb2NrZXRdPVwic29ja2V0LnZhbHVlXCJcbiAgICAgID48L2FwcC1jby1ob3N0LW1vZGFsPlxuXG4gICAgICA8YXBwLW1lZGlhLXNldHRpbmdzLW1vZGFsXG4gICAgICAgIFtiYWNrZ3JvdW5kQ29sb3JdPVwiJ3JnYmEoMTgxLCAyMzMsIDIyOSwgMC45NyknXCJcbiAgICAgICAgW2lzTWVkaWFTZXR0aW5nc01vZGFsVmlzaWJsZV09XCJpc01lZGlhU2V0dGluZ3NNb2RhbFZpc2libGUudmFsdWVcIlxuICAgICAgICBbb25NZWRpYVNldHRpbmdzQ2xvc2VdPVwib25NZWRpYVNldHRpbmdzQ2xvc2VcIlxuICAgICAgICBbcGFyYW1ldGVyc109XCJtZWRpYVNGVVBhcmFtZXRlcnNcIlxuICAgICAgPjwvYXBwLW1lZGlhLXNldHRpbmdzLW1vZGFsPlxuXG4gICAgICA8YXBwLXBhcnRpY2lwYW50cy1tb2RhbFxuICAgICAgICBbYmFja2dyb3VuZENvbG9yXT1cIidyZ2JhKDIxNywgMjI3LCAyMzQsIDAuOTkpJ1wiXG4gICAgICAgIFtpc1BhcnRpY2lwYW50c01vZGFsVmlzaWJsZV09XCJpc1BhcnRpY2lwYW50c01vZGFsVmlzaWJsZS52YWx1ZVwiXG4gICAgICAgIFtvblBhcnRpY2lwYW50c0Nsb3NlXT1cIm9uUGFydGljaXBhbnRzQ2xvc2VcIlxuICAgICAgICBbcGFydGljaXBhbnRzQ291bnRlcl09XCJwYXJ0aWNpcGFudHNDb3VudGVyLnZhbHVlXCJcbiAgICAgICAgW29uUGFydGljaXBhbnRzRmlsdGVyQ2hhbmdlXT1cIm9uUGFydGljaXBhbnRzRmlsdGVyQ2hhbmdlXCJcbiAgICAgICAgW3BhcmFtZXRlcnNdPVwie1xuICAgICAgICAgICAgICB1cGRhdGVQYXJ0aWNpcGFudHM6IHVwZGF0ZVBhcnRpY2lwYW50cyxcbiAgICAgICAgICAgICAgZmlsdGVyZWRQYXJ0aWNpcGFudHM6IGZpbHRlcmVkUGFydGljaXBhbnRzLnZhbHVlLFxuICAgICAgICAgICAgICB1cGRhdGVJc1BhcnRpY2lwYW50c01vZGFsVmlzaWJsZTogdXBkYXRlSXNQYXJ0aWNpcGFudHNNb2RhbFZpc2libGUsXG4gICAgICAgICAgICAgIHVwZGF0ZURpcmVjdE1lc3NhZ2VEZXRhaWxzOiB1cGRhdGVEaXJlY3RNZXNzYWdlRGV0YWlscyxcbiAgICAgICAgICAgICAgdXBkYXRlU3RhcnREaXJlY3RNZXNzYWdlOiB1cGRhdGVTdGFydERpcmVjdE1lc3NhZ2UsXG4gICAgICAgICAgICAgIHVwZGF0ZUlzTWVzc2FnZXNNb2RhbFZpc2libGU6IHVwZGF0ZUlzTWVzc2FnZXNNb2RhbFZpc2libGUsXG4gICAgICAgICAgICAgIHNob3dBbGVydDogc2hvd0FsZXJ0LFxuICAgICAgICAgICAgICBwYXJ0aWNpcGFudHM6IGZpbHRlcmVkUGFydGljaXBhbnRzLnZhbHVlLFxuICAgICAgICAgICAgICByb29tTmFtZTogcm9vbU5hbWUudmFsdWUsXG4gICAgICAgICAgICAgIGlzbGV2ZWw6IGlzbGV2ZWwudmFsdWUsXG4gICAgICAgICAgICAgIG1lbWJlcjogbWVtYmVyLnZhbHVlLFxuICAgICAgICAgICAgICBjb0hvc3RSZXNwb25zaWJpbGl0eTogY29Ib3N0UmVzcG9uc2liaWxpdHkudmFsdWUsXG4gICAgICAgICAgICAgIGNvSG9zdDogY29Ib3N0LnZhbHVlLFxuICAgICAgICAgICAgICBldmVudFR5cGU6IGV2ZW50VHlwZS52YWx1ZSxcbiAgICAgICAgICAgICAgc3RhcnREaXJlY3RNZXNzYWdlOiBzdGFydERpcmVjdE1lc3NhZ2UudmFsdWUsXG4gICAgICAgICAgICAgIGRpcmVjdE1lc3NhZ2VEZXRhaWxzOiBkaXJlY3RNZXNzYWdlRGV0YWlscy52YWx1ZSxcbiAgICAgICAgICAgICAgc29ja2V0OiBzb2NrZXQudmFsdWUsXG4gICAgICAgICAgICAgIGdldFVwZGF0ZWRBbGxQYXJhbXM6IGdldFVwZGF0ZWRBbGxQYXJhbXMsXG4gICAgICAgICAgICB9XCJcbiAgICAgID48L2FwcC1wYXJ0aWNpcGFudHMtbW9kYWw+XG5cbiAgICAgIDxhcHAtZGlzcGxheS1zZXR0aW5ncy1tb2RhbFxuICAgICAgICBbYmFja2dyb3VuZENvbG9yXT1cIidyZ2JhKDIxNywgMjI3LCAyMzQsIDAuOTkpJ1wiXG4gICAgICAgIFtpc0Rpc3BsYXlTZXR0aW5nc01vZGFsVmlzaWJsZV09XCJpc0Rpc3BsYXlTZXR0aW5nc01vZGFsVmlzaWJsZS52YWx1ZVwiXG4gICAgICAgIFtvbkRpc3BsYXlTZXR0aW5nc0Nsb3NlXT1cIm9uRGlzcGxheVNldHRpbmdzQ2xvc2VcIlxuICAgICAgICBbcGFyYW1ldGVyc109XCJtZWRpYVNGVVBhcmFtZXRlcnNcIlxuICAgICAgPjwvYXBwLWRpc3BsYXktc2V0dGluZ3MtbW9kYWw+XG5cbiAgICAgIDxhcHAtcmVjb3JkaW5nLW1vZGFsXG4gICAgICAgIFtiYWNrZ3JvdW5kQ29sb3JdPVwiJ3JnYmEoMjE3LCAyMjcsIDIzNCwgMC45OSknXCJcbiAgICAgICAgW2lzUmVjb3JkaW5nTW9kYWxWaXNpYmxlXT1cImlzUmVjb3JkaW5nTW9kYWxWaXNpYmxlLnZhbHVlXCJcbiAgICAgICAgW29uQ2xvc2VdPVwib25SZWNvcmRpbmdDbG9zZVwiXG4gICAgICAgIFtzdGFydFJlY29yZGluZ109XCJzdGFydFJlY29yZGluZy5zdGFydFJlY29yZGluZ1wiXG4gICAgICAgIFtjb25maXJtUmVjb3JkaW5nXT1cImNvbmZpcm1SZWNvcmRpbmcuY29uZmlybVJlY29yZGluZ1wiXG4gICAgICAgIFtwYXJhbWV0ZXJzXT1cIm1lZGlhU0ZVUGFyYW1ldGVyc1wiXG4gICAgICA+PC9hcHAtcmVjb3JkaW5nLW1vZGFsPlxuXG4gICAgICA8YXBwLW1lc3NhZ2VzLW1vZGFsXG4gICAgICAgIFtiYWNrZ3JvdW5kQ29sb3JdPVwiXG4gICAgICAgICAgZXZlbnRUeXBlLnZhbHVlID09PSAnd2ViaW5hcicgfHwgZXZlbnRUeXBlLnZhbHVlID09PSAnY29uZmVyZW5jZSdcbiAgICAgICAgICAgID8gJyNmNWY1ZjUnXG4gICAgICAgICAgICA6ICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMjUpJ1xuICAgICAgICBcIlxuICAgICAgICBbaXNNZXNzYWdlc01vZGFsVmlzaWJsZV09XCJpc01lc3NhZ2VzTW9kYWxWaXNpYmxlLnZhbHVlXCJcbiAgICAgICAgW29uTWVzc2FnZXNDbG9zZV09XCJvbk1lc3NhZ2VzQ2xvc2VcIlxuICAgICAgICBbbWVzc2FnZXNdPVwibWVzc2FnZXMudmFsdWVcIlxuICAgICAgICBbZXZlbnRUeXBlXT1cImV2ZW50VHlwZS52YWx1ZVwiXG4gICAgICAgIFttZW1iZXJdPVwibWVtYmVyLnZhbHVlXCJcbiAgICAgICAgW2lzbGV2ZWxdPVwiaXNsZXZlbC52YWx1ZVwiXG4gICAgICAgIFtjb0hvc3RSZXNwb25zaWJpbGl0eV09XCJjb0hvc3RSZXNwb25zaWJpbGl0eS52YWx1ZVwiXG4gICAgICAgIFtjb0hvc3RdPVwiY29Ib3N0LnZhbHVlXCJcbiAgICAgICAgW3N0YXJ0RGlyZWN0TWVzc2FnZV09XCJzdGFydERpcmVjdE1lc3NhZ2UudmFsdWVcIlxuICAgICAgICBbZGlyZWN0TWVzc2FnZURldGFpbHNdPVwiZGlyZWN0TWVzc2FnZURldGFpbHMudmFsdWVcIlxuICAgICAgICBbdXBkYXRlU3RhcnREaXJlY3RNZXNzYWdlXT1cInVwZGF0ZVN0YXJ0RGlyZWN0TWVzc2FnZVwiXG4gICAgICAgIFt1cGRhdGVEaXJlY3RNZXNzYWdlRGV0YWlsc109XCJ1cGRhdGVEaXJlY3RNZXNzYWdlRGV0YWlsc1wiXG4gICAgICAgIFtzaG93QWxlcnRdPVwic2hvd0FsZXJ0XCJcbiAgICAgICAgW3Jvb21OYW1lXT1cInJvb21OYW1lLnZhbHVlXCJcbiAgICAgICAgW3NvY2tldF09XCJzb2NrZXQudmFsdWVcIlxuICAgICAgICBbY2hhdFNldHRpbmddPVwiY2hhdFNldHRpbmcudmFsdWVcIlxuICAgICAgPjwvYXBwLW1lc3NhZ2VzLW1vZGFsPlxuXG4gICAgICA8YXBwLWNvbmZpcm0tZXhpdC1tb2RhbFxuICAgICAgICBbYmFja2dyb3VuZENvbG9yXT1cIidyZ2JhKDE4MSwgMjMzLCAyMjksIDAuOTcpJ1wiXG4gICAgICAgIFtpc0NvbmZpcm1FeGl0TW9kYWxWaXNpYmxlXT1cImlzQ29uZmlybUV4aXRNb2RhbFZpc2libGUudmFsdWVcIlxuICAgICAgICBbb25Db25maXJtRXhpdENsb3NlXT1cIm9uQ29uZmlybUV4aXRDbG9zZVwiXG4gICAgICAgIFtwb3NpdGlvbl09XCIndG9wUmlnaHQnXCJcbiAgICAgICAgW21lbWJlcl09XCJtZW1iZXIudmFsdWVcIlxuICAgICAgICBbcm9vbU5hbWVdPVwicm9vbU5hbWUudmFsdWVcIlxuICAgICAgICBbc29ja2V0XT1cInNvY2tldC52YWx1ZVwiXG4gICAgICAgIFtpc2xldmVsXT1cImlzbGV2ZWwudmFsdWVcIlxuICAgICAgPjwvYXBwLWNvbmZpcm0tZXhpdC1tb2RhbD5cblxuICAgICAgPGFwcC1jb25maXJtLWhlcmUtbW9kYWxcbiAgICAgICAgW2JhY2tncm91bmRDb2xvcl09XCIncmdiYSgxODEsIDIzMywgMjI5LCAwLjk3KSdcIlxuICAgICAgICBbaXNDb25maXJtSGVyZU1vZGFsVmlzaWJsZV09XCJpc0NvbmZpcm1IZXJlTW9kYWxWaXNpYmxlLnZhbHVlXCJcbiAgICAgICAgW29uQ29uZmlybUhlcmVDbG9zZV09XCJvbkNvbmZpcm1IZXJlQ2xvc2VcIlxuICAgICAgICBbbWVtYmVyXT1cIm1lbWJlci52YWx1ZVwiXG4gICAgICAgIFtyb29tTmFtZV09XCJyb29tTmFtZS52YWx1ZVwiXG4gICAgICAgIFtzb2NrZXRdPVwic29ja2V0LnZhbHVlXCJcbiAgICAgID48L2FwcC1jb25maXJtLWhlcmUtbW9kYWw+XG5cbiAgICAgIDxhcHAtc2hhcmUtZXZlbnQtbW9kYWxcbiAgICAgICAgW2lzU2hhcmVFdmVudE1vZGFsVmlzaWJsZV09XCJpc1NoYXJlRXZlbnRNb2RhbFZpc2libGUudmFsdWVcIlxuICAgICAgICBbb25TaGFyZUV2ZW50Q2xvc2VdPVwib25TaGFyZUV2ZW50Q2xvc2VcIlxuICAgICAgICBbcm9vbU5hbWVdPVwicm9vbU5hbWUudmFsdWVcIlxuICAgICAgICBbaXNsZXZlbF09XCJpc2xldmVsLnZhbHVlXCJcbiAgICAgICAgW2FkbWluUGFzc2NvZGVdPVwiYWRtaW5QYXNzY29kZS52YWx1ZVwiXG4gICAgICAgIFtldmVudFR5cGVdPVwiZXZlbnRUeXBlLnZhbHVlXCJcbiAgICAgID48L2FwcC1zaGFyZS1ldmVudC1tb2RhbD5cblxuICAgICAgPGFwcC1wb2xsLW1vZGFsXG4gICAgICAgIFtpc1BvbGxNb2RhbFZpc2libGVdPVwiaXNQb2xsTW9kYWxWaXNpYmxlLnZhbHVlXCJcbiAgICAgICAgW29uQ2xvc2VdPVwib25Qb2xsQ2xvc2VcIlxuICAgICAgICBbbWVtYmVyXT1cIm1lbWJlci52YWx1ZVwiXG4gICAgICAgIFtpc2xldmVsXT1cImlzbGV2ZWwudmFsdWVcIlxuICAgICAgICBbcG9sbHNdPVwicG9sbHMudmFsdWVcIlxuICAgICAgICBbcG9sbF09XCJwb2xsLnZhbHVlXCJcbiAgICAgICAgW3NvY2tldF09XCJzb2NrZXQudmFsdWVcIlxuICAgICAgICBbcm9vbU5hbWVdPVwicm9vbU5hbWUudmFsdWVcIlxuICAgICAgICBbc2hvd0FsZXJ0XT1cInNob3dBbGVydFwiXG4gICAgICAgIFt1cGRhdGVJc1BvbGxNb2RhbFZpc2libGVdPVwidXBkYXRlSXNQb2xsTW9kYWxWaXNpYmxlXCJcbiAgICAgICAgW2hhbmRsZUNyZWF0ZVBvbGxdPVwiaGFuZGxlQ3JlYXRlUG9sbC5oYW5kbGVDcmVhdGVQb2xsXCJcbiAgICAgICAgW2hhbmRsZUVuZFBvbGxdPVwiaGFuZGxlRW5kUG9sbC5oYW5kbGVFbmRQb2xsXCJcbiAgICAgICAgW2hhbmRsZVZvdGVQb2xsXT1cImhhbmRsZVZvdGVQb2xsLmhhbmRsZVZvdGVQb2xsXCJcbiAgICAgID48L2FwcC1wb2xsLW1vZGFsPlxuXG4gICAgICA8YXBwLWJhY2tncm91bmQtbW9kYWxcbiAgICAgICAgW2JhY2tncm91bmRDb2xvcl09XCIncmdiYSgyMTcsIDIyNywgMjM0LCAwLjk5KSdcIlxuICAgICAgICBbaXNWaXNpYmxlXT1cImlzQmFja2dyb3VuZE1vZGFsVmlzaWJsZS52YWx1ZVwiXG4gICAgICAgIFtvbkNsb3NlXT1cIm9uQmFja2dyb3VuZENsb3NlXCJcbiAgICAgICAgW3BhcmFtZXRlcnNdPVwibWVkaWFTRlVQYXJhbWV0ZXJzXCJcbiAgICAgID48L2FwcC1iYWNrZ3JvdW5kLW1vZGFsPlxuXG4gICAgICA8YXBwLWJyZWFrb3V0LXJvb21zLW1vZGFsXG4gICAgICAgIFtiYWNrZ3JvdW5kQ29sb3JdPVwiJ3JnYmEoMjE3LCAyMjcsIDIzNCwgMC45OSknXCJcbiAgICAgICAgW2lzVmlzaWJsZV09XCJpc0JyZWFrb3V0Um9vbXNNb2RhbFZpc2libGUudmFsdWVcIlxuICAgICAgICBbb25CcmVha291dFJvb21zQ2xvc2VdPVwib25CcmVha291dFJvb21zQ2xvc2VcIlxuICAgICAgICBbcGFyYW1ldGVyc109XCJtZWRpYVNGVVBhcmFtZXRlcnNcIlxuICAgICAgPjwvYXBwLWJyZWFrb3V0LXJvb21zLW1vZGFsPlxuXG4gICAgICA8YXBwLWNvbmZpZ3VyZS13aGl0ZWJvYXJkLW1vZGFsXG4gICAgICAgIFtiYWNrZ3JvdW5kQ29sb3JdPVwiJ3JnYmEoMjE3LCAyMjcsIDIzNCwgMC45OSknXCJcbiAgICAgICAgW2lzVmlzaWJsZV09XCJpc0NvbmZpZ3VyZVdoaXRlYm9hcmRNb2RhbFZpc2libGUudmFsdWVcIlxuICAgICAgICBbb25Db25maWd1cmVXaGl0ZWJvYXJkQ2xvc2VdPVwib25Db25maWd1cmVXaGl0ZWJvYXJkQ2xvc2VcIlxuICAgICAgICBbcGFyYW1ldGVyc109XCJtZWRpYVNGVVBhcmFtZXRlcnNcIlxuICAgICAgPjwvYXBwLWNvbmZpZ3VyZS13aGl0ZWJvYXJkLW1vZGFsPlxuXG4gICAgICA8YXBwLXNjcmVlbmJvYXJkLW1vZGFsXG4gICAgICAgIFtiYWNrZ3JvdW5kQ29sb3JdPVwiJ3JnYmEoMjE3LCAyMjcsIDIzNCwgMC45OSknXCJcbiAgICAgICAgW2lzVmlzaWJsZV09XCJpc1NjcmVlbmJvYXJkTW9kYWxWaXNpYmxlLnZhbHVlXCJcbiAgICAgICAgW29uQ2xvc2VdPVwib25TY3JlZW5ib2FyZENsb3NlXCJcbiAgICAgICAgW3BhcmFtZXRlcnNdPVwibWVkaWFTRlVQYXJhbWV0ZXJzXCJcbiAgICAgID48L2FwcC1zY3JlZW5ib2FyZC1tb2RhbD5cblxuICAgICAgPGFwcC1hbGVydC1jb21wb25lbnRcbiAgICAgICAgW3Zpc2libGVdPVwiYWxlcnRWaXNpYmxlLnZhbHVlXCJcbiAgICAgICAgW21lc3NhZ2VdPVwiYWxlcnRNZXNzYWdlLnZhbHVlXCJcbiAgICAgICAgW3R5cGVdPVwiYWxlcnRUeXBlLnZhbHVlXCJcbiAgICAgICAgW2R1cmF0aW9uXT1cImFsZXJ0RHVyYXRpb24udmFsdWVcIlxuICAgICAgICBbb25IaWRlXT1cIm9uQWxlcnRIaWRlXCJcbiAgICAgICAgdGV4dENvbG9yPVwiI2ZmZmZmZlwiXG4gICAgICA+PC9hcHAtYWxlcnQtY29tcG9uZW50PlxuXG4gICAgICA8YXBwLWxvYWRpbmctbW9kYWxcbiAgICAgICAgW2lzVmlzaWJsZV09XCJpc0xvYWRpbmdNb2RhbFZpc2libGUudmFsdWVcIlxuICAgICAgICBbYmFja2dyb3VuZENvbG9yXT1cIidyZ2JhKDIxNywgMjI3LCAyMzQsIDAuOTkpJ1wiXG4gICAgICAgIGRpc3BsYXlDb2xvcj1cImJsYWNrXCJcbiAgICAgID48L2FwcC1sb2FkaW5nLW1vZGFsPlxuICAgIDwvZGl2PlxuICBgLFxuICBzdHlsZXM6IFtcbiAgICBgXG4gICAgICAuTWVkaWFTRlUge1xuICAgICAgICAvKiBBZGQgYW55IGNvbXBvbmVudC1zcGVjaWZpYyBzdHlsZXMgaGVyZSAqL1xuICAgICAgfVxuICAgIGAsXG4gIF0sXG4gIHByb3ZpZGVyczogW0Nvb2tpZVNlcnZpY2VdLFxufSlcbmV4cG9ydCBjbGFzcyBNZWRpYXNmdUNvbmZlcmVuY2UgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpXG4gIFByZWpvaW5QYWdlOiBhbnkgPSBXZWxjb21lUGFnZTtcbiAgQElucHV0KCkgY3JlZGVudGlhbHM6IHsgYXBpVXNlck5hbWU6IHN0cmluZzsgYXBpS2V5OiBzdHJpbmcgfSA9IHsgYXBpVXNlck5hbWU6ICcnLCBhcGlLZXk6ICcnIH07XG4gIEBJbnB1dCgpIHVzZUxvY2FsVUlNb2RlID0gZmFsc2U7XG4gIEBJbnB1dCgpIHNlZWREYXRhPzogU2VlZERhdGE7XG4gIEBJbnB1dCgpIHVzZVNlZWQgPSBmYWxzZTtcbiAgQElucHV0KCkgaW1nU3JjID0gJ2h0dHBzOi8vbWVkaWFzZnUuY29tL2ltYWdlcy9sb2dvMTkyLnBuZyc7XG5cbiAgdGl0bGUgPSAnTWVkaWFTRlUtQ29uZmVyZW5jZSc7XG5cbiAgcHJpdmF0ZSBtYWluSGVpZ2h0V2lkdGhTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiB8IHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSB2YWxpZGF0ZWRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiB8IHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSBpc2xldmVsU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gfCB1bmRlZmluZWQ7XG4gIHByaXZhdGUgY29Ib3N0U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gfCB1bmRlZmluZWQ7XG4gIHByaXZhdGUgYnV0dG9uU3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcbiAgcHJpdmF0ZSBTY3JlZW5ib2FyZFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uIHwgdW5kZWZpbmVkO1xuICBwcml2YXRlIHJlY29yZGluZ1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uIHwgdW5kZWZpbmVkO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvcixcbiAgICBwdWJsaWMgdXBkYXRlTWluaUNhcmRzR3JpZDogVXBkYXRlTWluaUNhcmRzR3JpZCxcbiAgICBwdWJsaWMgbWl4U3RyZWFtczogTWl4U3RyZWFtcyxcbiAgICBwdWJsaWMgZGlzcFN0cmVhbXM6IERpc3BTdHJlYW1zLFxuICAgIHB1YmxpYyBzdG9wU2hhcmVTY3JlZW46IFN0b3BTaGFyZVNjcmVlbixcbiAgICBwdWJsaWMgY2hlY2tTY3JlZW5TaGFyZTogQ2hlY2tTY3JlZW5TaGFyZSxcbiAgICBwdWJsaWMgc3RhcnRTaGFyZVNjcmVlbjogU3RhcnRTaGFyZVNjcmVlbixcbiAgICBwdWJsaWMgcmVxdWVzdFNjcmVlblNoYXJlOiBSZXF1ZXN0U2NyZWVuU2hhcmUsXG4gICAgcHVibGljIHJlb3JkZXJTdHJlYW1zOiBSZW9yZGVyU3RyZWFtcyxcbiAgICBwdWJsaWMgcHJlcG9wdWxhdGVVc2VyTWVkaWE6IFByZXBvcHVsYXRlVXNlck1lZGlhLFxuICAgIHB1YmxpYyBnZXRWaWRlb3M6IEdldFZpZGVvcyxcbiAgICBwdWJsaWMgcmVQb3J0OiBSZVBvcnQsXG4gICAgcHVibGljIHRyaWdnZXI6IFRyaWdnZXIsXG4gICAgcHVibGljIGNvbnN1bWVyUmVzdW1lOiBDb25zdW1lclJlc3VtZSxcbiAgICBwdWJsaWMgY29ubmVjdFNlbmRUcmFuc3BvcnQ6IENvbm5lY3RTZW5kVHJhbnNwb3J0LFxuICAgIHB1YmxpYyBjb25uZWN0U2VuZFRyYW5zcG9ydEF1ZGlvOiBDb25uZWN0U2VuZFRyYW5zcG9ydEF1ZGlvLFxuICAgIHB1YmxpYyBjb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvOiBDb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvLFxuICAgIHB1YmxpYyBjb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlbjogQ29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW4sXG4gICAgcHVibGljIHByb2Nlc3NDb25zdW1lclRyYW5zcG9ydHM6IFByb2Nlc3NDb25zdW1lclRyYW5zcG9ydHMsXG4gICAgcHVibGljIHJlc3VtZVBhdXNlU3RyZWFtczogUmVzdW1lUGF1c2VTdHJlYW1zLFxuICAgIHB1YmxpYyByZWFkanVzdDogUmVhZGp1c3QsXG4gICAgcHVibGljIGNoZWNrR3JpZDogQ2hlY2tHcmlkLFxuICAgIHB1YmxpYyBnZXRFc3RpbWF0ZTogR2V0RXN0aW1hdGUsXG4gICAgcHVibGljIGNhbGN1bGF0ZVJvd3NBbmRDb2x1bW5zOiBDYWxjdWxhdGVSb3dzQW5kQ29sdW1ucyxcbiAgICBwdWJsaWMgYWRkVmlkZW9zR3JpZDogQWRkVmlkZW9zR3JpZCxcbiAgICBwdWJsaWMgb25TY3JlZW5DaGFuZ2VzOiBPblNjcmVlbkNoYW5nZXMsXG4gICAgcHVibGljIGNoYW5nZVZpZHM6IENoYW5nZVZpZHMsXG4gICAgcHVibGljIGNvbXBhcmVBY3RpdmVOYW1lczogQ29tcGFyZUFjdGl2ZU5hbWVzLFxuICAgIHB1YmxpYyBjb21wYXJlU2NyZWVuU3RhdGVzOiBDb21wYXJlU2NyZWVuU3RhdGVzLFxuICAgIHB1YmxpYyBjcmVhdGVTZW5kVHJhbnNwb3J0OiBDcmVhdGVTZW5kVHJhbnNwb3J0LFxuICAgIHB1YmxpYyByZXN1bWVTZW5kVHJhbnNwb3J0QXVkaW86IFJlc3VtZVNlbmRUcmFuc3BvcnRBdWRpbyxcbiAgICBwdWJsaWMgcmVjZWl2ZUFsbFBpcGVkVHJhbnNwb3J0czogUmVjZWl2ZUFsbFBpcGVkVHJhbnNwb3J0cyxcbiAgICBwdWJsaWMgZGlzY29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlbzogRGlzY29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlbyxcbiAgICBwdWJsaWMgZGlzY29ubmVjdFNlbmRUcmFuc3BvcnRBdWRpbzogRGlzY29ubmVjdFNlbmRUcmFuc3BvcnRBdWRpbyxcbiAgICBwdWJsaWMgZGlzY29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW46IERpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuLFxuICAgIHB1YmxpYyBnZXRQaXBlZFByb2R1Y2Vyc0FsdDogR2V0UGlwZWRQcm9kdWNlcnNBbHQsXG4gICAgcHVibGljIHNpZ25hbE5ld0NvbnN1bWVyVHJhbnNwb3J0OiBTaWduYWxOZXdDb25zdW1lclRyYW5zcG9ydCxcbiAgICBwdWJsaWMgY29ubmVjdFJlY3ZUcmFuc3BvcnQ6IENvbm5lY3RSZWN2VHJhbnNwb3J0LFxuICAgIHB1YmxpYyByZVVwZGF0ZUludGVyOiBSZVVwZGF0ZUludGVyLFxuICAgIHB1YmxpYyB1cGRhdGVQYXJ0aWNpcGFudEF1ZGlvRGVjaWJlbHM6IFVwZGF0ZVBhcnRpY2lwYW50QXVkaW9EZWNpYmVscyxcbiAgICBwdWJsaWMgY2xvc2VBbmRSZXNpemU6IENsb3NlQW5kUmVzaXplLFxuICAgIHB1YmxpYyBhdXRvQWRqdXN0OiBBdXRvQWRqdXN0LFxuICAgIHB1YmxpYyBzd2l0Y2hVc2VyVmlkZW9BbHQ6IFN3aXRjaFVzZXJWaWRlb0FsdCxcbiAgICBwdWJsaWMgc3dpdGNoVXNlclZpZGVvOiBTd2l0Y2hVc2VyVmlkZW8sXG4gICAgcHVibGljIHN3aXRjaFVzZXJBdWRpbzogU3dpdGNoVXNlckF1ZGlvLFxuICAgIHB1YmxpYyBnZXREb21haW5zOiBHZXREb21haW5zLFxuICAgIHB1YmxpYyBmb3JtYXROdW1iZXI6IEZvcm1hdE51bWJlcixcbiAgICBwdWJsaWMgY29ubmVjdElwczogQ29ubmVjdElwcyxcbiAgICBwdWJsaWMgY3JlYXRlRGV2aWNlQ2xpZW50OiBDcmVhdGVEZXZpY2VDbGllbnQsXG4gICAgcHVibGljIGhhbmRsZUNyZWF0ZVBvbGw6IEhhbmRsZUNyZWF0ZVBvbGwsXG4gICAgcHVibGljIGhhbmRsZUVuZFBvbGw6IEhhbmRsZUVuZFBvbGwsXG4gICAgcHVibGljIGhhbmRsZVZvdGVQb2xsOiBIYW5kbGVWb3RlUG9sbCxcbiAgICBwdWJsaWMgY2FwdHVyZUNhbnZhc1N0cmVhbTogQ2FwdHVyZUNhbnZhc1N0cmVhbSxcbiAgICBwdWJsaWMgcmVzdW1lUGF1c2VBdWRpb1N0cmVhbXM6IFJlc3VtZVBhdXNlQXVkaW9TdHJlYW1zLFxuICAgIHB1YmxpYyBwcm9jZXNzQ29uc3VtZXJUcmFuc3BvcnRzQXVkaW86IFByb2Nlc3NDb25zdW1lclRyYW5zcG9ydHNBdWRpbyxcblxuICAgIHB1YmxpYyBsYXVuY2hNZW51TW9kYWw6IExhdW5jaE1lbnVNb2RhbCxcbiAgICBwdWJsaWMgbGF1bmNoUmVjb3JkaW5nOiBMYXVuY2hSZWNvcmRpbmcsXG4gICAgcHVibGljIHN0YXJ0UmVjb3JkaW5nOiBTdGFydFJlY29yZGluZyxcbiAgICBwdWJsaWMgY29uZmlybVJlY29yZGluZzogQ29uZmlybVJlY29yZGluZyxcbiAgICBwdWJsaWMgbGF1bmNoV2FpdGluZzogTGF1bmNoV2FpdGluZyxcbiAgICBwdWJsaWMgbGF1bmNoQ29Ib3N0OiBsYXVuY2hDb0hvc3QsXG4gICAgcHVibGljIGxhdW5jaE1lZGlhU2V0dGluZ3M6IExhdW5jaE1lZGlhU2V0dGluZ3MsXG4gICAgcHVibGljIGxhdW5jaERpc3BsYXlTZXR0aW5nczogTGF1bmNoRGlzcGxheVNldHRpbmdzLFxuICAgIHB1YmxpYyBsYXVuY2hTZXR0aW5nczogTGF1bmNoU2V0dGluZ3MsXG4gICAgcHVibGljIGxhdW5jaFJlcXVlc3RzOiBMYXVuY2hSZXF1ZXN0cyxcbiAgICBwdWJsaWMgbGF1bmNoUGFydGljaXBhbnRzOiBMYXVuY2hQYXJ0aWNpcGFudHMsXG4gICAgcHVibGljIGxhdW5jaE1lc3NhZ2VzOiBMYXVuY2hNZXNzYWdlcyxcbiAgICBwdWJsaWMgbGF1bmNoQ29uZmlybUV4aXQ6IExhdW5jaENvbmZpcm1FeGl0LFxuICAgIHB1YmxpYyBsYXVuY2hQb2xsOiBMYXVuY2hQb2xsLFxuICAgIHB1YmxpYyBsYXVuY2hCcmVha291dFJvb21zOiBMYXVuY2hCcmVha291dFJvb21zLFxuICAgIHB1YmxpYyBsYXVuY2hDb25maWd1cmVXaGl0ZWJvYXJkOiBMYXVuY2hDb25maWd1cmVXaGl0ZWJvYXJkLFxuICAgIHB1YmxpYyBzdGFydE1lZXRpbmdQcm9ncmVzc1RpbWVyOiBTdGFydE1lZXRpbmdQcm9ncmVzc1RpbWVyLFxuICAgIHB1YmxpYyB1cGRhdGVSZWNvcmRpbmc6IFVwZGF0ZVJlY29yZGluZyxcbiAgICBwdWJsaWMgc3RvcFJlY29yZGluZzogU3RvcFJlY29yZGluZyxcbiAgICBwdWJsaWMgdXNlcldhaXRpbmc6IFVzZXJXYWl0aW5nLFxuICAgIHB1YmxpYyBwZXJzb25Kb2luZWQ6IFBlcnNvbkpvaW5lZCxcbiAgICBwdWJsaWMgYWxsV2FpdGluZ1Jvb21NZW1iZXJzOiBBbGxXYWl0aW5nUm9vbU1lbWJlcnMsXG4gICAgcHVibGljIHJvb21SZWNvcmRQYXJhbXM6IFJvb21SZWNvcmRQYXJhbXMsXG4gICAgcHVibGljIGJhblBhcnRpY2lwYW50OiBCYW5QYXJ0aWNpcGFudCxcbiAgICBwdWJsaWMgdXBkYXRlZENvSG9zdDogVXBkYXRlZENvSG9zdCxcbiAgICBwdWJsaWMgcGFydGljaXBhbnRSZXF1ZXN0ZWQ6IFBhcnRpY2lwYW50UmVxdWVzdGVkLFxuICAgIHB1YmxpYyBzY3JlZW5Qcm9kdWNlcklkOiBTY3JlZW5Qcm9kdWNlcklkLFxuICAgIHB1YmxpYyB1cGRhdGVNZWRpYVNldHRpbmdzOiBVcGRhdGVNZWRpYVNldHRpbmdzLFxuICAgIHB1YmxpYyBwcm9kdWNlck1lZGlhUGF1c2VkOiBQcm9kdWNlck1lZGlhUGF1c2VkLFxuICAgIHB1YmxpYyBwcm9kdWNlck1lZGlhUmVzdW1lZDogUHJvZHVjZXJNZWRpYVJlc3VtZWQsXG4gICAgcHVibGljIHByb2R1Y2VyTWVkaWFDbG9zZWQ6IFByb2R1Y2VyTWVkaWFDbG9zZWQsXG4gICAgcHVibGljIGNvbnRyb2xNZWRpYUhvc3Q6IENvbnRyb2xNZWRpYUhvc3QsXG4gICAgcHVibGljIG1lZXRpbmdFbmRlZDogTWVldGluZ0VuZGVkLFxuICAgIHB1YmxpYyBkaXNjb25uZWN0VXNlclNlbGY6IERpc2Nvbm5lY3RVc2VyU2VsZixcbiAgICBwdWJsaWMgcmVjZWl2ZU1lc3NhZ2U6IFJlY2VpdmVNZXNzYWdlLFxuICAgIHB1YmxpYyBtZWV0aW5nVGltZVJlbWFpbmluZzogTWVldGluZ1RpbWVSZW1haW5pbmcsXG4gICAgcHVibGljIG1lZXRpbmdTdGlsbFRoZXJlOiBNZWV0aW5nU3RpbGxUaGVyZSxcbiAgICBwdWJsaWMgc3RhcnRSZWNvcmRzOiBTdGFydFJlY29yZHMsXG4gICAgcHVibGljIHJlSW5pdGlhdGVSZWNvcmRpbmc6IFJlSW5pdGlhdGVSZWNvcmRpbmcsXG4gICAgcHVibGljIHJlY29yZGluZ05vdGljZTogUmVjb3JkaW5nTm90aWNlLFxuICAgIHB1YmxpYyB0aW1lTGVmdFJlY29yZGluZzogVGltZUxlZnRSZWNvcmRpbmcsXG4gICAgcHVibGljIHN0b3BwZWRSZWNvcmRpbmc6IFN0b3BwZWRSZWNvcmRpbmcsXG4gICAgcHVibGljIGhvc3RSZXF1ZXN0UmVzcG9uc2U6IEhvc3RSZXF1ZXN0UmVzcG9uc2UsXG4gICAgcHVibGljIGFsbE1lbWJlcnM6IEFsbE1lbWJlcnMsXG4gICAgcHVibGljIGFsbE1lbWJlcnNSZXN0OiBBbGxNZW1iZXJzUmVzdCxcbiAgICBwdWJsaWMgZGlzY29ubmVjdDogRGlzY29ubmVjdCxcbiAgICBwdWJsaWMgcG9sbFVwZGF0ZWQ6IFBvbGxVcGRhdGVkLFxuICAgIHB1YmxpYyBicmVha291dFJvb21VcGRhdGVkOiBCcmVha291dFJvb21VcGRhdGVkLFxuICAgIHB1YmxpYyBzb2NrZXRNYW5hZ2VyOiBTb2NrZXRNYW5hZ2VyLFxuICAgIHB1YmxpYyBqb2luUm9vbUNsaWVudDogSm9pblJvb21DbGllbnQsXG4gICAgcHVibGljIHVwZGF0ZVJvb21QYXJhbWV0ZXJzQ2xpZW50OiBVcGRhdGVSb29tUGFyYW1ldGVyc0NsaWVudCxcbiAgICBwdWJsaWMgY2xpY2tWaWRlbzogQ2xpY2tWaWRlbyxcbiAgICBwdWJsaWMgY2xpY2tBdWRpbzogQ2xpY2tBdWRpbyxcbiAgICBwdWJsaWMgY2xpY2tTY3JlZW5TaGFyZTogQ2xpY2tTY3JlZW5TaGFyZSxcbiAgICBwdWJsaWMgc3RyZWFtU3VjY2Vzc1ZpZGVvOiBTdHJlYW1TdWNjZXNzVmlkZW8sXG4gICAgcHVibGljIHN0cmVhbVN1Y2Nlc3NBdWRpbzogU3RyZWFtU3VjY2Vzc0F1ZGlvLFxuICAgIHB1YmxpYyBzdHJlYW1TdWNjZXNzU2NyZWVuOiBTdHJlYW1TdWNjZXNzU2NyZWVuLFxuICAgIHB1YmxpYyBzdHJlYW1TdWNjZXNzQXVkaW9Td2l0Y2g6IFN0cmVhbVN1Y2Nlc3NBdWRpb1N3aXRjaCxcbiAgICBwdWJsaWMgY2hlY2tQZXJtaXNzaW9uOiBDaGVja1Blcm1pc3Npb24sXG4gICAgcHVibGljIHVwZGF0ZUNvbnN1bWluZ0RvbWFpbnM6IFVwZGF0ZUNvbnN1bWluZ0RvbWFpbnMsXG4gICAgcHVibGljIHJlY2VpdmVSb29tTWVzc2FnZXM6IFJlY2VpdmVSb29tTWVzc2FnZXMsXG4gICkge31cblxuICBjcmVhdGVJbmplY3RvcihpbnB1dHM6IGFueSkge1xuICAgIGNvbnN0IGluaiA9IEluamVjdG9yLmNyZWF0ZSh7XG4gICAgICBwcm92aWRlcnM6IE9iamVjdC5rZXlzKGlucHV0cykubWFwKChrZXkpID0+ICh7IHByb3ZpZGU6IGtleSwgdXNlVmFsdWU6IGlucHV0c1trZXldIH0pKSxcbiAgICAgIHBhcmVudDogdGhpcy5pbmplY3RvcixcbiAgICB9KTtcblxuICAgIHJldHVybiBpbmo7XG4gIH1cblxuICAvLyBJbml0aWFsIHZhbHVlc1xuICBtZWRpYVNGVUZ1bmN0aW9ucyA9ICgpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlTWluaUNhcmRzR3JpZDpcbiAgICAgICAgdGhpcy51cGRhdGVNaW5pQ2FyZHNHcmlkPy51cGRhdGVNaW5pQ2FyZHNHcmlkIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBtaXhTdHJlYW1zOlxuICAgICAgICB0aGlzLm1peFN0cmVhbXM/Lm1peFN0cmVhbXMgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGRpc3BTdHJlYW1zOlxuICAgICAgICB0aGlzLmRpc3BTdHJlYW1zPy5kaXNwU3RyZWFtcyB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgc3RvcFNoYXJlU2NyZWVuOlxuICAgICAgICB0aGlzLnN0b3BTaGFyZVNjcmVlbj8uc3RvcFNoYXJlU2NyZWVuIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBjaGVja1NjcmVlblNoYXJlOlxuICAgICAgICB0aGlzLmNoZWNrU2NyZWVuU2hhcmU/LmNoZWNrU2NyZWVuU2hhcmUgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIHN0YXJ0U2hhcmVTY3JlZW46XG4gICAgICAgIHRoaXMuc3RhcnRTaGFyZVNjcmVlbj8uc3RhcnRTaGFyZVNjcmVlbiB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgcmVxdWVzdFNjcmVlblNoYXJlOlxuICAgICAgICB0aGlzLnJlcXVlc3RTY3JlZW5TaGFyZT8ucmVxdWVzdFNjcmVlblNoYXJlIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICByZW9yZGVyU3RyZWFtczpcbiAgICAgICAgdGhpcy5yZW9yZGVyU3RyZWFtcz8ucmVvcmRlclN0cmVhbXMgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIHByZXBvcHVsYXRlVXNlck1lZGlhOlxuICAgICAgICB0aGlzLnByZXBvcHVsYXRlVXNlck1lZGlhPy5wcmVwb3B1bGF0ZVVzZXJNZWRpYSB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgZ2V0VmlkZW9zOlxuICAgICAgICB0aGlzLmdldFZpZGVvcz8uZ2V0VmlkZW9zIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICByZVBvcnQ6XG4gICAgICAgIHRoaXMucmVQb3J0Py5yZVBvcnQgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIHRyaWdnZXI6XG4gICAgICAgIHRoaXMudHJpZ2dlcj8udHJpZ2dlciB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgY29uc3VtZXJSZXN1bWU6XG4gICAgICAgIHRoaXMuY29uc3VtZXJSZXN1bWU/LmNvbnN1bWVyUmVzdW1lIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBjb25uZWN0U2VuZFRyYW5zcG9ydDpcbiAgICAgICAgdGhpcy5jb25uZWN0U2VuZFRyYW5zcG9ydD8uY29ubmVjdFNlbmRUcmFuc3BvcnQgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGNvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW86XG4gICAgICAgIHRoaXMuY29ubmVjdFNlbmRUcmFuc3BvcnRBdWRpbz8uY29ubmVjdFNlbmRUcmFuc3BvcnRBdWRpbyB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgY29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlbzpcbiAgICAgICAgdGhpcy5jb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvPy5jb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBjb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlbjpcbiAgICAgICAgdGhpcy5jb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlbj8uY29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW4gfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIHByb2Nlc3NDb25zdW1lclRyYW5zcG9ydHM6XG4gICAgICAgIHRoaXMucHJvY2Vzc0NvbnN1bWVyVHJhbnNwb3J0cz8ucHJvY2Vzc0NvbnN1bWVyVHJhbnNwb3J0cyB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgcmVzdW1lUGF1c2VTdHJlYW1zOlxuICAgICAgICB0aGlzLnJlc3VtZVBhdXNlU3RyZWFtcz8ucmVzdW1lUGF1c2VTdHJlYW1zIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICByZWFkanVzdDpcbiAgICAgICAgdGhpcy5yZWFkanVzdD8ucmVhZGp1c3QgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGNoZWNrR3JpZDpcbiAgICAgICAgdGhpcy5jaGVja0dyaWQ/LmNoZWNrR3JpZCB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgZ2V0RXN0aW1hdGU6XG4gICAgICAgIHRoaXMuZ2V0RXN0aW1hdGU/LmdldEVzdGltYXRlIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBjYWxjdWxhdGVSb3dzQW5kQ29sdW1uczpcbiAgICAgICAgdGhpcy5jYWxjdWxhdGVSb3dzQW5kQ29sdW1ucz8uY2FsY3VsYXRlUm93c0FuZENvbHVtbnMgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGFkZFZpZGVvc0dyaWQ6XG4gICAgICAgIHRoaXMuYWRkVmlkZW9zR3JpZD8uYWRkVmlkZW9zR3JpZCB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgb25TY3JlZW5DaGFuZ2VzOlxuICAgICAgICB0aGlzLm9uU2NyZWVuQ2hhbmdlcz8ub25TY3JlZW5DaGFuZ2VzIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBzbGVlcDpcbiAgICAgICAgc2xlZXAgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGNoYW5nZVZpZHM6XG4gICAgICAgIHRoaXMuY2hhbmdlVmlkcz8uY2hhbmdlVmlkcyB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgY29tcGFyZUFjdGl2ZU5hbWVzOlxuICAgICAgICB0aGlzLmNvbXBhcmVBY3RpdmVOYW1lcz8uY29tcGFyZUFjdGl2ZU5hbWVzIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBjb21wYXJlU2NyZWVuU3RhdGVzOlxuICAgICAgICB0aGlzLmNvbXBhcmVTY3JlZW5TdGF0ZXM/LmNvbXBhcmVTY3JlZW5TdGF0ZXMgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGNyZWF0ZVNlbmRUcmFuc3BvcnQ6XG4gICAgICAgIHRoaXMuY3JlYXRlU2VuZFRyYW5zcG9ydD8uY3JlYXRlU2VuZFRyYW5zcG9ydCB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgcmVzdW1lU2VuZFRyYW5zcG9ydEF1ZGlvOlxuICAgICAgICB0aGlzLnJlc3VtZVNlbmRUcmFuc3BvcnRBdWRpbz8ucmVzdW1lU2VuZFRyYW5zcG9ydEF1ZGlvIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICByZWNlaXZlQWxsUGlwZWRUcmFuc3BvcnRzOlxuICAgICAgICB0aGlzLnJlY2VpdmVBbGxQaXBlZFRyYW5zcG9ydHM/LnJlY2VpdmVBbGxQaXBlZFRyYW5zcG9ydHMgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGRpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0VmlkZW86XG4gICAgICAgIHRoaXMuZGlzY29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlbz8uZGlzY29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlbyB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgZGlzY29ubmVjdFNlbmRUcmFuc3BvcnRBdWRpbzpcbiAgICAgICAgdGhpcy5kaXNjb25uZWN0U2VuZFRyYW5zcG9ydEF1ZGlvPy5kaXNjb25uZWN0U2VuZFRyYW5zcG9ydEF1ZGlvIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBkaXNjb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlbjpcbiAgICAgICAgdGhpcy5kaXNjb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlbj8uZGlzY29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW4gfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGdldFBpcGVkUHJvZHVjZXJzQWx0OlxuICAgICAgICB0aGlzLmdldFBpcGVkUHJvZHVjZXJzQWx0Py5nZXRQaXBlZFByb2R1Y2Vyc0FsdCB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgc2lnbmFsTmV3Q29uc3VtZXJUcmFuc3BvcnQ6XG4gICAgICAgIHRoaXMuc2lnbmFsTmV3Q29uc3VtZXJUcmFuc3BvcnQ/LnNpZ25hbE5ld0NvbnN1bWVyVHJhbnNwb3J0IHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBjb25uZWN0UmVjdlRyYW5zcG9ydDpcbiAgICAgICAgdGhpcy5jb25uZWN0UmVjdlRyYW5zcG9ydD8uY29ubmVjdFJlY3ZUcmFuc3BvcnQgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIHJlVXBkYXRlSW50ZXI6XG4gICAgICAgIHRoaXMucmVVcGRhdGVJbnRlcj8ucmVVcGRhdGVJbnRlciB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgdXBkYXRlUGFydGljaXBhbnRBdWRpb0RlY2liZWxzOlxuICAgICAgICB0aGlzLnVwZGF0ZVBhcnRpY2lwYW50QXVkaW9EZWNpYmVscz8udXBkYXRlUGFydGljaXBhbnRBdWRpb0RlY2liZWxzIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBjbG9zZUFuZFJlc2l6ZTpcbiAgICAgICAgdGhpcy5jbG9zZUFuZFJlc2l6ZT8uY2xvc2VBbmRSZXNpemUgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGF1dG9BZGp1c3Q6XG4gICAgICAgIHRoaXMuYXV0b0FkanVzdD8uYXV0b0FkanVzdCB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgc3dpdGNoVXNlclZpZGVvQWx0OlxuICAgICAgICB0aGlzLnN3aXRjaFVzZXJWaWRlb0FsdD8uc3dpdGNoVXNlclZpZGVvQWx0IHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBzd2l0Y2hVc2VyVmlkZW86XG4gICAgICAgIHRoaXMuc3dpdGNoVXNlclZpZGVvPy5zd2l0Y2hVc2VyVmlkZW8gfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIHN3aXRjaFVzZXJBdWRpbzpcbiAgICAgICAgdGhpcy5zd2l0Y2hVc2VyQXVkaW8/LnN3aXRjaFVzZXJBdWRpbyB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgZ2V0RG9tYWluczpcbiAgICAgICAgdGhpcy5nZXREb21haW5zPy5nZXREb21haW5zIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBmb3JtYXROdW1iZXI6XG4gICAgICAgIHRoaXMuZm9ybWF0TnVtYmVyPy5mb3JtYXROdW1iZXIgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGNvbm5lY3RJcHM6XG4gICAgICAgIHRoaXMuY29ubmVjdElwcz8uY29ubmVjdElwcyB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgY3JlYXRlRGV2aWNlQ2xpZW50OlxuICAgICAgICB0aGlzLmNyZWF0ZURldmljZUNsaWVudD8uY3JlYXRlRGV2aWNlQ2xpZW50IHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBoYW5kbGVDcmVhdGVQb2xsOlxuICAgICAgICB0aGlzLmhhbmRsZUNyZWF0ZVBvbGw/LmhhbmRsZUNyZWF0ZVBvbGwgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGhhbmRsZUVuZFBvbGw6XG4gICAgICAgIHRoaXMuaGFuZGxlRW5kUG9sbD8uaGFuZGxlRW5kUG9sbCB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgaGFuZGxlVm90ZVBvbGw6XG4gICAgICAgIHRoaXMuaGFuZGxlVm90ZVBvbGw/LmhhbmRsZVZvdGVQb2xsIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBjYXB0dXJlQ2FudmFzU3RyZWFtOlxuICAgICAgICB0aGlzLmNhcHR1cmVDYW52YXNTdHJlYW0/LmNhcHR1cmVDYW52YXNTdHJlYW0gfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIHJlc3VtZVBhdXNlQXVkaW9TdHJlYW1zOlxuICAgICAgICB0aGlzLnJlc3VtZVBhdXNlQXVkaW9TdHJlYW1zPy5yZXN1bWVQYXVzZUF1ZGlvU3RyZWFtcyB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgcHJvY2Vzc0NvbnN1bWVyVHJhbnNwb3J0c0F1ZGlvOlxuICAgICAgICB0aGlzLnByb2Nlc3NDb25zdW1lclRyYW5zcG9ydHNBdWRpbz8ucHJvY2Vzc0NvbnN1bWVyVHJhbnNwb3J0c0F1ZGlvIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBjaGVja1Blcm1pc3Npb246XG4gICAgICAgIHRoaXMuY2hlY2tQZXJtaXNzaW9uPy5jaGVja1Blcm1pc3Npb24gfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIHN0cmVhbVN1Y2Nlc3NWaWRlbzpcbiAgICAgICAgdGhpcy5zdHJlYW1TdWNjZXNzVmlkZW8/LnN0cmVhbVN1Y2Nlc3NWaWRlbyB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgc3RyZWFtU3VjY2Vzc0F1ZGlvOlxuICAgICAgICB0aGlzLnN0cmVhbVN1Y2Nlc3NBdWRpbz8uc3RyZWFtU3VjY2Vzc0F1ZGlvIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBzdHJlYW1TdWNjZXNzU2NyZWVuOlxuICAgICAgICB0aGlzLnN0cmVhbVN1Y2Nlc3NTY3JlZW4/LnN0cmVhbVN1Y2Nlc3NTY3JlZW4gfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIHN0cmVhbVN1Y2Nlc3NBdWRpb1N3aXRjaDpcbiAgICAgICAgdGhpcy5zdHJlYW1TdWNjZXNzQXVkaW9Td2l0Y2g/LnN0cmVhbVN1Y2Nlc3NBdWRpb1N3aXRjaCB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgY2xpY2tWaWRlbzpcbiAgICAgICAgdGhpcy5jbGlja1ZpZGVvPy5jbGlja1ZpZGVvIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBjbGlja0F1ZGlvOlxuICAgICAgICB0aGlzLmNsaWNrQXVkaW8/LmNsaWNrQXVkaW8gfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGNsaWNrU2NyZWVuU2hhcmU6XG4gICAgICAgIHRoaXMuY2xpY2tTY3JlZW5TaGFyZT8uY2xpY2tTY3JlZW5TaGFyZSB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgcmVxdWVzdFBlcm1pc3Npb25DYW1lcmE6XG4gICAgICAgIHRoaXMucmVxdWVzdFBlcm1pc3Npb25DYW1lcmEgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIHJlcXVlc3RQZXJtaXNzaW9uQXVkaW86XG4gICAgICAgIHRoaXMucmVxdWVzdFBlcm1pc3Npb25BdWRpbyB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgIH07XG4gIH07XG5cbiAgdmFsaWRhdGVkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGxvY2FsVUlNb2RlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHNvY2tldCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8U29ja2V0Pih7fSBhcyBTb2NrZXQpO1xuICByb29tRGF0YSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UmVzcG9uc2VKb2luUm9vbSB8IG51bGw+KG51bGwpO1xuICBkZXZpY2UgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PERldmljZSB8IG51bGw+KG51bGwpO1xuICBhcGlLZXkgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oXG4gICAgJzAyMTE5Mzc0MmM5MzVjNDQzNGQyNWQ3NTkyMzYyNTc1ZmNiNmQ2NTkwYjZjMzgzMzRhMmYzZTA2YzgzYWY3NTgnLFxuICApO1xuICBhcGlVc2VyTmFtZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignYWJjZGVmZ2gnKTtcbiAgYXBpVG9rZW4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICBsaW5rID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcblxuICByb29tTmFtZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gIG1lbWJlciA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gIGFkbWluUGFzc2NvZGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICBpc2xldmVsID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcxJyk7XG4gIGNvSG9zdCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignTm8gY29Ib3N0Jyk7XG4gIGNvSG9zdFJlc3BvbnNpYmlsaXR5ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxDb0hvc3RSZXNwb25zaWJpbGl0eVtdPihbXG4gICAgeyBuYW1lOiAncGFydGljaXBhbnRzJywgdmFsdWU6IGZhbHNlLCBkZWRpY2F0ZWQ6IGZhbHNlIH0sXG4gICAgeyBuYW1lOiAnbWVkaWEnLCB2YWx1ZTogZmFsc2UsIGRlZGljYXRlZDogZmFsc2UgfSxcbiAgICB7IG5hbWU6ICd3YWl0aW5nJywgdmFsdWU6IGZhbHNlLCBkZWRpY2F0ZWQ6IGZhbHNlIH0sXG4gICAgeyBuYW1lOiAnY2hhdCcsIHZhbHVlOiBmYWxzZSwgZGVkaWNhdGVkOiBmYWxzZSB9LFxuICBdKTtcbiAgeW91QXJlQ29Ib3N0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHlvdUFyZUhvc3QgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgY29uZmlybWVkVG9SZWNvcmQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgbWVldGluZ0Rpc3BsYXlUeXBlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCdtZWRpYScpO1xuICBtZWV0aW5nVmlkZW9PcHRpbWl6ZWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgZXZlbnRUeXBlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxFdmVudFR5cGU+KCdjb25mZXJlbmNlJyk7XG4gIHBhcnRpY2lwYW50cyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UGFydGljaXBhbnRbXT4oW10pO1xuICBmaWx0ZXJlZFBhcnRpY2lwYW50cyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UGFydGljaXBhbnRbXT4oW10pO1xuICBwYXJ0aWNpcGFudHNDb3VudGVyID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICBwYXJ0aWNpcGFudHNGaWx0ZXIgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuXG4gIGNvbnN1bWVfc29ja2V0cyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Q29uc3VtZVNvY2tldFtdPihbXSk7XG4gIHJ0cENhcGFiaWxpdGllcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UnRwQ2FwYWJpbGl0aWVzIHwgbnVsbD4obnVsbCk7XG4gIHJvb21SZWN2SVBzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmdbXT4oW10pO1xuICBtZWV0aW5nUm9vbVBhcmFtcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8TWVldGluZ1Jvb21QYXJhbXMgfCBudWxsPihudWxsKTtcbiAgaXRlbVBhZ2VMaW1pdCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPig0KTtcbiAgYXVkaW9Pbmx5Um9vbSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBhZGRGb3JCYXNpYyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBzY3JlZW5QYWdlTGltaXQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oNCk7XG4gIHNoYXJlU2NyZWVuU3RhcnRlZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBzaGFyZWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgdGFyZ2V0T3JpZW50YXRpb24gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJ2xhbmRzY2FwZScpO1xuICB0YXJnZXRSZXNvbHV0aW9uID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCdzZCcpO1xuICB0YXJnZXRSZXNvbHV0aW9uSG9zdCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignc2QnKTtcbiAgdmlkQ29ucyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8VmlkQ29ucz4oeyB3aWR0aDogNjQwLCBoZWlnaHQ6IDM2MCB9KTtcbiAgZnJhbWVSYXRlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDEwKTtcbiAgaFBhcmFtcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8SFBhcmFtc1R5cGU+KHt9IGFzIEhQYXJhbXNUeXBlKTtcbiAgdlBhcmFtcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8VlBhcmFtc1R5cGU+KHt9IGFzIFZQYXJhbXNUeXBlKTtcbiAgc2NyZWVuUGFyYW1zID0gbmV3IEJlaGF2aW9yU3ViamVjdDxTY3JlZW5QYXJhbXNUeXBlPih7fSBhcyBTY3JlZW5QYXJhbXNUeXBlKTtcbiAgYVBhcmFtcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8QVBhcmFtc1R5cGU+KHt9IGFzIEFQYXJhbXNUeXBlKTtcblxuICByZWNvcmRpbmdBdWRpb1BhdXNlc0xpbWl0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICByZWNvcmRpbmdBdWRpb1BhdXNlc0NvdW50ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICByZWNvcmRpbmdBdWRpb1N1cHBvcnQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgcmVjb3JkaW5nQXVkaW9QZW9wbGVMaW1pdCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgcmVjb3JkaW5nQXVkaW9QYXJ0aWNpcGFudHNUaW1lTGltaXQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG4gIHJlY29yZGluZ1ZpZGVvUGF1c2VzQ291bnQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG4gIHJlY29yZGluZ1ZpZGVvUGF1c2VzTGltaXQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG4gIHJlY29yZGluZ1ZpZGVvU3VwcG9ydCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICByZWNvcmRpbmdWaWRlb1Blb3BsZUxpbWl0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICByZWNvcmRpbmdWaWRlb1BhcnRpY2lwYW50c1RpbWVMaW1pdCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgcmVjb3JkaW5nQWxsUGFydGljaXBhbnRzU3VwcG9ydCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICByZWNvcmRpbmdWaWRlb1BhcnRpY2lwYW50c1N1cHBvcnQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgcmVjb3JkaW5nQWxsUGFydGljaXBhbnRzRnVsbFJvb21TdXBwb3J0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHJlY29yZGluZ1ZpZGVvUGFydGljaXBhbnRzRnVsbFJvb21TdXBwb3J0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHJlY29yZGluZ1ByZWZlcnJlZE9yaWVudGF0aW9uID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCdsYW5kc2NhcGUnKTtcbiAgcmVjb3JkaW5nU3VwcG9ydEZvck90aGVyT3JpZW50YXRpb24gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgcmVjb3JkaW5nTXVsdGlGb3JtYXRzU3VwcG9ydCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIHVzZXJSZWNvcmRpbmdQYXJhbXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFVzZXJSZWNvcmRpbmdQYXJhbXM+KHtcbiAgICBtYWluU3BlY3M6IHtcbiAgICAgIG1lZGlhT3B0aW9uczogJ3ZpZGVvJywgLy8gJ2F1ZGlvJywgJ3ZpZGVvJ1xuICAgICAgYXVkaW9PcHRpb25zOiAnYWxsJywgLy8gJ2FsbCcsICdvblNjcmVlbicsICdob3N0J1xuICAgICAgdmlkZW9PcHRpb25zOiAnYWxsJywgLy8gJ2FsbCcsICdtYWluU2NyZWVuJ1xuICAgICAgdmlkZW9UeXBlOiAnZnVsbERpc3BsYXknLCAvLyAnYWxsJywgJ2Jlc3REaXNwbGF5JywgJ2Z1bGxEaXNwbGF5J1xuICAgICAgdmlkZW9PcHRpbWl6ZWQ6IGZhbHNlLCAvLyB0cnVlLCBmYWxzZVxuICAgICAgcmVjb3JkaW5nRGlzcGxheVR5cGU6ICdtZWRpYScsIC8vICdtZWRpYScsICd2aWRlbycsICdhbGwnXG4gICAgICBhZGRITFM6IGZhbHNlLCAvLyB0cnVlLCBmYWxzZVxuICAgIH0sXG4gICAgZGlzcFNwZWNzOiB7XG4gICAgICBuYW1lVGFnczogdHJ1ZSwgLy8gdHJ1ZSwgZmFsc2VcbiAgICAgIGJhY2tncm91bmRDb2xvcjogJyMwMDAwMDAnLCAvLyAnIzAwMDAwMCcsICcjZmZmZmZmJ1xuICAgICAgbmFtZVRhZ3NDb2xvcjogJyNmZmZmZmYnLCAvLyAnIzAwMDAwMCcsICcjZmZmZmZmJ1xuICAgICAgb3JpZW50YXRpb25WaWRlbzogJ3BvcnRyYWl0JywgLy8gJ2xhbmRzY2FwZScsICdwb3J0cmFpdCcsICdhbGwnXG4gICAgfSxcbiAgfSk7XG5cbiAgY2FuUmVjb3JkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHN0YXJ0UmVwb3J0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGVuZFJlcG9ydCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICByZWNvcmRUaW1lckludGVydmFsID0gbmV3IEJlaGF2aW9yU3ViamVjdDxOb2RlSlMuVGltZW91dCB8IG51bGw+KG51bGwpO1xuICByZWNvcmRTdGFydFRpbWUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG4gIHJlY29yZEVsYXBzZWRUaW1lID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICBpc1RpbWVyUnVubmluZyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBjYW5QYXVzZVJlc3VtZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICByZWNvcmRDaGFuZ2VTZWNvbmRzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDE1MDAwKTtcbiAgcGF1c2VMaW1pdCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgcGF1c2VSZWNvcmRDb3VudCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgY2FuTGF1bmNoUmVjb3JkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPih0cnVlKTtcbiAgc3RvcExhdW5jaFJlY29yZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIHBhcnRpY2lwYW50c0FsbCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UGFydGljaXBhbnRbXT4oW10pO1xuXG4gIGZpcnN0QWxsID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHVwZGF0ZU1haW5XaW5kb3cgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgZmlyc3Rfcm91bmQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgbGFuZFNjYXBlZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBsb2NrX3NjcmVlbiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBzY3JlZW5JZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gIGFsbFZpZGVvU3RyZWFtcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8KFBhcnRpY2lwYW50IHwgU3RyZWFtKVtdPihbXSk7XG4gIG5ld0xpbWl0ZWRTdHJlYW1zID0gbmV3IEJlaGF2aW9yU3ViamVjdDwoUGFydGljaXBhbnQgfCBTdHJlYW0pW10+KFtdKTtcbiAgbmV3TGltaXRlZFN0cmVhbXNJRHMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZ1tdPihbXSk7XG4gIGFjdGl2ZVNvdW5kcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nW10+KFtdKTtcbiAgc2NyZWVuU2hhcmVJRFN0cmVhbSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gIHNjcmVlblNoYXJlTmFtZVN0cmVhbSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gIGFkbWluSURTdHJlYW0gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICBhZG1pbk5hbWVTdHJlYW0gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICB5b3VZb3VTdHJlYW0gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PChQYXJ0aWNpcGFudCB8IFN0cmVhbSlbXT4oW10pO1xuICB5b3VZb3VTdHJlYW1JRHMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZ1tdPihbXSk7XG4gIGxvY2FsU3RyZWFtID0gbmV3IEJlaGF2aW9yU3ViamVjdDxNZWRpYVN0cmVhbSB8IG51bGw+KG51bGwpO1xuICByZWNvcmRTdGFydGVkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHJlY29yZFJlc3VtZWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgcmVjb3JkUGF1c2VkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHJlY29yZFN0b3BwZWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgYWRtaW5SZXN0cmljdFNldHRpbmcgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgdmlkZW9SZXF1ZXN0U3RhdGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZyB8IG51bGw+KG51bGwpO1xuICB2aWRlb1JlcXVlc3RUaW1lID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICB2aWRlb0FjdGlvbiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBsb2NhbFN0cmVhbVZpZGVvID0gbmV3IEJlaGF2aW9yU3ViamVjdDxNZWRpYVN0cmVhbSB8IG51bGw+KG51bGwpO1xuICB1c2VyRGVmYXVsdFZpZGVvSW5wdXREZXZpY2UgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICBjdXJyZW50RmFjaW5nTW9kZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPigndXNlcicpO1xuICBwcmV2RmFjaW5nTW9kZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPigndXNlcicpO1xuICBkZWZWaWRlb0lEID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcbiAgYWxsb3dlZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBkaXNwQWN0aXZlTmFtZXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZ1tdPihbXSk7XG4gIHBfZGlzcEFjdGl2ZU5hbWVzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmdbXT4oW10pO1xuICBhY3RpdmVOYW1lcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nW10+KFtdKTtcbiAgcHJldkFjdGl2ZU5hbWVzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmdbXT4oW10pO1xuICBwX2FjdGl2ZU5hbWVzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmdbXT4oW10pO1xuICBtZW1iZXJzUmVjZWl2ZWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgZGVmZXJTY3JlZW5SZWNlaXZlZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBob3N0Rmlyc3RTd2l0Y2ggPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgbWljQWN0aW9uID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHNjcmVlbkFjdGlvbiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBjaGF0QWN0aW9uID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGF1ZGlvUmVxdWVzdFN0YXRlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmcgfCBudWxsPihudWxsKTtcbiAgc2NyZWVuUmVxdWVzdFN0YXRlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmcgfCBudWxsPihudWxsKTtcbiAgY2hhdFJlcXVlc3RTdGF0ZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG4gIGF1ZGlvUmVxdWVzdFRpbWUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG4gIHNjcmVlblJlcXVlc3RUaW1lID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICBjaGF0UmVxdWVzdFRpbWUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG4gIHVwZGF0ZVJlcXVlc3RJbnRlcnZhbFNlY29uZHMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMjQwKTtcbiAgb2xkU291bmRJZHMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZ1tdPihbXSk7XG4gIGhvc3RMYWJlbCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignSG9zdCcpO1xuICBtYWluU2NyZWVuRmlsbGVkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGxvY2FsU3RyZWFtU2NyZWVuID0gbmV3IEJlaGF2aW9yU3ViamVjdDxNZWRpYVN0cmVhbSB8IG51bGw+KG51bGwpO1xuICBzY3JlZW5BbHJlYWR5T24gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgY2hhdEFscmVhZHlPbiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICByZWRpcmVjdFVSTCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gIG9sZEFsbFN0cmVhbXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PChQYXJ0aWNpcGFudCB8IFN0cmVhbSlbXT4oW10pO1xuICBhZG1pblZpZElEID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcbiAgc3RyZWFtTmFtZXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFN0cmVhbVtdPihbXSk7XG4gIG5vbl9hbFZpZGVvU3RyZWFtcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UGFydGljaXBhbnRbXT4oW10pO1xuICBzb3J0QXVkaW9Mb3VkbmVzcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBhdWRpb0RlY2liZWxzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxBdWRpb0RlY2liZWxzW10+KFtdKTtcbiAgbWl4ZWRfYWxWaWRlb1N0cmVhbXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PChQYXJ0aWNpcGFudCB8IFN0cmVhbSlbXT4oW10pO1xuICBub25fYWxWaWRlb1N0cmVhbXNfbXV0ZWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFBhcnRpY2lwYW50W10+KFtdKTtcbiAgcGFnaW5hdGVkU3RyZWFtcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8KFBhcnRpY2lwYW50IHwgU3RyZWFtKVtdW10+KFtdKTtcbiAgbG9jYWxTdHJlYW1BdWRpbyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8TWVkaWFTdHJlYW0gfCBudWxsPihudWxsKTtcbiAgZGVmQXVkaW9JRCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gIHVzZXJEZWZhdWx0QXVkaW9JbnB1dERldmljZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gIHVzZXJEZWZhdWx0QXVkaW9PdXRwdXREZXZpY2UgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICBwcmV2QXVkaW9JbnB1dERldmljZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gIHByZXZWaWRlb0lucHV0RGV2aWNlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcbiAgYXVkaW9QYXVzZWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgbWFpblNjcmVlblBlcnNvbiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gIGFkbWluT25NYWluU2NyZWVuID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHNjcmVlblN0YXRlcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8U2NyZWVuU3RhdGVbXT4oW1xuICAgIHtcbiAgICAgIG1haW5TY3JlZW5QZXJzb246ICcnLFxuICAgICAgbWFpblNjcmVlblByb2R1Y2VySWQ6ICcnLFxuICAgICAgbWFpblNjcmVlbkZpbGxlZDogZmFsc2UsXG4gICAgICBhZG1pbk9uTWFpblNjcmVlbjogZmFsc2UsXG4gICAgfSxcbiAgXSk7XG4gIHByZXZTY3JlZW5TdGF0ZXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFNjcmVlblN0YXRlW10+KFtcbiAgICB7XG4gICAgICBtYWluU2NyZWVuUGVyc29uOiAnJyxcbiAgICAgIG1haW5TY3JlZW5Qcm9kdWNlcklkOiAnJyxcbiAgICAgIG1haW5TY3JlZW5GaWxsZWQ6IGZhbHNlLFxuICAgICAgYWRtaW5Pbk1haW5TY3JlZW46IGZhbHNlLFxuICAgIH0sXG4gIF0pO1xuICB1cGRhdGVEYXRlU3RhdGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlciB8IG51bGw+KG51bGwpO1xuICBsYXN0VXBkYXRlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXIgfCBudWxsPihudWxsKTtcbiAgbkZvclJlYWRqdXN0UmVjb3JkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICBmaXhlZFBhZ2VMaW1pdCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPig0KTtcbiAgcmVtb3ZlQWx0R3JpZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBuRm9yUmVhZGp1c3QgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG4gIHJlb3JkZXJJbnRlcnZhbCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigzMDAwMCk7XG4gIGZhc3RSZW9yZGVySW50ZXJ2YWwgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMTAwMDApO1xuICBsYXN0UmVvcmRlclRpbWUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG4gIGF1ZFN0cmVhbU5hbWVzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxTdHJlYW1bXT4oW10pO1xuICBjdXJyZW50VXNlclBhZ2UgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG4gIG1haW5IZWlnaHRXaWR0aCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPihcbiAgICB0aGlzLmV2ZW50VHlwZS52YWx1ZSA9PSAnd2ViaW5hcicgPyA2NyA6IHRoaXMuZXZlbnRUeXBlLnZhbHVlID09ICdicm9hZGNhc3QnID8gMTAwIDogMCxcbiAgKTtcbiAgcHJldk1haW5IZWlnaHRXaWR0aCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPih0aGlzLm1haW5IZWlnaHRXaWR0aC52YWx1ZSk7XG4gIHByZXZEb1BhZ2luYXRlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGRvUGFnaW5hdGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgc2hhcmVFbmRlZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBsU3RyZWFtcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8KFBhcnRpY2lwYW50IHwgU3RyZWFtKVtdPihbXSk7XG4gIGNoYXRSZWZTdHJlYW1zID0gbmV3IEJlaGF2aW9yU3ViamVjdDwoUGFydGljaXBhbnQgfCBTdHJlYW0pW10+KFtdKTtcbiAgY29udHJvbEhlaWdodCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPihcbiAgICB0aGlzLmV2ZW50VHlwZS52YWx1ZSA9PT0gJ3dlYmluYXInIHx8IHRoaXMuZXZlbnRUeXBlLnZhbHVlID09PSAnY29uZmVyZW5jZScgPyAwIDogMC4wNixcbiAgKTtcbiAgaXNXaWRlU2NyZWVuID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGlzTWVkaXVtU2NyZWVuID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGlzU21hbGxTY3JlZW4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgYWRkR3JpZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBhZGRBbHRHcmlkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGdyaWRSb3dzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICBncmlkQ29scyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgYWx0R3JpZFJvd3MgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG4gIGFsdEdyaWRDb2xzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICBudW1iZXJQYWdlcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgY3VycmVudFN0cmVhbXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PChQYXJ0aWNpcGFudCB8IFN0cmVhbSlbXT4oW10pO1xuICBzaG93TWluaVZpZXcgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgblN0cmVhbSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8TWVkaWFTdHJlYW0gfCBudWxsPihudWxsKTtcbiAgZGVmZXJfcmVjZWl2ZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBhbGxBdWRpb1N0cmVhbXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PChQYXJ0aWNpcGFudCB8IFN0cmVhbSlbXT4oW10pO1xuICByZW1vdGVTY3JlZW5TdHJlYW0gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFN0cmVhbVtdPihbXSk7XG4gIHNjcmVlblByb2R1Y2VyID0gbmV3IEJlaGF2aW9yU3ViamVjdDxQcm9kdWNlciB8IG51bGw+KG51bGwpO1xuICBnb3RBbGxWaWRzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHBhZ2luYXRpb25IZWlnaHRXaWR0aCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPig0MCk7XG4gIHBhZ2luYXRpb25EaXJlY3Rpb24gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PCdob3Jpem9udGFsJyB8ICd2ZXJ0aWNhbCc+KCdob3Jpem9udGFsJyk7XG4gIGdyaWRTaXplcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8R3JpZFNpemVzPih7XG4gICAgZ3JpZFdpZHRoOiAwLFxuICAgIGdyaWRIZWlnaHQ6IDAsXG4gICAgYWx0R3JpZFdpZHRoOiAwLFxuICAgIGFsdEdyaWRIZWlnaHQ6IDAsXG4gIH0pO1xuICBzY3JlZW5Gb3JjZUZ1bGxEaXNwbGF5ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIG1haW5HcmlkU3RyZWFtID0gbmV3IEJlaGF2aW9yU3ViamVjdDxDdXN0b21NZWRpYUNvbXBvbmVudFtdPihbXSk7XG4gIG90aGVyR3JpZFN0cmVhbXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEN1c3RvbU1lZGlhQ29tcG9uZW50W11bXT4oW10pO1xuICBhdWRpb09ubHlTdHJlYW1zID0gbmV3IEJlaGF2aW9yU3ViamVjdDxDdXN0b21NZWRpYUNvbXBvbmVudFtdPihbXSk7XG4gIHZpZGVvSW5wdXRzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxNZWRpYURldmljZUluZm9bXT4oW10pO1xuICBhdWRpb0lucHV0cyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8TWVkaWFEZXZpY2VJbmZvW10+KFtdKTtcbiAgbWVldGluZ1Byb2dyZXNzVGltZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignMDA6MDA6MDAnKTtcbiAgbWVldGluZ0VsYXBzZWRUaW1lID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICByZWZfcGFydGljaXBhbnRzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxQYXJ0aWNpcGFudFtdPihbXSk7XG5cbiAgdXBkYXRlVmFsaWRhdGVkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy52YWxpZGF0ZWQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlU29ja2V0ID0gKHZhbHVlOiBTb2NrZXQpID0+IHtcbiAgICB0aGlzLnNvY2tldC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVEZXZpY2UgPSAodmFsdWU6IERldmljZSB8IG51bGwpID0+IHtcbiAgICB0aGlzLmRldmljZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSb29tRGF0YSA9ICh2YWx1ZTogUmVzcG9uc2VKb2luUm9vbSB8IG51bGwpID0+IHtcbiAgICB0aGlzLnJvb21EYXRhLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUFwaUtleSA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5hcGlLZXkubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQXBpVXNlck5hbWUgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMuYXBpVXNlck5hbWUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQXBpVG9rZW4gPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMuYXBpVG9rZW4ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTGluayA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5saW5rLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJvb21OYW1lID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLnJvb21OYW1lLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZU1lbWJlciA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5tZW1iZXIubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQWRtaW5QYXNzY29kZSA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5hZG1pblBhc3Njb2RlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUlzbGV2ZWwgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMuaXNsZXZlbC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVDb0hvc3QgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMuY29Ib3N0Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUNvSG9zdFJlc3BvbnNpYmlsaXR5ID0gKHZhbHVlOiBDb0hvc3RSZXNwb25zaWJpbGl0eVtdKSA9PiB7XG4gICAgdGhpcy5jb0hvc3RSZXNwb25zaWJpbGl0eS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVZb3VBcmVDb0hvc3QgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnlvdUFyZUNvSG9zdC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVZb3VBcmVIb3N0ID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy55b3VBcmVIb3N0Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUNvbmZpcm1lZFRvUmVjb3JkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5jb25maXJtZWRUb1JlY29yZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVNZWV0aW5nRGlzcGxheVR5cGUgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMubWVldGluZ0Rpc3BsYXlUeXBlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZU1lZXRpbmdWaWRlb09wdGltaXplZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMubWVldGluZ1ZpZGVvT3B0aW1pemVkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUV2ZW50VHlwZSA9ICh2YWx1ZTogRXZlbnRUeXBlKSA9PiB7XG4gICAgdGhpcy5ldmVudFR5cGUubmV4dCh2YWx1ZSk7XG4gICAgaWYgKHZhbHVlICE9ICdub25lJykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5oYW5kbGVSZXNpemUoKTtcbiAgICAgICAgfSwgMjAwMCk7XG4gICAgICB9IGNhdGNoIHtcbiAgICAgICAgLyogaGFuZGxlIGVycm9yICovXG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHVwZGF0ZVBhcnRpY2lwYW50cyA9ICh2YWx1ZTogUGFydGljaXBhbnRbXSkgPT4ge1xuICAgIHRoaXMucGFydGljaXBhbnRzLm5leHQodmFsdWUpO1xuICAgIHRoaXMucGFydGljaXBhbnRzQ291bnRlci5uZXh0KHZhbHVlLmxlbmd0aCk7XG4gICAgdGhpcy5maWx0ZXJlZFBhcnRpY2lwYW50cy5uZXh0KHRoaXMucGFydGljaXBhbnRzLnZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVGaWx0ZXJlZFBhcnRpY2lwYW50cyA9ICh2YWx1ZTogUGFydGljaXBhbnRbXSkgPT4ge1xuICAgIHRoaXMuZmlsdGVyZWRQYXJ0aWNpcGFudHMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUGFydGljaXBhbnRzQ291bnRlciA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5wYXJ0aWNpcGFudHNDb3VudGVyLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVBhcnRpY2lwYW50c0ZpbHRlciA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5wYXJ0aWNpcGFudHNGaWx0ZXIubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQ29uc3VtZV9zb2NrZXRzID0gKHZhbHVlOiBDb25zdW1lU29ja2V0W10pID0+IHtcbiAgICB0aGlzLmNvbnN1bWVfc29ja2V0cy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSdHBDYXBhYmlsaXRpZXMgPSAodmFsdWU6IFJ0cENhcGFiaWxpdGllcyB8IG51bGwpID0+IHtcbiAgICB0aGlzLnJ0cENhcGFiaWxpdGllcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSb29tUmVjdklQcyA9ICh2YWx1ZTogc3RyaW5nW10pID0+IHtcbiAgICB0aGlzLnJvb21SZWN2SVBzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZU1lZXRpbmdSb29tUGFyYW1zID0gKHZhbHVlOiBNZWV0aW5nUm9vbVBhcmFtcyB8IG51bGwpID0+IHtcbiAgICB0aGlzLm1lZXRpbmdSb29tUGFyYW1zLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUl0ZW1QYWdlTGltaXQgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMuaXRlbVBhZ2VMaW1pdC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBdWRpb09ubHlSb29tID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5hdWRpb09ubHlSb29tLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUFkZEZvckJhc2ljID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5hZGRGb3JCYXNpYy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVTY3JlZW5QYWdlTGltaXQgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMuc2NyZWVuUGFnZUxpbWl0Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVNoYXJlU2NyZWVuU3RhcnRlZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuc2hhcmVTY3JlZW5TdGFydGVkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVNoYXJlZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuc2hhcmVkLm5leHQodmFsdWUpO1xuICAgIHRoaXMuc2NyZWVuU2hhcmVBY3RpdmUubmV4dCh2YWx1ZSk7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICBzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcbiAgICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdyZXNpemUnKSk7XG4gICAgICB9LCAyMDAwKTtcbiAgICB9XG4gIH07XG5cbiAgdXBkYXRlVGFyZ2V0T3JpZW50YXRpb24gPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMudGFyZ2V0T3JpZW50YXRpb24ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlVGFyZ2V0UmVzb2x1dGlvbiA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy50YXJnZXRSZXNvbHV0aW9uLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVRhcmdldFJlc29sdXRpb25Ib3N0ID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLnRhcmdldFJlc29sdXRpb25Ib3N0Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVZpZENvbnMgPSAodmFsdWU6IFZpZENvbnMpID0+IHtcbiAgICB0aGlzLnZpZENvbnMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlRnJhbWVSYXRlID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLmZyYW1lUmF0ZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVIUGFyYW1zID0gKHZhbHVlOiBIUGFyYW1zVHlwZSkgPT4ge1xuICAgIHRoaXMuaFBhcmFtcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVWUGFyYW1zID0gKHZhbHVlOiBWUGFyYW1zVHlwZSkgPT4ge1xuICAgIHRoaXMudlBhcmFtcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVTY3JlZW5QYXJhbXMgPSAodmFsdWU6IFNjcmVlblBhcmFtc1R5cGUpID0+IHtcbiAgICB0aGlzLnNjcmVlblBhcmFtcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBUGFyYW1zID0gKHZhbHVlOiBBUGFyYW1zVHlwZSkgPT4ge1xuICAgIHRoaXMuYVBhcmFtcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRpbmdBdWRpb1BhdXNlc0xpbWl0ID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ0F1ZGlvUGF1c2VzTGltaXQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nQXVkaW9QYXVzZXNDb3VudCA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdBdWRpb1BhdXNlc0NvdW50Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ0F1ZGlvU3VwcG9ydCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMucmVjb3JkaW5nQXVkaW9TdXBwb3J0Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ0F1ZGlvUGVvcGxlTGltaXQgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMucmVjb3JkaW5nQXVkaW9QZW9wbGVMaW1pdC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRpbmdBdWRpb1BhcnRpY2lwYW50c1RpbWVMaW1pdCA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdBdWRpb1BhcnRpY2lwYW50c1RpbWVMaW1pdC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRpbmdWaWRlb1BhdXNlc0NvdW50ID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ1ZpZGVvUGF1c2VzQ291bnQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nVmlkZW9QYXVzZXNMaW1pdCA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdWaWRlb1BhdXNlc0xpbWl0Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ1ZpZGVvU3VwcG9ydCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMucmVjb3JkaW5nVmlkZW9TdXBwb3J0Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ1ZpZGVvUGVvcGxlTGltaXQgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMucmVjb3JkaW5nVmlkZW9QZW9wbGVMaW1pdC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRpbmdWaWRlb1BhcnRpY2lwYW50c1RpbWVMaW1pdCA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdWaWRlb1BhcnRpY2lwYW50c1RpbWVMaW1pdC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRpbmdBbGxQYXJ0aWNpcGFudHNTdXBwb3J0ID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdBbGxQYXJ0aWNpcGFudHNTdXBwb3J0Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ1ZpZGVvUGFydGljaXBhbnRzU3VwcG9ydCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMucmVjb3JkaW5nVmlkZW9QYXJ0aWNpcGFudHNTdXBwb3J0Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ0FsbFBhcnRpY2lwYW50c0Z1bGxSb29tU3VwcG9ydCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMucmVjb3JkaW5nQWxsUGFydGljaXBhbnRzRnVsbFJvb21TdXBwb3J0Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ1ZpZGVvUGFydGljaXBhbnRzRnVsbFJvb21TdXBwb3J0ID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdWaWRlb1BhcnRpY2lwYW50c0Z1bGxSb29tU3VwcG9ydC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRpbmdQcmVmZXJyZWRPcmllbnRhdGlvbiA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdQcmVmZXJyZWRPcmllbnRhdGlvbi5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRpbmdTdXBwb3J0Rm9yT3RoZXJPcmllbnRhdGlvbiA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMucmVjb3JkaW5nU3VwcG9ydEZvck90aGVyT3JpZW50YXRpb24ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nTXVsdGlGb3JtYXRzU3VwcG9ydCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMucmVjb3JkaW5nTXVsdGlGb3JtYXRzU3VwcG9ydC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVVc2VyUmVjb3JkaW5nUGFyYW1zID0gKHZhbHVlOiBVc2VyUmVjb3JkaW5nUGFyYW1zKSA9PiB7XG4gICAgdGhpcy51c2VyUmVjb3JkaW5nUGFyYW1zLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUNhblJlY29yZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuY2FuUmVjb3JkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVN0YXJ0UmVwb3J0ID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5zdGFydFJlcG9ydC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVFbmRSZXBvcnQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmVuZFJlcG9ydC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRUaW1lckludGVydmFsID0gKHZhbHVlOiBOb2RlSlMuVGltZW91dCB8IG51bGwpID0+IHtcbiAgICB0aGlzLnJlY29yZFRpbWVySW50ZXJ2YWwubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkU3RhcnRUaW1lID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLnJlY29yZFN0YXJ0VGltZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRFbGFwc2VkVGltZSA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRFbGFwc2VkVGltZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVJc1RpbWVyUnVubmluZyA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuaXNUaW1lclJ1bm5pbmcubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQ2FuUGF1c2VSZXN1bWUgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmNhblBhdXNlUmVzdW1lLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZENoYW5nZVNlY29uZHMgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMucmVjb3JkQ2hhbmdlU2Vjb25kcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVQYXVzZUxpbWl0ID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLnBhdXNlTGltaXQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUGF1c2VSZWNvcmRDb3VudCA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5wYXVzZVJlY29yZENvdW50Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUNhbkxhdW5jaFJlY29yZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuY2FuTGF1bmNoUmVjb3JkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVN0b3BMYXVuY2hSZWNvcmQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnN0b3BMYXVuY2hSZWNvcmQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUGFydGljaXBhbnRzQWxsID0gKHZhbHVlOiBQYXJ0aWNpcGFudFtdKSA9PiB7XG4gICAgdGhpcy5wYXJ0aWNpcGFudHNBbGwubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlRmlyc3RBbGwgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmZpcnN0QWxsLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVVwZGF0ZU1haW5XaW5kb3cgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnVwZGF0ZU1haW5XaW5kb3cubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlRmlyc3Rfcm91bmQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmZpcnN0X3JvdW5kLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUxhbmRTY2FwZWQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmxhbmRTY2FwZWQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTG9ja19zY3JlZW4gPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmxvY2tfc2NyZWVuLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVNjcmVlbklkID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLnNjcmVlbklkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUFsbFZpZGVvU3RyZWFtcyA9ICh2YWx1ZTogKFBhcnRpY2lwYW50IHwgU3RyZWFtKVtdKSA9PiB7XG4gICAgdGhpcy5hbGxWaWRlb1N0cmVhbXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTmV3TGltaXRlZFN0cmVhbXMgPSAodmFsdWU6IChQYXJ0aWNpcGFudCB8IFN0cmVhbSlbXSkgPT4ge1xuICAgIHRoaXMubmV3TGltaXRlZFN0cmVhbXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTmV3TGltaXRlZFN0cmVhbXNJRHMgPSAodmFsdWU6IHN0cmluZ1tdKSA9PiB7XG4gICAgdGhpcy5uZXdMaW1pdGVkU3RyZWFtc0lEcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBY3RpdmVTb3VuZHMgPSAodmFsdWU6IHN0cmluZ1tdKSA9PiB7XG4gICAgdGhpcy5hY3RpdmVTb3VuZHMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlU2NyZWVuU2hhcmVJRFN0cmVhbSA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5zY3JlZW5TaGFyZUlEU3RyZWFtLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVNjcmVlblNoYXJlTmFtZVN0cmVhbSA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5zY3JlZW5TaGFyZU5hbWVTdHJlYW0ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQWRtaW5JRFN0cmVhbSA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5hZG1pbklEU3RyZWFtLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUFkbWluTmFtZVN0cmVhbSA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5hZG1pbk5hbWVTdHJlYW0ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlWW91WW91U3RyZWFtID0gKHZhbHVlOiAoUGFydGljaXBhbnQgfCBTdHJlYW0pW10pID0+IHtcbiAgICB0aGlzLnlvdVlvdVN0cmVhbS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVZb3VZb3VTdHJlYW1JRHMgPSAodmFsdWU6IHN0cmluZ1tdKSA9PiB7XG4gICAgdGhpcy55b3VZb3VTdHJlYW1JRHMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTG9jYWxTdHJlYW0gPSAodmFsdWU6IE1lZGlhU3RyZWFtIHwgbnVsbCkgPT4ge1xuICAgIHRoaXMubG9jYWxTdHJlYW0ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkU3RhcnRlZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMucmVjb3JkU3RhcnRlZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRSZXN1bWVkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRSZXN1bWVkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZFBhdXNlZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMucmVjb3JkUGF1c2VkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZFN0b3BwZWQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnJlY29yZFN0b3BwZWQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQWRtaW5SZXN0cmljdFNldHRpbmcgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmFkbWluUmVzdHJpY3RTZXR0aW5nLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVZpZGVvUmVxdWVzdFN0YXRlID0gKHZhbHVlOiBzdHJpbmcgfCBudWxsKSA9PiB7XG4gICAgdGhpcy52aWRlb1JlcXVlc3RTdGF0ZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVWaWRlb1JlcXVlc3RUaW1lID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLnZpZGVvUmVxdWVzdFRpbWUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlVmlkZW9BY3Rpb24gPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnZpZGVvQWN0aW9uLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUxvY2FsU3RyZWFtVmlkZW8gPSAodmFsdWU6IE1lZGlhU3RyZWFtIHwgbnVsbCkgPT4ge1xuICAgIHRoaXMubG9jYWxTdHJlYW1WaWRlby5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVVc2VyRGVmYXVsdFZpZGVvSW5wdXREZXZpY2UgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMudXNlckRlZmF1bHRWaWRlb0lucHV0RGV2aWNlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUN1cnJlbnRGYWNpbmdNb2RlID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLmN1cnJlbnRGYWNpbmdNb2RlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVByZXZGYWNpbmdNb2RlID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLnByZXZGYWNpbmdNb2RlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZURlZlZpZGVvSUQgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMuZGVmVmlkZW9JRC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBbGxvd2VkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5hbGxvd2VkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZURpc3BBY3RpdmVOYW1lcyA9ICh2YWx1ZTogc3RyaW5nW10pID0+IHtcbiAgICB0aGlzLmRpc3BBY3RpdmVOYW1lcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVQX2Rpc3BBY3RpdmVOYW1lcyA9ICh2YWx1ZTogc3RyaW5nW10pID0+IHtcbiAgICB0aGlzLnBfZGlzcEFjdGl2ZU5hbWVzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUFjdGl2ZU5hbWVzID0gKHZhbHVlOiBzdHJpbmdbXSkgPT4ge1xuICAgIHRoaXMuYWN0aXZlTmFtZXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUHJldkFjdGl2ZU5hbWVzID0gKHZhbHVlOiBzdHJpbmdbXSkgPT4ge1xuICAgIHRoaXMucHJldkFjdGl2ZU5hbWVzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVBfYWN0aXZlTmFtZXMgPSAodmFsdWU6IHN0cmluZ1tdKSA9PiB7XG4gICAgdGhpcy5wX2FjdGl2ZU5hbWVzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZU1lbWJlcnNSZWNlaXZlZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMubWVtYmVyc1JlY2VpdmVkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZURlZmVyU2NyZWVuUmVjZWl2ZWQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmRlZmVyU2NyZWVuUmVjZWl2ZWQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlSG9zdEZpcnN0U3dpdGNoID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5ob3N0Rmlyc3RTd2l0Y2gubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTWljQWN0aW9uID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5taWNBY3Rpb24ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlU2NyZWVuQWN0aW9uID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5zY3JlZW5BY3Rpb24ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQ2hhdEFjdGlvbiA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuY2hhdEFjdGlvbi5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBdWRpb1JlcXVlc3RTdGF0ZSA9ICh2YWx1ZTogc3RyaW5nIHwgbnVsbCkgPT4ge1xuICAgIHRoaXMuYXVkaW9SZXF1ZXN0U3RhdGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlU2NyZWVuUmVxdWVzdFN0YXRlID0gKHZhbHVlOiBzdHJpbmcgfCBudWxsKSA9PiB7XG4gICAgdGhpcy5zY3JlZW5SZXF1ZXN0U3RhdGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQ2hhdFJlcXVlc3RTdGF0ZSA9ICh2YWx1ZTogc3RyaW5nIHwgbnVsbCkgPT4ge1xuICAgIHRoaXMuY2hhdFJlcXVlc3RTdGF0ZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBdWRpb1JlcXVlc3RUaW1lID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLmF1ZGlvUmVxdWVzdFRpbWUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlU2NyZWVuUmVxdWVzdFRpbWUgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMuc2NyZWVuUmVxdWVzdFRpbWUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQ2hhdFJlcXVlc3RUaW1lID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLmNoYXRSZXF1ZXN0VGltZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVPbGRTb3VuZElkcyA9ICh2YWx1ZTogc3RyaW5nW10pID0+IHtcbiAgICB0aGlzLm9sZFNvdW5kSWRzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUhvc3RMYWJlbCA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5ob3N0TGFiZWwubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTWFpblNjcmVlbkZpbGxlZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMubWFpblNjcmVlbkZpbGxlZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVMb2NhbFN0cmVhbVNjcmVlbiA9ICh2YWx1ZTogTWVkaWFTdHJlYW0gfCBudWxsKSA9PiB7XG4gICAgdGhpcy5sb2NhbFN0cmVhbVNjcmVlbi5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVTY3JlZW5BbHJlYWR5T24gPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnNjcmVlbkFscmVhZHlPbi5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVDaGF0QWxyZWFkeU9uID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5jaGF0QWxyZWFkeU9uLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlZGlyZWN0VVJMID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLnJlZGlyZWN0VVJMLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZU9sZEFsbFN0cmVhbXMgPSAodmFsdWU6IChQYXJ0aWNpcGFudCB8IFN0cmVhbSlbXSkgPT4ge1xuICAgIHRoaXMub2xkQWxsU3RyZWFtcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBZG1pblZpZElEID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLmFkbWluVmlkSUQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlU3RyZWFtTmFtZXMgPSAodmFsdWU6IFN0cmVhbVtdKSA9PiB7XG4gICAgdGhpcy5zdHJlYW1OYW1lcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVOb25fYWxWaWRlb1N0cmVhbXMgPSAodmFsdWU6IFBhcnRpY2lwYW50W10pID0+IHtcbiAgICB0aGlzLm5vbl9hbFZpZGVvU3RyZWFtcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVTb3J0QXVkaW9Mb3VkbmVzcyA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuc29ydEF1ZGlvTG91ZG5lc3MubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQXVkaW9EZWNpYmVscyA9ICh2YWx1ZTogQXVkaW9EZWNpYmVsc1tdKSA9PiB7XG4gICAgdGhpcy5hdWRpb0RlY2liZWxzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZU1peGVkX2FsVmlkZW9TdHJlYW1zID0gKHZhbHVlOiAoUGFydGljaXBhbnQgfCBTdHJlYW0pW10pID0+IHtcbiAgICB0aGlzLm1peGVkX2FsVmlkZW9TdHJlYW1zLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZU5vbl9hbFZpZGVvU3RyZWFtc19tdXRlZCA9ICh2YWx1ZTogUGFydGljaXBhbnRbXSkgPT4ge1xuICAgIHRoaXMubm9uX2FsVmlkZW9TdHJlYW1zX211dGVkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVBhZ2luYXRlZFN0cmVhbXMgPSAodmFsdWU6IChQYXJ0aWNpcGFudCB8IFN0cmVhbSlbXVtdKSA9PiB7XG4gICAgdGhpcy5wYWdpbmF0ZWRTdHJlYW1zLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUxvY2FsU3RyZWFtQXVkaW8gPSAodmFsdWU6IE1lZGlhU3RyZWFtIHwgbnVsbCkgPT4ge1xuICAgIHRoaXMubG9jYWxTdHJlYW1BdWRpby5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVEZWZBdWRpb0lEID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLmRlZkF1ZGlvSUQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlVXNlckRlZmF1bHRBdWRpb0lucHV0RGV2aWNlID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLnVzZXJEZWZhdWx0QXVkaW9JbnB1dERldmljZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVVc2VyRGVmYXVsdEF1ZGlvT3V0cHV0RGV2aWNlID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLnVzZXJEZWZhdWx0QXVkaW9PdXRwdXREZXZpY2UubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUHJldkF1ZGlvSW5wdXREZXZpY2UgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMucHJldkF1ZGlvSW5wdXREZXZpY2UubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUHJldlZpZGVvSW5wdXREZXZpY2UgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMucHJldlZpZGVvSW5wdXREZXZpY2UubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQXVkaW9QYXVzZWQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmF1ZGlvUGF1c2VkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZU1haW5TY3JlZW5QZXJzb24gPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMubWFpblNjcmVlblBlcnNvbi5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBZG1pbk9uTWFpblNjcmVlbiA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuYWRtaW5Pbk1haW5TY3JlZW4ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlU2NyZWVuU3RhdGVzID0gKHZhbHVlOiBTY3JlZW5TdGF0ZVtdKSA9PiB7XG4gICAgdGhpcy5zY3JlZW5TdGF0ZXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUHJldlNjcmVlblN0YXRlcyA9ICh2YWx1ZTogU2NyZWVuU3RhdGVbXSkgPT4ge1xuICAgIHRoaXMucHJldlNjcmVlblN0YXRlcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVVcGRhdGVEYXRlU3RhdGUgPSAodmFsdWU6IG51bWJlciB8IG51bGwpID0+IHtcbiAgICB0aGlzLnVwZGF0ZURhdGVTdGF0ZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVMYXN0VXBkYXRlID0gKHZhbHVlOiBudW1iZXIgfCBudWxsKSA9PiB7XG4gICAgdGhpcy5sYXN0VXBkYXRlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZU5Gb3JSZWFkanVzdFJlY29yZCA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5uRm9yUmVhZGp1c3RSZWNvcmQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlRml4ZWRQYWdlTGltaXQgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMuZml4ZWRQYWdlTGltaXQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVtb3ZlQWx0R3JpZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMucmVtb3ZlQWx0R3JpZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVORm9yUmVhZGp1c3QgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMubkZvclJlYWRqdXN0Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUxhc3RSZW9yZGVyVGltZSA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5sYXN0UmVvcmRlclRpbWUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQXVkU3RyZWFtTmFtZXMgPSAodmFsdWU6IFN0cmVhbVtdKSA9PiB7XG4gICAgdGhpcy5hdWRTdHJlYW1OYW1lcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVDdXJyZW50VXNlclBhZ2UgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMuY3VycmVudFVzZXJQYWdlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZU1haW5IZWlnaHRXaWR0aCA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5tYWluSGVpZ2h0V2lkdGgubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUHJldk1haW5IZWlnaHRXaWR0aCA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5wcmV2TWFpbkhlaWdodFdpZHRoLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVByZXZEb1BhZ2luYXRlID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5wcmV2RG9QYWdpbmF0ZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVEb1BhZ2luYXRlID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5kb1BhZ2luYXRlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVNoYXJlRW5kZWQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnNoYXJlRW5kZWQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTFN0cmVhbXMgPSAodmFsdWU6IChQYXJ0aWNpcGFudCB8IFN0cmVhbSlbXSkgPT4ge1xuICAgIHRoaXMubFN0cmVhbXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQ2hhdFJlZlN0cmVhbXMgPSAodmFsdWU6IChQYXJ0aWNpcGFudCB8IFN0cmVhbSlbXSkgPT4ge1xuICAgIHRoaXMuY2hhdFJlZlN0cmVhbXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQ29udHJvbEhlaWdodCA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5jb250cm9sSGVpZ2h0Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUlzV2lkZVNjcmVlbiA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuaXNXaWRlU2NyZWVuLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUlzTWVkaXVtU2NyZWVuID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5pc01lZGl1bVNjcmVlbi5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVJc1NtYWxsU2NyZWVuID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5pc1NtYWxsU2NyZWVuLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUFkZEdyaWQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmFkZEdyaWQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQWRkQWx0R3JpZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuYWRkQWx0R3JpZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVHcmlkUm93cyA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5ncmlkUm93cy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVHcmlkQ29scyA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5ncmlkQ29scy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBbHRHcmlkUm93cyA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5hbHRHcmlkUm93cy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBbHRHcmlkQ29scyA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5hbHRHcmlkQ29scy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVOdW1iZXJQYWdlcyA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5udW1iZXJQYWdlcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVDdXJyZW50U3RyZWFtcyA9ICh2YWx1ZTogKFBhcnRpY2lwYW50IHwgU3RyZWFtKVtdKSA9PiB7XG4gICAgdGhpcy5jdXJyZW50U3RyZWFtcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVTaG93TWluaVZpZXcgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnNob3dNaW5pVmlldy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVOU3RyZWFtID0gKHZhbHVlOiBNZWRpYVN0cmVhbSB8IG51bGwpID0+IHtcbiAgICB0aGlzLm5TdHJlYW0ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlRGVmZXJfcmVjZWl2ZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuZGVmZXJfcmVjZWl2ZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBbGxBdWRpb1N0cmVhbXMgPSAodmFsdWU6IChQYXJ0aWNpcGFudCB8IFN0cmVhbSlbXSkgPT4ge1xuICAgIHRoaXMuYWxsQXVkaW9TdHJlYW1zLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlbW90ZVNjcmVlblN0cmVhbSA9ICh2YWx1ZTogU3RyZWFtW10pID0+IHtcbiAgICB0aGlzLnJlbW90ZVNjcmVlblN0cmVhbS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVTY3JlZW5Qcm9kdWNlciA9ICh2YWx1ZTogUHJvZHVjZXIgfCBudWxsKSA9PiB7XG4gICAgdGhpcy5zY3JlZW5Qcm9kdWNlci5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVHb3RBbGxWaWRzID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5nb3RBbGxWaWRzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVBhZ2luYXRpb25IZWlnaHRXaWR0aCA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5wYWdpbmF0aW9uSGVpZ2h0V2lkdGgubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUGFnaW5hdGlvbkRpcmVjdGlvbiA9ICh2YWx1ZTogJ2hvcml6b250YWwnIHwgJ3ZlcnRpY2FsJykgPT4ge1xuICAgIHRoaXMucGFnaW5hdGlvbkRpcmVjdGlvbi5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVHcmlkU2l6ZXMgPSAodmFsdWU6IEdyaWRTaXplcykgPT4ge1xuICAgIHRoaXMuZ3JpZFNpemVzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVNjcmVlbkZvcmNlRnVsbERpc3BsYXkgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnNjcmVlbkZvcmNlRnVsbERpc3BsYXkubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTWFpbkdyaWRTdHJlYW0gPSAodmFsdWU6IEN1c3RvbU1lZGlhQ29tcG9uZW50W10pID0+IHtcbiAgICB0aGlzLm1haW5HcmlkU3RyZWFtLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZU90aGVyR3JpZFN0cmVhbXMgPSAodmFsdWU6IEN1c3RvbU1lZGlhQ29tcG9uZW50W11bXSkgPT4ge1xuICAgIHRoaXMub3RoZXJHcmlkU3RyZWFtcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBdWRpb09ubHlTdHJlYW1zID0gKHZhbHVlOiBDdXN0b21NZWRpYUNvbXBvbmVudFtdKSA9PiB7XG4gICAgdGhpcy5hdWRpb09ubHlTdHJlYW1zLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVZpZGVvSW5wdXRzID0gKHZhbHVlOiBNZWRpYURldmljZUluZm9bXSkgPT4ge1xuICAgIHRoaXMudmlkZW9JbnB1dHMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQXVkaW9JbnB1dHMgPSAodmFsdWU6IE1lZGlhRGV2aWNlSW5mb1tdKSA9PiB7XG4gICAgdGhpcy5hdWRpb0lucHV0cy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVNZWV0aW5nUHJvZ3Jlc3NUaW1lID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLm1lZXRpbmdQcm9ncmVzc1RpbWUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTWVldGluZ0VsYXBzZWRUaW1lID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLm1lZXRpbmdFbGFwc2VkVGltZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZWZfcGFydGljaXBhbnRzID0gKHZhbHVlOiBQYXJ0aWNpcGFudFtdKSA9PiB7XG4gICAgdGhpcy5yZWZfcGFydGljaXBhbnRzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIC8vIE1lc3NhZ2VzXG4gIG1lc3NhZ2VzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxNZXNzYWdlW10+KFtdKTtcbiAgc3RhcnREaXJlY3RNZXNzYWdlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGRpcmVjdE1lc3NhZ2VEZXRhaWxzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxQYXJ0aWNpcGFudCB8IG51bGw+KG51bGwpO1xuICBzaG93TWVzc2FnZXNCYWRnZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIC8vIEV2ZW50IFNldHRpbmdzXG4gIGF1ZGlvU2V0dGluZyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignYWxsb3cnKTtcbiAgdmlkZW9TZXR0aW5nID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCdhbGxvdycpO1xuICBzY3JlZW5zaGFyZVNldHRpbmcgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJ2FsbG93Jyk7XG4gIGNoYXRTZXR0aW5nID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCdhbGxvdycpO1xuXG4gIC8vIERpc3BsYXkgU2V0dGluZ3NcbiAgZGlzcGxheU9wdGlvbiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignbWVkaWEnKTtcbiAgYXV0b1dhdmUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KHRydWUpO1xuICBmb3JjZUZ1bGxEaXNwbGF5ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPih0cnVlKTtcbiAgcHJldkZvcmNlRnVsbERpc3BsYXkgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgcHJldk1lZXRpbmdEaXNwbGF5VHlwZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPigndmlkZW8nKTtcblxuICAvLyBXYWl0aW5nIFJvb21cbiAgd2FpdGluZ1Jvb21GaWx0ZXIgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICB3YWl0aW5nUm9vbUxpc3QgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFdhaXRpbmdSb29tUGFydGljaXBhbnRbXT4oXG4gICAgdGhpcy51c2VTZWVkICYmIHRoaXMuc2VlZERhdGE/LndhaXRpbmdMaXN0ID8gdGhpcy5zZWVkRGF0YS53YWl0aW5nTGlzdCA6IFtdLFxuICApO1xuICB3YWl0aW5nUm9vbUNvdW50ZXIgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG4gIGZpbHRlcmVkV2FpdGluZ1Jvb21MaXN0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxXYWl0aW5nUm9vbVBhcnRpY2lwYW50W10+KFxuICAgIHRoaXMudXNlU2VlZCAmJiB0aGlzLnNlZWREYXRhPy53YWl0aW5nTGlzdCA/IHRoaXMuc2VlZERhdGEud2FpdGluZ0xpc3QgOiBbXSxcbiAgKTtcblxuICAvLyBSZXF1ZXN0c1xuICByZXF1ZXN0RmlsdGVyID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcbiAgcmVxdWVzdExpc3QgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFJlcXVlc3RbXT4oXG4gICAgdGhpcy51c2VTZWVkICYmIHRoaXMuc2VlZERhdGE/LnJlcXVlc3RzID8gdGhpcy5zZWVkRGF0YS5yZXF1ZXN0cyA6IFtdLFxuICApO1xuICByZXF1ZXN0Q291bnRlciA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgZmlsdGVyZWRSZXF1ZXN0TGlzdCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UmVxdWVzdFtdPihcbiAgICB0aGlzLnVzZVNlZWQgJiYgdGhpcy5zZWVkRGF0YT8ucmVxdWVzdHMgPyB0aGlzLnNlZWREYXRhLnJlcXVlc3RzIDogW10sXG4gICk7XG5cbiAgLy8gVG90YWwgUmVxdWVzdHMgYW5kIFdhaXRpbmcgUm9vbVxuICB0b3RhbFJlcVdhaXQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG5cbiAgLy8gQWxlcnRzXG4gIGFsZXJ0VmlzaWJsZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBhbGVydE1lc3NhZ2UgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICBhbGVydFR5cGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PCdzdWNjZXNzJyB8ICdkYW5nZXInPignc3VjY2VzcycpO1xuICBhbGVydER1cmF0aW9uID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDMwMDApO1xuXG4gIC8vIFByb2dyZXNzIFRpbWVyXG4gIHByb2dyZXNzVGltZXJWaXNpYmxlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPih0cnVlKTtcbiAgcHJvZ3Jlc3NUaW1lclZhbHVlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuXG4gIC8vIE1lbnUgTW9kYWxzXG4gIGlzTWVudU1vZGFsVmlzaWJsZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBpc1JlY29yZGluZ01vZGFsVmlzaWJsZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBpc1NldHRpbmdzTW9kYWxWaXNpYmxlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGlzUmVxdWVzdHNNb2RhbFZpc2libGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgaXNXYWl0aW5nTW9kYWxWaXNpYmxlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGlzQ29Ib3N0TW9kYWxWaXNpYmxlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGlzTWVkaWFTZXR0aW5nc01vZGFsVmlzaWJsZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBpc0Rpc3BsYXlTZXR0aW5nc01vZGFsVmlzaWJsZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIC8vIE90aGVyIE1vZGFsc1xuICBpc1BhcnRpY2lwYW50c01vZGFsVmlzaWJsZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBpc01lc3NhZ2VzTW9kYWxWaXNpYmxlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGlzQ29uZmlybUV4aXRNb2RhbFZpc2libGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgaXNDb25maXJtSGVyZU1vZGFsVmlzaWJsZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBpc1NoYXJlRXZlbnRNb2RhbFZpc2libGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgaXNMb2FkaW5nTW9kYWxWaXNpYmxlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG5cbiAgLy8gUmVjb3JkaW5nIE9wdGlvbnNcbiAgcmVjb3JkaW5nTWVkaWFPcHRpb25zID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCd2aWRlbycpO1xuICByZWNvcmRpbmdBdWRpb09wdGlvbnMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJ2FsbCcpO1xuICByZWNvcmRpbmdWaWRlb09wdGlvbnMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJ2FsbCcpO1xuICByZWNvcmRpbmdWaWRlb1R5cGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJ2Z1bGxEaXNwbGF5Jyk7XG4gIHJlY29yZGluZ1ZpZGVvT3B0aW1pemVkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHJlY29yZGluZ0Rpc3BsYXlUeXBlID0gbmV3IEJlaGF2aW9yU3ViamVjdDwndmlkZW8nIHwgJ21lZGlhJyB8ICdhbGwnPigndmlkZW8nKTtcbiAgcmVjb3JkaW5nQWRkSExTID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPih0cnVlKTtcbiAgcmVjb3JkaW5nTmFtZVRhZ3MgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KHRydWUpO1xuICByZWNvcmRpbmdCYWNrZ3JvdW5kQ29sb3IgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJyM4M2MwZTknKTtcbiAgcmVjb3JkaW5nTmFtZVRhZ3NDb2xvciA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignI2ZmZmZmZicpO1xuICByZWNvcmRpbmdBZGRUZXh0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHJlY29yZGluZ0N1c3RvbVRleHQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJ0FkZCBUZXh0Jyk7XG4gIHJlY29yZGluZ0N1c3RvbVRleHRQb3NpdGlvbiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPigndG9wJyk7XG4gIHJlY29yZGluZ0N1c3RvbVRleHRDb2xvciA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignI2ZmZmZmZicpO1xuICByZWNvcmRpbmdPcmllbnRhdGlvblZpZGVvID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCdsYW5kc2NhcGUnKTtcbiAgY2xlYXJlZFRvUmVzdW1lID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPih0cnVlKTtcbiAgY2xlYXJlZFRvUmVjb3JkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPih0cnVlKTtcbiAgcmVjb3JkU3RhdGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJ2dyZWVuJyk7XG4gIHNob3dSZWNvcmRCdXR0b25zID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHJlY29yZGluZ1Byb2dyZXNzVGltZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignMDA6MDA6MDAnKTtcbiAgYXVkaW9Td2l0Y2hpbmcgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgdmlkZW9Td2l0Y2hpbmcgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcblxuICAvLyBNZWRpYSBTdGF0ZXNcbiAgdmlkZW9BbHJlYWR5T24gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgYXVkaW9BbHJlYWR5T24gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcblxuICBjb21wb25lbnRTaXplcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Q29tcG9uZW50U2l6ZXM+KHtcbiAgICBtYWluSGVpZ2h0OiAwLFxuICAgIG90aGVySGVpZ2h0OiAwLFxuICAgIG1haW5XaWR0aDogMCxcbiAgICBvdGhlcldpZHRoOiAwLFxuICB9KTtcblxuICAvLyBQZXJtaXNzaW9uc1xuICBoYXNDYW1lcmFQZXJtaXNzaW9uID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGhhc0F1ZGlvUGVybWlzc2lvbiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIC8vIFRyYW5zcG9ydHNcbiAgdHJhbnNwb3J0Q3JlYXRlZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICB0cmFuc3BvcnRDcmVhdGVkVmlkZW8gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgdHJhbnNwb3J0Q3JlYXRlZEF1ZGlvID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHRyYW5zcG9ydENyZWF0ZWRTY3JlZW4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgcHJvZHVjZXJUcmFuc3BvcnQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFRyYW5zcG9ydCB8IG51bGw+KG51bGwpO1xuICB2aWRlb1Byb2R1Y2VyID0gbmV3IEJlaGF2aW9yU3ViamVjdDxQcm9kdWNlciB8IG51bGw+KG51bGwpO1xuICBwYXJhbXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFByb2R1Y2VyT3B0aW9ucz4oe30gYXMgUHJvZHVjZXJPcHRpb25zKTtcbiAgdmlkZW9QYXJhbXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFByb2R1Y2VyT3B0aW9ucz4oe30gYXMgUHJvZHVjZXJPcHRpb25zKTtcbiAgYXVkaW9QYXJhbXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFByb2R1Y2VyT3B0aW9ucz4oe30gYXMgUHJvZHVjZXJPcHRpb25zKTtcbiAgYXVkaW9Qcm9kdWNlciA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UHJvZHVjZXIgfCBudWxsPihudWxsKTtcbiAgY29uc3VtZXJUcmFuc3BvcnRzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxUcmFuc3BvcnRUeXBlW10+KFtdKTtcbiAgY29uc3VtaW5nVHJhbnNwb3J0cyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nW10+KFtdKTtcblxuICAvLyBQb2xsc1xuICBwb2xscyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UG9sbFtdPihcbiAgICB0aGlzLnVzZVNlZWQgJiYgdGhpcy5zZWVkRGF0YT8ucG9sbHMgPyB0aGlzLnNlZWREYXRhLnBvbGxzIDogW10sXG4gICk7XG4gIHBvbGwgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFBvbGwgfCBudWxsPihudWxsKTtcbiAgaXNQb2xsTW9kYWxWaXNpYmxlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG5cbiAgLy8gQmFja2dyb3VuZFxuICBjdXN0b21JbWFnZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gIHNlbGVjdGVkSW1hZ2UgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICBzZWdtZW50VmlkZW8gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE1lZGlhU3RyZWFtIHwgbnVsbD4obnVsbCk7XG4gIHNlbGZpZVNlZ21lbnRhdGlvbiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8U2VsZmllU2VnbWVudGF0aW9uIHwgbnVsbD4obnVsbCk7XG4gIHBhdXNlU2VnbWVudGF0aW9uID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHByb2Nlc3NlZFN0cmVhbSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8TWVkaWFTdHJlYW0gfCBudWxsPihudWxsKTtcbiAga2VlcEJhY2tncm91bmQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgYmFja2dyb3VuZEhhc0NoYW5nZWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgdmlydHVhbFN0cmVhbSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8TWVkaWFTdHJlYW0gfCBudWxsPihudWxsKTtcbiAgbWFpbkNhbnZhcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8SFRNTENhbnZhc0VsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgcHJldktlZXBCYWNrZ3JvdW5kID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGFwcGxpZWRCYWNrZ3JvdW5kID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGlzQmFja2dyb3VuZE1vZGFsVmlzaWJsZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBhdXRvQ2xpY2tCYWNrZ3JvdW5kID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG5cbiAgLy8gQnJlYWtvdXQgUm9vbXNcbiAgYnJlYWtvdXRSb29tcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8QnJlYWtvdXRQYXJ0aWNpcGFudFtdW10+KFxuICAgIHRoaXMudXNlU2VlZCAmJiB0aGlzLnNlZWREYXRhPy5icmVha291dFJvb21zID8gdGhpcy5zZWVkRGF0YS5icmVha291dFJvb21zIDogW10sXG4gICk7XG4gIGN1cnJlbnRSb29tSW5kZXggPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG4gIGNhblN0YXJ0QnJlYWtvdXQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgYnJlYWtPdXRSb29tU3RhcnRlZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBicmVha091dFJvb21FbmRlZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBob3N0TmV3Um9vbSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigtMSk7XG4gIGxpbWl0ZWRCcmVha1Jvb20gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEJyZWFrb3V0UGFydGljaXBhbnRbXT4oW10pO1xuICBtYWluUm9vbXNMZW5ndGggPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG4gIG1lbWJlclJvb20gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oLTEpO1xuICBpc0JyZWFrb3V0Um9vbXNNb2RhbFZpc2libGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcblxuICAvLyBXaGl0ZWJvYXJkXG4gIHdoaXRlYm9hcmRVc2VycyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8V2hpdGVib2FyZFVzZXJbXT4oXG4gICAgdGhpcy51c2VTZWVkICYmIHRoaXMuc2VlZERhdGE/LndoaXRlYm9hcmRVc2VycyA/IHRoaXMuc2VlZERhdGEud2hpdGVib2FyZFVzZXJzIDogW10sXG4gICk7XG4gIGN1cnJlbnRXaGl0ZWJvYXJkSW5kZXggPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG4gIGNhblN0YXJ0V2hpdGVib2FyZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICB3aGl0ZWJvYXJkU3RhcnRlZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICB3aGl0ZWJvYXJkRW5kZWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgd2hpdGVib2FyZExpbWl0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDQpO1xuICBpc1doaXRlYm9hcmRNb2RhbFZpc2libGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgaXNDb25maWd1cmVXaGl0ZWJvYXJkTW9kYWxWaXNpYmxlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHNoYXBlcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8U2hhcGVbXT4oW10pO1xuICB1c2VJbWFnZUJhY2tncm91bmQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KHRydWUpO1xuICByZWRvU3RhY2sgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFNoYXBlW10+KFtdKTtcbiAgdW5kb1N0YWNrID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmdbXT4oW10pO1xuICBjYW52YXNTdHJlYW0gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE1lZGlhU3RyZWFtIHwgbnVsbD4obnVsbCk7XG4gIGNhbnZhc1doaXRlYm9hcmQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEhUTUxDYW52YXNFbGVtZW50IHwgbnVsbD4obnVsbCk7XG5cbiAgLy8gU2NyZWVuYm9hcmRcbiAgY2FudmFzU2NyZWVuYm9hcmQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEhUTUxDYW52YXNFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIHByb2Nlc3NlZFNjcmVlblN0cmVhbSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8TWVkaWFTdHJlYW0gfCBudWxsPihudWxsKTtcbiAgYW5ub3RhdGVTY3JlZW5TdHJlYW0gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgbWFpblNjcmVlbkNhbnZhcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8SFRNTENhbnZhc0VsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgaXNTY3JlZW5ib2FyZE1vZGFsVmlzaWJsZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIC8vc3RhdGUgdmFyaWFibGVzIGZvciB0aGUgY29udHJvbCBidXR0b25zXG4gIG1pY0FjdGl2ZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oXG4gICAgdGhpcy5hdWRpb0FscmVhZHlPbi52YWx1ZSA/IHRoaXMuYXVkaW9BbHJlYWR5T24udmFsdWUgOiBmYWxzZSxcbiAgKTtcbiAgdmlkZW9BY3RpdmUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KFxuICAgIHRoaXMudmlkZW9BbHJlYWR5T24udmFsdWUgPyB0aGlzLnZpZGVvQWxyZWFkeU9uLnZhbHVlIDogZmFsc2UsXG4gICk7XG4gIHNjcmVlblNoYXJlQWN0aXZlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGVuZENhbGxBY3RpdmUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgcGFydGljaXBhbnRzQWN0aXZlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIG1lbnVBY3RpdmUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgY29tbWVudHNBY3RpdmUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcblxuICAvLyBVcGRhdGUgZnVuY3Rpb25zXG4gIHVwZGF0ZU1lc3NhZ2VzID0gKHZhbHVlOiBNZXNzYWdlW10pID0+IHtcbiAgICB0aGlzLm1lc3NhZ2VzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVN0YXJ0RGlyZWN0TWVzc2FnZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuc3RhcnREaXJlY3RNZXNzYWdlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZURpcmVjdE1lc3NhZ2VEZXRhaWxzID0gKHZhbHVlOiBQYXJ0aWNpcGFudCB8IG51bGwpID0+IHtcbiAgICB0aGlzLmRpcmVjdE1lc3NhZ2VEZXRhaWxzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVNob3dNZXNzYWdlc0JhZGdlID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5zaG93TWVzc2FnZXNCYWRnZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBdWRpb1NldHRpbmcgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMuYXVkaW9TZXR0aW5nLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVZpZGVvU2V0dGluZyA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy52aWRlb1NldHRpbmcubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlU2NyZWVuc2hhcmVTZXR0aW5nID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLnNjcmVlbnNoYXJlU2V0dGluZy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVDaGF0U2V0dGluZyA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5jaGF0U2V0dGluZy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVEaXNwbGF5T3B0aW9uID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLmRpc3BsYXlPcHRpb24ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQXV0b1dhdmUgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmF1dG9XYXZlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUZvcmNlRnVsbERpc3BsYXkgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmZvcmNlRnVsbERpc3BsYXkubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUHJldkZvcmNlRnVsbERpc3BsYXkgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnByZXZGb3JjZUZ1bGxEaXNwbGF5Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVByZXZNZWV0aW5nRGlzcGxheVR5cGUgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMucHJldk1lZXRpbmdEaXNwbGF5VHlwZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVXYWl0aW5nUm9vbUNvdW50ZXIgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMud2FpdGluZ1Jvb21Db3VudGVyLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVdhaXRpbmdSb29tRmlsdGVyID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLndhaXRpbmdSb29tRmlsdGVyLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVdhaXRpbmdSb29tTGlzdCA9ICh2YWx1ZTogV2FpdGluZ1Jvb21QYXJ0aWNpcGFudFtdKSA9PiB7XG4gICAgdGhpcy53YWl0aW5nUm9vbUxpc3QubmV4dCh2YWx1ZSk7XG4gICAgdGhpcy5maWx0ZXJlZFdhaXRpbmdSb29tTGlzdC5uZXh0KHZhbHVlKTtcbiAgICB0aGlzLndhaXRpbmdSb29tQ291bnRlci5uZXh0KHZhbHVlLmxlbmd0aCk7XG4gIH07XG5cbiAgb25XYWl0aW5nUm9vbUZpbHRlckNoYW5nZSA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgaWYgKHZhbHVlICE9PSAnJyAmJiB2YWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBmaWx0ZXJlZFdhaXRpbmdSb29tID0gdGhpcy53YWl0aW5nUm9vbUxpc3RcbiAgICAgICAgLmdldFZhbHVlKClcbiAgICAgICAgLmZpbHRlcigod2FpdGluZ1Jvb206IFdhaXRpbmdSb29tUGFydGljaXBhbnQpID0+IHtcbiAgICAgICAgICByZXR1cm4gd2FpdGluZ1Jvb20ubmFtZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHZhbHVlLnRvTG93ZXJDYXNlKCkpO1xuICAgICAgICB9KTtcbiAgICAgIHRoaXMuZmlsdGVyZWRXYWl0aW5nUm9vbUxpc3QubmV4dChmaWx0ZXJlZFdhaXRpbmdSb29tKTtcbiAgICAgIHRoaXMud2FpdGluZ1Jvb21Db3VudGVyLm5leHQoZmlsdGVyZWRXYWl0aW5nUm9vbS5sZW5ndGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmZpbHRlcmVkV2FpdGluZ1Jvb21MaXN0Lm5leHQodGhpcy53YWl0aW5nUm9vbUxpc3QuZ2V0VmFsdWUoKSk7XG4gICAgICB0aGlzLndhaXRpbmdSb29tQ291bnRlci5uZXh0KHRoaXMud2FpdGluZ1Jvb21MaXN0LmdldFZhbHVlKCkubGVuZ3RoKTtcbiAgICB9XG4gIH07XG5cbiAgb25XYWl0aW5nUm9vbUNsb3NlID0gKCkgPT4ge1xuICAgIHRoaXMudXBkYXRlSXNXYWl0aW5nTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgfTtcblxuICB1cGRhdGVSZXF1ZXN0Q291bnRlciA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5yZXF1ZXN0Q291bnRlci5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZXF1ZXN0RmlsdGVyID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLnJlcXVlc3RGaWx0ZXIubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVxdWVzdExpc3QgPSAodmFsdWU6IFJlcXVlc3RbXSkgPT4ge1xuICAgIHRoaXMucmVxdWVzdExpc3QubmV4dCh2YWx1ZSk7XG4gICAgdGhpcy5maWx0ZXJlZFJlcXVlc3RMaXN0Lm5leHQodmFsdWUpO1xuICAgIHRoaXMucmVxdWVzdENvdW50ZXIubmV4dCh2YWx1ZS5sZW5ndGgpO1xuICB9O1xuXG4gIG9uUmVxdWVzdEZpbHRlckNoYW5nZSA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgaWYgKHZhbHVlICE9PSAnJyAmJiB2YWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBmaWx0ZXJlZFJlcXVlc3QgPSB0aGlzLnJlcXVlc3RMaXN0LmdldFZhbHVlKCkuZmlsdGVyKChyZXF1ZXN0OiBSZXF1ZXN0KSA9PiB7XG4gICAgICAgIHJldHVybiByZXF1ZXN0Py5uYW1lPy50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHZhbHVlLnRvTG93ZXJDYXNlKCkpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLmZpbHRlcmVkUmVxdWVzdExpc3QubmV4dChmaWx0ZXJlZFJlcXVlc3QpO1xuICAgICAgdGhpcy5yZXF1ZXN0Q291bnRlci5uZXh0KGZpbHRlcmVkUmVxdWVzdC5sZW5ndGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmZpbHRlcmVkUmVxdWVzdExpc3QubmV4dCh0aGlzLnJlcXVlc3RMaXN0LmdldFZhbHVlKCkpO1xuICAgICAgdGhpcy5yZXF1ZXN0Q291bnRlci5uZXh0KHRoaXMucmVxdWVzdExpc3QuZ2V0VmFsdWUoKS5sZW5ndGgpO1xuICAgIH1cbiAgfTtcblxuICBvblJlcXVlc3RDbG9zZSA9ICgpID0+IHtcbiAgICB0aGlzLnVwZGF0ZUlzUmVxdWVzdHNNb2RhbFZpc2libGUoZmFsc2UpO1xuICB9O1xuXG4gIHVwZGF0ZVRvdGFsUmVxV2FpdCA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy50b3RhbFJlcVdhaXQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQWxlcnRWaXNpYmxlID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5hbGVydFZpc2libGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQWxlcnRNZXNzYWdlID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLmFsZXJ0TWVzc2FnZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBbGVydFR5cGUgPSAodmFsdWU6ICdzdWNjZXNzJyB8ICdkYW5nZXInKSA9PiB7XG4gICAgdGhpcy5hbGVydFR5cGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQWxlcnREdXJhdGlvbiA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5hbGVydER1cmF0aW9uLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVByb2dyZXNzVGltZXJWaXNpYmxlID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5wcm9ncmVzc1RpbWVyVmlzaWJsZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVQcm9ncmVzc1RpbWVyVmFsdWUgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMucHJvZ3Jlc3NUaW1lclZhbHVlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUlzTWVudU1vZGFsVmlzaWJsZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuaXNNZW51TW9kYWxWaXNpYmxlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUlzUmVjb3JkaW5nTW9kYWxWaXNpYmxlID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5pc1JlY29yZGluZ01vZGFsVmlzaWJsZS5uZXh0KHZhbHVlKTtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMudXBkYXRlQ29uZmlybWVkVG9SZWNvcmQoZmFsc2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMuY2xlYXJlZFRvUmVjb3JkLmdldFZhbHVlKCkgJiZcbiAgICAgICAgdGhpcy5jbGVhcmVkVG9SZXN1bWUuZ2V0VmFsdWUoKSAmJlxuICAgICAgICB0aGlzLnJlY29yZFN0YXJ0ZWQuZ2V0VmFsdWUoKVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMudXBkYXRlU2hvd1JlY29yZEJ1dHRvbnModHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHVwZGF0ZUlzU2V0dGluZ3NNb2RhbFZpc2libGUgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmlzU2V0dGluZ3NNb2RhbFZpc2libGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlSXNSZXF1ZXN0c01vZGFsVmlzaWJsZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuaXNSZXF1ZXN0c01vZGFsVmlzaWJsZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVJc1dhaXRpbmdNb2RhbFZpc2libGUgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmlzV2FpdGluZ01vZGFsVmlzaWJsZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVJc0NvSG9zdE1vZGFsVmlzaWJsZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuaXNDb0hvc3RNb2RhbFZpc2libGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlSXNNZWRpYVNldHRpbmdzTW9kYWxWaXNpYmxlID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5pc01lZGlhU2V0dGluZ3NNb2RhbFZpc2libGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlSXNEaXNwbGF5U2V0dGluZ3NNb2RhbFZpc2libGUgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmlzRGlzcGxheVNldHRpbmdzTW9kYWxWaXNpYmxlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUlzUGFydGljaXBhbnRzTW9kYWxWaXNpYmxlID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5pc1BhcnRpY2lwYW50c01vZGFsVmlzaWJsZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVJc01lc3NhZ2VzTW9kYWxWaXNpYmxlID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5pc01lc3NhZ2VzTW9kYWxWaXNpYmxlLm5leHQodmFsdWUpO1xuICAgIGlmICghdmFsdWUpIHtcbiAgICAgIHRoaXMudXBkYXRlU2hvd01lc3NhZ2VzQmFkZ2UoZmFsc2UpO1xuICAgIH1cbiAgfTtcblxuICB1cGRhdGVJc0NvbmZpcm1FeGl0TW9kYWxWaXNpYmxlID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5pc0NvbmZpcm1FeGl0TW9kYWxWaXNpYmxlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUlzQ29uZmlybUhlcmVNb2RhbFZpc2libGUgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmlzQ29uZmlybUhlcmVNb2RhbFZpc2libGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlSXNMb2FkaW5nTW9kYWxWaXNpYmxlID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5pc0xvYWRpbmdNb2RhbFZpc2libGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlSXNTaGFyZUV2ZW50TW9kYWxWaXNpYmxlID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5pc1NoYXJlRXZlbnRNb2RhbFZpc2libGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nTWVkaWFPcHRpb25zID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ01lZGlhT3B0aW9ucy5uZXh0KHZhbHVlKTtcbiAgICB0aGlzLmNsZWFyZWRUb1JlY29yZC5uZXh0KGZhbHNlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRpbmdBdWRpb09wdGlvbnMgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMucmVjb3JkaW5nQXVkaW9PcHRpb25zLm5leHQodmFsdWUpO1xuICAgIHRoaXMuY2xlYXJlZFRvUmVjb3JkLm5leHQoZmFsc2UpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ1ZpZGVvT3B0aW9ucyA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdWaWRlb09wdGlvbnMubmV4dCh2YWx1ZSk7XG4gICAgdGhpcy5jbGVhcmVkVG9SZWNvcmQubmV4dChmYWxzZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nVmlkZW9UeXBlID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ1ZpZGVvVHlwZS5uZXh0KHZhbHVlKTtcbiAgICB0aGlzLmNsZWFyZWRUb1JlY29yZC5uZXh0KGZhbHNlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRpbmdWaWRlb09wdGltaXplZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMucmVjb3JkaW5nVmlkZW9PcHRpbWl6ZWQubmV4dCh2YWx1ZSk7XG4gICAgdGhpcy5jbGVhcmVkVG9SZWNvcmQubmV4dChmYWxzZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nRGlzcGxheVR5cGUgPSAodmFsdWU6ICd2aWRlbycgfCAnbWVkaWEnIHwgJ2FsbCcpID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ0Rpc3BsYXlUeXBlLm5leHQodmFsdWUpO1xuICAgIHRoaXMuY2xlYXJlZFRvUmVjb3JkLm5leHQoZmFsc2UpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ0FkZEhMUyA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMucmVjb3JkaW5nQWRkSExTLm5leHQodmFsdWUpO1xuICAgIHRoaXMuY2xlYXJlZFRvUmVjb3JkLm5leHQoZmFsc2UpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ0FkZFRleHQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ0FkZFRleHQubmV4dCh2YWx1ZSk7XG4gICAgdGhpcy5jbGVhcmVkVG9SZWNvcmQubmV4dChmYWxzZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nQ3VzdG9tVGV4dCA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdDdXN0b21UZXh0Lm5leHQodmFsdWUpO1xuICAgIHRoaXMuY2xlYXJlZFRvUmVjb3JkLm5leHQoZmFsc2UpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ0N1c3RvbVRleHRQb3NpdGlvbiA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdDdXN0b21UZXh0UG9zaXRpb24ubmV4dCh2YWx1ZSk7XG4gICAgdGhpcy5jbGVhcmVkVG9SZWNvcmQubmV4dChmYWxzZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nQ3VzdG9tVGV4dENvbG9yID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ0N1c3RvbVRleHRDb2xvci5uZXh0KHZhbHVlKTtcbiAgICB0aGlzLmNsZWFyZWRUb1JlY29yZC5uZXh0KGZhbHNlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRpbmdOYW1lVGFncyA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMucmVjb3JkaW5nTmFtZVRhZ3MubmV4dCh2YWx1ZSk7XG4gICAgdGhpcy5jbGVhcmVkVG9SZWNvcmQubmV4dChmYWxzZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nQmFja2dyb3VuZENvbG9yID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ0JhY2tncm91bmRDb2xvci5uZXh0KHZhbHVlKTtcbiAgICB0aGlzLmNsZWFyZWRUb1JlY29yZC5uZXh0KGZhbHNlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRpbmdOYW1lVGFnc0NvbG9yID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ05hbWVUYWdzQ29sb3IubmV4dCh2YWx1ZSk7XG4gICAgdGhpcy5jbGVhcmVkVG9SZWNvcmQubmV4dChmYWxzZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nT3JpZW50YXRpb25WaWRlbyA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdPcmllbnRhdGlvblZpZGVvLm5leHQodmFsdWUpO1xuICAgIHRoaXMuY2xlYXJlZFRvUmVjb3JkLm5leHQoZmFsc2UpO1xuICB9O1xuXG4gIHVwZGF0ZUNsZWFyZWRUb1Jlc3VtZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuY2xlYXJlZFRvUmVzdW1lLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUNsZWFyZWRUb1JlY29yZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuY2xlYXJlZFRvUmVjb3JkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZFN0YXRlID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICBpZiAodGhpcy5yZWNvcmRTdGFydGVkLnZhbHVlICYmICF0aGlzLnJlY29yZFN0b3BwZWQudmFsdWUpIHtcbiAgICAgIGlmICghdGhpcy5yZWNvcmRQYXVzZWQudmFsdWUpIHtcbiAgICAgICAgdGhpcy5yZWNvcmRTdGF0ZS5uZXh0KCdyZWQnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucmVjb3JkU3RhdGUubmV4dCgneWVsbG93Jyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVjb3JkU3RhdGUubmV4dCh2YWx1ZSk7XG4gICAgfVxuICAgIHRoaXMucmVjb3JkU3RhdGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlU2hvd1JlY29yZEJ1dHRvbnMgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnNob3dSZWNvcmRCdXR0b25zLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ1Byb2dyZXNzVGltZSA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdQcm9ncmVzc1RpbWUubmV4dCh2YWx1ZSk7XG4gICAgdGhpcy51cGRhdGVSZWNvcmRUaW1lcldpZGdldCgpO1xuICB9O1xuXG4gIHVwZGF0ZUF1ZGlvU3dpdGNoaW5nID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5hdWRpb1N3aXRjaGluZy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVWaWRlb1N3aXRjaGluZyA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMudmlkZW9Td2l0Y2hpbmcubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlVmlkZW9BbHJlYWR5T24gPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnZpZGVvQWxyZWFkeU9uLm5leHQodmFsdWUpO1xuICAgIHRoaXMudmlkZW9BY3RpdmUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQXVkaW9BbHJlYWR5T24gPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmF1ZGlvQWxyZWFkeU9uLm5leHQodmFsdWUpO1xuICAgIHRoaXMubWljQWN0aXZlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUNvbXBvbmVudFNpemVzID0gKHNpemVzOiBDb21wb25lbnRTaXplcykgPT4ge1xuICAgIHRoaXMuY29tcG9uZW50U2l6ZXMubmV4dChzaXplcyk7XG4gIH07XG5cbiAgdXBkYXRlSGFzQ2FtZXJhUGVybWlzc2lvbiA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuaGFzQ2FtZXJhUGVybWlzc2lvbi5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVIYXNBdWRpb1Blcm1pc3Npb24gPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmhhc0F1ZGlvUGVybWlzc2lvbi5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICByZXF1ZXN0UGVybWlzc2lvbkNhbWVyYSgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIC8vIEltcGxlbWVudCB0aGUgcmVxdWVzdCBwZXJtaXNzaW9uIGxvZ2ljIGhlcmVcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCdncmFudGVkJyk7XG4gIH1cblxuICByZXF1ZXN0UGVybWlzc2lvbkF1ZGlvKCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgLy8gSW1wbGVtZW50IHRoZSByZXF1ZXN0IHBlcm1pc3Npb24gbG9naWMgaGVyZVxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoJ2dyYW50ZWQnKTtcbiAgfVxuXG4gIHVwZGF0ZVRyYW5zcG9ydENyZWF0ZWQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnRyYW5zcG9ydENyZWF0ZWQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlVHJhbnNwb3J0Q3JlYXRlZFZpZGVvID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy50cmFuc3BvcnRDcmVhdGVkVmlkZW8ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlVHJhbnNwb3J0Q3JlYXRlZEF1ZGlvID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy50cmFuc3BvcnRDcmVhdGVkQXVkaW8ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlVHJhbnNwb3J0Q3JlYXRlZFNjcmVlbiA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMudHJhbnNwb3J0Q3JlYXRlZFNjcmVlbi5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVQcm9kdWNlclRyYW5zcG9ydCA9ICh2YWx1ZTogVHJhbnNwb3J0IHwgbnVsbCkgPT4ge1xuICAgIHRoaXMucHJvZHVjZXJUcmFuc3BvcnQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlVmlkZW9Qcm9kdWNlciA9ICh2YWx1ZTogUHJvZHVjZXIgfCBudWxsKSA9PiB7XG4gICAgdGhpcy52aWRlb1Byb2R1Y2VyLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVBhcmFtcyA9ICh2YWx1ZTogUHJvZHVjZXJPcHRpb25zKSA9PiB7XG4gICAgdGhpcy5wYXJhbXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlVmlkZW9QYXJhbXMgPSAodmFsdWU6IFByb2R1Y2VyT3B0aW9ucykgPT4ge1xuICAgIHRoaXMudmlkZW9QYXJhbXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQXVkaW9QYXJhbXMgPSAodmFsdWU6IFByb2R1Y2VyT3B0aW9ucykgPT4ge1xuICAgIHRoaXMuYXVkaW9QYXJhbXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQXVkaW9Qcm9kdWNlciA9ICh2YWx1ZTogUHJvZHVjZXIgfCBudWxsKSA9PiB7XG4gICAgdGhpcy5hdWRpb1Byb2R1Y2VyLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUNvbnN1bWVyVHJhbnNwb3J0cyA9ICh2YWx1ZTogVHJhbnNwb3J0VHlwZVtdKSA9PiB7XG4gICAgdGhpcy5jb25zdW1lclRyYW5zcG9ydHMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQ29uc3VtaW5nVHJhbnNwb3J0cyA9ICh2YWx1ZTogc3RyaW5nW10pID0+IHtcbiAgICB0aGlzLmNvbnN1bWluZ1RyYW5zcG9ydHMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUG9sbHMgPSAodmFsdWU6IFBvbGxbXSkgPT4ge1xuICAgIHRoaXMucG9sbHMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUG9sbCA9ICh2YWx1ZTogUG9sbCB8IG51bGwpID0+IHtcbiAgICB0aGlzLnBvbGwubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlSXNQb2xsTW9kYWxWaXNpYmxlID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5pc1BvbGxNb2RhbFZpc2libGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQ3VzdG9tSW1hZ2UgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMuY3VzdG9tSW1hZ2UubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlU2VsZWN0ZWRJbWFnZSA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5zZWxlY3RlZEltYWdlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVNlZ21lbnRWaWRlbyA9ICh2YWx1ZTogTWVkaWFTdHJlYW0gfCBudWxsKSA9PiB7XG4gICAgdGhpcy5zZWdtZW50VmlkZW8ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlU2VsZmllU2VnbWVudGF0aW9uID0gKHZhbHVlOiBTZWxmaWVTZWdtZW50YXRpb24gfCBudWxsKSA9PiB7XG4gICAgdGhpcy5zZWxmaWVTZWdtZW50YXRpb24ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUGF1c2VTZWdtZW50YXRpb24gPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnBhdXNlU2VnbWVudGF0aW9uLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVByb2Nlc3NlZFN0cmVhbSA9ICh2YWx1ZTogTWVkaWFTdHJlYW0gfCBudWxsKSA9PiB7XG4gICAgdGhpcy5wcm9jZXNzZWRTdHJlYW0ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlS2VlcEJhY2tncm91bmQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmtlZXBCYWNrZ3JvdW5kLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUJhY2tncm91bmRIYXNDaGFuZ2VkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5iYWNrZ3JvdW5kSGFzQ2hhbmdlZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVWaXJ0dWFsU3RyZWFtID0gKHZhbHVlOiBNZWRpYVN0cmVhbSB8IG51bGwpID0+IHtcbiAgICB0aGlzLnZpcnR1YWxTdHJlYW0ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTWFpbkNhbnZhcyA9ICh2YWx1ZTogSFRNTENhbnZhc0VsZW1lbnQgfCBudWxsKSA9PiB7XG4gICAgdGhpcy5tYWluQ2FudmFzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVByZXZLZWVwQmFja2dyb3VuZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMucHJldktlZXBCYWNrZ3JvdW5kLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUFwcGxpZWRCYWNrZ3JvdW5kID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5hcHBsaWVkQmFja2dyb3VuZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVJc0JhY2tncm91bmRNb2RhbFZpc2libGUgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmlzQmFja2dyb3VuZE1vZGFsVmlzaWJsZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBdXRvQ2xpY2tCYWNrZ3JvdW5kID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5hdXRvQ2xpY2tCYWNrZ3JvdW5kLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUJyZWFrb3V0Um9vbXMgPSAodmFsdWU6IEJyZWFrb3V0UGFydGljaXBhbnRbXVtdKSA9PiB7XG4gICAgdGhpcy5icmVha291dFJvb21zLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUN1cnJlbnRSb29tSW5kZXggPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMuY3VycmVudFJvb21JbmRleC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVDYW5TdGFydEJyZWFrb3V0ID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5jYW5TdGFydEJyZWFrb3V0Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUJyZWFrT3V0Um9vbVN0YXJ0ZWQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmJyZWFrT3V0Um9vbVN0YXJ0ZWQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQnJlYWtPdXRSb29tRW5kZWQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmJyZWFrT3V0Um9vbUVuZGVkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUhvc3ROZXdSb29tID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLmhvc3ROZXdSb29tLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUxpbWl0ZWRCcmVha1Jvb20gPSAodmFsdWU6IEJyZWFrb3V0UGFydGljaXBhbnRbXSkgPT4ge1xuICAgIHRoaXMubGltaXRlZEJyZWFrUm9vbS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVNYWluUm9vbXNMZW5ndGggPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMubWFpblJvb21zTGVuZ3RoLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZU1lbWJlclJvb20gPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMubWVtYmVyUm9vbS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVJc0JyZWFrb3V0Um9vbXNNb2RhbFZpc2libGUgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmlzQnJlYWtvdXRSb29tc01vZGFsVmlzaWJsZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVXaGl0ZWJvYXJkVXNlcnMgPSAodmFsdWU6IFdoaXRlYm9hcmRVc2VyW10pID0+IHtcbiAgICB0aGlzLndoaXRlYm9hcmRVc2Vycy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVDdXJyZW50V2hpdGVib2FyZEluZGV4ID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLmN1cnJlbnRXaGl0ZWJvYXJkSW5kZXgubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQ2FuU3RhcnRXaGl0ZWJvYXJkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5jYW5TdGFydFdoaXRlYm9hcmQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlV2hpdGVib2FyZFN0YXJ0ZWQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLndoaXRlYm9hcmRTdGFydGVkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVdoaXRlYm9hcmRFbmRlZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMud2hpdGVib2FyZEVuZGVkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVdoaXRlYm9hcmRMaW1pdCA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy53aGl0ZWJvYXJkTGltaXQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlSXNXaGl0ZWJvYXJkTW9kYWxWaXNpYmxlID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5pc1doaXRlYm9hcmRNb2RhbFZpc2libGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlSXNDb25maWd1cmVXaGl0ZWJvYXJkTW9kYWxWaXNpYmxlID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5pc0NvbmZpZ3VyZVdoaXRlYm9hcmRNb2RhbFZpc2libGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlU2hhcGVzID0gKHZhbHVlOiBTaGFwZVtdKSA9PiB7XG4gICAgdGhpcy5zaGFwZXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlVXNlSW1hZ2VCYWNrZ3JvdW5kID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy51c2VJbWFnZUJhY2tncm91bmQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVkb1N0YWNrID0gKHZhbHVlOiBTaGFwZVtdKSA9PiB7XG4gICAgdGhpcy5yZWRvU3RhY2submV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlVW5kb1N0YWNrID0gKHZhbHVlOiBzdHJpbmdbXSkgPT4ge1xuICAgIHRoaXMudW5kb1N0YWNrLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUNhbnZhc1N0cmVhbSA9ICh2YWx1ZTogTWVkaWFTdHJlYW0gfCBudWxsKSA9PiB7XG4gICAgdGhpcy5jYW52YXNTdHJlYW0ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQ2FudmFzV2hpdGVib2FyZCA9ICh2YWx1ZTogSFRNTENhbnZhc0VsZW1lbnQgfCBudWxsKSA9PiB7XG4gICAgdGhpcy5jYW52YXNXaGl0ZWJvYXJkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUNhbnZhc1NjcmVlbmJvYXJkID0gKHZhbHVlOiBIVE1MQ2FudmFzRWxlbWVudCB8IG51bGwpID0+IHtcbiAgICB0aGlzLmNhbnZhc1NjcmVlbmJvYXJkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVByb2Nlc3NlZFNjcmVlblN0cmVhbSA9ICh2YWx1ZTogTWVkaWFTdHJlYW0gfCBudWxsKSA9PiB7XG4gICAgdGhpcy5wcm9jZXNzZWRTY3JlZW5TdHJlYW0ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQW5ub3RhdGVTY3JlZW5TdHJlYW0gPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmFubm90YXRlU2NyZWVuU3RyZWFtLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZU1haW5TY3JlZW5DYW52YXMgPSAodmFsdWU6IEhUTUxDYW52YXNFbGVtZW50IHwgbnVsbCkgPT4ge1xuICAgIHRoaXMubWFpblNjcmVlbkNhbnZhcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVJc1NjcmVlbmJvYXJkTW9kYWxWaXNpYmxlID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5pc1NjcmVlbmJvYXJkTW9kYWxWaXNpYmxlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIGNoZWNrT3JpZW50YXRpb24gPSAoKSA9PiB7XG4gICAgY29uc3QgaXNQb3J0cmFpdCA9IHdpbmRvdy5tYXRjaE1lZGlhKCcob3JpZW50YXRpb246IHBvcnRyYWl0KScpLm1hdGNoZXM7XG4gICAgcmV0dXJuIGlzUG9ydHJhaXQgPyAncG9ydHJhaXQnIDogJ2xhbmRzY2FwZSc7XG4gIH07XG5cbiAgc2hvd0FsZXJ0ID0gKHtcbiAgICBtZXNzYWdlLFxuICAgIHR5cGUsXG4gICAgZHVyYXRpb24gPSAzMDAwLFxuICB9OiB7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xuICAgIHR5cGU6ICdzdWNjZXNzJyB8ICdkYW5nZXInO1xuICAgIGR1cmF0aW9uPzogbnVtYmVyO1xuICB9KSA9PiB7XG4gICAgdGhpcy51cGRhdGVBbGVydE1lc3NhZ2UobWVzc2FnZSk7XG4gICAgdGhpcy51cGRhdGVBbGVydFR5cGUodHlwZSk7XG4gICAgdGhpcy51cGRhdGVBbGVydER1cmF0aW9uKGR1cmF0aW9uKTtcbiAgICB0aGlzLnVwZGF0ZUFsZXJ0VmlzaWJsZSh0cnVlKTtcbiAgfTtcblxuICBnZXRBbGxQYXJhbXMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGxvY2FsVUlNb2RlOiB0aGlzLmxvY2FsVUlNb2RlLnZhbHVlLCAvLyBMb2NhbCBVSSBtb2RlXG5cbiAgICAgIC8vIFJvb20gRGV0YWlsc1xuICAgICAgcm9vbU5hbWU6IHRoaXMucm9vbU5hbWUudmFsdWUsXG4gICAgICBtZW1iZXI6IHRoaXMubWVtYmVyLnZhbHVlLFxuICAgICAgYWRtaW5QYXNzY29kZTogdGhpcy5hZG1pblBhc3Njb2RlLnZhbHVlLFxuICAgICAgeW91QXJlQ29Ib3N0OiB0aGlzLnlvdUFyZUNvSG9zdC52YWx1ZSxcbiAgICAgIHlvdUFyZUhvc3Q6IHRoaXMueW91QXJlSG9zdC52YWx1ZSxcbiAgICAgIGlzbGV2ZWw6IHRoaXMuaXNsZXZlbC52YWx1ZSxcbiAgICAgIGNvbmZpcm1lZFRvUmVjb3JkOiB0aGlzLmNvbmZpcm1lZFRvUmVjb3JkLnZhbHVlLFxuICAgICAgbWVldGluZ0Rpc3BsYXlUeXBlOiB0aGlzLm1lZXRpbmdEaXNwbGF5VHlwZS52YWx1ZSxcbiAgICAgIG1lZXRpbmdWaWRlb09wdGltaXplZDogdGhpcy5tZWV0aW5nVmlkZW9PcHRpbWl6ZWQudmFsdWUsXG4gICAgICBldmVudFR5cGU6IHRoaXMuZXZlbnRUeXBlLnZhbHVlLFxuICAgICAgcGFydGljaXBhbnRzOiB0aGlzLnBhcnRpY2lwYW50cy52YWx1ZSxcbiAgICAgIGZpbHRlcmVkUGFydGljaXBhbnRzOiB0aGlzLmZpbHRlcmVkUGFydGljaXBhbnRzLnZhbHVlLFxuICAgICAgcGFydGljaXBhbnRzQ291bnRlcjogdGhpcy5wYXJ0aWNpcGFudHNDb3VudGVyLnZhbHVlLFxuICAgICAgcGFydGljaXBhbnRzRmlsdGVyOiB0aGlzLnBhcnRpY2lwYW50c0ZpbHRlci52YWx1ZSxcblxuICAgICAgLy8gTW9yZSByb29tIGRldGFpbHMgLSBtZWRpYVxuICAgICAgY29uc3VtZV9zb2NrZXRzOiB0aGlzLmNvbnN1bWVfc29ja2V0cy52YWx1ZSxcbiAgICAgIHJ0cENhcGFiaWxpdGllczogdGhpcy5ydHBDYXBhYmlsaXRpZXMudmFsdWUsXG4gICAgICByb29tUmVjdklQczogdGhpcy5yb29tUmVjdklQcy52YWx1ZSxcbiAgICAgIG1lZXRpbmdSb29tUGFyYW1zOiB0aGlzLm1lZXRpbmdSb29tUGFyYW1zLnZhbHVlLFxuICAgICAgaXRlbVBhZ2VMaW1pdDogdGhpcy5pdGVtUGFnZUxpbWl0LnZhbHVlLFxuICAgICAgYXVkaW9Pbmx5Um9vbTogdGhpcy5hdWRpb09ubHlSb29tLnZhbHVlLFxuICAgICAgYWRkRm9yQmFzaWM6IHRoaXMuYWRkRm9yQmFzaWMudmFsdWUsXG4gICAgICBzY3JlZW5QYWdlTGltaXQ6IHRoaXMuc2NyZWVuUGFnZUxpbWl0LnZhbHVlLFxuICAgICAgc2hhcmVTY3JlZW5TdGFydGVkOiB0aGlzLnNoYXJlU2NyZWVuU3RhcnRlZC52YWx1ZSxcbiAgICAgIHNoYXJlZDogdGhpcy5zaGFyZWQudmFsdWUsXG4gICAgICB0YXJnZXRPcmllbnRhdGlvbjogdGhpcy50YXJnZXRPcmllbnRhdGlvbi52YWx1ZSxcbiAgICAgIHRhcmdldFJlc29sdXRpb246IHRoaXMudGFyZ2V0UmVzb2x1dGlvbi52YWx1ZSxcbiAgICAgIHRhcmdldFJlc29sdXRpb25Ib3N0OiB0aGlzLnRhcmdldFJlc29sdXRpb25Ib3N0LnZhbHVlLFxuICAgICAgdmlkQ29uczogdGhpcy52aWRDb25zLnZhbHVlLFxuICAgICAgZnJhbWVSYXRlOiB0aGlzLmZyYW1lUmF0ZS52YWx1ZSxcbiAgICAgIGhQYXJhbXM6IHRoaXMuaFBhcmFtcy52YWx1ZSxcbiAgICAgIHZQYXJhbXM6IHRoaXMudlBhcmFtcy52YWx1ZSxcbiAgICAgIHNjcmVlblBhcmFtczogdGhpcy5zY3JlZW5QYXJhbXMudmFsdWUsXG4gICAgICBhUGFyYW1zOiB0aGlzLmFQYXJhbXMudmFsdWUsXG5cbiAgICAgIC8vIE1vcmUgcm9vbSBkZXRhaWxzIC0gcmVjb3JkaW5nXG4gICAgICByZWNvcmRpbmdBdWRpb1BhdXNlc0xpbWl0OiB0aGlzLnJlY29yZGluZ0F1ZGlvUGF1c2VzTGltaXQudmFsdWUsXG4gICAgICByZWNvcmRpbmdBdWRpb1BhdXNlc0NvdW50OiB0aGlzLnJlY29yZGluZ0F1ZGlvUGF1c2VzQ291bnQudmFsdWUsXG4gICAgICByZWNvcmRpbmdBdWRpb1N1cHBvcnQ6IHRoaXMucmVjb3JkaW5nQXVkaW9TdXBwb3J0LnZhbHVlLFxuICAgICAgcmVjb3JkaW5nQXVkaW9QZW9wbGVMaW1pdDogdGhpcy5yZWNvcmRpbmdBdWRpb1Blb3BsZUxpbWl0LnZhbHVlLFxuICAgICAgcmVjb3JkaW5nQXVkaW9QYXJ0aWNpcGFudHNUaW1lTGltaXQ6IHRoaXMucmVjb3JkaW5nQXVkaW9QYXJ0aWNpcGFudHNUaW1lTGltaXQudmFsdWUsXG4gICAgICByZWNvcmRpbmdWaWRlb1BhdXNlc0NvdW50OiB0aGlzLnJlY29yZGluZ1ZpZGVvUGF1c2VzQ291bnQudmFsdWUsXG4gICAgICByZWNvcmRpbmdWaWRlb1BhdXNlc0xpbWl0OiB0aGlzLnJlY29yZGluZ1ZpZGVvUGF1c2VzTGltaXQudmFsdWUsXG4gICAgICByZWNvcmRpbmdWaWRlb1N1cHBvcnQ6IHRoaXMucmVjb3JkaW5nVmlkZW9TdXBwb3J0LnZhbHVlLFxuICAgICAgcmVjb3JkaW5nVmlkZW9QZW9wbGVMaW1pdDogdGhpcy5yZWNvcmRpbmdWaWRlb1Blb3BsZUxpbWl0LnZhbHVlLFxuICAgICAgcmVjb3JkaW5nVmlkZW9QYXJ0aWNpcGFudHNUaW1lTGltaXQ6IHRoaXMucmVjb3JkaW5nVmlkZW9QYXJ0aWNpcGFudHNUaW1lTGltaXQudmFsdWUsXG4gICAgICByZWNvcmRpbmdBbGxQYXJ0aWNpcGFudHNTdXBwb3J0OiB0aGlzLnJlY29yZGluZ0FsbFBhcnRpY2lwYW50c1N1cHBvcnQudmFsdWUsXG4gICAgICByZWNvcmRpbmdWaWRlb1BhcnRpY2lwYW50c1N1cHBvcnQ6IHRoaXMucmVjb3JkaW5nVmlkZW9QYXJ0aWNpcGFudHNTdXBwb3J0LnZhbHVlLFxuICAgICAgcmVjb3JkaW5nQWxsUGFydGljaXBhbnRzRnVsbFJvb21TdXBwb3J0OiB0aGlzLnJlY29yZGluZ0FsbFBhcnRpY2lwYW50c0Z1bGxSb29tU3VwcG9ydC52YWx1ZSxcbiAgICAgIHJlY29yZGluZ1ZpZGVvUGFydGljaXBhbnRzRnVsbFJvb21TdXBwb3J0OlxuICAgICAgICB0aGlzLnJlY29yZGluZ1ZpZGVvUGFydGljaXBhbnRzRnVsbFJvb21TdXBwb3J0LnZhbHVlLFxuICAgICAgcmVjb3JkaW5nUHJlZmVycmVkT3JpZW50YXRpb246IHRoaXMucmVjb3JkaW5nUHJlZmVycmVkT3JpZW50YXRpb24udmFsdWUsXG4gICAgICByZWNvcmRpbmdTdXBwb3J0Rm9yT3RoZXJPcmllbnRhdGlvbjogdGhpcy5yZWNvcmRpbmdTdXBwb3J0Rm9yT3RoZXJPcmllbnRhdGlvbi52YWx1ZSxcbiAgICAgIHJlY29yZGluZ011bHRpRm9ybWF0c1N1cHBvcnQ6IHRoaXMucmVjb3JkaW5nTXVsdGlGb3JtYXRzU3VwcG9ydC52YWx1ZSxcblxuICAgICAgdXNlclJlY29yZGluZ1BhcmFtczogdGhpcy51c2VyUmVjb3JkaW5nUGFyYW1zLnZhbHVlLFxuICAgICAgY2FuUmVjb3JkOiB0aGlzLmNhblJlY29yZC52YWx1ZSxcbiAgICAgIHN0YXJ0UmVwb3J0OiB0aGlzLnN0YXJ0UmVwb3J0LnZhbHVlLFxuICAgICAgZW5kUmVwb3J0OiB0aGlzLmVuZFJlcG9ydC52YWx1ZSxcbiAgICAgIHJlY29yZFN0YXJ0VGltZTogdGhpcy5yZWNvcmRTdGFydFRpbWUudmFsdWUsXG4gICAgICByZWNvcmRFbGFwc2VkVGltZTogdGhpcy5yZWNvcmRFbGFwc2VkVGltZS52YWx1ZSxcbiAgICAgIGlzVGltZXJSdW5uaW5nOiB0aGlzLmlzVGltZXJSdW5uaW5nLnZhbHVlLFxuICAgICAgY2FuUGF1c2VSZXN1bWU6IHRoaXMuY2FuUGF1c2VSZXN1bWUudmFsdWUsXG4gICAgICByZWNvcmRDaGFuZ2VTZWNvbmRzOiB0aGlzLnJlY29yZENoYW5nZVNlY29uZHMudmFsdWUsXG4gICAgICBwYXVzZUxpbWl0OiB0aGlzLnBhdXNlTGltaXQudmFsdWUsXG4gICAgICBwYXVzZVJlY29yZENvdW50OiB0aGlzLnBhdXNlUmVjb3JkQ291bnQudmFsdWUsXG4gICAgICBjYW5MYXVuY2hSZWNvcmQ6IHRoaXMuY2FuTGF1bmNoUmVjb3JkLnZhbHVlLFxuICAgICAgc3RvcExhdW5jaFJlY29yZDogdGhpcy5zdG9wTGF1bmNoUmVjb3JkLnZhbHVlLFxuXG4gICAgICBwYXJ0aWNpcGFudHNBbGw6IHRoaXMucGFydGljaXBhbnRzQWxsLnZhbHVlLFxuXG4gICAgICBmaXJzdEFsbDogdGhpcy5maXJzdEFsbC52YWx1ZSxcbiAgICAgIHVwZGF0ZU1haW5XaW5kb3c6IHRoaXMudXBkYXRlTWFpbldpbmRvdy52YWx1ZSxcbiAgICAgIGZpcnN0X3JvdW5kOiB0aGlzLmZpcnN0X3JvdW5kLnZhbHVlLFxuICAgICAgbGFuZFNjYXBlZDogdGhpcy5sYW5kU2NhcGVkLnZhbHVlLFxuICAgICAgbG9ja19zY3JlZW46IHRoaXMubG9ja19zY3JlZW4udmFsdWUsXG4gICAgICBzY3JlZW5JZDogdGhpcy5zY3JlZW5JZC52YWx1ZSxcbiAgICAgIGFsbFZpZGVvU3RyZWFtczogdGhpcy5hbGxWaWRlb1N0cmVhbXMudmFsdWUsXG4gICAgICBuZXdMaW1pdGVkU3RyZWFtczogdGhpcy5uZXdMaW1pdGVkU3RyZWFtcy52YWx1ZSxcbiAgICAgIG5ld0xpbWl0ZWRTdHJlYW1zSURzOiB0aGlzLm5ld0xpbWl0ZWRTdHJlYW1zSURzLnZhbHVlLFxuICAgICAgYWN0aXZlU291bmRzOiB0aGlzLmFjdGl2ZVNvdW5kcy52YWx1ZSxcbiAgICAgIHNjcmVlblNoYXJlSURTdHJlYW06IHRoaXMuc2NyZWVuU2hhcmVJRFN0cmVhbS52YWx1ZSxcbiAgICAgIHNjcmVlblNoYXJlTmFtZVN0cmVhbTogdGhpcy5zY3JlZW5TaGFyZU5hbWVTdHJlYW0udmFsdWUsXG4gICAgICBhZG1pbklEU3RyZWFtOiB0aGlzLmFkbWluSURTdHJlYW0udmFsdWUsXG4gICAgICBhZG1pbk5hbWVTdHJlYW06IHRoaXMuYWRtaW5OYW1lU3RyZWFtLnZhbHVlLFxuICAgICAgeW91WW91U3RyZWFtOiB0aGlzLnlvdVlvdVN0cmVhbS52YWx1ZSxcbiAgICAgIHlvdVlvdVN0cmVhbUlEczogdGhpcy55b3VZb3VTdHJlYW1JRHMudmFsdWUsXG4gICAgICBsb2NhbFN0cmVhbTogdGhpcy5sb2NhbFN0cmVhbS52YWx1ZSxcbiAgICAgIHJlY29yZFN0YXJ0ZWQ6IHRoaXMucmVjb3JkU3RhcnRlZC52YWx1ZSxcbiAgICAgIHJlY29yZFJlc3VtZWQ6IHRoaXMucmVjb3JkUmVzdW1lZC52YWx1ZSxcbiAgICAgIHJlY29yZFBhdXNlZDogdGhpcy5yZWNvcmRQYXVzZWQudmFsdWUsXG4gICAgICByZWNvcmRTdG9wcGVkOiB0aGlzLnJlY29yZFN0b3BwZWQudmFsdWUsXG4gICAgICBhZG1pblJlc3RyaWN0U2V0dGluZzogdGhpcy5hZG1pblJlc3RyaWN0U2V0dGluZy52YWx1ZSxcbiAgICAgIHZpZGVvUmVxdWVzdFN0YXRlOiB0aGlzLnZpZGVvUmVxdWVzdFN0YXRlLnZhbHVlLFxuICAgICAgdmlkZW9SZXF1ZXN0VGltZTogdGhpcy52aWRlb1JlcXVlc3RUaW1lLnZhbHVlLFxuICAgICAgdmlkZW9BY3Rpb246IHRoaXMudmlkZW9BY3Rpb24udmFsdWUsXG4gICAgICBsb2NhbFN0cmVhbVZpZGVvOiB0aGlzLmxvY2FsU3RyZWFtVmlkZW8udmFsdWUsXG4gICAgICB1c2VyRGVmYXVsdFZpZGVvSW5wdXREZXZpY2U6IHRoaXMudXNlckRlZmF1bHRWaWRlb0lucHV0RGV2aWNlLnZhbHVlLFxuICAgICAgY3VycmVudEZhY2luZ01vZGU6IHRoaXMuY3VycmVudEZhY2luZ01vZGUudmFsdWUsXG4gICAgICBwcmV2RmFjaW5nTW9kZTogdGhpcy5wcmV2RmFjaW5nTW9kZS52YWx1ZSxcbiAgICAgIGRlZlZpZGVvSUQ6IHRoaXMuZGVmVmlkZW9JRC52YWx1ZSxcbiAgICAgIGFsbG93ZWQ6IHRoaXMuYWxsb3dlZC52YWx1ZSxcbiAgICAgIGRpc3BBY3RpdmVOYW1lczogdGhpcy5kaXNwQWN0aXZlTmFtZXMudmFsdWUsXG4gICAgICBwX2Rpc3BBY3RpdmVOYW1lczogdGhpcy5wX2Rpc3BBY3RpdmVOYW1lcy52YWx1ZSxcbiAgICAgIGFjdGl2ZU5hbWVzOiB0aGlzLmFjdGl2ZU5hbWVzLnZhbHVlLFxuICAgICAgcHJldkFjdGl2ZU5hbWVzOiB0aGlzLnByZXZBY3RpdmVOYW1lcy52YWx1ZSxcbiAgICAgIHBfYWN0aXZlTmFtZXM6IHRoaXMucF9hY3RpdmVOYW1lcy52YWx1ZSxcbiAgICAgIG1lbWJlcnNSZWNlaXZlZDogdGhpcy5tZW1iZXJzUmVjZWl2ZWQudmFsdWUsXG4gICAgICBkZWZlclNjcmVlblJlY2VpdmVkOiB0aGlzLmRlZmVyU2NyZWVuUmVjZWl2ZWQudmFsdWUsXG4gICAgICBob3N0Rmlyc3RTd2l0Y2g6IHRoaXMuaG9zdEZpcnN0U3dpdGNoLnZhbHVlLFxuICAgICAgbWljQWN0aW9uOiB0aGlzLm1pY0FjdGlvbi52YWx1ZSxcbiAgICAgIHNjcmVlbkFjdGlvbjogdGhpcy5zY3JlZW5BY3Rpb24udmFsdWUsXG4gICAgICBjaGF0QWN0aW9uOiB0aGlzLmNoYXRBY3Rpb24udmFsdWUsXG4gICAgICBhdWRpb1JlcXVlc3RTdGF0ZTogdGhpcy5hdWRpb1JlcXVlc3RTdGF0ZS52YWx1ZSxcbiAgICAgIHNjcmVlblJlcXVlc3RTdGF0ZTogdGhpcy5zY3JlZW5SZXF1ZXN0U3RhdGUudmFsdWUsXG4gICAgICBjaGF0UmVxdWVzdFN0YXRlOiB0aGlzLmNoYXRSZXF1ZXN0U3RhdGUudmFsdWUsXG4gICAgICBhdWRpb1JlcXVlc3RUaW1lOiB0aGlzLmF1ZGlvUmVxdWVzdFRpbWUudmFsdWUsXG4gICAgICBzY3JlZW5SZXF1ZXN0VGltZTogdGhpcy5zY3JlZW5SZXF1ZXN0VGltZS52YWx1ZSxcbiAgICAgIGNoYXRSZXF1ZXN0VGltZTogdGhpcy5jaGF0UmVxdWVzdFRpbWUudmFsdWUsXG4gICAgICB1cGRhdGVSZXF1ZXN0SW50ZXJ2YWxTZWNvbmRzOiB0aGlzLnVwZGF0ZVJlcXVlc3RJbnRlcnZhbFNlY29uZHMudmFsdWUsXG4gICAgICBvbGRTb3VuZElkczogdGhpcy5vbGRTb3VuZElkcy52YWx1ZSxcbiAgICAgIGhvc3RMYWJlbDogdGhpcy5ob3N0TGFiZWwudmFsdWUsXG4gICAgICBtYWluU2NyZWVuRmlsbGVkOiB0aGlzLm1haW5TY3JlZW5GaWxsZWQudmFsdWUsXG4gICAgICBsb2NhbFN0cmVhbVNjcmVlbjogdGhpcy5sb2NhbFN0cmVhbVNjcmVlbi52YWx1ZSxcbiAgICAgIHNjcmVlbkFscmVhZHlPbjogdGhpcy5zY3JlZW5BbHJlYWR5T24udmFsdWUsXG4gICAgICBjaGF0QWxyZWFkeU9uOiB0aGlzLmNoYXRBbHJlYWR5T24udmFsdWUsXG4gICAgICByZWRpcmVjdFVSTDogdGhpcy5yZWRpcmVjdFVSTC52YWx1ZSxcbiAgICAgIG9sZEFsbFN0cmVhbXM6IHRoaXMub2xkQWxsU3RyZWFtcy52YWx1ZSxcbiAgICAgIGFkbWluVmlkSUQ6IHRoaXMuYWRtaW5WaWRJRC52YWx1ZSxcbiAgICAgIHN0cmVhbU5hbWVzOiB0aGlzLnN0cmVhbU5hbWVzLnZhbHVlLFxuICAgICAgbm9uX2FsVmlkZW9TdHJlYW1zOiB0aGlzLm5vbl9hbFZpZGVvU3RyZWFtcy52YWx1ZSxcbiAgICAgIHNvcnRBdWRpb0xvdWRuZXNzOiB0aGlzLnNvcnRBdWRpb0xvdWRuZXNzLnZhbHVlLFxuICAgICAgYXVkaW9EZWNpYmVsczogdGhpcy5hdWRpb0RlY2liZWxzLnZhbHVlLFxuICAgICAgbWl4ZWRfYWxWaWRlb1N0cmVhbXM6IHRoaXMubWl4ZWRfYWxWaWRlb1N0cmVhbXMudmFsdWUsXG4gICAgICBub25fYWxWaWRlb1N0cmVhbXNfbXV0ZWQ6IHRoaXMubm9uX2FsVmlkZW9TdHJlYW1zX211dGVkLnZhbHVlLFxuICAgICAgcGFnaW5hdGVkU3RyZWFtczogdGhpcy5wYWdpbmF0ZWRTdHJlYW1zLnZhbHVlLFxuICAgICAgbG9jYWxTdHJlYW1BdWRpbzogdGhpcy5sb2NhbFN0cmVhbUF1ZGlvLnZhbHVlLFxuICAgICAgZGVmQXVkaW9JRDogdGhpcy5kZWZBdWRpb0lELnZhbHVlLFxuICAgICAgdXNlckRlZmF1bHRBdWRpb0lucHV0RGV2aWNlOiB0aGlzLnVzZXJEZWZhdWx0QXVkaW9JbnB1dERldmljZS52YWx1ZSxcbiAgICAgIHVzZXJEZWZhdWx0QXVkaW9PdXRwdXREZXZpY2U6IHRoaXMudXNlckRlZmF1bHRBdWRpb091dHB1dERldmljZS52YWx1ZSxcbiAgICAgIHByZXZBdWRpb0lucHV0RGV2aWNlOiB0aGlzLnByZXZBdWRpb0lucHV0RGV2aWNlLnZhbHVlLFxuICAgICAgcHJldlZpZGVvSW5wdXREZXZpY2U6IHRoaXMucHJldlZpZGVvSW5wdXREZXZpY2UudmFsdWUsXG4gICAgICBhdWRpb1BhdXNlZDogdGhpcy5hdWRpb1BhdXNlZC52YWx1ZSxcbiAgICAgIG1haW5TY3JlZW5QZXJzb246IHRoaXMubWFpblNjcmVlblBlcnNvbi52YWx1ZSxcbiAgICAgIGFkbWluT25NYWluU2NyZWVuOiB0aGlzLmFkbWluT25NYWluU2NyZWVuLnZhbHVlLFxuICAgICAgc2NyZWVuU3RhdGVzOiB0aGlzLnNjcmVlblN0YXRlcy52YWx1ZSxcbiAgICAgIHByZXZTY3JlZW5TdGF0ZXM6IHRoaXMucHJldlNjcmVlblN0YXRlcy52YWx1ZSxcbiAgICAgIHVwZGF0ZURhdGVTdGF0ZTogdGhpcy51cGRhdGVEYXRlU3RhdGUudmFsdWUsXG4gICAgICBsYXN0VXBkYXRlOiB0aGlzLmxhc3RVcGRhdGUudmFsdWUsXG4gICAgICBuRm9yUmVhZGp1c3RSZWNvcmQ6IHRoaXMubkZvclJlYWRqdXN0UmVjb3JkLnZhbHVlLFxuICAgICAgZml4ZWRQYWdlTGltaXQ6IHRoaXMuZml4ZWRQYWdlTGltaXQudmFsdWUsXG4gICAgICByZW1vdmVBbHRHcmlkOiB0aGlzLnJlbW92ZUFsdEdyaWQudmFsdWUsXG4gICAgICBuRm9yUmVhZGp1c3Q6IHRoaXMubkZvclJlYWRqdXN0LnZhbHVlLFxuICAgICAgbGFzdFJlb3JkZXJUaW1lOiB0aGlzLmxhc3RSZW9yZGVyVGltZS52YWx1ZSxcbiAgICAgIHJlb3JkZXJJbnRlcnZhbDogdGhpcy5yZW9yZGVySW50ZXJ2YWwudmFsdWUsXG4gICAgICBmYXN0UmVvcmRlckludGVydmFsOiB0aGlzLmZhc3RSZW9yZGVySW50ZXJ2YWwudmFsdWUsXG4gICAgICBhdWRTdHJlYW1OYW1lczogdGhpcy5hdWRTdHJlYW1OYW1lcy52YWx1ZSxcbiAgICAgIGN1cnJlbnRVc2VyUGFnZTogdGhpcy5jdXJyZW50VXNlclBhZ2UudmFsdWUsXG4gICAgICBtYWluSGVpZ2h0V2lkdGg6IHRoaXMubWFpbkhlaWdodFdpZHRoLnZhbHVlLFxuICAgICAgcHJldk1haW5IZWlnaHRXaWR0aDogdGhpcy5wcmV2TWFpbkhlaWdodFdpZHRoLnZhbHVlLFxuICAgICAgcHJldkRvUGFnaW5hdGU6IHRoaXMucHJldkRvUGFnaW5hdGUudmFsdWUsXG4gICAgICBkb1BhZ2luYXRlOiB0aGlzLmRvUGFnaW5hdGUudmFsdWUsXG4gICAgICBzaGFyZUVuZGVkOiB0aGlzLnNoYXJlRW5kZWQudmFsdWUsXG4gICAgICBsU3RyZWFtczogdGhpcy5sU3RyZWFtcy52YWx1ZSxcbiAgICAgIGNoYXRSZWZTdHJlYW1zOiB0aGlzLmNoYXRSZWZTdHJlYW1zLnZhbHVlLFxuICAgICAgY29udHJvbEhlaWdodDogdGhpcy5jb250cm9sSGVpZ2h0LnZhbHVlLFxuICAgICAgaXNXaWRlU2NyZWVuOiB0aGlzLmlzV2lkZVNjcmVlbi52YWx1ZSxcbiAgICAgIGlzTWVkaXVtU2NyZWVuOiB0aGlzLmlzTWVkaXVtU2NyZWVuLnZhbHVlLFxuICAgICAgaXNTbWFsbFNjcmVlbjogdGhpcy5pc1NtYWxsU2NyZWVuLnZhbHVlLFxuICAgICAgYWRkR3JpZDogdGhpcy5hZGRHcmlkLnZhbHVlLFxuICAgICAgYWRkQWx0R3JpZDogdGhpcy5hZGRBbHRHcmlkLnZhbHVlLFxuICAgICAgZ3JpZFJvd3M6IHRoaXMuZ3JpZFJvd3MudmFsdWUsXG4gICAgICBncmlkQ29sczogdGhpcy5ncmlkQ29scy52YWx1ZSxcbiAgICAgIGFsdEdyaWRSb3dzOiB0aGlzLmFsdEdyaWRSb3dzLnZhbHVlLFxuICAgICAgYWx0R3JpZENvbHM6IHRoaXMuYWx0R3JpZENvbHMudmFsdWUsXG4gICAgICBudW1iZXJQYWdlczogdGhpcy5udW1iZXJQYWdlcy52YWx1ZSxcbiAgICAgIGN1cnJlbnRTdHJlYW1zOiB0aGlzLmN1cnJlbnRTdHJlYW1zLnZhbHVlLFxuICAgICAgc2hvd01pbmlWaWV3OiB0aGlzLnNob3dNaW5pVmlldy52YWx1ZSxcbiAgICAgIG5TdHJlYW06IHRoaXMublN0cmVhbS52YWx1ZSxcbiAgICAgIGRlZmVyX3JlY2VpdmU6IHRoaXMuZGVmZXJfcmVjZWl2ZS52YWx1ZSxcbiAgICAgIGFsbEF1ZGlvU3RyZWFtczogdGhpcy5hbGxBdWRpb1N0cmVhbXMudmFsdWUsXG4gICAgICBzY3JlZW5Qcm9kdWNlcjogdGhpcy5zY3JlZW5Qcm9kdWNlci52YWx1ZSxcbiAgICAgIHJlbW90ZVNjcmVlblN0cmVhbTogdGhpcy5yZW1vdGVTY3JlZW5TdHJlYW0udmFsdWUsXG4gICAgICBnb3RBbGxWaWRzOiB0aGlzLmdvdEFsbFZpZHMudmFsdWUsXG4gICAgICBwYWdpbmF0aW9uSGVpZ2h0V2lkdGg6IHRoaXMucGFnaW5hdGlvbkhlaWdodFdpZHRoLnZhbHVlLFxuICAgICAgcGFnaW5hdGlvbkRpcmVjdGlvbjogdGhpcy5wYWdpbmF0aW9uRGlyZWN0aW9uLnZhbHVlLFxuICAgICAgZ3JpZFNpemVzOiB0aGlzLmdyaWRTaXplcy52YWx1ZSxcbiAgICAgIHNjcmVlbkZvcmNlRnVsbERpc3BsYXk6IHRoaXMuc2NyZWVuRm9yY2VGdWxsRGlzcGxheS52YWx1ZSxcbiAgICAgIG1haW5HcmlkU3RyZWFtOiB0aGlzLm1haW5HcmlkU3RyZWFtLnZhbHVlLFxuICAgICAgb3RoZXJHcmlkU3RyZWFtczogdGhpcy5vdGhlckdyaWRTdHJlYW1zLnZhbHVlLFxuICAgICAgYXVkaW9Pbmx5U3RyZWFtczogdGhpcy5hdWRpb09ubHlTdHJlYW1zLnZhbHVlLFxuICAgICAgdmlkZW9JbnB1dHM6IHRoaXMudmlkZW9JbnB1dHMudmFsdWUsXG4gICAgICBhdWRpb0lucHV0czogdGhpcy5hdWRpb0lucHV0cy52YWx1ZSxcbiAgICAgIG1lZXRpbmdQcm9ncmVzc1RpbWU6IHRoaXMubWVldGluZ1Byb2dyZXNzVGltZS52YWx1ZSxcbiAgICAgIG1lZXRpbmdFbGFwc2VkVGltZTogdGhpcy5tZWV0aW5nRWxhcHNlZFRpbWUudmFsdWUsXG5cbiAgICAgIHJlZl9wYXJ0aWNpcGFudHM6IHRoaXMucmVmX3BhcnRpY2lwYW50cy52YWx1ZSxcblxuICAgICAgbWVzc2FnZXM6IHRoaXMubWVzc2FnZXMudmFsdWUsXG4gICAgICBzdGFydERpcmVjdE1lc3NhZ2U6IHRoaXMuc3RhcnREaXJlY3RNZXNzYWdlLnZhbHVlLFxuICAgICAgZGlyZWN0TWVzc2FnZURldGFpbHM6IHRoaXMuZGlyZWN0TWVzc2FnZURldGFpbHMudmFsdWUsXG4gICAgICBjb0hvc3Q6IHRoaXMuY29Ib3N0LnZhbHVlLFxuICAgICAgY29Ib3N0UmVzcG9uc2liaWxpdHk6IHRoaXMuY29Ib3N0UmVzcG9uc2liaWxpdHkudmFsdWUsXG5cbiAgICAgIC8vIEV2ZW50IHNldHRpbmdzXG4gICAgICBhdWRpb1NldHRpbmc6IHRoaXMuYXVkaW9TZXR0aW5nLnZhbHVlLFxuICAgICAgdmlkZW9TZXR0aW5nOiB0aGlzLnZpZGVvU2V0dGluZy52YWx1ZSxcbiAgICAgIHNjcmVlbnNoYXJlU2V0dGluZzogdGhpcy5zY3JlZW5zaGFyZVNldHRpbmcudmFsdWUsXG4gICAgICBjaGF0U2V0dGluZzogdGhpcy5jaGF0U2V0dGluZy52YWx1ZSxcblxuICAgICAgLy8gRGlzcGxheSBzZXR0aW5nc1xuICAgICAgYXV0b1dhdmU6IHRoaXMuYXV0b1dhdmUudmFsdWUsXG4gICAgICBmb3JjZUZ1bGxEaXNwbGF5OiB0aGlzLmZvcmNlRnVsbERpc3BsYXkudmFsdWUsXG4gICAgICBwcmV2Rm9yY2VGdWxsRGlzcGxheTogdGhpcy5wcmV2Rm9yY2VGdWxsRGlzcGxheS52YWx1ZSxcbiAgICAgIHByZXZNZWV0aW5nRGlzcGxheVR5cGU6IHRoaXMucHJldk1lZXRpbmdEaXNwbGF5VHlwZS52YWx1ZSxcblxuICAgICAgLy8gV2FpdGluZyByb29tXG4gICAgICB3YWl0aW5nUm9vbUZpbHRlcjogdGhpcy53YWl0aW5nUm9vbUZpbHRlci52YWx1ZSxcbiAgICAgIHdhaXRpbmdSb29tTGlzdDogdGhpcy53YWl0aW5nUm9vbUxpc3QudmFsdWUsXG4gICAgICB3YWl0aW5nUm9vbUNvdW50ZXI6IHRoaXMud2FpdGluZ1Jvb21Db3VudGVyLnZhbHVlLFxuICAgICAgZmlsdGVyZWRXYWl0aW5nUm9vbUxpc3Q6IHRoaXMuZmlsdGVyZWRXYWl0aW5nUm9vbUxpc3QudmFsdWUsXG5cbiAgICAgIC8vIFJlcXVlc3RzXG4gICAgICByZXF1ZXN0RmlsdGVyOiB0aGlzLnJlcXVlc3RGaWx0ZXIudmFsdWUsXG4gICAgICByZXF1ZXN0TGlzdDogdGhpcy5yZXF1ZXN0TGlzdC52YWx1ZSxcbiAgICAgIHJlcXVlc3RDb3VudGVyOiB0aGlzLnJlcXVlc3RDb3VudGVyLnZhbHVlLFxuICAgICAgZmlsdGVyZWRSZXF1ZXN0TGlzdDogdGhpcy5maWx0ZXJlZFJlcXVlc3RMaXN0LnZhbHVlLFxuXG4gICAgICAvLyBUb3RhbCByZXF1ZXN0cyBhbmQgd2FpdGluZyByb29tXG4gICAgICB0b3RhbFJlcVdhaXQ6IHRoaXMudG90YWxSZXFXYWl0LnZhbHVlLFxuXG4gICAgICAvLyBBbGVydHNcbiAgICAgIGFsZXJ0VmlzaWJsZTogdGhpcy5hbGVydFZpc2libGUudmFsdWUsXG4gICAgICBhbGVydE1lc3NhZ2U6IHRoaXMuYWxlcnRNZXNzYWdlLnZhbHVlLFxuICAgICAgYWxlcnRUeXBlOiB0aGlzLmFsZXJ0VHlwZS52YWx1ZSxcbiAgICAgIGFsZXJ0RHVyYXRpb246IHRoaXMuYWxlcnREdXJhdGlvbi52YWx1ZSxcblxuICAgICAgLy8gUHJvZ3Jlc3MgVGltZXJcbiAgICAgIHByb2dyZXNzVGltZXJWaXNpYmxlOiB0aGlzLnByb2dyZXNzVGltZXJWaXNpYmxlLnZhbHVlLFxuICAgICAgcHJvZ3Jlc3NUaW1lclZhbHVlOiB0aGlzLnByb2dyZXNzVGltZXJWYWx1ZS52YWx1ZSxcblxuICAgICAgLy8gTWVudSBtb2RhbHNcbiAgICAgIGlzTWVudU1vZGFsVmlzaWJsZTogdGhpcy5pc01lbnVNb2RhbFZpc2libGUudmFsdWUsXG4gICAgICBpc1JlY29yZGluZ01vZGFsVmlzaWJsZTogdGhpcy5pc1JlY29yZGluZ01vZGFsVmlzaWJsZS52YWx1ZSxcbiAgICAgIGlzU2V0dGluZ3NNb2RhbFZpc2libGU6IHRoaXMuaXNTZXR0aW5nc01vZGFsVmlzaWJsZS52YWx1ZSxcbiAgICAgIGlzUmVxdWVzdHNNb2RhbFZpc2libGU6IHRoaXMuaXNSZXF1ZXN0c01vZGFsVmlzaWJsZS52YWx1ZSxcbiAgICAgIGlzV2FpdGluZ01vZGFsVmlzaWJsZTogdGhpcy5pc1dhaXRpbmdNb2RhbFZpc2libGUudmFsdWUsXG4gICAgICBpc0NvSG9zdE1vZGFsVmlzaWJsZTogdGhpcy5pc0NvSG9zdE1vZGFsVmlzaWJsZS52YWx1ZSxcbiAgICAgIGlzTWVkaWFTZXR0aW5nc01vZGFsVmlzaWJsZTogdGhpcy5pc01lZGlhU2V0dGluZ3NNb2RhbFZpc2libGUudmFsdWUsXG4gICAgICBpc0Rpc3BsYXlTZXR0aW5nc01vZGFsVmlzaWJsZTogdGhpcy5pc0Rpc3BsYXlTZXR0aW5nc01vZGFsVmlzaWJsZS52YWx1ZSxcblxuICAgICAgLy8gT3RoZXIgTW9kYWxzXG4gICAgICBpc1BhcnRpY2lwYW50c01vZGFsVmlzaWJsZTogdGhpcy5pc1BhcnRpY2lwYW50c01vZGFsVmlzaWJsZS52YWx1ZSxcbiAgICAgIGlzTWVzc2FnZXNNb2RhbFZpc2libGU6IHRoaXMuaXNNZXNzYWdlc01vZGFsVmlzaWJsZS52YWx1ZSxcbiAgICAgIGlzQ29uZmlybUV4aXRNb2RhbFZpc2libGU6IHRoaXMuaXNDb25maXJtRXhpdE1vZGFsVmlzaWJsZS52YWx1ZSxcbiAgICAgIGlzQ29uZmlybUhlcmVNb2RhbFZpc2libGU6IHRoaXMuaXNDb25maXJtSGVyZU1vZGFsVmlzaWJsZS52YWx1ZSxcbiAgICAgIGlzTG9hZGluZ01vZGFsVmlzaWJsZTogdGhpcy5pc0xvYWRpbmdNb2RhbFZpc2libGUudmFsdWUsXG5cbiAgICAgIC8vIFJlY29yZGluZyBPcHRpb25zXG4gICAgICByZWNvcmRpbmdNZWRpYU9wdGlvbnM6IHRoaXMucmVjb3JkaW5nTWVkaWFPcHRpb25zLnZhbHVlLFxuICAgICAgcmVjb3JkaW5nQXVkaW9PcHRpb25zOiB0aGlzLnJlY29yZGluZ0F1ZGlvT3B0aW9ucy52YWx1ZSxcbiAgICAgIHJlY29yZGluZ1ZpZGVvT3B0aW9uczogdGhpcy5yZWNvcmRpbmdWaWRlb09wdGlvbnMudmFsdWUsXG4gICAgICByZWNvcmRpbmdWaWRlb1R5cGU6IHRoaXMucmVjb3JkaW5nVmlkZW9UeXBlLnZhbHVlLFxuICAgICAgcmVjb3JkaW5nVmlkZW9PcHRpbWl6ZWQ6IHRoaXMucmVjb3JkaW5nVmlkZW9PcHRpbWl6ZWQudmFsdWUsXG4gICAgICByZWNvcmRpbmdEaXNwbGF5VHlwZTogdGhpcy5yZWNvcmRpbmdEaXNwbGF5VHlwZS52YWx1ZSxcbiAgICAgIHJlY29yZGluZ0FkZEhMUzogdGhpcy5yZWNvcmRpbmdBZGRITFMudmFsdWUsXG4gICAgICByZWNvcmRpbmdBZGRUZXh0OiB0aGlzLnJlY29yZGluZ0FkZFRleHQudmFsdWUsXG4gICAgICByZWNvcmRpbmdDdXN0b21UZXh0OiB0aGlzLnJlY29yZGluZ0N1c3RvbVRleHQudmFsdWUsXG4gICAgICByZWNvcmRpbmdDdXN0b21UZXh0UG9zaXRpb246IHRoaXMucmVjb3JkaW5nQ3VzdG9tVGV4dFBvc2l0aW9uLnZhbHVlLFxuICAgICAgcmVjb3JkaW5nQ3VzdG9tVGV4dENvbG9yOiB0aGlzLnJlY29yZGluZ0N1c3RvbVRleHRDb2xvci52YWx1ZSxcbiAgICAgIHJlY29yZGluZ05hbWVUYWdzOiB0aGlzLnJlY29yZGluZ05hbWVUYWdzLnZhbHVlLFxuICAgICAgcmVjb3JkaW5nQmFja2dyb3VuZENvbG9yOiB0aGlzLnJlY29yZGluZ0JhY2tncm91bmRDb2xvci52YWx1ZSxcbiAgICAgIHJlY29yZGluZ05hbWVUYWdzQ29sb3I6IHRoaXMucmVjb3JkaW5nTmFtZVRhZ3NDb2xvci52YWx1ZSxcbiAgICAgIHJlY29yZGluZ09yaWVudGF0aW9uVmlkZW86IHRoaXMucmVjb3JkaW5nT3JpZW50YXRpb25WaWRlby52YWx1ZSxcbiAgICAgIGNsZWFyZWRUb1Jlc3VtZTogdGhpcy5jbGVhcmVkVG9SZXN1bWUudmFsdWUsXG4gICAgICBjbGVhcmVkVG9SZWNvcmQ6IHRoaXMuY2xlYXJlZFRvUmVjb3JkLnZhbHVlLFxuICAgICAgcmVjb3JkU3RhdGU6IHRoaXMucmVjb3JkU3RhdGUudmFsdWUsXG4gICAgICBzaG93UmVjb3JkQnV0dG9uczogdGhpcy5zaG93UmVjb3JkQnV0dG9ucy52YWx1ZSxcbiAgICAgIHJlY29yZGluZ1Byb2dyZXNzVGltZTogdGhpcy5yZWNvcmRpbmdQcm9ncmVzc1RpbWUudmFsdWUsXG4gICAgICBhdWRpb1N3aXRjaGluZzogdGhpcy5hdWRpb1N3aXRjaGluZy52YWx1ZSxcbiAgICAgIHZpZGVvU3dpdGNoaW5nOiB0aGlzLnZpZGVvU3dpdGNoaW5nLnZhbHVlLFxuXG4gICAgICAvLyBNZWRpYSBzdGF0ZXNcbiAgICAgIHZpZGVvQWxyZWFkeU9uOiB0aGlzLnZpZGVvQWxyZWFkeU9uLnZhbHVlLFxuICAgICAgYXVkaW9BbHJlYWR5T246IHRoaXMuYXVkaW9BbHJlYWR5T24udmFsdWUsXG4gICAgICBjb21wb25lbnRTaXplczogdGhpcy5jb21wb25lbnRTaXplcy52YWx1ZSxcblxuICAgICAgLy8gUGVybWlzc2lvbnNcbiAgICAgIGhhc0NhbWVyYVBlcm1pc3Npb246IHRoaXMuaGFzQ2FtZXJhUGVybWlzc2lvbi52YWx1ZSxcbiAgICAgIGhhc0F1ZGlvUGVybWlzc2lvbjogdGhpcy5oYXNBdWRpb1Blcm1pc3Npb24udmFsdWUsXG5cbiAgICAgIC8vIFRyYW5zcG9ydHNcbiAgICAgIHRyYW5zcG9ydENyZWF0ZWQ6IHRoaXMudHJhbnNwb3J0Q3JlYXRlZC52YWx1ZSxcbiAgICAgIHRyYW5zcG9ydENyZWF0ZWRWaWRlbzogdGhpcy50cmFuc3BvcnRDcmVhdGVkVmlkZW8udmFsdWUsXG4gICAgICB0cmFuc3BvcnRDcmVhdGVkQXVkaW86IHRoaXMudHJhbnNwb3J0Q3JlYXRlZEF1ZGlvLnZhbHVlLFxuICAgICAgdHJhbnNwb3J0Q3JlYXRlZFNjcmVlbjogdGhpcy50cmFuc3BvcnRDcmVhdGVkU2NyZWVuLnZhbHVlLFxuICAgICAgcHJvZHVjZXJUcmFuc3BvcnQ6IHRoaXMucHJvZHVjZXJUcmFuc3BvcnQudmFsdWUsXG4gICAgICB2aWRlb1Byb2R1Y2VyOiB0aGlzLnZpZGVvUHJvZHVjZXIudmFsdWUsXG4gICAgICBwYXJhbXM6IHRoaXMucGFyYW1zLnZhbHVlLFxuICAgICAgdmlkZW9QYXJhbXM6IHRoaXMudmlkZW9QYXJhbXMudmFsdWUsXG4gICAgICBhdWRpb1BhcmFtczogdGhpcy5hdWRpb1BhcmFtcy52YWx1ZSxcbiAgICAgIGF1ZGlvUHJvZHVjZXI6IHRoaXMuYXVkaW9Qcm9kdWNlci52YWx1ZSxcbiAgICAgIGNvbnN1bWVyVHJhbnNwb3J0czogdGhpcy5jb25zdW1lclRyYW5zcG9ydHMudmFsdWUsXG4gICAgICBjb25zdW1pbmdUcmFuc3BvcnRzOiB0aGlzLmNvbnN1bWluZ1RyYW5zcG9ydHMudmFsdWUsXG5cbiAgICAgIC8vIFBvbGxzXG4gICAgICBwb2xsczogdGhpcy5wb2xscy52YWx1ZSxcbiAgICAgIHBvbGw6IHRoaXMucG9sbC52YWx1ZSxcbiAgICAgIGlzUG9sbE1vZGFsVmlzaWJsZTogdGhpcy5pc1BvbGxNb2RhbFZpc2libGUudmFsdWUsXG5cbiAgICAgIC8vIEJhY2tncm91bmRcbiAgICAgIGN1c3RvbUltYWdlOiB0aGlzLmN1c3RvbUltYWdlLnZhbHVlLFxuICAgICAgc2VsZWN0ZWRJbWFnZTogdGhpcy5zZWxlY3RlZEltYWdlLnZhbHVlLFxuICAgICAgc2VnbWVudFZpZGVvOiB0aGlzLnNlZ21lbnRWaWRlby52YWx1ZSxcbiAgICAgIHNlbGZpZVNlZ21lbnRhdGlvbjogdGhpcy5zZWxmaWVTZWdtZW50YXRpb24udmFsdWUsXG4gICAgICBwYXVzZVNlZ21lbnRhdGlvbjogdGhpcy5wYXVzZVNlZ21lbnRhdGlvbi52YWx1ZSxcbiAgICAgIHByb2Nlc3NlZFN0cmVhbTogdGhpcy5wcm9jZXNzZWRTdHJlYW0udmFsdWUsXG4gICAgICBrZWVwQmFja2dyb3VuZDogdGhpcy5rZWVwQmFja2dyb3VuZC52YWx1ZSxcbiAgICAgIGJhY2tncm91bmRIYXNDaGFuZ2VkOiB0aGlzLmJhY2tncm91bmRIYXNDaGFuZ2VkLnZhbHVlLFxuICAgICAgdmlydHVhbFN0cmVhbTogdGhpcy52aXJ0dWFsU3RyZWFtLnZhbHVlLFxuICAgICAgbWFpbkNhbnZhczogdGhpcy5tYWluQ2FudmFzLnZhbHVlLFxuICAgICAgcHJldktlZXBCYWNrZ3JvdW5kOiB0aGlzLnByZXZLZWVwQmFja2dyb3VuZC52YWx1ZSxcbiAgICAgIGFwcGxpZWRCYWNrZ3JvdW5kOiB0aGlzLmFwcGxpZWRCYWNrZ3JvdW5kLnZhbHVlLFxuICAgICAgaXNCYWNrZ3JvdW5kTW9kYWxWaXNpYmxlOiB0aGlzLmlzQmFja2dyb3VuZE1vZGFsVmlzaWJsZS52YWx1ZSxcbiAgICAgIGF1dG9DbGlja0JhY2tncm91bmQ6IHRoaXMuYXV0b0NsaWNrQmFja2dyb3VuZC52YWx1ZSxcblxuICAgICAgLy8gQnJlYWtvdXQgcm9vbXNcbiAgICAgIGJyZWFrb3V0Um9vbXM6IHRoaXMuYnJlYWtvdXRSb29tcy52YWx1ZSxcbiAgICAgIGN1cnJlbnRSb29tSW5kZXg6IHRoaXMuY3VycmVudFJvb21JbmRleC52YWx1ZSxcbiAgICAgIGNhblN0YXJ0QnJlYWtvdXQ6IHRoaXMuY2FuU3RhcnRCcmVha291dC52YWx1ZSxcbiAgICAgIGJyZWFrT3V0Um9vbVN0YXJ0ZWQ6IHRoaXMuYnJlYWtPdXRSb29tU3RhcnRlZC52YWx1ZSxcbiAgICAgIGJyZWFrT3V0Um9vbUVuZGVkOiB0aGlzLmJyZWFrT3V0Um9vbUVuZGVkLnZhbHVlLFxuICAgICAgaG9zdE5ld1Jvb206IHRoaXMuaG9zdE5ld1Jvb20udmFsdWUsXG4gICAgICBsaW1pdGVkQnJlYWtSb29tOiB0aGlzLmxpbWl0ZWRCcmVha1Jvb20udmFsdWUsXG4gICAgICBtYWluUm9vbXNMZW5ndGg6IHRoaXMubWFpblJvb21zTGVuZ3RoLnZhbHVlLFxuICAgICAgbWVtYmVyUm9vbTogdGhpcy5tZW1iZXJSb29tLnZhbHVlLFxuICAgICAgaXNCcmVha291dFJvb21zTW9kYWxWaXNpYmxlOiB0aGlzLmlzQnJlYWtvdXRSb29tc01vZGFsVmlzaWJsZS52YWx1ZSxcblxuICAgICAgLy8gV2hpdGVib2FyZFxuICAgICAgd2hpdGVib2FyZFVzZXJzOiB0aGlzLndoaXRlYm9hcmRVc2Vycy52YWx1ZSxcbiAgICAgIGN1cnJlbnRXaGl0ZWJvYXJkSW5kZXg6IHRoaXMuY3VycmVudFdoaXRlYm9hcmRJbmRleC52YWx1ZSxcbiAgICAgIGNhblN0YXJ0V2hpdGVib2FyZDogdGhpcy5jYW5TdGFydFdoaXRlYm9hcmQudmFsdWUsXG4gICAgICB3aGl0ZWJvYXJkU3RhcnRlZDogdGhpcy53aGl0ZWJvYXJkU3RhcnRlZC52YWx1ZSxcbiAgICAgIHdoaXRlYm9hcmRFbmRlZDogdGhpcy53aGl0ZWJvYXJkRW5kZWQudmFsdWUsXG4gICAgICB3aGl0ZWJvYXJkTGltaXQ6IHRoaXMud2hpdGVib2FyZExpbWl0LnZhbHVlLFxuICAgICAgaXNXaGl0ZWJvYXJkTW9kYWxWaXNpYmxlOiB0aGlzLmlzV2hpdGVib2FyZE1vZGFsVmlzaWJsZS52YWx1ZSxcbiAgICAgIGlzQ29uZmlndXJlV2hpdGVib2FyZE1vZGFsVmlzaWJsZTogdGhpcy5pc0NvbmZpZ3VyZVdoaXRlYm9hcmRNb2RhbFZpc2libGUudmFsdWUsXG4gICAgICBzaGFwZXM6IHRoaXMuc2hhcGVzLnZhbHVlLFxuICAgICAgdXNlSW1hZ2VCYWNrZ3JvdW5kOiB0aGlzLnVzZUltYWdlQmFja2dyb3VuZC52YWx1ZSxcbiAgICAgIHJlZG9TdGFjazogdGhpcy5yZWRvU3RhY2sudmFsdWUsXG4gICAgICB1bmRvU3RhY2s6IHRoaXMudW5kb1N0YWNrLnZhbHVlLFxuICAgICAgY2FudmFzU3RyZWFtOiB0aGlzLmNhbnZhc1N0cmVhbS52YWx1ZSxcbiAgICAgIGNhbnZhc1doaXRlYm9hcmQ6IHRoaXMuY2FudmFzV2hpdGVib2FyZC52YWx1ZSxcblxuICAgICAgLy8gU2NyZWVuYm9hcmRcbiAgICAgIGNhbnZhc1NjcmVlbmJvYXJkOiB0aGlzLmNhbnZhc1NjcmVlbmJvYXJkLnZhbHVlLFxuICAgICAgcHJvY2Vzc2VkU2NyZWVuU3RyZWFtOiB0aGlzLnByb2Nlc3NlZFNjcmVlblN0cmVhbS52YWx1ZSxcbiAgICAgIGFubm90YXRlU2NyZWVuU3RyZWFtOiB0aGlzLmFubm90YXRlU2NyZWVuU3RyZWFtLnZhbHVlLFxuICAgICAgbWFpblNjcmVlbkNhbnZhczogdGhpcy5tYWluU2NyZWVuQ2FudmFzLnZhbHVlLFxuICAgICAgaXNTY3JlZW5ib2FyZE1vZGFsVmlzaWJsZTogdGhpcy5pc1NjcmVlbmJvYXJkTW9kYWxWaXNpYmxlLnZhbHVlLFxuXG4gICAgICB2YWxpZGF0ZWQ6IHRoaXMudmFsaWRhdGVkLnZhbHVlLFxuICAgICAgZGV2aWNlOiB0aGlzLmRldmljZS52YWx1ZSxcbiAgICAgIHNvY2tldDogdGhpcy5zb2NrZXQudmFsdWUsXG4gICAgICBjaGVja01lZGlhUGVybWlzc2lvbjogZmFsc2UsXG4gICAgICBvbldlYjogdHJ1ZSxcblxuICAgICAgLy8gVXBkYXRlIGZ1bmN0aW9uc1xuICAgICAgdXBkYXRlUm9vbU5hbWU6IHRoaXMudXBkYXRlUm9vbU5hbWUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZU1lbWJlcjogdGhpcy51cGRhdGVNZW1iZXIuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUFkbWluUGFzc2NvZGU6IHRoaXMudXBkYXRlQWRtaW5QYXNzY29kZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlWW91QXJlQ29Ib3N0OiB0aGlzLnVwZGF0ZVlvdUFyZUNvSG9zdC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlWW91QXJlSG9zdDogdGhpcy51cGRhdGVZb3VBcmVIb3N0LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVJc2xldmVsOiB0aGlzLnVwZGF0ZUlzbGV2ZWwuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUNvSG9zdDogdGhpcy51cGRhdGVDb0hvc3QuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUNvSG9zdFJlc3BvbnNpYmlsaXR5OiB0aGlzLnVwZGF0ZUNvSG9zdFJlc3BvbnNpYmlsaXR5LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVDb25maXJtZWRUb1JlY29yZDogdGhpcy51cGRhdGVDb25maXJtZWRUb1JlY29yZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTWVldGluZ0Rpc3BsYXlUeXBlOiB0aGlzLnVwZGF0ZU1lZXRpbmdEaXNwbGF5VHlwZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTWVldGluZ1ZpZGVvT3B0aW1pemVkOiB0aGlzLnVwZGF0ZU1lZXRpbmdWaWRlb09wdGltaXplZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlRXZlbnRUeXBlOiB0aGlzLnVwZGF0ZUV2ZW50VHlwZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUGFydGljaXBhbnRzOiB0aGlzLnVwZGF0ZVBhcnRpY2lwYW50cy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUGFydGljaXBhbnRzQ291bnRlcjogdGhpcy51cGRhdGVQYXJ0aWNpcGFudHNDb3VudGVyLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVQYXJ0aWNpcGFudHNGaWx0ZXI6IHRoaXMudXBkYXRlUGFydGljaXBhbnRzRmlsdGVyLmJpbmQodGhpcyksXG5cbiAgICAgIC8vIE1vcmUgdXBkYXRlIGZ1bmN0aW9ucyBmb3IgbWVkaWEgZGV0YWlsc1xuICAgICAgdXBkYXRlQ29uc3VtZV9zb2NrZXRzOiB0aGlzLnVwZGF0ZUNvbnN1bWVfc29ja2V0cy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUnRwQ2FwYWJpbGl0aWVzOiB0aGlzLnVwZGF0ZVJ0cENhcGFiaWxpdGllcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUm9vbVJlY3ZJUHM6IHRoaXMudXBkYXRlUm9vbVJlY3ZJUHMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZU1lZXRpbmdSb29tUGFyYW1zOiB0aGlzLnVwZGF0ZU1lZXRpbmdSb29tUGFyYW1zLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVJdGVtUGFnZUxpbWl0OiB0aGlzLnVwZGF0ZUl0ZW1QYWdlTGltaXQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUF1ZGlvT25seVJvb206IHRoaXMudXBkYXRlQXVkaW9Pbmx5Um9vbS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQWRkRm9yQmFzaWM6IHRoaXMudXBkYXRlQWRkRm9yQmFzaWMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVNjcmVlblBhZ2VMaW1pdDogdGhpcy51cGRhdGVTY3JlZW5QYWdlTGltaXQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVNoYXJlU2NyZWVuU3RhcnRlZDogdGhpcy51cGRhdGVTaGFyZVNjcmVlblN0YXJ0ZWQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVNoYXJlZDogdGhpcy51cGRhdGVTaGFyZWQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVRhcmdldE9yaWVudGF0aW9uOiB0aGlzLnVwZGF0ZVRhcmdldE9yaWVudGF0aW9uLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVUYXJnZXRSZXNvbHV0aW9uOiB0aGlzLnVwZGF0ZVRhcmdldFJlc29sdXRpb24uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVRhcmdldFJlc29sdXRpb25Ib3N0OiB0aGlzLnVwZGF0ZVRhcmdldFJlc29sdXRpb25Ib3N0LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVWaWRDb25zOiB0aGlzLnVwZGF0ZVZpZENvbnMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUZyYW1lUmF0ZTogdGhpcy51cGRhdGVGcmFtZVJhdGUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUhQYXJhbXM6IHRoaXMudXBkYXRlSFBhcmFtcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlVlBhcmFtczogdGhpcy51cGRhdGVWUGFyYW1zLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVTY3JlZW5QYXJhbXM6IHRoaXMudXBkYXRlU2NyZWVuUGFyYW1zLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVBUGFyYW1zOiB0aGlzLnVwZGF0ZUFQYXJhbXMuYmluZCh0aGlzKSxcblxuICAgICAgLy8gTW9yZSB1cGRhdGUgZnVuY3Rpb25zIGZvciByZWNvcmRpbmcgZGV0YWlsc1xuICAgICAgdXBkYXRlUmVjb3JkaW5nQXVkaW9QYXVzZXNMaW1pdDogdGhpcy51cGRhdGVSZWNvcmRpbmdBdWRpb1BhdXNlc0xpbWl0LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRpbmdBdWRpb1BhdXNlc0NvdW50OiB0aGlzLnVwZGF0ZVJlY29yZGluZ0F1ZGlvUGF1c2VzQ291bnQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ0F1ZGlvU3VwcG9ydDogdGhpcy51cGRhdGVSZWNvcmRpbmdBdWRpb1N1cHBvcnQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ0F1ZGlvUGVvcGxlTGltaXQ6IHRoaXMudXBkYXRlUmVjb3JkaW5nQXVkaW9QZW9wbGVMaW1pdC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nQXVkaW9QYXJ0aWNpcGFudHNUaW1lTGltaXQ6XG4gICAgICAgIHRoaXMudXBkYXRlUmVjb3JkaW5nQXVkaW9QYXJ0aWNpcGFudHNUaW1lTGltaXQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ1ZpZGVvUGF1c2VzQ291bnQ6IHRoaXMudXBkYXRlUmVjb3JkaW5nVmlkZW9QYXVzZXNDb3VudC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nVmlkZW9QYXVzZXNMaW1pdDogdGhpcy51cGRhdGVSZWNvcmRpbmdWaWRlb1BhdXNlc0xpbWl0LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRpbmdWaWRlb1N1cHBvcnQ6IHRoaXMudXBkYXRlUmVjb3JkaW5nVmlkZW9TdXBwb3J0LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRpbmdWaWRlb1Blb3BsZUxpbWl0OiB0aGlzLnVwZGF0ZVJlY29yZGluZ1ZpZGVvUGVvcGxlTGltaXQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ1ZpZGVvUGFydGljaXBhbnRzVGltZUxpbWl0OlxuICAgICAgICB0aGlzLnVwZGF0ZVJlY29yZGluZ1ZpZGVvUGFydGljaXBhbnRzVGltZUxpbWl0LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRpbmdBbGxQYXJ0aWNpcGFudHNTdXBwb3J0OiB0aGlzLnVwZGF0ZVJlY29yZGluZ0FsbFBhcnRpY2lwYW50c1N1cHBvcnQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ1ZpZGVvUGFydGljaXBhbnRzU3VwcG9ydDpcbiAgICAgICAgdGhpcy51cGRhdGVSZWNvcmRpbmdWaWRlb1BhcnRpY2lwYW50c1N1cHBvcnQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ0FsbFBhcnRpY2lwYW50c0Z1bGxSb29tU3VwcG9ydDpcbiAgICAgICAgdGhpcy51cGRhdGVSZWNvcmRpbmdBbGxQYXJ0aWNpcGFudHNGdWxsUm9vbVN1cHBvcnQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ1ZpZGVvUGFydGljaXBhbnRzRnVsbFJvb21TdXBwb3J0OlxuICAgICAgICB0aGlzLnVwZGF0ZVJlY29yZGluZ1ZpZGVvUGFydGljaXBhbnRzRnVsbFJvb21TdXBwb3J0LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRpbmdQcmVmZXJyZWRPcmllbnRhdGlvbjogdGhpcy51cGRhdGVSZWNvcmRpbmdQcmVmZXJyZWRPcmllbnRhdGlvbi5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nU3VwcG9ydEZvck90aGVyT3JpZW50YXRpb246XG4gICAgICAgIHRoaXMudXBkYXRlUmVjb3JkaW5nU3VwcG9ydEZvck90aGVyT3JpZW50YXRpb24uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ011bHRpRm9ybWF0c1N1cHBvcnQ6IHRoaXMudXBkYXRlUmVjb3JkaW5nTXVsdGlGb3JtYXRzU3VwcG9ydC5iaW5kKHRoaXMpLFxuXG4gICAgICB1cGRhdGVVc2VyUmVjb3JkaW5nUGFyYW1zOiB0aGlzLnVwZGF0ZVVzZXJSZWNvcmRpbmdQYXJhbXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUNhblJlY29yZDogdGhpcy51cGRhdGVDYW5SZWNvcmQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVN0YXJ0UmVwb3J0OiB0aGlzLnVwZGF0ZVN0YXJ0UmVwb3J0LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVFbmRSZXBvcnQ6IHRoaXMudXBkYXRlRW5kUmVwb3J0LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRUaW1lckludGVydmFsOiB0aGlzLnVwZGF0ZVJlY29yZFRpbWVySW50ZXJ2YWwuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZFN0YXJ0VGltZTogdGhpcy51cGRhdGVSZWNvcmRTdGFydFRpbWUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZEVsYXBzZWRUaW1lOiB0aGlzLnVwZGF0ZVJlY29yZEVsYXBzZWRUaW1lLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVJc1RpbWVyUnVubmluZzogdGhpcy51cGRhdGVJc1RpbWVyUnVubmluZy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQ2FuUGF1c2VSZXN1bWU6IHRoaXMudXBkYXRlQ2FuUGF1c2VSZXN1bWUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZENoYW5nZVNlY29uZHM6IHRoaXMudXBkYXRlUmVjb3JkQ2hhbmdlU2Vjb25kcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUGF1c2VMaW1pdDogdGhpcy51cGRhdGVQYXVzZUxpbWl0LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVQYXVzZVJlY29yZENvdW50OiB0aGlzLnVwZGF0ZVBhdXNlUmVjb3JkQ291bnQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUNhbkxhdW5jaFJlY29yZDogdGhpcy51cGRhdGVDYW5MYXVuY2hSZWNvcmQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVN0b3BMYXVuY2hSZWNvcmQ6IHRoaXMudXBkYXRlU3RvcExhdW5jaFJlY29yZC5iaW5kKHRoaXMpLFxuXG4gICAgICB1cGRhdGVQYXJ0aWNpcGFudHNBbGw6IHRoaXMudXBkYXRlUGFydGljaXBhbnRzQWxsLmJpbmQodGhpcyksXG5cbiAgICAgIHVwZGF0ZUZpcnN0QWxsOiB0aGlzLnVwZGF0ZUZpcnN0QWxsLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVVcGRhdGVNYWluV2luZG93OiB0aGlzLnVwZGF0ZVVwZGF0ZU1haW5XaW5kb3cuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUZpcnN0X3JvdW5kOiB0aGlzLnVwZGF0ZUZpcnN0X3JvdW5kLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVMYW5kU2NhcGVkOiB0aGlzLnVwZGF0ZUxhbmRTY2FwZWQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUxvY2tfc2NyZWVuOiB0aGlzLnVwZGF0ZUxvY2tfc2NyZWVuLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVTY3JlZW5JZDogdGhpcy51cGRhdGVTY3JlZW5JZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQWxsVmlkZW9TdHJlYW1zOiB0aGlzLnVwZGF0ZUFsbFZpZGVvU3RyZWFtcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTmV3TGltaXRlZFN0cmVhbXM6IHRoaXMudXBkYXRlTmV3TGltaXRlZFN0cmVhbXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZU5ld0xpbWl0ZWRTdHJlYW1zSURzOiB0aGlzLnVwZGF0ZU5ld0xpbWl0ZWRTdHJlYW1zSURzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVBY3RpdmVTb3VuZHM6IHRoaXMudXBkYXRlQWN0aXZlU291bmRzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVTY3JlZW5TaGFyZUlEU3RyZWFtOiB0aGlzLnVwZGF0ZVNjcmVlblNoYXJlSURTdHJlYW0uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVNjcmVlblNoYXJlTmFtZVN0cmVhbTogdGhpcy51cGRhdGVTY3JlZW5TaGFyZU5hbWVTdHJlYW0uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUFkbWluSURTdHJlYW06IHRoaXMudXBkYXRlQWRtaW5JRFN0cmVhbS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQWRtaW5OYW1lU3RyZWFtOiB0aGlzLnVwZGF0ZUFkbWluTmFtZVN0cmVhbS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlWW91WW91U3RyZWFtOiB0aGlzLnVwZGF0ZVlvdVlvdVN0cmVhbS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlWW91WW91U3RyZWFtSURzOiB0aGlzLnVwZGF0ZVlvdVlvdVN0cmVhbUlEcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTG9jYWxTdHJlYW06IHRoaXMudXBkYXRlTG9jYWxTdHJlYW0uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZFN0YXJ0ZWQ6IHRoaXMudXBkYXRlUmVjb3JkU3RhcnRlZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkUmVzdW1lZDogdGhpcy51cGRhdGVSZWNvcmRSZXN1bWVkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRQYXVzZWQ6IHRoaXMudXBkYXRlUmVjb3JkUGF1c2VkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRTdG9wcGVkOiB0aGlzLnVwZGF0ZVJlY29yZFN0b3BwZWQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUFkbWluUmVzdHJpY3RTZXR0aW5nOiB0aGlzLnVwZGF0ZUFkbWluUmVzdHJpY3RTZXR0aW5nLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVWaWRlb1JlcXVlc3RTdGF0ZTogdGhpcy51cGRhdGVWaWRlb1JlcXVlc3RTdGF0ZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlVmlkZW9SZXF1ZXN0VGltZTogdGhpcy51cGRhdGVWaWRlb1JlcXVlc3RUaW1lLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVWaWRlb0FjdGlvbjogdGhpcy51cGRhdGVWaWRlb0FjdGlvbi5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTG9jYWxTdHJlYW1WaWRlbzogdGhpcy51cGRhdGVMb2NhbFN0cmVhbVZpZGVvLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVVc2VyRGVmYXVsdFZpZGVvSW5wdXREZXZpY2U6IHRoaXMudXBkYXRlVXNlckRlZmF1bHRWaWRlb0lucHV0RGV2aWNlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVDdXJyZW50RmFjaW5nTW9kZTogdGhpcy51cGRhdGVDdXJyZW50RmFjaW5nTW9kZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUHJldkZhY2luZ01vZGU6IHRoaXMudXBkYXRlUHJldkZhY2luZ01vZGUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZURlZlZpZGVvSUQ6IHRoaXMudXBkYXRlRGVmVmlkZW9JRC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQWxsb3dlZDogdGhpcy51cGRhdGVBbGxvd2VkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVEaXNwQWN0aXZlTmFtZXM6IHRoaXMudXBkYXRlRGlzcEFjdGl2ZU5hbWVzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVQX2Rpc3BBY3RpdmVOYW1lczogdGhpcy51cGRhdGVQX2Rpc3BBY3RpdmVOYW1lcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQWN0aXZlTmFtZXM6IHRoaXMudXBkYXRlQWN0aXZlTmFtZXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVByZXZBY3RpdmVOYW1lczogdGhpcy51cGRhdGVQcmV2QWN0aXZlTmFtZXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVBfYWN0aXZlTmFtZXM6IHRoaXMudXBkYXRlUF9hY3RpdmVOYW1lcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTWVtYmVyc1JlY2VpdmVkOiB0aGlzLnVwZGF0ZU1lbWJlcnNSZWNlaXZlZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlRGVmZXJTY3JlZW5SZWNlaXZlZDogdGhpcy51cGRhdGVEZWZlclNjcmVlblJlY2VpdmVkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVIb3N0Rmlyc3RTd2l0Y2g6IHRoaXMudXBkYXRlSG9zdEZpcnN0U3dpdGNoLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVNaWNBY3Rpb246IHRoaXMudXBkYXRlTWljQWN0aW9uLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVTY3JlZW5BY3Rpb246IHRoaXMudXBkYXRlU2NyZWVuQWN0aW9uLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVDaGF0QWN0aW9uOiB0aGlzLnVwZGF0ZUNoYXRBY3Rpb24uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUF1ZGlvUmVxdWVzdFN0YXRlOiB0aGlzLnVwZGF0ZUF1ZGlvUmVxdWVzdFN0YXRlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVTY3JlZW5SZXF1ZXN0U3RhdGU6IHRoaXMudXBkYXRlU2NyZWVuUmVxdWVzdFN0YXRlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVDaGF0UmVxdWVzdFN0YXRlOiB0aGlzLnVwZGF0ZUNoYXRSZXF1ZXN0U3RhdGUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUF1ZGlvUmVxdWVzdFRpbWU6IHRoaXMudXBkYXRlQXVkaW9SZXF1ZXN0VGltZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlU2NyZWVuUmVxdWVzdFRpbWU6IHRoaXMudXBkYXRlU2NyZWVuUmVxdWVzdFRpbWUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUNoYXRSZXF1ZXN0VGltZTogdGhpcy51cGRhdGVDaGF0UmVxdWVzdFRpbWUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZU9sZFNvdW5kSWRzOiB0aGlzLnVwZGF0ZU9sZFNvdW5kSWRzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVIb3N0TGFiZWw6IHRoaXMudXBkYXRlSG9zdExhYmVsLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVNYWluU2NyZWVuRmlsbGVkOiB0aGlzLnVwZGF0ZU1haW5TY3JlZW5GaWxsZWQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUxvY2FsU3RyZWFtU2NyZWVuOiB0aGlzLnVwZGF0ZUxvY2FsU3RyZWFtU2NyZWVuLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVTY3JlZW5BbHJlYWR5T246IHRoaXMudXBkYXRlU2NyZWVuQWxyZWFkeU9uLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVDaGF0QWxyZWFkeU9uOiB0aGlzLnVwZGF0ZUNoYXRBbHJlYWR5T24uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlZGlyZWN0VVJMOiB0aGlzLnVwZGF0ZVJlZGlyZWN0VVJMLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVPbGRBbGxTdHJlYW1zOiB0aGlzLnVwZGF0ZU9sZEFsbFN0cmVhbXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUFkbWluVmlkSUQ6IHRoaXMudXBkYXRlQWRtaW5WaWRJRC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlU3RyZWFtTmFtZXM6IHRoaXMudXBkYXRlU3RyZWFtTmFtZXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZU5vbl9hbFZpZGVvU3RyZWFtczogdGhpcy51cGRhdGVOb25fYWxWaWRlb1N0cmVhbXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVNvcnRBdWRpb0xvdWRuZXNzOiB0aGlzLnVwZGF0ZVNvcnRBdWRpb0xvdWRuZXNzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVBdWRpb0RlY2liZWxzOiB0aGlzLnVwZGF0ZUF1ZGlvRGVjaWJlbHMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZU1peGVkX2FsVmlkZW9TdHJlYW1zOiB0aGlzLnVwZGF0ZU1peGVkX2FsVmlkZW9TdHJlYW1zLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVOb25fYWxWaWRlb1N0cmVhbXNfbXV0ZWQ6IHRoaXMudXBkYXRlTm9uX2FsVmlkZW9TdHJlYW1zX211dGVkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVQYWdpbmF0ZWRTdHJlYW1zOiB0aGlzLnVwZGF0ZVBhZ2luYXRlZFN0cmVhbXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUxvY2FsU3RyZWFtQXVkaW86IHRoaXMudXBkYXRlTG9jYWxTdHJlYW1BdWRpby5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlRGVmQXVkaW9JRDogdGhpcy51cGRhdGVEZWZBdWRpb0lELmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVVc2VyRGVmYXVsdEF1ZGlvSW5wdXREZXZpY2U6IHRoaXMudXBkYXRlVXNlckRlZmF1bHRBdWRpb0lucHV0RGV2aWNlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVVc2VyRGVmYXVsdEF1ZGlvT3V0cHV0RGV2aWNlOiB0aGlzLnVwZGF0ZVVzZXJEZWZhdWx0QXVkaW9PdXRwdXREZXZpY2UuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVByZXZBdWRpb0lucHV0RGV2aWNlOiB0aGlzLnVwZGF0ZVByZXZBdWRpb0lucHV0RGV2aWNlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVQcmV2VmlkZW9JbnB1dERldmljZTogdGhpcy51cGRhdGVQcmV2VmlkZW9JbnB1dERldmljZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQXVkaW9QYXVzZWQ6IHRoaXMudXBkYXRlQXVkaW9QYXVzZWQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZU1haW5TY3JlZW5QZXJzb246IHRoaXMudXBkYXRlTWFpblNjcmVlblBlcnNvbi5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQWRtaW5Pbk1haW5TY3JlZW46IHRoaXMudXBkYXRlQWRtaW5Pbk1haW5TY3JlZW4uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVNjcmVlblN0YXRlczogdGhpcy51cGRhdGVTY3JlZW5TdGF0ZXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVByZXZTY3JlZW5TdGF0ZXM6IHRoaXMudXBkYXRlUHJldlNjcmVlblN0YXRlcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlVXBkYXRlRGF0ZVN0YXRlOiB0aGlzLnVwZGF0ZVVwZGF0ZURhdGVTdGF0ZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTGFzdFVwZGF0ZTogdGhpcy51cGRhdGVMYXN0VXBkYXRlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVORm9yUmVhZGp1c3RSZWNvcmQ6IHRoaXMudXBkYXRlTkZvclJlYWRqdXN0UmVjb3JkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVGaXhlZFBhZ2VMaW1pdDogdGhpcy51cGRhdGVGaXhlZFBhZ2VMaW1pdC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVtb3ZlQWx0R3JpZDogdGhpcy51cGRhdGVSZW1vdmVBbHRHcmlkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVORm9yUmVhZGp1c3Q6IHRoaXMudXBkYXRlTkZvclJlYWRqdXN0LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVMYXN0UmVvcmRlclRpbWU6IHRoaXMudXBkYXRlTGFzdFJlb3JkZXJUaW1lLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVBdWRTdHJlYW1OYW1lczogdGhpcy51cGRhdGVBdWRTdHJlYW1OYW1lcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQ3VycmVudFVzZXJQYWdlOiB0aGlzLnVwZGF0ZUN1cnJlbnRVc2VyUGFnZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTWFpbkhlaWdodFdpZHRoOiB0aGlzLnVwZGF0ZU1haW5IZWlnaHRXaWR0aC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUHJldk1haW5IZWlnaHRXaWR0aDogdGhpcy51cGRhdGVQcmV2TWFpbkhlaWdodFdpZHRoLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVQcmV2RG9QYWdpbmF0ZTogdGhpcy51cGRhdGVQcmV2RG9QYWdpbmF0ZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlRG9QYWdpbmF0ZTogdGhpcy51cGRhdGVEb1BhZ2luYXRlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVTaGFyZUVuZGVkOiB0aGlzLnVwZGF0ZVNoYXJlRW5kZWQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUxTdHJlYW1zOiB0aGlzLnVwZGF0ZUxTdHJlYW1zLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVDaGF0UmVmU3RyZWFtczogdGhpcy51cGRhdGVDaGF0UmVmU3RyZWFtcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQ29udHJvbEhlaWdodDogdGhpcy51cGRhdGVDb250cm9sSGVpZ2h0LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVJc1dpZGVTY3JlZW46IHRoaXMudXBkYXRlSXNXaWRlU2NyZWVuLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVJc01lZGl1bVNjcmVlbjogdGhpcy51cGRhdGVJc01lZGl1bVNjcmVlbi5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlSXNTbWFsbFNjcmVlbjogdGhpcy51cGRhdGVJc1NtYWxsU2NyZWVuLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVBZGRHcmlkOiB0aGlzLnVwZGF0ZUFkZEdyaWQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUFkZEFsdEdyaWQ6IHRoaXMudXBkYXRlQWRkQWx0R3JpZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlR3JpZFJvd3M6IHRoaXMudXBkYXRlR3JpZFJvd3MuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUdyaWRDb2xzOiB0aGlzLnVwZGF0ZUdyaWRDb2xzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVBbHRHcmlkUm93czogdGhpcy51cGRhdGVBbHRHcmlkUm93cy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQWx0R3JpZENvbHM6IHRoaXMudXBkYXRlQWx0R3JpZENvbHMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZU51bWJlclBhZ2VzOiB0aGlzLnVwZGF0ZU51bWJlclBhZ2VzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVDdXJyZW50U3RyZWFtczogdGhpcy51cGRhdGVDdXJyZW50U3RyZWFtcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlU2hvd01pbmlWaWV3OiB0aGlzLnVwZGF0ZVNob3dNaW5pVmlldy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTlN0cmVhbTogdGhpcy51cGRhdGVOU3RyZWFtLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVEZWZlcl9yZWNlaXZlOiB0aGlzLnVwZGF0ZURlZmVyX3JlY2VpdmUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUFsbEF1ZGlvU3RyZWFtczogdGhpcy51cGRhdGVBbGxBdWRpb1N0cmVhbXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlbW90ZVNjcmVlblN0cmVhbTogdGhpcy51cGRhdGVSZW1vdGVTY3JlZW5TdHJlYW0uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVNjcmVlblByb2R1Y2VyOiB0aGlzLnVwZGF0ZVNjcmVlblByb2R1Y2VyLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVHb3RBbGxWaWRzOiB0aGlzLnVwZGF0ZUdvdEFsbFZpZHMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVBhZ2luYXRpb25IZWlnaHRXaWR0aDogdGhpcy51cGRhdGVQYWdpbmF0aW9uSGVpZ2h0V2lkdGguYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVBhZ2luYXRpb25EaXJlY3Rpb246IHRoaXMudXBkYXRlUGFnaW5hdGlvbkRpcmVjdGlvbi5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlR3JpZFNpemVzOiB0aGlzLnVwZGF0ZUdyaWRTaXplcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlU2NyZWVuRm9yY2VGdWxsRGlzcGxheTogdGhpcy51cGRhdGVTY3JlZW5Gb3JjZUZ1bGxEaXNwbGF5LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVNYWluR3JpZFN0cmVhbTogdGhpcy51cGRhdGVNYWluR3JpZFN0cmVhbS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlT3RoZXJHcmlkU3RyZWFtczogdGhpcy51cGRhdGVPdGhlckdyaWRTdHJlYW1zLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVBdWRpb09ubHlTdHJlYW1zOiB0aGlzLnVwZGF0ZUF1ZGlvT25seVN0cmVhbXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVZpZGVvSW5wdXRzOiB0aGlzLnVwZGF0ZVZpZGVvSW5wdXRzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVBdWRpb0lucHV0czogdGhpcy51cGRhdGVBdWRpb0lucHV0cy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTWVldGluZ1Byb2dyZXNzVGltZTogdGhpcy51cGRhdGVNZWV0aW5nUHJvZ3Jlc3NUaW1lLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVNZWV0aW5nRWxhcHNlZFRpbWU6IHRoaXMudXBkYXRlTWVldGluZ0VsYXBzZWRUaW1lLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWZfcGFydGljaXBhbnRzOiB0aGlzLnVwZGF0ZVJlZl9wYXJ0aWNpcGFudHMuYmluZCh0aGlzKSxcblxuICAgICAgdXBkYXRlTWVzc2FnZXM6IHRoaXMudXBkYXRlTWVzc2FnZXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVN0YXJ0RGlyZWN0TWVzc2FnZTogdGhpcy51cGRhdGVTdGFydERpcmVjdE1lc3NhZ2UuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZURpcmVjdE1lc3NhZ2VEZXRhaWxzOiB0aGlzLnVwZGF0ZURpcmVjdE1lc3NhZ2VEZXRhaWxzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVTaG93TWVzc2FnZXNCYWRnZTogdGhpcy51cGRhdGVTaG93TWVzc2FnZXNCYWRnZS5iaW5kKHRoaXMpLFxuXG4gICAgICAvLyBFdmVudCBzZXR0aW5nc1xuICAgICAgdXBkYXRlQXVkaW9TZXR0aW5nOiB0aGlzLnVwZGF0ZUF1ZGlvU2V0dGluZy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlVmlkZW9TZXR0aW5nOiB0aGlzLnVwZGF0ZVZpZGVvU2V0dGluZy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlU2NyZWVuc2hhcmVTZXR0aW5nOiB0aGlzLnVwZGF0ZVNjcmVlbnNoYXJlU2V0dGluZy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQ2hhdFNldHRpbmc6IHRoaXMudXBkYXRlQ2hhdFNldHRpbmcuYmluZCh0aGlzKSxcblxuICAgICAgLy8gRGlzcGxheSBzZXR0aW5nc1xuICAgICAgdXBkYXRlQXV0b1dhdmU6IHRoaXMudXBkYXRlQXV0b1dhdmUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUZvcmNlRnVsbERpc3BsYXk6IHRoaXMudXBkYXRlRm9yY2VGdWxsRGlzcGxheS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUHJldkZvcmNlRnVsbERpc3BsYXk6IHRoaXMudXBkYXRlUHJldkZvcmNlRnVsbERpc3BsYXkuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVByZXZNZWV0aW5nRGlzcGxheVR5cGU6IHRoaXMudXBkYXRlUHJldk1lZXRpbmdEaXNwbGF5VHlwZS5iaW5kKHRoaXMpLFxuXG4gICAgICAvLyBXYWl0aW5nIHJvb21cbiAgICAgIHVwZGF0ZVdhaXRpbmdSb29tRmlsdGVyOiB0aGlzLnVwZGF0ZVdhaXRpbmdSb29tRmlsdGVyLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVXYWl0aW5nUm9vbUxpc3Q6IHRoaXMudXBkYXRlV2FpdGluZ1Jvb21MaXN0LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVXYWl0aW5nUm9vbUNvdW50ZXI6IHRoaXMudXBkYXRlV2FpdGluZ1Jvb21Db3VudGVyLmJpbmQodGhpcyksXG5cbiAgICAgIC8vIFJlcXVlc3RzXG4gICAgICB1cGRhdGVSZXF1ZXN0RmlsdGVyOiB0aGlzLnVwZGF0ZVJlcXVlc3RGaWx0ZXIuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlcXVlc3RMaXN0OiB0aGlzLnVwZGF0ZVJlcXVlc3RMaXN0LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZXF1ZXN0Q291bnRlcjogdGhpcy51cGRhdGVSZXF1ZXN0Q291bnRlci5iaW5kKHRoaXMpLFxuXG4gICAgICAvLyBUb3RhbCByZXF1ZXN0cyBhbmQgd2FpdGluZyByb29tXG4gICAgICB1cGRhdGVUb3RhbFJlcVdhaXQ6IHRoaXMudXBkYXRlVG90YWxSZXFXYWl0LmJpbmQodGhpcyksXG5cbiAgICAgIC8vIE1lbnUgbW9kYWxzXG4gICAgICB1cGRhdGVJc01lbnVNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNNZW51TW9kYWxWaXNpYmxlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVJc1JlY29yZGluZ01vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc1JlY29yZGluZ01vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlSXNTZXR0aW5nc01vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc1NldHRpbmdzTW9kYWxWaXNpYmxlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVJc1JlcXVlc3RzTW9kYWxWaXNpYmxlOiB0aGlzLnVwZGF0ZUlzUmVxdWVzdHNNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUlzV2FpdGluZ01vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc1dhaXRpbmdNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUlzQ29Ib3N0TW9kYWxWaXNpYmxlOiB0aGlzLnVwZGF0ZUlzQ29Ib3N0TW9kYWxWaXNpYmxlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVJc01lZGlhU2V0dGluZ3NNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNNZWRpYVNldHRpbmdzTW9kYWxWaXNpYmxlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVJc0Rpc3BsYXlTZXR0aW5nc01vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc0Rpc3BsYXlTZXR0aW5nc01vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuXG4gICAgICAvLyBPdGhlciBtb2RhbHNcbiAgICAgIHVwZGF0ZUlzUGFydGljaXBhbnRzTW9kYWxWaXNpYmxlOiB0aGlzLnVwZGF0ZUlzUGFydGljaXBhbnRzTW9kYWxWaXNpYmxlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVJc01lc3NhZ2VzTW9kYWxWaXNpYmxlOiB0aGlzLnVwZGF0ZUlzTWVzc2FnZXNNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUlzQ29uZmlybUV4aXRNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNDb25maXJtRXhpdE1vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlSXNDb25maXJtSGVyZU1vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc0NvbmZpcm1IZXJlTW9kYWxWaXNpYmxlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVJc0xvYWRpbmdNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNMb2FkaW5nTW9kYWxWaXNpYmxlLmJpbmQodGhpcyksXG5cbiAgICAgIC8vIFJlY29yZGluZyBPcHRpb25zXG4gICAgICB1cGRhdGVSZWNvcmRpbmdNZWRpYU9wdGlvbnM6IHRoaXMudXBkYXRlUmVjb3JkaW5nTWVkaWFPcHRpb25zLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRpbmdBdWRpb09wdGlvbnM6IHRoaXMudXBkYXRlUmVjb3JkaW5nQXVkaW9PcHRpb25zLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRpbmdWaWRlb09wdGlvbnM6IHRoaXMudXBkYXRlUmVjb3JkaW5nVmlkZW9PcHRpb25zLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRpbmdWaWRlb1R5cGU6IHRoaXMudXBkYXRlUmVjb3JkaW5nVmlkZW9UeXBlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRpbmdWaWRlb09wdGltaXplZDogdGhpcy51cGRhdGVSZWNvcmRpbmdWaWRlb09wdGltaXplZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nRGlzcGxheVR5cGU6IHRoaXMudXBkYXRlUmVjb3JkaW5nRGlzcGxheVR5cGUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ0FkZEhMUzogdGhpcy51cGRhdGVSZWNvcmRpbmdBZGRITFMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ0FkZFRleHQ6IHRoaXMudXBkYXRlUmVjb3JkaW5nQWRkVGV4dC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nQ3VzdG9tVGV4dDogdGhpcy51cGRhdGVSZWNvcmRpbmdDdXN0b21UZXh0LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRpbmdDdXN0b21UZXh0UG9zaXRpb246IHRoaXMudXBkYXRlUmVjb3JkaW5nQ3VzdG9tVGV4dFBvc2l0aW9uLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRpbmdDdXN0b21UZXh0Q29sb3I6IHRoaXMudXBkYXRlUmVjb3JkaW5nQ3VzdG9tVGV4dENvbG9yLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRpbmdOYW1lVGFnczogdGhpcy51cGRhdGVSZWNvcmRpbmdOYW1lVGFncy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nQmFja2dyb3VuZENvbG9yOiB0aGlzLnVwZGF0ZVJlY29yZGluZ0JhY2tncm91bmRDb2xvci5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nTmFtZVRhZ3NDb2xvcjogdGhpcy51cGRhdGVSZWNvcmRpbmdOYW1lVGFnc0NvbG9yLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRpbmdPcmllbnRhdGlvblZpZGVvOiB0aGlzLnVwZGF0ZVJlY29yZGluZ09yaWVudGF0aW9uVmlkZW8uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUNsZWFyZWRUb1Jlc3VtZTogdGhpcy51cGRhdGVDbGVhcmVkVG9SZXN1bWUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUNsZWFyZWRUb1JlY29yZDogdGhpcy51cGRhdGVDbGVhcmVkVG9SZWNvcmQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZFN0YXRlOiB0aGlzLnVwZGF0ZVJlY29yZFN0YXRlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVTaG93UmVjb3JkQnV0dG9uczogdGhpcy51cGRhdGVTaG93UmVjb3JkQnV0dG9ucy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nUHJvZ3Jlc3NUaW1lOiB0aGlzLnVwZGF0ZVJlY29yZGluZ1Byb2dyZXNzVGltZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQXVkaW9Td2l0Y2hpbmc6IHRoaXMudXBkYXRlQXVkaW9Td2l0Y2hpbmcuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVZpZGVvU3dpdGNoaW5nOiB0aGlzLnVwZGF0ZVZpZGVvU3dpdGNoaW5nLmJpbmQodGhpcyksXG5cbiAgICAgIC8vIE1lZGlhIHN0YXRlc1xuICAgICAgdXBkYXRlVmlkZW9BbHJlYWR5T246IHRoaXMudXBkYXRlVmlkZW9BbHJlYWR5T24uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUF1ZGlvQWxyZWFkeU9uOiB0aGlzLnVwZGF0ZUF1ZGlvQWxyZWFkeU9uLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVDb21wb25lbnRTaXplczogdGhpcy51cGRhdGVDb21wb25lbnRTaXplcy5iaW5kKHRoaXMpLFxuXG4gICAgICAvLyBQZXJtaXNzaW9uc1xuICAgICAgdXBkYXRlSGFzQ2FtZXJhUGVybWlzc2lvbjogdGhpcy51cGRhdGVIYXNDYW1lcmFQZXJtaXNzaW9uLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVIYXNBdWRpb1Blcm1pc3Npb246IHRoaXMudXBkYXRlSGFzQXVkaW9QZXJtaXNzaW9uLmJpbmQodGhpcyksXG5cbiAgICAgIC8vIFRyYW5zcG9ydHNcbiAgICAgIHVwZGF0ZVRyYW5zcG9ydENyZWF0ZWQ6IHRoaXMudXBkYXRlVHJhbnNwb3J0Q3JlYXRlZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlVHJhbnNwb3J0Q3JlYXRlZFZpZGVvOiB0aGlzLnVwZGF0ZVRyYW5zcG9ydENyZWF0ZWRWaWRlby5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlVHJhbnNwb3J0Q3JlYXRlZEF1ZGlvOiB0aGlzLnVwZGF0ZVRyYW5zcG9ydENyZWF0ZWRBdWRpby5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlVHJhbnNwb3J0Q3JlYXRlZFNjcmVlbjogdGhpcy51cGRhdGVUcmFuc3BvcnRDcmVhdGVkU2NyZWVuLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVQcm9kdWNlclRyYW5zcG9ydDogdGhpcy51cGRhdGVQcm9kdWNlclRyYW5zcG9ydC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlVmlkZW9Qcm9kdWNlcjogdGhpcy51cGRhdGVWaWRlb1Byb2R1Y2VyLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVQYXJhbXM6IHRoaXMudXBkYXRlUGFyYW1zLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVWaWRlb1BhcmFtczogdGhpcy51cGRhdGVWaWRlb1BhcmFtcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQXVkaW9QYXJhbXM6IHRoaXMudXBkYXRlQXVkaW9QYXJhbXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUF1ZGlvUHJvZHVjZXI6IHRoaXMudXBkYXRlQXVkaW9Qcm9kdWNlci5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQ29uc3VtZXJUcmFuc3BvcnRzOiB0aGlzLnVwZGF0ZUNvbnN1bWVyVHJhbnNwb3J0cy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQ29uc3VtaW5nVHJhbnNwb3J0czogdGhpcy51cGRhdGVDb25zdW1pbmdUcmFuc3BvcnRzLmJpbmQodGhpcyksXG5cbiAgICAgIC8vIFBvbGxzXG4gICAgICB1cGRhdGVQb2xsczogdGhpcy51cGRhdGVQb2xscy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUG9sbDogdGhpcy51cGRhdGVQb2xsLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVJc1BvbGxNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNQb2xsTW9kYWxWaXNpYmxlLmJpbmQodGhpcyksXG5cbiAgICAgIC8vIEJhY2tncm91bmRcbiAgICAgIHVwZGF0ZUN1c3RvbUltYWdlOiB0aGlzLnVwZGF0ZUN1c3RvbUltYWdlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVTZWxlY3RlZEltYWdlOiB0aGlzLnVwZGF0ZVNlbGVjdGVkSW1hZ2UuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVNlZ21lbnRWaWRlbzogdGhpcy51cGRhdGVTZWdtZW50VmlkZW8uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVNlbGZpZVNlZ21lbnRhdGlvbjogdGhpcy51cGRhdGVTZWxmaWVTZWdtZW50YXRpb24uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVBhdXNlU2VnbWVudGF0aW9uOiB0aGlzLnVwZGF0ZVBhdXNlU2VnbWVudGF0aW9uLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVQcm9jZXNzZWRTdHJlYW06IHRoaXMudXBkYXRlUHJvY2Vzc2VkU3RyZWFtLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVLZWVwQmFja2dyb3VuZDogdGhpcy51cGRhdGVLZWVwQmFja2dyb3VuZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQmFja2dyb3VuZEhhc0NoYW5nZWQ6IHRoaXMudXBkYXRlQmFja2dyb3VuZEhhc0NoYW5nZWQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVZpcnR1YWxTdHJlYW06IHRoaXMudXBkYXRlVmlydHVhbFN0cmVhbS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTWFpbkNhbnZhczogdGhpcy51cGRhdGVNYWluQ2FudmFzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVQcmV2S2VlcEJhY2tncm91bmQ6IHRoaXMudXBkYXRlUHJldktlZXBCYWNrZ3JvdW5kLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVBcHBsaWVkQmFja2dyb3VuZDogdGhpcy51cGRhdGVBcHBsaWVkQmFja2dyb3VuZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlSXNCYWNrZ3JvdW5kTW9kYWxWaXNpYmxlOiB0aGlzLnVwZGF0ZUlzQmFja2dyb3VuZE1vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQXV0b0NsaWNrQmFja2dyb3VuZDogdGhpcy51cGRhdGVBdXRvQ2xpY2tCYWNrZ3JvdW5kLmJpbmQodGhpcyksXG5cbiAgICAgIC8vIEJyZWFrb3V0IHJvb21zXG4gICAgICB1cGRhdGVCcmVha291dFJvb21zOiB0aGlzLnVwZGF0ZUJyZWFrb3V0Um9vbXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUN1cnJlbnRSb29tSW5kZXg6IHRoaXMudXBkYXRlQ3VycmVudFJvb21JbmRleC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQ2FuU3RhcnRCcmVha291dDogdGhpcy51cGRhdGVDYW5TdGFydEJyZWFrb3V0LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVCcmVha091dFJvb21TdGFydGVkOiB0aGlzLnVwZGF0ZUJyZWFrT3V0Um9vbVN0YXJ0ZWQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUJyZWFrT3V0Um9vbUVuZGVkOiB0aGlzLnVwZGF0ZUJyZWFrT3V0Um9vbUVuZGVkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVIb3N0TmV3Um9vbTogdGhpcy51cGRhdGVIb3N0TmV3Um9vbS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTGltaXRlZEJyZWFrUm9vbTogdGhpcy51cGRhdGVMaW1pdGVkQnJlYWtSb29tLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVNYWluUm9vbXNMZW5ndGg6IHRoaXMudXBkYXRlTWFpblJvb21zTGVuZ3RoLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVNZW1iZXJSb29tOiB0aGlzLnVwZGF0ZU1lbWJlclJvb20uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUlzQnJlYWtvdXRSb29tc01vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc0JyZWFrb3V0Um9vbXNNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcblxuICAgICAgLy8gV2hpdGVib2FyZFxuICAgICAgdXBkYXRlV2hpdGVib2FyZFVzZXJzOiB0aGlzLnVwZGF0ZVdoaXRlYm9hcmRVc2Vycy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQ3VycmVudFdoaXRlYm9hcmRJbmRleDogdGhpcy51cGRhdGVDdXJyZW50V2hpdGVib2FyZEluZGV4LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVDYW5TdGFydFdoaXRlYm9hcmQ6IHRoaXMudXBkYXRlQ2FuU3RhcnRXaGl0ZWJvYXJkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVXaGl0ZWJvYXJkU3RhcnRlZDogdGhpcy51cGRhdGVXaGl0ZWJvYXJkU3RhcnRlZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlV2hpdGVib2FyZEVuZGVkOiB0aGlzLnVwZGF0ZVdoaXRlYm9hcmRFbmRlZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlV2hpdGVib2FyZExpbWl0OiB0aGlzLnVwZGF0ZVdoaXRlYm9hcmRMaW1pdC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlSXNXaGl0ZWJvYXJkTW9kYWxWaXNpYmxlOiB0aGlzLnVwZGF0ZUlzV2hpdGVib2FyZE1vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlSXNDb25maWd1cmVXaGl0ZWJvYXJkTW9kYWxWaXNpYmxlOlxuICAgICAgICB0aGlzLnVwZGF0ZUlzQ29uZmlndXJlV2hpdGVib2FyZE1vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlU2hhcGVzOiB0aGlzLnVwZGF0ZVNoYXBlcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlVXNlSW1hZ2VCYWNrZ3JvdW5kOiB0aGlzLnVwZGF0ZVVzZUltYWdlQmFja2dyb3VuZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVkb1N0YWNrOiB0aGlzLnVwZGF0ZVJlZG9TdGFjay5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlVW5kb1N0YWNrOiB0aGlzLnVwZGF0ZVVuZG9TdGFjay5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQ2FudmFzU3RyZWFtOiB0aGlzLnVwZGF0ZUNhbnZhc1N0cmVhbS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQ2FudmFzV2hpdGVib2FyZDogdGhpcy51cGRhdGVDYW52YXNXaGl0ZWJvYXJkLmJpbmQodGhpcyksXG5cbiAgICAgIC8vIFNjcmVlbmJvYXJkXG4gICAgICB1cGRhdGVDYW52YXNTY3JlZW5ib2FyZDogdGhpcy51cGRhdGVDYW52YXNTY3JlZW5ib2FyZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUHJvY2Vzc2VkU2NyZWVuU3RyZWFtOiB0aGlzLnVwZGF0ZVByb2Nlc3NlZFNjcmVlblN0cmVhbS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQW5ub3RhdGVTY3JlZW5TdHJlYW06IHRoaXMudXBkYXRlQW5ub3RhdGVTY3JlZW5TdHJlYW0uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZU1haW5TY3JlZW5DYW52YXM6IHRoaXMudXBkYXRlTWFpblNjcmVlbkNhbnZhcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlSXNTY3JlZW5ib2FyZE1vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc1NjcmVlbmJvYXJkTW9kYWxWaXNpYmxlLmJpbmQodGhpcyksXG5cbiAgICAgIC8vIE90aGVyIGZ1bmN0aW9uc1xuICAgICAgY2hlY2tPcmllbnRhdGlvbjogdGhpcy5jaGVja09yaWVudGF0aW9uLmJpbmQodGhpcyksXG5cbiAgICAgIHVwZGF0ZURldmljZTogdGhpcy51cGRhdGVEZXZpY2UuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVNvY2tldDogdGhpcy51cGRhdGVTb2NrZXQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVZhbGlkYXRlZDogdGhpcy51cGRhdGVWYWxpZGF0ZWQuYmluZCh0aGlzKSxcblxuICAgICAgc2hvd0FsZXJ0OiB0aGlzLnNob3dBbGVydC5iaW5kKHRoaXMpLFxuICAgICAgZ2V0VXBkYXRlZEFsbFBhcmFtczogKCkgPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLnRoaXMuZ2V0QWxsUGFyYW1zKCksXG4gICAgICAgICAgLi4udGhpcy5tZWRpYVNGVUZ1bmN0aW9ucygpLFxuICAgICAgICB9O1xuICAgICAgfSxcbiAgICB9O1xuICB9XG5cbiAgbWVkaWFTRlVQYXJhbWV0ZXJzID0ge1xuICAgIC4uLnRoaXMuZ2V0QWxsUGFyYW1zKCksXG4gICAgLi4udGhpcy5tZWRpYVNGVUZ1bmN0aW9ucygpLFxuICB9O1xuXG4gIGdldFVwZGF0ZWRBbGxQYXJhbXMgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnRoaXMuZ2V0QWxsUGFyYW1zKCksXG4gICAgICAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCksXG4gICAgfTtcbiAgfTtcblxuICB1cGRhdGVCdXR0b25TdGF0ZShidXR0b25UeXBlOiBzdHJpbmcsIHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5jb250cm9sQnV0dG9ucyA9IHRoaXMuY29udHJvbEJ1dHRvbnMubWFwKChidXR0b24pID0+IHtcbiAgICAgIGlmIChidXR0b25UeXBlID09PSAnbWljQWN0aXZlJyAmJiBidXR0b24uaWNvbiA9PT0gdGhpcy5mYU1pY3JvcGhvbmVTbGFzaCkge1xuICAgICAgICByZXR1cm4geyAuLi5idXR0b24sIGFjdGl2ZTogdmFsdWUgfTtcbiAgICAgIH1cbiAgICAgIGlmIChidXR0b25UeXBlID09PSAndmlkZW9BY3RpdmUnICYmIGJ1dHRvbi5pY29uID09PSB0aGlzLmZhVmlkZW9TbGFzaCkge1xuICAgICAgICByZXR1cm4geyAuLi5idXR0b24sIGFjdGl2ZTogdmFsdWUgfTtcbiAgICAgIH1cbiAgICAgIGlmIChidXR0b25UeXBlID09PSAnc2NyZWVuU2hhcmVBY3RpdmUnICYmIGJ1dHRvbi5pY29uID09PSB0aGlzLmZhRGVza3RvcCkge1xuICAgICAgICBpZiAoYnV0dG9uLmFsdGVybmF0ZUljb25Db21wb25lbnQpIHtcbiAgICAgICAgICBjb25zdCB1cGRhdGVkSW5qZWN0b3IgPSB0aGlzLmNyZWF0ZUluamVjdG9yKHtcbiAgICAgICAgICAgIGRpc2FibGVkOiAhdmFsdWUsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLmJ1dHRvbixcbiAgICAgICAgICAgIGFjdGl2ZTogdHJ1ZSxcbiAgICAgICAgICAgIGFsdGVybmF0ZUljb25Db21wb25lbnQ6IHsgLi4udGhpcy5zY3JlZW5TaGFyZVdpZGdldCwgaW5qZWN0b3I6IHVwZGF0ZWRJbmplY3RvciB9LFxuICAgICAgICAgIH07IC8vYWx3YXlzIGRlZmF1bHQgdG8gdHJ1ZSBmb3IgYWN0aXZlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHsgLi4uYnV0dG9uLCBhY3RpdmU6IHRydWUgfTsgLy9hbHdheXMgZGVmYXVsdCB0byB0cnVlIGZvciBhY3RpdmVcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGJ1dHRvblR5cGUgPT09ICdlbmRDYWxsQWN0aXZlJyAmJiBidXR0b24uaWNvbiA9PT0gdGhpcy5mYVBob25lKSB7XG4gICAgICAgIHJldHVybiB7IC4uLmJ1dHRvbiwgYWN0aXZlOiB2YWx1ZSB9O1xuICAgICAgfVxuICAgICAgaWYgKGJ1dHRvblR5cGUgPT09ICdwYXJ0aWNpcGFudHNBY3RpdmUnICYmIGJ1dHRvbi5pY29uID09PSB0aGlzLmZhVXNlcnMpIHtcbiAgICAgICAgcmV0dXJuIHsgLi4uYnV0dG9uLCBhY3RpdmU6IHZhbHVlIH07XG4gICAgICB9XG4gICAgICBpZiAoXG4gICAgICAgIGJ1dHRvblR5cGUgPT09ICdzaG93TWVzc2FnZXNCYWRnZScgJiZcbiAgICAgICAgYnV0dG9uLmN1c3RvbU5hbWUgJiZcbiAgICAgICAgYnV0dG9uLmN1c3RvbU5hbWUgPT09ICdNZXNzYWdlcydcbiAgICAgICkge1xuICAgICAgICBjb25zdCB1cGRhdGVkSW5qZWN0b3IgPSB0aGlzLmNyZWF0ZUluamVjdG9yKHtcbiAgICAgICAgICBpY29uOiB0aGlzLmZhQ29tbWVudHMsXG4gICAgICAgICAgYmFkZ2VWYWx1ZTogdmFsdWUgPyAnKicgOiAnJyxcbiAgICAgICAgICBpY29uQ29sb3I6ICdibGFjaycsXG4gICAgICAgICAgc2hvd0JhZGdlOiB2YWx1ZSxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB7IC4uLmJ1dHRvbiwgY3VzdG9tQ29tcG9uZW50OiB7IC4uLnRoaXMubWVzc2FnZVdpZGdldCwgaW5qZWN0b3I6IHVwZGF0ZWRJbmplY3RvciB9IH07XG4gICAgICB9XG4gICAgICBpZiAoYnV0dG9uVHlwZSA9PT0gJ3Nob3dNZW51QmFkZ2UnICYmIGJ1dHRvbi5jdXN0b21OYW1lICYmIGJ1dHRvbi5jdXN0b21OYW1lID09PSAnTWVudScpIHtcbiAgICAgICAgY29uc3QgdXBkYXRlZEluamVjdG9yID0gdGhpcy5jcmVhdGVJbmplY3Rvcih7XG4gICAgICAgICAgaWNvbjogdGhpcy5mYUJhcnMsXG4gICAgICAgICAgYmFkZ2VWYWx1ZTogdGhpcy50b3RhbFJlcVdhaXQudmFsdWUsXG4gICAgICAgICAgaWNvbkNvbG9yOiAnYmxhY2snLFxuICAgICAgICAgIHNob3dCYWRnZTogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB7IC4uLmJ1dHRvbiwgY3VzdG9tQ29tcG9uZW50OiB7IC4uLnRoaXMubWVudVdpZGdldCwgaW5qZWN0b3I6IHVwZGF0ZWRJbmplY3RvciB9IH07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBidXR0b247XG4gICAgfSk7XG5cbiAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBQcmVqb2luUGFnZUNvbXBvbmVudDogYW55ID0ge1xuICAgIGNvbXBvbmVudDogdGhpcy5QcmVqb2luUGFnZSxcbiAgICBpbmplY3RvcjogbnVsbCxcbiAgfTtcblxuICB1cGRhdGVQcmVqb2luUGFnZUNvbXBvbmVudCA9ICgpID0+IHtcbiAgICBjb25zdCBQcmVqb2luQ29tcCA9IHtcbiAgICAgIGNvbXBvbmVudDogdGhpcy5QcmVqb2luUGFnZSxcbiAgICAgIGluamVjdG9yOiB0aGlzLmNyZWF0ZUluamVjdG9yKHtcbiAgICAgICAgcGFyYW1ldGVyczoge1xuICAgICAgICAgIHNob3dBbGVydDpcbiAgICAgICAgICAgIHRoaXMuc2hvd0FsZXJ0IHx8XG4gICAgICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc2hvd0FsZXJ0IG5vdCBkZWZpbmVkJyk7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICB1cGRhdGVJc0xvYWRpbmdNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNMb2FkaW5nTW9kYWxWaXNpYmxlLFxuICAgICAgICAgIGNvbm5lY3RTb2NrZXQ6IHRoaXMuc29ja2V0TWFuYWdlci5jb25uZWN0U29ja2V0LFxuICAgICAgICAgIHVwZGF0ZVNvY2tldDogdGhpcy51cGRhdGVTb2NrZXQsXG4gICAgICAgICAgdXBkYXRlVmFsaWRhdGVkOiB0aGlzLnVwZGF0ZVZhbGlkYXRlZCxcbiAgICAgICAgICB1cGRhdGVBcGlVc2VyTmFtZTogdGhpcy51cGRhdGVBcGlVc2VyTmFtZSxcbiAgICAgICAgICB1cGRhdGVBcGlUb2tlbjogdGhpcy51cGRhdGVBcGlUb2tlbixcbiAgICAgICAgICB1cGRhdGVMaW5rOiB0aGlzLnVwZGF0ZUxpbmssXG4gICAgICAgICAgdXBkYXRlUm9vbU5hbWU6IHRoaXMudXBkYXRlUm9vbU5hbWUsXG4gICAgICAgICAgdXBkYXRlTWVtYmVyOiB0aGlzLnVwZGF0ZU1lbWJlcixcbiAgICAgICAgfSxcbiAgICAgICAgY3JlZGVudGlhbHM6IHRoaXMuY3JlZGVudGlhbHMsXG4gICAgICB9KSxcbiAgICB9O1xuXG4gICAgdGhpcy5QcmVqb2luUGFnZUNvbXBvbmVudCA9IHsgLi4uUHJlam9pbkNvbXAgfTtcblxuICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgfTtcblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5QcmVqb2luUGFnZSkge1xuICAgICAgdGhpcy51cGRhdGVQcmVqb2luUGFnZUNvbXBvbmVudCgpO1xuICAgIH1cblxuICAgIHRoaXMuc2V0dXBSZXNpemVMaXN0ZW5lcigpO1xuICAgIGlmICh0aGlzLnZhbGlkYXRlZCkge1xuICAgICAgdGhpcy5jb25uZWN0QW5kQWRkU29ja2V0TWV0aG9kcygpO1xuICAgIH1cblxuICAgIHRoaXMubWFpbkhlaWdodFdpZHRoU3Vic2NyaXB0aW9uID0gdGhpcy5tYWluSGVpZ2h0V2lkdGguc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMudXBkYXRlTWFpblZpZGVvU2l6ZSgpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5yZWNvcmRpbmdTdWJzY3JpcHRpb24gPSBjb21iaW5lTGF0ZXN0KFtcbiAgICAgIHRoaXMucmVjb3JkUGF1c2VkLFxuICAgICAgdGhpcy5yZWNvcmRTdGFydGVkLFxuICAgICAgdGhpcy5yZWNvcmRTdG9wcGVkLFxuICAgICAgdGhpcy5yZWNvcmRSZXN1bWVkLFxuICAgICAgdGhpcy5yZWNvcmRpbmdQcm9ncmVzc1RpbWUsXG4gICAgICB0aGlzLnNob3dSZWNvcmRCdXR0b25zLFxuICAgICAgdGhpcy5pc2xldmVsLFxuICAgIF0pLnN1YnNjcmliZShcbiAgICAgIChbXG4gICAgICAgIHJlY29yZFBhdXNlZCxcbiAgICAgICAgcmVjb3JkU3RhcnRlZCxcbiAgICAgICAgcmVjb3JkU3RvcHBlZCxcbiAgICAgICAgcmVjb3JkUmVzdW1lZCxcbiAgICAgICAgcmVjb3JkaW5nUHJvZ3Jlc3NUaW1lLFxuICAgICAgICBzaG93UmVjb3JkQnV0dG9ucyxcbiAgICAgICAgaXNsZXZlbCxcbiAgICAgIF0pID0+IHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHJlY29yZFBhdXNlZCB8fFxuICAgICAgICAgIHJlY29yZFN0YXJ0ZWQgfHxcbiAgICAgICAgICByZWNvcmRTdG9wcGVkIHx8XG4gICAgICAgICAgcmVjb3JkUmVzdW1lZCB8fFxuICAgICAgICAgIHJlY29yZGluZ1Byb2dyZXNzVGltZSB8fFxuICAgICAgICAgIHNob3dSZWNvcmRCdXR0b25zIHx8XG4gICAgICAgICAgaXNsZXZlbFxuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLnVwZGF0ZVJlY29yZEJ1dHRvbnMoKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICApO1xuXG4gICAgdGhpcy5TY3JlZW5ib2FyZFN1YnNjcmlwdGlvbiA9IGNvbWJpbmVMYXRlc3QoW1xuICAgICAgdGhpcy5zaGFyZWQsXG4gICAgICB0aGlzLmNvbXBvbmVudFNpemVzLFxuICAgICAgdGhpcy5hbm5vdGF0ZVNjcmVlblN0cmVhbSxcbiAgICBdKS5zdWJzY3JpYmUoKFtzaGFyZWQsIGNvbXBvbmVudFNpemVzXSkgPT4ge1xuICAgICAgdGhpcy5TY3JlZW5ib2FyZFdpZGdldCA9IHtcbiAgICAgICAgY29tcG9uZW50OiBTY3JlZW5ib2FyZCxcbiAgICAgICAgaW5wdXRzOiB7XG4gICAgICAgICAgY3VzdG9tV2lkdGg6IGNvbXBvbmVudFNpemVzLm1haW5XaWR0aCxcbiAgICAgICAgICBjdXN0b21IZWlnaHQ6IGNvbXBvbmVudFNpemVzLm1haW5IZWlnaHQsXG4gICAgICAgICAgcGFyYW1ldGVyczogdGhpcy5tZWRpYVNGVVBhcmFtZXRlcnMsXG4gICAgICAgICAgc2hvd0FzcGVjdDogc2hhcmVkLFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICB9KTtcbiAgICB0aGlzLnZhbGlkYXRlZFN1YnNjcmlwdGlvbiA9IHRoaXMudmFsaWRhdGVkLnN1YnNjcmliZSgodmFsaWRhdGVkKSA9PiB7XG4gICAgICBpZiAodmFsaWRhdGVkKSB7XG4gICAgICAgIHRoaXMuaGFuZGxlVmFsaWRhdGVkKCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5pc2xldmVsU3Vic2NyaXB0aW9uID0gdGhpcy5pc2xldmVsLnN1YnNjcmliZSgoaXNsZXZlbCkgPT4ge1xuICAgICAgaWYgKGlzbGV2ZWwpIHtcbiAgICAgICAgdGhpcy51cGRhdGVDdXN0b21NZW51QnV0dG9ucygpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuY29Ib3N0U3Vic2NyaXB0aW9uID0gY29tYmluZUxhdGVzdChbdGhpcy5jb0hvc3QsIHRoaXMuY29Ib3N0UmVzcG9uc2liaWxpdHldKS5zdWJzY3JpYmUoXG4gICAgICAoW2NvSG9zdCwgY29Ib3N0UmVzcG9uc2liaWxpdHldKSA9PiB7XG4gICAgICAgIGlmIChjb0hvc3QgfHwgY29Ib3N0UmVzcG9uc2liaWxpdHkpIHtcbiAgICAgICAgICB0aGlzLnVwZGF0ZUN1c3RvbU1lbnVCdXR0b25zKCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgKTtcblxuICAgIC8vIFN1YnNjcmliZSB0byBjaGFuZ2VzIGluIEJlaGF2aW9yU3ViamVjdCBhbmQgdXBkYXRlIHRoZSBidXR0b25zIGFjY29yZGluZ2x5XG4gICAgdGhpcy5idXR0b25TdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLm1pY0FjdGl2ZS5zdWJzY3JpYmUoKHZhbHVlKSA9PiB7XG4gICAgICAgIHRoaXMudXBkYXRlQnV0dG9uU3RhdGUoJ21pY0FjdGl2ZScsIHZhbHVlKTtcbiAgICAgIH0pLFxuICAgICk7XG5cbiAgICB0aGlzLmJ1dHRvblN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMudmlkZW9BY3RpdmUuc3Vic2NyaWJlKCh2YWx1ZSkgPT4ge1xuICAgICAgICB0aGlzLnVwZGF0ZUJ1dHRvblN0YXRlKCd2aWRlb0FjdGl2ZScsIHZhbHVlKTtcbiAgICAgIH0pLFxuICAgICk7XG5cbiAgICB0aGlzLmJ1dHRvblN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMuc2NyZWVuU2hhcmVBY3RpdmUuc3Vic2NyaWJlKCh2YWx1ZSkgPT4ge1xuICAgICAgICB0aGlzLnVwZGF0ZUJ1dHRvblN0YXRlKCdzY3JlZW5TaGFyZUFjdGl2ZScsIHZhbHVlKTtcbiAgICAgIH0pLFxuICAgICk7XG5cbiAgICB0aGlzLmJ1dHRvblN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMuc2hvd01lc3NhZ2VzQmFkZ2Uuc3Vic2NyaWJlKCh2YWx1ZSkgPT4ge1xuICAgICAgICB0aGlzLnVwZGF0ZUJ1dHRvblN0YXRlKCdzaG93TWVzc2FnZXNCYWRnZScsIHZhbHVlKTtcbiAgICAgIH0pLFxuICAgICk7XG5cbiAgICB0aGlzLmJ1dHRvblN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMudG90YWxSZXFXYWl0LnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMudXBkYXRlQnV0dG9uU3RhdGUoJ3Nob3dNZW51QmFkZ2UnLCB0cnVlKTtcbiAgICAgIH0pLFxuICAgICk7XG5cbiAgICB0aGlzLmJ1dHRvblN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMucGFydGljaXBhbnRzQ291bnRlci5zdWJzY3JpYmUoKHZhbHVlKSA9PiB7XG4gICAgICAgIHRoaXMudXBkYXRlTWVudVBhcnRpY2lwYW50c1dpZGdldCh2YWx1ZSk7XG4gICAgICB9KSxcbiAgICApO1xuXG4gICAgdGhpcy5tZWRpYVNGVVBhcmFtZXRlcnMgPSB7XG4gICAgICAuLi50aGlzLmdldEFsbFBhcmFtcygpLFxuICAgICAgLi4udGhpcy5tZWRpYVNGVUZ1bmN0aW9ucygpLFxuICAgIH07XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5oYW5kbGVSZXNpemUpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdvcmllbnRhdGlvbmNoYW5nZScsIHRoaXMuaGFuZGxlUmVzaXplKTtcbiAgICBpZiAodGhpcy5tYWluSGVpZ2h0V2lkdGhTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMubWFpbkhlaWdodFdpZHRoU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnZhbGlkYXRlZFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy52YWxpZGF0ZWRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuaXNsZXZlbFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5pc2xldmVsU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLmNvSG9zdFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5jb0hvc3RTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuU2NyZWVuYm9hcmRTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuU2NyZWVuYm9hcmRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucmVjb3JkaW5nU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnJlY29yZGluZ1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZU1haW5WaWRlb1NpemUgPSBhc3luYyAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLmxvY2tfc2NyZWVuLnZhbHVlICYmICF0aGlzLnNoYXJlZC52YWx1ZSkge1xuICAgICAgdGhpcy5wcmVwb3B1bGF0ZVVzZXJNZWRpYS5wcmVwb3B1bGF0ZVVzZXJNZWRpYSh7XG4gICAgICAgIG5hbWU6IHRoaXMuaG9zdExhYmVsLnZhbHVlLFxuICAgICAgICBwYXJhbWV0ZXJzOiB7IC4uLnRoaXMuZ2V0QWxsUGFyYW1zKCksIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSB9LFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghdGhpcy5maXJzdF9yb3VuZC52YWx1ZSkge1xuICAgICAgICB0aGlzLnByZXBvcHVsYXRlVXNlck1lZGlhLnByZXBvcHVsYXRlVXNlck1lZGlhKHtcbiAgICAgICAgICBuYW1lOiB0aGlzLmhvc3RMYWJlbC52YWx1ZSxcbiAgICAgICAgICBwYXJhbWV0ZXJzOiB7IC4uLnRoaXMuZ2V0QWxsUGFyYW1zKCksIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSB9LFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgYXN5bmMgY29ubmVjdEFuZEFkZFNvY2tldE1ldGhvZHMoKSB7XG4gICAgdGhpcy5tZWRpYVNGVVBhcmFtZXRlcnMgPSB7XG4gICAgICAuLi50aGlzLmdldEFsbFBhcmFtcygpLFxuICAgICAgLi4udGhpcy5tZWRpYVNGVUZ1bmN0aW9ucygpLFxuICAgIH07XG4gICAgY29uc3Qgc29ja2V0XyA9IGF3YWl0IHRoaXMuY29ubmVjdF9Tb2NrZXQodGhpcy5hcGlVc2VyTmFtZS52YWx1ZSwgJycsIHRoaXMuYXBpVG9rZW4udmFsdWUpO1xuICAgIGlmIChzb2NrZXRfKSB7XG4gICAgICB0aGlzLnVwZGF0ZVNvY2tldChzb2NrZXRfKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBoYW5kbGVWYWxpZGF0ZWQoKSB7XG4gICAgdGhpcy51cGRhdGVBbGxWaWRlb1N0cmVhbXMoW1xuICAgICAgeyBwcm9kdWNlcklkOiAneW91eW91Jywgc3RyZWFtOiB1bmRlZmluZWQsIGlkOiAneW91eW91JywgbmFtZTogJ3lvdXlvdScgfSxcbiAgICBdKTtcblxuICAgIHRoaXMudXBkYXRlU3RyZWFtTmFtZXMoW3sgaWQ6ICd5b3V5b3UnLCBuYW1lOiAneW91eW91JywgcHJvZHVjZXJJZDogJycgfV0pO1xuXG4gICAgaWYgKHRoaXMudmFsaWRhdGVkLnZhbHVlKSB7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICghdGhpcy5sb2NhbFVJTW9kZS52YWx1ZSkge1xuICAgICAgICAgIGF3YWl0IHRoaXMuY29ubmVjdEFuZEFkZFNvY2tldE1ldGhvZHMoKTtcbiAgICAgICAgICB0aGlzLnVwZGF0ZUlzTG9hZGluZ01vZGFsVmlzaWJsZSh0cnVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnVwZGF0ZUlzTG9hZGluZ01vZGFsVmlzaWJsZShmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdlcnJvciBjb25uZWN0QW5kYUFkZFNvY2tldE1ldGhvZHMnLCBlcnJvcik7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc3RhcnRNZWV0aW5nUHJvZ3Jlc3NUaW1lci5zdGFydE1lZXRpbmdQcm9ncmVzc1RpbWVyKHtcbiAgICAgICAgc3RhcnRUaW1lOiBEYXRlLm5vdygpIC8gMTAwMCxcbiAgICAgICAgcGFyYW1ldGVyczogeyAuLi50aGlzLmdldEFsbFBhcmFtcygpLCAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCkgfSxcbiAgICAgIH0pO1xuXG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScpXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpvcmllbnRhdGlvbmNoYW5nZScpXG4gIGFzeW5jIGhhbmRsZVJlc2l6ZSgpIHtcbiAgICBsZXQgZnJhY3Rpb24gPSAwO1xuXG4gICAgaWYgKFxuICAgICAgd2luZG93LmlubmVySGVpZ2h0IDwgd2luZG93LmlubmVyV2lkdGggJiZcbiAgICAgICh0aGlzLmV2ZW50VHlwZS52YWx1ZSA9PSAnd2ViaW5hcicgfHwgdGhpcy5ldmVudFR5cGUudmFsdWUgPT0gJ2NvbmZlcmVuY2UnKVxuICAgICkge1xuICAgICAgY29uc3QgY3VycmVudEhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgIGZyYWN0aW9uID0gTnVtYmVyKCg0MCAvIGN1cnJlbnRIZWlnaHQpLnRvRml4ZWQoMykpO1xuICAgICAgaWYgKGZyYWN0aW9uICE9IHRoaXMuY29udHJvbEhlaWdodC52YWx1ZSkge1xuICAgICAgICB0aGlzLnVwZGF0ZUNvbnRyb2xIZWlnaHQoTnVtYmVyKGZyYWN0aW9uKSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFNldCBkZWZhdWx0IGNvbnRyb2wgYnV0dG9uIGhlaWdodCBmb3IgcG9ydHJhaXQgbW9kZSBvciBvdGhlciBldmVudCB0eXBlc1xuICAgICAgY29uc3QgY3VycmVudEhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgIGZyYWN0aW9uID0gTnVtYmVyKCg0MCAvIGN1cnJlbnRIZWlnaHQpLnRvRml4ZWQoMykpO1xuICAgICAgZnJhY3Rpb24gPSBOdW1iZXIoZnJhY3Rpb24pO1xuICAgICAgaWYgKGZyYWN0aW9uICE9IHRoaXMuY29udHJvbEhlaWdodC52YWx1ZSkge1xuICAgICAgICB0aGlzLnVwZGF0ZUNvbnRyb2xIZWlnaHQoTnVtYmVyKGZyYWN0aW9uKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgZGltZW5zaW9ucyA9IHRoaXMuY29tcHV0ZURpbWVuc2lvbnNNZXRob2Qoe1xuICAgICAgY29udGFpbmVyV2lkdGhGcmFjdGlvbjogMSxcbiAgICAgIGNvbnRhaW5lckhlaWdodEZyYWN0aW9uOiAxLFxuICAgICAgbWFpblNpemU6IHRoaXMubWFpbkhlaWdodFdpZHRoLnZhbHVlLFxuICAgICAgZG9TdGFjazogdHJ1ZSxcbiAgICAgIGRlZmF1bHRGcmFjdGlvbjpcbiAgICAgICAgdGhpcy5ldmVudFR5cGUudmFsdWUgPT0gJ3dlYmluYXInIHx8IHRoaXMuZXZlbnRUeXBlLnZhbHVlID09ICdjb25mZXJlbmNlJ1xuICAgICAgICAgID8gMSAtIGZyYWN0aW9uXG4gICAgICAgICAgOiAxLFxuICAgIH0pO1xuXG4gICAgdGhpcy51cGRhdGVDb21wb25lbnRTaXplcyhkaW1lbnNpb25zKTtcblxuICAgIGNvbnN0IG9yaWVudGF0aW9uID0gdGhpcy5jaGVja09yaWVudGF0aW9uKCk7XG4gICAgaWYgKG9yaWVudGF0aW9uID09ICdwb3J0cmFpdCcpIHtcbiAgICAgIGlmICghdGhpcy5pc1dpZGVTY3JlZW4udmFsdWUpIHtcbiAgICAgICAgaWYgKHRoaXMuc2hhcmVTY3JlZW5TdGFydGVkLnZhbHVlIHx8IHRoaXMuc2hhcmVkLnZhbHVlKSB7XG4gICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5Gb3JjZUZ1bGxEaXNwbGF5KHRydWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gVXBkYXRlcyB0aGUgbWFpbiBncmlkIHZpZXdcbiAgICBhd2FpdCB0aGlzLnByZXBvcHVsYXRlVXNlck1lZGlhLnByZXBvcHVsYXRlVXNlck1lZGlhKHtcbiAgICAgIG5hbWU6IHRoaXMuaG9zdExhYmVsLnZhbHVlLFxuICAgICAgcGFyYW1ldGVyczogeyAuLi50aGlzLmdldEFsbFBhcmFtcygpLCAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCkgfSxcbiAgICB9KTtcbiAgICAvLyBVcGRhdGVzIHRoZSBtaW5pIGdyaWQgdmlld1xuICAgIGF3YWl0IHRoaXMub25TY3JlZW5DaGFuZ2VzLm9uU2NyZWVuQ2hhbmdlcyh7XG4gICAgICBjaGFuZ2VkOiB0cnVlLFxuICAgICAgcGFyYW1ldGVyczogeyAuLi50aGlzLmdldEFsbFBhcmFtcygpLCAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCkgfSxcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIGRpc2Nvbm5lY3RBbGxTb2NrZXRzKGNvbnN1bWVfc29ja2V0czogQ29uc3VtZVNvY2tldFtdKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgZm9yIChjb25zdCBzb2NrZXQgb2YgY29uc3VtZV9zb2NrZXRzKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBpcCA9IE9iamVjdC5rZXlzKHNvY2tldClbMF07XG4gICAgICAgIGF3YWl0IHNvY2tldFtpcF0uZGlzY29ubmVjdCgpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5sb2coYEVycm9yIGRpc2Nvbm5lY3Rpbmcgc29ja2V0IHdpdGggSVA6ICR7T2JqZWN0LmtleXMoc29ja2V0KVswXX1gLCBlcnJvcik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgY2xvc2VBbmRSZXNldCgpIHtcbiAgICAvL2Nsb3NlIGFuZCBjbGVhbiB1cCBhbGwgc29ja2V0cywgbW9kYWxzLC4uLiBhbmQgcmVzZXQgYWxsIHN0YXRlcyB0byBpbml0aWFsIHZhbHVlc1xuXG4gICAgdGhpcy51cGRhdGVJc01lc3NhZ2VzTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgICB0aGlzLnVwZGF0ZUlzUGFydGljaXBhbnRzTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgICB0aGlzLnVwZGF0ZUlzV2FpdGluZ01vZGFsVmlzaWJsZShmYWxzZSk7XG4gICAgdGhpcy51cGRhdGVJc1JlcXVlc3RzTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgICB0aGlzLnVwZGF0ZUlzQ29Ib3N0TW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgICB0aGlzLnVwZGF0ZUlzU2V0dGluZ3NNb2RhbFZpc2libGUoZmFsc2UpO1xuICAgIHRoaXMudXBkYXRlSXNEaXNwbGF5U2V0dGluZ3NNb2RhbFZpc2libGUoZmFsc2UpO1xuICAgIHRoaXMudXBkYXRlSXNNZWRpYVNldHRpbmdzTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgICB0aGlzLnVwZGF0ZUlzTWVudU1vZGFsVmlzaWJsZShmYWxzZSk7XG4gICAgdGhpcy51cGRhdGVJc1NoYXJlRXZlbnRNb2RhbFZpc2libGUoZmFsc2UpO1xuICAgIHRoaXMudXBkYXRlSXNDb25maXJtRXhpdE1vZGFsVmlzaWJsZShmYWxzZSk7XG4gICAgYXdhaXQgdGhpcy5kaXNjb25uZWN0QWxsU29ja2V0cyh0aGlzLmNvbnN1bWVfc29ja2V0cy52YWx1ZSk7XG4gICAgYXdhaXQgdGhpcy51cGRhdGVTdGF0ZXNUb0luaXRpYWxWYWx1ZXMoKTtcbiAgICB0aGlzLnVwZGF0ZU1lZXRpbmdQcm9ncmVzc1RpbWUoJzAwOjAwOjAwJyk7XG4gICAgdGhpcy51cGRhdGVNZWV0aW5nRWxhcHNlZFRpbWUoMCk7XG4gICAgdGhpcy51cGRhdGVSZWNvcmRpbmdQcm9ncmVzc1RpbWUoJzAwOjAwOjAwJyk7XG4gICAgdGhpcy51cGRhdGVSZWNvcmRFbGFwc2VkVGltZSgwKTtcbiAgICB0aGlzLnVwZGF0ZVNob3dSZWNvcmRCdXR0b25zKGZhbHNlKTtcblxuICAgIHRoaXMudXBkYXRlSXNDb25maWd1cmVXaGl0ZWJvYXJkTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgICB0aGlzLnVwZGF0ZUlzV2hpdGVib2FyZE1vZGFsVmlzaWJsZShmYWxzZSk7XG4gICAgdGhpcy51cGRhdGVJc01lbnVNb2RhbFZpc2libGUoZmFsc2UpO1xuICAgIHRoaXMudXBkYXRlSXNSZWNvcmRpbmdNb2RhbFZpc2libGUoZmFsc2UpO1xuICAgIHRoaXMudXBkYXRlSXNQb2xsTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgICB0aGlzLnVwZGF0ZUlzQnJlYWtvdXRSb29tc01vZGFsVmlzaWJsZShmYWxzZSk7XG4gICAgdGhpcy51cGRhdGVJc0JhY2tncm91bmRNb2RhbFZpc2libGUoZmFsc2UpO1xuICAgIHRoaXMudXBkYXRlSXNMb2FkaW5nTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgICB0aGlzLnVwZGF0ZUlzQ29uZmlybUhlcmVNb2RhbFZpc2libGUoZmFsc2UpO1xuXG4gICAgYXdhaXQgc2xlZXAoeyBtczogNTAwIH0pO1xuICAgIHRoaXMudXBkYXRlVmFsaWRhdGVkKGZhbHNlKTtcbiAgICAvL2lmIG9uIHdlYiwgcmVsb2FkIHRoZSBwYWdlXG4gICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICB9XG5cbiAgY29tcHV0ZURpbWVuc2lvbnNNZXRob2QgPSAoe1xuICAgIGNvbnRhaW5lcldpZHRoRnJhY3Rpb24gPSAxLFxuICAgIGNvbnRhaW5lckhlaWdodEZyYWN0aW9uID0gMSxcbiAgICBtYWluU2l6ZSxcbiAgICBkb1N0YWNrID0gdHJ1ZSxcbiAgICBkZWZhdWx0RnJhY3Rpb24sXG4gIH06IHtcbiAgICBjb250YWluZXJXaWR0aEZyYWN0aW9uPzogbnVtYmVyO1xuICAgIGNvbnRhaW5lckhlaWdodEZyYWN0aW9uPzogbnVtYmVyO1xuICAgIG1haW5TaXplOiBudW1iZXI7XG4gICAgZG9TdGFjaz86IGJvb2xlYW47XG4gICAgZGVmYXVsdEZyYWN0aW9uOiBudW1iZXI7XG4gIH0pOiBDb21wb25lbnRTaXplcyA9PiB7XG4gICAgY29uc3QgcGFyZW50V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCAqIGNvbnRhaW5lcldpZHRoRnJhY3Rpb247XG4gICAgY29uc3QgcGFyZW50SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0ICogY29udGFpbmVySGVpZ2h0RnJhY3Rpb24gKiBkZWZhdWx0RnJhY3Rpb247XG4gICAgbGV0IGlzV2lkZVNjcmVlbiA9IHBhcmVudFdpZHRoID49IDc2ODtcblxuICAgIGlmICghaXNXaWRlU2NyZWVuICYmIHBhcmVudFdpZHRoID4gMS41ICogcGFyZW50SGVpZ2h0KSB7XG4gICAgICBpc1dpZGVTY3JlZW4gPSB0cnVlO1xuICAgIH1cblxuICAgIHRoaXMudXBkYXRlSXNXaWRlU2NyZWVuKGlzV2lkZVNjcmVlbik7XG5cbiAgICBjb25zdCBkaW1lbnNpb25zID0gdGhpcy5jYWxjdWxhdGVEaW1lbnNpb25zKHtcbiAgICAgIHBhcmVudFdpZHRoLFxuICAgICAgcGFyZW50SGVpZ2h0LFxuICAgICAgaXNXaWRlU2NyZWVuLFxuICAgICAgbWFpblNpemUsXG4gICAgICBkb1N0YWNrLFxuICAgIH0pO1xuICAgIHJldHVybiBkaW1lbnNpb25zO1xuICB9O1xuXG4gIGNhbGN1bGF0ZURpbWVuc2lvbnMoe1xuICAgIHBhcmVudFdpZHRoLFxuICAgIHBhcmVudEhlaWdodCxcbiAgICBpc1dpZGVTY3JlZW4sXG4gICAgbWFpblNpemUsXG4gICAgZG9TdGFjayxcbiAgfToge1xuICAgIHBhcmVudFdpZHRoOiBudW1iZXI7XG4gICAgcGFyZW50SGVpZ2h0OiBudW1iZXI7XG4gICAgaXNXaWRlU2NyZWVuOiBib29sZWFuO1xuICAgIG1haW5TaXplOiBudW1iZXI7XG4gICAgZG9TdGFjazogYm9vbGVhbjtcbiAgfSk6IENvbXBvbmVudFNpemVzIHtcbiAgICBpZiAoZG9TdGFjaykge1xuICAgICAgcmV0dXJuIGlzV2lkZVNjcmVlblxuICAgICAgICA/IHtcbiAgICAgICAgICAgIG1haW5IZWlnaHQ6IE1hdGguZmxvb3IocGFyZW50SGVpZ2h0KSxcbiAgICAgICAgICAgIG90aGVySGVpZ2h0OiBNYXRoLmZsb29yKHBhcmVudEhlaWdodCksXG4gICAgICAgICAgICBtYWluV2lkdGg6IE1hdGguZmxvb3IoKG1haW5TaXplIC8gMTAwKSAqIHBhcmVudFdpZHRoKSxcbiAgICAgICAgICAgIG90aGVyV2lkdGg6IE1hdGguZmxvb3IoKCgxMDAgLSBtYWluU2l6ZSkgLyAxMDApICogcGFyZW50V2lkdGgpLFxuICAgICAgICAgIH1cbiAgICAgICAgOiB7XG4gICAgICAgICAgICBtYWluSGVpZ2h0OiBNYXRoLmZsb29yKChtYWluU2l6ZSAvIDEwMCkgKiBwYXJlbnRIZWlnaHQpLFxuICAgICAgICAgICAgb3RoZXJIZWlnaHQ6IE1hdGguZmxvb3IoKCgxMDAgLSBtYWluU2l6ZSkgLyAxMDApICogcGFyZW50SGVpZ2h0KSxcbiAgICAgICAgICAgIG1haW5XaWR0aDogTWF0aC5mbG9vcihwYXJlbnRXaWR0aCksXG4gICAgICAgICAgICBvdGhlcldpZHRoOiBNYXRoLmZsb29yKHBhcmVudFdpZHRoKSxcbiAgICAgICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBtYWluSGVpZ2h0OiBNYXRoLmZsb29yKHBhcmVudEhlaWdodCksXG4gICAgICAgIG90aGVySGVpZ2h0OiBNYXRoLmZsb29yKHBhcmVudEhlaWdodCksXG4gICAgICAgIG1haW5XaWR0aDogTWF0aC5mbG9vcihwYXJlbnRXaWR0aCksXG4gICAgICAgIG90aGVyV2lkdGg6IE1hdGguZmxvb3IocGFyZW50V2lkdGgpLFxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVPcmllbnRhdGlvbkNoYW5nZSgpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5oYW5kbGVSZXNpemUuYmluZCh0aGlzKSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ29yaWVudGF0aW9uY2hhbmdlJywgdGhpcy5oYW5kbGVSZXNpemUuYmluZCh0aGlzKSk7XG4gIH1cblxuICBzZXR1cFJlc2l6ZUxpc3RlbmVyKCkge1xuICAgIHRoaXMuaGFuZGxlUmVzaXplKCk7XG4gIH1cblxuICBvcmllbnRhdGlvbiA9IHdpbmRvdy5pbm5lckhlaWdodCA+IHdpbmRvdy5pbm5lcldpZHRoID8gJ3BvcnRyYWl0JyA6ICdsYW5kc2NhcGUnO1xuXG4gIGFzeW5jIGpvaW5Sb29tKGRhdGE6IHtcbiAgICBzb2NrZXQ6IFNvY2tldDtcbiAgICByb29tTmFtZTogc3RyaW5nO1xuICAgIGlzbGV2ZWw6IHN0cmluZztcbiAgICBtZW1iZXI6IHN0cmluZztcbiAgICBzZWM6IHN0cmluZztcbiAgICBhcGlVc2VyTmFtZTogc3RyaW5nO1xuICB9KTogUHJvbWlzZTxSZXNwb25zZUpvaW5Sb29tIHwgbnVsbD4ge1xuICAgIGNvbnN0IHsgc29ja2V0LCByb29tTmFtZSwgaXNsZXZlbCwgbWVtYmVyLCBzZWMsIGFwaVVzZXJOYW1lIH0gPSBkYXRhO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlOiBSZXNwb25zZUpvaW5Sb29tIHwgbnVsbCA9IGF3YWl0IHRoaXMuam9pblJvb21DbGllbnQuam9pblJvb21DbGllbnQoe1xuICAgICAgICBzb2NrZXQsXG4gICAgICAgIHJvb21OYW1lLFxuICAgICAgICBpc2xldmVsLFxuICAgICAgICBtZW1iZXIsXG4gICAgICAgIHNlYyxcbiAgICAgICAgYXBpVXNlck5hbWUsXG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZygnRXJyb3Igam9pbmluZyByb29tOicsIGVycm9yKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIGpvaW4gdGhlIHJvb20uIFBsZWFzZSBjaGVjayB5b3VyIGNvbm5lY3Rpb24gYW5kIHRyeSBhZ2Fpbi4nKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBqb2luX1Jvb20oe1xuICAgIHNvY2tldCxcbiAgICByb29tTmFtZSxcbiAgICBpc2xldmVsLFxuICAgIG1lbWJlcixcbiAgICBzZWMsXG4gICAgYXBpVXNlck5hbWUsXG4gIH06IHtcbiAgICBzb2NrZXQ6IFNvY2tldDtcbiAgICByb29tTmFtZTogc3RyaW5nO1xuICAgIGlzbGV2ZWw6IHN0cmluZztcbiAgICBtZW1iZXI6IHN0cmluZztcbiAgICBzZWM6IHN0cmluZztcbiAgICBhcGlVc2VyTmFtZTogc3RyaW5nO1xuICB9KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgZGF0YTogUmVzcG9uc2VKb2luUm9vbSB8IG51bGwgPSBhd2FpdCB0aGlzLmpvaW5Sb29tKHtcbiAgICAgIHNvY2tldDogc29ja2V0LFxuICAgICAgcm9vbU5hbWU6IHJvb21OYW1lLFxuICAgICAgaXNsZXZlbDogaXNsZXZlbCxcbiAgICAgIG1lbWJlcjogbWVtYmVyLFxuICAgICAgc2VjOiBzZWMsXG4gICAgICBhcGlVc2VyTmFtZTogYXBpVXNlck5hbWUsXG4gICAgfSk7XG5cbiAgICBpZiAoZGF0YSAmJiBkYXRhLnN1Y2Nlc3MpIHtcbiAgICAgIHRoaXMucm9vbURhdGEubmV4dChkYXRhKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy51cGRhdGVSb29tUGFyYW1ldGVyc0NsaWVudC51cGRhdGVSb29tUGFyYW1ldGVyc0NsaWVudCh7XG4gICAgICAgICAgcGFyYW1ldGVyczoge1xuICAgICAgICAgICAgLi4udGhpcy5nZXRBbGxQYXJhbXMoKSxcbiAgICAgICAgICAgIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSxcbiAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGRhdGEuaXNIb3N0KSB7XG4gICAgICAgICAgdGhpcy51cGRhdGVJc2xldmVsKCcyJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy51cGRhdGVJc2xldmVsKCcxJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGF0YS5zZWN1cmVDb2RlKSB7XG4gICAgICAgICAgdGhpcy51cGRhdGVBZG1pblBhc3Njb2RlKGRhdGEuc2VjdXJlQ29kZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGF0YS5ydHBDYXBhYmlsaXRpZXMpIHtcbiAgICAgICAgICBjb25zdCBkZXZpY2VfID0gYXdhaXQgdGhpcy5jcmVhdGVEZXZpY2VDbGllbnQuY3JlYXRlRGV2aWNlQ2xpZW50KHtcbiAgICAgICAgICAgIHJ0cENhcGFiaWxpdGllczogZGF0YS5ydHBDYXBhYmlsaXRpZXMsXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpZiAoZGV2aWNlXykge1xuICAgICAgICAgICAgdGhpcy5kZXZpY2UubmV4dChkZXZpY2VfKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2gge1xuICAgICAgICAvKiBoYW5kbGUgZXJyb3IgKi9cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy51cGRhdGVWYWxpZGF0ZWQoZmFsc2UpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKHRoaXMuc2hvd0FsZXJ0ICYmIGRhdGE/LnJlYXNvbikge1xuICAgICAgICAgIHRoaXMuc2hvd0FsZXJ0KHsgbWVzc2FnZTogZGF0YT8ucmVhc29uLCB0eXBlOiAnZGFuZ2VyJywgZHVyYXRpb246IDMwMDAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2gge1xuICAgICAgICAvKiBoYW5kbGUgZXJyb3IgKi9cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvblBhcnRpY2lwYW50c0ZpbHRlckNoYW5nZSA9ICh2YWx1ZTogc3RyaW5nKTogdm9pZCA9PiB7XG4gICAgaWYgKHZhbHVlICYmIHZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuZmlsdGVyZWRQYXJ0aWNpcGFudHMubmV4dChcbiAgICAgICAgdGhpcy5wYXJ0aWNpcGFudHMudmFsdWUuZmlsdGVyKChwYXJ0aWNpcGFudCkgPT5cbiAgICAgICAgICBwYXJ0aWNpcGFudC5uYW1lLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXModmFsdWUudG9Mb3dlckNhc2UoKSksXG4gICAgICAgICksXG4gICAgICApO1xuICAgICAgdGhpcy5wYXJ0aWNpcGFudHNDb3VudGVyLm5leHQodGhpcy5maWx0ZXJlZFBhcnRpY2lwYW50cy52YWx1ZS5sZW5ndGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmZpbHRlcmVkUGFydGljaXBhbnRzLm5leHQodGhpcy5wYXJ0aWNpcGFudHMudmFsdWUpO1xuICAgICAgdGhpcy5wYXJ0aWNpcGFudHNDb3VudGVyLm5leHQodGhpcy5wYXJ0aWNpcGFudHMudmFsdWUubGVuZ3RoKTtcbiAgICB9XG4gIH07XG5cbiAgdXBkYXRlU3RhdGVzVG9Jbml0aWFsVmFsdWVzID0gYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IGluaXRpYWxWYWx1ZXMgPSBpbml0aWFsVmFsdWVzU3RhdGUgYXMgeyBba2V5OiBzdHJpbmddOiBhbnkgfTtcbiAgICBjb25zdCB1cGRhdGVGdW5jdGlvbnMgPSB0aGlzLmdldEFsbFBhcmFtcygpIGFzIHVua25vd24gYXMge1xuICAgICAgW2tleTogc3RyaW5nXTogKHZhbHVlOiBhbnkpID0+IHZvaWQ7XG4gICAgfTtcblxuICAgIGZvciAoY29uc3Qga2V5IGluIGluaXRpYWxWYWx1ZXMpIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaW5pdGlhbFZhbHVlcywga2V5KSkge1xuICAgICAgICBjb25zdCB1cGRhdGVGdW5jdGlvbk5hbWUgPSBgdXBkYXRlJHtrZXkuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBrZXkuc2xpY2UoMSl9YDtcbiAgICAgICAgY29uc3QgdXBkYXRlRnVuY3Rpb24gPSB1cGRhdGVGdW5jdGlvbnNbdXBkYXRlRnVuY3Rpb25OYW1lXTtcblxuICAgICAgICBpZiAodHlwZW9mIHVwZGF0ZUZ1bmN0aW9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHVwZGF0ZUZ1bmN0aW9uKGluaXRpYWxWYWx1ZXNba2V5XSk7XG4gICAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgICAvKiBoYW5kbGUgZXJyb3IgKi9cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgZmFSZWNvcmRWaW55bCA9IGZhUmVjb3JkVmlueWw7XG4gIGZhUGxheUNpcmNsZSA9IGZhUGxheUNpcmNsZTtcbiAgZmFQYXVzZUNpcmNsZSA9IGZhUGF1c2VDaXJjbGU7XG4gIGZhU3RvcENpcmNsZSA9IGZhU3RvcENpcmNsZTtcbiAgZmFEb3RDaXJjbGUgPSBmYURvdENpcmNsZTtcbiAgZmFDb2cgPSBmYUNvZztcbiAgZmFVc2VycyA9IGZhVXNlcnM7XG4gIGZhQ2xvY2sgPSBmYUNsb2NrO1xuICBmYVVzZXJQbHVzID0gZmFVc2VyUGx1cztcbiAgZmFUb29scyA9IGZhVG9vbHM7XG4gIGZhRGVza3RvcCA9IGZhRGVza3RvcDtcbiAgZmFQb2xsID0gZmFQb2xsO1xuICBmYVVzZXJGcmllbmRzID0gZmFVc2VyRnJpZW5kcztcbiAgZmFDaGFsa2JvYXJkVGVhY2hlciA9IGZhQ2hhbGtib2FyZFRlYWNoZXI7XG4gIGZhTWljcm9waG9uZSA9IGZhTWljcm9waG9uZTtcbiAgZmFNaWNyb3Bob25lU2xhc2ggPSBmYU1pY3JvcGhvbmVTbGFzaDtcbiAgZmFWaWRlbyA9IGZhVmlkZW87XG4gIGZhVmlkZW9TbGFzaCA9IGZhVmlkZW9TbGFzaDtcbiAgZmFQaG9uZSA9IGZhUGhvbmU7XG4gIGZhQmFycyA9IGZhQmFycztcbiAgZmFDb21tZW50cyA9IGZhQ29tbWVudHM7XG4gIGZhQ2hhcnRCYXIgPSBmYUNoYXJ0QmFyO1xuXG4gIG9uQ2xvc2VNZW51TW9kYWwgPSAoKSA9PiB7XG4gICAgdGhpcy51cGRhdGVJc01lbnVNb2RhbFZpc2libGUoZmFsc2UpO1xuICB9O1xuXG4gIG9uRXZlbnRTZXR0aW5nc0Nsb3NlID0gKCkgPT4ge1xuICAgIHRoaXMudXBkYXRlSXNTZXR0aW5nc01vZGFsVmlzaWJsZShmYWxzZSk7XG4gIH07XG5cbiAgb25Db0hvc3RDbG9zZSA9ICgpID0+IHtcbiAgICB0aGlzLnVwZGF0ZUlzQ29Ib3N0TW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgfTtcblxuICBvbk1lZGlhU2V0dGluZ3NDbG9zZSA9ICgpID0+IHtcbiAgICB0aGlzLnVwZGF0ZUlzTWVkaWFTZXR0aW5nc01vZGFsVmlzaWJsZShmYWxzZSk7XG4gIH07XG5cbiAgb25EaXNwbGF5U2V0dGluZ3NDbG9zZSA9ICgpID0+IHtcbiAgICB0aGlzLnVwZGF0ZUlzRGlzcGxheVNldHRpbmdzTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgfTtcblxuICBvblBvbGxDbG9zZSA9ICgpID0+IHtcbiAgICB0aGlzLnVwZGF0ZUlzUG9sbE1vZGFsVmlzaWJsZShmYWxzZSk7XG4gIH07XG5cbiAgb25CcmVha291dFJvb21zQ2xvc2UgPSAoKSA9PiB7XG4gICAgdGhpcy51cGRhdGVJc0JyZWFrb3V0Um9vbXNNb2RhbFZpc2libGUoZmFsc2UpO1xuICB9O1xuXG4gIG9uQ29uZmlndXJlV2hpdGVib2FyZENsb3NlID0gKCkgPT4ge1xuICAgIHRoaXMudXBkYXRlSXNDb25maWd1cmVXaGl0ZWJvYXJkTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgfTtcblxuICBvbk1lc3NhZ2VzQ2xvc2UgPSAoKSA9PiB7XG4gICAgdGhpcy51cGRhdGVJc01lc3NhZ2VzTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgfTtcblxuICBvblJlY29yZGluZ0Nsb3NlID0gKCkgPT4ge1xuICAgIHRoaXMudXBkYXRlSXNSZWNvcmRpbmdNb2RhbFZpc2libGUoZmFsc2UpO1xuICB9O1xuXG4gIG9uUGFydGljaXBhbnRzQ2xvc2UgPSAoKSA9PiB7XG4gICAgdGhpcy51cGRhdGVJc1BhcnRpY2lwYW50c01vZGFsVmlzaWJsZShmYWxzZSk7XG4gIH07XG5cbiAgb25CYWNrZ3JvdW5kQ2xvc2UgPSAoKSA9PiB7XG4gICAgdGhpcy51cGRhdGVJc0JhY2tncm91bmRNb2RhbFZpc2libGUoZmFsc2UpO1xuICB9O1xuXG4gIG9uQ29uZmlybUV4aXRDbG9zZSA9ICgpID0+IHtcbiAgICB0aGlzLnVwZGF0ZUlzQ29uZmlybUV4aXRNb2RhbFZpc2libGUoZmFsc2UpO1xuICB9O1xuXG4gIG9uQ29uZmlybUhlcmVDbG9zZSA9ICgpID0+IHtcbiAgICB0aGlzLnVwZGF0ZUlzQ29uZmlybUhlcmVNb2RhbFZpc2libGUoZmFsc2UpO1xuICB9O1xuXG4gIG9uU2NyZWVuYm9hcmRDbG9zZSA9ICgpID0+IHtcbiAgICB0aGlzLnVwZGF0ZUlzU2NyZWVuYm9hcmRNb2RhbFZpc2libGUoZmFsc2UpO1xuICB9O1xuXG4gIG9uU2hhcmVFdmVudENsb3NlID0gKCkgPT4ge1xuICAgIHRoaXMudXBkYXRlSXNTaGFyZUV2ZW50TW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgfTtcblxuICBvbkFsZXJ0SGlkZSA9ICgpID0+IHtcbiAgICB0aGlzLnVwZGF0ZUFsZXJ0VmlzaWJsZShmYWxzZSk7XG4gIH07XG5cbiAgU2NyZWVuYm9hcmRXaWRnZXQgPSB7XG4gICAgY29tcG9uZW50OiBTY3JlZW5ib2FyZCxcbiAgICBpbnB1dHM6IHtcbiAgICAgIGN1c3RvbVdpZHRoOiB0aGlzLmNvbXBvbmVudFNpemVzLnZhbHVlLm1haW5XaWR0aCxcbiAgICAgIGN1c3RvbUhlaWdodDogdGhpcy5jb21wb25lbnRTaXplcy52YWx1ZS5tYWluSGVpZ2h0LFxuICAgICAgcGFyYW1ldGVyczogdGhpcy5tZWRpYVNGVVBhcmFtZXRlcnMsXG4gICAgICBzaG93QXNwZWN0OiB0aGlzLnNoYXJlZC52YWx1ZSxcbiAgICB9LFxuICB9O1xuXG4gIHJlY29yZFRpbWVyV2lkZ2V0ID0ge1xuICAgIGNvbXBvbmVudDogUmVjb3JkVGltZXJXaWRnZXQsXG4gICAgaW5qZWN0b3I6IHRoaXMuY3JlYXRlSW5qZWN0b3IoeyByZWNvcmRpbmdQcm9ncmVzc1RpbWU6IHRoaXMucmVjb3JkaW5nUHJvZ3Jlc3NUaW1lLnZhbHVlIH0pLFxuICB9O1xuXG4gIHVwZGF0ZVJlY29yZFRpbWVyV2lkZ2V0ID0gKFxuICAgIHJlY29yZGluZ1Byb2dyZXNzVGltZTogc3RyaW5nID0gdGhpcy5yZWNvcmRpbmdQcm9ncmVzc1RpbWUudmFsdWUsXG4gICk6IHsgY29tcG9uZW50OiBhbnk7IGluamVjdG9yOiBJbmplY3RvciB9ID0+IHtcbiAgICBjb25zdCByZWNvcmRUaW1lcldpZGdldCA9IHtcbiAgICAgIGNvbXBvbmVudDogUmVjb3JkVGltZXJXaWRnZXQsXG4gICAgICBpbmplY3RvcjogdGhpcy5jcmVhdGVJbmplY3Rvcih7IHJlY29yZGluZ1Byb2dyZXNzVGltZTogcmVjb3JkaW5nUHJvZ3Jlc3NUaW1lIH0pLFxuICAgIH07XG5cbiAgICB0aGlzLnJlY29yZFRpbWVyV2lkZ2V0ID0geyAuLi5yZWNvcmRUaW1lcldpZGdldCB9O1xuXG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG5cbiAgICByZXR1cm4gcmVjb3JkVGltZXJXaWRnZXQ7XG4gIH07XG5cbiAgcmVjb3JkQnV0dG9uczogTWFpbkJ1dHRvbkFsdFtdID0gW107XG5cbiAgcmVjb3JkQnV0dG9uc0FycmF5OiBNYWluQnV0dG9uQWx0W10gPSBbXG4gICAge1xuICAgICAgaWNvbjogdGhpcy5mYVBsYXlDaXJjbGUsXG4gICAgICBhY3RpdmU6ICgpID0+ICF0aGlzLnJlY29yZFBhdXNlZC52YWx1ZSxcbiAgICAgIG9uUHJlc3M6ICgpID0+XG4gICAgICAgIHRoaXMudXBkYXRlUmVjb3JkaW5nLnVwZGF0ZVJlY29yZGluZyh7XG4gICAgICAgICAgcGFyYW1ldGVyczogeyAuLi50aGlzLmdldEFsbFBhcmFtcygpLCAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCkgfSxcbiAgICAgICAgfSksXG4gICAgICBhY3RpdmVDb2xvcjogJ2JsYWNrJyxcbiAgICAgIGluQWN0aXZlQ29sb3I6ICdibGFjaycsXG4gICAgICBhbHRlcm5hdGVJY29uOiB0aGlzLmZhUGF1c2VDaXJjbGUsXG4gICAgICBzaG93OiAoKSA9PiB0cnVlLFxuICAgIH0sXG4gICAge1xuICAgICAgaWNvbjogdGhpcy5mYVN0b3BDaXJjbGUsXG4gICAgICBhY3RpdmU6ICgpID0+IGZhbHNlLFxuICAgICAgb25QcmVzczogKCkgPT5cbiAgICAgICAgdGhpcy5zdG9wUmVjb3JkaW5nLnN0b3BSZWNvcmRpbmcoe1xuICAgICAgICAgIHBhcmFtZXRlcnM6IHsgLi4udGhpcy5nZXRBbGxQYXJhbXMoKSwgLi4udGhpcy5tZWRpYVNGVUZ1bmN0aW9ucygpIH0sXG4gICAgICAgIH0pLFxuICAgICAgYWN0aXZlQ29sb3I6ICdncmVlbicsXG4gICAgICBpbkFjdGl2ZUNvbG9yOiAnYmxhY2snLFxuICAgICAgc2hvdzogKCkgPT4gdHJ1ZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGN1c3RvbUNvbXBvbmVudDogKCkgPT4gdGhpcy51cGRhdGVSZWNvcmRUaW1lcldpZGdldCgpLFxuICAgICAgc2hvdzogKCkgPT4gdHJ1ZSxcbiAgICAgIGFjdGl2ZTogKCkgPT4gZmFsc2UsXG4gICAgfSxcbiAgICB7XG4gICAgICBpY29uOiB0aGlzLmZhRG90Q2lyY2xlLFxuICAgICAgYWN0aXZlOiAoKSA9PiBmYWxzZSxcbiAgICAgIG9uUHJlc3M6ICgpID0+IGNvbnNvbGUubG9nKCdTdGF0dXMgcHJlc3NlZCcpLFxuICAgICAgYWN0aXZlQ29sb3I6ICdibGFjaycsXG4gICAgICBpbkFjdGl2ZUNvbG9yOiAoKSA9PiAodGhpcy5yZWNvcmRQYXVzZWQudmFsdWUgPyAneWVsbG93JyA6ICdyZWQnKSxcbiAgICAgIHNob3c6ICgpID0+IHRydWUsXG4gICAgfSxcbiAgICB7XG4gICAgICBpY29uOiB0aGlzLmZhQ29nLFxuICAgICAgYWN0aXZlOiAoKSA9PiBmYWxzZSxcbiAgICAgIG9uUHJlc3M6ICgpID0+XG4gICAgICAgIHRoaXMubGF1bmNoUmVjb3JkaW5nLmxhdW5jaFJlY29yZGluZyh7XG4gICAgICAgICAgdXBkYXRlSXNSZWNvcmRpbmdNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNSZWNvcmRpbmdNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcbiAgICAgICAgICBpc1JlY29yZGluZ01vZGFsVmlzaWJsZTogdGhpcy5pc1JlY29yZGluZ01vZGFsVmlzaWJsZS52YWx1ZSxcbiAgICAgICAgICBzaG93QWxlcnQ6IHRoaXMuc2hvd0FsZXJ0LmJpbmQodGhpcyksXG4gICAgICAgICAgc3RvcExhdW5jaFJlY29yZDogdGhpcy5zdG9wTGF1bmNoUmVjb3JkLnZhbHVlLFxuICAgICAgICAgIGNhbkxhdW5jaFJlY29yZDogdGhpcy5jYW5MYXVuY2hSZWNvcmQudmFsdWUsXG4gICAgICAgICAgcmVjb3JkaW5nQXVkaW9TdXBwb3J0OiB0aGlzLnJlY29yZGluZ0F1ZGlvU3VwcG9ydC52YWx1ZSxcbiAgICAgICAgICByZWNvcmRpbmdWaWRlb1N1cHBvcnQ6IHRoaXMucmVjb3JkaW5nVmlkZW9TdXBwb3J0LnZhbHVlLFxuICAgICAgICAgIHVwZGF0ZUNhblJlY29yZDogdGhpcy51cGRhdGVDYW5SZWNvcmQuYmluZCh0aGlzKSxcbiAgICAgICAgICB1cGRhdGVDbGVhcmVkVG9SZWNvcmQ6IHRoaXMudXBkYXRlQ2xlYXJlZFRvUmVjb3JkLmJpbmQodGhpcyksXG4gICAgICAgICAgcmVjb3JkU3RhcnRlZDogdGhpcy5yZWNvcmRTdGFydGVkLnZhbHVlLFxuICAgICAgICAgIHJlY29yZFBhdXNlZDogdGhpcy5yZWNvcmRQYXVzZWQudmFsdWUsXG4gICAgICAgICAgbG9jYWxVSU1vZGU6IHRoaXMubG9jYWxVSU1vZGUudmFsdWUsXG4gICAgICAgIH0pLFxuICAgICAgYWN0aXZlQ29sb3I6ICdncmVlbicsXG4gICAgICBpbkFjdGl2ZUNvbG9yOiAnYmxhY2snLFxuICAgICAgc2hvdzogKCkgPT4gdHJ1ZSxcbiAgICB9LFxuICBdO1xuXG4gIGFzeW5jIHVwZGF0ZVJlY29yZEJ1dHRvbnMoKSB7XG4gICAgY29uc3QgcmVjb3JkQnV0dG9ucyA9IHRoaXMucmVjb3JkQnV0dG9uc0FycmF5Lm1hcCgoYnV0dG9uKSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5idXR0b24sXG4gICAgICAgIGFjdGl2ZTogdHlwZW9mIGJ1dHRvbi5hY3RpdmUgPT09ICdmdW5jdGlvbicgPyBidXR0b24uYWN0aXZlKCkgOiBidXR0b24uYWN0aXZlLFxuICAgICAgICBzaG93OiB0eXBlb2YgYnV0dG9uLnNob3cgPT09ICdmdW5jdGlvbicgPyBidXR0b24uc2hvdygpIDogYnV0dG9uLnNob3csXG4gICAgICAgIGN1c3RvbUNvbXBvbmVudDogYnV0dG9uLmN1c3RvbUNvbXBvbmVudFxuICAgICAgICAgID8gdHlwZW9mIGJ1dHRvbi5jdXN0b21Db21wb25lbnQgPT09ICdmdW5jdGlvbidcbiAgICAgICAgICAgID8gYnV0dG9uLmN1c3RvbUNvbXBvbmVudCgpXG4gICAgICAgICAgICA6IGJ1dHRvbi5jdXN0b21Db21wb25lbnRcbiAgICAgICAgICA6IHVuZGVmaW5lZCxcbiAgICAgICAgYWN0aXZlQ29sb3I6XG4gICAgICAgICAgdHlwZW9mIGJ1dHRvbi5pbkFjdGl2ZUNvbG9yID09PSAnZnVuY3Rpb24nXG4gICAgICAgICAgICA/IGJ1dHRvbi5pbkFjdGl2ZUNvbG9yKClcbiAgICAgICAgICAgIDogYnV0dG9uLmluQWN0aXZlQ29sb3IsXG4gICAgICAgIGluQWN0aXZlQ29sb3I6XG4gICAgICAgICAgdHlwZW9mIGJ1dHRvbi5pbkFjdGl2ZUNvbG9yID09PSAnZnVuY3Rpb24nXG4gICAgICAgICAgICA/IGJ1dHRvbi5pbkFjdGl2ZUNvbG9yKClcbiAgICAgICAgICAgIDogYnV0dG9uLmluQWN0aXZlQ29sb3IsXG4gICAgICB9O1xuICAgIH0pO1xuICAgIHRoaXMucmVjb3JkQnV0dG9ucyA9IFsuLi5yZWNvcmRCdXR0b25zXTtcbiAgICBhd2FpdCB0aGlzLnVwZGF0ZU1lbnVSZWNvcmRXaWRnZXQocmVjb3JkQnV0dG9ucyk7XG4gICAgdGhpcy51cGRhdGVDdXN0b21NZW51QnV0dG9ucygpO1xuXG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICAvLyBDcmVhdGUgaW5zdGFuY2VzIG9mIHRoZSBjdXN0b20gd2lkZ2V0c1xuICBtZW51V2lkZ2V0ID0ge1xuICAgIGNvbXBvbmVudDogTWVudVdpZGdldCxcbiAgICBpbmplY3RvcjogdGhpcy5jcmVhdGVJbmplY3Rvcih7XG4gICAgICBpY29uOiB0aGlzLmZhQmFycyxcbiAgICAgIGJhZGdlVmFsdWU6IHRoaXMudG90YWxSZXFXYWl0LnZhbHVlLFxuICAgICAgaWNvbkNvbG9yOiAnYmxhY2snLFxuICAgICAgc2hvd0JhZGdlOiB0cnVlLFxuICAgIH0pLFxuICB9O1xuXG4gIG1lc3NhZ2VXaWRnZXQgPSB7XG4gICAgY29tcG9uZW50OiBNZXNzYWdlV2lkZ2V0LFxuICAgIGluamVjdG9yOiB0aGlzLmNyZWF0ZUluamVjdG9yKHtcbiAgICAgIGljb246IHRoaXMuZmFDb21tZW50cyxcbiAgICAgIHNob3dCYWRnZTogdGhpcy5zaG93TWVzc2FnZXNCYWRnZS52YWx1ZSxcbiAgICAgIGJhZGdlVmFsdWU6IDEsXG4gICAgICBpY29uQ29sb3I6ICdibGFjaycsXG4gICAgfSksXG4gIH07XG5cbiAgbWVudVJlY29yZFdpZGdldCA9IHtcbiAgICBjb21wb25lbnQ6IE1lbnVSZWNvcmRXaWRnZXQsXG4gICAgaW5qZWN0b3I6IHRoaXMuY3JlYXRlSW5qZWN0b3Ioe1xuICAgICAgYnV0dG9uczogdGhpcy5yZWNvcmRCdXR0b25zLFxuICAgICAgc2hvd0FzcGVjdDogdHJ1ZSxcbiAgICAgIGRpcmVjdGlvbjogJ2hvcml6b250YWwnLFxuICAgIH0pLFxuICB9O1xuXG4gIHVwZGF0ZU1lbnVSZWNvcmRXaWRnZXQgPSAocmVjb3JkQnV0dG9uczogTWFpbkJ1dHRvbkFsdFtdID0gdGhpcy5yZWNvcmRCdXR0b25zKTogYW55ID0+IHtcbiAgICBjb25zdCBtZW51UmVjb3JkV2lkZ2V0ID0ge1xuICAgICAgY29tcG9uZW50OiBNZW51UmVjb3JkV2lkZ2V0LFxuICAgICAgaW5qZWN0b3I6IHRoaXMuY3JlYXRlSW5qZWN0b3Ioe1xuICAgICAgICBidXR0b25zOiByZWNvcmRCdXR0b25zLFxuICAgICAgICBzaG93QXNwZWN0OiB0cnVlLFxuICAgICAgICBkaXJlY3Rpb246ICdob3Jpem9udGFsJyxcbiAgICAgIH0pLFxuICAgIH07XG5cbiAgICB0aGlzLm1lbnVSZWNvcmRXaWRnZXQgPSB7IC4uLm1lbnVSZWNvcmRXaWRnZXQgfTtcblxuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuXG4gICAgcmV0dXJuIG1lbnVSZWNvcmRXaWRnZXQ7XG4gIH07XG5cbiAgbWVudVBhcnRpY2lwYW50c1dpZGdldCA9IHtcbiAgICBjb21wb25lbnQ6IE1lbnVQYXJ0aWNpcGFudHNXaWRnZXQsXG4gICAgaW5qZWN0b3I6IHRoaXMuY3JlYXRlSW5qZWN0b3Ioe1xuICAgICAgaWNvbjogdGhpcy5mYUNoYXJ0QmFyLFxuICAgICAgcGFydGljaXBhbnRzQ291bnRlcjogdGhpcy5wYXJ0aWNpcGFudHNDb3VudGVyLnZhbHVlLFxuICAgICAgaWNvbkNvbG9yOiAnYmxhY2snLFxuICAgIH0pLFxuICB9O1xuXG4gIHVwZGF0ZU1lbnVQYXJ0aWNpcGFudHNXaWRnZXQgPSAoY291bnQ6IG51bWJlciA9IHRoaXMucGFydGljaXBhbnRzQ291bnRlci52YWx1ZSk6IGFueSA9PiB7XG4gICAgY29uc3QgbWVudVBhcnRpY2lwYW50c1dpZGdldCA9IHtcbiAgICAgIGNvbXBvbmVudDogTWVudVBhcnRpY2lwYW50c1dpZGdldCxcbiAgICAgIGluamVjdG9yOiB0aGlzLmNyZWF0ZUluamVjdG9yKHtcbiAgICAgICAgaWNvbjogdGhpcy5mYUNoYXJ0QmFyLFxuICAgICAgICBwYXJ0aWNpcGFudHNDb3VudGVyOiBjb3VudCxcbiAgICAgICAgaWNvbkNvbG9yOiAnYmxhY2snLFxuICAgICAgfSksXG4gICAgfTtcblxuICAgIHRoaXMubWVudVBhcnRpY2lwYW50c1dpZGdldCA9IHsgLi4ubWVudVBhcnRpY2lwYW50c1dpZGdldCB9O1xuXG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG5cbiAgICByZXR1cm4gbWVudVBhcnRpY2lwYW50c1dpZGdldDtcbiAgfTtcblxuICBjdXN0b21NZW51QnV0dG9uc0FycmF5OiBNYWluQ3VzdG9tQnV0dG9uW10gPSBbXG4gICAge1xuICAgICAgaWNvbjogdGhpcy5mYVJlY29yZFZpbnlsLFxuICAgICAgdGV4dDogJ1JlY29yZCcsXG4gICAgICBhY3Rpb246ICgpID0+XG4gICAgICAgIHRoaXMubGF1bmNoUmVjb3JkaW5nLmxhdW5jaFJlY29yZGluZyh7XG4gICAgICAgICAgdXBkYXRlSXNSZWNvcmRpbmdNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNSZWNvcmRpbmdNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcbiAgICAgICAgICBpc1JlY29yZGluZ01vZGFsVmlzaWJsZTogdGhpcy5pc1JlY29yZGluZ01vZGFsVmlzaWJsZS52YWx1ZSxcbiAgICAgICAgICBzaG93QWxlcnQ6IHRoaXMuc2hvd0FsZXJ0LmJpbmQodGhpcyksXG4gICAgICAgICAgc3RvcExhdW5jaFJlY29yZDogdGhpcy5zdG9wTGF1bmNoUmVjb3JkLnZhbHVlLFxuICAgICAgICAgIGNhbkxhdW5jaFJlY29yZDogdGhpcy5jYW5MYXVuY2hSZWNvcmQudmFsdWUsXG4gICAgICAgICAgcmVjb3JkaW5nQXVkaW9TdXBwb3J0OiB0aGlzLnJlY29yZGluZ0F1ZGlvU3VwcG9ydC52YWx1ZSxcbiAgICAgICAgICByZWNvcmRpbmdWaWRlb1N1cHBvcnQ6IHRoaXMucmVjb3JkaW5nVmlkZW9TdXBwb3J0LnZhbHVlLFxuICAgICAgICAgIHVwZGF0ZUNhblJlY29yZDogdGhpcy51cGRhdGVDYW5SZWNvcmQuYmluZCh0aGlzKSxcbiAgICAgICAgICB1cGRhdGVDbGVhcmVkVG9SZWNvcmQ6IHRoaXMudXBkYXRlQ2xlYXJlZFRvUmVjb3JkLmJpbmQodGhpcyksXG4gICAgICAgICAgcmVjb3JkU3RhcnRlZDogdGhpcy5yZWNvcmRTdGFydGVkLnZhbHVlLFxuICAgICAgICAgIHJlY29yZFBhdXNlZDogdGhpcy5yZWNvcmRQYXVzZWQudmFsdWUsXG4gICAgICAgICAgbG9jYWxVSU1vZGU6IHRoaXMubG9jYWxVSU1vZGUudmFsdWUsXG4gICAgICAgIH0pLFxuICAgICAgc2hvdzogKCkgPT4gIXRoaXMuc2hvd1JlY29yZEJ1dHRvbnMudmFsdWUgJiYgdGhpcy5pc2xldmVsLnZhbHVlID09ICcyJyxcbiAgICB9LFxuICAgIHtcbiAgICAgIGN1c3RvbUNvbXBvbmVudDogKCkgPT4gdGhpcy51cGRhdGVNZW51UmVjb3JkV2lkZ2V0KCksXG4gICAgICBzaG93OiAoKSA9PiB0aGlzLnNob3dSZWNvcmRCdXR0b25zLnZhbHVlICYmIHRoaXMuaXNsZXZlbC52YWx1ZSA9PSAnMicsXG4gICAgICBhY3Rpb246ICgpID0+IGNvbnNvbGUubG9nKCdyZWNvcmQgYnV0dG9ucyBwcmVzc2VkJyksXG4gICAgfSxcbiAgICB7XG4gICAgICBpY29uOiB0aGlzLmZhQ29nLFxuICAgICAgdGV4dDogJ0V2ZW50IFNldHRpbmdzJyxcbiAgICAgIGFjdGlvbjogKCkgPT5cbiAgICAgICAgdGhpcy5sYXVuY2hTZXR0aW5ncy5sYXVuY2hTZXR0aW5ncyh7XG4gICAgICAgICAgdXBkYXRlSXNTZXR0aW5nc01vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc1NldHRpbmdzTW9kYWxWaXNpYmxlLmJpbmQodGhpcyksXG4gICAgICAgICAgaXNTZXR0aW5nc01vZGFsVmlzaWJsZTogdGhpcy5pc1NldHRpbmdzTW9kYWxWaXNpYmxlLnZhbHVlLFxuICAgICAgICB9KSxcbiAgICAgIHNob3c6ICgpID0+IHRoaXMuaXNsZXZlbC52YWx1ZSA9PSAnMicsXG4gICAgfSxcbiAgICB7XG4gICAgICBpY29uOiB0aGlzLmZhVXNlcnMsXG4gICAgICB0ZXh0OiAnUmVxdWVzdHMnLFxuICAgICAgYWN0aW9uOiAoKSA9PlxuICAgICAgICB0aGlzLmxhdW5jaFJlcXVlc3RzLmxhdW5jaFJlcXVlc3RzKHtcbiAgICAgICAgICB1cGRhdGVJc1JlcXVlc3RzTW9kYWxWaXNpYmxlOiB0aGlzLnVwZGF0ZUlzUmVxdWVzdHNNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcbiAgICAgICAgICBpc1JlcXVlc3RzTW9kYWxWaXNpYmxlOiB0aGlzLmlzUmVxdWVzdHNNb2RhbFZpc2libGUudmFsdWUsXG4gICAgICAgIH0pLFxuICAgICAgc2hvdzogKCkgPT5cbiAgICAgICAgdGhpcy5pc2xldmVsLnZhbHVlID09ICcyJyB8fFxuICAgICAgICAoKHRoaXMuY29Ib3N0UmVzcG9uc2liaWxpdHkudmFsdWUgJiZcbiAgICAgICAgICB0aGlzLmNvSG9zdC52YWx1ZSAmJlxuICAgICAgICAgIHRoaXMuY29Ib3N0LnZhbHVlID09PSB0aGlzLm1lbWJlci52YWx1ZSAmJlxuICAgICAgICAgICEhdGhpcy5jb0hvc3RSZXNwb25zaWJpbGl0eT8udmFsdWU/LmZpbmQoKGl0ZW0pID0+IGl0ZW0ubmFtZSA9PT0gJ21lZGlhJyk/LnZhbHVlKSA/P1xuICAgICAgICAgIGZhbHNlKSB8fFxuICAgICAgICBmYWxzZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGljb246IHRoaXMuZmFDbG9jayxcbiAgICAgIHRleHQ6ICdXYWl0aW5nJyxcbiAgICAgIGFjdGlvbjogKCkgPT5cbiAgICAgICAgdGhpcy5sYXVuY2hXYWl0aW5nLmxhdW5jaFdhaXRpbmcoe1xuICAgICAgICAgIHVwZGF0ZUlzV2FpdGluZ01vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc1dhaXRpbmdNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcbiAgICAgICAgICBpc1dhaXRpbmdNb2RhbFZpc2libGU6IHRoaXMuaXNXYWl0aW5nTW9kYWxWaXNpYmxlLnZhbHVlLFxuICAgICAgICB9KSxcbiAgICAgIHNob3c6ICgpID0+XG4gICAgICAgIHRoaXMuaXNsZXZlbC52YWx1ZSA9PSAnMicgfHxcbiAgICAgICAgKHRoaXMuY29Ib3N0UmVzcG9uc2liaWxpdHkudmFsdWUgJiZcbiAgICAgICAgICB0aGlzLmNvSG9zdC52YWx1ZSAmJlxuICAgICAgICAgIHRoaXMuY29Ib3N0LnZhbHVlID09PSB0aGlzLm1lbWJlci52YWx1ZSAmJlxuICAgICAgICAgIHRoaXMuY29Ib3N0UmVzcG9uc2liaWxpdHk/LnZhbHVlPy5maW5kKChpdGVtKSA9PiBpdGVtLm5hbWUgPT09ICd3YWl0aW5nJyk/LnZhbHVlID09PVxuICAgICAgICAgICAgdHJ1ZSkgfHxcbiAgICAgICAgZmFsc2UsXG4gICAgfSxcbiAgICB7XG4gICAgICBpY29uOiB0aGlzLmZhVXNlclBsdXMsXG4gICAgICB0ZXh0OiAnQ28taG9zdCcsXG4gICAgICBhY3Rpb246ICgpID0+XG4gICAgICAgIHRoaXMubGF1bmNoQ29Ib3N0LmxhdW5jaENvSG9zdCh7XG4gICAgICAgICAgdXBkYXRlSXNDb0hvc3RNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNDb0hvc3RNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcbiAgICAgICAgICBpc0NvSG9zdE1vZGFsVmlzaWJsZTogdGhpcy5pc0NvSG9zdE1vZGFsVmlzaWJsZS52YWx1ZSxcbiAgICAgICAgfSksXG4gICAgICBzaG93OiAoKSA9PiB0aGlzLmlzbGV2ZWwudmFsdWUgPT0gJzInLFxuICAgIH0sXG4gICAge1xuICAgICAgaWNvbjogdGhpcy5mYVRvb2xzLFxuICAgICAgdGV4dDogJ1NldCBNZWRpYScsXG4gICAgICBhY3Rpb246ICgpID0+XG4gICAgICAgIHRoaXMubGF1bmNoTWVkaWFTZXR0aW5ncy5sYXVuY2hNZWRpYVNldHRpbmdzKHtcbiAgICAgICAgICB1cGRhdGVJc01lZGlhU2V0dGluZ3NNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNNZWRpYVNldHRpbmdzTW9kYWxWaXNpYmxlLmJpbmQodGhpcyksXG4gICAgICAgICAgaXNNZWRpYVNldHRpbmdzTW9kYWxWaXNpYmxlOiB0aGlzLmlzTWVkaWFTZXR0aW5nc01vZGFsVmlzaWJsZS52YWx1ZSxcbiAgICAgICAgICBhdWRpb0lucHV0czogdGhpcy5hdWRpb0lucHV0cy52YWx1ZSxcbiAgICAgICAgICB2aWRlb0lucHV0czogdGhpcy52aWRlb0lucHV0cy52YWx1ZSxcbiAgICAgICAgICB1cGRhdGVBdWRpb0lucHV0czogdGhpcy51cGRhdGVBdWRpb0lucHV0cy5iaW5kKHRoaXMpLFxuICAgICAgICAgIHVwZGF0ZVZpZGVvSW5wdXRzOiB0aGlzLnVwZGF0ZVZpZGVvSW5wdXRzLmJpbmQodGhpcyksXG4gICAgICAgIH0pLFxuICAgICAgc2hvdzogKCkgPT4gdHJ1ZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGljb246IHRoaXMuZmFEZXNrdG9wLFxuICAgICAgdGV4dDogJ0Rpc3BsYXknLFxuICAgICAgYWN0aW9uOiAoKSA9PlxuICAgICAgICB0aGlzLmxhdW5jaERpc3BsYXlTZXR0aW5ncy5sYXVuY2hEaXNwbGF5U2V0dGluZ3Moe1xuICAgICAgICAgIHVwZGF0ZUlzRGlzcGxheVNldHRpbmdzTW9kYWxWaXNpYmxlOiB0aGlzLnVwZGF0ZUlzRGlzcGxheVNldHRpbmdzTW9kYWxWaXNpYmxlLmJpbmQodGhpcyksXG4gICAgICAgICAgaXNEaXNwbGF5U2V0dGluZ3NNb2RhbFZpc2libGU6IHRoaXMuaXNEaXNwbGF5U2V0dGluZ3NNb2RhbFZpc2libGUudmFsdWUsXG4gICAgICAgIH0pLFxuICAgICAgc2hvdzogKCkgPT4gdHJ1ZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGljb246IHRoaXMuZmFQb2xsLFxuICAgICAgdGV4dDogJ1BvbGwnLFxuICAgICAgYWN0aW9uOiAoKSA9PlxuICAgICAgICB0aGlzLmxhdW5jaFBvbGwubGF1bmNoUG9sbCh7XG4gICAgICAgICAgdXBkYXRlSXNQb2xsTW9kYWxWaXNpYmxlOiB0aGlzLnVwZGF0ZUlzUG9sbE1vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuICAgICAgICAgIGlzUG9sbE1vZGFsVmlzaWJsZTogdGhpcy5pc1BvbGxNb2RhbFZpc2libGUudmFsdWUsXG4gICAgICAgIH0pLFxuICAgICAgc2hvdzogKCkgPT4gdHJ1ZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGljb246IHRoaXMuZmFVc2VyRnJpZW5kcyxcbiAgICAgIHRleHQ6ICdCcmVha291dCBSb29tcycsXG4gICAgICBhY3Rpb246ICgpID0+XG4gICAgICAgIHRoaXMubGF1bmNoQnJlYWtvdXRSb29tcy5sYXVuY2hCcmVha291dFJvb21zKHtcbiAgICAgICAgICB1cGRhdGVJc0JyZWFrb3V0Um9vbXNNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNCcmVha291dFJvb21zTW9kYWxWaXNpYmxlLmJpbmQodGhpcyksXG4gICAgICAgICAgaXNCcmVha291dFJvb21zTW9kYWxWaXNpYmxlOiB0aGlzLmlzQnJlYWtvdXRSb29tc01vZGFsVmlzaWJsZS52YWx1ZSxcbiAgICAgICAgfSksXG4gICAgICBzaG93OiAoKSA9PiB0aGlzLmlzbGV2ZWwudmFsdWUgPT0gJzInLFxuICAgIH0sXG4gICAge1xuICAgICAgaWNvbjogdGhpcy5mYUNoYWxrYm9hcmRUZWFjaGVyLFxuICAgICAgdGV4dDogJ1doaXRlYm9hcmQnLFxuICAgICAgYWN0aW9uOiAoKSA9PlxuICAgICAgICB0aGlzLmxhdW5jaENvbmZpZ3VyZVdoaXRlYm9hcmQubGF1bmNoQ29uZmlndXJlV2hpdGVib2FyZCh7XG4gICAgICAgICAgdXBkYXRlSXNDb25maWd1cmVXaGl0ZWJvYXJkTW9kYWxWaXNpYmxlOlxuICAgICAgICAgICAgdGhpcy51cGRhdGVJc0NvbmZpZ3VyZVdoaXRlYm9hcmRNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcbiAgICAgICAgICBpc0NvbmZpZ3VyZVdoaXRlYm9hcmRNb2RhbFZpc2libGU6IHRoaXMuaXNDb25maWd1cmVXaGl0ZWJvYXJkTW9kYWxWaXNpYmxlLnZhbHVlLFxuICAgICAgICB9KSxcbiAgICAgIHNob3c6ICgpID0+IHRoaXMuaXNsZXZlbC52YWx1ZSA9PSAnMicsXG4gICAgfSxcbiAgXTtcblxuICBjdXN0b21NZW51QnV0dG9uczogTWFpbkN1c3RvbUJ1dHRvbltdID0gW107XG5cbiAgdXBkYXRlQ3VzdG9tTWVudUJ1dHRvbnMoKSB7XG4gICAgdGhpcy5jdXN0b21NZW51QnV0dG9ucyA9IHRoaXMuY3VzdG9tTWVudUJ1dHRvbnNBcnJheS5tYXAoKGJ1dHRvbikgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uYnV0dG9uLFxuICAgICAgICBzaG93OiB0eXBlb2YgYnV0dG9uLnNob3cgPT09ICdmdW5jdGlvbicgPyBidXR0b24uc2hvdygpIDogYnV0dG9uLnNob3csXG4gICAgICAgIGN1c3RvbUNvbXBvbmVudDogYnV0dG9uLmN1c3RvbUNvbXBvbmVudFxuICAgICAgICAgID8gdHlwZW9mIGJ1dHRvbi5jdXN0b21Db21wb25lbnQgPT09ICdmdW5jdGlvbidcbiAgICAgICAgICAgID8gYnV0dG9uLmN1c3RvbUNvbXBvbmVudCgpXG4gICAgICAgICAgICA6IGJ1dHRvbi5jdXN0b21Db21wb25lbnRcbiAgICAgICAgICA6IHVuZGVmaW5lZCxcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBzY3JlZW5TaGFyZVdpZGdldCA9IHtcbiAgICBjb21wb25lbnQ6IFNjcmVlblNoYXJlV2lkZ2V0LFxuICAgIGluamVjdG9yOiB0aGlzLmNyZWF0ZUluamVjdG9yKHsgZGlzYWJsZWQ6ICF0aGlzLnNjcmVlblNoYXJlQWN0aXZlLnZhbHVlIH0pLFxuICB9O1xuXG4gIGNvbnRyb2xCdXR0b25zID0gW1xuICAgIHtcbiAgICAgIGljb246IHRoaXMuZmFNaWNyb3Bob25lU2xhc2gsXG4gICAgICBhbHRlcm5hdGVJY29uOiB0aGlzLmZhTWljcm9waG9uZSxcbiAgICAgIGFjdGl2ZTogdGhpcy5taWNBY3RpdmUudmFsdWUsXG4gICAgICBvblByZXNzOiAoKSA9PlxuICAgICAgICB0aGlzLmNsaWNrQXVkaW8uY2xpY2tBdWRpbyh7XG4gICAgICAgICAgcGFyYW1ldGVyczoge1xuICAgICAgICAgICAgLi4udGhpcy5nZXRBbGxQYXJhbXMoKSxcbiAgICAgICAgICAgIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KSxcbiAgICAgIGFjdGl2ZUNvbG9yOiAnZ3JlZW4nLFxuICAgICAgaW5BY3RpdmVDb2xvcjogJ3JlZCcsXG4gICAgICBkaXNhYmxlZDogdGhpcy5hdWRpb1N3aXRjaGluZy52YWx1ZSxcbiAgICAgIHNob3c6IHRydWUsXG4gICAgfSxcbiAgICB7XG4gICAgICBpY29uOiB0aGlzLmZhVmlkZW9TbGFzaCxcbiAgICAgIGFsdGVybmF0ZUljb246IHRoaXMuZmFWaWRlbyxcbiAgICAgIGFjdGl2ZTogdGhpcy52aWRlb0FjdGl2ZS52YWx1ZSxcbiAgICAgIG9uUHJlc3M6ICgpID0+XG4gICAgICAgIHRoaXMuY2xpY2tWaWRlby5jbGlja1ZpZGVvKHtcbiAgICAgICAgICBwYXJhbWV0ZXJzOiB7XG4gICAgICAgICAgICAuLi50aGlzLmdldEFsbFBhcmFtcygpLFxuICAgICAgICAgICAgLi4udGhpcy5tZWRpYVNGVUZ1bmN0aW9ucygpLFxuICAgICAgICAgICAgTWVkaWFTdHJlYW0sXG4gICAgICAgICAgICBNZWRpYVN0cmVhbVRyYWNrLFxuICAgICAgICAgICAgbWVkaWFEZXZpY2VzOiBNZWRpYURldmljZXMsXG4gICAgICAgICAgICBkZXZpY2U6IHRoaXMuZGV2aWNlLnZhbHVlLFxuICAgICAgICAgICAgc29ja2V0OiB0aGlzLnNvY2tldC52YWx1ZSxcbiAgICAgICAgICAgIHNob3dBbGVydDogdGhpcy5zaG93QWxlcnQuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIGNoZWNrUGVybWlzc2lvbjogdGhpcy5jaGVja1Blcm1pc3Npb24uY2hlY2tQZXJtaXNzaW9uLFxuICAgICAgICAgICAgc3RyZWFtU3VjY2Vzc1ZpZGVvOiB0aGlzLnN0cmVhbVN1Y2Nlc3NWaWRlby5zdHJlYW1TdWNjZXNzVmlkZW8sXG4gICAgICAgICAgICBoYXNDYW1lcmFQZXJtaXNzaW9uOiB0aGlzLmhhc0NhbWVyYVBlcm1pc3Npb24udmFsdWUsXG4gICAgICAgICAgICByZXF1ZXN0UGVybWlzc2lvbkNhbWVyYTogdGhpcy5yZXF1ZXN0UGVybWlzc2lvbkNhbWVyYS5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgY2hlY2tNZWRpYVBlcm1pc3Npb246ICd3ZWInICE9PSAnd2ViJyxcbiAgICAgICAgICB9LFxuICAgICAgICB9KSxcbiAgICAgIGFjdGl2ZUNvbG9yOiAnZ3JlZW4nLFxuICAgICAgaW5BY3RpdmVDb2xvcjogJ3JlZCcsXG4gICAgICBkaXNhYmxlZDogdGhpcy52aWRlb1N3aXRjaGluZy52YWx1ZSxcbiAgICAgIHNob3c6IHRydWUsXG4gICAgfSxcbiAgICB7XG4gICAgICAvL2ludmVydGVkIGFjdGl2ZSBmb3IgaW5hY3RpdmUgc3RhdGVcbiAgICAgIGljb246IGZhRGVza3RvcCxcbiAgICAgIGFsdGVybmF0ZUljb25Db21wb25lbnQ6IHRoaXMuc2NyZWVuU2hhcmVXaWRnZXQsXG4gICAgICBhY3RpdmU6IHRydWUsXG4gICAgICBvblByZXNzOiAoKSA9PlxuICAgICAgICB0aGlzLmNsaWNrU2NyZWVuU2hhcmUuY2xpY2tTY3JlZW5TaGFyZSh7XG4gICAgICAgICAgcGFyYW1ldGVyczoge1xuICAgICAgICAgICAgLi4udGhpcy5nZXRBbGxQYXJhbXMoKSxcbiAgICAgICAgICAgIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KSxcbiAgICAgIGFjdGl2ZUNvbG9yOiAnZ3JlZW4nLFxuICAgICAgaW5BY3RpdmVDb2xvcjogJ3JlZCcsXG4gICAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgICBzaG93OiB0cnVlLFxuICAgIH0sXG4gICAge1xuICAgICAgaWNvbjogdGhpcy5mYVBob25lLFxuICAgICAgYWN0aXZlOiB0aGlzLmVuZENhbGxBY3RpdmUudmFsdWUsXG4gICAgICBvblByZXNzOiAoKSA9PlxuICAgICAgICB0aGlzLmxhdW5jaENvbmZpcm1FeGl0LmxhdW5jaENvbmZpcm1FeGl0KHtcbiAgICAgICAgICB1cGRhdGVJc0NvbmZpcm1FeGl0TW9kYWxWaXNpYmxlOiB0aGlzLnVwZGF0ZUlzQ29uZmlybUV4aXRNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcbiAgICAgICAgICBpc0NvbmZpcm1FeGl0TW9kYWxWaXNpYmxlOiB0aGlzLmlzQ29uZmlybUV4aXRNb2RhbFZpc2libGUudmFsdWUsXG4gICAgICAgIH0pLFxuICAgICAgYWN0aXZlQ29sb3I6ICdncmVlbicsXG4gICAgICBpbkFjdGl2ZUNvbG9yOiAncmVkJyxcbiAgICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICAgIHNob3c6IHRydWUsXG4gICAgfSxcbiAgICB7XG4gICAgICBpY29uOiB0aGlzLmZhVXNlcnMsXG4gICAgICBhY3RpdmU6IHRoaXMucGFydGljaXBhbnRzQWN0aXZlLnZhbHVlLFxuICAgICAgb25QcmVzczogKCkgPT5cbiAgICAgICAgdGhpcy5sYXVuY2hQYXJ0aWNpcGFudHMubGF1bmNoUGFydGljaXBhbnRzKHtcbiAgICAgICAgICB1cGRhdGVJc1BhcnRpY2lwYW50c01vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc1BhcnRpY2lwYW50c01vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuICAgICAgICAgIGlzUGFydGljaXBhbnRzTW9kYWxWaXNpYmxlOiB0aGlzLmlzUGFydGljaXBhbnRzTW9kYWxWaXNpYmxlLnZhbHVlLFxuICAgICAgICB9KSxcbiAgICAgIGFjdGl2ZUNvbG9yOiAnYmxhY2snLFxuICAgICAgaW5BY3RpdmVDb2xvcjogJ2JsYWNrJyxcbiAgICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICAgIHNob3c6IHRydWUsXG4gICAgfSxcbiAgICB7XG4gICAgICBjdXN0b21Db21wb25lbnQ6IHRoaXMubWVudVdpZGdldCxcbiAgICAgIGN1c3RvbU5hbWU6ICdNZW51JyxcbiAgICAgIG9uUHJlc3M6ICgpID0+XG4gICAgICAgIHRoaXMubGF1bmNoTWVudU1vZGFsLmxhdW5jaE1lbnVNb2RhbCh7XG4gICAgICAgICAgdXBkYXRlSXNNZW51TW9kYWxWaXNpYmxlOiB0aGlzLnVwZGF0ZUlzTWVudU1vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuICAgICAgICAgIGlzTWVudU1vZGFsVmlzaWJsZTogdGhpcy5pc01lbnVNb2RhbFZpc2libGUudmFsdWUsXG4gICAgICAgIH0pLFxuICAgICAgc2hvdzogdHJ1ZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGN1c3RvbUNvbXBvbmVudDogdGhpcy5tZXNzYWdlV2lkZ2V0LFxuICAgICAgY3VzdG9tTmFtZTogJ01lc3NhZ2VzJyxcbiAgICAgIG9uUHJlc3M6ICgpID0+XG4gICAgICAgIHRoaXMubGF1bmNoTWVzc2FnZXMubGF1bmNoTWVzc2FnZXMoe1xuICAgICAgICAgIHVwZGF0ZUlzTWVzc2FnZXNNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNNZXNzYWdlc01vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuICAgICAgICAgIGlzTWVzc2FnZXNNb2RhbFZpc2libGU6IHRoaXMuaXNNZXNzYWdlc01vZGFsVmlzaWJsZS52YWx1ZSxcbiAgICAgICAgfSksXG4gICAgICBzaG93OiB0cnVlLFxuICAgIH0sXG4gIF07XG5cbiAgYXN5bmMgY29ubmVjdF9Tb2NrZXQoXG4gICAgYXBpVXNlck5hbWU6IHN0cmluZyxcbiAgICBhcGlLZXk6IHN0cmluZyxcbiAgICBhcGlUb2tlbjogc3RyaW5nLFxuICApOiBQcm9taXNlPFNvY2tldCB8IG51bGw+IHtcbiAgICBpZiAodGhpcy5zb2NrZXQudmFsdWUgJiYgdGhpcy5zb2NrZXQudmFsdWUuaWQpIHtcbiAgICAgIHRoaXMuc29ja2V0LnZhbHVlLm9uKCdkaXNjb25uZWN0JywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBhd2FpdCB0aGlzLmRpc2Nvbm5lY3QuZGlzY29ubmVjdCh7XG4gICAgICAgICAgc2hvd0FsZXJ0OiB0aGlzLnNob3dBbGVydC5iaW5kKHRoaXMpLFxuICAgICAgICAgIHJlZGlyZWN0VVJMOiB0aGlzLnJlZGlyZWN0VVJMLnZhbHVlLFxuICAgICAgICAgIG9uV2ViOiB0cnVlLFxuICAgICAgICAgIHVwZGF0ZVZhbGlkYXRlZDogdGhpcy51cGRhdGVWYWxpZGF0ZWQuYmluZCh0aGlzKSxcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh0aGlzLnZpZGVvQWxyZWFkeU9uLnZhbHVlKSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5jbGlja1ZpZGVvLmNsaWNrVmlkZW8oe1xuICAgICAgICAgICAgcGFyYW1ldGVyczogeyAuLi50aGlzLmdldEFsbFBhcmFtcygpLCAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCkgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5hdWRpb0FscmVhZHlPbi52YWx1ZSkge1xuICAgICAgICAgIGF3YWl0IHRoaXMuY2xpY2tBdWRpby5jbGlja0F1ZGlvKHtcbiAgICAgICAgICAgIHBhcmFtZXRlcnM6IHsgLi4udGhpcy5nZXRBbGxQYXJhbXMoKSwgLi4udGhpcy5tZWRpYVNGVUZ1bmN0aW9ucygpIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBhd2FpdCB0aGlzLmNsb3NlQW5kUmVzZXQoKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnNvY2tldC52YWx1ZS5vbignYWxsTWVtYmVycycsIGFzeW5jIChtZW1iZXJzRGF0YTogQWxsTWVtYmVyc0RhdGEpID0+IHtcbiAgICAgICAgaWYgKG1lbWJlcnNEYXRhKSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5hbGxNZW1iZXJzLmFsbE1lbWJlcnMoe1xuICAgICAgICAgICAgYXBpVXNlck5hbWU6IGFwaVVzZXJOYW1lLFxuICAgICAgICAgICAgYXBpS2V5OiAnJywgLy9ub3QgcmVjb21tZW5kZWQgLSB1c2UgYXBpVG9rZW4gaW5zdGVhZC4gVXNlIGZvciB0ZXN0aW5nL2RldmVsb3BtZW50IG9ubHlcbiAgICAgICAgICAgIGFwaVRva2VuOiBhcGlUb2tlbixcbiAgICAgICAgICAgIG1lbWJlcnM6IG1lbWJlcnNEYXRhLm1lbWJlcnMsXG4gICAgICAgICAgICByZXF1ZXN0c3M6IG1lbWJlcnNEYXRhLnJlcXVlc3RzID8gbWVtYmVyc0RhdGEucmVxdWVzdHMgOiB0aGlzLnJlcXVlc3RMaXN0LnZhbHVlLFxuICAgICAgICAgICAgY29Ib3N0ZTogbWVtYmVyc0RhdGEuY29Ib3N0ID8gbWVtYmVyc0RhdGEuY29Ib3N0IDogdGhpcy5jb0hvc3QudmFsdWUsXG4gICAgICAgICAgICBjb0hvc3RSZXM6IG1lbWJlcnNEYXRhLmNvSG9zdFJlc3BvbnNpYmlsaXRpZXNcbiAgICAgICAgICAgICAgPyBtZW1iZXJzRGF0YS5jb0hvc3RSZXNwb25zaWJpbGl0aWVzXG4gICAgICAgICAgICAgIDogdGhpcy5jb0hvc3RSZXNwb25zaWJpbGl0eS52YWx1ZSxcbiAgICAgICAgICAgIHBhcmFtZXRlcnM6IHsgLi4udGhpcy5nZXRBbGxQYXJhbXMoKSwgLi4udGhpcy5tZWRpYVNGVUZ1bmN0aW9ucygpIH0sXG4gICAgICAgICAgICBjb25zdW1lX3NvY2tldHM6IHRoaXMuY29uc3VtZV9zb2NrZXRzLnZhbHVlLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5zb2NrZXQudmFsdWUub24oJ2FsbE1lbWJlcnNSZXN0JywgYXN5bmMgKG1lbWJlcnNEYXRhOiBBbGxNZW1iZXJzUmVzdERhdGEpID0+IHtcbiAgICAgICAgaWYgKG1lbWJlcnNEYXRhKSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5hbGxNZW1iZXJzUmVzdC5hbGxNZW1iZXJzUmVzdCh7XG4gICAgICAgICAgICBhcGlVc2VyTmFtZTogYXBpVXNlck5hbWUsXG4gICAgICAgICAgICBhcGlLZXk6ICcnLCAvLyBub3QgcmVjb21tZW5kZWQgLSB1c2UgYXBpVG9rZW4gaW5zdGVhZC4gVXNlIGZvciB0ZXN0aW5nL2RldmVsb3BtZW50IG9ubHlcbiAgICAgICAgICAgIG1lbWJlcnM6IG1lbWJlcnNEYXRhLm1lbWJlcnMsXG4gICAgICAgICAgICBhcGlUb2tlbjogYXBpVG9rZW4sXG4gICAgICAgICAgICBzZXR0aW5nczogbWVtYmVyc0RhdGEuc2V0dGluZ3MsXG4gICAgICAgICAgICBjb0hvc3RlOiBtZW1iZXJzRGF0YS5jb0hvc3QgPyBtZW1iZXJzRGF0YS5jb0hvc3QgOiB0aGlzLmNvSG9zdC52YWx1ZSxcbiAgICAgICAgICAgIGNvSG9zdFJlczogbWVtYmVyc0RhdGEuY29Ib3N0UmVzcG9uc2liaWxpdGllc1xuICAgICAgICAgICAgICA/IG1lbWJlcnNEYXRhLmNvSG9zdFJlc3BvbnNpYmlsaXRpZXNcbiAgICAgICAgICAgICAgOiB0aGlzLmNvSG9zdFJlc3BvbnNpYmlsaXR5LnZhbHVlLFxuICAgICAgICAgICAgcGFyYW1ldGVyczogeyAuLi50aGlzLmdldEFsbFBhcmFtcygpLCAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCkgfSxcbiAgICAgICAgICAgIGNvbnN1bWVfc29ja2V0czogdGhpcy5jb25zdW1lX3NvY2tldHMudmFsdWUsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnNvY2tldC52YWx1ZS5vbigndXNlcldhaXRpbmcnLCBhc3luYyAoeyBuYW1lIH06IHsgbmFtZTogc3RyaW5nIH0pID0+IHtcbiAgICAgICAgYXdhaXQgdGhpcy51c2VyV2FpdGluZy51c2VyV2FpdGluZyh7XG4gICAgICAgICAgbmFtZSxcbiAgICAgICAgICBzaG93QWxlcnQ6IHRoaXMuc2hvd0FsZXJ0LmJpbmQodGhpcyksXG4gICAgICAgICAgdG90YWxSZXFXYWl0OiB0aGlzLnRvdGFsUmVxV2FpdC52YWx1ZSxcbiAgICAgICAgICB1cGRhdGVUb3RhbFJlcVdhaXQ6IHRoaXMudXBkYXRlVG90YWxSZXFXYWl0LmJpbmQodGhpcyksXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuc29ja2V0LnZhbHVlLm9uKCdwZXJzb25Kb2luZWQnLCBhc3luYyAoeyBuYW1lIH06IHsgbmFtZTogc3RyaW5nIH0pID0+IHtcbiAgICAgICAgdGhpcy5wZXJzb25Kb2luZWQucGVyc29uSm9pbmVkKHtcbiAgICAgICAgICBuYW1lLFxuICAgICAgICAgIHNob3dBbGVydDogdGhpcy5zaG93QWxlcnQuYmluZCh0aGlzKSxcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5zb2NrZXQudmFsdWUub24oXG4gICAgICAgICdhbGxXYWl0aW5nUm9vbU1lbWJlcnMnLFxuICAgICAgICBhc3luYyAod2FpdGluZ19kYXRhOiBBbGxXYWl0aW5nUm9vbU1lbWJlcnNEYXRhKSA9PiB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5hbGxXYWl0aW5nUm9vbU1lbWJlcnMuYWxsV2FpdGluZ1Jvb21NZW1iZXJzKHtcbiAgICAgICAgICAgIHdhaXRpbmdQYXJ0aWNpcGFudHM6IHdhaXRpbmdfZGF0YS53YWl0aW5nUGFydGljaXBhbnRzXG4gICAgICAgICAgICAgID8gd2FpdGluZ19kYXRhLndhaXRpbmdQYXJ0aWNpcGFudHNcbiAgICAgICAgICAgICAgOiB3YWl0aW5nX2RhdGEud2FpdGluZ1BhcnRpY2lwYW50c3NcbiAgICAgICAgICAgICAgPyB3YWl0aW5nX2RhdGEud2FpdGluZ1BhcnRpY2lwYW50c3NcbiAgICAgICAgICAgICAgOiB0aGlzLndhaXRpbmdSb29tTGlzdC52YWx1ZSxcbiAgICAgICAgICAgIHVwZGF0ZVRvdGFsUmVxV2FpdDogdGhpcy51cGRhdGVUb3RhbFJlcVdhaXQuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIHVwZGF0ZVdhaXRpbmdSb29tTGlzdDogdGhpcy51cGRhdGVXYWl0aW5nUm9vbUxpc3QuYmluZCh0aGlzKSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICk7XG5cbiAgICAgIHRoaXMuc29ja2V0LnZhbHVlLm9uKFxuICAgICAgICAncm9vbVJlY29yZFBhcmFtcycsXG4gICAgICAgIGFzeW5jICh7IHJlY29yZFBhcmFtcyB9OiB7IHJlY29yZFBhcmFtczogUmVjb3JkUGFyYW1zIH0pID0+IHtcbiAgICAgICAgICB0aGlzLnJvb21SZWNvcmRQYXJhbXMucm9vbVJlY29yZFBhcmFtcyh7XG4gICAgICAgICAgICByZWNvcmRQYXJhbXMsXG4gICAgICAgICAgICBwYXJhbWV0ZXJzOiB7IC4uLnRoaXMuZ2V0QWxsUGFyYW1zKCksIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgKTtcblxuICAgICAgdGhpcy5zb2NrZXQudmFsdWUub24oJ2JhbicsIGFzeW5jICh7IG5hbWUgfTogeyBuYW1lOiBzdHJpbmcgfSkgPT4ge1xuICAgICAgICBhd2FpdCB0aGlzLmJhblBhcnRpY2lwYW50LmJhblBhcnRpY2lwYW50KHtcbiAgICAgICAgICBuYW1lLFxuICAgICAgICAgIHBhcmFtZXRlcnM6IHsgLi4udGhpcy5nZXRBbGxQYXJhbXMoKSwgLi4udGhpcy5tZWRpYVNGVUZ1bmN0aW9ucygpIH0sXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuc29ja2V0LnZhbHVlLm9uKCd1cGRhdGVkQ29Ib3N0JywgYXN5bmMgKGNvaG9zdF9kYXRhOiBVcGRhdGVkQ29Ib3N0RGF0YSkgPT4ge1xuICAgICAgICBhd2FpdCB0aGlzLnVwZGF0ZWRDb0hvc3QudXBkYXRlZENvSG9zdCh7XG4gICAgICAgICAgY29Ib3N0OiBjb2hvc3RfZGF0YS5jb0hvc3QgPyBjb2hvc3RfZGF0YS5jb0hvc3QgOiB0aGlzLmNvSG9zdC52YWx1ZSxcbiAgICAgICAgICBjb0hvc3RSZXNwb25zaWJpbGl0eTogY29ob3N0X2RhdGEuY29Ib3N0UmVzcG9uc2liaWxpdGllc1xuICAgICAgICAgICAgPyBjb2hvc3RfZGF0YS5jb0hvc3RSZXNwb25zaWJpbGl0aWVzXG4gICAgICAgICAgICA6IHRoaXMuY29Ib3N0UmVzcG9uc2liaWxpdHkudmFsdWUsXG4gICAgICAgICAgeW91QXJlQ29Ib3N0OiB0aGlzLnlvdUFyZUNvSG9zdC52YWx1ZSxcbiAgICAgICAgICB1cGRhdGVDb0hvc3Q6IHRoaXMudXBkYXRlQ29Ib3N0LmJpbmQodGhpcyksXG4gICAgICAgICAgdXBkYXRlQ29Ib3N0UmVzcG9uc2liaWxpdHk6IHRoaXMudXBkYXRlQ29Ib3N0UmVzcG9uc2liaWxpdHkuYmluZCh0aGlzKSxcbiAgICAgICAgICB1cGRhdGVZb3VBcmVDb0hvc3Q6IHRoaXMudXBkYXRlWW91QXJlQ29Ib3N0LmJpbmQodGhpcyksXG4gICAgICAgICAgc2hvd0FsZXJ0OiB0aGlzLnNob3dBbGVydC5iaW5kKHRoaXMpLFxuICAgICAgICAgIGV2ZW50VHlwZTogdGhpcy5ldmVudFR5cGUudmFsdWUsXG4gICAgICAgICAgaXNsZXZlbDogdGhpcy5pc2xldmVsLnZhbHVlLFxuICAgICAgICAgIG1lbWJlcjogdGhpcy5tZW1iZXIudmFsdWUsXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuc29ja2V0LnZhbHVlLm9uKFxuICAgICAgICAncGFydGljaXBhbnRSZXF1ZXN0ZWQnLFxuICAgICAgICBhc3luYyAoeyB1c2VyUmVxdWVzdCB9OiB7IHVzZXJSZXF1ZXN0OiBSZXF1ZXN0IH0pID0+IHtcbiAgICAgICAgICBhd2FpdCB0aGlzLnBhcnRpY2lwYW50UmVxdWVzdGVkLnBhcnRpY2lwYW50UmVxdWVzdGVkKHtcbiAgICAgICAgICAgIHVzZXJSZXF1ZXN0LFxuICAgICAgICAgICAgcmVxdWVzdExpc3Q6IHRoaXMucmVxdWVzdExpc3QudmFsdWUsXG4gICAgICAgICAgICB3YWl0aW5nUm9vbUxpc3Q6IHRoaXMud2FpdGluZ1Jvb21MaXN0LnZhbHVlLFxuICAgICAgICAgICAgdXBkYXRlVG90YWxSZXFXYWl0OiB0aGlzLnVwZGF0ZVRvdGFsUmVxV2FpdC5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgdXBkYXRlUmVxdWVzdExpc3Q6IHRoaXMudXBkYXRlUmVxdWVzdExpc3QuYmluZCh0aGlzKSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICk7XG5cbiAgICAgIHRoaXMuc29ja2V0LnZhbHVlLm9uKCdzY3JlZW5Qcm9kdWNlcklkJywgYXN5bmMgKHsgcHJvZHVjZXJJZCB9OiB7IHByb2R1Y2VySWQ6IHN0cmluZyB9KSA9PiB7XG4gICAgICAgIHRoaXMuc2NyZWVuUHJvZHVjZXJJZC5zY3JlZW5Qcm9kdWNlcklkKHtcbiAgICAgICAgICBwcm9kdWNlcklkLFxuICAgICAgICAgIHNjcmVlbklkOiB0aGlzLnNjcmVlbklkLnZhbHVlLFxuICAgICAgICAgIG1lbWJlcnNSZWNlaXZlZDogdGhpcy5tZW1iZXJzUmVjZWl2ZWQudmFsdWUsXG4gICAgICAgICAgc2hhcmVTY3JlZW5TdGFydGVkOiB0aGlzLnNoYXJlU2NyZWVuU3RhcnRlZC52YWx1ZSxcbiAgICAgICAgICBkZWZlclNjcmVlblJlY2VpdmVkOiB0aGlzLmRlZmVyU2NyZWVuUmVjZWl2ZWQudmFsdWUsXG4gICAgICAgICAgcGFydGljaXBhbnRzOiB0aGlzLnBhcnRpY2lwYW50cy52YWx1ZSxcbiAgICAgICAgICB1cGRhdGVTY3JlZW5JZDogdGhpcy51cGRhdGVTY3JlZW5JZC5iaW5kKHRoaXMpLFxuICAgICAgICAgIHVwZGF0ZVNoYXJlU2NyZWVuU3RhcnRlZDogdGhpcy51cGRhdGVTaGFyZVNjcmVlblN0YXJ0ZWQuYmluZCh0aGlzKSxcbiAgICAgICAgICB1cGRhdGVEZWZlclNjcmVlblJlY2VpdmVkOiB0aGlzLnVwZGF0ZURlZmVyU2NyZWVuUmVjZWl2ZWQuYmluZCh0aGlzKSxcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIC8vc2V0dGluZ3MsIHVwZGF0ZUF1ZGlvU2V0dGluZywgdXBkYXRlVmlkZW9TZXR0aW5nLCB1cGRhdGVTY3JlZW5zaGFyZVNldHRpbmcsIHVwZGF0ZUNoYXRTZXR0aW5nXG4gICAgICB0aGlzLnNvY2tldC52YWx1ZS5vbigndXBkYXRlTWVkaWFTZXR0aW5ncycsIGFzeW5jICh7IHNldHRpbmdzIH06IHsgc2V0dGluZ3M6IFNldHRpbmdzIH0pID0+IHtcbiAgICAgICAgdGhpcy51cGRhdGVNZWRpYVNldHRpbmdzLnVwZGF0ZU1lZGlhU2V0dGluZ3Moe1xuICAgICAgICAgIHNldHRpbmdzLFxuICAgICAgICAgIHVwZGF0ZUF1ZGlvU2V0dGluZzogdGhpcy51cGRhdGVBdWRpb1NldHRpbmcuYmluZCh0aGlzKSxcbiAgICAgICAgICB1cGRhdGVWaWRlb1NldHRpbmc6IHRoaXMudXBkYXRlVmlkZW9TZXR0aW5nLmJpbmQodGhpcyksXG4gICAgICAgICAgdXBkYXRlU2NyZWVuc2hhcmVTZXR0aW5nOiB0aGlzLnVwZGF0ZVNjcmVlbnNoYXJlU2V0dGluZy5iaW5kKHRoaXMpLFxuICAgICAgICAgIHVwZGF0ZUNoYXRTZXR0aW5nOiB0aGlzLnVwZGF0ZUNoYXRTZXR0aW5nLmJpbmQodGhpcyksXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuc29ja2V0LnZhbHVlLm9uKFxuICAgICAgICAncHJvZHVjZXItbWVkaWEtcGF1c2VkJyxcbiAgICAgICAgYXN5bmMgKHtcbiAgICAgICAgICBwcm9kdWNlcklkLFxuICAgICAgICAgIGtpbmQsXG4gICAgICAgICAgbmFtZSxcbiAgICAgICAgfToge1xuICAgICAgICAgIHByb2R1Y2VySWQ6IHN0cmluZztcbiAgICAgICAgICBraW5kOiAndmlkZW8nIHwgJ2F1ZGlvJyB8ICdzY3JlZW5zaGFyZScgfCAnc2NyZWVuJztcbiAgICAgICAgICBuYW1lOiBzdHJpbmc7XG4gICAgICAgIH0pID0+IHtcbiAgICAgICAgICBhd2FpdCB0aGlzLnByb2R1Y2VyTWVkaWFQYXVzZWQucHJvZHVjZXJNZWRpYVBhdXNlZCh7XG4gICAgICAgICAgICBwcm9kdWNlcklkLFxuICAgICAgICAgICAga2luZCxcbiAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICBwYXJhbWV0ZXJzOiB7IC4uLnRoaXMuZ2V0QWxsUGFyYW1zKCksIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgKTtcblxuICAgICAgdGhpcy5zb2NrZXQudmFsdWUub24oXG4gICAgICAgICdwcm9kdWNlci1tZWRpYS1yZXN1bWVkJyxcbiAgICAgICAgYXN5bmMgKHsga2luZCwgbmFtZSB9OiB7IGtpbmQ6ICdhdWRpbyc7IG5hbWU6IHN0cmluZyB9KSA9PiB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5wcm9kdWNlck1lZGlhUmVzdW1lZC5wcm9kdWNlck1lZGlhUmVzdW1lZCh7XG4gICAgICAgICAgICBraW5kLFxuICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgIHBhcmFtZXRlcnM6IHsgLi4udGhpcy5nZXRBbGxQYXJhbXMoKSwgLi4udGhpcy5tZWRpYVNGVUZ1bmN0aW9ucygpIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICApO1xuXG4gICAgICB0aGlzLnNvY2tldC52YWx1ZS5vbihcbiAgICAgICAgJ3Byb2R1Y2VyLW1lZGlhLWNsb3NlZCcsXG4gICAgICAgIGFzeW5jICh7XG4gICAgICAgICAgcHJvZHVjZXJJZCxcbiAgICAgICAgICBraW5kLFxuICAgICAgICB9OiB7XG4gICAgICAgICAgcHJvZHVjZXJJZDogc3RyaW5nO1xuICAgICAgICAgIGtpbmQ6ICd2aWRlbycgfCAnYXVkaW8nIHwgJ3NjcmVlbnNoYXJlJyB8ICdzY3JlZW4nO1xuICAgICAgICB9KSA9PiB7XG4gICAgICAgICAgaWYgKHByb2R1Y2VySWQgJiYga2luZCkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wcm9kdWNlck1lZGlhQ2xvc2VkLnByb2R1Y2VyTWVkaWFDbG9zZWQoe1xuICAgICAgICAgICAgICBwcm9kdWNlcklkLFxuICAgICAgICAgICAgICBraW5kLFxuICAgICAgICAgICAgICBwYXJhbWV0ZXJzOiB7IC4uLnRoaXMuZ2V0QWxsUGFyYW1zKCksIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgKTtcblxuICAgICAgdGhpcy5zb2NrZXQudmFsdWUub24oXG4gICAgICAgICdjb250cm9sTWVkaWFIb3N0JyxcbiAgICAgICAgYXN5bmMgKHsgdHlwZSB9OiB7IHR5cGU6ICd2aWRlbycgfCAnYXVkaW8nIHwgJ3NjcmVlbnNoYXJlJyB8ICdjaGF0JyB8ICdhbGwnIH0pID0+IHtcbiAgICAgICAgICBhd2FpdCB0aGlzLmNvbnRyb2xNZWRpYUhvc3QuY29udHJvbE1lZGlhSG9zdCh7XG4gICAgICAgICAgICB0eXBlLFxuICAgICAgICAgICAgcGFyYW1ldGVyczogeyAuLi50aGlzLmdldEFsbFBhcmFtcygpLCAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCkgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICk7XG5cbiAgICAgIHRoaXMuc29ja2V0LnZhbHVlLm9uKCdtZWV0aW5nRW5kZWQnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGF3YWl0IHRoaXMubWVldGluZ0VuZGVkLm1lZXRpbmdFbmRlZCh7XG4gICAgICAgICAgc2hvd0FsZXJ0OiB0aGlzLnNob3dBbGVydC5iaW5kKHRoaXMpLFxuICAgICAgICAgIHJlZGlyZWN0VVJMOiB0aGlzLnJlZGlyZWN0VVJMLnZhbHVlLFxuICAgICAgICAgIG9uV2ViOiB0cnVlLFxuICAgICAgICAgIGV2ZW50VHlwZTogdGhpcy5ldmVudFR5cGUudmFsdWUsXG4gICAgICAgICAgdXBkYXRlVmFsaWRhdGVkOiB0aGlzLnVwZGF0ZVZhbGlkYXRlZC5iaW5kKHRoaXMpLFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodGhpcy52aWRlb0FscmVhZHlPbi52YWx1ZSkge1xuICAgICAgICAgIGF3YWl0IHRoaXMuY2xpY2tWaWRlby5jbGlja1ZpZGVvKHtcbiAgICAgICAgICAgIHBhcmFtZXRlcnM6IHtcbiAgICAgICAgICAgICAgLi4udGhpcy5nZXRBbGxQYXJhbXMoKSxcbiAgICAgICAgICAgICAgLi4udGhpcy5tZWRpYVNGVUZ1bmN0aW9ucygpLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5hdWRpb0FscmVhZHlPbi52YWx1ZSkge1xuICAgICAgICAgIGF3YWl0IHRoaXMuY2xpY2tBdWRpby5jbGlja0F1ZGlvKHtcbiAgICAgICAgICAgIHBhcmFtZXRlcnM6IHtcbiAgICAgICAgICAgICAgLi4udGhpcy5nZXRBbGxQYXJhbXMoKSxcbiAgICAgICAgICAgICAgLi4udGhpcy5tZWRpYVNGVUZ1bmN0aW9ucygpLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGF3YWl0IHRoaXMuY2xvc2VBbmRSZXNldCgpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuc29ja2V0LnZhbHVlLm9uKCdkaXNjb25uZWN0VXNlclNlbGYnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGF3YWl0IHRoaXMuZGlzY29ubmVjdFVzZXJTZWxmLmRpc2Nvbm5lY3RVc2VyU2VsZih7XG4gICAgICAgICAgc29ja2V0OiB0aGlzLnNvY2tldC52YWx1ZSxcbiAgICAgICAgICBtZW1iZXI6IHRoaXMubWVtYmVyLnZhbHVlLFxuICAgICAgICAgIHJvb21OYW1lOiB0aGlzLnJvb21OYW1lLnZhbHVlLFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnNvY2tldC52YWx1ZS5vbigncmVjZWl2ZU1lc3NhZ2UnLCBhc3luYyAoeyBtZXNzYWdlIH06IHsgbWVzc2FnZTogTWVzc2FnZSB9KSA9PiB7XG4gICAgICAgIGF3YWl0IHRoaXMucmVjZWl2ZU1lc3NhZ2UucmVjZWl2ZU1lc3NhZ2Uoe1xuICAgICAgICAgIG1lc3NhZ2UsXG4gICAgICAgICAgbWVzc2FnZXM6IHRoaXMubWVzc2FnZXMudmFsdWUsXG4gICAgICAgICAgcGFydGljaXBhbnRzQWxsOiB0aGlzLnBhcnRpY2lwYW50c0FsbC52YWx1ZSxcbiAgICAgICAgICBtZW1iZXI6IHRoaXMubWVtYmVyLnZhbHVlLFxuICAgICAgICAgIGV2ZW50VHlwZTogdGhpcy5ldmVudFR5cGUudmFsdWUsXG4gICAgICAgICAgaXNsZXZlbDogdGhpcy5pc2xldmVsLnZhbHVlLFxuICAgICAgICAgIGNvSG9zdDogdGhpcy5jb0hvc3QudmFsdWUsXG4gICAgICAgICAgdXBkYXRlTWVzc2FnZXM6IHRoaXMudXBkYXRlTWVzc2FnZXMuYmluZCh0aGlzKSxcbiAgICAgICAgICB1cGRhdGVTaG93TWVzc2FnZXNCYWRnZTogdGhpcy51cGRhdGVTaG93TWVzc2FnZXNCYWRnZS5iaW5kKHRoaXMpLFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnNvY2tldC52YWx1ZS5vbihcbiAgICAgICAgJ21lZXRpbmdUaW1lUmVtYWluaW5nJyxcbiAgICAgICAgYXN5bmMgKHsgdGltZVJlbWFpbmluZyB9OiB7IHRpbWVSZW1haW5pbmc6IG51bWJlciB9KSA9PiB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5tZWV0aW5nVGltZVJlbWFpbmluZy5tZWV0aW5nVGltZVJlbWFpbmluZyh7XG4gICAgICAgICAgICB0aW1lUmVtYWluaW5nLFxuICAgICAgICAgICAgc2hvd0FsZXJ0OiB0aGlzLnNob3dBbGVydC5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgZXZlbnRUeXBlOiB0aGlzLmV2ZW50VHlwZS52YWx1ZSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICk7XG5cbiAgICAgIHRoaXMuc29ja2V0LnZhbHVlLm9uKCdtZWV0aW5nU3RpbGxUaGVyZScsIGFzeW5jICgpID0+IHtcbiAgICAgICAgdGhpcy5tZWV0aW5nU3RpbGxUaGVyZS5tZWV0aW5nU3RpbGxUaGVyZSh7XG4gICAgICAgICAgdXBkYXRlSXNDb25maXJtSGVyZU1vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc0NvbmZpcm1IZXJlTW9kYWxWaXNpYmxlLmJpbmQodGhpcyksXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuc29ja2V0LnZhbHVlLm9uKCdzdGFydFJlY29yZHMnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGF3YWl0IHRoaXMuc3RhcnRSZWNvcmRzLnN0YXJ0UmVjb3Jkcyh7XG4gICAgICAgICAgcm9vbU5hbWU6IHRoaXMucm9vbU5hbWUudmFsdWUsXG4gICAgICAgICAgbWVtYmVyOiB0aGlzLm1lbWJlci52YWx1ZSxcbiAgICAgICAgICBzb2NrZXQ6IHRoaXMuc29ja2V0LnZhbHVlLFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnNvY2tldC52YWx1ZS5vbigncmVJbml0aWF0ZVJlY29yZGluZycsIGFzeW5jICgpID0+IHtcbiAgICAgICAgYXdhaXQgdGhpcy5yZUluaXRpYXRlUmVjb3JkaW5nLnJlSW5pdGlhdGVSZWNvcmRpbmcoe1xuICAgICAgICAgIHJvb21OYW1lOiB0aGlzLnJvb21OYW1lLnZhbHVlLFxuICAgICAgICAgIG1lbWJlcjogdGhpcy5tZW1iZXIudmFsdWUsXG4gICAgICAgICAgc29ja2V0OiB0aGlzLnNvY2tldC52YWx1ZSxcbiAgICAgICAgICBhZG1pblJlc3RyaWN0U2V0dGluZzogdGhpcy5hZG1pblJlc3RyaWN0U2V0dGluZy52YWx1ZSxcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5zb2NrZXQudmFsdWUub24oXG4gICAgICAgICd1cGRhdGVDb25zdW1pbmdEb21haW5zJyxcbiAgICAgICAgYXN5bmMgKHsgZG9tYWlucywgYWx0X2RvbWFpbnMgfTogVXBkYXRlQ29uc3VtaW5nRG9tYWluc0RhdGEpID0+IHtcbiAgICAgICAgICBhd2FpdCB0aGlzLnVwZGF0ZUNvbnN1bWluZ0RvbWFpbnMudXBkYXRlQ29uc3VtaW5nRG9tYWlucyh7XG4gICAgICAgICAgICBkb21haW5zLFxuICAgICAgICAgICAgYWx0X2RvbWFpbnMsXG4gICAgICAgICAgICBhcGlVc2VyTmFtZSxcbiAgICAgICAgICAgIGFwaUtleSxcbiAgICAgICAgICAgIGFwaVRva2VuLFxuICAgICAgICAgICAgcGFyYW1ldGVyczoge1xuICAgICAgICAgICAgICAuLi50aGlzLmdldEFsbFBhcmFtcygpLFxuICAgICAgICAgICAgICAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgKTtcblxuICAgICAgdGhpcy5zb2NrZXQudmFsdWUub24oXG4gICAgICAgICdSZWNvcmRpbmdOb3RpY2UnLFxuICAgICAgICBhc3luYyAoeyBzdGF0ZSwgdXNlclJlY29yZGluZ1BhcmFtLCBwYXVzZUNvdW50LCB0aW1lRG9uZSB9OiBSZWNvcmRpbmdOb3RpY2VEYXRhKSA9PiB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5yZWNvcmRpbmdOb3RpY2UuUmVjb3JkaW5nTm90aWNlKHtcbiAgICAgICAgICAgIHN0YXRlLFxuICAgICAgICAgICAgdXNlclJlY29yZGluZ1BhcmFtLFxuICAgICAgICAgICAgcGF1c2VDb3VudCxcbiAgICAgICAgICAgIHRpbWVEb25lLFxuICAgICAgICAgICAgcGFyYW1ldGVyczogeyAuLi50aGlzLmdldEFsbFBhcmFtcygpLCAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCkgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICk7XG5cbiAgICAgIHRoaXMuc29ja2V0LnZhbHVlLm9uKCd0aW1lTGVmdFJlY29yZGluZycsIGFzeW5jICh7IHRpbWVMZWZ0IH06IHsgdGltZUxlZnQ6IG51bWJlciB9KSA9PiB7XG4gICAgICAgIHRoaXMudGltZUxlZnRSZWNvcmRpbmcudGltZUxlZnRSZWNvcmRpbmcoe1xuICAgICAgICAgIHRpbWVMZWZ0LFxuICAgICAgICAgIHNob3dBbGVydDogdGhpcy5zaG93QWxlcnQuYmluZCh0aGlzKSxcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5zb2NrZXQudmFsdWUub24oXG4gICAgICAgICdzdG9wcGVkUmVjb3JkaW5nJyxcbiAgICAgICAgYXN5bmMgKHsgc3RhdGUsIHJlYXNvbiB9OiB7IHN0YXRlOiBzdHJpbmc7IHJlYXNvbjogc3RyaW5nIH0pID0+IHtcbiAgICAgICAgICBhd2FpdCB0aGlzLnN0b3BwZWRSZWNvcmRpbmcuc3RvcHBlZFJlY29yZGluZyh7XG4gICAgICAgICAgICBzdGF0ZSxcbiAgICAgICAgICAgIHJlYXNvbixcbiAgICAgICAgICAgIHNob3dBbGVydDogdGhpcy5zaG93QWxlcnQuYmluZCh0aGlzKSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICk7XG4gICAgICB0aGlzLnNvY2tldC52YWx1ZS5vbihcbiAgICAgICAgJ2hvc3RSZXF1ZXN0UmVzcG9uc2UnLFxuICAgICAgICAoeyByZXF1ZXN0UmVzcG9uc2UgfTogSG9zdFJlcXVlc3RSZXNwb25zZURhdGEpID0+IHtcbiAgICAgICAgICB0aGlzLmhvc3RSZXF1ZXN0UmVzcG9uc2UuaG9zdFJlcXVlc3RSZXNwb25zZSh7XG4gICAgICAgICAgICByZXF1ZXN0UmVzcG9uc2UsXG4gICAgICAgICAgICBzaG93QWxlcnQ6IHRoaXMuc2hvd0FsZXJ0LmJpbmQodGhpcyksXG4gICAgICAgICAgICByZXF1ZXN0TGlzdDogdGhpcy5yZXF1ZXN0TGlzdC52YWx1ZSxcbiAgICAgICAgICAgIHVwZGF0ZVJlcXVlc3RMaXN0OiB0aGlzLnVwZGF0ZVJlcXVlc3RMaXN0LmJpbmQodGhpcyksXG4gICAgICAgICAgICB1cGRhdGVNaWNBY3Rpb246IHRoaXMudXBkYXRlTWljQWN0aW9uLmJpbmQodGhpcyksXG4gICAgICAgICAgICB1cGRhdGVWaWRlb0FjdGlvbjogdGhpcy51cGRhdGVWaWRlb0FjdGlvbi5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgdXBkYXRlU2NyZWVuQWN0aW9uOiB0aGlzLnVwZGF0ZVNjcmVlbkFjdGlvbi5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgdXBkYXRlQ2hhdEFjdGlvbjogdGhpcy51cGRhdGVDaGF0QWN0aW9uLmJpbmQodGhpcyksXG4gICAgICAgICAgICB1cGRhdGVBdWRpb1JlcXVlc3RTdGF0ZTogdGhpcy51cGRhdGVBdWRpb1JlcXVlc3RTdGF0ZS5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgdXBkYXRlVmlkZW9SZXF1ZXN0U3RhdGU6IHRoaXMudXBkYXRlVmlkZW9SZXF1ZXN0U3RhdGUuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIHVwZGF0ZVNjcmVlblJlcXVlc3RTdGF0ZTogdGhpcy51cGRhdGVTY3JlZW5SZXF1ZXN0U3RhdGUuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIHVwZGF0ZUNoYXRSZXF1ZXN0U3RhdGU6IHRoaXMudXBkYXRlQ2hhdFJlcXVlc3RTdGF0ZS5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgdXBkYXRlQXVkaW9SZXF1ZXN0VGltZTogdGhpcy51cGRhdGVBdWRpb1JlcXVlc3RUaW1lLmJpbmQodGhpcyksXG4gICAgICAgICAgICB1cGRhdGVWaWRlb1JlcXVlc3RUaW1lOiB0aGlzLnVwZGF0ZVZpZGVvUmVxdWVzdFRpbWUuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIHVwZGF0ZVNjcmVlblJlcXVlc3RUaW1lOiB0aGlzLnVwZGF0ZVNjcmVlblJlcXVlc3RUaW1lLmJpbmQodGhpcyksXG4gICAgICAgICAgICB1cGRhdGVDaGF0UmVxdWVzdFRpbWU6IHRoaXMudXBkYXRlQ2hhdFJlcXVlc3RUaW1lLmJpbmQodGhpcyksXG4gICAgICAgICAgICB1cGRhdGVSZXF1ZXN0SW50ZXJ2YWxTZWNvbmRzOiB0aGlzLnVwZGF0ZVJlcXVlc3RJbnRlcnZhbFNlY29uZHMudmFsdWUsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICApO1xuICAgICAgdGhpcy5zb2NrZXQudmFsdWUub24oJ3BvbGxVcGRhdGVkJywgYXN5bmMgKGRhdGE6IFBvbGxVcGRhdGVkRGF0YSkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGF3YWl0IHRoaXMucG9sbFVwZGF0ZWQucG9sbFVwZGF0ZWQoe1xuICAgICAgICAgICAgZGF0YSxcbiAgICAgICAgICAgIHBvbGxzOiB0aGlzLnBvbGxzLnZhbHVlLFxuICAgICAgICAgICAgcG9sbDogdGhpcy5wb2xsLnZhbHVlID8gdGhpcy5wb2xsLnZhbHVlIDogKHt9IGFzIFBvbGwpLFxuICAgICAgICAgICAgbWVtYmVyOiB0aGlzLm1lbWJlci52YWx1ZSxcbiAgICAgICAgICAgIGlzbGV2ZWw6IHRoaXMuaXNsZXZlbC52YWx1ZSxcbiAgICAgICAgICAgIHNob3dBbGVydDogdGhpcy5zaG93QWxlcnQuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIHVwZGF0ZVBvbGxzOiB0aGlzLnVwZGF0ZVBvbGxzLmJpbmQodGhpcyksXG4gICAgICAgICAgICB1cGRhdGVQb2xsOiB0aGlzLnVwZGF0ZVBvbGwuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIHVwZGF0ZUlzUG9sbE1vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc1BvbGxNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgLyogaGFuZGxlIGVycm9yICovXG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnNvY2tldC52YWx1ZS5vbignYnJlYWtvdXRSb29tVXBkYXRlZCcsIGFzeW5jIChkYXRhOiBCcmVha291dFJvb21VcGRhdGVkRGF0YSkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGF3YWl0IHRoaXMuYnJlYWtvdXRSb29tVXBkYXRlZC5icmVha291dFJvb21VcGRhdGVkKHtcbiAgICAgICAgICAgIGRhdGEsXG4gICAgICAgICAgICBwYXJhbWV0ZXJzOiB7IC4uLnRoaXMuZ2V0QWxsUGFyYW1zKCksIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAvKiBoYW5kbGUgZXJyb3IgKi9cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGF3YWl0IHRoaXMuam9pbl9Sb29tKHtcbiAgICAgICAgc29ja2V0OiB0aGlzLnNvY2tldC52YWx1ZSxcbiAgICAgICAgcm9vbU5hbWU6IHRoaXMucm9vbU5hbWUudmFsdWUsXG4gICAgICAgIGlzbGV2ZWw6IHRoaXMuaXNsZXZlbC52YWx1ZSxcbiAgICAgICAgbWVtYmVyOiB0aGlzLm1lbWJlci52YWx1ZSxcbiAgICAgICAgc2VjOiB0aGlzLmFwaVRva2VuLnZhbHVlLFxuICAgICAgICBhcGlVc2VyTmFtZTogdGhpcy5hcGlVc2VyTmFtZS52YWx1ZSxcbiAgICAgIH0pO1xuICAgICAgYXdhaXQgdGhpcy5yZWNlaXZlUm9vbU1lc3NhZ2VzLnJlY2VpdmVSb29tTWVzc2FnZXMoe1xuICAgICAgICBzb2NrZXQ6IHRoaXMuc29ja2V0LnZhbHVlLFxuICAgICAgICByb29tTmFtZTogdGhpcy5yb29tTmFtZS52YWx1ZSxcbiAgICAgICAgdXBkYXRlTWVzc2FnZXM6IHRoaXMudXBkYXRlTWVzc2FnZXMuYmluZCh0aGlzKSxcbiAgICAgIH0pO1xuICAgICAgdGhpcy5wcmVwb3B1bGF0ZVVzZXJNZWRpYS5wcmVwb3B1bGF0ZVVzZXJNZWRpYSh7XG4gICAgICAgIG5hbWU6IHRoaXMuaG9zdExhYmVsLnZhbHVlLFxuICAgICAgICBwYXJhbWV0ZXJzOiB7IC4uLnRoaXMuZ2V0QWxsUGFyYW1zKCksIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSB9LFxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiB0aGlzLnNvY2tldC52YWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG59XG4iXX0=