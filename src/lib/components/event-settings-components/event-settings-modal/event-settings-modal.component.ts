// event-settings-modal.component.ts

import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import {
  ModifySettings,
  ModifySettingsOptions,
} from '../../../methods/settings-methods/modify-settings.service';
import { Socket } from 'socket.io-client';
import { ShowAlert } from '../../../@types/types';

export interface EventSettingsModalOptions {
  isEventSettingsModalVisible: boolean;
  onEventSettingsClose: () => void;
  onModifyEventSettings?: (options: ModifySettingsOptions) => Promise<void>;
  position?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
  backgroundColor?: string;
  audioSetting: string;
  videoSetting: string;
  screenshareSetting: string;
  chatSetting: string;
  updateAudioSetting: (setting: string) => void;
  updateVideoSetting: (setting: string) => void;
  updateScreenshareSetting: (setting: string) => void;
  updateChatSetting: (setting: string) => void;
  updateIsSettingsModalVisible: (isVisible: boolean) => void;
  roomName: string;
  socket: Socket;
  showAlert?: ShowAlert;
  overlayStyle?: Partial<CSSStyleDeclaration>;
  contentStyle?: Partial<CSSStyleDeclaration>;
  customTemplate?: any;
}

export type EventSettingsModalType = (options: EventSettingsModalOptions) => HTMLElement;

/**
 * EventSettingsModal - Modal for configuring room-wide event permissions (host only)
 * 
 * @component
 * @description
 * Provides host/admin controls for managing participant permissions: audio, video, screenshare, and chat.
 * Settings are saved to the room and enforced for all participants.
 * 
 * Supports three levels of customization:
 * 1. **Basic Usage**: Use default modal UI with permission toggles and save functionality
 * 2. **Style Customization**: Override modal appearance with overlayStyle and contentStyle
 * 3. **Full Override**: Provide a custom template via customTemplate for complete control
 * 
 * Key Features:
 * - Audio permission control (allow/disallow, allow but muted)
 * - Video permission control (allow/disallow, allow but off)
 * - Screenshare permission control (allow/disallow, allow certain roles)
 * - Chat permission control (allow/disallow, allow only host)
 * - Socket-based setting persistence
 * 
 * @example
 * Basic Usage:
 * ```html
 * <app-event-settings-modal
 *   [isEventSettingsModalVisible]="showEventSettings"
 *   [audioSetting]="currentAudioSetting"
 *   [videoSetting]="currentVideoSetting"
 *   [screenshareSetting]="currentScreenshareSetting"
 *   [chatSetting]="currentChatSetting"
 *   [roomName]="currentRoom"
 *   [socket]="socketInstance"
 *   [updateAudioSetting]="setAudioSetting"
 *   [updateVideoSetting]="setVideoSetting"
 *   [updateScreenshareSetting]="setScreenshareSetting"
 *   [updateChatSetting]="setChatSetting"
 *   [onEventSettingsClose]="closeEventSettings">
 * </app-event-settings-modal>
 * ```
 * 
 * @example
 * Style Customization:
 * ```html
 * <app-event-settings-modal
 *   [isEventSettingsModalVisible]="showEventSettings"
 *   [audioSetting]="currentAudioSetting"
 *   [videoSetting]="currentVideoSetting"
 *   [screenshareSetting]="currentScreenshareSetting"
 *   [chatSetting]="currentChatSetting"
 *   [roomName]="currentRoom"
 *   [socket]="socketInstance"
 *   [overlayStyle]="{
 *     backgroundColor: 'rgba(0, 0, 0, 0.8)'
 *   }"
 *   [contentStyle]="{
 *     backgroundColor: '#1e1e1e',
 *     borderRadius: '12px',
 *     padding: '25px'
 *   }"
 *   [backgroundColor]="'#2c3e50'"
 *   [position]="'center'"
 *   [onEventSettingsClose]="closeEventSettings">
 * </app-event-settings-modal>
 * ```
 * 
 * @example
 * Custom Template Override:
 * ```html
 * <app-event-settings-modal
 *   [isEventSettingsModalVisible]="showEventSettings"
 *   [customTemplate]="customSettingsTemplate"
 *   [onEventSettingsClose]="closeEventSettings">
 * </app-event-settings-modal>
 * 
 * <ng-template #customSettingsTemplate let-audioSetting="audioSetting" let-videoSetting="videoSetting" let-onSave="onSave">
 *   <div class="custom-settings">
 *     <h3>Room Permissions</h3>
 *     <label>
 *       Audio:
 *       <select [(ngModel)]="audioSetting">
 *         <option value="allow">Allow</option>
 *         <option value="disallow">Disallow</option>
 *       </select>
 *     </label>
 *     <label>
 *       Video:
 *       <select [(ngModel)]="videoSetting">
 *         <option value="allow">Allow</option>
 *         <option value="disallow">Disallow</option>
 *       </select>
 *     </label>
 *     <button (click)="onSave()">Save Settings</button>
 *   </div>
 * </ng-template>
 * ```
 * 
 * @selector app-event-settings-modal
 * @standalone true
 * @imports CommonModule, FontAwesomeModule, FormsModule
 * 
 * @input isEventSettingsModalVisible - Whether the modal is currently visible. Default: `false`
 * @input onEventSettingsClose - Callback function to close the modal. Default: `() => {}`
 * @input onModifyEventSettings - Callback to save modified settings. Default: `modifySettingsService.modifySettings`
 * @input position - Modal position on screen ('topLeft', 'topRight', 'bottomLeft', 'bottomRight'). Default: `'topRight'`
 * @input backgroundColor - Background color of the modal content. Default: `'#83c0e9'`
 * @input audioSetting - Current audio permission setting. Default: `''`
 * @input videoSetting - Current video permission setting. Default: `''`
 * @input screenshareSetting - Current screenshare permission setting. Default: `''`
 * @input chatSetting - Current chat permission setting. Default: `''`
 * @input updateAudioSetting - Function to update audio setting state. Default: `() => {}`
 * @input updateVideoSetting - Function to update video setting state. Default: `() => {}`
 * @input updateScreenshareSetting - Function to update screenshare setting state. Default: `() => {}`
 * @input updateChatSetting - Function to update chat setting state. Default: `() => {}`
 * @input updateIsSettingsModalVisible - Function to update modal visibility. Default: `() => {}`
 * @input roomName - Name of the room/session. Default: `''`
 * @input socket - Socket.io client instance for real-time communication. Default: `undefined`
 * @input showAlert - Optional alert function for displaying success/error messages. Default: `undefined`
 * @input overlayStyle - Custom CSS styles for the modal overlay backdrop. Default: `undefined`
 * @input contentStyle - Custom CSS styles for the modal content container. Default: `undefined`
 * @input customTemplate - Custom TemplateRef to completely replace default modal template. Default: `undefined`
 * 
 * @method ngOnInit - Initializes component and sets up default modify settings handler
 * @method ngOnChanges - Updates internal setting states when modal visibility changes
 * @method updateStatesFromParameters - Synchronizes internal states with input props
 * @method handleSaveSettings - Saves modified settings via socket and closes modal
 * @method closeModal - Closes the modal via onEventSettingsClose callback
 * @method getCombinedOverlayStyle - Merges default and custom overlay styles
 * @method getCombinedContentStyle - Merges default and custom content styles
 * @method getModalContentStyle - Returns computed content styles with positioning
 */

@Component({
    selector: 'app-event-settings-modal',
    imports: [CommonModule, FontAwesomeModule, FormsModule],
    templateUrl: './event-settings-modal.component.html',
    styleUrls: ['./event-settings-modal.component.css']
})
export class EventSettingsModal implements OnInit, OnChanges {
  @Input() isEventSettingsModalVisible = false;
  @Input() onEventSettingsClose!: () => void;
  @Input()
  onModifyEventSettings!: (options: ModifySettingsOptions) => Promise<void>;
  @Input() position = 'topRight';
  @Input() backgroundColor = '#83c0e9';
  @Input() audioSetting = '';
  @Input() videoSetting = '';
  @Input() screenshareSetting = '';
  @Input() chatSetting = '';
  @Input() updateAudioSetting!: (setting: string) => void;
  @Input() updateVideoSetting!: (setting: string) => void;
  @Input() updateScreenshareSetting!: (setting: string) => void;
  @Input() updateChatSetting!: (setting: string) => void;
  @Input() updateIsSettingsModalVisible!: (isVisible: boolean) => void;
  @Input() roomName = '';
  @Input() socket: Socket = {} as Socket;
  @Input() showAlert?: ShowAlert;
  @Input() overlayStyle?: Partial<CSSStyleDeclaration>;
  @Input() contentStyle?: Partial<CSSStyleDeclaration>;
  @Input() customTemplate?: any;

  audioState!: string;
  videoState!: string;
  screenshareState!: string;
  chatState!: string;

  faTimes = faTimes;

  constructor(private modifySettingsService: ModifySettings) {}

  ngOnInit() {
    if (!this.onModifyEventSettings) {
      this.onModifyEventSettings = this.modifySettingsService.modifySettings.bind(
        this.modifySettingsService,
      );
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isEventSettingsModalVisible']) {
      if (this.isEventSettingsModalVisible) {
        this.updateStatesFromParameters();
      }
    }
  }

  updateStatesFromParameters() {
    this.audioState = this.audioSetting;
    this.videoState = this.videoSetting;
    this.screenshareState = this.screenshareSetting;
    this.chatState = this.chatSetting;
  }

  getModalContentStyle() {
    const screenWidth = window.innerWidth;
    let modalWidth = 0.8 * screenWidth;
    if (modalWidth > 350) {
      modalWidth = 350;
    }

    return {
      backgroundColor: this.backgroundColor,
      borderRadius: '10px',
      padding: '10px',
      width: `${modalWidth}px`,
      maxHeight: '65%',
      overflowY: 'auto',
      top: this.position.includes('top') ? '10px' : 'auto',
      bottom: this.position.includes('bottom') ? '10px' : 'auto',
      left: this.position.includes('Left') ? '10px' : 'auto',
      right: this.position.includes('Right') ? '10px' : 'auto',
    };
  }

  async handleSaveSettings() {
    await this.onModifyEventSettings({
      audioSet: this.audioState,
      videoSet: this.videoState,
      screenshareSet: this.screenshareState,
      chatSet: this.chatState,
      updateAudioSetting: this.updateAudioSetting,
      updateVideoSetting: this.updateVideoSetting,
      updateScreenshareSetting: this.updateScreenshareSetting,
      updateChatSetting: this.updateChatSetting,
      updateIsSettingsModalVisible: this.updateIsSettingsModalVisible,
      roomName: this.roomName,
      socket: this.socket,
      showAlert: this.showAlert,
    });
  }

  closeModal() {
    this.onEventSettingsClose();
  }

  getCombinedOverlayStyle() {
    return {
      ...(this.overlayStyle || {})
    };
  }

  getCombinedContentStyle() {
    return {
      ...this.getModalContentStyle(),
      ...(this.contentStyle || {})
    };
  }
}
