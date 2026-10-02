import { create } from "zustand";

interface ComponentContext {
    id: string,
    context: string,
    name: string,
    panelOpen: boolean,
    setId: (id: string) => void;
    setContext: (value: string) => void;
    setName: (value: string) => void;
    setPanelOpen: (value: boolean) => void;
}

export const useComponentStore = create<ComponentContext>()((set) => ({
    id: "",
    context: "",
    name: "",
    panelOpen: false,
    setId: (id: string) => (set({ id: id })),
    setContext: (value: string) => (set({ context: value })),
    setName: (value: string) => (set({ name: value })),
    setPanelOpen: (value: boolean) => (set({ panelOpen: value }))
}))