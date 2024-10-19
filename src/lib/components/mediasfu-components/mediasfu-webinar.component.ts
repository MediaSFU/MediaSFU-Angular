import {
  Component,
  HostListener,
  Injector,
  ChangeDetectorRef,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Subscription, combineLatest } from 'rxjs';
import { Socket } from 'socket.io-client';
import {
  faPlayCircle,
  faPauseCircle,
  faStopCircle,
  faDotCircle,
  faRecordVinyl,
  faCog,
  faUsers,
  faClock,
  faUserPlus,
  faTools,
  faDesktop,
  faPoll,
  faUserFriends,
  faChalkboardTeacher,
  faMicrophone,
  faMicrophoneSlash,
  faVideo,
  faVideoSlash,
  faPhone,
  faBars,
  faComments,
  faChartBar,
} from '@fortawesome/free-solid-svg-icons';

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
import {
  WelcomePage,
  WelcomePageOptions,
} from '../misc-components/welcome-page/welcome-page.component';

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

import {
  ResponseJoinRoom,
  CoHostResponsibility,
  EventType,
  Participant,
  ConsumeSocket,
  MeetingRoomParams,
  VidCons,
  HParamsType,
  VParamsType,
  ScreenParamsType,
  AParamsType,
  UserRecordingParams,
  Stream,
  AudioDecibels,
  ScreenState,
  GridSizes,
  CustomMediaComponent,
  Message,
  WaitingRoomParticipant,
  ComponentSizes,
  Transport as TransportType,
  Shape,
  Poll,
  BreakoutParticipant,
  WhiteboardUser,
  Request,
  AllMembersData,
  AllMembersRestData,
  BreakoutRoomUpdatedData,
  AllWaitingRoomMembersData,
  MainButtonAlt,
  MainCustomButton,
  RecordParams,
  SeedData,
  UpdatedCoHostData,
  Settings,
  UpdateConsumingDomainsData,
  RecordingNoticeData,
  HostRequestResponseData,
  PollUpdatedData,
  PreJoinPageOptions,
} from '../../@types/types';

//import methods for control (samples)
// Import methods for control (samples)
import { LaunchMenuModal } from '../../methods/menu-methods/launch-menu-modal.service';
import { LaunchRecording } from '../../methods/recording-methods/launch-recording.service';
import { StartRecording } from '../../methods/recording-methods/start-recording.service';
import { ConfirmRecording } from '../../methods/recording-methods/confirm-recording.service';
import { LaunchWaiting } from '../../methods/waiting-methods/launch-waiting.service';
import { launchCoHost } from '../../methods/co-host-methods/launch-co-host.service';
import { LaunchMediaSettings } from '../../methods/media-settings-methods/launch-media-settings.service';
import { LaunchDisplaySettings } from '../../methods/display-settings-methods/launch-display-settings.service';
import { LaunchSettings } from '../../methods/settings-methods/launch-settings.service';
import { LaunchRequests } from '../../methods/requests-methods/launch-requests.service';
import { LaunchParticipants } from '../../methods/participants-methods/launch-participants.service';
import { LaunchMessages } from '../../methods/message-methods/launch-messages.service';
import { LaunchConfirmExit } from '../../methods/exit-methods/launch-confirm-exit.service';

import { LaunchPoll } from '../../methods/polls-methods/launch-poll.service';
import { LaunchBreakoutRooms } from '../../methods/breakout-room-methods/launch-breakout-rooms.service';
import { LaunchConfigureWhiteboard } from '../../methods/whiteboard-methods/launch-configure-whiteboard.service';

// mediasfu functions -- examples
import { SocketManager } from '../../sockets/socket-manager.service';
import { JoinRoomClient } from '../../producer-client/producer-client-emits/join-room-client.service';
import { UpdateRoomParametersClient } from '../../producer-client/producer-client-emits/update-room-parameters-client.service';
import { CreateDeviceClient } from '../../producer-client/producer-client-emits/create-device-client.service';

import { ClickVideo } from '../../methods/stream-methods/click-video.service';
import { ClickAudio } from '../../methods/stream-methods/click-audio.service';
import { ClickScreenShare } from '../../methods/stream-methods/click-screen-share.service';
import { StreamSuccessVideo } from '../../consumers/stream-success-video.service';
import { StreamSuccessAudio } from '../../consumers/stream-success-audio.service';
import { StreamSuccessScreen } from '../../consumers/stream-success-screen.service';
import { StreamSuccessAudioSwitch } from '../../consumers/stream-success-audio-switch.service';
import { CheckPermission } from '../../consumers/check-permission.service';

// mediasfu functions
import { UpdateMiniCardsGrid } from '../../consumers/update-mini-cards-grid.service';
import { MixStreams } from '../../consumers/mix-streams.service';
import { DispStreams } from '../../consumers/disp-streams.service';
import { StopShareScreen } from '../../consumers/stop-share-screen.service';
import { CheckScreenShare } from '../../consumers/check-screen-share.service';
import { StartShareScreen } from '../../consumers/start-share-screen.service';
import { RequestScreenShare } from '../../consumers/request-screen-share.service';
import { ReorderStreams } from '../../consumers/reorder-streams.service';
import { PrepopulateUserMedia } from '../../consumers/prepopulate-user-media.service';
import { GetVideos } from '../../consumers/get-videos.service';
import { RePort } from '../../consumers/re-port.service';
import { Trigger } from '../../consumers/trigger.service';
import { ConsumerResume } from '../../consumers/consumer-resume.service';
import { ConnectSendTransportAudio } from '../../consumers/connect-send-transport-audio.service';
import { ConnectSendTransportVideo } from '../../consumers/connect-send-transport-video.service';
import { ConnectSendTransportScreen } from '../../consumers/connect-send-transport-screen.service';
import { ProcessConsumerTransports } from '../../consumers/process-consumer-transports.service';
import { ResumePauseStreams } from '../../consumers/resume-pause-streams.service';
import { Readjust } from '../../consumers/readjust.service';
import { CheckGrid } from '../../consumers/check-grid.service';
import { GetEstimate } from '../../consumers/get-estimate.service';
import { CalculateRowsAndColumns } from '../../consumers/calculate-rows-and-columns.service';
import { AddVideosGrid } from '../../consumers/add-videos-grid.service';
import { OnScreenChanges } from '../../consumers/on-screen-changes.service';
import { sleep } from '../../methods/utils/sleep.util';
import { ChangeVids } from '../../consumers/change-vids.service';
import { CompareActiveNames } from '../../consumers/compare-active-names.service';
import { CompareScreenStates } from '../../consumers/compare-screen-states.service';
import { CreateSendTransport } from '../../consumers/create-send-transport.service';
import { ResumeSendTransportAudio } from '../../consumers/resume-send-transport-audio.service';
import { ReceiveAllPipedTransports } from '../../consumers/receive-all-piped-transports.service';
import { DisconnectSendTransportVideo } from '../../consumers/disconnect-send-transport-video.service';
import { DisconnectSendTransportAudio } from '../../consumers/disconnect-send-transport-audio.service';
import { DisconnectSendTransportScreen } from '../../consumers/disconnect-send-transport-screen.service';
import { ConnectSendTransport } from '../../consumers/connect-send-transport.service';
import { GetPipedProducersAlt } from '../../consumers/get-piped-producers-alt.service';
import { SignalNewConsumerTransport } from '../../consumers/signal-new-consumer-transport.service';
import { ConnectRecvTransport } from '../../consumers/connect-recv-transport.service';
import { ReUpdateInter } from '../../consumers/re-update-inter.service';
import { UpdateParticipantAudioDecibels } from '../../consumers/update-participant-audio-decibels.service';
import { CloseAndResize } from '../../consumers/close-and-resize.service';
import { AutoAdjust } from '../../consumers/auto-adjust.service';
import { SwitchUserVideoAlt } from '../../consumers/switch-user-video-alt.service';
import { SwitchUserVideo } from '../../consumers/switch-user-video.service';
import { SwitchUserAudio } from '../../consumers/switch-user-audio.service';
import { ReceiveRoomMessages } from '../../consumers/receive-room-messages.service';
import { FormatNumber } from '../../methods/utils/format-number.service';
import { ConnectIps } from '../../consumers/connect-ips.service';

import { PollUpdated } from '../../methods/polls-methods/poll-updated.service';
import { HandleCreatePoll } from '../../methods/polls-methods/handle-create-poll.service';
import { HandleVotePoll } from '../../methods/polls-methods/handle-vote-poll.service';
import { HandleEndPoll } from '../../methods/polls-methods/handle-end-poll.service';

import { BreakoutRoomUpdated } from '../../methods/breakout-room-methods/breakout-room-updated.service';

import { StartMeetingProgressTimer } from '../../methods/utils/meeting-timer/start-meeting-progress-timer.service';
import { UpdateRecording } from '../../methods/recording-methods/update-recording.service';
import { StopRecording } from '../../methods/recording-methods/stop-recording.service';

import { UserWaiting } from '../../producers/socket-receive-methods/user-waiting.service';
import { PersonJoined } from '../../producers/socket-receive-methods/person-joined.service';
import { AllWaitingRoomMembers } from '../../producers/socket-receive-methods/all-waiting-room-members.service';
import { RoomRecordParams } from '../../producers/socket-receive-methods/room-record-params.service';
import { BanParticipant } from '../../producers/socket-receive-methods/ban-participant.service';
import { UpdatedCoHost } from '../../producers/socket-receive-methods/updated-co-host.service';
import { ParticipantRequested } from '../../producers/socket-receive-methods/participant-requested.service';
import { ScreenProducerId } from '../../producers/socket-receive-methods/screen-producer-id.service';
import { UpdateMediaSettings } from '../../producers/socket-receive-methods/update-media-settings.service';
import { ProducerMediaPaused } from '../../producers/socket-receive-methods/producer-media-paused.service';
import { ProducerMediaResumed } from '../../producers/socket-receive-methods/producer-media-resumed.service';
import { ProducerMediaClosed } from '../../producers/socket-receive-methods/producer-media-closed.service';
import { ControlMediaHost } from '../../producers/socket-receive-methods/control-media-host.service';
import { MeetingEnded } from '../../producers/socket-receive-methods/meeting-ended.service';
import { DisconnectUserSelf } from '../../producers/socket-receive-methods/disconnect-user-self.service';
import { ReceiveMessage } from '../../producers/socket-receive-methods/receive-message.service';
import { MeetingTimeRemaining } from '../../producers/socket-receive-methods/meeting-time-remaining.service';
import { MeetingStillThere } from '../../producers/socket-receive-methods/meeting-still-there.service';
import { StartRecords } from '../../producers/socket-receive-methods/start-records.service';
import { ReInitiateRecording } from '../../producers/socket-receive-methods/re-initiate-recording.service';
import { GetDomains } from '../../producers/socket-receive-methods/get-domains.service';
import { UpdateConsumingDomains } from '../../producers/socket-receive-methods/update-consuming-domains.service';
import { RecordingNotice } from '../../producers/socket-receive-methods/recording-notice.service';
import { TimeLeftRecording } from '../../producers/socket-receive-methods/time-left-recording.service';
import { StoppedRecording } from '../../producers/socket-receive-methods/stopped-recording.service';
import { HostRequestResponse } from '../../producers/socket-receive-methods/host-request-response.service';
import { AllMembers } from '../../producers/socket-receive-methods/all-members.service';
import { AllMembersRest } from '../../producers/socket-receive-methods/all-members-rest.service';
import { Disconnect } from '../../producers/socket-receive-methods/disconnect.service';

import { CaptureCanvasStream } from '../../methods/whiteboard-methods/capture-canvas-stream.service';
import { ResumePauseAudioStreams } from '../../consumers/resume-pause-audio-streams.service';
import { ProcessConsumerTransportsAudio } from '../../consumers/process-consumer-transports-audio.service';

import {
  Device,
  Producer,
  ProducerOptions,
  RtpCapabilities,
  Transport,
} from 'mediasoup-client/lib/types';
import { SelfieSegmentation } from '@mediapipe/selfie_segmentation';

/**
 * Options for configuring the MediasfuWebinar component.
 *
 * @typedef {Object} MediasfuWebinarOptions
 * @property {(options: PreJoinPageOptions | WelcomePageOptions) => HTMLElement} [PrejoinPage] - A function that returns an HTMLElement for the pre-join page.
 * @property {{ apiUserName: string; apiKey: string }} [credentials] - Credentials for API access, including username and API key.
 * @property {boolean} [useLocalUIMode] - Flag to determine if the local UI mode should be used.
 * @property {SeedData} [seedData] - Data used for seeding the component.
 * @property {boolean} [useSeed] - Flag to determine if seed data should be used.
 * @property {string} [imgSrc] - Source URL for an image to be used in the component.
 */
export type MediasfuWebinarOptions = {
  PrejoinPage?: (options: PreJoinPageOptions | WelcomePageOptions) => HTMLElement;
  credentials?: { apiUserName: string; apiKey: string };
  useLocalUIMode?: boolean;
  seedData?: SeedData;
  useSeed?: boolean;
  imgSrc?: string;
};

@Component({
  selector: 'app-mediasfu-webinar',
  standalone: true,
  imports: [
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
  ],
  template: `
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
  `,
  styles: [
    `
      .MediaSFU {
        /* Add any component-specific styles here */
      }
    `,
  ],
  providers: [CookieService],
})
export class MediasfuWebinar implements OnInit, OnDestroy {
  @Input()
  PrejoinPage: any = WelcomePage;
  @Input() credentials: { apiUserName: string; apiKey: string } = { apiUserName: '', apiKey: '' };
  @Input() useLocalUIMode = false;
  @Input() seedData?: SeedData;
  @Input() useSeed = false;
  @Input() imgSrc = 'https://mediasfu.com/images/logo192.png';

  title = 'MediaSFU-Webinar';

  private mainHeightWidthSubscription: Subscription | undefined;
  private validatedSubscription: Subscription | undefined;
  private islevelSubscription: Subscription | undefined;
  private coHostSubscription: Subscription | undefined;
  private buttonSubscriptions: Subscription[] = [];
  private ScreenboardSubscription: Subscription | undefined;
  private recordingSubscription: Subscription | undefined;

  constructor(
    private cdr: ChangeDetectorRef,
    private injector: Injector,
    public updateMiniCardsGrid: UpdateMiniCardsGrid,
    public mixStreams: MixStreams,
    public dispStreams: DispStreams,
    public stopShareScreen: StopShareScreen,
    public checkScreenShare: CheckScreenShare,
    public startShareScreen: StartShareScreen,
    public requestScreenShare: RequestScreenShare,
    public reorderStreams: ReorderStreams,
    public prepopulateUserMedia: PrepopulateUserMedia,
    public getVideos: GetVideos,
    public rePort: RePort,
    public trigger: Trigger,
    public consumerResume: ConsumerResume,
    public connectSendTransport: ConnectSendTransport,
    public connectSendTransportAudio: ConnectSendTransportAudio,
    public connectSendTransportVideo: ConnectSendTransportVideo,
    public connectSendTransportScreen: ConnectSendTransportScreen,
    public processConsumerTransports: ProcessConsumerTransports,
    public resumePauseStreams: ResumePauseStreams,
    public readjust: Readjust,
    public checkGrid: CheckGrid,
    public getEstimate: GetEstimate,
    public calculateRowsAndColumns: CalculateRowsAndColumns,
    public addVideosGrid: AddVideosGrid,
    public onScreenChanges: OnScreenChanges,
    public changeVids: ChangeVids,
    public compareActiveNames: CompareActiveNames,
    public compareScreenStates: CompareScreenStates,
    public createSendTransport: CreateSendTransport,
    public resumeSendTransportAudio: ResumeSendTransportAudio,
    public receiveAllPipedTransports: ReceiveAllPipedTransports,
    public disconnectSendTransportVideo: DisconnectSendTransportVideo,
    public disconnectSendTransportAudio: DisconnectSendTransportAudio,
    public disconnectSendTransportScreen: DisconnectSendTransportScreen,
    public getPipedProducersAlt: GetPipedProducersAlt,
    public signalNewConsumerTransport: SignalNewConsumerTransport,
    public connectRecvTransport: ConnectRecvTransport,
    public reUpdateInter: ReUpdateInter,
    public updateParticipantAudioDecibels: UpdateParticipantAudioDecibels,
    public closeAndResize: CloseAndResize,
    public autoAdjust: AutoAdjust,
    public switchUserVideoAlt: SwitchUserVideoAlt,
    public switchUserVideo: SwitchUserVideo,
    public switchUserAudio: SwitchUserAudio,
    public getDomains: GetDomains,
    public formatNumber: FormatNumber,
    public connectIps: ConnectIps,
    public createDeviceClient: CreateDeviceClient,
    public handleCreatePoll: HandleCreatePoll,
    public handleEndPoll: HandleEndPoll,
    public handleVotePoll: HandleVotePoll,
    public captureCanvasStream: CaptureCanvasStream,
    public resumePauseAudioStreams: ResumePauseAudioStreams,
    public processConsumerTransportsAudio: ProcessConsumerTransportsAudio,

    public launchMenuModal: LaunchMenuModal,
    public launchRecording: LaunchRecording,
    public startRecording: StartRecording,
    public confirmRecording: ConfirmRecording,
    public launchWaiting: LaunchWaiting,
    public launchCoHost: launchCoHost,
    public launchMediaSettings: LaunchMediaSettings,
    public launchDisplaySettings: LaunchDisplaySettings,
    public launchSettings: LaunchSettings,
    public launchRequests: LaunchRequests,
    public launchParticipants: LaunchParticipants,
    public launchMessages: LaunchMessages,
    public launchConfirmExit: LaunchConfirmExit,
    public launchPoll: LaunchPoll,
    public launchBreakoutRooms: LaunchBreakoutRooms,
    public launchConfigureWhiteboard: LaunchConfigureWhiteboard,
    public startMeetingProgressTimer: StartMeetingProgressTimer,
    public updateRecording: UpdateRecording,
    public stopRecording: StopRecording,
    public userWaiting: UserWaiting,
    public personJoined: PersonJoined,
    public allWaitingRoomMembers: AllWaitingRoomMembers,
    public roomRecordParams: RoomRecordParams,
    public banParticipant: BanParticipant,
    public updatedCoHost: UpdatedCoHost,
    public participantRequested: ParticipantRequested,
    public screenProducerId: ScreenProducerId,
    public updateMediaSettings: UpdateMediaSettings,
    public producerMediaPaused: ProducerMediaPaused,
    public producerMediaResumed: ProducerMediaResumed,
    public producerMediaClosed: ProducerMediaClosed,
    public controlMediaHost: ControlMediaHost,
    public meetingEnded: MeetingEnded,
    public disconnectUserSelf: DisconnectUserSelf,
    public receiveMessage: ReceiveMessage,
    public meetingTimeRemaining: MeetingTimeRemaining,
    public meetingStillThere: MeetingStillThere,
    public startRecords: StartRecords,
    public reInitiateRecording: ReInitiateRecording,
    public recordingNotice: RecordingNotice,
    public timeLeftRecording: TimeLeftRecording,
    public stoppedRecording: StoppedRecording,
    public hostRequestResponse: HostRequestResponse,
    public allMembers: AllMembers,
    public allMembersRest: AllMembersRest,
    public disconnect: Disconnect,
    public pollUpdated: PollUpdated,
    public breakoutRoomUpdated: BreakoutRoomUpdated,
    public socketManager: SocketManager,
    public joinRoomClient: JoinRoomClient,
    public updateRoomParametersClient: UpdateRoomParametersClient,
    public clickVideo: ClickVideo,
    public clickAudio: ClickAudio,
    public clickScreenShare: ClickScreenShare,
    public streamSuccessVideo: StreamSuccessVideo,
    public streamSuccessAudio: StreamSuccessAudio,
    public streamSuccessScreen: StreamSuccessScreen,
    public streamSuccessAudioSwitch: StreamSuccessAudioSwitch,
    public checkPermission: CheckPermission,
    public updateConsumingDomains: UpdateConsumingDomains,
    public receiveRoomMessages: ReceiveRoomMessages,
  ) {}

  createInjector(inputs: any) {
    const inj = Injector.create({
      providers: Object.keys(inputs).map((key) => ({ provide: key, useValue: inputs[key] })),
      parent: this.injector,
    });

    return inj;
  }

  // Initial values
  mediaSFUFunctions = () => {
    return {
      updateMiniCardsGrid:
        this.updateMiniCardsGrid?.updateMiniCardsGrid ||
        (() => {
          console.log('none');
        }),
      mixStreams:
        this.mixStreams?.mixStreams ||
        (() => {
          console.log('none');
        }),
      dispStreams:
        this.dispStreams?.dispStreams ||
        (() => {
          console.log('none');
        }),
      stopShareScreen:
        this.stopShareScreen?.stopShareScreen ||
        (() => {
          console.log('none');
        }),
      checkScreenShare:
        this.checkScreenShare?.checkScreenShare ||
        (() => {
          console.log('none');
        }),
      startShareScreen:
        this.startShareScreen?.startShareScreen ||
        (() => {
          console.log('none');
        }),
      requestScreenShare:
        this.requestScreenShare?.requestScreenShare ||
        (() => {
          console.log('none');
        }),
      reorderStreams:
        this.reorderStreams?.reorderStreams ||
        (() => {
          console.log('none');
        }),
      prepopulateUserMedia:
        this.prepopulateUserMedia?.prepopulateUserMedia ||
        (() => {
          console.log('none');
        }),
      getVideos:
        this.getVideos?.getVideos ||
        (() => {
          console.log('none');
        }),
      rePort:
        this.rePort?.rePort ||
        (() => {
          console.log('none');
        }),
      trigger:
        this.trigger?.trigger ||
        (() => {
          console.log('none');
        }),
      consumerResume:
        this.consumerResume?.consumerResume ||
        (() => {
          console.log('none');
        }),
      connectSendTransport:
        this.connectSendTransport?.connectSendTransport ||
        (() => {
          console.log('none');
        }),
      connectSendTransportAudio:
        this.connectSendTransportAudio?.connectSendTransportAudio ||
        (() => {
          console.log('none');
        }),
      connectSendTransportVideo:
        this.connectSendTransportVideo?.connectSendTransportVideo ||
        (() => {
          console.log('none');
        }),
      connectSendTransportScreen:
        this.connectSendTransportScreen?.connectSendTransportScreen ||
        (() => {
          console.log('none');
        }),
      processConsumerTransports:
        this.processConsumerTransports?.processConsumerTransports ||
        (() => {
          console.log('none');
        }),
      resumePauseStreams:
        this.resumePauseStreams?.resumePauseStreams ||
        (() => {
          console.log('none');
        }),
      readjust:
        this.readjust?.readjust ||
        (() => {
          console.log('none');
        }),
      checkGrid:
        this.checkGrid?.checkGrid ||
        (() => {
          console.log('none');
        }),
      getEstimate:
        this.getEstimate?.getEstimate ||
        (() => {
          console.log('none');
        }),
      calculateRowsAndColumns:
        this.calculateRowsAndColumns?.calculateRowsAndColumns ||
        (() => {
          console.log('none');
        }),
      addVideosGrid:
        this.addVideosGrid?.addVideosGrid ||
        (() => {
          console.log('none');
        }),
      onScreenChanges:
        this.onScreenChanges?.onScreenChanges ||
        (() => {
          console.log('none');
        }),
      sleep:
        sleep ||
        (() => {
          console.log('none');
        }),
      changeVids:
        this.changeVids?.changeVids ||
        (() => {
          console.log('none');
        }),
      compareActiveNames:
        this.compareActiveNames?.compareActiveNames ||
        (() => {
          console.log('none');
        }),
      compareScreenStates:
        this.compareScreenStates?.compareScreenStates ||
        (() => {
          console.log('none');
        }),
      createSendTransport:
        this.createSendTransport?.createSendTransport ||
        (() => {
          console.log('none');
        }),
      resumeSendTransportAudio:
        this.resumeSendTransportAudio?.resumeSendTransportAudio ||
        (() => {
          console.log('none');
        }),
      receiveAllPipedTransports:
        this.receiveAllPipedTransports?.receiveAllPipedTransports ||
        (() => {
          console.log('none');
        }),
      disconnectSendTransportVideo:
        this.disconnectSendTransportVideo?.disconnectSendTransportVideo ||
        (() => {
          console.log('none');
        }),
      disconnectSendTransportAudio:
        this.disconnectSendTransportAudio?.disconnectSendTransportAudio ||
        (() => {
          console.log('none');
        }),
      disconnectSendTransportScreen:
        this.disconnectSendTransportScreen?.disconnectSendTransportScreen ||
        (() => {
          console.log('none');
        }),
      getPipedProducersAlt:
        this.getPipedProducersAlt?.getPipedProducersAlt ||
        (() => {
          console.log('none');
        }),
      signalNewConsumerTransport:
        this.signalNewConsumerTransport?.signalNewConsumerTransport ||
        (() => {
          console.log('none');
        }),
      connectRecvTransport:
        this.connectRecvTransport?.connectRecvTransport ||
        (() => {
          console.log('none');
        }),
      reUpdateInter:
        this.reUpdateInter?.reUpdateInter ||
        (() => {
          console.log('none');
        }),
      updateParticipantAudioDecibels:
        this.updateParticipantAudioDecibels?.updateParticipantAudioDecibels ||
        (() => {
          console.log('none');
        }),
      closeAndResize:
        this.closeAndResize?.closeAndResize ||
        (() => {
          console.log('none');
        }),
      autoAdjust:
        this.autoAdjust?.autoAdjust ||
        (() => {
          console.log('none');
        }),
      switchUserVideoAlt:
        this.switchUserVideoAlt?.switchUserVideoAlt ||
        (() => {
          console.log('none');
        }),
      switchUserVideo:
        this.switchUserVideo?.switchUserVideo ||
        (() => {
          console.log('none');
        }),
      switchUserAudio:
        this.switchUserAudio?.switchUserAudio ||
        (() => {
          console.log('none');
        }),
      getDomains:
        this.getDomains?.getDomains ||
        (() => {
          console.log('none');
        }),
      formatNumber:
        this.formatNumber?.formatNumber ||
        (() => {
          console.log('none');
        }),
      connectIps:
        this.connectIps?.connectIps ||
        (() => {
          console.log('none');
        }),
      createDeviceClient:
        this.createDeviceClient?.createDeviceClient ||
        (() => {
          console.log('none');
        }),
      handleCreatePoll:
        this.handleCreatePoll?.handleCreatePoll ||
        (() => {
          console.log('none');
        }),
      handleEndPoll:
        this.handleEndPoll?.handleEndPoll ||
        (() => {
          console.log('none');
        }),
      handleVotePoll:
        this.handleVotePoll?.handleVotePoll ||
        (() => {
          console.log('none');
        }),
      captureCanvasStream:
        this.captureCanvasStream?.captureCanvasStream ||
        (() => {
          console.log('none');
        }),
      resumePauseAudioStreams:
        this.resumePauseAudioStreams?.resumePauseAudioStreams ||
        (() => {
          console.log('none');
        }),
      processConsumerTransportsAudio:
        this.processConsumerTransportsAudio?.processConsumerTransportsAudio ||
        (() => {
          console.log('none');
        }),
      checkPermission:
        this.checkPermission?.checkPermission ||
        (() => {
          console.log('none');
        }),
      streamSuccessVideo:
        this.streamSuccessVideo?.streamSuccessVideo ||
        (() => {
          console.log('none');
        }),
      streamSuccessAudio:
        this.streamSuccessAudio?.streamSuccessAudio ||
        (() => {
          console.log('none');
        }),
      streamSuccessScreen:
        this.streamSuccessScreen?.streamSuccessScreen ||
        (() => {
          console.log('none');
        }),
      streamSuccessAudioSwitch:
        this.streamSuccessAudioSwitch?.streamSuccessAudioSwitch ||
        (() => {
          console.log('none');
        }),
      clickVideo:
        this.clickVideo?.clickVideo ||
        (() => {
          console.log('none');
        }),
      clickAudio:
        this.clickAudio?.clickAudio ||
        (() => {
          console.log('none');
        }),
      clickScreenShare:
        this.clickScreenShare?.clickScreenShare ||
        (() => {
          console.log('none');
        }),
      requestPermissionCamera:
        this.requestPermissionCamera ||
        (() => {
          console.log('none');
        }),
      requestPermissionAudio:
        this.requestPermissionAudio ||
        (() => {
          console.log('none');
        }),
    };
  };

  validated = new BehaviorSubject<boolean>(false);
  localUIMode = new BehaviorSubject<boolean>(false);
  socket = new BehaviorSubject<Socket>({} as Socket);
  roomData = new BehaviorSubject<ResponseJoinRoom | null>(null);
  device = new BehaviorSubject<Device | null>(null);
  apiKey = new BehaviorSubject<string>(
    '021193742c935c4434d25d7592362575fcb6d6590b6c38334a2f3e06c83af758',
  );
  apiUserName = new BehaviorSubject<string>('abcdefgh');
  apiToken = new BehaviorSubject<string>('');
  link = new BehaviorSubject<string>('');

  roomName = new BehaviorSubject<string>('');
  member = new BehaviorSubject<string>('');
  adminPasscode = new BehaviorSubject<string>('');
  islevel = new BehaviorSubject<string>('1');
  coHost = new BehaviorSubject<string>('No coHost');
  coHostResponsibility = new BehaviorSubject<CoHostResponsibility[]>([
    { name: 'participants', value: false, dedicated: false },
    { name: 'media', value: false, dedicated: false },
    { name: 'waiting', value: false, dedicated: false },
    { name: 'chat', value: false, dedicated: false },
  ]);
  youAreCoHost = new BehaviorSubject<boolean>(false);
  youAreHost = new BehaviorSubject<boolean>(false);
  confirmedToRecord = new BehaviorSubject<boolean>(false);
  meetingDisplayType = new BehaviorSubject<string>('media');
  meetingVideoOptimized = new BehaviorSubject<boolean>(false);
  eventType = new BehaviorSubject<EventType>('webinar');
  participants = new BehaviorSubject<Participant[]>([]);
  filteredParticipants = new BehaviorSubject<Participant[]>([]);
  participantsCounter = new BehaviorSubject<number>(0);
  participantsFilter = new BehaviorSubject<string>('');

  consume_sockets = new BehaviorSubject<ConsumeSocket[]>([]);
  rtpCapabilities = new BehaviorSubject<RtpCapabilities | null>(null);
  roomRecvIPs = new BehaviorSubject<string[]>([]);
  meetingRoomParams = new BehaviorSubject<MeetingRoomParams | null>(null);
  itemPageLimit = new BehaviorSubject<number>(4);
  audioOnlyRoom = new BehaviorSubject<boolean>(false);
  addForBasic = new BehaviorSubject<boolean>(false);
  screenPageLimit = new BehaviorSubject<number>(4);
  shareScreenStarted = new BehaviorSubject<boolean>(false);
  shared = new BehaviorSubject<boolean>(false);
  targetOrientation = new BehaviorSubject<string>('landscape');
  targetResolution = new BehaviorSubject<string>('sd');
  targetResolutionHost = new BehaviorSubject<string>('sd');
  vidCons = new BehaviorSubject<VidCons>({ width: 640, height: 360 });
  frameRate = new BehaviorSubject<number>(10);
  hParams = new BehaviorSubject<HParamsType>({} as HParamsType);
  vParams = new BehaviorSubject<VParamsType>({} as VParamsType);
  screenParams = new BehaviorSubject<ScreenParamsType>({} as ScreenParamsType);
  aParams = new BehaviorSubject<AParamsType>({} as AParamsType);

  recordingAudioPausesLimit = new BehaviorSubject<number>(0);
  recordingAudioPausesCount = new BehaviorSubject<number>(0);
  recordingAudioSupport = new BehaviorSubject<boolean>(false);
  recordingAudioPeopleLimit = new BehaviorSubject<number>(0);
  recordingAudioParticipantsTimeLimit = new BehaviorSubject<number>(0);
  recordingVideoPausesCount = new BehaviorSubject<number>(0);
  recordingVideoPausesLimit = new BehaviorSubject<number>(0);
  recordingVideoSupport = new BehaviorSubject<boolean>(false);
  recordingVideoPeopleLimit = new BehaviorSubject<number>(0);
  recordingVideoParticipantsTimeLimit = new BehaviorSubject<number>(0);
  recordingAllParticipantsSupport = new BehaviorSubject<boolean>(false);
  recordingVideoParticipantsSupport = new BehaviorSubject<boolean>(false);
  recordingAllParticipantsFullRoomSupport = new BehaviorSubject<boolean>(false);
  recordingVideoParticipantsFullRoomSupport = new BehaviorSubject<boolean>(false);
  recordingPreferredOrientation = new BehaviorSubject<string>('landscape');
  recordingSupportForOtherOrientation = new BehaviorSubject<boolean>(false);
  recordingMultiFormatsSupport = new BehaviorSubject<boolean>(false);

  userRecordingParams = new BehaviorSubject<UserRecordingParams>({
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

  canRecord = new BehaviorSubject<boolean>(false);
  startReport = new BehaviorSubject<boolean>(false);
  endReport = new BehaviorSubject<boolean>(false);
  recordTimerInterval = new BehaviorSubject<NodeJS.Timeout | null>(null);
  recordStartTime = new BehaviorSubject<number>(0);
  recordElapsedTime = new BehaviorSubject<number>(0);
  isTimerRunning = new BehaviorSubject<boolean>(false);
  canPauseResume = new BehaviorSubject<boolean>(false);
  recordChangeSeconds = new BehaviorSubject<number>(15000);
  pauseLimit = new BehaviorSubject<number>(0);
  pauseRecordCount = new BehaviorSubject<number>(0);
  canLaunchRecord = new BehaviorSubject<boolean>(true);
  stopLaunchRecord = new BehaviorSubject<boolean>(false);

  participantsAll = new BehaviorSubject<Participant[]>([]);

  firstAll = new BehaviorSubject<boolean>(false);
  updateMainWindow = new BehaviorSubject<boolean>(false);
  first_round = new BehaviorSubject<boolean>(false);
  landScaped = new BehaviorSubject<boolean>(false);
  lock_screen = new BehaviorSubject<boolean>(false);
  screenId = new BehaviorSubject<string>('');
  allVideoStreams = new BehaviorSubject<(Participant | Stream)[]>([]);
  newLimitedStreams = new BehaviorSubject<(Participant | Stream)[]>([]);
  newLimitedStreamsIDs = new BehaviorSubject<string[]>([]);
  activeSounds = new BehaviorSubject<string[]>([]);
  screenShareIDStream = new BehaviorSubject<string>('');
  screenShareNameStream = new BehaviorSubject<string>('');
  adminIDStream = new BehaviorSubject<string>('');
  adminNameStream = new BehaviorSubject<string>('');
  youYouStream = new BehaviorSubject<(Participant | Stream)[]>([]);
  youYouStreamIDs = new BehaviorSubject<string[]>([]);
  localStream = new BehaviorSubject<MediaStream | null>(null);
  recordStarted = new BehaviorSubject<boolean>(false);
  recordResumed = new BehaviorSubject<boolean>(false);
  recordPaused = new BehaviorSubject<boolean>(false);
  recordStopped = new BehaviorSubject<boolean>(false);
  adminRestrictSetting = new BehaviorSubject<boolean>(false);
  videoRequestState = new BehaviorSubject<string | null>(null);
  videoRequestTime = new BehaviorSubject<number>(0);
  videoAction = new BehaviorSubject<boolean>(false);
  localStreamVideo = new BehaviorSubject<MediaStream | null>(null);
  userDefaultVideoInputDevice = new BehaviorSubject<string>('');
  currentFacingMode = new BehaviorSubject<string>('user');
  prevFacingMode = new BehaviorSubject<string>('user');
  defVideoID = new BehaviorSubject<string>('');
  allowed = new BehaviorSubject<boolean>(false);
  dispActiveNames = new BehaviorSubject<string[]>([]);
  p_dispActiveNames = new BehaviorSubject<string[]>([]);
  activeNames = new BehaviorSubject<string[]>([]);
  prevActiveNames = new BehaviorSubject<string[]>([]);
  p_activeNames = new BehaviorSubject<string[]>([]);
  membersReceived = new BehaviorSubject<boolean>(false);
  deferScreenReceived = new BehaviorSubject<boolean>(false);
  hostFirstSwitch = new BehaviorSubject<boolean>(false);
  micAction = new BehaviorSubject<boolean>(false);
  screenAction = new BehaviorSubject<boolean>(false);
  chatAction = new BehaviorSubject<boolean>(false);
  audioRequestState = new BehaviorSubject<string | null>(null);
  screenRequestState = new BehaviorSubject<string | null>(null);
  chatRequestState = new BehaviorSubject<string | null>(null);
  audioRequestTime = new BehaviorSubject<number>(0);
  screenRequestTime = new BehaviorSubject<number>(0);
  chatRequestTime = new BehaviorSubject<number>(0);
  updateRequestIntervalSeconds = new BehaviorSubject<number>(240);
  oldSoundIds = new BehaviorSubject<string[]>([]);
  hostLabel = new BehaviorSubject<string>('Host');
  mainScreenFilled = new BehaviorSubject<boolean>(false);
  localStreamScreen = new BehaviorSubject<MediaStream | null>(null);
  screenAlreadyOn = new BehaviorSubject<boolean>(false);
  chatAlreadyOn = new BehaviorSubject<boolean>(false);
  redirectURL = new BehaviorSubject<string>('');
  oldAllStreams = new BehaviorSubject<(Participant | Stream)[]>([]);
  adminVidID = new BehaviorSubject<string>('');
  streamNames = new BehaviorSubject<Stream[]>([]);
  non_alVideoStreams = new BehaviorSubject<Participant[]>([]);
  sortAudioLoudness = new BehaviorSubject<boolean>(false);
  audioDecibels = new BehaviorSubject<AudioDecibels[]>([]);
  mixed_alVideoStreams = new BehaviorSubject<(Participant | Stream)[]>([]);
  non_alVideoStreams_muted = new BehaviorSubject<Participant[]>([]);
  paginatedStreams = new BehaviorSubject<(Participant | Stream)[][]>([]);
  localStreamAudio = new BehaviorSubject<MediaStream | null>(null);
  defAudioID = new BehaviorSubject<string>('');
  userDefaultAudioInputDevice = new BehaviorSubject<string>('');
  userDefaultAudioOutputDevice = new BehaviorSubject<string>('');
  prevAudioInputDevice = new BehaviorSubject<string>('');
  prevVideoInputDevice = new BehaviorSubject<string>('');
  audioPaused = new BehaviorSubject<boolean>(false);
  mainScreenPerson = new BehaviorSubject<string>('');
  adminOnMainScreen = new BehaviorSubject<boolean>(false);
  screenStates = new BehaviorSubject<ScreenState[]>([
    {
      mainScreenPerson: '',
      mainScreenProducerId: '',
      mainScreenFilled: false,
      adminOnMainScreen: false,
    },
  ]);
  prevScreenStates = new BehaviorSubject<ScreenState[]>([
    {
      mainScreenPerson: '',
      mainScreenProducerId: '',
      mainScreenFilled: false,
      adminOnMainScreen: false,
    },
  ]);
  updateDateState = new BehaviorSubject<number | null>(null);
  lastUpdate = new BehaviorSubject<number | null>(null);
  nForReadjustRecord = new BehaviorSubject<number>(0);
  fixedPageLimit = new BehaviorSubject<number>(4);
  removeAltGrid = new BehaviorSubject<boolean>(false);
  nForReadjust = new BehaviorSubject<number>(0);
  reorderInterval = new BehaviorSubject<number>(30000);
  fastReorderInterval = new BehaviorSubject<number>(10000);
  lastReorderTime = new BehaviorSubject<number>(0);
  audStreamNames = new BehaviorSubject<Stream[]>([]);
  currentUserPage = new BehaviorSubject<number>(0);
  mainHeightWidth = new BehaviorSubject<number>(
    this.eventType.value == 'webinar' ? 67 : this.eventType.value == 'broadcast' ? 100 : 0,
  );
  prevMainHeightWidth = new BehaviorSubject<number>(this.mainHeightWidth.value);
  prevDoPaginate = new BehaviorSubject<boolean>(false);
  doPaginate = new BehaviorSubject<boolean>(false);
  shareEnded = new BehaviorSubject<boolean>(false);
  lStreams = new BehaviorSubject<(Participant | Stream)[]>([]);
  chatRefStreams = new BehaviorSubject<(Participant | Stream)[]>([]);
  controlHeight = new BehaviorSubject<number>(
    this.eventType.value === 'webinar' || this.eventType.value === 'conference' ? 0 : 0.06,
  );
  isWideScreen = new BehaviorSubject<boolean>(false);
  isMediumScreen = new BehaviorSubject<boolean>(false);
  isSmallScreen = new BehaviorSubject<boolean>(false);
  addGrid = new BehaviorSubject<boolean>(false);
  addAltGrid = new BehaviorSubject<boolean>(false);
  gridRows = new BehaviorSubject<number>(0);
  gridCols = new BehaviorSubject<number>(0);
  altGridRows = new BehaviorSubject<number>(0);
  altGridCols = new BehaviorSubject<number>(0);
  numberPages = new BehaviorSubject<number>(0);
  currentStreams = new BehaviorSubject<(Participant | Stream)[]>([]);
  showMiniView = new BehaviorSubject<boolean>(false);
  nStream = new BehaviorSubject<MediaStream | null>(null);
  defer_receive = new BehaviorSubject<boolean>(false);
  allAudioStreams = new BehaviorSubject<(Participant | Stream)[]>([]);
  remoteScreenStream = new BehaviorSubject<Stream[]>([]);
  screenProducer = new BehaviorSubject<Producer | null>(null);
  gotAllVids = new BehaviorSubject<boolean>(false);
  paginationHeightWidth = new BehaviorSubject<number>(40);
  paginationDirection = new BehaviorSubject<'horizontal' | 'vertical'>('horizontal');
  gridSizes = new BehaviorSubject<GridSizes>({
    gridWidth: 0,
    gridHeight: 0,
    altGridWidth: 0,
    altGridHeight: 0,
  });
  screenForceFullDisplay = new BehaviorSubject<boolean>(false);
  mainGridStream = new BehaviorSubject<CustomMediaComponent[]>([]);
  otherGridStreams = new BehaviorSubject<CustomMediaComponent[][]>([]);
  audioOnlyStreams = new BehaviorSubject<CustomMediaComponent[]>([]);
  videoInputs = new BehaviorSubject<MediaDeviceInfo[]>([]);
  audioInputs = new BehaviorSubject<MediaDeviceInfo[]>([]);
  meetingProgressTime = new BehaviorSubject<string>('00:00:00');
  meetingElapsedTime = new BehaviorSubject<number>(0);
  ref_participants = new BehaviorSubject<Participant[]>([]);

  updateValidated = (value: boolean) => {
    this.validated.next(value);
  };

  updateSocket = (value: Socket) => {
    this.socket.next(value);
  };

  updateDevice = (value: Device | null) => {
    this.device.next(value);
  };

  updateRoomData = (value: ResponseJoinRoom | null) => {
    this.roomData.next(value);
  };

  updateApiKey = (value: string) => {
    this.apiKey.next(value);
  };

  updateApiUserName = (value: string) => {
    this.apiUserName.next(value);
  };

  updateApiToken = (value: string) => {
    this.apiToken.next(value);
  };

  updateLink = (value: string) => {
    this.link.next(value);
  };

  updateRoomName = (value: string) => {
    this.roomName.next(value);
  };

  updateMember = (value: string) => {
    this.member.next(value);
  };

  updateAdminPasscode = (value: string) => {
    this.adminPasscode.next(value);
  };

  updateIslevel = (value: string) => {
    this.islevel.next(value);
  };

  updateCoHost = (value: string) => {
    this.coHost.next(value);
  };

  updateCoHostResponsibility = (value: CoHostResponsibility[]) => {
    this.coHostResponsibility.next(value);
  };

  updateYouAreCoHost = (value: boolean) => {
    this.youAreCoHost.next(value);
  };

  updateYouAreHost = (value: boolean) => {
    this.youAreHost.next(value);
  };

  updateConfirmedToRecord = (value: boolean) => {
    this.confirmedToRecord.next(value);
  };

  updateMeetingDisplayType = (value: string) => {
    this.meetingDisplayType.next(value);
  };

  updateMeetingVideoOptimized = (value: boolean) => {
    this.meetingVideoOptimized.next(value);
  };

  updateEventType = (value: EventType) => {
    this.eventType.next(value);
    if (value != 'none') {
      try {
        setTimeout(() => {
          this.handleResize();
        }, 2000);
      } catch {
        /* handle error */
      }
    }
  };

  updateParticipants = (value: Participant[]) => {
    this.participants.next(value);
    this.participantsCounter.next(value.length);
    this.filteredParticipants.next(this.participants.value);
  };

  updateFilteredParticipants = (value: Participant[]) => {
    this.filteredParticipants.next(value);
  };

  updateParticipantsCounter = (value: number) => {
    this.participantsCounter.next(value);
  };

  updateParticipantsFilter = (value: string) => {
    this.participantsFilter.next(value);
  };

  updateConsume_sockets = (value: ConsumeSocket[]) => {
    this.consume_sockets.next(value);
  };

  updateRtpCapabilities = (value: RtpCapabilities | null) => {
    this.rtpCapabilities.next(value);
  };

  updateRoomRecvIPs = (value: string[]) => {
    this.roomRecvIPs.next(value);
  };

  updateMeetingRoomParams = (value: MeetingRoomParams | null) => {
    this.meetingRoomParams.next(value);
  };

  updateItemPageLimit = (value: number) => {
    this.itemPageLimit.next(value);
  };

  updateAudioOnlyRoom = (value: boolean) => {
    this.audioOnlyRoom.next(value);
  };

  updateAddForBasic = (value: boolean) => {
    this.addForBasic.next(value);
  };

  updateScreenPageLimit = (value: number) => {
    this.screenPageLimit.next(value);
  };

  updateShareScreenStarted = (value: boolean) => {
    this.shareScreenStarted.next(value);
  };

  updateShared = (value: boolean) => {
    this.shared.next(value);
    this.screenShareActive.next(value);
    if (value) {
      setTimeout(async () => {
        window.dispatchEvent(new Event('resize'));
      }, 2000);
    }
  };

  updateTargetOrientation = (value: string) => {
    this.targetOrientation.next(value);
  };

  updateTargetResolution = (value: string) => {
    this.targetResolution.next(value);
  };

  updateTargetResolutionHost = (value: string) => {
    this.targetResolutionHost.next(value);
  };

  updateVidCons = (value: VidCons) => {
    this.vidCons.next(value);
  };

  updateFrameRate = (value: number) => {
    this.frameRate.next(value);
  };

  updateHParams = (value: HParamsType) => {
    this.hParams.next(value);
  };

  updateVParams = (value: VParamsType) => {
    this.vParams.next(value);
  };

  updateScreenParams = (value: ScreenParamsType) => {
    this.screenParams.next(value);
  };

  updateAParams = (value: AParamsType) => {
    this.aParams.next(value);
  };

  updateRecordingAudioPausesLimit = (value: number) => {
    this.recordingAudioPausesLimit.next(value);
  };

  updateRecordingAudioPausesCount = (value: number) => {
    this.recordingAudioPausesCount.next(value);
  };

  updateRecordingAudioSupport = (value: boolean) => {
    this.recordingAudioSupport.next(value);
  };

  updateRecordingAudioPeopleLimit = (value: number) => {
    this.recordingAudioPeopleLimit.next(value);
  };

  updateRecordingAudioParticipantsTimeLimit = (value: number) => {
    this.recordingAudioParticipantsTimeLimit.next(value);
  };

  updateRecordingVideoPausesCount = (value: number) => {
    this.recordingVideoPausesCount.next(value);
  };

  updateRecordingVideoPausesLimit = (value: number) => {
    this.recordingVideoPausesLimit.next(value);
  };

  updateRecordingVideoSupport = (value: boolean) => {
    this.recordingVideoSupport.next(value);
  };

  updateRecordingVideoPeopleLimit = (value: number) => {
    this.recordingVideoPeopleLimit.next(value);
  };

  updateRecordingVideoParticipantsTimeLimit = (value: number) => {
    this.recordingVideoParticipantsTimeLimit.next(value);
  };

  updateRecordingAllParticipantsSupport = (value: boolean) => {
    this.recordingAllParticipantsSupport.next(value);
  };

  updateRecordingVideoParticipantsSupport = (value: boolean) => {
    this.recordingVideoParticipantsSupport.next(value);
  };

  updateRecordingAllParticipantsFullRoomSupport = (value: boolean) => {
    this.recordingAllParticipantsFullRoomSupport.next(value);
  };

  updateRecordingVideoParticipantsFullRoomSupport = (value: boolean) => {
    this.recordingVideoParticipantsFullRoomSupport.next(value);
  };

  updateRecordingPreferredOrientation = (value: string) => {
    this.recordingPreferredOrientation.next(value);
  };

  updateRecordingSupportForOtherOrientation = (value: boolean) => {
    this.recordingSupportForOtherOrientation.next(value);
  };

  updateRecordingMultiFormatsSupport = (value: boolean) => {
    this.recordingMultiFormatsSupport.next(value);
  };

  updateUserRecordingParams = (value: UserRecordingParams) => {
    this.userRecordingParams.next(value);
  };

  updateCanRecord = (value: boolean) => {
    this.canRecord.next(value);
  };

  updateStartReport = (value: boolean) => {
    this.startReport.next(value);
  };

  updateEndReport = (value: boolean) => {
    this.endReport.next(value);
  };

  updateRecordTimerInterval = (value: NodeJS.Timeout | null) => {
    this.recordTimerInterval.next(value);
  };

  updateRecordStartTime = (value: number) => {
    this.recordStartTime.next(value);
  };

  updateRecordElapsedTime = (value: number) => {
    this.recordElapsedTime.next(value);
  };

  updateIsTimerRunning = (value: boolean) => {
    this.isTimerRunning.next(value);
  };

  updateCanPauseResume = (value: boolean) => {
    this.canPauseResume.next(value);
  };

  updateRecordChangeSeconds = (value: number) => {
    this.recordChangeSeconds.next(value);
  };

  updatePauseLimit = (value: number) => {
    this.pauseLimit.next(value);
  };

  updatePauseRecordCount = (value: number) => {
    this.pauseRecordCount.next(value);
  };

  updateCanLaunchRecord = (value: boolean) => {
    this.canLaunchRecord.next(value);
  };

  updateStopLaunchRecord = (value: boolean) => {
    this.stopLaunchRecord.next(value);
  };

  updateParticipantsAll = (value: Participant[]) => {
    this.participantsAll.next(value);
  };

  updateFirstAll = (value: boolean) => {
    this.firstAll.next(value);
  };

  updateUpdateMainWindow = (value: boolean) => {
    this.updateMainWindow.next(value);
  };

  updateFirst_round = (value: boolean) => {
    this.first_round.next(value);
  };

  updateLandScaped = (value: boolean) => {
    this.landScaped.next(value);
  };

  updateLock_screen = (value: boolean) => {
    this.lock_screen.next(value);
  };

  updateScreenId = (value: string) => {
    this.screenId.next(value);
  };

  updateAllVideoStreams = (value: (Participant | Stream)[]) => {
    this.allVideoStreams.next(value);
  };

  updateNewLimitedStreams = (value: (Participant | Stream)[]) => {
    this.newLimitedStreams.next(value);
  };

  updateNewLimitedStreamsIDs = (value: string[]) => {
    this.newLimitedStreamsIDs.next(value);
  };

  updateActiveSounds = (value: string[]) => {
    this.activeSounds.next(value);
  };

  updateScreenShareIDStream = (value: string) => {
    this.screenShareIDStream.next(value);
  };

  updateScreenShareNameStream = (value: string) => {
    this.screenShareNameStream.next(value);
  };

  updateAdminIDStream = (value: string) => {
    this.adminIDStream.next(value);
  };

  updateAdminNameStream = (value: string) => {
    this.adminNameStream.next(value);
  };

  updateYouYouStream = (value: (Participant | Stream)[]) => {
    this.youYouStream.next(value);
  };

  updateYouYouStreamIDs = (value: string[]) => {
    this.youYouStreamIDs.next(value);
  };

  updateLocalStream = (value: MediaStream | null) => {
    this.localStream.next(value);
  };

  updateRecordStarted = (value: boolean) => {
    this.recordStarted.next(value);
  };

  updateRecordResumed = (value: boolean) => {
    this.recordResumed.next(value);
  };

  updateRecordPaused = (value: boolean) => {
    this.recordPaused.next(value);
  };

  updateRecordStopped = (value: boolean) => {
    this.recordStopped.next(value);
  };

  updateAdminRestrictSetting = (value: boolean) => {
    this.adminRestrictSetting.next(value);
  };

  updateVideoRequestState = (value: string | null) => {
    this.videoRequestState.next(value);
  };

  updateVideoRequestTime = (value: number) => {
    this.videoRequestTime.next(value);
  };

  updateVideoAction = (value: boolean) => {
    this.videoAction.next(value);
  };

  updateLocalStreamVideo = (value: MediaStream | null) => {
    this.localStreamVideo.next(value);
  };

  updateUserDefaultVideoInputDevice = (value: string) => {
    this.userDefaultVideoInputDevice.next(value);
  };

  updateCurrentFacingMode = (value: string) => {
    this.currentFacingMode.next(value);
  };

  updatePrevFacingMode = (value: string) => {
    this.prevFacingMode.next(value);
  };

  updateDefVideoID = (value: string) => {
    this.defVideoID.next(value);
  };

  updateAllowed = (value: boolean) => {
    this.allowed.next(value);
  };

  updateDispActiveNames = (value: string[]) => {
    this.dispActiveNames.next(value);
  };

  updateP_dispActiveNames = (value: string[]) => {
    this.p_dispActiveNames.next(value);
  };

  updateActiveNames = (value: string[]) => {
    this.activeNames.next(value);
  };

  updatePrevActiveNames = (value: string[]) => {
    this.prevActiveNames.next(value);
  };

  updateP_activeNames = (value: string[]) => {
    this.p_activeNames.next(value);
  };

  updateMembersReceived = (value: boolean) => {
    this.membersReceived.next(value);
  };

  updateDeferScreenReceived = (value: boolean) => {
    this.deferScreenReceived.next(value);
  };

  updateHostFirstSwitch = (value: boolean) => {
    this.hostFirstSwitch.next(value);
  };

  updateMicAction = (value: boolean) => {
    this.micAction.next(value);
  };

  updateScreenAction = (value: boolean) => {
    this.screenAction.next(value);
  };

  updateChatAction = (value: boolean) => {
    this.chatAction.next(value);
  };

  updateAudioRequestState = (value: string | null) => {
    this.audioRequestState.next(value);
  };

  updateScreenRequestState = (value: string | null) => {
    this.screenRequestState.next(value);
  };

  updateChatRequestState = (value: string | null) => {
    this.chatRequestState.next(value);
  };

  updateAudioRequestTime = (value: number) => {
    this.audioRequestTime.next(value);
  };

  updateScreenRequestTime = (value: number) => {
    this.screenRequestTime.next(value);
  };

  updateChatRequestTime = (value: number) => {
    this.chatRequestTime.next(value);
  };

  updateOldSoundIds = (value: string[]) => {
    this.oldSoundIds.next(value);
  };

  updateHostLabel = (value: string) => {
    this.hostLabel.next(value);
  };

  updateMainScreenFilled = (value: boolean) => {
    this.mainScreenFilled.next(value);
  };

  updateLocalStreamScreen = (value: MediaStream | null) => {
    this.localStreamScreen.next(value);
  };

  updateScreenAlreadyOn = (value: boolean) => {
    this.screenAlreadyOn.next(value);
  };

  updateChatAlreadyOn = (value: boolean) => {
    this.chatAlreadyOn.next(value);
  };

  updateRedirectURL = (value: string) => {
    this.redirectURL.next(value);
  };

  updateOldAllStreams = (value: (Participant | Stream)[]) => {
    this.oldAllStreams.next(value);
  };

  updateAdminVidID = (value: string) => {
    this.adminVidID.next(value);
  };

  updateStreamNames = (value: Stream[]) => {
    this.streamNames.next(value);
  };

  updateNon_alVideoStreams = (value: Participant[]) => {
    this.non_alVideoStreams.next(value);
  };

  updateSortAudioLoudness = (value: boolean) => {
    this.sortAudioLoudness.next(value);
  };

  updateAudioDecibels = (value: AudioDecibels[]) => {
    this.audioDecibels.next(value);
  };

  updateMixed_alVideoStreams = (value: (Participant | Stream)[]) => {
    this.mixed_alVideoStreams.next(value);
  };

  updateNon_alVideoStreams_muted = (value: Participant[]) => {
    this.non_alVideoStreams_muted.next(value);
  };

  updatePaginatedStreams = (value: (Participant | Stream)[][]) => {
    this.paginatedStreams.next(value);
  };

  updateLocalStreamAudio = (value: MediaStream | null) => {
    this.localStreamAudio.next(value);
  };

  updateDefAudioID = (value: string) => {
    this.defAudioID.next(value);
  };

  updateUserDefaultAudioInputDevice = (value: string) => {
    this.userDefaultAudioInputDevice.next(value);
  };

  updateUserDefaultAudioOutputDevice = (value: string) => {
    this.userDefaultAudioOutputDevice.next(value);
  };

  updatePrevAudioInputDevice = (value: string) => {
    this.prevAudioInputDevice.next(value);
  };

  updatePrevVideoInputDevice = (value: string) => {
    this.prevVideoInputDevice.next(value);
  };

  updateAudioPaused = (value: boolean) => {
    this.audioPaused.next(value);
  };

  updateMainScreenPerson = (value: string) => {
    this.mainScreenPerson.next(value);
  };

  updateAdminOnMainScreen = (value: boolean) => {
    this.adminOnMainScreen.next(value);
  };

  updateScreenStates = (value: ScreenState[]) => {
    this.screenStates.next(value);
  };

  updatePrevScreenStates = (value: ScreenState[]) => {
    this.prevScreenStates.next(value);
  };

  updateUpdateDateState = (value: number | null) => {
    this.updateDateState.next(value);
  };

  updateLastUpdate = (value: number | null) => {
    this.lastUpdate.next(value);
  };

  updateNForReadjustRecord = (value: number) => {
    this.nForReadjustRecord.next(value);
  };

  updateFixedPageLimit = (value: number) => {
    this.fixedPageLimit.next(value);
  };

  updateRemoveAltGrid = (value: boolean) => {
    this.removeAltGrid.next(value);
  };

  updateNForReadjust = (value: number) => {
    this.nForReadjust.next(value);
  };

  updateLastReorderTime = (value: number) => {
    this.lastReorderTime.next(value);
  };

  updateAudStreamNames = (value: Stream[]) => {
    this.audStreamNames.next(value);
  };

  updateCurrentUserPage = (value: number) => {
    this.currentUserPage.next(value);
  };

  updateMainHeightWidth = (value: number) => {
    this.mainHeightWidth.next(value);
  };

  updatePrevMainHeightWidth = (value: number) => {
    this.prevMainHeightWidth.next(value);
  };

  updatePrevDoPaginate = (value: boolean) => {
    this.prevDoPaginate.next(value);
  };

  updateDoPaginate = (value: boolean) => {
    this.doPaginate.next(value);
  };

  updateShareEnded = (value: boolean) => {
    this.shareEnded.next(value);
  };

  updateLStreams = (value: (Participant | Stream)[]) => {
    this.lStreams.next(value);
  };

  updateChatRefStreams = (value: (Participant | Stream)[]) => {
    this.chatRefStreams.next(value);
  };

  updateControlHeight = (value: number) => {
    this.controlHeight.next(value);
  };

  updateIsWideScreen = (value: boolean) => {
    this.isWideScreen.next(value);
  };

  updateIsMediumScreen = (value: boolean) => {
    this.isMediumScreen.next(value);
  };

  updateIsSmallScreen = (value: boolean) => {
    this.isSmallScreen.next(value);
  };

  updateAddGrid = (value: boolean) => {
    this.addGrid.next(value);
  };

  updateAddAltGrid = (value: boolean) => {
    this.addAltGrid.next(value);
  };

  updateGridRows = (value: number) => {
    this.gridRows.next(value);
  };

  updateGridCols = (value: number) => {
    this.gridCols.next(value);
  };

  updateAltGridRows = (value: number) => {
    this.altGridRows.next(value);
  };

  updateAltGridCols = (value: number) => {
    this.altGridCols.next(value);
  };

  updateNumberPages = (value: number) => {
    this.numberPages.next(value);
  };

  updateCurrentStreams = (value: (Participant | Stream)[]) => {
    this.currentStreams.next(value);
  };

  updateShowMiniView = (value: boolean) => {
    this.showMiniView.next(value);
  };

  updateNStream = (value: MediaStream | null) => {
    this.nStream.next(value);
  };

  updateDefer_receive = (value: boolean) => {
    this.defer_receive.next(value);
  };

  updateAllAudioStreams = (value: (Participant | Stream)[]) => {
    this.allAudioStreams.next(value);
  };

  updateRemoteScreenStream = (value: Stream[]) => {
    this.remoteScreenStream.next(value);
  };

  updateScreenProducer = (value: Producer | null) => {
    this.screenProducer.next(value);
  };

  updateGotAllVids = (value: boolean) => {
    this.gotAllVids.next(value);
  };

  updatePaginationHeightWidth = (value: number) => {
    this.paginationHeightWidth.next(value);
  };

  updatePaginationDirection = (value: 'horizontal' | 'vertical') => {
    this.paginationDirection.next(value);
  };

  updateGridSizes = (value: GridSizes) => {
    this.gridSizes.next(value);
  };

  updateScreenForceFullDisplay = (value: boolean) => {
    this.screenForceFullDisplay.next(value);
  };

  updateMainGridStream = (value: CustomMediaComponent[]) => {
    this.mainGridStream.next(value);
  };

  updateOtherGridStreams = (value: CustomMediaComponent[][]) => {
    this.otherGridStreams.next(value);
  };

  updateAudioOnlyStreams = (value: CustomMediaComponent[]) => {
    this.audioOnlyStreams.next(value);
  };

  updateVideoInputs = (value: MediaDeviceInfo[]) => {
    this.videoInputs.next(value);
  };

  updateAudioInputs = (value: MediaDeviceInfo[]) => {
    this.audioInputs.next(value);
  };

  updateMeetingProgressTime = (value: string) => {
    this.meetingProgressTime.next(value);
  };

  updateMeetingElapsedTime = (value: number) => {
    this.meetingElapsedTime.next(value);
  };

  updateRef_participants = (value: Participant[]) => {
    this.ref_participants.next(value);
  };

  // Messages
  messages = new BehaviorSubject<Message[]>([]);
  startDirectMessage = new BehaviorSubject<boolean>(false);
  directMessageDetails = new BehaviorSubject<Participant | null>(null);
  showMessagesBadge = new BehaviorSubject<boolean>(false);

  // Event Settings
  audioSetting = new BehaviorSubject<string>('allow');
  videoSetting = new BehaviorSubject<string>('allow');
  screenshareSetting = new BehaviorSubject<string>('allow');
  chatSetting = new BehaviorSubject<string>('allow');

  // Display Settings
  displayOption = new BehaviorSubject<string>('media');
  autoWave = new BehaviorSubject<boolean>(true);
  forceFullDisplay = new BehaviorSubject<boolean>(true);
  prevForceFullDisplay = new BehaviorSubject<boolean>(false);
  prevMeetingDisplayType = new BehaviorSubject<string>('video');

  // Waiting Room
  waitingRoomFilter = new BehaviorSubject<string>('');
  waitingRoomList = new BehaviorSubject<WaitingRoomParticipant[]>(
    this.useSeed && this.seedData?.waitingList ? this.seedData.waitingList : [],
  );
  waitingRoomCounter = new BehaviorSubject<number>(0);
  filteredWaitingRoomList = new BehaviorSubject<WaitingRoomParticipant[]>(
    this.useSeed && this.seedData?.waitingList ? this.seedData.waitingList : [],
  );

  // Requests
  requestFilter = new BehaviorSubject<string>('');
  requestList = new BehaviorSubject<Request[]>(
    this.useSeed && this.seedData?.requests ? this.seedData.requests : [],
  );
  requestCounter = new BehaviorSubject<number>(0);
  filteredRequestList = new BehaviorSubject<Request[]>(
    this.useSeed && this.seedData?.requests ? this.seedData.requests : [],
  );

  // Total Requests and Waiting Room
  totalReqWait = new BehaviorSubject<number>(0);

  // Alerts
  alertVisible = new BehaviorSubject<boolean>(false);
  alertMessage = new BehaviorSubject<string>('');
  alertType = new BehaviorSubject<'success' | 'danger'>('success');
  alertDuration = new BehaviorSubject<number>(3000);

  // Progress Timer
  progressTimerVisible = new BehaviorSubject<boolean>(true);
  progressTimerValue = new BehaviorSubject<number>(0);

  // Menu Modals
  isMenuModalVisible = new BehaviorSubject<boolean>(false);
  isRecordingModalVisible = new BehaviorSubject<boolean>(false);
  isSettingsModalVisible = new BehaviorSubject<boolean>(false);
  isRequestsModalVisible = new BehaviorSubject<boolean>(false);
  isWaitingModalVisible = new BehaviorSubject<boolean>(false);
  isCoHostModalVisible = new BehaviorSubject<boolean>(false);
  isMediaSettingsModalVisible = new BehaviorSubject<boolean>(false);
  isDisplaySettingsModalVisible = new BehaviorSubject<boolean>(false);

  // Other Modals
  isParticipantsModalVisible = new BehaviorSubject<boolean>(false);
  isMessagesModalVisible = new BehaviorSubject<boolean>(false);
  isConfirmExitModalVisible = new BehaviorSubject<boolean>(false);
  isConfirmHereModalVisible = new BehaviorSubject<boolean>(false);
  isShareEventModalVisible = new BehaviorSubject<boolean>(false);
  isLoadingModalVisible = new BehaviorSubject<boolean>(false);

  // Recording Options
  recordingMediaOptions = new BehaviorSubject<string>('video');
  recordingAudioOptions = new BehaviorSubject<string>('all');
  recordingVideoOptions = new BehaviorSubject<string>('all');
  recordingVideoType = new BehaviorSubject<string>('fullDisplay');
  recordingVideoOptimized = new BehaviorSubject<boolean>(false);
  recordingDisplayType = new BehaviorSubject<'video' | 'media' | 'all'>('video');
  recordingAddHLS = new BehaviorSubject<boolean>(true);
  recordingNameTags = new BehaviorSubject<boolean>(true);
  recordingBackgroundColor = new BehaviorSubject<string>('#83c0e9');
  recordingNameTagsColor = new BehaviorSubject<string>('#ffffff');
  recordingAddText = new BehaviorSubject<boolean>(false);
  recordingCustomText = new BehaviorSubject<string>('Add Text');
  recordingCustomTextPosition = new BehaviorSubject<string>('top');
  recordingCustomTextColor = new BehaviorSubject<string>('#ffffff');
  recordingOrientationVideo = new BehaviorSubject<string>('landscape');
  clearedToResume = new BehaviorSubject<boolean>(true);
  clearedToRecord = new BehaviorSubject<boolean>(true);
  recordState = new BehaviorSubject<string>('green');
  showRecordButtons = new BehaviorSubject<boolean>(false);
  recordingProgressTime = new BehaviorSubject<string>('00:00:00');
  audioSwitching = new BehaviorSubject<boolean>(false);
  videoSwitching = new BehaviorSubject<boolean>(false);

  // Media States
  videoAlreadyOn = new BehaviorSubject<boolean>(false);
  audioAlreadyOn = new BehaviorSubject<boolean>(false);

  componentSizes = new BehaviorSubject<ComponentSizes>({
    mainHeight: 0,
    otherHeight: 0,
    mainWidth: 0,
    otherWidth: 0,
  });

  // Permissions
  hasCameraPermission = new BehaviorSubject<boolean>(false);
  hasAudioPermission = new BehaviorSubject<boolean>(false);

  // Transports
  transportCreated = new BehaviorSubject<boolean>(false);
  transportCreatedVideo = new BehaviorSubject<boolean>(false);
  transportCreatedAudio = new BehaviorSubject<boolean>(false);
  transportCreatedScreen = new BehaviorSubject<boolean>(false);
  producerTransport = new BehaviorSubject<Transport | null>(null);
  videoProducer = new BehaviorSubject<Producer | null>(null);
  params = new BehaviorSubject<ProducerOptions>({} as ProducerOptions);
  videoParams = new BehaviorSubject<ProducerOptions>({} as ProducerOptions);
  audioParams = new BehaviorSubject<ProducerOptions>({} as ProducerOptions);
  audioProducer = new BehaviorSubject<Producer | null>(null);
  consumerTransports = new BehaviorSubject<TransportType[]>([]);
  consumingTransports = new BehaviorSubject<string[]>([]);

  // Polls
  polls = new BehaviorSubject<Poll[]>(
    this.useSeed && this.seedData?.polls ? this.seedData.polls : [],
  );
  poll = new BehaviorSubject<Poll | null>(null);
  isPollModalVisible = new BehaviorSubject<boolean>(false);

  // Background
  customImage = new BehaviorSubject<string>('');
  selectedImage = new BehaviorSubject<string>('');
  segmentVideo = new BehaviorSubject<MediaStream | null>(null);
  selfieSegmentation = new BehaviorSubject<SelfieSegmentation | null>(null);
  pauseSegmentation = new BehaviorSubject<boolean>(false);
  processedStream = new BehaviorSubject<MediaStream | null>(null);
  keepBackground = new BehaviorSubject<boolean>(false);
  backgroundHasChanged = new BehaviorSubject<boolean>(false);
  virtualStream = new BehaviorSubject<MediaStream | null>(null);
  mainCanvas = new BehaviorSubject<HTMLCanvasElement | null>(null);
  prevKeepBackground = new BehaviorSubject<boolean>(false);
  appliedBackground = new BehaviorSubject<boolean>(false);
  isBackgroundModalVisible = new BehaviorSubject<boolean>(false);
  autoClickBackground = new BehaviorSubject<boolean>(false);

  // Breakout Rooms
  breakoutRooms = new BehaviorSubject<BreakoutParticipant[][]>(
    this.useSeed && this.seedData?.breakoutRooms ? this.seedData.breakoutRooms : [],
  );
  currentRoomIndex = new BehaviorSubject<number>(0);
  canStartBreakout = new BehaviorSubject<boolean>(false);
  breakOutRoomStarted = new BehaviorSubject<boolean>(false);
  breakOutRoomEnded = new BehaviorSubject<boolean>(false);
  hostNewRoom = new BehaviorSubject<number>(-1);
  limitedBreakRoom = new BehaviorSubject<BreakoutParticipant[]>([]);
  mainRoomsLength = new BehaviorSubject<number>(0);
  memberRoom = new BehaviorSubject<number>(-1);
  isBreakoutRoomsModalVisible = new BehaviorSubject<boolean>(false);

  // Whiteboard
  whiteboardUsers = new BehaviorSubject<WhiteboardUser[]>(
    this.useSeed && this.seedData?.whiteboardUsers ? this.seedData.whiteboardUsers : [],
  );
  currentWhiteboardIndex = new BehaviorSubject<number>(0);
  canStartWhiteboard = new BehaviorSubject<boolean>(false);
  whiteboardStarted = new BehaviorSubject<boolean>(false);
  whiteboardEnded = new BehaviorSubject<boolean>(false);
  whiteboardLimit = new BehaviorSubject<number>(4);
  isWhiteboardModalVisible = new BehaviorSubject<boolean>(false);
  isConfigureWhiteboardModalVisible = new BehaviorSubject<boolean>(false);
  shapes = new BehaviorSubject<Shape[]>([]);
  useImageBackground = new BehaviorSubject<boolean>(true);
  redoStack = new BehaviorSubject<Shape[]>([]);
  undoStack = new BehaviorSubject<string[]>([]);
  canvasStream = new BehaviorSubject<MediaStream | null>(null);
  canvasWhiteboard = new BehaviorSubject<HTMLCanvasElement | null>(null);

  // Screenboard
  canvasScreenboard = new BehaviorSubject<HTMLCanvasElement | null>(null);
  processedScreenStream = new BehaviorSubject<MediaStream | null>(null);
  annotateScreenStream = new BehaviorSubject<boolean>(false);
  mainScreenCanvas = new BehaviorSubject<HTMLCanvasElement | null>(null);
  isScreenboardModalVisible = new BehaviorSubject<boolean>(false);

  //state variables for the control buttons
  micActive = new BehaviorSubject<boolean>(
    this.audioAlreadyOn.value ? this.audioAlreadyOn.value : false,
  );
  videoActive = new BehaviorSubject<boolean>(
    this.videoAlreadyOn.value ? this.videoAlreadyOn.value : false,
  );
  screenShareActive = new BehaviorSubject<boolean>(false);
  endCallActive = new BehaviorSubject<boolean>(false);
  participantsActive = new BehaviorSubject<boolean>(false);
  menuActive = new BehaviorSubject<boolean>(false);
  commentsActive = new BehaviorSubject<boolean>(false);

  // Update functions
  updateMessages = (value: Message[]) => {
    this.messages.next(value);
  };

  updateStartDirectMessage = (value: boolean) => {
    this.startDirectMessage.next(value);
  };

  updateDirectMessageDetails = (value: Participant | null) => {
    this.directMessageDetails.next(value);
  };

  updateShowMessagesBadge = (value: boolean) => {
    this.showMessagesBadge.next(value);
  };

  updateAudioSetting = (value: string) => {
    this.audioSetting.next(value);
  };

  updateVideoSetting = (value: string) => {
    this.videoSetting.next(value);
  };

  updateScreenshareSetting = (value: string) => {
    this.screenshareSetting.next(value);
  };

  updateChatSetting = (value: string) => {
    this.chatSetting.next(value);
  };

  updateDisplayOption = (value: string) => {
    this.displayOption.next(value);
  };

  updateAutoWave = (value: boolean) => {
    this.autoWave.next(value);
  };

  updateForceFullDisplay = (value: boolean) => {
    this.forceFullDisplay.next(value);
  };

  updatePrevForceFullDisplay = (value: boolean) => {
    this.prevForceFullDisplay.next(value);
  };

  updatePrevMeetingDisplayType = (value: string) => {
    this.prevMeetingDisplayType.next(value);
  };

  updateWaitingRoomCounter = (value: number) => {
    this.waitingRoomCounter.next(value);
  };

  updateWaitingRoomFilter = (value: string) => {
    this.waitingRoomFilter.next(value);
  };

  updateWaitingRoomList = (value: WaitingRoomParticipant[]) => {
    this.waitingRoomList.next(value);
    this.filteredWaitingRoomList.next(value);
    this.waitingRoomCounter.next(value.length);
  };

  onWaitingRoomFilterChange = (value: string) => {
    if (value !== '' && value.length > 0) {
      const filteredWaitingRoom = this.waitingRoomList
        .getValue()
        .filter((waitingRoom: WaitingRoomParticipant) => {
          return waitingRoom.name.toLowerCase().includes(value.toLowerCase());
        });
      this.filteredWaitingRoomList.next(filteredWaitingRoom);
      this.waitingRoomCounter.next(filteredWaitingRoom.length);
    } else {
      this.filteredWaitingRoomList.next(this.waitingRoomList.getValue());
      this.waitingRoomCounter.next(this.waitingRoomList.getValue().length);
    }
  };

  onWaitingRoomClose = () => {
    this.updateIsWaitingModalVisible(false);
  };

  updateRequestCounter = (value: number) => {
    this.requestCounter.next(value);
  };

  updateRequestFilter = (value: string) => {
    this.requestFilter.next(value);
  };

  updateRequestList = (value: Request[]) => {
    this.requestList.next(value);
    this.filteredRequestList.next(value);
    this.requestCounter.next(value.length);
  };

  onRequestFilterChange = (value: string) => {
    if (value !== '' && value.length > 0) {
      const filteredRequest = this.requestList.getValue().filter((request: Request) => {
        return request?.name?.toLowerCase().includes(value.toLowerCase()) ?? false;
      });
      this.filteredRequestList.next(filteredRequest);
      this.requestCounter.next(filteredRequest.length);
    } else {
      this.filteredRequestList.next(this.requestList.getValue());
      this.requestCounter.next(this.requestList.getValue().length);
    }
  };

  onRequestClose = () => {
    this.updateIsRequestsModalVisible(false);
  };

  updateTotalReqWait = (value: number) => {
    this.totalReqWait.next(value);
  };

  updateAlertVisible = (value: boolean) => {
    this.alertVisible.next(value);
  };

  updateAlertMessage = (value: string) => {
    this.alertMessage.next(value);
  };

  updateAlertType = (value: 'success' | 'danger') => {
    this.alertType.next(value);
  };

  updateAlertDuration = (value: number) => {
    this.alertDuration.next(value);
  };

  updateProgressTimerVisible = (value: boolean) => {
    this.progressTimerVisible.next(value);
  };

  updateProgressTimerValue = (value: number) => {
    this.progressTimerValue.next(value);
  };

  updateIsMenuModalVisible = (value: boolean) => {
    this.isMenuModalVisible.next(value);
  };

  updateIsRecordingModalVisible = (value: boolean) => {
    this.isRecordingModalVisible.next(value);
    if (value) {
      this.updateConfirmedToRecord(false);
    } else {
      if (
        this.clearedToRecord.getValue() &&
        this.clearedToResume.getValue() &&
        this.recordStarted.getValue()
      ) {
        this.updateShowRecordButtons(true);
      }
    }
  };

  updateIsSettingsModalVisible = (value: boolean) => {
    this.isSettingsModalVisible.next(value);
  };

  updateIsRequestsModalVisible = (value: boolean) => {
    this.isRequestsModalVisible.next(value);
  };

  updateIsWaitingModalVisible = (value: boolean) => {
    this.isWaitingModalVisible.next(value);
  };

  updateIsCoHostModalVisible = (value: boolean) => {
    this.isCoHostModalVisible.next(value);
  };

  updateIsMediaSettingsModalVisible = (value: boolean) => {
    this.isMediaSettingsModalVisible.next(value);
  };

  updateIsDisplaySettingsModalVisible = (value: boolean) => {
    this.isDisplaySettingsModalVisible.next(value);
  };

  updateIsParticipantsModalVisible = (value: boolean) => {
    this.isParticipantsModalVisible.next(value);
  };

  updateIsMessagesModalVisible = (value: boolean) => {
    this.isMessagesModalVisible.next(value);
    if (!value) {
      this.updateShowMessagesBadge(false);
    }
  };

  updateIsConfirmExitModalVisible = (value: boolean) => {
    this.isConfirmExitModalVisible.next(value);
  };

  updateIsConfirmHereModalVisible = (value: boolean) => {
    this.isConfirmHereModalVisible.next(value);
  };

  updateIsLoadingModalVisible = (value: boolean) => {
    this.isLoadingModalVisible.next(value);
  };

  updateIsShareEventModalVisible = (value: boolean) => {
    this.isShareEventModalVisible.next(value);
  };

  updateRecordingMediaOptions = (value: string) => {
    this.recordingMediaOptions.next(value);
    this.clearedToRecord.next(false);
  };

  updateRecordingAudioOptions = (value: string) => {
    this.recordingAudioOptions.next(value);
    this.clearedToRecord.next(false);
  };

  updateRecordingVideoOptions = (value: string) => {
    this.recordingVideoOptions.next(value);
    this.clearedToRecord.next(false);
  };

  updateRecordingVideoType = (value: string) => {
    this.recordingVideoType.next(value);
    this.clearedToRecord.next(false);
  };

  updateRecordingVideoOptimized = (value: boolean) => {
    this.recordingVideoOptimized.next(value);
    this.clearedToRecord.next(false);
  };

  updateRecordingDisplayType = (value: 'video' | 'media' | 'all') => {
    this.recordingDisplayType.next(value);
    this.clearedToRecord.next(false);
  };

  updateRecordingAddHLS = (value: boolean) => {
    this.recordingAddHLS.next(value);
    this.clearedToRecord.next(false);
  };

  updateRecordingAddText = (value: boolean) => {
    this.recordingAddText.next(value);
    this.clearedToRecord.next(false);
  };

  updateRecordingCustomText = (value: string) => {
    this.recordingCustomText.next(value);
    this.clearedToRecord.next(false);
  };

  updateRecordingCustomTextPosition = (value: string) => {
    this.recordingCustomTextPosition.next(value);
    this.clearedToRecord.next(false);
  };

  updateRecordingCustomTextColor = (value: string) => {
    this.recordingCustomTextColor.next(value);
    this.clearedToRecord.next(false);
  };

  updateRecordingNameTags = (value: boolean) => {
    this.recordingNameTags.next(value);
    this.clearedToRecord.next(false);
  };

  updateRecordingBackgroundColor = (value: string) => {
    this.recordingBackgroundColor.next(value);
    this.clearedToRecord.next(false);
  };

  updateRecordingNameTagsColor = (value: string) => {
    this.recordingNameTagsColor.next(value);
    this.clearedToRecord.next(false);
  };

  updateRecordingOrientationVideo = (value: string) => {
    this.recordingOrientationVideo.next(value);
    this.clearedToRecord.next(false);
  };

  updateClearedToResume = (value: boolean) => {
    this.clearedToResume.next(value);
  };

  updateClearedToRecord = (value: boolean) => {
    this.clearedToRecord.next(value);
  };

  updateRecordState = (value: string) => {
    if (this.recordStarted.value && !this.recordStopped.value) {
      if (!this.recordPaused.value) {
        this.recordState.next('red');
      } else {
        this.recordState.next('yellow');
      }
    } else {
      this.recordState.next(value);
    }
    this.recordState.next(value);
  };

  updateShowRecordButtons = (value: boolean) => {
    this.showRecordButtons.next(value);
  };

  updateRecordingProgressTime = (value: string) => {
    this.recordingProgressTime.next(value);
    this.updateRecordTimerWidget();
  };

  updateAudioSwitching = (value: boolean) => {
    this.audioSwitching.next(value);
  };

  updateVideoSwitching = (value: boolean) => {
    this.videoSwitching.next(value);
  };

  updateVideoAlreadyOn = (value: boolean) => {
    this.videoAlreadyOn.next(value);
    this.videoActive.next(value);
  };

  updateAudioAlreadyOn = (value: boolean) => {
    this.audioAlreadyOn.next(value);
    this.micActive.next(value);
  };

  updateComponentSizes = (sizes: ComponentSizes) => {
    this.componentSizes.next(sizes);
  };

  updateHasCameraPermission = (value: boolean) => {
    this.hasCameraPermission.next(value);
  };

  updateHasAudioPermission = (value: boolean) => {
    this.hasAudioPermission.next(value);
  };

  requestPermissionCamera(): Promise<string> {
    // Implement the request permission logic here
    return Promise.resolve('granted');
  }

  requestPermissionAudio(): Promise<string> {
    // Implement the request permission logic here
    return Promise.resolve('granted');
  }

  updateTransportCreated = (value: boolean) => {
    this.transportCreated.next(value);
  };

  updateTransportCreatedVideo = (value: boolean) => {
    this.transportCreatedVideo.next(value);
  };

  updateTransportCreatedAudio = (value: boolean) => {
    this.transportCreatedAudio.next(value);
  };

  updateTransportCreatedScreen = (value: boolean) => {
    this.transportCreatedScreen.next(value);
  };

  updateProducerTransport = (value: Transport | null) => {
    this.producerTransport.next(value);
  };

  updateVideoProducer = (value: Producer | null) => {
    this.videoProducer.next(value);
  };

  updateParams = (value: ProducerOptions) => {
    this.params.next(value);
  };

  updateVideoParams = (value: ProducerOptions) => {
    this.videoParams.next(value);
  };

  updateAudioParams = (value: ProducerOptions) => {
    this.audioParams.next(value);
  };

  updateAudioProducer = (value: Producer | null) => {
    this.audioProducer.next(value);
  };

  updateConsumerTransports = (value: TransportType[]) => {
    this.consumerTransports.next(value);
  };

  updateConsumingTransports = (value: string[]) => {
    this.consumingTransports.next(value);
  };

  updatePolls = (value: Poll[]) => {
    this.polls.next(value);
  };

  updatePoll = (value: Poll | null) => {
    this.poll.next(value);
  };

  updateIsPollModalVisible = (value: boolean) => {
    this.isPollModalVisible.next(value);
  };

  updateCustomImage = (value: string) => {
    this.customImage.next(value);
  };

  updateSelectedImage = (value: string) => {
    this.selectedImage.next(value);
  };

  updateSegmentVideo = (value: MediaStream | null) => {
    this.segmentVideo.next(value);
  };

  updateSelfieSegmentation = (value: SelfieSegmentation | null) => {
    this.selfieSegmentation.next(value);
  };

  updatePauseSegmentation = (value: boolean) => {
    this.pauseSegmentation.next(value);
  };

  updateProcessedStream = (value: MediaStream | null) => {
    this.processedStream.next(value);
  };

  updateKeepBackground = (value: boolean) => {
    this.keepBackground.next(value);
  };

  updateBackgroundHasChanged = (value: boolean) => {
    this.backgroundHasChanged.next(value);
  };

  updateVirtualStream = (value: MediaStream | null) => {
    this.virtualStream.next(value);
  };

  updateMainCanvas = (value: HTMLCanvasElement | null) => {
    this.mainCanvas.next(value);
  };

  updatePrevKeepBackground = (value: boolean) => {
    this.prevKeepBackground.next(value);
  };

  updateAppliedBackground = (value: boolean) => {
    this.appliedBackground.next(value);
  };

  updateIsBackgroundModalVisible = (value: boolean) => {
    this.isBackgroundModalVisible.next(value);
  };

  updateAutoClickBackground = (value: boolean) => {
    this.autoClickBackground.next(value);
  };

  updateBreakoutRooms = (value: BreakoutParticipant[][]) => {
    this.breakoutRooms.next(value);
  };

  updateCurrentRoomIndex = (value: number) => {
    this.currentRoomIndex.next(value);
  };

  updateCanStartBreakout = (value: boolean) => {
    this.canStartBreakout.next(value);
  };

  updateBreakOutRoomStarted = (value: boolean) => {
    this.breakOutRoomStarted.next(value);
  };

  updateBreakOutRoomEnded = (value: boolean) => {
    this.breakOutRoomEnded.next(value);
  };

  updateHostNewRoom = (value: number) => {
    this.hostNewRoom.next(value);
  };

  updateLimitedBreakRoom = (value: BreakoutParticipant[]) => {
    this.limitedBreakRoom.next(value);
  };

  updateMainRoomsLength = (value: number) => {
    this.mainRoomsLength.next(value);
  };

  updateMemberRoom = (value: number) => {
    this.memberRoom.next(value);
  };

  updateIsBreakoutRoomsModalVisible = (value: boolean) => {
    this.isBreakoutRoomsModalVisible.next(value);
  };

  updateWhiteboardUsers = (value: WhiteboardUser[]) => {
    this.whiteboardUsers.next(value);
  };

  updateCurrentWhiteboardIndex = (value: number) => {
    this.currentWhiteboardIndex.next(value);
  };

  updateCanStartWhiteboard = (value: boolean) => {
    this.canStartWhiteboard.next(value);
  };

  updateWhiteboardStarted = (value: boolean) => {
    this.whiteboardStarted.next(value);
  };

  updateWhiteboardEnded = (value: boolean) => {
    this.whiteboardEnded.next(value);
  };

  updateWhiteboardLimit = (value: number) => {
    this.whiteboardLimit.next(value);
  };

  updateIsWhiteboardModalVisible = (value: boolean) => {
    this.isWhiteboardModalVisible.next(value);
  };

  updateIsConfigureWhiteboardModalVisible = (value: boolean) => {
    this.isConfigureWhiteboardModalVisible.next(value);
  };

  updateShapes = (value: Shape[]) => {
    this.shapes.next(value);
  };

  updateUseImageBackground = (value: boolean) => {
    this.useImageBackground.next(value);
  };

  updateRedoStack = (value: Shape[]) => {
    this.redoStack.next(value);
  };

  updateUndoStack = (value: string[]) => {
    this.undoStack.next(value);
  };

  updateCanvasStream = (value: MediaStream | null) => {
    this.canvasStream.next(value);
  };

  updateCanvasWhiteboard = (value: HTMLCanvasElement | null) => {
    this.canvasWhiteboard.next(value);
  };

  updateCanvasScreenboard = (value: HTMLCanvasElement | null) => {
    this.canvasScreenboard.next(value);
  };

  updateProcessedScreenStream = (value: MediaStream | null) => {
    this.processedScreenStream.next(value);
  };

  updateAnnotateScreenStream = (value: boolean) => {
    this.annotateScreenStream.next(value);
  };

  updateMainScreenCanvas = (value: HTMLCanvasElement | null) => {
    this.mainScreenCanvas.next(value);
  };

  updateIsScreenboardModalVisible = (value: boolean) => {
    this.isScreenboardModalVisible.next(value);
  };

  checkOrientation = () => {
    const isPortrait = window.matchMedia('(orientation: portrait)').matches;
    return isPortrait ? 'portrait' : 'landscape';
  };

  showAlert = ({
    message,
    type,
    duration = 3000,
  }: {
    message: string;
    type: 'success' | 'danger';
    duration?: number;
  }) => {
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
      recordingVideoParticipantsFullRoomSupport:
        this.recordingVideoParticipantsFullRoomSupport.value,
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
      updateRecordingAudioParticipantsTimeLimit:
        this.updateRecordingAudioParticipantsTimeLimit.bind(this),
      updateRecordingVideoPausesCount: this.updateRecordingVideoPausesCount.bind(this),
      updateRecordingVideoPausesLimit: this.updateRecordingVideoPausesLimit.bind(this),
      updateRecordingVideoSupport: this.updateRecordingVideoSupport.bind(this),
      updateRecordingVideoPeopleLimit: this.updateRecordingVideoPeopleLimit.bind(this),
      updateRecordingVideoParticipantsTimeLimit:
        this.updateRecordingVideoParticipantsTimeLimit.bind(this),
      updateRecordingAllParticipantsSupport: this.updateRecordingAllParticipantsSupport.bind(this),
      updateRecordingVideoParticipantsSupport:
        this.updateRecordingVideoParticipantsSupport.bind(this),
      updateRecordingAllParticipantsFullRoomSupport:
        this.updateRecordingAllParticipantsFullRoomSupport.bind(this),
      updateRecordingVideoParticipantsFullRoomSupport:
        this.updateRecordingVideoParticipantsFullRoomSupport.bind(this),
      updateRecordingPreferredOrientation: this.updateRecordingPreferredOrientation.bind(this),
      updateRecordingSupportForOtherOrientation:
        this.updateRecordingSupportForOtherOrientation.bind(this),
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
      updateIsConfigureWhiteboardModalVisible:
        this.updateIsConfigureWhiteboardModalVisible.bind(this),
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

  updateButtonState(buttonType: string, value: boolean) {
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
        } else {
          return { ...button, active: true }; //always default to true for active
        }
      }
      if (buttonType === 'endCallActive' && button.icon === this.faPhone) {
        return { ...button, active: value };
      }
      if (buttonType === 'participantsActive' && button.icon === this.faUsers) {
        return { ...button, active: value };
      }
      if (
        buttonType === 'showMessagesBadge' &&
        button.customName &&
        button.customName === 'Messages'
      ) {
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

  PrejoinPageComponent: any = {
    component: this.PrejoinPage,
    injector: null,
  };

  updatePrejoinPageComponent = () => {
    const PrejoinComp = {
      component: this.PrejoinPage,
      injector: this.createInjector({
        parameters: {
          showAlert:
            this.showAlert ||
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
    ]).subscribe(
      ([
        recordPaused,
        recordStarted,
        recordStopped,
        recordResumed,
        recordingProgressTime,
        showRecordButtons,
        islevel,
      ]) => {
        if (
          recordPaused ||
          recordStarted ||
          recordStopped ||
          recordResumed ||
          recordingProgressTime ||
          showRecordButtons ||
          islevel
        ) {
          this.updateRecordButtons();
        }
      },
    );

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
    this.coHostSubscription = combineLatest([this.coHost, this.coHostResponsibility]).subscribe(
      ([coHost, coHostResponsibility]) => {
        if (coHost || coHostResponsibility) {
          this.updateCustomMenuButtons();
        }
      },
    );

    // Subscribe to changes in BehaviorSubject and update the buttons accordingly
    this.buttonSubscriptions.push(
      this.micActive.subscribe((value) => {
        this.updateButtonState('micActive', value);
      }),
    );

    this.buttonSubscriptions.push(
      this.videoActive.subscribe((value) => {
        this.updateButtonState('videoActive', value);
      }),
    );

    this.buttonSubscriptions.push(
      this.screenShareActive.subscribe((value) => {
        this.updateButtonState('screenShareActive', value);
      }),
    );

    this.buttonSubscriptions.push(
      this.showMessagesBadge.subscribe((value) => {
        this.updateButtonState('showMessagesBadge', value);
      }),
    );

    this.buttonSubscriptions.push(
      this.totalReqWait.subscribe(() => {
        this.updateButtonState('showMenuBadge', true);
      }),
    );

    this.buttonSubscriptions.push(
      this.participantsCounter.subscribe((value) => {
        this.updateMenuParticipantsWidget(value);
      }),
    );

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
    } else {
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
      } catch (error) {
        console.log('error connectAndaAddSocketMethods', error);
      }

      this.startMeetingProgressTimer.startMeetingProgressTimer({
        startTime: Date.now() / 1000,
        parameters: { ...this.getAllParams(), ...this.mediaSFUFunctions() },
      });

      this.updateIsLoadingModalVisible(false);
    }
  }

  @HostListener('window:resize')
  @HostListener('window:orientationchange')
  async handleResize() {
    let fraction = 0;

    if (
      window.innerHeight < window.innerWidth &&
      (this.eventType.value == 'webinar' || this.eventType.value == 'conference')
    ) {
      const currentHeight = window.innerHeight;
      fraction = Number((40 / currentHeight).toFixed(3));
      if (fraction != this.controlHeight.value) {
        this.updateControlHeight(Number(fraction));
      }
    } else {
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
      defaultFraction:
        this.eventType.value == 'webinar' || this.eventType.value == 'conference'
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

  async disconnectAllSockets(consume_sockets: ConsumeSocket[]): Promise<void> {
    for (const socket of consume_sockets) {
      try {
        const ip = Object.keys(socket)[0];
        await socket[ip].disconnect();
      } catch (error) {
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

  computeDimensionsMethod = ({
    containerWidthFraction = 1,
    containerHeightFraction = 1,
    mainSize,
    doStack = true,
    defaultFraction,
  }: {
    containerWidthFraction?: number;
    containerHeightFraction?: number;
    mainSize: number;
    doStack?: boolean;
    defaultFraction: number;
  }): ComponentSizes => {
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

  calculateDimensions({
    parentWidth,
    parentHeight,
    isWideScreen,
    mainSize,
    doStack,
  }: {
    parentWidth: number;
    parentHeight: number;
    isWideScreen: boolean;
    mainSize: number;
    doStack: boolean;
  }): ComponentSizes {
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
    } else {
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

  async joinRoom(data: {
    socket: Socket;
    roomName: string;
    islevel: string;
    member: string;
    sec: string;
    apiUserName: string;
  }): Promise<ResponseJoinRoom | null> {
    const { socket, roomName, islevel, member, sec, apiUserName } = data;

    try {
      const response: ResponseJoinRoom | null = await this.joinRoomClient.joinRoomClient({
        socket,
        roomName,
        islevel,
        member,
        sec,
        apiUserName,
      });

      return response;
    } catch (error) {
      console.log('Error joining room:', error);
      throw new Error('Failed to join the room. Please check your connection and try again.');
    }
  }

  async join_Room({
    socket,
    roomName,
    islevel,
    member,
    sec,
    apiUserName,
  }: {
    socket: Socket;
    roomName: string;
    islevel: string;
    member: string;
    sec: string;
    apiUserName: string;
  }): Promise<void> {
    const data: ResponseJoinRoom | null = await this.joinRoom({
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
        } else {
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
      } catch {
        /* handle error */
      }
    } else {
      this.updateValidated(false);
      try {
        if (this.showAlert && data?.reason) {
          this.showAlert({ message: data?.reason, type: 'danger', duration: 3000 });
        }
      } catch {
        /* handle error */
      }
    }
  }

  onParticipantsFilterChange = (value: string): void => {
    if (value && value.length > 0) {
      this.filteredParticipants.next(
        this.participants.value.filter((participant) =>
          participant.name.toLowerCase().includes(value.toLowerCase()),
        ),
      );
      this.participantsCounter.next(this.filteredParticipants.value.length);
    } else {
      this.filteredParticipants.next(this.participants.value);
      this.participantsCounter.next(this.participants.value.length);
    }
  };

  updateStatesToInitialValues = async () => {
    const initialValues = initialValuesState as { [key: string]: any };
    const updateFunctions = this.getAllParams() as unknown as {
      [key: string]: (value: any) => void;
    };

    for (const key in initialValues) {
      if (Object.prototype.hasOwnProperty.call(initialValues, key)) {
        const updateFunctionName = `update${key.charAt(0).toUpperCase() + key.slice(1)}`;
        const updateFunction = updateFunctions[updateFunctionName];

        if (typeof updateFunction === 'function') {
          try {
            updateFunction(initialValues[key]);
          } catch {
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

  updateRecordTimerWidget = (
    recordingProgressTime: string = this.recordingProgressTime.value,
  ): { component: any; injector: Injector } => {
    const recordTimerWidget = {
      component: RecordTimerWidget,
      injector: this.createInjector({ recordingProgressTime: recordingProgressTime }),
    };

    this.recordTimerWidget = { ...recordTimerWidget };

    this.cdr.markForCheck();

    return recordTimerWidget;
  };

  recordButtons: MainButtonAlt[] = [];

  recordButtonsArray: MainButtonAlt[] = [
    {
      icon: this.faPlayCircle,
      active: () => !this.recordPaused.value,
      onPress: () =>
        this.updateRecording.updateRecording({
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
      onPress: () =>
        this.stopRecording.stopRecording({
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
      onPress: () =>
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
        activeColor:
          typeof button.inActiveColor === 'function'
            ? button.inActiveColor()
            : button.inActiveColor,
        inActiveColor:
          typeof button.inActiveColor === 'function'
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

  updateMenuRecordWidget = (recordButtons: MainButtonAlt[] = this.recordButtons): any => {
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

  updateMenuParticipantsWidget = (count: number = this.participantsCounter.value): any => {
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

  customMenuButtonsArray: MainCustomButton[] = [
    {
      icon: this.faRecordVinyl,
      text: 'Record',
      action: () =>
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
      action: () =>
        this.launchSettings.launchSettings({
          updateIsSettingsModalVisible: this.updateIsSettingsModalVisible.bind(this),
          isSettingsModalVisible: this.isSettingsModalVisible.value,
        }),
      show: () => this.islevel.value == '2',
    },
    {
      icon: this.faUsers,
      text: 'Requests',
      action: () =>
        this.launchRequests.launchRequests({
          updateIsRequestsModalVisible: this.updateIsRequestsModalVisible.bind(this),
          isRequestsModalVisible: this.isRequestsModalVisible.value,
        }),
      show: () =>
        this.islevel.value == '2' ||
        (this.coHostResponsibility.value &&
          this.coHost.value &&
          this.coHost.value === this.member.value &&
          !!this.coHostResponsibility?.value?.find((item) => item.name === 'media')?.value) ||
        false,
    },
    {
      icon: this.faClock,
      text: 'Waiting',
      action: () =>
        this.launchWaiting.launchWaiting({
          updateIsWaitingModalVisible: this.updateIsWaitingModalVisible.bind(this),
          isWaitingModalVisible: this.isWaitingModalVisible.value,
        }),
      show: () =>
        this.islevel.value == '2' ||
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
      action: () =>
        this.launchCoHost.launchCoHost({
          updateIsCoHostModalVisible: this.updateIsCoHostModalVisible.bind(this),
          isCoHostModalVisible: this.isCoHostModalVisible.value,
        }),
      show: () => this.islevel.value == '2',
    },
    {
      icon: this.faTools,
      text: 'Set Media',
      action: () =>
        this.launchMediaSettings.launchMediaSettings({
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
      action: () =>
        this.launchDisplaySettings.launchDisplaySettings({
          updateIsDisplaySettingsModalVisible: this.updateIsDisplaySettingsModalVisible.bind(this),
          isDisplaySettingsModalVisible: this.isDisplaySettingsModalVisible.value,
        }),
      show: () => true,
    },
    {
      icon: this.faPoll,
      text: 'Poll',
      action: () =>
        this.launchPoll.launchPoll({
          updateIsPollModalVisible: this.updateIsPollModalVisible.bind(this),
          isPollModalVisible: this.isPollModalVisible.value,
        }),
      show: () => true,
    },
    {
      icon: this.faUserFriends,
      text: 'Breakout Rooms',
      action: () =>
        this.launchBreakoutRooms.launchBreakoutRooms({
          updateIsBreakoutRoomsModalVisible: this.updateIsBreakoutRoomsModalVisible.bind(this),
          isBreakoutRoomsModalVisible: this.isBreakoutRoomsModalVisible.value,
        }),
      show: () => this.islevel.value == '2',
    },
    {
      icon: this.faChalkboardTeacher,
      text: 'Whiteboard',
      action: () =>
        this.launchConfigureWhiteboard.launchConfigureWhiteboard({
          updateIsConfigureWhiteboardModalVisible:
            this.updateIsConfigureWhiteboardModalVisible.bind(this),
          isConfigureWhiteboardModalVisible: this.isConfigureWhiteboardModalVisible.value,
        }),
      show: () => this.islevel.value == '2',
    },
  ];

  customMenuButtons: MainCustomButton[] = [];

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
      onPress: () =>
        this.clickAudio.clickAudio({
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
      onPress: () =>
        this.clickVideo.clickVideo({
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
      onPress: () =>
        this.clickScreenShare.clickScreenShare({
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
      onPress: () =>
        this.launchConfirmExit.launchConfirmExit({
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
      onPress: () =>
        this.launchParticipants.launchParticipants({
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
      onPress: () =>
        this.launchMenuModal.launchMenuModal({
          updateIsMenuModalVisible: this.updateIsMenuModalVisible.bind(this),
          isMenuModalVisible: this.isMenuModalVisible.value,
        }),
      show: true,
    },
    {
      customComponent: this.messageWidget,
      customName: 'Messages',
      onPress: () =>
        this.launchMessages.launchMessages({
          updateIsMessagesModalVisible: this.updateIsMessagesModalVisible.bind(this),
          isMessagesModalVisible: this.isMessagesModalVisible.value,
        }),
      show: true,
    },
  ];

  async connect_Socket(
    apiUserName: string,
    apiKey: string,
    apiToken: string,
  ): Promise<Socket | null> {
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

      this.socket.value.on('allMembers', async (membersData: AllMembersData) => {
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

      this.socket.value.on('allMembersRest', async (membersData: AllMembersRestData) => {
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

      this.socket.value.on('userWaiting', async ({ name }: { name: string }) => {
        await this.userWaiting.userWaiting({
          name,
          showAlert: this.showAlert.bind(this),
          totalReqWait: this.totalReqWait.value,
          updateTotalReqWait: this.updateTotalReqWait.bind(this),
        });
      });

      this.socket.value.on('personJoined', async ({ name }: { name: string }) => {
        this.personJoined.personJoined({
          name,
          showAlert: this.showAlert.bind(this),
        });
      });

      this.socket.value.on(
        'allWaitingRoomMembers',
        async (waiting_data: AllWaitingRoomMembersData) => {
          await this.allWaitingRoomMembers.allWaitingRoomMembers({
            waitingParticipants: waiting_data.waitingParticipants
              ? waiting_data.waitingParticipants
              : waiting_data.waitingParticipantss
              ? waiting_data.waitingParticipantss
              : this.waitingRoomList.value,
            updateTotalReqWait: this.updateTotalReqWait.bind(this),
            updateWaitingRoomList: this.updateWaitingRoomList.bind(this),
          });
        },
      );

      this.socket.value.on(
        'roomRecordParams',
        async ({ recordParams }: { recordParams: RecordParams }) => {
          this.roomRecordParams.roomRecordParams({
            recordParams,
            parameters: { ...this.getAllParams(), ...this.mediaSFUFunctions() },
          });
        },
      );

      this.socket.value.on('ban', async ({ name }: { name: string }) => {
        await this.banParticipant.banParticipant({
          name,
          parameters: { ...this.getAllParams(), ...this.mediaSFUFunctions() },
        });
      });

      this.socket.value.on('updatedCoHost', async (cohost_data: UpdatedCoHostData) => {
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

      this.socket.value.on(
        'participantRequested',
        async ({ userRequest }: { userRequest: Request }) => {
          await this.participantRequested.participantRequested({
            userRequest,
            requestList: this.requestList.value,
            waitingRoomList: this.waitingRoomList.value,
            updateTotalReqWait: this.updateTotalReqWait.bind(this),
            updateRequestList: this.updateRequestList.bind(this),
          });
        },
      );

      this.socket.value.on('screenProducerId', async ({ producerId }: { producerId: string }) => {
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
      this.socket.value.on('updateMediaSettings', async ({ settings }: { settings: Settings }) => {
        this.updateMediaSettings.updateMediaSettings({
          settings,
          updateAudioSetting: this.updateAudioSetting.bind(this),
          updateVideoSetting: this.updateVideoSetting.bind(this),
          updateScreenshareSetting: this.updateScreenshareSetting.bind(this),
          updateChatSetting: this.updateChatSetting.bind(this),
        });
      });

      this.socket.value.on(
        'producer-media-paused',
        async ({
          producerId,
          kind,
          name,
        }: {
          producerId: string;
          kind: 'video' | 'audio' | 'screenshare' | 'screen';
          name: string;
        }) => {
          await this.producerMediaPaused.producerMediaPaused({
            producerId,
            kind,
            name,
            parameters: { ...this.getAllParams(), ...this.mediaSFUFunctions() },
          });
        },
      );

      this.socket.value.on(
        'producer-media-resumed',
        async ({ kind, name }: { kind: 'audio'; name: string }) => {
          await this.producerMediaResumed.producerMediaResumed({
            kind,
            name,
            parameters: { ...this.getAllParams(), ...this.mediaSFUFunctions() },
          });
        },
      );

      this.socket.value.on(
        'producer-media-closed',
        async ({
          producerId,
          kind,
        }: {
          producerId: string;
          kind: 'video' | 'audio' | 'screenshare' | 'screen';
        }) => {
          if (producerId && kind) {
            await this.producerMediaClosed.producerMediaClosed({
              producerId,
              kind,
              parameters: { ...this.getAllParams(), ...this.mediaSFUFunctions() },
            });
          }
        },
      );

      this.socket.value.on(
        'controlMediaHost',
        async ({ type }: { type: 'video' | 'audio' | 'screenshare' | 'chat' | 'all' }) => {
          await this.controlMediaHost.controlMediaHost({
            type,
            parameters: { ...this.getAllParams(), ...this.mediaSFUFunctions() },
          });
        },
      );

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

      this.socket.value.on('receiveMessage', async ({ message }: { message: Message }) => {
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

      this.socket.value.on(
        'meetingTimeRemaining',
        async ({ timeRemaining }: { timeRemaining: number }) => {
          await this.meetingTimeRemaining.meetingTimeRemaining({
            timeRemaining,
            showAlert: this.showAlert.bind(this),
            eventType: this.eventType.value,
          });
        },
      );

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

      this.socket.value.on(
        'updateConsumingDomains',
        async ({ domains, alt_domains }: UpdateConsumingDomainsData) => {
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
        },
      );

      this.socket.value.on(
        'RecordingNotice',
        async ({ state, userRecordingParam, pauseCount, timeDone }: RecordingNoticeData) => {
          await this.recordingNotice.RecordingNotice({
            state,
            userRecordingParam,
            pauseCount,
            timeDone,
            parameters: { ...this.getAllParams(), ...this.mediaSFUFunctions() },
          });
        },
      );

      this.socket.value.on('timeLeftRecording', async ({ timeLeft }: { timeLeft: number }) => {
        this.timeLeftRecording.timeLeftRecording({
          timeLeft,
          showAlert: this.showAlert.bind(this),
        });
      });

      this.socket.value.on(
        'stoppedRecording',
        async ({ state, reason }: { state: string; reason: string }) => {
          await this.stoppedRecording.stoppedRecording({
            state,
            reason,
            showAlert: this.showAlert.bind(this),
          });
        },
      );
      this.socket.value.on(
        'hostRequestResponse',
        ({ requestResponse }: HostRequestResponseData) => {
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
        },
      );
      this.socket.value.on('pollUpdated', async (data: PollUpdatedData) => {
        try {
          await this.pollUpdated.pollUpdated({
            data,
            polls: this.polls.value,
            poll: this.poll.value ? this.poll.value : ({} as Poll),
            member: this.member.value,
            islevel: this.islevel.value,
            showAlert: this.showAlert.bind(this),
            updatePolls: this.updatePolls.bind(this),
            updatePoll: this.updatePoll.bind(this),
            updateIsPollModalVisible: this.updateIsPollModalVisible.bind(this),
          });
        } catch {
          /* handle error */
        }
      });

      this.socket.value.on('breakoutRoomUpdated', async (data: BreakoutRoomUpdatedData) => {
        try {
          await this.breakoutRoomUpdated.breakoutRoomUpdated({
            data,
            parameters: { ...this.getAllParams(), ...this.mediaSFUFunctions() },
          });
        } catch {
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
    } else {
      return null;
    }
  }
}
