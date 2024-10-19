import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class HParams {
    hParams = {
        encodings: [
            {
                rid: 'r8',
                maxBitrate: 240000,
                scalabilityMode: 'L1T3',
                scaleResolutionDownBy: 4.0,
            },
            {
                rid: 'r9',
                maxBitrate: 480000,
                scalabilityMode: 'L1T3',
                scaleResolutionDownBy: 2.0,
            },
            {
                rid: 'r10',
                maxBitrate: 960000,
                scalabilityMode: 'L1T3',
            },
        ],
        codecOptions: {
            videoGoogleStartBitrate: 320,
        },
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: HParams, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: HParams, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: HParams, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaC1wYXJhbXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9tZXRob2RzL3V0aWxzL3Byb2R1Y2VyL2gtcGFyYW1zLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFVM0MsTUFBTSxPQUFPLE9BQU87SUFDbEIsT0FBTyxHQUFnQjtRQUNyQixTQUFTLEVBQUU7WUFDVDtnQkFDRSxHQUFHLEVBQUUsSUFBSTtnQkFDVCxVQUFVLEVBQUUsTUFBTTtnQkFDbEIsZUFBZSxFQUFFLE1BQU07Z0JBQ3ZCLHFCQUFxQixFQUFFLEdBQUc7YUFDM0I7WUFDRDtnQkFDRSxHQUFHLEVBQUUsSUFBSTtnQkFDVCxVQUFVLEVBQUUsTUFBTTtnQkFDbEIsZUFBZSxFQUFFLE1BQU07Z0JBQ3ZCLHFCQUFxQixFQUFFLEdBQUc7YUFDM0I7WUFDRDtnQkFDRSxHQUFHLEVBQUUsS0FBSztnQkFDVixVQUFVLEVBQUUsTUFBTTtnQkFDbEIsZUFBZSxFQUFFLE1BQU07YUFDeEI7U0FDRjtRQUNELFlBQVksRUFBRTtZQUNaLHVCQUF1QixFQUFFLEdBQUc7U0FDN0I7S0FDRixDQUFDO3VHQXhCUyxPQUFPOzJHQUFQLE9BQU8sY0FGTixNQUFNOzsyRkFFUCxPQUFPO2tCQUhuQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFByb2R1Y2VyQ29kZWNPcHRpb25zLCBSdHBFbmNvZGluZ1BhcmFtZXRlcnMgfSBmcm9tICdtZWRpYXNvdXAtY2xpZW50L2xpYi90eXBlcyc7XG5leHBvcnQgdHlwZSBIUGFyYW1zVHlwZSA9IHtcbiAgZW5jb2RpbmdzOiBSdHBFbmNvZGluZ1BhcmFtZXRlcnNbXTtcbiAgY29kZWNPcHRpb25zPzogUHJvZHVjZXJDb2RlY09wdGlvbnM7XG59O1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgSFBhcmFtcyB7XG4gIGhQYXJhbXM6IEhQYXJhbXNUeXBlID0ge1xuICAgIGVuY29kaW5nczogW1xuICAgICAge1xuICAgICAgICByaWQ6ICdyOCcsXG4gICAgICAgIG1heEJpdHJhdGU6IDI0MDAwMCxcbiAgICAgICAgc2NhbGFiaWxpdHlNb2RlOiAnTDFUMycsXG4gICAgICAgIHNjYWxlUmVzb2x1dGlvbkRvd25CeTogNC4wLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcmlkOiAncjknLFxuICAgICAgICBtYXhCaXRyYXRlOiA0ODAwMDAsXG4gICAgICAgIHNjYWxhYmlsaXR5TW9kZTogJ0wxVDMnLFxuICAgICAgICBzY2FsZVJlc29sdXRpb25Eb3duQnk6IDIuMCxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHJpZDogJ3IxMCcsXG4gICAgICAgIG1heEJpdHJhdGU6IDk2MDAwMCxcbiAgICAgICAgc2NhbGFiaWxpdHlNb2RlOiAnTDFUMycsXG4gICAgICB9LFxuICAgIF0sXG4gICAgY29kZWNPcHRpb25zOiB7XG4gICAgICB2aWRlb0dvb2dsZVN0YXJ0Qml0cmF0ZTogMzIwLFxuICAgIH0sXG4gIH07XG59XG4iXX0=