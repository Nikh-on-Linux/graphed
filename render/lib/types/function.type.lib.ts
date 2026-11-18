import type { Node } from "@xyflow/react";

export type ComponentNodePort = {
    id: string;
    name: string;
    type: string;
};

export type ComponentNodeData = {
    label: string;
    description: string;
    inputs: ComponentNodePort[];
    outputs: ComponentNodePort[];
};

export type ComponentNode = Node<ComponentNodeData>;