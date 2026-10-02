// store.ts
import { create } from 'zustand'

interface SidePanelInterface {
    isOpen: boolean
    setOpen: (value: boolean) => void
}

// Create store using the curried form of `create`
export const useSidePanelStore = create<SidePanelInterface>()((set) => ({
    isOpen: false,
    setOpen: (value) => (set({ isOpen: value }))
}))