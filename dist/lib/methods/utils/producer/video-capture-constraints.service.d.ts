import * as i0 from "@angular/core";
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
export declare class VideoCaptureConstraints {
    QnHDCons: {
        width: {
            ideal: number;
        };
        height: {
            ideal: number;
        };
    };
    sdCons: {
        width: {
            ideal: number;
        };
        height: {
            ideal: number;
        };
    };
    hdCons: {
        width: {
            ideal: number;
        };
        height: {
            ideal: number;
        };
    };
    fhdCons: {
        width: {
            ideal: number;
        };
        height: {
            ideal: number;
        };
    };
    qhdCons: {
        width: {
            ideal: number;
        };
        height: {
            ideal: number;
        };
    };
    QnHDConsPort: {
        width: {
            ideal: number;
        };
        height: {
            ideal: number;
        };
    };
    sdConsPort: {
        width: {
            ideal: number;
        };
        height: {
            ideal: number;
        };
    };
    hdConsPort: {
        width: {
            ideal: number;
        };
        height: {
            ideal: number;
        };
    };
    fhdConsPort: {
        width: {
            ideal: number;
        };
        height: {
            ideal: number;
        };
    };
    qhdConsPort: {
        width: {
            ideal: number;
        };
        height: {
            ideal: number;
        };
    };
    QnHDConsNeu: {
        width: {
            ideal: number;
        };
        height: {
            ideal: number;
        };
    };
    sdConsNeu: {
        width: {
            ideal: number;
        };
        height: {
            ideal: number;
        };
    };
    hdConsNeu: {
        width: {
            ideal: number;
        };
        height: {
            ideal: number;
        };
    };
    fhdConsNeu: {
        width: {
            ideal: number;
        };
        height: {
            ideal: number;
        };
    };
    qhdConsNeu: {
        width: {
            ideal: number;
        };
        height: {
            ideal: number;
        };
    };
    QnHDFrameRate: number;
    sdFrameRate: number;
    hdFrameRate: number;
    fhdFrameRate: number;
    qhdFrameRate: number;
    screenFrameRate: number;
    static ɵfac: i0.ɵɵFactoryDeclaration<VideoCaptureConstraints, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<VideoCaptureConstraints>;
}
