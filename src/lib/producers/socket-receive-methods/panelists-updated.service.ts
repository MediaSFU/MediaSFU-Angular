import { Injectable } from '@angular/core';
import { Participant } from '../../@types/types';
import { panelistsUpdated as sharedPanelistsUpdated } from 'mediasfu-shared';

export interface PanelistData {
  id: string;
  name: string;
}

export interface PanelistsUpdatedData {
  panelists: PanelistData[];
}

export interface PanelistsUpdatedOptions {
  data: PanelistsUpdatedData;
  updatePanelists?: (panelists: Participant[]) => void;
}

export type PanelistsUpdatedType = (options: PanelistsUpdatedOptions) => Promise<void>;

@Injectable({
  providedIn: 'root',
})
export class PanelistsUpdated {
  async panelistsUpdated({
    data,
    updatePanelists,
  }: PanelistsUpdatedOptions): Promise<void> {
    return sharedPanelistsUpdated({ data, updatePanelists });
  }
}
