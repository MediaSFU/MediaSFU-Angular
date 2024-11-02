import { OverlayPositionStyle } from '../../@types/types';
export interface GetOverlayPositionOptions {
    position: string;
}
export type GetOverlayPositionType = (options: GetOverlayPositionOptions) => OverlayPositionStyle;
/**
 * Gets the style for positioning an overlay based on the specified position.
 *
 * @param {GetOverlayPositionOptions} options - Contains the desired position for the overlay.
 * @param {string} options.position - The position for the overlay ('topLeft', 'topRight', 'bottomLeft', 'bottomRight').
 * @returns {OverlayPositionStyle} - Style object defining the overlay position.
 *
 * @example
 * ```typescript
 * const topLeftPosition = getOverlayPosition({ position: 'topLeft' });
 * // Output: { top: 0, left: 0 }
 *
 * const bottomRightPosition = getOverlayPosition({ position: 'bottomRight' });
 * // Output: { bottom: 0, right: 0 }
 * ```
 */
export declare function getOverlayPosition({ position }: GetOverlayPositionOptions): OverlayPositionStyle;
