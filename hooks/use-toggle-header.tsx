import { create } from "zustand";

interface isOpen {
    menu: boolean
    search: boolean
}

interface OpenState {
  isOpen: isOpen
  toggleOpenMenu: () => void;
  toggleOpenSearch: () => void;
}

export const useToggleHeader = create<OpenState>((set) => ({
    isOpen: {
      menu: false,
      search: false,
    },
    toggleOpenMenu: () => set((state) => ({
      isOpen: {
        menu: !state.isOpen.menu,
        search: state.isOpen.search && false,
      }
    })),
    toggleOpenSearch: () => set((state) => ({
      isOpen: {
        search: !state.isOpen.search,
        menu: state.isOpen.menu && false,
      }
    })),
}));
  
