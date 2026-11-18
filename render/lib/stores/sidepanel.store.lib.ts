// store.ts
import { create } from 'zustand'
import type { SidePanelInterface } from '@/lib/types/sidepanel.type.lib'

// Create store using the curried form of `create`
export const useSidePanelStore = create<SidePanelInterface>()((set) => ({
    isOpen: false,
    setOpen: (value) => (set({ isOpen: value }))
}))