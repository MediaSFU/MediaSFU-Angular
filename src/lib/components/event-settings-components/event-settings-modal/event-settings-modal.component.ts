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
}

export type EventSettingsModalType = (options: EventSettingsModalOptions) => HTMLElement;

/**
 * EventSettingsModal component provides a modal interface to manage and update event settings like audio, video, screenshare, and chat settings.
 *
 * @component
 * @selector app-event-settings-modal
 * @standalone true
 * @imports [CommonModule, FontAwesomeModule, FormsModule]
 *
 * @example
 * ```html
 * <app-event-settings-modal
 *   [isEventSettingsModalVisible]="true"
 *   [onEventSettingsClose]="closeModal"
 *   [onModifyEventSettings]="saveSettings"
 *   [audioSetting]="audio"
 *   [videoSetting]="video"
 *   [screenshareSetting]="screenshare"
 *   [chatSetting]="chat"
 *   [position]="'topRight'"
 *   [backgroundColor]="'#83c0e9'"
 * ></app-event-settings-modal>
 * ```
 *
 * @input {boolean} isEventSettingsModalVisible - Indicates if the event settings modal is visible.
 * @input {() => void} onEventSettingsClose - Callback to close the modal.
 * @input {(options: ModifySettingsOptions) => Promise<void>} onModifyEventSettings - Callback to handle event settings modifications.
 * @input {string} position - Position of the modal on the screen, default is 'topRight'.
 * @input {string} backgroundColor - Background color of the modal, default is '#83c0e9'.
 * @input {string} audioSetting - Current audio setting.
 * @input {string} videoSetting - Current video setting.
 * @input {string} screenshareSetting - Current screenshare setting.
 * @input {string} chatSetting - Current chat setting.
 * @input {(setting: string) => void} updateAudioSetting - Function to update audio setting.
 * @input {(setting: string) => void} updateVideoSetting - Function to update video setting.
 * @input {(setting: string) => void} updateScreenshareSetting - Function to update screenshare setting.
 * @input {(setting: string) => void} updateChatSetting - Function to update chat setting.
 * @input {(isVisible: boolean) => void} updateIsSettingsModalVisible - Function to update modal visibility.
 * @input {string} roomName - Room name associated with the settings.
 * @input {Socket} socket - Socket for real-time communication.
 * @input {ShowAlert} [showAlert] - Optional alert function.
 *
 * @property {string} audioState - Internal state for audio setting.
 * @property {string} videoState - Internal state for video setting.
 * @property {string} screenshareState - Internal state for screenshare setting.
 * @property {string} chatState - Internal state for chat setting.
 * @property {IconDefinition} faTimes - FontAwesome icon for the close button.
 *
 * @constructor
 * @param {ModifySettings} modifySettingsService - Service for modifying settings.
 *
 * @method ngOnInit - Initializes the component and binds the settings modification service.
 * @method ngOnChanges - Updates internal states when `isEventSettingsModalVisible` changes.
 * @param {SimpleChanges} changes - Object containing previous and current values of bound properties.
 *
 * @method updateStatesFromParameters - Sets internal state variables based on input parameters.
 * @method getModalContentStyle - Returns style object for modal content with dynamic positioning and size.
 * @returns {Object} Style object for modal content.
 *
 * @method handleSaveSettings - Invokes the settings modification function with updated values.
 * @returns {Promise<void>} Promise that resolves after saving settings.
 *
 * @method closeModal - Closes the modal.
 */

@Component({
  selector: 'app-event-settings-modal',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, FormsModule],
  templateUrl: './event-settings-modal.component.html',
  styleUrls: ['./event-settings-modal.component.css'],
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
}
