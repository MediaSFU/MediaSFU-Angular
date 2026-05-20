import { Injectable } from '@angular/core';
import { Participant } from '../../@types/types';
import { PanelistData } from './panelists-updated.service';
import { panelistFocusChanged as sharedPanelistFocusChanged } from 'mediasfu-shared';

export interface PanelistFocusChangedData {
  focusEnabled: boolean;
  panelists: PanelistData[];
  muteOthersMic: boolean;
  muteOthersCamera: boolean;
}

export interface PanelistFocusChangedOptions {
  data: PanelistFocusChangedData;
  updatePanelistsFocused?: (focused: boolean) => void;
  updateMuteOthersMic?: (mute: boolean) => void;
  updateMuteOthersCamera?: (mute: boolean) => void;
  updatePanelists?: (panelists: Participant[]) => void;
  currentPanelistsFocused?: boolean;
  currentPanelists?: Participant[];
  onScreenChanges?: () => Promise<void>;
}

export type PanelistFocusChangedType = (options: PanelistFocusChangedOptions) => Promise<void>;

@Injectable({
  providedIn: 'root',
})
export class PanelistFocusChanged {
  async panelistFocusChanged({
    data,
    updatePanelistsFocused,
    updateMuteOthersMic,
    updateMuteOthersCamera,
    updatePanelists,
    currentPanelistsFocused,
    currentPanelists,
    onScreenChanges,
  }: PanelistFocusChangedOptions): Promise<void> {
    return sharedPanelistFocusChanged({
      data,
      updatePanelistsFocused,
      updateMuteOthersMic,
      updateMuteOthersCamera,
      updatePanelists,
      currentPanelistsFocused,
      currentPanelists,
      onScreenChanges,
    });
  }
}
