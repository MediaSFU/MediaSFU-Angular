import { Injectable } from '@angular/core';

/**
 * The `WebRTC` service provides an interface for accessing media devices
 * and managing WebRTC streams in an Angular application.
 *
 * @service
 * @example
 * ```typescript
 * import { WebRTC } from './path/to/webrtc.service';
 *
 * constructor(private webRTC: WebRTC) {}
 *
 * async setupMedia() {
 *   try {
 *     const devices = await this.webRTC.getMediaDevices();
 *     console.log('Media devices:', devices);
 *   } catch (error) {
 *     console.error('Error getting media devices:', error);
 *   }
 * }
 * ```
 *
 * @remarks
 * This service encapsulates the native `navigator.mediaDevices` API for accessing
 * media devices (like cameras and microphones) and provides methods for ensuring
 * that these devices are ready for use.
 *
 * @property {MediaDevices} mediaDevices - The MediaDevices interface for accessing media devices.
 * @property {any} MediaStream - Reference to the MediaStream constructor for creating media streams.
 * @property {any} MediaStreamTrack - Reference to the MediaStreamTrack constructor for managing individual media tracks.
 *
 * @returns {WebRTC} The WebRTC service for managing media devices and streams.
 */
@Injectable({
  providedIn: 'root',
})
export class WebRTC {
  public mediaDevices: MediaDevices;
  public MediaStream: any;
  public MediaStreamTrack: any;

  constructor() {
    this.mediaDevices = navigator.mediaDevices;
    this.MediaStream = window.MediaStream;
    this.MediaStreamTrack = window.MediaStreamTrack;
  }

  // Method to ensure mediaDevices is ready before returning it
  public async getMediaDevices(): Promise<MediaDevices> {
    try {
      // Example of awaiting something that might be necessary before accessing media devices
      await this.mediaDevices.getUserMedia({ audio: true, video: true });

      // Now mediaDevices is ready and can be returned
      return this.mediaDevices;
    } catch (error) {
      console.error('Error accessing media devices.', error);
      throw error;
    }
  }
}
