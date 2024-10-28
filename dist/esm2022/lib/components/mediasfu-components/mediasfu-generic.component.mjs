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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWFzZnUtZ2VuZXJpYy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29tcG9uZW50cy9tZWRpYXNmdS1jb21wb25lbnRzL21lZGlhc2Z1LWdlbmVyaWMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLFFBQVEsRUFFUixLQUFLLEdBR04sTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbkQsT0FBTyxFQUFFLGVBQWUsRUFBZ0IsYUFBYSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXBFLE9BQU8sRUFDTCxZQUFZLEVBQ1osYUFBYSxFQUNiLFlBQVksRUFDWixXQUFXLEVBQ1gsYUFBYSxFQUNiLEtBQUssRUFDTCxPQUFPLEVBQ1AsT0FBTyxFQUNQLFVBQVUsRUFDVixPQUFPLEVBQ1AsU0FBUyxFQUNULE1BQU0sRUFDTixhQUFhLEVBQ2IsbUJBQW1CLEVBQ25CLFlBQVksRUFDWixpQkFBaUIsRUFDakIsT0FBTyxFQUNQLFlBQVksRUFDWixVQUFVLEVBQ1YsTUFBTSxFQUNOLE9BQU8sRUFDUCxNQUFNLEVBQ04sVUFBVSxFQUNWLFVBQVUsR0FDWCxNQUFNLG1DQUFtQyxDQUFDO0FBRTNDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBRTdFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDZFQUE2RSxDQUFDO0FBQ2xILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw2REFBNkQsQ0FBQztBQUMzRixPQUFPLEVBQUUsdUJB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c0I7d0JBQ3RCLGlCQUFpQjtxQkFDbEIsWUFDUzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdhVCxhQVFVLENBQUMsYUFBYSxDQUFDOzgwSEFJMUIsV0FBVztzQkFEVixLQUFLO2dCQUVHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csY0FBYztzQkFBdEIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSztnQkFDRyxNQUFNO3NCQUFkLEtBQUs7Z0JBODBHQSxZQUFZO3NCQUZqQixZQUFZO3VCQUFDLGVBQWU7O3NCQUM1QixZQUFZO3VCQUFDLDBCQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSG9zdExpc3RlbmVyLFxuICBJbmplY3RvcixcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXJPdXRsZXQgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IENvb2tpZVNlcnZpY2UgfSBmcm9tICduZ3gtY29va2llLXNlcnZpY2UnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBTdWJzY3JpcHRpb24sIGNvbWJpbmVMYXRlc3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFNvY2tldCB9IGZyb20gJ3NvY2tldC5pby1jbGllbnQnO1xuaW1wb3J0IHtcbiAgZmFQbGF5Q2lyY2xlLFxuICBmYVBhdXNlQ2lyY2xlLFxuICBmYVN0b3BDaXJjbGUsXG4gIGZhRG90Q2lyY2xlLFxuICBmYVJlY29yZFZpbnlsLFxuICBmYUNvZyxcbiAgZmFVc2VycyxcbiAgZmFDbG9jayxcbiAgZmFVc2VyUGx1cyxcbiAgZmFUb29scyxcbiAgZmFEZXNrdG9wLFxuICBmYVBvbGwsXG4gIGZhVXNlckZyaWVuZHMsXG4gIGZhQ2hhbGtib2FyZFRlYWNoZXIsXG4gIGZhTWljcm9waG9uZSxcbiAgZmFNaWNyb3Bob25lU2xhc2gsXG4gIGZhVmlkZW8sXG4gIGZhVmlkZW9TbGFzaCxcbiAgZmFTaGFyZUFsdCxcbiAgZmFTeW5jLFxuICBmYVBob25lLFxuICBmYUJhcnMsXG4gIGZhQ29tbWVudHMsXG4gIGZhQ2hhcnRCYXIsXG59IGZyb20gJ0Bmb3J0YXdlc29tZS9mcmVlLXNvbGlkLXN2Zy1pY29ucyc7XG5cbmltcG9ydCB7IGluaXRpYWxWYWx1ZXNTdGF0ZSB9IGZyb20gJy4uLy4uL21ldGhvZHMvdXRpbHMvaW5pdGlhbC12YWx1ZXMudXRpbCc7XG5cbmltcG9ydCB7IE1haW5Bc3BlY3RDb21wb25lbnQgfSBmcm9tICcuLi9kaXNwbGF5LWNvbXBvbmVudHMvbWFpbi1hc3BlY3QtY29tcG9uZW50L21haW4tYXNwZWN0LWNvbXBvbmVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTG9hZGluZ01vZGFsIH0gZnJvbSAnLi4vZGlzcGxheS1jb21wb25lbnRzL2xvYWRpbmctbW9kYWwvbG9hZGluZy1tb2RhbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29udHJvbEJ1dHRvbnNDb21wb25lbnQgfSBmcm9tICcuLi9kaXNwbGF5LWNvbXBvbmVudHMvY29udHJvbC1idXR0b25zLWNvbXBvbmVudC9jb250cm9sLWJ1dHRvbnMtY29tcG9uZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb250cm9sQnV0dG9uc0FsdENvbXBvbmVudCB9IGZyb20gJy4uL2Rpc3BsYXktY29tcG9uZW50cy9jb250cm9sLWJ1dHRvbnMtYWx0LWNvbXBvbmVudC9jb250cm9sLWJ1dHRvbnMtYWx0LWNvbXBvbmVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29udHJvbEJ1dHRvbnNDb21wb25lbnRUb3VjaCB9IGZyb20gJy4uL2Rpc3BsYXktY29tcG9uZW50cy9jb250cm9sLWJ1dHRvbnMtY29tcG9uZW50LXRvdWNoL2NvbnRyb2wtYnV0dG9ucy1jb21wb25lbnQtdG91Y2guY29tcG9uZW50JztcbmltcG9ydCB7IE90aGVyR3JpZENvbXBvbmVudCB9IGZyb20gJy4uL2Rpc3BsYXktY29tcG9uZW50cy9vdGhlci1ncmlkLWNvbXBvbmVudC9vdGhlci1ncmlkLWNvbXBvbmVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWFpblNjcmVlbkNvbXBvbmVudCB9IGZyb20gJy4uL2Rpc3BsYXktY29tcG9uZW50cy9tYWluLXNjcmVlbi1jb21wb25lbnQvbWFpbi1zY3JlZW4tY29tcG9uZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYWluR3JpZENvbXBvbmVudCB9IGZyb20gJy4uL2Rpc3BsYXktY29tcG9uZW50cy9tYWluLWdyaWQtY29tcG9uZW50L21haW4tZ3JpZC1jb21wb25lbnQuY29tcG9uZW50JztcbmltcG9ydCB7IFN1YkFzcGVjdENvbXBvbmVudCB9IGZyb20gJy4uL2Rpc3BsYXktY29tcG9uZW50cy9zdWItYXNwZWN0LWNvbXBvbmVudC9zdWItYXNwZWN0LWNvbXBvbmVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWFpbkNvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4uL2Rpc3BsYXktY29tcG9uZW50cy9tYWluLWNvbnRhaW5lci1jb21wb25lbnQvbWFpbi1jb250YWluZXItY29tcG9uZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBbGVydENvbXBvbmVudCB9IGZyb20gJy4uL2Rpc3BsYXktY29tcG9uZW50cy9hbGVydC1jb21wb25lbnQvYWxlcnQuY29tcG9uZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNZW51TW9kYWwgfSBmcm9tICcuLi9tZW51LWNvbXBvbmVudHMvbWVudS1tb2RhbC9tZW51LW1vZGFsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSZWNvcmRpbmdNb2RhbCB9IGZyb20gJy4uL3JlY29yZGluZy1jb21wb25lbnRzL3JlY29yZGluZy1tb2RhbC9yZWNvcmRpbmctbW9kYWwuY29tcG9uZW50JztcbmltcG9ydCB7IFJlcXVlc3RzTW9kYWwgfSBmcm9tICcuLi9yZXF1ZXN0cy1jb21wb25lbnRzL3JlcXVlc3RzLW1vZGFsL3JlcXVlc3RzLW1vZGFsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBXYWl0aW5nUm9vbU1vZGFsIH0gZnJvbSAnLi4vd2FpdGluZy1jb21wb25lbnRzL3dhaXRpbmctcm9vbS1tb2RhbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGlzcGxheVNldHRpbmdzTW9kYWwgfSBmcm9tICcuLi9kaXNwbGF5LXNldHRpbmdzLWNvbXBvbmVudHMvZGlzcGxheS1zZXR0aW5ncy1tb2RhbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRXZlbnRTZXR0aW5nc01vZGFsIH0gZnJvbSAnLi4vZXZlbnQtc2V0dGluZ3MtY29tcG9uZW50cy9ldmVudC1zZXR0aW5ncy1tb2RhbC9ldmVudC1zZXR0aW5ncy1tb2RhbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29Ib3N0TW9kYWwgfSBmcm9tICcuLi9jby1ob3N0LWNvbXBvbmVudHMvY28taG9zdC1tb2RhbC9jby1ob3N0LW1vZGFsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQYXJ0aWNpcGFudHNNb2RhbCB9IGZyb20gJy4uL3BhcnRpY2lwYW50cy1jb21wb25lbnRzL3BhcnRpY2lwYW50cy1tb2RhbC9wYXJ0aWNpcGFudHMtbW9kYWwuY29tcG9uZW50JztcbmltcG9ydCB7IE1lc3NhZ2VzTW9kYWwgfSBmcm9tICcuLi9tZXNzYWdlLWNvbXBvbmVudHMvbWVzc2FnZXMtbW9kYWwvbWVzc2FnZXMtbW9kYWwuY29tcG9uZW50JztcbmltcG9ydCB7IE1lZGlhU2V0dGluZ3NNb2RhbCB9IGZyb20gJy4uL21lZGlhLXNldHRpbmdzLWNvbXBvbmVudHMvbWVkaWEtc2V0dGluZ3MtbW9kYWwvbWVkaWEtc2V0dGluZ3MtbW9kYWwuY29tcG9uZW50JztcbmltcG9ydCB7IENvbmZpcm1FeGl0TW9kYWwgfSBmcm9tICcuLi9leGl0LWNvbXBvbmVudHMvY29uZmlybS1leGl0LW1vZGFsL2NvbmZpcm0tZXhpdC1tb2RhbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29uZmlybUhlcmVNb2RhbCB9IGZyb20gJy4uL21pc2MtY29tcG9uZW50cy9jb25maXJtLWhlcmUtbW9kYWwvY29uZmlybS1oZXJlLW1vZGFsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTaGFyZUV2ZW50TW9kYWwgfSBmcm9tICcuLi9taXNjLWNvbXBvbmVudHMvc2hhcmUtZXZlbnQtbW9kYWwvc2hhcmUtZXZlbnQtbW9kYWwuY29tcG9uZW50JztcbmltcG9ydCB7XG4gIFdlbGNvbWVQYWdlLFxuICBXZWxjb21lUGFnZU9wdGlvbnMsXG59IGZyb20gJy4uL21pc2MtY29tcG9uZW50cy93ZWxjb21lLXBhZ2Uvd2VsY29tZS1wYWdlLmNvbXBvbmVudCc7XG5cbmltcG9ydCB7IFBvbGxNb2RhbCB9IGZyb20gJy4uL3BvbGxzLWNvbXBvbmVudHMvcG9sbC1tb2RhbC9wb2xsLW1vZGFsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBCYWNrZ3JvdW5kTW9kYWwgfSBmcm9tICcuLi9iYWNrZ3JvdW5kLWNvbXBvbmVudHMvYmFja2dyb3VuZC1tb2RhbC9iYWNrZ3JvdW5kLW1vZGFsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBCcmVha291dFJvb21zTW9kYWwgfSBmcm9tICcuLi9icmVha291dC1jb21wb25lbnRzL2JyZWFrb3V0LXJvb21zLW1vZGFsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb25maWd1cmVXaGl0ZWJvYXJkTW9kYWwgfSBmcm9tICcuLi93aGl0ZWJvYXJkLWNvbXBvbmVudHMvY29uZmlndXJlLXdoaXRlYm9hcmQtbW9kYWwvY29uZmlndXJlLXdoaXRlYm9hcmQtbW9kYWwuY29tcG9uZW50JztcbmltcG9ydCB7IFdoaXRlYm9hcmQgfSBmcm9tICcuLi93aGl0ZWJvYXJkLWNvbXBvbmVudHMvd2hpdGVib2FyZC93aGl0ZWJvYXJkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTY3JlZW5ib2FyZCB9IGZyb20gJy4uL3NjcmVlbmJvYXJkLWNvbXBvbmVudHMvc2NyZWVuYm9hcmQvc2NyZWVuYm9hcmQuY29tcG9uZW50JztcbmltcG9ydCB7IFNjcmVlbmJvYXJkTW9kYWwgfSBmcm9tICcuLi9zY3JlZW5ib2FyZC1jb21wb25lbnRzL3NjcmVlbmJvYXJkLW1vZGFsL3NjcmVlbmJvYXJkLW1vZGFsLmNvbXBvbmVudCc7XG4vLyBwYWdpbmF0aW9uIGFuZCBkaXNwbGF5IG9mIG1lZGlhIChzYW1wbGVzKVxuaW1wb3J0IHsgUGFnaW5hdGlvbiB9IGZyb20gJy4uL2Rpc3BsYXktY29tcG9uZW50cy9wYWdpbmF0aW9uL3BhZ2luYXRpb24uY29tcG9uZW50JztcbmltcG9ydCB7IEZsZXhpYmxlR3JpZCB9IGZyb20gJy4uL2Rpc3BsYXktY29tcG9uZW50cy9mbGV4aWJsZS1ncmlkL2ZsZXhpYmxlLWdyaWQuY29tcG9uZW50JztcbmltcG9ydCB7IEZsZXhpYmxlVmlkZW8gfSBmcm9tICcuLi9kaXNwbGF5LWNvbXBvbmVudHMvZmxleGlibGUtdmlkZW8vZmxleGlibGUtdmlkZW8uY29tcG9uZW50JztcbmltcG9ydCB7IEF1ZGlvR3JpZCB9IGZyb20gJy4uL2Rpc3BsYXktY29tcG9uZW50cy9hdWRpby1ncmlkL2F1ZGlvLWdyaWQuY29tcG9uZW50JztcblxuaW1wb3J0IHsgTWVudVdpZGdldCB9IGZyb20gJy4uL2Rpc3BsYXktY29tcG9uZW50cy9jb250cm9sLXdpZGdldHMvbWVudS13aWRnZXQuY29tcG9uZW50JztcbmltcG9ydCB7IE1lc3NhZ2VXaWRnZXQgfSBmcm9tICcuLi9kaXNwbGF5LWNvbXBvbmVudHMvY29udHJvbC13aWRnZXRzL21lc3NhZ2Utd2lkZ2V0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNZW51UmVjb3JkV2lkZ2V0IH0gZnJvbSAnLi4vZGlzcGxheS1jb21wb25lbnRzL2NvbnRyb2wtd2lkZ2V0cy9tZW51LXJlY29yZC13aWRnZXQuY29tcG9uZW50JztcbmltcG9ydCB7IFJlY29yZFRpbWVyV2lkZ2V0IH0gZnJvbSAnLi4vZGlzcGxheS1jb21wb25lbnRzL2NvbnRyb2wtd2lkZ2V0cy9yZWNvcmQtdGltZXItd2lkZ2V0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNZW51UGFydGljaXBhbnRzV2lkZ2V0IH0gZnJvbSAnLi4vZGlzcGxheS1jb21wb25lbnRzL2NvbnRyb2wtd2lkZ2V0cy9tZW51LXBhcnRpY2lwYW50cy13aWRnZXQuY29tcG9uZW50JztcbmltcG9ydCB7IFNjcmVlblNoYXJlV2lkZ2V0IH0gZnJvbSAnLi4vZGlzcGxheS1jb21wb25lbnRzL2NvbnRyb2wtd2lkZ2V0cy9zY3JlZW5zaGFyZS13aWRnZXQuY29tcG9uZW50JztcblxuaW1wb3J0IHtcbiAgQnV0dG9uVG91Y2gsXG4gIFJlc3BvbnNlSm9pblJvb20sXG4gIENvSG9zdFJlc3BvbnNpYmlsaXR5LFxuICBFdmVudFR5cGUsXG4gIFBhcnRpY2lwYW50LFxuICBDb25zdW1lU29ja2V0LFxuICBNZWV0aW5nUm9vbVBhcmFtcyxcbiAgVmlkQ29ucyxcbiAgSFBhcmFtc1R5cGUsXG4gIFZQYXJhbXNUeXBlLFxuICBTY3JlZW5QYXJhbXNUeXBlLFxuICBBUGFyYW1zVHlwZSxcbiAgVXNlclJlY29yZGluZ1BhcmFtcyxcbiAgU3RyZWFtLFxuICBBdWRpb0RlY2liZWxzLFxuICBTY3JlZW5TdGF0ZSxcbiAgR3JpZFNpemVzLFxuICBDdXN0b21NZWRpYUNvbXBvbmVudCxcbiAgTWVzc2FnZSxcbiAgV2FpdGluZ1Jvb21QYXJ0aWNpcGFudCxcbiAgQ29tcG9uZW50U2l6ZXMsXG4gIFRyYW5zcG9ydCBhcyBUcmFuc3BvcnRUeXBlLFxuICBTaGFwZSxcbiAgUG9sbCxcbiAgQnJlYWtvdXRQYXJ0aWNpcGFudCxcbiAgV2hpdGVib2FyZFVzZXIsXG4gIFJlcXVlc3QsXG4gIEFsbE1lbWJlcnNEYXRhLFxuICBBbGxNZW1iZXJzUmVzdERhdGEsXG4gIEJyZWFrb3V0Um9vbVVwZGF0ZWREYXRhLFxuICBBbGxXYWl0aW5nUm9vbU1lbWJlcnNEYXRhLFxuICBNYWluQnV0dG9uQWx0LFxuICBNYWluQ3VzdG9tQnV0dG9uLFxuICBSZWNvcmRQYXJhbXMsXG4gIFNlZWREYXRhLFxuICBVcGRhdGVkQ29Ib3N0RGF0YSxcbiAgU2V0dGluZ3MsXG4gIFVwZGF0ZUNvbnN1bWluZ0RvbWFpbnNEYXRhLFxuICBSZWNvcmRpbmdOb3RpY2VEYXRhLFxuICBIb3N0UmVxdWVzdFJlc3BvbnNlRGF0YSxcbiAgUG9sbFVwZGF0ZWREYXRhLFxuICBQcmVKb2luUGFnZU9wdGlvbnMsXG59IGZyb20gJy4uLy4uL0B0eXBlcy90eXBlcyc7XG5cbi8vaW1wb3J0IG1ldGhvZHMgZm9yIGNvbnRyb2wgKHNhbXBsZXMpXG4vLyBJbXBvcnQgbWV0aG9kcyBmb3IgY29udHJvbCAoc2FtcGxlcylcbmltcG9ydCB7IExhdW5jaE1lbnVNb2RhbCB9IGZyb20gJy4uLy4uL21ldGhvZHMvbWVudS1tZXRob2RzL2xhdW5jaC1tZW51LW1vZGFsLnNlcnZpY2UnO1xuaW1wb3J0IHsgTGF1bmNoUmVjb3JkaW5nIH0gZnJvbSAnLi4vLi4vbWV0aG9kcy9yZWNvcmRpbmctbWV0aG9kcy9sYXVuY2gtcmVjb3JkaW5nLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3RhcnRSZWNvcmRpbmcgfSBmcm9tICcuLi8uLi9tZXRob2RzL3JlY29yZGluZy1tZXRob2RzL3N0YXJ0LXJlY29yZGluZy5zZXJ2aWNlJztcbmltcG9ydCB7IENvbmZpcm1SZWNvcmRpbmcgfSBmcm9tICcuLi8uLi9tZXRob2RzL3JlY29yZGluZy1tZXRob2RzL2NvbmZpcm0tcmVjb3JkaW5nLnNlcnZpY2UnO1xuaW1wb3J0IHsgTGF1bmNoV2FpdGluZyB9IGZyb20gJy4uLy4uL21ldGhvZHMvd2FpdGluZy1tZXRob2RzL2xhdW5jaC13YWl0aW5nLnNlcnZpY2UnO1xuaW1wb3J0IHsgbGF1bmNoQ29Ib3N0IH0gZnJvbSAnLi4vLi4vbWV0aG9kcy9jby1ob3N0LW1ldGhvZHMvbGF1bmNoLWNvLWhvc3Quc2VydmljZSc7XG5pbXBvcnQgeyBMYXVuY2hNZWRpYVNldHRpbmdzIH0gZnJvbSAnLi4vLi4vbWV0aG9kcy9tZWRpYS1zZXR0aW5ncy1tZXRob2RzL2xhdW5jaC1tZWRpYS1zZXR0aW5ncy5zZXJ2aWNlJztcbmltcG9ydCB7IExhdW5jaERpc3BsYXlTZXR0aW5ncyB9IGZyb20gJy4uLy4uL21ldGhvZHMvZGlzcGxheS1zZXR0aW5ncy1tZXRob2RzL2xhdW5jaC1kaXNwbGF5LXNldHRpbmdzLnNlcnZpY2UnO1xuaW1wb3J0IHsgTGF1bmNoU2V0dGluZ3MgfSBmcm9tICcuLi8uLi9tZXRob2RzL3NldHRpbmdzLW1ldGhvZHMvbGF1bmNoLXNldHRpbmdzLnNlcnZpY2UnO1xuaW1wb3J0IHsgTGF1bmNoUmVxdWVzdHMgfSBmcm9tICcuLi8uLi9tZXRob2RzL3JlcXVlc3RzLW1ldGhvZHMvbGF1bmNoLXJlcXVlc3RzLnNlcnZpY2UnO1xuaW1wb3J0IHsgTGF1bmNoUGFydGljaXBhbnRzIH0gZnJvbSAnLi4vLi4vbWV0aG9kcy9wYXJ0aWNpcGFudHMtbWV0aG9kcy9sYXVuY2gtcGFydGljaXBhbnRzLnNlcnZpY2UnO1xuaW1wb3J0IHsgTGF1bmNoTWVzc2FnZXMgfSBmcm9tICcuLi8uLi9tZXRob2RzL21lc3NhZ2UtbWV0aG9kcy9sYXVuY2gtbWVzc2FnZXMuc2VydmljZSc7XG5pbXBvcnQgeyBMYXVuY2hDb25maXJtRXhpdCB9IGZyb20gJy4uLy4uL21ldGhvZHMvZXhpdC1tZXRob2RzL2xhdW5jaC1jb25maXJtLWV4aXQuc2VydmljZSc7XG5cbmltcG9ydCB7IExhdW5jaFBvbGwgfSBmcm9tICcuLi8uLi9tZXRob2RzL3BvbGxzLW1ldGhvZHMvbGF1bmNoLXBvbGwuc2VydmljZSc7XG5pbXBvcnQgeyBMYXVuY2hCcmVha291dFJvb21zIH0gZnJvbSAnLi4vLi4vbWV0aG9kcy9icmVha291dC1yb29tLW1ldGhvZHMvbGF1bmNoLWJyZWFrb3V0LXJvb21zLnNlcnZpY2UnO1xuaW1wb3J0IHsgTGF1bmNoQ29uZmlndXJlV2hpdGVib2FyZCB9IGZyb20gJy4uLy4uL21ldGhvZHMvd2hpdGVib2FyZC1tZXRob2RzL2xhdW5jaC1jb25maWd1cmUtd2hpdGVib2FyZC5zZXJ2aWNlJztcblxuLy8gbWVkaWFzZnUgZnVuY3Rpb25zIC0tIGV4YW1wbGVzXG5pbXBvcnQgeyBTb2NrZXRNYW5hZ2VyIH0gZnJvbSAnLi4vLi4vc29ja2V0cy9zb2NrZXQtbWFuYWdlci5zZXJ2aWNlJztcbmltcG9ydCB7IEpvaW5Sb29tQ2xpZW50IH0gZnJvbSAnLi4vLi4vcHJvZHVjZXItY2xpZW50L3Byb2R1Y2VyLWNsaWVudC1lbWl0cy9qb2luLXJvb20tY2xpZW50LnNlcnZpY2UnO1xuaW1wb3J0IHsgVXBkYXRlUm9vbVBhcmFtZXRlcnNDbGllbnQgfSBmcm9tICcuLi8uLi9wcm9kdWNlci1jbGllbnQvcHJvZHVjZXItY2xpZW50LWVtaXRzL3VwZGF0ZS1yb29tLXBhcmFtZXRlcnMtY2xpZW50LnNlcnZpY2UnO1xuaW1wb3J0IHsgQ3JlYXRlRGV2aWNlQ2xpZW50IH0gZnJvbSAnLi4vLi4vcHJvZHVjZXItY2xpZW50L3Byb2R1Y2VyLWNsaWVudC1lbWl0cy9jcmVhdGUtZGV2aWNlLWNsaWVudC5zZXJ2aWNlJztcblxuaW1wb3J0IHsgU3dpdGNoVmlkZW9BbHQgfSBmcm9tICcuLi8uLi9tZXRob2RzL3N0cmVhbS1tZXRob2RzL3N3aXRjaC12aWRlby1hbHQuc2VydmljZSc7XG5pbXBvcnQgeyBDbGlja1ZpZGVvIH0gZnJvbSAnLi4vLi4vbWV0aG9kcy9zdHJlYW0tbWV0aG9kcy9jbGljay12aWRlby5zZXJ2aWNlJztcbmltcG9ydCB7IENsaWNrQXVkaW8gfSBmcm9tICcuLi8uLi9tZXRob2RzL3N0cmVhbS1tZXRob2RzL2NsaWNrLWF1ZGlvLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2xpY2tTY3JlZW5TaGFyZSB9IGZyb20gJy4uLy4uL21ldGhvZHMvc3RyZWFtLW1ldGhvZHMvY2xpY2stc2NyZWVuLXNoYXJlLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3RyZWFtU3VjY2Vzc1ZpZGVvIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL3N0cmVhbS1zdWNjZXNzLXZpZGVvLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3RyZWFtU3VjY2Vzc0F1ZGlvIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL3N0cmVhbS1zdWNjZXNzLWF1ZGlvLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3RyZWFtU3VjY2Vzc1NjcmVlbiB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9zdHJlYW0tc3VjY2Vzcy1zY3JlZW4uc2VydmljZSc7XG5pbXBvcnQgeyBTdHJlYW1TdWNjZXNzQXVkaW9Td2l0Y2ggfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvc3RyZWFtLXN1Y2Nlc3MtYXVkaW8tc3dpdGNoLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2hlY2tQZXJtaXNzaW9uIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL2NoZWNrLXBlcm1pc3Npb24uc2VydmljZSc7XG5cbi8vIG1lZGlhc2Z1IGZ1bmN0aW9uc1xuaW1wb3J0IHsgVXBkYXRlTWluaUNhcmRzR3JpZCB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy91cGRhdGUtbWluaS1jYXJkcy1ncmlkLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWl4U3RyZWFtcyB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9taXgtc3RyZWFtcy5zZXJ2aWNlJztcbmltcG9ydCB7IERpc3BTdHJlYW1zIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL2Rpc3Atc3RyZWFtcy5zZXJ2aWNlJztcbmltcG9ydCB7IFN0b3BTaGFyZVNjcmVlbiB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9zdG9wLXNoYXJlLXNjcmVlbi5zZXJ2aWNlJztcbmltcG9ydCB7IENoZWNrU2NyZWVuU2hhcmUgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvY2hlY2stc2NyZWVuLXNoYXJlLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3RhcnRTaGFyZVNjcmVlbiB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9zdGFydC1zaGFyZS1zY3JlZW4uc2VydmljZSc7XG5pbXBvcnQgeyBSZXF1ZXN0U2NyZWVuU2hhcmUgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvcmVxdWVzdC1zY3JlZW4tc2hhcmUuc2VydmljZSc7XG5pbXBvcnQgeyBSZW9yZGVyU3RyZWFtcyB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9yZW9yZGVyLXN0cmVhbXMuc2VydmljZSc7XG5pbXBvcnQgeyBQcmVwb3B1bGF0ZVVzZXJNZWRpYSB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9wcmVwb3B1bGF0ZS11c2VyLW1lZGlhLnNlcnZpY2UnO1xuaW1wb3J0IHsgR2V0VmlkZW9zIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL2dldC12aWRlb3Muc2VydmljZSc7XG5pbXBvcnQgeyBSZVBvcnQgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvcmUtcG9ydC5zZXJ2aWNlJztcbmltcG9ydCB7IFRyaWdnZXIgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvdHJpZ2dlci5zZXJ2aWNlJztcbmltcG9ydCB7IENvbnN1bWVyUmVzdW1lIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL2NvbnN1bWVyLXJlc3VtZS5zZXJ2aWNlJztcbmltcG9ydCB7IENvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW8gfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvY29ubmVjdC1zZW5kLXRyYW5zcG9ydC1hdWRpby5zZXJ2aWNlJztcbmltcG9ydCB7IENvbm5lY3RTZW5kVHJhbnNwb3J0VmlkZW8gfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvY29ubmVjdC1zZW5kLXRyYW5zcG9ydC12aWRlby5zZXJ2aWNlJztcbmltcG9ydCB7IENvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL2Nvbm5lY3Qtc2VuZC10cmFuc3BvcnQtc2NyZWVuLnNlcnZpY2UnO1xuaW1wb3J0IHsgUHJvY2Vzc0NvbnN1bWVyVHJhbnNwb3J0cyB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9wcm9jZXNzLWNvbnN1bWVyLXRyYW5zcG9ydHMuc2VydmljZSc7XG5pbXBvcnQgeyBSZXN1bWVQYXVzZVN0cmVhbXMgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvcmVzdW1lLXBhdXNlLXN0cmVhbXMuc2VydmljZSc7XG5pbXBvcnQgeyBSZWFkanVzdCB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9yZWFkanVzdC5zZXJ2aWNlJztcbmltcG9ydCB7IENoZWNrR3JpZCB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9jaGVjay1ncmlkLnNlcnZpY2UnO1xuaW1wb3J0IHsgR2V0RXN0aW1hdGUgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvZ2V0LWVzdGltYXRlLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2FsY3VsYXRlUm93c0FuZENvbHVtbnMgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvY2FsY3VsYXRlLXJvd3MtYW5kLWNvbHVtbnMuc2VydmljZSc7XG5pbXBvcnQgeyBBZGRWaWRlb3NHcmlkIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL2FkZC12aWRlb3MtZ3JpZC5zZXJ2aWNlJztcbmltcG9ydCB7IE9uU2NyZWVuQ2hhbmdlcyB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9vbi1zY3JlZW4tY2hhbmdlcy5zZXJ2aWNlJztcbmltcG9ydCB7IHNsZWVwIH0gZnJvbSAnLi4vLi4vbWV0aG9kcy91dGlscy9zbGVlcC51dGlsJztcbmltcG9ydCB7IENoYW5nZVZpZHMgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvY2hhbmdlLXZpZHMuc2VydmljZSc7XG5pbXBvcnQgeyBDb21wYXJlQWN0aXZlTmFtZXMgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvY29tcGFyZS1hY3RpdmUtbmFtZXMuc2VydmljZSc7XG5pbXBvcnQgeyBDb21wYXJlU2NyZWVuU3RhdGVzIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL2NvbXBhcmUtc2NyZWVuLXN0YXRlcy5zZXJ2aWNlJztcbmltcG9ydCB7IENyZWF0ZVNlbmRUcmFuc3BvcnQgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvY3JlYXRlLXNlbmQtdHJhbnNwb3J0LnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVzdW1lU2VuZFRyYW5zcG9ydEF1ZGlvIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL3Jlc3VtZS1zZW5kLXRyYW5zcG9ydC1hdWRpby5zZXJ2aWNlJztcbmltcG9ydCB7IFJlY2VpdmVBbGxQaXBlZFRyYW5zcG9ydHMgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvcmVjZWl2ZS1hbGwtcGlwZWQtdHJhbnNwb3J0cy5zZXJ2aWNlJztcbmltcG9ydCB7IERpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0VmlkZW8gfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvZGlzY29ubmVjdC1zZW5kLXRyYW5zcG9ydC12aWRlby5zZXJ2aWNlJztcbmltcG9ydCB7IERpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW8gfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvZGlzY29ubmVjdC1zZW5kLXRyYW5zcG9ydC1hdWRpby5zZXJ2aWNlJztcbmltcG9ydCB7IERpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL2Rpc2Nvbm5lY3Qtc2VuZC10cmFuc3BvcnQtc2NyZWVuLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29ubmVjdFNlbmRUcmFuc3BvcnQgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvY29ubmVjdC1zZW5kLXRyYW5zcG9ydC5zZXJ2aWNlJztcbmltcG9ydCB7IEdldFBpcGVkUHJvZHVjZXJzQWx0IH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL2dldC1waXBlZC1wcm9kdWNlcnMtYWx0LnNlcnZpY2UnO1xuaW1wb3J0IHsgU2lnbmFsTmV3Q29uc3VtZXJUcmFuc3BvcnQgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvc2lnbmFsLW5ldy1jb25zdW1lci10cmFuc3BvcnQuc2VydmljZSc7XG5pbXBvcnQgeyBDb25uZWN0UmVjdlRyYW5zcG9ydCB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9jb25uZWN0LXJlY3YtdHJhbnNwb3J0LnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVVcGRhdGVJbnRlciB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9yZS11cGRhdGUtaW50ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBVcGRhdGVQYXJ0aWNpcGFudEF1ZGlvRGVjaWJlbHMgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvdXBkYXRlLXBhcnRpY2lwYW50LWF1ZGlvLWRlY2liZWxzLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2xvc2VBbmRSZXNpemUgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvY2xvc2UtYW5kLXJlc2l6ZS5zZXJ2aWNlJztcbmltcG9ydCB7IEF1dG9BZGp1c3QgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvYXV0by1hZGp1c3Quc2VydmljZSc7XG5pbXBvcnQgeyBTd2l0Y2hVc2VyVmlkZW9BbHQgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvc3dpdGNoLXVzZXItdmlkZW8tYWx0LnNlcnZpY2UnO1xuaW1wb3J0IHsgU3dpdGNoVXNlclZpZGVvIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL3N3aXRjaC11c2VyLXZpZGVvLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3dpdGNoVXNlckF1ZGlvIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL3N3aXRjaC11c2VyLWF1ZGlvLnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVjZWl2ZVJvb21NZXNzYWdlcyB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9yZWNlaXZlLXJvb20tbWVzc2FnZXMuc2VydmljZSc7XG5pbXBvcnQgeyBGb3JtYXROdW1iZXIgfSBmcm9tICcuLi8uLi9tZXRob2RzL3V0aWxzL2Zvcm1hdC1udW1iZXIuc2VydmljZSc7XG5pbXBvcnQgeyBDb25uZWN0SXBzIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL2Nvbm5lY3QtaXBzLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBQb2xsVXBkYXRlZCB9IGZyb20gJy4uLy4uL21ldGhvZHMvcG9sbHMtbWV0aG9kcy9wb2xsLXVwZGF0ZWQuc2VydmljZSc7XG5pbXBvcnQgeyBIYW5kbGVDcmVhdGVQb2xsIH0gZnJvbSAnLi4vLi4vbWV0aG9kcy9wb2xscy1tZXRob2RzL2hhbmRsZS1jcmVhdGUtcG9sbC5zZXJ2aWNlJztcbmltcG9ydCB7IEhhbmRsZVZvdGVQb2xsIH0gZnJvbSAnLi4vLi4vbWV0aG9kcy9wb2xscy1tZXRob2RzL2hhbmRsZS12b3RlLXBvbGwuc2VydmljZSc7XG5pbXBvcnQgeyBIYW5kbGVFbmRQb2xsIH0gZnJvbSAnLi4vLi4vbWV0aG9kcy9wb2xscy1tZXRob2RzL2hhbmRsZS1lbmQtcG9sbC5zZXJ2aWNlJztcblxuaW1wb3J0IHsgQnJlYWtvdXRSb29tVXBkYXRlZCB9IGZyb20gJy4uLy4uL21ldGhvZHMvYnJlYWtvdXQtcm9vbS1tZXRob2RzL2JyZWFrb3V0LXJvb20tdXBkYXRlZC5zZXJ2aWNlJztcblxuaW1wb3J0IHsgU3RhcnRNZWV0aW5nUHJvZ3Jlc3NUaW1lciB9IGZyb20gJy4uLy4uL21ldGhvZHMvdXRpbHMvbWVldGluZy10aW1lci9zdGFydC1tZWV0aW5nLXByb2dyZXNzLXRpbWVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgVXBkYXRlUmVjb3JkaW5nIH0gZnJvbSAnLi4vLi4vbWV0aG9kcy9yZWNvcmRpbmctbWV0aG9kcy91cGRhdGUtcmVjb3JkaW5nLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3RvcFJlY29yZGluZyB9IGZyb20gJy4uLy4uL21ldGhvZHMvcmVjb3JkaW5nLW1ldGhvZHMvc3RvcC1yZWNvcmRpbmcuc2VydmljZSc7XG5cbmltcG9ydCB7IFVzZXJXYWl0aW5nIH0gZnJvbSAnLi4vLi4vcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvdXNlci13YWl0aW5nLnNlcnZpY2UnO1xuaW1wb3J0IHsgUGVyc29uSm9pbmVkIH0gZnJvbSAnLi4vLi4vcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvcGVyc29uLWpvaW5lZC5zZXJ2aWNlJztcbmltcG9ydCB7IEFsbFdhaXRpbmdSb29tTWVtYmVycyB9IGZyb20gJy4uLy4uL3Byb2R1Y2Vycy9zb2NrZXQtcmVjZWl2ZS1tZXRob2RzL2FsbC13YWl0aW5nLXJvb20tbWVtYmVycy5zZXJ2aWNlJztcbmltcG9ydCB7IFJvb21SZWNvcmRQYXJhbXMgfSBmcm9tICcuLi8uLi9wcm9kdWNlcnMvc29ja2V0LXJlY2VpdmUtbWV0aG9kcy9yb29tLXJlY29yZC1wYXJhbXMuc2VydmljZSc7XG5pbXBvcnQgeyBCYW5QYXJ0aWNpcGFudCB9IGZyb20gJy4uLy4uL3Byb2R1Y2Vycy9zb2NrZXQtcmVjZWl2ZS1tZXRob2RzL2Jhbi1wYXJ0aWNpcGFudC5zZXJ2aWNlJztcbmltcG9ydCB7IFVwZGF0ZWRDb0hvc3QgfSBmcm9tICcuLi8uLi9wcm9kdWNlcnMvc29ja2V0LXJlY2VpdmUtbWV0aG9kcy91cGRhdGVkLWNvLWhvc3Quc2VydmljZSc7XG5pbXBvcnQgeyBQYXJ0aWNpcGFudFJlcXVlc3RlZCB9IGZyb20gJy4uLy4uL3Byb2R1Y2Vycy9zb2NrZXQtcmVjZWl2ZS1tZXRob2RzL3BhcnRpY2lwYW50LXJlcXVlc3RlZC5zZXJ2aWNlJztcbmltcG9ydCB7IFNjcmVlblByb2R1Y2VySWQgfSBmcm9tICcuLi8uLi9wcm9kdWNlcnMvc29ja2V0LXJlY2VpdmUtbWV0aG9kcy9zY3JlZW4tcHJvZHVjZXItaWQuc2VydmljZSc7XG5pbXBvcnQgeyBVcGRhdGVNZWRpYVNldHRpbmdzIH0gZnJvbSAnLi4vLi4vcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvdXBkYXRlLW1lZGlhLXNldHRpbmdzLnNlcnZpY2UnO1xuaW1wb3J0IHsgUHJvZHVjZXJNZWRpYVBhdXNlZCB9IGZyb20gJy4uLy4uL3Byb2R1Y2Vycy9zb2NrZXQtcmVjZWl2ZS1tZXRob2RzL3Byb2R1Y2VyLW1lZGlhLXBhdXNlZC5zZXJ2aWNlJztcbmltcG9ydCB7IFByb2R1Y2VyTWVkaWFSZXN1bWVkIH0gZnJvbSAnLi4vLi4vcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvcHJvZHVjZXItbWVkaWEtcmVzdW1lZC5zZXJ2aWNlJztcbmltcG9ydCB7IFByb2R1Y2VyTWVkaWFDbG9zZWQgfSBmcm9tICcuLi8uLi9wcm9kdWNlcnMvc29ja2V0LXJlY2VpdmUtbWV0aG9kcy9wcm9kdWNlci1tZWRpYS1jbG9zZWQuc2VydmljZSc7XG5pbXBvcnQgeyBDb250cm9sTWVkaWFIb3N0IH0gZnJvbSAnLi4vLi4vcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvY29udHJvbC1tZWRpYS1ob3N0LnNlcnZpY2UnO1xuaW1wb3J0IHsgTWVldGluZ0VuZGVkIH0gZnJvbSAnLi4vLi4vcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvbWVldGluZy1lbmRlZC5zZXJ2aWNlJztcbmltcG9ydCB7IERpc2Nvbm5lY3RVc2VyU2VsZiB9IGZyb20gJy4uLy4uL3Byb2R1Y2Vycy9zb2NrZXQtcmVjZWl2ZS1tZXRob2RzL2Rpc2Nvbm5lY3QtdXNlci1zZWxmLnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVjZWl2ZU1lc3NhZ2UgfSBmcm9tICcuLi8uLi9wcm9kdWNlcnMvc29ja2V0LXJlY2VpdmUtbWV0aG9kcy9yZWNlaXZlLW1lc3NhZ2Uuc2VydmljZSc7XG5pbXBvcnQgeyBNZWV0aW5nVGltZVJlbWFpbmluZyB9IGZyb20gJy4uLy4uL3Byb2R1Y2Vycy9zb2NrZXQtcmVjZWl2ZS1tZXRob2RzL21lZXRpbmctdGltZS1yZW1haW5pbmcuc2VydmljZSc7XG5pbXBvcnQgeyBNZWV0aW5nU3RpbGxUaGVyZSB9IGZyb20gJy4uLy4uL3Byb2R1Y2Vycy9zb2NrZXQtcmVjZWl2ZS1tZXRob2RzL21lZXRpbmctc3RpbGwtdGhlcmUuc2VydmljZSc7XG5pbXBvcnQgeyBTdGFydFJlY29yZHMgfSBmcm9tICcuLi8uLi9wcm9kdWNlcnMvc29ja2V0LXJlY2VpdmUtbWV0aG9kcy9zdGFydC1yZWNvcmRzLnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVJbml0aWF0ZVJlY29yZGluZyB9IGZyb20gJy4uLy4uL3Byb2R1Y2Vycy9zb2NrZXQtcmVjZWl2ZS1tZXRob2RzL3JlLWluaXRpYXRlLXJlY29yZGluZy5zZXJ2aWNlJztcbmltcG9ydCB7IEdldERvbWFpbnMgfSBmcm9tICcuLi8uLi9wcm9kdWNlcnMvc29ja2V0LXJlY2VpdmUtbWV0aG9kcy9nZXQtZG9tYWlucy5zZXJ2aWNlJztcbmltcG9ydCB7IFVwZGF0ZUNvbnN1bWluZ0RvbWFpbnMgfSBmcm9tICcuLi8uLi9wcm9kdWNlcnMvc29ja2V0LXJlY2VpdmUtbWV0aG9kcy91cGRhdGUtY29uc3VtaW5nLWRvbWFpbnMuc2VydmljZSc7XG5pbXBvcnQgeyBSZWNvcmRpbmdOb3RpY2UgfSBmcm9tICcuLi8uLi9wcm9kdWNlcnMvc29ja2V0LXJlY2VpdmUtbWV0aG9kcy9yZWNvcmRpbmctbm90aWNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgVGltZUxlZnRSZWNvcmRpbmcgfSBmcm9tICcuLi8uLi9wcm9kdWNlcnMvc29ja2V0LXJlY2VpdmUtbWV0aG9kcy90aW1lLWxlZnQtcmVjb3JkaW5nLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3RvcHBlZFJlY29yZGluZyB9IGZyb20gJy4uLy4uL3Byb2R1Y2Vycy9zb2NrZXQtcmVjZWl2ZS1tZXRob2RzL3N0b3BwZWQtcmVjb3JkaW5nLnNlcnZpY2UnO1xuaW1wb3J0IHsgSG9zdFJlcXVlc3RSZXNwb25zZSB9IGZyb20gJy4uLy4uL3Byb2R1Y2Vycy9zb2NrZXQtcmVjZWl2ZS1tZXRob2RzL2hvc3QtcmVxdWVzdC1yZXNwb25zZS5zZXJ2aWNlJztcbmltcG9ydCB7IEFsbE1lbWJlcnMgfSBmcm9tICcuLi8uLi9wcm9kdWNlcnMvc29ja2V0LXJlY2VpdmUtbWV0aG9kcy9hbGwtbWVtYmVycy5zZXJ2aWNlJztcbmltcG9ydCB7IEFsbE1lbWJlcnNSZXN0IH0gZnJvbSAnLi4vLi4vcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvYWxsLW1lbWJlcnMtcmVzdC5zZXJ2aWNlJztcbmltcG9ydCB7IERpc2Nvbm5lY3QgfSBmcm9tICcuLi8uLi9wcm9kdWNlcnMvc29ja2V0LXJlY2VpdmUtbWV0aG9kcy9kaXNjb25uZWN0LnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBDYXB0dXJlQ2FudmFzU3RyZWFtIH0gZnJvbSAnLi4vLi4vbWV0aG9kcy93aGl0ZWJvYXJkLW1ldGhvZHMvY2FwdHVyZS1jYW52YXMtc3RyZWFtLnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVzdW1lUGF1c2VBdWRpb1N0cmVhbXMgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvcmVzdW1lLXBhdXNlLWF1ZGlvLXN0cmVhbXMuc2VydmljZSc7XG5pbXBvcnQgeyBQcm9jZXNzQ29uc3VtZXJUcmFuc3BvcnRzQXVkaW8gfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvcHJvY2Vzcy1jb25zdW1lci10cmFuc3BvcnRzLWF1ZGlvLnNlcnZpY2UnO1xuXG5pbXBvcnQge1xuICBEZXZpY2UsXG4gIFByb2R1Y2VyLFxuICBQcm9kdWNlck9wdGlvbnMsXG4gIFJ0cENhcGFiaWxpdGllcyxcbiAgVHJhbnNwb3J0LFxufSBmcm9tICdtZWRpYXNvdXAtY2xpZW50L2xpYi90eXBlcyc7XG5pbXBvcnQgeyBTZWxmaWVTZWdtZW50YXRpb24gfSBmcm9tICdAbWVkaWFwaXBlL3NlbGZpZV9zZWdtZW50YXRpb24nO1xuXG4vKipcbiAqIE9wdGlvbnMgZm9yIGNvbmZpZ3VyaW5nIHRoZSBNZWRpYXNmdUdlbmVyaWMgY29tcG9uZW50LlxuICpcbiAqIEB0eXBlZGVmIHtPYmplY3R9IE1lZGlhc2Z1R2VuZXJpY09wdGlvbnNcbiAqIEBwcm9wZXJ0eSB7KG9wdGlvbnM6IFByZUpvaW5QYWdlT3B0aW9ucyB8IFdlbGNvbWVQYWdlT3B0aW9ucykgPT4gSFRNTEVsZW1lbnR9IFtQcmVqb2luUGFnZV0gLSBBIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhbiBIVE1MRWxlbWVudCBmb3IgdGhlIHByZS1qb2luIHBhZ2UuXG4gKiBAcHJvcGVydHkge3sgYXBpVXNlck5hbWU6IHN0cmluZzsgYXBpS2V5OiBzdHJpbmcgfX0gW2NyZWRlbnRpYWxzXSAtIENyZWRlbnRpYWxzIGZvciBBUEkgYWNjZXNzLCBpbmNsdWRpbmcgdXNlcm5hbWUgYW5kIEFQSSBrZXkuXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IFt1c2VMb2NhbFVJTW9kZV0gLSBGbGFnIHRvIGRldGVybWluZSBpZiB0aGUgbG9jYWwgVUkgbW9kZSBzaG91bGQgYmUgdXNlZC5cbiAqIEBwcm9wZXJ0eSB7U2VlZERhdGF9IFtzZWVkRGF0YV0gLSBEYXRhIHVzZWQgZm9yIHNlZWRpbmcgdGhlIGNvbXBvbmVudC5cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gW3VzZVNlZWRdIC0gRmxhZyB0byBkZXRlcm1pbmUgaWYgc2VlZCBkYXRhIHNob3VsZCBiZSB1c2VkLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFtpbWdTcmNdIC0gU291cmNlIFVSTCBmb3IgYW4gaW1hZ2UgdG8gYmUgdXNlZCBpbiB0aGUgY29tcG9uZW50LlxuICovXG5leHBvcnQgdHlwZSBNZWRpYXNmdUdlbmVyaWNPcHRpb25zID0ge1xuICBQcmVqb2luUGFnZT86IChvcHRpb25zOiBQcmVKb2luUGFnZU9wdGlvbnMgfCBXZWxjb21lUGFnZU9wdGlvbnMpID0+IEhUTUxFbGVtZW50O1xuICBjcmVkZW50aWFscz86IHsgYXBpVXNlck5hbWU6IHN0cmluZzsgYXBpS2V5OiBzdHJpbmcgfTtcbiAgdXNlTG9jYWxVSU1vZGU/OiBib29sZWFuO1xuICBzZWVkRGF0YT86IFNlZWREYXRhO1xuICB1c2VTZWVkPzogYm9vbGVhbjtcbiAgaW1nU3JjPzogc3RyaW5nO1xufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLW1lZGlhc2Z1LWdlbmVyaWMnLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbXG4gICAgUm91dGVyT3V0bGV0LFxuICAgIENvbW1vbk1vZHVsZSxcbiAgICBCcmVha291dFJvb21zTW9kYWwsXG4gICAgQmFja2dyb3VuZE1vZGFsLFxuICAgIENvSG9zdE1vZGFsLFxuICAgIEFsZXJ0Q29tcG9uZW50LFxuICAgIEF1ZGlvR3JpZCxcbiAgICBDb250cm9sQnV0dG9uc0FsdENvbXBvbmVudCxcbiAgICBDb250cm9sQnV0dG9uc0NvbXBvbmVudFRvdWNoLFxuICAgIENvbnRyb2xCdXR0b25zQ29tcG9uZW50LFxuICAgIEZsZXhpYmxlR3JpZCxcbiAgICBGbGV4aWJsZVZpZGVvLFxuICAgIExvYWRpbmdNb2RhbCxcbiAgICBQYWdpbmF0aW9uLFxuICAgIFN1YkFzcGVjdENvbXBvbmVudCxcbiAgICBEaXNwbGF5U2V0dGluZ3NNb2RhbCxcbiAgICBFdmVudFNldHRpbmdzTW9kYWwsXG4gICAgQ29uZmlybUV4aXRNb2RhbCxcbiAgICBNZWRpYVNldHRpbmdzTW9kYWwsXG4gICAgTWVudU1vZGFsLFxuICAgIE1lc3NhZ2VzTW9kYWwsXG4gICAgQ29uZmlybUhlcmVNb2RhbCxcbiAgICBTaGFyZUV2ZW50TW9kYWwsXG4gICAgV2VsY29tZVBhZ2UsXG4gICAgUGFydGljaXBhbnRzTW9kYWwsXG4gICAgUG9sbE1vZGFsLFxuICAgIFJlY29yZGluZ01vZGFsLFxuICAgIFJlcXVlc3RzTW9kYWwsXG4gICAgTWFpbkFzcGVjdENvbXBvbmVudCxcbiAgICBNYWluQ29udGFpbmVyQ29tcG9uZW50LFxuICAgIE1haW5HcmlkQ29tcG9uZW50LFxuICAgIE1haW5TY3JlZW5Db21wb25lbnQsXG4gICAgT3RoZXJHcmlkQ29tcG9uZW50LFxuICAgIFNjcmVlbmJvYXJkLFxuICAgIFNjcmVlbmJvYXJkTW9kYWwsXG4gICAgV2hpdGVib2FyZCxcbiAgICBDb25maWd1cmVXaGl0ZWJvYXJkTW9kYWwsXG4gICAgV2FpdGluZ1Jvb21Nb2RhbCxcbiAgICBNZW51V2lkZ2V0LFxuICAgIE1lc3NhZ2VXaWRnZXQsXG4gICAgTWVudVJlY29yZFdpZGdldCxcbiAgICBSZWNvcmRUaW1lcldpZGdldCxcbiAgICBNZW51UGFydGljaXBhbnRzV2lkZ2V0LFxuICAgIFNjcmVlblNoYXJlV2lkZ2V0LFxuICBdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXZcbiAgICAgIGNsYXNzPVwiTWVkaWFTRlVcIlxuICAgICAgW25nU3R5bGVdPVwie1xuICAgICAgICBoZWlnaHQ6ICcxMDB2aCcsXG4gICAgICAgIHdpZHRoOiAnMTAwdncnLFxuICAgICAgICBtYXhXaWR0aDogJzEwMHZ3JyxcbiAgICAgICAgbWF4SGVpZ2h0OiAnMTAwdmgnLFxuICAgICAgICBvdmVyZmxvdzogJ2hpZGRlbidcbiAgICAgIH1cIlxuICAgID5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhdmFsaWRhdGVkLnZhbHVlOyBlbHNlIG1haW5Db250ZW50XCI+XG4gICAgICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgICAqbmdDb21wb25lbnRPdXRsZXQ9XCJcbiAgICAgICAgICAgIFByZWpvaW5QYWdlQ29tcG9uZW50LmNvbXBvbmVudDtcbiAgICAgICAgICAgIGluamVjdG9yOiBQcmVqb2luUGFnZUNvbXBvbmVudC5pbmplY3RvclxuICAgICAgICAgIFwiXG4gICAgICAgID5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgPG5nLXRlbXBsYXRlICNtYWluQ29udGVudD5cbiAgICAgICAgPGFwcC1tYWluLWNvbnRhaW5lci1jb21wb25lbnQ+XG4gICAgICAgICAgPGFwcC1tYWluLWFzcGVjdC1jb21wb25lbnRcbiAgICAgICAgICAgIFtiYWNrZ3JvdW5kQ29sb3JdPVwiJ3JnYmEoMjE3LCAyMjcsIDIzNCwgMC45OSknXCJcbiAgICAgICAgICAgIFtkZWZhdWx0RnJhY3Rpb25dPVwiMSAtIGNvbnRyb2xIZWlnaHQudmFsdWVcIlxuICAgICAgICAgICAgW3Nob3dDb250cm9sc109XCJldmVudFR5cGUudmFsdWUgPT09ICd3ZWJpbmFyJyB8fCBldmVudFR5cGUudmFsdWUgPT09ICdjb25mZXJlbmNlJ1wiXG4gICAgICAgICAgICBbdXBkYXRlSXNXaWRlU2NyZWVuXT1cInVwZGF0ZUlzV2lkZVNjcmVlblwiXG4gICAgICAgICAgICBbdXBkYXRlSXNNZWRpdW1TY3JlZW5dPVwidXBkYXRlSXNNZWRpdW1TY3JlZW5cIlxuICAgICAgICAgICAgW3VwZGF0ZUlzU21hbGxTY3JlZW5dPVwidXBkYXRlSXNTbWFsbFNjcmVlblwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGFwcC1tYWluLXNjcmVlbi1jb21wb25lbnRcbiAgICAgICAgICAgICAgW2RvU3RhY2tdPVwidHJ1ZVwiXG4gICAgICAgICAgICAgIFttYWluU2l6ZV09XCJtYWluSGVpZ2h0V2lkdGgudmFsdWVcIlxuICAgICAgICAgICAgICBbZGVmYXVsdEZyYWN0aW9uXT1cIjEgLSBjb250cm9sSGVpZ2h0LnZhbHVlXCJcbiAgICAgICAgICAgICAgW3Nob3dDb250cm9sc109XCJldmVudFR5cGUudmFsdWUgPT09ICd3ZWJpbmFyJyB8fCBldmVudFR5cGUudmFsdWUgPT09ICdjb25mZXJlbmNlJ1wiXG4gICAgICAgICAgICAgIFt1cGRhdGVDb21wb25lbnRTaXplc109XCJ1cGRhdGVDb21wb25lbnRTaXplc1wiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxhcHAtbWFpbi1ncmlkLWNvbXBvbmVudFxuICAgICAgICAgICAgICAgIFtoZWlnaHRdPVwiY29tcG9uZW50U2l6ZXMudmFsdWUubWFpbkhlaWdodFwiXG4gICAgICAgICAgICAgICAgW3dpZHRoXT1cImNvbXBvbmVudFNpemVzLnZhbHVlLm1haW5XaWR0aFwiXG4gICAgICAgICAgICAgICAgW2JhY2tncm91bmRDb2xvcl09XCIncmdiYSgyMTcsIDIyNywgMjM0LCAwLjk5KSdcIlxuICAgICAgICAgICAgICAgIFttYWluU2l6ZV09XCJtYWluSGVpZ2h0V2lkdGgudmFsdWVcIlxuICAgICAgICAgICAgICAgIFtzaG93QXNwZWN0XT1cIm1haW5IZWlnaHRXaWR0aC52YWx1ZSA+IDBcIlxuICAgICAgICAgICAgICAgIFt0aW1lQmFja2dyb3VuZENvbG9yXT1cInJlY29yZFN0YXRlLnZhbHVlXCJcbiAgICAgICAgICAgICAgICBbbWVldGluZ1Byb2dyZXNzVGltZV09XCJtZWV0aW5nUHJvZ3Jlc3NUaW1lLnZhbHVlXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxhcHAtZmxleGlibGUtdmlkZW9cbiAgICAgICAgICAgICAgICAgIFtjdXN0b21XaWR0aF09XCJjb21wb25lbnRTaXplcy52YWx1ZS5tYWluV2lkdGhcIlxuICAgICAgICAgICAgICAgICAgW2N1c3RvbUhlaWdodF09XCJjb21wb25lbnRTaXplcy52YWx1ZS5tYWluSGVpZ2h0XCJcbiAgICAgICAgICAgICAgICAgIFtyb3dzXT1cIjFcIlxuICAgICAgICAgICAgICAgICAgW2NvbHVtbnNdPVwiMVwiXG4gICAgICAgICAgICAgICAgICBbY29tcG9uZW50c1RvUmVuZGVyXT1cIm1haW5HcmlkU3RyZWFtLnZhbHVlXCJcbiAgICAgICAgICAgICAgICAgIFtzaG93QXNwZWN0XT1cIlxuICAgICAgICAgICAgICAgICAgICBtYWluR3JpZFN0cmVhbS52YWx1ZS5sZW5ndGggPiAwICYmXG4gICAgICAgICAgICAgICAgICAgICEod2hpdGVib2FyZFN0YXJ0ZWQudmFsdWUgJiYgIXdoaXRlYm9hcmRFbmRlZC52YWx1ZSlcbiAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICBbbG9jYWxTdHJlYW1TY3JlZW5dPVwibG9jYWxTdHJlYW1TY3JlZW4udmFsdWUhXCJcbiAgICAgICAgICAgICAgICAgIFthbm5vdGF0ZVNjcmVlblN0cmVhbV09XCJhbm5vdGF0ZVNjcmVlblN0cmVhbS52YWx1ZVwiXG4gICAgICAgICAgICAgICAgICBbU2NyZWVuYm9hcmRdPVwic2hhcmVkLnZhbHVlID8gU2NyZWVuYm9hcmRXaWRnZXQgOiB1bmRlZmluZWRcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8L2FwcC1mbGV4aWJsZS12aWRlbz5cbiAgICAgICAgICAgICAgICA8YXBwLXdoaXRlYm9hcmRcbiAgICAgICAgICAgICAgICAgIFtjdXN0b21XaWR0aF09XCJjb21wb25lbnRTaXplcy52YWx1ZS5tYWluV2lkdGhcIlxuICAgICAgICAgICAgICAgICAgW2N1c3RvbUhlaWdodF09XCJjb21wb25lbnRTaXplcy52YWx1ZS5tYWluSGVpZ2h0XCJcbiAgICAgICAgICAgICAgICAgIFtwYXJhbWV0ZXJzXT1cIm1lZGlhU0ZVUGFyYW1ldGVyc1wiXG4gICAgICAgICAgICAgICAgICBbc2hvd0FzcGVjdF09XCJ3aGl0ZWJvYXJkU3RhcnRlZC52YWx1ZSAmJiAhd2hpdGVib2FyZEVuZGVkLnZhbHVlXCJcbiAgICAgICAgICAgICAgICA+PC9hcHAtd2hpdGVib2FyZD5cbiAgICAgICAgICAgICAgICA8YXBwLWNvbnRyb2wtYnV0dG9ucy1jb21wb25lbnQtdG91Y2hcbiAgICAgICAgICAgICAgICAgIFtidXR0b25zXT1cImNvbnRyb2xCcm9hZGNhc3RCdXR0b25zXCJcbiAgICAgICAgICAgICAgICAgIFtwb3NpdGlvbl09XCIncmlnaHQnXCJcbiAgICAgICAgICAgICAgICAgIFtsb2NhdGlvbl09XCInYm90dG9tJ1wiXG4gICAgICAgICAgICAgICAgICBbZGlyZWN0aW9uXT1cIid2ZXJ0aWNhbCdcIlxuICAgICAgICAgICAgICAgICAgW3Nob3dBc3BlY3RdPVwiZXZlbnRUeXBlLnZhbHVlID09PSAnYnJvYWRjYXN0J1wiXG4gICAgICAgICAgICAgICAgPjwvYXBwLWNvbnRyb2wtYnV0dG9ucy1jb21wb25lbnQtdG91Y2g+XG4gICAgICAgICAgICAgICAgPGFwcC1jb250cm9sLWJ1dHRvbnMtY29tcG9uZW50LXRvdWNoXG4gICAgICAgICAgICAgICAgICBbYnV0dG9uc109XCJyZWNvcmRCdXR0b25cIlxuICAgICAgICAgICAgICAgICAgW2RpcmVjdGlvbl09XCInaG9yaXpvbnRhbCdcIlxuICAgICAgICAgICAgICAgICAgW3Nob3dBc3BlY3RdPVwiXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50VHlwZS52YWx1ZSA9PT0gJ2Jyb2FkY2FzdCcgJiZcbiAgICAgICAgICAgICAgICAgICAgIXNob3dSZWNvcmRCdXR0b25zLnZhbHVlICYmXG4gICAgICAgICAgICAgICAgICAgIGlzbGV2ZWwudmFsdWUgPT09ICcyJ1xuICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgIFtsb2NhdGlvbl09XCInYm90dG9tJ1wiXG4gICAgICAgICAgICAgICAgICBbcG9zaXRpb25dPVwiJ21pZGRsZSdcIlxuICAgICAgICAgICAgICAgID48L2FwcC1jb250cm9sLWJ1dHRvbnMtY29tcG9uZW50LXRvdWNoPlxuICAgICAgICAgICAgICAgIDxhcHAtY29udHJvbC1idXR0b25zLWNvbXBvbmVudC10b3VjaFxuICAgICAgICAgICAgICAgICAgW2J1dHRvbnNdPVwicmVjb3JkQnV0dG9uc1wiXG4gICAgICAgICAgICAgICAgICBbZGlyZWN0aW9uXT1cIidob3Jpem9udGFsJ1wiXG4gICAgICAgICAgICAgICAgICBbc2hvd0FzcGVjdF09XCJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRUeXBlLnZhbHVlID09PSAnYnJvYWRjYXN0JyAmJlxuICAgICAgICAgICAgICAgICAgICBzaG93UmVjb3JkQnV0dG9ucy52YWx1ZSAmJlxuICAgICAgICAgICAgICAgICAgICBpc2xldmVsLnZhbHVlID09PSAnMidcbiAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICBbbG9jYXRpb25dPVwiJ2JvdHRvbSdcIlxuICAgICAgICAgICAgICAgICAgW3Bvc2l0aW9uXT1cIidtaWRkbGUnXCJcbiAgICAgICAgICAgICAgICA+PC9hcHAtY29udHJvbC1idXR0b25zLWNvbXBvbmVudC10b3VjaD5cbiAgICAgICAgICAgICAgPC9hcHAtbWFpbi1ncmlkLWNvbXBvbmVudD5cblxuICAgICAgICAgICAgICA8YXBwLW90aGVyLWdyaWQtY29tcG9uZW50XG4gICAgICAgICAgICAgICAgW2hlaWdodF09XCJjb21wb25lbnRTaXplcy52YWx1ZS5vdGhlckhlaWdodFwiXG4gICAgICAgICAgICAgICAgW3dpZHRoXT1cImNvbXBvbmVudFNpemVzLnZhbHVlLm90aGVyV2lkdGhcIlxuICAgICAgICAgICAgICAgIFtiYWNrZ3JvdW5kQ29sb3JdPVwiJ3JnYmEoMjE3LCAyMjcsIDIzNCwgMC45OSknXCJcbiAgICAgICAgICAgICAgICBbc2hvd0FzcGVjdF09XCJtYWluSGVpZ2h0V2lkdGgudmFsdWUgIT09IDEwMFwiXG4gICAgICAgICAgICAgICAgW3RpbWVCYWNrZ3JvdW5kQ29sb3JdPVwicmVjb3JkU3RhdGUudmFsdWVcIlxuICAgICAgICAgICAgICAgIFtzaG93VGltZXJdPVwibWFpbkhlaWdodFdpZHRoLnZhbHVlID09PSAwXCJcbiAgICAgICAgICAgICAgICBbbWVldGluZ1Byb2dyZXNzVGltZV09XCJtZWV0aW5nUHJvZ3Jlc3NUaW1lLnZhbHVlXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICpuZ0lmPVwiZG9QYWdpbmF0ZS52YWx1ZVwiXG4gICAgICAgICAgICAgICAgICBbbmdTdHlsZV09XCJ7XG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOlxuICAgICAgICAgICAgICAgICAgICAgIHBhZ2luYXRpb25EaXJlY3Rpb24udmFsdWUgPT0gJ2hvcml6b250YWwnXG4gICAgICAgICAgICAgICAgICAgICAgICA/IGNvbXBvbmVudFNpemVzLnZhbHVlLm90aGVyV2lkdGhcbiAgICAgICAgICAgICAgICAgICAgICAgIDogcGFnaW5hdGlvbkhlaWdodFdpZHRoLnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6XG4gICAgICAgICAgICAgICAgICAgICAgcGFnaW5hdGlvbkRpcmVjdGlvbi52YWx1ZSA9PSAnaG9yaXpvbnRhbCdcbiAgICAgICAgICAgICAgICAgICAgICAgID8gcGFnaW5hdGlvbkhlaWdodFdpZHRoLnZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICA6IGNvbXBvbmVudFNpemVzLnZhbHVlLm90aGVySGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBkb1BhZ2luYXRlLnZhbHVlID8gJ2ZsZXgnIDogJ25vbmUnLFxuICAgICAgICAgICAgICAgICAgICAnZmxleC1kaXJlY3Rpb24nOiBwYWdpbmF0aW9uRGlyZWN0aW9uLnZhbHVlID09ICdob3Jpem9udGFsJyA/ICdyb3cnIDogJ2NvbHVtbicsXG4gICAgICAgICAgICAgICAgICAgICdqdXN0aWZ5LWNvbnRlbnQnOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgJ2FsaWduLWl0ZW1zJzogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6ICcwJyxcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luOiAnMCdcbiAgICAgICAgICAgICAgICAgIH1cIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxhcHAtcGFnaW5hdGlvblxuICAgICAgICAgICAgICAgICAgICBbdG90YWxQYWdlc109XCJudW1iZXJQYWdlcy52YWx1ZVwiXG4gICAgICAgICAgICAgICAgICAgIFtjdXJyZW50VXNlclBhZ2VdPVwiY3VycmVudFVzZXJQYWdlLnZhbHVlXCJcbiAgICAgICAgICAgICAgICAgICAgW3Nob3dBc3BlY3RdPVwiZG9QYWdpbmF0ZS52YWx1ZVwiXG4gICAgICAgICAgICAgICAgICAgIFtwYWdpbmF0aW9uSGVpZ2h0XT1cInBhZ2luYXRpb25IZWlnaHRXaWR0aC52YWx1ZVwiXG4gICAgICAgICAgICAgICAgICAgIFtkaXJlY3Rpb25dPVwicGFnaW5hdGlvbkRpcmVjdGlvbi52YWx1ZVwiXG4gICAgICAgICAgICAgICAgICAgIFtwYXJhbWV0ZXJzXT1cIm1lZGlhU0ZVUGFyYW1ldGVyc1wiXG4gICAgICAgICAgICAgICAgICA+PC9hcHAtcGFnaW5hdGlvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxhcHAtYXVkaW8tZ3JpZCBbY29tcG9uZW50c1RvUmVuZGVyXT1cImF1ZGlvT25seVN0cmVhbXMudmFsdWVcIj48L2FwcC1hdWRpby1ncmlkPlxuICAgICAgICAgICAgICAgIDxhcHAtY29udHJvbC1idXR0b25zLWNvbXBvbmVudC10b3VjaFxuICAgICAgICAgICAgICAgICAgW2J1dHRvbnNdPVwiY29udHJvbENoYXRCdXR0b25zXCJcbiAgICAgICAgICAgICAgICAgIFtwb3NpdGlvbl09XCIncmlnaHQnXCJcbiAgICAgICAgICAgICAgICAgIFtsb2NhdGlvbl09XCInYm90dG9tJ1wiXG4gICAgICAgICAgICAgICAgICBbZGlyZWN0aW9uXT1cIid2ZXJ0aWNhbCdcIlxuICAgICAgICAgICAgICAgICAgW3Nob3dBc3BlY3RdPVwiZXZlbnRUeXBlLnZhbHVlID09PSAnY2hhdCdcIlxuICAgICAgICAgICAgICAgID48L2FwcC1jb250cm9sLWJ1dHRvbnMtY29tcG9uZW50LXRvdWNoPlxuICAgICAgICAgICAgICAgIDxhcHAtZmxleGlibGUtZ3JpZFxuICAgICAgICAgICAgICAgICAgW2N1c3RvbVdpZHRoXT1cImdyaWRTaXplcy52YWx1ZS5ncmlkV2lkdGghXCJcbiAgICAgICAgICAgICAgICAgIFtjdXN0b21IZWlnaHRdPVwiZ3JpZFNpemVzLnZhbHVlLmdyaWRIZWlnaHQhXCJcbiAgICAgICAgICAgICAgICAgIFtyb3dzXT1cImdyaWRSb3dzLnZhbHVlXCJcbiAgICAgICAgICAgICAgICAgIFtjb2x1bW5zXT1cImdyaWRDb2xzLnZhbHVlXCJcbiAgICAgICAgICAgICAgICAgIFtjb21wb25lbnRzVG9SZW5kZXJdPVwib3RoZXJHcmlkU3RyZWFtcy52YWx1ZVswXVwiXG4gICAgICAgICAgICAgICAgICBbYmFja2dyb3VuZENvbG9yXT1cIidyZ2JhKDIxNywgMjI3LCAyMzQsIDAuOTkpJ1wiXG4gICAgICAgICAgICAgICAgPjwvYXBwLWZsZXhpYmxlLWdyaWQ+XG4gICAgICAgICAgICAgICAgPGFwcC1mbGV4aWJsZS1ncmlkXG4gICAgICAgICAgICAgICAgICBbY3VzdG9tV2lkdGhdPVwiZ3JpZFNpemVzLnZhbHVlLmFsdEdyaWRXaWR0aCFcIlxuICAgICAgICAgICAgICAgICAgW2N1c3RvbUhlaWdodF09XCJncmlkU2l6ZXMudmFsdWUuYWx0R3JpZEhlaWdodCFcIlxuICAgICAgICAgICAgICAgICAgW3Jvd3NdPVwiYWx0R3JpZFJvd3MudmFsdWVcIlxuICAgICAgICAgICAgICAgICAgW2NvbHVtbnNdPVwiYWx0R3JpZENvbHMudmFsdWVcIlxuICAgICAgICAgICAgICAgICAgW2NvbXBvbmVudHNUb1JlbmRlcl09XCJvdGhlckdyaWRTdHJlYW1zLnZhbHVlWzFdXCJcbiAgICAgICAgICAgICAgICAgIFtiYWNrZ3JvdW5kQ29sb3JdPVwiJ3JnYmEoMjE3LCAyMjcsIDIzNCwgMC45OSknXCJcbiAgICAgICAgICAgICAgICA+PC9hcHAtZmxleGlibGUtZ3JpZD5cbiAgICAgICAgICAgICAgPC9hcHAtb3RoZXItZ3JpZC1jb21wb25lbnQ+XG4gICAgICAgICAgICA8L2FwcC1tYWluLXNjcmVlbi1jb21wb25lbnQ+XG4gICAgICAgICAgPC9hcHAtbWFpbi1hc3BlY3QtY29tcG9uZW50PlxuXG4gICAgICAgICAgPGFwcC1zdWItYXNwZWN0LWNvbXBvbmVudFxuICAgICAgICAgICAgW2JhY2tncm91bmRDb2xvcl09XCIncmdiYSgyMTcsIDIyNywgMjM0LCAwLjk5KSdcIlxuICAgICAgICAgICAgW3Nob3dDb250cm9sc109XCJldmVudFR5cGUudmFsdWUgPT09ICd3ZWJpbmFyJyB8fCBldmVudFR5cGUudmFsdWUgPT09ICdjb25mZXJlbmNlJ1wiXG4gICAgICAgICAgICBbZGVmYXVsdEZyYWN0aW9uU3ViXT1cImNvbnRyb2xIZWlnaHQudmFsdWVcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxhcHAtY29udHJvbC1idXR0b25zLWNvbXBvbmVudFxuICAgICAgICAgICAgICBbYnV0dG9uc109XCJjb250cm9sQnV0dG9uc1wiXG4gICAgICAgICAgICAgIFtidXR0b25Db2xvcl09XCInYmxhY2snXCJcbiAgICAgICAgICAgICAgW2J1dHRvbkJhY2tncm91bmRDb2xvcl09XCJ7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDogJ3RyYW5zcGFyZW50JyxcbiAgICAgICAgICAgICAgICBwcmVzc2VkOiAndHJhbnNwYXJlbnQnXG4gICAgICAgICAgICAgIH1cIlxuICAgICAgICAgICAgICBbYWxpZ25tZW50XT1cIidzcGFjZS1iZXR3ZWVuJ1wiXG4gICAgICAgICAgICAgIFt2ZXJ0aWNhbF09XCJmYWxzZVwiXG4gICAgICAgICAgICAgIFtidXR0b25zQ29udGFpbmVyU3R5bGVdPVwie1xuICAgICAgICAgICAgICAgIG1hcmdpblRvcDogJzAnLFxuICAgICAgICAgICAgICAgIG1hcmdpbkJvdHRvbTogJzAnLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3RyYW5zcGFyZW50J1xuICAgICAgICAgICAgICB9XCJcbiAgICAgICAgICAgID48L2FwcC1jb250cm9sLWJ1dHRvbnMtY29tcG9uZW50PlxuICAgICAgICAgIDwvYXBwLXN1Yi1hc3BlY3QtY29tcG9uZW50PlxuICAgICAgICA8L2FwcC1tYWluLWNvbnRhaW5lci1jb21wb25lbnQ+XG4gICAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgICA8YXBwLW1lbnUtbW9kYWxcbiAgICAgICAgW2JhY2tncm91bmRDb2xvcl09XCIncmdiYSgxODEsIDIzMywgMjI5LCAwLjk3KSdcIlxuICAgICAgICBbaXNWaXNpYmxlXT1cImlzTWVudU1vZGFsVmlzaWJsZS52YWx1ZVwiXG4gICAgICAgIFtvbkNsb3NlXT1cIm9uQ2xvc2VNZW51TW9kYWxcIlxuICAgICAgICBbY3VzdG9tQnV0dG9uc109XCJjdXN0b21NZW51QnV0dG9uc1wiXG4gICAgICAgIFtyb29tTmFtZV09XCJyb29tTmFtZS52YWx1ZVwiXG4gICAgICAgIFthZG1pblBhc3Njb2RlXT1cImFkbWluUGFzc2NvZGUudmFsdWVcIlxuICAgICAgICBbaXNsZXZlbF09XCJpc2xldmVsLnZhbHVlXCJcbiAgICAgID48L2FwcC1tZW51LW1vZGFsPlxuXG4gICAgICA8YXBwLWV2ZW50LXNldHRpbmdzLW1vZGFsXG4gICAgICAgIFtiYWNrZ3JvdW5kQ29sb3JdPVwiJ3JnYmEoMjE3LCAyMjcsIDIzNCwgMC45OSknXCJcbiAgICAgICAgW2lzRXZlbnRTZXR0aW5nc01vZGFsVmlzaWJsZV09XCJpc1NldHRpbmdzTW9kYWxWaXNpYmxlLnZhbHVlXCJcbiAgICAgICAgW29uRXZlbnRTZXR0aW5nc0Nsb3NlXT1cIm9uRXZlbnRTZXR0aW5nc0Nsb3NlXCJcbiAgICAgICAgW2F1ZGlvU2V0dGluZ109XCJhdWRpb1NldHRpbmcudmFsdWVcIlxuICAgICAgICBbdmlkZW9TZXR0aW5nXT1cInZpZGVvU2V0dGluZy52YWx1ZVwiXG4gICAgICAgIFtzY3JlZW5zaGFyZVNldHRpbmddPVwic2NyZWVuc2hhcmVTZXR0aW5nLnZhbHVlXCJcbiAgICAgICAgW2NoYXRTZXR0aW5nXT1cImNoYXRTZXR0aW5nLnZhbHVlXCJcbiAgICAgICAgW3VwZGF0ZUF1ZGlvU2V0dGluZ109XCJ1cGRhdGVBdWRpb1NldHRpbmdcIlxuICAgICAgICBbdXBkYXRlVmlkZW9TZXR0aW5nXT1cInVwZGF0ZVZpZGVvU2V0dGluZ1wiXG4gICAgICAgIFt1cGRhdGVTY3JlZW5zaGFyZVNldHRpbmddPVwidXBkYXRlU2NyZWVuc2hhcmVTZXR0aW5nXCJcbiAgICAgICAgW3VwZGF0ZUNoYXRTZXR0aW5nXT1cInVwZGF0ZUNoYXRTZXR0aW5nXCJcbiAgICAgICAgW3VwZGF0ZUlzU2V0dGluZ3NNb2RhbFZpc2libGVdPVwidXBkYXRlSXNTZXR0aW5nc01vZGFsVmlzaWJsZVwiXG4gICAgICAgIFtyb29tTmFtZV09XCJyb29tTmFtZS52YWx1ZVwiXG4gICAgICAgIFtzb2NrZXRdPVwic29ja2V0LnZhbHVlXCJcbiAgICAgICAgW3Nob3dBbGVydF09XCJzaG93QWxlcnRcIlxuICAgICAgPjwvYXBwLWV2ZW50LXNldHRpbmdzLW1vZGFsPlxuXG4gICAgICA8YXBwLXJlcXVlc3RzLW1vZGFsXG4gICAgICAgIFtiYWNrZ3JvdW5kQ29sb3JdPVwiJ3JnYmEoMjE3LCAyMjcsIDIzNCwgMC45OSknXCJcbiAgICAgICAgW2lzUmVxdWVzdHNNb2RhbFZpc2libGVdPVwiaXNSZXF1ZXN0c01vZGFsVmlzaWJsZS52YWx1ZVwiXG4gICAgICAgIFtvblJlcXVlc3RDbG9zZV09XCJvblJlcXVlc3RDbG9zZVwiXG4gICAgICAgIFtyZXF1ZXN0Q291bnRlcl09XCJyZXF1ZXN0Q291bnRlci52YWx1ZVwiXG4gICAgICAgIFtvblJlcXVlc3RGaWx0ZXJDaGFuZ2VdPVwib25SZXF1ZXN0RmlsdGVyQ2hhbmdlXCJcbiAgICAgICAgW3VwZGF0ZVJlcXVlc3RMaXN0XT1cInVwZGF0ZVJlcXVlc3RMaXN0XCJcbiAgICAgICAgW3JlcXVlc3RMaXN0XT1cImZpbHRlcmVkUmVxdWVzdExpc3QudmFsdWVcIlxuICAgICAgICBbcm9vbU5hbWVdPVwicm9vbU5hbWUudmFsdWVcIlxuICAgICAgICBbc29ja2V0XT1cInNvY2tldC52YWx1ZVwiXG4gICAgICAgIFtwYXJhbWV0ZXJzXT1cIm1lZGlhU0ZVUGFyYW1ldGVyc1wiXG4gICAgICA+PC9hcHAtcmVxdWVzdHMtbW9kYWw+XG5cbiAgICAgIDxhcHAtd2FpdGluZy1yb29tLW1vZGFsXG4gICAgICAgIFtiYWNrZ3JvdW5kQ29sb3JdPVwiJ3JnYmEoMjE3LCAyMjcsIDIzNCwgMC45OSknXCJcbiAgICAgICAgW2lzV2FpdGluZ01vZGFsVmlzaWJsZV09XCJpc1dhaXRpbmdNb2RhbFZpc2libGUudmFsdWVcIlxuICAgICAgICBbb25XYWl0aW5nUm9vbUNsb3NlXT1cIm9uV2FpdGluZ1Jvb21DbG9zZVwiXG4gICAgICAgIFt3YWl0aW5nUm9vbUNvdW50ZXJdPVwid2FpdGluZ1Jvb21Db3VudGVyLnZhbHVlXCJcbiAgICAgICAgW29uV2FpdGluZ1Jvb21GaWx0ZXJDaGFuZ2VdPVwib25XYWl0aW5nUm9vbUZpbHRlckNoYW5nZVwiXG4gICAgICAgIFt3YWl0aW5nUm9vbUxpc3RdPVwiZmlsdGVyZWRXYWl0aW5nUm9vbUxpc3QudmFsdWVcIlxuICAgICAgICBbdXBkYXRlV2FpdGluZ0xpc3RdPVwidXBkYXRlV2FpdGluZ1Jvb21MaXN0XCJcbiAgICAgICAgW3Jvb21OYW1lXT1cInJvb21OYW1lLnZhbHVlXCJcbiAgICAgICAgW3NvY2tldF09XCJzb2NrZXQudmFsdWVcIlxuICAgICAgICBbcGFyYW1ldGVyc109XCJ7XG4gICAgICAgICAgICAgICAgICAgICAgZmlsdGVyZWRXYWl0aW5nUm9vbUxpc3Q6IHdhaXRpbmdSb29tTGlzdC52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICBnZXRVcGRhdGVkQWxsUGFyYW1zOiBnZXRVcGRhdGVkQWxsUGFyYW1zLFxuICAgICAgICAgICAgICAgICAgICB9XCJcbiAgICAgID48L2FwcC13YWl0aW5nLXJvb20tbW9kYWw+XG5cbiAgICAgIDxhcHAtY28taG9zdC1tb2RhbFxuICAgICAgICBbYmFja2dyb3VuZENvbG9yXT1cIidyZ2JhKDIxNywgMjI3LCAyMzQsIDAuOTkpJ1wiXG4gICAgICAgIFtpc0NvSG9zdE1vZGFsVmlzaWJsZV09XCJpc0NvSG9zdE1vZGFsVmlzaWJsZS52YWx1ZVwiXG4gICAgICAgIFtvbkNvSG9zdENsb3NlXT1cIm9uQ29Ib3N0Q2xvc2VcIlxuICAgICAgICBbY29Ib3N0UmVzcG9uc2liaWxpdHldPVwiY29Ib3N0UmVzcG9uc2liaWxpdHkudmFsdWVcIlxuICAgICAgICBbcGFydGljaXBhbnRzXT1cInBhcnRpY2lwYW50cy52YWx1ZVwiXG4gICAgICAgIFtjdXJyZW50Q29ob3N0XT1cImNvSG9zdC52YWx1ZVwiXG4gICAgICAgIFtyb29tTmFtZV09XCJyb29tTmFtZS52YWx1ZVwiXG4gICAgICAgIFtzaG93QWxlcnRdPVwic2hvd0FsZXJ0XCJcbiAgICAgICAgW3VwZGF0ZUNvSG9zdFJlc3BvbnNpYmlsaXR5XT1cInVwZGF0ZUNvSG9zdFJlc3BvbnNpYmlsaXR5XCJcbiAgICAgICAgW3VwZGF0ZUNvSG9zdF09XCJ1cGRhdGVDb0hvc3RcIlxuICAgICAgICBbdXBkYXRlSXNDb0hvc3RNb2RhbFZpc2libGVdPVwidXBkYXRlSXNDb0hvc3RNb2RhbFZpc2libGVcIlxuICAgICAgICBbc29ja2V0XT1cInNvY2tldC52YWx1ZVwiXG4gICAgICA+PC9hcHAtY28taG9zdC1tb2RhbD5cblxuICAgICAgPGFwcC1tZWRpYS1zZXR0aW5ncy1tb2RhbFxuICAgICAgICBbYmFja2dyb3VuZENvbG9yXT1cIidyZ2JhKDE4MSwgMjMzLCAyMjksIDAuOTcpJ1wiXG4gICAgICAgIFtpc01lZGlhU2V0dGluZ3NNb2RhbFZpc2libGVdPVwiaXNNZWRpYVNldHRpbmdzTW9kYWxWaXNpYmxlLnZhbHVlXCJcbiAgICAgICAgW29uTWVkaWFTZXR0aW5nc0Nsb3NlXT1cIm9uTWVkaWFTZXR0aW5nc0Nsb3NlXCJcbiAgICAgICAgW3BhcmFtZXRlcnNdPVwibWVkaWFTRlVQYXJhbWV0ZXJzXCJcbiAgICAgID48L2FwcC1tZWRpYS1zZXR0aW5ncy1tb2RhbD5cblxuICAgICAgPGFwcC1wYXJ0aWNpcGFudHMtbW9kYWxcbiAgICAgICAgW2JhY2tncm91bmRDb2xvcl09XCIncmdiYSgyMTcsIDIyNywgMjM0LCAwLjk5KSdcIlxuICAgICAgICBbaXNQYXJ0aWNpcGFudHNNb2RhbFZpc2libGVdPVwiaXNQYXJ0aWNpcGFudHNNb2RhbFZpc2libGUudmFsdWVcIlxuICAgICAgICBbb25QYXJ0aWNpcGFudHNDbG9zZV09XCJvblBhcnRpY2lwYW50c0Nsb3NlXCJcbiAgICAgICAgW3BhcnRpY2lwYW50c0NvdW50ZXJdPVwicGFydGljaXBhbnRzQ291bnRlci52YWx1ZVwiXG4gICAgICAgIFtvblBhcnRpY2lwYW50c0ZpbHRlckNoYW5nZV09XCJvblBhcnRpY2lwYW50c0ZpbHRlckNoYW5nZVwiXG4gICAgICAgIFtwYXJhbWV0ZXJzXT1cIntcbiAgICAgICAgICAgICAgdXBkYXRlUGFydGljaXBhbnRzOiB1cGRhdGVQYXJ0aWNpcGFudHMsXG4gICAgICAgICAgICAgIGZpbHRlcmVkUGFydGljaXBhbnRzOiBmaWx0ZXJlZFBhcnRpY2lwYW50cy52YWx1ZSxcbiAgICAgICAgICAgICAgdXBkYXRlSXNQYXJ0aWNpcGFudHNNb2RhbFZpc2libGU6IHVwZGF0ZUlzUGFydGljaXBhbnRzTW9kYWxWaXNpYmxlLFxuICAgICAgICAgICAgICB1cGRhdGVEaXJlY3RNZXNzYWdlRGV0YWlsczogdXBkYXRlRGlyZWN0TWVzc2FnZURldGFpbHMsXG4gICAgICAgICAgICAgIHVwZGF0ZVN0YXJ0RGlyZWN0TWVzc2FnZTogdXBkYXRlU3RhcnREaXJlY3RNZXNzYWdlLFxuICAgICAgICAgICAgICB1cGRhdGVJc01lc3NhZ2VzTW9kYWxWaXNpYmxlOiB1cGRhdGVJc01lc3NhZ2VzTW9kYWxWaXNpYmxlLFxuICAgICAgICAgICAgICBzaG93QWxlcnQ6IHNob3dBbGVydCxcbiAgICAgICAgICAgICAgcGFydGljaXBhbnRzOiBmaWx0ZXJlZFBhcnRpY2lwYW50cy52YWx1ZSxcbiAgICAgICAgICAgICAgcm9vbU5hbWU6IHJvb21OYW1lLnZhbHVlLFxuICAgICAgICAgICAgICBpc2xldmVsOiBpc2xldmVsLnZhbHVlLFxuICAgICAgICAgICAgICBtZW1iZXI6IG1lbWJlci52YWx1ZSxcbiAgICAgICAgICAgICAgY29Ib3N0UmVzcG9uc2liaWxpdHk6IGNvSG9zdFJlc3BvbnNpYmlsaXR5LnZhbHVlLFxuICAgICAgICAgICAgICBjb0hvc3Q6IGNvSG9zdC52YWx1ZSxcbiAgICAgICAgICAgICAgZXZlbnRUeXBlOiBldmVudFR5cGUudmFsdWUsXG4gICAgICAgICAgICAgIHN0YXJ0RGlyZWN0TWVzc2FnZTogc3RhcnREaXJlY3RNZXNzYWdlLnZhbHVlLFxuICAgICAgICAgICAgICBkaXJlY3RNZXNzYWdlRGV0YWlsczogZGlyZWN0TWVzc2FnZURldGFpbHMudmFsdWUsXG4gICAgICAgICAgICAgIHNvY2tldDogc29ja2V0LnZhbHVlLFxuICAgICAgICAgICAgICBnZXRVcGRhdGVkQWxsUGFyYW1zOiBnZXRVcGRhdGVkQWxsUGFyYW1zLFxuICAgICAgICAgICAgfVwiXG4gICAgICA+PC9hcHAtcGFydGljaXBhbnRzLW1vZGFsPlxuXG4gICAgICA8YXBwLWRpc3BsYXktc2V0dGluZ3MtbW9kYWxcbiAgICAgICAgW2JhY2tncm91bmRDb2xvcl09XCIncmdiYSgyMTcsIDIyNywgMjM0LCAwLjk5KSdcIlxuICAgICAgICBbaXNEaXNwbGF5U2V0dGluZ3NNb2RhbFZpc2libGVdPVwiaXNEaXNwbGF5U2V0dGluZ3NNb2RhbFZpc2libGUudmFsdWVcIlxuICAgICAgICBbb25EaXNwbGF5U2V0dGluZ3NDbG9zZV09XCJvbkRpc3BsYXlTZXR0aW5nc0Nsb3NlXCJcbiAgICAgICAgW3BhcmFtZXRlcnNdPVwibWVkaWFTRlVQYXJhbWV0ZXJzXCJcbiAgICAgID48L2FwcC1kaXNwbGF5LXNldHRpbmdzLW1vZGFsPlxuXG4gICAgICA8YXBwLXJlY29yZGluZy1tb2RhbFxuICAgICAgICBbYmFja2dyb3VuZENvbG9yXT1cIidyZ2JhKDIxNywgMjI3LCAyMzQsIDAuOTkpJ1wiXG4gICAgICAgIFtpc1JlY29yZGluZ01vZGFsVmlzaWJsZV09XCJpc1JlY29yZGluZ01vZGFsVmlzaWJsZS52YWx1ZVwiXG4gICAgICAgIFtvbkNsb3NlXT1cIm9uUmVjb3JkaW5nQ2xvc2VcIlxuICAgICAgICBbc3RhcnRSZWNvcmRpbmddPVwic3RhcnRSZWNvcmRpbmcuc3RhcnRSZWNvcmRpbmdcIlxuICAgICAgICBbY29uZmlybVJlY29yZGluZ109XCJjb25maXJtUmVjb3JkaW5nLmNvbmZpcm1SZWNvcmRpbmdcIlxuICAgICAgICBbcGFyYW1ldGVyc109XCJtZWRpYVNGVVBhcmFtZXRlcnNcIlxuICAgICAgPjwvYXBwLXJlY29yZGluZy1tb2RhbD5cblxuICAgICAgPGFwcC1tZXNzYWdlcy1tb2RhbFxuICAgICAgICBbYmFja2dyb3VuZENvbG9yXT1cIlxuICAgICAgICAgIGV2ZW50VHlwZS52YWx1ZSA9PT0gJ3dlYmluYXInIHx8IGV2ZW50VHlwZS52YWx1ZSA9PT0gJ2NvbmZlcmVuY2UnXG4gICAgICAgICAgICA/ICcjZjVmNWY1J1xuICAgICAgICAgICAgOiAncmdiYSgyNTUsIDI1NSwgMjU1LCAwLjI1KSdcbiAgICAgICAgXCJcbiAgICAgICAgW2lzTWVzc2FnZXNNb2RhbFZpc2libGVdPVwiaXNNZXNzYWdlc01vZGFsVmlzaWJsZS52YWx1ZVwiXG4gICAgICAgIFtvbk1lc3NhZ2VzQ2xvc2VdPVwib25NZXNzYWdlc0Nsb3NlXCJcbiAgICAgICAgW21lc3NhZ2VzXT1cIm1lc3NhZ2VzLnZhbHVlXCJcbiAgICAgICAgW2V2ZW50VHlwZV09XCJldmVudFR5cGUudmFsdWVcIlxuICAgICAgICBbbWVtYmVyXT1cIm1lbWJlci52YWx1ZVwiXG4gICAgICAgIFtpc2xldmVsXT1cImlzbGV2ZWwudmFsdWVcIlxuICAgICAgICBbY29Ib3N0UmVzcG9uc2liaWxpdHldPVwiY29Ib3N0UmVzcG9uc2liaWxpdHkudmFsdWVcIlxuICAgICAgICBbY29Ib3N0XT1cImNvSG9zdC52YWx1ZVwiXG4gICAgICAgIFtzdGFydERpcmVjdE1lc3NhZ2VdPVwic3RhcnREaXJlY3RNZXNzYWdlLnZhbHVlXCJcbiAgICAgICAgW2RpcmVjdE1lc3NhZ2VEZXRhaWxzXT1cImRpcmVjdE1lc3NhZ2VEZXRhaWxzLnZhbHVlXCJcbiAgICAgICAgW3VwZGF0ZVN0YXJ0RGlyZWN0TWVzc2FnZV09XCJ1cGRhdGVTdGFydERpcmVjdE1lc3NhZ2VcIlxuICAgICAgICBbdXBkYXRlRGlyZWN0TWVzc2FnZURldGFpbHNdPVwidXBkYXRlRGlyZWN0TWVzc2FnZURldGFpbHNcIlxuICAgICAgICBbc2hvd0FsZXJ0XT1cInNob3dBbGVydFwiXG4gICAgICAgIFtyb29tTmFtZV09XCJyb29tTmFtZS52YWx1ZVwiXG4gICAgICAgIFtzb2NrZXRdPVwic29ja2V0LnZhbHVlXCJcbiAgICAgICAgW2NoYXRTZXR0aW5nXT1cImNoYXRTZXR0aW5nLnZhbHVlXCJcbiAgICAgID48L2FwcC1tZXNzYWdlcy1tb2RhbD5cblxuICAgICAgPGFwcC1jb25maXJtLWV4aXQtbW9kYWxcbiAgICAgICAgW2JhY2tncm91bmRDb2xvcl09XCIncmdiYSgxODEsIDIzMywgMjI5LCAwLjk3KSdcIlxuICAgICAgICBbaXNDb25maXJtRXhpdE1vZGFsVmlzaWJsZV09XCJpc0NvbmZpcm1FeGl0TW9kYWxWaXNpYmxlLnZhbHVlXCJcbiAgICAgICAgW29uQ29uZmlybUV4aXRDbG9zZV09XCJvbkNvbmZpcm1FeGl0Q2xvc2VcIlxuICAgICAgICBbcG9zaXRpb25dPVwiJ3RvcFJpZ2h0J1wiXG4gICAgICAgIFttZW1iZXJdPVwibWVtYmVyLnZhbHVlXCJcbiAgICAgICAgW3Jvb21OYW1lXT1cInJvb21OYW1lLnZhbHVlXCJcbiAgICAgICAgW3NvY2tldF09XCJzb2NrZXQudmFsdWVcIlxuICAgICAgICBbaXNsZXZlbF09XCJpc2xldmVsLnZhbHVlXCJcbiAgICAgID48L2FwcC1jb25maXJtLWV4aXQtbW9kYWw+XG5cbiAgICAgIDxhcHAtY29uZmlybS1oZXJlLW1vZGFsXG4gICAgICAgIFtiYWNrZ3JvdW5kQ29sb3JdPVwiJ3JnYmEoMTgxLCAyMzMsIDIyOSwgMC45NyknXCJcbiAgICAgICAgW2lzQ29uZmlybUhlcmVNb2RhbFZpc2libGVdPVwiaXNDb25maXJtSGVyZU1vZGFsVmlzaWJsZS52YWx1ZVwiXG4gICAgICAgIFtvbkNvbmZpcm1IZXJlQ2xvc2VdPVwib25Db25maXJtSGVyZUNsb3NlXCJcbiAgICAgICAgW21lbWJlcl09XCJtZW1iZXIudmFsdWVcIlxuICAgICAgICBbcm9vbU5hbWVdPVwicm9vbU5hbWUudmFsdWVcIlxuICAgICAgICBbc29ja2V0XT1cInNvY2tldC52YWx1ZVwiXG4gICAgICA+PC9hcHAtY29uZmlybS1oZXJlLW1vZGFsPlxuXG4gICAgICA8YXBwLXNoYXJlLWV2ZW50LW1vZGFsXG4gICAgICAgIFtpc1NoYXJlRXZlbnRNb2RhbFZpc2libGVdPVwiaXNTaGFyZUV2ZW50TW9kYWxWaXNpYmxlLnZhbHVlXCJcbiAgICAgICAgW29uU2hhcmVFdmVudENsb3NlXT1cIm9uU2hhcmVFdmVudENsb3NlXCJcbiAgICAgICAgW3Jvb21OYW1lXT1cInJvb21OYW1lLnZhbHVlXCJcbiAgICAgICAgW2lzbGV2ZWxdPVwiaXNsZXZlbC52YWx1ZVwiXG4gICAgICAgIFthZG1pblBhc3Njb2RlXT1cImFkbWluUGFzc2NvZGUudmFsdWVcIlxuICAgICAgICBbZXZlbnRUeXBlXT1cImV2ZW50VHlwZS52YWx1ZVwiXG4gICAgICA+PC9hcHAtc2hhcmUtZXZlbnQtbW9kYWw+XG5cbiAgICAgIDxhcHAtcG9sbC1tb2RhbFxuICAgICAgICBbaXNQb2xsTW9kYWxWaXNpYmxlXT1cImlzUG9sbE1vZGFsVmlzaWJsZS52YWx1ZVwiXG4gICAgICAgIFtvbkNsb3NlXT1cIm9uUG9sbENsb3NlXCJcbiAgICAgICAgW21lbWJlcl09XCJtZW1iZXIudmFsdWVcIlxuICAgICAgICBbaXNsZXZlbF09XCJpc2xldmVsLnZhbHVlXCJcbiAgICAgICAgW3BvbGxzXT1cInBvbGxzLnZhbHVlXCJcbiAgICAgICAgW3BvbGxdPVwicG9sbC52YWx1ZVwiXG4gICAgICAgIFtzb2NrZXRdPVwic29ja2V0LnZhbHVlXCJcbiAgICAgICAgW3Jvb21OYW1lXT1cInJvb21OYW1lLnZhbHVlXCJcbiAgICAgICAgW3Nob3dBbGVydF09XCJzaG93QWxlcnRcIlxuICAgICAgICBbdXBkYXRlSXNQb2xsTW9kYWxWaXNpYmxlXT1cInVwZGF0ZUlzUG9sbE1vZGFsVmlzaWJsZVwiXG4gICAgICAgIFtoYW5kbGVDcmVhdGVQb2xsXT1cImhhbmRsZUNyZWF0ZVBvbGwuaGFuZGxlQ3JlYXRlUG9sbFwiXG4gICAgICAgIFtoYW5kbGVFbmRQb2xsXT1cImhhbmRsZUVuZFBvbGwuaGFuZGxlRW5kUG9sbFwiXG4gICAgICAgIFtoYW5kbGVWb3RlUG9sbF09XCJoYW5kbGVWb3RlUG9sbC5oYW5kbGVWb3RlUG9sbFwiXG4gICAgICA+PC9hcHAtcG9sbC1tb2RhbD5cblxuICAgICAgPGFwcC1iYWNrZ3JvdW5kLW1vZGFsXG4gICAgICAgIFtiYWNrZ3JvdW5kQ29sb3JdPVwiJ3JnYmEoMjE3LCAyMjcsIDIzNCwgMC45OSknXCJcbiAgICAgICAgW2lzVmlzaWJsZV09XCJpc0JhY2tncm91bmRNb2RhbFZpc2libGUudmFsdWVcIlxuICAgICAgICBbb25DbG9zZV09XCJvbkJhY2tncm91bmRDbG9zZVwiXG4gICAgICAgIFtwYXJhbWV0ZXJzXT1cIm1lZGlhU0ZVUGFyYW1ldGVyc1wiXG4gICAgICA+PC9hcHAtYmFja2dyb3VuZC1tb2RhbD5cblxuICAgICAgPGFwcC1icmVha291dC1yb29tcy1tb2RhbFxuICAgICAgICBbYmFja2dyb3VuZENvbG9yXT1cIidyZ2JhKDIxNywgMjI3LCAyMzQsIDAuOTkpJ1wiXG4gICAgICAgIFtpc1Zpc2libGVdPVwiaXNCcmVha291dFJvb21zTW9kYWxWaXNpYmxlLnZhbHVlXCJcbiAgICAgICAgW29uQnJlYWtvdXRSb29tc0Nsb3NlXT1cIm9uQnJlYWtvdXRSb29tc0Nsb3NlXCJcbiAgICAgICAgW3BhcmFtZXRlcnNdPVwibWVkaWFTRlVQYXJhbWV0ZXJzXCJcbiAgICAgID48L2FwcC1icmVha291dC1yb29tcy1tb2RhbD5cblxuICAgICAgPGFwcC1jb25maWd1cmUtd2hpdGVib2FyZC1tb2RhbFxuICAgICAgICBbYmFja2dyb3VuZENvbG9yXT1cIidyZ2JhKDIxNywgMjI3LCAyMzQsIDAuOTkpJ1wiXG4gICAgICAgIFtpc1Zpc2libGVdPVwiaXNDb25maWd1cmVXaGl0ZWJvYXJkTW9kYWxWaXNpYmxlLnZhbHVlXCJcbiAgICAgICAgW29uQ29uZmlndXJlV2hpdGVib2FyZENsb3NlXT1cIm9uQ29uZmlndXJlV2hpdGVib2FyZENsb3NlXCJcbiAgICAgICAgW3BhcmFtZXRlcnNdPVwibWVkaWFTRlVQYXJhbWV0ZXJzXCJcbiAgICAgID48L2FwcC1jb25maWd1cmUtd2hpdGVib2FyZC1tb2RhbD5cblxuICAgICAgPGFwcC1zY3JlZW5ib2FyZC1tb2RhbFxuICAgICAgICBbYmFja2dyb3VuZENvbG9yXT1cIidyZ2JhKDIxNywgMjI3LCAyMzQsIDAuOTkpJ1wiXG4gICAgICAgIFtpc1Zpc2libGVdPVwiaXNTY3JlZW5ib2FyZE1vZGFsVmlzaWJsZS52YWx1ZVwiXG4gICAgICAgIFtvbkNsb3NlXT1cIm9uU2NyZWVuYm9hcmRDbG9zZVwiXG4gICAgICAgIFtwYXJhbWV0ZXJzXT1cIm1lZGlhU0ZVUGFyYW1ldGVyc1wiXG4gICAgICA+PC9hcHAtc2NyZWVuYm9hcmQtbW9kYWw+XG5cbiAgICAgIDxhcHAtYWxlcnQtY29tcG9uZW50XG4gICAgICAgIFt2aXNpYmxlXT1cImFsZXJ0VmlzaWJsZS52YWx1ZVwiXG4gICAgICAgIFttZXNzYWdlXT1cImFsZXJ0TWVzc2FnZS52YWx1ZVwiXG4gICAgICAgIFt0eXBlXT1cImFsZXJ0VHlwZS52YWx1ZVwiXG4gICAgICAgIFtkdXJhdGlvbl09XCJhbGVydER1cmF0aW9uLnZhbHVlXCJcbiAgICAgICAgW29uSGlkZV09XCJvbkFsZXJ0SGlkZVwiXG4gICAgICAgIHRleHRDb2xvcj1cIiNmZmZmZmZcIlxuICAgICAgPjwvYXBwLWFsZXJ0LWNvbXBvbmVudD5cblxuICAgICAgPGFwcC1sb2FkaW5nLW1vZGFsXG4gICAgICAgIFtpc1Zpc2libGVdPVwiaXNMb2FkaW5nTW9kYWxWaXNpYmxlLnZhbHVlXCJcbiAgICAgICAgW2JhY2tncm91bmRDb2xvcl09XCIncmdiYSgyMTcsIDIyNywgMjM0LCAwLjk5KSdcIlxuICAgICAgICBkaXNwbGF5Q29sb3I9XCJibGFja1wiXG4gICAgICA+PC9hcHAtbG9hZGluZy1tb2RhbD5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgc3R5bGVzOiBbXG4gICAgYFxuICAgICAgLk1lZGlhU0ZVIHtcbiAgICAgICAgLyogQWRkIGFueSBjb21wb25lbnQtc3BlY2lmaWMgc3R5bGVzIGhlcmUgKi9cbiAgICAgIH1cbiAgICBgLFxuICBdLFxuICBwcm92aWRlcnM6IFtDb29raWVTZXJ2aWNlXSxcbn0pXG5leHBvcnQgY2xhc3MgTWVkaWFzZnVHZW5lcmljIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKVxuICBQcmVqb2luUGFnZTogYW55ID0gV2VsY29tZVBhZ2U7XG4gIEBJbnB1dCgpIGNyZWRlbnRpYWxzOiB7IGFwaVVzZXJOYW1lOiBzdHJpbmc7IGFwaUtleTogc3RyaW5nIH0gPSB7IGFwaVVzZXJOYW1lOiAnJywgYXBpS2V5OiAnJyB9O1xuICBASW5wdXQoKSB1c2VMb2NhbFVJTW9kZSA9IGZhbHNlO1xuICBASW5wdXQoKSBzZWVkRGF0YT86IFNlZWREYXRhO1xuICBASW5wdXQoKSB1c2VTZWVkID0gZmFsc2U7XG4gIEBJbnB1dCgpIGltZ1NyYyA9ICdodHRwczovL21lZGlhc2Z1LmNvbS9pbWFnZXMvbG9nbzE5Mi5wbmcnO1xuXG4gIHRpdGxlID0gJ01lZGlhU0ZVLUdlbmVyaWMnO1xuXG4gIHByaXZhdGUgbWFpbkhlaWdodFdpZHRoU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gfCB1bmRlZmluZWQ7XG4gIHByaXZhdGUgdmFsaWRhdGVkU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gfCB1bmRlZmluZWQ7XG4gIHByaXZhdGUgaXNsZXZlbFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uIHwgdW5kZWZpbmVkO1xuICBwcml2YXRlIGNvSG9zdFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uIHwgdW5kZWZpbmVkO1xuICBwcml2YXRlIGJ1dHRvblN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG4gIHByaXZhdGUgU2NyZWVuYm9hcmRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiB8IHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSByZWNvcmRpbmdTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiB8IHVuZGVmaW5lZDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgcHVibGljIHVwZGF0ZU1pbmlDYXJkc0dyaWQ6IFVwZGF0ZU1pbmlDYXJkc0dyaWQsXG4gICAgcHVibGljIG1peFN0cmVhbXM6IE1peFN0cmVhbXMsXG4gICAgcHVibGljIGRpc3BTdHJlYW1zOiBEaXNwU3RyZWFtcyxcbiAgICBwdWJsaWMgc3RvcFNoYXJlU2NyZWVuOiBTdG9wU2hhcmVTY3JlZW4sXG4gICAgcHVibGljIGNoZWNrU2NyZWVuU2hhcmU6IENoZWNrU2NyZWVuU2hhcmUsXG4gICAgcHVibGljIHN0YXJ0U2hhcmVTY3JlZW46IFN0YXJ0U2hhcmVTY3JlZW4sXG4gICAgcHVibGljIHJlcXVlc3RTY3JlZW5TaGFyZTogUmVxdWVzdFNjcmVlblNoYXJlLFxuICAgIHB1YmxpYyByZW9yZGVyU3RyZWFtczogUmVvcmRlclN0cmVhbXMsXG4gICAgcHVibGljIHByZXBvcHVsYXRlVXNlck1lZGlhOiBQcmVwb3B1bGF0ZVVzZXJNZWRpYSxcbiAgICBwdWJsaWMgZ2V0VmlkZW9zOiBHZXRWaWRlb3MsXG4gICAgcHVibGljIHJlUG9ydDogUmVQb3J0LFxuICAgIHB1YmxpYyB0cmlnZ2VyOiBUcmlnZ2VyLFxuICAgIHB1YmxpYyBjb25zdW1lclJlc3VtZTogQ29uc3VtZXJSZXN1bWUsXG4gICAgcHVibGljIGNvbm5lY3RTZW5kVHJhbnNwb3J0OiBDb25uZWN0U2VuZFRyYW5zcG9ydCxcbiAgICBwdWJsaWMgY29ubmVjdFNlbmRUcmFuc3BvcnRBdWRpbzogQ29ubmVjdFNlbmRUcmFuc3BvcnRBdWRpbyxcbiAgICBwdWJsaWMgY29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlbzogQ29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlbyxcbiAgICBwdWJsaWMgY29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW46IENvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuLFxuICAgIHB1YmxpYyBwcm9jZXNzQ29uc3VtZXJUcmFuc3BvcnRzOiBQcm9jZXNzQ29uc3VtZXJUcmFuc3BvcnRzLFxuICAgIHB1YmxpYyByZXN1bWVQYXVzZVN0cmVhbXM6IFJlc3VtZVBhdXNlU3RyZWFtcyxcbiAgICBwdWJsaWMgcmVhZGp1c3Q6IFJlYWRqdXN0LFxuICAgIHB1YmxpYyBjaGVja0dyaWQ6IENoZWNrR3JpZCxcbiAgICBwdWJsaWMgZ2V0RXN0aW1hdGU6IEdldEVzdGltYXRlLFxuICAgIHB1YmxpYyBjYWxjdWxhdGVSb3dzQW5kQ29sdW1uczogQ2FsY3VsYXRlUm93c0FuZENvbHVtbnMsXG4gICAgcHVibGljIGFkZFZpZGVvc0dyaWQ6IEFkZFZpZGVvc0dyaWQsXG4gICAgcHVibGljIG9uU2NyZWVuQ2hhbmdlczogT25TY3JlZW5DaGFuZ2VzLFxuICAgIHB1YmxpYyBjaGFuZ2VWaWRzOiBDaGFuZ2VWaWRzLFxuICAgIHB1YmxpYyBjb21wYXJlQWN0aXZlTmFtZXM6IENvbXBhcmVBY3RpdmVOYW1lcyxcbiAgICBwdWJsaWMgY29tcGFyZVNjcmVlblN0YXRlczogQ29tcGFyZVNjcmVlblN0YXRlcyxcbiAgICBwdWJsaWMgY3JlYXRlU2VuZFRyYW5zcG9ydDogQ3JlYXRlU2VuZFRyYW5zcG9ydCxcbiAgICBwdWJsaWMgcmVzdW1lU2VuZFRyYW5zcG9ydEF1ZGlvOiBSZXN1bWVTZW5kVHJhbnNwb3J0QXVkaW8sXG4gICAgcHVibGljIHJlY2VpdmVBbGxQaXBlZFRyYW5zcG9ydHM6IFJlY2VpdmVBbGxQaXBlZFRyYW5zcG9ydHMsXG4gICAgcHVibGljIGRpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0VmlkZW86IERpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0VmlkZW8sXG4gICAgcHVibGljIGRpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW86IERpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW8sXG4gICAgcHVibGljIGRpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuOiBEaXNjb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlbixcbiAgICBwdWJsaWMgZ2V0UGlwZWRQcm9kdWNlcnNBbHQ6IEdldFBpcGVkUHJvZHVjZXJzQWx0LFxuICAgIHB1YmxpYyBzaWduYWxOZXdDb25zdW1lclRyYW5zcG9ydDogU2lnbmFsTmV3Q29uc3VtZXJUcmFuc3BvcnQsXG4gICAgcHVibGljIGNvbm5lY3RSZWN2VHJhbnNwb3J0OiBDb25uZWN0UmVjdlRyYW5zcG9ydCxcbiAgICBwdWJsaWMgcmVVcGRhdGVJbnRlcjogUmVVcGRhdGVJbnRlcixcbiAgICBwdWJsaWMgdXBkYXRlUGFydGljaXBhbnRBdWRpb0RlY2liZWxzOiBVcGRhdGVQYXJ0aWNpcGFudEF1ZGlvRGVjaWJlbHMsXG4gICAgcHVibGljIGNsb3NlQW5kUmVzaXplOiBDbG9zZUFuZFJlc2l6ZSxcbiAgICBwdWJsaWMgYXV0b0FkanVzdDogQXV0b0FkanVzdCxcbiAgICBwdWJsaWMgc3dpdGNoVXNlclZpZGVvQWx0OiBTd2l0Y2hVc2VyVmlkZW9BbHQsXG4gICAgcHVibGljIHN3aXRjaFVzZXJWaWRlbzogU3dpdGNoVXNlclZpZGVvLFxuICAgIHB1YmxpYyBzd2l0Y2hVc2VyQXVkaW86IFN3aXRjaFVzZXJBdWRpbyxcbiAgICBwdWJsaWMgZ2V0RG9tYWluczogR2V0RG9tYWlucyxcbiAgICBwdWJsaWMgZm9ybWF0TnVtYmVyOiBGb3JtYXROdW1iZXIsXG4gICAgcHVibGljIGNvbm5lY3RJcHM6IENvbm5lY3RJcHMsXG4gICAgcHVibGljIGNyZWF0ZURldmljZUNsaWVudDogQ3JlYXRlRGV2aWNlQ2xpZW50LFxuICAgIHB1YmxpYyBoYW5kbGVDcmVhdGVQb2xsOiBIYW5kbGVDcmVhdGVQb2xsLFxuICAgIHB1YmxpYyBoYW5kbGVFbmRQb2xsOiBIYW5kbGVFbmRQb2xsLFxuICAgIHB1YmxpYyBoYW5kbGVWb3RlUG9sbDogSGFuZGxlVm90ZVBvbGwsXG4gICAgcHVibGljIGNhcHR1cmVDYW52YXNTdHJlYW06IENhcHR1cmVDYW52YXNTdHJlYW0sXG4gICAgcHVibGljIHJlc3VtZVBhdXNlQXVkaW9TdHJlYW1zOiBSZXN1bWVQYXVzZUF1ZGlvU3RyZWFtcyxcbiAgICBwdWJsaWMgcHJvY2Vzc0NvbnN1bWVyVHJhbnNwb3J0c0F1ZGlvOiBQcm9jZXNzQ29uc3VtZXJUcmFuc3BvcnRzQXVkaW8sXG5cbiAgICBwdWJsaWMgbGF1bmNoTWVudU1vZGFsOiBMYXVuY2hNZW51TW9kYWwsXG4gICAgcHVibGljIGxhdW5jaFJlY29yZGluZzogTGF1bmNoUmVjb3JkaW5nLFxuICAgIHB1YmxpYyBzdGFydFJlY29yZGluZzogU3RhcnRSZWNvcmRpbmcsXG4gICAgcHVibGljIGNvbmZpcm1SZWNvcmRpbmc6IENvbmZpcm1SZWNvcmRpbmcsXG4gICAgcHVibGljIGxhdW5jaFdhaXRpbmc6IExhdW5jaFdhaXRpbmcsXG4gICAgcHVibGljIGxhdW5jaENvSG9zdDogbGF1bmNoQ29Ib3N0LFxuICAgIHB1YmxpYyBsYXVuY2hNZWRpYVNldHRpbmdzOiBMYXVuY2hNZWRpYVNldHRpbmdzLFxuICAgIHB1YmxpYyBsYXVuY2hEaXNwbGF5U2V0dGluZ3M6IExhdW5jaERpc3BsYXlTZXR0aW5ncyxcbiAgICBwdWJsaWMgbGF1bmNoU2V0dGluZ3M6IExhdW5jaFNldHRpbmdzLFxuICAgIHB1YmxpYyBsYXVuY2hSZXF1ZXN0czogTGF1bmNoUmVxdWVzdHMsXG4gICAgcHVibGljIGxhdW5jaFBhcnRpY2lwYW50czogTGF1bmNoUGFydGljaXBhbnRzLFxuICAgIHB1YmxpYyBsYXVuY2hNZXNzYWdlczogTGF1bmNoTWVzc2FnZXMsXG4gICAgcHVibGljIGxhdW5jaENvbmZpcm1FeGl0OiBMYXVuY2hDb25maXJtRXhpdCxcbiAgICBwdWJsaWMgbGF1bmNoUG9sbDogTGF1bmNoUG9sbCxcbiAgICBwdWJsaWMgbGF1bmNoQnJlYWtvdXRSb29tczogTGF1bmNoQnJlYWtvdXRSb29tcyxcbiAgICBwdWJsaWMgbGF1bmNoQ29uZmlndXJlV2hpdGVib2FyZDogTGF1bmNoQ29uZmlndXJlV2hpdGVib2FyZCxcbiAgICBwdWJsaWMgc3RhcnRNZWV0aW5nUHJvZ3Jlc3NUaW1lcjogU3RhcnRNZWV0aW5nUHJvZ3Jlc3NUaW1lcixcbiAgICBwdWJsaWMgdXBkYXRlUmVjb3JkaW5nOiBVcGRhdGVSZWNvcmRpbmcsXG4gICAgcHVibGljIHN0b3BSZWNvcmRpbmc6IFN0b3BSZWNvcmRpbmcsXG4gICAgcHVibGljIHVzZXJXYWl0aW5nOiBVc2VyV2FpdGluZyxcbiAgICBwdWJsaWMgcGVyc29uSm9pbmVkOiBQZXJzb25Kb2luZWQsXG4gICAgcHVibGljIGFsbFdhaXRpbmdSb29tTWVtYmVyczogQWxsV2FpdGluZ1Jvb21NZW1iZXJzLFxuICAgIHB1YmxpYyByb29tUmVjb3JkUGFyYW1zOiBSb29tUmVjb3JkUGFyYW1zLFxuICAgIHB1YmxpYyBiYW5QYXJ0aWNpcGFudDogQmFuUGFydGljaXBhbnQsXG4gICAgcHVibGljIHVwZGF0ZWRDb0hvc3Q6IFVwZGF0ZWRDb0hvc3QsXG4gICAgcHVibGljIHBhcnRpY2lwYW50UmVxdWVzdGVkOiBQYXJ0aWNpcGFudFJlcXVlc3RlZCxcbiAgICBwdWJsaWMgc2NyZWVuUHJvZHVjZXJJZDogU2NyZWVuUHJvZHVjZXJJZCxcbiAgICBwdWJsaWMgdXBkYXRlTWVkaWFTZXR0aW5nczogVXBkYXRlTWVkaWFTZXR0aW5ncyxcbiAgICBwdWJsaWMgcHJvZHVjZXJNZWRpYVBhdXNlZDogUHJvZHVjZXJNZWRpYVBhdXNlZCxcbiAgICBwdWJsaWMgcHJvZHVjZXJNZWRpYVJlc3VtZWQ6IFByb2R1Y2VyTWVkaWFSZXN1bWVkLFxuICAgIHB1YmxpYyBwcm9kdWNlck1lZGlhQ2xvc2VkOiBQcm9kdWNlck1lZGlhQ2xvc2VkLFxuICAgIHB1YmxpYyBjb250cm9sTWVkaWFIb3N0OiBDb250cm9sTWVkaWFIb3N0LFxuICAgIHB1YmxpYyBtZWV0aW5nRW5kZWQ6IE1lZXRpbmdFbmRlZCxcbiAgICBwdWJsaWMgZGlzY29ubmVjdFVzZXJTZWxmOiBEaXNjb25uZWN0VXNlclNlbGYsXG4gICAgcHVibGljIHJlY2VpdmVNZXNzYWdlOiBSZWNlaXZlTWVzc2FnZSxcbiAgICBwdWJsaWMgbWVldGluZ1RpbWVSZW1haW5pbmc6IE1lZXRpbmdUaW1lUmVtYWluaW5nLFxuICAgIHB1YmxpYyBtZWV0aW5nU3RpbGxUaGVyZTogTWVldGluZ1N0aWxsVGhlcmUsXG4gICAgcHVibGljIHN0YXJ0UmVjb3JkczogU3RhcnRSZWNvcmRzLFxuICAgIHB1YmxpYyByZUluaXRpYXRlUmVjb3JkaW5nOiBSZUluaXRpYXRlUmVjb3JkaW5nLFxuICAgIHB1YmxpYyByZWNvcmRpbmdOb3RpY2U6IFJlY29yZGluZ05vdGljZSxcbiAgICBwdWJsaWMgdGltZUxlZnRSZWNvcmRpbmc6IFRpbWVMZWZ0UmVjb3JkaW5nLFxuICAgIHB1YmxpYyBzdG9wcGVkUmVjb3JkaW5nOiBTdG9wcGVkUmVjb3JkaW5nLFxuICAgIHB1YmxpYyBob3N0UmVxdWVzdFJlc3BvbnNlOiBIb3N0UmVxdWVzdFJlc3BvbnNlLFxuICAgIHB1YmxpYyBhbGxNZW1iZXJzOiBBbGxNZW1iZXJzLFxuICAgIHB1YmxpYyBhbGxNZW1iZXJzUmVzdDogQWxsTWVtYmVyc1Jlc3QsXG4gICAgcHVibGljIGRpc2Nvbm5lY3Q6IERpc2Nvbm5lY3QsXG4gICAgcHVibGljIHBvbGxVcGRhdGVkOiBQb2xsVXBkYXRlZCxcbiAgICBwdWJsaWMgYnJlYWtvdXRSb29tVXBkYXRlZDogQnJlYWtvdXRSb29tVXBkYXRlZCxcbiAgICBwdWJsaWMgc29ja2V0TWFuYWdlcjogU29ja2V0TWFuYWdlcixcbiAgICBwdWJsaWMgam9pblJvb21DbGllbnQ6IEpvaW5Sb29tQ2xpZW50LFxuICAgIHB1YmxpYyB1cGRhdGVSb29tUGFyYW1ldGVyc0NsaWVudDogVXBkYXRlUm9vbVBhcmFtZXRlcnNDbGllbnQsXG4gICAgcHVibGljIGNsaWNrVmlkZW86IENsaWNrVmlkZW8sXG4gICAgcHVibGljIGNsaWNrQXVkaW86IENsaWNrQXVkaW8sXG4gICAgcHVibGljIGNsaWNrU2NyZWVuU2hhcmU6IENsaWNrU2NyZWVuU2hhcmUsXG4gICAgcHVibGljIHN3aXRjaFZpZGVvQWx0OiBTd2l0Y2hWaWRlb0FsdCxcbiAgICBwdWJsaWMgc3RyZWFtU3VjY2Vzc1ZpZGVvOiBTdHJlYW1TdWNjZXNzVmlkZW8sXG4gICAgcHVibGljIHN0cmVhbVN1Y2Nlc3NBdWRpbzogU3RyZWFtU3VjY2Vzc0F1ZGlvLFxuICAgIHB1YmxpYyBzdHJlYW1TdWNjZXNzU2NyZWVuOiBTdHJlYW1TdWNjZXNzU2NyZWVuLFxuICAgIHB1YmxpYyBzdHJlYW1TdWNjZXNzQXVkaW9Td2l0Y2g6IFN0cmVhbVN1Y2Nlc3NBdWRpb1N3aXRjaCxcbiAgICBwdWJsaWMgY2hlY2tQZXJtaXNzaW9uOiBDaGVja1Blcm1pc3Npb24sXG4gICAgcHVibGljIHVwZGF0ZUNvbnN1bWluZ0RvbWFpbnM6IFVwZGF0ZUNvbnN1bWluZ0RvbWFpbnMsXG4gICAgcHVibGljIHJlY2VpdmVSb29tTWVzc2FnZXM6IFJlY2VpdmVSb29tTWVzc2FnZXMsXG4gICkge31cblxuICBjcmVhdGVJbmplY3RvcihpbnB1dHM6IGFueSkge1xuICAgIGNvbnN0IGluaiA9IEluamVjdG9yLmNyZWF0ZSh7XG4gICAgICBwcm92aWRlcnM6IE9iamVjdC5rZXlzKGlucHV0cykubWFwKChrZXkpID0+ICh7IHByb3ZpZGU6IGtleSwgdXNlVmFsdWU6IGlucHV0c1trZXldIH0pKSxcbiAgICAgIHBhcmVudDogdGhpcy5pbmplY3RvcixcbiAgICB9KTtcblxuICAgIHJldHVybiBpbmo7XG4gIH1cblxuICAvLyBJbml0aWFsIHZhbHVlc1xuICBtZWRpYVNGVUZ1bmN0aW9ucyA9ICgpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlTWluaUNhcmRzR3JpZDpcbiAgICAgICAgdGhpcy51cGRhdGVNaW5pQ2FyZHNHcmlkPy51cGRhdGVNaW5pQ2FyZHNHcmlkIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBtaXhTdHJlYW1zOlxuICAgICAgICB0aGlzLm1peFN0cmVhbXM/Lm1peFN0cmVhbXMgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGRpc3BTdHJlYW1zOlxuICAgICAgICB0aGlzLmRpc3BTdHJlYW1zPy5kaXNwU3RyZWFtcyB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgc3RvcFNoYXJlU2NyZWVuOlxuICAgICAgICB0aGlzLnN0b3BTaGFyZVNjcmVlbj8uc3RvcFNoYXJlU2NyZWVuIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBjaGVja1NjcmVlblNoYXJlOlxuICAgICAgICB0aGlzLmNoZWNrU2NyZWVuU2hhcmU/LmNoZWNrU2NyZWVuU2hhcmUgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIHN0YXJ0U2hhcmVTY3JlZW46XG4gICAgICAgIHRoaXMuc3RhcnRTaGFyZVNjcmVlbj8uc3RhcnRTaGFyZVNjcmVlbiB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgcmVxdWVzdFNjcmVlblNoYXJlOlxuICAgICAgICB0aGlzLnJlcXVlc3RTY3JlZW5TaGFyZT8ucmVxdWVzdFNjcmVlblNoYXJlIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICByZW9yZGVyU3RyZWFtczpcbiAgICAgICAgdGhpcy5yZW9yZGVyU3RyZWFtcz8ucmVvcmRlclN0cmVhbXMgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIHByZXBvcHVsYXRlVXNlck1lZGlhOlxuICAgICAgICB0aGlzLnByZXBvcHVsYXRlVXNlck1lZGlhPy5wcmVwb3B1bGF0ZVVzZXJNZWRpYSB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgZ2V0VmlkZW9zOlxuICAgICAgICB0aGlzLmdldFZpZGVvcz8uZ2V0VmlkZW9zIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICByZVBvcnQ6XG4gICAgICAgIHRoaXMucmVQb3J0Py5yZVBvcnQgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIHRyaWdnZXI6XG4gICAgICAgIHRoaXMudHJpZ2dlcj8udHJpZ2dlciB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgY29uc3VtZXJSZXN1bWU6XG4gICAgICAgIHRoaXMuY29uc3VtZXJSZXN1bWU/LmNvbnN1bWVyUmVzdW1lIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBjb25uZWN0U2VuZFRyYW5zcG9ydDpcbiAgICAgICAgdGhpcy5jb25uZWN0U2VuZFRyYW5zcG9ydD8uY29ubmVjdFNlbmRUcmFuc3BvcnQgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGNvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW86XG4gICAgICAgIHRoaXMuY29ubmVjdFNlbmRUcmFuc3BvcnRBdWRpbz8uY29ubmVjdFNlbmRUcmFuc3BvcnRBdWRpbyB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgY29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlbzpcbiAgICAgICAgdGhpcy5jb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvPy5jb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBjb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlbjpcbiAgICAgICAgdGhpcy5jb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlbj8uY29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW4gfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIHByb2Nlc3NDb25zdW1lclRyYW5zcG9ydHM6XG4gICAgICAgIHRoaXMucHJvY2Vzc0NvbnN1bWVyVHJhbnNwb3J0cz8ucHJvY2Vzc0NvbnN1bWVyVHJhbnNwb3J0cyB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgcmVzdW1lUGF1c2VTdHJlYW1zOlxuICAgICAgICB0aGlzLnJlc3VtZVBhdXNlU3RyZWFtcz8ucmVzdW1lUGF1c2VTdHJlYW1zIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICByZWFkanVzdDpcbiAgICAgICAgdGhpcy5yZWFkanVzdD8ucmVhZGp1c3QgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGNoZWNrR3JpZDpcbiAgICAgICAgdGhpcy5jaGVja0dyaWQ/LmNoZWNrR3JpZCB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgZ2V0RXN0aW1hdGU6XG4gICAgICAgIHRoaXMuZ2V0RXN0aW1hdGU/LmdldEVzdGltYXRlIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBjYWxjdWxhdGVSb3dzQW5kQ29sdW1uczpcbiAgICAgICAgdGhpcy5jYWxjdWxhdGVSb3dzQW5kQ29sdW1ucz8uY2FsY3VsYXRlUm93c0FuZENvbHVtbnMgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGFkZFZpZGVvc0dyaWQ6XG4gICAgICAgIHRoaXMuYWRkVmlkZW9zR3JpZD8uYWRkVmlkZW9zR3JpZCB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgb25TY3JlZW5DaGFuZ2VzOlxuICAgICAgICB0aGlzLm9uU2NyZWVuQ2hhbmdlcz8ub25TY3JlZW5DaGFuZ2VzIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBzbGVlcDpcbiAgICAgICAgc2xlZXAgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGNoYW5nZVZpZHM6XG4gICAgICAgIHRoaXMuY2hhbmdlVmlkcz8uY2hhbmdlVmlkcyB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgY29tcGFyZUFjdGl2ZU5hbWVzOlxuICAgICAgICB0aGlzLmNvbXBhcmVBY3RpdmVOYW1lcz8uY29tcGFyZUFjdGl2ZU5hbWVzIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBjb21wYXJlU2NyZWVuU3RhdGVzOlxuICAgICAgICB0aGlzLmNvbXBhcmVTY3JlZW5TdGF0ZXM/LmNvbXBhcmVTY3JlZW5TdGF0ZXMgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGNyZWF0ZVNlbmRUcmFuc3BvcnQ6XG4gICAgICAgIHRoaXMuY3JlYXRlU2VuZFRyYW5zcG9ydD8uY3JlYXRlU2VuZFRyYW5zcG9ydCB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgcmVzdW1lU2VuZFRyYW5zcG9ydEF1ZGlvOlxuICAgICAgICB0aGlzLnJlc3VtZVNlbmRUcmFuc3BvcnRBdWRpbz8ucmVzdW1lU2VuZFRyYW5zcG9ydEF1ZGlvIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICByZWNlaXZlQWxsUGlwZWRUcmFuc3BvcnRzOlxuICAgICAgICB0aGlzLnJlY2VpdmVBbGxQaXBlZFRyYW5zcG9ydHM/LnJlY2VpdmVBbGxQaXBlZFRyYW5zcG9ydHMgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGRpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0VmlkZW86XG4gICAgICAgIHRoaXMuZGlzY29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlbz8uZGlzY29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlbyB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgZGlzY29ubmVjdFNlbmRUcmFuc3BvcnRBdWRpbzpcbiAgICAgICAgdGhpcy5kaXNjb25uZWN0U2VuZFRyYW5zcG9ydEF1ZGlvPy5kaXNjb25uZWN0U2VuZFRyYW5zcG9ydEF1ZGlvIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBkaXNjb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlbjpcbiAgICAgICAgdGhpcy5kaXNjb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlbj8uZGlzY29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW4gfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGdldFBpcGVkUHJvZHVjZXJzQWx0OlxuICAgICAgICB0aGlzLmdldFBpcGVkUHJvZHVjZXJzQWx0Py5nZXRQaXBlZFByb2R1Y2Vyc0FsdCB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgc2lnbmFsTmV3Q29uc3VtZXJUcmFuc3BvcnQ6XG4gICAgICAgIHRoaXMuc2lnbmFsTmV3Q29uc3VtZXJUcmFuc3BvcnQ/LnNpZ25hbE5ld0NvbnN1bWVyVHJhbnNwb3J0IHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBjb25uZWN0UmVjdlRyYW5zcG9ydDpcbiAgICAgICAgdGhpcy5jb25uZWN0UmVjdlRyYW5zcG9ydD8uY29ubmVjdFJlY3ZUcmFuc3BvcnQgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIHJlVXBkYXRlSW50ZXI6XG4gICAgICAgIHRoaXMucmVVcGRhdGVJbnRlcj8ucmVVcGRhdGVJbnRlciB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgdXBkYXRlUGFydGljaXBhbnRBdWRpb0RlY2liZWxzOlxuICAgICAgICB0aGlzLnVwZGF0ZVBhcnRpY2lwYW50QXVkaW9EZWNpYmVscz8udXBkYXRlUGFydGljaXBhbnRBdWRpb0RlY2liZWxzIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBjbG9zZUFuZFJlc2l6ZTpcbiAgICAgICAgdGhpcy5jbG9zZUFuZFJlc2l6ZT8uY2xvc2VBbmRSZXNpemUgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGF1dG9BZGp1c3Q6XG4gICAgICAgIHRoaXMuYXV0b0FkanVzdD8uYXV0b0FkanVzdCB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgc3dpdGNoVXNlclZpZGVvQWx0OlxuICAgICAgICB0aGlzLnN3aXRjaFVzZXJWaWRlb0FsdD8uc3dpdGNoVXNlclZpZGVvQWx0IHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBzd2l0Y2hVc2VyVmlkZW86XG4gICAgICAgIHRoaXMuc3dpdGNoVXNlclZpZGVvPy5zd2l0Y2hVc2VyVmlkZW8gfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIHN3aXRjaFVzZXJBdWRpbzpcbiAgICAgICAgdGhpcy5zd2l0Y2hVc2VyQXVkaW8/LnN3aXRjaFVzZXJBdWRpbyB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgZ2V0RG9tYWluczpcbiAgICAgICAgdGhpcy5nZXREb21haW5zPy5nZXREb21haW5zIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBmb3JtYXROdW1iZXI6XG4gICAgICAgIHRoaXMuZm9ybWF0TnVtYmVyPy5mb3JtYXROdW1iZXIgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGNvbm5lY3RJcHM6XG4gICAgICAgIHRoaXMuY29ubmVjdElwcz8uY29ubmVjdElwcyB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgY3JlYXRlRGV2aWNlQ2xpZW50OlxuICAgICAgICB0aGlzLmNyZWF0ZURldmljZUNsaWVudD8uY3JlYXRlRGV2aWNlQ2xpZW50IHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBoYW5kbGVDcmVhdGVQb2xsOlxuICAgICAgICB0aGlzLmhhbmRsZUNyZWF0ZVBvbGw/LmhhbmRsZUNyZWF0ZVBvbGwgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGhhbmRsZUVuZFBvbGw6XG4gICAgICAgIHRoaXMuaGFuZGxlRW5kUG9sbD8uaGFuZGxlRW5kUG9sbCB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgaGFuZGxlVm90ZVBvbGw6XG4gICAgICAgIHRoaXMuaGFuZGxlVm90ZVBvbGw/LmhhbmRsZVZvdGVQb2xsIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBjYXB0dXJlQ2FudmFzU3RyZWFtOlxuICAgICAgICB0aGlzLmNhcHR1cmVDYW52YXNTdHJlYW0/LmNhcHR1cmVDYW52YXNTdHJlYW0gfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIHJlc3VtZVBhdXNlQXVkaW9TdHJlYW1zOlxuICAgICAgICB0aGlzLnJlc3VtZVBhdXNlQXVkaW9TdHJlYW1zPy5yZXN1bWVQYXVzZUF1ZGlvU3RyZWFtcyB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgcHJvY2Vzc0NvbnN1bWVyVHJhbnNwb3J0c0F1ZGlvOlxuICAgICAgICB0aGlzLnByb2Nlc3NDb25zdW1lclRyYW5zcG9ydHNBdWRpbz8ucHJvY2Vzc0NvbnN1bWVyVHJhbnNwb3J0c0F1ZGlvIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBjaGVja1Blcm1pc3Npb246XG4gICAgICAgIHRoaXMuY2hlY2tQZXJtaXNzaW9uPy5jaGVja1Blcm1pc3Npb24gfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIHN0cmVhbVN1Y2Nlc3NWaWRlbzpcbiAgICAgICAgdGhpcy5zdHJlYW1TdWNjZXNzVmlkZW8/LnN0cmVhbVN1Y2Nlc3NWaWRlbyB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgc3RyZWFtU3VjY2Vzc0F1ZGlvOlxuICAgICAgICB0aGlzLnN0cmVhbVN1Y2Nlc3NBdWRpbz8uc3RyZWFtU3VjY2Vzc0F1ZGlvIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBzdHJlYW1TdWNjZXNzU2NyZWVuOlxuICAgICAgICB0aGlzLnN0cmVhbVN1Y2Nlc3NTY3JlZW4/LnN0cmVhbVN1Y2Nlc3NTY3JlZW4gfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIHN0cmVhbVN1Y2Nlc3NBdWRpb1N3aXRjaDpcbiAgICAgICAgdGhpcy5zdHJlYW1TdWNjZXNzQXVkaW9Td2l0Y2g/LnN0cmVhbVN1Y2Nlc3NBdWRpb1N3aXRjaCB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgY2xpY2tWaWRlbzpcbiAgICAgICAgdGhpcy5jbGlja1ZpZGVvPy5jbGlja1ZpZGVvIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBjbGlja0F1ZGlvOlxuICAgICAgICB0aGlzLmNsaWNrQXVkaW8/LmNsaWNrQXVkaW8gfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGNsaWNrU2NyZWVuU2hhcmU6XG4gICAgICAgIHRoaXMuY2xpY2tTY3JlZW5TaGFyZT8uY2xpY2tTY3JlZW5TaGFyZSB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgc3dpdGNoVmlkZW9BbHQ6XG4gICAgICAgIHRoaXMuc3dpdGNoVmlkZW9BbHQ/LnN3aXRjaFZpZGVvQWx0IHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICByZXF1ZXN0UGVybWlzc2lvbkNhbWVyYTpcbiAgICAgICAgdGhpcy5yZXF1ZXN0UGVybWlzc2lvbkNhbWVyYSB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgcmVxdWVzdFBlcm1pc3Npb25BdWRpbzpcbiAgICAgICAgdGhpcy5yZXF1ZXN0UGVybWlzc2lvbkF1ZGlvIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgfTtcbiAgfTtcblxuICB2YWxpZGF0ZWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgbG9jYWxVSU1vZGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgc29ja2V0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxTb2NrZXQ+KHt9IGFzIFNvY2tldCk7XG4gIHJvb21EYXRhID0gbmV3IEJlaGF2aW9yU3ViamVjdDxSZXNwb25zZUpvaW5Sb29tIHwgbnVsbD4obnVsbCk7XG4gIGRldmljZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8RGV2aWNlIHwgbnVsbD4obnVsbCk7XG4gIGFwaUtleSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPihcbiAgICAnMDIxMTkzNzQyYzkzNWM0NDM0ZDI1ZDc1OTIzNjI1NzVmY2I2ZDY1OTBiNmMzODMzNGEyZjNlMDZjODNhZjc1OCcsXG4gICk7XG4gIGFwaVVzZXJOYW1lID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCdhYmNkZWZnaCcpO1xuICBhcGlUb2tlbiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gIGxpbmsgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuXG4gIHJvb21OYW1lID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcbiAgbWVtYmVyID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcbiAgYWRtaW5QYXNzY29kZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gIGlzbGV2ZWwgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJzEnKTtcbiAgY29Ib3N0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCdObyBjb0hvc3QnKTtcbiAgY29Ib3N0UmVzcG9uc2liaWxpdHkgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PENvSG9zdFJlc3BvbnNpYmlsaXR5W10+KFtcbiAgICB7IG5hbWU6ICdwYXJ0aWNpcGFudHMnLCB2YWx1ZTogZmFsc2UsIGRlZGljYXRlZDogZmFsc2UgfSxcbiAgICB7IG5hbWU6ICdtZWRpYScsIHZhbHVlOiBmYWxzZSwgZGVkaWNhdGVkOiBmYWxzZSB9LFxuICAgIHsgbmFtZTogJ3dhaXRpbmcnLCB2YWx1ZTogZmFsc2UsIGRlZGljYXRlZDogZmFsc2UgfSxcbiAgICB7IG5hbWU6ICdjaGF0JywgdmFsdWU6IGZhbHNlLCBkZWRpY2F0ZWQ6IGZhbHNlIH0sXG4gIF0pO1xuICB5b3VBcmVDb0hvc3QgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgeW91QXJlSG9zdCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBjb25maXJtZWRUb1JlY29yZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBtZWV0aW5nRGlzcGxheVR5cGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJ21lZGlhJyk7XG4gIG1lZXRpbmdWaWRlb09wdGltaXplZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBldmVudFR5cGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEV2ZW50VHlwZT4oJ3dlYmluYXInKTtcbiAgcGFydGljaXBhbnRzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxQYXJ0aWNpcGFudFtdPihbXSk7XG4gIGZpbHRlcmVkUGFydGljaXBhbnRzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxQYXJ0aWNpcGFudFtdPihbXSk7XG4gIHBhcnRpY2lwYW50c0NvdW50ZXIgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG4gIHBhcnRpY2lwYW50c0ZpbHRlciA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG5cbiAgY29uc3VtZV9zb2NrZXRzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxDb25zdW1lU29ja2V0W10+KFtdKTtcbiAgcnRwQ2FwYWJpbGl0aWVzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxSdHBDYXBhYmlsaXRpZXMgfCBudWxsPihudWxsKTtcbiAgcm9vbVJlY3ZJUHMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZ1tdPihbXSk7XG4gIG1lZXRpbmdSb29tUGFyYW1zID0gbmV3IEJlaGF2aW9yU3ViamVjdDxNZWV0aW5nUm9vbVBhcmFtcyB8IG51bGw+KG51bGwpO1xuICBpdGVtUGFnZUxpbWl0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDQpO1xuICBhdWRpb09ubHlSb29tID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGFkZEZvckJhc2ljID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHNjcmVlblBhZ2VMaW1pdCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPig0KTtcbiAgc2hhcmVTY3JlZW5TdGFydGVkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHNoYXJlZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICB0YXJnZXRPcmllbnRhdGlvbiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignbGFuZHNjYXBlJyk7XG4gIHRhcmdldFJlc29sdXRpb24gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJ3NkJyk7XG4gIHRhcmdldFJlc29sdXRpb25Ib3N0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCdzZCcpO1xuICB2aWRDb25zID0gbmV3IEJlaGF2aW9yU3ViamVjdDxWaWRDb25zPih7IHdpZHRoOiA2NDAsIGhlaWdodDogMzYwIH0pO1xuICBmcmFtZVJhdGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMTApO1xuICBoUGFyYW1zID0gbmV3IEJlaGF2aW9yU3ViamVjdDxIUGFyYW1zVHlwZT4oe30gYXMgSFBhcmFtc1R5cGUpO1xuICB2UGFyYW1zID0gbmV3IEJlaGF2aW9yU3ViamVjdDxWUGFyYW1zVHlwZT4oe30gYXMgVlBhcmFtc1R5cGUpO1xuICBzY3JlZW5QYXJhbXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFNjcmVlblBhcmFtc1R5cGU+KHt9IGFzIFNjcmVlblBhcmFtc1R5cGUpO1xuICBhUGFyYW1zID0gbmV3IEJlaGF2aW9yU3ViamVjdDxBUGFyYW1zVHlwZT4oe30gYXMgQVBhcmFtc1R5cGUpO1xuXG4gIHJlY29yZGluZ0F1ZGlvUGF1c2VzTGltaXQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG4gIHJlY29yZGluZ0F1ZGlvUGF1c2VzQ291bnQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG4gIHJlY29yZGluZ0F1ZGlvU3VwcG9ydCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICByZWNvcmRpbmdBdWRpb1Blb3BsZUxpbWl0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICByZWNvcmRpbmdBdWRpb1BhcnRpY2lwYW50c1RpbWVMaW1pdCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgcmVjb3JkaW5nVmlkZW9QYXVzZXNDb3VudCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgcmVjb3JkaW5nVmlkZW9QYXVzZXNMaW1pdCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgcmVjb3JkaW5nVmlkZW9TdXBwb3J0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHJlY29yZGluZ1ZpZGVvUGVvcGxlTGltaXQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG4gIHJlY29yZGluZ1ZpZGVvUGFydGljaXBhbnRzVGltZUxpbWl0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICByZWNvcmRpbmdBbGxQYXJ0aWNpcGFudHNTdXBwb3J0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHJlY29yZGluZ1ZpZGVvUGFydGljaXBhbnRzU3VwcG9ydCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICByZWNvcmRpbmdBbGxQYXJ0aWNpcGFudHNGdWxsUm9vbVN1cHBvcnQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgcmVjb3JkaW5nVmlkZW9QYXJ0aWNpcGFudHNGdWxsUm9vbVN1cHBvcnQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgcmVjb3JkaW5nUHJlZmVycmVkT3JpZW50YXRpb24gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJ2xhbmRzY2FwZScpO1xuICByZWNvcmRpbmdTdXBwb3J0Rm9yT3RoZXJPcmllbnRhdGlvbiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICByZWNvcmRpbmdNdWx0aUZvcm1hdHNTdXBwb3J0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG5cbiAgdXNlclJlY29yZGluZ1BhcmFtcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8VXNlclJlY29yZGluZ1BhcmFtcz4oe1xuICAgIG1haW5TcGVjczoge1xuICAgICAgbWVkaWFPcHRpb25zOiAndmlkZW8nLCAvLyAnYXVkaW8nLCAndmlkZW8nXG4gICAgICBhdWRpb09wdGlvbnM6ICdhbGwnLCAvLyAnYWxsJywgJ29uU2NyZWVuJywgJ2hvc3QnXG4gICAgICB2aWRlb09wdGlvbnM6ICdhbGwnLCAvLyAnYWxsJywgJ21haW5TY3JlZW4nXG4gICAgICB2aWRlb1R5cGU6ICdmdWxsRGlzcGxheScsIC8vICdhbGwnLCAnYmVzdERpc3BsYXknLCAnZnVsbERpc3BsYXknXG4gICAgICB2aWRlb09wdGltaXplZDogZmFsc2UsIC8vIHRydWUsIGZhbHNlXG4gICAgICByZWNvcmRpbmdEaXNwbGF5VHlwZTogJ21lZGlhJywgLy8gJ21lZGlhJywgJ3ZpZGVvJywgJ2FsbCdcbiAgICAgIGFkZEhMUzogZmFsc2UsIC8vIHRydWUsIGZhbHNlXG4gICAgfSxcbiAgICBkaXNwU3BlY3M6IHtcbiAgICAgIG5hbWVUYWdzOiB0cnVlLCAvLyB0cnVlLCBmYWxzZVxuICAgICAgYmFja2dyb3VuZENvbG9yOiAnIzAwMDAwMCcsIC8vICcjMDAwMDAwJywgJyNmZmZmZmYnXG4gICAgICBuYW1lVGFnc0NvbG9yOiAnI2ZmZmZmZicsIC8vICcjMDAwMDAwJywgJyNmZmZmZmYnXG4gICAgICBvcmllbnRhdGlvblZpZGVvOiAncG9ydHJhaXQnLCAvLyAnbGFuZHNjYXBlJywgJ3BvcnRyYWl0JywgJ2FsbCdcbiAgICB9LFxuICB9KTtcblxuICBjYW5SZWNvcmQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgc3RhcnRSZXBvcnQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgZW5kUmVwb3J0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHJlY29yZFRpbWVySW50ZXJ2YWwgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE5vZGVKUy5UaW1lb3V0IHwgbnVsbD4obnVsbCk7XG4gIHJlY29yZFN0YXJ0VGltZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgcmVjb3JkRWxhcHNlZFRpbWUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG4gIGlzVGltZXJSdW5uaW5nID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGNhblBhdXNlUmVzdW1lID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHJlY29yZENoYW5nZVNlY29uZHMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMTUwMDApO1xuICBwYXVzZUxpbWl0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICBwYXVzZVJlY29yZENvdW50ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICBjYW5MYXVuY2hSZWNvcmQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KHRydWUpO1xuICBzdG9wTGF1bmNoUmVjb3JkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG5cbiAgcGFydGljaXBhbnRzQWxsID0gbmV3IEJlaGF2aW9yU3ViamVjdDxQYXJ0aWNpcGFudFtdPihbXSk7XG5cbiAgZmlyc3RBbGwgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgdXBkYXRlTWFpbldpbmRvdyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBmaXJzdF9yb3VuZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBsYW5kU2NhcGVkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGxvY2tfc2NyZWVuID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHNjcmVlbklkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcbiAgYWxsVmlkZW9TdHJlYW1zID0gbmV3IEJlaGF2aW9yU3ViamVjdDwoUGFydGljaXBhbnQgfCBTdHJlYW0pW10+KFtdKTtcbiAgbmV3TGltaXRlZFN0cmVhbXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PChQYXJ0aWNpcGFudCB8IFN0cmVhbSlbXT4oW10pO1xuICBuZXdMaW1pdGVkU3RyZWFtc0lEcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nW10+KFtdKTtcbiAgYWN0aXZlU291bmRzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmdbXT4oW10pO1xuICBzY3JlZW5TaGFyZUlEU3RyZWFtID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcbiAgc2NyZWVuU2hhcmVOYW1lU3RyZWFtID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcbiAgYWRtaW5JRFN0cmVhbSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gIGFkbWluTmFtZVN0cmVhbSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gIHlvdVlvdVN0cmVhbSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8KFBhcnRpY2lwYW50IHwgU3RyZWFtKVtdPihbXSk7XG4gIHlvdVlvdVN0cmVhbUlEcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nW10+KFtdKTtcbiAgbG9jYWxTdHJlYW0gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE1lZGlhU3RyZWFtIHwgbnVsbD4obnVsbCk7XG4gIHJlY29yZFN0YXJ0ZWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgcmVjb3JkUmVzdW1lZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICByZWNvcmRQYXVzZWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgcmVjb3JkU3RvcHBlZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBhZG1pblJlc3RyaWN0U2V0dGluZyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICB2aWRlb1JlcXVlc3RTdGF0ZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG4gIHZpZGVvUmVxdWVzdFRpbWUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG4gIHZpZGVvQWN0aW9uID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGxvY2FsU3RyZWFtVmlkZW8gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE1lZGlhU3RyZWFtIHwgbnVsbD4obnVsbCk7XG4gIHVzZXJEZWZhdWx0VmlkZW9JbnB1dERldmljZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gIGN1cnJlbnRGYWNpbmdNb2RlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCd1c2VyJyk7XG4gIHByZXZGYWNpbmdNb2RlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCd1c2VyJyk7XG4gIGRlZlZpZGVvSUQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICBhbGxvd2VkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGRpc3BBY3RpdmVOYW1lcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nW10+KFtdKTtcbiAgcF9kaXNwQWN0aXZlTmFtZXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZ1tdPihbXSk7XG4gIGFjdGl2ZU5hbWVzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmdbXT4oW10pO1xuICBwcmV2QWN0aXZlTmFtZXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZ1tdPihbXSk7XG4gIHBfYWN0aXZlTmFtZXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZ1tdPihbXSk7XG4gIG1lbWJlcnNSZWNlaXZlZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBkZWZlclNjcmVlblJlY2VpdmVkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGhvc3RGaXJzdFN3aXRjaCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBtaWNBY3Rpb24gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgc2NyZWVuQWN0aW9uID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGNoYXRBY3Rpb24gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgYXVkaW9SZXF1ZXN0U3RhdGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZyB8IG51bGw+KG51bGwpO1xuICBzY3JlZW5SZXF1ZXN0U3RhdGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZyB8IG51bGw+KG51bGwpO1xuICBjaGF0UmVxdWVzdFN0YXRlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmcgfCBudWxsPihudWxsKTtcbiAgYXVkaW9SZXF1ZXN0VGltZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgc2NyZWVuUmVxdWVzdFRpbWUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG4gIGNoYXRSZXF1ZXN0VGltZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgdXBkYXRlUmVxdWVzdEludGVydmFsU2Vjb25kcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigyNDApO1xuICBvbGRTb3VuZElkcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nW10+KFtdKTtcbiAgaG9zdExhYmVsID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCdIb3N0Jyk7XG4gIG1haW5TY3JlZW5GaWxsZWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgbG9jYWxTdHJlYW1TY3JlZW4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE1lZGlhU3RyZWFtIHwgbnVsbD4obnVsbCk7XG4gIHNjcmVlbkFscmVhZHlPbiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBjaGF0QWxyZWFkeU9uID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHJlZGlyZWN0VVJMID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcbiAgb2xkQWxsU3RyZWFtcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8KFBhcnRpY2lwYW50IHwgU3RyZWFtKVtdPihbXSk7XG4gIGFkbWluVmlkSUQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICBzdHJlYW1OYW1lcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8U3RyZWFtW10+KFtdKTtcbiAgbm9uX2FsVmlkZW9TdHJlYW1zID0gbmV3IEJlaGF2aW9yU3ViamVjdDxQYXJ0aWNpcGFudFtdPihbXSk7XG4gIHNvcnRBdWRpb0xvdWRuZXNzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGF1ZGlvRGVjaWJlbHMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEF1ZGlvRGVjaWJlbHNbXT4oW10pO1xuICBtaXhlZF9hbFZpZGVvU3RyZWFtcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8KFBhcnRpY2lwYW50IHwgU3RyZWFtKVtdPihbXSk7XG4gIG5vbl9hbFZpZGVvU3RyZWFtc19tdXRlZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UGFydGljaXBhbnRbXT4oW10pO1xuICBwYWdpbmF0ZWRTdHJlYW1zID0gbmV3IEJlaGF2aW9yU3ViamVjdDwoUGFydGljaXBhbnQgfCBTdHJlYW0pW11bXT4oW10pO1xuICBsb2NhbFN0cmVhbUF1ZGlvID0gbmV3IEJlaGF2aW9yU3ViamVjdDxNZWRpYVN0cmVhbSB8IG51bGw+KG51bGwpO1xuICBkZWZBdWRpb0lEID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcbiAgdXNlckRlZmF1bHRBdWRpb0lucHV0RGV2aWNlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcbiAgdXNlckRlZmF1bHRBdWRpb091dHB1dERldmljZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gIHByZXZBdWRpb0lucHV0RGV2aWNlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcbiAgcHJldlZpZGVvSW5wdXREZXZpY2UgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICBhdWRpb1BhdXNlZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBtYWluU2NyZWVuUGVyc29uID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcbiAgYWRtaW5Pbk1haW5TY3JlZW4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgc2NyZWVuU3RhdGVzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxTY3JlZW5TdGF0ZVtdPihbXG4gICAge1xuICAgICAgbWFpblNjcmVlblBlcnNvbjogJycsXG4gICAgICBtYWluU2NyZWVuUHJvZHVjZXJJZDogJycsXG4gICAgICBtYWluU2NyZWVuRmlsbGVkOiBmYWxzZSxcbiAgICAgIGFkbWluT25NYWluU2NyZWVuOiBmYWxzZSxcbiAgICB9LFxuICBdKTtcbiAgcHJldlNjcmVlblN0YXRlcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8U2NyZWVuU3RhdGVbXT4oW1xuICAgIHtcbiAgICAgIG1haW5TY3JlZW5QZXJzb246ICcnLFxuICAgICAgbWFpblNjcmVlblByb2R1Y2VySWQ6ICcnLFxuICAgICAgbWFpblNjcmVlbkZpbGxlZDogZmFsc2UsXG4gICAgICBhZG1pbk9uTWFpblNjcmVlbjogZmFsc2UsXG4gICAgfSxcbiAgXSk7XG4gIHVwZGF0ZURhdGVTdGF0ZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyIHwgbnVsbD4obnVsbCk7XG4gIGxhc3RVcGRhdGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlciB8IG51bGw+KG51bGwpO1xuICBuRm9yUmVhZGp1c3RSZWNvcmQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG4gIGZpeGVkUGFnZUxpbWl0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDQpO1xuICByZW1vdmVBbHRHcmlkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIG5Gb3JSZWFkanVzdCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgcmVvcmRlckludGVydmFsID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDMwMDAwKTtcbiAgZmFzdFJlb3JkZXJJbnRlcnZhbCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigxMDAwMCk7XG4gIGxhc3RSZW9yZGVyVGltZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgYXVkU3RyZWFtTmFtZXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFN0cmVhbVtdPihbXSk7XG4gIGN1cnJlbnRVc2VyUGFnZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgbWFpbkhlaWdodFdpZHRoID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KFxuICAgIHRoaXMuZXZlbnRUeXBlLnZhbHVlID09ICd3ZWJpbmFyJyA/IDY3IDogdGhpcy5ldmVudFR5cGUudmFsdWUgPT0gJ2Jyb2FkY2FzdCcgPyAxMDAgOiAwLFxuICApO1xuICBwcmV2TWFpbkhlaWdodFdpZHRoID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KHRoaXMubWFpbkhlaWdodFdpZHRoLnZhbHVlKTtcbiAgcHJldkRvUGFnaW5hdGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgZG9QYWdpbmF0ZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBzaGFyZUVuZGVkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGxTdHJlYW1zID0gbmV3IEJlaGF2aW9yU3ViamVjdDwoUGFydGljaXBhbnQgfCBTdHJlYW0pW10+KFtdKTtcbiAgY2hhdFJlZlN0cmVhbXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PChQYXJ0aWNpcGFudCB8IFN0cmVhbSlbXT4oW10pO1xuICBjb250cm9sSGVpZ2h0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KFxuICAgIHRoaXMuZXZlbnRUeXBlLnZhbHVlID09PSAnd2ViaW5hcicgfHwgdGhpcy5ldmVudFR5cGUudmFsdWUgPT09ICdjb25mZXJlbmNlJyA/IDAgOiAwLjA2LFxuICApO1xuICBpc1dpZGVTY3JlZW4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgaXNNZWRpdW1TY3JlZW4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgaXNTbWFsbFNjcmVlbiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBhZGRHcmlkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGFkZEFsdEdyaWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgZ3JpZFJvd3MgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG4gIGdyaWRDb2xzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICBhbHRHcmlkUm93cyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgYWx0R3JpZENvbHMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG4gIG51bWJlclBhZ2VzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICBjdXJyZW50U3RyZWFtcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8KFBhcnRpY2lwYW50IHwgU3RyZWFtKVtdPihbXSk7XG4gIHNob3dNaW5pVmlldyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBuU3RyZWFtID0gbmV3IEJlaGF2aW9yU3ViamVjdDxNZWRpYVN0cmVhbSB8IG51bGw+KG51bGwpO1xuICBkZWZlcl9yZWNlaXZlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGFsbEF1ZGlvU3RyZWFtcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8KFBhcnRpY2lwYW50IHwgU3RyZWFtKVtdPihbXSk7XG4gIHJlbW90ZVNjcmVlblN0cmVhbSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8U3RyZWFtW10+KFtdKTtcbiAgc2NyZWVuUHJvZHVjZXIgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFByb2R1Y2VyIHwgbnVsbD4obnVsbCk7XG4gIGdvdEFsbFZpZHMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgcGFnaW5hdGlvbkhlaWdodFdpZHRoID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDQwKTtcbiAgcGFnaW5hdGlvbkRpcmVjdGlvbiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8J2hvcml6b250YWwnIHwgJ3ZlcnRpY2FsJz4oJ2hvcml6b250YWwnKTtcbiAgZ3JpZFNpemVzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxHcmlkU2l6ZXM+KHtcbiAgICBncmlkV2lkdGg6IDAsXG4gICAgZ3JpZEhlaWdodDogMCxcbiAgICBhbHRHcmlkV2lkdGg6IDAsXG4gICAgYWx0R3JpZEhlaWdodDogMCxcbiAgfSk7XG4gIHNjcmVlbkZvcmNlRnVsbERpc3BsYXkgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgbWFpbkdyaWRTdHJlYW0gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEN1c3RvbU1lZGlhQ29tcG9uZW50W10+KFtdKTtcbiAgb3RoZXJHcmlkU3RyZWFtcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Q3VzdG9tTWVkaWFDb21wb25lbnRbXVtdPihbXSk7XG4gIGF1ZGlvT25seVN0cmVhbXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEN1c3RvbU1lZGlhQ29tcG9uZW50W10+KFtdKTtcbiAgdmlkZW9JbnB1dHMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE1lZGlhRGV2aWNlSW5mb1tdPihbXSk7XG4gIGF1ZGlvSW5wdXRzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxNZWRpYURldmljZUluZm9bXT4oW10pO1xuICBtZWV0aW5nUHJvZ3Jlc3NUaW1lID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcwMDowMDowMCcpO1xuICBtZWV0aW5nRWxhcHNlZFRpbWUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG4gIHJlZl9wYXJ0aWNpcGFudHMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFBhcnRpY2lwYW50W10+KFtdKTtcblxuICB1cGRhdGVWYWxpZGF0ZWQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnZhbGlkYXRlZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVTb2NrZXQgPSAodmFsdWU6IFNvY2tldCkgPT4ge1xuICAgIHRoaXMuc29ja2V0Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZURldmljZSA9ICh2YWx1ZTogRGV2aWNlIHwgbnVsbCkgPT4ge1xuICAgIHRoaXMuZGV2aWNlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJvb21EYXRhID0gKHZhbHVlOiBSZXNwb25zZUpvaW5Sb29tIHwgbnVsbCkgPT4ge1xuICAgIHRoaXMucm9vbURhdGEubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQXBpS2V5ID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLmFwaUtleS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBcGlVc2VyTmFtZSA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5hcGlVc2VyTmFtZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBcGlUb2tlbiA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5hcGlUb2tlbi5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVMaW5rID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLmxpbmsubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUm9vbU5hbWUgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMucm9vbU5hbWUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTWVtYmVyID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLm1lbWJlci5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBZG1pblBhc3Njb2RlID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLmFkbWluUGFzc2NvZGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlSXNsZXZlbCA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5pc2xldmVsLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUNvSG9zdCA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5jb0hvc3QubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQ29Ib3N0UmVzcG9uc2liaWxpdHkgPSAodmFsdWU6IENvSG9zdFJlc3BvbnNpYmlsaXR5W10pID0+IHtcbiAgICB0aGlzLmNvSG9zdFJlc3BvbnNpYmlsaXR5Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVlvdUFyZUNvSG9zdCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMueW91QXJlQ29Ib3N0Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVlvdUFyZUhvc3QgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnlvdUFyZUhvc3QubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQ29uZmlybWVkVG9SZWNvcmQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmNvbmZpcm1lZFRvUmVjb3JkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZU1lZXRpbmdEaXNwbGF5VHlwZSA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5tZWV0aW5nRGlzcGxheVR5cGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTWVldGluZ1ZpZGVvT3B0aW1pemVkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5tZWV0aW5nVmlkZW9PcHRpbWl6ZWQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlRXZlbnRUeXBlID0gKHZhbHVlOiBFdmVudFR5cGUpID0+IHtcbiAgICB0aGlzLmV2ZW50VHlwZS5uZXh0KHZhbHVlKTtcbiAgICBpZiAodmFsdWUgIT0gJ25vbmUnKSB7XG4gICAgICB0cnkge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aGlzLmhhbmRsZVJlc2l6ZSgpO1xuICAgICAgICB9LCAyMDAwKTtcbiAgICAgIH0gY2F0Y2gge1xuICAgICAgICAvKiBoYW5kbGUgZXJyb3IgKi9cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgdXBkYXRlUGFydGljaXBhbnRzID0gKHZhbHVlOiBQYXJ0aWNpcGFudFtdKSA9PiB7XG4gICAgdGhpcy5wYXJ0aWNpcGFudHMubmV4dCh2YWx1ZSk7XG4gICAgdGhpcy5wYXJ0aWNpcGFudHNDb3VudGVyLm5leHQodmFsdWUubGVuZ3RoKTtcbiAgICB0aGlzLmZpbHRlcmVkUGFydGljaXBhbnRzLm5leHQodGhpcy5wYXJ0aWNpcGFudHMudmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUZpbHRlcmVkUGFydGljaXBhbnRzID0gKHZhbHVlOiBQYXJ0aWNpcGFudFtdKSA9PiB7XG4gICAgdGhpcy5maWx0ZXJlZFBhcnRpY2lwYW50cy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVQYXJ0aWNpcGFudHNDb3VudGVyID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLnBhcnRpY2lwYW50c0NvdW50ZXIubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUGFydGljaXBhbnRzRmlsdGVyID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLnBhcnRpY2lwYW50c0ZpbHRlci5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVDb25zdW1lX3NvY2tldHMgPSAodmFsdWU6IENvbnN1bWVTb2NrZXRbXSkgPT4ge1xuICAgIHRoaXMuY29uc3VtZV9zb2NrZXRzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJ0cENhcGFiaWxpdGllcyA9ICh2YWx1ZTogUnRwQ2FwYWJpbGl0aWVzIHwgbnVsbCkgPT4ge1xuICAgIHRoaXMucnRwQ2FwYWJpbGl0aWVzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJvb21SZWN2SVBzID0gKHZhbHVlOiBzdHJpbmdbXSkgPT4ge1xuICAgIHRoaXMucm9vbVJlY3ZJUHMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTWVldGluZ1Jvb21QYXJhbXMgPSAodmFsdWU6IE1lZXRpbmdSb29tUGFyYW1zIHwgbnVsbCkgPT4ge1xuICAgIHRoaXMubWVldGluZ1Jvb21QYXJhbXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlSXRlbVBhZ2VMaW1pdCA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5pdGVtUGFnZUxpbWl0Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUF1ZGlvT25seVJvb20gPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmF1ZGlvT25seVJvb20ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQWRkRm9yQmFzaWMgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmFkZEZvckJhc2ljLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVNjcmVlblBhZ2VMaW1pdCA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5zY3JlZW5QYWdlTGltaXQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlU2hhcmVTY3JlZW5TdGFydGVkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5zaGFyZVNjcmVlblN0YXJ0ZWQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlU2hhcmVkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5zaGFyZWQubmV4dCh2YWx1ZSk7XG4gICAgdGhpcy5zY3JlZW5TaGFyZUFjdGl2ZS5uZXh0KHZhbHVlKTtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuICAgICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ3Jlc2l6ZScpKTtcbiAgICAgIH0sIDIwMDApO1xuICAgIH1cbiAgfTtcblxuICB1cGRhdGVUYXJnZXRPcmllbnRhdGlvbiA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy50YXJnZXRPcmllbnRhdGlvbi5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVUYXJnZXRSZXNvbHV0aW9uID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLnRhcmdldFJlc29sdXRpb24ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlVGFyZ2V0UmVzb2x1dGlvbkhvc3QgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMudGFyZ2V0UmVzb2x1dGlvbkhvc3QubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlVmlkQ29ucyA9ICh2YWx1ZTogVmlkQ29ucykgPT4ge1xuICAgIHRoaXMudmlkQ29ucy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVGcmFtZVJhdGUgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMuZnJhbWVSYXRlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUhQYXJhbXMgPSAodmFsdWU6IEhQYXJhbXNUeXBlKSA9PiB7XG4gICAgdGhpcy5oUGFyYW1zLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVZQYXJhbXMgPSAodmFsdWU6IFZQYXJhbXNUeXBlKSA9PiB7XG4gICAgdGhpcy52UGFyYW1zLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVNjcmVlblBhcmFtcyA9ICh2YWx1ZTogU2NyZWVuUGFyYW1zVHlwZSkgPT4ge1xuICAgIHRoaXMuc2NyZWVuUGFyYW1zLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUFQYXJhbXMgPSAodmFsdWU6IEFQYXJhbXNUeXBlKSA9PiB7XG4gICAgdGhpcy5hUGFyYW1zLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ0F1ZGlvUGF1c2VzTGltaXQgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMucmVjb3JkaW5nQXVkaW9QYXVzZXNMaW1pdC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRpbmdBdWRpb1BhdXNlc0NvdW50ID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ0F1ZGlvUGF1c2VzQ291bnQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nQXVkaW9TdXBwb3J0ID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdBdWRpb1N1cHBvcnQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nQXVkaW9QZW9wbGVMaW1pdCA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdBdWRpb1Blb3BsZUxpbWl0Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ0F1ZGlvUGFydGljaXBhbnRzVGltZUxpbWl0ID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ0F1ZGlvUGFydGljaXBhbnRzVGltZUxpbWl0Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ1ZpZGVvUGF1c2VzQ291bnQgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMucmVjb3JkaW5nVmlkZW9QYXVzZXNDb3VudC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRpbmdWaWRlb1BhdXNlc0xpbWl0ID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ1ZpZGVvUGF1c2VzTGltaXQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nVmlkZW9TdXBwb3J0ID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdWaWRlb1N1cHBvcnQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nVmlkZW9QZW9wbGVMaW1pdCA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdWaWRlb1Blb3BsZUxpbWl0Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ1ZpZGVvUGFydGljaXBhbnRzVGltZUxpbWl0ID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ1ZpZGVvUGFydGljaXBhbnRzVGltZUxpbWl0Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ0FsbFBhcnRpY2lwYW50c1N1cHBvcnQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ0FsbFBhcnRpY2lwYW50c1N1cHBvcnQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nVmlkZW9QYXJ0aWNpcGFudHNTdXBwb3J0ID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdWaWRlb1BhcnRpY2lwYW50c1N1cHBvcnQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nQWxsUGFydGljaXBhbnRzRnVsbFJvb21TdXBwb3J0ID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdBbGxQYXJ0aWNpcGFudHNGdWxsUm9vbVN1cHBvcnQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nVmlkZW9QYXJ0aWNpcGFudHNGdWxsUm9vbVN1cHBvcnQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ1ZpZGVvUGFydGljaXBhbnRzRnVsbFJvb21TdXBwb3J0Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ1ByZWZlcnJlZE9yaWVudGF0aW9uID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ1ByZWZlcnJlZE9yaWVudGF0aW9uLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ1N1cHBvcnRGb3JPdGhlck9yaWVudGF0aW9uID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdTdXBwb3J0Rm9yT3RoZXJPcmllbnRhdGlvbi5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRpbmdNdWx0aUZvcm1hdHNTdXBwb3J0ID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdNdWx0aUZvcm1hdHNTdXBwb3J0Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVVzZXJSZWNvcmRpbmdQYXJhbXMgPSAodmFsdWU6IFVzZXJSZWNvcmRpbmdQYXJhbXMpID0+IHtcbiAgICB0aGlzLnVzZXJSZWNvcmRpbmdQYXJhbXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQ2FuUmVjb3JkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5jYW5SZWNvcmQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlU3RhcnRSZXBvcnQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnN0YXJ0UmVwb3J0Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUVuZFJlcG9ydCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuZW5kUmVwb3J0Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZFRpbWVySW50ZXJ2YWwgPSAodmFsdWU6IE5vZGVKUy5UaW1lb3V0IHwgbnVsbCkgPT4ge1xuICAgIHRoaXMucmVjb3JkVGltZXJJbnRlcnZhbC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRTdGFydFRpbWUgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMucmVjb3JkU3RhcnRUaW1lLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZEVsYXBzZWRUaW1lID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLnJlY29yZEVsYXBzZWRUaW1lLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUlzVGltZXJSdW5uaW5nID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5pc1RpbWVyUnVubmluZy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVDYW5QYXVzZVJlc3VtZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuY2FuUGF1c2VSZXN1bWUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkQ2hhbmdlU2Vjb25kcyA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRDaGFuZ2VTZWNvbmRzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVBhdXNlTGltaXQgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMucGF1c2VMaW1pdC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVQYXVzZVJlY29yZENvdW50ID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLnBhdXNlUmVjb3JkQ291bnQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQ2FuTGF1bmNoUmVjb3JkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5jYW5MYXVuY2hSZWNvcmQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlU3RvcExhdW5jaFJlY29yZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuc3RvcExhdW5jaFJlY29yZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVQYXJ0aWNpcGFudHNBbGwgPSAodmFsdWU6IFBhcnRpY2lwYW50W10pID0+IHtcbiAgICB0aGlzLnBhcnRpY2lwYW50c0FsbC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVGaXJzdEFsbCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuZmlyc3RBbGwubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlVXBkYXRlTWFpbldpbmRvdyA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMudXBkYXRlTWFpbldpbmRvdy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVGaXJzdF9yb3VuZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuZmlyc3Rfcm91bmQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTGFuZFNjYXBlZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMubGFuZFNjYXBlZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVMb2NrX3NjcmVlbiA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMubG9ja19zY3JlZW4ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlU2NyZWVuSWQgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMuc2NyZWVuSWQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQWxsVmlkZW9TdHJlYW1zID0gKHZhbHVlOiAoUGFydGljaXBhbnQgfCBTdHJlYW0pW10pID0+IHtcbiAgICB0aGlzLmFsbFZpZGVvU3RyZWFtcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVOZXdMaW1pdGVkU3RyZWFtcyA9ICh2YWx1ZTogKFBhcnRpY2lwYW50IHwgU3RyZWFtKVtdKSA9PiB7XG4gICAgdGhpcy5uZXdMaW1pdGVkU3RyZWFtcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVOZXdMaW1pdGVkU3RyZWFtc0lEcyA9ICh2YWx1ZTogc3RyaW5nW10pID0+IHtcbiAgICB0aGlzLm5ld0xpbWl0ZWRTdHJlYW1zSURzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUFjdGl2ZVNvdW5kcyA9ICh2YWx1ZTogc3RyaW5nW10pID0+IHtcbiAgICB0aGlzLmFjdGl2ZVNvdW5kcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVTY3JlZW5TaGFyZUlEU3RyZWFtID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLnNjcmVlblNoYXJlSURTdHJlYW0ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlU2NyZWVuU2hhcmVOYW1lU3RyZWFtID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLnNjcmVlblNoYXJlTmFtZVN0cmVhbS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBZG1pbklEU3RyZWFtID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLmFkbWluSURTdHJlYW0ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQWRtaW5OYW1lU3RyZWFtID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLmFkbWluTmFtZVN0cmVhbS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVZb3VZb3VTdHJlYW0gPSAodmFsdWU6IChQYXJ0aWNpcGFudCB8IFN0cmVhbSlbXSkgPT4ge1xuICAgIHRoaXMueW91WW91U3RyZWFtLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVlvdVlvdVN0cmVhbUlEcyA9ICh2YWx1ZTogc3RyaW5nW10pID0+IHtcbiAgICB0aGlzLnlvdVlvdVN0cmVhbUlEcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVMb2NhbFN0cmVhbSA9ICh2YWx1ZTogTWVkaWFTdHJlYW0gfCBudWxsKSA9PiB7XG4gICAgdGhpcy5sb2NhbFN0cmVhbS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRTdGFydGVkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRTdGFydGVkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZFJlc3VtZWQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnJlY29yZFJlc3VtZWQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkUGF1c2VkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRQYXVzZWQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkU3RvcHBlZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMucmVjb3JkU3RvcHBlZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBZG1pblJlc3RyaWN0U2V0dGluZyA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuYWRtaW5SZXN0cmljdFNldHRpbmcubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlVmlkZW9SZXF1ZXN0U3RhdGUgPSAodmFsdWU6IHN0cmluZyB8IG51bGwpID0+IHtcbiAgICB0aGlzLnZpZGVvUmVxdWVzdFN0YXRlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVZpZGVvUmVxdWVzdFRpbWUgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMudmlkZW9SZXF1ZXN0VGltZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVWaWRlb0FjdGlvbiA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMudmlkZW9BY3Rpb24ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTG9jYWxTdHJlYW1WaWRlbyA9ICh2YWx1ZTogTWVkaWFTdHJlYW0gfCBudWxsKSA9PiB7XG4gICAgdGhpcy5sb2NhbFN0cmVhbVZpZGVvLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVVzZXJEZWZhdWx0VmlkZW9JbnB1dERldmljZSA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy51c2VyRGVmYXVsdFZpZGVvSW5wdXREZXZpY2UubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQ3VycmVudEZhY2luZ01vZGUgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMuY3VycmVudEZhY2luZ01vZGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUHJldkZhY2luZ01vZGUgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMucHJldkZhY2luZ01vZGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlRGVmVmlkZW9JRCA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5kZWZWaWRlb0lELm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUFsbG93ZWQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmFsbG93ZWQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlRGlzcEFjdGl2ZU5hbWVzID0gKHZhbHVlOiBzdHJpbmdbXSkgPT4ge1xuICAgIHRoaXMuZGlzcEFjdGl2ZU5hbWVzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVBfZGlzcEFjdGl2ZU5hbWVzID0gKHZhbHVlOiBzdHJpbmdbXSkgPT4ge1xuICAgIHRoaXMucF9kaXNwQWN0aXZlTmFtZXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQWN0aXZlTmFtZXMgPSAodmFsdWU6IHN0cmluZ1tdKSA9PiB7XG4gICAgdGhpcy5hY3RpdmVOYW1lcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVQcmV2QWN0aXZlTmFtZXMgPSAodmFsdWU6IHN0cmluZ1tdKSA9PiB7XG4gICAgdGhpcy5wcmV2QWN0aXZlTmFtZXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUF9hY3RpdmVOYW1lcyA9ICh2YWx1ZTogc3RyaW5nW10pID0+IHtcbiAgICB0aGlzLnBfYWN0aXZlTmFtZXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTWVtYmVyc1JlY2VpdmVkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5tZW1iZXJzUmVjZWl2ZWQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlRGVmZXJTY3JlZW5SZWNlaXZlZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuZGVmZXJTY3JlZW5SZWNlaXZlZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVIb3N0Rmlyc3RTd2l0Y2ggPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmhvc3RGaXJzdFN3aXRjaC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVNaWNBY3Rpb24gPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLm1pY0FjdGlvbi5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVTY3JlZW5BY3Rpb24gPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnNjcmVlbkFjdGlvbi5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVDaGF0QWN0aW9uID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5jaGF0QWN0aW9uLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUF1ZGlvUmVxdWVzdFN0YXRlID0gKHZhbHVlOiBzdHJpbmcgfCBudWxsKSA9PiB7XG4gICAgdGhpcy5hdWRpb1JlcXVlc3RTdGF0ZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVTY3JlZW5SZXF1ZXN0U3RhdGUgPSAodmFsdWU6IHN0cmluZyB8IG51bGwpID0+IHtcbiAgICB0aGlzLnNjcmVlblJlcXVlc3RTdGF0ZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVDaGF0UmVxdWVzdFN0YXRlID0gKHZhbHVlOiBzdHJpbmcgfCBudWxsKSA9PiB7XG4gICAgdGhpcy5jaGF0UmVxdWVzdFN0YXRlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUF1ZGlvUmVxdWVzdFRpbWUgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMuYXVkaW9SZXF1ZXN0VGltZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVTY3JlZW5SZXF1ZXN0VGltZSA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5zY3JlZW5SZXF1ZXN0VGltZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVDaGF0UmVxdWVzdFRpbWUgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMuY2hhdFJlcXVlc3RUaW1lLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZU9sZFNvdW5kSWRzID0gKHZhbHVlOiBzdHJpbmdbXSkgPT4ge1xuICAgIHRoaXMub2xkU291bmRJZHMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlSG9zdExhYmVsID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLmhvc3RMYWJlbC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVNYWluU2NyZWVuRmlsbGVkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5tYWluU2NyZWVuRmlsbGVkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUxvY2FsU3RyZWFtU2NyZWVuID0gKHZhbHVlOiBNZWRpYVN0cmVhbSB8IG51bGwpID0+IHtcbiAgICB0aGlzLmxvY2FsU3RyZWFtU2NyZWVuLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVNjcmVlbkFscmVhZHlPbiA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuc2NyZWVuQWxyZWFkeU9uLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUNoYXRBbHJlYWR5T24gPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmNoYXRBbHJlYWR5T24ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVkaXJlY3RVUkwgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMucmVkaXJlY3RVUkwubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlT2xkQWxsU3RyZWFtcyA9ICh2YWx1ZTogKFBhcnRpY2lwYW50IHwgU3RyZWFtKVtdKSA9PiB7XG4gICAgdGhpcy5vbGRBbGxTdHJlYW1zLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUFkbWluVmlkSUQgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMuYWRtaW5WaWRJRC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVTdHJlYW1OYW1lcyA9ICh2YWx1ZTogU3RyZWFtW10pID0+IHtcbiAgICB0aGlzLnN0cmVhbU5hbWVzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZU5vbl9hbFZpZGVvU3RyZWFtcyA9ICh2YWx1ZTogUGFydGljaXBhbnRbXSkgPT4ge1xuICAgIHRoaXMubm9uX2FsVmlkZW9TdHJlYW1zLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVNvcnRBdWRpb0xvdWRuZXNzID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5zb3J0QXVkaW9Mb3VkbmVzcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBdWRpb0RlY2liZWxzID0gKHZhbHVlOiBBdWRpb0RlY2liZWxzW10pID0+IHtcbiAgICB0aGlzLmF1ZGlvRGVjaWJlbHMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTWl4ZWRfYWxWaWRlb1N0cmVhbXMgPSAodmFsdWU6IChQYXJ0aWNpcGFudCB8IFN0cmVhbSlbXSkgPT4ge1xuICAgIHRoaXMubWl4ZWRfYWxWaWRlb1N0cmVhbXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTm9uX2FsVmlkZW9TdHJlYW1zX211dGVkID0gKHZhbHVlOiBQYXJ0aWNpcGFudFtdKSA9PiB7XG4gICAgdGhpcy5ub25fYWxWaWRlb1N0cmVhbXNfbXV0ZWQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUGFnaW5hdGVkU3RyZWFtcyA9ICh2YWx1ZTogKFBhcnRpY2lwYW50IHwgU3RyZWFtKVtdW10pID0+IHtcbiAgICB0aGlzLnBhZ2luYXRlZFN0cmVhbXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTG9jYWxTdHJlYW1BdWRpbyA9ICh2YWx1ZTogTWVkaWFTdHJlYW0gfCBudWxsKSA9PiB7XG4gICAgdGhpcy5sb2NhbFN0cmVhbUF1ZGlvLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZURlZkF1ZGlvSUQgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMuZGVmQXVkaW9JRC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVVc2VyRGVmYXVsdEF1ZGlvSW5wdXREZXZpY2UgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMudXNlckRlZmF1bHRBdWRpb0lucHV0RGV2aWNlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVVzZXJEZWZhdWx0QXVkaW9PdXRwdXREZXZpY2UgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMudXNlckRlZmF1bHRBdWRpb091dHB1dERldmljZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVQcmV2QXVkaW9JbnB1dERldmljZSA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5wcmV2QXVkaW9JbnB1dERldmljZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVQcmV2VmlkZW9JbnB1dERldmljZSA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5wcmV2VmlkZW9JbnB1dERldmljZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBdWRpb1BhdXNlZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuYXVkaW9QYXVzZWQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTWFpblNjcmVlblBlcnNvbiA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5tYWluU2NyZWVuUGVyc29uLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUFkbWluT25NYWluU2NyZWVuID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5hZG1pbk9uTWFpblNjcmVlbi5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVTY3JlZW5TdGF0ZXMgPSAodmFsdWU6IFNjcmVlblN0YXRlW10pID0+IHtcbiAgICB0aGlzLnNjcmVlblN0YXRlcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVQcmV2U2NyZWVuU3RhdGVzID0gKHZhbHVlOiBTY3JlZW5TdGF0ZVtdKSA9PiB7XG4gICAgdGhpcy5wcmV2U2NyZWVuU3RhdGVzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVVwZGF0ZURhdGVTdGF0ZSA9ICh2YWx1ZTogbnVtYmVyIHwgbnVsbCkgPT4ge1xuICAgIHRoaXMudXBkYXRlRGF0ZVN0YXRlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUxhc3RVcGRhdGUgPSAodmFsdWU6IG51bWJlciB8IG51bGwpID0+IHtcbiAgICB0aGlzLmxhc3RVcGRhdGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTkZvclJlYWRqdXN0UmVjb3JkID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLm5Gb3JSZWFkanVzdFJlY29yZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVGaXhlZFBhZ2VMaW1pdCA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5maXhlZFBhZ2VMaW1pdC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZW1vdmVBbHRHcmlkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5yZW1vdmVBbHRHcmlkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZU5Gb3JSZWFkanVzdCA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5uRm9yUmVhZGp1c3QubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTGFzdFJlb3JkZXJUaW1lID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLmxhc3RSZW9yZGVyVGltZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBdWRTdHJlYW1OYW1lcyA9ICh2YWx1ZTogU3RyZWFtW10pID0+IHtcbiAgICB0aGlzLmF1ZFN0cmVhbU5hbWVzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUN1cnJlbnRVc2VyUGFnZSA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5jdXJyZW50VXNlclBhZ2UubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTWFpbkhlaWdodFdpZHRoID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLm1haW5IZWlnaHRXaWR0aC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVQcmV2TWFpbkhlaWdodFdpZHRoID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLnByZXZNYWluSGVpZ2h0V2lkdGgubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUHJldkRvUGFnaW5hdGUgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnByZXZEb1BhZ2luYXRlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZURvUGFnaW5hdGUgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmRvUGFnaW5hdGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlU2hhcmVFbmRlZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuc2hhcmVFbmRlZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVMU3RyZWFtcyA9ICh2YWx1ZTogKFBhcnRpY2lwYW50IHwgU3RyZWFtKVtdKSA9PiB7XG4gICAgdGhpcy5sU3RyZWFtcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVDaGF0UmVmU3RyZWFtcyA9ICh2YWx1ZTogKFBhcnRpY2lwYW50IHwgU3RyZWFtKVtdKSA9PiB7XG4gICAgdGhpcy5jaGF0UmVmU3RyZWFtcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVDb250cm9sSGVpZ2h0ID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLmNvbnRyb2xIZWlnaHQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlSXNXaWRlU2NyZWVuID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5pc1dpZGVTY3JlZW4ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlSXNNZWRpdW1TY3JlZW4gPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmlzTWVkaXVtU2NyZWVuLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUlzU21hbGxTY3JlZW4gPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmlzU21hbGxTY3JlZW4ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQWRkR3JpZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuYWRkR3JpZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBZGRBbHRHcmlkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5hZGRBbHRHcmlkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUdyaWRSb3dzID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLmdyaWRSb3dzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUdyaWRDb2xzID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLmdyaWRDb2xzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUFsdEdyaWRSb3dzID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLmFsdEdyaWRSb3dzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUFsdEdyaWRDb2xzID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLmFsdEdyaWRDb2xzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZU51bWJlclBhZ2VzID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLm51bWJlclBhZ2VzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUN1cnJlbnRTdHJlYW1zID0gKHZhbHVlOiAoUGFydGljaXBhbnQgfCBTdHJlYW0pW10pID0+IHtcbiAgICB0aGlzLmN1cnJlbnRTdHJlYW1zLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVNob3dNaW5pVmlldyA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuc2hvd01pbmlWaWV3Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZU5TdHJlYW0gPSAodmFsdWU6IE1lZGlhU3RyZWFtIHwgbnVsbCkgPT4ge1xuICAgIHRoaXMublN0cmVhbS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVEZWZlcl9yZWNlaXZlID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5kZWZlcl9yZWNlaXZlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUFsbEF1ZGlvU3RyZWFtcyA9ICh2YWx1ZTogKFBhcnRpY2lwYW50IHwgU3RyZWFtKVtdKSA9PiB7XG4gICAgdGhpcy5hbGxBdWRpb1N0cmVhbXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVtb3RlU2NyZWVuU3RyZWFtID0gKHZhbHVlOiBTdHJlYW1bXSkgPT4ge1xuICAgIHRoaXMucmVtb3RlU2NyZWVuU3RyZWFtLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVNjcmVlblByb2R1Y2VyID0gKHZhbHVlOiBQcm9kdWNlciB8IG51bGwpID0+IHtcbiAgICB0aGlzLnNjcmVlblByb2R1Y2VyLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUdvdEFsbFZpZHMgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmdvdEFsbFZpZHMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUGFnaW5hdGlvbkhlaWdodFdpZHRoID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLnBhZ2luYXRpb25IZWlnaHRXaWR0aC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVQYWdpbmF0aW9uRGlyZWN0aW9uID0gKHZhbHVlOiAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnKSA9PiB7XG4gICAgdGhpcy5wYWdpbmF0aW9uRGlyZWN0aW9uLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUdyaWRTaXplcyA9ICh2YWx1ZTogR3JpZFNpemVzKSA9PiB7XG4gICAgdGhpcy5ncmlkU2l6ZXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlU2NyZWVuRm9yY2VGdWxsRGlzcGxheSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuc2NyZWVuRm9yY2VGdWxsRGlzcGxheS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVNYWluR3JpZFN0cmVhbSA9ICh2YWx1ZTogQ3VzdG9tTWVkaWFDb21wb25lbnRbXSkgPT4ge1xuICAgIHRoaXMubWFpbkdyaWRTdHJlYW0ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlT3RoZXJHcmlkU3RyZWFtcyA9ICh2YWx1ZTogQ3VzdG9tTWVkaWFDb21wb25lbnRbXVtdKSA9PiB7XG4gICAgdGhpcy5vdGhlckdyaWRTdHJlYW1zLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUF1ZGlvT25seVN0cmVhbXMgPSAodmFsdWU6IEN1c3RvbU1lZGlhQ29tcG9uZW50W10pID0+IHtcbiAgICB0aGlzLmF1ZGlvT25seVN0cmVhbXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlVmlkZW9JbnB1dHMgPSAodmFsdWU6IE1lZGlhRGV2aWNlSW5mb1tdKSA9PiB7XG4gICAgdGhpcy52aWRlb0lucHV0cy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBdWRpb0lucHV0cyA9ICh2YWx1ZTogTWVkaWFEZXZpY2VJbmZvW10pID0+IHtcbiAgICB0aGlzLmF1ZGlvSW5wdXRzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZU1lZXRpbmdQcm9ncmVzc1RpbWUgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMubWVldGluZ1Byb2dyZXNzVGltZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVNZWV0aW5nRWxhcHNlZFRpbWUgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMubWVldGluZ0VsYXBzZWRUaW1lLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlZl9wYXJ0aWNpcGFudHMgPSAodmFsdWU6IFBhcnRpY2lwYW50W10pID0+IHtcbiAgICB0aGlzLnJlZl9wYXJ0aWNpcGFudHMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgLy8gTWVzc2FnZXNcbiAgbWVzc2FnZXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE1lc3NhZ2VbXT4oW10pO1xuICBzdGFydERpcmVjdE1lc3NhZ2UgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgZGlyZWN0TWVzc2FnZURldGFpbHMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFBhcnRpY2lwYW50IHwgbnVsbD4obnVsbCk7XG4gIHNob3dNZXNzYWdlc0JhZGdlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG5cbiAgLy8gRXZlbnQgU2V0dGluZ3NcbiAgYXVkaW9TZXR0aW5nID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCdhbGxvdycpO1xuICB2aWRlb1NldHRpbmcgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJ2FsbG93Jyk7XG4gIHNjcmVlbnNoYXJlU2V0dGluZyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignYWxsb3cnKTtcbiAgY2hhdFNldHRpbmcgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJ2FsbG93Jyk7XG5cbiAgLy8gRGlzcGxheSBTZXR0aW5nc1xuICBkaXNwbGF5T3B0aW9uID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCdtZWRpYScpO1xuICBhdXRvV2F2ZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4odHJ1ZSk7XG4gIGZvcmNlRnVsbERpc3BsYXkgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KHRydWUpO1xuICBwcmV2Rm9yY2VGdWxsRGlzcGxheSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBwcmV2TWVldGluZ0Rpc3BsYXlUeXBlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCd2aWRlbycpO1xuXG4gIC8vIFdhaXRpbmcgUm9vbVxuICB3YWl0aW5nUm9vbUZpbHRlciA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gIHdhaXRpbmdSb29tTGlzdCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8V2FpdGluZ1Jvb21QYXJ0aWNpcGFudFtdPihcbiAgICB0aGlzLnVzZVNlZWQgJiYgdGhpcy5zZWVkRGF0YT8ud2FpdGluZ0xpc3QgPyB0aGlzLnNlZWREYXRhLndhaXRpbmdMaXN0IDogW10sXG4gICk7XG4gIHdhaXRpbmdSb29tQ291bnRlciA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgZmlsdGVyZWRXYWl0aW5nUm9vbUxpc3QgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFdhaXRpbmdSb29tUGFydGljaXBhbnRbXT4oXG4gICAgdGhpcy51c2VTZWVkICYmIHRoaXMuc2VlZERhdGE/LndhaXRpbmdMaXN0ID8gdGhpcy5zZWVkRGF0YS53YWl0aW5nTGlzdCA6IFtdLFxuICApO1xuXG4gIC8vIFJlcXVlc3RzXG4gIHJlcXVlc3RGaWx0ZXIgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICByZXF1ZXN0TGlzdCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UmVxdWVzdFtdPihcbiAgICB0aGlzLnVzZVNlZWQgJiYgdGhpcy5zZWVkRGF0YT8ucmVxdWVzdHMgPyB0aGlzLnNlZWREYXRhLnJlcXVlc3RzIDogW10sXG4gICk7XG4gIHJlcXVlc3RDb3VudGVyID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICBmaWx0ZXJlZFJlcXVlc3RMaXN0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxSZXF1ZXN0W10+KFxuICAgIHRoaXMudXNlU2VlZCAmJiB0aGlzLnNlZWREYXRhPy5yZXF1ZXN0cyA/IHRoaXMuc2VlZERhdGEucmVxdWVzdHMgOiBbXSxcbiAgKTtcblxuICAvLyBUb3RhbCBSZXF1ZXN0cyBhbmQgV2FpdGluZyBSb29tXG4gIHRvdGFsUmVxV2FpdCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcblxuICAvLyBBbGVydHNcbiAgYWxlcnRWaXNpYmxlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGFsZXJ0TWVzc2FnZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gIGFsZXJ0VHlwZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8J3N1Y2Nlc3MnIHwgJ2Rhbmdlcic+KCdzdWNjZXNzJyk7XG4gIGFsZXJ0RHVyYXRpb24gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMzAwMCk7XG5cbiAgLy8gUHJvZ3Jlc3MgVGltZXJcbiAgcHJvZ3Jlc3NUaW1lclZpc2libGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KHRydWUpO1xuICBwcm9ncmVzc1RpbWVyVmFsdWUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG5cbiAgLy8gTWVudSBNb2RhbHNcbiAgaXNNZW51TW9kYWxWaXNpYmxlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGlzUmVjb3JkaW5nTW9kYWxWaXNpYmxlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGlzU2V0dGluZ3NNb2RhbFZpc2libGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgaXNSZXF1ZXN0c01vZGFsVmlzaWJsZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBpc1dhaXRpbmdNb2RhbFZpc2libGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgaXNDb0hvc3RNb2RhbFZpc2libGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgaXNNZWRpYVNldHRpbmdzTW9kYWxWaXNpYmxlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGlzRGlzcGxheVNldHRpbmdzTW9kYWxWaXNpYmxlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG5cbiAgLy8gT3RoZXIgTW9kYWxzXG4gIGlzUGFydGljaXBhbnRzTW9kYWxWaXNpYmxlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGlzTWVzc2FnZXNNb2RhbFZpc2libGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgaXNDb25maXJtRXhpdE1vZGFsVmlzaWJsZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBpc0NvbmZpcm1IZXJlTW9kYWxWaXNpYmxlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGlzU2hhcmVFdmVudE1vZGFsVmlzaWJsZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBpc0xvYWRpbmdNb2RhbFZpc2libGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcblxuICAvLyBSZWNvcmRpbmcgT3B0aW9uc1xuICByZWNvcmRpbmdNZWRpYU9wdGlvbnMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJ3ZpZGVvJyk7XG4gIHJlY29yZGluZ0F1ZGlvT3B0aW9ucyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignYWxsJyk7XG4gIHJlY29yZGluZ1ZpZGVvT3B0aW9ucyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignYWxsJyk7XG4gIHJlY29yZGluZ1ZpZGVvVHlwZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignZnVsbERpc3BsYXknKTtcbiAgcmVjb3JkaW5nVmlkZW9PcHRpbWl6ZWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgcmVjb3JkaW5nRGlzcGxheVR5cGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PCd2aWRlbycgfCAnbWVkaWEnIHwgJ2FsbCc+KCd2aWRlbycpO1xuICByZWNvcmRpbmdBZGRITFMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KHRydWUpO1xuICByZWNvcmRpbmdOYW1lVGFncyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4odHJ1ZSk7XG4gIHJlY29yZGluZ0JhY2tncm91bmRDb2xvciA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignIzgzYzBlOScpO1xuICByZWNvcmRpbmdOYW1lVGFnc0NvbG9yID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcjZmZmZmZmJyk7XG4gIHJlY29yZGluZ0FkZFRleHQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgcmVjb3JkaW5nQ3VzdG9tVGV4dCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignQWRkIFRleHQnKTtcbiAgcmVjb3JkaW5nQ3VzdG9tVGV4dFBvc2l0aW9uID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCd0b3AnKTtcbiAgcmVjb3JkaW5nQ3VzdG9tVGV4dENvbG9yID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcjZmZmZmZmJyk7XG4gIHJlY29yZGluZ09yaWVudGF0aW9uVmlkZW8gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJ2xhbmRzY2FwZScpO1xuICBjbGVhcmVkVG9SZXN1bWUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KHRydWUpO1xuICBjbGVhcmVkVG9SZWNvcmQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KHRydWUpO1xuICByZWNvcmRTdGF0ZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignZ3JlZW4nKTtcbiAgc2hvd1JlY29yZEJ1dHRvbnMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgcmVjb3JkaW5nUHJvZ3Jlc3NUaW1lID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcwMDowMDowMCcpO1xuICBhdWRpb1N3aXRjaGluZyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICB2aWRlb1N3aXRjaGluZyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIC8vIE1lZGlhIFN0YXRlc1xuICB2aWRlb0FscmVhZHlPbiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBhdWRpb0FscmVhZHlPbiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIGNvbXBvbmVudFNpemVzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxDb21wb25lbnRTaXplcz4oe1xuICAgIG1haW5IZWlnaHQ6IDAsXG4gICAgb3RoZXJIZWlnaHQ6IDAsXG4gICAgbWFpbldpZHRoOiAwLFxuICAgIG90aGVyV2lkdGg6IDAsXG4gIH0pO1xuXG4gIC8vIFBlcm1pc3Npb25zXG4gIGhhc0NhbWVyYVBlcm1pc3Npb24gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgaGFzQXVkaW9QZXJtaXNzaW9uID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG5cbiAgLy8gVHJhbnNwb3J0c1xuICB0cmFuc3BvcnRDcmVhdGVkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHRyYW5zcG9ydENyZWF0ZWRWaWRlbyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICB0cmFuc3BvcnRDcmVhdGVkQXVkaW8gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgdHJhbnNwb3J0Q3JlYXRlZFNjcmVlbiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBwcm9kdWNlclRyYW5zcG9ydCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8VHJhbnNwb3J0IHwgbnVsbD4obnVsbCk7XG4gIHZpZGVvUHJvZHVjZXIgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFByb2R1Y2VyIHwgbnVsbD4obnVsbCk7XG4gIHBhcmFtcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UHJvZHVjZXJPcHRpb25zPih7fSBhcyBQcm9kdWNlck9wdGlvbnMpO1xuICB2aWRlb1BhcmFtcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UHJvZHVjZXJPcHRpb25zPih7fSBhcyBQcm9kdWNlck9wdGlvbnMpO1xuICBhdWRpb1BhcmFtcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UHJvZHVjZXJPcHRpb25zPih7fSBhcyBQcm9kdWNlck9wdGlvbnMpO1xuICBhdWRpb1Byb2R1Y2VyID0gbmV3IEJlaGF2aW9yU3ViamVjdDxQcm9kdWNlciB8IG51bGw+KG51bGwpO1xuICBjb25zdW1lclRyYW5zcG9ydHMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFRyYW5zcG9ydFR5cGVbXT4oW10pO1xuICBjb25zdW1pbmdUcmFuc3BvcnRzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmdbXT4oW10pO1xuXG4gIC8vIFBvbGxzXG4gIHBvbGxzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxQb2xsW10+KFxuICAgIHRoaXMudXNlU2VlZCAmJiB0aGlzLnNlZWREYXRhPy5wb2xscyA/IHRoaXMuc2VlZERhdGEucG9sbHMgOiBbXSxcbiAgKTtcbiAgcG9sbCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UG9sbCB8IG51bGw+KG51bGwpO1xuICBpc1BvbGxNb2RhbFZpc2libGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcblxuICAvLyBCYWNrZ3JvdW5kXG4gIGN1c3RvbUltYWdlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcbiAgc2VsZWN0ZWRJbWFnZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gIHNlZ21lbnRWaWRlbyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8TWVkaWFTdHJlYW0gfCBudWxsPihudWxsKTtcbiAgc2VsZmllU2VnbWVudGF0aW9uID0gbmV3IEJlaGF2aW9yU3ViamVjdDxTZWxmaWVTZWdtZW50YXRpb24gfCBudWxsPihudWxsKTtcbiAgcGF1c2VTZWdtZW50YXRpb24gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgcHJvY2Vzc2VkU3RyZWFtID0gbmV3IEJlaGF2aW9yU3ViamVjdDxNZWRpYVN0cmVhbSB8IG51bGw+KG51bGwpO1xuICBrZWVwQmFja2dyb3VuZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBiYWNrZ3JvdW5kSGFzQ2hhbmdlZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICB2aXJ0dWFsU3RyZWFtID0gbmV3IEJlaGF2aW9yU3ViamVjdDxNZWRpYVN0cmVhbSB8IG51bGw+KG51bGwpO1xuICBtYWluQ2FudmFzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxIVE1MQ2FudmFzRWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBwcmV2S2VlcEJhY2tncm91bmQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgYXBwbGllZEJhY2tncm91bmQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgaXNCYWNrZ3JvdW5kTW9kYWxWaXNpYmxlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGF1dG9DbGlja0JhY2tncm91bmQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcblxuICAvLyBCcmVha291dCBSb29tc1xuICBicmVha291dFJvb21zID0gbmV3IEJlaGF2aW9yU3ViamVjdDxCcmVha291dFBhcnRpY2lwYW50W11bXT4oXG4gICAgdGhpcy51c2VTZWVkICYmIHRoaXMuc2VlZERhdGE/LmJyZWFrb3V0Um9vbXMgPyB0aGlzLnNlZWREYXRhLmJyZWFrb3V0Um9vbXMgOiBbXSxcbiAgKTtcbiAgY3VycmVudFJvb21JbmRleCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgY2FuU3RhcnRCcmVha291dCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBicmVha091dFJvb21TdGFydGVkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGJyZWFrT3V0Um9vbUVuZGVkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGhvc3ROZXdSb29tID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KC0xKTtcbiAgbGltaXRlZEJyZWFrUm9vbSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8QnJlYWtvdXRQYXJ0aWNpcGFudFtdPihbXSk7XG4gIG1haW5Sb29tc0xlbmd0aCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgbWVtYmVyUm9vbSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigtMSk7XG4gIGlzQnJlYWtvdXRSb29tc01vZGFsVmlzaWJsZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIC8vIFdoaXRlYm9hcmRcbiAgd2hpdGVib2FyZFVzZXJzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxXaGl0ZWJvYXJkVXNlcltdPihcbiAgICB0aGlzLnVzZVNlZWQgJiYgdGhpcy5zZWVkRGF0YT8ud2hpdGVib2FyZFVzZXJzID8gdGhpcy5zZWVkRGF0YS53aGl0ZWJvYXJkVXNlcnMgOiBbXSxcbiAgKTtcbiAgY3VycmVudFdoaXRlYm9hcmRJbmRleCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgY2FuU3RhcnRXaGl0ZWJvYXJkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHdoaXRlYm9hcmRTdGFydGVkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHdoaXRlYm9hcmRFbmRlZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICB3aGl0ZWJvYXJkTGltaXQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oNCk7XG4gIGlzV2hpdGVib2FyZE1vZGFsVmlzaWJsZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBpc0NvbmZpZ3VyZVdoaXRlYm9hcmRNb2RhbFZpc2libGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgc2hhcGVzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxTaGFwZVtdPihbXSk7XG4gIHVzZUltYWdlQmFja2dyb3VuZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4odHJ1ZSk7XG4gIHJlZG9TdGFjayA9IG5ldyBCZWhhdmlvclN1YmplY3Q8U2hhcGVbXT4oW10pO1xuICB1bmRvU3RhY2sgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZ1tdPihbXSk7XG4gIGNhbnZhc1N0cmVhbSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8TWVkaWFTdHJlYW0gfCBudWxsPihudWxsKTtcbiAgY2FudmFzV2hpdGVib2FyZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8SFRNTENhbnZhc0VsZW1lbnQgfCBudWxsPihudWxsKTtcblxuICAvLyBTY3JlZW5ib2FyZFxuICBjYW52YXNTY3JlZW5ib2FyZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8SFRNTENhbnZhc0VsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgcHJvY2Vzc2VkU2NyZWVuU3RyZWFtID0gbmV3IEJlaGF2aW9yU3ViamVjdDxNZWRpYVN0cmVhbSB8IG51bGw+KG51bGwpO1xuICBhbm5vdGF0ZVNjcmVlblN0cmVhbSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBtYWluU2NyZWVuQ2FudmFzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxIVE1MQ2FudmFzRWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBpc1NjcmVlbmJvYXJkTW9kYWxWaXNpYmxlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG5cbiAgLy9zdGF0ZSB2YXJpYWJsZXMgZm9yIHRoZSBjb250cm9sIGJ1dHRvbnNcbiAgbWljQWN0aXZlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihcbiAgICB0aGlzLmF1ZGlvQWxyZWFkeU9uLnZhbHVlID8gdGhpcy5hdWRpb0FscmVhZHlPbi52YWx1ZSA6IGZhbHNlLFxuICApO1xuICB2aWRlb0FjdGl2ZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oXG4gICAgdGhpcy52aWRlb0FscmVhZHlPbi52YWx1ZSA/IHRoaXMudmlkZW9BbHJlYWR5T24udmFsdWUgOiBmYWxzZSxcbiAgKTtcbiAgc2NyZWVuU2hhcmVBY3RpdmUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgZW5kQ2FsbEFjdGl2ZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBwYXJ0aWNpcGFudHNBY3RpdmUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgbWVudUFjdGl2ZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBjb21tZW50c0FjdGl2ZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIC8vIFVwZGF0ZSBmdW5jdGlvbnNcbiAgdXBkYXRlTWVzc2FnZXMgPSAodmFsdWU6IE1lc3NhZ2VbXSkgPT4ge1xuICAgIHRoaXMubWVzc2FnZXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlU3RhcnREaXJlY3RNZXNzYWdlID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5zdGFydERpcmVjdE1lc3NhZ2UubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlRGlyZWN0TWVzc2FnZURldGFpbHMgPSAodmFsdWU6IFBhcnRpY2lwYW50IHwgbnVsbCkgPT4ge1xuICAgIHRoaXMuZGlyZWN0TWVzc2FnZURldGFpbHMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlU2hvd01lc3NhZ2VzQmFkZ2UgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnNob3dNZXNzYWdlc0JhZGdlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUF1ZGlvU2V0dGluZyA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5hdWRpb1NldHRpbmcubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlVmlkZW9TZXR0aW5nID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLnZpZGVvU2V0dGluZy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVTY3JlZW5zaGFyZVNldHRpbmcgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMuc2NyZWVuc2hhcmVTZXR0aW5nLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUNoYXRTZXR0aW5nID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLmNoYXRTZXR0aW5nLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZURpc3BsYXlPcHRpb24gPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMuZGlzcGxheU9wdGlvbi5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBdXRvV2F2ZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuYXV0b1dhdmUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlRm9yY2VGdWxsRGlzcGxheSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuZm9yY2VGdWxsRGlzcGxheS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVQcmV2Rm9yY2VGdWxsRGlzcGxheSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMucHJldkZvcmNlRnVsbERpc3BsYXkubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUHJldk1lZXRpbmdEaXNwbGF5VHlwZSA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5wcmV2TWVldGluZ0Rpc3BsYXlUeXBlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVdhaXRpbmdSb29tQ291bnRlciA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy53YWl0aW5nUm9vbUNvdW50ZXIubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlV2FpdGluZ1Jvb21GaWx0ZXIgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMud2FpdGluZ1Jvb21GaWx0ZXIubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlV2FpdGluZ1Jvb21MaXN0ID0gKHZhbHVlOiBXYWl0aW5nUm9vbVBhcnRpY2lwYW50W10pID0+IHtcbiAgICB0aGlzLndhaXRpbmdSb29tTGlzdC5uZXh0KHZhbHVlKTtcbiAgICB0aGlzLmZpbHRlcmVkV2FpdGluZ1Jvb21MaXN0Lm5leHQodmFsdWUpO1xuICAgIHRoaXMud2FpdGluZ1Jvb21Db3VudGVyLm5leHQodmFsdWUubGVuZ3RoKTtcbiAgfTtcblxuICBvbldhaXRpbmdSb29tRmlsdGVyQ2hhbmdlID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICBpZiAodmFsdWUgIT09ICcnICYmIHZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGZpbHRlcmVkV2FpdGluZ1Jvb20gPSB0aGlzLndhaXRpbmdSb29tTGlzdFxuICAgICAgICAuZ2V0VmFsdWUoKVxuICAgICAgICAuZmlsdGVyKCh3YWl0aW5nUm9vbTogV2FpdGluZ1Jvb21QYXJ0aWNpcGFudCkgPT4ge1xuICAgICAgICAgIHJldHVybiB3YWl0aW5nUm9vbS5uYW1lLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXModmFsdWUudG9Mb3dlckNhc2UoKSk7XG4gICAgICAgIH0pO1xuICAgICAgdGhpcy5maWx0ZXJlZFdhaXRpbmdSb29tTGlzdC5uZXh0KGZpbHRlcmVkV2FpdGluZ1Jvb20pO1xuICAgICAgdGhpcy53YWl0aW5nUm9vbUNvdW50ZXIubmV4dChmaWx0ZXJlZFdhaXRpbmdSb29tLmxlbmd0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZmlsdGVyZWRXYWl0aW5nUm9vbUxpc3QubmV4dCh0aGlzLndhaXRpbmdSb29tTGlzdC5nZXRWYWx1ZSgpKTtcbiAgICAgIHRoaXMud2FpdGluZ1Jvb21Db3VudGVyLm5leHQodGhpcy53YWl0aW5nUm9vbUxpc3QuZ2V0VmFsdWUoKS5sZW5ndGgpO1xuICAgIH1cbiAgfTtcblxuICBvbldhaXRpbmdSb29tQ2xvc2UgPSAoKSA9PiB7XG4gICAgdGhpcy51cGRhdGVJc1dhaXRpbmdNb2RhbFZpc2libGUoZmFsc2UpO1xuICB9O1xuXG4gIHVwZGF0ZVJlcXVlc3RDb3VudGVyID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLnJlcXVlc3RDb3VudGVyLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlcXVlc3RGaWx0ZXIgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMucmVxdWVzdEZpbHRlci5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZXF1ZXN0TGlzdCA9ICh2YWx1ZTogUmVxdWVzdFtdKSA9PiB7XG4gICAgdGhpcy5yZXF1ZXN0TGlzdC5uZXh0KHZhbHVlKTtcbiAgICB0aGlzLmZpbHRlcmVkUmVxdWVzdExpc3QubmV4dCh2YWx1ZSk7XG4gICAgdGhpcy5yZXF1ZXN0Q291bnRlci5uZXh0KHZhbHVlLmxlbmd0aCk7XG4gIH07XG5cbiAgb25SZXF1ZXN0RmlsdGVyQ2hhbmdlID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICBpZiAodmFsdWUgIT09ICcnICYmIHZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGZpbHRlcmVkUmVxdWVzdCA9IHRoaXMucmVxdWVzdExpc3QuZ2V0VmFsdWUoKS5maWx0ZXIoKHJlcXVlc3Q6IFJlcXVlc3QpID0+IHtcbiAgICAgICAgcmV0dXJuIHJlcXVlc3Q/Lm5hbWU/LnRvTG93ZXJDYXNlKCkuaW5jbHVkZXModmFsdWUudG9Mb3dlckNhc2UoKSk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuZmlsdGVyZWRSZXF1ZXN0TGlzdC5uZXh0KGZpbHRlcmVkUmVxdWVzdCk7XG4gICAgICB0aGlzLnJlcXVlc3RDb3VudGVyLm5leHQoZmlsdGVyZWRSZXF1ZXN0Lmxlbmd0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZmlsdGVyZWRSZXF1ZXN0TGlzdC5uZXh0KHRoaXMucmVxdWVzdExpc3QuZ2V0VmFsdWUoKSk7XG4gICAgICB0aGlzLnJlcXVlc3RDb3VudGVyLm5leHQodGhpcy5yZXF1ZXN0TGlzdC5nZXRWYWx1ZSgpLmxlbmd0aCk7XG4gICAgfVxuICB9O1xuXG4gIG9uUmVxdWVzdENsb3NlID0gKCkgPT4ge1xuICAgIHRoaXMudXBkYXRlSXNSZXF1ZXN0c01vZGFsVmlzaWJsZShmYWxzZSk7XG4gIH07XG5cbiAgdXBkYXRlVG90YWxSZXFXYWl0ID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLnRvdGFsUmVxV2FpdC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBbGVydFZpc2libGUgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmFsZXJ0VmlzaWJsZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBbGVydE1lc3NhZ2UgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMuYWxlcnRNZXNzYWdlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUFsZXJ0VHlwZSA9ICh2YWx1ZTogJ3N1Y2Nlc3MnIHwgJ2RhbmdlcicpID0+IHtcbiAgICB0aGlzLmFsZXJ0VHlwZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBbGVydER1cmF0aW9uID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLmFsZXJ0RHVyYXRpb24ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUHJvZ3Jlc3NUaW1lclZpc2libGUgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnByb2dyZXNzVGltZXJWaXNpYmxlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVByb2dyZXNzVGltZXJWYWx1ZSA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5wcm9ncmVzc1RpbWVyVmFsdWUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlSXNNZW51TW9kYWxWaXNpYmxlID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5pc01lbnVNb2RhbFZpc2libGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlSXNSZWNvcmRpbmdNb2RhbFZpc2libGUgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmlzUmVjb3JkaW5nTW9kYWxWaXNpYmxlLm5leHQodmFsdWUpO1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdGhpcy51cGRhdGVDb25maXJtZWRUb1JlY29yZChmYWxzZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy5jbGVhcmVkVG9SZWNvcmQuZ2V0VmFsdWUoKSAmJlxuICAgICAgICB0aGlzLmNsZWFyZWRUb1Jlc3VtZS5nZXRWYWx1ZSgpICYmXG4gICAgICAgIHRoaXMucmVjb3JkU3RhcnRlZC5nZXRWYWx1ZSgpXG4gICAgICApIHtcbiAgICAgICAgdGhpcy51cGRhdGVTaG93UmVjb3JkQnV0dG9ucyh0cnVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgdXBkYXRlSXNTZXR0aW5nc01vZGFsVmlzaWJsZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuaXNTZXR0aW5nc01vZGFsVmlzaWJsZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVJc1JlcXVlc3RzTW9kYWxWaXNpYmxlID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5pc1JlcXVlc3RzTW9kYWxWaXNpYmxlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUlzV2FpdGluZ01vZGFsVmlzaWJsZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuaXNXYWl0aW5nTW9kYWxWaXNpYmxlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUlzQ29Ib3N0TW9kYWxWaXNpYmxlID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5pc0NvSG9zdE1vZGFsVmlzaWJsZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVJc01lZGlhU2V0dGluZ3NNb2RhbFZpc2libGUgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmlzTWVkaWFTZXR0aW5nc01vZGFsVmlzaWJsZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVJc0Rpc3BsYXlTZXR0aW5nc01vZGFsVmlzaWJsZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuaXNEaXNwbGF5U2V0dGluZ3NNb2RhbFZpc2libGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlSXNQYXJ0aWNpcGFudHNNb2RhbFZpc2libGUgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmlzUGFydGljaXBhbnRzTW9kYWxWaXNpYmxlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUlzTWVzc2FnZXNNb2RhbFZpc2libGUgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmlzTWVzc2FnZXNNb2RhbFZpc2libGUubmV4dCh2YWx1ZSk7XG4gICAgaWYgKCF2YWx1ZSkge1xuICAgICAgdGhpcy51cGRhdGVTaG93TWVzc2FnZXNCYWRnZShmYWxzZSk7XG4gICAgfVxuICB9O1xuXG4gIHVwZGF0ZUlzQ29uZmlybUV4aXRNb2RhbFZpc2libGUgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmlzQ29uZmlybUV4aXRNb2RhbFZpc2libGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlSXNDb25maXJtSGVyZU1vZGFsVmlzaWJsZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuaXNDb25maXJtSGVyZU1vZGFsVmlzaWJsZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVJc0xvYWRpbmdNb2RhbFZpc2libGUgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmlzTG9hZGluZ01vZGFsVmlzaWJsZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVJc1NoYXJlRXZlbnRNb2RhbFZpc2libGUgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmlzU2hhcmVFdmVudE1vZGFsVmlzaWJsZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRpbmdNZWRpYU9wdGlvbnMgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMucmVjb3JkaW5nTWVkaWFPcHRpb25zLm5leHQodmFsdWUpO1xuICAgIHRoaXMuY2xlYXJlZFRvUmVjb3JkLm5leHQoZmFsc2UpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ0F1ZGlvT3B0aW9ucyA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdBdWRpb09wdGlvbnMubmV4dCh2YWx1ZSk7XG4gICAgdGhpcy5jbGVhcmVkVG9SZWNvcmQubmV4dChmYWxzZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nVmlkZW9PcHRpb25zID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ1ZpZGVvT3B0aW9ucy5uZXh0KHZhbHVlKTtcbiAgICB0aGlzLmNsZWFyZWRUb1JlY29yZC5uZXh0KGZhbHNlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRpbmdWaWRlb1R5cGUgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMucmVjb3JkaW5nVmlkZW9UeXBlLm5leHQodmFsdWUpO1xuICAgIHRoaXMuY2xlYXJlZFRvUmVjb3JkLm5leHQoZmFsc2UpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ1ZpZGVvT3B0aW1pemVkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdWaWRlb09wdGltaXplZC5uZXh0KHZhbHVlKTtcbiAgICB0aGlzLmNsZWFyZWRUb1JlY29yZC5uZXh0KGZhbHNlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRpbmdEaXNwbGF5VHlwZSA9ICh2YWx1ZTogJ3ZpZGVvJyB8ICdtZWRpYScgfCAnYWxsJykgPT4ge1xuICAgIHRoaXMucmVjb3JkaW5nRGlzcGxheVR5cGUubmV4dCh2YWx1ZSk7XG4gICAgdGhpcy5jbGVhcmVkVG9SZWNvcmQubmV4dChmYWxzZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nQWRkSExTID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdBZGRITFMubmV4dCh2YWx1ZSk7XG4gICAgdGhpcy5jbGVhcmVkVG9SZWNvcmQubmV4dChmYWxzZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nQWRkVGV4dCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMucmVjb3JkaW5nQWRkVGV4dC5uZXh0KHZhbHVlKTtcbiAgICB0aGlzLmNsZWFyZWRUb1JlY29yZC5uZXh0KGZhbHNlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRpbmdDdXN0b21UZXh0ID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ0N1c3RvbVRleHQubmV4dCh2YWx1ZSk7XG4gICAgdGhpcy5jbGVhcmVkVG9SZWNvcmQubmV4dChmYWxzZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nQ3VzdG9tVGV4dFBvc2l0aW9uID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ0N1c3RvbVRleHRQb3NpdGlvbi5uZXh0KHZhbHVlKTtcbiAgICB0aGlzLmNsZWFyZWRUb1JlY29yZC5uZXh0KGZhbHNlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRpbmdDdXN0b21UZXh0Q29sb3IgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMucmVjb3JkaW5nQ3VzdG9tVGV4dENvbG9yLm5leHQodmFsdWUpO1xuICAgIHRoaXMuY2xlYXJlZFRvUmVjb3JkLm5leHQoZmFsc2UpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ05hbWVUYWdzID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdOYW1lVGFncy5uZXh0KHZhbHVlKTtcbiAgICB0aGlzLmNsZWFyZWRUb1JlY29yZC5uZXh0KGZhbHNlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRpbmdCYWNrZ3JvdW5kQ29sb3IgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMucmVjb3JkaW5nQmFja2dyb3VuZENvbG9yLm5leHQodmFsdWUpO1xuICAgIHRoaXMuY2xlYXJlZFRvUmVjb3JkLm5leHQoZmFsc2UpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ05hbWVUYWdzQ29sb3IgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMucmVjb3JkaW5nTmFtZVRhZ3NDb2xvci5uZXh0KHZhbHVlKTtcbiAgICB0aGlzLmNsZWFyZWRUb1JlY29yZC5uZXh0KGZhbHNlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRpbmdPcmllbnRhdGlvblZpZGVvID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ09yaWVudGF0aW9uVmlkZW8ubmV4dCh2YWx1ZSk7XG4gICAgdGhpcy5jbGVhcmVkVG9SZWNvcmQubmV4dChmYWxzZSk7XG4gIH07XG5cbiAgdXBkYXRlQ2xlYXJlZFRvUmVzdW1lID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5jbGVhcmVkVG9SZXN1bWUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQ2xlYXJlZFRvUmVjb3JkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5jbGVhcmVkVG9SZWNvcmQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkU3RhdGUgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIGlmICh0aGlzLnJlY29yZFN0YXJ0ZWQudmFsdWUgJiYgIXRoaXMucmVjb3JkU3RvcHBlZC52YWx1ZSkge1xuICAgICAgaWYgKCF0aGlzLnJlY29yZFBhdXNlZC52YWx1ZSkge1xuICAgICAgICB0aGlzLnJlY29yZFN0YXRlLm5leHQoJ3JlZCcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5yZWNvcmRTdGF0ZS5uZXh0KCd5ZWxsb3cnKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZWNvcmRTdGF0ZS5uZXh0KHZhbHVlKTtcbiAgICB9XG4gICAgdGhpcy5yZWNvcmRTdGF0ZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVTaG93UmVjb3JkQnV0dG9ucyA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuc2hvd1JlY29yZEJ1dHRvbnMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nUHJvZ3Jlc3NUaW1lID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ1Byb2dyZXNzVGltZS5uZXh0KHZhbHVlKTtcbiAgICB0aGlzLnVwZGF0ZVJlY29yZFRpbWVyV2lkZ2V0KCk7XG4gIH07XG5cbiAgdXBkYXRlQXVkaW9Td2l0Y2hpbmcgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmF1ZGlvU3dpdGNoaW5nLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVZpZGVvU3dpdGNoaW5nID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy52aWRlb1N3aXRjaGluZy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVWaWRlb0FscmVhZHlPbiA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMudmlkZW9BbHJlYWR5T24ubmV4dCh2YWx1ZSk7XG4gICAgdGhpcy52aWRlb0FjdGl2ZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBdWRpb0FscmVhZHlPbiA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuYXVkaW9BbHJlYWR5T24ubmV4dCh2YWx1ZSk7XG4gICAgdGhpcy5taWNBY3RpdmUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQ29tcG9uZW50U2l6ZXMgPSAoc2l6ZXM6IENvbXBvbmVudFNpemVzKSA9PiB7XG4gICAgdGhpcy5jb21wb25lbnRTaXplcy5uZXh0KHNpemVzKTtcbiAgfTtcblxuICB1cGRhdGVIYXNDYW1lcmFQZXJtaXNzaW9uID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5oYXNDYW1lcmFQZXJtaXNzaW9uLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUhhc0F1ZGlvUGVybWlzc2lvbiA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuaGFzQXVkaW9QZXJtaXNzaW9uLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHJlcXVlc3RQZXJtaXNzaW9uQ2FtZXJhKCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgLy8gSW1wbGVtZW50IHRoZSByZXF1ZXN0IHBlcm1pc3Npb24gbG9naWMgaGVyZVxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoJ2dyYW50ZWQnKTtcbiAgfVxuXG4gIHJlcXVlc3RQZXJtaXNzaW9uQXVkaW8oKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAvLyBJbXBsZW1lbnQgdGhlIHJlcXVlc3QgcGVybWlzc2lvbiBsb2dpYyBoZXJlXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgnZ3JhbnRlZCcpO1xuICB9XG5cbiAgdXBkYXRlVHJhbnNwb3J0Q3JlYXRlZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMudHJhbnNwb3J0Q3JlYXRlZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVUcmFuc3BvcnRDcmVhdGVkVmlkZW8gPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnRyYW5zcG9ydENyZWF0ZWRWaWRlby5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVUcmFuc3BvcnRDcmVhdGVkQXVkaW8gPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnRyYW5zcG9ydENyZWF0ZWRBdWRpby5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVUcmFuc3BvcnRDcmVhdGVkU2NyZWVuID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy50cmFuc3BvcnRDcmVhdGVkU2NyZWVuLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVByb2R1Y2VyVHJhbnNwb3J0ID0gKHZhbHVlOiBUcmFuc3BvcnQgfCBudWxsKSA9PiB7XG4gICAgdGhpcy5wcm9kdWNlclRyYW5zcG9ydC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVWaWRlb1Byb2R1Y2VyID0gKHZhbHVlOiBQcm9kdWNlciB8IG51bGwpID0+IHtcbiAgICB0aGlzLnZpZGVvUHJvZHVjZXIubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUGFyYW1zID0gKHZhbHVlOiBQcm9kdWNlck9wdGlvbnMpID0+IHtcbiAgICB0aGlzLnBhcmFtcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVWaWRlb1BhcmFtcyA9ICh2YWx1ZTogUHJvZHVjZXJPcHRpb25zKSA9PiB7XG4gICAgdGhpcy52aWRlb1BhcmFtcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBdWRpb1BhcmFtcyA9ICh2YWx1ZTogUHJvZHVjZXJPcHRpb25zKSA9PiB7XG4gICAgdGhpcy5hdWRpb1BhcmFtcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBdWRpb1Byb2R1Y2VyID0gKHZhbHVlOiBQcm9kdWNlciB8IG51bGwpID0+IHtcbiAgICB0aGlzLmF1ZGlvUHJvZHVjZXIubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQ29uc3VtZXJUcmFuc3BvcnRzID0gKHZhbHVlOiBUcmFuc3BvcnRUeXBlW10pID0+IHtcbiAgICB0aGlzLmNvbnN1bWVyVHJhbnNwb3J0cy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVDb25zdW1pbmdUcmFuc3BvcnRzID0gKHZhbHVlOiBzdHJpbmdbXSkgPT4ge1xuICAgIHRoaXMuY29uc3VtaW5nVHJhbnNwb3J0cy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVQb2xscyA9ICh2YWx1ZTogUG9sbFtdKSA9PiB7XG4gICAgdGhpcy5wb2xscy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVQb2xsID0gKHZhbHVlOiBQb2xsIHwgbnVsbCkgPT4ge1xuICAgIHRoaXMucG9sbC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVJc1BvbGxNb2RhbFZpc2libGUgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmlzUG9sbE1vZGFsVmlzaWJsZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVDdXN0b21JbWFnZSA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5jdXN0b21JbWFnZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVTZWxlY3RlZEltYWdlID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLnNlbGVjdGVkSW1hZ2UubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlU2VnbWVudFZpZGVvID0gKHZhbHVlOiBNZWRpYVN0cmVhbSB8IG51bGwpID0+IHtcbiAgICB0aGlzLnNlZ21lbnRWaWRlby5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVTZWxmaWVTZWdtZW50YXRpb24gPSAodmFsdWU6IFNlbGZpZVNlZ21lbnRhdGlvbiB8IG51bGwpID0+IHtcbiAgICB0aGlzLnNlbGZpZVNlZ21lbnRhdGlvbi5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVQYXVzZVNlZ21lbnRhdGlvbiA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMucGF1c2VTZWdtZW50YXRpb24ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUHJvY2Vzc2VkU3RyZWFtID0gKHZhbHVlOiBNZWRpYVN0cmVhbSB8IG51bGwpID0+IHtcbiAgICB0aGlzLnByb2Nlc3NlZFN0cmVhbS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVLZWVwQmFja2dyb3VuZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMua2VlcEJhY2tncm91bmQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQmFja2dyb3VuZEhhc0NoYW5nZWQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmJhY2tncm91bmRIYXNDaGFuZ2VkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVZpcnR1YWxTdHJlYW0gPSAodmFsdWU6IE1lZGlhU3RyZWFtIHwgbnVsbCkgPT4ge1xuICAgIHRoaXMudmlydHVhbFN0cmVhbS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVNYWluQ2FudmFzID0gKHZhbHVlOiBIVE1MQ2FudmFzRWxlbWVudCB8IG51bGwpID0+IHtcbiAgICB0aGlzLm1haW5DYW52YXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUHJldktlZXBCYWNrZ3JvdW5kID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5wcmV2S2VlcEJhY2tncm91bmQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQXBwbGllZEJhY2tncm91bmQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmFwcGxpZWRCYWNrZ3JvdW5kLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUlzQmFja2dyb3VuZE1vZGFsVmlzaWJsZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuaXNCYWNrZ3JvdW5kTW9kYWxWaXNpYmxlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUF1dG9DbGlja0JhY2tncm91bmQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmF1dG9DbGlja0JhY2tncm91bmQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQnJlYWtvdXRSb29tcyA9ICh2YWx1ZTogQnJlYWtvdXRQYXJ0aWNpcGFudFtdW10pID0+IHtcbiAgICB0aGlzLmJyZWFrb3V0Um9vbXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQ3VycmVudFJvb21JbmRleCA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5jdXJyZW50Um9vbUluZGV4Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUNhblN0YXJ0QnJlYWtvdXQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmNhblN0YXJ0QnJlYWtvdXQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQnJlYWtPdXRSb29tU3RhcnRlZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuYnJlYWtPdXRSb29tU3RhcnRlZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVCcmVha091dFJvb21FbmRlZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuYnJlYWtPdXRSb29tRW5kZWQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlSG9zdE5ld1Jvb20gPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMuaG9zdE5ld1Jvb20ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTGltaXRlZEJyZWFrUm9vbSA9ICh2YWx1ZTogQnJlYWtvdXRQYXJ0aWNpcGFudFtdKSA9PiB7XG4gICAgdGhpcy5saW1pdGVkQnJlYWtSb29tLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZU1haW5Sb29tc0xlbmd0aCA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5tYWluUm9vbXNMZW5ndGgubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTWVtYmVyUm9vbSA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5tZW1iZXJSb29tLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUlzQnJlYWtvdXRSb29tc01vZGFsVmlzaWJsZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuaXNCcmVha291dFJvb21zTW9kYWxWaXNpYmxlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVdoaXRlYm9hcmRVc2VycyA9ICh2YWx1ZTogV2hpdGVib2FyZFVzZXJbXSkgPT4ge1xuICAgIHRoaXMud2hpdGVib2FyZFVzZXJzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUN1cnJlbnRXaGl0ZWJvYXJkSW5kZXggPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMuY3VycmVudFdoaXRlYm9hcmRJbmRleC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVDYW5TdGFydFdoaXRlYm9hcmQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmNhblN0YXJ0V2hpdGVib2FyZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVXaGl0ZWJvYXJkU3RhcnRlZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMud2hpdGVib2FyZFN0YXJ0ZWQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlV2hpdGVib2FyZEVuZGVkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy53aGl0ZWJvYXJkRW5kZWQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlV2hpdGVib2FyZExpbWl0ID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLndoaXRlYm9hcmRMaW1pdC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVJc1doaXRlYm9hcmRNb2RhbFZpc2libGUgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmlzV2hpdGVib2FyZE1vZGFsVmlzaWJsZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVJc0NvbmZpZ3VyZVdoaXRlYm9hcmRNb2RhbFZpc2libGUgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmlzQ29uZmlndXJlV2hpdGVib2FyZE1vZGFsVmlzaWJsZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVTaGFwZXMgPSAodmFsdWU6IFNoYXBlW10pID0+IHtcbiAgICB0aGlzLnNoYXBlcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVVc2VJbWFnZUJhY2tncm91bmQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnVzZUltYWdlQmFja2dyb3VuZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZWRvU3RhY2sgPSAodmFsdWU6IFNoYXBlW10pID0+IHtcbiAgICB0aGlzLnJlZG9TdGFjay5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVVbmRvU3RhY2sgPSAodmFsdWU6IHN0cmluZ1tdKSA9PiB7XG4gICAgdGhpcy51bmRvU3RhY2submV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQ2FudmFzU3RyZWFtID0gKHZhbHVlOiBNZWRpYVN0cmVhbSB8IG51bGwpID0+IHtcbiAgICB0aGlzLmNhbnZhc1N0cmVhbS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVDYW52YXNXaGl0ZWJvYXJkID0gKHZhbHVlOiBIVE1MQ2FudmFzRWxlbWVudCB8IG51bGwpID0+IHtcbiAgICB0aGlzLmNhbnZhc1doaXRlYm9hcmQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQ2FudmFzU2NyZWVuYm9hcmQgPSAodmFsdWU6IEhUTUxDYW52YXNFbGVtZW50IHwgbnVsbCkgPT4ge1xuICAgIHRoaXMuY2FudmFzU2NyZWVuYm9hcmQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUHJvY2Vzc2VkU2NyZWVuU3RyZWFtID0gKHZhbHVlOiBNZWRpYVN0cmVhbSB8IG51bGwpID0+IHtcbiAgICB0aGlzLnByb2Nlc3NlZFNjcmVlblN0cmVhbS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBbm5vdGF0ZVNjcmVlblN0cmVhbSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuYW5ub3RhdGVTY3JlZW5TdHJlYW0ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTWFpblNjcmVlbkNhbnZhcyA9ICh2YWx1ZTogSFRNTENhbnZhc0VsZW1lbnQgfCBudWxsKSA9PiB7XG4gICAgdGhpcy5tYWluU2NyZWVuQ2FudmFzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUlzU2NyZWVuYm9hcmRNb2RhbFZpc2libGUgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmlzU2NyZWVuYm9hcmRNb2RhbFZpc2libGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgY2hlY2tPcmllbnRhdGlvbiA9ICgpID0+IHtcbiAgICBjb25zdCBpc1BvcnRyYWl0ID0gd2luZG93Lm1hdGNoTWVkaWEoJyhvcmllbnRhdGlvbjogcG9ydHJhaXQpJykubWF0Y2hlcztcbiAgICByZXR1cm4gaXNQb3J0cmFpdCA/ICdwb3J0cmFpdCcgOiAnbGFuZHNjYXBlJztcbiAgfTtcblxuICBzaG93QWxlcnQgPSAoe1xuICAgIG1lc3NhZ2UsXG4gICAgdHlwZSxcbiAgICBkdXJhdGlvbiA9IDMwMDAsXG4gIH06IHtcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgdHlwZTogJ3N1Y2Nlc3MnIHwgJ2Rhbmdlcic7XG4gICAgZHVyYXRpb24/OiBudW1iZXI7XG4gIH0pID0+IHtcbiAgICB0aGlzLnVwZGF0ZUFsZXJ0TWVzc2FnZShtZXNzYWdlKTtcbiAgICB0aGlzLnVwZGF0ZUFsZXJ0VHlwZSh0eXBlKTtcbiAgICB0aGlzLnVwZGF0ZUFsZXJ0RHVyYXRpb24oZHVyYXRpb24pO1xuICAgIHRoaXMudXBkYXRlQWxlcnRWaXNpYmxlKHRydWUpO1xuICB9O1xuXG4gIGdldEFsbFBhcmFtcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbG9jYWxVSU1vZGU6IHRoaXMubG9jYWxVSU1vZGUudmFsdWUsIC8vIExvY2FsIFVJIG1vZGVcblxuICAgICAgLy8gUm9vbSBEZXRhaWxzXG4gICAgICByb29tTmFtZTogdGhpcy5yb29tTmFtZS52YWx1ZSxcbiAgICAgIG1lbWJlcjogdGhpcy5tZW1iZXIudmFsdWUsXG4gICAgICBhZG1pblBhc3Njb2RlOiB0aGlzLmFkbWluUGFzc2NvZGUudmFsdWUsXG4gICAgICB5b3VBcmVDb0hvc3Q6IHRoaXMueW91QXJlQ29Ib3N0LnZhbHVlLFxuICAgICAgeW91QXJlSG9zdDogdGhpcy55b3VBcmVIb3N0LnZhbHVlLFxuICAgICAgaXNsZXZlbDogdGhpcy5pc2xldmVsLnZhbHVlLFxuICAgICAgY29uZmlybWVkVG9SZWNvcmQ6IHRoaXMuY29uZmlybWVkVG9SZWNvcmQudmFsdWUsXG4gICAgICBtZWV0aW5nRGlzcGxheVR5cGU6IHRoaXMubWVldGluZ0Rpc3BsYXlUeXBlLnZhbHVlLFxuICAgICAgbWVldGluZ1ZpZGVvT3B0aW1pemVkOiB0aGlzLm1lZXRpbmdWaWRlb09wdGltaXplZC52YWx1ZSxcbiAgICAgIGV2ZW50VHlwZTogdGhpcy5ldmVudFR5cGUudmFsdWUsXG4gICAgICBwYXJ0aWNpcGFudHM6IHRoaXMucGFydGljaXBhbnRzLnZhbHVlLFxuICAgICAgZmlsdGVyZWRQYXJ0aWNpcGFudHM6IHRoaXMuZmlsdGVyZWRQYXJ0aWNpcGFudHMudmFsdWUsXG4gICAgICBwYXJ0aWNpcGFudHNDb3VudGVyOiB0aGlzLnBhcnRpY2lwYW50c0NvdW50ZXIudmFsdWUsXG4gICAgICBwYXJ0aWNpcGFudHNGaWx0ZXI6IHRoaXMucGFydGljaXBhbnRzRmlsdGVyLnZhbHVlLFxuXG4gICAgICAvLyBNb3JlIHJvb20gZGV0YWlscyAtIG1lZGlhXG4gICAgICBjb25zdW1lX3NvY2tldHM6IHRoaXMuY29uc3VtZV9zb2NrZXRzLnZhbHVlLFxuICAgICAgcnRwQ2FwYWJpbGl0aWVzOiB0aGlzLnJ0cENhcGFiaWxpdGllcy52YWx1ZSxcbiAgICAgIHJvb21SZWN2SVBzOiB0aGlzLnJvb21SZWN2SVBzLnZhbHVlLFxuICAgICAgbWVldGluZ1Jvb21QYXJhbXM6IHRoaXMubWVldGluZ1Jvb21QYXJhbXMudmFsdWUsXG4gICAgICBpdGVtUGFnZUxpbWl0OiB0aGlzLml0ZW1QYWdlTGltaXQudmFsdWUsXG4gICAgICBhdWRpb09ubHlSb29tOiB0aGlzLmF1ZGlvT25seVJvb20udmFsdWUsXG4gICAgICBhZGRGb3JCYXNpYzogdGhpcy5hZGRGb3JCYXNpYy52YWx1ZSxcbiAgICAgIHNjcmVlblBhZ2VMaW1pdDogdGhpcy5zY3JlZW5QYWdlTGltaXQudmFsdWUsXG4gICAgICBzaGFyZVNjcmVlblN0YXJ0ZWQ6IHRoaXMuc2hhcmVTY3JlZW5TdGFydGVkLnZhbHVlLFxuICAgICAgc2hhcmVkOiB0aGlzLnNoYXJlZC52YWx1ZSxcbiAgICAgIHRhcmdldE9yaWVudGF0aW9uOiB0aGlzLnRhcmdldE9yaWVudGF0aW9uLnZhbHVlLFxuICAgICAgdGFyZ2V0UmVzb2x1dGlvbjogdGhpcy50YXJnZXRSZXNvbHV0aW9uLnZhbHVlLFxuICAgICAgdGFyZ2V0UmVzb2x1dGlvbkhvc3Q6IHRoaXMudGFyZ2V0UmVzb2x1dGlvbkhvc3QudmFsdWUsXG4gICAgICB2aWRDb25zOiB0aGlzLnZpZENvbnMudmFsdWUsXG4gICAgICBmcmFtZVJhdGU6IHRoaXMuZnJhbWVSYXRlLnZhbHVlLFxuICAgICAgaFBhcmFtczogdGhpcy5oUGFyYW1zLnZhbHVlLFxuICAgICAgdlBhcmFtczogdGhpcy52UGFyYW1zLnZhbHVlLFxuICAgICAgc2NyZWVuUGFyYW1zOiB0aGlzLnNjcmVlblBhcmFtcy52YWx1ZSxcbiAgICAgIGFQYXJhbXM6IHRoaXMuYVBhcmFtcy52YWx1ZSxcblxuICAgICAgLy8gTW9yZSByb29tIGRldGFpbHMgLSByZWNvcmRpbmdcbiAgICAgIHJlY29yZGluZ0F1ZGlvUGF1c2VzTGltaXQ6IHRoaXMucmVjb3JkaW5nQXVkaW9QYXVzZXNMaW1pdC52YWx1ZSxcbiAgICAgIHJlY29yZGluZ0F1ZGlvUGF1c2VzQ291bnQ6IHRoaXMucmVjb3JkaW5nQXVkaW9QYXVzZXNDb3VudC52YWx1ZSxcbiAgICAgIHJlY29yZGluZ0F1ZGlvU3VwcG9ydDogdGhpcy5yZWNvcmRpbmdBdWRpb1N1cHBvcnQudmFsdWUsXG4gICAgICByZWNvcmRpbmdBdWRpb1Blb3BsZUxpbWl0OiB0aGlzLnJlY29yZGluZ0F1ZGlvUGVvcGxlTGltaXQudmFsdWUsXG4gICAgICByZWNvcmRpbmdBdWRpb1BhcnRpY2lwYW50c1RpbWVMaW1pdDogdGhpcy5yZWNvcmRpbmdBdWRpb1BhcnRpY2lwYW50c1RpbWVMaW1pdC52YWx1ZSxcbiAgICAgIHJlY29yZGluZ1ZpZGVvUGF1c2VzQ291bnQ6IHRoaXMucmVjb3JkaW5nVmlkZW9QYXVzZXNDb3VudC52YWx1ZSxcbiAgICAgIHJlY29yZGluZ1ZpZGVvUGF1c2VzTGltaXQ6IHRoaXMucmVjb3JkaW5nVmlkZW9QYXVzZXNMaW1pdC52YWx1ZSxcbiAgICAgIHJlY29yZGluZ1ZpZGVvU3VwcG9ydDogdGhpcy5yZWNvcmRpbmdWaWRlb1N1cHBvcnQudmFsdWUsXG4gICAgICByZWNvcmRpbmdWaWRlb1Blb3BsZUxpbWl0OiB0aGlzLnJlY29yZGluZ1ZpZGVvUGVvcGxlTGltaXQudmFsdWUsXG4gICAgICByZWNvcmRpbmdWaWRlb1BhcnRpY2lwYW50c1RpbWVMaW1pdDogdGhpcy5yZWNvcmRpbmdWaWRlb1BhcnRpY2lwYW50c1RpbWVMaW1pdC52YWx1ZSxcbiAgICAgIHJlY29yZGluZ0FsbFBhcnRpY2lwYW50c1N1cHBvcnQ6IHRoaXMucmVjb3JkaW5nQWxsUGFydGljaXBhbnRzU3VwcG9ydC52YWx1ZSxcbiAgICAgIHJlY29yZGluZ1ZpZGVvUGFydGljaXBhbnRzU3VwcG9ydDogdGhpcy5yZWNvcmRpbmdWaWRlb1BhcnRpY2lwYW50c1N1cHBvcnQudmFsdWUsXG4gICAgICByZWNvcmRpbmdBbGxQYXJ0aWNpcGFudHNGdWxsUm9vbVN1cHBvcnQ6IHRoaXMucmVjb3JkaW5nQWxsUGFydGljaXBhbnRzRnVsbFJvb21TdXBwb3J0LnZhbHVlLFxuICAgICAgcmVjb3JkaW5nVmlkZW9QYXJ0aWNpcGFudHNGdWxsUm9vbVN1cHBvcnQ6XG4gICAgICAgIHRoaXMucmVjb3JkaW5nVmlkZW9QYXJ0aWNpcGFudHNGdWxsUm9vbVN1cHBvcnQudmFsdWUsXG4gICAgICByZWNvcmRpbmdQcmVmZXJyZWRPcmllbnRhdGlvbjogdGhpcy5yZWNvcmRpbmdQcmVmZXJyZWRPcmllbnRhdGlvbi52YWx1ZSxcbiAgICAgIHJlY29yZGluZ1N1cHBvcnRGb3JPdGhlck9yaWVudGF0aW9uOiB0aGlzLnJlY29yZGluZ1N1cHBvcnRGb3JPdGhlck9yaWVudGF0aW9uLnZhbHVlLFxuICAgICAgcmVjb3JkaW5nTXVsdGlGb3JtYXRzU3VwcG9ydDogdGhpcy5yZWNvcmRpbmdNdWx0aUZvcm1hdHNTdXBwb3J0LnZhbHVlLFxuXG4gICAgICB1c2VyUmVjb3JkaW5nUGFyYW1zOiB0aGlzLnVzZXJSZWNvcmRpbmdQYXJhbXMudmFsdWUsXG4gICAgICBjYW5SZWNvcmQ6IHRoaXMuY2FuUmVjb3JkLnZhbHVlLFxuICAgICAgc3RhcnRSZXBvcnQ6IHRoaXMuc3RhcnRSZXBvcnQudmFsdWUsXG4gICAgICBlbmRSZXBvcnQ6IHRoaXMuZW5kUmVwb3J0LnZhbHVlLFxuICAgICAgcmVjb3JkU3RhcnRUaW1lOiB0aGlzLnJlY29yZFN0YXJ0VGltZS52YWx1ZSxcbiAgICAgIHJlY29yZEVsYXBzZWRUaW1lOiB0aGlzLnJlY29yZEVsYXBzZWRUaW1lLnZhbHVlLFxuICAgICAgaXNUaW1lclJ1bm5pbmc6IHRoaXMuaXNUaW1lclJ1bm5pbmcudmFsdWUsXG4gICAgICBjYW5QYXVzZVJlc3VtZTogdGhpcy5jYW5QYXVzZVJlc3VtZS52YWx1ZSxcbiAgICAgIHJlY29yZENoYW5nZVNlY29uZHM6IHRoaXMucmVjb3JkQ2hhbmdlU2Vjb25kcy52YWx1ZSxcbiAgICAgIHBhdXNlTGltaXQ6IHRoaXMucGF1c2VMaW1pdC52YWx1ZSxcbiAgICAgIHBhdXNlUmVjb3JkQ291bnQ6IHRoaXMucGF1c2VSZWNvcmRDb3VudC52YWx1ZSxcbiAgICAgIGNhbkxhdW5jaFJlY29yZDogdGhpcy5jYW5MYXVuY2hSZWNvcmQudmFsdWUsXG4gICAgICBzdG9wTGF1bmNoUmVjb3JkOiB0aGlzLnN0b3BMYXVuY2hSZWNvcmQudmFsdWUsXG5cbiAgICAgIHBhcnRpY2lwYW50c0FsbDogdGhpcy5wYXJ0aWNpcGFudHNBbGwudmFsdWUsXG5cbiAgICAgIGZpcnN0QWxsOiB0aGlzLmZpcnN0QWxsLnZhbHVlLFxuICAgICAgdXBkYXRlTWFpbldpbmRvdzogdGhpcy51cGRhdGVNYWluV2luZG93LnZhbHVlLFxuICAgICAgZmlyc3Rfcm91bmQ6IHRoaXMuZmlyc3Rfcm91bmQudmFsdWUsXG4gICAgICBsYW5kU2NhcGVkOiB0aGlzLmxhbmRTY2FwZWQudmFsdWUsXG4gICAgICBsb2NrX3NjcmVlbjogdGhpcy5sb2NrX3NjcmVlbi52YWx1ZSxcbiAgICAgIHNjcmVlbklkOiB0aGlzLnNjcmVlbklkLnZhbHVlLFxuICAgICAgYWxsVmlkZW9TdHJlYW1zOiB0aGlzLmFsbFZpZGVvU3RyZWFtcy52YWx1ZSxcbiAgICAgIG5ld0xpbWl0ZWRTdHJlYW1zOiB0aGlzLm5ld0xpbWl0ZWRTdHJlYW1zLnZhbHVlLFxuICAgICAgbmV3TGltaXRlZFN0cmVhbXNJRHM6IHRoaXMubmV3TGltaXRlZFN0cmVhbXNJRHMudmFsdWUsXG4gICAgICBhY3RpdmVTb3VuZHM6IHRoaXMuYWN0aXZlU291bmRzLnZhbHVlLFxuICAgICAgc2NyZWVuU2hhcmVJRFN0cmVhbTogdGhpcy5zY3JlZW5TaGFyZUlEU3RyZWFtLnZhbHVlLFxuICAgICAgc2NyZWVuU2hhcmVOYW1lU3RyZWFtOiB0aGlzLnNjcmVlblNoYXJlTmFtZVN0cmVhbS52YWx1ZSxcbiAgICAgIGFkbWluSURTdHJlYW06IHRoaXMuYWRtaW5JRFN0cmVhbS52YWx1ZSxcbiAgICAgIGFkbWluTmFtZVN0cmVhbTogdGhpcy5hZG1pbk5hbWVTdHJlYW0udmFsdWUsXG4gICAgICB5b3VZb3VTdHJlYW06IHRoaXMueW91WW91U3RyZWFtLnZhbHVlLFxuICAgICAgeW91WW91U3RyZWFtSURzOiB0aGlzLnlvdVlvdVN0cmVhbUlEcy52YWx1ZSxcbiAgICAgIGxvY2FsU3RyZWFtOiB0aGlzLmxvY2FsU3RyZWFtLnZhbHVlLFxuICAgICAgcmVjb3JkU3RhcnRlZDogdGhpcy5yZWNvcmRTdGFydGVkLnZhbHVlLFxuICAgICAgcmVjb3JkUmVzdW1lZDogdGhpcy5yZWNvcmRSZXN1bWVkLnZhbHVlLFxuICAgICAgcmVjb3JkUGF1c2VkOiB0aGlzLnJlY29yZFBhdXNlZC52YWx1ZSxcbiAgICAgIHJlY29yZFN0b3BwZWQ6IHRoaXMucmVjb3JkU3RvcHBlZC52YWx1ZSxcbiAgICAgIGFkbWluUmVzdHJpY3RTZXR0aW5nOiB0aGlzLmFkbWluUmVzdHJpY3RTZXR0aW5nLnZhbHVlLFxuICAgICAgdmlkZW9SZXF1ZXN0U3RhdGU6IHRoaXMudmlkZW9SZXF1ZXN0U3RhdGUudmFsdWUsXG4gICAgICB2aWRlb1JlcXVlc3RUaW1lOiB0aGlzLnZpZGVvUmVxdWVzdFRpbWUudmFsdWUsXG4gICAgICB2aWRlb0FjdGlvbjogdGhpcy52aWRlb0FjdGlvbi52YWx1ZSxcbiAgICAgIGxvY2FsU3RyZWFtVmlkZW86IHRoaXMubG9jYWxTdHJlYW1WaWRlby52YWx1ZSxcbiAgICAgIHVzZXJEZWZhdWx0VmlkZW9JbnB1dERldmljZTogdGhpcy51c2VyRGVmYXVsdFZpZGVvSW5wdXREZXZpY2UudmFsdWUsXG4gICAgICBjdXJyZW50RmFjaW5nTW9kZTogdGhpcy5jdXJyZW50RmFjaW5nTW9kZS52YWx1ZSxcbiAgICAgIHByZXZGYWNpbmdNb2RlOiB0aGlzLnByZXZGYWNpbmdNb2RlLnZhbHVlLFxuICAgICAgZGVmVmlkZW9JRDogdGhpcy5kZWZWaWRlb0lELnZhbHVlLFxuICAgICAgYWxsb3dlZDogdGhpcy5hbGxvd2VkLnZhbHVlLFxuICAgICAgZGlzcEFjdGl2ZU5hbWVzOiB0aGlzLmRpc3BBY3RpdmVOYW1lcy52YWx1ZSxcbiAgICAgIHBfZGlzcEFjdGl2ZU5hbWVzOiB0aGlzLnBfZGlzcEFjdGl2ZU5hbWVzLnZhbHVlLFxuICAgICAgYWN0aXZlTmFtZXM6IHRoaXMuYWN0aXZlTmFtZXMudmFsdWUsXG4gICAgICBwcmV2QWN0aXZlTmFtZXM6IHRoaXMucHJldkFjdGl2ZU5hbWVzLnZhbHVlLFxuICAgICAgcF9hY3RpdmVOYW1lczogdGhpcy5wX2FjdGl2ZU5hbWVzLnZhbHVlLFxuICAgICAgbWVtYmVyc1JlY2VpdmVkOiB0aGlzLm1lbWJlcnNSZWNlaXZlZC52YWx1ZSxcbiAgICAgIGRlZmVyU2NyZWVuUmVjZWl2ZWQ6IHRoaXMuZGVmZXJTY3JlZW5SZWNlaXZlZC52YWx1ZSxcbiAgICAgIGhvc3RGaXJzdFN3aXRjaDogdGhpcy5ob3N0Rmlyc3RTd2l0Y2gudmFsdWUsXG4gICAgICBtaWNBY3Rpb246IHRoaXMubWljQWN0aW9uLnZhbHVlLFxuICAgICAgc2NyZWVuQWN0aW9uOiB0aGlzLnNjcmVlbkFjdGlvbi52YWx1ZSxcbiAgICAgIGNoYXRBY3Rpb246IHRoaXMuY2hhdEFjdGlvbi52YWx1ZSxcbiAgICAgIGF1ZGlvUmVxdWVzdFN0YXRlOiB0aGlzLmF1ZGlvUmVxdWVzdFN0YXRlLnZhbHVlLFxuICAgICAgc2NyZWVuUmVxdWVzdFN0YXRlOiB0aGlzLnNjcmVlblJlcXVlc3RTdGF0ZS52YWx1ZSxcbiAgICAgIGNoYXRSZXF1ZXN0U3RhdGU6IHRoaXMuY2hhdFJlcXVlc3RTdGF0ZS52YWx1ZSxcbiAgICAgIGF1ZGlvUmVxdWVzdFRpbWU6IHRoaXMuYXVkaW9SZXF1ZXN0VGltZS52YWx1ZSxcbiAgICAgIHNjcmVlblJlcXVlc3RUaW1lOiB0aGlzLnNjcmVlblJlcXVlc3RUaW1lLnZhbHVlLFxuICAgICAgY2hhdFJlcXVlc3RUaW1lOiB0aGlzLmNoYXRSZXF1ZXN0VGltZS52YWx1ZSxcbiAgICAgIHVwZGF0ZVJlcXVlc3RJbnRlcnZhbFNlY29uZHM6IHRoaXMudXBkYXRlUmVxdWVzdEludGVydmFsU2Vjb25kcy52YWx1ZSxcbiAgICAgIG9sZFNvdW5kSWRzOiB0aGlzLm9sZFNvdW5kSWRzLnZhbHVlLFxuICAgICAgaG9zdExhYmVsOiB0aGlzLmhvc3RMYWJlbC52YWx1ZSxcbiAgICAgIG1haW5TY3JlZW5GaWxsZWQ6IHRoaXMubWFpblNjcmVlbkZpbGxlZC52YWx1ZSxcbiAgICAgIGxvY2FsU3RyZWFtU2NyZWVuOiB0aGlzLmxvY2FsU3RyZWFtU2NyZWVuLnZhbHVlLFxuICAgICAgc2NyZWVuQWxyZWFkeU9uOiB0aGlzLnNjcmVlbkFscmVhZHlPbi52YWx1ZSxcbiAgICAgIGNoYXRBbHJlYWR5T246IHRoaXMuY2hhdEFscmVhZHlPbi52YWx1ZSxcbiAgICAgIHJlZGlyZWN0VVJMOiB0aGlzLnJlZGlyZWN0VVJMLnZhbHVlLFxuICAgICAgb2xkQWxsU3RyZWFtczogdGhpcy5vbGRBbGxTdHJlYW1zLnZhbHVlLFxuICAgICAgYWRtaW5WaWRJRDogdGhpcy5hZG1pblZpZElELnZhbHVlLFxuICAgICAgc3RyZWFtTmFtZXM6IHRoaXMuc3RyZWFtTmFtZXMudmFsdWUsXG4gICAgICBub25fYWxWaWRlb1N0cmVhbXM6IHRoaXMubm9uX2FsVmlkZW9TdHJlYW1zLnZhbHVlLFxuICAgICAgc29ydEF1ZGlvTG91ZG5lc3M6IHRoaXMuc29ydEF1ZGlvTG91ZG5lc3MudmFsdWUsXG4gICAgICBhdWRpb0RlY2liZWxzOiB0aGlzLmF1ZGlvRGVjaWJlbHMudmFsdWUsXG4gICAgICBtaXhlZF9hbFZpZGVvU3RyZWFtczogdGhpcy5taXhlZF9hbFZpZGVvU3RyZWFtcy52YWx1ZSxcbiAgICAgIG5vbl9hbFZpZGVvU3RyZWFtc19tdXRlZDogdGhpcy5ub25fYWxWaWRlb1N0cmVhbXNfbXV0ZWQudmFsdWUsXG4gICAgICBwYWdpbmF0ZWRTdHJlYW1zOiB0aGlzLnBhZ2luYXRlZFN0cmVhbXMudmFsdWUsXG4gICAgICBsb2NhbFN0cmVhbUF1ZGlvOiB0aGlzLmxvY2FsU3RyZWFtQXVkaW8udmFsdWUsXG4gICAgICBkZWZBdWRpb0lEOiB0aGlzLmRlZkF1ZGlvSUQudmFsdWUsXG4gICAgICB1c2VyRGVmYXVsdEF1ZGlvSW5wdXREZXZpY2U6IHRoaXMudXNlckRlZmF1bHRBdWRpb0lucHV0RGV2aWNlLnZhbHVlLFxuICAgICAgdXNlckRlZmF1bHRBdWRpb091dHB1dERldmljZTogdGhpcy51c2VyRGVmYXVsdEF1ZGlvT3V0cHV0RGV2aWNlLnZhbHVlLFxuICAgICAgcHJldkF1ZGlvSW5wdXREZXZpY2U6IHRoaXMucHJldkF1ZGlvSW5wdXREZXZpY2UudmFsdWUsXG4gICAgICBwcmV2VmlkZW9JbnB1dERldmljZTogdGhpcy5wcmV2VmlkZW9JbnB1dERldmljZS52YWx1ZSxcbiAgICAgIGF1ZGlvUGF1c2VkOiB0aGlzLmF1ZGlvUGF1c2VkLnZhbHVlLFxuICAgICAgbWFpblNjcmVlblBlcnNvbjogdGhpcy5tYWluU2NyZWVuUGVyc29uLnZhbHVlLFxuICAgICAgYWRtaW5Pbk1haW5TY3JlZW46IHRoaXMuYWRtaW5Pbk1haW5TY3JlZW4udmFsdWUsXG4gICAgICBzY3JlZW5TdGF0ZXM6IHRoaXMuc2NyZWVuU3RhdGVzLnZhbHVlLFxuICAgICAgcHJldlNjcmVlblN0YXRlczogdGhpcy5wcmV2U2NyZWVuU3RhdGVzLnZhbHVlLFxuICAgICAgdXBkYXRlRGF0ZVN0YXRlOiB0aGlzLnVwZGF0ZURhdGVTdGF0ZS52YWx1ZSxcbiAgICAgIGxhc3RVcGRhdGU6IHRoaXMubGFzdFVwZGF0ZS52YWx1ZSxcbiAgICAgIG5Gb3JSZWFkanVzdFJlY29yZDogdGhpcy5uRm9yUmVhZGp1c3RSZWNvcmQudmFsdWUsXG4gICAgICBmaXhlZFBhZ2VMaW1pdDogdGhpcy5maXhlZFBhZ2VMaW1pdC52YWx1ZSxcbiAgICAgIHJlbW92ZUFsdEdyaWQ6IHRoaXMucmVtb3ZlQWx0R3JpZC52YWx1ZSxcbiAgICAgIG5Gb3JSZWFkanVzdDogdGhpcy5uRm9yUmVhZGp1c3QudmFsdWUsXG4gICAgICBsYXN0UmVvcmRlclRpbWU6IHRoaXMubGFzdFJlb3JkZXJUaW1lLnZhbHVlLFxuICAgICAgcmVvcmRlckludGVydmFsOiB0aGlzLnJlb3JkZXJJbnRlcnZhbC52YWx1ZSxcbiAgICAgIGZhc3RSZW9yZGVySW50ZXJ2YWw6IHRoaXMuZmFzdFJlb3JkZXJJbnRlcnZhbC52YWx1ZSxcbiAgICAgIGF1ZFN0cmVhbU5hbWVzOiB0aGlzLmF1ZFN0cmVhbU5hbWVzLnZhbHVlLFxuICAgICAgY3VycmVudFVzZXJQYWdlOiB0aGlzLmN1cnJlbnRVc2VyUGFnZS52YWx1ZSxcbiAgICAgIG1haW5IZWlnaHRXaWR0aDogdGhpcy5tYWluSGVpZ2h0V2lkdGgudmFsdWUsXG4gICAgICBwcmV2TWFpbkhlaWdodFdpZHRoOiB0aGlzLnByZXZNYWluSGVpZ2h0V2lkdGgudmFsdWUsXG4gICAgICBwcmV2RG9QYWdpbmF0ZTogdGhpcy5wcmV2RG9QYWdpbmF0ZS52YWx1ZSxcbiAgICAgIGRvUGFnaW5hdGU6IHRoaXMuZG9QYWdpbmF0ZS52YWx1ZSxcbiAgICAgIHNoYXJlRW5kZWQ6IHRoaXMuc2hhcmVFbmRlZC52YWx1ZSxcbiAgICAgIGxTdHJlYW1zOiB0aGlzLmxTdHJlYW1zLnZhbHVlLFxuICAgICAgY2hhdFJlZlN0cmVhbXM6IHRoaXMuY2hhdFJlZlN0cmVhbXMudmFsdWUsXG4gICAgICBjb250cm9sSGVpZ2h0OiB0aGlzLmNvbnRyb2xIZWlnaHQudmFsdWUsXG4gICAgICBpc1dpZGVTY3JlZW46IHRoaXMuaXNXaWRlU2NyZWVuLnZhbHVlLFxuICAgICAgaXNNZWRpdW1TY3JlZW46IHRoaXMuaXNNZWRpdW1TY3JlZW4udmFsdWUsXG4gICAgICBpc1NtYWxsU2NyZWVuOiB0aGlzLmlzU21hbGxTY3JlZW4udmFsdWUsXG4gICAgICBhZGRHcmlkOiB0aGlzLmFkZEdyaWQudmFsdWUsXG4gICAgICBhZGRBbHRHcmlkOiB0aGlzLmFkZEFsdEdyaWQudmFsdWUsXG4gICAgICBncmlkUm93czogdGhpcy5ncmlkUm93cy52YWx1ZSxcbiAgICAgIGdyaWRDb2xzOiB0aGlzLmdyaWRDb2xzLnZhbHVlLFxuICAgICAgYWx0R3JpZFJvd3M6IHRoaXMuYWx0R3JpZFJvd3MudmFsdWUsXG4gICAgICBhbHRHcmlkQ29sczogdGhpcy5hbHRHcmlkQ29scy52YWx1ZSxcbiAgICAgIG51bWJlclBhZ2VzOiB0aGlzLm51bWJlclBhZ2VzLnZhbHVlLFxuICAgICAgY3VycmVudFN0cmVhbXM6IHRoaXMuY3VycmVudFN0cmVhbXMudmFsdWUsXG4gICAgICBzaG93TWluaVZpZXc6IHRoaXMuc2hvd01pbmlWaWV3LnZhbHVlLFxuICAgICAgblN0cmVhbTogdGhpcy5uU3RyZWFtLnZhbHVlLFxuICAgICAgZGVmZXJfcmVjZWl2ZTogdGhpcy5kZWZlcl9yZWNlaXZlLnZhbHVlLFxuICAgICAgYWxsQXVkaW9TdHJlYW1zOiB0aGlzLmFsbEF1ZGlvU3RyZWFtcy52YWx1ZSxcbiAgICAgIHNjcmVlblByb2R1Y2VyOiB0aGlzLnNjcmVlblByb2R1Y2VyLnZhbHVlLFxuICAgICAgcmVtb3RlU2NyZWVuU3RyZWFtOiB0aGlzLnJlbW90ZVNjcmVlblN0cmVhbS52YWx1ZSxcbiAgICAgIGdvdEFsbFZpZHM6IHRoaXMuZ290QWxsVmlkcy52YWx1ZSxcbiAgICAgIHBhZ2luYXRpb25IZWlnaHRXaWR0aDogdGhpcy5wYWdpbmF0aW9uSGVpZ2h0V2lkdGgudmFsdWUsXG4gICAgICBwYWdpbmF0aW9uRGlyZWN0aW9uOiB0aGlzLnBhZ2luYXRpb25EaXJlY3Rpb24udmFsdWUsXG4gICAgICBncmlkU2l6ZXM6IHRoaXMuZ3JpZFNpemVzLnZhbHVlLFxuICAgICAgc2NyZWVuRm9yY2VGdWxsRGlzcGxheTogdGhpcy5zY3JlZW5Gb3JjZUZ1bGxEaXNwbGF5LnZhbHVlLFxuICAgICAgbWFpbkdyaWRTdHJlYW06IHRoaXMubWFpbkdyaWRTdHJlYW0udmFsdWUsXG4gICAgICBvdGhlckdyaWRTdHJlYW1zOiB0aGlzLm90aGVyR3JpZFN0cmVhbXMudmFsdWUsXG4gICAgICBhdWRpb09ubHlTdHJlYW1zOiB0aGlzLmF1ZGlvT25seVN0cmVhbXMudmFsdWUsXG4gICAgICB2aWRlb0lucHV0czogdGhpcy52aWRlb0lucHV0cy52YWx1ZSxcbiAgICAgIGF1ZGlvSW5wdXRzOiB0aGlzLmF1ZGlvSW5wdXRzLnZhbHVlLFxuICAgICAgbWVldGluZ1Byb2dyZXNzVGltZTogdGhpcy5tZWV0aW5nUHJvZ3Jlc3NUaW1lLnZhbHVlLFxuICAgICAgbWVldGluZ0VsYXBzZWRUaW1lOiB0aGlzLm1lZXRpbmdFbGFwc2VkVGltZS52YWx1ZSxcblxuICAgICAgcmVmX3BhcnRpY2lwYW50czogdGhpcy5yZWZfcGFydGljaXBhbnRzLnZhbHVlLFxuXG4gICAgICBtZXNzYWdlczogdGhpcy5tZXNzYWdlcy52YWx1ZSxcbiAgICAgIHN0YXJ0RGlyZWN0TWVzc2FnZTogdGhpcy5zdGFydERpcmVjdE1lc3NhZ2UudmFsdWUsXG4gICAgICBkaXJlY3RNZXNzYWdlRGV0YWlsczogdGhpcy5kaXJlY3RNZXNzYWdlRGV0YWlscy52YWx1ZSxcbiAgICAgIGNvSG9zdDogdGhpcy5jb0hvc3QudmFsdWUsXG4gICAgICBjb0hvc3RSZXNwb25zaWJpbGl0eTogdGhpcy5jb0hvc3RSZXNwb25zaWJpbGl0eS52YWx1ZSxcblxuICAgICAgLy8gRXZlbnQgc2V0dGluZ3NcbiAgICAgIGF1ZGlvU2V0dGluZzogdGhpcy5hdWRpb1NldHRpbmcudmFsdWUsXG4gICAgICB2aWRlb1NldHRpbmc6IHRoaXMudmlkZW9TZXR0aW5nLnZhbHVlLFxuICAgICAgc2NyZWVuc2hhcmVTZXR0aW5nOiB0aGlzLnNjcmVlbnNoYXJlU2V0dGluZy52YWx1ZSxcbiAgICAgIGNoYXRTZXR0aW5nOiB0aGlzLmNoYXRTZXR0aW5nLnZhbHVlLFxuXG4gICAgICAvLyBEaXNwbGF5IHNldHRpbmdzXG4gICAgICBhdXRvV2F2ZTogdGhpcy5hdXRvV2F2ZS52YWx1ZSxcbiAgICAgIGZvcmNlRnVsbERpc3BsYXk6IHRoaXMuZm9yY2VGdWxsRGlzcGxheS52YWx1ZSxcbiAgICAgIHByZXZGb3JjZUZ1bGxEaXNwbGF5OiB0aGlzLnByZXZGb3JjZUZ1bGxEaXNwbGF5LnZhbHVlLFxuICAgICAgcHJldk1lZXRpbmdEaXNwbGF5VHlwZTogdGhpcy5wcmV2TWVldGluZ0Rpc3BsYXlUeXBlLnZhbHVlLFxuXG4gICAgICAvLyBXYWl0aW5nIHJvb21cbiAgICAgIHdhaXRpbmdSb29tRmlsdGVyOiB0aGlzLndhaXRpbmdSb29tRmlsdGVyLnZhbHVlLFxuICAgICAgd2FpdGluZ1Jvb21MaXN0OiB0aGlzLndhaXRpbmdSb29tTGlzdC52YWx1ZSxcbiAgICAgIHdhaXRpbmdSb29tQ291bnRlcjogdGhpcy53YWl0aW5nUm9vbUNvdW50ZXIudmFsdWUsXG4gICAgICBmaWx0ZXJlZFdhaXRpbmdSb29tTGlzdDogdGhpcy5maWx0ZXJlZFdhaXRpbmdSb29tTGlzdC52YWx1ZSxcblxuICAgICAgLy8gUmVxdWVzdHNcbiAgICAgIHJlcXVlc3RGaWx0ZXI6IHRoaXMucmVxdWVzdEZpbHRlci52YWx1ZSxcbiAgICAgIHJlcXVlc3RMaXN0OiB0aGlzLnJlcXVlc3RMaXN0LnZhbHVlLFxuICAgICAgcmVxdWVzdENvdW50ZXI6IHRoaXMucmVxdWVzdENvdW50ZXIudmFsdWUsXG4gICAgICBmaWx0ZXJlZFJlcXVlc3RMaXN0OiB0aGlzLmZpbHRlcmVkUmVxdWVzdExpc3QudmFsdWUsXG5cbiAgICAgIC8vIFRvdGFsIHJlcXVlc3RzIGFuZCB3YWl0aW5nIHJvb21cbiAgICAgIHRvdGFsUmVxV2FpdDogdGhpcy50b3RhbFJlcVdhaXQudmFsdWUsXG5cbiAgICAgIC8vIEFsZXJ0c1xuICAgICAgYWxlcnRWaXNpYmxlOiB0aGlzLmFsZXJ0VmlzaWJsZS52YWx1ZSxcbiAgICAgIGFsZXJ0TWVzc2FnZTogdGhpcy5hbGVydE1lc3NhZ2UudmFsdWUsXG4gICAgICBhbGVydFR5cGU6IHRoaXMuYWxlcnRUeXBlLnZhbHVlLFxuICAgICAgYWxlcnREdXJhdGlvbjogdGhpcy5hbGVydER1cmF0aW9uLnZhbHVlLFxuXG4gICAgICAvLyBQcm9ncmVzcyBUaW1lclxuICAgICAgcHJvZ3Jlc3NUaW1lclZpc2libGU6IHRoaXMucHJvZ3Jlc3NUaW1lclZpc2libGUudmFsdWUsXG4gICAgICBwcm9ncmVzc1RpbWVyVmFsdWU6IHRoaXMucHJvZ3Jlc3NUaW1lclZhbHVlLnZhbHVlLFxuXG4gICAgICAvLyBNZW51IG1vZGFsc1xuICAgICAgaXNNZW51TW9kYWxWaXNpYmxlOiB0aGlzLmlzTWVudU1vZGFsVmlzaWJsZS52YWx1ZSxcbiAgICAgIGlzUmVjb3JkaW5nTW9kYWxWaXNpYmxlOiB0aGlzLmlzUmVjb3JkaW5nTW9kYWxWaXNpYmxlLnZhbHVlLFxuICAgICAgaXNTZXR0aW5nc01vZGFsVmlzaWJsZTogdGhpcy5pc1NldHRpbmdzTW9kYWxWaXNpYmxlLnZhbHVlLFxuICAgICAgaXNSZXF1ZXN0c01vZGFsVmlzaWJsZTogdGhpcy5pc1JlcXVlc3RzTW9kYWxWaXNpYmxlLnZhbHVlLFxuICAgICAgaXNXYWl0aW5nTW9kYWxWaXNpYmxlOiB0aGlzLmlzV2FpdGluZ01vZGFsVmlzaWJsZS52YWx1ZSxcbiAgICAgIGlzQ29Ib3N0TW9kYWxWaXNpYmxlOiB0aGlzLmlzQ29Ib3N0TW9kYWxWaXNpYmxlLnZhbHVlLFxuICAgICAgaXNNZWRpYVNldHRpbmdzTW9kYWxWaXNpYmxlOiB0aGlzLmlzTWVkaWFTZXR0aW5nc01vZGFsVmlzaWJsZS52YWx1ZSxcbiAgICAgIGlzRGlzcGxheVNldHRpbmdzTW9kYWxWaXNpYmxlOiB0aGlzLmlzRGlzcGxheVNldHRpbmdzTW9kYWxWaXNpYmxlLnZhbHVlLFxuXG4gICAgICAvLyBPdGhlciBNb2RhbHNcbiAgICAgIGlzUGFydGljaXBhbnRzTW9kYWxWaXNpYmxlOiB0aGlzLmlzUGFydGljaXBhbnRzTW9kYWxWaXNpYmxlLnZhbHVlLFxuICAgICAgaXNNZXNzYWdlc01vZGFsVmlzaWJsZTogdGhpcy5pc01lc3NhZ2VzTW9kYWxWaXNpYmxlLnZhbHVlLFxuICAgICAgaXNDb25maXJtRXhpdE1vZGFsVmlzaWJsZTogdGhpcy5pc0NvbmZpcm1FeGl0TW9kYWxWaXNpYmxlLnZhbHVlLFxuICAgICAgaXNDb25maXJtSGVyZU1vZGFsVmlzaWJsZTogdGhpcy5pc0NvbmZpcm1IZXJlTW9kYWxWaXNpYmxlLnZhbHVlLFxuICAgICAgaXNMb2FkaW5nTW9kYWxWaXNpYmxlOiB0aGlzLmlzTG9hZGluZ01vZGFsVmlzaWJsZS52YWx1ZSxcblxuICAgICAgLy8gUmVjb3JkaW5nIE9wdGlvbnNcbiAgICAgIHJlY29yZGluZ01lZGlhT3B0aW9uczogdGhpcy5yZWNvcmRpbmdNZWRpYU9wdGlvbnMudmFsdWUsXG4gICAgICByZWNvcmRpbmdBdWRpb09wdGlvbnM6IHRoaXMucmVjb3JkaW5nQXVkaW9PcHRpb25zLnZhbHVlLFxuICAgICAgcmVjb3JkaW5nVmlkZW9PcHRpb25zOiB0aGlzLnJlY29yZGluZ1ZpZGVvT3B0aW9ucy52YWx1ZSxcbiAgICAgIHJlY29yZGluZ1ZpZGVvVHlwZTogdGhpcy5yZWNvcmRpbmdWaWRlb1R5cGUudmFsdWUsXG4gICAgICByZWNvcmRpbmdWaWRlb09wdGltaXplZDogdGhpcy5yZWNvcmRpbmdWaWRlb09wdGltaXplZC52YWx1ZSxcbiAgICAgIHJlY29yZGluZ0Rpc3BsYXlUeXBlOiB0aGlzLnJlY29yZGluZ0Rpc3BsYXlUeXBlLnZhbHVlLFxuICAgICAgcmVjb3JkaW5nQWRkSExTOiB0aGlzLnJlY29yZGluZ0FkZEhMUy52YWx1ZSxcbiAgICAgIHJlY29yZGluZ0FkZFRleHQ6IHRoaXMucmVjb3JkaW5nQWRkVGV4dC52YWx1ZSxcbiAgICAgIHJlY29yZGluZ0N1c3RvbVRleHQ6IHRoaXMucmVjb3JkaW5nQ3VzdG9tVGV4dC52YWx1ZSxcbiAgICAgIHJlY29yZGluZ0N1c3RvbVRleHRQb3NpdGlvbjogdGhpcy5yZWNvcmRpbmdDdXN0b21UZXh0UG9zaXRpb24udmFsdWUsXG4gICAgICByZWNvcmRpbmdDdXN0b21UZXh0Q29sb3I6IHRoaXMucmVjb3JkaW5nQ3VzdG9tVGV4dENvbG9yLnZhbHVlLFxuICAgICAgcmVjb3JkaW5nTmFtZVRhZ3M6IHRoaXMucmVjb3JkaW5nTmFtZVRhZ3MudmFsdWUsXG4gICAgICByZWNvcmRpbmdCYWNrZ3JvdW5kQ29sb3I6IHRoaXMucmVjb3JkaW5nQmFja2dyb3VuZENvbG9yLnZhbHVlLFxuICAgICAgcmVjb3JkaW5nTmFtZVRhZ3NDb2xvcjogdGhpcy5yZWNvcmRpbmdOYW1lVGFnc0NvbG9yLnZhbHVlLFxuICAgICAgcmVjb3JkaW5nT3JpZW50YXRpb25WaWRlbzogdGhpcy5yZWNvcmRpbmdPcmllbnRhdGlvblZpZGVvLnZhbHVlLFxuICAgICAgY2xlYXJlZFRvUmVzdW1lOiB0aGlzLmNsZWFyZWRUb1Jlc3VtZS52YWx1ZSxcbiAgICAgIGNsZWFyZWRUb1JlY29yZDogdGhpcy5jbGVhcmVkVG9SZWNvcmQudmFsdWUsXG4gICAgICByZWNvcmRTdGF0ZTogdGhpcy5yZWNvcmRTdGF0ZS52YWx1ZSxcbiAgICAgIHNob3dSZWNvcmRCdXR0b25zOiB0aGlzLnNob3dSZWNvcmRCdXR0b25zLnZhbHVlLFxuICAgICAgcmVjb3JkaW5nUHJvZ3Jlc3NUaW1lOiB0aGlzLnJlY29yZGluZ1Byb2dyZXNzVGltZS52YWx1ZSxcbiAgICAgIGF1ZGlvU3dpdGNoaW5nOiB0aGlzLmF1ZGlvU3dpdGNoaW5nLnZhbHVlLFxuICAgICAgdmlkZW9Td2l0Y2hpbmc6IHRoaXMudmlkZW9Td2l0Y2hpbmcudmFsdWUsXG5cbiAgICAgIC8vIE1lZGlhIHN0YXRlc1xuICAgICAgdmlkZW9BbHJlYWR5T246IHRoaXMudmlkZW9BbHJlYWR5T24udmFsdWUsXG4gICAgICBhdWRpb0FscmVhZHlPbjogdGhpcy5hdWRpb0FscmVhZHlPbi52YWx1ZSxcbiAgICAgIGNvbXBvbmVudFNpemVzOiB0aGlzLmNvbXBvbmVudFNpemVzLnZhbHVlLFxuXG4gICAgICAvLyBQZXJtaXNzaW9uc1xuICAgICAgaGFzQ2FtZXJhUGVybWlzc2lvbjogdGhpcy5oYXNDYW1lcmFQZXJtaXNzaW9uLnZhbHVlLFxuICAgICAgaGFzQXVkaW9QZXJtaXNzaW9uOiB0aGlzLmhhc0F1ZGlvUGVybWlzc2lvbi52YWx1ZSxcblxuICAgICAgLy8gVHJhbnNwb3J0c1xuICAgICAgdHJhbnNwb3J0Q3JlYXRlZDogdGhpcy50cmFuc3BvcnRDcmVhdGVkLnZhbHVlLFxuICAgICAgdHJhbnNwb3J0Q3JlYXRlZFZpZGVvOiB0aGlzLnRyYW5zcG9ydENyZWF0ZWRWaWRlby52YWx1ZSxcbiAgICAgIHRyYW5zcG9ydENyZWF0ZWRBdWRpbzogdGhpcy50cmFuc3BvcnRDcmVhdGVkQXVkaW8udmFsdWUsXG4gICAgICB0cmFuc3BvcnRDcmVhdGVkU2NyZWVuOiB0aGlzLnRyYW5zcG9ydENyZWF0ZWRTY3JlZW4udmFsdWUsXG4gICAgICBwcm9kdWNlclRyYW5zcG9ydDogdGhpcy5wcm9kdWNlclRyYW5zcG9ydC52YWx1ZSxcbiAgICAgIHZpZGVvUHJvZHVjZXI6IHRoaXMudmlkZW9Qcm9kdWNlci52YWx1ZSxcbiAgICAgIHBhcmFtczogdGhpcy5wYXJhbXMudmFsdWUsXG4gICAgICB2aWRlb1BhcmFtczogdGhpcy52aWRlb1BhcmFtcy52YWx1ZSxcbiAgICAgIGF1ZGlvUGFyYW1zOiB0aGlzLmF1ZGlvUGFyYW1zLnZhbHVlLFxuICAgICAgYXVkaW9Qcm9kdWNlcjogdGhpcy5hdWRpb1Byb2R1Y2VyLnZhbHVlLFxuICAgICAgY29uc3VtZXJUcmFuc3BvcnRzOiB0aGlzLmNvbnN1bWVyVHJhbnNwb3J0cy52YWx1ZSxcbiAgICAgIGNvbnN1bWluZ1RyYW5zcG9ydHM6IHRoaXMuY29uc3VtaW5nVHJhbnNwb3J0cy52YWx1ZSxcblxuICAgICAgLy8gUG9sbHNcbiAgICAgIHBvbGxzOiB0aGlzLnBvbGxzLnZhbHVlLFxuICAgICAgcG9sbDogdGhpcy5wb2xsLnZhbHVlLFxuICAgICAgaXNQb2xsTW9kYWxWaXNpYmxlOiB0aGlzLmlzUG9sbE1vZGFsVmlzaWJsZS52YWx1ZSxcblxuICAgICAgLy8gQmFja2dyb3VuZFxuICAgICAgY3VzdG9tSW1hZ2U6IHRoaXMuY3VzdG9tSW1hZ2UudmFsdWUsXG4gICAgICBzZWxlY3RlZEltYWdlOiB0aGlzLnNlbGVjdGVkSW1hZ2UudmFsdWUsXG4gICAgICBzZWdtZW50VmlkZW86IHRoaXMuc2VnbWVudFZpZGVvLnZhbHVlLFxuICAgICAgc2VsZmllU2VnbWVudGF0aW9uOiB0aGlzLnNlbGZpZVNlZ21lbnRhdGlvbi52YWx1ZSxcbiAgICAgIHBhdXNlU2VnbWVudGF0aW9uOiB0aGlzLnBhdXNlU2VnbWVudGF0aW9uLnZhbHVlLFxuICAgICAgcHJvY2Vzc2VkU3RyZWFtOiB0aGlzLnByb2Nlc3NlZFN0cmVhbS52YWx1ZSxcbiAgICAgIGtlZXBCYWNrZ3JvdW5kOiB0aGlzLmtlZXBCYWNrZ3JvdW5kLnZhbHVlLFxuICAgICAgYmFja2dyb3VuZEhhc0NoYW5nZWQ6IHRoaXMuYmFja2dyb3VuZEhhc0NoYW5nZWQudmFsdWUsXG4gICAgICB2aXJ0dWFsU3RyZWFtOiB0aGlzLnZpcnR1YWxTdHJlYW0udmFsdWUsXG4gICAgICBtYWluQ2FudmFzOiB0aGlzLm1haW5DYW52YXMudmFsdWUsXG4gICAgICBwcmV2S2VlcEJhY2tncm91bmQ6IHRoaXMucHJldktlZXBCYWNrZ3JvdW5kLnZhbHVlLFxuICAgICAgYXBwbGllZEJhY2tncm91bmQ6IHRoaXMuYXBwbGllZEJhY2tncm91bmQudmFsdWUsXG4gICAgICBpc0JhY2tncm91bmRNb2RhbFZpc2libGU6IHRoaXMuaXNCYWNrZ3JvdW5kTW9kYWxWaXNpYmxlLnZhbHVlLFxuICAgICAgYXV0b0NsaWNrQmFja2dyb3VuZDogdGhpcy5hdXRvQ2xpY2tCYWNrZ3JvdW5kLnZhbHVlLFxuXG4gICAgICAvLyBCcmVha291dCByb29tc1xuICAgICAgYnJlYWtvdXRSb29tczogdGhpcy5icmVha291dFJvb21zLnZhbHVlLFxuICAgICAgY3VycmVudFJvb21JbmRleDogdGhpcy5jdXJyZW50Um9vbUluZGV4LnZhbHVlLFxuICAgICAgY2FuU3RhcnRCcmVha291dDogdGhpcy5jYW5TdGFydEJyZWFrb3V0LnZhbHVlLFxuICAgICAgYnJlYWtPdXRSb29tU3RhcnRlZDogdGhpcy5icmVha091dFJvb21TdGFydGVkLnZhbHVlLFxuICAgICAgYnJlYWtPdXRSb29tRW5kZWQ6IHRoaXMuYnJlYWtPdXRSb29tRW5kZWQudmFsdWUsXG4gICAgICBob3N0TmV3Um9vbTogdGhpcy5ob3N0TmV3Um9vbS52YWx1ZSxcbiAgICAgIGxpbWl0ZWRCcmVha1Jvb206IHRoaXMubGltaXRlZEJyZWFrUm9vbS52YWx1ZSxcbiAgICAgIG1haW5Sb29tc0xlbmd0aDogdGhpcy5tYWluUm9vbXNMZW5ndGgudmFsdWUsXG4gICAgICBtZW1iZXJSb29tOiB0aGlzLm1lbWJlclJvb20udmFsdWUsXG4gICAgICBpc0JyZWFrb3V0Um9vbXNNb2RhbFZpc2libGU6IHRoaXMuaXNCcmVha291dFJvb21zTW9kYWxWaXNpYmxlLnZhbHVlLFxuXG4gICAgICAvLyBXaGl0ZWJvYXJkXG4gICAgICB3aGl0ZWJvYXJkVXNlcnM6IHRoaXMud2hpdGVib2FyZFVzZXJzLnZhbHVlLFxuICAgICAgY3VycmVudFdoaXRlYm9hcmRJbmRleDogdGhpcy5jdXJyZW50V2hpdGVib2FyZEluZGV4LnZhbHVlLFxuICAgICAgY2FuU3RhcnRXaGl0ZWJvYXJkOiB0aGlzLmNhblN0YXJ0V2hpdGVib2FyZC52YWx1ZSxcbiAgICAgIHdoaXRlYm9hcmRTdGFydGVkOiB0aGlzLndoaXRlYm9hcmRTdGFydGVkLnZhbHVlLFxuICAgICAgd2hpdGVib2FyZEVuZGVkOiB0aGlzLndoaXRlYm9hcmRFbmRlZC52YWx1ZSxcbiAgICAgIHdoaXRlYm9hcmRMaW1pdDogdGhpcy53aGl0ZWJvYXJkTGltaXQudmFsdWUsXG4gICAgICBpc1doaXRlYm9hcmRNb2RhbFZpc2libGU6IHRoaXMuaXNXaGl0ZWJvYXJkTW9kYWxWaXNpYmxlLnZhbHVlLFxuICAgICAgaXNDb25maWd1cmVXaGl0ZWJvYXJkTW9kYWxWaXNpYmxlOiB0aGlzLmlzQ29uZmlndXJlV2hpdGVib2FyZE1vZGFsVmlzaWJsZS52YWx1ZSxcbiAgICAgIHNoYXBlczogdGhpcy5zaGFwZXMudmFsdWUsXG4gICAgICB1c2VJbWFnZUJhY2tncm91bmQ6IHRoaXMudXNlSW1hZ2VCYWNrZ3JvdW5kLnZhbHVlLFxuICAgICAgcmVkb1N0YWNrOiB0aGlzLnJlZG9TdGFjay52YWx1ZSxcbiAgICAgIHVuZG9TdGFjazogdGhpcy51bmRvU3RhY2sudmFsdWUsXG4gICAgICBjYW52YXNTdHJlYW06IHRoaXMuY2FudmFzU3RyZWFtLnZhbHVlLFxuICAgICAgY2FudmFzV2hpdGVib2FyZDogdGhpcy5jYW52YXNXaGl0ZWJvYXJkLnZhbHVlLFxuXG4gICAgICAvLyBTY3JlZW5ib2FyZFxuICAgICAgY2FudmFzU2NyZWVuYm9hcmQ6IHRoaXMuY2FudmFzU2NyZWVuYm9hcmQudmFsdWUsXG4gICAgICBwcm9jZXNzZWRTY3JlZW5TdHJlYW06IHRoaXMucHJvY2Vzc2VkU2NyZWVuU3RyZWFtLnZhbHVlLFxuICAgICAgYW5ub3RhdGVTY3JlZW5TdHJlYW06IHRoaXMuYW5ub3RhdGVTY3JlZW5TdHJlYW0udmFsdWUsXG4gICAgICBtYWluU2NyZWVuQ2FudmFzOiB0aGlzLm1haW5TY3JlZW5DYW52YXMudmFsdWUsXG4gICAgICBpc1NjcmVlbmJvYXJkTW9kYWxWaXNpYmxlOiB0aGlzLmlzU2NyZWVuYm9hcmRNb2RhbFZpc2libGUudmFsdWUsXG5cbiAgICAgIHZhbGlkYXRlZDogdGhpcy52YWxpZGF0ZWQudmFsdWUsXG4gICAgICBkZXZpY2U6IHRoaXMuZGV2aWNlLnZhbHVlLFxuICAgICAgc29ja2V0OiB0aGlzLnNvY2tldC52YWx1ZSxcbiAgICAgIGNoZWNrTWVkaWFQZXJtaXNzaW9uOiBmYWxzZSxcbiAgICAgIG9uV2ViOiB0cnVlLFxuXG4gICAgICAvLyBVcGRhdGUgZnVuY3Rpb25zXG4gICAgICB1cGRhdGVSb29tTmFtZTogdGhpcy51cGRhdGVSb29tTmFtZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTWVtYmVyOiB0aGlzLnVwZGF0ZU1lbWJlci5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQWRtaW5QYXNzY29kZTogdGhpcy51cGRhdGVBZG1pblBhc3Njb2RlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVZb3VBcmVDb0hvc3Q6IHRoaXMudXBkYXRlWW91QXJlQ29Ib3N0LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVZb3VBcmVIb3N0OiB0aGlzLnVwZGF0ZVlvdUFyZUhvc3QuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUlzbGV2ZWw6IHRoaXMudXBkYXRlSXNsZXZlbC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQ29Ib3N0OiB0aGlzLnVwZGF0ZUNvSG9zdC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQ29Ib3N0UmVzcG9uc2liaWxpdHk6IHRoaXMudXBkYXRlQ29Ib3N0UmVzcG9uc2liaWxpdHkuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUNvbmZpcm1lZFRvUmVjb3JkOiB0aGlzLnVwZGF0ZUNvbmZpcm1lZFRvUmVjb3JkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVNZWV0aW5nRGlzcGxheVR5cGU6IHRoaXMudXBkYXRlTWVldGluZ0Rpc3BsYXlUeXBlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVNZWV0aW5nVmlkZW9PcHRpbWl6ZWQ6IHRoaXMudXBkYXRlTWVldGluZ1ZpZGVvT3B0aW1pemVkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVFdmVudFR5cGU6IHRoaXMudXBkYXRlRXZlbnRUeXBlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVQYXJ0aWNpcGFudHM6IHRoaXMudXBkYXRlUGFydGljaXBhbnRzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVQYXJ0aWNpcGFudHNDb3VudGVyOiB0aGlzLnVwZGF0ZVBhcnRpY2lwYW50c0NvdW50ZXIuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVBhcnRpY2lwYW50c0ZpbHRlcjogdGhpcy51cGRhdGVQYXJ0aWNpcGFudHNGaWx0ZXIuYmluZCh0aGlzKSxcblxuICAgICAgLy8gTW9yZSB1cGRhdGUgZnVuY3Rpb25zIGZvciBtZWRpYSBkZXRhaWxzXG4gICAgICB1cGRhdGVDb25zdW1lX3NvY2tldHM6IHRoaXMudXBkYXRlQ29uc3VtZV9zb2NrZXRzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSdHBDYXBhYmlsaXRpZXM6IHRoaXMudXBkYXRlUnRwQ2FwYWJpbGl0aWVzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSb29tUmVjdklQczogdGhpcy51cGRhdGVSb29tUmVjdklQcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTWVldGluZ1Jvb21QYXJhbXM6IHRoaXMudXBkYXRlTWVldGluZ1Jvb21QYXJhbXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUl0ZW1QYWdlTGltaXQ6IHRoaXMudXBkYXRlSXRlbVBhZ2VMaW1pdC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQXVkaW9Pbmx5Um9vbTogdGhpcy51cGRhdGVBdWRpb09ubHlSb29tLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVBZGRGb3JCYXNpYzogdGhpcy51cGRhdGVBZGRGb3JCYXNpYy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlU2NyZWVuUGFnZUxpbWl0OiB0aGlzLnVwZGF0ZVNjcmVlblBhZ2VMaW1pdC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlU2hhcmVTY3JlZW5TdGFydGVkOiB0aGlzLnVwZGF0ZVNoYXJlU2NyZWVuU3RhcnRlZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlU2hhcmVkOiB0aGlzLnVwZGF0ZVNoYXJlZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlVGFyZ2V0T3JpZW50YXRpb246IHRoaXMudXBkYXRlVGFyZ2V0T3JpZW50YXRpb24uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVRhcmdldFJlc29sdXRpb246IHRoaXMudXBkYXRlVGFyZ2V0UmVzb2x1dGlvbi5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlVGFyZ2V0UmVzb2x1dGlvbkhvc3Q6IHRoaXMudXBkYXRlVGFyZ2V0UmVzb2x1dGlvbkhvc3QuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVZpZENvbnM6IHRoaXMudXBkYXRlVmlkQ29ucy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlRnJhbWVSYXRlOiB0aGlzLnVwZGF0ZUZyYW1lUmF0ZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlSFBhcmFtczogdGhpcy51cGRhdGVIUGFyYW1zLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVWUGFyYW1zOiB0aGlzLnVwZGF0ZVZQYXJhbXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVNjcmVlblBhcmFtczogdGhpcy51cGRhdGVTY3JlZW5QYXJhbXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUFQYXJhbXM6IHRoaXMudXBkYXRlQVBhcmFtcy5iaW5kKHRoaXMpLFxuXG4gICAgICAvLyBNb3JlIHVwZGF0ZSBmdW5jdGlvbnMgZm9yIHJlY29yZGluZyBkZXRhaWxzXG4gICAgICB1cGRhdGVSZWNvcmRpbmdBdWRpb1BhdXNlc0xpbWl0OiB0aGlzLnVwZGF0ZVJlY29yZGluZ0F1ZGlvUGF1c2VzTGltaXQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ0F1ZGlvUGF1c2VzQ291bnQ6IHRoaXMudXBkYXRlUmVjb3JkaW5nQXVkaW9QYXVzZXNDb3VudC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nQXVkaW9TdXBwb3J0OiB0aGlzLnVwZGF0ZVJlY29yZGluZ0F1ZGlvU3VwcG9ydC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nQXVkaW9QZW9wbGVMaW1pdDogdGhpcy51cGRhdGVSZWNvcmRpbmdBdWRpb1Blb3BsZUxpbWl0LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRpbmdBdWRpb1BhcnRpY2lwYW50c1RpbWVMaW1pdDpcbiAgICAgICAgdGhpcy51cGRhdGVSZWNvcmRpbmdBdWRpb1BhcnRpY2lwYW50c1RpbWVMaW1pdC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nVmlkZW9QYXVzZXNDb3VudDogdGhpcy51cGRhdGVSZWNvcmRpbmdWaWRlb1BhdXNlc0NvdW50LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRpbmdWaWRlb1BhdXNlc0xpbWl0OiB0aGlzLnVwZGF0ZVJlY29yZGluZ1ZpZGVvUGF1c2VzTGltaXQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ1ZpZGVvU3VwcG9ydDogdGhpcy51cGRhdGVSZWNvcmRpbmdWaWRlb1N1cHBvcnQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ1ZpZGVvUGVvcGxlTGltaXQ6IHRoaXMudXBkYXRlUmVjb3JkaW5nVmlkZW9QZW9wbGVMaW1pdC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nVmlkZW9QYXJ0aWNpcGFudHNUaW1lTGltaXQ6XG4gICAgICAgIHRoaXMudXBkYXRlUmVjb3JkaW5nVmlkZW9QYXJ0aWNpcGFudHNUaW1lTGltaXQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ0FsbFBhcnRpY2lwYW50c1N1cHBvcnQ6IHRoaXMudXBkYXRlUmVjb3JkaW5nQWxsUGFydGljaXBhbnRzU3VwcG9ydC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nVmlkZW9QYXJ0aWNpcGFudHNTdXBwb3J0OlxuICAgICAgICB0aGlzLnVwZGF0ZVJlY29yZGluZ1ZpZGVvUGFydGljaXBhbnRzU3VwcG9ydC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nQWxsUGFydGljaXBhbnRzRnVsbFJvb21TdXBwb3J0OlxuICAgICAgICB0aGlzLnVwZGF0ZVJlY29yZGluZ0FsbFBhcnRpY2lwYW50c0Z1bGxSb29tU3VwcG9ydC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nVmlkZW9QYXJ0aWNpcGFudHNGdWxsUm9vbVN1cHBvcnQ6XG4gICAgICAgIHRoaXMudXBkYXRlUmVjb3JkaW5nVmlkZW9QYXJ0aWNpcGFudHNGdWxsUm9vbVN1cHBvcnQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ1ByZWZlcnJlZE9yaWVudGF0aW9uOiB0aGlzLnVwZGF0ZVJlY29yZGluZ1ByZWZlcnJlZE9yaWVudGF0aW9uLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRpbmdTdXBwb3J0Rm9yT3RoZXJPcmllbnRhdGlvbjpcbiAgICAgICAgdGhpcy51cGRhdGVSZWNvcmRpbmdTdXBwb3J0Rm9yT3RoZXJPcmllbnRhdGlvbi5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nTXVsdGlGb3JtYXRzU3VwcG9ydDogdGhpcy51cGRhdGVSZWNvcmRpbmdNdWx0aUZvcm1hdHNTdXBwb3J0LmJpbmQodGhpcyksXG5cbiAgICAgIHVwZGF0ZVVzZXJSZWNvcmRpbmdQYXJhbXM6IHRoaXMudXBkYXRlVXNlclJlY29yZGluZ1BhcmFtcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQ2FuUmVjb3JkOiB0aGlzLnVwZGF0ZUNhblJlY29yZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlU3RhcnRSZXBvcnQ6IHRoaXMudXBkYXRlU3RhcnRSZXBvcnQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUVuZFJlcG9ydDogdGhpcy51cGRhdGVFbmRSZXBvcnQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZFRpbWVySW50ZXJ2YWw6IHRoaXMudXBkYXRlUmVjb3JkVGltZXJJbnRlcnZhbC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkU3RhcnRUaW1lOiB0aGlzLnVwZGF0ZVJlY29yZFN0YXJ0VGltZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkRWxhcHNlZFRpbWU6IHRoaXMudXBkYXRlUmVjb3JkRWxhcHNlZFRpbWUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUlzVGltZXJSdW5uaW5nOiB0aGlzLnVwZGF0ZUlzVGltZXJSdW5uaW5nLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVDYW5QYXVzZVJlc3VtZTogdGhpcy51cGRhdGVDYW5QYXVzZVJlc3VtZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkQ2hhbmdlU2Vjb25kczogdGhpcy51cGRhdGVSZWNvcmRDaGFuZ2VTZWNvbmRzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVQYXVzZUxpbWl0OiB0aGlzLnVwZGF0ZVBhdXNlTGltaXQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVBhdXNlUmVjb3JkQ291bnQ6IHRoaXMudXBkYXRlUGF1c2VSZWNvcmRDb3VudC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQ2FuTGF1bmNoUmVjb3JkOiB0aGlzLnVwZGF0ZUNhbkxhdW5jaFJlY29yZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlU3RvcExhdW5jaFJlY29yZDogdGhpcy51cGRhdGVTdG9wTGF1bmNoUmVjb3JkLmJpbmQodGhpcyksXG5cbiAgICAgIHVwZGF0ZVBhcnRpY2lwYW50c0FsbDogdGhpcy51cGRhdGVQYXJ0aWNpcGFudHNBbGwuYmluZCh0aGlzKSxcblxuICAgICAgdXBkYXRlRmlyc3RBbGw6IHRoaXMudXBkYXRlRmlyc3RBbGwuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVVwZGF0ZU1haW5XaW5kb3c6IHRoaXMudXBkYXRlVXBkYXRlTWFpbldpbmRvdy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlRmlyc3Rfcm91bmQ6IHRoaXMudXBkYXRlRmlyc3Rfcm91bmQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUxhbmRTY2FwZWQ6IHRoaXMudXBkYXRlTGFuZFNjYXBlZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTG9ja19zY3JlZW46IHRoaXMudXBkYXRlTG9ja19zY3JlZW4uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVNjcmVlbklkOiB0aGlzLnVwZGF0ZVNjcmVlbklkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVBbGxWaWRlb1N0cmVhbXM6IHRoaXMudXBkYXRlQWxsVmlkZW9TdHJlYW1zLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVOZXdMaW1pdGVkU3RyZWFtczogdGhpcy51cGRhdGVOZXdMaW1pdGVkU3RyZWFtcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTmV3TGltaXRlZFN0cmVhbXNJRHM6IHRoaXMudXBkYXRlTmV3TGltaXRlZFN0cmVhbXNJRHMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUFjdGl2ZVNvdW5kczogdGhpcy51cGRhdGVBY3RpdmVTb3VuZHMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVNjcmVlblNoYXJlSURTdHJlYW06IHRoaXMudXBkYXRlU2NyZWVuU2hhcmVJRFN0cmVhbS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlU2NyZWVuU2hhcmVOYW1lU3RyZWFtOiB0aGlzLnVwZGF0ZVNjcmVlblNoYXJlTmFtZVN0cmVhbS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQWRtaW5JRFN0cmVhbTogdGhpcy51cGRhdGVBZG1pbklEU3RyZWFtLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVBZG1pbk5hbWVTdHJlYW06IHRoaXMudXBkYXRlQWRtaW5OYW1lU3RyZWFtLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVZb3VZb3VTdHJlYW06IHRoaXMudXBkYXRlWW91WW91U3RyZWFtLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVZb3VZb3VTdHJlYW1JRHM6IHRoaXMudXBkYXRlWW91WW91U3RyZWFtSURzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVMb2NhbFN0cmVhbTogdGhpcy51cGRhdGVMb2NhbFN0cmVhbS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkU3RhcnRlZDogdGhpcy51cGRhdGVSZWNvcmRTdGFydGVkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRSZXN1bWVkOiB0aGlzLnVwZGF0ZVJlY29yZFJlc3VtZWQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZFBhdXNlZDogdGhpcy51cGRhdGVSZWNvcmRQYXVzZWQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZFN0b3BwZWQ6IHRoaXMudXBkYXRlUmVjb3JkU3RvcHBlZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQWRtaW5SZXN0cmljdFNldHRpbmc6IHRoaXMudXBkYXRlQWRtaW5SZXN0cmljdFNldHRpbmcuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVZpZGVvUmVxdWVzdFN0YXRlOiB0aGlzLnVwZGF0ZVZpZGVvUmVxdWVzdFN0YXRlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVWaWRlb1JlcXVlc3RUaW1lOiB0aGlzLnVwZGF0ZVZpZGVvUmVxdWVzdFRpbWUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVZpZGVvQWN0aW9uOiB0aGlzLnVwZGF0ZVZpZGVvQWN0aW9uLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVMb2NhbFN0cmVhbVZpZGVvOiB0aGlzLnVwZGF0ZUxvY2FsU3RyZWFtVmlkZW8uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVVzZXJEZWZhdWx0VmlkZW9JbnB1dERldmljZTogdGhpcy51cGRhdGVVc2VyRGVmYXVsdFZpZGVvSW5wdXREZXZpY2UuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUN1cnJlbnRGYWNpbmdNb2RlOiB0aGlzLnVwZGF0ZUN1cnJlbnRGYWNpbmdNb2RlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVQcmV2RmFjaW5nTW9kZTogdGhpcy51cGRhdGVQcmV2RmFjaW5nTW9kZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlRGVmVmlkZW9JRDogdGhpcy51cGRhdGVEZWZWaWRlb0lELmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVBbGxvd2VkOiB0aGlzLnVwZGF0ZUFsbG93ZWQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZURpc3BBY3RpdmVOYW1lczogdGhpcy51cGRhdGVEaXNwQWN0aXZlTmFtZXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVBfZGlzcEFjdGl2ZU5hbWVzOiB0aGlzLnVwZGF0ZVBfZGlzcEFjdGl2ZU5hbWVzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVBY3RpdmVOYW1lczogdGhpcy51cGRhdGVBY3RpdmVOYW1lcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUHJldkFjdGl2ZU5hbWVzOiB0aGlzLnVwZGF0ZVByZXZBY3RpdmVOYW1lcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUF9hY3RpdmVOYW1lczogdGhpcy51cGRhdGVQX2FjdGl2ZU5hbWVzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVNZW1iZXJzUmVjZWl2ZWQ6IHRoaXMudXBkYXRlTWVtYmVyc1JlY2VpdmVkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVEZWZlclNjcmVlblJlY2VpdmVkOiB0aGlzLnVwZGF0ZURlZmVyU2NyZWVuUmVjZWl2ZWQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUhvc3RGaXJzdFN3aXRjaDogdGhpcy51cGRhdGVIb3N0Rmlyc3RTd2l0Y2guYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZU1pY0FjdGlvbjogdGhpcy51cGRhdGVNaWNBY3Rpb24uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVNjcmVlbkFjdGlvbjogdGhpcy51cGRhdGVTY3JlZW5BY3Rpb24uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUNoYXRBY3Rpb246IHRoaXMudXBkYXRlQ2hhdEFjdGlvbi5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQXVkaW9SZXF1ZXN0U3RhdGU6IHRoaXMudXBkYXRlQXVkaW9SZXF1ZXN0U3RhdGUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVNjcmVlblJlcXVlc3RTdGF0ZTogdGhpcy51cGRhdGVTY3JlZW5SZXF1ZXN0U3RhdGUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUNoYXRSZXF1ZXN0U3RhdGU6IHRoaXMudXBkYXRlQ2hhdFJlcXVlc3RTdGF0ZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQXVkaW9SZXF1ZXN0VGltZTogdGhpcy51cGRhdGVBdWRpb1JlcXVlc3RUaW1lLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVTY3JlZW5SZXF1ZXN0VGltZTogdGhpcy51cGRhdGVTY3JlZW5SZXF1ZXN0VGltZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQ2hhdFJlcXVlc3RUaW1lOiB0aGlzLnVwZGF0ZUNoYXRSZXF1ZXN0VGltZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlT2xkU291bmRJZHM6IHRoaXMudXBkYXRlT2xkU291bmRJZHMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUhvc3RMYWJlbDogdGhpcy51cGRhdGVIb3N0TGFiZWwuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZU1haW5TY3JlZW5GaWxsZWQ6IHRoaXMudXBkYXRlTWFpblNjcmVlbkZpbGxlZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTG9jYWxTdHJlYW1TY3JlZW46IHRoaXMudXBkYXRlTG9jYWxTdHJlYW1TY3JlZW4uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVNjcmVlbkFscmVhZHlPbjogdGhpcy51cGRhdGVTY3JlZW5BbHJlYWR5T24uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUNoYXRBbHJlYWR5T246IHRoaXMudXBkYXRlQ2hhdEFscmVhZHlPbi5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVkaXJlY3RVUkw6IHRoaXMudXBkYXRlUmVkaXJlY3RVUkwuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZU9sZEFsbFN0cmVhbXM6IHRoaXMudXBkYXRlT2xkQWxsU3RyZWFtcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQWRtaW5WaWRJRDogdGhpcy51cGRhdGVBZG1pblZpZElELmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVTdHJlYW1OYW1lczogdGhpcy51cGRhdGVTdHJlYW1OYW1lcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTm9uX2FsVmlkZW9TdHJlYW1zOiB0aGlzLnVwZGF0ZU5vbl9hbFZpZGVvU3RyZWFtcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlU29ydEF1ZGlvTG91ZG5lc3M6IHRoaXMudXBkYXRlU29ydEF1ZGlvTG91ZG5lc3MuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUF1ZGlvRGVjaWJlbHM6IHRoaXMudXBkYXRlQXVkaW9EZWNpYmVscy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTWl4ZWRfYWxWaWRlb1N0cmVhbXM6IHRoaXMudXBkYXRlTWl4ZWRfYWxWaWRlb1N0cmVhbXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZU5vbl9hbFZpZGVvU3RyZWFtc19tdXRlZDogdGhpcy51cGRhdGVOb25fYWxWaWRlb1N0cmVhbXNfbXV0ZWQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVBhZ2luYXRlZFN0cmVhbXM6IHRoaXMudXBkYXRlUGFnaW5hdGVkU3RyZWFtcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTG9jYWxTdHJlYW1BdWRpbzogdGhpcy51cGRhdGVMb2NhbFN0cmVhbUF1ZGlvLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVEZWZBdWRpb0lEOiB0aGlzLnVwZGF0ZURlZkF1ZGlvSUQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVVzZXJEZWZhdWx0QXVkaW9JbnB1dERldmljZTogdGhpcy51cGRhdGVVc2VyRGVmYXVsdEF1ZGlvSW5wdXREZXZpY2UuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVVzZXJEZWZhdWx0QXVkaW9PdXRwdXREZXZpY2U6IHRoaXMudXBkYXRlVXNlckRlZmF1bHRBdWRpb091dHB1dERldmljZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUHJldkF1ZGlvSW5wdXREZXZpY2U6IHRoaXMudXBkYXRlUHJldkF1ZGlvSW5wdXREZXZpY2UuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVByZXZWaWRlb0lucHV0RGV2aWNlOiB0aGlzLnVwZGF0ZVByZXZWaWRlb0lucHV0RGV2aWNlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVBdWRpb1BhdXNlZDogdGhpcy51cGRhdGVBdWRpb1BhdXNlZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTWFpblNjcmVlblBlcnNvbjogdGhpcy51cGRhdGVNYWluU2NyZWVuUGVyc29uLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVBZG1pbk9uTWFpblNjcmVlbjogdGhpcy51cGRhdGVBZG1pbk9uTWFpblNjcmVlbi5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlU2NyZWVuU3RhdGVzOiB0aGlzLnVwZGF0ZVNjcmVlblN0YXRlcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUHJldlNjcmVlblN0YXRlczogdGhpcy51cGRhdGVQcmV2U2NyZWVuU3RhdGVzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVVcGRhdGVEYXRlU3RhdGU6IHRoaXMudXBkYXRlVXBkYXRlRGF0ZVN0YXRlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVMYXN0VXBkYXRlOiB0aGlzLnVwZGF0ZUxhc3RVcGRhdGUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZU5Gb3JSZWFkanVzdFJlY29yZDogdGhpcy51cGRhdGVORm9yUmVhZGp1c3RSZWNvcmQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUZpeGVkUGFnZUxpbWl0OiB0aGlzLnVwZGF0ZUZpeGVkUGFnZUxpbWl0LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZW1vdmVBbHRHcmlkOiB0aGlzLnVwZGF0ZVJlbW92ZUFsdEdyaWQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZU5Gb3JSZWFkanVzdDogdGhpcy51cGRhdGVORm9yUmVhZGp1c3QuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUxhc3RSZW9yZGVyVGltZTogdGhpcy51cGRhdGVMYXN0UmVvcmRlclRpbWUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUF1ZFN0cmVhbU5hbWVzOiB0aGlzLnVwZGF0ZUF1ZFN0cmVhbU5hbWVzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVDdXJyZW50VXNlclBhZ2U6IHRoaXMudXBkYXRlQ3VycmVudFVzZXJQYWdlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVNYWluSGVpZ2h0V2lkdGg6IHRoaXMudXBkYXRlTWFpbkhlaWdodFdpZHRoLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVQcmV2TWFpbkhlaWdodFdpZHRoOiB0aGlzLnVwZGF0ZVByZXZNYWluSGVpZ2h0V2lkdGguYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVByZXZEb1BhZ2luYXRlOiB0aGlzLnVwZGF0ZVByZXZEb1BhZ2luYXRlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVEb1BhZ2luYXRlOiB0aGlzLnVwZGF0ZURvUGFnaW5hdGUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVNoYXJlRW5kZWQ6IHRoaXMudXBkYXRlU2hhcmVFbmRlZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTFN0cmVhbXM6IHRoaXMudXBkYXRlTFN0cmVhbXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUNoYXRSZWZTdHJlYW1zOiB0aGlzLnVwZGF0ZUNoYXRSZWZTdHJlYW1zLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVDb250cm9sSGVpZ2h0OiB0aGlzLnVwZGF0ZUNvbnRyb2xIZWlnaHQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUlzV2lkZVNjcmVlbjogdGhpcy51cGRhdGVJc1dpZGVTY3JlZW4uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUlzTWVkaXVtU2NyZWVuOiB0aGlzLnVwZGF0ZUlzTWVkaXVtU2NyZWVuLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVJc1NtYWxsU2NyZWVuOiB0aGlzLnVwZGF0ZUlzU21hbGxTY3JlZW4uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUFkZEdyaWQ6IHRoaXMudXBkYXRlQWRkR3JpZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQWRkQWx0R3JpZDogdGhpcy51cGRhdGVBZGRBbHRHcmlkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVHcmlkUm93czogdGhpcy51cGRhdGVHcmlkUm93cy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlR3JpZENvbHM6IHRoaXMudXBkYXRlR3JpZENvbHMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUFsdEdyaWRSb3dzOiB0aGlzLnVwZGF0ZUFsdEdyaWRSb3dzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVBbHRHcmlkQ29sczogdGhpcy51cGRhdGVBbHRHcmlkQ29scy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTnVtYmVyUGFnZXM6IHRoaXMudXBkYXRlTnVtYmVyUGFnZXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUN1cnJlbnRTdHJlYW1zOiB0aGlzLnVwZGF0ZUN1cnJlbnRTdHJlYW1zLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVTaG93TWluaVZpZXc6IHRoaXMudXBkYXRlU2hvd01pbmlWaWV3LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVOU3RyZWFtOiB0aGlzLnVwZGF0ZU5TdHJlYW0uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZURlZmVyX3JlY2VpdmU6IHRoaXMudXBkYXRlRGVmZXJfcmVjZWl2ZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQWxsQXVkaW9TdHJlYW1zOiB0aGlzLnVwZGF0ZUFsbEF1ZGlvU3RyZWFtcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVtb3RlU2NyZWVuU3RyZWFtOiB0aGlzLnVwZGF0ZVJlbW90ZVNjcmVlblN0cmVhbS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlU2NyZWVuUHJvZHVjZXI6IHRoaXMudXBkYXRlU2NyZWVuUHJvZHVjZXIuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUdvdEFsbFZpZHM6IHRoaXMudXBkYXRlR290QWxsVmlkcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUGFnaW5hdGlvbkhlaWdodFdpZHRoOiB0aGlzLnVwZGF0ZVBhZ2luYXRpb25IZWlnaHRXaWR0aC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUGFnaW5hdGlvbkRpcmVjdGlvbjogdGhpcy51cGRhdGVQYWdpbmF0aW9uRGlyZWN0aW9uLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVHcmlkU2l6ZXM6IHRoaXMudXBkYXRlR3JpZFNpemVzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVTY3JlZW5Gb3JjZUZ1bGxEaXNwbGF5OiB0aGlzLnVwZGF0ZVNjcmVlbkZvcmNlRnVsbERpc3BsYXkuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZU1haW5HcmlkU3RyZWFtOiB0aGlzLnVwZGF0ZU1haW5HcmlkU3RyZWFtLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVPdGhlckdyaWRTdHJlYW1zOiB0aGlzLnVwZGF0ZU90aGVyR3JpZFN0cmVhbXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUF1ZGlvT25seVN0cmVhbXM6IHRoaXMudXBkYXRlQXVkaW9Pbmx5U3RyZWFtcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlVmlkZW9JbnB1dHM6IHRoaXMudXBkYXRlVmlkZW9JbnB1dHMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUF1ZGlvSW5wdXRzOiB0aGlzLnVwZGF0ZUF1ZGlvSW5wdXRzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVNZWV0aW5nUHJvZ3Jlc3NUaW1lOiB0aGlzLnVwZGF0ZU1lZXRpbmdQcm9ncmVzc1RpbWUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZU1lZXRpbmdFbGFwc2VkVGltZTogdGhpcy51cGRhdGVNZWV0aW5nRWxhcHNlZFRpbWUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlZl9wYXJ0aWNpcGFudHM6IHRoaXMudXBkYXRlUmVmX3BhcnRpY2lwYW50cy5iaW5kKHRoaXMpLFxuXG4gICAgICB1cGRhdGVNZXNzYWdlczogdGhpcy51cGRhdGVNZXNzYWdlcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlU3RhcnREaXJlY3RNZXNzYWdlOiB0aGlzLnVwZGF0ZVN0YXJ0RGlyZWN0TWVzc2FnZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlRGlyZWN0TWVzc2FnZURldGFpbHM6IHRoaXMudXBkYXRlRGlyZWN0TWVzc2FnZURldGFpbHMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVNob3dNZXNzYWdlc0JhZGdlOiB0aGlzLnVwZGF0ZVNob3dNZXNzYWdlc0JhZGdlLmJpbmQodGhpcyksXG5cbiAgICAgIC8vIEV2ZW50IHNldHRpbmdzXG4gICAgICB1cGRhdGVBdWRpb1NldHRpbmc6IHRoaXMudXBkYXRlQXVkaW9TZXR0aW5nLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVWaWRlb1NldHRpbmc6IHRoaXMudXBkYXRlVmlkZW9TZXR0aW5nLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVTY3JlZW5zaGFyZVNldHRpbmc6IHRoaXMudXBkYXRlU2NyZWVuc2hhcmVTZXR0aW5nLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVDaGF0U2V0dGluZzogdGhpcy51cGRhdGVDaGF0U2V0dGluZy5iaW5kKHRoaXMpLFxuXG4gICAgICAvLyBEaXNwbGF5IHNldHRpbmdzXG4gICAgICB1cGRhdGVBdXRvV2F2ZTogdGhpcy51cGRhdGVBdXRvV2F2ZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlRm9yY2VGdWxsRGlzcGxheTogdGhpcy51cGRhdGVGb3JjZUZ1bGxEaXNwbGF5LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVQcmV2Rm9yY2VGdWxsRGlzcGxheTogdGhpcy51cGRhdGVQcmV2Rm9yY2VGdWxsRGlzcGxheS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUHJldk1lZXRpbmdEaXNwbGF5VHlwZTogdGhpcy51cGRhdGVQcmV2TWVldGluZ0Rpc3BsYXlUeXBlLmJpbmQodGhpcyksXG5cbiAgICAgIC8vIFdhaXRpbmcgcm9vbVxuICAgICAgdXBkYXRlV2FpdGluZ1Jvb21GaWx0ZXI6IHRoaXMudXBkYXRlV2FpdGluZ1Jvb21GaWx0ZXIuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVdhaXRpbmdSb29tTGlzdDogdGhpcy51cGRhdGVXYWl0aW5nUm9vbUxpc3QuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVdhaXRpbmdSb29tQ291bnRlcjogdGhpcy51cGRhdGVXYWl0aW5nUm9vbUNvdW50ZXIuYmluZCh0aGlzKSxcblxuICAgICAgLy8gUmVxdWVzdHNcbiAgICAgIHVwZGF0ZVJlcXVlc3RGaWx0ZXI6IHRoaXMudXBkYXRlUmVxdWVzdEZpbHRlci5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVxdWVzdExpc3Q6IHRoaXMudXBkYXRlUmVxdWVzdExpc3QuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlcXVlc3RDb3VudGVyOiB0aGlzLnVwZGF0ZVJlcXVlc3RDb3VudGVyLmJpbmQodGhpcyksXG5cbiAgICAgIC8vIFRvdGFsIHJlcXVlc3RzIGFuZCB3YWl0aW5nIHJvb21cbiAgICAgIHVwZGF0ZVRvdGFsUmVxV2FpdDogdGhpcy51cGRhdGVUb3RhbFJlcVdhaXQuYmluZCh0aGlzKSxcblxuICAgICAgLy8gTWVudSBtb2RhbHNcbiAgICAgIHVwZGF0ZUlzTWVudU1vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc01lbnVNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUlzUmVjb3JkaW5nTW9kYWxWaXNpYmxlOiB0aGlzLnVwZGF0ZUlzUmVjb3JkaW5nTW9kYWxWaXNpYmxlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVJc1NldHRpbmdzTW9kYWxWaXNpYmxlOiB0aGlzLnVwZGF0ZUlzU2V0dGluZ3NNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUlzUmVxdWVzdHNNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNSZXF1ZXN0c01vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlSXNXYWl0aW5nTW9kYWxWaXNpYmxlOiB0aGlzLnVwZGF0ZUlzV2FpdGluZ01vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlSXNDb0hvc3RNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNDb0hvc3RNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUlzTWVkaWFTZXR0aW5nc01vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc01lZGlhU2V0dGluZ3NNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUlzRGlzcGxheVNldHRpbmdzTW9kYWxWaXNpYmxlOiB0aGlzLnVwZGF0ZUlzRGlzcGxheVNldHRpbmdzTW9kYWxWaXNpYmxlLmJpbmQodGhpcyksXG5cbiAgICAgIC8vIE90aGVyIG1vZGFsc1xuICAgICAgdXBkYXRlSXNQYXJ0aWNpcGFudHNNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNQYXJ0aWNpcGFudHNNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUlzTWVzc2FnZXNNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNNZXNzYWdlc01vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlSXNDb25maXJtRXhpdE1vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc0NvbmZpcm1FeGl0TW9kYWxWaXNpYmxlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVJc0NvbmZpcm1IZXJlTW9kYWxWaXNpYmxlOiB0aGlzLnVwZGF0ZUlzQ29uZmlybUhlcmVNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUlzTG9hZGluZ01vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc0xvYWRpbmdNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcblxuICAgICAgLy8gUmVjb3JkaW5nIE9wdGlvbnNcbiAgICAgIHVwZGF0ZVJlY29yZGluZ01lZGlhT3B0aW9uczogdGhpcy51cGRhdGVSZWNvcmRpbmdNZWRpYU9wdGlvbnMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ0F1ZGlvT3B0aW9uczogdGhpcy51cGRhdGVSZWNvcmRpbmdBdWRpb09wdGlvbnMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ1ZpZGVvT3B0aW9uczogdGhpcy51cGRhdGVSZWNvcmRpbmdWaWRlb09wdGlvbnMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ1ZpZGVvVHlwZTogdGhpcy51cGRhdGVSZWNvcmRpbmdWaWRlb1R5cGUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ1ZpZGVvT3B0aW1pemVkOiB0aGlzLnVwZGF0ZVJlY29yZGluZ1ZpZGVvT3B0aW1pemVkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRpbmdEaXNwbGF5VHlwZTogdGhpcy51cGRhdGVSZWNvcmRpbmdEaXNwbGF5VHlwZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nQWRkSExTOiB0aGlzLnVwZGF0ZVJlY29yZGluZ0FkZEhMUy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nQWRkVGV4dDogdGhpcy51cGRhdGVSZWNvcmRpbmdBZGRUZXh0LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRpbmdDdXN0b21UZXh0OiB0aGlzLnVwZGF0ZVJlY29yZGluZ0N1c3RvbVRleHQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ0N1c3RvbVRleHRQb3NpdGlvbjogdGhpcy51cGRhdGVSZWNvcmRpbmdDdXN0b21UZXh0UG9zaXRpb24uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ0N1c3RvbVRleHRDb2xvcjogdGhpcy51cGRhdGVSZWNvcmRpbmdDdXN0b21UZXh0Q29sb3IuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ05hbWVUYWdzOiB0aGlzLnVwZGF0ZVJlY29yZGluZ05hbWVUYWdzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRpbmdCYWNrZ3JvdW5kQ29sb3I6IHRoaXMudXBkYXRlUmVjb3JkaW5nQmFja2dyb3VuZENvbG9yLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRpbmdOYW1lVGFnc0NvbG9yOiB0aGlzLnVwZGF0ZVJlY29yZGluZ05hbWVUYWdzQ29sb3IuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ09yaWVudGF0aW9uVmlkZW86IHRoaXMudXBkYXRlUmVjb3JkaW5nT3JpZW50YXRpb25WaWRlby5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQ2xlYXJlZFRvUmVzdW1lOiB0aGlzLnVwZGF0ZUNsZWFyZWRUb1Jlc3VtZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQ2xlYXJlZFRvUmVjb3JkOiB0aGlzLnVwZGF0ZUNsZWFyZWRUb1JlY29yZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkU3RhdGU6IHRoaXMudXBkYXRlUmVjb3JkU3RhdGUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVNob3dSZWNvcmRCdXR0b25zOiB0aGlzLnVwZGF0ZVNob3dSZWNvcmRCdXR0b25zLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRpbmdQcm9ncmVzc1RpbWU6IHRoaXMudXBkYXRlUmVjb3JkaW5nUHJvZ3Jlc3NUaW1lLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVBdWRpb1N3aXRjaGluZzogdGhpcy51cGRhdGVBdWRpb1N3aXRjaGluZy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlVmlkZW9Td2l0Y2hpbmc6IHRoaXMudXBkYXRlVmlkZW9Td2l0Y2hpbmcuYmluZCh0aGlzKSxcblxuICAgICAgLy8gTWVkaWEgc3RhdGVzXG4gICAgICB1cGRhdGVWaWRlb0FscmVhZHlPbjogdGhpcy51cGRhdGVWaWRlb0FscmVhZHlPbi5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQXVkaW9BbHJlYWR5T246IHRoaXMudXBkYXRlQXVkaW9BbHJlYWR5T24uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUNvbXBvbmVudFNpemVzOiB0aGlzLnVwZGF0ZUNvbXBvbmVudFNpemVzLmJpbmQodGhpcyksXG5cbiAgICAgIC8vIFBlcm1pc3Npb25zXG4gICAgICB1cGRhdGVIYXNDYW1lcmFQZXJtaXNzaW9uOiB0aGlzLnVwZGF0ZUhhc0NhbWVyYVBlcm1pc3Npb24uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUhhc0F1ZGlvUGVybWlzc2lvbjogdGhpcy51cGRhdGVIYXNBdWRpb1Blcm1pc3Npb24uYmluZCh0aGlzKSxcblxuICAgICAgLy8gVHJhbnNwb3J0c1xuICAgICAgdXBkYXRlVHJhbnNwb3J0Q3JlYXRlZDogdGhpcy51cGRhdGVUcmFuc3BvcnRDcmVhdGVkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVUcmFuc3BvcnRDcmVhdGVkVmlkZW86IHRoaXMudXBkYXRlVHJhbnNwb3J0Q3JlYXRlZFZpZGVvLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVUcmFuc3BvcnRDcmVhdGVkQXVkaW86IHRoaXMudXBkYXRlVHJhbnNwb3J0Q3JlYXRlZEF1ZGlvLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVUcmFuc3BvcnRDcmVhdGVkU2NyZWVuOiB0aGlzLnVwZGF0ZVRyYW5zcG9ydENyZWF0ZWRTY3JlZW4uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVByb2R1Y2VyVHJhbnNwb3J0OiB0aGlzLnVwZGF0ZVByb2R1Y2VyVHJhbnNwb3J0LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVWaWRlb1Byb2R1Y2VyOiB0aGlzLnVwZGF0ZVZpZGVvUHJvZHVjZXIuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVBhcmFtczogdGhpcy51cGRhdGVQYXJhbXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVZpZGVvUGFyYW1zOiB0aGlzLnVwZGF0ZVZpZGVvUGFyYW1zLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVBdWRpb1BhcmFtczogdGhpcy51cGRhdGVBdWRpb1BhcmFtcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQXVkaW9Qcm9kdWNlcjogdGhpcy51cGRhdGVBdWRpb1Byb2R1Y2VyLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVDb25zdW1lclRyYW5zcG9ydHM6IHRoaXMudXBkYXRlQ29uc3VtZXJUcmFuc3BvcnRzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVDb25zdW1pbmdUcmFuc3BvcnRzOiB0aGlzLnVwZGF0ZUNvbnN1bWluZ1RyYW5zcG9ydHMuYmluZCh0aGlzKSxcblxuICAgICAgLy8gUG9sbHNcbiAgICAgIHVwZGF0ZVBvbGxzOiB0aGlzLnVwZGF0ZVBvbGxzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVQb2xsOiB0aGlzLnVwZGF0ZVBvbGwuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUlzUG9sbE1vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc1BvbGxNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcblxuICAgICAgLy8gQmFja2dyb3VuZFxuICAgICAgdXBkYXRlQ3VzdG9tSW1hZ2U6IHRoaXMudXBkYXRlQ3VzdG9tSW1hZ2UuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVNlbGVjdGVkSW1hZ2U6IHRoaXMudXBkYXRlU2VsZWN0ZWRJbWFnZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlU2VnbWVudFZpZGVvOiB0aGlzLnVwZGF0ZVNlZ21lbnRWaWRlby5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlU2VsZmllU2VnbWVudGF0aW9uOiB0aGlzLnVwZGF0ZVNlbGZpZVNlZ21lbnRhdGlvbi5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUGF1c2VTZWdtZW50YXRpb246IHRoaXMudXBkYXRlUGF1c2VTZWdtZW50YXRpb24uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVByb2Nlc3NlZFN0cmVhbTogdGhpcy51cGRhdGVQcm9jZXNzZWRTdHJlYW0uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUtlZXBCYWNrZ3JvdW5kOiB0aGlzLnVwZGF0ZUtlZXBCYWNrZ3JvdW5kLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVCYWNrZ3JvdW5kSGFzQ2hhbmdlZDogdGhpcy51cGRhdGVCYWNrZ3JvdW5kSGFzQ2hhbmdlZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlVmlydHVhbFN0cmVhbTogdGhpcy51cGRhdGVWaXJ0dWFsU3RyZWFtLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVNYWluQ2FudmFzOiB0aGlzLnVwZGF0ZU1haW5DYW52YXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVByZXZLZWVwQmFja2dyb3VuZDogdGhpcy51cGRhdGVQcmV2S2VlcEJhY2tncm91bmQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUFwcGxpZWRCYWNrZ3JvdW5kOiB0aGlzLnVwZGF0ZUFwcGxpZWRCYWNrZ3JvdW5kLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVJc0JhY2tncm91bmRNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNCYWNrZ3JvdW5kTW9kYWxWaXNpYmxlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVBdXRvQ2xpY2tCYWNrZ3JvdW5kOiB0aGlzLnVwZGF0ZUF1dG9DbGlja0JhY2tncm91bmQuYmluZCh0aGlzKSxcblxuICAgICAgLy8gQnJlYWtvdXQgcm9vbXNcbiAgICAgIHVwZGF0ZUJyZWFrb3V0Um9vbXM6IHRoaXMudXBkYXRlQnJlYWtvdXRSb29tcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQ3VycmVudFJvb21JbmRleDogdGhpcy51cGRhdGVDdXJyZW50Um9vbUluZGV4LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVDYW5TdGFydEJyZWFrb3V0OiB0aGlzLnVwZGF0ZUNhblN0YXJ0QnJlYWtvdXQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUJyZWFrT3V0Um9vbVN0YXJ0ZWQ6IHRoaXMudXBkYXRlQnJlYWtPdXRSb29tU3RhcnRlZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQnJlYWtPdXRSb29tRW5kZWQ6IHRoaXMudXBkYXRlQnJlYWtPdXRSb29tRW5kZWQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUhvc3ROZXdSb29tOiB0aGlzLnVwZGF0ZUhvc3ROZXdSb29tLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVMaW1pdGVkQnJlYWtSb29tOiB0aGlzLnVwZGF0ZUxpbWl0ZWRCcmVha1Jvb20uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZU1haW5Sb29tc0xlbmd0aDogdGhpcy51cGRhdGVNYWluUm9vbXNMZW5ndGguYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZU1lbWJlclJvb206IHRoaXMudXBkYXRlTWVtYmVyUm9vbS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlSXNCcmVha291dFJvb21zTW9kYWxWaXNpYmxlOiB0aGlzLnVwZGF0ZUlzQnJlYWtvdXRSb29tc01vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuXG4gICAgICAvLyBXaGl0ZWJvYXJkXG4gICAgICB1cGRhdGVXaGl0ZWJvYXJkVXNlcnM6IHRoaXMudXBkYXRlV2hpdGVib2FyZFVzZXJzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVDdXJyZW50V2hpdGVib2FyZEluZGV4OiB0aGlzLnVwZGF0ZUN1cnJlbnRXaGl0ZWJvYXJkSW5kZXguYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUNhblN0YXJ0V2hpdGVib2FyZDogdGhpcy51cGRhdGVDYW5TdGFydFdoaXRlYm9hcmQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVdoaXRlYm9hcmRTdGFydGVkOiB0aGlzLnVwZGF0ZVdoaXRlYm9hcmRTdGFydGVkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVXaGl0ZWJvYXJkRW5kZWQ6IHRoaXMudXBkYXRlV2hpdGVib2FyZEVuZGVkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVXaGl0ZWJvYXJkTGltaXQ6IHRoaXMudXBkYXRlV2hpdGVib2FyZExpbWl0LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVJc1doaXRlYm9hcmRNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNXaGl0ZWJvYXJkTW9kYWxWaXNpYmxlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVJc0NvbmZpZ3VyZVdoaXRlYm9hcmRNb2RhbFZpc2libGU6XG4gICAgICAgIHRoaXMudXBkYXRlSXNDb25maWd1cmVXaGl0ZWJvYXJkTW9kYWxWaXNpYmxlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVTaGFwZXM6IHRoaXMudXBkYXRlU2hhcGVzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVVc2VJbWFnZUJhY2tncm91bmQ6IHRoaXMudXBkYXRlVXNlSW1hZ2VCYWNrZ3JvdW5kLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWRvU3RhY2s6IHRoaXMudXBkYXRlUmVkb1N0YWNrLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVVbmRvU3RhY2s6IHRoaXMudXBkYXRlVW5kb1N0YWNrLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVDYW52YXNTdHJlYW06IHRoaXMudXBkYXRlQ2FudmFzU3RyZWFtLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVDYW52YXNXaGl0ZWJvYXJkOiB0aGlzLnVwZGF0ZUNhbnZhc1doaXRlYm9hcmQuYmluZCh0aGlzKSxcblxuICAgICAgLy8gU2NyZWVuYm9hcmRcbiAgICAgIHVwZGF0ZUNhbnZhc1NjcmVlbmJvYXJkOiB0aGlzLnVwZGF0ZUNhbnZhc1NjcmVlbmJvYXJkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVQcm9jZXNzZWRTY3JlZW5TdHJlYW06IHRoaXMudXBkYXRlUHJvY2Vzc2VkU2NyZWVuU3RyZWFtLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVBbm5vdGF0ZVNjcmVlblN0cmVhbTogdGhpcy51cGRhdGVBbm5vdGF0ZVNjcmVlblN0cmVhbS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTWFpblNjcmVlbkNhbnZhczogdGhpcy51cGRhdGVNYWluU2NyZWVuQ2FudmFzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVJc1NjcmVlbmJvYXJkTW9kYWxWaXNpYmxlOiB0aGlzLnVwZGF0ZUlzU2NyZWVuYm9hcmRNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcblxuICAgICAgLy8gT3RoZXIgZnVuY3Rpb25zXG4gICAgICBjaGVja09yaWVudGF0aW9uOiB0aGlzLmNoZWNrT3JpZW50YXRpb24uYmluZCh0aGlzKSxcblxuICAgICAgdXBkYXRlRGV2aWNlOiB0aGlzLnVwZGF0ZURldmljZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlU29ja2V0OiB0aGlzLnVwZGF0ZVNvY2tldC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlVmFsaWRhdGVkOiB0aGlzLnVwZGF0ZVZhbGlkYXRlZC5iaW5kKHRoaXMpLFxuXG4gICAgICBzaG93QWxlcnQ6IHRoaXMuc2hvd0FsZXJ0LmJpbmQodGhpcyksXG4gICAgICBnZXRVcGRhdGVkQWxsUGFyYW1zOiAoKSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgLi4udGhpcy5nZXRBbGxQYXJhbXMoKSxcbiAgICAgICAgICAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCksXG4gICAgICAgIH07XG4gICAgICB9LFxuICAgIH07XG4gIH1cblxuICBtZWRpYVNGVVBhcmFtZXRlcnMgPSB7XG4gICAgLi4udGhpcy5nZXRBbGxQYXJhbXMoKSxcbiAgICAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCksXG4gIH07XG5cbiAgZ2V0VXBkYXRlZEFsbFBhcmFtcyA9ICgpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgLi4udGhpcy5nZXRBbGxQYXJhbXMoKSxcbiAgICAgIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSxcbiAgICB9O1xuICB9O1xuXG4gIHVwZGF0ZUJ1dHRvblN0YXRlKGJ1dHRvblR5cGU6IHN0cmluZywgdmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmNvbnRyb2xCdXR0b25zID0gdGhpcy5jb250cm9sQnV0dG9ucy5tYXAoKGJ1dHRvbikgPT4ge1xuICAgICAgaWYgKGJ1dHRvblR5cGUgPT09ICdtaWNBY3RpdmUnICYmIGJ1dHRvbi5pY29uID09PSB0aGlzLmZhTWljcm9waG9uZVNsYXNoKSB7XG4gICAgICAgIHJldHVybiB7IC4uLmJ1dHRvbiwgYWN0aXZlOiB2YWx1ZSB9O1xuICAgICAgfVxuICAgICAgaWYgKGJ1dHRvblR5cGUgPT09ICd2aWRlb0FjdGl2ZScgJiYgYnV0dG9uLmljb24gPT09IHRoaXMuZmFWaWRlb1NsYXNoKSB7XG4gICAgICAgIHJldHVybiB7IC4uLmJ1dHRvbiwgYWN0aXZlOiB2YWx1ZSB9O1xuICAgICAgfVxuICAgICAgaWYgKGJ1dHRvblR5cGUgPT09ICdzY3JlZW5TaGFyZUFjdGl2ZScgJiYgYnV0dG9uLmljb24gPT09IHRoaXMuZmFEZXNrdG9wKSB7XG4gICAgICAgIGlmIChidXR0b24uYWx0ZXJuYXRlSWNvbkNvbXBvbmVudCkge1xuICAgICAgICAgIGNvbnN0IHVwZGF0ZWRJbmplY3RvciA9IHRoaXMuY3JlYXRlSW5qZWN0b3Ioe1xuICAgICAgICAgICAgZGlzYWJsZWQ6ICF2YWx1ZSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4uYnV0dG9uLFxuICAgICAgICAgICAgYWN0aXZlOiB0cnVlLFxuICAgICAgICAgICAgYWx0ZXJuYXRlSWNvbkNvbXBvbmVudDogeyAuLi50aGlzLnNjcmVlblNoYXJlV2lkZ2V0LCBpbmplY3RvcjogdXBkYXRlZEluamVjdG9yIH0sXG4gICAgICAgICAgfTsgLy9hbHdheXMgZGVmYXVsdCB0byB0cnVlIGZvciBhY3RpdmVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4geyAuLi5idXR0b24sIGFjdGl2ZTogdHJ1ZSB9OyAvL2Fsd2F5cyBkZWZhdWx0IHRvIHRydWUgZm9yIGFjdGl2ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoYnV0dG9uVHlwZSA9PT0gJ2VuZENhbGxBY3RpdmUnICYmIGJ1dHRvbi5pY29uID09PSB0aGlzLmZhUGhvbmUpIHtcbiAgICAgICAgcmV0dXJuIHsgLi4uYnV0dG9uLCBhY3RpdmU6IHZhbHVlIH07XG4gICAgICB9XG4gICAgICBpZiAoYnV0dG9uVHlwZSA9PT0gJ3BhcnRpY2lwYW50c0FjdGl2ZScgJiYgYnV0dG9uLmljb24gPT09IHRoaXMuZmFVc2Vycykge1xuICAgICAgICByZXR1cm4geyAuLi5idXR0b24sIGFjdGl2ZTogdmFsdWUgfTtcbiAgICAgIH1cbiAgICAgIGlmIChcbiAgICAgICAgYnV0dG9uVHlwZSA9PT0gJ3Nob3dNZXNzYWdlc0JhZGdlJyAmJlxuICAgICAgICBidXR0b24uY3VzdG9tTmFtZSAmJlxuICAgICAgICBidXR0b24uY3VzdG9tTmFtZSA9PT0gJ01lc3NhZ2VzJ1xuICAgICAgKSB7XG4gICAgICAgIGNvbnN0IHVwZGF0ZWRJbmplY3RvciA9IHRoaXMuY3JlYXRlSW5qZWN0b3Ioe1xuICAgICAgICAgIGljb246IHRoaXMuZmFDb21tZW50cyxcbiAgICAgICAgICBiYWRnZVZhbHVlOiB2YWx1ZSA/ICcqJyA6ICcnLFxuICAgICAgICAgIGljb25Db2xvcjogJ2JsYWNrJyxcbiAgICAgICAgICBzaG93QmFkZ2U6IHZhbHVlLFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHsgLi4uYnV0dG9uLCBjdXN0b21Db21wb25lbnQ6IHsgLi4udGhpcy5tZXNzYWdlV2lkZ2V0LCBpbmplY3RvcjogdXBkYXRlZEluamVjdG9yIH0gfTtcbiAgICAgIH1cbiAgICAgIGlmIChidXR0b25UeXBlID09PSAnc2hvd01lbnVCYWRnZScgJiYgYnV0dG9uLmN1c3RvbU5hbWUgJiYgYnV0dG9uLmN1c3RvbU5hbWUgPT09ICdNZW51Jykge1xuICAgICAgICBjb25zdCB1cGRhdGVkSW5qZWN0b3IgPSB0aGlzLmNyZWF0ZUluamVjdG9yKHtcbiAgICAgICAgICBpY29uOiB0aGlzLmZhQmFycyxcbiAgICAgICAgICBiYWRnZVZhbHVlOiB0aGlzLnRvdGFsUmVxV2FpdC52YWx1ZSxcbiAgICAgICAgICBpY29uQ29sb3I6ICdibGFjaycsXG4gICAgICAgICAgc2hvd0JhZGdlOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHsgLi4uYnV0dG9uLCBjdXN0b21Db21wb25lbnQ6IHsgLi4udGhpcy5tZW51V2lkZ2V0LCBpbmplY3RvcjogdXBkYXRlZEluamVjdG9yIH0gfTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGJ1dHRvbjtcbiAgICB9KTtcblxuICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIFByZWpvaW5QYWdlQ29tcG9uZW50OiBhbnkgPSB7XG4gICAgY29tcG9uZW50OiB0aGlzLlByZWpvaW5QYWdlLFxuICAgIGluamVjdG9yOiBudWxsLFxuICB9O1xuXG4gIHVwZGF0ZVByZWpvaW5QYWdlQ29tcG9uZW50ID0gKCkgPT4ge1xuICAgIGNvbnN0IFByZWpvaW5Db21wID0ge1xuICAgICAgY29tcG9uZW50OiB0aGlzLlByZWpvaW5QYWdlLFxuICAgICAgaW5qZWN0b3I6IHRoaXMuY3JlYXRlSW5qZWN0b3Ioe1xuICAgICAgICBwYXJhbWV0ZXJzOiB7XG4gICAgICAgICAgc2hvd0FsZXJ0OlxuICAgICAgICAgICAgdGhpcy5zaG93QWxlcnQgfHxcbiAgICAgICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzaG93QWxlcnQgbm90IGRlZmluZWQnKTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgIHVwZGF0ZUlzTG9hZGluZ01vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc0xvYWRpbmdNb2RhbFZpc2libGUsXG4gICAgICAgICAgY29ubmVjdFNvY2tldDogdGhpcy5zb2NrZXRNYW5hZ2VyLmNvbm5lY3RTb2NrZXQsXG4gICAgICAgICAgdXBkYXRlU29ja2V0OiB0aGlzLnVwZGF0ZVNvY2tldCxcbiAgICAgICAgICB1cGRhdGVWYWxpZGF0ZWQ6IHRoaXMudXBkYXRlVmFsaWRhdGVkLFxuICAgICAgICAgIHVwZGF0ZUFwaVVzZXJOYW1lOiB0aGlzLnVwZGF0ZUFwaVVzZXJOYW1lLFxuICAgICAgICAgIHVwZGF0ZUFwaVRva2VuOiB0aGlzLnVwZGF0ZUFwaVRva2VuLFxuICAgICAgICAgIHVwZGF0ZUxpbms6IHRoaXMudXBkYXRlTGluayxcbiAgICAgICAgICB1cGRhdGVSb29tTmFtZTogdGhpcy51cGRhdGVSb29tTmFtZSxcbiAgICAgICAgICB1cGRhdGVNZW1iZXI6IHRoaXMudXBkYXRlTWVtYmVyLFxuICAgICAgICB9LFxuICAgICAgICBjcmVkZW50aWFsczogdGhpcy5jcmVkZW50aWFscyxcbiAgICAgIH0pLFxuICAgIH07XG5cbiAgICB0aGlzLlByZWpvaW5QYWdlQ29tcG9uZW50ID0geyAuLi5QcmVqb2luQ29tcCB9O1xuXG4gICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICB9O1xuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICh0aGlzLlByZWpvaW5QYWdlKSB7XG4gICAgICB0aGlzLnVwZGF0ZVByZWpvaW5QYWdlQ29tcG9uZW50KCk7XG4gICAgfVxuXG4gICAgdGhpcy5zZXR1cFJlc2l6ZUxpc3RlbmVyKCk7XG4gICAgaWYgKHRoaXMudmFsaWRhdGVkKSB7XG4gICAgICB0aGlzLmNvbm5lY3RBbmRBZGRTb2NrZXRNZXRob2RzKCk7XG4gICAgfVxuXG4gICAgdGhpcy5tYWluSGVpZ2h0V2lkdGhTdWJzY3JpcHRpb24gPSB0aGlzLm1haW5IZWlnaHRXaWR0aC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy51cGRhdGVNYWluVmlkZW9TaXplKCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnJlY29yZGluZ1N1YnNjcmlwdGlvbiA9IGNvbWJpbmVMYXRlc3QoW1xuICAgICAgdGhpcy5yZWNvcmRQYXVzZWQsXG4gICAgICB0aGlzLnJlY29yZFN0YXJ0ZWQsXG4gICAgICB0aGlzLnJlY29yZFN0b3BwZWQsXG4gICAgICB0aGlzLnJlY29yZFJlc3VtZWQsXG4gICAgICB0aGlzLnJlY29yZGluZ1Byb2dyZXNzVGltZSxcbiAgICAgIHRoaXMuc2hvd1JlY29yZEJ1dHRvbnMsXG4gICAgICB0aGlzLmlzbGV2ZWwsXG4gICAgXSkuc3Vic2NyaWJlKFxuICAgICAgKFtcbiAgICAgICAgcmVjb3JkUGF1c2VkLFxuICAgICAgICByZWNvcmRTdGFydGVkLFxuICAgICAgICByZWNvcmRTdG9wcGVkLFxuICAgICAgICByZWNvcmRSZXN1bWVkLFxuICAgICAgICByZWNvcmRpbmdQcm9ncmVzc1RpbWUsXG4gICAgICAgIHNob3dSZWNvcmRCdXR0b25zLFxuICAgICAgICBpc2xldmVsLFxuICAgICAgXSkgPT4ge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgcmVjb3JkUGF1c2VkIHx8XG4gICAgICAgICAgcmVjb3JkU3RhcnRlZCB8fFxuICAgICAgICAgIHJlY29yZFN0b3BwZWQgfHxcbiAgICAgICAgICByZWNvcmRSZXN1bWVkIHx8XG4gICAgICAgICAgcmVjb3JkaW5nUHJvZ3Jlc3NUaW1lIHx8XG4gICAgICAgICAgc2hvd1JlY29yZEJ1dHRvbnMgfHxcbiAgICAgICAgICBpc2xldmVsXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMudXBkYXRlUmVjb3JkQnV0dG9ucygpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICk7XG5cbiAgICB0aGlzLlNjcmVlbmJvYXJkU3Vic2NyaXB0aW9uID0gY29tYmluZUxhdGVzdChbXG4gICAgICB0aGlzLnNoYXJlZCxcbiAgICAgIHRoaXMuY29tcG9uZW50U2l6ZXMsXG4gICAgICB0aGlzLmFubm90YXRlU2NyZWVuU3RyZWFtLFxuICAgIF0pLnN1YnNjcmliZSgoW3NoYXJlZCwgY29tcG9uZW50U2l6ZXNdKSA9PiB7XG4gICAgICB0aGlzLlNjcmVlbmJvYXJkV2lkZ2V0ID0ge1xuICAgICAgICBjb21wb25lbnQ6IFNjcmVlbmJvYXJkLFxuICAgICAgICBpbnB1dHM6IHtcbiAgICAgICAgICBjdXN0b21XaWR0aDogY29tcG9uZW50U2l6ZXMubWFpbldpZHRoLFxuICAgICAgICAgIGN1c3RvbUhlaWdodDogY29tcG9uZW50U2l6ZXMubWFpbkhlaWdodCxcbiAgICAgICAgICBwYXJhbWV0ZXJzOiB0aGlzLm1lZGlhU0ZVUGFyYW1ldGVycyxcbiAgICAgICAgICBzaG93QXNwZWN0OiBzaGFyZWQsXG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgIH0pO1xuICAgIHRoaXMudmFsaWRhdGVkU3Vic2NyaXB0aW9uID0gdGhpcy52YWxpZGF0ZWQuc3Vic2NyaWJlKCh2YWxpZGF0ZWQpID0+IHtcbiAgICAgIGlmICh2YWxpZGF0ZWQpIHtcbiAgICAgICAgdGhpcy5oYW5kbGVWYWxpZGF0ZWQoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLmlzbGV2ZWxTdWJzY3JpcHRpb24gPSB0aGlzLmlzbGV2ZWwuc3Vic2NyaWJlKChpc2xldmVsKSA9PiB7XG4gICAgICBpZiAoaXNsZXZlbCkge1xuICAgICAgICB0aGlzLnVwZGF0ZUN1c3RvbU1lbnVCdXR0b25zKCk7XG4gICAgICAgIHRoaXMudXBkYXRlQ29udHJvbEJyb2FkY2FzdEJ1dHRvbnMoKTtcbiAgICAgICAgdGhpcy51cGRhdGVDb250cm9sQ2hhdEJ1dHRvbnMoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLmNvSG9zdFN1YnNjcmlwdGlvbiA9IGNvbWJpbmVMYXRlc3QoW3RoaXMuY29Ib3N0LCB0aGlzLmNvSG9zdFJlc3BvbnNpYmlsaXR5XSkuc3Vic2NyaWJlKFxuICAgICAgKFtjb0hvc3QsIGNvSG9zdFJlc3BvbnNpYmlsaXR5XSkgPT4ge1xuICAgICAgICBpZiAoY29Ib3N0IHx8IGNvSG9zdFJlc3BvbnNpYmlsaXR5KSB7XG4gICAgICAgICAgdGhpcy51cGRhdGVDdXN0b21NZW51QnV0dG9ucygpO1xuICAgICAgICAgIHRoaXMudXBkYXRlQ29udHJvbEJyb2FkY2FzdEJ1dHRvbnMoKTtcbiAgICAgICAgICB0aGlzLnVwZGF0ZUNvbnRyb2xDaGF0QnV0dG9ucygpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICk7XG5cbiAgICAvLyBTdWJzY3JpYmUgdG8gY2hhbmdlcyBpbiBCZWhhdmlvclN1YmplY3QgYW5kIHVwZGF0ZSB0aGUgYnV0dG9ucyBhY2NvcmRpbmdseVxuICAgIHRoaXMuYnV0dG9uU3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5taWNBY3RpdmUuc3Vic2NyaWJlKCh2YWx1ZSkgPT4ge1xuICAgICAgICB0aGlzLnVwZGF0ZUJ1dHRvblN0YXRlKCdtaWNBY3RpdmUnLCB2YWx1ZSk7XG4gICAgICAgIHRoaXMudXBkYXRlQ29udHJvbEJyb2FkY2FzdEJ1dHRvbnMoKTtcbiAgICAgICAgdGhpcy51cGRhdGVDb250cm9sQ2hhdEJ1dHRvbnMoKTtcbiAgICAgIH0pLFxuICAgICk7XG5cbiAgICB0aGlzLmJ1dHRvblN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMudmlkZW9BY3RpdmUuc3Vic2NyaWJlKCh2YWx1ZSkgPT4ge1xuICAgICAgICB0aGlzLnVwZGF0ZUJ1dHRvblN0YXRlKCd2aWRlb0FjdGl2ZScsIHZhbHVlKTtcbiAgICAgICAgdGhpcy51cGRhdGVDb250cm9sQnJvYWRjYXN0QnV0dG9ucygpO1xuICAgICAgICB0aGlzLnVwZGF0ZUNvbnRyb2xDaGF0QnV0dG9ucygpO1xuICAgICAgfSksXG4gICAgKTtcblxuICAgIHRoaXMuYnV0dG9uU3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5zY3JlZW5TaGFyZUFjdGl2ZS5zdWJzY3JpYmUoKHZhbHVlKSA9PiB7XG4gICAgICAgIHRoaXMudXBkYXRlQnV0dG9uU3RhdGUoJ3NjcmVlblNoYXJlQWN0aXZlJywgdmFsdWUpO1xuICAgICAgfSksXG4gICAgKTtcblxuICAgIHRoaXMuYnV0dG9uU3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5zaG93TWVzc2FnZXNCYWRnZS5zdWJzY3JpYmUoKHZhbHVlKSA9PiB7XG4gICAgICAgIHRoaXMudXBkYXRlQnV0dG9uU3RhdGUoJ3Nob3dNZXNzYWdlc0JhZGdlJywgdmFsdWUpO1xuICAgICAgfSksXG4gICAgKTtcblxuICAgIHRoaXMuYnV0dG9uU3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy50b3RhbFJlcVdhaXQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy51cGRhdGVCdXR0b25TdGF0ZSgnc2hvd01lbnVCYWRnZScsIHRydWUpO1xuICAgICAgfSksXG4gICAgKTtcblxuICAgIHRoaXMuYnV0dG9uU3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5wYXJ0aWNpcGFudHNDb3VudGVyLnN1YnNjcmliZSgodmFsdWUpID0+IHtcbiAgICAgICAgdGhpcy51cGRhdGVNZW51UGFydGljaXBhbnRzV2lkZ2V0KHZhbHVlKTtcbiAgICAgIH0pLFxuICAgICk7XG5cbiAgICB0aGlzLm1lZGlhU0ZVUGFyYW1ldGVycyA9IHtcbiAgICAgIC4uLnRoaXMuZ2V0QWxsUGFyYW1zKCksXG4gICAgICAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCksXG4gICAgfTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmhhbmRsZVJlc2l6ZSk7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ29yaWVudGF0aW9uY2hhbmdlJywgdGhpcy5oYW5kbGVSZXNpemUpO1xuICAgIGlmICh0aGlzLm1haW5IZWlnaHRXaWR0aFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5tYWluSGVpZ2h0V2lkdGhTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMudmFsaWRhdGVkU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnZhbGlkYXRlZFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5pc2xldmVsU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLmlzbGV2ZWxTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuY29Ib3N0U3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLmNvSG9zdFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5TY3JlZW5ib2FyZFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5TY3JlZW5ib2FyZFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5yZWNvcmRpbmdTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMucmVjb3JkaW5nU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlTWFpblZpZGVvU2l6ZSA9IGFzeW5jICgpID0+IHtcbiAgICBpZiAoIXRoaXMubG9ja19zY3JlZW4udmFsdWUgJiYgIXRoaXMuc2hhcmVkLnZhbHVlKSB7XG4gICAgICB0aGlzLnByZXBvcHVsYXRlVXNlck1lZGlhLnByZXBvcHVsYXRlVXNlck1lZGlhKHtcbiAgICAgICAgbmFtZTogdGhpcy5ob3N0TGFiZWwudmFsdWUsXG4gICAgICAgIHBhcmFtZXRlcnM6IHsgLi4udGhpcy5nZXRBbGxQYXJhbXMoKSwgLi4udGhpcy5tZWRpYVNGVUZ1bmN0aW9ucygpIH0sXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCF0aGlzLmZpcnN0X3JvdW5kLnZhbHVlKSB7XG4gICAgICAgIHRoaXMucHJlcG9wdWxhdGVVc2VyTWVkaWEucHJlcG9wdWxhdGVVc2VyTWVkaWEoe1xuICAgICAgICAgIG5hbWU6IHRoaXMuaG9zdExhYmVsLnZhbHVlLFxuICAgICAgICAgIHBhcmFtZXRlcnM6IHsgLi4udGhpcy5nZXRBbGxQYXJhbXMoKSwgLi4udGhpcy5tZWRpYVNGVUZ1bmN0aW9ucygpIH0sXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBhc3luYyBjb25uZWN0QW5kQWRkU29ja2V0TWV0aG9kcygpIHtcbiAgICB0aGlzLm1lZGlhU0ZVUGFyYW1ldGVycyA9IHtcbiAgICAgIC4uLnRoaXMuZ2V0QWxsUGFyYW1zKCksXG4gICAgICAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCksXG4gICAgfTtcbiAgICBjb25zdCBzb2NrZXRfID0gYXdhaXQgdGhpcy5jb25uZWN0X1NvY2tldCh0aGlzLmFwaVVzZXJOYW1lLnZhbHVlLCAnJywgdGhpcy5hcGlUb2tlbi52YWx1ZSk7XG4gICAgaWYgKHNvY2tldF8pIHtcbiAgICAgIHRoaXMudXBkYXRlU29ja2V0KHNvY2tldF8pO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGhhbmRsZVZhbGlkYXRlZCgpIHtcbiAgICB0aGlzLnVwZGF0ZUFsbFZpZGVvU3RyZWFtcyhbXG4gICAgICB7IHByb2R1Y2VySWQ6ICd5b3V5b3UnLCBzdHJlYW06IHVuZGVmaW5lZCwgaWQ6ICd5b3V5b3UnLCBuYW1lOiAneW91eW91JyB9LFxuICAgIF0pO1xuXG4gICAgdGhpcy51cGRhdGVTdHJlYW1OYW1lcyhbeyBpZDogJ3lvdXlvdScsIG5hbWU6ICd5b3V5b3UnLCBwcm9kdWNlcklkOiAnJyB9XSk7XG5cbiAgICBpZiAodGhpcy52YWxpZGF0ZWQudmFsdWUpIHtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKCF0aGlzLmxvY2FsVUlNb2RlLnZhbHVlKSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5jb25uZWN0QW5kQWRkU29ja2V0TWV0aG9kcygpO1xuICAgICAgICAgIHRoaXMudXBkYXRlSXNMb2FkaW5nTW9kYWxWaXNpYmxlKHRydWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMudXBkYXRlSXNMb2FkaW5nTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yIGNvbm5lY3RBbmRhQWRkU29ja2V0TWV0aG9kcycsIGVycm9yKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5zdGFydE1lZXRpbmdQcm9ncmVzc1RpbWVyLnN0YXJ0TWVldGluZ1Byb2dyZXNzVGltZXIoe1xuICAgICAgICBzdGFydFRpbWU6IERhdGUubm93KCkgLyAxMDAwLFxuICAgICAgICBwYXJhbWV0ZXJzOiB7IC4uLnRoaXMuZ2V0QWxsUGFyYW1zKCksIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSB9LFxuICAgICAgfSk7XG5cbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6cmVzaXplJylcbiAgQEhvc3RMaXN0ZW5lcignd2luZG93Om9yaWVudGF0aW9uY2hhbmdlJylcbiAgYXN5bmMgaGFuZGxlUmVzaXplKCkge1xuICAgIGxldCBmcmFjdGlvbiA9IDA7XG5cbiAgICBpZiAoXG4gICAgICB3aW5kb3cuaW5uZXJIZWlnaHQgPCB3aW5kb3cuaW5uZXJXaWR0aCAmJlxuICAgICAgKHRoaXMuZXZlbnRUeXBlLnZhbHVlID09ICd3ZWJpbmFyJyB8fCB0aGlzLmV2ZW50VHlwZS52YWx1ZSA9PSAnY29uZmVyZW5jZScpXG4gICAgKSB7XG4gICAgICBjb25zdCBjdXJyZW50SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgICAgZnJhY3Rpb24gPSBOdW1iZXIoKDQwIC8gY3VycmVudEhlaWdodCkudG9GaXhlZCgzKSk7XG4gICAgICBpZiAoZnJhY3Rpb24gIT0gdGhpcy5jb250cm9sSGVpZ2h0LnZhbHVlKSB7XG4gICAgICAgIHRoaXMudXBkYXRlQ29udHJvbEhlaWdodChOdW1iZXIoZnJhY3Rpb24pKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gU2V0IGRlZmF1bHQgY29udHJvbCBidXR0b24gaGVpZ2h0IGZvciBwb3J0cmFpdCBtb2RlIG9yIG90aGVyIGV2ZW50IHR5cGVzXG4gICAgICBjb25zdCBjdXJyZW50SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgICAgZnJhY3Rpb24gPSBOdW1iZXIoKDQwIC8gY3VycmVudEhlaWdodCkudG9GaXhlZCgzKSk7XG4gICAgICBmcmFjdGlvbiA9IE51bWJlcihmcmFjdGlvbik7XG4gICAgICBpZiAoZnJhY3Rpb24gIT0gdGhpcy5jb250cm9sSGVpZ2h0LnZhbHVlKSB7XG4gICAgICAgIHRoaXMudXBkYXRlQ29udHJvbEhlaWdodChOdW1iZXIoZnJhY3Rpb24pKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBkaW1lbnNpb25zID0gdGhpcy5jb21wdXRlRGltZW5zaW9uc01ldGhvZCh7XG4gICAgICBjb250YWluZXJXaWR0aEZyYWN0aW9uOiAxLFxuICAgICAgY29udGFpbmVySGVpZ2h0RnJhY3Rpb246IDEsXG4gICAgICBtYWluU2l6ZTogdGhpcy5tYWluSGVpZ2h0V2lkdGgudmFsdWUsXG4gICAgICBkb1N0YWNrOiB0cnVlLFxuICAgICAgZGVmYXVsdEZyYWN0aW9uOlxuICAgICAgICB0aGlzLmV2ZW50VHlwZS52YWx1ZSA9PSAnd2ViaW5hcicgfHwgdGhpcy5ldmVudFR5cGUudmFsdWUgPT0gJ2NvbmZlcmVuY2UnXG4gICAgICAgICAgPyAxIC0gZnJhY3Rpb25cbiAgICAgICAgICA6IDEsXG4gICAgfSk7XG5cbiAgICB0aGlzLnVwZGF0ZUNvbXBvbmVudFNpemVzKGRpbWVuc2lvbnMpO1xuXG4gICAgY29uc3Qgb3JpZW50YXRpb24gPSB0aGlzLmNoZWNrT3JpZW50YXRpb24oKTtcbiAgICBpZiAob3JpZW50YXRpb24gPT0gJ3BvcnRyYWl0Jykge1xuICAgICAgaWYgKCF0aGlzLmlzV2lkZVNjcmVlbi52YWx1ZSkge1xuICAgICAgICBpZiAodGhpcy5zaGFyZVNjcmVlblN0YXJ0ZWQudmFsdWUgfHwgdGhpcy5zaGFyZWQudmFsdWUpIHtcbiAgICAgICAgICB0aGlzLnVwZGF0ZVNjcmVlbkZvcmNlRnVsbERpc3BsYXkodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBVcGRhdGVzIHRoZSBtYWluIGdyaWQgdmlld1xuICAgIGF3YWl0IHRoaXMucHJlcG9wdWxhdGVVc2VyTWVkaWEucHJlcG9wdWxhdGVVc2VyTWVkaWEoe1xuICAgICAgbmFtZTogdGhpcy5ob3N0TGFiZWwudmFsdWUsXG4gICAgICBwYXJhbWV0ZXJzOiB7IC4uLnRoaXMuZ2V0QWxsUGFyYW1zKCksIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSB9LFxuICAgIH0pO1xuICAgIC8vIFVwZGF0ZXMgdGhlIG1pbmkgZ3JpZCB2aWV3XG4gICAgYXdhaXQgdGhpcy5vblNjcmVlbkNoYW5nZXMub25TY3JlZW5DaGFuZ2VzKHtcbiAgICAgIGNoYW5nZWQ6IHRydWUsXG4gICAgICBwYXJhbWV0ZXJzOiB7IC4uLnRoaXMuZ2V0QWxsUGFyYW1zKCksIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSB9LFxuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgZGlzY29ubmVjdEFsbFNvY2tldHMoY29uc3VtZV9zb2NrZXRzOiBDb25zdW1lU29ja2V0W10pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBmb3IgKGNvbnN0IHNvY2tldCBvZiBjb25zdW1lX3NvY2tldHMpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGlwID0gT2JqZWN0LmtleXMoc29ja2V0KVswXTtcbiAgICAgICAgYXdhaXQgc29ja2V0W2lwXS5kaXNjb25uZWN0KCk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmxvZyhgRXJyb3IgZGlzY29ubmVjdGluZyBzb2NrZXQgd2l0aCBJUDogJHtPYmplY3Qua2V5cyhzb2NrZXQpWzBdfWAsIGVycm9yKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhc3luYyBjbG9zZUFuZFJlc2V0KCkge1xuICAgIC8vY2xvc2UgYW5kIGNsZWFuIHVwIGFsbCBzb2NrZXRzLCBtb2RhbHMsLi4uIGFuZCByZXNldCBhbGwgc3RhdGVzIHRvIGluaXRpYWwgdmFsdWVzXG5cbiAgICB0aGlzLnVwZGF0ZUlzTWVzc2FnZXNNb2RhbFZpc2libGUoZmFsc2UpO1xuICAgIHRoaXMudXBkYXRlSXNQYXJ0aWNpcGFudHNNb2RhbFZpc2libGUoZmFsc2UpO1xuICAgIHRoaXMudXBkYXRlSXNXYWl0aW5nTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgICB0aGlzLnVwZGF0ZUlzUmVxdWVzdHNNb2RhbFZpc2libGUoZmFsc2UpO1xuICAgIHRoaXMudXBkYXRlSXNDb0hvc3RNb2RhbFZpc2libGUoZmFsc2UpO1xuICAgIHRoaXMudXBkYXRlSXNTZXR0aW5nc01vZGFsVmlzaWJsZShmYWxzZSk7XG4gICAgdGhpcy51cGRhdGVJc0Rpc3BsYXlTZXR0aW5nc01vZGFsVmlzaWJsZShmYWxzZSk7XG4gICAgdGhpcy51cGRhdGVJc01lZGlhU2V0dGluZ3NNb2RhbFZpc2libGUoZmFsc2UpO1xuICAgIHRoaXMudXBkYXRlSXNNZW51TW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgICB0aGlzLnVwZGF0ZUlzU2hhcmVFdmVudE1vZGFsVmlzaWJsZShmYWxzZSk7XG4gICAgdGhpcy51cGRhdGVJc0NvbmZpcm1FeGl0TW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgICBhd2FpdCB0aGlzLmRpc2Nvbm5lY3RBbGxTb2NrZXRzKHRoaXMuY29uc3VtZV9zb2NrZXRzLnZhbHVlKTtcbiAgICBhd2FpdCB0aGlzLnVwZGF0ZVN0YXRlc1RvSW5pdGlhbFZhbHVlcygpO1xuICAgIHRoaXMudXBkYXRlTWVldGluZ1Byb2dyZXNzVGltZSgnMDA6MDA6MDAnKTtcbiAgICB0aGlzLnVwZGF0ZU1lZXRpbmdFbGFwc2VkVGltZSgwKTtcbiAgICB0aGlzLnVwZGF0ZVJlY29yZGluZ1Byb2dyZXNzVGltZSgnMDA6MDA6MDAnKTtcbiAgICB0aGlzLnVwZGF0ZVJlY29yZEVsYXBzZWRUaW1lKDApO1xuICAgIHRoaXMudXBkYXRlU2hvd1JlY29yZEJ1dHRvbnMoZmFsc2UpO1xuXG4gICAgdGhpcy51cGRhdGVJc0NvbmZpZ3VyZVdoaXRlYm9hcmRNb2RhbFZpc2libGUoZmFsc2UpO1xuICAgIHRoaXMudXBkYXRlSXNXaGl0ZWJvYXJkTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgICB0aGlzLnVwZGF0ZUlzTWVudU1vZGFsVmlzaWJsZShmYWxzZSk7XG4gICAgdGhpcy51cGRhdGVJc1JlY29yZGluZ01vZGFsVmlzaWJsZShmYWxzZSk7XG4gICAgdGhpcy51cGRhdGVJc1BvbGxNb2RhbFZpc2libGUoZmFsc2UpO1xuICAgIHRoaXMudXBkYXRlSXNCcmVha291dFJvb21zTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgICB0aGlzLnVwZGF0ZUlzQmFja2dyb3VuZE1vZGFsVmlzaWJsZShmYWxzZSk7XG4gICAgdGhpcy51cGRhdGVJc0xvYWRpbmdNb2RhbFZpc2libGUoZmFsc2UpO1xuICAgIHRoaXMudXBkYXRlSXNDb25maXJtSGVyZU1vZGFsVmlzaWJsZShmYWxzZSk7XG5cbiAgICBhd2FpdCBzbGVlcCh7IG1zOiA1MDAgfSk7XG4gICAgdGhpcy51cGRhdGVWYWxpZGF0ZWQoZmFsc2UpO1xuICAgIC8vaWYgb24gd2ViLCByZWxvYWQgdGhlIHBhZ2VcbiAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gIH1cblxuICBjb21wdXRlRGltZW5zaW9uc01ldGhvZCA9ICh7XG4gICAgY29udGFpbmVyV2lkdGhGcmFjdGlvbiA9IDEsXG4gICAgY29udGFpbmVySGVpZ2h0RnJhY3Rpb24gPSAxLFxuICAgIG1haW5TaXplLFxuICAgIGRvU3RhY2sgPSB0cnVlLFxuICAgIGRlZmF1bHRGcmFjdGlvbixcbiAgfToge1xuICAgIGNvbnRhaW5lcldpZHRoRnJhY3Rpb24/OiBudW1iZXI7XG4gICAgY29udGFpbmVySGVpZ2h0RnJhY3Rpb24/OiBudW1iZXI7XG4gICAgbWFpblNpemU6IG51bWJlcjtcbiAgICBkb1N0YWNrPzogYm9vbGVhbjtcbiAgICBkZWZhdWx0RnJhY3Rpb246IG51bWJlcjtcbiAgfSk6IENvbXBvbmVudFNpemVzID0+IHtcbiAgICBjb25zdCBwYXJlbnRXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoICogY29udGFpbmVyV2lkdGhGcmFjdGlvbjtcbiAgICBjb25zdCBwYXJlbnRIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgKiBjb250YWluZXJIZWlnaHRGcmFjdGlvbiAqIGRlZmF1bHRGcmFjdGlvbjtcbiAgICBsZXQgaXNXaWRlU2NyZWVuID0gcGFyZW50V2lkdGggPj0gNzY4O1xuXG4gICAgaWYgKCFpc1dpZGVTY3JlZW4gJiYgcGFyZW50V2lkdGggPiAxLjUgKiBwYXJlbnRIZWlnaHQpIHtcbiAgICAgIGlzV2lkZVNjcmVlbiA9IHRydWU7XG4gICAgfVxuXG4gICAgdGhpcy51cGRhdGVJc1dpZGVTY3JlZW4oaXNXaWRlU2NyZWVuKTtcblxuICAgIGNvbnN0IGRpbWVuc2lvbnMgPSB0aGlzLmNhbGN1bGF0ZURpbWVuc2lvbnMoe1xuICAgICAgcGFyZW50V2lkdGgsXG4gICAgICBwYXJlbnRIZWlnaHQsXG4gICAgICBpc1dpZGVTY3JlZW4sXG4gICAgICBtYWluU2l6ZSxcbiAgICAgIGRvU3RhY2ssXG4gICAgfSk7XG4gICAgcmV0dXJuIGRpbWVuc2lvbnM7XG4gIH07XG5cbiAgY2FsY3VsYXRlRGltZW5zaW9ucyh7XG4gICAgcGFyZW50V2lkdGgsXG4gICAgcGFyZW50SGVpZ2h0LFxuICAgIGlzV2lkZVNjcmVlbixcbiAgICBtYWluU2l6ZSxcbiAgICBkb1N0YWNrLFxuICB9OiB7XG4gICAgcGFyZW50V2lkdGg6IG51bWJlcjtcbiAgICBwYXJlbnRIZWlnaHQ6IG51bWJlcjtcbiAgICBpc1dpZGVTY3JlZW46IGJvb2xlYW47XG4gICAgbWFpblNpemU6IG51bWJlcjtcbiAgICBkb1N0YWNrOiBib29sZWFuO1xuICB9KTogQ29tcG9uZW50U2l6ZXMge1xuICAgIGlmIChkb1N0YWNrKSB7XG4gICAgICByZXR1cm4gaXNXaWRlU2NyZWVuXG4gICAgICAgID8ge1xuICAgICAgICAgICAgbWFpbkhlaWdodDogTWF0aC5mbG9vcihwYXJlbnRIZWlnaHQpLFxuICAgICAgICAgICAgb3RoZXJIZWlnaHQ6IE1hdGguZmxvb3IocGFyZW50SGVpZ2h0KSxcbiAgICAgICAgICAgIG1haW5XaWR0aDogTWF0aC5mbG9vcigobWFpblNpemUgLyAxMDApICogcGFyZW50V2lkdGgpLFxuICAgICAgICAgICAgb3RoZXJXaWR0aDogTWF0aC5mbG9vcigoKDEwMCAtIG1haW5TaXplKSAvIDEwMCkgKiBwYXJlbnRXaWR0aCksXG4gICAgICAgICAgfVxuICAgICAgICA6IHtcbiAgICAgICAgICAgIG1haW5IZWlnaHQ6IE1hdGguZmxvb3IoKG1haW5TaXplIC8gMTAwKSAqIHBhcmVudEhlaWdodCksXG4gICAgICAgICAgICBvdGhlckhlaWdodDogTWF0aC5mbG9vcigoKDEwMCAtIG1haW5TaXplKSAvIDEwMCkgKiBwYXJlbnRIZWlnaHQpLFxuICAgICAgICAgICAgbWFpbldpZHRoOiBNYXRoLmZsb29yKHBhcmVudFdpZHRoKSxcbiAgICAgICAgICAgIG90aGVyV2lkdGg6IE1hdGguZmxvb3IocGFyZW50V2lkdGgpLFxuICAgICAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG1haW5IZWlnaHQ6IE1hdGguZmxvb3IocGFyZW50SGVpZ2h0KSxcbiAgICAgICAgb3RoZXJIZWlnaHQ6IE1hdGguZmxvb3IocGFyZW50SGVpZ2h0KSxcbiAgICAgICAgbWFpbldpZHRoOiBNYXRoLmZsb29yKHBhcmVudFdpZHRoKSxcbiAgICAgICAgb3RoZXJXaWR0aDogTWF0aC5mbG9vcihwYXJlbnRXaWR0aCksXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZU9yaWVudGF0aW9uQ2hhbmdlKCkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmhhbmRsZVJlc2l6ZS5iaW5kKHRoaXMpKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignb3JpZW50YXRpb25jaGFuZ2UnLCB0aGlzLmhhbmRsZVJlc2l6ZS5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIHNldHVwUmVzaXplTGlzdGVuZXIoKSB7XG4gICAgdGhpcy5oYW5kbGVSZXNpemUoKTtcbiAgfVxuXG4gIG9yaWVudGF0aW9uID0gd2luZG93LmlubmVySGVpZ2h0ID4gd2luZG93LmlubmVyV2lkdGggPyAncG9ydHJhaXQnIDogJ2xhbmRzY2FwZSc7XG5cbiAgYXN5bmMgam9pblJvb20oZGF0YToge1xuICAgIHNvY2tldDogU29ja2V0O1xuICAgIHJvb21OYW1lOiBzdHJpbmc7XG4gICAgaXNsZXZlbDogc3RyaW5nO1xuICAgIG1lbWJlcjogc3RyaW5nO1xuICAgIHNlYzogc3RyaW5nO1xuICAgIGFwaVVzZXJOYW1lOiBzdHJpbmc7XG4gIH0pOiBQcm9taXNlPFJlc3BvbnNlSm9pblJvb20gfCBudWxsPiB7XG4gICAgY29uc3QgeyBzb2NrZXQsIHJvb21OYW1lLCBpc2xldmVsLCBtZW1iZXIsIHNlYywgYXBpVXNlck5hbWUgfSA9IGRhdGE7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2U6IFJlc3BvbnNlSm9pblJvb20gfCBudWxsID0gYXdhaXQgdGhpcy5qb2luUm9vbUNsaWVudC5qb2luUm9vbUNsaWVudCh7XG4gICAgICAgIHNvY2tldCxcbiAgICAgICAgcm9vbU5hbWUsXG4gICAgICAgIGlzbGV2ZWwsXG4gICAgICAgIG1lbWJlcixcbiAgICAgICAgc2VjLFxuICAgICAgICBhcGlVc2VyTmFtZSxcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdFcnJvciBqb2luaW5nIHJvb206JywgZXJyb3IpO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gam9pbiB0aGUgcm9vbS4gUGxlYXNlIGNoZWNrIHlvdXIgY29ubmVjdGlvbiBhbmQgdHJ5IGFnYWluLicpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGpvaW5fUm9vbSh7XG4gICAgc29ja2V0LFxuICAgIHJvb21OYW1lLFxuICAgIGlzbGV2ZWwsXG4gICAgbWVtYmVyLFxuICAgIHNlYyxcbiAgICBhcGlVc2VyTmFtZSxcbiAgfToge1xuICAgIHNvY2tldDogU29ja2V0O1xuICAgIHJvb21OYW1lOiBzdHJpbmc7XG4gICAgaXNsZXZlbDogc3RyaW5nO1xuICAgIG1lbWJlcjogc3RyaW5nO1xuICAgIHNlYzogc3RyaW5nO1xuICAgIGFwaVVzZXJOYW1lOiBzdHJpbmc7XG4gIH0pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBkYXRhOiBSZXNwb25zZUpvaW5Sb29tIHwgbnVsbCA9IGF3YWl0IHRoaXMuam9pblJvb20oe1xuICAgICAgc29ja2V0OiBzb2NrZXQsXG4gICAgICByb29tTmFtZTogcm9vbU5hbWUsXG4gICAgICBpc2xldmVsOiBpc2xldmVsLFxuICAgICAgbWVtYmVyOiBtZW1iZXIsXG4gICAgICBzZWM6IHNlYyxcbiAgICAgIGFwaVVzZXJOYW1lOiBhcGlVc2VyTmFtZSxcbiAgICB9KTtcblxuICAgIGlmIChkYXRhICYmIGRhdGEuc3VjY2Vzcykge1xuICAgICAgdGhpcy5yb29tRGF0YS5uZXh0KGRhdGEpO1xuXG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLnVwZGF0ZVJvb21QYXJhbWV0ZXJzQ2xpZW50LnVwZGF0ZVJvb21QYXJhbWV0ZXJzQ2xpZW50KHtcbiAgICAgICAgICBwYXJhbWV0ZXJzOiB7XG4gICAgICAgICAgICAuLi50aGlzLmdldEFsbFBhcmFtcygpLFxuICAgICAgICAgICAgLi4udGhpcy5tZWRpYVNGVUZ1bmN0aW9ucygpLFxuICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoZGF0YS5pc0hvc3QpIHtcbiAgICAgICAgICB0aGlzLnVwZGF0ZUlzbGV2ZWwoJzInKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnVwZGF0ZUlzbGV2ZWwoJzEnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkYXRhLnNlY3VyZUNvZGUpIHtcbiAgICAgICAgICB0aGlzLnVwZGF0ZUFkbWluUGFzc2NvZGUoZGF0YS5zZWN1cmVDb2RlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkYXRhLnJ0cENhcGFiaWxpdGllcykge1xuICAgICAgICAgIGNvbnN0IGRldmljZV8gPSBhd2FpdCB0aGlzLmNyZWF0ZURldmljZUNsaWVudC5jcmVhdGVEZXZpY2VDbGllbnQoe1xuICAgICAgICAgICAgcnRwQ2FwYWJpbGl0aWVzOiBkYXRhLnJ0cENhcGFiaWxpdGllcyxcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGlmIChkZXZpY2VfKSB7XG4gICAgICAgICAgICB0aGlzLmRldmljZS5uZXh0KGRldmljZV8pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCB7XG4gICAgICAgIC8qIGhhbmRsZSBlcnJvciAqL1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnVwZGF0ZVZhbGlkYXRlZChmYWxzZSk7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAodGhpcy5zaG93QWxlcnQgJiYgZGF0YT8ucmVhc29uKSB7XG4gICAgICAgICAgdGhpcy5zaG93QWxlcnQoeyBtZXNzYWdlOiBkYXRhPy5yZWFzb24sIHR5cGU6ICdkYW5nZXInLCBkdXJhdGlvbjogMzAwMCB9KTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCB7XG4gICAgICAgIC8qIGhhbmRsZSBlcnJvciAqL1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uUGFydGljaXBhbnRzRmlsdGVyQ2hhbmdlID0gKHZhbHVlOiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgICBpZiAodmFsdWUgJiYgdmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5maWx0ZXJlZFBhcnRpY2lwYW50cy5uZXh0KFxuICAgICAgICB0aGlzLnBhcnRpY2lwYW50cy52YWx1ZS5maWx0ZXIoKHBhcnRpY2lwYW50KSA9PlxuICAgICAgICAgIHBhcnRpY2lwYW50Lm5hbWUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyh2YWx1ZS50b0xvd2VyQ2FzZSgpKSxcbiAgICAgICAgKSxcbiAgICAgICk7XG4gICAgICB0aGlzLnBhcnRpY2lwYW50c0NvdW50ZXIubmV4dCh0aGlzLmZpbHRlcmVkUGFydGljaXBhbnRzLnZhbHVlLmxlbmd0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZmlsdGVyZWRQYXJ0aWNpcGFudHMubmV4dCh0aGlzLnBhcnRpY2lwYW50cy52YWx1ZSk7XG4gICAgICB0aGlzLnBhcnRpY2lwYW50c0NvdW50ZXIubmV4dCh0aGlzLnBhcnRpY2lwYW50cy52YWx1ZS5sZW5ndGgpO1xuICAgIH1cbiAgfTtcblxuICB1cGRhdGVTdGF0ZXNUb0luaXRpYWxWYWx1ZXMgPSBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgaW5pdGlhbFZhbHVlcyA9IGluaXRpYWxWYWx1ZXNTdGF0ZSBhcyB7IFtrZXk6IHN0cmluZ106IGFueSB9O1xuICAgIGNvbnN0IHVwZGF0ZUZ1bmN0aW9ucyA9IHRoaXMuZ2V0QWxsUGFyYW1zKCkgYXMgdW5rbm93biBhcyB7XG4gICAgICBba2V5OiBzdHJpbmddOiAodmFsdWU6IGFueSkgPT4gdm9pZDtcbiAgICB9O1xuXG4gICAgZm9yIChjb25zdCBrZXkgaW4gaW5pdGlhbFZhbHVlcykge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChpbml0aWFsVmFsdWVzLCBrZXkpKSB7XG4gICAgICAgIGNvbnN0IHVwZGF0ZUZ1bmN0aW9uTmFtZSA9IGB1cGRhdGUke2tleS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGtleS5zbGljZSgxKX1gO1xuICAgICAgICBjb25zdCB1cGRhdGVGdW5jdGlvbiA9IHVwZGF0ZUZ1bmN0aW9uc1t1cGRhdGVGdW5jdGlvbk5hbWVdO1xuXG4gICAgICAgIGlmICh0eXBlb2YgdXBkYXRlRnVuY3Rpb24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgdXBkYXRlRnVuY3Rpb24oaW5pdGlhbFZhbHVlc1trZXldKTtcbiAgICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAgIC8qIGhhbmRsZSBlcnJvciAqL1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBmYVJlY29yZFZpbnlsID0gZmFSZWNvcmRWaW55bDtcbiAgZmFQbGF5Q2lyY2xlID0gZmFQbGF5Q2lyY2xlO1xuICBmYVBhdXNlQ2lyY2xlID0gZmFQYXVzZUNpcmNsZTtcbiAgZmFTdG9wQ2lyY2xlID0gZmFTdG9wQ2lyY2xlO1xuICBmYURvdENpcmNsZSA9IGZhRG90Q2lyY2xlO1xuICBmYUNvZyA9IGZhQ29nO1xuICBmYVVzZXJzID0gZmFVc2VycztcbiAgZmFDbG9jayA9IGZhQ2xvY2s7XG4gIGZhVXNlclBsdXMgPSBmYVVzZXJQbHVzO1xuICBmYVRvb2xzID0gZmFUb29scztcbiAgZmFEZXNrdG9wID0gZmFEZXNrdG9wO1xuICBmYVBvbGwgPSBmYVBvbGw7XG4gIGZhVXNlckZyaWVuZHMgPSBmYVVzZXJGcmllbmRzO1xuICBmYUNoYWxrYm9hcmRUZWFjaGVyID0gZmFDaGFsa2JvYXJkVGVhY2hlcjtcbiAgZmFNaWNyb3Bob25lID0gZmFNaWNyb3Bob25lO1xuICBmYU1pY3JvcGhvbmVTbGFzaCA9IGZhTWljcm9waG9uZVNsYXNoO1xuICBmYVZpZGVvID0gZmFWaWRlbztcbiAgZmFWaWRlb1NsYXNoID0gZmFWaWRlb1NsYXNoO1xuICBmYVN5bmMgPSBmYVN5bmM7XG4gIGZhUGhvbmUgPSBmYVBob25lO1xuICBmYVNoYXJlQWx0ID0gZmFTaGFyZUFsdDtcbiAgZmFCYXJzID0gZmFCYXJzO1xuICBmYUNvbW1lbnRzID0gZmFDb21tZW50cztcbiAgZmFDaGFydEJhciA9IGZhQ2hhcnRCYXI7XG5cbiAgb25DbG9zZU1lbnVNb2RhbCA9ICgpID0+IHtcbiAgICB0aGlzLnVwZGF0ZUlzTWVudU1vZGFsVmlzaWJsZShmYWxzZSk7XG4gIH07XG5cbiAgb25FdmVudFNldHRpbmdzQ2xvc2UgPSAoKSA9PiB7XG4gICAgdGhpcy51cGRhdGVJc1NldHRpbmdzTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgfTtcblxuICBvbkNvSG9zdENsb3NlID0gKCkgPT4ge1xuICAgIHRoaXMudXBkYXRlSXNDb0hvc3RNb2RhbFZpc2libGUoZmFsc2UpO1xuICB9O1xuXG4gIG9uTWVkaWFTZXR0aW5nc0Nsb3NlID0gKCkgPT4ge1xuICAgIHRoaXMudXBkYXRlSXNNZWRpYVNldHRpbmdzTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgfTtcblxuICBvbkRpc3BsYXlTZXR0aW5nc0Nsb3NlID0gKCkgPT4ge1xuICAgIHRoaXMudXBkYXRlSXNEaXNwbGF5U2V0dGluZ3NNb2RhbFZpc2libGUoZmFsc2UpO1xuICB9O1xuXG4gIG9uUG9sbENsb3NlID0gKCkgPT4ge1xuICAgIHRoaXMudXBkYXRlSXNQb2xsTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgfTtcblxuICBvbkJyZWFrb3V0Um9vbXNDbG9zZSA9ICgpID0+IHtcbiAgICB0aGlzLnVwZGF0ZUlzQnJlYWtvdXRSb29tc01vZGFsVmlzaWJsZShmYWxzZSk7XG4gIH07XG5cbiAgb25Db25maWd1cmVXaGl0ZWJvYXJkQ2xvc2UgPSAoKSA9PiB7XG4gICAgdGhpcy51cGRhdGVJc0NvbmZpZ3VyZVdoaXRlYm9hcmRNb2RhbFZpc2libGUoZmFsc2UpO1xuICB9O1xuXG4gIG9uTWVzc2FnZXNDbG9zZSA9ICgpID0+IHtcbiAgICB0aGlzLnVwZGF0ZUlzTWVzc2FnZXNNb2RhbFZpc2libGUoZmFsc2UpO1xuICB9O1xuXG4gIG9uUmVjb3JkaW5nQ2xvc2UgPSAoKSA9PiB7XG4gICAgdGhpcy51cGRhdGVJc1JlY29yZGluZ01vZGFsVmlzaWJsZShmYWxzZSk7XG4gIH07XG5cbiAgb25QYXJ0aWNpcGFudHNDbG9zZSA9ICgpID0+IHtcbiAgICB0aGlzLnVwZGF0ZUlzUGFydGljaXBhbnRzTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgfTtcblxuICBvbkJhY2tncm91bmRDbG9zZSA9ICgpID0+IHtcbiAgICB0aGlzLnVwZGF0ZUlzQmFja2dyb3VuZE1vZGFsVmlzaWJsZShmYWxzZSk7XG4gIH07XG5cbiAgb25Db25maXJtRXhpdENsb3NlID0gKCkgPT4ge1xuICAgIHRoaXMudXBkYXRlSXNDb25maXJtRXhpdE1vZGFsVmlzaWJsZShmYWxzZSk7XG4gIH07XG5cbiAgb25Db25maXJtSGVyZUNsb3NlID0gKCkgPT4ge1xuICAgIHRoaXMudXBkYXRlSXNDb25maXJtSGVyZU1vZGFsVmlzaWJsZShmYWxzZSk7XG4gIH07XG5cbiAgb25TY3JlZW5ib2FyZENsb3NlID0gKCkgPT4ge1xuICAgIHRoaXMudXBkYXRlSXNTY3JlZW5ib2FyZE1vZGFsVmlzaWJsZShmYWxzZSk7XG4gIH07XG5cbiAgb25TaGFyZUV2ZW50Q2xvc2UgPSAoKSA9PiB7XG4gICAgdGhpcy51cGRhdGVJc1NoYXJlRXZlbnRNb2RhbFZpc2libGUoZmFsc2UpO1xuICB9O1xuXG4gIG9uQWxlcnRIaWRlID0gKCkgPT4ge1xuICAgIHRoaXMudXBkYXRlQWxlcnRWaXNpYmxlKGZhbHNlKTtcbiAgfTtcblxuICBTY3JlZW5ib2FyZFdpZGdldCA9IHtcbiAgICBjb21wb25lbnQ6IFNjcmVlbmJvYXJkLFxuICAgIGlucHV0czoge1xuICAgICAgY3VzdG9tV2lkdGg6IHRoaXMuY29tcG9uZW50U2l6ZXMudmFsdWUubWFpbldpZHRoLFxuICAgICAgY3VzdG9tSGVpZ2h0OiB0aGlzLmNvbXBvbmVudFNpemVzLnZhbHVlLm1haW5IZWlnaHQsXG4gICAgICBwYXJhbWV0ZXJzOiB0aGlzLm1lZGlhU0ZVUGFyYW1ldGVycyxcbiAgICAgIHNob3dBc3BlY3Q6IHRoaXMuc2hhcmVkLnZhbHVlLFxuICAgIH0sXG4gIH07XG5cbiAgcmVjb3JkVGltZXJXaWRnZXQgPSB7XG4gICAgY29tcG9uZW50OiBSZWNvcmRUaW1lcldpZGdldCxcbiAgICBpbmplY3RvcjogdGhpcy5jcmVhdGVJbmplY3Rvcih7IHJlY29yZGluZ1Byb2dyZXNzVGltZTogdGhpcy5yZWNvcmRpbmdQcm9ncmVzc1RpbWUudmFsdWUgfSksXG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkVGltZXJXaWRnZXQgPSAoXG4gICAgcmVjb3JkaW5nUHJvZ3Jlc3NUaW1lOiBzdHJpbmcgPSB0aGlzLnJlY29yZGluZ1Byb2dyZXNzVGltZS52YWx1ZSxcbiAgKTogeyBjb21wb25lbnQ6IGFueTsgaW5qZWN0b3I6IEluamVjdG9yIH0gPT4ge1xuICAgIGNvbnN0IHJlY29yZFRpbWVyV2lkZ2V0ID0ge1xuICAgICAgY29tcG9uZW50OiBSZWNvcmRUaW1lcldpZGdldCxcbiAgICAgIGluamVjdG9yOiB0aGlzLmNyZWF0ZUluamVjdG9yKHsgcmVjb3JkaW5nUHJvZ3Jlc3NUaW1lOiByZWNvcmRpbmdQcm9ncmVzc1RpbWUgfSksXG4gICAgfTtcblxuICAgIHRoaXMucmVjb3JkVGltZXJXaWRnZXQgPSB7IC4uLnJlY29yZFRpbWVyV2lkZ2V0IH07XG5cbiAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcblxuICAgIHJldHVybiByZWNvcmRUaW1lcldpZGdldDtcbiAgfTtcblxuICByZWNvcmRCdXR0b24gPSBbXG4gICAge1xuICAgICAgaWNvbjogdGhpcy5mYVJlY29yZFZpbnlsLFxuICAgICAgdGV4dDogJ1JlY29yZCcsXG4gICAgICBvblByZXNzOiAoKSA9PiB7XG4gICAgICAgIHRoaXMubGF1bmNoUmVjb3JkaW5nLmxhdW5jaFJlY29yZGluZyh7XG4gICAgICAgICAgdXBkYXRlSXNSZWNvcmRpbmdNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNSZWNvcmRpbmdNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcbiAgICAgICAgICBpc1JlY29yZGluZ01vZGFsVmlzaWJsZTogdGhpcy5pc1JlY29yZGluZ01vZGFsVmlzaWJsZS52YWx1ZSxcbiAgICAgICAgICBzaG93QWxlcnQ6IHRoaXMuc2hvd0FsZXJ0LmJpbmQodGhpcyksXG4gICAgICAgICAgc3RvcExhdW5jaFJlY29yZDogdGhpcy5zdG9wTGF1bmNoUmVjb3JkLnZhbHVlLFxuICAgICAgICAgIGNhbkxhdW5jaFJlY29yZDogdGhpcy5jYW5MYXVuY2hSZWNvcmQudmFsdWUsXG4gICAgICAgICAgcmVjb3JkaW5nQXVkaW9TdXBwb3J0OiB0aGlzLnJlY29yZGluZ0F1ZGlvU3VwcG9ydC52YWx1ZSxcbiAgICAgICAgICByZWNvcmRpbmdWaWRlb1N1cHBvcnQ6IHRoaXMucmVjb3JkaW5nVmlkZW9TdXBwb3J0LnZhbHVlLFxuICAgICAgICAgIHVwZGF0ZUNhblJlY29yZDogdGhpcy51cGRhdGVDYW5SZWNvcmQuYmluZCh0aGlzKSxcbiAgICAgICAgICB1cGRhdGVDbGVhcmVkVG9SZWNvcmQ6IHRoaXMudXBkYXRlQ2xlYXJlZFRvUmVjb3JkLmJpbmQodGhpcyksXG4gICAgICAgICAgcmVjb3JkU3RhcnRlZDogdGhpcy5yZWNvcmRTdGFydGVkLnZhbHVlLFxuICAgICAgICAgIHJlY29yZFBhdXNlZDogdGhpcy5yZWNvcmRQYXVzZWQudmFsdWUsXG4gICAgICAgICAgbG9jYWxVSU1vZGU6IHRoaXMubG9jYWxVSU1vZGUudmFsdWUsXG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIGFjdGl2ZUNvbG9yOiAnYmxhY2snLFxuICAgICAgaW5BY3RpdmVDb2xvcjogJ2JsYWNrJyxcbiAgICAgIHNob3c6IHRydWUsXG4gICAgfSxcbiAgXTtcblxuICByZWNvcmRCdXR0b25zOiBNYWluQnV0dG9uQWx0W10gPSBbXTtcblxuICByZWNvcmRCdXR0b25zQXJyYXk6IE1haW5CdXR0b25BbHRbXSA9IFtcbiAgICB7XG4gICAgICBpY29uOiB0aGlzLmZhUGxheUNpcmNsZSxcbiAgICAgIGFjdGl2ZTogKCkgPT4gIXRoaXMucmVjb3JkUGF1c2VkLnZhbHVlLFxuICAgICAgb25QcmVzczogKCkgPT5cbiAgICAgICAgdGhpcy51cGRhdGVSZWNvcmRpbmcudXBkYXRlUmVjb3JkaW5nKHtcbiAgICAgICAgICBwYXJhbWV0ZXJzOiB7IC4uLnRoaXMuZ2V0QWxsUGFyYW1zKCksIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSB9LFxuICAgICAgICB9KSxcbiAgICAgIGFjdGl2ZUNvbG9yOiAnYmxhY2snLFxuICAgICAgaW5BY3RpdmVDb2xvcjogJ2JsYWNrJyxcbiAgICAgIGFsdGVybmF0ZUljb246IHRoaXMuZmFQYXVzZUNpcmNsZSxcbiAgICAgIHNob3c6ICgpID0+IHRydWUsXG4gICAgfSxcbiAgICB7XG4gICAgICBpY29uOiB0aGlzLmZhU3RvcENpcmNsZSxcbiAgICAgIGFjdGl2ZTogKCkgPT4gZmFsc2UsXG4gICAgICBvblByZXNzOiAoKSA9PlxuICAgICAgICB0aGlzLnN0b3BSZWNvcmRpbmcuc3RvcFJlY29yZGluZyh7XG4gICAgICAgICAgcGFyYW1ldGVyczogeyAuLi50aGlzLmdldEFsbFBhcmFtcygpLCAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCkgfSxcbiAgICAgICAgfSksXG4gICAgICBhY3RpdmVDb2xvcjogJ2dyZWVuJyxcbiAgICAgIGluQWN0aXZlQ29sb3I6ICdibGFjaycsXG4gICAgICBzaG93OiAoKSA9PiB0cnVlLFxuICAgIH0sXG4gICAge1xuICAgICAgY3VzdG9tQ29tcG9uZW50OiAoKSA9PiB0aGlzLnVwZGF0ZVJlY29yZFRpbWVyV2lkZ2V0KCksXG4gICAgICBzaG93OiAoKSA9PiB0cnVlLFxuICAgICAgYWN0aXZlOiAoKSA9PiBmYWxzZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGljb246IHRoaXMuZmFEb3RDaXJjbGUsXG4gICAgICBhY3RpdmU6ICgpID0+IGZhbHNlLFxuICAgICAgb25QcmVzczogKCkgPT4gY29uc29sZS5sb2coJ1N0YXR1cyBwcmVzc2VkJyksXG4gICAgICBhY3RpdmVDb2xvcjogJ2JsYWNrJyxcbiAgICAgIGluQWN0aXZlQ29sb3I6ICgpID0+ICh0aGlzLnJlY29yZFBhdXNlZC52YWx1ZSA/ICd5ZWxsb3cnIDogJ3JlZCcpLFxuICAgICAgc2hvdzogKCkgPT4gdHJ1ZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGljb246IHRoaXMuZmFDb2csXG4gICAgICBhY3RpdmU6ICgpID0+IGZhbHNlLFxuICAgICAgb25QcmVzczogKCkgPT5cbiAgICAgICAgdGhpcy5sYXVuY2hSZWNvcmRpbmcubGF1bmNoUmVjb3JkaW5nKHtcbiAgICAgICAgICB1cGRhdGVJc1JlY29yZGluZ01vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc1JlY29yZGluZ01vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuICAgICAgICAgIGlzUmVjb3JkaW5nTW9kYWxWaXNpYmxlOiB0aGlzLmlzUmVjb3JkaW5nTW9kYWxWaXNpYmxlLnZhbHVlLFxuICAgICAgICAgIHNob3dBbGVydDogdGhpcy5zaG93QWxlcnQuYmluZCh0aGlzKSxcbiAgICAgICAgICBzdG9wTGF1bmNoUmVjb3JkOiB0aGlzLnN0b3BMYXVuY2hSZWNvcmQudmFsdWUsXG4gICAgICAgICAgY2FuTGF1bmNoUmVjb3JkOiB0aGlzLmNhbkxhdW5jaFJlY29yZC52YWx1ZSxcbiAgICAgICAgICByZWNvcmRpbmdBdWRpb1N1cHBvcnQ6IHRoaXMucmVjb3JkaW5nQXVkaW9TdXBwb3J0LnZhbHVlLFxuICAgICAgICAgIHJlY29yZGluZ1ZpZGVvU3VwcG9ydDogdGhpcy5yZWNvcmRpbmdWaWRlb1N1cHBvcnQudmFsdWUsXG4gICAgICAgICAgdXBkYXRlQ2FuUmVjb3JkOiB0aGlzLnVwZGF0ZUNhblJlY29yZC5iaW5kKHRoaXMpLFxuICAgICAgICAgIHVwZGF0ZUNsZWFyZWRUb1JlY29yZDogdGhpcy51cGRhdGVDbGVhcmVkVG9SZWNvcmQuYmluZCh0aGlzKSxcbiAgICAgICAgICByZWNvcmRTdGFydGVkOiB0aGlzLnJlY29yZFN0YXJ0ZWQudmFsdWUsXG4gICAgICAgICAgcmVjb3JkUGF1c2VkOiB0aGlzLnJlY29yZFBhdXNlZC52YWx1ZSxcbiAgICAgICAgICBsb2NhbFVJTW9kZTogdGhpcy5sb2NhbFVJTW9kZS52YWx1ZSxcbiAgICAgICAgfSksXG4gICAgICBhY3RpdmVDb2xvcjogJ2dyZWVuJyxcbiAgICAgIGluQWN0aXZlQ29sb3I6ICdibGFjaycsXG4gICAgICBzaG93OiAoKSA9PiB0cnVlLFxuICAgIH0sXG4gIF07XG5cbiAgYXN5bmMgdXBkYXRlUmVjb3JkQnV0dG9ucygpIHtcbiAgICBjb25zdCByZWNvcmRCdXR0b25zID0gdGhpcy5yZWNvcmRCdXR0b25zQXJyYXkubWFwKChidXR0b24pID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLmJ1dHRvbixcbiAgICAgICAgYWN0aXZlOiB0eXBlb2YgYnV0dG9uLmFjdGl2ZSA9PT0gJ2Z1bmN0aW9uJyA/IGJ1dHRvbi5hY3RpdmUoKSA6IGJ1dHRvbi5hY3RpdmUsXG4gICAgICAgIHNob3c6IHR5cGVvZiBidXR0b24uc2hvdyA9PT0gJ2Z1bmN0aW9uJyA/IGJ1dHRvbi5zaG93KCkgOiBidXR0b24uc2hvdyxcbiAgICAgICAgY3VzdG9tQ29tcG9uZW50OiBidXR0b24uY3VzdG9tQ29tcG9uZW50XG4gICAgICAgICAgPyB0eXBlb2YgYnV0dG9uLmN1c3RvbUNvbXBvbmVudCA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICAgICAgPyBidXR0b24uY3VzdG9tQ29tcG9uZW50KClcbiAgICAgICAgICAgIDogYnV0dG9uLmN1c3RvbUNvbXBvbmVudFxuICAgICAgICAgIDogdW5kZWZpbmVkLFxuICAgICAgICBhY3RpdmVDb2xvcjpcbiAgICAgICAgICB0eXBlb2YgYnV0dG9uLmluQWN0aXZlQ29sb3IgPT09ICdmdW5jdGlvbidcbiAgICAgICAgICAgID8gYnV0dG9uLmluQWN0aXZlQ29sb3IoKVxuICAgICAgICAgICAgOiBidXR0b24uaW5BY3RpdmVDb2xvcixcbiAgICAgICAgaW5BY3RpdmVDb2xvcjpcbiAgICAgICAgICB0eXBlb2YgYnV0dG9uLmluQWN0aXZlQ29sb3IgPT09ICdmdW5jdGlvbidcbiAgICAgICAgICAgID8gYnV0dG9uLmluQWN0aXZlQ29sb3IoKVxuICAgICAgICAgICAgOiBidXR0b24uaW5BY3RpdmVDb2xvcixcbiAgICAgIH07XG4gICAgfSk7XG4gICAgdGhpcy5yZWNvcmRCdXR0b25zID0gWy4uLnJlY29yZEJ1dHRvbnNdO1xuICAgIGF3YWl0IHRoaXMudXBkYXRlTWVudVJlY29yZFdpZGdldChyZWNvcmRCdXR0b25zKTtcbiAgICB0aGlzLnVwZGF0ZUN1c3RvbU1lbnVCdXR0b25zKCk7XG4gICAgdGhpcy51cGRhdGVDb250cm9sQnJvYWRjYXN0QnV0dG9ucygpO1xuXG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICAvLyBDcmVhdGUgaW5zdGFuY2VzIG9mIHRoZSBjdXN0b20gd2lkZ2V0c1xuICBtZW51V2lkZ2V0ID0ge1xuICAgIGNvbXBvbmVudDogTWVudVdpZGdldCxcbiAgICBpbmplY3RvcjogdGhpcy5jcmVhdGVJbmplY3Rvcih7XG4gICAgICBpY29uOiB0aGlzLmZhQmFycyxcbiAgICAgIGJhZGdlVmFsdWU6IHRoaXMudG90YWxSZXFXYWl0LnZhbHVlLFxuICAgICAgaWNvbkNvbG9yOiAnYmxhY2snLFxuICAgICAgc2hvd0JhZGdlOiB0cnVlLFxuICAgIH0pLFxuICB9O1xuXG4gIG1lc3NhZ2VXaWRnZXQgPSB7XG4gICAgY29tcG9uZW50OiBNZXNzYWdlV2lkZ2V0LFxuICAgIGluamVjdG9yOiB0aGlzLmNyZWF0ZUluamVjdG9yKHtcbiAgICAgIGljb246IHRoaXMuZmFDb21tZW50cyxcbiAgICAgIHNob3dCYWRnZTogdGhpcy5zaG93TWVzc2FnZXNCYWRnZS52YWx1ZSxcbiAgICAgIGJhZGdlVmFsdWU6IDEsXG4gICAgICBpY29uQ29sb3I6ICdibGFjaycsXG4gICAgfSksXG4gIH07XG5cbiAgbWVudVJlY29yZFdpZGdldCA9IHtcbiAgICBjb21wb25lbnQ6IE1lbnVSZWNvcmRXaWRnZXQsXG4gICAgaW5qZWN0b3I6IHRoaXMuY3JlYXRlSW5qZWN0b3Ioe1xuICAgICAgYnV0dG9uczogdGhpcy5yZWNvcmRCdXR0b25zLFxuICAgICAgc2hvd0FzcGVjdDogdHJ1ZSxcbiAgICAgIGRpcmVjdGlvbjogJ2hvcml6b250YWwnLFxuICAgIH0pLFxuICB9O1xuXG4gIHVwZGF0ZU1lbnVSZWNvcmRXaWRnZXQgPSAocmVjb3JkQnV0dG9uczogTWFpbkJ1dHRvbkFsdFtdID0gdGhpcy5yZWNvcmRCdXR0b25zKTogYW55ID0+IHtcbiAgICBjb25zdCBtZW51UmVjb3JkV2lkZ2V0ID0ge1xuICAgICAgY29tcG9uZW50OiBNZW51UmVjb3JkV2lkZ2V0LFxuICAgICAgaW5qZWN0b3I6IHRoaXMuY3JlYXRlSW5qZWN0b3Ioe1xuICAgICAgICBidXR0b25zOiByZWNvcmRCdXR0b25zLFxuICAgICAgICBzaG93QXNwZWN0OiB0cnVlLFxuICAgICAgICBkaXJlY3Rpb246ICdob3Jpem9udGFsJyxcbiAgICAgIH0pLFxuICAgIH07XG5cbiAgICB0aGlzLm1lbnVSZWNvcmRXaWRnZXQgPSB7IC4uLm1lbnVSZWNvcmRXaWRnZXQgfTtcblxuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuXG4gICAgcmV0dXJuIG1lbnVSZWNvcmRXaWRnZXQ7XG4gIH07XG5cbiAgbWVudVBhcnRpY2lwYW50c1dpZGdldCA9IHtcbiAgICBjb21wb25lbnQ6IE1lbnVQYXJ0aWNpcGFudHNXaWRnZXQsXG4gICAgaW5qZWN0b3I6IHRoaXMuY3JlYXRlSW5qZWN0b3Ioe1xuICAgICAgaWNvbjogdGhpcy5mYUNoYXJ0QmFyLFxuICAgICAgcGFydGljaXBhbnRzQ291bnRlcjogdGhpcy5wYXJ0aWNpcGFudHNDb3VudGVyLnZhbHVlLFxuICAgICAgaWNvbkNvbG9yOiAnYmxhY2snLFxuICAgIH0pLFxuICB9O1xuXG4gIHVwZGF0ZU1lbnVQYXJ0aWNpcGFudHNXaWRnZXQgPSAoY291bnQ6IG51bWJlciA9IHRoaXMucGFydGljaXBhbnRzQ291bnRlci52YWx1ZSk6IGFueSA9PiB7XG4gICAgY29uc3QgbWVudVBhcnRpY2lwYW50c1dpZGdldCA9IHtcbiAgICAgIGNvbXBvbmVudDogTWVudVBhcnRpY2lwYW50c1dpZGdldCxcbiAgICAgIGluamVjdG9yOiB0aGlzLmNyZWF0ZUluamVjdG9yKHtcbiAgICAgICAgaWNvbjogdGhpcy5mYUNoYXJ0QmFyLFxuICAgICAgICBwYXJ0aWNpcGFudHNDb3VudGVyOiBjb3VudCxcbiAgICAgICAgaWNvbkNvbG9yOiAnYmxhY2snLFxuICAgICAgfSksXG4gICAgfTtcblxuICAgIHRoaXMubWVudVBhcnRpY2lwYW50c1dpZGdldCA9IHsgLi4ubWVudVBhcnRpY2lwYW50c1dpZGdldCB9O1xuXG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG5cbiAgICByZXR1cm4gbWVudVBhcnRpY2lwYW50c1dpZGdldDtcbiAgfTtcblxuICBjdXN0b21NZW51QnV0dG9uc0FycmF5OiBNYWluQ3VzdG9tQnV0dG9uW10gPSBbXG4gICAge1xuICAgICAgaWNvbjogdGhpcy5mYVJlY29yZFZpbnlsLFxuICAgICAgdGV4dDogJ1JlY29yZCcsXG4gICAgICBhY3Rpb246ICgpID0+XG4gICAgICAgIHRoaXMubGF1bmNoUmVjb3JkaW5nLmxhdW5jaFJlY29yZGluZyh7XG4gICAgICAgICAgdXBkYXRlSXNSZWNvcmRpbmdNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNSZWNvcmRpbmdNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcbiAgICAgICAgICBpc1JlY29yZGluZ01vZGFsVmlzaWJsZTogdGhpcy5pc1JlY29yZGluZ01vZGFsVmlzaWJsZS52YWx1ZSxcbiAgICAgICAgICBzaG93QWxlcnQ6IHRoaXMuc2hvd0FsZXJ0LmJpbmQodGhpcyksXG4gICAgICAgICAgc3RvcExhdW5jaFJlY29yZDogdGhpcy5zdG9wTGF1bmNoUmVjb3JkLnZhbHVlLFxuICAgICAgICAgIGNhbkxhdW5jaFJlY29yZDogdGhpcy5jYW5MYXVuY2hSZWNvcmQudmFsdWUsXG4gICAgICAgICAgcmVjb3JkaW5nQXVkaW9TdXBwb3J0OiB0aGlzLnJlY29yZGluZ0F1ZGlvU3VwcG9ydC52YWx1ZSxcbiAgICAgICAgICByZWNvcmRpbmdWaWRlb1N1cHBvcnQ6IHRoaXMucmVjb3JkaW5nVmlkZW9TdXBwb3J0LnZhbHVlLFxuICAgICAgICAgIHVwZGF0ZUNhblJlY29yZDogdGhpcy51cGRhdGVDYW5SZWNvcmQuYmluZCh0aGlzKSxcbiAgICAgICAgICB1cGRhdGVDbGVhcmVkVG9SZWNvcmQ6IHRoaXMudXBkYXRlQ2xlYXJlZFRvUmVjb3JkLmJpbmQodGhpcyksXG4gICAgICAgICAgcmVjb3JkU3RhcnRlZDogdGhpcy5yZWNvcmRTdGFydGVkLnZhbHVlLFxuICAgICAgICAgIHJlY29yZFBhdXNlZDogdGhpcy5yZWNvcmRQYXVzZWQudmFsdWUsXG4gICAgICAgICAgbG9jYWxVSU1vZGU6IHRoaXMubG9jYWxVSU1vZGUudmFsdWUsXG4gICAgICAgIH0pLFxuICAgICAgc2hvdzogKCkgPT4gIXRoaXMuc2hvd1JlY29yZEJ1dHRvbnMudmFsdWUgJiYgdGhpcy5pc2xldmVsLnZhbHVlID09ICcyJyxcbiAgICB9LFxuICAgIHtcbiAgICAgIGN1c3RvbUNvbXBvbmVudDogKCkgPT4gdGhpcy51cGRhdGVNZW51UmVjb3JkV2lkZ2V0KCksXG4gICAgICBzaG93OiAoKSA9PiB0aGlzLnNob3dSZWNvcmRCdXR0b25zLnZhbHVlICYmIHRoaXMuaXNsZXZlbC52YWx1ZSA9PSAnMicsXG4gICAgICBhY3Rpb246ICgpID0+IGNvbnNvbGUubG9nKCdyZWNvcmQgYnV0dG9ucyBwcmVzc2VkJyksXG4gICAgfSxcbiAgICB7XG4gICAgICBpY29uOiB0aGlzLmZhQ29nLFxuICAgICAgdGV4dDogJ0V2ZW50IFNldHRpbmdzJyxcbiAgICAgIGFjdGlvbjogKCkgPT5cbiAgICAgICAgdGhpcy5sYXVuY2hTZXR0aW5ncy5sYXVuY2hTZXR0aW5ncyh7XG4gICAgICAgICAgdXBkYXRlSXNTZXR0aW5nc01vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc1NldHRpbmdzTW9kYWxWaXNpYmxlLmJpbmQodGhpcyksXG4gICAgICAgICAgaXNTZXR0aW5nc01vZGFsVmlzaWJsZTogdGhpcy5pc1NldHRpbmdzTW9kYWxWaXNpYmxlLnZhbHVlLFxuICAgICAgICB9KSxcbiAgICAgIHNob3c6ICgpID0+IHRoaXMuaXNsZXZlbC52YWx1ZSA9PSAnMicsXG4gICAgfSxcbiAgICB7XG4gICAgICBpY29uOiB0aGlzLmZhVXNlcnMsXG4gICAgICB0ZXh0OiAnUmVxdWVzdHMnLFxuICAgICAgYWN0aW9uOiAoKSA9PlxuICAgICAgICB0aGlzLmxhdW5jaFJlcXVlc3RzLmxhdW5jaFJlcXVlc3RzKHtcbiAgICAgICAgICB1cGRhdGVJc1JlcXVlc3RzTW9kYWxWaXNpYmxlOiB0aGlzLnVwZGF0ZUlzUmVxdWVzdHNNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcbiAgICAgICAgICBpc1JlcXVlc3RzTW9kYWxWaXNpYmxlOiB0aGlzLmlzUmVxdWVzdHNNb2RhbFZpc2libGUudmFsdWUsXG4gICAgICAgIH0pLFxuICAgICAgc2hvdzogKCkgPT5cbiAgICAgICAgdGhpcy5pc2xldmVsLnZhbHVlID09ICcyJyB8fFxuICAgICAgICAoKHRoaXMuY29Ib3N0UmVzcG9uc2liaWxpdHkudmFsdWUgJiZcbiAgICAgICAgICB0aGlzLmNvSG9zdC52YWx1ZSAmJlxuICAgICAgICAgIHRoaXMuY29Ib3N0LnZhbHVlID09PSB0aGlzLm1lbWJlci52YWx1ZSAmJlxuICAgICAgICAgICEhdGhpcy5jb0hvc3RSZXNwb25zaWJpbGl0eT8udmFsdWU/LmZpbmQoKGl0ZW0pID0+IGl0ZW0ubmFtZSA9PT0gJ21lZGlhJyk/LnZhbHVlKSA/P1xuICAgICAgICAgIGZhbHNlKSB8fFxuICAgICAgICBmYWxzZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGljb246IHRoaXMuZmFDbG9jayxcbiAgICAgIHRleHQ6ICdXYWl0aW5nJyxcbiAgICAgIGFjdGlvbjogKCkgPT5cbiAgICAgICAgdGhpcy5sYXVuY2hXYWl0aW5nLmxhdW5jaFdhaXRpbmcoe1xuICAgICAgICAgIHVwZGF0ZUlzV2FpdGluZ01vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc1dhaXRpbmdNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcbiAgICAgICAgICBpc1dhaXRpbmdNb2RhbFZpc2libGU6IHRoaXMuaXNXYWl0aW5nTW9kYWxWaXNpYmxlLnZhbHVlLFxuICAgICAgICB9KSxcbiAgICAgIHNob3c6ICgpID0+XG4gICAgICAgIHRoaXMuaXNsZXZlbC52YWx1ZSA9PSAnMicgfHxcbiAgICAgICAgKHRoaXMuY29Ib3N0UmVzcG9uc2liaWxpdHkudmFsdWUgJiZcbiAgICAgICAgICB0aGlzLmNvSG9zdC52YWx1ZSAmJlxuICAgICAgICAgIHRoaXMuY29Ib3N0LnZhbHVlID09PSB0aGlzLm1lbWJlci52YWx1ZSAmJlxuICAgICAgICAgIHRoaXMuY29Ib3N0UmVzcG9uc2liaWxpdHk/LnZhbHVlPy5maW5kKChpdGVtKSA9PiBpdGVtLm5hbWUgPT09ICd3YWl0aW5nJyk/LnZhbHVlID09PVxuICAgICAgICAgICAgdHJ1ZSkgfHxcbiAgICAgICAgZmFsc2UsXG4gICAgfSxcbiAgICB7XG4gICAgICBpY29uOiB0aGlzLmZhVXNlclBsdXMsXG4gICAgICB0ZXh0OiAnQ28taG9zdCcsXG4gICAgICBhY3Rpb246ICgpID0+XG4gICAgICAgIHRoaXMubGF1bmNoQ29Ib3N0LmxhdW5jaENvSG9zdCh7XG4gICAgICAgICAgdXBkYXRlSXNDb0hvc3RNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNDb0hvc3RNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcbiAgICAgICAgICBpc0NvSG9zdE1vZGFsVmlzaWJsZTogdGhpcy5pc0NvSG9zdE1vZGFsVmlzaWJsZS52YWx1ZSxcbiAgICAgICAgfSksXG4gICAgICBzaG93OiAoKSA9PiB0aGlzLmlzbGV2ZWwudmFsdWUgPT0gJzInLFxuICAgIH0sXG4gICAge1xuICAgICAgaWNvbjogdGhpcy5mYVRvb2xzLFxuICAgICAgdGV4dDogJ1NldCBNZWRpYScsXG4gICAgICBhY3Rpb246ICgpID0+XG4gICAgICAgIHRoaXMubGF1bmNoTWVkaWFTZXR0aW5ncy5sYXVuY2hNZWRpYVNldHRpbmdzKHtcbiAgICAgICAgICB1cGRhdGVJc01lZGlhU2V0dGluZ3NNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNNZWRpYVNldHRpbmdzTW9kYWxWaXNpYmxlLmJpbmQodGhpcyksXG4gICAgICAgICAgaXNNZWRpYVNldHRpbmdzTW9kYWxWaXNpYmxlOiB0aGlzLmlzTWVkaWFTZXR0aW5nc01vZGFsVmlzaWJsZS52YWx1ZSxcbiAgICAgICAgICBhdWRpb0lucHV0czogdGhpcy5hdWRpb0lucHV0cy52YWx1ZSxcbiAgICAgICAgICB2aWRlb0lucHV0czogdGhpcy52aWRlb0lucHV0cy52YWx1ZSxcbiAgICAgICAgICB1cGRhdGVBdWRpb0lucHV0czogdGhpcy51cGRhdGVBdWRpb0lucHV0cy5iaW5kKHRoaXMpLFxuICAgICAgICAgIHVwZGF0ZVZpZGVvSW5wdXRzOiB0aGlzLnVwZGF0ZVZpZGVvSW5wdXRzLmJpbmQodGhpcyksXG4gICAgICAgIH0pLFxuICAgICAgc2hvdzogKCkgPT4gdHJ1ZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGljb246IHRoaXMuZmFEZXNrdG9wLFxuICAgICAgdGV4dDogJ0Rpc3BsYXknLFxuICAgICAgYWN0aW9uOiAoKSA9PlxuICAgICAgICB0aGlzLmxhdW5jaERpc3BsYXlTZXR0aW5ncy5sYXVuY2hEaXNwbGF5U2V0dGluZ3Moe1xuICAgICAgICAgIHVwZGF0ZUlzRGlzcGxheVNldHRpbmdzTW9kYWxWaXNpYmxlOiB0aGlzLnVwZGF0ZUlzRGlzcGxheVNldHRpbmdzTW9kYWxWaXNpYmxlLmJpbmQodGhpcyksXG4gICAgICAgICAgaXNEaXNwbGF5U2V0dGluZ3NNb2RhbFZpc2libGU6IHRoaXMuaXNEaXNwbGF5U2V0dGluZ3NNb2RhbFZpc2libGUudmFsdWUsXG4gICAgICAgIH0pLFxuICAgICAgc2hvdzogKCkgPT4gdHJ1ZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGljb246IHRoaXMuZmFQb2xsLFxuICAgICAgdGV4dDogJ1BvbGwnLFxuICAgICAgYWN0aW9uOiAoKSA9PlxuICAgICAgICB0aGlzLmxhdW5jaFBvbGwubGF1bmNoUG9sbCh7XG4gICAgICAgICAgdXBkYXRlSXNQb2xsTW9kYWxWaXNpYmxlOiB0aGlzLnVwZGF0ZUlzUG9sbE1vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuICAgICAgICAgIGlzUG9sbE1vZGFsVmlzaWJsZTogdGhpcy5pc1BvbGxNb2RhbFZpc2libGUudmFsdWUsXG4gICAgICAgIH0pLFxuICAgICAgc2hvdzogKCkgPT4gdHJ1ZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGljb246IHRoaXMuZmFVc2VyRnJpZW5kcyxcbiAgICAgIHRleHQ6ICdCcmVha291dCBSb29tcycsXG4gICAgICBhY3Rpb246ICgpID0+XG4gICAgICAgIHRoaXMubGF1bmNoQnJlYWtvdXRSb29tcy5sYXVuY2hCcmVha291dFJvb21zKHtcbiAgICAgICAgICB1cGRhdGVJc0JyZWFrb3V0Um9vbXNNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNCcmVha291dFJvb21zTW9kYWxWaXNpYmxlLmJpbmQodGhpcyksXG4gICAgICAgICAgaXNCcmVha291dFJvb21zTW9kYWxWaXNpYmxlOiB0aGlzLmlzQnJlYWtvdXRSb29tc01vZGFsVmlzaWJsZS52YWx1ZSxcbiAgICAgICAgfSksXG4gICAgICBzaG93OiAoKSA9PiB0aGlzLmlzbGV2ZWwudmFsdWUgPT0gJzInLFxuICAgIH0sXG4gICAge1xuICAgICAgaWNvbjogdGhpcy5mYUNoYWxrYm9hcmRUZWFjaGVyLFxuICAgICAgdGV4dDogJ1doaXRlYm9hcmQnLFxuICAgICAgYWN0aW9uOiAoKSA9PlxuICAgICAgICB0aGlzLmxhdW5jaENvbmZpZ3VyZVdoaXRlYm9hcmQubGF1bmNoQ29uZmlndXJlV2hpdGVib2FyZCh7XG4gICAgICAgICAgdXBkYXRlSXNDb25maWd1cmVXaGl0ZWJvYXJkTW9kYWxWaXNpYmxlOlxuICAgICAgICAgICAgdGhpcy51cGRhdGVJc0NvbmZpZ3VyZVdoaXRlYm9hcmRNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcbiAgICAgICAgICBpc0NvbmZpZ3VyZVdoaXRlYm9hcmRNb2RhbFZpc2libGU6IHRoaXMuaXNDb25maWd1cmVXaGl0ZWJvYXJkTW9kYWxWaXNpYmxlLnZhbHVlLFxuICAgICAgICB9KSxcbiAgICAgIHNob3c6ICgpID0+IHRoaXMuaXNsZXZlbC52YWx1ZSA9PSAnMicsXG4gICAgfSxcbiAgXTtcblxuICBjdXN0b21NZW51QnV0dG9uczogTWFpbkN1c3RvbUJ1dHRvbltdID0gW107XG5cbiAgdXBkYXRlQ3VzdG9tTWVudUJ1dHRvbnMoKSB7XG4gICAgdGhpcy5jdXN0b21NZW51QnV0dG9ucyA9IHRoaXMuY3VzdG9tTWVudUJ1dHRvbnNBcnJheS5tYXAoKGJ1dHRvbikgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uYnV0dG9uLFxuICAgICAgICBzaG93OiB0eXBlb2YgYnV0dG9uLnNob3cgPT09ICdmdW5jdGlvbicgPyBidXR0b24uc2hvdygpIDogYnV0dG9uLnNob3csXG4gICAgICAgIGN1c3RvbUNvbXBvbmVudDogYnV0dG9uLmN1c3RvbUNvbXBvbmVudFxuICAgICAgICAgID8gdHlwZW9mIGJ1dHRvbi5jdXN0b21Db21wb25lbnQgPT09ICdmdW5jdGlvbidcbiAgICAgICAgICAgID8gYnV0dG9uLmN1c3RvbUNvbXBvbmVudCgpXG4gICAgICAgICAgICA6IGJ1dHRvbi5jdXN0b21Db21wb25lbnRcbiAgICAgICAgICA6IHVuZGVmaW5lZCxcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBjb250cm9sQnJvYWRjYXN0QnV0dG9uczogQnV0dG9uVG91Y2hbXSA9IFtdO1xuXG4gIHVwZGF0ZUNvbnRyb2xCcm9hZGNhc3RCdXR0b25zKCkge1xuICAgIHRoaXMuY29udHJvbEJyb2FkY2FzdEJ1dHRvbnMgPSB0aGlzLmNvbnRyb2xCcm9hZGNhc3RCdXR0b25zQXJyYXkubWFwKChidXR0b24pID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLmJ1dHRvbixcbiAgICAgICAgc2hvdzogdHlwZW9mIGJ1dHRvbi5zaG93ID09PSAnZnVuY3Rpb24nID8gYnV0dG9uLnNob3coKSA6IGJ1dHRvbi5zaG93LFxuICAgICAgICBhY3RpdmU6IHR5cGVvZiBidXR0b24uYWN0aXZlID09PSAnZnVuY3Rpb24nID8gYnV0dG9uLmFjdGl2ZSgpIDogYnV0dG9uLmFjdGl2ZSxcbiAgICAgICAgY3VzdG9tQ29tcG9uZW50OiBidXR0b24uY3VzdG9tQ29tcG9uZW50XG4gICAgICAgICAgPyB0eXBlb2YgYnV0dG9uLmN1c3RvbUNvbXBvbmVudCA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICAgICAgPyBidXR0b24uY3VzdG9tQ29tcG9uZW50KClcbiAgICAgICAgICAgIDogYnV0dG9uLmN1c3RvbUNvbXBvbmVudFxuICAgICAgICAgIDogdW5kZWZpbmVkLFxuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIGNvbnRyb2xCcm9hZGNhc3RCdXR0b25zQXJyYXk6IEJ1dHRvblRvdWNoW10gPSBbXG4gICAge1xuICAgICAgaWNvbjogdGhpcy5mYVVzZXJzLFxuICAgICAgYWN0aXZlOiB0cnVlLFxuICAgICAgYWx0ZXJuYXRlSWNvbjogdGhpcy5mYVVzZXJzLFxuICAgICAgb25QcmVzczogKCkgPT5cbiAgICAgICAgdGhpcy5sYXVuY2hQYXJ0aWNpcGFudHMubGF1bmNoUGFydGljaXBhbnRzKHtcbiAgICAgICAgICB1cGRhdGVJc1BhcnRpY2lwYW50c01vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc1BhcnRpY2lwYW50c01vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuICAgICAgICAgIGlzUGFydGljaXBhbnRzTW9kYWxWaXNpYmxlOiB0aGlzLmlzUGFydGljaXBhbnRzTW9kYWxWaXNpYmxlLnZhbHVlLFxuICAgICAgICB9KSxcbiAgICAgIGFjdGl2ZUNvbG9yOiAnYmxhY2snLFxuICAgICAgaW5BY3RpdmVDb2xvcjogJ2JsYWNrJyxcbiAgICAgIHNob3c6ICgpID0+IHRoaXMuaXNsZXZlbC52YWx1ZSA9PSAnMicsXG4gICAgfSxcbiAgICB7XG4gICAgICBpY29uOiB0aGlzLmZhU2hhcmVBbHQsXG4gICAgICBhY3RpdmU6IHRydWUsXG4gICAgICBhbHRlcm5hdGVJY29uOiB0aGlzLmZhU2hhcmVBbHQsXG4gICAgICBvblByZXNzOiAoKSA9PiB0aGlzLnVwZGF0ZUlzU2hhcmVFdmVudE1vZGFsVmlzaWJsZSghdGhpcy5pc1NoYXJlRXZlbnRNb2RhbFZpc2libGUudmFsdWUpLFxuICAgICAgYWN0aXZlQ29sb3I6ICdibGFjaycsXG4gICAgICBpbkFjdGl2ZUNvbG9yOiAnYmxhY2snLFxuICAgICAgc2hvdzogKCkgPT4gdHJ1ZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGN1c3RvbUNvbXBvbmVudDogdGhpcy5tZXNzYWdlV2lkZ2V0LFxuICAgICAgb25QcmVzczogKCkgPT5cbiAgICAgICAgdGhpcy5sYXVuY2hNZXNzYWdlcy5sYXVuY2hNZXNzYWdlcyh7XG4gICAgICAgICAgdXBkYXRlSXNNZXNzYWdlc01vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc01lc3NhZ2VzTW9kYWxWaXNpYmxlLmJpbmQodGhpcyksXG4gICAgICAgICAgaXNNZXNzYWdlc01vZGFsVmlzaWJsZTogdGhpcy5pc01lc3NhZ2VzTW9kYWxWaXNpYmxlLnZhbHVlLFxuICAgICAgICB9KSxcbiAgICAgIHNob3c6ICgpID0+IHRydWUsXG4gICAgfSxcbiAgICB7XG4gICAgICBpY29uOiB0aGlzLmZhU3luYyxcbiAgICAgIGFjdGl2ZTogdHJ1ZSxcbiAgICAgIGFsdGVybmF0ZUljb246IHRoaXMuZmFTeW5jLFxuICAgICAgb25QcmVzczogKCkgPT5cbiAgICAgICAgdGhpcy5zd2l0Y2hWaWRlb0FsdC5zd2l0Y2hWaWRlb0FsdCh7XG4gICAgICAgICAgcGFyYW1ldGVyczoge1xuICAgICAgICAgICAgLi4udGhpcy5nZXRBbGxQYXJhbXMoKSxcbiAgICAgICAgICAgIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KSxcbiAgICAgIGFjdGl2ZUNvbG9yOiAnYmxhY2snLFxuICAgICAgaW5BY3RpdmVDb2xvcjogJ2JsYWNrJyxcbiAgICAgIHNob3c6ICgpID0+IHRoaXMuaXNsZXZlbC52YWx1ZSA9PSAnMicsXG4gICAgfSxcbiAgICB7XG4gICAgICBpY29uOiB0aGlzLmZhVmlkZW9TbGFzaCxcbiAgICAgIGFsdGVybmF0ZUljb246IHRoaXMuZmFWaWRlbyxcbiAgICAgIGFjdGl2ZTogKCkgPT4gdGhpcy52aWRlb0FjdGl2ZS52YWx1ZSxcbiAgICAgIG9uUHJlc3M6ICgpID0+XG4gICAgICAgIHRoaXMuY2xpY2tWaWRlby5jbGlja1ZpZGVvKHtcbiAgICAgICAgICBwYXJhbWV0ZXJzOiB7XG4gICAgICAgICAgICAuLi50aGlzLmdldEFsbFBhcmFtcygpLFxuICAgICAgICAgICAgLi4udGhpcy5tZWRpYVNGVUZ1bmN0aW9ucygpLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pLFxuICAgICAgc2hvdzogKCkgPT4gdGhpcy5pc2xldmVsLnZhbHVlID09ICcyJyxcbiAgICAgIGFjdGl2ZUNvbG9yOiAnZ3JlZW4nLFxuICAgICAgaW5BY3RpdmVDb2xvcjogJ3JlZCcsXG4gICAgfSxcbiAgICB7XG4gICAgICBpY29uOiB0aGlzLmZhTWljcm9waG9uZVNsYXNoLFxuICAgICAgYWx0ZXJuYXRlSWNvbjogdGhpcy5mYU1pY3JvcGhvbmUsXG4gICAgICBhY3RpdmU6ICgpID0+IHRoaXMubWljQWN0aXZlLnZhbHVlLFxuICAgICAgb25QcmVzczogKCkgPT5cbiAgICAgICAgdGhpcy5jbGlja0F1ZGlvLmNsaWNrQXVkaW8oe1xuICAgICAgICAgIHBhcmFtZXRlcnM6IHtcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0QWxsUGFyYW1zKCksXG4gICAgICAgICAgICAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCksXG4gICAgICAgICAgfSxcbiAgICAgICAgfSksXG4gICAgICBhY3RpdmVDb2xvcjogJ2dyZWVuJyxcbiAgICAgIGluQWN0aXZlQ29sb3I6ICdyZWQnLFxuICAgICAgc2hvdzogKCkgPT4gdGhpcy5pc2xldmVsLnZhbHVlID09ICcyJyxcbiAgICB9LFxuICAgIHtcbiAgICAgIGN1c3RvbUNvbXBvbmVudDogKCkgPT4gdGhpcy5tZW51UGFydGljaXBhbnRzV2lkZ2V0LFxuICAgICAgc2hvdzogKCkgPT4gdGhpcy5pc2xldmVsLnZhbHVlID09ICcyJyxcbiAgICB9LFxuICAgIHtcbiAgICAgIGljb246IHRoaXMuZmFQaG9uZSxcbiAgICAgIGFjdGl2ZTogdGhpcy5lbmRDYWxsQWN0aXZlLnZhbHVlLFxuICAgICAgb25QcmVzczogKCkgPT5cbiAgICAgICAgdGhpcy5sYXVuY2hDb25maXJtRXhpdC5sYXVuY2hDb25maXJtRXhpdCh7XG4gICAgICAgICAgdXBkYXRlSXNDb25maXJtRXhpdE1vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc0NvbmZpcm1FeGl0TW9kYWxWaXNpYmxlLmJpbmQodGhpcyksXG4gICAgICAgICAgaXNDb25maXJtRXhpdE1vZGFsVmlzaWJsZTogdGhpcy5pc0NvbmZpcm1FeGl0TW9kYWxWaXNpYmxlLnZhbHVlLFxuICAgICAgICB9KSxcbiAgICAgIGFjdGl2ZUNvbG9yOiAnZ3JlZW4nLFxuICAgICAgaW5BY3RpdmVDb2xvcjogJ3JlZCcsXG4gICAgICBzaG93OiAoKSA9PiB0cnVlLFxuICAgIH0sXG4gICAge1xuICAgICAgaWNvbjogdGhpcy5mYVBob25lLFxuICAgICAgYWN0aXZlOiB0aGlzLmVuZENhbGxBY3RpdmUudmFsdWUsXG4gICAgICBvblByZXNzOiAoKSA9PiBjb25zb2xlLmxvZygnRW5kIENhbGwgcHJlc3NlZCcpLFxuICAgICAgYWN0aXZlQ29sb3I6ICd0cmFuc3BhcmVudCcsXG4gICAgICBpbkFjdGl2ZUNvbG9yOiAndHJhbnNwYXJlbnQnLFxuICAgICAgYmFja2dyb3VuZENvbG9yOiB7IGRlZmF1bHQ6ICd0cmFuc3BhcmVudCcgfSxcbiAgICAgIHNob3c6ICgpID0+IGZhbHNlLFxuICAgIH0sXG4gIF07XG5cbiAgY29udHJvbENoYXRCdXR0b25zOiBCdXR0b25Ub3VjaFtdID0gW107XG5cbiAgY29udHJvbENoYXRCdXR0b25zQXJyYXk6IEJ1dHRvblRvdWNoW10gPSBbXG4gICAge1xuICAgICAgaWNvbjogdGhpcy5mYVNoYXJlQWx0LFxuICAgICAgYWN0aXZlOiB0cnVlLFxuICAgICAgYWx0ZXJuYXRlSWNvbjogdGhpcy5mYVNoYXJlQWx0LFxuICAgICAgb25QcmVzczogKCkgPT4gdGhpcy51cGRhdGVJc1NoYXJlRXZlbnRNb2RhbFZpc2libGUoIXRoaXMuaXNTaGFyZUV2ZW50TW9kYWxWaXNpYmxlLnZhbHVlKSxcbiAgICAgIGFjdGl2ZUNvbG9yOiAnYmxhY2snLFxuICAgICAgaW5BY3RpdmVDb2xvcjogJ2JsYWNrJyxcbiAgICAgIHNob3c6IHRydWUsXG4gICAgfSxcbiAgICB7XG4gICAgICBjdXN0b21Db21wb25lbnQ6IHRoaXMubWVzc2FnZVdpZGdldCxcbiAgICAgIG9uUHJlc3M6ICgpID0+XG4gICAgICAgIHRoaXMubGF1bmNoTWVzc2FnZXMubGF1bmNoTWVzc2FnZXMoe1xuICAgICAgICAgIHVwZGF0ZUlzTWVzc2FnZXNNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNNZXNzYWdlc01vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuICAgICAgICAgIGlzTWVzc2FnZXNNb2RhbFZpc2libGU6IHRoaXMuaXNNZXNzYWdlc01vZGFsVmlzaWJsZS52YWx1ZSxcbiAgICAgICAgfSksXG4gICAgICBzaG93OiB0cnVlLFxuICAgIH0sXG4gICAge1xuICAgICAgaWNvbjogdGhpcy5mYVN5bmMsXG4gICAgICBhY3RpdmU6IHRydWUsXG4gICAgICBhbHRlcm5hdGVJY29uOiB0aGlzLmZhU3luYyxcbiAgICAgIG9uUHJlc3M6ICgpID0+XG4gICAgICAgIHRoaXMuc3dpdGNoVmlkZW9BbHQuc3dpdGNoVmlkZW9BbHQoe1xuICAgICAgICAgIHBhcmFtZXRlcnM6IHtcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0QWxsUGFyYW1zKCksXG4gICAgICAgICAgICAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCksXG4gICAgICAgICAgfSxcbiAgICAgICAgfSksXG4gICAgICBhY3RpdmVDb2xvcjogJ2JsYWNrJyxcbiAgICAgIGluQWN0aXZlQ29sb3I6ICdibGFjaycsXG4gICAgICBzaG93OiB0cnVlLFxuICAgIH0sXG4gICAge1xuICAgICAgaWNvbjogdGhpcy5mYVZpZGVvU2xhc2gsXG4gICAgICBhbHRlcm5hdGVJY29uOiB0aGlzLmZhVmlkZW8sXG4gICAgICBhY3RpdmU6ICgpID0+IHRoaXMudmlkZW9BY3RpdmUudmFsdWUsXG4gICAgICBvblByZXNzOiAoKSA9PlxuICAgICAgICB0aGlzLmNsaWNrVmlkZW8uY2xpY2tWaWRlbyh7XG4gICAgICAgICAgcGFyYW1ldGVyczoge1xuICAgICAgICAgICAgLi4udGhpcy5nZXRBbGxQYXJhbXMoKSxcbiAgICAgICAgICAgIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KSxcbiAgICAgIGFjdGl2ZUNvbG9yOiAnZ3JlZW4nLFxuICAgICAgaW5BY3RpdmVDb2xvcjogJ3JlZCcsXG4gICAgICBzaG93OiB0cnVlLFxuICAgIH0sXG4gICAge1xuICAgICAgaWNvbjogdGhpcy5mYU1pY3JvcGhvbmVTbGFzaCxcbiAgICAgIGFsdGVybmF0ZUljb246IHRoaXMuZmFNaWNyb3Bob25lLFxuICAgICAgYWN0aXZlOiAoKSA9PiB0aGlzLm1pY0FjdGl2ZS52YWx1ZSxcbiAgICAgIG9uUHJlc3M6ICgpID0+XG4gICAgICAgIHRoaXMuY2xpY2tBdWRpby5jbGlja0F1ZGlvKHtcbiAgICAgICAgICBwYXJhbWV0ZXJzOiB7XG4gICAgICAgICAgICAuLi50aGlzLmdldEFsbFBhcmFtcygpLFxuICAgICAgICAgICAgLi4udGhpcy5tZWRpYVNGVUZ1bmN0aW9ucygpLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pLFxuICAgICAgYWN0aXZlQ29sb3I6ICdncmVlbicsXG4gICAgICBpbkFjdGl2ZUNvbG9yOiAncmVkJyxcbiAgICAgIHNob3c6IHRydWUsXG4gICAgfSxcbiAgICB7XG4gICAgICBpY29uOiB0aGlzLmZhUGhvbmUsXG4gICAgICBhY3RpdmU6IHRoaXMuZW5kQ2FsbEFjdGl2ZS52YWx1ZSxcbiAgICAgIG9uUHJlc3M6ICgpID0+XG4gICAgICAgIHRoaXMubGF1bmNoQ29uZmlybUV4aXQubGF1bmNoQ29uZmlybUV4aXQoe1xuICAgICAgICAgIHVwZGF0ZUlzQ29uZmlybUV4aXRNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNDb25maXJtRXhpdE1vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuICAgICAgICAgIGlzQ29uZmlybUV4aXRNb2RhbFZpc2libGU6IHRoaXMuaXNDb25maXJtRXhpdE1vZGFsVmlzaWJsZS52YWx1ZSxcbiAgICAgICAgfSksXG4gICAgICBhY3RpdmVDb2xvcjogJ2dyZWVuJyxcbiAgICAgIGluQWN0aXZlQ29sb3I6ICdyZWQnLFxuICAgICAgc2hvdzogdHJ1ZSxcbiAgICB9LFxuICBdO1xuXG4gIHVwZGF0ZUNvbnRyb2xDaGF0QnV0dG9ucygpIHtcbiAgICB0aGlzLmNvbnRyb2xDaGF0QnV0dG9ucyA9IHRoaXMuY29udHJvbENoYXRCdXR0b25zQXJyYXkubWFwKChidXR0b24pID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLmJ1dHRvbixcbiAgICAgICAgc2hvdzogdHlwZW9mIGJ1dHRvbi5zaG93ID09PSAnZnVuY3Rpb24nID8gYnV0dG9uLnNob3coKSA6IGJ1dHRvbi5zaG93LFxuICAgICAgICBhY3RpdmU6IHR5cGVvZiBidXR0b24uYWN0aXZlID09PSAnZnVuY3Rpb24nID8gYnV0dG9uLmFjdGl2ZSgpIDogYnV0dG9uLmFjdGl2ZSxcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBzY3JlZW5TaGFyZVdpZGdldCA9IHtcbiAgICBjb21wb25lbnQ6IFNjcmVlblNoYXJlV2lkZ2V0LFxuICAgIGluamVjdG9yOiB0aGlzLmNyZWF0ZUluamVjdG9yKHsgZGlzYWJsZWQ6ICF0aGlzLnNjcmVlblNoYXJlQWN0aXZlLnZhbHVlIH0pLFxuICB9O1xuXG4gIGNvbnRyb2xCdXR0b25zID0gW1xuICAgIHtcbiAgICAgIGljb246IHRoaXMuZmFNaWNyb3Bob25lU2xhc2gsXG4gICAgICBhbHRlcm5hdGVJY29uOiB0aGlzLmZhTWljcm9waG9uZSxcbiAgICAgIGFjdGl2ZTogdGhpcy5taWNBY3RpdmUudmFsdWUsXG4gICAgICBvblByZXNzOiAoKSA9PlxuICAgICAgICB0aGlzLmNsaWNrQXVkaW8uY2xpY2tBdWRpbyh7XG4gICAgICAgICAgcGFyYW1ldGVyczoge1xuICAgICAgICAgICAgLi4udGhpcy5nZXRBbGxQYXJhbXMoKSxcbiAgICAgICAgICAgIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KSxcbiAgICAgIGFjdGl2ZUNvbG9yOiAnZ3JlZW4nLFxuICAgICAgaW5BY3RpdmVDb2xvcjogJ3JlZCcsXG4gICAgICBkaXNhYmxlZDogdGhpcy5hdWRpb1N3aXRjaGluZy52YWx1ZSxcbiAgICAgIHNob3c6IHRydWUsXG4gICAgfSxcbiAgICB7XG4gICAgICBpY29uOiB0aGlzLmZhVmlkZW9TbGFzaCxcbiAgICAgIGFsdGVybmF0ZUljb246IHRoaXMuZmFWaWRlbyxcbiAgICAgIGFjdGl2ZTogdGhpcy52aWRlb0FjdGl2ZS52YWx1ZSxcbiAgICAgIG9uUHJlc3M6ICgpID0+XG4gICAgICAgIHRoaXMuY2xpY2tWaWRlby5jbGlja1ZpZGVvKHtcbiAgICAgICAgICBwYXJhbWV0ZXJzOiB7XG4gICAgICAgICAgICAuLi50aGlzLmdldEFsbFBhcmFtcygpLFxuICAgICAgICAgICAgLi4udGhpcy5tZWRpYVNGVUZ1bmN0aW9ucygpLFxuICAgICAgICAgICAgTWVkaWFTdHJlYW0sXG4gICAgICAgICAgICBNZWRpYVN0cmVhbVRyYWNrLFxuICAgICAgICAgICAgbWVkaWFEZXZpY2VzOiBNZWRpYURldmljZXMsXG4gICAgICAgICAgICBkZXZpY2U6IHRoaXMuZGV2aWNlLnZhbHVlLFxuICAgICAgICAgICAgc29ja2V0OiB0aGlzLnNvY2tldC52YWx1ZSxcbiAgICAgICAgICAgIHNob3dBbGVydDogdGhpcy5zaG93QWxlcnQuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIGNoZWNrUGVybWlzc2lvbjogdGhpcy5jaGVja1Blcm1pc3Npb24uY2hlY2tQZXJtaXNzaW9uLFxuICAgICAgICAgICAgc3RyZWFtU3VjY2Vzc1ZpZGVvOiB0aGlzLnN0cmVhbVN1Y2Nlc3NWaWRlby5zdHJlYW1TdWNjZXNzVmlkZW8sXG4gICAgICAgICAgICBoYXNDYW1lcmFQZXJtaXNzaW9uOiB0aGlzLmhhc0NhbWVyYVBlcm1pc3Npb24udmFsdWUsXG4gICAgICAgICAgICByZXF1ZXN0UGVybWlzc2lvbkNhbWVyYTogdGhpcy5yZXF1ZXN0UGVybWlzc2lvbkNhbWVyYS5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgY2hlY2tNZWRpYVBlcm1pc3Npb246ICd3ZWInICE9PSAnd2ViJyxcbiAgICAgICAgICB9LFxuICAgICAgICB9KSxcbiAgICAgIGFjdGl2ZUNvbG9yOiAnZ3JlZW4nLFxuICAgICAgaW5BY3RpdmVDb2xvcjogJ3JlZCcsXG4gICAgICBkaXNhYmxlZDogdGhpcy52aWRlb1N3aXRjaGluZy52YWx1ZSxcbiAgICAgIHNob3c6IHRydWUsXG4gICAgfSxcbiAgICB7XG4gICAgICAvL2ludmVydGVkIGFjdGl2ZSBmb3IgaW5hY3RpdmUgc3RhdGVcbiAgICAgIGljb246IGZhRGVza3RvcCxcbiAgICAgIGFsdGVybmF0ZUljb25Db21wb25lbnQ6IHRoaXMuc2NyZWVuU2hhcmVXaWRnZXQsXG4gICAgICBhY3RpdmU6IHRydWUsXG4gICAgICBvblByZXNzOiAoKSA9PlxuICAgICAgICB0aGlzLmNsaWNrU2NyZWVuU2hhcmUuY2xpY2tTY3JlZW5TaGFyZSh7XG4gICAgICAgICAgcGFyYW1ldGVyczoge1xuICAgICAgICAgICAgLi4udGhpcy5nZXRBbGxQYXJhbXMoKSxcbiAgICAgICAgICAgIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KSxcbiAgICAgIGFjdGl2ZUNvbG9yOiAnZ3JlZW4nLFxuICAgICAgaW5BY3RpdmVDb2xvcjogJ3JlZCcsXG4gICAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgICBzaG93OiB0cnVlLFxuICAgIH0sXG4gICAge1xuICAgICAgaWNvbjogdGhpcy5mYVBob25lLFxuICAgICAgYWN0aXZlOiB0aGlzLmVuZENhbGxBY3RpdmUudmFsdWUsXG4gICAgICBvblByZXNzOiAoKSA9PlxuICAgICAgICB0aGlzLmxhdW5jaENvbmZpcm1FeGl0LmxhdW5jaENvbmZpcm1FeGl0KHtcbiAgICAgICAgICB1cGRhdGVJc0NvbmZpcm1FeGl0TW9kYWxWaXNpYmxlOiB0aGlzLnVwZGF0ZUlzQ29uZmlybUV4aXRNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcbiAgICAgICAgICBpc0NvbmZpcm1FeGl0TW9kYWxWaXNpYmxlOiB0aGlzLmlzQ29uZmlybUV4aXRNb2RhbFZpc2libGUudmFsdWUsXG4gICAgICAgIH0pLFxuICAgICAgYWN0aXZlQ29sb3I6ICdncmVlbicsXG4gICAgICBpbkFjdGl2ZUNvbG9yOiAncmVkJyxcbiAgICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICAgIHNob3c6IHRydWUsXG4gICAgfSxcbiAgICB7XG4gICAgICBpY29uOiB0aGlzLmZhVXNlcnMsXG4gICAgICBhY3RpdmU6IHRoaXMucGFydGljaXBhbnRzQWN0aXZlLnZhbHVlLFxuICAgICAgb25QcmVzczogKCkgPT5cbiAgICAgICAgdGhpcy5sYXVuY2hQYXJ0aWNpcGFudHMubGF1bmNoUGFydGljaXBhbnRzKHtcbiAgICAgICAgICB1cGRhdGVJc1BhcnRpY2lwYW50c01vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc1BhcnRpY2lwYW50c01vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuICAgICAgICAgIGlzUGFydGljaXBhbnRzTW9kYWxWaXNpYmxlOiB0aGlzLmlzUGFydGljaXBhbnRzTW9kYWxWaXNpYmxlLnZhbHVlLFxuICAgICAgICB9KSxcbiAgICAgIGFjdGl2ZUNvbG9yOiAnYmxhY2snLFxuICAgICAgaW5BY3RpdmVDb2xvcjogJ2JsYWNrJyxcbiAgICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICAgIHNob3c6IHRydWUsXG4gICAgfSxcbiAgICB7XG4gICAgICBjdXN0b21Db21wb25lbnQ6IHRoaXMubWVudVdpZGdldCxcbiAgICAgIGN1c3RvbU5hbWU6ICdNZW51JyxcbiAgICAgIG9uUHJlc3M6ICgpID0+XG4gICAgICAgIHRoaXMubGF1bmNoTWVudU1vZGFsLmxhdW5jaE1lbnVNb2RhbCh7XG4gICAgICAgICAgdXBkYXRlSXNNZW51TW9kYWxWaXNpYmxlOiB0aGlzLnVwZGF0ZUlzTWVudU1vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuICAgICAgICAgIGlzTWVudU1vZGFsVmlzaWJsZTogdGhpcy5pc01lbnVNb2RhbFZpc2libGUudmFsdWUsXG4gICAgICAgIH0pLFxuICAgICAgc2hvdzogdHJ1ZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGN1c3RvbUNvbXBvbmVudDogdGhpcy5tZXNzYWdlV2lkZ2V0LFxuICAgICAgY3VzdG9tTmFtZTogJ01lc3NhZ2VzJyxcbiAgICAgIG9uUHJlc3M6ICgpID0+XG4gICAgICAgIHRoaXMubGF1bmNoTWVzc2FnZXMubGF1bmNoTWVzc2FnZXMoe1xuICAgICAgICAgIHVwZGF0ZUlzTWVzc2FnZXNNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNNZXNzYWdlc01vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuICAgICAgICAgIGlzTWVzc2FnZXNNb2RhbFZpc2libGU6IHRoaXMuaXNNZXNzYWdlc01vZGFsVmlzaWJsZS52YWx1ZSxcbiAgICAgICAgfSksXG4gICAgICBzaG93OiB0cnVlLFxuICAgIH0sXG4gIF07XG5cbiAgYXN5bmMgY29ubmVjdF9Tb2NrZXQoXG4gICAgYXBpVXNlck5hbWU6IHN0cmluZyxcbiAgICBhcGlLZXk6IHN0cmluZyxcbiAgICBhcGlUb2tlbjogc3RyaW5nLFxuICApOiBQcm9taXNlPFNvY2tldCB8IG51bGw+IHtcbiAgICBpZiAodGhpcy5zb2NrZXQudmFsdWUgJiYgdGhpcy5zb2NrZXQudmFsdWUuaWQpIHtcbiAgICAgIHRoaXMuc29ja2V0LnZhbHVlLm9uKCdkaXNjb25uZWN0JywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBhd2FpdCB0aGlzLmRpc2Nvbm5lY3QuZGlzY29ubmVjdCh7XG4gICAgICAgICAgc2hvd0FsZXJ0OiB0aGlzLnNob3dBbGVydC5iaW5kKHRoaXMpLFxuICAgICAgICAgIHJlZGlyZWN0VVJMOiB0aGlzLnJlZGlyZWN0VVJMLnZhbHVlLFxuICAgICAgICAgIG9uV2ViOiB0cnVlLFxuICAgICAgICAgIHVwZGF0ZVZhbGlkYXRlZDogdGhpcy51cGRhdGVWYWxpZGF0ZWQuYmluZCh0aGlzKSxcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh0aGlzLnZpZGVvQWxyZWFkeU9uLnZhbHVlKSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5jbGlja1ZpZGVvLmNsaWNrVmlkZW8oe1xuICAgICAgICAgICAgcGFyYW1ldGVyczogeyAuLi50aGlzLmdldEFsbFBhcmFtcygpLCAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCkgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5hdWRpb0FscmVhZHlPbi52YWx1ZSkge1xuICAgICAgICAgIGF3YWl0IHRoaXMuY2xpY2tBdWRpby5jbGlja0F1ZGlvKHtcbiAgICAgICAgICAgIHBhcmFtZXRlcnM6IHsgLi4udGhpcy5nZXRBbGxQYXJhbXMoKSwgLi4udGhpcy5tZWRpYVNGVUZ1bmN0aW9ucygpIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBhd2FpdCB0aGlzLmNsb3NlQW5kUmVzZXQoKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnNvY2tldC52YWx1ZS5vbignYWxsTWVtYmVycycsIGFzeW5jIChtZW1iZXJzRGF0YTogQWxsTWVtYmVyc0RhdGEpID0+IHtcbiAgICAgICAgaWYgKG1lbWJlcnNEYXRhKSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5hbGxNZW1iZXJzLmFsbE1lbWJlcnMoe1xuICAgICAgICAgICAgYXBpVXNlck5hbWU6IGFwaVVzZXJOYW1lLFxuICAgICAgICAgICAgYXBpS2V5OiAnJywgLy9ub3QgcmVjb21tZW5kZWQgLSB1c2UgYXBpVG9rZW4gaW5zdGVhZC4gVXNlIGZvciB0ZXN0aW5nL2RldmVsb3BtZW50IG9ubHlcbiAgICAgICAgICAgIGFwaVRva2VuOiBhcGlUb2tlbixcbiAgICAgICAgICAgIG1lbWJlcnM6IG1lbWJlcnNEYXRhLm1lbWJlcnMsXG4gICAgICAgICAgICByZXF1ZXN0c3M6IG1lbWJlcnNEYXRhLnJlcXVlc3RzID8gbWVtYmVyc0RhdGEucmVxdWVzdHMgOiB0aGlzLnJlcXVlc3RMaXN0LnZhbHVlLFxuICAgICAgICAgICAgY29Ib3N0ZTogbWVtYmVyc0RhdGEuY29Ib3N0ID8gbWVtYmVyc0RhdGEuY29Ib3N0IDogdGhpcy5jb0hvc3QudmFsdWUsXG4gICAgICAgICAgICBjb0hvc3RSZXM6IG1lbWJlcnNEYXRhLmNvSG9zdFJlc3BvbnNpYmlsaXRpZXNcbiAgICAgICAgICAgICAgPyBtZW1iZXJzRGF0YS5jb0hvc3RSZXNwb25zaWJpbGl0aWVzXG4gICAgICAgICAgICAgIDogdGhpcy5jb0hvc3RSZXNwb25zaWJpbGl0eS52YWx1ZSxcbiAgICAgICAgICAgIHBhcmFtZXRlcnM6IHsgLi4udGhpcy5nZXRBbGxQYXJhbXMoKSwgLi4udGhpcy5tZWRpYVNGVUZ1bmN0aW9ucygpIH0sXG4gICAgICAgICAgICBjb25zdW1lX3NvY2tldHM6IHRoaXMuY29uc3VtZV9zb2NrZXRzLnZhbHVlLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5zb2NrZXQudmFsdWUub24oJ2FsbE1lbWJlcnNSZXN0JywgYXN5bmMgKG1lbWJlcnNEYXRhOiBBbGxNZW1iZXJzUmVzdERhdGEpID0+IHtcbiAgICAgICAgaWYgKG1lbWJlcnNEYXRhKSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5hbGxNZW1iZXJzUmVzdC5hbGxNZW1iZXJzUmVzdCh7XG4gICAgICAgICAgICBhcGlVc2VyTmFtZTogYXBpVXNlck5hbWUsXG4gICAgICAgICAgICBhcGlLZXk6ICcnLCAvLyBub3QgcmVjb21tZW5kZWQgLSB1c2UgYXBpVG9rZW4gaW5zdGVhZC4gVXNlIGZvciB0ZXN0aW5nL2RldmVsb3BtZW50IG9ubHlcbiAgICAgICAgICAgIG1lbWJlcnM6IG1lbWJlcnNEYXRhLm1lbWJlcnMsXG4gICAgICAgICAgICBhcGlUb2tlbjogYXBpVG9rZW4sXG4gICAgICAgICAgICBzZXR0aW5nczogbWVtYmVyc0RhdGEuc2V0dGluZ3MsXG4gICAgICAgICAgICBjb0hvc3RlOiBtZW1iZXJzRGF0YS5jb0hvc3QgPyBtZW1iZXJzRGF0YS5jb0hvc3QgOiB0aGlzLmNvSG9zdC52YWx1ZSxcbiAgICAgICAgICAgIGNvSG9zdFJlczogbWVtYmVyc0RhdGEuY29Ib3N0UmVzcG9uc2liaWxpdGllc1xuICAgICAgICAgICAgICA/IG1lbWJlcnNEYXRhLmNvSG9zdFJlc3BvbnNpYmlsaXRpZXNcbiAgICAgICAgICAgICAgOiB0aGlzLmNvSG9zdFJlc3BvbnNpYmlsaXR5LnZhbHVlLFxuICAgICAgICAgICAgcGFyYW1ldGVyczogeyAuLi50aGlzLmdldEFsbFBhcmFtcygpLCAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCkgfSxcbiAgICAgICAgICAgIGNvbnN1bWVfc29ja2V0czogdGhpcy5jb25zdW1lX3NvY2tldHMudmFsdWUsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnNvY2tldC52YWx1ZS5vbigndXNlcldhaXRpbmcnLCBhc3luYyAoeyBuYW1lIH06IHsgbmFtZTogc3RyaW5nIH0pID0+IHtcbiAgICAgICAgYXdhaXQgdGhpcy51c2VyV2FpdGluZy51c2VyV2FpdGluZyh7XG4gICAgICAgICAgbmFtZSxcbiAgICAgICAgICBzaG93QWxlcnQ6IHRoaXMuc2hvd0FsZXJ0LmJpbmQodGhpcyksXG4gICAgICAgICAgdG90YWxSZXFXYWl0OiB0aGlzLnRvdGFsUmVxV2FpdC52YWx1ZSxcbiAgICAgICAgICB1cGRhdGVUb3RhbFJlcVdhaXQ6IHRoaXMudXBkYXRlVG90YWxSZXFXYWl0LmJpbmQodGhpcyksXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuc29ja2V0LnZhbHVlLm9uKCdwZXJzb25Kb2luZWQnLCBhc3luYyAoeyBuYW1lIH06IHsgbmFtZTogc3RyaW5nIH0pID0+IHtcbiAgICAgICAgdGhpcy5wZXJzb25Kb2luZWQucGVyc29uSm9pbmVkKHtcbiAgICAgICAgICBuYW1lLFxuICAgICAgICAgIHNob3dBbGVydDogdGhpcy5zaG93QWxlcnQuYmluZCh0aGlzKSxcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5zb2NrZXQudmFsdWUub24oXG4gICAgICAgICdhbGxXYWl0aW5nUm9vbU1lbWJlcnMnLFxuICAgICAgICBhc3luYyAod2FpdGluZ19kYXRhOiBBbGxXYWl0aW5nUm9vbU1lbWJlcnNEYXRhKSA9PiB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5hbGxXYWl0aW5nUm9vbU1lbWJlcnMuYWxsV2FpdGluZ1Jvb21NZW1iZXJzKHtcbiAgICAgICAgICAgIHdhaXRpbmdQYXJ0aWNpcGFudHM6IHdhaXRpbmdfZGF0YS53YWl0aW5nUGFydGljaXBhbnRzXG4gICAgICAgICAgICAgID8gd2FpdGluZ19kYXRhLndhaXRpbmdQYXJ0aWNpcGFudHNcbiAgICAgICAgICAgICAgOiB3YWl0aW5nX2RhdGEud2FpdGluZ1BhcnRpY2lwYW50c3NcbiAgICAgICAgICAgICAgPyB3YWl0aW5nX2RhdGEud2FpdGluZ1BhcnRpY2lwYW50c3NcbiAgICAgICAgICAgICAgOiB0aGlzLndhaXRpbmdSb29tTGlzdC52YWx1ZSxcbiAgICAgICAgICAgIHVwZGF0ZVRvdGFsUmVxV2FpdDogdGhpcy51cGRhdGVUb3RhbFJlcVdhaXQuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIHVwZGF0ZVdhaXRpbmdSb29tTGlzdDogdGhpcy51cGRhdGVXYWl0aW5nUm9vbUxpc3QuYmluZCh0aGlzKSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICk7XG5cbiAgICAgIHRoaXMuc29ja2V0LnZhbHVlLm9uKFxuICAgICAgICAncm9vbVJlY29yZFBhcmFtcycsXG4gICAgICAgIGFzeW5jICh7IHJlY29yZFBhcmFtcyB9OiB7IHJlY29yZFBhcmFtczogUmVjb3JkUGFyYW1zIH0pID0+IHtcbiAgICAgICAgICB0aGlzLnJvb21SZWNvcmRQYXJhbXMucm9vbVJlY29yZFBhcmFtcyh7XG4gICAgICAgICAgICByZWNvcmRQYXJhbXMsXG4gICAgICAgICAgICBwYXJhbWV0ZXJzOiB7IC4uLnRoaXMuZ2V0QWxsUGFyYW1zKCksIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgKTtcblxuICAgICAgdGhpcy5zb2NrZXQudmFsdWUub24oJ2JhbicsIGFzeW5jICh7IG5hbWUgfTogeyBuYW1lOiBzdHJpbmcgfSkgPT4ge1xuICAgICAgICBhd2FpdCB0aGlzLmJhblBhcnRpY2lwYW50LmJhblBhcnRpY2lwYW50KHtcbiAgICAgICAgICBuYW1lLFxuICAgICAgICAgIHBhcmFtZXRlcnM6IHsgLi4udGhpcy5nZXRBbGxQYXJhbXMoKSwgLi4udGhpcy5tZWRpYVNGVUZ1bmN0aW9ucygpIH0sXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuc29ja2V0LnZhbHVlLm9uKCd1cGRhdGVkQ29Ib3N0JywgYXN5bmMgKGNvaG9zdF9kYXRhOiBVcGRhdGVkQ29Ib3N0RGF0YSkgPT4ge1xuICAgICAgICBhd2FpdCB0aGlzLnVwZGF0ZWRDb0hvc3QudXBkYXRlZENvSG9zdCh7XG4gICAgICAgICAgY29Ib3N0OiBjb2hvc3RfZGF0YS5jb0hvc3QgPyBjb2hvc3RfZGF0YS5jb0hvc3QgOiB0aGlzLmNvSG9zdC52YWx1ZSxcbiAgICAgICAgICBjb0hvc3RSZXNwb25zaWJpbGl0eTogY29ob3N0X2RhdGEuY29Ib3N0UmVzcG9uc2liaWxpdGllc1xuICAgICAgICAgICAgPyBjb2hvc3RfZGF0YS5jb0hvc3RSZXNwb25zaWJpbGl0aWVzXG4gICAgICAgICAgICA6IHRoaXMuY29Ib3N0UmVzcG9uc2liaWxpdHkudmFsdWUsXG4gICAgICAgICAgeW91QXJlQ29Ib3N0OiB0aGlzLnlvdUFyZUNvSG9zdC52YWx1ZSxcbiAgICAgICAgICB1cGRhdGVDb0hvc3Q6IHRoaXMudXBkYXRlQ29Ib3N0LmJpbmQodGhpcyksXG4gICAgICAgICAgdXBkYXRlQ29Ib3N0UmVzcG9uc2liaWxpdHk6IHRoaXMudXBkYXRlQ29Ib3N0UmVzcG9uc2liaWxpdHkuYmluZCh0aGlzKSxcbiAgICAgICAgICB1cGRhdGVZb3VBcmVDb0hvc3Q6IHRoaXMudXBkYXRlWW91QXJlQ29Ib3N0LmJpbmQodGhpcyksXG4gICAgICAgICAgc2hvd0FsZXJ0OiB0aGlzLnNob3dBbGVydC5iaW5kKHRoaXMpLFxuICAgICAgICAgIGV2ZW50VHlwZTogdGhpcy5ldmVudFR5cGUudmFsdWUsXG4gICAgICAgICAgaXNsZXZlbDogdGhpcy5pc2xldmVsLnZhbHVlLFxuICAgICAgICAgIG1lbWJlcjogdGhpcy5tZW1iZXIudmFsdWUsXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuc29ja2V0LnZhbHVlLm9uKFxuICAgICAgICAncGFydGljaXBhbnRSZXF1ZXN0ZWQnLFxuICAgICAgICBhc3luYyAoeyB1c2VyUmVxdWVzdCB9OiB7IHVzZXJSZXF1ZXN0OiBSZXF1ZXN0IH0pID0+IHtcbiAgICAgICAgICBhd2FpdCB0aGlzLnBhcnRpY2lwYW50UmVxdWVzdGVkLnBhcnRpY2lwYW50UmVxdWVzdGVkKHtcbiAgICAgICAgICAgIHVzZXJSZXF1ZXN0LFxuICAgICAgICAgICAgcmVxdWVzdExpc3Q6IHRoaXMucmVxdWVzdExpc3QudmFsdWUsXG4gICAgICAgICAgICB3YWl0aW5nUm9vbUxpc3Q6IHRoaXMud2FpdGluZ1Jvb21MaXN0LnZhbHVlLFxuICAgICAgICAgICAgdXBkYXRlVG90YWxSZXFXYWl0OiB0aGlzLnVwZGF0ZVRvdGFsUmVxV2FpdC5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgdXBkYXRlUmVxdWVzdExpc3Q6IHRoaXMudXBkYXRlUmVxdWVzdExpc3QuYmluZCh0aGlzKSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICk7XG5cbiAgICAgIHRoaXMuc29ja2V0LnZhbHVlLm9uKCdzY3JlZW5Qcm9kdWNlcklkJywgYXN5bmMgKHsgcHJvZHVjZXJJZCB9OiB7IHByb2R1Y2VySWQ6IHN0cmluZyB9KSA9PiB7XG4gICAgICAgIHRoaXMuc2NyZWVuUHJvZHVjZXJJZC5zY3JlZW5Qcm9kdWNlcklkKHtcbiAgICAgICAgICBwcm9kdWNlcklkLFxuICAgICAgICAgIHNjcmVlbklkOiB0aGlzLnNjcmVlbklkLnZhbHVlLFxuICAgICAgICAgIG1lbWJlcnNSZWNlaXZlZDogdGhpcy5tZW1iZXJzUmVjZWl2ZWQudmFsdWUsXG4gICAgICAgICAgc2hhcmVTY3JlZW5TdGFydGVkOiB0aGlzLnNoYXJlU2NyZWVuU3RhcnRlZC52YWx1ZSxcbiAgICAgICAgICBkZWZlclNjcmVlblJlY2VpdmVkOiB0aGlzLmRlZmVyU2NyZWVuUmVjZWl2ZWQudmFsdWUsXG4gICAgICAgICAgcGFydGljaXBhbnRzOiB0aGlzLnBhcnRpY2lwYW50cy52YWx1ZSxcbiAgICAgICAgICB1cGRhdGVTY3JlZW5JZDogdGhpcy51cGRhdGVTY3JlZW5JZC5iaW5kKHRoaXMpLFxuICAgICAgICAgIHVwZGF0ZVNoYXJlU2NyZWVuU3RhcnRlZDogdGhpcy51cGRhdGVTaGFyZVNjcmVlblN0YXJ0ZWQuYmluZCh0aGlzKSxcbiAgICAgICAgICB1cGRhdGVEZWZlclNjcmVlblJlY2VpdmVkOiB0aGlzLnVwZGF0ZURlZmVyU2NyZWVuUmVjZWl2ZWQuYmluZCh0aGlzKSxcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIC8vc2V0dGluZ3MsIHVwZGF0ZUF1ZGlvU2V0dGluZywgdXBkYXRlVmlkZW9TZXR0aW5nLCB1cGRhdGVTY3JlZW5zaGFyZVNldHRpbmcsIHVwZGF0ZUNoYXRTZXR0aW5nXG4gICAgICB0aGlzLnNvY2tldC52YWx1ZS5vbigndXBkYXRlTWVkaWFTZXR0aW5ncycsIGFzeW5jICh7IHNldHRpbmdzIH06IHsgc2V0dGluZ3M6IFNldHRpbmdzIH0pID0+IHtcbiAgICAgICAgdGhpcy51cGRhdGVNZWRpYVNldHRpbmdzLnVwZGF0ZU1lZGlhU2V0dGluZ3Moe1xuICAgICAgICAgIHNldHRpbmdzLFxuICAgICAgICAgIHVwZGF0ZUF1ZGlvU2V0dGluZzogdGhpcy51cGRhdGVBdWRpb1NldHRpbmcuYmluZCh0aGlzKSxcbiAgICAgICAgICB1cGRhdGVWaWRlb1NldHRpbmc6IHRoaXMudXBkYXRlVmlkZW9TZXR0aW5nLmJpbmQodGhpcyksXG4gICAgICAgICAgdXBkYXRlU2NyZWVuc2hhcmVTZXR0aW5nOiB0aGlzLnVwZGF0ZVNjcmVlbnNoYXJlU2V0dGluZy5iaW5kKHRoaXMpLFxuICAgICAgICAgIHVwZGF0ZUNoYXRTZXR0aW5nOiB0aGlzLnVwZGF0ZUNoYXRTZXR0aW5nLmJpbmQodGhpcyksXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuc29ja2V0LnZhbHVlLm9uKFxuICAgICAgICAncHJvZHVjZXItbWVkaWEtcGF1c2VkJyxcbiAgICAgICAgYXN5bmMgKHtcbiAgICAgICAgICBwcm9kdWNlcklkLFxuICAgICAgICAgIGtpbmQsXG4gICAgICAgICAgbmFtZSxcbiAgICAgICAgfToge1xuICAgICAgICAgIHByb2R1Y2VySWQ6IHN0cmluZztcbiAgICAgICAgICBraW5kOiAndmlkZW8nIHwgJ2F1ZGlvJyB8ICdzY3JlZW5zaGFyZScgfCAnc2NyZWVuJztcbiAgICAgICAgICBuYW1lOiBzdHJpbmc7XG4gICAgICAgIH0pID0+IHtcbiAgICAgICAgICBhd2FpdCB0aGlzLnByb2R1Y2VyTWVkaWFQYXVzZWQucHJvZHVjZXJNZWRpYVBhdXNlZCh7XG4gICAgICAgICAgICBwcm9kdWNlcklkLFxuICAgICAgICAgICAga2luZCxcbiAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICBwYXJhbWV0ZXJzOiB7IC4uLnRoaXMuZ2V0QWxsUGFyYW1zKCksIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgKTtcblxuICAgICAgdGhpcy5zb2NrZXQudmFsdWUub24oXG4gICAgICAgICdwcm9kdWNlci1tZWRpYS1yZXN1bWVkJyxcbiAgICAgICAgYXN5bmMgKHsga2luZCwgbmFtZSB9OiB7IGtpbmQ6ICdhdWRpbyc7IG5hbWU6IHN0cmluZyB9KSA9PiB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5wcm9kdWNlck1lZGlhUmVzdW1lZC5wcm9kdWNlck1lZGlhUmVzdW1lZCh7XG4gICAgICAgICAgICBraW5kLFxuICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgIHBhcmFtZXRlcnM6IHsgLi4udGhpcy5nZXRBbGxQYXJhbXMoKSwgLi4udGhpcy5tZWRpYVNGVUZ1bmN0aW9ucygpIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICApO1xuXG4gICAgICB0aGlzLnNvY2tldC52YWx1ZS5vbihcbiAgICAgICAgJ3Byb2R1Y2VyLW1lZGlhLWNsb3NlZCcsXG4gICAgICAgIGFzeW5jICh7XG4gICAgICAgICAgcHJvZHVjZXJJZCxcbiAgICAgICAgICBraW5kLFxuICAgICAgICB9OiB7XG4gICAgICAgICAgcHJvZHVjZXJJZDogc3RyaW5nO1xuICAgICAgICAgIGtpbmQ6ICd2aWRlbycgfCAnYXVkaW8nIHwgJ3NjcmVlbnNoYXJlJyB8ICdzY3JlZW4nO1xuICAgICAgICB9KSA9PiB7XG4gICAgICAgICAgaWYgKHByb2R1Y2VySWQgJiYga2luZCkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wcm9kdWNlck1lZGlhQ2xvc2VkLnByb2R1Y2VyTWVkaWFDbG9zZWQoe1xuICAgICAgICAgICAgICBwcm9kdWNlcklkLFxuICAgICAgICAgICAgICBraW5kLFxuICAgICAgICAgICAgICBwYXJhbWV0ZXJzOiB7IC4uLnRoaXMuZ2V0QWxsUGFyYW1zKCksIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgKTtcblxuICAgICAgdGhpcy5zb2NrZXQudmFsdWUub24oXG4gICAgICAgICdjb250cm9sTWVkaWFIb3N0JyxcbiAgICAgICAgYXN5bmMgKHsgdHlwZSB9OiB7IHR5cGU6ICd2aWRlbycgfCAnYXVkaW8nIHwgJ3NjcmVlbnNoYXJlJyB8ICdjaGF0JyB8ICdhbGwnIH0pID0+IHtcbiAgICAgICAgICBhd2FpdCB0aGlzLmNvbnRyb2xNZWRpYUhvc3QuY29udHJvbE1lZGlhSG9zdCh7XG4gICAgICAgICAgICB0eXBlLFxuICAgICAgICAgICAgcGFyYW1ldGVyczogeyAuLi50aGlzLmdldEFsbFBhcmFtcygpLCAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCkgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICk7XG5cbiAgICAgIHRoaXMuc29ja2V0LnZhbHVlLm9uKCdtZWV0aW5nRW5kZWQnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGF3YWl0IHRoaXMubWVldGluZ0VuZGVkLm1lZXRpbmdFbmRlZCh7XG4gICAgICAgICAgc2hvd0FsZXJ0OiB0aGlzLnNob3dBbGVydC5iaW5kKHRoaXMpLFxuICAgICAgICAgIHJlZGlyZWN0VVJMOiB0aGlzLnJlZGlyZWN0VVJMLnZhbHVlLFxuICAgICAgICAgIG9uV2ViOiB0cnVlLFxuICAgICAgICAgIGV2ZW50VHlwZTogdGhpcy5ldmVudFR5cGUudmFsdWUsXG4gICAgICAgICAgdXBkYXRlVmFsaWRhdGVkOiB0aGlzLnVwZGF0ZVZhbGlkYXRlZC5iaW5kKHRoaXMpLFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodGhpcy52aWRlb0FscmVhZHlPbi52YWx1ZSkge1xuICAgICAgICAgIGF3YWl0IHRoaXMuY2xpY2tWaWRlby5jbGlja1ZpZGVvKHtcbiAgICAgICAgICAgIHBhcmFtZXRlcnM6IHtcbiAgICAgICAgICAgICAgLi4udGhpcy5nZXRBbGxQYXJhbXMoKSxcbiAgICAgICAgICAgICAgLi4udGhpcy5tZWRpYVNGVUZ1bmN0aW9ucygpLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5hdWRpb0FscmVhZHlPbi52YWx1ZSkge1xuICAgICAgICAgIGF3YWl0IHRoaXMuY2xpY2tBdWRpby5jbGlja0F1ZGlvKHtcbiAgICAgICAgICAgIHBhcmFtZXRlcnM6IHtcbiAgICAgICAgICAgICAgLi4udGhpcy5nZXRBbGxQYXJhbXMoKSxcbiAgICAgICAgICAgICAgLi4udGhpcy5tZWRpYVNGVUZ1bmN0aW9ucygpLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGF3YWl0IHRoaXMuY2xvc2VBbmRSZXNldCgpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuc29ja2V0LnZhbHVlLm9uKCdkaXNjb25uZWN0VXNlclNlbGYnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGF3YWl0IHRoaXMuZGlzY29ubmVjdFVzZXJTZWxmLmRpc2Nvbm5lY3RVc2VyU2VsZih7XG4gICAgICAgICAgc29ja2V0OiB0aGlzLnNvY2tldC52YWx1ZSxcbiAgICAgICAgICBtZW1iZXI6IHRoaXMubWVtYmVyLnZhbHVlLFxuICAgICAgICAgIHJvb21OYW1lOiB0aGlzLnJvb21OYW1lLnZhbHVlLFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnNvY2tldC52YWx1ZS5vbigncmVjZWl2ZU1lc3NhZ2UnLCBhc3luYyAoeyBtZXNzYWdlIH06IHsgbWVzc2FnZTogTWVzc2FnZSB9KSA9PiB7XG4gICAgICAgIGF3YWl0IHRoaXMucmVjZWl2ZU1lc3NhZ2UucmVjZWl2ZU1lc3NhZ2Uoe1xuICAgICAgICAgIG1lc3NhZ2UsXG4gICAgICAgICAgbWVzc2FnZXM6IHRoaXMubWVzc2FnZXMudmFsdWUsXG4gICAgICAgICAgcGFydGljaXBhbnRzQWxsOiB0aGlzLnBhcnRpY2lwYW50c0FsbC52YWx1ZSxcbiAgICAgICAgICBtZW1iZXI6IHRoaXMubWVtYmVyLnZhbHVlLFxuICAgICAgICAgIGV2ZW50VHlwZTogdGhpcy5ldmVudFR5cGUudmFsdWUsXG4gICAgICAgICAgaXNsZXZlbDogdGhpcy5pc2xldmVsLnZhbHVlLFxuICAgICAgICAgIGNvSG9zdDogdGhpcy5jb0hvc3QudmFsdWUsXG4gICAgICAgICAgdXBkYXRlTWVzc2FnZXM6IHRoaXMudXBkYXRlTWVzc2FnZXMuYmluZCh0aGlzKSxcbiAgICAgICAgICB1cGRhdGVTaG93TWVzc2FnZXNCYWRnZTogdGhpcy51cGRhdGVTaG93TWVzc2FnZXNCYWRnZS5iaW5kKHRoaXMpLFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnNvY2tldC52YWx1ZS5vbihcbiAgICAgICAgJ21lZXRpbmdUaW1lUmVtYWluaW5nJyxcbiAgICAgICAgYXN5bmMgKHsgdGltZVJlbWFpbmluZyB9OiB7IHRpbWVSZW1haW5pbmc6IG51bWJlciB9KSA9PiB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5tZWV0aW5nVGltZVJlbWFpbmluZy5tZWV0aW5nVGltZVJlbWFpbmluZyh7XG4gICAgICAgICAgICB0aW1lUmVtYWluaW5nLFxuICAgICAgICAgICAgc2hvd0FsZXJ0OiB0aGlzLnNob3dBbGVydC5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgZXZlbnRUeXBlOiB0aGlzLmV2ZW50VHlwZS52YWx1ZSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICk7XG5cbiAgICAgIHRoaXMuc29ja2V0LnZhbHVlLm9uKCdtZWV0aW5nU3RpbGxUaGVyZScsIGFzeW5jICgpID0+IHtcbiAgICAgICAgdGhpcy5tZWV0aW5nU3RpbGxUaGVyZS5tZWV0aW5nU3RpbGxUaGVyZSh7XG4gICAgICAgICAgdXBkYXRlSXNDb25maXJtSGVyZU1vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc0NvbmZpcm1IZXJlTW9kYWxWaXNpYmxlLmJpbmQodGhpcyksXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuc29ja2V0LnZhbHVlLm9uKCdzdGFydFJlY29yZHMnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGF3YWl0IHRoaXMuc3RhcnRSZWNvcmRzLnN0YXJ0UmVjb3Jkcyh7XG4gICAgICAgICAgcm9vbU5hbWU6IHRoaXMucm9vbU5hbWUudmFsdWUsXG4gICAgICAgICAgbWVtYmVyOiB0aGlzLm1lbWJlci52YWx1ZSxcbiAgICAgICAgICBzb2NrZXQ6IHRoaXMuc29ja2V0LnZhbHVlLFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnNvY2tldC52YWx1ZS5vbigncmVJbml0aWF0ZVJlY29yZGluZycsIGFzeW5jICgpID0+IHtcbiAgICAgICAgYXdhaXQgdGhpcy5yZUluaXRpYXRlUmVjb3JkaW5nLnJlSW5pdGlhdGVSZWNvcmRpbmcoe1xuICAgICAgICAgIHJvb21OYW1lOiB0aGlzLnJvb21OYW1lLnZhbHVlLFxuICAgICAgICAgIG1lbWJlcjogdGhpcy5tZW1iZXIudmFsdWUsXG4gICAgICAgICAgc29ja2V0OiB0aGlzLnNvY2tldC52YWx1ZSxcbiAgICAgICAgICBhZG1pblJlc3RyaWN0U2V0dGluZzogdGhpcy5hZG1pblJlc3RyaWN0U2V0dGluZy52YWx1ZSxcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5zb2NrZXQudmFsdWUub24oXG4gICAgICAgICd1cGRhdGVDb25zdW1pbmdEb21haW5zJyxcbiAgICAgICAgYXN5bmMgKHsgZG9tYWlucywgYWx0X2RvbWFpbnMgfTogVXBkYXRlQ29uc3VtaW5nRG9tYWluc0RhdGEpID0+IHtcbiAgICAgICAgICBhd2FpdCB0aGlzLnVwZGF0ZUNvbnN1bWluZ0RvbWFpbnMudXBkYXRlQ29uc3VtaW5nRG9tYWlucyh7XG4gICAgICAgICAgICBkb21haW5zLFxuICAgICAgICAgICAgYWx0X2RvbWFpbnMsXG4gICAgICAgICAgICBhcGlVc2VyTmFtZSxcbiAgICAgICAgICAgIGFwaUtleSxcbiAgICAgICAgICAgIGFwaVRva2VuLFxuICAgICAgICAgICAgcGFyYW1ldGVyczoge1xuICAgICAgICAgICAgICAuLi50aGlzLmdldEFsbFBhcmFtcygpLFxuICAgICAgICAgICAgICAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgKTtcblxuICAgICAgdGhpcy5zb2NrZXQudmFsdWUub24oXG4gICAgICAgICdSZWNvcmRpbmdOb3RpY2UnLFxuICAgICAgICBhc3luYyAoeyBzdGF0ZSwgdXNlclJlY29yZGluZ1BhcmFtLCBwYXVzZUNvdW50LCB0aW1lRG9uZSB9OiBSZWNvcmRpbmdOb3RpY2VEYXRhKSA9PiB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5yZWNvcmRpbmdOb3RpY2UuUmVjb3JkaW5nTm90aWNlKHtcbiAgICAgICAgICAgIHN0YXRlLFxuICAgICAgICAgICAgdXNlclJlY29yZGluZ1BhcmFtLFxuICAgICAgICAgICAgcGF1c2VDb3VudCxcbiAgICAgICAgICAgIHRpbWVEb25lLFxuICAgICAgICAgICAgcGFyYW1ldGVyczogeyAuLi50aGlzLmdldEFsbFBhcmFtcygpLCAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCkgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICk7XG5cbiAgICAgIHRoaXMuc29ja2V0LnZhbHVlLm9uKCd0aW1lTGVmdFJlY29yZGluZycsIGFzeW5jICh7IHRpbWVMZWZ0IH06IHsgdGltZUxlZnQ6IG51bWJlciB9KSA9PiB7XG4gICAgICAgIHRoaXMudGltZUxlZnRSZWNvcmRpbmcudGltZUxlZnRSZWNvcmRpbmcoe1xuICAgICAgICAgIHRpbWVMZWZ0LFxuICAgICAgICAgIHNob3dBbGVydDogdGhpcy5zaG93QWxlcnQuYmluZCh0aGlzKSxcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5zb2NrZXQudmFsdWUub24oXG4gICAgICAgICdzdG9wcGVkUmVjb3JkaW5nJyxcbiAgICAgICAgYXN5bmMgKHsgc3RhdGUsIHJlYXNvbiB9OiB7IHN0YXRlOiBzdHJpbmc7IHJlYXNvbjogc3RyaW5nIH0pID0+IHtcbiAgICAgICAgICBhd2FpdCB0aGlzLnN0b3BwZWRSZWNvcmRpbmcuc3RvcHBlZFJlY29yZGluZyh7XG4gICAgICAgICAgICBzdGF0ZSxcbiAgICAgICAgICAgIHJlYXNvbixcbiAgICAgICAgICAgIHNob3dBbGVydDogdGhpcy5zaG93QWxlcnQuYmluZCh0aGlzKSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICk7XG4gICAgICB0aGlzLnNvY2tldC52YWx1ZS5vbihcbiAgICAgICAgJ2hvc3RSZXF1ZXN0UmVzcG9uc2UnLFxuICAgICAgICAoeyByZXF1ZXN0UmVzcG9uc2UgfTogSG9zdFJlcXVlc3RSZXNwb25zZURhdGEpID0+IHtcbiAgICAgICAgICB0aGlzLmhvc3RSZXF1ZXN0UmVzcG9uc2UuaG9zdFJlcXVlc3RSZXNwb25zZSh7XG4gICAgICAgICAgICByZXF1ZXN0UmVzcG9uc2UsXG4gICAgICAgICAgICBzaG93QWxlcnQ6IHRoaXMuc2hvd0FsZXJ0LmJpbmQodGhpcyksXG4gICAgICAgICAgICByZXF1ZXN0TGlzdDogdGhpcy5yZXF1ZXN0TGlzdC52YWx1ZSxcbiAgICAgICAgICAgIHVwZGF0ZVJlcXVlc3RMaXN0OiB0aGlzLnVwZGF0ZVJlcXVlc3RMaXN0LmJpbmQodGhpcyksXG4gICAgICAgICAgICB1cGRhdGVNaWNBY3Rpb246IHRoaXMudXBkYXRlTWljQWN0aW9uLmJpbmQodGhpcyksXG4gICAgICAgICAgICB1cGRhdGVWaWRlb0FjdGlvbjogdGhpcy51cGRhdGVWaWRlb0FjdGlvbi5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgdXBkYXRlU2NyZWVuQWN0aW9uOiB0aGlzLnVwZGF0ZVNjcmVlbkFjdGlvbi5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgdXBkYXRlQ2hhdEFjdGlvbjogdGhpcy51cGRhdGVDaGF0QWN0aW9uLmJpbmQodGhpcyksXG4gICAgICAgICAgICB1cGRhdGVBdWRpb1JlcXVlc3RTdGF0ZTogdGhpcy51cGRhdGVBdWRpb1JlcXVlc3RTdGF0ZS5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgdXBkYXRlVmlkZW9SZXF1ZXN0U3RhdGU6IHRoaXMudXBkYXRlVmlkZW9SZXF1ZXN0U3RhdGUuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIHVwZGF0ZVNjcmVlblJlcXVlc3RTdGF0ZTogdGhpcy51cGRhdGVTY3JlZW5SZXF1ZXN0U3RhdGUuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIHVwZGF0ZUNoYXRSZXF1ZXN0U3RhdGU6IHRoaXMudXBkYXRlQ2hhdFJlcXVlc3RTdGF0ZS5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgdXBkYXRlQXVkaW9SZXF1ZXN0VGltZTogdGhpcy51cGRhdGVBdWRpb1JlcXVlc3RUaW1lLmJpbmQodGhpcyksXG4gICAgICAgICAgICB1cGRhdGVWaWRlb1JlcXVlc3RUaW1lOiB0aGlzLnVwZGF0ZVZpZGVvUmVxdWVzdFRpbWUuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIHVwZGF0ZVNjcmVlblJlcXVlc3RUaW1lOiB0aGlzLnVwZGF0ZVNjcmVlblJlcXVlc3RUaW1lLmJpbmQodGhpcyksXG4gICAgICAgICAgICB1cGRhdGVDaGF0UmVxdWVzdFRpbWU6IHRoaXMudXBkYXRlQ2hhdFJlcXVlc3RUaW1lLmJpbmQodGhpcyksXG4gICAgICAgICAgICB1cGRhdGVSZXF1ZXN0SW50ZXJ2YWxTZWNvbmRzOiB0aGlzLnVwZGF0ZVJlcXVlc3RJbnRlcnZhbFNlY29uZHMudmFsdWUsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICApO1xuICAgICAgdGhpcy5zb2NrZXQudmFsdWUub24oJ3BvbGxVcGRhdGVkJywgYXN5bmMgKGRhdGE6IFBvbGxVcGRhdGVkRGF0YSkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGF3YWl0IHRoaXMucG9sbFVwZGF0ZWQucG9sbFVwZGF0ZWQoe1xuICAgICAgICAgICAgZGF0YSxcbiAgICAgICAgICAgIHBvbGxzOiB0aGlzLnBvbGxzLnZhbHVlLFxuICAgICAgICAgICAgcG9sbDogdGhpcy5wb2xsLnZhbHVlID8gdGhpcy5wb2xsLnZhbHVlIDogKHt9IGFzIFBvbGwpLFxuICAgICAgICAgICAgbWVtYmVyOiB0aGlzLm1lbWJlci52YWx1ZSxcbiAgICAgICAgICAgIGlzbGV2ZWw6IHRoaXMuaXNsZXZlbC52YWx1ZSxcbiAgICAgICAgICAgIHNob3dBbGVydDogdGhpcy5zaG93QWxlcnQuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIHVwZGF0ZVBvbGxzOiB0aGlzLnVwZGF0ZVBvbGxzLmJpbmQodGhpcyksXG4gICAgICAgICAgICB1cGRhdGVQb2xsOiB0aGlzLnVwZGF0ZVBvbGwuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIHVwZGF0ZUlzUG9sbE1vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc1BvbGxNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgLyogaGFuZGxlIGVycm9yICovXG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnNvY2tldC52YWx1ZS5vbignYnJlYWtvdXRSb29tVXBkYXRlZCcsIGFzeW5jIChkYXRhOiBCcmVha291dFJvb21VcGRhdGVkRGF0YSkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGF3YWl0IHRoaXMuYnJlYWtvdXRSb29tVXBkYXRlZC5icmVha291dFJvb21VcGRhdGVkKHtcbiAgICAgICAgICAgIGRhdGEsXG4gICAgICAgICAgICBwYXJhbWV0ZXJzOiB7IC4uLnRoaXMuZ2V0QWxsUGFyYW1zKCksIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAvKiBoYW5kbGUgZXJyb3IgKi9cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGF3YWl0IHRoaXMuam9pbl9Sb29tKHtcbiAgICAgICAgc29ja2V0OiB0aGlzLnNvY2tldC52YWx1ZSxcbiAgICAgICAgcm9vbU5hbWU6IHRoaXMucm9vbU5hbWUudmFsdWUsXG4gICAgICAgIGlzbGV2ZWw6IHRoaXMuaXNsZXZlbC52YWx1ZSxcbiAgICAgICAgbWVtYmVyOiB0aGlzLm1lbWJlci52YWx1ZSxcbiAgICAgICAgc2VjOiB0aGlzLmFwaVRva2VuLnZhbHVlLFxuICAgICAgICBhcGlVc2VyTmFtZTogdGhpcy5hcGlVc2VyTmFtZS52YWx1ZSxcbiAgICAgIH0pO1xuICAgICAgYXdhaXQgdGhpcy5yZWNlaXZlUm9vbU1lc3NhZ2VzLnJlY2VpdmVSb29tTWVzc2FnZXMoe1xuICAgICAgICBzb2NrZXQ6IHRoaXMuc29ja2V0LnZhbHVlLFxuICAgICAgICByb29tTmFtZTogdGhpcy5yb29tTmFtZS52YWx1ZSxcbiAgICAgICAgdXBkYXRlTWVzc2FnZXM6IHRoaXMudXBkYXRlTWVzc2FnZXMuYmluZCh0aGlzKSxcbiAgICAgIH0pO1xuICAgICAgdGhpcy5wcmVwb3B1bGF0ZVVzZXJNZWRpYS5wcmVwb3B1bGF0ZVVzZXJNZWRpYSh7XG4gICAgICAgIG5hbWU6IHRoaXMuaG9zdExhYmVsLnZhbHVlLFxuICAgICAgICBwYXJhbWV0ZXJzOiB7IC4uLnRoaXMuZ2V0QWxsUGFyYW1zKCksIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSB9LFxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiB0aGlzLnNvY2tldC52YWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG59XG4iXX0=