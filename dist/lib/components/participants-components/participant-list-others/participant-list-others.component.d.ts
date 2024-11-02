import { Participant } from '../../../@types/types';
import * as i0 from "@angular/core";
export interface ParticipantListOthersOptions {
    participants: Participant[];
    coHost: string;
    member: string;
}
export type ParticipantListOthersType = (options: ParticipantListOthersOptions) => HTMLElement;
/**
 * Component for displaying a list of other participants.
 * It renders individual participant items within the list.
 *
 * @component
 * @selector app-participant-list-others
 * @standalone true
 * @templateUrl ./participant-list-others.component.html
 * @styleUrls ['./participant-list-others.component.css']
 * @imports [CommonModule, ParticipantListOthersItem]
 *
 * @example
 * ```html
 * <app-participant-list-others [participants]="participantsList" [coHost]="coHostID" [member]="memberID">
 * </app-participant-list-others>
 * ```
 */
export declare class ParticipantListOthers {
    participants: Participant[];
    coHost: string;
    member: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<ParticipantListOthers, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ParticipantListOthers, "app-participant-list-others", never, { "participants": { "alias": "participants"; "required": false; }; "coHost": { "alias": "coHost"; "required": false; }; "member": { "alias": "member"; "required": false; }; }, {}, never, never, true, never>;
}
