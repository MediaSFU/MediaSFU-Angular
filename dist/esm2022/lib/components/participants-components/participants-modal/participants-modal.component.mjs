import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ParticipantList } from '../participant-list/participant-list.component';
import { ParticipantListOthers } from '../participant-list-others/participant-list-others.component';
import * as i0 from "@angular/core";
import * as i1 from "../../../methods/participants-methods/mute-participants.service";
import * as i2 from "../../../methods/participants-methods/message-participants.service";
import * as i3 from "../../../methods/participants-methods/remove-participants.service";
import * as i4 from "@angular/common";
import * as i5 from "@fortawesome/angular-fontawesome";
export class ParticipantsModal {
    muteParticipantsService;
    messageParticipantsService;
    removeParticipantsService;
    isParticipantsModalVisible = false;
    onParticipantsClose;
    onParticipantsFilterChange;
    participantsCounter = 0;
    onMuteParticipants;
    onMessageParticipants;
    onRemoveParticipants;
    parameters = {};
    position = 'topRight';
    backgroundColor = '#83c0e9';
    participant_s = [];
    participantsCounter_s = 0;
    reRender = false;
    faTimes = faTimes;
    constructor(muteParticipantsService, messageParticipantsService, removeParticipantsService) {
        this.muteParticipantsService = muteParticipantsService;
        this.messageParticipantsService = messageParticipantsService;
        this.removeParticipantsService = removeParticipantsService;
    }
    ngOnInit() {
        this.updateParticipantsData();
        if (!this.onMuteParticipants) {
            this.onMuteParticipants = this.muteParticipantsService.muteParticipants.bind(this.muteParticipantsService);
        }
        if (!this.onMessageParticipants) {
            this.onMessageParticipants = this.messageParticipantsService.messageParticipants.bind(this.messageParticipantsService);
        }
        if (!this.onRemoveParticipants) {
            this.onRemoveParticipants = this.removeParticipantsService.removeParticipants.bind(this.removeParticipantsService);
        }
    }
    ngOnChanges(changes) {
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
    handleFilterChange(event) {
        const inputElement = event.target;
        const filterValue = inputElement.value;
        this.onParticipantsFilterChange(filterValue);
        this.reRender = !this.reRender;
    }
    handleClose() {
        this.onParticipantsClose();
    }
    canShowParticipantList() {
        const participantsValue = this.parameters.coHostResponsibility?.find((item) => item.name === 'participants')?.value;
        return (this.parameters.islevel === '2' ||
            (this.parameters.coHost === this.parameters.member && participantsValue === true));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ParticipantsModal, deps: [{ token: i1.MuteParticipants }, { token: i2.MessageParticipants }, { token: i3.RemoveParticipants }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.8", type: ParticipantsModal, isStandalone: true, selector: "app-participants-modal", inputs: { isParticipantsModalVisible: "isParticipantsModalVisible", onParticipantsClose: "onParticipantsClose", onParticipantsFilterChange: "onParticipantsFilterChange", participantsCounter: "participantsCounter", onMuteParticipants: "onMuteParticipants", onMessageParticipants: "onMessageParticipants", onRemoveParticipants: "onRemoveParticipants", parameters: "parameters", position: "position", backgroundColor: "backgroundColor" }, usesOnChanges: true, ngImport: i0, template: "<div *ngIf=\"isParticipantsModalVisible\" class=\"modal-container\" [ngStyle]=\"{'background-color': 'rgba(0, 0, 0, 0.5)'}\">\r\n  <div class=\"modal-content\" [ngStyle]=\"{'background-color': backgroundColor, 'top': position.includes('top') ? '10px' : 'auto', 'bottom': position.includes('bottom') ? '10px' : 'auto', 'left': position.includes('Left') ? '10px' : 'auto', 'right': position.includes('Right') ? '10px' : 'auto'}\">\r\n    <div class=\"modal-header\">\r\n      <div>\r\n        Participants <span class=\"badge\">{{ participantsCounter_s }}</span>\r\n      </div>\r\n      <div class=\"close-icon\" (click)=\"handleClose()\">\r\n        <fa-icon [icon]=\"faTimes\" size=\"xl\"></fa-icon>\r\n      </div>\r\n    </div>\r\n    <div class=\"modal-body\">\r\n      <input type=\"text\" class=\"filter-input\" placeholder=\"Search ...\" (input)=\"handleFilterChange($event)\">\r\n      <ng-container *ngIf=\"parameters.participants\">\r\n        <ng-container *ngIf=\"canShowParticipantList()\">\r\n          <app-participant-list\r\n            [participants]=\"participant_s\"\r\n            [isBroadcast]=\"parameters.eventType === 'broadcast'\"\r\n            [onMuteParticipants]=\"onMuteParticipants\"\r\n            [onMessageParticipants]=\"onMessageParticipants\"\r\n            [onRemoveParticipants]=\"onRemoveParticipants\"\r\n            [socket]=\"parameters.socket\"\r\n            [coHostResponsibility]=\"parameters.coHostResponsibility\"\r\n            [coHost]=\"parameters.coHost\"\r\n            [member]=\"parameters.member\"\r\n            [islevel]=\"parameters.islevel\"\r\n            [roomName]=\"parameters.roomName\"\r\n            [updateIsMessagesModalVisible]=\"parameters.updateIsMessagesModalVisible\"\r\n            [updateStartDirectMessage]=\"parameters.updateStartDirectMessage\"\r\n            [updateDirectMessageDetails]=\"parameters.updateDirectMessageDetails\"\r\n            [updateParticipants]=\"parameters.updateParticipants\"\r\n          >\r\n          </app-participant-list>\r\n        </ng-container>\r\n        <ng-container *ngIf=\"!canShowParticipantList()\">\r\n          <app-participant-list-others\r\n            [participants]=\"participant_s\"\r\n            [coHost]=\"parameters.coHost\"\r\n            [member]=\"parameters.member\"\r\n            >\r\n          </app-participant-list-others>\r\n        </ng-container>\r\n      </ng-container>\r\n      <div *ngIf=\"!parameters.participants\">No participants</div>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [".modal-container{position:fixed;top:0;left:0;width:100%;height:100%;display:block;z-index:999}.modal-content{position:fixed;border-radius:10px;padding:10px;width:80%;max-width:400px;max-height:75%;overflow-y:auto}.modal-header{display:flex;justify-content:space-between;align-items:center}.badge{background-color:#fff;color:#000;border-radius:10px;padding:5px}.close-icon{padding:5px;cursor:pointer}.modal-body{margin-top:10px}.filter-input{width:90%;padding:10px;border-radius:5px;border:1px solid #000;font-size:16px;margin-bottom:10px}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i4.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "ngmodule", type: FontAwesomeModule }, { kind: "component", type: i5.FaIconComponent, selector: "fa-icon", inputs: ["icon", "title", "animation", "mask", "flip", "size", "pull", "border", "inverse", "symbol", "rotate", "fixedWidth", "transform", "a11yRole"] }, { kind: "component", type: ParticipantList, selector: "app-participant-list", inputs: ["participants", "isBroadcast", "onMuteParticipants", "onMessageParticipants", "onRemoveParticipants", "socket", "coHostResponsibility", "member", "islevel", "showAlert", "coHost", "roomName", "updateIsMessagesModalVisible", "updateDirectMessageDetails", "updateStartDirectMessage", "updateParticipants"] }, { kind: "component", type: ParticipantListOthers, selector: "app-participant-list-others", inputs: ["participants", "coHost", "member"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ParticipantsModal, decorators: [{
            type: Component,
            args: [{ selector: 'app-participants-modal', standalone: true, imports: [CommonModule, FontAwesomeModule, ParticipantList, ParticipantListOthers], template: "<div *ngIf=\"isParticipantsModalVisible\" class=\"modal-container\" [ngStyle]=\"{'background-color': 'rgba(0, 0, 0, 0.5)'}\">\r\n  <div class=\"modal-content\" [ngStyle]=\"{'background-color': backgroundColor, 'top': position.includes('top') ? '10px' : 'auto', 'bottom': position.includes('bottom') ? '10px' : 'auto', 'left': position.includes('Left') ? '10px' : 'auto', 'right': position.includes('Right') ? '10px' : 'auto'}\">\r\n    <div class=\"modal-header\">\r\n      <div>\r\n        Participants <span class=\"badge\">{{ participantsCounter_s }}</span>\r\n      </div>\r\n      <div class=\"close-icon\" (click)=\"handleClose()\">\r\n        <fa-icon [icon]=\"faTimes\" size=\"xl\"></fa-icon>\r\n      </div>\r\n    </div>\r\n    <div class=\"modal-body\">\r\n      <input type=\"text\" class=\"filter-input\" placeholder=\"Search ...\" (input)=\"handleFilterChange($event)\">\r\n      <ng-container *ngIf=\"parameters.participants\">\r\n        <ng-container *ngIf=\"canShowParticipantList()\">\r\n          <app-participant-list\r\n            [participants]=\"participant_s\"\r\n            [isBroadcast]=\"parameters.eventType === 'broadcast'\"\r\n            [onMuteParticipants]=\"onMuteParticipants\"\r\n            [onMessageParticipants]=\"onMessageParticipants\"\r\n            [onRemoveParticipants]=\"onRemoveParticipants\"\r\n            [socket]=\"parameters.socket\"\r\n            [coHostResponsibility]=\"parameters.coHostResponsibility\"\r\n            [coHost]=\"parameters.coHost\"\r\n            [member]=\"parameters.member\"\r\n            [islevel]=\"parameters.islevel\"\r\n            [roomName]=\"parameters.roomName\"\r\n            [updateIsMessagesModalVisible]=\"parameters.updateIsMessagesModalVisible\"\r\n            [updateStartDirectMessage]=\"parameters.updateStartDirectMessage\"\r\n            [updateDirectMessageDetails]=\"parameters.updateDirectMessageDetails\"\r\n            [updateParticipants]=\"parameters.updateParticipants\"\r\n          >\r\n          </app-participant-list>\r\n        </ng-container>\r\n        <ng-container *ngIf=\"!canShowParticipantList()\">\r\n          <app-participant-list-others\r\n            [participants]=\"participant_s\"\r\n            [coHost]=\"parameters.coHost\"\r\n            [member]=\"parameters.member\"\r\n            >\r\n          </app-participant-list-others>\r\n        </ng-container>\r\n      </ng-container>\r\n      <div *ngIf=\"!parameters.participants\">No participants</div>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [".modal-container{position:fixed;top:0;left:0;width:100%;height:100%;display:block;z-index:999}.modal-content{position:fixed;border-radius:10px;padding:10px;width:80%;max-width:400px;max-height:75%;overflow-y:auto}.modal-header{display:flex;justify-content:space-between;align-items:center}.badge{background-color:#fff;color:#000;border-radius:10px;padding:5px}.close-icon{padding:5px;cursor:pointer}.modal-body{margin-top:10px}.filter-input{width:90%;padding:10px;border-radius:5px;border:1px solid #000;font-size:16px;margin-bottom:10px}\n"] }]
        }], ctorParameters: () => [{ type: i1.MuteParticipants }, { type: i2.MessageParticipants }, { type: i3.RemoveParticipants }], propDecorators: { isParticipantsModalVisible: [{
                type: Input
            }], onParticipantsClose: [{
                type: Input
            }], onParticipantsFilterChange: [{
                type: Input
            }], participantsCounter: [{
                type: Input
            }], onMuteParticipants: [{
                type: Input
            }], onMessageParticipants: [{
                type: Input
            }], onRemoveParticipants: [{
                type: Input
            }], parameters: [{
                type: Input
            }], position: [{
                type: Input
            }], backgroundColor: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFydGljaXBhbnRzLW1vZGFsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb21wb25lbnRzL3BhcnRpY2lwYW50cy1jb21wb25lbnRzL3BhcnRpY2lwYW50cy1tb2RhbC9wYXJ0aWNpcGFudHMtbW9kYWwuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL2NvbXBvbmVudHMvcGFydGljaXBhbnRzLWNvbXBvbmVudHMvcGFydGljaXBhbnRzLW1vZGFsL3BhcnRpY2lwYW50cy1tb2RhbC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBb0MsTUFBTSxlQUFlLENBQUM7QUFDbkYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUU1RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDakYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sOERBQThELENBQUM7Ozs7Ozs7QUE4RHJHLE1BQU0sT0FBTyxpQkFBaUI7SUFtQmxCO0lBQ0E7SUFDQTtJQXBCRCwwQkFBMEIsR0FBRyxLQUFLLENBQUM7SUFDbkMsbUJBQW1CLENBQWM7SUFDakMsMEJBQTBCLENBQTRCO0lBQ3RELG1CQUFtQixHQUFHLENBQUMsQ0FBQztJQUN4QixrQkFBa0IsQ0FBdUQ7SUFDekUscUJBQXFCLENBQWlEO0lBQ3RFLG9CQUFvQixDQUF5RDtJQUM3RSxVQUFVLEdBQWdDLEVBQWlDLENBQUM7SUFDNUUsUUFBUSxH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QWlCLDJoQkNwRTlCLGsrRUE4Q0EscWxCRGtCWSxZQUFZLHVOQUFFLGlCQUFpQiw2UEFBRSxlQUFlLDJYQUFFLHFCQUFxQjs7MkZBSXRFLGlCQUFpQjtrQkFQN0IsU0FBUzsrQkFDRSx3QkFBd0IsY0FDdEIsSUFBSSxXQUNQLENBQUMsWUFBWSxFQUFFLGlCQUFpQixFQUFFLGVBQWUsRUFBRSxxQkFBcUIsQ0FBQzt3SkFLekUsMEJBQTBCO3NCQUFsQyxLQUFLO2dCQUNHLG1CQUFtQjtzQkFBM0IsS0FBSztnQkFDRywwQkFBMEI7c0JBQWxDLEtBQUs7Z0JBQ0csbUJBQW1CO3NCQUEzQixLQUFLO2dCQUNHLGtCQUFrQjtzQkFBMUIsS0FBSztnQkFDRyxxQkFBcUI7c0JBQTdCLEtBQUs7Z0JBQ0csb0JBQW9CO3NCQUE1QixLQUFLO2dCQUNHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxlQUFlO3NCQUF2QixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb250QXdlc29tZU1vZHVsZSB9IGZyb20gJ0Bmb3J0YXdlc29tZS9hbmd1bGFyLWZvbnRhd2Vzb21lJztcbmltcG9ydCB7IGZhVGltZXMgfSBmcm9tICdAZm9ydGF3ZXNvbWUvZnJlZS1zb2xpZC1zdmctaWNvbnMnO1xuaW1wb3J0IHsgQ29Ib3N0UmVzcG9uc2liaWxpdHksIEV2ZW50VHlwZSwgUGFydGljaXBhbnQsIFNob3dBbGVydCB9IGZyb20gJy4uLy4uLy4uL0B0eXBlcy90eXBlcyc7XG5pbXBvcnQgeyBQYXJ0aWNpcGFudExpc3QgfSBmcm9tICcuLi9wYXJ0aWNpcGFudC1saXN0L3BhcnRpY2lwYW50LWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7IFBhcnRpY2lwYW50TGlzdE90aGVycyB9IGZyb20gJy4uL3BhcnRpY2lwYW50LWxpc3Qtb3RoZXJzL3BhcnRpY2lwYW50LWxpc3Qtb3RoZXJzLmNvbXBvbmVudCc7XG5pbXBvcnQge1xuICBNdXRlUGFydGljaXBhbnRzLFxuICBNdXRlUGFydGljaXBhbnRzT3B0aW9ucyxcbn0gZnJvbSAnLi4vLi4vLi4vbWV0aG9kcy9wYXJ0aWNpcGFudHMtbWV0aG9kcy9tdXRlLXBhcnRpY2lwYW50cy5zZXJ2aWNlJztcbmltcG9ydCB7XG4gIE1lc3NhZ2VQYXJ0aWNpcGFudHMsXG4gIE1lc3NhZ2VQYXJ0aWNpcGFudHNPcHRpb25zLFxufSBmcm9tICcuLi8uLi8uLi9tZXRob2RzL3BhcnRpY2lwYW50cy1tZXRob2RzL21lc3NhZ2UtcGFydGljaXBhbnRzLnNlcnZpY2UnO1xuaW1wb3J0IHtcbiAgUmVtb3ZlUGFydGljaXBhbnRzLFxuICBSZW1vdmVQYXJ0aWNpcGFudHNPcHRpb25zLFxufSBmcm9tICcuLi8uLi8uLi9tZXRob2RzL3BhcnRpY2lwYW50cy1tZXRob2RzL3JlbW92ZS1wYXJ0aWNpcGFudHMuc2VydmljZSc7XG5pbXBvcnQgeyBTb2NrZXQgfSBmcm9tICdzb2NrZXQuaW8tY2xpZW50JztcblxuZXhwb3J0IGludGVyZmFjZSBQYXJ0aWNpcGFudHNNb2RhbFBhcmFtZXRlcnMge1xuICBwb3NpdGlvbj86IHN0cmluZztcbiAgYmFja2dyb3VuZENvbG9yPzogc3RyaW5nO1xuICBjb0hvc3RSZXNwb25zaWJpbGl0eTogQ29Ib3N0UmVzcG9uc2liaWxpdHlbXTtcbiAgY29Ib3N0OiBzdHJpbmc7XG4gIG1lbWJlcjogc3RyaW5nO1xuICBpc2xldmVsOiBzdHJpbmc7XG4gIHBhcnRpY2lwYW50czogUGFydGljaXBhbnRbXTtcbiAgZXZlbnRUeXBlOiBFdmVudFR5cGU7XG4gIGZpbHRlcmVkUGFydGljaXBhbnRzOiBQYXJ0aWNpcGFudFtdO1xuICBzb2NrZXQ6IFNvY2tldDtcbiAgc2hvd0FsZXJ0PzogU2hvd0FsZXJ0O1xuICByb29tTmFtZTogc3RyaW5nO1xuICB1cGRhdGVJc01lc3NhZ2VzTW9kYWxWaXNpYmxlOiAoaXNWaXNpYmxlOiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVEaXJlY3RNZXNzYWdlRGV0YWlsczogKHBhcnRpY2lwYW50OiBQYXJ0aWNpcGFudCB8IG51bGwpID0+IHZvaWQ7XG4gIHVwZGF0ZVN0YXJ0RGlyZWN0TWVzc2FnZTogKHN0YXJ0OiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVQYXJ0aWNpcGFudHM6IChwYXJ0aWNpcGFudHM6IFBhcnRpY2lwYW50W10pID0+IHZvaWQ7XG5cbiAgLy9tZWRpYXNmdSBmdW5jdGlvbnNcbiAgZ2V0VXBkYXRlZEFsbFBhcmFtczogKCkgPT4gUGFydGljaXBhbnRzTW9kYWxQYXJhbWV0ZXJzO1xuICBba2V5OiBzdHJpbmddOiBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGFydGljaXBhbnRzTW9kYWxPcHRpb25zIHtcbiAgaXNQYXJ0aWNpcGFudHNNb2RhbFZpc2libGU6IGJvb2xlYW47XG4gIG9uUGFydGljaXBhbnRzQ2xvc2U6ICgpID0+IHZvaWQ7XG4gIG9uUGFydGljaXBhbnRzRmlsdGVyQ2hhbmdlOiAoZmlsdGVyOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHBhcnRpY2lwYW50c0NvdW50ZXI6IG51bWJlcjtcbiAgb25NdXRlUGFydGljaXBhbnRzPzogdHlwZW9mIE11dGVQYXJ0aWNpcGFudHM7XG4gIG9uTWVzc2FnZVBhcnRpY2lwYW50cz86IHR5cGVvZiBNZXNzYWdlUGFydGljaXBhbnRzO1xuICBvblJlbW92ZVBhcnRpY2lwYW50cz86IHR5cGVvZiBSZW1vdmVQYXJ0aWNpcGFudHM7XG4gIFJlbmRlclBhcnRpY2lwYW50TGlzdD86IEhUTUxFbGVtZW50O1xuICBSZW5kZXJQYXJ0aWNpcGFudExpc3RPdGhlcnM/OiBIVE1MRWxlbWVudDtcbiAgcGFyYW1ldGVyczogUGFydGljaXBhbnRzTW9kYWxQYXJhbWV0ZXJzO1xuICBiYWNrZ3JvdW5kQ29sb3I/OiBzdHJpbmc7XG4gIHBvc2l0aW9uPzogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBQYXJ0aWNpcGFudHNNb2RhbFR5cGUgPSAob3B0aW9uczogUGFydGljaXBhbnRzTW9kYWxPcHRpb25zKSA9PiBIVE1MRWxlbWVudDtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLXBhcnRpY2lwYW50cy1tb2RhbCcsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEZvbnRBd2Vzb21lTW9kdWxlLCBQYXJ0aWNpcGFudExpc3QsIFBhcnRpY2lwYW50TGlzdE90aGVyc10sXG4gIHRlbXBsYXRlVXJsOiAnLi9wYXJ0aWNpcGFudHMtbW9kYWwuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9wYXJ0aWNpcGFudHMtbW9kYWwuY29tcG9uZW50LmNzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBQYXJ0aWNpcGFudHNNb2RhbCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgaXNQYXJ0aWNpcGFudHNNb2RhbFZpc2libGUgPSBmYWxzZTtcbiAgQElucHV0KCkgb25QYXJ0aWNpcGFudHNDbG9zZSE6ICgpID0+IHZvaWQ7XG4gIEBJbnB1dCgpIG9uUGFydGljaXBhbnRzRmlsdGVyQ2hhbmdlITogKGZpbHRlcjogc3RyaW5nKSA9PiB2b2lkO1xuICBASW5wdXQoKSBwYXJ0aWNpcGFudHNDb3VudGVyID0gMDtcbiAgQElucHV0KCkgb25NdXRlUGFydGljaXBhbnRzITogKG9wdGlvbnM6IE11dGVQYXJ0aWNpcGFudHNPcHRpb25zKSA9PiBQcm9taXNlPHZvaWQ+O1xuICBASW5wdXQoKSBvbk1lc3NhZ2VQYXJ0aWNpcGFudHMhOiAob3B0aW9uczogTWVzc2FnZVBhcnRpY2lwYW50c09wdGlvbnMpID0+IHZvaWQ7XG4gIEBJbnB1dCgpIG9uUmVtb3ZlUGFydGljaXBhbnRzITogKG9wdGlvbnM6IFJlbW92ZVBhcnRpY2lwYW50c09wdGlvbnMpID0+IFByb21pc2U8dm9pZD47XG4gIEBJbnB1dCgpIHBhcmFtZXRlcnM6IFBhcnRpY2lwYW50c01vZGFsUGFyYW1ldGVycyA9IHt9IGFzIFBhcnRpY2lwYW50c01vZGFsUGFyYW1ldGVycztcbiAgQElucHV0KCkgcG9zaXRpb24gPSAndG9wUmlnaHQnO1xuICBASW5wdXQoKSBiYWNrZ3JvdW5kQ29sb3IgPSAnIzgzYzBlOSc7XG5cbiAgcGFydGljaXBhbnRfczogUGFydGljaXBhbnRbXSA9IFtdO1xuICBwYXJ0aWNpcGFudHNDb3VudGVyX3MgPSAwO1xuICByZVJlbmRlciA9IGZhbHNlO1xuXG4gIGZhVGltZXMgPSBmYVRpbWVzO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgbXV0ZVBhcnRpY2lwYW50c1NlcnZpY2U6IE11dGVQYXJ0aWNpcGFudHMsXG4gICAgcHJpdmF0ZSBtZXNzYWdlUGFydGljaXBhbnRzU2VydmljZTogTWVzc2FnZVBhcnRpY2lwYW50cyxcbiAgICBwcml2YXRlIHJlbW92ZVBhcnRpY2lwYW50c1NlcnZpY2U6IFJlbW92ZVBhcnRpY2lwYW50cyxcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMudXBkYXRlUGFydGljaXBhbnRzRGF0YSgpO1xuICAgIGlmICghdGhpcy5vbk11dGVQYXJ0aWNpcGFudHMpIHtcbiAgICAgIHRoaXMub25NdXRlUGFydGljaXBhbnRzID0gdGhpcy5tdXRlUGFydGljaXBhbnRzU2VydmljZS5tdXRlUGFydGljaXBhbnRzLmJpbmQoXG4gICAgICAgIHRoaXMubXV0ZVBhcnRpY2lwYW50c1NlcnZpY2UsXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoIXRoaXMub25NZXNzYWdlUGFydGljaXBhbnRzKSB7XG4gICAgICB0aGlzLm9uTWVzc2FnZVBhcnRpY2lwYW50cyA9IHRoaXMubWVzc2FnZVBhcnRpY2lwYW50c1NlcnZpY2UubWVzc2FnZVBhcnRpY2lwYW50cy5iaW5kKFxuICAgICAgICB0aGlzLm1lc3NhZ2VQYXJ0aWNpcGFudHNTZXJ2aWNlLFxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLm9uUmVtb3ZlUGFydGljaXBhbnRzKSB7XG4gICAgICB0aGlzLm9uUmVtb3ZlUGFydGljaXBhbnRzID0gdGhpcy5yZW1vdmVQYXJ0aWNpcGFudHNTZXJ2aWNlLnJlbW92ZVBhcnRpY2lwYW50cy5iaW5kKFxuICAgICAgICB0aGlzLnJlbW92ZVBhcnRpY2lwYW50c1NlcnZpY2UsXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlc1sncGFyYW1ldGVycyddIHx8IGNoYW5nZXNbJ3BhcnRpY2lwYW50c0NvdW50ZXInXSkge1xuICAgICAgdGhpcy51cGRhdGVQYXJ0aWNpcGFudHNEYXRhKCk7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlUGFydGljaXBhbnRzRGF0YSgpIHtcbiAgICBsZXQgeyBnZXRVcGRhdGVkQWxsUGFyYW1zIH0gPSB0aGlzLnBhcmFtZXRlcnM7XG4gICAgdGhpcy5wYXJhbWV0ZXJzID0gZ2V0VXBkYXRlZEFsbFBhcmFtcygpO1xuICAgIHRoaXMucGFydGljaXBhbnRfcyA9IHRoaXMucGFyYW1ldGVycy5maWx0ZXJlZFBhcnRpY2lwYW50cztcbiAgICB0aGlzLnBhcnRpY2lwYW50c0NvdW50ZXJfcyA9IHRoaXMucGFyYW1ldGVycy5maWx0ZXJlZFBhcnRpY2lwYW50cy5sZW5ndGg7XG4gIH1cblxuICBoYW5kbGVGaWx0ZXJDaGFuZ2UoZXZlbnQ6IEV2ZW50KSB7XG4gICAgY29uc3QgaW5wdXRFbGVtZW50ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgY29uc3QgZmlsdGVyVmFsdWUgPSBpbnB1dEVsZW1lbnQudmFsdWU7XG4gICAgdGhpcy5vblBhcnRpY2lwYW50c0ZpbHRlckNoYW5nZShmaWx0ZXJWYWx1ZSk7XG4gICAgdGhpcy5yZVJlbmRlciA9ICF0aGlzLnJlUmVuZGVyO1xuICB9XG5cbiAgaGFuZGxlQ2xvc2UoKSB7XG4gICAgdGhpcy5vblBhcnRpY2lwYW50c0Nsb3NlKCk7XG4gIH1cblxuICBjYW5TaG93UGFydGljaXBhbnRMaXN0KCkge1xuICAgIGNvbnN0IHBhcnRpY2lwYW50c1ZhbHVlID0gdGhpcy5wYXJhbWV0ZXJzLmNvSG9zdFJlc3BvbnNpYmlsaXR5Py5maW5kKFxuICAgICAgKGl0ZW06IGFueSkgPT4gaXRlbS5uYW1lID09PSAncGFydGljaXBhbnRzJyxcbiAgICApPy52YWx1ZTtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5wYXJhbWV0ZXJzLmlzbGV2ZWwgPT09ICcyJyB8fFxuICAgICAgKHRoaXMucGFyYW1ldGVycy5jb0hvc3QgPT09IHRoaXMucGFyYW1ldGVycy5tZW1iZXIgJiYgcGFydGljaXBhbnRzVmFsdWUgPT09IHRydWUpXG4gICAgKTtcbiAgfVxufVxuIiwiPGRpdiAqbmdJZj1cImlzUGFydGljaXBhbnRzTW9kYWxWaXNpYmxlXCIgY2xhc3M9XCJtb2RhbC1jb250YWluZXJcIiBbbmdTdHlsZV09XCJ7J2JhY2tncm91bmQtY29sb3InOiAncmdiYSgwLCAwLCAwLCAwLjUpJ31cIj5cclxuICA8ZGl2IGNsYXNzPVwibW9kYWwtY29udGVudFwiIFtuZ1N0eWxlXT1cInsnYmFja2dyb3VuZC1jb2xvcic6IGJhY2tncm91bmRDb2xvciwgJ3RvcCc6IHBvc2l0aW9uLmluY2x1ZGVzKCd0b3AnKSA/ICcxMHB4JyA6ICdhdXRvJywgJ2JvdHRvbSc6IHBvc2l0aW9uLmluY2x1ZGVzKCdib3R0b20nKSA/ICcxMHB4JyA6ICdhdXRvJywgJ2xlZnQnOiBwb3NpdGlvbi5pbmNsdWRlcygnTGVmdCcpID8gJzEwcHgnIDogJ2F1dG8nLCAncmlnaHQnOiBwb3NpdGlvbi5pbmNsdWRlcygnUmlnaHQnKSA/ICcxMHB4JyA6ICdhdXRvJ31cIj5cclxuICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1oZWFkZXJcIj5cclxuICAgICAgPGRpdj5cclxuICAgICAgICBQYXJ0aWNpcGFudHMgPHNwYW4gY2xhc3M9XCJiYWRnZVwiPnt7IHBhcnRpY2lwYW50c0NvdW50ZXJfcyB9fTwvc3Bhbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJjbG9zZS1pY29uXCIgKGNsaWNrKT1cImhhbmRsZUNsb3NlKClcIj5cclxuICAgICAgICA8ZmEtaWNvbiBbaWNvbl09XCJmYVRpbWVzXCIgc2l6ZT1cInhsXCI+PC9mYS1pY29uPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cIm1vZGFsLWJvZHlcIj5cclxuICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmaWx0ZXItaW5wdXRcIiBwbGFjZWhvbGRlcj1cIlNlYXJjaCAuLi5cIiAoaW5wdXQpPVwiaGFuZGxlRmlsdGVyQ2hhbmdlKCRldmVudClcIj5cclxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInBhcmFtZXRlcnMucGFydGljaXBhbnRzXCI+XHJcbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImNhblNob3dQYXJ0aWNpcGFudExpc3QoKVwiPlxyXG4gICAgICAgICAgPGFwcC1wYXJ0aWNpcGFudC1saXN0XHJcbiAgICAgICAgICAgIFtwYXJ0aWNpcGFudHNdPVwicGFydGljaXBhbnRfc1wiXHJcbiAgICAgICAgICAgIFtpc0Jyb2FkY2FzdF09XCJwYXJhbWV0ZXJzLmV2ZW50VHlwZSA9PT0gJ2Jyb2FkY2FzdCdcIlxyXG4gICAgICAgICAgICBbb25NdXRlUGFydGljaXBhbnRzXT1cIm9uTXV0ZVBhcnRpY2lwYW50c1wiXHJcbiAgICAgICAgICAgIFtvbk1lc3NhZ2VQYXJ0aWNpcGFudHNdPVwib25NZXNzYWdlUGFydGljaXBhbnRzXCJcclxuICAgICAgICAgICAgW29uUmVtb3ZlUGFydGljaXBhbnRzXT1cIm9uUmVtb3ZlUGFydGljaXBhbnRzXCJcclxuICAgICAgICAgICAgW3NvY2tldF09XCJwYXJhbWV0ZXJzLnNvY2tldFwiXHJcbiAgICAgICAgICAgIFtjb0hvc3RSZXNwb25zaWJpbGl0eV09XCJwYXJhbWV0ZXJzLmNvSG9zdFJlc3BvbnNpYmlsaXR5XCJcclxuICAgICAgICAgICAgW2NvSG9zdF09XCJwYXJhbWV0ZXJzLmNvSG9zdFwiXHJcbiAgICAgICAgICAgIFttZW1iZXJdPVwicGFyYW1ldGVycy5tZW1iZXJcIlxyXG4gICAgICAgICAgICBbaXNsZXZlbF09XCJwYXJhbWV0ZXJzLmlzbGV2ZWxcIlxyXG4gICAgICAgICAgICBbcm9vbU5hbWVdPVwicGFyYW1ldGVycy5yb29tTmFtZVwiXHJcbiAgICAgICAgICAgIFt1cGRhdGVJc01lc3NhZ2VzTW9kYWxWaXNpYmxlXT1cInBhcmFtZXRlcnMudXBkYXRlSXNNZXNzYWdlc01vZGFsVmlzaWJsZVwiXHJcbiAgICAgICAgICAgIFt1cGRhdGVTdGFydERpcmVjdE1lc3NhZ2VdPVwicGFyYW1ldGVycy51cGRhdGVTdGFydERpcmVjdE1lc3NhZ2VcIlxyXG4gICAgICAgICAgICBbdXBkYXRlRGlyZWN0TWVzc2FnZURldGFpbHNdPVwicGFyYW1ldGVycy51cGRhdGVEaXJlY3RNZXNzYWdlRGV0YWlsc1wiXHJcbiAgICAgICAgICAgIFt1cGRhdGVQYXJ0aWNpcGFudHNdPVwicGFyYW1ldGVycy51cGRhdGVQYXJ0aWNpcGFudHNcIlxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgPC9hcHAtcGFydGljaXBhbnQtbGlzdD5cclxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWNhblNob3dQYXJ0aWNpcGFudExpc3QoKVwiPlxyXG4gICAgICAgICAgPGFwcC1wYXJ0aWNpcGFudC1saXN0LW90aGVyc1xyXG4gICAgICAgICAgICBbcGFydGljaXBhbnRzXT1cInBhcnRpY2lwYW50X3NcIlxyXG4gICAgICAgICAgICBbY29Ib3N0XT1cInBhcmFtZXRlcnMuY29Ib3N0XCJcclxuICAgICAgICAgICAgW21lbWJlcl09XCJwYXJhbWV0ZXJzLm1lbWJlclwiXHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgIDwvYXBwLXBhcnRpY2lwYW50LWxpc3Qtb3RoZXJzPlxyXG4gICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgICAgPGRpdiAqbmdJZj1cIiFwYXJhbWV0ZXJzLnBhcnRpY2lwYW50c1wiPk5vIHBhcnRpY2lwYW50czwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbjwvZGl2PlxyXG4iXX0=