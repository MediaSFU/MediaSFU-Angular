import { ShowAlert } from '../../@types/types';
import * as i0 from "@angular/core";
export interface PersonJoinedOptions {
    showAlert?: ShowAlert;
    name: string;
}
export type PersonJoinedType = (options: PersonJoinedOptions) => Promise<void>;
export declare class PersonJoined {
    /**
     * Handles the event when a person joins.
     *
     * @param {PersonJoinedOptions} options - The options for the person joined event.
     * @param {string} options.name - The name of the person who joined.
     * @param {Function} options.showAlert - A function to display an alert/notification.
     * @returns {Promise<void>} A promise that resolves when the alert has been shown.
     */
    personJoined: ({ name, showAlert }: PersonJoinedOptions) => void;
    static ɵfac: i0.ɵɵFactoryDeclaration<PersonJoined, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PersonJoined>;
}
