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
export function getModalPosition({ position }) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LW1vZGFsLXBvc2l0aW9uLnV0aWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvbWV0aG9kcy91dGlscy9nZXQtbW9kYWwtcG9zaXRpb24udXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFZQTs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFHSCxNQUFNLFVBQVUsZ0JBQWdCLENBQUMsRUFBRSxRQUFRLEVBQTJCO0lBQ3BFLFFBQVEsUUFBUSxFQUFFLENBQUM7UUFDakIsS0FBSyxRQUFRO1lBQ1gsT0FBTyxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxDQUFDO1FBQzVELEtBQUssU0FBUztZQUNaLE9BQU8sRUFBRSxjQUFjLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsQ0FBQztRQUNwRSxLQUFLLFVBQVU7WUFDYixPQUFPLEVBQUUsY0FBYyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLENBQUM7UUFDbEUsS0FBSyxZQUFZO1lBQ2YsT0FBTyxFQUFFLGNBQWMsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxDQUFDO1FBQ2xFLEtBQUssYUFBYSxDQUFDO1FBQ25CO1lBQ0UsT0FBTyxFQUFFLGNBQWMsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxDQUFDO0lBQ2xFLENBQUM7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBEZWZpbmVzIHRoZSBzdHlsZSBvYmplY3QgZm9yIHBvc2l0aW9uaW5nIHRoZSBtb2RhbC5cbiAqL1xuaW1wb3J0IHsgTW9kYWxQb3NpdGlvblN0eWxlIH0gZnJvbSAnLi4vLi4vQHR5cGVzL3R5cGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBHZXRNb2RhbFBvc2l0aW9uT3B0aW9ucyB7XG4gIHBvc2l0aW9uOiBzdHJpbmc7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIEdldE1vZGFsUG9zaXRpb25UeXBlID0gKG9wdGlvbnM6IEdldE1vZGFsUG9zaXRpb25PcHRpb25zKSA9PiBNb2RhbFBvc2l0aW9uU3R5bGU7XG5cbi8qKlxuICogR2V0cyB0aGUgc3R5bGUgZm9yIHBvc2l0aW9uaW5nIGEgbW9kYWwgYmFzZWQgb24gdGhlIHNwZWNpZmllZCBwb3NpdGlvbi5cbiAqXG4gKiBAcGFyYW0ge0dldE1vZGFsUG9zaXRpb25PcHRpb25zfSBvcHRpb25zIC0gT2JqZWN0IGNvbnRhaW5pbmcgdGhlIGRlc2lyZWQgbW9kYWwgcG9zaXRpb24uXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wb3NpdGlvbiAtIFRoZSBtb2RhbCBwb3NpdGlvbiAoJ2NlbnRlcicsICd0b3BMZWZ0JywgJ3RvcFJpZ2h0JywgJ2JvdHRvbUxlZnQnLCAnYm90dG9tUmlnaHQnKS5cbiAqIEByZXR1cm5zIHtNb2RhbFBvc2l0aW9uU3R5bGV9IC0gU3R5bGUgb2JqZWN0IGZvciBhbGlnbmluZyB0aGUgbW9kYWwgYWNjb3JkaW5nIHRvIHRoZSBzcGVjaWZpZWQgcG9zaXRpb24uXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGNvbnN0IHBvc2l0aW9uU3R5bGUgPSBnZXRNb2RhbFBvc2l0aW9uKHsgcG9zaXRpb246ICdjZW50ZXInIH0pO1xuICogLy8gT3V0cHV0OiB7IGp1c3RpZnlDb250ZW50OiAnY2VudGVyJywgYWxpZ25JdGVtczogJ2NlbnRlcicgfVxuICpcbiAqIGNvbnN0IHRvcExlZnRTdHlsZSA9IGdldE1vZGFsUG9zaXRpb24oeyBwb3NpdGlvbjogJ3RvcExlZnQnIH0pO1xuICogLy8gT3V0cHV0OiB7IGp1c3RpZnlDb250ZW50OiAnZmxleC1zdGFydCcsIGFsaWduSXRlbXM6ICdmbGV4LXN0YXJ0JyB9XG4gKiBgYGBcbiAqL1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRNb2RhbFBvc2l0aW9uKHsgcG9zaXRpb24gfTogR2V0TW9kYWxQb3NpdGlvbk9wdGlvbnMpOiBNb2RhbFBvc2l0aW9uU3R5bGUge1xuICBzd2l0Y2ggKHBvc2l0aW9uKSB7XG4gICAgY2FzZSAnY2VudGVyJzpcbiAgICAgIHJldHVybiB7IGp1c3RpZnlDb250ZW50OiAnY2VudGVyJywgYWxpZ25JdGVtczogJ2NlbnRlcicgfTtcbiAgICBjYXNlICd0b3BMZWZ0JzpcbiAgICAgIHJldHVybiB7IGp1c3RpZnlDb250ZW50OiAnZmxleC1zdGFydCcsIGFsaWduSXRlbXM6ICdmbGV4LXN0YXJ0JyB9O1xuICAgIGNhc2UgJ3RvcFJpZ2h0JzpcbiAgICAgIHJldHVybiB7IGp1c3RpZnlDb250ZW50OiAnZmxleC1zdGFydCcsIGFsaWduSXRlbXM6ICdmbGV4LWVuZCcgfTtcbiAgICBjYXNlICdib3R0b21MZWZ0JzpcbiAgICAgIHJldHVybiB7IGp1c3RpZnlDb250ZW50OiAnZmxleC1lbmQnLCBhbGlnbkl0ZW1zOiAnZmxleC1zdGFydCcgfTtcbiAgICBjYXNlICdib3R0b21SaWdodCc6XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiB7IGp1c3RpZnlDb250ZW50OiAnZmxleC1lbmQnLCBhbGlnbkl0ZW1zOiAnZmxleC1lbmQnIH07XG4gIH1cbn1cbiJdfQ==