export interface EmbeddedControlFractionsOptions {
    containerHeightFraction?: number;
    controlViewportFraction?: number;
    showControls?: boolean;
}
/**
 * Converts a viewport-relative control-strip fraction into the coordinate
 * system of an embedded room so MainAspect and SubAspect exactly fill it.
 */
export declare function resolveEmbeddedControlFractions({ containerHeightFraction, controlViewportFraction, showControls, }: EmbeddedControlFractionsOptions): {
    mainFraction: number;
    subViewportFraction: number;
};
