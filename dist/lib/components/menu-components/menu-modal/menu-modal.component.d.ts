import { CustomButton } from '../custom-buttons/custom-buttons.component';
import { EventType } from '../../../@types/types';
import * as i0 from "@angular/core";
export interface MenuModalOptions {
    backgroundColor?: string;
    isVisible: boolean;
    customButtons?: CustomButton[];
    shareButtons?: boolean;
    position?: string;
    roomName: string;
    adminPasscode: string;
    islevel: string;
    eventType: EventType;
    localLink?: string;
    onClose: () => void;
}
export type MenuModalType = (options: MenuModalOptions) => HTMLElement;
/**
 * Component for displaying a customizable menu modal with various options.
 *
 * @selector app-menu-modal
 * @standalone true
 * @templateUrl ./menu-modal.component.html
 * @styleUrls ./menu-modal.component.css
 *
 * @example
 * ```html
 * <app-menu-modal
 *   [isVisible]="true"
 *   backgroundColor="#83c0e9"
 *   roomName="Room 123"
 *   adminPasscode="AdminPass"
 *   [customButtons]="customButtons"
 *   [shareButtons]="true"
 *   position="bottomRight"
 *   islevel="2"
 *   eventType="meeting"
 *   localLink="https://www.google.com"
 *   (onClose)="closeMenu()"
 * ></app-menu-modal>
 * ```
 *
 * ```typescript
 * const customButtons = [
 *   { action: () => console.log('Clicked'), show: true, text: 'Button' },
 * ];
 * closeMenu() { console.log('Menu closed'); }
 * ```
 */
export declare class MenuModal {
    backgroundColor: string;
    isVisible: boolean;
    customButtons: CustomButton[];
    shareButtons: boolean;
    position: string;
    roomName: string;
    adminPasscode: string;
    islevel: string;
    eventType: EventType;
    localLink: string;
    onClose: () => void;
    faBars: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faTimes: import("@fortawesome/fontawesome-common-types").IconDefinition;
    modalContainerStyle(): {
        position: string;
        top: number;
        left: number;
        width: string;
        height: string;
        backgroundColor: string;
        display: string;
        zIndex: number;
    };
    modalContentStyle(): {
        backgroundColor: string;
        borderRadius: string;
        padding: string;
        width: string;
        maxHeight: string;
        overflowY: string;
        top: string;
        bottom: string;
        left: string;
        right: string;
    };
    handleClose(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MenuModal, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MenuModal, "app-menu-modal", never, { "backgroundColor": { "alias": "backgroundColor"; "required": false; }; "isVisible": { "alias": "isVisible"; "required": false; }; "customButtons": { "alias": "customButtons"; "required": false; }; "shareButtons": { "alias": "shareButtons"; "required": false; }; "position": { "alias": "position"; "required": false; }; "roomName": { "alias": "roomName"; "required": false; }; "adminPasscode": { "alias": "adminPasscode"; "required": false; }; "islevel": { "alias": "islevel"; "required": false; }; "eventType": { "alias": "eventType"; "required": false; }; "localLink": { "alias": "localLink"; "required": false; }; "onClose": { "alias": "onClose"; "required": false; }; }, {}, never, never, true, never>;
}
