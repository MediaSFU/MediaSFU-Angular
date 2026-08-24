export interface CanvasPoint {
    x: number;
    y: number;
}
export interface ContainRect {
    left: number;
    top: number;
    width: number;
    height: number;
}
/** Returns the centered content box produced by object-fit: contain. */
export declare const getContainedContentRect: (containerWidth: number, containerHeight: number, sourceWidth: number, sourceHeight: number) => ContainRect;
type CanvasPointerEvent = Pick<MouseEvent, 'clientX' | 'clientY' | 'offsetX' | 'offsetY'>;
/** Convert viewport pointer coordinates into the canvas backing-buffer space. */
export declare const getCanvasPoint: (event: CanvasPointerEvent, canvas: HTMLCanvasElement) => CanvasPoint;
export {};
