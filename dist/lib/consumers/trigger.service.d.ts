import { Socket } from 'socket.io-client';
import { Participant, AutoAdjustType, ScreenState, EventType } from '../@types/types';
import * as i0 from "@angular/core";
export interface TriggerParameters {
    socket: Socket;
    localSocket?: Socket;
    roomName: string;
    screenStates: ScreenState[];
    participants: Participant[];
    updateDateState?: number | null;
    lastUpdate: number | null;
    nForReadjust: number;
    eventType: EventType;
    shared: boolean;
    shareScreenStarted: boolean;
    whiteboardStarted: boolean;
    whiteboardEnded: boolean;
    updateUpdateDateState: (timestamp: number | null) => void;
    updateLastUpdate: (lastUpdate: number | null) => void;
    updateNForReadjust: (nForReadjust: number) => void;
    autoAdjust: AutoAdjustType;
    getUpdatedAllParams: () => TriggerParameters;
    [key: string]: any;
}
export interface TriggerOptions {
    ref_ActiveNames: string[];
    parameters: TriggerParameters;
}
export type TriggerType = (options: TriggerOptions) => Promise<void>;
export declare class Trigger {
    trigger({ ref_ActiveNames, parameters }: TriggerOptions): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<Trigger, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<Trigger>;
}
