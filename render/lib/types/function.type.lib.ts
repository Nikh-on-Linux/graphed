import { type Node } from "@xyflow/react";

type ComponentNodeData = {
    label: string;
    description: string;

    inputs: {
        id: string;
        name: string;
        type: string;
    }[];

    outputs: {
        id: string;
        name: string;
        type: string;
    }[];
};

export type ComponentNode = Node<ComponentNodeData>;