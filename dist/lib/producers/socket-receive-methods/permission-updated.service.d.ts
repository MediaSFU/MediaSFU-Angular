import { ShowAlert } from '../../@types/types';
import * as i0 from "@angular/core";
export interface PermissionUpdatedData {
    newLevel: string;
    message?: string;
}
export interface PermissionUpdatedOptions {
    data: PermissionUpdatedData;
    showAlert?: ShowAlert;
    updateIslevel?: (level: string) => void;
}
export type PermissionUpdatedType = (options: PermissionUpdatedOptions) => Promise<void>;
export declare class PermissionUpdated {
    permissionUpdated({ data, showAlert, updateIslevel, }: PermissionUpdatedOptions): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<PermissionUpdated, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PermissionUpdated>;
}
