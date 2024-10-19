import { Participant } from '../../../@types/types';
import * as i0 from "@angular/core";
export interface ParticipantListOthersItemOptions {
    participant: Participant;
    member: string;
    coHost: string;
}
export type ParticipantListOthersItemType = (options: ParticipantListOthersItemOptions) => HTMLElement;
export declare class ParticipantListOthersItem {
    participant: Participant;
    member: string;
    coHost: string;
    faCircle: import("@fortawesome/fontawesome-common-types").IconDefinition;
    getParticipantDisplayName(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<ParticipantListOthersItem, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ParticipantListOthersItem, "app-participant-list-others-item", never, { "participant": { "alias": "participant"; "required": false; }; "member": { "alias": "member"; "required": false; }; "coHost": { "alias": "coHost"; "required": false; }; }, {}, never, never, true, never>;
}
