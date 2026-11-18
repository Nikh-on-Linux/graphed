import { create } from "zustand";
import type { ComponentContext } from "@/lib/types/component.type.lib";

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