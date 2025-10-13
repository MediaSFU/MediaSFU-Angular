import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import {
  RenderRequestComponent,
  RenderRequestComponentOptions,
} from '../render-request-component/render-request-component.component';
import {
  RespondToRequests,
  RespondToRequestsType,
} from '../../../methods/requests-methods/respond-to-requests.service';
import { Socket } from 'socket.io-client';
import { Request } from '../../../@types/types';

export interface RequestsModalParameters {
  getUpdatedAllParams: () => { filteredRequestList: Request[] };
  [key: string]: any;
}

export interface RequestsModalOptions {
  isRequestsModalVisible: boolean;
  requestCounter: number;
  requestList: Request[];
  roomName: string;
  socket: Socket;
  backgroundColor: string;
  position: string;
  parameters: RequestsModalParameters;
  onRequestClose: () => void;
  onRequestFilterChange: (filter: string) => void;
  onRequestItemPress?: RespondToRequestsType;
  updateRequestList: (newRequestList: any[]) => void;
  overlayStyle?: Partial<CSSStyleDeclaration>;
  contentStyle?: Partial<CSSStyleDeclaration>;
  customTemplate?: any;
}

export type RequestsModalType = (options: RenderRequestComponentOptions) => HTMLElement;

/**
 * RequestsModal - Modal for managing participant requests (screen share, unmute, etc.)
 * 
 * @component
 * @description
 * Displays and manages incoming requests from participants (e.g., screen share requests, unmute requests).
 * Allows host to approve or deny requests with filtering capabilities.
 * 
 * Supports three levels of customization:
 * 1. **Basic Usage**: Use default modal UI with request list and action handlers
 * 2. **Style Customization**: Override modal appearance with overlayStyle and contentStyle
 * 3. **Full Override**: Provide a custom template via customTemplate for complete control
 * 
 * Key Features:
 * - Request list display with participant names
 * - Approve/deny actions for each request
 * - Request filtering by name
 * - Real-time request counter badge
 * - Socket-based request handling
 * 
 * @example
 * Basic Usage:
 * ```html
 * <app-requests-modal
 *   [isRequestsModalVisible]="showRequestsModal"
 *   [requestCounter]="requestCount"
 *   [requestList]="pendingRequests"
 *   [roomName]="currentRoom"
 *   [socket]="socketInstance"
 *   [parameters]="requestParams"
 *   [onRequestClose]="closeRequestsModal"
 *   [onRequestFilterChange]="filterRequests"
 *   [updateRequestList]="updateRequests">
 * </app-requests-modal>
 * ```
 * 
 * @example
 * Style Customization:
 * ```html
 * <app-requests-modal
 *   [isRequestsModalVisible]="showRequestsModal"
 *   [requestCounter]="requestCount"
 *   [requestList]="pendingRequests"
 *   [roomName]="currentRoom"
 *   [socket]="socketInstance"
 *   [overlayStyle]="{
 *     backgroundColor: 'rgba(0, 0, 0, 0.85)'
 *   }"
 *   [contentStyle]="{
 *     backgroundColor: '#2c3e50',
 *     borderRadius: '12px',
 *     maxHeight: '600px'
 *   }"
 *   [backgroundColor]="'#34495e'"
 *   [position]="'topRight'"
 *   [onRequestClose]="closeRequestsModal"
 *   [updateRequestList]="updateRequests">
 * </app-requests-modal>
 * ```
 * 
 * @example
 * Custom Template Override:
 * ```html
 * <app-requests-modal
 *   [isRequestsModalVisible]="showRequestsModal"
 *   [customTemplate]="customRequestsTemplate"
 *   [onRequestClose]="closeRequestsModal">
 * </app-requests-modal>
 * 
 * <ng-template #customRequestsTemplate let-requestList="requestList" let-onApprove="onApprove" let-onDeny="onDeny">
 *   <div class="custom-requests">
 *     <h3>Pending Requests ({{ requestList.length }})</h3>
 *     <div *ngFor="let request of requestList" class="request-item">
 *       <span>{{ request.name }} wants to {{ request.type }}</span>
 *       <button (click)="onApprove(request)">✓</button>
 *       <button (click)="onDeny(request)">✗</button>
 *     </div>
 *   </div>
 * </ng-template>
 * ```
 * 
 * @selector app-requests-modal
 * @standalone true
 * @imports CommonModule, FontAwesomeModule, RenderRequestComponent
 * 
 * @input isRequestsModalVisible - Whether the modal is currently visible. Default: `false`
 * @input requestCounter - Number of pending requests (for badge display). Default: `0`
 * @input requestList - Array of request objects to display. Default: `[]`
 * @input roomName - Name of the room/session. Default: `''`
 * @input socket - Socket.io client instance for real-time communication. Default: `undefined`
 * @input backgroundColor - Background color of the modal content. Default: `'#83c0e9'`
 * @input position - Modal position on screen ('topRight', 'topLeft', etc.). Default: `'topRight'`
 * @input parameters - Additional parameters including filtered request list. Default: `{}`
 * @input onRequestClose - Callback function to close the modal. Default: `() => {}`
 * @input onRequestFilterChange - Callback when filter input changes. Default: `() => {}`
 * @input onRequestItemPress - Callback when approve/deny action is pressed. Default: `respondToRequestsService.respondToRequests`
 * @input updateRequestList - Function to update the request list state. Default: `() => {}`
 * @input overlayStyle - Custom CSS styles for the modal overlay backdrop. Default: `undefined`
 * @input contentStyle - Custom CSS styles for the modal content container. Default: `undefined`
 * @input customTemplate - Custom TemplateRef to completely replace default modal template. Default: `undefined`
 * 
 * @method ngOnInit - Initializes component and default styles
 * @method ngOnChanges - Updates request list when inputs change
 * @method updateRequests - Refreshes filtered request list from parameters
 * @method handleModalClose - Closes modal via onRequestClose callback
 * @method handleFilterChange - Filters request list based on search input
 * @method getCombinedOverlayStyle - Merges default and custom overlay styles
 * @method getCombinedContentStyle - Merges default and custom content styles
 */
@Component({
    selector: 'app-requests-modal',
    imports: [CommonModule, FontAwesomeModule, RenderRequestComponent],
    templateUrl: './requests-modal.component.html',
    styleUrls: ['./requests-modal.component.css']
})
export class RequestsModal implements OnInit, OnChanges {
  @Input() isRequestsModalVisible = false;
  @Input() requestCounter = 0;
  @Input() requestList: Request[] = [];
  @Input() roomName!: string;
  @Input() socket: Socket = {} as Socket;
  @Input() backgroundColor = '#83c0e9';
  @Input() position = 'topRight';
  @Input() parameters: any;
  @Input() onRequestClose!: () => void;
  @Input() onRequestFilterChange!: (filter: string) => void;
  @Input() onRequestItemPress!: (params: any) => void;
  @Input() updateRequestList!: (newRequestList: any[]) => void;
  @Input() overlayStyle?: Partial<CSSStyleDeclaration>;
  @Input() contentStyle?: Partial<CSSStyleDeclaration>;
  @Input() customTemplate?: any;

  faTimes = faTimes;
  requestList_s: any[] = [];
  requestCounter_s = 0;
  reRender = false;

  constructor(private respondToRequestsService: RespondToRequests) {}

  ngOnInit() {
    if (!this.onRequestItemPress) {
      this.onRequestItemPress = (params: any) =>
        this.respondToRequestsService.respondToRequests(params);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['requestList'] || changes['reRender'] || changes['requestCounter']) {
      this.updateRequests();
    }

    if (changes['isRequestsModalVisible'] && this.isRequestsModalVisible) {
      this.parameters = this.parameters.getUpdatedAllParams();
      this.updateRequests();
    }
  }

  updateRequests() {
    this.parameters = this.parameters.getUpdatedAllParams();
    this.requestList_s = this.parameters.filteredRequestList || [];
    this.requestCounter_s = this.parameters.filteredRequestList.length;
  }

  handleModalClose() {
    this.onRequestClose();
  }

  handleFilterChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.onRequestFilterChange(input.value);
    this.parameters = this.parameters.getUpdatedAllParams();
    this.reRender = !this.reRender;
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
