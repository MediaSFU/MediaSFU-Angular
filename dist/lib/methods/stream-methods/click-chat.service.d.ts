import { ShowAlert } from '../../@types/types';
import * as i0 from "@angular/core";
export interface ClickChatOptions {
    isMessagesModalVisible: boolean;
    updateIsMessagesModalVisible: (isVisible: boolean) => void;
    chatSetting: string;
    islevel: string;
    showAlert?: ShowAlert;
}
export type ClickChatType = (options: ClickChatOptions) => Promise<void>;
/**
 * Toggles the visibility of the chat modal based on the current state and event settings.
 *
 * @param {ClickChatOptions} options - The options for the clickChat function.
 * @param {boolean} options.isMessagesModalVisible - Indicates if the messages modal is currently visible.
 * @param {Function} options.updateIsMessagesModalVisible - Function to update the visibility state of the messages modal.
 * @param {string} options.chatSetting - The chat setting for the event, which can be "allow" or other values.
 * @param {string} options.islevel - The participant's level, where "2" indicates a level that allows chat.
 * @param {Function} [options.showAlert] - Optional function to show an alert message.
 *
 * @returns {Promise<void>} A promise that resolves when the operation is complete.
 *
 * @remarks
 * This function checks the current visibility state of the messages modal. If it is already visible, it will hide the modal.
 * If it is not visible, it checks the chat settings and the participant's level to determine whether to show an alert
 * indicating that chat is disabled or to display the chat modal.
 *
 * @example
 * ```typescript
 * const options: ClickChatOptions = {
 *   isMessagesModalVisible: false,
 *   updateIsMessagesModalVisible: (visible) => console.log(`Modal is now ${visible ? 'visible' : 'hidden'}`),
 *   chatSetting: 'allow',
 *   islevel: '1',
 *   showAlert: (alert) => console.log(`Alert: ${alert.message}`),
 * };
 *
 * const clickChatService = new ClickChat();
 * await clickChatService.clickChat(options);
 * ```
 */
export declare class ClickChat {
    /**
     * Toggles the visibility of the chat modal based on the current state and event settings.
     *
     * @param {Object} options - The options for the clickChat function.
     * @param {boolean} options.isMessagesModalVisible - Indicates if the messages modal is currently visible.
     * @param {Function} options.updateIsMessagesModalVisible - Function to update the visibility state of the messages modal.
     * @param {string} options.chatSetting - The chat setting for the event, which can be "allow" or other values.
     * @param {string} options.islevel - The participant's level, where "2" indicates a level that allows chat.
     * @param {Function} [options.showAlert] - Optional function to show an alert message.
     *
     * @returns {Promise<void>} A promise that resolves when the operation is complete.
     */
    clickChat({ isMessagesModalVisible, updateIsMessagesModalVisible, chatSetting, islevel, showAlert, }: ClickChatOptions): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ClickChat, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ClickChat>;
}
