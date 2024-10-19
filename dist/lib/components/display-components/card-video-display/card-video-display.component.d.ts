import { OnInit, OnChanges, SimpleChanges, ElementRef } from '@angular/core';
import { EventType } from '../../../@types/types';
import * as i0 from "@angular/core";
export interface CardVideoDisplayOptions {
    remoteProducerId: string;
    eventType: string;
    forceFullDisplay: boolean;
    videoStream: MediaStream | null;
    backgroundColor: string;
    doMirror?: boolean;
}
export type CardVideoDisplayType = (options: CardVideoDisplayOptions) => HTMLElement;
export declare class CardVideoDisplay implements OnInit, OnChanges {
    remoteProducerId: string;
    eventType: EventType;
    forceFullDisplay: boolean;
    videoStream: MediaStream | null;
    backgroundColor: string;
    doMirror: boolean;
    videoElement: ElementRef<HTMLVideoElement>;
    videoContainerStyle: any;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    updateVideoStream(): void;
    setVideoContainerStyle(): void;
    getBaseVideoContainerStyle(): {
        display: string;
        justifyContent: string;
        alignItems: string;
        width: string;
        height: string;
        backgroundColor: string;
    };
    getVideoStyle(): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<CardVideoDisplay, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CardVideoDisplay, "app-card-video-display", never, { "remoteProducerId": { "alias": "remoteProducerId"; "required": false; }; "eventType": { "alias": "eventType"; "required": false; }; "forceFullDisplay": { "alias": "forceFullDisplay"; "required": false; }; "videoStream": { "alias": "videoStream"; "required": false; }; "backgroundColor": { "alias": "backgroundColor"; "required": false; }; "doMirror": { "alias": "doMirror"; "required": false; }; }, {}, never, never, true, never>;
}
