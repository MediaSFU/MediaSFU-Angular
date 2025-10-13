import { OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ModifySettings, ModifySettingsOptions } from '../../../methods/settings-methods/modify-settings.service';
import { Socket } from 'socket.io-client';
import { ShowAlert } from '../../../@types/types';
import * as i0 from "@angular/core";
export interface EventSettingsModalOptions {
    isEventSettingsModalVisible: boolean;
    onEventSettingsClose: () => void;
    onModifyEventSettings?: (options: ModifySettingsOptions) => Promise<void>;
    position?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
    backgroundColor?: string;
    audioSetting: string;
    videoSetting: string;
    screenshareSetting: string;
    chatSetting: string;
    updateAudioSetting: (setting: string) => void;
    updateVideoSetting: (setting: string) => void;
    updateScreenshareSetting: (setting: string) => void;
    updateChatSetting: (setting: string) => void;
    updateIsSettingsModalVisible: (isVisible: boolean) => void;
    roomName: string;
    socket: Socket;
    showAlert?: ShowAlert;
    overlayStyle?: Partial<CSSStyleDeclaration>;
    contentStyle?: Partial<CSSStyleDeclaration>;
    customTemplate?: any;
}
export type EventSettingsModalType = (options: EventSettingsModalOptions) => HTMLElement;
/**
 * EventSettingsModal - Modal for configuring room-wide event permissions (host only)
 *
 * @component
 * @description
 * Provides host/admin controls for managing participant permissions: audio, video, screenshare, and chat.
 * Settings are saved to the room and enforced for all participants.
 *
 * Supports three levels of customization:
 * 1. **Basic Usage**: Use default modal UI with permission toggles and save functionality
 * 2. **Style Customization**: Override modal appearance with overlayStyle and contentStyle
 * 3. **Full Override**: Provide a custom template via customTemplate for complete control
 *
 * Key Features:
 * - Audio permission control (allow/disallow, allow but muted)
 * - Video permission control (allow/disallow, allow but off)
 * - Screenshare permission control (allow/disallow, allow certain roles)
 * - Chat permission control (allow/disallow, allow only host)
 * - Socket-based setting persistence
 *
 * @example
 * Basic Usage:
 * ```html
 * <app-event-settings-modal
 *   [isEventSettingsModalVisible]="showEventSettings"
 *   [audioSetting]="currentAudioSetting"
 *   [videoSetting]="currentVideoSetting"
 *   [screenshareSetting]="currentScreenshareSetting"
 *   [chatSetting]="currentChatSetting"
 *   [roomName]="currentRoom"
 *   [socket]="socketInstance"
 *   [updateAudioSetting]="setAudioSetting"
 *   [updateVideoSetting]="setVideoSetting"
 *   [updateScreenshareSetting]="setScreenshareSetting"
 *   [updateChatSetting]="setChatSetting"
 *   [onEventSettingsClose]="closeEventSettings">
 * </app-event-settings-modal>
 * ```
 *
 * @example
 * Style Customization:
 * ```html
 * <app-event-settings-modal
 *   [isEventSettingsModalVisible]="showEventSettings"
 *   [audioSetting]="currentAudioSetting"
 *   [videoSetting]="currentVideoSetting"
 *   [screenshareSetting]="currentScreenshareSetting"
 *   [chatSetting]="currentChatSetting"
 *   [roomName]="currentRoom"
 *   [socket]="socketInstance"
 *   [overlayStyle]="{
 *     backgroundColor: 'rgba(0, 0, 0, 0.8)'
 *   }"
 *   [contentStyle]="{
 *     backgroundColor: '#1e1e1e',
 *     borderRadius: '12px',
 *     padding: '25px'
 *   }"
 *   [backgroundColor]="'#2c3e50'"
 *   [position]="'center'"
 *   [onEventSettingsClose]="closeEventSettings">
 * </app-event-settings-modal>
 * ```
 *
 * @example
 * Custom Template Override:
 * ```html
 * <app-event-settings-modal
 *   [isEventSettingsModalVisible]="showEventSettings"
 *   [customTemplate]="customSettingsTemplate"
 *   [onEventSettingsClose]="closeEventSettings">
 * </app-event-settings-modal>
 *
 * <ng-template #customSettingsTemplate let-audioSetting="audioSetting" let-videoSetting="videoSetting" let-onSave="onSave">
 *   <div class="custom-settings">
 *     <h3>Room Permissions</h3>
 *     <label>
 *       Audio:
 *       <select [(ngModel)]="audioSetting">
 *         <option value="allow">Allow</option>
 *         <option value="disallow">Disallow</option>
 *       </select>
 *     </label>
 *     <label>
 *       Video:
 *       <select [(ngModel)]="videoSetting">
 *         <option value="allow">Allow</option>
 *         <option value="disallow">Disallow</option>
 *       </select>
 *     </label>
 *     <button (click)="onSave()">Save Settings</button>
 *   </div>
 * </ng-template>
 * ```
 *
 * @selector app-event-settings-modal
 * @standalone true
 * @imports CommonModule, FontAwesomeModule, FormsModule
 *
 * @input isEventSettingsModalVisible - Whether the modal is currently visible. Default: `false`
 * @input onEventSettingsClose - Callback function to close the modal. Default: `() => {}`
 * @input onModifyEventSettings - Callback to save modified settings. Default: `modifySettingsService.modifySettings`
 * @input position - Modal position on screen ('topLeft', 'topRight', 'bottomLeft', 'bottomRight'). Default: `'topRight'`
 * @input backgroundColor - Background color of the modal content. Default: `'#83c0e9'`
 * @input audioSetting - Current audio permission setting. Default: `''`
 * @input videoSetting - Current video permission setting. Default: `''`
 * @input screenshareSetting - Current screenshare permission setting. Default: `''`
 * @input chatSetting - Current chat permission setting. Default: `''`
 * @input updateAudioSetting - Function to update audio setting state. Default: `() => {}`
 * @input updateVideoSetting - Function to update video setting state. Default: `() => {}`
 * @input updateScreenshareSetting - Function to update screenshare setting state. Default: `() => {}`
 * @input updateChatSetting - Function to update chat setting state. Default: `() => {}`
 * @input updateIsSettingsModalVisible - Function to update modal visibility. Default: `() => {}`
 * @input roomName - Name of the room/session. Default: `''`
 * @input socket - Socket.io client instance for real-time communication. Default: `undefined`
 * @input showAlert - Optional alert function for displaying success/error messages. Default: `undefined`
 * @input overlayStyle - Custom CSS styles for the modal overlay backdrop. Default: `undefined`
 * @input contentStyle - Custom CSS styles for the modal content container. Default: `undefined`
 * @input customTemplate - Custom TemplateRef to completely replace default modal template. Default: `undefined`
 *
 * @method ngOnInit - Initializes component and sets up default modify settings handler
 * @method ngOnChanges - Updates internal setting states when modal visibility changes
 * @method updateStatesFromParameters - Synchronizes internal states with input props
 * @method handleSaveSettings - Saves modified settings via socket and closes modal
 * @method closeModal - Closes the modal via onEventSettingsClose callback
 * @method getCombinedOverlayStyle - Merges default and custom overlay styles
 * @method getCombinedContentStyle - Merges default and custom content styles
 * @method getModalContentStyle - Returns computed content styles with positioning
 */
export declare class EventSettingsModal implements OnInit, OnChanges {
    private modifySettingsService;
    isEventSettingsModalVisible: boolean;
    onEventSettingsClose: () => void;
    onModifyEventSettings: (options: ModifySettingsOptions) => Promise<void>;
    position: string;
    backgroundColor: string;
    audioSetting: string;
    videoSetting: string;
    screenshareSetting: string;
    chatSetting: string;
    updateAudioSetting: (setting: string) => void;
    updateVideoSetting: (setting: string) => void;
    updateScreenshareSetting: (setting: string) => void;
    updateChatSetting: (setting: string) => void;
    updateIsSettingsModalVisible: (isVisible: boolean) => void;
    roomName: string;
    socket: Socket;
    showAlert?: ShowAlert;
    overlayStyle?: Partial<CSSStyleDeclaration>;
    contentStyle?: Partial<CSSStyleDeclaration>;
    customTemplate?: any;
    audioState: string;
    videoState: string;
    screenshareState: string;
    chatState: string;
    faTimes: import("@fortawesome/fontawesome-common-types").IconDefinition;
    constructor(modifySettingsService: ModifySettings);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    updateStatesFromParameters(): void;
    getModalContentStyle(): {
        backgroundColor: string;
        borderRadius: string;
        padding: string;
        width: string;
        maxHeight: string;
        overflowY: string;
        top: string;
        bottom: string;
        left: string;
        right: string;
    };
    handleSaveSettings(): Promise<void>;
    closeModal(): void;
    getCombinedOverlayStyle(): {
        [x: number]: string | undefined;
        accentColor?: string | undefined;
        alignContent?: string | undefined;
        alignItems?: string | undefined;
        alignSelf?: string | undefined;
        alignmentBaseline?: string | undefined;
        all?: string | undefined;
        animation?: string | undefined;
        animationComposition?: string | undefined;
        animationDelay?: string | undefined;
        animationDirection?: string | undefined;
        animationDuration?: string | undefined;
        animationFillMode?: string | undefined;
        animationIterationCount?: string | undefined;
        animationName?: string | undefined;
        animationPlayState?: string | undefined;
        animationTimingFunction?: string | undefined;
        appearance?: string | undefined;
        aspectRatio?: string | undefined;
        backdropFilter?: string | undefined;
        backfaceVisibility?: string | undefined;
        background?: string | undefined;
        backgroundAttachment?: string | undefined;
        backgroundBlendMode?: string | undefined;
        backgroundClip?: string | undefined;
        backgroundColor?: string | undefined;
        backgroundImage?: string | undefined;
        backgroundOrigin?: string | undefined;
        backgroundPosition?: string | undefined;
        backgroundPositionX?: string | undefined;
        backgroundPositionY?: string | undefined;
        backgroundRepeat?: string | undefined;
        backgroundSize?: string | undefined;
        baselineShift?: string | undefined;
        baselineSource?: string | undefined;
        blockSize?: string | undefined;
        border?: string | undefined;
        borderBlock?: string | undefined;
        borderBlockColor?: string | undefined;
        borderBlockEnd?: string | undefined;
        borderBlockEndColor?: string | undefined;
        borderBlockEndStyle?: string | undefined;
        borderBlockEndWidth?: string | undefined;
        borderBlockStart?: string | undefined;
        borderBlockStartColor?: string | undefined;
        borderBlockStartStyle?: string | undefined;
        borderBlockStartWidth?: string | undefined;
        borderBlockStyle?: string | undefined;
        borderBlockWidth?: string | undefined;
        borderBottom?: string | undefined;
        borderBottomColor?: string | undefined;
        borderBottomLeftRadius?: string | undefined;
        borderBottomRightRadius?: string | undefined;
        borderBottomStyle?: string | undefined;
        borderBottomWidth?: string | undefined;
        borderCollapse?: string | undefined;
        borderColor?: string | undefined;
        borderEndEndRadius?: string | undefined;
        borderEndStartRadius?: string | undefined;
        borderImage?: string | undefined;
        borderImageOutset?: string | undefined;
        borderImageRepeat?: string | undefined;
        borderImageSlice?: string | undefined;
        borderImageSource?: string | undefined;
        borderImageWidth?: string | undefined;
        borderInline?: string | undefined;
        borderInlineColor?: string | undefined;
        borderInlineEnd?: string | undefined;
        borderInlineEndColor?: string | undefined;
        borderInlineEndStyle?: string | undefined;
        borderInlineEndWidth?: string | undefined;
        borderInlineStart?: string | undefined;
        borderInlineStartColor?: string | undefined;
        borderInlineStartStyle?: string | undefined;
        borderInlineStartWidth?: string | undefined;
        borderInlineStyle?: string | undefined;
        borderInlineWidth?: string | undefined;
        borderLeft?: string | undefined;
        borderLeftColor?: string | undefined;
        borderLeftStyle?: string | undefined;
        borderLeftWidth?: string | undefined;
        borderRadius?: string | undefined;
        borderRight?: string | undefined;
        borderRightColor?: string | undefined;
        borderRightStyle?: string | undefined;
        borderRightWidth?: string | undefined;
        borderSpacing?: string | undefined;
        borderStartEndRadius?: string | undefined;
        borderStartStartRadius?: string | undefined;
        borderStyle?: string | undefined;
        borderTop?: string | undefined;
        borderTopColor?: string | undefined;
        borderTopLeftRadius?: string | undefined;
        borderTopRightRadius?: string | undefined;
        borderTopStyle?: string | undefined;
        borderTopWidth?: string | undefined;
        borderWidth?: string | undefined;
        bottom?: string | undefined;
        boxShadow?: string | undefined;
        boxSizing?: string | undefined;
        breakAfter?: string | undefined;
        breakBefore?: string | undefined;
        breakInside?: string | undefined;
        captionSide?: string | undefined;
        caretColor?: string | undefined;
        clear?: string | undefined;
        clip?: string | undefined;
        clipPath?: string | undefined;
        clipRule?: string | undefined;
        color?: string | undefined;
        colorInterpolation?: string | undefined;
        colorInterpolationFilters?: string | undefined;
        colorScheme?: string | undefined;
        columnCount?: string | undefined;
        columnFill?: string | undefined;
        columnGap?: string | undefined;
        columnRule?: string | undefined;
        columnRuleColor?: string | undefined;
        columnRuleStyle?: string | undefined;
        columnRuleWidth?: string | undefined;
        columnSpan?: string | undefined;
        columnWidth?: string | undefined;
        columns?: string | undefined;
        contain?: string | undefined;
        containIntrinsicBlockSize?: string | undefined;
        containIntrinsicHeight?: string | undefined;
        containIntrinsicInlineSize?: string | undefined;
        containIntrinsicSize?: string | undefined;
        containIntrinsicWidth?: string | undefined;
        container?: string | undefined;
        containerName?: string | undefined;
        containerType?: string | undefined;
        content?: string | undefined;
        contentVisibility?: string | undefined;
        counterIncrement?: string | undefined;
        counterReset?: string | undefined;
        counterSet?: string | undefined;
        cssFloat?: string | undefined;
        cssText?: string | undefined;
        cursor?: string | undefined;
        cx?: string | undefined;
        cy?: string | undefined;
        d?: string | undefined;
        direction?: string | undefined;
        display?: string | undefined;
        dominantBaseline?: string | undefined;
        emptyCells?: string | undefined;
        fill?: string | undefined;
        fillOpacity?: string | undefined;
        fillRule?: string | undefined;
        filter?: string | undefined;
        flex?: string | undefined;
        flexBasis?: string | undefined;
        flexDirection?: string | undefined;
        flexFlow?: string | undefined;
        flexGrow?: string | undefined;
        flexShrink?: string | undefined;
        flexWrap?: string | undefined;
        float?: string | undefined;
        floodColor?: string | undefined;
        floodOpacity?: string | undefined;
        font?: string | undefined;
        fontFamily?: string | undefined;
        fontFeatureSettings?: string | undefined;
        fontKerning?: string | undefined;
        fontOpticalSizing?: string | undefined;
        fontPalette?: string | undefined;
        fontSize?: string | undefined;
        fontSizeAdjust?: string | undefined;
        fontStretch?: string | undefined;
        fontStyle?: string | undefined;
        fontSynthesis?: string | undefined;
        fontSynthesisSmallCaps?: string | undefined;
        fontSynthesisStyle?: string | undefined;
        fontSynthesisWeight?: string | undefined;
        fontVariant?: string | undefined;
        fontVariantAlternates?: string | undefined;
        fontVariantCaps?: string | undefined;
        fontVariantEastAsian?: string | undefined;
        fontVariantLigatures?: string | undefined;
        fontVariantNumeric?: string | undefined;
        fontVariantPosition?: string | undefined;
        fontVariationSettings?: string | undefined;
        fontWeight?: string | undefined;
        forcedColorAdjust?: string | undefined;
        gap?: string | undefined;
        grid?: string | undefined;
        gridArea?: string | undefined;
        gridAutoColumns?: string | undefined;
        gridAutoFlow?: string | undefined;
        gridAutoRows?: string | undefined;
        gridColumn?: string | undefined;
        gridColumnEnd?: string | undefined;
        gridColumnGap?: string | undefined;
        gridColumnStart?: string | undefined;
        gridGap?: string | undefined;
        gridRow?: string | undefined;
        gridRowEnd?: string | undefined;
        gridRowGap?: string | undefined;
        gridRowStart?: string | undefined;
        gridTemplate?: string | undefined;
        gridTemplateAreas?: string | undefined;
        gridTemplateColumns?: string | undefined;
        gridTemplateRows?: string | undefined;
        height?: string | undefined;
        hyphenateCharacter?: string | undefined;
        hyphens?: string | undefined;
        imageOrientation?: string | undefined;
        imageRendering?: string | undefined;
        inlineSize?: string | undefined;
        inset?: string | undefined;
        insetBlock?: string | undefined;
        insetBlockEnd?: string | undefined;
        insetBlockStart?: string | undefined;
        insetInline?: string | undefined;
        insetInlineEnd?: string | undefined;
        insetInlineStart?: string | undefined;
        isolation?: string | undefined;
        justifyContent?: string | undefined;
        justifyItems?: string | undefined;
        justifySelf?: string | undefined;
        left?: string | undefined;
        length?: number | undefined;
        letterSpacing?: string | undefined;
        lightingColor?: string | undefined;
        lineBreak?: string | undefined;
        lineHeight?: string | undefined;
        listStyle?: string | undefined;
        listStyleImage?: string | undefined;
        listStylePosition?: string | undefined;
        listStyleType?: string | undefined;
        margin?: string | undefined;
        marginBlock?: string | undefined;
        marginBlockEnd?: string | undefined;
        marginBlockStart?: string | undefined;
        marginBottom?: string | undefined;
        marginInline?: string | undefined;
        marginInlineEnd?: string | undefined;
        marginInlineStart?: string | undefined;
        marginLeft?: string | undefined;
        marginRight?: string | undefined;
        marginTop?: string | undefined;
        marker?: string | undefined;
        markerEnd?: string | undefined;
        markerMid?: string | undefined;
        markerStart?: string | undefined;
        mask?: string | undefined;
        maskClip?: string | undefined;
        maskComposite?: string | undefined;
        maskImage?: string | undefined;
        maskMode?: string | undefined;
        maskOrigin?: string | undefined;
        maskPosition?: string | undefined;
        maskRepeat?: string | undefined;
        maskSize?: string | undefined;
        maskType?: string | undefined;
        mathDepth?: string | undefined;
        mathStyle?: string | undefined;
        maxBlockSize?: string | undefined;
        maxHeight?: string | undefined;
        maxInlineSize?: string | undefined;
        maxWidth?: string | undefined;
        minBlockSize?: string | undefined;
        minHeight?: string | undefined;
        minInlineSize?: string | undefined;
        minWidth?: string | undefined;
        mixBlendMode?: string | undefined;
        objectFit?: string | undefined;
        objectPosition?: string | undefined;
        offset?: string | undefined;
        offsetAnchor?: string | undefined;
        offsetDistance?: string | undefined;
        offsetPath?: string | undefined;
        offsetPosition?: string | undefined;
        offsetRotate?: string | undefined;
        opacity?: string | undefined;
        order?: string | undefined;
        orphans?: string | undefined;
        outline?: string | undefined;
        outlineColor?: string | undefined;
        outlineOffset?: string | undefined;
        outlineStyle?: string | undefined;
        outlineWidth?: string | undefined;
        overflow?: string | undefined;
        overflowAnchor?: string | undefined;
        overflowClipMargin?: string | undefined;
        overflowWrap?: string | undefined;
        overflowX?: string | undefined;
        overflowY?: string | undefined;
        overscrollBehavior?: string | undefined;
        overscrollBehaviorBlock?: string | undefined;
        overscrollBehaviorInline?: string | undefined;
        overscrollBehaviorX?: string | undefined;
        overscrollBehaviorY?: string | undefined;
        padding?: string | undefined;
        paddingBlock?: string | undefined;
        paddingBlockEnd?: string | undefined;
        paddingBlockStart?: string | undefined;
        paddingBottom?: string | undefined;
        paddingInline?: string | undefined;
        paddingInlineEnd?: string | undefined;
        paddingInlineStart?: string | undefined;
        paddingLeft?: string | undefined;
        paddingRight?: string | undefined;
        paddingTop?: string | undefined;
        page?: string | undefined;
        pageBreakAfter?: string | undefined;
        pageBreakBefore?: string | undefined;
        pageBreakInside?: string | undefined;
        paintOrder?: string | undefined;
        parentRule?: CSSRule | null | undefined;
        perspective?: string | undefined;
        perspectiveOrigin?: string | undefined;
        placeContent?: string | undefined;
        placeItems?: string | undefined;
        placeSelf?: string | undefined;
        pointerEvents?: string | undefined;
        position?: string | undefined;
        printColorAdjust?: string | undefined;
        quotes?: string | undefined;
        r?: string | undefined;
        resize?: string | undefined;
        right?: string | undefined;
        rotate?: string | undefined;
        rowGap?: string | undefined;
        rubyPosition?: string | undefined;
        rx?: string | undefined;
        ry?: string | undefined;
        scale?: string | undefined;
        scrollBehavior?: string | undefined;
        scrollMargin?: string | undefined;
        scrollMarginBlock?: string | undefined;
        scrollMarginBlockEnd?: string | undefined;
        scrollMarginBlockStart?: string | undefined;
        scrollMarginBottom?: string | undefined;
        scrollMarginInline?: string | undefined;
        scrollMarginInlineEnd?: string | undefined;
        scrollMarginInlineStart?: string | undefined;
        scrollMarginLeft?: string | undefined;
        scrollMarginRight?: string | undefined;
        scrollMarginTop?: string | undefined;
        scrollPadding?: string | undefined;
        scrollPaddingBlock?: string | undefined;
        scrollPaddingBlockEnd?: string | undefined;
        scrollPaddingBlockStart?: string | undefined;
        scrollPaddingBottom?: string | undefined;
        scrollPaddingInline?: string | undefined;
        scrollPaddingInlineEnd?: string | undefined;
        scrollPaddingInlineStart?: string | undefined;
        scrollPaddingLeft?: string | undefined;
        scrollPaddingRight?: string | undefined;
        scrollPaddingTop?: string | undefined;
        scrollSnapAlign?: string | undefined;
        scrollSnapStop?: string | undefined;
        scrollSnapType?: string | undefined;
        scrollbarColor?: string | undefined;
        scrollbarGutter?: string | undefined;
        scrollbarWidth?: string | undefined;
        shapeImageThreshold?: string | undefined;
        shapeMargin?: string | undefined;
        shapeOutside?: string | undefined;
        shapeRendering?: string | undefined;
        stopColor?: string | undefined;
        stopOpacity?: string | undefined;
        stroke?: string | undefined;
        strokeDasharray?: string | undefined;
        strokeDashoffset?: string | undefined;
        strokeLinecap?: string | undefined;
        strokeLinejoin?: string | undefined;
        strokeMiterlimit?: string | undefined;
        strokeOpacity?: string | undefined;
        strokeWidth?: string | undefined;
        tabSize?: string | undefined;
        tableLayout?: string | undefined;
        textAlign?: string | undefined;
        textAlignLast?: string | undefined;
        textAnchor?: string | undefined;
        textCombineUpright?: string | undefined;
        textDecoration?: string | undefined;
        textDecorationColor?: string | undefined;
        textDecorationLine?: string | undefined;
        textDecorationSkipInk?: string | undefined;
        textDecorationStyle?: string | undefined;
        textDecorationThickness?: string | undefined;
        textEmphasis?: string | undefined;
        textEmphasisColor?: string | undefined;
        textEmphasisPosition?: string | undefined;
        textEmphasisStyle?: string | undefined;
        textIndent?: string | undefined;
        textOrientation?: string | undefined;
        textOverflow?: string | undefined;
        textRendering?: string | undefined;
        textShadow?: string | undefined;
        textTransform?: string | undefined;
        textUnderlineOffset?: string | undefined;
        textUnderlinePosition?: string | undefined;
        textWrap?: string | undefined;
        textWrapMode?: string | undefined;
        textWrapStyle?: string | undefined;
        top?: string | undefined;
        touchAction?: string | undefined;
        transform?: string | undefined;
        transformBox?: string | undefined;
        transformOrigin?: string | undefined;
        transformStyle?: string | undefined;
        transition?: string | undefined;
        transitionBehavior?: string | undefined;
        transitionDelay?: string | undefined;
        transitionDuration?: string | undefined;
        transitionProperty?: string | undefined;
        transitionTimingFunction?: string | undefined;
        translate?: string | undefined;
        unicodeBidi?: string | undefined;
        userSelect?: string | undefined;
        vectorEffect?: string | undefined;
        verticalAlign?: string | undefined;
        visibility?: string | undefined;
        webkitAlignContent?: string | undefined;
        webkitAlignItems?: string | undefined;
        webkitAlignSelf?: string | undefined;
        webkitAnimation?: string | undefined;
        webkitAnimationDelay?: string | undefined;
        webkitAnimationDirection?: string | undefined;
        webkitAnimationDuration?: string | undefined;
        webkitAnimationFillMode?: string | undefined;
        webkitAnimationIterationCount?: string | undefined;
        webkitAnimationName?: string | undefined;
        webkitAnimationPlayState?: string | undefined;
        webkitAnimationTimingFunction?: string | undefined;
        webkitAppearance?: string | undefined;
        webkitBackfaceVisibility?: string | undefined;
        webkitBackgroundClip?: string | undefined;
        webkitBackgroundOrigin?: string | undefined;
        webkitBackgroundSize?: string | undefined;
        webkitBorderBottomLeftRadius?: string | undefined;
        webkitBorderBottomRightRadius?: string | undefined;
        webkitBorderRadius?: string | undefined;
        webkitBorderTopLeftRadius?: string | undefined;
        webkitBorderTopRightRadius?: string | undefined;
        webkitBoxAlign?: string | undefined;
        webkitBoxFlex?: string | undefined;
        webkitBoxOrdinalGroup?: string | undefined;
        webkitBoxOrient?: string | undefined;
        webkitBoxPack?: string | undefined;
        webkitBoxShadow?: string | undefined;
        webkitBoxSizing?: string | undefined;
        webkitFilter?: string | undefined;
        webkitFlex?: string | undefined;
        webkitFlexBasis?: string | undefined;
        webkitFlexDirection?: string | undefined;
        webkitFlexFlow?: string | undefined;
        webkitFlexGrow?: string | undefined;
        webkitFlexShrink?: string | undefined;
        webkitFlexWrap?: string | undefined;
        webkitJustifyContent?: string | undefined;
        webkitLineClamp?: string | undefined;
        webkitMask?: string | undefined;
        webkitMaskBoxImage?: string | undefined;
        webkitMaskBoxImageOutset?: string | undefined;
        webkitMaskBoxImageRepeat?: string | undefined;
        webkitMaskBoxImageSlice?: string | undefined;
        webkitMaskBoxImageSource?: string | undefined;
        webkitMaskBoxImageWidth?: string | undefined;
        webkitMaskClip?: string | undefined;
        webkitMaskComposite?: string | undefined;
        webkitMaskImage?: string | undefined;
        webkitMaskOrigin?: string | undefined;
        webkitMaskPosition?: string | undefined;
        webkitMaskRepeat?: string | undefined;
        webkitMaskSize?: string | undefined;
        webkitOrder?: string | undefined;
        webkitPerspective?: string | undefined;
        webkitPerspectiveOrigin?: string | undefined;
        webkitTextFillColor?: string | undefined;
        webkitTextSizeAdjust?: string | undefined;
        webkitTextStroke?: string | undefined;
        webkitTextStrokeColor?: string | undefined;
        webkitTextStrokeWidth?: string | undefined;
        webkitTransform?: string | undefined;
        webkitTransformOrigin?: string | undefined;
        webkitTransformStyle?: string | undefined;
        webkitTransition?: string | undefined;
        webkitTransitionDelay?: string | undefined;
        webkitTransitionDuration?: string | undefined;
        webkitTransitionProperty?: string | undefined;
        webkitTransitionTimingFunction?: string | undefined;
        webkitUserSelect?: string | undefined;
        whiteSpace?: string | undefined;
        whiteSpaceCollapse?: string | undefined;
        widows?: string | undefined;
        width?: string | undefined;
        willChange?: string | undefined;
        wordBreak?: string | undefined;
        wordSpacing?: string | undefined;
        wordWrap?: string | undefined;
        writingMode?: string | undefined;
        x?: string | undefined;
        y?: string | undefined;
        zIndex?: string | undefined;
        zoom?: string | undefined;
        getPropertyPriority?: ((property: string) => string) | undefined;
        getPropertyValue?: ((property: string) => string) | undefined;
        item?: ((index: number) => string) | undefined;
        removeProperty?: ((property: string) => string) | undefined;
        setProperty?: ((property: string, value: string | null, priority?: string) => void) | undefined;
    };
    getCombinedContentStyle(): {
        accentColor?: string | undefined;
        alignContent?: string | undefined;
        alignItems?: string | undefined;
        alignSelf?: string | undefined;
        alignmentBaseline?: string | undefined;
        all?: string | undefined;
        animation?: string | undefined;
        animationComposition?: string | undefined;
        animationDelay?: string | undefined;
        animationDirection?: string | undefined;
        animationDuration?: string | undefined;
        animationFillMode?: string | undefined;
        animationIterationCount?: string | undefined;
        animationName?: string | undefined;
        animationPlayState?: string | undefined;
        animationTimingFunction?: string | undefined;
        appearance?: string | undefined;
        aspectRatio?: string | undefined;
        backdropFilter?: string | undefined;
        backfaceVisibility?: string | undefined;
        background?: string | undefined;
        backgroundAttachment?: string | undefined;
        backgroundBlendMode?: string | undefined;
        backgroundClip?: string | undefined;
        backgroundColor: string;
        backgroundImage?: string | undefined;
        backgroundOrigin?: string | undefined;
        backgroundPosition?: string | undefined;
        backgroundPositionX?: string | undefined;
        backgroundPositionY?: string | undefined;
        backgroundRepeat?: string | undefined;
        backgroundSize?: string | undefined;
        baselineShift?: string | undefined;
        baselineSource?: string | undefined;
        blockSize?: string | undefined;
        border?: string | undefined;
        borderBlock?: string | undefined;
        borderBlockColor?: string | undefined;
        borderBlockEnd?: string | undefined;
        borderBlockEndColor?: string | undefined;
        borderBlockEndStyle?: string | undefined;
        borderBlockEndWidth?: string | undefined;
        borderBlockStart?: string | undefined;
        borderBlockStartColor?: string | undefined;
        borderBlockStartStyle?: string | undefined;
        borderBlockStartWidth?: string | undefined;
        borderBlockStyle?: string | undefined;
        borderBlockWidth?: string | undefined;
        borderBottom?: string | undefined;
        borderBottomColor?: string | undefined;
        borderBottomLeftRadius?: string | undefined;
        borderBottomRightRadius?: string | undefined;
        borderBottomStyle?: string | undefined;
        borderBottomWidth?: string | undefined;
        borderCollapse?: string | undefined;
        borderColor?: string | undefined;
        borderEndEndRadius?: string | undefined;
        borderEndStartRadius?: string | undefined;
        borderImage?: string | undefined;
        borderImageOutset?: string | undefined;
        borderImageRepeat?: string | undefined;
        borderImageSlice?: string | undefined;
        borderImageSource?: string | undefined;
        borderImageWidth?: string | undefined;
        borderInline?: string | undefined;
        borderInlineColor?: string | undefined;
        borderInlineEnd?: string | undefined;
        borderInlineEndColor?: string | undefined;
        borderInlineEndStyle?: string | undefined;
        borderInlineEndWidth?: string | undefined;
        borderInlineStart?: string | undefined;
        borderInlineStartColor?: string | undefined;
        borderInlineStartStyle?: string | undefined;
        borderInlineStartWidth?: string | undefined;
        borderInlineStyle?: string | undefined;
        borderInlineWidth?: string | undefined;
        borderLeft?: string | undefined;
        borderLeftColor?: string | undefined;
        borderLeftStyle?: string | undefined;
        borderLeftWidth?: string | undefined;
        borderRadius: string;
        borderRight?: string | undefined;
        borderRightColor?: string | undefined;
        borderRightStyle?: string | undefined;
        borderRightWidth?: string | undefined;
        borderSpacing?: string | undefined;
        borderStartEndRadius?: string | undefined;
        borderStartStartRadius?: string | undefined;
        borderStyle?: string | undefined;
        borderTop?: string | undefined;
        borderTopColor?: string | undefined;
        borderTopLeftRadius?: string | undefined;
        borderTopRightRadius?: string | undefined;
        borderTopStyle?: string | undefined;
        borderTopWidth?: string | undefined;
        borderWidth?: string | undefined;
        bottom: string;
        boxShadow?: string | undefined;
        boxSizing?: string | undefined;
        breakAfter?: string | undefined;
        breakBefore?: string | undefined;
        breakInside?: string | undefined;
        captionSide?: string | undefined;
        caretColor?: string | undefined;
        clear?: string | undefined;
        clip?: string | undefined;
        clipPath?: string | undefined;
        clipRule?: string | undefined;
        color?: string | undefined;
        colorInterpolation?: string | undefined;
        colorInterpolationFilters?: string | undefined;
        colorScheme?: string | undefined;
        columnCount?: string | undefined;
        columnFill?: string | undefined;
        columnGap?: string | undefined;
        columnRule?: string | undefined;
        columnRuleColor?: string | undefined;
        columnRuleStyle?: string | undefined;
        columnRuleWidth?: string | undefined;
        columnSpan?: string | undefined;
        columnWidth?: string | undefined;
        columns?: string | undefined;
        contain?: string | undefined;
        containIntrinsicBlockSize?: string | undefined;
        containIntrinsicHeight?: string | undefined;
        containIntrinsicInlineSize?: string | undefined;
        containIntrinsicSize?: string | undefined;
        containIntrinsicWidth?: string | undefined;
        container?: string | undefined;
        containerName?: string | undefined;
        containerType?: string | undefined;
        content?: string | undefined;
        contentVisibility?: string | undefined;
        counterIncrement?: string | undefined;
        counterReset?: string | undefined;
        counterSet?: string | undefined;
        cssFloat?: string | undefined;
        cssText?: string | undefined;
        cursor?: string | undefined;
        cx?: string | undefined;
        cy?: string | undefined;
        d?: string | undefined;
        direction?: string | undefined;
        display?: string | undefined;
        dominantBaseline?: string | undefined;
        emptyCells?: string | undefined;
        fill?: string | undefined;
        fillOpacity?: string | undefined;
        fillRule?: string | undefined;
        filter?: string | undefined;
        flex?: string | undefined;
        flexBasis?: string | undefined;
        flexDirection?: string | undefined;
        flexFlow?: string | undefined;
        flexGrow?: string | undefined;
        flexShrink?: string | undefined;
        flexWrap?: string | undefined;
        float?: string | undefined;
        floodColor?: string | undefined;
        floodOpacity?: string | undefined;
        font?: string | undefined;
        fontFamily?: string | undefined;
        fontFeatureSettings?: string | undefined;
        fontKerning?: string | undefined;
        fontOpticalSizing?: string | undefined;
        fontPalette?: string | undefined;
        fontSize?: string | undefined;
        fontSizeAdjust?: string | undefined;
        fontStretch?: string | undefined;
        fontStyle?: string | undefined;
        fontSynthesis?: string | undefined;
        fontSynthesisSmallCaps?: string | undefined;
        fontSynthesisStyle?: string | undefined;
        fontSynthesisWeight?: string | undefined;
        fontVariant?: string | undefined;
        fontVariantAlternates?: string | undefined;
        fontVariantCaps?: string | undefined;
        fontVariantEastAsian?: string | undefined;
        fontVariantLigatures?: string | undefined;
        fontVariantNumeric?: string | undefined;
        fontVariantPosition?: string | undefined;
        fontVariationSettings?: string | undefined;
        fontWeight?: string | undefined;
        forcedColorAdjust?: string | undefined;
        gap?: string | undefined;
        grid?: string | undefined;
        gridArea?: string | undefined;
        gridAutoColumns?: string | undefined;
        gridAutoFlow?: string | undefined;
        gridAutoRows?: string | undefined;
        gridColumn?: string | undefined;
        gridColumnEnd?: string | undefined;
        gridColumnGap?: string | undefined;
        gridColumnStart?: string | undefined;
        gridGap?: string | undefined;
        gridRow?: string | undefined;
        gridRowEnd?: string | undefined;
        gridRowGap?: string | undefined;
        gridRowStart?: string | undefined;
        gridTemplate?: string | undefined;
        gridTemplateAreas?: string | undefined;
        gridTemplateColumns?: string | undefined;
        gridTemplateRows?: string | undefined;
        height?: string | undefined;
        hyphenateCharacter?: string | undefined;
        hyphens?: string | undefined;
        imageOrientation?: string | undefined;
        imageRendering?: string | undefined;
        inlineSize?: string | undefined;
        inset?: string | undefined;
        insetBlock?: string | undefined;
        insetBlockEnd?: string | undefined;
        insetBlockStart?: string | undefined;
        insetInline?: string | undefined;
        insetInlineEnd?: string | undefined;
        insetInlineStart?: string | undefined;
        isolation?: string | undefined;
        justifyContent?: string | undefined;
        justifyItems?: string | undefined;
        justifySelf?: string | undefined;
        left: string;
        length?: number | undefined;
        letterSpacing?: string | undefined;
        lightingColor?: string | undefined;
        lineBreak?: string | undefined;
        lineHeight?: string | undefined;
        listStyle?: string | undefined;
        listStyleImage?: string | undefined;
        listStylePosition?: string | undefined;
        listStyleType?: string | undefined;
        margin?: string | undefined;
        marginBlock?: string | undefined;
        marginBlockEnd?: string | undefined;
        marginBlockStart?: string | undefined;
        marginBottom?: string | undefined;
        marginInline?: string | undefined;
        marginInlineEnd?: string | undefined;
        marginInlineStart?: string | undefined;
        marginLeft?: string | undefined;
        marginRight?: string | undefined;
        marginTop?: string | undefined;
        marker?: string | undefined;
        markerEnd?: string | undefined;
        markerMid?: string | undefined;
        markerStart?: string | undefined;
        mask?: string | undefined;
        maskClip?: string | undefined;
        maskComposite?: string | undefined;
        maskImage?: string | undefined;
        maskMode?: string | undefined;
        maskOrigin?: string | undefined;
        maskPosition?: string | undefined;
        maskRepeat?: string | undefined;
        maskSize?: string | undefined;
        maskType?: string | undefined;
        mathDepth?: string | undefined;
        mathStyle?: string | undefined;
        maxBlockSize?: string | undefined;
        maxHeight: string;
        maxInlineSize?: string | undefined;
        maxWidth?: string | undefined;
        minBlockSize?: string | undefined;
        minHeight?: string | undefined;
        minInlineSize?: string | undefined;
        minWidth?: string | undefined;
        mixBlendMode?: string | undefined;
        objectFit?: string | undefined;
        objectPosition?: string | undefined;
        offset?: string | undefined;
        offsetAnchor?: string | undefined;
        offsetDistance?: string | undefined;
        offsetPath?: string | undefined;
        offsetPosition?: string | undefined;
        offsetRotate?: string | undefined;
        opacity?: string | undefined;
        order?: string | undefined;
        orphans?: string | undefined;
        outline?: string | undefined;
        outlineColor?: string | undefined;
        outlineOffset?: string | undefined;
        outlineStyle?: string | undefined;
        outlineWidth?: string | undefined;
        overflow?: string | undefined;
        overflowAnchor?: string | undefined;
        overflowClipMargin?: string | undefined;
        overflowWrap?: string | undefined;
        overflowX?: string | undefined;
        overflowY: string;
        overscrollBehavior?: string | undefined;
        overscrollBehaviorBlock?: string | undefined;
        overscrollBehaviorInline?: string | undefined;
        overscrollBehaviorX?: string | undefined;
        overscrollBehaviorY?: string | undefined;
        padding: string;
        paddingBlock?: string | undefined;
        paddingBlockEnd?: string | undefined;
        paddingBlockStart?: string | undefined;
        paddingBottom?: string | undefined;
        paddingInline?: string | undefined;
        paddingInlineEnd?: string | undefined;
        paddingInlineStart?: string | undefined;
        paddingLeft?: string | undefined;
        paddingRight?: string | undefined;
        paddingTop?: string | undefined;
        page?: string | undefined;
        pageBreakAfter?: string | undefined;
        pageBreakBefore?: string | undefined;
        pageBreakInside?: string | undefined;
        paintOrder?: string | undefined;
        parentRule?: CSSRule | null | undefined;
        perspective?: string | undefined;
        perspectiveOrigin?: string | undefined;
        placeContent?: string | undefined;
        placeItems?: string | undefined;
        placeSelf?: string | undefined;
        pointerEvents?: string | undefined;
        position?: string | undefined;
        printColorAdjust?: string | undefined;
        quotes?: string | undefined;
        r?: string | undefined;
        resize?: string | undefined;
        right: string;
        rotate?: string | undefined;
        rowGap?: string | undefined;
        rubyPosition?: string | undefined;
        rx?: string | undefined;
        ry?: string | undefined;
        scale?: string | undefined;
        scrollBehavior?: string | undefined;
        scrollMargin?: string | undefined;
        scrollMarginBlock?: string | undefined;
        scrollMarginBlockEnd?: string | undefined;
        scrollMarginBlockStart?: string | undefined;
        scrollMarginBottom?: string | undefined;
        scrollMarginInline?: string | undefined;
        scrollMarginInlineEnd?: string | undefined;
        scrollMarginInlineStart?: string | undefined;
        scrollMarginLeft?: string | undefined;
        scrollMarginRight?: string | undefined;
        scrollMarginTop?: string | undefined;
        scrollPadding?: string | undefined;
        scrollPaddingBlock?: string | undefined;
        scrollPaddingBlockEnd?: string | undefined;
        scrollPaddingBlockStart?: string | undefined;
        scrollPaddingBottom?: string | undefined;
        scrollPaddingInline?: string | undefined;
        scrollPaddingInlineEnd?: string | undefined;
        scrollPaddingInlineStart?: string | undefined;
        scrollPaddingLeft?: string | undefined;
        scrollPaddingRight?: string | undefined;
        scrollPaddingTop?: string | undefined;
        scrollSnapAlign?: string | undefined;
        scrollSnapStop?: string | undefined;
        scrollSnapType?: string | undefined;
        scrollbarColor?: string | undefined;
        scrollbarGutter?: string | undefined;
        scrollbarWidth?: string | undefined;
        shapeImageThreshold?: string | undefined;
        shapeMargin?: string | undefined;
        shapeOutside?: string | undefined;
        shapeRendering?: string | undefined;
        stopColor?: string | undefined;
        stopOpacity?: string | undefined;
        stroke?: string | undefined;
        strokeDasharray?: string | undefined;
        strokeDashoffset?: string | undefined;
        strokeLinecap?: string | undefined;
        strokeLinejoin?: string | undefined;
        strokeMiterlimit?: string | undefined;
        strokeOpacity?: string | undefined;
        strokeWidth?: string | undefined;
        tabSize?: string | undefined;
        tableLayout?: string | undefined;
        textAlign?: string | undefined;
        textAlignLast?: string | undefined;
        textAnchor?: string | undefined;
        textCombineUpright?: string | undefined;
        textDecoration?: string | undefined;
        textDecorationColor?: string | undefined;
        textDecorationLine?: string | undefined;
        textDecorationSkipInk?: string | undefined;
        textDecorationStyle?: string | undefined;
        textDecorationThickness?: string | undefined;
        textEmphasis?: string | undefined;
        textEmphasisColor?: string | undefined;
        textEmphasisPosition?: string | undefined;
        textEmphasisStyle?: string | undefined;
        textIndent?: string | undefined;
        textOrientation?: string | undefined;
        textOverflow?: string | undefined;
        textRendering?: string | undefined;
        textShadow?: string | undefined;
        textTransform?: string | undefined;
        textUnderlineOffset?: string | undefined;
        textUnderlinePosition?: string | undefined;
        textWrap?: string | undefined;
        textWrapMode?: string | undefined;
        textWrapStyle?: string | undefined;
        top: string;
        touchAction?: string | undefined;
        transform?: string | undefined;
        transformBox?: string | undefined;
        transformOrigin?: string | undefined;
        transformStyle?: string | undefined;
        transition?: string | undefined;
        transitionBehavior?: string | undefined;
        transitionDelay?: string | undefined;
        transitionDuration?: string | undefined;
        transitionProperty?: string | undefined;
        transitionTimingFunction?: string | undefined;
        translate?: string | undefined;
        unicodeBidi?: string | undefined;
        userSelect?: string | undefined;
        vectorEffect?: string | undefined;
        verticalAlign?: string | undefined;
        visibility?: string | undefined;
        webkitAlignContent?: string | undefined;
        webkitAlignItems?: string | undefined;
        webkitAlignSelf?: string | undefined;
        webkitAnimation?: string | undefined;
        webkitAnimationDelay?: string | undefined;
        webkitAnimationDirection?: string | undefined;
        webkitAnimationDuration?: string | undefined;
        webkitAnimationFillMode?: string | undefined;
        webkitAnimationIterationCount?: string | undefined;
        webkitAnimationName?: string | undefined;
        webkitAnimationPlayState?: string | undefined;
        webkitAnimationTimingFunction?: string | undefined;
        webkitAppearance?: string | undefined;
        webkitBackfaceVisibility?: string | undefined;
        webkitBackgroundClip?: string | undefined;
        webkitBackgroundOrigin?: string | undefined;
        webkitBackgroundSize?: string | undefined;
        webkitBorderBottomLeftRadius?: string | undefined;
        webkitBorderBottomRightRadius?: string | undefined;
        webkitBorderRadius?: string | undefined;
        webkitBorderTopLeftRadius?: string | undefined;
        webkitBorderTopRightRadius?: string | undefined;
        webkitBoxAlign?: string | undefined;
        webkitBoxFlex?: string | undefined;
        webkitBoxOrdinalGroup?: string | undefined;
        webkitBoxOrient?: string | undefined;
        webkitBoxPack?: string | undefined;
        webkitBoxShadow?: string | undefined;
        webkitBoxSizing?: string | undefined;
        webkitFilter?: string | undefined;
        webkitFlex?: string | undefined;
        webkitFlexBasis?: string | undefined;
        webkitFlexDirection?: string | undefined;
        webkitFlexFlow?: string | undefined;
        webkitFlexGrow?: string | undefined;
        webkitFlexShrink?: string | undefined;
        webkitFlexWrap?: string | undefined;
        webkitJustifyContent?: string | undefined;
        webkitLineClamp?: string | undefined;
        webkitMask?: string | undefined;
        webkitMaskBoxImage?: string | undefined;
        webkitMaskBoxImageOutset?: string | undefined;
        webkitMaskBoxImageRepeat?: string | undefined;
        webkitMaskBoxImageSlice?: string | undefined;
        webkitMaskBoxImageSource?: string | undefined;
        webkitMaskBoxImageWidth?: string | undefined;
        webkitMaskClip?: string | undefined;
        webkitMaskComposite?: string | undefined;
        webkitMaskImage?: string | undefined;
        webkitMaskOrigin?: string | undefined;
        webkitMaskPosition?: string | undefined;
        webkitMaskRepeat?: string | undefined;
        webkitMaskSize?: string | undefined;
        webkitOrder?: string | undefined;
        webkitPerspective?: string | undefined;
        webkitPerspectiveOrigin?: string | undefined;
        webkitTextFillColor?: string | undefined;
        webkitTextSizeAdjust?: string | undefined;
        webkitTextStroke?: string | undefined;
        webkitTextStrokeColor?: string | undefined;
        webkitTextStrokeWidth?: string | undefined;
        webkitTransform?: string | undefined;
        webkitTransformOrigin?: string | undefined;
        webkitTransformStyle?: string | undefined;
        webkitTransition?: string | undefined;
        webkitTransitionDelay?: string | undefined;
        webkitTransitionDuration?: string | undefined;
        webkitTransitionProperty?: string | undefined;
        webkitTransitionTimingFunction?: string | undefined;
        webkitUserSelect?: string | undefined;
        whiteSpace?: string | undefined;
        whiteSpaceCollapse?: string | undefined;
        widows?: string | undefined;
        width: string;
        willChange?: string | undefined;
        wordBreak?: string | undefined;
        wordSpacing?: string | undefined;
        wordWrap?: string | undefined;
        writingMode?: string | undefined;
        x?: string | undefined;
        y?: string | undefined;
        zIndex?: string | undefined;
        zoom?: string | undefined;
        getPropertyPriority?: ((property: string) => string) | undefined;
        getPropertyValue?: ((property: string) => string) | undefined;
        item?: ((index: number) => string) | undefined;
        removeProperty?: ((property: string) => string) | undefined;
        setProperty?: ((property: string, value: string | null, priority?: string) => void) | undefined;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<EventSettingsModal, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<EventSettingsModal, "app-event-settings-modal", never, { "isEventSettingsModalVisible": { "alias": "isEventSettingsModalVisible"; "required": false; }; "onEventSettingsClose": { "alias": "onEventSettingsClose"; "required": false; }; "onModifyEventSettings": { "alias": "onModifyEventSettings"; "required": false; }; "position": { "alias": "position"; "required": false; }; "backgroundColor": { "alias": "backgroundColor"; "required": false; }; "audioSetting": { "alias": "audioSetting"; "required": false; }; "videoSetting": { "alias": "videoSetting"; "required": false; }; "screenshareSetting": { "alias": "screenshareSetting"; "required": false; }; "chatSetting": { "alias": "chatSetting"; "required": false; }; "updateAudioSetting": { "alias": "updateAudioSetting"; "required": false; }; "updateVideoSetting": { "alias": "updateVideoSetting"; "required": false; }; "updateScreenshareSetting": { "alias": "updateScreenshareSetting"; "required": false; }; "updateChatSetting": { "alias": "updateChatSetting"; "required": false; }; "updateIsSettingsModalVisible": { "alias": "updateIsSettingsModalVisible"; "required": false; }; "roomName": { "alias": "roomName"; "required": false; }; "socket": { "alias": "socket"; "required": false; }; "showAlert": { "alias": "showAlert"; "required": false; }; "overlayStyle": { "alias": "overlayStyle"; "required": false; }; "contentStyle": { "alias": "contentStyle"; "required": false; }; "customTemplate": { "alias": "customTemplate"; "required": false; }; }, {}, never, never, true, never>;
}
