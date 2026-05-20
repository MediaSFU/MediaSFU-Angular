import { Injectable } from '@angular/core';
import { Socket } from 'socket.io-client';
import { ShowAlert } from '../../@types/types';
import { updatePermissionConfig as sharedUpdatePermissionConfig } from 'mediasfu-shared';
import type { UpdatePermissionConfigOptions as SharedUpdatePermissionConfigOptions } from 'mediasfu-shared';

export interface PermissionCapabilities {
  useMic: 'allow' | 'approval' | 'disallow';
  useCamera: 'allow' | 'approval' | 'disallow';
  useScreen: 'allow' | 'approval' | 'disallow';
  useChat: 'allow' | 'disallow';
}

export interface PermissionConfig {
  level0: PermissionCapabilities;
  level1: PermissionCapabilities;
}

export interface UpdatePermissionConfigOptions {
  socket: Socket;
  config: PermissionConfig;
  member: string;
  islevel: string;
  roomName: string;
  showAlert?: ShowAlert;
}

export type UpdatePermissionConfigType = (options: UpdatePermissionConfigOptions) => Promise<void>;

@Injectable({
  providedIn: 'root',
})
export class UpdatePermissionConfig {
  
  getDefaultPermissionConfig(): PermissionConfig {
    return {
      level0: {
        useMic: 'approval',
        useCamera: 'approval',
        useScreen: 'disallow',
        useChat: 'allow',
      },
      level1: {
        useMic: 'allow',
        useCamera: 'allow',
        useScreen: 'approval',
        useChat: 'allow',
      },
    };
  }

  getPermissionConfigFromEventSettings(
    audioSetting: string = 'approval',
    videoSetting: string = 'approval',
    screenshareSetting: string = 'disallow',
    chatSetting: string = 'allow'
  ): PermissionConfig {
    const capabilities: PermissionCapabilities = {
      useMic: audioSetting as 'allow' | 'approval' | 'disallow',
      useCamera: videoSetting as 'allow' | 'approval' | 'disallow',
      useScreen: screenshareSetting as 'allow' | 'approval' | 'disallow',
      useChat: (chatSetting === 'allow' ? 'allow' : 'disallow') as 'allow' | 'disallow',
    };
    return {
      level0: { ...capabilities },
      level1: { ...capabilities },
    };
  }

  async updatePermissionConfig({
    socket,
    config,
    member,
    islevel,
    roomName,
    showAlert,
  }: UpdatePermissionConfigOptions): Promise<void> {
    await sharedUpdatePermissionConfig({
      socket,
      config,
      member,
      islevel,
      roomName,
      showAlert,
    } as unknown as SharedUpdatePermissionConfigOptions);
  }
}
