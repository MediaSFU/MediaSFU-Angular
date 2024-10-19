import { Injectable } from '@angular/core';

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
