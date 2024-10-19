import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar, faLock } from '@fortawesome/free-solid-svg-icons';
import {
  GeneratePageContent,
  GeneratePageContentParameters,
} from '../../../consumers/generate-page-content.service';
import { Socket } from 'socket.io-client';
import { BreakoutParticipant, ComponentSizes, ShowAlert } from '../../../@types/types';

export interface PaginationParameters extends GeneratePageContentParameters {
  mainRoomsLength: number;
  memberRoom: number;
  breakOutRoomStarted: boolean;
  breakOutRoomEnded: boolean;
  member: string;
  breakoutRooms: BreakoutParticipant[][];
  hostNewRoom: number;
  roomName: string;
  islevel: string;
  showAlert?: ShowAlert;
  socket: Socket;

  // mediasfu functions
  getUpdatedAllParams: () => PaginationParameters;
  [key: string]: any;
}

export interface PaginationOptions {
  totalPages: number;
  currentUserPage: number;
  handlePageChange: (options: any) => Promise<void>;
  position: 'left' | 'middle' | 'right' | string;
  location: 'top' | 'middle' | 'bottom' | string;
  direction: 'horizontal' | 'vertical';
  buttonsContainerStyle: any;
  activePageStyle: any;
  inactivePageStyle: any;
  backgroundColor: string;
  paginationHeight: number;
  showAspect?: boolean;
  parameters: PaginationParameters;
}

export type PaginationType = (options: PaginationOptions) => HTMLElement;

/**
 * Pagination component for displaying and handling pagination controls.
 *
 * @component
 * @selector app-pagination
 * @standalone true
 * @imports [CommonModule, FontAwesomeModule]
 *
 * @description
 * This component renders pagination controls with customizable styles and behavior.
 * It supports horizontal and vertical layouts, different positions, and dynamic data.
 *
 * @example
 * <app-pagination
 *   [totalPages]="10"
 *   [currentUserPage]="1"
 *   [handlePageChange]="handlePageChange"
 *   [position]="'middle'"
 *   [location]="'bottom'"
 *   [direction]="'horizontal'"
 *   [backgroundColor]="'#ffffff'"
 *   [paginationHeight]="40"
 *   [showAspect]="true"
 *   [parameters]="paginationParameters">
 * </app-pagination>
 *
 * @input {number} totalPages - Total number of pages.
 * @input {number} currentUserPage - Current active page.
 * @input {Function} handlePageChange - Function to handle page change.
 * @input {'left' | 'middle' | 'right' | string} position - Position of the pagination controls.
 * @input {'top' | 'middle' | 'bottom' | string} location - Location of the pagination controls.
 * @input {'horizontal' | 'vertical' | string} direction - Direction of the pagination controls.
 * @input {any} buttonsContainerStyle - Custom styles for the buttons container.
 * @input {any} activePageStyle - Custom styles for the active page button.
 * @input {any} inactivePageStyle - Custom styles for the inactive page buttons.
 * @input {string} backgroundColor - Background color of the pagination controls.
 * @input {number} paginationHeight - Height of the pagination controls.
 * @input {boolean} showAspect - Flag to show or hide the pagination controls.
 * @input {PaginationParameters} parameters - Additional parameters for pagination.
 *
 * @method ngOnInit - Initializes the component and sets up initial data.
 * @method ngOnChanges - Handles changes to input properties and updates data accordingly.
 * @method handleClick - Handles click events on pagination buttons and performs necessary actions.
 * @method getPageStyle - Returns the style for a given page button based on its state.
 * @method isBreakoutRoom - Determines if a given item represents a breakout room.
 * @method getDisplayItem - Returns the display text for a given item.
 */
@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  template: `
    <div
      [ngStyle]="{
        'background-color': backgroundColor,
        'justify-content': position == 'middle' ? 'space-evenly' : position == 'left' ? 'flex-start' : 'flex-end',
        'align-items': location == 'middle' ? 'center' : location == 'top' ? 'flex-start' : 'flex-end',
        'padding': '0',
        'margin': '0',
        'min-height': direction == 'horizontal' ? paginationHeight + 'px' : componentSizes.otherHeight + 'px',
        'min-width': direction == 'horizontal' ? componentSizes.otherWidth + 'px' : paginationHeight + 'px',
        'width': direction == 'horizontal' ? '100%' : paginationHeight + 'px',
        'height': direction == 'horizontal' ? paginationHeight + 'px' : '100%',
        'display': showAspect ? 'flex' : 'none',
        'max-height': direction == 'horizontal' ? paginationHeight + 'px' : '100%',
        'max-width': direction == 'horizontal' ? '100%' : paginationHeight + 'px',
        'flex-direction': direction == 'vertical' ? 'column' : 'row',
        'overflow-x': 'auto',
      }"
    >
      <ng-container *ngFor="let item of data; let index = index">
        <button
          *ngIf="item == 0"
          [ngClass]="{ active: item == currentUserPage }"
          [ngStyle]="getPageStyle(item)"
          (click)="handleClick(item)"
        >
          <fa-icon
            [icon]="faStar"
            size="lg"
            [style.color]="item == currentUserPage ? 'yellow' : 'gray'"
          ></fa-icon>
        </button>
        <button
          *ngIf="item !== 0"
          [ngClass]="{ active: item == currentUserPage }"
          [ngStyle]="getPageStyle(item)"
          (click)="handleClick(item)"
        >
          <span
            *ngIf="!isBreakoutRoom(item)"
            class="pageText"
            [ngStyle]="{ color: item == currentUserPage ? '#ffffff' : '#000000' }"
            >{{ item }}</span
          >
          <span
            *ngIf="isBreakoutRoom(item)"
            class="pageText"
            [ngStyle]="{ color: item == currentUserPage ? '#ffffff' : '#000000' }"
            >{{ getDisplayItem(item) }}
            <fa-icon
              *ngIf="
                parameters.memberRoom + 1 !== item - (parameters.mainRoomsLength - 1) &&
                parameters.islevel !== '2'
              "
              [icon]="faLock"
            ></fa-icon
          ></span>
        </button>
      </ng-container>
    </div>
  `,
  styles: [
    `
      .pageButton.active {
        background-color: #2c678f;
      }
    `,
  ],
})
export class Pagination implements OnInit, OnChanges {
  @Input() totalPages = 0;
  @Input() currentUserPage = 0;
  @Input() handlePageChange!: (options: any) => Promise<void>;
  @Input() position: 'left' | 'middle' | 'right' | string = 'middle';
  @Input() location: 'top' | 'middle' | 'bottom' | string = 'middle';
  @Input() direction: 'horizontal' | 'vertical' = 'horizontal';
  @Input() buttonsContainerStyle: any = {};
  @Input() activePageStyle: any = { backgroundColor: '#2c678f' };
  @Input() inactivePageStyle: any = {};
  @Input() backgroundColor = '#ffffff';
  @Input() paginationHeight = 40;
  @Input() showAspect = true;
  @Input() parameters: PaginationParameters = {} as PaginationParameters;

  constructor(private generatePageContentService: GeneratePageContent) {}

  faStar = faStar;
  faLock = faLock;

  data: number[] = [];

  ngOnInit() {
    this.data = Array.from({ length: this.totalPages + 1 }, (_, index) => index);
    this.componentSizes = this.parameters.componentSizes;
    if (!this.handlePageChange) {
      this.handlePageChange = this.generatePageContentService.generatePageContent.bind(
        this.generatePageContentService,
      );
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['totalPages'] || changes['currentUserPage']) {
      this.data = Array.from({ length: this.totalPages + 1 }, (_, index) => index);
    }
  }

  handleClick = async (page: number): Promise<void> => {
    if (page == this.currentUserPage) {
      return;
    }

    this.parameters = this.parameters.getUpdatedAllParams();
    const params = { ...this.parameters };
    this.componentSizes = params.componentSizes;

    if (this.parameters.breakOutRoomStarted && !this.parameters.breakOutRoomEnded && page !== 0) {
      const roomMember = this.parameters.breakoutRooms.find((r: any[]) =>
        r.find((p) => p.name == this.parameters.member),
      );
      const pageInt = page - this.parameters.mainRoomsLength;
      let memberBreakRoom = -1;
      if (roomMember) {
        memberBreakRoom = this.parameters.breakoutRooms.indexOf(roomMember);
      }

      if ((memberBreakRoom == -1 || memberBreakRoom !== pageInt) && pageInt >= 0) {
        if (this.parameters.islevel !== '2') {
          if (this.parameters.showAlert) {
            this.parameters.showAlert({
              message: `You are not part of the breakout room ${pageInt + 1}.`,
              type: 'danger',
            });
          }
          return;
        }

        await this.handlePageChange({
          page,
          parameters: params,
          breakRoom: pageInt,
          inBreakRoom: true,
        });
        if (this.parameters.hostNewRoom !== pageInt) {
          this.parameters.socket.emit('updateHostBreakout', {
            newRoom: pageInt,
            roomName: this.parameters.roomName,
          });
        }
      } else {
        await this.handlePageChange({
          page,
          parameters: params,
          breakRoom: pageInt,
          inBreakRoom: pageInt >= 0,
        });
        if (this.parameters.islevel == '2' && this.parameters.hostNewRoom !== -1) {
          this.parameters.socket.emit('updateHostBreakout', {
            prevRoom: this.parameters.hostNewRoom,
            newRoom: -1,
            roomName: this.parameters.roomName,
          });
        }
      }
    } else {
      await this.handlePageChange({ page, parameters: params, breakRoom: 0, inBreakRoom: false });
      if (this.parameters.islevel == '2' && this.parameters.hostNewRoom !== -1) {
        this.parameters.socket.emit('updateHostBreakout', {
          prevRoom: this.parameters.hostNewRoom,
          newRoom: -1,
          roomName: this.parameters.roomName,
        });
      }
    }
  };

  componentSizes: ComponentSizes = {} as ComponentSizes;

  getPageStyle(item: number) {
    return item == this.currentUserPage ? this.activePageStyle : this.inactivePageStyle;
  }

  isBreakoutRoom = (item: number): boolean => {
    this.parameters = this.parameters.getUpdatedAllParams();
    return (
      this.parameters.breakOutRoomStarted &&
      !this.parameters.breakOutRoomEnded &&
      item >= this.parameters.mainRoomsLength
    );
  };

  getDisplayItem(item: number) {
    const roomNumber = item - (this.parameters.mainRoomsLength - 1);

    if (this.isBreakoutRoom(item)) {
      if (this.parameters.memberRoom + 1 !== roomNumber) {
        return `Room ${roomNumber}`;
      } else {
        return `Room ${roomNumber}`;
      }
    }

    return item.toString();
  }
}
