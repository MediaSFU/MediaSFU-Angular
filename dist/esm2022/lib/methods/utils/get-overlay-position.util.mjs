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
export function getOverlayPosition({ position }) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LW92ZXJsYXktcG9zaXRpb24udXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9tZXRob2RzL3V0aWxzL2dldC1vdmVybGF5LXBvc2l0aW9uLnV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBU0E7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBR0gsTUFBTSxVQUFVLGtCQUFrQixDQUFDLEVBQUUsUUFBUSxFQUE2QjtJQUN4RSxRQUFRLFFBQVEsRUFBRSxDQUFDO1FBQ2pCLEtBQUssU0FBUztZQUNaLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQztRQUM3QixLQUFLLFVBQVU7WUFDYixPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUM7UUFDOUIsS0FBSyxZQUFZO1lBQ2YsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDO1FBQ2hDLEtBQUssYUFBYTtZQUNoQixPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUM7UUFDakM7WUFDRSxPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT3ZlcmxheVBvc2l0aW9uU3R5bGUgfSBmcm9tICcuLi8uLi9AdHlwZXMvdHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEdldE92ZXJsYXlQb3NpdGlvbk9wdGlvbnMge1xuICBwb3NpdGlvbjogc3RyaW5nO1xufVxuXG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBHZXRPdmVybGF5UG9zaXRpb25UeXBlID0gKG9wdGlvbnM6IEdldE92ZXJsYXlQb3NpdGlvbk9wdGlvbnMpID0+IE92ZXJsYXlQb3NpdGlvblN0eWxlO1xuXG4vKipcbiAqIEdldHMgdGhlIHN0eWxlIGZvciBwb3NpdGlvbmluZyBhbiBvdmVybGF5IGJhc2VkIG9uIHRoZSBzcGVjaWZpZWQgcG9zaXRpb24uXG4gKlxuICogQHBhcmFtIHtHZXRPdmVybGF5UG9zaXRpb25PcHRpb25zfSBvcHRpb25zIC0gQ29udGFpbnMgdGhlIGRlc2lyZWQgcG9zaXRpb24gZm9yIHRoZSBvdmVybGF5LlxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucG9zaXRpb24gLSBUaGUgcG9zaXRpb24gZm9yIHRoZSBvdmVybGF5ICgndG9wTGVmdCcsICd0b3BSaWdodCcsICdib3R0b21MZWZ0JywgJ2JvdHRvbVJpZ2h0JykuXG4gKiBAcmV0dXJucyB7T3ZlcmxheVBvc2l0aW9uU3R5bGV9IC0gU3R5bGUgb2JqZWN0IGRlZmluaW5nIHRoZSBvdmVybGF5IHBvc2l0aW9uLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBjb25zdCB0b3BMZWZ0UG9zaXRpb24gPSBnZXRPdmVybGF5UG9zaXRpb24oeyBwb3NpdGlvbjogJ3RvcExlZnQnIH0pO1xuICogLy8gT3V0cHV0OiB7IHRvcDogMCwgbGVmdDogMCB9XG4gKlxuICogY29uc3QgYm90dG9tUmlnaHRQb3NpdGlvbiA9IGdldE92ZXJsYXlQb3NpdGlvbih7IHBvc2l0aW9uOiAnYm90dG9tUmlnaHQnIH0pO1xuICogLy8gT3V0cHV0OiB7IGJvdHRvbTogMCwgcmlnaHQ6IDAgfVxuICogYGBgXG4gKi9cblxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0T3ZlcmxheVBvc2l0aW9uKHsgcG9zaXRpb24gfTogR2V0T3ZlcmxheVBvc2l0aW9uT3B0aW9ucyk6IE92ZXJsYXlQb3NpdGlvblN0eWxlIHtcbiAgc3dpdGNoIChwb3NpdGlvbikge1xuICAgIGNhc2UgJ3RvcExlZnQnOlxuICAgICAgcmV0dXJuIHsgdG9wOiAwLCBsZWZ0OiAwIH07XG4gICAgY2FzZSAndG9wUmlnaHQnOlxuICAgICAgcmV0dXJuIHsgdG9wOiAwLCByaWdodDogMCB9O1xuICAgIGNhc2UgJ2JvdHRvbUxlZnQnOlxuICAgICAgcmV0dXJuIHsgYm90dG9tOiAwLCBsZWZ0OiAwIH07XG4gICAgY2FzZSAnYm90dG9tUmlnaHQnOlxuICAgICAgcmV0dXJuIHsgYm90dG9tOiAwLCByaWdodDogMCB9O1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4ge307XG4gIH1cbn1cbiJdfQ==