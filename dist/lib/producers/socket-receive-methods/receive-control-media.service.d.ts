import { ShowAlert } from '../../@types/types';
import * as i0 from "@angular/core";
export interface ControlMediaData {
    type: 'audio' | 'video';
    action: 'mute' | 'unmute';
    reason?: string;
}
export interface ReceiveControlMediaOptions {
    data: ControlMediaData;
    showAlert?: ShowAlert;
    clickAudio?: () => void;
    clickVideo?: () => void;
    audioAlreadyOn?: boolean;
    videoAlreadyOn?: boolean;
}
export type ReceiveControlMediaType = (options: ReceiveControlMediaOptions) => Promise<void>;
export declare class ReceiveControlMedia {
    receiveControlMedia({ data, showAlert, clickAudio, clickVideo, audioAlreadyOn, videoAlreadyOn, }: ReceiveControlMediaOptions): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ReceiveControlMedia, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ReceiveControlMedia>;
}
