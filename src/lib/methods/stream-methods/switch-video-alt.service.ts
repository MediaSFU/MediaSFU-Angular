import { Injectable } from '@angular/core';
import { ShowAlert, SwitchUserVideoAltType, SwitchUserVideoParameters } from '../../@types/types';

export interface SwitchVideoAltParameters extends SwitchUserVideoParameters {
  recordStarted: boolean;
  recordResumed: boolean;
  recordStopped: boolean;
  recordPaused: boolean;
  recordingMediaOptions: string;
  videoAlreadyOn: boolean;
  currentFacingMode: string;
  prevFacingMode: string;
  allowed: boolean;
  audioOnlyRoom: boolean;
  updateCurrentFacingMode: (mode: string) => void;
  updatePrevFacingMode: (mode: string) => void;
  updateIsMediaSettingsModalVisible: (isVisible: boolean) => void;
  showAlert?: ShowAlert;

  // mediasfu functions
  switchUserVideoAlt: SwitchUserVideoAltType;

  getUpdatedAllParams: () => SwitchVideoAltParameters;
  // [key: string]: any;
}

export interface SwitchVideoAltOptions {
  parameters: SwitchVideoAltParameters;
}

// Export the type definition for the function
export type SwitchVideoAltType = (options: SwitchVideoAltOptions) => Promise<void>;

@Injectable({
  providedIn: 'root',
})
export class SwitchVideoAlt {
  async switchVideoAlt({ parameters }: SwitchVideoAltOptions): Promise<void> {
    let {
      recordStarted,
      recordResumed,
      recordStopped,
      recordPaused,
      recordingMediaOptions,
      videoAlreadyOn,
      currentFacingMode,
      allowed,
      audioOnlyRoom,
      updateCurrentFacingMode,
      updateIsMediaSettingsModalVisible,

      showAlert,

      //media functions
      switchUserVideoAlt,
    } = parameters;

    if (audioOnlyRoom) {
      showAlert?.({
        message: 'You cannot turn on your camera in an audio-only event.',
        type: 'danger',
        duration: 3000,
      });
      return;
    }

    let checkoff = false;
    if (
      (recordStarted || recordResumed) &&
      !recordStopped &&
      !recordPaused &&
      recordingMediaOptions === 'video'
    ) {
      checkoff = true;
    }

    if (!allowed) {
      showAlert?.({
        message: 'Allow access to your camera by starting it for the first time.',
        type: 'danger',
        duration: 3000,
      });
      return;
    }

    if (checkoff) {
      if (videoAlreadyOn) {
        showAlert?.({
          message: 'Please turn off your video before switching.',
          type: 'danger',
          duration: 3000,
        });
        return;
      }
    } else {
      if (!videoAlreadyOn) {
        showAlert?.({
          message: 'Please turn on your video before switching.',
          type: 'danger',
          duration: 3000,
        });
        return;
      }
    }

    // Camera switching logic here
    let newFacingMode = currentFacingMode === 'environment' ? 'user' : 'environment';

    updateCurrentFacingMode(newFacingMode);
    updateIsMediaSettingsModalVisible(false);

    await switchUserVideoAlt({ videoPreference: newFacingMode, checkoff, parameters });
  }
}
