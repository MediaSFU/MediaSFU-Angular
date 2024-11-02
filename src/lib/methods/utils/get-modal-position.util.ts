/**
 * Defines the style object for positioning the modal.
 */
import { ModalPositionStyle } from '../../@types/types';

export interface GetModalPositionOptions {
  position: string;
}

// Export the type definition for the function
export type GetModalPositionType = (options: GetModalPositionOptions) => ModalPositionStyle;

/**
 * Gets the style for positioning a modal based on the specified position.
 *
 * @param {GetModalPositionOptions} options - Object containing the desired modal position.
 * @param {string} options.position - The modal position ('center', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight').
 * @returns {ModalPositionStyle} - Style object for aligning the modal according to the specified position.
 *
 * @example
 * ```typescript
 * const positionStyle = getModalPosition({ position: 'center' });
 * // Output: { justifyContent: 'center', alignItems: 'center' }
 *
 * const topLeftStyle = getModalPosition({ position: 'topLeft' });
 * // Output: { justifyContent: 'flex-start', alignItems: 'flex-start' }
 * ```
 */


export function getModalPosition({ position }: GetModalPositionOptions): ModalPositionStyle {
  switch (position) {
    case 'center':
      return { justifyContent: 'center', alignItems: 'center' };
    case 'topLeft':
      return { justifyContent: 'flex-start', alignItems: 'flex-start' };
    case 'topRight':
      return { justifyContent: 'flex-start', alignItems: 'flex-end' };
    case 'bottomLeft':
      return { justifyContent: 'flex-end', alignItems: 'flex-start' };
    case 'bottomRight':
    default:
      return { justifyContent: 'flex-end', alignItems: 'flex-end' };
  }
}
