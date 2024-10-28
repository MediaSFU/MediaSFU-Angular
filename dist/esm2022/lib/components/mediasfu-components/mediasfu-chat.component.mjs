import { Component, HostListener, Injector, Input, } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { faMicrophoneSlash, faVideoSlash, faPhone, faComments, faShareAlt, faSync, faVideo, faMicrophone, } from '@fortawesome/free-solid-svg-icons';
import { initialValuesState } from '../../methods/utils/initial-values.util';
// Components for display
import { MainAspectComponent } from '../display-components/main-aspect-component/main-aspect-component.component';
import { LoadingModal } from '../display-components/loading-modal/loading-modal.component';
import { ControlButtonsComponentTouch } from '../display-components/control-buttons-component-touch/control-buttons-component-touch.component';
import { OtherGridComponent } from '../display-components/other-grid-component/other-grid-component.component';
import { MainScreenComponent } from '../display-components/main-screen-component/main-screen-component.component';
import { MainContainerComponent } from '../display-components/main-container-component/main-container-component.component';
import { AlertComponent } from '../display-components/alert-component/alert.component.component';
import { MessagesModal } from '../message-components/messages-modal/messages-modal.component';
import { ConfirmExitModal } from '../exit-components/confirm-exit-modal/confirm-exit-modal.component';
import { ConfirmHereModal } from '../misc-components/confirm-here-modal/confirm-here-modal.component';
import { ShareEventModal } from '../misc-components/share-event-modal/share-event-modal.component';
import { WelcomePage, } from '../misc-components/welcome-page/welcome-page.component';
// Pagination and display of media
import { FlexibleGrid } from '../display-components/flexible-grid/flexible-grid.component';
import { AudioGrid } from '../display-components/audio-grid/audio-grid.component';
import { MessageWidget } from '../display-components/control-widgets/message-widget.component';
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
import * as i49 from "../../methods/whiteboard-methods/capture-canvas-stream.service";
import * as i50 from "../../consumers/resume-pause-audio-streams.service";
import * as i51 from "../../consumers/process-consumer-transports-audio.service";
import * as i52 from "../../methods/message-methods/launch-messages.service";
import * as i53 from "../../methods/exit-methods/launch-confirm-exit.service";
import * as i54 from "../../methods/utils/meeting-timer/start-meeting-progress-timer.service";
import * as i55 from "../../producers/socket-receive-methods/producer-media-paused.service";
import * as i56 from "../../producers/socket-receive-methods/producer-media-resumed.service";
import * as i57 from "../../producers/socket-receive-methods/producer-media-closed.service";
import * as i58 from "../../producers/socket-receive-methods/meeting-ended.service";
import * as i59 from "../../producers/socket-receive-methods/disconnect-user-self.service";
import * as i60 from "../../producers/socket-receive-methods/receive-message.service";
import * as i61 from "../../producers/socket-receive-methods/meeting-time-remaining.service";
import * as i62 from "../../producers/socket-receive-methods/meeting-still-there.service";
import * as i63 from "../../producers/socket-receive-methods/all-members.service";
import * as i64 from "../../producers/socket-receive-methods/all-members-rest.service";
import * as i65 from "../../producers/socket-receive-methods/disconnect.service";
import * as i66 from "../../sockets/socket-manager.service";
import * as i67 from "../../producer-client/producer-client-emits/join-room-client.service";
import * as i68 from "../../producer-client/producer-client-emits/update-room-parameters-client.service";
import * as i69 from "../../methods/stream-methods/click-video.service";
import * as i70 from "../../methods/stream-methods/click-audio.service";
import * as i71 from "../../methods/stream-methods/click-screen-share.service";
import * as i72 from "../../methods/stream-methods/switch-video-alt.service";
import * as i73 from "../../consumers/stream-success-video.service";
import * as i74 from "../../consumers/stream-success-audio.service";
import * as i75 from "../../consumers/stream-success-screen.service";
import * as i76 from "../../consumers/stream-success-audio-switch.service";
import * as i77 from "../../consumers/check-permission.service";
import * as i78 from "../../producers/socket-receive-methods/update-consuming-domains.service";
import * as i79 from "../../consumers/receive-room-messages.service";
import * as i80 from "@angular/common";
export class MediasfuChat {
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
    captureCanvasStream;
    resumePauseAudioStreams;
    processConsumerTransportsAudio;
    launchMessages;
    launchConfirmExit;
    startMeetingProgressTimer;
    producerMediaPaused;
    producerMediaResumed;
    producerMediaClosed;
    meetingEnded;
    disconnectUserSelf;
    receiveMessage;
    meetingTimeRemaining;
    meetingStillThere;
    allMembers;
    allMembersRest;
    disconnect;
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
    title = 'MediaSFU-Chat';
    mainHeightWidthSubscription;
    validatedSubscription;
    islevelSubscription;
    coHostSubscription;
    ScreenboardSubscription;
    recordingSubscription;
    constructor(cdr, injector, updateMiniCardsGrid, mixStreams, dispStreams, stopShareScreen, checkScreenShare, startShareScreen, requestScreenShare, reorderStreams, prepopulateUserMedia, getVideos, rePort, trigger, consumerResume, connectSendTransport, connectSendTransportAudio, connectSendTransportVideo, connectSendTransportScreen, processConsumerTransports, resumePauseStreams, readjust, checkGrid, getEstimate, calculateRowsAndColumns, addVideosGrid, onScreenChanges, changeVids, compareActiveNames, compareScreenStates, createSendTransport, resumeSendTransportAudio, receiveAllPipedTransports, disconnectSendTransportVideo, disconnectSendTransportAudio, disconnectSendTransportScreen, getPipedProducersAlt, signalNewConsumerTransport, connectRecvTransport, reUpdateInter, updateParticipantAudioDecibels, closeAndResize, autoAdjust, switchUserVideoAlt, switchUserVideo, switchUserAudio, getDomains, formatNumber, connectIps, createDeviceClient, captureCanvasStream, resumePauseAudioStreams, processConsumerTransportsAudio, launchMessages, launchConfirmExit, startMeetingProgressTimer, producerMediaPaused, producerMediaResumed, producerMediaClosed, meetingEnded, disconnectUserSelf, receiveMessage, meetingTimeRemaining, meetingStillThere, allMembers, allMembersRest, disconnect, socketManager, joinRoomClient, updateRoomParametersClient, clickVideo, clickAudio, clickScreenShare, switchVideoAlt, streamSuccessVideo, streamSuccessAudio, streamSuccessScreen, streamSuccessAudioSwitch, checkPermission, updateConsumingDomains, receiveRoomMessages) {
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
        this.captureCanvasStream = captureCanvasStream;
        this.resumePauseAudioStreams = resumePauseAudioStreams;
        this.processConsumerTransportsAudio = processConsumerTransportsAudio;
        this.launchMessages = launchMessages;
        this.launchConfirmExit = launchConfirmExit;
        this.startMeetingProgressTimer = startMeetingProgressTimer;
        this.producerMediaPaused = producerMediaPaused;
        this.producerMediaResumed = producerMediaResumed;
        this.producerMediaClosed = producerMediaClosed;
        this.meetingEnded = meetingEnded;
        this.disconnectUserSelf = disconnectUserSelf;
        this.receiveMessage = receiveMessage;
        this.meetingTimeRemaining = meetingTimeRemaining;
        this.meetingStillThere = meetingStillThere;
        this.allMembers = allMembers;
        this.allMembersRest = allMembersRest;
        this.disconnect = disconnect;
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
    apiKey = new BehaviorSubject('');
    apiUserName = new BehaviorSubject('');
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
    eventType = new BehaviorSubject('chat');
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
    mainHeightWidth = new BehaviorSubject(0);
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
    waitingRoomList = new BehaviorSubject([]);
    waitingRoomCounter = new BehaviorSubject(0);
    filteredWaitingRoomList = new BehaviorSubject([]);
    // Requests
    requestFilter = new BehaviorSubject('');
    requestList = new BehaviorSubject([]);
    requestCounter = new BehaviorSubject(0);
    filteredRequestList = new BehaviorSubject([]);
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
    polls = new BehaviorSubject([]);
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
    breakoutRooms = new BehaviorSubject([]);
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
    whiteboardUsers = new BehaviorSubject([]);
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
        this.validatedSubscription = this.validated.subscribe((validated) => {
            if (validated) {
                this.handleValidated();
            }
        });
        this.islevelSubscription = this.islevel.subscribe((islevel) => {
            if (islevel) {
                this.updateControlChatButtons();
            }
        });
        this.coHostSubscription = combineLatest([this.coHost, this.coHostResponsibility]).subscribe(([coHost, coHostResponsibility]) => {
            if (coHost || coHostResponsibility) {
                this.updateControlChatButtons();
            }
        });
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
    faMicrophone = faMicrophone;
    faMicrophoneSlash = faMicrophoneSlash;
    faVideo = faVideo;
    faVideoSlash = faVideoSlash;
    faSync = faSync;
    faPhone = faPhone;
    faShareAlt = faShareAlt;
    faComments = faComments;
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
    messageWidget = {
        component: MessageWidget,
        injector: this.createInjector({
            icon: this.faComments,
            showBadge: this.showMessagesBadge.value,
            badgeValue: 1,
            iconColor: 'black',
        }),
    };
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: MediasfuChat, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.Injector }, { token: i1.UpdateMiniCardsGrid }, { token: i2.MixStreams }, { token: i3.DispStreams }, { token: i4.StopShareScreen }, { token: i5.CheckScreenShare }, { token: i6.StartShareScreen }, { token: i7.RequestScreenShare }, { token: i8.ReorderStreams }, { token: i9.PrepopulateUserMedia }, { token: i10.GetVideos }, { token: i11.RePort }, { token: i12.Trigger }, { token: i13.ConsumerResume }, { token: i14.ConnectSendTransport }, { token: i15.ConnectSendTransportAudio }, { token: i16.ConnectSendTransportVideo }, { token: i17.ConnectSendTransportScreen }, { token: i18.ProcessConsumerTransports }, { token: i19.ResumePauseStreams }, { token: i20.Readjust }, { token: i21.CheckGrid }, { token: i22.GetEstimate }, { token: i23.CalculateRowsAndColumns }, { token: i24.AddVideosGrid }, { token: i25.OnScreenChanges }, { token: i26.ChangeVids }, { token: i27.CompareActiveNames }, { token: i28.CompareScreenStates }, { token: i29.CreateSendTransport }, { token: i30.ResumeSendTransportAudio }, { token: i31.ReceiveAllPipedTransports }, { token: i32.DisconnectSendTransportVideo }, { token: i33.DisconnectSendTransportAudio }, { token: i34.DisconnectSendTransportScreen }, { token: i35.GetPipedProducersAlt }, { token: i36.SignalNewConsumerTransport }, { token: i37.ConnectRecvTransport }, { token: i38.ReUpdateInter }, { token: i39.UpdateParticipantAudioDecibels }, { token: i40.CloseAndResize }, { token: i41.AutoAdjust }, { token: i42.SwitchUserVideoAlt }, { token: i43.SwitchUserVideo }, { token: i44.SwitchUserAudio }, { token: i45.GetDomains }, { token: i46.FormatNumber }, { token: i47.ConnectIps }, { token: i48.CreateDeviceClient }, { token: i49.CaptureCanvasStream }, { token: i50.ResumePauseAudioStreams }, { token: i51.ProcessConsumerTransportsAudio }, { token: i52.LaunchMessages }, { token: i53.LaunchConfirmExit }, { token: i54.StartMeetingProgressTimer }, { token: i55.ProducerMediaPaused }, { token: i56.ProducerMediaResumed }, { token: i57.ProducerMediaClosed }, { token: i58.MeetingEnded }, { token: i59.DisconnectUserSelf }, { token: i60.ReceiveMessage }, { token: i61.MeetingTimeRemaining }, { token: i62.MeetingStillThere }, { token: i63.AllMembers }, { token: i64.AllMembersRest }, { token: i65.Disconnect }, { token: i66.SocketManager }, { token: i67.JoinRoomClient }, { token: i68.UpdateRoomParametersClient }, { token: i69.ClickVideo }, { token: i70.ClickAudio }, { token: i71.ClickScreenShare }, { token: i72.SwitchVideoAlt }, { token: i73.StreamSuccessVideo }, { token: i74.StreamSuccessAudio }, { token: i75.StreamSuccessScreen }, { token: i76.StreamSuccessAudioSwitch }, { token: i77.CheckPermission }, { token: i78.UpdateConsumingDomains }, { token: i79.ReceiveRoomMessages }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.8", type: MediasfuChat, isStandalone: true, selector: "app-mediasfu-chat", inputs: { PrejoinPage: "PrejoinPage", credentials: "credentials", useLocalUIMode: "useLocalUIMode", seedData: "seedData", useSeed: "useSeed", imgSrc: "imgSrc" }, host: { listeners: { "window:resize": "handleResize()", "window:orientationchange": "handleResize()" } }, providers: [CookieService], ngImport: i0, template: `
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
              <!-- MainGridComponent removed -->

              <!-- OtherGridComponent -->
              <app-other-grid-component
                [height]="componentSizes.value.otherHeight"
                [width]="componentSizes.value.otherWidth"
                [backgroundColor]="'rgba(217, 227, 234, 0.99)'"
                [showAspect]="mainHeightWidth.value !== 100"
                [timeBackgroundColor]="recordState.value"
                [showTimer]="mainHeightWidth.value === 0"
                [meetingProgressTime]="meetingProgressTime.value"
              >
                <!-- AudioGrid -->
                <app-audio-grid [componentsToRender]="audioOnlyStreams.value"></app-audio-grid>

                <!-- Control Buttons for Chat -->
                <app-control-buttons-component-touch
                  [buttons]="controlChatButtons"
                  [position]="'right'"
                  [location]="'bottom'"
                  [direction]="'vertical'"
                  [showAspect]="eventType.value === 'chat'"
                ></app-control-buttons-component-touch>

                <!-- Flexible Grid -->
                <app-flexible-grid
                  [customWidth]="gridSizes.value.gridWidth!"
                  [customHeight]="gridSizes.value.gridHeight!"
                  [rows]="gridRows.value"
                  [columns]="gridCols.value"
                  [componentsToRender]="otherGridStreams.value[0]"
                  [backgroundColor]="'rgba(217, 227, 234, 0.99)'"
                ></app-flexible-grid>
              </app-other-grid-component>
            </app-main-screen-component>
          </app-main-aspect-component>

          <!-- SubAspectComponent removed -->
        </app-main-container-component>
      </ng-template>

      <!-- Modals to include -->
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
  `, isInline: true, styles: [""], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i80.NgComponentOutlet, selector: "[ngComponentOutlet]", inputs: ["ngComponentOutlet", "ngComponentOutletInputs", "ngComponentOutletInjector", "ngComponentOutletContent", "ngComponentOutletNgModule", "ngComponentOutletNgModuleFactory"] }, { kind: "directive", type: i80.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i80.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: AlertComponent, selector: "app-alert-component", inputs: ["visible", "message", "type", "duration", "textColor", "onHide"] }, { kind: "component", type: AudioGrid, selector: "app-audio-grid", inputs: ["componentsToRender"] }, { kind: "component", type: ControlButtonsComponentTouch, selector: "app-control-buttons-component-touch", inputs: ["buttons", "position", "location", "direction", "buttonsContainerStyle", "showAspect"] }, { kind: "component", type: FlexibleGrid, selector: "app-flexible-grid", inputs: ["customWidth", "customHeight", "rows", "columns", "componentsToRender", "backgroundColor"] }, { kind: "component", type: LoadingModal, selector: "app-loading-modal", inputs: ["isVisible", "backgroundColor", "displayColor"] }, { kind: "component", type: ConfirmExitModal, selector: "app-confirm-exit-modal", inputs: ["isConfirmExitModalVisible", "onConfirmExitClose", "position", "backgroundColor", "exitEventOnConfirm", "member", "ban", "roomName", "socket", "islevel"] }, { kind: "component", type: MessagesModal, selector: "app-messages-modal", inputs: ["isMessagesModalVisible", "onMessagesClose", "onSendMessagePress", "messages", "position", "backgroundColor", "activeTabBackgroundColor", "eventType", "member", "islevel", "coHostResponsibility", "coHost", "startDirectMessage", "directMessageDetails", "updateStartDirectMessage", "updateDirectMessageDetails", "showAlert", "roomName", "socket", "chatSetting"] }, { kind: "component", type: ConfirmHereModal, selector: "app-confirm-here-modal", inputs: ["isConfirmHereModalVisible", "position", "backgroundColor", "displayColor", "onConfirmHereClose", "countdownDuration", "socket", "roomName", "member"] }, { kind: "component", type: ShareEventModal, selector: "app-share-event-modal", inputs: ["backgroundColor", "isShareEventModalVisible", "onShareEventClose", "roomName", "adminPasscode", "islevel", "position", "shareButtons", "eventType"] }, { kind: "component", type: MainAspectComponent, selector: "app-main-aspect-component", inputs: ["backgroundColor", "showControls", "containerWidthFraction", "containerHeightFraction", "defaultFraction", "updateIsWideScreen", "updateIsMediumScreen", "updateIsSmallScreen"] }, { kind: "component", type: MainContainerComponent, selector: "app-main-container-component", inputs: ["backgroundColor", "containerWidthFraction", "containerHeightFraction", "marginLeft", "marginRight", "marginTop", "marginBottom", "padding"] }, { kind: "component", type: MainScreenComponent, selector: "app-main-screen-component", inputs: ["mainSize", "doStack", "containerWidthFraction", "containerHeightFraction", "defaultFraction", "showControls", "updateComponentSizes"] }, { kind: "component", type: OtherGridComponent, selector: "app-other-grid-component", inputs: ["backgroundColor", "width", "height", "showAspect", "timeBackgroundColor", "showTimer", "meetingProgressTime"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: MediasfuChat, decorators: [{
            type: Component,
            args: [{ selector: 'app-mediasfu-chat', standalone: true, imports: [
                        RouterOutlet,
                        CommonModule,
                        AlertComponent,
                        AudioGrid,
                        ControlButtonsComponentTouch,
                        FlexibleGrid,
                        LoadingModal,
                        ConfirmExitModal,
                        MessagesModal,
                        ConfirmHereModal,
                        ShareEventModal,
                        WelcomePage,
                        MainAspectComponent,
                        MainContainerComponent,
                        MainScreenComponent,
                        OtherGridComponent,
                        MessageWidget,
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
              <!-- MainGridComponent removed -->

              <!-- OtherGridComponent -->
              <app-other-grid-component
                [height]="componentSizes.value.otherHeight"
                [width]="componentSizes.value.otherWidth"
                [backgroundColor]="'rgba(217, 227, 234, 0.99)'"
                [showAspect]="mainHeightWidth.value !== 100"
                [timeBackgroundColor]="recordState.value"
                [showTimer]="mainHeightWidth.value === 0"
                [meetingProgressTime]="meetingProgressTime.value"
              >
                <!-- AudioGrid -->
                <app-audio-grid [componentsToRender]="audioOnlyStreams.value"></app-audio-grid>

                <!-- Control Buttons for Chat -->
                <app-control-buttons-component-touch
                  [buttons]="controlChatButtons"
                  [position]="'right'"
                  [location]="'bottom'"
                  [direction]="'vertical'"
                  [showAspect]="eventType.value === 'chat'"
                ></app-control-buttons-component-touch>

                <!-- Flexible Grid -->
                <app-flexible-grid
                  [customWidth]="gridSizes.value.gridWidth!"
                  [customHeight]="gridSizes.value.gridHeight!"
                  [rows]="gridRows.value"
                  [columns]="gridCols.value"
                  [componentsToRender]="otherGridStreams.value[0]"
                  [backgroundColor]="'rgba(217, 227, 234, 0.99)'"
                ></app-flexible-grid>
              </app-other-grid-component>
            </app-main-screen-component>
          </app-main-aspect-component>

          <!-- SubAspectComponent removed -->
        </app-main-container-component>
      </ng-template>

      <!-- Modals to include -->
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
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef }, { type: i0.Injector }, { type: i1.UpdateMiniCardsGrid }, { type: i2.MixStreams }, { type: i3.DispStreams }, { type: i4.StopShareScreen }, { type: i5.CheckScreenShare }, { type: i6.StartShareScreen }, { type: i7.RequestScreenShare }, { type: i8.ReorderStreams }, { type: i9.PrepopulateUserMedia }, { type: i10.GetVideos }, { type: i11.RePort }, { type: i12.Trigger }, { type: i13.ConsumerResume }, { type: i14.ConnectSendTransport }, { type: i15.ConnectSendTransportAudio }, { type: i16.ConnectSendTransportVideo }, { type: i17.ConnectSendTransportScreen }, { type: i18.ProcessConsumerTransports }, { type: i19.ResumePauseStreams }, { type: i20.Readjust }, { type: i21.CheckGrid }, { type: i22.GetEstimate }, { type: i23.CalculateRowsAndColumns }, { type: i24.AddVideosGrid }, { type: i25.OnScreenChanges }, { type: i26.ChangeVids }, { type: i27.CompareActiveNames }, { type: i28.CompareScreenStates }, { type: i29.CreateSendTransport }, { type: i30.ResumeSendTransportAudio }, { type: i31.ReceiveAllPipedTransports }, { type: i32.DisconnectSendTransportVideo }, { type: i33.DisconnectSendTransportAudio }, { type: i34.DisconnectSendTransportScreen }, { type: i35.GetPipedProducersAlt }, { type: i36.SignalNewConsumerTransport }, { type: i37.ConnectRecvTransport }, { type: i38.ReUpdateInter }, { type: i39.UpdateParticipantAudioDecibels }, { type: i40.CloseAndResize }, { type: i41.AutoAdjust }, { type: i42.SwitchUserVideoAlt }, { type: i43.SwitchUserVideo }, { type: i44.SwitchUserAudio }, { type: i45.GetDomains }, { type: i46.FormatNumber }, { type: i47.ConnectIps }, { type: i48.CreateDeviceClient }, { type: i49.CaptureCanvasStream }, { type: i50.ResumePauseAudioStreams }, { type: i51.ProcessConsumerTransportsAudio }, { type: i52.LaunchMessages }, { type: i53.LaunchConfirmExit }, { type: i54.StartMeetingProgressTimer }, { type: i55.ProducerMediaPaused }, { type: i56.ProducerMediaResumed }, { type: i57.ProducerMediaClosed }, { type: i58.MeetingEnded }, { type: i59.DisconnectUserSelf }, { type: i60.ReceiveMessage }, { type: i61.MeetingTimeRemaining }, { type: i62.MeetingStillThere }, { type: i63.AllMembers }, { type: i64.AllMembersRest }, { type: i65.Disconnect }, { type: i66.SocketManager }, { type: i67.JoinRoomClient }, { type: i68.UpdateRoomParametersClient }, { type: i69.ClickVideo }, { type: i70.ClickAudio }, { type: i71.ClickScreenShare }, { type: i72.SwitchVideoAlt }, { type: i73.StreamSuccessVideo }, { type: i74.StreamSuccessAudio }, { type: i75.StreamSuccessScreen }, { type: i76.StreamSuccessAudioSwitch }, { type: i77.CheckPermission }, { type: i78.UpdateConsumingDomains }, { type: i79.ReceiveRoomMessages }], propDecorators: { PrejoinPage: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWFzZnUtY2hhdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29tcG9uZW50cy9tZWRpYXNmdS1jb21wb25lbnRzL21lZGlhc2Z1LWNoYXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLFFBQVEsRUFFUixLQUFLLEdBR04sTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbkQsT0FBTyxFQUFFLGVBQWUsRUFBZ0IsYUFBYSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXBFLE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsWUFBWSxFQUNaLE9BQU8sRUFDUCxVQUFVLEVBQ1YsVUFBVSxFQUNWLE1BQU0sRUFDTixPQUFPLEVBQ1AsWUFBWSxHQUNiLE1BQU0sbUNBQW1DLENBQUM7QUFFM0MsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFFN0UseUJBQXlCO0FBQ3pCLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDZFQUE2RSxDQUFDO0FBQ2xILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw2REFBNkQsQ0FBQztBQUMzRixPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxpR0FBaUcsQ0FBQztBQUMvSSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwyRUFBMkUsQ0FBQztBQUMvRyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw2RUFBNkUsQ0FBQztBQUNsSCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxtRkFBbUYs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QUM7SUFDM0QseUJBQXlCLEdBQUcsSUFBSSxlQUFlLENBQVMsQ0FBQyxDQUFDLENBQUM7SUFDM0QscUJBQXFCLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFDNUQseUJBQXlCLEdBQUcsSUFBSSxlQUFlLENBQVMsQ0FBQyxDQUFDLENBQUM7SUFDM0QsbUNBQW1DLEdBQUcsSUFBSSxlQUFlLENBQVMsQ0FBQyxDQUFDLENBQUM7SUFDckUseUJBQXlCLEdBQUcsSUFBSSxlQUFlLENBQVMsQ0FBQyxDQUFDLENBQUM7SUFDM0QseUJBQXlCLEdBQUcsSUFBSSxlQUFlLENBQVMsQ0FBQyxDQUFDLENBQUM7SUFDM0QscUJBQXFCLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFDNUQseUJBQXlCLEdBQUcsSUFBSSxlQUFlLENBQVMsQ0FBQyxDQUFDLENBQUM7SUFDM0QsbUNBQW1DLEdBQUcsSUFBSSxlQUFlLENBQVMsQ0FBQyxDQUFDLENBQUM7SUFDckUsK0JBQStCLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFDdEUsaUNBQWlDLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFDeEUsdUNBQXVDLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFDOUUseUNBQXlDLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFDaEYsNkJBQTZCLEdBQUcsSUFBSSxlQUFlLENBQVMsV0FBVyxDQUFDLENBQUM7SUFDekUsbUNBQW1DLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFDMUUsNEJBQTRCLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFFbkUsbUJBQW1CLEdBQUcsSUFBSSxlQUFlLENBQXNCO1FBQzdELFNBQVMsRUFBRTtZQUNULFlBQVksRUFBRSxPQUFPLEVBQUUsbUJBQW1CO1lBQzFDLFlBQVksRUFBRSxLQUFLLEVBQUUsNEJBQTRCO1lBQ2pELFlBQVksRUFB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QW1CLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDeEQscUJBQXFCLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDNUQsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDdEQscUJBQXFCLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDNUQsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDcEQsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDeEQsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDeEQsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDdEQsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDeEQsMEJBQTBCLEVBQUUsSUFBSSxDQUFDLDBCQUEwQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDdEUsdUJBQXVCLEVBQUUsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDaEUsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDOUQsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDcEQsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDOUQsaUNBQWlDLEVBQUUsSUFBSSxDQUFDLGlDQUFpQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDcEYsdUJB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Q2hCLGVBQWU7d0JBQ2YsV0FBVzt3QkFDWCxtQkFBbUI7d0JBQ25CLHNCQUFzQjt3QkFDdEIsbUJBQW1CO3dCQUNuQixrQkFBa0I7d0JBQ2xCLGFBQWE7cUJBQ2QsWUFDUzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9KVCxhQVFVLENBQUMsYUFBYSxDQUFDO3VxRkFJMUIsV0FBVztzQkFEVixLQUFLO2dCQUVHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csY0FBYztzQkFBdEIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSztnQkFDRyxNQUFNO3NCQUFkLEtBQUs7Z0JBNGtHQSxZQUFZO3NCQUZqQixZQUFZO3VCQUFDLGVBQWU7O3NCQUM1QixZQUFZO3VCQUFDLDBCQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSG9zdExpc3RlbmVyLFxuICBJbmplY3RvcixcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXJPdXRsZXQgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IENvb2tpZVNlcnZpY2UgfSBmcm9tICduZ3gtY29va2llLXNlcnZpY2UnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBTdWJzY3JpcHRpb24sIGNvbWJpbmVMYXRlc3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFNvY2tldCB9IGZyb20gJ3NvY2tldC5pby1jbGllbnQnO1xuaW1wb3J0IHtcbiAgZmFNaWNyb3Bob25lU2xhc2gsXG4gIGZhVmlkZW9TbGFzaCxcbiAgZmFQaG9uZSxcbiAgZmFDb21tZW50cyxcbiAgZmFTaGFyZUFsdCxcbiAgZmFTeW5jLFxuICBmYVZpZGVvLFxuICBmYU1pY3JvcGhvbmUsXG59IGZyb20gJ0Bmb3J0YXdlc29tZS9mcmVlLXNvbGlkLXN2Zy1pY29ucyc7XG5cbmltcG9ydCB7IGluaXRpYWxWYWx1ZXNTdGF0ZSB9IGZyb20gJy4uLy4uL21ldGhvZHMvdXRpbHMvaW5pdGlhbC12YWx1ZXMudXRpbCc7XG5cbi8vIENvbXBvbmVudHMgZm9yIGRpc3BsYXlcbmltcG9ydCB7IE1haW5Bc3BlY3RDb21wb25lbnQgfSBmcm9tICcuLi9kaXNwbGF5LWNvbXBvbmVudHMvbWFpbi1hc3BlY3QtY29tcG9uZW50L21haW4tYXNwZWN0LWNvbXBvbmVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTG9hZGluZ01vZGFsIH0gZnJvbSAnLi4vZGlzcGxheS1jb21wb25lbnRzL2xvYWRpbmctbW9kYWwvbG9hZGluZy1tb2RhbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29udHJvbEJ1dHRvbnNDb21wb25lbnRUb3VjaCB9IGZyb20gJy4uL2Rpc3BsYXktY29tcG9uZW50cy9jb250cm9sLWJ1dHRvbnMtY29tcG9uZW50LXRvdWNoL2NvbnRyb2wtYnV0dG9ucy1jb21wb25lbnQtdG91Y2guY29tcG9uZW50JztcbmltcG9ydCB7IE90aGVyR3JpZENvbXBvbmVudCB9IGZyb20gJy4uL2Rpc3BsYXktY29tcG9uZW50cy9vdGhlci1ncmlkLWNvbXBvbmVudC9vdGhlci1ncmlkLWNvbXBvbmVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWFpblNjcmVlbkNvbXBvbmVudCB9IGZyb20gJy4uL2Rpc3BsYXktY29tcG9uZW50cy9tYWluLXNjcmVlbi1jb21wb25lbnQvbWFpbi1zY3JlZW4tY29tcG9uZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYWluQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi4vZGlzcGxheS1jb21wb25lbnRzL21haW4tY29udGFpbmVyLWNvbXBvbmVudC9tYWluLWNvbnRhaW5lci1jb21wb25lbnQuY29tcG9uZW50JztcbmltcG9ydCB7IEFsZXJ0Q29tcG9uZW50IH0gZnJvbSAnLi4vZGlzcGxheS1jb21wb25lbnRzL2FsZXJ0LWNvbXBvbmVudC9hbGVydC5jb21wb25lbnQuY29tcG9uZW50JztcbmltcG9ydCB7IE1lc3NhZ2VzTW9kYWwgfSBmcm9tICcuLi9tZXNzYWdlLWNvbXBvbmVudHMvbWVzc2FnZXMtbW9kYWwvbWVzc2FnZXMtbW9kYWwuY29tcG9uZW50JztcbmltcG9ydCB7IENvbmZpcm1FeGl0TW9kYWwgfSBmcm9tICcuLi9leGl0LWNvbXBvbmVudHMvY29uZmlybS1leGl0LW1vZGFsL2NvbmZpcm0tZXhpdC1tb2RhbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29uZmlybUhlcmVNb2RhbCB9IGZyb20gJy4uL21pc2MtY29tcG9uZW50cy9jb25maXJtLWhlcmUtbW9kYWwvY29uZmlybS1oZXJlLW1vZGFsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTaGFyZUV2ZW50TW9kYWwgfSBmcm9tICcuLi9taXNjLWNvbXBvbmVudHMvc2hhcmUtZXZlbnQtbW9kYWwvc2hhcmUtZXZlbnQtbW9kYWwuY29tcG9uZW50JztcbmltcG9ydCB7XG4gIFdlbGNvbWVQYWdlLFxuICBXZWxjb21lUGFnZU9wdGlvbnMsXG59IGZyb20gJy4uL21pc2MtY29tcG9uZW50cy93ZWxjb21lLXBhZ2Uvd2VsY29tZS1wYWdlLmNvbXBvbmVudCc7XG5cbi8vIFBhZ2luYXRpb24gYW5kIGRpc3BsYXkgb2YgbWVkaWFcbmltcG9ydCB7IEZsZXhpYmxlR3JpZCB9IGZyb20gJy4uL2Rpc3BsYXktY29tcG9uZW50cy9mbGV4aWJsZS1ncmlkL2ZsZXhpYmxlLWdyaWQuY29tcG9uZW50JztcbmltcG9ydCB7IEF1ZGlvR3JpZCB9IGZyb20gJy4uL2Rpc3BsYXktY29tcG9uZW50cy9hdWRpby1ncmlkL2F1ZGlvLWdyaWQuY29tcG9uZW50JztcblxuaW1wb3J0IHsgTWVzc2FnZVdpZGdldCB9IGZyb20gJy4uL2Rpc3BsYXktY29tcG9uZW50cy9jb250cm9sLXdpZGdldHMvbWVzc2FnZS13aWRnZXQuY29tcG9uZW50JztcblxuaW1wb3J0IHtcbiAgQnV0dG9uVG91Y2gsXG4gIFJlc3BvbnNlSm9pblJvb20sXG4gIENvSG9zdFJlc3BvbnNpYmlsaXR5LFxuICBFdmVudFR5cGUsXG4gIFBhcnRpY2lwYW50LFxuICBDb25zdW1lU29ja2V0LFxuICBNZWV0aW5nUm9vbVBhcmFtcyxcbiAgVmlkQ29ucyxcbiAgSFBhcmFtc1R5cGUsXG4gIFZQYXJhbXNUeXBlLFxuICBTY3JlZW5QYXJhbXNUeXBlLFxuICBBUGFyYW1zVHlwZSxcbiAgVXNlclJlY29yZGluZ1BhcmFtcyxcbiAgU3RyZWFtLFxuICBBdWRpb0RlY2liZWxzLFxuICBTY3JlZW5TdGF0ZSxcbiAgR3JpZFNpemVzLFxuICBDdXN0b21NZWRpYUNvbXBvbmVudCxcbiAgTWVzc2FnZSxcbiAgV2FpdGluZ1Jvb21QYXJ0aWNpcGFudCxcbiAgQ29tcG9uZW50U2l6ZXMsXG4gIFRyYW5zcG9ydCBhcyBUcmFuc3BvcnRUeXBlLFxuICBTaGFwZSxcbiAgUG9sbCxcbiAgQnJlYWtvdXRQYXJ0aWNpcGFudCxcbiAgV2hpdGVib2FyZFVzZXIsXG4gIFJlcXVlc3QsXG4gIEFsbE1lbWJlcnNEYXRhLFxuICBBbGxNZW1iZXJzUmVzdERhdGEsXG4gIFNlZWREYXRhLFxuICBVcGRhdGVDb25zdW1pbmdEb21haW5zRGF0YSxcbiAgUHJlSm9pblBhZ2VPcHRpb25zLFxufSBmcm9tICcuLi8uLi9AdHlwZXMvdHlwZXMnO1xuLy8gSW1wb3J0IG1ldGhvZHMgZm9yIGNvbnRyb2xcbmltcG9ydCB7IExhdW5jaE1lc3NhZ2VzIH0gZnJvbSAnLi4vLi4vbWV0aG9kcy9tZXNzYWdlLW1ldGhvZHMvbGF1bmNoLW1lc3NhZ2VzLnNlcnZpY2UnO1xuaW1wb3J0IHsgTGF1bmNoQ29uZmlybUV4aXQgfSBmcm9tICcuLi8uLi9tZXRob2RzL2V4aXQtbWV0aG9kcy9sYXVuY2gtY29uZmlybS1leGl0LnNlcnZpY2UnO1xuXG4vLyBNZWRpYXNmdSBmdW5jdGlvbnMgLS0gZXhhbXBsZXNcbmltcG9ydCB7IFNvY2tldE1hbmFnZXIgfSBmcm9tICcuLi8uLi9zb2NrZXRzL3NvY2tldC1tYW5hZ2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgSm9pblJvb21DbGllbnQgfSBmcm9tICcuLi8uLi9wcm9kdWNlci1jbGllbnQvcHJvZHVjZXItY2xpZW50LWVtaXRzL2pvaW4tcm9vbS1jbGllbnQuc2VydmljZSc7XG5pbXBvcnQgeyBVcGRhdGVSb29tUGFyYW1ldGVyc0NsaWVudCB9IGZyb20gJy4uLy4uL3Byb2R1Y2VyLWNsaWVudC9wcm9kdWNlci1jbGllbnQtZW1pdHMvdXBkYXRlLXJvb20tcGFyYW1ldGVycy1jbGllbnQuc2VydmljZSc7XG5pbXBvcnQgeyBDcmVhdGVEZXZpY2VDbGllbnQgfSBmcm9tICcuLi8uLi9wcm9kdWNlci1jbGllbnQvcHJvZHVjZXItY2xpZW50LWVtaXRzL2NyZWF0ZS1kZXZpY2UtY2xpZW50LnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBTd2l0Y2hWaWRlb0FsdCB9IGZyb20gJy4uLy4uL21ldGhvZHMvc3RyZWFtLW1ldGhvZHMvc3dpdGNoLXZpZGVvLWFsdC5zZXJ2aWNlJztcbmltcG9ydCB7IENsaWNrVmlkZW8gfSBmcm9tICcuLi8uLi9tZXRob2RzL3N0cmVhbS1tZXRob2RzL2NsaWNrLXZpZGVvLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2xpY2tBdWRpbyB9IGZyb20gJy4uLy4uL21ldGhvZHMvc3RyZWFtLW1ldGhvZHMvY2xpY2stYXVkaW8uc2VydmljZSc7XG5pbXBvcnQgeyBDbGlja1NjcmVlblNoYXJlIH0gZnJvbSAnLi4vLi4vbWV0aG9kcy9zdHJlYW0tbWV0aG9kcy9jbGljay1zY3JlZW4tc2hhcmUuc2VydmljZSc7XG5pbXBvcnQgeyBTdHJlYW1TdWNjZXNzVmlkZW8gfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvc3RyZWFtLXN1Y2Nlc3MtdmlkZW8uc2VydmljZSc7XG5pbXBvcnQgeyBTdHJlYW1TdWNjZXNzQXVkaW8gfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvc3RyZWFtLXN1Y2Nlc3MtYXVkaW8uc2VydmljZSc7XG5pbXBvcnQgeyBTdHJlYW1TdWNjZXNzU2NyZWVuIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL3N0cmVhbS1zdWNjZXNzLXNjcmVlbi5zZXJ2aWNlJztcbmltcG9ydCB7IFN0cmVhbVN1Y2Nlc3NBdWRpb1N3aXRjaCB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9zdHJlYW0tc3VjY2Vzcy1hdWRpby1zd2l0Y2guc2VydmljZSc7XG5pbXBvcnQgeyBDaGVja1Blcm1pc3Npb24gfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvY2hlY2stcGVybWlzc2lvbi5zZXJ2aWNlJztcblxuLy8gTWVkaWFzZnUgY29uc3VtZXIgZnVuY3Rpb25zXG5pbXBvcnQgeyBVcGRhdGVNaW5pQ2FyZHNHcmlkIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL3VwZGF0ZS1taW5pLWNhcmRzLWdyaWQuc2VydmljZSc7XG5pbXBvcnQgeyBNaXhTdHJlYW1zIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL21peC1zdHJlYW1zLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGlzcFN0cmVhbXMgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvZGlzcC1zdHJlYW1zLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3RvcFNoYXJlU2NyZWVuIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL3N0b3Atc2hhcmUtc2NyZWVuLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2hlY2tTY3JlZW5TaGFyZSB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9jaGVjay1zY3JlZW4tc2hhcmUuc2VydmljZSc7XG5pbXBvcnQgeyBTdGFydFNoYXJlU2NyZWVuIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL3N0YXJ0LXNoYXJlLXNjcmVlbi5zZXJ2aWNlJztcbmltcG9ydCB7IFJlcXVlc3RTY3JlZW5TaGFyZSB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9yZXF1ZXN0LXNjcmVlbi1zaGFyZS5zZXJ2aWNlJztcbmltcG9ydCB7IFJlb3JkZXJTdHJlYW1zIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL3Jlb3JkZXItc3RyZWFtcy5zZXJ2aWNlJztcbmltcG9ydCB7IFByZXBvcHVsYXRlVXNlck1lZGlhIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL3ByZXBvcHVsYXRlLXVzZXItbWVkaWEuc2VydmljZSc7XG5pbXBvcnQgeyBHZXRWaWRlb3MgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvZ2V0LXZpZGVvcy5zZXJ2aWNlJztcbmltcG9ydCB7IFJlUG9ydCB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9yZS1wb3J0LnNlcnZpY2UnO1xuaW1wb3J0IHsgVHJpZ2dlciB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy90cmlnZ2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29uc3VtZXJSZXN1bWUgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvY29uc3VtZXItcmVzdW1lLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29ubmVjdFNlbmRUcmFuc3BvcnRBdWRpbyB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9jb25uZWN0LXNlbmQtdHJhbnNwb3J0LWF1ZGlvLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlbyB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9jb25uZWN0LXNlbmQtdHJhbnNwb3J0LXZpZGVvLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW4gfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvY29ubmVjdC1zZW5kLXRyYW5zcG9ydC1zY3JlZW4uc2VydmljZSc7XG5pbXBvcnQgeyBQcm9jZXNzQ29uc3VtZXJUcmFuc3BvcnRzIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL3Byb2Nlc3MtY29uc3VtZXItdHJhbnNwb3J0cy5zZXJ2aWNlJztcbmltcG9ydCB7IFJlc3VtZVBhdXNlU3RyZWFtcyB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9yZXN1bWUtcGF1c2Utc3RyZWFtcy5zZXJ2aWNlJztcbmltcG9ydCB7IFJlYWRqdXN0IH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL3JlYWRqdXN0LnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2hlY2tHcmlkIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL2NoZWNrLWdyaWQuc2VydmljZSc7XG5pbXBvcnQgeyBHZXRFc3RpbWF0ZSB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9nZXQtZXN0aW1hdGUuc2VydmljZSc7XG5pbXBvcnQgeyBDYWxjdWxhdGVSb3dzQW5kQ29sdW1ucyB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9jYWxjdWxhdGUtcm93cy1hbmQtY29sdW1ucy5zZXJ2aWNlJztcbmltcG9ydCB7IEFkZFZpZGVvc0dyaWQgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvYWRkLXZpZGVvcy1ncmlkLnNlcnZpY2UnO1xuaW1wb3J0IHsgT25TY3JlZW5DaGFuZ2VzIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL29uLXNjcmVlbi1jaGFuZ2VzLnNlcnZpY2UnO1xuaW1wb3J0IHsgc2xlZXAgfSBmcm9tICcuLi8uLi9tZXRob2RzL3V0aWxzL3NsZWVwLnV0aWwnO1xuaW1wb3J0IHsgQ2hhbmdlVmlkcyB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9jaGFuZ2Utdmlkcy5zZXJ2aWNlJztcbmltcG9ydCB7IENvbXBhcmVBY3RpdmVOYW1lcyB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9jb21wYXJlLWFjdGl2ZS1uYW1lcy5zZXJ2aWNlJztcbmltcG9ydCB7IENvbXBhcmVTY3JlZW5TdGF0ZXMgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvY29tcGFyZS1zY3JlZW4tc3RhdGVzLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ3JlYXRlU2VuZFRyYW5zcG9ydCB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9jcmVhdGUtc2VuZC10cmFuc3BvcnQuc2VydmljZSc7XG5pbXBvcnQgeyBSZXN1bWVTZW5kVHJhbnNwb3J0QXVkaW8gfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvcmVzdW1lLXNlbmQtdHJhbnNwb3J0LWF1ZGlvLnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVjZWl2ZUFsbFBpcGVkVHJhbnNwb3J0cyB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9yZWNlaXZlLWFsbC1waXBlZC10cmFuc3BvcnRzLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGlzY29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlbyB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9kaXNjb25uZWN0LXNlbmQtdHJhbnNwb3J0LXZpZGVvLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGlzY29ubmVjdFNlbmRUcmFuc3BvcnRBdWRpbyB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9kaXNjb25uZWN0LXNlbmQtdHJhbnNwb3J0LWF1ZGlvLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGlzY29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW4gfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvZGlzY29ubmVjdC1zZW5kLXRyYW5zcG9ydC1zY3JlZW4uc2VydmljZSc7XG5pbXBvcnQgeyBDb25uZWN0U2VuZFRyYW5zcG9ydCB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9jb25uZWN0LXNlbmQtdHJhbnNwb3J0LnNlcnZpY2UnO1xuaW1wb3J0IHsgR2V0UGlwZWRQcm9kdWNlcnNBbHQgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvZ2V0LXBpcGVkLXByb2R1Y2Vycy1hbHQuc2VydmljZSc7XG5pbXBvcnQgeyBTaWduYWxOZXdDb25zdW1lclRyYW5zcG9ydCB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9zaWduYWwtbmV3LWNvbnN1bWVyLXRyYW5zcG9ydC5zZXJ2aWNlJztcbmltcG9ydCB7IENvbm5lY3RSZWN2VHJhbnNwb3J0IH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL2Nvbm5lY3QtcmVjdi10cmFuc3BvcnQuc2VydmljZSc7XG5pbXBvcnQgeyBSZVVwZGF0ZUludGVyIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL3JlLXVwZGF0ZS1pbnRlci5zZXJ2aWNlJztcbmltcG9ydCB7IFVwZGF0ZVBhcnRpY2lwYW50QXVkaW9EZWNpYmVscyB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy91cGRhdGUtcGFydGljaXBhbnQtYXVkaW8tZGVjaWJlbHMuc2VydmljZSc7XG5pbXBvcnQgeyBDbG9zZUFuZFJlc2l6ZSB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9jbG9zZS1hbmQtcmVzaXplLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXV0b0FkanVzdCB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9hdXRvLWFkanVzdC5zZXJ2aWNlJztcbmltcG9ydCB7IFN3aXRjaFVzZXJWaWRlb0FsdCB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9zd2l0Y2gtdXNlci12aWRlby1hbHQuc2VydmljZSc7XG5pbXBvcnQgeyBTd2l0Y2hVc2VyVmlkZW8gfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvc3dpdGNoLXVzZXItdmlkZW8uc2VydmljZSc7XG5pbXBvcnQgeyBTd2l0Y2hVc2VyQXVkaW8gfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvc3dpdGNoLXVzZXItYXVkaW8uc2VydmljZSc7XG5pbXBvcnQgeyBSZWNlaXZlUm9vbU1lc3NhZ2VzIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL3JlY2VpdmUtcm9vbS1tZXNzYWdlcy5zZXJ2aWNlJztcbmltcG9ydCB7IEZvcm1hdE51bWJlciB9IGZyb20gJy4uLy4uL21ldGhvZHMvdXRpbHMvZm9ybWF0LW51bWJlci5zZXJ2aWNlJztcbmltcG9ydCB7IENvbm5lY3RJcHMgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvY29ubmVjdC1pcHMuc2VydmljZSc7XG5cbi8vIFV0aWxpdHkgaW1wb3J0cyBmb3IgbWVldGluZyBhbmQgcmVjb3JkaW5nIGZ1bmN0aW9uYWxpdHlcbmltcG9ydCB7IFN0YXJ0TWVldGluZ1Byb2dyZXNzVGltZXIgfSBmcm9tICcuLi8uLi9tZXRob2RzL3V0aWxzL21lZXRpbmctdGltZXIvc3RhcnQtbWVldGluZy1wcm9ncmVzcy10aW1lci5zZXJ2aWNlJztcblxuLy8gU29ja2V0IG1ldGhvZHMgZm9yIHBhcnRpY2lwYW50IGFuZCBtZWV0aW5nIG1hbmFnZW1lbnRcbmltcG9ydCB7IFByb2R1Y2VyTWVkaWFQYXVzZWQgfSBmcm9tICcuLi8uLi9wcm9kdWNlcnMvc29ja2V0LXJlY2VpdmUtbWV0aG9kcy9wcm9kdWNlci1tZWRpYS1wYXVzZWQuc2VydmljZSc7XG5pbXBvcnQgeyBQcm9kdWNlck1lZGlhUmVzdW1lZCB9IGZyb20gJy4uLy4uL3Byb2R1Y2Vycy9zb2NrZXQtcmVjZWl2ZS1tZXRob2RzL3Byb2R1Y2VyLW1lZGlhLXJlc3VtZWQuc2VydmljZSc7XG5pbXBvcnQgeyBQcm9kdWNlck1lZGlhQ2xvc2VkIH0gZnJvbSAnLi4vLi4vcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvcHJvZHVjZXItbWVkaWEtY2xvc2VkLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWVldGluZ0VuZGVkIH0gZnJvbSAnLi4vLi4vcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvbWVldGluZy1lbmRlZC5zZXJ2aWNlJztcbmltcG9ydCB7IERpc2Nvbm5lY3RVc2VyU2VsZiB9IGZyb20gJy4uLy4uL3Byb2R1Y2Vycy9zb2NrZXQtcmVjZWl2ZS1tZXRob2RzL2Rpc2Nvbm5lY3QtdXNlci1zZWxmLnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVjZWl2ZU1lc3NhZ2UgfSBmcm9tICcuLi8uLi9wcm9kdWNlcnMvc29ja2V0LXJlY2VpdmUtbWV0aG9kcy9yZWNlaXZlLW1lc3NhZ2Uuc2VydmljZSc7XG5pbXBvcnQgeyBNZWV0aW5nVGltZVJlbWFpbmluZyB9IGZyb20gJy4uLy4uL3Byb2R1Y2Vycy9zb2NrZXQtcmVjZWl2ZS1tZXRob2RzL21lZXRpbmctdGltZS1yZW1haW5pbmcuc2VydmljZSc7XG5pbXBvcnQgeyBNZWV0aW5nU3RpbGxUaGVyZSB9IGZyb20gJy4uLy4uL3Byb2R1Y2Vycy9zb2NrZXQtcmVjZWl2ZS1tZXRob2RzL21lZXRpbmctc3RpbGwtdGhlcmUuc2VydmljZSc7XG5cbmltcG9ydCB7IEdldERvbWFpbnMgfSBmcm9tICcuLi8uLi9wcm9kdWNlcnMvc29ja2V0LXJlY2VpdmUtbWV0aG9kcy9nZXQtZG9tYWlucy5zZXJ2aWNlJztcbmltcG9ydCB7IFVwZGF0ZUNvbnN1bWluZ0RvbWFpbnMgfSBmcm9tICcuLi8uLi9wcm9kdWNlcnMvc29ja2V0LXJlY2VpdmUtbWV0aG9kcy91cGRhdGUtY29uc3VtaW5nLWRvbWFpbnMuc2VydmljZSc7XG5pbXBvcnQgeyBBbGxNZW1iZXJzIH0gZnJvbSAnLi4vLi4vcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvYWxsLW1lbWJlcnMuc2VydmljZSc7XG5pbXBvcnQgeyBBbGxNZW1iZXJzUmVzdCB9IGZyb20gJy4uLy4uL3Byb2R1Y2Vycy9zb2NrZXQtcmVjZWl2ZS1tZXRob2RzL2FsbC1tZW1iZXJzLXJlc3Quc2VydmljZSc7XG5pbXBvcnQgeyBEaXNjb25uZWN0IH0gZnJvbSAnLi4vLi4vcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvZGlzY29ubmVjdC5zZXJ2aWNlJztcblxuaW1wb3J0IHsgQ2FwdHVyZUNhbnZhc1N0cmVhbSB9IGZyb20gJy4uLy4uL21ldGhvZHMvd2hpdGVib2FyZC1tZXRob2RzL2NhcHR1cmUtY2FudmFzLXN0cmVhbS5zZXJ2aWNlJztcbmltcG9ydCB7IFJlc3VtZVBhdXNlQXVkaW9TdHJlYW1zIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL3Jlc3VtZS1wYXVzZS1hdWRpby1zdHJlYW1zLnNlcnZpY2UnO1xuaW1wb3J0IHsgUHJvY2Vzc0NvbnN1bWVyVHJhbnNwb3J0c0F1ZGlvIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL3Byb2Nlc3MtY29uc3VtZXItdHJhbnNwb3J0cy1hdWRpby5zZXJ2aWNlJztcblxuaW1wb3J0IHtcbiAgRGV2aWNlLFxuICBQcm9kdWNlcixcbiAgUHJvZHVjZXJPcHRpb25zLFxuICBSdHBDYXBhYmlsaXRpZXMsXG4gIFRyYW5zcG9ydCxcbn0gZnJvbSAnbWVkaWFzb3VwLWNsaWVudC9saWIvdHlwZXMnO1xuaW1wb3J0IHsgU2VsZmllU2VnbWVudGF0aW9uIH0gZnJvbSAnQG1lZGlhcGlwZS9zZWxmaWVfc2VnbWVudGF0aW9uJztcblxuZXhwb3J0IHR5cGUgTWVkaWFzZnVDaGF0T3B0aW9ucyA9IHtcbiAgUHJlam9pblBhZ2U/OiAob3B0aW9uczogUHJlSm9pblBhZ2VPcHRpb25zIHwgV2VsY29tZVBhZ2VPcHRpb25zKSA9PiBIVE1MRWxlbWVudDtcbiAgY3JlZGVudGlhbHM/OiB7IGFwaVVzZXJOYW1lOiBzdHJpbmc7IGFwaUtleTogc3RyaW5nIH07XG4gIHVzZUxvY2FsVUlNb2RlPzogYm9vbGVhbjtcbiAgc2VlZERhdGE/OiBTZWVkRGF0YTtcbiAgdXNlU2VlZD86IGJvb2xlYW47XG4gIGltZ1NyYz86IHN0cmluZztcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1tZWRpYXNmdS1jaGF0JyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW1xuICAgIFJvdXRlck91dGxldCxcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgQWxlcnRDb21wb25lbnQsXG4gICAgQXVkaW9HcmlkLFxuICAgIENvbnRyb2xCdXR0b25zQ29tcG9uZW50VG91Y2gsXG4gICAgRmxleGlibGVHcmlkLFxuICAgIExvYWRpbmdNb2RhbCxcbiAgICBDb25maXJtRXhpdE1vZGFsLFxuICAgIE1lc3NhZ2VzTW9kYWwsXG4gICAgQ29uZmlybUhlcmVNb2RhbCxcbiAgICBTaGFyZUV2ZW50TW9kYWwsXG4gICAgV2VsY29tZVBhZ2UsXG4gICAgTWFpbkFzcGVjdENvbXBvbmVudCxcbiAgICBNYWluQ29udGFpbmVyQ29tcG9uZW50LFxuICAgIE1haW5TY3JlZW5Db21wb25lbnQsXG4gICAgT3RoZXJHcmlkQ29tcG9uZW50LFxuICAgIE1lc3NhZ2VXaWRnZXQsXG4gIF0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdlxuICAgICAgY2xhc3M9XCJNZWRpYVNGVVwiXG4gICAgICBbbmdTdHlsZV09XCJ7XG4gICAgICAgIGhlaWdodDogJzEwMHZoJyxcbiAgICAgICAgd2lkdGg6ICcxMDB2dycsXG4gICAgICAgIG1heFdpZHRoOiAnMTAwdncnLFxuICAgICAgICBtYXhIZWlnaHQ6ICcxMDB2aCcsXG4gICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJ1xuICAgICAgfVwiXG4gICAgPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiF2YWxpZGF0ZWQudmFsdWU7IGVsc2UgbWFpbkNvbnRlbnRcIj5cbiAgICAgICAgPG5nLWNvbnRhaW5lclxuICAgICAgICAgICpuZ0NvbXBvbmVudE91dGxldD1cIlxuICAgICAgICAgICAgUHJlam9pblBhZ2VDb21wb25lbnQuY29tcG9uZW50O1xuICAgICAgICAgICAgaW5qZWN0b3I6IFByZWpvaW5QYWdlQ29tcG9uZW50LmluamVjdG9yXG4gICAgICAgICAgXCJcbiAgICAgICAgPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICA8bmctdGVtcGxhdGUgI21haW5Db250ZW50PlxuICAgICAgICA8YXBwLW1haW4tY29udGFpbmVyLWNvbXBvbmVudD5cbiAgICAgICAgICA8YXBwLW1haW4tYXNwZWN0LWNvbXBvbmVudFxuICAgICAgICAgICAgW2JhY2tncm91bmRDb2xvcl09XCIncmdiYSgyMTcsIDIyNywgMjM0LCAwLjk5KSdcIlxuICAgICAgICAgICAgW2RlZmF1bHRGcmFjdGlvbl09XCIxIC0gY29udHJvbEhlaWdodC52YWx1ZVwiXG4gICAgICAgICAgICBbc2hvd0NvbnRyb2xzXT1cImV2ZW50VHlwZS52YWx1ZSA9PT0gJ3dlYmluYXInIHx8IGV2ZW50VHlwZS52YWx1ZSA9PT0gJ2NvbmZlcmVuY2UnXCJcbiAgICAgICAgICAgIFt1cGRhdGVJc1dpZGVTY3JlZW5dPVwidXBkYXRlSXNXaWRlU2NyZWVuXCJcbiAgICAgICAgICAgIFt1cGRhdGVJc01lZGl1bVNjcmVlbl09XCJ1cGRhdGVJc01lZGl1bVNjcmVlblwiXG4gICAgICAgICAgICBbdXBkYXRlSXNTbWFsbFNjcmVlbl09XCJ1cGRhdGVJc1NtYWxsU2NyZWVuXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8YXBwLW1haW4tc2NyZWVuLWNvbXBvbmVudFxuICAgICAgICAgICAgICBbZG9TdGFja109XCJ0cnVlXCJcbiAgICAgICAgICAgICAgW21haW5TaXplXT1cIm1haW5IZWlnaHRXaWR0aC52YWx1ZVwiXG4gICAgICAgICAgICAgIFtkZWZhdWx0RnJhY3Rpb25dPVwiMSAtIGNvbnRyb2xIZWlnaHQudmFsdWVcIlxuICAgICAgICAgICAgICBbc2hvd0NvbnRyb2xzXT1cImV2ZW50VHlwZS52YWx1ZSA9PT0gJ3dlYmluYXInIHx8IGV2ZW50VHlwZS52YWx1ZSA9PT0gJ2NvbmZlcmVuY2UnXCJcbiAgICAgICAgICAgICAgW3VwZGF0ZUNvbXBvbmVudFNpemVzXT1cInVwZGF0ZUNvbXBvbmVudFNpemVzXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPCEtLSBNYWluR3JpZENvbXBvbmVudCByZW1vdmVkIC0tPlxuXG4gICAgICAgICAgICAgIDwhLS0gT3RoZXJHcmlkQ29tcG9uZW50IC0tPlxuICAgICAgICAgICAgICA8YXBwLW90aGVyLWdyaWQtY29tcG9uZW50XG4gICAgICAgICAgICAgICAgW2hlaWdodF09XCJjb21wb25lbnRTaXplcy52YWx1ZS5vdGhlckhlaWdodFwiXG4gICAgICAgICAgICAgICAgW3dpZHRoXT1cImNvbXBvbmVudFNpemVzLnZhbHVlLm90aGVyV2lkdGhcIlxuICAgICAgICAgICAgICAgIFtiYWNrZ3JvdW5kQ29sb3JdPVwiJ3JnYmEoMjE3LCAyMjcsIDIzNCwgMC45OSknXCJcbiAgICAgICAgICAgICAgICBbc2hvd0FzcGVjdF09XCJtYWluSGVpZ2h0V2lkdGgudmFsdWUgIT09IDEwMFwiXG4gICAgICAgICAgICAgICAgW3RpbWVCYWNrZ3JvdW5kQ29sb3JdPVwicmVjb3JkU3RhdGUudmFsdWVcIlxuICAgICAgICAgICAgICAgIFtzaG93VGltZXJdPVwibWFpbkhlaWdodFdpZHRoLnZhbHVlID09PSAwXCJcbiAgICAgICAgICAgICAgICBbbWVldGluZ1Byb2dyZXNzVGltZV09XCJtZWV0aW5nUHJvZ3Jlc3NUaW1lLnZhbHVlXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDwhLS0gQXVkaW9HcmlkIC0tPlxuICAgICAgICAgICAgICAgIDxhcHAtYXVkaW8tZ3JpZCBbY29tcG9uZW50c1RvUmVuZGVyXT1cImF1ZGlvT25seVN0cmVhbXMudmFsdWVcIj48L2FwcC1hdWRpby1ncmlkPlxuXG4gICAgICAgICAgICAgICAgPCEtLSBDb250cm9sIEJ1dHRvbnMgZm9yIENoYXQgLS0+XG4gICAgICAgICAgICAgICAgPGFwcC1jb250cm9sLWJ1dHRvbnMtY29tcG9uZW50LXRvdWNoXG4gICAgICAgICAgICAgICAgICBbYnV0dG9uc109XCJjb250cm9sQ2hhdEJ1dHRvbnNcIlxuICAgICAgICAgICAgICAgICAgW3Bvc2l0aW9uXT1cIidyaWdodCdcIlxuICAgICAgICAgICAgICAgICAgW2xvY2F0aW9uXT1cIidib3R0b20nXCJcbiAgICAgICAgICAgICAgICAgIFtkaXJlY3Rpb25dPVwiJ3ZlcnRpY2FsJ1wiXG4gICAgICAgICAgICAgICAgICBbc2hvd0FzcGVjdF09XCJldmVudFR5cGUudmFsdWUgPT09ICdjaGF0J1wiXG4gICAgICAgICAgICAgICAgPjwvYXBwLWNvbnRyb2wtYnV0dG9ucy1jb21wb25lbnQtdG91Y2g+XG5cbiAgICAgICAgICAgICAgICA8IS0tIEZsZXhpYmxlIEdyaWQgLS0+XG4gICAgICAgICAgICAgICAgPGFwcC1mbGV4aWJsZS1ncmlkXG4gICAgICAgICAgICAgICAgICBbY3VzdG9tV2lkdGhdPVwiZ3JpZFNpemVzLnZhbHVlLmdyaWRXaWR0aCFcIlxuICAgICAgICAgICAgICAgICAgW2N1c3RvbUhlaWdodF09XCJncmlkU2l6ZXMudmFsdWUuZ3JpZEhlaWdodCFcIlxuICAgICAgICAgICAgICAgICAgW3Jvd3NdPVwiZ3JpZFJvd3MudmFsdWVcIlxuICAgICAgICAgICAgICAgICAgW2NvbHVtbnNdPVwiZ3JpZENvbHMudmFsdWVcIlxuICAgICAgICAgICAgICAgICAgW2NvbXBvbmVudHNUb1JlbmRlcl09XCJvdGhlckdyaWRTdHJlYW1zLnZhbHVlWzBdXCJcbiAgICAgICAgICAgICAgICAgIFtiYWNrZ3JvdW5kQ29sb3JdPVwiJ3JnYmEoMjE3LCAyMjcsIDIzNCwgMC45OSknXCJcbiAgICAgICAgICAgICAgICA+PC9hcHAtZmxleGlibGUtZ3JpZD5cbiAgICAgICAgICAgICAgPC9hcHAtb3RoZXItZ3JpZC1jb21wb25lbnQ+XG4gICAgICAgICAgICA8L2FwcC1tYWluLXNjcmVlbi1jb21wb25lbnQ+XG4gICAgICAgICAgPC9hcHAtbWFpbi1hc3BlY3QtY29tcG9uZW50PlxuXG4gICAgICAgICAgPCEtLSBTdWJBc3BlY3RDb21wb25lbnQgcmVtb3ZlZCAtLT5cbiAgICAgICAgPC9hcHAtbWFpbi1jb250YWluZXItY29tcG9uZW50PlxuICAgICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgICAgPCEtLSBNb2RhbHMgdG8gaW5jbHVkZSAtLT5cbiAgICAgIDxhcHAtbWVzc2FnZXMtbW9kYWxcbiAgICAgICAgW2JhY2tncm91bmRDb2xvcl09XCJcbiAgICAgICAgICBldmVudFR5cGUudmFsdWUgPT09ICd3ZWJpbmFyJyB8fCBldmVudFR5cGUudmFsdWUgPT09ICdjb25mZXJlbmNlJ1xuICAgICAgICAgICAgPyAnI2Y1ZjVmNSdcbiAgICAgICAgICAgIDogJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMC4yNSknXG4gICAgICAgIFwiXG4gICAgICAgIFtpc01lc3NhZ2VzTW9kYWxWaXNpYmxlXT1cImlzTWVzc2FnZXNNb2RhbFZpc2libGUudmFsdWVcIlxuICAgICAgICBbb25NZXNzYWdlc0Nsb3NlXT1cIm9uTWVzc2FnZXNDbG9zZVwiXG4gICAgICAgIFttZXNzYWdlc109XCJtZXNzYWdlcy52YWx1ZVwiXG4gICAgICAgIFtldmVudFR5cGVdPVwiZXZlbnRUeXBlLnZhbHVlXCJcbiAgICAgICAgW21lbWJlcl09XCJtZW1iZXIudmFsdWVcIlxuICAgICAgICBbaXNsZXZlbF09XCJpc2xldmVsLnZhbHVlXCJcbiAgICAgICAgW2NvSG9zdFJlc3BvbnNpYmlsaXR5XT1cImNvSG9zdFJlc3BvbnNpYmlsaXR5LnZhbHVlXCJcbiAgICAgICAgW2NvSG9zdF09XCJjb0hvc3QudmFsdWVcIlxuICAgICAgICBbc3RhcnREaXJlY3RNZXNzYWdlXT1cInN0YXJ0RGlyZWN0TWVzc2FnZS52YWx1ZVwiXG4gICAgICAgIFtkaXJlY3RNZXNzYWdlRGV0YWlsc109XCJkaXJlY3RNZXNzYWdlRGV0YWlscy52YWx1ZVwiXG4gICAgICAgIFt1cGRhdGVTdGFydERpcmVjdE1lc3NhZ2VdPVwidXBkYXRlU3RhcnREaXJlY3RNZXNzYWdlXCJcbiAgICAgICAgW3VwZGF0ZURpcmVjdE1lc3NhZ2VEZXRhaWxzXT1cInVwZGF0ZURpcmVjdE1lc3NhZ2VEZXRhaWxzXCJcbiAgICAgICAgW3Nob3dBbGVydF09XCJzaG93QWxlcnRcIlxuICAgICAgICBbcm9vbU5hbWVdPVwicm9vbU5hbWUudmFsdWVcIlxuICAgICAgICBbc29ja2V0XT1cInNvY2tldC52YWx1ZVwiXG4gICAgICAgIFtjaGF0U2V0dGluZ109XCJjaGF0U2V0dGluZy52YWx1ZVwiXG4gICAgICA+PC9hcHAtbWVzc2FnZXMtbW9kYWw+XG5cbiAgICAgIDxhcHAtY29uZmlybS1leGl0LW1vZGFsXG4gICAgICAgIFtiYWNrZ3JvdW5kQ29sb3JdPVwiJ3JnYmEoMTgxLCAyMzMsIDIyOSwgMC45NyknXCJcbiAgICAgICAgW2lzQ29uZmlybUV4aXRNb2RhbFZpc2libGVdPVwiaXNDb25maXJtRXhpdE1vZGFsVmlzaWJsZS52YWx1ZVwiXG4gICAgICAgIFtvbkNvbmZpcm1FeGl0Q2xvc2VdPVwib25Db25maXJtRXhpdENsb3NlXCJcbiAgICAgICAgW3Bvc2l0aW9uXT1cIid0b3BSaWdodCdcIlxuICAgICAgICBbbWVtYmVyXT1cIm1lbWJlci52YWx1ZVwiXG4gICAgICAgIFtyb29tTmFtZV09XCJyb29tTmFtZS52YWx1ZVwiXG4gICAgICAgIFtzb2NrZXRdPVwic29ja2V0LnZhbHVlXCJcbiAgICAgICAgW2lzbGV2ZWxdPVwiaXNsZXZlbC52YWx1ZVwiXG4gICAgICA+PC9hcHAtY29uZmlybS1leGl0LW1vZGFsPlxuXG4gICAgICA8YXBwLWNvbmZpcm0taGVyZS1tb2RhbFxuICAgICAgICBbYmFja2dyb3VuZENvbG9yXT1cIidyZ2JhKDE4MSwgMjMzLCAyMjksIDAuOTcpJ1wiXG4gICAgICAgIFtpc0NvbmZpcm1IZXJlTW9kYWxWaXNpYmxlXT1cImlzQ29uZmlybUhlcmVNb2RhbFZpc2libGUudmFsdWVcIlxuICAgICAgICBbb25Db25maXJtSGVyZUNsb3NlXT1cIm9uQ29uZmlybUhlcmVDbG9zZVwiXG4gICAgICAgIFttZW1iZXJdPVwibWVtYmVyLnZhbHVlXCJcbiAgICAgICAgW3Jvb21OYW1lXT1cInJvb21OYW1lLnZhbHVlXCJcbiAgICAgICAgW3NvY2tldF09XCJzb2NrZXQudmFsdWVcIlxuICAgICAgPjwvYXBwLWNvbmZpcm0taGVyZS1tb2RhbD5cblxuICAgICAgPGFwcC1zaGFyZS1ldmVudC1tb2RhbFxuICAgICAgICBbaXNTaGFyZUV2ZW50TW9kYWxWaXNpYmxlXT1cImlzU2hhcmVFdmVudE1vZGFsVmlzaWJsZS52YWx1ZVwiXG4gICAgICAgIFtvblNoYXJlRXZlbnRDbG9zZV09XCJvblNoYXJlRXZlbnRDbG9zZVwiXG4gICAgICAgIFtyb29tTmFtZV09XCJyb29tTmFtZS52YWx1ZVwiXG4gICAgICAgIFtpc2xldmVsXT1cImlzbGV2ZWwudmFsdWVcIlxuICAgICAgICBbYWRtaW5QYXNzY29kZV09XCJhZG1pblBhc3Njb2RlLnZhbHVlXCJcbiAgICAgICAgW2V2ZW50VHlwZV09XCJldmVudFR5cGUudmFsdWVcIlxuICAgICAgPjwvYXBwLXNoYXJlLWV2ZW50LW1vZGFsPlxuXG4gICAgICA8YXBwLWFsZXJ0LWNvbXBvbmVudFxuICAgICAgICBbdmlzaWJsZV09XCJhbGVydFZpc2libGUudmFsdWVcIlxuICAgICAgICBbbWVzc2FnZV09XCJhbGVydE1lc3NhZ2UudmFsdWVcIlxuICAgICAgICBbdHlwZV09XCJhbGVydFR5cGUudmFsdWVcIlxuICAgICAgICBbZHVyYXRpb25dPVwiYWxlcnREdXJhdGlvbi52YWx1ZVwiXG4gICAgICAgIFtvbkhpZGVdPVwib25BbGVydEhpZGVcIlxuICAgICAgICB0ZXh0Q29sb3I9XCIjZmZmZmZmXCJcbiAgICAgID48L2FwcC1hbGVydC1jb21wb25lbnQ+XG5cbiAgICAgIDxhcHAtbG9hZGluZy1tb2RhbFxuICAgICAgICBbaXNWaXNpYmxlXT1cImlzTG9hZGluZ01vZGFsVmlzaWJsZS52YWx1ZVwiXG4gICAgICAgIFtiYWNrZ3JvdW5kQ29sb3JdPVwiJ3JnYmEoMjE3LCAyMjcsIDIzNCwgMC45OSknXCJcbiAgICAgICAgZGlzcGxheUNvbG9yPVwiYmxhY2tcIlxuICAgICAgPjwvYXBwLWxvYWRpbmctbW9kYWw+XG4gICAgPC9kaXY+XG4gIGAsXG4gIHN0eWxlczogW1xuICAgIGBcbiAgICAgIC5NZWRpYVNGVSB7XG4gICAgICAgIC8qIEFkZCBhbnkgY29tcG9uZW50LXNwZWNpZmljIHN0eWxlcyBoZXJlICovXG4gICAgICB9XG4gICAgYCxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbQ29va2llU2VydmljZV0sXG59KVxuZXhwb3J0IGNsYXNzIE1lZGlhc2Z1Q2hhdCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgQElucHV0KClcbiAgUHJlam9pblBhZ2U6IGFueSA9IFdlbGNvbWVQYWdlO1xuICBASW5wdXQoKSBjcmVkZW50aWFsczogeyBhcGlVc2VyTmFtZTogc3RyaW5nOyBhcGlLZXk6IHN0cmluZyB9ID0geyBhcGlVc2VyTmFtZTogJycsIGFwaUtleTogJycgfTtcbiAgQElucHV0KCkgdXNlTG9jYWxVSU1vZGUgPSBmYWxzZTtcbiAgQElucHV0KCkgc2VlZERhdGE/OiBTZWVkRGF0YTtcbiAgQElucHV0KCkgdXNlU2VlZCA9IGZhbHNlO1xuICBASW5wdXQoKSBpbWdTcmMgPSAnaHR0cHM6Ly9tZWRpYXNmdS5jb20vaW1hZ2VzL2xvZ28xOTIucG5nJztcblxuICB0aXRsZSA9ICdNZWRpYVNGVS1DaGF0JztcblxuICBwcml2YXRlIG1haW5IZWlnaHRXaWR0aFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uIHwgdW5kZWZpbmVkO1xuICBwcml2YXRlIHZhbGlkYXRlZFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uIHwgdW5kZWZpbmVkO1xuICBwcml2YXRlIGlzbGV2ZWxTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiB8IHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSBjb0hvc3RTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiB8IHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSBTY3JlZW5ib2FyZFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uIHwgdW5kZWZpbmVkO1xuICBwcml2YXRlIHJlY29yZGluZ1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uIHwgdW5kZWZpbmVkO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvcixcbiAgICBwdWJsaWMgdXBkYXRlTWluaUNhcmRzR3JpZDogVXBkYXRlTWluaUNhcmRzR3JpZCxcbiAgICBwdWJsaWMgbWl4U3RyZWFtczogTWl4U3RyZWFtcyxcbiAgICBwdWJsaWMgZGlzcFN0cmVhbXM6IERpc3BTdHJlYW1zLFxuICAgIHB1YmxpYyBzdG9wU2hhcmVTY3JlZW46IFN0b3BTaGFyZVNjcmVlbixcbiAgICBwdWJsaWMgY2hlY2tTY3JlZW5TaGFyZTogQ2hlY2tTY3JlZW5TaGFyZSxcbiAgICBwdWJsaWMgc3RhcnRTaGFyZVNjcmVlbjogU3RhcnRTaGFyZVNjcmVlbixcbiAgICBwdWJsaWMgcmVxdWVzdFNjcmVlblNoYXJlOiBSZXF1ZXN0U2NyZWVuU2hhcmUsXG4gICAgcHVibGljIHJlb3JkZXJTdHJlYW1zOiBSZW9yZGVyU3RyZWFtcyxcbiAgICBwdWJsaWMgcHJlcG9wdWxhdGVVc2VyTWVkaWE6IFByZXBvcHVsYXRlVXNlck1lZGlhLFxuICAgIHB1YmxpYyBnZXRWaWRlb3M6IEdldFZpZGVvcyxcbiAgICBwdWJsaWMgcmVQb3J0OiBSZVBvcnQsXG4gICAgcHVibGljIHRyaWdnZXI6IFRyaWdnZXIsXG4gICAgcHVibGljIGNvbnN1bWVyUmVzdW1lOiBDb25zdW1lclJlc3VtZSxcbiAgICBwdWJsaWMgY29ubmVjdFNlbmRUcmFuc3BvcnQ6IENvbm5lY3RTZW5kVHJhbnNwb3J0LFxuICAgIHB1YmxpYyBjb25uZWN0U2VuZFRyYW5zcG9ydEF1ZGlvOiBDb25uZWN0U2VuZFRyYW5zcG9ydEF1ZGlvLFxuICAgIHB1YmxpYyBjb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvOiBDb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvLFxuICAgIHB1YmxpYyBjb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlbjogQ29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW4sXG4gICAgcHVibGljIHByb2Nlc3NDb25zdW1lclRyYW5zcG9ydHM6IFByb2Nlc3NDb25zdW1lclRyYW5zcG9ydHMsXG4gICAgcHVibGljIHJlc3VtZVBhdXNlU3RyZWFtczogUmVzdW1lUGF1c2VTdHJlYW1zLFxuICAgIHB1YmxpYyByZWFkanVzdDogUmVhZGp1c3QsXG4gICAgcHVibGljIGNoZWNrR3JpZDogQ2hlY2tHcmlkLFxuICAgIHB1YmxpYyBnZXRFc3RpbWF0ZTogR2V0RXN0aW1hdGUsXG4gICAgcHVibGljIGNhbGN1bGF0ZVJvd3NBbmRDb2x1bW5zOiBDYWxjdWxhdGVSb3dzQW5kQ29sdW1ucyxcbiAgICBwdWJsaWMgYWRkVmlkZW9zR3JpZDogQWRkVmlkZW9zR3JpZCxcbiAgICBwdWJsaWMgb25TY3JlZW5DaGFuZ2VzOiBPblNjcmVlbkNoYW5nZXMsXG4gICAgcHVibGljIGNoYW5nZVZpZHM6IENoYW5nZVZpZHMsXG4gICAgcHVibGljIGNvbXBhcmVBY3RpdmVOYW1lczogQ29tcGFyZUFjdGl2ZU5hbWVzLFxuICAgIHB1YmxpYyBjb21wYXJlU2NyZWVuU3RhdGVzOiBDb21wYXJlU2NyZWVuU3RhdGVzLFxuICAgIHB1YmxpYyBjcmVhdGVTZW5kVHJhbnNwb3J0OiBDcmVhdGVTZW5kVHJhbnNwb3J0LFxuICAgIHB1YmxpYyByZXN1bWVTZW5kVHJhbnNwb3J0QXVkaW86IFJlc3VtZVNlbmRUcmFuc3BvcnRBdWRpbyxcbiAgICBwdWJsaWMgcmVjZWl2ZUFsbFBpcGVkVHJhbnNwb3J0czogUmVjZWl2ZUFsbFBpcGVkVHJhbnNwb3J0cyxcbiAgICBwdWJsaWMgZGlzY29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlbzogRGlzY29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlbyxcbiAgICBwdWJsaWMgZGlzY29ubmVjdFNlbmRUcmFuc3BvcnRBdWRpbzogRGlzY29ubmVjdFNlbmRUcmFuc3BvcnRBdWRpbyxcbiAgICBwdWJsaWMgZGlzY29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW46IERpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuLFxuICAgIHB1YmxpYyBnZXRQaXBlZFByb2R1Y2Vyc0FsdDogR2V0UGlwZWRQcm9kdWNlcnNBbHQsXG4gICAgcHVibGljIHNpZ25hbE5ld0NvbnN1bWVyVHJhbnNwb3J0OiBTaWduYWxOZXdDb25zdW1lclRyYW5zcG9ydCxcbiAgICBwdWJsaWMgY29ubmVjdFJlY3ZUcmFuc3BvcnQ6IENvbm5lY3RSZWN2VHJhbnNwb3J0LFxuICAgIHB1YmxpYyByZVVwZGF0ZUludGVyOiBSZVVwZGF0ZUludGVyLFxuICAgIHB1YmxpYyB1cGRhdGVQYXJ0aWNpcGFudEF1ZGlvRGVjaWJlbHM6IFVwZGF0ZVBhcnRpY2lwYW50QXVkaW9EZWNpYmVscyxcbiAgICBwdWJsaWMgY2xvc2VBbmRSZXNpemU6IENsb3NlQW5kUmVzaXplLFxuICAgIHB1YmxpYyBhdXRvQWRqdXN0OiBBdXRvQWRqdXN0LFxuICAgIHB1YmxpYyBzd2l0Y2hVc2VyVmlkZW9BbHQ6IFN3aXRjaFVzZXJWaWRlb0FsdCxcbiAgICBwdWJsaWMgc3dpdGNoVXNlclZpZGVvOiBTd2l0Y2hVc2VyVmlkZW8sXG4gICAgcHVibGljIHN3aXRjaFVzZXJBdWRpbzogU3dpdGNoVXNlckF1ZGlvLFxuICAgIHB1YmxpYyBnZXREb21haW5zOiBHZXREb21haW5zLFxuICAgIHB1YmxpYyBmb3JtYXROdW1iZXI6IEZvcm1hdE51bWJlcixcbiAgICBwdWJsaWMgY29ubmVjdElwczogQ29ubmVjdElwcyxcbiAgICBwdWJsaWMgY3JlYXRlRGV2aWNlQ2xpZW50OiBDcmVhdGVEZXZpY2VDbGllbnQsXG5cbiAgICBwdWJsaWMgY2FwdHVyZUNhbnZhc1N0cmVhbTogQ2FwdHVyZUNhbnZhc1N0cmVhbSxcbiAgICBwdWJsaWMgcmVzdW1lUGF1c2VBdWRpb1N0cmVhbXM6IFJlc3VtZVBhdXNlQXVkaW9TdHJlYW1zLFxuICAgIHB1YmxpYyBwcm9jZXNzQ29uc3VtZXJUcmFuc3BvcnRzQXVkaW86IFByb2Nlc3NDb25zdW1lclRyYW5zcG9ydHNBdWRpbyxcblxuICAgIHB1YmxpYyBsYXVuY2hNZXNzYWdlczogTGF1bmNoTWVzc2FnZXMsXG4gICAgcHVibGljIGxhdW5jaENvbmZpcm1FeGl0OiBMYXVuY2hDb25maXJtRXhpdCxcblxuICAgIHB1YmxpYyBzdGFydE1lZXRpbmdQcm9ncmVzc1RpbWVyOiBTdGFydE1lZXRpbmdQcm9ncmVzc1RpbWVyLFxuXG4gICAgcHVibGljIHByb2R1Y2VyTWVkaWFQYXVzZWQ6IFByb2R1Y2VyTWVkaWFQYXVzZWQsXG4gICAgcHVibGljIHByb2R1Y2VyTWVkaWFSZXN1bWVkOiBQcm9kdWNlck1lZGlhUmVzdW1lZCxcbiAgICBwdWJsaWMgcHJvZHVjZXJNZWRpYUNsb3NlZDogUHJvZHVjZXJNZWRpYUNsb3NlZCxcbiAgICBwdWJsaWMgbWVldGluZ0VuZGVkOiBNZWV0aW5nRW5kZWQsXG4gICAgcHVibGljIGRpc2Nvbm5lY3RVc2VyU2VsZjogRGlzY29ubmVjdFVzZXJTZWxmLFxuICAgIHB1YmxpYyByZWNlaXZlTWVzc2FnZTogUmVjZWl2ZU1lc3NhZ2UsXG4gICAgcHVibGljIG1lZXRpbmdUaW1lUmVtYWluaW5nOiBNZWV0aW5nVGltZVJlbWFpbmluZyxcbiAgICBwdWJsaWMgbWVldGluZ1N0aWxsVGhlcmU6IE1lZXRpbmdTdGlsbFRoZXJlLFxuXG4gICAgcHVibGljIGFsbE1lbWJlcnM6IEFsbE1lbWJlcnMsXG4gICAgcHVibGljIGFsbE1lbWJlcnNSZXN0OiBBbGxNZW1iZXJzUmVzdCxcbiAgICBwdWJsaWMgZGlzY29ubmVjdDogRGlzY29ubmVjdCxcblxuICAgIHB1YmxpYyBzb2NrZXRNYW5hZ2VyOiBTb2NrZXRNYW5hZ2VyLFxuICAgIHB1YmxpYyBqb2luUm9vbUNsaWVudDogSm9pblJvb21DbGllbnQsXG4gICAgcHVibGljIHVwZGF0ZVJvb21QYXJhbWV0ZXJzQ2xpZW50OiBVcGRhdGVSb29tUGFyYW1ldGVyc0NsaWVudCxcbiAgICBwdWJsaWMgY2xpY2tWaWRlbzogQ2xpY2tWaWRlbyxcbiAgICBwdWJsaWMgY2xpY2tBdWRpbzogQ2xpY2tBdWRpbyxcbiAgICBwdWJsaWMgY2xpY2tTY3JlZW5TaGFyZTogQ2xpY2tTY3JlZW5TaGFyZSxcbiAgICBwdWJsaWMgc3dpdGNoVmlkZW9BbHQ6IFN3aXRjaFZpZGVvQWx0LFxuICAgIHB1YmxpYyBzdHJlYW1TdWNjZXNzVmlkZW86IFN0cmVhbVN1Y2Nlc3NWaWRlbyxcbiAgICBwdWJsaWMgc3RyZWFtU3VjY2Vzc0F1ZGlvOiBTdHJlYW1TdWNjZXNzQXVkaW8sXG4gICAgcHVibGljIHN0cmVhbVN1Y2Nlc3NTY3JlZW46IFN0cmVhbVN1Y2Nlc3NTY3JlZW4sXG4gICAgcHVibGljIHN0cmVhbVN1Y2Nlc3NBdWRpb1N3aXRjaDogU3RyZWFtU3VjY2Vzc0F1ZGlvU3dpdGNoLFxuICAgIHB1YmxpYyBjaGVja1Blcm1pc3Npb246IENoZWNrUGVybWlzc2lvbixcblxuICAgIHB1YmxpYyB1cGRhdGVDb25zdW1pbmdEb21haW5zOiBVcGRhdGVDb25zdW1pbmdEb21haW5zLFxuICAgIHB1YmxpYyByZWNlaXZlUm9vbU1lc3NhZ2VzOiBSZWNlaXZlUm9vbU1lc3NhZ2VzLFxuICApIHt9XG5cbiAgY3JlYXRlSW5qZWN0b3IoaW5wdXRzOiBhbnkpIHtcbiAgICBjb25zdCBpbmogPSBJbmplY3Rvci5jcmVhdGUoe1xuICAgICAgcHJvdmlkZXJzOiBPYmplY3Qua2V5cyhpbnB1dHMpLm1hcCgoa2V5KSA9PiAoeyBwcm92aWRlOiBrZXksIHVzZVZhbHVlOiBpbnB1dHNba2V5XSB9KSksXG4gICAgICBwYXJlbnQ6IHRoaXMuaW5qZWN0b3IsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gaW5qO1xuICB9XG5cbiAgLy8gSW5pdGlhbCB2YWx1ZXNcbiAgbWVkaWFTRlVGdW5jdGlvbnMgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZU1pbmlDYXJkc0dyaWQ6XG4gICAgICAgIHRoaXMudXBkYXRlTWluaUNhcmRzR3JpZD8udXBkYXRlTWluaUNhcmRzR3JpZCB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgbWl4U3RyZWFtczpcbiAgICAgICAgdGhpcy5taXhTdHJlYW1zPy5taXhTdHJlYW1zIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBkaXNwU3RyZWFtczpcbiAgICAgICAgdGhpcy5kaXNwU3RyZWFtcz8uZGlzcFN0cmVhbXMgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIHN0b3BTaGFyZVNjcmVlbjpcbiAgICAgICAgdGhpcy5zdG9wU2hhcmVTY3JlZW4/LnN0b3BTaGFyZVNjcmVlbiB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgY2hlY2tTY3JlZW5TaGFyZTpcbiAgICAgICAgdGhpcy5jaGVja1NjcmVlblNoYXJlPy5jaGVja1NjcmVlblNoYXJlIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBzdGFydFNoYXJlU2NyZWVuOlxuICAgICAgICB0aGlzLnN0YXJ0U2hhcmVTY3JlZW4/LnN0YXJ0U2hhcmVTY3JlZW4gfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIHJlcXVlc3RTY3JlZW5TaGFyZTpcbiAgICAgICAgdGhpcy5yZXF1ZXN0U2NyZWVuU2hhcmU/LnJlcXVlc3RTY3JlZW5TaGFyZSB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgcmVvcmRlclN0cmVhbXM6XG4gICAgICAgIHRoaXMucmVvcmRlclN0cmVhbXM/LnJlb3JkZXJTdHJlYW1zIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBwcmVwb3B1bGF0ZVVzZXJNZWRpYTpcbiAgICAgICAgdGhpcy5wcmVwb3B1bGF0ZVVzZXJNZWRpYT8ucHJlcG9wdWxhdGVVc2VyTWVkaWEgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGdldFZpZGVvczpcbiAgICAgICAgdGhpcy5nZXRWaWRlb3M/LmdldFZpZGVvcyB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgcmVQb3J0OlxuICAgICAgICB0aGlzLnJlUG9ydD8ucmVQb3J0IHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICB0cmlnZ2VyOlxuICAgICAgICB0aGlzLnRyaWdnZXI/LnRyaWdnZXIgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGNvbnN1bWVyUmVzdW1lOlxuICAgICAgICB0aGlzLmNvbnN1bWVyUmVzdW1lPy5jb25zdW1lclJlc3VtZSB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgY29ubmVjdFNlbmRUcmFuc3BvcnQ6XG4gICAgICAgIHRoaXMuY29ubmVjdFNlbmRUcmFuc3BvcnQ/LmNvbm5lY3RTZW5kVHJhbnNwb3J0IHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBjb25uZWN0U2VuZFRyYW5zcG9ydEF1ZGlvOlxuICAgICAgICB0aGlzLmNvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW8/LmNvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW8gfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGNvbm5lY3RTZW5kVHJhbnNwb3J0VmlkZW86XG4gICAgICAgIHRoaXMuY29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlbz8uY29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlbyB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgY29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW46XG4gICAgICAgIHRoaXMuY29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW4/LmNvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBwcm9jZXNzQ29uc3VtZXJUcmFuc3BvcnRzOlxuICAgICAgICB0aGlzLnByb2Nlc3NDb25zdW1lclRyYW5zcG9ydHM/LnByb2Nlc3NDb25zdW1lclRyYW5zcG9ydHMgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIHJlc3VtZVBhdXNlU3RyZWFtczpcbiAgICAgICAgdGhpcy5yZXN1bWVQYXVzZVN0cmVhbXM/LnJlc3VtZVBhdXNlU3RyZWFtcyB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgcmVhZGp1c3Q6XG4gICAgICAgIHRoaXMucmVhZGp1c3Q/LnJlYWRqdXN0IHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBjaGVja0dyaWQ6XG4gICAgICAgIHRoaXMuY2hlY2tHcmlkPy5jaGVja0dyaWQgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGdldEVzdGltYXRlOlxuICAgICAgICB0aGlzLmdldEVzdGltYXRlPy5nZXRFc3RpbWF0ZSB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgY2FsY3VsYXRlUm93c0FuZENvbHVtbnM6XG4gICAgICAgIHRoaXMuY2FsY3VsYXRlUm93c0FuZENvbHVtbnM/LmNhbGN1bGF0ZVJvd3NBbmRDb2x1bW5zIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBhZGRWaWRlb3NHcmlkOlxuICAgICAgICB0aGlzLmFkZFZpZGVvc0dyaWQ/LmFkZFZpZGVvc0dyaWQgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIG9uU2NyZWVuQ2hhbmdlczpcbiAgICAgICAgdGhpcy5vblNjcmVlbkNoYW5nZXM/Lm9uU2NyZWVuQ2hhbmdlcyB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgc2xlZXA6XG4gICAgICAgIHNsZWVwIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBjaGFuZ2VWaWRzOlxuICAgICAgICB0aGlzLmNoYW5nZVZpZHM/LmNoYW5nZVZpZHMgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGNvbXBhcmVBY3RpdmVOYW1lczpcbiAgICAgICAgdGhpcy5jb21wYXJlQWN0aXZlTmFtZXM/LmNvbXBhcmVBY3RpdmVOYW1lcyB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgY29tcGFyZVNjcmVlblN0YXRlczpcbiAgICAgICAgdGhpcy5jb21wYXJlU2NyZWVuU3RhdGVzPy5jb21wYXJlU2NyZWVuU3RhdGVzIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBjcmVhdGVTZW5kVHJhbnNwb3J0OlxuICAgICAgICB0aGlzLmNyZWF0ZVNlbmRUcmFuc3BvcnQ/LmNyZWF0ZVNlbmRUcmFuc3BvcnQgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIHJlc3VtZVNlbmRUcmFuc3BvcnRBdWRpbzpcbiAgICAgICAgdGhpcy5yZXN1bWVTZW5kVHJhbnNwb3J0QXVkaW8/LnJlc3VtZVNlbmRUcmFuc3BvcnRBdWRpbyB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgcmVjZWl2ZUFsbFBpcGVkVHJhbnNwb3J0czpcbiAgICAgICAgdGhpcy5yZWNlaXZlQWxsUGlwZWRUcmFuc3BvcnRzPy5yZWNlaXZlQWxsUGlwZWRUcmFuc3BvcnRzIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBkaXNjb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvOlxuICAgICAgICB0aGlzLmRpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0VmlkZW8/LmRpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0VmlkZW8gfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGRpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW86XG4gICAgICAgIHRoaXMuZGlzY29ubmVjdFNlbmRUcmFuc3BvcnRBdWRpbz8uZGlzY29ubmVjdFNlbmRUcmFuc3BvcnRBdWRpbyB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgZGlzY29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW46XG4gICAgICAgIHRoaXMuZGlzY29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW4/LmRpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBnZXRQaXBlZFByb2R1Y2Vyc0FsdDpcbiAgICAgICAgdGhpcy5nZXRQaXBlZFByb2R1Y2Vyc0FsdD8uZ2V0UGlwZWRQcm9kdWNlcnNBbHQgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIHNpZ25hbE5ld0NvbnN1bWVyVHJhbnNwb3J0OlxuICAgICAgICB0aGlzLnNpZ25hbE5ld0NvbnN1bWVyVHJhbnNwb3J0Py5zaWduYWxOZXdDb25zdW1lclRyYW5zcG9ydCB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgY29ubmVjdFJlY3ZUcmFuc3BvcnQ6XG4gICAgICAgIHRoaXMuY29ubmVjdFJlY3ZUcmFuc3BvcnQ/LmNvbm5lY3RSZWN2VHJhbnNwb3J0IHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICByZVVwZGF0ZUludGVyOlxuICAgICAgICB0aGlzLnJlVXBkYXRlSW50ZXI/LnJlVXBkYXRlSW50ZXIgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIHVwZGF0ZVBhcnRpY2lwYW50QXVkaW9EZWNpYmVsczpcbiAgICAgICAgdGhpcy51cGRhdGVQYXJ0aWNpcGFudEF1ZGlvRGVjaWJlbHM/LnVwZGF0ZVBhcnRpY2lwYW50QXVkaW9EZWNpYmVscyB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgY2xvc2VBbmRSZXNpemU6XG4gICAgICAgIHRoaXMuY2xvc2VBbmRSZXNpemU/LmNsb3NlQW5kUmVzaXplIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBhdXRvQWRqdXN0OlxuICAgICAgICB0aGlzLmF1dG9BZGp1c3Q/LmF1dG9BZGp1c3QgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIHN3aXRjaFVzZXJWaWRlb0FsdDpcbiAgICAgICAgdGhpcy5zd2l0Y2hVc2VyVmlkZW9BbHQ/LnN3aXRjaFVzZXJWaWRlb0FsdCB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgc3dpdGNoVXNlclZpZGVvOlxuICAgICAgICB0aGlzLnN3aXRjaFVzZXJWaWRlbz8uc3dpdGNoVXNlclZpZGVvIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBzd2l0Y2hVc2VyQXVkaW86XG4gICAgICAgIHRoaXMuc3dpdGNoVXNlckF1ZGlvPy5zd2l0Y2hVc2VyQXVkaW8gfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGdldERvbWFpbnM6XG4gICAgICAgIHRoaXMuZ2V0RG9tYWlucz8uZ2V0RG9tYWlucyB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgZm9ybWF0TnVtYmVyOlxuICAgICAgICB0aGlzLmZvcm1hdE51bWJlcj8uZm9ybWF0TnVtYmVyIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBjb25uZWN0SXBzOlxuICAgICAgICB0aGlzLmNvbm5lY3RJcHM/LmNvbm5lY3RJcHMgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGNyZWF0ZURldmljZUNsaWVudDpcbiAgICAgICAgdGhpcy5jcmVhdGVEZXZpY2VDbGllbnQ/LmNyZWF0ZURldmljZUNsaWVudCB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgY2FwdHVyZUNhbnZhc1N0cmVhbTpcbiAgICAgICAgdGhpcy5jYXB0dXJlQ2FudmFzU3RyZWFtPy5jYXB0dXJlQ2FudmFzU3RyZWFtIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICByZXN1bWVQYXVzZUF1ZGlvU3RyZWFtczpcbiAgICAgICAgdGhpcy5yZXN1bWVQYXVzZUF1ZGlvU3RyZWFtcz8ucmVzdW1lUGF1c2VBdWRpb1N0cmVhbXMgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIHByb2Nlc3NDb25zdW1lclRyYW5zcG9ydHNBdWRpbzpcbiAgICAgICAgdGhpcy5wcm9jZXNzQ29uc3VtZXJUcmFuc3BvcnRzQXVkaW8/LnByb2Nlc3NDb25zdW1lclRyYW5zcG9ydHNBdWRpbyB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgY2hlY2tQZXJtaXNzaW9uOlxuICAgICAgICB0aGlzLmNoZWNrUGVybWlzc2lvbj8uY2hlY2tQZXJtaXNzaW9uIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBzdHJlYW1TdWNjZXNzVmlkZW86XG4gICAgICAgIHRoaXMuc3RyZWFtU3VjY2Vzc1ZpZGVvPy5zdHJlYW1TdWNjZXNzVmlkZW8gfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIHN0cmVhbVN1Y2Nlc3NBdWRpbzpcbiAgICAgICAgdGhpcy5zdHJlYW1TdWNjZXNzQXVkaW8/LnN0cmVhbVN1Y2Nlc3NBdWRpbyB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgc3RyZWFtU3VjY2Vzc1NjcmVlbjpcbiAgICAgICAgdGhpcy5zdHJlYW1TdWNjZXNzU2NyZWVuPy5zdHJlYW1TdWNjZXNzU2NyZWVuIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBzdHJlYW1TdWNjZXNzQXVkaW9Td2l0Y2g6XG4gICAgICAgIHRoaXMuc3RyZWFtU3VjY2Vzc0F1ZGlvU3dpdGNoPy5zdHJlYW1TdWNjZXNzQXVkaW9Td2l0Y2ggfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGNsaWNrVmlkZW86XG4gICAgICAgIHRoaXMuY2xpY2tWaWRlbz8uY2xpY2tWaWRlbyB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgY2xpY2tBdWRpbzpcbiAgICAgICAgdGhpcy5jbGlja0F1ZGlvPy5jbGlja0F1ZGlvIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBjbGlja1NjcmVlblNoYXJlOlxuICAgICAgICB0aGlzLmNsaWNrU2NyZWVuU2hhcmU/LmNsaWNrU2NyZWVuU2hhcmUgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIHN3aXRjaFZpZGVvQWx0OlxuICAgICAgICB0aGlzLnN3aXRjaFZpZGVvQWx0Py5zd2l0Y2hWaWRlb0FsdCB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgcmVxdWVzdFBlcm1pc3Npb25DYW1lcmE6XG4gICAgICAgIHRoaXMucmVxdWVzdFBlcm1pc3Npb25DYW1lcmEgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIHJlcXVlc3RQZXJtaXNzaW9uQXVkaW86XG4gICAgICAgIHRoaXMucmVxdWVzdFBlcm1pc3Npb25BdWRpbyB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgIH07XG4gIH07XG5cbiAgdmFsaWRhdGVkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGxvY2FsVUlNb2RlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHNvY2tldCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8U29ja2V0Pih7fSBhcyBTb2NrZXQpO1xuICByb29tRGF0YSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UmVzcG9uc2VKb2luUm9vbSB8IG51bGw+KG51bGwpO1xuICBkZXZpY2UgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PERldmljZSB8IG51bGw+KG51bGwpO1xuICBhcGlLZXkgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICBhcGlVc2VyTmFtZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gIGFwaVRva2VuID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcbiAgbGluayA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG5cbiAgcm9vbU5hbWUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICBtZW1iZXIgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICBhZG1pblBhc3Njb2RlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcbiAgaXNsZXZlbCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignMScpO1xuICBjb0hvc3QgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJ05vIGNvSG9zdCcpO1xuICBjb0hvc3RSZXNwb25zaWJpbGl0eSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Q29Ib3N0UmVzcG9uc2liaWxpdHlbXT4oW1xuICAgIHsgbmFtZTogJ3BhcnRpY2lwYW50cycsIHZhbHVlOiBmYWxzZSwgZGVkaWNhdGVkOiBmYWxzZSB9LFxuICAgIHsgbmFtZTogJ21lZGlhJywgdmFsdWU6IGZhbHNlLCBkZWRpY2F0ZWQ6IGZhbHNlIH0sXG4gICAgeyBuYW1lOiAnd2FpdGluZycsIHZhbHVlOiBmYWxzZSwgZGVkaWNhdGVkOiBmYWxzZSB9LFxuICAgIHsgbmFtZTogJ2NoYXQnLCB2YWx1ZTogZmFsc2UsIGRlZGljYXRlZDogZmFsc2UgfSxcbiAgXSk7XG4gIHlvdUFyZUNvSG9zdCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICB5b3VBcmVIb3N0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGNvbmZpcm1lZFRvUmVjb3JkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIG1lZXRpbmdEaXNwbGF5VHlwZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignbWVkaWEnKTtcbiAgbWVldGluZ1ZpZGVvT3B0aW1pemVkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGV2ZW50VHlwZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8RXZlbnRUeXBlPignY2hhdCcpO1xuICBwYXJ0aWNpcGFudHMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFBhcnRpY2lwYW50W10+KFtdKTtcbiAgZmlsdGVyZWRQYXJ0aWNpcGFudHMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFBhcnRpY2lwYW50W10+KFtdKTtcbiAgcGFydGljaXBhbnRzQ291bnRlciA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgcGFydGljaXBhbnRzRmlsdGVyID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcblxuICBjb25zdW1lX3NvY2tldHMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PENvbnN1bWVTb2NrZXRbXT4oW10pO1xuICBydHBDYXBhYmlsaXRpZXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFJ0cENhcGFiaWxpdGllcyB8IG51bGw+KG51bGwpO1xuICByb29tUmVjdklQcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nW10+KFtdKTtcbiAgbWVldGluZ1Jvb21QYXJhbXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE1lZXRpbmdSb29tUGFyYW1zIHwgbnVsbD4obnVsbCk7XG4gIGl0ZW1QYWdlTGltaXQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oNCk7XG4gIGF1ZGlvT25seVJvb20gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgYWRkRm9yQmFzaWMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgc2NyZWVuUGFnZUxpbWl0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDQpO1xuICBzaGFyZVNjcmVlblN0YXJ0ZWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgc2hhcmVkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHRhcmdldE9yaWVudGF0aW9uID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCdsYW5kc2NhcGUnKTtcbiAgdGFyZ2V0UmVzb2x1dGlvbiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignc2QnKTtcbiAgdGFyZ2V0UmVzb2x1dGlvbkhvc3QgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJ3NkJyk7XG4gIHZpZENvbnMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFZpZENvbnM+KHsgd2lkdGg6IDY0MCwgaGVpZ2h0OiAzNjAgfSk7XG4gIGZyYW1lUmF0ZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigxMCk7XG4gIGhQYXJhbXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEhQYXJhbXNUeXBlPih7fSBhcyBIUGFyYW1zVHlwZSk7XG4gIHZQYXJhbXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFZQYXJhbXNUeXBlPih7fSBhcyBWUGFyYW1zVHlwZSk7XG4gIHNjcmVlblBhcmFtcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8U2NyZWVuUGFyYW1zVHlwZT4oe30gYXMgU2NyZWVuUGFyYW1zVHlwZSk7XG4gIGFQYXJhbXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEFQYXJhbXNUeXBlPih7fSBhcyBBUGFyYW1zVHlwZSk7XG5cbiAgcmVjb3JkaW5nQXVkaW9QYXVzZXNMaW1pdCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgcmVjb3JkaW5nQXVkaW9QYXVzZXNDb3VudCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgcmVjb3JkaW5nQXVkaW9TdXBwb3J0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHJlY29yZGluZ0F1ZGlvUGVvcGxlTGltaXQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG4gIHJlY29yZGluZ0F1ZGlvUGFydGljaXBhbnRzVGltZUxpbWl0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICByZWNvcmRpbmdWaWRlb1BhdXNlc0NvdW50ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICByZWNvcmRpbmdWaWRlb1BhdXNlc0xpbWl0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICByZWNvcmRpbmdWaWRlb1N1cHBvcnQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgcmVjb3JkaW5nVmlkZW9QZW9wbGVMaW1pdCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgcmVjb3JkaW5nVmlkZW9QYXJ0aWNpcGFudHNUaW1lTGltaXQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG4gIHJlY29yZGluZ0FsbFBhcnRpY2lwYW50c1N1cHBvcnQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgcmVjb3JkaW5nVmlkZW9QYXJ0aWNpcGFudHNTdXBwb3J0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHJlY29yZGluZ0FsbFBhcnRpY2lwYW50c0Z1bGxSb29tU3VwcG9ydCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICByZWNvcmRpbmdWaWRlb1BhcnRpY2lwYW50c0Z1bGxSb29tU3VwcG9ydCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICByZWNvcmRpbmdQcmVmZXJyZWRPcmllbnRhdGlvbiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignbGFuZHNjYXBlJyk7XG4gIHJlY29yZGluZ1N1cHBvcnRGb3JPdGhlck9yaWVudGF0aW9uID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHJlY29yZGluZ011bHRpRm9ybWF0c1N1cHBvcnQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcblxuICB1c2VyUmVjb3JkaW5nUGFyYW1zID0gbmV3IEJlaGF2aW9yU3ViamVjdDxVc2VyUmVjb3JkaW5nUGFyYW1zPih7XG4gICAgbWFpblNwZWNzOiB7XG4gICAgICBtZWRpYU9wdGlvbnM6ICd2aWRlbycsIC8vICdhdWRpbycsICd2aWRlbydcbiAgICAgIGF1ZGlvT3B0aW9uczogJ2FsbCcsIC8vICdhbGwnLCAnb25TY3JlZW4nLCAnaG9zdCdcbiAgICAgIHZpZGVvT3B0aW9uczogJ2FsbCcsIC8vICdhbGwnLCAnbWFpblNjcmVlbidcbiAgICAgIHZpZGVvVHlwZTogJ2Z1bGxEaXNwbGF5JywgLy8gJ2FsbCcsICdiZXN0RGlzcGxheScsICdmdWxsRGlzcGxheSdcbiAgICAgIHZpZGVvT3B0aW1pemVkOiBmYWxzZSwgLy8gdHJ1ZSwgZmFsc2VcbiAgICAgIHJlY29yZGluZ0Rpc3BsYXlUeXBlOiAnbWVkaWEnLCAvLyAnbWVkaWEnLCAndmlkZW8nLCAnYWxsJ1xuICAgICAgYWRkSExTOiBmYWxzZSwgLy8gdHJ1ZSwgZmFsc2VcbiAgICB9LFxuICAgIGRpc3BTcGVjczoge1xuICAgICAgbmFtZVRhZ3M6IHRydWUsIC8vIHRydWUsIGZhbHNlXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjMDAwMDAwJywgLy8gJyMwMDAwMDAnLCAnI2ZmZmZmZidcbiAgICAgIG5hbWVUYWdzQ29sb3I6ICcjZmZmZmZmJywgLy8gJyMwMDAwMDAnLCAnI2ZmZmZmZidcbiAgICAgIG9yaWVudGF0aW9uVmlkZW86ICdwb3J0cmFpdCcsIC8vICdsYW5kc2NhcGUnLCAncG9ydHJhaXQnLCAnYWxsJ1xuICAgIH0sXG4gIH0pO1xuXG4gIGNhblJlY29yZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBzdGFydFJlcG9ydCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBlbmRSZXBvcnQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgcmVjb3JkVGltZXJJbnRlcnZhbCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Tm9kZUpTLlRpbWVvdXQgfCBudWxsPihudWxsKTtcbiAgcmVjb3JkU3RhcnRUaW1lID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICByZWNvcmRFbGFwc2VkVGltZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgaXNUaW1lclJ1bm5pbmcgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgY2FuUGF1c2VSZXN1bWUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgcmVjb3JkQ2hhbmdlU2Vjb25kcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigxNTAwMCk7XG4gIHBhdXNlTGltaXQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG4gIHBhdXNlUmVjb3JkQ291bnQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG4gIGNhbkxhdW5jaFJlY29yZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4odHJ1ZSk7XG4gIHN0b3BMYXVuY2hSZWNvcmQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcblxuICBwYXJ0aWNpcGFudHNBbGwgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFBhcnRpY2lwYW50W10+KFtdKTtcblxuICBmaXJzdEFsbCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICB1cGRhdGVNYWluV2luZG93ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGZpcnN0X3JvdW5kID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGxhbmRTY2FwZWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgbG9ja19zY3JlZW4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgc2NyZWVuSWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICBhbGxWaWRlb1N0cmVhbXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PChQYXJ0aWNpcGFudCB8IFN0cmVhbSlbXT4oW10pO1xuICBuZXdMaW1pdGVkU3RyZWFtcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8KFBhcnRpY2lwYW50IHwgU3RyZWFtKVtdPihbXSk7XG4gIG5ld0xpbWl0ZWRTdHJlYW1zSURzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmdbXT4oW10pO1xuICBhY3RpdmVTb3VuZHMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZ1tdPihbXSk7XG4gIHNjcmVlblNoYXJlSURTdHJlYW0gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICBzY3JlZW5TaGFyZU5hbWVTdHJlYW0gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICBhZG1pbklEU3RyZWFtID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcbiAgYWRtaW5OYW1lU3RyZWFtID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcbiAgeW91WW91U3RyZWFtID0gbmV3IEJlaGF2aW9yU3ViamVjdDwoUGFydGljaXBhbnQgfCBTdHJlYW0pW10+KFtdKTtcbiAgeW91WW91U3RyZWFtSURzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmdbXT4oW10pO1xuICBsb2NhbFN0cmVhbSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8TWVkaWFTdHJlYW0gfCBudWxsPihudWxsKTtcbiAgcmVjb3JkU3RhcnRlZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICByZWNvcmRSZXN1bWVkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHJlY29yZFBhdXNlZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICByZWNvcmRTdG9wcGVkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGFkbWluUmVzdHJpY3RTZXR0aW5nID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHZpZGVvUmVxdWVzdFN0YXRlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmcgfCBudWxsPihudWxsKTtcbiAgdmlkZW9SZXF1ZXN0VGltZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgdmlkZW9BY3Rpb24gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgbG9jYWxTdHJlYW1WaWRlbyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8TWVkaWFTdHJlYW0gfCBudWxsPihudWxsKTtcbiAgdXNlckRlZmF1bHRWaWRlb0lucHV0RGV2aWNlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcbiAgY3VycmVudEZhY2luZ01vZGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJ3VzZXInKTtcbiAgcHJldkZhY2luZ01vZGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJ3VzZXInKTtcbiAgZGVmVmlkZW9JRCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gIGFsbG93ZWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgZGlzcEFjdGl2ZU5hbWVzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmdbXT4oW10pO1xuICBwX2Rpc3BBY3RpdmVOYW1lcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nW10+KFtdKTtcbiAgYWN0aXZlTmFtZXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZ1tdPihbXSk7XG4gIHByZXZBY3RpdmVOYW1lcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nW10+KFtdKTtcbiAgcF9hY3RpdmVOYW1lcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nW10+KFtdKTtcbiAgbWVtYmVyc1JlY2VpdmVkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGRlZmVyU2NyZWVuUmVjZWl2ZWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgaG9zdEZpcnN0U3dpdGNoID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIG1pY0FjdGlvbiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBzY3JlZW5BY3Rpb24gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgY2hhdEFjdGlvbiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBhdWRpb1JlcXVlc3RTdGF0ZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG4gIHNjcmVlblJlcXVlc3RTdGF0ZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG4gIGNoYXRSZXF1ZXN0U3RhdGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZyB8IG51bGw+KG51bGwpO1xuICBhdWRpb1JlcXVlc3RUaW1lID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICBzY3JlZW5SZXF1ZXN0VGltZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgY2hhdFJlcXVlc3RUaW1lID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICB1cGRhdGVSZXF1ZXN0SW50ZXJ2YWxTZWNvbmRzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDI0MCk7XG4gIG9sZFNvdW5kSWRzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmdbXT4oW10pO1xuICBob3N0TGFiZWwgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJ0hvc3QnKTtcbiAgbWFpblNjcmVlbkZpbGxlZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBsb2NhbFN0cmVhbVNjcmVlbiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8TWVkaWFTdHJlYW0gfCBudWxsPihudWxsKTtcbiAgc2NyZWVuQWxyZWFkeU9uID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGNoYXRBbHJlYWR5T24gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgcmVkaXJlY3RVUkwgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICBvbGRBbGxTdHJlYW1zID0gbmV3IEJlaGF2aW9yU3ViamVjdDwoUGFydGljaXBhbnQgfCBTdHJlYW0pW10+KFtdKTtcbiAgYWRtaW5WaWRJRCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gIHN0cmVhbU5hbWVzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxTdHJlYW1bXT4oW10pO1xuICBub25fYWxWaWRlb1N0cmVhbXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFBhcnRpY2lwYW50W10+KFtdKTtcbiAgc29ydEF1ZGlvTG91ZG5lc3MgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgYXVkaW9EZWNpYmVscyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8QXVkaW9EZWNpYmVsc1tdPihbXSk7XG4gIG1peGVkX2FsVmlkZW9TdHJlYW1zID0gbmV3IEJlaGF2aW9yU3ViamVjdDwoUGFydGljaXBhbnQgfCBTdHJlYW0pW10+KFtdKTtcbiAgbm9uX2FsVmlkZW9TdHJlYW1zX211dGVkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxQYXJ0aWNpcGFudFtdPihbXSk7XG4gIHBhZ2luYXRlZFN0cmVhbXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PChQYXJ0aWNpcGFudCB8IFN0cmVhbSlbXVtdPihbXSk7XG4gIGxvY2FsU3RyZWFtQXVkaW8gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE1lZGlhU3RyZWFtIHwgbnVsbD4obnVsbCk7XG4gIGRlZkF1ZGlvSUQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICB1c2VyRGVmYXVsdEF1ZGlvSW5wdXREZXZpY2UgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICB1c2VyRGVmYXVsdEF1ZGlvT3V0cHV0RGV2aWNlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcbiAgcHJldkF1ZGlvSW5wdXREZXZpY2UgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICBwcmV2VmlkZW9JbnB1dERldmljZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gIGF1ZGlvUGF1c2VkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIG1haW5TY3JlZW5QZXJzb24gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICBhZG1pbk9uTWFpblNjcmVlbiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBzY3JlZW5TdGF0ZXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFNjcmVlblN0YXRlW10+KFtcbiAgICB7XG4gICAgICBtYWluU2NyZWVuUGVyc29uOiAnJyxcbiAgICAgIG1haW5TY3JlZW5Qcm9kdWNlcklkOiAnJyxcbiAgICAgIG1haW5TY3JlZW5GaWxsZWQ6IGZhbHNlLFxuICAgICAgYWRtaW5Pbk1haW5TY3JlZW46IGZhbHNlLFxuICAgIH0sXG4gIF0pO1xuICBwcmV2U2NyZWVuU3RhdGVzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxTY3JlZW5TdGF0ZVtdPihbXG4gICAge1xuICAgICAgbWFpblNjcmVlblBlcnNvbjogJycsXG4gICAgICBtYWluU2NyZWVuUHJvZHVjZXJJZDogJycsXG4gICAgICBtYWluU2NyZWVuRmlsbGVkOiBmYWxzZSxcbiAgICAgIGFkbWluT25NYWluU2NyZWVuOiBmYWxzZSxcbiAgICB9LFxuICBdKTtcbiAgdXBkYXRlRGF0ZVN0YXRlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXIgfCBudWxsPihudWxsKTtcbiAgbGFzdFVwZGF0ZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyIHwgbnVsbD4obnVsbCk7XG4gIG5Gb3JSZWFkanVzdFJlY29yZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgZml4ZWRQYWdlTGltaXQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oNCk7XG4gIHJlbW92ZUFsdEdyaWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgbkZvclJlYWRqdXN0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICByZW9yZGVySW50ZXJ2YWwgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMzAwMDApO1xuICBmYXN0UmVvcmRlckludGVydmFsID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDEwMDAwKTtcbiAgbGFzdFJlb3JkZXJUaW1lID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICBhdWRTdHJlYW1OYW1lcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8U3RyZWFtW10+KFtdKTtcbiAgY3VycmVudFVzZXJQYWdlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICBtYWluSGVpZ2h0V2lkdGggPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG4gIHByZXZNYWluSGVpZ2h0V2lkdGggPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4odGhpcy5tYWluSGVpZ2h0V2lkdGgudmFsdWUpO1xuICBwcmV2RG9QYWdpbmF0ZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBkb1BhZ2luYXRlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHNoYXJlRW5kZWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgbFN0cmVhbXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PChQYXJ0aWNpcGFudCB8IFN0cmVhbSlbXT4oW10pO1xuICBjaGF0UmVmU3RyZWFtcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8KFBhcnRpY2lwYW50IHwgU3RyZWFtKVtdPihbXSk7XG4gIGNvbnRyb2xIZWlnaHQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oXG4gICAgdGhpcy5ldmVudFR5cGUudmFsdWUgPT09ICd3ZWJpbmFyJyB8fCB0aGlzLmV2ZW50VHlwZS52YWx1ZSA9PT0gJ2NvbmZlcmVuY2UnID8gMCA6IDAuMDYsXG4gICk7XG4gIGlzV2lkZVNjcmVlbiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBpc01lZGl1bVNjcmVlbiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBpc1NtYWxsU2NyZWVuID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGFkZEdyaWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgYWRkQWx0R3JpZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBncmlkUm93cyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgZ3JpZENvbHMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG4gIGFsdEdyaWRSb3dzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICBhbHRHcmlkQ29scyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgbnVtYmVyUGFnZXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG4gIGN1cnJlbnRTdHJlYW1zID0gbmV3IEJlaGF2aW9yU3ViamVjdDwoUGFydGljaXBhbnQgfCBTdHJlYW0pW10+KFtdKTtcbiAgc2hvd01pbmlWaWV3ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIG5TdHJlYW0gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE1lZGlhU3RyZWFtIHwgbnVsbD4obnVsbCk7XG4gIGRlZmVyX3JlY2VpdmUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgYWxsQXVkaW9TdHJlYW1zID0gbmV3IEJlaGF2aW9yU3ViamVjdDwoUGFydGljaXBhbnQgfCBTdHJlYW0pW10+KFtdKTtcbiAgcmVtb3RlU2NyZWVuU3RyZWFtID0gbmV3IEJlaGF2aW9yU3ViamVjdDxTdHJlYW1bXT4oW10pO1xuICBzY3JlZW5Qcm9kdWNlciA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UHJvZHVjZXIgfCBudWxsPihudWxsKTtcbiAgZ290QWxsVmlkcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBwYWdpbmF0aW9uSGVpZ2h0V2lkdGggPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oNDApO1xuICBwYWdpbmF0aW9uRGlyZWN0aW9uID0gbmV3IEJlaGF2aW9yU3ViamVjdDwnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnPignaG9yaXpvbnRhbCcpO1xuICBncmlkU2l6ZXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEdyaWRTaXplcz4oe1xuICAgIGdyaWRXaWR0aDogMCxcbiAgICBncmlkSGVpZ2h0OiAwLFxuICAgIGFsdEdyaWRXaWR0aDogMCxcbiAgICBhbHRHcmlkSGVpZ2h0OiAwLFxuICB9KTtcbiAgc2NyZWVuRm9yY2VGdWxsRGlzcGxheSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBtYWluR3JpZFN0cmVhbSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Q3VzdG9tTWVkaWFDb21wb25lbnRbXT4oW10pO1xuICBvdGhlckdyaWRTdHJlYW1zID0gbmV3IEJlaGF2aW9yU3ViamVjdDxDdXN0b21NZWRpYUNvbXBvbmVudFtdW10+KFtdKTtcbiAgYXVkaW9Pbmx5U3RyZWFtcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Q3VzdG9tTWVkaWFDb21wb25lbnRbXT4oW10pO1xuICB2aWRlb0lucHV0cyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8TWVkaWFEZXZpY2VJbmZvW10+KFtdKTtcbiAgYXVkaW9JbnB1dHMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE1lZGlhRGV2aWNlSW5mb1tdPihbXSk7XG4gIG1lZXRpbmdQcm9ncmVzc1RpbWUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJzAwOjAwOjAwJyk7XG4gIG1lZXRpbmdFbGFwc2VkVGltZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgcmVmX3BhcnRpY2lwYW50cyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UGFydGljaXBhbnRbXT4oW10pO1xuXG4gIHVwZGF0ZVZhbGlkYXRlZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMudmFsaWRhdGVkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVNvY2tldCA9ICh2YWx1ZTogU29ja2V0KSA9PiB7XG4gICAgdGhpcy5zb2NrZXQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlRGV2aWNlID0gKHZhbHVlOiBEZXZpY2UgfCBudWxsKSA9PiB7XG4gICAgdGhpcy5kZXZpY2UubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUm9vbURhdGEgPSAodmFsdWU6IFJlc3BvbnNlSm9pblJvb20gfCBudWxsKSA9PiB7XG4gICAgdGhpcy5yb29tRGF0YS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBcGlLZXkgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMuYXBpS2V5Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUFwaVVzZXJOYW1lID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLmFwaVVzZXJOYW1lLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUFwaVRva2VuID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLmFwaVRva2VuLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUxpbmsgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMubGluay5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSb29tTmFtZSA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5yb29tTmFtZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVNZW1iZXIgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMubWVtYmVyLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUFkbWluUGFzc2NvZGUgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMuYWRtaW5QYXNzY29kZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVJc2xldmVsID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLmlzbGV2ZWwubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQ29Ib3N0ID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLmNvSG9zdC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVDb0hvc3RSZXNwb25zaWJpbGl0eSA9ICh2YWx1ZTogQ29Ib3N0UmVzcG9uc2liaWxpdHlbXSkgPT4ge1xuICAgIHRoaXMuY29Ib3N0UmVzcG9uc2liaWxpdHkubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlWW91QXJlQ29Ib3N0ID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy55b3VBcmVDb0hvc3QubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlWW91QXJlSG9zdCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMueW91QXJlSG9zdC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVDb25maXJtZWRUb1JlY29yZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuY29uZmlybWVkVG9SZWNvcmQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTWVldGluZ0Rpc3BsYXlUeXBlID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLm1lZXRpbmdEaXNwbGF5VHlwZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVNZWV0aW5nVmlkZW9PcHRpbWl6ZWQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLm1lZXRpbmdWaWRlb09wdGltaXplZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVFdmVudFR5cGUgPSAodmFsdWU6IEV2ZW50VHlwZSkgPT4ge1xuICAgIHRoaXMuZXZlbnRUeXBlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVBhcnRpY2lwYW50cyA9ICh2YWx1ZTogUGFydGljaXBhbnRbXSkgPT4ge1xuICAgIHRoaXMucGFydGljaXBhbnRzLm5leHQodmFsdWUpO1xuICAgIHRoaXMucGFydGljaXBhbnRzQ291bnRlci5uZXh0KHZhbHVlLmxlbmd0aCk7XG4gICAgdGhpcy5maWx0ZXJlZFBhcnRpY2lwYW50cy5uZXh0KHRoaXMucGFydGljaXBhbnRzLnZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVGaWx0ZXJlZFBhcnRpY2lwYW50cyA9ICh2YWx1ZTogUGFydGljaXBhbnRbXSkgPT4ge1xuICAgIHRoaXMuZmlsdGVyZWRQYXJ0aWNpcGFudHMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUGFydGljaXBhbnRzQ291bnRlciA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5wYXJ0aWNpcGFudHNDb3VudGVyLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVBhcnRpY2lwYW50c0ZpbHRlciA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5wYXJ0aWNpcGFudHNGaWx0ZXIubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQ29uc3VtZV9zb2NrZXRzID0gKHZhbHVlOiBDb25zdW1lU29ja2V0W10pID0+IHtcbiAgICB0aGlzLmNvbnN1bWVfc29ja2V0cy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSdHBDYXBhYmlsaXRpZXMgPSAodmFsdWU6IFJ0cENhcGFiaWxpdGllcyB8IG51bGwpID0+IHtcbiAgICB0aGlzLnJ0cENhcGFiaWxpdGllcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSb29tUmVjdklQcyA9ICh2YWx1ZTogc3RyaW5nW10pID0+IHtcbiAgICB0aGlzLnJvb21SZWN2SVBzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZU1lZXRpbmdSb29tUGFyYW1zID0gKHZhbHVlOiBNZWV0aW5nUm9vbVBhcmFtcyB8IG51bGwpID0+IHtcbiAgICB0aGlzLm1lZXRpbmdSb29tUGFyYW1zLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUl0ZW1QYWdlTGltaXQgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMuaXRlbVBhZ2VMaW1pdC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBdWRpb09ubHlSb29tID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5hdWRpb09ubHlSb29tLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUFkZEZvckJhc2ljID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5hZGRGb3JCYXNpYy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVTY3JlZW5QYWdlTGltaXQgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMuc2NyZWVuUGFnZUxpbWl0Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVNoYXJlU2NyZWVuU3RhcnRlZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuc2hhcmVTY3JlZW5TdGFydGVkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVNoYXJlZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuc2hhcmVkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVRhcmdldE9yaWVudGF0aW9uID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLnRhcmdldE9yaWVudGF0aW9uLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVRhcmdldFJlc29sdXRpb24gPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMudGFyZ2V0UmVzb2x1dGlvbi5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVUYXJnZXRSZXNvbHV0aW9uSG9zdCA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy50YXJnZXRSZXNvbHV0aW9uSG9zdC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVWaWRDb25zID0gKHZhbHVlOiBWaWRDb25zKSA9PiB7XG4gICAgdGhpcy52aWRDb25zLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUZyYW1lUmF0ZSA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5mcmFtZVJhdGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlSFBhcmFtcyA9ICh2YWx1ZTogSFBhcmFtc1R5cGUpID0+IHtcbiAgICB0aGlzLmhQYXJhbXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlVlBhcmFtcyA9ICh2YWx1ZTogVlBhcmFtc1R5cGUpID0+IHtcbiAgICB0aGlzLnZQYXJhbXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlU2NyZWVuUGFyYW1zID0gKHZhbHVlOiBTY3JlZW5QYXJhbXNUeXBlKSA9PiB7XG4gICAgdGhpcy5zY3JlZW5QYXJhbXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQVBhcmFtcyA9ICh2YWx1ZTogQVBhcmFtc1R5cGUpID0+IHtcbiAgICB0aGlzLmFQYXJhbXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nQXVkaW9QYXVzZXNMaW1pdCA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdBdWRpb1BhdXNlc0xpbWl0Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ0F1ZGlvUGF1c2VzQ291bnQgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMucmVjb3JkaW5nQXVkaW9QYXVzZXNDb3VudC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRpbmdBdWRpb1N1cHBvcnQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ0F1ZGlvU3VwcG9ydC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRpbmdBdWRpb1Blb3BsZUxpbWl0ID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ0F1ZGlvUGVvcGxlTGltaXQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nQXVkaW9QYXJ0aWNpcGFudHNUaW1lTGltaXQgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMucmVjb3JkaW5nQXVkaW9QYXJ0aWNpcGFudHNUaW1lTGltaXQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nVmlkZW9QYXVzZXNDb3VudCA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdWaWRlb1BhdXNlc0NvdW50Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ1ZpZGVvUGF1c2VzTGltaXQgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMucmVjb3JkaW5nVmlkZW9QYXVzZXNMaW1pdC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRpbmdWaWRlb1N1cHBvcnQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ1ZpZGVvU3VwcG9ydC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRpbmdWaWRlb1Blb3BsZUxpbWl0ID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ1ZpZGVvUGVvcGxlTGltaXQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nVmlkZW9QYXJ0aWNpcGFudHNUaW1lTGltaXQgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMucmVjb3JkaW5nVmlkZW9QYXJ0aWNpcGFudHNUaW1lTGltaXQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nQWxsUGFydGljaXBhbnRzU3VwcG9ydCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMucmVjb3JkaW5nQWxsUGFydGljaXBhbnRzU3VwcG9ydC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRpbmdWaWRlb1BhcnRpY2lwYW50c1N1cHBvcnQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ1ZpZGVvUGFydGljaXBhbnRzU3VwcG9ydC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRpbmdBbGxQYXJ0aWNpcGFudHNGdWxsUm9vbVN1cHBvcnQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ0FsbFBhcnRpY2lwYW50c0Z1bGxSb29tU3VwcG9ydC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRpbmdWaWRlb1BhcnRpY2lwYW50c0Z1bGxSb29tU3VwcG9ydCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMucmVjb3JkaW5nVmlkZW9QYXJ0aWNpcGFudHNGdWxsUm9vbVN1cHBvcnQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nUHJlZmVycmVkT3JpZW50YXRpb24gPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMucmVjb3JkaW5nUHJlZmVycmVkT3JpZW50YXRpb24ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nU3VwcG9ydEZvck90aGVyT3JpZW50YXRpb24gPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ1N1cHBvcnRGb3JPdGhlck9yaWVudGF0aW9uLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ011bHRpRm9ybWF0c1N1cHBvcnQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ011bHRpRm9ybWF0c1N1cHBvcnQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlVXNlclJlY29yZGluZ1BhcmFtcyA9ICh2YWx1ZTogVXNlclJlY29yZGluZ1BhcmFtcykgPT4ge1xuICAgIHRoaXMudXNlclJlY29yZGluZ1BhcmFtcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVDYW5SZWNvcmQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmNhblJlY29yZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVTdGFydFJlcG9ydCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuc3RhcnRSZXBvcnQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlRW5kUmVwb3J0ID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5lbmRSZXBvcnQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkVGltZXJJbnRlcnZhbCA9ICh2YWx1ZTogTm9kZUpTLlRpbWVvdXQgfCBudWxsKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRUaW1lckludGVydmFsLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZFN0YXJ0VGltZSA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRTdGFydFRpbWUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkRWxhcHNlZFRpbWUgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMucmVjb3JkRWxhcHNlZFRpbWUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlSXNUaW1lclJ1bm5pbmcgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmlzVGltZXJSdW5uaW5nLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUNhblBhdXNlUmVzdW1lID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5jYW5QYXVzZVJlc3VtZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRDaGFuZ2VTZWNvbmRzID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLnJlY29yZENoYW5nZVNlY29uZHMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUGF1c2VMaW1pdCA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5wYXVzZUxpbWl0Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVBhdXNlUmVjb3JkQ291bnQgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMucGF1c2VSZWNvcmRDb3VudC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVDYW5MYXVuY2hSZWNvcmQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmNhbkxhdW5jaFJlY29yZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVTdG9wTGF1bmNoUmVjb3JkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5zdG9wTGF1bmNoUmVjb3JkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVBhcnRpY2lwYW50c0FsbCA9ICh2YWx1ZTogUGFydGljaXBhbnRbXSkgPT4ge1xuICAgIHRoaXMucGFydGljaXBhbnRzQWxsLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUZpcnN0QWxsID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5maXJzdEFsbC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVVcGRhdGVNYWluV2luZG93ID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy51cGRhdGVNYWluV2luZG93Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUZpcnN0X3JvdW5kID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5maXJzdF9yb3VuZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVMYW5kU2NhcGVkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5sYW5kU2NhcGVkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUxvY2tfc2NyZWVuID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5sb2NrX3NjcmVlbi5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVTY3JlZW5JZCA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5zY3JlZW5JZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBbGxWaWRlb1N0cmVhbXMgPSAodmFsdWU6IChQYXJ0aWNpcGFudCB8IFN0cmVhbSlbXSkgPT4ge1xuICAgIHRoaXMuYWxsVmlkZW9TdHJlYW1zLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZU5ld0xpbWl0ZWRTdHJlYW1zID0gKHZhbHVlOiAoUGFydGljaXBhbnQgfCBTdHJlYW0pW10pID0+IHtcbiAgICB0aGlzLm5ld0xpbWl0ZWRTdHJlYW1zLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZU5ld0xpbWl0ZWRTdHJlYW1zSURzID0gKHZhbHVlOiBzdHJpbmdbXSkgPT4ge1xuICAgIHRoaXMubmV3TGltaXRlZFN0cmVhbXNJRHMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQWN0aXZlU291bmRzID0gKHZhbHVlOiBzdHJpbmdbXSkgPT4ge1xuICAgIHRoaXMuYWN0aXZlU291bmRzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVNjcmVlblNoYXJlSURTdHJlYW0gPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMuc2NyZWVuU2hhcmVJRFN0cmVhbS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVTY3JlZW5TaGFyZU5hbWVTdHJlYW0gPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMuc2NyZWVuU2hhcmVOYW1lU3RyZWFtLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUFkbWluSURTdHJlYW0gPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMuYWRtaW5JRFN0cmVhbS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBZG1pbk5hbWVTdHJlYW0gPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMuYWRtaW5OYW1lU3RyZWFtLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVlvdVlvdVN0cmVhbSA9ICh2YWx1ZTogKFBhcnRpY2lwYW50IHwgU3RyZWFtKVtdKSA9PiB7XG4gICAgdGhpcy55b3VZb3VTdHJlYW0ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlWW91WW91U3RyZWFtSURzID0gKHZhbHVlOiBzdHJpbmdbXSkgPT4ge1xuICAgIHRoaXMueW91WW91U3RyZWFtSURzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUxvY2FsU3RyZWFtID0gKHZhbHVlOiBNZWRpYVN0cmVhbSB8IG51bGwpID0+IHtcbiAgICB0aGlzLmxvY2FsU3RyZWFtLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZFN0YXJ0ZWQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnJlY29yZFN0YXJ0ZWQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkUmVzdW1lZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMucmVjb3JkUmVzdW1lZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRQYXVzZWQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnJlY29yZFBhdXNlZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRTdG9wcGVkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRTdG9wcGVkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUFkbWluUmVzdHJpY3RTZXR0aW5nID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5hZG1pblJlc3RyaWN0U2V0dGluZy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVWaWRlb1JlcXVlc3RTdGF0ZSA9ICh2YWx1ZTogc3RyaW5nIHwgbnVsbCkgPT4ge1xuICAgIHRoaXMudmlkZW9SZXF1ZXN0U3RhdGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlVmlkZW9SZXF1ZXN0VGltZSA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy52aWRlb1JlcXVlc3RUaW1lLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVZpZGVvQWN0aW9uID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy52aWRlb0FjdGlvbi5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVMb2NhbFN0cmVhbVZpZGVvID0gKHZhbHVlOiBNZWRpYVN0cmVhbSB8IG51bGwpID0+IHtcbiAgICB0aGlzLmxvY2FsU3RyZWFtVmlkZW8ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlVXNlckRlZmF1bHRWaWRlb0lucHV0RGV2aWNlID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLnVzZXJEZWZhdWx0VmlkZW9JbnB1dERldmljZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVDdXJyZW50RmFjaW5nTW9kZSA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5jdXJyZW50RmFjaW5nTW9kZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVQcmV2RmFjaW5nTW9kZSA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5wcmV2RmFjaW5nTW9kZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVEZWZWaWRlb0lEID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLmRlZlZpZGVvSUQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQWxsb3dlZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuYWxsb3dlZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVEaXNwQWN0aXZlTmFtZXMgPSAodmFsdWU6IHN0cmluZ1tdKSA9PiB7XG4gICAgdGhpcy5kaXNwQWN0aXZlTmFtZXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUF9kaXNwQWN0aXZlTmFtZXMgPSAodmFsdWU6IHN0cmluZ1tdKSA9PiB7XG4gICAgdGhpcy5wX2Rpc3BBY3RpdmVOYW1lcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBY3RpdmVOYW1lcyA9ICh2YWx1ZTogc3RyaW5nW10pID0+IHtcbiAgICB0aGlzLmFjdGl2ZU5hbWVzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVByZXZBY3RpdmVOYW1lcyA9ICh2YWx1ZTogc3RyaW5nW10pID0+IHtcbiAgICB0aGlzLnByZXZBY3RpdmVOYW1lcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVQX2FjdGl2ZU5hbWVzID0gKHZhbHVlOiBzdHJpbmdbXSkgPT4ge1xuICAgIHRoaXMucF9hY3RpdmVOYW1lcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVNZW1iZXJzUmVjZWl2ZWQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLm1lbWJlcnNSZWNlaXZlZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVEZWZlclNjcmVlblJlY2VpdmVkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5kZWZlclNjcmVlblJlY2VpdmVkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUhvc3RGaXJzdFN3aXRjaCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuaG9zdEZpcnN0U3dpdGNoLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZU1pY0FjdGlvbiA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMubWljQWN0aW9uLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVNjcmVlbkFjdGlvbiA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuc2NyZWVuQWN0aW9uLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUNoYXRBY3Rpb24gPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmNoYXRBY3Rpb24ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQXVkaW9SZXF1ZXN0U3RhdGUgPSAodmFsdWU6IHN0cmluZyB8IG51bGwpID0+IHtcbiAgICB0aGlzLmF1ZGlvUmVxdWVzdFN0YXRlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVNjcmVlblJlcXVlc3RTdGF0ZSA9ICh2YWx1ZTogc3RyaW5nIHwgbnVsbCkgPT4ge1xuICAgIHRoaXMuc2NyZWVuUmVxdWVzdFN0YXRlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUNoYXRSZXF1ZXN0U3RhdGUgPSAodmFsdWU6IHN0cmluZyB8IG51bGwpID0+IHtcbiAgICB0aGlzLmNoYXRSZXF1ZXN0U3RhdGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQXVkaW9SZXF1ZXN0VGltZSA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5hdWRpb1JlcXVlc3RUaW1lLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVNjcmVlblJlcXVlc3RUaW1lID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLnNjcmVlblJlcXVlc3RUaW1lLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUNoYXRSZXF1ZXN0VGltZSA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5jaGF0UmVxdWVzdFRpbWUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlT2xkU291bmRJZHMgPSAodmFsdWU6IHN0cmluZ1tdKSA9PiB7XG4gICAgdGhpcy5vbGRTb3VuZElkcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVIb3N0TGFiZWwgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMuaG9zdExhYmVsLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZU1haW5TY3JlZW5GaWxsZWQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLm1haW5TY3JlZW5GaWxsZWQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTG9jYWxTdHJlYW1TY3JlZW4gPSAodmFsdWU6IE1lZGlhU3RyZWFtIHwgbnVsbCkgPT4ge1xuICAgIHRoaXMubG9jYWxTdHJlYW1TY3JlZW4ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlU2NyZWVuQWxyZWFkeU9uID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5zY3JlZW5BbHJlYWR5T24ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQ2hhdEFscmVhZHlPbiA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuY2hhdEFscmVhZHlPbi5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZWRpcmVjdFVSTCA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5yZWRpcmVjdFVSTC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVPbGRBbGxTdHJlYW1zID0gKHZhbHVlOiAoUGFydGljaXBhbnQgfCBTdHJlYW0pW10pID0+IHtcbiAgICB0aGlzLm9sZEFsbFN0cmVhbXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQWRtaW5WaWRJRCA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5hZG1pblZpZElELm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVN0cmVhbU5hbWVzID0gKHZhbHVlOiBTdHJlYW1bXSkgPT4ge1xuICAgIHRoaXMuc3RyZWFtTmFtZXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTm9uX2FsVmlkZW9TdHJlYW1zID0gKHZhbHVlOiBQYXJ0aWNpcGFudFtdKSA9PiB7XG4gICAgdGhpcy5ub25fYWxWaWRlb1N0cmVhbXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlU29ydEF1ZGlvTG91ZG5lc3MgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnNvcnRBdWRpb0xvdWRuZXNzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUF1ZGlvRGVjaWJlbHMgPSAodmFsdWU6IEF1ZGlvRGVjaWJlbHNbXSkgPT4ge1xuICAgIHRoaXMuYXVkaW9EZWNpYmVscy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVNaXhlZF9hbFZpZGVvU3RyZWFtcyA9ICh2YWx1ZTogKFBhcnRpY2lwYW50IHwgU3RyZWFtKVtdKSA9PiB7XG4gICAgdGhpcy5taXhlZF9hbFZpZGVvU3RyZWFtcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVOb25fYWxWaWRlb1N0cmVhbXNfbXV0ZWQgPSAodmFsdWU6IFBhcnRpY2lwYW50W10pID0+IHtcbiAgICB0aGlzLm5vbl9hbFZpZGVvU3RyZWFtc19tdXRlZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVQYWdpbmF0ZWRTdHJlYW1zID0gKHZhbHVlOiAoUGFydGljaXBhbnQgfCBTdHJlYW0pW11bXSkgPT4ge1xuICAgIHRoaXMucGFnaW5hdGVkU3RyZWFtcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVMb2NhbFN0cmVhbUF1ZGlvID0gKHZhbHVlOiBNZWRpYVN0cmVhbSB8IG51bGwpID0+IHtcbiAgICB0aGlzLmxvY2FsU3RyZWFtQXVkaW8ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlRGVmQXVkaW9JRCA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5kZWZBdWRpb0lELm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVVzZXJEZWZhdWx0QXVkaW9JbnB1dERldmljZSA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy51c2VyRGVmYXVsdEF1ZGlvSW5wdXREZXZpY2UubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlVXNlckRlZmF1bHRBdWRpb091dHB1dERldmljZSA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy51c2VyRGVmYXVsdEF1ZGlvT3V0cHV0RGV2aWNlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVByZXZBdWRpb0lucHV0RGV2aWNlID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLnByZXZBdWRpb0lucHV0RGV2aWNlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVByZXZWaWRlb0lucHV0RGV2aWNlID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLnByZXZWaWRlb0lucHV0RGV2aWNlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUF1ZGlvUGF1c2VkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5hdWRpb1BhdXNlZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVNYWluU2NyZWVuUGVyc29uID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLm1haW5TY3JlZW5QZXJzb24ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQWRtaW5Pbk1haW5TY3JlZW4gPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmFkbWluT25NYWluU2NyZWVuLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVNjcmVlblN0YXRlcyA9ICh2YWx1ZTogU2NyZWVuU3RhdGVbXSkgPT4ge1xuICAgIHRoaXMuc2NyZWVuU3RhdGVzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVByZXZTY3JlZW5TdGF0ZXMgPSAodmFsdWU6IFNjcmVlblN0YXRlW10pID0+IHtcbiAgICB0aGlzLnByZXZTY3JlZW5TdGF0ZXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlVXBkYXRlRGF0ZVN0YXRlID0gKHZhbHVlOiBudW1iZXIgfCBudWxsKSA9PiB7XG4gICAgdGhpcy51cGRhdGVEYXRlU3RhdGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTGFzdFVwZGF0ZSA9ICh2YWx1ZTogbnVtYmVyIHwgbnVsbCkgPT4ge1xuICAgIHRoaXMubGFzdFVwZGF0ZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVORm9yUmVhZGp1c3RSZWNvcmQgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMubkZvclJlYWRqdXN0UmVjb3JkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUZpeGVkUGFnZUxpbWl0ID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLmZpeGVkUGFnZUxpbWl0Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlbW92ZUFsdEdyaWQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnJlbW92ZUFsdEdyaWQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTkZvclJlYWRqdXN0ID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLm5Gb3JSZWFkanVzdC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVMYXN0UmVvcmRlclRpbWUgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMubGFzdFJlb3JkZXJUaW1lLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUF1ZFN0cmVhbU5hbWVzID0gKHZhbHVlOiBTdHJlYW1bXSkgPT4ge1xuICAgIHRoaXMuYXVkU3RyZWFtTmFtZXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQ3VycmVudFVzZXJQYWdlID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLmN1cnJlbnRVc2VyUGFnZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVNYWluSGVpZ2h0V2lkdGggPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMubWFpbkhlaWdodFdpZHRoLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVByZXZNYWluSGVpZ2h0V2lkdGggPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMucHJldk1haW5IZWlnaHRXaWR0aC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVQcmV2RG9QYWdpbmF0ZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMucHJldkRvUGFnaW5hdGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlRG9QYWdpbmF0ZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuZG9QYWdpbmF0ZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVTaGFyZUVuZGVkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5zaGFyZUVuZGVkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUxTdHJlYW1zID0gKHZhbHVlOiAoUGFydGljaXBhbnQgfCBTdHJlYW0pW10pID0+IHtcbiAgICB0aGlzLmxTdHJlYW1zLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUNoYXRSZWZTdHJlYW1zID0gKHZhbHVlOiAoUGFydGljaXBhbnQgfCBTdHJlYW0pW10pID0+IHtcbiAgICB0aGlzLmNoYXRSZWZTdHJlYW1zLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUNvbnRyb2xIZWlnaHQgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMuY29udHJvbEhlaWdodC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVJc1dpZGVTY3JlZW4gPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmlzV2lkZVNjcmVlbi5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVJc01lZGl1bVNjcmVlbiA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuaXNNZWRpdW1TY3JlZW4ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlSXNTbWFsbFNjcmVlbiA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuaXNTbWFsbFNjcmVlbi5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBZGRHcmlkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5hZGRHcmlkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUFkZEFsdEdyaWQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmFkZEFsdEdyaWQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlR3JpZFJvd3MgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMuZ3JpZFJvd3MubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlR3JpZENvbHMgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMuZ3JpZENvbHMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQWx0R3JpZFJvd3MgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMuYWx0R3JpZFJvd3MubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQWx0R3JpZENvbHMgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMuYWx0R3JpZENvbHMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTnVtYmVyUGFnZXMgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMubnVtYmVyUGFnZXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQ3VycmVudFN0cmVhbXMgPSAodmFsdWU6IChQYXJ0aWNpcGFudCB8IFN0cmVhbSlbXSkgPT4ge1xuICAgIHRoaXMuY3VycmVudFN0cmVhbXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlU2hvd01pbmlWaWV3ID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5zaG93TWluaVZpZXcubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTlN0cmVhbSA9ICh2YWx1ZTogTWVkaWFTdHJlYW0gfCBudWxsKSA9PiB7XG4gICAgdGhpcy5uU3RyZWFtLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZURlZmVyX3JlY2VpdmUgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmRlZmVyX3JlY2VpdmUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQWxsQXVkaW9TdHJlYW1zID0gKHZhbHVlOiAoUGFydGljaXBhbnQgfCBTdHJlYW0pW10pID0+IHtcbiAgICB0aGlzLmFsbEF1ZGlvU3RyZWFtcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZW1vdGVTY3JlZW5TdHJlYW0gPSAodmFsdWU6IFN0cmVhbVtdKSA9PiB7XG4gICAgdGhpcy5yZW1vdGVTY3JlZW5TdHJlYW0ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlU2NyZWVuUHJvZHVjZXIgPSAodmFsdWU6IFByb2R1Y2VyIHwgbnVsbCkgPT4ge1xuICAgIHRoaXMuc2NyZWVuUHJvZHVjZXIubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlR290QWxsVmlkcyA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuZ290QWxsVmlkcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVQYWdpbmF0aW9uSGVpZ2h0V2lkdGggPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMucGFnaW5hdGlvbkhlaWdodFdpZHRoLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVBhZ2luYXRpb25EaXJlY3Rpb24gPSAodmFsdWU6ICdob3Jpem9udGFsJyB8ICd2ZXJ0aWNhbCcpID0+IHtcbiAgICB0aGlzLnBhZ2luYXRpb25EaXJlY3Rpb24ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlR3JpZFNpemVzID0gKHZhbHVlOiBHcmlkU2l6ZXMpID0+IHtcbiAgICB0aGlzLmdyaWRTaXplcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVTY3JlZW5Gb3JjZUZ1bGxEaXNwbGF5ID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5zY3JlZW5Gb3JjZUZ1bGxEaXNwbGF5Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZU1haW5HcmlkU3RyZWFtID0gKHZhbHVlOiBDdXN0b21NZWRpYUNvbXBvbmVudFtdKSA9PiB7XG4gICAgdGhpcy5tYWluR3JpZFN0cmVhbS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVPdGhlckdyaWRTdHJlYW1zID0gKHZhbHVlOiBDdXN0b21NZWRpYUNvbXBvbmVudFtdW10pID0+IHtcbiAgICB0aGlzLm90aGVyR3JpZFN0cmVhbXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQXVkaW9Pbmx5U3RyZWFtcyA9ICh2YWx1ZTogQ3VzdG9tTWVkaWFDb21wb25lbnRbXSkgPT4ge1xuICAgIHRoaXMuYXVkaW9Pbmx5U3RyZWFtcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVWaWRlb0lucHV0cyA9ICh2YWx1ZTogTWVkaWFEZXZpY2VJbmZvW10pID0+IHtcbiAgICB0aGlzLnZpZGVvSW5wdXRzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUF1ZGlvSW5wdXRzID0gKHZhbHVlOiBNZWRpYURldmljZUluZm9bXSkgPT4ge1xuICAgIHRoaXMuYXVkaW9JbnB1dHMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTWVldGluZ1Byb2dyZXNzVGltZSA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5tZWV0aW5nUHJvZ3Jlc3NUaW1lLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZU1lZXRpbmdFbGFwc2VkVGltZSA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5tZWV0aW5nRWxhcHNlZFRpbWUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVmX3BhcnRpY2lwYW50cyA9ICh2YWx1ZTogUGFydGljaXBhbnRbXSkgPT4ge1xuICAgIHRoaXMucmVmX3BhcnRpY2lwYW50cy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICAvLyBNZXNzYWdlc1xuICBtZXNzYWdlcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8TWVzc2FnZVtdPihbXSk7XG4gIHN0YXJ0RGlyZWN0TWVzc2FnZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBkaXJlY3RNZXNzYWdlRGV0YWlscyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UGFydGljaXBhbnQgfCBudWxsPihudWxsKTtcbiAgc2hvd01lc3NhZ2VzQmFkZ2UgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcblxuICAvLyBFdmVudCBTZXR0aW5nc1xuICBhdWRpb1NldHRpbmcgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJ2FsbG93Jyk7XG4gIHZpZGVvU2V0dGluZyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignYWxsb3cnKTtcbiAgc2NyZWVuc2hhcmVTZXR0aW5nID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCdhbGxvdycpO1xuICBjaGF0U2V0dGluZyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignYWxsb3cnKTtcblxuICAvLyBEaXNwbGF5IFNldHRpbmdzXG4gIGRpc3BsYXlPcHRpb24gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJ21lZGlhJyk7XG4gIGF1dG9XYXZlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPih0cnVlKTtcbiAgZm9yY2VGdWxsRGlzcGxheSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4odHJ1ZSk7XG4gIHByZXZGb3JjZUZ1bGxEaXNwbGF5ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHByZXZNZWV0aW5nRGlzcGxheVR5cGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJ3ZpZGVvJyk7XG5cbiAgLy8gV2FpdGluZyBSb29tXG4gIHdhaXRpbmdSb29tRmlsdGVyID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcbiAgd2FpdGluZ1Jvb21MaXN0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxXYWl0aW5nUm9vbVBhcnRpY2lwYW50W10+KFtdKTtcbiAgd2FpdGluZ1Jvb21Db3VudGVyID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICBmaWx0ZXJlZFdhaXRpbmdSb29tTGlzdCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8V2FpdGluZ1Jvb21QYXJ0aWNpcGFudFtdPihbXSk7XG5cbiAgLy8gUmVxdWVzdHNcbiAgcmVxdWVzdEZpbHRlciA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gIHJlcXVlc3RMaXN0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxSZXF1ZXN0W10+KFtdKTtcbiAgcmVxdWVzdENvdW50ZXIgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG4gIGZpbHRlcmVkUmVxdWVzdExpc3QgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFJlcXVlc3RbXT4oW10pO1xuXG4gIC8vIFRvdGFsIFJlcXVlc3RzIGFuZCBXYWl0aW5nIFJvb21cbiAgdG90YWxSZXFXYWl0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuXG4gIC8vIEFsZXJ0c1xuICBhbGVydFZpc2libGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgYWxlcnRNZXNzYWdlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcbiAgYWxlcnRUeXBlID0gbmV3IEJlaGF2aW9yU3ViamVjdDwnc3VjY2VzcycgfCAnZGFuZ2VyJz4oJ3N1Y2Nlc3MnKTtcbiAgYWxlcnREdXJhdGlvbiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigzMDAwKTtcblxuICAvLyBQcm9ncmVzcyBUaW1lclxuICBwcm9ncmVzc1RpbWVyVmlzaWJsZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4odHJ1ZSk7XG4gIHByb2dyZXNzVGltZXJWYWx1ZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcblxuICAvLyBNZW51IE1vZGFsc1xuICBpc01lbnVNb2RhbFZpc2libGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgaXNSZWNvcmRpbmdNb2RhbFZpc2libGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgaXNTZXR0aW5nc01vZGFsVmlzaWJsZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBpc1JlcXVlc3RzTW9kYWxWaXNpYmxlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGlzV2FpdGluZ01vZGFsVmlzaWJsZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBpc0NvSG9zdE1vZGFsVmlzaWJsZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBpc01lZGlhU2V0dGluZ3NNb2RhbFZpc2libGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgaXNEaXNwbGF5U2V0dGluZ3NNb2RhbFZpc2libGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcblxuICAvLyBPdGhlciBNb2RhbHNcbiAgaXNQYXJ0aWNpcGFudHNNb2RhbFZpc2libGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgaXNNZXNzYWdlc01vZGFsVmlzaWJsZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBpc0NvbmZpcm1FeGl0TW9kYWxWaXNpYmxlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGlzQ29uZmlybUhlcmVNb2RhbFZpc2libGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgaXNTaGFyZUV2ZW50TW9kYWxWaXNpYmxlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGlzTG9hZGluZ01vZGFsVmlzaWJsZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIC8vIFJlY29yZGluZyBPcHRpb25zXG4gIHJlY29yZGluZ01lZGlhT3B0aW9ucyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPigndmlkZW8nKTtcbiAgcmVjb3JkaW5nQXVkaW9PcHRpb25zID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCdhbGwnKTtcbiAgcmVjb3JkaW5nVmlkZW9PcHRpb25zID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCdhbGwnKTtcbiAgcmVjb3JkaW5nVmlkZW9UeXBlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCdmdWxsRGlzcGxheScpO1xuICByZWNvcmRpbmdWaWRlb09wdGltaXplZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICByZWNvcmRpbmdEaXNwbGF5VHlwZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8J3ZpZGVvJyB8ICdtZWRpYScgfCAnYWxsJz4oJ3ZpZGVvJyk7XG4gIHJlY29yZGluZ0FkZEhMUyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4odHJ1ZSk7XG4gIHJlY29yZGluZ05hbWVUYWdzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPih0cnVlKTtcbiAgcmVjb3JkaW5nQmFja2dyb3VuZENvbG9yID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcjODNjMGU5Jyk7XG4gIHJlY29yZGluZ05hbWVUYWdzQ29sb3IgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJyNmZmZmZmYnKTtcbiAgcmVjb3JkaW5nQWRkVGV4dCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICByZWNvcmRpbmdDdXN0b21UZXh0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCdBZGQgVGV4dCcpO1xuICByZWNvcmRpbmdDdXN0b21UZXh0UG9zaXRpb24gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJ3RvcCcpO1xuICByZWNvcmRpbmdDdXN0b21UZXh0Q29sb3IgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJyNmZmZmZmYnKTtcbiAgcmVjb3JkaW5nT3JpZW50YXRpb25WaWRlbyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignbGFuZHNjYXBlJyk7XG4gIGNsZWFyZWRUb1Jlc3VtZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4odHJ1ZSk7XG4gIGNsZWFyZWRUb1JlY29yZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4odHJ1ZSk7XG4gIHJlY29yZFN0YXRlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCdncmVlbicpO1xuICBzaG93UmVjb3JkQnV0dG9ucyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICByZWNvcmRpbmdQcm9ncmVzc1RpbWUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJzAwOjAwOjAwJyk7XG4gIGF1ZGlvU3dpdGNoaW5nID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHZpZGVvU3dpdGNoaW5nID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG5cbiAgLy8gTWVkaWEgU3RhdGVzXG4gIHZpZGVvQWxyZWFkeU9uID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGF1ZGlvQWxyZWFkeU9uID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG5cbiAgY29tcG9uZW50U2l6ZXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PENvbXBvbmVudFNpemVzPih7XG4gICAgbWFpbkhlaWdodDogMCxcbiAgICBvdGhlckhlaWdodDogMCxcbiAgICBtYWluV2lkdGg6IDAsXG4gICAgb3RoZXJXaWR0aDogMCxcbiAgfSk7XG5cbiAgLy8gUGVybWlzc2lvbnNcbiAgaGFzQ2FtZXJhUGVybWlzc2lvbiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBoYXNBdWRpb1Blcm1pc3Npb24gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcblxuICAvLyBUcmFuc3BvcnRzXG4gIHRyYW5zcG9ydENyZWF0ZWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgdHJhbnNwb3J0Q3JlYXRlZFZpZGVvID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHRyYW5zcG9ydENyZWF0ZWRBdWRpbyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICB0cmFuc3BvcnRDcmVhdGVkU2NyZWVuID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHByb2R1Y2VyVHJhbnNwb3J0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxUcmFuc3BvcnQgfCBudWxsPihudWxsKTtcbiAgdmlkZW9Qcm9kdWNlciA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UHJvZHVjZXIgfCBudWxsPihudWxsKTtcbiAgcGFyYW1zID0gbmV3IEJlaGF2aW9yU3ViamVjdDxQcm9kdWNlck9wdGlvbnM+KHt9IGFzIFByb2R1Y2VyT3B0aW9ucyk7XG4gIHZpZGVvUGFyYW1zID0gbmV3IEJlaGF2aW9yU3ViamVjdDxQcm9kdWNlck9wdGlvbnM+KHt9IGFzIFByb2R1Y2VyT3B0aW9ucyk7XG4gIGF1ZGlvUGFyYW1zID0gbmV3IEJlaGF2aW9yU3ViamVjdDxQcm9kdWNlck9wdGlvbnM+KHt9IGFzIFByb2R1Y2VyT3B0aW9ucyk7XG4gIGF1ZGlvUHJvZHVjZXIgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFByb2R1Y2VyIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN1bWVyVHJhbnNwb3J0cyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8VHJhbnNwb3J0VHlwZVtdPihbXSk7XG4gIGNvbnN1bWluZ1RyYW5zcG9ydHMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZ1tdPihbXSk7XG5cbiAgLy8gUG9sbHNcbiAgcG9sbHMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFBvbGxbXT4oW10pO1xuICBwb2xsID0gbmV3IEJlaGF2aW9yU3ViamVjdDxQb2xsIHwgbnVsbD4obnVsbCk7XG4gIGlzUG9sbE1vZGFsVmlzaWJsZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIC8vIEJhY2tncm91bmRcbiAgY3VzdG9tSW1hZ2UgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICBzZWxlY3RlZEltYWdlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcbiAgc2VnbWVudFZpZGVvID0gbmV3IEJlaGF2aW9yU3ViamVjdDxNZWRpYVN0cmVhbSB8IG51bGw+KG51bGwpO1xuICBzZWxmaWVTZWdtZW50YXRpb24gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFNlbGZpZVNlZ21lbnRhdGlvbiB8IG51bGw+KG51bGwpO1xuICBwYXVzZVNlZ21lbnRhdGlvbiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBwcm9jZXNzZWRTdHJlYW0gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE1lZGlhU3RyZWFtIHwgbnVsbD4obnVsbCk7XG4gIGtlZXBCYWNrZ3JvdW5kID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGJhY2tncm91bmRIYXNDaGFuZ2VkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHZpcnR1YWxTdHJlYW0gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE1lZGlhU3RyZWFtIHwgbnVsbD4obnVsbCk7XG4gIG1haW5DYW52YXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEhUTUxDYW52YXNFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIHByZXZLZWVwQmFja2dyb3VuZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBhcHBsaWVkQmFja2dyb3VuZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBpc0JhY2tncm91bmRNb2RhbFZpc2libGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgYXV0b0NsaWNrQmFja2dyb3VuZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIC8vIEJyZWFrb3V0IFJvb21zXG4gIGJyZWFrb3V0Um9vbXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEJyZWFrb3V0UGFydGljaXBhbnRbXVtdPihbXSk7XG4gIGN1cnJlbnRSb29tSW5kZXggPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG4gIGNhblN0YXJ0QnJlYWtvdXQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgYnJlYWtPdXRSb29tU3RhcnRlZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBicmVha091dFJvb21FbmRlZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBob3N0TmV3Um9vbSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigtMSk7XG4gIGxpbWl0ZWRCcmVha1Jvb20gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEJyZWFrb3V0UGFydGljaXBhbnRbXT4oW10pO1xuICBtYWluUm9vbXNMZW5ndGggPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG4gIG1lbWJlclJvb20gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oLTEpO1xuICBpc0JyZWFrb3V0Um9vbXNNb2RhbFZpc2libGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcblxuICAvLyBXaGl0ZWJvYXJkXG4gIHdoaXRlYm9hcmRVc2VycyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8V2hpdGVib2FyZFVzZXJbXT4oW10pO1xuICBjdXJyZW50V2hpdGVib2FyZEluZGV4ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICBjYW5TdGFydFdoaXRlYm9hcmQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgd2hpdGVib2FyZFN0YXJ0ZWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgd2hpdGVib2FyZEVuZGVkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHdoaXRlYm9hcmRMaW1pdCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPig0KTtcbiAgaXNXaGl0ZWJvYXJkTW9kYWxWaXNpYmxlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGlzQ29uZmlndXJlV2hpdGVib2FyZE1vZGFsVmlzaWJsZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBzaGFwZXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFNoYXBlW10+KFtdKTtcbiAgdXNlSW1hZ2VCYWNrZ3JvdW5kID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPih0cnVlKTtcbiAgcmVkb1N0YWNrID0gbmV3IEJlaGF2aW9yU3ViamVjdDxTaGFwZVtdPihbXSk7XG4gIHVuZG9TdGFjayA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nW10+KFtdKTtcbiAgY2FudmFzU3RyZWFtID0gbmV3IEJlaGF2aW9yU3ViamVjdDxNZWRpYVN0cmVhbSB8IG51bGw+KG51bGwpO1xuICBjYW52YXNXaGl0ZWJvYXJkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxIVE1MQ2FudmFzRWxlbWVudCB8IG51bGw+KG51bGwpO1xuXG4gIC8vIFNjcmVlbmJvYXJkXG4gIGNhbnZhc1NjcmVlbmJvYXJkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxIVE1MQ2FudmFzRWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBwcm9jZXNzZWRTY3JlZW5TdHJlYW0gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE1lZGlhU3RyZWFtIHwgbnVsbD4obnVsbCk7XG4gIGFubm90YXRlU2NyZWVuU3RyZWFtID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIG1haW5TY3JlZW5DYW52YXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEhUTUxDYW52YXNFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGlzU2NyZWVuYm9hcmRNb2RhbFZpc2libGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcblxuICAvL3N0YXRlIHZhcmlhYmxlcyBmb3IgdGhlIGNvbnRyb2wgYnV0dG9uc1xuICBtaWNBY3RpdmUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KFxuICAgIHRoaXMuYXVkaW9BbHJlYWR5T24udmFsdWUgPyB0aGlzLmF1ZGlvQWxyZWFkeU9uLnZhbHVlIDogZmFsc2UsXG4gICk7XG4gIHZpZGVvQWN0aXZlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihcbiAgICB0aGlzLnZpZGVvQWxyZWFkeU9uLnZhbHVlID8gdGhpcy52aWRlb0FscmVhZHlPbi52YWx1ZSA6IGZhbHNlLFxuICApO1xuICBzY3JlZW5TaGFyZUFjdGl2ZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBlbmRDYWxsQWN0aXZlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHBhcnRpY2lwYW50c0FjdGl2ZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBtZW51QWN0aXZlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGNvbW1lbnRzQWN0aXZlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG5cbiAgLy8gVXBkYXRlIGZ1bmN0aW9uc1xuICB1cGRhdGVNZXNzYWdlcyA9ICh2YWx1ZTogTWVzc2FnZVtdKSA9PiB7XG4gICAgdGhpcy5tZXNzYWdlcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVTdGFydERpcmVjdE1lc3NhZ2UgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnN0YXJ0RGlyZWN0TWVzc2FnZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVEaXJlY3RNZXNzYWdlRGV0YWlscyA9ICh2YWx1ZTogUGFydGljaXBhbnQgfCBudWxsKSA9PiB7XG4gICAgdGhpcy5kaXJlY3RNZXNzYWdlRGV0YWlscy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVTaG93TWVzc2FnZXNCYWRnZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuc2hvd01lc3NhZ2VzQmFkZ2UubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQXVkaW9TZXR0aW5nID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLmF1ZGlvU2V0dGluZy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVWaWRlb1NldHRpbmcgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMudmlkZW9TZXR0aW5nLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVNjcmVlbnNoYXJlU2V0dGluZyA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5zY3JlZW5zaGFyZVNldHRpbmcubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQ2hhdFNldHRpbmcgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMuY2hhdFNldHRpbmcubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlRGlzcGxheU9wdGlvbiA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5kaXNwbGF5T3B0aW9uLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUF1dG9XYXZlID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5hdXRvV2F2ZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVGb3JjZUZ1bGxEaXNwbGF5ID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5mb3JjZUZ1bGxEaXNwbGF5Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVByZXZGb3JjZUZ1bGxEaXNwbGF5ID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5wcmV2Rm9yY2VGdWxsRGlzcGxheS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVQcmV2TWVldGluZ0Rpc3BsYXlUeXBlID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLnByZXZNZWV0aW5nRGlzcGxheVR5cGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlV2FpdGluZ1Jvb21Db3VudGVyID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLndhaXRpbmdSb29tQ291bnRlci5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVXYWl0aW5nUm9vbUZpbHRlciA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy53YWl0aW5nUm9vbUZpbHRlci5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVXYWl0aW5nUm9vbUxpc3QgPSAodmFsdWU6IFdhaXRpbmdSb29tUGFydGljaXBhbnRbXSkgPT4ge1xuICAgIHRoaXMud2FpdGluZ1Jvb21MaXN0Lm5leHQodmFsdWUpO1xuICAgIHRoaXMuZmlsdGVyZWRXYWl0aW5nUm9vbUxpc3QubmV4dCh2YWx1ZSk7XG4gICAgdGhpcy53YWl0aW5nUm9vbUNvdW50ZXIubmV4dCh2YWx1ZS5sZW5ndGgpO1xuICB9O1xuXG4gIG9uV2FpdGluZ1Jvb21DbG9zZSA9ICgpID0+IHtcbiAgICB0aGlzLnVwZGF0ZUlzV2FpdGluZ01vZGFsVmlzaWJsZShmYWxzZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVxdWVzdENvdW50ZXIgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMucmVxdWVzdENvdW50ZXIubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVxdWVzdEZpbHRlciA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5yZXF1ZXN0RmlsdGVyLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlcXVlc3RMaXN0ID0gKHZhbHVlOiBSZXF1ZXN0W10pID0+IHtcbiAgICB0aGlzLnJlcXVlc3RMaXN0Lm5leHQodmFsdWUpO1xuICAgIHRoaXMuZmlsdGVyZWRSZXF1ZXN0TGlzdC5uZXh0KHZhbHVlKTtcbiAgICB0aGlzLnJlcXVlc3RDb3VudGVyLm5leHQodmFsdWUubGVuZ3RoKTtcbiAgfTtcblxuICBvblJlcXVlc3RDbG9zZSA9ICgpID0+IHtcbiAgICB0aGlzLnVwZGF0ZUlzUmVxdWVzdHNNb2RhbFZpc2libGUoZmFsc2UpO1xuICB9O1xuXG4gIHVwZGF0ZVRvdGFsUmVxV2FpdCA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy50b3RhbFJlcVdhaXQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQWxlcnRWaXNpYmxlID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5hbGVydFZpc2libGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQWxlcnRNZXNzYWdlID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLmFsZXJ0TWVzc2FnZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBbGVydFR5cGUgPSAodmFsdWU6ICdzdWNjZXNzJyB8ICdkYW5nZXInKSA9PiB7XG4gICAgdGhpcy5hbGVydFR5cGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQWxlcnREdXJhdGlvbiA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5hbGVydER1cmF0aW9uLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVByb2dyZXNzVGltZXJWaXNpYmxlID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5wcm9ncmVzc1RpbWVyVmlzaWJsZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVQcm9ncmVzc1RpbWVyVmFsdWUgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMucHJvZ3Jlc3NUaW1lclZhbHVlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUlzTWVudU1vZGFsVmlzaWJsZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuaXNNZW51TW9kYWxWaXNpYmxlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUlzUmVjb3JkaW5nTW9kYWxWaXNpYmxlID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5pc1JlY29yZGluZ01vZGFsVmlzaWJsZS5uZXh0KHZhbHVlKTtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMudXBkYXRlQ29uZmlybWVkVG9SZWNvcmQoZmFsc2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMuY2xlYXJlZFRvUmVjb3JkLmdldFZhbHVlKCkgJiZcbiAgICAgICAgdGhpcy5jbGVhcmVkVG9SZXN1bWUuZ2V0VmFsdWUoKSAmJlxuICAgICAgICB0aGlzLnJlY29yZFN0YXJ0ZWQuZ2V0VmFsdWUoKVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMudXBkYXRlU2hvd1JlY29yZEJ1dHRvbnModHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHVwZGF0ZUlzU2V0dGluZ3NNb2RhbFZpc2libGUgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmlzU2V0dGluZ3NNb2RhbFZpc2libGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlSXNSZXF1ZXN0c01vZGFsVmlzaWJsZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuaXNSZXF1ZXN0c01vZGFsVmlzaWJsZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVJc1dhaXRpbmdNb2RhbFZpc2libGUgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmlzV2FpdGluZ01vZGFsVmlzaWJsZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVJc0NvSG9zdE1vZGFsVmlzaWJsZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuaXNDb0hvc3RNb2RhbFZpc2libGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlSXNNZWRpYVNldHRpbmdzTW9kYWxWaXNpYmxlID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5pc01lZGlhU2V0dGluZ3NNb2RhbFZpc2libGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlSXNEaXNwbGF5U2V0dGluZ3NNb2RhbFZpc2libGUgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmlzRGlzcGxheVNldHRpbmdzTW9kYWxWaXNpYmxlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUlzUGFydGljaXBhbnRzTW9kYWxWaXNpYmxlID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5pc1BhcnRpY2lwYW50c01vZGFsVmlzaWJsZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVJc01lc3NhZ2VzTW9kYWxWaXNpYmxlID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5pc01lc3NhZ2VzTW9kYWxWaXNpYmxlLm5leHQodmFsdWUpO1xuICAgIGlmICghdmFsdWUpIHtcbiAgICAgIHRoaXMudXBkYXRlU2hvd01lc3NhZ2VzQmFkZ2UoZmFsc2UpO1xuICAgIH1cbiAgfTtcblxuICB1cGRhdGVJc0NvbmZpcm1FeGl0TW9kYWxWaXNpYmxlID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5pc0NvbmZpcm1FeGl0TW9kYWxWaXNpYmxlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUlzQ29uZmlybUhlcmVNb2RhbFZpc2libGUgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmlzQ29uZmlybUhlcmVNb2RhbFZpc2libGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlSXNMb2FkaW5nTW9kYWxWaXNpYmxlID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5pc0xvYWRpbmdNb2RhbFZpc2libGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlSXNTaGFyZUV2ZW50TW9kYWxWaXNpYmxlID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5pc1NoYXJlRXZlbnRNb2RhbFZpc2libGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nTWVkaWFPcHRpb25zID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ01lZGlhT3B0aW9ucy5uZXh0KHZhbHVlKTtcbiAgICB0aGlzLmNsZWFyZWRUb1JlY29yZC5uZXh0KGZhbHNlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRpbmdBdWRpb09wdGlvbnMgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMucmVjb3JkaW5nQXVkaW9PcHRpb25zLm5leHQodmFsdWUpO1xuICAgIHRoaXMuY2xlYXJlZFRvUmVjb3JkLm5leHQoZmFsc2UpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ1ZpZGVvT3B0aW9ucyA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdWaWRlb09wdGlvbnMubmV4dCh2YWx1ZSk7XG4gICAgdGhpcy5jbGVhcmVkVG9SZWNvcmQubmV4dChmYWxzZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nVmlkZW9UeXBlID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ1ZpZGVvVHlwZS5uZXh0KHZhbHVlKTtcbiAgICB0aGlzLmNsZWFyZWRUb1JlY29yZC5uZXh0KGZhbHNlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRpbmdWaWRlb09wdGltaXplZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMucmVjb3JkaW5nVmlkZW9PcHRpbWl6ZWQubmV4dCh2YWx1ZSk7XG4gICAgdGhpcy5jbGVhcmVkVG9SZWNvcmQubmV4dChmYWxzZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nRGlzcGxheVR5cGUgPSAodmFsdWU6ICd2aWRlbycgfCAnbWVkaWEnIHwgJ2FsbCcpID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ0Rpc3BsYXlUeXBlLm5leHQodmFsdWUpO1xuICAgIHRoaXMuY2xlYXJlZFRvUmVjb3JkLm5leHQoZmFsc2UpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ0FkZEhMUyA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMucmVjb3JkaW5nQWRkSExTLm5leHQodmFsdWUpO1xuICAgIHRoaXMuY2xlYXJlZFRvUmVjb3JkLm5leHQoZmFsc2UpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ0FkZFRleHQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ0FkZFRleHQubmV4dCh2YWx1ZSk7XG4gICAgdGhpcy5jbGVhcmVkVG9SZWNvcmQubmV4dChmYWxzZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nQ3VzdG9tVGV4dCA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdDdXN0b21UZXh0Lm5leHQodmFsdWUpO1xuICAgIHRoaXMuY2xlYXJlZFRvUmVjb3JkLm5leHQoZmFsc2UpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ0N1c3RvbVRleHRQb3NpdGlvbiA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdDdXN0b21UZXh0UG9zaXRpb24ubmV4dCh2YWx1ZSk7XG4gICAgdGhpcy5jbGVhcmVkVG9SZWNvcmQubmV4dChmYWxzZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nQ3VzdG9tVGV4dENvbG9yID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ0N1c3RvbVRleHRDb2xvci5uZXh0KHZhbHVlKTtcbiAgICB0aGlzLmNsZWFyZWRUb1JlY29yZC5uZXh0KGZhbHNlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRpbmdOYW1lVGFncyA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMucmVjb3JkaW5nTmFtZVRhZ3MubmV4dCh2YWx1ZSk7XG4gICAgdGhpcy5jbGVhcmVkVG9SZWNvcmQubmV4dChmYWxzZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nQmFja2dyb3VuZENvbG9yID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ0JhY2tncm91bmRDb2xvci5uZXh0KHZhbHVlKTtcbiAgICB0aGlzLmNsZWFyZWRUb1JlY29yZC5uZXh0KGZhbHNlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRpbmdOYW1lVGFnc0NvbG9yID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ05hbWVUYWdzQ29sb3IubmV4dCh2YWx1ZSk7XG4gICAgdGhpcy5jbGVhcmVkVG9SZWNvcmQubmV4dChmYWxzZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nT3JpZW50YXRpb25WaWRlbyA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdPcmllbnRhdGlvblZpZGVvLm5leHQodmFsdWUpO1xuICAgIHRoaXMuY2xlYXJlZFRvUmVjb3JkLm5leHQoZmFsc2UpO1xuICB9O1xuXG4gIHVwZGF0ZUNsZWFyZWRUb1Jlc3VtZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuY2xlYXJlZFRvUmVzdW1lLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUNsZWFyZWRUb1JlY29yZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuY2xlYXJlZFRvUmVjb3JkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZFN0YXRlID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICBpZiAodGhpcy5yZWNvcmRTdGFydGVkLnZhbHVlICYmICF0aGlzLnJlY29yZFN0b3BwZWQudmFsdWUpIHtcbiAgICAgIGlmICghdGhpcy5yZWNvcmRQYXVzZWQudmFsdWUpIHtcbiAgICAgICAgdGhpcy5yZWNvcmRTdGF0ZS5uZXh0KCdyZWQnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucmVjb3JkU3RhdGUubmV4dCgneWVsbG93Jyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVjb3JkU3RhdGUubmV4dCh2YWx1ZSk7XG4gICAgfVxuICAgIHRoaXMucmVjb3JkU3RhdGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlU2hvd1JlY29yZEJ1dHRvbnMgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnNob3dSZWNvcmRCdXR0b25zLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ1Byb2dyZXNzVGltZSA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdQcm9ncmVzc1RpbWUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQXVkaW9Td2l0Y2hpbmcgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmF1ZGlvU3dpdGNoaW5nLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVZpZGVvU3dpdGNoaW5nID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy52aWRlb1N3aXRjaGluZy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVWaWRlb0FscmVhZHlPbiA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMudmlkZW9BbHJlYWR5T24ubmV4dCh2YWx1ZSk7XG4gICAgdGhpcy52aWRlb0FjdGl2ZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBdWRpb0FscmVhZHlPbiA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuYXVkaW9BbHJlYWR5T24ubmV4dCh2YWx1ZSk7XG4gICAgdGhpcy5taWNBY3RpdmUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQ29tcG9uZW50U2l6ZXMgPSAoc2l6ZXM6IENvbXBvbmVudFNpemVzKSA9PiB7XG4gICAgdGhpcy5jb21wb25lbnRTaXplcy5uZXh0KHNpemVzKTtcbiAgfTtcblxuICB1cGRhdGVIYXNDYW1lcmFQZXJtaXNzaW9uID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5oYXNDYW1lcmFQZXJtaXNzaW9uLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUhhc0F1ZGlvUGVybWlzc2lvbiA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuaGFzQXVkaW9QZXJtaXNzaW9uLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHJlcXVlc3RQZXJtaXNzaW9uQ2FtZXJhKCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgLy8gSW1wbGVtZW50IHRoZSByZXF1ZXN0IHBlcm1pc3Npb24gbG9naWMgaGVyZVxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoJ2dyYW50ZWQnKTtcbiAgfVxuXG4gIHJlcXVlc3RQZXJtaXNzaW9uQXVkaW8oKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAvLyBJbXBsZW1lbnQgdGhlIHJlcXVlc3QgcGVybWlzc2lvbiBsb2dpYyBoZXJlXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgnZ3JhbnRlZCcpO1xuICB9XG5cbiAgdXBkYXRlVHJhbnNwb3J0Q3JlYXRlZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMudHJhbnNwb3J0Q3JlYXRlZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVUcmFuc3BvcnRDcmVhdGVkVmlkZW8gPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnRyYW5zcG9ydENyZWF0ZWRWaWRlby5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVUcmFuc3BvcnRDcmVhdGVkQXVkaW8gPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnRyYW5zcG9ydENyZWF0ZWRBdWRpby5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVUcmFuc3BvcnRDcmVhdGVkU2NyZWVuID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy50cmFuc3BvcnRDcmVhdGVkU2NyZWVuLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVByb2R1Y2VyVHJhbnNwb3J0ID0gKHZhbHVlOiBUcmFuc3BvcnQgfCBudWxsKSA9PiB7XG4gICAgdGhpcy5wcm9kdWNlclRyYW5zcG9ydC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVWaWRlb1Byb2R1Y2VyID0gKHZhbHVlOiBQcm9kdWNlciB8IG51bGwpID0+IHtcbiAgICB0aGlzLnZpZGVvUHJvZHVjZXIubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUGFyYW1zID0gKHZhbHVlOiBQcm9kdWNlck9wdGlvbnMpID0+IHtcbiAgICB0aGlzLnBhcmFtcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVWaWRlb1BhcmFtcyA9ICh2YWx1ZTogUHJvZHVjZXJPcHRpb25zKSA9PiB7XG4gICAgdGhpcy52aWRlb1BhcmFtcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBdWRpb1BhcmFtcyA9ICh2YWx1ZTogUHJvZHVjZXJPcHRpb25zKSA9PiB7XG4gICAgdGhpcy5hdWRpb1BhcmFtcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBdWRpb1Byb2R1Y2VyID0gKHZhbHVlOiBQcm9kdWNlciB8IG51bGwpID0+IHtcbiAgICB0aGlzLmF1ZGlvUHJvZHVjZXIubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQ29uc3VtZXJUcmFuc3BvcnRzID0gKHZhbHVlOiBUcmFuc3BvcnRUeXBlW10pID0+IHtcbiAgICB0aGlzLmNvbnN1bWVyVHJhbnNwb3J0cy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVDb25zdW1pbmdUcmFuc3BvcnRzID0gKHZhbHVlOiBzdHJpbmdbXSkgPT4ge1xuICAgIHRoaXMuY29uc3VtaW5nVHJhbnNwb3J0cy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVQb2xscyA9ICh2YWx1ZTogUG9sbFtdKSA9PiB7XG4gICAgdGhpcy5wb2xscy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVQb2xsID0gKHZhbHVlOiBQb2xsIHwgbnVsbCkgPT4ge1xuICAgIHRoaXMucG9sbC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVJc1BvbGxNb2RhbFZpc2libGUgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmlzUG9sbE1vZGFsVmlzaWJsZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVDdXN0b21JbWFnZSA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5jdXN0b21JbWFnZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVTZWxlY3RlZEltYWdlID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLnNlbGVjdGVkSW1hZ2UubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlU2VnbWVudFZpZGVvID0gKHZhbHVlOiBNZWRpYVN0cmVhbSB8IG51bGwpID0+IHtcbiAgICB0aGlzLnNlZ21lbnRWaWRlby5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVTZWxmaWVTZWdtZW50YXRpb24gPSAodmFsdWU6IFNlbGZpZVNlZ21lbnRhdGlvbiB8IG51bGwpID0+IHtcbiAgICB0aGlzLnNlbGZpZVNlZ21lbnRhdGlvbi5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVQYXVzZVNlZ21lbnRhdGlvbiA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMucGF1c2VTZWdtZW50YXRpb24ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUHJvY2Vzc2VkU3RyZWFtID0gKHZhbHVlOiBNZWRpYVN0cmVhbSB8IG51bGwpID0+IHtcbiAgICB0aGlzLnByb2Nlc3NlZFN0cmVhbS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVLZWVwQmFja2dyb3VuZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMua2VlcEJhY2tncm91bmQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQmFja2dyb3VuZEhhc0NoYW5nZWQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmJhY2tncm91bmRIYXNDaGFuZ2VkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVZpcnR1YWxTdHJlYW0gPSAodmFsdWU6IE1lZGlhU3RyZWFtIHwgbnVsbCkgPT4ge1xuICAgIHRoaXMudmlydHVhbFN0cmVhbS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVNYWluQ2FudmFzID0gKHZhbHVlOiBIVE1MQ2FudmFzRWxlbWVudCB8IG51bGwpID0+IHtcbiAgICB0aGlzLm1haW5DYW52YXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUHJldktlZXBCYWNrZ3JvdW5kID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5wcmV2S2VlcEJhY2tncm91bmQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQXBwbGllZEJhY2tncm91bmQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmFwcGxpZWRCYWNrZ3JvdW5kLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUlzQmFja2dyb3VuZE1vZGFsVmlzaWJsZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuaXNCYWNrZ3JvdW5kTW9kYWxWaXNpYmxlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUF1dG9DbGlja0JhY2tncm91bmQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmF1dG9DbGlja0JhY2tncm91bmQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQnJlYWtvdXRSb29tcyA9ICh2YWx1ZTogQnJlYWtvdXRQYXJ0aWNpcGFudFtdW10pID0+IHtcbiAgICB0aGlzLmJyZWFrb3V0Um9vbXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQ3VycmVudFJvb21JbmRleCA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5jdXJyZW50Um9vbUluZGV4Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUNhblN0YXJ0QnJlYWtvdXQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmNhblN0YXJ0QnJlYWtvdXQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQnJlYWtPdXRSb29tU3RhcnRlZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuYnJlYWtPdXRSb29tU3RhcnRlZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVCcmVha091dFJvb21FbmRlZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuYnJlYWtPdXRSb29tRW5kZWQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlSG9zdE5ld1Jvb20gPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMuaG9zdE5ld1Jvb20ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTGltaXRlZEJyZWFrUm9vbSA9ICh2YWx1ZTogQnJlYWtvdXRQYXJ0aWNpcGFudFtdKSA9PiB7XG4gICAgdGhpcy5saW1pdGVkQnJlYWtSb29tLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZU1haW5Sb29tc0xlbmd0aCA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5tYWluUm9vbXNMZW5ndGgubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTWVtYmVyUm9vbSA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5tZW1iZXJSb29tLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUlzQnJlYWtvdXRSb29tc01vZGFsVmlzaWJsZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuaXNCcmVha291dFJvb21zTW9kYWxWaXNpYmxlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVdoaXRlYm9hcmRVc2VycyA9ICh2YWx1ZTogV2hpdGVib2FyZFVzZXJbXSkgPT4ge1xuICAgIHRoaXMud2hpdGVib2FyZFVzZXJzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUN1cnJlbnRXaGl0ZWJvYXJkSW5kZXggPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMuY3VycmVudFdoaXRlYm9hcmRJbmRleC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVDYW5TdGFydFdoaXRlYm9hcmQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmNhblN0YXJ0V2hpdGVib2FyZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVXaGl0ZWJvYXJkU3RhcnRlZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMud2hpdGVib2FyZFN0YXJ0ZWQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlV2hpdGVib2FyZEVuZGVkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy53aGl0ZWJvYXJkRW5kZWQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlV2hpdGVib2FyZExpbWl0ID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLndoaXRlYm9hcmRMaW1pdC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVJc1doaXRlYm9hcmRNb2RhbFZpc2libGUgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmlzV2hpdGVib2FyZE1vZGFsVmlzaWJsZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVJc0NvbmZpZ3VyZVdoaXRlYm9hcmRNb2RhbFZpc2libGUgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmlzQ29uZmlndXJlV2hpdGVib2FyZE1vZGFsVmlzaWJsZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVTaGFwZXMgPSAodmFsdWU6IFNoYXBlW10pID0+IHtcbiAgICB0aGlzLnNoYXBlcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVVc2VJbWFnZUJhY2tncm91bmQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnVzZUltYWdlQmFja2dyb3VuZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZWRvU3RhY2sgPSAodmFsdWU6IFNoYXBlW10pID0+IHtcbiAgICB0aGlzLnJlZG9TdGFjay5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVVbmRvU3RhY2sgPSAodmFsdWU6IHN0cmluZ1tdKSA9PiB7XG4gICAgdGhpcy51bmRvU3RhY2submV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQ2FudmFzU3RyZWFtID0gKHZhbHVlOiBNZWRpYVN0cmVhbSB8IG51bGwpID0+IHtcbiAgICB0aGlzLmNhbnZhc1N0cmVhbS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVDYW52YXNXaGl0ZWJvYXJkID0gKHZhbHVlOiBIVE1MQ2FudmFzRWxlbWVudCB8IG51bGwpID0+IHtcbiAgICB0aGlzLmNhbnZhc1doaXRlYm9hcmQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQ2FudmFzU2NyZWVuYm9hcmQgPSAodmFsdWU6IEhUTUxDYW52YXNFbGVtZW50IHwgbnVsbCkgPT4ge1xuICAgIHRoaXMuY2FudmFzU2NyZWVuYm9hcmQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUHJvY2Vzc2VkU2NyZWVuU3RyZWFtID0gKHZhbHVlOiBNZWRpYVN0cmVhbSB8IG51bGwpID0+IHtcbiAgICB0aGlzLnByb2Nlc3NlZFNjcmVlblN0cmVhbS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBbm5vdGF0ZVNjcmVlblN0cmVhbSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuYW5ub3RhdGVTY3JlZW5TdHJlYW0ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTWFpblNjcmVlbkNhbnZhcyA9ICh2YWx1ZTogSFRNTENhbnZhc0VsZW1lbnQgfCBudWxsKSA9PiB7XG4gICAgdGhpcy5tYWluU2NyZWVuQ2FudmFzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUlzU2NyZWVuYm9hcmRNb2RhbFZpc2libGUgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmlzU2NyZWVuYm9hcmRNb2RhbFZpc2libGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgY2hlY2tPcmllbnRhdGlvbiA9ICgpID0+IHtcbiAgICBjb25zdCBpc1BvcnRyYWl0ID0gd2luZG93Lm1hdGNoTWVkaWEoJyhvcmllbnRhdGlvbjogcG9ydHJhaXQpJykubWF0Y2hlcztcbiAgICByZXR1cm4gaXNQb3J0cmFpdCA/ICdwb3J0cmFpdCcgOiAnbGFuZHNjYXBlJztcbiAgfTtcblxuICBzaG93QWxlcnQgPSAoe1xuICAgIG1lc3NhZ2UsXG4gICAgdHlwZSxcbiAgICBkdXJhdGlvbiA9IDMwMDAsXG4gIH06IHtcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgdHlwZTogJ3N1Y2Nlc3MnIHwgJ2Rhbmdlcic7XG4gICAgZHVyYXRpb24/OiBudW1iZXI7XG4gIH0pID0+IHtcbiAgICB0aGlzLnVwZGF0ZUFsZXJ0TWVzc2FnZShtZXNzYWdlKTtcbiAgICB0aGlzLnVwZGF0ZUFsZXJ0VHlwZSh0eXBlKTtcbiAgICB0aGlzLnVwZGF0ZUFsZXJ0RHVyYXRpb24oZHVyYXRpb24pO1xuICAgIHRoaXMudXBkYXRlQWxlcnRWaXNpYmxlKHRydWUpO1xuICB9O1xuXG4gIGdldEFsbFBhcmFtcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbG9jYWxVSU1vZGU6IHRoaXMubG9jYWxVSU1vZGUudmFsdWUsIC8vIExvY2FsIFVJIG1vZGVcblxuICAgICAgLy8gUm9vbSBEZXRhaWxzXG4gICAgICByb29tTmFtZTogdGhpcy5yb29tTmFtZS52YWx1ZSxcbiAgICAgIG1lbWJlcjogdGhpcy5tZW1iZXIudmFsdWUsXG4gICAgICBhZG1pblBhc3Njb2RlOiB0aGlzLmFkbWluUGFzc2NvZGUudmFsdWUsXG4gICAgICB5b3VBcmVDb0hvc3Q6IHRoaXMueW91QXJlQ29Ib3N0LnZhbHVlLFxuICAgICAgeW91QXJlSG9zdDogdGhpcy55b3VBcmVIb3N0LnZhbHVlLFxuICAgICAgaXNsZXZlbDogdGhpcy5pc2xldmVsLnZhbHVlLFxuICAgICAgY29uZmlybWVkVG9SZWNvcmQ6IHRoaXMuY29uZmlybWVkVG9SZWNvcmQudmFsdWUsXG4gICAgICBtZWV0aW5nRGlzcGxheVR5cGU6IHRoaXMubWVldGluZ0Rpc3BsYXlUeXBlLnZhbHVlLFxuICAgICAgbWVldGluZ1ZpZGVvT3B0aW1pemVkOiB0aGlzLm1lZXRpbmdWaWRlb09wdGltaXplZC52YWx1ZSxcbiAgICAgIGV2ZW50VHlwZTogdGhpcy5ldmVudFR5cGUudmFsdWUsXG4gICAgICBwYXJ0aWNpcGFudHM6IHRoaXMucGFydGljaXBhbnRzLnZhbHVlLFxuICAgICAgZmlsdGVyZWRQYXJ0aWNpcGFudHM6IHRoaXMuZmlsdGVyZWRQYXJ0aWNpcGFudHMudmFsdWUsXG4gICAgICBwYXJ0aWNpcGFudHNDb3VudGVyOiB0aGlzLnBhcnRpY2lwYW50c0NvdW50ZXIudmFsdWUsXG4gICAgICBwYXJ0aWNpcGFudHNGaWx0ZXI6IHRoaXMucGFydGljaXBhbnRzRmlsdGVyLnZhbHVlLFxuXG4gICAgICAvLyBNb3JlIHJvb20gZGV0YWlscyAtIG1lZGlhXG4gICAgICBjb25zdW1lX3NvY2tldHM6IHRoaXMuY29uc3VtZV9zb2NrZXRzLnZhbHVlLFxuICAgICAgcnRwQ2FwYWJpbGl0aWVzOiB0aGlzLnJ0cENhcGFiaWxpdGllcy52YWx1ZSxcbiAgICAgIHJvb21SZWN2SVBzOiB0aGlzLnJvb21SZWN2SVBzLnZhbHVlLFxuICAgICAgbWVldGluZ1Jvb21QYXJhbXM6IHRoaXMubWVldGluZ1Jvb21QYXJhbXMudmFsdWUsXG4gICAgICBpdGVtUGFnZUxpbWl0OiB0aGlzLml0ZW1QYWdlTGltaXQudmFsdWUsXG4gICAgICBhdWRpb09ubHlSb29tOiB0aGlzLmF1ZGlvT25seVJvb20udmFsdWUsXG4gICAgICBhZGRGb3JCYXNpYzogdGhpcy5hZGRGb3JCYXNpYy52YWx1ZSxcbiAgICAgIHNjcmVlblBhZ2VMaW1pdDogdGhpcy5zY3JlZW5QYWdlTGltaXQudmFsdWUsXG4gICAgICBzaGFyZVNjcmVlblN0YXJ0ZWQ6IHRoaXMuc2hhcmVTY3JlZW5TdGFydGVkLnZhbHVlLFxuICAgICAgc2hhcmVkOiB0aGlzLnNoYXJlZC52YWx1ZSxcbiAgICAgIHRhcmdldE9yaWVudGF0aW9uOiB0aGlzLnRhcmdldE9yaWVudGF0aW9uLnZhbHVlLFxuICAgICAgdGFyZ2V0UmVzb2x1dGlvbjogdGhpcy50YXJnZXRSZXNvbHV0aW9uLnZhbHVlLFxuICAgICAgdGFyZ2V0UmVzb2x1dGlvbkhvc3Q6IHRoaXMudGFyZ2V0UmVzb2x1dGlvbkhvc3QudmFsdWUsXG4gICAgICB2aWRDb25zOiB0aGlzLnZpZENvbnMudmFsdWUsXG4gICAgICBmcmFtZVJhdGU6IHRoaXMuZnJhbWVSYXRlLnZhbHVlLFxuICAgICAgaFBhcmFtczogdGhpcy5oUGFyYW1zLnZhbHVlLFxuICAgICAgdlBhcmFtczogdGhpcy52UGFyYW1zLnZhbHVlLFxuICAgICAgc2NyZWVuUGFyYW1zOiB0aGlzLnNjcmVlblBhcmFtcy52YWx1ZSxcbiAgICAgIGFQYXJhbXM6IHRoaXMuYVBhcmFtcy52YWx1ZSxcblxuICAgICAgLy8gTW9yZSByb29tIGRldGFpbHMgLSByZWNvcmRpbmdcbiAgICAgIHJlY29yZGluZ0F1ZGlvUGF1c2VzTGltaXQ6IHRoaXMucmVjb3JkaW5nQXVkaW9QYXVzZXNMaW1pdC52YWx1ZSxcbiAgICAgIHJlY29yZGluZ0F1ZGlvUGF1c2VzQ291bnQ6IHRoaXMucmVjb3JkaW5nQXVkaW9QYXVzZXNDb3VudC52YWx1ZSxcbiAgICAgIHJlY29yZGluZ0F1ZGlvU3VwcG9ydDogdGhpcy5yZWNvcmRpbmdBdWRpb1N1cHBvcnQudmFsdWUsXG4gICAgICByZWNvcmRpbmdBdWRpb1Blb3BsZUxpbWl0OiB0aGlzLnJlY29yZGluZ0F1ZGlvUGVvcGxlTGltaXQudmFsdWUsXG4gICAgICByZWNvcmRpbmdBdWRpb1BhcnRpY2lwYW50c1RpbWVMaW1pdDogdGhpcy5yZWNvcmRpbmdBdWRpb1BhcnRpY2lwYW50c1RpbWVMaW1pdC52YWx1ZSxcbiAgICAgIHJlY29yZGluZ1ZpZGVvUGF1c2VzQ291bnQ6IHRoaXMucmVjb3JkaW5nVmlkZW9QYXVzZXNDb3VudC52YWx1ZSxcbiAgICAgIHJlY29yZGluZ1ZpZGVvUGF1c2VzTGltaXQ6IHRoaXMucmVjb3JkaW5nVmlkZW9QYXVzZXNMaW1pdC52YWx1ZSxcbiAgICAgIHJlY29yZGluZ1ZpZGVvU3VwcG9ydDogdGhpcy5yZWNvcmRpbmdWaWRlb1N1cHBvcnQudmFsdWUsXG4gICAgICByZWNvcmRpbmdWaWRlb1Blb3BsZUxpbWl0OiB0aGlzLnJlY29yZGluZ1ZpZGVvUGVvcGxlTGltaXQudmFsdWUsXG4gICAgICByZWNvcmRpbmdWaWRlb1BhcnRpY2lwYW50c1RpbWVMaW1pdDogdGhpcy5yZWNvcmRpbmdWaWRlb1BhcnRpY2lwYW50c1RpbWVMaW1pdC52YWx1ZSxcbiAgICAgIHJlY29yZGluZ0FsbFBhcnRpY2lwYW50c1N1cHBvcnQ6IHRoaXMucmVjb3JkaW5nQWxsUGFydGljaXBhbnRzU3VwcG9ydC52YWx1ZSxcbiAgICAgIHJlY29yZGluZ1ZpZGVvUGFydGljaXBhbnRzU3VwcG9ydDogdGhpcy5yZWNvcmRpbmdWaWRlb1BhcnRpY2lwYW50c1N1cHBvcnQudmFsdWUsXG4gICAgICByZWNvcmRpbmdBbGxQYXJ0aWNpcGFudHNGdWxsUm9vbVN1cHBvcnQ6IHRoaXMucmVjb3JkaW5nQWxsUGFydGljaXBhbnRzRnVsbFJvb21TdXBwb3J0LnZhbHVlLFxuICAgICAgcmVjb3JkaW5nVmlkZW9QYXJ0aWNpcGFudHNGdWxsUm9vbVN1cHBvcnQ6XG4gICAgICAgIHRoaXMucmVjb3JkaW5nVmlkZW9QYXJ0aWNpcGFudHNGdWxsUm9vbVN1cHBvcnQudmFsdWUsXG4gICAgICByZWNvcmRpbmdQcmVmZXJyZWRPcmllbnRhdGlvbjogdGhpcy5yZWNvcmRpbmdQcmVmZXJyZWRPcmllbnRhdGlvbi52YWx1ZSxcbiAgICAgIHJlY29yZGluZ1N1cHBvcnRGb3JPdGhlck9yaWVudGF0aW9uOiB0aGlzLnJlY29yZGluZ1N1cHBvcnRGb3JPdGhlck9yaWVudGF0aW9uLnZhbHVlLFxuICAgICAgcmVjb3JkaW5nTXVsdGlGb3JtYXRzU3VwcG9ydDogdGhpcy5yZWNvcmRpbmdNdWx0aUZvcm1hdHNTdXBwb3J0LnZhbHVlLFxuXG4gICAgICB1c2VyUmVjb3JkaW5nUGFyYW1zOiB0aGlzLnVzZXJSZWNvcmRpbmdQYXJhbXMudmFsdWUsXG4gICAgICBjYW5SZWNvcmQ6IHRoaXMuY2FuUmVjb3JkLnZhbHVlLFxuICAgICAgc3RhcnRSZXBvcnQ6IHRoaXMuc3RhcnRSZXBvcnQudmFsdWUsXG4gICAgICBlbmRSZXBvcnQ6IHRoaXMuZW5kUmVwb3J0LnZhbHVlLFxuICAgICAgcmVjb3JkU3RhcnRUaW1lOiB0aGlzLnJlY29yZFN0YXJ0VGltZS52YWx1ZSxcbiAgICAgIHJlY29yZEVsYXBzZWRUaW1lOiB0aGlzLnJlY29yZEVsYXBzZWRUaW1lLnZhbHVlLFxuICAgICAgaXNUaW1lclJ1bm5pbmc6IHRoaXMuaXNUaW1lclJ1bm5pbmcudmFsdWUsXG4gICAgICBjYW5QYXVzZVJlc3VtZTogdGhpcy5jYW5QYXVzZVJlc3VtZS52YWx1ZSxcbiAgICAgIHJlY29yZENoYW5nZVNlY29uZHM6IHRoaXMucmVjb3JkQ2hhbmdlU2Vjb25kcy52YWx1ZSxcbiAgICAgIHBhdXNlTGltaXQ6IHRoaXMucGF1c2VMaW1pdC52YWx1ZSxcbiAgICAgIHBhdXNlUmVjb3JkQ291bnQ6IHRoaXMucGF1c2VSZWNvcmRDb3VudC52YWx1ZSxcbiAgICAgIGNhbkxhdW5jaFJlY29yZDogdGhpcy5jYW5MYXVuY2hSZWNvcmQudmFsdWUsXG4gICAgICBzdG9wTGF1bmNoUmVjb3JkOiB0aGlzLnN0b3BMYXVuY2hSZWNvcmQudmFsdWUsXG5cbiAgICAgIHBhcnRpY2lwYW50c0FsbDogdGhpcy5wYXJ0aWNpcGFudHNBbGwudmFsdWUsXG5cbiAgICAgIGZpcnN0QWxsOiB0aGlzLmZpcnN0QWxsLnZhbHVlLFxuICAgICAgdXBkYXRlTWFpbldpbmRvdzogdGhpcy51cGRhdGVNYWluV2luZG93LnZhbHVlLFxuICAgICAgZmlyc3Rfcm91bmQ6IHRoaXMuZmlyc3Rfcm91bmQudmFsdWUsXG4gICAgICBsYW5kU2NhcGVkOiB0aGlzLmxhbmRTY2FwZWQudmFsdWUsXG4gICAgICBsb2NrX3NjcmVlbjogdGhpcy5sb2NrX3NjcmVlbi52YWx1ZSxcbiAgICAgIHNjcmVlbklkOiB0aGlzLnNjcmVlbklkLnZhbHVlLFxuICAgICAgYWxsVmlkZW9TdHJlYW1zOiB0aGlzLmFsbFZpZGVvU3RyZWFtcy52YWx1ZSxcbiAgICAgIG5ld0xpbWl0ZWRTdHJlYW1zOiB0aGlzLm5ld0xpbWl0ZWRTdHJlYW1zLnZhbHVlLFxuICAgICAgbmV3TGltaXRlZFN0cmVhbXNJRHM6IHRoaXMubmV3TGltaXRlZFN0cmVhbXNJRHMudmFsdWUsXG4gICAgICBhY3RpdmVTb3VuZHM6IHRoaXMuYWN0aXZlU291bmRzLnZhbHVlLFxuICAgICAgc2NyZWVuU2hhcmVJRFN0cmVhbTogdGhpcy5zY3JlZW5TaGFyZUlEU3RyZWFtLnZhbHVlLFxuICAgICAgc2NyZWVuU2hhcmVOYW1lU3RyZWFtOiB0aGlzLnNjcmVlblNoYXJlTmFtZVN0cmVhbS52YWx1ZSxcbiAgICAgIGFkbWluSURTdHJlYW06IHRoaXMuYWRtaW5JRFN0cmVhbS52YWx1ZSxcbiAgICAgIGFkbWluTmFtZVN0cmVhbTogdGhpcy5hZG1pbk5hbWVTdHJlYW0udmFsdWUsXG4gICAgICB5b3VZb3VTdHJlYW06IHRoaXMueW91WW91U3RyZWFtLnZhbHVlLFxuICAgICAgeW91WW91U3RyZWFtSURzOiB0aGlzLnlvdVlvdVN0cmVhbUlEcy52YWx1ZSxcbiAgICAgIGxvY2FsU3RyZWFtOiB0aGlzLmxvY2FsU3RyZWFtLnZhbHVlLFxuICAgICAgcmVjb3JkU3RhcnRlZDogdGhpcy5yZWNvcmRTdGFydGVkLnZhbHVlLFxuICAgICAgcmVjb3JkUmVzdW1lZDogdGhpcy5yZWNvcmRSZXN1bWVkLnZhbHVlLFxuICAgICAgcmVjb3JkUGF1c2VkOiB0aGlzLnJlY29yZFBhdXNlZC52YWx1ZSxcbiAgICAgIHJlY29yZFN0b3BwZWQ6IHRoaXMucmVjb3JkU3RvcHBlZC52YWx1ZSxcbiAgICAgIGFkbWluUmVzdHJpY3RTZXR0aW5nOiB0aGlzLmFkbWluUmVzdHJpY3RTZXR0aW5nLnZhbHVlLFxuICAgICAgdmlkZW9SZXF1ZXN0U3RhdGU6IHRoaXMudmlkZW9SZXF1ZXN0U3RhdGUudmFsdWUsXG4gICAgICB2aWRlb1JlcXVlc3RUaW1lOiB0aGlzLnZpZGVvUmVxdWVzdFRpbWUudmFsdWUsXG4gICAgICB2aWRlb0FjdGlvbjogdGhpcy52aWRlb0FjdGlvbi52YWx1ZSxcbiAgICAgIGxvY2FsU3RyZWFtVmlkZW86IHRoaXMubG9jYWxTdHJlYW1WaWRlby52YWx1ZSxcbiAgICAgIHVzZXJEZWZhdWx0VmlkZW9JbnB1dERldmljZTogdGhpcy51c2VyRGVmYXVsdFZpZGVvSW5wdXREZXZpY2UudmFsdWUsXG4gICAgICBjdXJyZW50RmFjaW5nTW9kZTogdGhpcy5jdXJyZW50RmFjaW5nTW9kZS52YWx1ZSxcbiAgICAgIHByZXZGYWNpbmdNb2RlOiB0aGlzLnByZXZGYWNpbmdNb2RlLnZhbHVlLFxuICAgICAgZGVmVmlkZW9JRDogdGhpcy5kZWZWaWRlb0lELnZhbHVlLFxuICAgICAgYWxsb3dlZDogdGhpcy5hbGxvd2VkLnZhbHVlLFxuICAgICAgZGlzcEFjdGl2ZU5hbWVzOiB0aGlzLmRpc3BBY3RpdmVOYW1lcy52YWx1ZSxcbiAgICAgIHBfZGlzcEFjdGl2ZU5hbWVzOiB0aGlzLnBfZGlzcEFjdGl2ZU5hbWVzLnZhbHVlLFxuICAgICAgYWN0aXZlTmFtZXM6IHRoaXMuYWN0aXZlTmFtZXMudmFsdWUsXG4gICAgICBwcmV2QWN0aXZlTmFtZXM6IHRoaXMucHJldkFjdGl2ZU5hbWVzLnZhbHVlLFxuICAgICAgcF9hY3RpdmVOYW1lczogdGhpcy5wX2FjdGl2ZU5hbWVzLnZhbHVlLFxuICAgICAgbWVtYmVyc1JlY2VpdmVkOiB0aGlzLm1lbWJlcnNSZWNlaXZlZC52YWx1ZSxcbiAgICAgIGRlZmVyU2NyZWVuUmVjZWl2ZWQ6IHRoaXMuZGVmZXJTY3JlZW5SZWNlaXZlZC52YWx1ZSxcbiAgICAgIGhvc3RGaXJzdFN3aXRjaDogdGhpcy5ob3N0Rmlyc3RTd2l0Y2gudmFsdWUsXG4gICAgICBtaWNBY3Rpb246IHRoaXMubWljQWN0aW9uLnZhbHVlLFxuICAgICAgc2NyZWVuQWN0aW9uOiB0aGlzLnNjcmVlbkFjdGlvbi52YWx1ZSxcbiAgICAgIGNoYXRBY3Rpb246IHRoaXMuY2hhdEFjdGlvbi52YWx1ZSxcbiAgICAgIGF1ZGlvUmVxdWVzdFN0YXRlOiB0aGlzLmF1ZGlvUmVxdWVzdFN0YXRlLnZhbHVlLFxuICAgICAgc2NyZWVuUmVxdWVzdFN0YXRlOiB0aGlzLnNjcmVlblJlcXVlc3RTdGF0ZS52YWx1ZSxcbiAgICAgIGNoYXRSZXF1ZXN0U3RhdGU6IHRoaXMuY2hhdFJlcXVlc3RTdGF0ZS52YWx1ZSxcbiAgICAgIGF1ZGlvUmVxdWVzdFRpbWU6IHRoaXMuYXVkaW9SZXF1ZXN0VGltZS52YWx1ZSxcbiAgICAgIHNjcmVlblJlcXVlc3RUaW1lOiB0aGlzLnNjcmVlblJlcXVlc3RUaW1lLnZhbHVlLFxuICAgICAgY2hhdFJlcXVlc3RUaW1lOiB0aGlzLmNoYXRSZXF1ZXN0VGltZS52YWx1ZSxcbiAgICAgIHVwZGF0ZVJlcXVlc3RJbnRlcnZhbFNlY29uZHM6IHRoaXMudXBkYXRlUmVxdWVzdEludGVydmFsU2Vjb25kcy52YWx1ZSxcbiAgICAgIG9sZFNvdW5kSWRzOiB0aGlzLm9sZFNvdW5kSWRzLnZhbHVlLFxuICAgICAgaG9zdExhYmVsOiB0aGlzLmhvc3RMYWJlbC52YWx1ZSxcbiAgICAgIG1haW5TY3JlZW5GaWxsZWQ6IHRoaXMubWFpblNjcmVlbkZpbGxlZC52YWx1ZSxcbiAgICAgIGxvY2FsU3RyZWFtU2NyZWVuOiB0aGlzLmxvY2FsU3RyZWFtU2NyZWVuLnZhbHVlLFxuICAgICAgc2NyZWVuQWxyZWFkeU9uOiB0aGlzLnNjcmVlbkFscmVhZHlPbi52YWx1ZSxcbiAgICAgIGNoYXRBbHJlYWR5T246IHRoaXMuY2hhdEFscmVhZHlPbi52YWx1ZSxcbiAgICAgIHJlZGlyZWN0VVJMOiB0aGlzLnJlZGlyZWN0VVJMLnZhbHVlLFxuICAgICAgb2xkQWxsU3RyZWFtczogdGhpcy5vbGRBbGxTdHJlYW1zLnZhbHVlLFxuICAgICAgYWRtaW5WaWRJRDogdGhpcy5hZG1pblZpZElELnZhbHVlLFxuICAgICAgc3RyZWFtTmFtZXM6IHRoaXMuc3RyZWFtTmFtZXMudmFsdWUsXG4gICAgICBub25fYWxWaWRlb1N0cmVhbXM6IHRoaXMubm9uX2FsVmlkZW9TdHJlYW1zLnZhbHVlLFxuICAgICAgc29ydEF1ZGlvTG91ZG5lc3M6IHRoaXMuc29ydEF1ZGlvTG91ZG5lc3MudmFsdWUsXG4gICAgICBhdWRpb0RlY2liZWxzOiB0aGlzLmF1ZGlvRGVjaWJlbHMudmFsdWUsXG4gICAgICBtaXhlZF9hbFZpZGVvU3RyZWFtczogdGhpcy5taXhlZF9hbFZpZGVvU3RyZWFtcy52YWx1ZSxcbiAgICAgIG5vbl9hbFZpZGVvU3RyZWFtc19tdXRlZDogdGhpcy5ub25fYWxWaWRlb1N0cmVhbXNfbXV0ZWQudmFsdWUsXG4gICAgICBwYWdpbmF0ZWRTdHJlYW1zOiB0aGlzLnBhZ2luYXRlZFN0cmVhbXMudmFsdWUsXG4gICAgICBsb2NhbFN0cmVhbUF1ZGlvOiB0aGlzLmxvY2FsU3RyZWFtQXVkaW8udmFsdWUsXG4gICAgICBkZWZBdWRpb0lEOiB0aGlzLmRlZkF1ZGlvSUQudmFsdWUsXG4gICAgICB1c2VyRGVmYXVsdEF1ZGlvSW5wdXREZXZpY2U6IHRoaXMudXNlckRlZmF1bHRBdWRpb0lucHV0RGV2aWNlLnZhbHVlLFxuICAgICAgdXNlckRlZmF1bHRBdWRpb091dHB1dERldmljZTogdGhpcy51c2VyRGVmYXVsdEF1ZGlvT3V0cHV0RGV2aWNlLnZhbHVlLFxuICAgICAgcHJldkF1ZGlvSW5wdXREZXZpY2U6IHRoaXMucHJldkF1ZGlvSW5wdXREZXZpY2UudmFsdWUsXG4gICAgICBwcmV2VmlkZW9JbnB1dERldmljZTogdGhpcy5wcmV2VmlkZW9JbnB1dERldmljZS52YWx1ZSxcbiAgICAgIGF1ZGlvUGF1c2VkOiB0aGlzLmF1ZGlvUGF1c2VkLnZhbHVlLFxuICAgICAgbWFpblNjcmVlblBlcnNvbjogdGhpcy5tYWluU2NyZWVuUGVyc29uLnZhbHVlLFxuICAgICAgYWRtaW5Pbk1haW5TY3JlZW46IHRoaXMuYWRtaW5Pbk1haW5TY3JlZW4udmFsdWUsXG4gICAgICBzY3JlZW5TdGF0ZXM6IHRoaXMuc2NyZWVuU3RhdGVzLnZhbHVlLFxuICAgICAgcHJldlNjcmVlblN0YXRlczogdGhpcy5wcmV2U2NyZWVuU3RhdGVzLnZhbHVlLFxuICAgICAgdXBkYXRlRGF0ZVN0YXRlOiB0aGlzLnVwZGF0ZURhdGVTdGF0ZS52YWx1ZSxcbiAgICAgIGxhc3RVcGRhdGU6IHRoaXMubGFzdFVwZGF0ZS52YWx1ZSxcbiAgICAgIG5Gb3JSZWFkanVzdFJlY29yZDogdGhpcy5uRm9yUmVhZGp1c3RSZWNvcmQudmFsdWUsXG4gICAgICBmaXhlZFBhZ2VMaW1pdDogdGhpcy5maXhlZFBhZ2VMaW1pdC52YWx1ZSxcbiAgICAgIHJlbW92ZUFsdEdyaWQ6IHRoaXMucmVtb3ZlQWx0R3JpZC52YWx1ZSxcbiAgICAgIG5Gb3JSZWFkanVzdDogdGhpcy5uRm9yUmVhZGp1c3QudmFsdWUsXG4gICAgICBsYXN0UmVvcmRlclRpbWU6IHRoaXMubGFzdFJlb3JkZXJUaW1lLnZhbHVlLFxuICAgICAgcmVvcmRlckludGVydmFsOiB0aGlzLnJlb3JkZXJJbnRlcnZhbC52YWx1ZSxcbiAgICAgIGZhc3RSZW9yZGVySW50ZXJ2YWw6IHRoaXMuZmFzdFJlb3JkZXJJbnRlcnZhbC52YWx1ZSxcbiAgICAgIGF1ZFN0cmVhbU5hbWVzOiB0aGlzLmF1ZFN0cmVhbU5hbWVzLnZhbHVlLFxuICAgICAgY3VycmVudFVzZXJQYWdlOiB0aGlzLmN1cnJlbnRVc2VyUGFnZS52YWx1ZSxcbiAgICAgIG1haW5IZWlnaHRXaWR0aDogdGhpcy5tYWluSGVpZ2h0V2lkdGgudmFsdWUsXG4gICAgICBwcmV2TWFpbkhlaWdodFdpZHRoOiB0aGlzLnByZXZNYWluSGVpZ2h0V2lkdGgudmFsdWUsXG4gICAgICBwcmV2RG9QYWdpbmF0ZTogdGhpcy5wcmV2RG9QYWdpbmF0ZS52YWx1ZSxcbiAgICAgIGRvUGFnaW5hdGU6IHRoaXMuZG9QYWdpbmF0ZS52YWx1ZSxcbiAgICAgIHNoYXJlRW5kZWQ6IHRoaXMuc2hhcmVFbmRlZC52YWx1ZSxcbiAgICAgIGxTdHJlYW1zOiB0aGlzLmxTdHJlYW1zLnZhbHVlLFxuICAgICAgY2hhdFJlZlN0cmVhbXM6IHRoaXMuY2hhdFJlZlN0cmVhbXMudmFsdWUsXG4gICAgICBjb250cm9sSGVpZ2h0OiB0aGlzLmNvbnRyb2xIZWlnaHQudmFsdWUsXG4gICAgICBpc1dpZGVTY3JlZW46IHRoaXMuaXNXaWRlU2NyZWVuLnZhbHVlLFxuICAgICAgaXNNZWRpdW1TY3JlZW46IHRoaXMuaXNNZWRpdW1TY3JlZW4udmFsdWUsXG4gICAgICBpc1NtYWxsU2NyZWVuOiB0aGlzLmlzU21hbGxTY3JlZW4udmFsdWUsXG4gICAgICBhZGRHcmlkOiB0aGlzLmFkZEdyaWQudmFsdWUsXG4gICAgICBhZGRBbHRHcmlkOiB0aGlzLmFkZEFsdEdyaWQudmFsdWUsXG4gICAgICBncmlkUm93czogdGhpcy5ncmlkUm93cy52YWx1ZSxcbiAgICAgIGdyaWRDb2xzOiB0aGlzLmdyaWRDb2xzLnZhbHVlLFxuICAgICAgYWx0R3JpZFJvd3M6IHRoaXMuYWx0R3JpZFJvd3MudmFsdWUsXG4gICAgICBhbHRHcmlkQ29sczogdGhpcy5hbHRHcmlkQ29scy52YWx1ZSxcbiAgICAgIG51bWJlclBhZ2VzOiB0aGlzLm51bWJlclBhZ2VzLnZhbHVlLFxuICAgICAgY3VycmVudFN0cmVhbXM6IHRoaXMuY3VycmVudFN0cmVhbXMudmFsdWUsXG4gICAgICBzaG93TWluaVZpZXc6IHRoaXMuc2hvd01pbmlWaWV3LnZhbHVlLFxuICAgICAgblN0cmVhbTogdGhpcy5uU3RyZWFtLnZhbHVlLFxuICAgICAgZGVmZXJfcmVjZWl2ZTogdGhpcy5kZWZlcl9yZWNlaXZlLnZhbHVlLFxuICAgICAgYWxsQXVkaW9TdHJlYW1zOiB0aGlzLmFsbEF1ZGlvU3RyZWFtcy52YWx1ZSxcbiAgICAgIHNjcmVlblByb2R1Y2VyOiB0aGlzLnNjcmVlblByb2R1Y2VyLnZhbHVlLFxuICAgICAgcmVtb3RlU2NyZWVuU3RyZWFtOiB0aGlzLnJlbW90ZVNjcmVlblN0cmVhbS52YWx1ZSxcbiAgICAgIGdvdEFsbFZpZHM6IHRoaXMuZ290QWxsVmlkcy52YWx1ZSxcbiAgICAgIHBhZ2luYXRpb25IZWlnaHRXaWR0aDogdGhpcy5wYWdpbmF0aW9uSGVpZ2h0V2lkdGgudmFsdWUsXG4gICAgICBwYWdpbmF0aW9uRGlyZWN0aW9uOiB0aGlzLnBhZ2luYXRpb25EaXJlY3Rpb24udmFsdWUsXG4gICAgICBncmlkU2l6ZXM6IHRoaXMuZ3JpZFNpemVzLnZhbHVlLFxuICAgICAgc2NyZWVuRm9yY2VGdWxsRGlzcGxheTogdGhpcy5zY3JlZW5Gb3JjZUZ1bGxEaXNwbGF5LnZhbHVlLFxuICAgICAgbWFpbkdyaWRTdHJlYW06IHRoaXMubWFpbkdyaWRTdHJlYW0udmFsdWUsXG4gICAgICBvdGhlckdyaWRTdHJlYW1zOiB0aGlzLm90aGVyR3JpZFN0cmVhbXMudmFsdWUsXG4gICAgICBhdWRpb09ubHlTdHJlYW1zOiB0aGlzLmF1ZGlvT25seVN0cmVhbXMudmFsdWUsXG4gICAgICB2aWRlb0lucHV0czogdGhpcy52aWRlb0lucHV0cy52YWx1ZSxcbiAgICAgIGF1ZGlvSW5wdXRzOiB0aGlzLmF1ZGlvSW5wdXRzLnZhbHVlLFxuICAgICAgbWVldGluZ1Byb2dyZXNzVGltZTogdGhpcy5tZWV0aW5nUHJvZ3Jlc3NUaW1lLnZhbHVlLFxuICAgICAgbWVldGluZ0VsYXBzZWRUaW1lOiB0aGlzLm1lZXRpbmdFbGFwc2VkVGltZS52YWx1ZSxcblxuICAgICAgcmVmX3BhcnRpY2lwYW50czogdGhpcy5yZWZfcGFydGljaXBhbnRzLnZhbHVlLFxuXG4gICAgICBtZXNzYWdlczogdGhpcy5tZXNzYWdlcy52YWx1ZSxcbiAgICAgIHN0YXJ0RGlyZWN0TWVzc2FnZTogdGhpcy5zdGFydERpcmVjdE1lc3NhZ2UudmFsdWUsXG4gICAgICBkaXJlY3RNZXNzYWdlRGV0YWlsczogdGhpcy5kaXJlY3RNZXNzYWdlRGV0YWlscy52YWx1ZSxcbiAgICAgIGNvSG9zdDogdGhpcy5jb0hvc3QudmFsdWUsXG4gICAgICBjb0hvc3RSZXNwb25zaWJpbGl0eTogdGhpcy5jb0hvc3RSZXNwb25zaWJpbGl0eS52YWx1ZSxcblxuICAgICAgLy8gRXZlbnQgc2V0dGluZ3NcbiAgICAgIGF1ZGlvU2V0dGluZzogdGhpcy5hdWRpb1NldHRpbmcudmFsdWUsXG4gICAgICB2aWRlb1NldHRpbmc6IHRoaXMudmlkZW9TZXR0aW5nLnZhbHVlLFxuICAgICAgc2NyZWVuc2hhcmVTZXR0aW5nOiB0aGlzLnNjcmVlbnNoYXJlU2V0dGluZy52YWx1ZSxcbiAgICAgIGNoYXRTZXR0aW5nOiB0aGlzLmNoYXRTZXR0aW5nLnZhbHVlLFxuXG4gICAgICAvLyBEaXNwbGF5IHNldHRpbmdzXG4gICAgICBhdXRvV2F2ZTogdGhpcy5hdXRvV2F2ZS52YWx1ZSxcbiAgICAgIGZvcmNlRnVsbERpc3BsYXk6IHRoaXMuZm9yY2VGdWxsRGlzcGxheS52YWx1ZSxcbiAgICAgIHByZXZGb3JjZUZ1bGxEaXNwbGF5OiB0aGlzLnByZXZGb3JjZUZ1bGxEaXNwbGF5LnZhbHVlLFxuICAgICAgcHJldk1lZXRpbmdEaXNwbGF5VHlwZTogdGhpcy5wcmV2TWVldGluZ0Rpc3BsYXlUeXBlLnZhbHVlLFxuXG4gICAgICAvLyBXYWl0aW5nIHJvb21cbiAgICAgIHdhaXRpbmdSb29tRmlsdGVyOiB0aGlzLndhaXRpbmdSb29tRmlsdGVyLnZhbHVlLFxuICAgICAgd2FpdGluZ1Jvb21MaXN0OiB0aGlzLndhaXRpbmdSb29tTGlzdC52YWx1ZSxcbiAgICAgIHdhaXRpbmdSb29tQ291bnRlcjogdGhpcy53YWl0aW5nUm9vbUNvdW50ZXIudmFsdWUsXG4gICAgICBmaWx0ZXJlZFdhaXRpbmdSb29tTGlzdDogdGhpcy5maWx0ZXJlZFdhaXRpbmdSb29tTGlzdC52YWx1ZSxcblxuICAgICAgLy8gUmVxdWVzdHNcbiAgICAgIHJlcXVlc3RGaWx0ZXI6IHRoaXMucmVxdWVzdEZpbHRlci52YWx1ZSxcbiAgICAgIHJlcXVlc3RMaXN0OiB0aGlzLnJlcXVlc3RMaXN0LnZhbHVlLFxuICAgICAgcmVxdWVzdENvdW50ZXI6IHRoaXMucmVxdWVzdENvdW50ZXIudmFsdWUsXG4gICAgICBmaWx0ZXJlZFJlcXVlc3RMaXN0OiB0aGlzLmZpbHRlcmVkUmVxdWVzdExpc3QudmFsdWUsXG5cbiAgICAgIC8vIFRvdGFsIHJlcXVlc3RzIGFuZCB3YWl0aW5nIHJvb21cbiAgICAgIHRvdGFsUmVxV2FpdDogdGhpcy50b3RhbFJlcVdhaXQudmFsdWUsXG5cbiAgICAgIC8vIEFsZXJ0c1xuICAgICAgYWxlcnRWaXNpYmxlOiB0aGlzLmFsZXJ0VmlzaWJsZS52YWx1ZSxcbiAgICAgIGFsZXJ0TWVzc2FnZTogdGhpcy5hbGVydE1lc3NhZ2UudmFsdWUsXG4gICAgICBhbGVydFR5cGU6IHRoaXMuYWxlcnRUeXBlLnZhbHVlLFxuICAgICAgYWxlcnREdXJhdGlvbjogdGhpcy5hbGVydER1cmF0aW9uLnZhbHVlLFxuXG4gICAgICAvLyBQcm9ncmVzcyBUaW1lclxuICAgICAgcHJvZ3Jlc3NUaW1lclZpc2libGU6IHRoaXMucHJvZ3Jlc3NUaW1lclZpc2libGUudmFsdWUsXG4gICAgICBwcm9ncmVzc1RpbWVyVmFsdWU6IHRoaXMucHJvZ3Jlc3NUaW1lclZhbHVlLnZhbHVlLFxuXG4gICAgICAvLyBNZW51IG1vZGFsc1xuICAgICAgaXNNZW51TW9kYWxWaXNpYmxlOiB0aGlzLmlzTWVudU1vZGFsVmlzaWJsZS52YWx1ZSxcbiAgICAgIGlzUmVjb3JkaW5nTW9kYWxWaXNpYmxlOiB0aGlzLmlzUmVjb3JkaW5nTW9kYWxWaXNpYmxlLnZhbHVlLFxuICAgICAgaXNTZXR0aW5nc01vZGFsVmlzaWJsZTogdGhpcy5pc1NldHRpbmdzTW9kYWxWaXNpYmxlLnZhbHVlLFxuICAgICAgaXNSZXF1ZXN0c01vZGFsVmlzaWJsZTogdGhpcy5pc1JlcXVlc3RzTW9kYWxWaXNpYmxlLnZhbHVlLFxuICAgICAgaXNXYWl0aW5nTW9kYWxWaXNpYmxlOiB0aGlzLmlzV2FpdGluZ01vZGFsVmlzaWJsZS52YWx1ZSxcbiAgICAgIGlzQ29Ib3N0TW9kYWxWaXNpYmxlOiB0aGlzLmlzQ29Ib3N0TW9kYWxWaXNpYmxlLnZhbHVlLFxuICAgICAgaXNNZWRpYVNldHRpbmdzTW9kYWxWaXNpYmxlOiB0aGlzLmlzTWVkaWFTZXR0aW5nc01vZGFsVmlzaWJsZS52YWx1ZSxcbiAgICAgIGlzRGlzcGxheVNldHRpbmdzTW9kYWxWaXNpYmxlOiB0aGlzLmlzRGlzcGxheVNldHRpbmdzTW9kYWxWaXNpYmxlLnZhbHVlLFxuXG4gICAgICAvLyBPdGhlciBNb2RhbHNcbiAgICAgIGlzUGFydGljaXBhbnRzTW9kYWxWaXNpYmxlOiB0aGlzLmlzUGFydGljaXBhbnRzTW9kYWxWaXNpYmxlLnZhbHVlLFxuICAgICAgaXNNZXNzYWdlc01vZGFsVmlzaWJsZTogdGhpcy5pc01lc3NhZ2VzTW9kYWxWaXNpYmxlLnZhbHVlLFxuICAgICAgaXNDb25maXJtRXhpdE1vZGFsVmlzaWJsZTogdGhpcy5pc0NvbmZpcm1FeGl0TW9kYWxWaXNpYmxlLnZhbHVlLFxuICAgICAgaXNDb25maXJtSGVyZU1vZGFsVmlzaWJsZTogdGhpcy5pc0NvbmZpcm1IZXJlTW9kYWxWaXNpYmxlLnZhbHVlLFxuICAgICAgaXNMb2FkaW5nTW9kYWxWaXNpYmxlOiB0aGlzLmlzTG9hZGluZ01vZGFsVmlzaWJsZS52YWx1ZSxcblxuICAgICAgLy8gUmVjb3JkaW5nIE9wdGlvbnNcbiAgICAgIHJlY29yZGluZ01lZGlhT3B0aW9uczogdGhpcy5yZWNvcmRpbmdNZWRpYU9wdGlvbnMudmFsdWUsXG4gICAgICByZWNvcmRpbmdBdWRpb09wdGlvbnM6IHRoaXMucmVjb3JkaW5nQXVkaW9PcHRpb25zLnZhbHVlLFxuICAgICAgcmVjb3JkaW5nVmlkZW9PcHRpb25zOiB0aGlzLnJlY29yZGluZ1ZpZGVvT3B0aW9ucy52YWx1ZSxcbiAgICAgIHJlY29yZGluZ1ZpZGVvVHlwZTogdGhpcy5yZWNvcmRpbmdWaWRlb1R5cGUudmFsdWUsXG4gICAgICByZWNvcmRpbmdWaWRlb09wdGltaXplZDogdGhpcy5yZWNvcmRpbmdWaWRlb09wdGltaXplZC52YWx1ZSxcbiAgICAgIHJlY29yZGluZ0Rpc3BsYXlUeXBlOiB0aGlzLnJlY29yZGluZ0Rpc3BsYXlUeXBlLnZhbHVlLFxuICAgICAgcmVjb3JkaW5nQWRkSExTOiB0aGlzLnJlY29yZGluZ0FkZEhMUy52YWx1ZSxcbiAgICAgIHJlY29yZGluZ0FkZFRleHQ6IHRoaXMucmVjb3JkaW5nQWRkVGV4dC52YWx1ZSxcbiAgICAgIHJlY29yZGluZ0N1c3RvbVRleHQ6IHRoaXMucmVjb3JkaW5nQ3VzdG9tVGV4dC52YWx1ZSxcbiAgICAgIHJlY29yZGluZ0N1c3RvbVRleHRQb3NpdGlvbjogdGhpcy5yZWNvcmRpbmdDdXN0b21UZXh0UG9zaXRpb24udmFsdWUsXG4gICAgICByZWNvcmRpbmdDdXN0b21UZXh0Q29sb3I6IHRoaXMucmVjb3JkaW5nQ3VzdG9tVGV4dENvbG9yLnZhbHVlLFxuICAgICAgcmVjb3JkaW5nTmFtZVRhZ3M6IHRoaXMucmVjb3JkaW5nTmFtZVRhZ3MudmFsdWUsXG4gICAgICByZWNvcmRpbmdCYWNrZ3JvdW5kQ29sb3I6IHRoaXMucmVjb3JkaW5nQmFja2dyb3VuZENvbG9yLnZhbHVlLFxuICAgICAgcmVjb3JkaW5nTmFtZVRhZ3NDb2xvcjogdGhpcy5yZWNvcmRpbmdOYW1lVGFnc0NvbG9yLnZhbHVlLFxuICAgICAgcmVjb3JkaW5nT3JpZW50YXRpb25WaWRlbzogdGhpcy5yZWNvcmRpbmdPcmllbnRhdGlvblZpZGVvLnZhbHVlLFxuICAgICAgY2xlYXJlZFRvUmVzdW1lOiB0aGlzLmNsZWFyZWRUb1Jlc3VtZS52YWx1ZSxcbiAgICAgIGNsZWFyZWRUb1JlY29yZDogdGhpcy5jbGVhcmVkVG9SZWNvcmQudmFsdWUsXG4gICAgICByZWNvcmRTdGF0ZTogdGhpcy5yZWNvcmRTdGF0ZS52YWx1ZSxcbiAgICAgIHNob3dSZWNvcmRCdXR0b25zOiB0aGlzLnNob3dSZWNvcmRCdXR0b25zLnZhbHVlLFxuICAgICAgcmVjb3JkaW5nUHJvZ3Jlc3NUaW1lOiB0aGlzLnJlY29yZGluZ1Byb2dyZXNzVGltZS52YWx1ZSxcbiAgICAgIGF1ZGlvU3dpdGNoaW5nOiB0aGlzLmF1ZGlvU3dpdGNoaW5nLnZhbHVlLFxuICAgICAgdmlkZW9Td2l0Y2hpbmc6IHRoaXMudmlkZW9Td2l0Y2hpbmcudmFsdWUsXG5cbiAgICAgIC8vIE1lZGlhIHN0YXRlc1xuICAgICAgdmlkZW9BbHJlYWR5T246IHRoaXMudmlkZW9BbHJlYWR5T24udmFsdWUsXG4gICAgICBhdWRpb0FscmVhZHlPbjogdGhpcy5hdWRpb0FscmVhZHlPbi52YWx1ZSxcbiAgICAgIGNvbXBvbmVudFNpemVzOiB0aGlzLmNvbXBvbmVudFNpemVzLnZhbHVlLFxuXG4gICAgICAvLyBQZXJtaXNzaW9uc1xuICAgICAgaGFzQ2FtZXJhUGVybWlzc2lvbjogdGhpcy5oYXNDYW1lcmFQZXJtaXNzaW9uLnZhbHVlLFxuICAgICAgaGFzQXVkaW9QZXJtaXNzaW9uOiB0aGlzLmhhc0F1ZGlvUGVybWlzc2lvbi52YWx1ZSxcblxuICAgICAgLy8gVHJhbnNwb3J0c1xuICAgICAgdHJhbnNwb3J0Q3JlYXRlZDogdGhpcy50cmFuc3BvcnRDcmVhdGVkLnZhbHVlLFxuICAgICAgdHJhbnNwb3J0Q3JlYXRlZFZpZGVvOiB0aGlzLnRyYW5zcG9ydENyZWF0ZWRWaWRlby52YWx1ZSxcbiAgICAgIHRyYW5zcG9ydENyZWF0ZWRBdWRpbzogdGhpcy50cmFuc3BvcnRDcmVhdGVkQXVkaW8udmFsdWUsXG4gICAgICB0cmFuc3BvcnRDcmVhdGVkU2NyZWVuOiB0aGlzLnRyYW5zcG9ydENyZWF0ZWRTY3JlZW4udmFsdWUsXG4gICAgICBwcm9kdWNlclRyYW5zcG9ydDogdGhpcy5wcm9kdWNlclRyYW5zcG9ydC52YWx1ZSxcbiAgICAgIHZpZGVvUHJvZHVjZXI6IHRoaXMudmlkZW9Qcm9kdWNlci52YWx1ZSxcbiAgICAgIHBhcmFtczogdGhpcy5wYXJhbXMudmFsdWUsXG4gICAgICB2aWRlb1BhcmFtczogdGhpcy52aWRlb1BhcmFtcy52YWx1ZSxcbiAgICAgIGF1ZGlvUGFyYW1zOiB0aGlzLmF1ZGlvUGFyYW1zLnZhbHVlLFxuICAgICAgYXVkaW9Qcm9kdWNlcjogdGhpcy5hdWRpb1Byb2R1Y2VyLnZhbHVlLFxuICAgICAgY29uc3VtZXJUcmFuc3BvcnRzOiB0aGlzLmNvbnN1bWVyVHJhbnNwb3J0cy52YWx1ZSxcbiAgICAgIGNvbnN1bWluZ1RyYW5zcG9ydHM6IHRoaXMuY29uc3VtaW5nVHJhbnNwb3J0cy52YWx1ZSxcblxuICAgICAgLy8gUG9sbHNcbiAgICAgIHBvbGxzOiB0aGlzLnBvbGxzLnZhbHVlLFxuICAgICAgcG9sbDogdGhpcy5wb2xsLnZhbHVlLFxuICAgICAgaXNQb2xsTW9kYWxWaXNpYmxlOiB0aGlzLmlzUG9sbE1vZGFsVmlzaWJsZS52YWx1ZSxcblxuICAgICAgLy8gQmFja2dyb3VuZFxuICAgICAgY3VzdG9tSW1hZ2U6IHRoaXMuY3VzdG9tSW1hZ2UudmFsdWUsXG4gICAgICBzZWxlY3RlZEltYWdlOiB0aGlzLnNlbGVjdGVkSW1hZ2UudmFsdWUsXG4gICAgICBzZWdtZW50VmlkZW86IHRoaXMuc2VnbWVudFZpZGVvLnZhbHVlLFxuICAgICAgc2VsZmllU2VnbWVudGF0aW9uOiB0aGlzLnNlbGZpZVNlZ21lbnRhdGlvbi52YWx1ZSxcbiAgICAgIHBhdXNlU2VnbWVudGF0aW9uOiB0aGlzLnBhdXNlU2VnbWVudGF0aW9uLnZhbHVlLFxuICAgICAgcHJvY2Vzc2VkU3RyZWFtOiB0aGlzLnByb2Nlc3NlZFN0cmVhbS52YWx1ZSxcbiAgICAgIGtlZXBCYWNrZ3JvdW5kOiB0aGlzLmtlZXBCYWNrZ3JvdW5kLnZhbHVlLFxuICAgICAgYmFja2dyb3VuZEhhc0NoYW5nZWQ6IHRoaXMuYmFja2dyb3VuZEhhc0NoYW5nZWQudmFsdWUsXG4gICAgICB2aXJ0dWFsU3RyZWFtOiB0aGlzLnZpcnR1YWxTdHJlYW0udmFsdWUsXG4gICAgICBtYWluQ2FudmFzOiB0aGlzLm1haW5DYW52YXMudmFsdWUsXG4gICAgICBwcmV2S2VlcEJhY2tncm91bmQ6IHRoaXMucHJldktlZXBCYWNrZ3JvdW5kLnZhbHVlLFxuICAgICAgYXBwbGllZEJhY2tncm91bmQ6IHRoaXMuYXBwbGllZEJhY2tncm91bmQudmFsdWUsXG4gICAgICBpc0JhY2tncm91bmRNb2RhbFZpc2libGU6IHRoaXMuaXNCYWNrZ3JvdW5kTW9kYWxWaXNpYmxlLnZhbHVlLFxuICAgICAgYXV0b0NsaWNrQmFja2dyb3VuZDogdGhpcy5hdXRvQ2xpY2tCYWNrZ3JvdW5kLnZhbHVlLFxuXG4gICAgICAvLyBCcmVha291dCByb29tc1xuICAgICAgYnJlYWtvdXRSb29tczogdGhpcy5icmVha291dFJvb21zLnZhbHVlLFxuICAgICAgY3VycmVudFJvb21JbmRleDogdGhpcy5jdXJyZW50Um9vbUluZGV4LnZhbHVlLFxuICAgICAgY2FuU3RhcnRCcmVha291dDogdGhpcy5jYW5TdGFydEJyZWFrb3V0LnZhbHVlLFxuICAgICAgYnJlYWtPdXRSb29tU3RhcnRlZDogdGhpcy5icmVha091dFJvb21TdGFydGVkLnZhbHVlLFxuICAgICAgYnJlYWtPdXRSb29tRW5kZWQ6IHRoaXMuYnJlYWtPdXRSb29tRW5kZWQudmFsdWUsXG4gICAgICBob3N0TmV3Um9vbTogdGhpcy5ob3N0TmV3Um9vbS52YWx1ZSxcbiAgICAgIGxpbWl0ZWRCcmVha1Jvb206IHRoaXMubGltaXRlZEJyZWFrUm9vbS52YWx1ZSxcbiAgICAgIG1haW5Sb29tc0xlbmd0aDogdGhpcy5tYWluUm9vbXNMZW5ndGgudmFsdWUsXG4gICAgICBtZW1iZXJSb29tOiB0aGlzLm1lbWJlclJvb20udmFsdWUsXG4gICAgICBpc0JyZWFrb3V0Um9vbXNNb2RhbFZpc2libGU6IHRoaXMuaXNCcmVha291dFJvb21zTW9kYWxWaXNpYmxlLnZhbHVlLFxuXG4gICAgICAvLyBXaGl0ZWJvYXJkXG4gICAgICB3aGl0ZWJvYXJkVXNlcnM6IHRoaXMud2hpdGVib2FyZFVzZXJzLnZhbHVlLFxuICAgICAgY3VycmVudFdoaXRlYm9hcmRJbmRleDogdGhpcy5jdXJyZW50V2hpdGVib2FyZEluZGV4LnZhbHVlLFxuICAgICAgY2FuU3RhcnRXaGl0ZWJvYXJkOiB0aGlzLmNhblN0YXJ0V2hpdGVib2FyZC52YWx1ZSxcbiAgICAgIHdoaXRlYm9hcmRTdGFydGVkOiB0aGlzLndoaXRlYm9hcmRTdGFydGVkLnZhbHVlLFxuICAgICAgd2hpdGVib2FyZEVuZGVkOiB0aGlzLndoaXRlYm9hcmRFbmRlZC52YWx1ZSxcbiAgICAgIHdoaXRlYm9hcmRMaW1pdDogdGhpcy53aGl0ZWJvYXJkTGltaXQudmFsdWUsXG4gICAgICBpc1doaXRlYm9hcmRNb2RhbFZpc2libGU6IHRoaXMuaXNXaGl0ZWJvYXJkTW9kYWxWaXNpYmxlLnZhbHVlLFxuICAgICAgaXNDb25maWd1cmVXaGl0ZWJvYXJkTW9kYWxWaXNpYmxlOiB0aGlzLmlzQ29uZmlndXJlV2hpdGVib2FyZE1vZGFsVmlzaWJsZS52YWx1ZSxcbiAgICAgIHNoYXBlczogdGhpcy5zaGFwZXMudmFsdWUsXG4gICAgICB1c2VJbWFnZUJhY2tncm91bmQ6IHRoaXMudXNlSW1hZ2VCYWNrZ3JvdW5kLnZhbHVlLFxuICAgICAgcmVkb1N0YWNrOiB0aGlzLnJlZG9TdGFjay52YWx1ZSxcbiAgICAgIHVuZG9TdGFjazogdGhpcy51bmRvU3RhY2sudmFsdWUsXG4gICAgICBjYW52YXNTdHJlYW06IHRoaXMuY2FudmFzU3RyZWFtLnZhbHVlLFxuICAgICAgY2FudmFzV2hpdGVib2FyZDogdGhpcy5jYW52YXNXaGl0ZWJvYXJkLnZhbHVlLFxuXG4gICAgICAvLyBTY3JlZW5ib2FyZFxuICAgICAgY2FudmFzU2NyZWVuYm9hcmQ6IHRoaXMuY2FudmFzU2NyZWVuYm9hcmQudmFsdWUsXG4gICAgICBwcm9jZXNzZWRTY3JlZW5TdHJlYW06IHRoaXMucHJvY2Vzc2VkU2NyZWVuU3RyZWFtLnZhbHVlLFxuICAgICAgYW5ub3RhdGVTY3JlZW5TdHJlYW06IHRoaXMuYW5ub3RhdGVTY3JlZW5TdHJlYW0udmFsdWUsXG4gICAgICBtYWluU2NyZWVuQ2FudmFzOiB0aGlzLm1haW5TY3JlZW5DYW52YXMudmFsdWUsXG4gICAgICBpc1NjcmVlbmJvYXJkTW9kYWxWaXNpYmxlOiB0aGlzLmlzU2NyZWVuYm9hcmRNb2RhbFZpc2libGUudmFsdWUsXG5cbiAgICAgIHZhbGlkYXRlZDogdGhpcy52YWxpZGF0ZWQudmFsdWUsXG4gICAgICBkZXZpY2U6IHRoaXMuZGV2aWNlLnZhbHVlLFxuICAgICAgc29ja2V0OiB0aGlzLnNvY2tldC52YWx1ZSxcbiAgICAgIGNoZWNrTWVkaWFQZXJtaXNzaW9uOiBmYWxzZSxcbiAgICAgIG9uV2ViOiB0cnVlLFxuXG4gICAgICAvLyBVcGRhdGUgZnVuY3Rpb25zXG4gICAgICB1cGRhdGVSb29tTmFtZTogdGhpcy51cGRhdGVSb29tTmFtZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTWVtYmVyOiB0aGlzLnVwZGF0ZU1lbWJlci5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQWRtaW5QYXNzY29kZTogdGhpcy51cGRhdGVBZG1pblBhc3Njb2RlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVZb3VBcmVDb0hvc3Q6IHRoaXMudXBkYXRlWW91QXJlQ29Ib3N0LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVZb3VBcmVIb3N0OiB0aGlzLnVwZGF0ZVlvdUFyZUhvc3QuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUlzbGV2ZWw6IHRoaXMudXBkYXRlSXNsZXZlbC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQ29Ib3N0OiB0aGlzLnVwZGF0ZUNvSG9zdC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQ29Ib3N0UmVzcG9uc2liaWxpdHk6IHRoaXMudXBkYXRlQ29Ib3N0UmVzcG9uc2liaWxpdHkuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUNvbmZpcm1lZFRvUmVjb3JkOiB0aGlzLnVwZGF0ZUNvbmZpcm1lZFRvUmVjb3JkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVNZWV0aW5nRGlzcGxheVR5cGU6IHRoaXMudXBkYXRlTWVldGluZ0Rpc3BsYXlUeXBlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVNZWV0aW5nVmlkZW9PcHRpbWl6ZWQ6IHRoaXMudXBkYXRlTWVldGluZ1ZpZGVvT3B0aW1pemVkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVFdmVudFR5cGU6IHRoaXMudXBkYXRlRXZlbnRUeXBlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVQYXJ0aWNpcGFudHM6IHRoaXMudXBkYXRlUGFydGljaXBhbnRzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVQYXJ0aWNpcGFudHNDb3VudGVyOiB0aGlzLnVwZGF0ZVBhcnRpY2lwYW50c0NvdW50ZXIuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVBhcnRpY2lwYW50c0ZpbHRlcjogdGhpcy51cGRhdGVQYXJ0aWNpcGFudHNGaWx0ZXIuYmluZCh0aGlzKSxcblxuICAgICAgLy8gTW9yZSB1cGRhdGUgZnVuY3Rpb25zIGZvciBtZWRpYSBkZXRhaWxzXG4gICAgICB1cGRhdGVDb25zdW1lX3NvY2tldHM6IHRoaXMudXBkYXRlQ29uc3VtZV9zb2NrZXRzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSdHBDYXBhYmlsaXRpZXM6IHRoaXMudXBkYXRlUnRwQ2FwYWJpbGl0aWVzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSb29tUmVjdklQczogdGhpcy51cGRhdGVSb29tUmVjdklQcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTWVldGluZ1Jvb21QYXJhbXM6IHRoaXMudXBkYXRlTWVldGluZ1Jvb21QYXJhbXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUl0ZW1QYWdlTGltaXQ6IHRoaXMudXBkYXRlSXRlbVBhZ2VMaW1pdC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQXVkaW9Pbmx5Um9vbTogdGhpcy51cGRhdGVBdWRpb09ubHlSb29tLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVBZGRGb3JCYXNpYzogdGhpcy51cGRhdGVBZGRGb3JCYXNpYy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlU2NyZWVuUGFnZUxpbWl0OiB0aGlzLnVwZGF0ZVNjcmVlblBhZ2VMaW1pdC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlU2hhcmVTY3JlZW5TdGFydGVkOiB0aGlzLnVwZGF0ZVNoYXJlU2NyZWVuU3RhcnRlZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlU2hhcmVkOiB0aGlzLnVwZGF0ZVNoYXJlZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlVGFyZ2V0T3JpZW50YXRpb246IHRoaXMudXBkYXRlVGFyZ2V0T3JpZW50YXRpb24uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVRhcmdldFJlc29sdXRpb246IHRoaXMudXBkYXRlVGFyZ2V0UmVzb2x1dGlvbi5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlVGFyZ2V0UmVzb2x1dGlvbkhvc3Q6IHRoaXMudXBkYXRlVGFyZ2V0UmVzb2x1dGlvbkhvc3QuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVZpZENvbnM6IHRoaXMudXBkYXRlVmlkQ29ucy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlRnJhbWVSYXRlOiB0aGlzLnVwZGF0ZUZyYW1lUmF0ZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlSFBhcmFtczogdGhpcy51cGRhdGVIUGFyYW1zLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVWUGFyYW1zOiB0aGlzLnVwZGF0ZVZQYXJhbXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVNjcmVlblBhcmFtczogdGhpcy51cGRhdGVTY3JlZW5QYXJhbXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUFQYXJhbXM6IHRoaXMudXBkYXRlQVBhcmFtcy5iaW5kKHRoaXMpLFxuXG4gICAgICAvLyBNb3JlIHVwZGF0ZSBmdW5jdGlvbnMgZm9yIHJlY29yZGluZyBkZXRhaWxzXG4gICAgICB1cGRhdGVSZWNvcmRpbmdBdWRpb1BhdXNlc0xpbWl0OiB0aGlzLnVwZGF0ZVJlY29yZGluZ0F1ZGlvUGF1c2VzTGltaXQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ0F1ZGlvUGF1c2VzQ291bnQ6IHRoaXMudXBkYXRlUmVjb3JkaW5nQXVkaW9QYXVzZXNDb3VudC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nQXVkaW9TdXBwb3J0OiB0aGlzLnVwZGF0ZVJlY29yZGluZ0F1ZGlvU3VwcG9ydC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nQXVkaW9QZW9wbGVMaW1pdDogdGhpcy51cGRhdGVSZWNvcmRpbmdBdWRpb1Blb3BsZUxpbWl0LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRpbmdBdWRpb1BhcnRpY2lwYW50c1RpbWVMaW1pdDpcbiAgICAgICAgdGhpcy51cGRhdGVSZWNvcmRpbmdBdWRpb1BhcnRpY2lwYW50c1RpbWVMaW1pdC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nVmlkZW9QYXVzZXNDb3VudDogdGhpcy51cGRhdGVSZWNvcmRpbmdWaWRlb1BhdXNlc0NvdW50LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRpbmdWaWRlb1BhdXNlc0xpbWl0OiB0aGlzLnVwZGF0ZVJlY29yZGluZ1ZpZGVvUGF1c2VzTGltaXQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ1ZpZGVvU3VwcG9ydDogdGhpcy51cGRhdGVSZWNvcmRpbmdWaWRlb1N1cHBvcnQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ1ZpZGVvUGVvcGxlTGltaXQ6IHRoaXMudXBkYXRlUmVjb3JkaW5nVmlkZW9QZW9wbGVMaW1pdC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nVmlkZW9QYXJ0aWNpcGFudHNUaW1lTGltaXQ6XG4gICAgICAgIHRoaXMudXBkYXRlUmVjb3JkaW5nVmlkZW9QYXJ0aWNpcGFudHNUaW1lTGltaXQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ0FsbFBhcnRpY2lwYW50c1N1cHBvcnQ6IHRoaXMudXBkYXRlUmVjb3JkaW5nQWxsUGFydGljaXBhbnRzU3VwcG9ydC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nVmlkZW9QYXJ0aWNpcGFudHNTdXBwb3J0OlxuICAgICAgICB0aGlzLnVwZGF0ZVJlY29yZGluZ1ZpZGVvUGFydGljaXBhbnRzU3VwcG9ydC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nQWxsUGFydGljaXBhbnRzRnVsbFJvb21TdXBwb3J0OlxuICAgICAgICB0aGlzLnVwZGF0ZVJlY29yZGluZ0FsbFBhcnRpY2lwYW50c0Z1bGxSb29tU3VwcG9ydC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nVmlkZW9QYXJ0aWNpcGFudHNGdWxsUm9vbVN1cHBvcnQ6XG4gICAgICAgIHRoaXMudXBkYXRlUmVjb3JkaW5nVmlkZW9QYXJ0aWNpcGFudHNGdWxsUm9vbVN1cHBvcnQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ1ByZWZlcnJlZE9yaWVudGF0aW9uOiB0aGlzLnVwZGF0ZVJlY29yZGluZ1ByZWZlcnJlZE9yaWVudGF0aW9uLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRpbmdTdXBwb3J0Rm9yT3RoZXJPcmllbnRhdGlvbjpcbiAgICAgICAgdGhpcy51cGRhdGVSZWNvcmRpbmdTdXBwb3J0Rm9yT3RoZXJPcmllbnRhdGlvbi5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nTXVsdGlGb3JtYXRzU3VwcG9ydDogdGhpcy51cGRhdGVSZWNvcmRpbmdNdWx0aUZvcm1hdHNTdXBwb3J0LmJpbmQodGhpcyksXG5cbiAgICAgIHVwZGF0ZVVzZXJSZWNvcmRpbmdQYXJhbXM6IHRoaXMudXBkYXRlVXNlclJlY29yZGluZ1BhcmFtcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQ2FuUmVjb3JkOiB0aGlzLnVwZGF0ZUNhblJlY29yZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlU3RhcnRSZXBvcnQ6IHRoaXMudXBkYXRlU3RhcnRSZXBvcnQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUVuZFJlcG9ydDogdGhpcy51cGRhdGVFbmRSZXBvcnQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZFRpbWVySW50ZXJ2YWw6IHRoaXMudXBkYXRlUmVjb3JkVGltZXJJbnRlcnZhbC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkU3RhcnRUaW1lOiB0aGlzLnVwZGF0ZVJlY29yZFN0YXJ0VGltZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkRWxhcHNlZFRpbWU6IHRoaXMudXBkYXRlUmVjb3JkRWxhcHNlZFRpbWUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUlzVGltZXJSdW5uaW5nOiB0aGlzLnVwZGF0ZUlzVGltZXJSdW5uaW5nLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVDYW5QYXVzZVJlc3VtZTogdGhpcy51cGRhdGVDYW5QYXVzZVJlc3VtZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkQ2hhbmdlU2Vjb25kczogdGhpcy51cGRhdGVSZWNvcmRDaGFuZ2VTZWNvbmRzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVQYXVzZUxpbWl0OiB0aGlzLnVwZGF0ZVBhdXNlTGltaXQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVBhdXNlUmVjb3JkQ291bnQ6IHRoaXMudXBkYXRlUGF1c2VSZWNvcmRDb3VudC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQ2FuTGF1bmNoUmVjb3JkOiB0aGlzLnVwZGF0ZUNhbkxhdW5jaFJlY29yZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlU3RvcExhdW5jaFJlY29yZDogdGhpcy51cGRhdGVTdG9wTGF1bmNoUmVjb3JkLmJpbmQodGhpcyksXG5cbiAgICAgIHVwZGF0ZVBhcnRpY2lwYW50c0FsbDogdGhpcy51cGRhdGVQYXJ0aWNpcGFudHNBbGwuYmluZCh0aGlzKSxcblxuICAgICAgdXBkYXRlRmlyc3RBbGw6IHRoaXMudXBkYXRlRmlyc3RBbGwuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVVwZGF0ZU1haW5XaW5kb3c6IHRoaXMudXBkYXRlVXBkYXRlTWFpbldpbmRvdy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlRmlyc3Rfcm91bmQ6IHRoaXMudXBkYXRlRmlyc3Rfcm91bmQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUxhbmRTY2FwZWQ6IHRoaXMudXBkYXRlTGFuZFNjYXBlZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTG9ja19zY3JlZW46IHRoaXMudXBkYXRlTG9ja19zY3JlZW4uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVNjcmVlbklkOiB0aGlzLnVwZGF0ZVNjcmVlbklkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVBbGxWaWRlb1N0cmVhbXM6IHRoaXMudXBkYXRlQWxsVmlkZW9TdHJlYW1zLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVOZXdMaW1pdGVkU3RyZWFtczogdGhpcy51cGRhdGVOZXdMaW1pdGVkU3RyZWFtcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTmV3TGltaXRlZFN0cmVhbXNJRHM6IHRoaXMudXBkYXRlTmV3TGltaXRlZFN0cmVhbXNJRHMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUFjdGl2ZVNvdW5kczogdGhpcy51cGRhdGVBY3RpdmVTb3VuZHMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVNjcmVlblNoYXJlSURTdHJlYW06IHRoaXMudXBkYXRlU2NyZWVuU2hhcmVJRFN0cmVhbS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlU2NyZWVuU2hhcmVOYW1lU3RyZWFtOiB0aGlzLnVwZGF0ZVNjcmVlblNoYXJlTmFtZVN0cmVhbS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQWRtaW5JRFN0cmVhbTogdGhpcy51cGRhdGVBZG1pbklEU3RyZWFtLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVBZG1pbk5hbWVTdHJlYW06IHRoaXMudXBkYXRlQWRtaW5OYW1lU3RyZWFtLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVZb3VZb3VTdHJlYW06IHRoaXMudXBkYXRlWW91WW91U3RyZWFtLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVZb3VZb3VTdHJlYW1JRHM6IHRoaXMudXBkYXRlWW91WW91U3RyZWFtSURzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVMb2NhbFN0cmVhbTogdGhpcy51cGRhdGVMb2NhbFN0cmVhbS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkU3RhcnRlZDogdGhpcy51cGRhdGVSZWNvcmRTdGFydGVkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRSZXN1bWVkOiB0aGlzLnVwZGF0ZVJlY29yZFJlc3VtZWQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZFBhdXNlZDogdGhpcy51cGRhdGVSZWNvcmRQYXVzZWQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZFN0b3BwZWQ6IHRoaXMudXBkYXRlUmVjb3JkU3RvcHBlZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQWRtaW5SZXN0cmljdFNldHRpbmc6IHRoaXMudXBkYXRlQWRtaW5SZXN0cmljdFNldHRpbmcuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVZpZGVvUmVxdWVzdFN0YXRlOiB0aGlzLnVwZGF0ZVZpZGVvUmVxdWVzdFN0YXRlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVWaWRlb1JlcXVlc3RUaW1lOiB0aGlzLnVwZGF0ZVZpZGVvUmVxdWVzdFRpbWUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVZpZGVvQWN0aW9uOiB0aGlzLnVwZGF0ZVZpZGVvQWN0aW9uLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVMb2NhbFN0cmVhbVZpZGVvOiB0aGlzLnVwZGF0ZUxvY2FsU3RyZWFtVmlkZW8uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVVzZXJEZWZhdWx0VmlkZW9JbnB1dERldmljZTogdGhpcy51cGRhdGVVc2VyRGVmYXVsdFZpZGVvSW5wdXREZXZpY2UuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUN1cnJlbnRGYWNpbmdNb2RlOiB0aGlzLnVwZGF0ZUN1cnJlbnRGYWNpbmdNb2RlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVQcmV2RmFjaW5nTW9kZTogdGhpcy51cGRhdGVQcmV2RmFjaW5nTW9kZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlRGVmVmlkZW9JRDogdGhpcy51cGRhdGVEZWZWaWRlb0lELmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVBbGxvd2VkOiB0aGlzLnVwZGF0ZUFsbG93ZWQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZURpc3BBY3RpdmVOYW1lczogdGhpcy51cGRhdGVEaXNwQWN0aXZlTmFtZXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVBfZGlzcEFjdGl2ZU5hbWVzOiB0aGlzLnVwZGF0ZVBfZGlzcEFjdGl2ZU5hbWVzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVBY3RpdmVOYW1lczogdGhpcy51cGRhdGVBY3RpdmVOYW1lcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUHJldkFjdGl2ZU5hbWVzOiB0aGlzLnVwZGF0ZVByZXZBY3RpdmVOYW1lcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUF9hY3RpdmVOYW1lczogdGhpcy51cGRhdGVQX2FjdGl2ZU5hbWVzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVNZW1iZXJzUmVjZWl2ZWQ6IHRoaXMudXBkYXRlTWVtYmVyc1JlY2VpdmVkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVEZWZlclNjcmVlblJlY2VpdmVkOiB0aGlzLnVwZGF0ZURlZmVyU2NyZWVuUmVjZWl2ZWQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUhvc3RGaXJzdFN3aXRjaDogdGhpcy51cGRhdGVIb3N0Rmlyc3RTd2l0Y2guYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZU1pY0FjdGlvbjogdGhpcy51cGRhdGVNaWNBY3Rpb24uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVNjcmVlbkFjdGlvbjogdGhpcy51cGRhdGVTY3JlZW5BY3Rpb24uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUNoYXRBY3Rpb246IHRoaXMudXBkYXRlQ2hhdEFjdGlvbi5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQXVkaW9SZXF1ZXN0U3RhdGU6IHRoaXMudXBkYXRlQXVkaW9SZXF1ZXN0U3RhdGUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVNjcmVlblJlcXVlc3RTdGF0ZTogdGhpcy51cGRhdGVTY3JlZW5SZXF1ZXN0U3RhdGUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUNoYXRSZXF1ZXN0U3RhdGU6IHRoaXMudXBkYXRlQ2hhdFJlcXVlc3RTdGF0ZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQXVkaW9SZXF1ZXN0VGltZTogdGhpcy51cGRhdGVBdWRpb1JlcXVlc3RUaW1lLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVTY3JlZW5SZXF1ZXN0VGltZTogdGhpcy51cGRhdGVTY3JlZW5SZXF1ZXN0VGltZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQ2hhdFJlcXVlc3RUaW1lOiB0aGlzLnVwZGF0ZUNoYXRSZXF1ZXN0VGltZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlT2xkU291bmRJZHM6IHRoaXMudXBkYXRlT2xkU291bmRJZHMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUhvc3RMYWJlbDogdGhpcy51cGRhdGVIb3N0TGFiZWwuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZU1haW5TY3JlZW5GaWxsZWQ6IHRoaXMudXBkYXRlTWFpblNjcmVlbkZpbGxlZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTG9jYWxTdHJlYW1TY3JlZW46IHRoaXMudXBkYXRlTG9jYWxTdHJlYW1TY3JlZW4uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVNjcmVlbkFscmVhZHlPbjogdGhpcy51cGRhdGVTY3JlZW5BbHJlYWR5T24uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUNoYXRBbHJlYWR5T246IHRoaXMudXBkYXRlQ2hhdEFscmVhZHlPbi5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVkaXJlY3RVUkw6IHRoaXMudXBkYXRlUmVkaXJlY3RVUkwuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZU9sZEFsbFN0cmVhbXM6IHRoaXMudXBkYXRlT2xkQWxsU3RyZWFtcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQWRtaW5WaWRJRDogdGhpcy51cGRhdGVBZG1pblZpZElELmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVTdHJlYW1OYW1lczogdGhpcy51cGRhdGVTdHJlYW1OYW1lcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTm9uX2FsVmlkZW9TdHJlYW1zOiB0aGlzLnVwZGF0ZU5vbl9hbFZpZGVvU3RyZWFtcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlU29ydEF1ZGlvTG91ZG5lc3M6IHRoaXMudXBkYXRlU29ydEF1ZGlvTG91ZG5lc3MuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUF1ZGlvRGVjaWJlbHM6IHRoaXMudXBkYXRlQXVkaW9EZWNpYmVscy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTWl4ZWRfYWxWaWRlb1N0cmVhbXM6IHRoaXMudXBkYXRlTWl4ZWRfYWxWaWRlb1N0cmVhbXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZU5vbl9hbFZpZGVvU3RyZWFtc19tdXRlZDogdGhpcy51cGRhdGVOb25fYWxWaWRlb1N0cmVhbXNfbXV0ZWQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVBhZ2luYXRlZFN0cmVhbXM6IHRoaXMudXBkYXRlUGFnaW5hdGVkU3RyZWFtcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTG9jYWxTdHJlYW1BdWRpbzogdGhpcy51cGRhdGVMb2NhbFN0cmVhbUF1ZGlvLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVEZWZBdWRpb0lEOiB0aGlzLnVwZGF0ZURlZkF1ZGlvSUQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVVzZXJEZWZhdWx0QXVkaW9JbnB1dERldmljZTogdGhpcy51cGRhdGVVc2VyRGVmYXVsdEF1ZGlvSW5wdXREZXZpY2UuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVVzZXJEZWZhdWx0QXVkaW9PdXRwdXREZXZpY2U6IHRoaXMudXBkYXRlVXNlckRlZmF1bHRBdWRpb091dHB1dERldmljZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUHJldkF1ZGlvSW5wdXREZXZpY2U6IHRoaXMudXBkYXRlUHJldkF1ZGlvSW5wdXREZXZpY2UuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVByZXZWaWRlb0lucHV0RGV2aWNlOiB0aGlzLnVwZGF0ZVByZXZWaWRlb0lucHV0RGV2aWNlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVBdWRpb1BhdXNlZDogdGhpcy51cGRhdGVBdWRpb1BhdXNlZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTWFpblNjcmVlblBlcnNvbjogdGhpcy51cGRhdGVNYWluU2NyZWVuUGVyc29uLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVBZG1pbk9uTWFpblNjcmVlbjogdGhpcy51cGRhdGVBZG1pbk9uTWFpblNjcmVlbi5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlU2NyZWVuU3RhdGVzOiB0aGlzLnVwZGF0ZVNjcmVlblN0YXRlcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUHJldlNjcmVlblN0YXRlczogdGhpcy51cGRhdGVQcmV2U2NyZWVuU3RhdGVzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVVcGRhdGVEYXRlU3RhdGU6IHRoaXMudXBkYXRlVXBkYXRlRGF0ZVN0YXRlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVMYXN0VXBkYXRlOiB0aGlzLnVwZGF0ZUxhc3RVcGRhdGUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZU5Gb3JSZWFkanVzdFJlY29yZDogdGhpcy51cGRhdGVORm9yUmVhZGp1c3RSZWNvcmQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUZpeGVkUGFnZUxpbWl0OiB0aGlzLnVwZGF0ZUZpeGVkUGFnZUxpbWl0LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZW1vdmVBbHRHcmlkOiB0aGlzLnVwZGF0ZVJlbW92ZUFsdEdyaWQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZU5Gb3JSZWFkanVzdDogdGhpcy51cGRhdGVORm9yUmVhZGp1c3QuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUxhc3RSZW9yZGVyVGltZTogdGhpcy51cGRhdGVMYXN0UmVvcmRlclRpbWUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUF1ZFN0cmVhbU5hbWVzOiB0aGlzLnVwZGF0ZUF1ZFN0cmVhbU5hbWVzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVDdXJyZW50VXNlclBhZ2U6IHRoaXMudXBkYXRlQ3VycmVudFVzZXJQYWdlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVNYWluSGVpZ2h0V2lkdGg6IHRoaXMudXBkYXRlTWFpbkhlaWdodFdpZHRoLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVQcmV2TWFpbkhlaWdodFdpZHRoOiB0aGlzLnVwZGF0ZVByZXZNYWluSGVpZ2h0V2lkdGguYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVByZXZEb1BhZ2luYXRlOiB0aGlzLnVwZGF0ZVByZXZEb1BhZ2luYXRlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVEb1BhZ2luYXRlOiB0aGlzLnVwZGF0ZURvUGFnaW5hdGUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVNoYXJlRW5kZWQ6IHRoaXMudXBkYXRlU2hhcmVFbmRlZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTFN0cmVhbXM6IHRoaXMudXBkYXRlTFN0cmVhbXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUNoYXRSZWZTdHJlYW1zOiB0aGlzLnVwZGF0ZUNoYXRSZWZTdHJlYW1zLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVDb250cm9sSGVpZ2h0OiB0aGlzLnVwZGF0ZUNvbnRyb2xIZWlnaHQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUlzV2lkZVNjcmVlbjogdGhpcy51cGRhdGVJc1dpZGVTY3JlZW4uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUlzTWVkaXVtU2NyZWVuOiB0aGlzLnVwZGF0ZUlzTWVkaXVtU2NyZWVuLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVJc1NtYWxsU2NyZWVuOiB0aGlzLnVwZGF0ZUlzU21hbGxTY3JlZW4uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUFkZEdyaWQ6IHRoaXMudXBkYXRlQWRkR3JpZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQWRkQWx0R3JpZDogdGhpcy51cGRhdGVBZGRBbHRHcmlkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVHcmlkUm93czogdGhpcy51cGRhdGVHcmlkUm93cy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlR3JpZENvbHM6IHRoaXMudXBkYXRlR3JpZENvbHMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUFsdEdyaWRSb3dzOiB0aGlzLnVwZGF0ZUFsdEdyaWRSb3dzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVBbHRHcmlkQ29sczogdGhpcy51cGRhdGVBbHRHcmlkQ29scy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTnVtYmVyUGFnZXM6IHRoaXMudXBkYXRlTnVtYmVyUGFnZXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUN1cnJlbnRTdHJlYW1zOiB0aGlzLnVwZGF0ZUN1cnJlbnRTdHJlYW1zLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVTaG93TWluaVZpZXc6IHRoaXMudXBkYXRlU2hvd01pbmlWaWV3LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVOU3RyZWFtOiB0aGlzLnVwZGF0ZU5TdHJlYW0uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZURlZmVyX3JlY2VpdmU6IHRoaXMudXBkYXRlRGVmZXJfcmVjZWl2ZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQWxsQXVkaW9TdHJlYW1zOiB0aGlzLnVwZGF0ZUFsbEF1ZGlvU3RyZWFtcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVtb3RlU2NyZWVuU3RyZWFtOiB0aGlzLnVwZGF0ZVJlbW90ZVNjcmVlblN0cmVhbS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlU2NyZWVuUHJvZHVjZXI6IHRoaXMudXBkYXRlU2NyZWVuUHJvZHVjZXIuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUdvdEFsbFZpZHM6IHRoaXMudXBkYXRlR290QWxsVmlkcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUGFnaW5hdGlvbkhlaWdodFdpZHRoOiB0aGlzLnVwZGF0ZVBhZ2luYXRpb25IZWlnaHRXaWR0aC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUGFnaW5hdGlvbkRpcmVjdGlvbjogdGhpcy51cGRhdGVQYWdpbmF0aW9uRGlyZWN0aW9uLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVHcmlkU2l6ZXM6IHRoaXMudXBkYXRlR3JpZFNpemVzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVTY3JlZW5Gb3JjZUZ1bGxEaXNwbGF5OiB0aGlzLnVwZGF0ZVNjcmVlbkZvcmNlRnVsbERpc3BsYXkuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZU1haW5HcmlkU3RyZWFtOiB0aGlzLnVwZGF0ZU1haW5HcmlkU3RyZWFtLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVPdGhlckdyaWRTdHJlYW1zOiB0aGlzLnVwZGF0ZU90aGVyR3JpZFN0cmVhbXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUF1ZGlvT25seVN0cmVhbXM6IHRoaXMudXBkYXRlQXVkaW9Pbmx5U3RyZWFtcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlVmlkZW9JbnB1dHM6IHRoaXMudXBkYXRlVmlkZW9JbnB1dHMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUF1ZGlvSW5wdXRzOiB0aGlzLnVwZGF0ZUF1ZGlvSW5wdXRzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVNZWV0aW5nUHJvZ3Jlc3NUaW1lOiB0aGlzLnVwZGF0ZU1lZXRpbmdQcm9ncmVzc1RpbWUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZU1lZXRpbmdFbGFwc2VkVGltZTogdGhpcy51cGRhdGVNZWV0aW5nRWxhcHNlZFRpbWUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlZl9wYXJ0aWNpcGFudHM6IHRoaXMudXBkYXRlUmVmX3BhcnRpY2lwYW50cy5iaW5kKHRoaXMpLFxuXG4gICAgICB1cGRhdGVNZXNzYWdlczogdGhpcy51cGRhdGVNZXNzYWdlcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlU3RhcnREaXJlY3RNZXNzYWdlOiB0aGlzLnVwZGF0ZVN0YXJ0RGlyZWN0TWVzc2FnZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlRGlyZWN0TWVzc2FnZURldGFpbHM6IHRoaXMudXBkYXRlRGlyZWN0TWVzc2FnZURldGFpbHMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVNob3dNZXNzYWdlc0JhZGdlOiB0aGlzLnVwZGF0ZVNob3dNZXNzYWdlc0JhZGdlLmJpbmQodGhpcyksXG5cbiAgICAgIC8vIEV2ZW50IHNldHRpbmdzXG4gICAgICB1cGRhdGVBdWRpb1NldHRpbmc6IHRoaXMudXBkYXRlQXVkaW9TZXR0aW5nLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVWaWRlb1NldHRpbmc6IHRoaXMudXBkYXRlVmlkZW9TZXR0aW5nLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVTY3JlZW5zaGFyZVNldHRpbmc6IHRoaXMudXBkYXRlU2NyZWVuc2hhcmVTZXR0aW5nLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVDaGF0U2V0dGluZzogdGhpcy51cGRhdGVDaGF0U2V0dGluZy5iaW5kKHRoaXMpLFxuXG4gICAgICAvLyBEaXNwbGF5IHNldHRpbmdzXG4gICAgICB1cGRhdGVBdXRvV2F2ZTogdGhpcy51cGRhdGVBdXRvV2F2ZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlRm9yY2VGdWxsRGlzcGxheTogdGhpcy51cGRhdGVGb3JjZUZ1bGxEaXNwbGF5LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVQcmV2Rm9yY2VGdWxsRGlzcGxheTogdGhpcy51cGRhdGVQcmV2Rm9yY2VGdWxsRGlzcGxheS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUHJldk1lZXRpbmdEaXNwbGF5VHlwZTogdGhpcy51cGRhdGVQcmV2TWVldGluZ0Rpc3BsYXlUeXBlLmJpbmQodGhpcyksXG5cbiAgICAgIC8vIFdhaXRpbmcgcm9vbVxuICAgICAgdXBkYXRlV2FpdGluZ1Jvb21GaWx0ZXI6IHRoaXMudXBkYXRlV2FpdGluZ1Jvb21GaWx0ZXIuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVdhaXRpbmdSb29tTGlzdDogdGhpcy51cGRhdGVXYWl0aW5nUm9vbUxpc3QuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVdhaXRpbmdSb29tQ291bnRlcjogdGhpcy51cGRhdGVXYWl0aW5nUm9vbUNvdW50ZXIuYmluZCh0aGlzKSxcblxuICAgICAgLy8gUmVxdWVzdHNcbiAgICAgIHVwZGF0ZVJlcXVlc3RGaWx0ZXI6IHRoaXMudXBkYXRlUmVxdWVzdEZpbHRlci5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVxdWVzdExpc3Q6IHRoaXMudXBkYXRlUmVxdWVzdExpc3QuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlcXVlc3RDb3VudGVyOiB0aGlzLnVwZGF0ZVJlcXVlc3RDb3VudGVyLmJpbmQodGhpcyksXG5cbiAgICAgIC8vIFRvdGFsIHJlcXVlc3RzIGFuZCB3YWl0aW5nIHJvb21cbiAgICAgIHVwZGF0ZVRvdGFsUmVxV2FpdDogdGhpcy51cGRhdGVUb3RhbFJlcVdhaXQuYmluZCh0aGlzKSxcblxuICAgICAgLy8gTWVudSBtb2RhbHNcbiAgICAgIHVwZGF0ZUlzTWVudU1vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc01lbnVNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUlzUmVjb3JkaW5nTW9kYWxWaXNpYmxlOiB0aGlzLnVwZGF0ZUlzUmVjb3JkaW5nTW9kYWxWaXNpYmxlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVJc1NldHRpbmdzTW9kYWxWaXNpYmxlOiB0aGlzLnVwZGF0ZUlzU2V0dGluZ3NNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUlzUmVxdWVzdHNNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNSZXF1ZXN0c01vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlSXNXYWl0aW5nTW9kYWxWaXNpYmxlOiB0aGlzLnVwZGF0ZUlzV2FpdGluZ01vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlSXNDb0hvc3RNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNDb0hvc3RNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUlzTWVkaWFTZXR0aW5nc01vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc01lZGlhU2V0dGluZ3NNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUlzRGlzcGxheVNldHRpbmdzTW9kYWxWaXNpYmxlOiB0aGlzLnVwZGF0ZUlzRGlzcGxheVNldHRpbmdzTW9kYWxWaXNpYmxlLmJpbmQodGhpcyksXG5cbiAgICAgIC8vIE90aGVyIG1vZGFsc1xuICAgICAgdXBkYXRlSXNQYXJ0aWNpcGFudHNNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNQYXJ0aWNpcGFudHNNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUlzTWVzc2FnZXNNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNNZXNzYWdlc01vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlSXNDb25maXJtRXhpdE1vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc0NvbmZpcm1FeGl0TW9kYWxWaXNpYmxlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVJc0NvbmZpcm1IZXJlTW9kYWxWaXNpYmxlOiB0aGlzLnVwZGF0ZUlzQ29uZmlybUhlcmVNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUlzTG9hZGluZ01vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc0xvYWRpbmdNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcblxuICAgICAgLy8gUmVjb3JkaW5nIE9wdGlvbnNcbiAgICAgIHVwZGF0ZVJlY29yZGluZ01lZGlhT3B0aW9uczogdGhpcy51cGRhdGVSZWNvcmRpbmdNZWRpYU9wdGlvbnMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ0F1ZGlvT3B0aW9uczogdGhpcy51cGRhdGVSZWNvcmRpbmdBdWRpb09wdGlvbnMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ1ZpZGVvT3B0aW9uczogdGhpcy51cGRhdGVSZWNvcmRpbmdWaWRlb09wdGlvbnMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ1ZpZGVvVHlwZTogdGhpcy51cGRhdGVSZWNvcmRpbmdWaWRlb1R5cGUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ1ZpZGVvT3B0aW1pemVkOiB0aGlzLnVwZGF0ZVJlY29yZGluZ1ZpZGVvT3B0aW1pemVkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRpbmdEaXNwbGF5VHlwZTogdGhpcy51cGRhdGVSZWNvcmRpbmdEaXNwbGF5VHlwZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nQWRkSExTOiB0aGlzLnVwZGF0ZVJlY29yZGluZ0FkZEhMUy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nQWRkVGV4dDogdGhpcy51cGRhdGVSZWNvcmRpbmdBZGRUZXh0LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRpbmdDdXN0b21UZXh0OiB0aGlzLnVwZGF0ZVJlY29yZGluZ0N1c3RvbVRleHQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ0N1c3RvbVRleHRQb3NpdGlvbjogdGhpcy51cGRhdGVSZWNvcmRpbmdDdXN0b21UZXh0UG9zaXRpb24uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ0N1c3RvbVRleHRDb2xvcjogdGhpcy51cGRhdGVSZWNvcmRpbmdDdXN0b21UZXh0Q29sb3IuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ05hbWVUYWdzOiB0aGlzLnVwZGF0ZVJlY29yZGluZ05hbWVUYWdzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRpbmdCYWNrZ3JvdW5kQ29sb3I6IHRoaXMudXBkYXRlUmVjb3JkaW5nQmFja2dyb3VuZENvbG9yLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRpbmdOYW1lVGFnc0NvbG9yOiB0aGlzLnVwZGF0ZVJlY29yZGluZ05hbWVUYWdzQ29sb3IuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ09yaWVudGF0aW9uVmlkZW86IHRoaXMudXBkYXRlUmVjb3JkaW5nT3JpZW50YXRpb25WaWRlby5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQ2xlYXJlZFRvUmVzdW1lOiB0aGlzLnVwZGF0ZUNsZWFyZWRUb1Jlc3VtZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQ2xlYXJlZFRvUmVjb3JkOiB0aGlzLnVwZGF0ZUNsZWFyZWRUb1JlY29yZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkU3RhdGU6IHRoaXMudXBkYXRlUmVjb3JkU3RhdGUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVNob3dSZWNvcmRCdXR0b25zOiB0aGlzLnVwZGF0ZVNob3dSZWNvcmRCdXR0b25zLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRpbmdQcm9ncmVzc1RpbWU6IHRoaXMudXBkYXRlUmVjb3JkaW5nUHJvZ3Jlc3NUaW1lLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVBdWRpb1N3aXRjaGluZzogdGhpcy51cGRhdGVBdWRpb1N3aXRjaGluZy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlVmlkZW9Td2l0Y2hpbmc6IHRoaXMudXBkYXRlVmlkZW9Td2l0Y2hpbmcuYmluZCh0aGlzKSxcblxuICAgICAgLy8gTWVkaWEgc3RhdGVzXG4gICAgICB1cGRhdGVWaWRlb0FscmVhZHlPbjogdGhpcy51cGRhdGVWaWRlb0FscmVhZHlPbi5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQXVkaW9BbHJlYWR5T246IHRoaXMudXBkYXRlQXVkaW9BbHJlYWR5T24uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUNvbXBvbmVudFNpemVzOiB0aGlzLnVwZGF0ZUNvbXBvbmVudFNpemVzLmJpbmQodGhpcyksXG5cbiAgICAgIC8vIFBlcm1pc3Npb25zXG4gICAgICB1cGRhdGVIYXNDYW1lcmFQZXJtaXNzaW9uOiB0aGlzLnVwZGF0ZUhhc0NhbWVyYVBlcm1pc3Npb24uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUhhc0F1ZGlvUGVybWlzc2lvbjogdGhpcy51cGRhdGVIYXNBdWRpb1Blcm1pc3Npb24uYmluZCh0aGlzKSxcblxuICAgICAgLy8gVHJhbnNwb3J0c1xuICAgICAgdXBkYXRlVHJhbnNwb3J0Q3JlYXRlZDogdGhpcy51cGRhdGVUcmFuc3BvcnRDcmVhdGVkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVUcmFuc3BvcnRDcmVhdGVkVmlkZW86IHRoaXMudXBkYXRlVHJhbnNwb3J0Q3JlYXRlZFZpZGVvLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVUcmFuc3BvcnRDcmVhdGVkQXVkaW86IHRoaXMudXBkYXRlVHJhbnNwb3J0Q3JlYXRlZEF1ZGlvLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVUcmFuc3BvcnRDcmVhdGVkU2NyZWVuOiB0aGlzLnVwZGF0ZVRyYW5zcG9ydENyZWF0ZWRTY3JlZW4uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVByb2R1Y2VyVHJhbnNwb3J0OiB0aGlzLnVwZGF0ZVByb2R1Y2VyVHJhbnNwb3J0LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVWaWRlb1Byb2R1Y2VyOiB0aGlzLnVwZGF0ZVZpZGVvUHJvZHVjZXIuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVBhcmFtczogdGhpcy51cGRhdGVQYXJhbXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVZpZGVvUGFyYW1zOiB0aGlzLnVwZGF0ZVZpZGVvUGFyYW1zLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVBdWRpb1BhcmFtczogdGhpcy51cGRhdGVBdWRpb1BhcmFtcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQXVkaW9Qcm9kdWNlcjogdGhpcy51cGRhdGVBdWRpb1Byb2R1Y2VyLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVDb25zdW1lclRyYW5zcG9ydHM6IHRoaXMudXBkYXRlQ29uc3VtZXJUcmFuc3BvcnRzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVDb25zdW1pbmdUcmFuc3BvcnRzOiB0aGlzLnVwZGF0ZUNvbnN1bWluZ1RyYW5zcG9ydHMuYmluZCh0aGlzKSxcblxuICAgICAgLy8gUG9sbHNcbiAgICAgIHVwZGF0ZVBvbGxzOiB0aGlzLnVwZGF0ZVBvbGxzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVQb2xsOiB0aGlzLnVwZGF0ZVBvbGwuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUlzUG9sbE1vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc1BvbGxNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcblxuICAgICAgLy8gQmFja2dyb3VuZFxuICAgICAgdXBkYXRlQ3VzdG9tSW1hZ2U6IHRoaXMudXBkYXRlQ3VzdG9tSW1hZ2UuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVNlbGVjdGVkSW1hZ2U6IHRoaXMudXBkYXRlU2VsZWN0ZWRJbWFnZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlU2VnbWVudFZpZGVvOiB0aGlzLnVwZGF0ZVNlZ21lbnRWaWRlby5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlU2VsZmllU2VnbWVudGF0aW9uOiB0aGlzLnVwZGF0ZVNlbGZpZVNlZ21lbnRhdGlvbi5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUGF1c2VTZWdtZW50YXRpb246IHRoaXMudXBkYXRlUGF1c2VTZWdtZW50YXRpb24uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVByb2Nlc3NlZFN0cmVhbTogdGhpcy51cGRhdGVQcm9jZXNzZWRTdHJlYW0uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUtlZXBCYWNrZ3JvdW5kOiB0aGlzLnVwZGF0ZUtlZXBCYWNrZ3JvdW5kLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVCYWNrZ3JvdW5kSGFzQ2hhbmdlZDogdGhpcy51cGRhdGVCYWNrZ3JvdW5kSGFzQ2hhbmdlZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlVmlydHVhbFN0cmVhbTogdGhpcy51cGRhdGVWaXJ0dWFsU3RyZWFtLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVNYWluQ2FudmFzOiB0aGlzLnVwZGF0ZU1haW5DYW52YXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVByZXZLZWVwQmFja2dyb3VuZDogdGhpcy51cGRhdGVQcmV2S2VlcEJhY2tncm91bmQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUFwcGxpZWRCYWNrZ3JvdW5kOiB0aGlzLnVwZGF0ZUFwcGxpZWRCYWNrZ3JvdW5kLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVJc0JhY2tncm91bmRNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNCYWNrZ3JvdW5kTW9kYWxWaXNpYmxlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVBdXRvQ2xpY2tCYWNrZ3JvdW5kOiB0aGlzLnVwZGF0ZUF1dG9DbGlja0JhY2tncm91bmQuYmluZCh0aGlzKSxcblxuICAgICAgLy8gQnJlYWtvdXQgcm9vbXNcbiAgICAgIHVwZGF0ZUJyZWFrb3V0Um9vbXM6IHRoaXMudXBkYXRlQnJlYWtvdXRSb29tcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQ3VycmVudFJvb21JbmRleDogdGhpcy51cGRhdGVDdXJyZW50Um9vbUluZGV4LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVDYW5TdGFydEJyZWFrb3V0OiB0aGlzLnVwZGF0ZUNhblN0YXJ0QnJlYWtvdXQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUJyZWFrT3V0Um9vbVN0YXJ0ZWQ6IHRoaXMudXBkYXRlQnJlYWtPdXRSb29tU3RhcnRlZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQnJlYWtPdXRSb29tRW5kZWQ6IHRoaXMudXBkYXRlQnJlYWtPdXRSb29tRW5kZWQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUhvc3ROZXdSb29tOiB0aGlzLnVwZGF0ZUhvc3ROZXdSb29tLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVMaW1pdGVkQnJlYWtSb29tOiB0aGlzLnVwZGF0ZUxpbWl0ZWRCcmVha1Jvb20uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZU1haW5Sb29tc0xlbmd0aDogdGhpcy51cGRhdGVNYWluUm9vbXNMZW5ndGguYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZU1lbWJlclJvb206IHRoaXMudXBkYXRlTWVtYmVyUm9vbS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlSXNCcmVha291dFJvb21zTW9kYWxWaXNpYmxlOiB0aGlzLnVwZGF0ZUlzQnJlYWtvdXRSb29tc01vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuXG4gICAgICAvLyBXaGl0ZWJvYXJkXG4gICAgICB1cGRhdGVXaGl0ZWJvYXJkVXNlcnM6IHRoaXMudXBkYXRlV2hpdGVib2FyZFVzZXJzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVDdXJyZW50V2hpdGVib2FyZEluZGV4OiB0aGlzLnVwZGF0ZUN1cnJlbnRXaGl0ZWJvYXJkSW5kZXguYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUNhblN0YXJ0V2hpdGVib2FyZDogdGhpcy51cGRhdGVDYW5TdGFydFdoaXRlYm9hcmQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVdoaXRlYm9hcmRTdGFydGVkOiB0aGlzLnVwZGF0ZVdoaXRlYm9hcmRTdGFydGVkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVXaGl0ZWJvYXJkRW5kZWQ6IHRoaXMudXBkYXRlV2hpdGVib2FyZEVuZGVkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVXaGl0ZWJvYXJkTGltaXQ6IHRoaXMudXBkYXRlV2hpdGVib2FyZExpbWl0LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVJc1doaXRlYm9hcmRNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNXaGl0ZWJvYXJkTW9kYWxWaXNpYmxlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVJc0NvbmZpZ3VyZVdoaXRlYm9hcmRNb2RhbFZpc2libGU6XG4gICAgICAgIHRoaXMudXBkYXRlSXNDb25maWd1cmVXaGl0ZWJvYXJkTW9kYWxWaXNpYmxlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVTaGFwZXM6IHRoaXMudXBkYXRlU2hhcGVzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVVc2VJbWFnZUJhY2tncm91bmQ6IHRoaXMudXBkYXRlVXNlSW1hZ2VCYWNrZ3JvdW5kLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWRvU3RhY2s6IHRoaXMudXBkYXRlUmVkb1N0YWNrLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVVbmRvU3RhY2s6IHRoaXMudXBkYXRlVW5kb1N0YWNrLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVDYW52YXNTdHJlYW06IHRoaXMudXBkYXRlQ2FudmFzU3RyZWFtLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVDYW52YXNXaGl0ZWJvYXJkOiB0aGlzLnVwZGF0ZUNhbnZhc1doaXRlYm9hcmQuYmluZCh0aGlzKSxcblxuICAgICAgLy8gU2NyZWVuYm9hcmRcbiAgICAgIHVwZGF0ZUNhbnZhc1NjcmVlbmJvYXJkOiB0aGlzLnVwZGF0ZUNhbnZhc1NjcmVlbmJvYXJkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVQcm9jZXNzZWRTY3JlZW5TdHJlYW06IHRoaXMudXBkYXRlUHJvY2Vzc2VkU2NyZWVuU3RyZWFtLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVBbm5vdGF0ZVNjcmVlblN0cmVhbTogdGhpcy51cGRhdGVBbm5vdGF0ZVNjcmVlblN0cmVhbS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTWFpblNjcmVlbkNhbnZhczogdGhpcy51cGRhdGVNYWluU2NyZWVuQ2FudmFzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVJc1NjcmVlbmJvYXJkTW9kYWxWaXNpYmxlOiB0aGlzLnVwZGF0ZUlzU2NyZWVuYm9hcmRNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcblxuICAgICAgLy8gT3RoZXIgZnVuY3Rpb25zXG4gICAgICBjaGVja09yaWVudGF0aW9uOiB0aGlzLmNoZWNrT3JpZW50YXRpb24uYmluZCh0aGlzKSxcblxuICAgICAgdXBkYXRlRGV2aWNlOiB0aGlzLnVwZGF0ZURldmljZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlU29ja2V0OiB0aGlzLnVwZGF0ZVNvY2tldC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlVmFsaWRhdGVkOiB0aGlzLnVwZGF0ZVZhbGlkYXRlZC5iaW5kKHRoaXMpLFxuXG4gICAgICBzaG93QWxlcnQ6IHRoaXMuc2hvd0FsZXJ0LmJpbmQodGhpcyksXG4gICAgICBnZXRVcGRhdGVkQWxsUGFyYW1zOiAoKSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgLi4udGhpcy5nZXRBbGxQYXJhbXMoKSxcbiAgICAgICAgICAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCksXG4gICAgICAgIH07XG4gICAgICB9LFxuICAgIH07XG4gIH1cblxuICBtZWRpYVNGVVBhcmFtZXRlcnMgPSB7XG4gICAgLi4udGhpcy5nZXRBbGxQYXJhbXMoKSxcbiAgICAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCksXG4gIH07XG5cbiAgZ2V0VXBkYXRlZEFsbFBhcmFtcyA9ICgpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgLi4udGhpcy5nZXRBbGxQYXJhbXMoKSxcbiAgICAgIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSxcbiAgICB9O1xuICB9O1xuXG4gIFByZWpvaW5QYWdlQ29tcG9uZW50OiBhbnkgPSB7XG4gICAgY29tcG9uZW50OiB0aGlzLlByZWpvaW5QYWdlLFxuICAgIGluamVjdG9yOiBudWxsLFxuICB9O1xuXG4gIHVwZGF0ZVByZWpvaW5QYWdlQ29tcG9uZW50ID0gKCkgPT4ge1xuICAgIGNvbnN0IFByZWpvaW5Db21wID0ge1xuICAgICAgY29tcG9uZW50OiB0aGlzLlByZWpvaW5QYWdlLFxuICAgICAgaW5qZWN0b3I6IHRoaXMuY3JlYXRlSW5qZWN0b3Ioe1xuICAgICAgICBwYXJhbWV0ZXJzOiB7XG4gICAgICAgICAgc2hvd0FsZXJ0OlxuICAgICAgICAgICAgdGhpcy5zaG93QWxlcnQgfHxcbiAgICAgICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzaG93QWxlcnQgbm90IGRlZmluZWQnKTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgIHVwZGF0ZUlzTG9hZGluZ01vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc0xvYWRpbmdNb2RhbFZpc2libGUsXG4gICAgICAgICAgY29ubmVjdFNvY2tldDogdGhpcy5zb2NrZXRNYW5hZ2VyLmNvbm5lY3RTb2NrZXQsXG4gICAgICAgICAgdXBkYXRlU29ja2V0OiB0aGlzLnVwZGF0ZVNvY2tldCxcbiAgICAgICAgICB1cGRhdGVWYWxpZGF0ZWQ6IHRoaXMudXBkYXRlVmFsaWRhdGVkLFxuICAgICAgICAgIHVwZGF0ZUFwaVVzZXJOYW1lOiB0aGlzLnVwZGF0ZUFwaVVzZXJOYW1lLFxuICAgICAgICAgIHVwZGF0ZUFwaVRva2VuOiB0aGlzLnVwZGF0ZUFwaVRva2VuLFxuICAgICAgICAgIHVwZGF0ZUxpbms6IHRoaXMudXBkYXRlTGluayxcbiAgICAgICAgICB1cGRhdGVSb29tTmFtZTogdGhpcy51cGRhdGVSb29tTmFtZSxcbiAgICAgICAgICB1cGRhdGVNZW1iZXI6IHRoaXMudXBkYXRlTWVtYmVyLFxuICAgICAgICB9LFxuICAgICAgICBjcmVkZW50aWFsczogdGhpcy5jcmVkZW50aWFscyxcbiAgICAgIH0pLFxuICAgIH07XG5cbiAgICB0aGlzLlByZWpvaW5QYWdlQ29tcG9uZW50ID0geyAuLi5QcmVqb2luQ29tcCB9O1xuXG4gICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICB9O1xuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICh0aGlzLlByZWpvaW5QYWdlKSB7XG4gICAgICB0aGlzLnVwZGF0ZVByZWpvaW5QYWdlQ29tcG9uZW50KCk7XG4gICAgfVxuXG4gICAgdGhpcy5zZXR1cFJlc2l6ZUxpc3RlbmVyKCk7XG4gICAgaWYgKHRoaXMudmFsaWRhdGVkKSB7XG4gICAgICB0aGlzLmNvbm5lY3RBbmRBZGRTb2NrZXRNZXRob2RzKCk7XG4gICAgfVxuXG4gICAgdGhpcy5tYWluSGVpZ2h0V2lkdGhTdWJzY3JpcHRpb24gPSB0aGlzLm1haW5IZWlnaHRXaWR0aC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy51cGRhdGVNYWluVmlkZW9TaXplKCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnZhbGlkYXRlZFN1YnNjcmlwdGlvbiA9IHRoaXMudmFsaWRhdGVkLnN1YnNjcmliZSgodmFsaWRhdGVkKSA9PiB7XG4gICAgICBpZiAodmFsaWRhdGVkKSB7XG4gICAgICAgIHRoaXMuaGFuZGxlVmFsaWRhdGVkKCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5pc2xldmVsU3Vic2NyaXB0aW9uID0gdGhpcy5pc2xldmVsLnN1YnNjcmliZSgoaXNsZXZlbCkgPT4ge1xuICAgICAgaWYgKGlzbGV2ZWwpIHtcbiAgICAgICAgdGhpcy51cGRhdGVDb250cm9sQ2hhdEJ1dHRvbnMoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLmNvSG9zdFN1YnNjcmlwdGlvbiA9IGNvbWJpbmVMYXRlc3QoW3RoaXMuY29Ib3N0LCB0aGlzLmNvSG9zdFJlc3BvbnNpYmlsaXR5XSkuc3Vic2NyaWJlKFxuICAgICAgKFtjb0hvc3QsIGNvSG9zdFJlc3BvbnNpYmlsaXR5XSkgPT4ge1xuICAgICAgICBpZiAoY29Ib3N0IHx8IGNvSG9zdFJlc3BvbnNpYmlsaXR5KSB7XG4gICAgICAgICAgdGhpcy51cGRhdGVDb250cm9sQ2hhdEJ1dHRvbnMoKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICApO1xuXG4gICAgdGhpcy5tZWRpYVNGVVBhcmFtZXRlcnMgPSB7XG4gICAgICAuLi50aGlzLmdldEFsbFBhcmFtcygpLFxuICAgICAgLi4udGhpcy5tZWRpYVNGVUZ1bmN0aW9ucygpLFxuICAgIH07XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5oYW5kbGVSZXNpemUpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdvcmllbnRhdGlvbmNoYW5nZScsIHRoaXMuaGFuZGxlUmVzaXplKTtcbiAgICBpZiAodGhpcy5tYWluSGVpZ2h0V2lkdGhTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMubWFpbkhlaWdodFdpZHRoU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnZhbGlkYXRlZFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy52YWxpZGF0ZWRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuaXNsZXZlbFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5pc2xldmVsU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLmNvSG9zdFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5jb0hvc3RTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuU2NyZWVuYm9hcmRTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuU2NyZWVuYm9hcmRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucmVjb3JkaW5nU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnJlY29yZGluZ1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZU1haW5WaWRlb1NpemUgPSBhc3luYyAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLmxvY2tfc2NyZWVuLnZhbHVlICYmICF0aGlzLnNoYXJlZC52YWx1ZSkge1xuICAgICAgdGhpcy5wcmVwb3B1bGF0ZVVzZXJNZWRpYS5wcmVwb3B1bGF0ZVVzZXJNZWRpYSh7XG4gICAgICAgIG5hbWU6IHRoaXMuaG9zdExhYmVsLnZhbHVlLFxuICAgICAgICBwYXJhbWV0ZXJzOiB7IC4uLnRoaXMuZ2V0QWxsUGFyYW1zKCksIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSB9LFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghdGhpcy5maXJzdF9yb3VuZC52YWx1ZSkge1xuICAgICAgICB0aGlzLnByZXBvcHVsYXRlVXNlck1lZGlhLnByZXBvcHVsYXRlVXNlck1lZGlhKHtcbiAgICAgICAgICBuYW1lOiB0aGlzLmhvc3RMYWJlbC52YWx1ZSxcbiAgICAgICAgICBwYXJhbWV0ZXJzOiB7IC4uLnRoaXMuZ2V0QWxsUGFyYW1zKCksIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSB9LFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgYXN5bmMgY29ubmVjdEFuZEFkZFNvY2tldE1ldGhvZHMoKSB7XG4gICAgdGhpcy5tZWRpYVNGVVBhcmFtZXRlcnMgPSB7XG4gICAgICAuLi50aGlzLmdldEFsbFBhcmFtcygpLFxuICAgICAgLi4udGhpcy5tZWRpYVNGVUZ1bmN0aW9ucygpLFxuICAgIH07XG4gICAgY29uc3Qgc29ja2V0XyA9IGF3YWl0IHRoaXMuY29ubmVjdF9Tb2NrZXQodGhpcy5hcGlVc2VyTmFtZS52YWx1ZSwgJycsIHRoaXMuYXBpVG9rZW4udmFsdWUpO1xuICAgIGlmIChzb2NrZXRfKSB7XG4gICAgICB0aGlzLnVwZGF0ZVNvY2tldChzb2NrZXRfKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBoYW5kbGVWYWxpZGF0ZWQoKSB7XG4gICAgdGhpcy51cGRhdGVBbGxWaWRlb1N0cmVhbXMoW1xuICAgICAgeyBwcm9kdWNlcklkOiAneW91eW91Jywgc3RyZWFtOiB1bmRlZmluZWQsIGlkOiAneW91eW91JywgbmFtZTogJ3lvdXlvdScgfSxcbiAgICBdKTtcblxuICAgIHRoaXMudXBkYXRlU3RyZWFtTmFtZXMoW3sgaWQ6ICd5b3V5b3UnLCBuYW1lOiAneW91eW91JywgcHJvZHVjZXJJZDogJycgfV0pO1xuXG4gICAgaWYgKHRoaXMudmFsaWRhdGVkLnZhbHVlKSB7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICghdGhpcy5sb2NhbFVJTW9kZS52YWx1ZSkge1xuICAgICAgICAgIGF3YWl0IHRoaXMuY29ubmVjdEFuZEFkZFNvY2tldE1ldGhvZHMoKTtcbiAgICAgICAgICB0aGlzLnVwZGF0ZUlzTG9hZGluZ01vZGFsVmlzaWJsZSh0cnVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnVwZGF0ZUlzTG9hZGluZ01vZGFsVmlzaWJsZShmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdlcnJvciBjb25uZWN0QW5kYUFkZFNvY2tldE1ldGhvZHMnLCBlcnJvcik7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc3RhcnRNZWV0aW5nUHJvZ3Jlc3NUaW1lci5zdGFydE1lZXRpbmdQcm9ncmVzc1RpbWVyKHtcbiAgICAgICAgc3RhcnRUaW1lOiBEYXRlLm5vdygpIC8gMTAwMCxcbiAgICAgICAgcGFyYW1ldGVyczogeyAuLi50aGlzLmdldEFsbFBhcmFtcygpLCAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCkgfSxcbiAgICAgIH0pO1xuXG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScpXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpvcmllbnRhdGlvbmNoYW5nZScpXG4gIGFzeW5jIGhhbmRsZVJlc2l6ZSgpIHtcbiAgICBsZXQgZnJhY3Rpb24gPSAwO1xuXG4gICAgaWYgKFxuICAgICAgd2luZG93LmlubmVySGVpZ2h0IDwgd2luZG93LmlubmVyV2lkdGggJiZcbiAgICAgICh0aGlzLmV2ZW50VHlwZS52YWx1ZSA9PSAnd2ViaW5hcicgfHwgdGhpcy5ldmVudFR5cGUudmFsdWUgPT0gJ2NvbmZlcmVuY2UnKVxuICAgICkge1xuICAgICAgY29uc3QgY3VycmVudEhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgIGZyYWN0aW9uID0gTnVtYmVyKCg0MCAvIGN1cnJlbnRIZWlnaHQpLnRvRml4ZWQoMykpO1xuICAgICAgaWYgKGZyYWN0aW9uICE9IHRoaXMuY29udHJvbEhlaWdodC52YWx1ZSkge1xuICAgICAgICB0aGlzLnVwZGF0ZUNvbnRyb2xIZWlnaHQoTnVtYmVyKGZyYWN0aW9uKSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFNldCBkZWZhdWx0IGNvbnRyb2wgYnV0dG9uIGhlaWdodCBmb3IgcG9ydHJhaXQgbW9kZSBvciBvdGhlciBldmVudCB0eXBlc1xuICAgICAgY29uc3QgY3VycmVudEhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgIGZyYWN0aW9uID0gTnVtYmVyKCg0MCAvIGN1cnJlbnRIZWlnaHQpLnRvRml4ZWQoMykpO1xuICAgICAgZnJhY3Rpb24gPSBOdW1iZXIoZnJhY3Rpb24pO1xuICAgICAgaWYgKGZyYWN0aW9uICE9IHRoaXMuY29udHJvbEhlaWdodC52YWx1ZSkge1xuICAgICAgICB0aGlzLnVwZGF0ZUNvbnRyb2xIZWlnaHQoTnVtYmVyKGZyYWN0aW9uKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgZGltZW5zaW9ucyA9IHRoaXMuY29tcHV0ZURpbWVuc2lvbnNNZXRob2Qoe1xuICAgICAgY29udGFpbmVyV2lkdGhGcmFjdGlvbjogMSxcbiAgICAgIGNvbnRhaW5lckhlaWdodEZyYWN0aW9uOiAxLFxuICAgICAgbWFpblNpemU6IHRoaXMubWFpbkhlaWdodFdpZHRoLnZhbHVlLFxuICAgICAgZG9TdGFjazogdHJ1ZSxcbiAgICAgIGRlZmF1bHRGcmFjdGlvbjpcbiAgICAgICAgdGhpcy5ldmVudFR5cGUudmFsdWUgPT0gJ3dlYmluYXInIHx8IHRoaXMuZXZlbnRUeXBlLnZhbHVlID09ICdjb25mZXJlbmNlJ1xuICAgICAgICAgID8gMSAtIGZyYWN0aW9uXG4gICAgICAgICAgOiAxLFxuICAgIH0pO1xuXG4gICAgdGhpcy51cGRhdGVDb21wb25lbnRTaXplcyhkaW1lbnNpb25zKTtcblxuICAgIGNvbnN0IG9yaWVudGF0aW9uID0gdGhpcy5jaGVja09yaWVudGF0aW9uKCk7XG4gICAgaWYgKG9yaWVudGF0aW9uID09ICdwb3J0cmFpdCcpIHtcbiAgICAgIGlmICghdGhpcy5pc1dpZGVTY3JlZW4udmFsdWUpIHtcbiAgICAgICAgaWYgKHRoaXMuc2hhcmVTY3JlZW5TdGFydGVkLnZhbHVlIHx8IHRoaXMuc2hhcmVkLnZhbHVlKSB7XG4gICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5Gb3JjZUZ1bGxEaXNwbGF5KHRydWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gVXBkYXRlcyB0aGUgbWFpbiBncmlkIHZpZXdcbiAgICBhd2FpdCB0aGlzLnByZXBvcHVsYXRlVXNlck1lZGlhLnByZXBvcHVsYXRlVXNlck1lZGlhKHtcbiAgICAgIG5hbWU6IHRoaXMuaG9zdExhYmVsLnZhbHVlLFxuICAgICAgcGFyYW1ldGVyczogeyAuLi50aGlzLmdldEFsbFBhcmFtcygpLCAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCkgfSxcbiAgICB9KTtcbiAgICAvLyBVcGRhdGVzIHRoZSBtaW5pIGdyaWQgdmlld1xuICAgIGF3YWl0IHRoaXMub25TY3JlZW5DaGFuZ2VzLm9uU2NyZWVuQ2hhbmdlcyh7XG4gICAgICBjaGFuZ2VkOiB0cnVlLFxuICAgICAgcGFyYW1ldGVyczogeyAuLi50aGlzLmdldEFsbFBhcmFtcygpLCAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCkgfSxcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIGRpc2Nvbm5lY3RBbGxTb2NrZXRzKGNvbnN1bWVfc29ja2V0czogQ29uc3VtZVNvY2tldFtdKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgZm9yIChjb25zdCBzb2NrZXQgb2YgY29uc3VtZV9zb2NrZXRzKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBpcCA9IE9iamVjdC5rZXlzKHNvY2tldClbMF07XG4gICAgICAgIGF3YWl0IHNvY2tldFtpcF0uZGlzY29ubmVjdCgpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5sb2coYEVycm9yIGRpc2Nvbm5lY3Rpbmcgc29ja2V0IHdpdGggSVA6ICR7T2JqZWN0LmtleXMoc29ja2V0KVswXX1gLCBlcnJvcik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgY2xvc2VBbmRSZXNldCgpIHtcbiAgICAvL2Nsb3NlIGFuZCBjbGVhbiB1cCBhbGwgc29ja2V0cywgbW9kYWxzLC4uLiBhbmQgcmVzZXQgYWxsIHN0YXRlcyB0byBpbml0aWFsIHZhbHVlc1xuXG4gICAgdGhpcy51cGRhdGVJc01lc3NhZ2VzTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgICB0aGlzLnVwZGF0ZUlzUGFydGljaXBhbnRzTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgICB0aGlzLnVwZGF0ZUlzV2FpdGluZ01vZGFsVmlzaWJsZShmYWxzZSk7XG4gICAgdGhpcy51cGRhdGVJc1JlcXVlc3RzTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgICB0aGlzLnVwZGF0ZUlzQ29Ib3N0TW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgICB0aGlzLnVwZGF0ZUlzU2V0dGluZ3NNb2RhbFZpc2libGUoZmFsc2UpO1xuICAgIHRoaXMudXBkYXRlSXNEaXNwbGF5U2V0dGluZ3NNb2RhbFZpc2libGUoZmFsc2UpO1xuICAgIHRoaXMudXBkYXRlSXNNZWRpYVNldHRpbmdzTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgICB0aGlzLnVwZGF0ZUlzTWVudU1vZGFsVmlzaWJsZShmYWxzZSk7XG4gICAgdGhpcy51cGRhdGVJc1NoYXJlRXZlbnRNb2RhbFZpc2libGUoZmFsc2UpO1xuICAgIHRoaXMudXBkYXRlSXNDb25maXJtRXhpdE1vZGFsVmlzaWJsZShmYWxzZSk7XG4gICAgYXdhaXQgdGhpcy5kaXNjb25uZWN0QWxsU29ja2V0cyh0aGlzLmNvbnN1bWVfc29ja2V0cy52YWx1ZSk7XG4gICAgYXdhaXQgdGhpcy51cGRhdGVTdGF0ZXNUb0luaXRpYWxWYWx1ZXMoKTtcbiAgICB0aGlzLnVwZGF0ZU1lZXRpbmdQcm9ncmVzc1RpbWUoJzAwOjAwOjAwJyk7XG4gICAgdGhpcy51cGRhdGVNZWV0aW5nRWxhcHNlZFRpbWUoMCk7XG4gICAgdGhpcy51cGRhdGVSZWNvcmRpbmdQcm9ncmVzc1RpbWUoJzAwOjAwOjAwJyk7XG4gICAgdGhpcy51cGRhdGVSZWNvcmRFbGFwc2VkVGltZSgwKTtcbiAgICB0aGlzLnVwZGF0ZVNob3dSZWNvcmRCdXR0b25zKGZhbHNlKTtcblxuICAgIHRoaXMudXBkYXRlSXNDb25maWd1cmVXaGl0ZWJvYXJkTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgICB0aGlzLnVwZGF0ZUlzV2hpdGVib2FyZE1vZGFsVmlzaWJsZShmYWxzZSk7XG4gICAgdGhpcy51cGRhdGVJc01lbnVNb2RhbFZpc2libGUoZmFsc2UpO1xuICAgIHRoaXMudXBkYXRlSXNSZWNvcmRpbmdNb2RhbFZpc2libGUoZmFsc2UpO1xuICAgIHRoaXMudXBkYXRlSXNQb2xsTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgICB0aGlzLnVwZGF0ZUlzQnJlYWtvdXRSb29tc01vZGFsVmlzaWJsZShmYWxzZSk7XG4gICAgdGhpcy51cGRhdGVJc0JhY2tncm91bmRNb2RhbFZpc2libGUoZmFsc2UpO1xuICAgIHRoaXMudXBkYXRlSXNMb2FkaW5nTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgICB0aGlzLnVwZGF0ZUlzQ29uZmlybUhlcmVNb2RhbFZpc2libGUoZmFsc2UpO1xuXG4gICAgYXdhaXQgc2xlZXAoeyBtczogNTAwIH0pO1xuICAgIHRoaXMudXBkYXRlVmFsaWRhdGVkKGZhbHNlKTtcbiAgICAvL2lmIG9uIHdlYiwgcmVsb2FkIHRoZSBwYWdlXG4gICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICB9XG5cbiAgY29tcHV0ZURpbWVuc2lvbnNNZXRob2QgPSAoe1xuICAgIGNvbnRhaW5lcldpZHRoRnJhY3Rpb24gPSAxLFxuICAgIGNvbnRhaW5lckhlaWdodEZyYWN0aW9uID0gMSxcbiAgICBtYWluU2l6ZSxcbiAgICBkb1N0YWNrID0gdHJ1ZSxcbiAgICBkZWZhdWx0RnJhY3Rpb24sXG4gIH06IHtcbiAgICBjb250YWluZXJXaWR0aEZyYWN0aW9uPzogbnVtYmVyO1xuICAgIGNvbnRhaW5lckhlaWdodEZyYWN0aW9uPzogbnVtYmVyO1xuICAgIG1haW5TaXplOiBudW1iZXI7XG4gICAgZG9TdGFjaz86IGJvb2xlYW47XG4gICAgZGVmYXVsdEZyYWN0aW9uOiBudW1iZXI7XG4gIH0pOiBDb21wb25lbnRTaXplcyA9PiB7XG4gICAgY29uc3QgcGFyZW50V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCAqIGNvbnRhaW5lcldpZHRoRnJhY3Rpb247XG4gICAgY29uc3QgcGFyZW50SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0ICogY29udGFpbmVySGVpZ2h0RnJhY3Rpb24gKiBkZWZhdWx0RnJhY3Rpb247XG4gICAgbGV0IGlzV2lkZVNjcmVlbiA9IHBhcmVudFdpZHRoID49IDc2ODtcblxuICAgIGlmICghaXNXaWRlU2NyZWVuICYmIHBhcmVudFdpZHRoID4gMS41ICogcGFyZW50SGVpZ2h0KSB7XG4gICAgICBpc1dpZGVTY3JlZW4gPSB0cnVlO1xuICAgIH1cblxuICAgIHRoaXMudXBkYXRlSXNXaWRlU2NyZWVuKGlzV2lkZVNjcmVlbik7XG5cbiAgICBjb25zdCBkaW1lbnNpb25zID0gdGhpcy5jYWxjdWxhdGVEaW1lbnNpb25zKHtcbiAgICAgIHBhcmVudFdpZHRoLFxuICAgICAgcGFyZW50SGVpZ2h0LFxuICAgICAgaXNXaWRlU2NyZWVuLFxuICAgICAgbWFpblNpemUsXG4gICAgICBkb1N0YWNrLFxuICAgIH0pO1xuICAgIHJldHVybiBkaW1lbnNpb25zO1xuICB9O1xuXG4gIGNhbGN1bGF0ZURpbWVuc2lvbnMoe1xuICAgIHBhcmVudFdpZHRoLFxuICAgIHBhcmVudEhlaWdodCxcbiAgICBpc1dpZGVTY3JlZW4sXG4gICAgbWFpblNpemUsXG4gICAgZG9TdGFjayxcbiAgfToge1xuICAgIHBhcmVudFdpZHRoOiBudW1iZXI7XG4gICAgcGFyZW50SGVpZ2h0OiBudW1iZXI7XG4gICAgaXNXaWRlU2NyZWVuOiBib29sZWFuO1xuICAgIG1haW5TaXplOiBudW1iZXI7XG4gICAgZG9TdGFjazogYm9vbGVhbjtcbiAgfSk6IENvbXBvbmVudFNpemVzIHtcbiAgICBpZiAoZG9TdGFjaykge1xuICAgICAgcmV0dXJuIGlzV2lkZVNjcmVlblxuICAgICAgICA/IHtcbiAgICAgICAgICAgIG1haW5IZWlnaHQ6IE1hdGguZmxvb3IocGFyZW50SGVpZ2h0KSxcbiAgICAgICAgICAgIG90aGVySGVpZ2h0OiBNYXRoLmZsb29yKHBhcmVudEhlaWdodCksXG4gICAgICAgICAgICBtYWluV2lkdGg6IE1hdGguZmxvb3IoKG1haW5TaXplIC8gMTAwKSAqIHBhcmVudFdpZHRoKSxcbiAgICAgICAgICAgIG90aGVyV2lkdGg6IE1hdGguZmxvb3IoKCgxMDAgLSBtYWluU2l6ZSkgLyAxMDApICogcGFyZW50V2lkdGgpLFxuICAgICAgICAgIH1cbiAgICAgICAgOiB7XG4gICAgICAgICAgICBtYWluSGVpZ2h0OiBNYXRoLmZsb29yKChtYWluU2l6ZSAvIDEwMCkgKiBwYXJlbnRIZWlnaHQpLFxuICAgICAgICAgICAgb3RoZXJIZWlnaHQ6IE1hdGguZmxvb3IoKCgxMDAgLSBtYWluU2l6ZSkgLyAxMDApICogcGFyZW50SGVpZ2h0KSxcbiAgICAgICAgICAgIG1haW5XaWR0aDogTWF0aC5mbG9vcihwYXJlbnRXaWR0aCksXG4gICAgICAgICAgICBvdGhlcldpZHRoOiBNYXRoLmZsb29yKHBhcmVudFdpZHRoKSxcbiAgICAgICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBtYWluSGVpZ2h0OiBNYXRoLmZsb29yKHBhcmVudEhlaWdodCksXG4gICAgICAgIG90aGVySGVpZ2h0OiBNYXRoLmZsb29yKHBhcmVudEhlaWdodCksXG4gICAgICAgIG1haW5XaWR0aDogTWF0aC5mbG9vcihwYXJlbnRXaWR0aCksXG4gICAgICAgIG90aGVyV2lkdGg6IE1hdGguZmxvb3IocGFyZW50V2lkdGgpLFxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVPcmllbnRhdGlvbkNoYW5nZSgpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5oYW5kbGVSZXNpemUuYmluZCh0aGlzKSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ29yaWVudGF0aW9uY2hhbmdlJywgdGhpcy5oYW5kbGVSZXNpemUuYmluZCh0aGlzKSk7XG4gIH1cblxuICBzZXR1cFJlc2l6ZUxpc3RlbmVyKCkge1xuICAgIHRoaXMuaGFuZGxlUmVzaXplKCk7XG4gIH1cblxuICBvcmllbnRhdGlvbiA9IHdpbmRvdy5pbm5lckhlaWdodCA+IHdpbmRvdy5pbm5lcldpZHRoID8gJ3BvcnRyYWl0JyA6ICdsYW5kc2NhcGUnO1xuXG4gIGFzeW5jIGpvaW5Sb29tKGRhdGE6IHtcbiAgICBzb2NrZXQ6IFNvY2tldDtcbiAgICByb29tTmFtZTogc3RyaW5nO1xuICAgIGlzbGV2ZWw6IHN0cmluZztcbiAgICBtZW1iZXI6IHN0cmluZztcbiAgICBzZWM6IHN0cmluZztcbiAgICBhcGlVc2VyTmFtZTogc3RyaW5nO1xuICB9KTogUHJvbWlzZTxSZXNwb25zZUpvaW5Sb29tIHwgbnVsbD4ge1xuICAgIGNvbnN0IHsgc29ja2V0LCByb29tTmFtZSwgaXNsZXZlbCwgbWVtYmVyLCBzZWMsIGFwaVVzZXJOYW1lIH0gPSBkYXRhO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlOiBSZXNwb25zZUpvaW5Sb29tIHwgbnVsbCA9IGF3YWl0IHRoaXMuam9pblJvb21DbGllbnQuam9pblJvb21DbGllbnQoe1xuICAgICAgICBzb2NrZXQsXG4gICAgICAgIHJvb21OYW1lLFxuICAgICAgICBpc2xldmVsLFxuICAgICAgICBtZW1iZXIsXG4gICAgICAgIHNlYyxcbiAgICAgICAgYXBpVXNlck5hbWUsXG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZygnRXJyb3Igam9pbmluZyByb29tOicsIGVycm9yKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIGpvaW4gdGhlIHJvb20uIFBsZWFzZSBjaGVjayB5b3VyIGNvbm5lY3Rpb24gYW5kIHRyeSBhZ2Fpbi4nKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBqb2luX1Jvb20oe1xuICAgIHNvY2tldCxcbiAgICByb29tTmFtZSxcbiAgICBpc2xldmVsLFxuICAgIG1lbWJlcixcbiAgICBzZWMsXG4gICAgYXBpVXNlck5hbWUsXG4gIH06IHtcbiAgICBzb2NrZXQ6IFNvY2tldDtcbiAgICByb29tTmFtZTogc3RyaW5nO1xuICAgIGlzbGV2ZWw6IHN0cmluZztcbiAgICBtZW1iZXI6IHN0cmluZztcbiAgICBzZWM6IHN0cmluZztcbiAgICBhcGlVc2VyTmFtZTogc3RyaW5nO1xuICB9KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgZGF0YTogUmVzcG9uc2VKb2luUm9vbSB8IG51bGwgPSBhd2FpdCB0aGlzLmpvaW5Sb29tKHtcbiAgICAgIHNvY2tldDogc29ja2V0LFxuICAgICAgcm9vbU5hbWU6IHJvb21OYW1lLFxuICAgICAgaXNsZXZlbDogaXNsZXZlbCxcbiAgICAgIG1lbWJlcjogbWVtYmVyLFxuICAgICAgc2VjOiBzZWMsXG4gICAgICBhcGlVc2VyTmFtZTogYXBpVXNlck5hbWUsXG4gICAgfSk7XG5cbiAgICBpZiAoZGF0YSAmJiBkYXRhLnN1Y2Nlc3MpIHtcbiAgICAgIHRoaXMucm9vbURhdGEubmV4dChkYXRhKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy51cGRhdGVSb29tUGFyYW1ldGVyc0NsaWVudC51cGRhdGVSb29tUGFyYW1ldGVyc0NsaWVudCh7XG4gICAgICAgICAgcGFyYW1ldGVyczoge1xuICAgICAgICAgICAgLi4udGhpcy5nZXRBbGxQYXJhbXMoKSxcbiAgICAgICAgICAgIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSxcbiAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGRhdGEuaXNIb3N0KSB7XG4gICAgICAgICAgdGhpcy51cGRhdGVJc2xldmVsKCcyJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy51cGRhdGVJc2xldmVsKCcxJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGF0YS5zZWN1cmVDb2RlKSB7XG4gICAgICAgICAgdGhpcy51cGRhdGVBZG1pblBhc3Njb2RlKGRhdGEuc2VjdXJlQ29kZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGF0YS5ydHBDYXBhYmlsaXRpZXMpIHtcbiAgICAgICAgICBjb25zdCBkZXZpY2VfID0gYXdhaXQgdGhpcy5jcmVhdGVEZXZpY2VDbGllbnQuY3JlYXRlRGV2aWNlQ2xpZW50KHtcbiAgICAgICAgICAgIHJ0cENhcGFiaWxpdGllczogZGF0YS5ydHBDYXBhYmlsaXRpZXMsXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpZiAoZGV2aWNlXykge1xuICAgICAgICAgICAgdGhpcy5kZXZpY2UubmV4dChkZXZpY2VfKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2gge1xuICAgICAgICAvKiBoYW5kbGUgZXJyb3IgKi9cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy51cGRhdGVWYWxpZGF0ZWQoZmFsc2UpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKHRoaXMuc2hvd0FsZXJ0ICYmIGRhdGE/LnJlYXNvbikge1xuICAgICAgICAgIHRoaXMuc2hvd0FsZXJ0KHsgbWVzc2FnZTogZGF0YT8ucmVhc29uLCB0eXBlOiAnZGFuZ2VyJywgZHVyYXRpb246IDMwMDAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2gge1xuICAgICAgICAvKiBoYW5kbGUgZXJyb3IgKi9cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB1cGRhdGVTdGF0ZXNUb0luaXRpYWxWYWx1ZXMgPSBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgaW5pdGlhbFZhbHVlcyA9IGluaXRpYWxWYWx1ZXNTdGF0ZSBhcyB7IFtrZXk6IHN0cmluZ106IGFueSB9O1xuICAgIGNvbnN0IHVwZGF0ZUZ1bmN0aW9ucyA9IHRoaXMuZ2V0QWxsUGFyYW1zKCkgYXMgdW5rbm93biBhcyB7XG4gICAgICBba2V5OiBzdHJpbmddOiAodmFsdWU6IGFueSkgPT4gdm9pZDtcbiAgICB9O1xuXG4gICAgZm9yIChjb25zdCBrZXkgaW4gaW5pdGlhbFZhbHVlcykge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChpbml0aWFsVmFsdWVzLCBrZXkpKSB7XG4gICAgICAgIGNvbnN0IHVwZGF0ZUZ1bmN0aW9uTmFtZSA9IGB1cGRhdGUke2tleS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGtleS5zbGljZSgxKX1gO1xuICAgICAgICBjb25zdCB1cGRhdGVGdW5jdGlvbiA9IHVwZGF0ZUZ1bmN0aW9uc1t1cGRhdGVGdW5jdGlvbk5hbWVdO1xuXG4gICAgICAgIGlmICh0eXBlb2YgdXBkYXRlRnVuY3Rpb24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgdXBkYXRlRnVuY3Rpb24oaW5pdGlhbFZhbHVlc1trZXldKTtcbiAgICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAgIC8qIGhhbmRsZSBlcnJvciAqL1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBmYU1pY3JvcGhvbmUgPSBmYU1pY3JvcGhvbmU7XG4gIGZhTWljcm9waG9uZVNsYXNoID0gZmFNaWNyb3Bob25lU2xhc2g7XG4gIGZhVmlkZW8gPSBmYVZpZGVvO1xuICBmYVZpZGVvU2xhc2ggPSBmYVZpZGVvU2xhc2g7XG4gIGZhU3luYyA9IGZhU3luYztcbiAgZmFQaG9uZSA9IGZhUGhvbmU7XG4gIGZhU2hhcmVBbHQgPSBmYVNoYXJlQWx0O1xuICBmYUNvbW1lbnRzID0gZmFDb21tZW50cztcblxuICBvbkNsb3NlTWVudU1vZGFsID0gKCkgPT4ge1xuICAgIHRoaXMudXBkYXRlSXNNZW51TW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgfTtcblxuICBvbkV2ZW50U2V0dGluZ3NDbG9zZSA9ICgpID0+IHtcbiAgICB0aGlzLnVwZGF0ZUlzU2V0dGluZ3NNb2RhbFZpc2libGUoZmFsc2UpO1xuICB9O1xuXG4gIG9uQ29Ib3N0Q2xvc2UgPSAoKSA9PiB7XG4gICAgdGhpcy51cGRhdGVJc0NvSG9zdE1vZGFsVmlzaWJsZShmYWxzZSk7XG4gIH07XG5cbiAgb25NZWRpYVNldHRpbmdzQ2xvc2UgPSAoKSA9PiB7XG4gICAgdGhpcy51cGRhdGVJc01lZGlhU2V0dGluZ3NNb2RhbFZpc2libGUoZmFsc2UpO1xuICB9O1xuXG4gIG9uRGlzcGxheVNldHRpbmdzQ2xvc2UgPSAoKSA9PiB7XG4gICAgdGhpcy51cGRhdGVJc0Rpc3BsYXlTZXR0aW5nc01vZGFsVmlzaWJsZShmYWxzZSk7XG4gIH07XG5cbiAgb25Qb2xsQ2xvc2UgPSAoKSA9PiB7XG4gICAgdGhpcy51cGRhdGVJc1BvbGxNb2RhbFZpc2libGUoZmFsc2UpO1xuICB9O1xuXG4gIG9uQnJlYWtvdXRSb29tc0Nsb3NlID0gKCkgPT4ge1xuICAgIHRoaXMudXBkYXRlSXNCcmVha291dFJvb21zTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgfTtcblxuICBvbkNvbmZpZ3VyZVdoaXRlYm9hcmRDbG9zZSA9ICgpID0+IHtcbiAgICB0aGlzLnVwZGF0ZUlzQ29uZmlndXJlV2hpdGVib2FyZE1vZGFsVmlzaWJsZShmYWxzZSk7XG4gIH07XG5cbiAgb25NZXNzYWdlc0Nsb3NlID0gKCkgPT4ge1xuICAgIHRoaXMudXBkYXRlSXNNZXNzYWdlc01vZGFsVmlzaWJsZShmYWxzZSk7XG4gIH07XG5cbiAgb25SZWNvcmRpbmdDbG9zZSA9ICgpID0+IHtcbiAgICB0aGlzLnVwZGF0ZUlzUmVjb3JkaW5nTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgfTtcblxuICBvblBhcnRpY2lwYW50c0Nsb3NlID0gKCkgPT4ge1xuICAgIHRoaXMudXBkYXRlSXNQYXJ0aWNpcGFudHNNb2RhbFZpc2libGUoZmFsc2UpO1xuICB9O1xuXG4gIG9uQmFja2dyb3VuZENsb3NlID0gKCkgPT4ge1xuICAgIHRoaXMudXBkYXRlSXNCYWNrZ3JvdW5kTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgfTtcblxuICBvbkNvbmZpcm1FeGl0Q2xvc2UgPSAoKSA9PiB7XG4gICAgdGhpcy51cGRhdGVJc0NvbmZpcm1FeGl0TW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgfTtcblxuICBvbkNvbmZpcm1IZXJlQ2xvc2UgPSAoKSA9PiB7XG4gICAgdGhpcy51cGRhdGVJc0NvbmZpcm1IZXJlTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgfTtcblxuICBvblNjcmVlbmJvYXJkQ2xvc2UgPSAoKSA9PiB7XG4gICAgdGhpcy51cGRhdGVJc1NjcmVlbmJvYXJkTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgfTtcblxuICBvblNoYXJlRXZlbnRDbG9zZSA9ICgpID0+IHtcbiAgICB0aGlzLnVwZGF0ZUlzU2hhcmVFdmVudE1vZGFsVmlzaWJsZShmYWxzZSk7XG4gIH07XG5cbiAgb25BbGVydEhpZGUgPSAoKSA9PiB7XG4gICAgdGhpcy51cGRhdGVBbGVydFZpc2libGUoZmFsc2UpO1xuICB9O1xuXG4gIG1lc3NhZ2VXaWRnZXQgPSB7XG4gICAgY29tcG9uZW50OiBNZXNzYWdlV2lkZ2V0LFxuICAgIGluamVjdG9yOiB0aGlzLmNyZWF0ZUluamVjdG9yKHtcbiAgICAgIGljb246IHRoaXMuZmFDb21tZW50cyxcbiAgICAgIHNob3dCYWRnZTogdGhpcy5zaG93TWVzc2FnZXNCYWRnZS52YWx1ZSxcbiAgICAgIGJhZGdlVmFsdWU6IDEsXG4gICAgICBpY29uQ29sb3I6ICdibGFjaycsXG4gICAgfSksXG4gIH07XG5cbiAgY29udHJvbENoYXRCdXR0b25zOiBCdXR0b25Ub3VjaFtdID0gW107XG5cbiAgY29udHJvbENoYXRCdXR0b25zQXJyYXk6IEJ1dHRvblRvdWNoW10gPSBbXG4gICAge1xuICAgICAgaWNvbjogdGhpcy5mYVNoYXJlQWx0LFxuICAgICAgYWN0aXZlOiB0cnVlLFxuICAgICAgYWx0ZXJuYXRlSWNvbjogdGhpcy5mYVNoYXJlQWx0LFxuICAgICAgb25QcmVzczogKCkgPT4gdGhpcy51cGRhdGVJc1NoYXJlRXZlbnRNb2RhbFZpc2libGUoIXRoaXMuaXNTaGFyZUV2ZW50TW9kYWxWaXNpYmxlLnZhbHVlKSxcbiAgICAgIGFjdGl2ZUNvbG9yOiAnYmxhY2snLFxuICAgICAgaW5BY3RpdmVDb2xvcjogJ2JsYWNrJyxcbiAgICAgIHNob3c6IHRydWUsXG4gICAgfSxcbiAgICB7XG4gICAgICBjdXN0b21Db21wb25lbnQ6IHRoaXMubWVzc2FnZVdpZGdldCxcbiAgICAgIG9uUHJlc3M6ICgpID0+XG4gICAgICAgIHRoaXMubGF1bmNoTWVzc2FnZXMubGF1bmNoTWVzc2FnZXMoe1xuICAgICAgICAgIHVwZGF0ZUlzTWVzc2FnZXNNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNNZXNzYWdlc01vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuICAgICAgICAgIGlzTWVzc2FnZXNNb2RhbFZpc2libGU6IHRoaXMuaXNNZXNzYWdlc01vZGFsVmlzaWJsZS52YWx1ZSxcbiAgICAgICAgfSksXG4gICAgICBzaG93OiB0cnVlLFxuICAgIH0sXG4gICAge1xuICAgICAgaWNvbjogdGhpcy5mYVN5bmMsXG4gICAgICBhY3RpdmU6IHRydWUsXG4gICAgICBhbHRlcm5hdGVJY29uOiB0aGlzLmZhU3luYyxcbiAgICAgIG9uUHJlc3M6ICgpID0+XG4gICAgICAgIHRoaXMuc3dpdGNoVmlkZW9BbHQuc3dpdGNoVmlkZW9BbHQoe1xuICAgICAgICAgIHBhcmFtZXRlcnM6IHtcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0QWxsUGFyYW1zKCksXG4gICAgICAgICAgICAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCksXG4gICAgICAgICAgfSxcbiAgICAgICAgfSksXG4gICAgICBhY3RpdmVDb2xvcjogJ2JsYWNrJyxcbiAgICAgIGluQWN0aXZlQ29sb3I6ICdibGFjaycsXG4gICAgICBzaG93OiB0cnVlLFxuICAgIH0sXG4gICAge1xuICAgICAgaWNvbjogdGhpcy5mYVZpZGVvU2xhc2gsXG4gICAgICBhbHRlcm5hdGVJY29uOiB0aGlzLmZhVmlkZW8sXG4gICAgICBhY3RpdmU6ICgpID0+IHRoaXMudmlkZW9BY3RpdmUudmFsdWUsXG4gICAgICBvblByZXNzOiAoKSA9PlxuICAgICAgICB0aGlzLmNsaWNrVmlkZW8uY2xpY2tWaWRlbyh7XG4gICAgICAgICAgcGFyYW1ldGVyczoge1xuICAgICAgICAgICAgLi4udGhpcy5nZXRBbGxQYXJhbXMoKSxcbiAgICAgICAgICAgIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KSxcbiAgICAgIGFjdGl2ZUNvbG9yOiAnZ3JlZW4nLFxuICAgICAgaW5BY3RpdmVDb2xvcjogJ3JlZCcsXG4gICAgICBzaG93OiB0cnVlLFxuICAgIH0sXG4gICAge1xuICAgICAgaWNvbjogdGhpcy5mYU1pY3JvcGhvbmVTbGFzaCxcbiAgICAgIGFsdGVybmF0ZUljb246IHRoaXMuZmFNaWNyb3Bob25lLFxuICAgICAgYWN0aXZlOiAoKSA9PiB0aGlzLm1pY0FjdGl2ZS52YWx1ZSxcbiAgICAgIG9uUHJlc3M6ICgpID0+XG4gICAgICAgIHRoaXMuY2xpY2tBdWRpby5jbGlja0F1ZGlvKHtcbiAgICAgICAgICBwYXJhbWV0ZXJzOiB7XG4gICAgICAgICAgICAuLi50aGlzLmdldEFsbFBhcmFtcygpLFxuICAgICAgICAgICAgLi4udGhpcy5tZWRpYVNGVUZ1bmN0aW9ucygpLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pLFxuICAgICAgYWN0aXZlQ29sb3I6ICdncmVlbicsXG4gICAgICBpbkFjdGl2ZUNvbG9yOiAncmVkJyxcbiAgICAgIHNob3c6IHRydWUsXG4gICAgfSxcbiAgICB7XG4gICAgICBpY29uOiB0aGlzLmZhUGhvbmUsXG4gICAgICBhY3RpdmU6IHRoaXMuZW5kQ2FsbEFjdGl2ZS52YWx1ZSxcbiAgICAgIG9uUHJlc3M6ICgpID0+XG4gICAgICAgIHRoaXMubGF1bmNoQ29uZmlybUV4aXQubGF1bmNoQ29uZmlybUV4aXQoe1xuICAgICAgICAgIHVwZGF0ZUlzQ29uZmlybUV4aXRNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNDb25maXJtRXhpdE1vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuICAgICAgICAgIGlzQ29uZmlybUV4aXRNb2RhbFZpc2libGU6IHRoaXMuaXNDb25maXJtRXhpdE1vZGFsVmlzaWJsZS52YWx1ZSxcbiAgICAgICAgfSksXG4gICAgICBhY3RpdmVDb2xvcjogJ2dyZWVuJyxcbiAgICAgIGluQWN0aXZlQ29sb3I6ICdyZWQnLFxuICAgICAgc2hvdzogdHJ1ZSxcbiAgICB9LFxuICBdO1xuXG4gIHVwZGF0ZUNvbnRyb2xDaGF0QnV0dG9ucygpIHtcbiAgICB0aGlzLmNvbnRyb2xDaGF0QnV0dG9ucyA9IHRoaXMuY29udHJvbENoYXRCdXR0b25zQXJyYXkubWFwKChidXR0b24pID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLmJ1dHRvbixcbiAgICAgICAgc2hvdzogdHlwZW9mIGJ1dHRvbi5zaG93ID09PSAnZnVuY3Rpb24nID8gYnV0dG9uLnNob3coKSA6IGJ1dHRvbi5zaG93LFxuICAgICAgICBhY3RpdmU6IHR5cGVvZiBidXR0b24uYWN0aXZlID09PSAnZnVuY3Rpb24nID8gYnV0dG9uLmFjdGl2ZSgpIDogYnV0dG9uLmFjdGl2ZSxcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBjb25uZWN0X1NvY2tldChcbiAgICBhcGlVc2VyTmFtZTogc3RyaW5nLFxuICAgIGFwaUtleTogc3RyaW5nLFxuICAgIGFwaVRva2VuOiBzdHJpbmcsXG4gICk6IFByb21pc2U8U29ja2V0IHwgbnVsbD4ge1xuICAgIGlmICh0aGlzLnNvY2tldC52YWx1ZSAmJiB0aGlzLnNvY2tldC52YWx1ZS5pZCkge1xuICAgICAgdGhpcy5zb2NrZXQudmFsdWUub24oJ2Rpc2Nvbm5lY3QnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGF3YWl0IHRoaXMuZGlzY29ubmVjdC5kaXNjb25uZWN0KHtcbiAgICAgICAgICBzaG93QWxlcnQ6IHRoaXMuc2hvd0FsZXJ0LmJpbmQodGhpcyksXG4gICAgICAgICAgcmVkaXJlY3RVUkw6IHRoaXMucmVkaXJlY3RVUkwudmFsdWUsXG4gICAgICAgICAgb25XZWI6IHRydWUsXG4gICAgICAgICAgdXBkYXRlVmFsaWRhdGVkOiB0aGlzLnVwZGF0ZVZhbGlkYXRlZC5iaW5kKHRoaXMpLFxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHRoaXMudmlkZW9BbHJlYWR5T24udmFsdWUpIHtcbiAgICAgICAgICBhd2FpdCB0aGlzLmNsaWNrVmlkZW8uY2xpY2tWaWRlbyh7XG4gICAgICAgICAgICBwYXJhbWV0ZXJzOiB7IC4uLnRoaXMuZ2V0QWxsUGFyYW1zKCksIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmF1ZGlvQWxyZWFkeU9uLnZhbHVlKSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5jbGlja0F1ZGlvLmNsaWNrQXVkaW8oe1xuICAgICAgICAgICAgcGFyYW1ldGVyczogeyAuLi50aGlzLmdldEFsbFBhcmFtcygpLCAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCkgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGF3YWl0IHRoaXMuY2xvc2VBbmRSZXNldCgpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuc29ja2V0LnZhbHVlLm9uKCdhbGxNZW1iZXJzJywgYXN5bmMgKG1lbWJlcnNEYXRhOiBBbGxNZW1iZXJzRGF0YSkgPT4ge1xuICAgICAgICBpZiAobWVtYmVyc0RhdGEpIHtcbiAgICAgICAgICBhd2FpdCB0aGlzLmFsbE1lbWJlcnMuYWxsTWVtYmVycyh7XG4gICAgICAgICAgICBhcGlVc2VyTmFtZTogYXBpVXNlck5hbWUsXG4gICAgICAgICAgICBhcGlLZXk6ICcnLCAvL25vdCByZWNvbW1lbmRlZCAtIHVzZSBhcGlUb2tlbiBpbnN0ZWFkLiBVc2UgZm9yIHRlc3RpbmcvZGV2ZWxvcG1lbnQgb25seVxuICAgICAgICAgICAgYXBpVG9rZW46IGFwaVRva2VuLFxuICAgICAgICAgICAgbWVtYmVyczogbWVtYmVyc0RhdGEubWVtYmVycyxcbiAgICAgICAgICAgIHJlcXVlc3RzczogbWVtYmVyc0RhdGEucmVxdWVzdHMgPyBtZW1iZXJzRGF0YS5yZXF1ZXN0cyA6IHRoaXMucmVxdWVzdExpc3QudmFsdWUsXG4gICAgICAgICAgICBjb0hvc3RlOiBtZW1iZXJzRGF0YS5jb0hvc3QgPyBtZW1iZXJzRGF0YS5jb0hvc3QgOiB0aGlzLmNvSG9zdC52YWx1ZSxcbiAgICAgICAgICAgIGNvSG9zdFJlczogbWVtYmVyc0RhdGEuY29Ib3N0UmVzcG9uc2liaWxpdGllc1xuICAgICAgICAgICAgICA/IG1lbWJlcnNEYXRhLmNvSG9zdFJlc3BvbnNpYmlsaXRpZXNcbiAgICAgICAgICAgICAgOiB0aGlzLmNvSG9zdFJlc3BvbnNpYmlsaXR5LnZhbHVlLFxuICAgICAgICAgICAgcGFyYW1ldGVyczogeyAuLi50aGlzLmdldEFsbFBhcmFtcygpLCAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCkgfSxcbiAgICAgICAgICAgIGNvbnN1bWVfc29ja2V0czogdGhpcy5jb25zdW1lX3NvY2tldHMudmFsdWUsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnNvY2tldC52YWx1ZS5vbignYWxsTWVtYmVyc1Jlc3QnLCBhc3luYyAobWVtYmVyc0RhdGE6IEFsbE1lbWJlcnNSZXN0RGF0YSkgPT4ge1xuICAgICAgICBpZiAobWVtYmVyc0RhdGEpIHtcbiAgICAgICAgICBhd2FpdCB0aGlzLmFsbE1lbWJlcnNSZXN0LmFsbE1lbWJlcnNSZXN0KHtcbiAgICAgICAgICAgIGFwaVVzZXJOYW1lOiBhcGlVc2VyTmFtZSxcbiAgICAgICAgICAgIGFwaUtleTogJycsIC8vIG5vdCByZWNvbW1lbmRlZCAtIHVzZSBhcGlUb2tlbiBpbnN0ZWFkLiBVc2UgZm9yIHRlc3RpbmcvZGV2ZWxvcG1lbnQgb25seVxuICAgICAgICAgICAgbWVtYmVyczogbWVtYmVyc0RhdGEubWVtYmVycyxcbiAgICAgICAgICAgIGFwaVRva2VuOiBhcGlUb2tlbixcbiAgICAgICAgICAgIHNldHRpbmdzOiBtZW1iZXJzRGF0YS5zZXR0aW5ncyxcbiAgICAgICAgICAgIGNvSG9zdGU6IG1lbWJlcnNEYXRhLmNvSG9zdCA/IG1lbWJlcnNEYXRhLmNvSG9zdCA6IHRoaXMuY29Ib3N0LnZhbHVlLFxuICAgICAgICAgICAgY29Ib3N0UmVzOiBtZW1iZXJzRGF0YS5jb0hvc3RSZXNwb25zaWJpbGl0aWVzXG4gICAgICAgICAgICAgID8gbWVtYmVyc0RhdGEuY29Ib3N0UmVzcG9uc2liaWxpdGllc1xuICAgICAgICAgICAgICA6IHRoaXMuY29Ib3N0UmVzcG9uc2liaWxpdHkudmFsdWUsXG4gICAgICAgICAgICBwYXJhbWV0ZXJzOiB7IC4uLnRoaXMuZ2V0QWxsUGFyYW1zKCksIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSB9LFxuICAgICAgICAgICAgY29uc3VtZV9zb2NrZXRzOiB0aGlzLmNvbnN1bWVfc29ja2V0cy52YWx1ZSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuc29ja2V0LnZhbHVlLm9uKFxuICAgICAgICAncHJvZHVjZXItbWVkaWEtcGF1c2VkJyxcbiAgICAgICAgYXN5bmMgKHtcbiAgICAgICAgICBwcm9kdWNlcklkLFxuICAgICAgICAgIGtpbmQsXG4gICAgICAgICAgbmFtZSxcbiAgICAgICAgfToge1xuICAgICAgICAgIHByb2R1Y2VySWQ6IHN0cmluZztcbiAgICAgICAgICBraW5kOiAndmlkZW8nIHwgJ2F1ZGlvJyB8ICdzY3JlZW5zaGFyZScgfCAnc2NyZWVuJztcbiAgICAgICAgICBuYW1lOiBzdHJpbmc7XG4gICAgICAgIH0pID0+IHtcbiAgICAgICAgICBhd2FpdCB0aGlzLnByb2R1Y2VyTWVkaWFQYXVzZWQucHJvZHVjZXJNZWRpYVBhdXNlZCh7XG4gICAgICAgICAgICBwcm9kdWNlcklkLFxuICAgICAgICAgICAga2luZCxcbiAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICBwYXJhbWV0ZXJzOiB7IC4uLnRoaXMuZ2V0QWxsUGFyYW1zKCksIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgKTtcblxuICAgICAgdGhpcy5zb2NrZXQudmFsdWUub24oXG4gICAgICAgICdwcm9kdWNlci1tZWRpYS1yZXN1bWVkJyxcbiAgICAgICAgYXN5bmMgKHsga2luZCwgbmFtZSB9OiB7IGtpbmQ6ICdhdWRpbyc7IG5hbWU6IHN0cmluZyB9KSA9PiB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5wcm9kdWNlck1lZGlhUmVzdW1lZC5wcm9kdWNlck1lZGlhUmVzdW1lZCh7XG4gICAgICAgICAgICBraW5kLFxuICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgIHBhcmFtZXRlcnM6IHsgLi4udGhpcy5nZXRBbGxQYXJhbXMoKSwgLi4udGhpcy5tZWRpYVNGVUZ1bmN0aW9ucygpIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICApO1xuXG4gICAgICB0aGlzLnNvY2tldC52YWx1ZS5vbihcbiAgICAgICAgJ3Byb2R1Y2VyLW1lZGlhLWNsb3NlZCcsXG4gICAgICAgIGFzeW5jICh7XG4gICAgICAgICAgcHJvZHVjZXJJZCxcbiAgICAgICAgICBraW5kLFxuICAgICAgICB9OiB7XG4gICAgICAgICAgcHJvZHVjZXJJZDogc3RyaW5nO1xuICAgICAgICAgIGtpbmQ6ICd2aWRlbycgfCAnYXVkaW8nIHwgJ3NjcmVlbnNoYXJlJyB8ICdzY3JlZW4nO1xuICAgICAgICB9KSA9PiB7XG4gICAgICAgICAgaWYgKHByb2R1Y2VySWQgJiYga2luZCkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wcm9kdWNlck1lZGlhQ2xvc2VkLnByb2R1Y2VyTWVkaWFDbG9zZWQoe1xuICAgICAgICAgICAgICBwcm9kdWNlcklkLFxuICAgICAgICAgICAgICBraW5kLFxuICAgICAgICAgICAgICBwYXJhbWV0ZXJzOiB7IC4uLnRoaXMuZ2V0QWxsUGFyYW1zKCksIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgKTtcblxuICAgICAgdGhpcy5zb2NrZXQudmFsdWUub24oJ21lZXRpbmdFbmRlZCcsIGFzeW5jICgpID0+IHtcbiAgICAgICAgYXdhaXQgdGhpcy5tZWV0aW5nRW5kZWQubWVldGluZ0VuZGVkKHtcbiAgICAgICAgICBzaG93QWxlcnQ6IHRoaXMuc2hvd0FsZXJ0LmJpbmQodGhpcyksXG4gICAgICAgICAgcmVkaXJlY3RVUkw6IHRoaXMucmVkaXJlY3RVUkwudmFsdWUsXG4gICAgICAgICAgb25XZWI6IHRydWUsXG4gICAgICAgICAgZXZlbnRUeXBlOiB0aGlzLmV2ZW50VHlwZS52YWx1ZSxcbiAgICAgICAgICB1cGRhdGVWYWxpZGF0ZWQ6IHRoaXMudXBkYXRlVmFsaWRhdGVkLmJpbmQodGhpcyksXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0aGlzLnZpZGVvQWxyZWFkeU9uLnZhbHVlKSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5jbGlja1ZpZGVvLmNsaWNrVmlkZW8oe1xuICAgICAgICAgICAgcGFyYW1ldGVyczoge1xuICAgICAgICAgICAgICAuLi50aGlzLmdldEFsbFBhcmFtcygpLFxuICAgICAgICAgICAgICAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmF1ZGlvQWxyZWFkeU9uLnZhbHVlKSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5jbGlja0F1ZGlvLmNsaWNrQXVkaW8oe1xuICAgICAgICAgICAgcGFyYW1ldGVyczoge1xuICAgICAgICAgICAgICAuLi50aGlzLmdldEFsbFBhcmFtcygpLFxuICAgICAgICAgICAgICAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgYXdhaXQgdGhpcy5jbG9zZUFuZFJlc2V0KCk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5zb2NrZXQudmFsdWUub24oJ2Rpc2Nvbm5lY3RVc2VyU2VsZicsIGFzeW5jICgpID0+IHtcbiAgICAgICAgYXdhaXQgdGhpcy5kaXNjb25uZWN0VXNlclNlbGYuZGlzY29ubmVjdFVzZXJTZWxmKHtcbiAgICAgICAgICBzb2NrZXQ6IHRoaXMuc29ja2V0LnZhbHVlLFxuICAgICAgICAgIG1lbWJlcjogdGhpcy5tZW1iZXIudmFsdWUsXG4gICAgICAgICAgcm9vbU5hbWU6IHRoaXMucm9vbU5hbWUudmFsdWUsXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuc29ja2V0LnZhbHVlLm9uKCdyZWNlaXZlTWVzc2FnZScsIGFzeW5jICh7IG1lc3NhZ2UgfTogeyBtZXNzYWdlOiBNZXNzYWdlIH0pID0+IHtcbiAgICAgICAgYXdhaXQgdGhpcy5yZWNlaXZlTWVzc2FnZS5yZWNlaXZlTWVzc2FnZSh7XG4gICAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgICBtZXNzYWdlczogdGhpcy5tZXNzYWdlcy52YWx1ZSxcbiAgICAgICAgICBwYXJ0aWNpcGFudHNBbGw6IHRoaXMucGFydGljaXBhbnRzQWxsLnZhbHVlLFxuICAgICAgICAgIG1lbWJlcjogdGhpcy5tZW1iZXIudmFsdWUsXG4gICAgICAgICAgZXZlbnRUeXBlOiB0aGlzLmV2ZW50VHlwZS52YWx1ZSxcbiAgICAgICAgICBpc2xldmVsOiB0aGlzLmlzbGV2ZWwudmFsdWUsXG4gICAgICAgICAgY29Ib3N0OiB0aGlzLmNvSG9zdC52YWx1ZSxcbiAgICAgICAgICB1cGRhdGVNZXNzYWdlczogdGhpcy51cGRhdGVNZXNzYWdlcy5iaW5kKHRoaXMpLFxuICAgICAgICAgIHVwZGF0ZVNob3dNZXNzYWdlc0JhZGdlOiB0aGlzLnVwZGF0ZVNob3dNZXNzYWdlc0JhZGdlLmJpbmQodGhpcyksXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuc29ja2V0LnZhbHVlLm9uKFxuICAgICAgICAnbWVldGluZ1RpbWVSZW1haW5pbmcnLFxuICAgICAgICBhc3luYyAoeyB0aW1lUmVtYWluaW5nIH06IHsgdGltZVJlbWFpbmluZzogbnVtYmVyIH0pID0+IHtcbiAgICAgICAgICBhd2FpdCB0aGlzLm1lZXRpbmdUaW1lUmVtYWluaW5nLm1lZXRpbmdUaW1lUmVtYWluaW5nKHtcbiAgICAgICAgICAgIHRpbWVSZW1haW5pbmcsXG4gICAgICAgICAgICBzaG93QWxlcnQ6IHRoaXMuc2hvd0FsZXJ0LmJpbmQodGhpcyksXG4gICAgICAgICAgICBldmVudFR5cGU6IHRoaXMuZXZlbnRUeXBlLnZhbHVlLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgKTtcblxuICAgICAgdGhpcy5zb2NrZXQudmFsdWUub24oJ21lZXRpbmdTdGlsbFRoZXJlJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICB0aGlzLm1lZXRpbmdTdGlsbFRoZXJlLm1lZXRpbmdTdGlsbFRoZXJlKHtcbiAgICAgICAgICB1cGRhdGVJc0NvbmZpcm1IZXJlTW9kYWxWaXNpYmxlOiB0aGlzLnVwZGF0ZUlzQ29uZmlybUhlcmVNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5zb2NrZXQudmFsdWUub24oXG4gICAgICAgICd1cGRhdGVDb25zdW1pbmdEb21haW5zJyxcbiAgICAgICAgYXN5bmMgKHsgZG9tYWlucywgYWx0X2RvbWFpbnMgfTogVXBkYXRlQ29uc3VtaW5nRG9tYWluc0RhdGEpID0+IHtcbiAgICAgICAgICBhd2FpdCB0aGlzLnVwZGF0ZUNvbnN1bWluZ0RvbWFpbnMudXBkYXRlQ29uc3VtaW5nRG9tYWlucyh7XG4gICAgICAgICAgICBkb21haW5zLFxuICAgICAgICAgICAgYWx0X2RvbWFpbnMsXG4gICAgICAgICAgICBhcGlVc2VyTmFtZSxcbiAgICAgICAgICAgIGFwaUtleSxcbiAgICAgICAgICAgIGFwaVRva2VuLFxuICAgICAgICAgICAgcGFyYW1ldGVyczoge1xuICAgICAgICAgICAgICAuLi50aGlzLmdldEFsbFBhcmFtcygpLFxuICAgICAgICAgICAgICAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgKTtcblxuICAgICAgYXdhaXQgdGhpcy5qb2luX1Jvb20oe1xuICAgICAgICBzb2NrZXQ6IHRoaXMuc29ja2V0LnZhbHVlLFxuICAgICAgICByb29tTmFtZTogdGhpcy5yb29tTmFtZS52YWx1ZSxcbiAgICAgICAgaXNsZXZlbDogdGhpcy5pc2xldmVsLnZhbHVlLFxuICAgICAgICBtZW1iZXI6IHRoaXMubWVtYmVyLnZhbHVlLFxuICAgICAgICBzZWM6IHRoaXMuYXBpVG9rZW4udmFsdWUsXG4gICAgICAgIGFwaVVzZXJOYW1lOiB0aGlzLmFwaVVzZXJOYW1lLnZhbHVlLFxuICAgICAgfSk7XG4gICAgICBhd2FpdCB0aGlzLnJlY2VpdmVSb29tTWVzc2FnZXMucmVjZWl2ZVJvb21NZXNzYWdlcyh7XG4gICAgICAgIHNvY2tldDogdGhpcy5zb2NrZXQudmFsdWUsXG4gICAgICAgIHJvb21OYW1lOiB0aGlzLnJvb21OYW1lLnZhbHVlLFxuICAgICAgICB1cGRhdGVNZXNzYWdlczogdGhpcy51cGRhdGVNZXNzYWdlcy5iaW5kKHRoaXMpLFxuICAgICAgfSk7XG4gICAgICB0aGlzLnByZXBvcHVsYXRlVXNlck1lZGlhLnByZXBvcHVsYXRlVXNlck1lZGlhKHtcbiAgICAgICAgbmFtZTogdGhpcy5ob3N0TGFiZWwudmFsdWUsXG4gICAgICAgIHBhcmFtZXRlcnM6IHsgLi4udGhpcy5nZXRBbGxQYXJhbXMoKSwgLi4udGhpcy5tZWRpYVNGVUZ1bmN0aW9ucygpIH0sXG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHRoaXMuc29ja2V0LnZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cbn1cbiJdfQ==