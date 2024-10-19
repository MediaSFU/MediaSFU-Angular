import { OverlayPositionStyle } from '../../@types/types';
export interface GetOverlayPositionOptions {
    position: string;
}
export type GetOverlayPositionType = (options: GetOverlayPositionOptions) => OverlayPositionStyle;
/**
 * Gets the style for positioning an overlay based on the specified position.
 * @function
 * @param {string} position - The desired position for the overlay ('topLeft', 'topRight', 'bottomLeft', 'bottomRight').
 * @returns {OverlayPositionStyle} - The style object for positioning the overlay.
 */
export declare function getOverlayPosition({ position }: GetOverlayPositionOptions): OverlayPositionStyle;
