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
 * Component for managing event settings modal.
 *
 * @selector app-event-settings-modal
 * @standalone true
 * @imports CommonModule, FontAwesomeModule, FormsModule
 * @templateUrl ./event-settings-modal.component.html
 * @styleUrls ./event-settings-modal.component.css
 *
 * @class EventSettingsModal
 * @implements OnInit, OnChanges
 *
 * @property {boolean} isEventSettingsModalVisible - Indicates if the event settings modal is visible.
 * @property {() => void} onEventSettingsClose - Callback function to close the event settings modal.
 * @property {(options: ModifySettingsOptions) => Promise<void>} onModifyEventSettings - Callback function to modify event settings.
 * @property {string} position - Position of the modal on the screen.
 * @property {string} backgroundColor - Background color of the modal.
 * @property {string} audioSetting - Current audio setting.
 * @property {string} videoSetting - Current video setting.
 * @property {string} screenshareSetting - Current screenshare setting.
 * @property {string} chatSetting - Current chat setting.
 * @property {(setting: string) => void} updateAudioSetting - Callback function to update audio setting.
 * @property {(setting: string) => void} updateVideoSetting - Callback function to update video setting.
 * @property {(setting: string) => void} updateScreenshareSetting - Callback function to update screenshare setting.
 * @property {(setting: string) => void} updateChatSetting - Callback function to update chat setting.
 * @property {(isVisible: boolean) => void} updateIsSettingsModalVisible - Callback function to update modal visibility.
 * @property {string} roomName - Name of the room.
 * @property {Socket} socket - Socket instance for communication.
 * @property {ShowAlert} [showAlert] - Optional alert function.
 *
 * @property {string} audioState - State of the audio setting.
 * @property {string} videoState - State of the video setting.
 * @property {string} screenshareState - State of the screenshare setting.
 * @property {string} chatState - State of the chat setting.
 *
 * @property {IconDefinition} faTimes - FontAwesome icon for close button.
 *
 * @constructor
 * @param {ModifySettings} modifySettingsService - Service for modifying settings.
 *
 * @method ngOnInit - Lifecycle hook that is called after data-bound properties are initialized.
 * @method ngOnChanges - Lifecycle hook that is called when any data-bound property changes.
 * @param {SimpleChanges} changes - Object of current and previous property values.
 *
 * @method updateStatesFromParameters - Updates the state variables from the input parameters.
 *
 * @method getModalContentStyle - Returns the style object for the modal content.
 * @returns {Object} Style object for the modal content.
 *
 * @method handleSaveSettings - Handles the save settings action.
 * @returns {Promise<void>} Promise that resolves when settings are saved.
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
