import { Participant, Stream, UpdateMiniCardsGridType, UpdateMiniCardsGridParameters, AudioCardParameters, EventType, CustomMediaComponent } from '../@types/types';
import * as i0 from "@angular/core";
export interface AddVideosGridParameters extends UpdateMiniCardsGridParameters, AudioCardParameters {
    eventType: EventType;
    updateAddAltGrid: (addAltGrid: boolean) => void;
    ref_participants: Participant[];
    islevel: string;
    videoAlreadyOn: boolean;
    localStreamVideo: MediaStream | null;
    keepBackground: boolean;
    virtualStream: MediaStream | null;
    forceFullDisplay: boolean;
    otherGridStreams: CustomMediaComponent[][];
    updateOtherGridStreams: (otherGridStreams: CustomMediaComponent[][]) => void;
    updateMiniCardsGrid: UpdateMiniCardsGridType;
    getUpdatedAllParams: () => AddVideosGridParameters;
    [key: string]: any;
}
export interface AddVideosGridOptions {
    mainGridStreams: (Stream | Participant)[];
    altGridStreams: (Stream | Participant)[];
    numtoadd: number;
    numRows: number;
    numCols: number;
    actualRows: number;
    lastrowcols: number;
    removeAltGrid: boolean;
    parameters: AddVideosGridParameters;
}
export type AddVideosGridType = (options: AddVideosGridOptions) => Promise<void>;
export declare class AddVideosGrid {
    addVideosGrid: ({ mainGridStreams, altGridStreams, numtoadd, numRows, numCols, actualRows, lastrowcols, removeAltGrid, parameters, }: AddVideosGridOptions) => Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AddVideosGrid, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AddVideosGrid>;
}
