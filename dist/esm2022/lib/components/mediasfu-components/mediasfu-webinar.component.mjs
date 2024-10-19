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
export class MediasfuWebinar {
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
    title = 'MediaSFU-Webinar';
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
                return request?.name?.toLowerCase().includes(value.toLowerCase()) ?? false;
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
                            console.log('none');
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
            this.updateIsLoadingModalVisible(true);
            try {
                if (!this.localUIMode.value) {
                    await this.connectAndAddSocketMethods();
                }
            }
            catch (error) {
                console.log('error connectAndaAddSocketMethods', error);
            }
            this.startMeetingProgressTimer.startMeetingProgressTimer({
                startTime: Date.now() / 1000,
                parameters: { ...this.getAllParams(), ...this.mediaSFUFunctions() },
            });
            this.updateIsLoadingModalVisible(false);
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
                (this.coHostResponsibility.value &&
                    this.coHost.value &&
                    this.coHost.value === this.member.value &&
                    !!this.coHostResponsibility?.value?.find((item) => item.name === 'media')?.value) ||
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: MediasfuWebinar, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.Injector }, { token: i1.UpdateMiniCardsGrid }, { token: i2.MixStreams }, { token: i3.DispStreams }, { token: i4.StopShareScreen }, { token: i5.CheckScreenShare }, { token: i6.StartShareScreen }, { token: i7.RequestScreenShare }, { token: i8.ReorderStreams }, { token: i9.PrepopulateUserMedia }, { token: i10.GetVideos }, { token: i11.RePort }, { token: i12.Trigger }, { token: i13.ConsumerResume }, { token: i14.ConnectSendTransport }, { token: i15.ConnectSendTransportAudio }, { token: i16.ConnectSendTransportVideo }, { token: i17.ConnectSendTransportScreen }, { token: i18.ProcessConsumerTransports }, { token: i19.ResumePauseStreams }, { token: i20.Readjust }, { token: i21.CheckGrid }, { token: i22.GetEstimate }, { token: i23.CalculateRowsAndColumns }, { token: i24.AddVideosGrid }, { token: i25.OnScreenChanges }, { token: i26.ChangeVids }, { token: i27.CompareActiveNames }, { token: i28.CompareScreenStates }, { token: i29.CreateSendTransport }, { token: i30.ResumeSendTransportAudio }, { token: i31.ReceiveAllPipedTransports }, { token: i32.DisconnectSendTransportVideo }, { token: i33.DisconnectSendTransportAudio }, { token: i34.DisconnectSendTransportScreen }, { token: i35.GetPipedProducersAlt }, { token: i36.SignalNewConsumerTransport }, { token: i37.ConnectRecvTransport }, { token: i38.ReUpdateInter }, { token: i39.UpdateParticipantAudioDecibels }, { token: i40.CloseAndResize }, { token: i41.AutoAdjust }, { token: i42.SwitchUserVideoAlt }, { token: i43.SwitchUserVideo }, { token: i44.SwitchUserAudio }, { token: i45.GetDomains }, { token: i46.FormatNumber }, { token: i47.ConnectIps }, { token: i48.CreateDeviceClient }, { token: i49.HandleCreatePoll }, { token: i50.HandleEndPoll }, { token: i51.HandleVotePoll }, { token: i52.CaptureCanvasStream }, { token: i53.ResumePauseAudioStreams }, { token: i54.ProcessConsumerTransportsAudio }, { token: i55.LaunchMenuModal }, { token: i56.LaunchRecording }, { token: i57.StartRecording }, { token: i58.ConfirmRecording }, { token: i59.LaunchWaiting }, { token: i60.launchCoHost }, { token: i61.LaunchMediaSettings }, { token: i62.LaunchDisplaySettings }, { token: i63.LaunchSettings }, { token: i64.LaunchRequests }, { token: i65.LaunchParticipants }, { token: i66.LaunchMessages }, { token: i67.LaunchConfirmExit }, { token: i68.LaunchPoll }, { token: i69.LaunchBreakoutRooms }, { token: i70.LaunchConfigureWhiteboard }, { token: i71.StartMeetingProgressTimer }, { token: i72.UpdateRecording }, { token: i73.StopRecording }, { token: i74.UserWaiting }, { token: i75.PersonJoined }, { token: i76.AllWaitingRoomMembers }, { token: i77.RoomRecordParams }, { token: i78.BanParticipant }, { token: i79.UpdatedCoHost }, { token: i80.ParticipantRequested }, { token: i81.ScreenProducerId }, { token: i82.UpdateMediaSettings }, { token: i83.ProducerMediaPaused }, { token: i84.ProducerMediaResumed }, { token: i85.ProducerMediaClosed }, { token: i86.ControlMediaHost }, { token: i87.MeetingEnded }, { token: i88.DisconnectUserSelf }, { token: i89.ReceiveMessage }, { token: i90.MeetingTimeRemaining }, { token: i91.MeetingStillThere }, { token: i92.StartRecords }, { token: i93.ReInitiateRecording }, { token: i94.RecordingNotice }, { token: i95.TimeLeftRecording }, { token: i96.StoppedRecording }, { token: i97.HostRequestResponse }, { token: i98.AllMembers }, { token: i99.AllMembersRest }, { token: i100.Disconnect }, { token: i101.PollUpdated }, { token: i102.BreakoutRoomUpdated }, { token: i103.SocketManager }, { token: i104.JoinRoomClient }, { token: i105.UpdateRoomParametersClient }, { token: i106.ClickVideo }, { token: i107.ClickAudio }, { token: i108.ClickScreenShare }, { token: i109.StreamSuccessVideo }, { token: i110.StreamSuccessAudio }, { token: i111.StreamSuccessScreen }, { token: i112.StreamSuccessAudioSwitch }, { token: i113.CheckPermission }, { token: i114.UpdateConsumingDomains }, { token: i115.ReceiveRoomMessages }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.8", type: MediasfuWebinar, isStandalone: true, selector: "app-mediasfu-webinar", inputs: { PrejoinPage: "PrejoinPage", credentials: "credentials", useLocalUIMode: "useLocalUIMode", seedData: "seedData", useSeed: "useSeed", imgSrc: "imgSrc" }, host: { listeners: { "window:resize": "handleResize()", "window:orientationchange": "handleResize()" } }, providers: [CookieService], ngImport: i0, template: `
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
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: MediasfuWebinar, decorators: [{
            type: Component,
            args: [{ selector: 'app-mediasfu-webinar', standalone: true, imports: [
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWFzZnUtd2ViaW5hci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29tcG9uZW50cy9tZWRpYXNmdS1jb21wb25lbnRzL21lZGlhc2Z1LXdlYmluYXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLFFBQVEsRUFFUixLQUFLLEdBR04sTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbkQsT0FBTyxFQUFFLGVBQWUsRUFBZ0IsYUFBYSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXBFLE9BQU8sRUFDTCxZQUFZLEVBQ1osYUFBYSxFQUNiLFlBQVksRUFDWixXQUFXLEVBQ1gsYUFBYSxFQUNiLEtBQUssRUFDTCxPQUFPLEVBQ1AsT0FBTyxFQUNQLFVBQVUsRUFDVixPQUFPLEVBQ1AsU0FBUyxFQUNULE1BQU0sRUFDTixhQUFhLEVBQ2IsbUJBQW1CLEVBQ25CLFlBQVksRUFDWixpQkFBaUIsRUFDakIsT0FBTyxFQUNQLFlBQVksRUFDWixPQUFPLEVBQ1AsTUFBTSxFQUNOLFVBQVUsRUFDVixVQUFVLEdBQ1gsTUFBTSxtQ0FBbUMsQ0FBQztBQUUzQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUU3RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw2RUFBNkUsQ0FBQztBQUNsSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNkRBQTZELENBQUM7QUFDM0YsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0scUZBQXFG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QWE7d0JBQ2IsZ0JBQWdCO3dCQUNoQixpQkFBaUI7d0JBQ2pCLHNCQUFzQjt3QkFDdEIsaUJBQWlCO3FCQUNsQixZQUNTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFZVCxhQVFVLENBQUMsYUFBYSxDQUFDOyt5SEFJMUIsV0FBVztzQkFEVixLQUFLO2dCQUVHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csY0FBYztzQkFBdEIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSztnQkFDRyxNQUFNO3NCQUFkLEtBQUs7Z0JBK3pHQSxZQUFZO3NCQUZqQixZQUFZO3VCQUFDLGVBQWU7O3NCQUM1QixZQUFZO3VCQUFDLDBCQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSG9zdExpc3RlbmVyLFxuICBJbmplY3RvcixcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXJPdXRsZXQgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IENvb2tpZVNlcnZpY2UgfSBmcm9tICduZ3gtY29va2llLXNlcnZpY2UnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBTdWJzY3JpcHRpb24sIGNvbWJpbmVMYXRlc3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFNvY2tldCB9IGZyb20gJ3NvY2tldC5pby1jbGllbnQnO1xuaW1wb3J0IHtcbiAgZmFQbGF5Q2lyY2xlLFxuICBmYVBhdXNlQ2lyY2xlLFxuICBmYVN0b3BDaXJjbGUsXG4gIGZhRG90Q2lyY2xlLFxuICBmYVJlY29yZFZpbnlsLFxuICBmYUNvZyxcbiAgZmFVc2VycyxcbiAgZmFDbG9jayxcbiAgZmFVc2VyUGx1cyxcbiAgZmFUb29scyxcbiAgZmFEZXNrdG9wLFxuICBmYVBvbGwsXG4gIGZhVXNlckZyaWVuZHMsXG4gIGZhQ2hhbGtib2FyZFRlYWNoZXIsXG4gIGZhTWljcm9waG9uZSxcbiAgZmFNaWNyb3Bob25lU2xhc2gsXG4gIGZhVmlkZW8sXG4gIGZhVmlkZW9TbGFzaCxcbiAgZmFQaG9uZSxcbiAgZmFCYXJzLFxuICBmYUNvbW1lbnRzLFxuICBmYUNoYXJ0QmFyLFxufSBmcm9tICdAZm9ydGF3ZXNvbWUvZnJlZS1zb2xpZC1zdmctaWNvbnMnO1xuXG5pbXBvcnQgeyBpbml0aWFsVmFsdWVzU3RhdGUgfSBmcm9tICcuLi8uLi9tZXRob2RzL3V0aWxzL2luaXRpYWwtdmFsdWVzLnV0aWwnO1xuXG5pbXBvcnQgeyBNYWluQXNwZWN0Q29tcG9uZW50IH0gZnJvbSAnLi4vZGlzcGxheS1jb21wb25lbnRzL21haW4tYXNwZWN0LWNvbXBvbmVudC9tYWluLWFzcGVjdC1jb21wb25lbnQuY29tcG9uZW50JztcbmltcG9ydCB7IExvYWRpbmdNb2RhbCB9IGZyb20gJy4uL2Rpc3BsYXktY29tcG9uZW50cy9sb2FkaW5nLW1vZGFsL2xvYWRpbmctbW9kYWwuY29tcG9uZW50JztcbmltcG9ydCB7IENvbnRyb2xCdXR0b25zQ29tcG9uZW50IH0gZnJvbSAnLi4vZGlzcGxheS1jb21wb25lbnRzL2NvbnRyb2wtYnV0dG9ucy1jb21wb25lbnQvY29udHJvbC1idXR0b25zLWNvbXBvbmVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29udHJvbEJ1dHRvbnNBbHRDb21wb25lbnQgfSBmcm9tICcuLi9kaXNwbGF5LWNvbXBvbmVudHMvY29udHJvbC1idXR0b25zLWFsdC1jb21wb25lbnQvY29udHJvbC1idXR0b25zLWFsdC1jb21wb25lbnQuY29tcG9uZW50JztcbmltcG9ydCB7IE90aGVyR3JpZENvbXBvbmVudCB9IGZyb20gJy4uL2Rpc3BsYXktY29tcG9uZW50cy9vdGhlci1ncmlkLWNvbXBvbmVudC9vdGhlci1ncmlkLWNvbXBvbmVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWFpblNjcmVlbkNvbXBvbmVudCB9IGZyb20gJy4uL2Rpc3BsYXktY29tcG9uZW50cy9tYWluLXNjcmVlbi1jb21wb25lbnQvbWFpbi1zY3JlZW4tY29tcG9uZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYWluR3JpZENvbXBvbmVudCB9IGZyb20gJy4uL2Rpc3BsYXktY29tcG9uZW50cy9tYWluLWdyaWQtY29tcG9uZW50L21haW4tZ3JpZC1jb21wb25lbnQuY29tcG9uZW50JztcbmltcG9ydCB7IFN1YkFzcGVjdENvbXBvbmVudCB9IGZyb20gJy4uL2Rpc3BsYXktY29tcG9uZW50cy9zdWItYXNwZWN0LWNvbXBvbmVudC9zdWItYXNwZWN0LWNvbXBvbmVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWFpbkNvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4uL2Rpc3BsYXktY29tcG9uZW50cy9tYWluLWNvbnRhaW5lci1jb21wb25lbnQvbWFpbi1jb250YWluZXItY29tcG9uZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBbGVydENvbXBvbmVudCB9IGZyb20gJy4uL2Rpc3BsYXktY29tcG9uZW50cy9hbGVydC1jb21wb25lbnQvYWxlcnQuY29tcG9uZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNZW51TW9kYWwgfSBmcm9tICcuLi9tZW51LWNvbXBvbmVudHMvbWVudS1tb2RhbC9tZW51LW1vZGFsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSZWNvcmRpbmdNb2RhbCB9IGZyb20gJy4uL3JlY29yZGluZy1jb21wb25lbnRzL3JlY29yZGluZy1tb2RhbC9yZWNvcmRpbmctbW9kYWwuY29tcG9uZW50JztcbmltcG9ydCB7IFJlcXVlc3RzTW9kYWwgfSBmcm9tICcuLi9yZXF1ZXN0cy1jb21wb25lbnRzL3JlcXVlc3RzLW1vZGFsL3JlcXVlc3RzLW1vZGFsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBXYWl0aW5nUm9vbU1vZGFsIH0gZnJvbSAnLi4vd2FpdGluZy1jb21wb25lbnRzL3dhaXRpbmctcm9vbS1tb2RhbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGlzcGxheVNldHRpbmdzTW9kYWwgfSBmcm9tICcuLi9kaXNwbGF5LXNldHRpbmdzLWNvbXBvbmVudHMvZGlzcGxheS1zZXR0aW5ncy1tb2RhbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRXZlbnRTZXR0aW5nc01vZGFsIH0gZnJvbSAnLi4vZXZlbnQtc2V0dGluZ3MtY29tcG9uZW50cy9ldmVudC1zZXR0aW5ncy1tb2RhbC9ldmVudC1zZXR0aW5ncy1tb2RhbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29Ib3N0TW9kYWwgfSBmcm9tICcuLi9jby1ob3N0LWNvbXBvbmVudHMvY28taG9zdC1tb2RhbC9jby1ob3N0LW1vZGFsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQYXJ0aWNpcGFudHNNb2RhbCB9IGZyb20gJy4uL3BhcnRpY2lwYW50cy1jb21wb25lbnRzL3BhcnRpY2lwYW50cy1tb2RhbC9wYXJ0aWNpcGFudHMtbW9kYWwuY29tcG9uZW50JztcbmltcG9ydCB7IE1lc3NhZ2VzTW9kYWwgfSBmcm9tICcuLi9tZXNzYWdlLWNvbXBvbmVudHMvbWVzc2FnZXMtbW9kYWwvbWVzc2FnZXMtbW9kYWwuY29tcG9uZW50JztcbmltcG9ydCB7IE1lZGlhU2V0dGluZ3NNb2RhbCB9IGZyb20gJy4uL21lZGlhLXNldHRpbmdzLWNvbXBvbmVudHMvbWVkaWEtc2V0dGluZ3MtbW9kYWwvbWVkaWEtc2V0dGluZ3MtbW9kYWwuY29tcG9uZW50JztcbmltcG9ydCB7IENvbmZpcm1FeGl0TW9kYWwgfSBmcm9tICcuLi9leGl0LWNvbXBvbmVudHMvY29uZmlybS1leGl0LW1vZGFsL2NvbmZpcm0tZXhpdC1tb2RhbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29uZmlybUhlcmVNb2RhbCB9IGZyb20gJy4uL21pc2MtY29tcG9uZW50cy9jb25maXJtLWhlcmUtbW9kYWwvY29uZmlybS1oZXJlLW1vZGFsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTaGFyZUV2ZW50TW9kYWwgfSBmcm9tICcuLi9taXNjLWNvbXBvbmVudHMvc2hhcmUtZXZlbnQtbW9kYWwvc2hhcmUtZXZlbnQtbW9kYWwuY29tcG9uZW50JztcbmltcG9ydCB7XG4gIFdlbGNvbWVQYWdlLFxuICBXZWxjb21lUGFnZU9wdGlvbnMsXG59IGZyb20gJy4uL21pc2MtY29tcG9uZW50cy93ZWxjb21lLXBhZ2Uvd2VsY29tZS1wYWdlLmNvbXBvbmVudCc7XG5cbmltcG9ydCB7IFBvbGxNb2RhbCB9IGZyb20gJy4uL3BvbGxzLWNvbXBvbmVudHMvcG9sbC1tb2RhbC9wb2xsLW1vZGFsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBCYWNrZ3JvdW5kTW9kYWwgfSBmcm9tICcuLi9iYWNrZ3JvdW5kLWNvbXBvbmVudHMvYmFja2dyb3VuZC1tb2RhbC9iYWNrZ3JvdW5kLW1vZGFsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBCcmVha291dFJvb21zTW9kYWwgfSBmcm9tICcuLi9icmVha291dC1jb21wb25lbnRzL2JyZWFrb3V0LXJvb21zLW1vZGFsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb25maWd1cmVXaGl0ZWJvYXJkTW9kYWwgfSBmcm9tICcuLi93aGl0ZWJvYXJkLWNvbXBvbmVudHMvY29uZmlndXJlLXdoaXRlYm9hcmQtbW9kYWwvY29uZmlndXJlLXdoaXRlYm9hcmQtbW9kYWwuY29tcG9uZW50JztcbmltcG9ydCB7IFdoaXRlYm9hcmQgfSBmcm9tICcuLi93aGl0ZWJvYXJkLWNvbXBvbmVudHMvd2hpdGVib2FyZC93aGl0ZWJvYXJkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTY3JlZW5ib2FyZCB9IGZyb20gJy4uL3NjcmVlbmJvYXJkLWNvbXBvbmVudHMvc2NyZWVuYm9hcmQvc2NyZWVuYm9hcmQuY29tcG9uZW50JztcbmltcG9ydCB7IFNjcmVlbmJvYXJkTW9kYWwgfSBmcm9tICcuLi9zY3JlZW5ib2FyZC1jb21wb25lbnRzL3NjcmVlbmJvYXJkLW1vZGFsL3NjcmVlbmJvYXJkLW1vZGFsLmNvbXBvbmVudCc7XG4vLyBwYWdpbmF0aW9uIGFuZCBkaXNwbGF5IG9mIG1lZGlhIChzYW1wbGVzKVxuaW1wb3J0IHsgUGFnaW5hdGlvbiB9IGZyb20gJy4uL2Rpc3BsYXktY29tcG9uZW50cy9wYWdpbmF0aW9uL3BhZ2luYXRpb24uY29tcG9uZW50JztcbmltcG9ydCB7IEZsZXhpYmxlR3JpZCB9IGZyb20gJy4uL2Rpc3BsYXktY29tcG9uZW50cy9mbGV4aWJsZS1ncmlkL2ZsZXhpYmxlLWdyaWQuY29tcG9uZW50JztcbmltcG9ydCB7IEZsZXhpYmxlVmlkZW8gfSBmcm9tICcuLi9kaXNwbGF5LWNvbXBvbmVudHMvZmxleGlibGUtdmlkZW8vZmxleGlibGUtdmlkZW8uY29tcG9uZW50JztcbmltcG9ydCB7IEF1ZGlvR3JpZCB9IGZyb20gJy4uL2Rpc3BsYXktY29tcG9uZW50cy9hdWRpby1ncmlkL2F1ZGlvLWdyaWQuY29tcG9uZW50JztcblxuaW1wb3J0IHsgTWVudVdpZGdldCB9IGZyb20gJy4uL2Rpc3BsYXktY29tcG9uZW50cy9jb250cm9sLXdpZGdldHMvbWVudS13aWRnZXQuY29tcG9uZW50JztcbmltcG9ydCB7IE1lc3NhZ2VXaWRnZXQgfSBmcm9tICcuLi9kaXNwbGF5LWNvbXBvbmVudHMvY29udHJvbC13aWRnZXRzL21lc3NhZ2Utd2lkZ2V0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNZW51UmVjb3JkV2lkZ2V0IH0gZnJvbSAnLi4vZGlzcGxheS1jb21wb25lbnRzL2NvbnRyb2wtd2lkZ2V0cy9tZW51LXJlY29yZC13aWRnZXQuY29tcG9uZW50JztcbmltcG9ydCB7IFJlY29yZFRpbWVyV2lkZ2V0IH0gZnJvbSAnLi4vZGlzcGxheS1jb21wb25lbnRzL2NvbnRyb2wtd2lkZ2V0cy9yZWNvcmQtdGltZXItd2lkZ2V0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNZW51UGFydGljaXBhbnRzV2lkZ2V0IH0gZnJvbSAnLi4vZGlzcGxheS1jb21wb25lbnRzL2NvbnRyb2wtd2lkZ2V0cy9tZW51LXBhcnRpY2lwYW50cy13aWRnZXQuY29tcG9uZW50JztcbmltcG9ydCB7IFNjcmVlblNoYXJlV2lkZ2V0IH0gZnJvbSAnLi4vZGlzcGxheS1jb21wb25lbnRzL2NvbnRyb2wtd2lkZ2V0cy9zY3JlZW5zaGFyZS13aWRnZXQuY29tcG9uZW50JztcblxuaW1wb3J0IHtcbiAgUmVzcG9uc2VKb2luUm9vbSxcbiAgQ29Ib3N0UmVzcG9uc2liaWxpdHksXG4gIEV2ZW50VHlwZSxcbiAgUGFydGljaXBhbnQsXG4gIENvbnN1bWVTb2NrZXQsXG4gIE1lZXRpbmdSb29tUGFyYW1zLFxuICBWaWRDb25zLFxuICBIUGFyYW1zVHlwZSxcbiAgVlBhcmFtc1R5cGUsXG4gIFNjcmVlblBhcmFtc1R5cGUsXG4gIEFQYXJhbXNUeXBlLFxuICBVc2VyUmVjb3JkaW5nUGFyYW1zLFxuICBTdHJlYW0sXG4gIEF1ZGlvRGVjaWJlbHMsXG4gIFNjcmVlblN0YXRlLFxuICBHcmlkU2l6ZXMsXG4gIEN1c3RvbU1lZGlhQ29tcG9uZW50LFxuICBNZXNzYWdlLFxuICBXYWl0aW5nUm9vbVBhcnRpY2lwYW50LFxuICBDb21wb25lbnRTaXplcyxcbiAgVHJhbnNwb3J0IGFzIFRyYW5zcG9ydFR5cGUsXG4gIFNoYXBlLFxuICBQb2xsLFxuICBCcmVha291dFBhcnRpY2lwYW50LFxuICBXaGl0ZWJvYXJkVXNlcixcbiAgUmVxdWVzdCxcbiAgQWxsTWVtYmVyc0RhdGEsXG4gIEFsbE1lbWJlcnNSZXN0RGF0YSxcbiAgQnJlYWtvdXRSb29tVXBkYXRlZERhdGEsXG4gIEFsbFdhaXRpbmdSb29tTWVtYmVyc0RhdGEsXG4gIE1haW5CdXR0b25BbHQsXG4gIE1haW5DdXN0b21CdXR0b24sXG4gIFJlY29yZFBhcmFtcyxcbiAgU2VlZERhdGEsXG4gIFVwZGF0ZWRDb0hvc3REYXRhLFxuICBTZXR0aW5ncyxcbiAgVXBkYXRlQ29uc3VtaW5nRG9tYWluc0RhdGEsXG4gIFJlY29yZGluZ05vdGljZURhdGEsXG4gIEhvc3RSZXF1ZXN0UmVzcG9uc2VEYXRhLFxuICBQb2xsVXBkYXRlZERhdGEsXG4gIFByZUpvaW5QYWdlT3B0aW9ucyxcbn0gZnJvbSAnLi4vLi4vQHR5cGVzL3R5cGVzJztcblxuLy9pbXBvcnQgbWV0aG9kcyBmb3IgY29udHJvbCAoc2FtcGxlcylcbi8vIEltcG9ydCBtZXRob2RzIGZvciBjb250cm9sIChzYW1wbGVzKVxuaW1wb3J0IHsgTGF1bmNoTWVudU1vZGFsIH0gZnJvbSAnLi4vLi4vbWV0aG9kcy9tZW51LW1ldGhvZHMvbGF1bmNoLW1lbnUtbW9kYWwuc2VydmljZSc7XG5pbXBvcnQgeyBMYXVuY2hSZWNvcmRpbmcgfSBmcm9tICcuLi8uLi9tZXRob2RzL3JlY29yZGluZy1tZXRob2RzL2xhdW5jaC1yZWNvcmRpbmcuc2VydmljZSc7XG5pbXBvcnQgeyBTdGFydFJlY29yZGluZyB9IGZyb20gJy4uLy4uL21ldGhvZHMvcmVjb3JkaW5nLW1ldGhvZHMvc3RhcnQtcmVjb3JkaW5nLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29uZmlybVJlY29yZGluZyB9IGZyb20gJy4uLy4uL21ldGhvZHMvcmVjb3JkaW5nLW1ldGhvZHMvY29uZmlybS1yZWNvcmRpbmcuc2VydmljZSc7XG5pbXBvcnQgeyBMYXVuY2hXYWl0aW5nIH0gZnJvbSAnLi4vLi4vbWV0aG9kcy93YWl0aW5nLW1ldGhvZHMvbGF1bmNoLXdhaXRpbmcuc2VydmljZSc7XG5pbXBvcnQgeyBsYXVuY2hDb0hvc3QgfSBmcm9tICcuLi8uLi9tZXRob2RzL2NvLWhvc3QtbWV0aG9kcy9sYXVuY2gtY28taG9zdC5zZXJ2aWNlJztcbmltcG9ydCB7IExhdW5jaE1lZGlhU2V0dGluZ3MgfSBmcm9tICcuLi8uLi9tZXRob2RzL21lZGlhLXNldHRpbmdzLW1ldGhvZHMvbGF1bmNoLW1lZGlhLXNldHRpbmdzLnNlcnZpY2UnO1xuaW1wb3J0IHsgTGF1bmNoRGlzcGxheVNldHRpbmdzIH0gZnJvbSAnLi4vLi4vbWV0aG9kcy9kaXNwbGF5LXNldHRpbmdzLW1ldGhvZHMvbGF1bmNoLWRpc3BsYXktc2V0dGluZ3Muc2VydmljZSc7XG5pbXBvcnQgeyBMYXVuY2hTZXR0aW5ncyB9IGZyb20gJy4uLy4uL21ldGhvZHMvc2V0dGluZ3MtbWV0aG9kcy9sYXVuY2gtc2V0dGluZ3Muc2VydmljZSc7XG5pbXBvcnQgeyBMYXVuY2hSZXF1ZXN0cyB9IGZyb20gJy4uLy4uL21ldGhvZHMvcmVxdWVzdHMtbWV0aG9kcy9sYXVuY2gtcmVxdWVzdHMuc2VydmljZSc7XG5pbXBvcnQgeyBMYXVuY2hQYXJ0aWNpcGFudHMgfSBmcm9tICcuLi8uLi9tZXRob2RzL3BhcnRpY2lwYW50cy1tZXRob2RzL2xhdW5jaC1wYXJ0aWNpcGFudHMuc2VydmljZSc7XG5pbXBvcnQgeyBMYXVuY2hNZXNzYWdlcyB9IGZyb20gJy4uLy4uL21ldGhvZHMvbWVzc2FnZS1tZXRob2RzL2xhdW5jaC1tZXNzYWdlcy5zZXJ2aWNlJztcbmltcG9ydCB7IExhdW5jaENvbmZpcm1FeGl0IH0gZnJvbSAnLi4vLi4vbWV0aG9kcy9leGl0LW1ldGhvZHMvbGF1bmNoLWNvbmZpcm0tZXhpdC5zZXJ2aWNlJztcblxuaW1wb3J0IHsgTGF1bmNoUG9sbCB9IGZyb20gJy4uLy4uL21ldGhvZHMvcG9sbHMtbWV0aG9kcy9sYXVuY2gtcG9sbC5zZXJ2aWNlJztcbmltcG9ydCB7IExhdW5jaEJyZWFrb3V0Um9vbXMgfSBmcm9tICcuLi8uLi9tZXRob2RzL2JyZWFrb3V0LXJvb20tbWV0aG9kcy9sYXVuY2gtYnJlYWtvdXQtcm9vbXMuc2VydmljZSc7XG5pbXBvcnQgeyBMYXVuY2hDb25maWd1cmVXaGl0ZWJvYXJkIH0gZnJvbSAnLi4vLi4vbWV0aG9kcy93aGl0ZWJvYXJkLW1ldGhvZHMvbGF1bmNoLWNvbmZpZ3VyZS13aGl0ZWJvYXJkLnNlcnZpY2UnO1xuXG4vLyBtZWRpYXNmdSBmdW5jdGlvbnMgLS0gZXhhbXBsZXNcbmltcG9ydCB7IFNvY2tldE1hbmFnZXIgfSBmcm9tICcuLi8uLi9zb2NrZXRzL3NvY2tldC1tYW5hZ2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgSm9pblJvb21DbGllbnQgfSBmcm9tICcuLi8uLi9wcm9kdWNlci1jbGllbnQvcHJvZHVjZXItY2xpZW50LWVtaXRzL2pvaW4tcm9vbS1jbGllbnQuc2VydmljZSc7XG5pbXBvcnQgeyBVcGRhdGVSb29tUGFyYW1ldGVyc0NsaWVudCB9IGZyb20gJy4uLy4uL3Byb2R1Y2VyLWNsaWVudC9wcm9kdWNlci1jbGllbnQtZW1pdHMvdXBkYXRlLXJvb20tcGFyYW1ldGVycy1jbGllbnQuc2VydmljZSc7XG5pbXBvcnQgeyBDcmVhdGVEZXZpY2VDbGllbnQgfSBmcm9tICcuLi8uLi9wcm9kdWNlci1jbGllbnQvcHJvZHVjZXItY2xpZW50LWVtaXRzL2NyZWF0ZS1kZXZpY2UtY2xpZW50LnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBDbGlja1ZpZGVvIH0gZnJvbSAnLi4vLi4vbWV0aG9kcy9zdHJlYW0tbWV0aG9kcy9jbGljay12aWRlby5zZXJ2aWNlJztcbmltcG9ydCB7IENsaWNrQXVkaW8gfSBmcm9tICcuLi8uLi9tZXRob2RzL3N0cmVhbS1tZXRob2RzL2NsaWNrLWF1ZGlvLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2xpY2tTY3JlZW5TaGFyZSB9IGZyb20gJy4uLy4uL21ldGhvZHMvc3RyZWFtLW1ldGhvZHMvY2xpY2stc2NyZWVuLXNoYXJlLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3RyZWFtU3VjY2Vzc1ZpZGVvIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL3N0cmVhbS1zdWNjZXNzLXZpZGVvLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3RyZWFtU3VjY2Vzc0F1ZGlvIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL3N0cmVhbS1zdWNjZXNzLWF1ZGlvLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3RyZWFtU3VjY2Vzc1NjcmVlbiB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9zdHJlYW0tc3VjY2Vzcy1zY3JlZW4uc2VydmljZSc7XG5pbXBvcnQgeyBTdHJlYW1TdWNjZXNzQXVkaW9Td2l0Y2ggfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvc3RyZWFtLXN1Y2Nlc3MtYXVkaW8tc3dpdGNoLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2hlY2tQZXJtaXNzaW9uIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL2NoZWNrLXBlcm1pc3Npb24uc2VydmljZSc7XG5cbi8vIG1lZGlhc2Z1IGZ1bmN0aW9uc1xuaW1wb3J0IHsgVXBkYXRlTWluaUNhcmRzR3JpZCB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy91cGRhdGUtbWluaS1jYXJkcy1ncmlkLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWl4U3RyZWFtcyB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9taXgtc3RyZWFtcy5zZXJ2aWNlJztcbmltcG9ydCB7IERpc3BTdHJlYW1zIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL2Rpc3Atc3RyZWFtcy5zZXJ2aWNlJztcbmltcG9ydCB7IFN0b3BTaGFyZVNjcmVlbiB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9zdG9wLXNoYXJlLXNjcmVlbi5zZXJ2aWNlJztcbmltcG9ydCB7IENoZWNrU2NyZWVuU2hhcmUgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvY2hlY2stc2NyZWVuLXNoYXJlLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3RhcnRTaGFyZVNjcmVlbiB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9zdGFydC1zaGFyZS1zY3JlZW4uc2VydmljZSc7XG5pbXBvcnQgeyBSZXF1ZXN0U2NyZWVuU2hhcmUgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvcmVxdWVzdC1zY3JlZW4tc2hhcmUuc2VydmljZSc7XG5pbXBvcnQgeyBSZW9yZGVyU3RyZWFtcyB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9yZW9yZGVyLXN0cmVhbXMuc2VydmljZSc7XG5pbXBvcnQgeyBQcmVwb3B1bGF0ZVVzZXJNZWRpYSB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9wcmVwb3B1bGF0ZS11c2VyLW1lZGlhLnNlcnZpY2UnO1xuaW1wb3J0IHsgR2V0VmlkZW9zIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL2dldC12aWRlb3Muc2VydmljZSc7XG5pbXBvcnQgeyBSZVBvcnQgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvcmUtcG9ydC5zZXJ2aWNlJztcbmltcG9ydCB7IFRyaWdnZXIgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvdHJpZ2dlci5zZXJ2aWNlJztcbmltcG9ydCB7IENvbnN1bWVyUmVzdW1lIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL2NvbnN1bWVyLXJlc3VtZS5zZXJ2aWNlJztcbmltcG9ydCB7IENvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW8gfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvY29ubmVjdC1zZW5kLXRyYW5zcG9ydC1hdWRpby5zZXJ2aWNlJztcbmltcG9ydCB7IENvbm5lY3RTZW5kVHJhbnNwb3J0VmlkZW8gfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvY29ubmVjdC1zZW5kLXRyYW5zcG9ydC12aWRlby5zZXJ2aWNlJztcbmltcG9ydCB7IENvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL2Nvbm5lY3Qtc2VuZC10cmFuc3BvcnQtc2NyZWVuLnNlcnZpY2UnO1xuaW1wb3J0IHsgUHJvY2Vzc0NvbnN1bWVyVHJhbnNwb3J0cyB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9wcm9jZXNzLWNvbnN1bWVyLXRyYW5zcG9ydHMuc2VydmljZSc7XG5pbXBvcnQgeyBSZXN1bWVQYXVzZVN0cmVhbXMgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvcmVzdW1lLXBhdXNlLXN0cmVhbXMuc2VydmljZSc7XG5pbXBvcnQgeyBSZWFkanVzdCB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9yZWFkanVzdC5zZXJ2aWNlJztcbmltcG9ydCB7IENoZWNrR3JpZCB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9jaGVjay1ncmlkLnNlcnZpY2UnO1xuaW1wb3J0IHsgR2V0RXN0aW1hdGUgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvZ2V0LWVzdGltYXRlLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2FsY3VsYXRlUm93c0FuZENvbHVtbnMgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvY2FsY3VsYXRlLXJvd3MtYW5kLWNvbHVtbnMuc2VydmljZSc7XG5pbXBvcnQgeyBBZGRWaWRlb3NHcmlkIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL2FkZC12aWRlb3MtZ3JpZC5zZXJ2aWNlJztcbmltcG9ydCB7IE9uU2NyZWVuQ2hhbmdlcyB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9vbi1zY3JlZW4tY2hhbmdlcy5zZXJ2aWNlJztcbmltcG9ydCB7IHNsZWVwIH0gZnJvbSAnLi4vLi4vbWV0aG9kcy91dGlscy9zbGVlcC51dGlsJztcbmltcG9ydCB7IENoYW5nZVZpZHMgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvY2hhbmdlLXZpZHMuc2VydmljZSc7XG5pbXBvcnQgeyBDb21wYXJlQWN0aXZlTmFtZXMgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvY29tcGFyZS1hY3RpdmUtbmFtZXMuc2VydmljZSc7XG5pbXBvcnQgeyBDb21wYXJlU2NyZWVuU3RhdGVzIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL2NvbXBhcmUtc2NyZWVuLXN0YXRlcy5zZXJ2aWNlJztcbmltcG9ydCB7IENyZWF0ZVNlbmRUcmFuc3BvcnQgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvY3JlYXRlLXNlbmQtdHJhbnNwb3J0LnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVzdW1lU2VuZFRyYW5zcG9ydEF1ZGlvIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL3Jlc3VtZS1zZW5kLXRyYW5zcG9ydC1hdWRpby5zZXJ2aWNlJztcbmltcG9ydCB7IFJlY2VpdmVBbGxQaXBlZFRyYW5zcG9ydHMgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvcmVjZWl2ZS1hbGwtcGlwZWQtdHJhbnNwb3J0cy5zZXJ2aWNlJztcbmltcG9ydCB7IERpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0VmlkZW8gfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvZGlzY29ubmVjdC1zZW5kLXRyYW5zcG9ydC12aWRlby5zZXJ2aWNlJztcbmltcG9ydCB7IERpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW8gfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvZGlzY29ubmVjdC1zZW5kLXRyYW5zcG9ydC1hdWRpby5zZXJ2aWNlJztcbmltcG9ydCB7IERpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL2Rpc2Nvbm5lY3Qtc2VuZC10cmFuc3BvcnQtc2NyZWVuLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29ubmVjdFNlbmRUcmFuc3BvcnQgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvY29ubmVjdC1zZW5kLXRyYW5zcG9ydC5zZXJ2aWNlJztcbmltcG9ydCB7IEdldFBpcGVkUHJvZHVjZXJzQWx0IH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL2dldC1waXBlZC1wcm9kdWNlcnMtYWx0LnNlcnZpY2UnO1xuaW1wb3J0IHsgU2lnbmFsTmV3Q29uc3VtZXJUcmFuc3BvcnQgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvc2lnbmFsLW5ldy1jb25zdW1lci10cmFuc3BvcnQuc2VydmljZSc7XG5pbXBvcnQgeyBDb25uZWN0UmVjdlRyYW5zcG9ydCB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9jb25uZWN0LXJlY3YtdHJhbnNwb3J0LnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVVcGRhdGVJbnRlciB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9yZS11cGRhdGUtaW50ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBVcGRhdGVQYXJ0aWNpcGFudEF1ZGlvRGVjaWJlbHMgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvdXBkYXRlLXBhcnRpY2lwYW50LWF1ZGlvLWRlY2liZWxzLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2xvc2VBbmRSZXNpemUgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvY2xvc2UtYW5kLXJlc2l6ZS5zZXJ2aWNlJztcbmltcG9ydCB7IEF1dG9BZGp1c3QgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvYXV0by1hZGp1c3Quc2VydmljZSc7XG5pbXBvcnQgeyBTd2l0Y2hVc2VyVmlkZW9BbHQgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvc3dpdGNoLXVzZXItdmlkZW8tYWx0LnNlcnZpY2UnO1xuaW1wb3J0IHsgU3dpdGNoVXNlclZpZGVvIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL3N3aXRjaC11c2VyLXZpZGVvLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3dpdGNoVXNlckF1ZGlvIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL3N3aXRjaC11c2VyLWF1ZGlvLnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVjZWl2ZVJvb21NZXNzYWdlcyB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9yZWNlaXZlLXJvb20tbWVzc2FnZXMuc2VydmljZSc7XG5pbXBvcnQgeyBGb3JtYXROdW1iZXIgfSBmcm9tICcuLi8uLi9tZXRob2RzL3V0aWxzL2Zvcm1hdC1udW1iZXIuc2VydmljZSc7XG5pbXBvcnQgeyBDb25uZWN0SXBzIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL2Nvbm5lY3QtaXBzLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBQb2xsVXBkYXRlZCB9IGZyb20gJy4uLy4uL21ldGhvZHMvcG9sbHMtbWV0aG9kcy9wb2xsLXVwZGF0ZWQuc2VydmljZSc7XG5pbXBvcnQgeyBIYW5kbGVDcmVhdGVQb2xsIH0gZnJvbSAnLi4vLi4vbWV0aG9kcy9wb2xscy1tZXRob2RzL2hhbmRsZS1jcmVhdGUtcG9sbC5zZXJ2aWNlJztcbmltcG9ydCB7IEhhbmRsZVZvdGVQb2xsIH0gZnJvbSAnLi4vLi4vbWV0aG9kcy9wb2xscy1tZXRob2RzL2hhbmRsZS12b3RlLXBvbGwuc2VydmljZSc7XG5pbXBvcnQgeyBIYW5kbGVFbmRQb2xsIH0gZnJvbSAnLi4vLi4vbWV0aG9kcy9wb2xscy1tZXRob2RzL2hhbmRsZS1lbmQtcG9sbC5zZXJ2aWNlJztcblxuaW1wb3J0IHsgQnJlYWtvdXRSb29tVXBkYXRlZCB9IGZyb20gJy4uLy4uL21ldGhvZHMvYnJlYWtvdXQtcm9vbS1tZXRob2RzL2JyZWFrb3V0LXJvb20tdXBkYXRlZC5zZXJ2aWNlJztcblxuaW1wb3J0IHsgU3RhcnRNZWV0aW5nUHJvZ3Jlc3NUaW1lciB9IGZyb20gJy4uLy4uL21ldGhvZHMvdXRpbHMvbWVldGluZy10aW1lci9zdGFydC1tZWV0aW5nLXByb2dyZXNzLXRpbWVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgVXBkYXRlUmVjb3JkaW5nIH0gZnJvbSAnLi4vLi4vbWV0aG9kcy9yZWNvcmRpbmctbWV0aG9kcy91cGRhdGUtcmVjb3JkaW5nLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3RvcFJlY29yZGluZyB9IGZyb20gJy4uLy4uL21ldGhvZHMvcmVjb3JkaW5nLW1ldGhvZHMvc3RvcC1yZWNvcmRpbmcuc2VydmljZSc7XG5cbmltcG9ydCB7IFVzZXJXYWl0aW5nIH0gZnJvbSAnLi4vLi4vcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvdXNlci13YWl0aW5nLnNlcnZpY2UnO1xuaW1wb3J0IHsgUGVyc29uSm9pbmVkIH0gZnJvbSAnLi4vLi4vcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvcGVyc29uLWpvaW5lZC5zZXJ2aWNlJztcbmltcG9ydCB7IEFsbFdhaXRpbmdSb29tTWVtYmVycyB9IGZyb20gJy4uLy4uL3Byb2R1Y2Vycy9zb2NrZXQtcmVjZWl2ZS1tZXRob2RzL2FsbC13YWl0aW5nLXJvb20tbWVtYmVycy5zZXJ2aWNlJztcbmltcG9ydCB7IFJvb21SZWNvcmRQYXJhbXMgfSBmcm9tICcuLi8uLi9wcm9kdWNlcnMvc29ja2V0LXJlY2VpdmUtbWV0aG9kcy9yb29tLXJlY29yZC1wYXJhbXMuc2VydmljZSc7XG5pbXBvcnQgeyBCYW5QYXJ0aWNpcGFudCB9IGZyb20gJy4uLy4uL3Byb2R1Y2Vycy9zb2NrZXQtcmVjZWl2ZS1tZXRob2RzL2Jhbi1wYXJ0aWNpcGFudC5zZXJ2aWNlJztcbmltcG9ydCB7IFVwZGF0ZWRDb0hvc3QgfSBmcm9tICcuLi8uLi9wcm9kdWNlcnMvc29ja2V0LXJlY2VpdmUtbWV0aG9kcy91cGRhdGVkLWNvLWhvc3Quc2VydmljZSc7XG5pbXBvcnQgeyBQYXJ0aWNpcGFudFJlcXVlc3RlZCB9IGZyb20gJy4uLy4uL3Byb2R1Y2Vycy9zb2NrZXQtcmVjZWl2ZS1tZXRob2RzL3BhcnRpY2lwYW50LXJlcXVlc3RlZC5zZXJ2aWNlJztcbmltcG9ydCB7IFNjcmVlblByb2R1Y2VySWQgfSBmcm9tICcuLi8uLi9wcm9kdWNlcnMvc29ja2V0LXJlY2VpdmUtbWV0aG9kcy9zY3JlZW4tcHJvZHVjZXItaWQuc2VydmljZSc7XG5pbXBvcnQgeyBVcGRhdGVNZWRpYVNldHRpbmdzIH0gZnJvbSAnLi4vLi4vcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvdXBkYXRlLW1lZGlhLXNldHRpbmdzLnNlcnZpY2UnO1xuaW1wb3J0IHsgUHJvZHVjZXJNZWRpYVBhdXNlZCB9IGZyb20gJy4uLy4uL3Byb2R1Y2Vycy9zb2NrZXQtcmVjZWl2ZS1tZXRob2RzL3Byb2R1Y2VyLW1lZGlhLXBhdXNlZC5zZXJ2aWNlJztcbmltcG9ydCB7IFByb2R1Y2VyTWVkaWFSZXN1bWVkIH0gZnJvbSAnLi4vLi4vcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvcHJvZHVjZXItbWVkaWEtcmVzdW1lZC5zZXJ2aWNlJztcbmltcG9ydCB7IFByb2R1Y2VyTWVkaWFDbG9zZWQgfSBmcm9tICcuLi8uLi9wcm9kdWNlcnMvc29ja2V0LXJlY2VpdmUtbWV0aG9kcy9wcm9kdWNlci1tZWRpYS1jbG9zZWQuc2VydmljZSc7XG5pbXBvcnQgeyBDb250cm9sTWVkaWFIb3N0IH0gZnJvbSAnLi4vLi4vcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvY29udHJvbC1tZWRpYS1ob3N0LnNlcnZpY2UnO1xuaW1wb3J0IHsgTWVldGluZ0VuZGVkIH0gZnJvbSAnLi4vLi4vcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvbWVldGluZy1lbmRlZC5zZXJ2aWNlJztcbmltcG9ydCB7IERpc2Nvbm5lY3RVc2VyU2VsZiB9IGZyb20gJy4uLy4uL3Byb2R1Y2Vycy9zb2NrZXQtcmVjZWl2ZS1tZXRob2RzL2Rpc2Nvbm5lY3QtdXNlci1zZWxmLnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVjZWl2ZU1lc3NhZ2UgfSBmcm9tICcuLi8uLi9wcm9kdWNlcnMvc29ja2V0LXJlY2VpdmUtbWV0aG9kcy9yZWNlaXZlLW1lc3NhZ2Uuc2VydmljZSc7XG5pbXBvcnQgeyBNZWV0aW5nVGltZVJlbWFpbmluZyB9IGZyb20gJy4uLy4uL3Byb2R1Y2Vycy9zb2NrZXQtcmVjZWl2ZS1tZXRob2RzL21lZXRpbmctdGltZS1yZW1haW5pbmcuc2VydmljZSc7XG5pbXBvcnQgeyBNZWV0aW5nU3RpbGxUaGVyZSB9IGZyb20gJy4uLy4uL3Byb2R1Y2Vycy9zb2NrZXQtcmVjZWl2ZS1tZXRob2RzL21lZXRpbmctc3RpbGwtdGhlcmUuc2VydmljZSc7XG5pbXBvcnQgeyBTdGFydFJlY29yZHMgfSBmcm9tICcuLi8uLi9wcm9kdWNlcnMvc29ja2V0LXJlY2VpdmUtbWV0aG9kcy9zdGFydC1yZWNvcmRzLnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVJbml0aWF0ZVJlY29yZGluZyB9IGZyb20gJy4uLy4uL3Byb2R1Y2Vycy9zb2NrZXQtcmVjZWl2ZS1tZXRob2RzL3JlLWluaXRpYXRlLXJlY29yZGluZy5zZXJ2aWNlJztcbmltcG9ydCB7IEdldERvbWFpbnMgfSBmcm9tICcuLi8uLi9wcm9kdWNlcnMvc29ja2V0LXJlY2VpdmUtbWV0aG9kcy9nZXQtZG9tYWlucy5zZXJ2aWNlJztcbmltcG9ydCB7IFVwZGF0ZUNvbnN1bWluZ0RvbWFpbnMgfSBmcm9tICcuLi8uLi9wcm9kdWNlcnMvc29ja2V0LXJlY2VpdmUtbWV0aG9kcy91cGRhdGUtY29uc3VtaW5nLWRvbWFpbnMuc2VydmljZSc7XG5pbXBvcnQgeyBSZWNvcmRpbmdOb3RpY2UgfSBmcm9tICcuLi8uLi9wcm9kdWNlcnMvc29ja2V0LXJlY2VpdmUtbWV0aG9kcy9yZWNvcmRpbmctbm90aWNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgVGltZUxlZnRSZWNvcmRpbmcgfSBmcm9tICcuLi8uLi9wcm9kdWNlcnMvc29ja2V0LXJlY2VpdmUtbWV0aG9kcy90aW1lLWxlZnQtcmVjb3JkaW5nLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3RvcHBlZFJlY29yZGluZyB9IGZyb20gJy4uLy4uL3Byb2R1Y2Vycy9zb2NrZXQtcmVjZWl2ZS1tZXRob2RzL3N0b3BwZWQtcmVjb3JkaW5nLnNlcnZpY2UnO1xuaW1wb3J0IHsgSG9zdFJlcXVlc3RSZXNwb25zZSB9IGZyb20gJy4uLy4uL3Byb2R1Y2Vycy9zb2NrZXQtcmVjZWl2ZS1tZXRob2RzL2hvc3QtcmVxdWVzdC1yZXNwb25zZS5zZXJ2aWNlJztcbmltcG9ydCB7IEFsbE1lbWJlcnMgfSBmcm9tICcuLi8uLi9wcm9kdWNlcnMvc29ja2V0LXJlY2VpdmUtbWV0aG9kcy9hbGwtbWVtYmVycy5zZXJ2aWNlJztcbmltcG9ydCB7IEFsbE1lbWJlcnNSZXN0IH0gZnJvbSAnLi4vLi4vcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvYWxsLW1lbWJlcnMtcmVzdC5zZXJ2aWNlJztcbmltcG9ydCB7IERpc2Nvbm5lY3QgfSBmcm9tICcuLi8uLi9wcm9kdWNlcnMvc29ja2V0LXJlY2VpdmUtbWV0aG9kcy9kaXNjb25uZWN0LnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBDYXB0dXJlQ2FudmFzU3RyZWFtIH0gZnJvbSAnLi4vLi4vbWV0aG9kcy93aGl0ZWJvYXJkLW1ldGhvZHMvY2FwdHVyZS1jYW52YXMtc3RyZWFtLnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVzdW1lUGF1c2VBdWRpb1N0cmVhbXMgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvcmVzdW1lLXBhdXNlLWF1ZGlvLXN0cmVhbXMuc2VydmljZSc7XG5pbXBvcnQgeyBQcm9jZXNzQ29uc3VtZXJUcmFuc3BvcnRzQXVkaW8gfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvcHJvY2Vzcy1jb25zdW1lci10cmFuc3BvcnRzLWF1ZGlvLnNlcnZpY2UnO1xuXG5pbXBvcnQge1xuICBEZXZpY2UsXG4gIFByb2R1Y2VyLFxuICBQcm9kdWNlck9wdGlvbnMsXG4gIFJ0cENhcGFiaWxpdGllcyxcbiAgVHJhbnNwb3J0LFxufSBmcm9tICdtZWRpYXNvdXAtY2xpZW50L2xpYi90eXBlcyc7XG5pbXBvcnQgeyBTZWxmaWVTZWdtZW50YXRpb24gfSBmcm9tICdAbWVkaWFwaXBlL3NlbGZpZV9zZWdtZW50YXRpb24nO1xuXG4vKipcbiAqIE9wdGlvbnMgZm9yIGNvbmZpZ3VyaW5nIHRoZSBNZWRpYXNmdVdlYmluYXIgY29tcG9uZW50LlxuICpcbiAqIEB0eXBlZGVmIHtPYmplY3R9IE1lZGlhc2Z1V2ViaW5hck9wdGlvbnNcbiAqIEBwcm9wZXJ0eSB7KG9wdGlvbnM6IFByZUpvaW5QYWdlT3B0aW9ucyB8IFdlbGNvbWVQYWdlT3B0aW9ucykgPT4gSFRNTEVsZW1lbnR9IFtQcmVqb2luUGFnZV0gLSBBIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhbiBIVE1MRWxlbWVudCBmb3IgdGhlIHByZS1qb2luIHBhZ2UuXG4gKiBAcHJvcGVydHkge3sgYXBpVXNlck5hbWU6IHN0cmluZzsgYXBpS2V5OiBzdHJpbmcgfX0gW2NyZWRlbnRpYWxzXSAtIENyZWRlbnRpYWxzIGZvciBBUEkgYWNjZXNzLCBpbmNsdWRpbmcgdXNlcm5hbWUgYW5kIEFQSSBrZXkuXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IFt1c2VMb2NhbFVJTW9kZV0gLSBGbGFnIHRvIGRldGVybWluZSBpZiB0aGUgbG9jYWwgVUkgbW9kZSBzaG91bGQgYmUgdXNlZC5cbiAqIEBwcm9wZXJ0eSB7U2VlZERhdGF9IFtzZWVkRGF0YV0gLSBEYXRhIHVzZWQgZm9yIHNlZWRpbmcgdGhlIGNvbXBvbmVudC5cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gW3VzZVNlZWRdIC0gRmxhZyB0byBkZXRlcm1pbmUgaWYgc2VlZCBkYXRhIHNob3VsZCBiZSB1c2VkLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFtpbWdTcmNdIC0gU291cmNlIFVSTCBmb3IgYW4gaW1hZ2UgdG8gYmUgdXNlZCBpbiB0aGUgY29tcG9uZW50LlxuICovXG5leHBvcnQgdHlwZSBNZWRpYXNmdVdlYmluYXJPcHRpb25zID0ge1xuICBQcmVqb2luUGFnZT86IChvcHRpb25zOiBQcmVKb2luUGFnZU9wdGlvbnMgfCBXZWxjb21lUGFnZU9wdGlvbnMpID0+IEhUTUxFbGVtZW50O1xuICBjcmVkZW50aWFscz86IHsgYXBpVXNlck5hbWU6IHN0cmluZzsgYXBpS2V5OiBzdHJpbmcgfTtcbiAgdXNlTG9jYWxVSU1vZGU/OiBib29sZWFuO1xuICBzZWVkRGF0YT86IFNlZWREYXRhO1xuICB1c2VTZWVkPzogYm9vbGVhbjtcbiAgaW1nU3JjPzogc3RyaW5nO1xufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLW1lZGlhc2Z1LXdlYmluYXInLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbXG4gICAgUm91dGVyT3V0bGV0LFxuICAgIENvbW1vbk1vZHVsZSxcbiAgICBCcmVha291dFJvb21zTW9kYWwsXG4gICAgQmFja2dyb3VuZE1vZGFsLFxuICAgIENvSG9zdE1vZGFsLFxuICAgIEFsZXJ0Q29tcG9uZW50LFxuICAgIEF1ZGlvR3JpZCxcbiAgICBDb250cm9sQnV0dG9uc0FsdENvbXBvbmVudCxcbiAgICBDb250cm9sQnV0dG9uc0NvbXBvbmVudCxcbiAgICBGbGV4aWJsZUdyaWQsXG4gICAgRmxleGlibGVWaWRlbyxcbiAgICBMb2FkaW5nTW9kYWwsXG4gICAgUGFnaW5hdGlvbixcbiAgICBTdWJBc3BlY3RDb21wb25lbnQsXG4gICAgRGlzcGxheVNldHRpbmdzTW9kYWwsXG4gICAgRXZlbnRTZXR0aW5nc01vZGFsLFxuICAgIENvbmZpcm1FeGl0TW9kYWwsXG4gICAgTWVkaWFTZXR0aW5nc01vZGFsLFxuICAgIE1lbnVNb2RhbCxcbiAgICBNZXNzYWdlc01vZGFsLFxuICAgIENvbmZpcm1IZXJlTW9kYWwsXG4gICAgU2hhcmVFdmVudE1vZGFsLFxuICAgIFdlbGNvbWVQYWdlLFxuICAgIFBhcnRpY2lwYW50c01vZGFsLFxuICAgIFBvbGxNb2RhbCxcbiAgICBSZWNvcmRpbmdNb2RhbCxcbiAgICBSZXF1ZXN0c01vZGFsLFxuICAgIE1haW5Bc3BlY3RDb21wb25lbnQsXG4gICAgTWFpbkNvbnRhaW5lckNvbXBvbmVudCxcbiAgICBNYWluR3JpZENvbXBvbmVudCxcbiAgICBNYWluU2NyZWVuQ29tcG9uZW50LFxuICAgIE90aGVyR3JpZENvbXBvbmVudCxcbiAgICBTY3JlZW5ib2FyZCxcbiAgICBTY3JlZW5ib2FyZE1vZGFsLFxuICAgIFdoaXRlYm9hcmQsXG4gICAgQ29uZmlndXJlV2hpdGVib2FyZE1vZGFsLFxuICAgIFdhaXRpbmdSb29tTW9kYWwsXG4gICAgTWVudVdpZGdldCxcbiAgICBNZXNzYWdlV2lkZ2V0LFxuICAgIE1lbnVSZWNvcmRXaWRnZXQsXG4gICAgUmVjb3JkVGltZXJXaWRnZXQsXG4gICAgTWVudVBhcnRpY2lwYW50c1dpZGdldCxcbiAgICBTY3JlZW5TaGFyZVdpZGdldCxcbiAgXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2XG4gICAgICBjbGFzcz1cIk1lZGlhU0ZVXCJcbiAgICAgIFtuZ1N0eWxlXT1cIntcbiAgICAgICAgaGVpZ2h0OiAnMTAwdmgnLFxuICAgICAgICB3aWR0aDogJzEwMHZ3JyxcbiAgICAgICAgbWF4V2lkdGg6ICcxMDB2dycsXG4gICAgICAgIG1heEhlaWdodDogJzEwMHZoJyxcbiAgICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nXG4gICAgICB9XCJcbiAgICA+XG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIXZhbGlkYXRlZC52YWx1ZTsgZWxzZSBtYWluQ29udGVudFwiPlxuICAgICAgICA8bmctY29udGFpbmVyXG4gICAgICAgICAgKm5nQ29tcG9uZW50T3V0bGV0PVwiXG4gICAgICAgICAgICBQcmVqb2luUGFnZUNvbXBvbmVudC5jb21wb25lbnQ7XG4gICAgICAgICAgICBpbmplY3RvcjogUHJlam9pblBhZ2VDb21wb25lbnQuaW5qZWN0b3JcbiAgICAgICAgICBcIlxuICAgICAgICA+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICAgIDxuZy10ZW1wbGF0ZSAjbWFpbkNvbnRlbnQ+XG4gICAgICAgIDxhcHAtbWFpbi1jb250YWluZXItY29tcG9uZW50PlxuICAgICAgICAgIDxhcHAtbWFpbi1hc3BlY3QtY29tcG9uZW50XG4gICAgICAgICAgICBbYmFja2dyb3VuZENvbG9yXT1cIidyZ2JhKDIxNywgMjI3LCAyMzQsIDAuOTkpJ1wiXG4gICAgICAgICAgICBbZGVmYXVsdEZyYWN0aW9uXT1cIjEgLSBjb250cm9sSGVpZ2h0LnZhbHVlXCJcbiAgICAgICAgICAgIFtzaG93Q29udHJvbHNdPVwiZXZlbnRUeXBlLnZhbHVlID09PSAnd2ViaW5hcicgfHwgZXZlbnRUeXBlLnZhbHVlID09PSAnY29uZmVyZW5jZSdcIlxuICAgICAgICAgICAgW3VwZGF0ZUlzV2lkZVNjcmVlbl09XCJ1cGRhdGVJc1dpZGVTY3JlZW5cIlxuICAgICAgICAgICAgW3VwZGF0ZUlzTWVkaXVtU2NyZWVuXT1cInVwZGF0ZUlzTWVkaXVtU2NyZWVuXCJcbiAgICAgICAgICAgIFt1cGRhdGVJc1NtYWxsU2NyZWVuXT1cInVwZGF0ZUlzU21hbGxTY3JlZW5cIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxhcHAtbWFpbi1zY3JlZW4tY29tcG9uZW50XG4gICAgICAgICAgICAgIFtkb1N0YWNrXT1cInRydWVcIlxuICAgICAgICAgICAgICBbbWFpblNpemVdPVwibWFpbkhlaWdodFdpZHRoLnZhbHVlXCJcbiAgICAgICAgICAgICAgW2RlZmF1bHRGcmFjdGlvbl09XCIxIC0gY29udHJvbEhlaWdodC52YWx1ZVwiXG4gICAgICAgICAgICAgIFtzaG93Q29udHJvbHNdPVwiZXZlbnRUeXBlLnZhbHVlID09PSAnd2ViaW5hcicgfHwgZXZlbnRUeXBlLnZhbHVlID09PSAnY29uZmVyZW5jZSdcIlxuICAgICAgICAgICAgICBbdXBkYXRlQ29tcG9uZW50U2l6ZXNdPVwidXBkYXRlQ29tcG9uZW50U2l6ZXNcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8YXBwLW1haW4tZ3JpZC1jb21wb25lbnRcbiAgICAgICAgICAgICAgICBbaGVpZ2h0XT1cImNvbXBvbmVudFNpemVzLnZhbHVlLm1haW5IZWlnaHRcIlxuICAgICAgICAgICAgICAgIFt3aWR0aF09XCJjb21wb25lbnRTaXplcy52YWx1ZS5tYWluV2lkdGhcIlxuICAgICAgICAgICAgICAgIFtiYWNrZ3JvdW5kQ29sb3JdPVwiJ3JnYmEoMjE3LCAyMjcsIDIzNCwgMC45OSknXCJcbiAgICAgICAgICAgICAgICBbbWFpblNpemVdPVwibWFpbkhlaWdodFdpZHRoLnZhbHVlXCJcbiAgICAgICAgICAgICAgICBbc2hvd0FzcGVjdF09XCJtYWluSGVpZ2h0V2lkdGgudmFsdWUgPiAwXCJcbiAgICAgICAgICAgICAgICBbdGltZUJhY2tncm91bmRDb2xvcl09XCJyZWNvcmRTdGF0ZS52YWx1ZVwiXG4gICAgICAgICAgICAgICAgW21lZXRpbmdQcm9ncmVzc1RpbWVdPVwibWVldGluZ1Byb2dyZXNzVGltZS52YWx1ZVwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8YXBwLWZsZXhpYmxlLXZpZGVvXG4gICAgICAgICAgICAgICAgICBbY3VzdG9tV2lkdGhdPVwiY29tcG9uZW50U2l6ZXMudmFsdWUubWFpbldpZHRoXCJcbiAgICAgICAgICAgICAgICAgIFtjdXN0b21IZWlnaHRdPVwiY29tcG9uZW50U2l6ZXMudmFsdWUubWFpbkhlaWdodFwiXG4gICAgICAgICAgICAgICAgICBbcm93c109XCIxXCJcbiAgICAgICAgICAgICAgICAgIFtjb2x1bW5zXT1cIjFcIlxuICAgICAgICAgICAgICAgICAgW2NvbXBvbmVudHNUb1JlbmRlcl09XCJtYWluR3JpZFN0cmVhbS52YWx1ZVwiXG4gICAgICAgICAgICAgICAgICBbc2hvd0FzcGVjdF09XCJcbiAgICAgICAgICAgICAgICAgICAgbWFpbkdyaWRTdHJlYW0udmFsdWUubGVuZ3RoID4gMCAmJlxuICAgICAgICAgICAgICAgICAgICAhKHdoaXRlYm9hcmRTdGFydGVkLnZhbHVlICYmICF3aGl0ZWJvYXJkRW5kZWQudmFsdWUpXG4gICAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgW2xvY2FsU3RyZWFtU2NyZWVuXT1cImxvY2FsU3RyZWFtU2NyZWVuLnZhbHVlIVwiXG4gICAgICAgICAgICAgICAgICBbYW5ub3RhdGVTY3JlZW5TdHJlYW1dPVwiYW5ub3RhdGVTY3JlZW5TdHJlYW0udmFsdWVcIlxuICAgICAgICAgICAgICAgICAgW1NjcmVlbmJvYXJkXT1cInNoYXJlZC52YWx1ZSA/IFNjcmVlbmJvYXJkV2lkZ2V0IDogdW5kZWZpbmVkXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPC9hcHAtZmxleGlibGUtdmlkZW8+XG4gICAgICAgICAgICAgICAgPGFwcC13aGl0ZWJvYXJkXG4gICAgICAgICAgICAgICAgICBbY3VzdG9tV2lkdGhdPVwiY29tcG9uZW50U2l6ZXMudmFsdWUubWFpbldpZHRoXCJcbiAgICAgICAgICAgICAgICAgIFtjdXN0b21IZWlnaHRdPVwiY29tcG9uZW50U2l6ZXMudmFsdWUubWFpbkhlaWdodFwiXG4gICAgICAgICAgICAgICAgICBbcGFyYW1ldGVyc109XCJtZWRpYVNGVVBhcmFtZXRlcnNcIlxuICAgICAgICAgICAgICAgICAgW3Nob3dBc3BlY3RdPVwid2hpdGVib2FyZFN0YXJ0ZWQudmFsdWUgJiYgIXdoaXRlYm9hcmRFbmRlZC52YWx1ZVwiXG4gICAgICAgICAgICAgICAgPjwvYXBwLXdoaXRlYm9hcmQ+XG4gICAgICAgICAgICAgIDwvYXBwLW1haW4tZ3JpZC1jb21wb25lbnQ+XG5cbiAgICAgICAgICAgICAgPGFwcC1vdGhlci1ncmlkLWNvbXBvbmVudFxuICAgICAgICAgICAgICAgIFtoZWlnaHRdPVwiY29tcG9uZW50U2l6ZXMudmFsdWUub3RoZXJIZWlnaHRcIlxuICAgICAgICAgICAgICAgIFt3aWR0aF09XCJjb21wb25lbnRTaXplcy52YWx1ZS5vdGhlcldpZHRoXCJcbiAgICAgICAgICAgICAgICBbYmFja2dyb3VuZENvbG9yXT1cIidyZ2JhKDIxNywgMjI3LCAyMzQsIDAuOTkpJ1wiXG4gICAgICAgICAgICAgICAgW3Nob3dBc3BlY3RdPVwibWFpbkhlaWdodFdpZHRoLnZhbHVlICE9PSAxMDBcIlxuICAgICAgICAgICAgICAgIFt0aW1lQmFja2dyb3VuZENvbG9yXT1cInJlY29yZFN0YXRlLnZhbHVlXCJcbiAgICAgICAgICAgICAgICBbc2hvd1RpbWVyXT1cIm1haW5IZWlnaHRXaWR0aC52YWx1ZSA9PT0gMFwiXG4gICAgICAgICAgICAgICAgW21lZXRpbmdQcm9ncmVzc1RpbWVdPVwibWVldGluZ1Byb2dyZXNzVGltZS52YWx1ZVwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAqbmdJZj1cImRvUGFnaW5hdGUudmFsdWVcIlxuICAgICAgICAgICAgICAgICAgW25nU3R5bGVdPVwie1xuICAgICAgICAgICAgICAgICAgICB3aWR0aDpcbiAgICAgICAgICAgICAgICAgICAgICBwYWdpbmF0aW9uRGlyZWN0aW9uLnZhbHVlID09ICdob3Jpem9udGFsJ1xuICAgICAgICAgICAgICAgICAgICAgICAgPyBjb21wb25lbnRTaXplcy52YWx1ZS5vdGhlcldpZHRoXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHBhZ2luYXRpb25IZWlnaHRXaWR0aC52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OlxuICAgICAgICAgICAgICAgICAgICAgIHBhZ2luYXRpb25EaXJlY3Rpb24udmFsdWUgPT0gJ2hvcml6b250YWwnXG4gICAgICAgICAgICAgICAgICAgICAgICA/IHBhZ2luYXRpb25IZWlnaHRXaWR0aC52YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgOiBjb21wb25lbnRTaXplcy52YWx1ZS5vdGhlckhlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogZG9QYWdpbmF0ZS52YWx1ZSA/ICdmbGV4JyA6ICdub25lJyxcbiAgICAgICAgICAgICAgICAgICAgJ2ZsZXgtZGlyZWN0aW9uJzogcGFnaW5hdGlvbkRpcmVjdGlvbi52YWx1ZSA9PSAnaG9yaXpvbnRhbCcgPyAncm93JyA6ICdjb2x1bW4nLFxuICAgICAgICAgICAgICAgICAgICAnanVzdGlmeS1jb250ZW50JzogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgICdhbGlnbi1pdGVtcyc6ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAnMCcsXG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbjogJzAnXG4gICAgICAgICAgICAgICAgICB9XCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8YXBwLXBhZ2luYXRpb25cbiAgICAgICAgICAgICAgICAgICAgW3RvdGFsUGFnZXNdPVwibnVtYmVyUGFnZXMudmFsdWVcIlxuICAgICAgICAgICAgICAgICAgICBbY3VycmVudFVzZXJQYWdlXT1cImN1cnJlbnRVc2VyUGFnZS52YWx1ZVwiXG4gICAgICAgICAgICAgICAgICAgIFtzaG93QXNwZWN0XT1cImRvUGFnaW5hdGUudmFsdWVcIlxuICAgICAgICAgICAgICAgICAgICBbcGFnaW5hdGlvbkhlaWdodF09XCJwYWdpbmF0aW9uSGVpZ2h0V2lkdGgudmFsdWVcIlxuICAgICAgICAgICAgICAgICAgICBbZGlyZWN0aW9uXT1cInBhZ2luYXRpb25EaXJlY3Rpb24udmFsdWVcIlxuICAgICAgICAgICAgICAgICAgICBbcGFyYW1ldGVyc109XCJtZWRpYVNGVVBhcmFtZXRlcnNcIlxuICAgICAgICAgICAgICAgICAgPjwvYXBwLXBhZ2luYXRpb24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8YXBwLWF1ZGlvLWdyaWQgW2NvbXBvbmVudHNUb1JlbmRlcl09XCJhdWRpb09ubHlTdHJlYW1zLnZhbHVlXCI+PC9hcHAtYXVkaW8tZ3JpZD5cblxuICAgICAgICAgICAgICAgIDxhcHAtZmxleGlibGUtZ3JpZFxuICAgICAgICAgICAgICAgICAgW2N1c3RvbVdpZHRoXT1cImdyaWRTaXplcy52YWx1ZS5ncmlkV2lkdGghXCJcbiAgICAgICAgICAgICAgICAgIFtjdXN0b21IZWlnaHRdPVwiZ3JpZFNpemVzLnZhbHVlLmdyaWRIZWlnaHQhXCJcbiAgICAgICAgICAgICAgICAgIFtyb3dzXT1cImdyaWRSb3dzLnZhbHVlXCJcbiAgICAgICAgICAgICAgICAgIFtjb2x1bW5zXT1cImdyaWRDb2xzLnZhbHVlXCJcbiAgICAgICAgICAgICAgICAgIFtjb21wb25lbnRzVG9SZW5kZXJdPVwib3RoZXJHcmlkU3RyZWFtcy52YWx1ZVswXVwiXG4gICAgICAgICAgICAgICAgICBbYmFja2dyb3VuZENvbG9yXT1cIidyZ2JhKDIxNywgMjI3LCAyMzQsIDAuOTkpJ1wiXG4gICAgICAgICAgICAgICAgPjwvYXBwLWZsZXhpYmxlLWdyaWQ+XG4gICAgICAgICAgICAgICAgPGFwcC1mbGV4aWJsZS1ncmlkXG4gICAgICAgICAgICAgICAgICBbY3VzdG9tV2lkdGhdPVwiZ3JpZFNpemVzLnZhbHVlLmFsdEdyaWRXaWR0aCFcIlxuICAgICAgICAgICAgICAgICAgW2N1c3RvbUhlaWdodF09XCJncmlkU2l6ZXMudmFsdWUuYWx0R3JpZEhlaWdodCFcIlxuICAgICAgICAgICAgICAgICAgW3Jvd3NdPVwiYWx0R3JpZFJvd3MudmFsdWVcIlxuICAgICAgICAgICAgICAgICAgW2NvbHVtbnNdPVwiYWx0R3JpZENvbHMudmFsdWVcIlxuICAgICAgICAgICAgICAgICAgW2NvbXBvbmVudHNUb1JlbmRlcl09XCJvdGhlckdyaWRTdHJlYW1zLnZhbHVlWzFdXCJcbiAgICAgICAgICAgICAgICAgIFtiYWNrZ3JvdW5kQ29sb3JdPVwiJ3JnYmEoMjE3LCAyMjcsIDIzNCwgMC45OSknXCJcbiAgICAgICAgICAgICAgICA+PC9hcHAtZmxleGlibGUtZ3JpZD5cbiAgICAgICAgICAgICAgPC9hcHAtb3RoZXItZ3JpZC1jb21wb25lbnQ+XG4gICAgICAgICAgICA8L2FwcC1tYWluLXNjcmVlbi1jb21wb25lbnQ+XG4gICAgICAgICAgPC9hcHAtbWFpbi1hc3BlY3QtY29tcG9uZW50PlxuXG4gICAgICAgICAgPGFwcC1zdWItYXNwZWN0LWNvbXBvbmVudFxuICAgICAgICAgICAgW2JhY2tncm91bmRDb2xvcl09XCIncmdiYSgyMTcsIDIyNywgMjM0LCAwLjk5KSdcIlxuICAgICAgICAgICAgW3Nob3dDb250cm9sc109XCJldmVudFR5cGUudmFsdWUgPT09ICd3ZWJpbmFyJyB8fCBldmVudFR5cGUudmFsdWUgPT09ICdjb25mZXJlbmNlJ1wiXG4gICAgICAgICAgICBbZGVmYXVsdEZyYWN0aW9uU3ViXT1cImNvbnRyb2xIZWlnaHQudmFsdWVcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxhcHAtY29udHJvbC1idXR0b25zLWNvbXBvbmVudFxuICAgICAgICAgICAgICBbYnV0dG9uc109XCJjb250cm9sQnV0dG9uc1wiXG4gICAgICAgICAgICAgIFtidXR0b25Db2xvcl09XCInYmxhY2snXCJcbiAgICAgICAgICAgICAgW2J1dHRvbkJhY2tncm91bmRDb2xvcl09XCJ7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDogJ3RyYW5zcGFyZW50JyxcbiAgICAgICAgICAgICAgICBwcmVzc2VkOiAndHJhbnNwYXJlbnQnXG4gICAgICAgICAgICAgIH1cIlxuICAgICAgICAgICAgICBbYWxpZ25tZW50XT1cIidzcGFjZS1iZXR3ZWVuJ1wiXG4gICAgICAgICAgICAgIFt2ZXJ0aWNhbF09XCJmYWxzZVwiXG4gICAgICAgICAgICAgIFtidXR0b25zQ29udGFpbmVyU3R5bGVdPVwie1xuICAgICAgICAgICAgICAgIG1hcmdpblRvcDogJzAnLFxuICAgICAgICAgICAgICAgIG1hcmdpbkJvdHRvbTogJzAnLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3RyYW5zcGFyZW50J1xuICAgICAgICAgICAgICB9XCJcbiAgICAgICAgICAgID48L2FwcC1jb250cm9sLWJ1dHRvbnMtY29tcG9uZW50PlxuICAgICAgICAgIDwvYXBwLXN1Yi1hc3BlY3QtY29tcG9uZW50PlxuICAgICAgICA8L2FwcC1tYWluLWNvbnRhaW5lci1jb21wb25lbnQ+XG4gICAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgICA8YXBwLW1lbnUtbW9kYWxcbiAgICAgICAgW2JhY2tncm91bmRDb2xvcl09XCIncmdiYSgxODEsIDIzMywgMjI5LCAwLjk3KSdcIlxuICAgICAgICBbaXNWaXNpYmxlXT1cImlzTWVudU1vZGFsVmlzaWJsZS52YWx1ZVwiXG4gICAgICAgIFtvbkNsb3NlXT1cIm9uQ2xvc2VNZW51TW9kYWxcIlxuICAgICAgICBbY3VzdG9tQnV0dG9uc109XCJjdXN0b21NZW51QnV0dG9uc1wiXG4gICAgICAgIFtyb29tTmFtZV09XCJyb29tTmFtZS52YWx1ZVwiXG4gICAgICAgIFthZG1pblBhc3Njb2RlXT1cImFkbWluUGFzc2NvZGUudmFsdWVcIlxuICAgICAgICBbaXNsZXZlbF09XCJpc2xldmVsLnZhbHVlXCJcbiAgICAgID48L2FwcC1tZW51LW1vZGFsPlxuXG4gICAgICA8YXBwLWV2ZW50LXNldHRpbmdzLW1vZGFsXG4gICAgICAgIFtiYWNrZ3JvdW5kQ29sb3JdPVwiJ3JnYmEoMjE3LCAyMjcsIDIzNCwgMC45OSknXCJcbiAgICAgICAgW2lzRXZlbnRTZXR0aW5nc01vZGFsVmlzaWJsZV09XCJpc1NldHRpbmdzTW9kYWxWaXNpYmxlLnZhbHVlXCJcbiAgICAgICAgW29uRXZlbnRTZXR0aW5nc0Nsb3NlXT1cIm9uRXZlbnRTZXR0aW5nc0Nsb3NlXCJcbiAgICAgICAgW2F1ZGlvU2V0dGluZ109XCJhdWRpb1NldHRpbmcudmFsdWVcIlxuICAgICAgICBbdmlkZW9TZXR0aW5nXT1cInZpZGVvU2V0dGluZy52YWx1ZVwiXG4gICAgICAgIFtzY3JlZW5zaGFyZVNldHRpbmddPVwic2NyZWVuc2hhcmVTZXR0aW5nLnZhbHVlXCJcbiAgICAgICAgW2NoYXRTZXR0aW5nXT1cImNoYXRTZXR0aW5nLnZhbHVlXCJcbiAgICAgICAgW3VwZGF0ZUF1ZGlvU2V0dGluZ109XCJ1cGRhdGVBdWRpb1NldHRpbmdcIlxuICAgICAgICBbdXBkYXRlVmlkZW9TZXR0aW5nXT1cInVwZGF0ZVZpZGVvU2V0dGluZ1wiXG4gICAgICAgIFt1cGRhdGVTY3JlZW5zaGFyZVNldHRpbmddPVwidXBkYXRlU2NyZWVuc2hhcmVTZXR0aW5nXCJcbiAgICAgICAgW3VwZGF0ZUNoYXRTZXR0aW5nXT1cInVwZGF0ZUNoYXRTZXR0aW5nXCJcbiAgICAgICAgW3VwZGF0ZUlzU2V0dGluZ3NNb2RhbFZpc2libGVdPVwidXBkYXRlSXNTZXR0aW5nc01vZGFsVmlzaWJsZVwiXG4gICAgICAgIFtyb29tTmFtZV09XCJyb29tTmFtZS52YWx1ZVwiXG4gICAgICAgIFtzb2NrZXRdPVwic29ja2V0LnZhbHVlXCJcbiAgICAgICAgW3Nob3dBbGVydF09XCJzaG93QWxlcnRcIlxuICAgICAgPjwvYXBwLWV2ZW50LXNldHRpbmdzLW1vZGFsPlxuXG4gICAgICA8YXBwLXJlcXVlc3RzLW1vZGFsXG4gICAgICAgIFtiYWNrZ3JvdW5kQ29sb3JdPVwiJ3JnYmEoMjE3LCAyMjcsIDIzNCwgMC45OSknXCJcbiAgICAgICAgW2lzUmVxdWVzdHNNb2RhbFZpc2libGVdPVwiaXNSZXF1ZXN0c01vZGFsVmlzaWJsZS52YWx1ZVwiXG4gICAgICAgIFtvblJlcXVlc3RDbG9zZV09XCJvblJlcXVlc3RDbG9zZVwiXG4gICAgICAgIFtyZXF1ZXN0Q291bnRlcl09XCJyZXF1ZXN0Q291bnRlci52YWx1ZVwiXG4gICAgICAgIFtvblJlcXVlc3RGaWx0ZXJDaGFuZ2VdPVwib25SZXF1ZXN0RmlsdGVyQ2hhbmdlXCJcbiAgICAgICAgW3VwZGF0ZVJlcXVlc3RMaXN0XT1cInVwZGF0ZVJlcXVlc3RMaXN0XCJcbiAgICAgICAgW3JlcXVlc3RMaXN0XT1cImZpbHRlcmVkUmVxdWVzdExpc3QudmFsdWVcIlxuICAgICAgICBbcm9vbU5hbWVdPVwicm9vbU5hbWUudmFsdWVcIlxuICAgICAgICBbc29ja2V0XT1cInNvY2tldC52YWx1ZVwiXG4gICAgICAgIFtwYXJhbWV0ZXJzXT1cIm1lZGlhU0ZVUGFyYW1ldGVyc1wiXG4gICAgICA+PC9hcHAtcmVxdWVzdHMtbW9kYWw+XG5cbiAgICAgIDxhcHAtd2FpdGluZy1yb29tLW1vZGFsXG4gICAgICAgIFtiYWNrZ3JvdW5kQ29sb3JdPVwiJ3JnYmEoMjE3LCAyMjcsIDIzNCwgMC45OSknXCJcbiAgICAgICAgW2lzV2FpdGluZ01vZGFsVmlzaWJsZV09XCJpc1dhaXRpbmdNb2RhbFZpc2libGUudmFsdWVcIlxuICAgICAgICBbb25XYWl0aW5nUm9vbUNsb3NlXT1cIm9uV2FpdGluZ1Jvb21DbG9zZVwiXG4gICAgICAgIFt3YWl0aW5nUm9vbUNvdW50ZXJdPVwid2FpdGluZ1Jvb21Db3VudGVyLnZhbHVlXCJcbiAgICAgICAgW29uV2FpdGluZ1Jvb21GaWx0ZXJDaGFuZ2VdPVwib25XYWl0aW5nUm9vbUZpbHRlckNoYW5nZVwiXG4gICAgICAgIFt3YWl0aW5nUm9vbUxpc3RdPVwiZmlsdGVyZWRXYWl0aW5nUm9vbUxpc3QudmFsdWVcIlxuICAgICAgICBbdXBkYXRlV2FpdGluZ0xpc3RdPVwidXBkYXRlV2FpdGluZ1Jvb21MaXN0XCJcbiAgICAgICAgW3Jvb21OYW1lXT1cInJvb21OYW1lLnZhbHVlXCJcbiAgICAgICAgW3NvY2tldF09XCJzb2NrZXQudmFsdWVcIlxuICAgICAgICBbcGFyYW1ldGVyc109XCJ7XG4gICAgICAgICAgICAgICAgICAgICAgZmlsdGVyZWRXYWl0aW5nUm9vbUxpc3Q6IHdhaXRpbmdSb29tTGlzdC52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICBnZXRVcGRhdGVkQWxsUGFyYW1zOiBnZXRVcGRhdGVkQWxsUGFyYW1zLFxuICAgICAgICAgICAgICAgICAgICB9XCJcbiAgICAgID48L2FwcC13YWl0aW5nLXJvb20tbW9kYWw+XG5cbiAgICAgIDxhcHAtY28taG9zdC1tb2RhbFxuICAgICAgICBbYmFja2dyb3VuZENvbG9yXT1cIidyZ2JhKDIxNywgMjI3LCAyMzQsIDAuOTkpJ1wiXG4gICAgICAgIFtpc0NvSG9zdE1vZGFsVmlzaWJsZV09XCJpc0NvSG9zdE1vZGFsVmlzaWJsZS52YWx1ZVwiXG4gICAgICAgIFtvbkNvSG9zdENsb3NlXT1cIm9uQ29Ib3N0Q2xvc2VcIlxuICAgICAgICBbY29Ib3N0UmVzcG9uc2liaWxpdHldPVwiY29Ib3N0UmVzcG9uc2liaWxpdHkudmFsdWVcIlxuICAgICAgICBbcGFydGljaXBhbnRzXT1cInBhcnRpY2lwYW50cy52YWx1ZVwiXG4gICAgICAgIFtjdXJyZW50Q29ob3N0XT1cImNvSG9zdC52YWx1ZVwiXG4gICAgICAgIFtyb29tTmFtZV09XCJyb29tTmFtZS52YWx1ZVwiXG4gICAgICAgIFtzaG93QWxlcnRdPVwic2hvd0FsZXJ0XCJcbiAgICAgICAgW3VwZGF0ZUNvSG9zdFJlc3BvbnNpYmlsaXR5XT1cInVwZGF0ZUNvSG9zdFJlc3BvbnNpYmlsaXR5XCJcbiAgICAgICAgW3VwZGF0ZUNvSG9zdF09XCJ1cGRhdGVDb0hvc3RcIlxuICAgICAgICBbdXBkYXRlSXNDb0hvc3RNb2RhbFZpc2libGVdPVwidXBkYXRlSXNDb0hvc3RNb2RhbFZpc2libGVcIlxuICAgICAgICBbc29ja2V0XT1cInNvY2tldC52YWx1ZVwiXG4gICAgICA+PC9hcHAtY28taG9zdC1tb2RhbD5cblxuICAgICAgPGFwcC1tZWRpYS1zZXR0aW5ncy1tb2RhbFxuICAgICAgICBbYmFja2dyb3VuZENvbG9yXT1cIidyZ2JhKDE4MSwgMjMzLCAyMjksIDAuOTcpJ1wiXG4gICAgICAgIFtpc01lZGlhU2V0dGluZ3NNb2RhbFZpc2libGVdPVwiaXNNZWRpYVNldHRpbmdzTW9kYWxWaXNpYmxlLnZhbHVlXCJcbiAgICAgICAgW29uTWVkaWFTZXR0aW5nc0Nsb3NlXT1cIm9uTWVkaWFTZXR0aW5nc0Nsb3NlXCJcbiAgICAgICAgW3BhcmFtZXRlcnNdPVwibWVkaWFTRlVQYXJhbWV0ZXJzXCJcbiAgICAgID48L2FwcC1tZWRpYS1zZXR0aW5ncy1tb2RhbD5cblxuICAgICAgPGFwcC1wYXJ0aWNpcGFudHMtbW9kYWxcbiAgICAgICAgW2JhY2tncm91bmRDb2xvcl09XCIncmdiYSgyMTcsIDIyNywgMjM0LCAwLjk5KSdcIlxuICAgICAgICBbaXNQYXJ0aWNpcGFudHNNb2RhbFZpc2libGVdPVwiaXNQYXJ0aWNpcGFudHNNb2RhbFZpc2libGUudmFsdWVcIlxuICAgICAgICBbb25QYXJ0aWNpcGFudHNDbG9zZV09XCJvblBhcnRpY2lwYW50c0Nsb3NlXCJcbiAgICAgICAgW3BhcnRpY2lwYW50c0NvdW50ZXJdPVwicGFydGljaXBhbnRzQ291bnRlci52YWx1ZVwiXG4gICAgICAgIFtvblBhcnRpY2lwYW50c0ZpbHRlckNoYW5nZV09XCJvblBhcnRpY2lwYW50c0ZpbHRlckNoYW5nZVwiXG4gICAgICAgIFtwYXJhbWV0ZXJzXT1cIntcbiAgICAgICAgICAgICAgdXBkYXRlUGFydGljaXBhbnRzOiB1cGRhdGVQYXJ0aWNpcGFudHMsXG4gICAgICAgICAgICAgIGZpbHRlcmVkUGFydGljaXBhbnRzOiBmaWx0ZXJlZFBhcnRpY2lwYW50cy52YWx1ZSxcbiAgICAgICAgICAgICAgdXBkYXRlSXNQYXJ0aWNpcGFudHNNb2RhbFZpc2libGU6IHVwZGF0ZUlzUGFydGljaXBhbnRzTW9kYWxWaXNpYmxlLFxuICAgICAgICAgICAgICB1cGRhdGVEaXJlY3RNZXNzYWdlRGV0YWlsczogdXBkYXRlRGlyZWN0TWVzc2FnZURldGFpbHMsXG4gICAgICAgICAgICAgIHVwZGF0ZVN0YXJ0RGlyZWN0TWVzc2FnZTogdXBkYXRlU3RhcnREaXJlY3RNZXNzYWdlLFxuICAgICAgICAgICAgICB1cGRhdGVJc01lc3NhZ2VzTW9kYWxWaXNpYmxlOiB1cGRhdGVJc01lc3NhZ2VzTW9kYWxWaXNpYmxlLFxuICAgICAgICAgICAgICBzaG93QWxlcnQ6IHNob3dBbGVydCxcbiAgICAgICAgICAgICAgcGFydGljaXBhbnRzOiBmaWx0ZXJlZFBhcnRpY2lwYW50cy52YWx1ZSxcbiAgICAgICAgICAgICAgcm9vbU5hbWU6IHJvb21OYW1lLnZhbHVlLFxuICAgICAgICAgICAgICBpc2xldmVsOiBpc2xldmVsLnZhbHVlLFxuICAgICAgICAgICAgICBtZW1iZXI6IG1lbWJlci52YWx1ZSxcbiAgICAgICAgICAgICAgY29Ib3N0UmVzcG9uc2liaWxpdHk6IGNvSG9zdFJlc3BvbnNpYmlsaXR5LnZhbHVlLFxuICAgICAgICAgICAgICBjb0hvc3Q6IGNvSG9zdC52YWx1ZSxcbiAgICAgICAgICAgICAgZXZlbnRUeXBlOiBldmVudFR5cGUudmFsdWUsXG4gICAgICAgICAgICAgIHN0YXJ0RGlyZWN0TWVzc2FnZTogc3RhcnREaXJlY3RNZXNzYWdlLnZhbHVlLFxuICAgICAgICAgICAgICBkaXJlY3RNZXNzYWdlRGV0YWlsczogZGlyZWN0TWVzc2FnZURldGFpbHMudmFsdWUsXG4gICAgICAgICAgICAgIHNvY2tldDogc29ja2V0LnZhbHVlLFxuICAgICAgICAgICAgICBnZXRVcGRhdGVkQWxsUGFyYW1zOiBnZXRVcGRhdGVkQWxsUGFyYW1zLFxuICAgICAgICAgICAgfVwiXG4gICAgICA+PC9hcHAtcGFydGljaXBhbnRzLW1vZGFsPlxuXG4gICAgICA8YXBwLWRpc3BsYXktc2V0dGluZ3MtbW9kYWxcbiAgICAgICAgW2JhY2tncm91bmRDb2xvcl09XCIncmdiYSgyMTcsIDIyNywgMjM0LCAwLjk5KSdcIlxuICAgICAgICBbaXNEaXNwbGF5U2V0dGluZ3NNb2RhbFZpc2libGVdPVwiaXNEaXNwbGF5U2V0dGluZ3NNb2RhbFZpc2libGUudmFsdWVcIlxuICAgICAgICBbb25EaXNwbGF5U2V0dGluZ3NDbG9zZV09XCJvbkRpc3BsYXlTZXR0aW5nc0Nsb3NlXCJcbiAgICAgICAgW3BhcmFtZXRlcnNdPVwibWVkaWFTRlVQYXJhbWV0ZXJzXCJcbiAgICAgID48L2FwcC1kaXNwbGF5LXNldHRpbmdzLW1vZGFsPlxuXG4gICAgICA8YXBwLXJlY29yZGluZy1tb2RhbFxuICAgICAgICBbYmFja2dyb3VuZENvbG9yXT1cIidyZ2JhKDIxNywgMjI3LCAyMzQsIDAuOTkpJ1wiXG4gICAgICAgIFtpc1JlY29yZGluZ01vZGFsVmlzaWJsZV09XCJpc1JlY29yZGluZ01vZGFsVmlzaWJsZS52YWx1ZVwiXG4gICAgICAgIFtvbkNsb3NlXT1cIm9uUmVjb3JkaW5nQ2xvc2VcIlxuICAgICAgICBbc3RhcnRSZWNvcmRpbmddPVwic3RhcnRSZWNvcmRpbmcuc3RhcnRSZWNvcmRpbmdcIlxuICAgICAgICBbY29uZmlybVJlY29yZGluZ109XCJjb25maXJtUmVjb3JkaW5nLmNvbmZpcm1SZWNvcmRpbmdcIlxuICAgICAgICBbcGFyYW1ldGVyc109XCJtZWRpYVNGVVBhcmFtZXRlcnNcIlxuICAgICAgPjwvYXBwLXJlY29yZGluZy1tb2RhbD5cblxuICAgICAgPGFwcC1tZXNzYWdlcy1tb2RhbFxuICAgICAgICBbYmFja2dyb3VuZENvbG9yXT1cIlxuICAgICAgICAgIGV2ZW50VHlwZS52YWx1ZSA9PT0gJ3dlYmluYXInIHx8IGV2ZW50VHlwZS52YWx1ZSA9PT0gJ2NvbmZlcmVuY2UnXG4gICAgICAgICAgICA/ICcjZjVmNWY1J1xuICAgICAgICAgICAgOiAncmdiYSgyNTUsIDI1NSwgMjU1LCAwLjI1KSdcbiAgICAgICAgXCJcbiAgICAgICAgW2lzTWVzc2FnZXNNb2RhbFZpc2libGVdPVwiaXNNZXNzYWdlc01vZGFsVmlzaWJsZS52YWx1ZVwiXG4gICAgICAgIFtvbk1lc3NhZ2VzQ2xvc2VdPVwib25NZXNzYWdlc0Nsb3NlXCJcbiAgICAgICAgW21lc3NhZ2VzXT1cIm1lc3NhZ2VzLnZhbHVlXCJcbiAgICAgICAgW2V2ZW50VHlwZV09XCJldmVudFR5cGUudmFsdWVcIlxuICAgICAgICBbbWVtYmVyXT1cIm1lbWJlci52YWx1ZVwiXG4gICAgICAgIFtpc2xldmVsXT1cImlzbGV2ZWwudmFsdWVcIlxuICAgICAgICBbY29Ib3N0UmVzcG9uc2liaWxpdHldPVwiY29Ib3N0UmVzcG9uc2liaWxpdHkudmFsdWVcIlxuICAgICAgICBbY29Ib3N0XT1cImNvSG9zdC52YWx1ZVwiXG4gICAgICAgIFtzdGFydERpcmVjdE1lc3NhZ2VdPVwic3RhcnREaXJlY3RNZXNzYWdlLnZhbHVlXCJcbiAgICAgICAgW2RpcmVjdE1lc3NhZ2VEZXRhaWxzXT1cImRpcmVjdE1lc3NhZ2VEZXRhaWxzLnZhbHVlXCJcbiAgICAgICAgW3VwZGF0ZVN0YXJ0RGlyZWN0TWVzc2FnZV09XCJ1cGRhdGVTdGFydERpcmVjdE1lc3NhZ2VcIlxuICAgICAgICBbdXBkYXRlRGlyZWN0TWVzc2FnZURldGFpbHNdPVwidXBkYXRlRGlyZWN0TWVzc2FnZURldGFpbHNcIlxuICAgICAgICBbc2hvd0FsZXJ0XT1cInNob3dBbGVydFwiXG4gICAgICAgIFtyb29tTmFtZV09XCJyb29tTmFtZS52YWx1ZVwiXG4gICAgICAgIFtzb2NrZXRdPVwic29ja2V0LnZhbHVlXCJcbiAgICAgICAgW2NoYXRTZXR0aW5nXT1cImNoYXRTZXR0aW5nLnZhbHVlXCJcbiAgICAgID48L2FwcC1tZXNzYWdlcy1tb2RhbD5cblxuICAgICAgPGFwcC1jb25maXJtLWV4aXQtbW9kYWxcbiAgICAgICAgW2JhY2tncm91bmRDb2xvcl09XCIncmdiYSgxODEsIDIzMywgMjI5LCAwLjk3KSdcIlxuICAgICAgICBbaXNDb25maXJtRXhpdE1vZGFsVmlzaWJsZV09XCJpc0NvbmZpcm1FeGl0TW9kYWxWaXNpYmxlLnZhbHVlXCJcbiAgICAgICAgW29uQ29uZmlybUV4aXRDbG9zZV09XCJvbkNvbmZpcm1FeGl0Q2xvc2VcIlxuICAgICAgICBbcG9zaXRpb25dPVwiJ3RvcFJpZ2h0J1wiXG4gICAgICAgIFttZW1iZXJdPVwibWVtYmVyLnZhbHVlXCJcbiAgICAgICAgW3Jvb21OYW1lXT1cInJvb21OYW1lLnZhbHVlXCJcbiAgICAgICAgW3NvY2tldF09XCJzb2NrZXQudmFsdWVcIlxuICAgICAgICBbaXNsZXZlbF09XCJpc2xldmVsLnZhbHVlXCJcbiAgICAgID48L2FwcC1jb25maXJtLWV4aXQtbW9kYWw+XG5cbiAgICAgIDxhcHAtY29uZmlybS1oZXJlLW1vZGFsXG4gICAgICAgIFtiYWNrZ3JvdW5kQ29sb3JdPVwiJ3JnYmEoMTgxLCAyMzMsIDIyOSwgMC45NyknXCJcbiAgICAgICAgW2lzQ29uZmlybUhlcmVNb2RhbFZpc2libGVdPVwiaXNDb25maXJtSGVyZU1vZGFsVmlzaWJsZS52YWx1ZVwiXG4gICAgICAgIFtvbkNvbmZpcm1IZXJlQ2xvc2VdPVwib25Db25maXJtSGVyZUNsb3NlXCJcbiAgICAgICAgW21lbWJlcl09XCJtZW1iZXIudmFsdWVcIlxuICAgICAgICBbcm9vbU5hbWVdPVwicm9vbU5hbWUudmFsdWVcIlxuICAgICAgICBbc29ja2V0XT1cInNvY2tldC52YWx1ZVwiXG4gICAgICA+PC9hcHAtY29uZmlybS1oZXJlLW1vZGFsPlxuXG4gICAgICA8YXBwLXNoYXJlLWV2ZW50LW1vZGFsXG4gICAgICAgIFtpc1NoYXJlRXZlbnRNb2RhbFZpc2libGVdPVwiaXNTaGFyZUV2ZW50TW9kYWxWaXNpYmxlLnZhbHVlXCJcbiAgICAgICAgW29uU2hhcmVFdmVudENsb3NlXT1cIm9uU2hhcmVFdmVudENsb3NlXCJcbiAgICAgICAgW3Jvb21OYW1lXT1cInJvb21OYW1lLnZhbHVlXCJcbiAgICAgICAgW2lzbGV2ZWxdPVwiaXNsZXZlbC52YWx1ZVwiXG4gICAgICAgIFthZG1pblBhc3Njb2RlXT1cImFkbWluUGFzc2NvZGUudmFsdWVcIlxuICAgICAgICBbZXZlbnRUeXBlXT1cImV2ZW50VHlwZS52YWx1ZVwiXG4gICAgICA+PC9hcHAtc2hhcmUtZXZlbnQtbW9kYWw+XG5cbiAgICAgIDxhcHAtcG9sbC1tb2RhbFxuICAgICAgICBbaXNQb2xsTW9kYWxWaXNpYmxlXT1cImlzUG9sbE1vZGFsVmlzaWJsZS52YWx1ZVwiXG4gICAgICAgIFtvbkNsb3NlXT1cIm9uUG9sbENsb3NlXCJcbiAgICAgICAgW21lbWJlcl09XCJtZW1iZXIudmFsdWVcIlxuICAgICAgICBbaXNsZXZlbF09XCJpc2xldmVsLnZhbHVlXCJcbiAgICAgICAgW3BvbGxzXT1cInBvbGxzLnZhbHVlXCJcbiAgICAgICAgW3BvbGxdPVwicG9sbC52YWx1ZVwiXG4gICAgICAgIFtzb2NrZXRdPVwic29ja2V0LnZhbHVlXCJcbiAgICAgICAgW3Jvb21OYW1lXT1cInJvb21OYW1lLnZhbHVlXCJcbiAgICAgICAgW3Nob3dBbGVydF09XCJzaG93QWxlcnRcIlxuICAgICAgICBbdXBkYXRlSXNQb2xsTW9kYWxWaXNpYmxlXT1cInVwZGF0ZUlzUG9sbE1vZGFsVmlzaWJsZVwiXG4gICAgICAgIFtoYW5kbGVDcmVhdGVQb2xsXT1cImhhbmRsZUNyZWF0ZVBvbGwuaGFuZGxlQ3JlYXRlUG9sbFwiXG4gICAgICAgIFtoYW5kbGVFbmRQb2xsXT1cImhhbmRsZUVuZFBvbGwuaGFuZGxlRW5kUG9sbFwiXG4gICAgICAgIFtoYW5kbGVWb3RlUG9sbF09XCJoYW5kbGVWb3RlUG9sbC5oYW5kbGVWb3RlUG9sbFwiXG4gICAgICA+PC9hcHAtcG9sbC1tb2RhbD5cblxuICAgICAgPGFwcC1iYWNrZ3JvdW5kLW1vZGFsXG4gICAgICAgIFtiYWNrZ3JvdW5kQ29sb3JdPVwiJ3JnYmEoMjE3LCAyMjcsIDIzNCwgMC45OSknXCJcbiAgICAgICAgW2lzVmlzaWJsZV09XCJpc0JhY2tncm91bmRNb2RhbFZpc2libGUudmFsdWVcIlxuICAgICAgICBbb25DbG9zZV09XCJvbkJhY2tncm91bmRDbG9zZVwiXG4gICAgICAgIFtwYXJhbWV0ZXJzXT1cIm1lZGlhU0ZVUGFyYW1ldGVyc1wiXG4gICAgICA+PC9hcHAtYmFja2dyb3VuZC1tb2RhbD5cblxuICAgICAgPGFwcC1icmVha291dC1yb29tcy1tb2RhbFxuICAgICAgICBbYmFja2dyb3VuZENvbG9yXT1cIidyZ2JhKDIxNywgMjI3LCAyMzQsIDAuOTkpJ1wiXG4gICAgICAgIFtpc1Zpc2libGVdPVwiaXNCcmVha291dFJvb21zTW9kYWxWaXNpYmxlLnZhbHVlXCJcbiAgICAgICAgW29uQnJlYWtvdXRSb29tc0Nsb3NlXT1cIm9uQnJlYWtvdXRSb29tc0Nsb3NlXCJcbiAgICAgICAgW3BhcmFtZXRlcnNdPVwibWVkaWFTRlVQYXJhbWV0ZXJzXCJcbiAgICAgID48L2FwcC1icmVha291dC1yb29tcy1tb2RhbD5cblxuICAgICAgPGFwcC1jb25maWd1cmUtd2hpdGVib2FyZC1tb2RhbFxuICAgICAgICBbYmFja2dyb3VuZENvbG9yXT1cIidyZ2JhKDIxNywgMjI3LCAyMzQsIDAuOTkpJ1wiXG4gICAgICAgIFtpc1Zpc2libGVdPVwiaXNDb25maWd1cmVXaGl0ZWJvYXJkTW9kYWxWaXNpYmxlLnZhbHVlXCJcbiAgICAgICAgW29uQ29uZmlndXJlV2hpdGVib2FyZENsb3NlXT1cIm9uQ29uZmlndXJlV2hpdGVib2FyZENsb3NlXCJcbiAgICAgICAgW3BhcmFtZXRlcnNdPVwibWVkaWFTRlVQYXJhbWV0ZXJzXCJcbiAgICAgID48L2FwcC1jb25maWd1cmUtd2hpdGVib2FyZC1tb2RhbD5cblxuICAgICAgPGFwcC1zY3JlZW5ib2FyZC1tb2RhbFxuICAgICAgICBbYmFja2dyb3VuZENvbG9yXT1cIidyZ2JhKDIxNywgMjI3LCAyMzQsIDAuOTkpJ1wiXG4gICAgICAgIFtpc1Zpc2libGVdPVwiaXNTY3JlZW5ib2FyZE1vZGFsVmlzaWJsZS52YWx1ZVwiXG4gICAgICAgIFtvbkNsb3NlXT1cIm9uU2NyZWVuYm9hcmRDbG9zZVwiXG4gICAgICAgIFtwYXJhbWV0ZXJzXT1cIm1lZGlhU0ZVUGFyYW1ldGVyc1wiXG4gICAgICA+PC9hcHAtc2NyZWVuYm9hcmQtbW9kYWw+XG5cbiAgICAgIDxhcHAtYWxlcnQtY29tcG9uZW50XG4gICAgICAgIFt2aXNpYmxlXT1cImFsZXJ0VmlzaWJsZS52YWx1ZVwiXG4gICAgICAgIFttZXNzYWdlXT1cImFsZXJ0TWVzc2FnZS52YWx1ZVwiXG4gICAgICAgIFt0eXBlXT1cImFsZXJ0VHlwZS52YWx1ZVwiXG4gICAgICAgIFtkdXJhdGlvbl09XCJhbGVydER1cmF0aW9uLnZhbHVlXCJcbiAgICAgICAgW29uSGlkZV09XCJvbkFsZXJ0SGlkZVwiXG4gICAgICAgIHRleHRDb2xvcj1cIiNmZmZmZmZcIlxuICAgICAgPjwvYXBwLWFsZXJ0LWNvbXBvbmVudD5cblxuICAgICAgPGFwcC1sb2FkaW5nLW1vZGFsXG4gICAgICAgIFtpc1Zpc2libGVdPVwiaXNMb2FkaW5nTW9kYWxWaXNpYmxlLnZhbHVlXCJcbiAgICAgICAgW2JhY2tncm91bmRDb2xvcl09XCIncmdiYSgyMTcsIDIyNywgMjM0LCAwLjk5KSdcIlxuICAgICAgICBkaXNwbGF5Q29sb3I9XCJibGFja1wiXG4gICAgICA+PC9hcHAtbG9hZGluZy1tb2RhbD5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgc3R5bGVzOiBbXG4gICAgYFxuICAgICAgLk1lZGlhU0ZVIHtcbiAgICAgICAgLyogQWRkIGFueSBjb21wb25lbnQtc3BlY2lmaWMgc3R5bGVzIGhlcmUgKi9cbiAgICAgIH1cbiAgICBgLFxuICBdLFxuICBwcm92aWRlcnM6IFtDb29raWVTZXJ2aWNlXSxcbn0pXG5leHBvcnQgY2xhc3MgTWVkaWFzZnVXZWJpbmFyIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKVxuICBQcmVqb2luUGFnZTogYW55ID0gV2VsY29tZVBhZ2U7XG4gIEBJbnB1dCgpIGNyZWRlbnRpYWxzOiB7IGFwaVVzZXJOYW1lOiBzdHJpbmc7IGFwaUtleTogc3RyaW5nIH0gPSB7IGFwaVVzZXJOYW1lOiAnJywgYXBpS2V5OiAnJyB9O1xuICBASW5wdXQoKSB1c2VMb2NhbFVJTW9kZSA9IGZhbHNlO1xuICBASW5wdXQoKSBzZWVkRGF0YT86IFNlZWREYXRhO1xuICBASW5wdXQoKSB1c2VTZWVkID0gZmFsc2U7XG4gIEBJbnB1dCgpIGltZ1NyYyA9ICdodHRwczovL21lZGlhc2Z1LmNvbS9pbWFnZXMvbG9nbzE5Mi5wbmcnO1xuXG4gIHRpdGxlID0gJ01lZGlhU0ZVLVdlYmluYXInO1xuXG4gIHByaXZhdGUgbWFpbkhlaWdodFdpZHRoU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gfCB1bmRlZmluZWQ7XG4gIHByaXZhdGUgdmFsaWRhdGVkU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gfCB1bmRlZmluZWQ7XG4gIHByaXZhdGUgaXNsZXZlbFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uIHwgdW5kZWZpbmVkO1xuICBwcml2YXRlIGNvSG9zdFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uIHwgdW5kZWZpbmVkO1xuICBwcml2YXRlIGJ1dHRvblN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG4gIHByaXZhdGUgU2NyZWVuYm9hcmRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiB8IHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSByZWNvcmRpbmdTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiB8IHVuZGVmaW5lZDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgcHVibGljIHVwZGF0ZU1pbmlDYXJkc0dyaWQ6IFVwZGF0ZU1pbmlDYXJkc0dyaWQsXG4gICAgcHVibGljIG1peFN0cmVhbXM6IE1peFN0cmVhbXMsXG4gICAgcHVibGljIGRpc3BTdHJlYW1zOiBEaXNwU3RyZWFtcyxcbiAgICBwdWJsaWMgc3RvcFNoYXJlU2NyZWVuOiBTdG9wU2hhcmVTY3JlZW4sXG4gICAgcHVibGljIGNoZWNrU2NyZWVuU2hhcmU6IENoZWNrU2NyZWVuU2hhcmUsXG4gICAgcHVibGljIHN0YXJ0U2hhcmVTY3JlZW46IFN0YXJ0U2hhcmVTY3JlZW4sXG4gICAgcHVibGljIHJlcXVlc3RTY3JlZW5TaGFyZTogUmVxdWVzdFNjcmVlblNoYXJlLFxuICAgIHB1YmxpYyByZW9yZGVyU3RyZWFtczogUmVvcmRlclN0cmVhbXMsXG4gICAgcHVibGljIHByZXBvcHVsYXRlVXNlck1lZGlhOiBQcmVwb3B1bGF0ZVVzZXJNZWRpYSxcbiAgICBwdWJsaWMgZ2V0VmlkZW9zOiBHZXRWaWRlb3MsXG4gICAgcHVibGljIHJlUG9ydDogUmVQb3J0LFxuICAgIHB1YmxpYyB0cmlnZ2VyOiBUcmlnZ2VyLFxuICAgIHB1YmxpYyBjb25zdW1lclJlc3VtZTogQ29uc3VtZXJSZXN1bWUsXG4gICAgcHVibGljIGNvbm5lY3RTZW5kVHJhbnNwb3J0OiBDb25uZWN0U2VuZFRyYW5zcG9ydCxcbiAgICBwdWJsaWMgY29ubmVjdFNlbmRUcmFuc3BvcnRBdWRpbzogQ29ubmVjdFNlbmRUcmFuc3BvcnRBdWRpbyxcbiAgICBwdWJsaWMgY29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlbzogQ29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlbyxcbiAgICBwdWJsaWMgY29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW46IENvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuLFxuICAgIHB1YmxpYyBwcm9jZXNzQ29uc3VtZXJUcmFuc3BvcnRzOiBQcm9jZXNzQ29uc3VtZXJUcmFuc3BvcnRzLFxuICAgIHB1YmxpYyByZXN1bWVQYXVzZVN0cmVhbXM6IFJlc3VtZVBhdXNlU3RyZWFtcyxcbiAgICBwdWJsaWMgcmVhZGp1c3Q6IFJlYWRqdXN0LFxuICAgIHB1YmxpYyBjaGVja0dyaWQ6IENoZWNrR3JpZCxcbiAgICBwdWJsaWMgZ2V0RXN0aW1hdGU6IEdldEVzdGltYXRlLFxuICAgIHB1YmxpYyBjYWxjdWxhdGVSb3dzQW5kQ29sdW1uczogQ2FsY3VsYXRlUm93c0FuZENvbHVtbnMsXG4gICAgcHVibGljIGFkZFZpZGVvc0dyaWQ6IEFkZFZpZGVvc0dyaWQsXG4gICAgcHVibGljIG9uU2NyZWVuQ2hhbmdlczogT25TY3JlZW5DaGFuZ2VzLFxuICAgIHB1YmxpYyBjaGFuZ2VWaWRzOiBDaGFuZ2VWaWRzLFxuICAgIHB1YmxpYyBjb21wYXJlQWN0aXZlTmFtZXM6IENvbXBhcmVBY3RpdmVOYW1lcyxcbiAgICBwdWJsaWMgY29tcGFyZVNjcmVlblN0YXRlczogQ29tcGFyZVNjcmVlblN0YXRlcyxcbiAgICBwdWJsaWMgY3JlYXRlU2VuZFRyYW5zcG9ydDogQ3JlYXRlU2VuZFRyYW5zcG9ydCxcbiAgICBwdWJsaWMgcmVzdW1lU2VuZFRyYW5zcG9ydEF1ZGlvOiBSZXN1bWVTZW5kVHJhbnNwb3J0QXVkaW8sXG4gICAgcHVibGljIHJlY2VpdmVBbGxQaXBlZFRyYW5zcG9ydHM6IFJlY2VpdmVBbGxQaXBlZFRyYW5zcG9ydHMsXG4gICAgcHVibGljIGRpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0VmlkZW86IERpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0VmlkZW8sXG4gICAgcHVibGljIGRpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW86IERpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW8sXG4gICAgcHVibGljIGRpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuOiBEaXNjb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlbixcbiAgICBwdWJsaWMgZ2V0UGlwZWRQcm9kdWNlcnNBbHQ6IEdldFBpcGVkUHJvZHVjZXJzQWx0LFxuICAgIHB1YmxpYyBzaWduYWxOZXdDb25zdW1lclRyYW5zcG9ydDogU2lnbmFsTmV3Q29uc3VtZXJUcmFuc3BvcnQsXG4gICAgcHVibGljIGNvbm5lY3RSZWN2VHJhbnNwb3J0OiBDb25uZWN0UmVjdlRyYW5zcG9ydCxcbiAgICBwdWJsaWMgcmVVcGRhdGVJbnRlcjogUmVVcGRhdGVJbnRlcixcbiAgICBwdWJsaWMgdXBkYXRlUGFydGljaXBhbnRBdWRpb0RlY2liZWxzOiBVcGRhdGVQYXJ0aWNpcGFudEF1ZGlvRGVjaWJlbHMsXG4gICAgcHVibGljIGNsb3NlQW5kUmVzaXplOiBDbG9zZUFuZFJlc2l6ZSxcbiAgICBwdWJsaWMgYXV0b0FkanVzdDogQXV0b0FkanVzdCxcbiAgICBwdWJsaWMgc3dpdGNoVXNlclZpZGVvQWx0OiBTd2l0Y2hVc2VyVmlkZW9BbHQsXG4gICAgcHVibGljIHN3aXRjaFVzZXJWaWRlbzogU3dpdGNoVXNlclZpZGVvLFxuICAgIHB1YmxpYyBzd2l0Y2hVc2VyQXVkaW86IFN3aXRjaFVzZXJBdWRpbyxcbiAgICBwdWJsaWMgZ2V0RG9tYWluczogR2V0RG9tYWlucyxcbiAgICBwdWJsaWMgZm9ybWF0TnVtYmVyOiBGb3JtYXROdW1iZXIsXG4gICAgcHVibGljIGNvbm5lY3RJcHM6IENvbm5lY3RJcHMsXG4gICAgcHVibGljIGNyZWF0ZURldmljZUNsaWVudDogQ3JlYXRlRGV2aWNlQ2xpZW50LFxuICAgIHB1YmxpYyBoYW5kbGVDcmVhdGVQb2xsOiBIYW5kbGVDcmVhdGVQb2xsLFxuICAgIHB1YmxpYyBoYW5kbGVFbmRQb2xsOiBIYW5kbGVFbmRQb2xsLFxuICAgIHB1YmxpYyBoYW5kbGVWb3RlUG9sbDogSGFuZGxlVm90ZVBvbGwsXG4gICAgcHVibGljIGNhcHR1cmVDYW52YXNTdHJlYW06IENhcHR1cmVDYW52YXNTdHJlYW0sXG4gICAgcHVibGljIHJlc3VtZVBhdXNlQXVkaW9TdHJlYW1zOiBSZXN1bWVQYXVzZUF1ZGlvU3RyZWFtcyxcbiAgICBwdWJsaWMgcHJvY2Vzc0NvbnN1bWVyVHJhbnNwb3J0c0F1ZGlvOiBQcm9jZXNzQ29uc3VtZXJUcmFuc3BvcnRzQXVkaW8sXG5cbiAgICBwdWJsaWMgbGF1bmNoTWVudU1vZGFsOiBMYXVuY2hNZW51TW9kYWwsXG4gICAgcHVibGljIGxhdW5jaFJlY29yZGluZzogTGF1bmNoUmVjb3JkaW5nLFxuICAgIHB1YmxpYyBzdGFydFJlY29yZGluZzogU3RhcnRSZWNvcmRpbmcsXG4gICAgcHVibGljIGNvbmZpcm1SZWNvcmRpbmc6IENvbmZpcm1SZWNvcmRpbmcsXG4gICAgcHVibGljIGxhdW5jaFdhaXRpbmc6IExhdW5jaFdhaXRpbmcsXG4gICAgcHVibGljIGxhdW5jaENvSG9zdDogbGF1bmNoQ29Ib3N0LFxuICAgIHB1YmxpYyBsYXVuY2hNZWRpYVNldHRpbmdzOiBMYXVuY2hNZWRpYVNldHRpbmdzLFxuICAgIHB1YmxpYyBsYXVuY2hEaXNwbGF5U2V0dGluZ3M6IExhdW5jaERpc3BsYXlTZXR0aW5ncyxcbiAgICBwdWJsaWMgbGF1bmNoU2V0dGluZ3M6IExhdW5jaFNldHRpbmdzLFxuICAgIHB1YmxpYyBsYXVuY2hSZXF1ZXN0czogTGF1bmNoUmVxdWVzdHMsXG4gICAgcHVibGljIGxhdW5jaFBhcnRpY2lwYW50czogTGF1bmNoUGFydGljaXBhbnRzLFxuICAgIHB1YmxpYyBsYXVuY2hNZXNzYWdlczogTGF1bmNoTWVzc2FnZXMsXG4gICAgcHVibGljIGxhdW5jaENvbmZpcm1FeGl0OiBMYXVuY2hDb25maXJtRXhpdCxcbiAgICBwdWJsaWMgbGF1bmNoUG9sbDogTGF1bmNoUG9sbCxcbiAgICBwdWJsaWMgbGF1bmNoQnJlYWtvdXRSb29tczogTGF1bmNoQnJlYWtvdXRSb29tcyxcbiAgICBwdWJsaWMgbGF1bmNoQ29uZmlndXJlV2hpdGVib2FyZDogTGF1bmNoQ29uZmlndXJlV2hpdGVib2FyZCxcbiAgICBwdWJsaWMgc3RhcnRNZWV0aW5nUHJvZ3Jlc3NUaW1lcjogU3RhcnRNZWV0aW5nUHJvZ3Jlc3NUaW1lcixcbiAgICBwdWJsaWMgdXBkYXRlUmVjb3JkaW5nOiBVcGRhdGVSZWNvcmRpbmcsXG4gICAgcHVibGljIHN0b3BSZWNvcmRpbmc6IFN0b3BSZWNvcmRpbmcsXG4gICAgcHVibGljIHVzZXJXYWl0aW5nOiBVc2VyV2FpdGluZyxcbiAgICBwdWJsaWMgcGVyc29uSm9pbmVkOiBQZXJzb25Kb2luZWQsXG4gICAgcHVibGljIGFsbFdhaXRpbmdSb29tTWVtYmVyczogQWxsV2FpdGluZ1Jvb21NZW1iZXJzLFxuICAgIHB1YmxpYyByb29tUmVjb3JkUGFyYW1zOiBSb29tUmVjb3JkUGFyYW1zLFxuICAgIHB1YmxpYyBiYW5QYXJ0aWNpcGFudDogQmFuUGFydGljaXBhbnQsXG4gICAgcHVibGljIHVwZGF0ZWRDb0hvc3Q6IFVwZGF0ZWRDb0hvc3QsXG4gICAgcHVibGljIHBhcnRpY2lwYW50UmVxdWVzdGVkOiBQYXJ0aWNpcGFudFJlcXVlc3RlZCxcbiAgICBwdWJsaWMgc2NyZWVuUHJvZHVjZXJJZDogU2NyZWVuUHJvZHVjZXJJZCxcbiAgICBwdWJsaWMgdXBkYXRlTWVkaWFTZXR0aW5nczogVXBkYXRlTWVkaWFTZXR0aW5ncyxcbiAgICBwdWJsaWMgcHJvZHVjZXJNZWRpYVBhdXNlZDogUHJvZHVjZXJNZWRpYVBhdXNlZCxcbiAgICBwdWJsaWMgcHJvZHVjZXJNZWRpYVJlc3VtZWQ6IFByb2R1Y2VyTWVkaWFSZXN1bWVkLFxuICAgIHB1YmxpYyBwcm9kdWNlck1lZGlhQ2xvc2VkOiBQcm9kdWNlck1lZGlhQ2xvc2VkLFxuICAgIHB1YmxpYyBjb250cm9sTWVkaWFIb3N0OiBDb250cm9sTWVkaWFIb3N0LFxuICAgIHB1YmxpYyBtZWV0aW5nRW5kZWQ6IE1lZXRpbmdFbmRlZCxcbiAgICBwdWJsaWMgZGlzY29ubmVjdFVzZXJTZWxmOiBEaXNjb25uZWN0VXNlclNlbGYsXG4gICAgcHVibGljIHJlY2VpdmVNZXNzYWdlOiBSZWNlaXZlTWVzc2FnZSxcbiAgICBwdWJsaWMgbWVldGluZ1RpbWVSZW1haW5pbmc6IE1lZXRpbmdUaW1lUmVtYWluaW5nLFxuICAgIHB1YmxpYyBtZWV0aW5nU3RpbGxUaGVyZTogTWVldGluZ1N0aWxsVGhlcmUsXG4gICAgcHVibGljIHN0YXJ0UmVjb3JkczogU3RhcnRSZWNvcmRzLFxuICAgIHB1YmxpYyByZUluaXRpYXRlUmVjb3JkaW5nOiBSZUluaXRpYXRlUmVjb3JkaW5nLFxuICAgIHB1YmxpYyByZWNvcmRpbmdOb3RpY2U6IFJlY29yZGluZ05vdGljZSxcbiAgICBwdWJsaWMgdGltZUxlZnRSZWNvcmRpbmc6IFRpbWVMZWZ0UmVjb3JkaW5nLFxuICAgIHB1YmxpYyBzdG9wcGVkUmVjb3JkaW5nOiBTdG9wcGVkUmVjb3JkaW5nLFxuICAgIHB1YmxpYyBob3N0UmVxdWVzdFJlc3BvbnNlOiBIb3N0UmVxdWVzdFJlc3BvbnNlLFxuICAgIHB1YmxpYyBhbGxNZW1iZXJzOiBBbGxNZW1iZXJzLFxuICAgIHB1YmxpYyBhbGxNZW1iZXJzUmVzdDogQWxsTWVtYmVyc1Jlc3QsXG4gICAgcHVibGljIGRpc2Nvbm5lY3Q6IERpc2Nvbm5lY3QsXG4gICAgcHVibGljIHBvbGxVcGRhdGVkOiBQb2xsVXBkYXRlZCxcbiAgICBwdWJsaWMgYnJlYWtvdXRSb29tVXBkYXRlZDogQnJlYWtvdXRSb29tVXBkYXRlZCxcbiAgICBwdWJsaWMgc29ja2V0TWFuYWdlcjogU29ja2V0TWFuYWdlcixcbiAgICBwdWJsaWMgam9pblJvb21DbGllbnQ6IEpvaW5Sb29tQ2xpZW50LFxuICAgIHB1YmxpYyB1cGRhdGVSb29tUGFyYW1ldGVyc0NsaWVudDogVXBkYXRlUm9vbVBhcmFtZXRlcnNDbGllbnQsXG4gICAgcHVibGljIGNsaWNrVmlkZW86IENsaWNrVmlkZW8sXG4gICAgcHVibGljIGNsaWNrQXVkaW86IENsaWNrQXVkaW8sXG4gICAgcHVibGljIGNsaWNrU2NyZWVuU2hhcmU6IENsaWNrU2NyZWVuU2hhcmUsXG4gICAgcHVibGljIHN0cmVhbVN1Y2Nlc3NWaWRlbzogU3RyZWFtU3VjY2Vzc1ZpZGVvLFxuICAgIHB1YmxpYyBzdHJlYW1TdWNjZXNzQXVkaW86IFN0cmVhbVN1Y2Nlc3NBdWRpbyxcbiAgICBwdWJsaWMgc3RyZWFtU3VjY2Vzc1NjcmVlbjogU3RyZWFtU3VjY2Vzc1NjcmVlbixcbiAgICBwdWJsaWMgc3RyZWFtU3VjY2Vzc0F1ZGlvU3dpdGNoOiBTdHJlYW1TdWNjZXNzQXVkaW9Td2l0Y2gsXG4gICAgcHVibGljIGNoZWNrUGVybWlzc2lvbjogQ2hlY2tQZXJtaXNzaW9uLFxuICAgIHB1YmxpYyB1cGRhdGVDb25zdW1pbmdEb21haW5zOiBVcGRhdGVDb25zdW1pbmdEb21haW5zLFxuICAgIHB1YmxpYyByZWNlaXZlUm9vbU1lc3NhZ2VzOiBSZWNlaXZlUm9vbU1lc3NhZ2VzLFxuICApIHt9XG5cbiAgY3JlYXRlSW5qZWN0b3IoaW5wdXRzOiBhbnkpIHtcbiAgICBjb25zdCBpbmogPSBJbmplY3Rvci5jcmVhdGUoe1xuICAgICAgcHJvdmlkZXJzOiBPYmplY3Qua2V5cyhpbnB1dHMpLm1hcCgoa2V5KSA9PiAoeyBwcm92aWRlOiBrZXksIHVzZVZhbHVlOiBpbnB1dHNba2V5XSB9KSksXG4gICAgICBwYXJlbnQ6IHRoaXMuaW5qZWN0b3IsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gaW5qO1xuICB9XG5cbiAgLy8gSW5pdGlhbCB2YWx1ZXNcbiAgbWVkaWFTRlVGdW5jdGlvbnMgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZU1pbmlDYXJkc0dyaWQ6XG4gICAgICAgIHRoaXMudXBkYXRlTWluaUNhcmRzR3JpZD8udXBkYXRlTWluaUNhcmRzR3JpZCB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgbWl4U3RyZWFtczpcbiAgICAgICAgdGhpcy5taXhTdHJlYW1zPy5taXhTdHJlYW1zIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBkaXNwU3RyZWFtczpcbiAgICAgICAgdGhpcy5kaXNwU3RyZWFtcz8uZGlzcFN0cmVhbXMgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIHN0b3BTaGFyZVNjcmVlbjpcbiAgICAgICAgdGhpcy5zdG9wU2hhcmVTY3JlZW4/LnN0b3BTaGFyZVNjcmVlbiB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgY2hlY2tTY3JlZW5TaGFyZTpcbiAgICAgICAgdGhpcy5jaGVja1NjcmVlblNoYXJlPy5jaGVja1NjcmVlblNoYXJlIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBzdGFydFNoYXJlU2NyZWVuOlxuICAgICAgICB0aGlzLnN0YXJ0U2hhcmVTY3JlZW4/LnN0YXJ0U2hhcmVTY3JlZW4gfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIHJlcXVlc3RTY3JlZW5TaGFyZTpcbiAgICAgICAgdGhpcy5yZXF1ZXN0U2NyZWVuU2hhcmU/LnJlcXVlc3RTY3JlZW5TaGFyZSB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgcmVvcmRlclN0cmVhbXM6XG4gICAgICAgIHRoaXMucmVvcmRlclN0cmVhbXM/LnJlb3JkZXJTdHJlYW1zIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBwcmVwb3B1bGF0ZVVzZXJNZWRpYTpcbiAgICAgICAgdGhpcy5wcmVwb3B1bGF0ZVVzZXJNZWRpYT8ucHJlcG9wdWxhdGVVc2VyTWVkaWEgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGdldFZpZGVvczpcbiAgICAgICAgdGhpcy5nZXRWaWRlb3M/LmdldFZpZGVvcyB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgcmVQb3J0OlxuICAgICAgICB0aGlzLnJlUG9ydD8ucmVQb3J0IHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICB0cmlnZ2VyOlxuICAgICAgICB0aGlzLnRyaWdnZXI/LnRyaWdnZXIgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGNvbnN1bWVyUmVzdW1lOlxuICAgICAgICB0aGlzLmNvbnN1bWVyUmVzdW1lPy5jb25zdW1lclJlc3VtZSB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgY29ubmVjdFNlbmRUcmFuc3BvcnQ6XG4gICAgICAgIHRoaXMuY29ubmVjdFNlbmRUcmFuc3BvcnQ/LmNvbm5lY3RTZW5kVHJhbnNwb3J0IHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBjb25uZWN0U2VuZFRyYW5zcG9ydEF1ZGlvOlxuICAgICAgICB0aGlzLmNvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW8/LmNvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW8gfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGNvbm5lY3RTZW5kVHJhbnNwb3J0VmlkZW86XG4gICAgICAgIHRoaXMuY29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlbz8uY29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlbyB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgY29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW46XG4gICAgICAgIHRoaXMuY29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW4/LmNvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBwcm9jZXNzQ29uc3VtZXJUcmFuc3BvcnRzOlxuICAgICAgICB0aGlzLnByb2Nlc3NDb25zdW1lclRyYW5zcG9ydHM/LnByb2Nlc3NDb25zdW1lclRyYW5zcG9ydHMgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIHJlc3VtZVBhdXNlU3RyZWFtczpcbiAgICAgICAgdGhpcy5yZXN1bWVQYXVzZVN0cmVhbXM/LnJlc3VtZVBhdXNlU3RyZWFtcyB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgcmVhZGp1c3Q6XG4gICAgICAgIHRoaXMucmVhZGp1c3Q/LnJlYWRqdXN0IHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBjaGVja0dyaWQ6XG4gICAgICAgIHRoaXMuY2hlY2tHcmlkPy5jaGVja0dyaWQgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGdldEVzdGltYXRlOlxuICAgICAgICB0aGlzLmdldEVzdGltYXRlPy5nZXRFc3RpbWF0ZSB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgY2FsY3VsYXRlUm93c0FuZENvbHVtbnM6XG4gICAgICAgIHRoaXMuY2FsY3VsYXRlUm93c0FuZENvbHVtbnM/LmNhbGN1bGF0ZVJvd3NBbmRDb2x1bW5zIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBhZGRWaWRlb3NHcmlkOlxuICAgICAgICB0aGlzLmFkZFZpZGVvc0dyaWQ/LmFkZFZpZGVvc0dyaWQgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIG9uU2NyZWVuQ2hhbmdlczpcbiAgICAgICAgdGhpcy5vblNjcmVlbkNoYW5nZXM/Lm9uU2NyZWVuQ2hhbmdlcyB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgc2xlZXA6XG4gICAgICAgIHNsZWVwIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBjaGFuZ2VWaWRzOlxuICAgICAgICB0aGlzLmNoYW5nZVZpZHM/LmNoYW5nZVZpZHMgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGNvbXBhcmVBY3RpdmVOYW1lczpcbiAgICAgICAgdGhpcy5jb21wYXJlQWN0aXZlTmFtZXM/LmNvbXBhcmVBY3RpdmVOYW1lcyB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgY29tcGFyZVNjcmVlblN0YXRlczpcbiAgICAgICAgdGhpcy5jb21wYXJlU2NyZWVuU3RhdGVzPy5jb21wYXJlU2NyZWVuU3RhdGVzIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBjcmVhdGVTZW5kVHJhbnNwb3J0OlxuICAgICAgICB0aGlzLmNyZWF0ZVNlbmRUcmFuc3BvcnQ/LmNyZWF0ZVNlbmRUcmFuc3BvcnQgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIHJlc3VtZVNlbmRUcmFuc3BvcnRBdWRpbzpcbiAgICAgICAgdGhpcy5yZXN1bWVTZW5kVHJhbnNwb3J0QXVkaW8/LnJlc3VtZVNlbmRUcmFuc3BvcnRBdWRpbyB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgcmVjZWl2ZUFsbFBpcGVkVHJhbnNwb3J0czpcbiAgICAgICAgdGhpcy5yZWNlaXZlQWxsUGlwZWRUcmFuc3BvcnRzPy5yZWNlaXZlQWxsUGlwZWRUcmFuc3BvcnRzIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBkaXNjb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvOlxuICAgICAgICB0aGlzLmRpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0VmlkZW8/LmRpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0VmlkZW8gfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGRpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW86XG4gICAgICAgIHRoaXMuZGlzY29ubmVjdFNlbmRUcmFuc3BvcnRBdWRpbz8uZGlzY29ubmVjdFNlbmRUcmFuc3BvcnRBdWRpbyB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgZGlzY29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW46XG4gICAgICAgIHRoaXMuZGlzY29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW4/LmRpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBnZXRQaXBlZFByb2R1Y2Vyc0FsdDpcbiAgICAgICAgdGhpcy5nZXRQaXBlZFByb2R1Y2Vyc0FsdD8uZ2V0UGlwZWRQcm9kdWNlcnNBbHQgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIHNpZ25hbE5ld0NvbnN1bWVyVHJhbnNwb3J0OlxuICAgICAgICB0aGlzLnNpZ25hbE5ld0NvbnN1bWVyVHJhbnNwb3J0Py5zaWduYWxOZXdDb25zdW1lclRyYW5zcG9ydCB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgY29ubmVjdFJlY3ZUcmFuc3BvcnQ6XG4gICAgICAgIHRoaXMuY29ubmVjdFJlY3ZUcmFuc3BvcnQ/LmNvbm5lY3RSZWN2VHJhbnNwb3J0IHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICByZVVwZGF0ZUludGVyOlxuICAgICAgICB0aGlzLnJlVXBkYXRlSW50ZXI/LnJlVXBkYXRlSW50ZXIgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIHVwZGF0ZVBhcnRpY2lwYW50QXVkaW9EZWNpYmVsczpcbiAgICAgICAgdGhpcy51cGRhdGVQYXJ0aWNpcGFudEF1ZGlvRGVjaWJlbHM/LnVwZGF0ZVBhcnRpY2lwYW50QXVkaW9EZWNpYmVscyB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgY2xvc2VBbmRSZXNpemU6XG4gICAgICAgIHRoaXMuY2xvc2VBbmRSZXNpemU/LmNsb3NlQW5kUmVzaXplIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBhdXRvQWRqdXN0OlxuICAgICAgICB0aGlzLmF1dG9BZGp1c3Q/LmF1dG9BZGp1c3QgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIHN3aXRjaFVzZXJWaWRlb0FsdDpcbiAgICAgICAgdGhpcy5zd2l0Y2hVc2VyVmlkZW9BbHQ/LnN3aXRjaFVzZXJWaWRlb0FsdCB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgc3dpdGNoVXNlclZpZGVvOlxuICAgICAgICB0aGlzLnN3aXRjaFVzZXJWaWRlbz8uc3dpdGNoVXNlclZpZGVvIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBzd2l0Y2hVc2VyQXVkaW86XG4gICAgICAgIHRoaXMuc3dpdGNoVXNlckF1ZGlvPy5zd2l0Y2hVc2VyQXVkaW8gfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGdldERvbWFpbnM6XG4gICAgICAgIHRoaXMuZ2V0RG9tYWlucz8uZ2V0RG9tYWlucyB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgZm9ybWF0TnVtYmVyOlxuICAgICAgICB0aGlzLmZvcm1hdE51bWJlcj8uZm9ybWF0TnVtYmVyIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBjb25uZWN0SXBzOlxuICAgICAgICB0aGlzLmNvbm5lY3RJcHM/LmNvbm5lY3RJcHMgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGNyZWF0ZURldmljZUNsaWVudDpcbiAgICAgICAgdGhpcy5jcmVhdGVEZXZpY2VDbGllbnQ/LmNyZWF0ZURldmljZUNsaWVudCB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgaGFuZGxlQ3JlYXRlUG9sbDpcbiAgICAgICAgdGhpcy5oYW5kbGVDcmVhdGVQb2xsPy5oYW5kbGVDcmVhdGVQb2xsIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBoYW5kbGVFbmRQb2xsOlxuICAgICAgICB0aGlzLmhhbmRsZUVuZFBvbGw/LmhhbmRsZUVuZFBvbGwgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGhhbmRsZVZvdGVQb2xsOlxuICAgICAgICB0aGlzLmhhbmRsZVZvdGVQb2xsPy5oYW5kbGVWb3RlUG9sbCB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgY2FwdHVyZUNhbnZhc1N0cmVhbTpcbiAgICAgICAgdGhpcy5jYXB0dXJlQ2FudmFzU3RyZWFtPy5jYXB0dXJlQ2FudmFzU3RyZWFtIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICByZXN1bWVQYXVzZUF1ZGlvU3RyZWFtczpcbiAgICAgICAgdGhpcy5yZXN1bWVQYXVzZUF1ZGlvU3RyZWFtcz8ucmVzdW1lUGF1c2VBdWRpb1N0cmVhbXMgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIHByb2Nlc3NDb25zdW1lclRyYW5zcG9ydHNBdWRpbzpcbiAgICAgICAgdGhpcy5wcm9jZXNzQ29uc3VtZXJUcmFuc3BvcnRzQXVkaW8/LnByb2Nlc3NDb25zdW1lclRyYW5zcG9ydHNBdWRpbyB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgY2hlY2tQZXJtaXNzaW9uOlxuICAgICAgICB0aGlzLmNoZWNrUGVybWlzc2lvbj8uY2hlY2tQZXJtaXNzaW9uIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBzdHJlYW1TdWNjZXNzVmlkZW86XG4gICAgICAgIHRoaXMuc3RyZWFtU3VjY2Vzc1ZpZGVvPy5zdHJlYW1TdWNjZXNzVmlkZW8gfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIHN0cmVhbVN1Y2Nlc3NBdWRpbzpcbiAgICAgICAgdGhpcy5zdHJlYW1TdWNjZXNzQXVkaW8/LnN0cmVhbVN1Y2Nlc3NBdWRpbyB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgc3RyZWFtU3VjY2Vzc1NjcmVlbjpcbiAgICAgICAgdGhpcy5zdHJlYW1TdWNjZXNzU2NyZWVuPy5zdHJlYW1TdWNjZXNzU2NyZWVuIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBzdHJlYW1TdWNjZXNzQXVkaW9Td2l0Y2g6XG4gICAgICAgIHRoaXMuc3RyZWFtU3VjY2Vzc0F1ZGlvU3dpdGNoPy5zdHJlYW1TdWNjZXNzQXVkaW9Td2l0Y2ggfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGNsaWNrVmlkZW86XG4gICAgICAgIHRoaXMuY2xpY2tWaWRlbz8uY2xpY2tWaWRlbyB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgY2xpY2tBdWRpbzpcbiAgICAgICAgdGhpcy5jbGlja0F1ZGlvPy5jbGlja0F1ZGlvIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBjbGlja1NjcmVlblNoYXJlOlxuICAgICAgICB0aGlzLmNsaWNrU2NyZWVuU2hhcmU/LmNsaWNrU2NyZWVuU2hhcmUgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIHJlcXVlc3RQZXJtaXNzaW9uQ2FtZXJhOlxuICAgICAgICB0aGlzLnJlcXVlc3RQZXJtaXNzaW9uQ2FtZXJhIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICByZXF1ZXN0UGVybWlzc2lvbkF1ZGlvOlxuICAgICAgICB0aGlzLnJlcXVlc3RQZXJtaXNzaW9uQXVkaW8gfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICB9O1xuICB9O1xuXG4gIHZhbGlkYXRlZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBsb2NhbFVJTW9kZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBzb2NrZXQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFNvY2tldD4oe30gYXMgU29ja2V0KTtcbiAgcm9vbURhdGEgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFJlc3BvbnNlSm9pblJvb20gfCBudWxsPihudWxsKTtcbiAgZGV2aWNlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxEZXZpY2UgfCBudWxsPihudWxsKTtcbiAgYXBpS2V5ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KFxuICAgICcwMjExOTM3NDJjOTM1YzQ0MzRkMjVkNzU5MjM2MjU3NWZjYjZkNjU5MGI2YzM4MzM0YTJmM2UwNmM4M2FmNzU4JyxcbiAgKTtcbiAgYXBpVXNlck5hbWUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJ2FiY2RlZmdoJyk7XG4gIGFwaVRva2VuID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcbiAgbGluayA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG5cbiAgcm9vbU5hbWUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICBtZW1iZXIgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICBhZG1pblBhc3Njb2RlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcbiAgaXNsZXZlbCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignMScpO1xuICBjb0hvc3QgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJ05vIGNvSG9zdCcpO1xuICBjb0hvc3RSZXNwb25zaWJpbGl0eSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Q29Ib3N0UmVzcG9uc2liaWxpdHlbXT4oW1xuICAgIHsgbmFtZTogJ3BhcnRpY2lwYW50cycsIHZhbHVlOiBmYWxzZSwgZGVkaWNhdGVkOiBmYWxzZSB9LFxuICAgIHsgbmFtZTogJ21lZGlhJywgdmFsdWU6IGZhbHNlLCBkZWRpY2F0ZWQ6IGZhbHNlIH0sXG4gICAgeyBuYW1lOiAnd2FpdGluZycsIHZhbHVlOiBmYWxzZSwgZGVkaWNhdGVkOiBmYWxzZSB9LFxuICAgIHsgbmFtZTogJ2NoYXQnLCB2YWx1ZTogZmFsc2UsIGRlZGljYXRlZDogZmFsc2UgfSxcbiAgXSk7XG4gIHlvdUFyZUNvSG9zdCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICB5b3VBcmVIb3N0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGNvbmZpcm1lZFRvUmVjb3JkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIG1lZXRpbmdEaXNwbGF5VHlwZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignbWVkaWEnKTtcbiAgbWVldGluZ1ZpZGVvT3B0aW1pemVkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGV2ZW50VHlwZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8RXZlbnRUeXBlPignd2ViaW5hcicpO1xuICBwYXJ0aWNpcGFudHMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFBhcnRpY2lwYW50W10+KFtdKTtcbiAgZmlsdGVyZWRQYXJ0aWNpcGFudHMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFBhcnRpY2lwYW50W10+KFtdKTtcbiAgcGFydGljaXBhbnRzQ291bnRlciA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgcGFydGljaXBhbnRzRmlsdGVyID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcblxuICBjb25zdW1lX3NvY2tldHMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PENvbnN1bWVTb2NrZXRbXT4oW10pO1xuICBydHBDYXBhYmlsaXRpZXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFJ0cENhcGFiaWxpdGllcyB8IG51bGw+KG51bGwpO1xuICByb29tUmVjdklQcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nW10+KFtdKTtcbiAgbWVldGluZ1Jvb21QYXJhbXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE1lZXRpbmdSb29tUGFyYW1zIHwgbnVsbD4obnVsbCk7XG4gIGl0ZW1QYWdlTGltaXQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oNCk7XG4gIGF1ZGlvT25seVJvb20gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgYWRkRm9yQmFzaWMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgc2NyZWVuUGFnZUxpbWl0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDQpO1xuICBzaGFyZVNjcmVlblN0YXJ0ZWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgc2hhcmVkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHRhcmdldE9yaWVudGF0aW9uID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCdsYW5kc2NhcGUnKTtcbiAgdGFyZ2V0UmVzb2x1dGlvbiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignc2QnKTtcbiAgdGFyZ2V0UmVzb2x1dGlvbkhvc3QgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJ3NkJyk7XG4gIHZpZENvbnMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFZpZENvbnM+KHsgd2lkdGg6IDY0MCwgaGVpZ2h0OiAzNjAgfSk7XG4gIGZyYW1lUmF0ZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigxMCk7XG4gIGhQYXJhbXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEhQYXJhbXNUeXBlPih7fSBhcyBIUGFyYW1zVHlwZSk7XG4gIHZQYXJhbXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFZQYXJhbXNUeXBlPih7fSBhcyBWUGFyYW1zVHlwZSk7XG4gIHNjcmVlblBhcmFtcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8U2NyZWVuUGFyYW1zVHlwZT4oe30gYXMgU2NyZWVuUGFyYW1zVHlwZSk7XG4gIGFQYXJhbXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEFQYXJhbXNUeXBlPih7fSBhcyBBUGFyYW1zVHlwZSk7XG5cbiAgcmVjb3JkaW5nQXVkaW9QYXVzZXNMaW1pdCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgcmVjb3JkaW5nQXVkaW9QYXVzZXNDb3VudCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgcmVjb3JkaW5nQXVkaW9TdXBwb3J0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHJlY29yZGluZ0F1ZGlvUGVvcGxlTGltaXQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG4gIHJlY29yZGluZ0F1ZGlvUGFydGljaXBhbnRzVGltZUxpbWl0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICByZWNvcmRpbmdWaWRlb1BhdXNlc0NvdW50ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICByZWNvcmRpbmdWaWRlb1BhdXNlc0xpbWl0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICByZWNvcmRpbmdWaWRlb1N1cHBvcnQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgcmVjb3JkaW5nVmlkZW9QZW9wbGVMaW1pdCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgcmVjb3JkaW5nVmlkZW9QYXJ0aWNpcGFudHNUaW1lTGltaXQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG4gIHJlY29yZGluZ0FsbFBhcnRpY2lwYW50c1N1cHBvcnQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgcmVjb3JkaW5nVmlkZW9QYXJ0aWNpcGFudHNTdXBwb3J0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHJlY29yZGluZ0FsbFBhcnRpY2lwYW50c0Z1bGxSb29tU3VwcG9ydCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICByZWNvcmRpbmdWaWRlb1BhcnRpY2lwYW50c0Z1bGxSb29tU3VwcG9ydCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICByZWNvcmRpbmdQcmVmZXJyZWRPcmllbnRhdGlvbiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignbGFuZHNjYXBlJyk7XG4gIHJlY29yZGluZ1N1cHBvcnRGb3JPdGhlck9yaWVudGF0aW9uID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHJlY29yZGluZ011bHRpRm9ybWF0c1N1cHBvcnQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcblxuICB1c2VyUmVjb3JkaW5nUGFyYW1zID0gbmV3IEJlaGF2aW9yU3ViamVjdDxVc2VyUmVjb3JkaW5nUGFyYW1zPih7XG4gICAgbWFpblNwZWNzOiB7XG4gICAgICBtZWRpYU9wdGlvbnM6ICd2aWRlbycsIC8vICdhdWRpbycsICd2aWRlbydcbiAgICAgIGF1ZGlvT3B0aW9uczogJ2FsbCcsIC8vICdhbGwnLCAnb25TY3JlZW4nLCAnaG9zdCdcbiAgICAgIHZpZGVvT3B0aW9uczogJ2FsbCcsIC8vICdhbGwnLCAnbWFpblNjcmVlbidcbiAgICAgIHZpZGVvVHlwZTogJ2Z1bGxEaXNwbGF5JywgLy8gJ2FsbCcsICdiZXN0RGlzcGxheScsICdmdWxsRGlzcGxheSdcbiAgICAgIHZpZGVvT3B0aW1pemVkOiBmYWxzZSwgLy8gdHJ1ZSwgZmFsc2VcbiAgICAgIHJlY29yZGluZ0Rpc3BsYXlUeXBlOiAnbWVkaWEnLCAvLyAnbWVkaWEnLCAndmlkZW8nLCAnYWxsJ1xuICAgICAgYWRkSExTOiBmYWxzZSwgLy8gdHJ1ZSwgZmFsc2VcbiAgICB9LFxuICAgIGRpc3BTcGVjczoge1xuICAgICAgbmFtZVRhZ3M6IHRydWUsIC8vIHRydWUsIGZhbHNlXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjMDAwMDAwJywgLy8gJyMwMDAwMDAnLCAnI2ZmZmZmZidcbiAgICAgIG5hbWVUYWdzQ29sb3I6ICcjZmZmZmZmJywgLy8gJyMwMDAwMDAnLCAnI2ZmZmZmZidcbiAgICAgIG9yaWVudGF0aW9uVmlkZW86ICdwb3J0cmFpdCcsIC8vICdsYW5kc2NhcGUnLCAncG9ydHJhaXQnLCAnYWxsJ1xuICAgIH0sXG4gIH0pO1xuXG4gIGNhblJlY29yZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBzdGFydFJlcG9ydCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBlbmRSZXBvcnQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgcmVjb3JkVGltZXJJbnRlcnZhbCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Tm9kZUpTLlRpbWVvdXQgfCBudWxsPihudWxsKTtcbiAgcmVjb3JkU3RhcnRUaW1lID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICByZWNvcmRFbGFwc2VkVGltZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgaXNUaW1lclJ1bm5pbmcgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgY2FuUGF1c2VSZXN1bWUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgcmVjb3JkQ2hhbmdlU2Vjb25kcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigxNTAwMCk7XG4gIHBhdXNlTGltaXQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG4gIHBhdXNlUmVjb3JkQ291bnQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG4gIGNhbkxhdW5jaFJlY29yZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4odHJ1ZSk7XG4gIHN0b3BMYXVuY2hSZWNvcmQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcblxuICBwYXJ0aWNpcGFudHNBbGwgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFBhcnRpY2lwYW50W10+KFtdKTtcblxuICBmaXJzdEFsbCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICB1cGRhdGVNYWluV2luZG93ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGZpcnN0X3JvdW5kID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGxhbmRTY2FwZWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgbG9ja19zY3JlZW4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgc2NyZWVuSWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICBhbGxWaWRlb1N0cmVhbXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PChQYXJ0aWNpcGFudCB8IFN0cmVhbSlbXT4oW10pO1xuICBuZXdMaW1pdGVkU3RyZWFtcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8KFBhcnRpY2lwYW50IHwgU3RyZWFtKVtdPihbXSk7XG4gIG5ld0xpbWl0ZWRTdHJlYW1zSURzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmdbXT4oW10pO1xuICBhY3RpdmVTb3VuZHMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZ1tdPihbXSk7XG4gIHNjcmVlblNoYXJlSURTdHJlYW0gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICBzY3JlZW5TaGFyZU5hbWVTdHJlYW0gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICBhZG1pbklEU3RyZWFtID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcbiAgYWRtaW5OYW1lU3RyZWFtID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcbiAgeW91WW91U3RyZWFtID0gbmV3IEJlaGF2aW9yU3ViamVjdDwoUGFydGljaXBhbnQgfCBTdHJlYW0pW10+KFtdKTtcbiAgeW91WW91U3RyZWFtSURzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmdbXT4oW10pO1xuICBsb2NhbFN0cmVhbSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8TWVkaWFTdHJlYW0gfCBudWxsPihudWxsKTtcbiAgcmVjb3JkU3RhcnRlZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICByZWNvcmRSZXN1bWVkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHJlY29yZFBhdXNlZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICByZWNvcmRTdG9wcGVkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGFkbWluUmVzdHJpY3RTZXR0aW5nID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHZpZGVvUmVxdWVzdFN0YXRlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmcgfCBudWxsPihudWxsKTtcbiAgdmlkZW9SZXF1ZXN0VGltZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgdmlkZW9BY3Rpb24gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgbG9jYWxTdHJlYW1WaWRlbyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8TWVkaWFTdHJlYW0gfCBudWxsPihudWxsKTtcbiAgdXNlckRlZmF1bHRWaWRlb0lucHV0RGV2aWNlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcbiAgY3VycmVudEZhY2luZ01vZGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJ3VzZXInKTtcbiAgcHJldkZhY2luZ01vZGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJ3VzZXInKTtcbiAgZGVmVmlkZW9JRCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gIGFsbG93ZWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgZGlzcEFjdGl2ZU5hbWVzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmdbXT4oW10pO1xuICBwX2Rpc3BBY3RpdmVOYW1lcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nW10+KFtdKTtcbiAgYWN0aXZlTmFtZXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZ1tdPihbXSk7XG4gIHByZXZBY3RpdmVOYW1lcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nW10+KFtdKTtcbiAgcF9hY3RpdmVOYW1lcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nW10+KFtdKTtcbiAgbWVtYmVyc1JlY2VpdmVkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGRlZmVyU2NyZWVuUmVjZWl2ZWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgaG9zdEZpcnN0U3dpdGNoID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIG1pY0FjdGlvbiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBzY3JlZW5BY3Rpb24gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgY2hhdEFjdGlvbiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBhdWRpb1JlcXVlc3RTdGF0ZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG4gIHNjcmVlblJlcXVlc3RTdGF0ZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG4gIGNoYXRSZXF1ZXN0U3RhdGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZyB8IG51bGw+KG51bGwpO1xuICBhdWRpb1JlcXVlc3RUaW1lID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICBzY3JlZW5SZXF1ZXN0VGltZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgY2hhdFJlcXVlc3RUaW1lID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICB1cGRhdGVSZXF1ZXN0SW50ZXJ2YWxTZWNvbmRzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDI0MCk7XG4gIG9sZFNvdW5kSWRzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmdbXT4oW10pO1xuICBob3N0TGFiZWwgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJ0hvc3QnKTtcbiAgbWFpblNjcmVlbkZpbGxlZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBsb2NhbFN0cmVhbVNjcmVlbiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8TWVkaWFTdHJlYW0gfCBudWxsPihudWxsKTtcbiAgc2NyZWVuQWxyZWFkeU9uID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGNoYXRBbHJlYWR5T24gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgcmVkaXJlY3RVUkwgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICBvbGRBbGxTdHJlYW1zID0gbmV3IEJlaGF2aW9yU3ViamVjdDwoUGFydGljaXBhbnQgfCBTdHJlYW0pW10+KFtdKTtcbiAgYWRtaW5WaWRJRCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gIHN0cmVhbU5hbWVzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxTdHJlYW1bXT4oW10pO1xuICBub25fYWxWaWRlb1N0cmVhbXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFBhcnRpY2lwYW50W10+KFtdKTtcbiAgc29ydEF1ZGlvTG91ZG5lc3MgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgYXVkaW9EZWNpYmVscyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8QXVkaW9EZWNpYmVsc1tdPihbXSk7XG4gIG1peGVkX2FsVmlkZW9TdHJlYW1zID0gbmV3IEJlaGF2aW9yU3ViamVjdDwoUGFydGljaXBhbnQgfCBTdHJlYW0pW10+KFtdKTtcbiAgbm9uX2FsVmlkZW9TdHJlYW1zX211dGVkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxQYXJ0aWNpcGFudFtdPihbXSk7XG4gIHBhZ2luYXRlZFN0cmVhbXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PChQYXJ0aWNpcGFudCB8IFN0cmVhbSlbXVtdPihbXSk7XG4gIGxvY2FsU3RyZWFtQXVkaW8gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE1lZGlhU3RyZWFtIHwgbnVsbD4obnVsbCk7XG4gIGRlZkF1ZGlvSUQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICB1c2VyRGVmYXVsdEF1ZGlvSW5wdXREZXZpY2UgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICB1c2VyRGVmYXVsdEF1ZGlvT3V0cHV0RGV2aWNlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcbiAgcHJldkF1ZGlvSW5wdXREZXZpY2UgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICBwcmV2VmlkZW9JbnB1dERldmljZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gIGF1ZGlvUGF1c2VkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIG1haW5TY3JlZW5QZXJzb24gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICBhZG1pbk9uTWFpblNjcmVlbiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBzY3JlZW5TdGF0ZXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFNjcmVlblN0YXRlW10+KFtcbiAgICB7XG4gICAgICBtYWluU2NyZWVuUGVyc29uOiAnJyxcbiAgICAgIG1haW5TY3JlZW5Qcm9kdWNlcklkOiAnJyxcbiAgICAgIG1haW5TY3JlZW5GaWxsZWQ6IGZhbHNlLFxuICAgICAgYWRtaW5Pbk1haW5TY3JlZW46IGZhbHNlLFxuICAgIH0sXG4gIF0pO1xuICBwcmV2U2NyZWVuU3RhdGVzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxTY3JlZW5TdGF0ZVtdPihbXG4gICAge1xuICAgICAgbWFpblNjcmVlblBlcnNvbjogJycsXG4gICAgICBtYWluU2NyZWVuUHJvZHVjZXJJZDogJycsXG4gICAgICBtYWluU2NyZWVuRmlsbGVkOiBmYWxzZSxcbiAgICAgIGFkbWluT25NYWluU2NyZWVuOiBmYWxzZSxcbiAgICB9LFxuICBdKTtcbiAgdXBkYXRlRGF0ZVN0YXRlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXIgfCBudWxsPihudWxsKTtcbiAgbGFzdFVwZGF0ZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyIHwgbnVsbD4obnVsbCk7XG4gIG5Gb3JSZWFkanVzdFJlY29yZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgZml4ZWRQYWdlTGltaXQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oNCk7XG4gIHJlbW92ZUFsdEdyaWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgbkZvclJlYWRqdXN0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICByZW9yZGVySW50ZXJ2YWwgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMzAwMDApO1xuICBmYXN0UmVvcmRlckludGVydmFsID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDEwMDAwKTtcbiAgbGFzdFJlb3JkZXJUaW1lID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICBhdWRTdHJlYW1OYW1lcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8U3RyZWFtW10+KFtdKTtcbiAgY3VycmVudFVzZXJQYWdlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICBtYWluSGVpZ2h0V2lkdGggPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oXG4gICAgdGhpcy5ldmVudFR5cGUudmFsdWUgPT0gJ3dlYmluYXInID8gNjcgOiB0aGlzLmV2ZW50VHlwZS52YWx1ZSA9PSAnYnJvYWRjYXN0JyA/IDEwMCA6IDAsXG4gICk7XG4gIHByZXZNYWluSGVpZ2h0V2lkdGggPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4odGhpcy5tYWluSGVpZ2h0V2lkdGgudmFsdWUpO1xuICBwcmV2RG9QYWdpbmF0ZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBkb1BhZ2luYXRlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHNoYXJlRW5kZWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgbFN0cmVhbXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PChQYXJ0aWNpcGFudCB8IFN0cmVhbSlbXT4oW10pO1xuICBjaGF0UmVmU3RyZWFtcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8KFBhcnRpY2lwYW50IHwgU3RyZWFtKVtdPihbXSk7XG4gIGNvbnRyb2xIZWlnaHQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oXG4gICAgdGhpcy5ldmVudFR5cGUudmFsdWUgPT09ICd3ZWJpbmFyJyB8fCB0aGlzLmV2ZW50VHlwZS52YWx1ZSA9PT0gJ2NvbmZlcmVuY2UnID8gMCA6IDAuMDYsXG4gICk7XG4gIGlzV2lkZVNjcmVlbiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBpc01lZGl1bVNjcmVlbiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBpc1NtYWxsU2NyZWVuID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGFkZEdyaWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgYWRkQWx0R3JpZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBncmlkUm93cyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgZ3JpZENvbHMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG4gIGFsdEdyaWRSb3dzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICBhbHRHcmlkQ29scyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgbnVtYmVyUGFnZXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG4gIGN1cnJlbnRTdHJlYW1zID0gbmV3IEJlaGF2aW9yU3ViamVjdDwoUGFydGljaXBhbnQgfCBTdHJlYW0pW10+KFtdKTtcbiAgc2hvd01pbmlWaWV3ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIG5TdHJlYW0gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE1lZGlhU3RyZWFtIHwgbnVsbD4obnVsbCk7XG4gIGRlZmVyX3JlY2VpdmUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgYWxsQXVkaW9TdHJlYW1zID0gbmV3IEJlaGF2aW9yU3ViamVjdDwoUGFydGljaXBhbnQgfCBTdHJlYW0pW10+KFtdKTtcbiAgcmVtb3RlU2NyZWVuU3RyZWFtID0gbmV3IEJlaGF2aW9yU3ViamVjdDxTdHJlYW1bXT4oW10pO1xuICBzY3JlZW5Qcm9kdWNlciA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UHJvZHVjZXIgfCBudWxsPihudWxsKTtcbiAgZ290QWxsVmlkcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBwYWdpbmF0aW9uSGVpZ2h0V2lkdGggPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oNDApO1xuICBwYWdpbmF0aW9uRGlyZWN0aW9uID0gbmV3IEJlaGF2aW9yU3ViamVjdDwnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnPignaG9yaXpvbnRhbCcpO1xuICBncmlkU2l6ZXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEdyaWRTaXplcz4oe1xuICAgIGdyaWRXaWR0aDogMCxcbiAgICBncmlkSGVpZ2h0OiAwLFxuICAgIGFsdEdyaWRXaWR0aDogMCxcbiAgICBhbHRHcmlkSGVpZ2h0OiAwLFxuICB9KTtcbiAgc2NyZWVuRm9yY2VGdWxsRGlzcGxheSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBtYWluR3JpZFN0cmVhbSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Q3VzdG9tTWVkaWFDb21wb25lbnRbXT4oW10pO1xuICBvdGhlckdyaWRTdHJlYW1zID0gbmV3IEJlaGF2aW9yU3ViamVjdDxDdXN0b21NZWRpYUNvbXBvbmVudFtdW10+KFtdKTtcbiAgYXVkaW9Pbmx5U3RyZWFtcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Q3VzdG9tTWVkaWFDb21wb25lbnRbXT4oW10pO1xuICB2aWRlb0lucHV0cyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8TWVkaWFEZXZpY2VJbmZvW10+KFtdKTtcbiAgYXVkaW9JbnB1dHMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE1lZGlhRGV2aWNlSW5mb1tdPihbXSk7XG4gIG1lZXRpbmdQcm9ncmVzc1RpbWUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJzAwOjAwOjAwJyk7XG4gIG1lZXRpbmdFbGFwc2VkVGltZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgcmVmX3BhcnRpY2lwYW50cyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UGFydGljaXBhbnRbXT4oW10pO1xuXG4gIHVwZGF0ZVZhbGlkYXRlZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMudmFsaWRhdGVkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVNvY2tldCA9ICh2YWx1ZTogU29ja2V0KSA9PiB7XG4gICAgdGhpcy5zb2NrZXQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlRGV2aWNlID0gKHZhbHVlOiBEZXZpY2UgfCBudWxsKSA9PiB7XG4gICAgdGhpcy5kZXZpY2UubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUm9vbURhdGEgPSAodmFsdWU6IFJlc3BvbnNlSm9pblJvb20gfCBudWxsKSA9PiB7XG4gICAgdGhpcy5yb29tRGF0YS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBcGlLZXkgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMuYXBpS2V5Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUFwaVVzZXJOYW1lID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLmFwaVVzZXJOYW1lLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUFwaVRva2VuID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLmFwaVRva2VuLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUxpbmsgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMubGluay5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSb29tTmFtZSA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5yb29tTmFtZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVNZW1iZXIgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMubWVtYmVyLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUFkbWluUGFzc2NvZGUgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMuYWRtaW5QYXNzY29kZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVJc2xldmVsID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLmlzbGV2ZWwubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQ29Ib3N0ID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLmNvSG9zdC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVDb0hvc3RSZXNwb25zaWJpbGl0eSA9ICh2YWx1ZTogQ29Ib3N0UmVzcG9uc2liaWxpdHlbXSkgPT4ge1xuICAgIHRoaXMuY29Ib3N0UmVzcG9uc2liaWxpdHkubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlWW91QXJlQ29Ib3N0ID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy55b3VBcmVDb0hvc3QubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlWW91QXJlSG9zdCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMueW91QXJlSG9zdC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVDb25maXJtZWRUb1JlY29yZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuY29uZmlybWVkVG9SZWNvcmQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTWVldGluZ0Rpc3BsYXlUeXBlID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLm1lZXRpbmdEaXNwbGF5VHlwZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVNZWV0aW5nVmlkZW9PcHRpbWl6ZWQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLm1lZXRpbmdWaWRlb09wdGltaXplZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVFdmVudFR5cGUgPSAodmFsdWU6IEV2ZW50VHlwZSkgPT4ge1xuICAgIHRoaXMuZXZlbnRUeXBlLm5leHQodmFsdWUpO1xuICAgIGlmICh2YWx1ZSAhPSAnbm9uZScpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuaGFuZGxlUmVzaXplKCk7XG4gICAgICAgIH0sIDIwMDApO1xuICAgICAgfSBjYXRjaCB7XG4gICAgICAgIC8qIGhhbmRsZSBlcnJvciAqL1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICB1cGRhdGVQYXJ0aWNpcGFudHMgPSAodmFsdWU6IFBhcnRpY2lwYW50W10pID0+IHtcbiAgICB0aGlzLnBhcnRpY2lwYW50cy5uZXh0KHZhbHVlKTtcbiAgICB0aGlzLnBhcnRpY2lwYW50c0NvdW50ZXIubmV4dCh2YWx1ZS5sZW5ndGgpO1xuICAgIHRoaXMuZmlsdGVyZWRQYXJ0aWNpcGFudHMubmV4dCh0aGlzLnBhcnRpY2lwYW50cy52YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlRmlsdGVyZWRQYXJ0aWNpcGFudHMgPSAodmFsdWU6IFBhcnRpY2lwYW50W10pID0+IHtcbiAgICB0aGlzLmZpbHRlcmVkUGFydGljaXBhbnRzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVBhcnRpY2lwYW50c0NvdW50ZXIgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMucGFydGljaXBhbnRzQ291bnRlci5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVQYXJ0aWNpcGFudHNGaWx0ZXIgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMucGFydGljaXBhbnRzRmlsdGVyLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUNvbnN1bWVfc29ja2V0cyA9ICh2YWx1ZTogQ29uc3VtZVNvY2tldFtdKSA9PiB7XG4gICAgdGhpcy5jb25zdW1lX3NvY2tldHMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUnRwQ2FwYWJpbGl0aWVzID0gKHZhbHVlOiBSdHBDYXBhYmlsaXRpZXMgfCBudWxsKSA9PiB7XG4gICAgdGhpcy5ydHBDYXBhYmlsaXRpZXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUm9vbVJlY3ZJUHMgPSAodmFsdWU6IHN0cmluZ1tdKSA9PiB7XG4gICAgdGhpcy5yb29tUmVjdklQcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVNZWV0aW5nUm9vbVBhcmFtcyA9ICh2YWx1ZTogTWVldGluZ1Jvb21QYXJhbXMgfCBudWxsKSA9PiB7XG4gICAgdGhpcy5tZWV0aW5nUm9vbVBhcmFtcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVJdGVtUGFnZUxpbWl0ID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLml0ZW1QYWdlTGltaXQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQXVkaW9Pbmx5Um9vbSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuYXVkaW9Pbmx5Um9vbS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBZGRGb3JCYXNpYyA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuYWRkRm9yQmFzaWMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlU2NyZWVuUGFnZUxpbWl0ID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLnNjcmVlblBhZ2VMaW1pdC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVTaGFyZVNjcmVlblN0YXJ0ZWQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnNoYXJlU2NyZWVuU3RhcnRlZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVTaGFyZWQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnNoYXJlZC5uZXh0KHZhbHVlKTtcbiAgICB0aGlzLnNjcmVlblNoYXJlQWN0aXZlLm5leHQodmFsdWUpO1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgc2V0VGltZW91dChhc3luYyAoKSA9PiB7XG4gICAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgncmVzaXplJykpO1xuICAgICAgfSwgMjAwMCk7XG4gICAgfVxuICB9O1xuXG4gIHVwZGF0ZVRhcmdldE9yaWVudGF0aW9uID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLnRhcmdldE9yaWVudGF0aW9uLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVRhcmdldFJlc29sdXRpb24gPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMudGFyZ2V0UmVzb2x1dGlvbi5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVUYXJnZXRSZXNvbHV0aW9uSG9zdCA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy50YXJnZXRSZXNvbHV0aW9uSG9zdC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVWaWRDb25zID0gKHZhbHVlOiBWaWRDb25zKSA9PiB7XG4gICAgdGhpcy52aWRDb25zLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUZyYW1lUmF0ZSA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5mcmFtZVJhdGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlSFBhcmFtcyA9ICh2YWx1ZTogSFBhcmFtc1R5cGUpID0+IHtcbiAgICB0aGlzLmhQYXJhbXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlVlBhcmFtcyA9ICh2YWx1ZTogVlBhcmFtc1R5cGUpID0+IHtcbiAgICB0aGlzLnZQYXJhbXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlU2NyZWVuUGFyYW1zID0gKHZhbHVlOiBTY3JlZW5QYXJhbXNUeXBlKSA9PiB7XG4gICAgdGhpcy5zY3JlZW5QYXJhbXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQVBhcmFtcyA9ICh2YWx1ZTogQVBhcmFtc1R5cGUpID0+IHtcbiAgICB0aGlzLmFQYXJhbXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nQXVkaW9QYXVzZXNMaW1pdCA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdBdWRpb1BhdXNlc0xpbWl0Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ0F1ZGlvUGF1c2VzQ291bnQgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMucmVjb3JkaW5nQXVkaW9QYXVzZXNDb3VudC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRpbmdBdWRpb1N1cHBvcnQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ0F1ZGlvU3VwcG9ydC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRpbmdBdWRpb1Blb3BsZUxpbWl0ID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ0F1ZGlvUGVvcGxlTGltaXQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nQXVkaW9QYXJ0aWNpcGFudHNUaW1lTGltaXQgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMucmVjb3JkaW5nQXVkaW9QYXJ0aWNpcGFudHNUaW1lTGltaXQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nVmlkZW9QYXVzZXNDb3VudCA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdWaWRlb1BhdXNlc0NvdW50Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ1ZpZGVvUGF1c2VzTGltaXQgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMucmVjb3JkaW5nVmlkZW9QYXVzZXNMaW1pdC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRpbmdWaWRlb1N1cHBvcnQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ1ZpZGVvU3VwcG9ydC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRpbmdWaWRlb1Blb3BsZUxpbWl0ID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ1ZpZGVvUGVvcGxlTGltaXQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nVmlkZW9QYXJ0aWNpcGFudHNUaW1lTGltaXQgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMucmVjb3JkaW5nVmlkZW9QYXJ0aWNpcGFudHNUaW1lTGltaXQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nQWxsUGFydGljaXBhbnRzU3VwcG9ydCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMucmVjb3JkaW5nQWxsUGFydGljaXBhbnRzU3VwcG9ydC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRpbmdWaWRlb1BhcnRpY2lwYW50c1N1cHBvcnQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ1ZpZGVvUGFydGljaXBhbnRzU3VwcG9ydC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRpbmdBbGxQYXJ0aWNpcGFudHNGdWxsUm9vbVN1cHBvcnQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ0FsbFBhcnRpY2lwYW50c0Z1bGxSb29tU3VwcG9ydC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRpbmdWaWRlb1BhcnRpY2lwYW50c0Z1bGxSb29tU3VwcG9ydCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMucmVjb3JkaW5nVmlkZW9QYXJ0aWNpcGFudHNGdWxsUm9vbVN1cHBvcnQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nUHJlZmVycmVkT3JpZW50YXRpb24gPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMucmVjb3JkaW5nUHJlZmVycmVkT3JpZW50YXRpb24ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nU3VwcG9ydEZvck90aGVyT3JpZW50YXRpb24gPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ1N1cHBvcnRGb3JPdGhlck9yaWVudGF0aW9uLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ011bHRpRm9ybWF0c1N1cHBvcnQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ011bHRpRm9ybWF0c1N1cHBvcnQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlVXNlclJlY29yZGluZ1BhcmFtcyA9ICh2YWx1ZTogVXNlclJlY29yZGluZ1BhcmFtcykgPT4ge1xuICAgIHRoaXMudXNlclJlY29yZGluZ1BhcmFtcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVDYW5SZWNvcmQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmNhblJlY29yZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVTdGFydFJlcG9ydCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuc3RhcnRSZXBvcnQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlRW5kUmVwb3J0ID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5lbmRSZXBvcnQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkVGltZXJJbnRlcnZhbCA9ICh2YWx1ZTogTm9kZUpTLlRpbWVvdXQgfCBudWxsKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRUaW1lckludGVydmFsLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZFN0YXJ0VGltZSA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRTdGFydFRpbWUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkRWxhcHNlZFRpbWUgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMucmVjb3JkRWxhcHNlZFRpbWUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlSXNUaW1lclJ1bm5pbmcgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmlzVGltZXJSdW5uaW5nLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUNhblBhdXNlUmVzdW1lID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5jYW5QYXVzZVJlc3VtZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRDaGFuZ2VTZWNvbmRzID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLnJlY29yZENoYW5nZVNlY29uZHMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUGF1c2VMaW1pdCA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5wYXVzZUxpbWl0Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVBhdXNlUmVjb3JkQ291bnQgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMucGF1c2VSZWNvcmRDb3VudC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVDYW5MYXVuY2hSZWNvcmQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmNhbkxhdW5jaFJlY29yZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVTdG9wTGF1bmNoUmVjb3JkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5zdG9wTGF1bmNoUmVjb3JkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVBhcnRpY2lwYW50c0FsbCA9ICh2YWx1ZTogUGFydGljaXBhbnRbXSkgPT4ge1xuICAgIHRoaXMucGFydGljaXBhbnRzQWxsLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUZpcnN0QWxsID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5maXJzdEFsbC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVVcGRhdGVNYWluV2luZG93ID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy51cGRhdGVNYWluV2luZG93Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUZpcnN0X3JvdW5kID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5maXJzdF9yb3VuZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVMYW5kU2NhcGVkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5sYW5kU2NhcGVkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUxvY2tfc2NyZWVuID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5sb2NrX3NjcmVlbi5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVTY3JlZW5JZCA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5zY3JlZW5JZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBbGxWaWRlb1N0cmVhbXMgPSAodmFsdWU6IChQYXJ0aWNpcGFudCB8IFN0cmVhbSlbXSkgPT4ge1xuICAgIHRoaXMuYWxsVmlkZW9TdHJlYW1zLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZU5ld0xpbWl0ZWRTdHJlYW1zID0gKHZhbHVlOiAoUGFydGljaXBhbnQgfCBTdHJlYW0pW10pID0+IHtcbiAgICB0aGlzLm5ld0xpbWl0ZWRTdHJlYW1zLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZU5ld0xpbWl0ZWRTdHJlYW1zSURzID0gKHZhbHVlOiBzdHJpbmdbXSkgPT4ge1xuICAgIHRoaXMubmV3TGltaXRlZFN0cmVhbXNJRHMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQWN0aXZlU291bmRzID0gKHZhbHVlOiBzdHJpbmdbXSkgPT4ge1xuICAgIHRoaXMuYWN0aXZlU291bmRzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVNjcmVlblNoYXJlSURTdHJlYW0gPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMuc2NyZWVuU2hhcmVJRFN0cmVhbS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVTY3JlZW5TaGFyZU5hbWVTdHJlYW0gPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMuc2NyZWVuU2hhcmVOYW1lU3RyZWFtLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUFkbWluSURTdHJlYW0gPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMuYWRtaW5JRFN0cmVhbS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBZG1pbk5hbWVTdHJlYW0gPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMuYWRtaW5OYW1lU3RyZWFtLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVlvdVlvdVN0cmVhbSA9ICh2YWx1ZTogKFBhcnRpY2lwYW50IHwgU3RyZWFtKVtdKSA9PiB7XG4gICAgdGhpcy55b3VZb3VTdHJlYW0ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlWW91WW91U3RyZWFtSURzID0gKHZhbHVlOiBzdHJpbmdbXSkgPT4ge1xuICAgIHRoaXMueW91WW91U3RyZWFtSURzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUxvY2FsU3RyZWFtID0gKHZhbHVlOiBNZWRpYVN0cmVhbSB8IG51bGwpID0+IHtcbiAgICB0aGlzLmxvY2FsU3RyZWFtLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZFN0YXJ0ZWQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnJlY29yZFN0YXJ0ZWQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkUmVzdW1lZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMucmVjb3JkUmVzdW1lZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRQYXVzZWQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnJlY29yZFBhdXNlZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRTdG9wcGVkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRTdG9wcGVkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUFkbWluUmVzdHJpY3RTZXR0aW5nID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5hZG1pblJlc3RyaWN0U2V0dGluZy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVWaWRlb1JlcXVlc3RTdGF0ZSA9ICh2YWx1ZTogc3RyaW5nIHwgbnVsbCkgPT4ge1xuICAgIHRoaXMudmlkZW9SZXF1ZXN0U3RhdGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlVmlkZW9SZXF1ZXN0VGltZSA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy52aWRlb1JlcXVlc3RUaW1lLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVZpZGVvQWN0aW9uID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy52aWRlb0FjdGlvbi5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVMb2NhbFN0cmVhbVZpZGVvID0gKHZhbHVlOiBNZWRpYVN0cmVhbSB8IG51bGwpID0+IHtcbiAgICB0aGlzLmxvY2FsU3RyZWFtVmlkZW8ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlVXNlckRlZmF1bHRWaWRlb0lucHV0RGV2aWNlID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLnVzZXJEZWZhdWx0VmlkZW9JbnB1dERldmljZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVDdXJyZW50RmFjaW5nTW9kZSA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5jdXJyZW50RmFjaW5nTW9kZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVQcmV2RmFjaW5nTW9kZSA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5wcmV2RmFjaW5nTW9kZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVEZWZWaWRlb0lEID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLmRlZlZpZGVvSUQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQWxsb3dlZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuYWxsb3dlZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVEaXNwQWN0aXZlTmFtZXMgPSAodmFsdWU6IHN0cmluZ1tdKSA9PiB7XG4gICAgdGhpcy5kaXNwQWN0aXZlTmFtZXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUF9kaXNwQWN0aXZlTmFtZXMgPSAodmFsdWU6IHN0cmluZ1tdKSA9PiB7XG4gICAgdGhpcy5wX2Rpc3BBY3RpdmVOYW1lcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBY3RpdmVOYW1lcyA9ICh2YWx1ZTogc3RyaW5nW10pID0+IHtcbiAgICB0aGlzLmFjdGl2ZU5hbWVzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVByZXZBY3RpdmVOYW1lcyA9ICh2YWx1ZTogc3RyaW5nW10pID0+IHtcbiAgICB0aGlzLnByZXZBY3RpdmVOYW1lcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVQX2FjdGl2ZU5hbWVzID0gKHZhbHVlOiBzdHJpbmdbXSkgPT4ge1xuICAgIHRoaXMucF9hY3RpdmVOYW1lcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVNZW1iZXJzUmVjZWl2ZWQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLm1lbWJlcnNSZWNlaXZlZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVEZWZlclNjcmVlblJlY2VpdmVkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5kZWZlclNjcmVlblJlY2VpdmVkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUhvc3RGaXJzdFN3aXRjaCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuaG9zdEZpcnN0U3dpdGNoLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZU1pY0FjdGlvbiA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMubWljQWN0aW9uLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVNjcmVlbkFjdGlvbiA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuc2NyZWVuQWN0aW9uLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUNoYXRBY3Rpb24gPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmNoYXRBY3Rpb24ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQXVkaW9SZXF1ZXN0U3RhdGUgPSAodmFsdWU6IHN0cmluZyB8IG51bGwpID0+IHtcbiAgICB0aGlzLmF1ZGlvUmVxdWVzdFN0YXRlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVNjcmVlblJlcXVlc3RTdGF0ZSA9ICh2YWx1ZTogc3RyaW5nIHwgbnVsbCkgPT4ge1xuICAgIHRoaXMuc2NyZWVuUmVxdWVzdFN0YXRlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUNoYXRSZXF1ZXN0U3RhdGUgPSAodmFsdWU6IHN0cmluZyB8IG51bGwpID0+IHtcbiAgICB0aGlzLmNoYXRSZXF1ZXN0U3RhdGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQXVkaW9SZXF1ZXN0VGltZSA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5hdWRpb1JlcXVlc3RUaW1lLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVNjcmVlblJlcXVlc3RUaW1lID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLnNjcmVlblJlcXVlc3RUaW1lLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUNoYXRSZXF1ZXN0VGltZSA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5jaGF0UmVxdWVzdFRpbWUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlT2xkU291bmRJZHMgPSAodmFsdWU6IHN0cmluZ1tdKSA9PiB7XG4gICAgdGhpcy5vbGRTb3VuZElkcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVIb3N0TGFiZWwgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMuaG9zdExhYmVsLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZU1haW5TY3JlZW5GaWxsZWQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLm1haW5TY3JlZW5GaWxsZWQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTG9jYWxTdHJlYW1TY3JlZW4gPSAodmFsdWU6IE1lZGlhU3RyZWFtIHwgbnVsbCkgPT4ge1xuICAgIHRoaXMubG9jYWxTdHJlYW1TY3JlZW4ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlU2NyZWVuQWxyZWFkeU9uID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5zY3JlZW5BbHJlYWR5T24ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQ2hhdEFscmVhZHlPbiA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuY2hhdEFscmVhZHlPbi5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZWRpcmVjdFVSTCA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5yZWRpcmVjdFVSTC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVPbGRBbGxTdHJlYW1zID0gKHZhbHVlOiAoUGFydGljaXBhbnQgfCBTdHJlYW0pW10pID0+IHtcbiAgICB0aGlzLm9sZEFsbFN0cmVhbXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQWRtaW5WaWRJRCA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5hZG1pblZpZElELm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVN0cmVhbU5hbWVzID0gKHZhbHVlOiBTdHJlYW1bXSkgPT4ge1xuICAgIHRoaXMuc3RyZWFtTmFtZXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTm9uX2FsVmlkZW9TdHJlYW1zID0gKHZhbHVlOiBQYXJ0aWNpcGFudFtdKSA9PiB7XG4gICAgdGhpcy5ub25fYWxWaWRlb1N0cmVhbXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlU29ydEF1ZGlvTG91ZG5lc3MgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnNvcnRBdWRpb0xvdWRuZXNzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUF1ZGlvRGVjaWJlbHMgPSAodmFsdWU6IEF1ZGlvRGVjaWJlbHNbXSkgPT4ge1xuICAgIHRoaXMuYXVkaW9EZWNpYmVscy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVNaXhlZF9hbFZpZGVvU3RyZWFtcyA9ICh2YWx1ZTogKFBhcnRpY2lwYW50IHwgU3RyZWFtKVtdKSA9PiB7XG4gICAgdGhpcy5taXhlZF9hbFZpZGVvU3RyZWFtcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVOb25fYWxWaWRlb1N0cmVhbXNfbXV0ZWQgPSAodmFsdWU6IFBhcnRpY2lwYW50W10pID0+IHtcbiAgICB0aGlzLm5vbl9hbFZpZGVvU3RyZWFtc19tdXRlZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVQYWdpbmF0ZWRTdHJlYW1zID0gKHZhbHVlOiAoUGFydGljaXBhbnQgfCBTdHJlYW0pW11bXSkgPT4ge1xuICAgIHRoaXMucGFnaW5hdGVkU3RyZWFtcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVMb2NhbFN0cmVhbUF1ZGlvID0gKHZhbHVlOiBNZWRpYVN0cmVhbSB8IG51bGwpID0+IHtcbiAgICB0aGlzLmxvY2FsU3RyZWFtQXVkaW8ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlRGVmQXVkaW9JRCA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5kZWZBdWRpb0lELm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVVzZXJEZWZhdWx0QXVkaW9JbnB1dERldmljZSA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy51c2VyRGVmYXVsdEF1ZGlvSW5wdXREZXZpY2UubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlVXNlckRlZmF1bHRBdWRpb091dHB1dERldmljZSA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy51c2VyRGVmYXVsdEF1ZGlvT3V0cHV0RGV2aWNlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVByZXZBdWRpb0lucHV0RGV2aWNlID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLnByZXZBdWRpb0lucHV0RGV2aWNlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVByZXZWaWRlb0lucHV0RGV2aWNlID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLnByZXZWaWRlb0lucHV0RGV2aWNlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUF1ZGlvUGF1c2VkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5hdWRpb1BhdXNlZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVNYWluU2NyZWVuUGVyc29uID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLm1haW5TY3JlZW5QZXJzb24ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQWRtaW5Pbk1haW5TY3JlZW4gPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmFkbWluT25NYWluU2NyZWVuLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVNjcmVlblN0YXRlcyA9ICh2YWx1ZTogU2NyZWVuU3RhdGVbXSkgPT4ge1xuICAgIHRoaXMuc2NyZWVuU3RhdGVzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVByZXZTY3JlZW5TdGF0ZXMgPSAodmFsdWU6IFNjcmVlblN0YXRlW10pID0+IHtcbiAgICB0aGlzLnByZXZTY3JlZW5TdGF0ZXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlVXBkYXRlRGF0ZVN0YXRlID0gKHZhbHVlOiBudW1iZXIgfCBudWxsKSA9PiB7XG4gICAgdGhpcy51cGRhdGVEYXRlU3RhdGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTGFzdFVwZGF0ZSA9ICh2YWx1ZTogbnVtYmVyIHwgbnVsbCkgPT4ge1xuICAgIHRoaXMubGFzdFVwZGF0ZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVORm9yUmVhZGp1c3RSZWNvcmQgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMubkZvclJlYWRqdXN0UmVjb3JkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUZpeGVkUGFnZUxpbWl0ID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLmZpeGVkUGFnZUxpbWl0Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlbW92ZUFsdEdyaWQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnJlbW92ZUFsdEdyaWQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTkZvclJlYWRqdXN0ID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLm5Gb3JSZWFkanVzdC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVMYXN0UmVvcmRlclRpbWUgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMubGFzdFJlb3JkZXJUaW1lLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUF1ZFN0cmVhbU5hbWVzID0gKHZhbHVlOiBTdHJlYW1bXSkgPT4ge1xuICAgIHRoaXMuYXVkU3RyZWFtTmFtZXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQ3VycmVudFVzZXJQYWdlID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLmN1cnJlbnRVc2VyUGFnZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVNYWluSGVpZ2h0V2lkdGggPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMubWFpbkhlaWdodFdpZHRoLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVByZXZNYWluSGVpZ2h0V2lkdGggPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMucHJldk1haW5IZWlnaHRXaWR0aC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVQcmV2RG9QYWdpbmF0ZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMucHJldkRvUGFnaW5hdGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlRG9QYWdpbmF0ZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuZG9QYWdpbmF0ZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVTaGFyZUVuZGVkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5zaGFyZUVuZGVkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUxTdHJlYW1zID0gKHZhbHVlOiAoUGFydGljaXBhbnQgfCBTdHJlYW0pW10pID0+IHtcbiAgICB0aGlzLmxTdHJlYW1zLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUNoYXRSZWZTdHJlYW1zID0gKHZhbHVlOiAoUGFydGljaXBhbnQgfCBTdHJlYW0pW10pID0+IHtcbiAgICB0aGlzLmNoYXRSZWZTdHJlYW1zLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUNvbnRyb2xIZWlnaHQgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMuY29udHJvbEhlaWdodC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVJc1dpZGVTY3JlZW4gPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmlzV2lkZVNjcmVlbi5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVJc01lZGl1bVNjcmVlbiA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuaXNNZWRpdW1TY3JlZW4ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlSXNTbWFsbFNjcmVlbiA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuaXNTbWFsbFNjcmVlbi5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBZGRHcmlkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5hZGRHcmlkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUFkZEFsdEdyaWQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmFkZEFsdEdyaWQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlR3JpZFJvd3MgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMuZ3JpZFJvd3MubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlR3JpZENvbHMgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMuZ3JpZENvbHMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQWx0R3JpZFJvd3MgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMuYWx0R3JpZFJvd3MubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQWx0R3JpZENvbHMgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMuYWx0R3JpZENvbHMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTnVtYmVyUGFnZXMgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMubnVtYmVyUGFnZXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQ3VycmVudFN0cmVhbXMgPSAodmFsdWU6IChQYXJ0aWNpcGFudCB8IFN0cmVhbSlbXSkgPT4ge1xuICAgIHRoaXMuY3VycmVudFN0cmVhbXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlU2hvd01pbmlWaWV3ID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5zaG93TWluaVZpZXcubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTlN0cmVhbSA9ICh2YWx1ZTogTWVkaWFTdHJlYW0gfCBudWxsKSA9PiB7XG4gICAgdGhpcy5uU3RyZWFtLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZURlZmVyX3JlY2VpdmUgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmRlZmVyX3JlY2VpdmUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQWxsQXVkaW9TdHJlYW1zID0gKHZhbHVlOiAoUGFydGljaXBhbnQgfCBTdHJlYW0pW10pID0+IHtcbiAgICB0aGlzLmFsbEF1ZGlvU3RyZWFtcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZW1vdGVTY3JlZW5TdHJlYW0gPSAodmFsdWU6IFN0cmVhbVtdKSA9PiB7XG4gICAgdGhpcy5yZW1vdGVTY3JlZW5TdHJlYW0ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlU2NyZWVuUHJvZHVjZXIgPSAodmFsdWU6IFByb2R1Y2VyIHwgbnVsbCkgPT4ge1xuICAgIHRoaXMuc2NyZWVuUHJvZHVjZXIubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlR290QWxsVmlkcyA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuZ290QWxsVmlkcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVQYWdpbmF0aW9uSGVpZ2h0V2lkdGggPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMucGFnaW5hdGlvbkhlaWdodFdpZHRoLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVBhZ2luYXRpb25EaXJlY3Rpb24gPSAodmFsdWU6ICdob3Jpem9udGFsJyB8ICd2ZXJ0aWNhbCcpID0+IHtcbiAgICB0aGlzLnBhZ2luYXRpb25EaXJlY3Rpb24ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlR3JpZFNpemVzID0gKHZhbHVlOiBHcmlkU2l6ZXMpID0+IHtcbiAgICB0aGlzLmdyaWRTaXplcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVTY3JlZW5Gb3JjZUZ1bGxEaXNwbGF5ID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5zY3JlZW5Gb3JjZUZ1bGxEaXNwbGF5Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZU1haW5HcmlkU3RyZWFtID0gKHZhbHVlOiBDdXN0b21NZWRpYUNvbXBvbmVudFtdKSA9PiB7XG4gICAgdGhpcy5tYWluR3JpZFN0cmVhbS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVPdGhlckdyaWRTdHJlYW1zID0gKHZhbHVlOiBDdXN0b21NZWRpYUNvbXBvbmVudFtdW10pID0+IHtcbiAgICB0aGlzLm90aGVyR3JpZFN0cmVhbXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQXVkaW9Pbmx5U3RyZWFtcyA9ICh2YWx1ZTogQ3VzdG9tTWVkaWFDb21wb25lbnRbXSkgPT4ge1xuICAgIHRoaXMuYXVkaW9Pbmx5U3RyZWFtcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVWaWRlb0lucHV0cyA9ICh2YWx1ZTogTWVkaWFEZXZpY2VJbmZvW10pID0+IHtcbiAgICB0aGlzLnZpZGVvSW5wdXRzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUF1ZGlvSW5wdXRzID0gKHZhbHVlOiBNZWRpYURldmljZUluZm9bXSkgPT4ge1xuICAgIHRoaXMuYXVkaW9JbnB1dHMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTWVldGluZ1Byb2dyZXNzVGltZSA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5tZWV0aW5nUHJvZ3Jlc3NUaW1lLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZU1lZXRpbmdFbGFwc2VkVGltZSA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5tZWV0aW5nRWxhcHNlZFRpbWUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVmX3BhcnRpY2lwYW50cyA9ICh2YWx1ZTogUGFydGljaXBhbnRbXSkgPT4ge1xuICAgIHRoaXMucmVmX3BhcnRpY2lwYW50cy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICAvLyBNZXNzYWdlc1xuICBtZXNzYWdlcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8TWVzc2FnZVtdPihbXSk7XG4gIHN0YXJ0RGlyZWN0TWVzc2FnZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBkaXJlY3RNZXNzYWdlRGV0YWlscyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UGFydGljaXBhbnQgfCBudWxsPihudWxsKTtcbiAgc2hvd01lc3NhZ2VzQmFkZ2UgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcblxuICAvLyBFdmVudCBTZXR0aW5nc1xuICBhdWRpb1NldHRpbmcgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJ2FsbG93Jyk7XG4gIHZpZGVvU2V0dGluZyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignYWxsb3cnKTtcbiAgc2NyZWVuc2hhcmVTZXR0aW5nID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCdhbGxvdycpO1xuICBjaGF0U2V0dGluZyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignYWxsb3cnKTtcblxuICAvLyBEaXNwbGF5IFNldHRpbmdzXG4gIGRpc3BsYXlPcHRpb24gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJ21lZGlhJyk7XG4gIGF1dG9XYXZlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPih0cnVlKTtcbiAgZm9yY2VGdWxsRGlzcGxheSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4odHJ1ZSk7XG4gIHByZXZGb3JjZUZ1bGxEaXNwbGF5ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHByZXZNZWV0aW5nRGlzcGxheVR5cGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJ3ZpZGVvJyk7XG5cbiAgLy8gV2FpdGluZyBSb29tXG4gIHdhaXRpbmdSb29tRmlsdGVyID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcbiAgd2FpdGluZ1Jvb21MaXN0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxXYWl0aW5nUm9vbVBhcnRpY2lwYW50W10+KFxuICAgIHRoaXMudXNlU2VlZCAmJiB0aGlzLnNlZWREYXRhPy53YWl0aW5nTGlzdCA/IHRoaXMuc2VlZERhdGEud2FpdGluZ0xpc3QgOiBbXSxcbiAgKTtcbiAgd2FpdGluZ1Jvb21Db3VudGVyID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICBmaWx0ZXJlZFdhaXRpbmdSb29tTGlzdCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8V2FpdGluZ1Jvb21QYXJ0aWNpcGFudFtdPihcbiAgICB0aGlzLnVzZVNlZWQgJiYgdGhpcy5zZWVkRGF0YT8ud2FpdGluZ0xpc3QgPyB0aGlzLnNlZWREYXRhLndhaXRpbmdMaXN0IDogW10sXG4gICk7XG5cbiAgLy8gUmVxdWVzdHNcbiAgcmVxdWVzdEZpbHRlciA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gIHJlcXVlc3RMaXN0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxSZXF1ZXN0W10+KFxuICAgIHRoaXMudXNlU2VlZCAmJiB0aGlzLnNlZWREYXRhPy5yZXF1ZXN0cyA/IHRoaXMuc2VlZERhdGEucmVxdWVzdHMgOiBbXSxcbiAgKTtcbiAgcmVxdWVzdENvdW50ZXIgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG4gIGZpbHRlcmVkUmVxdWVzdExpc3QgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFJlcXVlc3RbXT4oXG4gICAgdGhpcy51c2VTZWVkICYmIHRoaXMuc2VlZERhdGE/LnJlcXVlc3RzID8gdGhpcy5zZWVkRGF0YS5yZXF1ZXN0cyA6IFtdLFxuICApO1xuXG4gIC8vIFRvdGFsIFJlcXVlc3RzIGFuZCBXYWl0aW5nIFJvb21cbiAgdG90YWxSZXFXYWl0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuXG4gIC8vIEFsZXJ0c1xuICBhbGVydFZpc2libGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgYWxlcnRNZXNzYWdlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcbiAgYWxlcnRUeXBlID0gbmV3IEJlaGF2aW9yU3ViamVjdDwnc3VjY2VzcycgfCAnZGFuZ2VyJz4oJ3N1Y2Nlc3MnKTtcbiAgYWxlcnREdXJhdGlvbiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigzMDAwKTtcblxuICAvLyBQcm9ncmVzcyBUaW1lclxuICBwcm9ncmVzc1RpbWVyVmlzaWJsZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4odHJ1ZSk7XG4gIHByb2dyZXNzVGltZXJWYWx1ZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcblxuICAvLyBNZW51IE1vZGFsc1xuICBpc01lbnVNb2RhbFZpc2libGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgaXNSZWNvcmRpbmdNb2RhbFZpc2libGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgaXNTZXR0aW5nc01vZGFsVmlzaWJsZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBpc1JlcXVlc3RzTW9kYWxWaXNpYmxlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGlzV2FpdGluZ01vZGFsVmlzaWJsZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBpc0NvSG9zdE1vZGFsVmlzaWJsZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBpc01lZGlhU2V0dGluZ3NNb2RhbFZpc2libGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgaXNEaXNwbGF5U2V0dGluZ3NNb2RhbFZpc2libGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcblxuICAvLyBPdGhlciBNb2RhbHNcbiAgaXNQYXJ0aWNpcGFudHNNb2RhbFZpc2libGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgaXNNZXNzYWdlc01vZGFsVmlzaWJsZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBpc0NvbmZpcm1FeGl0TW9kYWxWaXNpYmxlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGlzQ29uZmlybUhlcmVNb2RhbFZpc2libGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgaXNTaGFyZUV2ZW50TW9kYWxWaXNpYmxlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGlzTG9hZGluZ01vZGFsVmlzaWJsZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIC8vIFJlY29yZGluZyBPcHRpb25zXG4gIHJlY29yZGluZ01lZGlhT3B0aW9ucyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPigndmlkZW8nKTtcbiAgcmVjb3JkaW5nQXVkaW9PcHRpb25zID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCdhbGwnKTtcbiAgcmVjb3JkaW5nVmlkZW9PcHRpb25zID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCdhbGwnKTtcbiAgcmVjb3JkaW5nVmlkZW9UeXBlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCdmdWxsRGlzcGxheScpO1xuICByZWNvcmRpbmdWaWRlb09wdGltaXplZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICByZWNvcmRpbmdEaXNwbGF5VHlwZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8J3ZpZGVvJyB8ICdtZWRpYScgfCAnYWxsJz4oJ3ZpZGVvJyk7XG4gIHJlY29yZGluZ0FkZEhMUyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4odHJ1ZSk7XG4gIHJlY29yZGluZ05hbWVUYWdzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPih0cnVlKTtcbiAgcmVjb3JkaW5nQmFja2dyb3VuZENvbG9yID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcjODNjMGU5Jyk7XG4gIHJlY29yZGluZ05hbWVUYWdzQ29sb3IgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJyNmZmZmZmYnKTtcbiAgcmVjb3JkaW5nQWRkVGV4dCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICByZWNvcmRpbmdDdXN0b21UZXh0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCdBZGQgVGV4dCcpO1xuICByZWNvcmRpbmdDdXN0b21UZXh0UG9zaXRpb24gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJ3RvcCcpO1xuICByZWNvcmRpbmdDdXN0b21UZXh0Q29sb3IgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJyNmZmZmZmYnKTtcbiAgcmVjb3JkaW5nT3JpZW50YXRpb25WaWRlbyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignbGFuZHNjYXBlJyk7XG4gIGNsZWFyZWRUb1Jlc3VtZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4odHJ1ZSk7XG4gIGNsZWFyZWRUb1JlY29yZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4odHJ1ZSk7XG4gIHJlY29yZFN0YXRlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCdncmVlbicpO1xuICBzaG93UmVjb3JkQnV0dG9ucyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICByZWNvcmRpbmdQcm9ncmVzc1RpbWUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJzAwOjAwOjAwJyk7XG4gIGF1ZGlvU3dpdGNoaW5nID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHZpZGVvU3dpdGNoaW5nID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG5cbiAgLy8gTWVkaWEgU3RhdGVzXG4gIHZpZGVvQWxyZWFkeU9uID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGF1ZGlvQWxyZWFkeU9uID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG5cbiAgY29tcG9uZW50U2l6ZXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PENvbXBvbmVudFNpemVzPih7XG4gICAgbWFpbkhlaWdodDogMCxcbiAgICBvdGhlckhlaWdodDogMCxcbiAgICBtYWluV2lkdGg6IDAsXG4gICAgb3RoZXJXaWR0aDogMCxcbiAgfSk7XG5cbiAgLy8gUGVybWlzc2lvbnNcbiAgaGFzQ2FtZXJhUGVybWlzc2lvbiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBoYXNBdWRpb1Blcm1pc3Npb24gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcblxuICAvLyBUcmFuc3BvcnRzXG4gIHRyYW5zcG9ydENyZWF0ZWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgdHJhbnNwb3J0Q3JlYXRlZFZpZGVvID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHRyYW5zcG9ydENyZWF0ZWRBdWRpbyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICB0cmFuc3BvcnRDcmVhdGVkU2NyZWVuID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHByb2R1Y2VyVHJhbnNwb3J0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxUcmFuc3BvcnQgfCBudWxsPihudWxsKTtcbiAgdmlkZW9Qcm9kdWNlciA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UHJvZHVjZXIgfCBudWxsPihudWxsKTtcbiAgcGFyYW1zID0gbmV3IEJlaGF2aW9yU3ViamVjdDxQcm9kdWNlck9wdGlvbnM+KHt9IGFzIFByb2R1Y2VyT3B0aW9ucyk7XG4gIHZpZGVvUGFyYW1zID0gbmV3IEJlaGF2aW9yU3ViamVjdDxQcm9kdWNlck9wdGlvbnM+KHt9IGFzIFByb2R1Y2VyT3B0aW9ucyk7XG4gIGF1ZGlvUGFyYW1zID0gbmV3IEJlaGF2aW9yU3ViamVjdDxQcm9kdWNlck9wdGlvbnM+KHt9IGFzIFByb2R1Y2VyT3B0aW9ucyk7XG4gIGF1ZGlvUHJvZHVjZXIgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFByb2R1Y2VyIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN1bWVyVHJhbnNwb3J0cyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8VHJhbnNwb3J0VHlwZVtdPihbXSk7XG4gIGNvbnN1bWluZ1RyYW5zcG9ydHMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZ1tdPihbXSk7XG5cbiAgLy8gUG9sbHNcbiAgcG9sbHMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFBvbGxbXT4oXG4gICAgdGhpcy51c2VTZWVkICYmIHRoaXMuc2VlZERhdGE/LnBvbGxzID8gdGhpcy5zZWVkRGF0YS5wb2xscyA6IFtdLFxuICApO1xuICBwb2xsID0gbmV3IEJlaGF2aW9yU3ViamVjdDxQb2xsIHwgbnVsbD4obnVsbCk7XG4gIGlzUG9sbE1vZGFsVmlzaWJsZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIC8vIEJhY2tncm91bmRcbiAgY3VzdG9tSW1hZ2UgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICBzZWxlY3RlZEltYWdlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcbiAgc2VnbWVudFZpZGVvID0gbmV3IEJlaGF2aW9yU3ViamVjdDxNZWRpYVN0cmVhbSB8IG51bGw+KG51bGwpO1xuICBzZWxmaWVTZWdtZW50YXRpb24gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFNlbGZpZVNlZ21lbnRhdGlvbiB8IG51bGw+KG51bGwpO1xuICBwYXVzZVNlZ21lbnRhdGlvbiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBwcm9jZXNzZWRTdHJlYW0gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE1lZGlhU3RyZWFtIHwgbnVsbD4obnVsbCk7XG4gIGtlZXBCYWNrZ3JvdW5kID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGJhY2tncm91bmRIYXNDaGFuZ2VkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHZpcnR1YWxTdHJlYW0gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE1lZGlhU3RyZWFtIHwgbnVsbD4obnVsbCk7XG4gIG1haW5DYW52YXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEhUTUxDYW52YXNFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIHByZXZLZWVwQmFja2dyb3VuZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBhcHBsaWVkQmFja2dyb3VuZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBpc0JhY2tncm91bmRNb2RhbFZpc2libGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgYXV0b0NsaWNrQmFja2dyb3VuZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIC8vIEJyZWFrb3V0IFJvb21zXG4gIGJyZWFrb3V0Um9vbXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEJyZWFrb3V0UGFydGljaXBhbnRbXVtdPihcbiAgICB0aGlzLnVzZVNlZWQgJiYgdGhpcy5zZWVkRGF0YT8uYnJlYWtvdXRSb29tcyA/IHRoaXMuc2VlZERhdGEuYnJlYWtvdXRSb29tcyA6IFtdLFxuICApO1xuICBjdXJyZW50Um9vbUluZGV4ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICBjYW5TdGFydEJyZWFrb3V0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGJyZWFrT3V0Um9vbVN0YXJ0ZWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgYnJlYWtPdXRSb29tRW5kZWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgaG9zdE5ld1Jvb20gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oLTEpO1xuICBsaW1pdGVkQnJlYWtSb29tID0gbmV3IEJlaGF2aW9yU3ViamVjdDxCcmVha291dFBhcnRpY2lwYW50W10+KFtdKTtcbiAgbWFpblJvb21zTGVuZ3RoID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICBtZW1iZXJSb29tID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KC0xKTtcbiAgaXNCcmVha291dFJvb21zTW9kYWxWaXNpYmxlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG5cbiAgLy8gV2hpdGVib2FyZFxuICB3aGl0ZWJvYXJkVXNlcnMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFdoaXRlYm9hcmRVc2VyW10+KFxuICAgIHRoaXMudXNlU2VlZCAmJiB0aGlzLnNlZWREYXRhPy53aGl0ZWJvYXJkVXNlcnMgPyB0aGlzLnNlZWREYXRhLndoaXRlYm9hcmRVc2VycyA6IFtdLFxuICApO1xuICBjdXJyZW50V2hpdGVib2FyZEluZGV4ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICBjYW5TdGFydFdoaXRlYm9hcmQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgd2hpdGVib2FyZFN0YXJ0ZWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgd2hpdGVib2FyZEVuZGVkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHdoaXRlYm9hcmRMaW1pdCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPig0KTtcbiAgaXNXaGl0ZWJvYXJkTW9kYWxWaXNpYmxlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGlzQ29uZmlndXJlV2hpdGVib2FyZE1vZGFsVmlzaWJsZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBzaGFwZXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFNoYXBlW10+KFtdKTtcbiAgdXNlSW1hZ2VCYWNrZ3JvdW5kID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPih0cnVlKTtcbiAgcmVkb1N0YWNrID0gbmV3IEJlaGF2aW9yU3ViamVjdDxTaGFwZVtdPihbXSk7XG4gIHVuZG9TdGFjayA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nW10+KFtdKTtcbiAgY2FudmFzU3RyZWFtID0gbmV3IEJlaGF2aW9yU3ViamVjdDxNZWRpYVN0cmVhbSB8IG51bGw+KG51bGwpO1xuICBjYW52YXNXaGl0ZWJvYXJkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxIVE1MQ2FudmFzRWxlbWVudCB8IG51bGw+KG51bGwpO1xuXG4gIC8vIFNjcmVlbmJvYXJkXG4gIGNhbnZhc1NjcmVlbmJvYXJkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxIVE1MQ2FudmFzRWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBwcm9jZXNzZWRTY3JlZW5TdHJlYW0gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE1lZGlhU3RyZWFtIHwgbnVsbD4obnVsbCk7XG4gIGFubm90YXRlU2NyZWVuU3RyZWFtID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIG1haW5TY3JlZW5DYW52YXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEhUTUxDYW52YXNFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGlzU2NyZWVuYm9hcmRNb2RhbFZpc2libGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcblxuICAvL3N0YXRlIHZhcmlhYmxlcyBmb3IgdGhlIGNvbnRyb2wgYnV0dG9uc1xuICBtaWNBY3RpdmUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KFxuICAgIHRoaXMuYXVkaW9BbHJlYWR5T24udmFsdWUgPyB0aGlzLmF1ZGlvQWxyZWFkeU9uLnZhbHVlIDogZmFsc2UsXG4gICk7XG4gIHZpZGVvQWN0aXZlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihcbiAgICB0aGlzLnZpZGVvQWxyZWFkeU9uLnZhbHVlID8gdGhpcy52aWRlb0FscmVhZHlPbi52YWx1ZSA6IGZhbHNlLFxuICApO1xuICBzY3JlZW5TaGFyZUFjdGl2ZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBlbmRDYWxsQWN0aXZlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHBhcnRpY2lwYW50c0FjdGl2ZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBtZW51QWN0aXZlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGNvbW1lbnRzQWN0aXZlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG5cbiAgLy8gVXBkYXRlIGZ1bmN0aW9uc1xuICB1cGRhdGVNZXNzYWdlcyA9ICh2YWx1ZTogTWVzc2FnZVtdKSA9PiB7XG4gICAgdGhpcy5tZXNzYWdlcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVTdGFydERpcmVjdE1lc3NhZ2UgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnN0YXJ0RGlyZWN0TWVzc2FnZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVEaXJlY3RNZXNzYWdlRGV0YWlscyA9ICh2YWx1ZTogUGFydGljaXBhbnQgfCBudWxsKSA9PiB7XG4gICAgdGhpcy5kaXJlY3RNZXNzYWdlRGV0YWlscy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVTaG93TWVzc2FnZXNCYWRnZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuc2hvd01lc3NhZ2VzQmFkZ2UubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQXVkaW9TZXR0aW5nID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLmF1ZGlvU2V0dGluZy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVWaWRlb1NldHRpbmcgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMudmlkZW9TZXR0aW5nLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVNjcmVlbnNoYXJlU2V0dGluZyA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5zY3JlZW5zaGFyZVNldHRpbmcubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQ2hhdFNldHRpbmcgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMuY2hhdFNldHRpbmcubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlRGlzcGxheU9wdGlvbiA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5kaXNwbGF5T3B0aW9uLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUF1dG9XYXZlID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5hdXRvV2F2ZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVGb3JjZUZ1bGxEaXNwbGF5ID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5mb3JjZUZ1bGxEaXNwbGF5Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVByZXZGb3JjZUZ1bGxEaXNwbGF5ID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5wcmV2Rm9yY2VGdWxsRGlzcGxheS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVQcmV2TWVldGluZ0Rpc3BsYXlUeXBlID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLnByZXZNZWV0aW5nRGlzcGxheVR5cGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlV2FpdGluZ1Jvb21Db3VudGVyID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLndhaXRpbmdSb29tQ291bnRlci5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVXYWl0aW5nUm9vbUZpbHRlciA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy53YWl0aW5nUm9vbUZpbHRlci5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVXYWl0aW5nUm9vbUxpc3QgPSAodmFsdWU6IFdhaXRpbmdSb29tUGFydGljaXBhbnRbXSkgPT4ge1xuICAgIHRoaXMud2FpdGluZ1Jvb21MaXN0Lm5leHQodmFsdWUpO1xuICAgIHRoaXMuZmlsdGVyZWRXYWl0aW5nUm9vbUxpc3QubmV4dCh2YWx1ZSk7XG4gICAgdGhpcy53YWl0aW5nUm9vbUNvdW50ZXIubmV4dCh2YWx1ZS5sZW5ndGgpO1xuICB9O1xuXG4gIG9uV2FpdGluZ1Jvb21GaWx0ZXJDaGFuZ2UgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIGlmICh2YWx1ZSAhPT0gJycgJiYgdmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgZmlsdGVyZWRXYWl0aW5nUm9vbSA9IHRoaXMud2FpdGluZ1Jvb21MaXN0XG4gICAgICAgIC5nZXRWYWx1ZSgpXG4gICAgICAgIC5maWx0ZXIoKHdhaXRpbmdSb29tOiBXYWl0aW5nUm9vbVBhcnRpY2lwYW50KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHdhaXRpbmdSb29tLm5hbWUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyh2YWx1ZS50b0xvd2VyQ2FzZSgpKTtcbiAgICAgICAgfSk7XG4gICAgICB0aGlzLmZpbHRlcmVkV2FpdGluZ1Jvb21MaXN0Lm5leHQoZmlsdGVyZWRXYWl0aW5nUm9vbSk7XG4gICAgICB0aGlzLndhaXRpbmdSb29tQ291bnRlci5uZXh0KGZpbHRlcmVkV2FpdGluZ1Jvb20ubGVuZ3RoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5maWx0ZXJlZFdhaXRpbmdSb29tTGlzdC5uZXh0KHRoaXMud2FpdGluZ1Jvb21MaXN0LmdldFZhbHVlKCkpO1xuICAgICAgdGhpcy53YWl0aW5nUm9vbUNvdW50ZXIubmV4dCh0aGlzLndhaXRpbmdSb29tTGlzdC5nZXRWYWx1ZSgpLmxlbmd0aCk7XG4gICAgfVxuICB9O1xuXG4gIG9uV2FpdGluZ1Jvb21DbG9zZSA9ICgpID0+IHtcbiAgICB0aGlzLnVwZGF0ZUlzV2FpdGluZ01vZGFsVmlzaWJsZShmYWxzZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVxdWVzdENvdW50ZXIgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMucmVxdWVzdENvdW50ZXIubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVxdWVzdEZpbHRlciA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5yZXF1ZXN0RmlsdGVyLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlcXVlc3RMaXN0ID0gKHZhbHVlOiBSZXF1ZXN0W10pID0+IHtcbiAgICB0aGlzLnJlcXVlc3RMaXN0Lm5leHQodmFsdWUpO1xuICAgIHRoaXMuZmlsdGVyZWRSZXF1ZXN0TGlzdC5uZXh0KHZhbHVlKTtcbiAgICB0aGlzLnJlcXVlc3RDb3VudGVyLm5leHQodmFsdWUubGVuZ3RoKTtcbiAgfTtcblxuICBvblJlcXVlc3RGaWx0ZXJDaGFuZ2UgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIGlmICh2YWx1ZSAhPT0gJycgJiYgdmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgZmlsdGVyZWRSZXF1ZXN0ID0gdGhpcy5yZXF1ZXN0TGlzdC5nZXRWYWx1ZSgpLmZpbHRlcigocmVxdWVzdDogUmVxdWVzdCkgPT4ge1xuICAgICAgICByZXR1cm4gcmVxdWVzdD8ubmFtZT8udG9Mb3dlckNhc2UoKS5pbmNsdWRlcyh2YWx1ZS50b0xvd2VyQ2FzZSgpKSA/PyBmYWxzZTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5maWx0ZXJlZFJlcXVlc3RMaXN0Lm5leHQoZmlsdGVyZWRSZXF1ZXN0KTtcbiAgICAgIHRoaXMucmVxdWVzdENvdW50ZXIubmV4dChmaWx0ZXJlZFJlcXVlc3QubGVuZ3RoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5maWx0ZXJlZFJlcXVlc3RMaXN0Lm5leHQodGhpcy5yZXF1ZXN0TGlzdC5nZXRWYWx1ZSgpKTtcbiAgICAgIHRoaXMucmVxdWVzdENvdW50ZXIubmV4dCh0aGlzLnJlcXVlc3RMaXN0LmdldFZhbHVlKCkubGVuZ3RoKTtcbiAgICB9XG4gIH07XG5cbiAgb25SZXF1ZXN0Q2xvc2UgPSAoKSA9PiB7XG4gICAgdGhpcy51cGRhdGVJc1JlcXVlc3RzTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgfTtcblxuICB1cGRhdGVUb3RhbFJlcVdhaXQgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMudG90YWxSZXFXYWl0Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUFsZXJ0VmlzaWJsZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuYWxlcnRWaXNpYmxlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUFsZXJ0TWVzc2FnZSA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5hbGVydE1lc3NhZ2UubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQWxlcnRUeXBlID0gKHZhbHVlOiAnc3VjY2VzcycgfCAnZGFuZ2VyJykgPT4ge1xuICAgIHRoaXMuYWxlcnRUeXBlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUFsZXJ0RHVyYXRpb24gPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMuYWxlcnREdXJhdGlvbi5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVQcm9ncmVzc1RpbWVyVmlzaWJsZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMucHJvZ3Jlc3NUaW1lclZpc2libGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUHJvZ3Jlc3NUaW1lclZhbHVlID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLnByb2dyZXNzVGltZXJWYWx1ZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVJc01lbnVNb2RhbFZpc2libGUgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmlzTWVudU1vZGFsVmlzaWJsZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVJc1JlY29yZGluZ01vZGFsVmlzaWJsZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuaXNSZWNvcmRpbmdNb2RhbFZpc2libGUubmV4dCh2YWx1ZSk7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLnVwZGF0ZUNvbmZpcm1lZFRvUmVjb3JkKGZhbHNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKFxuICAgICAgICB0aGlzLmNsZWFyZWRUb1JlY29yZC5nZXRWYWx1ZSgpICYmXG4gICAgICAgIHRoaXMuY2xlYXJlZFRvUmVzdW1lLmdldFZhbHVlKCkgJiZcbiAgICAgICAgdGhpcy5yZWNvcmRTdGFydGVkLmdldFZhbHVlKClcbiAgICAgICkge1xuICAgICAgICB0aGlzLnVwZGF0ZVNob3dSZWNvcmRCdXR0b25zKHRydWUpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICB1cGRhdGVJc1NldHRpbmdzTW9kYWxWaXNpYmxlID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5pc1NldHRpbmdzTW9kYWxWaXNpYmxlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUlzUmVxdWVzdHNNb2RhbFZpc2libGUgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmlzUmVxdWVzdHNNb2RhbFZpc2libGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlSXNXYWl0aW5nTW9kYWxWaXNpYmxlID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5pc1dhaXRpbmdNb2RhbFZpc2libGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlSXNDb0hvc3RNb2RhbFZpc2libGUgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmlzQ29Ib3N0TW9kYWxWaXNpYmxlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUlzTWVkaWFTZXR0aW5nc01vZGFsVmlzaWJsZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuaXNNZWRpYVNldHRpbmdzTW9kYWxWaXNpYmxlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUlzRGlzcGxheVNldHRpbmdzTW9kYWxWaXNpYmxlID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5pc0Rpc3BsYXlTZXR0aW5nc01vZGFsVmlzaWJsZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVJc1BhcnRpY2lwYW50c01vZGFsVmlzaWJsZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuaXNQYXJ0aWNpcGFudHNNb2RhbFZpc2libGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlSXNNZXNzYWdlc01vZGFsVmlzaWJsZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuaXNNZXNzYWdlc01vZGFsVmlzaWJsZS5uZXh0KHZhbHVlKTtcbiAgICBpZiAoIXZhbHVlKSB7XG4gICAgICB0aGlzLnVwZGF0ZVNob3dNZXNzYWdlc0JhZGdlKGZhbHNlKTtcbiAgICB9XG4gIH07XG5cbiAgdXBkYXRlSXNDb25maXJtRXhpdE1vZGFsVmlzaWJsZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuaXNDb25maXJtRXhpdE1vZGFsVmlzaWJsZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVJc0NvbmZpcm1IZXJlTW9kYWxWaXNpYmxlID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5pc0NvbmZpcm1IZXJlTW9kYWxWaXNpYmxlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUlzTG9hZGluZ01vZGFsVmlzaWJsZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuaXNMb2FkaW5nTW9kYWxWaXNpYmxlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUlzU2hhcmVFdmVudE1vZGFsVmlzaWJsZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuaXNTaGFyZUV2ZW50TW9kYWxWaXNpYmxlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ01lZGlhT3B0aW9ucyA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdNZWRpYU9wdGlvbnMubmV4dCh2YWx1ZSk7XG4gICAgdGhpcy5jbGVhcmVkVG9SZWNvcmQubmV4dChmYWxzZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nQXVkaW9PcHRpb25zID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ0F1ZGlvT3B0aW9ucy5uZXh0KHZhbHVlKTtcbiAgICB0aGlzLmNsZWFyZWRUb1JlY29yZC5uZXh0KGZhbHNlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRpbmdWaWRlb09wdGlvbnMgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMucmVjb3JkaW5nVmlkZW9PcHRpb25zLm5leHQodmFsdWUpO1xuICAgIHRoaXMuY2xlYXJlZFRvUmVjb3JkLm5leHQoZmFsc2UpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ1ZpZGVvVHlwZSA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdWaWRlb1R5cGUubmV4dCh2YWx1ZSk7XG4gICAgdGhpcy5jbGVhcmVkVG9SZWNvcmQubmV4dChmYWxzZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nVmlkZW9PcHRpbWl6ZWQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ1ZpZGVvT3B0aW1pemVkLm5leHQodmFsdWUpO1xuICAgIHRoaXMuY2xlYXJlZFRvUmVjb3JkLm5leHQoZmFsc2UpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ0Rpc3BsYXlUeXBlID0gKHZhbHVlOiAndmlkZW8nIHwgJ21lZGlhJyB8ICdhbGwnKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdEaXNwbGF5VHlwZS5uZXh0KHZhbHVlKTtcbiAgICB0aGlzLmNsZWFyZWRUb1JlY29yZC5uZXh0KGZhbHNlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRpbmdBZGRITFMgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ0FkZEhMUy5uZXh0KHZhbHVlKTtcbiAgICB0aGlzLmNsZWFyZWRUb1JlY29yZC5uZXh0KGZhbHNlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRpbmdBZGRUZXh0ID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdBZGRUZXh0Lm5leHQodmFsdWUpO1xuICAgIHRoaXMuY2xlYXJlZFRvUmVjb3JkLm5leHQoZmFsc2UpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ0N1c3RvbVRleHQgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMucmVjb3JkaW5nQ3VzdG9tVGV4dC5uZXh0KHZhbHVlKTtcbiAgICB0aGlzLmNsZWFyZWRUb1JlY29yZC5uZXh0KGZhbHNlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRpbmdDdXN0b21UZXh0UG9zaXRpb24gPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMucmVjb3JkaW5nQ3VzdG9tVGV4dFBvc2l0aW9uLm5leHQodmFsdWUpO1xuICAgIHRoaXMuY2xlYXJlZFRvUmVjb3JkLm5leHQoZmFsc2UpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ0N1c3RvbVRleHRDb2xvciA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdDdXN0b21UZXh0Q29sb3IubmV4dCh2YWx1ZSk7XG4gICAgdGhpcy5jbGVhcmVkVG9SZWNvcmQubmV4dChmYWxzZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nTmFtZVRhZ3MgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ05hbWVUYWdzLm5leHQodmFsdWUpO1xuICAgIHRoaXMuY2xlYXJlZFRvUmVjb3JkLm5leHQoZmFsc2UpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ0JhY2tncm91bmRDb2xvciA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdCYWNrZ3JvdW5kQ29sb3IubmV4dCh2YWx1ZSk7XG4gICAgdGhpcy5jbGVhcmVkVG9SZWNvcmQubmV4dChmYWxzZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nTmFtZVRhZ3NDb2xvciA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdOYW1lVGFnc0NvbG9yLm5leHQodmFsdWUpO1xuICAgIHRoaXMuY2xlYXJlZFRvUmVjb3JkLm5leHQoZmFsc2UpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ09yaWVudGF0aW9uVmlkZW8gPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMucmVjb3JkaW5nT3JpZW50YXRpb25WaWRlby5uZXh0KHZhbHVlKTtcbiAgICB0aGlzLmNsZWFyZWRUb1JlY29yZC5uZXh0KGZhbHNlKTtcbiAgfTtcblxuICB1cGRhdGVDbGVhcmVkVG9SZXN1bWUgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmNsZWFyZWRUb1Jlc3VtZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVDbGVhcmVkVG9SZWNvcmQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmNsZWFyZWRUb1JlY29yZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRTdGF0ZSA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgaWYgKHRoaXMucmVjb3JkU3RhcnRlZC52YWx1ZSAmJiAhdGhpcy5yZWNvcmRTdG9wcGVkLnZhbHVlKSB7XG4gICAgICBpZiAoIXRoaXMucmVjb3JkUGF1c2VkLnZhbHVlKSB7XG4gICAgICAgIHRoaXMucmVjb3JkU3RhdGUubmV4dCgncmVkJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJlY29yZFN0YXRlLm5leHQoJ3llbGxvdycpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlY29yZFN0YXRlLm5leHQodmFsdWUpO1xuICAgIH1cbiAgICB0aGlzLnJlY29yZFN0YXRlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVNob3dSZWNvcmRCdXR0b25zID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5zaG93UmVjb3JkQnV0dG9ucy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRpbmdQcm9ncmVzc1RpbWUgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMucmVjb3JkaW5nUHJvZ3Jlc3NUaW1lLm5leHQodmFsdWUpO1xuICAgIHRoaXMudXBkYXRlUmVjb3JkVGltZXJXaWRnZXQoKTtcbiAgfTtcblxuICB1cGRhdGVBdWRpb1N3aXRjaGluZyA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuYXVkaW9Td2l0Y2hpbmcubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlVmlkZW9Td2l0Y2hpbmcgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnZpZGVvU3dpdGNoaW5nLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVZpZGVvQWxyZWFkeU9uID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy52aWRlb0FscmVhZHlPbi5uZXh0KHZhbHVlKTtcbiAgICB0aGlzLnZpZGVvQWN0aXZlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUF1ZGlvQWxyZWFkeU9uID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5hdWRpb0FscmVhZHlPbi5uZXh0KHZhbHVlKTtcbiAgICB0aGlzLm1pY0FjdGl2ZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVDb21wb25lbnRTaXplcyA9IChzaXplczogQ29tcG9uZW50U2l6ZXMpID0+IHtcbiAgICB0aGlzLmNvbXBvbmVudFNpemVzLm5leHQoc2l6ZXMpO1xuICB9O1xuXG4gIHVwZGF0ZUhhc0NhbWVyYVBlcm1pc3Npb24gPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmhhc0NhbWVyYVBlcm1pc3Npb24ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlSGFzQXVkaW9QZXJtaXNzaW9uID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5oYXNBdWRpb1Blcm1pc3Npb24ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgcmVxdWVzdFBlcm1pc3Npb25DYW1lcmEoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAvLyBJbXBsZW1lbnQgdGhlIHJlcXVlc3QgcGVybWlzc2lvbiBsb2dpYyBoZXJlXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgnZ3JhbnRlZCcpO1xuICB9XG5cbiAgcmVxdWVzdFBlcm1pc3Npb25BdWRpbygpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIC8vIEltcGxlbWVudCB0aGUgcmVxdWVzdCBwZXJtaXNzaW9uIGxvZ2ljIGhlcmVcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCdncmFudGVkJyk7XG4gIH1cblxuICB1cGRhdGVUcmFuc3BvcnRDcmVhdGVkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy50cmFuc3BvcnRDcmVhdGVkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVRyYW5zcG9ydENyZWF0ZWRWaWRlbyA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMudHJhbnNwb3J0Q3JlYXRlZFZpZGVvLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVRyYW5zcG9ydENyZWF0ZWRBdWRpbyA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMudHJhbnNwb3J0Q3JlYXRlZEF1ZGlvLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVRyYW5zcG9ydENyZWF0ZWRTY3JlZW4gPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnRyYW5zcG9ydENyZWF0ZWRTY3JlZW4ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUHJvZHVjZXJUcmFuc3BvcnQgPSAodmFsdWU6IFRyYW5zcG9ydCB8IG51bGwpID0+IHtcbiAgICB0aGlzLnByb2R1Y2VyVHJhbnNwb3J0Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVZpZGVvUHJvZHVjZXIgPSAodmFsdWU6IFByb2R1Y2VyIHwgbnVsbCkgPT4ge1xuICAgIHRoaXMudmlkZW9Qcm9kdWNlci5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVQYXJhbXMgPSAodmFsdWU6IFByb2R1Y2VyT3B0aW9ucykgPT4ge1xuICAgIHRoaXMucGFyYW1zLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVZpZGVvUGFyYW1zID0gKHZhbHVlOiBQcm9kdWNlck9wdGlvbnMpID0+IHtcbiAgICB0aGlzLnZpZGVvUGFyYW1zLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUF1ZGlvUGFyYW1zID0gKHZhbHVlOiBQcm9kdWNlck9wdGlvbnMpID0+IHtcbiAgICB0aGlzLmF1ZGlvUGFyYW1zLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUF1ZGlvUHJvZHVjZXIgPSAodmFsdWU6IFByb2R1Y2VyIHwgbnVsbCkgPT4ge1xuICAgIHRoaXMuYXVkaW9Qcm9kdWNlci5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVDb25zdW1lclRyYW5zcG9ydHMgPSAodmFsdWU6IFRyYW5zcG9ydFR5cGVbXSkgPT4ge1xuICAgIHRoaXMuY29uc3VtZXJUcmFuc3BvcnRzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUNvbnN1bWluZ1RyYW5zcG9ydHMgPSAodmFsdWU6IHN0cmluZ1tdKSA9PiB7XG4gICAgdGhpcy5jb25zdW1pbmdUcmFuc3BvcnRzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVBvbGxzID0gKHZhbHVlOiBQb2xsW10pID0+IHtcbiAgICB0aGlzLnBvbGxzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVBvbGwgPSAodmFsdWU6IFBvbGwgfCBudWxsKSA9PiB7XG4gICAgdGhpcy5wb2xsLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUlzUG9sbE1vZGFsVmlzaWJsZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuaXNQb2xsTW9kYWxWaXNpYmxlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUN1c3RvbUltYWdlID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLmN1c3RvbUltYWdlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVNlbGVjdGVkSW1hZ2UgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMuc2VsZWN0ZWRJbWFnZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVTZWdtZW50VmlkZW8gPSAodmFsdWU6IE1lZGlhU3RyZWFtIHwgbnVsbCkgPT4ge1xuICAgIHRoaXMuc2VnbWVudFZpZGVvLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVNlbGZpZVNlZ21lbnRhdGlvbiA9ICh2YWx1ZTogU2VsZmllU2VnbWVudGF0aW9uIHwgbnVsbCkgPT4ge1xuICAgIHRoaXMuc2VsZmllU2VnbWVudGF0aW9uLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVBhdXNlU2VnbWVudGF0aW9uID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5wYXVzZVNlZ21lbnRhdGlvbi5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVQcm9jZXNzZWRTdHJlYW0gPSAodmFsdWU6IE1lZGlhU3RyZWFtIHwgbnVsbCkgPT4ge1xuICAgIHRoaXMucHJvY2Vzc2VkU3RyZWFtLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUtlZXBCYWNrZ3JvdW5kID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5rZWVwQmFja2dyb3VuZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVCYWNrZ3JvdW5kSGFzQ2hhbmdlZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuYmFja2dyb3VuZEhhc0NoYW5nZWQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlVmlydHVhbFN0cmVhbSA9ICh2YWx1ZTogTWVkaWFTdHJlYW0gfCBudWxsKSA9PiB7XG4gICAgdGhpcy52aXJ0dWFsU3RyZWFtLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZU1haW5DYW52YXMgPSAodmFsdWU6IEhUTUxDYW52YXNFbGVtZW50IHwgbnVsbCkgPT4ge1xuICAgIHRoaXMubWFpbkNhbnZhcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVQcmV2S2VlcEJhY2tncm91bmQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnByZXZLZWVwQmFja2dyb3VuZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBcHBsaWVkQmFja2dyb3VuZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuYXBwbGllZEJhY2tncm91bmQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlSXNCYWNrZ3JvdW5kTW9kYWxWaXNpYmxlID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5pc0JhY2tncm91bmRNb2RhbFZpc2libGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQXV0b0NsaWNrQmFja2dyb3VuZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuYXV0b0NsaWNrQmFja2dyb3VuZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVCcmVha291dFJvb21zID0gKHZhbHVlOiBCcmVha291dFBhcnRpY2lwYW50W11bXSkgPT4ge1xuICAgIHRoaXMuYnJlYWtvdXRSb29tcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVDdXJyZW50Um9vbUluZGV4ID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLmN1cnJlbnRSb29tSW5kZXgubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQ2FuU3RhcnRCcmVha291dCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuY2FuU3RhcnRCcmVha291dC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVCcmVha091dFJvb21TdGFydGVkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5icmVha091dFJvb21TdGFydGVkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUJyZWFrT3V0Um9vbUVuZGVkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5icmVha091dFJvb21FbmRlZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVIb3N0TmV3Um9vbSA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5ob3N0TmV3Um9vbS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVMaW1pdGVkQnJlYWtSb29tID0gKHZhbHVlOiBCcmVha291dFBhcnRpY2lwYW50W10pID0+IHtcbiAgICB0aGlzLmxpbWl0ZWRCcmVha1Jvb20ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTWFpblJvb21zTGVuZ3RoID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLm1haW5Sb29tc0xlbmd0aC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVNZW1iZXJSb29tID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLm1lbWJlclJvb20ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlSXNCcmVha291dFJvb21zTW9kYWxWaXNpYmxlID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5pc0JyZWFrb3V0Um9vbXNNb2RhbFZpc2libGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlV2hpdGVib2FyZFVzZXJzID0gKHZhbHVlOiBXaGl0ZWJvYXJkVXNlcltdKSA9PiB7XG4gICAgdGhpcy53aGl0ZWJvYXJkVXNlcnMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQ3VycmVudFdoaXRlYm9hcmRJbmRleCA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5jdXJyZW50V2hpdGVib2FyZEluZGV4Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUNhblN0YXJ0V2hpdGVib2FyZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuY2FuU3RhcnRXaGl0ZWJvYXJkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVdoaXRlYm9hcmRTdGFydGVkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy53aGl0ZWJvYXJkU3RhcnRlZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVXaGl0ZWJvYXJkRW5kZWQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLndoaXRlYm9hcmRFbmRlZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVXaGl0ZWJvYXJkTGltaXQgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMud2hpdGVib2FyZExpbWl0Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUlzV2hpdGVib2FyZE1vZGFsVmlzaWJsZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuaXNXaGl0ZWJvYXJkTW9kYWxWaXNpYmxlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUlzQ29uZmlndXJlV2hpdGVib2FyZE1vZGFsVmlzaWJsZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuaXNDb25maWd1cmVXaGl0ZWJvYXJkTW9kYWxWaXNpYmxlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVNoYXBlcyA9ICh2YWx1ZTogU2hhcGVbXSkgPT4ge1xuICAgIHRoaXMuc2hhcGVzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVVzZUltYWdlQmFja2dyb3VuZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMudXNlSW1hZ2VCYWNrZ3JvdW5kLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlZG9TdGFjayA9ICh2YWx1ZTogU2hhcGVbXSkgPT4ge1xuICAgIHRoaXMucmVkb1N0YWNrLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVVuZG9TdGFjayA9ICh2YWx1ZTogc3RyaW5nW10pID0+IHtcbiAgICB0aGlzLnVuZG9TdGFjay5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVDYW52YXNTdHJlYW0gPSAodmFsdWU6IE1lZGlhU3RyZWFtIHwgbnVsbCkgPT4ge1xuICAgIHRoaXMuY2FudmFzU3RyZWFtLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUNhbnZhc1doaXRlYm9hcmQgPSAodmFsdWU6IEhUTUxDYW52YXNFbGVtZW50IHwgbnVsbCkgPT4ge1xuICAgIHRoaXMuY2FudmFzV2hpdGVib2FyZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVDYW52YXNTY3JlZW5ib2FyZCA9ICh2YWx1ZTogSFRNTENhbnZhc0VsZW1lbnQgfCBudWxsKSA9PiB7XG4gICAgdGhpcy5jYW52YXNTY3JlZW5ib2FyZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVQcm9jZXNzZWRTY3JlZW5TdHJlYW0gPSAodmFsdWU6IE1lZGlhU3RyZWFtIHwgbnVsbCkgPT4ge1xuICAgIHRoaXMucHJvY2Vzc2VkU2NyZWVuU3RyZWFtLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUFubm90YXRlU2NyZWVuU3RyZWFtID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5hbm5vdGF0ZVNjcmVlblN0cmVhbS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVNYWluU2NyZWVuQ2FudmFzID0gKHZhbHVlOiBIVE1MQ2FudmFzRWxlbWVudCB8IG51bGwpID0+IHtcbiAgICB0aGlzLm1haW5TY3JlZW5DYW52YXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlSXNTY3JlZW5ib2FyZE1vZGFsVmlzaWJsZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuaXNTY3JlZW5ib2FyZE1vZGFsVmlzaWJsZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICBjaGVja09yaWVudGF0aW9uID0gKCkgPT4ge1xuICAgIGNvbnN0IGlzUG9ydHJhaXQgPSB3aW5kb3cubWF0Y2hNZWRpYSgnKG9yaWVudGF0aW9uOiBwb3J0cmFpdCknKS5tYXRjaGVzO1xuICAgIHJldHVybiBpc1BvcnRyYWl0ID8gJ3BvcnRyYWl0JyA6ICdsYW5kc2NhcGUnO1xuICB9O1xuXG4gIHNob3dBbGVydCA9ICh7XG4gICAgbWVzc2FnZSxcbiAgICB0eXBlLFxuICAgIGR1cmF0aW9uID0gMzAwMCxcbiAgfToge1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICB0eXBlOiAnc3VjY2VzcycgfCAnZGFuZ2VyJztcbiAgICBkdXJhdGlvbj86IG51bWJlcjtcbiAgfSkgPT4ge1xuICAgIHRoaXMudXBkYXRlQWxlcnRNZXNzYWdlKG1lc3NhZ2UpO1xuICAgIHRoaXMudXBkYXRlQWxlcnRUeXBlKHR5cGUpO1xuICAgIHRoaXMudXBkYXRlQWxlcnREdXJhdGlvbihkdXJhdGlvbik7XG4gICAgdGhpcy51cGRhdGVBbGVydFZpc2libGUodHJ1ZSk7XG4gIH07XG5cbiAgZ2V0QWxsUGFyYW1zKCkge1xuICAgIHJldHVybiB7XG4gICAgICBsb2NhbFVJTW9kZTogdGhpcy5sb2NhbFVJTW9kZS52YWx1ZSwgLy8gTG9jYWwgVUkgbW9kZVxuXG4gICAgICAvLyBSb29tIERldGFpbHNcbiAgICAgIHJvb21OYW1lOiB0aGlzLnJvb21OYW1lLnZhbHVlLFxuICAgICAgbWVtYmVyOiB0aGlzLm1lbWJlci52YWx1ZSxcbiAgICAgIGFkbWluUGFzc2NvZGU6IHRoaXMuYWRtaW5QYXNzY29kZS52YWx1ZSxcbiAgICAgIHlvdUFyZUNvSG9zdDogdGhpcy55b3VBcmVDb0hvc3QudmFsdWUsXG4gICAgICB5b3VBcmVIb3N0OiB0aGlzLnlvdUFyZUhvc3QudmFsdWUsXG4gICAgICBpc2xldmVsOiB0aGlzLmlzbGV2ZWwudmFsdWUsXG4gICAgICBjb25maXJtZWRUb1JlY29yZDogdGhpcy5jb25maXJtZWRUb1JlY29yZC52YWx1ZSxcbiAgICAgIG1lZXRpbmdEaXNwbGF5VHlwZTogdGhpcy5tZWV0aW5nRGlzcGxheVR5cGUudmFsdWUsXG4gICAgICBtZWV0aW5nVmlkZW9PcHRpbWl6ZWQ6IHRoaXMubWVldGluZ1ZpZGVvT3B0aW1pemVkLnZhbHVlLFxuICAgICAgZXZlbnRUeXBlOiB0aGlzLmV2ZW50VHlwZS52YWx1ZSxcbiAgICAgIHBhcnRpY2lwYW50czogdGhpcy5wYXJ0aWNpcGFudHMudmFsdWUsXG4gICAgICBmaWx0ZXJlZFBhcnRpY2lwYW50czogdGhpcy5maWx0ZXJlZFBhcnRpY2lwYW50cy52YWx1ZSxcbiAgICAgIHBhcnRpY2lwYW50c0NvdW50ZXI6IHRoaXMucGFydGljaXBhbnRzQ291bnRlci52YWx1ZSxcbiAgICAgIHBhcnRpY2lwYW50c0ZpbHRlcjogdGhpcy5wYXJ0aWNpcGFudHNGaWx0ZXIudmFsdWUsXG5cbiAgICAgIC8vIE1vcmUgcm9vbSBkZXRhaWxzIC0gbWVkaWFcbiAgICAgIGNvbnN1bWVfc29ja2V0czogdGhpcy5jb25zdW1lX3NvY2tldHMudmFsdWUsXG4gICAgICBydHBDYXBhYmlsaXRpZXM6IHRoaXMucnRwQ2FwYWJpbGl0aWVzLnZhbHVlLFxuICAgICAgcm9vbVJlY3ZJUHM6IHRoaXMucm9vbVJlY3ZJUHMudmFsdWUsXG4gICAgICBtZWV0aW5nUm9vbVBhcmFtczogdGhpcy5tZWV0aW5nUm9vbVBhcmFtcy52YWx1ZSxcbiAgICAgIGl0ZW1QYWdlTGltaXQ6IHRoaXMuaXRlbVBhZ2VMaW1pdC52YWx1ZSxcbiAgICAgIGF1ZGlvT25seVJvb206IHRoaXMuYXVkaW9Pbmx5Um9vbS52YWx1ZSxcbiAgICAgIGFkZEZvckJhc2ljOiB0aGlzLmFkZEZvckJhc2ljLnZhbHVlLFxuICAgICAgc2NyZWVuUGFnZUxpbWl0OiB0aGlzLnNjcmVlblBhZ2VMaW1pdC52YWx1ZSxcbiAgICAgIHNoYXJlU2NyZWVuU3RhcnRlZDogdGhpcy5zaGFyZVNjcmVlblN0YXJ0ZWQudmFsdWUsXG4gICAgICBzaGFyZWQ6IHRoaXMuc2hhcmVkLnZhbHVlLFxuICAgICAgdGFyZ2V0T3JpZW50YXRpb246IHRoaXMudGFyZ2V0T3JpZW50YXRpb24udmFsdWUsXG4gICAgICB0YXJnZXRSZXNvbHV0aW9uOiB0aGlzLnRhcmdldFJlc29sdXRpb24udmFsdWUsXG4gICAgICB0YXJnZXRSZXNvbHV0aW9uSG9zdDogdGhpcy50YXJnZXRSZXNvbHV0aW9uSG9zdC52YWx1ZSxcbiAgICAgIHZpZENvbnM6IHRoaXMudmlkQ29ucy52YWx1ZSxcbiAgICAgIGZyYW1lUmF0ZTogdGhpcy5mcmFtZVJhdGUudmFsdWUsXG4gICAgICBoUGFyYW1zOiB0aGlzLmhQYXJhbXMudmFsdWUsXG4gICAgICB2UGFyYW1zOiB0aGlzLnZQYXJhbXMudmFsdWUsXG4gICAgICBzY3JlZW5QYXJhbXM6IHRoaXMuc2NyZWVuUGFyYW1zLnZhbHVlLFxuICAgICAgYVBhcmFtczogdGhpcy5hUGFyYW1zLnZhbHVlLFxuXG4gICAgICAvLyBNb3JlIHJvb20gZGV0YWlscyAtIHJlY29yZGluZ1xuICAgICAgcmVjb3JkaW5nQXVkaW9QYXVzZXNMaW1pdDogdGhpcy5yZWNvcmRpbmdBdWRpb1BhdXNlc0xpbWl0LnZhbHVlLFxuICAgICAgcmVjb3JkaW5nQXVkaW9QYXVzZXNDb3VudDogdGhpcy5yZWNvcmRpbmdBdWRpb1BhdXNlc0NvdW50LnZhbHVlLFxuICAgICAgcmVjb3JkaW5nQXVkaW9TdXBwb3J0OiB0aGlzLnJlY29yZGluZ0F1ZGlvU3VwcG9ydC52YWx1ZSxcbiAgICAgIHJlY29yZGluZ0F1ZGlvUGVvcGxlTGltaXQ6IHRoaXMucmVjb3JkaW5nQXVkaW9QZW9wbGVMaW1pdC52YWx1ZSxcbiAgICAgIHJlY29yZGluZ0F1ZGlvUGFydGljaXBhbnRzVGltZUxpbWl0OiB0aGlzLnJlY29yZGluZ0F1ZGlvUGFydGljaXBhbnRzVGltZUxpbWl0LnZhbHVlLFxuICAgICAgcmVjb3JkaW5nVmlkZW9QYXVzZXNDb3VudDogdGhpcy5yZWNvcmRpbmdWaWRlb1BhdXNlc0NvdW50LnZhbHVlLFxuICAgICAgcmVjb3JkaW5nVmlkZW9QYXVzZXNMaW1pdDogdGhpcy5yZWNvcmRpbmdWaWRlb1BhdXNlc0xpbWl0LnZhbHVlLFxuICAgICAgcmVjb3JkaW5nVmlkZW9TdXBwb3J0OiB0aGlzLnJlY29yZGluZ1ZpZGVvU3VwcG9ydC52YWx1ZSxcbiAgICAgIHJlY29yZGluZ1ZpZGVvUGVvcGxlTGltaXQ6IHRoaXMucmVjb3JkaW5nVmlkZW9QZW9wbGVMaW1pdC52YWx1ZSxcbiAgICAgIHJlY29yZGluZ1ZpZGVvUGFydGljaXBhbnRzVGltZUxpbWl0OiB0aGlzLnJlY29yZGluZ1ZpZGVvUGFydGljaXBhbnRzVGltZUxpbWl0LnZhbHVlLFxuICAgICAgcmVjb3JkaW5nQWxsUGFydGljaXBhbnRzU3VwcG9ydDogdGhpcy5yZWNvcmRpbmdBbGxQYXJ0aWNpcGFudHNTdXBwb3J0LnZhbHVlLFxuICAgICAgcmVjb3JkaW5nVmlkZW9QYXJ0aWNpcGFudHNTdXBwb3J0OiB0aGlzLnJlY29yZGluZ1ZpZGVvUGFydGljaXBhbnRzU3VwcG9ydC52YWx1ZSxcbiAgICAgIHJlY29yZGluZ0FsbFBhcnRpY2lwYW50c0Z1bGxSb29tU3VwcG9ydDogdGhpcy5yZWNvcmRpbmdBbGxQYXJ0aWNpcGFudHNGdWxsUm9vbVN1cHBvcnQudmFsdWUsXG4gICAgICByZWNvcmRpbmdWaWRlb1BhcnRpY2lwYW50c0Z1bGxSb29tU3VwcG9ydDpcbiAgICAgICAgdGhpcy5yZWNvcmRpbmdWaWRlb1BhcnRpY2lwYW50c0Z1bGxSb29tU3VwcG9ydC52YWx1ZSxcbiAgICAgIHJlY29yZGluZ1ByZWZlcnJlZE9yaWVudGF0aW9uOiB0aGlzLnJlY29yZGluZ1ByZWZlcnJlZE9yaWVudGF0aW9uLnZhbHVlLFxuICAgICAgcmVjb3JkaW5nU3VwcG9ydEZvck90aGVyT3JpZW50YXRpb246IHRoaXMucmVjb3JkaW5nU3VwcG9ydEZvck90aGVyT3JpZW50YXRpb24udmFsdWUsXG4gICAgICByZWNvcmRpbmdNdWx0aUZvcm1hdHNTdXBwb3J0OiB0aGlzLnJlY29yZGluZ011bHRpRm9ybWF0c1N1cHBvcnQudmFsdWUsXG5cbiAgICAgIHVzZXJSZWNvcmRpbmdQYXJhbXM6IHRoaXMudXNlclJlY29yZGluZ1BhcmFtcy52YWx1ZSxcbiAgICAgIGNhblJlY29yZDogdGhpcy5jYW5SZWNvcmQudmFsdWUsXG4gICAgICBzdGFydFJlcG9ydDogdGhpcy5zdGFydFJlcG9ydC52YWx1ZSxcbiAgICAgIGVuZFJlcG9ydDogdGhpcy5lbmRSZXBvcnQudmFsdWUsXG4gICAgICByZWNvcmRTdGFydFRpbWU6IHRoaXMucmVjb3JkU3RhcnRUaW1lLnZhbHVlLFxuICAgICAgcmVjb3JkRWxhcHNlZFRpbWU6IHRoaXMucmVjb3JkRWxhcHNlZFRpbWUudmFsdWUsXG4gICAgICBpc1RpbWVyUnVubmluZzogdGhpcy5pc1RpbWVyUnVubmluZy52YWx1ZSxcbiAgICAgIGNhblBhdXNlUmVzdW1lOiB0aGlzLmNhblBhdXNlUmVzdW1lLnZhbHVlLFxuICAgICAgcmVjb3JkQ2hhbmdlU2Vjb25kczogdGhpcy5yZWNvcmRDaGFuZ2VTZWNvbmRzLnZhbHVlLFxuICAgICAgcGF1c2VMaW1pdDogdGhpcy5wYXVzZUxpbWl0LnZhbHVlLFxuICAgICAgcGF1c2VSZWNvcmRDb3VudDogdGhpcy5wYXVzZVJlY29yZENvdW50LnZhbHVlLFxuICAgICAgY2FuTGF1bmNoUmVjb3JkOiB0aGlzLmNhbkxhdW5jaFJlY29yZC52YWx1ZSxcbiAgICAgIHN0b3BMYXVuY2hSZWNvcmQ6IHRoaXMuc3RvcExhdW5jaFJlY29yZC52YWx1ZSxcblxuICAgICAgcGFydGljaXBhbnRzQWxsOiB0aGlzLnBhcnRpY2lwYW50c0FsbC52YWx1ZSxcblxuICAgICAgZmlyc3RBbGw6IHRoaXMuZmlyc3RBbGwudmFsdWUsXG4gICAgICB1cGRhdGVNYWluV2luZG93OiB0aGlzLnVwZGF0ZU1haW5XaW5kb3cudmFsdWUsXG4gICAgICBmaXJzdF9yb3VuZDogdGhpcy5maXJzdF9yb3VuZC52YWx1ZSxcbiAgICAgIGxhbmRTY2FwZWQ6IHRoaXMubGFuZFNjYXBlZC52YWx1ZSxcbiAgICAgIGxvY2tfc2NyZWVuOiB0aGlzLmxvY2tfc2NyZWVuLnZhbHVlLFxuICAgICAgc2NyZWVuSWQ6IHRoaXMuc2NyZWVuSWQudmFsdWUsXG4gICAgICBhbGxWaWRlb1N0cmVhbXM6IHRoaXMuYWxsVmlkZW9TdHJlYW1zLnZhbHVlLFxuICAgICAgbmV3TGltaXRlZFN0cmVhbXM6IHRoaXMubmV3TGltaXRlZFN0cmVhbXMudmFsdWUsXG4gICAgICBuZXdMaW1pdGVkU3RyZWFtc0lEczogdGhpcy5uZXdMaW1pdGVkU3RyZWFtc0lEcy52YWx1ZSxcbiAgICAgIGFjdGl2ZVNvdW5kczogdGhpcy5hY3RpdmVTb3VuZHMudmFsdWUsXG4gICAgICBzY3JlZW5TaGFyZUlEU3RyZWFtOiB0aGlzLnNjcmVlblNoYXJlSURTdHJlYW0udmFsdWUsXG4gICAgICBzY3JlZW5TaGFyZU5hbWVTdHJlYW06IHRoaXMuc2NyZWVuU2hhcmVOYW1lU3RyZWFtLnZhbHVlLFxuICAgICAgYWRtaW5JRFN0cmVhbTogdGhpcy5hZG1pbklEU3RyZWFtLnZhbHVlLFxuICAgICAgYWRtaW5OYW1lU3RyZWFtOiB0aGlzLmFkbWluTmFtZVN0cmVhbS52YWx1ZSxcbiAgICAgIHlvdVlvdVN0cmVhbTogdGhpcy55b3VZb3VTdHJlYW0udmFsdWUsXG4gICAgICB5b3VZb3VTdHJlYW1JRHM6IHRoaXMueW91WW91U3RyZWFtSURzLnZhbHVlLFxuICAgICAgbG9jYWxTdHJlYW06IHRoaXMubG9jYWxTdHJlYW0udmFsdWUsXG4gICAgICByZWNvcmRTdGFydGVkOiB0aGlzLnJlY29yZFN0YXJ0ZWQudmFsdWUsXG4gICAgICByZWNvcmRSZXN1bWVkOiB0aGlzLnJlY29yZFJlc3VtZWQudmFsdWUsXG4gICAgICByZWNvcmRQYXVzZWQ6IHRoaXMucmVjb3JkUGF1c2VkLnZhbHVlLFxuICAgICAgcmVjb3JkU3RvcHBlZDogdGhpcy5yZWNvcmRTdG9wcGVkLnZhbHVlLFxuICAgICAgYWRtaW5SZXN0cmljdFNldHRpbmc6IHRoaXMuYWRtaW5SZXN0cmljdFNldHRpbmcudmFsdWUsXG4gICAgICB2aWRlb1JlcXVlc3RTdGF0ZTogdGhpcy52aWRlb1JlcXVlc3RTdGF0ZS52YWx1ZSxcbiAgICAgIHZpZGVvUmVxdWVzdFRpbWU6IHRoaXMudmlkZW9SZXF1ZXN0VGltZS52YWx1ZSxcbiAgICAgIHZpZGVvQWN0aW9uOiB0aGlzLnZpZGVvQWN0aW9uLnZhbHVlLFxuICAgICAgbG9jYWxTdHJlYW1WaWRlbzogdGhpcy5sb2NhbFN0cmVhbVZpZGVvLnZhbHVlLFxuICAgICAgdXNlckRlZmF1bHRWaWRlb0lucHV0RGV2aWNlOiB0aGlzLnVzZXJEZWZhdWx0VmlkZW9JbnB1dERldmljZS52YWx1ZSxcbiAgICAgIGN1cnJlbnRGYWNpbmdNb2RlOiB0aGlzLmN1cnJlbnRGYWNpbmdNb2RlLnZhbHVlLFxuICAgICAgcHJldkZhY2luZ01vZGU6IHRoaXMucHJldkZhY2luZ01vZGUudmFsdWUsXG4gICAgICBkZWZWaWRlb0lEOiB0aGlzLmRlZlZpZGVvSUQudmFsdWUsXG4gICAgICBhbGxvd2VkOiB0aGlzLmFsbG93ZWQudmFsdWUsXG4gICAgICBkaXNwQWN0aXZlTmFtZXM6IHRoaXMuZGlzcEFjdGl2ZU5hbWVzLnZhbHVlLFxuICAgICAgcF9kaXNwQWN0aXZlTmFtZXM6IHRoaXMucF9kaXNwQWN0aXZlTmFtZXMudmFsdWUsXG4gICAgICBhY3RpdmVOYW1lczogdGhpcy5hY3RpdmVOYW1lcy52YWx1ZSxcbiAgICAgIHByZXZBY3RpdmVOYW1lczogdGhpcy5wcmV2QWN0aXZlTmFtZXMudmFsdWUsXG4gICAgICBwX2FjdGl2ZU5hbWVzOiB0aGlzLnBfYWN0aXZlTmFtZXMudmFsdWUsXG4gICAgICBtZW1iZXJzUmVjZWl2ZWQ6IHRoaXMubWVtYmVyc1JlY2VpdmVkLnZhbHVlLFxuICAgICAgZGVmZXJTY3JlZW5SZWNlaXZlZDogdGhpcy5kZWZlclNjcmVlblJlY2VpdmVkLnZhbHVlLFxuICAgICAgaG9zdEZpcnN0U3dpdGNoOiB0aGlzLmhvc3RGaXJzdFN3aXRjaC52YWx1ZSxcbiAgICAgIG1pY0FjdGlvbjogdGhpcy5taWNBY3Rpb24udmFsdWUsXG4gICAgICBzY3JlZW5BY3Rpb246IHRoaXMuc2NyZWVuQWN0aW9uLnZhbHVlLFxuICAgICAgY2hhdEFjdGlvbjogdGhpcy5jaGF0QWN0aW9uLnZhbHVlLFxuICAgICAgYXVkaW9SZXF1ZXN0U3RhdGU6IHRoaXMuYXVkaW9SZXF1ZXN0U3RhdGUudmFsdWUsXG4gICAgICBzY3JlZW5SZXF1ZXN0U3RhdGU6IHRoaXMuc2NyZWVuUmVxdWVzdFN0YXRlLnZhbHVlLFxuICAgICAgY2hhdFJlcXVlc3RTdGF0ZTogdGhpcy5jaGF0UmVxdWVzdFN0YXRlLnZhbHVlLFxuICAgICAgYXVkaW9SZXF1ZXN0VGltZTogdGhpcy5hdWRpb1JlcXVlc3RUaW1lLnZhbHVlLFxuICAgICAgc2NyZWVuUmVxdWVzdFRpbWU6IHRoaXMuc2NyZWVuUmVxdWVzdFRpbWUudmFsdWUsXG4gICAgICBjaGF0UmVxdWVzdFRpbWU6IHRoaXMuY2hhdFJlcXVlc3RUaW1lLnZhbHVlLFxuICAgICAgdXBkYXRlUmVxdWVzdEludGVydmFsU2Vjb25kczogdGhpcy51cGRhdGVSZXF1ZXN0SW50ZXJ2YWxTZWNvbmRzLnZhbHVlLFxuICAgICAgb2xkU291bmRJZHM6IHRoaXMub2xkU291bmRJZHMudmFsdWUsXG4gICAgICBob3N0TGFiZWw6IHRoaXMuaG9zdExhYmVsLnZhbHVlLFxuICAgICAgbWFpblNjcmVlbkZpbGxlZDogdGhpcy5tYWluU2NyZWVuRmlsbGVkLnZhbHVlLFxuICAgICAgbG9jYWxTdHJlYW1TY3JlZW46IHRoaXMubG9jYWxTdHJlYW1TY3JlZW4udmFsdWUsXG4gICAgICBzY3JlZW5BbHJlYWR5T246IHRoaXMuc2NyZWVuQWxyZWFkeU9uLnZhbHVlLFxuICAgICAgY2hhdEFscmVhZHlPbjogdGhpcy5jaGF0QWxyZWFkeU9uLnZhbHVlLFxuICAgICAgcmVkaXJlY3RVUkw6IHRoaXMucmVkaXJlY3RVUkwudmFsdWUsXG4gICAgICBvbGRBbGxTdHJlYW1zOiB0aGlzLm9sZEFsbFN0cmVhbXMudmFsdWUsXG4gICAgICBhZG1pblZpZElEOiB0aGlzLmFkbWluVmlkSUQudmFsdWUsXG4gICAgICBzdHJlYW1OYW1lczogdGhpcy5zdHJlYW1OYW1lcy52YWx1ZSxcbiAgICAgIG5vbl9hbFZpZGVvU3RyZWFtczogdGhpcy5ub25fYWxWaWRlb1N0cmVhbXMudmFsdWUsXG4gICAgICBzb3J0QXVkaW9Mb3VkbmVzczogdGhpcy5zb3J0QXVkaW9Mb3VkbmVzcy52YWx1ZSxcbiAgICAgIGF1ZGlvRGVjaWJlbHM6IHRoaXMuYXVkaW9EZWNpYmVscy52YWx1ZSxcbiAgICAgIG1peGVkX2FsVmlkZW9TdHJlYW1zOiB0aGlzLm1peGVkX2FsVmlkZW9TdHJlYW1zLnZhbHVlLFxuICAgICAgbm9uX2FsVmlkZW9TdHJlYW1zX211dGVkOiB0aGlzLm5vbl9hbFZpZGVvU3RyZWFtc19tdXRlZC52YWx1ZSxcbiAgICAgIHBhZ2luYXRlZFN0cmVhbXM6IHRoaXMucGFnaW5hdGVkU3RyZWFtcy52YWx1ZSxcbiAgICAgIGxvY2FsU3RyZWFtQXVkaW86IHRoaXMubG9jYWxTdHJlYW1BdWRpby52YWx1ZSxcbiAgICAgIGRlZkF1ZGlvSUQ6IHRoaXMuZGVmQXVkaW9JRC52YWx1ZSxcbiAgICAgIHVzZXJEZWZhdWx0QXVkaW9JbnB1dERldmljZTogdGhpcy51c2VyRGVmYXVsdEF1ZGlvSW5wdXREZXZpY2UudmFsdWUsXG4gICAgICB1c2VyRGVmYXVsdEF1ZGlvT3V0cHV0RGV2aWNlOiB0aGlzLnVzZXJEZWZhdWx0QXVkaW9PdXRwdXREZXZpY2UudmFsdWUsXG4gICAgICBwcmV2QXVkaW9JbnB1dERldmljZTogdGhpcy5wcmV2QXVkaW9JbnB1dERldmljZS52YWx1ZSxcbiAgICAgIHByZXZWaWRlb0lucHV0RGV2aWNlOiB0aGlzLnByZXZWaWRlb0lucHV0RGV2aWNlLnZhbHVlLFxuICAgICAgYXVkaW9QYXVzZWQ6IHRoaXMuYXVkaW9QYXVzZWQudmFsdWUsXG4gICAgICBtYWluU2NyZWVuUGVyc29uOiB0aGlzLm1haW5TY3JlZW5QZXJzb24udmFsdWUsXG4gICAgICBhZG1pbk9uTWFpblNjcmVlbjogdGhpcy5hZG1pbk9uTWFpblNjcmVlbi52YWx1ZSxcbiAgICAgIHNjcmVlblN0YXRlczogdGhpcy5zY3JlZW5TdGF0ZXMudmFsdWUsXG4gICAgICBwcmV2U2NyZWVuU3RhdGVzOiB0aGlzLnByZXZTY3JlZW5TdGF0ZXMudmFsdWUsXG4gICAgICB1cGRhdGVEYXRlU3RhdGU6IHRoaXMudXBkYXRlRGF0ZVN0YXRlLnZhbHVlLFxuICAgICAgbGFzdFVwZGF0ZTogdGhpcy5sYXN0VXBkYXRlLnZhbHVlLFxuICAgICAgbkZvclJlYWRqdXN0UmVjb3JkOiB0aGlzLm5Gb3JSZWFkanVzdFJlY29yZC52YWx1ZSxcbiAgICAgIGZpeGVkUGFnZUxpbWl0OiB0aGlzLmZpeGVkUGFnZUxpbWl0LnZhbHVlLFxuICAgICAgcmVtb3ZlQWx0R3JpZDogdGhpcy5yZW1vdmVBbHRHcmlkLnZhbHVlLFxuICAgICAgbkZvclJlYWRqdXN0OiB0aGlzLm5Gb3JSZWFkanVzdC52YWx1ZSxcbiAgICAgIGxhc3RSZW9yZGVyVGltZTogdGhpcy5sYXN0UmVvcmRlclRpbWUudmFsdWUsXG4gICAgICByZW9yZGVySW50ZXJ2YWw6IHRoaXMucmVvcmRlckludGVydmFsLnZhbHVlLFxuICAgICAgZmFzdFJlb3JkZXJJbnRlcnZhbDogdGhpcy5mYXN0UmVvcmRlckludGVydmFsLnZhbHVlLFxuICAgICAgYXVkU3RyZWFtTmFtZXM6IHRoaXMuYXVkU3RyZWFtTmFtZXMudmFsdWUsXG4gICAgICBjdXJyZW50VXNlclBhZ2U6IHRoaXMuY3VycmVudFVzZXJQYWdlLnZhbHVlLFxuICAgICAgbWFpbkhlaWdodFdpZHRoOiB0aGlzLm1haW5IZWlnaHRXaWR0aC52YWx1ZSxcbiAgICAgIHByZXZNYWluSGVpZ2h0V2lkdGg6IHRoaXMucHJldk1haW5IZWlnaHRXaWR0aC52YWx1ZSxcbiAgICAgIHByZXZEb1BhZ2luYXRlOiB0aGlzLnByZXZEb1BhZ2luYXRlLnZhbHVlLFxuICAgICAgZG9QYWdpbmF0ZTogdGhpcy5kb1BhZ2luYXRlLnZhbHVlLFxuICAgICAgc2hhcmVFbmRlZDogdGhpcy5zaGFyZUVuZGVkLnZhbHVlLFxuICAgICAgbFN0cmVhbXM6IHRoaXMubFN0cmVhbXMudmFsdWUsXG4gICAgICBjaGF0UmVmU3RyZWFtczogdGhpcy5jaGF0UmVmU3RyZWFtcy52YWx1ZSxcbiAgICAgIGNvbnRyb2xIZWlnaHQ6IHRoaXMuY29udHJvbEhlaWdodC52YWx1ZSxcbiAgICAgIGlzV2lkZVNjcmVlbjogdGhpcy5pc1dpZGVTY3JlZW4udmFsdWUsXG4gICAgICBpc01lZGl1bVNjcmVlbjogdGhpcy5pc01lZGl1bVNjcmVlbi52YWx1ZSxcbiAgICAgIGlzU21hbGxTY3JlZW46IHRoaXMuaXNTbWFsbFNjcmVlbi52YWx1ZSxcbiAgICAgIGFkZEdyaWQ6IHRoaXMuYWRkR3JpZC52YWx1ZSxcbiAgICAgIGFkZEFsdEdyaWQ6IHRoaXMuYWRkQWx0R3JpZC52YWx1ZSxcbiAgICAgIGdyaWRSb3dzOiB0aGlzLmdyaWRSb3dzLnZhbHVlLFxuICAgICAgZ3JpZENvbHM6IHRoaXMuZ3JpZENvbHMudmFsdWUsXG4gICAgICBhbHRHcmlkUm93czogdGhpcy5hbHRHcmlkUm93cy52YWx1ZSxcbiAgICAgIGFsdEdyaWRDb2xzOiB0aGlzLmFsdEdyaWRDb2xzLnZhbHVlLFxuICAgICAgbnVtYmVyUGFnZXM6IHRoaXMubnVtYmVyUGFnZXMudmFsdWUsXG4gICAgICBjdXJyZW50U3RyZWFtczogdGhpcy5jdXJyZW50U3RyZWFtcy52YWx1ZSxcbiAgICAgIHNob3dNaW5pVmlldzogdGhpcy5zaG93TWluaVZpZXcudmFsdWUsXG4gICAgICBuU3RyZWFtOiB0aGlzLm5TdHJlYW0udmFsdWUsXG4gICAgICBkZWZlcl9yZWNlaXZlOiB0aGlzLmRlZmVyX3JlY2VpdmUudmFsdWUsXG4gICAgICBhbGxBdWRpb1N0cmVhbXM6IHRoaXMuYWxsQXVkaW9TdHJlYW1zLnZhbHVlLFxuICAgICAgc2NyZWVuUHJvZHVjZXI6IHRoaXMuc2NyZWVuUHJvZHVjZXIudmFsdWUsXG4gICAgICByZW1vdGVTY3JlZW5TdHJlYW06IHRoaXMucmVtb3RlU2NyZWVuU3RyZWFtLnZhbHVlLFxuICAgICAgZ290QWxsVmlkczogdGhpcy5nb3RBbGxWaWRzLnZhbHVlLFxuICAgICAgcGFnaW5hdGlvbkhlaWdodFdpZHRoOiB0aGlzLnBhZ2luYXRpb25IZWlnaHRXaWR0aC52YWx1ZSxcbiAgICAgIHBhZ2luYXRpb25EaXJlY3Rpb246IHRoaXMucGFnaW5hdGlvbkRpcmVjdGlvbi52YWx1ZSxcbiAgICAgIGdyaWRTaXplczogdGhpcy5ncmlkU2l6ZXMudmFsdWUsXG4gICAgICBzY3JlZW5Gb3JjZUZ1bGxEaXNwbGF5OiB0aGlzLnNjcmVlbkZvcmNlRnVsbERpc3BsYXkudmFsdWUsXG4gICAgICBtYWluR3JpZFN0cmVhbTogdGhpcy5tYWluR3JpZFN0cmVhbS52YWx1ZSxcbiAgICAgIG90aGVyR3JpZFN0cmVhbXM6IHRoaXMub3RoZXJHcmlkU3RyZWFtcy52YWx1ZSxcbiAgICAgIGF1ZGlvT25seVN0cmVhbXM6IHRoaXMuYXVkaW9Pbmx5U3RyZWFtcy52YWx1ZSxcbiAgICAgIHZpZGVvSW5wdXRzOiB0aGlzLnZpZGVvSW5wdXRzLnZhbHVlLFxuICAgICAgYXVkaW9JbnB1dHM6IHRoaXMuYXVkaW9JbnB1dHMudmFsdWUsXG4gICAgICBtZWV0aW5nUHJvZ3Jlc3NUaW1lOiB0aGlzLm1lZXRpbmdQcm9ncmVzc1RpbWUudmFsdWUsXG4gICAgICBtZWV0aW5nRWxhcHNlZFRpbWU6IHRoaXMubWVldGluZ0VsYXBzZWRUaW1lLnZhbHVlLFxuXG4gICAgICByZWZfcGFydGljaXBhbnRzOiB0aGlzLnJlZl9wYXJ0aWNpcGFudHMudmFsdWUsXG5cbiAgICAgIG1lc3NhZ2VzOiB0aGlzLm1lc3NhZ2VzLnZhbHVlLFxuICAgICAgc3RhcnREaXJlY3RNZXNzYWdlOiB0aGlzLnN0YXJ0RGlyZWN0TWVzc2FnZS52YWx1ZSxcbiAgICAgIGRpcmVjdE1lc3NhZ2VEZXRhaWxzOiB0aGlzLmRpcmVjdE1lc3NhZ2VEZXRhaWxzLnZhbHVlLFxuICAgICAgY29Ib3N0OiB0aGlzLmNvSG9zdC52YWx1ZSxcbiAgICAgIGNvSG9zdFJlc3BvbnNpYmlsaXR5OiB0aGlzLmNvSG9zdFJlc3BvbnNpYmlsaXR5LnZhbHVlLFxuXG4gICAgICAvLyBFdmVudCBzZXR0aW5nc1xuICAgICAgYXVkaW9TZXR0aW5nOiB0aGlzLmF1ZGlvU2V0dGluZy52YWx1ZSxcbiAgICAgIHZpZGVvU2V0dGluZzogdGhpcy52aWRlb1NldHRpbmcudmFsdWUsXG4gICAgICBzY3JlZW5zaGFyZVNldHRpbmc6IHRoaXMuc2NyZWVuc2hhcmVTZXR0aW5nLnZhbHVlLFxuICAgICAgY2hhdFNldHRpbmc6IHRoaXMuY2hhdFNldHRpbmcudmFsdWUsXG5cbiAgICAgIC8vIERpc3BsYXkgc2V0dGluZ3NcbiAgICAgIGF1dG9XYXZlOiB0aGlzLmF1dG9XYXZlLnZhbHVlLFxuICAgICAgZm9yY2VGdWxsRGlzcGxheTogdGhpcy5mb3JjZUZ1bGxEaXNwbGF5LnZhbHVlLFxuICAgICAgcHJldkZvcmNlRnVsbERpc3BsYXk6IHRoaXMucHJldkZvcmNlRnVsbERpc3BsYXkudmFsdWUsXG4gICAgICBwcmV2TWVldGluZ0Rpc3BsYXlUeXBlOiB0aGlzLnByZXZNZWV0aW5nRGlzcGxheVR5cGUudmFsdWUsXG5cbiAgICAgIC8vIFdhaXRpbmcgcm9vbVxuICAgICAgd2FpdGluZ1Jvb21GaWx0ZXI6IHRoaXMud2FpdGluZ1Jvb21GaWx0ZXIudmFsdWUsXG4gICAgICB3YWl0aW5nUm9vbUxpc3Q6IHRoaXMud2FpdGluZ1Jvb21MaXN0LnZhbHVlLFxuICAgICAgd2FpdGluZ1Jvb21Db3VudGVyOiB0aGlzLndhaXRpbmdSb29tQ291bnRlci52YWx1ZSxcbiAgICAgIGZpbHRlcmVkV2FpdGluZ1Jvb21MaXN0OiB0aGlzLmZpbHRlcmVkV2FpdGluZ1Jvb21MaXN0LnZhbHVlLFxuXG4gICAgICAvLyBSZXF1ZXN0c1xuICAgICAgcmVxdWVzdEZpbHRlcjogdGhpcy5yZXF1ZXN0RmlsdGVyLnZhbHVlLFxuICAgICAgcmVxdWVzdExpc3Q6IHRoaXMucmVxdWVzdExpc3QudmFsdWUsXG4gICAgICByZXF1ZXN0Q291bnRlcjogdGhpcy5yZXF1ZXN0Q291bnRlci52YWx1ZSxcbiAgICAgIGZpbHRlcmVkUmVxdWVzdExpc3Q6IHRoaXMuZmlsdGVyZWRSZXF1ZXN0TGlzdC52YWx1ZSxcblxuICAgICAgLy8gVG90YWwgcmVxdWVzdHMgYW5kIHdhaXRpbmcgcm9vbVxuICAgICAgdG90YWxSZXFXYWl0OiB0aGlzLnRvdGFsUmVxV2FpdC52YWx1ZSxcblxuICAgICAgLy8gQWxlcnRzXG4gICAgICBhbGVydFZpc2libGU6IHRoaXMuYWxlcnRWaXNpYmxlLnZhbHVlLFxuICAgICAgYWxlcnRNZXNzYWdlOiB0aGlzLmFsZXJ0TWVzc2FnZS52YWx1ZSxcbiAgICAgIGFsZXJ0VHlwZTogdGhpcy5hbGVydFR5cGUudmFsdWUsXG4gICAgICBhbGVydER1cmF0aW9uOiB0aGlzLmFsZXJ0RHVyYXRpb24udmFsdWUsXG5cbiAgICAgIC8vIFByb2dyZXNzIFRpbWVyXG4gICAgICBwcm9ncmVzc1RpbWVyVmlzaWJsZTogdGhpcy5wcm9ncmVzc1RpbWVyVmlzaWJsZS52YWx1ZSxcbiAgICAgIHByb2dyZXNzVGltZXJWYWx1ZTogdGhpcy5wcm9ncmVzc1RpbWVyVmFsdWUudmFsdWUsXG5cbiAgICAgIC8vIE1lbnUgbW9kYWxzXG4gICAgICBpc01lbnVNb2RhbFZpc2libGU6IHRoaXMuaXNNZW51TW9kYWxWaXNpYmxlLnZhbHVlLFxuICAgICAgaXNSZWNvcmRpbmdNb2RhbFZpc2libGU6IHRoaXMuaXNSZWNvcmRpbmdNb2RhbFZpc2libGUudmFsdWUsXG4gICAgICBpc1NldHRpbmdzTW9kYWxWaXNpYmxlOiB0aGlzLmlzU2V0dGluZ3NNb2RhbFZpc2libGUudmFsdWUsXG4gICAgICBpc1JlcXVlc3RzTW9kYWxWaXNpYmxlOiB0aGlzLmlzUmVxdWVzdHNNb2RhbFZpc2libGUudmFsdWUsXG4gICAgICBpc1dhaXRpbmdNb2RhbFZpc2libGU6IHRoaXMuaXNXYWl0aW5nTW9kYWxWaXNpYmxlLnZhbHVlLFxuICAgICAgaXNDb0hvc3RNb2RhbFZpc2libGU6IHRoaXMuaXNDb0hvc3RNb2RhbFZpc2libGUudmFsdWUsXG4gICAgICBpc01lZGlhU2V0dGluZ3NNb2RhbFZpc2libGU6IHRoaXMuaXNNZWRpYVNldHRpbmdzTW9kYWxWaXNpYmxlLnZhbHVlLFxuICAgICAgaXNEaXNwbGF5U2V0dGluZ3NNb2RhbFZpc2libGU6IHRoaXMuaXNEaXNwbGF5U2V0dGluZ3NNb2RhbFZpc2libGUudmFsdWUsXG5cbiAgICAgIC8vIE90aGVyIE1vZGFsc1xuICAgICAgaXNQYXJ0aWNpcGFudHNNb2RhbFZpc2libGU6IHRoaXMuaXNQYXJ0aWNpcGFudHNNb2RhbFZpc2libGUudmFsdWUsXG4gICAgICBpc01lc3NhZ2VzTW9kYWxWaXNpYmxlOiB0aGlzLmlzTWVzc2FnZXNNb2RhbFZpc2libGUudmFsdWUsXG4gICAgICBpc0NvbmZpcm1FeGl0TW9kYWxWaXNpYmxlOiB0aGlzLmlzQ29uZmlybUV4aXRNb2RhbFZpc2libGUudmFsdWUsXG4gICAgICBpc0NvbmZpcm1IZXJlTW9kYWxWaXNpYmxlOiB0aGlzLmlzQ29uZmlybUhlcmVNb2RhbFZpc2libGUudmFsdWUsXG4gICAgICBpc0xvYWRpbmdNb2RhbFZpc2libGU6IHRoaXMuaXNMb2FkaW5nTW9kYWxWaXNpYmxlLnZhbHVlLFxuXG4gICAgICAvLyBSZWNvcmRpbmcgT3B0aW9uc1xuICAgICAgcmVjb3JkaW5nTWVkaWFPcHRpb25zOiB0aGlzLnJlY29yZGluZ01lZGlhT3B0aW9ucy52YWx1ZSxcbiAgICAgIHJlY29yZGluZ0F1ZGlvT3B0aW9uczogdGhpcy5yZWNvcmRpbmdBdWRpb09wdGlvbnMudmFsdWUsXG4gICAgICByZWNvcmRpbmdWaWRlb09wdGlvbnM6IHRoaXMucmVjb3JkaW5nVmlkZW9PcHRpb25zLnZhbHVlLFxuICAgICAgcmVjb3JkaW5nVmlkZW9UeXBlOiB0aGlzLnJlY29yZGluZ1ZpZGVvVHlwZS52YWx1ZSxcbiAgICAgIHJlY29yZGluZ1ZpZGVvT3B0aW1pemVkOiB0aGlzLnJlY29yZGluZ1ZpZGVvT3B0aW1pemVkLnZhbHVlLFxuICAgICAgcmVjb3JkaW5nRGlzcGxheVR5cGU6IHRoaXMucmVjb3JkaW5nRGlzcGxheVR5cGUudmFsdWUsXG4gICAgICByZWNvcmRpbmdBZGRITFM6IHRoaXMucmVjb3JkaW5nQWRkSExTLnZhbHVlLFxuICAgICAgcmVjb3JkaW5nQWRkVGV4dDogdGhpcy5yZWNvcmRpbmdBZGRUZXh0LnZhbHVlLFxuICAgICAgcmVjb3JkaW5nQ3VzdG9tVGV4dDogdGhpcy5yZWNvcmRpbmdDdXN0b21UZXh0LnZhbHVlLFxuICAgICAgcmVjb3JkaW5nQ3VzdG9tVGV4dFBvc2l0aW9uOiB0aGlzLnJlY29yZGluZ0N1c3RvbVRleHRQb3NpdGlvbi52YWx1ZSxcbiAgICAgIHJlY29yZGluZ0N1c3RvbVRleHRDb2xvcjogdGhpcy5yZWNvcmRpbmdDdXN0b21UZXh0Q29sb3IudmFsdWUsXG4gICAgICByZWNvcmRpbmdOYW1lVGFnczogdGhpcy5yZWNvcmRpbmdOYW1lVGFncy52YWx1ZSxcbiAgICAgIHJlY29yZGluZ0JhY2tncm91bmRDb2xvcjogdGhpcy5yZWNvcmRpbmdCYWNrZ3JvdW5kQ29sb3IudmFsdWUsXG4gICAgICByZWNvcmRpbmdOYW1lVGFnc0NvbG9yOiB0aGlzLnJlY29yZGluZ05hbWVUYWdzQ29sb3IudmFsdWUsXG4gICAgICByZWNvcmRpbmdPcmllbnRhdGlvblZpZGVvOiB0aGlzLnJlY29yZGluZ09yaWVudGF0aW9uVmlkZW8udmFsdWUsXG4gICAgICBjbGVhcmVkVG9SZXN1bWU6IHRoaXMuY2xlYXJlZFRvUmVzdW1lLnZhbHVlLFxuICAgICAgY2xlYXJlZFRvUmVjb3JkOiB0aGlzLmNsZWFyZWRUb1JlY29yZC52YWx1ZSxcbiAgICAgIHJlY29yZFN0YXRlOiB0aGlzLnJlY29yZFN0YXRlLnZhbHVlLFxuICAgICAgc2hvd1JlY29yZEJ1dHRvbnM6IHRoaXMuc2hvd1JlY29yZEJ1dHRvbnMudmFsdWUsXG4gICAgICByZWNvcmRpbmdQcm9ncmVzc1RpbWU6IHRoaXMucmVjb3JkaW5nUHJvZ3Jlc3NUaW1lLnZhbHVlLFxuICAgICAgYXVkaW9Td2l0Y2hpbmc6IHRoaXMuYXVkaW9Td2l0Y2hpbmcudmFsdWUsXG4gICAgICB2aWRlb1N3aXRjaGluZzogdGhpcy52aWRlb1N3aXRjaGluZy52YWx1ZSxcblxuICAgICAgLy8gTWVkaWEgc3RhdGVzXG4gICAgICB2aWRlb0FscmVhZHlPbjogdGhpcy52aWRlb0FscmVhZHlPbi52YWx1ZSxcbiAgICAgIGF1ZGlvQWxyZWFkeU9uOiB0aGlzLmF1ZGlvQWxyZWFkeU9uLnZhbHVlLFxuICAgICAgY29tcG9uZW50U2l6ZXM6IHRoaXMuY29tcG9uZW50U2l6ZXMudmFsdWUsXG5cbiAgICAgIC8vIFBlcm1pc3Npb25zXG4gICAgICBoYXNDYW1lcmFQZXJtaXNzaW9uOiB0aGlzLmhhc0NhbWVyYVBlcm1pc3Npb24udmFsdWUsXG4gICAgICBoYXNBdWRpb1Blcm1pc3Npb246IHRoaXMuaGFzQXVkaW9QZXJtaXNzaW9uLnZhbHVlLFxuXG4gICAgICAvLyBUcmFuc3BvcnRzXG4gICAgICB0cmFuc3BvcnRDcmVhdGVkOiB0aGlzLnRyYW5zcG9ydENyZWF0ZWQudmFsdWUsXG4gICAgICB0cmFuc3BvcnRDcmVhdGVkVmlkZW86IHRoaXMudHJhbnNwb3J0Q3JlYXRlZFZpZGVvLnZhbHVlLFxuICAgICAgdHJhbnNwb3J0Q3JlYXRlZEF1ZGlvOiB0aGlzLnRyYW5zcG9ydENyZWF0ZWRBdWRpby52YWx1ZSxcbiAgICAgIHRyYW5zcG9ydENyZWF0ZWRTY3JlZW46IHRoaXMudHJhbnNwb3J0Q3JlYXRlZFNjcmVlbi52YWx1ZSxcbiAgICAgIHByb2R1Y2VyVHJhbnNwb3J0OiB0aGlzLnByb2R1Y2VyVHJhbnNwb3J0LnZhbHVlLFxuICAgICAgdmlkZW9Qcm9kdWNlcjogdGhpcy52aWRlb1Byb2R1Y2VyLnZhbHVlLFxuICAgICAgcGFyYW1zOiB0aGlzLnBhcmFtcy52YWx1ZSxcbiAgICAgIHZpZGVvUGFyYW1zOiB0aGlzLnZpZGVvUGFyYW1zLnZhbHVlLFxuICAgICAgYXVkaW9QYXJhbXM6IHRoaXMuYXVkaW9QYXJhbXMudmFsdWUsXG4gICAgICBhdWRpb1Byb2R1Y2VyOiB0aGlzLmF1ZGlvUHJvZHVjZXIudmFsdWUsXG4gICAgICBjb25zdW1lclRyYW5zcG9ydHM6IHRoaXMuY29uc3VtZXJUcmFuc3BvcnRzLnZhbHVlLFxuICAgICAgY29uc3VtaW5nVHJhbnNwb3J0czogdGhpcy5jb25zdW1pbmdUcmFuc3BvcnRzLnZhbHVlLFxuXG4gICAgICAvLyBQb2xsc1xuICAgICAgcG9sbHM6IHRoaXMucG9sbHMudmFsdWUsXG4gICAgICBwb2xsOiB0aGlzLnBvbGwudmFsdWUsXG4gICAgICBpc1BvbGxNb2RhbFZpc2libGU6IHRoaXMuaXNQb2xsTW9kYWxWaXNpYmxlLnZhbHVlLFxuXG4gICAgICAvLyBCYWNrZ3JvdW5kXG4gICAgICBjdXN0b21JbWFnZTogdGhpcy5jdXN0b21JbWFnZS52YWx1ZSxcbiAgICAgIHNlbGVjdGVkSW1hZ2U6IHRoaXMuc2VsZWN0ZWRJbWFnZS52YWx1ZSxcbiAgICAgIHNlZ21lbnRWaWRlbzogdGhpcy5zZWdtZW50VmlkZW8udmFsdWUsXG4gICAgICBzZWxmaWVTZWdtZW50YXRpb246IHRoaXMuc2VsZmllU2VnbWVudGF0aW9uLnZhbHVlLFxuICAgICAgcGF1c2VTZWdtZW50YXRpb246IHRoaXMucGF1c2VTZWdtZW50YXRpb24udmFsdWUsXG4gICAgICBwcm9jZXNzZWRTdHJlYW06IHRoaXMucHJvY2Vzc2VkU3RyZWFtLnZhbHVlLFxuICAgICAga2VlcEJhY2tncm91bmQ6IHRoaXMua2VlcEJhY2tncm91bmQudmFsdWUsXG4gICAgICBiYWNrZ3JvdW5kSGFzQ2hhbmdlZDogdGhpcy5iYWNrZ3JvdW5kSGFzQ2hhbmdlZC52YWx1ZSxcbiAgICAgIHZpcnR1YWxTdHJlYW06IHRoaXMudmlydHVhbFN0cmVhbS52YWx1ZSxcbiAgICAgIG1haW5DYW52YXM6IHRoaXMubWFpbkNhbnZhcy52YWx1ZSxcbiAgICAgIHByZXZLZWVwQmFja2dyb3VuZDogdGhpcy5wcmV2S2VlcEJhY2tncm91bmQudmFsdWUsXG4gICAgICBhcHBsaWVkQmFja2dyb3VuZDogdGhpcy5hcHBsaWVkQmFja2dyb3VuZC52YWx1ZSxcbiAgICAgIGlzQmFja2dyb3VuZE1vZGFsVmlzaWJsZTogdGhpcy5pc0JhY2tncm91bmRNb2RhbFZpc2libGUudmFsdWUsXG4gICAgICBhdXRvQ2xpY2tCYWNrZ3JvdW5kOiB0aGlzLmF1dG9DbGlja0JhY2tncm91bmQudmFsdWUsXG5cbiAgICAgIC8vIEJyZWFrb3V0IHJvb21zXG4gICAgICBicmVha291dFJvb21zOiB0aGlzLmJyZWFrb3V0Um9vbXMudmFsdWUsXG4gICAgICBjdXJyZW50Um9vbUluZGV4OiB0aGlzLmN1cnJlbnRSb29tSW5kZXgudmFsdWUsXG4gICAgICBjYW5TdGFydEJyZWFrb3V0OiB0aGlzLmNhblN0YXJ0QnJlYWtvdXQudmFsdWUsXG4gICAgICBicmVha091dFJvb21TdGFydGVkOiB0aGlzLmJyZWFrT3V0Um9vbVN0YXJ0ZWQudmFsdWUsXG4gICAgICBicmVha091dFJvb21FbmRlZDogdGhpcy5icmVha091dFJvb21FbmRlZC52YWx1ZSxcbiAgICAgIGhvc3ROZXdSb29tOiB0aGlzLmhvc3ROZXdSb29tLnZhbHVlLFxuICAgICAgbGltaXRlZEJyZWFrUm9vbTogdGhpcy5saW1pdGVkQnJlYWtSb29tLnZhbHVlLFxuICAgICAgbWFpblJvb21zTGVuZ3RoOiB0aGlzLm1haW5Sb29tc0xlbmd0aC52YWx1ZSxcbiAgICAgIG1lbWJlclJvb206IHRoaXMubWVtYmVyUm9vbS52YWx1ZSxcbiAgICAgIGlzQnJlYWtvdXRSb29tc01vZGFsVmlzaWJsZTogdGhpcy5pc0JyZWFrb3V0Um9vbXNNb2RhbFZpc2libGUudmFsdWUsXG5cbiAgICAgIC8vIFdoaXRlYm9hcmRcbiAgICAgIHdoaXRlYm9hcmRVc2VyczogdGhpcy53aGl0ZWJvYXJkVXNlcnMudmFsdWUsXG4gICAgICBjdXJyZW50V2hpdGVib2FyZEluZGV4OiB0aGlzLmN1cnJlbnRXaGl0ZWJvYXJkSW5kZXgudmFsdWUsXG4gICAgICBjYW5TdGFydFdoaXRlYm9hcmQ6IHRoaXMuY2FuU3RhcnRXaGl0ZWJvYXJkLnZhbHVlLFxuICAgICAgd2hpdGVib2FyZFN0YXJ0ZWQ6IHRoaXMud2hpdGVib2FyZFN0YXJ0ZWQudmFsdWUsXG4gICAgICB3aGl0ZWJvYXJkRW5kZWQ6IHRoaXMud2hpdGVib2FyZEVuZGVkLnZhbHVlLFxuICAgICAgd2hpdGVib2FyZExpbWl0OiB0aGlzLndoaXRlYm9hcmRMaW1pdC52YWx1ZSxcbiAgICAgIGlzV2hpdGVib2FyZE1vZGFsVmlzaWJsZTogdGhpcy5pc1doaXRlYm9hcmRNb2RhbFZpc2libGUudmFsdWUsXG4gICAgICBpc0NvbmZpZ3VyZVdoaXRlYm9hcmRNb2RhbFZpc2libGU6IHRoaXMuaXNDb25maWd1cmVXaGl0ZWJvYXJkTW9kYWxWaXNpYmxlLnZhbHVlLFxuICAgICAgc2hhcGVzOiB0aGlzLnNoYXBlcy52YWx1ZSxcbiAgICAgIHVzZUltYWdlQmFja2dyb3VuZDogdGhpcy51c2VJbWFnZUJhY2tncm91bmQudmFsdWUsXG4gICAgICByZWRvU3RhY2s6IHRoaXMucmVkb1N0YWNrLnZhbHVlLFxuICAgICAgdW5kb1N0YWNrOiB0aGlzLnVuZG9TdGFjay52YWx1ZSxcbiAgICAgIGNhbnZhc1N0cmVhbTogdGhpcy5jYW52YXNTdHJlYW0udmFsdWUsXG4gICAgICBjYW52YXNXaGl0ZWJvYXJkOiB0aGlzLmNhbnZhc1doaXRlYm9hcmQudmFsdWUsXG5cbiAgICAgIC8vIFNjcmVlbmJvYXJkXG4gICAgICBjYW52YXNTY3JlZW5ib2FyZDogdGhpcy5jYW52YXNTY3JlZW5ib2FyZC52YWx1ZSxcbiAgICAgIHByb2Nlc3NlZFNjcmVlblN0cmVhbTogdGhpcy5wcm9jZXNzZWRTY3JlZW5TdHJlYW0udmFsdWUsXG4gICAgICBhbm5vdGF0ZVNjcmVlblN0cmVhbTogdGhpcy5hbm5vdGF0ZVNjcmVlblN0cmVhbS52YWx1ZSxcbiAgICAgIG1haW5TY3JlZW5DYW52YXM6IHRoaXMubWFpblNjcmVlbkNhbnZhcy52YWx1ZSxcbiAgICAgIGlzU2NyZWVuYm9hcmRNb2RhbFZpc2libGU6IHRoaXMuaXNTY3JlZW5ib2FyZE1vZGFsVmlzaWJsZS52YWx1ZSxcblxuICAgICAgdmFsaWRhdGVkOiB0aGlzLnZhbGlkYXRlZC52YWx1ZSxcbiAgICAgIGRldmljZTogdGhpcy5kZXZpY2UudmFsdWUsXG4gICAgICBzb2NrZXQ6IHRoaXMuc29ja2V0LnZhbHVlLFxuICAgICAgY2hlY2tNZWRpYVBlcm1pc3Npb246IGZhbHNlLFxuICAgICAgb25XZWI6IHRydWUsXG5cbiAgICAgIC8vIFVwZGF0ZSBmdW5jdGlvbnNcbiAgICAgIHVwZGF0ZVJvb21OYW1lOiB0aGlzLnVwZGF0ZVJvb21OYW1lLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVNZW1iZXI6IHRoaXMudXBkYXRlTWVtYmVyLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVBZG1pblBhc3Njb2RlOiB0aGlzLnVwZGF0ZUFkbWluUGFzc2NvZGUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVlvdUFyZUNvSG9zdDogdGhpcy51cGRhdGVZb3VBcmVDb0hvc3QuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVlvdUFyZUhvc3Q6IHRoaXMudXBkYXRlWW91QXJlSG9zdC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlSXNsZXZlbDogdGhpcy51cGRhdGVJc2xldmVsLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVDb0hvc3Q6IHRoaXMudXBkYXRlQ29Ib3N0LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVDb0hvc3RSZXNwb25zaWJpbGl0eTogdGhpcy51cGRhdGVDb0hvc3RSZXNwb25zaWJpbGl0eS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQ29uZmlybWVkVG9SZWNvcmQ6IHRoaXMudXBkYXRlQ29uZmlybWVkVG9SZWNvcmQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZU1lZXRpbmdEaXNwbGF5VHlwZTogdGhpcy51cGRhdGVNZWV0aW5nRGlzcGxheVR5cGUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZU1lZXRpbmdWaWRlb09wdGltaXplZDogdGhpcy51cGRhdGVNZWV0aW5nVmlkZW9PcHRpbWl6ZWQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUV2ZW50VHlwZTogdGhpcy51cGRhdGVFdmVudFR5cGUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVBhcnRpY2lwYW50czogdGhpcy51cGRhdGVQYXJ0aWNpcGFudHMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVBhcnRpY2lwYW50c0NvdW50ZXI6IHRoaXMudXBkYXRlUGFydGljaXBhbnRzQ291bnRlci5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUGFydGljaXBhbnRzRmlsdGVyOiB0aGlzLnVwZGF0ZVBhcnRpY2lwYW50c0ZpbHRlci5iaW5kKHRoaXMpLFxuXG4gICAgICAvLyBNb3JlIHVwZGF0ZSBmdW5jdGlvbnMgZm9yIG1lZGlhIGRldGFpbHNcbiAgICAgIHVwZGF0ZUNvbnN1bWVfc29ja2V0czogdGhpcy51cGRhdGVDb25zdW1lX3NvY2tldHMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJ0cENhcGFiaWxpdGllczogdGhpcy51cGRhdGVSdHBDYXBhYmlsaXRpZXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJvb21SZWN2SVBzOiB0aGlzLnVwZGF0ZVJvb21SZWN2SVBzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVNZWV0aW5nUm9vbVBhcmFtczogdGhpcy51cGRhdGVNZWV0aW5nUm9vbVBhcmFtcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlSXRlbVBhZ2VMaW1pdDogdGhpcy51cGRhdGVJdGVtUGFnZUxpbWl0LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVBdWRpb09ubHlSb29tOiB0aGlzLnVwZGF0ZUF1ZGlvT25seVJvb20uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUFkZEZvckJhc2ljOiB0aGlzLnVwZGF0ZUFkZEZvckJhc2ljLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVTY3JlZW5QYWdlTGltaXQ6IHRoaXMudXBkYXRlU2NyZWVuUGFnZUxpbWl0LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVTaGFyZVNjcmVlblN0YXJ0ZWQ6IHRoaXMudXBkYXRlU2hhcmVTY3JlZW5TdGFydGVkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVTaGFyZWQ6IHRoaXMudXBkYXRlU2hhcmVkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVUYXJnZXRPcmllbnRhdGlvbjogdGhpcy51cGRhdGVUYXJnZXRPcmllbnRhdGlvbi5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlVGFyZ2V0UmVzb2x1dGlvbjogdGhpcy51cGRhdGVUYXJnZXRSZXNvbHV0aW9uLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVUYXJnZXRSZXNvbHV0aW9uSG9zdDogdGhpcy51cGRhdGVUYXJnZXRSZXNvbHV0aW9uSG9zdC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlVmlkQ29uczogdGhpcy51cGRhdGVWaWRDb25zLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVGcmFtZVJhdGU6IHRoaXMudXBkYXRlRnJhbWVSYXRlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVIUGFyYW1zOiB0aGlzLnVwZGF0ZUhQYXJhbXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVZQYXJhbXM6IHRoaXMudXBkYXRlVlBhcmFtcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlU2NyZWVuUGFyYW1zOiB0aGlzLnVwZGF0ZVNjcmVlblBhcmFtcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQVBhcmFtczogdGhpcy51cGRhdGVBUGFyYW1zLmJpbmQodGhpcyksXG5cbiAgICAgIC8vIE1vcmUgdXBkYXRlIGZ1bmN0aW9ucyBmb3IgcmVjb3JkaW5nIGRldGFpbHNcbiAgICAgIHVwZGF0ZVJlY29yZGluZ0F1ZGlvUGF1c2VzTGltaXQ6IHRoaXMudXBkYXRlUmVjb3JkaW5nQXVkaW9QYXVzZXNMaW1pdC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nQXVkaW9QYXVzZXNDb3VudDogdGhpcy51cGRhdGVSZWNvcmRpbmdBdWRpb1BhdXNlc0NvdW50LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRpbmdBdWRpb1N1cHBvcnQ6IHRoaXMudXBkYXRlUmVjb3JkaW5nQXVkaW9TdXBwb3J0LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRpbmdBdWRpb1Blb3BsZUxpbWl0OiB0aGlzLnVwZGF0ZVJlY29yZGluZ0F1ZGlvUGVvcGxlTGltaXQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ0F1ZGlvUGFydGljaXBhbnRzVGltZUxpbWl0OlxuICAgICAgICB0aGlzLnVwZGF0ZVJlY29yZGluZ0F1ZGlvUGFydGljaXBhbnRzVGltZUxpbWl0LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRpbmdWaWRlb1BhdXNlc0NvdW50OiB0aGlzLnVwZGF0ZVJlY29yZGluZ1ZpZGVvUGF1c2VzQ291bnQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ1ZpZGVvUGF1c2VzTGltaXQ6IHRoaXMudXBkYXRlUmVjb3JkaW5nVmlkZW9QYXVzZXNMaW1pdC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nVmlkZW9TdXBwb3J0OiB0aGlzLnVwZGF0ZVJlY29yZGluZ1ZpZGVvU3VwcG9ydC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nVmlkZW9QZW9wbGVMaW1pdDogdGhpcy51cGRhdGVSZWNvcmRpbmdWaWRlb1Blb3BsZUxpbWl0LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRpbmdWaWRlb1BhcnRpY2lwYW50c1RpbWVMaW1pdDpcbiAgICAgICAgdGhpcy51cGRhdGVSZWNvcmRpbmdWaWRlb1BhcnRpY2lwYW50c1RpbWVMaW1pdC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nQWxsUGFydGljaXBhbnRzU3VwcG9ydDogdGhpcy51cGRhdGVSZWNvcmRpbmdBbGxQYXJ0aWNpcGFudHNTdXBwb3J0LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRpbmdWaWRlb1BhcnRpY2lwYW50c1N1cHBvcnQ6XG4gICAgICAgIHRoaXMudXBkYXRlUmVjb3JkaW5nVmlkZW9QYXJ0aWNpcGFudHNTdXBwb3J0LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRpbmdBbGxQYXJ0aWNpcGFudHNGdWxsUm9vbVN1cHBvcnQ6XG4gICAgICAgIHRoaXMudXBkYXRlUmVjb3JkaW5nQWxsUGFydGljaXBhbnRzRnVsbFJvb21TdXBwb3J0LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRpbmdWaWRlb1BhcnRpY2lwYW50c0Z1bGxSb29tU3VwcG9ydDpcbiAgICAgICAgdGhpcy51cGRhdGVSZWNvcmRpbmdWaWRlb1BhcnRpY2lwYW50c0Z1bGxSb29tU3VwcG9ydC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nUHJlZmVycmVkT3JpZW50YXRpb246IHRoaXMudXBkYXRlUmVjb3JkaW5nUHJlZmVycmVkT3JpZW50YXRpb24uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ1N1cHBvcnRGb3JPdGhlck9yaWVudGF0aW9uOlxuICAgICAgICB0aGlzLnVwZGF0ZVJlY29yZGluZ1N1cHBvcnRGb3JPdGhlck9yaWVudGF0aW9uLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRpbmdNdWx0aUZvcm1hdHNTdXBwb3J0OiB0aGlzLnVwZGF0ZVJlY29yZGluZ011bHRpRm9ybWF0c1N1cHBvcnQuYmluZCh0aGlzKSxcblxuICAgICAgdXBkYXRlVXNlclJlY29yZGluZ1BhcmFtczogdGhpcy51cGRhdGVVc2VyUmVjb3JkaW5nUGFyYW1zLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVDYW5SZWNvcmQ6IHRoaXMudXBkYXRlQ2FuUmVjb3JkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVTdGFydFJlcG9ydDogdGhpcy51cGRhdGVTdGFydFJlcG9ydC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlRW5kUmVwb3J0OiB0aGlzLnVwZGF0ZUVuZFJlcG9ydC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkVGltZXJJbnRlcnZhbDogdGhpcy51cGRhdGVSZWNvcmRUaW1lckludGVydmFsLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRTdGFydFRpbWU6IHRoaXMudXBkYXRlUmVjb3JkU3RhcnRUaW1lLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRFbGFwc2VkVGltZTogdGhpcy51cGRhdGVSZWNvcmRFbGFwc2VkVGltZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlSXNUaW1lclJ1bm5pbmc6IHRoaXMudXBkYXRlSXNUaW1lclJ1bm5pbmcuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUNhblBhdXNlUmVzdW1lOiB0aGlzLnVwZGF0ZUNhblBhdXNlUmVzdW1lLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRDaGFuZ2VTZWNvbmRzOiB0aGlzLnVwZGF0ZVJlY29yZENoYW5nZVNlY29uZHMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVBhdXNlTGltaXQ6IHRoaXMudXBkYXRlUGF1c2VMaW1pdC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUGF1c2VSZWNvcmRDb3VudDogdGhpcy51cGRhdGVQYXVzZVJlY29yZENvdW50LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVDYW5MYXVuY2hSZWNvcmQ6IHRoaXMudXBkYXRlQ2FuTGF1bmNoUmVjb3JkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVTdG9wTGF1bmNoUmVjb3JkOiB0aGlzLnVwZGF0ZVN0b3BMYXVuY2hSZWNvcmQuYmluZCh0aGlzKSxcblxuICAgICAgdXBkYXRlUGFydGljaXBhbnRzQWxsOiB0aGlzLnVwZGF0ZVBhcnRpY2lwYW50c0FsbC5iaW5kKHRoaXMpLFxuXG4gICAgICB1cGRhdGVGaXJzdEFsbDogdGhpcy51cGRhdGVGaXJzdEFsbC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlVXBkYXRlTWFpbldpbmRvdzogdGhpcy51cGRhdGVVcGRhdGVNYWluV2luZG93LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVGaXJzdF9yb3VuZDogdGhpcy51cGRhdGVGaXJzdF9yb3VuZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTGFuZFNjYXBlZDogdGhpcy51cGRhdGVMYW5kU2NhcGVkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVMb2NrX3NjcmVlbjogdGhpcy51cGRhdGVMb2NrX3NjcmVlbi5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlU2NyZWVuSWQ6IHRoaXMudXBkYXRlU2NyZWVuSWQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUFsbFZpZGVvU3RyZWFtczogdGhpcy51cGRhdGVBbGxWaWRlb1N0cmVhbXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZU5ld0xpbWl0ZWRTdHJlYW1zOiB0aGlzLnVwZGF0ZU5ld0xpbWl0ZWRTdHJlYW1zLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVOZXdMaW1pdGVkU3RyZWFtc0lEczogdGhpcy51cGRhdGVOZXdMaW1pdGVkU3RyZWFtc0lEcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQWN0aXZlU291bmRzOiB0aGlzLnVwZGF0ZUFjdGl2ZVNvdW5kcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlU2NyZWVuU2hhcmVJRFN0cmVhbTogdGhpcy51cGRhdGVTY3JlZW5TaGFyZUlEU3RyZWFtLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVTY3JlZW5TaGFyZU5hbWVTdHJlYW06IHRoaXMudXBkYXRlU2NyZWVuU2hhcmVOYW1lU3RyZWFtLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVBZG1pbklEU3RyZWFtOiB0aGlzLnVwZGF0ZUFkbWluSURTdHJlYW0uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUFkbWluTmFtZVN0cmVhbTogdGhpcy51cGRhdGVBZG1pbk5hbWVTdHJlYW0uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVlvdVlvdVN0cmVhbTogdGhpcy51cGRhdGVZb3VZb3VTdHJlYW0uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVlvdVlvdVN0cmVhbUlEczogdGhpcy51cGRhdGVZb3VZb3VTdHJlYW1JRHMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUxvY2FsU3RyZWFtOiB0aGlzLnVwZGF0ZUxvY2FsU3RyZWFtLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRTdGFydGVkOiB0aGlzLnVwZGF0ZVJlY29yZFN0YXJ0ZWQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZFJlc3VtZWQ6IHRoaXMudXBkYXRlUmVjb3JkUmVzdW1lZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkUGF1c2VkOiB0aGlzLnVwZGF0ZVJlY29yZFBhdXNlZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkU3RvcHBlZDogdGhpcy51cGRhdGVSZWNvcmRTdG9wcGVkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVBZG1pblJlc3RyaWN0U2V0dGluZzogdGhpcy51cGRhdGVBZG1pblJlc3RyaWN0U2V0dGluZy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlVmlkZW9SZXF1ZXN0U3RhdGU6IHRoaXMudXBkYXRlVmlkZW9SZXF1ZXN0U3RhdGUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVZpZGVvUmVxdWVzdFRpbWU6IHRoaXMudXBkYXRlVmlkZW9SZXF1ZXN0VGltZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlVmlkZW9BY3Rpb246IHRoaXMudXBkYXRlVmlkZW9BY3Rpb24uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUxvY2FsU3RyZWFtVmlkZW86IHRoaXMudXBkYXRlTG9jYWxTdHJlYW1WaWRlby5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlVXNlckRlZmF1bHRWaWRlb0lucHV0RGV2aWNlOiB0aGlzLnVwZGF0ZVVzZXJEZWZhdWx0VmlkZW9JbnB1dERldmljZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQ3VycmVudEZhY2luZ01vZGU6IHRoaXMudXBkYXRlQ3VycmVudEZhY2luZ01vZGUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVByZXZGYWNpbmdNb2RlOiB0aGlzLnVwZGF0ZVByZXZGYWNpbmdNb2RlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVEZWZWaWRlb0lEOiB0aGlzLnVwZGF0ZURlZlZpZGVvSUQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUFsbG93ZWQ6IHRoaXMudXBkYXRlQWxsb3dlZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlRGlzcEFjdGl2ZU5hbWVzOiB0aGlzLnVwZGF0ZURpc3BBY3RpdmVOYW1lcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUF9kaXNwQWN0aXZlTmFtZXM6IHRoaXMudXBkYXRlUF9kaXNwQWN0aXZlTmFtZXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUFjdGl2ZU5hbWVzOiB0aGlzLnVwZGF0ZUFjdGl2ZU5hbWVzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVQcmV2QWN0aXZlTmFtZXM6IHRoaXMudXBkYXRlUHJldkFjdGl2ZU5hbWVzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVQX2FjdGl2ZU5hbWVzOiB0aGlzLnVwZGF0ZVBfYWN0aXZlTmFtZXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZU1lbWJlcnNSZWNlaXZlZDogdGhpcy51cGRhdGVNZW1iZXJzUmVjZWl2ZWQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZURlZmVyU2NyZWVuUmVjZWl2ZWQ6IHRoaXMudXBkYXRlRGVmZXJTY3JlZW5SZWNlaXZlZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlSG9zdEZpcnN0U3dpdGNoOiB0aGlzLnVwZGF0ZUhvc3RGaXJzdFN3aXRjaC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTWljQWN0aW9uOiB0aGlzLnVwZGF0ZU1pY0FjdGlvbi5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlU2NyZWVuQWN0aW9uOiB0aGlzLnVwZGF0ZVNjcmVlbkFjdGlvbi5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQ2hhdEFjdGlvbjogdGhpcy51cGRhdGVDaGF0QWN0aW9uLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVBdWRpb1JlcXVlc3RTdGF0ZTogdGhpcy51cGRhdGVBdWRpb1JlcXVlc3RTdGF0ZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlU2NyZWVuUmVxdWVzdFN0YXRlOiB0aGlzLnVwZGF0ZVNjcmVlblJlcXVlc3RTdGF0ZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQ2hhdFJlcXVlc3RTdGF0ZTogdGhpcy51cGRhdGVDaGF0UmVxdWVzdFN0YXRlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVBdWRpb1JlcXVlc3RUaW1lOiB0aGlzLnVwZGF0ZUF1ZGlvUmVxdWVzdFRpbWUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVNjcmVlblJlcXVlc3RUaW1lOiB0aGlzLnVwZGF0ZVNjcmVlblJlcXVlc3RUaW1lLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVDaGF0UmVxdWVzdFRpbWU6IHRoaXMudXBkYXRlQ2hhdFJlcXVlc3RUaW1lLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVPbGRTb3VuZElkczogdGhpcy51cGRhdGVPbGRTb3VuZElkcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlSG9zdExhYmVsOiB0aGlzLnVwZGF0ZUhvc3RMYWJlbC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTWFpblNjcmVlbkZpbGxlZDogdGhpcy51cGRhdGVNYWluU2NyZWVuRmlsbGVkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVMb2NhbFN0cmVhbVNjcmVlbjogdGhpcy51cGRhdGVMb2NhbFN0cmVhbVNjcmVlbi5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlU2NyZWVuQWxyZWFkeU9uOiB0aGlzLnVwZGF0ZVNjcmVlbkFscmVhZHlPbi5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQ2hhdEFscmVhZHlPbjogdGhpcy51cGRhdGVDaGF0QWxyZWFkeU9uLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWRpcmVjdFVSTDogdGhpcy51cGRhdGVSZWRpcmVjdFVSTC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlT2xkQWxsU3RyZWFtczogdGhpcy51cGRhdGVPbGRBbGxTdHJlYW1zLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVBZG1pblZpZElEOiB0aGlzLnVwZGF0ZUFkbWluVmlkSUQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVN0cmVhbU5hbWVzOiB0aGlzLnVwZGF0ZVN0cmVhbU5hbWVzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVOb25fYWxWaWRlb1N0cmVhbXM6IHRoaXMudXBkYXRlTm9uX2FsVmlkZW9TdHJlYW1zLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVTb3J0QXVkaW9Mb3VkbmVzczogdGhpcy51cGRhdGVTb3J0QXVkaW9Mb3VkbmVzcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQXVkaW9EZWNpYmVsczogdGhpcy51cGRhdGVBdWRpb0RlY2liZWxzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVNaXhlZF9hbFZpZGVvU3RyZWFtczogdGhpcy51cGRhdGVNaXhlZF9hbFZpZGVvU3RyZWFtcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTm9uX2FsVmlkZW9TdHJlYW1zX211dGVkOiB0aGlzLnVwZGF0ZU5vbl9hbFZpZGVvU3RyZWFtc19tdXRlZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUGFnaW5hdGVkU3RyZWFtczogdGhpcy51cGRhdGVQYWdpbmF0ZWRTdHJlYW1zLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVMb2NhbFN0cmVhbUF1ZGlvOiB0aGlzLnVwZGF0ZUxvY2FsU3RyZWFtQXVkaW8uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZURlZkF1ZGlvSUQ6IHRoaXMudXBkYXRlRGVmQXVkaW9JRC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlVXNlckRlZmF1bHRBdWRpb0lucHV0RGV2aWNlOiB0aGlzLnVwZGF0ZVVzZXJEZWZhdWx0QXVkaW9JbnB1dERldmljZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlVXNlckRlZmF1bHRBdWRpb091dHB1dERldmljZTogdGhpcy51cGRhdGVVc2VyRGVmYXVsdEF1ZGlvT3V0cHV0RGV2aWNlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVQcmV2QXVkaW9JbnB1dERldmljZTogdGhpcy51cGRhdGVQcmV2QXVkaW9JbnB1dERldmljZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUHJldlZpZGVvSW5wdXREZXZpY2U6IHRoaXMudXBkYXRlUHJldlZpZGVvSW5wdXREZXZpY2UuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUF1ZGlvUGF1c2VkOiB0aGlzLnVwZGF0ZUF1ZGlvUGF1c2VkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVNYWluU2NyZWVuUGVyc29uOiB0aGlzLnVwZGF0ZU1haW5TY3JlZW5QZXJzb24uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUFkbWluT25NYWluU2NyZWVuOiB0aGlzLnVwZGF0ZUFkbWluT25NYWluU2NyZWVuLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVTY3JlZW5TdGF0ZXM6IHRoaXMudXBkYXRlU2NyZWVuU3RhdGVzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVQcmV2U2NyZWVuU3RhdGVzOiB0aGlzLnVwZGF0ZVByZXZTY3JlZW5TdGF0ZXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVVwZGF0ZURhdGVTdGF0ZTogdGhpcy51cGRhdGVVcGRhdGVEYXRlU3RhdGUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUxhc3RVcGRhdGU6IHRoaXMudXBkYXRlTGFzdFVwZGF0ZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTkZvclJlYWRqdXN0UmVjb3JkOiB0aGlzLnVwZGF0ZU5Gb3JSZWFkanVzdFJlY29yZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlRml4ZWRQYWdlTGltaXQ6IHRoaXMudXBkYXRlRml4ZWRQYWdlTGltaXQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlbW92ZUFsdEdyaWQ6IHRoaXMudXBkYXRlUmVtb3ZlQWx0R3JpZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTkZvclJlYWRqdXN0OiB0aGlzLnVwZGF0ZU5Gb3JSZWFkanVzdC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTGFzdFJlb3JkZXJUaW1lOiB0aGlzLnVwZGF0ZUxhc3RSZW9yZGVyVGltZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQXVkU3RyZWFtTmFtZXM6IHRoaXMudXBkYXRlQXVkU3RyZWFtTmFtZXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUN1cnJlbnRVc2VyUGFnZTogdGhpcy51cGRhdGVDdXJyZW50VXNlclBhZ2UuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZU1haW5IZWlnaHRXaWR0aDogdGhpcy51cGRhdGVNYWluSGVpZ2h0V2lkdGguYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVByZXZNYWluSGVpZ2h0V2lkdGg6IHRoaXMudXBkYXRlUHJldk1haW5IZWlnaHRXaWR0aC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUHJldkRvUGFnaW5hdGU6IHRoaXMudXBkYXRlUHJldkRvUGFnaW5hdGUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZURvUGFnaW5hdGU6IHRoaXMudXBkYXRlRG9QYWdpbmF0ZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlU2hhcmVFbmRlZDogdGhpcy51cGRhdGVTaGFyZUVuZGVkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVMU3RyZWFtczogdGhpcy51cGRhdGVMU3RyZWFtcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQ2hhdFJlZlN0cmVhbXM6IHRoaXMudXBkYXRlQ2hhdFJlZlN0cmVhbXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUNvbnRyb2xIZWlnaHQ6IHRoaXMudXBkYXRlQ29udHJvbEhlaWdodC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlSXNXaWRlU2NyZWVuOiB0aGlzLnVwZGF0ZUlzV2lkZVNjcmVlbi5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlSXNNZWRpdW1TY3JlZW46IHRoaXMudXBkYXRlSXNNZWRpdW1TY3JlZW4uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUlzU21hbGxTY3JlZW46IHRoaXMudXBkYXRlSXNTbWFsbFNjcmVlbi5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQWRkR3JpZDogdGhpcy51cGRhdGVBZGRHcmlkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVBZGRBbHRHcmlkOiB0aGlzLnVwZGF0ZUFkZEFsdEdyaWQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUdyaWRSb3dzOiB0aGlzLnVwZGF0ZUdyaWRSb3dzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVHcmlkQ29sczogdGhpcy51cGRhdGVHcmlkQ29scy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQWx0R3JpZFJvd3M6IHRoaXMudXBkYXRlQWx0R3JpZFJvd3MuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUFsdEdyaWRDb2xzOiB0aGlzLnVwZGF0ZUFsdEdyaWRDb2xzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVOdW1iZXJQYWdlczogdGhpcy51cGRhdGVOdW1iZXJQYWdlcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQ3VycmVudFN0cmVhbXM6IHRoaXMudXBkYXRlQ3VycmVudFN0cmVhbXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVNob3dNaW5pVmlldzogdGhpcy51cGRhdGVTaG93TWluaVZpZXcuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZU5TdHJlYW06IHRoaXMudXBkYXRlTlN0cmVhbS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlRGVmZXJfcmVjZWl2ZTogdGhpcy51cGRhdGVEZWZlcl9yZWNlaXZlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVBbGxBdWRpb1N0cmVhbXM6IHRoaXMudXBkYXRlQWxsQXVkaW9TdHJlYW1zLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZW1vdGVTY3JlZW5TdHJlYW06IHRoaXMudXBkYXRlUmVtb3RlU2NyZWVuU3RyZWFtLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVTY3JlZW5Qcm9kdWNlcjogdGhpcy51cGRhdGVTY3JlZW5Qcm9kdWNlci5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlR290QWxsVmlkczogdGhpcy51cGRhdGVHb3RBbGxWaWRzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVQYWdpbmF0aW9uSGVpZ2h0V2lkdGg6IHRoaXMudXBkYXRlUGFnaW5hdGlvbkhlaWdodFdpZHRoLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVQYWdpbmF0aW9uRGlyZWN0aW9uOiB0aGlzLnVwZGF0ZVBhZ2luYXRpb25EaXJlY3Rpb24uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUdyaWRTaXplczogdGhpcy51cGRhdGVHcmlkU2l6ZXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVNjcmVlbkZvcmNlRnVsbERpc3BsYXk6IHRoaXMudXBkYXRlU2NyZWVuRm9yY2VGdWxsRGlzcGxheS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTWFpbkdyaWRTdHJlYW06IHRoaXMudXBkYXRlTWFpbkdyaWRTdHJlYW0uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZU90aGVyR3JpZFN0cmVhbXM6IHRoaXMudXBkYXRlT3RoZXJHcmlkU3RyZWFtcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQXVkaW9Pbmx5U3RyZWFtczogdGhpcy51cGRhdGVBdWRpb09ubHlTdHJlYW1zLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVWaWRlb0lucHV0czogdGhpcy51cGRhdGVWaWRlb0lucHV0cy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQXVkaW9JbnB1dHM6IHRoaXMudXBkYXRlQXVkaW9JbnB1dHMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZU1lZXRpbmdQcm9ncmVzc1RpbWU6IHRoaXMudXBkYXRlTWVldGluZ1Byb2dyZXNzVGltZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTWVldGluZ0VsYXBzZWRUaW1lOiB0aGlzLnVwZGF0ZU1lZXRpbmdFbGFwc2VkVGltZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVmX3BhcnRpY2lwYW50czogdGhpcy51cGRhdGVSZWZfcGFydGljaXBhbnRzLmJpbmQodGhpcyksXG5cbiAgICAgIHVwZGF0ZU1lc3NhZ2VzOiB0aGlzLnVwZGF0ZU1lc3NhZ2VzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVTdGFydERpcmVjdE1lc3NhZ2U6IHRoaXMudXBkYXRlU3RhcnREaXJlY3RNZXNzYWdlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVEaXJlY3RNZXNzYWdlRGV0YWlsczogdGhpcy51cGRhdGVEaXJlY3RNZXNzYWdlRGV0YWlscy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlU2hvd01lc3NhZ2VzQmFkZ2U6IHRoaXMudXBkYXRlU2hvd01lc3NhZ2VzQmFkZ2UuYmluZCh0aGlzKSxcblxuICAgICAgLy8gRXZlbnQgc2V0dGluZ3NcbiAgICAgIHVwZGF0ZUF1ZGlvU2V0dGluZzogdGhpcy51cGRhdGVBdWRpb1NldHRpbmcuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVZpZGVvU2V0dGluZzogdGhpcy51cGRhdGVWaWRlb1NldHRpbmcuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVNjcmVlbnNoYXJlU2V0dGluZzogdGhpcy51cGRhdGVTY3JlZW5zaGFyZVNldHRpbmcuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUNoYXRTZXR0aW5nOiB0aGlzLnVwZGF0ZUNoYXRTZXR0aW5nLmJpbmQodGhpcyksXG5cbiAgICAgIC8vIERpc3BsYXkgc2V0dGluZ3NcbiAgICAgIHVwZGF0ZUF1dG9XYXZlOiB0aGlzLnVwZGF0ZUF1dG9XYXZlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVGb3JjZUZ1bGxEaXNwbGF5OiB0aGlzLnVwZGF0ZUZvcmNlRnVsbERpc3BsYXkuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVByZXZGb3JjZUZ1bGxEaXNwbGF5OiB0aGlzLnVwZGF0ZVByZXZGb3JjZUZ1bGxEaXNwbGF5LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVQcmV2TWVldGluZ0Rpc3BsYXlUeXBlOiB0aGlzLnVwZGF0ZVByZXZNZWV0aW5nRGlzcGxheVR5cGUuYmluZCh0aGlzKSxcblxuICAgICAgLy8gV2FpdGluZyByb29tXG4gICAgICB1cGRhdGVXYWl0aW5nUm9vbUZpbHRlcjogdGhpcy51cGRhdGVXYWl0aW5nUm9vbUZpbHRlci5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlV2FpdGluZ1Jvb21MaXN0OiB0aGlzLnVwZGF0ZVdhaXRpbmdSb29tTGlzdC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlV2FpdGluZ1Jvb21Db3VudGVyOiB0aGlzLnVwZGF0ZVdhaXRpbmdSb29tQ291bnRlci5iaW5kKHRoaXMpLFxuXG4gICAgICAvLyBSZXF1ZXN0c1xuICAgICAgdXBkYXRlUmVxdWVzdEZpbHRlcjogdGhpcy51cGRhdGVSZXF1ZXN0RmlsdGVyLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZXF1ZXN0TGlzdDogdGhpcy51cGRhdGVSZXF1ZXN0TGlzdC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVxdWVzdENvdW50ZXI6IHRoaXMudXBkYXRlUmVxdWVzdENvdW50ZXIuYmluZCh0aGlzKSxcblxuICAgICAgLy8gVG90YWwgcmVxdWVzdHMgYW5kIHdhaXRpbmcgcm9vbVxuICAgICAgdXBkYXRlVG90YWxSZXFXYWl0OiB0aGlzLnVwZGF0ZVRvdGFsUmVxV2FpdC5iaW5kKHRoaXMpLFxuXG4gICAgICAvLyBNZW51IG1vZGFsc1xuICAgICAgdXBkYXRlSXNNZW51TW9kYWxWaXNpYmxlOiB0aGlzLnVwZGF0ZUlzTWVudU1vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlSXNSZWNvcmRpbmdNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNSZWNvcmRpbmdNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUlzU2V0dGluZ3NNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNTZXR0aW5nc01vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlSXNSZXF1ZXN0c01vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc1JlcXVlc3RzTW9kYWxWaXNpYmxlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVJc1dhaXRpbmdNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNXYWl0aW5nTW9kYWxWaXNpYmxlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVJc0NvSG9zdE1vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc0NvSG9zdE1vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlSXNNZWRpYVNldHRpbmdzTW9kYWxWaXNpYmxlOiB0aGlzLnVwZGF0ZUlzTWVkaWFTZXR0aW5nc01vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlSXNEaXNwbGF5U2V0dGluZ3NNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNEaXNwbGF5U2V0dGluZ3NNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcblxuICAgICAgLy8gT3RoZXIgbW9kYWxzXG4gICAgICB1cGRhdGVJc1BhcnRpY2lwYW50c01vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc1BhcnRpY2lwYW50c01vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlSXNNZXNzYWdlc01vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc01lc3NhZ2VzTW9kYWxWaXNpYmxlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVJc0NvbmZpcm1FeGl0TW9kYWxWaXNpYmxlOiB0aGlzLnVwZGF0ZUlzQ29uZmlybUV4aXRNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUlzQ29uZmlybUhlcmVNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNDb25maXJtSGVyZU1vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlSXNMb2FkaW5nTW9kYWxWaXNpYmxlOiB0aGlzLnVwZGF0ZUlzTG9hZGluZ01vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuXG4gICAgICAvLyBSZWNvcmRpbmcgT3B0aW9uc1xuICAgICAgdXBkYXRlUmVjb3JkaW5nTWVkaWFPcHRpb25zOiB0aGlzLnVwZGF0ZVJlY29yZGluZ01lZGlhT3B0aW9ucy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nQXVkaW9PcHRpb25zOiB0aGlzLnVwZGF0ZVJlY29yZGluZ0F1ZGlvT3B0aW9ucy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nVmlkZW9PcHRpb25zOiB0aGlzLnVwZGF0ZVJlY29yZGluZ1ZpZGVvT3B0aW9ucy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nVmlkZW9UeXBlOiB0aGlzLnVwZGF0ZVJlY29yZGluZ1ZpZGVvVHlwZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nVmlkZW9PcHRpbWl6ZWQ6IHRoaXMudXBkYXRlUmVjb3JkaW5nVmlkZW9PcHRpbWl6ZWQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ0Rpc3BsYXlUeXBlOiB0aGlzLnVwZGF0ZVJlY29yZGluZ0Rpc3BsYXlUeXBlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRpbmdBZGRITFM6IHRoaXMudXBkYXRlUmVjb3JkaW5nQWRkSExTLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRpbmdBZGRUZXh0OiB0aGlzLnVwZGF0ZVJlY29yZGluZ0FkZFRleHQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ0N1c3RvbVRleHQ6IHRoaXMudXBkYXRlUmVjb3JkaW5nQ3VzdG9tVGV4dC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nQ3VzdG9tVGV4dFBvc2l0aW9uOiB0aGlzLnVwZGF0ZVJlY29yZGluZ0N1c3RvbVRleHRQb3NpdGlvbi5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nQ3VzdG9tVGV4dENvbG9yOiB0aGlzLnVwZGF0ZVJlY29yZGluZ0N1c3RvbVRleHRDb2xvci5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nTmFtZVRhZ3M6IHRoaXMudXBkYXRlUmVjb3JkaW5nTmFtZVRhZ3MuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ0JhY2tncm91bmRDb2xvcjogdGhpcy51cGRhdGVSZWNvcmRpbmdCYWNrZ3JvdW5kQ29sb3IuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ05hbWVUYWdzQ29sb3I6IHRoaXMudXBkYXRlUmVjb3JkaW5nTmFtZVRhZ3NDb2xvci5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nT3JpZW50YXRpb25WaWRlbzogdGhpcy51cGRhdGVSZWNvcmRpbmdPcmllbnRhdGlvblZpZGVvLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVDbGVhcmVkVG9SZXN1bWU6IHRoaXMudXBkYXRlQ2xlYXJlZFRvUmVzdW1lLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVDbGVhcmVkVG9SZWNvcmQ6IHRoaXMudXBkYXRlQ2xlYXJlZFRvUmVjb3JkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRTdGF0ZTogdGhpcy51cGRhdGVSZWNvcmRTdGF0ZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlU2hvd1JlY29yZEJ1dHRvbnM6IHRoaXMudXBkYXRlU2hvd1JlY29yZEJ1dHRvbnMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ1Byb2dyZXNzVGltZTogdGhpcy51cGRhdGVSZWNvcmRpbmdQcm9ncmVzc1RpbWUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUF1ZGlvU3dpdGNoaW5nOiB0aGlzLnVwZGF0ZUF1ZGlvU3dpdGNoaW5nLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVWaWRlb1N3aXRjaGluZzogdGhpcy51cGRhdGVWaWRlb1N3aXRjaGluZy5iaW5kKHRoaXMpLFxuXG4gICAgICAvLyBNZWRpYSBzdGF0ZXNcbiAgICAgIHVwZGF0ZVZpZGVvQWxyZWFkeU9uOiB0aGlzLnVwZGF0ZVZpZGVvQWxyZWFkeU9uLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVBdWRpb0FscmVhZHlPbjogdGhpcy51cGRhdGVBdWRpb0FscmVhZHlPbi5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQ29tcG9uZW50U2l6ZXM6IHRoaXMudXBkYXRlQ29tcG9uZW50U2l6ZXMuYmluZCh0aGlzKSxcblxuICAgICAgLy8gUGVybWlzc2lvbnNcbiAgICAgIHVwZGF0ZUhhc0NhbWVyYVBlcm1pc3Npb246IHRoaXMudXBkYXRlSGFzQ2FtZXJhUGVybWlzc2lvbi5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlSGFzQXVkaW9QZXJtaXNzaW9uOiB0aGlzLnVwZGF0ZUhhc0F1ZGlvUGVybWlzc2lvbi5iaW5kKHRoaXMpLFxuXG4gICAgICAvLyBUcmFuc3BvcnRzXG4gICAgICB1cGRhdGVUcmFuc3BvcnRDcmVhdGVkOiB0aGlzLnVwZGF0ZVRyYW5zcG9ydENyZWF0ZWQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVRyYW5zcG9ydENyZWF0ZWRWaWRlbzogdGhpcy51cGRhdGVUcmFuc3BvcnRDcmVhdGVkVmlkZW8uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVRyYW5zcG9ydENyZWF0ZWRBdWRpbzogdGhpcy51cGRhdGVUcmFuc3BvcnRDcmVhdGVkQXVkaW8uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVRyYW5zcG9ydENyZWF0ZWRTY3JlZW46IHRoaXMudXBkYXRlVHJhbnNwb3J0Q3JlYXRlZFNjcmVlbi5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUHJvZHVjZXJUcmFuc3BvcnQ6IHRoaXMudXBkYXRlUHJvZHVjZXJUcmFuc3BvcnQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVZpZGVvUHJvZHVjZXI6IHRoaXMudXBkYXRlVmlkZW9Qcm9kdWNlci5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUGFyYW1zOiB0aGlzLnVwZGF0ZVBhcmFtcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlVmlkZW9QYXJhbXM6IHRoaXMudXBkYXRlVmlkZW9QYXJhbXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUF1ZGlvUGFyYW1zOiB0aGlzLnVwZGF0ZUF1ZGlvUGFyYW1zLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVBdWRpb1Byb2R1Y2VyOiB0aGlzLnVwZGF0ZUF1ZGlvUHJvZHVjZXIuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUNvbnN1bWVyVHJhbnNwb3J0czogdGhpcy51cGRhdGVDb25zdW1lclRyYW5zcG9ydHMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUNvbnN1bWluZ1RyYW5zcG9ydHM6IHRoaXMudXBkYXRlQ29uc3VtaW5nVHJhbnNwb3J0cy5iaW5kKHRoaXMpLFxuXG4gICAgICAvLyBQb2xsc1xuICAgICAgdXBkYXRlUG9sbHM6IHRoaXMudXBkYXRlUG9sbHMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVBvbGw6IHRoaXMudXBkYXRlUG9sbC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlSXNQb2xsTW9kYWxWaXNpYmxlOiB0aGlzLnVwZGF0ZUlzUG9sbE1vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuXG4gICAgICAvLyBCYWNrZ3JvdW5kXG4gICAgICB1cGRhdGVDdXN0b21JbWFnZTogdGhpcy51cGRhdGVDdXN0b21JbWFnZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlU2VsZWN0ZWRJbWFnZTogdGhpcy51cGRhdGVTZWxlY3RlZEltYWdlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVTZWdtZW50VmlkZW86IHRoaXMudXBkYXRlU2VnbWVudFZpZGVvLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVTZWxmaWVTZWdtZW50YXRpb246IHRoaXMudXBkYXRlU2VsZmllU2VnbWVudGF0aW9uLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVQYXVzZVNlZ21lbnRhdGlvbjogdGhpcy51cGRhdGVQYXVzZVNlZ21lbnRhdGlvbi5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUHJvY2Vzc2VkU3RyZWFtOiB0aGlzLnVwZGF0ZVByb2Nlc3NlZFN0cmVhbS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlS2VlcEJhY2tncm91bmQ6IHRoaXMudXBkYXRlS2VlcEJhY2tncm91bmQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUJhY2tncm91bmRIYXNDaGFuZ2VkOiB0aGlzLnVwZGF0ZUJhY2tncm91bmRIYXNDaGFuZ2VkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVWaXJ0dWFsU3RyZWFtOiB0aGlzLnVwZGF0ZVZpcnR1YWxTdHJlYW0uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZU1haW5DYW52YXM6IHRoaXMudXBkYXRlTWFpbkNhbnZhcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUHJldktlZXBCYWNrZ3JvdW5kOiB0aGlzLnVwZGF0ZVByZXZLZWVwQmFja2dyb3VuZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQXBwbGllZEJhY2tncm91bmQ6IHRoaXMudXBkYXRlQXBwbGllZEJhY2tncm91bmQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUlzQmFja2dyb3VuZE1vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc0JhY2tncm91bmRNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUF1dG9DbGlja0JhY2tncm91bmQ6IHRoaXMudXBkYXRlQXV0b0NsaWNrQmFja2dyb3VuZC5iaW5kKHRoaXMpLFxuXG4gICAgICAvLyBCcmVha291dCByb29tc1xuICAgICAgdXBkYXRlQnJlYWtvdXRSb29tczogdGhpcy51cGRhdGVCcmVha291dFJvb21zLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVDdXJyZW50Um9vbUluZGV4OiB0aGlzLnVwZGF0ZUN1cnJlbnRSb29tSW5kZXguYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUNhblN0YXJ0QnJlYWtvdXQ6IHRoaXMudXBkYXRlQ2FuU3RhcnRCcmVha291dC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQnJlYWtPdXRSb29tU3RhcnRlZDogdGhpcy51cGRhdGVCcmVha091dFJvb21TdGFydGVkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVCcmVha091dFJvb21FbmRlZDogdGhpcy51cGRhdGVCcmVha091dFJvb21FbmRlZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlSG9zdE5ld1Jvb206IHRoaXMudXBkYXRlSG9zdE5ld1Jvb20uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUxpbWl0ZWRCcmVha1Jvb206IHRoaXMudXBkYXRlTGltaXRlZEJyZWFrUm9vbS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTWFpblJvb21zTGVuZ3RoOiB0aGlzLnVwZGF0ZU1haW5Sb29tc0xlbmd0aC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTWVtYmVyUm9vbTogdGhpcy51cGRhdGVNZW1iZXJSb29tLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVJc0JyZWFrb3V0Um9vbXNNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNCcmVha291dFJvb21zTW9kYWxWaXNpYmxlLmJpbmQodGhpcyksXG5cbiAgICAgIC8vIFdoaXRlYm9hcmRcbiAgICAgIHVwZGF0ZVdoaXRlYm9hcmRVc2VyczogdGhpcy51cGRhdGVXaGl0ZWJvYXJkVXNlcnMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUN1cnJlbnRXaGl0ZWJvYXJkSW5kZXg6IHRoaXMudXBkYXRlQ3VycmVudFdoaXRlYm9hcmRJbmRleC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQ2FuU3RhcnRXaGl0ZWJvYXJkOiB0aGlzLnVwZGF0ZUNhblN0YXJ0V2hpdGVib2FyZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlV2hpdGVib2FyZFN0YXJ0ZWQ6IHRoaXMudXBkYXRlV2hpdGVib2FyZFN0YXJ0ZWQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVdoaXRlYm9hcmRFbmRlZDogdGhpcy51cGRhdGVXaGl0ZWJvYXJkRW5kZWQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVdoaXRlYm9hcmRMaW1pdDogdGhpcy51cGRhdGVXaGl0ZWJvYXJkTGltaXQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUlzV2hpdGVib2FyZE1vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc1doaXRlYm9hcmRNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUlzQ29uZmlndXJlV2hpdGVib2FyZE1vZGFsVmlzaWJsZTpcbiAgICAgICAgdGhpcy51cGRhdGVJc0NvbmZpZ3VyZVdoaXRlYm9hcmRNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVNoYXBlczogdGhpcy51cGRhdGVTaGFwZXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVVzZUltYWdlQmFja2dyb3VuZDogdGhpcy51cGRhdGVVc2VJbWFnZUJhY2tncm91bmQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlZG9TdGFjazogdGhpcy51cGRhdGVSZWRvU3RhY2suYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVVuZG9TdGFjazogdGhpcy51cGRhdGVVbmRvU3RhY2suYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUNhbnZhc1N0cmVhbTogdGhpcy51cGRhdGVDYW52YXNTdHJlYW0uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUNhbnZhc1doaXRlYm9hcmQ6IHRoaXMudXBkYXRlQ2FudmFzV2hpdGVib2FyZC5iaW5kKHRoaXMpLFxuXG4gICAgICAvLyBTY3JlZW5ib2FyZFxuICAgICAgdXBkYXRlQ2FudmFzU2NyZWVuYm9hcmQ6IHRoaXMudXBkYXRlQ2FudmFzU2NyZWVuYm9hcmQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVByb2Nlc3NlZFNjcmVlblN0cmVhbTogdGhpcy51cGRhdGVQcm9jZXNzZWRTY3JlZW5TdHJlYW0uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUFubm90YXRlU2NyZWVuU3RyZWFtOiB0aGlzLnVwZGF0ZUFubm90YXRlU2NyZWVuU3RyZWFtLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVNYWluU2NyZWVuQ2FudmFzOiB0aGlzLnVwZGF0ZU1haW5TY3JlZW5DYW52YXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUlzU2NyZWVuYm9hcmRNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNTY3JlZW5ib2FyZE1vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuXG4gICAgICAvLyBPdGhlciBmdW5jdGlvbnNcbiAgICAgIGNoZWNrT3JpZW50YXRpb246IHRoaXMuY2hlY2tPcmllbnRhdGlvbi5iaW5kKHRoaXMpLFxuXG4gICAgICB1cGRhdGVEZXZpY2U6IHRoaXMudXBkYXRlRGV2aWNlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVTb2NrZXQ6IHRoaXMudXBkYXRlU29ja2V0LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVWYWxpZGF0ZWQ6IHRoaXMudXBkYXRlVmFsaWRhdGVkLmJpbmQodGhpcyksXG5cbiAgICAgIHNob3dBbGVydDogdGhpcy5zaG93QWxlcnQuYmluZCh0aGlzKSxcbiAgICAgIGdldFVwZGF0ZWRBbGxQYXJhbXM6ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAuLi50aGlzLmdldEFsbFBhcmFtcygpLFxuICAgICAgICAgIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSxcbiAgICAgICAgfTtcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuXG4gIG1lZGlhU0ZVUGFyYW1ldGVycyA9IHtcbiAgICAuLi50aGlzLmdldEFsbFBhcmFtcygpLFxuICAgIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSxcbiAgfTtcblxuICBnZXRVcGRhdGVkQWxsUGFyYW1zID0gKCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAuLi50aGlzLmdldEFsbFBhcmFtcygpLFxuICAgICAgLi4udGhpcy5tZWRpYVNGVUZ1bmN0aW9ucygpLFxuICAgIH07XG4gIH07XG5cbiAgdXBkYXRlQnV0dG9uU3RhdGUoYnV0dG9uVHlwZTogc3RyaW5nLCB2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuY29udHJvbEJ1dHRvbnMgPSB0aGlzLmNvbnRyb2xCdXR0b25zLm1hcCgoYnV0dG9uKSA9PiB7XG4gICAgICBpZiAoYnV0dG9uVHlwZSA9PT0gJ21pY0FjdGl2ZScgJiYgYnV0dG9uLmljb24gPT09IHRoaXMuZmFNaWNyb3Bob25lU2xhc2gpIHtcbiAgICAgICAgcmV0dXJuIHsgLi4uYnV0dG9uLCBhY3RpdmU6IHZhbHVlIH07XG4gICAgICB9XG4gICAgICBpZiAoYnV0dG9uVHlwZSA9PT0gJ3ZpZGVvQWN0aXZlJyAmJiBidXR0b24uaWNvbiA9PT0gdGhpcy5mYVZpZGVvU2xhc2gpIHtcbiAgICAgICAgcmV0dXJuIHsgLi4uYnV0dG9uLCBhY3RpdmU6IHZhbHVlIH07XG4gICAgICB9XG4gICAgICBpZiAoYnV0dG9uVHlwZSA9PT0gJ3NjcmVlblNoYXJlQWN0aXZlJyAmJiBidXR0b24uaWNvbiA9PT0gdGhpcy5mYURlc2t0b3ApIHtcbiAgICAgICAgaWYgKGJ1dHRvbi5hbHRlcm5hdGVJY29uQ29tcG9uZW50KSB7XG4gICAgICAgICAgY29uc3QgdXBkYXRlZEluamVjdG9yID0gdGhpcy5jcmVhdGVJbmplY3Rvcih7XG4gICAgICAgICAgICBkaXNhYmxlZDogIXZhbHVlLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi5idXR0b24sXG4gICAgICAgICAgICBhY3RpdmU6IHRydWUsXG4gICAgICAgICAgICBhbHRlcm5hdGVJY29uQ29tcG9uZW50OiB7IC4uLnRoaXMuc2NyZWVuU2hhcmVXaWRnZXQsIGluamVjdG9yOiB1cGRhdGVkSW5qZWN0b3IgfSxcbiAgICAgICAgICB9OyAvL2Fsd2F5cyBkZWZhdWx0IHRvIHRydWUgZm9yIGFjdGl2ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB7IC4uLmJ1dHRvbiwgYWN0aXZlOiB0cnVlIH07IC8vYWx3YXlzIGRlZmF1bHQgdG8gdHJ1ZSBmb3IgYWN0aXZlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChidXR0b25UeXBlID09PSAnZW5kQ2FsbEFjdGl2ZScgJiYgYnV0dG9uLmljb24gPT09IHRoaXMuZmFQaG9uZSkge1xuICAgICAgICByZXR1cm4geyAuLi5idXR0b24sIGFjdGl2ZTogdmFsdWUgfTtcbiAgICAgIH1cbiAgICAgIGlmIChidXR0b25UeXBlID09PSAncGFydGljaXBhbnRzQWN0aXZlJyAmJiBidXR0b24uaWNvbiA9PT0gdGhpcy5mYVVzZXJzKSB7XG4gICAgICAgIHJldHVybiB7IC4uLmJ1dHRvbiwgYWN0aXZlOiB2YWx1ZSB9O1xuICAgICAgfVxuICAgICAgaWYgKFxuICAgICAgICBidXR0b25UeXBlID09PSAnc2hvd01lc3NhZ2VzQmFkZ2UnICYmXG4gICAgICAgIGJ1dHRvbi5jdXN0b21OYW1lICYmXG4gICAgICAgIGJ1dHRvbi5jdXN0b21OYW1lID09PSAnTWVzc2FnZXMnXG4gICAgICApIHtcbiAgICAgICAgY29uc3QgdXBkYXRlZEluamVjdG9yID0gdGhpcy5jcmVhdGVJbmplY3Rvcih7XG4gICAgICAgICAgaWNvbjogdGhpcy5mYUNvbW1lbnRzLFxuICAgICAgICAgIGJhZGdlVmFsdWU6IHZhbHVlID8gJyonIDogJycsXG4gICAgICAgICAgaWNvbkNvbG9yOiAnYmxhY2snLFxuICAgICAgICAgIHNob3dCYWRnZTogdmFsdWUsXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4geyAuLi5idXR0b24sIGN1c3RvbUNvbXBvbmVudDogeyAuLi50aGlzLm1lc3NhZ2VXaWRnZXQsIGluamVjdG9yOiB1cGRhdGVkSW5qZWN0b3IgfSB9O1xuICAgICAgfVxuICAgICAgaWYgKGJ1dHRvblR5cGUgPT09ICdzaG93TWVudUJhZGdlJyAmJiBidXR0b24uY3VzdG9tTmFtZSAmJiBidXR0b24uY3VzdG9tTmFtZSA9PT0gJ01lbnUnKSB7XG4gICAgICAgIGNvbnN0IHVwZGF0ZWRJbmplY3RvciA9IHRoaXMuY3JlYXRlSW5qZWN0b3Ioe1xuICAgICAgICAgIGljb246IHRoaXMuZmFCYXJzLFxuICAgICAgICAgIGJhZGdlVmFsdWU6IHRoaXMudG90YWxSZXFXYWl0LnZhbHVlLFxuICAgICAgICAgIGljb25Db2xvcjogJ2JsYWNrJyxcbiAgICAgICAgICBzaG93QmFkZ2U6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4geyAuLi5idXR0b24sIGN1c3RvbUNvbXBvbmVudDogeyAuLi50aGlzLm1lbnVXaWRnZXQsIGluamVjdG9yOiB1cGRhdGVkSW5qZWN0b3IgfSB9O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gYnV0dG9uO1xuICAgIH0pO1xuXG4gICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgUHJlam9pblBhZ2VDb21wb25lbnQ6IGFueSA9IHtcbiAgICBjb21wb25lbnQ6IHRoaXMuUHJlam9pblBhZ2UsXG4gICAgaW5qZWN0b3I6IG51bGwsXG4gIH07XG5cbiAgdXBkYXRlUHJlam9pblBhZ2VDb21wb25lbnQgPSAoKSA9PiB7XG4gICAgY29uc3QgUHJlam9pbkNvbXAgPSB7XG4gICAgICBjb21wb25lbnQ6IHRoaXMuUHJlam9pblBhZ2UsXG4gICAgICBpbmplY3RvcjogdGhpcy5jcmVhdGVJbmplY3Rvcih7XG4gICAgICAgIHBhcmFtZXRlcnM6IHtcbiAgICAgICAgICBzaG93QWxlcnQ6XG4gICAgICAgICAgICB0aGlzLnNob3dBbGVydCB8fFxuICAgICAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgIHVwZGF0ZUlzTG9hZGluZ01vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc0xvYWRpbmdNb2RhbFZpc2libGUsXG4gICAgICAgICAgY29ubmVjdFNvY2tldDogdGhpcy5zb2NrZXRNYW5hZ2VyLmNvbm5lY3RTb2NrZXQsXG4gICAgICAgICAgdXBkYXRlU29ja2V0OiB0aGlzLnVwZGF0ZVNvY2tldCxcbiAgICAgICAgICB1cGRhdGVWYWxpZGF0ZWQ6IHRoaXMudXBkYXRlVmFsaWRhdGVkLFxuICAgICAgICAgIHVwZGF0ZUFwaVVzZXJOYW1lOiB0aGlzLnVwZGF0ZUFwaVVzZXJOYW1lLFxuICAgICAgICAgIHVwZGF0ZUFwaVRva2VuOiB0aGlzLnVwZGF0ZUFwaVRva2VuLFxuICAgICAgICAgIHVwZGF0ZUxpbms6IHRoaXMudXBkYXRlTGluayxcbiAgICAgICAgICB1cGRhdGVSb29tTmFtZTogdGhpcy51cGRhdGVSb29tTmFtZSxcbiAgICAgICAgICB1cGRhdGVNZW1iZXI6IHRoaXMudXBkYXRlTWVtYmVyLFxuICAgICAgICB9LFxuICAgICAgICBjcmVkZW50aWFsczogdGhpcy5jcmVkZW50aWFscyxcbiAgICAgIH0pLFxuICAgIH07XG5cbiAgICB0aGlzLlByZWpvaW5QYWdlQ29tcG9uZW50ID0geyAuLi5QcmVqb2luQ29tcCB9O1xuXG4gICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICB9O1xuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICh0aGlzLlByZWpvaW5QYWdlKSB7XG4gICAgICB0aGlzLnVwZGF0ZVByZWpvaW5QYWdlQ29tcG9uZW50KCk7XG4gICAgfVxuXG4gICAgdGhpcy5zZXR1cFJlc2l6ZUxpc3RlbmVyKCk7XG4gICAgaWYgKHRoaXMudmFsaWRhdGVkKSB7XG4gICAgICB0aGlzLmNvbm5lY3RBbmRBZGRTb2NrZXRNZXRob2RzKCk7XG4gICAgfVxuXG4gICAgdGhpcy5tYWluSGVpZ2h0V2lkdGhTdWJzY3JpcHRpb24gPSB0aGlzLm1haW5IZWlnaHRXaWR0aC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy51cGRhdGVNYWluVmlkZW9TaXplKCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnJlY29yZGluZ1N1YnNjcmlwdGlvbiA9IGNvbWJpbmVMYXRlc3QoW1xuICAgICAgdGhpcy5yZWNvcmRQYXVzZWQsXG4gICAgICB0aGlzLnJlY29yZFN0YXJ0ZWQsXG4gICAgICB0aGlzLnJlY29yZFN0b3BwZWQsXG4gICAgICB0aGlzLnJlY29yZFJlc3VtZWQsXG4gICAgICB0aGlzLnJlY29yZGluZ1Byb2dyZXNzVGltZSxcbiAgICAgIHRoaXMuc2hvd1JlY29yZEJ1dHRvbnMsXG4gICAgICB0aGlzLmlzbGV2ZWwsXG4gICAgXSkuc3Vic2NyaWJlKFxuICAgICAgKFtcbiAgICAgICAgcmVjb3JkUGF1c2VkLFxuICAgICAgICByZWNvcmRTdGFydGVkLFxuICAgICAgICByZWNvcmRTdG9wcGVkLFxuICAgICAgICByZWNvcmRSZXN1bWVkLFxuICAgICAgICByZWNvcmRpbmdQcm9ncmVzc1RpbWUsXG4gICAgICAgIHNob3dSZWNvcmRCdXR0b25zLFxuICAgICAgICBpc2xldmVsLFxuICAgICAgXSkgPT4ge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgcmVjb3JkUGF1c2VkIHx8XG4gICAgICAgICAgcmVjb3JkU3RhcnRlZCB8fFxuICAgICAgICAgIHJlY29yZFN0b3BwZWQgfHxcbiAgICAgICAgICByZWNvcmRSZXN1bWVkIHx8XG4gICAgICAgICAgcmVjb3JkaW5nUHJvZ3Jlc3NUaW1lIHx8XG4gICAgICAgICAgc2hvd1JlY29yZEJ1dHRvbnMgfHxcbiAgICAgICAgICBpc2xldmVsXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMudXBkYXRlUmVjb3JkQnV0dG9ucygpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICk7XG5cbiAgICB0aGlzLlNjcmVlbmJvYXJkU3Vic2NyaXB0aW9uID0gY29tYmluZUxhdGVzdChbXG4gICAgICB0aGlzLnNoYXJlZCxcbiAgICAgIHRoaXMuY29tcG9uZW50U2l6ZXMsXG4gICAgICB0aGlzLmFubm90YXRlU2NyZWVuU3RyZWFtLFxuICAgIF0pLnN1YnNjcmliZSgoW3NoYXJlZCwgY29tcG9uZW50U2l6ZXNdKSA9PiB7XG4gICAgICB0aGlzLlNjcmVlbmJvYXJkV2lkZ2V0ID0ge1xuICAgICAgICBjb21wb25lbnQ6IFNjcmVlbmJvYXJkLFxuICAgICAgICBpbnB1dHM6IHtcbiAgICAgICAgICBjdXN0b21XaWR0aDogY29tcG9uZW50U2l6ZXMubWFpbldpZHRoLFxuICAgICAgICAgIGN1c3RvbUhlaWdodDogY29tcG9uZW50U2l6ZXMubWFpbkhlaWdodCxcbiAgICAgICAgICBwYXJhbWV0ZXJzOiB0aGlzLm1lZGlhU0ZVUGFyYW1ldGVycyxcbiAgICAgICAgICBzaG93QXNwZWN0OiBzaGFyZWQsXG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgIH0pO1xuICAgIHRoaXMudmFsaWRhdGVkU3Vic2NyaXB0aW9uID0gdGhpcy52YWxpZGF0ZWQuc3Vic2NyaWJlKCh2YWxpZGF0ZWQpID0+IHtcbiAgICAgIGlmICh2YWxpZGF0ZWQpIHtcbiAgICAgICAgdGhpcy5oYW5kbGVWYWxpZGF0ZWQoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLmlzbGV2ZWxTdWJzY3JpcHRpb24gPSB0aGlzLmlzbGV2ZWwuc3Vic2NyaWJlKChpc2xldmVsKSA9PiB7XG4gICAgICBpZiAoaXNsZXZlbCkge1xuICAgICAgICB0aGlzLnVwZGF0ZUN1c3RvbU1lbnVCdXR0b25zKCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5jb0hvc3RTdWJzY3JpcHRpb24gPSBjb21iaW5lTGF0ZXN0KFt0aGlzLmNvSG9zdCwgdGhpcy5jb0hvc3RSZXNwb25zaWJpbGl0eV0pLnN1YnNjcmliZShcbiAgICAgIChbY29Ib3N0LCBjb0hvc3RSZXNwb25zaWJpbGl0eV0pID0+IHtcbiAgICAgICAgaWYgKGNvSG9zdCB8fCBjb0hvc3RSZXNwb25zaWJpbGl0eSkge1xuICAgICAgICAgIHRoaXMudXBkYXRlQ3VzdG9tTWVudUJ1dHRvbnMoKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICApO1xuXG4gICAgLy8gU3Vic2NyaWJlIHRvIGNoYW5nZXMgaW4gQmVoYXZpb3JTdWJqZWN0IGFuZCB1cGRhdGUgdGhlIGJ1dHRvbnMgYWNjb3JkaW5nbHlcbiAgICB0aGlzLmJ1dHRvblN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMubWljQWN0aXZlLnN1YnNjcmliZSgodmFsdWUpID0+IHtcbiAgICAgICAgdGhpcy51cGRhdGVCdXR0b25TdGF0ZSgnbWljQWN0aXZlJywgdmFsdWUpO1xuICAgICAgfSksXG4gICAgKTtcblxuICAgIHRoaXMuYnV0dG9uU3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy52aWRlb0FjdGl2ZS5zdWJzY3JpYmUoKHZhbHVlKSA9PiB7XG4gICAgICAgIHRoaXMudXBkYXRlQnV0dG9uU3RhdGUoJ3ZpZGVvQWN0aXZlJywgdmFsdWUpO1xuICAgICAgfSksXG4gICAgKTtcblxuICAgIHRoaXMuYnV0dG9uU3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5zY3JlZW5TaGFyZUFjdGl2ZS5zdWJzY3JpYmUoKHZhbHVlKSA9PiB7XG4gICAgICAgIHRoaXMudXBkYXRlQnV0dG9uU3RhdGUoJ3NjcmVlblNoYXJlQWN0aXZlJywgdmFsdWUpO1xuICAgICAgfSksXG4gICAgKTtcblxuICAgIHRoaXMuYnV0dG9uU3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5zaG93TWVzc2FnZXNCYWRnZS5zdWJzY3JpYmUoKHZhbHVlKSA9PiB7XG4gICAgICAgIHRoaXMudXBkYXRlQnV0dG9uU3RhdGUoJ3Nob3dNZXNzYWdlc0JhZGdlJywgdmFsdWUpO1xuICAgICAgfSksXG4gICAgKTtcblxuICAgIHRoaXMuYnV0dG9uU3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy50b3RhbFJlcVdhaXQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy51cGRhdGVCdXR0b25TdGF0ZSgnc2hvd01lbnVCYWRnZScsIHRydWUpO1xuICAgICAgfSksXG4gICAgKTtcblxuICAgIHRoaXMuYnV0dG9uU3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5wYXJ0aWNpcGFudHNDb3VudGVyLnN1YnNjcmliZSgodmFsdWUpID0+IHtcbiAgICAgICAgdGhpcy51cGRhdGVNZW51UGFydGljaXBhbnRzV2lkZ2V0KHZhbHVlKTtcbiAgICAgIH0pLFxuICAgICk7XG5cbiAgICB0aGlzLm1lZGlhU0ZVUGFyYW1ldGVycyA9IHtcbiAgICAgIC4uLnRoaXMuZ2V0QWxsUGFyYW1zKCksXG4gICAgICAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCksXG4gICAgfTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmhhbmRsZVJlc2l6ZSk7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ29yaWVudGF0aW9uY2hhbmdlJywgdGhpcy5oYW5kbGVSZXNpemUpO1xuICAgIGlmICh0aGlzLm1haW5IZWlnaHRXaWR0aFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5tYWluSGVpZ2h0V2lkdGhTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMudmFsaWRhdGVkU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnZhbGlkYXRlZFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5pc2xldmVsU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLmlzbGV2ZWxTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuY29Ib3N0U3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLmNvSG9zdFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5TY3JlZW5ib2FyZFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5TY3JlZW5ib2FyZFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5yZWNvcmRpbmdTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMucmVjb3JkaW5nU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlTWFpblZpZGVvU2l6ZSA9IGFzeW5jICgpID0+IHtcbiAgICBpZiAoIXRoaXMubG9ja19zY3JlZW4udmFsdWUgJiYgIXRoaXMuc2hhcmVkLnZhbHVlKSB7XG4gICAgICB0aGlzLnByZXBvcHVsYXRlVXNlck1lZGlhLnByZXBvcHVsYXRlVXNlck1lZGlhKHtcbiAgICAgICAgbmFtZTogdGhpcy5ob3N0TGFiZWwudmFsdWUsXG4gICAgICAgIHBhcmFtZXRlcnM6IHsgLi4udGhpcy5nZXRBbGxQYXJhbXMoKSwgLi4udGhpcy5tZWRpYVNGVUZ1bmN0aW9ucygpIH0sXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCF0aGlzLmZpcnN0X3JvdW5kLnZhbHVlKSB7XG4gICAgICAgIHRoaXMucHJlcG9wdWxhdGVVc2VyTWVkaWEucHJlcG9wdWxhdGVVc2VyTWVkaWEoe1xuICAgICAgICAgIG5hbWU6IHRoaXMuaG9zdExhYmVsLnZhbHVlLFxuICAgICAgICAgIHBhcmFtZXRlcnM6IHsgLi4udGhpcy5nZXRBbGxQYXJhbXMoKSwgLi4udGhpcy5tZWRpYVNGVUZ1bmN0aW9ucygpIH0sXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBhc3luYyBjb25uZWN0QW5kQWRkU29ja2V0TWV0aG9kcygpIHtcbiAgICB0aGlzLm1lZGlhU0ZVUGFyYW1ldGVycyA9IHtcbiAgICAgIC4uLnRoaXMuZ2V0QWxsUGFyYW1zKCksXG4gICAgICAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCksXG4gICAgfTtcbiAgICBjb25zdCBzb2NrZXRfID0gYXdhaXQgdGhpcy5jb25uZWN0X1NvY2tldCh0aGlzLmFwaVVzZXJOYW1lLnZhbHVlLCAnJywgdGhpcy5hcGlUb2tlbi52YWx1ZSk7XG4gICAgaWYgKHNvY2tldF8pIHtcbiAgICAgIHRoaXMudXBkYXRlU29ja2V0KHNvY2tldF8pO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGhhbmRsZVZhbGlkYXRlZCgpIHtcbiAgICB0aGlzLnVwZGF0ZUFsbFZpZGVvU3RyZWFtcyhbXG4gICAgICB7IHByb2R1Y2VySWQ6ICd5b3V5b3UnLCBzdHJlYW06IHVuZGVmaW5lZCwgaWQ6ICd5b3V5b3UnLCBuYW1lOiAneW91eW91JyB9LFxuICAgIF0pO1xuXG4gICAgdGhpcy51cGRhdGVTdHJlYW1OYW1lcyhbeyBpZDogJ3lvdXlvdScsIG5hbWU6ICd5b3V5b3UnLCBwcm9kdWNlcklkOiAnJyB9XSk7XG5cbiAgICBpZiAodGhpcy52YWxpZGF0ZWQudmFsdWUpIHtcbiAgICAgIHRoaXMudXBkYXRlSXNMb2FkaW5nTW9kYWxWaXNpYmxlKHRydWUpO1xuXG4gICAgICB0cnkge1xuICAgICAgICBpZiAoIXRoaXMubG9jYWxVSU1vZGUudmFsdWUpIHtcbiAgICAgICAgICBhd2FpdCB0aGlzLmNvbm5lY3RBbmRBZGRTb2NrZXRNZXRob2RzKCk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdlcnJvciBjb25uZWN0QW5kYUFkZFNvY2tldE1ldGhvZHMnLCBlcnJvcik7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc3RhcnRNZWV0aW5nUHJvZ3Jlc3NUaW1lci5zdGFydE1lZXRpbmdQcm9ncmVzc1RpbWVyKHtcbiAgICAgICAgc3RhcnRUaW1lOiBEYXRlLm5vdygpIC8gMTAwMCxcbiAgICAgICAgcGFyYW1ldGVyczogeyAuLi50aGlzLmdldEFsbFBhcmFtcygpLCAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCkgfSxcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnVwZGF0ZUlzTG9hZGluZ01vZGFsVmlzaWJsZShmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScpXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpvcmllbnRhdGlvbmNoYW5nZScpXG4gIGFzeW5jIGhhbmRsZVJlc2l6ZSgpIHtcbiAgICBsZXQgZnJhY3Rpb24gPSAwO1xuXG4gICAgaWYgKFxuICAgICAgd2luZG93LmlubmVySGVpZ2h0IDwgd2luZG93LmlubmVyV2lkdGggJiZcbiAgICAgICh0aGlzLmV2ZW50VHlwZS52YWx1ZSA9PSAnd2ViaW5hcicgfHwgdGhpcy5ldmVudFR5cGUudmFsdWUgPT0gJ2NvbmZlcmVuY2UnKVxuICAgICkge1xuICAgICAgY29uc3QgY3VycmVudEhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgIGZyYWN0aW9uID0gTnVtYmVyKCg0MCAvIGN1cnJlbnRIZWlnaHQpLnRvRml4ZWQoMykpO1xuICAgICAgaWYgKGZyYWN0aW9uICE9IHRoaXMuY29udHJvbEhlaWdodC52YWx1ZSkge1xuICAgICAgICB0aGlzLnVwZGF0ZUNvbnRyb2xIZWlnaHQoTnVtYmVyKGZyYWN0aW9uKSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFNldCBkZWZhdWx0IGNvbnRyb2wgYnV0dG9uIGhlaWdodCBmb3IgcG9ydHJhaXQgbW9kZSBvciBvdGhlciBldmVudCB0eXBlc1xuICAgICAgY29uc3QgY3VycmVudEhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgIGZyYWN0aW9uID0gTnVtYmVyKCg0MCAvIGN1cnJlbnRIZWlnaHQpLnRvRml4ZWQoMykpO1xuICAgICAgZnJhY3Rpb24gPSBOdW1iZXIoZnJhY3Rpb24pO1xuICAgICAgaWYgKGZyYWN0aW9uICE9IHRoaXMuY29udHJvbEhlaWdodC52YWx1ZSkge1xuICAgICAgICB0aGlzLnVwZGF0ZUNvbnRyb2xIZWlnaHQoTnVtYmVyKGZyYWN0aW9uKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgZGltZW5zaW9ucyA9IHRoaXMuY29tcHV0ZURpbWVuc2lvbnNNZXRob2Qoe1xuICAgICAgY29udGFpbmVyV2lkdGhGcmFjdGlvbjogMSxcbiAgICAgIGNvbnRhaW5lckhlaWdodEZyYWN0aW9uOiAxLFxuICAgICAgbWFpblNpemU6IHRoaXMubWFpbkhlaWdodFdpZHRoLnZhbHVlLFxuICAgICAgZG9TdGFjazogdHJ1ZSxcbiAgICAgIGRlZmF1bHRGcmFjdGlvbjpcbiAgICAgICAgdGhpcy5ldmVudFR5cGUudmFsdWUgPT0gJ3dlYmluYXInIHx8IHRoaXMuZXZlbnRUeXBlLnZhbHVlID09ICdjb25mZXJlbmNlJ1xuICAgICAgICAgID8gMSAtIGZyYWN0aW9uXG4gICAgICAgICAgOiAxLFxuICAgIH0pO1xuXG4gICAgdGhpcy51cGRhdGVDb21wb25lbnRTaXplcyhkaW1lbnNpb25zKTtcblxuICAgIGNvbnN0IG9yaWVudGF0aW9uID0gdGhpcy5jaGVja09yaWVudGF0aW9uKCk7XG4gICAgaWYgKG9yaWVudGF0aW9uID09ICdwb3J0cmFpdCcpIHtcbiAgICAgIGlmICghdGhpcy5pc1dpZGVTY3JlZW4udmFsdWUpIHtcbiAgICAgICAgaWYgKHRoaXMuc2hhcmVTY3JlZW5TdGFydGVkLnZhbHVlIHx8IHRoaXMuc2hhcmVkLnZhbHVlKSB7XG4gICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5Gb3JjZUZ1bGxEaXNwbGF5KHRydWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gVXBkYXRlcyB0aGUgbWFpbiBncmlkIHZpZXdcbiAgICBhd2FpdCB0aGlzLnByZXBvcHVsYXRlVXNlck1lZGlhLnByZXBvcHVsYXRlVXNlck1lZGlhKHtcbiAgICAgIG5hbWU6IHRoaXMuaG9zdExhYmVsLnZhbHVlLFxuICAgICAgcGFyYW1ldGVyczogeyAuLi50aGlzLmdldEFsbFBhcmFtcygpLCAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCkgfSxcbiAgICB9KTtcbiAgICAvLyBVcGRhdGVzIHRoZSBtaW5pIGdyaWQgdmlld1xuICAgIGF3YWl0IHRoaXMub25TY3JlZW5DaGFuZ2VzLm9uU2NyZWVuQ2hhbmdlcyh7XG4gICAgICBjaGFuZ2VkOiB0cnVlLFxuICAgICAgcGFyYW1ldGVyczogeyAuLi50aGlzLmdldEFsbFBhcmFtcygpLCAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCkgfSxcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIGRpc2Nvbm5lY3RBbGxTb2NrZXRzKGNvbnN1bWVfc29ja2V0czogQ29uc3VtZVNvY2tldFtdKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgZm9yIChjb25zdCBzb2NrZXQgb2YgY29uc3VtZV9zb2NrZXRzKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBpcCA9IE9iamVjdC5rZXlzKHNvY2tldClbMF07XG4gICAgICAgIGF3YWl0IHNvY2tldFtpcF0uZGlzY29ubmVjdCgpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5sb2coYEVycm9yIGRpc2Nvbm5lY3Rpbmcgc29ja2V0IHdpdGggSVA6ICR7T2JqZWN0LmtleXMoc29ja2V0KVswXX1gLCBlcnJvcik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgY2xvc2VBbmRSZXNldCgpIHtcbiAgICAvL2Nsb3NlIGFuZCBjbGVhbiB1cCBhbGwgc29ja2V0cywgbW9kYWxzLC4uLiBhbmQgcmVzZXQgYWxsIHN0YXRlcyB0byBpbml0aWFsIHZhbHVlc1xuXG4gICAgdGhpcy51cGRhdGVJc01lc3NhZ2VzTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgICB0aGlzLnVwZGF0ZUlzUGFydGljaXBhbnRzTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgICB0aGlzLnVwZGF0ZUlzV2FpdGluZ01vZGFsVmlzaWJsZShmYWxzZSk7XG4gICAgdGhpcy51cGRhdGVJc1JlcXVlc3RzTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgICB0aGlzLnVwZGF0ZUlzQ29Ib3N0TW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgICB0aGlzLnVwZGF0ZUlzU2V0dGluZ3NNb2RhbFZpc2libGUoZmFsc2UpO1xuICAgIHRoaXMudXBkYXRlSXNEaXNwbGF5U2V0dGluZ3NNb2RhbFZpc2libGUoZmFsc2UpO1xuICAgIHRoaXMudXBkYXRlSXNNZWRpYVNldHRpbmdzTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgICB0aGlzLnVwZGF0ZUlzTWVudU1vZGFsVmlzaWJsZShmYWxzZSk7XG4gICAgdGhpcy51cGRhdGVJc1NoYXJlRXZlbnRNb2RhbFZpc2libGUoZmFsc2UpO1xuICAgIHRoaXMudXBkYXRlSXNDb25maXJtRXhpdE1vZGFsVmlzaWJsZShmYWxzZSk7XG4gICAgYXdhaXQgdGhpcy5kaXNjb25uZWN0QWxsU29ja2V0cyh0aGlzLmNvbnN1bWVfc29ja2V0cy52YWx1ZSk7XG4gICAgYXdhaXQgdGhpcy51cGRhdGVTdGF0ZXNUb0luaXRpYWxWYWx1ZXMoKTtcbiAgICB0aGlzLnVwZGF0ZU1lZXRpbmdQcm9ncmVzc1RpbWUoJzAwOjAwOjAwJyk7XG4gICAgdGhpcy51cGRhdGVNZWV0aW5nRWxhcHNlZFRpbWUoMCk7XG4gICAgdGhpcy51cGRhdGVSZWNvcmRpbmdQcm9ncmVzc1RpbWUoJzAwOjAwOjAwJyk7XG4gICAgdGhpcy51cGRhdGVSZWNvcmRFbGFwc2VkVGltZSgwKTtcbiAgICB0aGlzLnVwZGF0ZVNob3dSZWNvcmRCdXR0b25zKGZhbHNlKTtcblxuICAgIHRoaXMudXBkYXRlSXNDb25maWd1cmVXaGl0ZWJvYXJkTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgICB0aGlzLnVwZGF0ZUlzV2hpdGVib2FyZE1vZGFsVmlzaWJsZShmYWxzZSk7XG4gICAgdGhpcy51cGRhdGVJc01lbnVNb2RhbFZpc2libGUoZmFsc2UpO1xuICAgIHRoaXMudXBkYXRlSXNSZWNvcmRpbmdNb2RhbFZpc2libGUoZmFsc2UpO1xuICAgIHRoaXMudXBkYXRlSXNQb2xsTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgICB0aGlzLnVwZGF0ZUlzQnJlYWtvdXRSb29tc01vZGFsVmlzaWJsZShmYWxzZSk7XG4gICAgdGhpcy51cGRhdGVJc0JhY2tncm91bmRNb2RhbFZpc2libGUoZmFsc2UpO1xuICAgIHRoaXMudXBkYXRlSXNMb2FkaW5nTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgICB0aGlzLnVwZGF0ZUlzQ29uZmlybUhlcmVNb2RhbFZpc2libGUoZmFsc2UpO1xuXG4gICAgYXdhaXQgc2xlZXAoeyBtczogNTAwIH0pO1xuICAgIHRoaXMudXBkYXRlVmFsaWRhdGVkKGZhbHNlKTtcbiAgICAvL2lmIG9uIHdlYiwgcmVsb2FkIHRoZSBwYWdlXG4gICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICB9XG5cbiAgY29tcHV0ZURpbWVuc2lvbnNNZXRob2QgPSAoe1xuICAgIGNvbnRhaW5lcldpZHRoRnJhY3Rpb24gPSAxLFxuICAgIGNvbnRhaW5lckhlaWdodEZyYWN0aW9uID0gMSxcbiAgICBtYWluU2l6ZSxcbiAgICBkb1N0YWNrID0gdHJ1ZSxcbiAgICBkZWZhdWx0RnJhY3Rpb24sXG4gIH06IHtcbiAgICBjb250YWluZXJXaWR0aEZyYWN0aW9uPzogbnVtYmVyO1xuICAgIGNvbnRhaW5lckhlaWdodEZyYWN0aW9uPzogbnVtYmVyO1xuICAgIG1haW5TaXplOiBudW1iZXI7XG4gICAgZG9TdGFjaz86IGJvb2xlYW47XG4gICAgZGVmYXVsdEZyYWN0aW9uOiBudW1iZXI7XG4gIH0pOiBDb21wb25lbnRTaXplcyA9PiB7XG4gICAgY29uc3QgcGFyZW50V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCAqIGNvbnRhaW5lcldpZHRoRnJhY3Rpb247XG4gICAgY29uc3QgcGFyZW50SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0ICogY29udGFpbmVySGVpZ2h0RnJhY3Rpb24gKiBkZWZhdWx0RnJhY3Rpb247XG4gICAgbGV0IGlzV2lkZVNjcmVlbiA9IHBhcmVudFdpZHRoID49IDc2ODtcblxuICAgIGlmICghaXNXaWRlU2NyZWVuICYmIHBhcmVudFdpZHRoID4gMS41ICogcGFyZW50SGVpZ2h0KSB7XG4gICAgICBpc1dpZGVTY3JlZW4gPSB0cnVlO1xuICAgIH1cblxuICAgIHRoaXMudXBkYXRlSXNXaWRlU2NyZWVuKGlzV2lkZVNjcmVlbik7XG5cbiAgICBjb25zdCBkaW1lbnNpb25zID0gdGhpcy5jYWxjdWxhdGVEaW1lbnNpb25zKHtcbiAgICAgIHBhcmVudFdpZHRoLFxuICAgICAgcGFyZW50SGVpZ2h0LFxuICAgICAgaXNXaWRlU2NyZWVuLFxuICAgICAgbWFpblNpemUsXG4gICAgICBkb1N0YWNrLFxuICAgIH0pO1xuICAgIHJldHVybiBkaW1lbnNpb25zO1xuICB9O1xuXG4gIGNhbGN1bGF0ZURpbWVuc2lvbnMoe1xuICAgIHBhcmVudFdpZHRoLFxuICAgIHBhcmVudEhlaWdodCxcbiAgICBpc1dpZGVTY3JlZW4sXG4gICAgbWFpblNpemUsXG4gICAgZG9TdGFjayxcbiAgfToge1xuICAgIHBhcmVudFdpZHRoOiBudW1iZXI7XG4gICAgcGFyZW50SGVpZ2h0OiBudW1iZXI7XG4gICAgaXNXaWRlU2NyZWVuOiBib29sZWFuO1xuICAgIG1haW5TaXplOiBudW1iZXI7XG4gICAgZG9TdGFjazogYm9vbGVhbjtcbiAgfSk6IENvbXBvbmVudFNpemVzIHtcbiAgICBpZiAoZG9TdGFjaykge1xuICAgICAgcmV0dXJuIGlzV2lkZVNjcmVlblxuICAgICAgICA/IHtcbiAgICAgICAgICAgIG1haW5IZWlnaHQ6IE1hdGguZmxvb3IocGFyZW50SGVpZ2h0KSxcbiAgICAgICAgICAgIG90aGVySGVpZ2h0OiBNYXRoLmZsb29yKHBhcmVudEhlaWdodCksXG4gICAgICAgICAgICBtYWluV2lkdGg6IE1hdGguZmxvb3IoKG1haW5TaXplIC8gMTAwKSAqIHBhcmVudFdpZHRoKSxcbiAgICAgICAgICAgIG90aGVyV2lkdGg6IE1hdGguZmxvb3IoKCgxMDAgLSBtYWluU2l6ZSkgLyAxMDApICogcGFyZW50V2lkdGgpLFxuICAgICAgICAgIH1cbiAgICAgICAgOiB7XG4gICAgICAgICAgICBtYWluSGVpZ2h0OiBNYXRoLmZsb29yKChtYWluU2l6ZSAvIDEwMCkgKiBwYXJlbnRIZWlnaHQpLFxuICAgICAgICAgICAgb3RoZXJIZWlnaHQ6IE1hdGguZmxvb3IoKCgxMDAgLSBtYWluU2l6ZSkgLyAxMDApICogcGFyZW50SGVpZ2h0KSxcbiAgICAgICAgICAgIG1haW5XaWR0aDogTWF0aC5mbG9vcihwYXJlbnRXaWR0aCksXG4gICAgICAgICAgICBvdGhlcldpZHRoOiBNYXRoLmZsb29yKHBhcmVudFdpZHRoKSxcbiAgICAgICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBtYWluSGVpZ2h0OiBNYXRoLmZsb29yKHBhcmVudEhlaWdodCksXG4gICAgICAgIG90aGVySGVpZ2h0OiBNYXRoLmZsb29yKHBhcmVudEhlaWdodCksXG4gICAgICAgIG1haW5XaWR0aDogTWF0aC5mbG9vcihwYXJlbnRXaWR0aCksXG4gICAgICAgIG90aGVyV2lkdGg6IE1hdGguZmxvb3IocGFyZW50V2lkdGgpLFxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVPcmllbnRhdGlvbkNoYW5nZSgpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5oYW5kbGVSZXNpemUuYmluZCh0aGlzKSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ29yaWVudGF0aW9uY2hhbmdlJywgdGhpcy5oYW5kbGVSZXNpemUuYmluZCh0aGlzKSk7XG4gIH1cblxuICBzZXR1cFJlc2l6ZUxpc3RlbmVyKCkge1xuICAgIHRoaXMuaGFuZGxlUmVzaXplKCk7XG4gIH1cblxuICBvcmllbnRhdGlvbiA9IHdpbmRvdy5pbm5lckhlaWdodCA+IHdpbmRvdy5pbm5lcldpZHRoID8gJ3BvcnRyYWl0JyA6ICdsYW5kc2NhcGUnO1xuXG4gIGFzeW5jIGpvaW5Sb29tKGRhdGE6IHtcbiAgICBzb2NrZXQ6IFNvY2tldDtcbiAgICByb29tTmFtZTogc3RyaW5nO1xuICAgIGlzbGV2ZWw6IHN0cmluZztcbiAgICBtZW1iZXI6IHN0cmluZztcbiAgICBzZWM6IHN0cmluZztcbiAgICBhcGlVc2VyTmFtZTogc3RyaW5nO1xuICB9KTogUHJvbWlzZTxSZXNwb25zZUpvaW5Sb29tIHwgbnVsbD4ge1xuICAgIGNvbnN0IHsgc29ja2V0LCByb29tTmFtZSwgaXNsZXZlbCwgbWVtYmVyLCBzZWMsIGFwaVVzZXJOYW1lIH0gPSBkYXRhO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlOiBSZXNwb25zZUpvaW5Sb29tIHwgbnVsbCA9IGF3YWl0IHRoaXMuam9pblJvb21DbGllbnQuam9pblJvb21DbGllbnQoe1xuICAgICAgICBzb2NrZXQsXG4gICAgICAgIHJvb21OYW1lLFxuICAgICAgICBpc2xldmVsLFxuICAgICAgICBtZW1iZXIsXG4gICAgICAgIHNlYyxcbiAgICAgICAgYXBpVXNlck5hbWUsXG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZygnRXJyb3Igam9pbmluZyByb29tOicsIGVycm9yKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIGpvaW4gdGhlIHJvb20uIFBsZWFzZSBjaGVjayB5b3VyIGNvbm5lY3Rpb24gYW5kIHRyeSBhZ2Fpbi4nKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBqb2luX1Jvb20oe1xuICAgIHNvY2tldCxcbiAgICByb29tTmFtZSxcbiAgICBpc2xldmVsLFxuICAgIG1lbWJlcixcbiAgICBzZWMsXG4gICAgYXBpVXNlck5hbWUsXG4gIH06IHtcbiAgICBzb2NrZXQ6IFNvY2tldDtcbiAgICByb29tTmFtZTogc3RyaW5nO1xuICAgIGlzbGV2ZWw6IHN0cmluZztcbiAgICBtZW1iZXI6IHN0cmluZztcbiAgICBzZWM6IHN0cmluZztcbiAgICBhcGlVc2VyTmFtZTogc3RyaW5nO1xuICB9KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgZGF0YTogUmVzcG9uc2VKb2luUm9vbSB8IG51bGwgPSBhd2FpdCB0aGlzLmpvaW5Sb29tKHtcbiAgICAgIHNvY2tldDogc29ja2V0LFxuICAgICAgcm9vbU5hbWU6IHJvb21OYW1lLFxuICAgICAgaXNsZXZlbDogaXNsZXZlbCxcbiAgICAgIG1lbWJlcjogbWVtYmVyLFxuICAgICAgc2VjOiBzZWMsXG4gICAgICBhcGlVc2VyTmFtZTogYXBpVXNlck5hbWUsXG4gICAgfSk7XG5cbiAgICBpZiAoZGF0YSAmJiBkYXRhLnN1Y2Nlc3MpIHtcbiAgICAgIHRoaXMucm9vbURhdGEubmV4dChkYXRhKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy51cGRhdGVSb29tUGFyYW1ldGVyc0NsaWVudC51cGRhdGVSb29tUGFyYW1ldGVyc0NsaWVudCh7XG4gICAgICAgICAgcGFyYW1ldGVyczoge1xuICAgICAgICAgICAgLi4udGhpcy5nZXRBbGxQYXJhbXMoKSxcbiAgICAgICAgICAgIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSxcbiAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGRhdGEuaXNIb3N0KSB7XG4gICAgICAgICAgdGhpcy51cGRhdGVJc2xldmVsKCcyJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy51cGRhdGVJc2xldmVsKCcxJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGF0YS5zZWN1cmVDb2RlKSB7XG4gICAgICAgICAgdGhpcy51cGRhdGVBZG1pblBhc3Njb2RlKGRhdGEuc2VjdXJlQ29kZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGF0YS5ydHBDYXBhYmlsaXRpZXMpIHtcbiAgICAgICAgICBjb25zdCBkZXZpY2VfID0gYXdhaXQgdGhpcy5jcmVhdGVEZXZpY2VDbGllbnQuY3JlYXRlRGV2aWNlQ2xpZW50KHtcbiAgICAgICAgICAgIHJ0cENhcGFiaWxpdGllczogZGF0YS5ydHBDYXBhYmlsaXRpZXMsXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpZiAoZGV2aWNlXykge1xuICAgICAgICAgICAgdGhpcy5kZXZpY2UubmV4dChkZXZpY2VfKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2gge1xuICAgICAgICAvKiBoYW5kbGUgZXJyb3IgKi9cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy51cGRhdGVWYWxpZGF0ZWQoZmFsc2UpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKHRoaXMuc2hvd0FsZXJ0ICYmIGRhdGE/LnJlYXNvbikge1xuICAgICAgICAgIHRoaXMuc2hvd0FsZXJ0KHsgbWVzc2FnZTogZGF0YT8ucmVhc29uLCB0eXBlOiAnZGFuZ2VyJywgZHVyYXRpb246IDMwMDAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2gge1xuICAgICAgICAvKiBoYW5kbGUgZXJyb3IgKi9cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvblBhcnRpY2lwYW50c0ZpbHRlckNoYW5nZSA9ICh2YWx1ZTogc3RyaW5nKTogdm9pZCA9PiB7XG4gICAgaWYgKHZhbHVlICYmIHZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuZmlsdGVyZWRQYXJ0aWNpcGFudHMubmV4dChcbiAgICAgICAgdGhpcy5wYXJ0aWNpcGFudHMudmFsdWUuZmlsdGVyKChwYXJ0aWNpcGFudCkgPT5cbiAgICAgICAgICBwYXJ0aWNpcGFudC5uYW1lLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXModmFsdWUudG9Mb3dlckNhc2UoKSksXG4gICAgICAgICksXG4gICAgICApO1xuICAgICAgdGhpcy5wYXJ0aWNpcGFudHNDb3VudGVyLm5leHQodGhpcy5maWx0ZXJlZFBhcnRpY2lwYW50cy52YWx1ZS5sZW5ndGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmZpbHRlcmVkUGFydGljaXBhbnRzLm5leHQodGhpcy5wYXJ0aWNpcGFudHMudmFsdWUpO1xuICAgICAgdGhpcy5wYXJ0aWNpcGFudHNDb3VudGVyLm5leHQodGhpcy5wYXJ0aWNpcGFudHMudmFsdWUubGVuZ3RoKTtcbiAgICB9XG4gIH07XG5cbiAgdXBkYXRlU3RhdGVzVG9Jbml0aWFsVmFsdWVzID0gYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IGluaXRpYWxWYWx1ZXMgPSBpbml0aWFsVmFsdWVzU3RhdGUgYXMgeyBba2V5OiBzdHJpbmddOiBhbnkgfTtcbiAgICBjb25zdCB1cGRhdGVGdW5jdGlvbnMgPSB0aGlzLmdldEFsbFBhcmFtcygpIGFzIHVua25vd24gYXMge1xuICAgICAgW2tleTogc3RyaW5nXTogKHZhbHVlOiBhbnkpID0+IHZvaWQ7XG4gICAgfTtcblxuICAgIGZvciAoY29uc3Qga2V5IGluIGluaXRpYWxWYWx1ZXMpIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaW5pdGlhbFZhbHVlcywga2V5KSkge1xuICAgICAgICBjb25zdCB1cGRhdGVGdW5jdGlvbk5hbWUgPSBgdXBkYXRlJHtrZXkuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBrZXkuc2xpY2UoMSl9YDtcbiAgICAgICAgY29uc3QgdXBkYXRlRnVuY3Rpb24gPSB1cGRhdGVGdW5jdGlvbnNbdXBkYXRlRnVuY3Rpb25OYW1lXTtcblxuICAgICAgICBpZiAodHlwZW9mIHVwZGF0ZUZ1bmN0aW9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHVwZGF0ZUZ1bmN0aW9uKGluaXRpYWxWYWx1ZXNba2V5XSk7XG4gICAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgICAvKiBoYW5kbGUgZXJyb3IgKi9cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgZmFSZWNvcmRWaW55bCA9IGZhUmVjb3JkVmlueWw7XG4gIGZhUGxheUNpcmNsZSA9IGZhUGxheUNpcmNsZTtcbiAgZmFQYXVzZUNpcmNsZSA9IGZhUGF1c2VDaXJjbGU7XG4gIGZhU3RvcENpcmNsZSA9IGZhU3RvcENpcmNsZTtcbiAgZmFEb3RDaXJjbGUgPSBmYURvdENpcmNsZTtcbiAgZmFDb2cgPSBmYUNvZztcbiAgZmFVc2VycyA9IGZhVXNlcnM7XG4gIGZhQ2xvY2sgPSBmYUNsb2NrO1xuICBmYVVzZXJQbHVzID0gZmFVc2VyUGx1cztcbiAgZmFUb29scyA9IGZhVG9vbHM7XG4gIGZhRGVza3RvcCA9IGZhRGVza3RvcDtcbiAgZmFQb2xsID0gZmFQb2xsO1xuICBmYVVzZXJGcmllbmRzID0gZmFVc2VyRnJpZW5kcztcbiAgZmFDaGFsa2JvYXJkVGVhY2hlciA9IGZhQ2hhbGtib2FyZFRlYWNoZXI7XG4gIGZhTWljcm9waG9uZSA9IGZhTWljcm9waG9uZTtcbiAgZmFNaWNyb3Bob25lU2xhc2ggPSBmYU1pY3JvcGhvbmVTbGFzaDtcbiAgZmFWaWRlbyA9IGZhVmlkZW87XG4gIGZhVmlkZW9TbGFzaCA9IGZhVmlkZW9TbGFzaDtcbiAgZmFQaG9uZSA9IGZhUGhvbmU7XG4gIGZhQmFycyA9IGZhQmFycztcbiAgZmFDb21tZW50cyA9IGZhQ29tbWVudHM7XG4gIGZhQ2hhcnRCYXIgPSBmYUNoYXJ0QmFyO1xuXG4gIG9uQ2xvc2VNZW51TW9kYWwgPSAoKSA9PiB7XG4gICAgdGhpcy51cGRhdGVJc01lbnVNb2RhbFZpc2libGUoZmFsc2UpO1xuICB9O1xuXG4gIG9uRXZlbnRTZXR0aW5nc0Nsb3NlID0gKCkgPT4ge1xuICAgIHRoaXMudXBkYXRlSXNTZXR0aW5nc01vZGFsVmlzaWJsZShmYWxzZSk7XG4gIH07XG5cbiAgb25Db0hvc3RDbG9zZSA9ICgpID0+IHtcbiAgICB0aGlzLnVwZGF0ZUlzQ29Ib3N0TW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgfTtcblxuICBvbk1lZGlhU2V0dGluZ3NDbG9zZSA9ICgpID0+IHtcbiAgICB0aGlzLnVwZGF0ZUlzTWVkaWFTZXR0aW5nc01vZGFsVmlzaWJsZShmYWxzZSk7XG4gIH07XG5cbiAgb25EaXNwbGF5U2V0dGluZ3NDbG9zZSA9ICgpID0+IHtcbiAgICB0aGlzLnVwZGF0ZUlzRGlzcGxheVNldHRpbmdzTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgfTtcblxuICBvblBvbGxDbG9zZSA9ICgpID0+IHtcbiAgICB0aGlzLnVwZGF0ZUlzUG9sbE1vZGFsVmlzaWJsZShmYWxzZSk7XG4gIH07XG5cbiAgb25CcmVha291dFJvb21zQ2xvc2UgPSAoKSA9PiB7XG4gICAgdGhpcy51cGRhdGVJc0JyZWFrb3V0Um9vbXNNb2RhbFZpc2libGUoZmFsc2UpO1xuICB9O1xuXG4gIG9uQ29uZmlndXJlV2hpdGVib2FyZENsb3NlID0gKCkgPT4ge1xuICAgIHRoaXMudXBkYXRlSXNDb25maWd1cmVXaGl0ZWJvYXJkTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgfTtcblxuICBvbk1lc3NhZ2VzQ2xvc2UgPSAoKSA9PiB7XG4gICAgdGhpcy51cGRhdGVJc01lc3NhZ2VzTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgfTtcblxuICBvblJlY29yZGluZ0Nsb3NlID0gKCkgPT4ge1xuICAgIHRoaXMudXBkYXRlSXNSZWNvcmRpbmdNb2RhbFZpc2libGUoZmFsc2UpO1xuICB9O1xuXG4gIG9uUGFydGljaXBhbnRzQ2xvc2UgPSAoKSA9PiB7XG4gICAgdGhpcy51cGRhdGVJc1BhcnRpY2lwYW50c01vZGFsVmlzaWJsZShmYWxzZSk7XG4gIH07XG5cbiAgb25CYWNrZ3JvdW5kQ2xvc2UgPSAoKSA9PiB7XG4gICAgdGhpcy51cGRhdGVJc0JhY2tncm91bmRNb2RhbFZpc2libGUoZmFsc2UpO1xuICB9O1xuXG4gIG9uQ29uZmlybUV4aXRDbG9zZSA9ICgpID0+IHtcbiAgICB0aGlzLnVwZGF0ZUlzQ29uZmlybUV4aXRNb2RhbFZpc2libGUoZmFsc2UpO1xuICB9O1xuXG4gIG9uQ29uZmlybUhlcmVDbG9zZSA9ICgpID0+IHtcbiAgICB0aGlzLnVwZGF0ZUlzQ29uZmlybUhlcmVNb2RhbFZpc2libGUoZmFsc2UpO1xuICB9O1xuXG4gIG9uU2NyZWVuYm9hcmRDbG9zZSA9ICgpID0+IHtcbiAgICB0aGlzLnVwZGF0ZUlzU2NyZWVuYm9hcmRNb2RhbFZpc2libGUoZmFsc2UpO1xuICB9O1xuXG4gIG9uU2hhcmVFdmVudENsb3NlID0gKCkgPT4ge1xuICAgIHRoaXMudXBkYXRlSXNTaGFyZUV2ZW50TW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgfTtcblxuICBvbkFsZXJ0SGlkZSA9ICgpID0+IHtcbiAgICB0aGlzLnVwZGF0ZUFsZXJ0VmlzaWJsZShmYWxzZSk7XG4gIH07XG5cbiAgU2NyZWVuYm9hcmRXaWRnZXQgPSB7XG4gICAgY29tcG9uZW50OiBTY3JlZW5ib2FyZCxcbiAgICBpbnB1dHM6IHtcbiAgICAgIGN1c3RvbVdpZHRoOiB0aGlzLmNvbXBvbmVudFNpemVzLnZhbHVlLm1haW5XaWR0aCxcbiAgICAgIGN1c3RvbUhlaWdodDogdGhpcy5jb21wb25lbnRTaXplcy52YWx1ZS5tYWluSGVpZ2h0LFxuICAgICAgcGFyYW1ldGVyczogdGhpcy5tZWRpYVNGVVBhcmFtZXRlcnMsXG4gICAgICBzaG93QXNwZWN0OiB0aGlzLnNoYXJlZC52YWx1ZSxcbiAgICB9LFxuICB9O1xuXG4gIHJlY29yZFRpbWVyV2lkZ2V0ID0ge1xuICAgIGNvbXBvbmVudDogUmVjb3JkVGltZXJXaWRnZXQsXG4gICAgaW5qZWN0b3I6IHRoaXMuY3JlYXRlSW5qZWN0b3IoeyByZWNvcmRpbmdQcm9ncmVzc1RpbWU6IHRoaXMucmVjb3JkaW5nUHJvZ3Jlc3NUaW1lLnZhbHVlIH0pLFxuICB9O1xuXG4gIHVwZGF0ZVJlY29yZFRpbWVyV2lkZ2V0ID0gKFxuICAgIHJlY29yZGluZ1Byb2dyZXNzVGltZTogc3RyaW5nID0gdGhpcy5yZWNvcmRpbmdQcm9ncmVzc1RpbWUudmFsdWUsXG4gICk6IHsgY29tcG9uZW50OiBhbnk7IGluamVjdG9yOiBJbmplY3RvciB9ID0+IHtcbiAgICBjb25zdCByZWNvcmRUaW1lcldpZGdldCA9IHtcbiAgICAgIGNvbXBvbmVudDogUmVjb3JkVGltZXJXaWRnZXQsXG4gICAgICBpbmplY3RvcjogdGhpcy5jcmVhdGVJbmplY3Rvcih7IHJlY29yZGluZ1Byb2dyZXNzVGltZTogcmVjb3JkaW5nUHJvZ3Jlc3NUaW1lIH0pLFxuICAgIH07XG5cbiAgICB0aGlzLnJlY29yZFRpbWVyV2lkZ2V0ID0geyAuLi5yZWNvcmRUaW1lcldpZGdldCB9O1xuXG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG5cbiAgICByZXR1cm4gcmVjb3JkVGltZXJXaWRnZXQ7XG4gIH07XG5cbiAgcmVjb3JkQnV0dG9uczogTWFpbkJ1dHRvbkFsdFtdID0gW107XG5cbiAgcmVjb3JkQnV0dG9uc0FycmF5OiBNYWluQnV0dG9uQWx0W10gPSBbXG4gICAge1xuICAgICAgaWNvbjogdGhpcy5mYVBsYXlDaXJjbGUsXG4gICAgICBhY3RpdmU6ICgpID0+ICF0aGlzLnJlY29yZFBhdXNlZC52YWx1ZSxcbiAgICAgIG9uUHJlc3M6ICgpID0+XG4gICAgICAgIHRoaXMudXBkYXRlUmVjb3JkaW5nLnVwZGF0ZVJlY29yZGluZyh7XG4gICAgICAgICAgcGFyYW1ldGVyczogeyAuLi50aGlzLmdldEFsbFBhcmFtcygpLCAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCkgfSxcbiAgICAgICAgfSksXG4gICAgICBhY3RpdmVDb2xvcjogJ2JsYWNrJyxcbiAgICAgIGluQWN0aXZlQ29sb3I6ICdibGFjaycsXG4gICAgICBhbHRlcm5hdGVJY29uOiB0aGlzLmZhUGF1c2VDaXJjbGUsXG4gICAgICBzaG93OiAoKSA9PiB0cnVlLFxuICAgIH0sXG4gICAge1xuICAgICAgaWNvbjogdGhpcy5mYVN0b3BDaXJjbGUsXG4gICAgICBhY3RpdmU6ICgpID0+IGZhbHNlLFxuICAgICAgb25QcmVzczogKCkgPT5cbiAgICAgICAgdGhpcy5zdG9wUmVjb3JkaW5nLnN0b3BSZWNvcmRpbmcoe1xuICAgICAgICAgIHBhcmFtZXRlcnM6IHsgLi4udGhpcy5nZXRBbGxQYXJhbXMoKSwgLi4udGhpcy5tZWRpYVNGVUZ1bmN0aW9ucygpIH0sXG4gICAgICAgIH0pLFxuICAgICAgYWN0aXZlQ29sb3I6ICdncmVlbicsXG4gICAgICBpbkFjdGl2ZUNvbG9yOiAnYmxhY2snLFxuICAgICAgc2hvdzogKCkgPT4gdHJ1ZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGN1c3RvbUNvbXBvbmVudDogKCkgPT4gdGhpcy51cGRhdGVSZWNvcmRUaW1lcldpZGdldCgpLFxuICAgICAgc2hvdzogKCkgPT4gdHJ1ZSxcbiAgICAgIGFjdGl2ZTogKCkgPT4gZmFsc2UsXG4gICAgfSxcbiAgICB7XG4gICAgICBpY29uOiB0aGlzLmZhRG90Q2lyY2xlLFxuICAgICAgYWN0aXZlOiAoKSA9PiBmYWxzZSxcbiAgICAgIG9uUHJlc3M6ICgpID0+IGNvbnNvbGUubG9nKCdTdGF0dXMgcHJlc3NlZCcpLFxuICAgICAgYWN0aXZlQ29sb3I6ICdibGFjaycsXG4gICAgICBpbkFjdGl2ZUNvbG9yOiAoKSA9PiAodGhpcy5yZWNvcmRQYXVzZWQudmFsdWUgPyAneWVsbG93JyA6ICdyZWQnKSxcbiAgICAgIHNob3c6ICgpID0+IHRydWUsXG4gICAgfSxcbiAgICB7XG4gICAgICBpY29uOiB0aGlzLmZhQ29nLFxuICAgICAgYWN0aXZlOiAoKSA9PiBmYWxzZSxcbiAgICAgIG9uUHJlc3M6ICgpID0+XG4gICAgICAgIHRoaXMubGF1bmNoUmVjb3JkaW5nLmxhdW5jaFJlY29yZGluZyh7XG4gICAgICAgICAgdXBkYXRlSXNSZWNvcmRpbmdNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNSZWNvcmRpbmdNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcbiAgICAgICAgICBpc1JlY29yZGluZ01vZGFsVmlzaWJsZTogdGhpcy5pc1JlY29yZGluZ01vZGFsVmlzaWJsZS52YWx1ZSxcbiAgICAgICAgICBzaG93QWxlcnQ6IHRoaXMuc2hvd0FsZXJ0LmJpbmQodGhpcyksXG4gICAgICAgICAgc3RvcExhdW5jaFJlY29yZDogdGhpcy5zdG9wTGF1bmNoUmVjb3JkLnZhbHVlLFxuICAgICAgICAgIGNhbkxhdW5jaFJlY29yZDogdGhpcy5jYW5MYXVuY2hSZWNvcmQudmFsdWUsXG4gICAgICAgICAgcmVjb3JkaW5nQXVkaW9TdXBwb3J0OiB0aGlzLnJlY29yZGluZ0F1ZGlvU3VwcG9ydC52YWx1ZSxcbiAgICAgICAgICByZWNvcmRpbmdWaWRlb1N1cHBvcnQ6IHRoaXMucmVjb3JkaW5nVmlkZW9TdXBwb3J0LnZhbHVlLFxuICAgICAgICAgIHVwZGF0ZUNhblJlY29yZDogdGhpcy51cGRhdGVDYW5SZWNvcmQuYmluZCh0aGlzKSxcbiAgICAgICAgICB1cGRhdGVDbGVhcmVkVG9SZWNvcmQ6IHRoaXMudXBkYXRlQ2xlYXJlZFRvUmVjb3JkLmJpbmQodGhpcyksXG4gICAgICAgICAgcmVjb3JkU3RhcnRlZDogdGhpcy5yZWNvcmRTdGFydGVkLnZhbHVlLFxuICAgICAgICAgIHJlY29yZFBhdXNlZDogdGhpcy5yZWNvcmRQYXVzZWQudmFsdWUsXG4gICAgICAgICAgbG9jYWxVSU1vZGU6IHRoaXMubG9jYWxVSU1vZGUudmFsdWUsXG4gICAgICAgIH0pLFxuICAgICAgYWN0aXZlQ29sb3I6ICdncmVlbicsXG4gICAgICBpbkFjdGl2ZUNvbG9yOiAnYmxhY2snLFxuICAgICAgc2hvdzogKCkgPT4gdHJ1ZSxcbiAgICB9LFxuICBdO1xuXG4gIGFzeW5jIHVwZGF0ZVJlY29yZEJ1dHRvbnMoKSB7XG4gICAgY29uc3QgcmVjb3JkQnV0dG9ucyA9IHRoaXMucmVjb3JkQnV0dG9uc0FycmF5Lm1hcCgoYnV0dG9uKSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5idXR0b24sXG4gICAgICAgIGFjdGl2ZTogdHlwZW9mIGJ1dHRvbi5hY3RpdmUgPT09ICdmdW5jdGlvbicgPyBidXR0b24uYWN0aXZlKCkgOiBidXR0b24uYWN0aXZlLFxuICAgICAgICBzaG93OiB0eXBlb2YgYnV0dG9uLnNob3cgPT09ICdmdW5jdGlvbicgPyBidXR0b24uc2hvdygpIDogYnV0dG9uLnNob3csXG4gICAgICAgIGN1c3RvbUNvbXBvbmVudDogYnV0dG9uLmN1c3RvbUNvbXBvbmVudFxuICAgICAgICAgID8gdHlwZW9mIGJ1dHRvbi5jdXN0b21Db21wb25lbnQgPT09ICdmdW5jdGlvbidcbiAgICAgICAgICAgID8gYnV0dG9uLmN1c3RvbUNvbXBvbmVudCgpXG4gICAgICAgICAgICA6IGJ1dHRvbi5jdXN0b21Db21wb25lbnRcbiAgICAgICAgICA6IHVuZGVmaW5lZCxcbiAgICAgICAgYWN0aXZlQ29sb3I6XG4gICAgICAgICAgdHlwZW9mIGJ1dHRvbi5pbkFjdGl2ZUNvbG9yID09PSAnZnVuY3Rpb24nXG4gICAgICAgICAgICA/IGJ1dHRvbi5pbkFjdGl2ZUNvbG9yKClcbiAgICAgICAgICAgIDogYnV0dG9uLmluQWN0aXZlQ29sb3IsXG4gICAgICAgIGluQWN0aXZlQ29sb3I6XG4gICAgICAgICAgdHlwZW9mIGJ1dHRvbi5pbkFjdGl2ZUNvbG9yID09PSAnZnVuY3Rpb24nXG4gICAgICAgICAgICA/IGJ1dHRvbi5pbkFjdGl2ZUNvbG9yKClcbiAgICAgICAgICAgIDogYnV0dG9uLmluQWN0aXZlQ29sb3IsXG4gICAgICB9O1xuICAgIH0pO1xuICAgIHRoaXMucmVjb3JkQnV0dG9ucyA9IFsuLi5yZWNvcmRCdXR0b25zXTtcbiAgICBhd2FpdCB0aGlzLnVwZGF0ZU1lbnVSZWNvcmRXaWRnZXQocmVjb3JkQnV0dG9ucyk7XG4gICAgdGhpcy51cGRhdGVDdXN0b21NZW51QnV0dG9ucygpO1xuXG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICAvLyBDcmVhdGUgaW5zdGFuY2VzIG9mIHRoZSBjdXN0b20gd2lkZ2V0c1xuICBtZW51V2lkZ2V0ID0ge1xuICAgIGNvbXBvbmVudDogTWVudVdpZGdldCxcbiAgICBpbmplY3RvcjogdGhpcy5jcmVhdGVJbmplY3Rvcih7XG4gICAgICBpY29uOiB0aGlzLmZhQmFycyxcbiAgICAgIGJhZGdlVmFsdWU6IHRoaXMudG90YWxSZXFXYWl0LnZhbHVlLFxuICAgICAgaWNvbkNvbG9yOiAnYmxhY2snLFxuICAgICAgc2hvd0JhZGdlOiB0cnVlLFxuICAgIH0pLFxuICB9O1xuXG4gIG1lc3NhZ2VXaWRnZXQgPSB7XG4gICAgY29tcG9uZW50OiBNZXNzYWdlV2lkZ2V0LFxuICAgIGluamVjdG9yOiB0aGlzLmNyZWF0ZUluamVjdG9yKHtcbiAgICAgIGljb246IHRoaXMuZmFDb21tZW50cyxcbiAgICAgIHNob3dCYWRnZTogdGhpcy5zaG93TWVzc2FnZXNCYWRnZS52YWx1ZSxcbiAgICAgIGJhZGdlVmFsdWU6IDEsXG4gICAgICBpY29uQ29sb3I6ICdibGFjaycsXG4gICAgfSksXG4gIH07XG5cbiAgbWVudVJlY29yZFdpZGdldCA9IHtcbiAgICBjb21wb25lbnQ6IE1lbnVSZWNvcmRXaWRnZXQsXG4gICAgaW5qZWN0b3I6IHRoaXMuY3JlYXRlSW5qZWN0b3Ioe1xuICAgICAgYnV0dG9uczogdGhpcy5yZWNvcmRCdXR0b25zLFxuICAgICAgc2hvd0FzcGVjdDogdHJ1ZSxcbiAgICAgIGRpcmVjdGlvbjogJ2hvcml6b250YWwnLFxuICAgIH0pLFxuICB9O1xuXG4gIHVwZGF0ZU1lbnVSZWNvcmRXaWRnZXQgPSAocmVjb3JkQnV0dG9uczogTWFpbkJ1dHRvbkFsdFtdID0gdGhpcy5yZWNvcmRCdXR0b25zKTogYW55ID0+IHtcbiAgICBjb25zdCBtZW51UmVjb3JkV2lkZ2V0ID0ge1xuICAgICAgY29tcG9uZW50OiBNZW51UmVjb3JkV2lkZ2V0LFxuICAgICAgaW5qZWN0b3I6IHRoaXMuY3JlYXRlSW5qZWN0b3Ioe1xuICAgICAgICBidXR0b25zOiByZWNvcmRCdXR0b25zLFxuICAgICAgICBzaG93QXNwZWN0OiB0cnVlLFxuICAgICAgICBkaXJlY3Rpb246ICdob3Jpem9udGFsJyxcbiAgICAgIH0pLFxuICAgIH07XG5cbiAgICB0aGlzLm1lbnVSZWNvcmRXaWRnZXQgPSB7IC4uLm1lbnVSZWNvcmRXaWRnZXQgfTtcblxuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuXG4gICAgcmV0dXJuIG1lbnVSZWNvcmRXaWRnZXQ7XG4gIH07XG5cbiAgbWVudVBhcnRpY2lwYW50c1dpZGdldCA9IHtcbiAgICBjb21wb25lbnQ6IE1lbnVQYXJ0aWNpcGFudHNXaWRnZXQsXG4gICAgaW5qZWN0b3I6IHRoaXMuY3JlYXRlSW5qZWN0b3Ioe1xuICAgICAgaWNvbjogdGhpcy5mYUNoYXJ0QmFyLFxuICAgICAgcGFydGljaXBhbnRzQ291bnRlcjogdGhpcy5wYXJ0aWNpcGFudHNDb3VudGVyLnZhbHVlLFxuICAgICAgaWNvbkNvbG9yOiAnYmxhY2snLFxuICAgIH0pLFxuICB9O1xuXG4gIHVwZGF0ZU1lbnVQYXJ0aWNpcGFudHNXaWRnZXQgPSAoY291bnQ6IG51bWJlciA9IHRoaXMucGFydGljaXBhbnRzQ291bnRlci52YWx1ZSk6IGFueSA9PiB7XG4gICAgY29uc3QgbWVudVBhcnRpY2lwYW50c1dpZGdldCA9IHtcbiAgICAgIGNvbXBvbmVudDogTWVudVBhcnRpY2lwYW50c1dpZGdldCxcbiAgICAgIGluamVjdG9yOiB0aGlzLmNyZWF0ZUluamVjdG9yKHtcbiAgICAgICAgaWNvbjogdGhpcy5mYUNoYXJ0QmFyLFxuICAgICAgICBwYXJ0aWNpcGFudHNDb3VudGVyOiBjb3VudCxcbiAgICAgICAgaWNvbkNvbG9yOiAnYmxhY2snLFxuICAgICAgfSksXG4gICAgfTtcblxuICAgIHRoaXMubWVudVBhcnRpY2lwYW50c1dpZGdldCA9IHsgLi4ubWVudVBhcnRpY2lwYW50c1dpZGdldCB9O1xuXG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG5cbiAgICByZXR1cm4gbWVudVBhcnRpY2lwYW50c1dpZGdldDtcbiAgfTtcblxuICBjdXN0b21NZW51QnV0dG9uc0FycmF5OiBNYWluQ3VzdG9tQnV0dG9uW10gPSBbXG4gICAge1xuICAgICAgaWNvbjogdGhpcy5mYVJlY29yZFZpbnlsLFxuICAgICAgdGV4dDogJ1JlY29yZCcsXG4gICAgICBhY3Rpb246ICgpID0+XG4gICAgICAgIHRoaXMubGF1bmNoUmVjb3JkaW5nLmxhdW5jaFJlY29yZGluZyh7XG4gICAgICAgICAgdXBkYXRlSXNSZWNvcmRpbmdNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNSZWNvcmRpbmdNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcbiAgICAgICAgICBpc1JlY29yZGluZ01vZGFsVmlzaWJsZTogdGhpcy5pc1JlY29yZGluZ01vZGFsVmlzaWJsZS52YWx1ZSxcbiAgICAgICAgICBzaG93QWxlcnQ6IHRoaXMuc2hvd0FsZXJ0LmJpbmQodGhpcyksXG4gICAgICAgICAgc3RvcExhdW5jaFJlY29yZDogdGhpcy5zdG9wTGF1bmNoUmVjb3JkLnZhbHVlLFxuICAgICAgICAgIGNhbkxhdW5jaFJlY29yZDogdGhpcy5jYW5MYXVuY2hSZWNvcmQudmFsdWUsXG4gICAgICAgICAgcmVjb3JkaW5nQXVkaW9TdXBwb3J0OiB0aGlzLnJlY29yZGluZ0F1ZGlvU3VwcG9ydC52YWx1ZSxcbiAgICAgICAgICByZWNvcmRpbmdWaWRlb1N1cHBvcnQ6IHRoaXMucmVjb3JkaW5nVmlkZW9TdXBwb3J0LnZhbHVlLFxuICAgICAgICAgIHVwZGF0ZUNhblJlY29yZDogdGhpcy51cGRhdGVDYW5SZWNvcmQuYmluZCh0aGlzKSxcbiAgICAgICAgICB1cGRhdGVDbGVhcmVkVG9SZWNvcmQ6IHRoaXMudXBkYXRlQ2xlYXJlZFRvUmVjb3JkLmJpbmQodGhpcyksXG4gICAgICAgICAgcmVjb3JkU3RhcnRlZDogdGhpcy5yZWNvcmRTdGFydGVkLnZhbHVlLFxuICAgICAgICAgIHJlY29yZFBhdXNlZDogdGhpcy5yZWNvcmRQYXVzZWQudmFsdWUsXG4gICAgICAgICAgbG9jYWxVSU1vZGU6IHRoaXMubG9jYWxVSU1vZGUudmFsdWUsXG4gICAgICAgIH0pLFxuICAgICAgc2hvdzogKCkgPT4gIXRoaXMuc2hvd1JlY29yZEJ1dHRvbnMudmFsdWUgJiYgdGhpcy5pc2xldmVsLnZhbHVlID09ICcyJyxcbiAgICB9LFxuICAgIHtcbiAgICAgIGN1c3RvbUNvbXBvbmVudDogKCkgPT4gdGhpcy51cGRhdGVNZW51UmVjb3JkV2lkZ2V0KCksXG4gICAgICBzaG93OiAoKSA9PiB0aGlzLnNob3dSZWNvcmRCdXR0b25zLnZhbHVlICYmIHRoaXMuaXNsZXZlbC52YWx1ZSA9PSAnMicsXG4gICAgICBhY3Rpb246ICgpID0+IGNvbnNvbGUubG9nKCdyZWNvcmQgYnV0dG9ucyBwcmVzc2VkJyksXG4gICAgfSxcbiAgICB7XG4gICAgICBpY29uOiB0aGlzLmZhQ29nLFxuICAgICAgdGV4dDogJ0V2ZW50IFNldHRpbmdzJyxcbiAgICAgIGFjdGlvbjogKCkgPT5cbiAgICAgICAgdGhpcy5sYXVuY2hTZXR0aW5ncy5sYXVuY2hTZXR0aW5ncyh7XG4gICAgICAgICAgdXBkYXRlSXNTZXR0aW5nc01vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc1NldHRpbmdzTW9kYWxWaXNpYmxlLmJpbmQodGhpcyksXG4gICAgICAgICAgaXNTZXR0aW5nc01vZGFsVmlzaWJsZTogdGhpcy5pc1NldHRpbmdzTW9kYWxWaXNpYmxlLnZhbHVlLFxuICAgICAgICB9KSxcbiAgICAgIHNob3c6ICgpID0+IHRoaXMuaXNsZXZlbC52YWx1ZSA9PSAnMicsXG4gICAgfSxcbiAgICB7XG4gICAgICBpY29uOiB0aGlzLmZhVXNlcnMsXG4gICAgICB0ZXh0OiAnUmVxdWVzdHMnLFxuICAgICAgYWN0aW9uOiAoKSA9PlxuICAgICAgICB0aGlzLmxhdW5jaFJlcXVlc3RzLmxhdW5jaFJlcXVlc3RzKHtcbiAgICAgICAgICB1cGRhdGVJc1JlcXVlc3RzTW9kYWxWaXNpYmxlOiB0aGlzLnVwZGF0ZUlzUmVxdWVzdHNNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcbiAgICAgICAgICBpc1JlcXVlc3RzTW9kYWxWaXNpYmxlOiB0aGlzLmlzUmVxdWVzdHNNb2RhbFZpc2libGUudmFsdWUsXG4gICAgICAgIH0pLFxuICAgICAgc2hvdzogKCkgPT5cbiAgICAgICAgdGhpcy5pc2xldmVsLnZhbHVlID09ICcyJyB8fFxuICAgICAgICAodGhpcy5jb0hvc3RSZXNwb25zaWJpbGl0eS52YWx1ZSAmJlxuICAgICAgICAgIHRoaXMuY29Ib3N0LnZhbHVlICYmXG4gICAgICAgICAgdGhpcy5jb0hvc3QudmFsdWUgPT09IHRoaXMubWVtYmVyLnZhbHVlICYmXG4gICAgICAgICAgISF0aGlzLmNvSG9zdFJlc3BvbnNpYmlsaXR5Py52YWx1ZT8uZmluZCgoaXRlbSkgPT4gaXRlbS5uYW1lID09PSAnbWVkaWEnKT8udmFsdWUpIHx8XG4gICAgICAgIGZhbHNlLFxuICAgIH0sXG4gICAge1xuICAgICAgaWNvbjogdGhpcy5mYUNsb2NrLFxuICAgICAgdGV4dDogJ1dhaXRpbmcnLFxuICAgICAgYWN0aW9uOiAoKSA9PlxuICAgICAgICB0aGlzLmxhdW5jaFdhaXRpbmcubGF1bmNoV2FpdGluZyh7XG4gICAgICAgICAgdXBkYXRlSXNXYWl0aW5nTW9kYWxWaXNpYmxlOiB0aGlzLnVwZGF0ZUlzV2FpdGluZ01vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuICAgICAgICAgIGlzV2FpdGluZ01vZGFsVmlzaWJsZTogdGhpcy5pc1dhaXRpbmdNb2RhbFZpc2libGUudmFsdWUsXG4gICAgICAgIH0pLFxuICAgICAgc2hvdzogKCkgPT5cbiAgICAgICAgdGhpcy5pc2xldmVsLnZhbHVlID09ICcyJyB8fFxuICAgICAgICAodGhpcy5jb0hvc3RSZXNwb25zaWJpbGl0eS52YWx1ZSAmJlxuICAgICAgICAgIHRoaXMuY29Ib3N0LnZhbHVlICYmXG4gICAgICAgICAgdGhpcy5jb0hvc3QudmFsdWUgPT09IHRoaXMubWVtYmVyLnZhbHVlICYmXG4gICAgICAgICAgdGhpcy5jb0hvc3RSZXNwb25zaWJpbGl0eT8udmFsdWU/LmZpbmQoKGl0ZW0pID0+IGl0ZW0ubmFtZSA9PT0gJ3dhaXRpbmcnKT8udmFsdWUgPT09XG4gICAgICAgICAgICB0cnVlKSB8fFxuICAgICAgICBmYWxzZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGljb246IHRoaXMuZmFVc2VyUGx1cyxcbiAgICAgIHRleHQ6ICdDby1ob3N0JyxcbiAgICAgIGFjdGlvbjogKCkgPT5cbiAgICAgICAgdGhpcy5sYXVuY2hDb0hvc3QubGF1bmNoQ29Ib3N0KHtcbiAgICAgICAgICB1cGRhdGVJc0NvSG9zdE1vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc0NvSG9zdE1vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuICAgICAgICAgIGlzQ29Ib3N0TW9kYWxWaXNpYmxlOiB0aGlzLmlzQ29Ib3N0TW9kYWxWaXNpYmxlLnZhbHVlLFxuICAgICAgICB9KSxcbiAgICAgIHNob3c6ICgpID0+IHRoaXMuaXNsZXZlbC52YWx1ZSA9PSAnMicsXG4gICAgfSxcbiAgICB7XG4gICAgICBpY29uOiB0aGlzLmZhVG9vbHMsXG4gICAgICB0ZXh0OiAnU2V0IE1lZGlhJyxcbiAgICAgIGFjdGlvbjogKCkgPT5cbiAgICAgICAgdGhpcy5sYXVuY2hNZWRpYVNldHRpbmdzLmxhdW5jaE1lZGlhU2V0dGluZ3Moe1xuICAgICAgICAgIHVwZGF0ZUlzTWVkaWFTZXR0aW5nc01vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc01lZGlhU2V0dGluZ3NNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcbiAgICAgICAgICBpc01lZGlhU2V0dGluZ3NNb2RhbFZpc2libGU6IHRoaXMuaXNNZWRpYVNldHRpbmdzTW9kYWxWaXNpYmxlLnZhbHVlLFxuICAgICAgICAgIGF1ZGlvSW5wdXRzOiB0aGlzLmF1ZGlvSW5wdXRzLnZhbHVlLFxuICAgICAgICAgIHZpZGVvSW5wdXRzOiB0aGlzLnZpZGVvSW5wdXRzLnZhbHVlLFxuICAgICAgICAgIHVwZGF0ZUF1ZGlvSW5wdXRzOiB0aGlzLnVwZGF0ZUF1ZGlvSW5wdXRzLmJpbmQodGhpcyksXG4gICAgICAgICAgdXBkYXRlVmlkZW9JbnB1dHM6IHRoaXMudXBkYXRlVmlkZW9JbnB1dHMuYmluZCh0aGlzKSxcbiAgICAgICAgfSksXG4gICAgICBzaG93OiAoKSA9PiB0cnVlLFxuICAgIH0sXG4gICAge1xuICAgICAgaWNvbjogdGhpcy5mYURlc2t0b3AsXG4gICAgICB0ZXh0OiAnRGlzcGxheScsXG4gICAgICBhY3Rpb246ICgpID0+XG4gICAgICAgIHRoaXMubGF1bmNoRGlzcGxheVNldHRpbmdzLmxhdW5jaERpc3BsYXlTZXR0aW5ncyh7XG4gICAgICAgICAgdXBkYXRlSXNEaXNwbGF5U2V0dGluZ3NNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNEaXNwbGF5U2V0dGluZ3NNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcbiAgICAgICAgICBpc0Rpc3BsYXlTZXR0aW5nc01vZGFsVmlzaWJsZTogdGhpcy5pc0Rpc3BsYXlTZXR0aW5nc01vZGFsVmlzaWJsZS52YWx1ZSxcbiAgICAgICAgfSksXG4gICAgICBzaG93OiAoKSA9PiB0cnVlLFxuICAgIH0sXG4gICAge1xuICAgICAgaWNvbjogdGhpcy5mYVBvbGwsXG4gICAgICB0ZXh0OiAnUG9sbCcsXG4gICAgICBhY3Rpb246ICgpID0+XG4gICAgICAgIHRoaXMubGF1bmNoUG9sbC5sYXVuY2hQb2xsKHtcbiAgICAgICAgICB1cGRhdGVJc1BvbGxNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNQb2xsTW9kYWxWaXNpYmxlLmJpbmQodGhpcyksXG4gICAgICAgICAgaXNQb2xsTW9kYWxWaXNpYmxlOiB0aGlzLmlzUG9sbE1vZGFsVmlzaWJsZS52YWx1ZSxcbiAgICAgICAgfSksXG4gICAgICBzaG93OiAoKSA9PiB0cnVlLFxuICAgIH0sXG4gICAge1xuICAgICAgaWNvbjogdGhpcy5mYVVzZXJGcmllbmRzLFxuICAgICAgdGV4dDogJ0JyZWFrb3V0IFJvb21zJyxcbiAgICAgIGFjdGlvbjogKCkgPT5cbiAgICAgICAgdGhpcy5sYXVuY2hCcmVha291dFJvb21zLmxhdW5jaEJyZWFrb3V0Um9vbXMoe1xuICAgICAgICAgIHVwZGF0ZUlzQnJlYWtvdXRSb29tc01vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc0JyZWFrb3V0Um9vbXNNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcbiAgICAgICAgICBpc0JyZWFrb3V0Um9vbXNNb2RhbFZpc2libGU6IHRoaXMuaXNCcmVha291dFJvb21zTW9kYWxWaXNpYmxlLnZhbHVlLFxuICAgICAgICB9KSxcbiAgICAgIHNob3c6ICgpID0+IHRoaXMuaXNsZXZlbC52YWx1ZSA9PSAnMicsXG4gICAgfSxcbiAgICB7XG4gICAgICBpY29uOiB0aGlzLmZhQ2hhbGtib2FyZFRlYWNoZXIsXG4gICAgICB0ZXh0OiAnV2hpdGVib2FyZCcsXG4gICAgICBhY3Rpb246ICgpID0+XG4gICAgICAgIHRoaXMubGF1bmNoQ29uZmlndXJlV2hpdGVib2FyZC5sYXVuY2hDb25maWd1cmVXaGl0ZWJvYXJkKHtcbiAgICAgICAgICB1cGRhdGVJc0NvbmZpZ3VyZVdoaXRlYm9hcmRNb2RhbFZpc2libGU6XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUlzQ29uZmlndXJlV2hpdGVib2FyZE1vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuICAgICAgICAgIGlzQ29uZmlndXJlV2hpdGVib2FyZE1vZGFsVmlzaWJsZTogdGhpcy5pc0NvbmZpZ3VyZVdoaXRlYm9hcmRNb2RhbFZpc2libGUudmFsdWUsXG4gICAgICAgIH0pLFxuICAgICAgc2hvdzogKCkgPT4gdGhpcy5pc2xldmVsLnZhbHVlID09ICcyJyxcbiAgICB9LFxuICBdO1xuXG4gIGN1c3RvbU1lbnVCdXR0b25zOiBNYWluQ3VzdG9tQnV0dG9uW10gPSBbXTtcblxuICB1cGRhdGVDdXN0b21NZW51QnV0dG9ucygpIHtcbiAgICB0aGlzLmN1c3RvbU1lbnVCdXR0b25zID0gdGhpcy5jdXN0b21NZW51QnV0dG9uc0FycmF5Lm1hcCgoYnV0dG9uKSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5idXR0b24sXG4gICAgICAgIHNob3c6IHR5cGVvZiBidXR0b24uc2hvdyA9PT0gJ2Z1bmN0aW9uJyA/IGJ1dHRvbi5zaG93KCkgOiBidXR0b24uc2hvdyxcbiAgICAgICAgY3VzdG9tQ29tcG9uZW50OiBidXR0b24uY3VzdG9tQ29tcG9uZW50XG4gICAgICAgICAgPyB0eXBlb2YgYnV0dG9uLmN1c3RvbUNvbXBvbmVudCA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICAgICAgPyBidXR0b24uY3VzdG9tQ29tcG9uZW50KClcbiAgICAgICAgICAgIDogYnV0dG9uLmN1c3RvbUNvbXBvbmVudFxuICAgICAgICAgIDogdW5kZWZpbmVkLFxuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIHNjcmVlblNoYXJlV2lkZ2V0ID0ge1xuICAgIGNvbXBvbmVudDogU2NyZWVuU2hhcmVXaWRnZXQsXG4gICAgaW5qZWN0b3I6IHRoaXMuY3JlYXRlSW5qZWN0b3IoeyBkaXNhYmxlZDogIXRoaXMuc2NyZWVuU2hhcmVBY3RpdmUudmFsdWUgfSksXG4gIH07XG5cbiAgY29udHJvbEJ1dHRvbnMgPSBbXG4gICAge1xuICAgICAgaWNvbjogdGhpcy5mYU1pY3JvcGhvbmVTbGFzaCxcbiAgICAgIGFsdGVybmF0ZUljb246IHRoaXMuZmFNaWNyb3Bob25lLFxuICAgICAgYWN0aXZlOiB0aGlzLm1pY0FjdGl2ZS52YWx1ZSxcbiAgICAgIG9uUHJlc3M6ICgpID0+XG4gICAgICAgIHRoaXMuY2xpY2tBdWRpby5jbGlja0F1ZGlvKHtcbiAgICAgICAgICBwYXJhbWV0ZXJzOiB7XG4gICAgICAgICAgICAuLi50aGlzLmdldEFsbFBhcmFtcygpLFxuICAgICAgICAgICAgLi4udGhpcy5tZWRpYVNGVUZ1bmN0aW9ucygpLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pLFxuICAgICAgYWN0aXZlQ29sb3I6ICdncmVlbicsXG4gICAgICBpbkFjdGl2ZUNvbG9yOiAncmVkJyxcbiAgICAgIGRpc2FibGVkOiB0aGlzLmF1ZGlvU3dpdGNoaW5nLnZhbHVlLFxuICAgICAgc2hvdzogdHJ1ZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGljb246IHRoaXMuZmFWaWRlb1NsYXNoLFxuICAgICAgYWx0ZXJuYXRlSWNvbjogdGhpcy5mYVZpZGVvLFxuICAgICAgYWN0aXZlOiB0aGlzLnZpZGVvQWN0aXZlLnZhbHVlLFxuICAgICAgb25QcmVzczogKCkgPT5cbiAgICAgICAgdGhpcy5jbGlja1ZpZGVvLmNsaWNrVmlkZW8oe1xuICAgICAgICAgIHBhcmFtZXRlcnM6IHtcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0QWxsUGFyYW1zKCksXG4gICAgICAgICAgICAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCksXG4gICAgICAgICAgICBNZWRpYVN0cmVhbSxcbiAgICAgICAgICAgIE1lZGlhU3RyZWFtVHJhY2ssXG4gICAgICAgICAgICBtZWRpYURldmljZXM6IE1lZGlhRGV2aWNlcyxcbiAgICAgICAgICAgIGRldmljZTogdGhpcy5kZXZpY2UudmFsdWUsXG4gICAgICAgICAgICBzb2NrZXQ6IHRoaXMuc29ja2V0LnZhbHVlLFxuICAgICAgICAgICAgc2hvd0FsZXJ0OiB0aGlzLnNob3dBbGVydC5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgY2hlY2tQZXJtaXNzaW9uOiB0aGlzLmNoZWNrUGVybWlzc2lvbi5jaGVja1Blcm1pc3Npb24sXG4gICAgICAgICAgICBzdHJlYW1TdWNjZXNzVmlkZW86IHRoaXMuc3RyZWFtU3VjY2Vzc1ZpZGVvLnN0cmVhbVN1Y2Nlc3NWaWRlbyxcbiAgICAgICAgICAgIGhhc0NhbWVyYVBlcm1pc3Npb246IHRoaXMuaGFzQ2FtZXJhUGVybWlzc2lvbi52YWx1ZSxcbiAgICAgICAgICAgIHJlcXVlc3RQZXJtaXNzaW9uQ2FtZXJhOiB0aGlzLnJlcXVlc3RQZXJtaXNzaW9uQ2FtZXJhLmJpbmQodGhpcyksXG4gICAgICAgICAgICBjaGVja01lZGlhUGVybWlzc2lvbjogJ3dlYicgIT09ICd3ZWInLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pLFxuICAgICAgYWN0aXZlQ29sb3I6ICdncmVlbicsXG4gICAgICBpbkFjdGl2ZUNvbG9yOiAncmVkJyxcbiAgICAgIGRpc2FibGVkOiB0aGlzLnZpZGVvU3dpdGNoaW5nLnZhbHVlLFxuICAgICAgc2hvdzogdHJ1ZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIC8vaW52ZXJ0ZWQgYWN0aXZlIGZvciBpbmFjdGl2ZSBzdGF0ZVxuICAgICAgaWNvbjogZmFEZXNrdG9wLFxuICAgICAgYWx0ZXJuYXRlSWNvbkNvbXBvbmVudDogdGhpcy5zY3JlZW5TaGFyZVdpZGdldCxcbiAgICAgIGFjdGl2ZTogdHJ1ZSxcbiAgICAgIG9uUHJlc3M6ICgpID0+XG4gICAgICAgIHRoaXMuY2xpY2tTY3JlZW5TaGFyZS5jbGlja1NjcmVlblNoYXJlKHtcbiAgICAgICAgICBwYXJhbWV0ZXJzOiB7XG4gICAgICAgICAgICAuLi50aGlzLmdldEFsbFBhcmFtcygpLFxuICAgICAgICAgICAgLi4udGhpcy5tZWRpYVNGVUZ1bmN0aW9ucygpLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pLFxuICAgICAgYWN0aXZlQ29sb3I6ICdncmVlbicsXG4gICAgICBpbkFjdGl2ZUNvbG9yOiAncmVkJyxcbiAgICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICAgIHNob3c6IHRydWUsXG4gICAgfSxcbiAgICB7XG4gICAgICBpY29uOiB0aGlzLmZhUGhvbmUsXG4gICAgICBhY3RpdmU6IHRoaXMuZW5kQ2FsbEFjdGl2ZS52YWx1ZSxcbiAgICAgIG9uUHJlc3M6ICgpID0+XG4gICAgICAgIHRoaXMubGF1bmNoQ29uZmlybUV4aXQubGF1bmNoQ29uZmlybUV4aXQoe1xuICAgICAgICAgIHVwZGF0ZUlzQ29uZmlybUV4aXRNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNDb25maXJtRXhpdE1vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuICAgICAgICAgIGlzQ29uZmlybUV4aXRNb2RhbFZpc2libGU6IHRoaXMuaXNDb25maXJtRXhpdE1vZGFsVmlzaWJsZS52YWx1ZSxcbiAgICAgICAgfSksXG4gICAgICBhY3RpdmVDb2xvcjogJ2dyZWVuJyxcbiAgICAgIGluQWN0aXZlQ29sb3I6ICdyZWQnLFxuICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxuICAgICAgc2hvdzogdHJ1ZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGljb246IHRoaXMuZmFVc2VycyxcbiAgICAgIGFjdGl2ZTogdGhpcy5wYXJ0aWNpcGFudHNBY3RpdmUudmFsdWUsXG4gICAgICBvblByZXNzOiAoKSA9PlxuICAgICAgICB0aGlzLmxhdW5jaFBhcnRpY2lwYW50cy5sYXVuY2hQYXJ0aWNpcGFudHMoe1xuICAgICAgICAgIHVwZGF0ZUlzUGFydGljaXBhbnRzTW9kYWxWaXNpYmxlOiB0aGlzLnVwZGF0ZUlzUGFydGljaXBhbnRzTW9kYWxWaXNpYmxlLmJpbmQodGhpcyksXG4gICAgICAgICAgaXNQYXJ0aWNpcGFudHNNb2RhbFZpc2libGU6IHRoaXMuaXNQYXJ0aWNpcGFudHNNb2RhbFZpc2libGUudmFsdWUsXG4gICAgICAgIH0pLFxuICAgICAgYWN0aXZlQ29sb3I6ICdibGFjaycsXG4gICAgICBpbkFjdGl2ZUNvbG9yOiAnYmxhY2snLFxuICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxuICAgICAgc2hvdzogdHJ1ZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGN1c3RvbUNvbXBvbmVudDogdGhpcy5tZW51V2lkZ2V0LFxuICAgICAgY3VzdG9tTmFtZTogJ01lbnUnLFxuICAgICAgb25QcmVzczogKCkgPT5cbiAgICAgICAgdGhpcy5sYXVuY2hNZW51TW9kYWwubGF1bmNoTWVudU1vZGFsKHtcbiAgICAgICAgICB1cGRhdGVJc01lbnVNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNNZW51TW9kYWxWaXNpYmxlLmJpbmQodGhpcyksXG4gICAgICAgICAgaXNNZW51TW9kYWxWaXNpYmxlOiB0aGlzLmlzTWVudU1vZGFsVmlzaWJsZS52YWx1ZSxcbiAgICAgICAgfSksXG4gICAgICBzaG93OiB0cnVlLFxuICAgIH0sXG4gICAge1xuICAgICAgY3VzdG9tQ29tcG9uZW50OiB0aGlzLm1lc3NhZ2VXaWRnZXQsXG4gICAgICBjdXN0b21OYW1lOiAnTWVzc2FnZXMnLFxuICAgICAgb25QcmVzczogKCkgPT5cbiAgICAgICAgdGhpcy5sYXVuY2hNZXNzYWdlcy5sYXVuY2hNZXNzYWdlcyh7XG4gICAgICAgICAgdXBkYXRlSXNNZXNzYWdlc01vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc01lc3NhZ2VzTW9kYWxWaXNpYmxlLmJpbmQodGhpcyksXG4gICAgICAgICAgaXNNZXNzYWdlc01vZGFsVmlzaWJsZTogdGhpcy5pc01lc3NhZ2VzTW9kYWxWaXNpYmxlLnZhbHVlLFxuICAgICAgICB9KSxcbiAgICAgIHNob3c6IHRydWUsXG4gICAgfSxcbiAgXTtcblxuICBhc3luYyBjb25uZWN0X1NvY2tldChcbiAgICBhcGlVc2VyTmFtZTogc3RyaW5nLFxuICAgIGFwaUtleTogc3RyaW5nLFxuICAgIGFwaVRva2VuOiBzdHJpbmcsXG4gICk6IFByb21pc2U8U29ja2V0IHwgbnVsbD4ge1xuICAgIGlmICh0aGlzLnNvY2tldC52YWx1ZSAmJiB0aGlzLnNvY2tldC52YWx1ZS5pZCkge1xuICAgICAgdGhpcy5zb2NrZXQudmFsdWUub24oJ2Rpc2Nvbm5lY3QnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGF3YWl0IHRoaXMuZGlzY29ubmVjdC5kaXNjb25uZWN0KHtcbiAgICAgICAgICBzaG93QWxlcnQ6IHRoaXMuc2hvd0FsZXJ0LmJpbmQodGhpcyksXG4gICAgICAgICAgcmVkaXJlY3RVUkw6IHRoaXMucmVkaXJlY3RVUkwudmFsdWUsXG4gICAgICAgICAgb25XZWI6IHRydWUsXG4gICAgICAgICAgdXBkYXRlVmFsaWRhdGVkOiB0aGlzLnVwZGF0ZVZhbGlkYXRlZC5iaW5kKHRoaXMpLFxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHRoaXMudmlkZW9BbHJlYWR5T24udmFsdWUpIHtcbiAgICAgICAgICBhd2FpdCB0aGlzLmNsaWNrVmlkZW8uY2xpY2tWaWRlbyh7XG4gICAgICAgICAgICBwYXJhbWV0ZXJzOiB7IC4uLnRoaXMuZ2V0QWxsUGFyYW1zKCksIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmF1ZGlvQWxyZWFkeU9uLnZhbHVlKSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5jbGlja0F1ZGlvLmNsaWNrQXVkaW8oe1xuICAgICAgICAgICAgcGFyYW1ldGVyczogeyAuLi50aGlzLmdldEFsbFBhcmFtcygpLCAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCkgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGF3YWl0IHRoaXMuY2xvc2VBbmRSZXNldCgpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuc29ja2V0LnZhbHVlLm9uKCdhbGxNZW1iZXJzJywgYXN5bmMgKG1lbWJlcnNEYXRhOiBBbGxNZW1iZXJzRGF0YSkgPT4ge1xuICAgICAgICBpZiAobWVtYmVyc0RhdGEpIHtcbiAgICAgICAgICBhd2FpdCB0aGlzLmFsbE1lbWJlcnMuYWxsTWVtYmVycyh7XG4gICAgICAgICAgICBhcGlVc2VyTmFtZTogYXBpVXNlck5hbWUsXG4gICAgICAgICAgICBhcGlLZXk6ICcnLCAvL25vdCByZWNvbW1lbmRlZCAtIHVzZSBhcGlUb2tlbiBpbnN0ZWFkLiBVc2UgZm9yIHRlc3RpbmcvZGV2ZWxvcG1lbnQgb25seVxuICAgICAgICAgICAgYXBpVG9rZW46IGFwaVRva2VuLFxuICAgICAgICAgICAgbWVtYmVyczogbWVtYmVyc0RhdGEubWVtYmVycyxcbiAgICAgICAgICAgIHJlcXVlc3RzczogbWVtYmVyc0RhdGEucmVxdWVzdHMgPyBtZW1iZXJzRGF0YS5yZXF1ZXN0cyA6IHRoaXMucmVxdWVzdExpc3QudmFsdWUsXG4gICAgICAgICAgICBjb0hvc3RlOiBtZW1iZXJzRGF0YS5jb0hvc3QgPyBtZW1iZXJzRGF0YS5jb0hvc3QgOiB0aGlzLmNvSG9zdC52YWx1ZSxcbiAgICAgICAgICAgIGNvSG9zdFJlczogbWVtYmVyc0RhdGEuY29Ib3N0UmVzcG9uc2liaWxpdGllc1xuICAgICAgICAgICAgICA/IG1lbWJlcnNEYXRhLmNvSG9zdFJlc3BvbnNpYmlsaXRpZXNcbiAgICAgICAgICAgICAgOiB0aGlzLmNvSG9zdFJlc3BvbnNpYmlsaXR5LnZhbHVlLFxuICAgICAgICAgICAgcGFyYW1ldGVyczogeyAuLi50aGlzLmdldEFsbFBhcmFtcygpLCAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCkgfSxcbiAgICAgICAgICAgIGNvbnN1bWVfc29ja2V0czogdGhpcy5jb25zdW1lX3NvY2tldHMudmFsdWUsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnNvY2tldC52YWx1ZS5vbignYWxsTWVtYmVyc1Jlc3QnLCBhc3luYyAobWVtYmVyc0RhdGE6IEFsbE1lbWJlcnNSZXN0RGF0YSkgPT4ge1xuICAgICAgICBpZiAobWVtYmVyc0RhdGEpIHtcbiAgICAgICAgICBhd2FpdCB0aGlzLmFsbE1lbWJlcnNSZXN0LmFsbE1lbWJlcnNSZXN0KHtcbiAgICAgICAgICAgIGFwaVVzZXJOYW1lOiBhcGlVc2VyTmFtZSxcbiAgICAgICAgICAgIGFwaUtleTogJycsIC8vIG5vdCByZWNvbW1lbmRlZCAtIHVzZSBhcGlUb2tlbiBpbnN0ZWFkLiBVc2UgZm9yIHRlc3RpbmcvZGV2ZWxvcG1lbnQgb25seVxuICAgICAgICAgICAgbWVtYmVyczogbWVtYmVyc0RhdGEubWVtYmVycyxcbiAgICAgICAgICAgIGFwaVRva2VuOiBhcGlUb2tlbixcbiAgICAgICAgICAgIHNldHRpbmdzOiBtZW1iZXJzRGF0YS5zZXR0aW5ncyxcbiAgICAgICAgICAgIGNvSG9zdGU6IG1lbWJlcnNEYXRhLmNvSG9zdCA/IG1lbWJlcnNEYXRhLmNvSG9zdCA6IHRoaXMuY29Ib3N0LnZhbHVlLFxuICAgICAgICAgICAgY29Ib3N0UmVzOiBtZW1iZXJzRGF0YS5jb0hvc3RSZXNwb25zaWJpbGl0aWVzXG4gICAgICAgICAgICAgID8gbWVtYmVyc0RhdGEuY29Ib3N0UmVzcG9uc2liaWxpdGllc1xuICAgICAgICAgICAgICA6IHRoaXMuY29Ib3N0UmVzcG9uc2liaWxpdHkudmFsdWUsXG4gICAgICAgICAgICBwYXJhbWV0ZXJzOiB7IC4uLnRoaXMuZ2V0QWxsUGFyYW1zKCksIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSB9LFxuICAgICAgICAgICAgY29uc3VtZV9zb2NrZXRzOiB0aGlzLmNvbnN1bWVfc29ja2V0cy52YWx1ZSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuc29ja2V0LnZhbHVlLm9uKCd1c2VyV2FpdGluZycsIGFzeW5jICh7IG5hbWUgfTogeyBuYW1lOiBzdHJpbmcgfSkgPT4ge1xuICAgICAgICBhd2FpdCB0aGlzLnVzZXJXYWl0aW5nLnVzZXJXYWl0aW5nKHtcbiAgICAgICAgICBuYW1lLFxuICAgICAgICAgIHNob3dBbGVydDogdGhpcy5zaG93QWxlcnQuYmluZCh0aGlzKSxcbiAgICAgICAgICB0b3RhbFJlcVdhaXQ6IHRoaXMudG90YWxSZXFXYWl0LnZhbHVlLFxuICAgICAgICAgIHVwZGF0ZVRvdGFsUmVxV2FpdDogdGhpcy51cGRhdGVUb3RhbFJlcVdhaXQuYmluZCh0aGlzKSxcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5zb2NrZXQudmFsdWUub24oJ3BlcnNvbkpvaW5lZCcsIGFzeW5jICh7IG5hbWUgfTogeyBuYW1lOiBzdHJpbmcgfSkgPT4ge1xuICAgICAgICB0aGlzLnBlcnNvbkpvaW5lZC5wZXJzb25Kb2luZWQoe1xuICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgc2hvd0FsZXJ0OiB0aGlzLnNob3dBbGVydC5iaW5kKHRoaXMpLFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnNvY2tldC52YWx1ZS5vbihcbiAgICAgICAgJ2FsbFdhaXRpbmdSb29tTWVtYmVycycsXG4gICAgICAgIGFzeW5jICh3YWl0aW5nX2RhdGE6IEFsbFdhaXRpbmdSb29tTWVtYmVyc0RhdGEpID0+IHtcbiAgICAgICAgICBhd2FpdCB0aGlzLmFsbFdhaXRpbmdSb29tTWVtYmVycy5hbGxXYWl0aW5nUm9vbU1lbWJlcnMoe1xuICAgICAgICAgICAgd2FpdGluZ1BhcnRpY2lwYW50czogd2FpdGluZ19kYXRhLndhaXRpbmdQYXJ0aWNpcGFudHNcbiAgICAgICAgICAgICAgPyB3YWl0aW5nX2RhdGEud2FpdGluZ1BhcnRpY2lwYW50c1xuICAgICAgICAgICAgICA6IHdhaXRpbmdfZGF0YS53YWl0aW5nUGFydGljaXBhbnRzc1xuICAgICAgICAgICAgICA/IHdhaXRpbmdfZGF0YS53YWl0aW5nUGFydGljaXBhbnRzc1xuICAgICAgICAgICAgICA6IHRoaXMud2FpdGluZ1Jvb21MaXN0LnZhbHVlLFxuICAgICAgICAgICAgdXBkYXRlVG90YWxSZXFXYWl0OiB0aGlzLnVwZGF0ZVRvdGFsUmVxV2FpdC5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgdXBkYXRlV2FpdGluZ1Jvb21MaXN0OiB0aGlzLnVwZGF0ZVdhaXRpbmdSb29tTGlzdC5iaW5kKHRoaXMpLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgKTtcblxuICAgICAgdGhpcy5zb2NrZXQudmFsdWUub24oXG4gICAgICAgICdyb29tUmVjb3JkUGFyYW1zJyxcbiAgICAgICAgYXN5bmMgKHsgcmVjb3JkUGFyYW1zIH06IHsgcmVjb3JkUGFyYW1zOiBSZWNvcmRQYXJhbXMgfSkgPT4ge1xuICAgICAgICAgIHRoaXMucm9vbVJlY29yZFBhcmFtcy5yb29tUmVjb3JkUGFyYW1zKHtcbiAgICAgICAgICAgIHJlY29yZFBhcmFtcyxcbiAgICAgICAgICAgIHBhcmFtZXRlcnM6IHsgLi4udGhpcy5nZXRBbGxQYXJhbXMoKSwgLi4udGhpcy5tZWRpYVNGVUZ1bmN0aW9ucygpIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICApO1xuXG4gICAgICB0aGlzLnNvY2tldC52YWx1ZS5vbignYmFuJywgYXN5bmMgKHsgbmFtZSB9OiB7IG5hbWU6IHN0cmluZyB9KSA9PiB7XG4gICAgICAgIGF3YWl0IHRoaXMuYmFuUGFydGljaXBhbnQuYmFuUGFydGljaXBhbnQoe1xuICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgcGFyYW1ldGVyczogeyAuLi50aGlzLmdldEFsbFBhcmFtcygpLCAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCkgfSxcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5zb2NrZXQudmFsdWUub24oJ3VwZGF0ZWRDb0hvc3QnLCBhc3luYyAoY29ob3N0X2RhdGE6IFVwZGF0ZWRDb0hvc3REYXRhKSA9PiB7XG4gICAgICAgIGF3YWl0IHRoaXMudXBkYXRlZENvSG9zdC51cGRhdGVkQ29Ib3N0KHtcbiAgICAgICAgICBjb0hvc3Q6IGNvaG9zdF9kYXRhLmNvSG9zdCA/IGNvaG9zdF9kYXRhLmNvSG9zdCA6IHRoaXMuY29Ib3N0LnZhbHVlLFxuICAgICAgICAgIGNvSG9zdFJlc3BvbnNpYmlsaXR5OiBjb2hvc3RfZGF0YS5jb0hvc3RSZXNwb25zaWJpbGl0aWVzXG4gICAgICAgICAgICA/IGNvaG9zdF9kYXRhLmNvSG9zdFJlc3BvbnNpYmlsaXRpZXNcbiAgICAgICAgICAgIDogdGhpcy5jb0hvc3RSZXNwb25zaWJpbGl0eS52YWx1ZSxcbiAgICAgICAgICB5b3VBcmVDb0hvc3Q6IHRoaXMueW91QXJlQ29Ib3N0LnZhbHVlLFxuICAgICAgICAgIHVwZGF0ZUNvSG9zdDogdGhpcy51cGRhdGVDb0hvc3QuYmluZCh0aGlzKSxcbiAgICAgICAgICB1cGRhdGVDb0hvc3RSZXNwb25zaWJpbGl0eTogdGhpcy51cGRhdGVDb0hvc3RSZXNwb25zaWJpbGl0eS5iaW5kKHRoaXMpLFxuICAgICAgICAgIHVwZGF0ZVlvdUFyZUNvSG9zdDogdGhpcy51cGRhdGVZb3VBcmVDb0hvc3QuYmluZCh0aGlzKSxcbiAgICAgICAgICBzaG93QWxlcnQ6IHRoaXMuc2hvd0FsZXJ0LmJpbmQodGhpcyksXG4gICAgICAgICAgZXZlbnRUeXBlOiB0aGlzLmV2ZW50VHlwZS52YWx1ZSxcbiAgICAgICAgICBpc2xldmVsOiB0aGlzLmlzbGV2ZWwudmFsdWUsXG4gICAgICAgICAgbWVtYmVyOiB0aGlzLm1lbWJlci52YWx1ZSxcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5zb2NrZXQudmFsdWUub24oXG4gICAgICAgICdwYXJ0aWNpcGFudFJlcXVlc3RlZCcsXG4gICAgICAgIGFzeW5jICh7IHVzZXJSZXF1ZXN0IH06IHsgdXNlclJlcXVlc3Q6IFJlcXVlc3QgfSkgPT4ge1xuICAgICAgICAgIGF3YWl0IHRoaXMucGFydGljaXBhbnRSZXF1ZXN0ZWQucGFydGljaXBhbnRSZXF1ZXN0ZWQoe1xuICAgICAgICAgICAgdXNlclJlcXVlc3QsXG4gICAgICAgICAgICByZXF1ZXN0TGlzdDogdGhpcy5yZXF1ZXN0TGlzdC52YWx1ZSxcbiAgICAgICAgICAgIHdhaXRpbmdSb29tTGlzdDogdGhpcy53YWl0aW5nUm9vbUxpc3QudmFsdWUsXG4gICAgICAgICAgICB1cGRhdGVUb3RhbFJlcVdhaXQ6IHRoaXMudXBkYXRlVG90YWxSZXFXYWl0LmJpbmQodGhpcyksXG4gICAgICAgICAgICB1cGRhdGVSZXF1ZXN0TGlzdDogdGhpcy51cGRhdGVSZXF1ZXN0TGlzdC5iaW5kKHRoaXMpLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgKTtcblxuICAgICAgdGhpcy5zb2NrZXQudmFsdWUub24oJ3NjcmVlblByb2R1Y2VySWQnLCBhc3luYyAoeyBwcm9kdWNlcklkIH06IHsgcHJvZHVjZXJJZDogc3RyaW5nIH0pID0+IHtcbiAgICAgICAgdGhpcy5zY3JlZW5Qcm9kdWNlcklkLnNjcmVlblByb2R1Y2VySWQoe1xuICAgICAgICAgIHByb2R1Y2VySWQsXG4gICAgICAgICAgc2NyZWVuSWQ6IHRoaXMuc2NyZWVuSWQudmFsdWUsXG4gICAgICAgICAgbWVtYmVyc1JlY2VpdmVkOiB0aGlzLm1lbWJlcnNSZWNlaXZlZC52YWx1ZSxcbiAgICAgICAgICBzaGFyZVNjcmVlblN0YXJ0ZWQ6IHRoaXMuc2hhcmVTY3JlZW5TdGFydGVkLnZhbHVlLFxuICAgICAgICAgIGRlZmVyU2NyZWVuUmVjZWl2ZWQ6IHRoaXMuZGVmZXJTY3JlZW5SZWNlaXZlZC52YWx1ZSxcbiAgICAgICAgICBwYXJ0aWNpcGFudHM6IHRoaXMucGFydGljaXBhbnRzLnZhbHVlLFxuICAgICAgICAgIHVwZGF0ZVNjcmVlbklkOiB0aGlzLnVwZGF0ZVNjcmVlbklkLmJpbmQodGhpcyksXG4gICAgICAgICAgdXBkYXRlU2hhcmVTY3JlZW5TdGFydGVkOiB0aGlzLnVwZGF0ZVNoYXJlU2NyZWVuU3RhcnRlZC5iaW5kKHRoaXMpLFxuICAgICAgICAgIHVwZGF0ZURlZmVyU2NyZWVuUmVjZWl2ZWQ6IHRoaXMudXBkYXRlRGVmZXJTY3JlZW5SZWNlaXZlZC5iaW5kKHRoaXMpLFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgLy9zZXR0aW5ncywgdXBkYXRlQXVkaW9TZXR0aW5nLCB1cGRhdGVWaWRlb1NldHRpbmcsIHVwZGF0ZVNjcmVlbnNoYXJlU2V0dGluZywgdXBkYXRlQ2hhdFNldHRpbmdcbiAgICAgIHRoaXMuc29ja2V0LnZhbHVlLm9uKCd1cGRhdGVNZWRpYVNldHRpbmdzJywgYXN5bmMgKHsgc2V0dGluZ3MgfTogeyBzZXR0aW5nczogU2V0dGluZ3MgfSkgPT4ge1xuICAgICAgICB0aGlzLnVwZGF0ZU1lZGlhU2V0dGluZ3MudXBkYXRlTWVkaWFTZXR0aW5ncyh7XG4gICAgICAgICAgc2V0dGluZ3MsXG4gICAgICAgICAgdXBkYXRlQXVkaW9TZXR0aW5nOiB0aGlzLnVwZGF0ZUF1ZGlvU2V0dGluZy5iaW5kKHRoaXMpLFxuICAgICAgICAgIHVwZGF0ZVZpZGVvU2V0dGluZzogdGhpcy51cGRhdGVWaWRlb1NldHRpbmcuYmluZCh0aGlzKSxcbiAgICAgICAgICB1cGRhdGVTY3JlZW5zaGFyZVNldHRpbmc6IHRoaXMudXBkYXRlU2NyZWVuc2hhcmVTZXR0aW5nLmJpbmQodGhpcyksXG4gICAgICAgICAgdXBkYXRlQ2hhdFNldHRpbmc6IHRoaXMudXBkYXRlQ2hhdFNldHRpbmcuYmluZCh0aGlzKSxcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5zb2NrZXQudmFsdWUub24oXG4gICAgICAgICdwcm9kdWNlci1tZWRpYS1wYXVzZWQnLFxuICAgICAgICBhc3luYyAoe1xuICAgICAgICAgIHByb2R1Y2VySWQsXG4gICAgICAgICAga2luZCxcbiAgICAgICAgICBuYW1lLFxuICAgICAgICB9OiB7XG4gICAgICAgICAgcHJvZHVjZXJJZDogc3RyaW5nO1xuICAgICAgICAgIGtpbmQ6ICd2aWRlbycgfCAnYXVkaW8nIHwgJ3NjcmVlbnNoYXJlJyB8ICdzY3JlZW4nO1xuICAgICAgICAgIG5hbWU6IHN0cmluZztcbiAgICAgICAgfSkgPT4ge1xuICAgICAgICAgIGF3YWl0IHRoaXMucHJvZHVjZXJNZWRpYVBhdXNlZC5wcm9kdWNlck1lZGlhUGF1c2VkKHtcbiAgICAgICAgICAgIHByb2R1Y2VySWQsXG4gICAgICAgICAgICBraW5kLFxuICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgIHBhcmFtZXRlcnM6IHsgLi4udGhpcy5nZXRBbGxQYXJhbXMoKSwgLi4udGhpcy5tZWRpYVNGVUZ1bmN0aW9ucygpIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICApO1xuXG4gICAgICB0aGlzLnNvY2tldC52YWx1ZS5vbihcbiAgICAgICAgJ3Byb2R1Y2VyLW1lZGlhLXJlc3VtZWQnLFxuICAgICAgICBhc3luYyAoeyBraW5kLCBuYW1lIH06IHsga2luZDogJ2F1ZGlvJzsgbmFtZTogc3RyaW5nIH0pID0+IHtcbiAgICAgICAgICBhd2FpdCB0aGlzLnByb2R1Y2VyTWVkaWFSZXN1bWVkLnByb2R1Y2VyTWVkaWFSZXN1bWVkKHtcbiAgICAgICAgICAgIGtpbmQsXG4gICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgcGFyYW1ldGVyczogeyAuLi50aGlzLmdldEFsbFBhcmFtcygpLCAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCkgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICk7XG5cbiAgICAgIHRoaXMuc29ja2V0LnZhbHVlLm9uKFxuICAgICAgICAncHJvZHVjZXItbWVkaWEtY2xvc2VkJyxcbiAgICAgICAgYXN5bmMgKHtcbiAgICAgICAgICBwcm9kdWNlcklkLFxuICAgICAgICAgIGtpbmQsXG4gICAgICAgIH06IHtcbiAgICAgICAgICBwcm9kdWNlcklkOiBzdHJpbmc7XG4gICAgICAgICAga2luZDogJ3ZpZGVvJyB8ICdhdWRpbycgfCAnc2NyZWVuc2hhcmUnIHwgJ3NjcmVlbic7XG4gICAgICAgIH0pID0+IHtcbiAgICAgICAgICBpZiAocHJvZHVjZXJJZCAmJiBraW5kKSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnByb2R1Y2VyTWVkaWFDbG9zZWQucHJvZHVjZXJNZWRpYUNsb3NlZCh7XG4gICAgICAgICAgICAgIHByb2R1Y2VySWQsXG4gICAgICAgICAgICAgIGtpbmQsXG4gICAgICAgICAgICAgIHBhcmFtZXRlcnM6IHsgLi4udGhpcy5nZXRBbGxQYXJhbXMoKSwgLi4udGhpcy5tZWRpYVNGVUZ1bmN0aW9ucygpIH0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICApO1xuXG4gICAgICB0aGlzLnNvY2tldC52YWx1ZS5vbihcbiAgICAgICAgJ2NvbnRyb2xNZWRpYUhvc3QnLFxuICAgICAgICBhc3luYyAoeyB0eXBlIH06IHsgdHlwZTogJ3ZpZGVvJyB8ICdhdWRpbycgfCAnc2NyZWVuc2hhcmUnIHwgJ2NoYXQnIHwgJ2FsbCcgfSkgPT4ge1xuICAgICAgICAgIGF3YWl0IHRoaXMuY29udHJvbE1lZGlhSG9zdC5jb250cm9sTWVkaWFIb3N0KHtcbiAgICAgICAgICAgIHR5cGUsXG4gICAgICAgICAgICBwYXJhbWV0ZXJzOiB7IC4uLnRoaXMuZ2V0QWxsUGFyYW1zKCksIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgKTtcblxuICAgICAgdGhpcy5zb2NrZXQudmFsdWUub24oJ21lZXRpbmdFbmRlZCcsIGFzeW5jICgpID0+IHtcbiAgICAgICAgYXdhaXQgdGhpcy5tZWV0aW5nRW5kZWQubWVldGluZ0VuZGVkKHtcbiAgICAgICAgICBzaG93QWxlcnQ6IHRoaXMuc2hvd0FsZXJ0LmJpbmQodGhpcyksXG4gICAgICAgICAgcmVkaXJlY3RVUkw6IHRoaXMucmVkaXJlY3RVUkwudmFsdWUsXG4gICAgICAgICAgb25XZWI6IHRydWUsXG4gICAgICAgICAgZXZlbnRUeXBlOiB0aGlzLmV2ZW50VHlwZS52YWx1ZSxcbiAgICAgICAgICB1cGRhdGVWYWxpZGF0ZWQ6IHRoaXMudXBkYXRlVmFsaWRhdGVkLmJpbmQodGhpcyksXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0aGlzLnZpZGVvQWxyZWFkeU9uLnZhbHVlKSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5jbGlja1ZpZGVvLmNsaWNrVmlkZW8oe1xuICAgICAgICAgICAgcGFyYW1ldGVyczoge1xuICAgICAgICAgICAgICAuLi50aGlzLmdldEFsbFBhcmFtcygpLFxuICAgICAgICAgICAgICAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmF1ZGlvQWxyZWFkeU9uLnZhbHVlKSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5jbGlja0F1ZGlvLmNsaWNrQXVkaW8oe1xuICAgICAgICAgICAgcGFyYW1ldGVyczoge1xuICAgICAgICAgICAgICAuLi50aGlzLmdldEFsbFBhcmFtcygpLFxuICAgICAgICAgICAgICAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgYXdhaXQgdGhpcy5jbG9zZUFuZFJlc2V0KCk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5zb2NrZXQudmFsdWUub24oJ2Rpc2Nvbm5lY3RVc2VyU2VsZicsIGFzeW5jICgpID0+IHtcbiAgICAgICAgYXdhaXQgdGhpcy5kaXNjb25uZWN0VXNlclNlbGYuZGlzY29ubmVjdFVzZXJTZWxmKHtcbiAgICAgICAgICBzb2NrZXQ6IHRoaXMuc29ja2V0LnZhbHVlLFxuICAgICAgICAgIG1lbWJlcjogdGhpcy5tZW1iZXIudmFsdWUsXG4gICAgICAgICAgcm9vbU5hbWU6IHRoaXMucm9vbU5hbWUudmFsdWUsXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuc29ja2V0LnZhbHVlLm9uKCdyZWNlaXZlTWVzc2FnZScsIGFzeW5jICh7IG1lc3NhZ2UgfTogeyBtZXNzYWdlOiBNZXNzYWdlIH0pID0+IHtcbiAgICAgICAgYXdhaXQgdGhpcy5yZWNlaXZlTWVzc2FnZS5yZWNlaXZlTWVzc2FnZSh7XG4gICAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgICBtZXNzYWdlczogdGhpcy5tZXNzYWdlcy52YWx1ZSxcbiAgICAgICAgICBwYXJ0aWNpcGFudHNBbGw6IHRoaXMucGFydGljaXBhbnRzQWxsLnZhbHVlLFxuICAgICAgICAgIG1lbWJlcjogdGhpcy5tZW1iZXIudmFsdWUsXG4gICAgICAgICAgZXZlbnRUeXBlOiB0aGlzLmV2ZW50VHlwZS52YWx1ZSxcbiAgICAgICAgICBpc2xldmVsOiB0aGlzLmlzbGV2ZWwudmFsdWUsXG4gICAgICAgICAgY29Ib3N0OiB0aGlzLmNvSG9zdC52YWx1ZSxcbiAgICAgICAgICB1cGRhdGVNZXNzYWdlczogdGhpcy51cGRhdGVNZXNzYWdlcy5iaW5kKHRoaXMpLFxuICAgICAgICAgIHVwZGF0ZVNob3dNZXNzYWdlc0JhZGdlOiB0aGlzLnVwZGF0ZVNob3dNZXNzYWdlc0JhZGdlLmJpbmQodGhpcyksXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuc29ja2V0LnZhbHVlLm9uKFxuICAgICAgICAnbWVldGluZ1RpbWVSZW1haW5pbmcnLFxuICAgICAgICBhc3luYyAoeyB0aW1lUmVtYWluaW5nIH06IHsgdGltZVJlbWFpbmluZzogbnVtYmVyIH0pID0+IHtcbiAgICAgICAgICBhd2FpdCB0aGlzLm1lZXRpbmdUaW1lUmVtYWluaW5nLm1lZXRpbmdUaW1lUmVtYWluaW5nKHtcbiAgICAgICAgICAgIHRpbWVSZW1haW5pbmcsXG4gICAgICAgICAgICBzaG93QWxlcnQ6IHRoaXMuc2hvd0FsZXJ0LmJpbmQodGhpcyksXG4gICAgICAgICAgICBldmVudFR5cGU6IHRoaXMuZXZlbnRUeXBlLnZhbHVlLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgKTtcblxuICAgICAgdGhpcy5zb2NrZXQudmFsdWUub24oJ21lZXRpbmdTdGlsbFRoZXJlJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICB0aGlzLm1lZXRpbmdTdGlsbFRoZXJlLm1lZXRpbmdTdGlsbFRoZXJlKHtcbiAgICAgICAgICB1cGRhdGVJc0NvbmZpcm1IZXJlTW9kYWxWaXNpYmxlOiB0aGlzLnVwZGF0ZUlzQ29uZmlybUhlcmVNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5zb2NrZXQudmFsdWUub24oJ3N0YXJ0UmVjb3JkcycsIGFzeW5jICgpID0+IHtcbiAgICAgICAgYXdhaXQgdGhpcy5zdGFydFJlY29yZHMuc3RhcnRSZWNvcmRzKHtcbiAgICAgICAgICByb29tTmFtZTogdGhpcy5yb29tTmFtZS52YWx1ZSxcbiAgICAgICAgICBtZW1iZXI6IHRoaXMubWVtYmVyLnZhbHVlLFxuICAgICAgICAgIHNvY2tldDogdGhpcy5zb2NrZXQudmFsdWUsXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuc29ja2V0LnZhbHVlLm9uKCdyZUluaXRpYXRlUmVjb3JkaW5nJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBhd2FpdCB0aGlzLnJlSW5pdGlhdGVSZWNvcmRpbmcucmVJbml0aWF0ZVJlY29yZGluZyh7XG4gICAgICAgICAgcm9vbU5hbWU6IHRoaXMucm9vbU5hbWUudmFsdWUsXG4gICAgICAgICAgbWVtYmVyOiB0aGlzLm1lbWJlci52YWx1ZSxcbiAgICAgICAgICBzb2NrZXQ6IHRoaXMuc29ja2V0LnZhbHVlLFxuICAgICAgICAgIGFkbWluUmVzdHJpY3RTZXR0aW5nOiB0aGlzLmFkbWluUmVzdHJpY3RTZXR0aW5nLnZhbHVlLFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnNvY2tldC52YWx1ZS5vbihcbiAgICAgICAgJ3VwZGF0ZUNvbnN1bWluZ0RvbWFpbnMnLFxuICAgICAgICBhc3luYyAoeyBkb21haW5zLCBhbHRfZG9tYWlucyB9OiBVcGRhdGVDb25zdW1pbmdEb21haW5zRGF0YSkgPT4ge1xuICAgICAgICAgIGF3YWl0IHRoaXMudXBkYXRlQ29uc3VtaW5nRG9tYWlucy51cGRhdGVDb25zdW1pbmdEb21haW5zKHtcbiAgICAgICAgICAgIGRvbWFpbnMsXG4gICAgICAgICAgICBhbHRfZG9tYWlucyxcbiAgICAgICAgICAgIGFwaVVzZXJOYW1lLFxuICAgICAgICAgICAgYXBpS2V5LFxuICAgICAgICAgICAgYXBpVG9rZW4sXG4gICAgICAgICAgICBwYXJhbWV0ZXJzOiB7XG4gICAgICAgICAgICAgIC4uLnRoaXMuZ2V0QWxsUGFyYW1zKCksXG4gICAgICAgICAgICAgIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICApO1xuXG4gICAgICB0aGlzLnNvY2tldC52YWx1ZS5vbihcbiAgICAgICAgJ1JlY29yZGluZ05vdGljZScsXG4gICAgICAgIGFzeW5jICh7IHN0YXRlLCB1c2VyUmVjb3JkaW5nUGFyYW0sIHBhdXNlQ291bnQsIHRpbWVEb25lIH06IFJlY29yZGluZ05vdGljZURhdGEpID0+IHtcbiAgICAgICAgICBhd2FpdCB0aGlzLnJlY29yZGluZ05vdGljZS5SZWNvcmRpbmdOb3RpY2Uoe1xuICAgICAgICAgICAgc3RhdGUsXG4gICAgICAgICAgICB1c2VyUmVjb3JkaW5nUGFyYW0sXG4gICAgICAgICAgICBwYXVzZUNvdW50LFxuICAgICAgICAgICAgdGltZURvbmUsXG4gICAgICAgICAgICBwYXJhbWV0ZXJzOiB7IC4uLnRoaXMuZ2V0QWxsUGFyYW1zKCksIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgKTtcblxuICAgICAgdGhpcy5zb2NrZXQudmFsdWUub24oJ3RpbWVMZWZ0UmVjb3JkaW5nJywgYXN5bmMgKHsgdGltZUxlZnQgfTogeyB0aW1lTGVmdDogbnVtYmVyIH0pID0+IHtcbiAgICAgICAgdGhpcy50aW1lTGVmdFJlY29yZGluZy50aW1lTGVmdFJlY29yZGluZyh7XG4gICAgICAgICAgdGltZUxlZnQsXG4gICAgICAgICAgc2hvd0FsZXJ0OiB0aGlzLnNob3dBbGVydC5iaW5kKHRoaXMpLFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnNvY2tldC52YWx1ZS5vbihcbiAgICAgICAgJ3N0b3BwZWRSZWNvcmRpbmcnLFxuICAgICAgICBhc3luYyAoeyBzdGF0ZSwgcmVhc29uIH06IHsgc3RhdGU6IHN0cmluZzsgcmVhc29uOiBzdHJpbmcgfSkgPT4ge1xuICAgICAgICAgIGF3YWl0IHRoaXMuc3RvcHBlZFJlY29yZGluZy5zdG9wcGVkUmVjb3JkaW5nKHtcbiAgICAgICAgICAgIHN0YXRlLFxuICAgICAgICAgICAgcmVhc29uLFxuICAgICAgICAgICAgc2hvd0FsZXJ0OiB0aGlzLnNob3dBbGVydC5iaW5kKHRoaXMpLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgKTtcbiAgICAgIHRoaXMuc29ja2V0LnZhbHVlLm9uKFxuICAgICAgICAnaG9zdFJlcXVlc3RSZXNwb25zZScsXG4gICAgICAgICh7IHJlcXVlc3RSZXNwb25zZSB9OiBIb3N0UmVxdWVzdFJlc3BvbnNlRGF0YSkgPT4ge1xuICAgICAgICAgIHRoaXMuaG9zdFJlcXVlc3RSZXNwb25zZS5ob3N0UmVxdWVzdFJlc3BvbnNlKHtcbiAgICAgICAgICAgIHJlcXVlc3RSZXNwb25zZSxcbiAgICAgICAgICAgIHNob3dBbGVydDogdGhpcy5zaG93QWxlcnQuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIHJlcXVlc3RMaXN0OiB0aGlzLnJlcXVlc3RMaXN0LnZhbHVlLFxuICAgICAgICAgICAgdXBkYXRlUmVxdWVzdExpc3Q6IHRoaXMudXBkYXRlUmVxdWVzdExpc3QuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIHVwZGF0ZU1pY0FjdGlvbjogdGhpcy51cGRhdGVNaWNBY3Rpb24uYmluZCh0aGlzKSxcbiAgICAgICAgICAgIHVwZGF0ZVZpZGVvQWN0aW9uOiB0aGlzLnVwZGF0ZVZpZGVvQWN0aW9uLmJpbmQodGhpcyksXG4gICAgICAgICAgICB1cGRhdGVTY3JlZW5BY3Rpb246IHRoaXMudXBkYXRlU2NyZWVuQWN0aW9uLmJpbmQodGhpcyksXG4gICAgICAgICAgICB1cGRhdGVDaGF0QWN0aW9uOiB0aGlzLnVwZGF0ZUNoYXRBY3Rpb24uYmluZCh0aGlzKSxcbiAgICAgICAgICAgIHVwZGF0ZUF1ZGlvUmVxdWVzdFN0YXRlOiB0aGlzLnVwZGF0ZUF1ZGlvUmVxdWVzdFN0YXRlLmJpbmQodGhpcyksXG4gICAgICAgICAgICB1cGRhdGVWaWRlb1JlcXVlc3RTdGF0ZTogdGhpcy51cGRhdGVWaWRlb1JlcXVlc3RTdGF0ZS5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgdXBkYXRlU2NyZWVuUmVxdWVzdFN0YXRlOiB0aGlzLnVwZGF0ZVNjcmVlblJlcXVlc3RTdGF0ZS5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgdXBkYXRlQ2hhdFJlcXVlc3RTdGF0ZTogdGhpcy51cGRhdGVDaGF0UmVxdWVzdFN0YXRlLmJpbmQodGhpcyksXG4gICAgICAgICAgICB1cGRhdGVBdWRpb1JlcXVlc3RUaW1lOiB0aGlzLnVwZGF0ZUF1ZGlvUmVxdWVzdFRpbWUuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIHVwZGF0ZVZpZGVvUmVxdWVzdFRpbWU6IHRoaXMudXBkYXRlVmlkZW9SZXF1ZXN0VGltZS5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgdXBkYXRlU2NyZWVuUmVxdWVzdFRpbWU6IHRoaXMudXBkYXRlU2NyZWVuUmVxdWVzdFRpbWUuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIHVwZGF0ZUNoYXRSZXF1ZXN0VGltZTogdGhpcy51cGRhdGVDaGF0UmVxdWVzdFRpbWUuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIHVwZGF0ZVJlcXVlc3RJbnRlcnZhbFNlY29uZHM6IHRoaXMudXBkYXRlUmVxdWVzdEludGVydmFsU2Vjb25kcy52YWx1ZSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICk7XG4gICAgICB0aGlzLnNvY2tldC52YWx1ZS5vbigncG9sbFVwZGF0ZWQnLCBhc3luYyAoZGF0YTogUG9sbFVwZGF0ZWREYXRhKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5wb2xsVXBkYXRlZC5wb2xsVXBkYXRlZCh7XG4gICAgICAgICAgICBkYXRhLFxuICAgICAgICAgICAgcG9sbHM6IHRoaXMucG9sbHMudmFsdWUsXG4gICAgICAgICAgICBwb2xsOiB0aGlzLnBvbGwudmFsdWUgPyB0aGlzLnBvbGwudmFsdWUgOiAoe30gYXMgUG9sbCksXG4gICAgICAgICAgICBtZW1iZXI6IHRoaXMubWVtYmVyLnZhbHVlLFxuICAgICAgICAgICAgaXNsZXZlbDogdGhpcy5pc2xldmVsLnZhbHVlLFxuICAgICAgICAgICAgc2hvd0FsZXJ0OiB0aGlzLnNob3dBbGVydC5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgdXBkYXRlUG9sbHM6IHRoaXMudXBkYXRlUG9sbHMuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIHVwZGF0ZVBvbGw6IHRoaXMudXBkYXRlUG9sbC5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgdXBkYXRlSXNQb2xsTW9kYWxWaXNpYmxlOiB0aGlzLnVwZGF0ZUlzUG9sbE1vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAvKiBoYW5kbGUgZXJyb3IgKi9cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuc29ja2V0LnZhbHVlLm9uKCdicmVha291dFJvb21VcGRhdGVkJywgYXN5bmMgKGRhdGE6IEJyZWFrb3V0Um9vbVVwZGF0ZWREYXRhKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5icmVha291dFJvb21VcGRhdGVkLmJyZWFrb3V0Um9vbVVwZGF0ZWQoe1xuICAgICAgICAgICAgZGF0YSxcbiAgICAgICAgICAgIHBhcmFtZXRlcnM6IHsgLi4udGhpcy5nZXRBbGxQYXJhbXMoKSwgLi4udGhpcy5tZWRpYVNGVUZ1bmN0aW9ucygpIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgIC8qIGhhbmRsZSBlcnJvciAqL1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgYXdhaXQgdGhpcy5qb2luX1Jvb20oe1xuICAgICAgICBzb2NrZXQ6IHRoaXMuc29ja2V0LnZhbHVlLFxuICAgICAgICByb29tTmFtZTogdGhpcy5yb29tTmFtZS52YWx1ZSxcbiAgICAgICAgaXNsZXZlbDogdGhpcy5pc2xldmVsLnZhbHVlLFxuICAgICAgICBtZW1iZXI6IHRoaXMubWVtYmVyLnZhbHVlLFxuICAgICAgICBzZWM6IHRoaXMuYXBpVG9rZW4udmFsdWUsXG4gICAgICAgIGFwaVVzZXJOYW1lOiB0aGlzLmFwaVVzZXJOYW1lLnZhbHVlLFxuICAgICAgfSk7XG4gICAgICBhd2FpdCB0aGlzLnJlY2VpdmVSb29tTWVzc2FnZXMucmVjZWl2ZVJvb21NZXNzYWdlcyh7XG4gICAgICAgIHNvY2tldDogdGhpcy5zb2NrZXQudmFsdWUsXG4gICAgICAgIHJvb21OYW1lOiB0aGlzLnJvb21OYW1lLnZhbHVlLFxuICAgICAgICB1cGRhdGVNZXNzYWdlczogdGhpcy51cGRhdGVNZXNzYWdlcy5iaW5kKHRoaXMpLFxuICAgICAgfSk7XG4gICAgICB0aGlzLnByZXBvcHVsYXRlVXNlck1lZGlhLnByZXBvcHVsYXRlVXNlck1lZGlhKHtcbiAgICAgICAgbmFtZTogdGhpcy5ob3N0TGFiZWwudmFsdWUsXG4gICAgICAgIHBhcmFtZXRlcnM6IHsgLi4udGhpcy5nZXRBbGxQYXJhbXMoKSwgLi4udGhpcy5tZWRpYVNGVUZ1bmN0aW9ucygpIH0sXG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHRoaXMuc29ja2V0LnZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cbn1cbiJdfQ==