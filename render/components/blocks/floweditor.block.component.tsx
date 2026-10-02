"use client"

import { useCallback, useRef, useState } from "react"
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  BackgroundVariant,
  Controls,
  Edge,
  Panel,
  ReactFlow,
  useReactFlow,
  useViewport,
  getConnectedEdges,
  type Connection,
  type EdgeChange,
  type Node,
  type NodeChange,
} from "@xyflow/react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Add01FreeIcons,
  ComponentIcon,
  Delete02Icon,
  FunctionSquareIcon,
  WorkflowSquare07Icon,
} from "@hugeicons/core-free-icons"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import FunctionNode from "../nodes/function.node.component"
import TopPanel from "./toppanel.block.component"

type FlowNode = Node<{ label: string }>

const initialNodes: FlowNode[] = []

const initialEdges: any = []

export function FlowEditor() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [selectedEdges, setSelectedEdges] = useState([]);
  const flowRef = useRef<HTMLDivElement>(null);
  const { x, y, zoom } = useViewport()
  const { deleteElements } = useReactFlow();

  const nodeTypes = {
    functionNode: FunctionNode,
  };

  const onNodesChange = useCallback(
    (changes: NodeChange<FlowNode>[]) =>
      setNodes((nodesSnapshot) =>
        applyNodeChanges<FlowNode>(changes, nodesSnapshot),
      ),
    [],
  )
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  )
  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  )

  const onEdgeDoubleClick = useCallback((e: any, edge: Edge) => {
    deleteElements({ edges: [{ id: edge.id }] });
  }, [deleteElements]);

  const addFunction = () => {
    const flowBounds = flowRef.current?.getBoundingClientRect()
    const flowPosition = flowBounds
      ? {
        x: (flowBounds.width / 2 - x) / zoom,
        y: (flowBounds.height / 2 - y) / zoom,
      }
      : { x: 0, y: 0 }

    setNodes((nodesSnapshot) => [
      ...nodesSnapshot,
      {
        id: `fn${nodesSnapshot.length + 1}`,
        position: flowPosition,
        type: "functionNode",
        data: {
          label: `Function ${nodesSnapshot.length + 1}`,
          inputs:[{id:`Fn-${nodesSnapshot.length + 1}-inp`, type:"any", name:"input function"}],
          outputs:[{}]
        },
      },
    ])
  }

  const onSelectionChange = useCallback(
    ({ nodes: selectedNodes }: { nodes: Node[] }) => {
      setEdges((currentEdges) =>
        currentEdges.map((edge) => {
          const isConnected = selectedNodes.some(
            (node) =>
              node.id === edge.source ||
              node.id === edge.target
          )

          return {
            ...edge,
            style: {
              stroke: isConnected
                ? "var(--sidebar-primary)"
                : "var(--muted-foreground)",
              strokeWidth: isConnected ? 2 : 1.5,
            },
          }
        })
      )
    },
    []
  )


  return (
    <div ref={flowRef} className="h-screen w-full">
      <ContextMenu>
        <ContextMenuTrigger>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onEdgeDoubleClick={onEdgeDoubleClick}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            selectionOnDrag
            onSelectionChange={onSelectionChange}
            panOnDrag={[1]}
            fitView
            className="py-0"
          >
            <Background variant={BackgroundVariant.Dots} />
            <Controls />
            <Panel position="bottom-center" />
            {/* <Panel position="top-center" className="w-full mt-">
              <TopPanel />
            </Panel> */}
          </ReactFlow>
        </ContextMenuTrigger>
        <ContextMenuContent className=" cursor-default select-none">
          <ContextMenuSub>
            <ContextMenuSubTrigger>
              <HugeiconsIcon icon={Add01FreeIcons} />
              Add Component
            </ContextMenuSubTrigger>
            <ContextMenuSubContent>
              <ContextMenuGroup>
                <ContextMenuItem className="text-muted-foreground">
                  <HugeiconsIcon icon={ComponentIcon} strokeWidth={1.2} />
                  Group
                </ContextMenuItem>
                <ContextMenuItem
                  className="text-muted-foreground"
                  onClick={addFunction}
                >
                  <HugeiconsIcon
                    icon={FunctionSquareIcon}
                    strokeWidth={1.2}
                  />
                  Function
                </ContextMenuItem>
                <ContextMenuItem className="text-muted-foreground">
                  <HugeiconsIcon
                    icon={WorkflowSquare07Icon}
                    strokeWidth={1.2}
                  />
                  Branch
                </ContextMenuItem>
              </ContextMenuGroup>
              <ContextMenuSeparator />
            </ContextMenuSubContent>
          </ContextMenuSub>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  )
}
