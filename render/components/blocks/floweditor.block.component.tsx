
"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
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
  type Connection,
  type EdgeChange,
  type Node,
  type NodeChange,
} from "@xyflow/react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Add01FreeIcons,
  ComponentIcon,
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
import { getFunctionGroupStore } from "@/lib/registry/functiongroup.registry.lib"
import { useFlowEditorStore } from "@/lib/stores/floweditor.store.lib"
import { useStore } from "zustand"

export function FlowEditor() {
  const activeProjectId = useFlowEditorStore(
    (state) => state.activeProjectId
  );
  const activeFunctionGroupId = useFlowEditorStore(
    (state) => state.activeFunctionGroupId
  );
  const clearSelection = useFlowEditorStore(
    (state) => state.clearSelection
  );

  useEffect(() => {
    return clearSelection();
  }, [])

  if (!activeProjectId || !activeFunctionGroupId) {
    return <div className="h-screen w-full" />;
  }

  return (
    <FlowEditorCanvas
      key={`${activeProjectId}:${activeFunctionGroupId}`}
      projectId={activeProjectId}
      groupId={activeFunctionGroupId}
    />
  );
}

function FlowEditorCanvas({
  projectId,
  groupId,
}: {
  projectId: string;
  groupId: string;
}) {
  const fnStore = useMemo(
    () => getFunctionGroupStore(projectId, groupId),
    [projectId, groupId]
  );

  const nodes = useStore(
    fnStore,
    (state) => state.group.nodes
  );
  const edges = useStore(
    fnStore,
    (state) => state.group.edges
  );

  const [selectedNodeIds, setSelectedNodeIds] = useState<string[]>([]);
  const flowRef = useRef<HTMLDivElement>(null);
  const { x, y, zoom } = useViewport()
  const {
    deleteElements,
    getViewport,
    setViewport,
    screenToFlowPosition,
    zoomIn,
    zoomOut
  } = useReactFlow();

  const nodeTypes = {
    functionNode: FunctionNode,
  };

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      const state = fnStore.getState();

      state.setNodes(
        applyNodeChanges(changes, state.group.nodes)
      );
    },
    [fnStore],
  )

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      const state = fnStore.getState();

      state.setEdges(
        applyEdgeChanges(changes, state.group.edges)
      );
    },
    [fnStore],
  )

  const onConnect = useCallback(
    (params: Connection) => {
      const state = fnStore.getState();

      state.setEdges(
        addEdge(params, state.group.edges)
      );
    },
    [fnStore],
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

    const state = fnStore.getState();
    const currentNodes = state.group.nodes;

    let nodeNumber = currentNodes.length + 1;

    while (currentNodes.some((node) => node.id === `fn${nodeNumber}`)) {
      nodeNumber += 1;
    }

    state.setNodes([
      ...currentNodes,
      {
        id: `fn${nodeNumber}`,
        position: flowPosition,
        type: "functionNode",
        data: {
          label: `Function ${nodeNumber}`,
          inputs: [{ id: `Fn-${nodeNumber}-inp`, type: "any", name: "input function" }],
          outputs: [{ id: `Fn-${nodeNumber}-oup`, type: "any", name: "output function" }]
        },
      },
    ])

  }

  const onSelectionChange = useCallback(
    ({ nodes: selectedNodes }: { nodes: Node[] }) => {
      setSelectedNodeIds(
        selectedNodes.map((node) => node.id)
      );
    },
    []
  )

  const displayEdges = useMemo(
    () =>
      edges.map((edge) => {
        const isConnected = selectedNodeIds.some(
          (id) =>
            id === edge.source ||
            id === edge.target
        );

        return {
          ...edge,
          style: {
            ...edge.style,
            stroke: isConnected
              ? "var(--sidebar-primary)"
              : "var(--muted-foreground)",
            strokeWidth: isConnected ? 2 : 1.5,
          },
        };
      }),
    [edges, selectedNodeIds]
  );

  const PINCH_SENSITIVITY = 0.02;

  useEffect(() => {
    const container = flowRef.current;

    if (!container) return;

    const handleWheel = (event: WheelEvent) => {
      // Only intercept pinch gestures
      if (!event.ctrlKey) return;

      event.preventDefault();
      event.stopPropagation();

      const viewport = getViewport();

      // Calculate multiplicative zoom
      const factor = Math.exp(
        -event.deltaY * PINCH_SENSITIVITY
      );

      const newZoom = Math.min(
        2,
        Math.max(0.2, viewport.zoom * factor)
      );

      if (newZoom === viewport.zoom) return;

      // Get the flow coordinate underneath the pointer
      const flowPosition = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      // Get the pointer position relative to the canvas
      const bounds = container.getBoundingClientRect();

      const pointerX = event.clientX - bounds.left;
      const pointerY = event.clientY - bounds.top;

      // Keep the pointer's flow coordinate stationary
      const newX = pointerX - flowPosition.x * newZoom;
      const newY = pointerY - flowPosition.y * newZoom;

      setViewport(
        {
          x: newX,
          y: newY,
          zoom: newZoom,
        },
        { duration: 0 }
      );
    };

    container.addEventListener("wheel", handleWheel, {
      passive: false,
      capture: true,
    });

    return () => {
      container.removeEventListener(
        "wheel",
        handleWheel,
        true
      );
    };
  }, [getViewport, setViewport, screenToFlowPosition]);


  return (
    <div ref={flowRef} className="h-screen w-full">
      <ContextMenu>
        <ContextMenuTrigger>
          <ReactFlow
            nodes={nodes}
            edges={displayEdges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onEdgeDoubleClick={onEdgeDoubleClick}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            selectionOnDrag
            onSelectionChange={onSelectionChange}
            panOnScroll={true}
            zoomOnScroll={false}
            zoomOnPinch={true}

            panOnDrag={[1]}

            // minZoom={0.2}
            // maxZoom={2}
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
