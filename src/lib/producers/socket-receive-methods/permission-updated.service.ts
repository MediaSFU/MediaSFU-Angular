import { Injectable } from '@angular/core';
import { ShowAlert } from '../../@types/types';
import { permissionUpdated as sharedPermissionUpdated } from 'mediasfu-shared';

export interface PermissionUpdatedData {
  newLevel: string;
  message?: string;
}

export interface PermissionUpdatedOptions {
  data: PermissionUpdatedData;
  showAlert?: ShowAlert;
  updateIslevel?: (level: string) => void;
}

export type PermissionUpdatedType = (options: PermissionUpdatedOptions) => Promise<void>;

@Injectable({
  providedIn: 'root',
})
export class PermissionUpdated {
  async permissionUpdated({
    data,
    showAlert,
    updateIslevel,
  }: PermissionUpdatedOptions): Promise<void> {
    return sharedPermissionUpdated({ data, showAlert, updateIslevel });
  }
}
