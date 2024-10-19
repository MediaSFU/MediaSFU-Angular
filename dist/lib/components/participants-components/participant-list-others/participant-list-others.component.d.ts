import { Participant } from '../../../@types/types';
import * as i0 from "@angular/core";
export interface ParticipantListOthersOptions {
    participants: Participant[];
    coHost: string;
    member: string;
}
export type ParticipantListOthersType = (options: ParticipantListOthersOptions) => HTMLElement;
export declare class ParticipantListOthers {
    participants: Participant[];
    coHost: string;
    member: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<ParticipantListOthers, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ParticipantListOthers, "app-participant-list-others", never, { "participants": { "alias": "participants"; "required": false; }; "coHost": { "alias": "coHost"; "required": false; }; "member": { "alias": "member"; "required": false; }; }, {}, never, never, true, never>;
}
