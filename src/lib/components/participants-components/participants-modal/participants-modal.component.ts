import { Component, Input, OnInit, OnChanges, SimpleChanges, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { CoHostResponsibility, EventType, Participant, ShowAlert } from '../../../@types/types';
import { ParticipantList } from '../participant-list/participant-list.component';
import { ParticipantListOthers } from '../participant-list-others/participant-list-others.component';
import {
  MuteParticipants,
  MuteParticipantsOptions,
} from '../../../methods/participants-methods/mute-participants.service';
import {
  MessageParticipants,
  MessageParticipantsOptions,
} from '../../../methods/participants-methods/message-participants.service';
import {
  RemoveParticipants,
  RemoveParticipantsOptions,
} from '../../../methods/participants-methods/remove-participants.service';
import { Socket } from 'socket.io-client';

export interface ParticipantsModalParameters {
  position?: string;
  backgroundColor?: string;
  coHostResponsibility: CoHostResponsibility[];
  coHost: string;
  member: string;
  islevel: string;
  participants: Participant[];
  eventType: EventType;
  filteredParticipants: Participant[];
  socket: Socket;
  showAlert?: ShowAlert;
  roomName: string;
  updateIsMessagesModalVisible: (isVisible: boolean) => void;
  updateDirectMessageDetails: (participant: Participant | null) => void;
  updateStartDirectMessage: (start: boolean) => void;
  updateParticipants: (participants: Participant[]) => void;

  //mediasfu functions
  getUpdatedAllParams: () => ParticipantsModalParameters;
  [key: string]: any;
}

export interface ParticipantsModalOptions {
  isParticipantsModalVisible: boolean;
  onParticipantsClose: () => void;
  onParticipantsFilterChange: (filter: string) => void;
  participantsCounter: number;
  onMuteParticipants?: typeof MuteParticipants;
  onMessageParticipants?: typeof MessageParticipants;
  onRemoveParticipants?: typeof RemoveParticipants;
  RenderParticipantList?: HTMLElement;
  RenderParticipantListOthers?: HTMLElement;
  parameters: ParticipantsModalParameters;
  backgroundColor?: string;
  position?: string;
  overlayStyle?: Partial<CSSStyleDeclaration>;
  contentStyle?: Partial<CSSStyleDeclaration>;
  customTemplate?: TemplateRef<any>;
}

export type ParticipantsModalType = (options: ParticipantsModalOptions) => HTMLElement;

/**
 * ParticipantsModal - Customizable participants list modal with interaction controls
 *
 * @component
 * @selector app-participants-modal
 * @standalone true
 * @templateUrl ./participants-modal.component.html
 * @styleUrls ['./participants-modal.component.css']
 * @imports [CommonModule, FontAwesomeModule, ParticipantList, ParticipantListOthers]
 *
 * @description
 * A modal for displaying and managing meeting participants with customizable UI.
 * Supports three levels of customization:
 * 1. **Style Overrides**: Customize modal appearance with `overlayStyle` and `contentStyle`
 * 2. **Component Replacement**: Replace participant list rendering components
 * 3. **Complete Replacement**: Use `customTemplate` for full UI control
 *
 * Features:
 * - Filter participants by name
 * - Mute/unmute participants
 * - Send direct messages
 * - Remove participants (host/co-host only)
 * - Separate lists for active and waiting participants
 *
 * @example
 * **Basic Usage**
 * ```html
 * <app-participants-modal
 *   [isParticipantsModalVisible]="true"
 *   [onParticipantsClose]="closeModalFunction"
 *   [onParticipantsFilterChange]="filterFunction"
 *   [participantsCounter]="5"
 *   [parameters]="participantsModalParameters"
 *   [position]="'topRight'"
 *   [backgroundColor]="'#83c0e9'">
 * </app-participants-modal>
 * ```
 *
 * @example
 * **With Style Customization**
 * ```html
 * <app-participants-modal
 *   [isParticipantsModalVisible]="true"
 *   [overlayStyle]="{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }"
 *   [contentStyle]="{ borderRadius: '16px', maxHeight: '80vh' }"
 *   [onParticipantsClose]="closeModalFunction"
 *   [parameters]="participantsModalParameters">
 * </app-participants-modal>
 * ```
 *
 * @example
 * **Custom Template Override**
 * ```html
 * <app-participants-modal
 *   [isParticipantsModalVisible]="true"
 *   [customTemplate]="customParticipantsTemplate"
 *   [parameters]="participantsModalParameters"
 *   [onParticipantsClose]="closeModalFunction">
 * </app-participants-modal>
 * 
 * <ng-template #customParticipantsTemplate let-context>
 *   <div class="my-participants-modal">
 *     <h2>{{ context.participantsCounter }} Participants</h2>
 *     <div *ngFor="let participant of context.parameters.participants">
 *       {{ participant.name }}
 *     </div>
 *     <button (click)="context.onParticipantsClose()">Close</button>
 *   </div>
 * </ng-template>
 * ```
 *
 * @input {boolean} isParticipantsModalVisible - Controls modal visibility
 * @input {() => void} onParticipantsClose - Callback when modal is closed
 * @input {(filter: string) => void} onParticipantsFilterChange - Callback when filter changes
 * @input {number} participantsCounter - Total number of participants
 * @input {ParticipantsModalParameters} parameters - Modal parameters including participants list
 * @input {string} position - Modal position (default: 'topRight')
 * @input {string} backgroundColor - Modal background color (default: '#83c0e9')
 * @input {Partial<CSSStyleDeclaration>} overlayStyle - Custom overlay styles
 * @input {Partial<CSSStyleDeclaration>} contentStyle - Custom content styles
 * @input {TemplateRef<any>} customTemplate - Complete template override
 */


@Component({
    selector: 'app-participants-modal',
    imports: [CommonModule, FontAwesomeModule, ParticipantList, ParticipantListOthers],
    templateUrl: './participants-modal.component.html',
    styleUrls: ['./participants-modal.component.css']
})
export class ParticipantsModal implements OnInit, OnChanges {
  @Input() isParticipantsModalVisible = false;
  @Input() onParticipantsClose!: () => void;
  @Input() onParticipantsFilterChange!: (filter: string) => void;
  @Input() participantsCounter = 0;
  @Input() onMuteParticipants!: (options: MuteParticipantsOptions) => Promise<void>;
  @Input() onMessageParticipants!: (options: MessageParticipantsOptions) => void;
  @Input() onRemoveParticipants!: (options: RemoveParticipantsOptions) => Promise<void>;
  @Input() parameters: ParticipantsModalParameters = {} as ParticipantsModalParameters;
  @Input() position = 'topRight';
  @Input() backgroundColor = '#83c0e9';
  @Input() overlayStyle?: Partial<CSSStyleDeclaration>;
  @Input() contentStyle?: Partial<CSSStyleDeclaration>;
  @Input() customTemplate?: TemplateRef<any>;

  participant_s: Participant[] = [];
  participantsCounter_s = 0;
  reRender = false;

  faTimes = faTimes;

  constructor(
    private muteParticipantsService: MuteParticipants,
    private messageParticipantsService: MessageParticipants,
    private removeParticipantsService: RemoveParticipants,
  ) {}

  ngOnInit() {
    this.updateParticipantsData();
    if (!this.onMuteParticipants) {
      this.onMuteParticipants = this.muteParticipantsService.muteParticipants.bind(
        this.muteParticipantsService,
      );
    }
    if (!this.onMessageParticipants) {
      this.onMessageParticipants = this.messageParticipantsService.messageParticipants.bind(
        this.messageParticipantsService,
      );
    }
    if (!this.onRemoveParticipants) {
      this.onRemoveParticipants = this.removeParticipantsService.removeParticipants.bind(
        this.removeParticipantsService,
      );
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['parameters'] || changes['participantsCounter']) {
      this.updateParticipantsData();
    }
  }

  updateParticipantsData() {
    let { getUpdatedAllParams } = this.parameters;
    this.parameters = getUpdatedAllParams();
    this.participant_s = this.parameters.filteredParticipants;
    this.participantsCounter_s = this.parameters.filteredParticipants.length;
  }

  handleFilterChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const filterValue = inputElement.value;
    this.onParticipantsFilterChange(filterValue);
    this.reRender = !this.reRender;
  }

  handleClose() {
    this.onParticipantsClose();
  }

  canShowParticipantList() {
    const participantsValue = this.parameters.coHostResponsibility?.find(
      (item: any) => item.name === 'participants',
    )?.value;
    return (
      this.parameters.islevel === '2' ||
      (this.parameters.coHost === this.parameters.member && participantsValue === true)
    );
  }

  getCombinedOverlayStyle() {
    return {
      'background-color': 'rgba(0, 0, 0, 0.5)',
      ...(this.overlayStyle || {})
    };
  }

  getCombinedContentStyle() {
    return {
      'background-color': this.backgroundColor,
      'top': this.position.includes('top') ? '10px' : 'auto',
      'bottom': this.position.includes('bottom') ? '10px' : 'auto',
      'left': this.position.includes('Left') ? '10px' : 'auto',
      'right': this.position.includes('Right') ? '10px' : 'auto',
      ...(this.contentStyle || {})
    };
  }
}
