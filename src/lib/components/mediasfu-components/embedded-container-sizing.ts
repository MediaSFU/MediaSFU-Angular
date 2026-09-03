export interface EmbeddedControlFractionsOptions {
  containerHeightFraction?: number;
  controlViewportFraction?: number;
  showControls?: boolean;
}

/**
 * Converts a viewport-relative control-strip fraction into the coordinate
 * system of an embedded room so MainAspect and SubAspect exactly fill it.
 */
export function resolveEmbeddedControlFractions({
  containerHeightFraction = 1,
  controlViewportFraction = 0,
  showControls = true,
}: EmbeddedControlFractionsOptions) {
  const boundary = Math.max(0, Number(containerHeightFraction) || 0);
  if (!showControls || boundary === 0) {
    return {
      mainFraction: boundary === 0 ? 0 : 1,
      subViewportFraction: 0,
    };
  }

  const subViewportFraction = Math.min(
    boundary,
    Math.max(0, Number(controlViewportFraction) || 0),
  );

  return {
    mainFraction: Math.max(0, 1 - subViewportFraction / boundary),
    subViewportFraction,
  };
}
