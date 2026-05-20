import { OnInit, OnChanges, SimpleChanges, Injector, TemplateRef } from '@angular/core';
import * as i0 from "@angular/core";
export interface FlexibleGridOptions {
    customWidth: number;
    customHeight: number;
    rows: number;
    columns: number;
    componentsToRender: {
        component: any;
        inputs?: any;
    }[];
    backgroundColor?: string;
    containerStyle?: Partial<CSSStyleDeclaration>;
    customTemplate?: TemplateRef<any>;
    isDarkMode?: boolean;
    enableGlassmorphism?: boolean;
    cellBorderRadius?: number;
}
export type FlexibleGridType = (options: FlexibleGridOptions) => HTMLElement;
/**
 * @component FlexibleGrid
 *
 * A dynamic, highly customizable grid component that renders a specified number of rows and columns,
 * with each grid item containing a provided component. Supports full template customization and style overrides.
 *
 * @description
 * FlexibleGrid offers three levels of customization to fit your application's needs:
 *
 * 1. **Basic Usage**: Use the default grid layout with configurable rows, columns, and components
 * 2. **Style Customization**: Apply custom styles via `containerStyle` to modify grid appearance
 * 3. **Full Template Override**: Provide a custom `ng-template` via `customTemplate` for complete control
 *
 * **Key Features:**
 * - Dynamic grid generation based on rows and columns
 * - Flexible component rendering with input injection
 * - Automatic grid recalculation on property changes
 * - Customizable grid item dimensions and background colors
 * - Full template override support for custom layouts
 *
 * @selector app-flexible-grid
 * @standalone true
 * @imports CommonModule
 *
 * @example
 * Basic Usage:
 * ```html
 * <app-flexible-grid
 *   [customWidth]="200"
 *   [customHeight]="150"
 *   [rows]="2"
 *   [columns]="3"
 *   [componentsToRender]="videoComponents"
 *   backgroundColor="#f0f0f0">
 * </app-flexible-grid>
 * ```
 *
 * @example
 * Style Customization:
 * ```html
 * <app-flexible-grid
 *   [customWidth]="250"
 *   [customHeight]="200"
 *   [rows]="3"
 *   [columns]="4"
 *   [componentsToRender]="participantComponents"
 *   [containerStyle]="{
 *     padding: '20px',
 *     borderRadius: '12px',
 *     boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
 *   }"
 *   backgroundColor="white">
 * </app-flexible-grid>
 * ```
 *
 * @example
 * Custom Template Override:
 * ```typescript
 * // In your component
 * @Component({
 *   template: `
 *     <app-flexible-grid
 *       [customWidth]="300"
 *       [customHeight]="200"
 *       [rows]="2"
 *       [columns]="2"
 *       [componentsToRender]="components"
 *       [customTemplate]="customGridTemplate">
 *     </app-flexible-grid>
 *
 *     <ng-template #customGridTemplate let-gridData>
 *       <div class="my-custom-grid">
 *         <h3>Custom Grid Layout</h3>
 *         <div class="grid-container"
 *              [style.grid-template-columns]="'repeat(' + gridData.columns + ', 1fr)'">
 *           <div *ngFor="let row of gridData.grid" class="grid-row">
 *             <div *ngFor="let component of row" class="grid-item">
 *               <ng-container *ngComponentOutlet="component.component"></ng-container>
 *             </div>
 *           </div>
 *         </div>
 *       </div>
 *     </ng-template>
 *   `
 * })
 * ```
 *
 * @input customWidth - Width for each grid item in pixels. Default: 0
 * @input customHeight - Height for each grid item in pixels. Default: 0
 * @input rows - Number of rows in the grid. Default: 0
 * @input columns - Number of columns in the grid. Default: 0
 * @input componentsToRender - Array of components to render in the grid, each with optional inputs
 * @input backgroundColor - Background color for each grid item. Default: 'transparent'
 * @input containerStyle - Custom CSS styles for the grid container
 * @input customTemplate - Custom ng-template for complete grid layout override
 *
 * @method ngOnInit - Initializes and generates the grid on component load
 * @method ngOnChanges - Regenerates the grid if columns, componentsToRender, or rows change
 * @method generateGrid - Builds the grid based on the row, column, and component configurations
 * @method getGridItemStyle - Returns a style object for each grid item
 * @method createInjector - Creates a cached injector for each component to support dynamic inputs
 **/
export declare class FlexibleGrid implements OnInit, OnChanges {
    private injector;
    customWidth: number;
    customHeight: number;
    rows: number;
    columns: number;
    componentsToRender: {
        component: any;
        inputs?: any;
    }[];
    backgroundColor: string;
    containerStyle?: Partial<CSSStyleDeclaration>;
    customTemplate?: TemplateRef<any>;
    isDarkMode: boolean;
    enableGlassmorphism: boolean;
    cellBorderRadius: number;
    grid: any[][];
    private injectorCache;
    constructor(injector: Injector);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    generateGrid(): void;
    getGridWrapperStyle(): {
        [x: number]: string;
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
        background?: string;
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
        border?: string;
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
        borderRadius?: string;
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
        boxShadow?: string;
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
        color?: string;
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
        maxHeight?: string;
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
        overflow?: string;
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
        padding?: string;
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
        width?: string;
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
    getGridItemStyle(component?: {
        component: any;
        inputs?: any;
    }): {
        flex: number;
        width: string;
        height: string;
        background: string;
        margin: string;
        padding: number;
        borderRadius: string;
        border: string;
        display: string;
        alignItems: string;
        justifyContent: string;
    };
    createInjector(inputs: any): Injector;
    static ɵfac: i0.ɵɵFactoryDeclaration<FlexibleGrid, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FlexibleGrid, "app-flexible-grid", never, { "customWidth": { "alias": "customWidth"; "required": false; }; "customHeight": { "alias": "customHeight"; "required": false; }; "rows": { "alias": "rows"; "required": false; }; "columns": { "alias": "columns"; "required": false; }; "componentsToRender": { "alias": "componentsToRender"; "required": false; }; "backgroundColor": { "alias": "backgroundColor"; "required": false; }; "containerStyle": { "alias": "containerStyle"; "required": false; }; "customTemplate": { "alias": "customTemplate"; "required": false; }; "isDarkMode": { "alias": "isDarkMode"; "required": false; }; "enableGlassmorphism": { "alias": "enableGlassmorphism"; "required": false; }; "cellBorderRadius": { "alias": "cellBorderRadius"; "required": false; }; }, {}, never, never, true, never>;
}
