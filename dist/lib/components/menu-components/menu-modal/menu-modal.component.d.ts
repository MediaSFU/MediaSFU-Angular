import { TemplateRef } from '@angular/core';
import { CustomButton } from '../custom-buttons/custom-buttons.component';
import { EventType } from '../../../@types/types';
import * as i0 from "@angular/core";
export interface MenuModalRenderContext {
    onClose: () => void;
}
export interface MenuModalOptions {
    backgroundColor?: string;
    isVisible: boolean;
    customButtons?: CustomButton[];
    shareButtons?: boolean;
    position?: string;
    roomName: string;
    adminPasscode: string;
    islevel: string;
    eventType: EventType;
    localLink?: string;
    title?: string;
    overlayStyle?: Partial<CSSStyleDeclaration>;
    contentStyle?: Partial<CSSStyleDeclaration>;
    customTemplate?: TemplateRef<any>;
    overlayAttributes?: {
        [key: string]: any;
    };
    contentAttributes?: {
        [key: string]: any;
    };
    headerAttributes?: {
        [key: string]: any;
    };
    titleWrapperAttributes?: {
        [key: string]: any;
    };
    badgeWrapperAttributes?: {
        [key: string]: any;
    };
    closeButtonAttributes?: {
        [key: string]: any;
    };
    menuIconAttributes?: {
        [key: string]: any;
    };
    closeIconAttributes?: {
        [key: string]: any;
    };
    dividerAttributes?: {
        [key: string]: any;
    };
    bodyAttributes?: {
        [key: string]: any;
    };
    scrollWrapperAttributes?: {
        [key: string]: any;
    };
    customButtonsWrapperAttributes?: {
        [key: string]: any;
    };
    renderHeader?: TemplateRef<MenuModalRenderContext>;
    renderTitle?: TemplateRef<any>;
    renderCustomButtons?: TemplateRef<any>;
    renderMeetingPasscode?: TemplateRef<any>;
    renderMeetingId?: TemplateRef<any>;
    renderShareButtons?: TemplateRef<any>;
    renderBody?: TemplateRef<any>;
    renderContent?: TemplateRef<any>;
    onClose: () => void;
}
export type MenuModalType = (options: MenuModalOptions) => HTMLElement;
/**
 * MenuModal - Customizable menu modal with extensive override capabilities
 *
 * @component
 * @selector app-menu-modal
 * @standalone true
 * @templateUrl ./menu-modal.component.html
 * @styleUrls ./menu-modal.component.css
 *
 * @description
 * A fully customizable menu modal supporting three levels of customization:
 * 1. **Style Overrides**: Customize overlay and content styles via `overlayStyle` and `contentStyle`
 * 2. **Template Sections**: Override specific sections using render* props (header, title, buttons, etc.)
 * 3. **Complete Replacement**: Provide a `customTemplate` to replace the entire modal UI
 *
 * @example
 * **Basic Usage with Default Template**
 * ```html
 * <app-menu-modal
 *   [isVisible]="true"
 *   backgroundColor="#83c0e9"
 *   roomName="Room 123"
 *   adminPasscode="AdminPass"
 *   [customButtons]="customButtons"
 *   [shareButtons]="true"
 *   position="bottomRight"
 *   islevel="2"
 *   eventType="meeting"
 *   localLink="https://www.google.com"
 *   (onClose)="closeMenu()">
 * </app-menu-modal>
 * ```
 *
 * @example
 * **Style Customization**
 * ```html
 * <app-menu-modal
 *   [isVisible]="true"
 *   [overlayStyle]="{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }"
 *   [contentStyle]="{ borderRadius: '20px', boxShadow: '0 10px 40px rgba(0,0,0,0.5)' }"
 *   roomName="Room 123"
 *   (onClose)="closeMenu()">
 * </app-menu-modal>
 * ```
 *
 * @example
 * **Custom Template (Complete Override)**
 * ```html
 * <app-menu-modal
 *   [isVisible]="true"
 *   [customTemplate]="customMenuTemplate"
 *   roomName="Room 123"
 *   (onClose)="closeMenu()">
 * </app-menu-modal>
 *
 * <ng-template #customMenuTemplate let-context>
 *   <div class="my-custom-menu">
 *     <h2>{{ context.roomName }}</h2>
 *     <button (click)="context.onClose()">Close</button>
 *   </div>
 * </ng-template>
 * ```
 *
 * @example
 * **Section Override with renderTitle**
 * ```html
 * <app-menu-modal
 *   [isVisible]="true"
 *   [renderTitle]="customTitle"
 *   roomName="Room 123"
 *   (onClose)="closeMenu()">
 * </app-menu-modal>
 *
 * <ng-template #customTitle let-context>
 *   <h1 class="custom-title">🎯 {{ context.title || 'Menu' }}</h1>
 * </ng-template>
 * ```
 *
 * @input {boolean} isVisible - Controls modal visibility
 * @input {string} backgroundColor - Background color of the modal content (default: '#83c0e9')
 * @input {string} position - Modal position: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' (default: 'bottomRight')
 * @input {string} roomName - Room name to display
 * @input {string} adminPasscode - Admin passcode for the room
 * @input {string} islevel - User level indicator
 * @input {EventType} eventType - Type of event (meeting, webinar, etc.)
 * @input {CustomButton[]} customButtons - Array of custom action buttons
 * @input {boolean} shareButtons - Show/hide share buttons (default: true)
 * @input {string} localLink - Local link for sharing
 * @input {string} title - Optional custom title
 * @input {Partial<CSSStyleDeclaration>} overlayStyle - Custom styles for modal overlay
 * @input {Partial<CSSStyleDeclaration>} contentStyle - Custom styles for modal content
 * @input {TemplateRef<any>} customTemplate - Complete template override
 * @input {TemplateRef<MenuModalRenderContext>} renderHeader - Custom header template
 * @input {TemplateRef<any>} renderTitle - Custom title template
 * @input {TemplateRef<any>} renderCustomButtons - Custom buttons section template
 * @input {TemplateRef<any>} renderMeetingPasscode - Custom meeting passcode template
 * @input {TemplateRef<any>} renderMeetingId - Custom meeting ID template
 * @input {TemplateRef<any>} renderShareButtons - Custom share buttons template
 * @input {TemplateRef<any>} renderBody - Custom body template
 * @input {TemplateRef<any>} renderContent - Custom content template
 * @output {void} onClose - Event emitted when modal is closed
 *
 * @see {@link MenuModalOptions} for complete options interface
 */
export declare class MenuModal {
    backgroundColor: string;
    isVisible: boolean;
    customButtons: CustomButton[];
    shareButtons: boolean;
    position: string;
    roomName: string;
    adminPasscode: string;
    islevel: string;
    eventType: EventType;
    localLink: string;
    title?: string;
    overlayStyle?: Partial<CSSStyleDeclaration>;
    contentStyle?: Partial<CSSStyleDeclaration>;
    customTemplate?: TemplateRef<any>;
    overlayAttributes?: {
        [key: string]: any;
    };
    contentAttributes?: {
        [key: string]: any;
    };
    headerAttributes?: {
        [key: string]: any;
    };
    titleWrapperAttributes?: {
        [key: string]: any;
    };
    badgeWrapperAttributes?: {
        [key: string]: any;
    };
    closeButtonAttributes?: {
        [key: string]: any;
    };
    menuIconAttributes?: {
        [key: string]: any;
    };
    closeIconAttributes?: {
        [key: string]: any;
    };
    dividerAttributes?: {
        [key: string]: any;
    };
    bodyAttributes?: {
        [key: string]: any;
    };
    scrollWrapperAttributes?: {
        [key: string]: any;
    };
    customButtonsWrapperAttributes?: {
        [key: string]: any;
    };
    renderHeader?: TemplateRef<MenuModalRenderContext>;
    renderTitle?: TemplateRef<any>;
    renderCustomButtons?: TemplateRef<any>;
    renderMeetingPasscode?: TemplateRef<any>;
    renderMeetingId?: TemplateRef<any>;
    renderShareButtons?: TemplateRef<any>;
    renderBody?: TemplateRef<any>;
    renderContent?: TemplateRef<any>;
    onClose: () => void;
    get renderContext(): MenuModalRenderContext;
    getTitle(): string;
    faBars: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faTimes: import("@fortawesome/fontawesome-common-types").IconDefinition;
    modalContainerStyle(): {
        position: string;
        top: number;
        left: number;
        width: string;
        height: string;
        backgroundColor: string;
        display: string;
        zIndex: number;
    };
    modalContentStyle(): {
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
    handleClose(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MenuModal, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MenuModal, "app-menu-modal", never, { "backgroundColor": { "alias": "backgroundColor"; "required": false; }; "isVisible": { "alias": "isVisible"; "required": false; }; "customButtons": { "alias": "customButtons"; "required": false; }; "shareButtons": { "alias": "shareButtons"; "required": false; }; "position": { "alias": "position"; "required": false; }; "roomName": { "alias": "roomName"; "required": false; }; "adminPasscode": { "alias": "adminPasscode"; "required": false; }; "islevel": { "alias": "islevel"; "required": false; }; "eventType": { "alias": "eventType"; "required": false; }; "localLink": { "alias": "localLink"; "required": false; }; "title": { "alias": "title"; "required": false; }; "overlayStyle": { "alias": "overlayStyle"; "required": false; }; "contentStyle": { "alias": "contentStyle"; "required": false; }; "customTemplate": { "alias": "customTemplate"; "required": false; }; "overlayAttributes": { "alias": "overlayAttributes"; "required": false; }; "contentAttributes": { "alias": "contentAttributes"; "required": false; }; "headerAttributes": { "alias": "headerAttributes"; "required": false; }; "titleWrapperAttributes": { "alias": "titleWrapperAttributes"; "required": false; }; "badgeWrapperAttributes": { "alias": "badgeWrapperAttributes"; "required": false; }; "closeButtonAttributes": { "alias": "closeButtonAttributes"; "required": false; }; "menuIconAttributes": { "alias": "menuIconAttributes"; "required": false; }; "closeIconAttributes": { "alias": "closeIconAttributes"; "required": false; }; "dividerAttributes": { "alias": "dividerAttributes"; "required": false; }; "bodyAttributes": { "alias": "bodyAttributes"; "required": false; }; "scrollWrapperAttributes": { "alias": "scrollWrapperAttributes"; "required": false; }; "customButtonsWrapperAttributes": { "alias": "customButtonsWrapperAttributes"; "required": false; }; "renderHeader": { "alias": "renderHeader"; "required": false; }; "renderTitle": { "alias": "renderTitle"; "required": false; }; "renderCustomButtons": { "alias": "renderCustomButtons"; "required": false; }; "renderMeetingPasscode": { "alias": "renderMeetingPasscode"; "required": false; }; "renderMeetingId": { "alias": "renderMeetingId"; "required": false; }; "renderShareButtons": { "alias": "renderShareButtons"; "required": false; }; "renderBody": { "alias": "renderBody"; "required": false; }; "renderContent": { "alias": "renderContent"; "required": false; }; "onClose": { "alias": "onClose"; "required": false; }; }, {}, never, never, true, never>;
}
