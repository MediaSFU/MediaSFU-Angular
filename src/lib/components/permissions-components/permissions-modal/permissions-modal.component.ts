import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faTimes,
  faUserShield,
  faUsers,
  faCog,
  faChevronUp,
  faChevronDown,
  faCheck,
  faClock,
  faBan,
  faMicrophone,
  faVideo,
  faDesktop,
  faComment
} from '@fortawesome/free-solid-svg-icons';
import { Participant, ShowAlert } from '../../../@types/types';
import { Socket } from 'socket.io-client';
import { UpdateParticipantPermission, PermissionLevel } from '../../../methods/permissions-methods/update-participant-permission.service';
import { BulkUpdateParticipantPermissions } from '../../../methods/permissions-methods/bulk-update-participant-permissions.service';
import { UpdatePermissionConfig, PermissionConfig, PermissionCapabilities } from '../../../methods/permissions-methods/update-permission-config.service';

export interface PermissionsModalParameters {
  participants: Participant[];
  member: string;
  islevel: string;
  socket: Socket;
  roomName: string;
  showAlert?: ShowAlert;
  permissionConfig?: PermissionConfig;
  updatePermissionConfig?: (config: PermissionConfig) => void;
  getUpdatedAllParams: () => PermissionsModalParameters;
  audioSetting?: string;
  videoSetting?: string;
  screenshareSetting?: string;
  chatSetting?: string;
}

type PermissionValue = PermissionCapabilities[keyof PermissionCapabilities];

@Component({
  selector: 'app-permissions-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './permissions-modal.component.html',
  styleUrls: ['./permissions-modal.component.css'],
})
export class PermissionsModalComponent implements OnInit, OnChanges {
  @Input() isPermissionsModalVisible = false;
  @Input() onPermissionsClose!: () => void;
  @Input() parameters: PermissionsModalParameters = {} as PermissionsModalParameters;
  @Input() backgroundColor = '#1e293b';
  @Input() position = 'center';

  // FontAwesome Icons
  faTimes = faTimes;
  faUserShield = faUserShield;
  faUsers = faUsers;
  faCog = faCog;
  faChevronUp = faChevronUp;
  faChevronDown = faChevronDown;
  faCheck = faCheck;
  faClock = faClock;
  faBan = faBan;
  faMicrophone = faMicrophone;
  faVideo = faVideo;
  faDesktop = faDesktop;
  faComment = faComment;

  activeTab: 'users' | 'config' = 'users';
  searchFilter = '';
  selectedParticipants: Set<string> = new Set();
  expandedLevel: 'level0' | 'level1' | null = 'level0';
  
  localConfig!: PermissionConfig;
  participantsState: Participant[] = [];

  constructor(
    private updateParticipantPermissionService: UpdateParticipantPermission,
    private bulkUpdateParticipantPermissionsService: BulkUpdateParticipantPermissions,
    private updatePermissionConfigService: UpdatePermissionConfig
  ) {}

  ngOnInit() {
    this.updateStateFromParams();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['parameters'] || changes['isPermissionsModalVisible']) {
      this.updateStateFromParams();
    }
  }

  computeInitialConfig(): PermissionConfig {
    if (this.parameters.permissionConfig) return this.parameters.permissionConfig;
    return this.updatePermissionConfigService.getPermissionConfigFromEventSettings(
      this.parameters.audioSetting || 'approval',
      this.parameters.videoSetting || 'approval',
      this.parameters.screenshareSetting || 'disallow',
      this.parameters.chatSetting || 'allow'
    );
  }

  updateStateFromParams() {
    if (this.isPermissionsModalVisible && this.parameters.getUpdatedAllParams) {
      const freshParams = this.parameters.getUpdatedAllParams();
      this.participantsState = freshParams.participants || [];
      
      if (freshParams.permissionConfig) {
        this.localConfig = JSON.parse(JSON.stringify(freshParams.permissionConfig));
      } else if (!this.localConfig) {
        this.localConfig = this.computeInitialConfig();
      }
    }
  }

  get isHost(): boolean {
    return this.parameters.islevel === '2';
  }

  get filteredParticipants(): Participant[] {
    return this.participantsState
      .filter((p) => p.islevel !== '2')
      .filter((p) => (this.searchFilter ? p.name.toLowerCase().includes(this.searchFilter.toLowerCase()) : true));
  }

  get participantsByLevel(): { '1': Participant[], '0': Participant[] } {
    const grouped: { '1': Participant[], '0': Participant[] } = { '1': [], '0': [] };
    this.filteredParticipants.forEach((p) => {
      const level = p.islevel === '1' ? '1' : '0';
      grouped[level].push(p);
    });
    return grouped;
  }

  getLevelLabel(level: '1' | '0'): string {
    return level === '1' ? 'Elevated' : 'Basic';
  }

  getLevelColor(level: '1' | '0'): string {
    return level === '1' ? '#3b82f6' : '#6b7280';
  }

  hasSelected(participantName: string): boolean {
    return this.selectedParticipants.has(participantName);
  }

  handleParticipantSelect(participantName: string) {
    if (this.selectedParticipants.has(participantName)) {
      this.selectedParticipants.delete(participantName);
    } else {
      this.selectedParticipants.add(participantName);
    }
  }

  handleSelectAll() {
    if (this.selectedParticipants.size === this.filteredParticipants.length && this.filteredParticipants.length > 0) {
      this.selectedParticipants.clear();
    } else {
      this.filteredParticipants.forEach((p) => this.selectedParticipants.add(p.name));
    }
  }

  async handleBulkUpdate(newLevel: PermissionLevel) {
    const selectedList = this.filteredParticipants.filter((p) => this.selectedParticipants.has(p.name));
    if (selectedList.length === 0) {
      this.parameters.showAlert?.({
        message: 'Please select participants to update',
        type: 'danger',
        duration: 3000,
      });
      return;
    }

    await this.bulkUpdateParticipantPermissionsService.bulkUpdateParticipantPermissions({
      socket: this.parameters.socket,
      participants: selectedList,
      newLevel,
      member: this.parameters.member,
      islevel: this.parameters.islevel,
      roomName: this.parameters.roomName,
      showAlert: this.parameters.showAlert,
      maxBatchSize: 50,
    });

    this.selectedParticipants.clear();
  }

  async handleSingleUpdate(participant: Participant, newLevel: PermissionLevel) {
    await this.updateParticipantPermissionService.updateParticipantPermission({
      socket: this.parameters.socket,
      participant,
      newLevel,
      member: this.parameters.member,
      islevel: this.parameters.islevel,
      roomName: this.parameters.roomName,
      showAlert: this.parameters.showAlert,
    });
  }

  handleConfigChange(
    level: 'level0' | 'level1',
    capability: keyof PermissionCapabilities,
    value: PermissionValue
  ) {
    switch (capability) {
      case 'useChat':
        this.localConfig[level].useChat = value === 'allow' ? 'allow' : 'disallow';
        return;
      case 'useMic':
        this.localConfig[level].useMic = value as PermissionCapabilities['useMic'];
        return;
      case 'useCamera':
        this.localConfig[level].useCamera = value as PermissionCapabilities['useCamera'];
        return;
      case 'useScreen':
        this.localConfig[level].useScreen = value as PermissionCapabilities['useScreen'];
        return;
    }
  }

  async handleSaveConfig() {
    await this.updatePermissionConfigService.updatePermissionConfig({
      socket: this.parameters.socket,
      config: this.localConfig,
      member: this.parameters.member,
      islevel: this.parameters.islevel,
      roomName: this.parameters.roomName,
      showAlert: this.parameters.showAlert,
    });
    this.parameters.updatePermissionConfig?.(this.localConfig);
  }

  toggleLevelConfig(level: 'level0' | 'level1') {
    this.expandedLevel = this.expandedLevel === level ? null : level;
  }

  // Enums for template usage
  levels: ('1' | '0')[] = ['1', '0'];
  configLevels: ('level0' | 'level1')[] = ['level0', 'level1'];
  capabilities: (keyof PermissionCapabilities)[] = ['useMic', 'useCamera', 'useScreen', 'useChat'];
  readonly chatOptions: PermissionCapabilities['useChat'][] = ['allow', 'disallow'];
  readonly standardOptions: PermissionCapabilities['useMic'][] = ['allow', 'approval', 'disallow'];

  getParticipantsForLevel(level: '1' | '0'): Participant[] {
    return this.participantsByLevel[level];
  }

  getConfigValue(level: 'level0' | 'level1', capability: keyof PermissionCapabilities): PermissionValue {
    return this.localConfig[level][capability] as PermissionValue;
  }

  isSelectedConfigOption(
    level: 'level0' | 'level1',
    capability: keyof PermissionCapabilities,
    value: PermissionValue
  ): boolean {
    return this.getConfigValue(level, capability) === value;
  }

  getCapabilityIcon(capability: keyof PermissionCapabilities) {
    switch (capability) {
      case 'useMic': return this.faMicrophone;
      case 'useCamera': return this.faVideo;
      case 'useScreen': return this.faDesktop;
      case 'useChat': return this.faComment;
    }
  }

  getCapabilityName(capability: keyof PermissionCapabilities) {
    switch (capability) {
      case 'useMic': return 'Microphone';
      case 'useCamera': return 'Camera';
      case 'useScreen': return 'Screen Share';
      case 'useChat': return 'Chat';
    }
  }

  getStatusIcon(status: string) {
    switch (status) {
      case 'allow': return this.faCheck;
      case 'approval': return this.faClock;
      case 'disallow': return this.faBan;
      default: return this.faCheck;
    }
  }

  getStatusColor(status: string) {
    switch (status) {
      case 'allow': return '#22c55e';
      case 'approval': return '#f59e0b';
      case 'disallow': return '#ef4444';
      default: return '#22c55e';
    }
  }

  getOptionsForCapability(capability: keyof PermissionCapabilities): readonly PermissionValue[] {
    if (capability === 'useChat') {
      return this.chatOptions;
    }
    return this.standardOptions;
  }
}
