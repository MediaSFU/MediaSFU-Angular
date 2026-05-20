import { Injectable } from '@angular/core';
import { ShowAlert } from '../../@types/types';
import { removedFromPanelists as sharedRemovedFromPanelists } from 'mediasfu-shared';

export interface RemovedFromPanelistsData {
  message: string;
}

export interface RemovedFromPanelistsOptions {
  data: RemovedFromPanelistsData;
  showAlert?: ShowAlert;
}

export type RemovedFromPanelistsType = (options: RemovedFromPanelistsOptions) => Promise<void>;

@Injectable({
  providedIn: 'root',
})
export class RemovedFromPanelists {
  async removedFromPanelists({
    data,
    showAlert,
  }: RemovedFromPanelistsOptions): Promise<void> {
    return sharedRemovedFromPanelists({ data, showAlert });
  }
}
