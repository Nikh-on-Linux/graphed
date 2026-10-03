import { Handle, Position, type NodeProps, type Node, useReactFlow } from "@xyflow/react"
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuGroup,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { HugeiconsIcon } from "@hugeicons/react"
import {
    Delete02Icon,
    Edit01Icon,
    FunctionSquareIcon,
} from "@hugeicons/core-free-icons"
import { cn } from "cn"
import { useComponentStore } from "@/lib/stores/componentInfo.store.lib"
import { ComponentNode } from "@/lib/types/function.type.lib"

function FunctionNode({
    data,
    selected,
    id
}: NodeProps<ComponentNode>) {
    const { deleteElements } = useReactFlow();
    const { setId, setPanelOpen } = useComponentStore();

    const deleteNode = () => {
        deleteElements({ nodes: [{ id }] });
    };

    const handleContextOpen = () => {
        setId(id);
        setPanelOpen(true);
    };

    const hasMultipleInputs = data.inputs.length > 1;

    return (
        <ContextMenu>
            <ContextMenuTrigger>
                <div
                    className={cn(
                        "relative w-60 rounded border bg-card px-3 py-2",
                        selected
                            ? "border-sidebar-primary"
                            : "border-border"
                    )}
                    onDoubleClick={handleContextOpen}
                >
                    {/* Header */}
                    <div
                        className={cn(
                            "flex flex-row items-center gap-1 text-muted-foreground",
                            selected && "text-foreground"
                        )}
                    >
                        <HugeiconsIcon
                            icon={FunctionSquareIcon}
                            className="w-3 h-3"
                        />

                        <span className="font-sans text-xs">
                            {data.label || "Function"}
                        </span>
                    </div>

                    {/* Inputs */}
                    <div className="mt-3 flex flex-col gap-1">
                        {data.inputs.map((input) => (
                            <div
                                key={input.id}
                                className="relative flex items-center"
                            >
                                <Handle
                                    type="target"
                                    position={Position.Left}
                                    id={input.id}
                                    className="!h-2 !w-2 !border-0 !bg-muted-foreground"
                                />

                                <span className="ml-2 truncate text-xs text-muted-foreground">
                                    {input.name || "input"}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Separator */}
                    <div className="my-2 border-t border-border" />

                    {/* Output */}
                    {
                        data.outputs.map((item,key) => {
                            return (
                                <div className="relative flex  items-center justify-end" key={item.id}>
                                    <span className="mr-2 truncate text-xs text-muted-foreground">
                                        {item.name || "Output"}
                                    </span>

                                    <Handle
                                        type="source"
                                        position={Position.Right}
                                        id={item.id}
                                        className="!h-2 !w-2 !border-0 !bg-primary"
                                    />
                                </div>
                            )
                        })
                    }
                </div>
            </ContextMenuTrigger>

            <ContextMenuContent>
                <ContextMenuGroup>
                    <ContextMenuItem
                        className="text-muted-foreground"
                        onClick={handleContextOpen}
                    >
                        <HugeiconsIcon
                            icon={Edit01Icon}
                            strokeWidth={1.5}
                        />
                        Edit context
                    </ContextMenuItem>

                    <ContextMenuSeparator />

                    <ContextMenuItem
                        className="text-destructive"
                        onClick={deleteNode}
                    >
                        <HugeiconsIcon
                            icon={Delete02Icon}
                            strokeWidth={1.5}
                        />
                        Delete Function
                    </ContextMenuItem>
                </ContextMenuGroup>
            </ContextMenuContent>
        </ContextMenu>
    );
}

export default FunctionNode