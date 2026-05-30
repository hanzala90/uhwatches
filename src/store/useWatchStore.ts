import { create } from 'zustand';

export type WatchModel = 'leather' | 'metal' | 'sports';
export type CaseShape = 'round' | 'square' | 'octagonal' | 'octagonal-round';
export type CaseColor = 'silver' | 'gold' | 'black' | 'rose-gold';
export type EngravingFont = 'minimal' | 'cursive' | 'serif';
export type OctDialId = 'oct-gold-cream' | 'oct-grey-chrono' | 'oct-black-wheel' | 'oct-olive-green' | 'oct-teal-gold' | 'oct-navy-blue';

export type MovementTier = 'basic' | 'premium';
export type MovementType = 'quartz' | 'mechanical' | 'automatic';
export type CaseBackType = 'solid' | 'exhibition';
export type BuckleType = 'standard' | 'deployment' | 'butterfly';
export type HandsType = 'baton' | 'sword';

interface StructuralOptionsState {
  movementTier: MovementTier;
  movement: MovementType;
  caseBack: CaseBackType;
  buckle: BuckleType;
  hands: HandsType;
  customHands: boolean;
}

interface EngravingState {
  text: string;
  font: EngravingFont;
}

interface DesignOptionsState {
  dialURL: string;
  strapColor: string;
  caseColor: CaseColor;
  octDialId: OctDialId;
}

export interface WatchStoreState {
  baseModel: WatchModel;
  caseShape: CaseShape;
  engraving: EngravingState;
  designOptions: DesignOptionsState;
  structuralOptions: StructuralOptionsState;
  uploadedImage: string | null;
  uploadedImageScale: number;
  uploadedImageX: number;
  uploadedImageY: number;
  uploadedImageRotation: number;
  totalPrice: number;
  setBaseModel: (model: WatchModel) => void;
  setCaseShape: (shape: CaseShape) => void;
  setCaseColor: (color: CaseColor) => void;
  setEngravingText: (text: string) => void;
  setEngravingFont: (font: EngravingFont) => void;
  setDialURL: (url: string) => void;
  setStrapColor: (color: string) => void;
  setMovementTier: (tier: MovementTier) => void;
  setMovement: (m: MovementType) => void;
  setCustomHands: (v: boolean) => void;
  setCaseBack: (c: CaseBackType) => void;
  setBuckle: (b: BuckleType) => void;
  setHands: (h: HandsType) => void;
  setUploadedImage: (imageUrl: string | null) => void;
  setUploadedImageScale: (scale: number) => void;
  setUploadedImageX: (x: number) => void;
  setUploadedImageY: (y: number) => void;
  setUploadedImageRotation: (r: number) => void;
  setOctDialId: (id: OctDialId) => void;
  applyCombination: (model: WatchModel, dialURL: string, movement?: MovementType, hands?: HandsType) => void;
  resetDesign: () => void;
}

export const BASE_PRICES: Record<WatchModel, number> = {
  leather: 10000,
  metal: 15000,
  sports: 12000,
};

const calculatePrice = (
  model: WatchModel,
  shape: CaseShape,
  engraving: EngravingState,
  structuralOptions: StructuralOptionsState,
  uploadedImage: string | null
): number => {
  let price = BASE_PRICES[model];
  if (shape === 'square') price += 1500;
  if (shape === 'octagonal') price += 3000;
  if (shape === 'octagonal-round') price += 3500;
  if (engraving.text.trim() !== '') price += 1500;
  if (uploadedImage) price += 1000;

  // Movement tier pricing
  if (structuralOptions.movementTier === 'premium') {
    if (structuralOptions.movement === 'mechanical') price += 3000;
    if (structuralOptions.movement === 'automatic') price += 6000;
  }

  if (structuralOptions.caseBack === 'exhibition') price += 1500;
  if (structuralOptions.buckle === 'deployment') price += 1000;
  if (structuralOptions.buckle === 'butterfly') price += 1200;
  if (structuralOptions.customHands && structuralOptions.hands === 'sword') price += 800;

  return price;
};

const defaultOptions = {
  baseModel: 'leather' as WatchModel,
  caseShape: 'round' as CaseShape,
  engraving: {
    text: '',
    font: 'minimal' as EngravingFont
  },
  designOptions: {
    dialURL: '/images/dial_black.png',
    strapColor: '#000000',
    caseColor: 'silver' as CaseColor,
    octDialId: 'oct-navy-blue' as OctDialId,
  },
  structuralOptions: {
    movementTier: 'basic' as MovementTier,
    movement: 'quartz' as MovementType,
    caseBack: 'solid' as CaseBackType,
    buckle: 'standard' as BuckleType,
    hands: 'baton' as HandsType,
    customHands: false,
  },
  uploadedImage: null,
  uploadedImageScale: 1,
  uploadedImageX: 0,
  uploadedImageY: 0,
  uploadedImageRotation: 0,
  totalPrice: BASE_PRICES.leather,
};

export const useWatchStore = create<WatchStoreState>((set) => ({
  ...defaultOptions,

  setBaseModel: (model) =>
    set((state) => ({
      baseModel: model,
      totalPrice: calculatePrice(model, state.caseShape, state.engraving, state.structuralOptions, state.uploadedImage)
    })),

  setCaseShape: (shape) =>
    set((state) => ({
      caseShape: shape,
      totalPrice: calculatePrice(state.baseModel, shape, state.engraving, state.structuralOptions, state.uploadedImage)
    })),

  setCaseColor: (caseColor) =>
    set((state) => ({ designOptions: { ...state.designOptions, caseColor } })),

  setEngravingText: (text) =>
    set((state) => {
      const newEngraving = { ...state.engraving, text };
      return {
        engraving: newEngraving,
        totalPrice: calculatePrice(state.baseModel, state.caseShape, newEngraving, state.structuralOptions, state.uploadedImage)
      };
    }),

  setEngravingFont: (font) =>
    set((state) => ({ engraving: { ...state.engraving, font } })),

  setDialURL: (url) =>
    set((state) => ({ designOptions: { ...state.designOptions, dialURL: url } })),

  setStrapColor: (color) =>
    set((state) => ({ designOptions: { ...state.designOptions, strapColor: color } })),

  setMovementTier: (movementTier) =>
    set((state) => {
      const movement = movementTier === 'basic' ? 'quartz' : state.structuralOptions.movement;
      const newOpts = { ...state.structuralOptions, movementTier, movement };
      return { structuralOptions: newOpts, totalPrice: calculatePrice(state.baseModel, state.caseShape, state.engraving, newOpts, state.uploadedImage) };
    }),

  setMovement: (movement) =>
    set((state) => {
      const newOpts = { ...state.structuralOptions, movement };
      return { structuralOptions: newOpts, totalPrice: calculatePrice(state.baseModel, state.caseShape, state.engraving, newOpts, state.uploadedImage) };
    }),

  setCustomHands: (customHands) =>
    set((state) => {
      const newOpts = { ...state.structuralOptions, customHands };
      return { structuralOptions: newOpts, totalPrice: calculatePrice(state.baseModel, state.caseShape, state.engraving, newOpts, state.uploadedImage) };
    }),

  setCaseBack: (caseBack) =>
    set((state) => {
      const newOpts = { ...state.structuralOptions, caseBack };
      return { structuralOptions: newOpts, totalPrice: calculatePrice(state.baseModel, state.caseShape, state.engraving, newOpts, state.uploadedImage) };
    }),

  setBuckle: (buckle) =>
    set((state) => {
      const newOpts = { ...state.structuralOptions, buckle };
      return { structuralOptions: newOpts, totalPrice: calculatePrice(state.baseModel, state.caseShape, state.engraving, newOpts, state.uploadedImage) };
    }),

  setHands: (hands) =>
    set((state) => {
      const newOpts = { ...state.structuralOptions, hands };
      return { structuralOptions: newOpts, totalPrice: calculatePrice(state.baseModel, state.caseShape, state.engraving, newOpts, state.uploadedImage) };
    }),

  setUploadedImage: (imageUrl) =>
    set((state) => ({
      uploadedImage: imageUrl,
      uploadedImageScale: 1,
      uploadedImageX: 0,
      uploadedImageY: 0,
      uploadedImageRotation: 0,
      totalPrice: calculatePrice(state.baseModel, state.caseShape, state.engraving, state.structuralOptions, imageUrl)
    })),

  setUploadedImageScale: (scale) =>
    set(() => ({ uploadedImageScale: scale })),

  setUploadedImageX: (x) =>
    set(() => ({ uploadedImageX: x })),

  setUploadedImageY: (y) =>
    set(() => ({ uploadedImageY: y })),

  setUploadedImageRotation: (r) =>
    set(() => ({ uploadedImageRotation: r })),

  setOctDialId: (octDialId) =>
    set((state) => ({ designOptions: { ...state.designOptions, octDialId } })),

  applyCombination: (model, dialURL, movement, hands) =>
    set((state) => {
      const newOpts = { ...state.structuralOptions };
      if (movement) newOpts.movement = movement;
      if (hands) newOpts.hands = hands;
      return {
        baseModel: model,
        designOptions: { ...state.designOptions, dialURL },
        structuralOptions: newOpts,
        totalPrice: calculatePrice(model, state.caseShape, state.engraving, newOpts, state.uploadedImage)
      };
    }),

  resetDesign: () => set(defaultOptions),
}));
