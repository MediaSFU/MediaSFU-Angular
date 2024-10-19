import { OverlayPositionStyle } from '../../@types/types';

export interface GetOverlayPositionOptions {
  position: string;
}

// Export the type definition for the function
export type GetOverlayPositionType = (options: GetOverlayPositionOptions) => OverlayPositionStyle;

/**
 * Gets the style for positioning an overlay based on the specified position.
 * @function
 * @param {string} position - The desired position for the overlay ('topLeft', 'topRight', 'bottomLeft', 'bottomRight').
 * @returns {OverlayPositionStyle} - The style object for positioning the overlay.
 */

export function getOverlayPosition({ position }: GetOverlayPositionOptions): OverlayPositionStyle {
  switch (position) {
    case 'topLeft':
      return { top: 0, left: 0 };
    case 'topRight':
      return { top: 0, right: 0 };
    case 'bottomLeft':
      return { bottom: 0, left: 0 };
    case 'bottomRight':
      return { bottom: 0, right: 0 };
    default:
      return {};
  }
}
