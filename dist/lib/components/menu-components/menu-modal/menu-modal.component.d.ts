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
    isDarkMode?: boolean;
    onToggleTheme?: (value: boolean) => void;
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
    isDarkMode?: boolean;
    onToggleTheme?: (value: boolean) => void;
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
    get resolvedIsDarkMode(): boolean;
    modalContainerStyle(): {
        position: string;
        top: number;
        left: number;
        width: string;
        height: string;
        backgroundColor: string;
        backdropFilter: string;
        display: string;
        alignItems: string;
        justifyContent: string;
        padding: string;
        zIndex: number;
    };
    modalContentStyle(): {
        background: string;
        borderRadius: string;
        border: string;
        padding: string;
        width: string;
        maxHeight: string;
        overflow: string;
        boxShadow: string;
        color: string;
    };
    getCombinedContentStyle(): {
        accentColor?: string;
        alignContent?: string;
        alignItems?: string;
        alignSelf?: string;
        alignmentBaseline?: string;
        all?: string;
        animation?: string;
        animationComposition?: string;
        animationDelay?: string;
        animationDirection?: string;
        animationDuration?: string;
        animationFillMode?: string;
        animationIterationCount?: string;
        animationName?: string;
        animationPlayState?: string;
        animationTimingFunction?: string;
        appearance?: string;
        aspectRatio?: string;
        backdropFilter?: string;
        backfaceVisibility?: string;
        background: string;
        backgroundAttachment?: string;
        backgroundBlendMode?: string;
        backgroundClip?: string;
        backgroundColor?: string;
        backgroundImage?: string;
        backgroundOrigin?: string;
        backgroundPosition?: string;
        backgroundPositionX?: string;
        backgroundPositionY?: string;
        backgroundRepeat?: string;
        backgroundSize?: string;
        baselineShift?: string;
        baselineSource?: string;
        blockSize?: string;
        border: string;
        borderBlock?: string;
        borderBlockColor?: string;
        borderBlockEnd?: string;
        borderBlockEndColor?: string;
        borderBlockEndStyle?: string;
        borderBlockEndWidth?: string;
        borderBlockStart?: string;
        borderBlockStartColor?: string;
        borderBlockStartStyle?: string;
        borderBlockStartWidth?: string;
        borderBlockStyle?: string;
        borderBlockWidth?: string;
        borderBottom?: string;
        borderBottomColor?: string;
        borderBottomLeftRadius?: string;
        borderBottomRightRadius?: string;
        borderBottomStyle?: string;
        borderBottomWidth?: string;
        borderCollapse?: string;
        borderColor?: string;
        borderEndEndRadius?: string;
        borderEndStartRadius?: string;
        borderImage?: string;
        borderImageOutset?: string;
        borderImageRepeat?: string;
        borderImageSlice?: string;
        borderImageSource?: string;
        borderImageWidth?: string;
        borderInline?: string;
        borderInlineColor?: string;
        borderInlineEnd?: string;
        borderInlineEndColor?: string;
        borderInlineEndStyle?: string;
        borderInlineEndWidth?: string;
        borderInlineStart?: string;
        borderInlineStartColor?: string;
        borderInlineStartStyle?: string;
        borderInlineStartWidth?: string;
        borderInlineStyle?: string;
        borderInlineWidth?: string;
        borderLeft?: string;
        borderLeftColor?: string;
        borderLeftStyle?: string;
        borderLeftWidth?: string;
        borderRadius: string;
        borderRight?: string;
        borderRightColor?: string;
        borderRightStyle?: string;
        borderRightWidth?: string;
        borderSpacing?: string;
        borderStartEndRadius?: string;
        borderStartStartRadius?: string;
        borderStyle?: string;
        borderTop?: string;
        borderTopColor?: string;
        borderTopLeftRadius?: string;
        borderTopRightRadius?: string;
        borderTopStyle?: string;
        borderTopWidth?: string;
        borderWidth?: string;
        bottom?: string;
        boxShadow: string;
        boxSizing?: string;
        breakAfter?: string;
        breakBefore?: string;
        breakInside?: string;
        captionSide?: string;
        caretColor?: string;
        clear?: string;
        clip?: string;
        clipPath?: string;
        clipRule?: string;
        color: string;
        colorInterpolation?: string;
        colorInterpolationFilters?: string;
        colorScheme?: string;
        columnCount?: string;
        columnFill?: string;
        columnGap?: string;
        columnRule?: string;
        columnRuleColor?: string;
        columnRuleStyle?: string;
        columnRuleWidth?: string;
        columnSpan?: string;
        columnWidth?: string;
        columns?: string;
        contain?: string;
        containIntrinsicBlockSize?: string;
        containIntrinsicHeight?: string;
        containIntrinsicInlineSize?: string;
        containIntrinsicSize?: string;
        containIntrinsicWidth?: string;
        container?: string;
        containerName?: string;
        containerType?: string;
        content?: string;
        contentVisibility?: string;
        counterIncrement?: string;
        counterReset?: string;
        counterSet?: string;
        cssFloat?: string;
        cssText?: string;
        cursor?: string;
        cx?: string;
        cy?: string;
        d?: string;
        direction?: string;
        display?: string;
        dominantBaseline?: string;
        emptyCells?: string;
        fill?: string;
        fillOpacity?: string;
        fillRule?: string;
        filter?: string;
        flex?: string;
        flexBasis?: string;
        flexDirection?: string;
        flexFlow?: string;
        flexGrow?: string;
        flexShrink?: string;
        flexWrap?: string;
        float?: string;
        floodColor?: string;
        floodOpacity?: string;
        font?: string;
        fontFamily?: string;
        fontFeatureSettings?: string;
        fontKerning?: string;
        fontOpticalSizing?: string;
        fontPalette?: string;
        fontSize?: string;
        fontSizeAdjust?: string;
        fontStretch?: string;
        fontStyle?: string;
        fontSynthesis?: string;
        fontSynthesisSmallCaps?: string;
        fontSynthesisStyle?: string;
        fontSynthesisWeight?: string;
        fontVariant?: string;
        fontVariantAlternates?: string;
        fontVariantCaps?: string;
        fontVariantEastAsian?: string;
        fontVariantLigatures?: string;
        fontVariantNumeric?: string;
        fontVariantPosition?: string;
        fontVariationSettings?: string;
        fontWeight?: string;
        forcedColorAdjust?: string;
        gap?: string;
        grid?: string;
        gridArea?: string;
        gridAutoColumns?: string;
        gridAutoFlow?: string;
        gridAutoRows?: string;
        gridColumn?: string;
        gridColumnEnd?: string;
        gridColumnGap?: string;
        gridColumnStart?: string;
        gridGap?: string;
        gridRow?: string;
        gridRowEnd?: string;
        gridRowGap?: string;
        gridRowStart?: string;
        gridTemplate?: string;
        gridTemplateAreas?: string;
        gridTemplateColumns?: string;
        gridTemplateRows?: string;
        height?: string;
        hyphenateCharacter?: string;
        hyphens?: string;
        imageOrientation?: string;
        imageRendering?: string;
        inlineSize?: string;
        inset?: string;
        insetBlock?: string;
        insetBlockEnd?: string;
        insetBlockStart?: string;
        insetInline?: string;
        insetInlineEnd?: string;
        insetInlineStart?: string;
        isolation?: string;
        justifyContent?: string;
        justifyItems?: string;
        justifySelf?: string;
        left?: string;
        length?: number;
        letterSpacing?: string;
        lightingColor?: string;
        lineBreak?: string;
        lineHeight?: string;
        listStyle?: string;
        listStyleImage?: string;
        listStylePosition?: string;
        listStyleType?: string;
        margin?: string;
        marginBlock?: string;
        marginBlockEnd?: string;
        marginBlockStart?: string;
        marginBottom?: string;
        marginInline?: string;
        marginInlineEnd?: string;
        marginInlineStart?: string;
        marginLeft?: string;
        marginRight?: string;
        marginTop?: string;
        marker?: string;
        markerEnd?: string;
        markerMid?: string;
        markerStart?: string;
        mask?: string;
        maskClip?: string;
        maskComposite?: string;
        maskImage?: string;
        maskMode?: string;
        maskOrigin?: string;
        maskPosition?: string;
        maskRepeat?: string;
        maskSize?: string;
        maskType?: string;
        mathDepth?: string;
        mathStyle?: string;
        maxBlockSize?: string;
        maxHeight: string;
        maxInlineSize?: string;
        maxWidth?: string;
        minBlockSize?: string;
        minHeight?: string;
        minInlineSize?: string;
        minWidth?: string;
        mixBlendMode?: string;
        objectFit?: string;
        objectPosition?: string;
        offset?: string;
        offsetAnchor?: string;
        offsetDistance?: string;
        offsetPath?: string;
        offsetPosition?: string;
        offsetRotate?: string;
        opacity?: string;
        order?: string;
        orphans?: string;
        outline?: string;
        outlineColor?: string;
        outlineOffset?: string;
        outlineStyle?: string;
        outlineWidth?: string;
        overflow: string;
        overflowAnchor?: string;
        overflowClipMargin?: string;
        overflowWrap?: string;
        overflowX?: string;
        overflowY?: string;
        overscrollBehavior?: string;
        overscrollBehaviorBlock?: string;
        overscrollBehaviorInline?: string;
        overscrollBehaviorX?: string;
        overscrollBehaviorY?: string;
        padding: string;
        paddingBlock?: string;
        paddingBlockEnd?: string;
        paddingBlockStart?: string;
        paddingBottom?: string;
        paddingInline?: string;
        paddingInlineEnd?: string;
        paddingInlineStart?: string;
        paddingLeft?: string;
        paddingRight?: string;
        paddingTop?: string;
        page?: string;
        pageBreakAfter?: string;
        pageBreakBefore?: string;
        pageBreakInside?: string;
        paintOrder?: string;
        parentRule?: CSSRule | null;
        perspective?: string;
        perspectiveOrigin?: string;
        placeContent?: string;
        placeItems?: string;
        placeSelf?: string;
        pointerEvents?: string;
        position?: string;
        printColorAdjust?: string;
        quotes?: string;
        r?: string;
        resize?: string;
        right?: string;
        rotate?: string;
        rowGap?: string;
        rubyPosition?: string;
        rx?: string;
        ry?: string;
        scale?: string;
        scrollBehavior?: string;
        scrollMargin?: string;
        scrollMarginBlock?: string;
        scrollMarginBlockEnd?: string;
        scrollMarginBlockStart?: string;
        scrollMarginBottom?: string;
        scrollMarginInline?: string;
        scrollMarginInlineEnd?: string;
        scrollMarginInlineStart?: string;
        scrollMarginLeft?: string;
        scrollMarginRight?: string;
        scrollMarginTop?: string;
        scrollPadding?: string;
        scrollPaddingBlock?: string;
        scrollPaddingBlockEnd?: string;
        scrollPaddingBlockStart?: string;
        scrollPaddingBottom?: string;
        scrollPaddingInline?: string;
        scrollPaddingInlineEnd?: string;
        scrollPaddingInlineStart?: string;
        scrollPaddingLeft?: string;
        scrollPaddingRight?: string;
        scrollPaddingTop?: string;
        scrollSnapAlign?: string;
        scrollSnapStop?: string;
        scrollSnapType?: string;
        scrollbarColor?: string;
        scrollbarGutter?: string;
        scrollbarWidth?: string;
        shapeImageThreshold?: string;
        shapeMargin?: string;
        shapeOutside?: string;
        shapeRendering?: string;
        stopColor?: string;
        stopOpacity?: string;
        stroke?: string;
        strokeDasharray?: string;
        strokeDashoffset?: string;
        strokeLinecap?: string;
        strokeLinejoin?: string;
        strokeMiterlimit?: string;
        strokeOpacity?: string;
        strokeWidth?: string;
        tabSize?: string;
        tableLayout?: string;
        textAlign?: string;
        textAlignLast?: string;
        textAnchor?: string;
        textCombineUpright?: string;
        textDecoration?: string;
        textDecorationColor?: string;
        textDecorationLine?: string;
        textDecorationSkipInk?: string;
        textDecorationStyle?: string;
        textDecorationThickness?: string;
        textEmphasis?: string;
        textEmphasisColor?: string;
        textEmphasisPosition?: string;
        textEmphasisStyle?: string;
        textIndent?: string;
        textOrientation?: string;
        textOverflow?: string;
        textRendering?: string;
        textShadow?: string;
        textTransform?: string;
        textUnderlineOffset?: string;
        textUnderlinePosition?: string;
        textWrap?: string;
        textWrapMode?: string;
        textWrapStyle?: string;
        top?: string;
        touchAction?: string;
        transform?: string;
        transformBox?: string;
        transformOrigin?: string;
        transformStyle?: string;
        transition?: string;
        transitionBehavior?: string;
        transitionDelay?: string;
        transitionDuration?: string;
        transitionProperty?: string;
        transitionTimingFunction?: string;
        translate?: string;
        unicodeBidi?: string;
        userSelect?: string;
        vectorEffect?: string;
        verticalAlign?: string;
        visibility?: string;
        webkitAlignContent?: string;
        webkitAlignItems?: string;
        webkitAlignSelf?: string;
        webkitAnimation?: string;
        webkitAnimationDelay?: string;
        webkitAnimationDirection?: string;
        webkitAnimationDuration?: string;
        webkitAnimationFillMode?: string;
        webkitAnimationIterationCount?: string;
        webkitAnimationName?: string;
        webkitAnimationPlayState?: string;
        webkitAnimationTimingFunction?: string;
        webkitAppearance?: string;
        webkitBackfaceVisibility?: string;
        webkitBackgroundClip?: string;
        webkitBackgroundOrigin?: string;
        webkitBackgroundSize?: string;
        webkitBorderBottomLeftRadius?: string;
        webkitBorderBottomRightRadius?: string;
        webkitBorderRadius?: string;
        webkitBorderTopLeftRadius?: string;
        webkitBorderTopRightRadius?: string;
        webkitBoxAlign?: string;
        webkitBoxFlex?: string;
        webkitBoxOrdinalGroup?: string;
        webkitBoxOrient?: string;
        webkitBoxPack?: string;
        webkitBoxShadow?: string;
        webkitBoxSizing?: string;
        webkitFilter?: string;
        webkitFlex?: string;
        webkitFlexBasis?: string;
        webkitFlexDirection?: string;
        webkitFlexFlow?: string;
        webkitFlexGrow?: string;
        webkitFlexShrink?: string;
        webkitFlexWrap?: string;
        webkitJustifyContent?: string;
        webkitLineClamp?: string;
        webkitMask?: string;
        webkitMaskBoxImage?: string;
        webkitMaskBoxImageOutset?: string;
        webkitMaskBoxImageRepeat?: string;
        webkitMaskBoxImageSlice?: string;
        webkitMaskBoxImageSource?: string;
        webkitMaskBoxImageWidth?: string;
        webkitMaskClip?: string;
        webkitMaskComposite?: string;
        webkitMaskImage?: string;
        webkitMaskOrigin?: string;
        webkitMaskPosition?: string;
        webkitMaskRepeat?: string;
        webkitMaskSize?: string;
        webkitOrder?: string;
        webkitPerspective?: string;
        webkitPerspectiveOrigin?: string;
        webkitTextFillColor?: string;
        webkitTextSizeAdjust?: string;
        webkitTextStroke?: string;
        webkitTextStrokeColor?: string;
        webkitTextStrokeWidth?: string;
        webkitTransform?: string;
        webkitTransformOrigin?: string;
        webkitTransformStyle?: string;
        webkitTransition?: string;
        webkitTransitionDelay?: string;
        webkitTransitionDuration?: string;
        webkitTransitionProperty?: string;
        webkitTransitionTimingFunction?: string;
        webkitUserSelect?: string;
        whiteSpace?: string;
        whiteSpaceCollapse?: string;
        widows?: string;
        width: string;
        willChange?: string;
        wordBreak?: string;
        wordSpacing?: string;
        wordWrap?: string;
        writingMode?: string;
        x?: string;
        y?: string;
        zIndex?: string;
        zoom?: string;
        getPropertyPriority?: (property: string) => string;
        getPropertyValue?: (property: string) => string;
        item?: (index: number) => string;
        removeProperty?: (property: string) => string;
        setProperty?: (property: string, value: string | null, priority?: string) => void;
    };
    handleClose(): void;
    getDividerStyle(): {
        backgroundColor: string;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<MenuModal, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MenuModal, "app-menu-modal", never, { "backgroundColor": { "alias": "backgroundColor"; "required": false; }; "isVisible": { "alias": "isVisible"; "required": false; }; "isDarkMode": { "alias": "isDarkMode"; "required": false; }; "onToggleTheme": { "alias": "onToggleTheme"; "required": false; }; "customButtons": { "alias": "customButtons"; "required": false; }; "shareButtons": { "alias": "shareButtons"; "required": false; }; "position": { "alias": "position"; "required": false; }; "roomName": { "alias": "roomName"; "required": false; }; "adminPasscode": { "alias": "adminPasscode"; "required": false; }; "islevel": { "alias": "islevel"; "required": false; }; "eventType": { "alias": "eventType"; "required": false; }; "localLink": { "alias": "localLink"; "required": false; }; "title": { "alias": "title"; "required": false; }; "overlayStyle": { "alias": "overlayStyle"; "required": false; }; "contentStyle": { "alias": "contentStyle"; "required": false; }; "customTemplate": { "alias": "customTemplate"; "required": false; }; "overlayAttributes": { "alias": "overlayAttributes"; "required": false; }; "contentAttributes": { "alias": "contentAttributes"; "required": false; }; "headerAttributes": { "alias": "headerAttributes"; "required": false; }; "titleWrapperAttributes": { "alias": "titleWrapperAttributes"; "required": false; }; "badgeWrapperAttributes": { "alias": "badgeWrapperAttributes"; "required": false; }; "closeButtonAttributes": { "alias": "closeButtonAttributes"; "required": false; }; "menuIconAttributes": { "alias": "menuIconAttributes"; "required": false; }; "closeIconAttributes": { "alias": "closeIconAttributes"; "required": false; }; "dividerAttributes": { "alias": "dividerAttributes"; "required": false; }; "bodyAttributes": { "alias": "bodyAttributes"; "required": false; }; "scrollWrapperAttributes": { "alias": "scrollWrapperAttributes"; "required": false; }; "customButtonsWrapperAttributes": { "alias": "customButtonsWrapperAttributes"; "required": false; }; "renderHeader": { "alias": "renderHeader"; "required": false; }; "renderTitle": { "alias": "renderTitle"; "required": false; }; "renderCustomButtons": { "alias": "renderCustomButtons"; "required": false; }; "renderMeetingPasscode": { "alias": "renderMeetingPasscode"; "required": false; }; "renderMeetingId": { "alias": "renderMeetingId"; "required": false; }; "renderShareButtons": { "alias": "renderShareButtons"; "required": false; }; "renderBody": { "alias": "renderBody"; "required": false; }; "renderContent": { "alias": "renderContent"; "required": false; }; "onClose": { "alias": "onClose"; "required": false; }; }, {}, never, never, true, never>;
}
