import { create } from 'zustand';

interface ExpandProps {
  expanded: boolean;
  toggleExpand: () => void;
  close: () => void;
}

export const useExpandSidebar = create<ExpandProps>((set) => ({
  expanded: false,
  toggleExpand: () => {
    set((state) => ({
      expanded: !state.expanded,
    }));
  },
  close: () => {
    set({ expanded: false });
  },
}));
