export type FlowEditorState = {
  activeProjectId: string | null;
  activeFunctionGroupId: string | null;
  selectFunctionGroup: (projectId: string, groupId: string) => void;
  clearSelection: () => void;
};
