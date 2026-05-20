import { Injectable } from '@angular/core';
import { ShowAlert } from '../../@types/types';
import { addedAsPanelist as sharedAddedAsPanelist } from 'mediasfu-shared';

export interface AddedAsPanelistData {
  message: string;
}

export interface AddedAsPanelistOptions {
  data: AddedAsPanelistData;
  showAlert?: ShowAlert;
}

export type AddedAsPanelistType = (options: AddedAsPanelistOptions) => Promise<void>;

@Injectable({
  providedIn: 'root',
})
export class AddedAsPanelist {
  async addedAsPanelist({
    data,
    showAlert,
  }: AddedAsPanelistOptions): Promise<void> {
    return sharedAddedAsPanelist({ data, showAlert });
  }
}
