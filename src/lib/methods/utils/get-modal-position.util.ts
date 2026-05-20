/**
 * Defines the style object for positioning the modal.
 */
import { getModalPosition as sharedGetModalPosition } from 'mediasfu-shared';
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
  return sharedGetModalPosition({ position }) as ModalPositionStyle;
}
