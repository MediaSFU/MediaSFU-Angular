import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class VParams {
    vParams = {
        encodings: [
            {
                rid: 'r3',
                maxBitrate: 200000,
                scalabilityMode: 'L1T3',
                scaleResolutionDownBy: 4.0,
            },
            {
                rid: 'r4',
                maxBitrate: 400000,
                scalabilityMode: 'L1T3',
                scaleResolutionDownBy: 2.0,
            },
            {
                rid: 'r5',
                maxBitrate: 800000,
                scalabilityMode: 'L1T3',
            },
        ],
        codecOptions: {
            videoGoogleStartBitrate: 320,
        },
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: VParams, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: VParams, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: VParams, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidi1wYXJhbXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9tZXRob2RzL3V0aWxzL3Byb2R1Y2VyL3YtcGFyYW1zLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFVM0MsTUFBTSxPQUFPLE9BQU87SUFDbEIsT0FBTyxHQUFnQjtRQUNyQixTQUFTLEVBQUU7WUFDVDtnQkFDRSxHQUFHLEVBQUUsSUFBSTtnQkFDVCxVQUFVLEVBQUUsTUFBTTtnQkFDbEIsZUFBZSxFQUFFLE1BQU07Z0JBQ3ZCLHFCQUFxQixFQUFFLEdBQUc7YUFDM0I7WUFDRDtnQkFDRSxHQUFHLEVBQUUsSUFBSTtnQkFDVCxVQUFVLEVBQUUsTUFBTTtnQkFDbEIsZUFBZSxFQUFFLE1BQU07Z0JBQ3ZCLHFCQUFxQixFQUFFLEdBQUc7YUFDM0I7WUFDRDtnQkFDRSxHQUFHLEVBQUUsSUFBSTtnQkFDVCxVQUFVLEVBQUUsTUFBTTtnQkFDbEIsZUFBZSxFQUFFLE1BQU07YUFDeEI7U0FDRjtRQUNELFlBQVksRUFBRTtZQUNaLHVCQUF1QixFQUFFLEdBQUc7U0FDN0I7S0FDRixDQUFDO3VHQXhCUyxPQUFPOzJHQUFQLE9BQU8sY0FGTixNQUFNOzsyRkFFUCxPQUFPO2tCQUhuQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFByb2R1Y2VyQ29kZWNPcHRpb25zLCBSdHBFbmNvZGluZ1BhcmFtZXRlcnMgfSBmcm9tICdtZWRpYXNvdXAtY2xpZW50L2xpYi90eXBlcyc7XG5leHBvcnQgdHlwZSBWUGFyYW1zVHlwZSA9IHtcbiAgZW5jb2RpbmdzOiBSdHBFbmNvZGluZ1BhcmFtZXRlcnNbXTtcbiAgY29kZWNPcHRpb25zPzogUHJvZHVjZXJDb2RlY09wdGlvbnM7XG59O1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgVlBhcmFtcyB7XG4gIHZQYXJhbXM6IFZQYXJhbXNUeXBlID0ge1xuICAgIGVuY29kaW5nczogW1xuICAgICAge1xuICAgICAgICByaWQ6ICdyMycsXG4gICAgICAgIG1heEJpdHJhdGU6IDIwMDAwMCxcbiAgICAgICAgc2NhbGFiaWxpdHlNb2RlOiAnTDFUMycsXG4gICAgICAgIHNjYWxlUmVzb2x1dGlvbkRvd25CeTogNC4wLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcmlkOiAncjQnLFxuICAgICAgICBtYXhCaXRyYXRlOiA0MDAwMDAsXG4gICAgICAgIHNjYWxhYmlsaXR5TW9kZTogJ0wxVDMnLFxuICAgICAgICBzY2FsZVJlc29sdXRpb25Eb3duQnk6IDIuMCxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHJpZDogJ3I1JyxcbiAgICAgICAgbWF4Qml0cmF0ZTogODAwMDAwLFxuICAgICAgICBzY2FsYWJpbGl0eU1vZGU6ICdMMVQzJyxcbiAgICAgIH0sXG4gICAgXSxcbiAgICBjb2RlY09wdGlvbnM6IHtcbiAgICAgIHZpZGVvR29vZ2xlU3RhcnRCaXRyYXRlOiAzMjAsXG4gICAgfSxcbiAgfTtcbn1cbiJdfQ==