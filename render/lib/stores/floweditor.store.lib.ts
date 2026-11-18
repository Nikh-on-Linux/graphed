
import { create } from "zustand";
import type { FlowEditorState } from "@/lib/types/floweditor.type.lib";

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
