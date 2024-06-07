import { create } from 'zustand';

export type DefaultState = {
  count: number;
  increase: () => void;
  decrease: () => void;
};

export const useDefaultStore = create<DefaultState>()(set => ({
  count: 0,
  increase: () => set(state => ({ count: state.count + 1 })),
  decrease: () => set(state => ({ count: state.count - 1 })),
}));
