import * as i0 from "@angular/core";
export interface LaunchMessagesOptions {
    updateIsMessagesModalVisible: (visible: boolean) => void;
    isMessagesModalVisible: boolean;
}
export type LaunchMessagesType = (options: LaunchMessagesOptions) => void;
export declare class LaunchMessages {
    /**
     * Toggles the visibility state of the messages modal.
     * If the modal is currently visible, it will be closed. If it's hidden, it will be opened.
     *
     * @param updateIsMessagesModalVisible - Function to update the visibility state of the messages modal.
     * @param isMessagesModalVisible - Current visibility state of the messages modal.
     */
    launchMessages({ updateIsMessagesModalVisible, isMessagesModalVisible, }: LaunchMessagesOptions): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<LaunchMessages, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<LaunchMessages>;
}
