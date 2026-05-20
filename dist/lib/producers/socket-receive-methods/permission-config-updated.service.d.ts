import { PermissionConfig } from '../../methods/permissions-methods/update-permission-config.service';
import * as i0 from "@angular/core";
export interface PermissionConfigUpdatedData {
    config: PermissionConfig;
}
export interface PermissionConfigUpdatedOptions {
    data: PermissionConfigUpdatedData;
    updatePermissionConfig?: (config: PermissionConfig) => void;
}
export type PermissionConfigUpdatedType = (options: PermissionConfigUpdatedOptions) => Promise<void>;
export declare class PermissionConfigUpdated {
    permissionConfigUpdated({ data, updatePermissionConfig, }: PermissionConfigUpdatedOptions): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<PermissionConfigUpdated, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PermissionConfigUpdated>;
}
