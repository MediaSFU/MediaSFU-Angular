import { Component, Input, OnInit, OnChanges, SimpleChanges, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes, faUserTie, faEye, faEyeSlash, faCheck, faMicrophone, faMicrophoneSlash, faVideo, faVideoSlash, faStar, faMinus, faUsers, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Participant, ShowAlert } from '../../../@types/types';
import { Socket } from 'socket.io-client';
import { AddPanelist } from '../../../methods/panelists-methods/add-panelist.service';
import { RemovePanelist } from '../../../methods/panelists-methods/remove-panelist.service';
import { FocusPanelists } from '../../../methods/panelists-methods/focus-panelists.service';

export interface PanelistsModalParameters {
  participants: Participant[];
  panelists: Participant[];
  member: string;
  islevel: string;
  socket: Socket;
  roomName: string;
  showAlert?: ShowAlert;
  itemPageLimit: number;
  panelistsFocused?: boolean;
  updatePanelists?: (panelists: Participant[]) => void;
  updatePanelistsFocused?: (focused: boolean) => void;
  getUpdatedAllParams: () => PanelistsModalParameters;
}

export interface PanelistsModalOptions {
  isPanelistsModalVisible: boolean;
  onPanelistsClose: () => void;
  parameters: PanelistsModalParameters;
  backgroundColor?: string;
  position?: string;
}

@Component({
  selector: 'app-panelists-modal',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './panelists-modal.component.html',
  styleUrls: ['./panelists-modal.component.css'],
})
export class PanelistsModalComponent implements OnInit, OnChanges {
  @Input() isPanelistsModalVisible = false;
  @Input() onPanelistsClose!: () => void;
  @Input() parameters: PanelistsModalParameters = {} as PanelistsModalParameters;
  @Input() backgroundColor = '#1e293b';
  @Input() position = 'center';

  // FontAwesome Icons
  faTimes = faTimes;
  faUserTie = faUserTie;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faCheck = faCheck;
  faMicrophone = faMicrophone;
  faMicrophoneSlash = faMicrophoneSlash;
  faVideo = faVideo;
  faVideoSlash = faVideoSlash;
  faStar = faStar;
  faMinus = faMinus;
  faUsers = faUsers;
  faSearch = faSearch;
  faPlus = faPlus;

  // Local State
  searchFilter = '';
  localPanelists: Participant[] = [];
  isFocused = false;
  muteOthersMic = false;
  muteOthersCamera = false;
  participantsState: Participant[] = [];
  availableParticipants: Participant[] = [];
  isHost = false;

  constructor(
    private addPanelistService: AddPanelist,
    private removePanelistService: RemovePanelist,
    private focusPanelistsService: FocusPanelists
  ) {}

  ngOnInit() {
    this.updateStateFromParams();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['parameters'] || changes['isPanelistsModalVisible']) {
      this.updateStateFromParams();
    }
  }

  updateStateFromParams() {
    if (this.isPanelistsModalVisible && this.parameters.getUpdatedAllParams) {
      const freshParams = this.parameters.getUpdatedAllParams();
      this.participantsState = freshParams.participants || [];
      if (freshParams.panelists) {
        this.localPanelists = [...freshParams.panelists];
      }
      if (freshParams.panelistsFocused !== undefined) {
        this.isFocused = freshParams.panelistsFocused;
      }
      this.isHost = freshParams.islevel === '2';
      this.updateAvailableParticipants();
    }
  }

  handleSearch(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.searchFilter = inputElement.value;
    this.updateAvailableParticipants();
  }

  updateAvailableParticipants() {
    this.availableParticipants = this.participantsState
      .filter((p) => !this.localPanelists.some((lp) => lp.name === p.name) && p.islevel !== '2')
      .filter((p) =>
        this.searchFilter ? p.name.toLowerCase().includes(this.searchFilter.toLowerCase()) : true
      );
  }

  async handleAddPanelist(participant: Participant) {
    const success = await this.addPanelistService.addPanelist({
      socket: this.parameters.socket,
      participant,
      currentPanelists: this.localPanelists,
      maxPanelists: this.parameters.itemPageLimit,
      roomName: this.parameters.roomName,
      member: this.parameters.member,
      islevel: this.parameters.islevel,
      showAlert: this.parameters.showAlert,
    });

    if (success) {
      this.localPanelists = [...this.localPanelists, participant];
      this.parameters.updatePanelists?.(this.localPanelists);
      this.updateAvailableParticipants();
    }
  }

  async handleRemovePanelist(participant: Participant) {
    await this.removePanelistService.removePanelist({
      socket: this.parameters.socket,
      participant,
      roomName: this.parameters.roomName,
      member: this.parameters.member,
      islevel: this.parameters.islevel,
      showAlert: this.parameters.showAlert,
    });

    this.localPanelists = this.localPanelists.filter((p) => p.name !== participant.name);
    this.parameters.updatePanelists?.(this.localPanelists);
    this.updateAvailableParticipants();
  }

  async handleToggleFocus() {
    const newFocused = !this.isFocused;

    await this.focusPanelistsService.focusPanelists({
      socket: this.parameters.socket,
      roomName: this.parameters.roomName,
      member: this.parameters.member,
      islevel: this.parameters.islevel,
      focusEnabled: newFocused,
      muteOthersMic: newFocused ? this.muteOthersMic : false,
      muteOthersCamera: newFocused ? this.muteOthersCamera : false,
      showAlert: this.parameters.showAlert,
    });

    this.isFocused = newFocused;
    this.parameters.updatePanelistsFocused?.(newFocused);
  }

  toggleMuteOthersMic() {
    this.muteOthersMic = !this.muteOthersMic;
  }

  toggleMuteOthersCamera() {
    this.muteOthersCamera = !this.muteOthersCamera;
  }
}
