export type ActiveProjectStore = {
  currentProjectId: string | null;
  setCurrentProject: (projectId: string | null) => void;
};
