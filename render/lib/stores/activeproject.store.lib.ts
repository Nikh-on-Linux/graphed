import { create } from "zustand";
import type { ActiveProjectStore } from "@/lib/types/activeproject.type.lib";

export const useActiveProjectStore = create<ActiveProjectStore>((set) => ({
  currentProjectId: null,

  setCurrentProject: (projectId) =>
    set({
      currentProjectId: projectId,
    }),
}));