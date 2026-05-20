import { OnChanges, OnDestroy, SimpleChanges, TemplateRef } from '@angular/core';
import { type AlertPosition, type AlertTone } from '../../components/display-components/alert-component/alert.component.component';
import * as i0 from "@angular/core";
export interface ModernAlertComponentOptions {
    visible: boolean;
    message: string;
    type: AlertTone;
    duration?: number;
    onHide?: () => void;
    textColor?: string;
    position?: AlertPosition;
    isDarkMode?: boolean;
    alertStyle?: Partial<CSSStyleDeclaration>;
    customTemplate?: TemplateRef<any>;
}
export declare class ModernAlertComponent implements OnChanges, OnDestroy {
    visible: boolean;
    message: string;
    type: AlertTone;
    duration: number;
    textColor: string;
    position: AlertPosition;
    isDarkMode?: boolean;
    onHide?: () => void;
    alertStyle?: Partial<CSSStyleDeclaration>;
    customTemplate?: TemplateRef<any>;
    alertType: AlertTone;
    private hideTimeout?;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    handlePress(): void;
    get alertLabel(): string;
    get alertMeta(): string;
    get alertIcon(): string;
    get alertRole(): 'alert' | 'status';
    get shellStyle(): Record<string, string>;
    get resolvedIsDarkMode(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<ModernAlertComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ModernAlertComponent, "app-modern-alert-component", never, { "visible": { "alias": "visible"; "required": false; }; "message": { "alias": "message"; "required": false; }; "type": { "alias": "type"; "required": false; }; "duration": { "alias": "duration"; "required": false; }; "textColor": { "alias": "textColor"; "required": false; }; "position": { "alias": "position"; "required": false; }; "isDarkMode": { "alias": "isDarkMode"; "required": false; }; "onHide": { "alias": "onHide"; "required": false; }; "alertStyle": { "alias": "alertStyle"; "required": false; }; "customTemplate": { "alias": "customTemplate"; "required": false; }; }, {}, never, never, true, never>;
}
