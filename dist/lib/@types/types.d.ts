import { Socket } from 'socket.io-client';
import { Consumer, DtlsParameters, IceCandidate, IceParameters, RtpCapabilities } from 'mediasoup-client/lib/types';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { CustomComponent } from '../components/display-components/control-buttons-component/control-buttons-component.component';
import { CustomButton } from '../components/menu-components/custom-buttons/custom-buttons.component';
import { ComponentType } from '@angular/cdk/portal';
export type { JoinConsumeRoomOptions, JoinConsumeRoomType, JoinConsumeRoomParameters, } from '../consumers/socket-receive-methods/join-consume-room.service';
export type { ProducerClosedOptions, ProducerClosedType, ProducerClosedParameters, } from '../consumers/socket-receive-methods/producer-closed.service';
export type { NewPipeProducerOptions, NewPipeProducerType, NewPipeProducerParameters, } from '../consumers/socket-receive-methods/new-pipe-producer.service';
export type { AddVideosGridOptions, AddVideosGridType, AddVideosGridParameters, } from '../consumers/add-videos-grid.service';
export type { AutoAdjustOptions, AutoAdjustType } from '../consumers/auto-adjust.service';
export type { CalculateRowsAndColumnsOptions, CalculateRowsAndColumnsType, } from '../consumers/calculate-rows-and-columns.service';
export type { ChangeVidsOptions, ChangeVidsType, ChangeVidsParameters, } from '../consumers/change-vids.service';
export type { CheckGridOptions, CheckGridType } from '../consumers/check-grid.service';
export type { CheckPermissionOptions, CheckPermissionType, } from '../consumers/check-permission.service';
export type { CheckScreenShareOptions, CheckScreenShareType, CheckScreenShareParameters, } from '../consumers/check-screen-share.service';
export type { CloseAndResizeOptions, CloseAndResizeType, CloseAndResizeParameters, } from '../consumers/close-and-resize.service';
export type { CompareActiveNamesOptions, CompareActiveNamesType, CompareActiveNamesParameters, } from '../consumers/compare-active-names.service';
export type { CompareScreenStatesOptions, CompareScreenStatesType, CompareScreenStatesParameters, } from '../consumers/compare-screen-states.service';
export type { ConnectIpsOptions, ConnectIpsType, ConnectIpsParameters, } from '../consumers/connect-ips.service';
export type { ConnectRecvTransportOptions, ConnectRecvTransportType, ConnectRecvTransportParameters, } from '../consumers/connect-recv-transport.service';
export type { ConnectSendTransportOptions, ConnectSendTransportType, ConnectSendTransportParameters, } from '../consumers/connect-send-transport.service';
export type { ConnectSendTransportAudioOptions, ConnectSendTransportAudioType, ConnectSendTransportAudioParameters, } from '../consumers/connect-send-transport-audio.service';
export type { ConnectSendTransportScreenOptions, ConnectSendTransportScreenType, ConnectSendTransportScreenParameters, } from '../consumers/connect-send-transport-screen.service';
export type { ConnectSendTransportVideoOptions, ConnectSendTransportVideoType, ConnectSendTransportVideoParameters, } from '../consumers/connect-send-transport-video.service';
export type { ConsumerResumeOptions, ConsumerResumeType, ConsumerResumeParameters, } from '../consumers/consumer-resume.service';
export type { ControlMediaOptions, ControlMediaType } from '../consumers/control-media.service';
export type { CreateSendTransportOptions, CreateSendTransportType, CreateSendTransportParameters, } from '../consumers/create-send-transport.service';
export type { DisconnectSendTransportAudioOptions, DisconnectSendTransportAudioType, DisconnectSendTransportAudioParameters, } from '../consumers/disconnect-send-transport-audio.service';
export type { DisconnectSendTransportVideoOptions, DisconnectSendTransportVideoType, DisconnectSendTransportVideoParameters, } from '../consumers/disconnect-send-transport-video.service';
export type { DisconnectSendTransportScreenOptions, DisconnectSendTransportScreenType, DisconnectSendTransportScreenParameters, } from '../consumers/disconnect-send-transport-screen.service';
export type { DispStreamsOptions, DispStreamsType, DispStreamsParameters, } from '../consumers/disp-streams.service';
export type { GeneratePageContentOptions, GeneratePageContentType, } from '../consumers/generate-page-content.service';
export type { GetEstimateOptions, GetEstimateType, GetEstimateParameters, } from '../consumers/get-estimate.service';
export type { GetPipedProducersAltOptions, GetPipedProducersAltType, GetPipedProducersAltParameters, } from '../consumers/get-piped-producers-alt.service';
export type { GetProducersPipedOptions, GetProducersPipedType, GetProducersPipedParameters, } from '../consumers/get-producers-piped.service';
export type { GetVideosOptions, GetVideosType } from '../consumers/get-videos.service';
export type { MixStreamsOptions, MixStreamsType } from '../consumers/mix-streams.service';
export type { OnScreenChangesOptions, OnScreenChangesType, OnScreenChangesParameters, } from '../consumers/on-screen-changes.service';
export type { PrepopulateUserMediaOptions, PrepopulateUserMediaType, PrepopulateUserMediaParameters, } from '../consumers/prepopulate-user-media.service';
export type { ProcessConsumerTransportsOptions, ProcessConsumerTransportsType, ProcessConsumerTransportsParameters, } from '../consumers/process-consumer-transports.service';
export type { ProcessConsumerTransportsAudioOptions, ProcessConsumerTransportsAudioType, ProcessConsumerTransportsAudioParameters, } from '../consumers/process-consumer-transports-audio.service';
export type { ReadjustOptions, ReadjustType, ReadjustParameters, } from '../consumers/readjust.service';
export type { ReceiveAllPipedTransportsOptions, ReceiveAllPipedTransportsType, ReceiveAllPipedTransportsParameters, } from '../consumers/receive-all-piped-transports.service';
export type { ReorderStreamsOptions, ReorderStreamsType, ReorderStreamsParameters, } from '../consumers/reorder-streams.service';
export type { RePortOptions, RePortType, RePortParameters } from '../consumers/re-port.service';
export type { RequestScreenShareOptions, RequestScreenShareType, RequestScreenShareParameters, } from '../consumers/request-screen-share.service';
export type { ResumePauseAudioStreamsOptions, ResumePauseAudioStreamsType, ResumePauseAudioStreamsParameters, } from '../consumers/resume-pause-audio-streams.service';
export type { ResumePauseStreamsOptions, ResumePauseStreamsType, ResumePauseStreamsParameters, } from '../consumers/resume-pause-streams.service';
export type { ResumeSendTransportAudioOptions, ResumeSendTransportAudioType, ResumeSendTransportAudioParameters, } from '../consumers/resume-send-transport-audio.service';
export type { ReUpdateInterOptions, ReUpdateInterType, ReUpdateInterParameters, } from '../consumers/re-update-inter.service';
export type { SignalNewConsumerTransportOptions, SignalNewConsumerTransportType, SignalNewConsumerTransportParameters, } from '../consumers/signal-new-consumer-transport.service';
export type { StartShareScreenOptions, StartShareScreenType, StartShareScreenParameters, } from '../consumers/start-share-screen.service';
export type { StopShareScreenOptions, StopShareScreenType, StopShareScreenParameters, } from '../consumers/stop-share-screen.service';
export type { StreamSuccessAudioOptions, StreamSuccessAudioType, StreamSuccessAudioParameters, } from '../consumers/stream-success-audio.service';
export type { StreamSuccessAudioSwitchOptions, StreamSuccessAudioSwitchType, StreamSuccessAudioSwitchParameters, } from '../consumers/stream-success-audio-switch.service';
export type { StreamSuccessScreenOptions, StreamSuccessScreenType, StreamSuccessScreenParameters, } from '../consumers/stream-success-screen.service';
export type { StreamSuccessVideoOptions, StreamSuccessVideoType, StreamSuccessVideoParameters, } from '../consumers/stream-success-video.service';
export type { SwitchUserAudioOptions, SwitchUserAudioType, SwitchUserAudioParameters, } from '../consumers/switch-user-audio.service';
export type { SwitchUserVideoOptions, SwitchUserVideoType, SwitchUserVideoParameters, } from '../consumers/switch-user-video.service';
export type { SwitchUserVideoAltOptions, SwitchUserVideoAltType, SwitchUserVideoAltParameters, } from '../consumers/switch-user-video-alt.service';
export type { TriggerOptions, TriggerType, TriggerParameters } from '../consumers/trigger.service';
export type { UpdateMiniCardsGridOptions, UpdateMiniCardsGridType, UpdateMiniCardsGridParameters, } from '../consumers/update-mini-cards-grid.service';
export type { UpdateParticipantAudioDecibelsOptions, UpdateParticipantAudioDecibelsType, } from '../consumers/update-participant-audio-decibels.service';
export type { AParamsType } from '../methods/utils/producer/a-params.service';
export type { HParamsType } from '../methods/utils/producer/h-params.service';
export type { ScreenParamsType } from '../methods/utils/producer/screen-params.service';
export type { VParamsType } from '../methods/utils/producer/v-params.service';
export type { LaunchBackgroundOptions, LaunchBackgroundType, } from '../methods/background-methods/launch-background.service';
export type { LaunchBreakoutRoomsOptions, LaunchBreakoutRoomsType, } from '../methods/breakout-room-methods/launch-breakout-rooms.service';
export type { BreakoutRoomUpdatedOptions, BreakoutRoomUpdatedType, BreakoutRoomUpdatedParameters, } from '../methods/breakout-room-methods/breakout-room-updated.service';
export type { LaunchCoHostOptions, LaunchCoHostType, } from '../methods/co-host-methods/launch-co-host.service';
export type { ModifyCoHostSettingsOptions, ModifyCoHostSettingsType, } from '../methods/co-host-methods/modify-co-host-settings.service';
export type { LaunchDisplaySettingsOptions, LaunchDisplaySettingsType, } from '../methods/display-settings-methods/launch-display-settings.service';
export type { ModifyDisplaySettingsOptions, ModifyDisplaySettingsType, ModifyDisplaySettingsParameters, } from '../methods/display-settings-methods/modify-display-settings.service';
export type { LaunchConfirmExitOptions, LaunchConfirmExitType, } from '../methods/exit-methods/launch-confirm-exit.service';
export type { ConfirmExitOptions, ConfirmExitType, } from '../methods/exit-methods/confirm-exit.service';
export type { LaunchMediaSettingsOptions, LaunchMediaSettingsType, } from '../methods/media-settings-methods/launch-media-settings.service';
export type { LaunchMenuModalOptions, LaunchMenuModalType, } from '../methods/menu-methods/launch-menu-modal.service';
export type { LaunchMessagesOptions, LaunchMessagesType, } from '../methods/message-methods/launch-messages.service';
export type { SendMessageOptions, SendMessageType, } from '../methods/message-methods/send-message.service';
export type { LaunchParticipantsOptions, LaunchParticipantsType, } from '../methods/participants-methods/launch-participants.service';
export type { MessageParticipantsOptions, MessageParticipantsType, } from '../methods/participants-methods/message-participants.service';
export type { MuteParticipantsOptions, MuteParticipantsType, } from '../methods/participants-methods/mute-participants.service';
export type { RemoveParticipantsOptions, RemoveParticipantsType, } from '../methods/participants-methods/remove-participants.service';
export type { HandleCreatePollOptions, HandleCreatePollType, } from '../methods/polls-methods/handle-create-poll.service';
export type { HandleEndPollOptions, HandleEndPollType, } from '../methods/polls-methods/handle-end-poll.service';
export type { HandleVotePollOptions, HandleVotePollType, } from '../methods/polls-methods/handle-vote-poll.service';
export type { LaunchPollOptions, LaunchPollType, } from '../methods/polls-methods/launch-poll.service';
export type { PollUpdatedOptions, PollUpdatedType, } from '../methods/polls-methods/poll-updated.service';
export type { CheckPauseStateOptions, CheckPauseStateType, } from '../methods/recording-methods/check-pause-state.service';
export type { CheckResumeStateOptions, CheckResumeStateType, } from '../methods/recording-methods/check-resume-state.service';
export type { ConfirmRecordingOptions, ConfirmRecordingType, ConfirmRecordingParameters, } from '../methods/recording-methods/confirm-recording.service';
export type { LaunchRecordingOptions, LaunchRecordingType, } from '../methods/recording-methods/launch-recording.service';
export type { RecordPauseTimerOptions, RecordPauseTimerType, } from '../methods/recording-methods/record-pause-timer.service';
export type { RecordResumeTimerOptions, RecordResumeTimerType, } from '../methods/recording-methods/record-resume-timer.service';
export type { RecordStartTimerOptions, RecordStartTimerType, } from '../methods/recording-methods/record-start-timer.service';
export type { RecordUpdateTimerOptions, RecordUpdateTimerType, } from '../methods/recording-methods/record-update-timer.service';
export type { StartRecordingOptions, StartRecordingType, StartRecordingParameters, } from '../methods/recording-methods/start-recording.service';
export type { StopRecordingOptions, StopRecordingType, StopRecordingParameters, } from '../methods/recording-methods/stop-recording.service';
export type { UpdateRecordingOptions, UpdateRecordingType, UpdateRecordingParameters, } from '../methods/recording-methods/update-recording.service';
export type { LaunchRequestsOptions, LaunchRequestsType, } from '../methods/requests-methods/launch-requests.service';
export type { RespondToRequestsOptions, RespondToRequestsType, } from '../methods/requests-methods/respond-to-requests.service';
export type { LaunchSettingsOptions, LaunchSettingsType, } from '../methods/settings-methods/launch-settings.service';
export type { ModifySettingsOptions, ModifySettingsType, } from '../methods/settings-methods/modify-settings.service';
export type { ClickAudioOptions, ClickAudioType, ClickAudioParameters, } from '../methods/stream-methods/click-audio.service';
export type { ClickChatOptions, ClickChatType } from '../methods/stream-methods/click-chat.service';
export type { ClickScreenShareOptions, ClickScreenShareType, ClickScreenShareParameters, } from '../methods/stream-methods/click-screen-share.service';
export type { ClickVideoOptions, ClickVideoType, ClickVideoParameters, } from '../methods/stream-methods/click-video.service';
export type { SwitchAudioOptions, SwitchAudioType, SwitchAudioParameters, } from '../methods/stream-methods/switch-audio.service';
export type { SwitchVideoOptions, SwitchVideoType, SwitchVideoParameters, } from '../methods/stream-methods/switch-video.service';
export type { SwitchVideoAltOptions, SwitchVideoAltType, } from '../methods/stream-methods/switch-video-alt.service';
export type { StartMeetingProgressTimerOptions, StartMeetingProgressTimerType, StartMeetingProgressTimerParameters, } from '../methods/utils/meeting-timer/start-meeting-progress-timer.service';
export type { MiniAudioPlayerOptions, MiniAudioPlayerType, MiniAudioPlayerParameters, } from '../methods/utils/mini-audio-player/mini-audio-player.component';
export type { FormatNumberOptions, FormatNumberType } from '../methods/utils/format-number.service';
export type { GenerateRandomMessagesOptions, GenerateRandomMessagesType, } from '../methods/utils/generate-random-messages.service';
export type { GenerateRandomParticipantsOptions, GenerateRandomParticipantsType, } from '../methods/utils/generate-random-participants.service';
export type { GenerateRandomPollsOptions, GenerateRandomPollsType, } from '../methods/utils/generate-random-polls.service';
export type { GenerateRandomRequestListOptions, GenerateRandomRequestListType, } from '../methods/utils/generate-random-request-list.service';
export type { GenerateRandomWaitingRoomListType } from '../methods/utils/generate-random-waiting-room-list.service';
export type { GetModalPositionOptions, GetModalPositionType, } from '../methods/utils/get-modal-position.util';
export type { GetOverlayPositionOptions, GetOverlayPositionType, } from '../methods/utils/get-overlay-position.util';
export type { SleepOptions, SleepType } from '../methods/utils/sleep.util';
export type { ValidateAlphanumericOptions, ValidateAlphanumericType, } from '../methods/utils/validate-alphanumeric.service';
export type { LaunchWaitingOptions, LaunchWaitingType, } from '../methods/waiting-methods/launch-waiting.service';
export type { RespondToWaitingOptions, RespondToWaitingType, } from '../methods/waiting-methods/respond-to-waiting.service';
export type { LaunchConfigureWhiteboardOptions, LaunchConfigureWhiteboardType, } from '../methods/whiteboard-methods/launch-configure-whiteboard.service';
export type { CaptureCanvasStreamOptions, CaptureCanvasStreamType, CaptureCanvasStreamParameters, } from '../methods/whiteboard-methods/capture-canvas-stream.service';
export type { CreateDeviceClientOptions, CreateDeviceClientType, } from '../producer-client/producer-client-emits/create-device-client.service';
export type { JoinRoomClientOptions, JoinRoomClientType, } from '../producer-client/producer-client-emits/join-room-client.service';
export type { UpdateRoomParametersClientOptions, UpdateRoomParametersClientType, UpdateRoomParametersClientParameters, } from '../producer-client/producer-client-emits/update-room-parameters-client.service';
export type { JoinConRoomOptions, JoinConRoomType, } from '../producers/producer-emits/join-con-room.service';
export type { JoinRoomOptions, JoinRoomType } from '../producers/producer-emits/join-room.service';
export type { AllMembersOptions, AllMembersType, AllMembersParameters, } from '../producers/socket-receive-methods/all-members.service';
export type { AllMembersRestOptions, AllMembersRestType, AllMembersRestParameters, } from '../producers/socket-receive-methods/all-members-rest.service';
export type { AllWaitingRoomMembersOptions, AllWaitingRoomMembersType, } from '../producers/socket-receive-methods/all-waiting-room-members.service';
export type { BanParticipantOptions, BanParticipantType, BanParticipantParameters, } from '../producers/socket-receive-methods/ban-participant.service';
export type { ControlMediaHostOptions, ControlMediaHostType, ControlMediaHostParameters, } from '../producers/socket-receive-methods/control-media-host.service';
export type { DisconnectOptions, DisconnectType, } from '../producers/socket-receive-methods/disconnect.service';
export type { DisconnectUserSelfOptions, DisconnectUserSelfType, } from '../producers/socket-receive-methods/disconnect-user-self.service';
export type { GetDomainsOptions, GetDomainsType, GetDomainsParameters, } from '../producers/socket-receive-methods/get-domains.service';
export type { HostRequestResponseOptions, HostRequestResponseType, } from '../producers/socket-receive-methods/host-request-response.service';
export type { MeetingEndedOptions, MeetingEndedType, } from '../producers/socket-receive-methods/meeting-ended.service';
export type { MeetingStillThereOptions, MeetingStillThereType, } from '../producers/socket-receive-methods/meeting-still-there.service';
export type { MeetingTimeRemainingOptions, MeetingTimeRemainingType, } from '../producers/socket-receive-methods/meeting-time-remaining.service';
export type { ParticipantRequestedOptions, ParticipantRequestedType, } from '../producers/socket-receive-methods/participant-requested.service';
export type { PersonJoinedOptions, PersonJoinedType, } from '../producers/socket-receive-methods/person-joined.service';
export type { ProducerMediaClosedOptions, ProducerMediaClosedType, ProducerMediaClosedParameters, } from '../producers/socket-receive-methods/producer-media-closed.service';
export type { ProducerMediaPausedOptions, ProducerMediaPausedType, ProducerMediaPausedParameters, } from '../producers/socket-receive-methods/producer-media-paused.service';
export type { ProducerMediaResumedOptions, ProducerMediaResumedType, ProducerMediaResumedParameters, } from '../producers/socket-receive-methods/producer-media-resumed.service';
export type { ReInitiateRecordingOptions, ReInitiateRecordingType, } from '../producers/socket-receive-methods/re-initiate-recording.service';
export type { ReceiveMessageOptions, ReceiveMessageType, } from '../producers/socket-receive-methods/receive-message.service';
export type { RecordingNoticeOptions, RecordingNoticeType, RecordingNoticeParameters, } from '../producers/socket-receive-methods/recording-notice.service';
export type { RoomRecordParamsOptions, RoomRecordParamsType, RoomRecordParamsParameters, RecordParams, } from '../producers/socket-receive-methods/room-record-params.service';
export type { ScreenProducerIdOptions, ScreenProducerIdType, } from '../producers/socket-receive-methods/screen-producer-id.service';
export type { StartRecordsOptions, StartRecordsType, } from '../producers/socket-receive-methods/start-records.service';
export type { StoppedRecordingOptions, StoppedRecordingType, } from '../producers/socket-receive-methods/stopped-recording.service';
export type { TimeLeftRecordingOptions, TimeLeftRecordingType, } from '../producers/socket-receive-methods/time-left-recording.service';
export type { UpdateConsumingDomainsOptions, UpdateConsumingDomainsType, UpdateConsumingDomainsParameters, } from '../producers/socket-receive-methods/update-consuming-domains.service';
export type { UpdateMediaSettingsOptions, UpdateMediaSettingsType, } from '../producers/socket-receive-methods/update-media-settings.service';
export type { UpdatedCoHostOptions, UpdatedCoHostType, } from '../producers/socket-receive-methods/updated-co-host.service';
export type { UserWaitingOptions, UserWaitingType, } from '../producers/socket-receive-methods/user-waiting.service';
export type { ConnectSocketOptions, ConnectSocketType, DisconnectSocketType, DisconnectSocketOptions, } from '../sockets/socket-manager.service';
export type { BackgroundModalOptions, BackgroundModalType, BackgroundModalParameters, } from '../components/background-components/background-modal/background-modal.component';
export type { BreakoutRoomsModalOptions, BreakoutRoomsModalType, BreakoutRoomsModalParameters, } from '../components/breakout-components/breakout-rooms-modal.component';
export type { CoHostModalOptions, CoHostModalType, } from '../components/co-host-components/co-host-modal/co-host-modal.component';
export type { AlertComponentOptions, AlertComponentType, } from '../components/display-components/alert-component/alert.component.component';
export type { AudioCardOptions, AudioCardType, AudioCardParameters, } from '../components/display-components/audio-card/audio-card.component';
export type { AudioGridOptions, AudioGridType, } from '../components/display-components/audio-grid/audio-grid.component';
export type { CardVideoDisplayOptions, CardVideoDisplayType, } from '../components/display-components/card-video-display/card-video-display.component';
export type { ControlButtonsComponentOptions, ControlButtonsComponentType, Button, } from '../components/display-components/control-buttons-component/control-buttons-component.component';
export type { ControlButtonsAltComponentOptions, ControlButtonsAltComponentType, AltButton, } from '../components/display-components/control-buttons-alt-component/control-buttons-alt-component.component';
export type { ControlButtonsComponentTouchOptions, ControlButtonsComponentTouchType, ButtonTouch, } from '../components/display-components/control-buttons-component-touch/control-buttons-component-touch.component';
export type { FlexibleGridOptions, FlexibleGridType, } from '../components/display-components/flexible-grid/flexible-grid.component';
export type { FlexibleVideoOptions, FlexibleVideoType, } from '../components/display-components/flexible-video/flexible-video.component';
export type { LoadingModalOptions, LoadingModalType, } from '../components/display-components/loading-modal/loading-modal.component';
export type { MainAspectComponentOptions, MainAspectComponentType, } from '../components/display-components/main-aspect-component/main-aspect-component.component';
export type { MainContainerComponentOptions, MainContainerComponentType, } from '../components/display-components/main-container-component/main-container-component.component';
export type { MainGridComponentOptions, MainGridComponentType, } from '../components/display-components/main-grid-component/main-grid-component.component';
export type { MainScreenComponentOptions, MainScreenComponentType, } from '../components/display-components/main-screen-component/main-screen-component.component';
export type { MeetingProgressTimerOptions, MeetingProgressTimerType, } from '../components/display-components/meeting-progress-timer/meeting-progress-timer.component';
export type { MiniAudioOptions, MiniAudioType, } from '../components/display-components/mini-audio/mini-audio.component';
export type { MiniCardOptions, MiniCardType, } from '../components/display-components/mini-card/mini-card.component';
export type { MiniCardAudioOptions, MiniCardAudioType, } from '../components/display-components/mini-card-audio/mini-card-audio.component';
export type { OtherGridComponentOptions, OtherGridComponentType, } from '../components/display-components/other-grid-component/other-grid-component.component';
export type { PaginationOptions, PaginationType, } from '../components/display-components/pagination/pagination.component';
export type { SubAspectComponentOptions, SubAspectComponentType, } from '../components/display-components/sub-aspect-component/sub-aspect-component.component';
export type { VideoCardOptions, VideoCardType, VideoCardParameters, } from '../components/display-components/video-card/video-card.component';
export type { DisplaySettingsModalOptions, DisplaySettingsModalType, DisplaySettingsModalParameters, } from '../components/display-settings-components/display-settings-modal.component';
export type { EventSettingsModalOptions, EventSettingsModalType, } from '../components/event-settings-components/event-settings-modal/event-settings-modal.component';
export type { ConfirmExitModalOptions, ConfirmExitModalType, } from '../components/exit-components/confirm-exit-modal/confirm-exit-modal.component';
export type { MediaSettingsModalOptions, MediaSettingsModalType, MediaSettingsModalParameters, } from '../components/media-settings-components/media-settings-modal/media-settings-modal.component';
export type { MenuModalOptions, MenuModalType, } from '../components/menu-components/menu-modal/menu-modal.component';
export type { MessagesModalOptions, MessagesModalType, } from '../components/message-components/messages-modal/messages-modal.component';
export type { ConfirmHereModalOptions, ConfirmHereModalType, } from '../components/misc-components/confirm-here-modal/confirm-here-modal.component';
export type { PreJoinPageOptions, PreJoinPageType, PreJoinPageParameters, } from '../components/misc-components/pre-join-page/pre-join-page.component';
export type { ShareEventModalOptions, ShareEventModalType, } from '../components/misc-components/share-event-modal/share-event-modal.component';
export type { WelcomePageOptions, WelcomePageType, WelcomePageParameters, } from '../components/misc-components/welcome-page/welcome-page.component';
export type { ParticipantsModalOptions, ParticipantsModalType, ParticipantsModalParameters, } from '../components/participants-components/participants-modal/participants-modal.component';
export type { PollModalOptions, PollModalType, } from '../components/polls-components/poll-modal/poll-modal.component';
export type { RecordingModalOptions, RecordingModalType, RecordingModalParameters, } from '../components/recording-components/recording-modal/recording-modal.component';
export type { RequestsModalOptions, RequestsModalType, } from '../components/requests-components/requests-modal/requests-modal.component';
export type { ScreenboardOptions, ScreenboardType, ScreenboardParameters, } from '../components/screenboard-components/screenboard/screenboard.component';
export type { ScreenboardModalOptions, ScreenboardModalType, } from '../components/screenboard-components/screenboard-modal/screenboard-modal.component';
export type { WaitingRoomModalOptions, WaitingRoomModalType, WaitingRoomModalParameters, } from '../components/waiting-components/waiting-room-modal.component';
export type { ConfigureWhiteboardModalOptions, ConfigureWhiteboardModalType, } from '../components/whiteboard-components/configure-whiteboard-modal/configure-whiteboard-modal.component';
export type { WhiteboardOptions, WhiteboardType, WhiteboardParameters, Shape, } from '../components/whiteboard-components/whiteboard/whiteboard.component';
export type { CustomButton } from '../components/menu-components/custom-buttons/custom-buttons.component';
export interface Participant {
    id?: string;
    audioID: string;
    videoID: string;
    ScreenID?: string;
    ScreenOn?: boolean;
    islevel?: string;
    isAdmin?: boolean;
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
