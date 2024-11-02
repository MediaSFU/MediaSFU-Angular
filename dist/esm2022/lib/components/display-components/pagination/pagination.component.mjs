import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar, faLock } from '@fortawesome/free-solid-svg-icons';
import * as i0 from "@angular/core";
import * as i1 from "../../../consumers/generate-page-content.service";
import * as i2 from "@angular/common";
import * as i3 from "@fortawesome/angular-fontawesome";
/**
 * Pagination component for managing and displaying page navigation controls with various layouts and customizations.
 *
 * @selector app-pagination
 * @standalone true
 * @imports [CommonModule, FontAwesomeModule]
 *
 * @description
 * This component renders pagination controls, allowing users to navigate through pages. The controls support horizontal and vertical layouts, customizable styles, and dynamic page content handling, with special support for breakout room navigation.
 *
 * @example
 * ```html
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
 * ```
 *
 * @input {number} totalPages - Total number of pages available for navigation.
 * @input {number} currentUserPage - Current active page number.
 * @input {Function} handlePageChange - Callback function to handle page changes.
 * @input {'left' | 'middle' | 'right' | string} position - Horizontal position of the pagination controls (default is 'middle').
 * @input {'top' | 'middle' | 'bottom' | string} location - Vertical position of the pagination controls (default is 'middle').
 * @input {'horizontal' | 'vertical' | string} direction - Layout direction of the pagination controls (default is 'horizontal').
 * @input {any} buttonsContainerStyle - Custom CSS styles for the buttons container.
 * @input {any} activePageStyle - CSS styles for the active page button.
 * @input {any} inactivePageStyle - CSS styles for inactive page buttons.
 * @input {string} backgroundColor - Background color for the pagination controls.
 * @input {number} paginationHeight - Height of the pagination controls in pixels.
 * @input {boolean} showAspect - Flag to display or hide the pagination controls.
 * @input {PaginationParameters} parameters - Additional configuration parameters for managing breakout rooms and related state.
 *
 * @property {number[]} data - Array representing pages to be displayed in pagination controls.
 * @property {ComponentSizes} componentSizes - Stores calculated sizes for pagination controls.
 *
 * @method ngOnInit - Lifecycle hook that initializes the component and sets up page data.
 * @method ngOnChanges - Handles input property changes to update page data when needed.
 * @method handleClick - Asynchronously handles page button clicks and manages breakout room navigation logic.
 * @method getPageStyle - Returns specific styles for a page button based on its active or inactive state.
 * @method isBreakoutRoom - Checks if a page represents a breakout room.
 * @method getDisplayItem - Returns the display label for a page, accounting for breakout room naming conventions.
 *
 * @dependencies
 * This component requires an external pagination parameters configuration (`PaginationParameters`) and access to the `GeneratePageContent` service for managing dynamic content loading.
 */
export class Pagination {
    generatePageContentService;
    totalPages = 0;
    currentUserPage = 0;
    handlePageChange;
    position = 'middle';
    location = 'middle';
    direction = 'horizontal';
    buttonsContainerStyle = {};
    activePageStyle = { backgroundColor: '#2c678f' };
    inactivePageStyle = {};
    backgroundColor = '#ffffff';
    paginationHeight = 40;
    showAspect = true;
    parameters = {};
    constructor(generatePageContentService) {
        this.generatePageContentService = generatePageContentService;
    }
    faStar = faStar;
    faLock = faLock;
    data = [];
    ngOnInit() {
        this.data = Array.from({ length: this.totalPages + 1 }, (_, index) => index);
        this.componentSizes = this.parameters.componentSizes;
        if (!this.handlePageChange) {
            this.handlePageChange = this.generatePageContentService.generatePageContent.bind(this.generatePageContentService);
        }
    }
    ngOnChanges(changes) {
        if (changes['totalPages'] || changes['currentUserPage']) {
            this.data = Array.from({ length: this.totalPages + 1 }, (_, index) => index);
        }
    }
    handleClick = async (page) => {
        if (page == this.currentUserPage) {
            return;
        }
        this.parameters = this.parameters.getUpdatedAllParams();
        const params = { ...this.parameters };
        this.componentSizes = params.componentSizes;
        if (this.parameters.breakOutRoomStarted && !this.parameters.breakOutRoomEnded && page !== 0) {
            const roomMember = this.parameters.breakoutRooms.find((r) => r.find((p) => p.name == this.parameters.member));
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
            }
            else {
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
        }
        else {
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
    componentSizes = {};
    getPageStyle(item) {
        return item == this.currentUserPage ? this.activePageStyle : this.inactivePageStyle;
    }
    isBreakoutRoom = (item) => {
        this.parameters = this.parameters.getUpdatedAllParams();
        return (this.parameters.breakOutRoomStarted &&
            !this.parameters.breakOutRoomEnded &&
            item >= this.parameters.mainRoomsLength);
    };
    getDisplayItem(item) {
        const roomNumber = item - (this.parameters.mainRoomsLength - 1);
        if (this.isBreakoutRoom(item)) {
            if (this.parameters.memberRoom + 1 !== roomNumber) {
                return `Room ${roomNumber}`;
            }
            else {
                return `Room ${roomNumber}`;
            }
        }
        return item.toString();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: Pagination, deps: [{ token: i1.GeneratePageContent }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.8", type: Pagination, isStandalone: true, selector: "app-pagination", inputs: { totalPages: "totalPages", currentUserPage: "currentUserPage", handlePageChange: "handlePageChange", position: "position", location: "location", direction: "direction", buttonsContainerStyle: "buttonsContainerStyle", activePageStyle: "activePageStyle", inactivePageStyle: "inactivePageStyle", backgroundColor: "backgroundColor", paginationHeight: "paginationHeight", showAspect: "showAspect", parameters: "parameters" }, usesOnChanges: true, ngImport: i0, template: `
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
  `, isInline: true, styles: [".pageButton.active{background-color:#2c678f}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "ngmodule", type: FontAwesomeModule }, { kind: "component", type: i3.FaIconComponent, selector: "fa-icon", inputs: ["icon", "title", "animation", "mask", "flip", "size", "pull", "border", "inverse", "symbol", "rotate", "fixedWidth", "transform", "a11yRole"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: Pagination, decorators: [{
            type: Component,
            args: [{ selector: 'app-pagination', standalone: true, imports: [CommonModule, FontAwesomeModule], template: `
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
  `, styles: [".pageButton.active{background-color:#2c678f}\n"] }]
        }], ctorParameters: () => [{ type: i1.GeneratePageContent }], propDecorators: { totalPages: [{
                type: Input
            }], currentUserPage: [{
                type: Input
            }], handlePageChange: [{
                type: Input
            }], position: [{
                type: Input
            }], location: [{
                type: Input
            }], direction: [{
                type: Input
            }], buttonsContainerStyle: [{
                type: Input
            }], activePageStyle: [{
                type: Input
            }], inactivePageStyle: [{
                type: Input
            }], backgroundColor: [{
                type: Input
            }], paginationHeight: [{
                type: Input
            }], showAspect: [{
                type: Input
            }], parameters: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29tcG9uZW50cy9kaXNwbGF5LWNvbXBvbmVudHMvcGFnaW5hdGlvbi9wYWdpbmF0aW9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBb0MsTUFBTSxlQUFlLENBQUM7QUFDbkYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7Ozs7O0FBNENuRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9ERztBQTJFSCxNQUFNLE9BQU8sVUFBVTtJQWVEO0lBZFgsVUFBVSxHQUFHLENBQUMsQ0FBQztJQUNmLGVBQWUsR0FBRyxDQUFDLENBQUM7SUFDcEIsZ0JBQWdCLENBQW1DO0lBQ25ELFFBQVEsR0FBeUMsUUFBUSxDQUFDO0lBQzFELFFBQVEsR0FBeUMsUUFBUSxDQUFDO0lBQzFELFNBQVMsR0FBOEIsWUFBWSxDQUFDO0lBQ3BELHFCQUFxQixHQUFRLEVBQUUsQ0FBQztJQUNoQyxlQUFlLEdBQVEsRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFFLENBQUM7SUFDdEQsaUJBQWlCLEdBQVEsRUFBRSxDQUFDO0lBQzVCLGVBQWUsR0FBRyxTQUFTLENBQUM7SUFDNUIsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO0lBQ3RCLFVBQVUsR0FBRyxJQUFJLENBQUM7SUFDbEIsVUFBVSxHQUF5QixFQUEwQixDQUFDO0lBRXZFLFlBQW9CLDBCQUErQztRQUEvQywrQkFBMEIsR0FB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IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb250QXdlc29tZU1vZHVsZSB9IGZyb20gJ0Bmb3J0YXdlc29tZS9hbmd1bGFyLWZvbnRhd2Vzb21lJztcbmltcG9ydCB7IGZhU3RhciwgZmFMb2NrIH0gZnJvbSAnQGZvcnRhd2Vzb21lL2ZyZWUtc29saWQtc3ZnLWljb25zJztcbmltcG9ydCB7XG4gIEdlbmVyYXRlUGFnZUNvbnRlbnQsXG4gIEdlbmVyYXRlUGFnZUNvbnRlbnRQYXJhbWV0ZXJzLFxufSBmcm9tICcuLi8uLi8uLi9jb25zdW1lcnMvZ2VuZXJhdGUtcGFnZS1jb250ZW50LnNlcnZpY2UnO1xuaW1wb3J0IHsgU29ja2V0IH0gZnJvbSAnc29ja2V0LmlvLWNsaWVudCc7XG5pbXBvcnQgeyBCcmVha291dFBhcnRpY2lwYW50LCBDb21wb25lbnRTaXplcywgU2hvd0FsZXJ0IH0gZnJvbSAnLi4vLi4vLi4vQHR5cGVzL3R5cGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBQYWdpbmF0aW9uUGFyYW1ldGVycyBleHRlbmRzIEdlbmVyYXRlUGFnZUNvbnRlbnRQYXJhbWV0ZXJzIHtcbiAgbWFpblJvb21zTGVuZ3RoOiBudW1iZXI7XG4gIG1lbWJlclJvb206IG51bWJlcjtcbiAgYnJlYWtPdXRSb29tU3RhcnRlZDogYm9vbGVhbjtcbiAgYnJlYWtPdXRSb29tRW5kZWQ6IGJvb2xlYW47XG4gIG1lbWJlcjogc3RyaW5nO1xuICBicmVha291dFJvb21zOiBCcmVha291dFBhcnRpY2lwYW50W11bXTtcbiAgaG9zdE5ld1Jvb206IG51bWJlcjtcbiAgcm9vbU5hbWU6IHN0cmluZztcbiAgaXNsZXZlbDogc3RyaW5nO1xuICBzaG93QWxlcnQ/OiBTaG93QWxlcnQ7XG4gIHNvY2tldDogU29ja2V0O1xuXG4gIC8vIG1lZGlhc2Z1IGZ1bmN0aW9uc1xuICBnZXRVcGRhdGVkQWxsUGFyYW1zOiAoKSA9PiBQYWdpbmF0aW9uUGFyYW1ldGVycztcbiAgW2tleTogc3RyaW5nXTogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBhZ2luYXRpb25PcHRpb25zIHtcbiAgdG90YWxQYWdlczogbnVtYmVyO1xuICBjdXJyZW50VXNlclBhZ2U6IG51bWJlcjtcbiAgaGFuZGxlUGFnZUNoYW5nZTogKG9wdGlvbnM6IGFueSkgPT4gUHJvbWlzZTx2b2lkPjtcbiAgcG9zaXRpb246ICdsZWZ0JyB8ICdtaWRkbGUnIHwgJ3JpZ2h0JyB8IHN0cmluZztcbiAgbG9jYXRpb246ICd0b3AnIHwgJ21pZGRsZScgfCAnYm90dG9tJyB8IHN0cmluZztcbiAgZGlyZWN0aW9uOiAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnO1xuICBidXR0b25zQ29udGFpbmVyU3R5bGU6IGFueTtcbiAgYWN0aXZlUGFnZVN0eWxlOiBhbnk7XG4gIGluYWN0aXZlUGFnZVN0eWxlOiBhbnk7XG4gIGJhY2tncm91bmRDb2xvcjogc3RyaW5nO1xuICBwYWdpbmF0aW9uSGVpZ2h0OiBudW1iZXI7XG4gIHNob3dBc3BlY3Q/OiBib29sZWFuO1xuICBwYXJhbWV0ZXJzOiBQYWdpbmF0aW9uUGFyYW1ldGVycztcbn1cblxuZXhwb3J0IHR5cGUgUGFnaW5hdGlvblR5cGUgPSAob3B0aW9uczogUGFnaW5hdGlvbk9wdGlvbnMpID0+IEhUTUxFbGVtZW50O1xuXG4vKipcbiAqIFBhZ2luYXRpb24gY29tcG9uZW50IGZvciBtYW5hZ2luZyBhbmQgZGlzcGxheWluZyBwYWdlIG5hdmlnYXRpb24gY29udHJvbHMgd2l0aCB2YXJpb3VzIGxheW91dHMgYW5kIGN1c3RvbWl6YXRpb25zLlxuICpcbiAqIEBzZWxlY3RvciBhcHAtcGFnaW5hdGlvblxuICogQHN0YW5kYWxvbmUgdHJ1ZVxuICogQGltcG9ydHMgW0NvbW1vbk1vZHVsZSwgRm9udEF3ZXNvbWVNb2R1bGVdXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBUaGlzIGNvbXBvbmVudCByZW5kZXJzIHBhZ2luYXRpb24gY29udHJvbHMsIGFsbG93aW5nIHVzZXJzIHRvIG5hdmlnYXRlIHRocm91Z2ggcGFnZXMuIFRoZSBjb250cm9scyBzdXBwb3J0IGhvcml6b250YWwgYW5kIHZlcnRpY2FsIGxheW91dHMsIGN1c3RvbWl6YWJsZSBzdHlsZXMsIGFuZCBkeW5hbWljIHBhZ2UgY29udGVudCBoYW5kbGluZywgd2l0aCBzcGVjaWFsIHN1cHBvcnQgZm9yIGJyZWFrb3V0IHJvb20gbmF2aWdhdGlvbi5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgaHRtbFxuICogPGFwcC1wYWdpbmF0aW9uXG4gKiAgIFt0b3RhbFBhZ2VzXT1cIjEwXCJcbiAqICAgW2N1cnJlbnRVc2VyUGFnZV09XCIxXCJcbiAqICAgW2hhbmRsZVBhZ2VDaGFuZ2VdPVwiaGFuZGxlUGFnZUNoYW5nZVwiXG4gKiAgIFtwb3NpdGlvbl09XCInbWlkZGxlJ1wiXG4gKiAgIFtsb2NhdGlvbl09XCInYm90dG9tJ1wiXG4gKiAgIFtkaXJlY3Rpb25dPVwiJ2hvcml6b250YWwnXCJcbiAqICAgW2JhY2tncm91bmRDb2xvcl09XCInI2ZmZmZmZidcIlxuICogICBbcGFnaW5hdGlvbkhlaWdodF09XCI0MFwiXG4gKiAgIFtzaG93QXNwZWN0XT1cInRydWVcIlxuICogICBbcGFyYW1ldGVyc109XCJwYWdpbmF0aW9uUGFyYW1ldGVyc1wiPlxuICogPC9hcHAtcGFnaW5hdGlvbj5cbiAqIGBgYFxuICpcbiAqIEBpbnB1dCB7bnVtYmVyfSB0b3RhbFBhZ2VzIC0gVG90YWwgbnVtYmVyIG9mIHBhZ2VzIGF2YWlsYWJsZSBmb3IgbmF2aWdhdGlvbi5cbiAqIEBpbnB1dCB7bnVtYmVyfSBjdXJyZW50VXNlclBhZ2UgLSBDdXJyZW50IGFjdGl2ZSBwYWdlIG51bWJlci5cbiAqIEBpbnB1dCB7RnVuY3Rpb259IGhhbmRsZVBhZ2VDaGFuZ2UgLSBDYWxsYmFjayBmdW5jdGlvbiB0byBoYW5kbGUgcGFnZSBjaGFuZ2VzLlxuICogQGlucHV0IHsnbGVmdCcgfCAnbWlkZGxlJyB8ICdyaWdodCcgfCBzdHJpbmd9IHBvc2l0aW9uIC0gSG9yaXpvbnRhbCBwb3NpdGlvbiBvZiB0aGUgcGFnaW5hdGlvbiBjb250cm9scyAoZGVmYXVsdCBpcyAnbWlkZGxlJykuXG4gKiBAaW5wdXQgeyd0b3AnIHwgJ21pZGRsZScgfCAnYm90dG9tJyB8IHN0cmluZ30gbG9jYXRpb24gLSBWZXJ0aWNhbCBwb3NpdGlvbiBvZiB0aGUgcGFnaW5hdGlvbiBjb250cm9scyAoZGVmYXVsdCBpcyAnbWlkZGxlJykuXG4gKiBAaW5wdXQgeydob3Jpem9udGFsJyB8ICd2ZXJ0aWNhbCcgfCBzdHJpbmd9IGRpcmVjdGlvbiAtIExheW91dCBkaXJlY3Rpb24gb2YgdGhlIHBhZ2luYXRpb24gY29udHJvbHMgKGRlZmF1bHQgaXMgJ2hvcml6b250YWwnKS5cbiAqIEBpbnB1dCB7YW55fSBidXR0b25zQ29udGFpbmVyU3R5bGUgLSBDdXN0b20gQ1NTIHN0eWxlcyBmb3IgdGhlIGJ1dHRvbnMgY29udGFpbmVyLlxuICogQGlucHV0IHthbnl9IGFjdGl2ZVBhZ2VTdHlsZSAtIENTUyBzdHlsZXMgZm9yIHRoZSBhY3RpdmUgcGFnZSBidXR0b24uXG4gKiBAaW5wdXQge2FueX0gaW5hY3RpdmVQYWdlU3R5bGUgLSBDU1Mgc3R5bGVzIGZvciBpbmFjdGl2ZSBwYWdlIGJ1dHRvbnMuXG4gKiBAaW5wdXQge3N0cmluZ30gYmFja2dyb3VuZENvbG9yIC0gQmFja2dyb3VuZCBjb2xvciBmb3IgdGhlIHBhZ2luYXRpb24gY29udHJvbHMuXG4gKiBAaW5wdXQge251bWJlcn0gcGFnaW5hdGlvbkhlaWdodCAtIEhlaWdodCBvZiB0aGUgcGFnaW5hdGlvbiBjb250cm9scyBpbiBwaXhlbHMuXG4gKiBAaW5wdXQge2Jvb2xlYW59IHNob3dBc3BlY3QgLSBGbGFnIHRvIGRpc3BsYXkgb3IgaGlkZSB0aGUgcGFnaW5hdGlvbiBjb250cm9scy5cbiAqIEBpbnB1dCB7UGFnaW5hdGlvblBhcmFtZXRlcnN9IHBhcmFtZXRlcnMgLSBBZGRpdGlvbmFsIGNvbmZpZ3VyYXRpb24gcGFyYW1ldGVycyBmb3IgbWFuYWdpbmcgYnJlYWtvdXQgcm9vbXMgYW5kIHJlbGF0ZWQgc3RhdGUuXG4gKlxuICogQHByb3BlcnR5IHtudW1iZXJbXX0gZGF0YSAtIEFycmF5IHJlcHJlc2VudGluZyBwYWdlcyB0byBiZSBkaXNwbGF5ZWQgaW4gcGFnaW5hdGlvbiBjb250cm9scy5cbiAqIEBwcm9wZXJ0eSB7Q29tcG9uZW50U2l6ZXN9IGNvbXBvbmVudFNpemVzIC0gU3RvcmVzIGNhbGN1bGF0ZWQgc2l6ZXMgZm9yIHBhZ2luYXRpb24gY29udHJvbHMuXG4gKlxuICogQG1ldGhvZCBuZ09uSW5pdCAtIExpZmVjeWNsZSBob29rIHRoYXQgaW5pdGlhbGl6ZXMgdGhlIGNvbXBvbmVudCBhbmQgc2V0cyB1cCBwYWdlIGRhdGEuXG4gKiBAbWV0aG9kIG5nT25DaGFuZ2VzIC0gSGFuZGxlcyBpbnB1dCBwcm9wZXJ0eSBjaGFuZ2VzIHRvIHVwZGF0ZSBwYWdlIGRhdGEgd2hlbiBuZWVkZWQuXG4gKiBAbWV0aG9kIGhhbmRsZUNsaWNrIC0gQXN5bmNocm9ub3VzbHkgaGFuZGxlcyBwYWdlIGJ1dHRvbiBjbGlja3MgYW5kIG1hbmFnZXMgYnJlYWtvdXQgcm9vbSBuYXZpZ2F0aW9uIGxvZ2ljLlxuICogQG1ldGhvZCBnZXRQYWdlU3R5bGUgLSBSZXR1cm5zIHNwZWNpZmljIHN0eWxlcyBmb3IgYSBwYWdlIGJ1dHRvbiBiYXNlZCBvbiBpdHMgYWN0aXZlIG9yIGluYWN0aXZlIHN0YXRlLlxuICogQG1ldGhvZCBpc0JyZWFrb3V0Um9vbSAtIENoZWNrcyBpZiBhIHBhZ2UgcmVwcmVzZW50cyBhIGJyZWFrb3V0IHJvb20uXG4gKiBAbWV0aG9kIGdldERpc3BsYXlJdGVtIC0gUmV0dXJucyB0aGUgZGlzcGxheSBsYWJlbCBmb3IgYSBwYWdlLCBhY2NvdW50aW5nIGZvciBicmVha291dCByb29tIG5hbWluZyBjb252ZW50aW9ucy5cbiAqXG4gKiBAZGVwZW5kZW5jaWVzXG4gKiBUaGlzIGNvbXBvbmVudCByZXF1aXJlcyBhbiBleHRlcm5hbCBwYWdpbmF0aW9uIHBhcmFtZXRlcnMgY29uZmlndXJhdGlvbiAoYFBhZ2luYXRpb25QYXJhbWV0ZXJzYCkgYW5kIGFjY2VzcyB0byB0aGUgYEdlbmVyYXRlUGFnZUNvbnRlbnRgIHNlcnZpY2UgZm9yIG1hbmFnaW5nIGR5bmFtaWMgY29udGVudCBsb2FkaW5nLlxuICovXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1wYWdpbmF0aW9uJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgRm9udEF3ZXNvbWVNb2R1bGVdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXZcbiAgICAgIFtuZ1N0eWxlXT1cIntcbiAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiBiYWNrZ3JvdW5kQ29sb3IsXG4gICAgICAgICdqdXN0aWZ5LWNvbnRlbnQnOiBwb3NpdGlvbiA9PSAnbWlkZGxlJyA/ICdzcGFjZS1ldmVubHknIDogcG9zaXRpb24gPT0gJ2xlZnQnID8gJ2ZsZXgtc3RhcnQnIDogJ2ZsZXgtZW5kJyxcbiAgICAgICAgJ2FsaWduLWl0ZW1zJzogbG9jYXRpb24gPT0gJ21pZGRsZScgPyAnY2VudGVyJyA6IGxvY2F0aW9uID09ICd0b3AnID8gJ2ZsZXgtc3RhcnQnIDogJ2ZsZXgtZW5kJyxcbiAgICAgICAgJ3BhZGRpbmcnOiAnMCcsXG4gICAgICAgICdtYXJnaW4nOiAnMCcsXG4gICAgICAgICdtaW4taGVpZ2h0JzogZGlyZWN0aW9uID09ICdob3Jpem9udGFsJyA/IHBhZ2luYXRpb25IZWlnaHQgKyAncHgnIDogY29tcG9uZW50U2l6ZXMub3RoZXJIZWlnaHQgKyAncHgnLFxuICAgICAgICAnbWluLXdpZHRoJzogZGlyZWN0aW9uID09ICdob3Jpem9udGFsJyA/IGNvbXBvbmVudFNpemVzLm90aGVyV2lkdGggKyAncHgnIDogcGFnaW5hdGlvbkhlaWdodCArICdweCcsXG4gICAgICAgICd3aWR0aCc6IGRpcmVjdGlvbiA9PSAnaG9yaXpvbnRhbCcgPyAnMTAwJScgOiBwYWdpbmF0aW9uSGVpZ2h0ICsgJ3B4JyxcbiAgICAgICAgJ2hlaWdodCc6IGRpcmVjdGlvbiA9PSAnaG9yaXpvbnRhbCcgPyBwYWdpbmF0aW9uSGVpZ2h0ICsgJ3B4JyA6ICcxMDAlJyxcbiAgICAgICAgJ2Rpc3BsYXknOiBzaG93QXNwZWN0ID8gJ2ZsZXgnIDogJ25vbmUnLFxuICAgICAgICAnbWF4LWhlaWdodCc6IGRpcmVjdGlvbiA9PSAnaG9yaXpvbnRhbCcgPyBwYWdpbmF0aW9uSGVpZ2h0ICsgJ3B4JyA6ICcxMDAlJyxcbiAgICAgICAgJ21heC13aWR0aCc6IGRpcmVjdGlvbiA9PSAnaG9yaXpvbnRhbCcgPyAnMTAwJScgOiBwYWdpbmF0aW9uSGVpZ2h0ICsgJ3B4JyxcbiAgICAgICAgJ2ZsZXgtZGlyZWN0aW9uJzogZGlyZWN0aW9uID09ICd2ZXJ0aWNhbCcgPyAnY29sdW1uJyA6ICdyb3cnLFxuICAgICAgICAnb3ZlcmZsb3cteCc6ICdhdXRvJyxcbiAgICAgIH1cIlxuICAgID5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGl0ZW0gb2YgZGF0YTsgbGV0IGluZGV4ID0gaW5kZXhcIj5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICpuZ0lmPVwiaXRlbSA9PSAwXCJcbiAgICAgICAgICBbbmdDbGFzc109XCJ7IGFjdGl2ZTogaXRlbSA9PSBjdXJyZW50VXNlclBhZ2UgfVwiXG4gICAgICAgICAgW25nU3R5bGVdPVwiZ2V0UGFnZVN0eWxlKGl0ZW0pXCJcbiAgICAgICAgICAoY2xpY2spPVwiaGFuZGxlQ2xpY2soaXRlbSlcIlxuICAgICAgICA+XG4gICAgICAgICAgPGZhLWljb25cbiAgICAgICAgICAgIFtpY29uXT1cImZhU3RhclwiXG4gICAgICAgICAgICBzaXplPVwibGdcIlxuICAgICAgICAgICAgW3N0eWxlLmNvbG9yXT1cIml0ZW0gPT0gY3VycmVudFVzZXJQYWdlID8gJ3llbGxvdycgOiAnZ3JheSdcIlxuICAgICAgICAgID48L2ZhLWljb24+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgKm5nSWY9XCJpdGVtICE9PSAwXCJcbiAgICAgICAgICBbbmdDbGFzc109XCJ7IGFjdGl2ZTogaXRlbSA9PSBjdXJyZW50VXNlclBhZ2UgfVwiXG4gICAgICAgICAgW25nU3R5bGVdPVwiZ2V0UGFnZVN0eWxlKGl0ZW0pXCJcbiAgICAgICAgICAoY2xpY2spPVwiaGFuZGxlQ2xpY2soaXRlbSlcIlxuICAgICAgICA+XG4gICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICpuZ0lmPVwiIWlzQnJlYWtvdXRSb29tKGl0ZW0pXCJcbiAgICAgICAgICAgIGNsYXNzPVwicGFnZVRleHRcIlxuICAgICAgICAgICAgW25nU3R5bGVdPVwieyBjb2xvcjogaXRlbSA9PSBjdXJyZW50VXNlclBhZ2UgPyAnI2ZmZmZmZicgOiAnIzAwMDAwMCcgfVwiXG4gICAgICAgICAgICA+e3sgaXRlbSB9fTwvc3BhblxuICAgICAgICAgID5cbiAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgKm5nSWY9XCJpc0JyZWFrb3V0Um9vbShpdGVtKVwiXG4gICAgICAgICAgICBjbGFzcz1cInBhZ2VUZXh0XCJcbiAgICAgICAgICAgIFtuZ1N0eWxlXT1cInsgY29sb3I6IGl0ZW0gPT0gY3VycmVudFVzZXJQYWdlID8gJyNmZmZmZmYnIDogJyMwMDAwMDAnIH1cIlxuICAgICAgICAgICAgPnt7IGdldERpc3BsYXlJdGVtKGl0ZW0pIH19XG4gICAgICAgICAgICA8ZmEtaWNvblxuICAgICAgICAgICAgICAqbmdJZj1cIlxuICAgICAgICAgICAgICAgIHBhcmFtZXRlcnMubWVtYmVyUm9vbSArIDEgIT09IGl0ZW0gLSAocGFyYW1ldGVycy5tYWluUm9vbXNMZW5ndGggLSAxKSAmJlxuICAgICAgICAgICAgICAgIHBhcmFtZXRlcnMuaXNsZXZlbCAhPT0gJzInXG4gICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgIFtpY29uXT1cImZhTG9ja1wiXG4gICAgICAgICAgICA+PC9mYS1pY29uXG4gICAgICAgICAgPjwvc3Bhbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgc3R5bGVzOiBbXG4gICAgYFxuICAgICAgLnBhZ2VCdXR0b24uYWN0aXZlIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzJjNjc4ZjtcbiAgICAgIH1cbiAgICBgLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBQYWdpbmF0aW9uIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICBASW5wdXQoKSB0b3RhbFBhZ2VzID0gMDtcbiAgQElucHV0KCkgY3VycmVudFVzZXJQYWdlID0gMDtcbiAgQElucHV0KCkgaGFuZGxlUGFnZUNoYW5nZSE6IChvcHRpb25zOiBhbnkpID0+IFByb21pc2U8dm9pZD47XG4gIEBJbnB1dCgpIHBvc2l0aW9uOiAnbGVmdCcgfCAnbWlkZGxlJyB8ICdyaWdodCcgfCBzdHJpbmcgPSAnbWlkZGxlJztcbiAgQElucHV0KCkgbG9jYXRpb246ICd0b3AnIHwgJ21pZGRsZScgfCAnYm90dG9tJyB8IHN0cmluZyA9ICdtaWRkbGUnO1xuICBASW5wdXQoKSBkaXJlY3Rpb246ICdob3Jpem9udGFsJyB8ICd2ZXJ0aWNhbCcgPSAnaG9yaXpvbnRhbCc7XG4gIEBJbnB1dCgpIGJ1dHRvbnNDb250YWluZXJTdHlsZTogYW55ID0ge307XG4gIEBJbnB1dCgpIGFjdGl2ZVBhZ2VTdHlsZTogYW55ID0geyBiYWNrZ3JvdW5kQ29sb3I6ICcjMmM2NzhmJyB9O1xuICBASW5wdXQoKSBpbmFjdGl2ZVBhZ2VTdHlsZTogYW55ID0ge307XG4gIEBJbnB1dCgpIGJhY2tncm91bmRDb2xvciA9ICcjZmZmZmZmJztcbiAgQElucHV0KCkgcGFnaW5hdGlvbkhlaWdodCA9IDQwO1xuICBASW5wdXQoKSBzaG93QXNwZWN0ID0gdHJ1ZTtcbiAgQElucHV0KCkgcGFyYW1ldGVyczogUGFnaW5hdGlvblBhcmFtZXRlcnMgPSB7fSBhcyBQYWdpbmF0aW9uUGFyYW1ldGVycztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGdlbmVyYXRlUGFnZUNvbnRlbnRTZXJ2aWNlOiBHZW5lcmF0ZVBhZ2VDb250ZW50KSB7fVxuXG4gIGZhU3RhciA9IGZhU3RhcjtcbiAgZmFMb2NrID0gZmFMb2NrO1xuXG4gIGRhdGE6IG51bWJlcltdID0gW107XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5kYXRhID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogdGhpcy50b3RhbFBhZ2VzICsgMSB9LCAoXywgaW5kZXgpID0+IGluZGV4KTtcbiAgICB0aGlzLmNvbXBvbmVudFNpemVzID0gdGhpcy5wYXJhbWV0ZXJzLmNvbXBvbmVudFNpemVzO1xuICAgIGlmICghdGhpcy5oYW5kbGVQYWdlQ2hhbmdlKSB7XG4gICAgICB0aGlzLmhhbmRsZVBhZ2VDaGFuZ2UgPSB0aGlzLmdlbmVyYXRlUGFnZUNvbnRlbnRTZXJ2aWNlLmdlbmVyYXRlUGFnZUNvbnRlbnQuYmluZChcbiAgICAgICAgdGhpcy5nZW5lcmF0ZVBhZ2VDb250ZW50U2VydmljZSxcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzWyd0b3RhbFBhZ2VzJ10gfHwgY2hhbmdlc1snY3VycmVudFVzZXJQYWdlJ10pIHtcbiAgICAgIHRoaXMuZGF0YSA9IEFycmF5LmZyb20oeyBsZW5ndGg6IHRoaXMudG90YWxQYWdlcyArIDEgfSwgKF8sIGluZGV4KSA9PiBpbmRleCk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlQ2xpY2sgPSBhc3luYyAocGFnZTogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgaWYgKHBhZ2UgPT0gdGhpcy5jdXJyZW50VXNlclBhZ2UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnBhcmFtZXRlcnMgPSB0aGlzLnBhcmFtZXRlcnMuZ2V0VXBkYXRlZEFsbFBhcmFtcygpO1xuICAgIGNvbnN0IHBhcmFtcyA9IHsgLi4udGhpcy5wYXJhbWV0ZXJzIH07XG4gICAgdGhpcy5jb21wb25lbnRTaXplcyA9IHBhcmFtcy5jb21wb25lbnRTaXplcztcblxuICAgIGlmICh0aGlzLnBhcmFtZXRlcnMuYnJlYWtPdXRSb29tU3RhcnRlZCAmJiAhdGhpcy5wYXJhbWV0ZXJzLmJyZWFrT3V0Um9vbUVuZGVkICYmIHBhZ2UgIT09IDApIHtcbiAgICAgIGNvbnN0IHJvb21NZW1iZXIgPSB0aGlzLnBhcmFtZXRlcnMuYnJlYWtvdXRSb29tcy5maW5kKChyOiBhbnlbXSkgPT5cbiAgICAgICAgci5maW5kKChwKSA9PiBwLm5hbWUgPT0gdGhpcy5wYXJhbWV0ZXJzLm1lbWJlciksXG4gICAgICApO1xuICAgICAgY29uc3QgcGFnZUludCA9IHBhZ2UgLSB0aGlzLnBhcmFtZXRlcnMubWFpblJvb21zTGVuZ3RoO1xuICAgICAgbGV0IG1lbWJlckJyZWFrUm9vbSA9IC0xO1xuICAgICAgaWYgKHJvb21NZW1iZXIpIHtcbiAgICAgICAgbWVtYmVyQnJlYWtSb29tID0gdGhpcy5wYXJhbWV0ZXJzLmJyZWFrb3V0Um9vbXMuaW5kZXhPZihyb29tTWVtYmVyKTtcbiAgICAgIH1cblxuICAgICAgaWYgKChtZW1iZXJCcmVha1Jvb20gPT0gLTEgfHwgbWVtYmVyQnJlYWtSb29tICE9PSBwYWdlSW50KSAmJiBwYWdlSW50ID49IDApIHtcbiAgICAgICAgaWYgKHRoaXMucGFyYW1ldGVycy5pc2xldmVsICE9PSAnMicpIHtcbiAgICAgICAgICBpZiAodGhpcy5wYXJhbWV0ZXJzLnNob3dBbGVydCkge1xuICAgICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLnNob3dBbGVydCh7XG4gICAgICAgICAgICAgIG1lc3NhZ2U6IGBZb3UgYXJlIG5vdCBwYXJ0IG9mIHRoZSBicmVha291dCByb29tICR7cGFnZUludCArIDF9LmAsXG4gICAgICAgICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGF3YWl0IHRoaXMuaGFuZGxlUGFnZUNoYW5nZSh7XG4gICAgICAgICAgcGFnZSxcbiAgICAgICAgICBwYXJhbWV0ZXJzOiBwYXJhbXMsXG4gICAgICAgICAgYnJlYWtSb29tOiBwYWdlSW50LFxuICAgICAgICAgIGluQnJlYWtSb29tOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHRoaXMucGFyYW1ldGVycy5ob3N0TmV3Um9vbSAhPT0gcGFnZUludCkge1xuICAgICAgICAgIHRoaXMucGFyYW1ldGVycy5zb2NrZXQuZW1pdCgndXBkYXRlSG9zdEJyZWFrb3V0Jywge1xuICAgICAgICAgICAgbmV3Um9vbTogcGFnZUludCxcbiAgICAgICAgICAgIHJvb21OYW1lOiB0aGlzLnBhcmFtZXRlcnMucm9vbU5hbWUsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGF3YWl0IHRoaXMuaGFuZGxlUGFnZUNoYW5nZSh7XG4gICAgICAgICAgcGFnZSxcbiAgICAgICAgICBwYXJhbWV0ZXJzOiBwYXJhbXMsXG4gICAgICAgICAgYnJlYWtSb29tOiBwYWdlSW50LFxuICAgICAgICAgIGluQnJlYWtSb29tOiBwYWdlSW50ID49IDAsXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAodGhpcy5wYXJhbWV0ZXJzLmlzbGV2ZWwgPT0gJzInICYmIHRoaXMucGFyYW1ldGVycy5ob3N0TmV3Um9vbSAhPT0gLTEpIHtcbiAgICAgICAgICB0aGlzLnBhcmFtZXRlcnMuc29ja2V0LmVtaXQoJ3VwZGF0ZUhvc3RCcmVha291dCcsIHtcbiAgICAgICAgICAgIHByZXZSb29tOiB0aGlzLnBhcmFtZXRlcnMuaG9zdE5ld1Jvb20sXG4gICAgICAgICAgICBuZXdSb29tOiAtMSxcbiAgICAgICAgICAgIHJvb21OYW1lOiB0aGlzLnBhcmFtZXRlcnMucm9vbU5hbWUsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgYXdhaXQgdGhpcy5oYW5kbGVQYWdlQ2hhbmdlKHsgcGFnZSwgcGFyYW1ldGVyczogcGFyYW1zLCBicmVha1Jvb206IDAsIGluQnJlYWtSb29tOiBmYWxzZSB9KTtcbiAgICAgIGlmICh0aGlzLnBhcmFtZXRlcnMuaXNsZXZlbCA9PSAnMicgJiYgdGhpcy5wYXJhbWV0ZXJzLmhvc3ROZXdSb29tICE9PSAtMSkge1xuICAgICAgICB0aGlzLnBhcmFtZXRlcnMuc29ja2V0LmVtaXQoJ3VwZGF0ZUhvc3RCcmVha291dCcsIHtcbiAgICAgICAgICBwcmV2Um9vbTogdGhpcy5wYXJhbWV0ZXJzLmhvc3ROZXdSb29tLFxuICAgICAgICAgIG5ld1Jvb206IC0xLFxuICAgICAgICAgIHJvb21OYW1lOiB0aGlzLnBhcmFtZXRlcnMucm9vbU5hbWUsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb21wb25lbnRTaXplczogQ29tcG9uZW50U2l6ZXMgPSB7fSBhcyBDb21wb25lbnRTaXplcztcblxuICBnZXRQYWdlU3R5bGUoaXRlbTogbnVtYmVyKSB7XG4gICAgcmV0dXJuIGl0ZW0gPT0gdGhpcy5jdXJyZW50VXNlclBhZ2UgPyB0aGlzLmFjdGl2ZVBhZ2VTdHlsZSA6IHRoaXMuaW5hY3RpdmVQYWdlU3R5bGU7XG4gIH1cblxuICBpc0JyZWFrb3V0Um9vbSA9IChpdGVtOiBudW1iZXIpOiBib29sZWFuID0+IHtcbiAgICB0aGlzLnBhcmFtZXRlcnMgPSB0aGlzLnBhcmFtZXRlcnMuZ2V0VXBkYXRlZEFsbFBhcmFtcygpO1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLnBhcmFtZXRlcnMuYnJlYWtPdXRSb29tU3RhcnRlZCAmJlxuICAgICAgIXRoaXMucGFyYW1ldGVycy5icmVha091dFJvb21FbmRlZCAmJlxuICAgICAgaXRlbSA+PSB0aGlzLnBhcmFtZXRlcnMubWFpblJvb21zTGVuZ3RoXG4gICAgKTtcbiAgfTtcblxuICBnZXREaXNwbGF5SXRlbShpdGVtOiBudW1iZXIpIHtcbiAgICBjb25zdCByb29tTnVtYmVyID0gaXRlbSAtICh0aGlzLnBhcmFtZXRlcnMubWFpblJvb21zTGVuZ3RoIC0gMSk7XG5cbiAgICBpZiAodGhpcy5pc0JyZWFrb3V0Um9vbShpdGVtKSkge1xuICAgICAgaWYgKHRoaXMucGFyYW1ldGVycy5tZW1iZXJSb29tICsgMSAhPT0gcm9vbU51bWJlcikge1xuICAgICAgICByZXR1cm4gYFJvb20gJHtyb29tTnVtYmVyfWA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gYFJvb20gJHtyb29tTnVtYmVyfWA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGl0ZW0udG9TdHJpbmcoKTtcbiAgfVxufVxuIl19