export interface CanvasPoint {
  x: number;
  y: number;
}

export interface ContainRect {
  left: number;
  top: number;
  width: number;
  height: number;
}

/** Returns the centered content box produced by object-fit: contain. */
export const getContainedContentRect = (
  containerWidth: number,
  containerHeight: number,
  sourceWidth: number,
  sourceHeight: number
): ContainRect => {
  const safeWidth = Math.max(containerWidth, 0);
  const safeHeight = Math.max(containerHeight, 0);

  if (safeWidth === 0 || safeHeight === 0 || sourceWidth <= 0 || sourceHeight <= 0) {
    return { left: 0, top: 0, width: safeWidth, height: safeHeight };
  }

  const scale = Math.min(safeWidth / sourceWidth, safeHeight / sourceHeight);
  const width = sourceWidth * scale;
  const height = sourceHeight * scale;

  return {
    left: (safeWidth - width) / 2,
    top: (safeHeight - height) / 2,
    width,
    height,
  };
};

type CanvasPointerEvent = Pick<
  MouseEvent,
  'clientX' | 'clientY' | 'offsetX' | 'offsetY'
>;

/** Convert viewport pointer coordinates into the canvas backing-buffer space. */
export const getCanvasPoint = (
  event: CanvasPointerEvent,
  canvas: HTMLCanvasElement
): CanvasPoint => {
  const rect = canvas.getBoundingClientRect();

  if (rect.width <= 0 || rect.height <= 0) {
    return { x: event.offsetX, y: event.offsetY };
  }

  return {
    x: (event.clientX - rect.left) * (canvas.width / rect.width),
    y: (event.clientY - rect.top) * (canvas.height / rect.height),
  };
};
