import { AfterViewInit, EventEmitter, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import * as i0 from "@angular/core";
export declare class ModernSidebarPanelComponent implements AfterViewInit, OnChanges, OnDestroy {
    visible: boolean;
    width: number;
    height: number;
    title: string;
    badgeText: string | number | null;
    backLabel: string;
    canNavigateBack: boolean;
    contentKey: string;
    navigateBack: EventEmitter<void>;
    close: EventEmitter<void>;
    private contentContainer?;
    private scrollResetTimer;
    protected readonly faArrowLeft: import("@fortawesome/fontawesome-common-types").IconDefinition;
    protected readonly faTimes: import("@fortawesome/fontawesome-common-types").IconDefinition;
    ngAfterViewInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    private scheduleScrollReset;
    static ɵfac: i0.ɵɵFactoryDeclaration<ModernSidebarPanelComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ModernSidebarPanelComponent, "app-modern-sidebar-panel", never, { "visible": { "alias": "visible"; "required": false; }; "width": { "alias": "width"; "required": false; }; "height": { "alias": "height"; "required": false; }; "title": { "alias": "title"; "required": false; }; "badgeText": { "alias": "badgeText"; "required": false; }; "backLabel": { "alias": "backLabel"; "required": false; }; "canNavigateBack": { "alias": "canNavigateBack"; "required": false; }; "contentKey": { "alias": "contentKey"; "required": false; }; }, { "navigateBack": "navigateBack"; "close": "close"; }, never, ["*"], true, never>;
}
