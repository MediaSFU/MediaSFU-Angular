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
/**
 * Triggers an update to the screen client based on the provided parameters.
 *
 * This function handles various conditions to determine the main screen person,
 * adjusts the screen states, and emits an update to the screen client via socket.
 *
 * @param {TriggerOptions} options - The options for triggering the update.
 * @param {string[]} options.ref_ActiveNames - Reference to the active names.
 * @param {TriggerParameters} options.parameters - The parameters for the trigger.
 * @returns {Promise<void>} A promise that resolves when the trigger is complete.
 *
 * @throws Will throw an error if the updateScreenClient operation fails.
 *
 * @example
 * ```typescript
 * await trigger({
 *   ref_ActiveNames: ["user1", "user2"],
 *   parameters: {
 *     socket: socketInstance,
 *     localSocket: socketInstance,
 *     roomName: "room1",
 *     screenStates: [{ mainScreenPerson: "user1", mainScreenFilled: true, adminOnMainScreen: false }],
 *     participants: [{ name: "admin", islevel: "2" }],
 *     updateDateState: 0,
 *     lastUpdate: null,
 *     nForReadjust: 0,
 *     eventType: "conference",
 *     shared: false,
 *     shareScreenStarted: false,
 *     whiteboardStarted: false,
 *     whiteboardEnded: false,
 *     updateUpdateDateState: (date) => {},
 *     updateLastUpdate: (date) => {},
 *     updateNForReadjust: (n) => {},
 *     autoAdjust: async ({ n, parameters }) => [n, 0],
 *   },
 * });
 * ```
 */
export declare class Trigger {
    /**
     * Triggers an update to the screen client based on the provided parameters.
     *
     * @param {TriggerOptions} options - The options for triggering the update.
     * @param {string[]} options.ref_ActiveNames - Reference to the active names.
     * @param {Parameters} options.parameters - The parameters for the trigger.
     * @returns {Promise<void>} A promise that resolves when the trigger is complete.
     *
     * @throws Will throw an error if the updateScreenClient operation fails.
     *
     * @remarks
     * This function handles various conditions to determine the main screen person,
     * adjusts the screen states, and emits an update to the screen client via socket.
     *
     * @example
     * ```typescript
     * await trigger({
     *   ref_ActiveNames: ["user1", "user2"],
     *   parameters: {
     *     socket: socketInstance,
     *     localSocket: socketInstance,
     *     roomName: "room1",
     *     screenStates: [{ mainScreenPerson: "user1", mainScreenFilled: true, adminOnMainScreen: false }],
     *     participants: [{ name: "admin", islevel: "2" }],
     *     updateDateState: 0,
     *     lastUpdate: null,
     *     nForReadjust: 0,
     *     eventType: "conference",
     *     shared: false,
     *     shareScreenStarted: false,
     *     whiteboardStarted: false,
     *     whiteboardEnded: false,
     *     updateUpdateDateState: (date) => {},
     *     updateLastUpdate: (date) => {},
     *     updateNForReadjust: (n) => {},
     *     autoAdjust: async ({ n, parameters }) => [n, 0],
     *   },
     * });
     * ```
     */
    trigger({ ref_ActiveNames, parameters }: TriggerOptions): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<Trigger, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<Trigger>;
}
