import { Component, HostListener, Injector, Input, } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { faMicrophoneSlash, faVideoSlash, faPhone, faUsers, faComments, faShareAlt, faSync, faChartBar, faRecordVinyl, faCog, faPlayCircle, faPauseCircle, faStopCircle, faDotCircle, faVideo, faMicrophone, } from '@fortawesome/free-solid-svg-icons';
import { initialValuesState } from '../../methods/utils/initial-values.util';
// Components for display
import { MainAspectComponent } from '../display-components/main-aspect-component/main-aspect-component.component';
import { LoadingModal } from '../display-components/loading-modal/loading-modal.component';
import { ControlButtonsComponentTouch } from '../display-components/control-buttons-component-touch/control-buttons-component-touch.component';
import { MainScreenComponent } from '../display-components/main-screen-component/main-screen-component.component';
import { MainGridComponent } from '../display-components/main-grid-component/main-grid-component.component';
import { MainContainerComponent } from '../display-components/main-container-component/main-container-component.component';
import { AlertComponent } from '../display-components/alert-component/alert.component.component';
import { RecordingModal } from '../recording-components/recording-modal/recording-modal.component';
import { ParticipantsModal } from '../participants-components/participants-modal/participants-modal.component';
import { MessagesModal } from '../message-components/messages-modal/messages-modal.component';
import { ConfirmExitModal } from '../exit-components/confirm-exit-modal/confirm-exit-modal.component';
import { ConfirmHereModal } from '../misc-components/confirm-here-modal/confirm-here-modal.component';
import { ShareEventModal } from '../misc-components/share-event-modal/share-event-modal.component';
import { WelcomePage, } from '../misc-components/welcome-page/welcome-page.component';
// Pagination and display of media
import { FlexibleVideo } from '../display-components/flexible-video/flexible-video.component';
import { AudioGrid } from '../display-components/audio-grid/audio-grid.component';
import { MessageWidget } from '../display-components/control-widgets/message-widget.component';
import { MenuRecordWidget } from '../display-components/control-widgets/menu-record-widget.component';
import { RecordTimerWidget } from '../display-components/control-widgets/record-timer-widget.component';
import { MenuParticipantsWidget } from '../display-components/control-widgets/menu-participants-widget.component';
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
import * as i52 from "../../methods/recording-methods/launch-recording.service";
import * as i53 from "../../methods/recording-methods/start-recording.service";
import * as i54 from "../../methods/recording-methods/confirm-recording.service";
import * as i55 from "../../methods/participants-methods/launch-participants.service";
import * as i56 from "../../methods/message-methods/launch-messages.service";
import * as i57 from "../../methods/exit-methods/launch-confirm-exit.service";
import * as i58 from "../../methods/utils/meeting-timer/start-meeting-progress-timer.service";
import * as i59 from "../../methods/recording-methods/update-recording.service";
import * as i60 from "../../methods/recording-methods/stop-recording.service";
import * as i61 from "../../producers/socket-receive-methods/person-joined.service";
import * as i62 from "../../producers/socket-receive-methods/room-record-params.service";
import * as i63 from "../../producers/socket-receive-methods/ban-participant.service";
import * as i64 from "../../producers/socket-receive-methods/producer-media-paused.service";
import * as i65 from "../../producers/socket-receive-methods/producer-media-resumed.service";
import * as i66 from "../../producers/socket-receive-methods/producer-media-closed.service";
import * as i67 from "../../producers/socket-receive-methods/meeting-ended.service";
import * as i68 from "../../producers/socket-receive-methods/disconnect-user-self.service";
import * as i69 from "../../producers/socket-receive-methods/receive-message.service";
import * as i70 from "../../producers/socket-receive-methods/meeting-time-remaining.service";
import * as i71 from "../../producers/socket-receive-methods/meeting-still-there.service";
import * as i72 from "../../producers/socket-receive-methods/start-records.service";
import * as i73 from "../../producers/socket-receive-methods/re-initiate-recording.service";
import * as i74 from "../../producers/socket-receive-methods/recording-notice.service";
import * as i75 from "../../producers/socket-receive-methods/time-left-recording.service";
import * as i76 from "../../producers/socket-receive-methods/stopped-recording.service";
import * as i77 from "../../producers/socket-receive-methods/all-members.service";
import * as i78 from "../../producers/socket-receive-methods/all-members-rest.service";
import * as i79 from "../../producers/socket-receive-methods/disconnect.service";
import * as i80 from "../../sockets/socket-manager.service";
import * as i81 from "../../producer-client/producer-client-emits/join-room-client.service";
import * as i82 from "../../producer-client/producer-client-emits/update-room-parameters-client.service";
import * as i83 from "../../methods/stream-methods/click-video.service";
import * as i84 from "../../methods/stream-methods/click-audio.service";
import * as i85 from "../../methods/stream-methods/click-screen-share.service";
import * as i86 from "../../methods/stream-methods/switch-video-alt.service";
import * as i87 from "../../consumers/stream-success-video.service";
import * as i88 from "../../consumers/stream-success-audio.service";
import * as i89 from "../../consumers/stream-success-screen.service";
import * as i90 from "../../consumers/stream-success-audio-switch.service";
import * as i91 from "../../consumers/check-permission.service";
import * as i92 from "../../producers/socket-receive-methods/update-consuming-domains.service";
import * as i93 from "../../consumers/receive-room-messages.service";
import * as i94 from "@angular/common";
export class MediasfuBroadcast {
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
    launchRecording;
    startRecording;
    confirmRecording;
    launchParticipants;
    launchMessages;
    launchConfirmExit;
    startMeetingProgressTimer;
    updateRecording;
    stopRecording;
    personJoined;
    roomRecordParams;
    banParticipant;
    producerMediaPaused;
    producerMediaResumed;
    producerMediaClosed;
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
    title = 'MediaSFU-Broadcast';
    mainHeightWidthSubscription;
    validatedSubscription;
    islevelSubscription;
    coHostSubscription;
    buttonSubscriptions = [];
    ScreenboardSubscription;
    recordingSubscription;
    constructor(cdr, injector, updateMiniCardsGrid, mixStreams, dispStreams, stopShareScreen, checkScreenShare, startShareScreen, requestScreenShare, reorderStreams, prepopulateUserMedia, getVideos, rePort, trigger, consumerResume, connectSendTransport, connectSendTransportAudio, connectSendTransportVideo, connectSendTransportScreen, processConsumerTransports, resumePauseStreams, readjust, checkGrid, getEstimate, calculateRowsAndColumns, addVideosGrid, onScreenChanges, changeVids, compareActiveNames, compareScreenStates, createSendTransport, resumeSendTransportAudio, receiveAllPipedTransports, disconnectSendTransportVideo, disconnectSendTransportAudio, disconnectSendTransportScreen, getPipedProducersAlt, signalNewConsumerTransport, connectRecvTransport, reUpdateInter, updateParticipantAudioDecibels, closeAndResize, autoAdjust, switchUserVideoAlt, switchUserVideo, switchUserAudio, getDomains, formatNumber, connectIps, createDeviceClient, captureCanvasStream, resumePauseAudioStreams, processConsumerTransportsAudio, launchRecording, startRecording, confirmRecording, launchParticipants, launchMessages, launchConfirmExit, startMeetingProgressTimer, updateRecording, stopRecording, personJoined, roomRecordParams, banParticipant, producerMediaPaused, producerMediaResumed, producerMediaClosed, meetingEnded, disconnectUserSelf, receiveMessage, meetingTimeRemaining, meetingStillThere, startRecords, reInitiateRecording, recordingNotice, timeLeftRecording, stoppedRecording, allMembers, allMembersRest, disconnect, socketManager, joinRoomClient, updateRoomParametersClient, clickVideo, clickAudio, clickScreenShare, switchVideoAlt, streamSuccessVideo, streamSuccessAudio, streamSuccessScreen, streamSuccessAudioSwitch, checkPermission, updateConsumingDomains, receiveRoomMessages) {
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
        this.launchRecording = launchRecording;
        this.startRecording = startRecording;
        this.confirmRecording = confirmRecording;
        this.launchParticipants = launchParticipants;
        this.launchMessages = launchMessages;
        this.launchConfirmExit = launchConfirmExit;
        this.startMeetingProgressTimer = startMeetingProgressTimer;
        this.updateRecording = updateRecording;
        this.stopRecording = stopRecording;
        this.personJoined = personJoined;
        this.roomRecordParams = roomRecordParams;
        this.banParticipant = banParticipant;
        this.producerMediaPaused = producerMediaPaused;
        this.producerMediaResumed = producerMediaResumed;
        this.producerMediaClosed = producerMediaClosed;
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
    eventType = new BehaviorSubject('broadcast');
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
    mainHeightWidth = new BehaviorSubject(100);
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
        this.validatedSubscription = this.validated.subscribe((validated) => {
            if (validated) {
                this.handleValidated();
            }
        });
        this.islevelSubscription = this.islevel.subscribe((islevel) => {
            if (islevel) {
                this.updateControlBroadcastButtons();
            }
        });
        this.coHostSubscription = combineLatest([this.coHost, this.coHostResponsibility]).subscribe(([coHost, coHostResponsibility]) => {
            if (coHost || coHostResponsibility) {
                this.updateControlBroadcastButtons();
            }
        });
        // Subscribe to changes in BehaviorSubject and update the buttons accordingly
        this.buttonSubscriptions.push(this.micActive.subscribe(() => {
            this.updateControlBroadcastButtons();
        }));
        this.buttonSubscriptions.push(this.videoActive.subscribe(() => {
            this.updateControlBroadcastButtons();
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
    faMicrophone = faMicrophone;
    faMicrophoneSlash = faMicrophoneSlash;
    faVideo = faVideo;
    faVideoSlash = faVideoSlash;
    faSync = faSync;
    faPhone = faPhone;
    faShareAlt = faShareAlt;
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
        this.updateControlBroadcastButtons();
        this.cdr.markForCheck();
    }
    // Create instances of the custom widgets
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
    controlBroadcastButtons = [];
    updateControlBroadcastButtons() {
        this.controlBroadcastButtons = this.controlBroadcastButtonsArray.map((button) => {
            return {
                ...button,
                show: typeof button.show === 'function' ? button.show() : button.show,
                active: typeof button.active === 'function' ? button.active() : button.active,
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
            this.socket.value.on('personJoined', async ({ name }) => {
                this.personJoined.personJoined({
                    name,
                    showAlert: this.showAlert.bind(this),
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: MediasfuBroadcast, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.Injector }, { token: i1.UpdateMiniCardsGrid }, { token: i2.MixStreams }, { token: i3.DispStreams }, { token: i4.StopShareScreen }, { token: i5.CheckScreenShare }, { token: i6.StartShareScreen }, { token: i7.RequestScreenShare }, { token: i8.ReorderStreams }, { token: i9.PrepopulateUserMedia }, { token: i10.GetVideos }, { token: i11.RePort }, { token: i12.Trigger }, { token: i13.ConsumerResume }, { token: i14.ConnectSendTransport }, { token: i15.ConnectSendTransportAudio }, { token: i16.ConnectSendTransportVideo }, { token: i17.ConnectSendTransportScreen }, { token: i18.ProcessConsumerTransports }, { token: i19.ResumePauseStreams }, { token: i20.Readjust }, { token: i21.CheckGrid }, { token: i22.GetEstimate }, { token: i23.CalculateRowsAndColumns }, { token: i24.AddVideosGrid }, { token: i25.OnScreenChanges }, { token: i26.ChangeVids }, { token: i27.CompareActiveNames }, { token: i28.CompareScreenStates }, { token: i29.CreateSendTransport }, { token: i30.ResumeSendTransportAudio }, { token: i31.ReceiveAllPipedTransports }, { token: i32.DisconnectSendTransportVideo }, { token: i33.DisconnectSendTransportAudio }, { token: i34.DisconnectSendTransportScreen }, { token: i35.GetPipedProducersAlt }, { token: i36.SignalNewConsumerTransport }, { token: i37.ConnectRecvTransport }, { token: i38.ReUpdateInter }, { token: i39.UpdateParticipantAudioDecibels }, { token: i40.CloseAndResize }, { token: i41.AutoAdjust }, { token: i42.SwitchUserVideoAlt }, { token: i43.SwitchUserVideo }, { token: i44.SwitchUserAudio }, { token: i45.GetDomains }, { token: i46.FormatNumber }, { token: i47.ConnectIps }, { token: i48.CreateDeviceClient }, { token: i49.CaptureCanvasStream }, { token: i50.ResumePauseAudioStreams }, { token: i51.ProcessConsumerTransportsAudio }, { token: i52.LaunchRecording }, { token: i53.StartRecording }, { token: i54.ConfirmRecording }, { token: i55.LaunchParticipants }, { token: i56.LaunchMessages }, { token: i57.LaunchConfirmExit }, { token: i58.StartMeetingProgressTimer }, { token: i59.UpdateRecording }, { token: i60.StopRecording }, { token: i61.PersonJoined }, { token: i62.RoomRecordParams }, { token: i63.BanParticipant }, { token: i64.ProducerMediaPaused }, { token: i65.ProducerMediaResumed }, { token: i66.ProducerMediaClosed }, { token: i67.MeetingEnded }, { token: i68.DisconnectUserSelf }, { token: i69.ReceiveMessage }, { token: i70.MeetingTimeRemaining }, { token: i71.MeetingStillThere }, { token: i72.StartRecords }, { token: i73.ReInitiateRecording }, { token: i74.RecordingNotice }, { token: i75.TimeLeftRecording }, { token: i76.StoppedRecording }, { token: i77.AllMembers }, { token: i78.AllMembersRest }, { token: i79.Disconnect }, { token: i80.SocketManager }, { token: i81.JoinRoomClient }, { token: i82.UpdateRoomParametersClient }, { token: i83.ClickVideo }, { token: i84.ClickAudio }, { token: i85.ClickScreenShare }, { token: i86.SwitchVideoAlt }, { token: i87.StreamSuccessVideo }, { token: i88.StreamSuccessAudio }, { token: i89.StreamSuccessScreen }, { token: i90.StreamSuccessAudioSwitch }, { token: i91.CheckPermission }, { token: i92.UpdateConsumingDomains }, { token: i93.ReceiveRoomMessages }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.8", type: MediasfuBroadcast, isStandalone: true, selector: "app-mediasfu-broadcast", inputs: { PrejoinPage: "PrejoinPage", credentials: "credentials", useLocalUIMode: "useLocalUIMode", seedData: "seedData", useSeed: "useSeed", imgSrc: "imgSrc" }, host: { listeners: { "window:resize": "handleResize()", "window:orientationchange": "handleResize()" } }, providers: [CookieService], ngImport: i0, template: `
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
      <!-- Conditional Rendering: PrejoinPage or Main Content -->
      <ng-container *ngIf="!validated.value; else mainContent">
        <ng-container
          *ngComponentOutlet="
            PrejoinPageComponent.component;
            injector: PrejoinPageComponent.injector
          "
        >
        </ng-container>
      </ng-container>

      <!-- Main Content -->
      <ng-template #mainContent>
        <app-main-container-component>
          <!-- Main Aspect Component -->
          <app-main-aspect-component
            [backgroundColor]="'rgba(217, 227, 234, 0.99)'"
            [defaultFraction]="1 - controlHeight.value"
            [showControls]="eventType.value === 'webinar' || eventType.value === 'conference'"
            [updateIsWideScreen]="updateIsWideScreen"
            [updateIsMediumScreen]="updateIsMediumScreen"
            [updateIsSmallScreen]="updateIsSmallScreen"
          >
            <!-- Main Screen Component -->
            <app-main-screen-component
              [doStack]="true"
              [mainSize]="mainHeightWidth.value"
              [defaultFraction]="1 - controlHeight.value"
              [showControls]="eventType.value === 'webinar' || eventType.value === 'conference'"
              [updateComponentSizes]="updateComponentSizes"
            >
              <!-- Main Grid Component -->
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
                >
                </app-flexible-video>

                <!-- Control Buttons for Broadcast -->
                <app-control-buttons-component-touch
                  [buttons]="controlBroadcastButtons"
                  [position]="'right'"
                  [location]="'bottom'"
                  [direction]="'vertical'"
                  [showAspect]="eventType.value === 'broadcast'"
                ></app-control-buttons-component-touch>

                <!-- Recording Buttons -->
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

                <!-- AudioGrid -->
                <app-audio-grid [componentsToRender]="audioOnlyStreams.value"></app-audio-grid>
              </app-main-grid-component>

              <!-- Other Grid Component is not included in MediasfuBroadcast -->
            </app-main-screen-component>
          </app-main-aspect-component>
        </app-main-container-component>
      </ng-template>

      <!-- Modals to include -->
      <app-participants-modal
        [backgroundColor]="'rgba(217, 227, 234, 0.99)'"
        [isParticipantsModalVisible]="isParticipantsModalVisible.value"
        [onParticipantsClose]="onParticipantsClose"
        [participantsCounter]="participantsCounter.value"
        [onParticipantsFilterChange]="onParticipantsFilterChange"
        [parameters]="{
          updateParticipants: updateParticipants,
          updateIsParticipantsModalVisible: updateIsParticipantsModalVisible,
          updateDirectMessageDetails: updateDirectMessageDetails,
          updateStartDirectMessage: updateStartDirectMessage,
          updateIsMessagesModalVisible: updateIsMessagesModalVisible,
          showAlert: showAlert,
          filteredParticipants: filteredParticipants.value,
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
  `, isInline: true, styles: [""], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i94.NgComponentOutlet, selector: "[ngComponentOutlet]", inputs: ["ngComponentOutlet", "ngComponentOutletInputs", "ngComponentOutletInjector", "ngComponentOutletContent", "ngComponentOutletNgModule", "ngComponentOutletNgModuleFactory"] }, { kind: "directive", type: i94.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i94.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: AlertComponent, selector: "app-alert-component", inputs: ["visible", "message", "type", "duration", "textColor", "onHide"] }, { kind: "component", type: AudioGrid, selector: "app-audio-grid", inputs: ["componentsToRender"] }, { kind: "component", type: ControlButtonsComponentTouch, selector: "app-control-buttons-component-touch", inputs: ["buttons", "position", "location", "direction", "buttonsContainerStyle", "showAspect"] }, { kind: "component", type: FlexibleVideo, selector: "app-flexible-video", inputs: ["customWidth", "customHeight", "rows", "columns", "componentsToRender", "showAspect", "backgroundColor", "Screenboard", "annotateScreenStream", "localStreamScreen"] }, { kind: "component", type: LoadingModal, selector: "app-loading-modal", inputs: ["isVisible", "backgroundColor", "displayColor"] }, { kind: "component", type: ConfirmExitModal, selector: "app-confirm-exit-modal", inputs: ["isConfirmExitModalVisible", "onConfirmExitClose", "position", "backgroundColor", "exitEventOnConfirm", "member", "ban", "roomName", "socket", "islevel"] }, { kind: "component", type: MessagesModal, selector: "app-messages-modal", inputs: ["isMessagesModalVisible", "onMessagesClose", "onSendMessagePress", "messages", "position", "backgroundColor", "activeTabBackgroundColor", "eventType", "member", "islevel", "coHostResponsibility", "coHost", "startDirectMessage", "directMessageDetails", "updateStartDirectMessage", "updateDirectMessageDetails", "showAlert", "roomName", "socket", "chatSetting"] }, { kind: "component", type: ConfirmHereModal, selector: "app-confirm-here-modal", inputs: ["isConfirmHereModalVisible", "position", "backgroundColor", "displayColor", "onConfirmHereClose", "countdownDuration", "socket", "roomName", "member"] }, { kind: "component", type: ShareEventModal, selector: "app-share-event-modal", inputs: ["backgroundColor", "isShareEventModalVisible", "onShareEventClose", "roomName", "adminPasscode", "islevel", "position", "shareButtons", "eventType"] }, { kind: "component", type: ParticipantsModal, selector: "app-participants-modal", inputs: ["isParticipantsModalVisible", "onParticipantsClose", "onParticipantsFilterChange", "participantsCounter", "onMuteParticipants", "onMessageParticipants", "onRemoveParticipants", "parameters", "position", "backgroundColor"] }, { kind: "component", type: RecordingModal, selector: "app-recording-modal", inputs: ["isRecordingModalVisible", "onClose", "backgroundColor", "position", "confirmRecording", "startRecording", "parameters"] }, { kind: "component", type: MainAspectComponent, selector: "app-main-aspect-component", inputs: ["backgroundColor", "showControls", "containerWidthFraction", "containerHeightFraction", "defaultFraction", "updateIsWideScreen", "updateIsMediumScreen", "updateIsSmallScreen"] }, { kind: "component", type: MainContainerComponent, selector: "app-main-container-component", inputs: ["backgroundColor", "containerWidthFraction", "containerHeightFraction", "marginLeft", "marginRight", "marginTop", "marginBottom", "padding"] }, { kind: "component", type: MainGridComponent, selector: "app-main-grid-component", inputs: ["backgroundColor", "mainSize", "height", "width", "showAspect", "timeBackgroundColor", "showTimer", "meetingProgressTime"] }, { kind: "component", type: MainScreenComponent, selector: "app-main-screen-component", inputs: ["mainSize", "doStack", "containerWidthFraction", "containerHeightFraction", "defaultFraction", "showControls", "updateComponentSizes"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: MediasfuBroadcast, decorators: [{
            type: Component,
            args: [{ selector: 'app-mediasfu-broadcast', standalone: true, imports: [
                        RouterOutlet,
                        CommonModule,
                        AlertComponent,
                        AudioGrid,
                        ControlButtonsComponentTouch,
                        FlexibleVideo,
                        LoadingModal,
                        ConfirmExitModal,
                        MessagesModal,
                        ConfirmHereModal,
                        ShareEventModal,
                        WelcomePage,
                        ParticipantsModal,
                        RecordingModal,
                        MainAspectComponent,
                        MainContainerComponent,
                        MainGridComponent,
                        MainScreenComponent,
                        MessageWidget,
                        MenuRecordWidget,
                        RecordTimerWidget,
                        MenuParticipantsWidget,
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
      <!-- Conditional Rendering: PrejoinPage or Main Content -->
      <ng-container *ngIf="!validated.value; else mainContent">
        <ng-container
          *ngComponentOutlet="
            PrejoinPageComponent.component;
            injector: PrejoinPageComponent.injector
          "
        >
        </ng-container>
      </ng-container>

      <!-- Main Content -->
      <ng-template #mainContent>
        <app-main-container-component>
          <!-- Main Aspect Component -->
          <app-main-aspect-component
            [backgroundColor]="'rgba(217, 227, 234, 0.99)'"
            [defaultFraction]="1 - controlHeight.value"
            [showControls]="eventType.value === 'webinar' || eventType.value === 'conference'"
            [updateIsWideScreen]="updateIsWideScreen"
            [updateIsMediumScreen]="updateIsMediumScreen"
            [updateIsSmallScreen]="updateIsSmallScreen"
          >
            <!-- Main Screen Component -->
            <app-main-screen-component
              [doStack]="true"
              [mainSize]="mainHeightWidth.value"
              [defaultFraction]="1 - controlHeight.value"
              [showControls]="eventType.value === 'webinar' || eventType.value === 'conference'"
              [updateComponentSizes]="updateComponentSizes"
            >
              <!-- Main Grid Component -->
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
                >
                </app-flexible-video>

                <!-- Control Buttons for Broadcast -->
                <app-control-buttons-component-touch
                  [buttons]="controlBroadcastButtons"
                  [position]="'right'"
                  [location]="'bottom'"
                  [direction]="'vertical'"
                  [showAspect]="eventType.value === 'broadcast'"
                ></app-control-buttons-component-touch>

                <!-- Recording Buttons -->
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

                <!-- AudioGrid -->
                <app-audio-grid [componentsToRender]="audioOnlyStreams.value"></app-audio-grid>
              </app-main-grid-component>

              <!-- Other Grid Component is not included in MediasfuBroadcast -->
            </app-main-screen-component>
          </app-main-aspect-component>
        </app-main-container-component>
      </ng-template>

      <!-- Modals to include -->
      <app-participants-modal
        [backgroundColor]="'rgba(217, 227, 234, 0.99)'"
        [isParticipantsModalVisible]="isParticipantsModalVisible.value"
        [onParticipantsClose]="onParticipantsClose"
        [participantsCounter]="participantsCounter.value"
        [onParticipantsFilterChange]="onParticipantsFilterChange"
        [parameters]="{
          updateParticipants: updateParticipants,
          updateIsParticipantsModalVisible: updateIsParticipantsModalVisible,
          updateDirectMessageDetails: updateDirectMessageDetails,
          updateStartDirectMessage: updateStartDirectMessage,
          updateIsMessagesModalVisible: updateIsMessagesModalVisible,
          showAlert: showAlert,
          filteredParticipants: filteredParticipants.value,
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
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef }, { type: i0.Injector }, { type: i1.UpdateMiniCardsGrid }, { type: i2.MixStreams }, { type: i3.DispStreams }, { type: i4.StopShareScreen }, { type: i5.CheckScreenShare }, { type: i6.StartShareScreen }, { type: i7.RequestScreenShare }, { type: i8.ReorderStreams }, { type: i9.PrepopulateUserMedia }, { type: i10.GetVideos }, { type: i11.RePort }, { type: i12.Trigger }, { type: i13.ConsumerResume }, { type: i14.ConnectSendTransport }, { type: i15.ConnectSendTransportAudio }, { type: i16.ConnectSendTransportVideo }, { type: i17.ConnectSendTransportScreen }, { type: i18.ProcessConsumerTransports }, { type: i19.ResumePauseStreams }, { type: i20.Readjust }, { type: i21.CheckGrid }, { type: i22.GetEstimate }, { type: i23.CalculateRowsAndColumns }, { type: i24.AddVideosGrid }, { type: i25.OnScreenChanges }, { type: i26.ChangeVids }, { type: i27.CompareActiveNames }, { type: i28.CompareScreenStates }, { type: i29.CreateSendTransport }, { type: i30.ResumeSendTransportAudio }, { type: i31.ReceiveAllPipedTransports }, { type: i32.DisconnectSendTransportVideo }, { type: i33.DisconnectSendTransportAudio }, { type: i34.DisconnectSendTransportScreen }, { type: i35.GetPipedProducersAlt }, { type: i36.SignalNewConsumerTransport }, { type: i37.ConnectRecvTransport }, { type: i38.ReUpdateInter }, { type: i39.UpdateParticipantAudioDecibels }, { type: i40.CloseAndResize }, { type: i41.AutoAdjust }, { type: i42.SwitchUserVideoAlt }, { type: i43.SwitchUserVideo }, { type: i44.SwitchUserAudio }, { type: i45.GetDomains }, { type: i46.FormatNumber }, { type: i47.ConnectIps }, { type: i48.CreateDeviceClient }, { type: i49.CaptureCanvasStream }, { type: i50.ResumePauseAudioStreams }, { type: i51.ProcessConsumerTransportsAudio }, { type: i52.LaunchRecording }, { type: i53.StartRecording }, { type: i54.ConfirmRecording }, { type: i55.LaunchParticipants }, { type: i56.LaunchMessages }, { type: i57.LaunchConfirmExit }, { type: i58.StartMeetingProgressTimer }, { type: i59.UpdateRecording }, { type: i60.StopRecording }, { type: i61.PersonJoined }, { type: i62.RoomRecordParams }, { type: i63.BanParticipant }, { type: i64.ProducerMediaPaused }, { type: i65.ProducerMediaResumed }, { type: i66.ProducerMediaClosed }, { type: i67.MeetingEnded }, { type: i68.DisconnectUserSelf }, { type: i69.ReceiveMessage }, { type: i70.MeetingTimeRemaining }, { type: i71.MeetingStillThere }, { type: i72.StartRecords }, { type: i73.ReInitiateRecording }, { type: i74.RecordingNotice }, { type: i75.TimeLeftRecording }, { type: i76.StoppedRecording }, { type: i77.AllMembers }, { type: i78.AllMembersRest }, { type: i79.Disconnect }, { type: i80.SocketManager }, { type: i81.JoinRoomClient }, { type: i82.UpdateRoomParametersClient }, { type: i83.ClickVideo }, { type: i84.ClickAudio }, { type: i85.ClickScreenShare }, { type: i86.SwitchVideoAlt }, { type: i87.StreamSuccessVideo }, { type: i88.StreamSuccessAudio }, { type: i89.StreamSuccessScreen }, { type: i90.StreamSuccessAudioSwitch }, { type: i91.CheckPermission }, { type: i92.UpdateConsumingDomains }, { type: i93.ReceiveRoomMessages }], propDecorators: { PrejoinPage: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWFzZnUtYnJvYWRjYXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb21wb25lbnRzL21lZGlhc2Z1LWNvbXBvbmVudHMvbWVkaWFzZnUtYnJvYWRjYXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFlBQVksRUFDWixRQUFRLEVBRVIsS0FBSyxHQUdOLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxlQUFlLEVBQWdCLGFBQWEsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUVwRSxPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLFlBQVksRUFDWixPQUFPLEVBQ1AsT0FBTyxFQUNQLFVBQVUsRUFDVixVQUFVLEVBQ1YsTUFBTSxFQUNOLFVBQVUsRUFDVixhQUFhLEVBQ2IsS0FBSyxFQUNMLFlBQVksRUFDWixhQUFhLEVBQ2IsWUFBWSxFQUNaLFdBQVcsRUFDWCxPQUFPLEVBQ1AsWUFBWSxHQUNiLE1BQU0sbUNBQW1DLENBQUM7QUFFM0MsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFFN0UseUJBQXlCO0FBQ3pCLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDZFQUE2RSxDQUFDO0FBQ2xILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw2REFBNkQsQ0FBQztBQUMzRixPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxpR0FBaUcsQ0FBQztBQUMvSSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw2RUFBNkUsQ0FBQztBQUNsSCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx5RUFBeUUsQ0FBQztBQUM1RyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxtRkFBbUYsQ0FBQztBQUMzSCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0saUVBQWlFLENBQUM7QUFDakcsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1FQUFtRSxDQUFDO0FBQ25HLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDRFQUE0RSxDQUFDO0FBQy9HLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwrREFBK0QsQ0FBQztBQUM5RixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxvRUFBb0UsQ0FBQztBQUN0RyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxvRUFBb0UsQ0FBQztBQUN0RyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sa0VBQWtFLENBQUM7QUFDbkcsT0FBTyxFQUNMLFdBQVcsR0FFWixNQUFNLHdEQUF3RCxDQUFDO0FBRWhFLGtDQUFrQztBQUNsQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sK0RBQStELENBQUM7QUFDOUYsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHVEQUF1RCxDQUFDO0FBRWxGLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxnRUFBZ0UsQ0FBQztBQUMvRixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxvRUFBb0UsQ0FBQztBQUN0RyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxxRUFBcUUsQ0FBQztBQUN4RyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwwRUFBMEUsQ0FBQztBQXdGbEgsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGdDQUFnQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF1VXZELE1BQU0sT0FBTyxpQkFBaUI7SUFvQmxCO0lBQ0E7SUFDRDtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFFQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFFQTtJQUNBO0lBQ0E7SUFFQTtJQUVBO0lBQ0E7SUFFQTtJQUNBO0lBQ0E7SUFFQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUVBO0lBQ0E7SUFDQTtJQUVBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUVBO0lBQ0E7SUF6SFQsV0FBVyxHQUFRLFdBQVcsQ0FBQztJQUN0QixXQUFXLEdBQTRDLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDdkYsY0FBYyxHQUFHLEtBQUssQ0FBQztJQUN2QixRQUFRLENBQVk7SUFDcEIsT0FBTyxHQUFHLEtBQUssQ0FBQztJQUNoQixNQUFNLEdBQUcseUNBQXlDLENBQUM7SUFFNUQsS0FBSyxHQUFHLG9CQUFvQixDQUFDO0lBRXJCLDJCQUEyQixDQUEyQjtJQUN0RCxxQkFBcUIsQ0FBMkI7SUFDaEQsbUJBQW1CLENBQTJCO0lBQzlDLGtCQUFrQixDQUEyQjtJQUM3QyxtQkFBbUIsR0FBbUIsRUFBRSxDQUFDO0lBQ3pDLHVCQUF1QixDQUEyQjtJQUNsRCxxQkFBcUIsQ0FBMkI7SUFFeEQsWUFDVSxHQUFzQixFQUN0QixRQUFrQixFQUNuQixtQkFBd0MsRUFDeEMsVUFBc0IsRUFDdEIsV0FBd0IsRUFDeEIsZUFBZ0MsRUFDaEMsZ0JBQWtDLEVBQ2xDLGdCQUFrQyxFQUNsQyxrQkFBc0MsRUFDdEMsY0FBOEIsRUFDOUIsb0JBQTBDLEVBQzFDLFNBQW9CLEVBQ3BCLE1BQWMsRUFDZCxPQUFnQixFQUNoQixjQUE4QixFQUM5QixvQkFBMEMsRUFDMUMseUJBQW9ELEVBQ3BELHlCQUFvRCxFQUNwRCwwQkFBc0QsRUFDdEQseUJBQW9ELEVBQ3BELGtCQUFzQyxFQUN0QyxRQUFrQixFQUNsQixTQUFvQixFQUNwQixXQUF3QixFQUN4Qix1QkFBZ0QsRUFDaEQsYUFBNEIsRUFDNUIsZUFBZ0MsRUFDaEMsVUFBc0IsRUFDdEIsa0JBQXNDLEVBQ3RDLG1CQUF3QyxFQUN4QyxtQkFBd0MsRUFDeEMsd0JBQWtELEVBQ2xELHlCQUFvRCxFQUNwRCw0QkFBMEQsRUFDMUQsNEJBQTBELEVBQzFELDZCQUE0RCxFQUM1RCxvQkFBMEMsRUFDMUMsMEJBQXNELEVBQ3RELG9CQUEwQyxFQUMxQyxhQUE0QixFQUM1Qiw4QkFBOEQsRUFDOUQsY0FBOEIsRUFDOUIsVUFBc0IsRUFDdEIsa0JBQXNDLEVBQ3RDLGVBQWdDLEVBQ2hDLGVBQWdDLEVBQ2hDLFVBQXNCLEVBQ3RCLFlBQTBCLEVBQzFCLFVBQXNCLEVBQ3RCLGtCQUFzQyxFQUN0QyxtQkFBd0MsRUFDeEMsdUJBQWdELEVBQ2hELDhCQUE4RCxFQUU5RCxlQUFnQyxFQUNoQyxjQUE4QixFQUM5QixnQkFBa0MsRUFDbEMsa0JBQXNDLEVBQ3RDLGNBQThCLEVBQzlCLGlCQUFvQyxFQUVwQyx5QkFBb0QsRUFDcEQsZUFBZ0MsRUFDaEMsYUFBNEIsRUFFNUIsWUFBMEIsRUFFMUIsZ0JBQWtDLEVBQ2xDLGNBQThCLEVBRTlCLG1CQUF3QyxFQUN4QyxvQkFBMEMsRUFDMUMsbUJBQXdDLEVBRXhDLFlBQTBCLEVBQzFCLGtCQUFzQyxFQUN0QyxjQUE4QixFQUM5QixvQkFBMEMsRUFDMUMsaUJBQW9DLEVBQ3BDLFlBQTBCLEVBQzFCLG1CQUF3QyxFQUN4QyxlQUFnQyxFQUNoQyxpQkFBb0MsRUFDcEMsZ0JBQWtDLEVBRWxDLFVBQXNCLEVBQ3RCLGNBQThCLEVBQzlCLFVBQXNCLEVBRXRCLGFBQTRCLEVBQzVCLGNBQThCLEVBQzlCLDBCQUFzRCxFQUN0RCxVQUFzQixFQUN0QixVQUFzQixFQUN0QixnQkFBa0MsRUFDbEMsY0FBOEIsRUFDOUIsa0JBQXNDLEVBQ3RDLGtCQUFzQyxFQUN0QyxtQkFBd0MsRUFDeEMsd0JBQWtELEVBQ2xELGVBQWdDLEVBRWhDLHNCQUE4QyxFQUM5QyxtQkFBd0M7UUF2R3ZDLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQ3RCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbkIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4QyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUN0QyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUMxQyxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ3BCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxZQUFPLEdBQVAsT0FBTyxDQUFTO1FBQ2hCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5Qix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBQzFDLDhCQUF5QixHQUF6Qix5QkFBeUIsQ0FBMkI7UUFDcEQsOEJBQXlCLEdBQXpCLHlCQUF5QixDQUEyQjtRQUNwRCwrQkFBMEIsR0FBMUIsMEJBQTBCLENBQTRCO1FBQ3RELDhCQUF5QixHQUF6Qix5QkFBeUIsQ0FBMkI7UUFDcEQsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUN0QyxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUF5QjtRQUNoRCxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0Qix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ3RDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDeEMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4Qyw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQTBCO1FBQ2xELDhCQUF5QixHQUF6Qix5QkFBeUIsQ0FBMkI7UUFDcEQsaUNBQTRCLEdBQTVCLDRCQUE0QixDQUE4QjtRQUMxRCxpQ0FBNEIsR0FBNUIsNEJBQTRCLENBQThCO1FBQzFELGtDQUE2QixHQUE3Qiw2QkFBNkIsQ0FBK0I7UUFDNUQseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUMxQywrQkFBMEIsR0FBMUIsMEJBQTBCLENBQTRCO1FBQ3RELHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFDMUMsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsbUNBQThCLEdBQTlCLDhCQUE4QixDQUFnQztRQUM5RCxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0Qix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ3RDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4Qyw0QkFBdUIsR0FBdkIsdUJBQXVCLENBQXlCO1FBQ2hELG1DQUE4QixHQUE5Qiw4QkFBOEIsQ0FBZ0M7UUFFOUQsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFFcEMsOEJBQXlCLEdBQXpCLHlCQUF5QixDQUEyQjtRQUNwRCxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFFNUIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFFMUIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFFOUIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4Qyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBQzFDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFFeEMsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUN0QyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUMxQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDeEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUVsQyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBRXRCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QiwrQkFBMEIsR0FBMUIsMEJBQTBCLENBQTRCO1FBQ3RELGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5Qix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ3RDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4Qyw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQTBCO1FBQ2xELG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUVoQywyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXdCO1FBQzlDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7SUFDOUMsQ0FBQztJQUVKLGNBQWMsQ0FBQyxNQUFXO1FBQ3hCLE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUM7WUFDMUIsU0FBUyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN0RixNQUFNLEVBQUUsSUFBSSxDQUFDLFFBQVE7U0FDdEIsQ0FBQyxDQUFDO1FBRUgsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDO0lBRUQsaUJBQWlCO0lBQ2pCLGlCQUFpQixHQUFHLEdBQUcsRUFBRTtRQUN2QixPQUFPO1lBQ0wsbUJBQW1CLEVBQ2pCLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxtQkFBbUI7Z0JBQzdDLENBQUMsR0FBRyxFQUFFO29CQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3RCLENBQUMsQ0FBQztZQUNKLFVBQVUsRUFDUixJQUFJLENBQUMsVUFBVSxFQUFFLFVBQVU7Z0JBQzNCLENBQUMsR0FBRyxFQUFFO29CQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3RCLENBQUMsQ0FBQztZQUNKLFdBQVcsRUFDVCxJQUFJLENBQUMsV0FBVyxFQUFFLFdBQVc7Z0JBQzdCLENBQUMsR0FBRyxFQUFFO29CQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3RCLENBQUMsQ0FBQztZQUNKLGVBQWUsRUFDYixJQUFJLENBQUMsZUFBZSxFQUFFLGVBQWU7Z0JBQ3JDLENBQUMsR0FBRyxFQUFFO29CQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3RCLENBQUMsQ0FBQztZQUNKLGdCQUFnQixFQUNkLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxnQkFBZ0I7Z0JBQ3ZDLENBQUMsR0FBRyxFQUFFO29CQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3RCLENBQUMsQ0FBQztZQUNKLGdCQUFnQixFQUNkLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxnQkFBZ0I7Z0JBQ3ZDLENBQUMsR0FBRyxFQUFFO29CQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3RCLENBQUMsQ0FBQztZQUNKLGtCQUFrQixFQUNoQixJQUFJLENBQUMsa0JBQWtCLEVBQUUsa0JBQWtCO2dCQUMzQyxDQUFDLEdBQUcsRUFBRTtvQkFDSixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN0QixDQUFDLENBQUM7WUFDSixjQUFjLEVBQ1osSUFBSSxDQUFDLGNBQWMsRUFBRSxjQUFjO2dCQUNuQyxDQUFDLEdBQUcsRUFBRTtvQkFDSixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN0QixDQUFDLENBQUM7WUFDSixvQkFBb0IsRUFDbEIsSUFBSSxDQUFDLG9CQUFvQixFQUFFLG9CQUFvQjtnQkFDL0MsQ0FBQyxHQUFHLEVBQUU7b0JBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDdEIsQ0FBQyxDQUFDO1lBQ0osU0FBUyxFQUNQLElBQUksQ0FBQyxTQUFTLEVBQUUsU0FBUztnQkFDekIsQ0FBQyxHQUFHLEVBQUU7b0JBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDdEIsQ0FBQyxDQUFDO1lBQ0osTUFBTSxFQUNKLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTTtnQkFDbkIsQ0FBQyxHQUFHLEVBQUU7b0JBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDdEIsQ0FBQyxDQUFDO1lBQ0osT0FBTyxFQUNMLElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTztnQkFDckIsQ0FBQyxHQUFHLEVBQUU7b0JBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDdEIsQ0FBQyxDQUFDO1lBQ0osY0FBYyxFQUNaLElBQUksQ0FBQyxjQUFjLEVBQUUsY0FBYztnQkFDbkMsQ0FBQyxHQUFHLEVBQUU7b0JBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDdEIsQ0FBQyxDQUFDO1lBQ0osb0JBQW9CLEVBQ2xCLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxvQkFBb0I7Z0JBQy9DLENBQUMsR0FBRyxFQUFFO29CQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3RCLENBQUMsQ0FBQztZQUNKLHlCQUF5QixFQUN2QixJQUFJLENBQUMseUJBQXlCLEVBQUUseUJBQXlCO2dCQUN6RCxDQUFDLEdBQUcsRUFBRTtvQkFDSixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN0QixDQUFDLENBQUM7WUFDSix5QkFBeUIsRUFDdkIsSUFBSSxDQUFDLHlCQUF5QixFQUFFLHlCQUF5QjtnQkFDekQsQ0FBQyxHQUFHLEVBQUU7b0JBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDdEIsQ0FBQyxDQUFDO1lBQ0osMEJBQTBCLEVBQ3hCLElBQUksQ0FBQywwQkFBMEIsRUFBRSwwQkFBMEI7Z0JBQzNELENBQUMsR0FBRyxFQUFFO29CQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3RCLENBQUMsQ0FBQztZQUNKLHlCQUF5QixFQUN2QixJQUFJLENBQUMseUJBQXlCLEVBQUUseUJBQXlCO2dCQUN6RCxDQUFDLEdBQUcsRUFBRTtvQkFDSixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN0QixDQUFDLENBQUM7WUFDSixrQkFBa0IsRUFDaEIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLGtCQUFrQjtnQkFDM0MsQ0FBQyxHQUFHLEVBQUU7b0JBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDdEIsQ0FBQyxDQUFDO1lBQ0osUUFBUSxFQUNOLElBQUksQ0FBQyxRQUFRLEVBQUUsUUFBUTtnQkFDdkIsQ0FBQyxHQUFHLEVBQUU7b0JBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDdEIsQ0FBQyxDQUFDO1lBQ0osU0FBUyxFQUNQLElBQUksQ0FBQyxTQUFTLEVBQUUsU0FBUztnQkFDekIsQ0FBQyxHQUFHLEVBQUU7b0JBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDdEIsQ0FBQyxDQUFDO1lBQ0osV0FBVyxFQUNULElBQUksQ0FBQyxXQUFXLEVBQUUsV0FBVztnQkFDN0IsQ0FBQyxHQUFHLEVBQUU7b0JBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDdEIsQ0FBQyxDQUFDO1lBQ0osdUJBQXVCLEVBQ3JCLElBQUksQ0FBQyx1QkFBdUIsRUFBRSx1QkFBdUI7Z0JBQ3JELENBQUMsR0FBRyxFQUFFO29CQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3RCLENBQUMsQ0FBQztZQUNKLGFBQWEsRUFDWCxJQUFJLENBQUMsYUFBYSxFQUFFLGFBQWE7Z0JBQ2pDLENBQUMsR0FBRyxFQUFFO29CQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3RCLENBQUMsQ0FBQztZQUNKLGVBQWUsRUFDYixJQUFJLENBQUMsZUFBZSxFQUFFLGVBQWU7Z0JBQ3JDLENBQUMsR0FBRyxFQUFFO29CQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3RCLENBQUMsQ0FBQztZQUNKLEtBQUssRUFDSCxLQUFLO2dCQUNMLENBQUMsR0FBRyxFQUFFO29CQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3RCLENBQUMsQ0FBQztZQUNKLFVBQVUsRUFDUixJQUFJLENBQUMsVUFBVSxFQUFFLFVBQVU7Z0JBQzNCLENBQUMsR0FBRyxFQUFFO29CQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3RCLENBQUMsQ0FBQztZQUNKLGtCQUFrQixFQUNoQixJQUFJLENBQUMsa0JBQWtCLEVBQUUsa0JBQWtCO2dCQUMzQyxDQUFDLEdBQUcsRUFBRTtvQkFDSixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN0QixDQUFDLENBQUM7WUFDSixtQkFBbUIsRUFDakIsSUFBSSxDQUFDLG1CQUFtQixFQUFFLG1CQUFtQjtnQkFDN0MsQ0FBQyxHQUFHLEVBQUU7b0JBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDdEIsQ0FBQyxDQUFDO1lBQ0osbUJBQW1CLEVBQ2pCLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxtQkFBbUI7Z0JBQzdDLENBQUMsR0FBRyxFQUFFO29CQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3RCLENBQUMsQ0FBQztZQUNKLHdCQUF3QixFQUN0QixJQUFJLENBQUMsd0JBQXdCLEVBQUUsd0JBQXdCO2dCQUN2RCxDQUFDLEdBQUcsRUFBRTtvQkFDSixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN0QixDQUFDLENBQUM7WUFDSix5QkFBeUIsRUFDdkIsSUFBSSxDQUFDLHlCQUF5QixFQUFFLHlCQUF5QjtnQkFDekQsQ0FBQyxHQUFHLEVBQUU7b0JBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDdEIsQ0FBQyxDQUFDO1lBQ0osNEJBQTRCLEVBQzFCLElBQUksQ0FBQyw0QkFBNEIsRUFBRSw0QkFBNEI7Z0JBQy9ELENBQUMsR0FBRyxFQUFFO29CQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3RCLENBQUMsQ0FBQztZQUNKLDRCQUE0QixFQUMxQixJQUFJLENBQUMsNEJBQTRCLEVBQUUsNEJBQTRCO2dCQUMvRCxDQUFDLEdBQUcsRUFBRTtvQkFDSixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN0QixDQUFDLENBQUM7WUFDSiw2QkFBNkIsRUFDM0IsSUFBSSxDQUFDLDZCQUE2QixFQUFFLDZCQUE2QjtnQkFDakUsQ0FBQyxHQUFHLEVBQUU7b0JBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDdEIsQ0FBQyxDQUFDO1lBQ0osb0JBQW9CLEVBQ2xCLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxvQkFBb0I7Z0JBQy9DLENBQUMsR0FBRyxFQUFFO29CQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3RCLENBQUMsQ0FBQztZQUNKLDBCQUEwQixFQUN4QixJQUFJLENBQUMsMEJBQTBCLEVBQUUsMEJBQTBCO2dCQUMzRCxDQUFDLEdBQUcsRUFBRTtvQkFDSixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN0QixDQUFDLENBQUM7WUFDSixvQkFBb0IsRUFDbEIsSUFBSSxDQUFDLG9CQUFvQixFQUFFLG9CQUFvQjtnQkFDL0MsQ0FBQyxHQUFHLEVBQUU7b0JBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDdEIsQ0FBQyxDQUFDO1lBQ0osYUFBYSxFQUNYLElBQUksQ0FBQyxhQUFhLEVBQUUsYUFBYTtnQkFDakMsQ0FBQyxHQUFHLEVBQUU7b0JBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDdEIsQ0FBQyxDQUFDO1lBQ0osOEJBQThCLEVBQzVCLElBQUksQ0FBQyw4QkFBOEIsRUFBRSw4QkFBOEI7Z0JBQ25FLENBQUMsR0FBRyxFQUFFO29CQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3RCLENBQUMsQ0FBQztZQUNKLGNBQWMsRUFDWixJQUFJLENBQUMsY0FBYyxFQUFFLGNBQWM7Z0JBQ25DLENBQUMsR0FBRyxFQUFFO29CQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3RCLENBQUMsQ0FBQztZQUNKLFVBQVUsRUFDUixJQUFJLENBQUMsVUFBVSxFQUFFLFVBQVU7Z0JBQzNCLENBQUMsR0FBRyxFQUFFO29CQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3RCLENBQUMsQ0FBQztZQUNKLGtCQUFrQixFQUNoQixJQUFJLENBQUMsa0JBQWtCLEVBQUUsa0JBQWtCO2dCQUMzQyxDQUFDLEdBQUcsRUFBRTtvQkFDSixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN0QixDQUFDLENBQUM7WUFDSixlQUFlLEVBQ2IsSUFBSSxDQUFDLGVBQWUsRUFBRSxlQUFlO2dCQUNyQyxDQUFDLEdBQUcsRUFBRTtvQkFDSixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN0QixDQUFDLENBQUM7WUFDSixlQUFlLEVBQ2IsSUFBSSxDQUFDLGVBQWUsRUFBRSxlQUFlO2dCQUNyQyxDQUFDLEdBQUcsRUFBRTtvQkFDSixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN0QixDQUFDLENBQUM7WUFDSixVQUFVLEVBQ1IsSUFBSSxDQUFDLFVBQVUsRUFBRSxVQUFVO2dCQUMzQixDQUFDLEdBQUcsRUFBRTtvQkFDSixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN0QixDQUFDLENBQUM7WUFDSixZQUFZLEVBQ1YsSUFBSSxDQUFDLFlBQVksRUFBRSxZQUFZO2dCQUMvQixDQUFDLEdBQUcsRUFBRTtvQkFDSixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN0QixDQUFDLENBQUM7WUFDSixVQUFVLEVBQ1IsSUFBSSxDQUFDLFVBQVUsRUFBRSxVQUFVO2dCQUMzQixDQUFDLEdBQUcsRUFBRTtvQkFDSixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN0QixDQUFDLENBQUM7WUFDSixrQkFBa0IsRUFDaEIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLGtCQUFrQjtnQkFDM0MsQ0FBQyxHQUFHLEVBQUU7b0JBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDdEIsQ0FBQyxDQUFDO1lBQ0osbUJBQW1CLEVBQ2pCLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxtQkFBbUI7Z0JBQzdDLENBQUMsR0FBRyxFQUFFO29CQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3RCLENBQUMsQ0FBQztZQUNKLHVCQUF1QixFQUNyQixJQUFJLENBQUMsdUJBQXVCLEVBQUUsdUJBQXVCO2dCQUNyRCxDQUFDLEdBQUcsRUFBRTtvQkFDSixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN0QixDQUFDLENBQUM7WUFDSiw4QkFBOEIsRUFDNUIsSUFBSSxDQUFDLDhCQUE4QixFQUFFLDhCQUE4QjtnQkFDbkUsQ0FBQyxHQUFHLEVBQUU7b0JBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDdEIsQ0FBQyxDQUFDO1lBQ0osZUFBZSxFQUNiLElBQUksQ0FBQyxlQUFlLEVBQUUsZUFBZTtnQkFDckMsQ0FBQyxHQUFHLEVBQUU7b0JBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDdEIsQ0FBQyxDQUFDO1lBQ0osa0JBQWtCLEVBQ2hCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxrQkFBa0I7Z0JBQzNDLENBQUMsR0FBRyxFQUFFO29CQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3RCLENBQUMsQ0FBQztZQUNKLGtCQUFrQixFQUNoQixJQUFJLENBQUMsa0JBQWtCLEVBQUUsa0JBQWtCO2dCQUMzQyxDQUFDLEdBQUcsRUFBRTtvQkFDSixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN0QixDQUFDLENBQUM7WUFDSixtQkFBbUIsRUFDakIsSUFBSSxDQUFDLG1CQUFtQixFQUFFLG1CQUFtQjtnQkFDN0MsQ0FBQyxHQUFHLEVBQUU7b0JBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDdEIsQ0FBQyxDQUFDO1lBQ0osd0JBQXdCLEVBQ3RCLElBQUksQ0FBQyx3QkFBd0IsRUFBRSx3QkFBd0I7Z0JBQ3ZELENBQUMsR0FBRyxFQUFFO29CQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3RCLENBQUMsQ0FBQztZQUNKLFVBQVUsRUFDUixJQUFJLENBQUMsVUFBVSxFQUFFLFVBQVU7Z0JBQzNCLENBQUMsR0FBRyxFQUFFO29CQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3RCLENBQUMsQ0FBQztZQUNKLFVBQVUsRUFDUixJQUFJLENBQUMsVUFBVSxFQUFFLFVBQVU7Z0JBQzNCLENBQUMsR0FBRyxFQUFFO29CQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3RCLENBQUMsQ0FBQztZQUNKLGdCQUFnQixFQUNkLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxnQkFBZ0I7Z0JBQ3ZDLENBQUMsR0FBRyxFQUFFO29CQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3RCLENBQUMsQ0FBQztZQUNKLGNBQWMsRUFDWixJQUFJLENBQUMsY0FBYyxFQUFFLGNBQWM7Z0JBQ25DLENBQUMsR0FBRyxFQUFFO29CQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3RCLENBQUMsQ0FBQztZQUNKLHVCQUF1QixFQUNyQixJQUFJLENBQUMsdUJBQXVCO2dCQUM1QixDQUFDLEdBQUcsRUFBRTtvQkFDSixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN0QixDQUFDLENBQUM7WUFDSixzQkFBc0IsRUFDcEIsSUFBSSxDQUFDLHNCQUFzQjtnQkFDM0IsQ0FBQyxHQUFHLEVBQUU7b0JBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDdEIsQ0FBQyxDQUFDO1NBQ0wsQ0FBQztJQUNKLENBQUMsQ0FBQztJQUVGLFNBQVMsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUNoRCxXQUFXLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFDbEQsTUFBTSxHQUFHLElBQUksZUFBZSxDQUFTLEVBQVksQ0FBQyxDQUFDO0lBQ25ELFFBQVEsR0FBRyxJQUFJLGVBQWUsQ0FBMEIsSUFBSSxDQUFDLENBQUM7SUFDOUQsTUFBTSxHQUFHLElBQUksZUFBZSxDQUFnQixJQUFJLENBQUMsQ0FBQztJQUNsRCxNQUFNLEdBQUcsSUFBSSxlQUFlLENBQVMsRUFBRSxDQUFDLENBQUM7SUFDekMsV0FBVyxHQUFHLElBQUksZUFBZSxDQUFTLEVBQUUsQ0FBQyxDQUFDO0lBQzlDLFFBQVEsR0FBRyxJQUFJLGVBQWUsQ0FBUyxFQUFFLENBQUMsQ0FBQztJQUMzQyxJQUFJLEdBQUcsSUFBSSxlQUFlLENBQVMsRUFBRSxDQUFDLENBQUM7SUFFdkMsUUFBUSxHQUFHLElBQUksZUFBZSxDQUFTLEVBQUUsQ0FBQyxDQUFDO0lBQzNDLE1BQU0sR0FBRyxJQUFJLGVBQWUsQ0FBUyxFQUFFLENBQUMsQ0FBQztJQUN6QyxhQUFhLEdBQUcsSUFBSSxlQUFlLENBQVMsRUFBRSxDQUFDLENBQUM7SUFDaEQsT0FBTyxHQUFHLElBQUksZUFBZSxDQUFTLEdBQUcsQ0FBQyxDQUFDO0lBQzNDLE1BQU0sR0FBRyxJQUFJLGVBQWUsQ0FBUyxXQUFXLENBQUMsQ0FBQztJQUNsRCxvQkFBb0IsR0FBRyxJQUFJLGVBQWUsQ0FBeUI7UUFDakUsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRTtRQUN4RCxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFO1FBQ2pELEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUU7UUFDbkQsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRTtLQUNqRCxDQUFDLENBQUM7SUFDSCxZQUFZLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFDbkQsVUFBVSxHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQ2pELGlCQUFpQixHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQ3hELGtCQUFrQixHQUFHLElBQUksZUFBZSxDQUFTLE9BQU8sQ0FBQyxDQUFDO0lBQzFELHFCQUFxQixHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQzVELFNBQVMsR0FBRyxJQUFJLGVBQWUsQ0FBWSxXQUFXLENBQUMsQ0FBQztJQUN4RCxZQUFZLEdBQUcsSUFBSSxlQUFlLENBQWdCLEVBQUUsQ0FBQyxDQUFDO0lBQ3RELG9CQUFvQixHQUFHLElBQUksZUFBZSxDQUFnQixFQUFFLENBQUMsQ0FBQztJQUM5RCxtQkFBbUIsR0FBRyxJQUFJLGVBQWUsQ0FBUyxDQUFDLENBQUMsQ0FBQztJQUNyRCxrQkFBa0IsR0FBRyxJQUFJLGVBQWUsQ0FBUyxFQUFFLENBQUMsQ0FBQztJQUVyRCxlQUFlLEdBQUcsSUFBSSxlQUFlLENBQWtCLEVBQUUsQ0FBQyxDQUFDO0lBQzNELGVBQWUsR0FBRyxJQUFJLGVBQWUsQ0FBeUIsSUFBSSxDQUFDLENBQUM7SUFDcEUsV0FBVyxHQUFHLElBQUksZUFBZSxDQUFXLEVBQUUsQ0FBQyxDQUFDO0lBQ2hELGlCQUFpQixHQUFHLElBQUksZUFBZSxDQUEyQixJQUFJLENBQUMsQ0FBQztJQUN4RSxhQUFhLEdBQUcsSUFBSSxlQUFlLENBQVMsQ0FBQyxDQUFDLENBQUM7SUFDL0MsYUFBYSxHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQ3BELFdBQVcsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUNsRCxlQUFlLEdBQUcsSUFBSSxlQUFlLENBQVMsQ0FBQyxDQUFDLENBQUM7SUFDakQsa0JBQWtCLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFDekQsTUFBTSxHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQzdDLGlCQUFpQixHQUFHLElBQUksZUFBZSxDQUFTLFdBQVcsQ0FBQyxDQUFDO0lBQzdELGdCQUFnQixHQUFHLElBQUksZUFBZSxDQUFTLElBQUksQ0FBQyxDQUFDO0lBQ3JELG9CQUFvQixHQUFHLElBQUksZUFBZSxDQUFTLElBQUksQ0FBQyxDQUFDO0lBQ3pELE9BQU8sR0FBRyxJQUFJLGVBQWUsQ0FBVSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDcEUsU0FBUyxHQUFHLElBQUksZUFBZSxDQUFTLEVBQUUsQ0FBQyxDQUFDO0lBQzVDLE9BQU8sR0FBRyxJQUFJLGVBQWUsQ0FBYyxFQUFpQixDQUFDLENBQUM7SUFDOUQsT0FBTyxHQUFHLElBQUksZUFBZSxDQUFjLEVBQWlCLENBQUMsQ0FBQztJQUM5RCxZQUFZLEdBQUcsSUFBSSxlQUFlLENBQW1CLEVBQXNCLENBQUMsQ0FBQztJQUM3RSxPQUFPLEdBQUcsSUFBSSxlQUFlLENBQWMsRUFBaUIsQ0FBQyxDQUFDO0lBRTlELHlCQUF5QixHQUFHLElBQUksZUFBZSxDQUFTLENBQUMsQ0FBQyxDQUFDO0lBQzNELHlCQUF5QixHQUFHLElBQUksZUFBZSxDQUFTLENBQUMsQ0FBQyxDQUFDO0lBQzNELHFCQUFxQixHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQzVELHlCQUF5QixHQUFHLElBQUksZUFBZSxDQUFTLENBQUMsQ0FBQyxDQUFDO0lBQzNELG1DQUFtQyxHQUFHLElBQUksZUFBZSxDQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ3JFLHlCQUF5QixHQUFHLElBQUksZUFBZSxDQUFTLENBQUMsQ0FBQyxDQUFDO0lBQzNELHlCQUF5QixHQUFHLElBQUksZUFBZSxDQUFTLENBQUMsQ0FBQyxDQUFDO0lBQzNELHFCQUFxQixHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQzVELHlCQUF5QixHQUFHLElBQUksZUFBZSxDQUFTLENBQUMsQ0FBQyxDQUFDO0lBQzNELG1DQUFtQyxHQUFHLElBQUksZUFBZSxDQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ3JFLCtCQUErQixHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQ3RFLGlDQUFpQyxHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQ3hFLHVDQUF1QyxHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQzlFLHlDQUF5QyxHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQ2hGLDZCQUE2QixHQUFHLElBQUksZUFBZSxDQUFTLFdBQVcsQ0FBQyxDQUFDO0lBQ3pFLG1DQUFtQyxHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQzFFLDRCQUE0QixHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBRW5FLG1CQUFtQixHQUFHLElBQUksZUFBZSxDQUFzQjtRQUM3RCxTQUFTLEVBQUU7WUFDVCxZQUFZLEVBQUUsT0FBTyxFQUFFLG1CQUFtQjtZQUMxQyxZQUFZLEVBQUUsS0FBSyxFQUFFLDRCQUE0QjtZQUNqRCxZQUFZLEVBQUUsS0FBSyxFQUFFLHNCQUFzQjtZQUMzQyxTQUFTLEVBQUUsYUFBYSxFQUFFLHNDQUFzQztZQUNoRSxjQUFjLEVBQUUsS0FBSyxFQUFFLGNBQWM7WUFDckMsb0JBQW9CLEVBQUUsT0FBTyxFQUFFLDBCQUEwQjtZQUN6RCxNQUFNLEVBQUUsS0FBSyxFQUFFLGNBQWM7U0FDOUI7UUFDRCxTQUFTLEVBQUU7WUFDVCxRQUFRLEVBQUUsSUFBSSxFQUFFLGNBQWM7WUFDOUIsZUFBZSxFQUFFLFNBQVMsRUFBRSx1QkFBdUI7WUFDbkQsYUFBYSxFQUFFLFNBQVMsRUFBRSx1QkFBdUI7WUFDakQsZ0JBQWdCLEVBQUUsVUFBVSxFQUFFLGlDQUFpQztTQUNoRTtLQUNGLENBQUMsQ0FBQztJQUVILFNBQVMsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUNoRCxXQUFXLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFDbEQsU0FBUyxHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQ2hELG1CQUFtQixHQUFHLElBQUksZUFBZSxDQUF3QixJQUFJLENBQUMsQ0FBQztJQUN2RSxlQUFlLEdBQUcsSUFBSSxlQUFlLENBQVMsQ0FBQyxDQUFDLENBQUM7SUFDakQsaUJBQWlCLEdBQUcsSUFBSSxlQUFlLENBQVMsQ0FBQyxDQUFDLENBQUM7SUFDbkQsY0FBYyxHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQ3JELGNBQWMsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUNyRCxtQkFBbUIsR0FBRyxJQUFJLGVBQWUsQ0FBUyxLQUFLLENBQUMsQ0FBQztJQUN6RCxVQUFVLEdBQUcsSUFBSSxlQUFlLENBQVMsQ0FBQyxDQUFDLENBQUM7SUFDNUMsZ0JBQWdCLEdBQUcsSUFBSSxlQUFlLENBQVMsQ0FBQyxDQUFDLENBQUM7SUFDbEQsZUFBZSxHQUFHLElBQUksZUFBZSxDQUFVLElBQUksQ0FBQyxDQUFDO0lBQ3JELGdCQUFnQixHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBRXZELGVBQWUsR0FBRyxJQUFJLGVBQWUsQ0FBZ0IsRUFBRSxDQUFDLENBQUM7SUFFekQsUUFBUSxHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQy9DLGdCQUFnQixHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQ3ZELFdBQVcsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUNsRCxVQUFVLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFDakQsV0FBVyxHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQ2xELFFBQVEsR0FBRyxJQUFJLGVBQWUsQ0FBUyxFQUFFLENBQUMsQ0FBQztJQUMzQyxlQUFlLEdBQUcsSUFBSSxlQUFlLENBQTJCLEVBQUUsQ0FBQyxDQUFDO0lBQ3BFLGlCQUFpQixHQUFHLElBQUksZUFBZSxDQUEyQixFQUFFLENBQUMsQ0FBQztJQUN0RSxvQkFBb0IsR0FBRyxJQUFJLGVBQWUsQ0FBVyxFQUFFLENBQUMsQ0FBQztJQUN6RCxZQUFZLEdBQUcsSUFBSSxlQUFlLENBQVcsRUFBRSxDQUFDLENBQUM7SUFDakQsbUJBQW1CLEdBQUcsSUFBSSxlQUFlLENBQVMsRUFBRSxDQUFDLENBQUM7SUFDdEQscUJBQXFCLEdBQUcsSUFBSSxlQUFlLENBQVMsRUFBRSxDQUFDLENBQUM7SUFDeEQsYUFBYSxHQUFHLElBQUksZUFBZSxDQUFTLEVBQUUsQ0FBQyxDQUFDO0lBQ2hELGVBQWUsR0FBRyxJQUFJLGVBQWUsQ0FBUyxFQUFFLENBQUMsQ0FBQztJQUNsRCxZQUFZLEdBQUcsSUFBSSxlQUFlLENBQTJCLEVBQUUsQ0FBQyxDQUFDO0lBQ2pFLGVBQWUsR0FBRyxJQUFJLGVBQWUsQ0FBVyxFQUFFLENBQUMsQ0FBQztJQUNwRCxXQUFXLEdBQUcsSUFBSSxlQUFlLENBQXFCLElBQUksQ0FBQyxDQUFDO0lBQzVELGFBQWEsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUNwRCxhQUFhLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFDcEQsWUFBWSxHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQ25ELGFBQWEsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUNwRCxvQkFBb0IsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUMzRCxpQkFBaUIsR0FBRyxJQUFJLGVBQWUsQ0FBZ0IsSUFBSSxDQUFDLENBQUM7SUFDN0QsZ0JBQWdCLEdBQUcsSUFBSSxlQUFlLENBQVMsQ0FBQyxDQUFDLENBQUM7SUFDbEQsV0FBVyxHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQ2xELGdCQUFnQixHQUFHLElBQUksZUFBZSxDQUFxQixJQUFJLENBQUMsQ0FBQztJQUNqRSwyQkFBMkIsR0FBRyxJQUFJLGVBQWUsQ0FBUyxFQUFFLENBQUMsQ0FBQztJQUM5RCxpQkFBaUIsR0FBRyxJQUFJLGVBQWUsQ0FBUyxNQUFNLENBQUMsQ0FBQztJQUN4RCxjQUFjLEdBQUcsSUFBSSxlQUFlLENBQVMsTUFBTSxDQUFDLENBQUM7SUFDckQsVUFBVSxHQUFHLElBQUksZUFBZSxDQUFTLEVBQUUsQ0FBQyxDQUFDO0lBQzdDLE9BQU8sR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUM5QyxlQUFlLEdBQUcsSUFBSSxlQUFlLENBQVcsRUFBRSxDQUFDLENBQUM7SUFDcEQsaUJBQWlCLEdBQUcsSUFBSSxlQUFlLENBQVcsRUFBRSxDQUFDLENBQUM7SUFDdEQsV0FBVyxHQUFHLElBQUksZUFBZSxDQUFXLEVBQUUsQ0FBQyxDQUFDO0lBQ2hELGVBQWUsR0FBRyxJQUFJLGVBQWUsQ0FBVyxFQUFFLENBQUMsQ0FBQztJQUNwRCxhQUFhLEdBQUcsSUFBSSxlQUFlLENBQVcsRUFBRSxDQUFDLENBQUM7SUFDbEQsZUFBZSxHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQ3RELG1CQUFtQixHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQzFELGVBQWUsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUN0RCxTQUFTLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFDaEQsWUFBWSxHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQ25ELFVBQVUsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUNqRCxpQkFBaUIsR0FBRyxJQUFJLGVBQWUsQ0FBZ0IsSUFBSSxDQUFDLENBQUM7SUFDN0Qsa0JBQWtCLEdBQUcsSUFBSSxlQUFlLENBQWdCLElBQUksQ0FBQyxDQUFDO0lBQzlELGdCQUFnQixHQUFHLElBQUksZUFBZSxDQUFnQixJQUFJLENBQUMsQ0FBQztJQUM1RCxnQkFBZ0IsR0FBRyxJQUFJLGVBQWUsQ0FBUyxDQUFDLENBQUMsQ0FBQztJQUNsRCxpQkFBaUIsR0FBRyxJQUFJLGVBQWUsQ0FBUyxDQUFDLENBQUMsQ0FBQztJQUNuRCxlQUFlLEdBQUcsSUFBSSxlQUFlLENBQVMsQ0FBQyxDQUFDLENBQUM7SUFDakQsNEJBQTRCLEdBQUcsSUFBSSxlQUFlLENBQVMsR0FBRyxDQUFDLENBQUM7SUFDaEUsV0FBVyxHQUFHLElBQUksZUFBZSxDQUFXLEVBQUUsQ0FBQyxDQUFDO0lBQ2hELFNBQVMsR0FBRyxJQUFJLGVBQWUsQ0FBUyxNQUFNLENBQUMsQ0FBQztJQUNoRCxnQkFBZ0IsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUN2RCxpQkFBaUIsR0FBRyxJQUFJLGVBQWUsQ0FBcUIsSUFBSSxDQUFDLENBQUM7SUFDbEUsZUFBZSxHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQ3RELGFBQWEsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUNwRCxXQUFXLEdBQUcsSUFBSSxlQUFlLENBQVMsRUFBRSxDQUFDLENBQUM7SUFDOUMsYUFBYSxHQUFHLElBQUksZUFBZSxDQUEyQixFQUFFLENBQUMsQ0FBQztJQUNsRSxVQUFVLEdBQUcsSUFBSSxlQUFlLENBQVMsRUFBRSxDQUFDLENBQUM7SUFDN0MsV0FBVyxHQUFHLElBQUksZUFBZSxDQUFXLEVBQUUsQ0FBQyxDQUFDO0lBQ2hELGtCQUFrQixHQUFHLElBQUksZUFBZSxDQUFnQixFQUFFLENBQUMsQ0FBQztJQUM1RCxpQkFBaUIsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUN4RCxhQUFhLEdBQUcsSUFBSSxlQUFlLENBQWtCLEVBQUUsQ0FBQyxDQUFDO0lBQ3pELG9CQUFvQixHQUFHLElBQUksZUFBZSxDQUEyQixFQUFFLENBQUMsQ0FBQztJQUN6RSx3QkFBd0IsR0FBRyxJQUFJLGVBQWUsQ0FBZ0IsRUFBRSxDQUFDLENBQUM7SUFDbEUsZ0JBQWdCLEdBQUcsSUFBSSxlQUFlLENBQTZCLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZFLGdCQUFnQixHQUFHLElBQUksZUFBZSxDQUFxQixJQUFJLENBQUMsQ0FBQztJQUNqRSxVQUFVLEdBQUcsSUFBSSxlQUFlLENBQVMsRUFBRSxDQUFDLENBQUM7SUFDN0MsMkJBQTJCLEdBQUcsSUFBSSxlQUFlLENBQVMsRUFBRSxDQUFDLENBQUM7SUFDOUQsNEJBQTRCLEdBQUcsSUFBSSxlQUFlLENBQVMsRUFBRSxDQUFDLENBQUM7SUFDL0Qsb0JBQW9CLEdBQUcsSUFBSSxlQUFlLENBQVMsRUFBRSxDQUFDLENBQUM7SUFDdkQsb0JBQW9CLEdBQUcsSUFBSSxlQUFlLENBQVMsRUFBRSxDQUFDLENBQUM7SUFDdkQsV0FBVyxHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQ2xELGdCQUFnQixHQUFHLElBQUksZUFBZSxDQUFTLEVBQUUsQ0FBQyxDQUFDO0lBQ25ELGlCQUFpQixHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQ3hELFlBQVksR0FBRyxJQUFJLGVBQWUsQ0FBZ0I7UUFDaEQ7WUFDRSxnQkFBZ0IsRUFBRSxFQUFFO1lBQ3BCLG9CQUFvQixFQUFFLEVBQUU7WUFDeEIsZ0JBQWdCLEVBQUUsS0FBSztZQUN2QixpQkFBaUIsRUFBRSxLQUFLO1NBQ3pCO0tBQ0YsQ0FBQyxDQUFDO0lBQ0gsZ0JBQWdCLEdBQUcsSUFBSSxlQUFlLENBQWdCO1FBQ3BEO1lBQ0UsZ0JBQWdCLEVBQUUsRUFBRTtZQUNwQixvQkFBb0IsRUFBRSxFQUFFO1lBQ3hCLGdCQUFnQixFQUFFLEtBQUs7WUFDdkIsaUJBQWlCLEVBQUUsS0FBSztTQUN6QjtLQUNGLENBQUMsQ0FBQztJQUNILGVBQWUsR0FBRyxJQUFJLGVBQWUsQ0FBZ0IsSUFBSSxDQUFDLENBQUM7SUFDM0QsVUFBVSxHQUFHLElBQUksZUFBZSxDQUFnQixJQUFJLENBQUMsQ0FBQztJQUN0RCxrQkFBa0IsR0FBRyxJQUFJLGVBQWUsQ0FBUyxDQUFDLENBQUMsQ0FBQztJQUNwRCxjQUFjLEdBQUcsSUFBSSxlQUFlLENBQVMsQ0FBQyxDQUFDLENBQUM7SUFDaEQsYUFBYSxHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQ3BELFlBQVksR0FBRyxJQUFJLGVBQWUsQ0FBUyxDQUFDLENBQUMsQ0FBQztJQUM5QyxlQUFlLEdBQUcsSUFBSSxlQUFlLENBQVMsS0FBSyxDQUFDLENBQUM7SUFDckQsbUJBQW1CLEdBQUcsSUFBSSxlQUFlLENBQVMsS0FBSyxDQUFDLENBQUM7SUFDekQsZUFBZSxHQUFHLElBQUksZUFBZSxDQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ2pELGNBQWMsR0FBRyxJQUFJLGVBQWUsQ0FBVyxFQUFFLENBQUMsQ0FBQztJQUNuRCxlQUFlLEdBQUcsSUFBSSxlQUFlLENBQVMsQ0FBQyxDQUFDLENBQUM7SUFDakQsZUFBZSxHQUFHLElBQUksZUFBZSxDQUFTLEdBQUcsQ0FBQyxDQUFDO0lBQ25ELG1CQUFtQixHQUFHLElBQUksZUFBZSxDQUFTLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUUsY0FBYyxHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQ3JELFVBQVUsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUNqRCxVQUFVLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFDakQsUUFBUSxHQUFHLElBQUksZUFBZSxDQUEyQixFQUFFLENBQUMsQ0FBQztJQUM3RCxjQUFjLEdBQUcsSUFBSSxlQUFlLENBQTJCLEVBQUUsQ0FBQyxDQUFDO0lBQ25FLGFBQWEsR0FBRyxJQUFJLGVBQWUsQ0FDakMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxLQUFLLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQ3ZGLENBQUM7SUFDRixZQUFZLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFDbkQsY0FBYyxHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQ3JELGFBQWEsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUNwRCxPQUFPLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFDOUMsVUFBVSxHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQ2pELFFBQVEsR0FBRyxJQUFJLGVBQWUsQ0FBUyxDQUFDLENBQUMsQ0FBQztJQUMxQyxRQUFRLEdBQUcsSUFBSSxlQUFlLENBQVMsQ0FBQyxDQUFDLENBQUM7SUFDMUMsV0FBVyxHQUFHLElBQUksZUFBZSxDQUFTLENBQUMsQ0FBQyxDQUFDO0lBQzdDLFdBQVcsR0FBRyxJQUFJLGVBQWUsQ0FBUyxDQUFDLENBQUMsQ0FBQztJQUM3QyxXQUFXLEdBQUcsSUFBSSxlQUFlLENBQVMsQ0FBQyxDQUFDLENBQUM7SUFDN0MsY0FBYyxHQUFHLElBQUksZUFBZSxDQUEyQixFQUFFLENBQUMsQ0FBQztJQUNuRSxZQUFZLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFDbkQsT0FBTyxHQUFHLElBQUksZUFBZSxDQUFxQixJQUFJLENBQUMsQ0FBQztJQUN4RCxhQUFhLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFDcEQsZUFBZSxHQUFHLElBQUksZUFBZSxDQUEyQixFQUFFLENBQUMsQ0FBQztJQUNwRSxrQkFBa0IsR0FBRyxJQUFJLGVBQWUsQ0FBVyxFQUFFLENBQUMsQ0FBQztJQUN2RCxjQUFjLEdBQUcsSUFBSSxlQUFlLENBQWtCLElBQUksQ0FBQyxDQUFDO0lBQzVELFVBQVUsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUNqRCxxQkFBcUIsR0FBRyxJQUFJLGVBQWUsQ0FBUyxFQUFFLENBQUMsQ0FBQztJQUN4RCxtQkFBbUIsR0FBRyxJQUFJLGVBQWUsQ0FBNEIsWUFBWSxDQUFDLENBQUM7SUFDbkYsU0FBUyxHQUFHLElBQUksZUFBZSxDQUFZO1FBQ3pDLFNBQVMsRUFBRSxDQUFDO1FBQ1osVUFBVSxFQUFFLENBQUM7UUFDYixZQUFZLEVBQUUsQ0FBQztRQUNmLGFBQWEsRUFBRSxDQUFDO0tBQ2pCLENBQUMsQ0FBQztJQUNILHNCQUFzQixHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQzdELGNBQWMsR0FBRyxJQUFJLGVBQWUsQ0FBeUIsRUFBRSxDQUFDLENBQUM7SUFDakUsZ0JBQWdCLEdBQUcsSUFBSSxlQUFlLENBQTJCLEVBQUUsQ0FBQyxDQUFDO0lBQ3JFLGdCQUFnQixHQUFHLElBQUksZUFBZSxDQUF5QixFQUFFLENBQUMsQ0FBQztJQUNuRSxXQUFXLEdBQUcsSUFBSSxlQUFlLENBQW9CLEVBQUUsQ0FBQyxDQUFDO0lBQ3pELFdBQVcsR0FBRyxJQUFJLGVBQWUsQ0FBb0IsRUFBRSxDQUFDLENBQUM7SUFDekQsbUJBQW1CLEdBQUcsSUFBSSxlQUFlLENBQVMsVUFBVSxDQUFDLENBQUM7SUFDOUQsa0JBQWtCLEdBQUcsSUFBSSxlQUFlLENBQVMsQ0FBQyxDQUFDLENBQUM7SUFDcEQsZ0JBQWdCLEdBQUcsSUFBSSxlQUFlLENBQWdCLEVBQUUsQ0FBQyxDQUFDO0lBRTFELGVBQWUsR0FBRyxDQUFDLEtBQWMsRUFBRSxFQUFFO1FBQ25DLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdCLENBQUMsQ0FBQztJQUVGLFlBQVksR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQy9CLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFCLENBQUMsQ0FBQztJQUVGLFlBQVksR0FBRyxDQUFDLEtBQW9CLEVBQUUsRUFBRTtRQUN0QyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMxQixDQUFDLENBQUM7SUFFRixjQUFjLEdBQUcsQ0FBQyxLQUE4QixFQUFFLEVBQUU7UUFDbEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUIsQ0FBQyxDQUFDO0lBRUYsWUFBWSxHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7UUFDL0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUIsQ0FBQyxDQUFDO0lBRUYsaUJBQWlCLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtRQUNwQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQixDQUFDLENBQUM7SUFFRixjQUFjLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtRQUNqQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QixDQUFDLENBQUM7SUFFRixVQUFVLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtRQUM3QixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN4QixDQUFDLENBQUM7SUFFRixjQUFjLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtRQUNqQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QixDQUFDLENBQUM7SUFFRixZQUFZLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtRQUMvQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMxQixDQUFDLENBQUM7SUFFRixtQkFBbUIsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQ3RDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pDLENBQUMsQ0FBQztJQUVGLGFBQWEsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQ2hDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNCLENBQUMsQ0FBQztJQUVGLFlBQVksR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQy9CLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFCLENBQUMsQ0FBQztJQUVGLDBCQUEwQixHQUFHLENBQUMsS0FBNkIsRUFBRSxFQUFFO1FBQzdELElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDeEMsQ0FBQyxDQUFDO0lBRUYsa0JBQWtCLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUN0QyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoQyxDQUFDLENBQUM7SUFFRixnQkFBZ0IsR0FBRyxDQUFDLEtBQWMsRUFBRSxFQUFFO1FBQ3BDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlCLENBQUMsQ0FBQztJQUVGLHVCQUF1QixHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDM0MsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyQyxDQUFDLENBQUM7SUFFRix3QkFBd0IsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQzNDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEMsQ0FBQyxDQUFDO0lBRUYsMkJBQTJCLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUMvQyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3pDLENBQUMsQ0FBQztJQUVGLGVBQWUsR0FBRyxDQUFDLEtBQWdCLEVBQUUsRUFBRTtRQUNyQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QixDQUFDLENBQUM7SUFFRixrQkFBa0IsR0FBRyxDQUFDLEtBQW9CLEVBQUUsRUFBRTtRQUM1QyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUQsQ0FBQyxDQUFDO0lBRUYsMEJBQTBCLEdBQUcsQ0FBQyxLQUFvQixFQUFFLEVBQUU7UUFDcEQsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN4QyxDQUFDLENBQUM7SUFFRix5QkFBeUIsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQzVDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkMsQ0FBQyxDQUFDO0lBRUYsd0JBQXdCLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtRQUMzQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3RDLENBQUMsQ0FBQztJQUVGLHFCQUFxQixHQUFHLENBQUMsS0FBc0IsRUFBRSxFQUFFO1FBQ2pELElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25DLENBQUMsQ0FBQztJQUVGLHFCQUFxQixHQUFHLENBQUMsS0FBNkIsRUFBRSxFQUFFO1FBQ3hELElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25DLENBQUMsQ0FBQztJQUVGLGlCQUFpQixHQUFHLENBQUMsS0FBZSxFQUFFLEVBQUU7UUFDdEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0IsQ0FBQyxDQUFDO0lBRUYsdUJBQXVCLEdBQUcsQ0FBQyxLQUErQixFQUFFLEVBQUU7UUFDNUQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyQyxDQUFDLENBQUM7SUFFRixtQkFBbUIsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQ3RDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pDLENBQUMsQ0FBQztJQUVGLG1CQUFtQixHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDdkMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakMsQ0FBQyxDQUFDO0lBRUYsaUJBQWlCLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUNyQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQixDQUFDLENBQUM7SUFFRixxQkFBcUIsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQ3hDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25DLENBQUMsQ0FBQztJQUVGLHdCQUF3QixHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDNUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN0QyxDQUFDLENBQUM7SUFFRixZQUFZLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUNoQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25DLElBQUksS0FBSyxFQUFFLENBQUM7WUFDVixVQUFVLENBQUMsS0FBSyxJQUFJLEVBQUU7Z0JBQ3BCLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUM1QyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDWCxDQUFDO0lBQ0gsQ0FBQyxDQUFDO0lBRUYsdUJBQXVCLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtRQUMxQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JDLENBQUMsQ0FBQztJQUVGLHNCQUFzQixHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7UUFDekMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNwQyxDQUFDLENBQUM7SUFFRiwwQkFBMEIsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQzdDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDeEMsQ0FBQyxDQUFDO0lBRUYsYUFBYSxHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDakMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0IsQ0FBQyxDQUFDO0lBRUYsZUFBZSxHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7UUFDbEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0IsQ0FBQyxDQUFDO0lBRUYsYUFBYSxHQUFHLENBQUMsS0FBa0IsRUFBRSxFQUFFO1FBQ3JDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNCLENBQUMsQ0FBQztJQUVGLGFBQWEsR0FBRyxDQUFDLEtBQWtCLEVBQUUsRUFBRTtRQUNyQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzQixDQUFDLENBQUM7SUFFRixrQkFBa0IsR0FBRyxDQUFDLEtBQXVCLEVBQUUsRUFBRTtRQUMvQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoQyxDQUFDLENBQUM7SUFFRixhQUFhLEdBQUcsQ0FBQyxLQUFrQixFQUFFLEVBQUU7UUFDckMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0IsQ0FBQyxDQUFDO0lBRUYsK0JBQStCLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtRQUNsRCxJQUFJLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdDLENBQUMsQ0FBQztJQUVGLCtCQUErQixHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7UUFDbEQsSUFBSSxDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QyxDQUFDLENBQUM7SUFFRiwyQkFBMkIsR0FBRyxDQUFDLEtBQWMsRUFBRSxFQUFFO1FBQy9DLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDekMsQ0FBQyxDQUFDO0lBRUYsK0JBQStCLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtRQUNsRCxJQUFJLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdDLENBQUMsQ0FBQztJQUVGLHlDQUF5QyxHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7UUFDNUQsSUFBSSxDQUFDLG1DQUFtQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2RCxDQUFDLENBQUM7SUFFRiwrQkFBK0IsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQ2xELElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0MsQ0FBQyxDQUFDO0lBRUYsK0JBQStCLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtRQUNsRCxJQUFJLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdDLENBQUMsQ0FBQztJQUVGLDJCQUEyQixHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDL0MsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN6QyxDQUFDLENBQUM7SUFFRiwrQkFBK0IsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQ2xELElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0MsQ0FBQyxDQUFDO0lBRUYseUNBQXlDLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtRQUM1RCxJQUFJLENBQUMsbUNBQW1DLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZELENBQUMsQ0FBQztJQUVGLHFDQUFxQyxHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDekQsSUFBSSxDQUFDLCtCQUErQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuRCxDQUFDLENBQUM7SUFFRix1Q0FBdUMsR0FBRyxDQUFDLEtBQWMsRUFBRSxFQUFFO1FBQzNELElBQUksQ0FBQyxpQ0FBaUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckQsQ0FBQyxDQUFDO0lBRUYsNkNBQTZDLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUNqRSxJQUFJLENBQUMsdUNBQXVDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNELENBQUMsQ0FBQztJQUVGLCtDQUErQyxHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDbkUsSUFBSSxDQUFDLHlDQUF5QyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3RCxDQUFDLENBQUM7SUFFRixtQ0FBbUMsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQ3RELElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakQsQ0FBQyxDQUFDO0lBRUYseUNBQXlDLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUM3RCxJQUFJLENBQUMsbUNBQW1DLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZELENBQUMsQ0FBQztJQUVGLGtDQUFrQyxHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDdEQsSUFBSSxDQUFDLDRCQUE0QixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoRCxDQUFDLENBQUM7SUFFRix5QkFBeUIsR0FBRyxDQUFDLEtBQTBCLEVBQUUsRUFBRTtRQUN6RCxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZDLENBQUMsQ0FBQztJQUVGLGVBQWUsR0FBRyxDQUFDLEtBQWMsRUFBRSxFQUFFO1FBQ25DLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdCLENBQUMsQ0FBQztJQUVGLGlCQUFpQixHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDckMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0IsQ0FBQyxDQUFDO0lBRUYsZUFBZSxHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDbkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0IsQ0FBQyxDQUFDO0lBRUYseUJBQXlCLEdBQUcsQ0FBQyxLQUE0QixFQUFFLEVBQUU7UUFDM0QsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2QyxDQUFDLENBQUM7SUFFRixxQkFBcUIsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQ3hDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25DLENBQUMsQ0FBQztJQUVGLHVCQUF1QixHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7UUFDMUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyQyxDQUFDLENBQUM7SUFFRixvQkFBb0IsR0FBRyxDQUFDLEtBQWMsRUFBRSxFQUFFO1FBQ3hDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xDLENBQUMsQ0FBQztJQUVGLG9CQUFvQixHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDeEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbEMsQ0FBQyxDQUFDO0lBRUYseUJBQXlCLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtRQUM1QyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZDLENBQUMsQ0FBQztJQUVGLGdCQUFnQixHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7UUFDbkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUIsQ0FBQyxDQUFDO0lBRUYsc0JBQXNCLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtRQUN6QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BDLENBQUMsQ0FBQztJQUVGLHFCQUFxQixHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDekMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkMsQ0FBQyxDQUFDO0lBRUYsc0JBQXNCLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUMxQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BDLENBQUMsQ0FBQztJQUVGLHFCQUFxQixHQUFHLENBQUMsS0FBb0IsRUFBRSxFQUFFO1FBQy9DLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25DLENBQUMsQ0FBQztJQUVGLGNBQWMsR0FBRyxDQUFDLEtBQWMsRUFBRSxFQUFFO1FBQ2xDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVCLENBQUMsQ0FBQztJQUVGLHNCQUFzQixHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDMUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNwQyxDQUFDLENBQUM7SUFFRixpQkFBaUIsR0FBRyxDQUFDLEtBQWMsRUFBRSxFQUFFO1FBQ3JDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9CLENBQUMsQ0FBQztJQUVGLGdCQUFnQixHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDcEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUIsQ0FBQyxDQUFDO0lBRUYsaUJBQWlCLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUNyQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQixDQUFDLENBQUM7SUFFRixjQUFjLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtRQUNqQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QixDQUFDLENBQUM7SUFFRixxQkFBcUIsR0FBRyxDQUFDLEtBQStCLEVBQUUsRUFBRTtRQUMxRCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuQyxDQUFDLENBQUM7SUFFRix1QkFBdUIsR0FBRyxDQUFDLEtBQStCLEVBQUUsRUFBRTtRQUM1RCxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JDLENBQUMsQ0FBQztJQUVGLDBCQUEwQixHQUFHLENBQUMsS0FBZSxFQUFFLEVBQUU7UUFDL0MsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN4QyxDQUFDLENBQUM7SUFFRixrQkFBa0IsR0FBRyxDQUFDLEtBQWUsRUFBRSxFQUFFO1FBQ3ZDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hDLENBQUMsQ0FBQztJQUVGLHlCQUF5QixHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7UUFDNUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2QyxDQUFDLENBQUM7SUFFRiwyQkFBMkIsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQzlDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDekMsQ0FBQyxDQUFDO0lBRUYsbUJBQW1CLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtRQUN0QyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQyxDQUFDLENBQUM7SUFFRixxQkFBcUIsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQ3hDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25DLENBQUMsQ0FBQztJQUVGLGtCQUFrQixHQUFHLENBQUMsS0FBK0IsRUFBRSxFQUFFO1FBQ3ZELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hDLENBQUMsQ0FBQztJQUVGLHFCQUFxQixHQUFHLENBQUMsS0FBZSxFQUFFLEVBQUU7UUFDMUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkMsQ0FBQyxDQUFDO0lBRUYsaUJBQWlCLEdBQUcsQ0FBQyxLQUF5QixFQUFFLEVBQUU7UUFDaEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0IsQ0FBQyxDQUFDO0lBRUYsbUJBQW1CLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUN2QyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQyxDQUFDLENBQUM7SUFFRixtQkFBbUIsR0FBRyxDQUFDLEtBQWMsRUFBRSxFQUFFO1FBQ3ZDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pDLENBQUMsQ0FBQztJQUVGLGtCQUFrQixHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDdEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEMsQ0FBQyxDQUFDO0lBRUYsbUJBQW1CLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUN2QyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQyxDQUFDLENBQUM7SUFFRiwwQkFBMEIsR0FBRyxDQUFDLEtBQWMsRUFBRSxFQUFFO1FBQzlDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDeEMsQ0FBQyxDQUFDO0lBRUYsdUJBQXVCLEdBQUcsQ0FBQyxLQUFvQixFQUFFLEVBQUU7UUFDakQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyQyxDQUFDLENBQUM7SUFFRixzQkFBc0IsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQ3pDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEMsQ0FBQyxDQUFDO0lBRUYsaUJBQWlCLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUNyQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQixDQUFDLENBQUM7SUFFRixzQkFBc0IsR0FBRyxDQUFDLEtBQXlCLEVBQUUsRUFBRTtRQUNyRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BDLENBQUMsQ0FBQztJQUVGLGlDQUFpQyxHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7UUFDcEQsSUFBSSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQyxDQUFDLENBQUM7SUFFRix1QkFBdUIsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQzFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckMsQ0FBQyxDQUFDO0lBRUYsb0JBQW9CLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtRQUN2QyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNsQyxDQUFDLENBQUM7SUFFRixnQkFBZ0IsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQ25DLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlCLENBQUMsQ0FBQztJQUVGLGFBQWEsR0FBRyxDQUFDLEtBQWMsRUFBRSxFQUFFO1FBQ2pDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNCLENBQUMsQ0FBQztJQUVGLHFCQUFxQixHQUFHLENBQUMsS0FBZSxFQUFFLEVBQUU7UUFDMUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkMsQ0FBQyxDQUFDO0lBRUYsdUJBQXVCLEdBQUcsQ0FBQyxLQUFlLEVBQUUsRUFBRTtRQUM1QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JDLENBQUMsQ0FBQztJQUVGLGlCQUFpQixHQUFHLENBQUMsS0FBZSxFQUFFLEVBQUU7UUFDdEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0IsQ0FBQyxDQUFDO0lBRUYscUJBQXFCLEdBQUcsQ0FBQyxLQUFlLEVBQUUsRUFBRTtRQUMxQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuQyxDQUFDLENBQUM7SUFFRixtQkFBbUIsR0FBRyxDQUFDLEtBQWUsRUFBRSxFQUFFO1FBQ3hDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pDLENBQUMsQ0FBQztJQUVGLHFCQUFxQixHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDekMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkMsQ0FBQyxDQUFDO0lBRUYseUJBQXlCLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUM3QyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZDLENBQUMsQ0FBQztJQUVGLHFCQUFxQixHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDekMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkMsQ0FBQyxDQUFDO0lBRUYsZUFBZSxHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDbkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0IsQ0FBQyxDQUFDO0lBRUYsa0JBQWtCLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUN0QyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoQyxDQUFDLENBQUM7SUFFRixnQkFBZ0IsR0FBRyxDQUFDLEtBQWMsRUFBRSxFQUFFO1FBQ3BDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlCLENBQUMsQ0FBQztJQUVGLHVCQUF1QixHQUFHLENBQUMsS0FBb0IsRUFBRSxFQUFFO1FBQ2pELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckMsQ0FBQyxDQUFDO0lBRUYsd0JBQXdCLEdBQUcsQ0FBQyxLQUFvQixFQUFFLEVBQUU7UUFDbEQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN0QyxDQUFDLENBQUM7SUFFRixzQkFBc0IsR0FBRyxDQUFDLEtBQW9CLEVBQUUsRUFBRTtRQUNoRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BDLENBQUMsQ0FBQztJQUVGLHNCQUFzQixHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7UUFDekMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNwQyxDQUFDLENBQUM7SUFFRix1QkFBdUIsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQzFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckMsQ0FBQyxDQUFDO0lBRUYscUJBQXFCLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtRQUN4QyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuQyxDQUFDLENBQUM7SUFFRixpQkFBaUIsR0FBRyxDQUFDLEtBQWUsRUFBRSxFQUFFO1FBQ3RDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9CLENBQUMsQ0FBQztJQUVGLGVBQWUsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQ2xDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdCLENBQUMsQ0FBQztJQUVGLHNCQUFzQixHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDMUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNwQyxDQUFDLENBQUM7SUFFRix1QkFBdUIsR0FBRyxDQUFDLEtBQXlCLEVBQUUsRUFBRTtRQUN0RCxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JDLENBQUMsQ0FBQztJQUVGLHFCQUFxQixHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDekMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkMsQ0FBQyxDQUFDO0lBRUYsbUJBQW1CLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUN2QyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQyxDQUFDLENBQUM7SUFFRixpQkFBaUIsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQ3BDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9CLENBQUMsQ0FBQztJQUVGLG1CQUFtQixHQUFHLENBQUMsS0FBK0IsRUFBRSxFQUFFO1FBQ3hELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pDLENBQUMsQ0FBQztJQUVGLGdCQUFnQixHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7UUFDbkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUIsQ0FBQyxDQUFDO0lBRUYsaUJBQWlCLEdBQUcsQ0FBQyxLQUFlLEVBQUUsRUFBRTtRQUN0QyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQixDQUFDLENBQUM7SUFFRix3QkFBd0IsR0FBRyxDQUFDLEtBQW9CLEVBQUUsRUFBRTtRQUNsRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3RDLENBQUMsQ0FBQztJQUVGLHVCQUF1QixHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDM0MsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyQyxDQUFDLENBQUM7SUFFRixtQkFBbUIsR0FBRyxDQUFDLEtBQXNCLEVBQUUsRUFBRTtRQUMvQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQyxDQUFDLENBQUM7SUFFRiwwQkFBMEIsR0FBRyxDQUFDLEtBQStCLEVBQUUsRUFBRTtRQUMvRCxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3hDLENBQUMsQ0FBQztJQUVGLDhCQUE4QixHQUFHLENBQUMsS0FBb0IsRUFBRSxFQUFFO1FBQ3hELElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUMsQ0FBQyxDQUFDO0lBRUYsc0JBQXNCLEdBQUcsQ0FBQyxLQUFpQyxFQUFFLEVBQUU7UUFDN0QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNwQyxDQUFDLENBQUM7SUFFRixzQkFBc0IsR0FBRyxDQUFDLEtBQXlCLEVBQUUsRUFBRTtRQUNyRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BDLENBQUMsQ0FBQztJQUVGLGdCQUFnQixHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7UUFDbkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUIsQ0FBQyxDQUFDO0lBRUYsaUNBQWlDLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtRQUNwRCxJQUFJLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9DLENBQUMsQ0FBQztJQUVGLGtDQUFrQyxHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7UUFDckQsSUFBSSxDQUFDLDRCQUE0QixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoRCxDQUFDLENBQUM7SUFFRiwwQkFBMEIsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQzdDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDeEMsQ0FBQyxDQUFDO0lBRUYsMEJBQTBCLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtRQUM3QyxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3hDLENBQUMsQ0FBQztJQUVGLGlCQUFpQixHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDckMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0IsQ0FBQyxDQUFDO0lBRUYsc0JBQXNCLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtRQUN6QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BDLENBQUMsQ0FBQztJQUVGLHVCQUF1QixHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDM0MsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyQyxDQUFDLENBQUM7SUFFRixrQkFBa0IsR0FBRyxDQUFDLEtBQW9CLEVBQUUsRUFBRTtRQUM1QyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoQyxDQUFDLENBQUM7SUFFRixzQkFBc0IsR0FBRyxDQUFDLEtBQW9CLEVBQUUsRUFBRTtRQUNoRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BDLENBQUMsQ0FBQztJQUVGLHFCQUFxQixHQUFHLENBQUMsS0FBb0IsRUFBRSxFQUFFO1FBQy9DLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25DLENBQUMsQ0FBQztJQUVGLGdCQUFnQixHQUFHLENBQUMsS0FBb0IsRUFBRSxFQUFFO1FBQzFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlCLENBQUMsQ0FBQztJQUVGLHdCQUF3QixHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7UUFDM0MsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN0QyxDQUFDLENBQUM7SUFFRixvQkFBb0IsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQ3ZDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xDLENBQUMsQ0FBQztJQUVGLG1CQUFtQixHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDdkMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakMsQ0FBQyxDQUFDO0lBRUYsa0JBQWtCLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtRQUNyQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoQyxDQUFDLENBQUM7SUFFRixxQkFBcUIsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQ3hDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25DLENBQUMsQ0FBQztJQUVGLG9CQUFvQixHQUFHLENBQUMsS0FBZSxFQUFFLEVBQUU7UUFDekMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbEMsQ0FBQyxDQUFDO0lBRUYscUJBQXFCLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtRQUN4QyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuQyxDQUFDLENBQUM7SUFFRixxQkFBcUIsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQ3hDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25DLENBQUMsQ0FBQztJQUVGLHlCQUF5QixHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7UUFDNUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2QyxDQUFDLENBQUM7SUFFRixvQkFBb0IsR0FBRyxDQUFDLEtBQWMsRUFBRSxFQUFFO1FBQ3hDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xDLENBQUMsQ0FBQztJQUVGLGdCQUFnQixHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDcEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUIsQ0FBQyxDQUFDO0lBRUYsZ0JBQWdCLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUNwQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QixDQUFDLENBQUM7SUFFRixjQUFjLEdBQUcsQ0FBQyxLQUErQixFQUFFLEVBQUU7UUFDbkQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUIsQ0FBQyxDQUFDO0lBRUYsb0JBQW9CLEdBQUcsQ0FBQyxLQUErQixFQUFFLEVBQUU7UUFDekQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbEMsQ0FBQyxDQUFDO0lBRUYsbUJBQW1CLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtRQUN0QyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQyxDQUFDLENBQUM7SUFFRixrQkFBa0IsR0FBRyxDQUFDLEtBQWMsRUFBRSxFQUFFO1FBQ3RDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hDLENBQUMsQ0FBQztJQUVGLG9CQUFvQixHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDeEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbEMsQ0FBQyxDQUFDO0lBRUYsbUJBQW1CLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUN2QyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQyxDQUFDLENBQUM7SUFFRixhQUFhLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUNqQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzQixDQUFDLENBQUM7SUFFRixnQkFBZ0IsR0FBRyxDQUFDLEtBQWMsRUFBRSxFQUFFO1FBQ3BDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlCLENBQUMsQ0FBQztJQUVGLGNBQWMsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQ2pDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVCLENBQUMsQ0FBQztJQUVGLGNBQWMsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQ2pDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVCLENBQUMsQ0FBQztJQUVGLGlCQUFpQixHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7UUFDcEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0IsQ0FBQyxDQUFDO0lBRUYsaUJBQWlCLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtRQUNwQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQixDQUFDLENBQUM7SUFFRixpQkFBaUIsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQ3BDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9CLENBQUMsQ0FBQztJQUVGLG9CQUFvQixHQUFHLENBQUMsS0FBK0IsRUFBRSxFQUFFO1FBQ3pELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xDLENBQUMsQ0FBQztJQUVGLGtCQUFrQixHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDdEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEMsQ0FBQyxDQUFDO0lBRUYsYUFBYSxHQUFHLENBQUMsS0FBeUIsRUFBRSxFQUFFO1FBQzVDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNCLENBQUMsQ0FBQztJQUVGLG1CQUFtQixHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDdkMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakMsQ0FBQyxDQUFDO0lBRUYscUJBQXFCLEdBQUcsQ0FBQyxLQUErQixFQUFFLEVBQUU7UUFDMUQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkMsQ0FBQyxDQUFDO0lBRUYsd0JBQXdCLEdBQUcsQ0FBQyxLQUFlLEVBQUUsRUFBRTtRQUM3QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3RDLENBQUMsQ0FBQztJQUVGLG9CQUFvQixHQUFHLENBQUMsS0FBc0IsRUFBRSxFQUFFO1FBQ2hELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xDLENBQUMsQ0FBQztJQUVGLGdCQUFnQixHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDcEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUIsQ0FBQyxDQUFDO0lBRUYsMkJBQTJCLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtRQUM5QyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3pDLENBQUMsQ0FBQztJQUVGLHlCQUF5QixHQUFHLENBQUMsS0FBZ0MsRUFBRSxFQUFFO1FBQy9ELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkMsQ0FBQyxDQUFDO0lBRUYsZUFBZSxHQUFHLENBQUMsS0FBZ0IsRUFBRSxFQUFFO1FBQ3JDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdCLENBQUMsQ0FBQztJQUVGLDRCQUE0QixHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDaEQsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMxQyxDQUFDLENBQUM7SUFFRixvQkFBb0IsR0FBRyxDQUFDLEtBQTZCLEVBQUUsRUFBRTtRQUN2RCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNsQyxDQUFDLENBQUM7SUFFRixzQkFBc0IsR0FBRyxDQUFDLEtBQStCLEVBQUUsRUFBRTtRQUMzRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BDLENBQUMsQ0FBQztJQUVGLHNCQUFzQixHQUFHLENBQUMsS0FBNkIsRUFBRSxFQUFFO1FBQ3pELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEMsQ0FBQyxDQUFDO0lBRUYsaUJBQWlCLEdBQUcsQ0FBQyxLQUF3QixFQUFFLEVBQUU7UUFDL0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0IsQ0FBQyxDQUFDO0lBRUYsaUJBQWlCLEdBQUcsQ0FBQyxLQUF3QixFQUFFLEVBQUU7UUFDL0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0IsQ0FBQyxDQUFDO0lBRUYseUJBQXlCLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtRQUM1QyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZDLENBQUMsQ0FBQztJQUVGLHdCQUF3QixHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7UUFDM0MsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN0QyxDQUFDLENBQUM7SUFFRixzQkFBc0IsR0FBRyxDQUFDLEtBQW9CLEVBQUUsRUFBRTtRQUNoRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BDLENBQUMsQ0FBQztJQUVGLFdBQVc7SUFDWCxRQUFRLEdBQUcsSUFBSSxlQUFlLENBQVksRUFBRSxDQUFDLENBQUM7SUFDOUMsa0JBQWtCLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFDekQsb0JBQW9CLEdBQUcsSUFBSSxlQUFlLENBQXFCLElBQUksQ0FBQyxDQUFDO0lBQ3JFLGlCQUFpQixHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBRXhELGlCQUFpQjtJQUNqQixZQUFZLEdBQUcsSUFBSSxlQUFlLENBQVMsT0FBTyxDQUFDLENBQUM7SUFDcEQsWUFBWSxHQUFHLElBQUksZUFBZSxDQUFTLE9BQU8sQ0FBQyxDQUFDO0lBQ3BELGtCQUFrQixHQUFHLElBQUksZUFBZSxDQUFTLE9BQU8sQ0FBQyxDQUFDO0lBQzFELFdBQVcsR0FBRyxJQUFJLGVBQWUsQ0FBUyxPQUFPLENBQUMsQ0FBQztJQUVuRCxtQkFBbUI7SUFDbkIsYUFBYSxHQUFHLElBQUksZUFBZSxDQUFTLE9BQU8sQ0FBQyxDQUFDO0lBQ3JELFFBQVEsR0FBRyxJQUFJLGVBQWUsQ0FBVSxJQUFJLENBQUMsQ0FBQztJQUM5QyxnQkFBZ0IsR0FBRyxJQUFJLGVBQWUsQ0FBVSxJQUFJLENBQUMsQ0FBQztJQUN0RCxvQkFBb0IsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUMzRCxzQkFBc0IsR0FBRyxJQUFJLGVBQWUsQ0FBUyxPQUFPLENBQUMsQ0FBQztJQUU5RCxlQUFlO0lBQ2YsaUJBQWlCLEdBQUcsSUFBSSxlQUFlLENBQVMsRUFBRSxDQUFDLENBQUM7SUFDcEQsZUFBZSxHQUFHLElBQUksZUFBZSxDQUEyQixFQUFFLENBQUMsQ0FBQztJQUNwRSxrQkFBa0IsR0FBRyxJQUFJLGVBQWUsQ0FBUyxDQUFDLENBQUMsQ0FBQztJQUNwRCx1QkFBdUIsR0FBRyxJQUFJLGVBQWUsQ0FBMkIsRUFBRSxDQUFDLENBQUM7SUFFNUUsV0FBVztJQUNYLGFBQWEsR0FBRyxJQUFJLGVBQWUsQ0FBUyxFQUFFLENBQUMsQ0FBQztJQUNoRCxXQUFXLEdBQUcsSUFBSSxlQUFlLENBQVksRUFBRSxDQUFDLENBQUM7SUFDakQsY0FBYyxHQUFHLElBQUksZUFBZSxDQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ2hELG1CQUFtQixHQUFHLElBQUksZUFBZSxDQUFZLEVBQUUsQ0FBQyxDQUFDO0lBRXpELGtDQUFrQztJQUNsQyxZQUFZLEdBQUcsSUFBSSxlQUFlLENBQVMsQ0FBQyxDQUFDLENBQUM7SUFFOUMsU0FBUztJQUNULFlBQVksR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUNuRCxZQUFZLEdBQUcsSUFBSSxlQUFlLENBQVMsRUFBRSxDQUFDLENBQUM7SUFDL0MsU0FBUyxHQUFHLElBQUksZUFBZSxDQUF1QixTQUFTLENBQUMsQ0FBQztJQUNqRSxhQUFhLEdBQUcsSUFBSSxlQUFlLENBQVMsSUFBSSxDQUFDLENBQUM7SUFFbEQsaUJBQWlCO0lBQ2pCLG9CQUFvQixHQUFHLElBQUksZUFBZSxDQUFVLElBQUksQ0FBQyxDQUFDO0lBQzFELGtCQUFrQixHQUFHLElBQUksZUFBZSxDQUFTLENBQUMsQ0FBQyxDQUFDO0lBRXBELGNBQWM7SUFDZCxrQkFBa0IsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUN6RCx1QkFBdUIsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUM5RCxzQkFBc0IsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUM3RCxzQkFBc0IsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUM3RCxxQkFBcUIsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUM1RCxvQkFBb0IsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUMzRCwyQkFBMkIsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUNsRSw2QkFBNkIsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUVwRSxlQUFlO0lBQ2YsMEJBQTBCLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFDakUsc0JBQXNCLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFDN0QseUJBQXlCLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFDaEUseUJBQXlCLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFDaEUsd0JBQXdCLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFDL0QscUJBQXFCLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFFNUQsb0JBQW9CO0lBQ3BCLHFCQUFxQixHQUFHLElBQUksZUFBZSxDQUFTLE9BQU8sQ0FBQyxDQUFDO0lBQzdELHFCQUFxQixHQUFHLElBQUksZUFBZSxDQUFTLEtBQUssQ0FBQyxDQUFDO0lBQzNELHFCQUFxQixHQUFHLElBQUksZUFBZSxDQUFTLEtBQUssQ0FBQyxDQUFDO0lBQzNELGtCQUFrQixHQUFHLElBQUksZUFBZSxDQUFTLGFBQWEsQ0FBQyxDQUFDO0lBQ2hFLHVCQUF1QixHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQzlELG9CQUFvQixHQUFHLElBQUksZUFBZSxDQUE0QixPQUFPLENBQUMsQ0FBQztJQUMvRSxlQUFlLEdBQUcsSUFBSSxlQUFlLENBQVUsSUFBSSxDQUFDLENBQUM7SUFDckQsaUJBQWlCLEdBQUcsSUFBSSxlQUFlLENBQVUsSUFBSSxDQUFDLENBQUM7SUFDdkQsd0JBQXdCLEdBQUcsSUFBSSxlQUFlLENBQVMsU0FBUyxDQUFDLENBQUM7SUFDbEUsc0JBQXNCLEdBQUcsSUFBSSxlQUFlLENBQVMsU0FBUyxDQUFDLENBQUM7SUFDaEUsZ0JBQWdCLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFDdkQsbUJBQW1CLEdBQUcsSUFBSSxlQUFlLENBQVMsVUFBVSxDQUFDLENBQUM7SUFDOUQsMkJBQTJCLEdBQUcsSUFBSSxlQUFlLENBQVMsS0FBSyxDQUFDLENBQUM7SUFDakUsd0JBQXdCLEdBQUcsSUFBSSxlQUFlLENBQVMsU0FBUyxDQUFDLENBQUM7SUFDbEUseUJBQXlCLEdBQUcsSUFBSSxlQUFlLENBQVMsV0FBVyxDQUFDLENBQUM7SUFDckUsZUFBZSxHQUFHLElBQUksZUFBZSxDQUFVLElBQUksQ0FBQyxDQUFDO0lBQ3JELGVBQWUsR0FBRyxJQUFJLGVBQWUsQ0FBVSxJQUFJLENBQUMsQ0FBQztJQUNyRCxXQUFXLEdBQUcsSUFBSSxlQUFlLENBQVMsT0FBTyxDQUFDLENBQUM7SUFDbkQsaUJBQWlCLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFDeEQscUJBQXFCLEdBQUcsSUFBSSxlQUFlLENBQVMsVUFBVSxDQUFDLENBQUM7SUFDaEUsY0FBYyxHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQ3JELGNBQWMsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUVyRCxlQUFlO0lBQ2YsY0FBYyxHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQ3JELGNBQWMsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUVyRCxjQUFjLEdBQUcsSUFBSSxlQUFlLENBQWlCO1FBQ25ELFVBQVUsRUFBRSxDQUFDO1FBQ2IsV0FBVyxFQUFFLENBQUM7UUFDZCxTQUFTLEVBQUUsQ0FBQztRQUNaLFVBQVUsRUFBRSxDQUFDO0tBQ2QsQ0FBQyxDQUFDO0lBRUgsY0FBYztJQUNkLG1CQUFtQixHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQzFELGtCQUFrQixHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBRXpELGFBQWE7SUFDYixnQkFBZ0IsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUN2RCxxQkFBcUIsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUM1RCxxQkFBcUIsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUM1RCxzQkFBc0IsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUM3RCxpQkFBaUIsR0FBRyxJQUFJLGVBQWUsQ0FBbUIsSUFBSSxDQUFDLENBQUM7SUFDaEUsYUFBYSxHQUFHLElBQUksZUFBZSxDQUFrQixJQUFJLENBQUMsQ0FBQztJQUMzRCxNQUFNLEdBQUcsSUFBSSxlQUFlLENBQWtCLEVBQXFCLENBQUMsQ0FBQztJQUNyRSxXQUFXLEdBQUcsSUFBSSxlQUFlLENBQWtCLEVBQXFCLENBQUMsQ0FBQztJQUMxRSxXQUFXLEdBQUcsSUFBSSxlQUFlLENBQWtCLEVBQXFCLENBQUMsQ0FBQztJQUMxRSxhQUFhLEdBQUcsSUFBSSxlQUFlLENBQWtCLElBQUksQ0FBQyxDQUFDO0lBQzNELGtCQUFrQixHQUFHLElBQUksZUFBZSxDQUFrQixFQUFFLENBQUMsQ0FBQztJQUM5RCxtQkFBbUIsR0FBRyxJQUFJLGVBQWUsQ0FBVyxFQUFFLENBQUMsQ0FBQztJQUV4RCxRQUFRO0lBQ1IsS0FBSyxHQUFHLElBQUksZUFBZSxDQUFTLEVBQUUsQ0FBQyxDQUFDO0lBQ3hDLElBQUksR0FBRyxJQUFJLGVBQWUsQ0FBYyxJQUFJLENBQUMsQ0FBQztJQUM5QyxrQkFBa0IsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUV6RCxhQUFhO0lBQ2IsV0FBVyxHQUFHLElBQUksZUFBZSxDQUFTLEVBQUUsQ0FBQyxDQUFDO0lBQzlDLGFBQWEsR0FBRyxJQUFJLGVBQWUsQ0FBUyxFQUFFLENBQUMsQ0FBQztJQUNoRCxZQUFZLEdBQUcsSUFBSSxlQUFlLENBQXFCLElBQUksQ0FBQyxDQUFDO0lBQzdELGtCQUFrQixHQUFHLElBQUksZUFBZSxDQUE0QixJQUFJLENBQUMsQ0FBQztJQUMxRSxpQkFBaUIsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUN4RCxlQUFlLEdBQUcsSUFBSSxlQUFlLENBQXFCLElBQUksQ0FBQyxDQUFDO0lBQ2hFLGNBQWMsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUNyRCxvQkFBb0IsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUMzRCxhQUFhLEdBQUcsSUFBSSxlQUFlLENBQXFCLElBQUksQ0FBQyxDQUFDO0lBQzlELFVBQVUsR0FBRyxJQUFJLGVBQWUsQ0FBMkIsSUFBSSxDQUFDLENBQUM7SUFDakUsa0JBQWtCLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFDekQsaUJBQWlCLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFDeEQsd0JBQXdCLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFDL0QsbUJBQW1CLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFFMUQsaUJBQWlCO0lBQ2pCLGFBQWEsR0FBRyxJQUFJLGVBQWUsQ0FBMEIsRUFBRSxDQUFDLENBQUM7SUFDakUsZ0JBQWdCLEdBQUcsSUFBSSxlQUFlLENBQVMsQ0FBQyxDQUFDLENBQUM7SUFDbEQsZ0JBQWdCLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFDdkQsbUJBQW1CLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFDMUQsaUJBQWlCLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFDeEQsV0FBVyxHQUFHLElBQUksZUFBZSxDQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDOUMsZ0JBQWdCLEdBQUcsSUFBSSxlQUFlLENBQXdCLEVBQUUsQ0FBQyxDQUFDO0lBQ2xFLGVBQWUsR0FBRyxJQUFJLGVBQWUsQ0FBUyxDQUFDLENBQUMsQ0FBQztJQUNqRCxVQUFVLEdBQUcsSUFBSSxlQUFlLENBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM3QywyQkFBMkIsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUVsRSxhQUFhO0lBQ2IsZUFBZSxHQUFHLElBQUksZUFBZSxDQUFtQixFQUFFLENBQUMsQ0FBQztJQUM1RCxzQkFBc0IsR0FBRyxJQUFJLGVBQWUsQ0FBUyxDQUFDLENBQUMsQ0FBQztJQUN4RCxrQkFBa0IsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUN6RCxpQkFBaUIsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUN4RCxlQUFlLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFDdEQsZUFBZSxHQUFHLElBQUksZUFBZSxDQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ2pELHdCQUF3QixHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQy9ELGlDQUFpQyxHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQ3hFLE1BQU0sR0FBRyxJQUFJLGVBQWUsQ0FBVSxFQUFFLENBQUMsQ0FBQztJQUMxQyxrQkFBa0IsR0FBRyxJQUFJLGVBQWUsQ0FBVSxJQUFJLENBQUMsQ0FBQztJQUN4RCxTQUFTLEdBQUcsSUFBSSxlQUFlLENBQVUsRUFBRSxDQUFDLENBQUM7SUFDN0MsU0FBUyxHQUFHLElBQUksZUFBZSxDQUFXLEVBQUUsQ0FBQyxDQUFDO0lBQzlDLFlBQVksR0FBRyxJQUFJLGVBQWUsQ0FBcUIsSUFBSSxDQUFDLENBQUM7SUFDN0QsZ0JBQWdCLEdBQUcsSUFBSSxlQUFlLENBQTJCLElBQUksQ0FBQyxDQUFDO0lBRXZFLGNBQWM7SUFDZCxpQkFBaUIsR0FBRyxJQUFJLGVBQWUsQ0FBMkIsSUFBSSxDQUFDLENBQUM7SUFDeEUscUJBQXFCLEdBQUcsSUFBSSxlQUFlLENBQXFCLElBQUksQ0FBQyxDQUFDO0lBQ3RFLG9CQUFvQixHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQzNELGdCQUFnQixHQUFHLElBQUksZUFBZSxDQUEyQixJQUFJLENBQUMsQ0FBQztJQUN2RSx5QkFBeUIsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUVoRSx5Q0FBeUM7SUFDekMsU0FBUyxHQUFHLElBQUksZUFBZSxDQUM3QixJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FDOUQsQ0FBQztJQUNGLFdBQVcsR0FBRyxJQUFJLGVBQWUsQ0FDL0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQzlELENBQUM7SUFDRixpQkFBaUIsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUN4RCxhQUFhLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFDcEQsa0JBQWtCLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFDekQsVUFBVSxHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQ2pELGNBQWMsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUVyRCxtQkFBbUI7SUFDbkIsY0FBYyxHQUFHLENBQUMsS0FBZ0IsRUFBRSxFQUFFO1FBQ3BDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVCLENBQUMsQ0FBQztJQUVGLHdCQUF3QixHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDNUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN0QyxDQUFDLENBQUM7SUFFRiwwQkFBMEIsR0FBRyxDQUFDLEtBQXlCLEVBQUUsRUFBRTtRQUN6RCxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3hDLENBQUMsQ0FBQztJQUVGLHVCQUF1QixHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDM0MsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyQyxDQUFDLENBQUM7SUFFRixrQkFBa0IsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQ3JDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hDLENBQUMsQ0FBQztJQUVGLGtCQUFrQixHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7UUFDckMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEMsQ0FBQyxDQUFDO0lBRUYsd0JBQXdCLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtRQUMzQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3RDLENBQUMsQ0FBQztJQUVGLGlCQUFpQixHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7UUFDcEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0IsQ0FBQyxDQUFDO0lBRUYsbUJBQW1CLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtRQUN0QyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQyxDQUFDLENBQUM7SUFFRixjQUFjLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUNsQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QixDQUFDLENBQUM7SUFFRixzQkFBc0IsR0FBRyxDQUFDLEtBQWMsRUFBRSxFQUFFO1FBQzFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEMsQ0FBQyxDQUFDO0lBRUYsMEJBQTBCLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUM5QyxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3hDLENBQUMsQ0FBQztJQUVGLDRCQUE0QixHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7UUFDL0MsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMxQyxDQUFDLENBQUM7SUFFRix3QkFBd0IsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQzNDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEMsQ0FBQyxDQUFDO0lBRUYsdUJBQXVCLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtRQUMxQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JDLENBQUMsQ0FBQztJQUVGLHFCQUFxQixHQUFHLENBQUMsS0FBK0IsRUFBRSxFQUFFO1FBQzFELElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDN0MsQ0FBQyxDQUFDO0lBRUYsa0JBQWtCLEdBQUcsR0FBRyxFQUFFO1FBQ3hCLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMxQyxDQUFDLENBQUM7SUFFRixvQkFBb0IsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQ3ZDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xDLENBQUMsQ0FBQztJQUVGLG1CQUFtQixHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7UUFDdEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakMsQ0FBQyxDQUFDO0lBRUYsaUJBQWlCLEdBQUcsQ0FBQyxLQUFnQixFQUFFLEVBQUU7UUFDdkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDekMsQ0FBQyxDQUFDO0lBRUYsY0FBYyxHQUFHLEdBQUcsRUFBRTtRQUNwQixJQUFJLENBQUMsNEJBQTRCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0MsQ0FBQyxDQUFDO0lBRUYsa0JBQWtCLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtRQUNyQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoQyxDQUFDLENBQUM7SUFFRixrQkFBa0IsR0FBRyxDQUFDLEtBQWMsRUFBRSxFQUFFO1FBQ3RDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hDLENBQUMsQ0FBQztJQUVGLGtCQUFrQixHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7UUFDckMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEMsQ0FBQyxDQUFDO0lBRUYsZUFBZSxHQUFHLENBQUMsS0FBMkIsRUFBRSxFQUFFO1FBQ2hELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdCLENBQUMsQ0FBQztJQUVGLG1CQUFtQixHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7UUFDdEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakMsQ0FBQyxDQUFDO0lBRUYsMEJBQTBCLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUM5QyxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3hDLENBQUMsQ0FBQztJQUVGLHdCQUF3QixHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7UUFDM0MsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN0QyxDQUFDLENBQUM7SUFFRix3QkFBd0IsR0FBRyxDQUFDLEtBQWMsRUFBRSxFQUFFO1FBQzVDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEMsQ0FBQyxDQUFDO0lBRUYsNkJBQTZCLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUNqRCxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pDLElBQUksS0FBSyxFQUFFLENBQUM7WUFDVixJQUFJLENBQUMsdUJBQXVCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdEMsQ0FBQzthQUFNLENBQUM7WUFDTixJQUNFLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFO2dCQUMvQixJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRTtnQkFDL0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsRUFDN0IsQ0FBQztnQkFDRCxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDckMsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDLENBQUM7SUFFRiw0QkFBNEIsR0FBRyxDQUFDLEtBQWMsRUFBRSxFQUFFO1FBQ2hELElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUMsQ0FBQyxDQUFDO0lBRUYsNEJBQTRCLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUNoRCxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFDLENBQUMsQ0FBQztJQUVGLDJCQUEyQixHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDL0MsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN6QyxDQUFDLENBQUM7SUFFRiwwQkFBMEIsR0FBRyxDQUFDLEtBQWMsRUFBRSxFQUFFO1FBQzlDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDeEMsQ0FBQyxDQUFDO0lBRUYsaUNBQWlDLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUNyRCxJQUFJLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9DLENBQUMsQ0FBQztJQUVGLG1DQUFtQyxHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDdkQsSUFBSSxDQUFDLDZCQUE2QixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqRCxDQUFDLENBQUM7SUFFRixnQ0FBZ0MsR0FBRyxDQUFDLEtBQWMsRUFBRSxFQUFFO1FBQ3BELElBQUksQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUMsQ0FBQyxDQUFDO0lBRUYsNEJBQTRCLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUNoRCxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNYLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN0QyxDQUFDO0lBQ0gsQ0FBQyxDQUFDO0lBRUYsK0JBQStCLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUNuRCxJQUFJLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdDLENBQUMsQ0FBQztJQUVGLCtCQUErQixHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDbkQsSUFBSSxDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QyxDQUFDLENBQUM7SUFFRiwyQkFBMkIsR0FBRyxDQUFDLEtBQWMsRUFBRSxFQUFFO1FBQy9DLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDekMsQ0FBQyxDQUFDO0lBRUYsOEJBQThCLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUNsRCxJQUFJLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVDLENBQUMsQ0FBQztJQUVGLDJCQUEyQixHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7UUFDOUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuQyxDQUFDLENBQUM7SUFFRiwyQkFBMkIsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQzlDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkMsQ0FBQyxDQUFDO0lBRUYsMkJBQTJCLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtRQUM5QyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25DLENBQUMsQ0FBQztJQUVGLHdCQUF3QixHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7UUFDM0MsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuQyxDQUFDLENBQUM7SUFFRiw2QkFBNkIsR0FBRyxDQUFDLEtBQWMsRUFBRSxFQUFFO1FBQ2pELElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkMsQ0FBQyxDQUFDO0lBRUYsMEJBQTBCLEdBQUcsQ0FBQyxLQUFnQyxFQUFFLEVBQUU7UUFDaEUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuQyxDQUFDLENBQUM7SUFFRixxQkFBcUIsR0FBRyxDQUFDLEtBQWMsRUFBRSxFQUFFO1FBQ3pDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25DLENBQUMsQ0FBQztJQUVGLHNCQUFzQixHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDMUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuQyxDQUFDLENBQUM7SUFFRix5QkFBeUIsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQzVDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkMsQ0FBQyxDQUFDO0lBRUYsaUNBQWlDLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtRQUNwRCxJQUFJLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25DLENBQUMsQ0FBQztJQUVGLDhCQUE4QixHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7UUFDakQsSUFBSSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuQyxDQUFDLENBQUM7SUFFRix1QkFBdUIsR0FBRyxDQUFDLEtBQWMsRUFBRSxFQUFFO1FBQzNDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkMsQ0FBQyxDQUFDO0lBRUYsOEJBQThCLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtRQUNqRCxJQUFJLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25DLENBQUMsQ0FBQztJQUVGLDRCQUE0QixHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7UUFDL0MsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuQyxDQUFDLENBQUM7SUFFRiwrQkFBK0IsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQ2xELElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkMsQ0FBQyxDQUFDO0lBRUYscUJBQXFCLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUN6QyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuQyxDQUFDLENBQUM7SUFFRixxQkFBcUIsR0FBRyxDQUFDLEtBQWMsRUFBRSxFQUFFO1FBQ3pDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25DLENBQUMsQ0FBQztJQUVGLGlCQUFpQixHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7UUFDcEMsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDMUQsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQzdCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQy9CLENBQUM7aUJBQU0sQ0FBQztnQkFDTixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNsQyxDQUFDO1FBQ0gsQ0FBQzthQUFNLENBQUM7WUFDTixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvQixDQUFDO1FBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0IsQ0FBQyxDQUFDO0lBRUYsdUJBQXVCLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUMzQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JDLENBQUMsQ0FBQztJQUVGLDJCQUEyQixHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7UUFDOUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztJQUNqQyxDQUFDLENBQUM7SUFFRixvQkFBb0IsR0FBRyxDQUFDLEtBQWMsRUFBRSxFQUFFO1FBQ3hDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xDLENBQUMsQ0FBQztJQUVGLG9CQUFvQixHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDeEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbEMsQ0FBQyxDQUFDO0lBRUYsb0JBQW9CLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUN4QyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQixDQUFDLENBQUM7SUFFRixvQkFBb0IsR0FBRyxDQUFDLEtBQWMsRUFBRSxFQUFFO1FBQ3hDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdCLENBQUMsQ0FBQztJQUVGLG9CQUFvQixHQUFHLENBQUMsS0FBcUIsRUFBRSxFQUFFO1FBQy9DLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xDLENBQUMsQ0FBQztJQUVGLHlCQUF5QixHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDN0MsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2QyxDQUFDLENBQUM7SUFFRix3QkFBd0IsR0FBRyxDQUFDLEtBQWMsRUFBRSxFQUFFO1FBQzVDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEMsQ0FBQyxDQUFDO0lBRUYsdUJBQXVCO1FBQ3JCLDhDQUE4QztRQUM5QyxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVELHNCQUFzQjtRQUNwQiw4Q0FBOEM7UUFDOUMsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRCxzQkFBc0IsR0FBRyxDQUFDLEtBQWMsRUFBRSxFQUFFO1FBQzFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEMsQ0FBQyxDQUFDO0lBRUYsMkJBQTJCLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUMvQyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3pDLENBQUMsQ0FBQztJQUVGLDJCQUEyQixHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDL0MsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN6QyxDQUFDLENBQUM7SUFFRiw0QkFBNEIsR0FBRyxDQUFDLEtBQWMsRUFBRSxFQUFFO1FBQ2hELElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUMsQ0FBQyxDQUFDO0lBRUYsdUJBQXVCLEdBQUcsQ0FBQyxLQUF1QixFQUFFLEVBQUU7UUFDcEQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyQyxDQUFDLENBQUM7SUFFRixtQkFBbUIsR0FBRyxDQUFDLEtBQXNCLEVBQUUsRUFBRTtRQUMvQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQyxDQUFDLENBQUM7SUFFRixZQUFZLEdBQUcsQ0FBQyxLQUFzQixFQUFFLEVBQUU7UUFDeEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUIsQ0FBQyxDQUFDO0lBRUYsaUJBQWlCLEdBQUcsQ0FBQyxLQUFzQixFQUFFLEVBQUU7UUFDN0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0IsQ0FBQyxDQUFDO0lBRUYsaUJBQWlCLEdBQUcsQ0FBQyxLQUFzQixFQUFFLEVBQUU7UUFDN0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0IsQ0FBQyxDQUFDO0lBRUYsbUJBQW1CLEdBQUcsQ0FBQyxLQUFzQixFQUFFLEVBQUU7UUFDL0MsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakMsQ0FBQyxDQUFDO0lBRUYsd0JBQXdCLEdBQUcsQ0FBQyxLQUFzQixFQUFFLEVBQUU7UUFDcEQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN0QyxDQUFDLENBQUM7SUFFRix5QkFBeUIsR0FBRyxDQUFDLEtBQWUsRUFBRSxFQUFFO1FBQzlDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkMsQ0FBQyxDQUFDO0lBRUYsV0FBVyxHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7UUFDOUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDekIsQ0FBQyxDQUFDO0lBRUYsVUFBVSxHQUFHLENBQUMsS0FBa0IsRUFBRSxFQUFFO1FBQ2xDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3hCLENBQUMsQ0FBQztJQUVGLHdCQUF3QixHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDNUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN0QyxDQUFDLENBQUM7SUFFRixpQkFBaUIsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQ3BDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9CLENBQUMsQ0FBQztJQUVGLG1CQUFtQixHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7UUFDdEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakMsQ0FBQyxDQUFDO0lBRUYsa0JBQWtCLEdBQUcsQ0FBQyxLQUF5QixFQUFFLEVBQUU7UUFDakQsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEMsQ0FBQyxDQUFDO0lBRUYsd0JBQXdCLEdBQUcsQ0FBQyxLQUFnQyxFQUFFLEVBQUU7UUFDOUQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN0QyxDQUFDLENBQUM7SUFFRix1QkFBdUIsR0FBRyxDQUFDLEtBQWMsRUFBRSxFQUFFO1FBQzNDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckMsQ0FBQyxDQUFDO0lBRUYscUJBQXFCLEdBQUcsQ0FBQyxLQUF5QixFQUFFLEVBQUU7UUFDcEQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkMsQ0FBQyxDQUFDO0lBRUYsb0JBQW9CLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUN4QyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNsQyxDQUFDLENBQUM7SUFFRiwwQkFBMEIsR0FBRyxDQUFDLEtBQWMsRUFBRSxFQUFFO1FBQzlDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDeEMsQ0FBQyxDQUFDO0lBRUYsbUJBQW1CLEdBQUcsQ0FBQyxLQUF5QixFQUFFLEVBQUU7UUFDbEQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakMsQ0FBQyxDQUFDO0lBRUYsZ0JBQWdCLEdBQUcsQ0FBQyxLQUErQixFQUFFLEVBQUU7UUFDckQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUIsQ0FBQyxDQUFDO0lBRUYsd0JBQXdCLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUM1QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3RDLENBQUMsQ0FBQztJQUVGLHVCQUF1QixHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDM0MsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyQyxDQUFDLENBQUM7SUFFRiw4QkFBOEIsR0FBRyxDQUFDLEtBQWMsRUFBRSxFQUFFO1FBQ2xELElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUMsQ0FBQyxDQUFDO0lBRUYseUJBQXlCLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUM3QyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZDLENBQUMsQ0FBQztJQUVGLG1CQUFtQixHQUFHLENBQUMsS0FBOEIsRUFBRSxFQUFFO1FBQ3ZELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pDLENBQUMsQ0FBQztJQUVGLHNCQUFzQixHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7UUFDekMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNwQyxDQUFDLENBQUM7SUFFRixzQkFBc0IsR0FBRyxDQUFDLEtBQWMsRUFBRSxFQUFFO1FBQzFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEMsQ0FBQyxDQUFDO0lBRUYseUJBQXlCLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUM3QyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZDLENBQUMsQ0FBQztJQUVGLHVCQUF1QixHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDM0MsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyQyxDQUFDLENBQUM7SUFFRixpQkFBaUIsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQ3BDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9CLENBQUMsQ0FBQztJQUVGLHNCQUFzQixHQUFHLENBQUMsS0FBNEIsRUFBRSxFQUFFO1FBQ3hELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEMsQ0FBQyxDQUFDO0lBRUYscUJBQXFCLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtRQUN4QyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuQyxDQUFDLENBQUM7SUFFRixnQkFBZ0IsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQ25DLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlCLENBQUMsQ0FBQztJQUVGLGlDQUFpQyxHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDckQsSUFBSSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQyxDQUFDLENBQUM7SUFFRixxQkFBcUIsR0FBRyxDQUFDLEtBQXVCLEVBQUUsRUFBRTtRQUNsRCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuQyxDQUFDLENBQUM7SUFFRiw0QkFBNEIsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQy9DLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUMsQ0FBQyxDQUFDO0lBRUYsd0JBQXdCLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUM1QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3RDLENBQUMsQ0FBQztJQUVGLHVCQUF1QixHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDM0MsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyQyxDQUFDLENBQUM7SUFFRixxQkFBcUIsR0FBRyxDQUFDLEtBQWMsRUFBRSxFQUFFO1FBQ3pDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25DLENBQUMsQ0FBQztJQUVGLHFCQUFxQixHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7UUFDeEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkMsQ0FBQyxDQUFDO0lBRUYsOEJBQThCLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUNsRCxJQUFJLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVDLENBQUMsQ0FBQztJQUVGLHVDQUF1QyxHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDM0QsSUFBSSxDQUFDLGlDQUFpQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyRCxDQUFDLENBQUM7SUFFRixZQUFZLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUNoQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMxQixDQUFDLENBQUM7SUFFRix3QkFBd0IsR0FBRyxDQUFDLEtBQWMsRUFBRSxFQUFFO1FBQzVDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEMsQ0FBQyxDQUFDO0lBRUYsZUFBZSxHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7UUFDbkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0IsQ0FBQyxDQUFDO0lBRUYsZUFBZSxHQUFHLENBQUMsS0FBZSxFQUFFLEVBQUU7UUFDcEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0IsQ0FBQyxDQUFDO0lBRUYsa0JBQWtCLEdBQUcsQ0FBQyxLQUF5QixFQUFFLEVBQUU7UUFDakQsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEMsQ0FBQyxDQUFDO0lBRUYsc0JBQXNCLEdBQUcsQ0FBQyxLQUErQixFQUFFLEVBQUU7UUFDM0QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNwQyxDQUFDLENBQUM7SUFFRix1QkFBdUIsR0FBRyxDQUFDLEtBQStCLEVBQUUsRUFBRTtRQUM1RCxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JDLENBQUMsQ0FBQztJQUVGLDJCQUEyQixHQUFHLENBQUMsS0FBeUIsRUFBRSxFQUFFO1FBQzFELElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDekMsQ0FBQyxDQUFDO0lBRUYsMEJBQTBCLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUM5QyxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3hDLENBQUMsQ0FBQztJQUVGLHNCQUFzQixHQUFHLENBQUMsS0FBK0IsRUFBRSxFQUFFO1FBQzNELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEMsQ0FBQyxDQUFDO0lBRUYsK0JBQStCLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUNuRCxJQUFJLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdDLENBQUMsQ0FBQztJQUVGLGdCQUFnQixHQUFHLEdBQUcsRUFBRTtRQUN0QixNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLHlCQUF5QixDQUFDLENBQUMsT0FBTyxDQUFDO1FBQ3hFLE9BQU8sVUFBVSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQztJQUMvQyxDQUFDLENBQUM7SUFFRixTQUFTLEdBQUcsQ0FBQyxFQUNYLE9BQU8sRUFDUCxJQUFJLEVBQ0osUUFBUSxHQUFHLElBQUksR0FLaEIsRUFBRSxFQUFFO1FBQ0gsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoQyxDQUFDLENBQUM7SUFFRixZQUFZO1FBQ1YsT0FBTztZQUNMLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxnQkFBZ0I7WUFFckQsZUFBZTtZQUNmLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUs7WUFDN0IsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSztZQUN6QixhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLO1lBQ3ZDLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUs7WUFDckMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSztZQUNqQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLO1lBQzNCLGlCQUFpQixFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLO1lBQy9DLGtCQUFrQixFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLO1lBQ2pELHFCQUFxQixFQUFFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLO1lBQ3ZELFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUs7WUFDL0IsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSztZQUNyQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSztZQUNyRCxtQkFBbUIsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSztZQUNuRCxrQkFBa0IsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSztZQUVqRCw0QkFBNEI7WUFDNUIsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSztZQUMzQyxlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLO1lBQzNDLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUs7WUFDbkMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUs7WUFDL0MsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSztZQUN2QyxhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLO1lBQ3ZDLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUs7WUFDbkMsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSztZQUMzQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSztZQUNqRCxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLO1lBQ3pCLGlCQUFpQixFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLO1lBQy9DLGdCQUFnQixFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLO1lBQzdDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLO1lBQ3JELE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUs7WUFDM0IsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSztZQUMvQixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLO1lBQzNCLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUs7WUFDM0IsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSztZQUNyQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLO1lBRTNCLGdDQUFnQztZQUNoQyx5QkFBeUIsRUFBRSxJQUFJLENBQUMseUJBQXlCLENBQUMsS0FBSztZQUMvRCx5QkFBeUIsRUFBRSxJQUFJLENBQUMseUJBQXlCLENBQUMsS0FBSztZQUMvRCxxQkFBcUIsRUFBRSxJQUFJLENBQUMscUJBQXFCLENBQUMsS0FBSztZQUN2RCx5QkFBeUIsRUFBRSxJQUFJLENBQUMseUJBQXlCLENBQUMsS0FBSztZQUMvRCxtQ0FBbUMsRUFBRSxJQUFJLENBQUMsbUNBQW1DLENBQUMsS0FBSztZQUNuRix5QkFBeUIsRUFBRSxJQUFJLENBQUMseUJBQXlCLENBQUMsS0FBSztZQUMvRCx5QkFBeUIsRUFBRSxJQUFJLENBQUMseUJBQXlCLENBQUMsS0FBSztZQUMvRCxxQkFBcUIsRUFBRSxJQUFJLENBQUMscUJBQXFCLENBQUMsS0FBSztZQUN2RCx5QkFBeUIsRUFBRSxJQUFJLENBQUMseUJBQXlCLENBQUMsS0FBSztZQUMvRCxtQ0FBbUMsRUFBRSxJQUFJLENBQUMsbUNBQW1DLENBQUMsS0FBSztZQUNuRiwrQkFBK0IsRUFBRSxJQUFJLENBQUMsK0JBQStCLENBQUMsS0FBSztZQUMzRSxpQ0FBaUMsRUFBRSxJQUFJLENBQUMsaUNBQWlDLENBQUMsS0FBSztZQUMvRSx1Q0FBdUMsRUFBRSxJQUFJLENBQUMsdUNBQXVDLENBQUMsS0FBSztZQUMzRix5Q0FBeUMsRUFDdkMsSUFBSSxDQUFDLHlDQUF5QyxDQUFDLEtBQUs7WUFDdEQsNkJBQTZCLEVBQUUsSUFBSSxDQUFDLDZCQUE2QixDQUFDLEtBQUs7WUFDdkUsbUNBQW1DLEVBQUUsSUFBSSxDQUFDLG1DQUFtQyxDQUFDLEtBQUs7WUFDbkYsNEJBQTRCLEVBQUUsSUFBSSxDQUFDLDRCQUE0QixDQUFDLEtBQUs7WUFFckUsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUs7WUFDbkQsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSztZQUMvQixXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLO1lBQ25DLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUs7WUFDL0IsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSztZQUMzQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSztZQUMvQyxjQUFjLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLO1lBQ3pDLGNBQWMsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUs7WUFDekMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUs7WUFDbkQsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSztZQUNqQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSztZQUM3QyxlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLO1lBQzNDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLO1lBRTdDLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUs7WUFFM0MsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSztZQUM3QixnQkFBZ0IsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSztZQUM3QyxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLO1lBQ25DLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUs7WUFDakMsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSztZQUNuQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLO1lBQzdCLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUs7WUFDM0MsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUs7WUFDL0Msb0JBQW9CLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEtBQUs7WUFDckQsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSztZQUNyQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSztZQUNuRCxxQkFBcUIsRUFBRSxJQUFJLENBQUMscUJBQXFCLENBQUMsS0FBSztZQUN2RCxhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLO1lBQ3ZDLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUs7WUFDM0MsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSztZQUNyQyxlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLO1lBQzNDLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUs7WUFDbkMsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSztZQUN2QyxhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLO1lBQ3ZDLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUs7WUFDckMsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSztZQUN2QyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSztZQUNyRCxpQkFBaUIsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSztZQUMvQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSztZQUM3QyxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLO1lBQ25DLGdCQUFnQixFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLO1lBQzdDLDJCQUEyQixFQUFFLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxLQUFLO1lBQ25FLGlCQUFpQixFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLO1lBQy9DLGNBQWMsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUs7WUFDekMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSztZQUNqQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLO1lBQzNCLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUs7WUFDM0MsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUs7WUFDL0MsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSztZQUNuQyxlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLO1lBQzNDLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUs7WUFDdkMsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSztZQUMzQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSztZQUNuRCxlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLO1lBQzNDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUs7WUFDL0IsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSztZQUNyQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLO1lBQ2pDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLO1lBQy9DLGtCQUFrQixFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLO1lBQ2pELGdCQUFnQixFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLO1lBQzdDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLO1lBQzdDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLO1lBQy9DLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUs7WUFDM0MsNEJBQTRCLEVBQUUsSUFBSSxDQUFDLDRCQUE0QixDQUFDLEtBQUs7WUFDckUsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSztZQUNuQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLO1lBQy9CLGdCQUFnQixFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLO1lBQzdDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLO1lBQy9DLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUs7WUFDM0MsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSztZQUN2QyxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLO1lBQ25DLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUs7WUFDdkMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSztZQUNqQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLO1lBQ25DLGtCQUFrQixFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLO1lBQ2pELGlCQUFpQixFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLO1lBQy9DLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUs7WUFDdkMsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEtBQUs7WUFDckQsd0JBQXdCLEVBQUUsSUFBSSxDQUFDLHdCQUF3QixDQUFDLEtBQUs7WUFDN0QsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUs7WUFDN0MsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUs7WUFDN0MsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSztZQUNqQywyQkFBMkIsRUFBRSxJQUFJLENBQUMsMkJBQTJCLENBQUMsS0FBSztZQUNuRSw0QkFBNEIsRUFBRSxJQUFJLENBQUMsNEJBQTRCLENBQUMsS0FBSztZQUNyRSxvQkFBb0IsRUFBRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSztZQUNyRCxvQkFBb0IsRUFBRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSztZQUNyRCxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLO1lBQ25DLGdCQUFnQixFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLO1lBQzdDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLO1lBQy9DLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUs7WUFDckMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUs7WUFDN0MsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSztZQUMzQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLO1lBQ2pDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLO1lBQ2pELGNBQWMsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUs7WUFDekMsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSztZQUN2QyxZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLO1lBQ3JDLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUs7WUFDM0MsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSztZQUMzQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSztZQUNuRCxjQUFjLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLO1lBQ3pDLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUs7WUFDM0MsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSztZQUMzQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSztZQUNuRCxjQUFjLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLO1lBQ3pDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUs7WUFDakMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSztZQUNqQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLO1lBQzdCLGNBQWMsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUs7WUFDekMsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSztZQUN2QyxZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLO1lBQ3JDLGNBQWMsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUs7WUFDekMsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSztZQUN2QyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLO1lBQzNCLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUs7WUFDakMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSztZQUM3QixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLO1lBQzdCLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUs7WUFDbkMsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSztZQUNuQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLO1lBQ25DLGNBQWMsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUs7WUFDekMsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSztZQUNyQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLO1lBQzNCLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUs7WUFDdkMsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSztZQUMzQyxjQUFjLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLO1lBQ3pDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLO1lBQ2pELFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUs7WUFDakMscUJBQXFCLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUs7WUFDdkQsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUs7WUFDbkQsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSztZQUMvQixzQkFBc0IsRUFBRSxJQUFJLENBQUMsc0JBQXNCLENBQUMsS0FBSztZQUN6RCxjQUFjLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLO1lBQ3pDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLO1lBQzdDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLO1lBQzdDLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUs7WUFDbkMsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSztZQUNuQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSztZQUNuRCxrQkFBa0IsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSztZQUVqRCxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSztZQUU3QyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLO1lBQzdCLGtCQUFrQixFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLO1lBQ2pELG9CQUFvQixFQUFFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLO1lBQ3JELE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUs7WUFDekIsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEtBQUs7WUFFckQsaUJBQWlCO1lBQ2pCLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUs7WUFDckMsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSztZQUNyQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSztZQUNqRCxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLO1lBRW5DLG1CQUFtQjtZQUNuQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLO1lBQzdCLGdCQUFnQixFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLO1lBQzdDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLO1lBQ3JELHNCQUFzQixFQUFFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLO1lBRXpELGVBQWU7WUFDZixpQkFBaUIsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSztZQUMvQyxlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLO1lBQzNDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLO1lBQ2pELHVCQUF1QixFQUFFLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxLQUFLO1lBRTNELFdBQVc7WUFDWCxhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLO1lBQ3ZDLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUs7WUFDbkMsY0FBYyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSztZQUN6QyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSztZQUVuRCxrQ0FBa0M7WUFDbEMsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSztZQUVyQyxTQUFTO1lBQ1QsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSztZQUNyQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLO1lBQ3JDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUs7WUFDL0IsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSztZQUV2QyxpQkFBaUI7WUFDakIsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEtBQUs7WUFDckQsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUs7WUFFakQsY0FBYztZQUNkLGtCQUFrQixFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLO1lBQ2pELHVCQUF1QixFQUFFLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxLQUFLO1lBQzNELHNCQUFzQixFQUFFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLO1lBQ3pELHNCQUFzQixFQUFFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLO1lBQ3pELHFCQUFxQixFQUFFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLO1lBQ3ZELG9CQUFvQixFQUFFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLO1lBQ3JELDJCQUEyQixFQUFFLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxLQUFLO1lBQ25FLDZCQUE2QixFQUFFLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxLQUFLO1lBRXZFLGVBQWU7WUFDZiwwQkFBMEIsRUFBRSxJQUFJLENBQUMsMEJBQTBCLENBQUMsS0FBSztZQUNqRSxzQkFBc0IsRUFBRSxJQUFJLENBQUMsc0JBQXNCLENBQUMsS0FBSztZQUN6RCx5QkFBeUIsRUFBRSxJQUFJLENBQUMseUJBQXlCLENBQUMsS0FBSztZQUMvRCx5QkFBeUIsRUFBRSxJQUFJLENBQUMseUJBQXlCLENBQUMsS0FBSztZQUMvRCxxQkFBcUIsRUFBRSxJQUFJLENBQUMscUJBQXFCLENBQUMsS0FBSztZQUV2RCxvQkFBb0I7WUFDcEIscUJBQXFCLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUs7WUFDdkQscUJBQXFCLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUs7WUFDdkQscUJBQXFCLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUs7WUFDdkQsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUs7WUFDakQsdUJBQXVCLEVBQUUsSUFBSSxDQUFDLHVCQUF1QixDQUFDLEtBQUs7WUFDM0Qsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEtBQUs7WUFDckQsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSztZQUMzQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSztZQUM3QyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSztZQUNuRCwyQkFBMkIsRUFBRSxJQUFJLENBQUMsMkJBQTJCLENBQUMsS0FBSztZQUNuRSx3QkFBd0IsRUFBRSxJQUFJLENBQUMsd0JBQXdCLENBQUMsS0FBSztZQUM3RCxpQkFBaUIsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSztZQUMvQyx3QkFBd0IsRUFBRSxJQUFJLENBQUMsd0JBQXdCLENBQUMsS0FBSztZQUM3RCxzQkFBc0IsRUFBRSxJQUFJLENBQUMsc0JBQXNCLENBQUMsS0FBSztZQUN6RCx5QkFBeUIsRUFBRSxJQUFJLENBQUMseUJBQXlCLENBQUMsS0FBSztZQUMvRCxlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLO1lBQzNDLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUs7WUFDM0MsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSztZQUNuQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSztZQUMvQyxxQkFBcUIsRUFBRSxJQUFJLENBQUMscUJBQXFCLENBQUMsS0FBSztZQUN2RCxjQUFjLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLO1lBQ3pDLGNBQWMsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUs7WUFFekMsZUFBZTtZQUNmLGNBQWMsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUs7WUFDekMsY0FBYyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSztZQUN6QyxjQUFjLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLO1lBRXpDLGNBQWM7WUFDZCxtQkFBbUIsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSztZQUNuRCxrQkFBa0IsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSztZQUVqRCxhQUFhO1lBQ2IsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUs7WUFDN0MscUJBQXFCLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUs7WUFDdkQscUJBQXFCLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUs7WUFDdkQsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEtBQUs7WUFDekQsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUs7WUFDL0MsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSztZQUN2QyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLO1lBQ3pCLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUs7WUFDbkMsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSztZQUNuQyxhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLO1lBQ3ZDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLO1lBQ2pELG1CQUFtQixFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLO1lBRW5ELFFBQVE7WUFDUixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLO1lBQ3ZCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUs7WUFDckIsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUs7WUFFakQsYUFBYTtZQUNiLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUs7WUFDbkMsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSztZQUN2QyxZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLO1lBQ3JDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLO1lBQ2pELGlCQUFpQixFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLO1lBQy9DLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUs7WUFDM0MsY0FBYyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSztZQUN6QyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSztZQUNyRCxhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLO1lBQ3ZDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUs7WUFDakMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUs7WUFDakQsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUs7WUFDL0Msd0JBQXdCLEVBQUUsSUFBSSxDQUFDLHdCQUF3QixDQUFDLEtBQUs7WUFDN0QsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUs7WUFFbkQsaUJBQWlCO1lBQ2pCLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUs7WUFDdkMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUs7WUFDN0MsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUs7WUFDN0MsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUs7WUFDbkQsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUs7WUFDL0MsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSztZQUNuQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSztZQUM3QyxlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLO1lBQzNDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUs7WUFDakMsMkJBQTJCLEVBQUUsSUFBSSxDQUFDLDJCQUEyQixDQUFDLEtBQUs7WUFFbkUsYUFBYTtZQUNiLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUs7WUFDM0Msc0JBQXNCLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEtBQUs7WUFDekQsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUs7WUFDakQsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUs7WUFDL0MsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSztZQUMzQyxlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLO1lBQzNDLHdCQUF3QixFQUFFLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxLQUFLO1lBQzdELGlDQUFpQyxFQUFFLElBQUksQ0FBQyxpQ0FBaUMsQ0FBQyxLQUFLO1lBQy9FLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUs7WUFDekIsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUs7WUFDakQsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSztZQUMvQixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLO1lBQy9CLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUs7WUFDckMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUs7WUFFN0MsY0FBYztZQUNkLGlCQUFpQixFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLO1lBQy9DLHFCQUFxQixFQUFFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLO1lBQ3ZELG9CQUFvQixFQUFFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLO1lBQ3JELGdCQUFnQixFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLO1lBQzdDLHlCQUF5QixFQUFFLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxLQUFLO1lBRS9ELFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUs7WUFDL0IsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSztZQUN6QixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLO1lBQ3pCLG9CQUFvQixFQUFFLEtBQUs7WUFDM0IsS0FBSyxFQUFFLElBQUk7WUFFWCxtQkFBbUI7WUFDbkIsY0FBYyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUM5QyxZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQzFDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ3hELGtCQUFrQixFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ3RELGdCQUFnQixFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ2xELGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDNUMsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUMxQywwQkFBMEIsRUFBRSxJQUFJLENBQUMsMEJBQTBCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUN0RSx1QkFBdUIsRUFBRSxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNoRSx3QkFBd0IsRUFBRSxJQUFJLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNsRSwyQkFBMkIsRUFBRSxJQUFJLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUN4RSxlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ2hELGtCQUFrQixFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ3RELHlCQUF5QixFQUFFLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ3BFLHdCQUF3QixFQUFFLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBRWxFLDBDQUEwQztZQUMxQyxxQkFBcUIsRUFBRSxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUM1RCxxQkFBcUIsRUFBRSxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUM1RCxpQkFBaUIsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNwRCx1QkFBdUIsRUFBRSxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNoRSxtQkFBbUIsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUN4RCxtQkFBbUIsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUN4RCxpQkFBaUIsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNwRCxxQkFBcUIsRUFBRSxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUM1RCx3QkFBd0IsRUFBRSxJQUFJLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNsRSxZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQzFDLHVCQUF1QixFQUFFLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ2hFLHNCQUFzQixFQUFFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQzlELDBCQUEwQixFQUFFLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ3RFLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDNUMsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNoRCxhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQzVDLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDNUMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDdEQsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUU1Qyw4Q0FBOEM7WUFDOUMsK0JBQStCLEVBQUUsSUFBSSxDQUFDLCtCQUErQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDaEYsK0JBQStCLEVBQUUsSUFBSSxDQUFDLCtCQUErQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDaEYsMkJBQTJCLEVBQUUsSUFBSSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDeEUsK0JBQStCLEVBQUUsSUFBSSxDQUFDLCtCQUErQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDaEYseUNBQXlDLEVBQ3ZDLElBQUksQ0FBQyx5Q0FBeUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQzNELCtCQUErQixFQUFFLElBQUksQ0FBQywrQkFBK0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ2hGLCtCQUErQixFQUFFLElBQUksQ0FBQywrQkFBK0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ2hGLDJCQUEyQixFQUFFLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ3hFLCtCQUErQixFQUFFLElBQUksQ0FBQywrQkFBK0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ2hGLHlDQUF5QyxFQUN2QyxJQUFJLENBQUMseUNBQXlDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUMzRCxxQ0FBcUMsRUFBRSxJQUFJLENBQUMscUNBQXFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUM1Rix1Q0FBdUMsRUFDckMsSUFBSSxDQUFDLHVDQUF1QyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDekQsNkNBQTZDLEVBQzNDLElBQUksQ0FBQyw2Q0FBNkMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQy9ELCtDQUErQyxFQUM3QyxJQUFJLENBQUMsK0NBQStDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNqRSxtQ0FBbUMsRUFBRSxJQUFJLENBQUMsbUNBQW1DLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUN4Rix5Q0FBeUMsRUFDdkMsSUFBSSxDQUFDLHlDQUF5QyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDM0Qsa0NBQWtDLEVBQUUsSUFBSSxDQUFDLGtDQUFrQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFFdEYseUJBQXlCLEVBQUUsSUFBSSxDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDcEUsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNoRCxpQkFBaUIsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNwRCxlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ2hELHlCQUF5QixFQUFFLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ3BFLHFCQUFxQixFQUFFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQzVELHVCQUF1QixFQUFFLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ2hFLG9CQUFvQixFQUFFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQzFELG9CQUFvQixFQUFFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQzFELHlCQUF5QixFQUFFLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ3BFLGdCQUFnQixFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ2xELHNCQUFzQixFQUFFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQzlELHFCQUFxQixFQUFFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQzVELHNCQUFzQixFQUFFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBRTlELHFCQUFxQixFQUFFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBRTVELGNBQWMsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDOUMsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDOUQsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDcEQsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDbEQsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDcEQsY0FBYyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUM5QyxxQkFBcUIsRUFBRSxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUM1RCx1QkFBdUIsRUFBRSxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNoRSwwQkFBMEIsRUFBRSxJQUFJLENBQUMsMEJBQTBCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUN0RSxrQkFBa0IsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUN0RCx5QkFBeUIsRUFBRSxJQUFJLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNwRSwyQkFBMkIsRUFBRSxJQUFJLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUN4RSxtQkFBbUIsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUN4RCxxQkFBcUIsRUFBRSxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUM1RCxrQkFBa0IsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUN0RCxxQkFBcUIsRUFBRSxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUM1RCxpQkFBaUIsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNwRCxtQkFBbUIsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUN4RCxtQkFBbUIsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUN4RCxrQkFBa0IsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUN0RCxtQkFBbUIsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUN4RCww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QkFDaEIsaUJBQWlCO3dCQUNqQixzQkFBc0I7cUJBQ3ZCLFlBQ1M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdU5ULGFBUVUsQ0FBQyxhQUFhLENBQUM7MmxHQUkxQixXQUFXO3NCQURWLEtBQUs7Z0JBRUcsV0FBVztzQkFBbkIsS0FBSztnQkFDRyxjQUFjO3NCQUF0QixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csT0FBTztzQkFBZixLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFzcEdBLFlBQVk7c0JBRmpCLFlBQVk7dUJBQUMsZUFBZTs7c0JBQzVCLFlBQVk7dUJBQUMsMEJBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBIb3N0TGlzdGVuZXIsXG4gIEluamVjdG9yLFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlck91dGxldCB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQ29va2llU2VydmljZSB9IGZyb20gJ25neC1jb29raWUtc2VydmljZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIFN1YnNjcmlwdGlvbiwgY29tYmluZUxhdGVzdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgU29ja2V0IH0gZnJvbSAnc29ja2V0LmlvLWNsaWVudCc7XG5pbXBvcnQge1xuICBmYU1pY3JvcGhvbmVTbGFzaCxcbiAgZmFWaWRlb1NsYXNoLFxuICBmYVBob25lLFxuICBmYVVzZXJzLFxuICBmYUNvbW1lbnRzLFxuICBmYVNoYXJlQWx0LFxuICBmYVN5bmMsXG4gIGZhQ2hhcnRCYXIsXG4gIGZhUmVjb3JkVmlueWwsXG4gIGZhQ29nLFxuICBmYVBsYXlDaXJjbGUsXG4gIGZhUGF1c2VDaXJjbGUsXG4gIGZhU3RvcENpcmNsZSxcbiAgZmFEb3RDaXJjbGUsXG4gIGZhVmlkZW8sXG4gIGZhTWljcm9waG9uZSxcbn0gZnJvbSAnQGZvcnRhd2Vzb21lL2ZyZWUtc29saWQtc3ZnLWljb25zJztcblxuaW1wb3J0IHsgaW5pdGlhbFZhbHVlc1N0YXRlIH0gZnJvbSAnLi4vLi4vbWV0aG9kcy91dGlscy9pbml0aWFsLXZhbHVlcy51dGlsJztcblxuLy8gQ29tcG9uZW50cyBmb3IgZGlzcGxheVxuaW1wb3J0IHsgTWFpbkFzcGVjdENvbXBvbmVudCB9IGZyb20gJy4uL2Rpc3BsYXktY29tcG9uZW50cy9tYWluLWFzcGVjdC1jb21wb25lbnQvbWFpbi1hc3BlY3QtY29tcG9uZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBMb2FkaW5nTW9kYWwgfSBmcm9tICcuLi9kaXNwbGF5LWNvbXBvbmVudHMvbG9hZGluZy1tb2RhbC9sb2FkaW5nLW1vZGFsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb250cm9sQnV0dG9uc0NvbXBvbmVudFRvdWNoIH0gZnJvbSAnLi4vZGlzcGxheS1jb21wb25lbnRzL2NvbnRyb2wtYnV0dG9ucy1jb21wb25lbnQtdG91Y2gvY29udHJvbC1idXR0b25zLWNvbXBvbmVudC10b3VjaC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWFpblNjcmVlbkNvbXBvbmVudCB9IGZyb20gJy4uL2Rpc3BsYXktY29tcG9uZW50cy9tYWluLXNjcmVlbi1jb21wb25lbnQvbWFpbi1zY3JlZW4tY29tcG9uZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYWluR3JpZENvbXBvbmVudCB9IGZyb20gJy4uL2Rpc3BsYXktY29tcG9uZW50cy9tYWluLWdyaWQtY29tcG9uZW50L21haW4tZ3JpZC1jb21wb25lbnQuY29tcG9uZW50JztcbmltcG9ydCB7IE1haW5Db250YWluZXJDb21wb25lbnQgfSBmcm9tICcuLi9kaXNwbGF5LWNvbXBvbmVudHMvbWFpbi1jb250YWluZXItY29tcG9uZW50L21haW4tY29udGFpbmVyLWNvbXBvbmVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQWxlcnRDb21wb25lbnQgfSBmcm9tICcuLi9kaXNwbGF5LWNvbXBvbmVudHMvYWxlcnQtY29tcG9uZW50L2FsZXJ0LmNvbXBvbmVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgUmVjb3JkaW5nTW9kYWwgfSBmcm9tICcuLi9yZWNvcmRpbmctY29tcG9uZW50cy9yZWNvcmRpbmctbW9kYWwvcmVjb3JkaW5nLW1vZGFsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQYXJ0aWNpcGFudHNNb2RhbCB9IGZyb20gJy4uL3BhcnRpY2lwYW50cy1jb21wb25lbnRzL3BhcnRpY2lwYW50cy1tb2RhbC9wYXJ0aWNpcGFudHMtbW9kYWwuY29tcG9uZW50JztcbmltcG9ydCB7IE1lc3NhZ2VzTW9kYWwgfSBmcm9tICcuLi9tZXNzYWdlLWNvbXBvbmVudHMvbWVzc2FnZXMtbW9kYWwvbWVzc2FnZXMtbW9kYWwuY29tcG9uZW50JztcbmltcG9ydCB7IENvbmZpcm1FeGl0TW9kYWwgfSBmcm9tICcuLi9leGl0LWNvbXBvbmVudHMvY29uZmlybS1leGl0LW1vZGFsL2NvbmZpcm0tZXhpdC1tb2RhbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29uZmlybUhlcmVNb2RhbCB9IGZyb20gJy4uL21pc2MtY29tcG9uZW50cy9jb25maXJtLWhlcmUtbW9kYWwvY29uZmlybS1oZXJlLW1vZGFsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTaGFyZUV2ZW50TW9kYWwgfSBmcm9tICcuLi9taXNjLWNvbXBvbmVudHMvc2hhcmUtZXZlbnQtbW9kYWwvc2hhcmUtZXZlbnQtbW9kYWwuY29tcG9uZW50JztcbmltcG9ydCB7XG4gIFdlbGNvbWVQYWdlLFxuICBXZWxjb21lUGFnZU9wdGlvbnMsXG59IGZyb20gJy4uL21pc2MtY29tcG9uZW50cy93ZWxjb21lLXBhZ2Uvd2VsY29tZS1wYWdlLmNvbXBvbmVudCc7XG5cbi8vIFBhZ2luYXRpb24gYW5kIGRpc3BsYXkgb2YgbWVkaWFcbmltcG9ydCB7IEZsZXhpYmxlVmlkZW8gfSBmcm9tICcuLi9kaXNwbGF5LWNvbXBvbmVudHMvZmxleGlibGUtdmlkZW8vZmxleGlibGUtdmlkZW8uY29tcG9uZW50JztcbmltcG9ydCB7IEF1ZGlvR3JpZCB9IGZyb20gJy4uL2Rpc3BsYXktY29tcG9uZW50cy9hdWRpby1ncmlkL2F1ZGlvLWdyaWQuY29tcG9uZW50JztcblxuaW1wb3J0IHsgTWVzc2FnZVdpZGdldCB9IGZyb20gJy4uL2Rpc3BsYXktY29tcG9uZW50cy9jb250cm9sLXdpZGdldHMvbWVzc2FnZS13aWRnZXQuY29tcG9uZW50JztcbmltcG9ydCB7IE1lbnVSZWNvcmRXaWRnZXQgfSBmcm9tICcuLi9kaXNwbGF5LWNvbXBvbmVudHMvY29udHJvbC13aWRnZXRzL21lbnUtcmVjb3JkLXdpZGdldC5jb21wb25lbnQnO1xuaW1wb3J0IHsgUmVjb3JkVGltZXJXaWRnZXQgfSBmcm9tICcuLi9kaXNwbGF5LWNvbXBvbmVudHMvY29udHJvbC13aWRnZXRzL3JlY29yZC10aW1lci13aWRnZXQuY29tcG9uZW50JztcbmltcG9ydCB7IE1lbnVQYXJ0aWNpcGFudHNXaWRnZXQgfSBmcm9tICcuLi9kaXNwbGF5LWNvbXBvbmVudHMvY29udHJvbC13aWRnZXRzL21lbnUtcGFydGljaXBhbnRzLXdpZGdldC5jb21wb25lbnQnO1xuXG5pbXBvcnQge1xuICBCdXR0b25Ub3VjaCxcbiAgUmVzcG9uc2VKb2luUm9vbSxcbiAgQ29Ib3N0UmVzcG9uc2liaWxpdHksXG4gIEV2ZW50VHlwZSxcbiAgUGFydGljaXBhbnQsXG4gIENvbnN1bWVTb2NrZXQsXG4gIE1lZXRpbmdSb29tUGFyYW1zLFxuICBWaWRDb25zLFxuICBIUGFyYW1zVHlwZSxcbiAgVlBhcmFtc1R5cGUsXG4gIFNjcmVlblBhcmFtc1R5cGUsXG4gIEFQYXJhbXNUeXBlLFxuICBVc2VyUmVjb3JkaW5nUGFyYW1zLFxuICBTdHJlYW0sXG4gIEF1ZGlvRGVjaWJlbHMsXG4gIFNjcmVlblN0YXRlLFxuICBHcmlkU2l6ZXMsXG4gIEN1c3RvbU1lZGlhQ29tcG9uZW50LFxuICBNZXNzYWdlLFxuICBXYWl0aW5nUm9vbVBhcnRpY2lwYW50LFxuICBDb21wb25lbnRTaXplcyxcbiAgVHJhbnNwb3J0IGFzIFRyYW5zcG9ydFR5cGUsXG4gIFNoYXBlLFxuICBQb2xsLFxuICBCcmVha291dFBhcnRpY2lwYW50LFxuICBXaGl0ZWJvYXJkVXNlcixcbiAgUmVxdWVzdCxcbiAgQWxsTWVtYmVyc0RhdGEsXG4gIEFsbE1lbWJlcnNSZXN0RGF0YSxcbiAgTWFpbkJ1dHRvbkFsdCxcbiAgUmVjb3JkUGFyYW1zLFxuICBTZWVkRGF0YSxcbiAgVXBkYXRlQ29uc3VtaW5nRG9tYWluc0RhdGEsXG4gIFJlY29yZGluZ05vdGljZURhdGEsXG4gIFByZUpvaW5QYWdlT3B0aW9ucyxcbn0gZnJvbSAnLi4vLi4vQHR5cGVzL3R5cGVzJztcbi8vIEltcG9ydCBtZXRob2RzIGZvciBjb250cm9sXG5pbXBvcnQgeyBMYXVuY2hSZWNvcmRpbmcgfSBmcm9tICcuLi8uLi9tZXRob2RzL3JlY29yZGluZy1tZXRob2RzL2xhdW5jaC1yZWNvcmRpbmcuc2VydmljZSc7XG5pbXBvcnQgeyBTdGFydFJlY29yZGluZyB9IGZyb20gJy4uLy4uL21ldGhvZHMvcmVjb3JkaW5nLW1ldGhvZHMvc3RhcnQtcmVjb3JkaW5nLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29uZmlybVJlY29yZGluZyB9IGZyb20gJy4uLy4uL21ldGhvZHMvcmVjb3JkaW5nLW1ldGhvZHMvY29uZmlybS1yZWNvcmRpbmcuc2VydmljZSc7XG5pbXBvcnQgeyBMYXVuY2hQYXJ0aWNpcGFudHMgfSBmcm9tICcuLi8uLi9tZXRob2RzL3BhcnRpY2lwYW50cy1tZXRob2RzL2xhdW5jaC1wYXJ0aWNpcGFudHMuc2VydmljZSc7XG5pbXBvcnQgeyBMYXVuY2hNZXNzYWdlcyB9IGZyb20gJy4uLy4uL21ldGhvZHMvbWVzc2FnZS1tZXRob2RzL2xhdW5jaC1tZXNzYWdlcy5zZXJ2aWNlJztcbmltcG9ydCB7IExhdW5jaENvbmZpcm1FeGl0IH0gZnJvbSAnLi4vLi4vbWV0aG9kcy9leGl0LW1ldGhvZHMvbGF1bmNoLWNvbmZpcm0tZXhpdC5zZXJ2aWNlJztcblxuLy8gTWVkaWFzZnUgZnVuY3Rpb25zIC0tIGV4YW1wbGVzXG5pbXBvcnQgeyBTb2NrZXRNYW5hZ2VyIH0gZnJvbSAnLi4vLi4vc29ja2V0cy9zb2NrZXQtbWFuYWdlci5zZXJ2aWNlJztcbmltcG9ydCB7IEpvaW5Sb29tQ2xpZW50IH0gZnJvbSAnLi4vLi4vcHJvZHVjZXItY2xpZW50L3Byb2R1Y2VyLWNsaWVudC1lbWl0cy9qb2luLXJvb20tY2xpZW50LnNlcnZpY2UnO1xuaW1wb3J0IHsgVXBkYXRlUm9vbVBhcmFtZXRlcnNDbGllbnQgfSBmcm9tICcuLi8uLi9wcm9kdWNlci1jbGllbnQvcHJvZHVjZXItY2xpZW50LWVtaXRzL3VwZGF0ZS1yb29tLXBhcmFtZXRlcnMtY2xpZW50LnNlcnZpY2UnO1xuaW1wb3J0IHsgQ3JlYXRlRGV2aWNlQ2xpZW50IH0gZnJvbSAnLi4vLi4vcHJvZHVjZXItY2xpZW50L3Byb2R1Y2VyLWNsaWVudC1lbWl0cy9jcmVhdGUtZGV2aWNlLWNsaWVudC5zZXJ2aWNlJztcblxuaW1wb3J0IHsgU3dpdGNoVmlkZW9BbHQgfSBmcm9tICcuLi8uLi9tZXRob2RzL3N0cmVhbS1tZXRob2RzL3N3aXRjaC12aWRlby1hbHQuc2VydmljZSc7XG5pbXBvcnQgeyBDbGlja1ZpZGVvIH0gZnJvbSAnLi4vLi4vbWV0aG9kcy9zdHJlYW0tbWV0aG9kcy9jbGljay12aWRlby5zZXJ2aWNlJztcbmltcG9ydCB7IENsaWNrQXVkaW8gfSBmcm9tICcuLi8uLi9tZXRob2RzL3N0cmVhbS1tZXRob2RzL2NsaWNrLWF1ZGlvLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2xpY2tTY3JlZW5TaGFyZSB9IGZyb20gJy4uLy4uL21ldGhvZHMvc3RyZWFtLW1ldGhvZHMvY2xpY2stc2NyZWVuLXNoYXJlLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3RyZWFtU3VjY2Vzc1ZpZGVvIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL3N0cmVhbS1zdWNjZXNzLXZpZGVvLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3RyZWFtU3VjY2Vzc0F1ZGlvIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL3N0cmVhbS1zdWNjZXNzLWF1ZGlvLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3RyZWFtU3VjY2Vzc1NjcmVlbiB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9zdHJlYW0tc3VjY2Vzcy1zY3JlZW4uc2VydmljZSc7XG5pbXBvcnQgeyBTdHJlYW1TdWNjZXNzQXVkaW9Td2l0Y2ggfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvc3RyZWFtLXN1Y2Nlc3MtYXVkaW8tc3dpdGNoLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2hlY2tQZXJtaXNzaW9uIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL2NoZWNrLXBlcm1pc3Npb24uc2VydmljZSc7XG5cbi8vIE1lZGlhc2Z1IGNvbnN1bWVyIGZ1bmN0aW9uc1xuaW1wb3J0IHsgVXBkYXRlTWluaUNhcmRzR3JpZCB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy91cGRhdGUtbWluaS1jYXJkcy1ncmlkLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWl4U3RyZWFtcyB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9taXgtc3RyZWFtcy5zZXJ2aWNlJztcbmltcG9ydCB7IERpc3BTdHJlYW1zIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL2Rpc3Atc3RyZWFtcy5zZXJ2aWNlJztcbmltcG9ydCB7IFN0b3BTaGFyZVNjcmVlbiB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9zdG9wLXNoYXJlLXNjcmVlbi5zZXJ2aWNlJztcbmltcG9ydCB7IENoZWNrU2NyZWVuU2hhcmUgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvY2hlY2stc2NyZWVuLXNoYXJlLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3RhcnRTaGFyZVNjcmVlbiB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9zdGFydC1zaGFyZS1zY3JlZW4uc2VydmljZSc7XG5pbXBvcnQgeyBSZXF1ZXN0U2NyZWVuU2hhcmUgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvcmVxdWVzdC1zY3JlZW4tc2hhcmUuc2VydmljZSc7XG5pbXBvcnQgeyBSZW9yZGVyU3RyZWFtcyB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9yZW9yZGVyLXN0cmVhbXMuc2VydmljZSc7XG5pbXBvcnQgeyBQcmVwb3B1bGF0ZVVzZXJNZWRpYSB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9wcmVwb3B1bGF0ZS11c2VyLW1lZGlhLnNlcnZpY2UnO1xuaW1wb3J0IHsgR2V0VmlkZW9zIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL2dldC12aWRlb3Muc2VydmljZSc7XG5pbXBvcnQgeyBSZVBvcnQgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvcmUtcG9ydC5zZXJ2aWNlJztcbmltcG9ydCB7IFRyaWdnZXIgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvdHJpZ2dlci5zZXJ2aWNlJztcbmltcG9ydCB7IENvbnN1bWVyUmVzdW1lIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL2NvbnN1bWVyLXJlc3VtZS5zZXJ2aWNlJztcbmltcG9ydCB7IENvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW8gfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvY29ubmVjdC1zZW5kLXRyYW5zcG9ydC1hdWRpby5zZXJ2aWNlJztcbmltcG9ydCB7IENvbm5lY3RTZW5kVHJhbnNwb3J0VmlkZW8gfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvY29ubmVjdC1zZW5kLXRyYW5zcG9ydC12aWRlby5zZXJ2aWNlJztcbmltcG9ydCB7IENvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL2Nvbm5lY3Qtc2VuZC10cmFuc3BvcnQtc2NyZWVuLnNlcnZpY2UnO1xuaW1wb3J0IHsgUHJvY2Vzc0NvbnN1bWVyVHJhbnNwb3J0cyB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9wcm9jZXNzLWNvbnN1bWVyLXRyYW5zcG9ydHMuc2VydmljZSc7XG5pbXBvcnQgeyBSZXN1bWVQYXVzZVN0cmVhbXMgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvcmVzdW1lLXBhdXNlLXN0cmVhbXMuc2VydmljZSc7XG5pbXBvcnQgeyBSZWFkanVzdCB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9yZWFkanVzdC5zZXJ2aWNlJztcbmltcG9ydCB7IENoZWNrR3JpZCB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9jaGVjay1ncmlkLnNlcnZpY2UnO1xuaW1wb3J0IHsgR2V0RXN0aW1hdGUgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvZ2V0LWVzdGltYXRlLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2FsY3VsYXRlUm93c0FuZENvbHVtbnMgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvY2FsY3VsYXRlLXJvd3MtYW5kLWNvbHVtbnMuc2VydmljZSc7XG5pbXBvcnQgeyBBZGRWaWRlb3NHcmlkIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL2FkZC12aWRlb3MtZ3JpZC5zZXJ2aWNlJztcbmltcG9ydCB7IE9uU2NyZWVuQ2hhbmdlcyB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9vbi1zY3JlZW4tY2hhbmdlcy5zZXJ2aWNlJztcbmltcG9ydCB7IHNsZWVwIH0gZnJvbSAnLi4vLi4vbWV0aG9kcy91dGlscy9zbGVlcC51dGlsJztcbmltcG9ydCB7IENoYW5nZVZpZHMgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvY2hhbmdlLXZpZHMuc2VydmljZSc7XG5pbXBvcnQgeyBDb21wYXJlQWN0aXZlTmFtZXMgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvY29tcGFyZS1hY3RpdmUtbmFtZXMuc2VydmljZSc7XG5pbXBvcnQgeyBDb21wYXJlU2NyZWVuU3RhdGVzIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL2NvbXBhcmUtc2NyZWVuLXN0YXRlcy5zZXJ2aWNlJztcbmltcG9ydCB7IENyZWF0ZVNlbmRUcmFuc3BvcnQgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvY3JlYXRlLXNlbmQtdHJhbnNwb3J0LnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVzdW1lU2VuZFRyYW5zcG9ydEF1ZGlvIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL3Jlc3VtZS1zZW5kLXRyYW5zcG9ydC1hdWRpby5zZXJ2aWNlJztcbmltcG9ydCB7IFJlY2VpdmVBbGxQaXBlZFRyYW5zcG9ydHMgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvcmVjZWl2ZS1hbGwtcGlwZWQtdHJhbnNwb3J0cy5zZXJ2aWNlJztcbmltcG9ydCB7IERpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0VmlkZW8gfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvZGlzY29ubmVjdC1zZW5kLXRyYW5zcG9ydC12aWRlby5zZXJ2aWNlJztcbmltcG9ydCB7IERpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW8gfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvZGlzY29ubmVjdC1zZW5kLXRyYW5zcG9ydC1hdWRpby5zZXJ2aWNlJztcbmltcG9ydCB7IERpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL2Rpc2Nvbm5lY3Qtc2VuZC10cmFuc3BvcnQtc2NyZWVuLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29ubmVjdFNlbmRUcmFuc3BvcnQgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvY29ubmVjdC1zZW5kLXRyYW5zcG9ydC5zZXJ2aWNlJztcbmltcG9ydCB7IEdldFBpcGVkUHJvZHVjZXJzQWx0IH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL2dldC1waXBlZC1wcm9kdWNlcnMtYWx0LnNlcnZpY2UnO1xuaW1wb3J0IHsgU2lnbmFsTmV3Q29uc3VtZXJUcmFuc3BvcnQgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvc2lnbmFsLW5ldy1jb25zdW1lci10cmFuc3BvcnQuc2VydmljZSc7XG5pbXBvcnQgeyBDb25uZWN0UmVjdlRyYW5zcG9ydCB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9jb25uZWN0LXJlY3YtdHJhbnNwb3J0LnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVVcGRhdGVJbnRlciB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9yZS11cGRhdGUtaW50ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBVcGRhdGVQYXJ0aWNpcGFudEF1ZGlvRGVjaWJlbHMgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvdXBkYXRlLXBhcnRpY2lwYW50LWF1ZGlvLWRlY2liZWxzLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2xvc2VBbmRSZXNpemUgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvY2xvc2UtYW5kLXJlc2l6ZS5zZXJ2aWNlJztcbmltcG9ydCB7IEF1dG9BZGp1c3QgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvYXV0by1hZGp1c3Quc2VydmljZSc7XG5pbXBvcnQgeyBTd2l0Y2hVc2VyVmlkZW9BbHQgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvc3dpdGNoLXVzZXItdmlkZW8tYWx0LnNlcnZpY2UnO1xuaW1wb3J0IHsgU3dpdGNoVXNlclZpZGVvIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL3N3aXRjaC11c2VyLXZpZGVvLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3dpdGNoVXNlckF1ZGlvIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL3N3aXRjaC11c2VyLWF1ZGlvLnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVjZWl2ZVJvb21NZXNzYWdlcyB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9yZWNlaXZlLXJvb20tbWVzc2FnZXMuc2VydmljZSc7XG5pbXBvcnQgeyBGb3JtYXROdW1iZXIgfSBmcm9tICcuLi8uLi9tZXRob2RzL3V0aWxzL2Zvcm1hdC1udW1iZXIuc2VydmljZSc7XG5pbXBvcnQgeyBDb25uZWN0SXBzIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL2Nvbm5lY3QtaXBzLnNlcnZpY2UnO1xuXG4vLyBVdGlsaXR5IGltcG9ydHMgZm9yIG1lZXRpbmcgYW5kIHJlY29yZGluZyBmdW5jdGlvbmFsaXR5XG5pbXBvcnQgeyBTdGFydE1lZXRpbmdQcm9ncmVzc1RpbWVyIH0gZnJvbSAnLi4vLi4vbWV0aG9kcy91dGlscy9tZWV0aW5nLXRpbWVyL3N0YXJ0LW1lZXRpbmctcHJvZ3Jlc3MtdGltZXIuc2VydmljZSc7XG5pbXBvcnQgeyBVcGRhdGVSZWNvcmRpbmcgfSBmcm9tICcuLi8uLi9tZXRob2RzL3JlY29yZGluZy1tZXRob2RzL3VwZGF0ZS1yZWNvcmRpbmcuc2VydmljZSc7XG5pbXBvcnQgeyBTdG9wUmVjb3JkaW5nIH0gZnJvbSAnLi4vLi4vbWV0aG9kcy9yZWNvcmRpbmctbWV0aG9kcy9zdG9wLXJlY29yZGluZy5zZXJ2aWNlJztcblxuLy8gU29ja2V0IG1ldGhvZHMgZm9yIHBhcnRpY2lwYW50IGFuZCBtZWV0aW5nIG1hbmFnZW1lbnRcbmltcG9ydCB7IFBlcnNvbkpvaW5lZCB9IGZyb20gJy4uLy4uL3Byb2R1Y2Vycy9zb2NrZXQtcmVjZWl2ZS1tZXRob2RzL3BlcnNvbi1qb2luZWQuc2VydmljZSc7XG5pbXBvcnQgeyBSb29tUmVjb3JkUGFyYW1zIH0gZnJvbSAnLi4vLi4vcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvcm9vbS1yZWNvcmQtcGFyYW1zLnNlcnZpY2UnO1xuaW1wb3J0IHsgQmFuUGFydGljaXBhbnQgfSBmcm9tICcuLi8uLi9wcm9kdWNlcnMvc29ja2V0LXJlY2VpdmUtbWV0aG9kcy9iYW4tcGFydGljaXBhbnQuc2VydmljZSc7XG5pbXBvcnQgeyBQcm9kdWNlck1lZGlhUGF1c2VkIH0gZnJvbSAnLi4vLi4vcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvcHJvZHVjZXItbWVkaWEtcGF1c2VkLnNlcnZpY2UnO1xuaW1wb3J0IHsgUHJvZHVjZXJNZWRpYVJlc3VtZWQgfSBmcm9tICcuLi8uLi9wcm9kdWNlcnMvc29ja2V0LXJlY2VpdmUtbWV0aG9kcy9wcm9kdWNlci1tZWRpYS1yZXN1bWVkLnNlcnZpY2UnO1xuaW1wb3J0IHsgUHJvZHVjZXJNZWRpYUNsb3NlZCB9IGZyb20gJy4uLy4uL3Byb2R1Y2Vycy9zb2NrZXQtcmVjZWl2ZS1tZXRob2RzL3Byb2R1Y2VyLW1lZGlhLWNsb3NlZC5zZXJ2aWNlJztcbmltcG9ydCB7IE1lZXRpbmdFbmRlZCB9IGZyb20gJy4uLy4uL3Byb2R1Y2Vycy9zb2NrZXQtcmVjZWl2ZS1tZXRob2RzL21lZXRpbmctZW5kZWQuc2VydmljZSc7XG5pbXBvcnQgeyBEaXNjb25uZWN0VXNlclNlbGYgfSBmcm9tICcuLi8uLi9wcm9kdWNlcnMvc29ja2V0LXJlY2VpdmUtbWV0aG9kcy9kaXNjb25uZWN0LXVzZXItc2VsZi5zZXJ2aWNlJztcbmltcG9ydCB7IFJlY2VpdmVNZXNzYWdlIH0gZnJvbSAnLi4vLi4vcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvcmVjZWl2ZS1tZXNzYWdlLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWVldGluZ1RpbWVSZW1haW5pbmcgfSBmcm9tICcuLi8uLi9wcm9kdWNlcnMvc29ja2V0LXJlY2VpdmUtbWV0aG9kcy9tZWV0aW5nLXRpbWUtcmVtYWluaW5nLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWVldGluZ1N0aWxsVGhlcmUgfSBmcm9tICcuLi8uLi9wcm9kdWNlcnMvc29ja2V0LXJlY2VpdmUtbWV0aG9kcy9tZWV0aW5nLXN0aWxsLXRoZXJlLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3RhcnRSZWNvcmRzIH0gZnJvbSAnLi4vLi4vcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvc3RhcnQtcmVjb3Jkcy5zZXJ2aWNlJztcbmltcG9ydCB7IFJlSW5pdGlhdGVSZWNvcmRpbmcgfSBmcm9tICcuLi8uLi9wcm9kdWNlcnMvc29ja2V0LXJlY2VpdmUtbWV0aG9kcy9yZS1pbml0aWF0ZS1yZWNvcmRpbmcuc2VydmljZSc7XG5pbXBvcnQgeyBHZXREb21haW5zIH0gZnJvbSAnLi4vLi4vcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvZ2V0LWRvbWFpbnMuc2VydmljZSc7XG5pbXBvcnQgeyBVcGRhdGVDb25zdW1pbmdEb21haW5zIH0gZnJvbSAnLi4vLi4vcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvdXBkYXRlLWNvbnN1bWluZy1kb21haW5zLnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVjb3JkaW5nTm90aWNlIH0gZnJvbSAnLi4vLi4vcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvcmVjb3JkaW5nLW5vdGljZS5zZXJ2aWNlJztcbmltcG9ydCB7IFRpbWVMZWZ0UmVjb3JkaW5nIH0gZnJvbSAnLi4vLi4vcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvdGltZS1sZWZ0LXJlY29yZGluZy5zZXJ2aWNlJztcbmltcG9ydCB7IFN0b3BwZWRSZWNvcmRpbmcgfSBmcm9tICcuLi8uLi9wcm9kdWNlcnMvc29ja2V0LXJlY2VpdmUtbWV0aG9kcy9zdG9wcGVkLXJlY29yZGluZy5zZXJ2aWNlJztcbmltcG9ydCB7IEFsbE1lbWJlcnMgfSBmcm9tICcuLi8uLi9wcm9kdWNlcnMvc29ja2V0LXJlY2VpdmUtbWV0aG9kcy9hbGwtbWVtYmVycy5zZXJ2aWNlJztcbmltcG9ydCB7IEFsbE1lbWJlcnNSZXN0IH0gZnJvbSAnLi4vLi4vcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvYWxsLW1lbWJlcnMtcmVzdC5zZXJ2aWNlJztcbmltcG9ydCB7IERpc2Nvbm5lY3QgfSBmcm9tICcuLi8uLi9wcm9kdWNlcnMvc29ja2V0LXJlY2VpdmUtbWV0aG9kcy9kaXNjb25uZWN0LnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBDYXB0dXJlQ2FudmFzU3RyZWFtIH0gZnJvbSAnLi4vLi4vbWV0aG9kcy93aGl0ZWJvYXJkLW1ldGhvZHMvY2FwdHVyZS1jYW52YXMtc3RyZWFtLnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVzdW1lUGF1c2VBdWRpb1N0cmVhbXMgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvcmVzdW1lLXBhdXNlLWF1ZGlvLXN0cmVhbXMuc2VydmljZSc7XG5pbXBvcnQgeyBQcm9jZXNzQ29uc3VtZXJUcmFuc3BvcnRzQXVkaW8gfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvcHJvY2Vzcy1jb25zdW1lci10cmFuc3BvcnRzLWF1ZGlvLnNlcnZpY2UnO1xuXG5pbXBvcnQge1xuICBEZXZpY2UsXG4gIFByb2R1Y2VyLFxuICBQcm9kdWNlck9wdGlvbnMsXG4gIFJ0cENhcGFiaWxpdGllcyxcbiAgVHJhbnNwb3J0LFxufSBmcm9tICdtZWRpYXNvdXAtY2xpZW50L2xpYi90eXBlcyc7XG5pbXBvcnQgeyBTZWxmaWVTZWdtZW50YXRpb24gfSBmcm9tICdAbWVkaWFwaXBlL3NlbGZpZV9zZWdtZW50YXRpb24nO1xuXG5leHBvcnQgdHlwZSBNZWRpYXNmdUJyb2FkY2FzdE9wdGlvbnMgPSB7XG4gIFByZWpvaW5QYWdlPzogKG9wdGlvbnM6IFByZUpvaW5QYWdlT3B0aW9ucyB8IFdlbGNvbWVQYWdlT3B0aW9ucykgPT4gSFRNTEVsZW1lbnQ7XG4gIGNyZWRlbnRpYWxzPzogeyBhcGlVc2VyTmFtZTogc3RyaW5nOyBhcGlLZXk6IHN0cmluZyB9O1xuICB1c2VMb2NhbFVJTW9kZT86IGJvb2xlYW47XG4gIHNlZWREYXRhPzogU2VlZERhdGE7XG4gIHVzZVNlZWQ/OiBib29sZWFuO1xuICBpbWdTcmM/OiBzdHJpbmc7XG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtbWVkaWFzZnUtYnJvYWRjYXN0JyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW1xuICAgIFJvdXRlck91dGxldCxcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgQWxlcnRDb21wb25lbnQsXG4gICAgQXVkaW9HcmlkLFxuICAgIENvbnRyb2xCdXR0b25zQ29tcG9uZW50VG91Y2gsXG4gICAgRmxleGlibGVWaWRlbyxcbiAgICBMb2FkaW5nTW9kYWwsXG4gICAgQ29uZmlybUV4aXRNb2RhbCxcbiAgICBNZXNzYWdlc01vZGFsLFxuICAgIENvbmZpcm1IZXJlTW9kYWwsXG4gICAgU2hhcmVFdmVudE1vZGFsLFxuICAgIFdlbGNvbWVQYWdlLFxuICAgIFBhcnRpY2lwYW50c01vZGFsLFxuICAgIFJlY29yZGluZ01vZGFsLFxuICAgIE1haW5Bc3BlY3RDb21wb25lbnQsXG4gICAgTWFpbkNvbnRhaW5lckNvbXBvbmVudCxcbiAgICBNYWluR3JpZENvbXBvbmVudCxcbiAgICBNYWluU2NyZWVuQ29tcG9uZW50LFxuICAgIE1lc3NhZ2VXaWRnZXQsXG4gICAgTWVudVJlY29yZFdpZGdldCxcbiAgICBSZWNvcmRUaW1lcldpZGdldCxcbiAgICBNZW51UGFydGljaXBhbnRzV2lkZ2V0LFxuICBdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXZcbiAgICAgIGNsYXNzPVwiTWVkaWFTRlVcIlxuICAgICAgW25nU3R5bGVdPVwie1xuICAgICAgICBoZWlnaHQ6ICcxMDB2aCcsXG4gICAgICAgIHdpZHRoOiAnMTAwdncnLFxuICAgICAgICBtYXhXaWR0aDogJzEwMHZ3JyxcbiAgICAgICAgbWF4SGVpZ2h0OiAnMTAwdmgnLFxuICAgICAgICBvdmVyZmxvdzogJ2hpZGRlbidcbiAgICAgIH1cIlxuICAgID5cbiAgICAgIDwhLS0gQ29uZGl0aW9uYWwgUmVuZGVyaW5nOiBQcmVqb2luUGFnZSBvciBNYWluIENvbnRlbnQgLS0+XG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIXZhbGlkYXRlZC52YWx1ZTsgZWxzZSBtYWluQ29udGVudFwiPlxuICAgICAgICA8bmctY29udGFpbmVyXG4gICAgICAgICAgKm5nQ29tcG9uZW50T3V0bGV0PVwiXG4gICAgICAgICAgICBQcmVqb2luUGFnZUNvbXBvbmVudC5jb21wb25lbnQ7XG4gICAgICAgICAgICBpbmplY3RvcjogUHJlam9pblBhZ2VDb21wb25lbnQuaW5qZWN0b3JcbiAgICAgICAgICBcIlxuICAgICAgICA+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICAgIDwhLS0gTWFpbiBDb250ZW50IC0tPlxuICAgICAgPG5nLXRlbXBsYXRlICNtYWluQ29udGVudD5cbiAgICAgICAgPGFwcC1tYWluLWNvbnRhaW5lci1jb21wb25lbnQ+XG4gICAgICAgICAgPCEtLSBNYWluIEFzcGVjdCBDb21wb25lbnQgLS0+XG4gICAgICAgICAgPGFwcC1tYWluLWFzcGVjdC1jb21wb25lbnRcbiAgICAgICAgICAgIFtiYWNrZ3JvdW5kQ29sb3JdPVwiJ3JnYmEoMjE3LCAyMjcsIDIzNCwgMC45OSknXCJcbiAgICAgICAgICAgIFtkZWZhdWx0RnJhY3Rpb25dPVwiMSAtIGNvbnRyb2xIZWlnaHQudmFsdWVcIlxuICAgICAgICAgICAgW3Nob3dDb250cm9sc109XCJldmVudFR5cGUudmFsdWUgPT09ICd3ZWJpbmFyJyB8fCBldmVudFR5cGUudmFsdWUgPT09ICdjb25mZXJlbmNlJ1wiXG4gICAgICAgICAgICBbdXBkYXRlSXNXaWRlU2NyZWVuXT1cInVwZGF0ZUlzV2lkZVNjcmVlblwiXG4gICAgICAgICAgICBbdXBkYXRlSXNNZWRpdW1TY3JlZW5dPVwidXBkYXRlSXNNZWRpdW1TY3JlZW5cIlxuICAgICAgICAgICAgW3VwZGF0ZUlzU21hbGxTY3JlZW5dPVwidXBkYXRlSXNTbWFsbFNjcmVlblwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPCEtLSBNYWluIFNjcmVlbiBDb21wb25lbnQgLS0+XG4gICAgICAgICAgICA8YXBwLW1haW4tc2NyZWVuLWNvbXBvbmVudFxuICAgICAgICAgICAgICBbZG9TdGFja109XCJ0cnVlXCJcbiAgICAgICAgICAgICAgW21haW5TaXplXT1cIm1haW5IZWlnaHRXaWR0aC52YWx1ZVwiXG4gICAgICAgICAgICAgIFtkZWZhdWx0RnJhY3Rpb25dPVwiMSAtIGNvbnRyb2xIZWlnaHQudmFsdWVcIlxuICAgICAgICAgICAgICBbc2hvd0NvbnRyb2xzXT1cImV2ZW50VHlwZS52YWx1ZSA9PT0gJ3dlYmluYXInIHx8IGV2ZW50VHlwZS52YWx1ZSA9PT0gJ2NvbmZlcmVuY2UnXCJcbiAgICAgICAgICAgICAgW3VwZGF0ZUNvbXBvbmVudFNpemVzXT1cInVwZGF0ZUNvbXBvbmVudFNpemVzXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPCEtLSBNYWluIEdyaWQgQ29tcG9uZW50IC0tPlxuICAgICAgICAgICAgICA8YXBwLW1haW4tZ3JpZC1jb21wb25lbnRcbiAgICAgICAgICAgICAgICBbaGVpZ2h0XT1cImNvbXBvbmVudFNpemVzLnZhbHVlLm1haW5IZWlnaHRcIlxuICAgICAgICAgICAgICAgIFt3aWR0aF09XCJjb21wb25lbnRTaXplcy52YWx1ZS5tYWluV2lkdGhcIlxuICAgICAgICAgICAgICAgIFtiYWNrZ3JvdW5kQ29sb3JdPVwiJ3JnYmEoMjE3LCAyMjcsIDIzNCwgMC45OSknXCJcbiAgICAgICAgICAgICAgICBbbWFpblNpemVdPVwibWFpbkhlaWdodFdpZHRoLnZhbHVlXCJcbiAgICAgICAgICAgICAgICBbc2hvd0FzcGVjdF09XCJtYWluSGVpZ2h0V2lkdGgudmFsdWUgPiAwXCJcbiAgICAgICAgICAgICAgICBbdGltZUJhY2tncm91bmRDb2xvcl09XCJyZWNvcmRTdGF0ZS52YWx1ZVwiXG4gICAgICAgICAgICAgICAgW21lZXRpbmdQcm9ncmVzc1RpbWVdPVwibWVldGluZ1Byb2dyZXNzVGltZS52YWx1ZVwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8YXBwLWZsZXhpYmxlLXZpZGVvXG4gICAgICAgICAgICAgICAgICBbY3VzdG9tV2lkdGhdPVwiY29tcG9uZW50U2l6ZXMudmFsdWUubWFpbldpZHRoXCJcbiAgICAgICAgICAgICAgICAgIFtjdXN0b21IZWlnaHRdPVwiY29tcG9uZW50U2l6ZXMudmFsdWUubWFpbkhlaWdodFwiXG4gICAgICAgICAgICAgICAgICBbcm93c109XCIxXCJcbiAgICAgICAgICAgICAgICAgIFtjb2x1bW5zXT1cIjFcIlxuICAgICAgICAgICAgICAgICAgW2NvbXBvbmVudHNUb1JlbmRlcl09XCJtYWluR3JpZFN0cmVhbS52YWx1ZVwiXG4gICAgICAgICAgICAgICAgICBbc2hvd0FzcGVjdF09XCJcbiAgICAgICAgICAgICAgICAgICAgbWFpbkdyaWRTdHJlYW0udmFsdWUubGVuZ3RoID4gMCAmJlxuICAgICAgICAgICAgICAgICAgICAhKHdoaXRlYm9hcmRTdGFydGVkLnZhbHVlICYmICF3aGl0ZWJvYXJkRW5kZWQudmFsdWUpXG4gICAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8L2FwcC1mbGV4aWJsZS12aWRlbz5cblxuICAgICAgICAgICAgICAgIDwhLS0gQ29udHJvbCBCdXR0b25zIGZvciBCcm9hZGNhc3QgLS0+XG4gICAgICAgICAgICAgICAgPGFwcC1jb250cm9sLWJ1dHRvbnMtY29tcG9uZW50LXRvdWNoXG4gICAgICAgICAgICAgICAgICBbYnV0dG9uc109XCJjb250cm9sQnJvYWRjYXN0QnV0dG9uc1wiXG4gICAgICAgICAgICAgICAgICBbcG9zaXRpb25dPVwiJ3JpZ2h0J1wiXG4gICAgICAgICAgICAgICAgICBbbG9jYXRpb25dPVwiJ2JvdHRvbSdcIlxuICAgICAgICAgICAgICAgICAgW2RpcmVjdGlvbl09XCIndmVydGljYWwnXCJcbiAgICAgICAgICAgICAgICAgIFtzaG93QXNwZWN0XT1cImV2ZW50VHlwZS52YWx1ZSA9PT0gJ2Jyb2FkY2FzdCdcIlxuICAgICAgICAgICAgICAgID48L2FwcC1jb250cm9sLWJ1dHRvbnMtY29tcG9uZW50LXRvdWNoPlxuXG4gICAgICAgICAgICAgICAgPCEtLSBSZWNvcmRpbmcgQnV0dG9ucyAtLT5cbiAgICAgICAgICAgICAgICA8YXBwLWNvbnRyb2wtYnV0dG9ucy1jb21wb25lbnQtdG91Y2hcbiAgICAgICAgICAgICAgICAgIFtidXR0b25zXT1cInJlY29yZEJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICBbZGlyZWN0aW9uXT1cIidob3Jpem9udGFsJ1wiXG4gICAgICAgICAgICAgICAgICBbc2hvd0FzcGVjdF09XCJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRUeXBlLnZhbHVlID09PSAnYnJvYWRjYXN0JyAmJlxuICAgICAgICAgICAgICAgICAgICAhc2hvd1JlY29yZEJ1dHRvbnMudmFsdWUgJiZcbiAgICAgICAgICAgICAgICAgICAgaXNsZXZlbC52YWx1ZSA9PT0gJzInXG4gICAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgW2xvY2F0aW9uXT1cIidib3R0b20nXCJcbiAgICAgICAgICAgICAgICAgIFtwb3NpdGlvbl09XCInbWlkZGxlJ1wiXG4gICAgICAgICAgICAgICAgPjwvYXBwLWNvbnRyb2wtYnV0dG9ucy1jb21wb25lbnQtdG91Y2g+XG5cbiAgICAgICAgICAgICAgICA8YXBwLWNvbnRyb2wtYnV0dG9ucy1jb21wb25lbnQtdG91Y2hcbiAgICAgICAgICAgICAgICAgIFtidXR0b25zXT1cInJlY29yZEJ1dHRvbnNcIlxuICAgICAgICAgICAgICAgICAgW2RpcmVjdGlvbl09XCInaG9yaXpvbnRhbCdcIlxuICAgICAgICAgICAgICAgICAgW3Nob3dBc3BlY3RdPVwiXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50VHlwZS52YWx1ZSA9PT0gJ2Jyb2FkY2FzdCcgJiZcbiAgICAgICAgICAgICAgICAgICAgc2hvd1JlY29yZEJ1dHRvbnMudmFsdWUgJiZcbiAgICAgICAgICAgICAgICAgICAgaXNsZXZlbC52YWx1ZSA9PT0gJzInXG4gICAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgW2xvY2F0aW9uXT1cIidib3R0b20nXCJcbiAgICAgICAgICAgICAgICAgIFtwb3NpdGlvbl09XCInbWlkZGxlJ1wiXG4gICAgICAgICAgICAgICAgPjwvYXBwLWNvbnRyb2wtYnV0dG9ucy1jb21wb25lbnQtdG91Y2g+XG5cbiAgICAgICAgICAgICAgICA8IS0tIEF1ZGlvR3JpZCAtLT5cbiAgICAgICAgICAgICAgICA8YXBwLWF1ZGlvLWdyaWQgW2NvbXBvbmVudHNUb1JlbmRlcl09XCJhdWRpb09ubHlTdHJlYW1zLnZhbHVlXCI+PC9hcHAtYXVkaW8tZ3JpZD5cbiAgICAgICAgICAgICAgPC9hcHAtbWFpbi1ncmlkLWNvbXBvbmVudD5cblxuICAgICAgICAgICAgICA8IS0tIE90aGVyIEdyaWQgQ29tcG9uZW50IGlzIG5vdCBpbmNsdWRlZCBpbiBNZWRpYXNmdUJyb2FkY2FzdCAtLT5cbiAgICAgICAgICAgIDwvYXBwLW1haW4tc2NyZWVuLWNvbXBvbmVudD5cbiAgICAgICAgICA8L2FwcC1tYWluLWFzcGVjdC1jb21wb25lbnQ+XG4gICAgICAgIDwvYXBwLW1haW4tY29udGFpbmVyLWNvbXBvbmVudD5cbiAgICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICAgIDwhLS0gTW9kYWxzIHRvIGluY2x1ZGUgLS0+XG4gICAgICA8YXBwLXBhcnRpY2lwYW50cy1tb2RhbFxuICAgICAgICBbYmFja2dyb3VuZENvbG9yXT1cIidyZ2JhKDIxNywgMjI3LCAyMzQsIDAuOTkpJ1wiXG4gICAgICAgIFtpc1BhcnRpY2lwYW50c01vZGFsVmlzaWJsZV09XCJpc1BhcnRpY2lwYW50c01vZGFsVmlzaWJsZS52YWx1ZVwiXG4gICAgICAgIFtvblBhcnRpY2lwYW50c0Nsb3NlXT1cIm9uUGFydGljaXBhbnRzQ2xvc2VcIlxuICAgICAgICBbcGFydGljaXBhbnRzQ291bnRlcl09XCJwYXJ0aWNpcGFudHNDb3VudGVyLnZhbHVlXCJcbiAgICAgICAgW29uUGFydGljaXBhbnRzRmlsdGVyQ2hhbmdlXT1cIm9uUGFydGljaXBhbnRzRmlsdGVyQ2hhbmdlXCJcbiAgICAgICAgW3BhcmFtZXRlcnNdPVwie1xuICAgICAgICAgIHVwZGF0ZVBhcnRpY2lwYW50czogdXBkYXRlUGFydGljaXBhbnRzLFxuICAgICAgICAgIHVwZGF0ZUlzUGFydGljaXBhbnRzTW9kYWxWaXNpYmxlOiB1cGRhdGVJc1BhcnRpY2lwYW50c01vZGFsVmlzaWJsZSxcbiAgICAgICAgICB1cGRhdGVEaXJlY3RNZXNzYWdlRGV0YWlsczogdXBkYXRlRGlyZWN0TWVzc2FnZURldGFpbHMsXG4gICAgICAgICAgdXBkYXRlU3RhcnREaXJlY3RNZXNzYWdlOiB1cGRhdGVTdGFydERpcmVjdE1lc3NhZ2UsXG4gICAgICAgICAgdXBkYXRlSXNNZXNzYWdlc01vZGFsVmlzaWJsZTogdXBkYXRlSXNNZXNzYWdlc01vZGFsVmlzaWJsZSxcbiAgICAgICAgICBzaG93QWxlcnQ6IHNob3dBbGVydCxcbiAgICAgICAgICBmaWx0ZXJlZFBhcnRpY2lwYW50czogZmlsdGVyZWRQYXJ0aWNpcGFudHMudmFsdWUsXG4gICAgICAgICAgcGFydGljaXBhbnRzOiBmaWx0ZXJlZFBhcnRpY2lwYW50cy52YWx1ZSxcbiAgICAgICAgICByb29tTmFtZTogcm9vbU5hbWUudmFsdWUsXG4gICAgICAgICAgaXNsZXZlbDogaXNsZXZlbC52YWx1ZSxcbiAgICAgICAgICBtZW1iZXI6IG1lbWJlci52YWx1ZSxcbiAgICAgICAgICBjb0hvc3RSZXNwb25zaWJpbGl0eTogY29Ib3N0UmVzcG9uc2liaWxpdHkudmFsdWUsXG4gICAgICAgICAgY29Ib3N0OiBjb0hvc3QudmFsdWUsXG4gICAgICAgICAgZXZlbnRUeXBlOiBldmVudFR5cGUudmFsdWUsXG4gICAgICAgICAgc3RhcnREaXJlY3RNZXNzYWdlOiBzdGFydERpcmVjdE1lc3NhZ2UudmFsdWUsXG4gICAgICAgICAgZGlyZWN0TWVzc2FnZURldGFpbHM6IGRpcmVjdE1lc3NhZ2VEZXRhaWxzLnZhbHVlLFxuICAgICAgICAgIHNvY2tldDogc29ja2V0LnZhbHVlLFxuICAgICAgICAgIGdldFVwZGF0ZWRBbGxQYXJhbXM6IGdldFVwZGF0ZWRBbGxQYXJhbXMsXG4gICAgICAgIH1cIlxuICAgICAgPjwvYXBwLXBhcnRpY2lwYW50cy1tb2RhbD5cblxuICAgICAgPGFwcC1yZWNvcmRpbmctbW9kYWxcbiAgICAgICAgW2JhY2tncm91bmRDb2xvcl09XCIncmdiYSgyMTcsIDIyNywgMjM0LCAwLjk5KSdcIlxuICAgICAgICBbaXNSZWNvcmRpbmdNb2RhbFZpc2libGVdPVwiaXNSZWNvcmRpbmdNb2RhbFZpc2libGUudmFsdWVcIlxuICAgICAgICBbb25DbG9zZV09XCJvblJlY29yZGluZ0Nsb3NlXCJcbiAgICAgICAgW3N0YXJ0UmVjb3JkaW5nXT1cInN0YXJ0UmVjb3JkaW5nLnN0YXJ0UmVjb3JkaW5nXCJcbiAgICAgICAgW2NvbmZpcm1SZWNvcmRpbmddPVwiY29uZmlybVJlY29yZGluZy5jb25maXJtUmVjb3JkaW5nXCJcbiAgICAgICAgW3BhcmFtZXRlcnNdPVwibWVkaWFTRlVQYXJhbWV0ZXJzXCJcbiAgICAgID48L2FwcC1yZWNvcmRpbmctbW9kYWw+XG5cbiAgICAgIDxhcHAtbWVzc2FnZXMtbW9kYWxcbiAgICAgICAgW2JhY2tncm91bmRDb2xvcl09XCJcbiAgICAgICAgICBldmVudFR5cGUudmFsdWUgPT09ICd3ZWJpbmFyJyB8fCBldmVudFR5cGUudmFsdWUgPT09ICdjb25mZXJlbmNlJ1xuICAgICAgICAgICAgPyAnI2Y1ZjVmNSdcbiAgICAgICAgICAgIDogJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMC4yNSknXG4gICAgICAgIFwiXG4gICAgICAgIFtpc01lc3NhZ2VzTW9kYWxWaXNpYmxlXT1cImlzTWVzc2FnZXNNb2RhbFZpc2libGUudmFsdWVcIlxuICAgICAgICBbb25NZXNzYWdlc0Nsb3NlXT1cIm9uTWVzc2FnZXNDbG9zZVwiXG4gICAgICAgIFttZXNzYWdlc109XCJtZXNzYWdlcy52YWx1ZVwiXG4gICAgICAgIFtldmVudFR5cGVdPVwiZXZlbnRUeXBlLnZhbHVlXCJcbiAgICAgICAgW21lbWJlcl09XCJtZW1iZXIudmFsdWVcIlxuICAgICAgICBbaXNsZXZlbF09XCJpc2xldmVsLnZhbHVlXCJcbiAgICAgICAgW2NvSG9zdFJlc3BvbnNpYmlsaXR5XT1cImNvSG9zdFJlc3BvbnNpYmlsaXR5LnZhbHVlXCJcbiAgICAgICAgW2NvSG9zdF09XCJjb0hvc3QudmFsdWVcIlxuICAgICAgICBbc3RhcnREaXJlY3RNZXNzYWdlXT1cInN0YXJ0RGlyZWN0TWVzc2FnZS52YWx1ZVwiXG4gICAgICAgIFtkaXJlY3RNZXNzYWdlRGV0YWlsc109XCJkaXJlY3RNZXNzYWdlRGV0YWlscy52YWx1ZVwiXG4gICAgICAgIFt1cGRhdGVTdGFydERpcmVjdE1lc3NhZ2VdPVwidXBkYXRlU3RhcnREaXJlY3RNZXNzYWdlXCJcbiAgICAgICAgW3VwZGF0ZURpcmVjdE1lc3NhZ2VEZXRhaWxzXT1cInVwZGF0ZURpcmVjdE1lc3NhZ2VEZXRhaWxzXCJcbiAgICAgICAgW3Nob3dBbGVydF09XCJzaG93QWxlcnRcIlxuICAgICAgICBbcm9vbU5hbWVdPVwicm9vbU5hbWUudmFsdWVcIlxuICAgICAgICBbc29ja2V0XT1cInNvY2tldC52YWx1ZVwiXG4gICAgICAgIFtjaGF0U2V0dGluZ109XCJjaGF0U2V0dGluZy52YWx1ZVwiXG4gICAgICA+PC9hcHAtbWVzc2FnZXMtbW9kYWw+XG5cbiAgICAgIDxhcHAtY29uZmlybS1leGl0LW1vZGFsXG4gICAgICAgIFtiYWNrZ3JvdW5kQ29sb3JdPVwiJ3JnYmEoMTgxLCAyMzMsIDIyOSwgMC45NyknXCJcbiAgICAgICAgW2lzQ29uZmlybUV4aXRNb2RhbFZpc2libGVdPVwiaXNDb25maXJtRXhpdE1vZGFsVmlzaWJsZS52YWx1ZVwiXG4gICAgICAgIFtvbkNvbmZpcm1FeGl0Q2xvc2VdPVwib25Db25maXJtRXhpdENsb3NlXCJcbiAgICAgICAgW3Bvc2l0aW9uXT1cIid0b3BSaWdodCdcIlxuICAgICAgICBbbWVtYmVyXT1cIm1lbWJlci52YWx1ZVwiXG4gICAgICAgIFtyb29tTmFtZV09XCJyb29tTmFtZS52YWx1ZVwiXG4gICAgICAgIFtzb2NrZXRdPVwic29ja2V0LnZhbHVlXCJcbiAgICAgICAgW2lzbGV2ZWxdPVwiaXNsZXZlbC52YWx1ZVwiXG4gICAgICA+PC9hcHAtY29uZmlybS1leGl0LW1vZGFsPlxuXG4gICAgICA8YXBwLWNvbmZpcm0taGVyZS1tb2RhbFxuICAgICAgICBbYmFja2dyb3VuZENvbG9yXT1cIidyZ2JhKDE4MSwgMjMzLCAyMjksIDAuOTcpJ1wiXG4gICAgICAgIFtpc0NvbmZpcm1IZXJlTW9kYWxWaXNpYmxlXT1cImlzQ29uZmlybUhlcmVNb2RhbFZpc2libGUudmFsdWVcIlxuICAgICAgICBbb25Db25maXJtSGVyZUNsb3NlXT1cIm9uQ29uZmlybUhlcmVDbG9zZVwiXG4gICAgICAgIFttZW1iZXJdPVwibWVtYmVyLnZhbHVlXCJcbiAgICAgICAgW3Jvb21OYW1lXT1cInJvb21OYW1lLnZhbHVlXCJcbiAgICAgICAgW3NvY2tldF09XCJzb2NrZXQudmFsdWVcIlxuICAgICAgPjwvYXBwLWNvbmZpcm0taGVyZS1tb2RhbD5cblxuICAgICAgPGFwcC1zaGFyZS1ldmVudC1tb2RhbFxuICAgICAgICBbaXNTaGFyZUV2ZW50TW9kYWxWaXNpYmxlXT1cImlzU2hhcmVFdmVudE1vZGFsVmlzaWJsZS52YWx1ZVwiXG4gICAgICAgIFtvblNoYXJlRXZlbnRDbG9zZV09XCJvblNoYXJlRXZlbnRDbG9zZVwiXG4gICAgICAgIFtyb29tTmFtZV09XCJyb29tTmFtZS52YWx1ZVwiXG4gICAgICAgIFtpc2xldmVsXT1cImlzbGV2ZWwudmFsdWVcIlxuICAgICAgICBbYWRtaW5QYXNzY29kZV09XCJhZG1pblBhc3Njb2RlLnZhbHVlXCJcbiAgICAgICAgW2V2ZW50VHlwZV09XCJldmVudFR5cGUudmFsdWVcIlxuICAgICAgPjwvYXBwLXNoYXJlLWV2ZW50LW1vZGFsPlxuXG4gICAgICA8YXBwLWFsZXJ0LWNvbXBvbmVudFxuICAgICAgICBbdmlzaWJsZV09XCJhbGVydFZpc2libGUudmFsdWVcIlxuICAgICAgICBbbWVzc2FnZV09XCJhbGVydE1lc3NhZ2UudmFsdWVcIlxuICAgICAgICBbdHlwZV09XCJhbGVydFR5cGUudmFsdWVcIlxuICAgICAgICBbZHVyYXRpb25dPVwiYWxlcnREdXJhdGlvbi52YWx1ZVwiXG4gICAgICAgIFtvbkhpZGVdPVwib25BbGVydEhpZGVcIlxuICAgICAgICB0ZXh0Q29sb3I9XCIjZmZmZmZmXCJcbiAgICAgID48L2FwcC1hbGVydC1jb21wb25lbnQ+XG5cbiAgICAgIDxhcHAtbG9hZGluZy1tb2RhbFxuICAgICAgICBbaXNWaXNpYmxlXT1cImlzTG9hZGluZ01vZGFsVmlzaWJsZS52YWx1ZVwiXG4gICAgICAgIFtiYWNrZ3JvdW5kQ29sb3JdPVwiJ3JnYmEoMjE3LCAyMjcsIDIzNCwgMC45OSknXCJcbiAgICAgICAgZGlzcGxheUNvbG9yPVwiYmxhY2tcIlxuICAgICAgPjwvYXBwLWxvYWRpbmctbW9kYWw+XG4gICAgPC9kaXY+XG4gIGAsXG4gIHN0eWxlczogW1xuICAgIGBcbiAgICAgIC5NZWRpYVNGVSB7XG4gICAgICAgIC8qIEFkZCBhbnkgY29tcG9uZW50LXNwZWNpZmljIHN0eWxlcyBoZXJlICovXG4gICAgICB9XG4gICAgYCxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbQ29va2llU2VydmljZV0sXG59KVxuZXhwb3J0IGNsYXNzIE1lZGlhc2Z1QnJvYWRjYXN0IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKVxuICBQcmVqb2luUGFnZTogYW55ID0gV2VsY29tZVBhZ2U7XG4gIEBJbnB1dCgpIGNyZWRlbnRpYWxzOiB7IGFwaVVzZXJOYW1lOiBzdHJpbmc7IGFwaUtleTogc3RyaW5nIH0gPSB7IGFwaVVzZXJOYW1lOiAnJywgYXBpS2V5OiAnJyB9O1xuICBASW5wdXQoKSB1c2VMb2NhbFVJTW9kZSA9IGZhbHNlO1xuICBASW5wdXQoKSBzZWVkRGF0YT86IFNlZWREYXRhO1xuICBASW5wdXQoKSB1c2VTZWVkID0gZmFsc2U7XG4gIEBJbnB1dCgpIGltZ1NyYyA9ICdodHRwczovL21lZGlhc2Z1LmNvbS9pbWFnZXMvbG9nbzE5Mi5wbmcnO1xuXG4gIHRpdGxlID0gJ01lZGlhU0ZVLUJyb2FkY2FzdCc7XG5cbiAgcHJpdmF0ZSBtYWluSGVpZ2h0V2lkdGhTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiB8IHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSB2YWxpZGF0ZWRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiB8IHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSBpc2xldmVsU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gfCB1bmRlZmluZWQ7XG4gIHByaXZhdGUgY29Ib3N0U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gfCB1bmRlZmluZWQ7XG4gIHByaXZhdGUgYnV0dG9uU3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcbiAgcHJpdmF0ZSBTY3JlZW5ib2FyZFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uIHwgdW5kZWZpbmVkO1xuICBwcml2YXRlIHJlY29yZGluZ1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uIHwgdW5kZWZpbmVkO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvcixcbiAgICBwdWJsaWMgdXBkYXRlTWluaUNhcmRzR3JpZDogVXBkYXRlTWluaUNhcmRzR3JpZCxcbiAgICBwdWJsaWMgbWl4U3RyZWFtczogTWl4U3RyZWFtcyxcbiAgICBwdWJsaWMgZGlzcFN0cmVhbXM6IERpc3BTdHJlYW1zLFxuICAgIHB1YmxpYyBzdG9wU2hhcmVTY3JlZW46IFN0b3BTaGFyZVNjcmVlbixcbiAgICBwdWJsaWMgY2hlY2tTY3JlZW5TaGFyZTogQ2hlY2tTY3JlZW5TaGFyZSxcbiAgICBwdWJsaWMgc3RhcnRTaGFyZVNjcmVlbjogU3RhcnRTaGFyZVNjcmVlbixcbiAgICBwdWJsaWMgcmVxdWVzdFNjcmVlblNoYXJlOiBSZXF1ZXN0U2NyZWVuU2hhcmUsXG4gICAgcHVibGljIHJlb3JkZXJTdHJlYW1zOiBSZW9yZGVyU3RyZWFtcyxcbiAgICBwdWJsaWMgcHJlcG9wdWxhdGVVc2VyTWVkaWE6IFByZXBvcHVsYXRlVXNlck1lZGlhLFxuICAgIHB1YmxpYyBnZXRWaWRlb3M6IEdldFZpZGVvcyxcbiAgICBwdWJsaWMgcmVQb3J0OiBSZVBvcnQsXG4gICAgcHVibGljIHRyaWdnZXI6IFRyaWdnZXIsXG4gICAgcHVibGljIGNvbnN1bWVyUmVzdW1lOiBDb25zdW1lclJlc3VtZSxcbiAgICBwdWJsaWMgY29ubmVjdFNlbmRUcmFuc3BvcnQ6IENvbm5lY3RTZW5kVHJhbnNwb3J0LFxuICAgIHB1YmxpYyBjb25uZWN0U2VuZFRyYW5zcG9ydEF1ZGlvOiBDb25uZWN0U2VuZFRyYW5zcG9ydEF1ZGlvLFxuICAgIHB1YmxpYyBjb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvOiBDb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvLFxuICAgIHB1YmxpYyBjb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlbjogQ29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW4sXG4gICAgcHVibGljIHByb2Nlc3NDb25zdW1lclRyYW5zcG9ydHM6IFByb2Nlc3NDb25zdW1lclRyYW5zcG9ydHMsXG4gICAgcHVibGljIHJlc3VtZVBhdXNlU3RyZWFtczogUmVzdW1lUGF1c2VTdHJlYW1zLFxuICAgIHB1YmxpYyByZWFkanVzdDogUmVhZGp1c3QsXG4gICAgcHVibGljIGNoZWNrR3JpZDogQ2hlY2tHcmlkLFxuICAgIHB1YmxpYyBnZXRFc3RpbWF0ZTogR2V0RXN0aW1hdGUsXG4gICAgcHVibGljIGNhbGN1bGF0ZVJvd3NBbmRDb2x1bW5zOiBDYWxjdWxhdGVSb3dzQW5kQ29sdW1ucyxcbiAgICBwdWJsaWMgYWRkVmlkZW9zR3JpZDogQWRkVmlkZW9zR3JpZCxcbiAgICBwdWJsaWMgb25TY3JlZW5DaGFuZ2VzOiBPblNjcmVlbkNoYW5nZXMsXG4gICAgcHVibGljIGNoYW5nZVZpZHM6IENoYW5nZVZpZHMsXG4gICAgcHVibGljIGNvbXBhcmVBY3RpdmVOYW1lczogQ29tcGFyZUFjdGl2ZU5hbWVzLFxuICAgIHB1YmxpYyBjb21wYXJlU2NyZWVuU3RhdGVzOiBDb21wYXJlU2NyZWVuU3RhdGVzLFxuICAgIHB1YmxpYyBjcmVhdGVTZW5kVHJhbnNwb3J0OiBDcmVhdGVTZW5kVHJhbnNwb3J0LFxuICAgIHB1YmxpYyByZXN1bWVTZW5kVHJhbnNwb3J0QXVkaW86IFJlc3VtZVNlbmRUcmFuc3BvcnRBdWRpbyxcbiAgICBwdWJsaWMgcmVjZWl2ZUFsbFBpcGVkVHJhbnNwb3J0czogUmVjZWl2ZUFsbFBpcGVkVHJhbnNwb3J0cyxcbiAgICBwdWJsaWMgZGlzY29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlbzogRGlzY29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlbyxcbiAgICBwdWJsaWMgZGlzY29ubmVjdFNlbmRUcmFuc3BvcnRBdWRpbzogRGlzY29ubmVjdFNlbmRUcmFuc3BvcnRBdWRpbyxcbiAgICBwdWJsaWMgZGlzY29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW46IERpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuLFxuICAgIHB1YmxpYyBnZXRQaXBlZFByb2R1Y2Vyc0FsdDogR2V0UGlwZWRQcm9kdWNlcnNBbHQsXG4gICAgcHVibGljIHNpZ25hbE5ld0NvbnN1bWVyVHJhbnNwb3J0OiBTaWduYWxOZXdDb25zdW1lclRyYW5zcG9ydCxcbiAgICBwdWJsaWMgY29ubmVjdFJlY3ZUcmFuc3BvcnQ6IENvbm5lY3RSZWN2VHJhbnNwb3J0LFxuICAgIHB1YmxpYyByZVVwZGF0ZUludGVyOiBSZVVwZGF0ZUludGVyLFxuICAgIHB1YmxpYyB1cGRhdGVQYXJ0aWNpcGFudEF1ZGlvRGVjaWJlbHM6IFVwZGF0ZVBhcnRpY2lwYW50QXVkaW9EZWNpYmVscyxcbiAgICBwdWJsaWMgY2xvc2VBbmRSZXNpemU6IENsb3NlQW5kUmVzaXplLFxuICAgIHB1YmxpYyBhdXRvQWRqdXN0OiBBdXRvQWRqdXN0LFxuICAgIHB1YmxpYyBzd2l0Y2hVc2VyVmlkZW9BbHQ6IFN3aXRjaFVzZXJWaWRlb0FsdCxcbiAgICBwdWJsaWMgc3dpdGNoVXNlclZpZGVvOiBTd2l0Y2hVc2VyVmlkZW8sXG4gICAgcHVibGljIHN3aXRjaFVzZXJBdWRpbzogU3dpdGNoVXNlckF1ZGlvLFxuICAgIHB1YmxpYyBnZXREb21haW5zOiBHZXREb21haW5zLFxuICAgIHB1YmxpYyBmb3JtYXROdW1iZXI6IEZvcm1hdE51bWJlcixcbiAgICBwdWJsaWMgY29ubmVjdElwczogQ29ubmVjdElwcyxcbiAgICBwdWJsaWMgY3JlYXRlRGV2aWNlQ2xpZW50OiBDcmVhdGVEZXZpY2VDbGllbnQsXG4gICAgcHVibGljIGNhcHR1cmVDYW52YXNTdHJlYW06IENhcHR1cmVDYW52YXNTdHJlYW0sXG4gICAgcHVibGljIHJlc3VtZVBhdXNlQXVkaW9TdHJlYW1zOiBSZXN1bWVQYXVzZUF1ZGlvU3RyZWFtcyxcbiAgICBwdWJsaWMgcHJvY2Vzc0NvbnN1bWVyVHJhbnNwb3J0c0F1ZGlvOiBQcm9jZXNzQ29uc3VtZXJUcmFuc3BvcnRzQXVkaW8sXG5cbiAgICBwdWJsaWMgbGF1bmNoUmVjb3JkaW5nOiBMYXVuY2hSZWNvcmRpbmcsXG4gICAgcHVibGljIHN0YXJ0UmVjb3JkaW5nOiBTdGFydFJlY29yZGluZyxcbiAgICBwdWJsaWMgY29uZmlybVJlY29yZGluZzogQ29uZmlybVJlY29yZGluZyxcbiAgICBwdWJsaWMgbGF1bmNoUGFydGljaXBhbnRzOiBMYXVuY2hQYXJ0aWNpcGFudHMsXG4gICAgcHVibGljIGxhdW5jaE1lc3NhZ2VzOiBMYXVuY2hNZXNzYWdlcyxcbiAgICBwdWJsaWMgbGF1bmNoQ29uZmlybUV4aXQ6IExhdW5jaENvbmZpcm1FeGl0LFxuXG4gICAgcHVibGljIHN0YXJ0TWVldGluZ1Byb2dyZXNzVGltZXI6IFN0YXJ0TWVldGluZ1Byb2dyZXNzVGltZXIsXG4gICAgcHVibGljIHVwZGF0ZVJlY29yZGluZzogVXBkYXRlUmVjb3JkaW5nLFxuICAgIHB1YmxpYyBzdG9wUmVjb3JkaW5nOiBTdG9wUmVjb3JkaW5nLFxuXG4gICAgcHVibGljIHBlcnNvbkpvaW5lZDogUGVyc29uSm9pbmVkLFxuXG4gICAgcHVibGljIHJvb21SZWNvcmRQYXJhbXM6IFJvb21SZWNvcmRQYXJhbXMsXG4gICAgcHVibGljIGJhblBhcnRpY2lwYW50OiBCYW5QYXJ0aWNpcGFudCxcblxuICAgIHB1YmxpYyBwcm9kdWNlck1lZGlhUGF1c2VkOiBQcm9kdWNlck1lZGlhUGF1c2VkLFxuICAgIHB1YmxpYyBwcm9kdWNlck1lZGlhUmVzdW1lZDogUHJvZHVjZXJNZWRpYVJlc3VtZWQsXG4gICAgcHVibGljIHByb2R1Y2VyTWVkaWFDbG9zZWQ6IFByb2R1Y2VyTWVkaWFDbG9zZWQsXG5cbiAgICBwdWJsaWMgbWVldGluZ0VuZGVkOiBNZWV0aW5nRW5kZWQsXG4gICAgcHVibGljIGRpc2Nvbm5lY3RVc2VyU2VsZjogRGlzY29ubmVjdFVzZXJTZWxmLFxuICAgIHB1YmxpYyByZWNlaXZlTWVzc2FnZTogUmVjZWl2ZU1lc3NhZ2UsXG4gICAgcHVibGljIG1lZXRpbmdUaW1lUmVtYWluaW5nOiBNZWV0aW5nVGltZVJlbWFpbmluZyxcbiAgICBwdWJsaWMgbWVldGluZ1N0aWxsVGhlcmU6IE1lZXRpbmdTdGlsbFRoZXJlLFxuICAgIHB1YmxpYyBzdGFydFJlY29yZHM6IFN0YXJ0UmVjb3JkcyxcbiAgICBwdWJsaWMgcmVJbml0aWF0ZVJlY29yZGluZzogUmVJbml0aWF0ZVJlY29yZGluZyxcbiAgICBwdWJsaWMgcmVjb3JkaW5nTm90aWNlOiBSZWNvcmRpbmdOb3RpY2UsXG4gICAgcHVibGljIHRpbWVMZWZ0UmVjb3JkaW5nOiBUaW1lTGVmdFJlY29yZGluZyxcbiAgICBwdWJsaWMgc3RvcHBlZFJlY29yZGluZzogU3RvcHBlZFJlY29yZGluZyxcblxuICAgIHB1YmxpYyBhbGxNZW1iZXJzOiBBbGxNZW1iZXJzLFxuICAgIHB1YmxpYyBhbGxNZW1iZXJzUmVzdDogQWxsTWVtYmVyc1Jlc3QsXG4gICAgcHVibGljIGRpc2Nvbm5lY3Q6IERpc2Nvbm5lY3QsXG5cbiAgICBwdWJsaWMgc29ja2V0TWFuYWdlcjogU29ja2V0TWFuYWdlcixcbiAgICBwdWJsaWMgam9pblJvb21DbGllbnQ6IEpvaW5Sb29tQ2xpZW50LFxuICAgIHB1YmxpYyB1cGRhdGVSb29tUGFyYW1ldGVyc0NsaWVudDogVXBkYXRlUm9vbVBhcmFtZXRlcnNDbGllbnQsXG4gICAgcHVibGljIGNsaWNrVmlkZW86IENsaWNrVmlkZW8sXG4gICAgcHVibGljIGNsaWNrQXVkaW86IENsaWNrQXVkaW8sXG4gICAgcHVibGljIGNsaWNrU2NyZWVuU2hhcmU6IENsaWNrU2NyZWVuU2hhcmUsXG4gICAgcHVibGljIHN3aXRjaFZpZGVvQWx0OiBTd2l0Y2hWaWRlb0FsdCxcbiAgICBwdWJsaWMgc3RyZWFtU3VjY2Vzc1ZpZGVvOiBTdHJlYW1TdWNjZXNzVmlkZW8sXG4gICAgcHVibGljIHN0cmVhbVN1Y2Nlc3NBdWRpbzogU3RyZWFtU3VjY2Vzc0F1ZGlvLFxuICAgIHB1YmxpYyBzdHJlYW1TdWNjZXNzU2NyZWVuOiBTdHJlYW1TdWNjZXNzU2NyZWVuLFxuICAgIHB1YmxpYyBzdHJlYW1TdWNjZXNzQXVkaW9Td2l0Y2g6IFN0cmVhbVN1Y2Nlc3NBdWRpb1N3aXRjaCxcbiAgICBwdWJsaWMgY2hlY2tQZXJtaXNzaW9uOiBDaGVja1Blcm1pc3Npb24sXG5cbiAgICBwdWJsaWMgdXBkYXRlQ29uc3VtaW5nRG9tYWluczogVXBkYXRlQ29uc3VtaW5nRG9tYWlucyxcbiAgICBwdWJsaWMgcmVjZWl2ZVJvb21NZXNzYWdlczogUmVjZWl2ZVJvb21NZXNzYWdlcyxcbiAgKSB7fVxuXG4gIGNyZWF0ZUluamVjdG9yKGlucHV0czogYW55KSB7XG4gICAgY29uc3QgaW5qID0gSW5qZWN0b3IuY3JlYXRlKHtcbiAgICAgIHByb3ZpZGVyczogT2JqZWN0LmtleXMoaW5wdXRzKS5tYXAoKGtleSkgPT4gKHsgcHJvdmlkZToga2V5LCB1c2VWYWx1ZTogaW5wdXRzW2tleV0gfSkpLFxuICAgICAgcGFyZW50OiB0aGlzLmluamVjdG9yLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGluajtcbiAgfVxuXG4gIC8vIEluaXRpYWwgdmFsdWVzXG4gIG1lZGlhU0ZVRnVuY3Rpb25zID0gKCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGVNaW5pQ2FyZHNHcmlkOlxuICAgICAgICB0aGlzLnVwZGF0ZU1pbmlDYXJkc0dyaWQ/LnVwZGF0ZU1pbmlDYXJkc0dyaWQgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIG1peFN0cmVhbXM6XG4gICAgICAgIHRoaXMubWl4U3RyZWFtcz8ubWl4U3RyZWFtcyB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgZGlzcFN0cmVhbXM6XG4gICAgICAgIHRoaXMuZGlzcFN0cmVhbXM/LmRpc3BTdHJlYW1zIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBzdG9wU2hhcmVTY3JlZW46XG4gICAgICAgIHRoaXMuc3RvcFNoYXJlU2NyZWVuPy5zdG9wU2hhcmVTY3JlZW4gfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGNoZWNrU2NyZWVuU2hhcmU6XG4gICAgICAgIHRoaXMuY2hlY2tTY3JlZW5TaGFyZT8uY2hlY2tTY3JlZW5TaGFyZSB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgc3RhcnRTaGFyZVNjcmVlbjpcbiAgICAgICAgdGhpcy5zdGFydFNoYXJlU2NyZWVuPy5zdGFydFNoYXJlU2NyZWVuIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICByZXF1ZXN0U2NyZWVuU2hhcmU6XG4gICAgICAgIHRoaXMucmVxdWVzdFNjcmVlblNoYXJlPy5yZXF1ZXN0U2NyZWVuU2hhcmUgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIHJlb3JkZXJTdHJlYW1zOlxuICAgICAgICB0aGlzLnJlb3JkZXJTdHJlYW1zPy5yZW9yZGVyU3RyZWFtcyB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgcHJlcG9wdWxhdGVVc2VyTWVkaWE6XG4gICAgICAgIHRoaXMucHJlcG9wdWxhdGVVc2VyTWVkaWE/LnByZXBvcHVsYXRlVXNlck1lZGlhIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBnZXRWaWRlb3M6XG4gICAgICAgIHRoaXMuZ2V0VmlkZW9zPy5nZXRWaWRlb3MgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIHJlUG9ydDpcbiAgICAgICAgdGhpcy5yZVBvcnQ/LnJlUG9ydCB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgdHJpZ2dlcjpcbiAgICAgICAgdGhpcy50cmlnZ2VyPy50cmlnZ2VyIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBjb25zdW1lclJlc3VtZTpcbiAgICAgICAgdGhpcy5jb25zdW1lclJlc3VtZT8uY29uc3VtZXJSZXN1bWUgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGNvbm5lY3RTZW5kVHJhbnNwb3J0OlxuICAgICAgICB0aGlzLmNvbm5lY3RTZW5kVHJhbnNwb3J0Py5jb25uZWN0U2VuZFRyYW5zcG9ydCB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgY29ubmVjdFNlbmRUcmFuc3BvcnRBdWRpbzpcbiAgICAgICAgdGhpcy5jb25uZWN0U2VuZFRyYW5zcG9ydEF1ZGlvPy5jb25uZWN0U2VuZFRyYW5zcG9ydEF1ZGlvIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBjb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvOlxuICAgICAgICB0aGlzLmNvbm5lY3RTZW5kVHJhbnNwb3J0VmlkZW8/LmNvbm5lY3RTZW5kVHJhbnNwb3J0VmlkZW8gfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGNvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuOlxuICAgICAgICB0aGlzLmNvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuPy5jb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlbiB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgcHJvY2Vzc0NvbnN1bWVyVHJhbnNwb3J0czpcbiAgICAgICAgdGhpcy5wcm9jZXNzQ29uc3VtZXJUcmFuc3BvcnRzPy5wcm9jZXNzQ29uc3VtZXJUcmFuc3BvcnRzIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICByZXN1bWVQYXVzZVN0cmVhbXM6XG4gICAgICAgIHRoaXMucmVzdW1lUGF1c2VTdHJlYW1zPy5yZXN1bWVQYXVzZVN0cmVhbXMgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIHJlYWRqdXN0OlxuICAgICAgICB0aGlzLnJlYWRqdXN0Py5yZWFkanVzdCB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgY2hlY2tHcmlkOlxuICAgICAgICB0aGlzLmNoZWNrR3JpZD8uY2hlY2tHcmlkIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBnZXRFc3RpbWF0ZTpcbiAgICAgICAgdGhpcy5nZXRFc3RpbWF0ZT8uZ2V0RXN0aW1hdGUgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGNhbGN1bGF0ZVJvd3NBbmRDb2x1bW5zOlxuICAgICAgICB0aGlzLmNhbGN1bGF0ZVJvd3NBbmRDb2x1bW5zPy5jYWxjdWxhdGVSb3dzQW5kQ29sdW1ucyB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgYWRkVmlkZW9zR3JpZDpcbiAgICAgICAgdGhpcy5hZGRWaWRlb3NHcmlkPy5hZGRWaWRlb3NHcmlkIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBvblNjcmVlbkNoYW5nZXM6XG4gICAgICAgIHRoaXMub25TY3JlZW5DaGFuZ2VzPy5vblNjcmVlbkNoYW5nZXMgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIHNsZWVwOlxuICAgICAgICBzbGVlcCB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgY2hhbmdlVmlkczpcbiAgICAgICAgdGhpcy5jaGFuZ2VWaWRzPy5jaGFuZ2VWaWRzIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBjb21wYXJlQWN0aXZlTmFtZXM6XG4gICAgICAgIHRoaXMuY29tcGFyZUFjdGl2ZU5hbWVzPy5jb21wYXJlQWN0aXZlTmFtZXMgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGNvbXBhcmVTY3JlZW5TdGF0ZXM6XG4gICAgICAgIHRoaXMuY29tcGFyZVNjcmVlblN0YXRlcz8uY29tcGFyZVNjcmVlblN0YXRlcyB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgY3JlYXRlU2VuZFRyYW5zcG9ydDpcbiAgICAgICAgdGhpcy5jcmVhdGVTZW5kVHJhbnNwb3J0Py5jcmVhdGVTZW5kVHJhbnNwb3J0IHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICByZXN1bWVTZW5kVHJhbnNwb3J0QXVkaW86XG4gICAgICAgIHRoaXMucmVzdW1lU2VuZFRyYW5zcG9ydEF1ZGlvPy5yZXN1bWVTZW5kVHJhbnNwb3J0QXVkaW8gfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIHJlY2VpdmVBbGxQaXBlZFRyYW5zcG9ydHM6XG4gICAgICAgIHRoaXMucmVjZWl2ZUFsbFBpcGVkVHJhbnNwb3J0cz8ucmVjZWl2ZUFsbFBpcGVkVHJhbnNwb3J0cyB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgZGlzY29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlbzpcbiAgICAgICAgdGhpcy5kaXNjb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvPy5kaXNjb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBkaXNjb25uZWN0U2VuZFRyYW5zcG9ydEF1ZGlvOlxuICAgICAgICB0aGlzLmRpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW8/LmRpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW8gfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGRpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuOlxuICAgICAgICB0aGlzLmRpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuPy5kaXNjb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlbiB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgZ2V0UGlwZWRQcm9kdWNlcnNBbHQ6XG4gICAgICAgIHRoaXMuZ2V0UGlwZWRQcm9kdWNlcnNBbHQ/LmdldFBpcGVkUHJvZHVjZXJzQWx0IHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBzaWduYWxOZXdDb25zdW1lclRyYW5zcG9ydDpcbiAgICAgICAgdGhpcy5zaWduYWxOZXdDb25zdW1lclRyYW5zcG9ydD8uc2lnbmFsTmV3Q29uc3VtZXJUcmFuc3BvcnQgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGNvbm5lY3RSZWN2VHJhbnNwb3J0OlxuICAgICAgICB0aGlzLmNvbm5lY3RSZWN2VHJhbnNwb3J0Py5jb25uZWN0UmVjdlRyYW5zcG9ydCB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgcmVVcGRhdGVJbnRlcjpcbiAgICAgICAgdGhpcy5yZVVwZGF0ZUludGVyPy5yZVVwZGF0ZUludGVyIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICB1cGRhdGVQYXJ0aWNpcGFudEF1ZGlvRGVjaWJlbHM6XG4gICAgICAgIHRoaXMudXBkYXRlUGFydGljaXBhbnRBdWRpb0RlY2liZWxzPy51cGRhdGVQYXJ0aWNpcGFudEF1ZGlvRGVjaWJlbHMgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGNsb3NlQW5kUmVzaXplOlxuICAgICAgICB0aGlzLmNsb3NlQW5kUmVzaXplPy5jbG9zZUFuZFJlc2l6ZSB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgYXV0b0FkanVzdDpcbiAgICAgICAgdGhpcy5hdXRvQWRqdXN0Py5hdXRvQWRqdXN0IHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBzd2l0Y2hVc2VyVmlkZW9BbHQ6XG4gICAgICAgIHRoaXMuc3dpdGNoVXNlclZpZGVvQWx0Py5zd2l0Y2hVc2VyVmlkZW9BbHQgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIHN3aXRjaFVzZXJWaWRlbzpcbiAgICAgICAgdGhpcy5zd2l0Y2hVc2VyVmlkZW8/LnN3aXRjaFVzZXJWaWRlbyB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgc3dpdGNoVXNlckF1ZGlvOlxuICAgICAgICB0aGlzLnN3aXRjaFVzZXJBdWRpbz8uc3dpdGNoVXNlckF1ZGlvIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBnZXREb21haW5zOlxuICAgICAgICB0aGlzLmdldERvbWFpbnM/LmdldERvbWFpbnMgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGZvcm1hdE51bWJlcjpcbiAgICAgICAgdGhpcy5mb3JtYXROdW1iZXI/LmZvcm1hdE51bWJlciB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgY29ubmVjdElwczpcbiAgICAgICAgdGhpcy5jb25uZWN0SXBzPy5jb25uZWN0SXBzIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBjcmVhdGVEZXZpY2VDbGllbnQ6XG4gICAgICAgIHRoaXMuY3JlYXRlRGV2aWNlQ2xpZW50Py5jcmVhdGVEZXZpY2VDbGllbnQgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGNhcHR1cmVDYW52YXNTdHJlYW06XG4gICAgICAgIHRoaXMuY2FwdHVyZUNhbnZhc1N0cmVhbT8uY2FwdHVyZUNhbnZhc1N0cmVhbSB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgcmVzdW1lUGF1c2VBdWRpb1N0cmVhbXM6XG4gICAgICAgIHRoaXMucmVzdW1lUGF1c2VBdWRpb1N0cmVhbXM/LnJlc3VtZVBhdXNlQXVkaW9TdHJlYW1zIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBwcm9jZXNzQ29uc3VtZXJUcmFuc3BvcnRzQXVkaW86XG4gICAgICAgIHRoaXMucHJvY2Vzc0NvbnN1bWVyVHJhbnNwb3J0c0F1ZGlvPy5wcm9jZXNzQ29uc3VtZXJUcmFuc3BvcnRzQXVkaW8gfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGNoZWNrUGVybWlzc2lvbjpcbiAgICAgICAgdGhpcy5jaGVja1Blcm1pc3Npb24/LmNoZWNrUGVybWlzc2lvbiB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgc3RyZWFtU3VjY2Vzc1ZpZGVvOlxuICAgICAgICB0aGlzLnN0cmVhbVN1Y2Nlc3NWaWRlbz8uc3RyZWFtU3VjY2Vzc1ZpZGVvIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBzdHJlYW1TdWNjZXNzQXVkaW86XG4gICAgICAgIHRoaXMuc3RyZWFtU3VjY2Vzc0F1ZGlvPy5zdHJlYW1TdWNjZXNzQXVkaW8gfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIHN0cmVhbVN1Y2Nlc3NTY3JlZW46XG4gICAgICAgIHRoaXMuc3RyZWFtU3VjY2Vzc1NjcmVlbj8uc3RyZWFtU3VjY2Vzc1NjcmVlbiB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgc3RyZWFtU3VjY2Vzc0F1ZGlvU3dpdGNoOlxuICAgICAgICB0aGlzLnN0cmVhbVN1Y2Nlc3NBdWRpb1N3aXRjaD8uc3RyZWFtU3VjY2Vzc0F1ZGlvU3dpdGNoIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBjbGlja1ZpZGVvOlxuICAgICAgICB0aGlzLmNsaWNrVmlkZW8/LmNsaWNrVmlkZW8gfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGNsaWNrQXVkaW86XG4gICAgICAgIHRoaXMuY2xpY2tBdWRpbz8uY2xpY2tBdWRpbyB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgY2xpY2tTY3JlZW5TaGFyZTpcbiAgICAgICAgdGhpcy5jbGlja1NjcmVlblNoYXJlPy5jbGlja1NjcmVlblNoYXJlIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBzd2l0Y2hWaWRlb0FsdDpcbiAgICAgICAgdGhpcy5zd2l0Y2hWaWRlb0FsdD8uc3dpdGNoVmlkZW9BbHQgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIHJlcXVlc3RQZXJtaXNzaW9uQ2FtZXJhOlxuICAgICAgICB0aGlzLnJlcXVlc3RQZXJtaXNzaW9uQ2FtZXJhIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICByZXF1ZXN0UGVybWlzc2lvbkF1ZGlvOlxuICAgICAgICB0aGlzLnJlcXVlc3RQZXJtaXNzaW9uQXVkaW8gfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICB9O1xuICB9O1xuXG4gIHZhbGlkYXRlZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBsb2NhbFVJTW9kZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBzb2NrZXQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFNvY2tldD4oe30gYXMgU29ja2V0KTtcbiAgcm9vbURhdGEgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFJlc3BvbnNlSm9pblJvb20gfCBudWxsPihudWxsKTtcbiAgZGV2aWNlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxEZXZpY2UgfCBudWxsPihudWxsKTtcbiAgYXBpS2V5ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcbiAgYXBpVXNlck5hbWUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICBhcGlUb2tlbiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gIGxpbmsgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuXG4gIHJvb21OYW1lID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcbiAgbWVtYmVyID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcbiAgYWRtaW5QYXNzY29kZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gIGlzbGV2ZWwgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJzEnKTtcbiAgY29Ib3N0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCdObyBjb0hvc3QnKTtcbiAgY29Ib3N0UmVzcG9uc2liaWxpdHkgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PENvSG9zdFJlc3BvbnNpYmlsaXR5W10+KFtcbiAgICB7IG5hbWU6ICdwYXJ0aWNpcGFudHMnLCB2YWx1ZTogZmFsc2UsIGRlZGljYXRlZDogZmFsc2UgfSxcbiAgICB7IG5hbWU6ICdtZWRpYScsIHZhbHVlOiBmYWxzZSwgZGVkaWNhdGVkOiBmYWxzZSB9LFxuICAgIHsgbmFtZTogJ3dhaXRpbmcnLCB2YWx1ZTogZmFsc2UsIGRlZGljYXRlZDogZmFsc2UgfSxcbiAgICB7IG5hbWU6ICdjaGF0JywgdmFsdWU6IGZhbHNlLCBkZWRpY2F0ZWQ6IGZhbHNlIH0sXG4gIF0pO1xuICB5b3VBcmVDb0hvc3QgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgeW91QXJlSG9zdCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBjb25maXJtZWRUb1JlY29yZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBtZWV0aW5nRGlzcGxheVR5cGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJ21lZGlhJyk7XG4gIG1lZXRpbmdWaWRlb09wdGltaXplZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBldmVudFR5cGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEV2ZW50VHlwZT4oJ2Jyb2FkY2FzdCcpO1xuICBwYXJ0aWNpcGFudHMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFBhcnRpY2lwYW50W10+KFtdKTtcbiAgZmlsdGVyZWRQYXJ0aWNpcGFudHMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFBhcnRpY2lwYW50W10+KFtdKTtcbiAgcGFydGljaXBhbnRzQ291bnRlciA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgcGFydGljaXBhbnRzRmlsdGVyID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcblxuICBjb25zdW1lX3NvY2tldHMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PENvbnN1bWVTb2NrZXRbXT4oW10pO1xuICBydHBDYXBhYmlsaXRpZXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFJ0cENhcGFiaWxpdGllcyB8IG51bGw+KG51bGwpO1xuICByb29tUmVjdklQcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nW10+KFtdKTtcbiAgbWVldGluZ1Jvb21QYXJhbXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE1lZXRpbmdSb29tUGFyYW1zIHwgbnVsbD4obnVsbCk7XG4gIGl0ZW1QYWdlTGltaXQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oNCk7XG4gIGF1ZGlvT25seVJvb20gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgYWRkRm9yQmFzaWMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgc2NyZWVuUGFnZUxpbWl0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDQpO1xuICBzaGFyZVNjcmVlblN0YXJ0ZWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgc2hhcmVkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHRhcmdldE9yaWVudGF0aW9uID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCdsYW5kc2NhcGUnKTtcbiAgdGFyZ2V0UmVzb2x1dGlvbiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignc2QnKTtcbiAgdGFyZ2V0UmVzb2x1dGlvbkhvc3QgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJ3NkJyk7XG4gIHZpZENvbnMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFZpZENvbnM+KHsgd2lkdGg6IDY0MCwgaGVpZ2h0OiAzNjAgfSk7XG4gIGZyYW1lUmF0ZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigxMCk7XG4gIGhQYXJhbXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEhQYXJhbXNUeXBlPih7fSBhcyBIUGFyYW1zVHlwZSk7XG4gIHZQYXJhbXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFZQYXJhbXNUeXBlPih7fSBhcyBWUGFyYW1zVHlwZSk7XG4gIHNjcmVlblBhcmFtcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8U2NyZWVuUGFyYW1zVHlwZT4oe30gYXMgU2NyZWVuUGFyYW1zVHlwZSk7XG4gIGFQYXJhbXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEFQYXJhbXNUeXBlPih7fSBhcyBBUGFyYW1zVHlwZSk7XG5cbiAgcmVjb3JkaW5nQXVkaW9QYXVzZXNMaW1pdCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgcmVjb3JkaW5nQXVkaW9QYXVzZXNDb3VudCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgcmVjb3JkaW5nQXVkaW9TdXBwb3J0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHJlY29yZGluZ0F1ZGlvUGVvcGxlTGltaXQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG4gIHJlY29yZGluZ0F1ZGlvUGFydGljaXBhbnRzVGltZUxpbWl0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICByZWNvcmRpbmdWaWRlb1BhdXNlc0NvdW50ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICByZWNvcmRpbmdWaWRlb1BhdXNlc0xpbWl0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICByZWNvcmRpbmdWaWRlb1N1cHBvcnQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgcmVjb3JkaW5nVmlkZW9QZW9wbGVMaW1pdCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgcmVjb3JkaW5nVmlkZW9QYXJ0aWNpcGFudHNUaW1lTGltaXQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG4gIHJlY29yZGluZ0FsbFBhcnRpY2lwYW50c1N1cHBvcnQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgcmVjb3JkaW5nVmlkZW9QYXJ0aWNpcGFudHNTdXBwb3J0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHJlY29yZGluZ0FsbFBhcnRpY2lwYW50c0Z1bGxSb29tU3VwcG9ydCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICByZWNvcmRpbmdWaWRlb1BhcnRpY2lwYW50c0Z1bGxSb29tU3VwcG9ydCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICByZWNvcmRpbmdQcmVmZXJyZWRPcmllbnRhdGlvbiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignbGFuZHNjYXBlJyk7XG4gIHJlY29yZGluZ1N1cHBvcnRGb3JPdGhlck9yaWVudGF0aW9uID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHJlY29yZGluZ011bHRpRm9ybWF0c1N1cHBvcnQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcblxuICB1c2VyUmVjb3JkaW5nUGFyYW1zID0gbmV3IEJlaGF2aW9yU3ViamVjdDxVc2VyUmVjb3JkaW5nUGFyYW1zPih7XG4gICAgbWFpblNwZWNzOiB7XG4gICAgICBtZWRpYU9wdGlvbnM6ICd2aWRlbycsIC8vICdhdWRpbycsICd2aWRlbydcbiAgICAgIGF1ZGlvT3B0aW9uczogJ2FsbCcsIC8vICdhbGwnLCAnb25TY3JlZW4nLCAnaG9zdCdcbiAgICAgIHZpZGVvT3B0aW9uczogJ2FsbCcsIC8vICdhbGwnLCAnbWFpblNjcmVlbidcbiAgICAgIHZpZGVvVHlwZTogJ2Z1bGxEaXNwbGF5JywgLy8gJ2FsbCcsICdiZXN0RGlzcGxheScsICdmdWxsRGlzcGxheSdcbiAgICAgIHZpZGVvT3B0aW1pemVkOiBmYWxzZSwgLy8gdHJ1ZSwgZmFsc2VcbiAgICAgIHJlY29yZGluZ0Rpc3BsYXlUeXBlOiAnbWVkaWEnLCAvLyAnbWVkaWEnLCAndmlkZW8nLCAnYWxsJ1xuICAgICAgYWRkSExTOiBmYWxzZSwgLy8gdHJ1ZSwgZmFsc2VcbiAgICB9LFxuICAgIGRpc3BTcGVjczoge1xuICAgICAgbmFtZVRhZ3M6IHRydWUsIC8vIHRydWUsIGZhbHNlXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjMDAwMDAwJywgLy8gJyMwMDAwMDAnLCAnI2ZmZmZmZidcbiAgICAgIG5hbWVUYWdzQ29sb3I6ICcjZmZmZmZmJywgLy8gJyMwMDAwMDAnLCAnI2ZmZmZmZidcbiAgICAgIG9yaWVudGF0aW9uVmlkZW86ICdwb3J0cmFpdCcsIC8vICdsYW5kc2NhcGUnLCAncG9ydHJhaXQnLCAnYWxsJ1xuICAgIH0sXG4gIH0pO1xuXG4gIGNhblJlY29yZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBzdGFydFJlcG9ydCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBlbmRSZXBvcnQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgcmVjb3JkVGltZXJJbnRlcnZhbCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Tm9kZUpTLlRpbWVvdXQgfCBudWxsPihudWxsKTtcbiAgcmVjb3JkU3RhcnRUaW1lID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICByZWNvcmRFbGFwc2VkVGltZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgaXNUaW1lclJ1bm5pbmcgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgY2FuUGF1c2VSZXN1bWUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgcmVjb3JkQ2hhbmdlU2Vjb25kcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigxNTAwMCk7XG4gIHBhdXNlTGltaXQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG4gIHBhdXNlUmVjb3JkQ291bnQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG4gIGNhbkxhdW5jaFJlY29yZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4odHJ1ZSk7XG4gIHN0b3BMYXVuY2hSZWNvcmQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcblxuICBwYXJ0aWNpcGFudHNBbGwgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFBhcnRpY2lwYW50W10+KFtdKTtcblxuICBmaXJzdEFsbCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICB1cGRhdGVNYWluV2luZG93ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGZpcnN0X3JvdW5kID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGxhbmRTY2FwZWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgbG9ja19zY3JlZW4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgc2NyZWVuSWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICBhbGxWaWRlb1N0cmVhbXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PChQYXJ0aWNpcGFudCB8IFN0cmVhbSlbXT4oW10pO1xuICBuZXdMaW1pdGVkU3RyZWFtcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8KFBhcnRpY2lwYW50IHwgU3RyZWFtKVtdPihbXSk7XG4gIG5ld0xpbWl0ZWRTdHJlYW1zSURzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmdbXT4oW10pO1xuICBhY3RpdmVTb3VuZHMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZ1tdPihbXSk7XG4gIHNjcmVlblNoYXJlSURTdHJlYW0gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICBzY3JlZW5TaGFyZU5hbWVTdHJlYW0gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICBhZG1pbklEU3RyZWFtID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcbiAgYWRtaW5OYW1lU3RyZWFtID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcbiAgeW91WW91U3RyZWFtID0gbmV3IEJlaGF2aW9yU3ViamVjdDwoUGFydGljaXBhbnQgfCBTdHJlYW0pW10+KFtdKTtcbiAgeW91WW91U3RyZWFtSURzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmdbXT4oW10pO1xuICBsb2NhbFN0cmVhbSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8TWVkaWFTdHJlYW0gfCBudWxsPihudWxsKTtcbiAgcmVjb3JkU3RhcnRlZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICByZWNvcmRSZXN1bWVkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHJlY29yZFBhdXNlZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICByZWNvcmRTdG9wcGVkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGFkbWluUmVzdHJpY3RTZXR0aW5nID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHZpZGVvUmVxdWVzdFN0YXRlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmcgfCBudWxsPihudWxsKTtcbiAgdmlkZW9SZXF1ZXN0VGltZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgdmlkZW9BY3Rpb24gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgbG9jYWxTdHJlYW1WaWRlbyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8TWVkaWFTdHJlYW0gfCBudWxsPihudWxsKTtcbiAgdXNlckRlZmF1bHRWaWRlb0lucHV0RGV2aWNlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcbiAgY3VycmVudEZhY2luZ01vZGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJ3VzZXInKTtcbiAgcHJldkZhY2luZ01vZGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJ3VzZXInKTtcbiAgZGVmVmlkZW9JRCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gIGFsbG93ZWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgZGlzcEFjdGl2ZU5hbWVzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmdbXT4oW10pO1xuICBwX2Rpc3BBY3RpdmVOYW1lcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nW10+KFtdKTtcbiAgYWN0aXZlTmFtZXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZ1tdPihbXSk7XG4gIHByZXZBY3RpdmVOYW1lcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nW10+KFtdKTtcbiAgcF9hY3RpdmVOYW1lcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nW10+KFtdKTtcbiAgbWVtYmVyc1JlY2VpdmVkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGRlZmVyU2NyZWVuUmVjZWl2ZWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgaG9zdEZpcnN0U3dpdGNoID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIG1pY0FjdGlvbiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBzY3JlZW5BY3Rpb24gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgY2hhdEFjdGlvbiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBhdWRpb1JlcXVlc3RTdGF0ZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG4gIHNjcmVlblJlcXVlc3RTdGF0ZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG4gIGNoYXRSZXF1ZXN0U3RhdGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZyB8IG51bGw+KG51bGwpO1xuICBhdWRpb1JlcXVlc3RUaW1lID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICBzY3JlZW5SZXF1ZXN0VGltZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgY2hhdFJlcXVlc3RUaW1lID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICB1cGRhdGVSZXF1ZXN0SW50ZXJ2YWxTZWNvbmRzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDI0MCk7XG4gIG9sZFNvdW5kSWRzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmdbXT4oW10pO1xuICBob3N0TGFiZWwgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJ0hvc3QnKTtcbiAgbWFpblNjcmVlbkZpbGxlZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBsb2NhbFN0cmVhbVNjcmVlbiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8TWVkaWFTdHJlYW0gfCBudWxsPihudWxsKTtcbiAgc2NyZWVuQWxyZWFkeU9uID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGNoYXRBbHJlYWR5T24gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgcmVkaXJlY3RVUkwgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICBvbGRBbGxTdHJlYW1zID0gbmV3IEJlaGF2aW9yU3ViamVjdDwoUGFydGljaXBhbnQgfCBTdHJlYW0pW10+KFtdKTtcbiAgYWRtaW5WaWRJRCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gIHN0cmVhbU5hbWVzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxTdHJlYW1bXT4oW10pO1xuICBub25fYWxWaWRlb1N0cmVhbXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFBhcnRpY2lwYW50W10+KFtdKTtcbiAgc29ydEF1ZGlvTG91ZG5lc3MgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgYXVkaW9EZWNpYmVscyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8QXVkaW9EZWNpYmVsc1tdPihbXSk7XG4gIG1peGVkX2FsVmlkZW9TdHJlYW1zID0gbmV3IEJlaGF2aW9yU3ViamVjdDwoUGFydGljaXBhbnQgfCBTdHJlYW0pW10+KFtdKTtcbiAgbm9uX2FsVmlkZW9TdHJlYW1zX211dGVkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxQYXJ0aWNpcGFudFtdPihbXSk7XG4gIHBhZ2luYXRlZFN0cmVhbXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PChQYXJ0aWNpcGFudCB8IFN0cmVhbSlbXVtdPihbXSk7XG4gIGxvY2FsU3RyZWFtQXVkaW8gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE1lZGlhU3RyZWFtIHwgbnVsbD4obnVsbCk7XG4gIGRlZkF1ZGlvSUQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICB1c2VyRGVmYXVsdEF1ZGlvSW5wdXREZXZpY2UgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICB1c2VyRGVmYXVsdEF1ZGlvT3V0cHV0RGV2aWNlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcbiAgcHJldkF1ZGlvSW5wdXREZXZpY2UgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICBwcmV2VmlkZW9JbnB1dERldmljZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gIGF1ZGlvUGF1c2VkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIG1haW5TY3JlZW5QZXJzb24gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICBhZG1pbk9uTWFpblNjcmVlbiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBzY3JlZW5TdGF0ZXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFNjcmVlblN0YXRlW10+KFtcbiAgICB7XG4gICAgICBtYWluU2NyZWVuUGVyc29uOiAnJyxcbiAgICAgIG1haW5TY3JlZW5Qcm9kdWNlcklkOiAnJyxcbiAgICAgIG1haW5TY3JlZW5GaWxsZWQ6IGZhbHNlLFxuICAgICAgYWRtaW5Pbk1haW5TY3JlZW46IGZhbHNlLFxuICAgIH0sXG4gIF0pO1xuICBwcmV2U2NyZWVuU3RhdGVzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxTY3JlZW5TdGF0ZVtdPihbXG4gICAge1xuICAgICAgbWFpblNjcmVlblBlcnNvbjogJycsXG4gICAgICBtYWluU2NyZWVuUHJvZHVjZXJJZDogJycsXG4gICAgICBtYWluU2NyZWVuRmlsbGVkOiBmYWxzZSxcbiAgICAgIGFkbWluT25NYWluU2NyZWVuOiBmYWxzZSxcbiAgICB9LFxuICBdKTtcbiAgdXBkYXRlRGF0ZVN0YXRlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXIgfCBudWxsPihudWxsKTtcbiAgbGFzdFVwZGF0ZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyIHwgbnVsbD4obnVsbCk7XG4gIG5Gb3JSZWFkanVzdFJlY29yZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgZml4ZWRQYWdlTGltaXQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oNCk7XG4gIHJlbW92ZUFsdEdyaWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgbkZvclJlYWRqdXN0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICByZW9yZGVySW50ZXJ2YWwgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMzAwMDApO1xuICBmYXN0UmVvcmRlckludGVydmFsID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDEwMDAwKTtcbiAgbGFzdFJlb3JkZXJUaW1lID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICBhdWRTdHJlYW1OYW1lcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8U3RyZWFtW10+KFtdKTtcbiAgY3VycmVudFVzZXJQYWdlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICBtYWluSGVpZ2h0V2lkdGggPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMTAwKTtcbiAgcHJldk1haW5IZWlnaHRXaWR0aCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPih0aGlzLm1haW5IZWlnaHRXaWR0aC52YWx1ZSk7XG4gIHByZXZEb1BhZ2luYXRlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGRvUGFnaW5hdGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgc2hhcmVFbmRlZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBsU3RyZWFtcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8KFBhcnRpY2lwYW50IHwgU3RyZWFtKVtdPihbXSk7XG4gIGNoYXRSZWZTdHJlYW1zID0gbmV3IEJlaGF2aW9yU3ViamVjdDwoUGFydGljaXBhbnQgfCBTdHJlYW0pW10+KFtdKTtcbiAgY29udHJvbEhlaWdodCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPihcbiAgICB0aGlzLmV2ZW50VHlwZS52YWx1ZSA9PT0gJ3dlYmluYXInIHx8IHRoaXMuZXZlbnRUeXBlLnZhbHVlID09PSAnY29uZmVyZW5jZScgPyAwIDogMC4wNixcbiAgKTtcbiAgaXNXaWRlU2NyZWVuID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGlzTWVkaXVtU2NyZWVuID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGlzU21hbGxTY3JlZW4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgYWRkR3JpZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBhZGRBbHRHcmlkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGdyaWRSb3dzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICBncmlkQ29scyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgYWx0R3JpZFJvd3MgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG4gIGFsdEdyaWRDb2xzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICBudW1iZXJQYWdlcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgY3VycmVudFN0cmVhbXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PChQYXJ0aWNpcGFudCB8IFN0cmVhbSlbXT4oW10pO1xuICBzaG93TWluaVZpZXcgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgblN0cmVhbSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8TWVkaWFTdHJlYW0gfCBudWxsPihudWxsKTtcbiAgZGVmZXJfcmVjZWl2ZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBhbGxBdWRpb1N0cmVhbXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PChQYXJ0aWNpcGFudCB8IFN0cmVhbSlbXT4oW10pO1xuICByZW1vdGVTY3JlZW5TdHJlYW0gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFN0cmVhbVtdPihbXSk7XG4gIHNjcmVlblByb2R1Y2VyID0gbmV3IEJlaGF2aW9yU3ViamVjdDxQcm9kdWNlciB8IG51bGw+KG51bGwpO1xuICBnb3RBbGxWaWRzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHBhZ2luYXRpb25IZWlnaHRXaWR0aCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPig0MCk7XG4gIHBhZ2luYXRpb25EaXJlY3Rpb24gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PCdob3Jpem9udGFsJyB8ICd2ZXJ0aWNhbCc+KCdob3Jpem9udGFsJyk7XG4gIGdyaWRTaXplcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8R3JpZFNpemVzPih7XG4gICAgZ3JpZFdpZHRoOiAwLFxuICAgIGdyaWRIZWlnaHQ6IDAsXG4gICAgYWx0R3JpZFdpZHRoOiAwLFxuICAgIGFsdEdyaWRIZWlnaHQ6IDAsXG4gIH0pO1xuICBzY3JlZW5Gb3JjZUZ1bGxEaXNwbGF5ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIG1haW5HcmlkU3RyZWFtID0gbmV3IEJlaGF2aW9yU3ViamVjdDxDdXN0b21NZWRpYUNvbXBvbmVudFtdPihbXSk7XG4gIG90aGVyR3JpZFN0cmVhbXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEN1c3RvbU1lZGlhQ29tcG9uZW50W11bXT4oW10pO1xuICBhdWRpb09ubHlTdHJlYW1zID0gbmV3IEJlaGF2aW9yU3ViamVjdDxDdXN0b21NZWRpYUNvbXBvbmVudFtdPihbXSk7XG4gIHZpZGVvSW5wdXRzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxNZWRpYURldmljZUluZm9bXT4oW10pO1xuICBhdWRpb0lucHV0cyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8TWVkaWFEZXZpY2VJbmZvW10+KFtdKTtcbiAgbWVldGluZ1Byb2dyZXNzVGltZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignMDA6MDA6MDAnKTtcbiAgbWVldGluZ0VsYXBzZWRUaW1lID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICByZWZfcGFydGljaXBhbnRzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxQYXJ0aWNpcGFudFtdPihbXSk7XG5cbiAgdXBkYXRlVmFsaWRhdGVkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy52YWxpZGF0ZWQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlU29ja2V0ID0gKHZhbHVlOiBTb2NrZXQpID0+IHtcbiAgICB0aGlzLnNvY2tldC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVEZXZpY2UgPSAodmFsdWU6IERldmljZSB8IG51bGwpID0+IHtcbiAgICB0aGlzLmRldmljZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSb29tRGF0YSA9ICh2YWx1ZTogUmVzcG9uc2VKb2luUm9vbSB8IG51bGwpID0+IHtcbiAgICB0aGlzLnJvb21EYXRhLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUFwaUtleSA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5hcGlLZXkubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQXBpVXNlck5hbWUgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMuYXBpVXNlck5hbWUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQXBpVG9rZW4gPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMuYXBpVG9rZW4ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTGluayA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5saW5rLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJvb21OYW1lID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLnJvb21OYW1lLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZU1lbWJlciA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5tZW1iZXIubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQWRtaW5QYXNzY29kZSA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5hZG1pblBhc3Njb2RlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUlzbGV2ZWwgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMuaXNsZXZlbC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVDb0hvc3QgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMuY29Ib3N0Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUNvSG9zdFJlc3BvbnNpYmlsaXR5ID0gKHZhbHVlOiBDb0hvc3RSZXNwb25zaWJpbGl0eVtdKSA9PiB7XG4gICAgdGhpcy5jb0hvc3RSZXNwb25zaWJpbGl0eS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVZb3VBcmVDb0hvc3QgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnlvdUFyZUNvSG9zdC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVZb3VBcmVIb3N0ID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy55b3VBcmVIb3N0Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUNvbmZpcm1lZFRvUmVjb3JkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5jb25maXJtZWRUb1JlY29yZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVNZWV0aW5nRGlzcGxheVR5cGUgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMubWVldGluZ0Rpc3BsYXlUeXBlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZU1lZXRpbmdWaWRlb09wdGltaXplZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMubWVldGluZ1ZpZGVvT3B0aW1pemVkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUV2ZW50VHlwZSA9ICh2YWx1ZTogRXZlbnRUeXBlKSA9PiB7XG4gICAgdGhpcy5ldmVudFR5cGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUGFydGljaXBhbnRzID0gKHZhbHVlOiBQYXJ0aWNpcGFudFtdKSA9PiB7XG4gICAgdGhpcy5wYXJ0aWNpcGFudHMubmV4dCh2YWx1ZSk7XG4gICAgdGhpcy5wYXJ0aWNpcGFudHNDb3VudGVyLm5leHQodmFsdWUubGVuZ3RoKTtcbiAgICB0aGlzLmZpbHRlcmVkUGFydGljaXBhbnRzLm5leHQodGhpcy5wYXJ0aWNpcGFudHMudmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUZpbHRlcmVkUGFydGljaXBhbnRzID0gKHZhbHVlOiBQYXJ0aWNpcGFudFtdKSA9PiB7XG4gICAgdGhpcy5maWx0ZXJlZFBhcnRpY2lwYW50cy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVQYXJ0aWNpcGFudHNDb3VudGVyID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLnBhcnRpY2lwYW50c0NvdW50ZXIubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUGFydGljaXBhbnRzRmlsdGVyID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLnBhcnRpY2lwYW50c0ZpbHRlci5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVDb25zdW1lX3NvY2tldHMgPSAodmFsdWU6IENvbnN1bWVTb2NrZXRbXSkgPT4ge1xuICAgIHRoaXMuY29uc3VtZV9zb2NrZXRzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJ0cENhcGFiaWxpdGllcyA9ICh2YWx1ZTogUnRwQ2FwYWJpbGl0aWVzIHwgbnVsbCkgPT4ge1xuICAgIHRoaXMucnRwQ2FwYWJpbGl0aWVzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJvb21SZWN2SVBzID0gKHZhbHVlOiBzdHJpbmdbXSkgPT4ge1xuICAgIHRoaXMucm9vbVJlY3ZJUHMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTWVldGluZ1Jvb21QYXJhbXMgPSAodmFsdWU6IE1lZXRpbmdSb29tUGFyYW1zIHwgbnVsbCkgPT4ge1xuICAgIHRoaXMubWVldGluZ1Jvb21QYXJhbXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlSXRlbVBhZ2VMaW1pdCA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5pdGVtUGFnZUxpbWl0Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUF1ZGlvT25seVJvb20gPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmF1ZGlvT25seVJvb20ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQWRkRm9yQmFzaWMgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmFkZEZvckJhc2ljLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVNjcmVlblBhZ2VMaW1pdCA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5zY3JlZW5QYWdlTGltaXQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlU2hhcmVTY3JlZW5TdGFydGVkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5zaGFyZVNjcmVlblN0YXJ0ZWQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlU2hhcmVkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5zaGFyZWQubmV4dCh2YWx1ZSk7XG4gICAgdGhpcy5zY3JlZW5TaGFyZUFjdGl2ZS5uZXh0KHZhbHVlKTtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuICAgICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ3Jlc2l6ZScpKTtcbiAgICAgIH0sIDIwMDApO1xuICAgIH1cbiAgfTtcblxuICB1cGRhdGVUYXJnZXRPcmllbnRhdGlvbiA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy50YXJnZXRPcmllbnRhdGlvbi5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVUYXJnZXRSZXNvbHV0aW9uID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLnRhcmdldFJlc29sdXRpb24ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlVGFyZ2V0UmVzb2x1dGlvbkhvc3QgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMudGFyZ2V0UmVzb2x1dGlvbkhvc3QubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlVmlkQ29ucyA9ICh2YWx1ZTogVmlkQ29ucykgPT4ge1xuICAgIHRoaXMudmlkQ29ucy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVGcmFtZVJhdGUgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMuZnJhbWVSYXRlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUhQYXJhbXMgPSAodmFsdWU6IEhQYXJhbXNUeXBlKSA9PiB7XG4gICAgdGhpcy5oUGFyYW1zLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVZQYXJhbXMgPSAodmFsdWU6IFZQYXJhbXNUeXBlKSA9PiB7XG4gICAgdGhpcy52UGFyYW1zLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVNjcmVlblBhcmFtcyA9ICh2YWx1ZTogU2NyZWVuUGFyYW1zVHlwZSkgPT4ge1xuICAgIHRoaXMuc2NyZWVuUGFyYW1zLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUFQYXJhbXMgPSAodmFsdWU6IEFQYXJhbXNUeXBlKSA9PiB7XG4gICAgdGhpcy5hUGFyYW1zLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ0F1ZGlvUGF1c2VzTGltaXQgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMucmVjb3JkaW5nQXVkaW9QYXVzZXNMaW1pdC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRpbmdBdWRpb1BhdXNlc0NvdW50ID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ0F1ZGlvUGF1c2VzQ291bnQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nQXVkaW9TdXBwb3J0ID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdBdWRpb1N1cHBvcnQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nQXVkaW9QZW9wbGVMaW1pdCA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdBdWRpb1Blb3BsZUxpbWl0Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ0F1ZGlvUGFydGljaXBhbnRzVGltZUxpbWl0ID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ0F1ZGlvUGFydGljaXBhbnRzVGltZUxpbWl0Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ1ZpZGVvUGF1c2VzQ291bnQgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMucmVjb3JkaW5nVmlkZW9QYXVzZXNDb3VudC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRpbmdWaWRlb1BhdXNlc0xpbWl0ID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ1ZpZGVvUGF1c2VzTGltaXQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nVmlkZW9TdXBwb3J0ID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdWaWRlb1N1cHBvcnQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nVmlkZW9QZW9wbGVMaW1pdCA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdWaWRlb1Blb3BsZUxpbWl0Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ1ZpZGVvUGFydGljaXBhbnRzVGltZUxpbWl0ID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ1ZpZGVvUGFydGljaXBhbnRzVGltZUxpbWl0Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ0FsbFBhcnRpY2lwYW50c1N1cHBvcnQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ0FsbFBhcnRpY2lwYW50c1N1cHBvcnQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nVmlkZW9QYXJ0aWNpcGFudHNTdXBwb3J0ID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdWaWRlb1BhcnRpY2lwYW50c1N1cHBvcnQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nQWxsUGFydGljaXBhbnRzRnVsbFJvb21TdXBwb3J0ID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdBbGxQYXJ0aWNpcGFudHNGdWxsUm9vbVN1cHBvcnQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nVmlkZW9QYXJ0aWNpcGFudHNGdWxsUm9vbVN1cHBvcnQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ1ZpZGVvUGFydGljaXBhbnRzRnVsbFJvb21TdXBwb3J0Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ1ByZWZlcnJlZE9yaWVudGF0aW9uID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ1ByZWZlcnJlZE9yaWVudGF0aW9uLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ1N1cHBvcnRGb3JPdGhlck9yaWVudGF0aW9uID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdTdXBwb3J0Rm9yT3RoZXJPcmllbnRhdGlvbi5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRpbmdNdWx0aUZvcm1hdHNTdXBwb3J0ID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdNdWx0aUZvcm1hdHNTdXBwb3J0Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVVzZXJSZWNvcmRpbmdQYXJhbXMgPSAodmFsdWU6IFVzZXJSZWNvcmRpbmdQYXJhbXMpID0+IHtcbiAgICB0aGlzLnVzZXJSZWNvcmRpbmdQYXJhbXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQ2FuUmVjb3JkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5jYW5SZWNvcmQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlU3RhcnRSZXBvcnQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnN0YXJ0UmVwb3J0Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUVuZFJlcG9ydCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuZW5kUmVwb3J0Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZFRpbWVySW50ZXJ2YWwgPSAodmFsdWU6IE5vZGVKUy5UaW1lb3V0IHwgbnVsbCkgPT4ge1xuICAgIHRoaXMucmVjb3JkVGltZXJJbnRlcnZhbC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRTdGFydFRpbWUgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMucmVjb3JkU3RhcnRUaW1lLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZEVsYXBzZWRUaW1lID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLnJlY29yZEVsYXBzZWRUaW1lLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUlzVGltZXJSdW5uaW5nID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5pc1RpbWVyUnVubmluZy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVDYW5QYXVzZVJlc3VtZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuY2FuUGF1c2VSZXN1bWUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkQ2hhbmdlU2Vjb25kcyA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRDaGFuZ2VTZWNvbmRzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVBhdXNlTGltaXQgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMucGF1c2VMaW1pdC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVQYXVzZVJlY29yZENvdW50ID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLnBhdXNlUmVjb3JkQ291bnQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQ2FuTGF1bmNoUmVjb3JkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5jYW5MYXVuY2hSZWNvcmQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlU3RvcExhdW5jaFJlY29yZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuc3RvcExhdW5jaFJlY29yZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVQYXJ0aWNpcGFudHNBbGwgPSAodmFsdWU6IFBhcnRpY2lwYW50W10pID0+IHtcbiAgICB0aGlzLnBhcnRpY2lwYW50c0FsbC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVGaXJzdEFsbCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuZmlyc3RBbGwubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlVXBkYXRlTWFpbldpbmRvdyA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMudXBkYXRlTWFpbldpbmRvdy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVGaXJzdF9yb3VuZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuZmlyc3Rfcm91bmQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTGFuZFNjYXBlZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMubGFuZFNjYXBlZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVMb2NrX3NjcmVlbiA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMubG9ja19zY3JlZW4ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlU2NyZWVuSWQgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMuc2NyZWVuSWQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQWxsVmlkZW9TdHJlYW1zID0gKHZhbHVlOiAoUGFydGljaXBhbnQgfCBTdHJlYW0pW10pID0+IHtcbiAgICB0aGlzLmFsbFZpZGVvU3RyZWFtcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVOZXdMaW1pdGVkU3RyZWFtcyA9ICh2YWx1ZTogKFBhcnRpY2lwYW50IHwgU3RyZWFtKVtdKSA9PiB7XG4gICAgdGhpcy5uZXdMaW1pdGVkU3RyZWFtcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVOZXdMaW1pdGVkU3RyZWFtc0lEcyA9ICh2YWx1ZTogc3RyaW5nW10pID0+IHtcbiAgICB0aGlzLm5ld0xpbWl0ZWRTdHJlYW1zSURzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUFjdGl2ZVNvdW5kcyA9ICh2YWx1ZTogc3RyaW5nW10pID0+IHtcbiAgICB0aGlzLmFjdGl2ZVNvdW5kcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVTY3JlZW5TaGFyZUlEU3RyZWFtID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLnNjcmVlblNoYXJlSURTdHJlYW0ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlU2NyZWVuU2hhcmVOYW1lU3RyZWFtID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLnNjcmVlblNoYXJlTmFtZVN0cmVhbS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBZG1pbklEU3RyZWFtID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLmFkbWluSURTdHJlYW0ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQWRtaW5OYW1lU3RyZWFtID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLmFkbWluTmFtZVN0cmVhbS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVZb3VZb3VTdHJlYW0gPSAodmFsdWU6IChQYXJ0aWNpcGFudCB8IFN0cmVhbSlbXSkgPT4ge1xuICAgIHRoaXMueW91WW91U3RyZWFtLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVlvdVlvdVN0cmVhbUlEcyA9ICh2YWx1ZTogc3RyaW5nW10pID0+IHtcbiAgICB0aGlzLnlvdVlvdVN0cmVhbUlEcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVMb2NhbFN0cmVhbSA9ICh2YWx1ZTogTWVkaWFTdHJlYW0gfCBudWxsKSA9PiB7XG4gICAgdGhpcy5sb2NhbFN0cmVhbS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRTdGFydGVkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRTdGFydGVkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZFJlc3VtZWQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnJlY29yZFJlc3VtZWQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkUGF1c2VkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRQYXVzZWQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkU3RvcHBlZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMucmVjb3JkU3RvcHBlZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBZG1pblJlc3RyaWN0U2V0dGluZyA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuYWRtaW5SZXN0cmljdFNldHRpbmcubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlVmlkZW9SZXF1ZXN0U3RhdGUgPSAodmFsdWU6IHN0cmluZyB8IG51bGwpID0+IHtcbiAgICB0aGlzLnZpZGVvUmVxdWVzdFN0YXRlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVZpZGVvUmVxdWVzdFRpbWUgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMudmlkZW9SZXF1ZXN0VGltZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVWaWRlb0FjdGlvbiA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMudmlkZW9BY3Rpb24ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTG9jYWxTdHJlYW1WaWRlbyA9ICh2YWx1ZTogTWVkaWFTdHJlYW0gfCBudWxsKSA9PiB7XG4gICAgdGhpcy5sb2NhbFN0cmVhbVZpZGVvLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVVzZXJEZWZhdWx0VmlkZW9JbnB1dERldmljZSA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy51c2VyRGVmYXVsdFZpZGVvSW5wdXREZXZpY2UubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQ3VycmVudEZhY2luZ01vZGUgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMuY3VycmVudEZhY2luZ01vZGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUHJldkZhY2luZ01vZGUgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMucHJldkZhY2luZ01vZGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlRGVmVmlkZW9JRCA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5kZWZWaWRlb0lELm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUFsbG93ZWQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmFsbG93ZWQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlRGlzcEFjdGl2ZU5hbWVzID0gKHZhbHVlOiBzdHJpbmdbXSkgPT4ge1xuICAgIHRoaXMuZGlzcEFjdGl2ZU5hbWVzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVBfZGlzcEFjdGl2ZU5hbWVzID0gKHZhbHVlOiBzdHJpbmdbXSkgPT4ge1xuICAgIHRoaXMucF9kaXNwQWN0aXZlTmFtZXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQWN0aXZlTmFtZXMgPSAodmFsdWU6IHN0cmluZ1tdKSA9PiB7XG4gICAgdGhpcy5hY3RpdmVOYW1lcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVQcmV2QWN0aXZlTmFtZXMgPSAodmFsdWU6IHN0cmluZ1tdKSA9PiB7XG4gICAgdGhpcy5wcmV2QWN0aXZlTmFtZXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUF9hY3RpdmVOYW1lcyA9ICh2YWx1ZTogc3RyaW5nW10pID0+IHtcbiAgICB0aGlzLnBfYWN0aXZlTmFtZXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTWVtYmVyc1JlY2VpdmVkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5tZW1iZXJzUmVjZWl2ZWQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlRGVmZXJTY3JlZW5SZWNlaXZlZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuZGVmZXJTY3JlZW5SZWNlaXZlZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVIb3N0Rmlyc3RTd2l0Y2ggPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmhvc3RGaXJzdFN3aXRjaC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVNaWNBY3Rpb24gPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLm1pY0FjdGlvbi5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVTY3JlZW5BY3Rpb24gPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnNjcmVlbkFjdGlvbi5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVDaGF0QWN0aW9uID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5jaGF0QWN0aW9uLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUF1ZGlvUmVxdWVzdFN0YXRlID0gKHZhbHVlOiBzdHJpbmcgfCBudWxsKSA9PiB7XG4gICAgdGhpcy5hdWRpb1JlcXVlc3RTdGF0ZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVTY3JlZW5SZXF1ZXN0U3RhdGUgPSAodmFsdWU6IHN0cmluZyB8IG51bGwpID0+IHtcbiAgICB0aGlzLnNjcmVlblJlcXVlc3RTdGF0ZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVDaGF0UmVxdWVzdFN0YXRlID0gKHZhbHVlOiBzdHJpbmcgfCBudWxsKSA9PiB7XG4gICAgdGhpcy5jaGF0UmVxdWVzdFN0YXRlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUF1ZGlvUmVxdWVzdFRpbWUgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMuYXVkaW9SZXF1ZXN0VGltZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVTY3JlZW5SZXF1ZXN0VGltZSA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5zY3JlZW5SZXF1ZXN0VGltZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVDaGF0UmVxdWVzdFRpbWUgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMuY2hhdFJlcXVlc3RUaW1lLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZU9sZFNvdW5kSWRzID0gKHZhbHVlOiBzdHJpbmdbXSkgPT4ge1xuICAgIHRoaXMub2xkU291bmRJZHMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlSG9zdExhYmVsID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLmhvc3RMYWJlbC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVNYWluU2NyZWVuRmlsbGVkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5tYWluU2NyZWVuRmlsbGVkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUxvY2FsU3RyZWFtU2NyZWVuID0gKHZhbHVlOiBNZWRpYVN0cmVhbSB8IG51bGwpID0+IHtcbiAgICB0aGlzLmxvY2FsU3RyZWFtU2NyZWVuLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVNjcmVlbkFscmVhZHlPbiA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuc2NyZWVuQWxyZWFkeU9uLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUNoYXRBbHJlYWR5T24gPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmNoYXRBbHJlYWR5T24ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVkaXJlY3RVUkwgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMucmVkaXJlY3RVUkwubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlT2xkQWxsU3RyZWFtcyA9ICh2YWx1ZTogKFBhcnRpY2lwYW50IHwgU3RyZWFtKVtdKSA9PiB7XG4gICAgdGhpcy5vbGRBbGxTdHJlYW1zLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUFkbWluVmlkSUQgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMuYWRtaW5WaWRJRC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVTdHJlYW1OYW1lcyA9ICh2YWx1ZTogU3RyZWFtW10pID0+IHtcbiAgICB0aGlzLnN0cmVhbU5hbWVzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZU5vbl9hbFZpZGVvU3RyZWFtcyA9ICh2YWx1ZTogUGFydGljaXBhbnRbXSkgPT4ge1xuICAgIHRoaXMubm9uX2FsVmlkZW9TdHJlYW1zLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVNvcnRBdWRpb0xvdWRuZXNzID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5zb3J0QXVkaW9Mb3VkbmVzcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBdWRpb0RlY2liZWxzID0gKHZhbHVlOiBBdWRpb0RlY2liZWxzW10pID0+IHtcbiAgICB0aGlzLmF1ZGlvRGVjaWJlbHMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTWl4ZWRfYWxWaWRlb1N0cmVhbXMgPSAodmFsdWU6IChQYXJ0aWNpcGFudCB8IFN0cmVhbSlbXSkgPT4ge1xuICAgIHRoaXMubWl4ZWRfYWxWaWRlb1N0cmVhbXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTm9uX2FsVmlkZW9TdHJlYW1zX211dGVkID0gKHZhbHVlOiBQYXJ0aWNpcGFudFtdKSA9PiB7XG4gICAgdGhpcy5ub25fYWxWaWRlb1N0cmVhbXNfbXV0ZWQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUGFnaW5hdGVkU3RyZWFtcyA9ICh2YWx1ZTogKFBhcnRpY2lwYW50IHwgU3RyZWFtKVtdW10pID0+IHtcbiAgICB0aGlzLnBhZ2luYXRlZFN0cmVhbXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTG9jYWxTdHJlYW1BdWRpbyA9ICh2YWx1ZTogTWVkaWFTdHJlYW0gfCBudWxsKSA9PiB7XG4gICAgdGhpcy5sb2NhbFN0cmVhbUF1ZGlvLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZURlZkF1ZGlvSUQgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMuZGVmQXVkaW9JRC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVVc2VyRGVmYXVsdEF1ZGlvSW5wdXREZXZpY2UgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMudXNlckRlZmF1bHRBdWRpb0lucHV0RGV2aWNlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVVzZXJEZWZhdWx0QXVkaW9PdXRwdXREZXZpY2UgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMudXNlckRlZmF1bHRBdWRpb091dHB1dERldmljZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVQcmV2QXVkaW9JbnB1dERldmljZSA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5wcmV2QXVkaW9JbnB1dERldmljZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVQcmV2VmlkZW9JbnB1dERldmljZSA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5wcmV2VmlkZW9JbnB1dERldmljZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBdWRpb1BhdXNlZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuYXVkaW9QYXVzZWQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTWFpblNjcmVlblBlcnNvbiA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5tYWluU2NyZWVuUGVyc29uLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUFkbWluT25NYWluU2NyZWVuID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5hZG1pbk9uTWFpblNjcmVlbi5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVTY3JlZW5TdGF0ZXMgPSAodmFsdWU6IFNjcmVlblN0YXRlW10pID0+IHtcbiAgICB0aGlzLnNjcmVlblN0YXRlcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVQcmV2U2NyZWVuU3RhdGVzID0gKHZhbHVlOiBTY3JlZW5TdGF0ZVtdKSA9PiB7XG4gICAgdGhpcy5wcmV2U2NyZWVuU3RhdGVzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVVwZGF0ZURhdGVTdGF0ZSA9ICh2YWx1ZTogbnVtYmVyIHwgbnVsbCkgPT4ge1xuICAgIHRoaXMudXBkYXRlRGF0ZVN0YXRlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUxhc3RVcGRhdGUgPSAodmFsdWU6IG51bWJlciB8IG51bGwpID0+IHtcbiAgICB0aGlzLmxhc3RVcGRhdGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTkZvclJlYWRqdXN0UmVjb3JkID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLm5Gb3JSZWFkanVzdFJlY29yZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVGaXhlZFBhZ2VMaW1pdCA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5maXhlZFBhZ2VMaW1pdC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZW1vdmVBbHRHcmlkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5yZW1vdmVBbHRHcmlkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZU5Gb3JSZWFkanVzdCA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5uRm9yUmVhZGp1c3QubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTGFzdFJlb3JkZXJUaW1lID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLmxhc3RSZW9yZGVyVGltZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBdWRTdHJlYW1OYW1lcyA9ICh2YWx1ZTogU3RyZWFtW10pID0+IHtcbiAgICB0aGlzLmF1ZFN0cmVhbU5hbWVzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUN1cnJlbnRVc2VyUGFnZSA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5jdXJyZW50VXNlclBhZ2UubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTWFpbkhlaWdodFdpZHRoID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLm1haW5IZWlnaHRXaWR0aC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVQcmV2TWFpbkhlaWdodFdpZHRoID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLnByZXZNYWluSGVpZ2h0V2lkdGgubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUHJldkRvUGFnaW5hdGUgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnByZXZEb1BhZ2luYXRlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZURvUGFnaW5hdGUgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmRvUGFnaW5hdGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlU2hhcmVFbmRlZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuc2hhcmVFbmRlZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVMU3RyZWFtcyA9ICh2YWx1ZTogKFBhcnRpY2lwYW50IHwgU3RyZWFtKVtdKSA9PiB7XG4gICAgdGhpcy5sU3RyZWFtcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVDaGF0UmVmU3RyZWFtcyA9ICh2YWx1ZTogKFBhcnRpY2lwYW50IHwgU3RyZWFtKVtdKSA9PiB7XG4gICAgdGhpcy5jaGF0UmVmU3RyZWFtcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVDb250cm9sSGVpZ2h0ID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLmNvbnRyb2xIZWlnaHQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlSXNXaWRlU2NyZWVuID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5pc1dpZGVTY3JlZW4ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlSXNNZWRpdW1TY3JlZW4gPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmlzTWVkaXVtU2NyZWVuLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUlzU21hbGxTY3JlZW4gPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmlzU21hbGxTY3JlZW4ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQWRkR3JpZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuYWRkR3JpZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBZGRBbHRHcmlkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5hZGRBbHRHcmlkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUdyaWRSb3dzID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLmdyaWRSb3dzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUdyaWRDb2xzID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLmdyaWRDb2xzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUFsdEdyaWRSb3dzID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLmFsdEdyaWRSb3dzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUFsdEdyaWRDb2xzID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLmFsdEdyaWRDb2xzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZU51bWJlclBhZ2VzID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLm51bWJlclBhZ2VzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUN1cnJlbnRTdHJlYW1zID0gKHZhbHVlOiAoUGFydGljaXBhbnQgfCBTdHJlYW0pW10pID0+IHtcbiAgICB0aGlzLmN1cnJlbnRTdHJlYW1zLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVNob3dNaW5pVmlldyA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuc2hvd01pbmlWaWV3Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZU5TdHJlYW0gPSAodmFsdWU6IE1lZGlhU3RyZWFtIHwgbnVsbCkgPT4ge1xuICAgIHRoaXMublN0cmVhbS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVEZWZlcl9yZWNlaXZlID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5kZWZlcl9yZWNlaXZlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUFsbEF1ZGlvU3RyZWFtcyA9ICh2YWx1ZTogKFBhcnRpY2lwYW50IHwgU3RyZWFtKVtdKSA9PiB7XG4gICAgdGhpcy5hbGxBdWRpb1N0cmVhbXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVtb3RlU2NyZWVuU3RyZWFtID0gKHZhbHVlOiBTdHJlYW1bXSkgPT4ge1xuICAgIHRoaXMucmVtb3RlU2NyZWVuU3RyZWFtLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVNjcmVlblByb2R1Y2VyID0gKHZhbHVlOiBQcm9kdWNlciB8IG51bGwpID0+IHtcbiAgICB0aGlzLnNjcmVlblByb2R1Y2VyLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUdvdEFsbFZpZHMgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmdvdEFsbFZpZHMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUGFnaW5hdGlvbkhlaWdodFdpZHRoID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLnBhZ2luYXRpb25IZWlnaHRXaWR0aC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVQYWdpbmF0aW9uRGlyZWN0aW9uID0gKHZhbHVlOiAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnKSA9PiB7XG4gICAgdGhpcy5wYWdpbmF0aW9uRGlyZWN0aW9uLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUdyaWRTaXplcyA9ICh2YWx1ZTogR3JpZFNpemVzKSA9PiB7XG4gICAgdGhpcy5ncmlkU2l6ZXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlU2NyZWVuRm9yY2VGdWxsRGlzcGxheSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuc2NyZWVuRm9yY2VGdWxsRGlzcGxheS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVNYWluR3JpZFN0cmVhbSA9ICh2YWx1ZTogQ3VzdG9tTWVkaWFDb21wb25lbnRbXSkgPT4ge1xuICAgIHRoaXMubWFpbkdyaWRTdHJlYW0ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlT3RoZXJHcmlkU3RyZWFtcyA9ICh2YWx1ZTogQ3VzdG9tTWVkaWFDb21wb25lbnRbXVtdKSA9PiB7XG4gICAgdGhpcy5vdGhlckdyaWRTdHJlYW1zLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUF1ZGlvT25seVN0cmVhbXMgPSAodmFsdWU6IEN1c3RvbU1lZGlhQ29tcG9uZW50W10pID0+IHtcbiAgICB0aGlzLmF1ZGlvT25seVN0cmVhbXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlVmlkZW9JbnB1dHMgPSAodmFsdWU6IE1lZGlhRGV2aWNlSW5mb1tdKSA9PiB7XG4gICAgdGhpcy52aWRlb0lucHV0cy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBdWRpb0lucHV0cyA9ICh2YWx1ZTogTWVkaWFEZXZpY2VJbmZvW10pID0+IHtcbiAgICB0aGlzLmF1ZGlvSW5wdXRzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZU1lZXRpbmdQcm9ncmVzc1RpbWUgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMubWVldGluZ1Byb2dyZXNzVGltZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVNZWV0aW5nRWxhcHNlZFRpbWUgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMubWVldGluZ0VsYXBzZWRUaW1lLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlZl9wYXJ0aWNpcGFudHMgPSAodmFsdWU6IFBhcnRpY2lwYW50W10pID0+IHtcbiAgICB0aGlzLnJlZl9wYXJ0aWNpcGFudHMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgLy8gTWVzc2FnZXNcbiAgbWVzc2FnZXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE1lc3NhZ2VbXT4oW10pO1xuICBzdGFydERpcmVjdE1lc3NhZ2UgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgZGlyZWN0TWVzc2FnZURldGFpbHMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFBhcnRpY2lwYW50IHwgbnVsbD4obnVsbCk7XG4gIHNob3dNZXNzYWdlc0JhZGdlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG5cbiAgLy8gRXZlbnQgU2V0dGluZ3NcbiAgYXVkaW9TZXR0aW5nID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCdhbGxvdycpO1xuICB2aWRlb1NldHRpbmcgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJ2FsbG93Jyk7XG4gIHNjcmVlbnNoYXJlU2V0dGluZyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignYWxsb3cnKTtcbiAgY2hhdFNldHRpbmcgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJ2FsbG93Jyk7XG5cbiAgLy8gRGlzcGxheSBTZXR0aW5nc1xuICBkaXNwbGF5T3B0aW9uID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCdtZWRpYScpO1xuICBhdXRvV2F2ZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4odHJ1ZSk7XG4gIGZvcmNlRnVsbERpc3BsYXkgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KHRydWUpO1xuICBwcmV2Rm9yY2VGdWxsRGlzcGxheSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBwcmV2TWVldGluZ0Rpc3BsYXlUeXBlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCd2aWRlbycpO1xuXG4gIC8vIFdhaXRpbmcgUm9vbVxuICB3YWl0aW5nUm9vbUZpbHRlciA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gIHdhaXRpbmdSb29tTGlzdCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8V2FpdGluZ1Jvb21QYXJ0aWNpcGFudFtdPihbXSk7XG4gIHdhaXRpbmdSb29tQ291bnRlciA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgZmlsdGVyZWRXYWl0aW5nUm9vbUxpc3QgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFdhaXRpbmdSb29tUGFydGljaXBhbnRbXT4oW10pO1xuXG4gIC8vIFJlcXVlc3RzXG4gIHJlcXVlc3RGaWx0ZXIgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICByZXF1ZXN0TGlzdCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UmVxdWVzdFtdPihbXSk7XG4gIHJlcXVlc3RDb3VudGVyID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICBmaWx0ZXJlZFJlcXVlc3RMaXN0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxSZXF1ZXN0W10+KFtdKTtcblxuICAvLyBUb3RhbCBSZXF1ZXN0cyBhbmQgV2FpdGluZyBSb29tXG4gIHRvdGFsUmVxV2FpdCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcblxuICAvLyBBbGVydHNcbiAgYWxlcnRWaXNpYmxlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGFsZXJ0TWVzc2FnZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gIGFsZXJ0VHlwZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8J3N1Y2Nlc3MnIHwgJ2Rhbmdlcic+KCdzdWNjZXNzJyk7XG4gIGFsZXJ0RHVyYXRpb24gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMzAwMCk7XG5cbiAgLy8gUHJvZ3Jlc3MgVGltZXJcbiAgcHJvZ3Jlc3NUaW1lclZpc2libGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KHRydWUpO1xuICBwcm9ncmVzc1RpbWVyVmFsdWUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG5cbiAgLy8gTWVudSBNb2RhbHNcbiAgaXNNZW51TW9kYWxWaXNpYmxlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGlzUmVjb3JkaW5nTW9kYWxWaXNpYmxlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGlzU2V0dGluZ3NNb2RhbFZpc2libGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgaXNSZXF1ZXN0c01vZGFsVmlzaWJsZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBpc1dhaXRpbmdNb2RhbFZpc2libGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgaXNDb0hvc3RNb2RhbFZpc2libGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgaXNNZWRpYVNldHRpbmdzTW9kYWxWaXNpYmxlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGlzRGlzcGxheVNldHRpbmdzTW9kYWxWaXNpYmxlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG5cbiAgLy8gT3RoZXIgTW9kYWxzXG4gIGlzUGFydGljaXBhbnRzTW9kYWxWaXNpYmxlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGlzTWVzc2FnZXNNb2RhbFZpc2libGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgaXNDb25maXJtRXhpdE1vZGFsVmlzaWJsZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBpc0NvbmZpcm1IZXJlTW9kYWxWaXNpYmxlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGlzU2hhcmVFdmVudE1vZGFsVmlzaWJsZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBpc0xvYWRpbmdNb2RhbFZpc2libGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcblxuICAvLyBSZWNvcmRpbmcgT3B0aW9uc1xuICByZWNvcmRpbmdNZWRpYU9wdGlvbnMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJ3ZpZGVvJyk7XG4gIHJlY29yZGluZ0F1ZGlvT3B0aW9ucyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignYWxsJyk7XG4gIHJlY29yZGluZ1ZpZGVvT3B0aW9ucyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignYWxsJyk7XG4gIHJlY29yZGluZ1ZpZGVvVHlwZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignZnVsbERpc3BsYXknKTtcbiAgcmVjb3JkaW5nVmlkZW9PcHRpbWl6ZWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgcmVjb3JkaW5nRGlzcGxheVR5cGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PCd2aWRlbycgfCAnbWVkaWEnIHwgJ2FsbCc+KCd2aWRlbycpO1xuICByZWNvcmRpbmdBZGRITFMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KHRydWUpO1xuICByZWNvcmRpbmdOYW1lVGFncyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4odHJ1ZSk7XG4gIHJlY29yZGluZ0JhY2tncm91bmRDb2xvciA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignIzgzYzBlOScpO1xuICByZWNvcmRpbmdOYW1lVGFnc0NvbG9yID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcjZmZmZmZmJyk7XG4gIHJlY29yZGluZ0FkZFRleHQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgcmVjb3JkaW5nQ3VzdG9tVGV4dCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignQWRkIFRleHQnKTtcbiAgcmVjb3JkaW5nQ3VzdG9tVGV4dFBvc2l0aW9uID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCd0b3AnKTtcbiAgcmVjb3JkaW5nQ3VzdG9tVGV4dENvbG9yID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcjZmZmZmZmJyk7XG4gIHJlY29yZGluZ09yaWVudGF0aW9uVmlkZW8gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJ2xhbmRzY2FwZScpO1xuICBjbGVhcmVkVG9SZXN1bWUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KHRydWUpO1xuICBjbGVhcmVkVG9SZWNvcmQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KHRydWUpO1xuICByZWNvcmRTdGF0ZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignZ3JlZW4nKTtcbiAgc2hvd1JlY29yZEJ1dHRvbnMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgcmVjb3JkaW5nUHJvZ3Jlc3NUaW1lID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcwMDowMDowMCcpO1xuICBhdWRpb1N3aXRjaGluZyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICB2aWRlb1N3aXRjaGluZyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIC8vIE1lZGlhIFN0YXRlc1xuICB2aWRlb0FscmVhZHlPbiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBhdWRpb0FscmVhZHlPbiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIGNvbXBvbmVudFNpemVzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxDb21wb25lbnRTaXplcz4oe1xuICAgIG1haW5IZWlnaHQ6IDAsXG4gICAgb3RoZXJIZWlnaHQ6IDAsXG4gICAgbWFpbldpZHRoOiAwLFxuICAgIG90aGVyV2lkdGg6IDAsXG4gIH0pO1xuXG4gIC8vIFBlcm1pc3Npb25zXG4gIGhhc0NhbWVyYVBlcm1pc3Npb24gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgaGFzQXVkaW9QZXJtaXNzaW9uID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG5cbiAgLy8gVHJhbnNwb3J0c1xuICB0cmFuc3BvcnRDcmVhdGVkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHRyYW5zcG9ydENyZWF0ZWRWaWRlbyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICB0cmFuc3BvcnRDcmVhdGVkQXVkaW8gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgdHJhbnNwb3J0Q3JlYXRlZFNjcmVlbiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBwcm9kdWNlclRyYW5zcG9ydCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8VHJhbnNwb3J0IHwgbnVsbD4obnVsbCk7XG4gIHZpZGVvUHJvZHVjZXIgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFByb2R1Y2VyIHwgbnVsbD4obnVsbCk7XG4gIHBhcmFtcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UHJvZHVjZXJPcHRpb25zPih7fSBhcyBQcm9kdWNlck9wdGlvbnMpO1xuICB2aWRlb1BhcmFtcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UHJvZHVjZXJPcHRpb25zPih7fSBhcyBQcm9kdWNlck9wdGlvbnMpO1xuICBhdWRpb1BhcmFtcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UHJvZHVjZXJPcHRpb25zPih7fSBhcyBQcm9kdWNlck9wdGlvbnMpO1xuICBhdWRpb1Byb2R1Y2VyID0gbmV3IEJlaGF2aW9yU3ViamVjdDxQcm9kdWNlciB8IG51bGw+KG51bGwpO1xuICBjb25zdW1lclRyYW5zcG9ydHMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFRyYW5zcG9ydFR5cGVbXT4oW10pO1xuICBjb25zdW1pbmdUcmFuc3BvcnRzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmdbXT4oW10pO1xuXG4gIC8vIFBvbGxzXG4gIHBvbGxzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxQb2xsW10+KFtdKTtcbiAgcG9sbCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UG9sbCB8IG51bGw+KG51bGwpO1xuICBpc1BvbGxNb2RhbFZpc2libGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcblxuICAvLyBCYWNrZ3JvdW5kXG4gIGN1c3RvbUltYWdlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcbiAgc2VsZWN0ZWRJbWFnZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gIHNlZ21lbnRWaWRlbyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8TWVkaWFTdHJlYW0gfCBudWxsPihudWxsKTtcbiAgc2VsZmllU2VnbWVudGF0aW9uID0gbmV3IEJlaGF2aW9yU3ViamVjdDxTZWxmaWVTZWdtZW50YXRpb24gfCBudWxsPihudWxsKTtcbiAgcGF1c2VTZWdtZW50YXRpb24gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgcHJvY2Vzc2VkU3RyZWFtID0gbmV3IEJlaGF2aW9yU3ViamVjdDxNZWRpYVN0cmVhbSB8IG51bGw+KG51bGwpO1xuICBrZWVwQmFja2dyb3VuZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBiYWNrZ3JvdW5kSGFzQ2hhbmdlZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICB2aXJ0dWFsU3RyZWFtID0gbmV3IEJlaGF2aW9yU3ViamVjdDxNZWRpYVN0cmVhbSB8IG51bGw+KG51bGwpO1xuICBtYWluQ2FudmFzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxIVE1MQ2FudmFzRWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBwcmV2S2VlcEJhY2tncm91bmQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgYXBwbGllZEJhY2tncm91bmQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgaXNCYWNrZ3JvdW5kTW9kYWxWaXNpYmxlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGF1dG9DbGlja0JhY2tncm91bmQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcblxuICAvLyBCcmVha291dCBSb29tc1xuICBicmVha291dFJvb21zID0gbmV3IEJlaGF2aW9yU3ViamVjdDxCcmVha291dFBhcnRpY2lwYW50W11bXT4oW10pO1xuICBjdXJyZW50Um9vbUluZGV4ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICBjYW5TdGFydEJyZWFrb3V0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGJyZWFrT3V0Um9vbVN0YXJ0ZWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgYnJlYWtPdXRSb29tRW5kZWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgaG9zdE5ld1Jvb20gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oLTEpO1xuICBsaW1pdGVkQnJlYWtSb29tID0gbmV3IEJlaGF2aW9yU3ViamVjdDxCcmVha291dFBhcnRpY2lwYW50W10+KFtdKTtcbiAgbWFpblJvb21zTGVuZ3RoID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICBtZW1iZXJSb29tID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KC0xKTtcbiAgaXNCcmVha291dFJvb21zTW9kYWxWaXNpYmxlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG5cbiAgLy8gV2hpdGVib2FyZFxuICB3aGl0ZWJvYXJkVXNlcnMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFdoaXRlYm9hcmRVc2VyW10+KFtdKTtcbiAgY3VycmVudFdoaXRlYm9hcmRJbmRleCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgY2FuU3RhcnRXaGl0ZWJvYXJkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHdoaXRlYm9hcmRTdGFydGVkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHdoaXRlYm9hcmRFbmRlZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICB3aGl0ZWJvYXJkTGltaXQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oNCk7XG4gIGlzV2hpdGVib2FyZE1vZGFsVmlzaWJsZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBpc0NvbmZpZ3VyZVdoaXRlYm9hcmRNb2RhbFZpc2libGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgc2hhcGVzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxTaGFwZVtdPihbXSk7XG4gIHVzZUltYWdlQmFja2dyb3VuZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4odHJ1ZSk7XG4gIHJlZG9TdGFjayA9IG5ldyBCZWhhdmlvclN1YmplY3Q8U2hhcGVbXT4oW10pO1xuICB1bmRvU3RhY2sgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZ1tdPihbXSk7XG4gIGNhbnZhc1N0cmVhbSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8TWVkaWFTdHJlYW0gfCBudWxsPihudWxsKTtcbiAgY2FudmFzV2hpdGVib2FyZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8SFRNTENhbnZhc0VsZW1lbnQgfCBudWxsPihudWxsKTtcblxuICAvLyBTY3JlZW5ib2FyZFxuICBjYW52YXNTY3JlZW5ib2FyZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8SFRNTENhbnZhc0VsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgcHJvY2Vzc2VkU2NyZWVuU3RyZWFtID0gbmV3IEJlaGF2aW9yU3ViamVjdDxNZWRpYVN0cmVhbSB8IG51bGw+KG51bGwpO1xuICBhbm5vdGF0ZVNjcmVlblN0cmVhbSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBtYWluU2NyZWVuQ2FudmFzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxIVE1MQ2FudmFzRWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBpc1NjcmVlbmJvYXJkTW9kYWxWaXNpYmxlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG5cbiAgLy9zdGF0ZSB2YXJpYWJsZXMgZm9yIHRoZSBjb250cm9sIGJ1dHRvbnNcbiAgbWljQWN0aXZlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihcbiAgICB0aGlzLmF1ZGlvQWxyZWFkeU9uLnZhbHVlID8gdGhpcy5hdWRpb0FscmVhZHlPbi52YWx1ZSA6IGZhbHNlLFxuICApO1xuICB2aWRlb0FjdGl2ZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oXG4gICAgdGhpcy52aWRlb0FscmVhZHlPbi52YWx1ZSA/IHRoaXMudmlkZW9BbHJlYWR5T24udmFsdWUgOiBmYWxzZSxcbiAgKTtcbiAgc2NyZWVuU2hhcmVBY3RpdmUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgZW5kQ2FsbEFjdGl2ZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBwYXJ0aWNpcGFudHNBY3RpdmUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgbWVudUFjdGl2ZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBjb21tZW50c0FjdGl2ZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIC8vIFVwZGF0ZSBmdW5jdGlvbnNcbiAgdXBkYXRlTWVzc2FnZXMgPSAodmFsdWU6IE1lc3NhZ2VbXSkgPT4ge1xuICAgIHRoaXMubWVzc2FnZXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlU3RhcnREaXJlY3RNZXNzYWdlID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5zdGFydERpcmVjdE1lc3NhZ2UubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlRGlyZWN0TWVzc2FnZURldGFpbHMgPSAodmFsdWU6IFBhcnRpY2lwYW50IHwgbnVsbCkgPT4ge1xuICAgIHRoaXMuZGlyZWN0TWVzc2FnZURldGFpbHMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlU2hvd01lc3NhZ2VzQmFkZ2UgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnNob3dNZXNzYWdlc0JhZGdlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUF1ZGlvU2V0dGluZyA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5hdWRpb1NldHRpbmcubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlVmlkZW9TZXR0aW5nID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLnZpZGVvU2V0dGluZy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVTY3JlZW5zaGFyZVNldHRpbmcgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMuc2NyZWVuc2hhcmVTZXR0aW5nLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUNoYXRTZXR0aW5nID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLmNoYXRTZXR0aW5nLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZURpc3BsYXlPcHRpb24gPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMuZGlzcGxheU9wdGlvbi5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBdXRvV2F2ZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuYXV0b1dhdmUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlRm9yY2VGdWxsRGlzcGxheSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuZm9yY2VGdWxsRGlzcGxheS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVQcmV2Rm9yY2VGdWxsRGlzcGxheSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMucHJldkZvcmNlRnVsbERpc3BsYXkubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUHJldk1lZXRpbmdEaXNwbGF5VHlwZSA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5wcmV2TWVldGluZ0Rpc3BsYXlUeXBlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVdhaXRpbmdSb29tQ291bnRlciA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy53YWl0aW5nUm9vbUNvdW50ZXIubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlV2FpdGluZ1Jvb21GaWx0ZXIgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMud2FpdGluZ1Jvb21GaWx0ZXIubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlV2FpdGluZ1Jvb21MaXN0ID0gKHZhbHVlOiBXYWl0aW5nUm9vbVBhcnRpY2lwYW50W10pID0+IHtcbiAgICB0aGlzLndhaXRpbmdSb29tTGlzdC5uZXh0KHZhbHVlKTtcbiAgICB0aGlzLmZpbHRlcmVkV2FpdGluZ1Jvb21MaXN0Lm5leHQodmFsdWUpO1xuICAgIHRoaXMud2FpdGluZ1Jvb21Db3VudGVyLm5leHQodmFsdWUubGVuZ3RoKTtcbiAgfTtcblxuICBvbldhaXRpbmdSb29tQ2xvc2UgPSAoKSA9PiB7XG4gICAgdGhpcy51cGRhdGVJc1dhaXRpbmdNb2RhbFZpc2libGUoZmFsc2UpO1xuICB9O1xuXG4gIHVwZGF0ZVJlcXVlc3RDb3VudGVyID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLnJlcXVlc3RDb3VudGVyLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlcXVlc3RGaWx0ZXIgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMucmVxdWVzdEZpbHRlci5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZXF1ZXN0TGlzdCA9ICh2YWx1ZTogUmVxdWVzdFtdKSA9PiB7XG4gICAgdGhpcy5yZXF1ZXN0TGlzdC5uZXh0KHZhbHVlKTtcbiAgICB0aGlzLmZpbHRlcmVkUmVxdWVzdExpc3QubmV4dCh2YWx1ZSk7XG4gICAgdGhpcy5yZXF1ZXN0Q291bnRlci5uZXh0KHZhbHVlLmxlbmd0aCk7XG4gIH07XG5cbiAgb25SZXF1ZXN0Q2xvc2UgPSAoKSA9PiB7XG4gICAgdGhpcy51cGRhdGVJc1JlcXVlc3RzTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgfTtcblxuICB1cGRhdGVUb3RhbFJlcVdhaXQgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMudG90YWxSZXFXYWl0Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUFsZXJ0VmlzaWJsZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuYWxlcnRWaXNpYmxlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUFsZXJ0TWVzc2FnZSA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5hbGVydE1lc3NhZ2UubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQWxlcnRUeXBlID0gKHZhbHVlOiAnc3VjY2VzcycgfCAnZGFuZ2VyJykgPT4ge1xuICAgIHRoaXMuYWxlcnRUeXBlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUFsZXJ0RHVyYXRpb24gPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMuYWxlcnREdXJhdGlvbi5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVQcm9ncmVzc1RpbWVyVmlzaWJsZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMucHJvZ3Jlc3NUaW1lclZpc2libGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUHJvZ3Jlc3NUaW1lclZhbHVlID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLnByb2dyZXNzVGltZXJWYWx1ZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVJc01lbnVNb2RhbFZpc2libGUgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmlzTWVudU1vZGFsVmlzaWJsZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVJc1JlY29yZGluZ01vZGFsVmlzaWJsZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuaXNSZWNvcmRpbmdNb2RhbFZpc2libGUubmV4dCh2YWx1ZSk7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLnVwZGF0ZUNvbmZpcm1lZFRvUmVjb3JkKGZhbHNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKFxuICAgICAgICB0aGlzLmNsZWFyZWRUb1JlY29yZC5nZXRWYWx1ZSgpICYmXG4gICAgICAgIHRoaXMuY2xlYXJlZFRvUmVzdW1lLmdldFZhbHVlKCkgJiZcbiAgICAgICAgdGhpcy5yZWNvcmRTdGFydGVkLmdldFZhbHVlKClcbiAgICAgICkge1xuICAgICAgICB0aGlzLnVwZGF0ZVNob3dSZWNvcmRCdXR0b25zKHRydWUpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICB1cGRhdGVJc1NldHRpbmdzTW9kYWxWaXNpYmxlID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5pc1NldHRpbmdzTW9kYWxWaXNpYmxlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUlzUmVxdWVzdHNNb2RhbFZpc2libGUgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmlzUmVxdWVzdHNNb2RhbFZpc2libGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlSXNXYWl0aW5nTW9kYWxWaXNpYmxlID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5pc1dhaXRpbmdNb2RhbFZpc2libGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlSXNDb0hvc3RNb2RhbFZpc2libGUgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmlzQ29Ib3N0TW9kYWxWaXNpYmxlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUlzTWVkaWFTZXR0aW5nc01vZGFsVmlzaWJsZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuaXNNZWRpYVNldHRpbmdzTW9kYWxWaXNpYmxlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUlzRGlzcGxheVNldHRpbmdzTW9kYWxWaXNpYmxlID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5pc0Rpc3BsYXlTZXR0aW5nc01vZGFsVmlzaWJsZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVJc1BhcnRpY2lwYW50c01vZGFsVmlzaWJsZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuaXNQYXJ0aWNpcGFudHNNb2RhbFZpc2libGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlSXNNZXNzYWdlc01vZGFsVmlzaWJsZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuaXNNZXNzYWdlc01vZGFsVmlzaWJsZS5uZXh0KHZhbHVlKTtcbiAgICBpZiAoIXZhbHVlKSB7XG4gICAgICB0aGlzLnVwZGF0ZVNob3dNZXNzYWdlc0JhZGdlKGZhbHNlKTtcbiAgICB9XG4gIH07XG5cbiAgdXBkYXRlSXNDb25maXJtRXhpdE1vZGFsVmlzaWJsZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuaXNDb25maXJtRXhpdE1vZGFsVmlzaWJsZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVJc0NvbmZpcm1IZXJlTW9kYWxWaXNpYmxlID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5pc0NvbmZpcm1IZXJlTW9kYWxWaXNpYmxlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUlzTG9hZGluZ01vZGFsVmlzaWJsZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuaXNMb2FkaW5nTW9kYWxWaXNpYmxlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUlzU2hhcmVFdmVudE1vZGFsVmlzaWJsZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuaXNTaGFyZUV2ZW50TW9kYWxWaXNpYmxlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ01lZGlhT3B0aW9ucyA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdNZWRpYU9wdGlvbnMubmV4dCh2YWx1ZSk7XG4gICAgdGhpcy5jbGVhcmVkVG9SZWNvcmQubmV4dChmYWxzZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nQXVkaW9PcHRpb25zID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ0F1ZGlvT3B0aW9ucy5uZXh0KHZhbHVlKTtcbiAgICB0aGlzLmNsZWFyZWRUb1JlY29yZC5uZXh0KGZhbHNlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRpbmdWaWRlb09wdGlvbnMgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMucmVjb3JkaW5nVmlkZW9PcHRpb25zLm5leHQodmFsdWUpO1xuICAgIHRoaXMuY2xlYXJlZFRvUmVjb3JkLm5leHQoZmFsc2UpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ1ZpZGVvVHlwZSA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdWaWRlb1R5cGUubmV4dCh2YWx1ZSk7XG4gICAgdGhpcy5jbGVhcmVkVG9SZWNvcmQubmV4dChmYWxzZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nVmlkZW9PcHRpbWl6ZWQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ1ZpZGVvT3B0aW1pemVkLm5leHQodmFsdWUpO1xuICAgIHRoaXMuY2xlYXJlZFRvUmVjb3JkLm5leHQoZmFsc2UpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ0Rpc3BsYXlUeXBlID0gKHZhbHVlOiAndmlkZW8nIHwgJ21lZGlhJyB8ICdhbGwnKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdEaXNwbGF5VHlwZS5uZXh0KHZhbHVlKTtcbiAgICB0aGlzLmNsZWFyZWRUb1JlY29yZC5uZXh0KGZhbHNlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRpbmdBZGRITFMgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ0FkZEhMUy5uZXh0KHZhbHVlKTtcbiAgICB0aGlzLmNsZWFyZWRUb1JlY29yZC5uZXh0KGZhbHNlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRpbmdBZGRUZXh0ID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdBZGRUZXh0Lm5leHQodmFsdWUpO1xuICAgIHRoaXMuY2xlYXJlZFRvUmVjb3JkLm5leHQoZmFsc2UpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ0N1c3RvbVRleHQgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMucmVjb3JkaW5nQ3VzdG9tVGV4dC5uZXh0KHZhbHVlKTtcbiAgICB0aGlzLmNsZWFyZWRUb1JlY29yZC5uZXh0KGZhbHNlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRpbmdDdXN0b21UZXh0UG9zaXRpb24gPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMucmVjb3JkaW5nQ3VzdG9tVGV4dFBvc2l0aW9uLm5leHQodmFsdWUpO1xuICAgIHRoaXMuY2xlYXJlZFRvUmVjb3JkLm5leHQoZmFsc2UpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ0N1c3RvbVRleHRDb2xvciA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdDdXN0b21UZXh0Q29sb3IubmV4dCh2YWx1ZSk7XG4gICAgdGhpcy5jbGVhcmVkVG9SZWNvcmQubmV4dChmYWxzZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nTmFtZVRhZ3MgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ05hbWVUYWdzLm5leHQodmFsdWUpO1xuICAgIHRoaXMuY2xlYXJlZFRvUmVjb3JkLm5leHQoZmFsc2UpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ0JhY2tncm91bmRDb2xvciA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdCYWNrZ3JvdW5kQ29sb3IubmV4dCh2YWx1ZSk7XG4gICAgdGhpcy5jbGVhcmVkVG9SZWNvcmQubmV4dChmYWxzZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nTmFtZVRhZ3NDb2xvciA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdOYW1lVGFnc0NvbG9yLm5leHQodmFsdWUpO1xuICAgIHRoaXMuY2xlYXJlZFRvUmVjb3JkLm5leHQoZmFsc2UpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ09yaWVudGF0aW9uVmlkZW8gPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMucmVjb3JkaW5nT3JpZW50YXRpb25WaWRlby5uZXh0KHZhbHVlKTtcbiAgICB0aGlzLmNsZWFyZWRUb1JlY29yZC5uZXh0KGZhbHNlKTtcbiAgfTtcblxuICB1cGRhdGVDbGVhcmVkVG9SZXN1bWUgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmNsZWFyZWRUb1Jlc3VtZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVDbGVhcmVkVG9SZWNvcmQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmNsZWFyZWRUb1JlY29yZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRTdGF0ZSA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgaWYgKHRoaXMucmVjb3JkU3RhcnRlZC52YWx1ZSAmJiAhdGhpcy5yZWNvcmRTdG9wcGVkLnZhbHVlKSB7XG4gICAgICBpZiAoIXRoaXMucmVjb3JkUGF1c2VkLnZhbHVlKSB7XG4gICAgICAgIHRoaXMucmVjb3JkU3RhdGUubmV4dCgncmVkJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJlY29yZFN0YXRlLm5leHQoJ3llbGxvdycpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlY29yZFN0YXRlLm5leHQodmFsdWUpO1xuICAgIH1cbiAgICB0aGlzLnJlY29yZFN0YXRlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVNob3dSZWNvcmRCdXR0b25zID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5zaG93UmVjb3JkQnV0dG9ucy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRpbmdQcm9ncmVzc1RpbWUgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMucmVjb3JkaW5nUHJvZ3Jlc3NUaW1lLm5leHQodmFsdWUpO1xuICAgIHRoaXMudXBkYXRlUmVjb3JkVGltZXJXaWRnZXQoKTtcbiAgfTtcblxuICB1cGRhdGVBdWRpb1N3aXRjaGluZyA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuYXVkaW9Td2l0Y2hpbmcubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlVmlkZW9Td2l0Y2hpbmcgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnZpZGVvU3dpdGNoaW5nLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVZpZGVvQWxyZWFkeU9uID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy52aWRlb0FscmVhZHlPbi5uZXh0KHZhbHVlKTtcbiAgICB0aGlzLnZpZGVvQWN0aXZlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUF1ZGlvQWxyZWFkeU9uID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5hdWRpb0FscmVhZHlPbi5uZXh0KHZhbHVlKTtcbiAgICB0aGlzLm1pY0FjdGl2ZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVDb21wb25lbnRTaXplcyA9IChzaXplczogQ29tcG9uZW50U2l6ZXMpID0+IHtcbiAgICB0aGlzLmNvbXBvbmVudFNpemVzLm5leHQoc2l6ZXMpO1xuICB9O1xuXG4gIHVwZGF0ZUhhc0NhbWVyYVBlcm1pc3Npb24gPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmhhc0NhbWVyYVBlcm1pc3Npb24ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlSGFzQXVkaW9QZXJtaXNzaW9uID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5oYXNBdWRpb1Blcm1pc3Npb24ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgcmVxdWVzdFBlcm1pc3Npb25DYW1lcmEoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAvLyBJbXBsZW1lbnQgdGhlIHJlcXVlc3QgcGVybWlzc2lvbiBsb2dpYyBoZXJlXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgnZ3JhbnRlZCcpO1xuICB9XG5cbiAgcmVxdWVzdFBlcm1pc3Npb25BdWRpbygpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIC8vIEltcGxlbWVudCB0aGUgcmVxdWVzdCBwZXJtaXNzaW9uIGxvZ2ljIGhlcmVcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCdncmFudGVkJyk7XG4gIH1cblxuICB1cGRhdGVUcmFuc3BvcnRDcmVhdGVkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy50cmFuc3BvcnRDcmVhdGVkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVRyYW5zcG9ydENyZWF0ZWRWaWRlbyA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMudHJhbnNwb3J0Q3JlYXRlZFZpZGVvLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVRyYW5zcG9ydENyZWF0ZWRBdWRpbyA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMudHJhbnNwb3J0Q3JlYXRlZEF1ZGlvLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVRyYW5zcG9ydENyZWF0ZWRTY3JlZW4gPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnRyYW5zcG9ydENyZWF0ZWRTY3JlZW4ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUHJvZHVjZXJUcmFuc3BvcnQgPSAodmFsdWU6IFRyYW5zcG9ydCB8IG51bGwpID0+IHtcbiAgICB0aGlzLnByb2R1Y2VyVHJhbnNwb3J0Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVZpZGVvUHJvZHVjZXIgPSAodmFsdWU6IFByb2R1Y2VyIHwgbnVsbCkgPT4ge1xuICAgIHRoaXMudmlkZW9Qcm9kdWNlci5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVQYXJhbXMgPSAodmFsdWU6IFByb2R1Y2VyT3B0aW9ucykgPT4ge1xuICAgIHRoaXMucGFyYW1zLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVZpZGVvUGFyYW1zID0gKHZhbHVlOiBQcm9kdWNlck9wdGlvbnMpID0+IHtcbiAgICB0aGlzLnZpZGVvUGFyYW1zLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUF1ZGlvUGFyYW1zID0gKHZhbHVlOiBQcm9kdWNlck9wdGlvbnMpID0+IHtcbiAgICB0aGlzLmF1ZGlvUGFyYW1zLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUF1ZGlvUHJvZHVjZXIgPSAodmFsdWU6IFByb2R1Y2VyIHwgbnVsbCkgPT4ge1xuICAgIHRoaXMuYXVkaW9Qcm9kdWNlci5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVDb25zdW1lclRyYW5zcG9ydHMgPSAodmFsdWU6IFRyYW5zcG9ydFR5cGVbXSkgPT4ge1xuICAgIHRoaXMuY29uc3VtZXJUcmFuc3BvcnRzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUNvbnN1bWluZ1RyYW5zcG9ydHMgPSAodmFsdWU6IHN0cmluZ1tdKSA9PiB7XG4gICAgdGhpcy5jb25zdW1pbmdUcmFuc3BvcnRzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVBvbGxzID0gKHZhbHVlOiBQb2xsW10pID0+IHtcbiAgICB0aGlzLnBvbGxzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVBvbGwgPSAodmFsdWU6IFBvbGwgfCBudWxsKSA9PiB7XG4gICAgdGhpcy5wb2xsLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUlzUG9sbE1vZGFsVmlzaWJsZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuaXNQb2xsTW9kYWxWaXNpYmxlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUN1c3RvbUltYWdlID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLmN1c3RvbUltYWdlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVNlbGVjdGVkSW1hZ2UgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMuc2VsZWN0ZWRJbWFnZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVTZWdtZW50VmlkZW8gPSAodmFsdWU6IE1lZGlhU3RyZWFtIHwgbnVsbCkgPT4ge1xuICAgIHRoaXMuc2VnbWVudFZpZGVvLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVNlbGZpZVNlZ21lbnRhdGlvbiA9ICh2YWx1ZTogU2VsZmllU2VnbWVudGF0aW9uIHwgbnVsbCkgPT4ge1xuICAgIHRoaXMuc2VsZmllU2VnbWVudGF0aW9uLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVBhdXNlU2VnbWVudGF0aW9uID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5wYXVzZVNlZ21lbnRhdGlvbi5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVQcm9jZXNzZWRTdHJlYW0gPSAodmFsdWU6IE1lZGlhU3RyZWFtIHwgbnVsbCkgPT4ge1xuICAgIHRoaXMucHJvY2Vzc2VkU3RyZWFtLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUtlZXBCYWNrZ3JvdW5kID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5rZWVwQmFja2dyb3VuZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVCYWNrZ3JvdW5kSGFzQ2hhbmdlZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuYmFja2dyb3VuZEhhc0NoYW5nZWQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlVmlydHVhbFN0cmVhbSA9ICh2YWx1ZTogTWVkaWFTdHJlYW0gfCBudWxsKSA9PiB7XG4gICAgdGhpcy52aXJ0dWFsU3RyZWFtLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZU1haW5DYW52YXMgPSAodmFsdWU6IEhUTUxDYW52YXNFbGVtZW50IHwgbnVsbCkgPT4ge1xuICAgIHRoaXMubWFpbkNhbnZhcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVQcmV2S2VlcEJhY2tncm91bmQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnByZXZLZWVwQmFja2dyb3VuZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBcHBsaWVkQmFja2dyb3VuZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuYXBwbGllZEJhY2tncm91bmQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlSXNCYWNrZ3JvdW5kTW9kYWxWaXNpYmxlID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5pc0JhY2tncm91bmRNb2RhbFZpc2libGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQXV0b0NsaWNrQmFja2dyb3VuZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuYXV0b0NsaWNrQmFja2dyb3VuZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVCcmVha291dFJvb21zID0gKHZhbHVlOiBCcmVha291dFBhcnRpY2lwYW50W11bXSkgPT4ge1xuICAgIHRoaXMuYnJlYWtvdXRSb29tcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVDdXJyZW50Um9vbUluZGV4ID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLmN1cnJlbnRSb29tSW5kZXgubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQ2FuU3RhcnRCcmVha291dCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuY2FuU3RhcnRCcmVha291dC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVCcmVha091dFJvb21TdGFydGVkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5icmVha091dFJvb21TdGFydGVkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUJyZWFrT3V0Um9vbUVuZGVkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5icmVha091dFJvb21FbmRlZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVIb3N0TmV3Um9vbSA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5ob3N0TmV3Um9vbS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVMaW1pdGVkQnJlYWtSb29tID0gKHZhbHVlOiBCcmVha291dFBhcnRpY2lwYW50W10pID0+IHtcbiAgICB0aGlzLmxpbWl0ZWRCcmVha1Jvb20ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTWFpblJvb21zTGVuZ3RoID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLm1haW5Sb29tc0xlbmd0aC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVNZW1iZXJSb29tID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLm1lbWJlclJvb20ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlSXNCcmVha291dFJvb21zTW9kYWxWaXNpYmxlID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5pc0JyZWFrb3V0Um9vbXNNb2RhbFZpc2libGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlV2hpdGVib2FyZFVzZXJzID0gKHZhbHVlOiBXaGl0ZWJvYXJkVXNlcltdKSA9PiB7XG4gICAgdGhpcy53aGl0ZWJvYXJkVXNlcnMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQ3VycmVudFdoaXRlYm9hcmRJbmRleCA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5jdXJyZW50V2hpdGVib2FyZEluZGV4Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUNhblN0YXJ0V2hpdGVib2FyZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuY2FuU3RhcnRXaGl0ZWJvYXJkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVdoaXRlYm9hcmRTdGFydGVkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy53aGl0ZWJvYXJkU3RhcnRlZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVXaGl0ZWJvYXJkRW5kZWQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLndoaXRlYm9hcmRFbmRlZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVXaGl0ZWJvYXJkTGltaXQgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMud2hpdGVib2FyZExpbWl0Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUlzV2hpdGVib2FyZE1vZGFsVmlzaWJsZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuaXNXaGl0ZWJvYXJkTW9kYWxWaXNpYmxlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUlzQ29uZmlndXJlV2hpdGVib2FyZE1vZGFsVmlzaWJsZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuaXNDb25maWd1cmVXaGl0ZWJvYXJkTW9kYWxWaXNpYmxlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVNoYXBlcyA9ICh2YWx1ZTogU2hhcGVbXSkgPT4ge1xuICAgIHRoaXMuc2hhcGVzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVVzZUltYWdlQmFja2dyb3VuZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMudXNlSW1hZ2VCYWNrZ3JvdW5kLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlZG9TdGFjayA9ICh2YWx1ZTogU2hhcGVbXSkgPT4ge1xuICAgIHRoaXMucmVkb1N0YWNrLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVVuZG9TdGFjayA9ICh2YWx1ZTogc3RyaW5nW10pID0+IHtcbiAgICB0aGlzLnVuZG9TdGFjay5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVDYW52YXNTdHJlYW0gPSAodmFsdWU6IE1lZGlhU3RyZWFtIHwgbnVsbCkgPT4ge1xuICAgIHRoaXMuY2FudmFzU3RyZWFtLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUNhbnZhc1doaXRlYm9hcmQgPSAodmFsdWU6IEhUTUxDYW52YXNFbGVtZW50IHwgbnVsbCkgPT4ge1xuICAgIHRoaXMuY2FudmFzV2hpdGVib2FyZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVDYW52YXNTY3JlZW5ib2FyZCA9ICh2YWx1ZTogSFRNTENhbnZhc0VsZW1lbnQgfCBudWxsKSA9PiB7XG4gICAgdGhpcy5jYW52YXNTY3JlZW5ib2FyZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVQcm9jZXNzZWRTY3JlZW5TdHJlYW0gPSAodmFsdWU6IE1lZGlhU3RyZWFtIHwgbnVsbCkgPT4ge1xuICAgIHRoaXMucHJvY2Vzc2VkU2NyZWVuU3RyZWFtLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUFubm90YXRlU2NyZWVuU3RyZWFtID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5hbm5vdGF0ZVNjcmVlblN0cmVhbS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVNYWluU2NyZWVuQ2FudmFzID0gKHZhbHVlOiBIVE1MQ2FudmFzRWxlbWVudCB8IG51bGwpID0+IHtcbiAgICB0aGlzLm1haW5TY3JlZW5DYW52YXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlSXNTY3JlZW5ib2FyZE1vZGFsVmlzaWJsZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuaXNTY3JlZW5ib2FyZE1vZGFsVmlzaWJsZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICBjaGVja09yaWVudGF0aW9uID0gKCkgPT4ge1xuICAgIGNvbnN0IGlzUG9ydHJhaXQgPSB3aW5kb3cubWF0Y2hNZWRpYSgnKG9yaWVudGF0aW9uOiBwb3J0cmFpdCknKS5tYXRjaGVzO1xuICAgIHJldHVybiBpc1BvcnRyYWl0ID8gJ3BvcnRyYWl0JyA6ICdsYW5kc2NhcGUnO1xuICB9O1xuXG4gIHNob3dBbGVydCA9ICh7XG4gICAgbWVzc2FnZSxcbiAgICB0eXBlLFxuICAgIGR1cmF0aW9uID0gMzAwMCxcbiAgfToge1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICB0eXBlOiAnc3VjY2VzcycgfCAnZGFuZ2VyJztcbiAgICBkdXJhdGlvbj86IG51bWJlcjtcbiAgfSkgPT4ge1xuICAgIHRoaXMudXBkYXRlQWxlcnRNZXNzYWdlKG1lc3NhZ2UpO1xuICAgIHRoaXMudXBkYXRlQWxlcnRUeXBlKHR5cGUpO1xuICAgIHRoaXMudXBkYXRlQWxlcnREdXJhdGlvbihkdXJhdGlvbik7XG4gICAgdGhpcy51cGRhdGVBbGVydFZpc2libGUodHJ1ZSk7XG4gIH07XG5cbiAgZ2V0QWxsUGFyYW1zKCkge1xuICAgIHJldHVybiB7XG4gICAgICBsb2NhbFVJTW9kZTogdGhpcy5sb2NhbFVJTW9kZS52YWx1ZSwgLy8gTG9jYWwgVUkgbW9kZVxuXG4gICAgICAvLyBSb29tIERldGFpbHNcbiAgICAgIHJvb21OYW1lOiB0aGlzLnJvb21OYW1lLnZhbHVlLFxuICAgICAgbWVtYmVyOiB0aGlzLm1lbWJlci52YWx1ZSxcbiAgICAgIGFkbWluUGFzc2NvZGU6IHRoaXMuYWRtaW5QYXNzY29kZS52YWx1ZSxcbiAgICAgIHlvdUFyZUNvSG9zdDogdGhpcy55b3VBcmVDb0hvc3QudmFsdWUsXG4gICAgICB5b3VBcmVIb3N0OiB0aGlzLnlvdUFyZUhvc3QudmFsdWUsXG4gICAgICBpc2xldmVsOiB0aGlzLmlzbGV2ZWwudmFsdWUsXG4gICAgICBjb25maXJtZWRUb1JlY29yZDogdGhpcy5jb25maXJtZWRUb1JlY29yZC52YWx1ZSxcbiAgICAgIG1lZXRpbmdEaXNwbGF5VHlwZTogdGhpcy5tZWV0aW5nRGlzcGxheVR5cGUudmFsdWUsXG4gICAgICBtZWV0aW5nVmlkZW9PcHRpbWl6ZWQ6IHRoaXMubWVldGluZ1ZpZGVvT3B0aW1pemVkLnZhbHVlLFxuICAgICAgZXZlbnRUeXBlOiB0aGlzLmV2ZW50VHlwZS52YWx1ZSxcbiAgICAgIHBhcnRpY2lwYW50czogdGhpcy5wYXJ0aWNpcGFudHMudmFsdWUsXG4gICAgICBmaWx0ZXJlZFBhcnRpY2lwYW50czogdGhpcy5maWx0ZXJlZFBhcnRpY2lwYW50cy52YWx1ZSxcbiAgICAgIHBhcnRpY2lwYW50c0NvdW50ZXI6IHRoaXMucGFydGljaXBhbnRzQ291bnRlci52YWx1ZSxcbiAgICAgIHBhcnRpY2lwYW50c0ZpbHRlcjogdGhpcy5wYXJ0aWNpcGFudHNGaWx0ZXIudmFsdWUsXG5cbiAgICAgIC8vIE1vcmUgcm9vbSBkZXRhaWxzIC0gbWVkaWFcbiAgICAgIGNvbnN1bWVfc29ja2V0czogdGhpcy5jb25zdW1lX3NvY2tldHMudmFsdWUsXG4gICAgICBydHBDYXBhYmlsaXRpZXM6IHRoaXMucnRwQ2FwYWJpbGl0aWVzLnZhbHVlLFxuICAgICAgcm9vbVJlY3ZJUHM6IHRoaXMucm9vbVJlY3ZJUHMudmFsdWUsXG4gICAgICBtZWV0aW5nUm9vbVBhcmFtczogdGhpcy5tZWV0aW5nUm9vbVBhcmFtcy52YWx1ZSxcbiAgICAgIGl0ZW1QYWdlTGltaXQ6IHRoaXMuaXRlbVBhZ2VMaW1pdC52YWx1ZSxcbiAgICAgIGF1ZGlvT25seVJvb206IHRoaXMuYXVkaW9Pbmx5Um9vbS52YWx1ZSxcbiAgICAgIGFkZEZvckJhc2ljOiB0aGlzLmFkZEZvckJhc2ljLnZhbHVlLFxuICAgICAgc2NyZWVuUGFnZUxpbWl0OiB0aGlzLnNjcmVlblBhZ2VMaW1pdC52YWx1ZSxcbiAgICAgIHNoYXJlU2NyZWVuU3RhcnRlZDogdGhpcy5zaGFyZVNjcmVlblN0YXJ0ZWQudmFsdWUsXG4gICAgICBzaGFyZWQ6IHRoaXMuc2hhcmVkLnZhbHVlLFxuICAgICAgdGFyZ2V0T3JpZW50YXRpb246IHRoaXMudGFyZ2V0T3JpZW50YXRpb24udmFsdWUsXG4gICAgICB0YXJnZXRSZXNvbHV0aW9uOiB0aGlzLnRhcmdldFJlc29sdXRpb24udmFsdWUsXG4gICAgICB0YXJnZXRSZXNvbHV0aW9uSG9zdDogdGhpcy50YXJnZXRSZXNvbHV0aW9uSG9zdC52YWx1ZSxcbiAgICAgIHZpZENvbnM6IHRoaXMudmlkQ29ucy52YWx1ZSxcbiAgICAgIGZyYW1lUmF0ZTogdGhpcy5mcmFtZVJhdGUudmFsdWUsXG4gICAgICBoUGFyYW1zOiB0aGlzLmhQYXJhbXMudmFsdWUsXG4gICAgICB2UGFyYW1zOiB0aGlzLnZQYXJhbXMudmFsdWUsXG4gICAgICBzY3JlZW5QYXJhbXM6IHRoaXMuc2NyZWVuUGFyYW1zLnZhbHVlLFxuICAgICAgYVBhcmFtczogdGhpcy5hUGFyYW1zLnZhbHVlLFxuXG4gICAgICAvLyBNb3JlIHJvb20gZGV0YWlscyAtIHJlY29yZGluZ1xuICAgICAgcmVjb3JkaW5nQXVkaW9QYXVzZXNMaW1pdDogdGhpcy5yZWNvcmRpbmdBdWRpb1BhdXNlc0xpbWl0LnZhbHVlLFxuICAgICAgcmVjb3JkaW5nQXVkaW9QYXVzZXNDb3VudDogdGhpcy5yZWNvcmRpbmdBdWRpb1BhdXNlc0NvdW50LnZhbHVlLFxuICAgICAgcmVjb3JkaW5nQXVkaW9TdXBwb3J0OiB0aGlzLnJlY29yZGluZ0F1ZGlvU3VwcG9ydC52YWx1ZSxcbiAgICAgIHJlY29yZGluZ0F1ZGlvUGVvcGxlTGltaXQ6IHRoaXMucmVjb3JkaW5nQXVkaW9QZW9wbGVMaW1pdC52YWx1ZSxcbiAgICAgIHJlY29yZGluZ0F1ZGlvUGFydGljaXBhbnRzVGltZUxpbWl0OiB0aGlzLnJlY29yZGluZ0F1ZGlvUGFydGljaXBhbnRzVGltZUxpbWl0LnZhbHVlLFxuICAgICAgcmVjb3JkaW5nVmlkZW9QYXVzZXNDb3VudDogdGhpcy5yZWNvcmRpbmdWaWRlb1BhdXNlc0NvdW50LnZhbHVlLFxuICAgICAgcmVjb3JkaW5nVmlkZW9QYXVzZXNMaW1pdDogdGhpcy5yZWNvcmRpbmdWaWRlb1BhdXNlc0xpbWl0LnZhbHVlLFxuICAgICAgcmVjb3JkaW5nVmlkZW9TdXBwb3J0OiB0aGlzLnJlY29yZGluZ1ZpZGVvU3VwcG9ydC52YWx1ZSxcbiAgICAgIHJlY29yZGluZ1ZpZGVvUGVvcGxlTGltaXQ6IHRoaXMucmVjb3JkaW5nVmlkZW9QZW9wbGVMaW1pdC52YWx1ZSxcbiAgICAgIHJlY29yZGluZ1ZpZGVvUGFydGljaXBhbnRzVGltZUxpbWl0OiB0aGlzLnJlY29yZGluZ1ZpZGVvUGFydGljaXBhbnRzVGltZUxpbWl0LnZhbHVlLFxuICAgICAgcmVjb3JkaW5nQWxsUGFydGljaXBhbnRzU3VwcG9ydDogdGhpcy5yZWNvcmRpbmdBbGxQYXJ0aWNpcGFudHNTdXBwb3J0LnZhbHVlLFxuICAgICAgcmVjb3JkaW5nVmlkZW9QYXJ0aWNpcGFudHNTdXBwb3J0OiB0aGlzLnJlY29yZGluZ1ZpZGVvUGFydGljaXBhbnRzU3VwcG9ydC52YWx1ZSxcbiAgICAgIHJlY29yZGluZ0FsbFBhcnRpY2lwYW50c0Z1bGxSb29tU3VwcG9ydDogdGhpcy5yZWNvcmRpbmdBbGxQYXJ0aWNpcGFudHNGdWxsUm9vbVN1cHBvcnQudmFsdWUsXG4gICAgICByZWNvcmRpbmdWaWRlb1BhcnRpY2lwYW50c0Z1bGxSb29tU3VwcG9ydDpcbiAgICAgICAgdGhpcy5yZWNvcmRpbmdWaWRlb1BhcnRpY2lwYW50c0Z1bGxSb29tU3VwcG9ydC52YWx1ZSxcbiAgICAgIHJlY29yZGluZ1ByZWZlcnJlZE9yaWVudGF0aW9uOiB0aGlzLnJlY29yZGluZ1ByZWZlcnJlZE9yaWVudGF0aW9uLnZhbHVlLFxuICAgICAgcmVjb3JkaW5nU3VwcG9ydEZvck90aGVyT3JpZW50YXRpb246IHRoaXMucmVjb3JkaW5nU3VwcG9ydEZvck90aGVyT3JpZW50YXRpb24udmFsdWUsXG4gICAgICByZWNvcmRpbmdNdWx0aUZvcm1hdHNTdXBwb3J0OiB0aGlzLnJlY29yZGluZ011bHRpRm9ybWF0c1N1cHBvcnQudmFsdWUsXG5cbiAgICAgIHVzZXJSZWNvcmRpbmdQYXJhbXM6IHRoaXMudXNlclJlY29yZGluZ1BhcmFtcy52YWx1ZSxcbiAgICAgIGNhblJlY29yZDogdGhpcy5jYW5SZWNvcmQudmFsdWUsXG4gICAgICBzdGFydFJlcG9ydDogdGhpcy5zdGFydFJlcG9ydC52YWx1ZSxcbiAgICAgIGVuZFJlcG9ydDogdGhpcy5lbmRSZXBvcnQudmFsdWUsXG4gICAgICByZWNvcmRTdGFydFRpbWU6IHRoaXMucmVjb3JkU3RhcnRUaW1lLnZhbHVlLFxuICAgICAgcmVjb3JkRWxhcHNlZFRpbWU6IHRoaXMucmVjb3JkRWxhcHNlZFRpbWUudmFsdWUsXG4gICAgICBpc1RpbWVyUnVubmluZzogdGhpcy5pc1RpbWVyUnVubmluZy52YWx1ZSxcbiAgICAgIGNhblBhdXNlUmVzdW1lOiB0aGlzLmNhblBhdXNlUmVzdW1lLnZhbHVlLFxuICAgICAgcmVjb3JkQ2hhbmdlU2Vjb25kczogdGhpcy5yZWNvcmRDaGFuZ2VTZWNvbmRzLnZhbHVlLFxuICAgICAgcGF1c2VMaW1pdDogdGhpcy5wYXVzZUxpbWl0LnZhbHVlLFxuICAgICAgcGF1c2VSZWNvcmRDb3VudDogdGhpcy5wYXVzZVJlY29yZENvdW50LnZhbHVlLFxuICAgICAgY2FuTGF1bmNoUmVjb3JkOiB0aGlzLmNhbkxhdW5jaFJlY29yZC52YWx1ZSxcbiAgICAgIHN0b3BMYXVuY2hSZWNvcmQ6IHRoaXMuc3RvcExhdW5jaFJlY29yZC52YWx1ZSxcblxuICAgICAgcGFydGljaXBhbnRzQWxsOiB0aGlzLnBhcnRpY2lwYW50c0FsbC52YWx1ZSxcblxuICAgICAgZmlyc3RBbGw6IHRoaXMuZmlyc3RBbGwudmFsdWUsXG4gICAgICB1cGRhdGVNYWluV2luZG93OiB0aGlzLnVwZGF0ZU1haW5XaW5kb3cudmFsdWUsXG4gICAgICBmaXJzdF9yb3VuZDogdGhpcy5maXJzdF9yb3VuZC52YWx1ZSxcbiAgICAgIGxhbmRTY2FwZWQ6IHRoaXMubGFuZFNjYXBlZC52YWx1ZSxcbiAgICAgIGxvY2tfc2NyZWVuOiB0aGlzLmxvY2tfc2NyZWVuLnZhbHVlLFxuICAgICAgc2NyZWVuSWQ6IHRoaXMuc2NyZWVuSWQudmFsdWUsXG4gICAgICBhbGxWaWRlb1N0cmVhbXM6IHRoaXMuYWxsVmlkZW9TdHJlYW1zLnZhbHVlLFxuICAgICAgbmV3TGltaXRlZFN0cmVhbXM6IHRoaXMubmV3TGltaXRlZFN0cmVhbXMudmFsdWUsXG4gICAgICBuZXdMaW1pdGVkU3RyZWFtc0lEczogdGhpcy5uZXdMaW1pdGVkU3RyZWFtc0lEcy52YWx1ZSxcbiAgICAgIGFjdGl2ZVNvdW5kczogdGhpcy5hY3RpdmVTb3VuZHMudmFsdWUsXG4gICAgICBzY3JlZW5TaGFyZUlEU3RyZWFtOiB0aGlzLnNjcmVlblNoYXJlSURTdHJlYW0udmFsdWUsXG4gICAgICBzY3JlZW5TaGFyZU5hbWVTdHJlYW06IHRoaXMuc2NyZWVuU2hhcmVOYW1lU3RyZWFtLnZhbHVlLFxuICAgICAgYWRtaW5JRFN0cmVhbTogdGhpcy5hZG1pbklEU3RyZWFtLnZhbHVlLFxuICAgICAgYWRtaW5OYW1lU3RyZWFtOiB0aGlzLmFkbWluTmFtZVN0cmVhbS52YWx1ZSxcbiAgICAgIHlvdVlvdVN0cmVhbTogdGhpcy55b3VZb3VTdHJlYW0udmFsdWUsXG4gICAgICB5b3VZb3VTdHJlYW1JRHM6IHRoaXMueW91WW91U3RyZWFtSURzLnZhbHVlLFxuICAgICAgbG9jYWxTdHJlYW06IHRoaXMubG9jYWxTdHJlYW0udmFsdWUsXG4gICAgICByZWNvcmRTdGFydGVkOiB0aGlzLnJlY29yZFN0YXJ0ZWQudmFsdWUsXG4gICAgICByZWNvcmRSZXN1bWVkOiB0aGlzLnJlY29yZFJlc3VtZWQudmFsdWUsXG4gICAgICByZWNvcmRQYXVzZWQ6IHRoaXMucmVjb3JkUGF1c2VkLnZhbHVlLFxuICAgICAgcmVjb3JkU3RvcHBlZDogdGhpcy5yZWNvcmRTdG9wcGVkLnZhbHVlLFxuICAgICAgYWRtaW5SZXN0cmljdFNldHRpbmc6IHRoaXMuYWRtaW5SZXN0cmljdFNldHRpbmcudmFsdWUsXG4gICAgICB2aWRlb1JlcXVlc3RTdGF0ZTogdGhpcy52aWRlb1JlcXVlc3RTdGF0ZS52YWx1ZSxcbiAgICAgIHZpZGVvUmVxdWVzdFRpbWU6IHRoaXMudmlkZW9SZXF1ZXN0VGltZS52YWx1ZSxcbiAgICAgIHZpZGVvQWN0aW9uOiB0aGlzLnZpZGVvQWN0aW9uLnZhbHVlLFxuICAgICAgbG9jYWxTdHJlYW1WaWRlbzogdGhpcy5sb2NhbFN0cmVhbVZpZGVvLnZhbHVlLFxuICAgICAgdXNlckRlZmF1bHRWaWRlb0lucHV0RGV2aWNlOiB0aGlzLnVzZXJEZWZhdWx0VmlkZW9JbnB1dERldmljZS52YWx1ZSxcbiAgICAgIGN1cnJlbnRGYWNpbmdNb2RlOiB0aGlzLmN1cnJlbnRGYWNpbmdNb2RlLnZhbHVlLFxuICAgICAgcHJldkZhY2luZ01vZGU6IHRoaXMucHJldkZhY2luZ01vZGUudmFsdWUsXG4gICAgICBkZWZWaWRlb0lEOiB0aGlzLmRlZlZpZGVvSUQudmFsdWUsXG4gICAgICBhbGxvd2VkOiB0aGlzLmFsbG93ZWQudmFsdWUsXG4gICAgICBkaXNwQWN0aXZlTmFtZXM6IHRoaXMuZGlzcEFjdGl2ZU5hbWVzLnZhbHVlLFxuICAgICAgcF9kaXNwQWN0aXZlTmFtZXM6IHRoaXMucF9kaXNwQWN0aXZlTmFtZXMudmFsdWUsXG4gICAgICBhY3RpdmVOYW1lczogdGhpcy5hY3RpdmVOYW1lcy52YWx1ZSxcbiAgICAgIHByZXZBY3RpdmVOYW1lczogdGhpcy5wcmV2QWN0aXZlTmFtZXMudmFsdWUsXG4gICAgICBwX2FjdGl2ZU5hbWVzOiB0aGlzLnBfYWN0aXZlTmFtZXMudmFsdWUsXG4gICAgICBtZW1iZXJzUmVjZWl2ZWQ6IHRoaXMubWVtYmVyc1JlY2VpdmVkLnZhbHVlLFxuICAgICAgZGVmZXJTY3JlZW5SZWNlaXZlZDogdGhpcy5kZWZlclNjcmVlblJlY2VpdmVkLnZhbHVlLFxuICAgICAgaG9zdEZpcnN0U3dpdGNoOiB0aGlzLmhvc3RGaXJzdFN3aXRjaC52YWx1ZSxcbiAgICAgIG1pY0FjdGlvbjogdGhpcy5taWNBY3Rpb24udmFsdWUsXG4gICAgICBzY3JlZW5BY3Rpb246IHRoaXMuc2NyZWVuQWN0aW9uLnZhbHVlLFxuICAgICAgY2hhdEFjdGlvbjogdGhpcy5jaGF0QWN0aW9uLnZhbHVlLFxuICAgICAgYXVkaW9SZXF1ZXN0U3RhdGU6IHRoaXMuYXVkaW9SZXF1ZXN0U3RhdGUudmFsdWUsXG4gICAgICBzY3JlZW5SZXF1ZXN0U3RhdGU6IHRoaXMuc2NyZWVuUmVxdWVzdFN0YXRlLnZhbHVlLFxuICAgICAgY2hhdFJlcXVlc3RTdGF0ZTogdGhpcy5jaGF0UmVxdWVzdFN0YXRlLnZhbHVlLFxuICAgICAgYXVkaW9SZXF1ZXN0VGltZTogdGhpcy5hdWRpb1JlcXVlc3RUaW1lLnZhbHVlLFxuICAgICAgc2NyZWVuUmVxdWVzdFRpbWU6IHRoaXMuc2NyZWVuUmVxdWVzdFRpbWUudmFsdWUsXG4gICAgICBjaGF0UmVxdWVzdFRpbWU6IHRoaXMuY2hhdFJlcXVlc3RUaW1lLnZhbHVlLFxuICAgICAgdXBkYXRlUmVxdWVzdEludGVydmFsU2Vjb25kczogdGhpcy51cGRhdGVSZXF1ZXN0SW50ZXJ2YWxTZWNvbmRzLnZhbHVlLFxuICAgICAgb2xkU291bmRJZHM6IHRoaXMub2xkU291bmRJZHMudmFsdWUsXG4gICAgICBob3N0TGFiZWw6IHRoaXMuaG9zdExhYmVsLnZhbHVlLFxuICAgICAgbWFpblNjcmVlbkZpbGxlZDogdGhpcy5tYWluU2NyZWVuRmlsbGVkLnZhbHVlLFxuICAgICAgbG9jYWxTdHJlYW1TY3JlZW46IHRoaXMubG9jYWxTdHJlYW1TY3JlZW4udmFsdWUsXG4gICAgICBzY3JlZW5BbHJlYWR5T246IHRoaXMuc2NyZWVuQWxyZWFkeU9uLnZhbHVlLFxuICAgICAgY2hhdEFscmVhZHlPbjogdGhpcy5jaGF0QWxyZWFkeU9uLnZhbHVlLFxuICAgICAgcmVkaXJlY3RVUkw6IHRoaXMucmVkaXJlY3RVUkwudmFsdWUsXG4gICAgICBvbGRBbGxTdHJlYW1zOiB0aGlzLm9sZEFsbFN0cmVhbXMudmFsdWUsXG4gICAgICBhZG1pblZpZElEOiB0aGlzLmFkbWluVmlkSUQudmFsdWUsXG4gICAgICBzdHJlYW1OYW1lczogdGhpcy5zdHJlYW1OYW1lcy52YWx1ZSxcbiAgICAgIG5vbl9hbFZpZGVvU3RyZWFtczogdGhpcy5ub25fYWxWaWRlb1N0cmVhbXMudmFsdWUsXG4gICAgICBzb3J0QXVkaW9Mb3VkbmVzczogdGhpcy5zb3J0QXVkaW9Mb3VkbmVzcy52YWx1ZSxcbiAgICAgIGF1ZGlvRGVjaWJlbHM6IHRoaXMuYXVkaW9EZWNpYmVscy52YWx1ZSxcbiAgICAgIG1peGVkX2FsVmlkZW9TdHJlYW1zOiB0aGlzLm1peGVkX2FsVmlkZW9TdHJlYW1zLnZhbHVlLFxuICAgICAgbm9uX2FsVmlkZW9TdHJlYW1zX211dGVkOiB0aGlzLm5vbl9hbFZpZGVvU3RyZWFtc19tdXRlZC52YWx1ZSxcbiAgICAgIHBhZ2luYXRlZFN0cmVhbXM6IHRoaXMucGFnaW5hdGVkU3RyZWFtcy52YWx1ZSxcbiAgICAgIGxvY2FsU3RyZWFtQXVkaW86IHRoaXMubG9jYWxTdHJlYW1BdWRpby52YWx1ZSxcbiAgICAgIGRlZkF1ZGlvSUQ6IHRoaXMuZGVmQXVkaW9JRC52YWx1ZSxcbiAgICAgIHVzZXJEZWZhdWx0QXVkaW9JbnB1dERldmljZTogdGhpcy51c2VyRGVmYXVsdEF1ZGlvSW5wdXREZXZpY2UudmFsdWUsXG4gICAgICB1c2VyRGVmYXVsdEF1ZGlvT3V0cHV0RGV2aWNlOiB0aGlzLnVzZXJEZWZhdWx0QXVkaW9PdXRwdXREZXZpY2UudmFsdWUsXG4gICAgICBwcmV2QXVkaW9JbnB1dERldmljZTogdGhpcy5wcmV2QXVkaW9JbnB1dERldmljZS52YWx1ZSxcbiAgICAgIHByZXZWaWRlb0lucHV0RGV2aWNlOiB0aGlzLnByZXZWaWRlb0lucHV0RGV2aWNlLnZhbHVlLFxuICAgICAgYXVkaW9QYXVzZWQ6IHRoaXMuYXVkaW9QYXVzZWQudmFsdWUsXG4gICAgICBtYWluU2NyZWVuUGVyc29uOiB0aGlzLm1haW5TY3JlZW5QZXJzb24udmFsdWUsXG4gICAgICBhZG1pbk9uTWFpblNjcmVlbjogdGhpcy5hZG1pbk9uTWFpblNjcmVlbi52YWx1ZSxcbiAgICAgIHNjcmVlblN0YXRlczogdGhpcy5zY3JlZW5TdGF0ZXMudmFsdWUsXG4gICAgICBwcmV2U2NyZWVuU3RhdGVzOiB0aGlzLnByZXZTY3JlZW5TdGF0ZXMudmFsdWUsXG4gICAgICB1cGRhdGVEYXRlU3RhdGU6IHRoaXMudXBkYXRlRGF0ZVN0YXRlLnZhbHVlLFxuICAgICAgbGFzdFVwZGF0ZTogdGhpcy5sYXN0VXBkYXRlLnZhbHVlLFxuICAgICAgbkZvclJlYWRqdXN0UmVjb3JkOiB0aGlzLm5Gb3JSZWFkanVzdFJlY29yZC52YWx1ZSxcbiAgICAgIGZpeGVkUGFnZUxpbWl0OiB0aGlzLmZpeGVkUGFnZUxpbWl0LnZhbHVlLFxuICAgICAgcmVtb3ZlQWx0R3JpZDogdGhpcy5yZW1vdmVBbHRHcmlkLnZhbHVlLFxuICAgICAgbkZvclJlYWRqdXN0OiB0aGlzLm5Gb3JSZWFkanVzdC52YWx1ZSxcbiAgICAgIGxhc3RSZW9yZGVyVGltZTogdGhpcy5sYXN0UmVvcmRlclRpbWUudmFsdWUsXG4gICAgICByZW9yZGVySW50ZXJ2YWw6IHRoaXMucmVvcmRlckludGVydmFsLnZhbHVlLFxuICAgICAgZmFzdFJlb3JkZXJJbnRlcnZhbDogdGhpcy5mYXN0UmVvcmRlckludGVydmFsLnZhbHVlLFxuICAgICAgYXVkU3RyZWFtTmFtZXM6IHRoaXMuYXVkU3RyZWFtTmFtZXMudmFsdWUsXG4gICAgICBjdXJyZW50VXNlclBhZ2U6IHRoaXMuY3VycmVudFVzZXJQYWdlLnZhbHVlLFxuICAgICAgbWFpbkhlaWdodFdpZHRoOiB0aGlzLm1haW5IZWlnaHRXaWR0aC52YWx1ZSxcbiAgICAgIHByZXZNYWluSGVpZ2h0V2lkdGg6IHRoaXMucHJldk1haW5IZWlnaHRXaWR0aC52YWx1ZSxcbiAgICAgIHByZXZEb1BhZ2luYXRlOiB0aGlzLnByZXZEb1BhZ2luYXRlLnZhbHVlLFxuICAgICAgZG9QYWdpbmF0ZTogdGhpcy5kb1BhZ2luYXRlLnZhbHVlLFxuICAgICAgc2hhcmVFbmRlZDogdGhpcy5zaGFyZUVuZGVkLnZhbHVlLFxuICAgICAgbFN0cmVhbXM6IHRoaXMubFN0cmVhbXMudmFsdWUsXG4gICAgICBjaGF0UmVmU3RyZWFtczogdGhpcy5jaGF0UmVmU3RyZWFtcy52YWx1ZSxcbiAgICAgIGNvbnRyb2xIZWlnaHQ6IHRoaXMuY29udHJvbEhlaWdodC52YWx1ZSxcbiAgICAgIGlzV2lkZVNjcmVlbjogdGhpcy5pc1dpZGVTY3JlZW4udmFsdWUsXG4gICAgICBpc01lZGl1bVNjcmVlbjogdGhpcy5pc01lZGl1bVNjcmVlbi52YWx1ZSxcbiAgICAgIGlzU21hbGxTY3JlZW46IHRoaXMuaXNTbWFsbFNjcmVlbi52YWx1ZSxcbiAgICAgIGFkZEdyaWQ6IHRoaXMuYWRkR3JpZC52YWx1ZSxcbiAgICAgIGFkZEFsdEdyaWQ6IHRoaXMuYWRkQWx0R3JpZC52YWx1ZSxcbiAgICAgIGdyaWRSb3dzOiB0aGlzLmdyaWRSb3dzLnZhbHVlLFxuICAgICAgZ3JpZENvbHM6IHRoaXMuZ3JpZENvbHMudmFsdWUsXG4gICAgICBhbHRHcmlkUm93czogdGhpcy5hbHRHcmlkUm93cy52YWx1ZSxcbiAgICAgIGFsdEdyaWRDb2xzOiB0aGlzLmFsdEdyaWRDb2xzLnZhbHVlLFxuICAgICAgbnVtYmVyUGFnZXM6IHRoaXMubnVtYmVyUGFnZXMudmFsdWUsXG4gICAgICBjdXJyZW50U3RyZWFtczogdGhpcy5jdXJyZW50U3RyZWFtcy52YWx1ZSxcbiAgICAgIHNob3dNaW5pVmlldzogdGhpcy5zaG93TWluaVZpZXcudmFsdWUsXG4gICAgICBuU3RyZWFtOiB0aGlzLm5TdHJlYW0udmFsdWUsXG4gICAgICBkZWZlcl9yZWNlaXZlOiB0aGlzLmRlZmVyX3JlY2VpdmUudmFsdWUsXG4gICAgICBhbGxBdWRpb1N0cmVhbXM6IHRoaXMuYWxsQXVkaW9TdHJlYW1zLnZhbHVlLFxuICAgICAgc2NyZWVuUHJvZHVjZXI6IHRoaXMuc2NyZWVuUHJvZHVjZXIudmFsdWUsXG4gICAgICByZW1vdGVTY3JlZW5TdHJlYW06IHRoaXMucmVtb3RlU2NyZWVuU3RyZWFtLnZhbHVlLFxuICAgICAgZ290QWxsVmlkczogdGhpcy5nb3RBbGxWaWRzLnZhbHVlLFxuICAgICAgcGFnaW5hdGlvbkhlaWdodFdpZHRoOiB0aGlzLnBhZ2luYXRpb25IZWlnaHRXaWR0aC52YWx1ZSxcbiAgICAgIHBhZ2luYXRpb25EaXJlY3Rpb246IHRoaXMucGFnaW5hdGlvbkRpcmVjdGlvbi52YWx1ZSxcbiAgICAgIGdyaWRTaXplczogdGhpcy5ncmlkU2l6ZXMudmFsdWUsXG4gICAgICBzY3JlZW5Gb3JjZUZ1bGxEaXNwbGF5OiB0aGlzLnNjcmVlbkZvcmNlRnVsbERpc3BsYXkudmFsdWUsXG4gICAgICBtYWluR3JpZFN0cmVhbTogdGhpcy5tYWluR3JpZFN0cmVhbS52YWx1ZSxcbiAgICAgIG90aGVyR3JpZFN0cmVhbXM6IHRoaXMub3RoZXJHcmlkU3RyZWFtcy52YWx1ZSxcbiAgICAgIGF1ZGlvT25seVN0cmVhbXM6IHRoaXMuYXVkaW9Pbmx5U3RyZWFtcy52YWx1ZSxcbiAgICAgIHZpZGVvSW5wdXRzOiB0aGlzLnZpZGVvSW5wdXRzLnZhbHVlLFxuICAgICAgYXVkaW9JbnB1dHM6IHRoaXMuYXVkaW9JbnB1dHMudmFsdWUsXG4gICAgICBtZWV0aW5nUHJvZ3Jlc3NUaW1lOiB0aGlzLm1lZXRpbmdQcm9ncmVzc1RpbWUudmFsdWUsXG4gICAgICBtZWV0aW5nRWxhcHNlZFRpbWU6IHRoaXMubWVldGluZ0VsYXBzZWRUaW1lLnZhbHVlLFxuXG4gICAgICByZWZfcGFydGljaXBhbnRzOiB0aGlzLnJlZl9wYXJ0aWNpcGFudHMudmFsdWUsXG5cbiAgICAgIG1lc3NhZ2VzOiB0aGlzLm1lc3NhZ2VzLnZhbHVlLFxuICAgICAgc3RhcnREaXJlY3RNZXNzYWdlOiB0aGlzLnN0YXJ0RGlyZWN0TWVzc2FnZS52YWx1ZSxcbiAgICAgIGRpcmVjdE1lc3NhZ2VEZXRhaWxzOiB0aGlzLmRpcmVjdE1lc3NhZ2VEZXRhaWxzLnZhbHVlLFxuICAgICAgY29Ib3N0OiB0aGlzLmNvSG9zdC52YWx1ZSxcbiAgICAgIGNvSG9zdFJlc3BvbnNpYmlsaXR5OiB0aGlzLmNvSG9zdFJlc3BvbnNpYmlsaXR5LnZhbHVlLFxuXG4gICAgICAvLyBFdmVudCBzZXR0aW5nc1xuICAgICAgYXVkaW9TZXR0aW5nOiB0aGlzLmF1ZGlvU2V0dGluZy52YWx1ZSxcbiAgICAgIHZpZGVvU2V0dGluZzogdGhpcy52aWRlb1NldHRpbmcudmFsdWUsXG4gICAgICBzY3JlZW5zaGFyZVNldHRpbmc6IHRoaXMuc2NyZWVuc2hhcmVTZXR0aW5nLnZhbHVlLFxuICAgICAgY2hhdFNldHRpbmc6IHRoaXMuY2hhdFNldHRpbmcudmFsdWUsXG5cbiAgICAgIC8vIERpc3BsYXkgc2V0dGluZ3NcbiAgICAgIGF1dG9XYXZlOiB0aGlzLmF1dG9XYXZlLnZhbHVlLFxuICAgICAgZm9yY2VGdWxsRGlzcGxheTogdGhpcy5mb3JjZUZ1bGxEaXNwbGF5LnZhbHVlLFxuICAgICAgcHJldkZvcmNlRnVsbERpc3BsYXk6IHRoaXMucHJldkZvcmNlRnVsbERpc3BsYXkudmFsdWUsXG4gICAgICBwcmV2TWVldGluZ0Rpc3BsYXlUeXBlOiB0aGlzLnByZXZNZWV0aW5nRGlzcGxheVR5cGUudmFsdWUsXG5cbiAgICAgIC8vIFdhaXRpbmcgcm9vbVxuICAgICAgd2FpdGluZ1Jvb21GaWx0ZXI6IHRoaXMud2FpdGluZ1Jvb21GaWx0ZXIudmFsdWUsXG4gICAgICB3YWl0aW5nUm9vbUxpc3Q6IHRoaXMud2FpdGluZ1Jvb21MaXN0LnZhbHVlLFxuICAgICAgd2FpdGluZ1Jvb21Db3VudGVyOiB0aGlzLndhaXRpbmdSb29tQ291bnRlci52YWx1ZSxcbiAgICAgIGZpbHRlcmVkV2FpdGluZ1Jvb21MaXN0OiB0aGlzLmZpbHRlcmVkV2FpdGluZ1Jvb21MaXN0LnZhbHVlLFxuXG4gICAgICAvLyBSZXF1ZXN0c1xuICAgICAgcmVxdWVzdEZpbHRlcjogdGhpcy5yZXF1ZXN0RmlsdGVyLnZhbHVlLFxuICAgICAgcmVxdWVzdExpc3Q6IHRoaXMucmVxdWVzdExpc3QudmFsdWUsXG4gICAgICByZXF1ZXN0Q291bnRlcjogdGhpcy5yZXF1ZXN0Q291bnRlci52YWx1ZSxcbiAgICAgIGZpbHRlcmVkUmVxdWVzdExpc3Q6IHRoaXMuZmlsdGVyZWRSZXF1ZXN0TGlzdC52YWx1ZSxcblxuICAgICAgLy8gVG90YWwgcmVxdWVzdHMgYW5kIHdhaXRpbmcgcm9vbVxuICAgICAgdG90YWxSZXFXYWl0OiB0aGlzLnRvdGFsUmVxV2FpdC52YWx1ZSxcblxuICAgICAgLy8gQWxlcnRzXG4gICAgICBhbGVydFZpc2libGU6IHRoaXMuYWxlcnRWaXNpYmxlLnZhbHVlLFxuICAgICAgYWxlcnRNZXNzYWdlOiB0aGlzLmFsZXJ0TWVzc2FnZS52YWx1ZSxcbiAgICAgIGFsZXJ0VHlwZTogdGhpcy5hbGVydFR5cGUudmFsdWUsXG4gICAgICBhbGVydER1cmF0aW9uOiB0aGlzLmFsZXJ0RHVyYXRpb24udmFsdWUsXG5cbiAgICAgIC8vIFByb2dyZXNzIFRpbWVyXG4gICAgICBwcm9ncmVzc1RpbWVyVmlzaWJsZTogdGhpcy5wcm9ncmVzc1RpbWVyVmlzaWJsZS52YWx1ZSxcbiAgICAgIHByb2dyZXNzVGltZXJWYWx1ZTogdGhpcy5wcm9ncmVzc1RpbWVyVmFsdWUudmFsdWUsXG5cbiAgICAgIC8vIE1lbnUgbW9kYWxzXG4gICAgICBpc01lbnVNb2RhbFZpc2libGU6IHRoaXMuaXNNZW51TW9kYWxWaXNpYmxlLnZhbHVlLFxuICAgICAgaXNSZWNvcmRpbmdNb2RhbFZpc2libGU6IHRoaXMuaXNSZWNvcmRpbmdNb2RhbFZpc2libGUudmFsdWUsXG4gICAgICBpc1NldHRpbmdzTW9kYWxWaXNpYmxlOiB0aGlzLmlzU2V0dGluZ3NNb2RhbFZpc2libGUudmFsdWUsXG4gICAgICBpc1JlcXVlc3RzTW9kYWxWaXNpYmxlOiB0aGlzLmlzUmVxdWVzdHNNb2RhbFZpc2libGUudmFsdWUsXG4gICAgICBpc1dhaXRpbmdNb2RhbFZpc2libGU6IHRoaXMuaXNXYWl0aW5nTW9kYWxWaXNpYmxlLnZhbHVlLFxuICAgICAgaXNDb0hvc3RNb2RhbFZpc2libGU6IHRoaXMuaXNDb0hvc3RNb2RhbFZpc2libGUudmFsdWUsXG4gICAgICBpc01lZGlhU2V0dGluZ3NNb2RhbFZpc2libGU6IHRoaXMuaXNNZWRpYVNldHRpbmdzTW9kYWxWaXNpYmxlLnZhbHVlLFxuICAgICAgaXNEaXNwbGF5U2V0dGluZ3NNb2RhbFZpc2libGU6IHRoaXMuaXNEaXNwbGF5U2V0dGluZ3NNb2RhbFZpc2libGUudmFsdWUsXG5cbiAgICAgIC8vIE90aGVyIE1vZGFsc1xuICAgICAgaXNQYXJ0aWNpcGFudHNNb2RhbFZpc2libGU6IHRoaXMuaXNQYXJ0aWNpcGFudHNNb2RhbFZpc2libGUudmFsdWUsXG4gICAgICBpc01lc3NhZ2VzTW9kYWxWaXNpYmxlOiB0aGlzLmlzTWVzc2FnZXNNb2RhbFZpc2libGUudmFsdWUsXG4gICAgICBpc0NvbmZpcm1FeGl0TW9kYWxWaXNpYmxlOiB0aGlzLmlzQ29uZmlybUV4aXRNb2RhbFZpc2libGUudmFsdWUsXG4gICAgICBpc0NvbmZpcm1IZXJlTW9kYWxWaXNpYmxlOiB0aGlzLmlzQ29uZmlybUhlcmVNb2RhbFZpc2libGUudmFsdWUsXG4gICAgICBpc0xvYWRpbmdNb2RhbFZpc2libGU6IHRoaXMuaXNMb2FkaW5nTW9kYWxWaXNpYmxlLnZhbHVlLFxuXG4gICAgICAvLyBSZWNvcmRpbmcgT3B0aW9uc1xuICAgICAgcmVjb3JkaW5nTWVkaWFPcHRpb25zOiB0aGlzLnJlY29yZGluZ01lZGlhT3B0aW9ucy52YWx1ZSxcbiAgICAgIHJlY29yZGluZ0F1ZGlvT3B0aW9uczogdGhpcy5yZWNvcmRpbmdBdWRpb09wdGlvbnMudmFsdWUsXG4gICAgICByZWNvcmRpbmdWaWRlb09wdGlvbnM6IHRoaXMucmVjb3JkaW5nVmlkZW9PcHRpb25zLnZhbHVlLFxuICAgICAgcmVjb3JkaW5nVmlkZW9UeXBlOiB0aGlzLnJlY29yZGluZ1ZpZGVvVHlwZS52YWx1ZSxcbiAgICAgIHJlY29yZGluZ1ZpZGVvT3B0aW1pemVkOiB0aGlzLnJlY29yZGluZ1ZpZGVvT3B0aW1pemVkLnZhbHVlLFxuICAgICAgcmVjb3JkaW5nRGlzcGxheVR5cGU6IHRoaXMucmVjb3JkaW5nRGlzcGxheVR5cGUudmFsdWUsXG4gICAgICByZWNvcmRpbmdBZGRITFM6IHRoaXMucmVjb3JkaW5nQWRkSExTLnZhbHVlLFxuICAgICAgcmVjb3JkaW5nQWRkVGV4dDogdGhpcy5yZWNvcmRpbmdBZGRUZXh0LnZhbHVlLFxuICAgICAgcmVjb3JkaW5nQ3VzdG9tVGV4dDogdGhpcy5yZWNvcmRpbmdDdXN0b21UZXh0LnZhbHVlLFxuICAgICAgcmVjb3JkaW5nQ3VzdG9tVGV4dFBvc2l0aW9uOiB0aGlzLnJlY29yZGluZ0N1c3RvbVRleHRQb3NpdGlvbi52YWx1ZSxcbiAgICAgIHJlY29yZGluZ0N1c3RvbVRleHRDb2xvcjogdGhpcy5yZWNvcmRpbmdDdXN0b21UZXh0Q29sb3IudmFsdWUsXG4gICAgICByZWNvcmRpbmdOYW1lVGFnczogdGhpcy5yZWNvcmRpbmdOYW1lVGFncy52YWx1ZSxcbiAgICAgIHJlY29yZGluZ0JhY2tncm91bmRDb2xvcjogdGhpcy5yZWNvcmRpbmdCYWNrZ3JvdW5kQ29sb3IudmFsdWUsXG4gICAgICByZWNvcmRpbmdOYW1lVGFnc0NvbG9yOiB0aGlzLnJlY29yZGluZ05hbWVUYWdzQ29sb3IudmFsdWUsXG4gICAgICByZWNvcmRpbmdPcmllbnRhdGlvblZpZGVvOiB0aGlzLnJlY29yZGluZ09yaWVudGF0aW9uVmlkZW8udmFsdWUsXG4gICAgICBjbGVhcmVkVG9SZXN1bWU6IHRoaXMuY2xlYXJlZFRvUmVzdW1lLnZhbHVlLFxuICAgICAgY2xlYXJlZFRvUmVjb3JkOiB0aGlzLmNsZWFyZWRUb1JlY29yZC52YWx1ZSxcbiAgICAgIHJlY29yZFN0YXRlOiB0aGlzLnJlY29yZFN0YXRlLnZhbHVlLFxuICAgICAgc2hvd1JlY29yZEJ1dHRvbnM6IHRoaXMuc2hvd1JlY29yZEJ1dHRvbnMudmFsdWUsXG4gICAgICByZWNvcmRpbmdQcm9ncmVzc1RpbWU6IHRoaXMucmVjb3JkaW5nUHJvZ3Jlc3NUaW1lLnZhbHVlLFxuICAgICAgYXVkaW9Td2l0Y2hpbmc6IHRoaXMuYXVkaW9Td2l0Y2hpbmcudmFsdWUsXG4gICAgICB2aWRlb1N3aXRjaGluZzogdGhpcy52aWRlb1N3aXRjaGluZy52YWx1ZSxcblxuICAgICAgLy8gTWVkaWEgc3RhdGVzXG4gICAgICB2aWRlb0FscmVhZHlPbjogdGhpcy52aWRlb0FscmVhZHlPbi52YWx1ZSxcbiAgICAgIGF1ZGlvQWxyZWFkeU9uOiB0aGlzLmF1ZGlvQWxyZWFkeU9uLnZhbHVlLFxuICAgICAgY29tcG9uZW50U2l6ZXM6IHRoaXMuY29tcG9uZW50U2l6ZXMudmFsdWUsXG5cbiAgICAgIC8vIFBlcm1pc3Npb25zXG4gICAgICBoYXNDYW1lcmFQZXJtaXNzaW9uOiB0aGlzLmhhc0NhbWVyYVBlcm1pc3Npb24udmFsdWUsXG4gICAgICBoYXNBdWRpb1Blcm1pc3Npb246IHRoaXMuaGFzQXVkaW9QZXJtaXNzaW9uLnZhbHVlLFxuXG4gICAgICAvLyBUcmFuc3BvcnRzXG4gICAgICB0cmFuc3BvcnRDcmVhdGVkOiB0aGlzLnRyYW5zcG9ydENyZWF0ZWQudmFsdWUsXG4gICAgICB0cmFuc3BvcnRDcmVhdGVkVmlkZW86IHRoaXMudHJhbnNwb3J0Q3JlYXRlZFZpZGVvLnZhbHVlLFxuICAgICAgdHJhbnNwb3J0Q3JlYXRlZEF1ZGlvOiB0aGlzLnRyYW5zcG9ydENyZWF0ZWRBdWRpby52YWx1ZSxcbiAgICAgIHRyYW5zcG9ydENyZWF0ZWRTY3JlZW46IHRoaXMudHJhbnNwb3J0Q3JlYXRlZFNjcmVlbi52YWx1ZSxcbiAgICAgIHByb2R1Y2VyVHJhbnNwb3J0OiB0aGlzLnByb2R1Y2VyVHJhbnNwb3J0LnZhbHVlLFxuICAgICAgdmlkZW9Qcm9kdWNlcjogdGhpcy52aWRlb1Byb2R1Y2VyLnZhbHVlLFxuICAgICAgcGFyYW1zOiB0aGlzLnBhcmFtcy52YWx1ZSxcbiAgICAgIHZpZGVvUGFyYW1zOiB0aGlzLnZpZGVvUGFyYW1zLnZhbHVlLFxuICAgICAgYXVkaW9QYXJhbXM6IHRoaXMuYXVkaW9QYXJhbXMudmFsdWUsXG4gICAgICBhdWRpb1Byb2R1Y2VyOiB0aGlzLmF1ZGlvUHJvZHVjZXIudmFsdWUsXG4gICAgICBjb25zdW1lclRyYW5zcG9ydHM6IHRoaXMuY29uc3VtZXJUcmFuc3BvcnRzLnZhbHVlLFxuICAgICAgY29uc3VtaW5nVHJhbnNwb3J0czogdGhpcy5jb25zdW1pbmdUcmFuc3BvcnRzLnZhbHVlLFxuXG4gICAgICAvLyBQb2xsc1xuICAgICAgcG9sbHM6IHRoaXMucG9sbHMudmFsdWUsXG4gICAgICBwb2xsOiB0aGlzLnBvbGwudmFsdWUsXG4gICAgICBpc1BvbGxNb2RhbFZpc2libGU6IHRoaXMuaXNQb2xsTW9kYWxWaXNpYmxlLnZhbHVlLFxuXG4gICAgICAvLyBCYWNrZ3JvdW5kXG4gICAgICBjdXN0b21JbWFnZTogdGhpcy5jdXN0b21JbWFnZS52YWx1ZSxcbiAgICAgIHNlbGVjdGVkSW1hZ2U6IHRoaXMuc2VsZWN0ZWRJbWFnZS52YWx1ZSxcbiAgICAgIHNlZ21lbnRWaWRlbzogdGhpcy5zZWdtZW50VmlkZW8udmFsdWUsXG4gICAgICBzZWxmaWVTZWdtZW50YXRpb246IHRoaXMuc2VsZmllU2VnbWVudGF0aW9uLnZhbHVlLFxuICAgICAgcGF1c2VTZWdtZW50YXRpb246IHRoaXMucGF1c2VTZWdtZW50YXRpb24udmFsdWUsXG4gICAgICBwcm9jZXNzZWRTdHJlYW06IHRoaXMucHJvY2Vzc2VkU3RyZWFtLnZhbHVlLFxuICAgICAga2VlcEJhY2tncm91bmQ6IHRoaXMua2VlcEJhY2tncm91bmQudmFsdWUsXG4gICAgICBiYWNrZ3JvdW5kSGFzQ2hhbmdlZDogdGhpcy5iYWNrZ3JvdW5kSGFzQ2hhbmdlZC52YWx1ZSxcbiAgICAgIHZpcnR1YWxTdHJlYW06IHRoaXMudmlydHVhbFN0cmVhbS52YWx1ZSxcbiAgICAgIG1haW5DYW52YXM6IHRoaXMubWFpbkNhbnZhcy52YWx1ZSxcbiAgICAgIHByZXZLZWVwQmFja2dyb3VuZDogdGhpcy5wcmV2S2VlcEJhY2tncm91bmQudmFsdWUsXG4gICAgICBhcHBsaWVkQmFja2dyb3VuZDogdGhpcy5hcHBsaWVkQmFja2dyb3VuZC52YWx1ZSxcbiAgICAgIGlzQmFja2dyb3VuZE1vZGFsVmlzaWJsZTogdGhpcy5pc0JhY2tncm91bmRNb2RhbFZpc2libGUudmFsdWUsXG4gICAgICBhdXRvQ2xpY2tCYWNrZ3JvdW5kOiB0aGlzLmF1dG9DbGlja0JhY2tncm91bmQudmFsdWUsXG5cbiAgICAgIC8vIEJyZWFrb3V0IHJvb21zXG4gICAgICBicmVha291dFJvb21zOiB0aGlzLmJyZWFrb3V0Um9vbXMudmFsdWUsXG4gICAgICBjdXJyZW50Um9vbUluZGV4OiB0aGlzLmN1cnJlbnRSb29tSW5kZXgudmFsdWUsXG4gICAgICBjYW5TdGFydEJyZWFrb3V0OiB0aGlzLmNhblN0YXJ0QnJlYWtvdXQudmFsdWUsXG4gICAgICBicmVha091dFJvb21TdGFydGVkOiB0aGlzLmJyZWFrT3V0Um9vbVN0YXJ0ZWQudmFsdWUsXG4gICAgICBicmVha091dFJvb21FbmRlZDogdGhpcy5icmVha091dFJvb21FbmRlZC52YWx1ZSxcbiAgICAgIGhvc3ROZXdSb29tOiB0aGlzLmhvc3ROZXdSb29tLnZhbHVlLFxuICAgICAgbGltaXRlZEJyZWFrUm9vbTogdGhpcy5saW1pdGVkQnJlYWtSb29tLnZhbHVlLFxuICAgICAgbWFpblJvb21zTGVuZ3RoOiB0aGlzLm1haW5Sb29tc0xlbmd0aC52YWx1ZSxcbiAgICAgIG1lbWJlclJvb206IHRoaXMubWVtYmVyUm9vbS52YWx1ZSxcbiAgICAgIGlzQnJlYWtvdXRSb29tc01vZGFsVmlzaWJsZTogdGhpcy5pc0JyZWFrb3V0Um9vbXNNb2RhbFZpc2libGUudmFsdWUsXG5cbiAgICAgIC8vIFdoaXRlYm9hcmRcbiAgICAgIHdoaXRlYm9hcmRVc2VyczogdGhpcy53aGl0ZWJvYXJkVXNlcnMudmFsdWUsXG4gICAgICBjdXJyZW50V2hpdGVib2FyZEluZGV4OiB0aGlzLmN1cnJlbnRXaGl0ZWJvYXJkSW5kZXgudmFsdWUsXG4gICAgICBjYW5TdGFydFdoaXRlYm9hcmQ6IHRoaXMuY2FuU3RhcnRXaGl0ZWJvYXJkLnZhbHVlLFxuICAgICAgd2hpdGVib2FyZFN0YXJ0ZWQ6IHRoaXMud2hpdGVib2FyZFN0YXJ0ZWQudmFsdWUsXG4gICAgICB3aGl0ZWJvYXJkRW5kZWQ6IHRoaXMud2hpdGVib2FyZEVuZGVkLnZhbHVlLFxuICAgICAgd2hpdGVib2FyZExpbWl0OiB0aGlzLndoaXRlYm9hcmRMaW1pdC52YWx1ZSxcbiAgICAgIGlzV2hpdGVib2FyZE1vZGFsVmlzaWJsZTogdGhpcy5pc1doaXRlYm9hcmRNb2RhbFZpc2libGUudmFsdWUsXG4gICAgICBpc0NvbmZpZ3VyZVdoaXRlYm9hcmRNb2RhbFZpc2libGU6IHRoaXMuaXNDb25maWd1cmVXaGl0ZWJvYXJkTW9kYWxWaXNpYmxlLnZhbHVlLFxuICAgICAgc2hhcGVzOiB0aGlzLnNoYXBlcy52YWx1ZSxcbiAgICAgIHVzZUltYWdlQmFja2dyb3VuZDogdGhpcy51c2VJbWFnZUJhY2tncm91bmQudmFsdWUsXG4gICAgICByZWRvU3RhY2s6IHRoaXMucmVkb1N0YWNrLnZhbHVlLFxuICAgICAgdW5kb1N0YWNrOiB0aGlzLnVuZG9TdGFjay52YWx1ZSxcbiAgICAgIGNhbnZhc1N0cmVhbTogdGhpcy5jYW52YXNTdHJlYW0udmFsdWUsXG4gICAgICBjYW52YXNXaGl0ZWJvYXJkOiB0aGlzLmNhbnZhc1doaXRlYm9hcmQudmFsdWUsXG5cbiAgICAgIC8vIFNjcmVlbmJvYXJkXG4gICAgICBjYW52YXNTY3JlZW5ib2FyZDogdGhpcy5jYW52YXNTY3JlZW5ib2FyZC52YWx1ZSxcbiAgICAgIHByb2Nlc3NlZFNjcmVlblN0cmVhbTogdGhpcy5wcm9jZXNzZWRTY3JlZW5TdHJlYW0udmFsdWUsXG4gICAgICBhbm5vdGF0ZVNjcmVlblN0cmVhbTogdGhpcy5hbm5vdGF0ZVNjcmVlblN0cmVhbS52YWx1ZSxcbiAgICAgIG1haW5TY3JlZW5DYW52YXM6IHRoaXMubWFpblNjcmVlbkNhbnZhcy52YWx1ZSxcbiAgICAgIGlzU2NyZWVuYm9hcmRNb2RhbFZpc2libGU6IHRoaXMuaXNTY3JlZW5ib2FyZE1vZGFsVmlzaWJsZS52YWx1ZSxcblxuICAgICAgdmFsaWRhdGVkOiB0aGlzLnZhbGlkYXRlZC52YWx1ZSxcbiAgICAgIGRldmljZTogdGhpcy5kZXZpY2UudmFsdWUsXG4gICAgICBzb2NrZXQ6IHRoaXMuc29ja2V0LnZhbHVlLFxuICAgICAgY2hlY2tNZWRpYVBlcm1pc3Npb246IGZhbHNlLFxuICAgICAgb25XZWI6IHRydWUsXG5cbiAgICAgIC8vIFVwZGF0ZSBmdW5jdGlvbnNcbiAgICAgIHVwZGF0ZVJvb21OYW1lOiB0aGlzLnVwZGF0ZVJvb21OYW1lLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVNZW1iZXI6IHRoaXMudXBkYXRlTWVtYmVyLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVBZG1pblBhc3Njb2RlOiB0aGlzLnVwZGF0ZUFkbWluUGFzc2NvZGUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVlvdUFyZUNvSG9zdDogdGhpcy51cGRhdGVZb3VBcmVDb0hvc3QuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVlvdUFyZUhvc3Q6IHRoaXMudXBkYXRlWW91QXJlSG9zdC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlSXNsZXZlbDogdGhpcy51cGRhdGVJc2xldmVsLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVDb0hvc3Q6IHRoaXMudXBkYXRlQ29Ib3N0LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVDb0hvc3RSZXNwb25zaWJpbGl0eTogdGhpcy51cGRhdGVDb0hvc3RSZXNwb25zaWJpbGl0eS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQ29uZmlybWVkVG9SZWNvcmQ6IHRoaXMudXBkYXRlQ29uZmlybWVkVG9SZWNvcmQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZU1lZXRpbmdEaXNwbGF5VHlwZTogdGhpcy51cGRhdGVNZWV0aW5nRGlzcGxheVR5cGUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZU1lZXRpbmdWaWRlb09wdGltaXplZDogdGhpcy51cGRhdGVNZWV0aW5nVmlkZW9PcHRpbWl6ZWQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUV2ZW50VHlwZTogdGhpcy51cGRhdGVFdmVudFR5cGUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVBhcnRpY2lwYW50czogdGhpcy51cGRhdGVQYXJ0aWNpcGFudHMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVBhcnRpY2lwYW50c0NvdW50ZXI6IHRoaXMudXBkYXRlUGFydGljaXBhbnRzQ291bnRlci5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUGFydGljaXBhbnRzRmlsdGVyOiB0aGlzLnVwZGF0ZVBhcnRpY2lwYW50c0ZpbHRlci5iaW5kKHRoaXMpLFxuXG4gICAgICAvLyBNb3JlIHVwZGF0ZSBmdW5jdGlvbnMgZm9yIG1lZGlhIGRldGFpbHNcbiAgICAgIHVwZGF0ZUNvbnN1bWVfc29ja2V0czogdGhpcy51cGRhdGVDb25zdW1lX3NvY2tldHMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJ0cENhcGFiaWxpdGllczogdGhpcy51cGRhdGVSdHBDYXBhYmlsaXRpZXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJvb21SZWN2SVBzOiB0aGlzLnVwZGF0ZVJvb21SZWN2SVBzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVNZWV0aW5nUm9vbVBhcmFtczogdGhpcy51cGRhdGVNZWV0aW5nUm9vbVBhcmFtcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlSXRlbVBhZ2VMaW1pdDogdGhpcy51cGRhdGVJdGVtUGFnZUxpbWl0LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVBdWRpb09ubHlSb29tOiB0aGlzLnVwZGF0ZUF1ZGlvT25seVJvb20uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUFkZEZvckJhc2ljOiB0aGlzLnVwZGF0ZUFkZEZvckJhc2ljLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVTY3JlZW5QYWdlTGltaXQ6IHRoaXMudXBkYXRlU2NyZWVuUGFnZUxpbWl0LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVTaGFyZVNjcmVlblN0YXJ0ZWQ6IHRoaXMudXBkYXRlU2hhcmVTY3JlZW5TdGFydGVkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVTaGFyZWQ6IHRoaXMudXBkYXRlU2hhcmVkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVUYXJnZXRPcmllbnRhdGlvbjogdGhpcy51cGRhdGVUYXJnZXRPcmllbnRhdGlvbi5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlVGFyZ2V0UmVzb2x1dGlvbjogdGhpcy51cGRhdGVUYXJnZXRSZXNvbHV0aW9uLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVUYXJnZXRSZXNvbHV0aW9uSG9zdDogdGhpcy51cGRhdGVUYXJnZXRSZXNvbHV0aW9uSG9zdC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlVmlkQ29uczogdGhpcy51cGRhdGVWaWRDb25zLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVGcmFtZVJhdGU6IHRoaXMudXBkYXRlRnJhbWVSYXRlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVIUGFyYW1zOiB0aGlzLnVwZGF0ZUhQYXJhbXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVZQYXJhbXM6IHRoaXMudXBkYXRlVlBhcmFtcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlU2NyZWVuUGFyYW1zOiB0aGlzLnVwZGF0ZVNjcmVlblBhcmFtcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQVBhcmFtczogdGhpcy51cGRhdGVBUGFyYW1zLmJpbmQodGhpcyksXG5cbiAgICAgIC8vIE1vcmUgdXBkYXRlIGZ1bmN0aW9ucyBmb3IgcmVjb3JkaW5nIGRldGFpbHNcbiAgICAgIHVwZGF0ZVJlY29yZGluZ0F1ZGlvUGF1c2VzTGltaXQ6IHRoaXMudXBkYXRlUmVjb3JkaW5nQXVkaW9QYXVzZXNMaW1pdC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nQXVkaW9QYXVzZXNDb3VudDogdGhpcy51cGRhdGVSZWNvcmRpbmdBdWRpb1BhdXNlc0NvdW50LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRpbmdBdWRpb1N1cHBvcnQ6IHRoaXMudXBkYXRlUmVjb3JkaW5nQXVkaW9TdXBwb3J0LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRpbmdBdWRpb1Blb3BsZUxpbWl0OiB0aGlzLnVwZGF0ZVJlY29yZGluZ0F1ZGlvUGVvcGxlTGltaXQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ0F1ZGlvUGFydGljaXBhbnRzVGltZUxpbWl0OlxuICAgICAgICB0aGlzLnVwZGF0ZVJlY29yZGluZ0F1ZGlvUGFydGljaXBhbnRzVGltZUxpbWl0LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRpbmdWaWRlb1BhdXNlc0NvdW50OiB0aGlzLnVwZGF0ZVJlY29yZGluZ1ZpZGVvUGF1c2VzQ291bnQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ1ZpZGVvUGF1c2VzTGltaXQ6IHRoaXMudXBkYXRlUmVjb3JkaW5nVmlkZW9QYXVzZXNMaW1pdC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nVmlkZW9TdXBwb3J0OiB0aGlzLnVwZGF0ZVJlY29yZGluZ1ZpZGVvU3VwcG9ydC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nVmlkZW9QZW9wbGVMaW1pdDogdGhpcy51cGRhdGVSZWNvcmRpbmdWaWRlb1Blb3BsZUxpbWl0LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRpbmdWaWRlb1BhcnRpY2lwYW50c1RpbWVMaW1pdDpcbiAgICAgICAgdGhpcy51cGRhdGVSZWNvcmRpbmdWaWRlb1BhcnRpY2lwYW50c1RpbWVMaW1pdC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nQWxsUGFydGljaXBhbnRzU3VwcG9ydDogdGhpcy51cGRhdGVSZWNvcmRpbmdBbGxQYXJ0aWNpcGFudHNTdXBwb3J0LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRpbmdWaWRlb1BhcnRpY2lwYW50c1N1cHBvcnQ6XG4gICAgICAgIHRoaXMudXBkYXRlUmVjb3JkaW5nVmlkZW9QYXJ0aWNpcGFudHNTdXBwb3J0LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRpbmdBbGxQYXJ0aWNpcGFudHNGdWxsUm9vbVN1cHBvcnQ6XG4gICAgICAgIHRoaXMudXBkYXRlUmVjb3JkaW5nQWxsUGFydGljaXBhbnRzRnVsbFJvb21TdXBwb3J0LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRpbmdWaWRlb1BhcnRpY2lwYW50c0Z1bGxSb29tU3VwcG9ydDpcbiAgICAgICAgdGhpcy51cGRhdGVSZWNvcmRpbmdWaWRlb1BhcnRpY2lwYW50c0Z1bGxSb29tU3VwcG9ydC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nUHJlZmVycmVkT3JpZW50YXRpb246IHRoaXMudXBkYXRlUmVjb3JkaW5nUHJlZmVycmVkT3JpZW50YXRpb24uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ1N1cHBvcnRGb3JPdGhlck9yaWVudGF0aW9uOlxuICAgICAgICB0aGlzLnVwZGF0ZVJlY29yZGluZ1N1cHBvcnRGb3JPdGhlck9yaWVudGF0aW9uLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRpbmdNdWx0aUZvcm1hdHNTdXBwb3J0OiB0aGlzLnVwZGF0ZVJlY29yZGluZ011bHRpRm9ybWF0c1N1cHBvcnQuYmluZCh0aGlzKSxcblxuICAgICAgdXBkYXRlVXNlclJlY29yZGluZ1BhcmFtczogdGhpcy51cGRhdGVVc2VyUmVjb3JkaW5nUGFyYW1zLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVDYW5SZWNvcmQ6IHRoaXMudXBkYXRlQ2FuUmVjb3JkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVTdGFydFJlcG9ydDogdGhpcy51cGRhdGVTdGFydFJlcG9ydC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlRW5kUmVwb3J0OiB0aGlzLnVwZGF0ZUVuZFJlcG9ydC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkVGltZXJJbnRlcnZhbDogdGhpcy51cGRhdGVSZWNvcmRUaW1lckludGVydmFsLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRTdGFydFRpbWU6IHRoaXMudXBkYXRlUmVjb3JkU3RhcnRUaW1lLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRFbGFwc2VkVGltZTogdGhpcy51cGRhdGVSZWNvcmRFbGFwc2VkVGltZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlSXNUaW1lclJ1bm5pbmc6IHRoaXMudXBkYXRlSXNUaW1lclJ1bm5pbmcuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUNhblBhdXNlUmVzdW1lOiB0aGlzLnVwZGF0ZUNhblBhdXNlUmVzdW1lLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRDaGFuZ2VTZWNvbmRzOiB0aGlzLnVwZGF0ZVJlY29yZENoYW5nZVNlY29uZHMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVBhdXNlTGltaXQ6IHRoaXMudXBkYXRlUGF1c2VMaW1pdC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUGF1c2VSZWNvcmRDb3VudDogdGhpcy51cGRhdGVQYXVzZVJlY29yZENvdW50LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVDYW5MYXVuY2hSZWNvcmQ6IHRoaXMudXBkYXRlQ2FuTGF1bmNoUmVjb3JkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVTdG9wTGF1bmNoUmVjb3JkOiB0aGlzLnVwZGF0ZVN0b3BMYXVuY2hSZWNvcmQuYmluZCh0aGlzKSxcblxuICAgICAgdXBkYXRlUGFydGljaXBhbnRzQWxsOiB0aGlzLnVwZGF0ZVBhcnRpY2lwYW50c0FsbC5iaW5kKHRoaXMpLFxuXG4gICAgICB1cGRhdGVGaXJzdEFsbDogdGhpcy51cGRhdGVGaXJzdEFsbC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlVXBkYXRlTWFpbldpbmRvdzogdGhpcy51cGRhdGVVcGRhdGVNYWluV2luZG93LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVGaXJzdF9yb3VuZDogdGhpcy51cGRhdGVGaXJzdF9yb3VuZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTGFuZFNjYXBlZDogdGhpcy51cGRhdGVMYW5kU2NhcGVkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVMb2NrX3NjcmVlbjogdGhpcy51cGRhdGVMb2NrX3NjcmVlbi5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlU2NyZWVuSWQ6IHRoaXMudXBkYXRlU2NyZWVuSWQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUFsbFZpZGVvU3RyZWFtczogdGhpcy51cGRhdGVBbGxWaWRlb1N0cmVhbXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZU5ld0xpbWl0ZWRTdHJlYW1zOiB0aGlzLnVwZGF0ZU5ld0xpbWl0ZWRTdHJlYW1zLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVOZXdMaW1pdGVkU3RyZWFtc0lEczogdGhpcy51cGRhdGVOZXdMaW1pdGVkU3RyZWFtc0lEcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQWN0aXZlU291bmRzOiB0aGlzLnVwZGF0ZUFjdGl2ZVNvdW5kcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlU2NyZWVuU2hhcmVJRFN0cmVhbTogdGhpcy51cGRhdGVTY3JlZW5TaGFyZUlEU3RyZWFtLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVTY3JlZW5TaGFyZU5hbWVTdHJlYW06IHRoaXMudXBkYXRlU2NyZWVuU2hhcmVOYW1lU3RyZWFtLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVBZG1pbklEU3RyZWFtOiB0aGlzLnVwZGF0ZUFkbWluSURTdHJlYW0uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUFkbWluTmFtZVN0cmVhbTogdGhpcy51cGRhdGVBZG1pbk5hbWVTdHJlYW0uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVlvdVlvdVN0cmVhbTogdGhpcy51cGRhdGVZb3VZb3VTdHJlYW0uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVlvdVlvdVN0cmVhbUlEczogdGhpcy51cGRhdGVZb3VZb3VTdHJlYW1JRHMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUxvY2FsU3RyZWFtOiB0aGlzLnVwZGF0ZUxvY2FsU3RyZWFtLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRTdGFydGVkOiB0aGlzLnVwZGF0ZVJlY29yZFN0YXJ0ZWQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZFJlc3VtZWQ6IHRoaXMudXBkYXRlUmVjb3JkUmVzdW1lZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkUGF1c2VkOiB0aGlzLnVwZGF0ZVJlY29yZFBhdXNlZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkU3RvcHBlZDogdGhpcy51cGRhdGVSZWNvcmRTdG9wcGVkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVBZG1pblJlc3RyaWN0U2V0dGluZzogdGhpcy51cGRhdGVBZG1pblJlc3RyaWN0U2V0dGluZy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlVmlkZW9SZXF1ZXN0U3RhdGU6IHRoaXMudXBkYXRlVmlkZW9SZXF1ZXN0U3RhdGUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVZpZGVvUmVxdWVzdFRpbWU6IHRoaXMudXBkYXRlVmlkZW9SZXF1ZXN0VGltZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlVmlkZW9BY3Rpb246IHRoaXMudXBkYXRlVmlkZW9BY3Rpb24uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUxvY2FsU3RyZWFtVmlkZW86IHRoaXMudXBkYXRlTG9jYWxTdHJlYW1WaWRlby5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlVXNlckRlZmF1bHRWaWRlb0lucHV0RGV2aWNlOiB0aGlzLnVwZGF0ZVVzZXJEZWZhdWx0VmlkZW9JbnB1dERldmljZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQ3VycmVudEZhY2luZ01vZGU6IHRoaXMudXBkYXRlQ3VycmVudEZhY2luZ01vZGUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVByZXZGYWNpbmdNb2RlOiB0aGlzLnVwZGF0ZVByZXZGYWNpbmdNb2RlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVEZWZWaWRlb0lEOiB0aGlzLnVwZGF0ZURlZlZpZGVvSUQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUFsbG93ZWQ6IHRoaXMudXBkYXRlQWxsb3dlZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlRGlzcEFjdGl2ZU5hbWVzOiB0aGlzLnVwZGF0ZURpc3BBY3RpdmVOYW1lcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUF9kaXNwQWN0aXZlTmFtZXM6IHRoaXMudXBkYXRlUF9kaXNwQWN0aXZlTmFtZXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUFjdGl2ZU5hbWVzOiB0aGlzLnVwZGF0ZUFjdGl2ZU5hbWVzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVQcmV2QWN0aXZlTmFtZXM6IHRoaXMudXBkYXRlUHJldkFjdGl2ZU5hbWVzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVQX2FjdGl2ZU5hbWVzOiB0aGlzLnVwZGF0ZVBfYWN0aXZlTmFtZXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZU1lbWJlcnNSZWNlaXZlZDogdGhpcy51cGRhdGVNZW1iZXJzUmVjZWl2ZWQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZURlZmVyU2NyZWVuUmVjZWl2ZWQ6IHRoaXMudXBkYXRlRGVmZXJTY3JlZW5SZWNlaXZlZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlSG9zdEZpcnN0U3dpdGNoOiB0aGlzLnVwZGF0ZUhvc3RGaXJzdFN3aXRjaC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTWljQWN0aW9uOiB0aGlzLnVwZGF0ZU1pY0FjdGlvbi5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlU2NyZWVuQWN0aW9uOiB0aGlzLnVwZGF0ZVNjcmVlbkFjdGlvbi5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQ2hhdEFjdGlvbjogdGhpcy51cGRhdGVDaGF0QWN0aW9uLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVBdWRpb1JlcXVlc3RTdGF0ZTogdGhpcy51cGRhdGVBdWRpb1JlcXVlc3RTdGF0ZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlU2NyZWVuUmVxdWVzdFN0YXRlOiB0aGlzLnVwZGF0ZVNjcmVlblJlcXVlc3RTdGF0ZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQ2hhdFJlcXVlc3RTdGF0ZTogdGhpcy51cGRhdGVDaGF0UmVxdWVzdFN0YXRlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVBdWRpb1JlcXVlc3RUaW1lOiB0aGlzLnVwZGF0ZUF1ZGlvUmVxdWVzdFRpbWUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVNjcmVlblJlcXVlc3RUaW1lOiB0aGlzLnVwZGF0ZVNjcmVlblJlcXVlc3RUaW1lLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVDaGF0UmVxdWVzdFRpbWU6IHRoaXMudXBkYXRlQ2hhdFJlcXVlc3RUaW1lLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVPbGRTb3VuZElkczogdGhpcy51cGRhdGVPbGRTb3VuZElkcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlSG9zdExhYmVsOiB0aGlzLnVwZGF0ZUhvc3RMYWJlbC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTWFpblNjcmVlbkZpbGxlZDogdGhpcy51cGRhdGVNYWluU2NyZWVuRmlsbGVkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVMb2NhbFN0cmVhbVNjcmVlbjogdGhpcy51cGRhdGVMb2NhbFN0cmVhbVNjcmVlbi5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlU2NyZWVuQWxyZWFkeU9uOiB0aGlzLnVwZGF0ZVNjcmVlbkFscmVhZHlPbi5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQ2hhdEFscmVhZHlPbjogdGhpcy51cGRhdGVDaGF0QWxyZWFkeU9uLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWRpcmVjdFVSTDogdGhpcy51cGRhdGVSZWRpcmVjdFVSTC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlT2xkQWxsU3RyZWFtczogdGhpcy51cGRhdGVPbGRBbGxTdHJlYW1zLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVBZG1pblZpZElEOiB0aGlzLnVwZGF0ZUFkbWluVmlkSUQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVN0cmVhbU5hbWVzOiB0aGlzLnVwZGF0ZVN0cmVhbU5hbWVzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVOb25fYWxWaWRlb1N0cmVhbXM6IHRoaXMudXBkYXRlTm9uX2FsVmlkZW9TdHJlYW1zLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVTb3J0QXVkaW9Mb3VkbmVzczogdGhpcy51cGRhdGVTb3J0QXVkaW9Mb3VkbmVzcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQXVkaW9EZWNpYmVsczogdGhpcy51cGRhdGVBdWRpb0RlY2liZWxzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVNaXhlZF9hbFZpZGVvU3RyZWFtczogdGhpcy51cGRhdGVNaXhlZF9hbFZpZGVvU3RyZWFtcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTm9uX2FsVmlkZW9TdHJlYW1zX211dGVkOiB0aGlzLnVwZGF0ZU5vbl9hbFZpZGVvU3RyZWFtc19tdXRlZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUGFnaW5hdGVkU3RyZWFtczogdGhpcy51cGRhdGVQYWdpbmF0ZWRTdHJlYW1zLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVMb2NhbFN0cmVhbUF1ZGlvOiB0aGlzLnVwZGF0ZUxvY2FsU3RyZWFtQXVkaW8uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZURlZkF1ZGlvSUQ6IHRoaXMudXBkYXRlRGVmQXVkaW9JRC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlVXNlckRlZmF1bHRBdWRpb0lucHV0RGV2aWNlOiB0aGlzLnVwZGF0ZVVzZXJEZWZhdWx0QXVkaW9JbnB1dERldmljZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlVXNlckRlZmF1bHRBdWRpb091dHB1dERldmljZTogdGhpcy51cGRhdGVVc2VyRGVmYXVsdEF1ZGlvT3V0cHV0RGV2aWNlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVQcmV2QXVkaW9JbnB1dERldmljZTogdGhpcy51cGRhdGVQcmV2QXVkaW9JbnB1dERldmljZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUHJldlZpZGVvSW5wdXREZXZpY2U6IHRoaXMudXBkYXRlUHJldlZpZGVvSW5wdXREZXZpY2UuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUF1ZGlvUGF1c2VkOiB0aGlzLnVwZGF0ZUF1ZGlvUGF1c2VkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVNYWluU2NyZWVuUGVyc29uOiB0aGlzLnVwZGF0ZU1haW5TY3JlZW5QZXJzb24uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUFkbWluT25NYWluU2NyZWVuOiB0aGlzLnVwZGF0ZUFkbWluT25NYWluU2NyZWVuLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVTY3JlZW5TdGF0ZXM6IHRoaXMudXBkYXRlU2NyZWVuU3RhdGVzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVQcmV2U2NyZWVuU3RhdGVzOiB0aGlzLnVwZGF0ZVByZXZTY3JlZW5TdGF0ZXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVVwZGF0ZURhdGVTdGF0ZTogdGhpcy51cGRhdGVVcGRhdGVEYXRlU3RhdGUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUxhc3RVcGRhdGU6IHRoaXMudXBkYXRlTGFzdFVwZGF0ZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTkZvclJlYWRqdXN0UmVjb3JkOiB0aGlzLnVwZGF0ZU5Gb3JSZWFkanVzdFJlY29yZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlRml4ZWRQYWdlTGltaXQ6IHRoaXMudXBkYXRlRml4ZWRQYWdlTGltaXQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlbW92ZUFsdEdyaWQ6IHRoaXMudXBkYXRlUmVtb3ZlQWx0R3JpZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTkZvclJlYWRqdXN0OiB0aGlzLnVwZGF0ZU5Gb3JSZWFkanVzdC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTGFzdFJlb3JkZXJUaW1lOiB0aGlzLnVwZGF0ZUxhc3RSZW9yZGVyVGltZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQXVkU3RyZWFtTmFtZXM6IHRoaXMudXBkYXRlQXVkU3RyZWFtTmFtZXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUN1cnJlbnRVc2VyUGFnZTogdGhpcy51cGRhdGVDdXJyZW50VXNlclBhZ2UuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZU1haW5IZWlnaHRXaWR0aDogdGhpcy51cGRhdGVNYWluSGVpZ2h0V2lkdGguYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVByZXZNYWluSGVpZ2h0V2lkdGg6IHRoaXMudXBkYXRlUHJldk1haW5IZWlnaHRXaWR0aC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUHJldkRvUGFnaW5hdGU6IHRoaXMudXBkYXRlUHJldkRvUGFnaW5hdGUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZURvUGFnaW5hdGU6IHRoaXMudXBkYXRlRG9QYWdpbmF0ZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlU2hhcmVFbmRlZDogdGhpcy51cGRhdGVTaGFyZUVuZGVkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVMU3RyZWFtczogdGhpcy51cGRhdGVMU3RyZWFtcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQ2hhdFJlZlN0cmVhbXM6IHRoaXMudXBkYXRlQ2hhdFJlZlN0cmVhbXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUNvbnRyb2xIZWlnaHQ6IHRoaXMudXBkYXRlQ29udHJvbEhlaWdodC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlSXNXaWRlU2NyZWVuOiB0aGlzLnVwZGF0ZUlzV2lkZVNjcmVlbi5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlSXNNZWRpdW1TY3JlZW46IHRoaXMudXBkYXRlSXNNZWRpdW1TY3JlZW4uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUlzU21hbGxTY3JlZW46IHRoaXMudXBkYXRlSXNTbWFsbFNjcmVlbi5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQWRkR3JpZDogdGhpcy51cGRhdGVBZGRHcmlkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVBZGRBbHRHcmlkOiB0aGlzLnVwZGF0ZUFkZEFsdEdyaWQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUdyaWRSb3dzOiB0aGlzLnVwZGF0ZUdyaWRSb3dzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVHcmlkQ29sczogdGhpcy51cGRhdGVHcmlkQ29scy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQWx0R3JpZFJvd3M6IHRoaXMudXBkYXRlQWx0R3JpZFJvd3MuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUFsdEdyaWRDb2xzOiB0aGlzLnVwZGF0ZUFsdEdyaWRDb2xzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVOdW1iZXJQYWdlczogdGhpcy51cGRhdGVOdW1iZXJQYWdlcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQ3VycmVudFN0cmVhbXM6IHRoaXMudXBkYXRlQ3VycmVudFN0cmVhbXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVNob3dNaW5pVmlldzogdGhpcy51cGRhdGVTaG93TWluaVZpZXcuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZU5TdHJlYW06IHRoaXMudXBkYXRlTlN0cmVhbS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlRGVmZXJfcmVjZWl2ZTogdGhpcy51cGRhdGVEZWZlcl9yZWNlaXZlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVBbGxBdWRpb1N0cmVhbXM6IHRoaXMudXBkYXRlQWxsQXVkaW9TdHJlYW1zLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZW1vdGVTY3JlZW5TdHJlYW06IHRoaXMudXBkYXRlUmVtb3RlU2NyZWVuU3RyZWFtLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVTY3JlZW5Qcm9kdWNlcjogdGhpcy51cGRhdGVTY3JlZW5Qcm9kdWNlci5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlR290QWxsVmlkczogdGhpcy51cGRhdGVHb3RBbGxWaWRzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVQYWdpbmF0aW9uSGVpZ2h0V2lkdGg6IHRoaXMudXBkYXRlUGFnaW5hdGlvbkhlaWdodFdpZHRoLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVQYWdpbmF0aW9uRGlyZWN0aW9uOiB0aGlzLnVwZGF0ZVBhZ2luYXRpb25EaXJlY3Rpb24uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUdyaWRTaXplczogdGhpcy51cGRhdGVHcmlkU2l6ZXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVNjcmVlbkZvcmNlRnVsbERpc3BsYXk6IHRoaXMudXBkYXRlU2NyZWVuRm9yY2VGdWxsRGlzcGxheS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTWFpbkdyaWRTdHJlYW06IHRoaXMudXBkYXRlTWFpbkdyaWRTdHJlYW0uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZU90aGVyR3JpZFN0cmVhbXM6IHRoaXMudXBkYXRlT3RoZXJHcmlkU3RyZWFtcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQXVkaW9Pbmx5U3RyZWFtczogdGhpcy51cGRhdGVBdWRpb09ubHlTdHJlYW1zLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVWaWRlb0lucHV0czogdGhpcy51cGRhdGVWaWRlb0lucHV0cy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQXVkaW9JbnB1dHM6IHRoaXMudXBkYXRlQXVkaW9JbnB1dHMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZU1lZXRpbmdQcm9ncmVzc1RpbWU6IHRoaXMudXBkYXRlTWVldGluZ1Byb2dyZXNzVGltZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTWVldGluZ0VsYXBzZWRUaW1lOiB0aGlzLnVwZGF0ZU1lZXRpbmdFbGFwc2VkVGltZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVmX3BhcnRpY2lwYW50czogdGhpcy51cGRhdGVSZWZfcGFydGljaXBhbnRzLmJpbmQodGhpcyksXG5cbiAgICAgIHVwZGF0ZU1lc3NhZ2VzOiB0aGlzLnVwZGF0ZU1lc3NhZ2VzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVTdGFydERpcmVjdE1lc3NhZ2U6IHRoaXMudXBkYXRlU3RhcnREaXJlY3RNZXNzYWdlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVEaXJlY3RNZXNzYWdlRGV0YWlsczogdGhpcy51cGRhdGVEaXJlY3RNZXNzYWdlRGV0YWlscy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlU2hvd01lc3NhZ2VzQmFkZ2U6IHRoaXMudXBkYXRlU2hvd01lc3NhZ2VzQmFkZ2UuYmluZCh0aGlzKSxcblxuICAgICAgLy8gRXZlbnQgc2V0dGluZ3NcbiAgICAgIHVwZGF0ZUF1ZGlvU2V0dGluZzogdGhpcy51cGRhdGVBdWRpb1NldHRpbmcuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVZpZGVvU2V0dGluZzogdGhpcy51cGRhdGVWaWRlb1NldHRpbmcuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVNjcmVlbnNoYXJlU2V0dGluZzogdGhpcy51cGRhdGVTY3JlZW5zaGFyZVNldHRpbmcuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUNoYXRTZXR0aW5nOiB0aGlzLnVwZGF0ZUNoYXRTZXR0aW5nLmJpbmQodGhpcyksXG5cbiAgICAgIC8vIERpc3BsYXkgc2V0dGluZ3NcbiAgICAgIHVwZGF0ZUF1dG9XYXZlOiB0aGlzLnVwZGF0ZUF1dG9XYXZlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVGb3JjZUZ1bGxEaXNwbGF5OiB0aGlzLnVwZGF0ZUZvcmNlRnVsbERpc3BsYXkuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVByZXZGb3JjZUZ1bGxEaXNwbGF5OiB0aGlzLnVwZGF0ZVByZXZGb3JjZUZ1bGxEaXNwbGF5LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVQcmV2TWVldGluZ0Rpc3BsYXlUeXBlOiB0aGlzLnVwZGF0ZVByZXZNZWV0aW5nRGlzcGxheVR5cGUuYmluZCh0aGlzKSxcblxuICAgICAgLy8gV2FpdGluZyByb29tXG4gICAgICB1cGRhdGVXYWl0aW5nUm9vbUZpbHRlcjogdGhpcy51cGRhdGVXYWl0aW5nUm9vbUZpbHRlci5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlV2FpdGluZ1Jvb21MaXN0OiB0aGlzLnVwZGF0ZVdhaXRpbmdSb29tTGlzdC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlV2FpdGluZ1Jvb21Db3VudGVyOiB0aGlzLnVwZGF0ZVdhaXRpbmdSb29tQ291bnRlci5iaW5kKHRoaXMpLFxuXG4gICAgICAvLyBSZXF1ZXN0c1xuICAgICAgdXBkYXRlUmVxdWVzdEZpbHRlcjogdGhpcy51cGRhdGVSZXF1ZXN0RmlsdGVyLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZXF1ZXN0TGlzdDogdGhpcy51cGRhdGVSZXF1ZXN0TGlzdC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVxdWVzdENvdW50ZXI6IHRoaXMudXBkYXRlUmVxdWVzdENvdW50ZXIuYmluZCh0aGlzKSxcblxuICAgICAgLy8gVG90YWwgcmVxdWVzdHMgYW5kIHdhaXRpbmcgcm9vbVxuICAgICAgdXBkYXRlVG90YWxSZXFXYWl0OiB0aGlzLnVwZGF0ZVRvdGFsUmVxV2FpdC5iaW5kKHRoaXMpLFxuXG4gICAgICAvLyBNZW51IG1vZGFsc1xuICAgICAgdXBkYXRlSXNNZW51TW9kYWxWaXNpYmxlOiB0aGlzLnVwZGF0ZUlzTWVudU1vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlSXNSZWNvcmRpbmdNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNSZWNvcmRpbmdNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUlzU2V0dGluZ3NNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNTZXR0aW5nc01vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlSXNSZXF1ZXN0c01vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc1JlcXVlc3RzTW9kYWxWaXNpYmxlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVJc1dhaXRpbmdNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNXYWl0aW5nTW9kYWxWaXNpYmxlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVJc0NvSG9zdE1vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc0NvSG9zdE1vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlSXNNZWRpYVNldHRpbmdzTW9kYWxWaXNpYmxlOiB0aGlzLnVwZGF0ZUlzTWVkaWFTZXR0aW5nc01vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlSXNEaXNwbGF5U2V0dGluZ3NNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNEaXNwbGF5U2V0dGluZ3NNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcblxuICAgICAgLy8gT3RoZXIgbW9kYWxzXG4gICAgICB1cGRhdGVJc1BhcnRpY2lwYW50c01vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc1BhcnRpY2lwYW50c01vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlSXNNZXNzYWdlc01vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc01lc3NhZ2VzTW9kYWxWaXNpYmxlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVJc0NvbmZpcm1FeGl0TW9kYWxWaXNpYmxlOiB0aGlzLnVwZGF0ZUlzQ29uZmlybUV4aXRNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUlzQ29uZmlybUhlcmVNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNDb25maXJtSGVyZU1vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlSXNMb2FkaW5nTW9kYWxWaXNpYmxlOiB0aGlzLnVwZGF0ZUlzTG9hZGluZ01vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuXG4gICAgICAvLyBSZWNvcmRpbmcgT3B0aW9uc1xuICAgICAgdXBkYXRlUmVjb3JkaW5nTWVkaWFPcHRpb25zOiB0aGlzLnVwZGF0ZVJlY29yZGluZ01lZGlhT3B0aW9ucy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nQXVkaW9PcHRpb25zOiB0aGlzLnVwZGF0ZVJlY29yZGluZ0F1ZGlvT3B0aW9ucy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nVmlkZW9PcHRpb25zOiB0aGlzLnVwZGF0ZVJlY29yZGluZ1ZpZGVvT3B0aW9ucy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nVmlkZW9UeXBlOiB0aGlzLnVwZGF0ZVJlY29yZGluZ1ZpZGVvVHlwZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nVmlkZW9PcHRpbWl6ZWQ6IHRoaXMudXBkYXRlUmVjb3JkaW5nVmlkZW9PcHRpbWl6ZWQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ0Rpc3BsYXlUeXBlOiB0aGlzLnVwZGF0ZVJlY29yZGluZ0Rpc3BsYXlUeXBlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRpbmdBZGRITFM6IHRoaXMudXBkYXRlUmVjb3JkaW5nQWRkSExTLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRpbmdBZGRUZXh0OiB0aGlzLnVwZGF0ZVJlY29yZGluZ0FkZFRleHQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ0N1c3RvbVRleHQ6IHRoaXMudXBkYXRlUmVjb3JkaW5nQ3VzdG9tVGV4dC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nQ3VzdG9tVGV4dFBvc2l0aW9uOiB0aGlzLnVwZGF0ZVJlY29yZGluZ0N1c3RvbVRleHRQb3NpdGlvbi5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nQ3VzdG9tVGV4dENvbG9yOiB0aGlzLnVwZGF0ZVJlY29yZGluZ0N1c3RvbVRleHRDb2xvci5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nTmFtZVRhZ3M6IHRoaXMudXBkYXRlUmVjb3JkaW5nTmFtZVRhZ3MuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ0JhY2tncm91bmRDb2xvcjogdGhpcy51cGRhdGVSZWNvcmRpbmdCYWNrZ3JvdW5kQ29sb3IuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ05hbWVUYWdzQ29sb3I6IHRoaXMudXBkYXRlUmVjb3JkaW5nTmFtZVRhZ3NDb2xvci5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nT3JpZW50YXRpb25WaWRlbzogdGhpcy51cGRhdGVSZWNvcmRpbmdPcmllbnRhdGlvblZpZGVvLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVDbGVhcmVkVG9SZXN1bWU6IHRoaXMudXBkYXRlQ2xlYXJlZFRvUmVzdW1lLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVDbGVhcmVkVG9SZWNvcmQ6IHRoaXMudXBkYXRlQ2xlYXJlZFRvUmVjb3JkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRTdGF0ZTogdGhpcy51cGRhdGVSZWNvcmRTdGF0ZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlU2hvd1JlY29yZEJ1dHRvbnM6IHRoaXMudXBkYXRlU2hvd1JlY29yZEJ1dHRvbnMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ1Byb2dyZXNzVGltZTogdGhpcy51cGRhdGVSZWNvcmRpbmdQcm9ncmVzc1RpbWUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUF1ZGlvU3dpdGNoaW5nOiB0aGlzLnVwZGF0ZUF1ZGlvU3dpdGNoaW5nLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVWaWRlb1N3aXRjaGluZzogdGhpcy51cGRhdGVWaWRlb1N3aXRjaGluZy5iaW5kKHRoaXMpLFxuXG4gICAgICAvLyBNZWRpYSBzdGF0ZXNcbiAgICAgIHVwZGF0ZVZpZGVvQWxyZWFkeU9uOiB0aGlzLnVwZGF0ZVZpZGVvQWxyZWFkeU9uLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVBdWRpb0FscmVhZHlPbjogdGhpcy51cGRhdGVBdWRpb0FscmVhZHlPbi5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQ29tcG9uZW50U2l6ZXM6IHRoaXMudXBkYXRlQ29tcG9uZW50U2l6ZXMuYmluZCh0aGlzKSxcblxuICAgICAgLy8gUGVybWlzc2lvbnNcbiAgICAgIHVwZGF0ZUhhc0NhbWVyYVBlcm1pc3Npb246IHRoaXMudXBkYXRlSGFzQ2FtZXJhUGVybWlzc2lvbi5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlSGFzQXVkaW9QZXJtaXNzaW9uOiB0aGlzLnVwZGF0ZUhhc0F1ZGlvUGVybWlzc2lvbi5iaW5kKHRoaXMpLFxuXG4gICAgICAvLyBUcmFuc3BvcnRzXG4gICAgICB1cGRhdGVUcmFuc3BvcnRDcmVhdGVkOiB0aGlzLnVwZGF0ZVRyYW5zcG9ydENyZWF0ZWQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVRyYW5zcG9ydENyZWF0ZWRWaWRlbzogdGhpcy51cGRhdGVUcmFuc3BvcnRDcmVhdGVkVmlkZW8uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVRyYW5zcG9ydENyZWF0ZWRBdWRpbzogdGhpcy51cGRhdGVUcmFuc3BvcnRDcmVhdGVkQXVkaW8uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVRyYW5zcG9ydENyZWF0ZWRTY3JlZW46IHRoaXMudXBkYXRlVHJhbnNwb3J0Q3JlYXRlZFNjcmVlbi5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUHJvZHVjZXJUcmFuc3BvcnQ6IHRoaXMudXBkYXRlUHJvZHVjZXJUcmFuc3BvcnQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVZpZGVvUHJvZHVjZXI6IHRoaXMudXBkYXRlVmlkZW9Qcm9kdWNlci5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUGFyYW1zOiB0aGlzLnVwZGF0ZVBhcmFtcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlVmlkZW9QYXJhbXM6IHRoaXMudXBkYXRlVmlkZW9QYXJhbXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUF1ZGlvUGFyYW1zOiB0aGlzLnVwZGF0ZUF1ZGlvUGFyYW1zLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVBdWRpb1Byb2R1Y2VyOiB0aGlzLnVwZGF0ZUF1ZGlvUHJvZHVjZXIuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUNvbnN1bWVyVHJhbnNwb3J0czogdGhpcy51cGRhdGVDb25zdW1lclRyYW5zcG9ydHMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUNvbnN1bWluZ1RyYW5zcG9ydHM6IHRoaXMudXBkYXRlQ29uc3VtaW5nVHJhbnNwb3J0cy5iaW5kKHRoaXMpLFxuXG4gICAgICAvLyBQb2xsc1xuICAgICAgdXBkYXRlUG9sbHM6IHRoaXMudXBkYXRlUG9sbHMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVBvbGw6IHRoaXMudXBkYXRlUG9sbC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlSXNQb2xsTW9kYWxWaXNpYmxlOiB0aGlzLnVwZGF0ZUlzUG9sbE1vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuXG4gICAgICAvLyBCYWNrZ3JvdW5kXG4gICAgICB1cGRhdGVDdXN0b21JbWFnZTogdGhpcy51cGRhdGVDdXN0b21JbWFnZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlU2VsZWN0ZWRJbWFnZTogdGhpcy51cGRhdGVTZWxlY3RlZEltYWdlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVTZWdtZW50VmlkZW86IHRoaXMudXBkYXRlU2VnbWVudFZpZGVvLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVTZWxmaWVTZWdtZW50YXRpb246IHRoaXMudXBkYXRlU2VsZmllU2VnbWVudGF0aW9uLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVQYXVzZVNlZ21lbnRhdGlvbjogdGhpcy51cGRhdGVQYXVzZVNlZ21lbnRhdGlvbi5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUHJvY2Vzc2VkU3RyZWFtOiB0aGlzLnVwZGF0ZVByb2Nlc3NlZFN0cmVhbS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlS2VlcEJhY2tncm91bmQ6IHRoaXMudXBkYXRlS2VlcEJhY2tncm91bmQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUJhY2tncm91bmRIYXNDaGFuZ2VkOiB0aGlzLnVwZGF0ZUJhY2tncm91bmRIYXNDaGFuZ2VkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVWaXJ0dWFsU3RyZWFtOiB0aGlzLnVwZGF0ZVZpcnR1YWxTdHJlYW0uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZU1haW5DYW52YXM6IHRoaXMudXBkYXRlTWFpbkNhbnZhcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUHJldktlZXBCYWNrZ3JvdW5kOiB0aGlzLnVwZGF0ZVByZXZLZWVwQmFja2dyb3VuZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQXBwbGllZEJhY2tncm91bmQ6IHRoaXMudXBkYXRlQXBwbGllZEJhY2tncm91bmQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUlzQmFja2dyb3VuZE1vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc0JhY2tncm91bmRNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUF1dG9DbGlja0JhY2tncm91bmQ6IHRoaXMudXBkYXRlQXV0b0NsaWNrQmFja2dyb3VuZC5iaW5kKHRoaXMpLFxuXG4gICAgICAvLyBCcmVha291dCByb29tc1xuICAgICAgdXBkYXRlQnJlYWtvdXRSb29tczogdGhpcy51cGRhdGVCcmVha291dFJvb21zLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVDdXJyZW50Um9vbUluZGV4OiB0aGlzLnVwZGF0ZUN1cnJlbnRSb29tSW5kZXguYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUNhblN0YXJ0QnJlYWtvdXQ6IHRoaXMudXBkYXRlQ2FuU3RhcnRCcmVha291dC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQnJlYWtPdXRSb29tU3RhcnRlZDogdGhpcy51cGRhdGVCcmVha091dFJvb21TdGFydGVkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVCcmVha091dFJvb21FbmRlZDogdGhpcy51cGRhdGVCcmVha091dFJvb21FbmRlZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlSG9zdE5ld1Jvb206IHRoaXMudXBkYXRlSG9zdE5ld1Jvb20uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUxpbWl0ZWRCcmVha1Jvb206IHRoaXMudXBkYXRlTGltaXRlZEJyZWFrUm9vbS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTWFpblJvb21zTGVuZ3RoOiB0aGlzLnVwZGF0ZU1haW5Sb29tc0xlbmd0aC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTWVtYmVyUm9vbTogdGhpcy51cGRhdGVNZW1iZXJSb29tLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVJc0JyZWFrb3V0Um9vbXNNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNCcmVha291dFJvb21zTW9kYWxWaXNpYmxlLmJpbmQodGhpcyksXG5cbiAgICAgIC8vIFdoaXRlYm9hcmRcbiAgICAgIHVwZGF0ZVdoaXRlYm9hcmRVc2VyczogdGhpcy51cGRhdGVXaGl0ZWJvYXJkVXNlcnMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUN1cnJlbnRXaGl0ZWJvYXJkSW5kZXg6IHRoaXMudXBkYXRlQ3VycmVudFdoaXRlYm9hcmRJbmRleC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQ2FuU3RhcnRXaGl0ZWJvYXJkOiB0aGlzLnVwZGF0ZUNhblN0YXJ0V2hpdGVib2FyZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlV2hpdGVib2FyZFN0YXJ0ZWQ6IHRoaXMudXBkYXRlV2hpdGVib2FyZFN0YXJ0ZWQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVdoaXRlYm9hcmRFbmRlZDogdGhpcy51cGRhdGVXaGl0ZWJvYXJkRW5kZWQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVdoaXRlYm9hcmRMaW1pdDogdGhpcy51cGRhdGVXaGl0ZWJvYXJkTGltaXQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUlzV2hpdGVib2FyZE1vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc1doaXRlYm9hcmRNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUlzQ29uZmlndXJlV2hpdGVib2FyZE1vZGFsVmlzaWJsZTpcbiAgICAgICAgdGhpcy51cGRhdGVJc0NvbmZpZ3VyZVdoaXRlYm9hcmRNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVNoYXBlczogdGhpcy51cGRhdGVTaGFwZXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVVzZUltYWdlQmFja2dyb3VuZDogdGhpcy51cGRhdGVVc2VJbWFnZUJhY2tncm91bmQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlZG9TdGFjazogdGhpcy51cGRhdGVSZWRvU3RhY2suYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVVuZG9TdGFjazogdGhpcy51cGRhdGVVbmRvU3RhY2suYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUNhbnZhc1N0cmVhbTogdGhpcy51cGRhdGVDYW52YXNTdHJlYW0uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUNhbnZhc1doaXRlYm9hcmQ6IHRoaXMudXBkYXRlQ2FudmFzV2hpdGVib2FyZC5iaW5kKHRoaXMpLFxuXG4gICAgICAvLyBTY3JlZW5ib2FyZFxuICAgICAgdXBkYXRlQ2FudmFzU2NyZWVuYm9hcmQ6IHRoaXMudXBkYXRlQ2FudmFzU2NyZWVuYm9hcmQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVByb2Nlc3NlZFNjcmVlblN0cmVhbTogdGhpcy51cGRhdGVQcm9jZXNzZWRTY3JlZW5TdHJlYW0uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUFubm90YXRlU2NyZWVuU3RyZWFtOiB0aGlzLnVwZGF0ZUFubm90YXRlU2NyZWVuU3RyZWFtLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVNYWluU2NyZWVuQ2FudmFzOiB0aGlzLnVwZGF0ZU1haW5TY3JlZW5DYW52YXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUlzU2NyZWVuYm9hcmRNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNTY3JlZW5ib2FyZE1vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuXG4gICAgICAvLyBPdGhlciBmdW5jdGlvbnNcbiAgICAgIGNoZWNrT3JpZW50YXRpb246IHRoaXMuY2hlY2tPcmllbnRhdGlvbi5iaW5kKHRoaXMpLFxuXG4gICAgICB1cGRhdGVEZXZpY2U6IHRoaXMudXBkYXRlRGV2aWNlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVTb2NrZXQ6IHRoaXMudXBkYXRlU29ja2V0LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVWYWxpZGF0ZWQ6IHRoaXMudXBkYXRlVmFsaWRhdGVkLmJpbmQodGhpcyksXG5cbiAgICAgIHNob3dBbGVydDogdGhpcy5zaG93QWxlcnQuYmluZCh0aGlzKSxcbiAgICAgIGdldFVwZGF0ZWRBbGxQYXJhbXM6ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAuLi50aGlzLmdldEFsbFBhcmFtcygpLFxuICAgICAgICAgIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSxcbiAgICAgICAgfTtcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuXG4gIG1lZGlhU0ZVUGFyYW1ldGVycyA9IHtcbiAgICAuLi50aGlzLmdldEFsbFBhcmFtcygpLFxuICAgIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSxcbiAgfTtcblxuICBnZXRVcGRhdGVkQWxsUGFyYW1zID0gKCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAuLi50aGlzLmdldEFsbFBhcmFtcygpLFxuICAgICAgLi4udGhpcy5tZWRpYVNGVUZ1bmN0aW9ucygpLFxuICAgIH07XG4gIH07XG5cbiAgUHJlam9pblBhZ2VDb21wb25lbnQ6IGFueSA9IHtcbiAgICBjb21wb25lbnQ6IHRoaXMuUHJlam9pblBhZ2UsXG4gICAgaW5qZWN0b3I6IG51bGwsXG4gIH07XG5cbiAgdXBkYXRlUHJlam9pblBhZ2VDb21wb25lbnQgPSAoKSA9PiB7XG4gICAgY29uc3QgUHJlam9pbkNvbXAgPSB7XG4gICAgICBjb21wb25lbnQ6IHRoaXMuUHJlam9pblBhZ2UsXG4gICAgICBpbmplY3RvcjogdGhpcy5jcmVhdGVJbmplY3Rvcih7XG4gICAgICAgIHBhcmFtZXRlcnM6IHtcbiAgICAgICAgICBzaG93QWxlcnQ6XG4gICAgICAgICAgICB0aGlzLnNob3dBbGVydCB8fFxuICAgICAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3Nob3dBbGVydCBub3QgZGVmaW5lZCcpO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgdXBkYXRlSXNMb2FkaW5nTW9kYWxWaXNpYmxlOiB0aGlzLnVwZGF0ZUlzTG9hZGluZ01vZGFsVmlzaWJsZSxcbiAgICAgICAgICBjb25uZWN0U29ja2V0OiB0aGlzLnNvY2tldE1hbmFnZXIuY29ubmVjdFNvY2tldCxcbiAgICAgICAgICB1cGRhdGVTb2NrZXQ6IHRoaXMudXBkYXRlU29ja2V0LFxuICAgICAgICAgIHVwZGF0ZVZhbGlkYXRlZDogdGhpcy51cGRhdGVWYWxpZGF0ZWQsXG4gICAgICAgICAgdXBkYXRlQXBpVXNlck5hbWU6IHRoaXMudXBkYXRlQXBpVXNlck5hbWUsXG4gICAgICAgICAgdXBkYXRlQXBpVG9rZW46IHRoaXMudXBkYXRlQXBpVG9rZW4sXG4gICAgICAgICAgdXBkYXRlTGluazogdGhpcy51cGRhdGVMaW5rLFxuICAgICAgICAgIHVwZGF0ZVJvb21OYW1lOiB0aGlzLnVwZGF0ZVJvb21OYW1lLFxuICAgICAgICAgIHVwZGF0ZU1lbWJlcjogdGhpcy51cGRhdGVNZW1iZXIsXG4gICAgICAgIH0sXG4gICAgICAgIGNyZWRlbnRpYWxzOiB0aGlzLmNyZWRlbnRpYWxzLFxuICAgICAgfSksXG4gICAgfTtcblxuICAgIHRoaXMuUHJlam9pblBhZ2VDb21wb25lbnQgPSB7IC4uLlByZWpvaW5Db21wIH07XG5cbiAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gIH07XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMuUHJlam9pblBhZ2UpIHtcbiAgICAgIHRoaXMudXBkYXRlUHJlam9pblBhZ2VDb21wb25lbnQoKTtcbiAgICB9XG5cbiAgICB0aGlzLnNldHVwUmVzaXplTGlzdGVuZXIoKTtcbiAgICBpZiAodGhpcy52YWxpZGF0ZWQpIHtcbiAgICAgIHRoaXMuY29ubmVjdEFuZEFkZFNvY2tldE1ldGhvZHMoKTtcbiAgICB9XG5cbiAgICB0aGlzLm1haW5IZWlnaHRXaWR0aFN1YnNjcmlwdGlvbiA9IHRoaXMubWFpbkhlaWdodFdpZHRoLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLnVwZGF0ZU1haW5WaWRlb1NpemUoKTtcbiAgICB9KTtcblxuICAgIHRoaXMucmVjb3JkaW5nU3Vic2NyaXB0aW9uID0gY29tYmluZUxhdGVzdChbXG4gICAgICB0aGlzLnJlY29yZFBhdXNlZCxcbiAgICAgIHRoaXMucmVjb3JkU3RhcnRlZCxcbiAgICAgIHRoaXMucmVjb3JkU3RvcHBlZCxcbiAgICAgIHRoaXMucmVjb3JkUmVzdW1lZCxcbiAgICAgIHRoaXMucmVjb3JkaW5nUHJvZ3Jlc3NUaW1lLFxuICAgICAgdGhpcy5zaG93UmVjb3JkQnV0dG9ucyxcbiAgICAgIHRoaXMuaXNsZXZlbCxcbiAgICBdKS5zdWJzY3JpYmUoXG4gICAgICAoW1xuICAgICAgICByZWNvcmRQYXVzZWQsXG4gICAgICAgIHJlY29yZFN0YXJ0ZWQsXG4gICAgICAgIHJlY29yZFN0b3BwZWQsXG4gICAgICAgIHJlY29yZFJlc3VtZWQsXG4gICAgICAgIHJlY29yZGluZ1Byb2dyZXNzVGltZSxcbiAgICAgICAgc2hvd1JlY29yZEJ1dHRvbnMsXG4gICAgICAgIGlzbGV2ZWwsXG4gICAgICBdKSA9PiB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICByZWNvcmRQYXVzZWQgfHxcbiAgICAgICAgICByZWNvcmRTdGFydGVkIHx8XG4gICAgICAgICAgcmVjb3JkU3RvcHBlZCB8fFxuICAgICAgICAgIHJlY29yZFJlc3VtZWQgfHxcbiAgICAgICAgICByZWNvcmRpbmdQcm9ncmVzc1RpbWUgfHxcbiAgICAgICAgICBzaG93UmVjb3JkQnV0dG9ucyB8fFxuICAgICAgICAgIGlzbGV2ZWxcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy51cGRhdGVSZWNvcmRCdXR0b25zKCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgKTtcbiAgICB0aGlzLnZhbGlkYXRlZFN1YnNjcmlwdGlvbiA9IHRoaXMudmFsaWRhdGVkLnN1YnNjcmliZSgodmFsaWRhdGVkKSA9PiB7XG4gICAgICBpZiAodmFsaWRhdGVkKSB7XG4gICAgICAgIHRoaXMuaGFuZGxlVmFsaWRhdGVkKCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5pc2xldmVsU3Vic2NyaXB0aW9uID0gdGhpcy5pc2xldmVsLnN1YnNjcmliZSgoaXNsZXZlbCkgPT4ge1xuICAgICAgaWYgKGlzbGV2ZWwpIHtcbiAgICAgICAgdGhpcy51cGRhdGVDb250cm9sQnJvYWRjYXN0QnV0dG9ucygpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuY29Ib3N0U3Vic2NyaXB0aW9uID0gY29tYmluZUxhdGVzdChbdGhpcy5jb0hvc3QsIHRoaXMuY29Ib3N0UmVzcG9uc2liaWxpdHldKS5zdWJzY3JpYmUoXG4gICAgICAoW2NvSG9zdCwgY29Ib3N0UmVzcG9uc2liaWxpdHldKSA9PiB7XG4gICAgICAgIGlmIChjb0hvc3QgfHwgY29Ib3N0UmVzcG9uc2liaWxpdHkpIHtcbiAgICAgICAgICB0aGlzLnVwZGF0ZUNvbnRyb2xCcm9hZGNhc3RCdXR0b25zKCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgKTtcblxuICAgIC8vIFN1YnNjcmliZSB0byBjaGFuZ2VzIGluIEJlaGF2aW9yU3ViamVjdCBhbmQgdXBkYXRlIHRoZSBidXR0b25zIGFjY29yZGluZ2x5XG4gICAgdGhpcy5idXR0b25TdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLm1pY0FjdGl2ZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLnVwZGF0ZUNvbnRyb2xCcm9hZGNhc3RCdXR0b25zKCk7XG4gICAgICB9KSxcbiAgICApO1xuXG4gICAgdGhpcy5idXR0b25TdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLnZpZGVvQWN0aXZlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMudXBkYXRlQ29udHJvbEJyb2FkY2FzdEJ1dHRvbnMoKTtcbiAgICAgIH0pLFxuICAgICk7XG5cbiAgICB0aGlzLmJ1dHRvblN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMucGFydGljaXBhbnRzQ291bnRlci5zdWJzY3JpYmUoKHZhbHVlKSA9PiB7XG4gICAgICAgIHRoaXMudXBkYXRlTWVudVBhcnRpY2lwYW50c1dpZGdldCh2YWx1ZSk7XG4gICAgICB9KSxcbiAgICApO1xuXG4gICAgdGhpcy5tZWRpYVNGVVBhcmFtZXRlcnMgPSB7XG4gICAgICAuLi50aGlzLmdldEFsbFBhcmFtcygpLFxuICAgICAgLi4udGhpcy5tZWRpYVNGVUZ1bmN0aW9ucygpLFxuICAgIH07XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5oYW5kbGVSZXNpemUpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdvcmllbnRhdGlvbmNoYW5nZScsIHRoaXMuaGFuZGxlUmVzaXplKTtcbiAgICBpZiAodGhpcy5tYWluSGVpZ2h0V2lkdGhTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMubWFpbkhlaWdodFdpZHRoU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnZhbGlkYXRlZFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy52YWxpZGF0ZWRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuaXNsZXZlbFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5pc2xldmVsU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLmNvSG9zdFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5jb0hvc3RTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuU2NyZWVuYm9hcmRTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuU2NyZWVuYm9hcmRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucmVjb3JkaW5nU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnJlY29yZGluZ1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZU1haW5WaWRlb1NpemUgPSBhc3luYyAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLmxvY2tfc2NyZWVuLnZhbHVlICYmICF0aGlzLnNoYXJlZC52YWx1ZSkge1xuICAgICAgdGhpcy5wcmVwb3B1bGF0ZVVzZXJNZWRpYS5wcmVwb3B1bGF0ZVVzZXJNZWRpYSh7XG4gICAgICAgIG5hbWU6IHRoaXMuaG9zdExhYmVsLnZhbHVlLFxuICAgICAgICBwYXJhbWV0ZXJzOiB7IC4uLnRoaXMuZ2V0QWxsUGFyYW1zKCksIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSB9LFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghdGhpcy5maXJzdF9yb3VuZC52YWx1ZSkge1xuICAgICAgICB0aGlzLnByZXBvcHVsYXRlVXNlck1lZGlhLnByZXBvcHVsYXRlVXNlck1lZGlhKHtcbiAgICAgICAgICBuYW1lOiB0aGlzLmhvc3RMYWJlbC52YWx1ZSxcbiAgICAgICAgICBwYXJhbWV0ZXJzOiB7IC4uLnRoaXMuZ2V0QWxsUGFyYW1zKCksIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSB9LFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgYXN5bmMgY29ubmVjdEFuZEFkZFNvY2tldE1ldGhvZHMoKSB7XG4gICAgdGhpcy5tZWRpYVNGVVBhcmFtZXRlcnMgPSB7XG4gICAgICAuLi50aGlzLmdldEFsbFBhcmFtcygpLFxuICAgICAgLi4udGhpcy5tZWRpYVNGVUZ1bmN0aW9ucygpLFxuICAgIH07XG4gICAgY29uc3Qgc29ja2V0XyA9IGF3YWl0IHRoaXMuY29ubmVjdF9Tb2NrZXQodGhpcy5hcGlVc2VyTmFtZS52YWx1ZSwgJycsIHRoaXMuYXBpVG9rZW4udmFsdWUpO1xuICAgIGlmIChzb2NrZXRfKSB7XG4gICAgICB0aGlzLnVwZGF0ZVNvY2tldChzb2NrZXRfKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBoYW5kbGVWYWxpZGF0ZWQoKSB7XG4gICAgdGhpcy51cGRhdGVBbGxWaWRlb1N0cmVhbXMoW1xuICAgICAgeyBwcm9kdWNlcklkOiAneW91eW91Jywgc3RyZWFtOiB1bmRlZmluZWQsIGlkOiAneW91eW91JywgbmFtZTogJ3lvdXlvdScgfSxcbiAgICBdKTtcblxuICAgIHRoaXMudXBkYXRlU3RyZWFtTmFtZXMoW3sgaWQ6ICd5b3V5b3UnLCBuYW1lOiAneW91eW91JywgcHJvZHVjZXJJZDogJycgfV0pO1xuXG4gICAgaWYgKHRoaXMudmFsaWRhdGVkLnZhbHVlKSB7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICghdGhpcy5sb2NhbFVJTW9kZS52YWx1ZSkge1xuICAgICAgICAgIGF3YWl0IHRoaXMuY29ubmVjdEFuZEFkZFNvY2tldE1ldGhvZHMoKTtcbiAgICAgICAgICB0aGlzLnVwZGF0ZUlzTG9hZGluZ01vZGFsVmlzaWJsZSh0cnVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnVwZGF0ZUlzTG9hZGluZ01vZGFsVmlzaWJsZShmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdlcnJvciBjb25uZWN0QW5kYUFkZFNvY2tldE1ldGhvZHMnLCBlcnJvcik7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc3RhcnRNZWV0aW5nUHJvZ3Jlc3NUaW1lci5zdGFydE1lZXRpbmdQcm9ncmVzc1RpbWVyKHtcbiAgICAgICAgc3RhcnRUaW1lOiBEYXRlLm5vdygpIC8gMTAwMCxcbiAgICAgICAgcGFyYW1ldGVyczogeyAuLi50aGlzLmdldEFsbFBhcmFtcygpLCAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCkgfSxcbiAgICAgIH0pO1xuXG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScpXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpvcmllbnRhdGlvbmNoYW5nZScpXG4gIGFzeW5jIGhhbmRsZVJlc2l6ZSgpIHtcbiAgICBsZXQgZnJhY3Rpb24gPSAwO1xuXG4gICAgaWYgKFxuICAgICAgd2luZG93LmlubmVySGVpZ2h0IDwgd2luZG93LmlubmVyV2lkdGggJiZcbiAgICAgICh0aGlzLmV2ZW50VHlwZS52YWx1ZSA9PSAnd2ViaW5hcicgfHwgdGhpcy5ldmVudFR5cGUudmFsdWUgPT0gJ2NvbmZlcmVuY2UnKVxuICAgICkge1xuICAgICAgY29uc3QgY3VycmVudEhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgIGZyYWN0aW9uID0gTnVtYmVyKCg0MCAvIGN1cnJlbnRIZWlnaHQpLnRvRml4ZWQoMykpO1xuICAgICAgaWYgKGZyYWN0aW9uICE9IHRoaXMuY29udHJvbEhlaWdodC52YWx1ZSkge1xuICAgICAgICB0aGlzLnVwZGF0ZUNvbnRyb2xIZWlnaHQoTnVtYmVyKGZyYWN0aW9uKSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFNldCBkZWZhdWx0IGNvbnRyb2wgYnV0dG9uIGhlaWdodCBmb3IgcG9ydHJhaXQgbW9kZSBvciBvdGhlciBldmVudCB0eXBlc1xuICAgICAgY29uc3QgY3VycmVudEhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgIGZyYWN0aW9uID0gTnVtYmVyKCg0MCAvIGN1cnJlbnRIZWlnaHQpLnRvRml4ZWQoMykpO1xuICAgICAgZnJhY3Rpb24gPSBOdW1iZXIoZnJhY3Rpb24pO1xuICAgICAgaWYgKGZyYWN0aW9uICE9IHRoaXMuY29udHJvbEhlaWdodC52YWx1ZSkge1xuICAgICAgICB0aGlzLnVwZGF0ZUNvbnRyb2xIZWlnaHQoTnVtYmVyKGZyYWN0aW9uKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgZGltZW5zaW9ucyA9IHRoaXMuY29tcHV0ZURpbWVuc2lvbnNNZXRob2Qoe1xuICAgICAgY29udGFpbmVyV2lkdGhGcmFjdGlvbjogMSxcbiAgICAgIGNvbnRhaW5lckhlaWdodEZyYWN0aW9uOiAxLFxuICAgICAgbWFpblNpemU6IHRoaXMubWFpbkhlaWdodFdpZHRoLnZhbHVlLFxuICAgICAgZG9TdGFjazogdHJ1ZSxcbiAgICAgIGRlZmF1bHRGcmFjdGlvbjpcbiAgICAgICAgdGhpcy5ldmVudFR5cGUudmFsdWUgPT0gJ3dlYmluYXInIHx8IHRoaXMuZXZlbnRUeXBlLnZhbHVlID09ICdjb25mZXJlbmNlJ1xuICAgICAgICAgID8gMSAtIGZyYWN0aW9uXG4gICAgICAgICAgOiAxLFxuICAgIH0pO1xuXG4gICAgdGhpcy51cGRhdGVDb21wb25lbnRTaXplcyhkaW1lbnNpb25zKTtcblxuICAgIGNvbnN0IG9yaWVudGF0aW9uID0gdGhpcy5jaGVja09yaWVudGF0aW9uKCk7XG4gICAgaWYgKG9yaWVudGF0aW9uID09ICdwb3J0cmFpdCcpIHtcbiAgICAgIGlmICghdGhpcy5pc1dpZGVTY3JlZW4udmFsdWUpIHtcbiAgICAgICAgaWYgKHRoaXMuc2hhcmVTY3JlZW5TdGFydGVkLnZhbHVlIHx8IHRoaXMuc2hhcmVkLnZhbHVlKSB7XG4gICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5Gb3JjZUZ1bGxEaXNwbGF5KHRydWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gVXBkYXRlcyB0aGUgbWFpbiBncmlkIHZpZXdcbiAgICBhd2FpdCB0aGlzLnByZXBvcHVsYXRlVXNlck1lZGlhLnByZXBvcHVsYXRlVXNlck1lZGlhKHtcbiAgICAgIG5hbWU6IHRoaXMuaG9zdExhYmVsLnZhbHVlLFxuICAgICAgcGFyYW1ldGVyczogeyAuLi50aGlzLmdldEFsbFBhcmFtcygpLCAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCkgfSxcbiAgICB9KTtcbiAgICAvLyBVcGRhdGVzIHRoZSBtaW5pIGdyaWQgdmlld1xuICAgIGF3YWl0IHRoaXMub25TY3JlZW5DaGFuZ2VzLm9uU2NyZWVuQ2hhbmdlcyh7XG4gICAgICBjaGFuZ2VkOiB0cnVlLFxuICAgICAgcGFyYW1ldGVyczogeyAuLi50aGlzLmdldEFsbFBhcmFtcygpLCAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCkgfSxcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIGRpc2Nvbm5lY3RBbGxTb2NrZXRzKGNvbnN1bWVfc29ja2V0czogQ29uc3VtZVNvY2tldFtdKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgZm9yIChjb25zdCBzb2NrZXQgb2YgY29uc3VtZV9zb2NrZXRzKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBpcCA9IE9iamVjdC5rZXlzKHNvY2tldClbMF07XG4gICAgICAgIGF3YWl0IHNvY2tldFtpcF0uZGlzY29ubmVjdCgpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5sb2coYEVycm9yIGRpc2Nvbm5lY3Rpbmcgc29ja2V0IHdpdGggSVA6ICR7T2JqZWN0LmtleXMoc29ja2V0KVswXX1gLCBlcnJvcik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgY2xvc2VBbmRSZXNldCgpIHtcbiAgICAvL2Nsb3NlIGFuZCBjbGVhbiB1cCBhbGwgc29ja2V0cywgbW9kYWxzLC4uLiBhbmQgcmVzZXQgYWxsIHN0YXRlcyB0byBpbml0aWFsIHZhbHVlc1xuXG4gICAgdGhpcy51cGRhdGVJc01lc3NhZ2VzTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgICB0aGlzLnVwZGF0ZUlzUGFydGljaXBhbnRzTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgICB0aGlzLnVwZGF0ZUlzV2FpdGluZ01vZGFsVmlzaWJsZShmYWxzZSk7XG4gICAgdGhpcy51cGRhdGVJc1JlcXVlc3RzTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgICB0aGlzLnVwZGF0ZUlzQ29Ib3N0TW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgICB0aGlzLnVwZGF0ZUlzU2V0dGluZ3NNb2RhbFZpc2libGUoZmFsc2UpO1xuICAgIHRoaXMudXBkYXRlSXNEaXNwbGF5U2V0dGluZ3NNb2RhbFZpc2libGUoZmFsc2UpO1xuICAgIHRoaXMudXBkYXRlSXNNZWRpYVNldHRpbmdzTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgICB0aGlzLnVwZGF0ZUlzTWVudU1vZGFsVmlzaWJsZShmYWxzZSk7XG4gICAgdGhpcy51cGRhdGVJc1NoYXJlRXZlbnRNb2RhbFZpc2libGUoZmFsc2UpO1xuICAgIHRoaXMudXBkYXRlSXNDb25maXJtRXhpdE1vZGFsVmlzaWJsZShmYWxzZSk7XG4gICAgYXdhaXQgdGhpcy5kaXNjb25uZWN0QWxsU29ja2V0cyh0aGlzLmNvbnN1bWVfc29ja2V0cy52YWx1ZSk7XG4gICAgYXdhaXQgdGhpcy51cGRhdGVTdGF0ZXNUb0luaXRpYWxWYWx1ZXMoKTtcbiAgICB0aGlzLnVwZGF0ZU1lZXRpbmdQcm9ncmVzc1RpbWUoJzAwOjAwOjAwJyk7XG4gICAgdGhpcy51cGRhdGVNZWV0aW5nRWxhcHNlZFRpbWUoMCk7XG4gICAgdGhpcy51cGRhdGVSZWNvcmRpbmdQcm9ncmVzc1RpbWUoJzAwOjAwOjAwJyk7XG4gICAgdGhpcy51cGRhdGVSZWNvcmRFbGFwc2VkVGltZSgwKTtcbiAgICB0aGlzLnVwZGF0ZVNob3dSZWNvcmRCdXR0b25zKGZhbHNlKTtcblxuICAgIHRoaXMudXBkYXRlSXNDb25maWd1cmVXaGl0ZWJvYXJkTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgICB0aGlzLnVwZGF0ZUlzV2hpdGVib2FyZE1vZGFsVmlzaWJsZShmYWxzZSk7XG4gICAgdGhpcy51cGRhdGVJc01lbnVNb2RhbFZpc2libGUoZmFsc2UpO1xuICAgIHRoaXMudXBkYXRlSXNSZWNvcmRpbmdNb2RhbFZpc2libGUoZmFsc2UpO1xuICAgIHRoaXMudXBkYXRlSXNQb2xsTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgICB0aGlzLnVwZGF0ZUlzQnJlYWtvdXRSb29tc01vZGFsVmlzaWJsZShmYWxzZSk7XG4gICAgdGhpcy51cGRhdGVJc0JhY2tncm91bmRNb2RhbFZpc2libGUoZmFsc2UpO1xuICAgIHRoaXMudXBkYXRlSXNMb2FkaW5nTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgICB0aGlzLnVwZGF0ZUlzQ29uZmlybUhlcmVNb2RhbFZpc2libGUoZmFsc2UpO1xuXG4gICAgYXdhaXQgc2xlZXAoeyBtczogNTAwIH0pO1xuICAgIHRoaXMudXBkYXRlVmFsaWRhdGVkKGZhbHNlKTtcbiAgICAvL2lmIG9uIHdlYiwgcmVsb2FkIHRoZSBwYWdlXG4gICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICB9XG5cbiAgY29tcHV0ZURpbWVuc2lvbnNNZXRob2QgPSAoe1xuICAgIGNvbnRhaW5lcldpZHRoRnJhY3Rpb24gPSAxLFxuICAgIGNvbnRhaW5lckhlaWdodEZyYWN0aW9uID0gMSxcbiAgICBtYWluU2l6ZSxcbiAgICBkb1N0YWNrID0gdHJ1ZSxcbiAgICBkZWZhdWx0RnJhY3Rpb24sXG4gIH06IHtcbiAgICBjb250YWluZXJXaWR0aEZyYWN0aW9uPzogbnVtYmVyO1xuICAgIGNvbnRhaW5lckhlaWdodEZyYWN0aW9uPzogbnVtYmVyO1xuICAgIG1haW5TaXplOiBudW1iZXI7XG4gICAgZG9TdGFjaz86IGJvb2xlYW47XG4gICAgZGVmYXVsdEZyYWN0aW9uOiBudW1iZXI7XG4gIH0pOiBDb21wb25lbnRTaXplcyA9PiB7XG4gICAgY29uc3QgcGFyZW50V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCAqIGNvbnRhaW5lcldpZHRoRnJhY3Rpb247XG4gICAgY29uc3QgcGFyZW50SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0ICogY29udGFpbmVySGVpZ2h0RnJhY3Rpb24gKiBkZWZhdWx0RnJhY3Rpb247XG4gICAgbGV0IGlzV2lkZVNjcmVlbiA9IHBhcmVudFdpZHRoID49IDc2ODtcblxuICAgIGlmICghaXNXaWRlU2NyZWVuICYmIHBhcmVudFdpZHRoID4gMS41ICogcGFyZW50SGVpZ2h0KSB7XG4gICAgICBpc1dpZGVTY3JlZW4gPSB0cnVlO1xuICAgIH1cblxuICAgIHRoaXMudXBkYXRlSXNXaWRlU2NyZWVuKGlzV2lkZVNjcmVlbik7XG5cbiAgICBjb25zdCBkaW1lbnNpb25zID0gdGhpcy5jYWxjdWxhdGVEaW1lbnNpb25zKHtcbiAgICAgIHBhcmVudFdpZHRoLFxuICAgICAgcGFyZW50SGVpZ2h0LFxuICAgICAgaXNXaWRlU2NyZWVuLFxuICAgICAgbWFpblNpemUsXG4gICAgICBkb1N0YWNrLFxuICAgIH0pO1xuICAgIHJldHVybiBkaW1lbnNpb25zO1xuICB9O1xuXG4gIGNhbGN1bGF0ZURpbWVuc2lvbnMoe1xuICAgIHBhcmVudFdpZHRoLFxuICAgIHBhcmVudEhlaWdodCxcbiAgICBpc1dpZGVTY3JlZW4sXG4gICAgbWFpblNpemUsXG4gICAgZG9TdGFjayxcbiAgfToge1xuICAgIHBhcmVudFdpZHRoOiBudW1iZXI7XG4gICAgcGFyZW50SGVpZ2h0OiBudW1iZXI7XG4gICAgaXNXaWRlU2NyZWVuOiBib29sZWFuO1xuICAgIG1haW5TaXplOiBudW1iZXI7XG4gICAgZG9TdGFjazogYm9vbGVhbjtcbiAgfSk6IENvbXBvbmVudFNpemVzIHtcbiAgICBpZiAoZG9TdGFjaykge1xuICAgICAgcmV0dXJuIGlzV2lkZVNjcmVlblxuICAgICAgICA/IHtcbiAgICAgICAgICAgIG1haW5IZWlnaHQ6IE1hdGguZmxvb3IocGFyZW50SGVpZ2h0KSxcbiAgICAgICAgICAgIG90aGVySGVpZ2h0OiBNYXRoLmZsb29yKHBhcmVudEhlaWdodCksXG4gICAgICAgICAgICBtYWluV2lkdGg6IE1hdGguZmxvb3IoKG1haW5TaXplIC8gMTAwKSAqIHBhcmVudFdpZHRoKSxcbiAgICAgICAgICAgIG90aGVyV2lkdGg6IE1hdGguZmxvb3IoKCgxMDAgLSBtYWluU2l6ZSkgLyAxMDApICogcGFyZW50V2lkdGgpLFxuICAgICAgICAgIH1cbiAgICAgICAgOiB7XG4gICAgICAgICAgICBtYWluSGVpZ2h0OiBNYXRoLmZsb29yKChtYWluU2l6ZSAvIDEwMCkgKiBwYXJlbnRIZWlnaHQpLFxuICAgICAgICAgICAgb3RoZXJIZWlnaHQ6IE1hdGguZmxvb3IoKCgxMDAgLSBtYWluU2l6ZSkgLyAxMDApICogcGFyZW50SGVpZ2h0KSxcbiAgICAgICAgICAgIG1haW5XaWR0aDogTWF0aC5mbG9vcihwYXJlbnRXaWR0aCksXG4gICAgICAgICAgICBvdGhlcldpZHRoOiBNYXRoLmZsb29yKHBhcmVudFdpZHRoKSxcbiAgICAgICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBtYWluSGVpZ2h0OiBNYXRoLmZsb29yKHBhcmVudEhlaWdodCksXG4gICAgICAgIG90aGVySGVpZ2h0OiBNYXRoLmZsb29yKHBhcmVudEhlaWdodCksXG4gICAgICAgIG1haW5XaWR0aDogTWF0aC5mbG9vcihwYXJlbnRXaWR0aCksXG4gICAgICAgIG90aGVyV2lkdGg6IE1hdGguZmxvb3IocGFyZW50V2lkdGgpLFxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVPcmllbnRhdGlvbkNoYW5nZSgpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5oYW5kbGVSZXNpemUuYmluZCh0aGlzKSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ29yaWVudGF0aW9uY2hhbmdlJywgdGhpcy5oYW5kbGVSZXNpemUuYmluZCh0aGlzKSk7XG4gIH1cblxuICBzZXR1cFJlc2l6ZUxpc3RlbmVyKCkge1xuICAgIHRoaXMuaGFuZGxlUmVzaXplKCk7XG4gIH1cblxuICBvcmllbnRhdGlvbiA9IHdpbmRvdy5pbm5lckhlaWdodCA+IHdpbmRvdy5pbm5lcldpZHRoID8gJ3BvcnRyYWl0JyA6ICdsYW5kc2NhcGUnO1xuXG4gIGFzeW5jIGpvaW5Sb29tKGRhdGE6IHtcbiAgICBzb2NrZXQ6IFNvY2tldDtcbiAgICByb29tTmFtZTogc3RyaW5nO1xuICAgIGlzbGV2ZWw6IHN0cmluZztcbiAgICBtZW1iZXI6IHN0cmluZztcbiAgICBzZWM6IHN0cmluZztcbiAgICBhcGlVc2VyTmFtZTogc3RyaW5nO1xuICB9KTogUHJvbWlzZTxSZXNwb25zZUpvaW5Sb29tIHwgbnVsbD4ge1xuICAgIGNvbnN0IHsgc29ja2V0LCByb29tTmFtZSwgaXNsZXZlbCwgbWVtYmVyLCBzZWMsIGFwaVVzZXJOYW1lIH0gPSBkYXRhO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlOiBSZXNwb25zZUpvaW5Sb29tIHwgbnVsbCA9IGF3YWl0IHRoaXMuam9pblJvb21DbGllbnQuam9pblJvb21DbGllbnQoe1xuICAgICAgICBzb2NrZXQsXG4gICAgICAgIHJvb21OYW1lLFxuICAgICAgICBpc2xldmVsLFxuICAgICAgICBtZW1iZXIsXG4gICAgICAgIHNlYyxcbiAgICAgICAgYXBpVXNlck5hbWUsXG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZygnRXJyb3Igam9pbmluZyByb29tOicsIGVycm9yKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIGpvaW4gdGhlIHJvb20uIFBsZWFzZSBjaGVjayB5b3VyIGNvbm5lY3Rpb24gYW5kIHRyeSBhZ2Fpbi4nKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBqb2luX1Jvb20oe1xuICAgIHNvY2tldCxcbiAgICByb29tTmFtZSxcbiAgICBpc2xldmVsLFxuICAgIG1lbWJlcixcbiAgICBzZWMsXG4gICAgYXBpVXNlck5hbWUsXG4gIH06IHtcbiAgICBzb2NrZXQ6IFNvY2tldDtcbiAgICByb29tTmFtZTogc3RyaW5nO1xuICAgIGlzbGV2ZWw6IHN0cmluZztcbiAgICBtZW1iZXI6IHN0cmluZztcbiAgICBzZWM6IHN0cmluZztcbiAgICBhcGlVc2VyTmFtZTogc3RyaW5nO1xuICB9KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgZGF0YTogUmVzcG9uc2VKb2luUm9vbSB8IG51bGwgPSBhd2FpdCB0aGlzLmpvaW5Sb29tKHtcbiAgICAgIHNvY2tldDogc29ja2V0LFxuICAgICAgcm9vbU5hbWU6IHJvb21OYW1lLFxuICAgICAgaXNsZXZlbDogaXNsZXZlbCxcbiAgICAgIG1lbWJlcjogbWVtYmVyLFxuICAgICAgc2VjOiBzZWMsXG4gICAgICBhcGlVc2VyTmFtZTogYXBpVXNlck5hbWUsXG4gICAgfSk7XG5cbiAgICBpZiAoZGF0YSAmJiBkYXRhLnN1Y2Nlc3MpIHtcbiAgICAgIHRoaXMucm9vbURhdGEubmV4dChkYXRhKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy51cGRhdGVSb29tUGFyYW1ldGVyc0NsaWVudC51cGRhdGVSb29tUGFyYW1ldGVyc0NsaWVudCh7XG4gICAgICAgICAgcGFyYW1ldGVyczoge1xuICAgICAgICAgICAgLi4udGhpcy5nZXRBbGxQYXJhbXMoKSxcbiAgICAgICAgICAgIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSxcbiAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGRhdGEuaXNIb3N0KSB7XG4gICAgICAgICAgdGhpcy51cGRhdGVJc2xldmVsKCcyJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy51cGRhdGVJc2xldmVsKCcxJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGF0YS5zZWN1cmVDb2RlKSB7XG4gICAgICAgICAgdGhpcy51cGRhdGVBZG1pblBhc3Njb2RlKGRhdGEuc2VjdXJlQ29kZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGF0YS5ydHBDYXBhYmlsaXRpZXMpIHtcbiAgICAgICAgICBjb25zdCBkZXZpY2VfID0gYXdhaXQgdGhpcy5jcmVhdGVEZXZpY2VDbGllbnQuY3JlYXRlRGV2aWNlQ2xpZW50KHtcbiAgICAgICAgICAgIHJ0cENhcGFiaWxpdGllczogZGF0YS5ydHBDYXBhYmlsaXRpZXMsXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpZiAoZGV2aWNlXykge1xuICAgICAgICAgICAgdGhpcy5kZXZpY2UubmV4dChkZXZpY2VfKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2gge1xuICAgICAgICAvKiBoYW5kbGUgZXJyb3IgKi9cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy51cGRhdGVWYWxpZGF0ZWQoZmFsc2UpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKHRoaXMuc2hvd0FsZXJ0ICYmIGRhdGE/LnJlYXNvbikge1xuICAgICAgICAgIHRoaXMuc2hvd0FsZXJ0KHsgbWVzc2FnZTogZGF0YT8ucmVhc29uLCB0eXBlOiAnZGFuZ2VyJywgZHVyYXRpb246IDMwMDAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2gge1xuICAgICAgICAvKiBoYW5kbGUgZXJyb3IgKi9cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvblBhcnRpY2lwYW50c0ZpbHRlckNoYW5nZSA9ICh2YWx1ZTogc3RyaW5nKTogdm9pZCA9PiB7XG4gICAgaWYgKHZhbHVlICYmIHZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuZmlsdGVyZWRQYXJ0aWNpcGFudHMubmV4dChcbiAgICAgICAgdGhpcy5wYXJ0aWNpcGFudHMudmFsdWUuZmlsdGVyKChwYXJ0aWNpcGFudCkgPT5cbiAgICAgICAgICBwYXJ0aWNpcGFudC5uYW1lLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXModmFsdWUudG9Mb3dlckNhc2UoKSksXG4gICAgICAgICksXG4gICAgICApO1xuICAgICAgdGhpcy5wYXJ0aWNpcGFudHNDb3VudGVyLm5leHQodGhpcy5maWx0ZXJlZFBhcnRpY2lwYW50cy52YWx1ZS5sZW5ndGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmZpbHRlcmVkUGFydGljaXBhbnRzLm5leHQodGhpcy5wYXJ0aWNpcGFudHMudmFsdWUpO1xuICAgICAgdGhpcy5wYXJ0aWNpcGFudHNDb3VudGVyLm5leHQodGhpcy5wYXJ0aWNpcGFudHMudmFsdWUubGVuZ3RoKTtcbiAgICB9XG4gIH07XG5cbiAgdXBkYXRlU3RhdGVzVG9Jbml0aWFsVmFsdWVzID0gYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IGluaXRpYWxWYWx1ZXMgPSBpbml0aWFsVmFsdWVzU3RhdGUgYXMgeyBba2V5OiBzdHJpbmddOiBhbnkgfTtcbiAgICBjb25zdCB1cGRhdGVGdW5jdGlvbnMgPSB0aGlzLmdldEFsbFBhcmFtcygpIGFzIHVua25vd24gYXMge1xuICAgICAgW2tleTogc3RyaW5nXTogKHZhbHVlOiBhbnkpID0+IHZvaWQ7XG4gICAgfTtcblxuICAgIGZvciAoY29uc3Qga2V5IGluIGluaXRpYWxWYWx1ZXMpIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaW5pdGlhbFZhbHVlcywga2V5KSkge1xuICAgICAgICBjb25zdCB1cGRhdGVGdW5jdGlvbk5hbWUgPSBgdXBkYXRlJHtrZXkuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBrZXkuc2xpY2UoMSl9YDtcbiAgICAgICAgY29uc3QgdXBkYXRlRnVuY3Rpb24gPSB1cGRhdGVGdW5jdGlvbnNbdXBkYXRlRnVuY3Rpb25OYW1lXTtcblxuICAgICAgICBpZiAodHlwZW9mIHVwZGF0ZUZ1bmN0aW9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHVwZGF0ZUZ1bmN0aW9uKGluaXRpYWxWYWx1ZXNba2V5XSk7XG4gICAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgICAvKiBoYW5kbGUgZXJyb3IgKi9cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgZmFSZWNvcmRWaW55bCA9IGZhUmVjb3JkVmlueWw7XG4gIGZhUGxheUNpcmNsZSA9IGZhUGxheUNpcmNsZTtcbiAgZmFQYXVzZUNpcmNsZSA9IGZhUGF1c2VDaXJjbGU7XG4gIGZhU3RvcENpcmNsZSA9IGZhU3RvcENpcmNsZTtcbiAgZmFEb3RDaXJjbGUgPSBmYURvdENpcmNsZTtcbiAgZmFDb2cgPSBmYUNvZztcbiAgZmFVc2VycyA9IGZhVXNlcnM7XG4gIGZhTWljcm9waG9uZSA9IGZhTWljcm9waG9uZTtcbiAgZmFNaWNyb3Bob25lU2xhc2ggPSBmYU1pY3JvcGhvbmVTbGFzaDtcbiAgZmFWaWRlbyA9IGZhVmlkZW87XG4gIGZhVmlkZW9TbGFzaCA9IGZhVmlkZW9TbGFzaDtcbiAgZmFTeW5jID0gZmFTeW5jO1xuICBmYVBob25lID0gZmFQaG9uZTtcbiAgZmFTaGFyZUFsdCA9IGZhU2hhcmVBbHQ7XG4gIGZhQ29tbWVudHMgPSBmYUNvbW1lbnRzO1xuICBmYUNoYXJ0QmFyID0gZmFDaGFydEJhcjtcblxuICBvbkNsb3NlTWVudU1vZGFsID0gKCkgPT4ge1xuICAgIHRoaXMudXBkYXRlSXNNZW51TW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgfTtcblxuICBvbkV2ZW50U2V0dGluZ3NDbG9zZSA9ICgpID0+IHtcbiAgICB0aGlzLnVwZGF0ZUlzU2V0dGluZ3NNb2RhbFZpc2libGUoZmFsc2UpO1xuICB9O1xuXG4gIG9uQ29Ib3N0Q2xvc2UgPSAoKSA9PiB7XG4gICAgdGhpcy51cGRhdGVJc0NvSG9zdE1vZGFsVmlzaWJsZShmYWxzZSk7XG4gIH07XG5cbiAgb25NZWRpYVNldHRpbmdzQ2xvc2UgPSAoKSA9PiB7XG4gICAgdGhpcy51cGRhdGVJc01lZGlhU2V0dGluZ3NNb2RhbFZpc2libGUoZmFsc2UpO1xuICB9O1xuXG4gIG9uRGlzcGxheVNldHRpbmdzQ2xvc2UgPSAoKSA9PiB7XG4gICAgdGhpcy51cGRhdGVJc0Rpc3BsYXlTZXR0aW5nc01vZGFsVmlzaWJsZShmYWxzZSk7XG4gIH07XG5cbiAgb25Qb2xsQ2xvc2UgPSAoKSA9PiB7XG4gICAgdGhpcy51cGRhdGVJc1BvbGxNb2RhbFZpc2libGUoZmFsc2UpO1xuICB9O1xuXG4gIG9uQnJlYWtvdXRSb29tc0Nsb3NlID0gKCkgPT4ge1xuICAgIHRoaXMudXBkYXRlSXNCcmVha291dFJvb21zTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgfTtcblxuICBvbkNvbmZpZ3VyZVdoaXRlYm9hcmRDbG9zZSA9ICgpID0+IHtcbiAgICB0aGlzLnVwZGF0ZUlzQ29uZmlndXJlV2hpdGVib2FyZE1vZGFsVmlzaWJsZShmYWxzZSk7XG4gIH07XG5cbiAgb25NZXNzYWdlc0Nsb3NlID0gKCkgPT4ge1xuICAgIHRoaXMudXBkYXRlSXNNZXNzYWdlc01vZGFsVmlzaWJsZShmYWxzZSk7XG4gIH07XG5cbiAgb25SZWNvcmRpbmdDbG9zZSA9ICgpID0+IHtcbiAgICB0aGlzLnVwZGF0ZUlzUmVjb3JkaW5nTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgfTtcblxuICBvblBhcnRpY2lwYW50c0Nsb3NlID0gKCkgPT4ge1xuICAgIHRoaXMudXBkYXRlSXNQYXJ0aWNpcGFudHNNb2RhbFZpc2libGUoZmFsc2UpO1xuICB9O1xuXG4gIG9uQmFja2dyb3VuZENsb3NlID0gKCkgPT4ge1xuICAgIHRoaXMudXBkYXRlSXNCYWNrZ3JvdW5kTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgfTtcblxuICBvbkNvbmZpcm1FeGl0Q2xvc2UgPSAoKSA9PiB7XG4gICAgdGhpcy51cGRhdGVJc0NvbmZpcm1FeGl0TW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgfTtcblxuICBvbkNvbmZpcm1IZXJlQ2xvc2UgPSAoKSA9PiB7XG4gICAgdGhpcy51cGRhdGVJc0NvbmZpcm1IZXJlTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgfTtcblxuICBvblNjcmVlbmJvYXJkQ2xvc2UgPSAoKSA9PiB7XG4gICAgdGhpcy51cGRhdGVJc1NjcmVlbmJvYXJkTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgfTtcblxuICBvblNoYXJlRXZlbnRDbG9zZSA9ICgpID0+IHtcbiAgICB0aGlzLnVwZGF0ZUlzU2hhcmVFdmVudE1vZGFsVmlzaWJsZShmYWxzZSk7XG4gIH07XG5cbiAgb25BbGVydEhpZGUgPSAoKSA9PiB7XG4gICAgdGhpcy51cGRhdGVBbGVydFZpc2libGUoZmFsc2UpO1xuICB9O1xuICByZWNvcmRUaW1lcldpZGdldCA9IHtcbiAgICBjb21wb25lbnQ6IFJlY29yZFRpbWVyV2lkZ2V0LFxuICAgIGluamVjdG9yOiB0aGlzLmNyZWF0ZUluamVjdG9yKHsgcmVjb3JkaW5nUHJvZ3Jlc3NUaW1lOiB0aGlzLnJlY29yZGluZ1Byb2dyZXNzVGltZS52YWx1ZSB9KSxcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRUaW1lcldpZGdldCA9IChcbiAgICByZWNvcmRpbmdQcm9ncmVzc1RpbWU6IHN0cmluZyA9IHRoaXMucmVjb3JkaW5nUHJvZ3Jlc3NUaW1lLnZhbHVlLFxuICApOiB7IGNvbXBvbmVudDogYW55OyBpbmplY3RvcjogSW5qZWN0b3IgfSA9PiB7XG4gICAgY29uc3QgcmVjb3JkVGltZXJXaWRnZXQgPSB7XG4gICAgICBjb21wb25lbnQ6IFJlY29yZFRpbWVyV2lkZ2V0LFxuICAgICAgaW5qZWN0b3I6IHRoaXMuY3JlYXRlSW5qZWN0b3IoeyByZWNvcmRpbmdQcm9ncmVzc1RpbWU6IHJlY29yZGluZ1Byb2dyZXNzVGltZSB9KSxcbiAgICB9O1xuXG4gICAgdGhpcy5yZWNvcmRUaW1lcldpZGdldCA9IHsgLi4ucmVjb3JkVGltZXJXaWRnZXQgfTtcblxuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuXG4gICAgcmV0dXJuIHJlY29yZFRpbWVyV2lkZ2V0O1xuICB9O1xuXG4gIHJlY29yZEJ1dHRvbiA9IFtcbiAgICB7XG4gICAgICBpY29uOiB0aGlzLmZhUmVjb3JkVmlueWwsXG4gICAgICB0ZXh0OiAnUmVjb3JkJyxcbiAgICAgIG9uUHJlc3M6ICgpID0+IHtcbiAgICAgICAgdGhpcy5sYXVuY2hSZWNvcmRpbmcubGF1bmNoUmVjb3JkaW5nKHtcbiAgICAgICAgICB1cGRhdGVJc1JlY29yZGluZ01vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc1JlY29yZGluZ01vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuICAgICAgICAgIGlzUmVjb3JkaW5nTW9kYWxWaXNpYmxlOiB0aGlzLmlzUmVjb3JkaW5nTW9kYWxWaXNpYmxlLnZhbHVlLFxuICAgICAgICAgIHNob3dBbGVydDogdGhpcy5zaG93QWxlcnQuYmluZCh0aGlzKSxcbiAgICAgICAgICBzdG9wTGF1bmNoUmVjb3JkOiB0aGlzLnN0b3BMYXVuY2hSZWNvcmQudmFsdWUsXG4gICAgICAgICAgY2FuTGF1bmNoUmVjb3JkOiB0aGlzLmNhbkxhdW5jaFJlY29yZC52YWx1ZSxcbiAgICAgICAgICByZWNvcmRpbmdBdWRpb1N1cHBvcnQ6IHRoaXMucmVjb3JkaW5nQXVkaW9TdXBwb3J0LnZhbHVlLFxuICAgICAgICAgIHJlY29yZGluZ1ZpZGVvU3VwcG9ydDogdGhpcy5yZWNvcmRpbmdWaWRlb1N1cHBvcnQudmFsdWUsXG4gICAgICAgICAgdXBkYXRlQ2FuUmVjb3JkOiB0aGlzLnVwZGF0ZUNhblJlY29yZC5iaW5kKHRoaXMpLFxuICAgICAgICAgIHVwZGF0ZUNsZWFyZWRUb1JlY29yZDogdGhpcy51cGRhdGVDbGVhcmVkVG9SZWNvcmQuYmluZCh0aGlzKSxcbiAgICAgICAgICByZWNvcmRTdGFydGVkOiB0aGlzLnJlY29yZFN0YXJ0ZWQudmFsdWUsXG4gICAgICAgICAgcmVjb3JkUGF1c2VkOiB0aGlzLnJlY29yZFBhdXNlZC52YWx1ZSxcbiAgICAgICAgICBsb2NhbFVJTW9kZTogdGhpcy5sb2NhbFVJTW9kZS52YWx1ZSxcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgYWN0aXZlQ29sb3I6ICdibGFjaycsXG4gICAgICBpbkFjdGl2ZUNvbG9yOiAnYmxhY2snLFxuICAgICAgc2hvdzogdHJ1ZSxcbiAgICB9LFxuICBdO1xuXG4gIHJlY29yZEJ1dHRvbnM6IE1haW5CdXR0b25BbHRbXSA9IFtdO1xuXG4gIHJlY29yZEJ1dHRvbnNBcnJheTogTWFpbkJ1dHRvbkFsdFtdID0gW1xuICAgIHtcbiAgICAgIGljb246IHRoaXMuZmFQbGF5Q2lyY2xlLFxuICAgICAgYWN0aXZlOiAoKSA9PiAhdGhpcy5yZWNvcmRQYXVzZWQudmFsdWUsXG4gICAgICBvblByZXNzOiAoKSA9PlxuICAgICAgICB0aGlzLnVwZGF0ZVJlY29yZGluZy51cGRhdGVSZWNvcmRpbmcoe1xuICAgICAgICAgIHBhcmFtZXRlcnM6IHsgLi4udGhpcy5nZXRBbGxQYXJhbXMoKSwgLi4udGhpcy5tZWRpYVNGVUZ1bmN0aW9ucygpIH0sXG4gICAgICAgIH0pLFxuICAgICAgYWN0aXZlQ29sb3I6ICdibGFjaycsXG4gICAgICBpbkFjdGl2ZUNvbG9yOiAnYmxhY2snLFxuICAgICAgYWx0ZXJuYXRlSWNvbjogdGhpcy5mYVBhdXNlQ2lyY2xlLFxuICAgICAgc2hvdzogKCkgPT4gdHJ1ZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGljb246IHRoaXMuZmFTdG9wQ2lyY2xlLFxuICAgICAgYWN0aXZlOiAoKSA9PiBmYWxzZSxcbiAgICAgIG9uUHJlc3M6ICgpID0+XG4gICAgICAgIHRoaXMuc3RvcFJlY29yZGluZy5zdG9wUmVjb3JkaW5nKHtcbiAgICAgICAgICBwYXJhbWV0ZXJzOiB7IC4uLnRoaXMuZ2V0QWxsUGFyYW1zKCksIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSB9LFxuICAgICAgICB9KSxcbiAgICAgIGFjdGl2ZUNvbG9yOiAnZ3JlZW4nLFxuICAgICAgaW5BY3RpdmVDb2xvcjogJ2JsYWNrJyxcbiAgICAgIHNob3c6ICgpID0+IHRydWUsXG4gICAgfSxcbiAgICB7XG4gICAgICBjdXN0b21Db21wb25lbnQ6ICgpID0+IHRoaXMudXBkYXRlUmVjb3JkVGltZXJXaWRnZXQoKSxcbiAgICAgIHNob3c6ICgpID0+IHRydWUsXG4gICAgICBhY3RpdmU6ICgpID0+IGZhbHNlLFxuICAgIH0sXG4gICAge1xuICAgICAgaWNvbjogdGhpcy5mYURvdENpcmNsZSxcbiAgICAgIGFjdGl2ZTogKCkgPT4gZmFsc2UsXG4gICAgICBvblByZXNzOiAoKSA9PiBjb25zb2xlLmxvZygnU3RhdHVzIHByZXNzZWQnKSxcbiAgICAgIGFjdGl2ZUNvbG9yOiAnYmxhY2snLFxuICAgICAgaW5BY3RpdmVDb2xvcjogKCkgPT4gKHRoaXMucmVjb3JkUGF1c2VkLnZhbHVlID8gJ3llbGxvdycgOiAncmVkJyksXG4gICAgICBzaG93OiAoKSA9PiB0cnVlLFxuICAgIH0sXG4gICAge1xuICAgICAgaWNvbjogdGhpcy5mYUNvZyxcbiAgICAgIGFjdGl2ZTogKCkgPT4gZmFsc2UsXG4gICAgICBvblByZXNzOiAoKSA9PlxuICAgICAgICB0aGlzLmxhdW5jaFJlY29yZGluZy5sYXVuY2hSZWNvcmRpbmcoe1xuICAgICAgICAgIHVwZGF0ZUlzUmVjb3JkaW5nTW9kYWxWaXNpYmxlOiB0aGlzLnVwZGF0ZUlzUmVjb3JkaW5nTW9kYWxWaXNpYmxlLmJpbmQodGhpcyksXG4gICAgICAgICAgaXNSZWNvcmRpbmdNb2RhbFZpc2libGU6IHRoaXMuaXNSZWNvcmRpbmdNb2RhbFZpc2libGUudmFsdWUsXG4gICAgICAgICAgc2hvd0FsZXJ0OiB0aGlzLnNob3dBbGVydC5iaW5kKHRoaXMpLFxuICAgICAgICAgIHN0b3BMYXVuY2hSZWNvcmQ6IHRoaXMuc3RvcExhdW5jaFJlY29yZC52YWx1ZSxcbiAgICAgICAgICBjYW5MYXVuY2hSZWNvcmQ6IHRoaXMuY2FuTGF1bmNoUmVjb3JkLnZhbHVlLFxuICAgICAgICAgIHJlY29yZGluZ0F1ZGlvU3VwcG9ydDogdGhpcy5yZWNvcmRpbmdBdWRpb1N1cHBvcnQudmFsdWUsXG4gICAgICAgICAgcmVjb3JkaW5nVmlkZW9TdXBwb3J0OiB0aGlzLnJlY29yZGluZ1ZpZGVvU3VwcG9ydC52YWx1ZSxcbiAgICAgICAgICB1cGRhdGVDYW5SZWNvcmQ6IHRoaXMudXBkYXRlQ2FuUmVjb3JkLmJpbmQodGhpcyksXG4gICAgICAgICAgdXBkYXRlQ2xlYXJlZFRvUmVjb3JkOiB0aGlzLnVwZGF0ZUNsZWFyZWRUb1JlY29yZC5iaW5kKHRoaXMpLFxuICAgICAgICAgIHJlY29yZFN0YXJ0ZWQ6IHRoaXMucmVjb3JkU3RhcnRlZC52YWx1ZSxcbiAgICAgICAgICByZWNvcmRQYXVzZWQ6IHRoaXMucmVjb3JkUGF1c2VkLnZhbHVlLFxuICAgICAgICAgIGxvY2FsVUlNb2RlOiB0aGlzLmxvY2FsVUlNb2RlLnZhbHVlLFxuICAgICAgICB9KSxcbiAgICAgIGFjdGl2ZUNvbG9yOiAnZ3JlZW4nLFxuICAgICAgaW5BY3RpdmVDb2xvcjogJ2JsYWNrJyxcbiAgICAgIHNob3c6ICgpID0+IHRydWUsXG4gICAgfSxcbiAgXTtcblxuICBhc3luYyB1cGRhdGVSZWNvcmRCdXR0b25zKCkge1xuICAgIGNvbnN0IHJlY29yZEJ1dHRvbnMgPSB0aGlzLnJlY29yZEJ1dHRvbnNBcnJheS5tYXAoKGJ1dHRvbikgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uYnV0dG9uLFxuICAgICAgICBhY3RpdmU6IHR5cGVvZiBidXR0b24uYWN0aXZlID09PSAnZnVuY3Rpb24nID8gYnV0dG9uLmFjdGl2ZSgpIDogYnV0dG9uLmFjdGl2ZSxcbiAgICAgICAgc2hvdzogdHlwZW9mIGJ1dHRvbi5zaG93ID09PSAnZnVuY3Rpb24nID8gYnV0dG9uLnNob3coKSA6IGJ1dHRvbi5zaG93LFxuICAgICAgICBjdXN0b21Db21wb25lbnQ6IGJ1dHRvbi5jdXN0b21Db21wb25lbnRcbiAgICAgICAgICA/IHR5cGVvZiBidXR0b24uY3VzdG9tQ29tcG9uZW50ID09PSAnZnVuY3Rpb24nXG4gICAgICAgICAgICA/IGJ1dHRvbi5jdXN0b21Db21wb25lbnQoKVxuICAgICAgICAgICAgOiBidXR0b24uY3VzdG9tQ29tcG9uZW50XG4gICAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgICAgIGFjdGl2ZUNvbG9yOlxuICAgICAgICAgIHR5cGVvZiBidXR0b24uaW5BY3RpdmVDb2xvciA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICAgICAgPyBidXR0b24uaW5BY3RpdmVDb2xvcigpXG4gICAgICAgICAgICA6IGJ1dHRvbi5pbkFjdGl2ZUNvbG9yLFxuICAgICAgICBpbkFjdGl2ZUNvbG9yOlxuICAgICAgICAgIHR5cGVvZiBidXR0b24uaW5BY3RpdmVDb2xvciA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICAgICAgPyBidXR0b24uaW5BY3RpdmVDb2xvcigpXG4gICAgICAgICAgICA6IGJ1dHRvbi5pbkFjdGl2ZUNvbG9yLFxuICAgICAgfTtcbiAgICB9KTtcbiAgICB0aGlzLnJlY29yZEJ1dHRvbnMgPSBbLi4ucmVjb3JkQnV0dG9uc107XG4gICAgYXdhaXQgdGhpcy51cGRhdGVNZW51UmVjb3JkV2lkZ2V0KHJlY29yZEJ1dHRvbnMpO1xuICAgIHRoaXMudXBkYXRlQ29udHJvbEJyb2FkY2FzdEJ1dHRvbnMoKTtcblxuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLy8gQ3JlYXRlIGluc3RhbmNlcyBvZiB0aGUgY3VzdG9tIHdpZGdldHNcbiAgbWVzc2FnZVdpZGdldCA9IHtcbiAgICBjb21wb25lbnQ6IE1lc3NhZ2VXaWRnZXQsXG4gICAgaW5qZWN0b3I6IHRoaXMuY3JlYXRlSW5qZWN0b3Ioe1xuICAgICAgaWNvbjogdGhpcy5mYUNvbW1lbnRzLFxuICAgICAgc2hvd0JhZGdlOiB0aGlzLnNob3dNZXNzYWdlc0JhZGdlLnZhbHVlLFxuICAgICAgYmFkZ2VWYWx1ZTogMSxcbiAgICAgIGljb25Db2xvcjogJ2JsYWNrJyxcbiAgICB9KSxcbiAgfTtcblxuICBtZW51UmVjb3JkV2lkZ2V0ID0ge1xuICAgIGNvbXBvbmVudDogTWVudVJlY29yZFdpZGdldCxcbiAgICBpbmplY3RvcjogdGhpcy5jcmVhdGVJbmplY3Rvcih7XG4gICAgICBidXR0b25zOiB0aGlzLnJlY29yZEJ1dHRvbnMsXG4gICAgICBzaG93QXNwZWN0OiB0cnVlLFxuICAgICAgZGlyZWN0aW9uOiAnaG9yaXpvbnRhbCcsXG4gICAgfSksXG4gIH07XG5cbiAgdXBkYXRlTWVudVJlY29yZFdpZGdldCA9IChyZWNvcmRCdXR0b25zOiBNYWluQnV0dG9uQWx0W10gPSB0aGlzLnJlY29yZEJ1dHRvbnMpOiBhbnkgPT4ge1xuICAgIGNvbnN0IG1lbnVSZWNvcmRXaWRnZXQgPSB7XG4gICAgICBjb21wb25lbnQ6IE1lbnVSZWNvcmRXaWRnZXQsXG4gICAgICBpbmplY3RvcjogdGhpcy5jcmVhdGVJbmplY3Rvcih7XG4gICAgICAgIGJ1dHRvbnM6IHJlY29yZEJ1dHRvbnMsXG4gICAgICAgIHNob3dBc3BlY3Q6IHRydWUsXG4gICAgICAgIGRpcmVjdGlvbjogJ2hvcml6b250YWwnLFxuICAgICAgfSksXG4gICAgfTtcblxuICAgIHRoaXMubWVudVJlY29yZFdpZGdldCA9IHsgLi4ubWVudVJlY29yZFdpZGdldCB9O1xuXG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG5cbiAgICByZXR1cm4gbWVudVJlY29yZFdpZGdldDtcbiAgfTtcblxuICBtZW51UGFydGljaXBhbnRzV2lkZ2V0ID0ge1xuICAgIGNvbXBvbmVudDogTWVudVBhcnRpY2lwYW50c1dpZGdldCxcbiAgICBpbmplY3RvcjogdGhpcy5jcmVhdGVJbmplY3Rvcih7XG4gICAgICBpY29uOiB0aGlzLmZhQ2hhcnRCYXIsXG4gICAgICBwYXJ0aWNpcGFudHNDb3VudGVyOiB0aGlzLnBhcnRpY2lwYW50c0NvdW50ZXIudmFsdWUsXG4gICAgICBpY29uQ29sb3I6ICdibGFjaycsXG4gICAgfSksXG4gIH07XG5cbiAgdXBkYXRlTWVudVBhcnRpY2lwYW50c1dpZGdldCA9IChjb3VudDogbnVtYmVyID0gdGhpcy5wYXJ0aWNpcGFudHNDb3VudGVyLnZhbHVlKTogYW55ID0+IHtcbiAgICBjb25zdCBtZW51UGFydGljaXBhbnRzV2lkZ2V0ID0ge1xuICAgICAgY29tcG9uZW50OiBNZW51UGFydGljaXBhbnRzV2lkZ2V0LFxuICAgICAgaW5qZWN0b3I6IHRoaXMuY3JlYXRlSW5qZWN0b3Ioe1xuICAgICAgICBpY29uOiB0aGlzLmZhQ2hhcnRCYXIsXG4gICAgICAgIHBhcnRpY2lwYW50c0NvdW50ZXI6IGNvdW50LFxuICAgICAgICBpY29uQ29sb3I6ICdibGFjaycsXG4gICAgICB9KSxcbiAgICB9O1xuXG4gICAgdGhpcy5tZW51UGFydGljaXBhbnRzV2lkZ2V0ID0geyAuLi5tZW51UGFydGljaXBhbnRzV2lkZ2V0IH07XG5cbiAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcblxuICAgIHJldHVybiBtZW51UGFydGljaXBhbnRzV2lkZ2V0O1xuICB9O1xuXG4gIGNvbnRyb2xCcm9hZGNhc3RCdXR0b25zOiBCdXR0b25Ub3VjaFtdID0gW107XG5cbiAgdXBkYXRlQ29udHJvbEJyb2FkY2FzdEJ1dHRvbnMoKSB7XG4gICAgdGhpcy5jb250cm9sQnJvYWRjYXN0QnV0dG9ucyA9IHRoaXMuY29udHJvbEJyb2FkY2FzdEJ1dHRvbnNBcnJheS5tYXAoKGJ1dHRvbikgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uYnV0dG9uLFxuICAgICAgICBzaG93OiB0eXBlb2YgYnV0dG9uLnNob3cgPT09ICdmdW5jdGlvbicgPyBidXR0b24uc2hvdygpIDogYnV0dG9uLnNob3csXG4gICAgICAgIGFjdGl2ZTogdHlwZW9mIGJ1dHRvbi5hY3RpdmUgPT09ICdmdW5jdGlvbicgPyBidXR0b24uYWN0aXZlKCkgOiBidXR0b24uYWN0aXZlLFxuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIGNvbnRyb2xCcm9hZGNhc3RCdXR0b25zQXJyYXk6IEJ1dHRvblRvdWNoW10gPSBbXG4gICAge1xuICAgICAgaWNvbjogdGhpcy5mYVVzZXJzLFxuICAgICAgYWN0aXZlOiB0cnVlLFxuICAgICAgYWx0ZXJuYXRlSWNvbjogdGhpcy5mYVVzZXJzLFxuICAgICAgb25QcmVzczogKCkgPT5cbiAgICAgICAgdGhpcy5sYXVuY2hQYXJ0aWNpcGFudHMubGF1bmNoUGFydGljaXBhbnRzKHtcbiAgICAgICAgICB1cGRhdGVJc1BhcnRpY2lwYW50c01vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc1BhcnRpY2lwYW50c01vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuICAgICAgICAgIGlzUGFydGljaXBhbnRzTW9kYWxWaXNpYmxlOiB0aGlzLmlzUGFydGljaXBhbnRzTW9kYWxWaXNpYmxlLnZhbHVlLFxuICAgICAgICB9KSxcbiAgICAgIGFjdGl2ZUNvbG9yOiAnYmxhY2snLFxuICAgICAgaW5BY3RpdmVDb2xvcjogJ2JsYWNrJyxcbiAgICAgIHNob3c6ICgpID0+IHRoaXMuaXNsZXZlbC52YWx1ZSA9PSAnMicsXG4gICAgfSxcbiAgICB7XG4gICAgICBpY29uOiB0aGlzLmZhU2hhcmVBbHQsXG4gICAgICBhY3RpdmU6IHRydWUsXG4gICAgICBhbHRlcm5hdGVJY29uOiB0aGlzLmZhU2hhcmVBbHQsXG4gICAgICBvblByZXNzOiAoKSA9PiB0aGlzLnVwZGF0ZUlzU2hhcmVFdmVudE1vZGFsVmlzaWJsZSghdGhpcy5pc1NoYXJlRXZlbnRNb2RhbFZpc2libGUudmFsdWUpLFxuICAgICAgYWN0aXZlQ29sb3I6ICdibGFjaycsXG4gICAgICBpbkFjdGl2ZUNvbG9yOiAnYmxhY2snLFxuICAgICAgc2hvdzogKCkgPT4gdHJ1ZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGN1c3RvbUNvbXBvbmVudDogdGhpcy5tZXNzYWdlV2lkZ2V0LFxuICAgICAgb25QcmVzczogKCkgPT5cbiAgICAgICAgdGhpcy5sYXVuY2hNZXNzYWdlcy5sYXVuY2hNZXNzYWdlcyh7XG4gICAgICAgICAgdXBkYXRlSXNNZXNzYWdlc01vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc01lc3NhZ2VzTW9kYWxWaXNpYmxlLmJpbmQodGhpcyksXG4gICAgICAgICAgaXNNZXNzYWdlc01vZGFsVmlzaWJsZTogdGhpcy5pc01lc3NhZ2VzTW9kYWxWaXNpYmxlLnZhbHVlLFxuICAgICAgICB9KSxcbiAgICAgIHNob3c6ICgpID0+IHRydWUsXG4gICAgfSxcbiAgICB7XG4gICAgICBpY29uOiB0aGlzLmZhU3luYyxcbiAgICAgIGFjdGl2ZTogdHJ1ZSxcbiAgICAgIGFsdGVybmF0ZUljb246IHRoaXMuZmFTeW5jLFxuICAgICAgb25QcmVzczogKCkgPT5cbiAgICAgICAgdGhpcy5zd2l0Y2hWaWRlb0FsdC5zd2l0Y2hWaWRlb0FsdCh7XG4gICAgICAgICAgcGFyYW1ldGVyczoge1xuICAgICAgICAgICAgLi4udGhpcy5nZXRBbGxQYXJhbXMoKSxcbiAgICAgICAgICAgIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KSxcbiAgICAgIGFjdGl2ZUNvbG9yOiAnYmxhY2snLFxuICAgICAgaW5BY3RpdmVDb2xvcjogJ2JsYWNrJyxcbiAgICAgIHNob3c6ICgpID0+IHRoaXMuaXNsZXZlbC52YWx1ZSA9PSAnMicsXG4gICAgfSxcbiAgICB7XG4gICAgICBpY29uOiB0aGlzLmZhVmlkZW9TbGFzaCxcbiAgICAgIGFsdGVybmF0ZUljb246IHRoaXMuZmFWaWRlbyxcbiAgICAgIGFjdGl2ZTogKCkgPT4gdGhpcy52aWRlb0FjdGl2ZS52YWx1ZSxcbiAgICAgIG9uUHJlc3M6ICgpID0+XG4gICAgICAgIHRoaXMuY2xpY2tWaWRlby5jbGlja1ZpZGVvKHtcbiAgICAgICAgICBwYXJhbWV0ZXJzOiB7XG4gICAgICAgICAgICAuLi50aGlzLmdldEFsbFBhcmFtcygpLFxuICAgICAgICAgICAgLi4udGhpcy5tZWRpYVNGVUZ1bmN0aW9ucygpLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pLFxuICAgICAgc2hvdzogKCkgPT4gdGhpcy5pc2xldmVsLnZhbHVlID09ICcyJyxcbiAgICAgIGFjdGl2ZUNvbG9yOiAnZ3JlZW4nLFxuICAgICAgaW5BY3RpdmVDb2xvcjogJ3JlZCcsXG4gICAgfSxcbiAgICB7XG4gICAgICBpY29uOiB0aGlzLmZhTWljcm9waG9uZVNsYXNoLFxuICAgICAgYWx0ZXJuYXRlSWNvbjogdGhpcy5mYU1pY3JvcGhvbmUsXG4gICAgICBhY3RpdmU6ICgpID0+IHRoaXMubWljQWN0aXZlLnZhbHVlLFxuICAgICAgb25QcmVzczogKCkgPT5cbiAgICAgICAgdGhpcy5jbGlja0F1ZGlvLmNsaWNrQXVkaW8oe1xuICAgICAgICAgIHBhcmFtZXRlcnM6IHtcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0QWxsUGFyYW1zKCksXG4gICAgICAgICAgICAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCksXG4gICAgICAgICAgfSxcbiAgICAgICAgfSksXG4gICAgICBhY3RpdmVDb2xvcjogJ2dyZWVuJyxcbiAgICAgIGluQWN0aXZlQ29sb3I6ICdyZWQnLFxuICAgICAgc2hvdzogKCkgPT4gdGhpcy5pc2xldmVsLnZhbHVlID09ICcyJyxcbiAgICB9LFxuICAgIHtcbiAgICAgIGN1c3RvbUNvbXBvbmVudDogKCkgPT4gdGhpcy5tZW51UGFydGljaXBhbnRzV2lkZ2V0LFxuICAgICAgc2hvdzogKCkgPT4gdGhpcy5pc2xldmVsLnZhbHVlID09ICcyJyxcbiAgICB9LFxuICAgIHtcbiAgICAgIGljb246IHRoaXMuZmFQaG9uZSxcbiAgICAgIGFjdGl2ZTogdGhpcy5lbmRDYWxsQWN0aXZlLnZhbHVlLFxuICAgICAgb25QcmVzczogKCkgPT5cbiAgICAgICAgdGhpcy5sYXVuY2hDb25maXJtRXhpdC5sYXVuY2hDb25maXJtRXhpdCh7XG4gICAgICAgICAgdXBkYXRlSXNDb25maXJtRXhpdE1vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc0NvbmZpcm1FeGl0TW9kYWxWaXNpYmxlLmJpbmQodGhpcyksXG4gICAgICAgICAgaXNDb25maXJtRXhpdE1vZGFsVmlzaWJsZTogdGhpcy5pc0NvbmZpcm1FeGl0TW9kYWxWaXNpYmxlLnZhbHVlLFxuICAgICAgICB9KSxcbiAgICAgIGFjdGl2ZUNvbG9yOiAnZ3JlZW4nLFxuICAgICAgaW5BY3RpdmVDb2xvcjogJ3JlZCcsXG4gICAgICBzaG93OiAoKSA9PiB0cnVlLFxuICAgIH0sXG4gICAge1xuICAgICAgaWNvbjogdGhpcy5mYVBob25lLFxuICAgICAgYWN0aXZlOiB0aGlzLmVuZENhbGxBY3RpdmUudmFsdWUsXG4gICAgICBvblByZXNzOiAoKSA9PiBjb25zb2xlLmxvZygnRW5kIENhbGwgcHJlc3NlZCcpLFxuICAgICAgYWN0aXZlQ29sb3I6ICd0cmFuc3BhcmVudCcsXG4gICAgICBpbkFjdGl2ZUNvbG9yOiAndHJhbnNwYXJlbnQnLFxuICAgICAgYmFja2dyb3VuZENvbG9yOiB7IGRlZmF1bHQ6ICd0cmFuc3BhcmVudCcgfSxcbiAgICAgIHNob3c6ICgpID0+IGZhbHNlLFxuICAgIH0sXG4gIF07XG5cbiAgYXN5bmMgY29ubmVjdF9Tb2NrZXQoXG4gICAgYXBpVXNlck5hbWU6IHN0cmluZyxcbiAgICBhcGlLZXk6IHN0cmluZyxcbiAgICBhcGlUb2tlbjogc3RyaW5nLFxuICApOiBQcm9taXNlPFNvY2tldCB8IG51bGw+IHtcbiAgICBpZiAodGhpcy5zb2NrZXQudmFsdWUgJiYgdGhpcy5zb2NrZXQudmFsdWUuaWQpIHtcbiAgICAgIHRoaXMuc29ja2V0LnZhbHVlLm9uKCdkaXNjb25uZWN0JywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBhd2FpdCB0aGlzLmRpc2Nvbm5lY3QuZGlzY29ubmVjdCh7XG4gICAgICAgICAgc2hvd0FsZXJ0OiB0aGlzLnNob3dBbGVydC5iaW5kKHRoaXMpLFxuICAgICAgICAgIHJlZGlyZWN0VVJMOiB0aGlzLnJlZGlyZWN0VVJMLnZhbHVlLFxuICAgICAgICAgIG9uV2ViOiB0cnVlLFxuICAgICAgICAgIHVwZGF0ZVZhbGlkYXRlZDogdGhpcy51cGRhdGVWYWxpZGF0ZWQuYmluZCh0aGlzKSxcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh0aGlzLnZpZGVvQWxyZWFkeU9uLnZhbHVlKSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5jbGlja1ZpZGVvLmNsaWNrVmlkZW8oe1xuICAgICAgICAgICAgcGFyYW1ldGVyczogeyAuLi50aGlzLmdldEFsbFBhcmFtcygpLCAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCkgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5hdWRpb0FscmVhZHlPbi52YWx1ZSkge1xuICAgICAgICAgIGF3YWl0IHRoaXMuY2xpY2tBdWRpby5jbGlja0F1ZGlvKHtcbiAgICAgICAgICAgIHBhcmFtZXRlcnM6IHsgLi4udGhpcy5nZXRBbGxQYXJhbXMoKSwgLi4udGhpcy5tZWRpYVNGVUZ1bmN0aW9ucygpIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBhd2FpdCB0aGlzLmNsb3NlQW5kUmVzZXQoKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnNvY2tldC52YWx1ZS5vbignYWxsTWVtYmVycycsIGFzeW5jIChtZW1iZXJzRGF0YTogQWxsTWVtYmVyc0RhdGEpID0+IHtcbiAgICAgICAgaWYgKG1lbWJlcnNEYXRhKSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5hbGxNZW1iZXJzLmFsbE1lbWJlcnMoe1xuICAgICAgICAgICAgYXBpVXNlck5hbWU6IGFwaVVzZXJOYW1lLFxuICAgICAgICAgICAgYXBpS2V5OiAnJywgLy9ub3QgcmVjb21tZW5kZWQgLSB1c2UgYXBpVG9rZW4gaW5zdGVhZC4gVXNlIGZvciB0ZXN0aW5nL2RldmVsb3BtZW50IG9ubHlcbiAgICAgICAgICAgIGFwaVRva2VuOiBhcGlUb2tlbixcbiAgICAgICAgICAgIG1lbWJlcnM6IG1lbWJlcnNEYXRhLm1lbWJlcnMsXG4gICAgICAgICAgICByZXF1ZXN0c3M6IG1lbWJlcnNEYXRhLnJlcXVlc3RzID8gbWVtYmVyc0RhdGEucmVxdWVzdHMgOiB0aGlzLnJlcXVlc3RMaXN0LnZhbHVlLFxuICAgICAgICAgICAgY29Ib3N0ZTogbWVtYmVyc0RhdGEuY29Ib3N0ID8gbWVtYmVyc0RhdGEuY29Ib3N0IDogdGhpcy5jb0hvc3QudmFsdWUsXG4gICAgICAgICAgICBjb0hvc3RSZXM6IG1lbWJlcnNEYXRhLmNvSG9zdFJlc3BvbnNpYmlsaXRpZXNcbiAgICAgICAgICAgICAgPyBtZW1iZXJzRGF0YS5jb0hvc3RSZXNwb25zaWJpbGl0aWVzXG4gICAgICAgICAgICAgIDogdGhpcy5jb0hvc3RSZXNwb25zaWJpbGl0eS52YWx1ZSxcbiAgICAgICAgICAgIHBhcmFtZXRlcnM6IHsgLi4udGhpcy5nZXRBbGxQYXJhbXMoKSwgLi4udGhpcy5tZWRpYVNGVUZ1bmN0aW9ucygpIH0sXG4gICAgICAgICAgICBjb25zdW1lX3NvY2tldHM6IHRoaXMuY29uc3VtZV9zb2NrZXRzLnZhbHVlLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5zb2NrZXQudmFsdWUub24oJ2FsbE1lbWJlcnNSZXN0JywgYXN5bmMgKG1lbWJlcnNEYXRhOiBBbGxNZW1iZXJzUmVzdERhdGEpID0+IHtcbiAgICAgICAgaWYgKG1lbWJlcnNEYXRhKSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5hbGxNZW1iZXJzUmVzdC5hbGxNZW1iZXJzUmVzdCh7XG4gICAgICAgICAgICBhcGlVc2VyTmFtZTogYXBpVXNlck5hbWUsXG4gICAgICAgICAgICBhcGlLZXk6ICcnLCAvLyBub3QgcmVjb21tZW5kZWQgLSB1c2UgYXBpVG9rZW4gaW5zdGVhZC4gVXNlIGZvciB0ZXN0aW5nL2RldmVsb3BtZW50IG9ubHlcbiAgICAgICAgICAgIG1lbWJlcnM6IG1lbWJlcnNEYXRhLm1lbWJlcnMsXG4gICAgICAgICAgICBhcGlUb2tlbjogYXBpVG9rZW4sXG4gICAgICAgICAgICBzZXR0aW5nczogbWVtYmVyc0RhdGEuc2V0dGluZ3MsXG4gICAgICAgICAgICBjb0hvc3RlOiBtZW1iZXJzRGF0YS5jb0hvc3QgPyBtZW1iZXJzRGF0YS5jb0hvc3QgOiB0aGlzLmNvSG9zdC52YWx1ZSxcbiAgICAgICAgICAgIGNvSG9zdFJlczogbWVtYmVyc0RhdGEuY29Ib3N0UmVzcG9uc2liaWxpdGllc1xuICAgICAgICAgICAgICA/IG1lbWJlcnNEYXRhLmNvSG9zdFJlc3BvbnNpYmlsaXRpZXNcbiAgICAgICAgICAgICAgOiB0aGlzLmNvSG9zdFJlc3BvbnNpYmlsaXR5LnZhbHVlLFxuICAgICAgICAgICAgcGFyYW1ldGVyczogeyAuLi50aGlzLmdldEFsbFBhcmFtcygpLCAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCkgfSxcbiAgICAgICAgICAgIGNvbnN1bWVfc29ja2V0czogdGhpcy5jb25zdW1lX3NvY2tldHMudmFsdWUsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnNvY2tldC52YWx1ZS5vbigncGVyc29uSm9pbmVkJywgYXN5bmMgKHsgbmFtZSB9OiB7IG5hbWU6IHN0cmluZyB9KSA9PiB7XG4gICAgICAgIHRoaXMucGVyc29uSm9pbmVkLnBlcnNvbkpvaW5lZCh7XG4gICAgICAgICAgbmFtZSxcbiAgICAgICAgICBzaG93QWxlcnQ6IHRoaXMuc2hvd0FsZXJ0LmJpbmQodGhpcyksXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuc29ja2V0LnZhbHVlLm9uKFxuICAgICAgICAncm9vbVJlY29yZFBhcmFtcycsXG4gICAgICAgIGFzeW5jICh7IHJlY29yZFBhcmFtcyB9OiB7IHJlY29yZFBhcmFtczogUmVjb3JkUGFyYW1zIH0pID0+IHtcbiAgICAgICAgICB0aGlzLnJvb21SZWNvcmRQYXJhbXMucm9vbVJlY29yZFBhcmFtcyh7XG4gICAgICAgICAgICByZWNvcmRQYXJhbXMsXG4gICAgICAgICAgICBwYXJhbWV0ZXJzOiB7IC4uLnRoaXMuZ2V0QWxsUGFyYW1zKCksIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgKTtcblxuICAgICAgdGhpcy5zb2NrZXQudmFsdWUub24oJ2JhbicsIGFzeW5jICh7IG5hbWUgfTogeyBuYW1lOiBzdHJpbmcgfSkgPT4ge1xuICAgICAgICBhd2FpdCB0aGlzLmJhblBhcnRpY2lwYW50LmJhblBhcnRpY2lwYW50KHtcbiAgICAgICAgICBuYW1lLFxuICAgICAgICAgIHBhcmFtZXRlcnM6IHsgLi4udGhpcy5nZXRBbGxQYXJhbXMoKSwgLi4udGhpcy5tZWRpYVNGVUZ1bmN0aW9ucygpIH0sXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuc29ja2V0LnZhbHVlLm9uKFxuICAgICAgICAncHJvZHVjZXItbWVkaWEtcGF1c2VkJyxcbiAgICAgICAgYXN5bmMgKHtcbiAgICAgICAgICBwcm9kdWNlcklkLFxuICAgICAgICAgIGtpbmQsXG4gICAgICAgICAgbmFtZSxcbiAgICAgICAgfToge1xuICAgICAgICAgIHByb2R1Y2VySWQ6IHN0cmluZztcbiAgICAgICAgICBraW5kOiAndmlkZW8nIHwgJ2F1ZGlvJyB8ICdzY3JlZW5zaGFyZScgfCAnc2NyZWVuJztcbiAgICAgICAgICBuYW1lOiBzdHJpbmc7XG4gICAgICAgIH0pID0+IHtcbiAgICAgICAgICBhd2FpdCB0aGlzLnByb2R1Y2VyTWVkaWFQYXVzZWQucHJvZHVjZXJNZWRpYVBhdXNlZCh7XG4gICAgICAgICAgICBwcm9kdWNlcklkLFxuICAgICAgICAgICAga2luZCxcbiAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICBwYXJhbWV0ZXJzOiB7IC4uLnRoaXMuZ2V0QWxsUGFyYW1zKCksIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgKTtcblxuICAgICAgdGhpcy5zb2NrZXQudmFsdWUub24oXG4gICAgICAgICdwcm9kdWNlci1tZWRpYS1yZXN1bWVkJyxcbiAgICAgICAgYXN5bmMgKHsga2luZCwgbmFtZSB9OiB7IGtpbmQ6ICdhdWRpbyc7IG5hbWU6IHN0cmluZyB9KSA9PiB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5wcm9kdWNlck1lZGlhUmVzdW1lZC5wcm9kdWNlck1lZGlhUmVzdW1lZCh7XG4gICAgICAgICAgICBraW5kLFxuICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgIHBhcmFtZXRlcnM6IHsgLi4udGhpcy5nZXRBbGxQYXJhbXMoKSwgLi4udGhpcy5tZWRpYVNGVUZ1bmN0aW9ucygpIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICApO1xuXG4gICAgICB0aGlzLnNvY2tldC52YWx1ZS5vbihcbiAgICAgICAgJ3Byb2R1Y2VyLW1lZGlhLWNsb3NlZCcsXG4gICAgICAgIGFzeW5jICh7XG4gICAgICAgICAgcHJvZHVjZXJJZCxcbiAgICAgICAgICBraW5kLFxuICAgICAgICB9OiB7XG4gICAgICAgICAgcHJvZHVjZXJJZDogc3RyaW5nO1xuICAgICAgICAgIGtpbmQ6ICd2aWRlbycgfCAnYXVkaW8nIHwgJ3NjcmVlbnNoYXJlJyB8ICdzY3JlZW4nO1xuICAgICAgICB9KSA9PiB7XG4gICAgICAgICAgaWYgKHByb2R1Y2VySWQgJiYga2luZCkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wcm9kdWNlck1lZGlhQ2xvc2VkLnByb2R1Y2VyTWVkaWFDbG9zZWQoe1xuICAgICAgICAgICAgICBwcm9kdWNlcklkLFxuICAgICAgICAgICAgICBraW5kLFxuICAgICAgICAgICAgICBwYXJhbWV0ZXJzOiB7IC4uLnRoaXMuZ2V0QWxsUGFyYW1zKCksIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgKTtcblxuICAgICAgdGhpcy5zb2NrZXQudmFsdWUub24oJ21lZXRpbmdFbmRlZCcsIGFzeW5jICgpID0+IHtcbiAgICAgICAgYXdhaXQgdGhpcy5tZWV0aW5nRW5kZWQubWVldGluZ0VuZGVkKHtcbiAgICAgICAgICBzaG93QWxlcnQ6IHRoaXMuc2hvd0FsZXJ0LmJpbmQodGhpcyksXG4gICAgICAgICAgcmVkaXJlY3RVUkw6IHRoaXMucmVkaXJlY3RVUkwudmFsdWUsXG4gICAgICAgICAgb25XZWI6IHRydWUsXG4gICAgICAgICAgZXZlbnRUeXBlOiB0aGlzLmV2ZW50VHlwZS52YWx1ZSxcbiAgICAgICAgICB1cGRhdGVWYWxpZGF0ZWQ6IHRoaXMudXBkYXRlVmFsaWRhdGVkLmJpbmQodGhpcyksXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0aGlzLnZpZGVvQWxyZWFkeU9uLnZhbHVlKSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5jbGlja1ZpZGVvLmNsaWNrVmlkZW8oe1xuICAgICAgICAgICAgcGFyYW1ldGVyczoge1xuICAgICAgICAgICAgICAuLi50aGlzLmdldEFsbFBhcmFtcygpLFxuICAgICAgICAgICAgICAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmF1ZGlvQWxyZWFkeU9uLnZhbHVlKSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5jbGlja0F1ZGlvLmNsaWNrQXVkaW8oe1xuICAgICAgICAgICAgcGFyYW1ldGVyczoge1xuICAgICAgICAgICAgICAuLi50aGlzLmdldEFsbFBhcmFtcygpLFxuICAgICAgICAgICAgICAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgYXdhaXQgdGhpcy5jbG9zZUFuZFJlc2V0KCk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5zb2NrZXQudmFsdWUub24oJ2Rpc2Nvbm5lY3RVc2VyU2VsZicsIGFzeW5jICgpID0+IHtcbiAgICAgICAgYXdhaXQgdGhpcy5kaXNjb25uZWN0VXNlclNlbGYuZGlzY29ubmVjdFVzZXJTZWxmKHtcbiAgICAgICAgICBzb2NrZXQ6IHRoaXMuc29ja2V0LnZhbHVlLFxuICAgICAgICAgIG1lbWJlcjogdGhpcy5tZW1iZXIudmFsdWUsXG4gICAgICAgICAgcm9vbU5hbWU6IHRoaXMucm9vbU5hbWUudmFsdWUsXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuc29ja2V0LnZhbHVlLm9uKCdyZWNlaXZlTWVzc2FnZScsIGFzeW5jICh7IG1lc3NhZ2UgfTogeyBtZXNzYWdlOiBNZXNzYWdlIH0pID0+IHtcbiAgICAgICAgYXdhaXQgdGhpcy5yZWNlaXZlTWVzc2FnZS5yZWNlaXZlTWVzc2FnZSh7XG4gICAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgICBtZXNzYWdlczogdGhpcy5tZXNzYWdlcy52YWx1ZSxcbiAgICAgICAgICBwYXJ0aWNpcGFudHNBbGw6IHRoaXMucGFydGljaXBhbnRzQWxsLnZhbHVlLFxuICAgICAgICAgIG1lbWJlcjogdGhpcy5tZW1iZXIudmFsdWUsXG4gICAgICAgICAgZXZlbnRUeXBlOiB0aGlzLmV2ZW50VHlwZS52YWx1ZSxcbiAgICAgICAgICBpc2xldmVsOiB0aGlzLmlzbGV2ZWwudmFsdWUsXG4gICAgICAgICAgY29Ib3N0OiB0aGlzLmNvSG9zdC52YWx1ZSxcbiAgICAgICAgICB1cGRhdGVNZXNzYWdlczogdGhpcy51cGRhdGVNZXNzYWdlcy5iaW5kKHRoaXMpLFxuICAgICAgICAgIHVwZGF0ZVNob3dNZXNzYWdlc0JhZGdlOiB0aGlzLnVwZGF0ZVNob3dNZXNzYWdlc0JhZGdlLmJpbmQodGhpcyksXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuc29ja2V0LnZhbHVlLm9uKFxuICAgICAgICAnbWVldGluZ1RpbWVSZW1haW5pbmcnLFxuICAgICAgICBhc3luYyAoeyB0aW1lUmVtYWluaW5nIH06IHsgdGltZVJlbWFpbmluZzogbnVtYmVyIH0pID0+IHtcbiAgICAgICAgICBhd2FpdCB0aGlzLm1lZXRpbmdUaW1lUmVtYWluaW5nLm1lZXRpbmdUaW1lUmVtYWluaW5nKHtcbiAgICAgICAgICAgIHRpbWVSZW1haW5pbmcsXG4gICAgICAgICAgICBzaG93QWxlcnQ6IHRoaXMuc2hvd0FsZXJ0LmJpbmQodGhpcyksXG4gICAgICAgICAgICBldmVudFR5cGU6IHRoaXMuZXZlbnRUeXBlLnZhbHVlLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgKTtcblxuICAgICAgdGhpcy5zb2NrZXQudmFsdWUub24oJ21lZXRpbmdTdGlsbFRoZXJlJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICB0aGlzLm1lZXRpbmdTdGlsbFRoZXJlLm1lZXRpbmdTdGlsbFRoZXJlKHtcbiAgICAgICAgICB1cGRhdGVJc0NvbmZpcm1IZXJlTW9kYWxWaXNpYmxlOiB0aGlzLnVwZGF0ZUlzQ29uZmlybUhlcmVNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5zb2NrZXQudmFsdWUub24oJ3N0YXJ0UmVjb3JkcycsIGFzeW5jICgpID0+IHtcbiAgICAgICAgYXdhaXQgdGhpcy5zdGFydFJlY29yZHMuc3RhcnRSZWNvcmRzKHtcbiAgICAgICAgICByb29tTmFtZTogdGhpcy5yb29tTmFtZS52YWx1ZSxcbiAgICAgICAgICBtZW1iZXI6IHRoaXMubWVtYmVyLnZhbHVlLFxuICAgICAgICAgIHNvY2tldDogdGhpcy5zb2NrZXQudmFsdWUsXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuc29ja2V0LnZhbHVlLm9uKCdyZUluaXRpYXRlUmVjb3JkaW5nJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBhd2FpdCB0aGlzLnJlSW5pdGlhdGVSZWNvcmRpbmcucmVJbml0aWF0ZVJlY29yZGluZyh7XG4gICAgICAgICAgcm9vbU5hbWU6IHRoaXMucm9vbU5hbWUudmFsdWUsXG4gICAgICAgICAgbWVtYmVyOiB0aGlzLm1lbWJlci52YWx1ZSxcbiAgICAgICAgICBzb2NrZXQ6IHRoaXMuc29ja2V0LnZhbHVlLFxuICAgICAgICAgIGFkbWluUmVzdHJpY3RTZXR0aW5nOiB0aGlzLmFkbWluUmVzdHJpY3RTZXR0aW5nLnZhbHVlLFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnNvY2tldC52YWx1ZS5vbihcbiAgICAgICAgJ3VwZGF0ZUNvbnN1bWluZ0RvbWFpbnMnLFxuICAgICAgICBhc3luYyAoeyBkb21haW5zLCBhbHRfZG9tYWlucyB9OiBVcGRhdGVDb25zdW1pbmdEb21haW5zRGF0YSkgPT4ge1xuICAgICAgICAgIGF3YWl0IHRoaXMudXBkYXRlQ29uc3VtaW5nRG9tYWlucy51cGRhdGVDb25zdW1pbmdEb21haW5zKHtcbiAgICAgICAgICAgIGRvbWFpbnMsXG4gICAgICAgICAgICBhbHRfZG9tYWlucyxcbiAgICAgICAgICAgIGFwaVVzZXJOYW1lLFxuICAgICAgICAgICAgYXBpS2V5LFxuICAgICAgICAgICAgYXBpVG9rZW4sXG4gICAgICAgICAgICBwYXJhbWV0ZXJzOiB7XG4gICAgICAgICAgICAgIC4uLnRoaXMuZ2V0QWxsUGFyYW1zKCksXG4gICAgICAgICAgICAgIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICApO1xuXG4gICAgICB0aGlzLnNvY2tldC52YWx1ZS5vbihcbiAgICAgICAgJ1JlY29yZGluZ05vdGljZScsXG4gICAgICAgIGFzeW5jICh7IHN0YXRlLCB1c2VyUmVjb3JkaW5nUGFyYW0sIHBhdXNlQ291bnQsIHRpbWVEb25lIH06IFJlY29yZGluZ05vdGljZURhdGEpID0+IHtcbiAgICAgICAgICBhd2FpdCB0aGlzLnJlY29yZGluZ05vdGljZS5SZWNvcmRpbmdOb3RpY2Uoe1xuICAgICAgICAgICAgc3RhdGUsXG4gICAgICAgICAgICB1c2VyUmVjb3JkaW5nUGFyYW0sXG4gICAgICAgICAgICBwYXVzZUNvdW50LFxuICAgICAgICAgICAgdGltZURvbmUsXG4gICAgICAgICAgICBwYXJhbWV0ZXJzOiB7IC4uLnRoaXMuZ2V0QWxsUGFyYW1zKCksIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgKTtcblxuICAgICAgdGhpcy5zb2NrZXQudmFsdWUub24oJ3RpbWVMZWZ0UmVjb3JkaW5nJywgYXN5bmMgKHsgdGltZUxlZnQgfTogeyB0aW1lTGVmdDogbnVtYmVyIH0pID0+IHtcbiAgICAgICAgdGhpcy50aW1lTGVmdFJlY29yZGluZy50aW1lTGVmdFJlY29yZGluZyh7XG4gICAgICAgICAgdGltZUxlZnQsXG4gICAgICAgICAgc2hvd0FsZXJ0OiB0aGlzLnNob3dBbGVydC5iaW5kKHRoaXMpLFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnNvY2tldC52YWx1ZS5vbihcbiAgICAgICAgJ3N0b3BwZWRSZWNvcmRpbmcnLFxuICAgICAgICBhc3luYyAoeyBzdGF0ZSwgcmVhc29uIH06IHsgc3RhdGU6IHN0cmluZzsgcmVhc29uOiBzdHJpbmcgfSkgPT4ge1xuICAgICAgICAgIGF3YWl0IHRoaXMuc3RvcHBlZFJlY29yZGluZy5zdG9wcGVkUmVjb3JkaW5nKHtcbiAgICAgICAgICAgIHN0YXRlLFxuICAgICAgICAgICAgcmVhc29uLFxuICAgICAgICAgICAgc2hvd0FsZXJ0OiB0aGlzLnNob3dBbGVydC5iaW5kKHRoaXMpLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgKTtcblxuICAgICAgYXdhaXQgdGhpcy5qb2luX1Jvb20oe1xuICAgICAgICBzb2NrZXQ6IHRoaXMuc29ja2V0LnZhbHVlLFxuICAgICAgICByb29tTmFtZTogdGhpcy5yb29tTmFtZS52YWx1ZSxcbiAgICAgICAgaXNsZXZlbDogdGhpcy5pc2xldmVsLnZhbHVlLFxuICAgICAgICBtZW1iZXI6IHRoaXMubWVtYmVyLnZhbHVlLFxuICAgICAgICBzZWM6IHRoaXMuYXBpVG9rZW4udmFsdWUsXG4gICAgICAgIGFwaVVzZXJOYW1lOiB0aGlzLmFwaVVzZXJOYW1lLnZhbHVlLFxuICAgICAgfSk7XG4gICAgICBhd2FpdCB0aGlzLnJlY2VpdmVSb29tTWVzc2FnZXMucmVjZWl2ZVJvb21NZXNzYWdlcyh7XG4gICAgICAgIHNvY2tldDogdGhpcy5zb2NrZXQudmFsdWUsXG4gICAgICAgIHJvb21OYW1lOiB0aGlzLnJvb21OYW1lLnZhbHVlLFxuICAgICAgICB1cGRhdGVNZXNzYWdlczogdGhpcy51cGRhdGVNZXNzYWdlcy5iaW5kKHRoaXMpLFxuICAgICAgfSk7XG4gICAgICB0aGlzLnByZXBvcHVsYXRlVXNlck1lZGlhLnByZXBvcHVsYXRlVXNlck1lZGlhKHtcbiAgICAgICAgbmFtZTogdGhpcy5ob3N0TGFiZWwudmFsdWUsXG4gICAgICAgIHBhcmFtZXRlcnM6IHsgLi4udGhpcy5nZXRBbGxQYXJhbXMoKSwgLi4udGhpcy5tZWRpYVNGVUZ1bmN0aW9ucygpIH0sXG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHRoaXMuc29ja2V0LnZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cbn1cbiJdfQ==