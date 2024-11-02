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
/**
 * CardVideoDisplay component displays a video stream with options for full display, mirroring, and background color customization.
 *
 * @selector app-card-video-display
 * @standalone true
 * @imports CommonModule
 *
 * @inputs
 * - `remoteProducerId` (string): Identifier for the remote producer.
 * - `eventType` (EventType): Type of event, such as 'webinar'. Default is 'webinar'.
 * - `forceFullDisplay` (boolean): Forces full video display if true. Default is false.
 * - `videoStream` (MediaStream | null): The media stream to display in the video element.
 * - `backgroundColor` (string): Background color for the video container. Default is 'transparent'.
 * - `doMirror` (boolean): Mirrors the video if true. Default is false.
 *
 * @methods
 * - `ngOnInit()`: Initializes the video stream and sets the container style on component load.
 * - `ngOnChanges(changes: SimpleChanges)`: Updates the video stream or container style when inputs change.
 * - `updateVideoStream()`: Assigns the video stream to the video element if it differs from the current stream.
 * - `setVideoContainerStyle()`: Sets the style of the video container based on the provided background color.
 * - `getBaseVideoContainerStyle()`: Returns base styles for the video container.
 * - `getVideoStyle()`: Returns styles for the video element, including optional mirroring and sizing.
 *
 * @example
 * ```html
 * <app-card-video-display
 *  [remoteProducerId]="producerId"
 * [eventType]="'conference'"
 * [forceFullDisplay]="true"
 * [videoStream]="stream"
 * [backgroundColor]="'black'"
 * [doMirror]="true">
 * </app-card-video-display>
 * ```
 **/
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
