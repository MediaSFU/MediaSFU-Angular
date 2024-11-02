import { Injectable } from '@angular/core';

/**
 * The `VideoCaptureConstraints` service provides various video capture constraints
 * including resolution and frame rate settings for different display sizes (landscape, portrait, and neutral).
 *
 * @service
 * @example
 * ```typescript
 * import { VideoCaptureConstraints } from './path/to/video-capture-constraints.service';
 *
 * constructor(private videoConstraints: VideoCaptureConstraints) {
 *   console.log(this.videoConstraints.hdCons); // Access HD constraints
 * }
 * ```
 *
 * @remarks
 * This service contains predefined constraints that can be used for video capture
 * settings based on the desired quality and aspect ratio. These constraints can
 * be applied when requesting media streams from the user's camera.
 *
 * @property {Object} QnHDCons - Video capture constraints for QnHD resolution (320x180).
 * @property {Object} sdCons - Video capture constraints for SD resolution (640x360).
 * @property {Object} hdCons - Video capture constraints for HD resolution (1280x720).
 * @property {Object} fhdCons - Video capture constraints for FHD resolution (1920x1080).
 * @property {Object} qhdCons - Video capture constraints for QHD resolution (2560x1440).
 *
 * @property {Object} QnHDConsPort - Video capture constraints for QnHD resolution in portrait mode.
 * @property {Object} sdConsPort - Video capture constraints for SD resolution in portrait mode.
 * @property {Object} hdConsPort - Video capture constraints for HD resolution in portrait mode.
 * @property {Object} fhdConsPort - Video capture constraints for FHD resolution in portrait mode.
 * @property {Object} qhdConsPort - Video capture constraints for QHD resolution in portrait mode.
 *
 * @property {Object} QnHDConsNeu - Video capture constraints for QnHD resolution in neutral mode.
 * @property {Object} sdConsNeu - Video capture constraints for SD resolution in neutral mode.
 * @property {Object} hdConsNeu - Video capture constraints for HD resolution in neutral mode.
 * @property {Object} fhdConsNeu - Video capture constraints for FHD resolution in neutral mode.
 * @property {Object} qhdConsNeu - Video capture constraints for QnHD resolution in neutral mode.
 *
 * @property {number} QnHDFrameRate - Frame rate for QnHD video capture (5 FPS).
 * @property {number} sdFrameRate - Frame rate for SD video capture (10 FPS).
 * @property {number} hdFrameRate - Frame rate for HD video capture (15 FPS).
 * @property {number} fhdFrameRate - Frame rate for FHD video capture (20 FPS).
 * @property {number} qhdFrameRate - Frame rate for QHD video capture (30 FPS).
 * @property {number} screenFrameRate - Frame rate for screen capture (30 FPS).
 *
 * @returns {VideoCaptureConstraints} The video capture constraints for use in media requests.
 */

@Injectable({
  providedIn: 'root',
})
export class VideoCaptureConstraints {
  // Landscape display sizes
  QnHDCons = { width: { ideal: 320 }, height: { ideal: 180 } };
  sdCons = { width: { ideal: 640 }, height: { ideal: 360 } };
  hdCons = { width: { ideal: 1280 }, height: { ideal: 720 } };
  fhdCons = { width: { ideal: 1920 }, height: { ideal: 1080 } };
  qhdCons = { width: { ideal: 2560 }, height: { ideal: 1440 } };

  // Portrait display sizes
  QnHDConsPort = { width: { ideal: 180 }, height: { ideal: 320 } };
  sdConsPort = { width: { ideal: 360 }, height: { ideal: 640 } };
  hdConsPort = { width: { ideal: 720 }, height: { ideal: 1280 } };
  fhdConsPort = { width: { ideal: 1080 }, height: { ideal: 1920 } };
  qhdConsPort = { width: { ideal: 1440 }, height: { ideal: 2560 } };

  // Neutral (Square) display sizes
  QnHDConsNeu = { width: { ideal: 240 }, height: { ideal: 240 } };
  sdConsNeu = { width: { ideal: 480 }, height: { ideal: 480 } };
  hdConsNeu = { width: { ideal: 960 }, height: { ideal: 960 } };
  fhdConsNeu = { width: { ideal: 1440 }, height: { ideal: 1440 } };
  qhdConsNeu = { width: { ideal: 1920 }, height: { ideal: 1920 } };

  // Frame rates for video capture
  QnHDFrameRate = 5;
  sdFrameRate = 10;
  hdFrameRate = 15;
  fhdFrameRate = 20;
  qhdFrameRate = 30;
  screenFrameRate = 30;
}
