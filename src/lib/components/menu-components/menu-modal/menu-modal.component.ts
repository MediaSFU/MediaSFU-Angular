import { Component, Input } from '@angular/core';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';

import { CustomButton, CustomButtons } from '../custom-buttons/custom-buttons.component';
import { MeetingIdComponent } from '../meeting-id-component/meeting-id-component.component';
import { MeetingPasscodeComponent } from '../meeting-passcode-component/meeting-passcode-component.component';
import { ShareButtonsComponent } from '../share-buttons-component/share-buttons-component.component';
import { EventType } from '../../../@types/types';

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


@Component({
  selector: 'app-menu-modal',
  templateUrl: './menu-modal.component.html',
  styleUrls: ['./menu-modal.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    CustomButtons,
    MeetingIdComponent,
    MeetingPasscodeComponent,
    ShareButtonsComponent,
  ],
})
export class MenuModal {
  @Input() backgroundColor = '#83c0e9';
  @Input() isVisible!: boolean;
  @Input() customButtons: CustomButton[] = [];
  @Input() shareButtons = true;
  @Input() position = 'bottomRight';
  @Input() roomName!: string;
  @Input() adminPasscode!: string;
  @Input() islevel!: string;
  @Input() eventType!: EventType;
  // Define inputs for functions
  @Input() onClose!: () => void;

  faBars = faBars;
  faTimes = faTimes;

  modalContainerStyle() {
    return {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: this.isVisible ? 'block' : 'none',
      zIndex: 999,
    };
  }

  modalContentStyle() {
    const screenWidth = window.innerWidth;
    let modalWidth = 0.7 * screenWidth;

    if (modalWidth > 400) {
      modalWidth = 400;
    }

    return {
      backgroundColor: this.backgroundColor,
      borderRadius: '10px',
      padding: '5px',
      width: `${modalWidth}px`,
      maxHeight: '80%',
      overflowY: 'auto',
      top: this.position.includes('top') ? '10px' : 'auto',
      bottom: this.position.includes('bottom') ? '10px' : 'auto',
      left: this.position.includes('Left') ? '10px' : 'auto',
      right: this.position.includes('Right') ? '10px' : 'auto',
    };
  }

  handleClose() {
    this.onClose();
  }
}
