import { Participant } from '../../@types/types';
import * as i0 from "@angular/core";
export interface PanelistData {
    id: string;
    name: string;
}
export interface PanelistsUpdatedData {
    panelists: PanelistData[];
}
export interface PanelistsUpdatedOptions {
    data: PanelistsUpdatedData;
    updatePanelists?: (panelists: Participant[]) => void;
}
export type PanelistsUpdatedType = (options: PanelistsUpdatedOptions) => Promise<void>;
export declare class PanelistsUpdated {
    panelistsUpdated({ data, updatePanelists, }: PanelistsUpdatedOptions): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<PanelistsUpdated, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PanelistsUpdated>;
}
