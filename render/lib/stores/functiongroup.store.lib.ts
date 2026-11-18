import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";
import type {
  EditorNode,
  FunctionGroupStore,
} from "@/lib/types/functiongroup.type.lib";

export const createFunctionGroupStore = (
  projectId: string,
  groupId: string
) => {
  return createStore<FunctionGroupStore>()(
    persist(
      (set) => ({
        group: {
          id: groupId,
          name: "Untitled Group",
          description: "",

          nodes: [],
          edges: [],
        },

        setName: (name) =>
          set((state) => ({
            group: {
              ...state.group,
              name,
            },
          })),

        setNodes: (nodes) =>
          set((state) => ({
            group: {
              ...state.group,
              nodes,
            },
          })),

        setEdges: (edges) =>
          set((state) => ({
            group: {
              ...state.group,
              edges,
            },
          })),

        updateNodes: (nodes) =>
          set((state) => ({
            group: {
              ...state.group,
              nodes,
            },
          })),

        updateEdges: (edges) =>
          set((state) => ({
            group: {
              ...state.group,
              edges,
            },
          })),

        setDescription: (value: string) => {
          set((state)=>({
            group: {
              ...state.group,
              description: value
            }
          }))
        }
      }),

      {
        name: `project:${projectId}:function-group:${groupId}`,
      }
    )
  );
};