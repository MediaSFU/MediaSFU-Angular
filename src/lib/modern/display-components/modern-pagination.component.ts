import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
  faHome,
  faLock,
  faStar,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';

import {
  GeneratePageContent,
  GeneratePageContentParameters,
} from '../../consumers/generate-page-content.service';
import { Socket } from 'socket.io-client';
import { BreakoutParticipant, ComponentSizes, ShowAlert } from '../../@types/types';

export interface ModernPaginationParameters extends GeneratePageContentParameters {
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
  getUpdatedAllParams: () => ModernPaginationParameters;
  getCurrentParams?: () => any;
  [key: string]: any;
}

export interface ModernPaginationOptions {
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
  parameters: ModernPaginationParameters;
}

@Component({
  selector: 'app-modern-pagination',
  imports: [CommonModule, FontAwesomeModule],
  template: `
    <div class="ms-modern-pagination" [ngStyle]="getContainerStyle()">
      <button
        *ngIf="shouldShowNavigationArrows()"
        type="button"
        class="ms-modern-pagination__button ms-modern-pagination__button--arrow"
        [ngStyle]="getArrowStyle(!canNavigateBack())"
        [disabled]="!canNavigateBack()"
        [attr.aria-label]="direction === 'vertical' ? 'Previous pages' : 'Previous pages'"
        (click)="shiftWindowBack()"
      >
        <fa-icon [icon]="direction === 'vertical' ? faChevronUp : faChevronLeft"></fa-icon>
      </button>

      <ng-container *ngFor="let item of data">
        <button
          type="button"
          class="ms-modern-pagination__button"
          [ngClass]="{ 'ms-modern-pagination__button--active': item == currentUserPage }"
          [ngStyle]="getPageStyle(item)"
          [attr.aria-label]="getPageAriaLabel(item)"
          (click)="handleClick(item)"
        >
          <fa-icon
            *ngIf="item == 0"
            [icon]="faHome"
            [style.color]="item == currentUserPage ? '#ffffff' : getHomeIconColor()"
          ></fa-icon>
          <fa-icon
            *ngIf="isBreakoutRoom(item)"
            class="ms-modern-pagination__room-icon"
            [icon]="faUsers"
          ></fa-icon>
          <span
            *ngIf="item !== 0"
            class="ms-modern-pagination__label"
            [ngStyle]="getPageLabelStyle(item)"
          >
            {{ getDisplayItem(item) }}
          </span>
          <fa-icon
            *ngIf="isBreakoutRoom(item) && showBreakoutLock(item)"
            class="ms-modern-pagination__badge"
            [icon]="faLock"
          ></fa-icon>
          <fa-icon
            *ngIf="isBreakoutRoom(item) && isCurrentBreakoutRoom(item)"
            class="ms-modern-pagination__badge ms-modern-pagination__badge--star"
            [icon]="faStar"
          ></fa-icon>
        </button>
      </ng-container>

      <button
        *ngIf="shouldShowNavigationArrows()"
        type="button"
        class="ms-modern-pagination__button ms-modern-pagination__button--arrow"
        [ngStyle]="getArrowStyle(!canNavigateForward())"
        [disabled]="!canNavigateForward()"
        [attr.aria-label]="direction === 'vertical' ? 'Next pages' : 'Next pages'"
        (click)="shiftWindowForward()"
      >
        <fa-icon [icon]="direction === 'vertical' ? faChevronDown : faChevronRight"></fa-icon>
      </button>
    </div>
  `,
  styles: [
    `
      .ms-modern-pagination {
        box-sizing: border-box;
        gap: 4px;
        padding: 2px 6px;
        border-radius: var(--ms-modern-radius-md, 16px);
        overflow-x: auto;
        overflow-y: hidden;
        scrollbar-width: none;
        backdrop-filter: blur(12px);
        box-shadow: 0 14px 28px rgba(15, 23, 42, 0.16);
      }

      .ms-modern-pagination::-webkit-scrollbar {
        display: none;
      }

      .ms-modern-pagination__button {
        box-sizing: border-box;
        min-width: 30px;
        height: 30px;
        padding: 0 10px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        border: none;
        border-radius: var(--ms-modern-radius-pill, 999px);
        cursor: pointer;
        transition:
          transform var(--ms-modern-motion-fast, 160ms) ease,
          box-shadow var(--ms-modern-motion-fast, 160ms) ease,
          background-color var(--ms-modern-motion-fast, 160ms) ease;
      }

      .ms-modern-pagination__button--active {
        transform: translateY(-1px);
      }

      .ms-modern-pagination__label {
        font-family: var(--ms-modern-font-family, 'Segoe UI', 'Aptos', 'Trebuchet MS', sans-serif);
        font-size: 0.76rem;
        font-weight: 800;
        letter-spacing: 0.04em;
        white-space: nowrap;
      }

      .ms-modern-pagination__badge {
        font-size: 0.72rem;
      }

      .ms-modern-pagination__badge--star {
        color: #f59e0b;
      }

      .ms-modern-pagination__button--arrow {
        min-width: 28px;
        width: 28px;
        height: 28px;
        padding: 0;
        background: transparent;
        box-shadow: none;
      }

      .ms-modern-pagination__room-icon {
        font-size: 0.68rem;
      }
    `,
  ],
})
export class ModernPaginationComponent implements OnInit, OnChanges {
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
  @Input() maxVisiblePages = 5;
  @Input() parameters: ModernPaginationParameters = {} as ModernPaginationParameters;

  constructor(private generatePageContentService: GeneratePageContent) {}

  faHome = faHome;
  faStar = faStar;
  faLock = faLock;
  faUsers = faUsers;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faChevronUp = faChevronUp;
  faChevronDown = faChevronDown;

  data: number[] = [];
  private windowStart = 1;
  componentSizes: ComponentSizes = {} as ComponentSizes;

  ngOnInit(): void {
    this.componentSizes = this.resolveParameters().componentSizes;
    if (!this.handlePageChange) {
      this.handlePageChange = this.generatePageContentService.generatePageContent.bind(
        this.generatePageContentService,
      );
    }
    this.refreshVisiblePages();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['totalPages'] || changes['currentUserPage'] || changes['parameters']) {
      this.refreshVisiblePages();
    }
  }

  handleClick = async (page: number): Promise<void> => {
    if (page == this.currentUserPage) {
      return;
    }

    const resolvedParameters = this.resolveParameters();
    const params = { ...resolvedParameters };
    this.componentSizes = params.componentSizes;

    if (resolvedParameters.breakOutRoomStarted && !resolvedParameters.breakOutRoomEnded && page !== 0) {
      const roomMember = resolvedParameters.breakoutRooms.find((room: any[]) =>
        room.find((participant) => participant.name == resolvedParameters.member),
      );
      const pageInt = page - resolvedParameters.mainRoomsLength;
      let memberBreakRoom = -1;

      if (roomMember) {
        memberBreakRoom = resolvedParameters.breakoutRooms.indexOf(roomMember);
      }

      if ((memberBreakRoom == -1 || memberBreakRoom !== pageInt) && pageInt >= 0) {
        if (resolvedParameters.islevel !== '2') {
          resolvedParameters.showAlert?.({
            message: `You are not part of the breakout room ${pageInt + 1}.`,
            type: 'danger',
          });
          return;
        }

        await this.handlePageChange({
          page,
          parameters: params,
          breakRoom: pageInt,
          inBreakRoom: true,
        });

        if (resolvedParameters.hostNewRoom !== pageInt) {
          resolvedParameters.socket.emit('updateHostBreakout', {
            newRoom: pageInt,
            roomName: resolvedParameters.roomName,
          });
        }
      } else {
        await this.handlePageChange({
          page,
          parameters: params,
          breakRoom: pageInt,
          inBreakRoom: pageInt >= 0,
        });

        if (resolvedParameters.islevel == '2' && resolvedParameters.hostNewRoom !== -1) {
          resolvedParameters.socket.emit('updateHostBreakout', {
            prevRoom: resolvedParameters.hostNewRoom,
            newRoom: -1,
            roomName: resolvedParameters.roomName,
          });
        }
      }
    } else {
      await this.handlePageChange({ page, parameters: params, breakRoom: 0, inBreakRoom: false });
      if (resolvedParameters.islevel == '2' && resolvedParameters.hostNewRoom !== -1) {
        resolvedParameters.socket.emit('updateHostBreakout', {
          prevRoom: resolvedParameters.hostNewRoom,
          newRoom: -1,
          roomName: resolvedParameters.roomName,
        });
      }
    }
  };

  resolveParameters(): ModernPaginationParameters {
    return this.parameters.getCurrentParams?.() ?? this.parameters;
  }

  isDarkModeEnabled(): boolean {
    const params = this.resolveParameters();

    if (typeof params?.['isDarkModeValue'] === 'boolean') {
      return params['isDarkModeValue'];
    }

    return false;
  }

  refreshVisiblePages(): void {
    this.syncWindowToCurrentPage();

    if (!this.shouldShowNavigationArrows()) {
      this.data = Array.from({ length: this.totalPages + 1 }, (_, index) => index);
      return;
    }

    const windowEnd = Math.min(this.windowStart + this.maxVisiblePages - 1, this.totalPages);
    this.data = [0];

    for (let page = this.windowStart; page <= windowEnd; page += 1) {
      this.data.push(page);
    }
  }

  shouldShowNavigationArrows(): boolean {
    return this.totalPages > this.maxVisiblePages + 1;
  }

  canNavigateBack(): boolean {
    return this.windowStart > 1;
  }

  canNavigateForward(): boolean {
    return this.windowStart + this.maxVisiblePages <= this.totalPages;
  }

  shiftWindowBack(): void {
    if (!this.canNavigateBack()) {
      return;
    }

    this.windowStart = this.clampWindowStart(this.windowStart - this.getWindowShiftAmount());
    this.refreshVisiblePages();
  }

  shiftWindowForward(): void {
    if (!this.canNavigateForward()) {
      return;
    }

    this.windowStart = this.clampWindowStart(this.windowStart + this.getWindowShiftAmount());
    this.refreshVisiblePages();
  }

  getArrowStyle(disabled: boolean): Record<string, string> {
    const isDarkMode = this.isDarkModeEnabled();

    return {
      color: disabled
        ? isDarkMode
          ? 'rgba(226, 232, 240, 0.32)'
          : 'rgba(15, 23, 42, 0.32)'
        : isDarkMode
          ? 'rgba(226, 232, 240, 0.86)'
          : 'rgba(15, 23, 42, 0.82)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? '0.6' : '1',
    };
  }

  getHomeIconColor(): string {
    return this.isDarkModeEnabled() ? 'rgba(226, 232, 240, 0.82)' : 'rgba(15, 23, 42, 0.68)';
  }

  getContainerStyle(): Record<string, string> {
    const otherHeight = this.componentSizes?.otherHeight || 0;
    const otherWidth = this.componentSizes?.otherWidth || 0;
    const isDarkMode = this.isDarkModeEnabled();

    return {
      background:
        this.backgroundColor ||
        (isDarkMode
          ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.92) 0%, rgba(30, 41, 59, 0.88) 100%)'
          : 'linear-gradient(135deg, rgba(255, 255, 255, 0.92) 0%, rgba(226, 232, 240, 0.88) 100%)'),
      justifyContent:
        this.position == 'middle'
          ? 'center'
          : this.position == 'left'
            ? 'flex-start'
            : 'flex-end',
      alignItems:
        this.location == 'middle'
          ? 'center'
          : this.location == 'top'
            ? 'flex-start'
            : 'flex-end',
      margin: '0',
      minHeight: this.direction == 'horizontal' ? this.paginationHeight + 'px' : otherHeight + 'px',
      minWidth: this.direction == 'horizontal' ? otherWidth + 'px' : this.paginationHeight + 'px',
      width: this.direction == 'horizontal' ? '100%' : this.paginationHeight + 'px',
      height: this.direction == 'horizontal' ? this.paginationHeight + 'px' : '100%',
      display: this.showAspect ? 'flex' : 'none',
      maxHeight: this.direction == 'horizontal' ? this.paginationHeight + 'px' : '100%',
      maxWidth: this.direction == 'horizontal' ? '100%' : this.paginationHeight + 'px',
      flexDirection: this.direction == 'vertical' ? 'column' : 'row',
      border: isDarkMode
        ? '1px solid rgba(148, 163, 184, 0.18)'
        : '1px solid rgba(148, 163, 184, 0.24)',
      ...(this.buttonsContainerStyle || {}),
    };
  }

  getPageStyle(item: number): Record<string, string> {
    const active = item == this.currentUserPage;
    const isDarkMode = this.isDarkModeEnabled();

    return {
      background: active
        ? 'linear-gradient(135deg, rgba(37, 99, 235, 0.92) 0%, rgba(79, 70, 229, 0.9) 100%)'
        : isDarkMode
          ? 'rgba(30, 41, 59, 0.82)'
          : 'rgba(255, 255, 255, 0.62)',
      color: active ? '#ffffff' : isDarkMode ? '#e2e8f0' : '#0f172a',
      boxShadow: active
        ? '0 12px 26px rgba(37, 99, 235, 0.24)'
        : isDarkMode
          ? 'inset 0 1px 0 rgba(255, 255, 255, 0.06)'
          : 'inset 0 1px 0 rgba(255, 255, 255, 0.22)',
      ...(active ? this.activePageStyle : this.inactivePageStyle),
    };
  }

  getPageLabelStyle(item: number): Record<string, string> {
    const isDarkMode = this.isDarkModeEnabled();

    return {
      color: item == this.currentUserPage ? '#ffffff' : isDarkMode ? '#e2e8f0' : '#0f172a',
    };
  }

  getPageAriaLabel(item: number): string {
    if (item === 0) {
      return 'Go to main room';
    }

    if (this.isBreakoutRoom(item)) {
      return `Go to breakout room ${this.getBreakoutRoomNumber(item)}`;
    }

    return `Go to page ${item}`;
  }

  isBreakoutRoom = (item: number): boolean => {
    const params = this.resolveParameters();

    return params.breakOutRoomStarted && !params.breakOutRoomEnded && item >= params.mainRoomsLength;
  };

  isCurrentBreakoutRoom(item: number): boolean {
    const params = this.resolveParameters();

    return this.isBreakoutRoom(item) && params.memberRoom + 1 === item - (params.mainRoomsLength - 1);
  }

  showBreakoutLock(item: number): boolean {
    const params = this.resolveParameters();

    return (
      this.isBreakoutRoom(item) &&
      params.memberRoom + 1 !== item - (params.mainRoomsLength - 1) &&
      params.islevel !== '2'
    );
  }

  getDisplayItem(item: number): string {
    const roomNumber = this.getBreakoutRoomNumber(item);

    if (this.isBreakoutRoom(item)) {
      return roomNumber.toString();
    }

    return item.toString();
  }

  private syncWindowToCurrentPage(): void {
    if (!this.shouldShowNavigationArrows()) {
      this.windowStart = 1;
      return;
    }

    if (this.currentUserPage <= 0) {
      this.windowStart = this.clampWindowStart(this.windowStart);
      return;
    }

    const windowEnd = this.windowStart + this.maxVisiblePages - 1;
    if (this.currentUserPage >= this.windowStart && this.currentUserPage <= windowEnd) {
      this.windowStart = this.clampWindowStart(this.windowStart);
      return;
    }

    const centeredStart = this.currentUserPage - Math.floor(this.maxVisiblePages / 2);
    this.windowStart = this.clampWindowStart(centeredStart);
  }

  private clampWindowStart(candidate: number): number {
    const maxStart = Math.max(1, this.totalPages - this.maxVisiblePages + 1);

    return Math.max(1, Math.min(candidate, maxStart));
  }

  private getWindowShiftAmount(): number {
    return Math.max(1, this.maxVisiblePages - 2);
  }

  private getBreakoutRoomNumber(item: number): number {
    const params = this.resolveParameters();

    return item - (params.mainRoomsLength - 1);
  }
}
