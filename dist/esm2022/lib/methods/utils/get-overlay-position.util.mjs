/**
 * Gets the style for positioning an overlay based on the specified position.
 * @function
 * @param {string} position - The desired position for the overlay ('topLeft', 'topRight', 'bottomLeft', 'bottomRight').
 * @returns {OverlayPositionStyle} - The style object for positioning the overlay.
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LW92ZXJsYXktcG9zaXRpb24udXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9tZXRob2RzL3V0aWxzL2dldC1vdmVybGF5LXBvc2l0aW9uLnV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBU0E7Ozs7O0dBS0c7QUFFSCxNQUFNLFVBQVUsa0JBQWtCLENBQUMsRUFBRSxRQUFRLEVBQTZCO0lBQ3hFLFFBQVEsUUFBUSxFQUFFLENBQUM7UUFDakIsS0FBSyxTQUFTO1lBQ1osT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDO1FBQzdCLEtBQUssVUFBVTtZQUNiLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQztRQUM5QixLQUFLLFlBQVk7WUFDZixPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUM7UUFDaEMsS0FBSyxhQUFhO1lBQ2hCLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQztRQUNqQztZQUNFLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPdmVybGF5UG9zaXRpb25TdHlsZSB9IGZyb20gJy4uLy4uL0B0eXBlcy90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgR2V0T3ZlcmxheVBvc2l0aW9uT3B0aW9ucyB7XG4gIHBvc2l0aW9uOiBzdHJpbmc7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIEdldE92ZXJsYXlQb3NpdGlvblR5cGUgPSAob3B0aW9uczogR2V0T3ZlcmxheVBvc2l0aW9uT3B0aW9ucykgPT4gT3ZlcmxheVBvc2l0aW9uU3R5bGU7XG5cbi8qKlxuICogR2V0cyB0aGUgc3R5bGUgZm9yIHBvc2l0aW9uaW5nIGFuIG92ZXJsYXkgYmFzZWQgb24gdGhlIHNwZWNpZmllZCBwb3NpdGlvbi5cbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtzdHJpbmd9IHBvc2l0aW9uIC0gVGhlIGRlc2lyZWQgcG9zaXRpb24gZm9yIHRoZSBvdmVybGF5ICgndG9wTGVmdCcsICd0b3BSaWdodCcsICdib3R0b21MZWZ0JywgJ2JvdHRvbVJpZ2h0JykuXG4gKiBAcmV0dXJucyB7T3ZlcmxheVBvc2l0aW9uU3R5bGV9IC0gVGhlIHN0eWxlIG9iamVjdCBmb3IgcG9zaXRpb25pbmcgdGhlIG92ZXJsYXkuXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGdldE92ZXJsYXlQb3NpdGlvbih7IHBvc2l0aW9uIH06IEdldE92ZXJsYXlQb3NpdGlvbk9wdGlvbnMpOiBPdmVybGF5UG9zaXRpb25TdHlsZSB7XG4gIHN3aXRjaCAocG9zaXRpb24pIHtcbiAgICBjYXNlICd0b3BMZWZ0JzpcbiAgICAgIHJldHVybiB7IHRvcDogMCwgbGVmdDogMCB9O1xuICAgIGNhc2UgJ3RvcFJpZ2h0JzpcbiAgICAgIHJldHVybiB7IHRvcDogMCwgcmlnaHQ6IDAgfTtcbiAgICBjYXNlICdib3R0b21MZWZ0JzpcbiAgICAgIHJldHVybiB7IGJvdHRvbTogMCwgbGVmdDogMCB9O1xuICAgIGNhc2UgJ2JvdHRvbVJpZ2h0JzpcbiAgICAgIHJldHVybiB7IGJvdHRvbTogMCwgcmlnaHQ6IDAgfTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHt9O1xuICB9XG59XG4iXX0=