import { Component, Input, TemplateRef } from '@angular/core';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';

import { CustomButton, CustomButtons } from '../custom-buttons/custom-buttons.component';
import { MeetingIdComponent } from '../meeting-id-component/meeting-id-component.component';
import { MeetingPasscodeComponent } from '../meeting-passcode-component/meeting-passcode-component.component';
import { ShareButtonsComponent } from '../share-buttons-component/share-buttons-component.component';
import { EventType } from '../../../@types/types';

export interface MenuModalRenderContext {
  onClose: () => void;
}

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
  title?: string;
  overlayStyle?: Partial<CSSStyleDeclaration>;
  contentStyle?: Partial<CSSStyleDeclaration>;
  customTemplate?: TemplateRef<any>;
  overlayAttributes?: { [key: string]: any };
  contentAttributes?: { [key: string]: any };
  headerAttributes?: { [key: string]: any };
  titleWrapperAttributes?: { [key: string]: any };
  badgeWrapperAttributes?: { [key: string]: any };
  closeButtonAttributes?: { [key: string]: any };
  menuIconAttributes?: { [key: string]: any };
  closeIconAttributes?: { [key: string]: any };
  dividerAttributes?: { [key: string]: any };
  bodyAttributes?: { [key: string]: any };
  scrollWrapperAttributes?: { [key: string]: any };
  customButtonsWrapperAttributes?: { [key: string]: any };
  renderHeader?: TemplateRef<MenuModalRenderContext>;
  renderTitle?: TemplateRef<any>;
  renderCustomButtons?: TemplateRef<any>;
  renderMeetingPasscode?: TemplateRef<any>;
  renderMeetingId?: TemplateRef<any>;
  renderShareButtons?: TemplateRef<any>;
  renderBody?: TemplateRef<any>;
  renderContent?: TemplateRef<any>;

  onClose: () => void;
}

export type MenuModalType = (options: MenuModalOptions) => HTMLElement;

/**
 * MenuModal - Customizable menu modal with extensive override capabilities
 * 
 * @component
 * @selector app-menu-modal
 * @standalone true
 * @templateUrl ./menu-modal.component.html
 * @styleUrls ./menu-modal.component.css
 *
 * @description
 * A fully customizable menu modal supporting three levels of customization:
 * 1. **Style Overrides**: Customize overlay and content styles via `overlayStyle` and `contentStyle`
 * 2. **Template Sections**: Override specific sections using render* props (header, title, buttons, etc.)
 * 3. **Complete Replacement**: Provide a `customTemplate` to replace the entire modal UI
 *
 * @example
 * **Basic Usage with Default Template**
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
 *   (onClose)="closeMenu()">
 * </app-menu-modal>
 * ```
 *
 * @example
 * **Style Customization**
 * ```html
 * <app-menu-modal
 *   [isVisible]="true"
 *   [overlayStyle]="{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }"
 *   [contentStyle]="{ borderRadius: '20px', boxShadow: '0 10px 40px rgba(0,0,0,0.5)' }"
 *   roomName="Room 123"
 *   (onClose)="closeMenu()">
 * </app-menu-modal>
 * ```
 *
 * @example
 * **Custom Template (Complete Override)**
 * ```html
 * <app-menu-modal
 *   [isVisible]="true"
 *   [customTemplate]="customMenuTemplate"
 *   roomName="Room 123"
 *   (onClose)="closeMenu()">
 * </app-menu-modal>
 * 
 * <ng-template #customMenuTemplate let-context>
 *   <div class="my-custom-menu">
 *     <h2>{{ context.roomName }}</h2>
 *     <button (click)="context.onClose()">Close</button>
 *   </div>
 * </ng-template>
 * ```
 *
 * @example
 * **Section Override with renderTitle**
 * ```html
 * <app-menu-modal
 *   [isVisible]="true"
 *   [renderTitle]="customTitle"
 *   roomName="Room 123"
 *   (onClose)="closeMenu()">
 * </app-menu-modal>
 * 
 * <ng-template #customTitle let-context>
 *   <h1 class="custom-title">🎯 {{ context.title || 'Menu' }}</h1>
 * </ng-template>
 * ```
 *
 * @input {boolean} isVisible - Controls modal visibility
 * @input {string} backgroundColor - Background color of the modal content (default: '#83c0e9')
 * @input {string} position - Modal position: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' (default: 'bottomRight')
 * @input {string} roomName - Room name to display
 * @input {string} adminPasscode - Admin passcode for the room
 * @input {string} islevel - User level indicator
 * @input {EventType} eventType - Type of event (meeting, webinar, etc.)
 * @input {CustomButton[]} customButtons - Array of custom action buttons
 * @input {boolean} shareButtons - Show/hide share buttons (default: true)
 * @input {string} localLink - Local link for sharing
 * @input {string} title - Optional custom title
 * @input {Partial<CSSStyleDeclaration>} overlayStyle - Custom styles for modal overlay
 * @input {Partial<CSSStyleDeclaration>} contentStyle - Custom styles for modal content
 * @input {TemplateRef<any>} customTemplate - Complete template override
 * @input {TemplateRef<MenuModalRenderContext>} renderHeader - Custom header template
 * @input {TemplateRef<any>} renderTitle - Custom title template
 * @input {TemplateRef<any>} renderCustomButtons - Custom buttons section template
 * @input {TemplateRef<any>} renderMeetingPasscode - Custom meeting passcode template
 * @input {TemplateRef<any>} renderMeetingId - Custom meeting ID template
 * @input {TemplateRef<any>} renderShareButtons - Custom share buttons template
 * @input {TemplateRef<any>} renderBody - Custom body template
 * @input {TemplateRef<any>} renderContent - Custom content template
 * @output {void} onClose - Event emitted when modal is closed
 *
 * @see {@link MenuModalOptions} for complete options interface
 */


@Component({
    selector: 'app-menu-modal',
    templateUrl: './menu-modal.component.html',
    styleUrls: ['./menu-modal.component.css'],
    imports: [
        CommonModule,
        FontAwesomeModule,
        FormsModule,
        CustomButtons,
        MeetingIdComponent,
        MeetingPasscodeComponent,
        ShareButtonsComponent,
    ]
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
  @Input() localLink!: string;
  @Input() title?: string;
  @Input() overlayStyle?: Partial<CSSStyleDeclaration>;
  @Input() contentStyle?: Partial<CSSStyleDeclaration>;
  @Input() customTemplate?: TemplateRef<any>;
  @Input() overlayAttributes?: { [key: string]: any };
  @Input() contentAttributes?: { [key: string]: any };
  @Input() headerAttributes?: { [key: string]: any };
  @Input() titleWrapperAttributes?: { [key: string]: any };
  @Input() badgeWrapperAttributes?: { [key: string]: any };
  @Input() closeButtonAttributes?: { [key: string]: any };
  @Input() menuIconAttributes?: { [key: string]: any };
  @Input() closeIconAttributes?: { [key: string]: any };
  @Input() dividerAttributes?: { [key: string]: any };
  @Input() bodyAttributes?: { [key: string]: any };
  @Input() scrollWrapperAttributes?: { [key: string]: any };
  @Input() customButtonsWrapperAttributes?: { [key: string]: any };
  @Input() renderHeader?: TemplateRef<MenuModalRenderContext>;
  @Input() renderTitle?: TemplateRef<any>;
  @Input() renderCustomButtons?: TemplateRef<any>;
  @Input() renderMeetingPasscode?: TemplateRef<any>;
  @Input() renderMeetingId?: TemplateRef<any>;
  @Input() renderShareButtons?: TemplateRef<any>;
  @Input() renderBody?: TemplateRef<any>;
  @Input() renderContent?: TemplateRef<any>;
  // Define inputs for functions
  @Input() onClose!: () => void;

  get renderContext(): MenuModalRenderContext {
    return {
      onClose: this.onClose,
    };
  }

  getTitle(): string {
    return this.title || 'Menu';
  }

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

  getCombinedContentStyle() {
    return {
      ...this.modalContentStyle(),
      ...this.contentStyle,
    };
  }

  handleClose() {
    this.onClose();
  }
}
