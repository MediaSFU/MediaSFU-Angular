import { ShowAlert } from '../../@types/types';
import * as i0 from "@angular/core";
export interface AddedAsPanelistData {
    message: string;
}
export interface AddedAsPanelistOptions {
    data: AddedAsPanelistData;
    showAlert?: ShowAlert;
}
export type AddedAsPanelistType = (options: AddedAsPanelistOptions) => Promise<void>;
export declare class AddedAsPanelist {
    addedAsPanelist({ data, showAlert, }: AddedAsPanelistOptions): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AddedAsPanelist, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AddedAsPanelist>;
}
