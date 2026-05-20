import { Injectable } from '@angular/core';
import { PermissionConfig } from '../../methods/permissions-methods/update-permission-config.service';
import { permissionConfigUpdated as sharedPermissionConfigUpdated } from 'mediasfu-shared';

export interface PermissionConfigUpdatedData {
  config: PermissionConfig;
}

export interface PermissionConfigUpdatedOptions {
  data: PermissionConfigUpdatedData;
  updatePermissionConfig?: (config: PermissionConfig) => void;
}

export type PermissionConfigUpdatedType = (options: PermissionConfigUpdatedOptions) => Promise<void>;

@Injectable({
  providedIn: 'root',
})
export class PermissionConfigUpdated {
  async permissionConfigUpdated({
    data,
    updatePermissionConfig,
  }: PermissionConfigUpdatedOptions): Promise<void> {
    return sharedPermissionConfigUpdated({ data, updatePermissionConfig });
  }
}
