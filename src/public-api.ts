//initial values
import { initialValuesState } from './lib/methods/utils/initial-values.util';

//import components for display (samples)
import { LoadingModal } from './lib/components/display-components/loading-modal/loading-modal.component';
import { MainAspectComponent } from './lib/components/display-components/main-aspect-component/main-aspect-component.component';
import { ControlButtonsComponent } from './lib/components/display-components/control-buttons-component/control-buttons-component.component';
import { ControlButtonsAltComponent } from './lib/components/display-components/control-buttons-alt-component/control-buttons-alt-component.component';
import { ControlButtonsComponentTouch } from './lib/components/display-components/control-buttons-component-touch/control-buttons-component-touch.component';
import { OtherGridComponent } from './lib/components/display-components/other-grid-component/other-grid-component.component';
import { MainScreenComponent } from './lib/components/display-components/main-screen-component/main-screen-component.component';
import { MainGridComponent } from './lib/components/display-components/main-grid-component/main-grid-component.component';
import { SubAspectComponent } from './lib/components/display-components/sub-aspect-component/sub-aspect-component.component';
import { MainContainerComponent } from './lib/components/display-components/main-container-component/main-container-component.component';
import { AlertComponent } from './lib/components/display-components/alert-component/alert.component.component';
import { MenuModal } from './lib/components/menu-components/menu-modal/menu-modal.component';
import { RecordingModal } from './lib/components/recording-components/recording-modal/recording-modal.component';
import { RequestsModal } from './lib/components/requests-components/requests-modal/requests-modal.component';
import { WaitingRoomModal } from './lib/components/waiting-components/waiting-room-modal.component';
import { DisplaySettingsModal } from './lib/components/display-settings-components/display-settings-modal.component';
import { EventSettingsModal } from './lib/components/event-settings-components/event-settings-modal/event-settings-modal.component';
import { CoHostModal } from './lib/components/co-host-components/co-host-modal/co-host-modal.component';
import { ParticipantsModal } from './lib/components/participants-components/participants-modal/participants-modal.component';
import { MessagesModal } from './lib/components/message-components/messages-modal/messages-modal.component';
import { MediaSettingsModal } from './lib/components/media-settings-components/media-settings-modal/media-settings-modal.component';
import { ConfirmExitModal } from './lib/components/exit-components/confirm-exit-modal/confirm-exit-modal.component';
import { ConfirmHereModal } from './lib/components/misc-components/confirm-here-modal/confirm-here-modal.component';
import { ShareEventModal } from './lib/components/misc-components/share-event-modal/share-event-modal.component';
import { WelcomePage } from './lib/components/misc-components/welcome-page/welcome-page.component';
import { PreJoinPage } from './lib/components/misc-components/pre-join-page/pre-join-page.component';

import { PollModal } from './lib/components/polls-components/poll-modal/poll-modal.component';
import { BackgroundModal } from './lib/components/background-components/background-modal/background-modal.component';
import { BreakoutRoomsModal } from './lib/components/breakout-components/breakout-rooms-modal.component';
import { ConfigureWhiteboardModal } from './lib/components/whiteboard-components/configure-whiteboard-modal/configure-whiteboard-modal.component';
import { Whiteboard } from './lib/components/whiteboard-components/whiteboard/whiteboard.component';
import { Screenboard } from './lib/components/screenboard-components/screenboard/screenboard.component';
import { ScreenboardModal } from './lib/components/screenboard-components/screenboard-modal/screenboard-modal.component';

//pagination and display of media (samples)
import { Pagination } from './lib/components/display-components/pagination/pagination.component';
import { FlexibleGrid } from './lib/components/display-components/flexible-grid/flexible-grid.component';
import { FlexibleVideo } from './lib/components/display-components/flexible-video/flexible-video.component';
import { AudioGrid } from './lib/components/display-components/audio-grid/audio-grid.component';

//import methods for control (samples)
import { LaunchMenuModal } from './lib/methods/menu-methods/launch-menu-modal.service';
import { LaunchRecording } from './lib/methods/recording-methods/launch-recording.service';
import { StartRecording } from './lib/methods/recording-methods/start-recording.service';
import { ConfirmRecording } from './lib/methods/recording-methods/confirm-recording.service';
import { LaunchWaiting } from './lib/methods/waiting-methods/launch-waiting.service';
import { launchCoHost } from './lib/methods/co-host-methods/launch-co-host.service';
import { LaunchMediaSettings } from './lib/methods/media-settings-methods/launch-media-settings.service';
import { LaunchDisplaySettings } from './lib/methods/display-settings-methods/launch-display-settings.service';
import { LaunchSettings } from './lib/methods/settings-methods/launch-settings.service';
import { LaunchRequests } from './lib/methods/requests-methods/launch-requests.service';
import { LaunchParticipants } from './lib/methods/participants-methods/launch-participants.service';
import { LaunchMessages } from './lib/methods/message-methods/launch-messages.service';
import { LaunchConfirmExit } from './lib/methods/exit-methods/launch-confirm-exit.service';
import { LaunchPoll } from './lib/methods/polls-methods/launch-poll.service';
import { LaunchBackground } from './lib/methods/background-methods/launch-background.service';
import { LaunchBreakoutRooms } from './lib/methods/breakout-room-methods/launch-breakout-rooms.service';
import { LaunchConfigureWhiteboard } from './lib/methods/whiteboard-methods/launch-configure-whiteboard.service';

// mediasfu functions -- examples
import { SocketManager } from './lib/sockets/socket-manager.service';
import { JoinRoomClient } from './lib/producer-client/producer-client-emits/join-room-client.service';
import { UpdateRoomParametersClient } from './lib/producer-client/producer-client-emits/update-room-parameters-client.service';
import { CreateDeviceClient } from './lib/producer-client/producer-client-emits/create-device-client.service';

import { ClickVideo } from './lib/methods/stream-methods/click-video.service';
import { ClickAudio } from './lib/methods/stream-methods/click-audio.service';
import { ClickScreenShare } from './lib/methods/stream-methods/click-screen-share.service';
import { StreamSuccessVideo } from './lib/consumers/stream-success-video.service';
import { StreamSuccessAudio } from './lib/consumers/stream-success-audio.service';
import { StreamSuccessScreen } from './lib/consumers/stream-success-screen.service';
import { StreamSuccessAudioSwitch } from './lib/consumers/stream-success-audio-switch.service';
import { CheckPermission } from './lib/consumers/check-permission.service';
import { ProducerClosed } from './lib/consumers/socket-receive-methods/producer-closed.service';
import { NewPipeProducer } from './lib/consumers/socket-receive-methods/new-pipe-producer.service';

//mediasfu functions
import { UpdateMiniCardsGrid } from './lib/consumers/update-mini-cards-grid.service';
import { MixStreams } from './lib/consumers/mix-streams.service';
import { DispStreams } from './lib/consumers/disp-streams.service';
import { StopShareScreen } from './lib/consumers/stop-share-screen.service';
import { CheckScreenShare } from './lib/consumers/check-screen-share.service';
import { StartShareScreen } from './lib/consumers/start-share-screen.service';
import { RequestScreenShare } from './lib/consumers/request-screen-share.service';
import { ReorderStreams } from './lib/consumers/reorder-streams.service';
import { PrepopulateUserMedia } from './lib/consumers/prepopulate-user-media.service';
import { GetVideos } from './lib/consumers/get-videos.service';
import { RePort } from './lib/consumers/re-port.service';
import { Trigger } from './lib/consumers/trigger.service';
import { ConsumerResume } from './lib/consumers/consumer-resume.service';
import { ConnectSendTransportAudio } from './lib/consumers/connect-send-transport-audio.service';
import { ConnectSendTransportVideo } from './lib/consumers/connect-send-transport-video.service';
import { ConnectSendTransportScreen } from './lib/consumers/connect-send-transport-screen.service';
import { ProcessConsumerTransports } from './lib/consumers/process-consumer-transports.service';
import { ResumePauseStreams } from './lib/consumers/resume-pause-streams.service';
import { Readjust } from './lib/consumers/readjust.service';
import { CheckGrid } from './lib/consumers/check-grid.service';
import { GetEstimate } from './lib/consumers/get-estimate.service';
import { CalculateRowsAndColumns } from './lib/consumers/calculate-rows-and-columns.service';
import { AddVideosGrid } from './lib/consumers/add-videos-grid.service';
import { OnScreenChanges } from './lib/consumers/on-screen-changes.service';
import { sleep } from './lib/methods/utils/sleep.util';
import { ChangeVids } from './lib/consumers/change-vids.service';
import { CompareActiveNames } from './lib/consumers/compare-active-names.service';
import { CompareScreenStates } from './lib/consumers/compare-screen-states.service';
import { CreateSendTransport } from './lib/consumers/create-send-transport.service';
import { ResumeSendTransportAudio } from './lib/consumers/resume-send-transport-audio.service';
import { ReceiveAllPipedTransports } from './lib/consumers/receive-all-piped-transports.service';
import { DisconnectSendTransportVideo } from './lib/consumers/disconnect-send-transport-video.service';
import { DisconnectSendTransportAudio } from './lib/consumers/disconnect-send-transport-audio.service';
import { DisconnectSendTransportScreen } from './lib/consumers/disconnect-send-transport-screen.service';
import { ConnectSendTransport } from './lib/consumers/connect-send-transport.service';
import { GetPipedProducersAlt } from './lib/consumers/get-piped-producers-alt.service';
import { SignalNewConsumerTransport } from './lib/consumers/signal-new-consumer-transport.service';
import { ConnectRecvTransport } from './lib/consumers/connect-recv-transport.service';
import { ReUpdateInter } from './lib/consumers/re-update-inter.service';
import { UpdateParticipantAudioDecibels } from './lib/consumers/update-participant-audio-decibels.service';
import { CloseAndResize } from './lib/consumers/close-and-resize.service';
import { AutoAdjust } from './lib/consumers/auto-adjust.service';
import { SwitchUserVideoAlt } from './lib/consumers/switch-user-video-alt.service';
import { SwitchUserVideo } from './lib/consumers/switch-user-video.service';
import { SwitchUserAudio } from './lib/consumers/switch-user-audio.service';
import { ReceiveRoomMessages } from './lib/consumers/receive-room-messages.service';
import { FormatNumber } from './lib/methods/utils/format-number.service';
import { ConnectIps } from './lib/consumers/connect-ips.service';

import { PollUpdated } from './lib/methods/polls-methods/poll-updated.service';
import { HandleCreatePoll } from './lib/methods/polls-methods/handle-create-poll.service';
import { HandleVotePoll } from './lib/methods/polls-methods/handle-vote-poll.service';
import { HandleEndPoll } from './lib/methods/polls-methods/handle-end-poll.service';

import { BreakoutRoomUpdated } from './lib/methods/breakout-room-methods/breakout-room-updated.service';

import { StartMeetingProgressTimer } from './lib/methods/utils/meeting-timer/start-meeting-progress-timer.service';
import { UpdateRecording } from './lib/methods/recording-methods/update-recording.service';
import { StopRecording } from './lib/methods/recording-methods/stop-recording.service';

import { UserWaiting } from './lib/producers/socket-receive-methods/user-waiting.service';
import { PersonJoined } from './lib/producers/socket-receive-methods/person-joined.service';
import { AllWaitingRoomMembers } from './lib/producers/socket-receive-methods/all-waiting-room-members.service';
import { RoomRecordParams } from './lib/producers/socket-receive-methods/room-record-params.service';
import { BanParticipant } from './lib/producers/socket-receive-methods/ban-participant.service';
import { UpdatedCoHost } from './lib/producers/socket-receive-methods/updated-co-host.service';
import { ParticipantRequested } from './lib/producers/socket-receive-methods/participant-requested.service';
import { ScreenProducerId } from './lib/producers/socket-receive-methods/screen-producer-id.service';
import { UpdateMediaSettings } from './lib/producers/socket-receive-methods/update-media-settings.service';
import { ProducerMediaPaused } from './lib/producers/socket-receive-methods/producer-media-paused.service';
import { ProducerMediaResumed } from './lib/producers/socket-receive-methods/producer-media-resumed.service';
import { ProducerMediaClosed } from './lib/producers/socket-receive-methods/producer-media-closed.service';
import { ControlMediaHost } from './lib/producers/socket-receive-methods/control-media-host.service';
import { MeetingEnded } from './lib/producers/socket-receive-methods/meeting-ended.service';
import { DisconnectUserSelf } from './lib/producers/socket-receive-methods/disconnect-user-self.service';
import { ReceiveMessage } from './lib/producers/socket-receive-methods/receive-message.service';
import { MeetingTimeRemaining } from './lib/producers/socket-receive-methods/meeting-time-remaining.service';
import { MeetingStillThere } from './lib/producers/socket-receive-methods/meeting-still-there.service';
import { StartRecords } from './lib/producers/socket-receive-methods/start-records.service';
import { ReInitiateRecording } from './lib/producers/socket-receive-methods/re-initiate-recording.service';
import { GetDomains } from './lib/producers/socket-receive-methods/get-domains.service';
import { UpdateConsumingDomains } from './lib/producers/socket-receive-methods/update-consuming-domains.service';
import { RecordingNotice } from './lib/producers/socket-receive-methods/recording-notice.service';
import { TimeLeftRecording } from './lib/producers/socket-receive-methods/time-left-recording.service';
import { StoppedRecording } from './lib/producers/socket-receive-methods/stopped-recording.service';
import { HostRequestResponse } from './lib/producers/socket-receive-methods/host-request-response.service';
import { AllMembers } from './lib/producers/socket-receive-methods/all-members.service';
import { AllMembersRest } from './lib/producers/socket-receive-methods/all-members-rest.service';
import { Disconnect } from './lib/producers/socket-receive-methods/disconnect.service';

import { CaptureCanvasStream } from './lib/methods/whiteboard-methods/capture-canvas-stream.service';
import { ResumePauseAudioStreams } from './lib/consumers/resume-pause-audio-streams.service';
import { ProcessConsumerTransportsAudio } from './lib/consumers/process-consumer-transports-audio.service';

//Prebuilt Event Rooms
import { MediasfuGeneric } from './lib/components/mediasfu-components/mediasfu-generic.component';
import { MediasfuBroadcast } from './lib/components/mediasfu-components/mediasfu-broadcast.component';
import { MediasfuWebinar } from './lib/components/mediasfu-components/mediasfu-webinar.component';
import { MediasfuConference } from './lib/components/mediasfu-components/mediasfu-conference.component';
import { MediasfuChat } from './lib/components/mediasfu-components/mediasfu-chat.component';

//Random Data
import { GenerateRandomParticipants } from './lib/methods/utils/generate-random-participants.service';
import { GenerateRandomMessages } from './lib/methods/utils/generate-random-messages.service';
import { GenerateRandomRequestList } from './lib/methods/utils/generate-random-request-list.service';
import { GenerateRandomWaitingRoomList } from './lib/methods/utils/generate-random-waiting-room-list.service';
import { GenerateRandomPolls } from './lib/methods/utils/generate-random-polls.service';

//Key UI Components
import { MeetingProgressTimer } from './lib/components/display-components/meeting-progress-timer/meeting-progress-timer.component';
import { MiniAudio } from './lib/components/display-components/mini-audio/mini-audio.component';
import { MiniCard } from './lib/components/display-components/mini-card/mini-card.component';
import { AudioCard } from './lib/components/display-components/audio-card/audio-card.component';
import { VideoCard } from './lib/components/display-components/video-card/video-card.component';
import { CardVideoDisplay } from './lib/components/display-components/card-video-display/card-video-display.component';
import { MiniCardAudio } from './lib/components/display-components/mini-card-audio/mini-card-audio.component';
import { MiniAudioPlayer } from './lib/methods/utils/mini-audio-player/mini-audio-player.component';
import { SoundPlayer } from './lib/methods/utils/sound-player.service';

export {
  initialValuesState,
  LoadingModal,
  MainAspectComponent,
  ControlButtonsComponent,
  ControlButtonsAltComponent,
  ControlButtonsComponentTouch,
  OtherGridComponent,
  MainScreenComponent,
  MainGridComponent,
  SubAspectComponent,
  MainContainerComponent,
  AlertComponent,
  MenuModal,
  RecordingModal,
  RequestsModal,
  WaitingRoomModal,
  DisplaySettingsModal,
  EventSettingsModal,
  CoHostModal,
  ParticipantsModal,
  MessagesModal,
  MediaSettingsModal,
  ConfirmExitModal,
  ConfirmHereModal,
  ShareEventModal,
  WelcomePage,
  PreJoinPage,
  Pagination,
  FlexibleGrid,
  FlexibleVideo,
  AudioGrid,
  LaunchMenuModal,
  LaunchRecording,
  StartRecording,
  ConfirmRecording,
  LaunchWaiting,
  launchCoHost,
  LaunchMediaSettings,
  LaunchDisplaySettings,
  LaunchSettings,
  LaunchRequests,
  LaunchParticipants,
  LaunchMessages,
  LaunchConfirmExit,
  JoinRoomClient,
  UpdateRoomParametersClient,
  CreateDeviceClient,
  ClickVideo,
  ClickAudio,
  ClickScreenShare,
  StreamSuccessVideo,
  StreamSuccessAudio,
  StreamSuccessScreen,
  StreamSuccessAudioSwitch,
  CheckPermission,
  ProducerClosed,
  NewPipeProducer,
  UpdateMiniCardsGrid,
  MixStreams,
  DispStreams,
  StopShareScreen,
  CheckScreenShare,
  StartShareScreen,
  RequestScreenShare,
  ReorderStreams,
  PrepopulateUserMedia,
  GetVideos,
  RePort,
  Trigger,
  ConsumerResume,
  ConnectSendTransportAudio,
  ConnectSendTransportVideo,
  ConnectSendTransportScreen,
  ProcessConsumerTransports,
  ResumePauseStreams,
  Readjust,
  CheckGrid,
  GetEstimate,
  CalculateRowsAndColumns,
  AddVideosGrid,
  OnScreenChanges,
  sleep,
  ChangeVids,
  CompareActiveNames,
  CompareScreenStates,
  CreateSendTransport,
  ResumeSendTransportAudio,
  ReceiveAllPipedTransports,
  DisconnectSendTransportVideo,
  DisconnectSendTransportAudio,
  DisconnectSendTransportScreen,
  ConnectSendTransport,
  GetPipedProducersAlt,
  SignalNewConsumerTransport,
  ConnectRecvTransport,
  ReUpdateInter,
  UpdateParticipantAudioDecibels,
  CloseAndResize,
  AutoAdjust,
  SwitchUserVideoAlt,
  SwitchUserVideo,
  SwitchUserAudio,
  ReceiveRoomMessages,
  FormatNumber,
  ConnectIps,
  StartMeetingProgressTimer,
  UpdateRecording,
  StopRecording,
  UserWaiting,
  PersonJoined,
  AllWaitingRoomMembers,
  RoomRecordParams,
  BanParticipant,
  UpdatedCoHost,
  ParticipantRequested,
  ScreenProducerId,
  UpdateMediaSettings,
  ProducerMediaPaused,
  ProducerMediaResumed,
  ProducerMediaClosed,
  ControlMediaHost,
  MeetingEnded,
  DisconnectUserSelf,
  ReceiveMessage,
  MeetingTimeRemaining,
  MeetingStillThere,
  StartRecords,
  ReInitiateRecording,
  GetDomains,
  UpdateConsumingDomains,
  RecordingNotice,
  TimeLeftRecording,
  StoppedRecording,
  HostRequestResponse,
  AllMembers,
  AllMembersRest,
  Disconnect,
  MediasfuGeneric,
  MediasfuBroadcast,
  MediasfuWebinar,
  MediasfuConference,
  MediasfuChat,
  GenerateRandomParticipants,
  GenerateRandomMessages,
  GenerateRandomRequestList,
  GenerateRandomWaitingRoomList,
  GenerateRandomPolls,
  MeetingProgressTimer,
  MiniAudio,
  MiniCard,
  AudioCard,
  VideoCard,
  CardVideoDisplay,
  MiniCardAudio,
  MiniAudioPlayer,
  SoundPlayer,
  CaptureCanvasStream,
  ResumePauseAudioStreams,
  ProcessConsumerTransportsAudio,
  PollUpdated,
  HandleCreatePoll,
  HandleVotePoll,
  HandleEndPoll,
  BreakoutRoomUpdated,
  LaunchPoll,
  LaunchBackground,
  LaunchBreakoutRooms,
  LaunchConfigureWhiteboard,
  PollModal,
  BackgroundModal,
  BreakoutRoomsModal,
  ConfigureWhiteboardModal,
  Whiteboard,
  Screenboard,
  ScreenboardModal,
  SocketManager,
};
