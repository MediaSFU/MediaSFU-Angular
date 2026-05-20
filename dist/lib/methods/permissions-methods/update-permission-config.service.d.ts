import { Socket } from 'socket.io-client';
import { ShowAlert } from '../../@types/types';
import * as i0 from "@angular/core";
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
export declare class UpdatePermissionConfig {
    getDefaultPermissionConfig(): PermissionConfig;
    getPermissionConfigFromEventSettings(audioSetting?: string, videoSetting?: string, screenshareSetting?: string, chatSetting?: string): PermissionConfig;
    updatePermissionConfig({ socket, config, member, islevel, roomName, showAlert, }: UpdatePermissionConfigOptions): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UpdatePermissionConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UpdatePermissionConfig>;
}
