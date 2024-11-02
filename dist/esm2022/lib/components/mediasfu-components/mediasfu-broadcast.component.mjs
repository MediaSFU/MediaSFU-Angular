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
/**
 * MediasfuBroadcast component provides a streaming broadcast interface with various UI components and settings.
 * It handles conditional rendering of a prejoin page or main broadcast content, along with integrated modals and controls.
 *
 * @component
 * @selector app-mediasfu-broadcast
 * @standalone true
 * @imports [RouterOutlet, CommonModule, AlertComponent, AudioGrid, ControlButtonsComponentTouch, FlexibleVideo, LoadingModal, ConfirmExitModal, MessagesModal, ConfirmHereModal, ShareEventModal, WelcomePage, ParticipantsModal, RecordingModal, MainAspectComponent, MainContainerComponent, MainGridComponent, MainScreenComponent, MessageWidget, MenuRecordWidget, RecordTimerWidget, MenuParticipantsWidget]
 *
 * @template
 * The component's template contains:
 * - Conditional rendering of the PrejoinPage component if the user is not validated.
 * - The main broadcast content, including video, controls, and optional modals.
 * - The `app-main-container-component` manages the main display.
 * - Controls for video and audio grid display and interactive modals (Participants, Messages, Recording, etc.)
 *
 * @input {any} PrejoinPage - Component to display as the prejoin page.
 * @input {{ apiUserName: string; apiKey: string }} credentials - API credentials for MediaSFU.
 * @input {boolean} useLocalUIMode - Flag to toggle local UI mode.
 * @input {SeedData} seedData - Optional seed data.
 * @input {boolean} useSeed - Flag to use seed data.
 * @input {string} imgSrc - Source for the logo image.
 *
 * @property {string} title - The title of the broadcast.
 *
 * @providers [CookieService] - Service for managing cookies within the component.
 *
 * @styles
 * Custom styles specific to MediaSFU layout and interactions.
 *
 * @constructor
 * @class MediasfuBroadcast
 * @implements OnInit, OnDestroy
 *
 * @method ngOnInit - Initializes the component, sets up necessary configurations, and event listeners.
 * @method ngOnDestroy - Cleanup on component destruction, including removal of event listeners and active intervals.
 *
 * @example
 * ```html
 * <app-mediasfu-broadcast
 *   [PrejoinPage]="CustomPrejoinComponent"
 *   [credentials]="{ apiUserName: 'user', apiKey: 'key' }"
 *   [useLocalUIMode]="true"
 *   [seedData]="seedDataObject"
 *   [useSeed]="true"
 *   imgSrc="https://example.com/logo.png">
 * </app-mediasfu-broadcast>
 * ```
 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWFzZnUtYnJvYWRjYXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb21wb25lbnRzL21lZGlhc2Z1LWNvbXBvbmVudHMvbWVkaWFzZnUtYnJvYWRjYXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFlBQVksRUFDWixRQUFRLEVBRVIsS0FBSyxHQUdOLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxlQUFlLEVBQWdCLGFBQWEsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUVwRSxPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLFlBQVksRUFDWixPQUFPLEVBQ1AsT0FBTyxFQUNQLFVBQVUsRUFDVixVQUFVLEVBQ1YsTUFBTSxFQUNOLFVBQVUsRUFDVixhQUFhLEVBQ2IsS0FBSyxFQUNMLFlBQVksRUFDWixhQUFhLEVBQ2IsWUFBWSxFQUNaLFdBQVcsRUFDWCxPQUFPLEVBQ1AsWUFBWSxHQUNiLE1BQU0sbUNBQW1DLENBQUM7QUFFM0MsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFFN0UseUJBQXlCO0FBQ3pCLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDZFQUE2RSxDQUFDO0FBQ2xILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw2REFBNkQsQ0FBQztBQUMzRixPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxpR0FBaUcsQ0FBQztBQUMvSSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw2RUFBNkUs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QUFzQjt3QkFDdEIsaUJBQWlCO3dCQUNqQixtQkFBbUI7d0JBQ25CLGFBQWE7d0JBQ2IsZ0JBQWdCO3dCQUNoQixpQkFBaUI7d0JBQ2pCLHNCQUFzQjtxQkFDdkIsWUFDUzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1TlQsYUFRVSxDQUFDLGFBQWEsQ0FBQzsybEdBSTFCLFdBQVc7c0JBRFYsS0FBSztnQkFFRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLGNBQWM7c0JBQXRCLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQXNwR0EsWUFBWTtzQkFGakIsWUFBWTt1QkFBQyxlQUFlOztzQkFDNUIsWUFBWTt1QkFBQywwQkFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5qZWN0b3IsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyT3V0bGV0IH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBDb29raWVTZXJ2aWNlIH0gZnJvbSAnbmd4LWNvb2tpZS1zZXJ2aWNlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgU3Vic2NyaXB0aW9uLCBjb21iaW5lTGF0ZXN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBTb2NrZXQgfSBmcm9tICdzb2NrZXQuaW8tY2xpZW50JztcbmltcG9ydCB7XG4gIGZhTWljcm9waG9uZVNsYXNoLFxuICBmYVZpZGVvU2xhc2gsXG4gIGZhUGhvbmUsXG4gIGZhVXNlcnMsXG4gIGZhQ29tbWVudHMsXG4gIGZhU2hhcmVBbHQsXG4gIGZhU3luYyxcbiAgZmFDaGFydEJhcixcbiAgZmFSZWNvcmRWaW55bCxcbiAgZmFDb2csXG4gIGZhUGxheUNpcmNsZSxcbiAgZmFQYXVzZUNpcmNsZSxcbiAgZmFTdG9wQ2lyY2xlLFxuICBmYURvdENpcmNsZSxcbiAgZmFWaWRlbyxcbiAgZmFNaWNyb3Bob25lLFxufSBmcm9tICdAZm9ydGF3ZXNvbWUvZnJlZS1zb2xpZC1zdmctaWNvbnMnO1xuXG5pbXBvcnQgeyBpbml0aWFsVmFsdWVzU3RhdGUgfSBmcm9tICcuLi8uLi9tZXRob2RzL3V0aWxzL2luaXRpYWwtdmFsdWVzLnV0aWwnO1xuXG4vLyBDb21wb25lbnRzIGZvciBkaXNwbGF5XG5pbXBvcnQgeyBNYWluQXNwZWN0Q29tcG9uZW50IH0gZnJvbSAnLi4vZGlzcGxheS1jb21wb25lbnRzL21haW4tYXNwZWN0LWNvbXBvbmVudC9tYWluLWFzcGVjdC1jb21wb25lbnQuY29tcG9uZW50JztcbmltcG9ydCB7IExvYWRpbmdNb2RhbCB9IGZyb20gJy4uL2Rpc3BsYXktY29tcG9uZW50cy9sb2FkaW5nLW1vZGFsL2xvYWRpbmctbW9kYWwuY29tcG9uZW50JztcbmltcG9ydCB7IENvbnRyb2xCdXR0b25zQ29tcG9uZW50VG91Y2ggfSBmcm9tICcuLi9kaXNwbGF5LWNvbXBvbmVudHMvY29udHJvbC1idXR0b25zLWNvbXBvbmVudC10b3VjaC9jb250cm9sLWJ1dHRvbnMtY29tcG9uZW50LXRvdWNoLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYWluU2NyZWVuQ29tcG9uZW50IH0gZnJvbSAnLi4vZGlzcGxheS1jb21wb25lbnRzL21haW4tc2NyZWVuLWNvbXBvbmVudC9tYWluLXNjcmVlbi1jb21wb25lbnQuY29tcG9uZW50JztcbmltcG9ydCB7IE1haW5HcmlkQ29tcG9uZW50IH0gZnJvbSAnLi4vZGlzcGxheS1jb21wb25lbnRzL21haW4tZ3JpZC1jb21wb25lbnQvbWFpbi1ncmlkLWNvbXBvbmVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWFpbkNvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4uL2Rpc3BsYXktY29tcG9uZW50cy9tYWluLWNvbnRhaW5lci1jb21wb25lbnQvbWFpbi1jb250YWluZXItY29tcG9uZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBbGVydENvbXBvbmVudCB9IGZyb20gJy4uL2Rpc3BsYXktY29tcG9uZW50cy9hbGVydC1jb21wb25lbnQvYWxlcnQuY29tcG9uZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSZWNvcmRpbmdNb2RhbCB9IGZyb20gJy4uL3JlY29yZGluZy1jb21wb25lbnRzL3JlY29yZGluZy1tb2RhbC9yZWNvcmRpbmctbW9kYWwuY29tcG9uZW50JztcbmltcG9ydCB7IFBhcnRpY2lwYW50c01vZGFsIH0gZnJvbSAnLi4vcGFydGljaXBhbnRzLWNvbXBvbmVudHMvcGFydGljaXBhbnRzLW1vZGFsL3BhcnRpY2lwYW50cy1tb2RhbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWVzc2FnZXNNb2RhbCB9IGZyb20gJy4uL21lc3NhZ2UtY29tcG9uZW50cy9tZXNzYWdlcy1tb2RhbC9tZXNzYWdlcy1tb2RhbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29uZmlybUV4aXRNb2RhbCB9IGZyb20gJy4uL2V4aXQtY29tcG9uZW50cy9jb25maXJtLWV4aXQtbW9kYWwvY29uZmlybS1leGl0LW1vZGFsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb25maXJtSGVyZU1vZGFsIH0gZnJvbSAnLi4vbWlzYy1jb21wb25lbnRzL2NvbmZpcm0taGVyZS1tb2RhbC9jb25maXJtLWhlcmUtbW9kYWwuY29tcG9uZW50JztcbmltcG9ydCB7IFNoYXJlRXZlbnRNb2RhbCB9IGZyb20gJy4uL21pc2MtY29tcG9uZW50cy9zaGFyZS1ldmVudC1tb2RhbC9zaGFyZS1ldmVudC1tb2RhbC5jb21wb25lbnQnO1xuaW1wb3J0IHtcbiAgV2VsY29tZVBhZ2UsXG4gIFdlbGNvbWVQYWdlT3B0aW9ucyxcbn0gZnJvbSAnLi4vbWlzYy1jb21wb25lbnRzL3dlbGNvbWUtcGFnZS93ZWxjb21lLXBhZ2UuY29tcG9uZW50JztcblxuLy8gUGFnaW5hdGlvbiBhbmQgZGlzcGxheSBvZiBtZWRpYVxuaW1wb3J0IHsgRmxleGlibGVWaWRlbyB9IGZyb20gJy4uL2Rpc3BsYXktY29tcG9uZW50cy9mbGV4aWJsZS12aWRlby9mbGV4aWJsZS12aWRlby5jb21wb25lbnQnO1xuaW1wb3J0IHsgQXVkaW9HcmlkIH0gZnJvbSAnLi4vZGlzcGxheS1jb21wb25lbnRzL2F1ZGlvLWdyaWQvYXVkaW8tZ3JpZC5jb21wb25lbnQnO1xuXG5pbXBvcnQgeyBNZXNzYWdlV2lkZ2V0IH0gZnJvbSAnLi4vZGlzcGxheS1jb21wb25lbnRzL2NvbnRyb2wtd2lkZ2V0cy9tZXNzYWdlLXdpZGdldC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWVudVJlY29yZFdpZGdldCB9IGZyb20gJy4uL2Rpc3BsYXktY29tcG9uZW50cy9jb250cm9sLXdpZGdldHMvbWVudS1yZWNvcmQtd2lkZ2V0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSZWNvcmRUaW1lcldpZGdldCB9IGZyb20gJy4uL2Rpc3BsYXktY29tcG9uZW50cy9jb250cm9sLXdpZGdldHMvcmVjb3JkLXRpbWVyLXdpZGdldC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWVudVBhcnRpY2lwYW50c1dpZGdldCB9IGZyb20gJy4uL2Rpc3BsYXktY29tcG9uZW50cy9jb250cm9sLXdpZGdldHMvbWVudS1wYXJ0aWNpcGFudHMtd2lkZ2V0LmNvbXBvbmVudCc7XG5cbmltcG9ydCB7XG4gIEJ1dHRvblRvdWNoLFxuICBSZXNwb25zZUpvaW5Sb29tLFxuICBDb0hvc3RSZXNwb25zaWJpbGl0eSxcbiAgRXZlbnRUeXBlLFxuICBQYXJ0aWNpcGFudCxcbiAgQ29uc3VtZVNvY2tldCxcbiAgTWVldGluZ1Jvb21QYXJhbXMsXG4gIFZpZENvbnMsXG4gIEhQYXJhbXNUeXBlLFxuICBWUGFyYW1zVHlwZSxcbiAgU2NyZWVuUGFyYW1zVHlwZSxcbiAgQVBhcmFtc1R5cGUsXG4gIFVzZXJSZWNvcmRpbmdQYXJhbXMsXG4gIFN0cmVhbSxcbiAgQXVkaW9EZWNpYmVscyxcbiAgU2NyZWVuU3RhdGUsXG4gIEdyaWRTaXplcyxcbiAgQ3VzdG9tTWVkaWFDb21wb25lbnQsXG4gIE1lc3NhZ2UsXG4gIFdhaXRpbmdSb29tUGFydGljaXBhbnQsXG4gIENvbXBvbmVudFNpemVzLFxuICBUcmFuc3BvcnQgYXMgVHJhbnNwb3J0VHlwZSxcbiAgU2hhcGUsXG4gIFBvbGwsXG4gIEJyZWFrb3V0UGFydGljaXBhbnQsXG4gIFdoaXRlYm9hcmRVc2VyLFxuICBSZXF1ZXN0LFxuICBBbGxNZW1iZXJzRGF0YSxcbiAgQWxsTWVtYmVyc1Jlc3REYXRhLFxuICBNYWluQnV0dG9uQWx0LFxuICBSZWNvcmRQYXJhbXMsXG4gIFNlZWREYXRhLFxuICBVcGRhdGVDb25zdW1pbmdEb21haW5zRGF0YSxcbiAgUmVjb3JkaW5nTm90aWNlRGF0YSxcbiAgUHJlSm9pblBhZ2VPcHRpb25zLFxufSBmcm9tICcuLi8uLi9AdHlwZXMvdHlwZXMnO1xuLy8gSW1wb3J0IG1ldGhvZHMgZm9yIGNvbnRyb2xcbmltcG9ydCB7IExhdW5jaFJlY29yZGluZyB9IGZyb20gJy4uLy4uL21ldGhvZHMvcmVjb3JkaW5nLW1ldGhvZHMvbGF1bmNoLXJlY29yZGluZy5zZXJ2aWNlJztcbmltcG9ydCB7IFN0YXJ0UmVjb3JkaW5nIH0gZnJvbSAnLi4vLi4vbWV0aG9kcy9yZWNvcmRpbmctbWV0aG9kcy9zdGFydC1yZWNvcmRpbmcuc2VydmljZSc7XG5pbXBvcnQgeyBDb25maXJtUmVjb3JkaW5nIH0gZnJvbSAnLi4vLi4vbWV0aG9kcy9yZWNvcmRpbmctbWV0aG9kcy9jb25maXJtLXJlY29yZGluZy5zZXJ2aWNlJztcbmltcG9ydCB7IExhdW5jaFBhcnRpY2lwYW50cyB9IGZyb20gJy4uLy4uL21ldGhvZHMvcGFydGljaXBhbnRzLW1ldGhvZHMvbGF1bmNoLXBhcnRpY2lwYW50cy5zZXJ2aWNlJztcbmltcG9ydCB7IExhdW5jaE1lc3NhZ2VzIH0gZnJvbSAnLi4vLi4vbWV0aG9kcy9tZXNzYWdlLW1ldGhvZHMvbGF1bmNoLW1lc3NhZ2VzLnNlcnZpY2UnO1xuaW1wb3J0IHsgTGF1bmNoQ29uZmlybUV4aXQgfSBmcm9tICcuLi8uLi9tZXRob2RzL2V4aXQtbWV0aG9kcy9sYXVuY2gtY29uZmlybS1leGl0LnNlcnZpY2UnO1xuXG4vLyBNZWRpYXNmdSBmdW5jdGlvbnMgLS0gZXhhbXBsZXNcbmltcG9ydCB7IFNvY2tldE1hbmFnZXIgfSBmcm9tICcuLi8uLi9zb2NrZXRzL3NvY2tldC1tYW5hZ2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgSm9pblJvb21DbGllbnQgfSBmcm9tICcuLi8uLi9wcm9kdWNlci1jbGllbnQvcHJvZHVjZXItY2xpZW50LWVtaXRzL2pvaW4tcm9vbS1jbGllbnQuc2VydmljZSc7XG5pbXBvcnQgeyBVcGRhdGVSb29tUGFyYW1ldGVyc0NsaWVudCB9IGZyb20gJy4uLy4uL3Byb2R1Y2VyLWNsaWVudC9wcm9kdWNlci1jbGllbnQtZW1pdHMvdXBkYXRlLXJvb20tcGFyYW1ldGVycy1jbGllbnQuc2VydmljZSc7XG5pbXBvcnQgeyBDcmVhdGVEZXZpY2VDbGllbnQgfSBmcm9tICcuLi8uLi9wcm9kdWNlci1jbGllbnQvcHJvZHVjZXItY2xpZW50LWVtaXRzL2NyZWF0ZS1kZXZpY2UtY2xpZW50LnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBTd2l0Y2hWaWRlb0FsdCB9IGZyb20gJy4uLy4uL21ldGhvZHMvc3RyZWFtLW1ldGhvZHMvc3dpdGNoLXZpZGVvLWFsdC5zZXJ2aWNlJztcbmltcG9ydCB7IENsaWNrVmlkZW8gfSBmcm9tICcuLi8uLi9tZXRob2RzL3N0cmVhbS1tZXRob2RzL2NsaWNrLXZpZGVvLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2xpY2tBdWRpbyB9IGZyb20gJy4uLy4uL21ldGhvZHMvc3RyZWFtLW1ldGhvZHMvY2xpY2stYXVkaW8uc2VydmljZSc7XG5pbXBvcnQgeyBDbGlja1NjcmVlblNoYXJlIH0gZnJvbSAnLi4vLi4vbWV0aG9kcy9zdHJlYW0tbWV0aG9kcy9jbGljay1zY3JlZW4tc2hhcmUuc2VydmljZSc7XG5pbXBvcnQgeyBTdHJlYW1TdWNjZXNzVmlkZW8gfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvc3RyZWFtLXN1Y2Nlc3MtdmlkZW8uc2VydmljZSc7XG5pbXBvcnQgeyBTdHJlYW1TdWNjZXNzQXVkaW8gfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvc3RyZWFtLXN1Y2Nlc3MtYXVkaW8uc2VydmljZSc7XG5pbXBvcnQgeyBTdHJlYW1TdWNjZXNzU2NyZWVuIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL3N0cmVhbS1zdWNjZXNzLXNjcmVlbi5zZXJ2aWNlJztcbmltcG9ydCB7IFN0cmVhbVN1Y2Nlc3NBdWRpb1N3aXRjaCB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9zdHJlYW0tc3VjY2Vzcy1hdWRpby1zd2l0Y2guc2VydmljZSc7XG5pbXBvcnQgeyBDaGVja1Blcm1pc3Npb24gfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvY2hlY2stcGVybWlzc2lvbi5zZXJ2aWNlJztcblxuLy8gTWVkaWFzZnUgY29uc3VtZXIgZnVuY3Rpb25zXG5pbXBvcnQgeyBVcGRhdGVNaW5pQ2FyZHNHcmlkIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL3VwZGF0ZS1taW5pLWNhcmRzLWdyaWQuc2VydmljZSc7XG5pbXBvcnQgeyBNaXhTdHJlYW1zIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL21peC1zdHJlYW1zLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGlzcFN0cmVhbXMgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvZGlzcC1zdHJlYW1zLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3RvcFNoYXJlU2NyZWVuIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL3N0b3Atc2hhcmUtc2NyZWVuLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2hlY2tTY3JlZW5TaGFyZSB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9jaGVjay1zY3JlZW4tc2hhcmUuc2VydmljZSc7XG5pbXBvcnQgeyBTdGFydFNoYXJlU2NyZWVuIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL3N0YXJ0LXNoYXJlLXNjcmVlbi5zZXJ2aWNlJztcbmltcG9ydCB7IFJlcXVlc3RTY3JlZW5TaGFyZSB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9yZXF1ZXN0LXNjcmVlbi1zaGFyZS5zZXJ2aWNlJztcbmltcG9ydCB7IFJlb3JkZXJTdHJlYW1zIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL3Jlb3JkZXItc3RyZWFtcy5zZXJ2aWNlJztcbmltcG9ydCB7IFByZXBvcHVsYXRlVXNlck1lZGlhIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL3ByZXBvcHVsYXRlLXVzZXItbWVkaWEuc2VydmljZSc7XG5pbXBvcnQgeyBHZXRWaWRlb3MgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvZ2V0LXZpZGVvcy5zZXJ2aWNlJztcbmltcG9ydCB7IFJlUG9ydCB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9yZS1wb3J0LnNlcnZpY2UnO1xuaW1wb3J0IHsgVHJpZ2dlciB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy90cmlnZ2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29uc3VtZXJSZXN1bWUgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvY29uc3VtZXItcmVzdW1lLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29ubmVjdFNlbmRUcmFuc3BvcnRBdWRpbyB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9jb25uZWN0LXNlbmQtdHJhbnNwb3J0LWF1ZGlvLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlbyB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9jb25uZWN0LXNlbmQtdHJhbnNwb3J0LXZpZGVvLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW4gfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvY29ubmVjdC1zZW5kLXRyYW5zcG9ydC1zY3JlZW4uc2VydmljZSc7XG5pbXBvcnQgeyBQcm9jZXNzQ29uc3VtZXJUcmFuc3BvcnRzIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL3Byb2Nlc3MtY29uc3VtZXItdHJhbnNwb3J0cy5zZXJ2aWNlJztcbmltcG9ydCB7IFJlc3VtZVBhdXNlU3RyZWFtcyB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9yZXN1bWUtcGF1c2Utc3RyZWFtcy5zZXJ2aWNlJztcbmltcG9ydCB7IFJlYWRqdXN0IH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL3JlYWRqdXN0LnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2hlY2tHcmlkIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL2NoZWNrLWdyaWQuc2VydmljZSc7XG5pbXBvcnQgeyBHZXRFc3RpbWF0ZSB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9nZXQtZXN0aW1hdGUuc2VydmljZSc7XG5pbXBvcnQgeyBDYWxjdWxhdGVSb3dzQW5kQ29sdW1ucyB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9jYWxjdWxhdGUtcm93cy1hbmQtY29sdW1ucy5zZXJ2aWNlJztcbmltcG9ydCB7IEFkZFZpZGVvc0dyaWQgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvYWRkLXZpZGVvcy1ncmlkLnNlcnZpY2UnO1xuaW1wb3J0IHsgT25TY3JlZW5DaGFuZ2VzIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL29uLXNjcmVlbi1jaGFuZ2VzLnNlcnZpY2UnO1xuaW1wb3J0IHsgc2xlZXAgfSBmcm9tICcuLi8uLi9tZXRob2RzL3V0aWxzL3NsZWVwLnV0aWwnO1xuaW1wb3J0IHsgQ2hhbmdlVmlkcyB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9jaGFuZ2Utdmlkcy5zZXJ2aWNlJztcbmltcG9ydCB7IENvbXBhcmVBY3RpdmVOYW1lcyB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9jb21wYXJlLWFjdGl2ZS1uYW1lcy5zZXJ2aWNlJztcbmltcG9ydCB7IENvbXBhcmVTY3JlZW5TdGF0ZXMgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvY29tcGFyZS1zY3JlZW4tc3RhdGVzLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ3JlYXRlU2VuZFRyYW5zcG9ydCB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9jcmVhdGUtc2VuZC10cmFuc3BvcnQuc2VydmljZSc7XG5pbXBvcnQgeyBSZXN1bWVTZW5kVHJhbnNwb3J0QXVkaW8gfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvcmVzdW1lLXNlbmQtdHJhbnNwb3J0LWF1ZGlvLnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVjZWl2ZUFsbFBpcGVkVHJhbnNwb3J0cyB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9yZWNlaXZlLWFsbC1waXBlZC10cmFuc3BvcnRzLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGlzY29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlbyB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9kaXNjb25uZWN0LXNlbmQtdHJhbnNwb3J0LXZpZGVvLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGlzY29ubmVjdFNlbmRUcmFuc3BvcnRBdWRpbyB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9kaXNjb25uZWN0LXNlbmQtdHJhbnNwb3J0LWF1ZGlvLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGlzY29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW4gfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvZGlzY29ubmVjdC1zZW5kLXRyYW5zcG9ydC1zY3JlZW4uc2VydmljZSc7XG5pbXBvcnQgeyBDb25uZWN0U2VuZFRyYW5zcG9ydCB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9jb25uZWN0LXNlbmQtdHJhbnNwb3J0LnNlcnZpY2UnO1xuaW1wb3J0IHsgR2V0UGlwZWRQcm9kdWNlcnNBbHQgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvZ2V0LXBpcGVkLXByb2R1Y2Vycy1hbHQuc2VydmljZSc7XG5pbXBvcnQgeyBTaWduYWxOZXdDb25zdW1lclRyYW5zcG9ydCB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9zaWduYWwtbmV3LWNvbnN1bWVyLXRyYW5zcG9ydC5zZXJ2aWNlJztcbmltcG9ydCB7IENvbm5lY3RSZWN2VHJhbnNwb3J0IH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL2Nvbm5lY3QtcmVjdi10cmFuc3BvcnQuc2VydmljZSc7XG5pbXBvcnQgeyBSZVVwZGF0ZUludGVyIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL3JlLXVwZGF0ZS1pbnRlci5zZXJ2aWNlJztcbmltcG9ydCB7IFVwZGF0ZVBhcnRpY2lwYW50QXVkaW9EZWNpYmVscyB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy91cGRhdGUtcGFydGljaXBhbnQtYXVkaW8tZGVjaWJlbHMuc2VydmljZSc7XG5pbXBvcnQgeyBDbG9zZUFuZFJlc2l6ZSB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9jbG9zZS1hbmQtcmVzaXplLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXV0b0FkanVzdCB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9hdXRvLWFkanVzdC5zZXJ2aWNlJztcbmltcG9ydCB7IFN3aXRjaFVzZXJWaWRlb0FsdCB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9zd2l0Y2gtdXNlci12aWRlby1hbHQuc2VydmljZSc7XG5pbXBvcnQgeyBTd2l0Y2hVc2VyVmlkZW8gfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvc3dpdGNoLXVzZXItdmlkZW8uc2VydmljZSc7XG5pbXBvcnQgeyBTd2l0Y2hVc2VyQXVkaW8gfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvc3dpdGNoLXVzZXItYXVkaW8uc2VydmljZSc7XG5pbXBvcnQgeyBSZWNlaXZlUm9vbU1lc3NhZ2VzIH0gZnJvbSAnLi4vLi4vY29uc3VtZXJzL3JlY2VpdmUtcm9vbS1tZXNzYWdlcy5zZXJ2aWNlJztcbmltcG9ydCB7IEZvcm1hdE51bWJlciB9IGZyb20gJy4uLy4uL21ldGhvZHMvdXRpbHMvZm9ybWF0LW51bWJlci5zZXJ2aWNlJztcbmltcG9ydCB7IENvbm5lY3RJcHMgfSBmcm9tICcuLi8uLi9jb25zdW1lcnMvY29ubmVjdC1pcHMuc2VydmljZSc7XG5cbi8vIFV0aWxpdHkgaW1wb3J0cyBmb3IgbWVldGluZyBhbmQgcmVjb3JkaW5nIGZ1bmN0aW9uYWxpdHlcbmltcG9ydCB7IFN0YXJ0TWVldGluZ1Byb2dyZXNzVGltZXIgfSBmcm9tICcuLi8uLi9tZXRob2RzL3V0aWxzL21lZXRpbmctdGltZXIvc3RhcnQtbWVldGluZy1wcm9ncmVzcy10aW1lci5zZXJ2aWNlJztcbmltcG9ydCB7IFVwZGF0ZVJlY29yZGluZyB9IGZyb20gJy4uLy4uL21ldGhvZHMvcmVjb3JkaW5nLW1ldGhvZHMvdXBkYXRlLXJlY29yZGluZy5zZXJ2aWNlJztcbmltcG9ydCB7IFN0b3BSZWNvcmRpbmcgfSBmcm9tICcuLi8uLi9tZXRob2RzL3JlY29yZGluZy1tZXRob2RzL3N0b3AtcmVjb3JkaW5nLnNlcnZpY2UnO1xuXG4vLyBTb2NrZXQgbWV0aG9kcyBmb3IgcGFydGljaXBhbnQgYW5kIG1lZXRpbmcgbWFuYWdlbWVudFxuaW1wb3J0IHsgUGVyc29uSm9pbmVkIH0gZnJvbSAnLi4vLi4vcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvcGVyc29uLWpvaW5lZC5zZXJ2aWNlJztcbmltcG9ydCB7IFJvb21SZWNvcmRQYXJhbXMgfSBmcm9tICcuLi8uLi9wcm9kdWNlcnMvc29ja2V0LXJlY2VpdmUtbWV0aG9kcy9yb29tLXJlY29yZC1wYXJhbXMuc2VydmljZSc7XG5pbXBvcnQgeyBCYW5QYXJ0aWNpcGFudCB9IGZyb20gJy4uLy4uL3Byb2R1Y2Vycy9zb2NrZXQtcmVjZWl2ZS1tZXRob2RzL2Jhbi1wYXJ0aWNpcGFudC5zZXJ2aWNlJztcbmltcG9ydCB7IFByb2R1Y2VyTWVkaWFQYXVzZWQgfSBmcm9tICcuLi8uLi9wcm9kdWNlcnMvc29ja2V0LXJlY2VpdmUtbWV0aG9kcy9wcm9kdWNlci1tZWRpYS1wYXVzZWQuc2VydmljZSc7XG5pbXBvcnQgeyBQcm9kdWNlck1lZGlhUmVzdW1lZCB9IGZyb20gJy4uLy4uL3Byb2R1Y2Vycy9zb2NrZXQtcmVjZWl2ZS1tZXRob2RzL3Byb2R1Y2VyLW1lZGlhLXJlc3VtZWQuc2VydmljZSc7XG5pbXBvcnQgeyBQcm9kdWNlck1lZGlhQ2xvc2VkIH0gZnJvbSAnLi4vLi4vcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvcHJvZHVjZXItbWVkaWEtY2xvc2VkLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWVldGluZ0VuZGVkIH0gZnJvbSAnLi4vLi4vcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvbWVldGluZy1lbmRlZC5zZXJ2aWNlJztcbmltcG9ydCB7IERpc2Nvbm5lY3RVc2VyU2VsZiB9IGZyb20gJy4uLy4uL3Byb2R1Y2Vycy9zb2NrZXQtcmVjZWl2ZS1tZXRob2RzL2Rpc2Nvbm5lY3QtdXNlci1zZWxmLnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVjZWl2ZU1lc3NhZ2UgfSBmcm9tICcuLi8uLi9wcm9kdWNlcnMvc29ja2V0LXJlY2VpdmUtbWV0aG9kcy9yZWNlaXZlLW1lc3NhZ2Uuc2VydmljZSc7XG5pbXBvcnQgeyBNZWV0aW5nVGltZVJlbWFpbmluZyB9IGZyb20gJy4uLy4uL3Byb2R1Y2Vycy9zb2NrZXQtcmVjZWl2ZS1tZXRob2RzL21lZXRpbmctdGltZS1yZW1haW5pbmcuc2VydmljZSc7XG5pbXBvcnQgeyBNZWV0aW5nU3RpbGxUaGVyZSB9IGZyb20gJy4uLy4uL3Byb2R1Y2Vycy9zb2NrZXQtcmVjZWl2ZS1tZXRob2RzL21lZXRpbmctc3RpbGwtdGhlcmUuc2VydmljZSc7XG5pbXBvcnQgeyBTdGFydFJlY29yZHMgfSBmcm9tICcuLi8uLi9wcm9kdWNlcnMvc29ja2V0LXJlY2VpdmUtbWV0aG9kcy9zdGFydC1yZWNvcmRzLnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVJbml0aWF0ZVJlY29yZGluZyB9IGZyb20gJy4uLy4uL3Byb2R1Y2Vycy9zb2NrZXQtcmVjZWl2ZS1tZXRob2RzL3JlLWluaXRpYXRlLXJlY29yZGluZy5zZXJ2aWNlJztcbmltcG9ydCB7IEdldERvbWFpbnMgfSBmcm9tICcuLi8uLi9wcm9kdWNlcnMvc29ja2V0LXJlY2VpdmUtbWV0aG9kcy9nZXQtZG9tYWlucy5zZXJ2aWNlJztcbmltcG9ydCB7IFVwZGF0ZUNvbnN1bWluZ0RvbWFpbnMgfSBmcm9tICcuLi8uLi9wcm9kdWNlcnMvc29ja2V0LXJlY2VpdmUtbWV0aG9kcy91cGRhdGUtY29uc3VtaW5nLWRvbWFpbnMuc2VydmljZSc7XG5pbXBvcnQgeyBSZWNvcmRpbmdOb3RpY2UgfSBmcm9tICcuLi8uLi9wcm9kdWNlcnMvc29ja2V0LXJlY2VpdmUtbWV0aG9kcy9yZWNvcmRpbmctbm90aWNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgVGltZUxlZnRSZWNvcmRpbmcgfSBmcm9tICcuLi8uLi9wcm9kdWNlcnMvc29ja2V0LXJlY2VpdmUtbWV0aG9kcy90aW1lLWxlZnQtcmVjb3JkaW5nLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3RvcHBlZFJlY29yZGluZyB9IGZyb20gJy4uLy4uL3Byb2R1Y2Vycy9zb2NrZXQtcmVjZWl2ZS1tZXRob2RzL3N0b3BwZWQtcmVjb3JkaW5nLnNlcnZpY2UnO1xuaW1wb3J0IHsgQWxsTWVtYmVycyB9IGZyb20gJy4uLy4uL3Byb2R1Y2Vycy9zb2NrZXQtcmVjZWl2ZS1tZXRob2RzL2FsbC1tZW1iZXJzLnNlcnZpY2UnO1xuaW1wb3J0IHsgQWxsTWVtYmVyc1Jlc3QgfSBmcm9tICcuLi8uLi9wcm9kdWNlcnMvc29ja2V0LXJlY2VpdmUtbWV0aG9kcy9hbGwtbWVtYmVycy1yZXN0LnNlcnZpY2UnO1xuaW1wb3J0IHsgRGlzY29ubmVjdCB9IGZyb20gJy4uLy4uL3Byb2R1Y2Vycy9zb2NrZXQtcmVjZWl2ZS1tZXRob2RzL2Rpc2Nvbm5lY3Quc2VydmljZSc7XG5cbmltcG9ydCB7IENhcHR1cmVDYW52YXNTdHJlYW0gfSBmcm9tICcuLi8uLi9tZXRob2RzL3doaXRlYm9hcmQtbWV0aG9kcy9jYXB0dXJlLWNhbnZhcy1zdHJlYW0uc2VydmljZSc7XG5pbXBvcnQgeyBSZXN1bWVQYXVzZUF1ZGlvU3RyZWFtcyB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9yZXN1bWUtcGF1c2UtYXVkaW8tc3RyZWFtcy5zZXJ2aWNlJztcbmltcG9ydCB7IFByb2Nlc3NDb25zdW1lclRyYW5zcG9ydHNBdWRpbyB9IGZyb20gJy4uLy4uL2NvbnN1bWVycy9wcm9jZXNzLWNvbnN1bWVyLXRyYW5zcG9ydHMtYXVkaW8uc2VydmljZSc7XG5cbmltcG9ydCB7XG4gIERldmljZSxcbiAgUHJvZHVjZXIsXG4gIFByb2R1Y2VyT3B0aW9ucyxcbiAgUnRwQ2FwYWJpbGl0aWVzLFxuICBUcmFuc3BvcnQsXG59IGZyb20gJ21lZGlhc291cC1jbGllbnQvbGliL3R5cGVzJztcbmltcG9ydCB7IFNlbGZpZVNlZ21lbnRhdGlvbiB9IGZyb20gJ0BtZWRpYXBpcGUvc2VsZmllX3NlZ21lbnRhdGlvbic7XG5cbmV4cG9ydCB0eXBlIE1lZGlhc2Z1QnJvYWRjYXN0T3B0aW9ucyA9IHtcbiAgUHJlam9pblBhZ2U/OiAob3B0aW9uczogUHJlSm9pblBhZ2VPcHRpb25zIHwgV2VsY29tZVBhZ2VPcHRpb25zKSA9PiBIVE1MRWxlbWVudDtcbiAgY3JlZGVudGlhbHM/OiB7IGFwaVVzZXJOYW1lOiBzdHJpbmc7IGFwaUtleTogc3RyaW5nIH07XG4gIHVzZUxvY2FsVUlNb2RlPzogYm9vbGVhbjtcbiAgc2VlZERhdGE/OiBTZWVkRGF0YTtcbiAgdXNlU2VlZD86IGJvb2xlYW47XG4gIGltZ1NyYz86IHN0cmluZztcbn07XG5cbi8qKlxuICogTWVkaWFzZnVCcm9hZGNhc3QgY29tcG9uZW50IHByb3ZpZGVzIGEgc3RyZWFtaW5nIGJyb2FkY2FzdCBpbnRlcmZhY2Ugd2l0aCB2YXJpb3VzIFVJIGNvbXBvbmVudHMgYW5kIHNldHRpbmdzLlxuICogSXQgaGFuZGxlcyBjb25kaXRpb25hbCByZW5kZXJpbmcgb2YgYSBwcmVqb2luIHBhZ2Ugb3IgbWFpbiBicm9hZGNhc3QgY29udGVudCwgYWxvbmcgd2l0aCBpbnRlZ3JhdGVkIG1vZGFscyBhbmQgY29udHJvbHMuXG4gKlxuICogQGNvbXBvbmVudFxuICogQHNlbGVjdG9yIGFwcC1tZWRpYXNmdS1icm9hZGNhc3RcbiAqIEBzdGFuZGFsb25lIHRydWVcbiAqIEBpbXBvcnRzIFtSb3V0ZXJPdXRsZXQsIENvbW1vbk1vZHVsZSwgQWxlcnRDb21wb25lbnQsIEF1ZGlvR3JpZCwgQ29udHJvbEJ1dHRvbnNDb21wb25lbnRUb3VjaCwgRmxleGlibGVWaWRlbywgTG9hZGluZ01vZGFsLCBDb25maXJtRXhpdE1vZGFsLCBNZXNzYWdlc01vZGFsLCBDb25maXJtSGVyZU1vZGFsLCBTaGFyZUV2ZW50TW9kYWwsIFdlbGNvbWVQYWdlLCBQYXJ0aWNpcGFudHNNb2RhbCwgUmVjb3JkaW5nTW9kYWwsIE1haW5Bc3BlY3RDb21wb25lbnQsIE1haW5Db250YWluZXJDb21wb25lbnQsIE1haW5HcmlkQ29tcG9uZW50LCBNYWluU2NyZWVuQ29tcG9uZW50LCBNZXNzYWdlV2lkZ2V0LCBNZW51UmVjb3JkV2lkZ2V0LCBSZWNvcmRUaW1lcldpZGdldCwgTWVudVBhcnRpY2lwYW50c1dpZGdldF1cbiAqXG4gKiBAdGVtcGxhdGVcbiAqIFRoZSBjb21wb25lbnQncyB0ZW1wbGF0ZSBjb250YWluczpcbiAqIC0gQ29uZGl0aW9uYWwgcmVuZGVyaW5nIG9mIHRoZSBQcmVqb2luUGFnZSBjb21wb25lbnQgaWYgdGhlIHVzZXIgaXMgbm90IHZhbGlkYXRlZC5cbiAqIC0gVGhlIG1haW4gYnJvYWRjYXN0IGNvbnRlbnQsIGluY2x1ZGluZyB2aWRlbywgY29udHJvbHMsIGFuZCBvcHRpb25hbCBtb2RhbHMuXG4gKiAtIFRoZSBgYXBwLW1haW4tY29udGFpbmVyLWNvbXBvbmVudGAgbWFuYWdlcyB0aGUgbWFpbiBkaXNwbGF5LlxuICogLSBDb250cm9scyBmb3IgdmlkZW8gYW5kIGF1ZGlvIGdyaWQgZGlzcGxheSBhbmQgaW50ZXJhY3RpdmUgbW9kYWxzIChQYXJ0aWNpcGFudHMsIE1lc3NhZ2VzLCBSZWNvcmRpbmcsIGV0Yy4pXG4gKlxuICogQGlucHV0IHthbnl9IFByZWpvaW5QYWdlIC0gQ29tcG9uZW50IHRvIGRpc3BsYXkgYXMgdGhlIHByZWpvaW4gcGFnZS5cbiAqIEBpbnB1dCB7eyBhcGlVc2VyTmFtZTogc3RyaW5nOyBhcGlLZXk6IHN0cmluZyB9fSBjcmVkZW50aWFscyAtIEFQSSBjcmVkZW50aWFscyBmb3IgTWVkaWFTRlUuXG4gKiBAaW5wdXQge2Jvb2xlYW59IHVzZUxvY2FsVUlNb2RlIC0gRmxhZyB0byB0b2dnbGUgbG9jYWwgVUkgbW9kZS5cbiAqIEBpbnB1dCB7U2VlZERhdGF9IHNlZWREYXRhIC0gT3B0aW9uYWwgc2VlZCBkYXRhLlxuICogQGlucHV0IHtib29sZWFufSB1c2VTZWVkIC0gRmxhZyB0byB1c2Ugc2VlZCBkYXRhLlxuICogQGlucHV0IHtzdHJpbmd9IGltZ1NyYyAtIFNvdXJjZSBmb3IgdGhlIGxvZ28gaW1hZ2UuXG4gKlxuICogQHByb3BlcnR5IHtzdHJpbmd9IHRpdGxlIC0gVGhlIHRpdGxlIG9mIHRoZSBicm9hZGNhc3QuXG4gKlxuICogQHByb3ZpZGVycyBbQ29va2llU2VydmljZV0gLSBTZXJ2aWNlIGZvciBtYW5hZ2luZyBjb29raWVzIHdpdGhpbiB0aGUgY29tcG9uZW50LlxuICpcbiAqIEBzdHlsZXNcbiAqIEN1c3RvbSBzdHlsZXMgc3BlY2lmaWMgdG8gTWVkaWFTRlUgbGF5b3V0IGFuZCBpbnRlcmFjdGlvbnMuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKiBAY2xhc3MgTWVkaWFzZnVCcm9hZGNhc3RcbiAqIEBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95XG4gKlxuICogQG1ldGhvZCBuZ09uSW5pdCAtIEluaXRpYWxpemVzIHRoZSBjb21wb25lbnQsIHNldHMgdXAgbmVjZXNzYXJ5IGNvbmZpZ3VyYXRpb25zLCBhbmQgZXZlbnQgbGlzdGVuZXJzLlxuICogQG1ldGhvZCBuZ09uRGVzdHJveSAtIENsZWFudXAgb24gY29tcG9uZW50IGRlc3RydWN0aW9uLCBpbmNsdWRpbmcgcmVtb3ZhbCBvZiBldmVudCBsaXN0ZW5lcnMgYW5kIGFjdGl2ZSBpbnRlcnZhbHMuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYGh0bWxcbiAqIDxhcHAtbWVkaWFzZnUtYnJvYWRjYXN0XG4gKiAgIFtQcmVqb2luUGFnZV09XCJDdXN0b21QcmVqb2luQ29tcG9uZW50XCJcbiAqICAgW2NyZWRlbnRpYWxzXT1cInsgYXBpVXNlck5hbWU6ICd1c2VyJywgYXBpS2V5OiAna2V5JyB9XCJcbiAqICAgW3VzZUxvY2FsVUlNb2RlXT1cInRydWVcIlxuICogICBbc2VlZERhdGFdPVwic2VlZERhdGFPYmplY3RcIlxuICogICBbdXNlU2VlZF09XCJ0cnVlXCJcbiAqICAgaW1nU3JjPVwiaHR0cHM6Ly9leGFtcGxlLmNvbS9sb2dvLnBuZ1wiPlxuICogPC9hcHAtbWVkaWFzZnUtYnJvYWRjYXN0PlxuICogYGBgXG4gKi9cblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtbWVkaWFzZnUtYnJvYWRjYXN0JyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW1xuICAgIFJvdXRlck91dGxldCxcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgQWxlcnRDb21wb25lbnQsXG4gICAgQXVkaW9HcmlkLFxuICAgIENvbnRyb2xCdXR0b25zQ29tcG9uZW50VG91Y2gsXG4gICAgRmxleGlibGVWaWRlbyxcbiAgICBMb2FkaW5nTW9kYWwsXG4gICAgQ29uZmlybUV4aXRNb2RhbCxcbiAgICBNZXNzYWdlc01vZGFsLFxuICAgIENvbmZpcm1IZXJlTW9kYWwsXG4gICAgU2hhcmVFdmVudE1vZGFsLFxuICAgIFdlbGNvbWVQYWdlLFxuICAgIFBhcnRpY2lwYW50c01vZGFsLFxuICAgIFJlY29yZGluZ01vZGFsLFxuICAgIE1haW5Bc3BlY3RDb21wb25lbnQsXG4gICAgTWFpbkNvbnRhaW5lckNvbXBvbmVudCxcbiAgICBNYWluR3JpZENvbXBvbmVudCxcbiAgICBNYWluU2NyZWVuQ29tcG9uZW50LFxuICAgIE1lc3NhZ2VXaWRnZXQsXG4gICAgTWVudVJlY29yZFdpZGdldCxcbiAgICBSZWNvcmRUaW1lcldpZGdldCxcbiAgICBNZW51UGFydGljaXBhbnRzV2lkZ2V0LFxuICBdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXZcbiAgICAgIGNsYXNzPVwiTWVkaWFTRlVcIlxuICAgICAgW25nU3R5bGVdPVwie1xuICAgICAgICBoZWlnaHQ6ICcxMDB2aCcsXG4gICAgICAgIHdpZHRoOiAnMTAwdncnLFxuICAgICAgICBtYXhXaWR0aDogJzEwMHZ3JyxcbiAgICAgICAgbWF4SGVpZ2h0OiAnMTAwdmgnLFxuICAgICAgICBvdmVyZmxvdzogJ2hpZGRlbidcbiAgICAgIH1cIlxuICAgID5cbiAgICAgIDwhLS0gQ29uZGl0aW9uYWwgUmVuZGVyaW5nOiBQcmVqb2luUGFnZSBvciBNYWluIENvbnRlbnQgLS0+XG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIXZhbGlkYXRlZC52YWx1ZTsgZWxzZSBtYWluQ29udGVudFwiPlxuICAgICAgICA8bmctY29udGFpbmVyXG4gICAgICAgICAgKm5nQ29tcG9uZW50T3V0bGV0PVwiXG4gICAgICAgICAgICBQcmVqb2luUGFnZUNvbXBvbmVudC5jb21wb25lbnQ7XG4gICAgICAgICAgICBpbmplY3RvcjogUHJlam9pblBhZ2VDb21wb25lbnQuaW5qZWN0b3JcbiAgICAgICAgICBcIlxuICAgICAgICA+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICAgIDwhLS0gTWFpbiBDb250ZW50IC0tPlxuICAgICAgPG5nLXRlbXBsYXRlICNtYWluQ29udGVudD5cbiAgICAgICAgPGFwcC1tYWluLWNvbnRhaW5lci1jb21wb25lbnQ+XG4gICAgICAgICAgPCEtLSBNYWluIEFzcGVjdCBDb21wb25lbnQgLS0+XG4gICAgICAgICAgPGFwcC1tYWluLWFzcGVjdC1jb21wb25lbnRcbiAgICAgICAgICAgIFtiYWNrZ3JvdW5kQ29sb3JdPVwiJ3JnYmEoMjE3LCAyMjcsIDIzNCwgMC45OSknXCJcbiAgICAgICAgICAgIFtkZWZhdWx0RnJhY3Rpb25dPVwiMSAtIGNvbnRyb2xIZWlnaHQudmFsdWVcIlxuICAgICAgICAgICAgW3Nob3dDb250cm9sc109XCJldmVudFR5cGUudmFsdWUgPT09ICd3ZWJpbmFyJyB8fCBldmVudFR5cGUudmFsdWUgPT09ICdjb25mZXJlbmNlJ1wiXG4gICAgICAgICAgICBbdXBkYXRlSXNXaWRlU2NyZWVuXT1cInVwZGF0ZUlzV2lkZVNjcmVlblwiXG4gICAgICAgICAgICBbdXBkYXRlSXNNZWRpdW1TY3JlZW5dPVwidXBkYXRlSXNNZWRpdW1TY3JlZW5cIlxuICAgICAgICAgICAgW3VwZGF0ZUlzU21hbGxTY3JlZW5dPVwidXBkYXRlSXNTbWFsbFNjcmVlblwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPCEtLSBNYWluIFNjcmVlbiBDb21wb25lbnQgLS0+XG4gICAgICAgICAgICA8YXBwLW1haW4tc2NyZWVuLWNvbXBvbmVudFxuICAgICAgICAgICAgICBbZG9TdGFja109XCJ0cnVlXCJcbiAgICAgICAgICAgICAgW21haW5TaXplXT1cIm1haW5IZWlnaHRXaWR0aC52YWx1ZVwiXG4gICAgICAgICAgICAgIFtkZWZhdWx0RnJhY3Rpb25dPVwiMSAtIGNvbnRyb2xIZWlnaHQudmFsdWVcIlxuICAgICAgICAgICAgICBbc2hvd0NvbnRyb2xzXT1cImV2ZW50VHlwZS52YWx1ZSA9PT0gJ3dlYmluYXInIHx8IGV2ZW50VHlwZS52YWx1ZSA9PT0gJ2NvbmZlcmVuY2UnXCJcbiAgICAgICAgICAgICAgW3VwZGF0ZUNvbXBvbmVudFNpemVzXT1cInVwZGF0ZUNvbXBvbmVudFNpemVzXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPCEtLSBNYWluIEdyaWQgQ29tcG9uZW50IC0tPlxuICAgICAgICAgICAgICA8YXBwLW1haW4tZ3JpZC1jb21wb25lbnRcbiAgICAgICAgICAgICAgICBbaGVpZ2h0XT1cImNvbXBvbmVudFNpemVzLnZhbHVlLm1haW5IZWlnaHRcIlxuICAgICAgICAgICAgICAgIFt3aWR0aF09XCJjb21wb25lbnRTaXplcy52YWx1ZS5tYWluV2lkdGhcIlxuICAgICAgICAgICAgICAgIFtiYWNrZ3JvdW5kQ29sb3JdPVwiJ3JnYmEoMjE3LCAyMjcsIDIzNCwgMC45OSknXCJcbiAgICAgICAgICAgICAgICBbbWFpblNpemVdPVwibWFpbkhlaWdodFdpZHRoLnZhbHVlXCJcbiAgICAgICAgICAgICAgICBbc2hvd0FzcGVjdF09XCJtYWluSGVpZ2h0V2lkdGgudmFsdWUgPiAwXCJcbiAgICAgICAgICAgICAgICBbdGltZUJhY2tncm91bmRDb2xvcl09XCJyZWNvcmRTdGF0ZS52YWx1ZVwiXG4gICAgICAgICAgICAgICAgW21lZXRpbmdQcm9ncmVzc1RpbWVdPVwibWVldGluZ1Byb2dyZXNzVGltZS52YWx1ZVwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8YXBwLWZsZXhpYmxlLXZpZGVvXG4gICAgICAgICAgICAgICAgICBbY3VzdG9tV2lkdGhdPVwiY29tcG9uZW50U2l6ZXMudmFsdWUubWFpbldpZHRoXCJcbiAgICAgICAgICAgICAgICAgIFtjdXN0b21IZWlnaHRdPVwiY29tcG9uZW50U2l6ZXMudmFsdWUubWFpbkhlaWdodFwiXG4gICAgICAgICAgICAgICAgICBbcm93c109XCIxXCJcbiAgICAgICAgICAgICAgICAgIFtjb2x1bW5zXT1cIjFcIlxuICAgICAgICAgICAgICAgICAgW2NvbXBvbmVudHNUb1JlbmRlcl09XCJtYWluR3JpZFN0cmVhbS52YWx1ZVwiXG4gICAgICAgICAgICAgICAgICBbc2hvd0FzcGVjdF09XCJcbiAgICAgICAgICAgICAgICAgICAgbWFpbkdyaWRTdHJlYW0udmFsdWUubGVuZ3RoID4gMCAmJlxuICAgICAgICAgICAgICAgICAgICAhKHdoaXRlYm9hcmRTdGFydGVkLnZhbHVlICYmICF3aGl0ZWJvYXJkRW5kZWQudmFsdWUpXG4gICAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8L2FwcC1mbGV4aWJsZS12aWRlbz5cblxuICAgICAgICAgICAgICAgIDwhLS0gQ29udHJvbCBCdXR0b25zIGZvciBCcm9hZGNhc3QgLS0+XG4gICAgICAgICAgICAgICAgPGFwcC1jb250cm9sLWJ1dHRvbnMtY29tcG9uZW50LXRvdWNoXG4gICAgICAgICAgICAgICAgICBbYnV0dG9uc109XCJjb250cm9sQnJvYWRjYXN0QnV0dG9uc1wiXG4gICAgICAgICAgICAgICAgICBbcG9zaXRpb25dPVwiJ3JpZ2h0J1wiXG4gICAgICAgICAgICAgICAgICBbbG9jYXRpb25dPVwiJ2JvdHRvbSdcIlxuICAgICAgICAgICAgICAgICAgW2RpcmVjdGlvbl09XCIndmVydGljYWwnXCJcbiAgICAgICAgICAgICAgICAgIFtzaG93QXNwZWN0XT1cImV2ZW50VHlwZS52YWx1ZSA9PT0gJ2Jyb2FkY2FzdCdcIlxuICAgICAgICAgICAgICAgID48L2FwcC1jb250cm9sLWJ1dHRvbnMtY29tcG9uZW50LXRvdWNoPlxuXG4gICAgICAgICAgICAgICAgPCEtLSBSZWNvcmRpbmcgQnV0dG9ucyAtLT5cbiAgICAgICAgICAgICAgICA8YXBwLWNvbnRyb2wtYnV0dG9ucy1jb21wb25lbnQtdG91Y2hcbiAgICAgICAgICAgICAgICAgIFtidXR0b25zXT1cInJlY29yZEJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICBbZGlyZWN0aW9uXT1cIidob3Jpem9udGFsJ1wiXG4gICAgICAgICAgICAgICAgICBbc2hvd0FzcGVjdF09XCJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRUeXBlLnZhbHVlID09PSAnYnJvYWRjYXN0JyAmJlxuICAgICAgICAgICAgICAgICAgICAhc2hvd1JlY29yZEJ1dHRvbnMudmFsdWUgJiZcbiAgICAgICAgICAgICAgICAgICAgaXNsZXZlbC52YWx1ZSA9PT0gJzInXG4gICAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgW2xvY2F0aW9uXT1cIidib3R0b20nXCJcbiAgICAgICAgICAgICAgICAgIFtwb3NpdGlvbl09XCInbWlkZGxlJ1wiXG4gICAgICAgICAgICAgICAgPjwvYXBwLWNvbnRyb2wtYnV0dG9ucy1jb21wb25lbnQtdG91Y2g+XG5cbiAgICAgICAgICAgICAgICA8YXBwLWNvbnRyb2wtYnV0dG9ucy1jb21wb25lbnQtdG91Y2hcbiAgICAgICAgICAgICAgICAgIFtidXR0b25zXT1cInJlY29yZEJ1dHRvbnNcIlxuICAgICAgICAgICAgICAgICAgW2RpcmVjdGlvbl09XCInaG9yaXpvbnRhbCdcIlxuICAgICAgICAgICAgICAgICAgW3Nob3dBc3BlY3RdPVwiXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50VHlwZS52YWx1ZSA9PT0gJ2Jyb2FkY2FzdCcgJiZcbiAgICAgICAgICAgICAgICAgICAgc2hvd1JlY29yZEJ1dHRvbnMudmFsdWUgJiZcbiAgICAgICAgICAgICAgICAgICAgaXNsZXZlbC52YWx1ZSA9PT0gJzInXG4gICAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgW2xvY2F0aW9uXT1cIidib3R0b20nXCJcbiAgICAgICAgICAgICAgICAgIFtwb3NpdGlvbl09XCInbWlkZGxlJ1wiXG4gICAgICAgICAgICAgICAgPjwvYXBwLWNvbnRyb2wtYnV0dG9ucy1jb21wb25lbnQtdG91Y2g+XG5cbiAgICAgICAgICAgICAgICA8IS0tIEF1ZGlvR3JpZCAtLT5cbiAgICAgICAgICAgICAgICA8YXBwLWF1ZGlvLWdyaWQgW2NvbXBvbmVudHNUb1JlbmRlcl09XCJhdWRpb09ubHlTdHJlYW1zLnZhbHVlXCI+PC9hcHAtYXVkaW8tZ3JpZD5cbiAgICAgICAgICAgICAgPC9hcHAtbWFpbi1ncmlkLWNvbXBvbmVudD5cblxuICAgICAgICAgICAgICA8IS0tIE90aGVyIEdyaWQgQ29tcG9uZW50IGlzIG5vdCBpbmNsdWRlZCBpbiBNZWRpYXNmdUJyb2FkY2FzdCAtLT5cbiAgICAgICAgICAgIDwvYXBwLW1haW4tc2NyZWVuLWNvbXBvbmVudD5cbiAgICAgICAgICA8L2FwcC1tYWluLWFzcGVjdC1jb21wb25lbnQ+XG4gICAgICAgIDwvYXBwLW1haW4tY29udGFpbmVyLWNvbXBvbmVudD5cbiAgICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICAgIDwhLS0gTW9kYWxzIHRvIGluY2x1ZGUgLS0+XG4gICAgICA8YXBwLXBhcnRpY2lwYW50cy1tb2RhbFxuICAgICAgICBbYmFja2dyb3VuZENvbG9yXT1cIidyZ2JhKDIxNywgMjI3LCAyMzQsIDAuOTkpJ1wiXG4gICAgICAgIFtpc1BhcnRpY2lwYW50c01vZGFsVmlzaWJsZV09XCJpc1BhcnRpY2lwYW50c01vZGFsVmlzaWJsZS52YWx1ZVwiXG4gICAgICAgIFtvblBhcnRpY2lwYW50c0Nsb3NlXT1cIm9uUGFydGljaXBhbnRzQ2xvc2VcIlxuICAgICAgICBbcGFydGljaXBhbnRzQ291bnRlcl09XCJwYXJ0aWNpcGFudHNDb3VudGVyLnZhbHVlXCJcbiAgICAgICAgW29uUGFydGljaXBhbnRzRmlsdGVyQ2hhbmdlXT1cIm9uUGFydGljaXBhbnRzRmlsdGVyQ2hhbmdlXCJcbiAgICAgICAgW3BhcmFtZXRlcnNdPVwie1xuICAgICAgICAgIHVwZGF0ZVBhcnRpY2lwYW50czogdXBkYXRlUGFydGljaXBhbnRzLFxuICAgICAgICAgIHVwZGF0ZUlzUGFydGljaXBhbnRzTW9kYWxWaXNpYmxlOiB1cGRhdGVJc1BhcnRpY2lwYW50c01vZGFsVmlzaWJsZSxcbiAgICAgICAgICB1cGRhdGVEaXJlY3RNZXNzYWdlRGV0YWlsczogdXBkYXRlRGlyZWN0TWVzc2FnZURldGFpbHMsXG4gICAgICAgICAgdXBkYXRlU3RhcnREaXJlY3RNZXNzYWdlOiB1cGRhdGVTdGFydERpcmVjdE1lc3NhZ2UsXG4gICAgICAgICAgdXBkYXRlSXNNZXNzYWdlc01vZGFsVmlzaWJsZTogdXBkYXRlSXNNZXNzYWdlc01vZGFsVmlzaWJsZSxcbiAgICAgICAgICBzaG93QWxlcnQ6IHNob3dBbGVydCxcbiAgICAgICAgICBmaWx0ZXJlZFBhcnRpY2lwYW50czogZmlsdGVyZWRQYXJ0aWNpcGFudHMudmFsdWUsXG4gICAgICAgICAgcGFydGljaXBhbnRzOiBmaWx0ZXJlZFBhcnRpY2lwYW50cy52YWx1ZSxcbiAgICAgICAgICByb29tTmFtZTogcm9vbU5hbWUudmFsdWUsXG4gICAgICAgICAgaXNsZXZlbDogaXNsZXZlbC52YWx1ZSxcbiAgICAgICAgICBtZW1iZXI6IG1lbWJlci52YWx1ZSxcbiAgICAgICAgICBjb0hvc3RSZXNwb25zaWJpbGl0eTogY29Ib3N0UmVzcG9uc2liaWxpdHkudmFsdWUsXG4gICAgICAgICAgY29Ib3N0OiBjb0hvc3QudmFsdWUsXG4gICAgICAgICAgZXZlbnRUeXBlOiBldmVudFR5cGUudmFsdWUsXG4gICAgICAgICAgc3RhcnREaXJlY3RNZXNzYWdlOiBzdGFydERpcmVjdE1lc3NhZ2UudmFsdWUsXG4gICAgICAgICAgZGlyZWN0TWVzc2FnZURldGFpbHM6IGRpcmVjdE1lc3NhZ2VEZXRhaWxzLnZhbHVlLFxuICAgICAgICAgIHNvY2tldDogc29ja2V0LnZhbHVlLFxuICAgICAgICAgIGdldFVwZGF0ZWRBbGxQYXJhbXM6IGdldFVwZGF0ZWRBbGxQYXJhbXMsXG4gICAgICAgIH1cIlxuICAgICAgPjwvYXBwLXBhcnRpY2lwYW50cy1tb2RhbD5cblxuICAgICAgPGFwcC1yZWNvcmRpbmctbW9kYWxcbiAgICAgICAgW2JhY2tncm91bmRDb2xvcl09XCIncmdiYSgyMTcsIDIyNywgMjM0LCAwLjk5KSdcIlxuICAgICAgICBbaXNSZWNvcmRpbmdNb2RhbFZpc2libGVdPVwiaXNSZWNvcmRpbmdNb2RhbFZpc2libGUudmFsdWVcIlxuICAgICAgICBbb25DbG9zZV09XCJvblJlY29yZGluZ0Nsb3NlXCJcbiAgICAgICAgW3N0YXJ0UmVjb3JkaW5nXT1cInN0YXJ0UmVjb3JkaW5nLnN0YXJ0UmVjb3JkaW5nXCJcbiAgICAgICAgW2NvbmZpcm1SZWNvcmRpbmddPVwiY29uZmlybVJlY29yZGluZy5jb25maXJtUmVjb3JkaW5nXCJcbiAgICAgICAgW3BhcmFtZXRlcnNdPVwibWVkaWFTRlVQYXJhbWV0ZXJzXCJcbiAgICAgID48L2FwcC1yZWNvcmRpbmctbW9kYWw+XG5cbiAgICAgIDxhcHAtbWVzc2FnZXMtbW9kYWxcbiAgICAgICAgW2JhY2tncm91bmRDb2xvcl09XCJcbiAgICAgICAgICBldmVudFR5cGUudmFsdWUgPT09ICd3ZWJpbmFyJyB8fCBldmVudFR5cGUudmFsdWUgPT09ICdjb25mZXJlbmNlJ1xuICAgICAgICAgICAgPyAnI2Y1ZjVmNSdcbiAgICAgICAgICAgIDogJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMC4yNSknXG4gICAgICAgIFwiXG4gICAgICAgIFtpc01lc3NhZ2VzTW9kYWxWaXNpYmxlXT1cImlzTWVzc2FnZXNNb2RhbFZpc2libGUudmFsdWVcIlxuICAgICAgICBbb25NZXNzYWdlc0Nsb3NlXT1cIm9uTWVzc2FnZXNDbG9zZVwiXG4gICAgICAgIFttZXNzYWdlc109XCJtZXNzYWdlcy52YWx1ZVwiXG4gICAgICAgIFtldmVudFR5cGVdPVwiZXZlbnRUeXBlLnZhbHVlXCJcbiAgICAgICAgW21lbWJlcl09XCJtZW1iZXIudmFsdWVcIlxuICAgICAgICBbaXNsZXZlbF09XCJpc2xldmVsLnZhbHVlXCJcbiAgICAgICAgW2NvSG9zdFJlc3BvbnNpYmlsaXR5XT1cImNvSG9zdFJlc3BvbnNpYmlsaXR5LnZhbHVlXCJcbiAgICAgICAgW2NvSG9zdF09XCJjb0hvc3QudmFsdWVcIlxuICAgICAgICBbc3RhcnREaXJlY3RNZXNzYWdlXT1cInN0YXJ0RGlyZWN0TWVzc2FnZS52YWx1ZVwiXG4gICAgICAgIFtkaXJlY3RNZXNzYWdlRGV0YWlsc109XCJkaXJlY3RNZXNzYWdlRGV0YWlscy52YWx1ZVwiXG4gICAgICAgIFt1cGRhdGVTdGFydERpcmVjdE1lc3NhZ2VdPVwidXBkYXRlU3RhcnREaXJlY3RNZXNzYWdlXCJcbiAgICAgICAgW3VwZGF0ZURpcmVjdE1lc3NhZ2VEZXRhaWxzXT1cInVwZGF0ZURpcmVjdE1lc3NhZ2VEZXRhaWxzXCJcbiAgICAgICAgW3Nob3dBbGVydF09XCJzaG93QWxlcnRcIlxuICAgICAgICBbcm9vbU5hbWVdPVwicm9vbU5hbWUudmFsdWVcIlxuICAgICAgICBbc29ja2V0XT1cInNvY2tldC52YWx1ZVwiXG4gICAgICAgIFtjaGF0U2V0dGluZ109XCJjaGF0U2V0dGluZy52YWx1ZVwiXG4gICAgICA+PC9hcHAtbWVzc2FnZXMtbW9kYWw+XG5cbiAgICAgIDxhcHAtY29uZmlybS1leGl0LW1vZGFsXG4gICAgICAgIFtiYWNrZ3JvdW5kQ29sb3JdPVwiJ3JnYmEoMTgxLCAyMzMsIDIyOSwgMC45NyknXCJcbiAgICAgICAgW2lzQ29uZmlybUV4aXRNb2RhbFZpc2libGVdPVwiaXNDb25maXJtRXhpdE1vZGFsVmlzaWJsZS52YWx1ZVwiXG4gICAgICAgIFtvbkNvbmZpcm1FeGl0Q2xvc2VdPVwib25Db25maXJtRXhpdENsb3NlXCJcbiAgICAgICAgW3Bvc2l0aW9uXT1cIid0b3BSaWdodCdcIlxuICAgICAgICBbbWVtYmVyXT1cIm1lbWJlci52YWx1ZVwiXG4gICAgICAgIFtyb29tTmFtZV09XCJyb29tTmFtZS52YWx1ZVwiXG4gICAgICAgIFtzb2NrZXRdPVwic29ja2V0LnZhbHVlXCJcbiAgICAgICAgW2lzbGV2ZWxdPVwiaXNsZXZlbC52YWx1ZVwiXG4gICAgICA+PC9hcHAtY29uZmlybS1leGl0LW1vZGFsPlxuXG4gICAgICA8YXBwLWNvbmZpcm0taGVyZS1tb2RhbFxuICAgICAgICBbYmFja2dyb3VuZENvbG9yXT1cIidyZ2JhKDE4MSwgMjMzLCAyMjksIDAuOTcpJ1wiXG4gICAgICAgIFtpc0NvbmZpcm1IZXJlTW9kYWxWaXNpYmxlXT1cImlzQ29uZmlybUhlcmVNb2RhbFZpc2libGUudmFsdWVcIlxuICAgICAgICBbb25Db25maXJtSGVyZUNsb3NlXT1cIm9uQ29uZmlybUhlcmVDbG9zZVwiXG4gICAgICAgIFttZW1iZXJdPVwibWVtYmVyLnZhbHVlXCJcbiAgICAgICAgW3Jvb21OYW1lXT1cInJvb21OYW1lLnZhbHVlXCJcbiAgICAgICAgW3NvY2tldF09XCJzb2NrZXQudmFsdWVcIlxuICAgICAgPjwvYXBwLWNvbmZpcm0taGVyZS1tb2RhbD5cblxuICAgICAgPGFwcC1zaGFyZS1ldmVudC1tb2RhbFxuICAgICAgICBbaXNTaGFyZUV2ZW50TW9kYWxWaXNpYmxlXT1cImlzU2hhcmVFdmVudE1vZGFsVmlzaWJsZS52YWx1ZVwiXG4gICAgICAgIFtvblNoYXJlRXZlbnRDbG9zZV09XCJvblNoYXJlRXZlbnRDbG9zZVwiXG4gICAgICAgIFtyb29tTmFtZV09XCJyb29tTmFtZS52YWx1ZVwiXG4gICAgICAgIFtpc2xldmVsXT1cImlzbGV2ZWwudmFsdWVcIlxuICAgICAgICBbYWRtaW5QYXNzY29kZV09XCJhZG1pblBhc3Njb2RlLnZhbHVlXCJcbiAgICAgICAgW2V2ZW50VHlwZV09XCJldmVudFR5cGUudmFsdWVcIlxuICAgICAgPjwvYXBwLXNoYXJlLWV2ZW50LW1vZGFsPlxuXG4gICAgICA8YXBwLWFsZXJ0LWNvbXBvbmVudFxuICAgICAgICBbdmlzaWJsZV09XCJhbGVydFZpc2libGUudmFsdWVcIlxuICAgICAgICBbbWVzc2FnZV09XCJhbGVydE1lc3NhZ2UudmFsdWVcIlxuICAgICAgICBbdHlwZV09XCJhbGVydFR5cGUudmFsdWVcIlxuICAgICAgICBbZHVyYXRpb25dPVwiYWxlcnREdXJhdGlvbi52YWx1ZVwiXG4gICAgICAgIFtvbkhpZGVdPVwib25BbGVydEhpZGVcIlxuICAgICAgICB0ZXh0Q29sb3I9XCIjZmZmZmZmXCJcbiAgICAgID48L2FwcC1hbGVydC1jb21wb25lbnQ+XG5cbiAgICAgIDxhcHAtbG9hZGluZy1tb2RhbFxuICAgICAgICBbaXNWaXNpYmxlXT1cImlzTG9hZGluZ01vZGFsVmlzaWJsZS52YWx1ZVwiXG4gICAgICAgIFtiYWNrZ3JvdW5kQ29sb3JdPVwiJ3JnYmEoMjE3LCAyMjcsIDIzNCwgMC45OSknXCJcbiAgICAgICAgZGlzcGxheUNvbG9yPVwiYmxhY2tcIlxuICAgICAgPjwvYXBwLWxvYWRpbmctbW9kYWw+XG4gICAgPC9kaXY+XG4gIGAsXG4gIHN0eWxlczogW1xuICAgIGBcbiAgICAgIC5NZWRpYVNGVSB7XG4gICAgICAgIC8qIEFkZCBhbnkgY29tcG9uZW50LXNwZWNpZmljIHN0eWxlcyBoZXJlICovXG4gICAgICB9XG4gICAgYCxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbQ29va2llU2VydmljZV0sXG59KVxuZXhwb3J0IGNsYXNzIE1lZGlhc2Z1QnJvYWRjYXN0IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKVxuICBQcmVqb2luUGFnZTogYW55ID0gV2VsY29tZVBhZ2U7XG4gIEBJbnB1dCgpIGNyZWRlbnRpYWxzOiB7IGFwaVVzZXJOYW1lOiBzdHJpbmc7IGFwaUtleTogc3RyaW5nIH0gPSB7IGFwaVVzZXJOYW1lOiAnJywgYXBpS2V5OiAnJyB9O1xuICBASW5wdXQoKSB1c2VMb2NhbFVJTW9kZSA9IGZhbHNlO1xuICBASW5wdXQoKSBzZWVkRGF0YT86IFNlZWREYXRhO1xuICBASW5wdXQoKSB1c2VTZWVkID0gZmFsc2U7XG4gIEBJbnB1dCgpIGltZ1NyYyA9ICdodHRwczovL21lZGlhc2Z1LmNvbS9pbWFnZXMvbG9nbzE5Mi5wbmcnO1xuXG4gIHRpdGxlID0gJ01lZGlhU0ZVLUJyb2FkY2FzdCc7XG5cbiAgcHJpdmF0ZSBtYWluSGVpZ2h0V2lkdGhTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiB8IHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSB2YWxpZGF0ZWRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiB8IHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSBpc2xldmVsU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gfCB1bmRlZmluZWQ7XG4gIHByaXZhdGUgY29Ib3N0U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gfCB1bmRlZmluZWQ7XG4gIHByaXZhdGUgYnV0dG9uU3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcbiAgcHJpdmF0ZSBTY3JlZW5ib2FyZFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uIHwgdW5kZWZpbmVkO1xuICBwcml2YXRlIHJlY29yZGluZ1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uIHwgdW5kZWZpbmVkO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvcixcbiAgICBwdWJsaWMgdXBkYXRlTWluaUNhcmRzR3JpZDogVXBkYXRlTWluaUNhcmRzR3JpZCxcbiAgICBwdWJsaWMgbWl4U3RyZWFtczogTWl4U3RyZWFtcyxcbiAgICBwdWJsaWMgZGlzcFN0cmVhbXM6IERpc3BTdHJlYW1zLFxuICAgIHB1YmxpYyBzdG9wU2hhcmVTY3JlZW46IFN0b3BTaGFyZVNjcmVlbixcbiAgICBwdWJsaWMgY2hlY2tTY3JlZW5TaGFyZTogQ2hlY2tTY3JlZW5TaGFyZSxcbiAgICBwdWJsaWMgc3RhcnRTaGFyZVNjcmVlbjogU3RhcnRTaGFyZVNjcmVlbixcbiAgICBwdWJsaWMgcmVxdWVzdFNjcmVlblNoYXJlOiBSZXF1ZXN0U2NyZWVuU2hhcmUsXG4gICAgcHVibGljIHJlb3JkZXJTdHJlYW1zOiBSZW9yZGVyU3RyZWFtcyxcbiAgICBwdWJsaWMgcHJlcG9wdWxhdGVVc2VyTWVkaWE6IFByZXBvcHVsYXRlVXNlck1lZGlhLFxuICAgIHB1YmxpYyBnZXRWaWRlb3M6IEdldFZpZGVvcyxcbiAgICBwdWJsaWMgcmVQb3J0OiBSZVBvcnQsXG4gICAgcHVibGljIHRyaWdnZXI6IFRyaWdnZXIsXG4gICAgcHVibGljIGNvbnN1bWVyUmVzdW1lOiBDb25zdW1lclJlc3VtZSxcbiAgICBwdWJsaWMgY29ubmVjdFNlbmRUcmFuc3BvcnQ6IENvbm5lY3RTZW5kVHJhbnNwb3J0LFxuICAgIHB1YmxpYyBjb25uZWN0U2VuZFRyYW5zcG9ydEF1ZGlvOiBDb25uZWN0U2VuZFRyYW5zcG9ydEF1ZGlvLFxuICAgIHB1YmxpYyBjb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvOiBDb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvLFxuICAgIHB1YmxpYyBjb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlbjogQ29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW4sXG4gICAgcHVibGljIHByb2Nlc3NDb25zdW1lclRyYW5zcG9ydHM6IFByb2Nlc3NDb25zdW1lclRyYW5zcG9ydHMsXG4gICAgcHVibGljIHJlc3VtZVBhdXNlU3RyZWFtczogUmVzdW1lUGF1c2VTdHJlYW1zLFxuICAgIHB1YmxpYyByZWFkanVzdDogUmVhZGp1c3QsXG4gICAgcHVibGljIGNoZWNrR3JpZDogQ2hlY2tHcmlkLFxuICAgIHB1YmxpYyBnZXRFc3RpbWF0ZTogR2V0RXN0aW1hdGUsXG4gICAgcHVibGljIGNhbGN1bGF0ZVJvd3NBbmRDb2x1bW5zOiBDYWxjdWxhdGVSb3dzQW5kQ29sdW1ucyxcbiAgICBwdWJsaWMgYWRkVmlkZW9zR3JpZDogQWRkVmlkZW9zR3JpZCxcbiAgICBwdWJsaWMgb25TY3JlZW5DaGFuZ2VzOiBPblNjcmVlbkNoYW5nZXMsXG4gICAgcHVibGljIGNoYW5nZVZpZHM6IENoYW5nZVZpZHMsXG4gICAgcHVibGljIGNvbXBhcmVBY3RpdmVOYW1lczogQ29tcGFyZUFjdGl2ZU5hbWVzLFxuICAgIHB1YmxpYyBjb21wYXJlU2NyZWVuU3RhdGVzOiBDb21wYXJlU2NyZWVuU3RhdGVzLFxuICAgIHB1YmxpYyBjcmVhdGVTZW5kVHJhbnNwb3J0OiBDcmVhdGVTZW5kVHJhbnNwb3J0LFxuICAgIHB1YmxpYyByZXN1bWVTZW5kVHJhbnNwb3J0QXVkaW86IFJlc3VtZVNlbmRUcmFuc3BvcnRBdWRpbyxcbiAgICBwdWJsaWMgcmVjZWl2ZUFsbFBpcGVkVHJhbnNwb3J0czogUmVjZWl2ZUFsbFBpcGVkVHJhbnNwb3J0cyxcbiAgICBwdWJsaWMgZGlzY29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlbzogRGlzY29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlbyxcbiAgICBwdWJsaWMgZGlzY29ubmVjdFNlbmRUcmFuc3BvcnRBdWRpbzogRGlzY29ubmVjdFNlbmRUcmFuc3BvcnRBdWRpbyxcbiAgICBwdWJsaWMgZGlzY29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW46IERpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuLFxuICAgIHB1YmxpYyBnZXRQaXBlZFByb2R1Y2Vyc0FsdDogR2V0UGlwZWRQcm9kdWNlcnNBbHQsXG4gICAgcHVibGljIHNpZ25hbE5ld0NvbnN1bWVyVHJhbnNwb3J0OiBTaWduYWxOZXdDb25zdW1lclRyYW5zcG9ydCxcbiAgICBwdWJsaWMgY29ubmVjdFJlY3ZUcmFuc3BvcnQ6IENvbm5lY3RSZWN2VHJhbnNwb3J0LFxuICAgIHB1YmxpYyByZVVwZGF0ZUludGVyOiBSZVVwZGF0ZUludGVyLFxuICAgIHB1YmxpYyB1cGRhdGVQYXJ0aWNpcGFudEF1ZGlvRGVjaWJlbHM6IFVwZGF0ZVBhcnRpY2lwYW50QXVkaW9EZWNpYmVscyxcbiAgICBwdWJsaWMgY2xvc2VBbmRSZXNpemU6IENsb3NlQW5kUmVzaXplLFxuICAgIHB1YmxpYyBhdXRvQWRqdXN0OiBBdXRvQWRqdXN0LFxuICAgIHB1YmxpYyBzd2l0Y2hVc2VyVmlkZW9BbHQ6IFN3aXRjaFVzZXJWaWRlb0FsdCxcbiAgICBwdWJsaWMgc3dpdGNoVXNlclZpZGVvOiBTd2l0Y2hVc2VyVmlkZW8sXG4gICAgcHVibGljIHN3aXRjaFVzZXJBdWRpbzogU3dpdGNoVXNlckF1ZGlvLFxuICAgIHB1YmxpYyBnZXREb21haW5zOiBHZXREb21haW5zLFxuICAgIHB1YmxpYyBmb3JtYXROdW1iZXI6IEZvcm1hdE51bWJlcixcbiAgICBwdWJsaWMgY29ubmVjdElwczogQ29ubmVjdElwcyxcbiAgICBwdWJsaWMgY3JlYXRlRGV2aWNlQ2xpZW50OiBDcmVhdGVEZXZpY2VDbGllbnQsXG4gICAgcHVibGljIGNhcHR1cmVDYW52YXNTdHJlYW06IENhcHR1cmVDYW52YXNTdHJlYW0sXG4gICAgcHVibGljIHJlc3VtZVBhdXNlQXVkaW9TdHJlYW1zOiBSZXN1bWVQYXVzZUF1ZGlvU3RyZWFtcyxcbiAgICBwdWJsaWMgcHJvY2Vzc0NvbnN1bWVyVHJhbnNwb3J0c0F1ZGlvOiBQcm9jZXNzQ29uc3VtZXJUcmFuc3BvcnRzQXVkaW8sXG5cbiAgICBwdWJsaWMgbGF1bmNoUmVjb3JkaW5nOiBMYXVuY2hSZWNvcmRpbmcsXG4gICAgcHVibGljIHN0YXJ0UmVjb3JkaW5nOiBTdGFydFJlY29yZGluZyxcbiAgICBwdWJsaWMgY29uZmlybVJlY29yZGluZzogQ29uZmlybVJlY29yZGluZyxcbiAgICBwdWJsaWMgbGF1bmNoUGFydGljaXBhbnRzOiBMYXVuY2hQYXJ0aWNpcGFudHMsXG4gICAgcHVibGljIGxhdW5jaE1lc3NhZ2VzOiBMYXVuY2hNZXNzYWdlcyxcbiAgICBwdWJsaWMgbGF1bmNoQ29uZmlybUV4aXQ6IExhdW5jaENvbmZpcm1FeGl0LFxuXG4gICAgcHVibGljIHN0YXJ0TWVldGluZ1Byb2dyZXNzVGltZXI6IFN0YXJ0TWVldGluZ1Byb2dyZXNzVGltZXIsXG4gICAgcHVibGljIHVwZGF0ZVJlY29yZGluZzogVXBkYXRlUmVjb3JkaW5nLFxuICAgIHB1YmxpYyBzdG9wUmVjb3JkaW5nOiBTdG9wUmVjb3JkaW5nLFxuXG4gICAgcHVibGljIHBlcnNvbkpvaW5lZDogUGVyc29uSm9pbmVkLFxuXG4gICAgcHVibGljIHJvb21SZWNvcmRQYXJhbXM6IFJvb21SZWNvcmRQYXJhbXMsXG4gICAgcHVibGljIGJhblBhcnRpY2lwYW50OiBCYW5QYXJ0aWNpcGFudCxcblxuICAgIHB1YmxpYyBwcm9kdWNlck1lZGlhUGF1c2VkOiBQcm9kdWNlck1lZGlhUGF1c2VkLFxuICAgIHB1YmxpYyBwcm9kdWNlck1lZGlhUmVzdW1lZDogUHJvZHVjZXJNZWRpYVJlc3VtZWQsXG4gICAgcHVibGljIHByb2R1Y2VyTWVkaWFDbG9zZWQ6IFByb2R1Y2VyTWVkaWFDbG9zZWQsXG5cbiAgICBwdWJsaWMgbWVldGluZ0VuZGVkOiBNZWV0aW5nRW5kZWQsXG4gICAgcHVibGljIGRpc2Nvbm5lY3RVc2VyU2VsZjogRGlzY29ubmVjdFVzZXJTZWxmLFxuICAgIHB1YmxpYyByZWNlaXZlTWVzc2FnZTogUmVjZWl2ZU1lc3NhZ2UsXG4gICAgcHVibGljIG1lZXRpbmdUaW1lUmVtYWluaW5nOiBNZWV0aW5nVGltZVJlbWFpbmluZyxcbiAgICBwdWJsaWMgbWVldGluZ1N0aWxsVGhlcmU6IE1lZXRpbmdTdGlsbFRoZXJlLFxuICAgIHB1YmxpYyBzdGFydFJlY29yZHM6IFN0YXJ0UmVjb3JkcyxcbiAgICBwdWJsaWMgcmVJbml0aWF0ZVJlY29yZGluZzogUmVJbml0aWF0ZVJlY29yZGluZyxcbiAgICBwdWJsaWMgcmVjb3JkaW5nTm90aWNlOiBSZWNvcmRpbmdOb3RpY2UsXG4gICAgcHVibGljIHRpbWVMZWZ0UmVjb3JkaW5nOiBUaW1lTGVmdFJlY29yZGluZyxcbiAgICBwdWJsaWMgc3RvcHBlZFJlY29yZGluZzogU3RvcHBlZFJlY29yZGluZyxcblxuICAgIHB1YmxpYyBhbGxNZW1iZXJzOiBBbGxNZW1iZXJzLFxuICAgIHB1YmxpYyBhbGxNZW1iZXJzUmVzdDogQWxsTWVtYmVyc1Jlc3QsXG4gICAgcHVibGljIGRpc2Nvbm5lY3Q6IERpc2Nvbm5lY3QsXG5cbiAgICBwdWJsaWMgc29ja2V0TWFuYWdlcjogU29ja2V0TWFuYWdlcixcbiAgICBwdWJsaWMgam9pblJvb21DbGllbnQ6IEpvaW5Sb29tQ2xpZW50LFxuICAgIHB1YmxpYyB1cGRhdGVSb29tUGFyYW1ldGVyc0NsaWVudDogVXBkYXRlUm9vbVBhcmFtZXRlcnNDbGllbnQsXG4gICAgcHVibGljIGNsaWNrVmlkZW86IENsaWNrVmlkZW8sXG4gICAgcHVibGljIGNsaWNrQXVkaW86IENsaWNrQXVkaW8sXG4gICAgcHVibGljIGNsaWNrU2NyZWVuU2hhcmU6IENsaWNrU2NyZWVuU2hhcmUsXG4gICAgcHVibGljIHN3aXRjaFZpZGVvQWx0OiBTd2l0Y2hWaWRlb0FsdCxcbiAgICBwdWJsaWMgc3RyZWFtU3VjY2Vzc1ZpZGVvOiBTdHJlYW1TdWNjZXNzVmlkZW8sXG4gICAgcHVibGljIHN0cmVhbVN1Y2Nlc3NBdWRpbzogU3RyZWFtU3VjY2Vzc0F1ZGlvLFxuICAgIHB1YmxpYyBzdHJlYW1TdWNjZXNzU2NyZWVuOiBTdHJlYW1TdWNjZXNzU2NyZWVuLFxuICAgIHB1YmxpYyBzdHJlYW1TdWNjZXNzQXVkaW9Td2l0Y2g6IFN0cmVhbVN1Y2Nlc3NBdWRpb1N3aXRjaCxcbiAgICBwdWJsaWMgY2hlY2tQZXJtaXNzaW9uOiBDaGVja1Blcm1pc3Npb24sXG5cbiAgICBwdWJsaWMgdXBkYXRlQ29uc3VtaW5nRG9tYWluczogVXBkYXRlQ29uc3VtaW5nRG9tYWlucyxcbiAgICBwdWJsaWMgcmVjZWl2ZVJvb21NZXNzYWdlczogUmVjZWl2ZVJvb21NZXNzYWdlcyxcbiAgKSB7fVxuXG4gIGNyZWF0ZUluamVjdG9yKGlucHV0czogYW55KSB7XG4gICAgY29uc3QgaW5qID0gSW5qZWN0b3IuY3JlYXRlKHtcbiAgICAgIHByb3ZpZGVyczogT2JqZWN0LmtleXMoaW5wdXRzKS5tYXAoKGtleSkgPT4gKHsgcHJvdmlkZToga2V5LCB1c2VWYWx1ZTogaW5wdXRzW2tleV0gfSkpLFxuICAgICAgcGFyZW50OiB0aGlzLmluamVjdG9yLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGluajtcbiAgfVxuXG4gIC8vIEluaXRpYWwgdmFsdWVzXG4gIG1lZGlhU0ZVRnVuY3Rpb25zID0gKCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGVNaW5pQ2FyZHNHcmlkOlxuICAgICAgICB0aGlzLnVwZGF0ZU1pbmlDYXJkc0dyaWQ/LnVwZGF0ZU1pbmlDYXJkc0dyaWQgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIG1peFN0cmVhbXM6XG4gICAgICAgIHRoaXMubWl4U3RyZWFtcz8ubWl4U3RyZWFtcyB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgZGlzcFN0cmVhbXM6XG4gICAgICAgIHRoaXMuZGlzcFN0cmVhbXM/LmRpc3BTdHJlYW1zIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBzdG9wU2hhcmVTY3JlZW46XG4gICAgICAgIHRoaXMuc3RvcFNoYXJlU2NyZWVuPy5zdG9wU2hhcmVTY3JlZW4gfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGNoZWNrU2NyZWVuU2hhcmU6XG4gICAgICAgIHRoaXMuY2hlY2tTY3JlZW5TaGFyZT8uY2hlY2tTY3JlZW5TaGFyZSB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgc3RhcnRTaGFyZVNjcmVlbjpcbiAgICAgICAgdGhpcy5zdGFydFNoYXJlU2NyZWVuPy5zdGFydFNoYXJlU2NyZWVuIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICByZXF1ZXN0U2NyZWVuU2hhcmU6XG4gICAgICAgIHRoaXMucmVxdWVzdFNjcmVlblNoYXJlPy5yZXF1ZXN0U2NyZWVuU2hhcmUgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIHJlb3JkZXJTdHJlYW1zOlxuICAgICAgICB0aGlzLnJlb3JkZXJTdHJlYW1zPy5yZW9yZGVyU3RyZWFtcyB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgcHJlcG9wdWxhdGVVc2VyTWVkaWE6XG4gICAgICAgIHRoaXMucHJlcG9wdWxhdGVVc2VyTWVkaWE/LnByZXBvcHVsYXRlVXNlck1lZGlhIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBnZXRWaWRlb3M6XG4gICAgICAgIHRoaXMuZ2V0VmlkZW9zPy5nZXRWaWRlb3MgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIHJlUG9ydDpcbiAgICAgICAgdGhpcy5yZVBvcnQ/LnJlUG9ydCB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgdHJpZ2dlcjpcbiAgICAgICAgdGhpcy50cmlnZ2VyPy50cmlnZ2VyIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBjb25zdW1lclJlc3VtZTpcbiAgICAgICAgdGhpcy5jb25zdW1lclJlc3VtZT8uY29uc3VtZXJSZXN1bWUgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGNvbm5lY3RTZW5kVHJhbnNwb3J0OlxuICAgICAgICB0aGlzLmNvbm5lY3RTZW5kVHJhbnNwb3J0Py5jb25uZWN0U2VuZFRyYW5zcG9ydCB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgY29ubmVjdFNlbmRUcmFuc3BvcnRBdWRpbzpcbiAgICAgICAgdGhpcy5jb25uZWN0U2VuZFRyYW5zcG9ydEF1ZGlvPy5jb25uZWN0U2VuZFRyYW5zcG9ydEF1ZGlvIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBjb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvOlxuICAgICAgICB0aGlzLmNvbm5lY3RTZW5kVHJhbnNwb3J0VmlkZW8/LmNvbm5lY3RTZW5kVHJhbnNwb3J0VmlkZW8gfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGNvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuOlxuICAgICAgICB0aGlzLmNvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuPy5jb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlbiB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgcHJvY2Vzc0NvbnN1bWVyVHJhbnNwb3J0czpcbiAgICAgICAgdGhpcy5wcm9jZXNzQ29uc3VtZXJUcmFuc3BvcnRzPy5wcm9jZXNzQ29uc3VtZXJUcmFuc3BvcnRzIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICByZXN1bWVQYXVzZVN0cmVhbXM6XG4gICAgICAgIHRoaXMucmVzdW1lUGF1c2VTdHJlYW1zPy5yZXN1bWVQYXVzZVN0cmVhbXMgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIHJlYWRqdXN0OlxuICAgICAgICB0aGlzLnJlYWRqdXN0Py5yZWFkanVzdCB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgY2hlY2tHcmlkOlxuICAgICAgICB0aGlzLmNoZWNrR3JpZD8uY2hlY2tHcmlkIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBnZXRFc3RpbWF0ZTpcbiAgICAgICAgdGhpcy5nZXRFc3RpbWF0ZT8uZ2V0RXN0aW1hdGUgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGNhbGN1bGF0ZVJvd3NBbmRDb2x1bW5zOlxuICAgICAgICB0aGlzLmNhbGN1bGF0ZVJvd3NBbmRDb2x1bW5zPy5jYWxjdWxhdGVSb3dzQW5kQ29sdW1ucyB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgYWRkVmlkZW9zR3JpZDpcbiAgICAgICAgdGhpcy5hZGRWaWRlb3NHcmlkPy5hZGRWaWRlb3NHcmlkIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBvblNjcmVlbkNoYW5nZXM6XG4gICAgICAgIHRoaXMub25TY3JlZW5DaGFuZ2VzPy5vblNjcmVlbkNoYW5nZXMgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIHNsZWVwOlxuICAgICAgICBzbGVlcCB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgY2hhbmdlVmlkczpcbiAgICAgICAgdGhpcy5jaGFuZ2VWaWRzPy5jaGFuZ2VWaWRzIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBjb21wYXJlQWN0aXZlTmFtZXM6XG4gICAgICAgIHRoaXMuY29tcGFyZUFjdGl2ZU5hbWVzPy5jb21wYXJlQWN0aXZlTmFtZXMgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGNvbXBhcmVTY3JlZW5TdGF0ZXM6XG4gICAgICAgIHRoaXMuY29tcGFyZVNjcmVlblN0YXRlcz8uY29tcGFyZVNjcmVlblN0YXRlcyB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgY3JlYXRlU2VuZFRyYW5zcG9ydDpcbiAgICAgICAgdGhpcy5jcmVhdGVTZW5kVHJhbnNwb3J0Py5jcmVhdGVTZW5kVHJhbnNwb3J0IHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICByZXN1bWVTZW5kVHJhbnNwb3J0QXVkaW86XG4gICAgICAgIHRoaXMucmVzdW1lU2VuZFRyYW5zcG9ydEF1ZGlvPy5yZXN1bWVTZW5kVHJhbnNwb3J0QXVkaW8gfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIHJlY2VpdmVBbGxQaXBlZFRyYW5zcG9ydHM6XG4gICAgICAgIHRoaXMucmVjZWl2ZUFsbFBpcGVkVHJhbnNwb3J0cz8ucmVjZWl2ZUFsbFBpcGVkVHJhbnNwb3J0cyB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgZGlzY29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlbzpcbiAgICAgICAgdGhpcy5kaXNjb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvPy5kaXNjb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBkaXNjb25uZWN0U2VuZFRyYW5zcG9ydEF1ZGlvOlxuICAgICAgICB0aGlzLmRpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW8/LmRpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW8gfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGRpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuOlxuICAgICAgICB0aGlzLmRpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuPy5kaXNjb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlbiB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgZ2V0UGlwZWRQcm9kdWNlcnNBbHQ6XG4gICAgICAgIHRoaXMuZ2V0UGlwZWRQcm9kdWNlcnNBbHQ/LmdldFBpcGVkUHJvZHVjZXJzQWx0IHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBzaWduYWxOZXdDb25zdW1lclRyYW5zcG9ydDpcbiAgICAgICAgdGhpcy5zaWduYWxOZXdDb25zdW1lclRyYW5zcG9ydD8uc2lnbmFsTmV3Q29uc3VtZXJUcmFuc3BvcnQgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGNvbm5lY3RSZWN2VHJhbnNwb3J0OlxuICAgICAgICB0aGlzLmNvbm5lY3RSZWN2VHJhbnNwb3J0Py5jb25uZWN0UmVjdlRyYW5zcG9ydCB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgcmVVcGRhdGVJbnRlcjpcbiAgICAgICAgdGhpcy5yZVVwZGF0ZUludGVyPy5yZVVwZGF0ZUludGVyIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICB1cGRhdGVQYXJ0aWNpcGFudEF1ZGlvRGVjaWJlbHM6XG4gICAgICAgIHRoaXMudXBkYXRlUGFydGljaXBhbnRBdWRpb0RlY2liZWxzPy51cGRhdGVQYXJ0aWNpcGFudEF1ZGlvRGVjaWJlbHMgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGNsb3NlQW5kUmVzaXplOlxuICAgICAgICB0aGlzLmNsb3NlQW5kUmVzaXplPy5jbG9zZUFuZFJlc2l6ZSB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgYXV0b0FkanVzdDpcbiAgICAgICAgdGhpcy5hdXRvQWRqdXN0Py5hdXRvQWRqdXN0IHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBzd2l0Y2hVc2VyVmlkZW9BbHQ6XG4gICAgICAgIHRoaXMuc3dpdGNoVXNlclZpZGVvQWx0Py5zd2l0Y2hVc2VyVmlkZW9BbHQgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIHN3aXRjaFVzZXJWaWRlbzpcbiAgICAgICAgdGhpcy5zd2l0Y2hVc2VyVmlkZW8/LnN3aXRjaFVzZXJWaWRlbyB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgc3dpdGNoVXNlckF1ZGlvOlxuICAgICAgICB0aGlzLnN3aXRjaFVzZXJBdWRpbz8uc3dpdGNoVXNlckF1ZGlvIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBnZXREb21haW5zOlxuICAgICAgICB0aGlzLmdldERvbWFpbnM/LmdldERvbWFpbnMgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGZvcm1hdE51bWJlcjpcbiAgICAgICAgdGhpcy5mb3JtYXROdW1iZXI/LmZvcm1hdE51bWJlciB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgY29ubmVjdElwczpcbiAgICAgICAgdGhpcy5jb25uZWN0SXBzPy5jb25uZWN0SXBzIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBjcmVhdGVEZXZpY2VDbGllbnQ6XG4gICAgICAgIHRoaXMuY3JlYXRlRGV2aWNlQ2xpZW50Py5jcmVhdGVEZXZpY2VDbGllbnQgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGNhcHR1cmVDYW52YXNTdHJlYW06XG4gICAgICAgIHRoaXMuY2FwdHVyZUNhbnZhc1N0cmVhbT8uY2FwdHVyZUNhbnZhc1N0cmVhbSB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgcmVzdW1lUGF1c2VBdWRpb1N0cmVhbXM6XG4gICAgICAgIHRoaXMucmVzdW1lUGF1c2VBdWRpb1N0cmVhbXM/LnJlc3VtZVBhdXNlQXVkaW9TdHJlYW1zIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBwcm9jZXNzQ29uc3VtZXJUcmFuc3BvcnRzQXVkaW86XG4gICAgICAgIHRoaXMucHJvY2Vzc0NvbnN1bWVyVHJhbnNwb3J0c0F1ZGlvPy5wcm9jZXNzQ29uc3VtZXJUcmFuc3BvcnRzQXVkaW8gfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGNoZWNrUGVybWlzc2lvbjpcbiAgICAgICAgdGhpcy5jaGVja1Blcm1pc3Npb24/LmNoZWNrUGVybWlzc2lvbiB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgc3RyZWFtU3VjY2Vzc1ZpZGVvOlxuICAgICAgICB0aGlzLnN0cmVhbVN1Y2Nlc3NWaWRlbz8uc3RyZWFtU3VjY2Vzc1ZpZGVvIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBzdHJlYW1TdWNjZXNzQXVkaW86XG4gICAgICAgIHRoaXMuc3RyZWFtU3VjY2Vzc0F1ZGlvPy5zdHJlYW1TdWNjZXNzQXVkaW8gfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIHN0cmVhbVN1Y2Nlc3NTY3JlZW46XG4gICAgICAgIHRoaXMuc3RyZWFtU3VjY2Vzc1NjcmVlbj8uc3RyZWFtU3VjY2Vzc1NjcmVlbiB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgc3RyZWFtU3VjY2Vzc0F1ZGlvU3dpdGNoOlxuICAgICAgICB0aGlzLnN0cmVhbVN1Y2Nlc3NBdWRpb1N3aXRjaD8uc3RyZWFtU3VjY2Vzc0F1ZGlvU3dpdGNoIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBjbGlja1ZpZGVvOlxuICAgICAgICB0aGlzLmNsaWNrVmlkZW8/LmNsaWNrVmlkZW8gfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIGNsaWNrQXVkaW86XG4gICAgICAgIHRoaXMuY2xpY2tBdWRpbz8uY2xpY2tBdWRpbyB8fFxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub25lJyk7XG4gICAgICAgIH0pLFxuICAgICAgY2xpY2tTY3JlZW5TaGFyZTpcbiAgICAgICAgdGhpcy5jbGlja1NjcmVlblNoYXJlPy5jbGlja1NjcmVlblNoYXJlIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICBzd2l0Y2hWaWRlb0FsdDpcbiAgICAgICAgdGhpcy5zd2l0Y2hWaWRlb0FsdD8uc3dpdGNoVmlkZW9BbHQgfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICAgIHJlcXVlc3RQZXJtaXNzaW9uQ2FtZXJhOlxuICAgICAgICB0aGlzLnJlcXVlc3RQZXJtaXNzaW9uQ2FtZXJhIHx8XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vbmUnKTtcbiAgICAgICAgfSksXG4gICAgICByZXF1ZXN0UGVybWlzc2lvbkF1ZGlvOlxuICAgICAgICB0aGlzLnJlcXVlc3RQZXJtaXNzaW9uQXVkaW8gfHxcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm9uZScpO1xuICAgICAgICB9KSxcbiAgICB9O1xuICB9O1xuXG4gIHZhbGlkYXRlZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBsb2NhbFVJTW9kZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBzb2NrZXQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFNvY2tldD4oe30gYXMgU29ja2V0KTtcbiAgcm9vbURhdGEgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFJlc3BvbnNlSm9pblJvb20gfCBudWxsPihudWxsKTtcbiAgZGV2aWNlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxEZXZpY2UgfCBudWxsPihudWxsKTtcbiAgYXBpS2V5ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcbiAgYXBpVXNlck5hbWUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICBhcGlUb2tlbiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gIGxpbmsgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuXG4gIHJvb21OYW1lID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcbiAgbWVtYmVyID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcbiAgYWRtaW5QYXNzY29kZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gIGlzbGV2ZWwgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJzEnKTtcbiAgY29Ib3N0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCdObyBjb0hvc3QnKTtcbiAgY29Ib3N0UmVzcG9uc2liaWxpdHkgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PENvSG9zdFJlc3BvbnNpYmlsaXR5W10+KFtcbiAgICB7IG5hbWU6ICdwYXJ0aWNpcGFudHMnLCB2YWx1ZTogZmFsc2UsIGRlZGljYXRlZDogZmFsc2UgfSxcbiAgICB7IG5hbWU6ICdtZWRpYScsIHZhbHVlOiBmYWxzZSwgZGVkaWNhdGVkOiBmYWxzZSB9LFxuICAgIHsgbmFtZTogJ3dhaXRpbmcnLCB2YWx1ZTogZmFsc2UsIGRlZGljYXRlZDogZmFsc2UgfSxcbiAgICB7IG5hbWU6ICdjaGF0JywgdmFsdWU6IGZhbHNlLCBkZWRpY2F0ZWQ6IGZhbHNlIH0sXG4gIF0pO1xuICB5b3VBcmVDb0hvc3QgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgeW91QXJlSG9zdCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBjb25maXJtZWRUb1JlY29yZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBtZWV0aW5nRGlzcGxheVR5cGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJ21lZGlhJyk7XG4gIG1lZXRpbmdWaWRlb09wdGltaXplZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBldmVudFR5cGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEV2ZW50VHlwZT4oJ2Jyb2FkY2FzdCcpO1xuICBwYXJ0aWNpcGFudHMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFBhcnRpY2lwYW50W10+KFtdKTtcbiAgZmlsdGVyZWRQYXJ0aWNpcGFudHMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFBhcnRpY2lwYW50W10+KFtdKTtcbiAgcGFydGljaXBhbnRzQ291bnRlciA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgcGFydGljaXBhbnRzRmlsdGVyID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcblxuICBjb25zdW1lX3NvY2tldHMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PENvbnN1bWVTb2NrZXRbXT4oW10pO1xuICBydHBDYXBhYmlsaXRpZXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFJ0cENhcGFiaWxpdGllcyB8IG51bGw+KG51bGwpO1xuICByb29tUmVjdklQcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nW10+KFtdKTtcbiAgbWVldGluZ1Jvb21QYXJhbXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE1lZXRpbmdSb29tUGFyYW1zIHwgbnVsbD4obnVsbCk7XG4gIGl0ZW1QYWdlTGltaXQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oNCk7XG4gIGF1ZGlvT25seVJvb20gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgYWRkRm9yQmFzaWMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgc2NyZWVuUGFnZUxpbWl0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDQpO1xuICBzaGFyZVNjcmVlblN0YXJ0ZWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgc2hhcmVkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHRhcmdldE9yaWVudGF0aW9uID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCdsYW5kc2NhcGUnKTtcbiAgdGFyZ2V0UmVzb2x1dGlvbiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignc2QnKTtcbiAgdGFyZ2V0UmVzb2x1dGlvbkhvc3QgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJ3NkJyk7XG4gIHZpZENvbnMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFZpZENvbnM+KHsgd2lkdGg6IDY0MCwgaGVpZ2h0OiAzNjAgfSk7XG4gIGZyYW1lUmF0ZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigxMCk7XG4gIGhQYXJhbXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEhQYXJhbXNUeXBlPih7fSBhcyBIUGFyYW1zVHlwZSk7XG4gIHZQYXJhbXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFZQYXJhbXNUeXBlPih7fSBhcyBWUGFyYW1zVHlwZSk7XG4gIHNjcmVlblBhcmFtcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8U2NyZWVuUGFyYW1zVHlwZT4oe30gYXMgU2NyZWVuUGFyYW1zVHlwZSk7XG4gIGFQYXJhbXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEFQYXJhbXNUeXBlPih7fSBhcyBBUGFyYW1zVHlwZSk7XG5cbiAgcmVjb3JkaW5nQXVkaW9QYXVzZXNMaW1pdCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgcmVjb3JkaW5nQXVkaW9QYXVzZXNDb3VudCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgcmVjb3JkaW5nQXVkaW9TdXBwb3J0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHJlY29yZGluZ0F1ZGlvUGVvcGxlTGltaXQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG4gIHJlY29yZGluZ0F1ZGlvUGFydGljaXBhbnRzVGltZUxpbWl0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICByZWNvcmRpbmdWaWRlb1BhdXNlc0NvdW50ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICByZWNvcmRpbmdWaWRlb1BhdXNlc0xpbWl0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICByZWNvcmRpbmdWaWRlb1N1cHBvcnQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgcmVjb3JkaW5nVmlkZW9QZW9wbGVMaW1pdCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgcmVjb3JkaW5nVmlkZW9QYXJ0aWNpcGFudHNUaW1lTGltaXQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG4gIHJlY29yZGluZ0FsbFBhcnRpY2lwYW50c1N1cHBvcnQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgcmVjb3JkaW5nVmlkZW9QYXJ0aWNpcGFudHNTdXBwb3J0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHJlY29yZGluZ0FsbFBhcnRpY2lwYW50c0Z1bGxSb29tU3VwcG9ydCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICByZWNvcmRpbmdWaWRlb1BhcnRpY2lwYW50c0Z1bGxSb29tU3VwcG9ydCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICByZWNvcmRpbmdQcmVmZXJyZWRPcmllbnRhdGlvbiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignbGFuZHNjYXBlJyk7XG4gIHJlY29yZGluZ1N1cHBvcnRGb3JPdGhlck9yaWVudGF0aW9uID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHJlY29yZGluZ011bHRpRm9ybWF0c1N1cHBvcnQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcblxuICB1c2VyUmVjb3JkaW5nUGFyYW1zID0gbmV3IEJlaGF2aW9yU3ViamVjdDxVc2VyUmVjb3JkaW5nUGFyYW1zPih7XG4gICAgbWFpblNwZWNzOiB7XG4gICAgICBtZWRpYU9wdGlvbnM6ICd2aWRlbycsIC8vICdhdWRpbycsICd2aWRlbydcbiAgICAgIGF1ZGlvT3B0aW9uczogJ2FsbCcsIC8vICdhbGwnLCAnb25TY3JlZW4nLCAnaG9zdCdcbiAgICAgIHZpZGVvT3B0aW9uczogJ2FsbCcsIC8vICdhbGwnLCAnbWFpblNjcmVlbidcbiAgICAgIHZpZGVvVHlwZTogJ2Z1bGxEaXNwbGF5JywgLy8gJ2FsbCcsICdiZXN0RGlzcGxheScsICdmdWxsRGlzcGxheSdcbiAgICAgIHZpZGVvT3B0aW1pemVkOiBmYWxzZSwgLy8gdHJ1ZSwgZmFsc2VcbiAgICAgIHJlY29yZGluZ0Rpc3BsYXlUeXBlOiAnbWVkaWEnLCAvLyAnbWVkaWEnLCAndmlkZW8nLCAnYWxsJ1xuICAgICAgYWRkSExTOiBmYWxzZSwgLy8gdHJ1ZSwgZmFsc2VcbiAgICB9LFxuICAgIGRpc3BTcGVjczoge1xuICAgICAgbmFtZVRhZ3M6IHRydWUsIC8vIHRydWUsIGZhbHNlXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjMDAwMDAwJywgLy8gJyMwMDAwMDAnLCAnI2ZmZmZmZidcbiAgICAgIG5hbWVUYWdzQ29sb3I6ICcjZmZmZmZmJywgLy8gJyMwMDAwMDAnLCAnI2ZmZmZmZidcbiAgICAgIG9yaWVudGF0aW9uVmlkZW86ICdwb3J0cmFpdCcsIC8vICdsYW5kc2NhcGUnLCAncG9ydHJhaXQnLCAnYWxsJ1xuICAgIH0sXG4gIH0pO1xuXG4gIGNhblJlY29yZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBzdGFydFJlcG9ydCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBlbmRSZXBvcnQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgcmVjb3JkVGltZXJJbnRlcnZhbCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Tm9kZUpTLlRpbWVvdXQgfCBudWxsPihudWxsKTtcbiAgcmVjb3JkU3RhcnRUaW1lID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICByZWNvcmRFbGFwc2VkVGltZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgaXNUaW1lclJ1bm5pbmcgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgY2FuUGF1c2VSZXN1bWUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgcmVjb3JkQ2hhbmdlU2Vjb25kcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigxNTAwMCk7XG4gIHBhdXNlTGltaXQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG4gIHBhdXNlUmVjb3JkQ291bnQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG4gIGNhbkxhdW5jaFJlY29yZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4odHJ1ZSk7XG4gIHN0b3BMYXVuY2hSZWNvcmQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcblxuICBwYXJ0aWNpcGFudHNBbGwgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFBhcnRpY2lwYW50W10+KFtdKTtcblxuICBmaXJzdEFsbCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICB1cGRhdGVNYWluV2luZG93ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGZpcnN0X3JvdW5kID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGxhbmRTY2FwZWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgbG9ja19zY3JlZW4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgc2NyZWVuSWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICBhbGxWaWRlb1N0cmVhbXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PChQYXJ0aWNpcGFudCB8IFN0cmVhbSlbXT4oW10pO1xuICBuZXdMaW1pdGVkU3RyZWFtcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8KFBhcnRpY2lwYW50IHwgU3RyZWFtKVtdPihbXSk7XG4gIG5ld0xpbWl0ZWRTdHJlYW1zSURzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmdbXT4oW10pO1xuICBhY3RpdmVTb3VuZHMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZ1tdPihbXSk7XG4gIHNjcmVlblNoYXJlSURTdHJlYW0gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICBzY3JlZW5TaGFyZU5hbWVTdHJlYW0gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICBhZG1pbklEU3RyZWFtID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcbiAgYWRtaW5OYW1lU3RyZWFtID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcbiAgeW91WW91U3RyZWFtID0gbmV3IEJlaGF2aW9yU3ViamVjdDwoUGFydGljaXBhbnQgfCBTdHJlYW0pW10+KFtdKTtcbiAgeW91WW91U3RyZWFtSURzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmdbXT4oW10pO1xuICBsb2NhbFN0cmVhbSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8TWVkaWFTdHJlYW0gfCBudWxsPihudWxsKTtcbiAgcmVjb3JkU3RhcnRlZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICByZWNvcmRSZXN1bWVkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHJlY29yZFBhdXNlZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICByZWNvcmRTdG9wcGVkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGFkbWluUmVzdHJpY3RTZXR0aW5nID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHZpZGVvUmVxdWVzdFN0YXRlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmcgfCBudWxsPihudWxsKTtcbiAgdmlkZW9SZXF1ZXN0VGltZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgdmlkZW9BY3Rpb24gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgbG9jYWxTdHJlYW1WaWRlbyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8TWVkaWFTdHJlYW0gfCBudWxsPihudWxsKTtcbiAgdXNlckRlZmF1bHRWaWRlb0lucHV0RGV2aWNlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcbiAgY3VycmVudEZhY2luZ01vZGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJ3VzZXInKTtcbiAgcHJldkZhY2luZ01vZGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJ3VzZXInKTtcbiAgZGVmVmlkZW9JRCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gIGFsbG93ZWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgZGlzcEFjdGl2ZU5hbWVzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmdbXT4oW10pO1xuICBwX2Rpc3BBY3RpdmVOYW1lcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nW10+KFtdKTtcbiAgYWN0aXZlTmFtZXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZ1tdPihbXSk7XG4gIHByZXZBY3RpdmVOYW1lcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nW10+KFtdKTtcbiAgcF9hY3RpdmVOYW1lcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nW10+KFtdKTtcbiAgbWVtYmVyc1JlY2VpdmVkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGRlZmVyU2NyZWVuUmVjZWl2ZWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgaG9zdEZpcnN0U3dpdGNoID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIG1pY0FjdGlvbiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBzY3JlZW5BY3Rpb24gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgY2hhdEFjdGlvbiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBhdWRpb1JlcXVlc3RTdGF0ZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG4gIHNjcmVlblJlcXVlc3RTdGF0ZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG4gIGNoYXRSZXF1ZXN0U3RhdGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZyB8IG51bGw+KG51bGwpO1xuICBhdWRpb1JlcXVlc3RUaW1lID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICBzY3JlZW5SZXF1ZXN0VGltZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgY2hhdFJlcXVlc3RUaW1lID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICB1cGRhdGVSZXF1ZXN0SW50ZXJ2YWxTZWNvbmRzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDI0MCk7XG4gIG9sZFNvdW5kSWRzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmdbXT4oW10pO1xuICBob3N0TGFiZWwgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJ0hvc3QnKTtcbiAgbWFpblNjcmVlbkZpbGxlZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBsb2NhbFN0cmVhbVNjcmVlbiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8TWVkaWFTdHJlYW0gfCBudWxsPihudWxsKTtcbiAgc2NyZWVuQWxyZWFkeU9uID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGNoYXRBbHJlYWR5T24gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgcmVkaXJlY3RVUkwgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICBvbGRBbGxTdHJlYW1zID0gbmV3IEJlaGF2aW9yU3ViamVjdDwoUGFydGljaXBhbnQgfCBTdHJlYW0pW10+KFtdKTtcbiAgYWRtaW5WaWRJRCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gIHN0cmVhbU5hbWVzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxTdHJlYW1bXT4oW10pO1xuICBub25fYWxWaWRlb1N0cmVhbXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFBhcnRpY2lwYW50W10+KFtdKTtcbiAgc29ydEF1ZGlvTG91ZG5lc3MgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgYXVkaW9EZWNpYmVscyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8QXVkaW9EZWNpYmVsc1tdPihbXSk7XG4gIG1peGVkX2FsVmlkZW9TdHJlYW1zID0gbmV3IEJlaGF2aW9yU3ViamVjdDwoUGFydGljaXBhbnQgfCBTdHJlYW0pW10+KFtdKTtcbiAgbm9uX2FsVmlkZW9TdHJlYW1zX211dGVkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxQYXJ0aWNpcGFudFtdPihbXSk7XG4gIHBhZ2luYXRlZFN0cmVhbXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PChQYXJ0aWNpcGFudCB8IFN0cmVhbSlbXVtdPihbXSk7XG4gIGxvY2FsU3RyZWFtQXVkaW8gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE1lZGlhU3RyZWFtIHwgbnVsbD4obnVsbCk7XG4gIGRlZkF1ZGlvSUQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICB1c2VyRGVmYXVsdEF1ZGlvSW5wdXREZXZpY2UgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICB1c2VyRGVmYXVsdEF1ZGlvT3V0cHV0RGV2aWNlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcbiAgcHJldkF1ZGlvSW5wdXREZXZpY2UgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICBwcmV2VmlkZW9JbnB1dERldmljZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gIGF1ZGlvUGF1c2VkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIG1haW5TY3JlZW5QZXJzb24gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICBhZG1pbk9uTWFpblNjcmVlbiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBzY3JlZW5TdGF0ZXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFNjcmVlblN0YXRlW10+KFtcbiAgICB7XG4gICAgICBtYWluU2NyZWVuUGVyc29uOiAnJyxcbiAgICAgIG1haW5TY3JlZW5Qcm9kdWNlcklkOiAnJyxcbiAgICAgIG1haW5TY3JlZW5GaWxsZWQ6IGZhbHNlLFxuICAgICAgYWRtaW5Pbk1haW5TY3JlZW46IGZhbHNlLFxuICAgIH0sXG4gIF0pO1xuICBwcmV2U2NyZWVuU3RhdGVzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxTY3JlZW5TdGF0ZVtdPihbXG4gICAge1xuICAgICAgbWFpblNjcmVlblBlcnNvbjogJycsXG4gICAgICBtYWluU2NyZWVuUHJvZHVjZXJJZDogJycsXG4gICAgICBtYWluU2NyZWVuRmlsbGVkOiBmYWxzZSxcbiAgICAgIGFkbWluT25NYWluU2NyZWVuOiBmYWxzZSxcbiAgICB9LFxuICBdKTtcbiAgdXBkYXRlRGF0ZVN0YXRlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXIgfCBudWxsPihudWxsKTtcbiAgbGFzdFVwZGF0ZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyIHwgbnVsbD4obnVsbCk7XG4gIG5Gb3JSZWFkanVzdFJlY29yZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgZml4ZWRQYWdlTGltaXQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oNCk7XG4gIHJlbW92ZUFsdEdyaWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgbkZvclJlYWRqdXN0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICByZW9yZGVySW50ZXJ2YWwgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMzAwMDApO1xuICBmYXN0UmVvcmRlckludGVydmFsID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDEwMDAwKTtcbiAgbGFzdFJlb3JkZXJUaW1lID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICBhdWRTdHJlYW1OYW1lcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8U3RyZWFtW10+KFtdKTtcbiAgY3VycmVudFVzZXJQYWdlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICBtYWluSGVpZ2h0V2lkdGggPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMTAwKTtcbiAgcHJldk1haW5IZWlnaHRXaWR0aCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPih0aGlzLm1haW5IZWlnaHRXaWR0aC52YWx1ZSk7XG4gIHByZXZEb1BhZ2luYXRlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGRvUGFnaW5hdGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgc2hhcmVFbmRlZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBsU3RyZWFtcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8KFBhcnRpY2lwYW50IHwgU3RyZWFtKVtdPihbXSk7XG4gIGNoYXRSZWZTdHJlYW1zID0gbmV3IEJlaGF2aW9yU3ViamVjdDwoUGFydGljaXBhbnQgfCBTdHJlYW0pW10+KFtdKTtcbiAgY29udHJvbEhlaWdodCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPihcbiAgICB0aGlzLmV2ZW50VHlwZS52YWx1ZSA9PT0gJ3dlYmluYXInIHx8IHRoaXMuZXZlbnRUeXBlLnZhbHVlID09PSAnY29uZmVyZW5jZScgPyAwIDogMC4wNixcbiAgKTtcbiAgaXNXaWRlU2NyZWVuID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGlzTWVkaXVtU2NyZWVuID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGlzU21hbGxTY3JlZW4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgYWRkR3JpZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBhZGRBbHRHcmlkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGdyaWRSb3dzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICBncmlkQ29scyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgYWx0R3JpZFJvd3MgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG4gIGFsdEdyaWRDb2xzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICBudW1iZXJQYWdlcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgY3VycmVudFN0cmVhbXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PChQYXJ0aWNpcGFudCB8IFN0cmVhbSlbXT4oW10pO1xuICBzaG93TWluaVZpZXcgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgblN0cmVhbSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8TWVkaWFTdHJlYW0gfCBudWxsPihudWxsKTtcbiAgZGVmZXJfcmVjZWl2ZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBhbGxBdWRpb1N0cmVhbXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PChQYXJ0aWNpcGFudCB8IFN0cmVhbSlbXT4oW10pO1xuICByZW1vdGVTY3JlZW5TdHJlYW0gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFN0cmVhbVtdPihbXSk7XG4gIHNjcmVlblByb2R1Y2VyID0gbmV3IEJlaGF2aW9yU3ViamVjdDxQcm9kdWNlciB8IG51bGw+KG51bGwpO1xuICBnb3RBbGxWaWRzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHBhZ2luYXRpb25IZWlnaHRXaWR0aCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPig0MCk7XG4gIHBhZ2luYXRpb25EaXJlY3Rpb24gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PCdob3Jpem9udGFsJyB8ICd2ZXJ0aWNhbCc+KCdob3Jpem9udGFsJyk7XG4gIGdyaWRTaXplcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8R3JpZFNpemVzPih7XG4gICAgZ3JpZFdpZHRoOiAwLFxuICAgIGdyaWRIZWlnaHQ6IDAsXG4gICAgYWx0R3JpZFdpZHRoOiAwLFxuICAgIGFsdEdyaWRIZWlnaHQ6IDAsXG4gIH0pO1xuICBzY3JlZW5Gb3JjZUZ1bGxEaXNwbGF5ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIG1haW5HcmlkU3RyZWFtID0gbmV3IEJlaGF2aW9yU3ViamVjdDxDdXN0b21NZWRpYUNvbXBvbmVudFtdPihbXSk7XG4gIG90aGVyR3JpZFN0cmVhbXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEN1c3RvbU1lZGlhQ29tcG9uZW50W11bXT4oW10pO1xuICBhdWRpb09ubHlTdHJlYW1zID0gbmV3IEJlaGF2aW9yU3ViamVjdDxDdXN0b21NZWRpYUNvbXBvbmVudFtdPihbXSk7XG4gIHZpZGVvSW5wdXRzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxNZWRpYURldmljZUluZm9bXT4oW10pO1xuICBhdWRpb0lucHV0cyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8TWVkaWFEZXZpY2VJbmZvW10+KFtdKTtcbiAgbWVldGluZ1Byb2dyZXNzVGltZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignMDA6MDA6MDAnKTtcbiAgbWVldGluZ0VsYXBzZWRUaW1lID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICByZWZfcGFydGljaXBhbnRzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxQYXJ0aWNpcGFudFtdPihbXSk7XG5cbiAgdXBkYXRlVmFsaWRhdGVkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy52YWxpZGF0ZWQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlU29ja2V0ID0gKHZhbHVlOiBTb2NrZXQpID0+IHtcbiAgICB0aGlzLnNvY2tldC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVEZXZpY2UgPSAodmFsdWU6IERldmljZSB8IG51bGwpID0+IHtcbiAgICB0aGlzLmRldmljZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSb29tRGF0YSA9ICh2YWx1ZTogUmVzcG9uc2VKb2luUm9vbSB8IG51bGwpID0+IHtcbiAgICB0aGlzLnJvb21EYXRhLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUFwaUtleSA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5hcGlLZXkubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQXBpVXNlck5hbWUgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMuYXBpVXNlck5hbWUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQXBpVG9rZW4gPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMuYXBpVG9rZW4ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTGluayA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5saW5rLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJvb21OYW1lID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLnJvb21OYW1lLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZU1lbWJlciA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5tZW1iZXIubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQWRtaW5QYXNzY29kZSA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5hZG1pblBhc3Njb2RlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUlzbGV2ZWwgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMuaXNsZXZlbC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVDb0hvc3QgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMuY29Ib3N0Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUNvSG9zdFJlc3BvbnNpYmlsaXR5ID0gKHZhbHVlOiBDb0hvc3RSZXNwb25zaWJpbGl0eVtdKSA9PiB7XG4gICAgdGhpcy5jb0hvc3RSZXNwb25zaWJpbGl0eS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVZb3VBcmVDb0hvc3QgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnlvdUFyZUNvSG9zdC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVZb3VBcmVIb3N0ID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy55b3VBcmVIb3N0Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUNvbmZpcm1lZFRvUmVjb3JkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5jb25maXJtZWRUb1JlY29yZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVNZWV0aW5nRGlzcGxheVR5cGUgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMubWVldGluZ0Rpc3BsYXlUeXBlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZU1lZXRpbmdWaWRlb09wdGltaXplZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMubWVldGluZ1ZpZGVvT3B0aW1pemVkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUV2ZW50VHlwZSA9ICh2YWx1ZTogRXZlbnRUeXBlKSA9PiB7XG4gICAgdGhpcy5ldmVudFR5cGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUGFydGljaXBhbnRzID0gKHZhbHVlOiBQYXJ0aWNpcGFudFtdKSA9PiB7XG4gICAgdGhpcy5wYXJ0aWNpcGFudHMubmV4dCh2YWx1ZSk7XG4gICAgdGhpcy5wYXJ0aWNpcGFudHNDb3VudGVyLm5leHQodmFsdWUubGVuZ3RoKTtcbiAgICB0aGlzLmZpbHRlcmVkUGFydGljaXBhbnRzLm5leHQodGhpcy5wYXJ0aWNpcGFudHMudmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUZpbHRlcmVkUGFydGljaXBhbnRzID0gKHZhbHVlOiBQYXJ0aWNpcGFudFtdKSA9PiB7XG4gICAgdGhpcy5maWx0ZXJlZFBhcnRpY2lwYW50cy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVQYXJ0aWNpcGFudHNDb3VudGVyID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLnBhcnRpY2lwYW50c0NvdW50ZXIubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUGFydGljaXBhbnRzRmlsdGVyID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLnBhcnRpY2lwYW50c0ZpbHRlci5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVDb25zdW1lX3NvY2tldHMgPSAodmFsdWU6IENvbnN1bWVTb2NrZXRbXSkgPT4ge1xuICAgIHRoaXMuY29uc3VtZV9zb2NrZXRzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJ0cENhcGFiaWxpdGllcyA9ICh2YWx1ZTogUnRwQ2FwYWJpbGl0aWVzIHwgbnVsbCkgPT4ge1xuICAgIHRoaXMucnRwQ2FwYWJpbGl0aWVzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJvb21SZWN2SVBzID0gKHZhbHVlOiBzdHJpbmdbXSkgPT4ge1xuICAgIHRoaXMucm9vbVJlY3ZJUHMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTWVldGluZ1Jvb21QYXJhbXMgPSAodmFsdWU6IE1lZXRpbmdSb29tUGFyYW1zIHwgbnVsbCkgPT4ge1xuICAgIHRoaXMubWVldGluZ1Jvb21QYXJhbXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlSXRlbVBhZ2VMaW1pdCA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5pdGVtUGFnZUxpbWl0Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUF1ZGlvT25seVJvb20gPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmF1ZGlvT25seVJvb20ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQWRkRm9yQmFzaWMgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmFkZEZvckJhc2ljLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVNjcmVlblBhZ2VMaW1pdCA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5zY3JlZW5QYWdlTGltaXQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlU2hhcmVTY3JlZW5TdGFydGVkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5zaGFyZVNjcmVlblN0YXJ0ZWQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlU2hhcmVkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5zaGFyZWQubmV4dCh2YWx1ZSk7XG4gICAgdGhpcy5zY3JlZW5TaGFyZUFjdGl2ZS5uZXh0KHZhbHVlKTtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuICAgICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ3Jlc2l6ZScpKTtcbiAgICAgIH0sIDIwMDApO1xuICAgIH1cbiAgfTtcblxuICB1cGRhdGVUYXJnZXRPcmllbnRhdGlvbiA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy50YXJnZXRPcmllbnRhdGlvbi5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVUYXJnZXRSZXNvbHV0aW9uID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLnRhcmdldFJlc29sdXRpb24ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlVGFyZ2V0UmVzb2x1dGlvbkhvc3QgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMudGFyZ2V0UmVzb2x1dGlvbkhvc3QubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlVmlkQ29ucyA9ICh2YWx1ZTogVmlkQ29ucykgPT4ge1xuICAgIHRoaXMudmlkQ29ucy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVGcmFtZVJhdGUgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMuZnJhbWVSYXRlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUhQYXJhbXMgPSAodmFsdWU6IEhQYXJhbXNUeXBlKSA9PiB7XG4gICAgdGhpcy5oUGFyYW1zLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVZQYXJhbXMgPSAodmFsdWU6IFZQYXJhbXNUeXBlKSA9PiB7XG4gICAgdGhpcy52UGFyYW1zLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVNjcmVlblBhcmFtcyA9ICh2YWx1ZTogU2NyZWVuUGFyYW1zVHlwZSkgPT4ge1xuICAgIHRoaXMuc2NyZWVuUGFyYW1zLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUFQYXJhbXMgPSAodmFsdWU6IEFQYXJhbXNUeXBlKSA9PiB7XG4gICAgdGhpcy5hUGFyYW1zLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ0F1ZGlvUGF1c2VzTGltaXQgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMucmVjb3JkaW5nQXVkaW9QYXVzZXNMaW1pdC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRpbmdBdWRpb1BhdXNlc0NvdW50ID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ0F1ZGlvUGF1c2VzQ291bnQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nQXVkaW9TdXBwb3J0ID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdBdWRpb1N1cHBvcnQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nQXVkaW9QZW9wbGVMaW1pdCA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdBdWRpb1Blb3BsZUxpbWl0Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ0F1ZGlvUGFydGljaXBhbnRzVGltZUxpbWl0ID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ0F1ZGlvUGFydGljaXBhbnRzVGltZUxpbWl0Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ1ZpZGVvUGF1c2VzQ291bnQgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMucmVjb3JkaW5nVmlkZW9QYXVzZXNDb3VudC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRpbmdWaWRlb1BhdXNlc0xpbWl0ID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ1ZpZGVvUGF1c2VzTGltaXQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nVmlkZW9TdXBwb3J0ID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdWaWRlb1N1cHBvcnQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nVmlkZW9QZW9wbGVMaW1pdCA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdWaWRlb1Blb3BsZUxpbWl0Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ1ZpZGVvUGFydGljaXBhbnRzVGltZUxpbWl0ID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ1ZpZGVvUGFydGljaXBhbnRzVGltZUxpbWl0Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ0FsbFBhcnRpY2lwYW50c1N1cHBvcnQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ0FsbFBhcnRpY2lwYW50c1N1cHBvcnQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nVmlkZW9QYXJ0aWNpcGFudHNTdXBwb3J0ID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdWaWRlb1BhcnRpY2lwYW50c1N1cHBvcnQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nQWxsUGFydGljaXBhbnRzRnVsbFJvb21TdXBwb3J0ID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdBbGxQYXJ0aWNpcGFudHNGdWxsUm9vbVN1cHBvcnQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nVmlkZW9QYXJ0aWNpcGFudHNGdWxsUm9vbVN1cHBvcnQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ1ZpZGVvUGFydGljaXBhbnRzRnVsbFJvb21TdXBwb3J0Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ1ByZWZlcnJlZE9yaWVudGF0aW9uID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ1ByZWZlcnJlZE9yaWVudGF0aW9uLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ1N1cHBvcnRGb3JPdGhlck9yaWVudGF0aW9uID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdTdXBwb3J0Rm9yT3RoZXJPcmllbnRhdGlvbi5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRpbmdNdWx0aUZvcm1hdHNTdXBwb3J0ID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdNdWx0aUZvcm1hdHNTdXBwb3J0Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVVzZXJSZWNvcmRpbmdQYXJhbXMgPSAodmFsdWU6IFVzZXJSZWNvcmRpbmdQYXJhbXMpID0+IHtcbiAgICB0aGlzLnVzZXJSZWNvcmRpbmdQYXJhbXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQ2FuUmVjb3JkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5jYW5SZWNvcmQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlU3RhcnRSZXBvcnQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnN0YXJ0UmVwb3J0Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUVuZFJlcG9ydCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuZW5kUmVwb3J0Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZFRpbWVySW50ZXJ2YWwgPSAodmFsdWU6IE5vZGVKUy5UaW1lb3V0IHwgbnVsbCkgPT4ge1xuICAgIHRoaXMucmVjb3JkVGltZXJJbnRlcnZhbC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRTdGFydFRpbWUgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMucmVjb3JkU3RhcnRUaW1lLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZEVsYXBzZWRUaW1lID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLnJlY29yZEVsYXBzZWRUaW1lLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUlzVGltZXJSdW5uaW5nID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5pc1RpbWVyUnVubmluZy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVDYW5QYXVzZVJlc3VtZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuY2FuUGF1c2VSZXN1bWUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkQ2hhbmdlU2Vjb25kcyA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRDaGFuZ2VTZWNvbmRzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVBhdXNlTGltaXQgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMucGF1c2VMaW1pdC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVQYXVzZVJlY29yZENvdW50ID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLnBhdXNlUmVjb3JkQ291bnQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQ2FuTGF1bmNoUmVjb3JkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5jYW5MYXVuY2hSZWNvcmQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlU3RvcExhdW5jaFJlY29yZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuc3RvcExhdW5jaFJlY29yZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVQYXJ0aWNpcGFudHNBbGwgPSAodmFsdWU6IFBhcnRpY2lwYW50W10pID0+IHtcbiAgICB0aGlzLnBhcnRpY2lwYW50c0FsbC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVGaXJzdEFsbCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuZmlyc3RBbGwubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlVXBkYXRlTWFpbldpbmRvdyA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMudXBkYXRlTWFpbldpbmRvdy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVGaXJzdF9yb3VuZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuZmlyc3Rfcm91bmQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTGFuZFNjYXBlZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMubGFuZFNjYXBlZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVMb2NrX3NjcmVlbiA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMubG9ja19zY3JlZW4ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlU2NyZWVuSWQgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMuc2NyZWVuSWQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQWxsVmlkZW9TdHJlYW1zID0gKHZhbHVlOiAoUGFydGljaXBhbnQgfCBTdHJlYW0pW10pID0+IHtcbiAgICB0aGlzLmFsbFZpZGVvU3RyZWFtcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVOZXdMaW1pdGVkU3RyZWFtcyA9ICh2YWx1ZTogKFBhcnRpY2lwYW50IHwgU3RyZWFtKVtdKSA9PiB7XG4gICAgdGhpcy5uZXdMaW1pdGVkU3RyZWFtcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVOZXdMaW1pdGVkU3RyZWFtc0lEcyA9ICh2YWx1ZTogc3RyaW5nW10pID0+IHtcbiAgICB0aGlzLm5ld0xpbWl0ZWRTdHJlYW1zSURzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUFjdGl2ZVNvdW5kcyA9ICh2YWx1ZTogc3RyaW5nW10pID0+IHtcbiAgICB0aGlzLmFjdGl2ZVNvdW5kcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVTY3JlZW5TaGFyZUlEU3RyZWFtID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLnNjcmVlblNoYXJlSURTdHJlYW0ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlU2NyZWVuU2hhcmVOYW1lU3RyZWFtID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLnNjcmVlblNoYXJlTmFtZVN0cmVhbS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBZG1pbklEU3RyZWFtID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLmFkbWluSURTdHJlYW0ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQWRtaW5OYW1lU3RyZWFtID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLmFkbWluTmFtZVN0cmVhbS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVZb3VZb3VTdHJlYW0gPSAodmFsdWU6IChQYXJ0aWNpcGFudCB8IFN0cmVhbSlbXSkgPT4ge1xuICAgIHRoaXMueW91WW91U3RyZWFtLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVlvdVlvdVN0cmVhbUlEcyA9ICh2YWx1ZTogc3RyaW5nW10pID0+IHtcbiAgICB0aGlzLnlvdVlvdVN0cmVhbUlEcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVMb2NhbFN0cmVhbSA9ICh2YWx1ZTogTWVkaWFTdHJlYW0gfCBudWxsKSA9PiB7XG4gICAgdGhpcy5sb2NhbFN0cmVhbS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRTdGFydGVkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRTdGFydGVkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZFJlc3VtZWQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnJlY29yZFJlc3VtZWQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkUGF1c2VkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRQYXVzZWQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkU3RvcHBlZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMucmVjb3JkU3RvcHBlZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBZG1pblJlc3RyaWN0U2V0dGluZyA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuYWRtaW5SZXN0cmljdFNldHRpbmcubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlVmlkZW9SZXF1ZXN0U3RhdGUgPSAodmFsdWU6IHN0cmluZyB8IG51bGwpID0+IHtcbiAgICB0aGlzLnZpZGVvUmVxdWVzdFN0YXRlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVZpZGVvUmVxdWVzdFRpbWUgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMudmlkZW9SZXF1ZXN0VGltZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVWaWRlb0FjdGlvbiA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMudmlkZW9BY3Rpb24ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTG9jYWxTdHJlYW1WaWRlbyA9ICh2YWx1ZTogTWVkaWFTdHJlYW0gfCBudWxsKSA9PiB7XG4gICAgdGhpcy5sb2NhbFN0cmVhbVZpZGVvLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVVzZXJEZWZhdWx0VmlkZW9JbnB1dERldmljZSA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy51c2VyRGVmYXVsdFZpZGVvSW5wdXREZXZpY2UubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQ3VycmVudEZhY2luZ01vZGUgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMuY3VycmVudEZhY2luZ01vZGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUHJldkZhY2luZ01vZGUgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMucHJldkZhY2luZ01vZGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlRGVmVmlkZW9JRCA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5kZWZWaWRlb0lELm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUFsbG93ZWQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmFsbG93ZWQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlRGlzcEFjdGl2ZU5hbWVzID0gKHZhbHVlOiBzdHJpbmdbXSkgPT4ge1xuICAgIHRoaXMuZGlzcEFjdGl2ZU5hbWVzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVBfZGlzcEFjdGl2ZU5hbWVzID0gKHZhbHVlOiBzdHJpbmdbXSkgPT4ge1xuICAgIHRoaXMucF9kaXNwQWN0aXZlTmFtZXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQWN0aXZlTmFtZXMgPSAodmFsdWU6IHN0cmluZ1tdKSA9PiB7XG4gICAgdGhpcy5hY3RpdmVOYW1lcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVQcmV2QWN0aXZlTmFtZXMgPSAodmFsdWU6IHN0cmluZ1tdKSA9PiB7XG4gICAgdGhpcy5wcmV2QWN0aXZlTmFtZXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUF9hY3RpdmVOYW1lcyA9ICh2YWx1ZTogc3RyaW5nW10pID0+IHtcbiAgICB0aGlzLnBfYWN0aXZlTmFtZXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTWVtYmVyc1JlY2VpdmVkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5tZW1iZXJzUmVjZWl2ZWQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlRGVmZXJTY3JlZW5SZWNlaXZlZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuZGVmZXJTY3JlZW5SZWNlaXZlZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVIb3N0Rmlyc3RTd2l0Y2ggPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmhvc3RGaXJzdFN3aXRjaC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVNaWNBY3Rpb24gPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLm1pY0FjdGlvbi5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVTY3JlZW5BY3Rpb24gPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnNjcmVlbkFjdGlvbi5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVDaGF0QWN0aW9uID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5jaGF0QWN0aW9uLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUF1ZGlvUmVxdWVzdFN0YXRlID0gKHZhbHVlOiBzdHJpbmcgfCBudWxsKSA9PiB7XG4gICAgdGhpcy5hdWRpb1JlcXVlc3RTdGF0ZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVTY3JlZW5SZXF1ZXN0U3RhdGUgPSAodmFsdWU6IHN0cmluZyB8IG51bGwpID0+IHtcbiAgICB0aGlzLnNjcmVlblJlcXVlc3RTdGF0ZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVDaGF0UmVxdWVzdFN0YXRlID0gKHZhbHVlOiBzdHJpbmcgfCBudWxsKSA9PiB7XG4gICAgdGhpcy5jaGF0UmVxdWVzdFN0YXRlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUF1ZGlvUmVxdWVzdFRpbWUgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMuYXVkaW9SZXF1ZXN0VGltZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVTY3JlZW5SZXF1ZXN0VGltZSA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5zY3JlZW5SZXF1ZXN0VGltZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVDaGF0UmVxdWVzdFRpbWUgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMuY2hhdFJlcXVlc3RUaW1lLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZU9sZFNvdW5kSWRzID0gKHZhbHVlOiBzdHJpbmdbXSkgPT4ge1xuICAgIHRoaXMub2xkU291bmRJZHMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlSG9zdExhYmVsID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLmhvc3RMYWJlbC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVNYWluU2NyZWVuRmlsbGVkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5tYWluU2NyZWVuRmlsbGVkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUxvY2FsU3RyZWFtU2NyZWVuID0gKHZhbHVlOiBNZWRpYVN0cmVhbSB8IG51bGwpID0+IHtcbiAgICB0aGlzLmxvY2FsU3RyZWFtU2NyZWVuLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVNjcmVlbkFscmVhZHlPbiA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuc2NyZWVuQWxyZWFkeU9uLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUNoYXRBbHJlYWR5T24gPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmNoYXRBbHJlYWR5T24ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVkaXJlY3RVUkwgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMucmVkaXJlY3RVUkwubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlT2xkQWxsU3RyZWFtcyA9ICh2YWx1ZTogKFBhcnRpY2lwYW50IHwgU3RyZWFtKVtdKSA9PiB7XG4gICAgdGhpcy5vbGRBbGxTdHJlYW1zLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUFkbWluVmlkSUQgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMuYWRtaW5WaWRJRC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVTdHJlYW1OYW1lcyA9ICh2YWx1ZTogU3RyZWFtW10pID0+IHtcbiAgICB0aGlzLnN0cmVhbU5hbWVzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZU5vbl9hbFZpZGVvU3RyZWFtcyA9ICh2YWx1ZTogUGFydGljaXBhbnRbXSkgPT4ge1xuICAgIHRoaXMubm9uX2FsVmlkZW9TdHJlYW1zLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVNvcnRBdWRpb0xvdWRuZXNzID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5zb3J0QXVkaW9Mb3VkbmVzcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBdWRpb0RlY2liZWxzID0gKHZhbHVlOiBBdWRpb0RlY2liZWxzW10pID0+IHtcbiAgICB0aGlzLmF1ZGlvRGVjaWJlbHMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTWl4ZWRfYWxWaWRlb1N0cmVhbXMgPSAodmFsdWU6IChQYXJ0aWNpcGFudCB8IFN0cmVhbSlbXSkgPT4ge1xuICAgIHRoaXMubWl4ZWRfYWxWaWRlb1N0cmVhbXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTm9uX2FsVmlkZW9TdHJlYW1zX211dGVkID0gKHZhbHVlOiBQYXJ0aWNpcGFudFtdKSA9PiB7XG4gICAgdGhpcy5ub25fYWxWaWRlb1N0cmVhbXNfbXV0ZWQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUGFnaW5hdGVkU3RyZWFtcyA9ICh2YWx1ZTogKFBhcnRpY2lwYW50IHwgU3RyZWFtKVtdW10pID0+IHtcbiAgICB0aGlzLnBhZ2luYXRlZFN0cmVhbXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTG9jYWxTdHJlYW1BdWRpbyA9ICh2YWx1ZTogTWVkaWFTdHJlYW0gfCBudWxsKSA9PiB7XG4gICAgdGhpcy5sb2NhbFN0cmVhbUF1ZGlvLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZURlZkF1ZGlvSUQgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMuZGVmQXVkaW9JRC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVVc2VyRGVmYXVsdEF1ZGlvSW5wdXREZXZpY2UgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMudXNlckRlZmF1bHRBdWRpb0lucHV0RGV2aWNlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVVzZXJEZWZhdWx0QXVkaW9PdXRwdXREZXZpY2UgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMudXNlckRlZmF1bHRBdWRpb091dHB1dERldmljZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVQcmV2QXVkaW9JbnB1dERldmljZSA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5wcmV2QXVkaW9JbnB1dERldmljZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVQcmV2VmlkZW9JbnB1dERldmljZSA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5wcmV2VmlkZW9JbnB1dERldmljZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBdWRpb1BhdXNlZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuYXVkaW9QYXVzZWQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTWFpblNjcmVlblBlcnNvbiA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5tYWluU2NyZWVuUGVyc29uLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUFkbWluT25NYWluU2NyZWVuID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5hZG1pbk9uTWFpblNjcmVlbi5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVTY3JlZW5TdGF0ZXMgPSAodmFsdWU6IFNjcmVlblN0YXRlW10pID0+IHtcbiAgICB0aGlzLnNjcmVlblN0YXRlcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVQcmV2U2NyZWVuU3RhdGVzID0gKHZhbHVlOiBTY3JlZW5TdGF0ZVtdKSA9PiB7XG4gICAgdGhpcy5wcmV2U2NyZWVuU3RhdGVzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVVwZGF0ZURhdGVTdGF0ZSA9ICh2YWx1ZTogbnVtYmVyIHwgbnVsbCkgPT4ge1xuICAgIHRoaXMudXBkYXRlRGF0ZVN0YXRlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUxhc3RVcGRhdGUgPSAodmFsdWU6IG51bWJlciB8IG51bGwpID0+IHtcbiAgICB0aGlzLmxhc3RVcGRhdGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTkZvclJlYWRqdXN0UmVjb3JkID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLm5Gb3JSZWFkanVzdFJlY29yZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVGaXhlZFBhZ2VMaW1pdCA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5maXhlZFBhZ2VMaW1pdC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZW1vdmVBbHRHcmlkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5yZW1vdmVBbHRHcmlkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZU5Gb3JSZWFkanVzdCA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5uRm9yUmVhZGp1c3QubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTGFzdFJlb3JkZXJUaW1lID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLmxhc3RSZW9yZGVyVGltZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBdWRTdHJlYW1OYW1lcyA9ICh2YWx1ZTogU3RyZWFtW10pID0+IHtcbiAgICB0aGlzLmF1ZFN0cmVhbU5hbWVzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUN1cnJlbnRVc2VyUGFnZSA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5jdXJyZW50VXNlclBhZ2UubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTWFpbkhlaWdodFdpZHRoID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLm1haW5IZWlnaHRXaWR0aC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVQcmV2TWFpbkhlaWdodFdpZHRoID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLnByZXZNYWluSGVpZ2h0V2lkdGgubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUHJldkRvUGFnaW5hdGUgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnByZXZEb1BhZ2luYXRlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZURvUGFnaW5hdGUgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmRvUGFnaW5hdGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlU2hhcmVFbmRlZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuc2hhcmVFbmRlZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVMU3RyZWFtcyA9ICh2YWx1ZTogKFBhcnRpY2lwYW50IHwgU3RyZWFtKVtdKSA9PiB7XG4gICAgdGhpcy5sU3RyZWFtcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVDaGF0UmVmU3RyZWFtcyA9ICh2YWx1ZTogKFBhcnRpY2lwYW50IHwgU3RyZWFtKVtdKSA9PiB7XG4gICAgdGhpcy5jaGF0UmVmU3RyZWFtcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVDb250cm9sSGVpZ2h0ID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLmNvbnRyb2xIZWlnaHQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlSXNXaWRlU2NyZWVuID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5pc1dpZGVTY3JlZW4ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlSXNNZWRpdW1TY3JlZW4gPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmlzTWVkaXVtU2NyZWVuLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUlzU21hbGxTY3JlZW4gPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmlzU21hbGxTY3JlZW4ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQWRkR3JpZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuYWRkR3JpZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBZGRBbHRHcmlkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5hZGRBbHRHcmlkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUdyaWRSb3dzID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLmdyaWRSb3dzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUdyaWRDb2xzID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLmdyaWRDb2xzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUFsdEdyaWRSb3dzID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLmFsdEdyaWRSb3dzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUFsdEdyaWRDb2xzID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLmFsdEdyaWRDb2xzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZU51bWJlclBhZ2VzID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLm51bWJlclBhZ2VzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUN1cnJlbnRTdHJlYW1zID0gKHZhbHVlOiAoUGFydGljaXBhbnQgfCBTdHJlYW0pW10pID0+IHtcbiAgICB0aGlzLmN1cnJlbnRTdHJlYW1zLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVNob3dNaW5pVmlldyA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuc2hvd01pbmlWaWV3Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZU5TdHJlYW0gPSAodmFsdWU6IE1lZGlhU3RyZWFtIHwgbnVsbCkgPT4ge1xuICAgIHRoaXMublN0cmVhbS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVEZWZlcl9yZWNlaXZlID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5kZWZlcl9yZWNlaXZlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUFsbEF1ZGlvU3RyZWFtcyA9ICh2YWx1ZTogKFBhcnRpY2lwYW50IHwgU3RyZWFtKVtdKSA9PiB7XG4gICAgdGhpcy5hbGxBdWRpb1N0cmVhbXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVtb3RlU2NyZWVuU3RyZWFtID0gKHZhbHVlOiBTdHJlYW1bXSkgPT4ge1xuICAgIHRoaXMucmVtb3RlU2NyZWVuU3RyZWFtLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVNjcmVlblByb2R1Y2VyID0gKHZhbHVlOiBQcm9kdWNlciB8IG51bGwpID0+IHtcbiAgICB0aGlzLnNjcmVlblByb2R1Y2VyLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUdvdEFsbFZpZHMgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmdvdEFsbFZpZHMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUGFnaW5hdGlvbkhlaWdodFdpZHRoID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLnBhZ2luYXRpb25IZWlnaHRXaWR0aC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVQYWdpbmF0aW9uRGlyZWN0aW9uID0gKHZhbHVlOiAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnKSA9PiB7XG4gICAgdGhpcy5wYWdpbmF0aW9uRGlyZWN0aW9uLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUdyaWRTaXplcyA9ICh2YWx1ZTogR3JpZFNpemVzKSA9PiB7XG4gICAgdGhpcy5ncmlkU2l6ZXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlU2NyZWVuRm9yY2VGdWxsRGlzcGxheSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuc2NyZWVuRm9yY2VGdWxsRGlzcGxheS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVNYWluR3JpZFN0cmVhbSA9ICh2YWx1ZTogQ3VzdG9tTWVkaWFDb21wb25lbnRbXSkgPT4ge1xuICAgIHRoaXMubWFpbkdyaWRTdHJlYW0ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlT3RoZXJHcmlkU3RyZWFtcyA9ICh2YWx1ZTogQ3VzdG9tTWVkaWFDb21wb25lbnRbXVtdKSA9PiB7XG4gICAgdGhpcy5vdGhlckdyaWRTdHJlYW1zLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUF1ZGlvT25seVN0cmVhbXMgPSAodmFsdWU6IEN1c3RvbU1lZGlhQ29tcG9uZW50W10pID0+IHtcbiAgICB0aGlzLmF1ZGlvT25seVN0cmVhbXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlVmlkZW9JbnB1dHMgPSAodmFsdWU6IE1lZGlhRGV2aWNlSW5mb1tdKSA9PiB7XG4gICAgdGhpcy52aWRlb0lucHV0cy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBdWRpb0lucHV0cyA9ICh2YWx1ZTogTWVkaWFEZXZpY2VJbmZvW10pID0+IHtcbiAgICB0aGlzLmF1ZGlvSW5wdXRzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZU1lZXRpbmdQcm9ncmVzc1RpbWUgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMubWVldGluZ1Byb2dyZXNzVGltZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVNZWV0aW5nRWxhcHNlZFRpbWUgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMubWVldGluZ0VsYXBzZWRUaW1lLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlZl9wYXJ0aWNpcGFudHMgPSAodmFsdWU6IFBhcnRpY2lwYW50W10pID0+IHtcbiAgICB0aGlzLnJlZl9wYXJ0aWNpcGFudHMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgLy8gTWVzc2FnZXNcbiAgbWVzc2FnZXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE1lc3NhZ2VbXT4oW10pO1xuICBzdGFydERpcmVjdE1lc3NhZ2UgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgZGlyZWN0TWVzc2FnZURldGFpbHMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFBhcnRpY2lwYW50IHwgbnVsbD4obnVsbCk7XG4gIHNob3dNZXNzYWdlc0JhZGdlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG5cbiAgLy8gRXZlbnQgU2V0dGluZ3NcbiAgYXVkaW9TZXR0aW5nID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCdhbGxvdycpO1xuICB2aWRlb1NldHRpbmcgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJ2FsbG93Jyk7XG4gIHNjcmVlbnNoYXJlU2V0dGluZyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignYWxsb3cnKTtcbiAgY2hhdFNldHRpbmcgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJ2FsbG93Jyk7XG5cbiAgLy8gRGlzcGxheSBTZXR0aW5nc1xuICBkaXNwbGF5T3B0aW9uID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCdtZWRpYScpO1xuICBhdXRvV2F2ZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4odHJ1ZSk7XG4gIGZvcmNlRnVsbERpc3BsYXkgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KHRydWUpO1xuICBwcmV2Rm9yY2VGdWxsRGlzcGxheSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBwcmV2TWVldGluZ0Rpc3BsYXlUeXBlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCd2aWRlbycpO1xuXG4gIC8vIFdhaXRpbmcgUm9vbVxuICB3YWl0aW5nUm9vbUZpbHRlciA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gIHdhaXRpbmdSb29tTGlzdCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8V2FpdGluZ1Jvb21QYXJ0aWNpcGFudFtdPihbXSk7XG4gIHdhaXRpbmdSb29tQ291bnRlciA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgZmlsdGVyZWRXYWl0aW5nUm9vbUxpc3QgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFdhaXRpbmdSb29tUGFydGljaXBhbnRbXT4oW10pO1xuXG4gIC8vIFJlcXVlc3RzXG4gIHJlcXVlc3RGaWx0ZXIgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICByZXF1ZXN0TGlzdCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UmVxdWVzdFtdPihbXSk7XG4gIHJlcXVlc3RDb3VudGVyID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICBmaWx0ZXJlZFJlcXVlc3RMaXN0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxSZXF1ZXN0W10+KFtdKTtcblxuICAvLyBUb3RhbCBSZXF1ZXN0cyBhbmQgV2FpdGluZyBSb29tXG4gIHRvdGFsUmVxV2FpdCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcblxuICAvLyBBbGVydHNcbiAgYWxlcnRWaXNpYmxlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGFsZXJ0TWVzc2FnZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gIGFsZXJ0VHlwZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8J3N1Y2Nlc3MnIHwgJ2Rhbmdlcic+KCdzdWNjZXNzJyk7XG4gIGFsZXJ0RHVyYXRpb24gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMzAwMCk7XG5cbiAgLy8gUHJvZ3Jlc3MgVGltZXJcbiAgcHJvZ3Jlc3NUaW1lclZpc2libGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KHRydWUpO1xuICBwcm9ncmVzc1RpbWVyVmFsdWUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG5cbiAgLy8gTWVudSBNb2RhbHNcbiAgaXNNZW51TW9kYWxWaXNpYmxlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGlzUmVjb3JkaW5nTW9kYWxWaXNpYmxlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGlzU2V0dGluZ3NNb2RhbFZpc2libGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgaXNSZXF1ZXN0c01vZGFsVmlzaWJsZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBpc1dhaXRpbmdNb2RhbFZpc2libGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgaXNDb0hvc3RNb2RhbFZpc2libGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgaXNNZWRpYVNldHRpbmdzTW9kYWxWaXNpYmxlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGlzRGlzcGxheVNldHRpbmdzTW9kYWxWaXNpYmxlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG5cbiAgLy8gT3RoZXIgTW9kYWxzXG4gIGlzUGFydGljaXBhbnRzTW9kYWxWaXNpYmxlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGlzTWVzc2FnZXNNb2RhbFZpc2libGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgaXNDb25maXJtRXhpdE1vZGFsVmlzaWJsZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBpc0NvbmZpcm1IZXJlTW9kYWxWaXNpYmxlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGlzU2hhcmVFdmVudE1vZGFsVmlzaWJsZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBpc0xvYWRpbmdNb2RhbFZpc2libGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcblxuICAvLyBSZWNvcmRpbmcgT3B0aW9uc1xuICByZWNvcmRpbmdNZWRpYU9wdGlvbnMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJ3ZpZGVvJyk7XG4gIHJlY29yZGluZ0F1ZGlvT3B0aW9ucyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignYWxsJyk7XG4gIHJlY29yZGluZ1ZpZGVvT3B0aW9ucyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignYWxsJyk7XG4gIHJlY29yZGluZ1ZpZGVvVHlwZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignZnVsbERpc3BsYXknKTtcbiAgcmVjb3JkaW5nVmlkZW9PcHRpbWl6ZWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgcmVjb3JkaW5nRGlzcGxheVR5cGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PCd2aWRlbycgfCAnbWVkaWEnIHwgJ2FsbCc+KCd2aWRlbycpO1xuICByZWNvcmRpbmdBZGRITFMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KHRydWUpO1xuICByZWNvcmRpbmdOYW1lVGFncyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4odHJ1ZSk7XG4gIHJlY29yZGluZ0JhY2tncm91bmRDb2xvciA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignIzgzYzBlOScpO1xuICByZWNvcmRpbmdOYW1lVGFnc0NvbG9yID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcjZmZmZmZmJyk7XG4gIHJlY29yZGluZ0FkZFRleHQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgcmVjb3JkaW5nQ3VzdG9tVGV4dCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignQWRkIFRleHQnKTtcbiAgcmVjb3JkaW5nQ3VzdG9tVGV4dFBvc2l0aW9uID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCd0b3AnKTtcbiAgcmVjb3JkaW5nQ3VzdG9tVGV4dENvbG9yID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcjZmZmZmZmJyk7XG4gIHJlY29yZGluZ09yaWVudGF0aW9uVmlkZW8gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJ2xhbmRzY2FwZScpO1xuICBjbGVhcmVkVG9SZXN1bWUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KHRydWUpO1xuICBjbGVhcmVkVG9SZWNvcmQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KHRydWUpO1xuICByZWNvcmRTdGF0ZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignZ3JlZW4nKTtcbiAgc2hvd1JlY29yZEJ1dHRvbnMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgcmVjb3JkaW5nUHJvZ3Jlc3NUaW1lID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcwMDowMDowMCcpO1xuICBhdWRpb1N3aXRjaGluZyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICB2aWRlb1N3aXRjaGluZyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIC8vIE1lZGlhIFN0YXRlc1xuICB2aWRlb0FscmVhZHlPbiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBhdWRpb0FscmVhZHlPbiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIGNvbXBvbmVudFNpemVzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxDb21wb25lbnRTaXplcz4oe1xuICAgIG1haW5IZWlnaHQ6IDAsXG4gICAgb3RoZXJIZWlnaHQ6IDAsXG4gICAgbWFpbldpZHRoOiAwLFxuICAgIG90aGVyV2lkdGg6IDAsXG4gIH0pO1xuXG4gIC8vIFBlcm1pc3Npb25zXG4gIGhhc0NhbWVyYVBlcm1pc3Npb24gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgaGFzQXVkaW9QZXJtaXNzaW9uID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG5cbiAgLy8gVHJhbnNwb3J0c1xuICB0cmFuc3BvcnRDcmVhdGVkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHRyYW5zcG9ydENyZWF0ZWRWaWRlbyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICB0cmFuc3BvcnRDcmVhdGVkQXVkaW8gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgdHJhbnNwb3J0Q3JlYXRlZFNjcmVlbiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBwcm9kdWNlclRyYW5zcG9ydCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8VHJhbnNwb3J0IHwgbnVsbD4obnVsbCk7XG4gIHZpZGVvUHJvZHVjZXIgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFByb2R1Y2VyIHwgbnVsbD4obnVsbCk7XG4gIHBhcmFtcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UHJvZHVjZXJPcHRpb25zPih7fSBhcyBQcm9kdWNlck9wdGlvbnMpO1xuICB2aWRlb1BhcmFtcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UHJvZHVjZXJPcHRpb25zPih7fSBhcyBQcm9kdWNlck9wdGlvbnMpO1xuICBhdWRpb1BhcmFtcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UHJvZHVjZXJPcHRpb25zPih7fSBhcyBQcm9kdWNlck9wdGlvbnMpO1xuICBhdWRpb1Byb2R1Y2VyID0gbmV3IEJlaGF2aW9yU3ViamVjdDxQcm9kdWNlciB8IG51bGw+KG51bGwpO1xuICBjb25zdW1lclRyYW5zcG9ydHMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFRyYW5zcG9ydFR5cGVbXT4oW10pO1xuICBjb25zdW1pbmdUcmFuc3BvcnRzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmdbXT4oW10pO1xuXG4gIC8vIFBvbGxzXG4gIHBvbGxzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxQb2xsW10+KFtdKTtcbiAgcG9sbCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UG9sbCB8IG51bGw+KG51bGwpO1xuICBpc1BvbGxNb2RhbFZpc2libGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcblxuICAvLyBCYWNrZ3JvdW5kXG4gIGN1c3RvbUltYWdlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcbiAgc2VsZWN0ZWRJbWFnZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gIHNlZ21lbnRWaWRlbyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8TWVkaWFTdHJlYW0gfCBudWxsPihudWxsKTtcbiAgc2VsZmllU2VnbWVudGF0aW9uID0gbmV3IEJlaGF2aW9yU3ViamVjdDxTZWxmaWVTZWdtZW50YXRpb24gfCBudWxsPihudWxsKTtcbiAgcGF1c2VTZWdtZW50YXRpb24gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgcHJvY2Vzc2VkU3RyZWFtID0gbmV3IEJlaGF2aW9yU3ViamVjdDxNZWRpYVN0cmVhbSB8IG51bGw+KG51bGwpO1xuICBrZWVwQmFja2dyb3VuZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBiYWNrZ3JvdW5kSGFzQ2hhbmdlZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICB2aXJ0dWFsU3RyZWFtID0gbmV3IEJlaGF2aW9yU3ViamVjdDxNZWRpYVN0cmVhbSB8IG51bGw+KG51bGwpO1xuICBtYWluQ2FudmFzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxIVE1MQ2FudmFzRWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBwcmV2S2VlcEJhY2tncm91bmQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgYXBwbGllZEJhY2tncm91bmQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgaXNCYWNrZ3JvdW5kTW9kYWxWaXNpYmxlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGF1dG9DbGlja0JhY2tncm91bmQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcblxuICAvLyBCcmVha291dCBSb29tc1xuICBicmVha291dFJvb21zID0gbmV3IEJlaGF2aW9yU3ViamVjdDxCcmVha291dFBhcnRpY2lwYW50W11bXT4oW10pO1xuICBjdXJyZW50Um9vbUluZGV4ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICBjYW5TdGFydEJyZWFrb3V0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGJyZWFrT3V0Um9vbVN0YXJ0ZWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgYnJlYWtPdXRSb29tRW5kZWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgaG9zdE5ld1Jvb20gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oLTEpO1xuICBsaW1pdGVkQnJlYWtSb29tID0gbmV3IEJlaGF2aW9yU3ViamVjdDxCcmVha291dFBhcnRpY2lwYW50W10+KFtdKTtcbiAgbWFpblJvb21zTGVuZ3RoID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICBtZW1iZXJSb29tID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KC0xKTtcbiAgaXNCcmVha291dFJvb21zTW9kYWxWaXNpYmxlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG5cbiAgLy8gV2hpdGVib2FyZFxuICB3aGl0ZWJvYXJkVXNlcnMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFdoaXRlYm9hcmRVc2VyW10+KFtdKTtcbiAgY3VycmVudFdoaXRlYm9hcmRJbmRleCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgY2FuU3RhcnRXaGl0ZWJvYXJkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHdoaXRlYm9hcmRTdGFydGVkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHdoaXRlYm9hcmRFbmRlZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICB3aGl0ZWJvYXJkTGltaXQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oNCk7XG4gIGlzV2hpdGVib2FyZE1vZGFsVmlzaWJsZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBpc0NvbmZpZ3VyZVdoaXRlYm9hcmRNb2RhbFZpc2libGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgc2hhcGVzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxTaGFwZVtdPihbXSk7XG4gIHVzZUltYWdlQmFja2dyb3VuZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4odHJ1ZSk7XG4gIHJlZG9TdGFjayA9IG5ldyBCZWhhdmlvclN1YmplY3Q8U2hhcGVbXT4oW10pO1xuICB1bmRvU3RhY2sgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZ1tdPihbXSk7XG4gIGNhbnZhc1N0cmVhbSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8TWVkaWFTdHJlYW0gfCBudWxsPihudWxsKTtcbiAgY2FudmFzV2hpdGVib2FyZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8SFRNTENhbnZhc0VsZW1lbnQgfCBudWxsPihudWxsKTtcblxuICAvLyBTY3JlZW5ib2FyZFxuICBjYW52YXNTY3JlZW5ib2FyZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8SFRNTENhbnZhc0VsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgcHJvY2Vzc2VkU2NyZWVuU3RyZWFtID0gbmV3IEJlaGF2aW9yU3ViamVjdDxNZWRpYVN0cmVhbSB8IG51bGw+KG51bGwpO1xuICBhbm5vdGF0ZVNjcmVlblN0cmVhbSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBtYWluU2NyZWVuQ2FudmFzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxIVE1MQ2FudmFzRWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBpc1NjcmVlbmJvYXJkTW9kYWxWaXNpYmxlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG5cbiAgLy9zdGF0ZSB2YXJpYWJsZXMgZm9yIHRoZSBjb250cm9sIGJ1dHRvbnNcbiAgbWljQWN0aXZlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihcbiAgICB0aGlzLmF1ZGlvQWxyZWFkeU9uLnZhbHVlID8gdGhpcy5hdWRpb0FscmVhZHlPbi52YWx1ZSA6IGZhbHNlLFxuICApO1xuICB2aWRlb0FjdGl2ZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oXG4gICAgdGhpcy52aWRlb0FscmVhZHlPbi52YWx1ZSA/IHRoaXMudmlkZW9BbHJlYWR5T24udmFsdWUgOiBmYWxzZSxcbiAgKTtcbiAgc2NyZWVuU2hhcmVBY3RpdmUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgZW5kQ2FsbEFjdGl2ZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBwYXJ0aWNpcGFudHNBY3RpdmUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgbWVudUFjdGl2ZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBjb21tZW50c0FjdGl2ZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIC8vIFVwZGF0ZSBmdW5jdGlvbnNcbiAgdXBkYXRlTWVzc2FnZXMgPSAodmFsdWU6IE1lc3NhZ2VbXSkgPT4ge1xuICAgIHRoaXMubWVzc2FnZXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlU3RhcnREaXJlY3RNZXNzYWdlID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5zdGFydERpcmVjdE1lc3NhZ2UubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlRGlyZWN0TWVzc2FnZURldGFpbHMgPSAodmFsdWU6IFBhcnRpY2lwYW50IHwgbnVsbCkgPT4ge1xuICAgIHRoaXMuZGlyZWN0TWVzc2FnZURldGFpbHMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlU2hvd01lc3NhZ2VzQmFkZ2UgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnNob3dNZXNzYWdlc0JhZGdlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUF1ZGlvU2V0dGluZyA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5hdWRpb1NldHRpbmcubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlVmlkZW9TZXR0aW5nID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLnZpZGVvU2V0dGluZy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVTY3JlZW5zaGFyZVNldHRpbmcgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMuc2NyZWVuc2hhcmVTZXR0aW5nLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUNoYXRTZXR0aW5nID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLmNoYXRTZXR0aW5nLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZURpc3BsYXlPcHRpb24gPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMuZGlzcGxheU9wdGlvbi5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBdXRvV2F2ZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuYXV0b1dhdmUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlRm9yY2VGdWxsRGlzcGxheSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuZm9yY2VGdWxsRGlzcGxheS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVQcmV2Rm9yY2VGdWxsRGlzcGxheSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMucHJldkZvcmNlRnVsbERpc3BsYXkubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUHJldk1lZXRpbmdEaXNwbGF5VHlwZSA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5wcmV2TWVldGluZ0Rpc3BsYXlUeXBlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVdhaXRpbmdSb29tQ291bnRlciA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy53YWl0aW5nUm9vbUNvdW50ZXIubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlV2FpdGluZ1Jvb21GaWx0ZXIgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMud2FpdGluZ1Jvb21GaWx0ZXIubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlV2FpdGluZ1Jvb21MaXN0ID0gKHZhbHVlOiBXYWl0aW5nUm9vbVBhcnRpY2lwYW50W10pID0+IHtcbiAgICB0aGlzLndhaXRpbmdSb29tTGlzdC5uZXh0KHZhbHVlKTtcbiAgICB0aGlzLmZpbHRlcmVkV2FpdGluZ1Jvb21MaXN0Lm5leHQodmFsdWUpO1xuICAgIHRoaXMud2FpdGluZ1Jvb21Db3VudGVyLm5leHQodmFsdWUubGVuZ3RoKTtcbiAgfTtcblxuICBvbldhaXRpbmdSb29tQ2xvc2UgPSAoKSA9PiB7XG4gICAgdGhpcy51cGRhdGVJc1dhaXRpbmdNb2RhbFZpc2libGUoZmFsc2UpO1xuICB9O1xuXG4gIHVwZGF0ZVJlcXVlc3RDb3VudGVyID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLnJlcXVlc3RDb3VudGVyLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlcXVlc3RGaWx0ZXIgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMucmVxdWVzdEZpbHRlci5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZXF1ZXN0TGlzdCA9ICh2YWx1ZTogUmVxdWVzdFtdKSA9PiB7XG4gICAgdGhpcy5yZXF1ZXN0TGlzdC5uZXh0KHZhbHVlKTtcbiAgICB0aGlzLmZpbHRlcmVkUmVxdWVzdExpc3QubmV4dCh2YWx1ZSk7XG4gICAgdGhpcy5yZXF1ZXN0Q291bnRlci5uZXh0KHZhbHVlLmxlbmd0aCk7XG4gIH07XG5cbiAgb25SZXF1ZXN0Q2xvc2UgPSAoKSA9PiB7XG4gICAgdGhpcy51cGRhdGVJc1JlcXVlc3RzTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgfTtcblxuICB1cGRhdGVUb3RhbFJlcVdhaXQgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMudG90YWxSZXFXYWl0Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUFsZXJ0VmlzaWJsZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuYWxlcnRWaXNpYmxlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUFsZXJ0TWVzc2FnZSA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5hbGVydE1lc3NhZ2UubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQWxlcnRUeXBlID0gKHZhbHVlOiAnc3VjY2VzcycgfCAnZGFuZ2VyJykgPT4ge1xuICAgIHRoaXMuYWxlcnRUeXBlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUFsZXJ0RHVyYXRpb24gPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMuYWxlcnREdXJhdGlvbi5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVQcm9ncmVzc1RpbWVyVmlzaWJsZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMucHJvZ3Jlc3NUaW1lclZpc2libGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUHJvZ3Jlc3NUaW1lclZhbHVlID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLnByb2dyZXNzVGltZXJWYWx1ZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVJc01lbnVNb2RhbFZpc2libGUgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmlzTWVudU1vZGFsVmlzaWJsZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVJc1JlY29yZGluZ01vZGFsVmlzaWJsZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuaXNSZWNvcmRpbmdNb2RhbFZpc2libGUubmV4dCh2YWx1ZSk7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLnVwZGF0ZUNvbmZpcm1lZFRvUmVjb3JkKGZhbHNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKFxuICAgICAgICB0aGlzLmNsZWFyZWRUb1JlY29yZC5nZXRWYWx1ZSgpICYmXG4gICAgICAgIHRoaXMuY2xlYXJlZFRvUmVzdW1lLmdldFZhbHVlKCkgJiZcbiAgICAgICAgdGhpcy5yZWNvcmRTdGFydGVkLmdldFZhbHVlKClcbiAgICAgICkge1xuICAgICAgICB0aGlzLnVwZGF0ZVNob3dSZWNvcmRCdXR0b25zKHRydWUpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICB1cGRhdGVJc1NldHRpbmdzTW9kYWxWaXNpYmxlID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5pc1NldHRpbmdzTW9kYWxWaXNpYmxlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUlzUmVxdWVzdHNNb2RhbFZpc2libGUgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmlzUmVxdWVzdHNNb2RhbFZpc2libGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlSXNXYWl0aW5nTW9kYWxWaXNpYmxlID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5pc1dhaXRpbmdNb2RhbFZpc2libGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlSXNDb0hvc3RNb2RhbFZpc2libGUgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmlzQ29Ib3N0TW9kYWxWaXNpYmxlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUlzTWVkaWFTZXR0aW5nc01vZGFsVmlzaWJsZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuaXNNZWRpYVNldHRpbmdzTW9kYWxWaXNpYmxlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUlzRGlzcGxheVNldHRpbmdzTW9kYWxWaXNpYmxlID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5pc0Rpc3BsYXlTZXR0aW5nc01vZGFsVmlzaWJsZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVJc1BhcnRpY2lwYW50c01vZGFsVmlzaWJsZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuaXNQYXJ0aWNpcGFudHNNb2RhbFZpc2libGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlSXNNZXNzYWdlc01vZGFsVmlzaWJsZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuaXNNZXNzYWdlc01vZGFsVmlzaWJsZS5uZXh0KHZhbHVlKTtcbiAgICBpZiAoIXZhbHVlKSB7XG4gICAgICB0aGlzLnVwZGF0ZVNob3dNZXNzYWdlc0JhZGdlKGZhbHNlKTtcbiAgICB9XG4gIH07XG5cbiAgdXBkYXRlSXNDb25maXJtRXhpdE1vZGFsVmlzaWJsZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuaXNDb25maXJtRXhpdE1vZGFsVmlzaWJsZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVJc0NvbmZpcm1IZXJlTW9kYWxWaXNpYmxlID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5pc0NvbmZpcm1IZXJlTW9kYWxWaXNpYmxlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUlzTG9hZGluZ01vZGFsVmlzaWJsZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuaXNMb2FkaW5nTW9kYWxWaXNpYmxlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUlzU2hhcmVFdmVudE1vZGFsVmlzaWJsZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuaXNTaGFyZUV2ZW50TW9kYWxWaXNpYmxlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ01lZGlhT3B0aW9ucyA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdNZWRpYU9wdGlvbnMubmV4dCh2YWx1ZSk7XG4gICAgdGhpcy5jbGVhcmVkVG9SZWNvcmQubmV4dChmYWxzZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nQXVkaW9PcHRpb25zID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ0F1ZGlvT3B0aW9ucy5uZXh0KHZhbHVlKTtcbiAgICB0aGlzLmNsZWFyZWRUb1JlY29yZC5uZXh0KGZhbHNlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRpbmdWaWRlb09wdGlvbnMgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMucmVjb3JkaW5nVmlkZW9PcHRpb25zLm5leHQodmFsdWUpO1xuICAgIHRoaXMuY2xlYXJlZFRvUmVjb3JkLm5leHQoZmFsc2UpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ1ZpZGVvVHlwZSA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdWaWRlb1R5cGUubmV4dCh2YWx1ZSk7XG4gICAgdGhpcy5jbGVhcmVkVG9SZWNvcmQubmV4dChmYWxzZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nVmlkZW9PcHRpbWl6ZWQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ1ZpZGVvT3B0aW1pemVkLm5leHQodmFsdWUpO1xuICAgIHRoaXMuY2xlYXJlZFRvUmVjb3JkLm5leHQoZmFsc2UpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ0Rpc3BsYXlUeXBlID0gKHZhbHVlOiAndmlkZW8nIHwgJ21lZGlhJyB8ICdhbGwnKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdEaXNwbGF5VHlwZS5uZXh0KHZhbHVlKTtcbiAgICB0aGlzLmNsZWFyZWRUb1JlY29yZC5uZXh0KGZhbHNlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRpbmdBZGRITFMgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ0FkZEhMUy5uZXh0KHZhbHVlKTtcbiAgICB0aGlzLmNsZWFyZWRUb1JlY29yZC5uZXh0KGZhbHNlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRpbmdBZGRUZXh0ID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdBZGRUZXh0Lm5leHQodmFsdWUpO1xuICAgIHRoaXMuY2xlYXJlZFRvUmVjb3JkLm5leHQoZmFsc2UpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ0N1c3RvbVRleHQgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMucmVjb3JkaW5nQ3VzdG9tVGV4dC5uZXh0KHZhbHVlKTtcbiAgICB0aGlzLmNsZWFyZWRUb1JlY29yZC5uZXh0KGZhbHNlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRpbmdDdXN0b21UZXh0UG9zaXRpb24gPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMucmVjb3JkaW5nQ3VzdG9tVGV4dFBvc2l0aW9uLm5leHQodmFsdWUpO1xuICAgIHRoaXMuY2xlYXJlZFRvUmVjb3JkLm5leHQoZmFsc2UpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ0N1c3RvbVRleHRDb2xvciA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdDdXN0b21UZXh0Q29sb3IubmV4dCh2YWx1ZSk7XG4gICAgdGhpcy5jbGVhcmVkVG9SZWNvcmQubmV4dChmYWxzZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nTmFtZVRhZ3MgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnJlY29yZGluZ05hbWVUYWdzLm5leHQodmFsdWUpO1xuICAgIHRoaXMuY2xlYXJlZFRvUmVjb3JkLm5leHQoZmFsc2UpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ0JhY2tncm91bmRDb2xvciA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdCYWNrZ3JvdW5kQ29sb3IubmV4dCh2YWx1ZSk7XG4gICAgdGhpcy5jbGVhcmVkVG9SZWNvcmQubmV4dChmYWxzZSk7XG4gIH07XG5cbiAgdXBkYXRlUmVjb3JkaW5nTmFtZVRhZ3NDb2xvciA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRpbmdOYW1lVGFnc0NvbG9yLm5leHQodmFsdWUpO1xuICAgIHRoaXMuY2xlYXJlZFRvUmVjb3JkLm5leHQoZmFsc2UpO1xuICB9O1xuXG4gIHVwZGF0ZVJlY29yZGluZ09yaWVudGF0aW9uVmlkZW8gPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMucmVjb3JkaW5nT3JpZW50YXRpb25WaWRlby5uZXh0KHZhbHVlKTtcbiAgICB0aGlzLmNsZWFyZWRUb1JlY29yZC5uZXh0KGZhbHNlKTtcbiAgfTtcblxuICB1cGRhdGVDbGVhcmVkVG9SZXN1bWUgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmNsZWFyZWRUb1Jlc3VtZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVDbGVhcmVkVG9SZWNvcmQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmNsZWFyZWRUb1JlY29yZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRTdGF0ZSA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgaWYgKHRoaXMucmVjb3JkU3RhcnRlZC52YWx1ZSAmJiAhdGhpcy5yZWNvcmRTdG9wcGVkLnZhbHVlKSB7XG4gICAgICBpZiAoIXRoaXMucmVjb3JkUGF1c2VkLnZhbHVlKSB7XG4gICAgICAgIHRoaXMucmVjb3JkU3RhdGUubmV4dCgncmVkJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJlY29yZFN0YXRlLm5leHQoJ3llbGxvdycpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlY29yZFN0YXRlLm5leHQodmFsdWUpO1xuICAgIH1cbiAgICB0aGlzLnJlY29yZFN0YXRlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVNob3dSZWNvcmRCdXR0b25zID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5zaG93UmVjb3JkQnV0dG9ucy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRpbmdQcm9ncmVzc1RpbWUgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMucmVjb3JkaW5nUHJvZ3Jlc3NUaW1lLm5leHQodmFsdWUpO1xuICAgIHRoaXMudXBkYXRlUmVjb3JkVGltZXJXaWRnZXQoKTtcbiAgfTtcblxuICB1cGRhdGVBdWRpb1N3aXRjaGluZyA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuYXVkaW9Td2l0Y2hpbmcubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlVmlkZW9Td2l0Y2hpbmcgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnZpZGVvU3dpdGNoaW5nLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVZpZGVvQWxyZWFkeU9uID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy52aWRlb0FscmVhZHlPbi5uZXh0KHZhbHVlKTtcbiAgICB0aGlzLnZpZGVvQWN0aXZlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUF1ZGlvQWxyZWFkeU9uID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5hdWRpb0FscmVhZHlPbi5uZXh0KHZhbHVlKTtcbiAgICB0aGlzLm1pY0FjdGl2ZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVDb21wb25lbnRTaXplcyA9IChzaXplczogQ29tcG9uZW50U2l6ZXMpID0+IHtcbiAgICB0aGlzLmNvbXBvbmVudFNpemVzLm5leHQoc2l6ZXMpO1xuICB9O1xuXG4gIHVwZGF0ZUhhc0NhbWVyYVBlcm1pc3Npb24gPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLmhhc0NhbWVyYVBlcm1pc3Npb24ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlSGFzQXVkaW9QZXJtaXNzaW9uID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5oYXNBdWRpb1Blcm1pc3Npb24ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgcmVxdWVzdFBlcm1pc3Npb25DYW1lcmEoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAvLyBJbXBsZW1lbnQgdGhlIHJlcXVlc3QgcGVybWlzc2lvbiBsb2dpYyBoZXJlXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgnZ3JhbnRlZCcpO1xuICB9XG5cbiAgcmVxdWVzdFBlcm1pc3Npb25BdWRpbygpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIC8vIEltcGxlbWVudCB0aGUgcmVxdWVzdCBwZXJtaXNzaW9uIGxvZ2ljIGhlcmVcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCdncmFudGVkJyk7XG4gIH1cblxuICB1cGRhdGVUcmFuc3BvcnRDcmVhdGVkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy50cmFuc3BvcnRDcmVhdGVkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVRyYW5zcG9ydENyZWF0ZWRWaWRlbyA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMudHJhbnNwb3J0Q3JlYXRlZFZpZGVvLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVRyYW5zcG9ydENyZWF0ZWRBdWRpbyA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMudHJhbnNwb3J0Q3JlYXRlZEF1ZGlvLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVRyYW5zcG9ydENyZWF0ZWRTY3JlZW4gPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnRyYW5zcG9ydENyZWF0ZWRTY3JlZW4ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlUHJvZHVjZXJUcmFuc3BvcnQgPSAodmFsdWU6IFRyYW5zcG9ydCB8IG51bGwpID0+IHtcbiAgICB0aGlzLnByb2R1Y2VyVHJhbnNwb3J0Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVZpZGVvUHJvZHVjZXIgPSAodmFsdWU6IFByb2R1Y2VyIHwgbnVsbCkgPT4ge1xuICAgIHRoaXMudmlkZW9Qcm9kdWNlci5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVQYXJhbXMgPSAodmFsdWU6IFByb2R1Y2VyT3B0aW9ucykgPT4ge1xuICAgIHRoaXMucGFyYW1zLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVZpZGVvUGFyYW1zID0gKHZhbHVlOiBQcm9kdWNlck9wdGlvbnMpID0+IHtcbiAgICB0aGlzLnZpZGVvUGFyYW1zLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUF1ZGlvUGFyYW1zID0gKHZhbHVlOiBQcm9kdWNlck9wdGlvbnMpID0+IHtcbiAgICB0aGlzLmF1ZGlvUGFyYW1zLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUF1ZGlvUHJvZHVjZXIgPSAodmFsdWU6IFByb2R1Y2VyIHwgbnVsbCkgPT4ge1xuICAgIHRoaXMuYXVkaW9Qcm9kdWNlci5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVDb25zdW1lclRyYW5zcG9ydHMgPSAodmFsdWU6IFRyYW5zcG9ydFR5cGVbXSkgPT4ge1xuICAgIHRoaXMuY29uc3VtZXJUcmFuc3BvcnRzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUNvbnN1bWluZ1RyYW5zcG9ydHMgPSAodmFsdWU6IHN0cmluZ1tdKSA9PiB7XG4gICAgdGhpcy5jb25zdW1pbmdUcmFuc3BvcnRzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVBvbGxzID0gKHZhbHVlOiBQb2xsW10pID0+IHtcbiAgICB0aGlzLnBvbGxzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVBvbGwgPSAodmFsdWU6IFBvbGwgfCBudWxsKSA9PiB7XG4gICAgdGhpcy5wb2xsLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUlzUG9sbE1vZGFsVmlzaWJsZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuaXNQb2xsTW9kYWxWaXNpYmxlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUN1c3RvbUltYWdlID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLmN1c3RvbUltYWdlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVNlbGVjdGVkSW1hZ2UgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMuc2VsZWN0ZWRJbWFnZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVTZWdtZW50VmlkZW8gPSAodmFsdWU6IE1lZGlhU3RyZWFtIHwgbnVsbCkgPT4ge1xuICAgIHRoaXMuc2VnbWVudFZpZGVvLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVNlbGZpZVNlZ21lbnRhdGlvbiA9ICh2YWx1ZTogU2VsZmllU2VnbWVudGF0aW9uIHwgbnVsbCkgPT4ge1xuICAgIHRoaXMuc2VsZmllU2VnbWVudGF0aW9uLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVBhdXNlU2VnbWVudGF0aW9uID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5wYXVzZVNlZ21lbnRhdGlvbi5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVQcm9jZXNzZWRTdHJlYW0gPSAodmFsdWU6IE1lZGlhU3RyZWFtIHwgbnVsbCkgPT4ge1xuICAgIHRoaXMucHJvY2Vzc2VkU3RyZWFtLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUtlZXBCYWNrZ3JvdW5kID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5rZWVwQmFja2dyb3VuZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVCYWNrZ3JvdW5kSGFzQ2hhbmdlZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuYmFja2dyb3VuZEhhc0NoYW5nZWQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlVmlydHVhbFN0cmVhbSA9ICh2YWx1ZTogTWVkaWFTdHJlYW0gfCBudWxsKSA9PiB7XG4gICAgdGhpcy52aXJ0dWFsU3RyZWFtLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZU1haW5DYW52YXMgPSAodmFsdWU6IEhUTUxDYW52YXNFbGVtZW50IHwgbnVsbCkgPT4ge1xuICAgIHRoaXMubWFpbkNhbnZhcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVQcmV2S2VlcEJhY2tncm91bmQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnByZXZLZWVwQmFja2dyb3VuZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVBcHBsaWVkQmFja2dyb3VuZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuYXBwbGllZEJhY2tncm91bmQubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlSXNCYWNrZ3JvdW5kTW9kYWxWaXNpYmxlID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5pc0JhY2tncm91bmRNb2RhbFZpc2libGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQXV0b0NsaWNrQmFja2dyb3VuZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuYXV0b0NsaWNrQmFja2dyb3VuZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVCcmVha291dFJvb21zID0gKHZhbHVlOiBCcmVha291dFBhcnRpY2lwYW50W11bXSkgPT4ge1xuICAgIHRoaXMuYnJlYWtvdXRSb29tcy5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVDdXJyZW50Um9vbUluZGV4ID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLmN1cnJlbnRSb29tSW5kZXgubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQ2FuU3RhcnRCcmVha291dCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuY2FuU3RhcnRCcmVha291dC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVCcmVha091dFJvb21TdGFydGVkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5icmVha091dFJvb21TdGFydGVkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUJyZWFrT3V0Um9vbUVuZGVkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5icmVha091dFJvb21FbmRlZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVIb3N0TmV3Um9vbSA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5ob3N0TmV3Um9vbS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVMaW1pdGVkQnJlYWtSb29tID0gKHZhbHVlOiBCcmVha291dFBhcnRpY2lwYW50W10pID0+IHtcbiAgICB0aGlzLmxpbWl0ZWRCcmVha1Jvb20ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlTWFpblJvb21zTGVuZ3RoID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLm1haW5Sb29tc0xlbmd0aC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVNZW1iZXJSb29tID0gKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLm1lbWJlclJvb20ubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlSXNCcmVha291dFJvb21zTW9kYWxWaXNpYmxlID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5pc0JyZWFrb3V0Um9vbXNNb2RhbFZpc2libGUubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlV2hpdGVib2FyZFVzZXJzID0gKHZhbHVlOiBXaGl0ZWJvYXJkVXNlcltdKSA9PiB7XG4gICAgdGhpcy53aGl0ZWJvYXJkVXNlcnMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlQ3VycmVudFdoaXRlYm9hcmRJbmRleCA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5jdXJyZW50V2hpdGVib2FyZEluZGV4Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUNhblN0YXJ0V2hpdGVib2FyZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuY2FuU3RhcnRXaGl0ZWJvYXJkLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVdoaXRlYm9hcmRTdGFydGVkID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy53aGl0ZWJvYXJkU3RhcnRlZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVXaGl0ZWJvYXJkRW5kZWQgPSAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLndoaXRlYm9hcmRFbmRlZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVXaGl0ZWJvYXJkTGltaXQgPSAodmFsdWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMud2hpdGVib2FyZExpbWl0Lm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUlzV2hpdGVib2FyZE1vZGFsVmlzaWJsZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuaXNXaGl0ZWJvYXJkTW9kYWxWaXNpYmxlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUlzQ29uZmlndXJlV2hpdGVib2FyZE1vZGFsVmlzaWJsZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuaXNDb25maWd1cmVXaGl0ZWJvYXJkTW9kYWxWaXNpYmxlLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVNoYXBlcyA9ICh2YWx1ZTogU2hhcGVbXSkgPT4ge1xuICAgIHRoaXMuc2hhcGVzLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVVzZUltYWdlQmFja2dyb3VuZCA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMudXNlSW1hZ2VCYWNrZ3JvdW5kLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVJlZG9TdGFjayA9ICh2YWx1ZTogU2hhcGVbXSkgPT4ge1xuICAgIHRoaXMucmVkb1N0YWNrLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZVVuZG9TdGFjayA9ICh2YWx1ZTogc3RyaW5nW10pID0+IHtcbiAgICB0aGlzLnVuZG9TdGFjay5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVDYW52YXNTdHJlYW0gPSAodmFsdWU6IE1lZGlhU3RyZWFtIHwgbnVsbCkgPT4ge1xuICAgIHRoaXMuY2FudmFzU3RyZWFtLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUNhbnZhc1doaXRlYm9hcmQgPSAodmFsdWU6IEhUTUxDYW52YXNFbGVtZW50IHwgbnVsbCkgPT4ge1xuICAgIHRoaXMuY2FudmFzV2hpdGVib2FyZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVDYW52YXNTY3JlZW5ib2FyZCA9ICh2YWx1ZTogSFRNTENhbnZhc0VsZW1lbnQgfCBudWxsKSA9PiB7XG4gICAgdGhpcy5jYW52YXNTY3JlZW5ib2FyZC5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVQcm9jZXNzZWRTY3JlZW5TdHJlYW0gPSAodmFsdWU6IE1lZGlhU3RyZWFtIHwgbnVsbCkgPT4ge1xuICAgIHRoaXMucHJvY2Vzc2VkU2NyZWVuU3RyZWFtLm5leHQodmFsdWUpO1xuICB9O1xuXG4gIHVwZGF0ZUFubm90YXRlU2NyZWVuU3RyZWFtID0gKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5hbm5vdGF0ZVNjcmVlblN0cmVhbS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICB1cGRhdGVNYWluU2NyZWVuQ2FudmFzID0gKHZhbHVlOiBIVE1MQ2FudmFzRWxlbWVudCB8IG51bGwpID0+IHtcbiAgICB0aGlzLm1haW5TY3JlZW5DYW52YXMubmV4dCh2YWx1ZSk7XG4gIH07XG5cbiAgdXBkYXRlSXNTY3JlZW5ib2FyZE1vZGFsVmlzaWJsZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuaXNTY3JlZW5ib2FyZE1vZGFsVmlzaWJsZS5uZXh0KHZhbHVlKTtcbiAgfTtcblxuICBjaGVja09yaWVudGF0aW9uID0gKCkgPT4ge1xuICAgIGNvbnN0IGlzUG9ydHJhaXQgPSB3aW5kb3cubWF0Y2hNZWRpYSgnKG9yaWVudGF0aW9uOiBwb3J0cmFpdCknKS5tYXRjaGVzO1xuICAgIHJldHVybiBpc1BvcnRyYWl0ID8gJ3BvcnRyYWl0JyA6ICdsYW5kc2NhcGUnO1xuICB9O1xuXG4gIHNob3dBbGVydCA9ICh7XG4gICAgbWVzc2FnZSxcbiAgICB0eXBlLFxuICAgIGR1cmF0aW9uID0gMzAwMCxcbiAgfToge1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICB0eXBlOiAnc3VjY2VzcycgfCAnZGFuZ2VyJztcbiAgICBkdXJhdGlvbj86IG51bWJlcjtcbiAgfSkgPT4ge1xuICAgIHRoaXMudXBkYXRlQWxlcnRNZXNzYWdlKG1lc3NhZ2UpO1xuICAgIHRoaXMudXBkYXRlQWxlcnRUeXBlKHR5cGUpO1xuICAgIHRoaXMudXBkYXRlQWxlcnREdXJhdGlvbihkdXJhdGlvbik7XG4gICAgdGhpcy51cGRhdGVBbGVydFZpc2libGUodHJ1ZSk7XG4gIH07XG5cbiAgZ2V0QWxsUGFyYW1zKCkge1xuICAgIHJldHVybiB7XG4gICAgICBsb2NhbFVJTW9kZTogdGhpcy5sb2NhbFVJTW9kZS52YWx1ZSwgLy8gTG9jYWwgVUkgbW9kZVxuXG4gICAgICAvLyBSb29tIERldGFpbHNcbiAgICAgIHJvb21OYW1lOiB0aGlzLnJvb21OYW1lLnZhbHVlLFxuICAgICAgbWVtYmVyOiB0aGlzLm1lbWJlci52YWx1ZSxcbiAgICAgIGFkbWluUGFzc2NvZGU6IHRoaXMuYWRtaW5QYXNzY29kZS52YWx1ZSxcbiAgICAgIHlvdUFyZUNvSG9zdDogdGhpcy55b3VBcmVDb0hvc3QudmFsdWUsXG4gICAgICB5b3VBcmVIb3N0OiB0aGlzLnlvdUFyZUhvc3QudmFsdWUsXG4gICAgICBpc2xldmVsOiB0aGlzLmlzbGV2ZWwudmFsdWUsXG4gICAgICBjb25maXJtZWRUb1JlY29yZDogdGhpcy5jb25maXJtZWRUb1JlY29yZC52YWx1ZSxcbiAgICAgIG1lZXRpbmdEaXNwbGF5VHlwZTogdGhpcy5tZWV0aW5nRGlzcGxheVR5cGUudmFsdWUsXG4gICAgICBtZWV0aW5nVmlkZW9PcHRpbWl6ZWQ6IHRoaXMubWVldGluZ1ZpZGVvT3B0aW1pemVkLnZhbHVlLFxuICAgICAgZXZlbnRUeXBlOiB0aGlzLmV2ZW50VHlwZS52YWx1ZSxcbiAgICAgIHBhcnRpY2lwYW50czogdGhpcy5wYXJ0aWNpcGFudHMudmFsdWUsXG4gICAgICBmaWx0ZXJlZFBhcnRpY2lwYW50czogdGhpcy5maWx0ZXJlZFBhcnRpY2lwYW50cy52YWx1ZSxcbiAgICAgIHBhcnRpY2lwYW50c0NvdW50ZXI6IHRoaXMucGFydGljaXBhbnRzQ291bnRlci52YWx1ZSxcbiAgICAgIHBhcnRpY2lwYW50c0ZpbHRlcjogdGhpcy5wYXJ0aWNpcGFudHNGaWx0ZXIudmFsdWUsXG5cbiAgICAgIC8vIE1vcmUgcm9vbSBkZXRhaWxzIC0gbWVkaWFcbiAgICAgIGNvbnN1bWVfc29ja2V0czogdGhpcy5jb25zdW1lX3NvY2tldHMudmFsdWUsXG4gICAgICBydHBDYXBhYmlsaXRpZXM6IHRoaXMucnRwQ2FwYWJpbGl0aWVzLnZhbHVlLFxuICAgICAgcm9vbVJlY3ZJUHM6IHRoaXMucm9vbVJlY3ZJUHMudmFsdWUsXG4gICAgICBtZWV0aW5nUm9vbVBhcmFtczogdGhpcy5tZWV0aW5nUm9vbVBhcmFtcy52YWx1ZSxcbiAgICAgIGl0ZW1QYWdlTGltaXQ6IHRoaXMuaXRlbVBhZ2VMaW1pdC52YWx1ZSxcbiAgICAgIGF1ZGlvT25seVJvb206IHRoaXMuYXVkaW9Pbmx5Um9vbS52YWx1ZSxcbiAgICAgIGFkZEZvckJhc2ljOiB0aGlzLmFkZEZvckJhc2ljLnZhbHVlLFxuICAgICAgc2NyZWVuUGFnZUxpbWl0OiB0aGlzLnNjcmVlblBhZ2VMaW1pdC52YWx1ZSxcbiAgICAgIHNoYXJlU2NyZWVuU3RhcnRlZDogdGhpcy5zaGFyZVNjcmVlblN0YXJ0ZWQudmFsdWUsXG4gICAgICBzaGFyZWQ6IHRoaXMuc2hhcmVkLnZhbHVlLFxuICAgICAgdGFyZ2V0T3JpZW50YXRpb246IHRoaXMudGFyZ2V0T3JpZW50YXRpb24udmFsdWUsXG4gICAgICB0YXJnZXRSZXNvbHV0aW9uOiB0aGlzLnRhcmdldFJlc29sdXRpb24udmFsdWUsXG4gICAgICB0YXJnZXRSZXNvbHV0aW9uSG9zdDogdGhpcy50YXJnZXRSZXNvbHV0aW9uSG9zdC52YWx1ZSxcbiAgICAgIHZpZENvbnM6IHRoaXMudmlkQ29ucy52YWx1ZSxcbiAgICAgIGZyYW1lUmF0ZTogdGhpcy5mcmFtZVJhdGUudmFsdWUsXG4gICAgICBoUGFyYW1zOiB0aGlzLmhQYXJhbXMudmFsdWUsXG4gICAgICB2UGFyYW1zOiB0aGlzLnZQYXJhbXMudmFsdWUsXG4gICAgICBzY3JlZW5QYXJhbXM6IHRoaXMuc2NyZWVuUGFyYW1zLnZhbHVlLFxuICAgICAgYVBhcmFtczogdGhpcy5hUGFyYW1zLnZhbHVlLFxuXG4gICAgICAvLyBNb3JlIHJvb20gZGV0YWlscyAtIHJlY29yZGluZ1xuICAgICAgcmVjb3JkaW5nQXVkaW9QYXVzZXNMaW1pdDogdGhpcy5yZWNvcmRpbmdBdWRpb1BhdXNlc0xpbWl0LnZhbHVlLFxuICAgICAgcmVjb3JkaW5nQXVkaW9QYXVzZXNDb3VudDogdGhpcy5yZWNvcmRpbmdBdWRpb1BhdXNlc0NvdW50LnZhbHVlLFxuICAgICAgcmVjb3JkaW5nQXVkaW9TdXBwb3J0OiB0aGlzLnJlY29yZGluZ0F1ZGlvU3VwcG9ydC52YWx1ZSxcbiAgICAgIHJlY29yZGluZ0F1ZGlvUGVvcGxlTGltaXQ6IHRoaXMucmVjb3JkaW5nQXVkaW9QZW9wbGVMaW1pdC52YWx1ZSxcbiAgICAgIHJlY29yZGluZ0F1ZGlvUGFydGljaXBhbnRzVGltZUxpbWl0OiB0aGlzLnJlY29yZGluZ0F1ZGlvUGFydGljaXBhbnRzVGltZUxpbWl0LnZhbHVlLFxuICAgICAgcmVjb3JkaW5nVmlkZW9QYXVzZXNDb3VudDogdGhpcy5yZWNvcmRpbmdWaWRlb1BhdXNlc0NvdW50LnZhbHVlLFxuICAgICAgcmVjb3JkaW5nVmlkZW9QYXVzZXNMaW1pdDogdGhpcy5yZWNvcmRpbmdWaWRlb1BhdXNlc0xpbWl0LnZhbHVlLFxuICAgICAgcmVjb3JkaW5nVmlkZW9TdXBwb3J0OiB0aGlzLnJlY29yZGluZ1ZpZGVvU3VwcG9ydC52YWx1ZSxcbiAgICAgIHJlY29yZGluZ1ZpZGVvUGVvcGxlTGltaXQ6IHRoaXMucmVjb3JkaW5nVmlkZW9QZW9wbGVMaW1pdC52YWx1ZSxcbiAgICAgIHJlY29yZGluZ1ZpZGVvUGFydGljaXBhbnRzVGltZUxpbWl0OiB0aGlzLnJlY29yZGluZ1ZpZGVvUGFydGljaXBhbnRzVGltZUxpbWl0LnZhbHVlLFxuICAgICAgcmVjb3JkaW5nQWxsUGFydGljaXBhbnRzU3VwcG9ydDogdGhpcy5yZWNvcmRpbmdBbGxQYXJ0aWNpcGFudHNTdXBwb3J0LnZhbHVlLFxuICAgICAgcmVjb3JkaW5nVmlkZW9QYXJ0aWNpcGFudHNTdXBwb3J0OiB0aGlzLnJlY29yZGluZ1ZpZGVvUGFydGljaXBhbnRzU3VwcG9ydC52YWx1ZSxcbiAgICAgIHJlY29yZGluZ0FsbFBhcnRpY2lwYW50c0Z1bGxSb29tU3VwcG9ydDogdGhpcy5yZWNvcmRpbmdBbGxQYXJ0aWNpcGFudHNGdWxsUm9vbVN1cHBvcnQudmFsdWUsXG4gICAgICByZWNvcmRpbmdWaWRlb1BhcnRpY2lwYW50c0Z1bGxSb29tU3VwcG9ydDpcbiAgICAgICAgdGhpcy5yZWNvcmRpbmdWaWRlb1BhcnRpY2lwYW50c0Z1bGxSb29tU3VwcG9ydC52YWx1ZSxcbiAgICAgIHJlY29yZGluZ1ByZWZlcnJlZE9yaWVudGF0aW9uOiB0aGlzLnJlY29yZGluZ1ByZWZlcnJlZE9yaWVudGF0aW9uLnZhbHVlLFxuICAgICAgcmVjb3JkaW5nU3VwcG9ydEZvck90aGVyT3JpZW50YXRpb246IHRoaXMucmVjb3JkaW5nU3VwcG9ydEZvck90aGVyT3JpZW50YXRpb24udmFsdWUsXG4gICAgICByZWNvcmRpbmdNdWx0aUZvcm1hdHNTdXBwb3J0OiB0aGlzLnJlY29yZGluZ011bHRpRm9ybWF0c1N1cHBvcnQudmFsdWUsXG5cbiAgICAgIHVzZXJSZWNvcmRpbmdQYXJhbXM6IHRoaXMudXNlclJlY29yZGluZ1BhcmFtcy52YWx1ZSxcbiAgICAgIGNhblJlY29yZDogdGhpcy5jYW5SZWNvcmQudmFsdWUsXG4gICAgICBzdGFydFJlcG9ydDogdGhpcy5zdGFydFJlcG9ydC52YWx1ZSxcbiAgICAgIGVuZFJlcG9ydDogdGhpcy5lbmRSZXBvcnQudmFsdWUsXG4gICAgICByZWNvcmRTdGFydFRpbWU6IHRoaXMucmVjb3JkU3RhcnRUaW1lLnZhbHVlLFxuICAgICAgcmVjb3JkRWxhcHNlZFRpbWU6IHRoaXMucmVjb3JkRWxhcHNlZFRpbWUudmFsdWUsXG4gICAgICBpc1RpbWVyUnVubmluZzogdGhpcy5pc1RpbWVyUnVubmluZy52YWx1ZSxcbiAgICAgIGNhblBhdXNlUmVzdW1lOiB0aGlzLmNhblBhdXNlUmVzdW1lLnZhbHVlLFxuICAgICAgcmVjb3JkQ2hhbmdlU2Vjb25kczogdGhpcy5yZWNvcmRDaGFuZ2VTZWNvbmRzLnZhbHVlLFxuICAgICAgcGF1c2VMaW1pdDogdGhpcy5wYXVzZUxpbWl0LnZhbHVlLFxuICAgICAgcGF1c2VSZWNvcmRDb3VudDogdGhpcy5wYXVzZVJlY29yZENvdW50LnZhbHVlLFxuICAgICAgY2FuTGF1bmNoUmVjb3JkOiB0aGlzLmNhbkxhdW5jaFJlY29yZC52YWx1ZSxcbiAgICAgIHN0b3BMYXVuY2hSZWNvcmQ6IHRoaXMuc3RvcExhdW5jaFJlY29yZC52YWx1ZSxcblxuICAgICAgcGFydGljaXBhbnRzQWxsOiB0aGlzLnBhcnRpY2lwYW50c0FsbC52YWx1ZSxcblxuICAgICAgZmlyc3RBbGw6IHRoaXMuZmlyc3RBbGwudmFsdWUsXG4gICAgICB1cGRhdGVNYWluV2luZG93OiB0aGlzLnVwZGF0ZU1haW5XaW5kb3cudmFsdWUsXG4gICAgICBmaXJzdF9yb3VuZDogdGhpcy5maXJzdF9yb3VuZC52YWx1ZSxcbiAgICAgIGxhbmRTY2FwZWQ6IHRoaXMubGFuZFNjYXBlZC52YWx1ZSxcbiAgICAgIGxvY2tfc2NyZWVuOiB0aGlzLmxvY2tfc2NyZWVuLnZhbHVlLFxuICAgICAgc2NyZWVuSWQ6IHRoaXMuc2NyZWVuSWQudmFsdWUsXG4gICAgICBhbGxWaWRlb1N0cmVhbXM6IHRoaXMuYWxsVmlkZW9TdHJlYW1zLnZhbHVlLFxuICAgICAgbmV3TGltaXRlZFN0cmVhbXM6IHRoaXMubmV3TGltaXRlZFN0cmVhbXMudmFsdWUsXG4gICAgICBuZXdMaW1pdGVkU3RyZWFtc0lEczogdGhpcy5uZXdMaW1pdGVkU3RyZWFtc0lEcy52YWx1ZSxcbiAgICAgIGFjdGl2ZVNvdW5kczogdGhpcy5hY3RpdmVTb3VuZHMudmFsdWUsXG4gICAgICBzY3JlZW5TaGFyZUlEU3RyZWFtOiB0aGlzLnNjcmVlblNoYXJlSURTdHJlYW0udmFsdWUsXG4gICAgICBzY3JlZW5TaGFyZU5hbWVTdHJlYW06IHRoaXMuc2NyZWVuU2hhcmVOYW1lU3RyZWFtLnZhbHVlLFxuICAgICAgYWRtaW5JRFN0cmVhbTogdGhpcy5hZG1pbklEU3RyZWFtLnZhbHVlLFxuICAgICAgYWRtaW5OYW1lU3RyZWFtOiB0aGlzLmFkbWluTmFtZVN0cmVhbS52YWx1ZSxcbiAgICAgIHlvdVlvdVN0cmVhbTogdGhpcy55b3VZb3VTdHJlYW0udmFsdWUsXG4gICAgICB5b3VZb3VTdHJlYW1JRHM6IHRoaXMueW91WW91U3RyZWFtSURzLnZhbHVlLFxuICAgICAgbG9jYWxTdHJlYW06IHRoaXMubG9jYWxTdHJlYW0udmFsdWUsXG4gICAgICByZWNvcmRTdGFydGVkOiB0aGlzLnJlY29yZFN0YXJ0ZWQudmFsdWUsXG4gICAgICByZWNvcmRSZXN1bWVkOiB0aGlzLnJlY29yZFJlc3VtZWQudmFsdWUsXG4gICAgICByZWNvcmRQYXVzZWQ6IHRoaXMucmVjb3JkUGF1c2VkLnZhbHVlLFxuICAgICAgcmVjb3JkU3RvcHBlZDogdGhpcy5yZWNvcmRTdG9wcGVkLnZhbHVlLFxuICAgICAgYWRtaW5SZXN0cmljdFNldHRpbmc6IHRoaXMuYWRtaW5SZXN0cmljdFNldHRpbmcudmFsdWUsXG4gICAgICB2aWRlb1JlcXVlc3RTdGF0ZTogdGhpcy52aWRlb1JlcXVlc3RTdGF0ZS52YWx1ZSxcbiAgICAgIHZpZGVvUmVxdWVzdFRpbWU6IHRoaXMudmlkZW9SZXF1ZXN0VGltZS52YWx1ZSxcbiAgICAgIHZpZGVvQWN0aW9uOiB0aGlzLnZpZGVvQWN0aW9uLnZhbHVlLFxuICAgICAgbG9jYWxTdHJlYW1WaWRlbzogdGhpcy5sb2NhbFN0cmVhbVZpZGVvLnZhbHVlLFxuICAgICAgdXNlckRlZmF1bHRWaWRlb0lucHV0RGV2aWNlOiB0aGlzLnVzZXJEZWZhdWx0VmlkZW9JbnB1dERldmljZS52YWx1ZSxcbiAgICAgIGN1cnJlbnRGYWNpbmdNb2RlOiB0aGlzLmN1cnJlbnRGYWNpbmdNb2RlLnZhbHVlLFxuICAgICAgcHJldkZhY2luZ01vZGU6IHRoaXMucHJldkZhY2luZ01vZGUudmFsdWUsXG4gICAgICBkZWZWaWRlb0lEOiB0aGlzLmRlZlZpZGVvSUQudmFsdWUsXG4gICAgICBhbGxvd2VkOiB0aGlzLmFsbG93ZWQudmFsdWUsXG4gICAgICBkaXNwQWN0aXZlTmFtZXM6IHRoaXMuZGlzcEFjdGl2ZU5hbWVzLnZhbHVlLFxuICAgICAgcF9kaXNwQWN0aXZlTmFtZXM6IHRoaXMucF9kaXNwQWN0aXZlTmFtZXMudmFsdWUsXG4gICAgICBhY3RpdmVOYW1lczogdGhpcy5hY3RpdmVOYW1lcy52YWx1ZSxcbiAgICAgIHByZXZBY3RpdmVOYW1lczogdGhpcy5wcmV2QWN0aXZlTmFtZXMudmFsdWUsXG4gICAgICBwX2FjdGl2ZU5hbWVzOiB0aGlzLnBfYWN0aXZlTmFtZXMudmFsdWUsXG4gICAgICBtZW1iZXJzUmVjZWl2ZWQ6IHRoaXMubWVtYmVyc1JlY2VpdmVkLnZhbHVlLFxuICAgICAgZGVmZXJTY3JlZW5SZWNlaXZlZDogdGhpcy5kZWZlclNjcmVlblJlY2VpdmVkLnZhbHVlLFxuICAgICAgaG9zdEZpcnN0U3dpdGNoOiB0aGlzLmhvc3RGaXJzdFN3aXRjaC52YWx1ZSxcbiAgICAgIG1pY0FjdGlvbjogdGhpcy5taWNBY3Rpb24udmFsdWUsXG4gICAgICBzY3JlZW5BY3Rpb246IHRoaXMuc2NyZWVuQWN0aW9uLnZhbHVlLFxuICAgICAgY2hhdEFjdGlvbjogdGhpcy5jaGF0QWN0aW9uLnZhbHVlLFxuICAgICAgYXVkaW9SZXF1ZXN0U3RhdGU6IHRoaXMuYXVkaW9SZXF1ZXN0U3RhdGUudmFsdWUsXG4gICAgICBzY3JlZW5SZXF1ZXN0U3RhdGU6IHRoaXMuc2NyZWVuUmVxdWVzdFN0YXRlLnZhbHVlLFxuICAgICAgY2hhdFJlcXVlc3RTdGF0ZTogdGhpcy5jaGF0UmVxdWVzdFN0YXRlLnZhbHVlLFxuICAgICAgYXVkaW9SZXF1ZXN0VGltZTogdGhpcy5hdWRpb1JlcXVlc3RUaW1lLnZhbHVlLFxuICAgICAgc2NyZWVuUmVxdWVzdFRpbWU6IHRoaXMuc2NyZWVuUmVxdWVzdFRpbWUudmFsdWUsXG4gICAgICBjaGF0UmVxdWVzdFRpbWU6IHRoaXMuY2hhdFJlcXVlc3RUaW1lLnZhbHVlLFxuICAgICAgdXBkYXRlUmVxdWVzdEludGVydmFsU2Vjb25kczogdGhpcy51cGRhdGVSZXF1ZXN0SW50ZXJ2YWxTZWNvbmRzLnZhbHVlLFxuICAgICAgb2xkU291bmRJZHM6IHRoaXMub2xkU291bmRJZHMudmFsdWUsXG4gICAgICBob3N0TGFiZWw6IHRoaXMuaG9zdExhYmVsLnZhbHVlLFxuICAgICAgbWFpblNjcmVlbkZpbGxlZDogdGhpcy5tYWluU2NyZWVuRmlsbGVkLnZhbHVlLFxuICAgICAgbG9jYWxTdHJlYW1TY3JlZW46IHRoaXMubG9jYWxTdHJlYW1TY3JlZW4udmFsdWUsXG4gICAgICBzY3JlZW5BbHJlYWR5T246IHRoaXMuc2NyZWVuQWxyZWFkeU9uLnZhbHVlLFxuICAgICAgY2hhdEFscmVhZHlPbjogdGhpcy5jaGF0QWxyZWFkeU9uLnZhbHVlLFxuICAgICAgcmVkaXJlY3RVUkw6IHRoaXMucmVkaXJlY3RVUkwudmFsdWUsXG4gICAgICBvbGRBbGxTdHJlYW1zOiB0aGlzLm9sZEFsbFN0cmVhbXMudmFsdWUsXG4gICAgICBhZG1pblZpZElEOiB0aGlzLmFkbWluVmlkSUQudmFsdWUsXG4gICAgICBzdHJlYW1OYW1lczogdGhpcy5zdHJlYW1OYW1lcy52YWx1ZSxcbiAgICAgIG5vbl9hbFZpZGVvU3RyZWFtczogdGhpcy5ub25fYWxWaWRlb1N0cmVhbXMudmFsdWUsXG4gICAgICBzb3J0QXVkaW9Mb3VkbmVzczogdGhpcy5zb3J0QXVkaW9Mb3VkbmVzcy52YWx1ZSxcbiAgICAgIGF1ZGlvRGVjaWJlbHM6IHRoaXMuYXVkaW9EZWNpYmVscy52YWx1ZSxcbiAgICAgIG1peGVkX2FsVmlkZW9TdHJlYW1zOiB0aGlzLm1peGVkX2FsVmlkZW9TdHJlYW1zLnZhbHVlLFxuICAgICAgbm9uX2FsVmlkZW9TdHJlYW1zX211dGVkOiB0aGlzLm5vbl9hbFZpZGVvU3RyZWFtc19tdXRlZC52YWx1ZSxcbiAgICAgIHBhZ2luYXRlZFN0cmVhbXM6IHRoaXMucGFnaW5hdGVkU3RyZWFtcy52YWx1ZSxcbiAgICAgIGxvY2FsU3RyZWFtQXVkaW86IHRoaXMubG9jYWxTdHJlYW1BdWRpby52YWx1ZSxcbiAgICAgIGRlZkF1ZGlvSUQ6IHRoaXMuZGVmQXVkaW9JRC52YWx1ZSxcbiAgICAgIHVzZXJEZWZhdWx0QXVkaW9JbnB1dERldmljZTogdGhpcy51c2VyRGVmYXVsdEF1ZGlvSW5wdXREZXZpY2UudmFsdWUsXG4gICAgICB1c2VyRGVmYXVsdEF1ZGlvT3V0cHV0RGV2aWNlOiB0aGlzLnVzZXJEZWZhdWx0QXVkaW9PdXRwdXREZXZpY2UudmFsdWUsXG4gICAgICBwcmV2QXVkaW9JbnB1dERldmljZTogdGhpcy5wcmV2QXVkaW9JbnB1dERldmljZS52YWx1ZSxcbiAgICAgIHByZXZWaWRlb0lucHV0RGV2aWNlOiB0aGlzLnByZXZWaWRlb0lucHV0RGV2aWNlLnZhbHVlLFxuICAgICAgYXVkaW9QYXVzZWQ6IHRoaXMuYXVkaW9QYXVzZWQudmFsdWUsXG4gICAgICBtYWluU2NyZWVuUGVyc29uOiB0aGlzLm1haW5TY3JlZW5QZXJzb24udmFsdWUsXG4gICAgICBhZG1pbk9uTWFpblNjcmVlbjogdGhpcy5hZG1pbk9uTWFpblNjcmVlbi52YWx1ZSxcbiAgICAgIHNjcmVlblN0YXRlczogdGhpcy5zY3JlZW5TdGF0ZXMudmFsdWUsXG4gICAgICBwcmV2U2NyZWVuU3RhdGVzOiB0aGlzLnByZXZTY3JlZW5TdGF0ZXMudmFsdWUsXG4gICAgICB1cGRhdGVEYXRlU3RhdGU6IHRoaXMudXBkYXRlRGF0ZVN0YXRlLnZhbHVlLFxuICAgICAgbGFzdFVwZGF0ZTogdGhpcy5sYXN0VXBkYXRlLnZhbHVlLFxuICAgICAgbkZvclJlYWRqdXN0UmVjb3JkOiB0aGlzLm5Gb3JSZWFkanVzdFJlY29yZC52YWx1ZSxcbiAgICAgIGZpeGVkUGFnZUxpbWl0OiB0aGlzLmZpeGVkUGFnZUxpbWl0LnZhbHVlLFxuICAgICAgcmVtb3ZlQWx0R3JpZDogdGhpcy5yZW1vdmVBbHRHcmlkLnZhbHVlLFxuICAgICAgbkZvclJlYWRqdXN0OiB0aGlzLm5Gb3JSZWFkanVzdC52YWx1ZSxcbiAgICAgIGxhc3RSZW9yZGVyVGltZTogdGhpcy5sYXN0UmVvcmRlclRpbWUudmFsdWUsXG4gICAgICByZW9yZGVySW50ZXJ2YWw6IHRoaXMucmVvcmRlckludGVydmFsLnZhbHVlLFxuICAgICAgZmFzdFJlb3JkZXJJbnRlcnZhbDogdGhpcy5mYXN0UmVvcmRlckludGVydmFsLnZhbHVlLFxuICAgICAgYXVkU3RyZWFtTmFtZXM6IHRoaXMuYXVkU3RyZWFtTmFtZXMudmFsdWUsXG4gICAgICBjdXJyZW50VXNlclBhZ2U6IHRoaXMuY3VycmVudFVzZXJQYWdlLnZhbHVlLFxuICAgICAgbWFpbkhlaWdodFdpZHRoOiB0aGlzLm1haW5IZWlnaHRXaWR0aC52YWx1ZSxcbiAgICAgIHByZXZNYWluSGVpZ2h0V2lkdGg6IHRoaXMucHJldk1haW5IZWlnaHRXaWR0aC52YWx1ZSxcbiAgICAgIHByZXZEb1BhZ2luYXRlOiB0aGlzLnByZXZEb1BhZ2luYXRlLnZhbHVlLFxuICAgICAgZG9QYWdpbmF0ZTogdGhpcy5kb1BhZ2luYXRlLnZhbHVlLFxuICAgICAgc2hhcmVFbmRlZDogdGhpcy5zaGFyZUVuZGVkLnZhbHVlLFxuICAgICAgbFN0cmVhbXM6IHRoaXMubFN0cmVhbXMudmFsdWUsXG4gICAgICBjaGF0UmVmU3RyZWFtczogdGhpcy5jaGF0UmVmU3RyZWFtcy52YWx1ZSxcbiAgICAgIGNvbnRyb2xIZWlnaHQ6IHRoaXMuY29udHJvbEhlaWdodC52YWx1ZSxcbiAgICAgIGlzV2lkZVNjcmVlbjogdGhpcy5pc1dpZGVTY3JlZW4udmFsdWUsXG4gICAgICBpc01lZGl1bVNjcmVlbjogdGhpcy5pc01lZGl1bVNjcmVlbi52YWx1ZSxcbiAgICAgIGlzU21hbGxTY3JlZW46IHRoaXMuaXNTbWFsbFNjcmVlbi52YWx1ZSxcbiAgICAgIGFkZEdyaWQ6IHRoaXMuYWRkR3JpZC52YWx1ZSxcbiAgICAgIGFkZEFsdEdyaWQ6IHRoaXMuYWRkQWx0R3JpZC52YWx1ZSxcbiAgICAgIGdyaWRSb3dzOiB0aGlzLmdyaWRSb3dzLnZhbHVlLFxuICAgICAgZ3JpZENvbHM6IHRoaXMuZ3JpZENvbHMudmFsdWUsXG4gICAgICBhbHRHcmlkUm93czogdGhpcy5hbHRHcmlkUm93cy52YWx1ZSxcbiAgICAgIGFsdEdyaWRDb2xzOiB0aGlzLmFsdEdyaWRDb2xzLnZhbHVlLFxuICAgICAgbnVtYmVyUGFnZXM6IHRoaXMubnVtYmVyUGFnZXMudmFsdWUsXG4gICAgICBjdXJyZW50U3RyZWFtczogdGhpcy5jdXJyZW50U3RyZWFtcy52YWx1ZSxcbiAgICAgIHNob3dNaW5pVmlldzogdGhpcy5zaG93TWluaVZpZXcudmFsdWUsXG4gICAgICBuU3RyZWFtOiB0aGlzLm5TdHJlYW0udmFsdWUsXG4gICAgICBkZWZlcl9yZWNlaXZlOiB0aGlzLmRlZmVyX3JlY2VpdmUudmFsdWUsXG4gICAgICBhbGxBdWRpb1N0cmVhbXM6IHRoaXMuYWxsQXVkaW9TdHJlYW1zLnZhbHVlLFxuICAgICAgc2NyZWVuUHJvZHVjZXI6IHRoaXMuc2NyZWVuUHJvZHVjZXIudmFsdWUsXG4gICAgICByZW1vdGVTY3JlZW5TdHJlYW06IHRoaXMucmVtb3RlU2NyZWVuU3RyZWFtLnZhbHVlLFxuICAgICAgZ290QWxsVmlkczogdGhpcy5nb3RBbGxWaWRzLnZhbHVlLFxuICAgICAgcGFnaW5hdGlvbkhlaWdodFdpZHRoOiB0aGlzLnBhZ2luYXRpb25IZWlnaHRXaWR0aC52YWx1ZSxcbiAgICAgIHBhZ2luYXRpb25EaXJlY3Rpb246IHRoaXMucGFnaW5hdGlvbkRpcmVjdGlvbi52YWx1ZSxcbiAgICAgIGdyaWRTaXplczogdGhpcy5ncmlkU2l6ZXMudmFsdWUsXG4gICAgICBzY3JlZW5Gb3JjZUZ1bGxEaXNwbGF5OiB0aGlzLnNjcmVlbkZvcmNlRnVsbERpc3BsYXkudmFsdWUsXG4gICAgICBtYWluR3JpZFN0cmVhbTogdGhpcy5tYWluR3JpZFN0cmVhbS52YWx1ZSxcbiAgICAgIG90aGVyR3JpZFN0cmVhbXM6IHRoaXMub3RoZXJHcmlkU3RyZWFtcy52YWx1ZSxcbiAgICAgIGF1ZGlvT25seVN0cmVhbXM6IHRoaXMuYXVkaW9Pbmx5U3RyZWFtcy52YWx1ZSxcbiAgICAgIHZpZGVvSW5wdXRzOiB0aGlzLnZpZGVvSW5wdXRzLnZhbHVlLFxuICAgICAgYXVkaW9JbnB1dHM6IHRoaXMuYXVkaW9JbnB1dHMudmFsdWUsXG4gICAgICBtZWV0aW5nUHJvZ3Jlc3NUaW1lOiB0aGlzLm1lZXRpbmdQcm9ncmVzc1RpbWUudmFsdWUsXG4gICAgICBtZWV0aW5nRWxhcHNlZFRpbWU6IHRoaXMubWVldGluZ0VsYXBzZWRUaW1lLnZhbHVlLFxuXG4gICAgICByZWZfcGFydGljaXBhbnRzOiB0aGlzLnJlZl9wYXJ0aWNpcGFudHMudmFsdWUsXG5cbiAgICAgIG1lc3NhZ2VzOiB0aGlzLm1lc3NhZ2VzLnZhbHVlLFxuICAgICAgc3RhcnREaXJlY3RNZXNzYWdlOiB0aGlzLnN0YXJ0RGlyZWN0TWVzc2FnZS52YWx1ZSxcbiAgICAgIGRpcmVjdE1lc3NhZ2VEZXRhaWxzOiB0aGlzLmRpcmVjdE1lc3NhZ2VEZXRhaWxzLnZhbHVlLFxuICAgICAgY29Ib3N0OiB0aGlzLmNvSG9zdC52YWx1ZSxcbiAgICAgIGNvSG9zdFJlc3BvbnNpYmlsaXR5OiB0aGlzLmNvSG9zdFJlc3BvbnNpYmlsaXR5LnZhbHVlLFxuXG4gICAgICAvLyBFdmVudCBzZXR0aW5nc1xuICAgICAgYXVkaW9TZXR0aW5nOiB0aGlzLmF1ZGlvU2V0dGluZy52YWx1ZSxcbiAgICAgIHZpZGVvU2V0dGluZzogdGhpcy52aWRlb1NldHRpbmcudmFsdWUsXG4gICAgICBzY3JlZW5zaGFyZVNldHRpbmc6IHRoaXMuc2NyZWVuc2hhcmVTZXR0aW5nLnZhbHVlLFxuICAgICAgY2hhdFNldHRpbmc6IHRoaXMuY2hhdFNldHRpbmcudmFsdWUsXG5cbiAgICAgIC8vIERpc3BsYXkgc2V0dGluZ3NcbiAgICAgIGF1dG9XYXZlOiB0aGlzLmF1dG9XYXZlLnZhbHVlLFxuICAgICAgZm9yY2VGdWxsRGlzcGxheTogdGhpcy5mb3JjZUZ1bGxEaXNwbGF5LnZhbHVlLFxuICAgICAgcHJldkZvcmNlRnVsbERpc3BsYXk6IHRoaXMucHJldkZvcmNlRnVsbERpc3BsYXkudmFsdWUsXG4gICAgICBwcmV2TWVldGluZ0Rpc3BsYXlUeXBlOiB0aGlzLnByZXZNZWV0aW5nRGlzcGxheVR5cGUudmFsdWUsXG5cbiAgICAgIC8vIFdhaXRpbmcgcm9vbVxuICAgICAgd2FpdGluZ1Jvb21GaWx0ZXI6IHRoaXMud2FpdGluZ1Jvb21GaWx0ZXIudmFsdWUsXG4gICAgICB3YWl0aW5nUm9vbUxpc3Q6IHRoaXMud2FpdGluZ1Jvb21MaXN0LnZhbHVlLFxuICAgICAgd2FpdGluZ1Jvb21Db3VudGVyOiB0aGlzLndhaXRpbmdSb29tQ291bnRlci52YWx1ZSxcbiAgICAgIGZpbHRlcmVkV2FpdGluZ1Jvb21MaXN0OiB0aGlzLmZpbHRlcmVkV2FpdGluZ1Jvb21MaXN0LnZhbHVlLFxuXG4gICAgICAvLyBSZXF1ZXN0c1xuICAgICAgcmVxdWVzdEZpbHRlcjogdGhpcy5yZXF1ZXN0RmlsdGVyLnZhbHVlLFxuICAgICAgcmVxdWVzdExpc3Q6IHRoaXMucmVxdWVzdExpc3QudmFsdWUsXG4gICAgICByZXF1ZXN0Q291bnRlcjogdGhpcy5yZXF1ZXN0Q291bnRlci52YWx1ZSxcbiAgICAgIGZpbHRlcmVkUmVxdWVzdExpc3Q6IHRoaXMuZmlsdGVyZWRSZXF1ZXN0TGlzdC52YWx1ZSxcblxuICAgICAgLy8gVG90YWwgcmVxdWVzdHMgYW5kIHdhaXRpbmcgcm9vbVxuICAgICAgdG90YWxSZXFXYWl0OiB0aGlzLnRvdGFsUmVxV2FpdC52YWx1ZSxcblxuICAgICAgLy8gQWxlcnRzXG4gICAgICBhbGVydFZpc2libGU6IHRoaXMuYWxlcnRWaXNpYmxlLnZhbHVlLFxuICAgICAgYWxlcnRNZXNzYWdlOiB0aGlzLmFsZXJ0TWVzc2FnZS52YWx1ZSxcbiAgICAgIGFsZXJ0VHlwZTogdGhpcy5hbGVydFR5cGUudmFsdWUsXG4gICAgICBhbGVydER1cmF0aW9uOiB0aGlzLmFsZXJ0RHVyYXRpb24udmFsdWUsXG5cbiAgICAgIC8vIFByb2dyZXNzIFRpbWVyXG4gICAgICBwcm9ncmVzc1RpbWVyVmlzaWJsZTogdGhpcy5wcm9ncmVzc1RpbWVyVmlzaWJsZS52YWx1ZSxcbiAgICAgIHByb2dyZXNzVGltZXJWYWx1ZTogdGhpcy5wcm9ncmVzc1RpbWVyVmFsdWUudmFsdWUsXG5cbiAgICAgIC8vIE1lbnUgbW9kYWxzXG4gICAgICBpc01lbnVNb2RhbFZpc2libGU6IHRoaXMuaXNNZW51TW9kYWxWaXNpYmxlLnZhbHVlLFxuICAgICAgaXNSZWNvcmRpbmdNb2RhbFZpc2libGU6IHRoaXMuaXNSZWNvcmRpbmdNb2RhbFZpc2libGUudmFsdWUsXG4gICAgICBpc1NldHRpbmdzTW9kYWxWaXNpYmxlOiB0aGlzLmlzU2V0dGluZ3NNb2RhbFZpc2libGUudmFsdWUsXG4gICAgICBpc1JlcXVlc3RzTW9kYWxWaXNpYmxlOiB0aGlzLmlzUmVxdWVzdHNNb2RhbFZpc2libGUudmFsdWUsXG4gICAgICBpc1dhaXRpbmdNb2RhbFZpc2libGU6IHRoaXMuaXNXYWl0aW5nTW9kYWxWaXNpYmxlLnZhbHVlLFxuICAgICAgaXNDb0hvc3RNb2RhbFZpc2libGU6IHRoaXMuaXNDb0hvc3RNb2RhbFZpc2libGUudmFsdWUsXG4gICAgICBpc01lZGlhU2V0dGluZ3NNb2RhbFZpc2libGU6IHRoaXMuaXNNZWRpYVNldHRpbmdzTW9kYWxWaXNpYmxlLnZhbHVlLFxuICAgICAgaXNEaXNwbGF5U2V0dGluZ3NNb2RhbFZpc2libGU6IHRoaXMuaXNEaXNwbGF5U2V0dGluZ3NNb2RhbFZpc2libGUudmFsdWUsXG5cbiAgICAgIC8vIE90aGVyIE1vZGFsc1xuICAgICAgaXNQYXJ0aWNpcGFudHNNb2RhbFZpc2libGU6IHRoaXMuaXNQYXJ0aWNpcGFudHNNb2RhbFZpc2libGUudmFsdWUsXG4gICAgICBpc01lc3NhZ2VzTW9kYWxWaXNpYmxlOiB0aGlzLmlzTWVzc2FnZXNNb2RhbFZpc2libGUudmFsdWUsXG4gICAgICBpc0NvbmZpcm1FeGl0TW9kYWxWaXNpYmxlOiB0aGlzLmlzQ29uZmlybUV4aXRNb2RhbFZpc2libGUudmFsdWUsXG4gICAgICBpc0NvbmZpcm1IZXJlTW9kYWxWaXNpYmxlOiB0aGlzLmlzQ29uZmlybUhlcmVNb2RhbFZpc2libGUudmFsdWUsXG4gICAgICBpc0xvYWRpbmdNb2RhbFZpc2libGU6IHRoaXMuaXNMb2FkaW5nTW9kYWxWaXNpYmxlLnZhbHVlLFxuXG4gICAgICAvLyBSZWNvcmRpbmcgT3B0aW9uc1xuICAgICAgcmVjb3JkaW5nTWVkaWFPcHRpb25zOiB0aGlzLnJlY29yZGluZ01lZGlhT3B0aW9ucy52YWx1ZSxcbiAgICAgIHJlY29yZGluZ0F1ZGlvT3B0aW9uczogdGhpcy5yZWNvcmRpbmdBdWRpb09wdGlvbnMudmFsdWUsXG4gICAgICByZWNvcmRpbmdWaWRlb09wdGlvbnM6IHRoaXMucmVjb3JkaW5nVmlkZW9PcHRpb25zLnZhbHVlLFxuICAgICAgcmVjb3JkaW5nVmlkZW9UeXBlOiB0aGlzLnJlY29yZGluZ1ZpZGVvVHlwZS52YWx1ZSxcbiAgICAgIHJlY29yZGluZ1ZpZGVvT3B0aW1pemVkOiB0aGlzLnJlY29yZGluZ1ZpZGVvT3B0aW1pemVkLnZhbHVlLFxuICAgICAgcmVjb3JkaW5nRGlzcGxheVR5cGU6IHRoaXMucmVjb3JkaW5nRGlzcGxheVR5cGUudmFsdWUsXG4gICAgICByZWNvcmRpbmdBZGRITFM6IHRoaXMucmVjb3JkaW5nQWRkSExTLnZhbHVlLFxuICAgICAgcmVjb3JkaW5nQWRkVGV4dDogdGhpcy5yZWNvcmRpbmdBZGRUZXh0LnZhbHVlLFxuICAgICAgcmVjb3JkaW5nQ3VzdG9tVGV4dDogdGhpcy5yZWNvcmRpbmdDdXN0b21UZXh0LnZhbHVlLFxuICAgICAgcmVjb3JkaW5nQ3VzdG9tVGV4dFBvc2l0aW9uOiB0aGlzLnJlY29yZGluZ0N1c3RvbVRleHRQb3NpdGlvbi52YWx1ZSxcbiAgICAgIHJlY29yZGluZ0N1c3RvbVRleHRDb2xvcjogdGhpcy5yZWNvcmRpbmdDdXN0b21UZXh0Q29sb3IudmFsdWUsXG4gICAgICByZWNvcmRpbmdOYW1lVGFnczogdGhpcy5yZWNvcmRpbmdOYW1lVGFncy52YWx1ZSxcbiAgICAgIHJlY29yZGluZ0JhY2tncm91bmRDb2xvcjogdGhpcy5yZWNvcmRpbmdCYWNrZ3JvdW5kQ29sb3IudmFsdWUsXG4gICAgICByZWNvcmRpbmdOYW1lVGFnc0NvbG9yOiB0aGlzLnJlY29yZGluZ05hbWVUYWdzQ29sb3IudmFsdWUsXG4gICAgICByZWNvcmRpbmdPcmllbnRhdGlvblZpZGVvOiB0aGlzLnJlY29yZGluZ09yaWVudGF0aW9uVmlkZW8udmFsdWUsXG4gICAgICBjbGVhcmVkVG9SZXN1bWU6IHRoaXMuY2xlYXJlZFRvUmVzdW1lLnZhbHVlLFxuICAgICAgY2xlYXJlZFRvUmVjb3JkOiB0aGlzLmNsZWFyZWRUb1JlY29yZC52YWx1ZSxcbiAgICAgIHJlY29yZFN0YXRlOiB0aGlzLnJlY29yZFN0YXRlLnZhbHVlLFxuICAgICAgc2hvd1JlY29yZEJ1dHRvbnM6IHRoaXMuc2hvd1JlY29yZEJ1dHRvbnMudmFsdWUsXG4gICAgICByZWNvcmRpbmdQcm9ncmVzc1RpbWU6IHRoaXMucmVjb3JkaW5nUHJvZ3Jlc3NUaW1lLnZhbHVlLFxuICAgICAgYXVkaW9Td2l0Y2hpbmc6IHRoaXMuYXVkaW9Td2l0Y2hpbmcudmFsdWUsXG4gICAgICB2aWRlb1N3aXRjaGluZzogdGhpcy52aWRlb1N3aXRjaGluZy52YWx1ZSxcblxuICAgICAgLy8gTWVkaWEgc3RhdGVzXG4gICAgICB2aWRlb0FscmVhZHlPbjogdGhpcy52aWRlb0FscmVhZHlPbi52YWx1ZSxcbiAgICAgIGF1ZGlvQWxyZWFkeU9uOiB0aGlzLmF1ZGlvQWxyZWFkeU9uLnZhbHVlLFxuICAgICAgY29tcG9uZW50U2l6ZXM6IHRoaXMuY29tcG9uZW50U2l6ZXMudmFsdWUsXG5cbiAgICAgIC8vIFBlcm1pc3Npb25zXG4gICAgICBoYXNDYW1lcmFQZXJtaXNzaW9uOiB0aGlzLmhhc0NhbWVyYVBlcm1pc3Npb24udmFsdWUsXG4gICAgICBoYXNBdWRpb1Blcm1pc3Npb246IHRoaXMuaGFzQXVkaW9QZXJtaXNzaW9uLnZhbHVlLFxuXG4gICAgICAvLyBUcmFuc3BvcnRzXG4gICAgICB0cmFuc3BvcnRDcmVhdGVkOiB0aGlzLnRyYW5zcG9ydENyZWF0ZWQudmFsdWUsXG4gICAgICB0cmFuc3BvcnRDcmVhdGVkVmlkZW86IHRoaXMudHJhbnNwb3J0Q3JlYXRlZFZpZGVvLnZhbHVlLFxuICAgICAgdHJhbnNwb3J0Q3JlYXRlZEF1ZGlvOiB0aGlzLnRyYW5zcG9ydENyZWF0ZWRBdWRpby52YWx1ZSxcbiAgICAgIHRyYW5zcG9ydENyZWF0ZWRTY3JlZW46IHRoaXMudHJhbnNwb3J0Q3JlYXRlZFNjcmVlbi52YWx1ZSxcbiAgICAgIHByb2R1Y2VyVHJhbnNwb3J0OiB0aGlzLnByb2R1Y2VyVHJhbnNwb3J0LnZhbHVlLFxuICAgICAgdmlkZW9Qcm9kdWNlcjogdGhpcy52aWRlb1Byb2R1Y2VyLnZhbHVlLFxuICAgICAgcGFyYW1zOiB0aGlzLnBhcmFtcy52YWx1ZSxcbiAgICAgIHZpZGVvUGFyYW1zOiB0aGlzLnZpZGVvUGFyYW1zLnZhbHVlLFxuICAgICAgYXVkaW9QYXJhbXM6IHRoaXMuYXVkaW9QYXJhbXMudmFsdWUsXG4gICAgICBhdWRpb1Byb2R1Y2VyOiB0aGlzLmF1ZGlvUHJvZHVjZXIudmFsdWUsXG4gICAgICBjb25zdW1lclRyYW5zcG9ydHM6IHRoaXMuY29uc3VtZXJUcmFuc3BvcnRzLnZhbHVlLFxuICAgICAgY29uc3VtaW5nVHJhbnNwb3J0czogdGhpcy5jb25zdW1pbmdUcmFuc3BvcnRzLnZhbHVlLFxuXG4gICAgICAvLyBQb2xsc1xuICAgICAgcG9sbHM6IHRoaXMucG9sbHMudmFsdWUsXG4gICAgICBwb2xsOiB0aGlzLnBvbGwudmFsdWUsXG4gICAgICBpc1BvbGxNb2RhbFZpc2libGU6IHRoaXMuaXNQb2xsTW9kYWxWaXNpYmxlLnZhbHVlLFxuXG4gICAgICAvLyBCYWNrZ3JvdW5kXG4gICAgICBjdXN0b21JbWFnZTogdGhpcy5jdXN0b21JbWFnZS52YWx1ZSxcbiAgICAgIHNlbGVjdGVkSW1hZ2U6IHRoaXMuc2VsZWN0ZWRJbWFnZS52YWx1ZSxcbiAgICAgIHNlZ21lbnRWaWRlbzogdGhpcy5zZWdtZW50VmlkZW8udmFsdWUsXG4gICAgICBzZWxmaWVTZWdtZW50YXRpb246IHRoaXMuc2VsZmllU2VnbWVudGF0aW9uLnZhbHVlLFxuICAgICAgcGF1c2VTZWdtZW50YXRpb246IHRoaXMucGF1c2VTZWdtZW50YXRpb24udmFsdWUsXG4gICAgICBwcm9jZXNzZWRTdHJlYW06IHRoaXMucHJvY2Vzc2VkU3RyZWFtLnZhbHVlLFxuICAgICAga2VlcEJhY2tncm91bmQ6IHRoaXMua2VlcEJhY2tncm91bmQudmFsdWUsXG4gICAgICBiYWNrZ3JvdW5kSGFzQ2hhbmdlZDogdGhpcy5iYWNrZ3JvdW5kSGFzQ2hhbmdlZC52YWx1ZSxcbiAgICAgIHZpcnR1YWxTdHJlYW06IHRoaXMudmlydHVhbFN0cmVhbS52YWx1ZSxcbiAgICAgIG1haW5DYW52YXM6IHRoaXMubWFpbkNhbnZhcy52YWx1ZSxcbiAgICAgIHByZXZLZWVwQmFja2dyb3VuZDogdGhpcy5wcmV2S2VlcEJhY2tncm91bmQudmFsdWUsXG4gICAgICBhcHBsaWVkQmFja2dyb3VuZDogdGhpcy5hcHBsaWVkQmFja2dyb3VuZC52YWx1ZSxcbiAgICAgIGlzQmFja2dyb3VuZE1vZGFsVmlzaWJsZTogdGhpcy5pc0JhY2tncm91bmRNb2RhbFZpc2libGUudmFsdWUsXG4gICAgICBhdXRvQ2xpY2tCYWNrZ3JvdW5kOiB0aGlzLmF1dG9DbGlja0JhY2tncm91bmQudmFsdWUsXG5cbiAgICAgIC8vIEJyZWFrb3V0IHJvb21zXG4gICAgICBicmVha291dFJvb21zOiB0aGlzLmJyZWFrb3V0Um9vbXMudmFsdWUsXG4gICAgICBjdXJyZW50Um9vbUluZGV4OiB0aGlzLmN1cnJlbnRSb29tSW5kZXgudmFsdWUsXG4gICAgICBjYW5TdGFydEJyZWFrb3V0OiB0aGlzLmNhblN0YXJ0QnJlYWtvdXQudmFsdWUsXG4gICAgICBicmVha091dFJvb21TdGFydGVkOiB0aGlzLmJyZWFrT3V0Um9vbVN0YXJ0ZWQudmFsdWUsXG4gICAgICBicmVha091dFJvb21FbmRlZDogdGhpcy5icmVha091dFJvb21FbmRlZC52YWx1ZSxcbiAgICAgIGhvc3ROZXdSb29tOiB0aGlzLmhvc3ROZXdSb29tLnZhbHVlLFxuICAgICAgbGltaXRlZEJyZWFrUm9vbTogdGhpcy5saW1pdGVkQnJlYWtSb29tLnZhbHVlLFxuICAgICAgbWFpblJvb21zTGVuZ3RoOiB0aGlzLm1haW5Sb29tc0xlbmd0aC52YWx1ZSxcbiAgICAgIG1lbWJlclJvb206IHRoaXMubWVtYmVyUm9vbS52YWx1ZSxcbiAgICAgIGlzQnJlYWtvdXRSb29tc01vZGFsVmlzaWJsZTogdGhpcy5pc0JyZWFrb3V0Um9vbXNNb2RhbFZpc2libGUudmFsdWUsXG5cbiAgICAgIC8vIFdoaXRlYm9hcmRcbiAgICAgIHdoaXRlYm9hcmRVc2VyczogdGhpcy53aGl0ZWJvYXJkVXNlcnMudmFsdWUsXG4gICAgICBjdXJyZW50V2hpdGVib2FyZEluZGV4OiB0aGlzLmN1cnJlbnRXaGl0ZWJvYXJkSW5kZXgudmFsdWUsXG4gICAgICBjYW5TdGFydFdoaXRlYm9hcmQ6IHRoaXMuY2FuU3RhcnRXaGl0ZWJvYXJkLnZhbHVlLFxuICAgICAgd2hpdGVib2FyZFN0YXJ0ZWQ6IHRoaXMud2hpdGVib2FyZFN0YXJ0ZWQudmFsdWUsXG4gICAgICB3aGl0ZWJvYXJkRW5kZWQ6IHRoaXMud2hpdGVib2FyZEVuZGVkLnZhbHVlLFxuICAgICAgd2hpdGVib2FyZExpbWl0OiB0aGlzLndoaXRlYm9hcmRMaW1pdC52YWx1ZSxcbiAgICAgIGlzV2hpdGVib2FyZE1vZGFsVmlzaWJsZTogdGhpcy5pc1doaXRlYm9hcmRNb2RhbFZpc2libGUudmFsdWUsXG4gICAgICBpc0NvbmZpZ3VyZVdoaXRlYm9hcmRNb2RhbFZpc2libGU6IHRoaXMuaXNDb25maWd1cmVXaGl0ZWJvYXJkTW9kYWxWaXNpYmxlLnZhbHVlLFxuICAgICAgc2hhcGVzOiB0aGlzLnNoYXBlcy52YWx1ZSxcbiAgICAgIHVzZUltYWdlQmFja2dyb3VuZDogdGhpcy51c2VJbWFnZUJhY2tncm91bmQudmFsdWUsXG4gICAgICByZWRvU3RhY2s6IHRoaXMucmVkb1N0YWNrLnZhbHVlLFxuICAgICAgdW5kb1N0YWNrOiB0aGlzLnVuZG9TdGFjay52YWx1ZSxcbiAgICAgIGNhbnZhc1N0cmVhbTogdGhpcy5jYW52YXNTdHJlYW0udmFsdWUsXG4gICAgICBjYW52YXNXaGl0ZWJvYXJkOiB0aGlzLmNhbnZhc1doaXRlYm9hcmQudmFsdWUsXG5cbiAgICAgIC8vIFNjcmVlbmJvYXJkXG4gICAgICBjYW52YXNTY3JlZW5ib2FyZDogdGhpcy5jYW52YXNTY3JlZW5ib2FyZC52YWx1ZSxcbiAgICAgIHByb2Nlc3NlZFNjcmVlblN0cmVhbTogdGhpcy5wcm9jZXNzZWRTY3JlZW5TdHJlYW0udmFsdWUsXG4gICAgICBhbm5vdGF0ZVNjcmVlblN0cmVhbTogdGhpcy5hbm5vdGF0ZVNjcmVlblN0cmVhbS52YWx1ZSxcbiAgICAgIG1haW5TY3JlZW5DYW52YXM6IHRoaXMubWFpblNjcmVlbkNhbnZhcy52YWx1ZSxcbiAgICAgIGlzU2NyZWVuYm9hcmRNb2RhbFZpc2libGU6IHRoaXMuaXNTY3JlZW5ib2FyZE1vZGFsVmlzaWJsZS52YWx1ZSxcblxuICAgICAgdmFsaWRhdGVkOiB0aGlzLnZhbGlkYXRlZC52YWx1ZSxcbiAgICAgIGRldmljZTogdGhpcy5kZXZpY2UudmFsdWUsXG4gICAgICBzb2NrZXQ6IHRoaXMuc29ja2V0LnZhbHVlLFxuICAgICAgY2hlY2tNZWRpYVBlcm1pc3Npb246IGZhbHNlLFxuICAgICAgb25XZWI6IHRydWUsXG5cbiAgICAgIC8vIFVwZGF0ZSBmdW5jdGlvbnNcbiAgICAgIHVwZGF0ZVJvb21OYW1lOiB0aGlzLnVwZGF0ZVJvb21OYW1lLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVNZW1iZXI6IHRoaXMudXBkYXRlTWVtYmVyLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVBZG1pblBhc3Njb2RlOiB0aGlzLnVwZGF0ZUFkbWluUGFzc2NvZGUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVlvdUFyZUNvSG9zdDogdGhpcy51cGRhdGVZb3VBcmVDb0hvc3QuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVlvdUFyZUhvc3Q6IHRoaXMudXBkYXRlWW91QXJlSG9zdC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlSXNsZXZlbDogdGhpcy51cGRhdGVJc2xldmVsLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVDb0hvc3Q6IHRoaXMudXBkYXRlQ29Ib3N0LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVDb0hvc3RSZXNwb25zaWJpbGl0eTogdGhpcy51cGRhdGVDb0hvc3RSZXNwb25zaWJpbGl0eS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQ29uZmlybWVkVG9SZWNvcmQ6IHRoaXMudXBkYXRlQ29uZmlybWVkVG9SZWNvcmQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZU1lZXRpbmdEaXNwbGF5VHlwZTogdGhpcy51cGRhdGVNZWV0aW5nRGlzcGxheVR5cGUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZU1lZXRpbmdWaWRlb09wdGltaXplZDogdGhpcy51cGRhdGVNZWV0aW5nVmlkZW9PcHRpbWl6ZWQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUV2ZW50VHlwZTogdGhpcy51cGRhdGVFdmVudFR5cGUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVBhcnRpY2lwYW50czogdGhpcy51cGRhdGVQYXJ0aWNpcGFudHMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVBhcnRpY2lwYW50c0NvdW50ZXI6IHRoaXMudXBkYXRlUGFydGljaXBhbnRzQ291bnRlci5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUGFydGljaXBhbnRzRmlsdGVyOiB0aGlzLnVwZGF0ZVBhcnRpY2lwYW50c0ZpbHRlci5iaW5kKHRoaXMpLFxuXG4gICAgICAvLyBNb3JlIHVwZGF0ZSBmdW5jdGlvbnMgZm9yIG1lZGlhIGRldGFpbHNcbiAgICAgIHVwZGF0ZUNvbnN1bWVfc29ja2V0czogdGhpcy51cGRhdGVDb25zdW1lX3NvY2tldHMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJ0cENhcGFiaWxpdGllczogdGhpcy51cGRhdGVSdHBDYXBhYmlsaXRpZXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJvb21SZWN2SVBzOiB0aGlzLnVwZGF0ZVJvb21SZWN2SVBzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVNZWV0aW5nUm9vbVBhcmFtczogdGhpcy51cGRhdGVNZWV0aW5nUm9vbVBhcmFtcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlSXRlbVBhZ2VMaW1pdDogdGhpcy51cGRhdGVJdGVtUGFnZUxpbWl0LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVBdWRpb09ubHlSb29tOiB0aGlzLnVwZGF0ZUF1ZGlvT25seVJvb20uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUFkZEZvckJhc2ljOiB0aGlzLnVwZGF0ZUFkZEZvckJhc2ljLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVTY3JlZW5QYWdlTGltaXQ6IHRoaXMudXBkYXRlU2NyZWVuUGFnZUxpbWl0LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVTaGFyZVNjcmVlblN0YXJ0ZWQ6IHRoaXMudXBkYXRlU2hhcmVTY3JlZW5TdGFydGVkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVTaGFyZWQ6IHRoaXMudXBkYXRlU2hhcmVkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVUYXJnZXRPcmllbnRhdGlvbjogdGhpcy51cGRhdGVUYXJnZXRPcmllbnRhdGlvbi5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlVGFyZ2V0UmVzb2x1dGlvbjogdGhpcy51cGRhdGVUYXJnZXRSZXNvbHV0aW9uLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVUYXJnZXRSZXNvbHV0aW9uSG9zdDogdGhpcy51cGRhdGVUYXJnZXRSZXNvbHV0aW9uSG9zdC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlVmlkQ29uczogdGhpcy51cGRhdGVWaWRDb25zLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVGcmFtZVJhdGU6IHRoaXMudXBkYXRlRnJhbWVSYXRlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVIUGFyYW1zOiB0aGlzLnVwZGF0ZUhQYXJhbXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVZQYXJhbXM6IHRoaXMudXBkYXRlVlBhcmFtcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlU2NyZWVuUGFyYW1zOiB0aGlzLnVwZGF0ZVNjcmVlblBhcmFtcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQVBhcmFtczogdGhpcy51cGRhdGVBUGFyYW1zLmJpbmQodGhpcyksXG5cbiAgICAgIC8vIE1vcmUgdXBkYXRlIGZ1bmN0aW9ucyBmb3IgcmVjb3JkaW5nIGRldGFpbHNcbiAgICAgIHVwZGF0ZVJlY29yZGluZ0F1ZGlvUGF1c2VzTGltaXQ6IHRoaXMudXBkYXRlUmVjb3JkaW5nQXVkaW9QYXVzZXNMaW1pdC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nQXVkaW9QYXVzZXNDb3VudDogdGhpcy51cGRhdGVSZWNvcmRpbmdBdWRpb1BhdXNlc0NvdW50LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRpbmdBdWRpb1N1cHBvcnQ6IHRoaXMudXBkYXRlUmVjb3JkaW5nQXVkaW9TdXBwb3J0LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRpbmdBdWRpb1Blb3BsZUxpbWl0OiB0aGlzLnVwZGF0ZVJlY29yZGluZ0F1ZGlvUGVvcGxlTGltaXQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ0F1ZGlvUGFydGljaXBhbnRzVGltZUxpbWl0OlxuICAgICAgICB0aGlzLnVwZGF0ZVJlY29yZGluZ0F1ZGlvUGFydGljaXBhbnRzVGltZUxpbWl0LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRpbmdWaWRlb1BhdXNlc0NvdW50OiB0aGlzLnVwZGF0ZVJlY29yZGluZ1ZpZGVvUGF1c2VzQ291bnQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ1ZpZGVvUGF1c2VzTGltaXQ6IHRoaXMudXBkYXRlUmVjb3JkaW5nVmlkZW9QYXVzZXNMaW1pdC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nVmlkZW9TdXBwb3J0OiB0aGlzLnVwZGF0ZVJlY29yZGluZ1ZpZGVvU3VwcG9ydC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nVmlkZW9QZW9wbGVMaW1pdDogdGhpcy51cGRhdGVSZWNvcmRpbmdWaWRlb1Blb3BsZUxpbWl0LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRpbmdWaWRlb1BhcnRpY2lwYW50c1RpbWVMaW1pdDpcbiAgICAgICAgdGhpcy51cGRhdGVSZWNvcmRpbmdWaWRlb1BhcnRpY2lwYW50c1RpbWVMaW1pdC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nQWxsUGFydGljaXBhbnRzU3VwcG9ydDogdGhpcy51cGRhdGVSZWNvcmRpbmdBbGxQYXJ0aWNpcGFudHNTdXBwb3J0LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRpbmdWaWRlb1BhcnRpY2lwYW50c1N1cHBvcnQ6XG4gICAgICAgIHRoaXMudXBkYXRlUmVjb3JkaW5nVmlkZW9QYXJ0aWNpcGFudHNTdXBwb3J0LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRpbmdBbGxQYXJ0aWNpcGFudHNGdWxsUm9vbVN1cHBvcnQ6XG4gICAgICAgIHRoaXMudXBkYXRlUmVjb3JkaW5nQWxsUGFydGljaXBhbnRzRnVsbFJvb21TdXBwb3J0LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRpbmdWaWRlb1BhcnRpY2lwYW50c0Z1bGxSb29tU3VwcG9ydDpcbiAgICAgICAgdGhpcy51cGRhdGVSZWNvcmRpbmdWaWRlb1BhcnRpY2lwYW50c0Z1bGxSb29tU3VwcG9ydC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nUHJlZmVycmVkT3JpZW50YXRpb246IHRoaXMudXBkYXRlUmVjb3JkaW5nUHJlZmVycmVkT3JpZW50YXRpb24uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ1N1cHBvcnRGb3JPdGhlck9yaWVudGF0aW9uOlxuICAgICAgICB0aGlzLnVwZGF0ZVJlY29yZGluZ1N1cHBvcnRGb3JPdGhlck9yaWVudGF0aW9uLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRpbmdNdWx0aUZvcm1hdHNTdXBwb3J0OiB0aGlzLnVwZGF0ZVJlY29yZGluZ011bHRpRm9ybWF0c1N1cHBvcnQuYmluZCh0aGlzKSxcblxuICAgICAgdXBkYXRlVXNlclJlY29yZGluZ1BhcmFtczogdGhpcy51cGRhdGVVc2VyUmVjb3JkaW5nUGFyYW1zLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVDYW5SZWNvcmQ6IHRoaXMudXBkYXRlQ2FuUmVjb3JkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVTdGFydFJlcG9ydDogdGhpcy51cGRhdGVTdGFydFJlcG9ydC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlRW5kUmVwb3J0OiB0aGlzLnVwZGF0ZUVuZFJlcG9ydC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkVGltZXJJbnRlcnZhbDogdGhpcy51cGRhdGVSZWNvcmRUaW1lckludGVydmFsLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRTdGFydFRpbWU6IHRoaXMudXBkYXRlUmVjb3JkU3RhcnRUaW1lLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRFbGFwc2VkVGltZTogdGhpcy51cGRhdGVSZWNvcmRFbGFwc2VkVGltZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlSXNUaW1lclJ1bm5pbmc6IHRoaXMudXBkYXRlSXNUaW1lclJ1bm5pbmcuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUNhblBhdXNlUmVzdW1lOiB0aGlzLnVwZGF0ZUNhblBhdXNlUmVzdW1lLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRDaGFuZ2VTZWNvbmRzOiB0aGlzLnVwZGF0ZVJlY29yZENoYW5nZVNlY29uZHMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVBhdXNlTGltaXQ6IHRoaXMudXBkYXRlUGF1c2VMaW1pdC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUGF1c2VSZWNvcmRDb3VudDogdGhpcy51cGRhdGVQYXVzZVJlY29yZENvdW50LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVDYW5MYXVuY2hSZWNvcmQ6IHRoaXMudXBkYXRlQ2FuTGF1bmNoUmVjb3JkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVTdG9wTGF1bmNoUmVjb3JkOiB0aGlzLnVwZGF0ZVN0b3BMYXVuY2hSZWNvcmQuYmluZCh0aGlzKSxcblxuICAgICAgdXBkYXRlUGFydGljaXBhbnRzQWxsOiB0aGlzLnVwZGF0ZVBhcnRpY2lwYW50c0FsbC5iaW5kKHRoaXMpLFxuXG4gICAgICB1cGRhdGVGaXJzdEFsbDogdGhpcy51cGRhdGVGaXJzdEFsbC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlVXBkYXRlTWFpbldpbmRvdzogdGhpcy51cGRhdGVVcGRhdGVNYWluV2luZG93LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVGaXJzdF9yb3VuZDogdGhpcy51cGRhdGVGaXJzdF9yb3VuZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTGFuZFNjYXBlZDogdGhpcy51cGRhdGVMYW5kU2NhcGVkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVMb2NrX3NjcmVlbjogdGhpcy51cGRhdGVMb2NrX3NjcmVlbi5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlU2NyZWVuSWQ6IHRoaXMudXBkYXRlU2NyZWVuSWQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUFsbFZpZGVvU3RyZWFtczogdGhpcy51cGRhdGVBbGxWaWRlb1N0cmVhbXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZU5ld0xpbWl0ZWRTdHJlYW1zOiB0aGlzLnVwZGF0ZU5ld0xpbWl0ZWRTdHJlYW1zLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVOZXdMaW1pdGVkU3RyZWFtc0lEczogdGhpcy51cGRhdGVOZXdMaW1pdGVkU3RyZWFtc0lEcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQWN0aXZlU291bmRzOiB0aGlzLnVwZGF0ZUFjdGl2ZVNvdW5kcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlU2NyZWVuU2hhcmVJRFN0cmVhbTogdGhpcy51cGRhdGVTY3JlZW5TaGFyZUlEU3RyZWFtLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVTY3JlZW5TaGFyZU5hbWVTdHJlYW06IHRoaXMudXBkYXRlU2NyZWVuU2hhcmVOYW1lU3RyZWFtLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVBZG1pbklEU3RyZWFtOiB0aGlzLnVwZGF0ZUFkbWluSURTdHJlYW0uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUFkbWluTmFtZVN0cmVhbTogdGhpcy51cGRhdGVBZG1pbk5hbWVTdHJlYW0uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVlvdVlvdVN0cmVhbTogdGhpcy51cGRhdGVZb3VZb3VTdHJlYW0uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVlvdVlvdVN0cmVhbUlEczogdGhpcy51cGRhdGVZb3VZb3VTdHJlYW1JRHMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUxvY2FsU3RyZWFtOiB0aGlzLnVwZGF0ZUxvY2FsU3RyZWFtLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRTdGFydGVkOiB0aGlzLnVwZGF0ZVJlY29yZFN0YXJ0ZWQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZFJlc3VtZWQ6IHRoaXMudXBkYXRlUmVjb3JkUmVzdW1lZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkUGF1c2VkOiB0aGlzLnVwZGF0ZVJlY29yZFBhdXNlZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkU3RvcHBlZDogdGhpcy51cGRhdGVSZWNvcmRTdG9wcGVkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVBZG1pblJlc3RyaWN0U2V0dGluZzogdGhpcy51cGRhdGVBZG1pblJlc3RyaWN0U2V0dGluZy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlVmlkZW9SZXF1ZXN0U3RhdGU6IHRoaXMudXBkYXRlVmlkZW9SZXF1ZXN0U3RhdGUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVZpZGVvUmVxdWVzdFRpbWU6IHRoaXMudXBkYXRlVmlkZW9SZXF1ZXN0VGltZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlVmlkZW9BY3Rpb246IHRoaXMudXBkYXRlVmlkZW9BY3Rpb24uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUxvY2FsU3RyZWFtVmlkZW86IHRoaXMudXBkYXRlTG9jYWxTdHJlYW1WaWRlby5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlVXNlckRlZmF1bHRWaWRlb0lucHV0RGV2aWNlOiB0aGlzLnVwZGF0ZVVzZXJEZWZhdWx0VmlkZW9JbnB1dERldmljZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQ3VycmVudEZhY2luZ01vZGU6IHRoaXMudXBkYXRlQ3VycmVudEZhY2luZ01vZGUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVByZXZGYWNpbmdNb2RlOiB0aGlzLnVwZGF0ZVByZXZGYWNpbmdNb2RlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVEZWZWaWRlb0lEOiB0aGlzLnVwZGF0ZURlZlZpZGVvSUQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUFsbG93ZWQ6IHRoaXMudXBkYXRlQWxsb3dlZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlRGlzcEFjdGl2ZU5hbWVzOiB0aGlzLnVwZGF0ZURpc3BBY3RpdmVOYW1lcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUF9kaXNwQWN0aXZlTmFtZXM6IHRoaXMudXBkYXRlUF9kaXNwQWN0aXZlTmFtZXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUFjdGl2ZU5hbWVzOiB0aGlzLnVwZGF0ZUFjdGl2ZU5hbWVzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVQcmV2QWN0aXZlTmFtZXM6IHRoaXMudXBkYXRlUHJldkFjdGl2ZU5hbWVzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVQX2FjdGl2ZU5hbWVzOiB0aGlzLnVwZGF0ZVBfYWN0aXZlTmFtZXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZU1lbWJlcnNSZWNlaXZlZDogdGhpcy51cGRhdGVNZW1iZXJzUmVjZWl2ZWQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZURlZmVyU2NyZWVuUmVjZWl2ZWQ6IHRoaXMudXBkYXRlRGVmZXJTY3JlZW5SZWNlaXZlZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlSG9zdEZpcnN0U3dpdGNoOiB0aGlzLnVwZGF0ZUhvc3RGaXJzdFN3aXRjaC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTWljQWN0aW9uOiB0aGlzLnVwZGF0ZU1pY0FjdGlvbi5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlU2NyZWVuQWN0aW9uOiB0aGlzLnVwZGF0ZVNjcmVlbkFjdGlvbi5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQ2hhdEFjdGlvbjogdGhpcy51cGRhdGVDaGF0QWN0aW9uLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVBdWRpb1JlcXVlc3RTdGF0ZTogdGhpcy51cGRhdGVBdWRpb1JlcXVlc3RTdGF0ZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlU2NyZWVuUmVxdWVzdFN0YXRlOiB0aGlzLnVwZGF0ZVNjcmVlblJlcXVlc3RTdGF0ZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQ2hhdFJlcXVlc3RTdGF0ZTogdGhpcy51cGRhdGVDaGF0UmVxdWVzdFN0YXRlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVBdWRpb1JlcXVlc3RUaW1lOiB0aGlzLnVwZGF0ZUF1ZGlvUmVxdWVzdFRpbWUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVNjcmVlblJlcXVlc3RUaW1lOiB0aGlzLnVwZGF0ZVNjcmVlblJlcXVlc3RUaW1lLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVDaGF0UmVxdWVzdFRpbWU6IHRoaXMudXBkYXRlQ2hhdFJlcXVlc3RUaW1lLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVPbGRTb3VuZElkczogdGhpcy51cGRhdGVPbGRTb3VuZElkcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlSG9zdExhYmVsOiB0aGlzLnVwZGF0ZUhvc3RMYWJlbC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTWFpblNjcmVlbkZpbGxlZDogdGhpcy51cGRhdGVNYWluU2NyZWVuRmlsbGVkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVMb2NhbFN0cmVhbVNjcmVlbjogdGhpcy51cGRhdGVMb2NhbFN0cmVhbVNjcmVlbi5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlU2NyZWVuQWxyZWFkeU9uOiB0aGlzLnVwZGF0ZVNjcmVlbkFscmVhZHlPbi5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQ2hhdEFscmVhZHlPbjogdGhpcy51cGRhdGVDaGF0QWxyZWFkeU9uLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWRpcmVjdFVSTDogdGhpcy51cGRhdGVSZWRpcmVjdFVSTC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlT2xkQWxsU3RyZWFtczogdGhpcy51cGRhdGVPbGRBbGxTdHJlYW1zLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVBZG1pblZpZElEOiB0aGlzLnVwZGF0ZUFkbWluVmlkSUQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVN0cmVhbU5hbWVzOiB0aGlzLnVwZGF0ZVN0cmVhbU5hbWVzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVOb25fYWxWaWRlb1N0cmVhbXM6IHRoaXMudXBkYXRlTm9uX2FsVmlkZW9TdHJlYW1zLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVTb3J0QXVkaW9Mb3VkbmVzczogdGhpcy51cGRhdGVTb3J0QXVkaW9Mb3VkbmVzcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQXVkaW9EZWNpYmVsczogdGhpcy51cGRhdGVBdWRpb0RlY2liZWxzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVNaXhlZF9hbFZpZGVvU3RyZWFtczogdGhpcy51cGRhdGVNaXhlZF9hbFZpZGVvU3RyZWFtcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTm9uX2FsVmlkZW9TdHJlYW1zX211dGVkOiB0aGlzLnVwZGF0ZU5vbl9hbFZpZGVvU3RyZWFtc19tdXRlZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUGFnaW5hdGVkU3RyZWFtczogdGhpcy51cGRhdGVQYWdpbmF0ZWRTdHJlYW1zLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVMb2NhbFN0cmVhbUF1ZGlvOiB0aGlzLnVwZGF0ZUxvY2FsU3RyZWFtQXVkaW8uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZURlZkF1ZGlvSUQ6IHRoaXMudXBkYXRlRGVmQXVkaW9JRC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlVXNlckRlZmF1bHRBdWRpb0lucHV0RGV2aWNlOiB0aGlzLnVwZGF0ZVVzZXJEZWZhdWx0QXVkaW9JbnB1dERldmljZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlVXNlckRlZmF1bHRBdWRpb091dHB1dERldmljZTogdGhpcy51cGRhdGVVc2VyRGVmYXVsdEF1ZGlvT3V0cHV0RGV2aWNlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVQcmV2QXVkaW9JbnB1dERldmljZTogdGhpcy51cGRhdGVQcmV2QXVkaW9JbnB1dERldmljZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUHJldlZpZGVvSW5wdXREZXZpY2U6IHRoaXMudXBkYXRlUHJldlZpZGVvSW5wdXREZXZpY2UuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUF1ZGlvUGF1c2VkOiB0aGlzLnVwZGF0ZUF1ZGlvUGF1c2VkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVNYWluU2NyZWVuUGVyc29uOiB0aGlzLnVwZGF0ZU1haW5TY3JlZW5QZXJzb24uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUFkbWluT25NYWluU2NyZWVuOiB0aGlzLnVwZGF0ZUFkbWluT25NYWluU2NyZWVuLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVTY3JlZW5TdGF0ZXM6IHRoaXMudXBkYXRlU2NyZWVuU3RhdGVzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVQcmV2U2NyZWVuU3RhdGVzOiB0aGlzLnVwZGF0ZVByZXZTY3JlZW5TdGF0ZXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVVwZGF0ZURhdGVTdGF0ZTogdGhpcy51cGRhdGVVcGRhdGVEYXRlU3RhdGUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUxhc3RVcGRhdGU6IHRoaXMudXBkYXRlTGFzdFVwZGF0ZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTkZvclJlYWRqdXN0UmVjb3JkOiB0aGlzLnVwZGF0ZU5Gb3JSZWFkanVzdFJlY29yZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlRml4ZWRQYWdlTGltaXQ6IHRoaXMudXBkYXRlRml4ZWRQYWdlTGltaXQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlbW92ZUFsdEdyaWQ6IHRoaXMudXBkYXRlUmVtb3ZlQWx0R3JpZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTkZvclJlYWRqdXN0OiB0aGlzLnVwZGF0ZU5Gb3JSZWFkanVzdC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTGFzdFJlb3JkZXJUaW1lOiB0aGlzLnVwZGF0ZUxhc3RSZW9yZGVyVGltZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQXVkU3RyZWFtTmFtZXM6IHRoaXMudXBkYXRlQXVkU3RyZWFtTmFtZXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUN1cnJlbnRVc2VyUGFnZTogdGhpcy51cGRhdGVDdXJyZW50VXNlclBhZ2UuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZU1haW5IZWlnaHRXaWR0aDogdGhpcy51cGRhdGVNYWluSGVpZ2h0V2lkdGguYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVByZXZNYWluSGVpZ2h0V2lkdGg6IHRoaXMudXBkYXRlUHJldk1haW5IZWlnaHRXaWR0aC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUHJldkRvUGFnaW5hdGU6IHRoaXMudXBkYXRlUHJldkRvUGFnaW5hdGUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZURvUGFnaW5hdGU6IHRoaXMudXBkYXRlRG9QYWdpbmF0ZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlU2hhcmVFbmRlZDogdGhpcy51cGRhdGVTaGFyZUVuZGVkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVMU3RyZWFtczogdGhpcy51cGRhdGVMU3RyZWFtcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQ2hhdFJlZlN0cmVhbXM6IHRoaXMudXBkYXRlQ2hhdFJlZlN0cmVhbXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUNvbnRyb2xIZWlnaHQ6IHRoaXMudXBkYXRlQ29udHJvbEhlaWdodC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlSXNXaWRlU2NyZWVuOiB0aGlzLnVwZGF0ZUlzV2lkZVNjcmVlbi5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlSXNNZWRpdW1TY3JlZW46IHRoaXMudXBkYXRlSXNNZWRpdW1TY3JlZW4uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUlzU21hbGxTY3JlZW46IHRoaXMudXBkYXRlSXNTbWFsbFNjcmVlbi5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQWRkR3JpZDogdGhpcy51cGRhdGVBZGRHcmlkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVBZGRBbHRHcmlkOiB0aGlzLnVwZGF0ZUFkZEFsdEdyaWQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUdyaWRSb3dzOiB0aGlzLnVwZGF0ZUdyaWRSb3dzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVHcmlkQ29sczogdGhpcy51cGRhdGVHcmlkQ29scy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQWx0R3JpZFJvd3M6IHRoaXMudXBkYXRlQWx0R3JpZFJvd3MuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUFsdEdyaWRDb2xzOiB0aGlzLnVwZGF0ZUFsdEdyaWRDb2xzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVOdW1iZXJQYWdlczogdGhpcy51cGRhdGVOdW1iZXJQYWdlcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQ3VycmVudFN0cmVhbXM6IHRoaXMudXBkYXRlQ3VycmVudFN0cmVhbXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVNob3dNaW5pVmlldzogdGhpcy51cGRhdGVTaG93TWluaVZpZXcuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZU5TdHJlYW06IHRoaXMudXBkYXRlTlN0cmVhbS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlRGVmZXJfcmVjZWl2ZTogdGhpcy51cGRhdGVEZWZlcl9yZWNlaXZlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVBbGxBdWRpb1N0cmVhbXM6IHRoaXMudXBkYXRlQWxsQXVkaW9TdHJlYW1zLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZW1vdGVTY3JlZW5TdHJlYW06IHRoaXMudXBkYXRlUmVtb3RlU2NyZWVuU3RyZWFtLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVTY3JlZW5Qcm9kdWNlcjogdGhpcy51cGRhdGVTY3JlZW5Qcm9kdWNlci5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlR290QWxsVmlkczogdGhpcy51cGRhdGVHb3RBbGxWaWRzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVQYWdpbmF0aW9uSGVpZ2h0V2lkdGg6IHRoaXMudXBkYXRlUGFnaW5hdGlvbkhlaWdodFdpZHRoLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVQYWdpbmF0aW9uRGlyZWN0aW9uOiB0aGlzLnVwZGF0ZVBhZ2luYXRpb25EaXJlY3Rpb24uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUdyaWRTaXplczogdGhpcy51cGRhdGVHcmlkU2l6ZXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVNjcmVlbkZvcmNlRnVsbERpc3BsYXk6IHRoaXMudXBkYXRlU2NyZWVuRm9yY2VGdWxsRGlzcGxheS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTWFpbkdyaWRTdHJlYW06IHRoaXMudXBkYXRlTWFpbkdyaWRTdHJlYW0uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZU90aGVyR3JpZFN0cmVhbXM6IHRoaXMudXBkYXRlT3RoZXJHcmlkU3RyZWFtcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQXVkaW9Pbmx5U3RyZWFtczogdGhpcy51cGRhdGVBdWRpb09ubHlTdHJlYW1zLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVWaWRlb0lucHV0czogdGhpcy51cGRhdGVWaWRlb0lucHV0cy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQXVkaW9JbnB1dHM6IHRoaXMudXBkYXRlQXVkaW9JbnB1dHMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZU1lZXRpbmdQcm9ncmVzc1RpbWU6IHRoaXMudXBkYXRlTWVldGluZ1Byb2dyZXNzVGltZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTWVldGluZ0VsYXBzZWRUaW1lOiB0aGlzLnVwZGF0ZU1lZXRpbmdFbGFwc2VkVGltZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVmX3BhcnRpY2lwYW50czogdGhpcy51cGRhdGVSZWZfcGFydGljaXBhbnRzLmJpbmQodGhpcyksXG5cbiAgICAgIHVwZGF0ZU1lc3NhZ2VzOiB0aGlzLnVwZGF0ZU1lc3NhZ2VzLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVTdGFydERpcmVjdE1lc3NhZ2U6IHRoaXMudXBkYXRlU3RhcnREaXJlY3RNZXNzYWdlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVEaXJlY3RNZXNzYWdlRGV0YWlsczogdGhpcy51cGRhdGVEaXJlY3RNZXNzYWdlRGV0YWlscy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlU2hvd01lc3NhZ2VzQmFkZ2U6IHRoaXMudXBkYXRlU2hvd01lc3NhZ2VzQmFkZ2UuYmluZCh0aGlzKSxcblxuICAgICAgLy8gRXZlbnQgc2V0dGluZ3NcbiAgICAgIHVwZGF0ZUF1ZGlvU2V0dGluZzogdGhpcy51cGRhdGVBdWRpb1NldHRpbmcuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVZpZGVvU2V0dGluZzogdGhpcy51cGRhdGVWaWRlb1NldHRpbmcuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVNjcmVlbnNoYXJlU2V0dGluZzogdGhpcy51cGRhdGVTY3JlZW5zaGFyZVNldHRpbmcuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUNoYXRTZXR0aW5nOiB0aGlzLnVwZGF0ZUNoYXRTZXR0aW5nLmJpbmQodGhpcyksXG5cbiAgICAgIC8vIERpc3BsYXkgc2V0dGluZ3NcbiAgICAgIHVwZGF0ZUF1dG9XYXZlOiB0aGlzLnVwZGF0ZUF1dG9XYXZlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVGb3JjZUZ1bGxEaXNwbGF5OiB0aGlzLnVwZGF0ZUZvcmNlRnVsbERpc3BsYXkuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVByZXZGb3JjZUZ1bGxEaXNwbGF5OiB0aGlzLnVwZGF0ZVByZXZGb3JjZUZ1bGxEaXNwbGF5LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVQcmV2TWVldGluZ0Rpc3BsYXlUeXBlOiB0aGlzLnVwZGF0ZVByZXZNZWV0aW5nRGlzcGxheVR5cGUuYmluZCh0aGlzKSxcblxuICAgICAgLy8gV2FpdGluZyByb29tXG4gICAgICB1cGRhdGVXYWl0aW5nUm9vbUZpbHRlcjogdGhpcy51cGRhdGVXYWl0aW5nUm9vbUZpbHRlci5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlV2FpdGluZ1Jvb21MaXN0OiB0aGlzLnVwZGF0ZVdhaXRpbmdSb29tTGlzdC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlV2FpdGluZ1Jvb21Db3VudGVyOiB0aGlzLnVwZGF0ZVdhaXRpbmdSb29tQ291bnRlci5iaW5kKHRoaXMpLFxuXG4gICAgICAvLyBSZXF1ZXN0c1xuICAgICAgdXBkYXRlUmVxdWVzdEZpbHRlcjogdGhpcy51cGRhdGVSZXF1ZXN0RmlsdGVyLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZXF1ZXN0TGlzdDogdGhpcy51cGRhdGVSZXF1ZXN0TGlzdC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVxdWVzdENvdW50ZXI6IHRoaXMudXBkYXRlUmVxdWVzdENvdW50ZXIuYmluZCh0aGlzKSxcblxuICAgICAgLy8gVG90YWwgcmVxdWVzdHMgYW5kIHdhaXRpbmcgcm9vbVxuICAgICAgdXBkYXRlVG90YWxSZXFXYWl0OiB0aGlzLnVwZGF0ZVRvdGFsUmVxV2FpdC5iaW5kKHRoaXMpLFxuXG4gICAgICAvLyBNZW51IG1vZGFsc1xuICAgICAgdXBkYXRlSXNNZW51TW9kYWxWaXNpYmxlOiB0aGlzLnVwZGF0ZUlzTWVudU1vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlSXNSZWNvcmRpbmdNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNSZWNvcmRpbmdNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUlzU2V0dGluZ3NNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNTZXR0aW5nc01vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlSXNSZXF1ZXN0c01vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc1JlcXVlc3RzTW9kYWxWaXNpYmxlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVJc1dhaXRpbmdNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNXYWl0aW5nTW9kYWxWaXNpYmxlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVJc0NvSG9zdE1vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc0NvSG9zdE1vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlSXNNZWRpYVNldHRpbmdzTW9kYWxWaXNpYmxlOiB0aGlzLnVwZGF0ZUlzTWVkaWFTZXR0aW5nc01vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlSXNEaXNwbGF5U2V0dGluZ3NNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNEaXNwbGF5U2V0dGluZ3NNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcblxuICAgICAgLy8gT3RoZXIgbW9kYWxzXG4gICAgICB1cGRhdGVJc1BhcnRpY2lwYW50c01vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc1BhcnRpY2lwYW50c01vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlSXNNZXNzYWdlc01vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc01lc3NhZ2VzTW9kYWxWaXNpYmxlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVJc0NvbmZpcm1FeGl0TW9kYWxWaXNpYmxlOiB0aGlzLnVwZGF0ZUlzQ29uZmlybUV4aXRNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUlzQ29uZmlybUhlcmVNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNDb25maXJtSGVyZU1vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlSXNMb2FkaW5nTW9kYWxWaXNpYmxlOiB0aGlzLnVwZGF0ZUlzTG9hZGluZ01vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuXG4gICAgICAvLyBSZWNvcmRpbmcgT3B0aW9uc1xuICAgICAgdXBkYXRlUmVjb3JkaW5nTWVkaWFPcHRpb25zOiB0aGlzLnVwZGF0ZVJlY29yZGluZ01lZGlhT3B0aW9ucy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nQXVkaW9PcHRpb25zOiB0aGlzLnVwZGF0ZVJlY29yZGluZ0F1ZGlvT3B0aW9ucy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nVmlkZW9PcHRpb25zOiB0aGlzLnVwZGF0ZVJlY29yZGluZ1ZpZGVvT3B0aW9ucy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nVmlkZW9UeXBlOiB0aGlzLnVwZGF0ZVJlY29yZGluZ1ZpZGVvVHlwZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nVmlkZW9PcHRpbWl6ZWQ6IHRoaXMudXBkYXRlUmVjb3JkaW5nVmlkZW9PcHRpbWl6ZWQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ0Rpc3BsYXlUeXBlOiB0aGlzLnVwZGF0ZVJlY29yZGluZ0Rpc3BsYXlUeXBlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRpbmdBZGRITFM6IHRoaXMudXBkYXRlUmVjb3JkaW5nQWRkSExTLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRpbmdBZGRUZXh0OiB0aGlzLnVwZGF0ZVJlY29yZGluZ0FkZFRleHQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ0N1c3RvbVRleHQ6IHRoaXMudXBkYXRlUmVjb3JkaW5nQ3VzdG9tVGV4dC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nQ3VzdG9tVGV4dFBvc2l0aW9uOiB0aGlzLnVwZGF0ZVJlY29yZGluZ0N1c3RvbVRleHRQb3NpdGlvbi5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nQ3VzdG9tVGV4dENvbG9yOiB0aGlzLnVwZGF0ZVJlY29yZGluZ0N1c3RvbVRleHRDb2xvci5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nTmFtZVRhZ3M6IHRoaXMudXBkYXRlUmVjb3JkaW5nTmFtZVRhZ3MuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ0JhY2tncm91bmRDb2xvcjogdGhpcy51cGRhdGVSZWNvcmRpbmdCYWNrZ3JvdW5kQ29sb3IuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ05hbWVUYWdzQ29sb3I6IHRoaXMudXBkYXRlUmVjb3JkaW5nTmFtZVRhZ3NDb2xvci5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nT3JpZW50YXRpb25WaWRlbzogdGhpcy51cGRhdGVSZWNvcmRpbmdPcmllbnRhdGlvblZpZGVvLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVDbGVhcmVkVG9SZXN1bWU6IHRoaXMudXBkYXRlQ2xlYXJlZFRvUmVzdW1lLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVDbGVhcmVkVG9SZWNvcmQ6IHRoaXMudXBkYXRlQ2xlYXJlZFRvUmVjb3JkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVSZWNvcmRTdGF0ZTogdGhpcy51cGRhdGVSZWNvcmRTdGF0ZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlU2hvd1JlY29yZEJ1dHRvbnM6IHRoaXMudXBkYXRlU2hvd1JlY29yZEJ1dHRvbnMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ1Byb2dyZXNzVGltZTogdGhpcy51cGRhdGVSZWNvcmRpbmdQcm9ncmVzc1RpbWUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUF1ZGlvU3dpdGNoaW5nOiB0aGlzLnVwZGF0ZUF1ZGlvU3dpdGNoaW5nLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVWaWRlb1N3aXRjaGluZzogdGhpcy51cGRhdGVWaWRlb1N3aXRjaGluZy5iaW5kKHRoaXMpLFxuXG4gICAgICAvLyBNZWRpYSBzdGF0ZXNcbiAgICAgIHVwZGF0ZVZpZGVvQWxyZWFkeU9uOiB0aGlzLnVwZGF0ZVZpZGVvQWxyZWFkeU9uLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVBdWRpb0FscmVhZHlPbjogdGhpcy51cGRhdGVBdWRpb0FscmVhZHlPbi5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQ29tcG9uZW50U2l6ZXM6IHRoaXMudXBkYXRlQ29tcG9uZW50U2l6ZXMuYmluZCh0aGlzKSxcblxuICAgICAgLy8gUGVybWlzc2lvbnNcbiAgICAgIHVwZGF0ZUhhc0NhbWVyYVBlcm1pc3Npb246IHRoaXMudXBkYXRlSGFzQ2FtZXJhUGVybWlzc2lvbi5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlSGFzQXVkaW9QZXJtaXNzaW9uOiB0aGlzLnVwZGF0ZUhhc0F1ZGlvUGVybWlzc2lvbi5iaW5kKHRoaXMpLFxuXG4gICAgICAvLyBUcmFuc3BvcnRzXG4gICAgICB1cGRhdGVUcmFuc3BvcnRDcmVhdGVkOiB0aGlzLnVwZGF0ZVRyYW5zcG9ydENyZWF0ZWQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVRyYW5zcG9ydENyZWF0ZWRWaWRlbzogdGhpcy51cGRhdGVUcmFuc3BvcnRDcmVhdGVkVmlkZW8uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVRyYW5zcG9ydENyZWF0ZWRBdWRpbzogdGhpcy51cGRhdGVUcmFuc3BvcnRDcmVhdGVkQXVkaW8uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVRyYW5zcG9ydENyZWF0ZWRTY3JlZW46IHRoaXMudXBkYXRlVHJhbnNwb3J0Q3JlYXRlZFNjcmVlbi5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUHJvZHVjZXJUcmFuc3BvcnQ6IHRoaXMudXBkYXRlUHJvZHVjZXJUcmFuc3BvcnQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVZpZGVvUHJvZHVjZXI6IHRoaXMudXBkYXRlVmlkZW9Qcm9kdWNlci5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUGFyYW1zOiB0aGlzLnVwZGF0ZVBhcmFtcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlVmlkZW9QYXJhbXM6IHRoaXMudXBkYXRlVmlkZW9QYXJhbXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUF1ZGlvUGFyYW1zOiB0aGlzLnVwZGF0ZUF1ZGlvUGFyYW1zLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVBdWRpb1Byb2R1Y2VyOiB0aGlzLnVwZGF0ZUF1ZGlvUHJvZHVjZXIuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUNvbnN1bWVyVHJhbnNwb3J0czogdGhpcy51cGRhdGVDb25zdW1lclRyYW5zcG9ydHMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUNvbnN1bWluZ1RyYW5zcG9ydHM6IHRoaXMudXBkYXRlQ29uc3VtaW5nVHJhbnNwb3J0cy5iaW5kKHRoaXMpLFxuXG4gICAgICAvLyBQb2xsc1xuICAgICAgdXBkYXRlUG9sbHM6IHRoaXMudXBkYXRlUG9sbHMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVBvbGw6IHRoaXMudXBkYXRlUG9sbC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlSXNQb2xsTW9kYWxWaXNpYmxlOiB0aGlzLnVwZGF0ZUlzUG9sbE1vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuXG4gICAgICAvLyBCYWNrZ3JvdW5kXG4gICAgICB1cGRhdGVDdXN0b21JbWFnZTogdGhpcy51cGRhdGVDdXN0b21JbWFnZS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlU2VsZWN0ZWRJbWFnZTogdGhpcy51cGRhdGVTZWxlY3RlZEltYWdlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVTZWdtZW50VmlkZW86IHRoaXMudXBkYXRlU2VnbWVudFZpZGVvLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVTZWxmaWVTZWdtZW50YXRpb246IHRoaXMudXBkYXRlU2VsZmllU2VnbWVudGF0aW9uLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVQYXVzZVNlZ21lbnRhdGlvbjogdGhpcy51cGRhdGVQYXVzZVNlZ21lbnRhdGlvbi5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUHJvY2Vzc2VkU3RyZWFtOiB0aGlzLnVwZGF0ZVByb2Nlc3NlZFN0cmVhbS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlS2VlcEJhY2tncm91bmQ6IHRoaXMudXBkYXRlS2VlcEJhY2tncm91bmQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUJhY2tncm91bmRIYXNDaGFuZ2VkOiB0aGlzLnVwZGF0ZUJhY2tncm91bmRIYXNDaGFuZ2VkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVWaXJ0dWFsU3RyZWFtOiB0aGlzLnVwZGF0ZVZpcnR1YWxTdHJlYW0uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZU1haW5DYW52YXM6IHRoaXMudXBkYXRlTWFpbkNhbnZhcy5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlUHJldktlZXBCYWNrZ3JvdW5kOiB0aGlzLnVwZGF0ZVByZXZLZWVwQmFja2dyb3VuZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQXBwbGllZEJhY2tncm91bmQ6IHRoaXMudXBkYXRlQXBwbGllZEJhY2tncm91bmQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUlzQmFja2dyb3VuZE1vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc0JhY2tncm91bmRNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUF1dG9DbGlja0JhY2tncm91bmQ6IHRoaXMudXBkYXRlQXV0b0NsaWNrQmFja2dyb3VuZC5iaW5kKHRoaXMpLFxuXG4gICAgICAvLyBCcmVha291dCByb29tc1xuICAgICAgdXBkYXRlQnJlYWtvdXRSb29tczogdGhpcy51cGRhdGVCcmVha291dFJvb21zLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVDdXJyZW50Um9vbUluZGV4OiB0aGlzLnVwZGF0ZUN1cnJlbnRSb29tSW5kZXguYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUNhblN0YXJ0QnJlYWtvdXQ6IHRoaXMudXBkYXRlQ2FuU3RhcnRCcmVha291dC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQnJlYWtPdXRSb29tU3RhcnRlZDogdGhpcy51cGRhdGVCcmVha091dFJvb21TdGFydGVkLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVCcmVha091dFJvb21FbmRlZDogdGhpcy51cGRhdGVCcmVha091dFJvb21FbmRlZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlSG9zdE5ld1Jvb206IHRoaXMudXBkYXRlSG9zdE5ld1Jvb20uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUxpbWl0ZWRCcmVha1Jvb206IHRoaXMudXBkYXRlTGltaXRlZEJyZWFrUm9vbS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTWFpblJvb21zTGVuZ3RoOiB0aGlzLnVwZGF0ZU1haW5Sb29tc0xlbmd0aC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlTWVtYmVyUm9vbTogdGhpcy51cGRhdGVNZW1iZXJSb29tLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVJc0JyZWFrb3V0Um9vbXNNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNCcmVha291dFJvb21zTW9kYWxWaXNpYmxlLmJpbmQodGhpcyksXG5cbiAgICAgIC8vIFdoaXRlYm9hcmRcbiAgICAgIHVwZGF0ZVdoaXRlYm9hcmRVc2VyczogdGhpcy51cGRhdGVXaGl0ZWJvYXJkVXNlcnMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUN1cnJlbnRXaGl0ZWJvYXJkSW5kZXg6IHRoaXMudXBkYXRlQ3VycmVudFdoaXRlYm9hcmRJbmRleC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlQ2FuU3RhcnRXaGl0ZWJvYXJkOiB0aGlzLnVwZGF0ZUNhblN0YXJ0V2hpdGVib2FyZC5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlV2hpdGVib2FyZFN0YXJ0ZWQ6IHRoaXMudXBkYXRlV2hpdGVib2FyZFN0YXJ0ZWQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVdoaXRlYm9hcmRFbmRlZDogdGhpcy51cGRhdGVXaGl0ZWJvYXJkRW5kZWQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVdoaXRlYm9hcmRMaW1pdDogdGhpcy51cGRhdGVXaGl0ZWJvYXJkTGltaXQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUlzV2hpdGVib2FyZE1vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc1doaXRlYm9hcmRNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUlzQ29uZmlndXJlV2hpdGVib2FyZE1vZGFsVmlzaWJsZTpcbiAgICAgICAgdGhpcy51cGRhdGVJc0NvbmZpZ3VyZVdoaXRlYm9hcmRNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVNoYXBlczogdGhpcy51cGRhdGVTaGFwZXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVVzZUltYWdlQmFja2dyb3VuZDogdGhpcy51cGRhdGVVc2VJbWFnZUJhY2tncm91bmQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVJlZG9TdGFjazogdGhpcy51cGRhdGVSZWRvU3RhY2suYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVVuZG9TdGFjazogdGhpcy51cGRhdGVVbmRvU3RhY2suYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUNhbnZhc1N0cmVhbTogdGhpcy51cGRhdGVDYW52YXNTdHJlYW0uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUNhbnZhc1doaXRlYm9hcmQ6IHRoaXMudXBkYXRlQ2FudmFzV2hpdGVib2FyZC5iaW5kKHRoaXMpLFxuXG4gICAgICAvLyBTY3JlZW5ib2FyZFxuICAgICAgdXBkYXRlQ2FudmFzU2NyZWVuYm9hcmQ6IHRoaXMudXBkYXRlQ2FudmFzU2NyZWVuYm9hcmQuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVByb2Nlc3NlZFNjcmVlblN0cmVhbTogdGhpcy51cGRhdGVQcm9jZXNzZWRTY3JlZW5TdHJlYW0uYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUFubm90YXRlU2NyZWVuU3RyZWFtOiB0aGlzLnVwZGF0ZUFubm90YXRlU2NyZWVuU3RyZWFtLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVNYWluU2NyZWVuQ2FudmFzOiB0aGlzLnVwZGF0ZU1haW5TY3JlZW5DYW52YXMuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZUlzU2NyZWVuYm9hcmRNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNTY3JlZW5ib2FyZE1vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuXG4gICAgICAvLyBPdGhlciBmdW5jdGlvbnNcbiAgICAgIGNoZWNrT3JpZW50YXRpb246IHRoaXMuY2hlY2tPcmllbnRhdGlvbi5iaW5kKHRoaXMpLFxuXG4gICAgICB1cGRhdGVEZXZpY2U6IHRoaXMudXBkYXRlRGV2aWNlLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVTb2NrZXQ6IHRoaXMudXBkYXRlU29ja2V0LmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVWYWxpZGF0ZWQ6IHRoaXMudXBkYXRlVmFsaWRhdGVkLmJpbmQodGhpcyksXG5cbiAgICAgIHNob3dBbGVydDogdGhpcy5zaG93QWxlcnQuYmluZCh0aGlzKSxcbiAgICAgIGdldFVwZGF0ZWRBbGxQYXJhbXM6ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAuLi50aGlzLmdldEFsbFBhcmFtcygpLFxuICAgICAgICAgIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSxcbiAgICAgICAgfTtcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuXG4gIG1lZGlhU0ZVUGFyYW1ldGVycyA9IHtcbiAgICAuLi50aGlzLmdldEFsbFBhcmFtcygpLFxuICAgIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSxcbiAgfTtcblxuICBnZXRVcGRhdGVkQWxsUGFyYW1zID0gKCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAuLi50aGlzLmdldEFsbFBhcmFtcygpLFxuICAgICAgLi4udGhpcy5tZWRpYVNGVUZ1bmN0aW9ucygpLFxuICAgIH07XG4gIH07XG5cbiAgUHJlam9pblBhZ2VDb21wb25lbnQ6IGFueSA9IHtcbiAgICBjb21wb25lbnQ6IHRoaXMuUHJlam9pblBhZ2UsXG4gICAgaW5qZWN0b3I6IG51bGwsXG4gIH07XG5cbiAgdXBkYXRlUHJlam9pblBhZ2VDb21wb25lbnQgPSAoKSA9PiB7XG4gICAgY29uc3QgUHJlam9pbkNvbXAgPSB7XG4gICAgICBjb21wb25lbnQ6IHRoaXMuUHJlam9pblBhZ2UsXG4gICAgICBpbmplY3RvcjogdGhpcy5jcmVhdGVJbmplY3Rvcih7XG4gICAgICAgIHBhcmFtZXRlcnM6IHtcbiAgICAgICAgICBzaG93QWxlcnQ6XG4gICAgICAgICAgICB0aGlzLnNob3dBbGVydCB8fFxuICAgICAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3Nob3dBbGVydCBub3QgZGVmaW5lZCcpO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgdXBkYXRlSXNMb2FkaW5nTW9kYWxWaXNpYmxlOiB0aGlzLnVwZGF0ZUlzTG9hZGluZ01vZGFsVmlzaWJsZSxcbiAgICAgICAgICBjb25uZWN0U29ja2V0OiB0aGlzLnNvY2tldE1hbmFnZXIuY29ubmVjdFNvY2tldCxcbiAgICAgICAgICB1cGRhdGVTb2NrZXQ6IHRoaXMudXBkYXRlU29ja2V0LFxuICAgICAgICAgIHVwZGF0ZVZhbGlkYXRlZDogdGhpcy51cGRhdGVWYWxpZGF0ZWQsXG4gICAgICAgICAgdXBkYXRlQXBpVXNlck5hbWU6IHRoaXMudXBkYXRlQXBpVXNlck5hbWUsXG4gICAgICAgICAgdXBkYXRlQXBpVG9rZW46IHRoaXMudXBkYXRlQXBpVG9rZW4sXG4gICAgICAgICAgdXBkYXRlTGluazogdGhpcy51cGRhdGVMaW5rLFxuICAgICAgICAgIHVwZGF0ZVJvb21OYW1lOiB0aGlzLnVwZGF0ZVJvb21OYW1lLFxuICAgICAgICAgIHVwZGF0ZU1lbWJlcjogdGhpcy51cGRhdGVNZW1iZXIsXG4gICAgICAgIH0sXG4gICAgICAgIGNyZWRlbnRpYWxzOiB0aGlzLmNyZWRlbnRpYWxzLFxuICAgICAgfSksXG4gICAgfTtcblxuICAgIHRoaXMuUHJlam9pblBhZ2VDb21wb25lbnQgPSB7IC4uLlByZWpvaW5Db21wIH07XG5cbiAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gIH07XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMuUHJlam9pblBhZ2UpIHtcbiAgICAgIHRoaXMudXBkYXRlUHJlam9pblBhZ2VDb21wb25lbnQoKTtcbiAgICB9XG5cbiAgICB0aGlzLnNldHVwUmVzaXplTGlzdGVuZXIoKTtcbiAgICBpZiAodGhpcy52YWxpZGF0ZWQpIHtcbiAgICAgIHRoaXMuY29ubmVjdEFuZEFkZFNvY2tldE1ldGhvZHMoKTtcbiAgICB9XG5cbiAgICB0aGlzLm1haW5IZWlnaHRXaWR0aFN1YnNjcmlwdGlvbiA9IHRoaXMubWFpbkhlaWdodFdpZHRoLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLnVwZGF0ZU1haW5WaWRlb1NpemUoKTtcbiAgICB9KTtcblxuICAgIHRoaXMucmVjb3JkaW5nU3Vic2NyaXB0aW9uID0gY29tYmluZUxhdGVzdChbXG4gICAgICB0aGlzLnJlY29yZFBhdXNlZCxcbiAgICAgIHRoaXMucmVjb3JkU3RhcnRlZCxcbiAgICAgIHRoaXMucmVjb3JkU3RvcHBlZCxcbiAgICAgIHRoaXMucmVjb3JkUmVzdW1lZCxcbiAgICAgIHRoaXMucmVjb3JkaW5nUHJvZ3Jlc3NUaW1lLFxuICAgICAgdGhpcy5zaG93UmVjb3JkQnV0dG9ucyxcbiAgICAgIHRoaXMuaXNsZXZlbCxcbiAgICBdKS5zdWJzY3JpYmUoXG4gICAgICAoW1xuICAgICAgICByZWNvcmRQYXVzZWQsXG4gICAgICAgIHJlY29yZFN0YXJ0ZWQsXG4gICAgICAgIHJlY29yZFN0b3BwZWQsXG4gICAgICAgIHJlY29yZFJlc3VtZWQsXG4gICAgICAgIHJlY29yZGluZ1Byb2dyZXNzVGltZSxcbiAgICAgICAgc2hvd1JlY29yZEJ1dHRvbnMsXG4gICAgICAgIGlzbGV2ZWwsXG4gICAgICBdKSA9PiB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICByZWNvcmRQYXVzZWQgfHxcbiAgICAgICAgICByZWNvcmRTdGFydGVkIHx8XG4gICAgICAgICAgcmVjb3JkU3RvcHBlZCB8fFxuICAgICAgICAgIHJlY29yZFJlc3VtZWQgfHxcbiAgICAgICAgICByZWNvcmRpbmdQcm9ncmVzc1RpbWUgfHxcbiAgICAgICAgICBzaG93UmVjb3JkQnV0dG9ucyB8fFxuICAgICAgICAgIGlzbGV2ZWxcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy51cGRhdGVSZWNvcmRCdXR0b25zKCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgKTtcbiAgICB0aGlzLnZhbGlkYXRlZFN1YnNjcmlwdGlvbiA9IHRoaXMudmFsaWRhdGVkLnN1YnNjcmliZSgodmFsaWRhdGVkKSA9PiB7XG4gICAgICBpZiAodmFsaWRhdGVkKSB7XG4gICAgICAgIHRoaXMuaGFuZGxlVmFsaWRhdGVkKCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5pc2xldmVsU3Vic2NyaXB0aW9uID0gdGhpcy5pc2xldmVsLnN1YnNjcmliZSgoaXNsZXZlbCkgPT4ge1xuICAgICAgaWYgKGlzbGV2ZWwpIHtcbiAgICAgICAgdGhpcy51cGRhdGVDb250cm9sQnJvYWRjYXN0QnV0dG9ucygpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuY29Ib3N0U3Vic2NyaXB0aW9uID0gY29tYmluZUxhdGVzdChbdGhpcy5jb0hvc3QsIHRoaXMuY29Ib3N0UmVzcG9uc2liaWxpdHldKS5zdWJzY3JpYmUoXG4gICAgICAoW2NvSG9zdCwgY29Ib3N0UmVzcG9uc2liaWxpdHldKSA9PiB7XG4gICAgICAgIGlmIChjb0hvc3QgfHwgY29Ib3N0UmVzcG9uc2liaWxpdHkpIHtcbiAgICAgICAgICB0aGlzLnVwZGF0ZUNvbnRyb2xCcm9hZGNhc3RCdXR0b25zKCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgKTtcblxuICAgIC8vIFN1YnNjcmliZSB0byBjaGFuZ2VzIGluIEJlaGF2aW9yU3ViamVjdCBhbmQgdXBkYXRlIHRoZSBidXR0b25zIGFjY29yZGluZ2x5XG4gICAgdGhpcy5idXR0b25TdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLm1pY0FjdGl2ZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLnVwZGF0ZUNvbnRyb2xCcm9hZGNhc3RCdXR0b25zKCk7XG4gICAgICB9KSxcbiAgICApO1xuXG4gICAgdGhpcy5idXR0b25TdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLnZpZGVvQWN0aXZlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMudXBkYXRlQ29udHJvbEJyb2FkY2FzdEJ1dHRvbnMoKTtcbiAgICAgIH0pLFxuICAgICk7XG5cbiAgICB0aGlzLmJ1dHRvblN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMucGFydGljaXBhbnRzQ291bnRlci5zdWJzY3JpYmUoKHZhbHVlKSA9PiB7XG4gICAgICAgIHRoaXMudXBkYXRlTWVudVBhcnRpY2lwYW50c1dpZGdldCh2YWx1ZSk7XG4gICAgICB9KSxcbiAgICApO1xuXG4gICAgdGhpcy5tZWRpYVNGVVBhcmFtZXRlcnMgPSB7XG4gICAgICAuLi50aGlzLmdldEFsbFBhcmFtcygpLFxuICAgICAgLi4udGhpcy5tZWRpYVNGVUZ1bmN0aW9ucygpLFxuICAgIH07XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5oYW5kbGVSZXNpemUpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdvcmllbnRhdGlvbmNoYW5nZScsIHRoaXMuaGFuZGxlUmVzaXplKTtcbiAgICBpZiAodGhpcy5tYWluSGVpZ2h0V2lkdGhTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMubWFpbkhlaWdodFdpZHRoU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnZhbGlkYXRlZFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy52YWxpZGF0ZWRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuaXNsZXZlbFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5pc2xldmVsU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLmNvSG9zdFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5jb0hvc3RTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuU2NyZWVuYm9hcmRTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuU2NyZWVuYm9hcmRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucmVjb3JkaW5nU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnJlY29yZGluZ1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZU1haW5WaWRlb1NpemUgPSBhc3luYyAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLmxvY2tfc2NyZWVuLnZhbHVlICYmICF0aGlzLnNoYXJlZC52YWx1ZSkge1xuICAgICAgdGhpcy5wcmVwb3B1bGF0ZVVzZXJNZWRpYS5wcmVwb3B1bGF0ZVVzZXJNZWRpYSh7XG4gICAgICAgIG5hbWU6IHRoaXMuaG9zdExhYmVsLnZhbHVlLFxuICAgICAgICBwYXJhbWV0ZXJzOiB7IC4uLnRoaXMuZ2V0QWxsUGFyYW1zKCksIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSB9LFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghdGhpcy5maXJzdF9yb3VuZC52YWx1ZSkge1xuICAgICAgICB0aGlzLnByZXBvcHVsYXRlVXNlck1lZGlhLnByZXBvcHVsYXRlVXNlck1lZGlhKHtcbiAgICAgICAgICBuYW1lOiB0aGlzLmhvc3RMYWJlbC52YWx1ZSxcbiAgICAgICAgICBwYXJhbWV0ZXJzOiB7IC4uLnRoaXMuZ2V0QWxsUGFyYW1zKCksIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSB9LFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgYXN5bmMgY29ubmVjdEFuZEFkZFNvY2tldE1ldGhvZHMoKSB7XG4gICAgdGhpcy5tZWRpYVNGVVBhcmFtZXRlcnMgPSB7XG4gICAgICAuLi50aGlzLmdldEFsbFBhcmFtcygpLFxuICAgICAgLi4udGhpcy5tZWRpYVNGVUZ1bmN0aW9ucygpLFxuICAgIH07XG4gICAgY29uc3Qgc29ja2V0XyA9IGF3YWl0IHRoaXMuY29ubmVjdF9Tb2NrZXQodGhpcy5hcGlVc2VyTmFtZS52YWx1ZSwgJycsIHRoaXMuYXBpVG9rZW4udmFsdWUpO1xuICAgIGlmIChzb2NrZXRfKSB7XG4gICAgICB0aGlzLnVwZGF0ZVNvY2tldChzb2NrZXRfKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBoYW5kbGVWYWxpZGF0ZWQoKSB7XG4gICAgdGhpcy51cGRhdGVBbGxWaWRlb1N0cmVhbXMoW1xuICAgICAgeyBwcm9kdWNlcklkOiAneW91eW91Jywgc3RyZWFtOiB1bmRlZmluZWQsIGlkOiAneW91eW91JywgbmFtZTogJ3lvdXlvdScgfSxcbiAgICBdKTtcblxuICAgIHRoaXMudXBkYXRlU3RyZWFtTmFtZXMoW3sgaWQ6ICd5b3V5b3UnLCBuYW1lOiAneW91eW91JywgcHJvZHVjZXJJZDogJycgfV0pO1xuXG4gICAgaWYgKHRoaXMudmFsaWRhdGVkLnZhbHVlKSB7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICghdGhpcy5sb2NhbFVJTW9kZS52YWx1ZSkge1xuICAgICAgICAgIGF3YWl0IHRoaXMuY29ubmVjdEFuZEFkZFNvY2tldE1ldGhvZHMoKTtcbiAgICAgICAgICB0aGlzLnVwZGF0ZUlzTG9hZGluZ01vZGFsVmlzaWJsZSh0cnVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnVwZGF0ZUlzTG9hZGluZ01vZGFsVmlzaWJsZShmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdlcnJvciBjb25uZWN0QW5kYUFkZFNvY2tldE1ldGhvZHMnLCBlcnJvcik7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc3RhcnRNZWV0aW5nUHJvZ3Jlc3NUaW1lci5zdGFydE1lZXRpbmdQcm9ncmVzc1RpbWVyKHtcbiAgICAgICAgc3RhcnRUaW1lOiBEYXRlLm5vdygpIC8gMTAwMCxcbiAgICAgICAgcGFyYW1ldGVyczogeyAuLi50aGlzLmdldEFsbFBhcmFtcygpLCAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCkgfSxcbiAgICAgIH0pO1xuXG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScpXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpvcmllbnRhdGlvbmNoYW5nZScpXG4gIGFzeW5jIGhhbmRsZVJlc2l6ZSgpIHtcbiAgICBsZXQgZnJhY3Rpb24gPSAwO1xuXG4gICAgaWYgKFxuICAgICAgd2luZG93LmlubmVySGVpZ2h0IDwgd2luZG93LmlubmVyV2lkdGggJiZcbiAgICAgICh0aGlzLmV2ZW50VHlwZS52YWx1ZSA9PSAnd2ViaW5hcicgfHwgdGhpcy5ldmVudFR5cGUudmFsdWUgPT0gJ2NvbmZlcmVuY2UnKVxuICAgICkge1xuICAgICAgY29uc3QgY3VycmVudEhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgIGZyYWN0aW9uID0gTnVtYmVyKCg0MCAvIGN1cnJlbnRIZWlnaHQpLnRvRml4ZWQoMykpO1xuICAgICAgaWYgKGZyYWN0aW9uICE9IHRoaXMuY29udHJvbEhlaWdodC52YWx1ZSkge1xuICAgICAgICB0aGlzLnVwZGF0ZUNvbnRyb2xIZWlnaHQoTnVtYmVyKGZyYWN0aW9uKSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFNldCBkZWZhdWx0IGNvbnRyb2wgYnV0dG9uIGhlaWdodCBmb3IgcG9ydHJhaXQgbW9kZSBvciBvdGhlciBldmVudCB0eXBlc1xuICAgICAgY29uc3QgY3VycmVudEhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgIGZyYWN0aW9uID0gTnVtYmVyKCg0MCAvIGN1cnJlbnRIZWlnaHQpLnRvRml4ZWQoMykpO1xuICAgICAgZnJhY3Rpb24gPSBOdW1iZXIoZnJhY3Rpb24pO1xuICAgICAgaWYgKGZyYWN0aW9uICE9IHRoaXMuY29udHJvbEhlaWdodC52YWx1ZSkge1xuICAgICAgICB0aGlzLnVwZGF0ZUNvbnRyb2xIZWlnaHQoTnVtYmVyKGZyYWN0aW9uKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgZGltZW5zaW9ucyA9IHRoaXMuY29tcHV0ZURpbWVuc2lvbnNNZXRob2Qoe1xuICAgICAgY29udGFpbmVyV2lkdGhGcmFjdGlvbjogMSxcbiAgICAgIGNvbnRhaW5lckhlaWdodEZyYWN0aW9uOiAxLFxuICAgICAgbWFpblNpemU6IHRoaXMubWFpbkhlaWdodFdpZHRoLnZhbHVlLFxuICAgICAgZG9TdGFjazogdHJ1ZSxcbiAgICAgIGRlZmF1bHRGcmFjdGlvbjpcbiAgICAgICAgdGhpcy5ldmVudFR5cGUudmFsdWUgPT0gJ3dlYmluYXInIHx8IHRoaXMuZXZlbnRUeXBlLnZhbHVlID09ICdjb25mZXJlbmNlJ1xuICAgICAgICAgID8gMSAtIGZyYWN0aW9uXG4gICAgICAgICAgOiAxLFxuICAgIH0pO1xuXG4gICAgdGhpcy51cGRhdGVDb21wb25lbnRTaXplcyhkaW1lbnNpb25zKTtcblxuICAgIGNvbnN0IG9yaWVudGF0aW9uID0gdGhpcy5jaGVja09yaWVudGF0aW9uKCk7XG4gICAgaWYgKG9yaWVudGF0aW9uID09ICdwb3J0cmFpdCcpIHtcbiAgICAgIGlmICghdGhpcy5pc1dpZGVTY3JlZW4udmFsdWUpIHtcbiAgICAgICAgaWYgKHRoaXMuc2hhcmVTY3JlZW5TdGFydGVkLnZhbHVlIHx8IHRoaXMuc2hhcmVkLnZhbHVlKSB7XG4gICAgICAgICAgdGhpcy51cGRhdGVTY3JlZW5Gb3JjZUZ1bGxEaXNwbGF5KHRydWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gVXBkYXRlcyB0aGUgbWFpbiBncmlkIHZpZXdcbiAgICBhd2FpdCB0aGlzLnByZXBvcHVsYXRlVXNlck1lZGlhLnByZXBvcHVsYXRlVXNlck1lZGlhKHtcbiAgICAgIG5hbWU6IHRoaXMuaG9zdExhYmVsLnZhbHVlLFxuICAgICAgcGFyYW1ldGVyczogeyAuLi50aGlzLmdldEFsbFBhcmFtcygpLCAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCkgfSxcbiAgICB9KTtcbiAgICAvLyBVcGRhdGVzIHRoZSBtaW5pIGdyaWQgdmlld1xuICAgIGF3YWl0IHRoaXMub25TY3JlZW5DaGFuZ2VzLm9uU2NyZWVuQ2hhbmdlcyh7XG4gICAgICBjaGFuZ2VkOiB0cnVlLFxuICAgICAgcGFyYW1ldGVyczogeyAuLi50aGlzLmdldEFsbFBhcmFtcygpLCAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCkgfSxcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIGRpc2Nvbm5lY3RBbGxTb2NrZXRzKGNvbnN1bWVfc29ja2V0czogQ29uc3VtZVNvY2tldFtdKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgZm9yIChjb25zdCBzb2NrZXQgb2YgY29uc3VtZV9zb2NrZXRzKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBpcCA9IE9iamVjdC5rZXlzKHNvY2tldClbMF07XG4gICAgICAgIGF3YWl0IHNvY2tldFtpcF0uZGlzY29ubmVjdCgpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5sb2coYEVycm9yIGRpc2Nvbm5lY3Rpbmcgc29ja2V0IHdpdGggSVA6ICR7T2JqZWN0LmtleXMoc29ja2V0KVswXX1gLCBlcnJvcik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgY2xvc2VBbmRSZXNldCgpIHtcbiAgICAvL2Nsb3NlIGFuZCBjbGVhbiB1cCBhbGwgc29ja2V0cywgbW9kYWxzLC4uLiBhbmQgcmVzZXQgYWxsIHN0YXRlcyB0byBpbml0aWFsIHZhbHVlc1xuXG4gICAgdGhpcy51cGRhdGVJc01lc3NhZ2VzTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgICB0aGlzLnVwZGF0ZUlzUGFydGljaXBhbnRzTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgICB0aGlzLnVwZGF0ZUlzV2FpdGluZ01vZGFsVmlzaWJsZShmYWxzZSk7XG4gICAgdGhpcy51cGRhdGVJc1JlcXVlc3RzTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgICB0aGlzLnVwZGF0ZUlzQ29Ib3N0TW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgICB0aGlzLnVwZGF0ZUlzU2V0dGluZ3NNb2RhbFZpc2libGUoZmFsc2UpO1xuICAgIHRoaXMudXBkYXRlSXNEaXNwbGF5U2V0dGluZ3NNb2RhbFZpc2libGUoZmFsc2UpO1xuICAgIHRoaXMudXBkYXRlSXNNZWRpYVNldHRpbmdzTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgICB0aGlzLnVwZGF0ZUlzTWVudU1vZGFsVmlzaWJsZShmYWxzZSk7XG4gICAgdGhpcy51cGRhdGVJc1NoYXJlRXZlbnRNb2RhbFZpc2libGUoZmFsc2UpO1xuICAgIHRoaXMudXBkYXRlSXNDb25maXJtRXhpdE1vZGFsVmlzaWJsZShmYWxzZSk7XG4gICAgYXdhaXQgdGhpcy5kaXNjb25uZWN0QWxsU29ja2V0cyh0aGlzLmNvbnN1bWVfc29ja2V0cy52YWx1ZSk7XG4gICAgYXdhaXQgdGhpcy51cGRhdGVTdGF0ZXNUb0luaXRpYWxWYWx1ZXMoKTtcbiAgICB0aGlzLnVwZGF0ZU1lZXRpbmdQcm9ncmVzc1RpbWUoJzAwOjAwOjAwJyk7XG4gICAgdGhpcy51cGRhdGVNZWV0aW5nRWxhcHNlZFRpbWUoMCk7XG4gICAgdGhpcy51cGRhdGVSZWNvcmRpbmdQcm9ncmVzc1RpbWUoJzAwOjAwOjAwJyk7XG4gICAgdGhpcy51cGRhdGVSZWNvcmRFbGFwc2VkVGltZSgwKTtcbiAgICB0aGlzLnVwZGF0ZVNob3dSZWNvcmRCdXR0b25zKGZhbHNlKTtcblxuICAgIHRoaXMudXBkYXRlSXNDb25maWd1cmVXaGl0ZWJvYXJkTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgICB0aGlzLnVwZGF0ZUlzV2hpdGVib2FyZE1vZGFsVmlzaWJsZShmYWxzZSk7XG4gICAgdGhpcy51cGRhdGVJc01lbnVNb2RhbFZpc2libGUoZmFsc2UpO1xuICAgIHRoaXMudXBkYXRlSXNSZWNvcmRpbmdNb2RhbFZpc2libGUoZmFsc2UpO1xuICAgIHRoaXMudXBkYXRlSXNQb2xsTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgICB0aGlzLnVwZGF0ZUlzQnJlYWtvdXRSb29tc01vZGFsVmlzaWJsZShmYWxzZSk7XG4gICAgdGhpcy51cGRhdGVJc0JhY2tncm91bmRNb2RhbFZpc2libGUoZmFsc2UpO1xuICAgIHRoaXMudXBkYXRlSXNMb2FkaW5nTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgICB0aGlzLnVwZGF0ZUlzQ29uZmlybUhlcmVNb2RhbFZpc2libGUoZmFsc2UpO1xuXG4gICAgYXdhaXQgc2xlZXAoeyBtczogNTAwIH0pO1xuICAgIHRoaXMudXBkYXRlVmFsaWRhdGVkKGZhbHNlKTtcbiAgICAvL2lmIG9uIHdlYiwgcmVsb2FkIHRoZSBwYWdlXG4gICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICB9XG5cbiAgY29tcHV0ZURpbWVuc2lvbnNNZXRob2QgPSAoe1xuICAgIGNvbnRhaW5lcldpZHRoRnJhY3Rpb24gPSAxLFxuICAgIGNvbnRhaW5lckhlaWdodEZyYWN0aW9uID0gMSxcbiAgICBtYWluU2l6ZSxcbiAgICBkb1N0YWNrID0gdHJ1ZSxcbiAgICBkZWZhdWx0RnJhY3Rpb24sXG4gIH06IHtcbiAgICBjb250YWluZXJXaWR0aEZyYWN0aW9uPzogbnVtYmVyO1xuICAgIGNvbnRhaW5lckhlaWdodEZyYWN0aW9uPzogbnVtYmVyO1xuICAgIG1haW5TaXplOiBudW1iZXI7XG4gICAgZG9TdGFjaz86IGJvb2xlYW47XG4gICAgZGVmYXVsdEZyYWN0aW9uOiBudW1iZXI7XG4gIH0pOiBDb21wb25lbnRTaXplcyA9PiB7XG4gICAgY29uc3QgcGFyZW50V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCAqIGNvbnRhaW5lcldpZHRoRnJhY3Rpb247XG4gICAgY29uc3QgcGFyZW50SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0ICogY29udGFpbmVySGVpZ2h0RnJhY3Rpb24gKiBkZWZhdWx0RnJhY3Rpb247XG4gICAgbGV0IGlzV2lkZVNjcmVlbiA9IHBhcmVudFdpZHRoID49IDc2ODtcblxuICAgIGlmICghaXNXaWRlU2NyZWVuICYmIHBhcmVudFdpZHRoID4gMS41ICogcGFyZW50SGVpZ2h0KSB7XG4gICAgICBpc1dpZGVTY3JlZW4gPSB0cnVlO1xuICAgIH1cblxuICAgIHRoaXMudXBkYXRlSXNXaWRlU2NyZWVuKGlzV2lkZVNjcmVlbik7XG5cbiAgICBjb25zdCBkaW1lbnNpb25zID0gdGhpcy5jYWxjdWxhdGVEaW1lbnNpb25zKHtcbiAgICAgIHBhcmVudFdpZHRoLFxuICAgICAgcGFyZW50SGVpZ2h0LFxuICAgICAgaXNXaWRlU2NyZWVuLFxuICAgICAgbWFpblNpemUsXG4gICAgICBkb1N0YWNrLFxuICAgIH0pO1xuICAgIHJldHVybiBkaW1lbnNpb25zO1xuICB9O1xuXG4gIGNhbGN1bGF0ZURpbWVuc2lvbnMoe1xuICAgIHBhcmVudFdpZHRoLFxuICAgIHBhcmVudEhlaWdodCxcbiAgICBpc1dpZGVTY3JlZW4sXG4gICAgbWFpblNpemUsXG4gICAgZG9TdGFjayxcbiAgfToge1xuICAgIHBhcmVudFdpZHRoOiBudW1iZXI7XG4gICAgcGFyZW50SGVpZ2h0OiBudW1iZXI7XG4gICAgaXNXaWRlU2NyZWVuOiBib29sZWFuO1xuICAgIG1haW5TaXplOiBudW1iZXI7XG4gICAgZG9TdGFjazogYm9vbGVhbjtcbiAgfSk6IENvbXBvbmVudFNpemVzIHtcbiAgICBpZiAoZG9TdGFjaykge1xuICAgICAgcmV0dXJuIGlzV2lkZVNjcmVlblxuICAgICAgICA/IHtcbiAgICAgICAgICAgIG1haW5IZWlnaHQ6IE1hdGguZmxvb3IocGFyZW50SGVpZ2h0KSxcbiAgICAgICAgICAgIG90aGVySGVpZ2h0OiBNYXRoLmZsb29yKHBhcmVudEhlaWdodCksXG4gICAgICAgICAgICBtYWluV2lkdGg6IE1hdGguZmxvb3IoKG1haW5TaXplIC8gMTAwKSAqIHBhcmVudFdpZHRoKSxcbiAgICAgICAgICAgIG90aGVyV2lkdGg6IE1hdGguZmxvb3IoKCgxMDAgLSBtYWluU2l6ZSkgLyAxMDApICogcGFyZW50V2lkdGgpLFxuICAgICAgICAgIH1cbiAgICAgICAgOiB7XG4gICAgICAgICAgICBtYWluSGVpZ2h0OiBNYXRoLmZsb29yKChtYWluU2l6ZSAvIDEwMCkgKiBwYXJlbnRIZWlnaHQpLFxuICAgICAgICAgICAgb3RoZXJIZWlnaHQ6IE1hdGguZmxvb3IoKCgxMDAgLSBtYWluU2l6ZSkgLyAxMDApICogcGFyZW50SGVpZ2h0KSxcbiAgICAgICAgICAgIG1haW5XaWR0aDogTWF0aC5mbG9vcihwYXJlbnRXaWR0aCksXG4gICAgICAgICAgICBvdGhlcldpZHRoOiBNYXRoLmZsb29yKHBhcmVudFdpZHRoKSxcbiAgICAgICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBtYWluSGVpZ2h0OiBNYXRoLmZsb29yKHBhcmVudEhlaWdodCksXG4gICAgICAgIG90aGVySGVpZ2h0OiBNYXRoLmZsb29yKHBhcmVudEhlaWdodCksXG4gICAgICAgIG1haW5XaWR0aDogTWF0aC5mbG9vcihwYXJlbnRXaWR0aCksXG4gICAgICAgIG90aGVyV2lkdGg6IE1hdGguZmxvb3IocGFyZW50V2lkdGgpLFxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVPcmllbnRhdGlvbkNoYW5nZSgpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5oYW5kbGVSZXNpemUuYmluZCh0aGlzKSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ29yaWVudGF0aW9uY2hhbmdlJywgdGhpcy5oYW5kbGVSZXNpemUuYmluZCh0aGlzKSk7XG4gIH1cblxuICBzZXR1cFJlc2l6ZUxpc3RlbmVyKCkge1xuICAgIHRoaXMuaGFuZGxlUmVzaXplKCk7XG4gIH1cblxuICBvcmllbnRhdGlvbiA9IHdpbmRvdy5pbm5lckhlaWdodCA+IHdpbmRvdy5pbm5lcldpZHRoID8gJ3BvcnRyYWl0JyA6ICdsYW5kc2NhcGUnO1xuXG4gIGFzeW5jIGpvaW5Sb29tKGRhdGE6IHtcbiAgICBzb2NrZXQ6IFNvY2tldDtcbiAgICByb29tTmFtZTogc3RyaW5nO1xuICAgIGlzbGV2ZWw6IHN0cmluZztcbiAgICBtZW1iZXI6IHN0cmluZztcbiAgICBzZWM6IHN0cmluZztcbiAgICBhcGlVc2VyTmFtZTogc3RyaW5nO1xuICB9KTogUHJvbWlzZTxSZXNwb25zZUpvaW5Sb29tIHwgbnVsbD4ge1xuICAgIGNvbnN0IHsgc29ja2V0LCByb29tTmFtZSwgaXNsZXZlbCwgbWVtYmVyLCBzZWMsIGFwaVVzZXJOYW1lIH0gPSBkYXRhO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlOiBSZXNwb25zZUpvaW5Sb29tIHwgbnVsbCA9IGF3YWl0IHRoaXMuam9pblJvb21DbGllbnQuam9pblJvb21DbGllbnQoe1xuICAgICAgICBzb2NrZXQsXG4gICAgICAgIHJvb21OYW1lLFxuICAgICAgICBpc2xldmVsLFxuICAgICAgICBtZW1iZXIsXG4gICAgICAgIHNlYyxcbiAgICAgICAgYXBpVXNlck5hbWUsXG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZygnRXJyb3Igam9pbmluZyByb29tOicsIGVycm9yKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIGpvaW4gdGhlIHJvb20uIFBsZWFzZSBjaGVjayB5b3VyIGNvbm5lY3Rpb24gYW5kIHRyeSBhZ2Fpbi4nKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBqb2luX1Jvb20oe1xuICAgIHNvY2tldCxcbiAgICByb29tTmFtZSxcbiAgICBpc2xldmVsLFxuICAgIG1lbWJlcixcbiAgICBzZWMsXG4gICAgYXBpVXNlck5hbWUsXG4gIH06IHtcbiAgICBzb2NrZXQ6IFNvY2tldDtcbiAgICByb29tTmFtZTogc3RyaW5nO1xuICAgIGlzbGV2ZWw6IHN0cmluZztcbiAgICBtZW1iZXI6IHN0cmluZztcbiAgICBzZWM6IHN0cmluZztcbiAgICBhcGlVc2VyTmFtZTogc3RyaW5nO1xuICB9KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgZGF0YTogUmVzcG9uc2VKb2luUm9vbSB8IG51bGwgPSBhd2FpdCB0aGlzLmpvaW5Sb29tKHtcbiAgICAgIHNvY2tldDogc29ja2V0LFxuICAgICAgcm9vbU5hbWU6IHJvb21OYW1lLFxuICAgICAgaXNsZXZlbDogaXNsZXZlbCxcbiAgICAgIG1lbWJlcjogbWVtYmVyLFxuICAgICAgc2VjOiBzZWMsXG4gICAgICBhcGlVc2VyTmFtZTogYXBpVXNlck5hbWUsXG4gICAgfSk7XG5cbiAgICBpZiAoZGF0YSAmJiBkYXRhLnN1Y2Nlc3MpIHtcbiAgICAgIHRoaXMucm9vbURhdGEubmV4dChkYXRhKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy51cGRhdGVSb29tUGFyYW1ldGVyc0NsaWVudC51cGRhdGVSb29tUGFyYW1ldGVyc0NsaWVudCh7XG4gICAgICAgICAgcGFyYW1ldGVyczoge1xuICAgICAgICAgICAgLi4udGhpcy5nZXRBbGxQYXJhbXMoKSxcbiAgICAgICAgICAgIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSxcbiAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGRhdGEuaXNIb3N0KSB7XG4gICAgICAgICAgdGhpcy51cGRhdGVJc2xldmVsKCcyJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy51cGRhdGVJc2xldmVsKCcxJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGF0YS5zZWN1cmVDb2RlKSB7XG4gICAgICAgICAgdGhpcy51cGRhdGVBZG1pblBhc3Njb2RlKGRhdGEuc2VjdXJlQ29kZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGF0YS5ydHBDYXBhYmlsaXRpZXMpIHtcbiAgICAgICAgICBjb25zdCBkZXZpY2VfID0gYXdhaXQgdGhpcy5jcmVhdGVEZXZpY2VDbGllbnQuY3JlYXRlRGV2aWNlQ2xpZW50KHtcbiAgICAgICAgICAgIHJ0cENhcGFiaWxpdGllczogZGF0YS5ydHBDYXBhYmlsaXRpZXMsXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpZiAoZGV2aWNlXykge1xuICAgICAgICAgICAgdGhpcy5kZXZpY2UubmV4dChkZXZpY2VfKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2gge1xuICAgICAgICAvKiBoYW5kbGUgZXJyb3IgKi9cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy51cGRhdGVWYWxpZGF0ZWQoZmFsc2UpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKHRoaXMuc2hvd0FsZXJ0ICYmIGRhdGE/LnJlYXNvbikge1xuICAgICAgICAgIHRoaXMuc2hvd0FsZXJ0KHsgbWVzc2FnZTogZGF0YT8ucmVhc29uLCB0eXBlOiAnZGFuZ2VyJywgZHVyYXRpb246IDMwMDAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2gge1xuICAgICAgICAvKiBoYW5kbGUgZXJyb3IgKi9cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvblBhcnRpY2lwYW50c0ZpbHRlckNoYW5nZSA9ICh2YWx1ZTogc3RyaW5nKTogdm9pZCA9PiB7XG4gICAgaWYgKHZhbHVlICYmIHZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuZmlsdGVyZWRQYXJ0aWNpcGFudHMubmV4dChcbiAgICAgICAgdGhpcy5wYXJ0aWNpcGFudHMudmFsdWUuZmlsdGVyKChwYXJ0aWNpcGFudCkgPT5cbiAgICAgICAgICBwYXJ0aWNpcGFudC5uYW1lLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXModmFsdWUudG9Mb3dlckNhc2UoKSksXG4gICAgICAgICksXG4gICAgICApO1xuICAgICAgdGhpcy5wYXJ0aWNpcGFudHNDb3VudGVyLm5leHQodGhpcy5maWx0ZXJlZFBhcnRpY2lwYW50cy52YWx1ZS5sZW5ndGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmZpbHRlcmVkUGFydGljaXBhbnRzLm5leHQodGhpcy5wYXJ0aWNpcGFudHMudmFsdWUpO1xuICAgICAgdGhpcy5wYXJ0aWNpcGFudHNDb3VudGVyLm5leHQodGhpcy5wYXJ0aWNpcGFudHMudmFsdWUubGVuZ3RoKTtcbiAgICB9XG4gIH07XG5cbiAgdXBkYXRlU3RhdGVzVG9Jbml0aWFsVmFsdWVzID0gYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IGluaXRpYWxWYWx1ZXMgPSBpbml0aWFsVmFsdWVzU3RhdGUgYXMgeyBba2V5OiBzdHJpbmddOiBhbnkgfTtcbiAgICBjb25zdCB1cGRhdGVGdW5jdGlvbnMgPSB0aGlzLmdldEFsbFBhcmFtcygpIGFzIHVua25vd24gYXMge1xuICAgICAgW2tleTogc3RyaW5nXTogKHZhbHVlOiBhbnkpID0+IHZvaWQ7XG4gICAgfTtcblxuICAgIGZvciAoY29uc3Qga2V5IGluIGluaXRpYWxWYWx1ZXMpIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaW5pdGlhbFZhbHVlcywga2V5KSkge1xuICAgICAgICBjb25zdCB1cGRhdGVGdW5jdGlvbk5hbWUgPSBgdXBkYXRlJHtrZXkuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBrZXkuc2xpY2UoMSl9YDtcbiAgICAgICAgY29uc3QgdXBkYXRlRnVuY3Rpb24gPSB1cGRhdGVGdW5jdGlvbnNbdXBkYXRlRnVuY3Rpb25OYW1lXTtcblxuICAgICAgICBpZiAodHlwZW9mIHVwZGF0ZUZ1bmN0aW9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHVwZGF0ZUZ1bmN0aW9uKGluaXRpYWxWYWx1ZXNba2V5XSk7XG4gICAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgICAvKiBoYW5kbGUgZXJyb3IgKi9cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgZmFSZWNvcmRWaW55bCA9IGZhUmVjb3JkVmlueWw7XG4gIGZhUGxheUNpcmNsZSA9IGZhUGxheUNpcmNsZTtcbiAgZmFQYXVzZUNpcmNsZSA9IGZhUGF1c2VDaXJjbGU7XG4gIGZhU3RvcENpcmNsZSA9IGZhU3RvcENpcmNsZTtcbiAgZmFEb3RDaXJjbGUgPSBmYURvdENpcmNsZTtcbiAgZmFDb2cgPSBmYUNvZztcbiAgZmFVc2VycyA9IGZhVXNlcnM7XG4gIGZhTWljcm9waG9uZSA9IGZhTWljcm9waG9uZTtcbiAgZmFNaWNyb3Bob25lU2xhc2ggPSBmYU1pY3JvcGhvbmVTbGFzaDtcbiAgZmFWaWRlbyA9IGZhVmlkZW87XG4gIGZhVmlkZW9TbGFzaCA9IGZhVmlkZW9TbGFzaDtcbiAgZmFTeW5jID0gZmFTeW5jO1xuICBmYVBob25lID0gZmFQaG9uZTtcbiAgZmFTaGFyZUFsdCA9IGZhU2hhcmVBbHQ7XG4gIGZhQ29tbWVudHMgPSBmYUNvbW1lbnRzO1xuICBmYUNoYXJ0QmFyID0gZmFDaGFydEJhcjtcblxuICBvbkNsb3NlTWVudU1vZGFsID0gKCkgPT4ge1xuICAgIHRoaXMudXBkYXRlSXNNZW51TW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgfTtcblxuICBvbkV2ZW50U2V0dGluZ3NDbG9zZSA9ICgpID0+IHtcbiAgICB0aGlzLnVwZGF0ZUlzU2V0dGluZ3NNb2RhbFZpc2libGUoZmFsc2UpO1xuICB9O1xuXG4gIG9uQ29Ib3N0Q2xvc2UgPSAoKSA9PiB7XG4gICAgdGhpcy51cGRhdGVJc0NvSG9zdE1vZGFsVmlzaWJsZShmYWxzZSk7XG4gIH07XG5cbiAgb25NZWRpYVNldHRpbmdzQ2xvc2UgPSAoKSA9PiB7XG4gICAgdGhpcy51cGRhdGVJc01lZGlhU2V0dGluZ3NNb2RhbFZpc2libGUoZmFsc2UpO1xuICB9O1xuXG4gIG9uRGlzcGxheVNldHRpbmdzQ2xvc2UgPSAoKSA9PiB7XG4gICAgdGhpcy51cGRhdGVJc0Rpc3BsYXlTZXR0aW5nc01vZGFsVmlzaWJsZShmYWxzZSk7XG4gIH07XG5cbiAgb25Qb2xsQ2xvc2UgPSAoKSA9PiB7XG4gICAgdGhpcy51cGRhdGVJc1BvbGxNb2RhbFZpc2libGUoZmFsc2UpO1xuICB9O1xuXG4gIG9uQnJlYWtvdXRSb29tc0Nsb3NlID0gKCkgPT4ge1xuICAgIHRoaXMudXBkYXRlSXNCcmVha291dFJvb21zTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgfTtcblxuICBvbkNvbmZpZ3VyZVdoaXRlYm9hcmRDbG9zZSA9ICgpID0+IHtcbiAgICB0aGlzLnVwZGF0ZUlzQ29uZmlndXJlV2hpdGVib2FyZE1vZGFsVmlzaWJsZShmYWxzZSk7XG4gIH07XG5cbiAgb25NZXNzYWdlc0Nsb3NlID0gKCkgPT4ge1xuICAgIHRoaXMudXBkYXRlSXNNZXNzYWdlc01vZGFsVmlzaWJsZShmYWxzZSk7XG4gIH07XG5cbiAgb25SZWNvcmRpbmdDbG9zZSA9ICgpID0+IHtcbiAgICB0aGlzLnVwZGF0ZUlzUmVjb3JkaW5nTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgfTtcblxuICBvblBhcnRpY2lwYW50c0Nsb3NlID0gKCkgPT4ge1xuICAgIHRoaXMudXBkYXRlSXNQYXJ0aWNpcGFudHNNb2RhbFZpc2libGUoZmFsc2UpO1xuICB9O1xuXG4gIG9uQmFja2dyb3VuZENsb3NlID0gKCkgPT4ge1xuICAgIHRoaXMudXBkYXRlSXNCYWNrZ3JvdW5kTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgfTtcblxuICBvbkNvbmZpcm1FeGl0Q2xvc2UgPSAoKSA9PiB7XG4gICAgdGhpcy51cGRhdGVJc0NvbmZpcm1FeGl0TW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgfTtcblxuICBvbkNvbmZpcm1IZXJlQ2xvc2UgPSAoKSA9PiB7XG4gICAgdGhpcy51cGRhdGVJc0NvbmZpcm1IZXJlTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgfTtcblxuICBvblNjcmVlbmJvYXJkQ2xvc2UgPSAoKSA9PiB7XG4gICAgdGhpcy51cGRhdGVJc1NjcmVlbmJvYXJkTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgfTtcblxuICBvblNoYXJlRXZlbnRDbG9zZSA9ICgpID0+IHtcbiAgICB0aGlzLnVwZGF0ZUlzU2hhcmVFdmVudE1vZGFsVmlzaWJsZShmYWxzZSk7XG4gIH07XG5cbiAgb25BbGVydEhpZGUgPSAoKSA9PiB7XG4gICAgdGhpcy51cGRhdGVBbGVydFZpc2libGUoZmFsc2UpO1xuICB9O1xuICByZWNvcmRUaW1lcldpZGdldCA9IHtcbiAgICBjb21wb25lbnQ6IFJlY29yZFRpbWVyV2lkZ2V0LFxuICAgIGluamVjdG9yOiB0aGlzLmNyZWF0ZUluamVjdG9yKHsgcmVjb3JkaW5nUHJvZ3Jlc3NUaW1lOiB0aGlzLnJlY29yZGluZ1Byb2dyZXNzVGltZS52YWx1ZSB9KSxcbiAgfTtcblxuICB1cGRhdGVSZWNvcmRUaW1lcldpZGdldCA9IChcbiAgICByZWNvcmRpbmdQcm9ncmVzc1RpbWU6IHN0cmluZyA9IHRoaXMucmVjb3JkaW5nUHJvZ3Jlc3NUaW1lLnZhbHVlLFxuICApOiB7IGNvbXBvbmVudDogYW55OyBpbmplY3RvcjogSW5qZWN0b3IgfSA9PiB7XG4gICAgY29uc3QgcmVjb3JkVGltZXJXaWRnZXQgPSB7XG4gICAgICBjb21wb25lbnQ6IFJlY29yZFRpbWVyV2lkZ2V0LFxuICAgICAgaW5qZWN0b3I6IHRoaXMuY3JlYXRlSW5qZWN0b3IoeyByZWNvcmRpbmdQcm9ncmVzc1RpbWU6IHJlY29yZGluZ1Byb2dyZXNzVGltZSB9KSxcbiAgICB9O1xuXG4gICAgdGhpcy5yZWNvcmRUaW1lcldpZGdldCA9IHsgLi4ucmVjb3JkVGltZXJXaWRnZXQgfTtcblxuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuXG4gICAgcmV0dXJuIHJlY29yZFRpbWVyV2lkZ2V0O1xuICB9O1xuXG4gIHJlY29yZEJ1dHRvbiA9IFtcbiAgICB7XG4gICAgICBpY29uOiB0aGlzLmZhUmVjb3JkVmlueWwsXG4gICAgICB0ZXh0OiAnUmVjb3JkJyxcbiAgICAgIG9uUHJlc3M6ICgpID0+IHtcbiAgICAgICAgdGhpcy5sYXVuY2hSZWNvcmRpbmcubGF1bmNoUmVjb3JkaW5nKHtcbiAgICAgICAgICB1cGRhdGVJc1JlY29yZGluZ01vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc1JlY29yZGluZ01vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuICAgICAgICAgIGlzUmVjb3JkaW5nTW9kYWxWaXNpYmxlOiB0aGlzLmlzUmVjb3JkaW5nTW9kYWxWaXNpYmxlLnZhbHVlLFxuICAgICAgICAgIHNob3dBbGVydDogdGhpcy5zaG93QWxlcnQuYmluZCh0aGlzKSxcbiAgICAgICAgICBzdG9wTGF1bmNoUmVjb3JkOiB0aGlzLnN0b3BMYXVuY2hSZWNvcmQudmFsdWUsXG4gICAgICAgICAgY2FuTGF1bmNoUmVjb3JkOiB0aGlzLmNhbkxhdW5jaFJlY29yZC52YWx1ZSxcbiAgICAgICAgICByZWNvcmRpbmdBdWRpb1N1cHBvcnQ6IHRoaXMucmVjb3JkaW5nQXVkaW9TdXBwb3J0LnZhbHVlLFxuICAgICAgICAgIHJlY29yZGluZ1ZpZGVvU3VwcG9ydDogdGhpcy5yZWNvcmRpbmdWaWRlb1N1cHBvcnQudmFsdWUsXG4gICAgICAgICAgdXBkYXRlQ2FuUmVjb3JkOiB0aGlzLnVwZGF0ZUNhblJlY29yZC5iaW5kKHRoaXMpLFxuICAgICAgICAgIHVwZGF0ZUNsZWFyZWRUb1JlY29yZDogdGhpcy51cGRhdGVDbGVhcmVkVG9SZWNvcmQuYmluZCh0aGlzKSxcbiAgICAgICAgICByZWNvcmRTdGFydGVkOiB0aGlzLnJlY29yZFN0YXJ0ZWQudmFsdWUsXG4gICAgICAgICAgcmVjb3JkUGF1c2VkOiB0aGlzLnJlY29yZFBhdXNlZC52YWx1ZSxcbiAgICAgICAgICBsb2NhbFVJTW9kZTogdGhpcy5sb2NhbFVJTW9kZS52YWx1ZSxcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgYWN0aXZlQ29sb3I6ICdibGFjaycsXG4gICAgICBpbkFjdGl2ZUNvbG9yOiAnYmxhY2snLFxuICAgICAgc2hvdzogdHJ1ZSxcbiAgICB9LFxuICBdO1xuXG4gIHJlY29yZEJ1dHRvbnM6IE1haW5CdXR0b25BbHRbXSA9IFtdO1xuXG4gIHJlY29yZEJ1dHRvbnNBcnJheTogTWFpbkJ1dHRvbkFsdFtdID0gW1xuICAgIHtcbiAgICAgIGljb246IHRoaXMuZmFQbGF5Q2lyY2xlLFxuICAgICAgYWN0aXZlOiAoKSA9PiAhdGhpcy5yZWNvcmRQYXVzZWQudmFsdWUsXG4gICAgICBvblByZXNzOiAoKSA9PlxuICAgICAgICB0aGlzLnVwZGF0ZVJlY29yZGluZy51cGRhdGVSZWNvcmRpbmcoe1xuICAgICAgICAgIHBhcmFtZXRlcnM6IHsgLi4udGhpcy5nZXRBbGxQYXJhbXMoKSwgLi4udGhpcy5tZWRpYVNGVUZ1bmN0aW9ucygpIH0sXG4gICAgICAgIH0pLFxuICAgICAgYWN0aXZlQ29sb3I6ICdibGFjaycsXG4gICAgICBpbkFjdGl2ZUNvbG9yOiAnYmxhY2snLFxuICAgICAgYWx0ZXJuYXRlSWNvbjogdGhpcy5mYVBhdXNlQ2lyY2xlLFxuICAgICAgc2hvdzogKCkgPT4gdHJ1ZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGljb246IHRoaXMuZmFTdG9wQ2lyY2xlLFxuICAgICAgYWN0aXZlOiAoKSA9PiBmYWxzZSxcbiAgICAgIG9uUHJlc3M6ICgpID0+XG4gICAgICAgIHRoaXMuc3RvcFJlY29yZGluZy5zdG9wUmVjb3JkaW5nKHtcbiAgICAgICAgICBwYXJhbWV0ZXJzOiB7IC4uLnRoaXMuZ2V0QWxsUGFyYW1zKCksIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSB9LFxuICAgICAgICB9KSxcbiAgICAgIGFjdGl2ZUNvbG9yOiAnZ3JlZW4nLFxuICAgICAgaW5BY3RpdmVDb2xvcjogJ2JsYWNrJyxcbiAgICAgIHNob3c6ICgpID0+IHRydWUsXG4gICAgfSxcbiAgICB7XG4gICAgICBjdXN0b21Db21wb25lbnQ6ICgpID0+IHRoaXMudXBkYXRlUmVjb3JkVGltZXJXaWRnZXQoKSxcbiAgICAgIHNob3c6ICgpID0+IHRydWUsXG4gICAgICBhY3RpdmU6ICgpID0+IGZhbHNlLFxuICAgIH0sXG4gICAge1xuICAgICAgaWNvbjogdGhpcy5mYURvdENpcmNsZSxcbiAgICAgIGFjdGl2ZTogKCkgPT4gZmFsc2UsXG4gICAgICBvblByZXNzOiAoKSA9PiBjb25zb2xlLmxvZygnU3RhdHVzIHByZXNzZWQnKSxcbiAgICAgIGFjdGl2ZUNvbG9yOiAnYmxhY2snLFxuICAgICAgaW5BY3RpdmVDb2xvcjogKCkgPT4gKHRoaXMucmVjb3JkUGF1c2VkLnZhbHVlID8gJ3llbGxvdycgOiAncmVkJyksXG4gICAgICBzaG93OiAoKSA9PiB0cnVlLFxuICAgIH0sXG4gICAge1xuICAgICAgaWNvbjogdGhpcy5mYUNvZyxcbiAgICAgIGFjdGl2ZTogKCkgPT4gZmFsc2UsXG4gICAgICBvblByZXNzOiAoKSA9PlxuICAgICAgICB0aGlzLmxhdW5jaFJlY29yZGluZy5sYXVuY2hSZWNvcmRpbmcoe1xuICAgICAgICAgIHVwZGF0ZUlzUmVjb3JkaW5nTW9kYWxWaXNpYmxlOiB0aGlzLnVwZGF0ZUlzUmVjb3JkaW5nTW9kYWxWaXNpYmxlLmJpbmQodGhpcyksXG4gICAgICAgICAgaXNSZWNvcmRpbmdNb2RhbFZpc2libGU6IHRoaXMuaXNSZWNvcmRpbmdNb2RhbFZpc2libGUudmFsdWUsXG4gICAgICAgICAgc2hvd0FsZXJ0OiB0aGlzLnNob3dBbGVydC5iaW5kKHRoaXMpLFxuICAgICAgICAgIHN0b3BMYXVuY2hSZWNvcmQ6IHRoaXMuc3RvcExhdW5jaFJlY29yZC52YWx1ZSxcbiAgICAgICAgICBjYW5MYXVuY2hSZWNvcmQ6IHRoaXMuY2FuTGF1bmNoUmVjb3JkLnZhbHVlLFxuICAgICAgICAgIHJlY29yZGluZ0F1ZGlvU3VwcG9ydDogdGhpcy5yZWNvcmRpbmdBdWRpb1N1cHBvcnQudmFsdWUsXG4gICAgICAgICAgcmVjb3JkaW5nVmlkZW9TdXBwb3J0OiB0aGlzLnJlY29yZGluZ1ZpZGVvU3VwcG9ydC52YWx1ZSxcbiAgICAgICAgICB1cGRhdGVDYW5SZWNvcmQ6IHRoaXMudXBkYXRlQ2FuUmVjb3JkLmJpbmQodGhpcyksXG4gICAgICAgICAgdXBkYXRlQ2xlYXJlZFRvUmVjb3JkOiB0aGlzLnVwZGF0ZUNsZWFyZWRUb1JlY29yZC5iaW5kKHRoaXMpLFxuICAgICAgICAgIHJlY29yZFN0YXJ0ZWQ6IHRoaXMucmVjb3JkU3RhcnRlZC52YWx1ZSxcbiAgICAgICAgICByZWNvcmRQYXVzZWQ6IHRoaXMucmVjb3JkUGF1c2VkLnZhbHVlLFxuICAgICAgICAgIGxvY2FsVUlNb2RlOiB0aGlzLmxvY2FsVUlNb2RlLnZhbHVlLFxuICAgICAgICB9KSxcbiAgICAgIGFjdGl2ZUNvbG9yOiAnZ3JlZW4nLFxuICAgICAgaW5BY3RpdmVDb2xvcjogJ2JsYWNrJyxcbiAgICAgIHNob3c6ICgpID0+IHRydWUsXG4gICAgfSxcbiAgXTtcblxuICBhc3luYyB1cGRhdGVSZWNvcmRCdXR0b25zKCkge1xuICAgIGNvbnN0IHJlY29yZEJ1dHRvbnMgPSB0aGlzLnJlY29yZEJ1dHRvbnNBcnJheS5tYXAoKGJ1dHRvbikgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uYnV0dG9uLFxuICAgICAgICBhY3RpdmU6IHR5cGVvZiBidXR0b24uYWN0aXZlID09PSAnZnVuY3Rpb24nID8gYnV0dG9uLmFjdGl2ZSgpIDogYnV0dG9uLmFjdGl2ZSxcbiAgICAgICAgc2hvdzogdHlwZW9mIGJ1dHRvbi5zaG93ID09PSAnZnVuY3Rpb24nID8gYnV0dG9uLnNob3coKSA6IGJ1dHRvbi5zaG93LFxuICAgICAgICBjdXN0b21Db21wb25lbnQ6IGJ1dHRvbi5jdXN0b21Db21wb25lbnRcbiAgICAgICAgICA/IHR5cGVvZiBidXR0b24uY3VzdG9tQ29tcG9uZW50ID09PSAnZnVuY3Rpb24nXG4gICAgICAgICAgICA/IGJ1dHRvbi5jdXN0b21Db21wb25lbnQoKVxuICAgICAgICAgICAgOiBidXR0b24uY3VzdG9tQ29tcG9uZW50XG4gICAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgICAgIGFjdGl2ZUNvbG9yOlxuICAgICAgICAgIHR5cGVvZiBidXR0b24uaW5BY3RpdmVDb2xvciA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICAgICAgPyBidXR0b24uaW5BY3RpdmVDb2xvcigpXG4gICAgICAgICAgICA6IGJ1dHRvbi5pbkFjdGl2ZUNvbG9yLFxuICAgICAgICBpbkFjdGl2ZUNvbG9yOlxuICAgICAgICAgIHR5cGVvZiBidXR0b24uaW5BY3RpdmVDb2xvciA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICAgICAgPyBidXR0b24uaW5BY3RpdmVDb2xvcigpXG4gICAgICAgICAgICA6IGJ1dHRvbi5pbkFjdGl2ZUNvbG9yLFxuICAgICAgfTtcbiAgICB9KTtcbiAgICB0aGlzLnJlY29yZEJ1dHRvbnMgPSBbLi4ucmVjb3JkQnV0dG9uc107XG4gICAgYXdhaXQgdGhpcy51cGRhdGVNZW51UmVjb3JkV2lkZ2V0KHJlY29yZEJ1dHRvbnMpO1xuICAgIHRoaXMudXBkYXRlQ29udHJvbEJyb2FkY2FzdEJ1dHRvbnMoKTtcblxuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLy8gQ3JlYXRlIGluc3RhbmNlcyBvZiB0aGUgY3VzdG9tIHdpZGdldHNcbiAgbWVzc2FnZVdpZGdldCA9IHtcbiAgICBjb21wb25lbnQ6IE1lc3NhZ2VXaWRnZXQsXG4gICAgaW5qZWN0b3I6IHRoaXMuY3JlYXRlSW5qZWN0b3Ioe1xuICAgICAgaWNvbjogdGhpcy5mYUNvbW1lbnRzLFxuICAgICAgc2hvd0JhZGdlOiB0aGlzLnNob3dNZXNzYWdlc0JhZGdlLnZhbHVlLFxuICAgICAgYmFkZ2VWYWx1ZTogMSxcbiAgICAgIGljb25Db2xvcjogJ2JsYWNrJyxcbiAgICB9KSxcbiAgfTtcblxuICBtZW51UmVjb3JkV2lkZ2V0ID0ge1xuICAgIGNvbXBvbmVudDogTWVudVJlY29yZFdpZGdldCxcbiAgICBpbmplY3RvcjogdGhpcy5jcmVhdGVJbmplY3Rvcih7XG4gICAgICBidXR0b25zOiB0aGlzLnJlY29yZEJ1dHRvbnMsXG4gICAgICBzaG93QXNwZWN0OiB0cnVlLFxuICAgICAgZGlyZWN0aW9uOiAnaG9yaXpvbnRhbCcsXG4gICAgfSksXG4gIH07XG5cbiAgdXBkYXRlTWVudVJlY29yZFdpZGdldCA9IChyZWNvcmRCdXR0b25zOiBNYWluQnV0dG9uQWx0W10gPSB0aGlzLnJlY29yZEJ1dHRvbnMpOiBhbnkgPT4ge1xuICAgIGNvbnN0IG1lbnVSZWNvcmRXaWRnZXQgPSB7XG4gICAgICBjb21wb25lbnQ6IE1lbnVSZWNvcmRXaWRnZXQsXG4gICAgICBpbmplY3RvcjogdGhpcy5jcmVhdGVJbmplY3Rvcih7XG4gICAgICAgIGJ1dHRvbnM6IHJlY29yZEJ1dHRvbnMsXG4gICAgICAgIHNob3dBc3BlY3Q6IHRydWUsXG4gICAgICAgIGRpcmVjdGlvbjogJ2hvcml6b250YWwnLFxuICAgICAgfSksXG4gICAgfTtcblxuICAgIHRoaXMubWVudVJlY29yZFdpZGdldCA9IHsgLi4ubWVudVJlY29yZFdpZGdldCB9O1xuXG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG5cbiAgICByZXR1cm4gbWVudVJlY29yZFdpZGdldDtcbiAgfTtcblxuICBtZW51UGFydGljaXBhbnRzV2lkZ2V0ID0ge1xuICAgIGNvbXBvbmVudDogTWVudVBhcnRpY2lwYW50c1dpZGdldCxcbiAgICBpbmplY3RvcjogdGhpcy5jcmVhdGVJbmplY3Rvcih7XG4gICAgICBpY29uOiB0aGlzLmZhQ2hhcnRCYXIsXG4gICAgICBwYXJ0aWNpcGFudHNDb3VudGVyOiB0aGlzLnBhcnRpY2lwYW50c0NvdW50ZXIudmFsdWUsXG4gICAgICBpY29uQ29sb3I6ICdibGFjaycsXG4gICAgfSksXG4gIH07XG5cbiAgdXBkYXRlTWVudVBhcnRpY2lwYW50c1dpZGdldCA9IChjb3VudDogbnVtYmVyID0gdGhpcy5wYXJ0aWNpcGFudHNDb3VudGVyLnZhbHVlKTogYW55ID0+IHtcbiAgICBjb25zdCBtZW51UGFydGljaXBhbnRzV2lkZ2V0ID0ge1xuICAgICAgY29tcG9uZW50OiBNZW51UGFydGljaXBhbnRzV2lkZ2V0LFxuICAgICAgaW5qZWN0b3I6IHRoaXMuY3JlYXRlSW5qZWN0b3Ioe1xuICAgICAgICBpY29uOiB0aGlzLmZhQ2hhcnRCYXIsXG4gICAgICAgIHBhcnRpY2lwYW50c0NvdW50ZXI6IGNvdW50LFxuICAgICAgICBpY29uQ29sb3I6ICdibGFjaycsXG4gICAgICB9KSxcbiAgICB9O1xuXG4gICAgdGhpcy5tZW51UGFydGljaXBhbnRzV2lkZ2V0ID0geyAuLi5tZW51UGFydGljaXBhbnRzV2lkZ2V0IH07XG5cbiAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcblxuICAgIHJldHVybiBtZW51UGFydGljaXBhbnRzV2lkZ2V0O1xuICB9O1xuXG4gIGNvbnRyb2xCcm9hZGNhc3RCdXR0b25zOiBCdXR0b25Ub3VjaFtdID0gW107XG5cbiAgdXBkYXRlQ29udHJvbEJyb2FkY2FzdEJ1dHRvbnMoKSB7XG4gICAgdGhpcy5jb250cm9sQnJvYWRjYXN0QnV0dG9ucyA9IHRoaXMuY29udHJvbEJyb2FkY2FzdEJ1dHRvbnNBcnJheS5tYXAoKGJ1dHRvbikgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uYnV0dG9uLFxuICAgICAgICBzaG93OiB0eXBlb2YgYnV0dG9uLnNob3cgPT09ICdmdW5jdGlvbicgPyBidXR0b24uc2hvdygpIDogYnV0dG9uLnNob3csXG4gICAgICAgIGFjdGl2ZTogdHlwZW9mIGJ1dHRvbi5hY3RpdmUgPT09ICdmdW5jdGlvbicgPyBidXR0b24uYWN0aXZlKCkgOiBidXR0b24uYWN0aXZlLFxuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIGNvbnRyb2xCcm9hZGNhc3RCdXR0b25zQXJyYXk6IEJ1dHRvblRvdWNoW10gPSBbXG4gICAge1xuICAgICAgaWNvbjogdGhpcy5mYVVzZXJzLFxuICAgICAgYWN0aXZlOiB0cnVlLFxuICAgICAgYWx0ZXJuYXRlSWNvbjogdGhpcy5mYVVzZXJzLFxuICAgICAgb25QcmVzczogKCkgPT5cbiAgICAgICAgdGhpcy5sYXVuY2hQYXJ0aWNpcGFudHMubGF1bmNoUGFydGljaXBhbnRzKHtcbiAgICAgICAgICB1cGRhdGVJc1BhcnRpY2lwYW50c01vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc1BhcnRpY2lwYW50c01vZGFsVmlzaWJsZS5iaW5kKHRoaXMpLFxuICAgICAgICAgIGlzUGFydGljaXBhbnRzTW9kYWxWaXNpYmxlOiB0aGlzLmlzUGFydGljaXBhbnRzTW9kYWxWaXNpYmxlLnZhbHVlLFxuICAgICAgICB9KSxcbiAgICAgIGFjdGl2ZUNvbG9yOiAnYmxhY2snLFxuICAgICAgaW5BY3RpdmVDb2xvcjogJ2JsYWNrJyxcbiAgICAgIHNob3c6ICgpID0+IHRoaXMuaXNsZXZlbC52YWx1ZSA9PSAnMicsXG4gICAgfSxcbiAgICB7XG4gICAgICBpY29uOiB0aGlzLmZhU2hhcmVBbHQsXG4gICAgICBhY3RpdmU6IHRydWUsXG4gICAgICBhbHRlcm5hdGVJY29uOiB0aGlzLmZhU2hhcmVBbHQsXG4gICAgICBvblByZXNzOiAoKSA9PiB0aGlzLnVwZGF0ZUlzU2hhcmVFdmVudE1vZGFsVmlzaWJsZSghdGhpcy5pc1NoYXJlRXZlbnRNb2RhbFZpc2libGUudmFsdWUpLFxuICAgICAgYWN0aXZlQ29sb3I6ICdibGFjaycsXG4gICAgICBpbkFjdGl2ZUNvbG9yOiAnYmxhY2snLFxuICAgICAgc2hvdzogKCkgPT4gdHJ1ZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGN1c3RvbUNvbXBvbmVudDogdGhpcy5tZXNzYWdlV2lkZ2V0LFxuICAgICAgb25QcmVzczogKCkgPT5cbiAgICAgICAgdGhpcy5sYXVuY2hNZXNzYWdlcy5sYXVuY2hNZXNzYWdlcyh7XG4gICAgICAgICAgdXBkYXRlSXNNZXNzYWdlc01vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc01lc3NhZ2VzTW9kYWxWaXNpYmxlLmJpbmQodGhpcyksXG4gICAgICAgICAgaXNNZXNzYWdlc01vZGFsVmlzaWJsZTogdGhpcy5pc01lc3NhZ2VzTW9kYWxWaXNpYmxlLnZhbHVlLFxuICAgICAgICB9KSxcbiAgICAgIHNob3c6ICgpID0+IHRydWUsXG4gICAgfSxcbiAgICB7XG4gICAgICBpY29uOiB0aGlzLmZhU3luYyxcbiAgICAgIGFjdGl2ZTogdHJ1ZSxcbiAgICAgIGFsdGVybmF0ZUljb246IHRoaXMuZmFTeW5jLFxuICAgICAgb25QcmVzczogKCkgPT5cbiAgICAgICAgdGhpcy5zd2l0Y2hWaWRlb0FsdC5zd2l0Y2hWaWRlb0FsdCh7XG4gICAgICAgICAgcGFyYW1ldGVyczoge1xuICAgICAgICAgICAgLi4udGhpcy5nZXRBbGxQYXJhbXMoKSxcbiAgICAgICAgICAgIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KSxcbiAgICAgIGFjdGl2ZUNvbG9yOiAnYmxhY2snLFxuICAgICAgaW5BY3RpdmVDb2xvcjogJ2JsYWNrJyxcbiAgICAgIHNob3c6ICgpID0+IHRoaXMuaXNsZXZlbC52YWx1ZSA9PSAnMicsXG4gICAgfSxcbiAgICB7XG4gICAgICBpY29uOiB0aGlzLmZhVmlkZW9TbGFzaCxcbiAgICAgIGFsdGVybmF0ZUljb246IHRoaXMuZmFWaWRlbyxcbiAgICAgIGFjdGl2ZTogKCkgPT4gdGhpcy52aWRlb0FjdGl2ZS52YWx1ZSxcbiAgICAgIG9uUHJlc3M6ICgpID0+XG4gICAgICAgIHRoaXMuY2xpY2tWaWRlby5jbGlja1ZpZGVvKHtcbiAgICAgICAgICBwYXJhbWV0ZXJzOiB7XG4gICAgICAgICAgICAuLi50aGlzLmdldEFsbFBhcmFtcygpLFxuICAgICAgICAgICAgLi4udGhpcy5tZWRpYVNGVUZ1bmN0aW9ucygpLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pLFxuICAgICAgc2hvdzogKCkgPT4gdGhpcy5pc2xldmVsLnZhbHVlID09ICcyJyxcbiAgICAgIGFjdGl2ZUNvbG9yOiAnZ3JlZW4nLFxuICAgICAgaW5BY3RpdmVDb2xvcjogJ3JlZCcsXG4gICAgfSxcbiAgICB7XG4gICAgICBpY29uOiB0aGlzLmZhTWljcm9waG9uZVNsYXNoLFxuICAgICAgYWx0ZXJuYXRlSWNvbjogdGhpcy5mYU1pY3JvcGhvbmUsXG4gICAgICBhY3RpdmU6ICgpID0+IHRoaXMubWljQWN0aXZlLnZhbHVlLFxuICAgICAgb25QcmVzczogKCkgPT5cbiAgICAgICAgdGhpcy5jbGlja0F1ZGlvLmNsaWNrQXVkaW8oe1xuICAgICAgICAgIHBhcmFtZXRlcnM6IHtcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0QWxsUGFyYW1zKCksXG4gICAgICAgICAgICAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCksXG4gICAgICAgICAgfSxcbiAgICAgICAgfSksXG4gICAgICBhY3RpdmVDb2xvcjogJ2dyZWVuJyxcbiAgICAgIGluQWN0aXZlQ29sb3I6ICdyZWQnLFxuICAgICAgc2hvdzogKCkgPT4gdGhpcy5pc2xldmVsLnZhbHVlID09ICcyJyxcbiAgICB9LFxuICAgIHtcbiAgICAgIGN1c3RvbUNvbXBvbmVudDogKCkgPT4gdGhpcy5tZW51UGFydGljaXBhbnRzV2lkZ2V0LFxuICAgICAgc2hvdzogKCkgPT4gdGhpcy5pc2xldmVsLnZhbHVlID09ICcyJyxcbiAgICB9LFxuICAgIHtcbiAgICAgIGljb246IHRoaXMuZmFQaG9uZSxcbiAgICAgIGFjdGl2ZTogdGhpcy5lbmRDYWxsQWN0aXZlLnZhbHVlLFxuICAgICAgb25QcmVzczogKCkgPT5cbiAgICAgICAgdGhpcy5sYXVuY2hDb25maXJtRXhpdC5sYXVuY2hDb25maXJtRXhpdCh7XG4gICAgICAgICAgdXBkYXRlSXNDb25maXJtRXhpdE1vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc0NvbmZpcm1FeGl0TW9kYWxWaXNpYmxlLmJpbmQodGhpcyksXG4gICAgICAgICAgaXNDb25maXJtRXhpdE1vZGFsVmlzaWJsZTogdGhpcy5pc0NvbmZpcm1FeGl0TW9kYWxWaXNpYmxlLnZhbHVlLFxuICAgICAgICB9KSxcbiAgICAgIGFjdGl2ZUNvbG9yOiAnZ3JlZW4nLFxuICAgICAgaW5BY3RpdmVDb2xvcjogJ3JlZCcsXG4gICAgICBzaG93OiAoKSA9PiB0cnVlLFxuICAgIH0sXG4gICAge1xuICAgICAgaWNvbjogdGhpcy5mYVBob25lLFxuICAgICAgYWN0aXZlOiB0aGlzLmVuZENhbGxBY3RpdmUudmFsdWUsXG4gICAgICBvblByZXNzOiAoKSA9PiBjb25zb2xlLmxvZygnRW5kIENhbGwgcHJlc3NlZCcpLFxuICAgICAgYWN0aXZlQ29sb3I6ICd0cmFuc3BhcmVudCcsXG4gICAgICBpbkFjdGl2ZUNvbG9yOiAndHJhbnNwYXJlbnQnLFxuICAgICAgYmFja2dyb3VuZENvbG9yOiB7IGRlZmF1bHQ6ICd0cmFuc3BhcmVudCcgfSxcbiAgICAgIHNob3c6ICgpID0+IGZhbHNlLFxuICAgIH0sXG4gIF07XG5cbiAgYXN5bmMgY29ubmVjdF9Tb2NrZXQoXG4gICAgYXBpVXNlck5hbWU6IHN0cmluZyxcbiAgICBhcGlLZXk6IHN0cmluZyxcbiAgICBhcGlUb2tlbjogc3RyaW5nLFxuICApOiBQcm9taXNlPFNvY2tldCB8IG51bGw+IHtcbiAgICBpZiAodGhpcy5zb2NrZXQudmFsdWUgJiYgdGhpcy5zb2NrZXQudmFsdWUuaWQpIHtcbiAgICAgIHRoaXMuc29ja2V0LnZhbHVlLm9uKCdkaXNjb25uZWN0JywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBhd2FpdCB0aGlzLmRpc2Nvbm5lY3QuZGlzY29ubmVjdCh7XG4gICAgICAgICAgc2hvd0FsZXJ0OiB0aGlzLnNob3dBbGVydC5iaW5kKHRoaXMpLFxuICAgICAgICAgIHJlZGlyZWN0VVJMOiB0aGlzLnJlZGlyZWN0VVJMLnZhbHVlLFxuICAgICAgICAgIG9uV2ViOiB0cnVlLFxuICAgICAgICAgIHVwZGF0ZVZhbGlkYXRlZDogdGhpcy51cGRhdGVWYWxpZGF0ZWQuYmluZCh0aGlzKSxcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh0aGlzLnZpZGVvQWxyZWFkeU9uLnZhbHVlKSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5jbGlja1ZpZGVvLmNsaWNrVmlkZW8oe1xuICAgICAgICAgICAgcGFyYW1ldGVyczogeyAuLi50aGlzLmdldEFsbFBhcmFtcygpLCAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCkgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5hdWRpb0FscmVhZHlPbi52YWx1ZSkge1xuICAgICAgICAgIGF3YWl0IHRoaXMuY2xpY2tBdWRpby5jbGlja0F1ZGlvKHtcbiAgICAgICAgICAgIHBhcmFtZXRlcnM6IHsgLi4udGhpcy5nZXRBbGxQYXJhbXMoKSwgLi4udGhpcy5tZWRpYVNGVUZ1bmN0aW9ucygpIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBhd2FpdCB0aGlzLmNsb3NlQW5kUmVzZXQoKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnNvY2tldC52YWx1ZS5vbignYWxsTWVtYmVycycsIGFzeW5jIChtZW1iZXJzRGF0YTogQWxsTWVtYmVyc0RhdGEpID0+IHtcbiAgICAgICAgaWYgKG1lbWJlcnNEYXRhKSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5hbGxNZW1iZXJzLmFsbE1lbWJlcnMoe1xuICAgICAgICAgICAgYXBpVXNlck5hbWU6IGFwaVVzZXJOYW1lLFxuICAgICAgICAgICAgYXBpS2V5OiAnJywgLy9ub3QgcmVjb21tZW5kZWQgLSB1c2UgYXBpVG9rZW4gaW5zdGVhZC4gVXNlIGZvciB0ZXN0aW5nL2RldmVsb3BtZW50IG9ubHlcbiAgICAgICAgICAgIGFwaVRva2VuOiBhcGlUb2tlbixcbiAgICAgICAgICAgIG1lbWJlcnM6IG1lbWJlcnNEYXRhLm1lbWJlcnMsXG4gICAgICAgICAgICByZXF1ZXN0c3M6IG1lbWJlcnNEYXRhLnJlcXVlc3RzID8gbWVtYmVyc0RhdGEucmVxdWVzdHMgOiB0aGlzLnJlcXVlc3RMaXN0LnZhbHVlLFxuICAgICAgICAgICAgY29Ib3N0ZTogbWVtYmVyc0RhdGEuY29Ib3N0ID8gbWVtYmVyc0RhdGEuY29Ib3N0IDogdGhpcy5jb0hvc3QudmFsdWUsXG4gICAgICAgICAgICBjb0hvc3RSZXM6IG1lbWJlcnNEYXRhLmNvSG9zdFJlc3BvbnNpYmlsaXRpZXNcbiAgICAgICAgICAgICAgPyBtZW1iZXJzRGF0YS5jb0hvc3RSZXNwb25zaWJpbGl0aWVzXG4gICAgICAgICAgICAgIDogdGhpcy5jb0hvc3RSZXNwb25zaWJpbGl0eS52YWx1ZSxcbiAgICAgICAgICAgIHBhcmFtZXRlcnM6IHsgLi4udGhpcy5nZXRBbGxQYXJhbXMoKSwgLi4udGhpcy5tZWRpYVNGVUZ1bmN0aW9ucygpIH0sXG4gICAgICAgICAgICBjb25zdW1lX3NvY2tldHM6IHRoaXMuY29uc3VtZV9zb2NrZXRzLnZhbHVlLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5zb2NrZXQudmFsdWUub24oJ2FsbE1lbWJlcnNSZXN0JywgYXN5bmMgKG1lbWJlcnNEYXRhOiBBbGxNZW1iZXJzUmVzdERhdGEpID0+IHtcbiAgICAgICAgaWYgKG1lbWJlcnNEYXRhKSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5hbGxNZW1iZXJzUmVzdC5hbGxNZW1iZXJzUmVzdCh7XG4gICAgICAgICAgICBhcGlVc2VyTmFtZTogYXBpVXNlck5hbWUsXG4gICAgICAgICAgICBhcGlLZXk6ICcnLCAvLyBub3QgcmVjb21tZW5kZWQgLSB1c2UgYXBpVG9rZW4gaW5zdGVhZC4gVXNlIGZvciB0ZXN0aW5nL2RldmVsb3BtZW50IG9ubHlcbiAgICAgICAgICAgIG1lbWJlcnM6IG1lbWJlcnNEYXRhLm1lbWJlcnMsXG4gICAgICAgICAgICBhcGlUb2tlbjogYXBpVG9rZW4sXG4gICAgICAgICAgICBzZXR0aW5nczogbWVtYmVyc0RhdGEuc2V0dGluZ3MsXG4gICAgICAgICAgICBjb0hvc3RlOiBtZW1iZXJzRGF0YS5jb0hvc3QgPyBtZW1iZXJzRGF0YS5jb0hvc3QgOiB0aGlzLmNvSG9zdC52YWx1ZSxcbiAgICAgICAgICAgIGNvSG9zdFJlczogbWVtYmVyc0RhdGEuY29Ib3N0UmVzcG9uc2liaWxpdGllc1xuICAgICAgICAgICAgICA/IG1lbWJlcnNEYXRhLmNvSG9zdFJlc3BvbnNpYmlsaXRpZXNcbiAgICAgICAgICAgICAgOiB0aGlzLmNvSG9zdFJlc3BvbnNpYmlsaXR5LnZhbHVlLFxuICAgICAgICAgICAgcGFyYW1ldGVyczogeyAuLi50aGlzLmdldEFsbFBhcmFtcygpLCAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCkgfSxcbiAgICAgICAgICAgIGNvbnN1bWVfc29ja2V0czogdGhpcy5jb25zdW1lX3NvY2tldHMudmFsdWUsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnNvY2tldC52YWx1ZS5vbigncGVyc29uSm9pbmVkJywgYXN5bmMgKHsgbmFtZSB9OiB7IG5hbWU6IHN0cmluZyB9KSA9PiB7XG4gICAgICAgIHRoaXMucGVyc29uSm9pbmVkLnBlcnNvbkpvaW5lZCh7XG4gICAgICAgICAgbmFtZSxcbiAgICAgICAgICBzaG93QWxlcnQ6IHRoaXMuc2hvd0FsZXJ0LmJpbmQodGhpcyksXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuc29ja2V0LnZhbHVlLm9uKFxuICAgICAgICAncm9vbVJlY29yZFBhcmFtcycsXG4gICAgICAgIGFzeW5jICh7IHJlY29yZFBhcmFtcyB9OiB7IHJlY29yZFBhcmFtczogUmVjb3JkUGFyYW1zIH0pID0+IHtcbiAgICAgICAgICB0aGlzLnJvb21SZWNvcmRQYXJhbXMucm9vbVJlY29yZFBhcmFtcyh7XG4gICAgICAgICAgICByZWNvcmRQYXJhbXMsXG4gICAgICAgICAgICBwYXJhbWV0ZXJzOiB7IC4uLnRoaXMuZ2V0QWxsUGFyYW1zKCksIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgKTtcblxuICAgICAgdGhpcy5zb2NrZXQudmFsdWUub24oJ2JhbicsIGFzeW5jICh7IG5hbWUgfTogeyBuYW1lOiBzdHJpbmcgfSkgPT4ge1xuICAgICAgICBhd2FpdCB0aGlzLmJhblBhcnRpY2lwYW50LmJhblBhcnRpY2lwYW50KHtcbiAgICAgICAgICBuYW1lLFxuICAgICAgICAgIHBhcmFtZXRlcnM6IHsgLi4udGhpcy5nZXRBbGxQYXJhbXMoKSwgLi4udGhpcy5tZWRpYVNGVUZ1bmN0aW9ucygpIH0sXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuc29ja2V0LnZhbHVlLm9uKFxuICAgICAgICAncHJvZHVjZXItbWVkaWEtcGF1c2VkJyxcbiAgICAgICAgYXN5bmMgKHtcbiAgICAgICAgICBwcm9kdWNlcklkLFxuICAgICAgICAgIGtpbmQsXG4gICAgICAgICAgbmFtZSxcbiAgICAgICAgfToge1xuICAgICAgICAgIHByb2R1Y2VySWQ6IHN0cmluZztcbiAgICAgICAgICBraW5kOiAndmlkZW8nIHwgJ2F1ZGlvJyB8ICdzY3JlZW5zaGFyZScgfCAnc2NyZWVuJztcbiAgICAgICAgICBuYW1lOiBzdHJpbmc7XG4gICAgICAgIH0pID0+IHtcbiAgICAgICAgICBhd2FpdCB0aGlzLnByb2R1Y2VyTWVkaWFQYXVzZWQucHJvZHVjZXJNZWRpYVBhdXNlZCh7XG4gICAgICAgICAgICBwcm9kdWNlcklkLFxuICAgICAgICAgICAga2luZCxcbiAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICBwYXJhbWV0ZXJzOiB7IC4uLnRoaXMuZ2V0QWxsUGFyYW1zKCksIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgKTtcblxuICAgICAgdGhpcy5zb2NrZXQudmFsdWUub24oXG4gICAgICAgICdwcm9kdWNlci1tZWRpYS1yZXN1bWVkJyxcbiAgICAgICAgYXN5bmMgKHsga2luZCwgbmFtZSB9OiB7IGtpbmQ6ICdhdWRpbyc7IG5hbWU6IHN0cmluZyB9KSA9PiB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5wcm9kdWNlck1lZGlhUmVzdW1lZC5wcm9kdWNlck1lZGlhUmVzdW1lZCh7XG4gICAgICAgICAgICBraW5kLFxuICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgIHBhcmFtZXRlcnM6IHsgLi4udGhpcy5nZXRBbGxQYXJhbXMoKSwgLi4udGhpcy5tZWRpYVNGVUZ1bmN0aW9ucygpIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICApO1xuXG4gICAgICB0aGlzLnNvY2tldC52YWx1ZS5vbihcbiAgICAgICAgJ3Byb2R1Y2VyLW1lZGlhLWNsb3NlZCcsXG4gICAgICAgIGFzeW5jICh7XG4gICAgICAgICAgcHJvZHVjZXJJZCxcbiAgICAgICAgICBraW5kLFxuICAgICAgICB9OiB7XG4gICAgICAgICAgcHJvZHVjZXJJZDogc3RyaW5nO1xuICAgICAgICAgIGtpbmQ6ICd2aWRlbycgfCAnYXVkaW8nIHwgJ3NjcmVlbnNoYXJlJyB8ICdzY3JlZW4nO1xuICAgICAgICB9KSA9PiB7XG4gICAgICAgICAgaWYgKHByb2R1Y2VySWQgJiYga2luZCkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wcm9kdWNlck1lZGlhQ2xvc2VkLnByb2R1Y2VyTWVkaWFDbG9zZWQoe1xuICAgICAgICAgICAgICBwcm9kdWNlcklkLFxuICAgICAgICAgICAgICBraW5kLFxuICAgICAgICAgICAgICBwYXJhbWV0ZXJzOiB7IC4uLnRoaXMuZ2V0QWxsUGFyYW1zKCksIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgKTtcblxuICAgICAgdGhpcy5zb2NrZXQudmFsdWUub24oJ21lZXRpbmdFbmRlZCcsIGFzeW5jICgpID0+IHtcbiAgICAgICAgYXdhaXQgdGhpcy5tZWV0aW5nRW5kZWQubWVldGluZ0VuZGVkKHtcbiAgICAgICAgICBzaG93QWxlcnQ6IHRoaXMuc2hvd0FsZXJ0LmJpbmQodGhpcyksXG4gICAgICAgICAgcmVkaXJlY3RVUkw6IHRoaXMucmVkaXJlY3RVUkwudmFsdWUsXG4gICAgICAgICAgb25XZWI6IHRydWUsXG4gICAgICAgICAgZXZlbnRUeXBlOiB0aGlzLmV2ZW50VHlwZS52YWx1ZSxcbiAgICAgICAgICB1cGRhdGVWYWxpZGF0ZWQ6IHRoaXMudXBkYXRlVmFsaWRhdGVkLmJpbmQodGhpcyksXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0aGlzLnZpZGVvQWxyZWFkeU9uLnZhbHVlKSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5jbGlja1ZpZGVvLmNsaWNrVmlkZW8oe1xuICAgICAgICAgICAgcGFyYW1ldGVyczoge1xuICAgICAgICAgICAgICAuLi50aGlzLmdldEFsbFBhcmFtcygpLFxuICAgICAgICAgICAgICAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmF1ZGlvQWxyZWFkeU9uLnZhbHVlKSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5jbGlja0F1ZGlvLmNsaWNrQXVkaW8oe1xuICAgICAgICAgICAgcGFyYW1ldGVyczoge1xuICAgICAgICAgICAgICAuLi50aGlzLmdldEFsbFBhcmFtcygpLFxuICAgICAgICAgICAgICAuLi50aGlzLm1lZGlhU0ZVRnVuY3Rpb25zKCksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgYXdhaXQgdGhpcy5jbG9zZUFuZFJlc2V0KCk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5zb2NrZXQudmFsdWUub24oJ2Rpc2Nvbm5lY3RVc2VyU2VsZicsIGFzeW5jICgpID0+IHtcbiAgICAgICAgYXdhaXQgdGhpcy5kaXNjb25uZWN0VXNlclNlbGYuZGlzY29ubmVjdFVzZXJTZWxmKHtcbiAgICAgICAgICBzb2NrZXQ6IHRoaXMuc29ja2V0LnZhbHVlLFxuICAgICAgICAgIG1lbWJlcjogdGhpcy5tZW1iZXIudmFsdWUsXG4gICAgICAgICAgcm9vbU5hbWU6IHRoaXMucm9vbU5hbWUudmFsdWUsXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuc29ja2V0LnZhbHVlLm9uKCdyZWNlaXZlTWVzc2FnZScsIGFzeW5jICh7IG1lc3NhZ2UgfTogeyBtZXNzYWdlOiBNZXNzYWdlIH0pID0+IHtcbiAgICAgICAgYXdhaXQgdGhpcy5yZWNlaXZlTWVzc2FnZS5yZWNlaXZlTWVzc2FnZSh7XG4gICAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgICBtZXNzYWdlczogdGhpcy5tZXNzYWdlcy52YWx1ZSxcbiAgICAgICAgICBwYXJ0aWNpcGFudHNBbGw6IHRoaXMucGFydGljaXBhbnRzQWxsLnZhbHVlLFxuICAgICAgICAgIG1lbWJlcjogdGhpcy5tZW1iZXIudmFsdWUsXG4gICAgICAgICAgZXZlbnRUeXBlOiB0aGlzLmV2ZW50VHlwZS52YWx1ZSxcbiAgICAgICAgICBpc2xldmVsOiB0aGlzLmlzbGV2ZWwudmFsdWUsXG4gICAgICAgICAgY29Ib3N0OiB0aGlzLmNvSG9zdC52YWx1ZSxcbiAgICAgICAgICB1cGRhdGVNZXNzYWdlczogdGhpcy51cGRhdGVNZXNzYWdlcy5iaW5kKHRoaXMpLFxuICAgICAgICAgIHVwZGF0ZVNob3dNZXNzYWdlc0JhZGdlOiB0aGlzLnVwZGF0ZVNob3dNZXNzYWdlc0JhZGdlLmJpbmQodGhpcyksXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuc29ja2V0LnZhbHVlLm9uKFxuICAgICAgICAnbWVldGluZ1RpbWVSZW1haW5pbmcnLFxuICAgICAgICBhc3luYyAoeyB0aW1lUmVtYWluaW5nIH06IHsgdGltZVJlbWFpbmluZzogbnVtYmVyIH0pID0+IHtcbiAgICAgICAgICBhd2FpdCB0aGlzLm1lZXRpbmdUaW1lUmVtYWluaW5nLm1lZXRpbmdUaW1lUmVtYWluaW5nKHtcbiAgICAgICAgICAgIHRpbWVSZW1haW5pbmcsXG4gICAgICAgICAgICBzaG93QWxlcnQ6IHRoaXMuc2hvd0FsZXJ0LmJpbmQodGhpcyksXG4gICAgICAgICAgICBldmVudFR5cGU6IHRoaXMuZXZlbnRUeXBlLnZhbHVlLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgKTtcblxuICAgICAgdGhpcy5zb2NrZXQudmFsdWUub24oJ21lZXRpbmdTdGlsbFRoZXJlJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICB0aGlzLm1lZXRpbmdTdGlsbFRoZXJlLm1lZXRpbmdTdGlsbFRoZXJlKHtcbiAgICAgICAgICB1cGRhdGVJc0NvbmZpcm1IZXJlTW9kYWxWaXNpYmxlOiB0aGlzLnVwZGF0ZUlzQ29uZmlybUhlcmVNb2RhbFZpc2libGUuYmluZCh0aGlzKSxcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5zb2NrZXQudmFsdWUub24oJ3N0YXJ0UmVjb3JkcycsIGFzeW5jICgpID0+IHtcbiAgICAgICAgYXdhaXQgdGhpcy5zdGFydFJlY29yZHMuc3RhcnRSZWNvcmRzKHtcbiAgICAgICAgICByb29tTmFtZTogdGhpcy5yb29tTmFtZS52YWx1ZSxcbiAgICAgICAgICBtZW1iZXI6IHRoaXMubWVtYmVyLnZhbHVlLFxuICAgICAgICAgIHNvY2tldDogdGhpcy5zb2NrZXQudmFsdWUsXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuc29ja2V0LnZhbHVlLm9uKCdyZUluaXRpYXRlUmVjb3JkaW5nJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBhd2FpdCB0aGlzLnJlSW5pdGlhdGVSZWNvcmRpbmcucmVJbml0aWF0ZVJlY29yZGluZyh7XG4gICAgICAgICAgcm9vbU5hbWU6IHRoaXMucm9vbU5hbWUudmFsdWUsXG4gICAgICAgICAgbWVtYmVyOiB0aGlzLm1lbWJlci52YWx1ZSxcbiAgICAgICAgICBzb2NrZXQ6IHRoaXMuc29ja2V0LnZhbHVlLFxuICAgICAgICAgIGFkbWluUmVzdHJpY3RTZXR0aW5nOiB0aGlzLmFkbWluUmVzdHJpY3RTZXR0aW5nLnZhbHVlLFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnNvY2tldC52YWx1ZS5vbihcbiAgICAgICAgJ3VwZGF0ZUNvbnN1bWluZ0RvbWFpbnMnLFxuICAgICAgICBhc3luYyAoeyBkb21haW5zLCBhbHRfZG9tYWlucyB9OiBVcGRhdGVDb25zdW1pbmdEb21haW5zRGF0YSkgPT4ge1xuICAgICAgICAgIGF3YWl0IHRoaXMudXBkYXRlQ29uc3VtaW5nRG9tYWlucy51cGRhdGVDb25zdW1pbmdEb21haW5zKHtcbiAgICAgICAgICAgIGRvbWFpbnMsXG4gICAgICAgICAgICBhbHRfZG9tYWlucyxcbiAgICAgICAgICAgIGFwaVVzZXJOYW1lLFxuICAgICAgICAgICAgYXBpS2V5LFxuICAgICAgICAgICAgYXBpVG9rZW4sXG4gICAgICAgICAgICBwYXJhbWV0ZXJzOiB7XG4gICAgICAgICAgICAgIC4uLnRoaXMuZ2V0QWxsUGFyYW1zKCksXG4gICAgICAgICAgICAgIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICApO1xuXG4gICAgICB0aGlzLnNvY2tldC52YWx1ZS5vbihcbiAgICAgICAgJ1JlY29yZGluZ05vdGljZScsXG4gICAgICAgIGFzeW5jICh7IHN0YXRlLCB1c2VyUmVjb3JkaW5nUGFyYW0sIHBhdXNlQ291bnQsIHRpbWVEb25lIH06IFJlY29yZGluZ05vdGljZURhdGEpID0+IHtcbiAgICAgICAgICBhd2FpdCB0aGlzLnJlY29yZGluZ05vdGljZS5SZWNvcmRpbmdOb3RpY2Uoe1xuICAgICAgICAgICAgc3RhdGUsXG4gICAgICAgICAgICB1c2VyUmVjb3JkaW5nUGFyYW0sXG4gICAgICAgICAgICBwYXVzZUNvdW50LFxuICAgICAgICAgICAgdGltZURvbmUsXG4gICAgICAgICAgICBwYXJhbWV0ZXJzOiB7IC4uLnRoaXMuZ2V0QWxsUGFyYW1zKCksIC4uLnRoaXMubWVkaWFTRlVGdW5jdGlvbnMoKSB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgKTtcblxuICAgICAgdGhpcy5zb2NrZXQudmFsdWUub24oJ3RpbWVMZWZ0UmVjb3JkaW5nJywgYXN5bmMgKHsgdGltZUxlZnQgfTogeyB0aW1lTGVmdDogbnVtYmVyIH0pID0+IHtcbiAgICAgICAgdGhpcy50aW1lTGVmdFJlY29yZGluZy50aW1lTGVmdFJlY29yZGluZyh7XG4gICAgICAgICAgdGltZUxlZnQsXG4gICAgICAgICAgc2hvd0FsZXJ0OiB0aGlzLnNob3dBbGVydC5iaW5kKHRoaXMpLFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnNvY2tldC52YWx1ZS5vbihcbiAgICAgICAgJ3N0b3BwZWRSZWNvcmRpbmcnLFxuICAgICAgICBhc3luYyAoeyBzdGF0ZSwgcmVhc29uIH06IHsgc3RhdGU6IHN0cmluZzsgcmVhc29uOiBzdHJpbmcgfSkgPT4ge1xuICAgICAgICAgIGF3YWl0IHRoaXMuc3RvcHBlZFJlY29yZGluZy5zdG9wcGVkUmVjb3JkaW5nKHtcbiAgICAgICAgICAgIHN0YXRlLFxuICAgICAgICAgICAgcmVhc29uLFxuICAgICAgICAgICAgc2hvd0FsZXJ0OiB0aGlzLnNob3dBbGVydC5iaW5kKHRoaXMpLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgKTtcblxuICAgICAgYXdhaXQgdGhpcy5qb2luX1Jvb20oe1xuICAgICAgICBzb2NrZXQ6IHRoaXMuc29ja2V0LnZhbHVlLFxuICAgICAgICByb29tTmFtZTogdGhpcy5yb29tTmFtZS52YWx1ZSxcbiAgICAgICAgaXNsZXZlbDogdGhpcy5pc2xldmVsLnZhbHVlLFxuICAgICAgICBtZW1iZXI6IHRoaXMubWVtYmVyLnZhbHVlLFxuICAgICAgICBzZWM6IHRoaXMuYXBpVG9rZW4udmFsdWUsXG4gICAgICAgIGFwaVVzZXJOYW1lOiB0aGlzLmFwaVVzZXJOYW1lLnZhbHVlLFxuICAgICAgfSk7XG4gICAgICBhd2FpdCB0aGlzLnJlY2VpdmVSb29tTWVzc2FnZXMucmVjZWl2ZVJvb21NZXNzYWdlcyh7XG4gICAgICAgIHNvY2tldDogdGhpcy5zb2NrZXQudmFsdWUsXG4gICAgICAgIHJvb21OYW1lOiB0aGlzLnJvb21OYW1lLnZhbHVlLFxuICAgICAgICB1cGRhdGVNZXNzYWdlczogdGhpcy51cGRhdGVNZXNzYWdlcy5iaW5kKHRoaXMpLFxuICAgICAgfSk7XG4gICAgICB0aGlzLnByZXBvcHVsYXRlVXNlck1lZGlhLnByZXBvcHVsYXRlVXNlck1lZGlhKHtcbiAgICAgICAgbmFtZTogdGhpcy5ob3N0TGFiZWwudmFsdWUsXG4gICAgICAgIHBhcmFtZXRlcnM6IHsgLi4udGhpcy5nZXRBbGxQYXJhbXMoKSwgLi4udGhpcy5tZWRpYVNGVUZ1bmN0aW9ucygpIH0sXG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHRoaXMuc29ja2V0LnZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cbn1cbiJdfQ==