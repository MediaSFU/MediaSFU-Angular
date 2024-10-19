import { Injectable } from '@angular/core';
export interface RecordParams {
  recordingAudioPausesLimit: number;
  recordingAudioPausesCount: number;
  recordingAudioSupport: boolean;
  recordingAudioPeopleLimit: number;
  recordingAudioParticipantsTimeLimit: number;
  recordingVideoPausesCount: number;
  recordingVideoPausesLimit: number;
  recordingVideoSupport: boolean;
  recordingVideoPeopleLimit: number;
  recordingVideoParticipantsTimeLimit: number;
  recordingAllParticipantsSupport: boolean;
  recordingVideoParticipantsSupport: boolean;
  recordingAllParticipantsFullRoomSupport: boolean;
  recordingVideoParticipantsFullRoomSupport: boolean;
  recordingPreferredOrientation: string;
  recordingSupportForOtherOrientation: boolean;
  recordingMultiFormatsSupport: boolean;
}

export interface RoomRecordParamsParameters {
  updateRecordingAudioPausesLimit: (value: number) => void;
  updateRecordingAudioPausesCount: (value: number) => void;
  updateRecordingAudioSupport: (value: boolean) => void;
  updateRecordingAudioPeopleLimit: (value: number) => void;
  updateRecordingAudioParticipantsTimeLimit: (value: number) => void;
  updateRecordingVideoPausesCount: (value: number) => void;
  updateRecordingVideoPausesLimit: (value: number) => void;
  updateRecordingVideoSupport: (value: boolean) => void;
  updateRecordingVideoPeopleLimit: (value: number) => void;
  updateRecordingVideoParticipantsTimeLimit: (value: number) => void;
  updateRecordingAllParticipantsSupport: (value: boolean) => void;
  updateRecordingVideoParticipantsSupport: (value: boolean) => void;
  updateRecordingAllParticipantsFullRoomSupport: (value: boolean) => void;
  updateRecordingVideoParticipantsFullRoomSupport: (value: boolean) => void;
  updateRecordingPreferredOrientation: (value: string) => void;
  updateRecordingSupportForOtherOrientation: (value: boolean) => void;
  updateRecordingMultiFormatsSupport: (value: boolean) => void;

  // mediasfu functions
  [key: string]: any;
}
export interface RoomRecordParamsOptions {
  recordParams: RecordParams;
  parameters: RoomRecordParamsParameters;
}

// Export the type definition for the function
export type RoomRecordParamsType = ({
  recordParams,
  parameters,
}: RoomRecordParamsOptions) => Promise<void>;

@Injectable({
  providedIn: 'root',
})
export class RoomRecordParams {
  /**
   * Updates various recording parameters based on the provided `recordParams`.
   *
   * @param {Object} params - The parameters object.
   * @param {RecordParams} params.recordParams - The recording parameters to update.
   * @param {Parameters} params.parameters - The functions to update each recording parameter.
   * @param {Function} params.parameters.updateRecordingAudioPausesLimit - Function to update the audio pauses limit.
   * @param {Function} params.parameters.updateRecordingAudioPausesCount - Function to update the audio pauses count.
   * @param {Function} params.parameters.updateRecordingAudioSupport - Function to update the audio support.
   * @param {Function} params.parameters.updateRecordingAudioPeopleLimit - Function to update the audio people limit.
   * @param {Function} params.parameters.updateRecordingAudioParticipantsTimeLimit - Function to update the audio participants time limit.
   * @param {Function} params.parameters.updateRecordingVideoPausesCount - Function to update the video pauses count.
   * @param {Function} params.parameters.updateRecordingVideoPausesLimit - Function to update the video pauses limit.
   * @param {Function} params.parameters.updateRecordingVideoSupport - Function to update the video support.
   * @param {Function} params.parameters.updateRecordingVideoPeopleLimit - Function to update the video people limit.
   * @param {Function} params.parameters.updateRecordingVideoParticipantsTimeLimit - Function to update the video participants time limit.
   * @param {Function} params.parameters.updateRecordingAllParticipantsSupport - Function to update the all participants support.
   * @param {Function} params.parameters.updateRecordingVideoParticipantsSupport - Function to update the video participants support.
   * @param {Function} params.parameters.updateRecordingAllParticipantsFullRoomSupport - Function to update the all participants full room support.
   * @param {Function} params.parameters.updateRecordingVideoParticipantsFullRoomSupport - Function to update the video participants full room support.
   * @param {Function} params.parameters.updateRecordingPreferredOrientation - Function to update the preferred orientation.
   * @param {Function} params.parameters.updateRecordingSupportForOtherOrientation - Function to update the support for other orientation.
   * @param {Function} params.parameters.updateRecordingMultiFormatsSupport - Function to update the multi-formats support.
   * @returns {Promise<void>} A promise that resolves when all parameters have been updated.
   */
  roomRecordParams = ({ recordParams, parameters }: RoomRecordParamsOptions): void => {
    let {
      updateRecordingAudioPausesLimit,
      updateRecordingAudioPausesCount,
      updateRecordingAudioSupport,
      updateRecordingAudioPeopleLimit,
      updateRecordingAudioParticipantsTimeLimit,
      updateRecordingVideoPausesCount,
      updateRecordingVideoPausesLimit,
      updateRecordingVideoSupport,
      updateRecordingVideoPeopleLimit,
      updateRecordingVideoParticipantsTimeLimit,
      updateRecordingAllParticipantsSupport,
      updateRecordingVideoParticipantsSupport,
      updateRecordingAllParticipantsFullRoomSupport,
      updateRecordingVideoParticipantsFullRoomSupport,
      updateRecordingPreferredOrientation,
      updateRecordingSupportForOtherOrientation,
      updateRecordingMultiFormatsSupport,
    } = parameters;

    // Update each recording parameter based on the provided recordParams
    updateRecordingAudioPausesLimit(recordParams.recordingAudioPausesLimit);
    updateRecordingAudioPausesCount(recordParams.recordingAudioPausesCount);
    updateRecordingAudioSupport(recordParams.recordingAudioSupport);
    updateRecordingAudioPeopleLimit(recordParams.recordingAudioPeopleLimit);
    updateRecordingAudioParticipantsTimeLimit(recordParams.recordingAudioParticipantsTimeLimit);
    updateRecordingVideoPausesCount(recordParams.recordingVideoPausesCount);
    updateRecordingVideoPausesLimit(recordParams.recordingVideoPausesLimit);
    updateRecordingVideoSupport(recordParams.recordingVideoSupport);
    updateRecordingVideoPeopleLimit(recordParams.recordingVideoPeopleLimit);
    updateRecordingVideoParticipantsTimeLimit(recordParams.recordingVideoParticipantsTimeLimit);
    updateRecordingAllParticipantsSupport(recordParams.recordingAllParticipantsSupport);
    updateRecordingVideoParticipantsSupport(recordParams.recordingVideoParticipantsSupport);
    updateRecordingAllParticipantsFullRoomSupport(
      recordParams.recordingAllParticipantsFullRoomSupport,
    );
    updateRecordingVideoParticipantsFullRoomSupport(
      recordParams.recordingVideoParticipantsFullRoomSupport,
    );
    updateRecordingPreferredOrientation(recordParams.recordingPreferredOrientation);
    updateRecordingSupportForOtherOrientation(recordParams.recordingSupportForOtherOrientation);
    updateRecordingMultiFormatsSupport(recordParams.recordingMultiFormatsSupport);
  };
}
