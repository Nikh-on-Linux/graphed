import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";
import type {
  Project,
  ProjectStore,
} from "@/lib/types/project.type.lib";

export const createProjectStore = (projectId: string) => {
  return createStore<ProjectStore>()(
    persist(
      (set) => ({
        project: null,

        setProject: (project) =>
          set({
            project,
          }),

        updateProject: (updates) =>
          set((state) => {
            if (!state.project) {
              return state;
            }

            return {
              project: {
                ...state.project,
                ...updates,
                updatedAt: Date.now(),
              },
            };
          }),

        addFunctionGroup: (groupId) =>
          set((state) => {
            if (!state.project) {
              return state;
            }

            if (state.project.functionGroupIds.includes(groupId)) {
              return state;
            }

            return {
              project: {
                ...state.project,

                functionGroupIds: [
                  ...state.project.functionGroupIds,
                  groupId,
                ],

                updatedAt: Date.now(),
              },
            };
          }),

        removeFunctionGroup: (groupId) =>
          set((state) => {
            if (!state.project) {
              return state;
            }

            return {
              project: {
                ...state.project,

                functionGroupIds:
                  state.project.functionGroupIds.filter(
                    (id) => id !== groupId
                  ),

                updatedAt: Date.now(),
              },
            };
          }),
      }),

      {
        name: `project:${projectId}`,
      }
    )
  );
};