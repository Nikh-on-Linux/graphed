
import {
    Handle,
    Position,
    type NodeProps,
    useReactFlow,
} from "@xyflow/react";

import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuGroup,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuTrigger,
} from "@/components/ui/context-menu";

import { HugeiconsIcon } from "@hugeicons/react";

import {
    Delete02Icon,
    Edit01Icon,
    GitBranchIcon,
} from "@hugeicons/core-free-icons";

import { cn } from "cn";
import { useComponentStore } from "@/lib/stores/componentInfo.store.lib";
import { ComponentNode } from "@/lib/types/function.type.lib";

function BranchNode({
    data,
    selected,
    id,
}: NodeProps<ComponentNode>) {

    const { deleteElements } = useReactFlow();
    const { setId, setPanelOpen } = useComponentStore();

    const conditionInput = data.inputs[0];
    const trueOutput = data.outputs[0];
    const falseOutput = data.outputs[1];

    const handleContextOpen = () => {
        setId(id);
        setPanelOpen(true);
    };

    const deleteNode = () => {
        deleteElements({ nodes: [{ id }] });
    };

    return (
        <ContextMenu>
            <ContextMenuTrigger>
                <div
                    className="relative h-40 w-60"
                    onDoubleClick={handleContextOpen}
                >
                    {/* SVG Diamond */}
                    <svg
                        viewBox="0 0 240 160"
                        className="absolute inset-0 h-full w-full"
                        preserveAspectRatio="none"
                    >
                        <polygon
                            points="120,18 214,80 120,142 26,80"
                            fill="var(--card)"
                            stroke={
                                selected
                                    ? "var(--sidebar-primary)"
                                    : "var(--border)"
                            }
                            strokeWidth={selected ? 2 : 1.25}
                            vectorEffect="non-scaling-stroke"
                            strokeLinejoin="round"
                        />
                    </svg>

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-10">

                        <HugeiconsIcon
                            icon={GitBranchIcon}
                            className={cn(
                                "h-4 w-4",
                                "text-muted-foreground"
                            )}
                        />

                        <span className="max-w-full truncate text-xs font-medium text-foreground">
                            {data.label || "If / Else"}
                        </span>

                        <span className="text-[10px] text-muted-foreground">
                            {conditionInput?.name || "Condition"}
                        </span>

                    </div>

                    {/* Condition Input */}
                    {conditionInput && (
                        <Handle
                            type="target"
                            position={Position.Left}
                            id={conditionInput.id}
                            className="!h-2.5 !w-2.5 !border-0 !bg-muted-foreground"
                            style={{
                                left: "8%",
                                top: "50%",
                            }}
                        />
                    )}

                    {/* True Output */}
                    {trueOutput && (
                        <Handle
                            type="source"
                            position={Position.Right}
                            id={trueOutput.id}
                            className="!h-2.5 !w-2.5 !border-0 !bg-emerald-900"
                            style={{
                                right: "8%",
                                top: "50%",
                            }}
                        />
                    )}

                    {/* False Output */}
                    {falseOutput && (
                        <Handle
                            type="source"
                            position={Position.Bottom}
                            id={falseOutput.id}
                            className="!h-2.5 !w-2.5 !border-0 !bg-rose-900"
                            style={{
                                left: "50%",
                                bottom: "7%",
                            }}
                        />
                    )}

                </div>
            </ContextMenuTrigger>

            <ContextMenuContent>
                <ContextMenuGroup>
                    <ContextMenuItem onClick={handleContextOpen}>
                        <HugeiconsIcon icon={Edit01Icon} />
                        Edit context
                    </ContextMenuItem>

                    <ContextMenuSeparator />

                    <ContextMenuItem
                        className="text-destructive"
                        onClick={deleteNode}
                    >
                        <HugeiconsIcon icon={Delete02Icon} />
                        Delete Branch
                    </ContextMenuItem>
                </ContextMenuGroup>
            </ContextMenuContent>
        </ContextMenu>
    );
}

export default BranchNode;
