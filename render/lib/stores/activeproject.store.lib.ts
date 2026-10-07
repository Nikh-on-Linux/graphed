import { create } from "zustand";

type ActiveProjectStore = {
  currentProjectId: string | null;

  setCurrentProject: (projectId: string | null) => void;
};

export const useActiveProjectStore = create<ActiveProjectStore>((set) => ({
  currentProjectId: null,

  setCurrentProject: (projectId) =>
    set({
      currentProjectId: projectId,
    }),
}));