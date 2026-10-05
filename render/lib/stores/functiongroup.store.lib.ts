import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";
import type { Node, Edge } from "@xyflow/react";

export type FunctionGroup = {
  id: string;
  name: string;

  nodes: Node[];
  edges: Edge[];
};

export type FunctionGroupStore = {
  group: FunctionGroup;

  setName: (name: string) => void;

  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;

  updateNodes: (nodes: Node[]) => void;
  updateEdges: (edges: Edge[]) => void;
};

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
      }),

      {
        name: `project:${projectId}:function-group:${groupId}`,
      }
    )
  );
};