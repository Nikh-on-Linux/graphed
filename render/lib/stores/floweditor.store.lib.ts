
import { create } from "zustand";

type FlowEditorState = {
  activeProjectId: string | null;
  activeFunctionGroupId: string | null;

  selectFunctionGroup: (
    projectId: string,
    groupId: string
  ) => void;

  clearSelection: () => void;
};

export const useFlowEditorStore = create<FlowEditorState>()(
  (set) => ({
    activeProjectId: null,
    activeFunctionGroupId: null,

    selectFunctionGroup: (projectId, groupId) =>
      set({
        activeProjectId: projectId,
        activeFunctionGroupId: groupId,
      }),

    clearSelection: () =>
      set({
        activeProjectId: null,
        activeFunctionGroupId: null,
      }),
  })
);
