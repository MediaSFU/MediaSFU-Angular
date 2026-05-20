import { ShowAlert } from '../../@types/types';
import * as i0 from "@angular/core";
export interface RemovedFromPanelistsData {
    message: string;
}
export interface RemovedFromPanelistsOptions {
    data: RemovedFromPanelistsData;
    showAlert?: ShowAlert;
}
export type RemovedFromPanelistsType = (options: RemovedFromPanelistsOptions) => Promise<void>;
export declare class RemovedFromPanelists {
    removedFromPanelists({ data, showAlert, }: RemovedFromPanelistsOptions): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RemovedFromPanelists, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RemovedFromPanelists>;
}
