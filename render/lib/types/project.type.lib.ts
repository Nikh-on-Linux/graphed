export type Project = {
    id: string;
    name: string;
    description?: string;

    functionGroupIds: string[];

    createdAt: number;
    updatedAt: number;
};

export type StoredProject = {
    id: string;
    project: Project;
};

export type ProjectStore = {
  project: Project | null;
  setProject: (project: Project) => void;
  updateProject: (updates: Partial<Project>) => void;
  addFunctionGroup: (groupId: string) => void;
  removeFunctionGroup: (groupId: string) => void;
};