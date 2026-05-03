import { create } from 'zustand';

export type WatchModel = 'leather' | 'metal' | 'sports';
export type CaseShape = 'round' | 'square' | 'skeleton' | 'octagonal' | 'octagonal-round';
export type EngravingFont = 'minimal' | 'cursive' | 'serif';

export type MovementType = 'quartz' | 'mechanical' | 'automatic';
export type CaseBackType = 'solid' | 'exhibition';
export type GlassType = 'mineral' | 'domed' | 'sapphire';
export type BuckleType = 'standard' | 'deployment' | 'butterfly';
export type HandsType = 'baton' | 'mercedes' | 'sword';
export type LugsType = 'standard' | 'curved' | 'wire';

interface StructuralOptionsState {
  movement: MovementType;
  caseBack: CaseBackType;
  glass: GlassType;
  buckle: BuckleType;
  hands: HandsType;
  lugs: LugsType;
}

interface EngravingState {
  text: string;
  font: EngravingFont;
}

interface DesignOptionsState {
  dialURL: string;
  strapColor: string;
}

export interface WatchStoreState {
  baseModel: WatchModel;
  caseShape: CaseShape;
  engraving: EngravingState;
  designOptions: DesignOptionsState;
  structuralOptions: StructuralOptionsState;
  uploadedImage: string | null;
  totalPrice: number;
  setBaseModel: (model: WatchModel) => void;
  setCaseShape: (shape: CaseShape) => void;
  setEngravingText: (text: string) => void;
  setEngravingFont: (font: EngravingFont) => void;
  setDialURL: (url: string) => void;
  setStrapColor: (color: string) => void;
  setMovement: (m: MovementType) => void;
  setCaseBack: (c: CaseBackType) => void;
  setGlass: (g: GlassType) => void;
  setBuckle: (b: BuckleType) => void;
  setHands: (h: HandsType) => void;
  setLugs: (l: LugsType) => void;
  setUploadedImage: (imageUrl: string | null) => void;
  applyCombination: (model: WatchModel, dialURL: string, movement?: MovementType, glass?: GlassType, hands?: HandsType) => void;
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
  if (shape === 'square') price += 1500; // Square case premium
  if (shape === 'skeleton') price += 4500; // Skeleton case premium
  if (shape === 'octagonal') price += 3000; // Octagonal premium
  if (shape === 'octagonal-round') price += 3500; // Octagonal-round premium
  if (engraving.text.trim() !== '') {
    price += 1500; // Engraving fee
  }
  if (uploadedImage) {
    price += 1000; // Photo customization fee
  }

  if (structuralOptions.movement === 'mechanical') price += 3000;
  if (structuralOptions.movement === 'automatic') price += 6000;
  if (structuralOptions.caseBack === 'exhibition') price += 1500;
  if (structuralOptions.glass === 'sapphire') price += 3000;
  if (structuralOptions.glass === 'domed') price += 1200;
  if (structuralOptions.buckle === 'deployment') price += 1000;
  if (structuralOptions.buckle === 'butterfly') price += 1200;
  if (structuralOptions.hands === 'mercedes') price += 800;
  if (structuralOptions.lugs === 'wire') price += 1500;

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
    dialURL: '/images/dial_white.png',
    strapColor: '#000000',
  },
  structuralOptions: {
    movement: 'quartz' as MovementType,
    caseBack: 'solid' as CaseBackType,
    glass: 'mineral' as GlassType,
    buckle: 'standard' as BuckleType,
    hands: 'baton' as HandsType,
    lugs: 'standard' as LugsType,
  },
  uploadedImage: null,
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
    
  setUploadedImage: (imageUrl) => 
    set((state) => ({ 
      uploadedImage: imageUrl,
      totalPrice: calculatePrice(state.baseModel, state.caseShape, state.engraving, state.structuralOptions, imageUrl)
    })),

  setMovement: (movement) => 
    set((state) => {
      const newOpts = { ...state.structuralOptions, movement };
      return { structuralOptions: newOpts, totalPrice: calculatePrice(state.baseModel, state.caseShape, state.engraving, newOpts, state.uploadedImage) };
    }),

  setCaseBack: (caseBack) => 
    set((state) => {
      const newOpts = { ...state.structuralOptions, caseBack };
      return { structuralOptions: newOpts, totalPrice: calculatePrice(state.baseModel, state.caseShape, state.engraving, newOpts, state.uploadedImage) };
    }),

  setGlass: (glass) => 
    set((state) => {
      const newOpts = { ...state.structuralOptions, glass };
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

  setLugs: (lugs) => 
    set((state) => {
      const newOpts = { ...state.structuralOptions, lugs };
      return { structuralOptions: newOpts, totalPrice: calculatePrice(state.baseModel, state.caseShape, state.engraving, newOpts, state.uploadedImage) };
    }),

  applyCombination: (model, dialURL, movement, glass, hands) => 
    set((state) => {
      const newOpts = { ...state.structuralOptions };
      if (movement) newOpts.movement = movement;
      if (glass) newOpts.glass = glass;
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
