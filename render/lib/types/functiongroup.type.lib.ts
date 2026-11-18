import type { Edge, Node } from "@xyflow/react";

export type FunctionGroupProps = {
  currentProjectId: string;
  group: string;
};

export type EditorNode = Node & {
  data: {
    label: string;
    id: string;
    inputs: {
      id: string;
      type: string;
      name: string;
    }[];
    outputs: {
      id: string;
      type: string;
      name: string;
    }[];
  };
};

export type FunctionGroup = {
  id: string;
  name: string;
  description: string;
  nodes: EditorNode[];
  edges: Edge[];
};

export type FunctionGroupStore = {
  group: FunctionGroup;
  setName: (name: string) => void;
  setDescription: (value: string) => void;
  setNodes: (nodes: EditorNode[]) => void;
  setEdges: (edges: Edge[]) => void;
  updateNodes: (nodes: EditorNode[]) => void;
  updateEdges: (edges: Edge[]) => void;
};
